using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.MasterValues
{
    public interface IMasterValuesService
    {
        Task<PagedData> GetList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId);
        Task<string> AddEdit(string userId, long companyId, string json);
        Task<string> Delete(string id, string companyId, string userId);
        Task<string> GetById(string id, string companyId, string userId);
        Task<List<dynamic>> GetModuleList(string userId, long companyId);
        Task<List<dynamic>> GetSelectTypeCustomFields(long moduleId, long subModuleId, long companyId);
        Task<dynamic> GetDDLValues(long moduleId, long subModuleId, long fieldId, string userId, long companyId);
    }
}
