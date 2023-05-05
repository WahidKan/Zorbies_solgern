using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class LayoutService : ILayoutService
    {
        private readonly ILayoutrepository _layoutRepository;

        public LayoutService(ILayoutrepository layoutRepository)
        {
            _layoutRepository = layoutRepository;
        }
        public PagedData GetLayoutList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, int modulecode)
        {
            return _layoutRepository.GetLayoutList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID, modulecode);
        }
        public string AddOrUpdateCustomeFields(string jsondata, string modulecode, string submodulecode, Guid? userid, long companyId)
        {
            return _layoutRepository.AddOrUpdateCustomeFields(jsondata, modulecode, submodulecode, userid, companyId);
        }

        public string AddOrUpdateFormFields(string jsondata, string modulecode, string submodulecode, string formMasterId, Guid? userid, long companyId)
        {
            return _layoutRepository.AddOrUpdateFormFields(jsondata, modulecode, submodulecode, formMasterId, userid, companyId);
        }

        public PagedData GetFormList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, long moduleId, long subModuleId)
        {
            return _layoutRepository.GetFormList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID, moduleId, subModuleId);
        }
        public PagedData GetFormList_finance(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _layoutRepository.GetFormList_finance(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public string AddNewSubModule(FormModuleModel formSubModuleModel, Guid? userid, long companyId)
        {
            return _layoutRepository.AddNewSubModule(formSubModuleModel, userid, companyId);
        }
        public async Task<string> GetModuleSubModuleByCompany(long moduleId, long companyId, Guid? Userid)
        {
            return await _layoutRepository.GetModuleSubModuleByCompany(moduleId, companyId, Userid);
        }
        public async Task<string> GetfinanceModuleSubModuleByCompany(long moduleId, long companyId, Guid? Userid)
        {
            return await _layoutRepository.GetfinanceModuleSubModuleByCompany(moduleId, companyId, Userid);
        }

        public async Task<string> deleteForm(string module, string submodule, long formMasterId, long companyId, Guid? userid)
        {
            return await _layoutRepository.deleteForm(module, submodule, formMasterId, companyId, userid);
        }
        public async Task<string> deleteFormMultiple(string formMasterId, long companyId, Guid? userid)
        {
            return await _layoutRepository.deleteFormMultiple(formMasterId, companyId, userid);
        }
        public async Task<string> UpdateCustomLayoutDefaultStatus(ManageLayoutDefaultStatusModel model,string userId)
        {
            return await _layoutRepository.UpdateCustomLayoutDefaultStatus(model,userId);
        }

        public async Task<string> isFlowExistInLayout(int flowId, string automationFlowName, int customViewId)
        {
            return await _layoutRepository.isFlowExistInLayout(flowId, automationFlowName, customViewId);
        }

        public async Task<string> GetFormEditData(long formMasterId, long companyId, Guid? userid)
        {
            return await _layoutRepository.GetFormEditData(formMasterId, companyId, userid);
        }

    }
}
