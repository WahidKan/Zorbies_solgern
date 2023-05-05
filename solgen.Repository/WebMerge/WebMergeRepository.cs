using Dapper;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class WebMergeRepository :IWebMergeRepository
    {
        private readonly SolgenDbContext _dbContext;
        public WebMergeRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
            /*! 
      * \brief   Get the dynamic fields with value
      * \author  Prince Singh 
      * \date    31 oct 2019
      * \version 1.0    
      */
        public async Task<string> GetFieldsWithValue(int LoanApplicationId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var JsonString = await connection.ExecuteScalarAsync<string>("sp_solgen_Custom_Get_all_form_Fields_Dynamic_FormStack", param:new{
                   MODULE_NAME= "finance",
                   SUB_MODULE_CODE= "LoanApplicationInfo,LoanApplicationInstallationProperty,LoanApplicationApplicant,LoanApplicationCoapplicant,LoanApplicationProductInfo,Loan ApplicationPaymentInfo,LoanApplicationNTP,LoanApplicationReleaseFunds,LoanApplicationCreditScore,CRMAccount,LoanApplicationChangeOrder",
                   PRIMARY_KEY_VALUE = LoanApplicationId,
                    COMPANY_ID = companyId
                }, commandType: CommandType.StoredProcedure);

                return JsonString;
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

        public async Task<string> GetFields(long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var JsonString = await connection.ExecuteScalarAsync<string>("sp_solgen_Custom_Get_all_form_Fields_Dynamic_FormStack", param: new
                {
                    MODULE_NAME = "finance",
                    SUB_MODULE_CODE = "LoanApplicationInfo,LoanApplicationInstallationProperty,LoanApplicationApplicant,LoanApplicationCoapplicant,LoanApplicationProductInfo,LoanApplicationPaymentInfo,LoanApplicationNTP,LoanApplicationReleaseFunds,LoanApplicationCreditScore,CRMAccount,LoanApplicationChangeOrder",
                    COMPANY_ID = companyId
                }, commandType: CommandType.StoredProcedure);

                return JsonString;
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
        public async Task<string> GetFields(long companyId,string module, int? formmasterid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var JsonString = await connection.ExecuteScalarAsync<string>("sp_solgen_Custom_Get_all_form_Fields_Dynamic_FormStack_v1", param: new
                {
                    MODULE_NAME = module,
                    SUB_MODULE_CODE = formmasterid,
                    COMPANY_ID = companyId
                }, commandType: CommandType.StoredProcedure);

                return JsonString;
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

        public async Task<string> GetLoanDocMapping(int bankId,long webMergeMappingId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var JsonString = await connection.ExecuteScalarAsync<string>("sp_solgen_Custom_Get_all_form_Fields_mapping_by_LoanApplicationId", param: new
                {
                    WEBMERGEMAPPINGID = webMergeMappingId,
                    BANKID = bankId
                }, commandType: CommandType.StoredProcedure);

                return JsonString;
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

        public async Task<long> SaveWebmergeMapping(long mappingId, string mappingName, int webmergeObjectId, string webmergeObjectType, string data, long bankId, long companyId, Guid userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@mappingId", mappingId, DbType.String);
                parameters.Add("@mappingName", mappingName, DbType.String);
                parameters.Add("@webmergeObjectId", webmergeObjectId, DbType.Int32);
                parameters.Add("@webmergeObjectType", webmergeObjectType, DbType.String);
                parameters.Add("@data", data, DbType.String);
                parameters.Add("@bankId", bankId, DbType.Int64);
                //parameters.Add("@formstackDocumentId", formstackDocumentId, DbType.Int64);
                parameters.Add("@companyid", companyId, DbType.Int64);
                parameters.Add("@userid", userId, DbType.Guid);

                connection.ExecuteScalar("[sp_solgen_SaveFormstackDocumentMappings]", parameters, commandType: CommandType.StoredProcedure);
                return 1;
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
            return 0;
        }

        public async Task<string> GetFormstackDocumentMappings(long bankId, long webmergeMappingId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetFormstackDocumentMappings",
                    new
                    {
                        webmergeMappingId = webmergeMappingId,
                        companyid = companyId
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

        public async Task<long> GetBankIdByLoanApplicationId(long loanApplicationId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.ExecuteScalar<long>("sp_solgen_GetBankIdByLoanApplicationId",
                    new
                    {
                        loanApplicationId = loanApplicationId
                    }, commandType: CommandType.StoredProcedure));
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

        public async Task<PagedData> GetWebmergeMappingList(long bankId, long companyId, string SortColumn, string SortDir, int PageNo, int PageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@bankId", bankId, DbType.Int64);
            parameters.Add("@companyId", companyId, DbType.Int64);
            parameters.Add("@SortColumn", SortColumn, DbType.String);
            parameters.Add("@SortDir", SortDir, DbType.String);
            parameters.Add("@PageNo", PageNo, DbType.Int32);
            parameters.Add("@PageSize", PageSize, DbType.Int32);

            var _result = await connection.QueryAsync("sp_solgen_GetWebmergeMappings", parameters, null, 30, System.Data.CommandType.StoredProcedure);
            var _data = new PagedData(_result, PageNo, PageSize);
            return _data;
        }

        public async Task<string> GetWebmergeMapping(long webMergeMappingId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetWebMergeMappingDetailsByMappingId",
                    new
                    {
                        MappingId = webMergeMappingId,
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

        public async Task<string> GetDefaultWebmergeMapping(long bankId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetWebMergeDefaultMappingDetailsByBankId",
                    new
                    {
                        BankId = bankId,
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

        public async Task<long> SetDefaultWebmergeMapping(long webmergeMappingId, long bankId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.ExecuteScalar<long>("sp_solgen_SetDefaultWebMergeMappingForBank",
                    new
                    {
                        MappingId = webmergeMappingId,
                        BankId = bankId
                    }, commandType: CommandType.StoredProcedure));
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

        public async Task<string> UpdateStatusScheduler(string data)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<string>("sp_solgen_UpdateLoanDocumentHistory",
                    new
                    {
                        data = data
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

        public async Task<string> GetLoanDocumentHistoryByStatus(string status)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLoanDocumentHistoryByStatus",
                    new
                    {
                        documentStatus = status,
                    }, commandType: CommandType.StoredProcedure));//.FirstOrDefault());
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

        public async Task<string> GetCompanyAdminByAppId(string LoanApplicationId, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetCompanyAdminByAppId",
                    new
                    {
                        LoanApplicationId = LoanApplicationId,
                        CompanyID = CompanyId
                    }, commandType: CommandType.StoredProcedure));//.FirstOrDefault());
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

        public string SaveSignowEmailNotifications(dynamic emaildata, string emailSubject, string emailubjectBody, long LoanApplicationId, long CompanyId)
        {
            
             
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Emaildata", emaildata);
                parameters.Add("@EmailSubject", emailSubject);
                parameters.Add("@EmailubjectBody", emailubjectBody);
                parameters.Add("@LoanApplicationId", LoanApplicationId);
                parameters.Add("@CompanyId", CompanyId);

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_SaveSignowEmailNotifications", parameters, commandTimeout: 0, commandType: CommandType.StoredProcedure);
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


        public List<dynamic> GetUsersForEmailNotification()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetEmailNotificationusers",
                    new
                    {

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

        public string GetSignerName(long CompanyId)
        {


            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", CompanyId);

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_GetSignerName", parameters, commandTimeout: 0, commandType: CommandType.StoredProcedure);
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
