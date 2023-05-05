using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{

    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;
        public NotificationService(INotificationRepository repository)
        {
            _repository = repository;
        }

        /*! 
        * \brief   Get the list of Notifications
        * \details Get the list of Notifications
        * \author  Kiran Bala 
        * \date    13 Sep 2019
        * \version 1.0    
        */
        public PagedData GetNotificationList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard, long companyID)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _repository.GetNotificationList(name, From, To, sortColumn, sortDir, pageIndex, pageSize, userId, isDashBoard,companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public PagedData GetSolgenNotifications(string subject, string notificationType, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID)
        {
            try
            {
                return _repository.GetSolgenNotifications(subject, notificationType, sortColumn, sortDir, pageIndex, pageSize,id, companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public PagedData GetSolgenTicketList(string subject, string notificationdate, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID)
        {
            try
            {
                return _repository.GetSolgenTicketList(subject, notificationdate, sortColumn, sortDir, pageIndex, pageSize, id, companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetHeaderNotification(string userId, int companyId)
        {
            try
            {
                return _repository.GetHeaderNotification(userId, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public bool ChangeNotificationStatusToRead(long userNotificationId, int companyId)
        {
            try
            {
                return _repository.ChangeNotificationStatusToRead(userNotificationId, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
