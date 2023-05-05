using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.SolgenQueue
{
    public interface ISolgenQueueRepository
    {
        List<MasterItems> GetSolgenModules(string masterName, Guid uid, long CompanyID, string masterKeyText = "");
        PagedData GetQueueList(string filter, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId);
        Task<string> GetQueueDetailById(Guid userid, long CompanyID, string queueId);
        bool Save(string jsondata, string queueid, string userid, long companyId);
        string CheckQueueNameExist(string name, long? queueId, string userid, long companyId);
        List<dynamic> GetSubModuleEventList(int subModuleId, int companyId);
        string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId);
        string GetCustomFieldOptionsList(string companyid, string userid, long? moduleId, long? subModuleId, long? fieldId);
        string DeleteQueue(string queueid);
        string ChangeStatus(string id);
        int GetDisplayOrder(int companyId);
        PagedData GetList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        List<dynamic> GetSubModuleList(int companyId);
        PagedData GetQueueSummaryList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId);
        List<dynamic> GetQueueVersionList(long queueId, int companyId, Guid userId);
        List<dynamic> GetLoanApplicationQueueList(long loanApplicationId, string eventCode, int companyId, bool isHistoryDelete = false);
        List<dynamic> GetLoanApplicationQueueTargetList(long queueId, int companyId);
        dynamic ExecuteQueueTarget(long queueId, long queueTrackingId, int companyId, long loanApplicationId, long targetId, string databaseCondition, string displayCondition, int queueTypeId);
        dynamic ExecuteQueueApplicationStatus(long loanApplicationId, int companyId);
        PagedData GetLoanApplicationListForApplyQueue(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long queueId, string listFor);
        bool ApplyQueueVersion(long queueId, string loanApplicationIds, long companyId);

        List<dynamic> GetSolgenQueueFormulasList(long companyId, int length, string searchText);


    }
}
