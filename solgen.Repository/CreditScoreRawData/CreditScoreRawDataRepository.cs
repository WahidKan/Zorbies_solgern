using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class CreditScoreRawDataRepository : ICreditScoreRawDataRepository
    {
        private readonly SolgenDbContext _dbContext;

        public CreditScoreRawDataRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetRawData(long LoanApplicationId, string ApplicantType, long BureauId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LoanApplicationId", LoanApplicationId, DbType.Int64);
                parameters.Add("@ApplicantType", ApplicantType, DbType.String);
                parameters.Add("@CreditBureauId", BureauId, DbType.Int64);

                return connection.ExecuteScalar<string>("sp_solgen_GetCreditScoreRawData", parameters, commandType: CommandType.StoredProcedure);
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

        public async Task<long> Save(string CreditScoreRawDataModel)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@json", CreditScoreRawDataModel, DbType.String);

                return connection.ExecuteScalar<Int64>("[SOLGEN_SP_SAVE_CREDIT_SCORE_RAW_DATA]", parameters, commandType: CommandType.StoredProcedure);
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
    }
}
