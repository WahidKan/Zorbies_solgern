using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IModuleRepository
    {
        List<ModuleModel> GetModuleList(string userId,string companyid);

        

        string GetSubModuleDetails(int companyId,string subModuleCode,string userId);
        string getRoleModuleList(long companyId, Guid userId, bool isApplyRole, bool fromMobile);

    }
}
