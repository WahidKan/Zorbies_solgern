using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IEmployeeRepository
    {
        string GetEmployeeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);
        Task<string> GetEmployeeDetailById(string id);
        string DeletedDepartmentById(string deptId);
    }
}
