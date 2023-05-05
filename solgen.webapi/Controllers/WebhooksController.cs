using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Service;
using Solgen.Service.Facebook;
using Solgen.Service.FbCampaign;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    [Route("api/Webhooks")]
    public class WebhooksController : Controller
    {
        private readonly ILogger<WebhooksController> _logger;
        private readonly ICommonService _commonService;
        private readonly IFacebookService _facebookService;
        private readonly string SUBSCRIPTION_VERIFICATION = "leadAdsRockPlayer"; // change this to your verification code =)            

        public WebhooksController
        (ILogger<WebhooksController> logger, ICommonService commonService, IFacebookService facebookService) // dependency injection
        {
            this._logger = logger;
            _commonService = commonService;
            _facebookService = facebookService;
        }

        // Ref.: https://developers.facebook.com/docs/graph-api/webhooks/getting-started
        // GET api/webhooks
        [HttpGet]
        [Route("VerificationRequest")]
        public IActionResult VerificationRequest( // Creating an Endpoint
            [FromQuery(Name = "hub.mode")] string mode = "", // This value will always be set to subscribe.
            [FromQuery(Name = "hub.challenge")] string challenge = "", // An int you must pass back to us.
            [FromQuery(Name = "hub.verify_token")] string verifyToken = ""  // A string that that we grab from the Verify Token field in your app's App Dashboard. 
            )
        {
            this._logger.LogInformation("*** public IActionResult VerificationRequest() ***");

            this._logger.LogInformation("mode: " + mode);
            this._logger.LogInformation("challenge: " + challenge);
            this._logger.LogInformation("verify: " + verifyToken);
            var data = _commonService.AddErrorAndException("Call", "VerificationRequest");

            if (verifyToken.Equals(SUBSCRIPTION_VERIFICATION))
            {
                this._logger.LogInformation("Ok!!!");
                int result = System.Int32.Parse(challenge); //An int you must pass back to us.
                this._logger.LogInformation("challenge: " + result);

                return Ok
                (
                    result //challenge
                );

            }
            else
            {
                this._logger.LogInformation("NOT Ok!!!");

                return StatusCode(400,
                    (new string[] {
                            "mode: " + mode,
                            "challenge: " + challenge,
                            "verify: " + verifyToken
                            }
                    ));
            }
        }


        [HttpPost]
        [Route("VerificationRequest")]

        //public async Task<ActionResult> VerificationRequest([FromBody] dynamic body)
        //{
        public async Task<IActionResult> VerificationRequestAsync([FromBody] dynamic body)
        {
            string json = JsonConvert.SerializeObject(body);

            //var entry = body.GetProperty("entry");
            //string entryString = System.Text.Json.JsonSerializer.Serialize(entry);

            //var changes = entry[0].GetProperty("changes");
            //string changesString = System.Text.Json.JsonSerializer.Serialize(changes);

            //var value = changes[0].GetProperty("value");
            //string valueString = System.Text.Json.JsonSerializer.Serialize(value);

            //var leadgen_id = value.GetProperty("leadgen_id");
            //string leadgen_idString = System.Text.Json.JsonSerializer.Serialize(leadgen_id);

            var data = JsonConvert.DeserializeObject<leadViewModel>(json);
            try
            {
                string callType = "";
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name");
                ////This api not get any data so need to insert hardcode campagion if after lead generation we will pass this api data for lead creation
                var result = await _facebookService.GetLead(requestData, data.entry[0].changes[0].value.leadgen_id);               
                //var datadd = JsonConvert.DeserializeObject<FacebookAddSetViewModel>(result);
                if (result==null)
                {
                    string identy = _facebookService.Savedemolead();
                }
               

                // return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }


            //string document_id = Convert.ToString(JObject.Parse(json)["object"]);
            // string entry = JObject.Parse(json)["entry"].ToString();
            //string entryString = System.Text.Json.JsonSerializer.Serialize(entry);
            //string changes = JsonConvert.SerializeObject(JObject.Parse(entry)["changes"]);
            //string value = JsonConvert.SerializeObject(JObject.Parse(changes)["value"]);
            //string leadgen_id = JObject.Parse(value)["leadgen_id"].ToString();


            //var entry = body.GetProperty("entry");
            //string entryString = System.Text.Json.JsonSerializer.Serialize(entry);

            //var changes = entry[0].GetProperty("changes");
            //string changesString = System.Text.Json.JsonSerializer.Serialize(changes);

            //var value = changes[0].GetProperty("value");
            //string valueString = System.Text.Json.JsonSerializer.Serialize(value);

            //var leadgen_id = value.GetProperty("leadgen_id");
            //string leadgen_idString = System.Text.Json.JsonSerializer.Serialize(leadgen_id);


            var data1 = _commonService.AddErrorAndException(json, "body");
            return Ok
           (
               new string[] {
                    "POST webhooks",
                    "public IActionResult YouGotANewLead([FromBody] string content)",
               }
           );
        }


        public async Task<ActionResult> SaveLead(string leadid)
        {
            try
            {
                string CompanyId="";
                string callType = "";
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,account_id,ad_strategy_group_id,ad_strategy_id,adlabels,bid_strategy,boosted_object_id,brand_lift_studies,budget_rebalance_flag,budget_remaining,buying_type,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,daily_budget,effective_status,is_skadnetwork_attribution,issues_info,last_budget_toggling_time,lifetime_budget,name,objective,pacing_type,promoted_object,recommendations,smart_promotion_type,source_campaign,source_campaign_id,special_ad_categories,special_ad_category,special_ad_category_country,spend_cap,start_time,status,stop_time,topline_id,updated_time");
                var result = await _facebookService.GetCampaign(requestData, CompanyId);
                var data = JsonConvert.DeserializeObject<FacebookCampaignViewModel>(result);
                string identy = _facebookService.SaveCampaign(data.data[0]);


                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




    }
}

