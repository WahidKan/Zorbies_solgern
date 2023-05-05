using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
   public interface ISolgenRuleEngineService
    {

        PagedData GetRuleList(string name, long? ModuleId, long? SubModuleId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId);
        Task<string> GetRuleDetailById(Guid userid, long CompanyID, string ruleId);
        bool Save(string jsondata,string ruleid, string userid, long companyId);
        string CheckRuleNameExist(string name, long? ruleId, string userid, long companyId);
        List<dynamic> GetSubModuleEventList(int subModuleId, int companyId);
        string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId);

        string GetDynamicReportFieldsListBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId, string subModuleCode);
        string GetCustomFieldOptionsList(string companyid, string userid, long? moduleId, long? subModuleId, long? fieldId);
        string DeleteRule(string ruleid);
        string ChangeStatus(string id);
        int GetDisplayOrder(int companyId);
        PagedData GetList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);       
        RuleEngineAddOrEditModel GetById(long id);
        List<RuleTypeModel> GetRuleTypeList(long companyID);
        List<dynamic> GetSubModuleList(int moduleId,int companyId);
        List<MasterItems> GetSolgenModules(string masterName, Guid uid, long CompanyID, string masterKeyText = "");
        PagedData GetRuleSummaryList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId);
        List<dynamic> GetRuleEngineVersionList(long ruleId, int companyId, Guid userId);
        List<dynamic> GetLoanApplicationRuleList(long loanApplicationId, string eventCode, int companyId, bool isHistoryDelete = false);
        List<dynamic> GetLoanApplicationRuleTargetList(long ruleId, int companyId);
        dynamic ExecuteRuleEngineTarget(long ruleId, long ruleTrackingId, int companyId, long loanApplicationId, long targetId, string databaseCondition, string displayCondition, int ruleTypeId);
        dynamic ExecuteRuleEngineApplicationStatus(long loanApplicationId, int companyId);
        PagedData GetLoanApplicationListForApplyRule(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long ruleId, string listFor);
        bool ApplyRuleVersion(long ruleId, string loanApplicationIds, long companyId);

        List<dynamic> GetSolgenRuleEngineFormulasList(long companyId, int length, string searchText);
    }
}
