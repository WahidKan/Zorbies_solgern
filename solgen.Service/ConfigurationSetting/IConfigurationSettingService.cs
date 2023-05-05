using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface IConfigurationSettingService
    {
        PagedData GetConfigurationSettings(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id);
        CompanySetupModel getcompanySetupDetail(long CompanyID);
        int AddOrUpdateCompanySetup(CompanySetupModel model);
        int AddOrUpdateManageStatus(ManageStatusModel model);
        int AddUpdateDocumentsMaster(ManageStatusModel model);

        StatusModelDetails GetManageStatusDetail(string moduleId, string subModuleId, string fieldId,string CompanyId);

        StatusModelDetails GetDocumentsFromMaster();

        List<CustomFieldDropDown> GetModuleAndSubModuleData(string moduleId, string subModuleId, string companyId);
        PagedData getStagesList(string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, long moduleid, long submoduleid);
        List<MasterItems> GetStagePages(Guid userid, long CompanyID, long moduleid, long submoduleid);

        string AddStageForm(StageFormSubmitModel data, long comanyId, Guid userId);
        string GetStageFormDetail(string companyId, Guid userId, long formId );
    }
}
