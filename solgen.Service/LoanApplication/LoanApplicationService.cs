using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class LoanApplicationService : ILoanApplicationService   
    {
        private readonly ILoanApplicationRepository _repository;
        public LoanApplicationService(ILoanApplicationRepository repository)
        {
            _repository = repository;
        }
        public string GetLAContractID(long CompanyID, long applicationid)
        {
            return _repository.GetLAContractID(CompanyID, applicationid);
        }
            public List<MasterItems> GetSubStageDll(Guid userid, long CompanyID)
        {
            return _repository.GetSubStageDll(userid, CompanyID);
        }

        public long SaveSubstage(savesubstagemodel Model)
        {
            return _repository.SaveSubstage(Model);
        }
        public IEnumerable<dynamic> getloansubstage(Guid userid,  long CompanyID, long batchid, long modeuleid, long submoduleid) {
            return _repository.getloansubstage(userid,CompanyID,  batchid,modeuleid,submoduleid);
        }

        public async Task<string> GetApplicationById(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetApplicationById(userid, CompanyID, applicationid);

        }

        public async Task<string> GetLoanStages(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetLoanStages(userid, CompanyID, applicationid);

        }
        public string AddUpdateSystemInfo(JsonModel model)
        {
            try
            {
                return _repository.AddUpdateSystemInfo(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public string AddUpdateVerificationdata(JsonModel model)
        {
            try
            {
                return _repository.AddUpdateVerificationdata(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string AddUpdateBankdata(JsonModel model)
        {
            try
            {
                return _repository.AddUpdateBankdata(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string AddUpdateDynamicForm(JsonModel model)
        {
            try
            {
                return _repository.AddUpdateDynamicForm(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string AddUpdateInstallStepForm(installStepJsonModel model)
        {
            try
            {
                return _repository.AddUpdateInstallStepForm(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<string> GetSystemInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetSystemInfo(userid, CompanyID, applicationid);

        }
        public string AddUpdateApplicant(string jsondata, string userid, long companyId)
        {
            return _repository.AddUpdateApplicant(jsondata, userid, companyId);
        }
        public async Task<string> GetApplicantInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetApplicantInfo(userid, CompanyID, applicationid);

        }
        public async Task<string> GetbankApplicantInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetbankApplicantInfo(userid, CompanyID, applicationid);

        }

        public string AddUpdateCoApplicant(string jsondata, string userid, long companyId)
        {
            return _repository.AddUpdateCoApplicant(jsondata, userid, companyId);
        }
        public async Task<string> GetCoApplicantInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetCoApplicantInfo(userid, CompanyID, applicationid);

        }

        public string AddUpdateInstallerProperty(string jsondata, string userid, long companyId)
        {
            return _repository.AddUpdateInstallerProperty(jsondata, userid, companyId);
        }
        public async Task<string> GetInstallerPropertyInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetInstallerPropertyInfo(userid, CompanyID, applicationid);

        }

        public string AddUpdatePaymentInfo(string jsondata, string userid, long companyId)
        {
            return _repository.AddUpdatePaymentInfo(jsondata, userid, companyId);
        }
        public async Task<string> GetPaymentInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetPaymentInfo(userid, CompanyID, applicationid);

        }

        public string AddUpdateLoanProduct(string jsondata, string userid, long companyId)
        {
            return _repository.AddUpdateLoanProduct(jsondata, userid, companyId);
        }
        public async Task<string> GetLoanProductInfo(Guid userid, long CompanyID, long applicationid, string submoduleName)
        {
            return await _repository.GetLoanProductInfo(userid, CompanyID, applicationid, submoduleName);

        }

        public string AddUpdateReleaseFunds(string jsondata, string userid, long companyId)
        {
            return _repository.AddUpdateReleaseFunds(jsondata, userid, companyId);
        }
        public async Task<string> GetReleaseFundsInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetReleaseFundsInfo(userid, CompanyID, applicationid);

        }

        public string AddUpdateNtp(string jsondata, string userid, long companyId)
        {
            return _repository.AddUpdateNtp(jsondata, userid, companyId);
        }
        public async Task<string> GetNtpInfo(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetNtpInfo(userid, CompanyID, applicationid);

        }

        public IEnumerable<dynamic> getUploadedImages(long accid, Guid userid, long companyId)
        {
            return _repository.getUploadedImages(accid, userid, companyId);
        }
        public PagedData GetLoanapplicationNotificationList(long applicationid, string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize)
        {
            return _repository.GetLoanapplicationNotificationList(applicationid, userid, CompanyID, sortDir, sortColumn, pageIndex, pageSize);
        }

        public List<MasterItems> GetToUserDrpList(string userid, string CompanyID, long? loanId,int? isPrivate)
        {
            return _repository.GetToUserDrpList(userid, CompanyID, loanId, isPrivate);
        }

        public List<MasterItems> GetFollowUpToList(string loanId, string CompanyID, long commenthistoryId)
        {
            return _repository.GetFollowUpToList(loanId, CompanyID, commenthistoryId);
        }

        public List<MasterItems> GetCCUserDrpList(string userid, string CompanyID)
        {
            return _repository.GetCCUserDrpList(userid, CompanyID);
        }
        public string SendManualNotification(AutomaticNotificationModel model)
        {
            return _repository.SendManualNotification(model);
        }
        public string SendEmailForManualNotification(SendMaualNotificationModel model)
        {
            return _repository.SendEmailForManualNotification(model);
        }

        public string SaveUserEmail(SendMaualNotificationModel model)
        {
            return _repository.SaveUserEmail(model);
        }
        public PagedData GetAuditHistoryList(long? sectionId, string tableName, string userId, long companyId, long appid)
        {
            return _repository.GetAuditHistoryList(sectionId, tableName, userId, companyId, appid);
        }
        public PagedData GetAuditHistoryDetail(long? id1, long? id2, string tblName1, string tblName2, string userId, long companyId, string appid)
        {
            return _repository.GetAuditHistoryDetail(id1, id2, tblName1, tblName2, userId, companyId, appid);
        }

        public long AddComment(CommentModel model)
        {
            return _repository.AddComment(model);
        }
        public PagedData GetCommentHistoryList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid)
        {
            return _repository.GetCommentHistoryList(userid, CompanyID, sortDir, sortColumn, pageIndex, pageSize, applicationid);
        }
        public PagedData GetAssignedUserList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid,long commentId)
        {
            return  _repository.GetAssignedUserList(userid, CompanyID, sortDir, sortColumn, pageIndex, pageSize, applicationid, commentId);
        }
        public PagedData GetRuleEngineHistoryList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid)
        {
            return _repository.GetRuleEngineHistoryList(userid, CompanyID, sortDir, sortColumn, pageIndex, pageSize, applicationid);
        }
        public async Task<string> GetExpensesDebtList(string userId, long companyId, long appid)
        {
            return await _repository.GetExpensesDebtList(userId, companyId, appid);

        }
        public dynamic GetDocumentForReceiveAndPending(string userid, string companyid, string productId, string reqFrom)
        {
            return _repository.GetDocumentForReceiveAndPending(userid, companyid, productId, reqFrom);
        }
        public List<dynamic> GetPendingDocumentName(string userid, string companyid, string loanId)
        {
            return _repository.GetPendingDocumentName(userid, companyid, loanId);
        }
        public async Task<string> GetExpensesIncomeList(string userId, long companyId, long appid)
        {
            return await _repository.GetExpensesIncomeList(userId, companyId, appid);
        }
        public int AddUpdateExpenseIncome(ExpensesModel model)
        {
            return _repository.AddUpdateExpenseIncome(model);
        }
        public int AddUpdateExpenseDebt(ExpensesModel model)
        {
            return _repository.AddUpdateExpenseDebt(model);
        }

        public async Task<string> GetExpensesRatiosDetail(string userId, long companyId, long appid)
        {
            return await _repository.GetExpensesRatiosDetail(userId, companyId, appid);
        }
        public string getloapallicationdataforSF(Guid userid, long CompanyID, long appid)
        {
            return _repository.getloapallicationdataforSF(userid, CompanyID, appid);
        }

        public PagedData GetLoanApplicationBankerList(string Userid, long CompanyID, string name, string sortDir, string sortColumn, int pageNo, int pageSize, long loanapplicationId)
        {
            return _repository.GetLoanApplicationBankerList(Userid, CompanyID, name, sortDir, sortColumn, pageNo, pageSize, loanapplicationId);
        }
        public PagedData GetLoanApplicationSalesList(string Userid, long CompanyID, string name, string userType, string sortDir, string sortColumn, int pageNo, int pageSize, long loanapplicationId, string listType)
        {
            return _repository.GetLoanApplicationSalesList(Userid, CompanyID, name, userType, sortDir, sortColumn, pageNo, pageSize, loanapplicationId, listType);
        }

        public long saveAssociateBanker(saveAssociateBankerModel model)
        {
            return _repository.saveAssociateBanker(model);
        }
        public long saveAssignedSalesUserDetail(saveAssociateBankerModel model)
        {
            return _repository.saveAssignedSalesUserDetail(model);
        }

        public long saveAssignedApplicationToDealer(saveAssignedApplicationToDealer model)
        {
            return _repository.saveAssignedApplicationToDealer(model);
        }

        public IEnumerable<dynamic> GetLoanApplicationSales_Rep(Guid userid, long CompanyID, long applicationid)
        {
            return _repository.GetLoanApplicationSales_Rep(userid, CompanyID, applicationid); ;
        }
        public List<LoanapplicationDocumentTypeModel> GetLoanapplicationDocumentType(string userid, string companyid, string id)
        {
            return _repository.GetLoanapplicationDocumentType(userid, companyid, id);
        }

        public string ReplyComment(ReplyCommentModel model)
        {
            return _repository.ReplyComment(model);
        }
        public long saveReason(loanAppReasonModel model) {
            return _repository.saveReason(model);
        }
        //public string UncancelLoanApplication(string id, string reason, Guid userid, long companyid)
        //{
        //    return _repository.UncancelLoanApplication(id, reason, userid, companyid);
        //}

        public List<dynamic> UncancelLoanApplication(string id, string reason, Guid userid, long companyid)
        {
            return _repository.UncancelLoanApplication(id, reason, userid, companyid);
        }

        public long saveOverrideReason(loanAppReasonModel model)
        {
            return _repository.saveOverrideReason(model);
        }
        public PagedData GetCanceledLoanApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid)
        {
            return _repository.GetCanceledLoanApplicationList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, batchid);
        }

        public List<dynamic> GetUserDetailByUserTypeAppId(string ApplicationId, string CompanyId, string usertype, string moduletype = "")
        {
            return _repository.GetUserDetailByUserTypeAppId(ApplicationId, CompanyId, usertype, moduletype);
        }
        public List<dynamic> GetBankUserSetCancelReqForNotification(long ApplicationId, string CompanyId, string userid,string reason, string reqdate)
        {
            return _repository.GetBankUserSetCancelReqForNotification(ApplicationId, CompanyId, userid, reason, reqdate);
        }

        public PagedData GetStateManagementList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.GetStateManagementList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public string UpdateOverRide(string userid, long companyId, long loanId)
        {
            return _repository.UpdateOverRide(userid, companyId, loanId);
        }

        public long SaveStagesFromSolgen(savesubstagemodel Model)
        {
            return _repository.SaveStagesFromSolgen(Model);
        }

        public string UpdateDenyReson(string userid, long companyId, long loanId, string type, string denyReason)
        {
            return _repository.UpdateDenyReson(userid, companyId, loanId, type, denyReason);
        }

        public async Task<string> GetFailedApplicationsForEmail()
        {
            return await _repository.GetFailedApplicationsForEmail();
        }

        public async Task<int> SaveScheduledEmails(string data)
        {
            return await _repository.SaveScheduledEmails(data);
        }
        public async Task<string> GetNewLoanApplicationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, string type, string custom_view_id, Guid? userId, long companyId, long batchid, string listType)
        {
            return await _repository.GetNewLoanApplicationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize,type, custom_view_id, userId, companyId, batchid, listType);
        }


        public async Task<PagedData> GetScheduledEmails(DateTime? filterDate, string sortColumn, string sortDir, int currentPage, int pageSizeValue, long companyId)
        {
            return await _repository.GetScheduledEmails(filterDate, sortColumn, sortDir, currentPage, pageSizeValue, companyId);
        }

        public async Task<string> GetScheduledEmailsForScheduler()
        {
            return await _repository.GetScheduledEmailsForScheduler();
        }

        public async Task<int> UpdateScheduledEmails(string data)
        {
            return await _repository.UpdateScheduledEmails(data);
        }

        public PagedData getCompletedApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid)
        {
            return _repository.getCompletedApplicationList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, batchid);
        }

        public async Task<string> GetApplicationsWithPendingDocuments()
        {
            return await _repository.GetApplicationsWithPendingDocuments();
        }

        public List<dynamic> GetScheduledNotificationForScheduler()
        {
            return  _repository.GetScheduledNotificationForScheduler();
        }

        public async Task<string> GetChangeOrderInfoById(Guid userid, long CompanyID, long applicationid)
        {
            return await _repository.GetChangeOrderInfoById(userid, CompanyID, applicationid);

        }

        public async Task<string> GetFileSource(Guid userid, long CompanyID, long applicationid, string type)
        {
            return await _repository.GetFileSource(userid, CompanyID, applicationid, type);

        }

        public async Task<string> GetTwilioSMSDetail(Guid userid, long CompanyID, long applicationid, string borrowerNumber)
        {
            return await _repository.GetTwilioSMSDetail(userid, CompanyID, applicationid, borrowerNumber);

        }

        public Task<int> SwapApplicants(long loanApplicationId, long companyId)
        {
            return _repository.SwapApplicants(loanApplicationId, companyId);
        }

        public async Task<string> GetLoanApplicationReportList(string sortColumn, string sortDir, int? pageIndex, int? pageSize, string selectedFields, Guid userId, long companyId, string fromDate, string toDate, string customWhereCondition, string filterData)
        {
            return await _repository.GetLoanApplicationReportList(sortColumn, sortDir, pageIndex, pageSize, selectedFields, userId, companyId, fromDate, toDate, customWhereCondition, filterData);
        }
        public async Task<string> GetAllReportList(string sortColumn, string sortDir, int pageIndex, int pageSize, string selectedFields, Guid userId, long companyId, string companyType)
        {
            return await _repository.GetAllReportList(sortColumn, sortDir, pageIndex, pageSize, selectedFields, userId, companyId, companyType);
        }

        public Task<List<LoanApplicationReportFilter>> GetReportDataById(Int64 id, Guid userId, long companyId, string companyType)
        {
            return _repository.GetReportDataById(id, userId, companyId, companyType);
        }

        public long DeleteReport(string userid, long companyId, long id)
        {
            return _repository.DeleteReport(userid, companyId, id);
        }
        public PagedData GetAssignedApplication(string value, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId)
        {
            try
            {
                return _repository.GetAssignedApplication(value, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string TransferApplicatioto_ToUser(string transferLoanAppId, string fromUserId, string toUserId, Guid userid, long companyId)
        {
            return _repository.TransferApplicatioto_ToUser(transferLoanAppId, fromUserId, toUserId, userid, companyId);
        }

        public PagedData GetTransferLoanApplicationList(long applicationid, string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize)
        {
            return _repository.GetTransferLoanApplicationList(applicationid, userid, CompanyID, sortDir, sortColumn, pageIndex, pageSize);
        }

        public DataTable sftp(string ApplicationId)
        {
            return _repository.sftp(ApplicationId);
        } 
        public DataTable GetLoanDocDetail(string ApplicationId, long CompanyID)
        {
            return _repository.GetLoanDocDetail(ApplicationId,CompanyID);
        }

        public string SaveVerityFileTransferDetail(long appId, Guid UserId, long companyId, string Remote, string result)
        {
            return _repository.SaveVerityFileTransferDetail(appId, UserId, companyId, Remote, result);
        }
        public List<MasterItems> GetFilterValueDll(Guid userid, long companyid, string id, int length, string serchText, string filterFieldName)
        {
            return _repository.GetFilterValueDll(userid, companyid, id, length, serchText, filterFieldName);
        }

        public async Task<string> GetGraphVisualizationReportData(string selectedFields, Guid userId, long companyId, string fromDate, string toDate, string customWhereCondition, string filterData, long? groupByFieldId)
        {
            return await _repository.GetGraphVisualizationReportData(selectedFields, userId, companyId, fromDate, toDate, customWhereCondition, filterData, groupByFieldId);
        }

        public List<LoanApplicationNumberForTranserFilesToSFTP> GetLoanApplicationNumbers()
        {
            return _repository.GetLoanApplicationNumbers();
        }

        public string UpdateInternalVerification_SyncStatus(long appId, long companyId,string respone)
        {
            return _repository.UpdateInternalVerification_SyncStatus(appId, companyId, respone);
        }

        public PagedData GetSFTPLogList(string applicationNumber, string sortColumn, string sortDir, int page, int pageSize,Guid userId,long companyId)
        {
            try
            {
                return _repository.GetSFTPLogList(applicationNumber, sortColumn, sortDir, page, pageSize, userId, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
