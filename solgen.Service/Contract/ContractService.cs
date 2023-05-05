using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class ContractService : IContractService
    {
        private readonly IContractRepository _repository;
        public ContractService(IContractRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetContractOpportunityDetail(string opportunityId)
        {
            return await _repository.GetContractOpportunityDetail(opportunityId);
        }
        public async Task<string> GetContractDetails(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetContractDetails(id, moduleName, submoduleName);
        }
        public string GetContractList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords)
        {
            return _repository.GetContractList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, isAllRecords);
        }

        public string AddEditContract(JsonModel model)
        {
            return _repository.AddEditContract(model);
        }

        public PagedData GetOpportunityList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, string companyID)
        {
            return _repository.GetOpportunityList(Id, sortColumn, sortDir, pageIndex,  pageSize,userId,companyID);
        }
    }
}
