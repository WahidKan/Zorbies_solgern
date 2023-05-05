using Dapper;
using System;
using System.Collections.Generic;
using Solgen.Core;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data;

namespace Solgen.Repository
{
    public class ActivityLogRepository : IActivityLogRepository
    {
        private readonly SolgenDbContext _dbContext;

        public ActivityLogRepository(SolgenDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        /*! 
        * \brief   Get Activity Log List
        * \details Fetch Activity Log List
        * \author  Aakash Sharma
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public PagedData GetActivityLogList(string name, string userType, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, DateTime? expFrom, DateTime? expTo, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetActivityLogs",
                    param: new
                    {
                        Name = name,
                        UserType = userType,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        ExpFrom=expFrom,
                        ExpTo=expTo
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
