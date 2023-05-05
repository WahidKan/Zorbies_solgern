using Solgen.Core;
using Solgen.Repository.AutomationFlow;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.AutomationFlow
{
    public class AutomationFlowService : IAutomationFlowService
    {
        private readonly IAutomationFlowRepository _repository;

        public AutomationFlowService(IAutomationFlowRepository repository)
        {
            this._repository = repository;
        }

        public string DeleteAutomationFlow(string id, int companyId, string userId)
        {
            return _repository.DeleteAutomationFlow(id, companyId, userId);
        }

        public List<dynamic> AutomationFlowQueryExecution(string sqlQuery, int subModuleId, string userId, int companyId,string operation,long refId)
        {
            return _repository.AutomationFlowQueryExecution(sqlQuery, subModuleId, userId, companyId, operation, refId);
        }

        public PagedData GetAutomationFlow(string sortDir, string sortColumn, int page, int pageSize, string userId, int companyId, int submoduleid, string objectname)
        {
            return _repository.GetAutomationFlowList(sortDir,sortColumn,page,pageSize,userId,companyId, submoduleid, objectname);
        }

        public bool AddEditAutomationFlow(string model, long companyId, string userId)
        {
            return _repository.AddEditAutomationFlow(model, companyId, userId);
        }

        public string GetAutomationFlowById(long id, string companyId)
        {
            return _repository.GetAutomationFlowById(id, companyId);
        }

		public bool VerifyDuplicateFlowName(string name, int? id, long companyId)
		{
            return _repository.VerifyDuplicateFlowName(name, id,companyId);
        }


        public List<dynamic> GetSubModuleList(int companyId)
        {
            try
            {
                return _repository.GetSubModuleList(companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }
    


        public List<dynamic> GetAutomationFlowCustomFields(string companyId, string filter,  int PageNo, string userId, int subModuleId)
        {
            return _repository.GetAutomationFlowCustomFields(companyId, filter, PageNo, userId, subModuleId);
        }

        public List<dynamic> GetAutomationFlowSubFlow(string companyId, string serchText, int PageNo, string userId, int id)
        {
            return _repository.GetAutomationFlowSubFlow(companyId, serchText, PageNo, userId, id);
        }

        

        public List<dynamic> GetAutomationFlowCustomFieldsWithoutpaging(string companyId, string userId, int subModuleId)
        {
            return _repository.GetAutomationFlowCustomFieldsWithoutpaging(companyId, userId, subModuleId);
        }
    }
}
