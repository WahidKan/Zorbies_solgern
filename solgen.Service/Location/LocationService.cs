using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _repository;
        public LocationService(ILocationRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetLocationById(string id, string moduleName, string submoduleName, string companyId, string userId)
        {
            return await _repository.GetLocationById(id, moduleName, submoduleName, companyId,userId);
        }
        public async Task<bool> CheckServiceTerritory(string id, string companyId, string userId)
        {
            return await _repository.CheckServiceTerritory(id, companyId, userId);
        }
        public async Task<string> GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return await _repository.GetLocationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string CheckLocationNameExist(string LocationName, long? ID, string userid, long companyId)
        {
            return _repository.CheckLocationNameExist(LocationName, ID, userid, companyId);
        }
        public string AddEditLocation(JsonModel model)
        {
            return _repository.AddEditLocation(model);
        }
        public async Task<string> CheckLocationAssigned(long LocationId)
        {
            return await _repository.CheckLocationAssigned(LocationId);
        }

    }
}
