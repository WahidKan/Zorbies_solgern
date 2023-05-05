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
    public class LoanDocumentHistoryRepository: ILoanDocumentHistoryRepository
    {
        private readonly SolgenDbContext _dbContext;
        public LoanDocumentHistoryRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<long> AddNewLoanDocumentHistory(long loanApplicationId,string fileName,string fileUrl, string documentId, string documentStatus, long companyId, string SourceType, string DocumentType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            
            long _result = await connection.ExecuteScalarAsync<Int32>("sp_solgen_AddNewLoanDocumentHistory", param: new {
                LoanApplicationId = loanApplicationId,
                FileUrl = fileUrl,
                FileName = fileName,
                documentId = documentId,
                documentStatus = documentStatus,
                companyId = companyId,
                sourceType = SourceType,
                documentType = DocumentType
            }, null, 30, System.Data.CommandType.StoredProcedure);
            return _result;
        }

        public async Task<PagedData> GetLoanDocumentHistoryList(long loanApplicationId, string SortColumn, string SortDir, int PageNo, int PageSize, Guid UserId, long CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@LoanApplicationId", loanApplicationId);
            parameters.Add("@SortColumn", SortColumn);
            parameters.Add("@SortDir", SortDir);
            parameters.Add("@PageNo", PageNo);
            parameters.Add("@PageSize", PageSize);
            parameters.Add("@UserId", UserId);
            parameters.Add("@CompanyId", CompanyId);



            var _result = await connection.QueryAsync("sp_solgen_GetLoanDocumentHistory", parameters, null, 30, System.Data.CommandType.StoredProcedure);
            var _data = new PagedData(_result, PageNo, PageSize);
            return _data;
        }

        public async Task<IEnumerable<LoanDocummentHistoryModel>> GetLoanDocumentHistory(long loanApplicationId, bool Isvoid)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@LoanApplicationId", loanApplicationId, DbType.Int64);
            parameters.Add("@Isvoid", Isvoid, DbType.Boolean);
            var _result = await connection.QueryAsync<LoanDocummentHistoryModel>("sp_solgen_GetLoanDocumentHistoryByLoanApplicationId", parameters, null, 30, System.Data.CommandType.StoredProcedure);
            return _result;
        }

        public LoanDocummentHistoryModel GetLoanDocumentHistory_Status(long loanApplicationId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                LoanDocummentHistoryModel data = connection.Query<LoanDocummentHistoryModel>("sp_solgen_GetLoanDocumentHistory_Status", new { LoanApplicationId = loanApplicationId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public async Task<int> VoidDocuments(long LoanApplicationId, bool resend, Guid UserId, string docId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            int _result = await connection.ExecuteScalarAsync<Int32>("sp_solgen_VoidDocuments", param: new
            {
                LoanApplicationId = LoanApplicationId,
                resend = resend,
                UserId= UserId,
                docId= docId
            }, null, 30, System.Data.CommandType.StoredProcedure);
            return _result;
        }

        public async Task<long> UpdateLoanDocumentManual(string fileUrl, string documentStatus, long historyId, bool isMediaServer)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<long>("sp_solgen_UpdateLoanDocumentHistoryManual",
                    new
                    {
                        fileUrl = fileUrl,
                        documentStatus = documentStatus,
                        historyId = historyId,
                        isMediaServer= isMediaServer
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

        public async Task<int> VoidChangeOrderDocument(long LoanApplicationId, long ChangeOrderDocumentId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            int _result = await connection.ExecuteScalarAsync<Int32>("sp_solgen_VoidChangeOrderDocument", param: new
            {
                LoanApplicationId = LoanApplicationId,
                ChangeOrderDocumentId = ChangeOrderDocumentId
            }, null, 30, System.Data.CommandType.StoredProcedure);
            return _result;
        }
    }
}
