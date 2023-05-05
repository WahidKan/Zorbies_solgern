using Solgen.Core;
using Solgen.Core.Extensions;
using Solgen.Repository;
using Solgen.Repository.CompanySetting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.Facebook
{
    public class FacebookService : IFacebookService
    {

        private readonly IFacebookRepository _facebookRepository;
        private readonly ICompanyIntegrationSettingRepository _companyIntegrationSettingRepository;
        public FacebookService(IFacebookRepository facebookRepository,ICompanyIntegrationSettingRepository companyIntegrationSettingRepository)
        {
            _facebookRepository = facebookRepository;
            _companyIntegrationSettingRepository = companyIntegrationSettingRepository;
        }


        //public FacebookService()
        //{

        //}
        public async Task<PagedData> GetAdsetListByCampaignId(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _facebookRepository.GetAdsetListByCampaignId(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }
        
        public Task<string> CreateCampaign(IDictionary<string, string> values)
        {
            return null;
            //FacebookHttpClient client = FacebookHttpClient.Create();
            //client.Post()
        }

        public async Task<string> GetCampaign(IDictionary<string, string> fields,string companyId)
        {
            var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
            FacebookHttpClient client = FacebookHttpClient.Create(settings);
            string url = "/campaigns?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }
        public async Task<string> GetAdCreative(IDictionary<string, string> fields,string companyId)
        {
            var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
            FacebookHttpClient client = FacebookHttpClient.Create(settings);
            string url = "/adcreatives?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }


        public async Task<string> UpdateCampaign(IDictionary<string, string> fields, string id)
        {
            FacebookHttpClient client = FacebookHttpClient.Update();
            string url = "/" + id;
            var result = await client.Post(url, fields);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return Convert.ToString(result.StatusCode);
            }
        }

        public async Task<string> DeleteFromFbCampaign(IDictionary<string, string> fields, string id)
        {
            FacebookHttpClient client = FacebookHttpClient.Update();
            string url = id + "?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Delete(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return Convert.ToString(result.StatusCode);
            }
        }

        public ChangeStatusModel DeleteFromDbCampaign(string id)
        {
            try
            {
                return _facebookRepository.DeleteCampaign(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public ChangeStatusModel DeleteFromDbAdset(string id)
        {
            try
            {
                return _facebookRepository.DeleteAdset(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public ChangeStatusModel DeleteFromDbAds(string id)
        {
            try
            {
                return _facebookRepository.DeleteAds(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<string> UpdateAdset(IDictionary<string, string> fields, string id)
        {
            FacebookHttpClient client = FacebookHttpClient.Update();
            string url = "/" + id;
            var result = await client.Post(url, fields);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return Convert.ToString(result.StatusCode);
            }
        }


        public async Task<string> PostCampaign(IDictionary<string, string> fields,string companyId)
        {
            var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
            FacebookHttpClient client = FacebookHttpClient.Create(settings);
            string url = "/campaigns";
            var result = await client.Post(url, fields);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return Convert.ToString(result.StatusCode);
            }
        }
        public async Task<string> PostAdset(IDictionary<string, string> fields,string companyId)
        {
            try
            {
                var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
                FacebookHttpClient client = FacebookHttpClient.Create(settings);
                string url = "/adsets";
                var result = await client.Post(url, fields);
                if (result.StatusCode == HttpStatusCode.OK)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                else
                {


                   return Convert.ToString(result.StatusCode);
                    //throw new Exception(abc);
                    //return abc;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<string> GetCampaignInsight(IDictionary<string, string> fields, string Camid)
        {
            FacebookHttpClient client = FacebookHttpClient.CreateInsight();
            string url = Camid + "/insights?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }

        public async Task<string> GetAdset(IDictionary<string, string> fields,string companyId)
        {
            var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
            FacebookHttpClient client = FacebookHttpClient.Create(settings);
            string url = "/adsets?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }


        public async Task<string> GetLead(IDictionary<string, string> fields, string Camid)
        {
            FacebookHttpClient client = FacebookHttpClient.CreateInsight();
            string url = Camid + "?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }


        public async Task<string> GetAdsetInsight(IDictionary<string, string> fields, string Camid)
        {
            FacebookHttpClient client = FacebookHttpClient.CreateInsight();
            string url = Camid + "/insights?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }

        public async Task<string> GetFacebookAdsInsight(IDictionary<string, string> fields, string adid)
        {
            FacebookHttpClient client = FacebookHttpClient.CreateInsight();
            string url = adid + "/insights?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }


        public async Task<string> GetFacebookAds(IDictionary<string, string> fields,string companyId)
        {
            var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
            FacebookHttpClient client = FacebookHttpClient.Create(settings);
            string url = "/ads?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }


        public async Task<string> GetAdsets(IDictionary<string, string> fields,string companyId)
        {
            var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
            FacebookHttpClient client = FacebookHttpClient.Create(settings);
            string url = "/adsets?" + ConvertDictionaryValuesToUrlString(fields);
            var result = await client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }
        private string ConvertDictionaryValuesToUrlString(IDictionary<string, string> fields)
        {
            return String.Join("&", fields.Select(v => $"{v.Key}={v.Value}"));
        }


        public string SaveCampaign(FacebookCampaign entity)
        {
            try
            {
                return _facebookRepository.SaveCampaign(entity);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic SaveAdset(FacebookAddSet entity)
        {
            try
            {
                return _facebookRepository.SaveAdset(entity);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }





        public string SaveAds(FacebookAds entity)
        {
            try
            {
                return _facebookRepository.SaveAds(entity);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


        public string SaveCampaignInsight(FacebookCampaignInsight entity, long comid, string CallType)
        {
            try
            {
                return _facebookRepository.SaveCampaignInsight(entity, comid, CallType);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


        public string SaveAdsetInsight(FacebookAdsetInsight entity, string CallType)
        {
            try
            {
                return _facebookRepository.SaveAdsetInsight(entity, CallType);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string SaveAdsInsight(FacebookAdsInsight entity, string CallType)
        {
            try
            {
                return _facebookRepository.SaveAdsInsight(entity, CallType);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string GetAdById(decimal id)
        {
            try
            {
                return _facebookRepository.GetAdById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string GetCampaignById(decimal id)
        {
            try
            {
                return _facebookRepository.GetCampaignById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }
        public string GetAdsetById(decimal id)
        {
            try
            {
                return _facebookRepository.GetAdsetById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        public async Task<string> PostAd(IDictionary<string, string> fields,string companyId)
        {
            var settings = _companyIntegrationSettingRepository.GetCompanyIntegrationSettingById(companyId);
            FacebookHttpClient client = FacebookHttpClient.Create(settings);
            string url = "/ads";
            var result = await client.Post(url, fields);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }        
             else
            {
                return Convert.ToString(result.StatusCode);
               
            }
        }

        public async Task<string> UpdateAd(IDictionary<string, string> fields, string id)
        {
            var client = FacebookHttpClient.Update();
            string url = "/" + id;
            var result = await client.Post(url, fields);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return Convert.ToString(result.StatusCode);

            }
        }

        public dynamic GetFacebookCampaignDetails(long id, long companyId)
        {
            try
            {
                return _facebookRepository.GetFacebookCampaignDetails(id, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetFacebookCampaignAdSetDetails(long id, long companyId)
        {
            try
            {
                return _facebookRepository.GetFacebookCampaignAdSetDetails(id, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<PagedData> GetOpportunityList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _facebookRepository.GetOpportunityList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }
        public async Task<PagedData> GetLeadList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _facebookRepository.GetLeadList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }

        public async Task<PagedData> GetAdList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _facebookRepository.GetAdList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }
        public dynamic GetFacebookAdSetDetails(long id, long companyId)
        {
            try
            {
                return _facebookRepository.GetFacebookAdSetDetails(id, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic GetAdDetails(long id, long companyId)
        {
            try
            {
                return _facebookRepository.GetAdDetails(id, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        
        public string Savedemolead()
        {
            try
            {
                return _facebookRepository.SavedemoLead();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


    }
}
