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
    public class LoanTermRepository : ILoanTermRepository
    {

        private readonly SolgenDbContext _dbContext;
        public LoanTermRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public PagedData GetLoanTermList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
          DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
                connection.Open();
                var data = connection.Query("[sp_solgen_GetLoanTermList_1]", param: new
                {
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID
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
                          if(connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }
                
            }
        }
        public List<MasterItems> GetBankDll()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query<MasterItems>("[sp_solgen_BankDll]", commandType: CommandType.StoredProcedure).ToList();

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
        public Guid Save(LoanTermModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
              
               
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("id", model.id == Guid.Empty ? null : (Guid?)model.id, DbType.Guid);
                parameters.Add("Code", model.Code = string.IsNullOrEmpty(model.Code) ? null : model.Code, DbType.String);
                parameters.Add("Description", model.Description, DbType.String);
                parameters.Add("Term", model.Term, DbType.String);
                parameters.Add("Apr", model.Apr, DbType.String);
                parameters.Add("DealerFee", model.DealerFee, DbType.String);
                parameters.Add("LenderID", model.LenderID, DbType.Int64);
             
                return connection.ExecuteScalar<Guid>("[sp_solgen_SaveLoanTerm]", parameters, commandType: CommandType.StoredProcedure);

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
        public LoanTermModel GetLoanTermById(string Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var getloanbyid = connection.Query<LoanTermModel>("[sp_solgen_GetLoanTermbyid]", new { Id = Id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                //if(getMachineDetailById!= null)
                //{
                //    return getMachineDetailById.Fi    rstOrDefault();
                //}
                return getloanbyid;
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

        public int DeleteLoanTermById(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                 var data= connection.Query<int>("[sp_solgen_DeleteLoanTerm]", new { id = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
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
