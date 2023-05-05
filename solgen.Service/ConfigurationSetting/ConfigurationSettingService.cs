using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class ConfigurationSettingService : IConfigurationSettingService
    {
        private readonly IConfigurationSettingRepository _configurationSettingRepository;
        public ConfigurationSettingService(IConfigurationSettingRepository configurationSettingRepository)
        {
            _configurationSettingRepository = configurationSettingRepository;
        }

        public PagedData GetConfigurationSettings(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            return _configurationSettingRepository.GetConfigurationSettings(name, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyID, custom_view_id);
        }

        public CompanySetupModel getcompanySetupDetail(long CompanyID)
        {
            return _configurationSettingRepository.getcompanySetupDetail(CompanyID);
        }

        public int AddOrUpdateCompanySetup(CompanySetupModel model)
        {
            return _configurationSettingRepository.AddOrUpdateCompanySetup(model);
        }
        public int AddOrUpdateManageStatus(ManageStatusModel model)
        {
            return _configurationSettingRepository.AddOrUpdateManageStatus(model);
        }
        public StatusModelDetails GetManageStatusDetail(string moduleId, string subModuleId, string fieldId, string CompanyId)
        {
            return _configurationSettingRepository.GetManageStatusDetail(moduleId, subModuleId, fieldId, CompanyId);
        }
        public List<CustomFieldDropDown> GetModuleAndSubModuleData(string moduleId, string subModuleId, string companyId)
        {
            return _configurationSettingRepository.GetModuleAndSubModuleData(moduleId, subModuleId, companyId);
        }

        public PagedData getStagesList(string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, long moduleid, long submoduleid)
        {
            return _configurationSettingRepository.getStagesList(SortColumn, SortDir, PageNo, PageSize, userId, companyID, moduleid, submoduleid);
        }

        public List<MasterItems> GetStagePages(Guid userid, long CompanyID, long moduleid, long submoduleid)
        {
            return _configurationSettingRepository.GetStagePages(userid, CompanyID, moduleid, submoduleid);
        }
        public string AddStageForm(StageFormSubmitModel data, long comanyId, Guid userId)
        {
            return _configurationSettingRepository.AddStageForm(data, comanyId, userId);
        }

        public StatusModelDetails GetDocumentsFromMaster()
        {
            return _configurationSettingRepository.GetDocumentsFromMaster();
        }

        public int AddUpdateDocumentsMaster(ManageStatusModel model)
        {
            return _configurationSettingRepository.AddUpdateDocumentsMaster(model);
        }
        public string GetStageFormDetail(string companyId, Guid userId, long formId)
        {
            return _configurationSettingRepository.GetStageFormDetail(companyId, userId, formId);
        }

    }
}
