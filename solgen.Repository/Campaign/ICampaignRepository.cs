using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ICampaignRepository
    {
        Task<string> GetCampaignList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);
        Task<string> AddOrUpdateCampaign(CampaignModel model);
        Task<PagedData> GetCampaignMembersList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetCampaignProposalsList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetCampaignLeadsList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);

      
    }
}
