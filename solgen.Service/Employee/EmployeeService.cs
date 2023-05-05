using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class EmployeeService: IEmployeeService
    {
        private readonly IEmployeeRepository _repository;
        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }
        public string GetEmployeeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetEmployeeList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }
        public Task<string> GetEmployeeDetailById(string id)
        {
            return _repository.GetEmployeeDetailById(id);
        }

        public string DeletedDepartmentById(string deptId)
        {
            return _repository.DeletedDepartmentById(deptId);
        }
    }
}
