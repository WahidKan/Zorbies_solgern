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
using Newtonsoft.Json;
using Solgen.Core.Models;

namespace Solgen.Repository.DocumentMaker
{
   public class DocumentMakerRepository : IDocumentMakerRepository
    {
        private readonly SolgenDbContext _dbContext;

        public DocumentMakerRepository(SolgenDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public string AddEditDocumentMaker(string model, long companyId, string userId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@userID", userId);
                parameters.Add("@CompanyID", companyId);
                parameters.Add("@json", model);
                return connection.Query<string>("sp_DocumentMaker_AddOrUpdate", parameters,
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

        public string CheckDocumentMakerExist(string id, string name, string companyId, string userId)
        {
            throw new NotImplementedException();
        }

        public string DeleteDocumentMaker(string id, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.Query<string>("sp_DocumentMaker_DeleteById",
                   param: new
                   {
                       id = id,
                       UserId = userId,
                       CompanyId = companyId
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

        public string GetDocumentMakerById(string id, string companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_DocumentMaker_GetById",
                    new
                    {
                        Id = id,
                        CompanyId = companyId
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

        public PagedData GetDocumentMakerList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_DocumentMaker_GetList",
                   param: new
                   {
                       Filter = filter,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       CompanyId = companyId
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

        public List<dynamic> GetSubModuleList(int companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                return connection.Query("sp_DocumentMaker_GetSubModuleList", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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


        public List<dynamic> GetHtmlContentList(int companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("CompanyId", companyId, System.Data.DbType.Int32);
                return connection.Query("Sp_Solgen_GetHtmlContentListDataForDocument", commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();

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

        public async Task<string> GetDocumentDetailById(string documentId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_DocumentMaker_GetDocumentDetailById",
                    new
                    {
                        DocumentId = documentId
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


        public string GetDocumentFields(string documentId, long companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_DocumentMaker_GetDocument",
                    new
                    {
                        documentId,
                        companyId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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


       


        public string SavePlaceHolder(dynamic placeHolderList)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                var json = JsonConvert.SerializeObject(placeHolderList);
                var parameters = new DynamicParameters();
                parameters.Add("@json", json);

                var data = connection.Query<string>("sp_DocumentMaker_SavePlaceHolder", 
                    parameters,
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


        public long VerifyDuplicateName(string name, string id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", id);
                parameters.Add("@name", name);
                parameters.Add("@CompanyId", companyId);
                return connection.ExecuteScalar<int>("sp_DocumentMaker_NameExist"
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
