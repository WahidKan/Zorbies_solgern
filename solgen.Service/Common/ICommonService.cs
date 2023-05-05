using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface ICommonService
    {
        int SaveUserDefinedCustomField(string customFieldJson, Guid? userid, long companyId,int viewId);
        List<MasterItems> GetMasterItems(string masterName, Guid uid, long CompanyID, string masterKeyText = "");
        List<MasterItems>  GetMasterItemsForMultipleId(string ModuleName , Guid uid, long CompanyID, string SubModuleCode);
        List<SelectItemModel> GetStateList();
        List<SelectItemModel> GetStateList_V1(string code);
        List<SelectItemModel> GetTemplateList(long companyId);
        ChangeStatusModel DeleteRecord(string tableName, string primaryKey);
        List<UsersConnections> GetConnection(Guid UserID);
        ChangeStatusModel UpdateActiveInactiveStatus(string tableName, string primaryKey, string status);
        bool AddNotification(string Subject, string Message, string SenderId, string ReceiverId, string NotificationType, string NotificationUserType, string NotificationCreatedBy, string PrimaryId = "", string ModuleName = "");
        bool AddActivityLog(string UserID, string IPAddress, string WebBrowser, string OSBrowser, string ActionType, string Detail, string Message = "");
        bool SaveUserConnection(Guid UserID, string connID,bool logout);
        HeaderDataMode GetHeaderData(string UserID);
        List<RoleModules> GetUserModulePermissionList(Guid? userId = null, bool isApplyRole=false,string companyid="");
        string GetNotificationByOperationUser(string Id,string siteLink);
        List<SelectItemModel> LAAccountList();
        string UpdateScheduledAppointmentStatus(string AppId,string status);
        string AddDataFormJsonFormat(DepartementModel model);
        //string AddDataFormJsonFormat(string records, Guid? userid, string storedProcedureName);
        string GetLeadListing();

        List<OperatorsItems> GetOperatorsItems(string filedNameId, Guid uid, string expression = "");
        Task<string> GetDepartmentsById(string id, string moduleName, string submoduleName);
        dynamic GetScheduleAppointment(string userid,string companyid);
        Task<string> GetLeadsById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID);

        Task<string> GetLenderById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID);



        Task<string> GetCustomContactById(string id, string moduleName, string submoduleName);

        Task<string> GetProductById(string id, string moduleName, string submoduleName);
        
        
        PagedData GetCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
            long companyId);

        PagedData GetCustomViewNameWithCountForWidgets(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
            long companyId); 
        Task<List<CustomView>> GetCustomViewbyId(Int64 id);
        Task<string> GetContractDetails(string id, string moduleName, string submoduleName);
        Task<string> GetProposalDetailsbyid(string id, string moduleName, string submoduleName);
        string AddEditCustomField(ManageLayout model);

        Boolean DeleteRecords(string tableName, string primaryKey);
        Boolean DeleteRecords(string tableName, string primaryKey, string deletedBy);
        EnableAccountLogin ApproveAccount(string primaryKey, string userId, long companyid);
        EnableAccountLogin DisabledAccount(string primaryKey, string userId, string companyid);
        string AddLoginHistory(LoginModel model, long companyid);

        // Lead Configuration Setting
        string ManageLeadConfiguration(LeadConfigurationModel model);
        LeadConfigurationModel GetLeadConfigurationDetails(Int64? CompanyId);
        string GetcustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName);

        Task<string> GetAccountById(string id, string moduleName, string submoduleName, Guid userId, long companyId);

        // Get Product Listing
        string GeProductListing();

        Task<string> GetUserTeam(string type, string userId, long companyId);
        IEnumerable<dynamic> GeHeaderCompanyList(string userId);
        //bool GetLastLoginHistryDataForUser(string compayId,string userid);
        PagedData GetCompanyList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        IEnumerable<dynamic> GeHeaderCompanyListForMobile(string userId,string companyType);


        List<dynamic> GetOperatorsByDataTypeCode(string dataTypeCode);

        List<dynamic> GetResultActions(long companyId,string objectName = "");
        string GetFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId,string displayCode);
        string GetDataForVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId);
        string GetDataForBankVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId);
        string CheckUserDuplicateORAssociate(Guid? userID, long? companyID, string emailID, Guid? uid);

        string CheckUserAssociate(Guid? userID, long? companyID, string emailID, Guid? uid);

        string AssociateUserWithCompany(Guid? userID, long? companyID, string emailID, Guid? uid, long? RoleID, long? userTypeId,long? deptid,bool ishod=false, bool isEnableUser=false, bool? emailNotification = false);
        List<dynamic> GetEmailTemplateDataForReplaceContent(string objId, string templateId, Guid userid, long CompanyID);
        Task<string> SetPasswordStatus(string userid, long? companyID);
        Task<string> SetCompanyMapping(string userid,int CompanyMappingStatusId,long? companyID);
        List<dynamic> GetSqlNumericFunctionList(string sqlFunctionTypeCode);
        Task<string> GetStageDetailsById(Guid userid, long CompanyID, long id,string moduleName);
        Task<string> GetEmploymentTypes(long companyId);
        string GetWelcomeCallDetails(long? accountId, string moduleName, string subModuleName, string CompanyID, Guid userId, long flowid, long stepno, string type, string buttoncode);
        List<MasterItems> GetCustomFieldsDropDownList(long length, long custom_field_id, long CompanyID, Guid userId, string field_code, string serchText);
        
            List<MasterItems> GetFixedPageScrollDropDownList(long length, long custom_field_id, long CompanyID, Guid userId, string field_code, string serchText);
        string GetSolCustomFieldsList(long companyId, Guid userId , long loanAppStageId, long PrimaryId);

        string AddEditSolgenStageForm(SolgenStageModel model, Guid userId, long companyId);

        string MarkAsCompleteStatus(MarkAsCompleteModel model, Guid userId, long companyId);

        string GetMapView(string companyid,string moduleName, string subModuleName, Guid userId, string listFilter);

        string GetGlobalSeacrchData(string listFilter, long? length, string companyid, Guid userId, string recordFilter, string teamID, string teamMemberID);
        Task<string> GetGlobalSearchDataAsync(string listFilter, long? length, string companyid, Guid userId, string recordFilter, string teamID, string teamMemberID);

        string AddErrorAndException(string exception,string url);
        Task<string>  GetLasttimeLoginForCompany(string userid,long companyid, string callFrom);
        List<MasterItems> GetManageViewDropDownList(long CompanyID, Guid userId, string ModuleName, string SubModuleName);

        string GetCascadingData(string id, string moduleName, string submoduleName, Guid user, long company);


        //========================LoanHomi Manage View Form Functions==================================
        PagedData GetLoanHomiCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
         long companyId, string listType);
        Boolean DeleteLoanHomiRecords(string tableName, string primaryKey, string deletedBy);
        string GetLoanHomiCustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName, string listType);
        Task<List<CustomView>> GetLoanHomiCustomViewbyId(Int64 id);
        string SaveLoanHomiCustomManagePopup(LoanHomiManageViewModelWithCompany model);

        string AddUpdateLoanApplicationReportData(LoanApplicationReportModel model);

        //string GetLoanHomiManageViewFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode);
        string GetLoanHomiManageViewFormFieldsList(string fieldlistFilter, string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode,string type);

        List<OperatorsItems> getLoanHomiOperatorsList(string filedNameId, Guid UserID, string companyid, string module_name = "");

        //========================END==================================
        Task<string> GetTimeZoneList();
        string GetTimeZone(string timeZone);

        Task<string> GetDocumentCategory(long campanyId);
        Task<string> GetDocumentTypeByCategoryId(long categoryid, long campanyId);

        Task<PagedData> GetFileListForRelatedTab(string ServiceId, string categoryId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId, string moduleName, string subModuleName);
        Task<int> addOrUpdateFiles(ServiceResourceFiles model);
        int addUpdateActivity(ActivityDataModel model);
        PagedData GetActivityData(string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName, long companyId, long refid);
        int DeleteActivity(long Id, long companyid, Guid userid);

        Task<string> GetModulesNameList(string companyId, string loginuserid, long module_id);

        PagedData GetSubModulesNameList(int PageNo, int PageSize, Guid? userId, long companyID, int modulecode, int submodulecode, string deviceType, string layoutType, string sortDir, string sortColumn, string filterText);

        string saveLayoutType(LayoutModuleModel layoutModuleModel, Guid? userid, long companyId);

        string GetCustomFieldsData(string companyId, string userId, string viewId);


        string SaveCustomLayoutData(string jsondata, string view, Guid? userid, long companyId,string relation,string automationFlow);

        string getMasterItemsByCustomFieldId(long customFieldId, long companyId);
        Task<string> GetDDLItemsByFieldCode(string fieldCode,string moduleCode,string submoduleCode,Guid? userid,long CompanyID);
        Task<string> GetDDLItemsForRole(string fieldCode,long? accountId,Guid? userid,long CompanyID);
        Boolean CheckAccountTypeIsDealer(long? accountId,Guid? userid,long CompanyID);
        List<MasterItems> GetWorkTypeDDL(Guid userid, long companyid, string id, int length, string serchText);
        string CloneSelectedListView(Guid UserId, long CompanyId, long ViewId, string ViewName,string listType);
        int saveWelcomeCall(welcomeSaveModel model);
        string SaveSMSResponse(string To, string AccountSid, string ApiVersion, string MessageStatus, string SmsSid, string MessagingServiceSid, string From, string MessageSid, string SmsStatus, string body, DateTime? DateCreated, string type,long? ref_id,string ref_code,long? companyId,Guid? userId);

        string SaveReceiveSMSResponse(string ToCountry, string ToState, string SmsMessageSid, string NumMedia, string ToCity, string FromZip, string SmsSid, string FromState, string SmsStatus, string FromCity
        , string Body, string FromCountry, string To, string MessagingServiceSid, string ToZip, string NumSegments, string MessageSid, string AccountSid, string From, string ApiVersion, string type);
        string saveUserActivityLog(userActivityLog model);
        string UpdateUserProfileFromCompanyMapping(string userId,string companyId, bool IsActive, bool IsHOD, bool? emailNotification=false);
        string LockUserAccount(string userId, bool IsActive);
        List<MasterItems> GetScrollableData(Guid userid, long companyid, string id, int length, string serchText, long departmentid,string fieldCode);
        Task<int> AddOrUpdateCustomerApproval(string json, string companyId, string userId);
        Task<string> GetCustomFields(string PrimaryId,string customViewId, string companyId, string moduleName, string subModuleName, string userId, string displayCode);

        Task<string> AddOrUpdateFormView(JsonModel model);
        dynamic GetConfigurationTypeFileExtensions(string configurationType, long companyId);
        MasterItems GetCustomerContactInfo(string subModuleNameCode, string serviceId, long companyId);
        string GetEcryptedId(decimal id);
        string GetFileUrl(long? accountId);
        dynamic GetopportunityDetailsByid(int OppId);
    }
}
