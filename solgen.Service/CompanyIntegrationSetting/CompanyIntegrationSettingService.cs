using Solgen.Core.Models;
using Solgen.Repository.CompanySetting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.CompanyIntegrationSetting
{
    public class CompanyIntegrationSettingService: ICompanyIntegrationSettingService
    {

        private readonly ICompanyIntegrationSettingRepository _settingRepository;
        public CompanyIntegrationSettingService(ICompanyIntegrationSettingRepository settingRepository)
        {
            _settingRepository = settingRepository;
        }
        public string GetCompanyIntegrationSetting(string companyId, string userId, string moduleName, string strType, string displayCode)
        {
            return _settingRepository.GetCompanyIntegrationSetting(companyId, userId, moduleName, strType, displayCode);
        }

        public string AddEditCompanyIntegrationSetting(CompanyIntegrationSettingModel model)
        {
            return _settingRepository.AddEditCompanyIntegrationSetting(model);
        }

        public SettingModel GetCompanyIntegrationSettingById(string companyId)
        {
            return _settingRepository.GetCompanyIntegrationSettingById(companyId);
        }
    }
}
