using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.MasterValues
{
    public class MasterValuesRepository : IMasterValuesRepository
    {
        private readonly SolgenDbContext _context;
        public MasterValuesRepository(SolgenDbContext context)
        {
            _context = context;
        }
        public async Task<string> AddEdit(string userId, long companyId, string json)
        {
            var connection = _context.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = connection.Query<string>("sp_zolar_masterValues_addEditMasterValue",
                    param: new
                    {
                        userId = userId,
                        companyId = companyId,
                        json = json
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public async Task<string> Delete(string id, string companyId, string userId)
        {
            var connection = _context.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = connection.Query<string>("",
                    param: new
                    {
                        id = id,
                        companyId = companyId,
                        userId = userId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public async Task<string> GetById(string id, string companyId, string userId)
        {
            var connection = _context.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = connection.Query<string>("",
                    param: new
                    {
                        id = id,
                        companyId = companyId,
                        userId = userId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public async Task<PagedData> GetList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            var connection = _context.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();

                var dataList = connection.Query("",
                   param: new
                   {
                       filter = filter,
                       sortDir = sortDir,
                       sortColumn = sortColumn,
                       pageNo = page,
                       pageSize = pageSize,
                       companyId = companyId
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
        public async Task<List<dynamic>> GetModuleList(string userId, long companyId)
        {
            var connection = _context.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = connection.Query<dynamic>("sp_zolar_masterValues_getModulesList",
                    param: new
                    {
                        userId = userId,
                        companyId = companyId
                    }, commandType: CommandType.StoredProcedure).ToList();
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
        public async Task<List<dynamic>> GetSelectTypeCustomFields(long moduleId, long subModuleId, long companyId)
        {
            var connection = _context.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                var data = connection.Query<dynamic>("sp_zolar_masterValues_getCustomfieldForSelect", 
                    param : new {
                        moduleId = moduleId,
                        companyId = companyId,
                        subModuleId = subModuleId 
                    }, commandType: CommandType.StoredProcedure).ToList();
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
        public async Task<dynamic> GetDDLValues(long moduleId, long subModuleId, long fieldId, string userId, long companyId)
        {
            var connection = _context.Database.GetDbConnection();
            try
            {
                await connection.OpenAsync();
                dynamic obj = new ExpandoObject();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@moduleId", moduleId);
                parameters.Add("@subModuleId", subModuleId);
                parameters.Add("@fieldId", fieldId);
                parameters.Add("@userId", userId);
                parameters.Add("@companyId", companyId);
                using (var multi = connection.QueryMultiple("sp_zolar_masterValues_getDDLValues", 
                                              parameters, commandType: CommandType.StoredProcedure))
                {
                    obj.masterEntry = multi.ReadSingleOrDefault<dynamic>();
                    obj.fieldValues = multi.Read<dynamic>();
                    return obj;
                }
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
