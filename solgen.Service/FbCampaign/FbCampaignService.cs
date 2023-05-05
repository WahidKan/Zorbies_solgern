using Solgen.Core;
using Solgen.Repository.FbCampaign;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.FbCampaign
{
    public class FbCampaignService : IFbCampaignService
    {
        private readonly IFbCampaignRepository _repository;
        public FbCampaignService(IFbCampaignRepository repository)
        {
            _repository = repository;
        }
        public string AddEditCampaign(JsonModel model)
        {
            return _repository.AddEditCampaign(model);
        }

        public async Task<string> GetCampaignDetailsbyid(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetCampaignDetailsById(id, moduleName, submoduleName);
        }
        public async Task<PagedData> GetCampaignList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, int pageIndex, string pageSize, long companyID)
        {
            return await _repository.GetCampaignList(name,fromDate, toDate,sortColumn,  sortDir,  pageIndex,  pageSize,companyID);
        }
        public async Task<PagedData> GetAddsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, string pageIndex, string pageSize, long companyID)
        {
            return await _repository.GetAddsList(name, fromDate, toDate, sortColumn, sortDir, pageIndex, pageSize, companyID);
        }
        public async Task<PagedData> GetAddSetsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, string pageIndex, string pageSize, long companyID)
        {
            return await _repository.GetAddSetsList(name, fromDate, toDate, sortColumn, sortDir, pageIndex, pageSize, companyID);
        }
        


    }
}
