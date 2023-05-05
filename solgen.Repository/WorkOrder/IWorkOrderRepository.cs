using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IWorkOrderRepository
    {
        Task<string> GetWorkOrderAccountDetail(int accountId);
        Task<string> GetServiceResourceDetail(string UserId);
        Task<string> GetDurationByWorkOrderType(int id);
        Task<string> GetWorkOrderById(string id, string moduleName, string submoduleName, string companyId, string userId);
        Task<string> GetWorkOrderList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long? companyId, string custom_view_id, bool isAllRecords);
        Task<string> GetServiceResourseServiceList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords);
        Task<string> AddEditWorkOrder(CommanJsonModel model);
        Task<string> AddOrUpdateResourceService(ResourceServiceModel model);
        Task<PagedData> GetServiceTerritoryList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string CompanyId, string UserId);
        Task<PagedData> GetServiceAppointmentList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId);
        Task<PagedData> GetServiceServiceCrewList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId);
        Task<PagedData> GetServiceSkillList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId);
        Task<PagedData> GetServiceCrewSkillList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId);

        Task<int> SaveServiceSkill(ServiceResourceSkillModel model);
        Task<int> SaveServiceCrewSkill(ServiceResourceSkillModel model);
        Task<int> SaveServiceTerritory(ServiceTerritoryModel model);
        Task<int> SaveServiceCrew(ServiceResourceCrewModel model);
        Task<int> SaveServiceAbcense(ServiceAbcenseModel model);
        Task<int> addeditProductRequired(ProductRequiredModel model);
        Task<string> AddeditEngineeringQuestionData(AddeditEngineeringQuestionModel model);
        Task<string> addeditWorkOrderLineItem(workOrderLineItemModel model);
        workOrderLineItemModel getLineItemById(long id);
        
        Task<PagedData> GetServiceGetAbcenseList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId);

        Task<PagedData> GetWorkOrderServiceAppointmentList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        Task<PagedData> GetWorkOrderProductRequiredList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        Task<PagedData> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        Task<string> GetEngineeringQuestionData(long workOrderId, long companyID, string UserId);
        Task<string> GetWorkOrderProposal(long workOrderId, long companyID);
        Task<int> AddEditfixOrder(FixOrderJsonModel model);

        Task<string> GetFixOrderData(string workOrderid, string companyId, string userId);
        Task<PagedData> GetWorkOrderLineItemList(long workorderid, string sortColumn, string sortDir, int PageNo, int pageSize, long companyId, Guid? UserId);
        Task<string> updateStatusOrCreateLog(StartWorkOrderModel model);
        Task<PagedData> GetWorkOrderHistoryList(long workorderid, string sortColumn, string sortDir, long PageNo, long pageSize);
        Task<string> AddEditSkill(SkillModel model);

        Task<string> AddEditTimezone(TimeZoneModel models);

        Task<PagedData> GetManageSkillListingData(string name,string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId);

        Task<PagedData> GetTimezoneListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId);

        Task<PagedData> GetRequirementListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId);
        Task<string> AddeditRequirement(requirementModel model);
        Task<string> DeleteSkill(int Id,long companyId);
        Task<PagedData> GetWorkTypeListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId);
        Task<string> AddeditWorkTypeRecords(workTypeModel model);
        Task<PagedData> GetEditWorkTypeRecordsById(string Id,  long companyId, Guid? UserId);
        Task<string> DeleteWorkType(int Id, long companyId, Guid? UserId);

        Task<string> AddEditProductRequiredData(ProductRequiredmodel model);
        Task<PagedData> GetProductRequiredGridData(string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId, int WorkOrderId);
        Task<PagedData> GetSkillRequirementsGridData(string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId);
        Task<string> AddEditskillRequirementsData(SkillRequirementModel model);
        string WorkOrderAuditReviewData(long id,string accountId, long companyId, Guid userid);
        string GetWorkOrderSumaryData(long workOrderId, long companyID, string UserId);

        Task<string> GetZonesLocationsList(long companyID, long offset, string searchText);
        Task<PagedData> GetSiteZonePriorityList(string sortColumn, string sortDir, long pageNo, long pageSize, long primaryKey);
        Task<string> GetSiteZonePriorityListForEdit(long primaryKey);
        Task<dynamic> getWorkOrderList(long PworkOrderId);
        Task<dynamic> GetAutoGenerateLineItemNo(long PworkOrderId);
        
        Task<dynamic> getlineItemStatusList(long companyId);
        Task<string> ManagetSiteSurveyZonePriority(SiteSurveyModel model);
        #region project Requirement
        Task<PagedData> GetProjectRequirementListingData(string AccountNumber,string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId);

        List<MasterItems> GetRequirementDll(Guid userid, long companyid, string id, int length, string serchText);
        Task<string> AddeditProjectRequirement(requirementModel model);

        string GetRequirementById(string id, string companyId);
        #endregion
    }
}

