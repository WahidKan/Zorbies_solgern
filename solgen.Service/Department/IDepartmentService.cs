using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface IDepartmentService
    {
        Task<string> GetDepartmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);
        Task<string> GetDepartmentById(string id, string moduleName, string submoduleName, string companyId, string userId);
        string AddEditDepartment(JsonModel model);
    }
}
