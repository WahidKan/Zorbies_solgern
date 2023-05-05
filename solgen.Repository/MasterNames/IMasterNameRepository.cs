using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IMasterNameRepository 
    {
        PagedData GetMasterNameList(string masterNameValue, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        List<TblMasters> GetStatuses(string masterName);
        int AddUpdateMasterName(MasterNamesModel model);
        MasterNamesModel GetMasterNameById(string Id);
    }
}
