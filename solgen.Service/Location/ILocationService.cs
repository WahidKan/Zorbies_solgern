using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface ILocationService
    {
        Task<string> GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);
        Task<string> GetLocationById(string id, string moduleName, string submoduleName, string companyId, string userId);
        string CheckLocationNameExist(string LocationName, long? ID, string userid, long companyId);
        string AddEditLocation(JsonModel model);
        Task<bool> CheckServiceTerritory(string id, string companyId, string userId);
        Task<string> CheckLocationAssigned(long LocationId);

    }
}
