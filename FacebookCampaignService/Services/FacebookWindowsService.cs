using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Service;
using Solgen.Service.Facebook;
using Solgen.Service.NLog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FacebookCampaignService.Services
{
    public class FacebookWindowsService : IFacebookWindowsService
    {

        private readonly ICampaignService _campaignService;
        private readonly IFacebookService _facebookService;
		private readonly INLoggerService _iNLoggerService;

		public FacebookWindowsService(ICampaignService campaignService, IFacebookService facebookService, INLoggerService iNLoggerService)
        {
            _campaignService = campaignService;
            _facebookService = facebookService;
			this._iNLoggerService = iNLoggerService;
		}

        public async Task<string> GetFacebookCampaigns(string status = "ACTIVE")
        {
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                string fields = CommonSettings.AppSetting["CommonSettings:CampaignsFields"];
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                
                requestData.Add("fields", fields);
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]}]");
                requestData.Add("limit", limit);
                var result = await _facebookService.GetCampaign(requestData,"");
                if (result != null)
                {
                    var data = JsonConvert.DeserializeObject<FacebookCampaignViewModel>(result);
                    if (data.data.Count > 0)
                        _facebookService.SaveCampaign(data.data[0]);
                }
                return result;
            }
            catch (Exception ex)
            {
                _iNLoggerService.Error(ex.Message);
                throw ex;
            }
        }

        public async Task<string> GetFacebookadsets(string status = "ACTIVE")
        {
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                string adsetsFields = CommonSettings.AppSetting["CommonSettings:AdsetsFields"];
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", adsetsFields);
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]}]");
                requestData.Add("limit", limit);
                var result = await _facebookService.GetAdset(requestData, "");
                if (result != null)
                {
                    var data = JsonConvert.DeserializeObject<FacebookAddSetViewModel>(result);
                    if (data.data.Count > 0)
                        _facebookService.SaveAdset(data.data[0]);
                }
                return result;
            }
            catch (Exception ex)
            {
                _iNLoggerService.Error(ex.Message);
                throw ex;
            }
        }

        public async Task<string> GetFacebookads(string status = "ACTIVE")
        {
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                string adsFields = CommonSettings.AppSetting["CommonSettings:AdsFields"];
                                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", adsFields);
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]},{'field':'campaign.effective_status','operator':'IN','value':[" + status + "]},{'field':'adset.effective_status','operator':'IN','value':[" + status + "]}]");
                requestData.Add("limit", limit); 
                var result = await _facebookService.GetFacebookAds(requestData, "");
                if (result != null)
                {
                    var data = JsonConvert.DeserializeObject<FacebookAdsViewModel>(result);
                    if (data.data.Count > 0)
                        _facebookService.SaveAds(data.data[0]);
                }
                return result;
            }
            catch (Exception ex)
            {
                _iNLoggerService.Error(ex.Message);
                throw ex;
            }
        }

        public async Task<string> GetadsInsightsUpdate(string status, string date)
        {
            try
            {
                string token = CommonSettings.AppSetting["CommonSettings:facebookSandboxAuth"];
                string limit = CommonSettings.AppSetting["CommonSettings:fbDataLimit"];
                string insightFields = CommonSettings.AppSetting["CommonSettings:InsightFields"];
                
                IDictionary<string, string> requestData = new Dictionary<string, string>();
                requestData.Add("access_token", token);
                requestData.Add("fields", "id");
                requestData.Add("limit", limit);
                requestData.Add("filtering", "[{'field':'effective_status','operator':'IN','value':[" + status + "]},{'field':'campaign.effective_status','operator':'IN','value':[" + status + "]},{'field':'adset.effective_status','operator':'IN','value':[" + status + "]}]");
                var result = await _facebookService.GetFacebookAds(requestData, "");
                var data = JsonConvert.DeserializeObject<FacebookAdsViewModel>(result);
                foreach (var item in data.data)
                {
                    date = "2021-12-22";

                    IDictionary<string, string> requestData1 = new Dictionary<string, string>();
                    requestData1.Add("access_token", token);
                    requestData1.Add("fields", insightFields );
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

                return result;
            }
            catch (Exception ex)
            {
                _iNLoggerService.Error(ex.Message);
                throw ex;
            }
        }


    }
}
