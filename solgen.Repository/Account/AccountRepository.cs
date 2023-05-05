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
    public class AccountRepository : IAccountRepository
    {
        private readonly SolgenDbContext _dbContext;
        public AccountRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData> GetAccountOppoutunitiesList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)

        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountOppourtunity_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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
        public async Task<PagedData> GetAccountContractsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)

        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountsContract_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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
        public async Task<PagedData> GetAccountContactsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)

        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountContacts_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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
        public async Task<PagedData> GetAccountProposalsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)

        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountProposals_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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
        public async Task<PagedData> GetAccountWorkOrdersList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)

        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountWorkOrders_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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

        public async Task<PagedData> GetAccountServiceAppointmentsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountServiceAppointments_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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

        public async Task<PagedData> GetAccountsJurisdictionList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountJurisdiction_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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
        public async Task<PagedData> GetAccountsCommunicationList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AccountCoomunication_Listing",
                param: new
                {
                    CompanyId = companyId,
                    AccountId = accountId,
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
        public string GetSiteURl(string url)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string data = connection.Query<string>("sp_solgen_GetLoginSiteUrl",
                    new
                    {
                        url = url
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
        
        public string GetCompanyCount(string userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string data = connection.Query<string>("sp_solgen_GetUserCompanyMappingCount",
                    new
                    {
                        UserId = userid
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
        public IEnumerable<dynamic> GetRequiredCustomerFileList(string accountId, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetRequiredCustomerFileList",
                    new
                    {
                        accountId = accountId,
                        companyId = companyId
                    }
                   , commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        #region Jurisdiction Account 


       

        public string GetJurisdictionById(string id, string companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("Sp_Solgen_GetJurisdictionAccount_ById",
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
        public async Task<string> AddeditJurisdictionAccount(JurisdictionModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@JurisdictionId", (model.JurisdictionId));
                parameters.Add("@Type__c", (model.Type__c));
                parameters.Add("@Update__c", model.Update__c);
                parameters.Add("@Notes__c", model.Notes__c);
                parameters.Add("@AccountId", (model.Account));              
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.companyId);

                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddeditAccountJurisdiction"
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
        #endregion

        public IEnumerable<dynamic> GetFundingStageCityData(Guid userid, long CompanyID, long accountId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_GetFundingStageCityData",
                param: new
                {
                    UserId = userid,
                    CompanyID = CompanyID,
                    AccountId = accountId,

                },
                commandType: CommandType.StoredProcedure);

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


        public bool check_company_lisence_limit(int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<bool>("sp_check_company_lisence_limit",
                    new
                    {
                        companyId = companyId
                    }
                   , commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
                //return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

    }
}
