using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _repository;
        public DepartmentService(IDepartmentRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetDepartmentById(string id, string moduleName, string submoduleName, string companyId, string userId)
        {
            return await _repository.GetDepartmentById(id, moduleName, submoduleName, companyId, userId);
        }

        public async Task<string> GetDepartmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return await _repository.GetDepartmentList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }
        public string AddEditDepartment(JsonModel model)
        {
            return _repository.AddEditDepartment(model);
        }
    }
}
