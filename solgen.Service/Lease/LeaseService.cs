using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;

namespace Solgen.Service
{
    public class LeaseService : ILeaseService
    {

        private readonly ILeaseRepository _repository;
        public LeaseService(ILeaseRepository repository)
        {
            _repository = repository;
        }

        public string AddOrUpdateLease(LeaseAddOrUpdateModel model, bool IsApprovedForPurchase,long companyId)
        {
            return _repository.AddOrUpdateLease(model, IsApprovedForPurchase,companyId);
        }
        /*! 
   * \brief   Add edit lease request
   * \details Add edit lease request
   * \author  deepak jha
   * \date    15 Nov 2019
   * \version 1.0    
   */
        public Guid AddEditLeaseRequest(AddLeaseRequestModel model)
        {
            return _repository.AddEditLeaseRequest(model);
        }
        /*! 
      * \brief   Get the lease detail
      * \details Get the Get the lease detail
      * \author  deepak jha
      * \date    14 august 2019
      * \version 1.0    
      */
        public LeaseDetailsModel GetLeaseDetail(Guid leaseId, string userid = "", Boolean callFromEdit = false)
        {
            return _repository.GetLeaseDetail(leaseId, userid, callFromEdit);
        }
        /*! 
      * \brief   Get the contact detail by lease request id
      * \details Get the contact detail by lease request id
      * \author  deepak jha
      * \date    14 august 2019
      * \version 1.0    
      */
        public string GetContactIdByLeaseRequestId(Guid? id)
        {
            return _repository.GetContactIdByLeaseRequestId(id);
        }
        /*! 
      * \brief   Get the list of Lease Request
      * \details Get the list of Lease Request
      * \author  Surendra Maurya
      * \date    14 Nov 2019
      * \version 1.0    
      */
        public PagedData GetLeaseRequestList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId,long companyId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.GetLeaseRequestList(searchText, sortColumn, sortDir, pageIndex, pageSize, userId,companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
     * \brief   Get the lease request by request id
     * \details Get the Get the lease request by request id.
     * \author  deepak jha
     * \date    14 dec 2019
     * \version 1.0    
     */
        public AddLeaseRequestModel LeaseRequestByRequestId(Guid leaseRequestId)
        {
            return _repository.LeaseRequestByRequestId(leaseRequestId);
        }
        /*! 
       * \brief   Get the list of Lease
       * \details Get the list of Lease
       * \author  Kiran Bala 
       * \date    27 Sep 2019
       * \version 1.0    
       */
        public PagedData GetLeaseList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId,long companyId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.GetLeaseList(searchText, leaseStatus, saleMan, expFrom, expTo, commFrom, commTo, sortColumn, sortDir, pageIndex, pageSize, userId, isDashboard, contactId,companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
      * \brief   Get the conatct doc list of Lease
      * \details Get the conatct doc list of Lease
      * \author  Dheeraj 
      * \date    10 Oct 2019
      * \version 1.0    
      */
        public PagedData GetContactDocbyLease(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {

                return _repository.GetContactDocbyLease(leaseId, sortColumn, sortDir, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
       * \brief   Delete Lease
       * \details Delete Lease
       * \author  Kiran Bala 
       * \date    3 Oct 2019
       * \version 1.0    
       */
        public DeleteLeaseModel DeleteLease(Guid guid)
        {
            try
            {
                return _repository.DeleteLease(guid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
    * \brief   Update lease for WetSignature
    * \details Update lease for WetSignature by lease id and user Id
    * \author  deepak jha
    * \date    14 dec 2019
    * \version 1.0    
    */
        public DeleteLeaseModel SendStatusForWeightSignature(Guid leaseid, Guid userId)
        {
            return _repository.SendStatusForWeightSignature(leaseid, userId);
        }
        /*! 
         * \brief   delete Lease Request
         * \details  Function is used to delete Lease Request
         * \author  Surendra Maurya
         * \date    15 Nov 2019
         * \version 1.0    
         */
        public int DeleteLeaseRequest(Guid guid)
        {
            try
            {
                return _repository.DeleteLeaseRequest(guid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
    * \brief   Update lease  Document
    * \details Update lease Document.
    * \author  deepak jha
    * \date    14 dec 2019
    * \version 1.0    
    */
        public Guid updateLeaseDocument(DocumentUploadModel model)
        {
            return _repository.updateLeaseDocument(model);
        }
        /*! 
      * \brief   Get the list of Lease
      * \details Get the list of Lease by Status
      * \author  Rahul Sharma 
      * \date    09 Oct 2019
      * \version 1.0    
      */
        public PagedData GetLeaseListByStatus(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.GetLeaseListByStatus(searchText, leaseStatus, saleMan, expFrom, expTo, commFrom, commTo, sortColumn, sortDir, pageIndex, pageSize, userId, isDashboard, contactId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
        * \brief   Get the UCC doc of Lease
        * \details Get the UCC doc of Lease
        * \author  Aakash Sharma 
        * \date    17 Oct 2019
        * \version 1.0    
        */
        public PagedData GetleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {

                return _repository.GetleaseReviewDoc(leaseId, sortColumn, sortDir, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public PagedData GetFundingPackageleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {

                return _repository.GetFundingPackageleaseReviewDoc(leaseId, sortColumn, sortDir, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
    * \brief   Update lease  form review supproting doc
    * \details Update lease Document.
    * \author  Rahul sharma
    * \date    14 dec 2019
    * \version 1.0    
    */
        public LeaseDetailsNotification ReviewSupportingDoc(Guid id, string reviewSupportingDocCreatedBy)
        {
            try
            {
                return _repository.ReviewSupportingDoc(id, reviewSupportingDocCreatedBy);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
    * \brief   Update lease  form lease review doc
    * \details Update lease  form lease review doc.
    * \author  Rahul sharma
    * \date    14 dec 2019
    * \version 1.0    
    */
        public LeaseDetailsNotification ReviewLeaseDoc(Guid id, string reviewLeaseDocCreatedBy)
        {
            try
            {
                return _repository.ReviewLeaseDoc(id, reviewLeaseDocCreatedBy);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
        * \brief   Get the Lease information by LeaseId and ContactId
        * \details Get the user detail  Lease information by LeaseId and ContactId
        * \author  Deepak jha
        * \date    23 Oct 2019
        * \version 1.0    
        */
        public DocuSignDetailModel GetDocuSignDetailByLeaseId(string leaseId)
        {
            try
            {
                return _repository.GetDocuSignDetailByLeaseId(leaseId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
        * \brief   Get the Lease information for approve for purchase by LeaseId 
        * \details Get the user detail  Lease information for approve for purchase by LeaseId 
        * \author  Deepak jha
        * \date    6 Dec 2019
        * \version 1.0    
        */
        public Boolean GetLeaseDetailForAproveTobankByLeaseId(Guid leaseId)
        {
            try
            {
                return _repository.GetLeaseDetailForAproveTobankByLeaseId(leaseId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
       * \brief  Update Lease when dosuSign send document to client
    * \details Update lease when document send ,i.e IsSendToDocuSign And SendToDocuSignDate
        * \author  Deepak jha
        * \date    23 Oct 2019
        * \version 1.0    
        */
        public LeaseDetailsNotification UpdateLeaseDosuSignStatus(string leaseId, string sendToDocuSignCreatedBy)
        {
            try
            {
                return _repository.UpdateLeaseDosuSignStatus(leaseId, sendToDocuSignCreatedBy);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public BankApprovalModel SetLeaseBankApproveStatus(Guid leaseId, int statusId, string sendToBankApprovalCreatedBy)
        {
            return _repository.SetLeaseBankApproveStatus(leaseId, statusId, sendToBankApprovalCreatedBy);
        }
        /*! 
      * \brief   set staus for funding package
      * \details Function is used to  update status for funding package.
      * \author  deepak jha 
      * \date    2 octber 2019
      * \version 1.0    
      */
        public SendFundingBankApprovalModel SetLeaseFundingPackageToBankStatus(Guid leaseId, int statusId, string sendToBankApprovalCreatedBy)
        {
            return _repository.SetLeaseFundingPackageToBankStatus(leaseId, statusId, sendToBankApprovalCreatedBy);
        }
        /*! 
      * \brief   set staus for set Title Work Request
      * \details Function is used to internally in api using update status for set Title Work Request 
      * status.
      * \author  deepak jha 
      * \date    2 octber 2019
      * \version 1.0    
      */
        public string SetTitleWorkRequest(Guid leaseId, string sendToBankApprovalCreatedBy)
        {
            return _repository.SetTitleWorkRequest(leaseId, sendToBankApprovalCreatedBy);
        }
        /*! 
       * \brief   Bank user approve for purchase to lease
       * \details Function is used to approve for purchase lease
       * \author  dheeraj patyal
       * \date    25 October 2019
       * \version 1.0    
       */
        public int ChangeLeaseStatus(Guid leaseId, string userId)
        {
            return _repository.ChangeLeaseStatus(leaseId, userId);
        }

        /*! 
   * \brief  Update Lease document pdf 
    * \details Update Lease document pdf 
    * \author  rahul Sharma
    * \date    31 Oct 2019
    * \version 1.0    
    */
        public LeaseDetailsNotification AddDocumentPdf(PDFDocumentModel model, string generateLeaseDocCreatedBy)
        {
            return _repository.AddDocumentPdf(model, generateLeaseDocCreatedBy);
        }
        /*! 
     *  \brief     GetTitleWorkRequestByLeaseId API.
     *  \details   This API is used to get title work request ID by Lease id.
     *  \author    deepak jha
     *  \version   1.0
     *  \date      2-12-2019
     *  \pre       First initialize the system.
     *  \copyright Solgen.
     */
        public TitleWorkRequestModel GetTitleWorkRequestByLeaseId(Guid leaseId)
        {
            return _repository.GetTitleWorkRequestByLeaseId(leaseId);
        }
        /*! 
     *  \brief     GetLeaseInsuranceDropList API.
     *  \details   This API is used to Get Lease Insurance DropList.
     *  \author    anish k
     *  \version   1.0
     *  \date      2-12-2019
     *  \pre       First initialize the system.
     *  \copyright Solgen.
     */
        public List<MasterItems> GetLeaseInsuranceDropList(string userid)
        {
            return _repository.GetLeaseInsuranceDropList(userid);
        }
        /*! 
    *  \brief     GetLeaseDetailForCreateInsuranceRequest API.
    *  \details   This API is used to Get  Get Lease Detail For Create Insurance Request.
    *  \author    anish k
    *  \version   1.0
    *  \date      2-12-2019
    *  \pre       First initialize the system.
    *  \copyright Solgen.
    */
        public CreateInsuranceRequest GetLeaseDetailForCreateInsuranceRequest(string leaseId)
        {
            return _repository.GetLeaseDetailForCreateInsuranceRequest(leaseId);
        }
        public DeleteLeaseModel SaveInsuranceRequestPreview(SaveCreateInsuranceRequest model, string CreateInsuranceRequestCreatedBy)
        {
            return _repository.SaveInsuranceRequestPreview(model, CreateInsuranceRequestCreatedBy);
        }
        /*! 
   * \brief  updated into signed lease document
    * \details  updated into signed lease document pdf 
    * \author  deepak jha
    * \date    6 Dec 2019
    * \version 1.0    
    */
        public Guid UploadLeaseDocument(LeaseDocumentUploadModel model)
        {
            return _repository.UploadLeaseDocument(model);
        }
        /*! 
     * \brief   Get the list of Lease Request
     * \details Get the list of Lease Request
     * \author  Surendra Maurya
     * \date    11 Dec 2019
     * \version 1.0    
     */
        public PagedData LeaseInventoryList(DateTime? expFrom, DateTime? expTo, string leaseStatus, string bankName, string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.LeaseInventoryList(expFrom, expTo, leaseStatus, bankName, searchText, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
     * \brief   Get the Get Title Work Request Report List
     * \details Get the  Get Title Work Request Report List
     * \author  deepak jha
     * \date    11 Dec 2019
     * \version 1.0    
     */
        public PagedData GetTitleWorkRequestReportList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, Guid? leaseId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.GetTitleWorkRequestReportList(name, From, To, sortColumn, sortDir, page, pageSize, userId, leaseId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
     * \brief   Get the Get Get Customer Log Report List
     * \details Get the  Get Get Customer Log Report List
     * \author  surander mouria
     * \date    11 Dec 2019
     * \version 1.0    
     */
        public PagedData GetCustomerLogReportList(string name, DateTime? expFrom, DateTime? expTo, Guid? contactStatus, Guid? leaseStatus, Guid? bankName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                return _repository.GetCustomerLogReportList(name, expFrom, expTo, contactStatus, leaseStatus, bankName, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
     * \brief   Get the Get Monthly Lease Log
     * \details Get the Get Monthly Lease Log
     * \author  deepak jha
     * \date    11 Dec 2019
     * \version 1.0    
     */
        public PagedData GetMonthlyLeaseLog(string name, DateTime? expFrom, DateTime? expTo, string leaseStatus, Guid? bankName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                return _repository.GetMonthlyLeaseLog(name, expFrom, expTo, leaseStatus, bankName, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public DeleteLeaseModel AddCreditScore(CreditScoreCheckModel model, string CheckCreditAction)
        {
            return _repository.AddCreditScore(model, CheckCreditAction);
        }
        public DeleteLeaseModel PrepareUCCFilingRequest(PrepareUCCFilingRequestModal model)
        {
            return _repository.PrepareUCCFilingRequest(model);
        }
        /*! 
    * \brief   Get the list of Manage Lease Template
    * \details Get the list of Manage Lease Template
    * \author  Surendra Maurya
    * \date    2 Jan 2020
    * \version 1.0    
    */
        public PagedData GetManageLeaseTemplateList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId,long companyID)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.GetManageLeaseTemplateList(searchText, sortColumn, sortDir, pageIndex, pageSize, userId,companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
   * \brief   Get the list of Manage Lease Template
   * \details Get the list of Manage Lease Template
   * \author  Surendra Maurya
   * \date    2 Jan 2020
   * \version 1.0    
   */
        public ManageLeaseTemplate GetById(Guid id)
        {
            try
            {
                return _repository.GetById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
       * \brief   Update the list of Manage Lease Template
       * \details Update the list of Manage Lease Template
       * \author  Surendra Maurya
       * \date    8 Jan 2020
       * \version 1.0    
       */
        public Guid UpdateManageTemplate(ManageLeaseTemplate model)
        {
            return _repository.UpdateManageTemplate(model);
        }
        public CommonStatusModel ChangeStatus(Guid? id)
        {
            try
            {
                return _repository.ChangeStatus(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public LeaseTemplateDetailModel GetLeaseTemplateByTemplateId(string templateId)
        {
            try
            {
                return _repository.GetLeaseTemplateByTemplateId(templateId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public Guid LeaseTemplateEditUpdate(LeaseTemplateDetailModel model)
        {
            try
            {
                return _repository.LeaseTemplateEditUpdate(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
        * \brief   Get Lease Template Detail
        * \details Function is used to get the detail of Lease Template.
        * \author  Anish Sharma
        * \date    17 Jan 2020
        * \version 3.0    
        */
        public LeaseTemplateModel GetLeaseTemplateDetail(Guid leaseId, string userid)
        {
            return _repository.GetLeaseTemplateDetail(leaseId, userid);
        }
        /*! 
         * \brief   delete Lease Template
         * \details  Function is used to delete Lease Request
         * \author  Surendra Maurya
         * \date    15 Nov 2019
         * \version 1.0    
         */
        public int deleteLeaseTemplatebyId(Guid guid)
        {
            try
            {
                return _repository.deleteLeaseTemplatebyId(guid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public DeleteLeaseModel UpdateLeaseStatus(string leaseStatus, string leaseId, string userid, string calledFrom)
        {
            return _repository.UpdateLeaseStatus(leaseStatus, leaseId, userid, calledFrom);
        }

        public string ApprovedByBank(LeaseAddOrUpdateModel model, bool IsApprovedForPurchase)
        {
            return _repository.ApprovedByBank(model, IsApprovedForPurchase);
        }

        public string AddEditLead(LeadModel model)
        {
            return _repository.AddEditLead(model);
        }
        public string AddEditOpportunity(OpportunityModel model)
        {
            return _repository.AddEditOpportunity(model);
        }

        public string AddEditAccount(JsonModel model)
        {
            return _repository.AddEditAccount(model);
        }

        public string AddEditLender(LenderModel model)
        {
            return _repository.AddEditLender(model);
        }

        public string CheckDealerCompanyName(string accountid, string dealerCompanyName, string uid, string CompanyID)
        {
            try
            {
                return _repository.CheckDealerCompanyName(accountid,dealerCompanyName, uid, CompanyID);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }

}
