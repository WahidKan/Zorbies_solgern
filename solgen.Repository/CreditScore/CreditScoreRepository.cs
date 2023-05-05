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
    public class CreditScoreRepository : ICreditScoreRepository
    {
        private readonly SolgenDbContext _dbContext;

        public CreditScoreRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetCreditScoreByLoanAppicationId(long LoanApplicationId, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetCreditScoreByLoanApplicationId",
                    new
                    {
                        CompanyId = CompanyID,
                        LoanApplicationId = LoanApplicationId

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

        public async Task<string> Save(string CreditScoreModel, Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("SOLGEN_SP_SAVE_CREDIT_SCORE",
                    new
                    {
                        userId = userid,
                        companyid = companyid,
                        json = CreditScoreModel

                    },commandTimeout:0, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
        public async Task<string> GetTestCreditScoreBySSN(long ssn, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_Zolar_loanApplication_PullTestCreditScoreData",
                    new
                    {
                        companyId = companyid,
                        ssn = ssn

                    }, commandTimeout: 0, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
