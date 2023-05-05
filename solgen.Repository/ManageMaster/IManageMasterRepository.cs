using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IManageMasterRepository
    {
        List<MasterItems> GetMasterDropDown();
        TblMasterModel GetById(Guid id);
        PagedData GetMasterList(string masterNames,string masterNameId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        int Save(TblMasterModel entity);
        int ChangedMasterStatusById(Guid masterid, bool InStatus);

        int DeletedMasterById(Guid masterid);
        int AddUpdateMasterName(MasterNamesModel model);
    }
}
