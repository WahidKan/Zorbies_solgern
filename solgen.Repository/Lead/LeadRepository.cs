using Dapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
   public class LeadRepository : ILeadRepository
    {

        private readonly SolgenDbContext _dbContext;
        public LeadRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public int SendBackStatus(long companyId,long LeadId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.Query<int>("[sp_solgen_LeadOwnerState]", new
                {
                    ComapnyId = companyId,
                    LeadID = LeadId
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                    
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
        public async Task<int> AssociteProduct(string productids, long leadid, Guid userid, int companyid, int submoduleid, string objectname, bool isLoanapp)
        {
           
                string data = productids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                var MachineIds = string.Join(",", dataFinal);
                DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    connection.Open();
                    var result = await Task.FromResult(connection.Query<int>("[sp_solgen_LeadView_AssociateProduct]", new { productids = productids,
                        leadid = leadid,
                        submoduleid = submoduleid,
                        userId = userid,
                        companyid = companyid,
                        objectname = objectname,
                        isLoanapp= isLoanapp
                    }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault());

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

        public PagedData GetAssociateProductList(long leadid, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
                connection.Open();
                var data = connection.Query("[sp_solgen_GetAssociateProductListforLeadview]", param: new
                {
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    leadid = leadid,
                    submoduleid = submoduleid,                  
                    
                    objectname = objectname
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, PageNo, PageSize);

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public IEnumerable<dynamic> GetLeadAccountdata(long leadid, Guid userid, int companyid, int submoduleid, string objectname)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_leadview_PrimaryData",
                param: new
                {
                    leadid = leadid,
                    submoduleid = submoduleid,
                    userId = userid,
                    companyid = companyid,
                    objectname = objectname
                },
                commandType: CommandType.StoredProcedure);

                return dataList;
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
        public IEnumerable<dynamic> GetLeadappointments(long leadid, Guid userid, int companyid, int submoduleid, string objectname)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_leadview_Appointments",
                param: new
                {
                    leadid = leadid,
                    submoduleid = submoduleid,
                    userId = userid,
                    companyid = companyid,
                    objectname = objectname
                },
                commandType: CommandType.StoredProcedure);

                return dataList;
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
        public PagedData GetProductList(long leadid, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
                connection.Open();
                var data = connection.Query("[sp_solgen_GetProductListforLeadview]", param: new
                {
                    leadid = leadid,
                    submoduleid = submoduleid,
                  
                    objectname = objectname,
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, PageNo, PageSize);

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public int saveNotes(leadNotesModel model)
        {
           
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("note_id", model.note_id == 0 ? null : (int?)model.note_id, DbType.Int64);
                parameters.Add("note_name", model.note_name, DbType.String);
                parameters.Add("note_description", model.note_description, DbType.String);
                parameters.Add("object_id", model.object_id, DbType.Int64);
                parameters.Add("object_name", model.object_name, DbType.String);
                parameters.Add("object_ref_id", model.object_ref_id, DbType.String);
                parameters.Add("created_by", model.created_by, DbType.Guid);
                parameters.Add("company_id", model.company_id, DbType.Int64);
                parameters.Add("IsPrivate", model.IsPrivateBool, DbType.Boolean);

                return connection.ExecuteScalar<int>("[sp_solgen_SaveLeadViewNotes]", parameters, commandType: CommandType.StoredProcedure);

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

        public PagedData getNoteslist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
              
                connection.Open();
                var data = connection.Query("[sp_solgen_Get_Notes_ListforLeadview]", param: new
                {
                    
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    leadid = leadid,
                    submoduleid = submoduleid,

                    objectname = objectname
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, PageNo, PageSize);

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public PagedData getLeadSMSlist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("[sp_solgen_Get_LeadSMS_ListforLeadview]", param: new
                {
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    leadid = leadid,
                    CompanyID = companyID
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();
                return new PagedData(data, PageNo, PageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        public int DeleteAssociateProductbyid(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("[sp_solgen_DeleteAssociateproduct_LeadView]", new { id = id ,
                    leadid = leadid,
                    submoduleid = submoduleid,
                    userId = userId,
                    companyid = companyID,
                    objectname = objectname
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
        public int DeleteNote(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("[sp_solgen_DeleteNote_LeadView]", new
                {
                    id = id,
                    leadid = leadid,
                    submoduleid = submoduleid,
                    userId = userId,
                    companyid = companyID,
                    objectname = objectname
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
        public int DeleteContact(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("[sp_solgen_DeleteContact_LeadView]", new
                {
                    id = id,
                    leadid = leadid,
                    submoduleid = submoduleid,
                    userId = userId,
                    companyid = companyID,
                    objectname = objectname
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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

        public string saveEmail(leadEmailModel model)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("sent_to", model.sent_to, DbType.String);
                parameters.Add("subject", model.subject, DbType.String);
                parameters.Add("contactid", model.contactid, DbType.Int64);
                parameters.Add("templateid", model.templateid, DbType.Int64);
                parameters.Add("description", model.description, DbType.String);
                parameters.Add("object_id", model.object_id, DbType.Int64);
                parameters.Add("object_name", model.object_name, DbType.String);
                parameters.Add("object_ref_id", model.object_ref_id, DbType.String);
                parameters.Add("created_by", model.created_by, DbType.Guid);
                parameters.Add("company_id", model.company_id, DbType.Int64);

               string data= connection.QueryFirstOrDefault<string>("[sp_solgen_SaveLeadViewEmail]", parameters, commandType: CommandType.StoredProcedure);
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
        public PagedData getEmaillist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query("[sp_solgen_Get_Email_ListforLeadview]", param: new
                {

                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    leadid = leadid,
                    submoduleid = submoduleid,

                    objectname = objectname
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, PageNo, PageSize);

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public PagedData getContactList(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query("sp_solgen_Get_Contact_ListforLeadview", param: new
                {

                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    leadid = leadid,
                    submoduleid = submoduleid,

                    objectname = objectname
                },
                   commandTimeout: 0, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, PageNo, PageSize);

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public long saveLeadConvert(leadConvertModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("account_name", model.account_name,DbType.String);
                parameters.Add("account_type_id", model.account_type_id, DbType.String);
                parameters.Add("contactid", model.contactid, DbType.String);
                parameters.Add("opportunity_name", model.opportunity_name, DbType.String);
               // parameters.Add("object_id", model.object_id, DbType.Int64);
                parameters.Add("object_name", model.object_name, DbType.String);
                parameters.Add("Lead_id", model.object_ref_id, DbType.String);
                parameters.Add("created_by", model.created_by, DbType.Guid);
                parameters.Add("company_id", model.company_id, DbType.Int64);
              

                
               var data= connection.ExecuteScalar<long>("[sp_solgen_Save_LeadConvert]", parameters, commandType: CommandType.StoredProcedure);
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
        public long saveLeadConvertopportunity(leadConvertModelopportunity model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Account", model.Account, DbType.String);
                parameters.Add("accountName", model.accountName, DbType.String);
                parameters.Add("accountid", model.accountid, DbType.String);
                parameters.Add("accounttypeid", model.accounttypeid, DbType.String);
                parameters.Add("contact", model.contact, DbType.String);
                parameters.Add("contactidform", model.contactidform, DbType.String);
                parameters.Add("email", model.email, DbType.String);
                parameters.Add("firstName", model.firstName, DbType.String);
                parameters.Add("lastName", model.lastName, DbType.String);
                parameters.Add("opportunityname", model.opportunityname, DbType.String);
                parameters.Add("phone", model.phone, DbType.String);
                parameters.Add("object_name", model.object_name, DbType.String);
                parameters.Add("product", model.product, DbType.String);
                parameters.Add("productFamily", model.productFamily, DbType.String);
                parameters.Add("isApplicableForLoan", model.isApplicableForLoan, DbType.String);
                parameters.Add("object_id", model.object_id, DbType.String);
                parameters.Add("Lead_id", model.object_ref_id, DbType.String);
                parameters.Add("created_by", model.created_by, DbType.Guid);
                parameters.Add("company_id", model.company_id, DbType.Int64);
                parameters.Add("state", model.state, DbType.Int64);
                



                var data = connection.ExecuteScalar<long>("[sp_solgen_Save_LeadConvertoppnew]", parameters, commandType: CommandType.StoredProcedure);
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

        public IEnumerable<dynamic> getLeadConvertData(long leadid, Guid userid, int companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_Get_leadConvert_Data",
                param: new
                {
                    leadid = leadid,
                   
                    userid = userid,
                    companyid = companyid
                   
                },
                commandType: CommandType.StoredProcedure);

                return dataList;
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

        public List<leadImagesModel> getImages(long leadid, int submoduleid, Guid userid, int companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
               // leadImagesModel dataList = new leadImagesModel();
              var   dataList = connection.Query<leadImagesModel>("sp_solgen_Get_fileupload_ImagesLeadview12",
                 new
                {
                    leadid = leadid,
                    submoduleid = submoduleid,
                    userid = userid,
                    companyid = companyid,
                  
                },
                commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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

        public List<MasterItems> GetContactDll(long leadid, int submoduleid, Guid userid, long companyid, string objectname)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_getcontactddl_leadview", new
                {
                    leadid = leadid,
                    submoduleid = submoduleid,
                    userid = userid,
                    companyid = companyid,
                    objectname=objectname
                }, commandType: CommandType.StoredProcedure).ToList();


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

        public int updateLeadStatus(long leadstatus, long leadid, Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
               
                parameters.Add("leadstatus", leadstatus, DbType.Int64);
                parameters.Add("leadid", leadid, DbType.Int64);
                parameters.Add("userid", userid, DbType.Guid);
                parameters.Add("companyid", companyid, DbType.Int64);

                return connection.ExecuteScalar<int>("[sp_solgen_update_Leadstaus_Leadview]", parameters, commandType: CommandType.StoredProcedure);

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

        public string saveLeadConvertproduct(leadConvertModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                Convert.ToInt64(model.loanid);
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("account_name", model.account_name, DbType.String);
                parameters.Add("account_type_id", model.account_type_id, DbType.String);
                parameters.Add("contactid", model.contactid, DbType.String);
               // parameters.Add("opportunity_name", model.opportunity_name, DbType.String);
                 parameters.Add("productid", model.productid, DbType.Int64);
                parameters.Add("object_name", model.object_name, DbType.String);
                parameters.Add("Lead_id", model.object_ref_id, DbType.Int64);
                parameters.Add("created_by", model.created_by, DbType.Guid);
                parameters.Add("company_id", model.company_id, DbType.Int64);
                //parameters.Add("loanid",  model.loanid, DbType.Int64);  
                return connection.ExecuteScalar<string>("[sp_solgen_Save_LeadConvertProduct]", parameters,commandTimeout:0, commandType: CommandType.StoredProcedure);

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

        public int Deleteimage(string id, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<int>("[sp_solgen_delete_uploadedfiles]", new
                {
                    id = id,
                   
                    userId = userId,
                    companyid = companyID
                    
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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

        public IEnumerable<dynamic> getLeadConvertModuleWizard(Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_Get_LeadconvertModuleWizards",
                param: new
                {

                    UserId = userid,
                    CompanyID = companyid,

                },
                commandType: CommandType.StoredProcedure);

                return dataList;
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

        public int updatecreatedBy(string ownerid, long leadid, Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("ownerid", ownerid, DbType.String);
                parameters.Add("leadid", leadid, DbType.Int64);
                parameters.Add("userid", userid, DbType.Guid);
                parameters.Add("companyid", companyid, DbType.Int64);

                return connection.ExecuteScalar<int>("[sp_solgen_update_OwnerName_Leadview]", parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<string> CheckRequiredDataOnLeadConvert(long Id, long companyID, Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_Zolar_checkRequiredDataOnLeadConvert",
                    new
                    { 
                        Id,
                        companyID,
                        userid
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> GetLeadById(long leadId, long companyID,Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_FetchLeadById",
                    new
                    {
                        leadId,
                        companyID,
                        userid
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> GetMandatoryDocumentsByLoanId(long loanId, long stageid, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_get_app_verification_data",
                    new
                    {
                        PRIMARY_KEY_VALUE = loanId,
                        COMPANY_ID = companyID,
                        stageid = stageid
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public bool CheckEmailNotExistInOthersTypeAccount(string email, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_Lead_CheckEmailNotExistInOthersTypeAccount",
                    new
                    {
                        email = email,
                        companyId = companyId
                    }, commandType: CommandType.StoredProcedure);
                return data.Count() > 0;
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

        public List<MasterItems> GetLeadConvertAccountDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetLeadConvertAccountDDl]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,
                    length = length,
                    serchText = serchText

                }, commandType: CommandType.StoredProcedure).ToList();

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
        public List<MasterItems> GetLeadConvertContactDll(Guid userid, long companyid, string id, int length, string serchText, bool isLead)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetLeadConvertContactDDl]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,
                    length = length,
                    serchText = serchText,
                    
                    isLead=  isLead

                }, commandType: CommandType.StoredProcedure).ToList();

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

        public SourceDestinationResponseModel GetSourceDestinationLocations(long opportunityId, long companyId,string type)
        {
            SolgenDbContext context = new SolgenDbContext();
            DbConnection connection = context.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                
                var data = connection.ExecuteScalar<string>("sp_GetSourceDestinationLocations", new
                {
                    opportunityId = opportunityId,
                    companyId = companyId,
                    type = type
                }, commandType: CommandType.StoredProcedure);

                var _result = JsonConvert.DeserializeObject<SourceDestinationResponseModel>(data);
                return _result;
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


        public async Task<string> UpdateAccountLocation(SourceDestinationCopmarisonModel model)
        {
            SolgenDbContext context = new SolgenDbContext();

            DbConnection connection = context.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = await connection.ExecuteScalarAsync<string>("sp_solgen_updateAccountLocation", new
                {
                    accountId = model.AccountId,
                    locationId = model.LocationId,
                    distance = Convert.ToDouble(model.Distance),
                    hours = Convert.ToDouble(model.Time),
                    seconds = model.TotalSeconds
                }, commandType: CommandType.StoredProcedure);

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

        public async Task<string> UpdateAccountZoneLocation(SourceDestinationCopmarisonModel model)
        {
            SolgenDbContext context = new SolgenDbContext();
            DbConnection connection = context.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = await connection.ExecuteScalarAsync<string>("sp_solgen_updateAccountZoneLocation", new
                {
                    accountId = model.AccountId,
                    locationId = model.LocationId
                }, commandType: CommandType.StoredProcedure);

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
    }
}
