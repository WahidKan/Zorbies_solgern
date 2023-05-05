using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IManageMasterService
    {
        //  List<MasterModel> GetMasterList(string search);.3
        List<MasterItems> GetMasterDropDown();
        TblMasterModel GetById(Guid id);
        PagedData GetMasterList(string masterNames,string masterNameId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        int Save(TblMasterModel entity);
        int ChangedMasterStatusById(Guid masterid, bool InStatus);
        int DeletedMasterById(Guid masterid);
        
    }
}
