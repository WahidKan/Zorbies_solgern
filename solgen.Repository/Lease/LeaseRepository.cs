using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;

namespace Solgen.Repository
{
    public class LeaseRepository : ILeaseRepository
    {
        private readonly SolgenDbContext _dbContext;
        public LeaseRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*! 
       * \brief   Get the list of Lease Request
       * \details Fetch the list of Lease Request
       * \author  Surendra Maurya 
       * \date    14 Nov 2019
       * \version 1.0    
       */
        public PagedData GetLeaseRequestList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(searchText) || searchText == "undefined") { searchText = ""; }
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLeaseRequestList",
                   param: new
                   {

                       SearchText = searchText,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId = userId,
                       CompanyId= companyId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        /*! 
       * \brief   Get the list of Lease
       * \details Fetch the list of Lease
       * \author  Kiran Bala 
       * \date    27 Sep 2019
       * \version 1.0    
       */
        public PagedData GetLeaseList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (string.IsNullOrEmpty(contactId) || contactId == "undefined") { contactId = Guid.Empty.ToString(); }
            if (string.IsNullOrEmpty(leaseStatus) || leaseStatus == "null" || leaseStatus == "undefined") { leaseStatus = Guid.Empty.ToString(); }

            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLeaseList",
                   param: new
                   {
                       LeaseStatus = leaseStatus,
                       Salesman = saleMan,
                       ExpFromDateSearch = expFrom,
                       ExpToDateSearch = expTo,
                       comFromDateSearch = commFrom,
                       ComToDateSearch = commTo,
                       SearchText = searchText,
                       IsDashboard = isDashboard,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId = userId,
                       ContactId = contactId,
                       CompanyId = companyId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
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
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetContactDocAgainstLease",
                   param: new
                   {
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       leaseId = leaseId,
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public string AddOrUpdateLease(LeaseAddOrUpdateModel model, bool IsApprovedForPurchase, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@leaseId", (model.LeaseId ?? Guid.Empty));
                parameters.Add("@userID", (model.LeaseCreatedBy ?? Guid.Empty));
                parameters.Add("@IsApprovedForPurchase", IsApprovedForPurchase);
                parameters.AddSingleTableType("@leaseDetails", "dbo.LeaseDetails", model);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddOrUpdateLeaseDetails"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leasenumber;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public Guid AddEditLeaseRequest(AddLeaseRequestModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseRequestId", (model.LeaseRequestId ?? Guid.Empty));
                parameters.Add("@CustomerId", (model.ContactAdminId ?? Guid.Empty));
                parameters.Add("@LeaseRequest", model.LeaseRequest);
                parameters.Add("@RatetoBank", model.LeaseRequestRateToBank);
                parameters.Add("@Term", model.LeaseRequestTerm);
                parameters.Add("@Payment", model.LeaseRequestPayment);
                parameters.Add("@Residual", model.LeaseRequestResidual);
                parameters.Add("@Collateral", model.LeaseRequestCollateral);
                parameters.Add("@LeasePurpose", model.LeaseRequestPurpose);
                parameters.Add("@SOR1", model.LeaseRequestSOROne);
                parameters.Add("@SOR2", model.LeaseRequestSORTwo);
                parameters.Add("@SOR3", model.LeaseRequestSORThree);
                parameters.Add("@AccountType", model.LeaseRequestAccountType);
                parameters.Add("@BankName", model.LeaseRequestBankName);
                parameters.Add("@NameOfAccount", model.LeaseRequestNameOnBank);
                parameters.Add("@Balance", model.LeaseRequestBalance);
                parameters.Add("@CompanyOverview", model.LeaseRequestCompanyoverview);
                parameters.Add("@Description", model.LeaseRequestDescription);
                parameters.Add("@CreatedBy", model.LeaseRequestCreatedBy);
                parameters.Add("@ModifiedBy", model.LeaseRequestModifiedBy ?? Guid.Empty);
                parameters.Add("@CompanyID", model.CompanyID);
                var contactID = connection.QueryFirstOrDefault<Guid>("sp_solgen_AddUpdateLeaseRequestForm"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return contactID;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public LeaseDetailsModel GetLeaseDetail(Guid leaseId, string userid = "", Boolean callFromEdit = false)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", leaseId);
                parameters.Add("@CallFromEdit", callFromEdit);
                parameters.Add("@UserId", userid);
                var leaseDetailsModel = connection.QueryFirstOrDefault<LeaseDetailsModel>("sp_solgen_GetLeaseDetailsbyId"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leaseDetailsModel;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetContactIdByLeaseRequestId(Guid? id)
        {
            string contactId = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                contactId = connection.Query<string>("sp_solgen_GetContactIdByUserId", new { userId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return contactId;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public AddLeaseRequestModel LeaseRequestByRequestId(Guid leaseRequestId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@leaseRequestId", leaseRequestId);
                var leaseDetailsModel = connection.QueryFirstOrDefault<AddLeaseRequestModel>("sp_solgen_GetLeaseRequestDetailsbyId"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leaseDetailsModel;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
         * \brief   delete Lease
         * \details  Function is used to delete Lease
         * \author  Kiran 
         * \date    3 Oct 2019
         * \Parameter   id:lease id
         * \version 1.0    
         */
        public DeleteLeaseModel DeleteLease(Guid id)
        {
            DeleteLeaseModel ret;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                ret = connection.QueryFirstOrDefault<DeleteLeaseModel>("sp_solgen_DeleteLease", new { LeaseID = id }, commandType: System.Data.CommandType.StoredProcedure);

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
         * \brief   delete Lease Request
         * \details  Function is used to delete Lease Request
         * \author  Surendra Maurya
         * \date    15 Nov 2019
         * \Parameter   id:lease request id
         * \version 1.0    
         */

        public int DeleteLeaseRequest(Guid id)
        {
            int ret = 0;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ret = connection.Query<int>("sp_solgen_DeleteLeaseRequestbyId", new { LeaseRequestId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public DeleteLeaseModel SendStatusForWeightSignature(Guid leaseid, Guid userID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", leaseid);// now send leasenumber instead of leaseid discussed with kiran
                parameters.Add("@userID", userID);
                connection.Open();
                DeleteLeaseModel data = connection.QueryFirstOrDefault<DeleteLeaseModel>("sp_solgen_UpdateLeaseStatusForWetSignatureByLeaseId", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;


            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public Guid updateLeaseDocument(DocumentUploadModel model)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", model.LeaseId);// now send leasenumber instead of leaseid discussed with kiran
                parameters.Add("@FileName", model.FileName);
                connection.Open();
                var data = connection.QueryFirstOrDefault<Guid>("sp_solgen_UpdateLeaseDocumentByLeaseId", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
     * \brief   Get the list of Lease
     * \details Fetch the list of Lease by Status
     * \author  Rahul Sharma 
     * \date    09 Oct 2019
     * \version 1.0    
     */
        public PagedData GetLeaseListByStatus(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (string.IsNullOrEmpty(contactId) || contactId == "undefined") { contactId = Guid.Empty.ToString(); }
            if (string.IsNullOrEmpty(leaseStatus) || leaseStatus == "undefined") { leaseStatus = Guid.Empty.ToString(); }
            if (searchText == "undefined") { searchText = ""; }
            if (leaseStatus == "null") { leaseStatus = null; }
            if (saleMan == "null" || saleMan == "undefined") { saleMan = null; }
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLeaseListByStatus",
                   param: new
                   {
                       LeaseStatus = leaseStatus,
                       Salesman = saleMan ?? null,
                       ExpFromDateSearch = expFrom,
                       ExpToDateSearch = expTo,
                       comFromDateSearch = commFrom,
                       ComToDateSearch = commTo,
                       SearchText = searchText,
                       IsDashboard = isDashboard,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId = userId,
                       ContactId = contactId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public PagedData GetFundingPackageleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLeaseReviewDoc",
                   param: new
                   {
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       leaseId = leaseId,
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, 0, 10);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public PagedData GetleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                //var dataList = connection.Query("sp_solgen_GetLeaseReviewDoc",
                var dataList = connection.Query("GetLeaseReviewDocForGenerateLease",
                   param: new
                   {
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       leaseId = leaseId,
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, 0, 10);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
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
            SendFundingBankApprovalModel ret;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                ret = connection.QueryFirstOrDefault<SendFundingBankApprovalModel>("sp_solgen_UpdateLeaseStatusForFundingPackage", new { LeaseID = leaseId, status = statusId, SendToBankApprovalCreatedBy = sendToBankApprovalCreatedBy }, commandType: System.Data.CommandType.StoredProcedure);

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
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
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var ret = connection.Query<string>("sp_solgen_UpdateLeaseStatusForTitleWorkRequest", new { LeaseID = leaseId, SendToBankApprovalCreatedBy = sendToBankApprovalCreatedBy }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public BankApprovalModel SetLeaseBankApproveStatus(Guid leaseId, int statusId, string sendToBankApprovalCreatedBy)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                BankApprovalModel value = connection.QueryFirstOrDefault<BankApprovalModel>("sp_solgen_ChangeLeaseBankStatus", new { LeaseID = leaseId, status = statusId, SendToBankApprovalCreatedBy = sendToBankApprovalCreatedBy }, commandType: System.Data.CommandType.StoredProcedure);

                return value;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
       * \brief   Bank user Change Lease Status to lease
       * \details Function is used to Change Lease Status to lease
       * \author  dheeraj patyal
       * \date    25 October 2019
       * \version 1.0    
       */
        public int ChangeLeaseStatus(Guid leaseId, string userId)
        {
            int ret = -1;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ret = connection.Query<int>("sp_solgen_ChangeLeaseStatus", new { leaseId, userId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
     * \brief   Get the user information by LeaseId with ContactId
     * \details Fetch the information of user by LeaseId with ContactId
     * \author  deepak jha
     * \date    23 Oct 2019
     * \version 1.0    
     */
        public DocuSignDetailModel GetDocuSignDetailByLeaseId(string leaseId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@leaseId", Guid.Parse(leaseId));
                var leaseDetailsModel = connection.QueryFirstOrDefault<DocuSignDetailModel>("sp_solgen_GetDocuSignClinetDetailByLeaseId"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leaseDetailsModel;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public Boolean GetLeaseDetailForAproveTobankByLeaseId(Guid leaseId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@leaseId", leaseId);
                var data = connection.QueryFirstOrDefault<Boolean>("sp_solgen_GetApproveForPurchaseLeaseDetailByLeaseId"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
    * \brief  Update Lease when dosuSign send document to client
    * \details Update lease when document send ,i.e IsSendToDocuSign And SendToDocuSignDate
    * \author  deepak jha
    * \date    23 Oct 2019
    * \version 1.0    
    */
        public LeaseDetailsNotification UpdateLeaseDosuSignStatus(string leaseId, string sendToDocuSignCreatedBy)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", Guid.Parse(leaseId));
                parameters.Add("@SendToDocuSignCreatedBy", sendToDocuSignCreatedBy);
                connection.Open();
                LeaseDetailsNotification value = connection.QueryFirstOrDefault<LeaseDetailsNotification>("sp_solgen_UpdateLeaseDocuSignSendByLeaseId", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return value;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public LeaseDetailsNotification ReviewSupportingDoc(Guid id, string reviewSupportingDocCreatedBy)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                LeaseDetailsNotification value = connection.QueryFirstOrDefault<LeaseDetailsNotification>("sp_solgen_ReviewSupportingDoc",
                    param: new
                    {
                        LeaseId = id,
                        ReviewSupportingDocCreatedBy = reviewSupportingDocCreatedBy,

                    },
                    commandType: CommandType.StoredProcedure);

                return value;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public LeaseDetailsNotification ReviewLeaseDoc(Guid id, string reviewLeaseDocCreatedBy)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                LeaseDetailsNotification value = connection.QueryFirstOrDefault<LeaseDetailsNotification>("sp_solgen_ReviewLeaseDoc",
                    param: new
                    {
                        LeaseId = id,
                        ReviewLeaseDocCreatedBy = reviewLeaseDocCreatedBy,

                    },
                    commandType: CommandType.StoredProcedure);

                return value;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public LeaseDetailsNotification AddDocumentPdf(PDFDocumentModel model, string generateLeaseDocCreatedBy)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", model.LeaseId);
                parameters.Add("@LeasePDFDocumentName", model.DocumentName);
                parameters.Add("@GenerateLeaseDocCreatedBy", generateLeaseDocCreatedBy);
                connection.Open();
                LeaseDetailsNotification data = connection.QueryFirstOrDefault<LeaseDetailsNotification>("sp_solgen_UpdateLeaseDetailsGeneratedPDF", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
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
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@leaseId", leaseId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<TitleWorkRequestModel>("sp_solgen_TitleWorkRequestByLeaseId", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<MasterItems> GetLeaseInsuranceDropList(string userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_GetInsuranceListForInsuranceRequest", new { UserId = userid }, commandType: CommandType.StoredProcedure).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public CreateInsuranceRequest GetLeaseDetailForCreateInsuranceRequest(string leaseId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                CreateInsuranceRequest dataList = new CreateInsuranceRequest();
                connection.Open();
                var data = connection.QueryFirstOrDefault<CreateInsuranceRequest>("sp_solgen_LeaseDetailForCreateInsuranceRequest", new { LeaseId = leaseId }, commandType: System.Data.CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public DeleteLeaseModel SaveInsuranceRequestPreview(SaveCreateInsuranceRequest model, string CreateInsuranceRequestCreatedBy)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", model.LeaseId);
                parameters.Add("@userId", CreateInsuranceRequestCreatedBy);
                parameters.Add("@InsuranceId", model.InsuranceId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<DeleteLeaseModel>("sp_solgen_UpdateLeaseStatusForCreateInsuranceRequest", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
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
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentName", "EF5CC46E-9CE6-4C85-9DB7-47DCA33D906B");
                parameters.Add("@DocumentFileName", model.DocumentFileName);
                parameters.Add("@IsSupportingDocument", false);
                parameters.Add("@IsLeaseDocument", true);
                parameters.Add("@DocumentTitle", model.DocumentTitle);
                parameters.Add("@DocumentComment", model.DocumentComment ?? "");
                parameters.Add("@DocumentType", model.DocumentType);
                parameters.Add("@DocumentUploadedForUser", model.DocumentUploadedForUser);
                parameters.Add("@DocumentUploadedBy", model.DocumentUploadedBy);
                parameters.Add("@IsCustomerAllForms", model.IsCustomerAllForms);
                parameters.Add("@DocumentRefNumber", model.DocumentRefNumber);
                parameters.Add("@DocumentDate", model.DocumentDate);
                parameters.Add("@DocumentAddedFrom", "wetsign");
                connection.Open();
                var data = connection.QueryFirstOrDefault<Guid>("sp_solgen_AddDocuments", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
      * \brief   Get the list of Lease Request
      * \details Fetch the list of Lease Request
      * \author  Surendra Maurya 
      * \date    11 Dec 2019
      * \version 1.0    
      */
        public PagedData LeaseInventoryList(DateTime? expFrom, DateTime? expTo, string leaseStatus, string bankName, string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(searchText) || searchText == "undefined") { searchText = ""; }
                if (string.IsNullOrEmpty(leaseStatus) || leaseStatus == "null") { leaseStatus = null; }
                if (string.IsNullOrEmpty(bankName) || bankName == "null") { bankName = null; }
                connection.Open();
                var dataList = connection.Query("sp_solgen_leaseinventory",
                   param: new
                   {
                       SearchText = searchText,
                       FromDateSearch = expFrom,
                       ToDateSearch = expTo,
                       LeaseStatus = leaseStatus,
                       BankSearch = bankName,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId = userId,
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
      * \brief    Get the title work request report
      * \details Function is used to fetch the report of title work request
      * \author deepak jha
      * \date    19 Dec 2019
      * \version 1.0    
      */
        public PagedData GetTitleWorkRequestReportList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, Guid? leaseId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(name) || name == "undefined") { name = ""; }
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetTitleWorkTrackingReport",
                   param: new
                   {
                       Name = name,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       FromDateSearch = From,
                       ToDateSearch = To,
                       PageSize = pageSize,
                       UserId = userId,
                       LeaseId = leaseId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
       * \brief   Get the customer log report list
       * \details Function is used to fetch the list of customer log report 
       * \author  Anish Sharma
       * \date    19 Dec 2019
       * \version 3.0    
       */
        public PagedData GetCustomerLogReportList(string name, DateTime? expFrom, DateTime? expTo, Guid? contactStatus, Guid? leaseStatus, Guid? bankName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_CustomerLogReport",
                    param: new
                    {
                        SearchText = name,
                        FromDateSearch = expFrom,
                        ToDateSearch = expTo,
                        LeaseStatus = leaseStatus,
                        ContactStatus = contactStatus,
                        BankSearch = bankName,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        /*! 
      * \brief   Get the Monthly LeaseLog Report List 
      * \details Function is used to fetch the list of Monthly Lease log report
      * \author  Surendra Maurya
      * \date    23 Dec 2019
      * \version 3.0    
      */
        public PagedData GetMonthlyLeaseLog(string name, DateTime? expFrom, DateTime? expTo, string leaseStatus, Guid? bankName, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_MonthlyLeaseLog",
                    param: new
                    {
                        SearchText = name,
                        FromDateSearch = expFrom,
                        ToDateSearch = expTo,
                        LeaseStatus = leaseStatus,
                        BankSearch = bankName,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public DeleteLeaseModel AddCreditScore(CreditScoreCheckModel model, string CheckCreditAction)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ScoreTitle1", model.scoreOneTitle);
                parameters.Add("@ScoreTitle2", model.scoreTwoTitle);
                parameters.Add("@ScoreTitle3", model.scoreThreeTitle);
                parameters.Add("@ScoreFile1", model.DocumentTypeOne);
                parameters.Add("@ScoreFile2", model.DocumentTypeTwo);
                parameters.Add("@ScoreFile3", model.DocumentTypeThree);
                parameters.Add("@DatePulled", model.DatePulled);
                parameters.Add("@DocumentFileName1", model.documentScoreOneFileName);
                parameters.Add("@DocumentFileName2", model.documentScoreTwoFileName ?? "");
                parameters.Add("@DocumentFileName3", model.documentScoreThreeFileName ?? "");
                parameters.Add("@DocumentUploadedForUser", model.LeaseId);
                parameters.Add("@DocumentUploadedBy", model.userid);
                parameters.Add("@CheckCreditAction", CheckCreditAction);
                parameters.Add("@DocumentType1", model.documentFile1);
                parameters.Add("@DocumentType2", model.documentFile2 == "undefined" ? "" : model.documentFile2);
                parameters.Add("@DocumentType3", model.documentFile3 == "undefined" ? "" : model.documentFile3);
                connection.Open();

                DeleteLeaseModel ret = connection.QueryFirstOrDefault<DeleteLeaseModel>("sp_solgen_AddCreditScoreDocuments", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public DeleteLeaseModel PrepareUCCFilingRequest(PrepareUCCFilingRequestModal model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentFileName", model.DocumentFileName);
                parameters.Add("@DocumentType", model.DocumentType);
                parameters.Add("@DocumentUploadedForUser", model.DocumentUploadedForUser);
                parameters.Add("@DocumentUploadedBy", model.DocumentUploadedBy);
                parameters.Add("@DocumentTitle", model.DocumentTitle);
                parameters.Add("@PrepareUCCFillingRequestAction", model.PrepareUCCFillingRequestAction);
                parameters.Add("@DocumentRefNumber", model.DocumentRefNumber);
                parameters.Add("@TXUCCDraft", model.TXUCCDraft);
                parameters.Add("@ReceiptNumDraft", model.ReceiptNumDraft);
                parameters.Add("@PrepareUCCFillingRequestReminder", model.PrepareUCCFillingRequestReminder);
                parameters.Add("@UCCFilingState", model.UCCFilingState);
                connection.Open();
                var data = connection.QueryFirstOrDefault<DeleteLeaseModel>("sp_solgen_PrepareUCCFillingProcess", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
       * \brief   Get the list of Manage Lease Template
       * \details Fetch the list of Manage Lease Template
       * \author  Surendra Maurya 
       * \date    2 Jan 2020
       * \version 1.0    
       */
        public PagedData GetManageLeaseTemplateList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(searchText) || searchText == "undefined") { searchText = ""; }
                connection.Open();
                var dataList = connection.Query("sp_solgen_ManageLeaseTemplate",
                   param: new
                   {
                       SearchText = searchText,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId = userId,
                       CompanyID = companyID,
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
       * \brief   Get the Manage Lease Template for edit
       * \details Fetch the Manage Lease Template for edit
       * \author  Surendra Maurya 
       * \date    06 Jan 2020
       * \Parameter   id:template id
       * \version 1.0    
       */
        public ManageLeaseTemplate GetById(Guid id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                ManageLeaseTemplate data = connection.QuerySingleOrDefault<ManageLeaseTemplate>("sp_solgen_GetLeaseTemplateDETById", new { TemplateId = id }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public Guid UpdateManageTemplate(ManageLeaseTemplate model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", model.TemplateModifiedBy);
                parameters.Add("@TemplateId", model.TemplateId);
                parameters.Add("@StatusId", model.StatusId);
                parameters.Add("@TemplateName", model.TemplateName);
                parameters.Add("@TemplateContent", model.TemplateContent);
                parameters.Add("@CompanyId", model.CompanyId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<Guid>("sp_solgen_UpdateManageTemplate", parameters, commandType: System.Data.CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   change status of Manage Lease Template
        * \details it will chnage  status of Manage Lease Template to InActiva/DeActive
        * \author  Surendra Maurya
        * \date    10 Jan 2020
        * \Parameter   id:template id,statusid:active/inactive
        * \version 1.0    
        */
        public CommonStatusModel ChangeStatus(Guid? id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                CommonStatusModel _status = connection.Query<CommonStatusModel>("sp_solgen_ActiveDeactiveManageLeaseTemplateByID", new { TemplateId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public LeaseTemplateDetailModel GetLeaseTemplateByTemplateId(string templateId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                LeaseTemplateDetailModel _status = connection.Query<LeaseTemplateDetailModel>("sp_solgen_GetLeaseTemplateDetailTemplateByID",
                    new { TemplateId = templateId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public Guid LeaseTemplateEditUpdate(LeaseTemplateDetailModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", model.LeaseId);
                parameters.Add("@TemplateId", model.TemplateId);
                parameters.Add("@TemplateContent", model.TemplateName);
                connection.Open();
                var data = connection.QueryFirstOrDefault<Guid>("sp_solgen_UpdateLeaseTemplate", parameters, commandType: System.Data.CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public LeaseTemplateModel GetLeaseTemplateDetail(Guid leaseId, string userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseId", leaseId);
                parameters.Add("@UserId", userid);
                var leaseDetailsModel = connection.QueryFirstOrDefault<LeaseTemplateModel>("sp_solgen_GetLeaseTemplateDetail"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leaseDetailsModel;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   Delete Lease Template
        * \details  Function is used to delete Lease Template
        * \author  Surendra Maurya
        * \date    17 Jan 2020
        * \Parameter   id:lease template id
        * \version 1.0    
        */
        public int deleteLeaseTemplatebyId(Guid id)
        {
            int ret = 0;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ret = connection.Query<int>("sp_solgen_DeleteLeaseTemplatebyId", new { TemplateId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public DeleteLeaseModel UpdateLeaseStatus(string leaseStatus, string leaseId, string userid, string calledFrom)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseStatus", leaseStatus);
                parameters.Add("@LeaseId", leaseId);
                parameters.Add("@UserID", userid);
                parameters.Add("@CalledFrom", calledFrom);

                connection.Open();
                DeleteLeaseModel data = connection.QueryFirstOrDefault<DeleteLeaseModel>("sp_solgen_UpdateLeaseStatus", parameters, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public string ApprovedByBank(LeaseAddOrUpdateModel model, bool IsApprovedForPurchase)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LeaseID", (model.LeaseId));
                parameters.Add("@UserId", (model.LeaseCreatedBy));
                var emailIds = connection.QueryFirstOrDefault<string>("sp_solgen_LeaseApprovedByBank"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return emailIds;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string AddEditLead(LeadModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@leadIds", model.LeadId);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@permission", (model.permission));
                parameters.Add("@companyId", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditLead_custom"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string AddEditOpportunity(OpportunityModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.OpportunityId);
                //parameters.Add("@JSON", model.FormJsonData);
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@COMPANY_ID", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditOpportunity_custom"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string AddEditAccount(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (model.companyId));
                parameters.Add("@DelareLogo", (model.dealerDocName));
                parameters.Add("@IsMediaServer", (model.isMediaServer));
                parameters.Add("@FundingStateCitydata", (model.selecteddata));

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditAccount_custom"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                    return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string AddEditLender(LenderModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@lenderIds", model.ID);
                parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditLender_custom"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public string CheckDealerCompanyName( string accountid, string dealerCompanyName, string uid, string CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_CheckDealerCompanyNameDuplicate",
                    new { accountId = accountid, delarCompanyName= dealerCompanyName, userId= uid, CompanyID = CompanyID }, commandType: System.Data.CommandType.StoredProcedure);
              

                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
    }
}
