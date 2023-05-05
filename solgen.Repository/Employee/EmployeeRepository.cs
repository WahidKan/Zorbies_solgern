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
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly SolgenDbContext _dbContext;
        public EmployeeRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string GetEmployeeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_employee_Listing", param: new
                {
                    //NameSearch = nameSearch,
                    //SortDir = sortDir,
                    //SortColumn = sortColumn,
                    //PageNo = pageIndex,
                    //PageSize = pageSize,
                    //UserId = userId,
                    VIEWER_ID = userId,
                    COMPANY_ID = 1001,
                    SORT_BY = sortDir,
                    SORT_EXP = sortColumn,
                    PAGESIZE = pageSize,
                    PAGENUMBER = pageIndex,
                    SEARCH_CONDITION = nameSearch,
                    ModuleName = moduleName,
                    subModuleName = submoduleName,
                    view_port_id = custom_view_id
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
                return dataList;
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

        public async Task<string> GetEmployeeDetailById(string id)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("[sp_solgen_GetEmployeeDetailById]",
                    new
                    {
                        Id = id,
                        moduleName="user",
                        submoduleName="Employee"

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public string DeletedDepartmentById(string deptId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_DeleteDepartmentById",
                    new
                    {
                        deptId = deptId,

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
    }
}
