
using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;

namespace Solgen.Repository
{
    public class EmailTrackingRepository : IEmailTrackingRepository
    {
        private readonly SolgenDbContext _dbContext;

        public EmailTrackingRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
          
        }

        /*! 
      * \brief   Get the email tracking list
      * \details Fetch the list of email tracking
      * \author  Dheeraj 
      * \date    12 Dec 2019
      * \Parameter   
      * \version 1.0    
      */
        public PagedData GetList(DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize,int _type, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_EmailSendstatusList",
                    param: new
                    {
                        FromDateSearch = From,
                        ToDateSearch = To,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        Type=_type,
                        UserId = userId
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
        
        public Guid SaveSendEmailStatus(EmailSendingModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CreatedBy", model.CreatedBy);
                parameters.Add("@EmailTrackId", model.EmailTrackId ?? Guid.Empty);
                parameters.Add("@EmailFrom", model.EmailFrom);
                parameters.Add("@EmailContent", model.EmailContent);
                parameters.Add("@EmailSubject", model.EmailSubject);
                parameters.Add("@EmailTo", model.EmailTo);
                parameters.Add("@EmailStatus", model.EmailStatus);
                parameters.Add("@ModuleName", model.ModuleName);
                parameters.Add("@PrimaryId", model.PrimaryId);
                parameters.Add("@EmailSendingFailMessage", model.EmailSendingResponse);
                parameters.Add("@SendEmailId", model.SendEmailId);
                connection.Open();
                var data = connection.QueryFirstOrDefault<Guid>("sp_solgen_AddOrUpdateEmailSendstatus", parameters, commandType: System.Data.CommandType.StoredProcedure);
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
