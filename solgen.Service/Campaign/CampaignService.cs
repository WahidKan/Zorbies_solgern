using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class CampaignService:ICampaignService
    {
        private readonly ICampaignRepository _campaignRepository;
        public CampaignService(ICampaignRepository campaignRepository)
        {
            _campaignRepository = campaignRepository;
        }

        public async Task<string> GetCampaignList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return await _campaignRepository.GetCampaignList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public async Task<string> AddOrUpdateCampaign(CampaignModel model)
        {
            return await _campaignRepository.AddOrUpdateCampaign(model);
        }
        public async Task<PagedData> GetCampaignMembersList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _campaignRepository.GetCampaignMembersList(campaignId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public async Task<PagedData> GetCampaignProposalsList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)

        {
            return await _campaignRepository.GetCampaignProposalsList(campaignId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public async Task<PagedData> GetCampaignLeadsList(long campaignId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _campaignRepository.GetCampaignLeadsList(campaignId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

       

    }
}
