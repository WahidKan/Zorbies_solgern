using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IDepartmentRepository
    {
        Task<string> GetDepartmentById(string id, string moduleName, string submoduleName, string companyId, string userId);
        Task<string> GetDepartmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string AddEditDepartment(JsonModel model);
    }
}
