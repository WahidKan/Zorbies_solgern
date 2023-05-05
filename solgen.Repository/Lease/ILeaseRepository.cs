using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public interface ILeaseRepository
    {
        PagedData GetLeaseRequestList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId);
        PagedData GetLeaseList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId, long companyId);
        PagedData GetContactDocbyLease(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize);
        string AddOrUpdateLease(LeaseAddOrUpdateModel model, bool IsApprovedForPurchase, long companyId);
        Guid AddEditLeaseRequest(AddLeaseRequestModel model);
        LeaseDetailsModel GetLeaseDetail(Guid leaseId, string userid = "", Boolean callFromEdit = false);
        LeaseTemplateModel GetLeaseTemplateDetail(Guid leaseId, string userid);
        string GetContactIdByLeaseRequestId(Guid? id);
        AddLeaseRequestModel LeaseRequestByRequestId(Guid leaseRequestId);
        DeleteLeaseModel DeleteLease(Guid id);

        DeleteLeaseModel SendStatusForWeightSignature(Guid leaseid, Guid userId);
        int DeleteLeaseRequest(Guid id);
        Guid updateLeaseDocument(DocumentUploadModel model);
        PagedData GetLeaseListByStatus(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId);
        PagedData GetleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize);
        PagedData GetFundingPackageleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize);
        LeaseDetailsNotification ReviewSupportingDoc(Guid id, string reviewSupportingDocCreatedBy);
        LeaseDetailsNotification ReviewLeaseDoc(Guid id, string reviewLeaseDocCreatedBy);
        DocuSignDetailModel GetDocuSignDetailByLeaseId(string leaseId);
        Boolean GetLeaseDetailForAproveTobankByLeaseId(Guid leaseId);
        LeaseDetailsNotification UpdateLeaseDosuSignStatus(string leaseId, string sendToDocuSignCreatedBy);
        BankApprovalModel SetLeaseBankApproveStatus(Guid leaseId, int statusId, string sendToBankApprovalCreatedBy);
        SendFundingBankApprovalModel SetLeaseFundingPackageToBankStatus(Guid leaseId, int statusId, string sendToBankApprovalCreatedBy);
        string SetTitleWorkRequest(Guid leaseId, string sendToBankApprovalCreatedBy);
        int ChangeLeaseStatus(Guid leaseId, string userId);
        LeaseDetailsNotification AddDocumentPdf(PDFDocumentModel model, string generateLeaseDocCreatedBy);
        TitleWorkRequestModel GetTitleWorkRequestByLeaseId(Guid leaseId);
        List<MasterItems> GetLeaseInsuranceDropList(string userid);
        CreateInsuranceRequest GetLeaseDetailForCreateInsuranceRequest(string leaseId);
        DeleteLeaseModel SaveInsuranceRequestPreview(SaveCreateInsuranceRequest model, string CreateInsuranceRequestCreatedBy);
        Guid UploadLeaseDocument(LeaseDocumentUploadModel model);
        PagedData LeaseInventoryList(DateTime? expFrom, DateTime? expTo, string leaseStatus, string bankName, string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        PagedData GetTitleWorkRequestReportList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, Guid? leaseId);
        PagedData GetCustomerLogReportList(string name, DateTime? expFrom, DateTime? expTo, Guid? contactStatus, Guid? leaseStatus, Guid? bankName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        PagedData GetMonthlyLeaseLog(string name, DateTime? expFrom, DateTime? expTo, string leaseStatus, Guid? bankName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        DeleteLeaseModel AddCreditScore(CreditScoreCheckModel model, string CheckCreditAction);
        DeleteLeaseModel PrepareUCCFilingRequest(PrepareUCCFilingRequestModal model);
        PagedData GetManageLeaseTemplateList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        ManageLeaseTemplate GetById(Guid id);
        Guid UpdateManageTemplate(ManageLeaseTemplate model);
        CommonStatusModel ChangeStatus(Guid? id);
        LeaseTemplateDetailModel GetLeaseTemplateByTemplateId(string templateId);
        Guid LeaseTemplateEditUpdate(LeaseTemplateDetailModel model);
        int deleteLeaseTemplatebyId(Guid id);
        DeleteLeaseModel UpdateLeaseStatus(string leaseStatus, string leaseId, string userid, string calledFrom);
        string ApprovedByBank(LeaseAddOrUpdateModel model, bool IsApprovedForPurchase);
        string AddEditLead(LeadModel model);
        string AddEditOpportunity(OpportunityModel model);
        string AddEditAccount(JsonModel model);
        string AddEditLender(LenderModel model);
        string CheckDealerCompanyName(string accountid, string dealerCompanyName, string uid, string CompanyID);
    }
}
