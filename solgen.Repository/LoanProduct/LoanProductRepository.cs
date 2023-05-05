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

namespace Solgen.Repository
{
    public class LoanProductRepository : ILoanProductRepository
    {
        private readonly SolgenDbContext _dbContext;
        public LoanProductRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<LoanProductModel> GetCreditBureauMaster(string userid, string companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<LoanProductModel>("sp_solgen_GetCreditBureauMasterList", new { userid = userid, CompanyID = companyid }, commandType: CommandType.StoredProcedure).ToList();

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
        public List<PrerequisiteLoanProductDocumentTypeModel> GetPrerequisiteLoanProductDocumentTypeNames(string userid, string companyid, string masterName)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<PrerequisiteLoanProductDocumentTypeModel>("sp_solgen_GetPrerequisiteLoanProductDocumentTypeList", new { userid = userid, CompanyID = companyid, masterName = masterName }, commandType: CommandType.StoredProcedure).ToList();

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
        public List<LoanProductDocumentTypeNamesModel> GetGetLoanProductDiscountCategoryNames(string userid, string companyid, string masterName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<LoanProductDocumentTypeNamesModel>("sp_solgen_GetLoanProductDiscountCategoryList", new { userid = userid, CompanyID = companyid, masterName = masterName }, commandType: CommandType.StoredProcedure).ToList();

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
        public List<LoanProductModel> GetCreditBureauMasterEdit(string userid, string companyid, string productId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<LoanProductModel>("sp_solgen_GetCreditBureauMasterEditList", new { userid = userid, CompanyID = companyid, productId = productId }, commandType: CommandType.StoredProcedure).ToList();

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
        public List<LoanProductPrerequisiteDocumentModel> GetPrerequisiteLoanProductEdit(string userid, string companyid, string productId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<LoanProductPrerequisiteDocumentModel>("sp_solgen_GetLoanProductPrerequisiteDocumentEditList", new { userid = userid, CompanyID = companyid, productId = productId }, commandType: CommandType.StoredProcedure).ToList();

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
        public List<LoanLoanProductDiscounCategoryModel> GetLoanProductDiscountCategoryEdit(string userid, string companyid, string productId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<LoanLoanProductDiscounCategoryModel>("sp_solgen_GetLoanProductDiscounCategoryEditList", new { userid = userid, CompanyID = companyid, productId = productId }, commandType: CommandType.StoredProcedure).ToList();

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
        public string AddUpdateLoanProduct(LoanApplicationProductModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.ProductId);
                parameters.Add("@JSON", (model.fieldsData));
                parameters.Add("@USER_ID", (model.CreatedBy));
                parameters.Add("@module_code", (model.ModuleName));
                parameters.Add("@submodule_code", (model.SubmoduleName));
                parameters.Add("@companyId", (model.companyId));
                parameters.Add("@applicableCB", (model.ApplicableCB));
                parameters.Add("@FieldsPrerequisiteLoan", (model.FieldsPrerequisiteLoan));
                parameters.Add("@LoanProductDiscountCategory", (model.LoanProductDiscountCategory));

                parameters.Add("@ImageFileName", (model.ImageFileName));
                parameters.Add("@BrochureFileName", (model.BrochureFileName));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditLoanProduct_custom"
                                                                     , parameters,commandTimeout:0
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

        public async Task<string> GetLoanProductlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_LoanProduct_Listing",
                    new
                    {
                        VIEWER_ID = userId,
                        COMPANY_ID = companyID,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SEARCH_CONDITION = name,
                        ModuleName = moduleName,
                        subModuleName = submoduleName,
                        view_port_id = custom_view_id

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

        public async Task<string> GetLoanProductById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLoanProuctById",
                    new
                    {
                        Id = id,
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

        public async Task<string> GetLoanProductDetailById(long? id, long CompanyID, long loanid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLoanDeatilsProuctById",
                    new
                    {
                        Id = id,
                        loanid = loanid,
                        CompanyId = CompanyID

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
        public Boolean DeleteRecords(string tableName, string primaryKey)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<Boolean>("sp_solgen_DeleteLoanProduct_Ids", new { primaryKey = primaryKey, tableName = tableName }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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

        public List<ComapanyModel> GetSolgenUser(string userid, string companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<ComapanyModel> dataList = new List<ComapanyModel>();
                connection.Open();
                dataList = connection.Query<ComapanyModel>("sp_solgen_GetCompanyNameDropDown", new { userid = userid, companyId = companyid }, commandType: System.Data.CommandType.StoredProcedure).ToList();

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
        public string UpdateLoanproductPresiteDocumentById(UpdatePresiteDocumentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentId", model.DocumentId);
                parameters.Add("@DocumentTypeId", model.DocumentTypeId);
                parameters.Add("@DocumentName", (model.DocumentName));
                parameters.Add("@ModifiedBy", (model.ModifiedBy));
                parameters.Add("@Mandatory", (model.Mandatory));
                parameters.Add("@Visibility", (model.Visibility));
                parameters.Add("@EmplymentTypes", (model.EmploymentType));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_UpdateLoanProductPrerequisiteDocument"
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

        public string SaveLoanproductPresiteDocument(PresiteDocumentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(model.LoanProductId))
                    model.LoanProductId = string.Empty;

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentId", model.DocumentId);
                parameters.Add("@LoanProductId", model.LoanProductId);
                parameters.Add("@DocumentName", model.DocumentName);
                parameters.Add("@CreatedBy", model.CreatedBy);
                parameters.Add("@Mandatory", model.Mandatory);
                parameters.Add("@Visibility", model.Visibility);
                parameters.Add("@CompanyId", model.CompanyId);
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditLoanProductPrerequisiteDocument"
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
        public string AddEditDiscountDocument(PresiteDocumentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentId", model.DocumentId);
                parameters.Add("@DocumentName", (model.DocumentName));
                parameters.Add("@CreatedBy", (model.CreatedBy));
                parameters.Add("@CompanyId", (model.CompanyId));
                parameters.Add("@Mendatory", (model.Mandatory));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditLoanLoanProductDiscountCategoryDocument"
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
        public string DeletePrerequisite(DeletePresiteDocumentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(model.LoanProductId))
                    model.LoanProductId = string.Empty;

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentId", model.DocumentId);
                parameters.Add("@LoanProductId", model.LoanProductId);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_DeleteLoanProductPrerequisiteDocument"
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
        public string DeleteDiscountCategory(PresiteDocumentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (model.DocumentName == "undefined")
                    model.DocumentName = string.Empty;
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentId", model.DocumentId);
                parameters.Add("@LoanProductId", (model.DocumentName));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_DeleteLoanProductDiscountCategoryDocument"
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
        public List<dynamic> GetLoanProductList(long companyId,string bankIds)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", companyId);
                parameters.Add("@BankIds", bankIds);
                return connection.Query("sp_solgen_LoadProductList", parameters, commandType: CommandType.StoredProcedure).ToList();
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

        public Int32 UpdateLoanPrerequisiteDocumentName(string documentName, long documentTypeId, string UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentName", documentName);
                parameters.Add("@DocumentTypeId", documentTypeId);
                parameters.Add("@UserId", UserId);
                var result = connection.ExecuteScalar<Int32>("sp_solgen_UpdateLoanPrerequisiteDocumentNameByDocumentTypeId", parameters, commandType: CommandType.StoredProcedure);
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

        public async Task<Int32> GetLoanProductPresiteDocumentByDocumentType(long CompanyId,long productId,string documentType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@productId", productId);
                parameters.Add("@CompanyId", CompanyId);
                parameters.Add("@DocumentType", documentType);
                var result = await connection.ExecuteScalarAsync<Int32>("sp_solgen_GetLoanProductPresiteDocumentByDocumentType", parameters, commandType: CommandType.StoredProcedure);
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


    }
}
