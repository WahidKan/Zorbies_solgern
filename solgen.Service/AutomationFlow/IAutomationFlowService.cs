using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.AutomationFlow
{
    public interface IAutomationFlowService
    {
        string DeleteAutomationFlow(string id, int companyId, string userId);
        PagedData GetAutomationFlow(string sortDir, string sortColumn, int page, int pageSize, string userId, int companyId, int submoduleid, string objectname);
        bool AddEditAutomationFlow(string model, long companyId, string userId);
        string GetAutomationFlowById(long id, string companyId);

        bool VerifyDuplicateFlowName(string name, int? id,long companyId);


        List<dynamic> GetSubModuleList(int companyId);

        List<dynamic> GetAutomationFlowCustomFields(string companyId, string filter, int PageNo, string userId, int subModuleId);

        List<dynamic> GetAutomationFlowCustomFieldsWithoutpaging(string companyId, string userId, int subModuleId);

        List<dynamic> AutomationFlowQueryExecution(string sqlQuery, int subModuleId, string userId, int companyId,string operation,long refId);

        List<dynamic> GetAutomationFlowSubFlow(string companyId, string serchText, int PageNo, string userId, int id);
    }

}
