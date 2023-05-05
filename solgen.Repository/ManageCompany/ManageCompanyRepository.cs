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

namespace Solgen.Repository
{
    public class ManageCompanyRepository : IManageCompanyRepository
    {
        private readonly SolgenDbContext _dbContext;
        public ManageCompanyRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        public PagedData GetCompanyList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (string.IsNullOrEmpty(name) || name == "undefined") { name = string.Empty; }
                var dataList = connection.Query("sp_solgen_GetCompanyList",
                    param: new
                    {
                        NameSearch = name,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = page,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyID
                    },
                    commandType: CommandType.StoredProcedure).ToList();
                var DATAA = dataList;
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
        public PagedData GetPriceBookList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (string.IsNullOrEmpty(name) || name == "undefined") { name = string.Empty; }
                var dataList = connection.Query("sp_solgen_GetPriceBookList",
                    param: new
                    {
                        PriceBook = name,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = page,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyID
                    },
                    commandType: CommandType.StoredProcedure).ToList();
                var DATAA = dataList;
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
        public int  DeleteCompanys(string companyIds)
        {
            string data = companyIds.Replace("undefined", "");
            var dataFinal = data.Remove(data.Length - 1, 1);
            var CompanyIDs = string.Join(",", data);

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<int>("[sp_Solgen_DeleteMultipleCompany]", new { companyIds = CompanyIDs }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        public List<TblCompanyModule> GetCompanyModule(long? userTypeId, Guid? userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                List<TblCompanyModule> dataList = new List<TblCompanyModule>();

                connection.Open();
                dataList = connection.Query<TblCompanyModule>("sp_solgen_GetCompanyModule", new { UserTypeId = userTypeId, UserId = userid }, commandType: CommandType.StoredProcedure).ToList();
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
        public string DeleteBookPrice(string userid, long CompanyID, string dataFinal)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<string>("[sp_Solgen_DeleteMultipleOrSingleBookPrice]", new { companyId = CompanyID,ids= dataFinal }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        public string addOrUpdatePriceBook(PriceBookModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //var data = 0;
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", model.CompanyId);
                parameters.Add("@Fields", model.fieldsData);
                parameters.Add("@UserId", model.CreatedBy);
                parameters.Add("@PriceBookID", model.PriceBookID);
                
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdatePriceBook", parameters, commandType: System.Data.CommandType.StoredProcedure);
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

        public string GetPriceBookById(string id, string CompanyID, string User_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                //var data = 0;
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", id);
                parameters.Add("@userId", User_id);
                parameters.Add("@CompanyId", CompanyID);
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_GetPricebookById", parameters, commandType: System.Data.CommandType.StoredProcedure);
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

        public PagedData GetAssociateProductList(long priceBookId, long opportunityId, long companyID, long submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined" || nameSearch=="null") { nameSearch = string.Empty; }
                var dataList = connection.Query("sp_solgen_GetPriceBookForProductMasterList",
                    param: new
                    {
                        nameSearch = nameSearch,
                        SortDir = SortDir,
                        SortColumn = SortColumn,
                        PageNo = PageNo,
                        PageSize = PageSize,
                        UserId = userId,
                        CompanyID = companyID,
                        priceBookId= priceBookId
                    },
                    commandType: CommandType.StoredProcedure).ToList();
                var DATAA = dataList;
                return new PagedData(dataList, PageNo, PageSize);
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
        public string AddUpdateLineItem(PriceBookModelForProductItem model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", model.userId);
                parameters.Add("@Fields", (model.Fields));
                parameters.Add("@CompanyId", (model.CompanyId));
                parameters.Add("@PriceBookId", (model.PriceBookId));
                parameters.Add("@lineItemId", (model.lineItemId));
                parameters.Add("@OpprotunityId", (model.opportunityId == "undefined" ? "1002" : model.opportunityId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdatePriceBookForProductOfLineItem"
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
        public List<dynamic> GetAssociateDocumentList(string userid, string companyid, string priceBookId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetAssociateProductListForBookPrice",
                    param: new
                    {
                        userid = userid,
                        companyid = companyid,
                        priceBookId = priceBookId,
                    },
                    commandType: CommandType.StoredProcedure).ToList();
                var DATAA = dataList;
                return DATAA;
               // return new PagedData(dataList, PageNo, PageSize);
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
        public  string DeleteAssociateProduct(string userid, string CompanyID, string pricemapId, string priceBookId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<string>("sp_solgen_DeletePriceBookProductsById", new { companyId = CompanyID, pricemapId = pricemapId, priceBookId= priceBookId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
    }
}
