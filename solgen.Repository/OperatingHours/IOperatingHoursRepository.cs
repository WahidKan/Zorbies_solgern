using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.OperatingHours
{
    public interface IOperatingHoursRepository
    {
        bool AddEditOperatingHours(string id,string json, string companyId, string userId);
        string DeleteOperatingHours(string id, string companyId, string userId);
        string DeleteOperatingHoursTimeSlot(string id, string companyId, string userId);
        string GetOperatingHoursById(string id, string companyId, string userId);
        string CheckOperatingHoursExist(string id, string name, string companyId, string userId);
        PagedData GetOperatingHoursList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId);


    }
}
