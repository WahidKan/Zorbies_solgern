using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Service
{
    public interface IActivityLogService
    {
        PagedData GetActivityLogList(string name, string userType, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, DateTime? expFrom, DateTime? expTo, long companyID);
        //List<ActivityLogListModel> GetActivityLogList(string nameSearch, string userTypeSearch);
    }
}
