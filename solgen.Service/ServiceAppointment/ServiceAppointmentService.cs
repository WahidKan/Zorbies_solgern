using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class ServiceAppointmentService : IServiceAppointmentService
    {
        private readonly IServiceAppointmentRepository _repository;
        public ServiceAppointmentService(IServiceAppointmentRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetProductById(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetProductById(id, moduleName, submoduleName);
        }

        public async Task<string> GetServiceAppointmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id,string form_type, string date, bool isDaySelected, string searchColumn, bool isWeekSelected,bool isAllRecords)
        {
            return await _repository.GetServiceAppointmentList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, form_type, date, isDaySelected,searchColumn,isWeekSelected, isAllRecords);
        }
        public string AddEditProduct(JsonModel model)
        {
            return _repository.AddEditProduct(model);
        }

        public PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID)
        {
            return _repository.GetPriceBookList(nameSearch, SortColumn, SortDir, PageNo, PageSize, productid, userId, companyID);
        }

        public async Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetProductsPriceBooksList(productId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetProductCampaignsList(productId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public PagedData GetserviceAppointmentListForMobile(string SortDir, string SortColumn, int PageNo, int PageSize, DateTime currentDate, Guid UserId, long CompanyID)
        {
            return _repository.GetserviceAppointmentListForMobile(SortDir, SortColumn, PageNo, PageSize, currentDate, UserId, CompanyID);

        }
        public string GetCheckListListing(Guid guid, long companyId, long questionId, long serviceAppointmentId)
        {
            return _repository.GetCheckListListing(guid, companyId, questionId, serviceAppointmentId);

        }
        public string GetserviceAppointmentListCountForMobile(Guid guid, long companyId)
        {
            return _repository.GetserviceAppointmentListCountForMobile(guid, companyId);

        }
        public string GetserviceAppointmentWorkOrderForMobile(int WorkOrderId)
        {
            return _repository.GetserviceAppointmentWorkOrderForMobile(WorkOrderId);

        }
        public string GetWorkOrderAccountDetailForMobile(int accountid)
        {
            return _repository.GetWorkOrderAccountDetailForMobile(accountid);

        }

        public string GetserviceAppointmentStatusForMobile()
        {
            return _repository.GetserviceAppointmentStatusForMobile();

        }
        public string UpdateAppointmentStatusForMobile(ServiceAppointmentStatusModel model)
        {
            return _repository.UpdateAppointmentStatusForMobile(model);
        }

        public string GetCurrentAppointmentStatusForMobile(ServiceAppointmentStatusModel model)
        {
            return _repository.GetCurrentAppointmentStatusForMobile(model);
        }
        public string GetQuestionairForMobile(ServiceAppointmentStatusModel model)
        {
            return _repository.GetQuestionairForMobile(model);

        }
        public string SaveQuestionFile(SaveQuestionFileModel model)
        {
            return _repository.SaveQuestionFile(model);
        }

        public string DeleteAnswerForMobile(Guid userId, int companyId, int AnswerId)
        {
            return _repository.DeleteAnswerForMobile(userId, companyId, AnswerId);

        }
        public string SaveQuestionairForMobile(Guid userId, int companyId, string JsonData)
        {
            return _repository.SaveQuestionairForMobile(userId, companyId, JsonData);

        }
        public string AddEditServiceAppointment(ServiceAppointmentModel model)
        {
            return _repository.AddEditServiceAppointment(model);
        }

        public string CreateDublicateServiceAppt(string serviceApptId, string userid)
        {
            return _repository.CreateDublicateServiceAppt(serviceApptId, userid);
        }
        public string addEditAudit(ServiceAppointmentModel model, Int64 CompanyId)
        {
            return _repository.addEditAudit(model, CompanyId);
        }
        public List<MasterItems> GetServiceResourceDll(Guid userid, long companyid, string id, int length, string serchText, long departmentid)
        {
            return _repository.GetServiceResourceDll(userid, companyid, id, length, serchText,departmentid);
        }

        public List<MasterItems> GetServiceCrewDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            return _repository.GetServiceCrewDll(userid, companyid, id, length, serchText);
        }

        public List<MasterItems> GetEstimatedTravelTimeFromAndToSourceDll(Guid userid, long companyid)
        {
            return _repository.GetEstimatedTravelTimeFromAndToSourceDll(userid, companyid);
        }
        public string GetServiceapoointDetails(string id, string companyId)
        {
            return _repository.GetServiceapoointDetails(id, companyId);
        }
        public string SaveAssignedResources(AssignedResourcesModel model)
        {
            return _repository.SaveAssignedResources(model);
        }
        public string SaveShuduleAppointAndResources(AssignedSacheduleResourcesModel model)
        {
            return _repository.SaveShuduleAppointAndResources(model);
        }
        public async Task<PagedData> GetAssignedResourcesList(long servicesappointmentid, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetAssignedResourcesList(servicesappointmentid, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public string SaveSiteSurveyForm(string json, string userID, Int64 CompanyId)
        {
            return _repository.SaveSiteSurveyForm(
            json, userID, CompanyId);

        }
        public string GetSiteSurveyForm(string WoNUm, string userID, Int64 CompanyId)
        {
            return _repository.GetSiteSurveyForm(
            WoNUm, userID, CompanyId);

        }

        public string GetCheckListForMobile(string ServiceAppointmentNumber, string userID, Int64 CompanyId, string version)
        {
            return _repository.GetCheckListForMobile(ServiceAppointmentNumber, userID, CompanyId,version);

        }

        public async Task<string> GetCheckListOfflineForMobileAsync(DateTime? SAScheduledDate, long CompanyId)
        {
            return await _repository.GetCheckListOfflineForMobileAsync(SAScheduledDate, CompanyId);
        }


        public List<ServiceAppointmentModelForCalendar> GetServiceAppointmentsForCalendar(Guid userId, int CompanyId, String condition = null, string manageviewcond = null)
        {
            return _repository.GetServiceAppointmentsForCalendar(userId, CompanyId, condition, manageviewcond);

        }

        public string AuditReviewData(long id, long companyId, Guid userId)
        {
            return _repository.AuditReviewData(id, companyId, userId);
        }

        public string AuditChecklistDetail(long checkList_Id, long id, long companyId, Guid userId)
        {
            return _repository.AuditChecklistDetail(checkList_Id, id, companyId, userId);
        }

        public string AttendanceData(long Said, long companyId, Guid userid)
        {
            return _repository.AttendanceData(Said, companyId, userid);
        }

        public string saveAttendanceData(ServiceAppointmentAttendanceModel model)
        {
            return _repository.saveAttendanceData(model);
        }

        public string GetContactsFromAccountsForMobile(long Said, long companyId, Guid userid)
        {
            return _repository.GetContactsFromAccountsForMobile(Said, companyId, userid);
        }
        public string GetChecklistForOfflineForMobile(Guid? userId, long? companyID, string version)
        {
            return _repository.GetChecklistForOfflineForMobile(userId,companyID,version);

        }
        public string AddEditAuditCheckList(string model, string compayId, string userId, int CheckListId)
        {
            return _repository.AddEditAuditCheckList(model, compayId, userId, CheckListId);
        }
        public string GetCustomFieldBySubModuleNameCode(string companyid, string userid,string moduleCode, string subModuleCode)
        {
            return _repository.GetCustomFieldBySubModuleNameCode(companyid, userid, moduleCode, subModuleCode);
        }

        public PagedData GetListingGridData(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            try
            {
                return _repository.GetListingGridData(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public string DeleteQuestionnaire(string Id, long companyId)
        {
            return _repository.DeleteQuestionnaire(Id, companyId);
        }
        public async Task<string> GetCheckListDetail(string Id, string userid, string companyid)
        {
            return await _repository.GetCheckListDetail(Id, userid, companyid);
        }
        public async Task<string> GetUnscheduledApptList(long companyId, Guid? UserId, string filterId, string filtersearch)
        {
            return await _repository.GetUnscheduledApptList(companyId, UserId,filterId,  filtersearch);
        }

        public async Task<string> GetCrewResourceList(long companyId, Guid? UserId, string viewType, DateTime starttime, DateTime endtime, string filterId)
        {
            return await _repository.GetCrewResourceList(companyId, UserId,  viewType,starttime,endtime, filterId);
        }

        public async Task<string> GetCrewResourceCalenderList(long companyId, Guid? UserId, string viewType, DateTime cuurentdate, DateTime lastdate, bool isFirstTime, string filters)
        {
            return await _repository.GetCrewResourceCalenderList(companyId, UserId,  viewType, cuurentdate, lastdate, isFirstTime, filters);
        }

        public string AddUpdateAssignedServiceAppointment(ServiceAppointmentAssignedCalenderModel model)
        {
            return _repository.AddUpdateAssignedServiceAppointment(model);    
        }

        public List<MasterItems> GetServiceCrewAndResourceDll(Guid userid, long companyid, string id, int length, string serchText, string isCrew)
        {
            return _repository.GetServiceCrewAndResourceDll(userid, companyid, id, length, serchText,isCrew);
        }

        public int GetCheckListAutoSaveInterval(string userId, long companyid)
        {
            return _repository.GetCheckListAutoSaveInterval(userId, companyid);
        }

        public string auditChecklistCheckBox(long checkListId, long companyId, Guid userid, long serviceAppointmentId, bool checkBox)
        {
            return _repository.auditChecklistCheckBox(checkListId, companyId, userid, serviceAppointmentId, checkBox);
        }
        public async Task<string> GetCrewListForGanttView(long companyId, Guid? UserId, string viewType, DateTime starttime, DateTime endtime, string filterId)
        {
            return await _repository.GetCrewListForGanttView(companyId, UserId,  viewType,starttime,endtime, filterId);
        }

        public async Task<string> SaveGhantViewFilter(saveSa_Data model)
        {
            return await _repository.SaveGhantViewFilter(model);
        }

        public async Task<string> getGhantViewFilter(long companyId, Guid? UserId)
        {
            return await _repository.getGhantViewFilter(companyId, UserId);
        }

        public async Task<string> GetMapGhantviewData(long companyId, Guid? UserId, string viewType, DateTime starttime, DateTime endtime, string filterId)
        {
            return await _repository.GetMapGhantviewData(companyId, UserId, viewType, starttime, endtime, filterId);
        }
        public async Task<string> saveTimeZone(long companyId, Guid? UserId, string timezoneId)
        {
            return await _repository.saveTimeZone(companyId, UserId, timezoneId);
        }

        public PagedData GetSchdeuleSaListOnAccountId(long accountid, Guid? userId, long companyID, string SANo)
        {
            return _repository.GetSchdeuleSaListOnAccountId( accountid, userId, companyID,  SANo);
        }

        public timezoneModel GetGhantViewTimeZone(string userid, long companyid, int teritoryid)
        {
            return _repository.GetGhantViewTimeZone(userid, companyid,teritoryid);
        }

            public List<MasterItems> GetTimeZoneGhantView(Guid userid, long companyid, string id)
            {
                return _repository.GetTimeZoneGhantView(userid, companyid,id);
            }

        public async Task<string> GetWorkorderDetailById(string workOrderId)
        {
            return await _repository.GetWorkorderDetailById(workOrderId);
        }

    }
}
