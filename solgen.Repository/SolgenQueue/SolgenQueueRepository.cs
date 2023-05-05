using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.SolgenQueue
{
    public class SolgenQueueRepository : ISolgenQueueRepository
    {
        private readonly SolgenDbContext _dbContext;
        public SolgenQueueRepository(SolgenDbContext solgenDbContext)
        {
            _dbContext = solgenDbContext;
        }

        public PagedData GetQueueList(string filter, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_SolgenQueue_GetQueuesList",
                    param: new
                    {
                        Filter = filter,                      
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
        public async Task<string> GetQueueDetailById(Guid userid, long CompanyID, string queueid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_SolgenQueue_GetQueueById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        QueueId = queueid
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                //var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetQueueDetailById",
                //new
                //{
                //    CompanyId = 1004,
                //    UserId = userid,
                //    QueueId = 78
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
        public bool Save(string jsondata, string queueid, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@queueID", queueid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@CompanyID", companyId);
                return connection.ExecuteScalar<int>("sp_solgen_SolgenQueue_AddEditQueue"
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

        public string CheckQueueNameExist(string name, long? queueId, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@QueueId", queueId);
                parameters.Add("@name", name);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_SolgenQueue_CheckQueueNameExist"
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
                    return connection.Query("sp_solgen_SolgenQueue_GetSubModuleEventsList", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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
                var data = connection.Query<string>("sp_solgen_SolgenQueue_GetCustomFields",
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
        
        public string GetCustomFieldOptionsList(string companyid, string userid, long? moduleId, long? subModuleId, long? fieldId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_SolgenQueue_GetCustomField_PickList_Options",
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
                dataList = connection.Query<MasterItems>("sp_solgen_SolgenQueue_GetModulesList",
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

        public string DeleteQueue(string queueid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_SolgenQueue_Delete", new { QueueId = queueid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
                var _status = connection.Query<string>("sp_solgen_SolgenQueue_ActiveDeactiveQueueByID", new { QueueId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
                return connection.QuerySingleOrDefault<int>("Select isnull(max(DisplayOrder),0)+1 from tblSolgenQueue where CompanyId=@companyId", param: parameters);
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

        public PagedData GetList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetQueueList",
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

        public List<dynamic> GetSubModuleList(int companyId)
        {
            try
            {
                DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    connection.Open();
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                    return connection.Query("sp_solgen_SolgenQueue_GetSubModulesList", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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
        
        public PagedData GetQueueSummaryList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetQueueTrackingList",
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

        public List<dynamic> GetQueueVersionList(long queueId, int companyId, Guid userId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("QueueId", queueId, System.Data.DbType.Int64);
                parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                parameters.Add("UserId", userId, System.Data.DbType.Guid);
                return connection.Query("sp_solgen_Get_Queue__Version_List", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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

        public List<dynamic> GetLoanApplicationQueueList(long loanApplicationId, string eventCode, int companyId, bool isHistoryDelete = false)
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
                return connection.Query("sp_solgen_GetLoanApplicationQueueList",
                    commandType: System.Data.CommandType.StoredProcedure,
                    commandTimeout: 0,
                    param: parameters
                    ).ToList();
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

        public List<dynamic> GetLoanApplicationQueueTargetList(long queueId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("queueId", queueId, System.Data.DbType.Int64);
                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                return connection.Query("sp_solgen_GetLoanApplicationQueueTargetList",
                    commandType: System.Data.CommandType.StoredProcedure,
                    commandTimeout: 0,
                    param: parameters
                    ).ToList();
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
        
        public dynamic ExecuteQueueTarget(long queueId, long queueTrackingId, int companyId, long loanApplicationId, long targetId, string databaseCondition, string displayCondition, int queueTypeId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("queueId", queueId, System.Data.DbType.Int64);
                parameters.Add("queueTrackingId", queueTrackingId, System.Data.DbType.Int64);
                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                parameters.Add("loanApplicationId", loanApplicationId, System.Data.DbType.Int64);
                parameters.Add("targetId", targetId, System.Data.DbType.Int64);
                parameters.Add("databaseCondition", databaseCondition, System.Data.DbType.String);
                parameters.Add("displayCondition", displayCondition, System.Data.DbType.String);
                parameters.Add("queueTypeId", queueTypeId, System.Data.DbType.Int32);
                return connection.QueryFirstOrDefault("sp_solgen_Execute_Queue__Target",
                    commandType: System.Data.CommandType.StoredProcedure,
                    commandTimeout: 0,
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

        public dynamic ExecuteQueueApplicationStatus(long loanApplicationId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("companyId", companyId, System.Data.DbType.Int32);
                parameters.Add("loanApplicationId", loanApplicationId, System.Data.DbType.Int64);

                return connection.QueryFirstOrDefault("sp_solgen_Execute_Queue__Application_Status",
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

        public PagedData GetLoanApplicationListForApplyQueue(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long queueId, string listFor)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanApplicationListForApplyQueue",
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
                    queueId = queueId,
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

        public bool ApplyQueueVersion(long queueId, string loanApplicationIds, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                return connection.ExecuteScalar<int>("SP_SOLGEN_APPLY_RULE_VERSION",
               param: new
               {
                   RULE_ID = queueId,
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

        public List<dynamic> GetSolgenQueueFormulasList(long companyId, int length, string searchText)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_Get_SolgenQueueFormulas_List",
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

