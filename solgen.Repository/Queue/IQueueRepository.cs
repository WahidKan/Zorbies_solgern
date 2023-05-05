using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Repository
{
    public interface IQueueRepository
    {
        string AddEditqueue(JsonModel model);
        string GetQueueList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);
        string GetUsersList(string companyId, string PrimaryId);

        PagedData GetQueueUserList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, string primaryKey);
    }
}
