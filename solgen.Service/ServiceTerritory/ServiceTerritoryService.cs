using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class ServiceTerritoryService : IServiceTerritoryService
    {
        private readonly IServiceTerritoryRepository _repository;
        public ServiceTerritoryService(IServiceTerritoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetServiceTerritoryById(string id, string moduleName, string submoduleName, string companyId, string userId)
        {
            return await _repository.GetServiceTerritoryById(id, moduleName, submoduleName, companyId,userId);
        }

        public async Task<string> GetServiceTerritoryList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return await _repository.GetServiceTerritoryList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }
        public string AddEditServiceTerritory(JsonModel model)
        {
            return _repository.AddEditServiceTerritory(model);
        }
        public async Task<PagedData> GetUserslistByServiceTerritoryId(long serviceTerritoryId, long companyId, string SortColumn, string SortDir, int PageNo, int PageSize)
        {
            var data = await _repository.GetUserslistByServiceTerritoryId(serviceTerritoryId, companyId, SortColumn, SortDir, PageNo, PageSize);
            return data;
        }
    }
}
