using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class DesignationService : IDesignationService
    {
        private readonly IDesignationRepository _repository;
        public DesignationService(IDesignationRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetDesignationById(string id, string moduleName, string submoduleName, string companyId, string userId)
        {
            return await _repository.GetDesignationById(id, moduleName, submoduleName, companyId, userId);
        }

        public async Task<string> GetDesignationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return await _repository.GetDesignationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }
        public string AddEditDesignation(JsonModel model)
        {
            return _repository.AddEditDesignation(model);
        }
    }
}
