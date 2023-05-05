using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class WorkOrderService : IWorkOrderService
    {
        private readonly IWorkOrderRepository _repository;
        public WorkOrderService(IWorkOrderRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetDurationByWorkOrderType(int id)
        {
            return await _repository.GetDurationByWorkOrderType(id);
        }
        public async Task<string> GetWorkOrderAccountDetail(int accountId)
        {
            return await _repository.GetWorkOrderAccountDetail(accountId);
        }
        public async Task<string> GetServiceResourceDetail(string UserId)
        {
            return await _repository.GetServiceResourceDetail(UserId);
        }
        public async Task<string> GetWorkOrderById(string id, string moduleName, string submoduleName, string companyId, string userId)
        {
            return await _repository.GetWorkOrderById(id, moduleName, submoduleName, companyId, userId);
        }

        public async Task<string> GetWorkOrderList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long? companyId, string custom_view_id, bool isAllRecords)
        {
            return await _repository.GetWorkOrderList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
        }
        public async Task<string> AddEditWorkOrder(CommanJsonModel model)
        {
            return await _repository.AddEditWorkOrder(model);
        }
        public async Task<string> GetServiceResourseServiceList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            return await _repository.GetServiceResourseServiceList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
        }
        public async Task<string> AddOrUpdateResourceService(ResourceServiceModel model)
        {
            return await _repository.AddOrUpdateResourceService(model);
        }
        public async Task<PagedData> GetServiceTerritoryList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string CompanyId, string UserId)
        {
            return await _repository.GetServiceTerritoryList(ServiceId, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
        }
        public async Task<PagedData> GetServiceAppointmentList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            return await _repository.GetServiceAppointmentList(ServiceId, sortColumn, sortDir, pageIndex, pageSize, UserId, CompanyId);
        }
        public async Task<PagedData> GetServiceServiceCrewList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            return await _repository.GetServiceServiceCrewList(ServiceId, sortColumn, sortDir, pageIndex, pageSize, UserId, CompanyId);
        }
        public async Task<PagedData> GetServiceSkillList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            return await _repository.GetServiceSkillList(ServiceId, sortColumn, sortDir, pageIndex, pageSize, UserId, CompanyId);
        }
        public async Task<PagedData> GetServiceCrewSkillList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            return await _repository.GetServiceCrewSkillList(ServiceId, sortColumn, sortDir, pageIndex, pageSize, UserId, CompanyId);
        }
        public async Task<PagedData> GetServiceGetAbcenseList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            return await _repository.GetServiceGetAbcenseList(ServiceId, sortColumn, sortDir, pageIndex, pageSize, UserId, CompanyId);
        }
        public async Task<int> SaveServiceSkill(ServiceResourceSkillModel model)
        {
            return await _repository.SaveServiceSkill(model);
        }
        public async Task<int> SaveServiceCrewSkill(ServiceResourceSkillModel model)
        {
            return await _repository.SaveServiceCrewSkill(model);
        }

        public async Task<int> SaveServiceTerritory(ServiceTerritoryModel model)
        {
            return await _repository.SaveServiceTerritory(model);
        }
        public async Task<int> SaveServiceCrew(ServiceResourceCrewModel model)
        {
            return await _repository.SaveServiceCrew(model);
        }
        public async Task<int> SaveServiceAbcense(ServiceAbcenseModel model)
        {
            return await _repository.SaveServiceAbcense(model);
        }
        public async Task<int> addeditProductRequired(ProductRequiredModel model)
        {
            return await _repository.addeditProductRequired(model);
        }
        public async Task<string> AddeditEngineeringQuestionData(AddeditEngineeringQuestionModel model)
        {
            return await _repository.AddeditEngineeringQuestionData(model);
        }
        public async Task<string> addeditWorkOrderLineItem(workOrderLineItemModel model)
        {
            return await _repository.addeditWorkOrderLineItem(model);
        }
        public workOrderLineItemModel getLineItemById(long id)
        {
            try
            {
                return _repository.getLineItemById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        
        public async Task<PagedData> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetOpportunityList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }
        public async Task<string> GetEngineeringQuestionData(long workOrderId, long companyID, string UserId)
        {
            return await _repository.GetEngineeringQuestionData(workOrderId, companyID, UserId);
        }
        public async Task<string> GetWorkOrderProposal(long workOrderId, long companyID)
        {
            return await _repository.GetWorkOrderProposal(workOrderId, companyID);
        }
        public async Task<PagedData> GetWorkOrderServiceAppointmentList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetWorkOrderServiceAppointmentList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }
        public async Task<PagedData> GetWorkOrderProductRequiredList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetWorkOrderProductRequiredList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }
        public async Task<int> AddEditfixOrder(FixOrderJsonModel model)
        {
            return await _repository.AddEditfixOrder(model);
        }

        public async Task<string> GetFixOrderData(string workOrderid, string companyId, string userId)
        {
            return await _repository.GetFixOrderData(workOrderid, companyId, userId);
        }

        public async Task<PagedData> GetWorkOrderLineItemList(long workorderid, string sortColumn, string sortDir, int PageNo, int pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetWorkOrderLineItemList(workorderid, sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }
        public async Task<string> updateStatusOrCreateLog(StartWorkOrderModel model)
        {
            return await _repository.updateStatusOrCreateLog(model);
        }

        public async Task<PagedData> GetWorkOrderHistoryList(long workorderid, string sortColumn, string sortDir, long PageNo, long pageSize)
        {
            return await _repository.GetWorkOrderHistoryList(workorderid, sortColumn, sortDir, PageNo, pageSize);

        }
        public async Task<string> AddEditSkill(SkillModel model)
        {
            return await _repository.AddEditSkill(model);
        }

        public async Task<string> AddEditTimezone(TimeZoneModel models)
        {
            return await _repository.AddEditTimezone(models);
        }
        public async Task<PagedData> GetManageSkillListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetManageSkillListingData(name,sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }

        public async Task<PagedData> GetTimezoneListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetTimezoneListingData(name, sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }

        public async Task<PagedData> GetRequirementListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetRequirementListingData(name, sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }
        public async Task<string> AddeditRequirement(requirementModel model)
        {
            return await _repository.AddeditRequirement(model);
        }

       
        public async Task<string> DeleteSkill(int Id,long companyId)
        {
            return await _repository.DeleteSkill(Id,companyId);
        }

        public async Task<PagedData> GetWorkTypeListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetWorkTypeListingData(name, sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }
        public async Task<string> AddeditWorkTypeRecords(workTypeModel model)
        {
            return await _repository.AddeditWorkTypeRecords(model);
        }
        public async Task<PagedData> GetEditWorkTypeRecordsById(string Id,long companyId, Guid? UserId)
        {
            return await _repository.GetEditWorkTypeRecordsById(Id,companyId, UserId);
        }
        public async Task<string> DeleteWorkType(int Id, long companyId, Guid? UserId)
        {
            return await _repository.DeleteWorkType(Id, companyId, UserId);
        }
        public async Task<string> AddEditProductRequiredData(ProductRequiredmodel model)
        {
            return await _repository.AddEditProductRequiredData(model);
        }
        public async Task<PagedData> GetProductRequiredGridData( string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId, int WorkOrderId)
        {
            return await _repository.GetProductRequiredGridData( sortColumn, sortDir, PageNo, pageSize, companyId, UserId, WorkOrderId);
        }
        public async Task<PagedData> GetSkillRequirementsGridData(string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetSkillRequirementsGridData(sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }
        public async Task<string> AddEditskillRequirementsData(SkillRequirementModel model)
        {
            return await _repository.AddEditskillRequirementsData(model);
        }

        public string WorkOrderAuditReviewData(long id, string accountId, long companyId, Guid userId)
        {
            return _repository.WorkOrderAuditReviewData(id, accountId, companyId, userId);
        }

        public string GetWorkOrderSumaryData(long workOrderId, long companyID, string UserId)
        {
            return _repository.GetWorkOrderSumaryData(workOrderId,companyID,UserId);
        }

        public async Task<string> GetZonesLocationsList(long companyID, long offset, string searchText)
        {
            return await _repository.GetZonesLocationsList(companyID, offset, searchText);
        }

        public async Task<PagedData> GetSiteZonePriorityList(string sortColumn, string sortDir, long pageNo, long pageSize, long primaryKey)
        {
            return await _repository.GetSiteZonePriorityList(sortColumn, sortDir, pageNo, pageSize, primaryKey);
        }

        public async Task<string> GetSiteZonePriorityListForEdit(long primaryKey)
        {
            return await _repository.GetSiteZonePriorityListForEdit(primaryKey);
        }
        public async Task<dynamic> getWorkOrderList( long PworkOrderId)
        {
            return await _repository.getWorkOrderList(PworkOrderId);

        }
        public async Task<dynamic> GetAutoGenerateLineItemNo(long PworkOrderId)
        {
            return await _repository.GetAutoGenerateLineItemNo(PworkOrderId);

        }
        
        public async Task<dynamic> getlineItemStatusList(long companyId)
        {
            return await _repository.getlineItemStatusList(companyId);

        }
       
        public async Task<string> ManagetSiteSurveyZonePriority(SiteSurveyModel model)
        {
            return await _repository.ManagetSiteSurveyZonePriority(model);
        }
        #region Project Reqirement
        public async Task<PagedData> GetProjectRequirementListingData(string AccountNumber,string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetProjectRequirementListingData(AccountNumber, name, sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        }
        public List<MasterItems> GetRequirementDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            return _repository.GetRequirementDll(userid, companyid, id, length, serchText);
        }
        public async Task<string> AddeditProjectRequirement(requirementModel model)
        {
            return await _repository.AddeditProjectRequirement(model);
        }

        public string GetRequirementById(string id, string companyId)
        {
            return _repository.GetRequirementById(id, companyId);
        }

        #endregion
    }
}