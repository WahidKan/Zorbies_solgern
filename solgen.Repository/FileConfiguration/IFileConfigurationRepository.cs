﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Repository.FileConfiguration
{
    public interface IFileConfigurationRepository
    {
        List<dynamic> GetFileExtensionList(long companyId);
        List<dynamic> GetFileConfigurationList(long companyId);
        bool Save(string jsondata, string userid, long companyId);
    }
}
