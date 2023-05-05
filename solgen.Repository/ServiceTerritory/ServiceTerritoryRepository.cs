using Dapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Solgen.Repository
{
     
    public class ServiceTerritoryRepository : IServiceTerritoryRepository
    {
        private readonly SolgenDbContext _dbContext;

        public ServiceTerritoryRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<string> GetServiceTerritoryById(string id, string moduleName, string submoduleName,string companyId, string userId)
        {
            //[dbo].[sp_solgen_Custom_LocationById]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_ServiceTerritoryById",
                    new
                    {
                        LocationId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

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

        public async Task<string> GetServiceTerritoryList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            //[dbo].[sp_solgen_Custom_Location_Listing]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_ServiceTerritory_Listing", param: new
                {
                    VIEWER_ID = userId,
                    COMPANY_ID = companyId,
                    SORT_BY = sortDir,
                    SORT_EXP = sortColumn,
                    PAGESIZE = pageSize,
                    PAGENUMBER = pageIndex,
                    SEARCH_CONDITION = nameSearch,
                    ModuleName = moduleName,
                    subModuleName = submoduleName,
                    view_port_id = custom_view_id
                }
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

        public string AddEditServiceTerritory(JsonModel model)
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
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditServiceTerritory_custom"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<PagedData> GetUserslistByServiceTerritoryId(long serviceTerritoryId,long companyId, string SortColumn, string SortDir, int PageNo, int PageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", serviceTerritoryId);
                parameters.Add("@companyId", companyId);
                parameters.Add("@SortColumn", SortColumn, DbType.String);
                parameters.Add("@SortDir", SortDir, DbType.String);
                parameters.Add("@PageNo", PageNo, DbType.Int32);
                parameters.Add("@PageSize", PageSize, DbType.Int32);
                var _result = await connection.QueryAsync("sp_solgen_GetUserslistByServiceTerritoryId", parameters, null, 30, System.Data.CommandType.StoredProcedure);
                var _data = new PagedData(_result, PageNo, PageSize);
                return _data;
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
