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
    public class ProductRepository : IProductRepository
    {

        private readonly SolgenDbContext _dbContext;

        public ProductRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<string> GetProductById(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_ProductListingById",
                    new
                    {
                        productId = id,
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
        public async Task<string> GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Product_Listing", param: new
                {
                    //NameSearch = nameSearch,
                    //SortDir = sortDir,
                    //SortColumn = sortColumn,
                    //PageNo = pageIndex,
                    //PageSize = pageSize,
                    //UserId = userId,
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

        public string AddEditProduct(JsonModel model)
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
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditProduct_custom"
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

        public PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
                connection.Open();
                var data = connection.Query("sp_solgen_GetPriceBookListforProduct", param: new
                {
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    productid = productid
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();
                return new PagedData(data, PageNo, PageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public async Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_ProductPriceBooks_Listing",
                param: new
                {
                    CompanyId = companyId,
                    ProductId = productId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, pageIndex, pageSize);
                return _data;
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

        public async Task<PagedData> GetProductCampaignsList( long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_ProductCampaign_Listing",
                param: new
                {
                    CompanyId = companyId,
                    ProductId = productId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, pageIndex, pageSize);
                return _data;
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
        public async Task<PagedData> GetProductRequiredList(string pNameAndNumber, string sortColumn, string sortDir, int page, int pageSize, DateTime? From, DateTime? To, int workTypeId,long companyId,string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (pNameAndNumber == "undefined" || pNameAndNumber == "null" || pNameAndNumber==null)
                {
                    pNameAndNumber = "";
                }
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_ProductRequired_Listing",
                param: new
                {
                    CompanyId = companyId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = page,
                    Search = pNameAndNumber
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, page, pageSize);
                return _data;
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

        public async Task<string> GetProductRequiredDetailById(string Id, string userId, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetProductRequiredById",
                    new
                    {
                        ProductRequiredId = Id,
                        userid = userId,
                        companyid = CompanyId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
