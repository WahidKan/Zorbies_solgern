using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.SFContactUs
{
    public class ContactUsRepository : IContactUsRepository
    {

        private readonly SolgenDbContext _dbContext;
        public ContactUsRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
          public string GetSuperAdminMail()
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data =  connection.QueryFirstOrDefault<string>("Sp_Solgen_GetSuperAdminMailDetails",                
                commandType: CommandType.StoredProcedure);

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


        public async Task<dynamic> AddContactUs(SFContactUsModel contactUsModel)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryFirstOrDefaultAsync<string>("Sp_Solgen_SFAddContactUs",
                param: new
                {
                    id =       contactUsModel.ID,
                    fullName = contactUsModel.FullName,
                    email =    contactUsModel.Email,
                    subject =  contactUsModel.Subject,
                    message =  contactUsModel.Message,
                    leadType = contactUsModel.LeadType,
                    phoneNo =  contactUsModel.PhoneNumber
                },
                commandType: CommandType.StoredProcedure);

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
        
        
        public async Task<PagedData> GetContactUsLeadsList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, bool? isForSuperAdminDashboard, string fromDate, string toDate)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetContactUsLeadsList",

                     param: new
                     {
                         SortDir = sortDir,
                         SortColumn = sortColumn,
                         PageSize = pageSize,
                         PageNo = pageIndex,
                         listFilter = listFilter,
                         isForSuperAdminDashboard = isForSuperAdminDashboard,
                         fromDate = fromDate,
                         toDate = toDate
                     },
                commandType: CommandType.StoredProcedure);

                var _data = new PagedData(dataList, pageIndex, pageSize);
                return _data;
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
