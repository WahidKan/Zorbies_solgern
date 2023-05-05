using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Service
{
    public interface INotificationService
    {
        PagedData GetNotificationList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard, long companyID);
        PagedData GetSolgenNotifications(string subject, string notificationType, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID);
        PagedData GetSolgenTicketList(string subject, string notificationdate, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID);

        List<dynamic> GetHeaderNotification(string userId, int companyId);
        bool ChangeNotificationStatusToRead(long userNotificationId, int companyId);
    }
}
