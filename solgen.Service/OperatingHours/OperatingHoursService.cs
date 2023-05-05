using Solgen.Core;
using Solgen.Repository.OperatingHours;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.OperatingHours
{
    public class OperatingHoursService : IOperatingHoursService
    {
        private readonly IOperatingHoursRepository _repository;
        public OperatingHoursService(IOperatingHoursRepository repository)
        {
            _repository = repository;
        }

        public bool AddEditOperatingHours(string id, string json, string companyId, string userId)
        {
            return _repository.AddEditOperatingHours(id, json, companyId, userId);
        }

        public string CheckOperatingHoursExist(string id, string name, string companyId, string userId)
        {
            return _repository.CheckOperatingHoursExist(id, name, companyId, userId);
        }

        public string DeleteOperatingHours(string id, string companyId, string userId)
        {
            return _repository.DeleteOperatingHours(id, companyId, userId);
        }

        public string DeleteOperatingHoursTimeSlot(string id, string companyId, string userId)
        {
            return _repository.DeleteOperatingHoursTimeSlot(id, companyId, userId);
        }

        public string GetOperatingHoursById(string id, string companyId, string userId)
        {
            return _repository.GetOperatingHoursById(id, companyId, userId);
        }

        public PagedData GetOperatingHoursList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            return _repository.GetOperatingHoursList(filter, sortColumn, sortDir, page, pageSize, companyId);
        }
    }
}
