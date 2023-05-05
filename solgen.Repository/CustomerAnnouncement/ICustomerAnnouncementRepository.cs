using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.CustomerAnnouncement
{
    public interface ICustomerAnnouncementRepository
    {
        string GetCustomerAnnouncementById(int id);
        PagedData GetCustomerAnnouncementList(int pageNo, int totalPage,string sortCol, string sortDir, string seacrh);
        int AddEditCustomerAnnouncement(int Id, string UserId, string model,string CompanyId);
        bool DeleteCustomerAnnouncement(int Id,string UserId );
    }
}
