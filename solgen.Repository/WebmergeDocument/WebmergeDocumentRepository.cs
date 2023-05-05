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
    public class WebmergeDocumentRepository : IWebmergeDocumentRepository
    {
        private readonly SolgenDbContext _dbContext;
        public WebmergeDocumentRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetWebmergeDocument(long documentId, long companyId, string SignerBy)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = connection.Query<string>("sp_solgen_GetWebmergeDocument",
                    new
                    {
                        documentId,
                        companyId,
                        SignerBy
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetWebmergeDocuments(long bankId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetWebmergeDocuments",
                    new
                    {
                        bankId,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
                return string.Join("", data); ;
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

        public async Task<long> SaveWebmergeDocument(string documentName, string fileUrl, string documentType, string folderName, long bankId, Guid userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.ExecuteScalar<long>("sp_solgen_SaveWebmergeDocument",
                    new
                    {
                        documentName,
                        fileUrl,
                        documentType,
                        folderName,
                        bankId,
                        userId,
                        companyId
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

        public async Task<long> UpdateWebmergeDocument(string documentName, string fileUrl, Guid userId, long companyId, long documentId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.ExecuteScalar<long>("sp_solgen_UpdateWebmergeDocument",
                    new
                    {
                        documentName,
                        fileUrl,
                        documentId,
                        userId,
                        companyId
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
    }
}
