using System;
using Solgen.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.Common;
using System.Data;
using Dapper;

namespace Solgen.Repository
{
    public class SalesforceSyncObjectRepository : ISalesforceSyncObjectRepository
    {
        private readonly SolgenDbContext _dbContext;
        public SalesforceSyncObjectRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public PagedData GetSalesforceSyncObjectList(string objectName, string name, string createdByName, string startDate, string endDate, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetSalesforceSyncObjectList",
                    param: new
                    {
                        ObjectName = objectName,
                        Name = name,
                        CreatedByName = createdByName,
                        StartDate = startDate,        
                        EndDate = endDate,
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
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
    }
}
