using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace Solgen.Repository.RuleEngineFormula
{
   public class RuleEngineFormulaRepository : IRuleEngineFormulaRepository
    {
        private readonly SolgenDbContext _dbContext;

        public RuleEngineFormulaRepository(SolgenDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public bool AddRuleEngineFormula(string id, string json, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.ExecuteScalar<int>("sp_solgen_AddEditRuleEngineFormula",
                   param: new
                   {
                       Id = id,
                       Json = json,
                       UserId = userId,
                       CompanyId = companyId
                   },
                   commandType: CommandType.StoredProcedure) > 0;

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

        public string CheckRuleEngineFormulaExist(string id, string name, string companyId, string userId)
        {
            throw new NotImplementedException();
        }

        public string DeleteRuleEngineFormula(string id, string companyId, string userId)
        {
            throw new NotImplementedException();
        }

        public string GetRuleEngineFormulaById(string id, string companyId, string userId)
        {
            throw new NotImplementedException();
        }

        public PagedData GetRuleEngineFormulaList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_GetruleEngineFormulasList",
                   param: new
                   {
                       Filter = filter,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = page,
                       PageSize = pageSize,
                       CompanyId = companyId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

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
    }
}
