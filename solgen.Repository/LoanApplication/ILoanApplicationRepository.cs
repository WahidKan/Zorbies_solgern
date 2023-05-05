using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ILoanApplicationRepository
    {
        List<MasterItems> GetSubStageDll(Guid userid,long CompanyID);
        Int64 SaveSubstage(savesubstagemodel Model);
        IEnumerable<dynamic> getloansubstage(Guid userid, long CompanyID, long batchid, long modeuleid, long submoduleid);
        IEnumerable<dynamic> GetLoanApplicationSales_Rep(Guid userid, long CompanyID, long applicationid);
        Task<string> GetApplicationById(Guid userid, long CompanyID, long applicationid);
        Task<string> GetLoanStages(Guid userid, long CompanyID, long applicationid);
        string GetLAContractID(long CompanyID, long applicationid);
        string AddUpdateSystemInfo(JsonModel model);
        string AddUpdateDynamicForm(JsonModel model);
        string AddUpdateInstallStepForm(installStepJsonModel model);
        string AddUpdateVerificationdata(JsonModel model);
        string AddUpdateBankdata(JsonModel model);
        Task<string> GetSystemInfo(Guid userid, long CompanyID, long applicationid);
        string AddUpdateApplicant(string jsondata, string userid, long companyId);
        Task<string> GetApplicantInfo(Guid userid, long CompanyID, long applicationid);
        Task<string> GetbankApplicantInfo(Guid userid, long CompanyID, long applicationid);
        string AddUpdateCoApplicant(string jsondata, string userid, long companyId);
        Task<string> GetCoApplicantInfo(Guid userid, long CompanyID, long applicationid);
        string AddUpdateInstallerProperty(string jsondata, string userid, long companyId);
        Task<string> GetInstallerPropertyInfo(Guid userid, long CompanyID, long applicationid);
        string AddUpdatePaymentInfo(string jsondata, string userid, long companyId);
        Task<string> GetPaymentInfo(Guid userid, long CompanyID, long applicationid);
        string AddUpdateLoanProduct(string jsondata, string userid, long companyId);
        Task<string> GetLoanProductInfo(Guid userid, long CompanyID, long applicationid, string submoduleName);

        string AddUpdateReleaseFunds(string jsondata, string userid, long companyId);
        Task<string> GetReleaseFundsInfo(Guid userid, long CompanyID, long applicationid);
        string AddUpdateNtp(string jsondata, string userid, long companyId);
        Task<string> GetNtpInfo(Guid userid, long CompanyID, long applicationid);
        IEnumerable<dynamic> getUploadedImages(long accid, Guid userid, long companyId);
        List<MasterItems> GetToUserDrpList(string userid, string CompanyID, long? loanId,int? isPrivate);

        List<MasterItems> GetFollowUpToList(string loanId, string CompanyID,long commenthistoryId);
        List<MasterItems> GetCCUserDrpList(string userid, string CompanyID);
        string SendManualNotification(AutomaticNotificationModel model);
        string SendEmailForManualNotification(SendMaualNotificationModel model);
        string SaveUserEmail(SendMaualNotificationModel model);
        PagedData GetLoanapplicationNotificationList(long applicationid, string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize);
        PagedData GetAuditHistoryList(long? sectionId, string tableName, string userId, long companyId, long appid);
        PagedData GetAuditHistoryDetail(long? id1, long? id2, string tblName1, string tblName2, string userId, long companyId, string appid);
        long AddComment(CommentModel model);
        PagedData GetCommentHistoryList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid);
        PagedData GetAssignedUserList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid,long commentId);
        PagedData GetRuleEngineHistoryList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid);
        Task<string> GetExpensesIncomeList(string userId, long companyId, long appid);
        Task<string> GetExpensesDebtList(string userId, long companyId, long appid);
         dynamic GetDocumentForReceiveAndPending(string userid, string companyid, string productId, string reqFrom);
        List<dynamic> GetPendingDocumentName(string userid, string companyid, string loanId);
         int AddUpdateExpenseIncome(ExpensesModel model);
        int AddUpdateExpenseDebt(ExpensesModel model);
        Task<string> GetExpensesRatiosDetail(string userId, long companyId, long appid);
        string getloapallicationdataforSF(Guid userid, long CompanyID, long appid);

        PagedData GetLoanApplicationBankerList(string Userid, long CompanyID, string name, string sortDir, string sortColumn, int pageNo, int pageSize, long loanapplicationId);
        PagedData GetLoanApplicationSalesList(string Userid, long CompanyID, string name, string userType, string sortDir, string sortColumn, int pageNo, int pageSize, long loanapplicationId, string listType);
        long saveAssociateBanker(saveAssociateBankerModel model);
        long saveAssignedSalesUserDetail(saveAssociateBankerModel model);
        long saveAssignedApplicationToDealer(saveAssignedApplicationToDealer model);
        List<LoanapplicationDocumentTypeModel> GetLoanapplicationDocumentType(string userid, string companyid, string id);
        string ReplyComment(ReplyCommentModel model);
        long saveReason(loanAppReasonModel model);
        //string UncancelLoanApplication(string id,string reason, Guid userid, long companyid);
        List<dynamic> UncancelLoanApplication(string id, string reason, Guid userid, long companyid);
        long saveOverrideReason(loanAppReasonModel model);
        PagedData GetCanceledLoanApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid);
        List<dynamic> GetUserDetailByUserTypeAppId(string ApplicationId, string CompanyId, string usertype, string moduletype = "");
        List<dynamic> GetBankUserSetCancelReqForNotification(long ApplicationId, string CompanyId, string userid, string reason, string reqdate);
        PagedData GetStateManagementList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        string UpdateOverRide(string userid, long companyId, long loanId);

        Int64 SaveStagesFromSolgen(savesubstagemodel Model);
        string UpdateDenyReson(string userid, long companyId, long loanId, string type, string denyReason);

        Task<string> GetFailedApplicationsForEmail();
        Task<int> SaveScheduledEmails(string data);
        Task<PagedData> GetScheduledEmails(DateTime? filterDate, string sortColumn, string sortDir, int currentPage, int pageSizeValue, long companyId);
        Task<string> GetScheduledEmailsForScheduler();
        Task<int> UpdateScheduledEmails(string data);

        PagedData getCompletedApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid);
        Task<string> GetNewLoanApplicationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, string type, string custom_view_id, Guid? userId, long companyId, long batchid, string listType);
        Task<string> GetApplicationsWithPendingDocuments();
        List<dynamic> GetScheduledNotificationForScheduler();
        Task<string> GetChangeOrderInfoById(Guid userid, long CompanyID, long applicationid);
        Task<string> GetFileSource(Guid userid, long CompanyID, long applicationid, string type);
        Task<string> GetTwilioSMSDetail(Guid userid, long CompanyID, long applicationid, string borrowerNumber);
        Task<int> SwapApplicants(long loanApplicationId, long companyId);
        Task<string> GetLoanApplicationReportList(string sortColumn, string sortDir, int? pageIndex, int? pageSize, string selectedFields, Guid userId, long companyId, string fromDate, string toDate, string customWhereCondition, string filterData);
        Task<string> GetAllReportList(string sortColumn, string sortDir, int pageIndex, int pageSize, string selectedFields, Guid userId, long companyId, string companyType);
        Task<List<LoanApplicationReportFilter>> GetReportDataById(Int64 id, Guid userId, long companyId, string companyType);
        long DeleteReport(string userid, long companyId, long id);
        PagedData GetAssignedApplication(string value, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId);
        string TransferApplicatioto_ToUser(string transferLoanAppId, string fromUserId, string toUserId, Guid userid, long companyId);

        PagedData GetTransferLoanApplicationList(long applicationid, string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize);
        DataTable sftp(string AppId);
        DataTable GetLoanDocDetail(string AppId,long CompanyID);

        string SaveVerityFileTransferDetail(long appId, Guid UserId, long companyId, string Remote, string result);

        List<MasterItems> GetFilterValueDll(Guid userid, long companyid, string id, int length, string serchText, string filterFieldName);
        Task<string> GetGraphVisualizationReportData(string selectedFields, Guid userId, long companyId, string fromDate, string toDate, string customWhereCondition, string filterData, long? groupByFieldId);
        List<LoanApplicationNumberForTranserFilesToSFTP> GetLoanApplicationNumbers();
        string UpdateInternalVerification_SyncStatus(long appId, long companyId, string respone);
        PagedData GetSFTPLogList(string applicationNumber, string sortColumn, string sortDir, int page, int pageSize, Guid userId, long companyId);
    }
}
