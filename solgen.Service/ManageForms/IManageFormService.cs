using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IManageFormService
    {
        //  List<MasterModel> GetMasterList(string search);.3
        List<MasterItems> GetMasterDropDown();
        TblFormMasterModel GetById(long id);
        PagedData GetFormMasterList(string name, string formmasterid, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        int Save(TblFormMasterModel entity);
      
        

        List<dynamic> GetAll(int companyId);
        
        string AddOrUpdateCustomeFields(string jsondata, long? formid, Guid? userid, long companyId);
        string GetLayoutCustomFieldByModuleNameAndSubModule(string companyid, string userid, long? formid);


    }
}
