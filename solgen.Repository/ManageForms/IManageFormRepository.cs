using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IManageFormRepository
    {
        List<MasterItems> GetMasterDropDown();
        TblFormMasterModel GetById(long id);
        PagedData GetFormMasterList(string name, string formmasterid, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        

        List<dynamic> GetAll(int companyId);
        

        int Save(TblFormMasterModel entity);
       
        int AddUpdateFormMaster(MasterNamesModel model);
        string AddOrUpdateCustomeFields(string jsondata, long? formid, Guid? userid, long companyId);
        string GetLayoutCustomFieldByModuleNameAndSubModule(string companyid, string userid, long? formid);
    }
}
