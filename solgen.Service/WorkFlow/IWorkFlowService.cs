using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Solgen.Service
{
   public interface IWorkFlowService
    {
        PagedData GetList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        bool Save(string jsondata, string userid, long companyId);
        RuleEngineAddOrEditModel GetById(long id);
        List<MasterItems> GetCustomButtonDDL(Guid userid, long companyid, string id, int length, string serchText);
        Task<int> saveCustomButton(WorkFlowModel data, Guid userid, long companyid);
        WorkFlowModel GetCustomButtonDetailByFlowId(long? id, long? companyId, Guid? userId);
        string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId, long screenid, bool isdecision);
        string CheckRuleNameExist(string name, long? ruleId, string userid, long companyId);

        PagedData GetRuleList(string name, long? loanProduct, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId);
        Task<string> GetRuleDetailById(Guid userid, long CompanyID, long ruleId);
        string DeleteRule(long ruleid);
        string ChangeStatus(long id);
        List<RuleTypeModel> GetRuleTypeList(long companyID);
        List<dynamic> GetSubModuleList(int moduleId, int companyId, string screenids, bool isDecision);

        List<dynamic> GetSubModuleEventList(int subModuleId, int companyId);
        PagedData GetRuleSummaryList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId);
        List<dynamic> GetRuleEngineVersionList(long ruleId, int companyId, Guid userId);
        List<dynamic> GetLoanApplicationRuleList(long loanApplicationId, string eventCode, int companyId, bool isHistoryDelete = false);
        List<dynamic> GetLoanApplicationRuleTargetList(long ruleId, int companyId);
        dynamic ExecuteRuleEngineTarget(long ruleId, long ruleTrackingId, int companyId, long loanApplicationId, long targetId, string databaseCondition, string displayCondition, int ruleTypeId);
        dynamic ExecuteRuleEngineApplicationStatus(long loanApplicationId, int companyId, Guid userid);
        int GetDisplayOrder(int companyId);
        PagedData GetLoanApplicationListForApplyRule(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long ruleId, string listFor);
        bool ApplyRuleVersion(long ruleId, string loanApplicationIds, long companyId);
        string getScreenFormField(long? moduleId, long? subModuleId, long? formid, string userid, long companyId);
        PagedData GetScreenFormsList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long submoduleid, string usedSreenid);
    }
}
