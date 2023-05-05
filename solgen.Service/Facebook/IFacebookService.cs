using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.Facebook
{
    public interface IFacebookService
    {
        Task<string> CreateCampaign(IDictionary<string, string> values);
        Task<string> GetCampaign(IDictionary<string, string> fields, string companyId);
        Task<string> GetAdCreative(IDictionary<string, string> fields,string companyId);
        Task<string> GetCampaignInsight(IDictionary<string, string> fields, string Id);
        Task<string> GetAdset(IDictionary<string, string> fields, string companyId);
        Task<string> GetAdsetInsight(IDictionary<string, string> fields, string Id);
        Task<string> GetAdsets(IDictionary<string, string> fields, string companyId);
        Task<string> GetFacebookAds(IDictionary<string, string> fields, string companyId);
        Task<string> GetFacebookAdsInsight(IDictionary<string, string> fields, string Id);
        Task<string> PostCampaign(IDictionary<string, string> fields, string companyId);
        Task<string> DeleteFromFbCampaign(IDictionary<string, string> fields,string id);
        Task<string> UpdateCampaign(IDictionary<string, string> fields, string id);
        Task<string> PostAdset(IDictionary<string, string> fields, string companyId);
        Task<string> UpdateAdset(IDictionary<string, string> fields, string id);
        string SaveCampaign(FacebookCampaign entity); 
        Task<string> PostAd(IDictionary<string, string> fields, string companyId);
        Task<string> UpdateAd(IDictionary<string, string> fields, string id);
        string SaveAds(FacebookAds entity);
        string SaveAdsInsight(FacebookAdsInsight entity, string CallType);
        string SaveCampaignInsight(FacebookCampaignInsight entity, long comid, string CallType);
        dynamic SaveAdset(FacebookAddSet entity);
        string SaveAdsetInsight(FacebookAdsetInsight entity, string CallType);
        string GetAdById(decimal id);
        string GetCampaignById(decimal id);
        string GetAdsetById(decimal id);
        dynamic GetFacebookCampaignDetails(long id, long companyId);
        Task<PagedData> GetOpportunityList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        Task<PagedData> GetLeadList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        Task<PagedData> GetAdList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);

        
        List<dynamic> GetFacebookCampaignAdSetDetails(long id, long companyId);
        dynamic GetFacebookAdSetDetails(long id, long companyId);
        ChangeStatusModel DeleteFromDbCampaign(string id);
        ChangeStatusModel DeleteFromDbAdset(string id);
        ChangeStatusModel DeleteFromDbAds(string id);
       Task<PagedData> GetAdsetListByCampaignId(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        Task<string> GetLead(IDictionary<string, string> fields, string LeadId);

        dynamic GetAdDetails(long id, long companyId); 
        string Savedemolead();

    }
}
