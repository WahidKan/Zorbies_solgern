using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly SolgenDbContext _dbContext;

        public ContactRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Guid AddOrUpdateContactDetails(ContactFormModel model, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (model.Guarantors.Count > 0)
                {
                    model.Guarantors.ForEach(item =>
                    {
                        item.GuarantorDateOfBirth = !string.IsNullOrEmpty(item.GuarantorFormattedDateOfBirth) ?
                        Convert.ToDateTime(item.GuarantorFormattedDateOfBirth) :
                        DateTime.UtcNow;
                    });
                }
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@contactID", (model.ContactId ?? Guid.Empty));
                parameters.Add("@userID", (model.UserID ?? Guid.Empty));
                parameters.Add("@contactAdminId", model.ContactAdminId);
                parameters.AddTable("@contactDetails", "dbo.ContactDetails", model.ContactDetails);
                parameters.AddTable("@contactBankInfo", "dbo.ContactBankInfo", model.ContactBankInfo);
                parameters.AddTable("@guarantorDetails", "dbo.GuarantorDetails", model.Guarantors);
                parameters.AddTable("@insuranceDetails", "dbo.InsuranceDetails", model.InsuranceDetails);
                parameters.Add("@CompanyID", companyId);
                var contactID = connection.QueryFirstOrDefault<Guid>("sp_solgen_AddOrUpdateContactDetails"
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

        public int SetPrimaryContact(long contactId, long accoundId, string userId)
        {
            int res = 1;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@contactId", contactId);
                parameters.Add("@accountId", accoundId);
                parameters.Add("@userId", userId);
                connection.Open();
                res = connection.Query<int>("sp_set_primary_contact",
                 param: parameters,
                 commandType: CommandType.StoredProcedure).FirstOrDefault();

            }
            catch (Exception ex)
            {
                res = -1;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
            return res;
        }
        public ContactFormModel GetContactDetailsById(Guid id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                ContactFormModel contactFormModel = new ContactFormModel();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@contactID", id);
                using (var multi = connection.QueryMultiple("sp_solgen_GetContactDetailsByContactId", parameters, commandType: CommandType.StoredProcedure))
                {
                    contactFormModel.ContactDetails.Add(multi.ReadSingleOrDefault<ContactDetailsModel>());
                    contactFormModel.ContactBankInfo.Add(multi.ReadSingleOrDefault<ContactBankInfo>());
                    contactFormModel.Guarantors.AddRange(multi.Read<GuarantorDetailsModel>());
                    contactFormModel.InsuranceDetails.Add(multi.ReadSingleOrDefault<InsuranceDetailsModel>());
                    contactFormModel.ContactAdminId = multi.ReadSingleOrDefault<string>();
                    return contactFormModel;
                }
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


        public PagedData GetContactList(string name, DateTime? from, DateTime? to, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetContactList",
                    param: new
                    {
                        Name = name,
                        FromDateSearch = from,
                        ToDateSearch = to,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        IsDashborad = isDashBoard,
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
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public Guid DeleteGuarantor(Guid guarantorID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                return connection.QueryFirstOrDefault<Guid>("sp_solgen_DeleteGuarantor", new { guarantorID }, commandType: CommandType.StoredProcedure);
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

        public List<MasterItems> GetSearchResult(string searchType, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (searchType == null)
            {
                searchType = "";
            }
            try
            {
                connection.Open();
                return connection.Query<MasterItems>("sp_solgen_GetContactsByName", new { searchType, CompanyID = companyId }, commandType: CommandType.StoredProcedure).ToList();
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
       * \brief   Get the Contactid
       * \details Get the Contactid by user id
       * \author  Rahul Sharma 
       * \date    24 oct 2019
       * \version 1.0    
       */
        public string GetContactIdByUserId(Guid? id)
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

        public string IsEmailExist(Guid? contactid, string emailid)
        {
            string result = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                result = connection.Query<string>("sp_solgen_CheckIsEmailExist", new { contactID = contactid, EmailID = emailid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return result;
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
        public object IsValueDuplicate(int type, string refString)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<object>("sp_zolar_isValueDuplicate", new { type = type, refString = refString }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return result;
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
        public bool IsWelcomePackageSend(Guid contactId, string userid)
        {
            bool result;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                result = connection.Query<bool>("sp_solgen_IsWelcomePackageSend", new { contactID = contactId, UserId = userid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return true;
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
        *  \brief     Save API.
        *  \details   This API is used to save the customer bulk upload data from excle sheet into database.
        *  \author    Rahul Sharma 
        *  \version   1.0
        *  \date      03-12-2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        public BulkUploadResult SaveBulkUpload(BulkUploadModel model)
        {
            RootJsonObject obj = JsonConvert.DeserializeObject<RootJsonObject>(model.BulkUploadJSONObject);
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("userid", model.Id == Guid.Empty ? null : (Guid?)model.Id, DbType.Guid);
                parameters.AddTable("ContactInformation", "dbo.tblContactInformation", obj.ContactInformation);
                parameters.AddTable("ContactGuarantorInformation", "dbo.tblContactGuarantorInformationType", obj.ContactGuarantorInformation);
                return connection.Query<BulkUploadResult>("sp_solgen_AddUpdateCustomerBulkUpload", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

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
* \brief   Get the list of WelcomePackageTracking
* \details Fetch the list of WelcomePackageTracking
* \author  Surendra Maurya 
* \date    18 Dec 2019
* \version 1.0    
*/
        public PagedData WelcomePackageTrackingReport(string searchText, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(searchText) || searchText == "undefined") { searchText = ""; }
                connection.Open();
                var dataList = connection.Query("sp_solgen_welcompackagetrackingReport",
                   param: new
                   {

                       SearchText = searchText,
                       FromDateSearch = From,
                       ToDateSearch = To,
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

        public BankInformationModel GetBankInformationByContactBankId(string contactBankId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                Guid ContactBankId = new Guid(contactBankId);
                BankInformationModel dataList = new BankInformationModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<BankInformationModel>("sp_solgen_GetBankInformationByContactBankId", new { ContactBankId }, commandType: System.Data.CommandType.StoredProcedure);

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

        public Guid SaveContactBankInformation(BankInformationModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                id = connection.ExecuteScalar<Guid>("sp_solgen_SaveContactBankInformation",
                    param: new
                    {
                        //InsuranceId = model.InsuranceId,
                        BankName = model.ContactBankName,
                        BankAddress = model.ContactBankAddress,
                        BankAccountNum = model.ContactBankAccountNum,
                        BankRoutingNumber = model.ContactBankRoutingNumber,
                        CreatedById = model.CreatedByID,
                        ContactBankCounty = model.ContactBankCounty,
                        ContactBankCity = model.ContactBankCity,
                        ContactBankZipcode = model.ContactBankZipcode,
                        ContactBankState = model.ContactBankState
                    },
                    commandType: CommandType.StoredProcedure);

                return id;
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


        public string AddEditContact(JsonModel model, int leadid, int accountid, int opportunityid, int Isenable)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (model.companyId));
                parameters.Add("@leadid", leadid);
                parameters.Add("@accountId", accountid);
                parameters.Add("@opportunityId", opportunityid);
                parameters.Add("@EnableLogin", Isenable);
                //parameters.Add("@MappingStatusId", 1002);

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditContact_custom", parameters, commandType: CommandType.StoredProcedure);

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
        public string ContactAccountMapping(int accountid, string email, int comapanyid, string userId, int opportunityid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@Email", email);
                parameters.Add("@AcountId", accountid);
                parameters.Add("@CompanyId", comapanyid);
                parameters.Add("@UserId", userId);
                parameters.Add("@OpportunityId", opportunityid);

                //parameters.Add("@MappingStatusId", 1002);

                string data = connection.QueryFirstOrDefault<string>("sp_zolar_Account_Mapping_Contact", parameters, commandType: CommandType.StoredProcedure);

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
        public string AddContactSaleFinance(ApplicationUserModel model, long CompanyID, Guid? userID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@FirstName", model.FirstName);
                parameters.Add("@LastName", (model.LastName));
                parameters.Add("@@Email", (model.Email));
                parameters.Add("@RoleId", (model.RoleID));
                parameters.Add("@Mobile", (model.PhoneNumber));
                parameters.Add("@Phone", model.PhoneNumber);
                parameters.Add("@Country", model.County);
                parameters.Add("@UserType", model.UserType);
                parameters.Add("@Street", null);
                parameters.Add("@City", model.City);
                parameters.Add("@State", model.State);
                parameters.Add("@Postalcode", model.ZipCode);
                parameters.Add("@TimeFormat", model.TimeFormat);
                parameters.Add("@TimeZone", model.TimeZoneId);
                parameters.Add("@CompanyId", CompanyID);
                parameters.Add("@City", model.City);
                parameters.Add("@CreatedById", userID);
                //parameters.Add("@MappingStatusId", 1002);

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddContactSaleFinance", parameters, commandType: CommandType.StoredProcedure);

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

        public string CheckUserDuplicateORAssociateContact(string UserID, string CompanyID, string emailID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                // BankInformationModel dataList = new BankInformationModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_Check_User_Duplicate_OR_Associate_Contact",
                    new { UserID = UserID, CompanyID = CompanyID, emailID = emailID }, commandType: System.Data.CommandType.StoredProcedure);

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

        public PagedData GetOpportuniryByContact(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_ContactDetailViewByOpportunity",
                   param: new
                   {

                       contId = contId,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       companyId = companyId,

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

        public PagedData GetRelatedAccountForContactList(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetRelatedAccountForContactList",
                   param: new
                   {

                       contId = contId,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       companyId = companyId,

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
        public PagedData GetProposalsListByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_Solgen_GetProposalByContactId",
                   param: new
                   {

                       contId = contId,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       companyId = companyId,

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
        public PagedData GetLeadByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_Solgen_GetLeadByContactId",
                   param: new
                   {

                       contId = contId,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       companyId = companyId,

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
    }
}
