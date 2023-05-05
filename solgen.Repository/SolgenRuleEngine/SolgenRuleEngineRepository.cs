using Dapper;
using Microsoft.EntityFrameworkCore;
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
    public class SolgenRuleEngineRepository : ISolgenRuleEngineRepository
    {
        private readonly SolgenDbContext _dbContext;
        public SolgenRuleEngineRepository(SolgenDbContext solgenDbContext)
        {
            _dbContext = solgenDbContext;
        }

        public PagedData GetRuleList(string name, long? ModuleId, long? SubModuleId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_SolgenRuleEngine_GetRulesList",
                    param: new
                    {
                        Name = name,
                        ModuleId = ModuleId,
                        SubModuleId = SubModuleId,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
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
        public async Task<string> GetRuleDetailById(Guid userid, long CompanyID, string ruleid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_SolgenRuleEngine_GetRuleById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        RuleId = ruleid
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                //var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetRuleDetailById",
                //new
                //{
                //    CompanyId = 1004,
                //    UserId = userid,
                //    RuleId = 78
                //}, commandType: CommandType.StoredProcedure).FirstOrDefault());

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
        //public async Task<string> GetRuleDetailById(Guid userid, long CompanyID, string ruleid)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetSolgenRuleDetailById",
        //            new
        //            {
        //                CompanyId = CompanyID,
        //                UserId = userid,
        //                RuleId = ruleid
        //            }, commandType: CommandType.StoredProcedure).FirstOrDefault());
        //        return data;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == ConnectionState.Open)
        //            connection.Close();
        //    }
        //}

        public bool Save(string jsondata,string ruleid, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@ruleID", ruleid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                return connection.ExecuteScalar<int>("sp_solgen_SolgenRuleEngine_AddEditRule"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure) > 0;

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


        public string CheckRuleNameExist(string name, long? ruleId, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@RuleId", ruleId);
                parameters.Add("@name", name);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_SolgenRuleEngine_CheckRuleNameExist"
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


        public List<dynamic> GetSubModuleEventList(int subModuleId, int companyId)
        {
            try
            {
                DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    connection.Open();
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("SubModuleId", subModuleId, System.Data.DbType.Int32);
                    parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                    return connection.Query("sp_solgen_SolgenRuleEngine_GetSubModuleEventsList", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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
            catch (Exception)
            {

                throw;
            }
        }


        public string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_SolgenRuleEngine_GetCustomFields",
                    new
                    {
                        COMPANY_ID = companyid,
                        MODULE_ID = moduleId,
                        SUB_MODULE_ID = subModuleId,
                        OTHER_DATA = "",
                        USER_ID = userid
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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


        public string GetDynamicReportFieldsListBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId, string subModuleCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetDynamicReportFieldsListBySubModuleId",
                    new
                    {
                        COMPANY_ID = companyid,
                        MODULE_ID = moduleId,
                        SUB_MODULE_ID = subModuleId,
                        OTHER_DATA = "",
                        USER_ID = userid,
                        subModuleCode = subModuleCode
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetCustomFieldOptionsList(string companyid, string userid, long? moduleId, long? subModuleId,long? fieldId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_SolgenRuleEngine_GetCustomField_PickList_Options",
                    new
                    {
                        COMPANY_ID = companyid,
                        MODULE_ID = moduleId,
                        SUB_MODULE_ID = subModuleId,
                        FIELD_ID = fieldId,
                        USER_ID = userid
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public List<MasterItems> GetSolgenModules(string masterName, Guid uid, long CompanyID, string masterKeyText = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();
                var masterKeytext = masterKeyText == "" ? string.Empty : masterKeyText;
                dataList = connection.Query<MasterItems>("sp_solgen_SolgenRuleEngine_GetModulesList",
                    new { CompanyID = CompanyID }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

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

        public string DeleteRule(string ruleid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_SolgenRuleEngine_Delete", new { RuleId = ruleid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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


        public string ChangeStatus(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var _status = connection.Query<string>("sp_solgen_SolgenRuleEngine_ActiveDeactiveRuleByID", new { RuleId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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


        public int GetDisplayOrder(int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                return connection.QuerySingleOrDefault<int>("Select isnull(max(DisplayOrder),0)+1 from tblSolgenRule where CompanyId=@companyId", param: parameters);
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

        public RuleEngineAddOrEditModel GetById(long id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataGrid= connection.QuerySingleOrDefault<RuleEngineAddOrEditModel>("sp_solgen_GetRuleEngineDetailsById",
                    param: new
                    {
                        Rule_Id = id                        
                    },
                    commandType: CommandType.StoredProcedure);

                return dataGrid;

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

        public PagedData GetList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetRuleEngineList",
                    param: new
                    {
                        name = name,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyID
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

        

           

        

        

       

        

       
        //Not Used
        public List<RuleTypeModel> GetRuleTypeList(long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                return connection.Query<RuleTypeModel>("sp_solgen_GetRuleTypeList", new { CompanyId = companyID}, commandType: System.Data.CommandType.StoredProcedure).ToList();

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


        public List<dynamic> GetSubModuleList(int moduleId,int companyId)
        {
            try
            {
                DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    connection.Open();
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("ModuleId", moduleId, System.Data.DbType.Int32);
                    parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                    return connection.Query("sp_solgen_SolgenRuleEngine_GetSubModulesList", commandType: System.Data.CommandType.StoredProcedure,param:parameters).ToList();

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
            catch (Exception)
            {

                throw;
            }
        }
        public PagedData GetRuleSummaryList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetRuleTrackingList",
                    param: new
                    {
                        Name = name,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyId
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

        public List<dynamic> GetRuleEngineVersionList(long ruleId, int companyId, Guid userId)
        {
            
                DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    connection.Open();
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("RuleId", ruleId, System.Data.DbType.Int64);
                    parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                    parameters.Add("UserId", userId, System.Data.DbType.Guid);
                    return connection.Query("sp_solgen_Get_Rule_Engine_Version_List", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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

        public List<dynamic> GetLoanApplicationRuleList(long loanApplicationId, string eventCode, int companyId, bool isHistoryDelete = false)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("loanApplicationId", loanApplicationId, System.Data.DbType.Int64);
                parameters.Add("eventCode", eventCode, System.Data.DbType.String);
                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                parameters.Add("IS_TRACK_ENTRY_DELETED", isHistoryDelete, System.Data.DbType.Boolean);
                return connection.Query("sp_solgen_GetLoanApplicationRuleList",
                    commandType: System.Data.CommandType.StoredProcedure,
                    commandTimeout: 0,
                    param: parameters
                    ).ToList();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<dynamic> GetLoanApplicationRuleTargetList(long ruleId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ruleId", ruleId, System.Data.DbType.Int64);
                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                return connection.Query("sp_solgen_GetLoanApplicationRuleTargetList",
                    commandType: System.Data.CommandType.StoredProcedure,
                    commandTimeout: 0,
                    param: parameters
                    ).ToList();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic ExecuteRuleEngineTarget(long ruleId, long ruleTrackingId, int companyId, long loanApplicationId, long targetId, string databaseCondition, string displayCondition, int ruleTypeId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("ruleId", ruleId, System.Data.DbType.Int64);
                parameters.Add("ruleTrackingId", ruleTrackingId, System.Data.DbType.Int64);
                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                parameters.Add("loanApplicationId", loanApplicationId, System.Data.DbType.Int64);
                parameters.Add("targetId", targetId, System.Data.DbType.Int64);
                parameters.Add("databaseCondition", databaseCondition, System.Data.DbType.String);
                parameters.Add("displayCondition", displayCondition, System.Data.DbType.String);
                parameters.Add("ruleTypeId", ruleTypeId, System.Data.DbType.Int32);
                return connection.QueryFirstOrDefault("sp_solgen_Execute_Rule_Engine_Target",
                    commandType: System.Data.CommandType.StoredProcedure,
                    commandTimeout: 0,
                    param: parameters
                    );
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic ExecuteRuleEngineApplicationStatus(long loanApplicationId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                
                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                parameters.Add("loanApplicationId", loanApplicationId, System.Data.DbType.Int64);
                
                return connection.QueryFirstOrDefault("sp_solgen_Execute_Rule_Engine_Application_Status",
                    commandType: System.Data.CommandType.StoredProcedure,
                    param: parameters
                    );
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

        

        public PagedData GetLoanApplicationListForApplyRule(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long ruleId, string listFor)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanApplicationListForApplyRule",
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
                    ruleId =ruleId,
                    listFor = listFor
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

        public bool ApplyRuleVersion(long ruleId, string loanApplicationIds, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                return connection.ExecuteScalar<int>("SP_SOLGEN_APPLY_RULE_VERSION",
               param: new
               {
                   RULE_ID = ruleId,
                   LOAN_APPLICATION_IDS = loanApplicationIds,
                   COMPANY_ID = companyId
               },
               commandType: CommandType.StoredProcedure) > 0;
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

        public List<dynamic> GetSolgenRuleEngineFormulasList(long companyId, int length, string searchText)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_Get_SolgenRuleEngineFormulas_List",
                    new
                    {
                        CompanyId = companyId,
                        Length = length,
                        SearchText = searchText
                    }, commandType: CommandType.StoredProcedure).ToList();
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
