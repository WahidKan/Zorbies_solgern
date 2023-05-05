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
    public class RuleEngineRepository : IRuleEngineRepository
    {
        private readonly SolgenDbContext _dbContext;
        public RuleEngineRepository(SolgenDbContext solgenDbContext)
        {
            _dbContext = solgenDbContext;
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

        public bool Save(string jsondata, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                return connection.ExecuteScalar<int>("sp_solgen_Save_Rule_Engine"
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

        public string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Rule_Engine_Get_Custom_Fields",
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
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_Check_Rule_Engine_Name_Exist"
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

        public PagedData GetRuleList(string name,long? loanProduct, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetRuleList",
                    param: new
                    {
                        Name = name,
                        LoanProduct=loanProduct,
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

        public async Task<string> GetRuleDetailById(Guid userid, long CompanyID, long ruleid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetRuleDetailById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        RuleId = ruleid
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

        public string DeleteRule(long ruleid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_deleteRule", new { RuleId = ruleid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public string ChangeStatus(long id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var _status = connection.Query<string>("sp_solgen_ActiveDeactiveRuleByID", new { RuleId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
                    return connection.Query("sp_solgen_GetSubModuleForRuleEngine", commandType: System.Data.CommandType.StoredProcedure,param:parameters).ToList();

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
                    return connection.Query("sp_solgen_GetSubModuleEventList", commandType: System.Data.CommandType.StoredProcedure,param:parameters).ToList();

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

        public dynamic ExecuteRuleEngineApplicationStatus(long loanApplicationId, int companyId,Guid userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                
                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                parameters.Add("loanApplicationId", loanApplicationId, System.Data.DbType.Int64);
                parameters.Add("UserId", userId);

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

        public int GetDisplayOrder(int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("companyId", companyId, System.Data.DbType.Int32);                
                return connection.QuerySingleOrDefault<int>("Select isnull(max(DisplayOrder),0)+1 from tblRule where CompanyId=@companyId",param: parameters);
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
    }
}
