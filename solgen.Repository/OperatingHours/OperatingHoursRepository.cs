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

namespace Solgen.Repository.OperatingHours
{
    public class OperatingHoursRepository : IOperatingHoursRepository
    {
        private readonly SolgenDbContext _dbContext;
        public OperatingHoursRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool AddEditOperatingHours(string id, string json, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.ExecuteScalar<int>("sp_solgen_AddEditOperatingHours",
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

        public string CheckOperatingHoursExist(string id, string name, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.Query<string>("sp_solgen_ExistOperatingHoursName",
                   param: new
                   {
                       Id = id,
                       Name = name,
                       UserId = userId,
                       CompanyId = companyId
                   },
                   commandType: CommandType.StoredProcedure).FirstOrDefault();

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

        public string DeleteOperatingHours(string id, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.Query<string>("sp_solgen_DeleteOperatingHours",
                   param: new
                   {
                       Id = id,
                       UserId = userId,
                       CompanyId = companyId
                   },
                   commandType: CommandType.StoredProcedure).FirstOrDefault();

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

        public string DeleteOperatingHoursTimeSlot(string id, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = connection.Query<string>("sp_solgen_DeleteOperatingHoursTimeSlot",
                   param: new
                   {
                       Id = id,
                       UserId = userId,
                       CompanyId = companyId
                   },
                   commandType: CommandType.StoredProcedure).FirstOrDefault();

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



        public string GetOperatingHoursById(string id, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetOperatingHoursById",
                  param: new
                  {
                      @Id = id,
                      @CompanyId = companyId,
                      @UserId = userId
                  },
                  commandType: CommandType.StoredProcedure).FirstOrDefault();

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

        public PagedData GetOperatingHoursList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = connection.Query("sp_solgen_GetOperatingHoursList",
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
