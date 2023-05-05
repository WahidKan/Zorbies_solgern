using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;

namespace Solgen.Service
{
    public class RequirementsService : IRequirementsService
    {
        private readonly IRequirementsRepository _repository;
        public RequirementsService(IRequirementsRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> getRequirementsList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            return await _repository.getRequirementsList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
        }

        public string AddEditRequirement(ProjectModel model)
        {
            return _repository.AddEditRequirement(model);
        }

        //public List<MasterItems> GetTypeOnBaseRecordType(string MasterIdAuto, string SerchText, long length, long ID, long companyId)
        //{
        //    return _repository.GetTypeOnBaseRecordType(MasterIdAuto, SerchText, length, ID, companyId);
        //}


        public string GetTypeOnBaseRecordType(string MasterIdAuto, string SerchText, long length, long ID, long companyId)
        {
            return _repository.GetTypeOnBaseRecordType(MasterIdAuto, SerchText, length, ID, companyId);
        }
    }
}