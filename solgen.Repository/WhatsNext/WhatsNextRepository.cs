using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
    public class WhatsNextRepository:IWhatsNextRepository
    {
        private readonly SolgenDbContext _dbContext;
        public WhatsNextRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        /*! 
         * \brief   Get the list of customers with Lease
         * \details Fetch the list of customers with Lease
         * \author  Kiran Bala 
         * \date    9 Oct 2019
         * \version 1.0    
         */
        public PagedData GetCustomersWithLease(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetContactsWithLease",
                    param: new
                    {
                        Name = name,
                        FromDateSearch = From,
                        ToDateSearch = To,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        IsDashborad = isDashBoard

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

        /*! 
* \brief   Get the Lease Details by lease id
* \author  Anish 
* \date    09 Sep 2019
* \Parameter   id:lease id
* \version 1.0    
*/
        public List<WhatsNext> GetById(Guid id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<WhatsNext> dataList = new List<WhatsNext>();
                connection.Open();
                dataList = connection.Query<WhatsNext>("sp_solgen_GetWhatNextDetail", new { LeaseId = id }, commandType: System.Data.CommandType.StoredProcedure).ToList();

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
    }
}
