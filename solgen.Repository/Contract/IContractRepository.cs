using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
   public interface IContractRepository
    {
        string GetContractList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords);
        Task<string> GetContractDetails(string id, string moduleName, string submoduleName);
        string AddEditContract(JsonModel model);
        PagedData GetOpportunityList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, string companyID);
        Task<string> GetContractOpportunityDetail(string opportunityId);
    }
}
