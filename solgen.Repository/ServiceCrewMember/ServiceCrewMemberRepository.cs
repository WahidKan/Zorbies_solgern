using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
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
    public class ServiceCrewMemberRepository : IServiceCrewMemberRepository
    {

        private readonly SolgenDbContext _dbContext;

        public ServiceCrewMemberRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<string> GetServiceCrewMemberList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try 
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_ServiceCrewMember_Listing", param: new
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


        public async Task<PagedData> GetServiceCrewMemberListByServiceCrewId(string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_ServiceCrewMembers_Listing",
                    param: new
                    {
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageNo,
                        PageSize = pageSize,
                        CompanyID = companyId,
                        CrewId = crewId
                    },
                    commandType: CommandType.StoredProcedure);
                return new PagedData(dataList, pageNo, pageSize);
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
        public async Task<PagedData> GetServiceAppointmentListByServiceCrewId(string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_ServiceAppointment_Listing",
                    param: new
                    {
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageNo,
                        PageSize = pageSize,
                        CompanyID = companyId,
                        CrewId = crewId
                    },
                    commandType: CommandType.StoredProcedure);
                return new PagedData(dataList, pageNo, pageSize);
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
        public async Task<string> ManageServiceCrewMember(ServiceCrewMemberModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.CrewMemberId);
                parameters.Add("@CompanyId", model.companyId);
                parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                string data = await connection.QueryFirstOrDefaultAsync<string>("sp_solgen_AddEditservicecrewMember_custom"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);
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


        public async Task<string> GetServiceResourcesByServiceCrewId(long crewId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@crewId", crewId);
                string data = await connection.QueryFirstOrDefaultAsync<string>("sp_solgen_GetServiceResourcesByServiceCrewId"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);
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
        public async Task<PagedData> GetServiceCrewMembersWithResourceType(string searchtxt, string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetServiceCrewMembersWithResourceType",
                    param: new
                    {
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        SearchText = searchtxt,
                        PageNo = pageNo,
                        PageSize = pageSize,
                        CompanyID = companyId,
                        CrewId = crewId
                    },
                    commandType: CommandType.StoredProcedure);
                return new PagedData(dataList, pageNo, pageSize);
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

        public async Task<string> CheckResourceAvailability(ServiceResourceAvailabilityModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                DateTime datetime;
                var endDate = string.Empty;
                var startdate = string.Empty;
                if (DateTime.TryParse(model.EndDate, out datetime))
                    endDate = Convert.ToDateTime(model.EndDate).ToString("yyyy-MM-dd hh:mm:ss");

                if (DateTime.TryParse(model.StartDate, out datetime))
                    startdate = Convert.ToDateTime(model.StartDate).ToString("yyyy-MM-dd hh:mm:ss");


                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ServiceResourceId", model.ServiceResourceId);
                parameters.Add("@CrewMemberId", string.IsNullOrEmpty(model.CrewMemberId)?0:Convert.ToInt32(model.CrewMemberId));
                parameters.Add("@CompanyId", model.companyId);
                parameters.Add("@StartDate", startdate);
                parameters.Add("@EndDate", endDate);
                var result = await connection.ExecuteScalarAsync<string>("sp_solgen_CheckServiceResourceAvailaibility", parameters, commandType: CommandType.StoredProcedure);
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


        //public string AddEditProduct(JsonModel model)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("@Ids", model.Id);
        //        parameters.Add("@JSON", (model.FormJsonData));
        //        parameters.Add("@USER_ID", (model.userId));
        //        parameters.Add("@module_code", (model.ModuleCode));
        //        parameters.Add("@submodule_code", (model.SubModuleCode));
        //        parameters.Add("@companyId", (model.companyId));
        //        string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditProduct_custom"
        //                                                             , parameters, commandType: CommandType.StoredProcedure);

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

        //public PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
        //        connection.Open();
        //        var data = connection.Query("sp_solgen_GetPriceBookListforProduct", param: new
        //        {
        //            NameSearch = nameSearch,
        //            SortDir = SortDir,
        //            SortColumn = SortColumn,
        //            PageNo = PageNo,
        //            PageSize = PageSize,
        //            UserId = userId,
        //            CompanyID = companyID,
        //            productid= productid
        //        },
        //          commandType: System.Data.CommandType.StoredProcedure).ToList();
        //        return new PagedData(data, PageNo, PageSize);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        if (connection.State == System.Data.ConnectionState.Open)
        //        {
        //            connection.Close();
        //        }

        //    }
        //}

        //public async Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        var dataList = await connection.QueryAsync("sp_solgen_ProductPriceBooks_Listing",
        //        param: new
        //        {
        //            CompanyId = companyId,
        //            ProductId = productId,
        //            SortDir = sortDir,
        //            SortColumn = sortColumn,
        //            PageSize = pageSize,
        //            PageNo = pageIndex
        //        },
        //        commandType: CommandType.StoredProcedure);
        //        var _data = new PagedData(dataList, pageIndex, pageSize);
        //        return _data;
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

        //public async Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        var dataList = await connection.QueryAsync("sp_solgen_ProductCampaign_Listing",
        //        param: new
        //        {
        //            CompanyId = companyId,
        //            ProductId = productId,
        //            SortDir = sortDir,
        //            SortColumn = sortColumn,
        //            PageSize = pageSize,
        //            PageNo = pageIndex
        //        },
        //        commandType: CommandType.StoredProcedure);
        //        var _data = new PagedData(dataList, pageIndex, pageSize);
        //        return _data;
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

    }
}
