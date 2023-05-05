using Solgen.Core;
using Solgen.Repository.MasterValues;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.MasterValues
{
    public class MasterValuesSevice : IMasterValuesService
    {
        private readonly IMasterValuesRepository _repository;
        public MasterValuesSevice(IMasterValuesRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> AddEdit(string userId, long companyId, string json)
        {
            return await _repository.AddEdit(userId, companyId, json);
        }

        public async Task<string> Delete(string id, string companyId, string userId)
        {
            return await _repository.Delete(id, companyId, userId);
        }

        public async Task<string> GetById(string id, string companyId, string userId)
        {
            return await _repository.GetById(id, companyId, userId);
        }

        public async Task<PagedData> GetList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            return await _repository.GetList(filter, sortColumn, sortDir, page, pageSize, companyId);
        }
        public async Task<List<dynamic>> GetModuleList(string userId, long companyId)
        {
            return await _repository.GetModuleList(userId, companyId);
        }
        public async Task<List<dynamic>> GetSelectTypeCustomFields(long moduleId, long subModuleId, long companyId)
        {
            return await _repository.GetSelectTypeCustomFields(moduleId, subModuleId, companyId);
        }
        public async Task<dynamic> GetDDLValues(long moduleId, long subModuleId, long fieldId, string userId, long companyId)
        {
            return await _repository.GetDDLValues(moduleId, subModuleId,fieldId,userId, companyId);
        }
    }
}
