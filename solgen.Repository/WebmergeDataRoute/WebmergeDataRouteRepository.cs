using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class WebmergeDataRouteRepository : IWebmergeDataRouteRepository
    {
        private readonly SolgenDbContext _dbContext;
        public WebmergeDataRouteRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetWebmergeDataRoute(long dataRouteId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetWebmergeDataRoute",
                    new
                    {
                        dataRouteId,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
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

        public async Task<string> GetWebmergeDataRouteRules(long dataRouteId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetWebmergeDataRouteRules",
                    new
                    {
                        dataRouteId,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
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

        public async Task<string> GetWebmergeDataRoutes(long bankId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetWebmergeDataRoutes",
                    new
                    {
                        bankId,
                        companyId
                    }, commandType: CommandType.StoredProcedure));
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

        public async Task<long> SaveWebmergeDataRoute(string data, long bankId, Guid userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<long>("sp_solgen_SaveWebmergeDataRoute",
                    new
                    {
                        data,
                        bankId,
                        userId,
                        companyId
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

        public async Task<long> UpdateWebmergeDataRoute(string data, Guid userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var result = await Task.FromResult(connection.ExecuteScalar<long>("sp_solgen_UpdateWebmergeDataRoute",
                    new
                    {
                        data,
                        userId,
                        companyId
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
    }
}
