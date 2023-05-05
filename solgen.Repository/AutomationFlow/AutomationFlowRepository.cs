using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace Solgen.Repository.AutomationFlow
{
    public class AutomationFlowRepository : IAutomationFlowRepository
    {
        private readonly SolgenDbContext _dbContext;

        public AutomationFlowRepository(SolgenDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public PagedData GetAutomationFlowList(string sortDir, string sortColumn, int page, int pageSize,string userId ,int companyId,int submoduleid,string objectname)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_GetAutomationFlowList",
                   param: new
                   {
                       //Filter = filter,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       UserId=userId,
                       CompanyId = companyId,
                       //submoduleid= submoduleid,
                       objectname= objectname
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

        public string DeleteAutomationFlow(string id, int companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.Query<string>("sp_Solgen_AutomationFlowDeleteById",
                   param: new
                   {
                       id = id,
                       UserId = userId,
                       companyID = companyId
                   },
                   commandType: CommandType.StoredProcedure).FirstOrDefault();

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


        public List<dynamic> AutomationFlowQueryExecution(string SqlQuery, int subModuleId, string userId, int companyId,string operation,long refId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

//                var data = connection.Query<dynamic>("sp_Solgen_AutomationFlowQueryExecution_V1",
                var data = connection.Query<dynamic>("sp_Solgen_AutomationFlowQueryExecution",

                    param: new
                   {
                       SQL_QUERY = SqlQuery,
                       refId = refId,
                       company = companyId.ToString(),
                       subModuleId= subModuleId.ToString(),
                       USER_ID= userId,
                       operation= operation

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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        

        public bool AddEditAutomationFlow(string model, long companyId, string userId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@json", model);
                parameters.Add("@CompanyId", companyId);
                parameters.Add("@userID", userId);
                return connection.Query<bool>("sp_solgen_SaveAutomationFlow", parameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetAutomationFlowById(long id, string companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetAutomationFlowById",
                    new
                    {
                        id = id,
                        companyId = companyId
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

		public bool VerifyDuplicateFlowName(string name, int? id, long companyId)
		{
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", id);
                parameters.Add("@name", name);
                parameters.Add("@companyId", companyId);
                //parameters.Add("@result", direction: ParameterDirection.Output);
                return connection.ExecuteScalar<bool>("sp_Solgen_AutomationFlowCheckDuplicate", parameters, commandType: CommandType.StoredProcedure);
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
        
        public List<dynamic> GetAutomationFlowCustomFields(string companyId, string filter, int PageNo, string userId, int subModuleId)
		{
            DbConnection connection = _dbContext.Database.GetDbConnection();
			try
			{
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@COMPANY_ID", companyId);
                parameters.Add("@filter", filter);
                parameters.Add("@PageNo", PageNo);
                parameters.Add("@UserId", userId);
                parameters.Add("@subModuleId", subModuleId);
                //parameters.Add("@result", direction: ParameterDirection.Output);
                var result= connection.Query<dynamic>("sp_solgen_GetAutomationFlowCustomFields", parameters, commandType: CommandType.StoredProcedure).ToList();

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

        public List<dynamic> GetAutomationFlowSubFlow(string companyId, string serchText, int PageNo, string userId, int id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@companyId", companyId);
                parameters.Add("@serchText", serchText);
                parameters.Add("@length", PageNo);
                parameters.Add("@UserId", userId);
                parameters.Add("@id", id);
                //parameters.Add("@result", direction: ParameterDirection.Output);
                var result = connection.Query<dynamic>("sp_Solgen_AutomationFlowGetSubFlowDDL", parameters, commandType: CommandType.StoredProcedure).ToList();

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


        public List<dynamic> GetAutomationFlowCustomFieldsWithoutpaging(string companyId, string userId, int subModuleId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@COMPANY_ID", companyId);              
                parameters.Add("@UserId", userId);
                parameters.Add("@subModuleId", subModuleId);
                //parameters.Add("@result", direction: ParameterDirection.Output);
                var result = connection.Query<dynamic>("sp_solgen_GetAutomationFlowCustomFieldsWithOutPaging", parameters, commandType: CommandType.StoredProcedure).ToList();

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
        



        public List<dynamic> GetSubModuleList(int companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                return connection.Query("sp_GetSubModuleList_CreatedByCustomfields", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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
