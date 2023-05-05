 
using System;
using System.Collections.Generic;
using Solgen.Service;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IMasterNameService  
    {
        PagedData GetMasterNameList(string masterNameValue, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        List<TblMasters> GetStatuses(string masterName);
        int AddUpdateMasterName(MasterNamesModel model);
        MasterNamesModel GetMasterNameById(string Id);
    }
}
