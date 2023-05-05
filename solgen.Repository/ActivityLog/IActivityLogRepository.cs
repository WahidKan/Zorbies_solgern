using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IActivityLogRepository
    {
        PagedData GetActivityLogList(string name, string userType, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, DateTime? expFrom, DateTime? expTo, long companyID);
    }
}
