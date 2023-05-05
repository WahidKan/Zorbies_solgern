using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;

namespace Solgen.Repository.FileConfiguration
{
    public class FileConfigurationRepository : IFileConfigurationRepository
    {
        private readonly SolgenDbContext _dbContext;

        public FileConfigurationRepository(SolgenDbContext solgenDbContext)
        {
            _dbContext = solgenDbContext;
        }
        public List<dynamic> GetFileExtensionList(long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_FileConfiguration_FileTypeExtension",
                    new
                    {
                        CompanyId = companyId,
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
        public List<dynamic> GetFileConfigurationList(long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("SP_FileConfiguration_GetAddEditConfigurationList",
                    new
                    {
                        CompanyId = companyId,
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
        public bool Save(string jsondata, string userid, long companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userid);
                parameters.Add("@data", jsondata);
                parameters.Add("@CompanyId", companyId);
                return connection.ExecuteScalar<int>("SP_FileConfiguration_AddEditFileTypeExtensionConfiguration", parameters, commandType: CommandType.StoredProcedure) > 0;

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
