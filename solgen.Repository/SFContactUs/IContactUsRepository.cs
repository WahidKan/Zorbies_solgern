using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.SFContactUs
{
    public interface IContactUsRepository
    {
        Task<dynamic> AddContactUs(SFContactUsModel contactUsModel);
        string GetSuperAdminMail();
        
        Task<PagedData> GetContactUsLeadsList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, bool? isForSuperAdminDashboard, string fromDate, string toDate);
    }
}
