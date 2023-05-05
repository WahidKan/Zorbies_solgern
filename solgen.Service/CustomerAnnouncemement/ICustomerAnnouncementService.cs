using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.CustomerAnnouncemement
{
    public interface ICustomerAnnouncementService
    {
        string GetCustomerAnnouncementById(int id);
        PagedData GetCustomerAnnouncementList(int pageNo, int totalPage, string sortCol, string sortDir, string seacrh);
        int AddEditCustomerAnnouncement(int Id, string UserId, string model, string companyId);
        bool DeleteCustomerAnnouncement(int Id, string UserId);
    }
}
