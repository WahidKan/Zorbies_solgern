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

namespace Solgen.Repository.DocumentMakerRouteRule
{
    public class DocumentMakerRouteRuleRepository : IDocumentMakerRouteRuleRepository
    {
        private readonly SolgenDbContext _dbContext;
        public DocumentMakerRouteRuleRepository(SolgenDbContext solgenDbContext)
        {
            _dbContext = solgenDbContext;
        }

        public string CheckNameExist(string name, long? id, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@RuleId", id);
                parameters.Add("@name", name);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>(""
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
        public async Task<string> GetDocumentMakerRoutes(long routeId,long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_DocumentMaker_GetRouteById",
                    new
                    {
                        routeId,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
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
        public async Task<string> GetDocumentMakerRouteRules(long id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_DocumentMaker_GetRouteRuleById",
                    new
                    {
                        id,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
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
        public string Delete(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_DocumentMaker_DeleteRoute", new { id = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public List<dynamic> GetComparisionOperatorsList(string type)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetOperatorDropDownList",
                    new
                    {
                        Type = type,
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
        public async Task<long> AddNewFieldRuleData(int document_id, string name, string userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<long>("sp_DocumentMakerAddNewField",
                    new
                    {
                        document_id,
                        name,
                        userId
                    }, commandType: CommandType.StoredProcedure));
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
        public async Task<long> AddRouteRuleData(string data, string userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<long>("sp_DocumentMaker_SaveRoute",
                    new
                    {
                        data,
                        userId,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
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
        public async Task<long> UpdateRouteRuleData(string data, string userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<long>("sp_DocumentMaker_UpdateRoute",
                    new
                    {
                        data,
                        userId,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
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

        public List<dynamic> GetPlaceHolderFieldsList(string documentId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetDocumentMakerPlaceHolderDropDownList",
                    new
                    {
                        DocumentId = documentId,
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

        public PagedData GetList(string sortColumn, string sortDir, int pageIndex, int pageSize, string filter, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_DocumentMaker_RouteList",
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

        public List<dynamic> GetLogicalOperatorsList(string type)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetOperatorDropDownList",
                    new
                    {
                        Type = type,
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
                return connection.ExecuteScalar<int>(""
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

        public long VerifyDuplicateName(string routeName, long id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", id);
                parameters.Add("@name", routeName);
                parameters.Add("@CompanyID", companyId);
                return connection.ExecuteScalar<int>("sp_DocumentMaker_RouteRuleNameExist"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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
