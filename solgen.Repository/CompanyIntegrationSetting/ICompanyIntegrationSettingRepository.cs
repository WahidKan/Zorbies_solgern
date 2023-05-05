﻿using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Repository.CompanySetting
{
    public interface ICompanyIntegrationSettingRepository
    {
       string GetCompanyIntegrationSetting(string companyId, string userId, string moduleName, string strType, string displayCode);

        string AddEditCompanyIntegrationSetting(CompanyIntegrationSettingModel model);
        SettingModel GetCompanyIntegrationSettingById(string companyId);
    }
}
