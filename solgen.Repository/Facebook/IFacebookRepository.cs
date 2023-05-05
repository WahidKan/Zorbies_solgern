using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public interface IFacebookRepository
    {
        string SaveCampaign(FacebookCampaign entity);

        string SaveCampaignInsight(FacebookCampaignInsight entity, long comid, string CallType);
        dynamic SaveAdset(FacebookAddSet entity);
        string SaveAds(FacebookAds entity);
        string SaveAdsetInsight(FacebookAdsetInsight entity, string CallType);
        string SaveAdsInsight(FacebookAdsInsight entity, string CallType);
        string GetAdById(decimal id);

        string GetCampaignById(decimal id);
        string GetAdsetById(decimal id);
        dynamic GetFacebookCampaignDetails(long id, long companyId);
        Task<PagedData> GetOpportunityList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        Task<PagedData> GetLeadList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);

        Task<PagedData> GetAdList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);

        List<dynamic> GetFacebookCampaignAdSetDetails(long id, long companyId);
        dynamic GetFacebookAdSetDetails(long id, long companyId);

        ChangeStatusModel DeleteCampaign(string id);
        ChangeStatusModel DeleteAdset(string id);
        ChangeStatusModel DeleteAds(string id);
        Task<PagedData> GetAdsetListByCampaignId(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId); 
        string SavedemoLead();

        dynamic GetAdDetails(long id, long companyId); 
    }
}
