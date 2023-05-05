using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class LoanApplicationRepository : ILoanApplicationRepository
    {
        private readonly SolgenDbContext _dbContext;
        public LoanApplicationRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetApplicationById(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLoanApplicationById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

                    }, commandTimeout: 0, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
        public async Task<string> GetLoanStages(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLoanApplicationSatgeById_v1",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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
        public IEnumerable<dynamic> getloansubstage(Guid userid, long CompanyID, long batchid, long modeuleid, long submoduleid)
        {  

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                  
                dynamic dataList = connection.Query<dynamic>("sp_solgen_Getloanstages",
                param: new
                {

                    moduleid= modeuleid, 
                    submoduleid= submoduleid,
                    userId = userid,
                    CompanyID = CompanyID,
                    batchid = batchid,
                   
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

        public List<MasterItems> GetSubStageDll(Guid userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_substageloanapplication", new { userid = userid, CompanyID = CompanyID }, commandType: CommandType.StoredProcedure).ToList();

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

        public Int64 SaveSubstage(savesubstagemodel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                string usertypedata = "";

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("data", model.stagedata, DbType.String);
                parameters.Add("sequence_mandatory", model.sequencemandatory, DbType.Boolean);
                parameters.Add("companyid", model.companyId, DbType.Int64);
                parameters.Add("moduleid", model.moduleId, DbType.Int64);
                parameters.Add("submoduleid", model.subModuleId, DbType.Int64);

                parameters.Add("createdby", model.userId, DbType.Guid);
                
                if (model.batchid != 0)
                {
                    parameters.Add("batchid1", model.batchid, DbType.Int64);
                    connection.ExecuteScalar<Int64>("[sp_solgen_AddEditloanstages_test]", parameters, commandType: CommandType.StoredProcedure);
                }
                else
                {
                    connection.ExecuteScalar<Int64>("[sp_solgen_AddEditloanstages]", parameters, commandType: CommandType.StoredProcedure);
                }


                return 1;
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
        public string AddUpdateSystemInfo(JsonModel model)
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
                parameters.Add("@leadconvert", (model.leadconvert));
                parameters.Add("@IsForChangeOrder", (model.isForChangeOrder));
                parameters.Add("@DelareLogo", (model.dealerDocName));
                parameters.Add("@FileUrl", (model.FileUrl));
                parameters.Add("@FileExtension", (model.fileExtension));
                parameters.Add("@IsMediaServer", (model.isMediaServer));



                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditSystemInfo_form", parameters,commandTimeout:0, commandType: CommandType.StoredProcedure);
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

        public string GetLAContractID(long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", applicationid);
              
               
                parameters.Add("@companyId", CompanyID);

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_getloapplicationconrtactid", parameters, commandType: CommandType.StoredProcedure);
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

        public string AddUpdateDynamicForm(JsonModel model)
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
                //parameters.Add("@leadconvert", (model.leadconvert));


                string data = connection.QueryFirstOrDefault<string>("sp_solgen_Save_forms_data", parameters, commandType: CommandType.StoredProcedure);
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


        public string AddUpdateInstallStepForm(installStepJsonModel model)
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

                parameters.Add("@houseInViewfile", (model.HouseInViewfile));
                parameters.Add("@ElectricHookup", (model.ElectricHookupfile));
                parameters.Add("@ResidenceWithAddressInView", (model.ResidenceWithAddressInViewfile));
                parameters.Add("@BatteryStorage", (model.BatteryStoragefile));
                //parameters.Add("@leadconvert", (model.leadconvert));


                string data = connection.QueryFirstOrDefault<string>("sp_solgen_Save_InstallStepforms_data", parameters, commandType: CommandType.StoredProcedure);
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

        public string AddUpdateVerificationdata(JsonModel model)
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
                //parameters.Add("@leadconvert", (model.leadconvert));


                string data = connection.QueryFirstOrDefault<string>("sp_solgen_Save_verification_data", parameters, commandType: CommandType.StoredProcedure);
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
        public string AddUpdateBankdata(JsonModel model)
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
                //parameters.Add("@leadconvert", (model.leadconvert));


                string data = connection.QueryFirstOrDefault<string>("sp_solgen_Save_bank_verification_data", parameters, commandType: CommandType.StoredProcedure);
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

        public async Task<string> GetSystemInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetSystemInformationById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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


        public string AddUpdateApplicant(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateApplicantInfo"
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

        public async Task<string> GetApplicantInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetApplicantInfoById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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
        public async Task<string> GetbankApplicantInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetbankApplicantInfoById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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


        public string AddUpdateCoApplicant(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateCoApplicantInfo"
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

        public async Task<string> GetCoApplicantInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetCoApplicantInfoById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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


        public string AddUpdateInstallerProperty(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateInstallerProperty"
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

        public async Task<string> GetInstallerPropertyInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetInstallerPropertyInfo",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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


        public string AddUpdatePaymentInfo(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateLAPaymentInfo"
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

        public async Task<string> GetPaymentInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLAPaymentInfo",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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

        public string AddUpdateLoanProduct(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateLoanProduct"
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

        public async Task<string> GetLoanProductInfo(Guid userid, long CompanyID, long applicationid, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLoanProductInfo",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid,
                        SubmoduleName= submoduleName,

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

        public string AddUpdateNtp(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateNtp"
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

        public async Task<string> GetNtpInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetNtpInfo",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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



        public string AddUpdateReleaseFunds(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateReleaseFunds"
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
        public async Task<string> GetReleaseFundsInfo(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetReleaseFundsInfo",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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

        public IEnumerable<dynamic> getUploadedImages(long accid, Guid userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();


                dynamic dataList = connection.Query<dynamic>("sp_solgen_getUploadedImages",
                param: new
                {
                    accid = accid,

                    userid = userid,
                    CompanyID = companyId
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
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetLoanapplicationNotificationList(long applicationid, string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                // var dataList = connection.Query("sp_solgen_GetNotificationListForLoanApplication",sp_solgen_GetNotificationListForLoanApplicationFromEmailTable
                var dataList = connection.Query("sp_solgen_GetNotificationListForLoanApplicationFromEmailTable",
                 param: new
                 {
                     SortDir = sortDir,
                     SortColumn = sortColumn,
                     PageNo = pageIndex,
                     PageSize = pageSize,
                     UserId = userid,
                     CompanyId = CompanyID,
                     applicationid = applicationid
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

        public List<MasterItems> GetToUserDrpList(string userid, string CompanyID, long? loanId,int? isPrivate)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_ToUserForEmailNotificationList",
                    new { userid = userid, CompanyID = CompanyID, loanApplication = loanId ,IsPrivate= isPrivate }, commandType: CommandType.StoredProcedure).ToList();

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

            //DbConnection connection = _dbContext.Database.GetDbConnection();
            //try
            //{
            //    connection.Open();
            //    var data = connection.Query<MasterItems>("sp_solgen_ToUserForEmailNotificationList", new { userid = userid, CompanyID = CompanyID }, commandType: CommandType.StoredProcedure).ToList();

            //    return data;
            //}
            //catch (Exception ex)
            //{
            //    throw new Exception(ex.Message);
            //}
            //finally
            //{
            //    if (connection.State == System.Data.ConnectionState.Open)
            //        connection.Close();
            //}
        }


        public List<MasterItems> GetFollowUpToList(string loanId, string CompanyID, long commenthistoryId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_GetFollowUpToList", new { loanId = loanId, CompanyID = CompanyID, commentid = commenthistoryId }, commandType: CommandType.StoredProcedure).ToList();

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

        public List<MasterItems> GetCCUserDrpList(string userid, string CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_CCUserForEmailNotificationList", new { userid = userid, CompanyID = CompanyID }, commandType: CommandType.StoredProcedure).ToList();

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
        public string SendManualNotification(AutomaticNotificationModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            //var userTo = ""; var userFrom = "";
            //foreach (var item in model.toUser)
            //{
            //    if (userTo == "")
            //    {
            //        userTo = item;
            //    }
            //    else
            //    {
            //        userTo = userTo + "," + item;
            //    }
            //}
            //foreach (var item in model.ccUser)
            //{
            //    if (userFrom == "")
            //    {
            //        userFrom = item;
            //    }
            //    else
            //    {
            //        userFrom = userFrom + "," + item;
            //    }
            //}
            try
            {
                connection.Open();
                Guid id = Guid.Empty;
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_SaveNotificationFromLoanApplication", new
                {

                    subject = model.subject,
                    subjectBody = model.subjectBody,
                    createdBy = model.CreatedBy,
                    userTo = Convert.ToInt32(model.toemail),
                    userFrom = model.ccUser,
                    CompanyId = model.CompanyId,
                    ObjectID = model.objectId
                }, commandType: System.Data.CommandType.StoredProcedure);

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

        public string SendEmailForManualNotification(SendMaualNotificationModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            var userTo = ""; var userCC = "";

            if (model.ccUser != null)
            {
                foreach (var item in model.ccUser)
                {
                    if (userCC == "")
                    {
                        userCC = item;
                    }
                    else
                    {
                        userCC = userCC + "," + item;
                    }
                }
            }
            try
            {
                connection.Open();
                Guid id = Guid.Empty;
                _status = connection.ExecuteScalar<string>("sp_solgen_SaveNotificationFromLoanApplicationForMaulaEMailNotifications", new
                {

                    subject = model.subject,
                    subjectBody = model.subjectBody,
                    createdBy = model.CreatedBy,
                    userTo = model.toUser,
                    userCC = userCC,
                    CompanyId = model.CompanyId,
                    ObjectID = model.objectId,
                    RouteUrl = model.RouteUrl
                }, commandType: System.Data.CommandType.StoredProcedure);

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

        public string SaveUserEmail(SendMaualNotificationModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            var userTo = ""; var userCC = "";

            if (model.ccUser != null)
            {
                foreach (var item in model.ccUser)
                {
                    if (userCC == "")
                    {
                        userCC = item;
                    }
                    else
                    {
                        userCC = userCC + "," + item;
                    }
                }
            }
            try
            {
                connection.Open();
                Guid id = Guid.Empty;
                _status = connection.ExecuteScalar<string>("sp_solgen_SaveEmail", new
                {

                    subject = model.subject,
                    description = model.subjectBody,
                    SenderId = model.CreatedBy,
                    EmailTo = model.toUser,
                    CCEmailIds = userCC,
                    CompanyID = model.CompanyId,
                    EmailRefId = model.objectId,
                    EmailFrom = model.CreatedBy,
                    EmailRefModuleCode = model.RouteUrl,
                    contactid = model.RouteUrl
                    //  ObjectID = model.objectId,
                    // RouteUrl = model.RouteUrl
                }, commandType: System.Data.CommandType.StoredProcedure);

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


        public PagedData GetAuditHistoryList(long? sectionId, string tableName, string userId, long companyId, long appid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_Get_Audit_history_Data",
                    param: new
                    {
                        section_id = sectionId,
                        Table = tableName,
                        UserId = userId,
                        CompanyId = companyId,
                        ApplicationId = appid
                    },
                    commandType: CommandType.StoredProcedure,commandTimeout:0).ToList();

                return new PagedData(dataList, 1, int.MaxValue);
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


        public PagedData GetAuditHistoryDetail(long? id1, long? id2, string tblName1, string tblName2, string userId, long companyId, string appid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_Get_Audit_history_Data_detail",
                    param: new
                    {
                        Id1 = id1,
                        Id2 = id2,
                        Table1 = tblName1,
                        Table2 = tblName2,
                        UserId = userId,
                        CompanyId = companyId,
                        ApplicationId = appid
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, 1, int.MaxValue);
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


        public long AddComment(CommentModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("CommentID", model.CommentID, DbType.Int64);
                parameters.Add("CommentType", model.CommentType, DbType.Int64);
                parameters.Add("Comment", model.Comment, DbType.String);
                parameters.Add("Element", model.Element, DbType.String);
                parameters.Add("FollowUpDate", model.FollowUpDate, DbType.DateTime);
                parameters.Add("AssignTo", model.AssignTo, DbType.String);
                parameters.Add("LoanApplicationId", model.LoanApplicationId, DbType.Int64);
                parameters.Add("CompanyID", model.CompanyId, DbType.Int64);
                parameters.Add("CreatedBy", model.UserId, DbType.String);
                parameters.Add("IsActive", model.IsActive, DbType.Boolean);
                parameters.Add("IsPrivate", model.IsPrivateBool, DbType.Boolean);

                return connection.ExecuteScalar<long>("[sp_solgen_addComment]", parameters, commandType: CommandType.StoredProcedure);

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

        public PagedData GetCommentHistoryList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetCommentHistoryList",
                    param: new
                    {
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userid,
                        CompanyId = CompanyID,
                        Applicationid = applicationid
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

        public PagedData GetAssignedUserList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid, long commentId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetAssignedUserList",
                    param: new
                    {
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userid,
                        CompanyId = CompanyID,
                        Applicationid = applicationid,
                        CommentId = commentId
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

        public PagedData GetRuleEngineHistoryList(string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetRuleEngineHistoryList",
                    param: new
                    {
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userid,
                        CompanyId = CompanyID,
                        Applicationid = applicationid
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

        public dynamic GetDocumentForReceiveAndPending(string userid, string companyid, string productId, string reqFrom)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault("sp_solgen_LoanApplicationDocumentPendingOrReceiveAndTotalDocument",
                    param: new
                    {
                        userid = userid,
                        companyid = companyid,
                        loanApplicationId = productId,
                        reqFrom = reqFrom
                    },
                    commandType: CommandType.StoredProcedure);

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
        public List<dynamic> GetPendingDocumentName(string userid, string companyid, string loanId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetLoanApplicationPendingDocuments",
                    param: new
                    {
                        userid = userid,
                        companyid = companyid,
                        loanApplicationId = loanId,
                    },
                    commandType: CommandType.StoredProcedure).ToList();

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
        public async Task<string> GetExpensesDebtList(string userId, long companyId, long appid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetExpenses_Debt_List",
                    new
                    {
                        UserId = userId,
                        CompanyId = companyId,
                        ApplicationId = appid,

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

        public async Task<string> GetExpensesIncomeList(string userId, long companyId, long appid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetExpenses_Income_List",
                    new
                    {
                        UserId = userId,
                        CompanyId = companyId,
                        ApplicationId = appid,

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
        public int AddUpdateExpenseIncome(ExpensesModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //var data = 0;
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FieldsData", model.FieldsData);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@CompanyId", model.CompanyId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddUpdateExpenseIncome", parameters, commandType: System.Data.CommandType.StoredProcedure);
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

        public int AddUpdateExpenseDebt(ExpensesModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //var data = 0;
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FieldsData", model.FieldsData);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@CompanyId", model.CompanyId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddUpdateExpenseDebt", parameters, commandType: System.Data.CommandType.StoredProcedure);
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

        public async Task<string> GetExpensesRatiosDetail(string userId, long companyId, long appid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetExpenses_Ratios_List",
                    new
                    {
                        UserId = userId,
                        CompanyId = companyId,
                        ApplicationId = appid,

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

        public string getloapallicationdataforSF(Guid userid, long CompanyID, long appid)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                string dataList = connection.Query<string>("sp_solgen_Getloanapplicationdataforsf",
                param: new
                {


                    userId = userid,
                    CompanyID = CompanyID,
                    ApplicationId = appid
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();

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

        public PagedData GetLoanApplicationBankerList(string Userid, long CompanyID, string name,  string sortDir, string sortColumn, int pageNo, int pageSize, long loanapplicationId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanApplicationBankerList",
                    param: new
                    {
                        Name = name,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageNo,
                        PageSize = pageSize,
                        UserId = Userid,
                        CompanyId = CompanyID,
                        loanapplicationId = loanapplicationId
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageNo, pageSize);
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
        public PagedData GetLoanApplicationSalesList(string Userid, long CompanyID, string name, string userType, string sortDir, string sortColumn, int pageNo, int pageSize, long loanapplicationId, string listType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanApplicationSalesList",
                    param: new
                    {
                        Name=name,
                        UserType=userType,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageNo,
                        PageSize = pageSize,
                        UserId = Userid,
                        CompanyId = CompanyID,
                        loanapplicationId = loanapplicationId,
                        ListType= listType,
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageNo, pageSize);
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
        public long saveAssociateBanker(saveAssociateBankerModel model)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("loanappid", model.loanappid, DbType.Int64);
                parameters.Add("contactids", model.contactids, DbType.String);
                parameters.Add("CompanyID", model.CompanyId, DbType.Int64);
                parameters.Add("CreatedBy", model.UserId, DbType.String);
                parameters.Add("ObjectName", model.objectName, DbType.String);

                return connection.ExecuteScalar<long>("[sp_solgen_saveAssociateBanker]", parameters, commandType: CommandType.StoredProcedure);

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

        public long saveAssignedSalesUserDetail(saveAssociateBankerModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("loanappid", model.loanappid, DbType.Int64);
                parameters.Add("contactids", model.contactids, DbType.String);
                parameters.Add("CompanyID", model.CompanyId, DbType.Int64);
                parameters.Add("CreatedBy", model.UserId, DbType.String);
                parameters.Add("ObjectName", model.objectName, DbType.String);
                parameters.Add("Type", model.Type, DbType.String);

                return connection.ExecuteScalar<long>("[sp_solgen_saveAssignedSalesUserDetail]", parameters, commandType: CommandType.StoredProcedure);
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

        public long saveAssignedApplicationToDealer(saveAssignedApplicationToDealer model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("loanApplicationId", model.loanappid, DbType.Int64);
                parameters.Add("dealerAccountId", model.dealerAccountId, DbType.String);
                parameters.Add("companyID", model.companyId, DbType.Int64);
                parameters.Add("userId", model.UserId, DbType.String);

                return connection.ExecuteScalar<long>("[sp_solgen_TransferApplicationToDealer]", parameters, commandType: CommandType.StoredProcedure);
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

        public IEnumerable<dynamic> GetLoanApplicationSales_Rep(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_GetLoanApplicationSales_Rep",
                param: new
                {


                    userId = userid,
                    CompanyID = CompanyID,
                    applicationid = applicationid
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
        public List<LoanapplicationDocumentTypeModel> GetLoanapplicationDocumentType(string userid, string companyid, string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                List<LoanapplicationDocumentTypeModel> dataList = new List<LoanapplicationDocumentTypeModel>();
                connection.Open();
                dataList = connection.Query<LoanapplicationDocumentTypeModel>("sp_solgen_GetLoanApplicationDocumentForLoanproduct", new { UserId = userid, companyId = companyid, loanId = id }, commandType: CommandType.StoredProcedure).ToList();
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


        public string ReplyComment(ReplyCommentModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("CommentID", model.ReplyCommentID, DbType.Int64);
                parameters.Add("Comment", model.ReplyComment, DbType.String);
                parameters.Add("LoanApplicationId", model.ReplyLoanApplicationId, DbType.Int64);
                parameters.Add("CompanyID", model.CompanyId, DbType.Int64);
                parameters.Add("CreatedBy", model.UserId, DbType.String);
                return connection.ExecuteScalar<string>("[sp_solgen_replyComment]", parameters, commandType: CommandType.StoredProcedure);

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
        public long saveReason(loanAppReasonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                string close_date = null;
                if (!string.IsNullOrEmpty(model.closedate))
                {
                    DateTime dt = DateTime.ParseExact(model.closedate.Substring(0, 24),
                     "ddd MMM dd yyyy HH:mm:ss",
                     CultureInfo.InvariantCulture);
                    close_date = dt.ToString("MM/dd/yyyy");
                }
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("loanappid", model.id, DbType.Int64);
                parameters.Add("reason", model.reason_description, DbType.String);
                parameters.Add("CompanyID", model.company_id, DbType.Int64);
                parameters.Add("CreatedBy", model.created_by, DbType.Guid);
              
                parameters.Add("closedate", close_date, DbType.String);
                return connection.ExecuteScalar<long>("[sp_solgen_saveloanapplicationcancelreason]", parameters, commandType: CommandType.StoredProcedure);

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


        public List<dynamic> UncancelLoanApplication(string id, string reason, Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_uncancelloanapp",
                    new
                    {
                        loanappid = id,
                        CompanyID = companyid,
                        CreatedBy = userid,
                        reason = reason
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



        //public string UncancelLoanApplication(string id, string reason, Guid userid, long companyid)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
                
        //        connection.Open();
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("loanappid", id, DbType.Int64);              
        //        parameters.Add("CompanyID", companyid, DbType.Int64);
        //        parameters.Add("CreatedBy", userid, DbType.Guid);
        //        parameters.Add("reason", reason, DbType.String);
        //       return  connection.ExecuteScalar<string>("[sp_solgen_uncancelloanapp]", parameters, commandType: CommandType.StoredProcedure);

        //    }
        //    catch (Exception ex)
        //    {

        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == System.Data.ConnectionState.Open)
        //            connection.Close();
        //    }
        //}
        public long saveOverrideReason(loanAppReasonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("loanappid", model.id, DbType.Int64);
                parameters.Add("reason", model.reason_description, DbType.String);
                parameters.Add("type", model.type, DbType.String);
                parameters.Add("CompanyID", model.company_id, DbType.Int64);
                parameters.Add("CreatedBy", model.created_by, DbType.Guid);

                return connection.ExecuteScalar<long>("[sp_solgen_saveloanapplicationoverridereason]", parameters, commandType: CommandType.StoredProcedure);

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
        public PagedData GetCanceledLoanApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanCanceledApplicationList",
                param: new
                {
                    NameSearch = name,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    batchid = batchid
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

        public List<dynamic> GetUserDetailByUserTypeAppId(string ApplicationId, string CompanyId, string usertype, string moduletype = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetUserDetailByUserTypeAppId",
                    new
                    {
                        ApplicationId = ApplicationId,
                        usertype = usertype,
                        CompanyId = CompanyId,
                        moduletype= moduletype
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

        public List<dynamic> GetBankUserSetCancelReqForNotification(long ApplicationId, string CompanyId, string userid, string reason, string reqdate)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetBankUsersForNotification",
                    new
                    {
                        id = ApplicationId,
                        userId = userid,
                        companyid = CompanyId,
                        reason = reason,
                         reqdate = reqdate
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

        public PagedData GetStateManagementList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
                connection.Open();
                var data = connection.Query("[sp_solgen_GetStateManagement_List]", param: new
                {
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

        public string UpdateOverRide(string userid, long companyId, long loanId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserId", userid);
                parameters.Add("CompanyId", companyId);
                parameters.Add("ApplicationId", loanId);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_UpdateIsOverride", parameters, commandType: CommandType.StoredProcedure);
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

        public Int64 SaveStagesFromSolgen(savesubstagemodel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                string usertypedata = "";

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("data", model.stagedata, DbType.String);
                parameters.Add("sequence_mandatory", model.sequencemandatory, DbType.Boolean);
                parameters.Add("companyid", model.companyId, DbType.Int64);
                parameters.Add("moduleid", model.moduleId, DbType.Int64);
                parameters.Add("submoduleid", model.subModuleId, DbType.Int64);

                parameters.Add("createdby", model.userId, DbType.Guid);

                if (model.batchid != 0)
                {
                    parameters.Add("batchid1", model.batchid, DbType.Int64);
                    connection.ExecuteScalar<Int64>("[sp_solgen_AddEditLoanStagesFromSolgen_BacthId]", parameters, commandType: CommandType.StoredProcedure);
                }
                else
                {
                    connection.ExecuteScalar<Int64>("[sp_solgen_AddEditLoanStagesFromSolgen]", parameters, commandType: CommandType.StoredProcedure);
                }


                return 1;
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

        public string UpdateDenyReson(string userid, long companyId, long loanId, string type, string denyReason)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserId", userid);
                parameters.Add("CompanyId", companyId);
                parameters.Add("ApplicationId", loanId);
                parameters.Add("Type", type);
                parameters.Add("DenyReason", denyReason);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_UpdateDenyReson", parameters, commandType: CommandType.StoredProcedure);
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

        public async Task<string> GetFailedApplicationsForEmail()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetFailedApplicationsForEmail",
                    new
                    {
                        
                    }, commandType: CommandType.StoredProcedure));//.FirstOrDefault());
                return string.Join("", data);
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

        public async Task<int> SaveScheduledEmails(string data)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<string>("sp_solgen_SaveScheduledEmails",
                    new
                    {
                        data = data
                    }, commandType: CommandType.StoredProcedure));
                return 1;
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

        public async Task<PagedData> GetScheduledEmails(DateTime? filterDate, string sortColumn, string sortDir, int currentPage, int pageSizeValue, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                
                await connection.OpenAsync();
                var data = connection.Query("sp_solgen_GetScheduledEmails",
                    new
                    {
                        filterDate = filterDate,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = currentPage,
                        PageSize = pageSizeValue,
                        companyId = companyId
                    }, commandType: CommandType.StoredProcedure).ToList();
                return new PagedData(data, currentPage, pageSizeValue);
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

        public async Task<string> GetScheduledEmailsForScheduler()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetScheduledEmailsForScheduler",
                    new
                    {

                    }, commandType: CommandType.StoredProcedure));//.FirstOrDefault());
                return string.Join("", data);
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

        public async Task<int> UpdateScheduledEmails(string data)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<string>("sp_solgen_UpdateScheduledEmails",
                    new
                    {
                        data = data
                    }, commandType: CommandType.StoredProcedure));
                return 1;
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

        public PagedData getCompletedApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanApplicationList",
                param: new
                {
                    NameSearch = name,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    batchid = batchid,
                    ListType = "COMPLETED"
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
        public async Task<string> GetNewLoanApplicationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, string type, string custom_view_id, Guid? userId, long companyId, long batchid, string listType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_LoanApplication_Listing", param: new
                {
                    VIEWER_ID = userId,
                    COMPANY_ID = companyId,
                    SORT_BY = sortDir,
                    SORT_EXP = sortColumn,
                    PAGESIZE = pageSize,
                    PAGENUMBER = pageIndex,
                    SEARCH_CONDITION = nameSearch,
                    view_port_id = custom_view_id,
                    batchid= batchid,
                    ListType= listType

                } , commandTimeout: 0
                , commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> GetApplicationsWithPendingDocuments()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetApplicationsWithPendingDocuments",
                    new
                    {

                    }, commandType: CommandType.StoredProcedure));//.FirstOrDefault());
                return string.Join("", data);
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

        public  List<dynamic> GetScheduledNotificationForScheduler()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetScheduledNotificationForScheduler", new
                    {
                       
                    }, commandType: CommandType.StoredProcedure).ToList();//.FirstOrDefault());
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

        public async Task<string> GetChangeOrderInfoById(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetChangeOrderInfoById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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


        public async Task<string> GetFileSource(Guid userid, long CompanyID, long applicationid,string type)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetFileSource",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        Id = applicationid,
                        Type = type

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault()); ;
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

        public async Task<string> GetTwilioSMSDetail(Guid userid, long CompanyID, long applicationid, string BorrowerNumber)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetTwilioSMSDetail",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid,
                        BorrowerNumber = BorrowerNumber,

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

        public async Task<int> SwapApplicants(long loanApplicationId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<string>("sp_solgen_SwapApplicants",
                    new
                    {
                        loanApplicationId = loanApplicationId,
                        companyId = companyId
                    }, commandType: CommandType.StoredProcedure));
                return 1;
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


        public async Task<string> GetLoanApplicationReportList(string sortColumn, string sortDir, int? pageIndex, int? pageSize, string selectedFields, Guid userId, long companyId, string fromDate, string toDate, string customWhereCondition, string filterData)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }

            try
            {
                connection.Open();

                if (companyId == 1003)
                {

                    //if (!string.IsNullOrEmpty(customWhereCondition))
                    //{
                    //    customWhereCondition = customWhereCondition.Replace("'", "\"");
                    //}

                    var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_GetSolgenCustomReportList", param: new
                    {
                        User_Id = userId,
                        COMPANY_ID = companyId,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        Selected_Fields = selectedFields,
                        FromDate = fromDate,
                        ToDate = toDate,
                        CustomWhereCondition = customWhereCondition,
                        FilterData = filterData

                    }, commandTimeout: 0
               , commandType: CommandType.StoredProcedure).FirstOrDefault());
                    return dataList;
                }
                else
                {
                    var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_GetLoanApplicationReportList", param: new
                    {
                        User_Id = userId,
                        COMPANY_ID = companyId,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        Selected_Fields = selectedFields,
                        FromDate = fromDate,
                        ToDate = toDate,
                        CustomWhereCondition = customWhereCondition,
                        FilterData = filterData

                    }, commandTimeout: 0
             , commandType: CommandType.StoredProcedure).FirstOrDefault());
                    return dataList;
                }
             
               
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

        public async Task<string> GetAllReportList(string sortColumn, string sortDir, int pageIndex, int pageSize, string searchText, Guid userId, long companyId, string companyType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                if (companyType == "companytypeSolarInstall" || companyType == "companytypeCRMLoanInstall" || companyType == "companytypeFinancialInstitute")
                {
                    var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_GetCustomReportList", param: new
                    {
                        User_Id = userId,
                        COMPANY_ID = companyId,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SearchText = searchText,
                        CompanyType = companyType

                    }, commandTimeout: 0
                   , commandType: CommandType.StoredProcedure).FirstOrDefault());
                    return dataList;
                }

                else
                {
                    var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_GetLoanApplicationAllReportList", param: new
                    {
                        User_Id = userId,
                        COMPANY_ID = companyId,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SearchText = searchText,

                    }, commandTimeout: 0
                    , commandType: CommandType.StoredProcedure).FirstOrDefault());
                    return dataList;

                }
      
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

        public async Task<List<LoanApplicationReportFilter>> GetReportDataById(Int64 id, Guid userId, long companyId, string companyType)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (companyType == "companytypeSolarInstall" || companyType == "companytypeCRMLoanInstall" || companyType == "companytypeFinancialInstitute")
                {
                    List<LoanApplicationReportFilter> dataList = new List<LoanApplicationReportFilter>();
                    dataList = (List<LoanApplicationReportFilter>)await _connection.QueryAsync<LoanApplicationReportFilter>("sp_solgen_GetCustomReportDataById", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure);
                    return dataList;
                }
                else
                {
                    List<LoanApplicationReportFilter> dataList = new List<LoanApplicationReportFilter>();
                    dataList = (List<LoanApplicationReportFilter>)await _connection.QueryAsync<LoanApplicationReportFilter>("sp_solgen_GetReportDataById", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure);
                    return dataList;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public long DeleteReport(string userid, long companyId, long reportId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserId", userid);
                parameters.Add("CompanyId", companyId);
                parameters.Add("ReportId", reportId);
                long data = connection.QueryFirstOrDefault<long>("sp_solgen_DeleteReport", parameters, commandType: CommandType.StoredProcedure);
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
        public PagedData GetAssignedApplication(string value, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetAssignedApplication",
                    param: new
                    {
                        Value = value,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
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

        public string TransferApplicatioto_ToUser(string transferLoanAppId, string fromUserId, string toUserId, Guid userid, long companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserId", userid);
                parameters.Add("CompanyId", companyId);
                parameters.Add("TransferLoanAppId", transferLoanAppId);
                parameters.Add("FromUserId", fromUserId);
                parameters.Add("ToUserId", toUserId);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_TransferApplicatioto_ToUser", parameters, commandType: CommandType.StoredProcedure);
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
        public PagedData GetTransferLoanApplicationList(long applicationid, string userid, long CompanyID, string sortDir, string sortColumn, int pageIndex, int pageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetTransferLoanApplicationList",
                 param: new
                 {
                     SortDir = sortDir,
                     SortColumn = sortColumn,
                     PageNo = pageIndex,
                     PageSize = pageSize,
                     UserId = userid,
                     CompanyId = CompanyID,
                     applicationid = applicationid
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

        public DataTable sftp(string ApplicationId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var reader = connection.ExecuteReader("sp_solgen_sftp @ApplicationId = @ApplicationId ",
                    new { ApplicationId = ApplicationId }
                    

                    );

                    DataTable table = new DataTable();
                    table.Load(reader);
                return table;

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
        public DataTable GetLoanDocDetail(string ApplicationId, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var reader = connection.ExecuteReader("sp_solgen_GetLoanDocDetail @ApplicationId = @ApplicationId , @CompanyId= @CompanyId  ", new { ApplicationId = ApplicationId, CompanyId = CompanyID });

                DataTable table = new DataTable();
                table.Load(reader);
                return table;
             
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

        public string SaveVerityFileTransferDetail(long appId, Guid UserId, long companyId, string Remote, string result)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("UserId", UserId);
                parameters.Add("CompanyId", companyId);
                parameters.Add("LoanAppId", appId);
                parameters.Add("Remote", Remote);
                parameters.Add("result", result);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_SaveVerityFileTransferDetail", parameters, commandType: CommandType.StoredProcedure);
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


        public List<MasterItems> GetFilterValueDll(Guid userid, long companyid, string id, int length, string serchText, string filterFieldName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetFilterValueDll]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,
                    length = length,
                    serchText = serchText,
                    filterFieldName = filterFieldName

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

        public async Task<string> GetGraphVisualizationReportData(string selectedFields, Guid userId, long companyId, string fromDate, string toDate, string customWhereCondition, string filterData, long? groupByFieldId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }
            try
            {
                connection.Open();

                    var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_GetGraphVisualizationReportData", param: new
                    {
                        User_Id = userId,
                        COMPANY_ID = companyId,
                        Selected_Fields = selectedFields,
                        FromDate = fromDate,
                        ToDate = toDate,
                        CustomWhereCondition = customWhereCondition,
                        FilterData = filterData,
                        GroupByFieldId = groupByFieldId

                    }, commandTimeout: 0
             , commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        

        public List<LoanApplicationNumberForTranserFilesToSFTP> GetLoanApplicationNumbers()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<LoanApplicationNumberForTranserFilesToSFTP>("sp_solgen_GetLoanApplicationNumbers",  commandType: CommandType.StoredProcedure).ToList();

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

        public string UpdateInternalVerification_SyncStatus(long appId, long companyId, string respone)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("CompanyId", companyId);
                parameters.Add("LoanAppId", appId);
                parameters.Add("Respone", respone);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_UpdateInternalVerification_SyncStatus", parameters, commandType: CommandType.StoredProcedure);
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
        public PagedData GetSFTPLogList(string applicationNumber, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetSFTPLogList",
                    param: new
                    {
                        ApplicationNumber = applicationNumber,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
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

    }

}

