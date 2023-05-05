using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IServiceAppointmentRepository
    {
        Task<string> GetServiceAppointmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id,string form_type, string date, bool isDaySelected,string searchColumn, bool isWeekSelected,bool isAllRecords);
        Task<string> GetProductById(string id, string moduleName, string submoduleName);
        string AddEditProduct(JsonModel model);
        PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID);
        Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        PagedData GetserviceAppointmentListForMobile(string SortDir, string SortColumn, int PageNo, int PageSize, DateTime currentDate, Guid UserId, long CompanyID);
        string GetCheckListListing(Guid UserId, long CompanyID, long questionId, long serviceAppointmentId);    
        string GetserviceAppointmentListCountForMobile(Guid guid, long companyId);
        string GetserviceAppointmentWorkOrderForMobile(int WorkOrderId);
        string GetWorkOrderAccountDetailForMobile(int accountid);

        
        string GetserviceAppointmentStatusForMobile();
        string UpdateAppointmentStatusForMobile(ServiceAppointmentStatusModel model);           
        string GetCurrentAppointmentStatusForMobile(ServiceAppointmentStatusModel model);
        string GetQuestionairForMobile(ServiceAppointmentStatusModel model);
        string SaveQuestionFile(SaveQuestionFileModel model);
        string DeleteAnswerForMobile(Guid userId, int companyId, int AnswerId);

         string SaveQuestionairForMobile(Guid userId, int companyId, string JsonData);


        string AddEditServiceAppointment(ServiceAppointmentModel model);
        string CreateDublicateServiceAppt(string serviceApptId, string userid);
        string addEditAudit(ServiceAppointmentModel model,Int64 CompanyId);
        List<MasterItems> GetServiceResourceDll(Guid userid, long companyid, string id,int length,string serchText, long departmentid);
        List<MasterItems> GetServiceCrewDll(Guid userid, long companyid, string id, int length, string serchText);
        List<MasterItems> GetEstimatedTravelTimeFromAndToSourceDll(Guid userid, long companyid);
        string GetServiceapoointDetails(string id, string companyId);
        string SaveAssignedResources(AssignedResourcesModel model);
        string SaveShuduleAppointAndResources(AssignedSacheduleResourcesModel model);

        Task<PagedData> GetAssignedResourcesList(long servicesappointmentid, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        string SaveSiteSurveyForm(string json, string userID, Int64 CompanyId);
        string GetSiteSurveyForm(string WoNUm, string userID, Int64 CompanyId);
        string GetCheckListForMobile(string ServiceAppointmentNumber, string userID, Int64 CompanyId, string version);

        List<ServiceAppointmentModelForCalendar> GetServiceAppointmentsForCalendar(Guid userId, int CompanyId, String condition = null, string manageviewcond = null);
        string AuditReviewData(long id, long companyId,Guid userid);
        string AuditChecklistDetail(long checkList_Id, long id, long companyId, Guid userid);

        string AttendanceData(long Said, long companyId, Guid userid);
        string saveAttendanceData(ServiceAppointmentAttendanceModel model);
        string GetContactsFromAccountsForMobile(long Said, long companyId, Guid userid);

        string GetChecklistForOfflineForMobile(Guid? userId, long? companyID, string version);
        Task<string> GetCheckListOfflineForMobileAsync(DateTime? SAScheduledDate,long CompanyId);

        string AddEditAuditCheckList(string model, string compayId, string userId, int CheckListId);
        string GetCustomFieldBySubModuleNameCode(string companyid, string userid, string moduleCode, string subModuleCode);
        Task<string> GetCheckListDetail(string Id, string userid, string companyid);

        PagedData GetListingGridData(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);

        string DeleteQuestionnaire(string Id, long companyId);
        Task<string> GetUnscheduledApptList(long companyId, Guid? UserId, string filterId, string filtersearch);
        Task<string> GetCrewResourceList(long companyId, Guid? UserId, string viewType, DateTime starttime, DateTime endtime, string filterId);
        
        Task<string> GetCrewResourceCalenderList(long companyId, Guid? UserId, string viewType, DateTime cuurentdate, DateTime lastdate, bool isFirstTime, string filters);
        string AddUpdateAssignedServiceAppointment(ServiceAppointmentAssignedCalenderModel model);
        List<MasterItems> GetServiceCrewAndResourceDll(Guid userid, long companyid, string id, int length, string serchText, string isCrew);

        string auditChecklistCheckBox(long checkListId, long companyId, Guid userid, long serviceAppointmentId, bool checkBox);

        int GetCheckListAutoSaveInterval(string userId, long companyid);
        Task<string> GetCrewListForGanttView(long companyId, Guid? UserId,  string viewType, DateTime starttime, DateTime endtime, string filterId);
        Task<string> SaveGhantViewFilter(saveSa_Data model);
        Task<string> getGhantViewFilter(long companyId, Guid? UserId);
        Task<string> GetMapGhantviewData(long companyId, Guid? UserId, string viewType, DateTime starttime, DateTime endtime, string filterId);     
        Task<string> saveTimeZone(long companyId, Guid? UserId, string timezoneId);

        PagedData GetSchdeuleSaListOnAccountId( long accountid, Guid? userId, long companyID, string SANo);
        timezoneModel GetGhantViewTimeZone(string userid, long companyid, int teritoryid);
        List<MasterItems> GetTimeZoneGhantView(Guid userid, long companyid, string id);
        Task<string> GetWorkorderDetailById(string workorderId);
    }
}
