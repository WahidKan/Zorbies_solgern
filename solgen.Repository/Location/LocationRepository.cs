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
namespace Solgen.Repository
{
     
    public class LocationRepository : ILocationRepository
    {
        private readonly SolgenDbContext _dbContext;

        public LocationRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<string> GetLocationById(string id, string moduleName, string submoduleName, string companyId, string userId)
        {
            //[dbo].[sp_solgen_Custom_LocationById]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_LocationById",
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
        public async Task<bool> CheckServiceTerritory(string id, string companyId, string userId)
        {
            //[dbo].[sp_solgen_Custom_LocationById]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<bool>("sp_zolar_LocationStatusCheck",
                    new
                    {
                        LocationId = id,
                        CompanyId=companyId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }

        public async Task<string> GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            //[dbo].[sp_solgen_Custom_Location_Listing]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Location_Listing", param: new
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

        public string AddEditLocation(JsonModel model)
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
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditLocation_custom"
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

        public string CheckLocationNameExist(string LocationName, long? ID, string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@ID", ID);
                parameters.Add("@LocationName", LocationName);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_CheckLocationNameExist"
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

        public async Task<string> CheckLocationAssigned(long LocationId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_CheckIsLoctaionAssigned",
                    new
                    {
                        LocationId = LocationId
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


    }
}
