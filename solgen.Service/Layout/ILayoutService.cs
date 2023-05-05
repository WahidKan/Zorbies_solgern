using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
   public interface ILayoutService
    {
        PagedData GetLayoutList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, int modulecode);
        string AddOrUpdateCustomeFields(string jsondata, string modulecode, string submodulecode, Guid? userid, long companyId);
        string AddOrUpdateFormFields(string jsondata, string modulecode, string formMasterId, string submodulecode, Guid? userid, long companyId);

        PagedData GetFormList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, long moduleId, long subModuleId);
        PagedData GetFormList_finance(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);

        string AddNewSubModule(FormModuleModel formSubModuleModel, Guid? userid, long companyId);
        Task<string> GetModuleSubModuleByCompany(long moduleId, long companyId, Guid? userid);
        Task<string> GetFormEditData(long formMasterId, long companyId, Guid? userid);
        Task<string> GetfinanceModuleSubModuleByCompany(long moduleId, long companyId, Guid? Userid);

        Task<string> deleteForm(string module, string submodule, long formMasterId, long companyId, Guid? userid);
        Task<string> deleteFormMultiple(string formMasterId, long companyId, Guid? userid);
        Task<string> UpdateCustomLayoutDefaultStatus(ManageLayoutDefaultStatusModel model,string userId);

        Task<string> isFlowExistInLayout(int flowId, string automationFlowName, int customViewIdd);
    }
}
