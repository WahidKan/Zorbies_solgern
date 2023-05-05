using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public class NotificationRepository:INotificationRepository
    {
        private readonly SolgenDbContext _dbContext;
        public NotificationRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*! 
        * \brief   Get the list of Notifications
        * \details Fetch the list of Notifications
        * \author  Kiran Bala 
        * \date    13 Sep 2019
        * \version 1.0    
        */
        public PagedData GetNotificationList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                // var dataList = connection.Query("sp_solgen_GetNotificationList",
                var dataList = connection.Query("sp_solgen_GetUserNotificationList",
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
                        companyID = companyID,
                        IsDashborad = isDashBoard,
                     
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

        public PagedData GetSolgenNotifications(string subject,  string notificationType, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_NotificationsList",
                    param: new
                    {
                        name = subject,
                        Type = notificationType,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,                                                          
                        UserId = id,                      
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

        public PagedData GetSolgenTicketList(string subject, string notificationdate, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetTicketList",
                    param: new
                    {
                        Subject = subject,                       
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = id,
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

        public List<dynamic> GetHeaderNotification(string userId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_getRealTimeNotification",
                    param: new
                    {
                        Userid = userId,
                       CompanyID = companyId
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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

        public bool ChangeNotificationStatusToRead(long userNotificationId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                return connection.Execute("sp_solgen_ChangeNotificationStatusToRead",
                    param: new
                    {
                        UserNotificationId = userNotificationId,
                        CompanyID = companyId
                    },
                    commandType: CommandType.StoredProcedure) > 0;
                
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

        public bool SendNotification(NotificationSendModel model)
        {
            bool _status;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            var userTo = ""; var userCC = "";
            if (model.CcUser != null)
            {
                foreach (var item in model.CcUser)
                {
                    if (userCC == "")
                    {
                        userCC = item;
                    }
                    else
                    {
                        userCC = userCC + "," + item;
                    }
                }
            }
            try
            {
                connection.Open();
                Guid id = Guid.Empty;
                _status = connection.ExecuteScalar<int>("sp_solgen_SaveNotificationFromLoanApplicationForMaulaEMailNotifications", new
                {

                    subject = model.Subject,
                    subjectBody = model.SubjectBody,
                    createdBy = model.CreatedBy,
                    userTo = model.ToUser,
                    userCC = userCC,
                    CompanyId = model.CompanyId,
                    ObjectID = model.ObjectId,
                    RouteUrl = model.RouteUrl
                }, commandType: System.Data.CommandType.StoredProcedure)>0;

                return _status;
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
