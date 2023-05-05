using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service.CompanyIntegrationSetting;
using Solgen.Service.Facebook;
using Solgen.Service.FbCampaign;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/FbCampaign")]
    [Authorize]
    public class FbCampaignController : Controller
    {
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        private IFbCampaignService _fbCampaignService;
        private IFacebookService _facebookService;
        private ICompanyIntegrationSettingService _companyIntegrationSettingService;
        private SettingModel _settings;
        public FbCampaignController(IFbCampaignService fbCampaignService, IFacebookService facebookService,ICompanyIntegrationSettingService companyIntegrationSettingService)
        {
            _fbCampaignService = fbCampaignService;
            _facebookService = facebookService;
            _companyIntegrationSettingService = companyIntegrationSettingService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Authorize]
        [Route("GetCampaignList")]
        public async Task<IActionResult> GetCampaignList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, int pageIndex, string pageSize)
        {
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = await _fbCampaignService.GetCampaignList(name, fromDate, toDate, sortColumn, sortDir, pageIndex, pageSize, companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetAddsList")]
        public async Task<IActionResult> GetAddsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = await _fbCampaignService.GetAddsList(name, fromDate, toDate, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetAddSetsList")]
        public async Task<IActionResult> GetAddSetsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = await _fbCampaignService.GetAddSetsList(name, fromDate, toDate, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //[Authorize]
        [Route("GetAdById")]
        public IActionResult GetAdById(decimal id)
        {
            try
            {
                var lst = _facebookService.GetAdById(id);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //[Authorize]
        [Route("GetCampaignById")]
        public IActionResult GetCampaignById(decimal id)
        {
            try
            {
                var lst = _facebookService.GetCampaignById(id);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //[Authorize]
        [Route("GetAdsetById")]
        public IActionResult GetAdsetById(decimal id)
        {
            try
            {
                var lst = _facebookService.GetAdsetById(id);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //[Authorize]
        [Route("GetFacebookCampaignsDDL")]
        public async Task<IActionResult> GetFacebookCampaignsDDL(string status = "")
        {
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());

                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.fbDataLimit))
                {
                    limit = _settings.fbDataLimit;
                }
                string fbDDLStatuses = CommonSettings.AppSetting["CommonSettings:fbDDLStatuses"];
                if (string.IsNullOrEmpty(status))
                    status = fbDDLStatuses; IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "name,id,objective");
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]}]");
                requestData.Add("limit", limit);
                var result = await _facebookService.GetCampaign(requestData, companyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        //[Authorize]
        [Route("GetFacebookAdCreativeDDL")]
        public async Task<IActionResult> GetFacebookAdCreativeDDL()
        {
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.fbDataLimit))
                {
                    limit = _settings.fbDataLimit;
                }
                string fbDDLStatuses = CommonSettings.AppSetting["CommonSettings:fbDDLStatuses"];
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,name,title");
                requestData.Add("limit", limit);
                var result = await _facebookService.GetAdCreative(requestData,companyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        //[Authorize]
        [Route("GetFacebookadsetsDDL")]
        public async Task<IActionResult> GetFacebookadsetsDDL(string status = "")
        {
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.fbDataLimit))
                {
                    limit = _settings.fbDataLimit;
                }
                string fbDDLStatuses = CommonSettings.AppSetting["CommonSettings:fbDDLStatuses"];
                if (string.IsNullOrEmpty(status))
                    status = fbDDLStatuses;
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,name,campaign_id");
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]}]");
                requestData.Add("limit", limit);
                var result = await _facebookService.GetAdset(requestData,companyID);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        //[Authorize]
        [Route("AddFbAd")]
        public async Task<IActionResult> AddFbAd(string status = "")
        {
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.fbDataLimit))
                {
                    limit = _settings.fbDataLimit;
                }
                string fbDDLStatuses = CommonSettings.AppSetting["CommonSettings:fbDDLStatuses"];
                if (string.IsNullOrEmpty(status))
                    status = fbDDLStatuses;
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,name,campaign_id");
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]}]");
                requestData.Add("limit", limit);
                var result = await _facebookService.GetAdset(requestData,companyID);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        //[Authorize]
        [Route("EditFbAd")]
        public async Task<IActionResult> EditFbAd(string status = "")
        {
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.fbDataLimit))
                {
                    limit = _settings.fbDataLimit;
                }
                string fbDDLStatuses = CommonSettings.AppSetting["CommonSettings:fbDDLStatuses"];
                if (string.IsNullOrEmpty(status))
                    status = fbDDLStatuses;
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id,name,campaign_id");
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]}]");
                requestData.Add("limit", limit);
                var result = await _facebookService.GetAdset(requestData,companyID);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("SaveFacebookadsets")]
        public async Task<ActionResult> SaveFacebookadsets([FromBody] FacebookAddSet json)
        {
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                ResultResponseModel response = new ResultResponseModel();
                json.CreatedBy = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                json.account_id = CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookAccountId))
                {
                    json.account_id = _settings.facebookAccountId;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();


                //requestData.Add("budget_remaining", json.budget_remaining);
                requestData.Add("name", json.name);
              //  requestData.Add("lifetime_budget", json.lifetime_budget);
             //   requestData.Add("start_time", Convert.ToString(json.start_time));
              //  requestData.Add("end_time", Convert.ToString(json.end_time));
                requestData.Add("campaign_id", json.campaign_id);
                requestData.Add("bid_amount",Convert.ToString(json.bid_amount));
                requestData.Add("billing_event", json.billing_event.Trim());
                requestData.Add("status", json.status);
                requestData.Add("daily_budget",Convert.ToString(json.daily_budget));
                requestData.Add("optimization_goal", json.optimization_goal);
                //requestData.Add("targeting", "[\"" + json.targeting + "\"]");
                requestData.Add("targeting", "{\"geo_locations\":{\"countries\":[\"US\"]}}");
                requestData.Add("access_token", token);
                json.effective_status = json.status;
                json.configured_status = json.status;
                //requestData.Add("fields", "Id,account_id,budget_rebalance_flag,budget_remaining,buying_type,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,effective_status,is_skadnetwork_attribution,name,objective,smart_promotion_type,source_campaign_id,special_ad_category,start_time,status,stop_time,topline_id,updated_time");
                //json.access_token = token;

                var result = await _facebookService.PostAdset(requestData,companyID);
                if(result !=null && result != "BadRequest")
                {
                    var objResult = JsonConvert.DeserializeObject<FacebookAddSet>(result);
                    json.Id = objResult.Id;
                    var  identy = _facebookService.SaveAdset(json);
                    if (identy != null || identy != "")
                    {
                        response.StatusCode = 200;
                        response.ResponseMessage = identy;
                    }
                }
                else
                {
                    response.StatusCode = 404;
                    response.ResponseMessage ="FaceBook Web Api Error,Please Coordinate With Admin.";
                }


                return Ok(response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("updateFacebookadsets")]
        public async Task<ActionResult> updateFacebookadsets([FromBody] FacebookAddSet json)
        {
            try
            {
                ResultResponseModel response = new ResultResponseModel();
                json.CreatedBy = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                json.account_id = CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookAccountId))
                {
                    json.account_id = _settings.facebookAccountId;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();


                //requestData.Add("budget_remaining", json.budget_remaining);
                requestData.Add("name", json.name);
                //  requestData.Add("lifetime_budget", json.lifetime_budget);
                //   requestData.Add("start_time", Convert.ToString(json.start_time));
                //  requestData.Add("end_time", Convert.ToString(json.end_time));
                requestData.Add("campaign_id", json.campaign_id);
                requestData.Add("bid_amount",Convert.ToString(json.bid_amount));
                requestData.Add("billing_event", json.billing_event);
                requestData.Add("status", json.status);
                requestData.Add("daily_budget", Convert.ToString(json.daily_budget));
                requestData.Add("optimization_goal", json.optimization_goal);
                //requestData.Add("targeting", "[\"" + json.targeting + "\"]");
                requestData.Add("targeting", "{\"geo_locations\":{\"countries\":[\"US\"]}}");
                requestData.Add("access_token", token);
                ///json.effective_status = json.status;
                json.configured_status = json.status;
                //requestData.Add("fields", "Id,account_id,budget_rebalance_flag,budget_remaining,buying_type,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,effective_status,is_skadnetwork_attribution,name,objective,smart_promotion_type,source_campaign_id,special_ad_category,start_time,status,stop_time,topline_id,updated_time");
                //json.access_token = token;

                var result = await _facebookService.UpdateAdset(requestData,json.Id);
                if (result != null && result != "BadRequest")
                {
                    var identy = _facebookService.SaveAdset(json);
                    if (identy != null || identy != "")
                    {
                        response.StatusCode = 200;
                        response.ResponseMessage = identy;
                    }
                }
               
                else
                {
                    response.StatusCode = 404;
                    response.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("UpdateFbAd")]
        public async Task<ActionResult> UpdateFbAd([FromBody] FacebookAds ad)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                ad.CreatedBy = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string facebookPageId = CommonSettings.AppSetting["CommonSettings:facebookPageId"];
                ad.account_id = CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookPageId))
                {
                    facebookPageId = _settings.facebookPageId;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookAccountId))
                {
                    ad.account_id = _settings.facebookAccountId;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("name", ad.name);
                requestData.Add("adset_id", ad.adset_id);
                requestData.Add("bid_amount", (ad.bid_amount ?? 0).ToString());
                requestData.Add("creative", "{\"name\":\"" + ad.name + "\", \"object_story_spec\":{ \"page_id\":\"" + facebookPageId + "\", \"link_data\":{ \"link\":\"" + ad.link_url + "\", \"message\":\"" + ad.name + "\"}}}");
                requestData.Add("status", ad.status);
                requestData.Add("access_token", token);
                ad.effective_status = ad.status;
                ad.configured_status = ad.status;
                var result = await _facebookService.UpdateAd(requestData, ad.id);
                if (result != null && result != "BadRequest")
                {
                    var data = JsonConvert.DeserializeObject<FacebookAds>(result);
                    //  ad.id = data.id;
                    string identy = _facebookService.SaveAds(ad);
                    if (result != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = identy;
                    }
                }

                else
                {
                    responseModel.StatusCode = 404;
                    responseModel.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }
               
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }

        [HttpPost]
        [Route("SaveFbAd")]
        public async Task<ActionResult> SaveFbAd([FromBody] FacebookAds ad)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                ad.CreatedBy = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string facebookPageId = CommonSettings.AppSetting["CommonSettings:facebookPageId"];
                ad.account_id = CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookPageId))
                {
                    facebookPageId = _settings.facebookPageId;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookAccountId))
                {
                    ad.account_id = _settings.facebookAccountId;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("name", ad.name);
                requestData.Add("adset_id", ad.adset_id);
                requestData.Add("bid_amount", (ad.bid_amount ?? 0).ToString());
                requestData.Add("creative", "{\"name\":\"" + ad.name + "\", \"object_story_spec\":{ \"page_id\":\"" + facebookPageId + "\", \"link_data\":{ \"link\":\"" + ad.link_url + "\", \"message\":\"" + ad.name + "\"}}}");
                requestData.Add("status", ad.status);
                requestData.Add("access_token", token);
                ad.effective_status = ad.status;
                ad.configured_status = ad.status;
                var result = await _facebookService.PostAd(requestData,companyID);
                if (result != null && result != "BadRequest")
                {
                    var data = JsonConvert.DeserializeObject<FacebookAds>(result);
                    ad.id = data.id;
                    //ad.id = "120330000223142704";
                    string identy = _facebookService.SaveAds(ad);
                    if (result != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = identy;
                    }
                }
                else
                {
                    responseModel.StatusCode = 404;
                    responseModel.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }




                

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }

        [HttpPost]
        [Route("SaveCampaign")]
        public async Task<ActionResult> SaveCampaign([FromBody] FacebookCampaign json)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string companyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                json.account_id = CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookAccountId))
                {
                    json.account_id = _settings.facebookAccountId;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

                decimal daily_budget = 0;
                if(!string.IsNullOrWhiteSpace(json.daily_budget))
                {
                    daily_budget = Convert.ToDecimal(json.daily_budget) ;
                }
                requestData.Add("name", json.name);
                //requestData.Add("daily_budget", "45");
              
                //  requestData.Add("impressions", json.impressions.ToString());
                requestData.Add("special_ad_categories", string.Join(",", json.special_ad_categories.ToArray()));
                 requestData.Add("objective", json.objective);
                requestData.Add("status", json.status);
                requestData.Add("access_token", token);
                json.effective_status = json.status;
                json.configured_status = json.status;
                //requestData.Add("fields", "Id,account_id,budget_rebalance_flag,budget_remaining,buying_type,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,effective_status,is_skadnetwork_attribution,name,objective,smart_promotion_type,source_campaign_id,special_ad_category,start_time,status,stop_time,topline_id,updated_time");
                //json.access_token = token;

                var result = await _facebookService.PostCampaign(requestData,companyID);
                if (result != null && result != "BadRequest")
                {
                    var objResult = JsonConvert.DeserializeObject<FacebookCampaign>(result);
                    json.Id = objResult.Id;
                    json.CreatedBy = userId;
                    //json.Id = "23850118775080080";
                    string identy = _facebookService.SaveCampaign(json);

                    if (result != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = identy;
                    }
                }
                else
                {
                    responseModel.StatusCode = 404;
                    responseModel.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }
               
                return Ok(responseModel);

            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message; 
                return Ok(responseModel);
            }
        }

        [HttpPost]
        [Route("UpdateCampaign")]
        public async Task<ActionResult> UpdateCampaign([FromBody] FacebookCampaign json)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                json.account_id = CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookAccountId))
                {
                    json.account_id = _settings.facebookAccountId;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                //requestData.Add("budget_remaining", json.budget_remaining);
                requestData.Add("name", json.name);
                if (json.special_ad_categories != null)
                    requestData.Add("special_ad_categories", string.Join(",", json.special_ad_categories.ToArray()));
                else
                    requestData.Add("special_ad_categories", "[]");
                requestData.Add("objective", json.objective);
                requestData.Add("status", json.status);
                requestData.Add("access_token", token);
                json.effective_status = json.status;
                json.configured_status = json.status;
                json.CreatedBy = userId;

                var result = await _facebookService.UpdateCampaign(requestData, json.Id);
                if (result != null && result != "BadRequest")
                {
                    var objResult = JsonConvert.DeserializeObject<FacebookCampaign>(result);                    
                    string identy = _facebookService.SaveCampaign(json);
                    if (result != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = identy;
                    }
                }
                else
                {
                    responseModel.StatusCode = 404;
                    responseModel.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }
              
                return Ok(responseModel);

            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }

        [HttpDelete]
        [Route("DeleteCampaign")]
        public async Task<ActionResult> DeleteCampaign(string id)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);

                var result = await _facebookService.DeleteFromFbCampaign(requestData, id);
                var objResult = JsonConvert.DeserializeObject<FacebookCampaign>(result);
                if (result != null && result != "BadRequest")
                {
                    //   json.Id = objResult.Id;
                    var identy = _facebookService.DeleteFromDbCampaign(id);
                    if (result != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Campaign has been Deleted successfully.";
                    }
                }
                else
                {
                    responseModel.StatusCode = 404;
                    responseModel.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }
               
                return Ok(responseModel);

            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }
        [HttpPost]
        [Route("deleteselectedCampaign")]
        [Authorize]
        public async Task<ActionResult> deleteselectedCampaign(string ids)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = ids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                dynamic result = "";
                foreach (var item in values)
                {
                    string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                    _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                    if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                    {
                        token = _settings.facebookSandboxAuth;
                    }
                    IDictionary<string, string> requestData = new Dictionary<string, string>();
                    requestData.Add("access_token", token);

                     result = await _facebookService.DeleteFromFbCampaign(requestData, item);
                  //  var objResult = JsonConvert.DeserializeObject<FacebookCampaign>(result);
                    //   json.Id = objResult.Id;
                   
                    //if (result != null)
                    //{
                        var identy = _facebookService.DeleteFromDbCampaign(item);
                        
                    //}

                }
                //if (result != null)
                //{
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Selected Campaigns has been Deleted successfully.";
               // }

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }
        [HttpGet]
        [Route("GetFacebookCampaignDetails")]
        public ActionResult GetFacebookCampaignDetails(long id)
        {
            try
            {
                var result = _facebookService.GetFacebookCampaignDetails(id, CompanyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        [Route("GetFacebookCampaignAdSetDetails")]
        public ActionResult GetFacebookCampaignAdSetDetails(long id)
        {
            try
            {
                var result = _facebookService.GetFacebookCampaignAdSetDetails(id, CompanyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [Authorize]
        [HttpGet]
        [Route("GetOpportunityList")]
        public async Task<ActionResult> GetOpportunityList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            try
            {
                var data = await _facebookService.GetOpportunityList(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyID, userId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetLeadList")]
        public async Task<ActionResult> GetLeadList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            try
            {
                var data = await _facebookService.GetLeadList(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyID, userId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Route("GetAdList")]
        public async Task<ActionResult> GetAdList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            try
            {
                var data = await _facebookService.GetAdList(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyID, userId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Route("GetFacebookAdSetDetails")]
        public ActionResult GetFacebookAdSetDetails(long id)
        {
            try
            {
                var result = _facebookService.GetFacebookAdSetDetails(id, CompanyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        [Route("GetAdDetails")]
        public ActionResult GetAdDetails(long id)
        {
            try
            {
                var result = _facebookService.GetAdDetails(id, CompanyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete]
        [Route("DeleteAdset")]
        public async Task<ActionResult> DeleteAdset(string id)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);

                var result = await _facebookService.DeleteFromFbCampaign(requestData, id);
                if (result != null && result != "BadRequest")
                {
                    var objResult = JsonConvert.DeserializeObject<FacebookCampaign>(result);
                    //   json.Id = objResult.Id;
                    var identy = _facebookService.DeleteFromDbAdset(id);
                    if (result != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Ad Set has been deleted successfully.";
                    }
                }
                else
                {
                    responseModel.StatusCode = 404;
                    responseModel.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }
               
                return Ok(responseModel);

            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }

        [HttpPost]
        [Route("deleteselectedAdset")]
        [Authorize]
        public async Task<ActionResult> deleteselectedAdset(string ids)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = ids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                dynamic result="";
                foreach (var item in values)
                {
                    string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                    _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                    if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                    {
                        token = _settings.facebookSandboxAuth;
                    }
                    
                    IDictionary<string, string> requestData = new Dictionary<string, string>();
                    requestData.Add("access_token", token);

                     result = await _facebookService.DeleteFromFbCampaign(requestData, item);
                    //if (result != null || result != "")
                    //{
                        var identy = _facebookService.DeleteFromDbAdset(item);
                    //}                      
                   
                }
                //if (result != null)
                //{
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Selected Ad Set(s) has been deleted successfully.";
                //}
               
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }
        [HttpDelete]
        [Route("DeleteAds")]
        public async Task<ActionResult> DeleteAds(string id)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                {
                    token = _settings.facebookSandboxAuth;
                }
                
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);

                var result = await _facebookService.DeleteFromFbCampaign(requestData, id);
                if (result != null && result != "BadRequest")
                {
                    var objResult = JsonConvert.DeserializeObject<FacebookCampaign>(result);
                    //   json.Id = objResult.Id;
                    var identy = _facebookService.DeleteFromDbAds(id);
                    if (result != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Ad has been deleted successfully.";
                    }
                }
                else
                {
                    responseModel.StatusCode = 404;
                    responseModel.ResponseMessage = "FaceBook Web Api Error,Please Coordinate With Admin.";
                }

               
                return Ok(responseModel);

            }
            catch (Exception ex)
            {
                 responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }
        [HttpPost]
        [Route("deleteselectedAds")]
        [Authorize]
        public async Task<ActionResult> deleteselectedAds(string ids)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = ids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                dynamic result = "";
                foreach (var item in values)
                {
                    string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                    _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyID.ToString());
                    if (_settings != null && !string.IsNullOrEmpty(_settings.facebookSandboxAuth))
                    {
                        token = _settings.facebookSandboxAuth;
                    }
                   
                    IDictionary<string, string> requestData = new Dictionary<string, string>();
                    requestData.Add("access_token", token);

                     result = await _facebookService.DeleteFromFbCampaign(requestData, item);
                   // var objResult = JsonConvert.DeserializeObject<FacebookCampaign>(result);
                    //   json.Id = objResult.Id;
                  
                    //if (result != null)
                    //{
                        var identy = _facebookService.DeleteFromDbAds(item);
                    //}
                }
                //if (result != null)
                //{
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Selected Ad(s) has been deleted successfully.";
                //}

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetAdsetListByCampaignId")]
        public async Task<ActionResult> GetAdsetListByCampaignId(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            try
            {
                var data = await _facebookService.GetAdsetListByCampaignId(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyID, userId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

    }
}

