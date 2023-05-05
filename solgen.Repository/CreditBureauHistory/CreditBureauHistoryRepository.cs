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
    public class CreditBureauHistoryRepository : ICreditBureauHistoryRepository
    {
        private readonly SolgenDbContext _dbContext;

        public CreditBureauHistoryRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData> GetHistoryByLoanApplicationId(long loanApplicationId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetCreditBureauHistoryListByLoanApplicationId",
                param: new
                {
                    loanApplicationId = loanApplicationId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId,
                    CompanyID = companyID
                },
                commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
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

        public async Task<long> Save(string trades, string employments, long loanApplicationId, long applicantId, string applicantType, long creditBureauId, long companyId, Guid userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@trades", trades, DbType.String);                
                parameters.Add("@employments", employments, DbType.String);                
                parameters.Add("@loanApplicationId", loanApplicationId, DbType.Int64);
                parameters.Add("@applicantId", applicantId, DbType.Int64);
                parameters.Add("@applicantType", applicantType, DbType.String);
                parameters.Add("@creditBureauId", creditBureauId, DbType.Int64);
                parameters.Add("@companyid", companyId, DbType.Int64);
                parameters.Add("@userid", userId, DbType.Guid);                

                connection.ExecuteScalar("[sp_solgen_AddEditLACreditBureauHistory]", parameters, commandType: CommandType.StoredProcedure);
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
    }
}
