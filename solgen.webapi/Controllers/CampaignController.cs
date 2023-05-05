using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Solgen.Core;
using Solgen.Service;
using Solgen.Service.Facebook;
using Solgen.WebApi.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.Helpers;
using Solgen.Core.Models;
using Solgen.Service.CompanyIntegrationSetting;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {

        private readonly ICampaignService _campaignService;
        private readonly IFacebookService _facebookService;
        private ICompanyIntegrationSettingService _companyIntegrationSettingService;
        private SettingModel _settings;
        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public CampaignController(ICampaignService campaignService, IFacebookService facebookService,ICompanyIntegrationSettingService companyIntegrationSettingService)
        {
            _campaignService = campaignService;
            _facebookService = facebookService;
            _companyIntegrationSettingService = companyIntegrationSettingService;
        }
        [Authorize]
        [HttpGet]
        [Route("GetCampaignList")]
        public async Task<ActionResult> GetCampaignList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, string custom_view_id, string moduleName, string submoduleName)
        {
            try
            {
                var data = await _campaignService.GetCampaignList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userID, moduleName, submoduleName, companyID, custom_view_id);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddOrUpdateCampaign")]
        public async Task<IActionResult> AddOrUpdateCampaign([FromBody] CampaignModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = await _campaignService.AddOrUpdateCampaign(model);
                string retResponseMessage = string.Format("Campaign has been {0} successfully.", (model.CampaignId == null) ? "inserted" : "updated");
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = retResponseMessage;
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                }
                return Ok(responseModel);
            }
            catch //(Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }


        [Authorize]
        [HttpGet]
        [Route("GetCampaignMembersList")]
        public async Task<ActionResult> GetCampaignMembersList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _campaignService.GetCampaignMembersList(campaignId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetCampaignProposalsList")]
        public async Task<ActionResult> GetCampaignProposalsList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _campaignService.GetCampaignProposalsList(campaignId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetCampaignLeadsList")]
        public async Task<ActionResult> GetCampaignLeadsList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _campaignService.GetCampaignLeadsList(campaignId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Route("GetFacebookCampaigns")]
        public async Task<ActionResult> GetFacebookCampaigns()
        {
            try
            {
                string callType = "";
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,account_id,ad_strategy_group_id,ad_strategy_id,adlabels,bid_strategy,boosted_object_id,brand_lift_studies,budget_rebalance_flag,budget_remaining,buying_type,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,daily_budget,effective_status,is_skadnetwork_attribution,issues_info,last_budget_toggling_time,lifetime_budget,name,objective,pacing_type,promoted_object,recommendations,smart_promotion_type,source_campaign,source_campaign_id,special_ad_categories,special_ad_category,special_ad_category_country,spend_cap,start_time,status,stop_time,topline_id,updated_time");
                var result = await _facebookService.GetCampaign(requestData, companyID.ToString());
                var data = JsonConvert.DeserializeObject<FacebookCampaignViewModel>(result);
                string identy = _facebookService.SaveCampaign(data.data[0]);
               

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetFacebookadsets")]
        public async Task<ActionResult> GetFacebookadsets()
        {
            try
            {
                //string callType = "";
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,account_id,adlabels,adset_schedule,asset_feed_id,attribution_spec,billing_event,campaign_id,configured_status,created_time,daily_budget,destination_type,effective_status,end_time,is_dynamic_creative,learning_stage_info,lifetime_budget,lifetime_imps,multi_optimization_goal_weight,name,optimization_goal,optimization_sub_event,pacing_type,promoted_object,recommendations,recurring_budget_semantics,review_feedback,source_adset,source_adset_id,start_time,status,targeting,targeting_optimization_types,time_based_ad_rotation_id_blocks,time_based_ad_rotation_intervals,updated_time,use_new_app_click");
                var result = await _facebookService.GetAdset(requestData, companyID.ToString());
                var data = JsonConvert.DeserializeObject<FacebookAddSetViewModel>(result);
                long identy = _facebookService.SaveAdset(data.data[0]);
             
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetFacebookads")]
        public async Task<ActionResult> GetFacebookads()
        {
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
        
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,name,account_id,ad_review_feedback,adlabels,adset,adset_id,bid_amount,campaign,campaign_id,configured_status,conversion_domain,created_time,creative,effective_status,last_updated_by_app_id,preview_shareable_link,recommendations,source_ad,source_ad_id,status,tracking_specs,updated_time");
                var result = await _facebookService.GetFacebookAds(requestData, companyID.ToString());
                var data = JsonConvert.DeserializeObject<FacebookAdsViewModel>(result);
                string identy = _facebookService.SaveAds(data.data[0]);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetadsInsightsUpdate")]
        public async Task<ActionResult> GetadsInsightsUpdate(string status, string date)
        {
            try
            {
                // string callType = "";
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
      
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id");
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[\"" + status + "\"]},{'field':'campaign.effective_status','operator':'IN','value':[\"" + status + "\"]},{'field':'adset.effective_status','operator':'IN','value':[\"" + status + "\"]}]");
                var result = await _facebookService.GetFacebookAds(requestData, companyID.ToString());
                var data = JsonConvert.DeserializeObject<FacebookAdsViewModel>(result);
                foreach (var item in data.data)
                {
                    string token1 = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                    _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyID.ToString());
                    if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                    {
                        token1 = _settings.facebookSandboxAuth;
                    }
                   
                    IDictionary<string, string> requestData1 = new Dictionary<string, string>();
                    requestData1.Add("access_token", token);
                    requestData1.Add("fields", "conversion_rate_ranking,engagement_rate_ranking,quality_ranking,ad_id,adset_id,ad_name,account_currency,account_id,account_name,action_values,actions,buying_type,campaign_id,campaign_name,clicks,cost_per_action_type,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_outbound_click,cost_per_unique_action_type,cost_per_unique_click,cpc,cpm,cpp,created_time,ctr,date_start,date_stop,frequency,impressions,inline_link_click_ctr,inline_link_clicks,inline_post_engagement,interactive_component_tap,objective,optimization_goal,reach,updated_time,outbound_clicks,outbound_clicks_ctr");
                    requestData1.Add("time_range", "{since:'" + date + "',until:'" + date + "'}");
                    var resultInsight = await _facebookService.GetFacebookAdsInsight(requestData1, item.id);
                    if (resultInsight != null)
                    {
                        var dataInsightById = JsonConvert.DeserializeObject<FacebookAdsInsightViewModel>(resultInsight);
                        if (dataInsightById.data.Count > 0)
                        {
                            string message = _facebookService.SaveAdsInsight(dataInsightById.data[0], "");
                            JObject jObj1 = JObject.Parse(JsonConvert.SerializeObject(data.data[0]));
                            JObject jObj2 = JObject.Parse(JsonConvert.SerializeObject(dataInsightById.data[0]));
                            var resultddd = new JObject();
                            resultddd.Merge(jObj1);
                            resultddd.Merge(jObj2);
                        }
                    }

                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        [Route("GetFacebookadsets1")]
        public async Task<ActionResult> GetFacebookadsets1()
        {
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
              
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,account_id,adlabels,adset_schedule,asset_feed_id,attribution_spec,bid_adjustments,bid_amount,bid_constraints,bid_info,bid_strategy,billing_event,budget_remaining,campaign,campaign_id,configured_status,created_time,creative_sequence,daily_budget,daily_min_spend_target,daily_spend_cap,destination_type,effective_status,end_time,frequency_control_specs,instagram_actor_id,issues_info,learning_stage_info,lifetime_budget,lifetime_imps,lifetime_min_spend_target,lifetime_spend_cap,multi_optimization_goal_weight,name,optimization_goal,optimization_sub_event,pacing_type,promoted_object,recommendations,recurring_budget_semantics,review_feedback,rf_prediction_id,source_adset,source_adset_id,start_time,status,targeting,targeting_optimization_types,time_based_ad_rotation_id_blocks,time_based_ad_rotation_intervals,updated_time,use_new_app_click");
                var result = await _facebookService.GetAdsets(requestData, companyID.ToString());
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}