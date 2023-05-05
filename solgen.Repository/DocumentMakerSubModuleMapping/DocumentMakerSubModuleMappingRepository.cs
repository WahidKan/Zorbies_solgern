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

namespace Solgen.Repository.DocumentMakerSubModuleMapping
{
    public class DocumentMakerSubModuleMappingRepository : IDocumentMakerSubModuleMappingRepository
    {
        private readonly SolgenDbContext _dbContext;
        public DocumentMakerSubModuleMappingRepository(SolgenDbContext solgenDbContext)
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
        public List<dynamic> GetSubModuleList(string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetSubModuleList",
                    new
                    {
                        CompanyId = companyId,
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
        public List<dynamic> GetRoutesList(string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_RouteRuleListForDropdown",
                    new
                    {
                        CompanyId = companyId,
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

        public List<dynamic> GetDocumentList(string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetDocumentDropDownList",
                    new
                    {
                        CompanyId = companyId,
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

        public List<dynamic> GetHtmlTemListForddl(string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetDocumentHtmlList",
                    new
                    {
                        CompanyId = companyId,
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


        

        public List<dynamic> GetCustomFieldsList(string moduleId, string subModuleId, string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetCustomFields",
                    new
                    {
                        ModuleId = moduleId,
                        SubModuleId = subModuleId,
                        CompanyId = companyId,
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
        public List<dynamic> GetRouteDocumentList(string routeId, string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetRouteDocumentAndFields",
                    new
                    {
                        id = routeId,
                        CompanyId = companyId,
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
        public List<dynamic> GetMappingFieldsList(string input, string companyId)
        {

            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetDocumentFields",
                    new
                    {
                        ids = input,
                        CompanyId = companyId,
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


        public List<dynamic> GetHtmlMappingFieldsList(string input, string companyId)
        {

            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetHTMLTempFields",
                    new
                    {
                        ids = input,
                        CompanyId = companyId,
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

        
        public dynamic GetDocumentMappingById(string id, string companyId)
        {

            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMaker_GetSubModuleMappingById",
                    new
                    {
                        Id = id,
                        CompanyId = companyId,
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

        public string Delete(string id)
{
    DbConnection connection = _dbContext.Database.GetDbConnection();
    try
    {
        connection.Open();
        var _status = connection.Query<string>("sp_DocumentMaker_DeleteSubModuleMapping", new { id = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public PagedData GetList(string sortColumn, string sortDir, int pageIndex, int pageSize, string filter, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_DocumentMaker_SubModuleMappingList",
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

        public bool Save(string jsondata, string userid, long companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userid);
                parameters.Add("@data", jsondata);
                parameters.Add("@CompanyId", companyId);
                return connection.ExecuteScalar<int>("sp_DocumentMaker_AddEditSubModuleMapping", parameters, commandType: CommandType.StoredProcedure) > 0;

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
        public List<dynamic> GetDocumentMappingFieldsbyid(int id, long companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_tblDocumentMakerSubModuleMappingDocsFields_GetList",
                    new
                    {
                        id = id,
                       CompanyID = companyId
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


       

        public string AddEditSubModuleMappingDelivery(dynamic entity , string userId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@Id", entity.id.Value > 0 ? Convert.ToInt64(entity.id.Value) : null);
                parameters.Add("@DocumentMakerMappingId",  !string.IsNullOrWhiteSpace(entity.documentMakerMappingId?.Value)  ?  Convert.ToInt32(entity.documentMakerMappingId.Value) : 0 );
                //parameters.Add("@IsEmail", entity.sendingType.Value ==true || entity.sendingType.Value == "true" ? Convert.ToInt16(entity.sendingType.Value) : 0 );
                //parameters.Add("@IsSignNow", entity.sendingTypeSignNow.Value == true || entity.sendingTypeSignNow.Value == "true" ? Convert.ToInt16(entity.sendingTypeSignNow.Value) : 0);

                parameters.Add("@IsEmail", Convert.ToInt16(entity.sendingType.Value));
                parameters.Add("@IsSignNow", Convert.ToInt16(entity.sendingTypeSignNow.Value));
                parameters.Add("@SendToOption", entity.sendToOption.Value);
                parameters.Add("@SendToEmail", !string.IsNullOrWhiteSpace(entity.sendToEmail?.Value) ? Convert.ToString(entity.sendToEmail.Value) : null);
                parameters.Add("@FromToOption", entity.fromToOption.Value);
                parameters.Add("@FromToEmail", !string.IsNullOrWhiteSpace(entity.fromToEmail?.Value) ? Convert.ToString(entity.fromToEmail.Value) : null);
                parameters.Add("@Subject", !string.IsNullOrWhiteSpace(entity.subject?.Value) ? Convert.ToString(entity.subject.Value) : null);
                parameters.Add("@Body", !string.IsNullOrWhiteSpace(entity.body?.Value) ? Convert.ToString(entity.body.Value) : String.Empty);
                parameters.Add("@StatusId", !string.IsNullOrWhiteSpace(entity.statusId?.Value) ? Convert.ToInt64(entity.statusId.Value) : null);
                parameters.Add("@Signer1Email", !string.IsNullOrWhiteSpace(entity.signer1Email?.Value) ? Convert.ToString(entity.signer1Email.Value) : null);
                parameters.Add("@Signer1Option", entity.signer1Option.Value);
                parameters.Add("@Signer2Email", !string.IsNullOrWhiteSpace(entity.signer2Email?.Value) ? Convert.ToString(entity.signer2Email.Value) : null);
                parameters.Add("@Signer2Option", entity.signer2Option.Value);
                parameters.Add("@CCEmail", !string.IsNullOrWhiteSpace(entity.ccEmail?.Value) ? Convert.ToString(entity.ccEmail.Value) : null);
                parameters.Add("@CCEmailOption", entity.ccEmailOption.Value);
                parameters.Add("@UserID", userId);               
                return connection.Query<string>("sp_DocumentMaker_AddEditSubModuleMappingDelivery", parameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return null;

            }
            catch (Exception ex)
            {
                return "400";
                throw new Exception(ex.Message);
                
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public async Task<dynamic> GetSubModuleMappingDeliveryById(long Id ,long DocumentMakerMappingId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<dynamic>("sp_DocumentMaker_GetSubModuleMappingDelivery",
                    new
                    {
                        Ids = Id,
                        DocumentMakerMappingId = DocumentMakerMappingId
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
                return connection.ExecuteScalar<int>("sp_DocumentMaker_MappingNameExist"
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
