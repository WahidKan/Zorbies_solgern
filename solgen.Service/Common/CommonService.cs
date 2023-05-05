using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using TimeZoneConverter;

namespace Solgen.Service
{
    public class CommonService : ICommonService
    {
        private readonly ICommonRepository _repository;
        public CommonService(ICommonRepository repository)
        {
            _repository = repository;
        }
        /*! 
        * \brief   Get the Master Items values
        * \details Fetch the list of MasterItems based on Master Name
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */




        public List<MasterItems> GetMasterItems(string masterName, Guid uid, long CompanyID, string masterKeyText = "")
        {
            return _repository.GetMasterItemsList(masterName, uid, CompanyID, masterKeyText);
        }
        public List<MasterItems> GetMasterItemsForMultipleId(string ModuleName, Guid uid, long CompanyID, string SubModuleCode)
        {
            return _repository.GetMasterItemsForMultipleId(ModuleName, uid, CompanyID, SubModuleCode);
        }

        public List<SelectItemModel> LAAccountList()
        {
            return _repository.LAAccountList();
        }


        /*! 
        * \brief   Get the State List
        * \details Fetch the list of States based
        * \author  Kiran Bala 
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public List<SelectItemModel> GetStateList()
        {
            return _repository.GetStateList();
        }
        public List<SelectItemModel> GetStateList_V1(string code)
        {
            return _repository.GetStateList_V1(code);
        }
        /*! 
        * \brief   Get the template List
        * \details Fetch the list of template based
        * \author  deepak
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public List<SelectItemModel> GetTemplateList(long companyId)
        {
            return _repository.GetTemplateList(companyId);
        }


        /*! 
       * \brief   save connectionid for user in db
       * \details save connectionid for user in db
       * \author  Dhheraj 
       * \date    5 dec 2019
       * \version 1.0    
       */
        public bool SaveUserConnection(Guid UserID, string connID, bool logout)
        {
            return _repository.SaveUserConnection(UserID, connID, logout);
        }

        /*! 
      * \brief   get connectionid for user in db
      * \details get connectionid for user in db
      * \author  Dheeraj 
      * \date    5 dec 2019
      * \version 1.0    
      */
        public List<UsersConnections> GetConnection(Guid UserID)
        {
            return _repository.GetConnection(UserID);
        }


        /*! 
        * \brief   Delete Record from table
        * \details Function is used to delete record from the table
        * \author  Kiran Bala 
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public ChangeStatusModel DeleteRecord(string tableName, string primaryKey)
        {
            return _repository.DeleteRecord(tableName, primaryKey);
        }

        /*! 
        * \brief   Update Status
        * \details Function is used to update status(Active/inactive)
        * \author  Kiran Bala 
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public ChangeStatusModel UpdateActiveInactiveStatus(string tableName, string primaryKey, string status)
        {
            return _repository.UpdateActiveInactiveStatus(tableName, primaryKey, status);
        }
        /*! 
      * \brief   Add Notification
      * \details Function is used to add Notifications
      * \author  Kiran Bala 
      * \date    20 Sep 2019
      * \version 1.0    
      */
        public bool AddNotification(string Subject, string Message, string SenderId, string ReceiverId, string NotificationType, string NotificationUserType, string NotificationCreatedBy, string PrimaryId = "", string ModuleName = "")
        {
            NotificationModel obj = new NotificationModel();
            obj.Subject = Subject;
            obj.Message = Message;
            obj.SenderId = SenderId;
            obj.ReceiverId = ReceiverId;
            obj.NotificationType = NotificationType;
            obj.NotificationUserType = NotificationUserType;
            obj.NotificationCreatedBy = NotificationCreatedBy;
            obj.PrimaryId = PrimaryId;
            obj.ModuleName = ModuleName;

            return _repository.AddNotification(obj);
        }
        /*! 
        * \brief   Add Notification
        * \details Function is used to add Notifications
        * \author  Kiran Bala 
        * \date    20 Sep 2019
        * \version 1.0    
        */
        public bool AddActivityLog(string UserID, string IPAddress, string WebBrowser, string OSBrowser, string ActionType, string Detail, string Message = "")
        {
            ActivityLogListModel obj = new ActivityLogListModel();
            obj.UserID = UserID;
            obj.IPAddress = IPAddress;
            obj.WebBrowser = WebBrowser;
            obj.OSBrowser = OSBrowser;
            obj.ActionType = ActionType;
            obj.Detail = Detail;
            obj.Message = Message;
            return _repository.AddActivityLog(obj);
        }
        /*! 
        * \brief   Ge tHeaderData
        * \details Function is used to get Notification Count, UserType for Header
        * \author  Kiran Bala 
        * \date    20 Sep 2019
        * \version 1.0    
        */
        public HeaderDataMode GetHeaderData(string UserID)
        {
            return _repository.GetHeaderData(UserID);
        }


        public Task<List<CustomView>> GetCustomViewbyId(Int64 id)
        {
            return _repository.GetCustomViewbyId(id);
        }

        /*! 
        * \brief   Get User Module Permission List
        * \details Fetch the Get User Module Permission List
        * \author  Kiran Bala 
        * \date    16 Oct 2019
        * \version 1.0    
        */
        public List<RoleModules> GetUserModulePermissionList(Guid? userId = null, bool isApplyRole = false, string companyid = "")
        {
            return _repository.GetUserModulePermissionList(userId, isApplyRole, companyid);
        }
        public string GetNotificationByOperationUser(string Id, string siteLink)
        {
            return _repository.GetNotificationByOperationUser(Id, siteLink);
        }


        public string AddDataFormJsonFormat(DepartementModel model)

        {
            return _repository.AddDataFormJsonFormat(model);
        }
        public string UpdateScheduledAppointmentStatus(string AppId, string status)

        {
            return _repository.UpdateScheduledAppointmentStatus(AppId, status);
          
        }
        
        public string AddLoginHistory(LoginModel model, long companyid)
        {
            return _repository.AddLoginHistory(model, companyid);
        }
        public List<OperatorsItems> GetOperatorsItems(string filedNameId, Guid uid, string expression = "")
        {
            return _repository.GetOperatorsItems(filedNameId, uid);
        }

        public async Task<string> GetDepartmentsById(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetDepartmentsById(id, moduleName, submoduleName);
        }
        public dynamic GetScheduleAppointment(string userid, string companyid)
        {
            return _repository.GetScheduleAppointment(userid, companyid);
        }

        public async Task<string> GetLeadsById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            return await _repository.GetLeadsById(id, moduleName, submoduleName, userid, CompanyID);
        }

        public async Task<string> GetLenderById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            return await _repository.GetLenderById(id, moduleName, submoduleName, userid, CompanyID);
        }

        public async Task<string> GetCustomContactById(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetCustomContactById(id, moduleName, submoduleName);
        }

        public async Task<string> GetProductById(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetProductById(id, moduleName, submoduleName);
        }




        public string GetLeadListing()
        {
            return _repository.GetLeadListing();
        }

        //public string AddDataFormJsonFormat(string records, Guid? userid, string storedProcedureName)
        //{
        //    throw new NotImplementedException();
        //}
        public PagedData GetCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
long companyId)
        {
            return _repository.GetCustomViewName(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, ModuleName, SubModuleName, companyId);
        }


        public PagedData GetCustomViewNameWithCountForWidgets(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
long companyId)
        {
            return _repository.GetCustomViewNameWithCountForWidgets(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, ModuleName, SubModuleName, companyId);
        }

        public async Task<string> GetContractDetails(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetContractDetails(id, moduleName, submoduleName);
        }

        public async Task<string> GetProposalDetailsbyid(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetProposalDetailsbyid(id, moduleName, submoduleName);
        }
        public string AddEditCustomField(ManageLayout model)
        {
            return _repository.AddEditCustomField(model);
        }

        public Boolean DeleteRecords(string tableName, string primaryKey)
        {
            return _repository.DeleteRecords(tableName, primaryKey);
        }
        public Boolean DeleteRecords(string tableName, string primaryKey, string deletedBy)
        {
            return _repository.DeleteRecords(tableName, primaryKey, deletedBy);
        }
        public EnableAccountLogin ApproveAccount(string primaryKey, string userId, long companyid)
        {
            return _repository.ApproveAccount(primaryKey, userId, companyid);
        }
        public EnableAccountLogin DisabledAccount(string primaryKey, string userId, string companyid)
        {
            return _repository.DisabledAccount(primaryKey, userId, companyid);
        }
        // Lead Configuration Setting
        public string ManageLeadConfiguration(LeadConfigurationModel model)
        {
            return _repository.ManageLeadConfiguration(model);
        }
        public LeadConfigurationModel GetLeadConfigurationDetails(Int64? CompanyId)
        {
            return _repository.GetLeadConfigurationDetails(CompanyId);
        }

        public string GetcustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName)
        {
            return _repository.GetcustomDefaultView(view_Id, userid, companyid, moduleName, submoduleName);
        }

        public async Task<string> GetAccountById(string id, string moduleName, string submoduleName, Guid userId, long companyId)
        {
            return await _repository.GetAccountById(id, moduleName, submoduleName, userId, companyId);
        }

        public string GeProductListing()
        {
            return _repository.GeProductListing();
        }

        public Task<string> GetUserTeam(string type, string userId, long companyId)
        {
            return _repository.GetUserTeam(type, userId, companyId);
        }
        public IEnumerable<dynamic> GeHeaderCompanyList(string userId)
        {
            return _repository.GeHeaderCompanyList(userId);
        }

        public IEnumerable<dynamic> GeHeaderCompanyListForMobile(string userId, string companyType)
        {
            return _repository.GeHeaderCompanyListForMobile(userId, companyType);
        }



        public PagedData GetCompanyList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetCompanyList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
        }

        public List<dynamic> GetOperatorsByDataTypeCode(string dataTypeCode)
        {
            return _repository.GetOperatorsByDataTypeCode(dataTypeCode);
        }

        public List<dynamic> GetResultActions(long companyId, string objectName = "")
        {
            try
            {
                return _repository.GetResultActions(companyId, objectName);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string GetFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string displayCode)
        {
            return _repository.GetFormFields(companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId, displayCode);
        }

        public string GetDataForVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId)
        {
            return _repository.GetDataForVerificationList(companyId, userId, moduleName, Id, stageid, PrimaryId);
        }
        public string GetDataForBankVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId)
        {
            return _repository.GetDataForBankVerificationList(companyId, userId, moduleName, Id, stageid, PrimaryId);
        }


        public static string GetFileLink(string fileName, string type, enumFileFolder uploadFolderName)
        {
            string folderName = CommonSettings.AppSetting["CommonSettings:" + uploadFolderName.ToEnumString()];
            string domainName = CommonSettings.AppSetting["CommonSettings:SiteLink"];
            string NoImageFolder = CommonSettings.AppSetting["CommonSettings:NoImageFolder"];
            string defaultImage = CommonSettings.AppSetting["CommonSettings:NoImageName"];
            if (type == "doc")
            {
                defaultImage = CommonSettings.AppSetting["CommonSettings:NoDocImage"];
            }
            if (type == "pdf")
            {
                defaultImage = CommonSettings.AppSetting["CommonSettings:NoDocPdf"];
            }
            string fileLink = "";
            if (!string.IsNullOrEmpty(fileName)
                && !string.IsNullOrEmpty(folderName)
                && !string.IsNullOrEmpty(domainName))
            {
                if (File.Exists(Path.Combine(folderName, fileName)))
                {
                    fileLink = Path.Combine(domainName, folderName, fileName);
                }
                else
                {
                    fileLink = Path.Combine(domainName, NoImageFolder, defaultImage);
                }
            }
            else
            {
                fileLink = Path.Combine(domainName, NoImageFolder, Convert.ToString(defaultImage));
            }
            return fileLink;
        }
        public string CheckUserDuplicateORAssociate(Guid? userID, long? companyID, string emailID, Guid? uid)
        {
            return _repository.CheckUserDuplicateORAssociate(userID, companyID, emailID, uid);
        }

        public string CheckUserAssociate(Guid? userID, long? companyID, string emailID, Guid? uid)
        {
            return _repository.CheckUserAssociate(userID, companyID, emailID, uid);
        }

        public string AssociateUserWithCompany(Guid? userID, long? companyID, string emailID, Guid? uid, long? RoleID, long? userTypeId, long? deptid, bool ishod = false, bool isEnableUser = false, bool? emailNotification = false)
        {
            return _repository.AssociateUserWithCompany(userID, companyID, emailID, uid, RoleID, userTypeId, deptid, ishod, isEnableUser, emailNotification);
        }

        public async Task<string> SetPasswordStatus(string userid, long? companyID)
        {
            return await _repository.SetPasswordStatus(userid, companyID);
        }
        public async Task<string> SetCompanyMapping(string userid, int CompanyMappingStatusId, long? companyID)
        {
            return await _repository.SetCompanyMapping(userid, CompanyMappingStatusId, companyID);
        }

        public List<dynamic> GetEmailTemplateDataForReplaceContent(string objId, string templateId, Guid userid, long CompanyID)
        {
            return _repository.GetEmailTemplateDataForReplaceContent(objId, templateId, userid, CompanyID);
        }

        public List<dynamic> GetSqlNumericFunctionList(string sqlFunctionTypeCode)
        {
            try
            {
                return _repository.GetSqlNumericFunctionList(sqlFunctionTypeCode);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> GetEmploymentTypes(long companyId)
        {
            try
            {
                return await _repository.GetEmploymentTypes(companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<string> GetStageDetailsById(Guid userid, long CompanyID, long id, string moduleName)
        {
            return await _repository.GetStageDetailsById(userid, CompanyID, id, moduleName);

        }
        public string GetWelcomeCallDetails(long? accountId, string moduleName, string subModuleName, string CompanyID, Guid userId, long flowid, long stepno, string type, string buttoncode)
        {
            return _repository.GetWelcomeCallDetails(accountId, moduleName, subModuleName, CompanyID, userId, flowid, stepno, type, buttoncode);
        }

        public List<MasterItems> GetCustomFieldsDropDownList(long length, long custom_field_id, long CompanyID, Guid userId, string field_code, string serchText)
        {
            return _repository.GetCustomFieldsDropDownList(length, custom_field_id, CompanyID, userId, field_code, serchText);
        }
        public List<MasterItems> GetFixedPageScrollDropDownList(long length, long custom_field_id, long CompanyID, Guid userId, string field_code, string serchText)
        {
            return _repository.GetFixedPageScrollDropDownList(length, custom_field_id, CompanyID, userId, field_code, serchText);
        }
        public string GetSolCustomFieldsList(long companyId, Guid userId, long loanAppStageId, long PrimaryId)
        {
            return _repository.GetSolCustomFieldsList(companyId, userId, loanAppStageId, PrimaryId);
        }

        public string AddEditSolgenStageForm(SolgenStageModel model, Guid userId, long companyId)
        {
            return _repository.AddEditSolgenStageForm(model, userId, companyId);
        }

        public string MarkAsCompleteStatus(MarkAsCompleteModel model, Guid userId, long companyId)
        {
            return _repository.MarkAsCompleteStatus(model, userId, companyId);
        }
        public string GetMapView(string companyid, string moduleName, string subModuleName, Guid userId, string listFilter)
        {
            return _repository.GetMapView(companyid, moduleName, subModuleName, userId, listFilter);
        }

        public string GetGlobalSeacrchData(string listFilter, long? length, string companyid, Guid userId, string recordFilter, string teamID, string teamMemberID)
        {
            return _repository.GetGlobalSeacrchData(listFilter, length, companyid, userId, recordFilter, teamID, teamMemberID);
        }

        public async Task<string> GetGlobalSearchDataAsync(string listFilter, long? length, string companyid, Guid userId, string recordFilter, string teamID, string teamMemberID)
        {
            return await _repository.GetGlobalSearchDataAsync(listFilter, length, companyid, userId, recordFilter, teamID, teamMemberID);
        }
        public string AddErrorAndException(string exception, string url)
        {
            return _repository.AddErrorAndException(exception, url);
        }
        public async Task<string> GetLasttimeLoginForCompany(string userid, long companyid, string callFrom)
        {
            return await _repository.GetLasttimeLoginForCompany(userid, companyid, callFrom);
        }

        public List<MasterItems> GetManageViewDropDownList(long CompanyID, Guid userId, string ModuleName, string SubModuleName)
        {
            return _repository.GetManageViewDropDownList(CompanyID, userId, ModuleName, SubModuleName);
        }

        public string GetCascadingData(string id, string moduleName, string submoduleName, Guid user, long company)
        {
            return _repository.GetCascadingData(id, moduleName, submoduleName, user, company);
        }

        //========================LoanHomi Manage View Form Functions==================================

        public PagedData GetLoanHomiCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
long companyId, string listType)
        {
            return _repository.GetLoanHomiCustomViewName(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, ModuleName, SubModuleName, companyId, listType);
        }

        public Boolean DeleteLoanHomiRecords(string tableName, string primaryKey, string deletedBy)
        {
            return _repository.DeleteLoanHomiRecords(tableName, primaryKey, deletedBy);
        }
        public Boolean CheckAccountTypeIsDealer(long? accountId, Guid? userid, long CompanyID)
        {
            return _repository.CheckAccountTypeIsDealer(accountId, userid, CompanyID);
        }

        public string GetLoanHomiCustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName, string listType)
        {
            return _repository.GetLoanHomiCustomDefaultView(view_Id, userid, companyid, moduleName, submoduleName, listType);
        }
        public Task<List<CustomView>> GetLoanHomiCustomViewbyId(Int64 id)
        {
            return _repository.GetLoanHomiCustomViewbyId(id);
        }

        public string SaveLoanHomiCustomManagePopup(LoanHomiManageViewModelWithCompany model)
        {
            return _repository.SaveLoanHomiCustomManagePopup(model);
        }

        public string AddUpdateLoanApplicationReportData(LoanApplicationReportModel model)
        {
            return _repository.AddUpdateLoanApplicationReportData(model);
        }

        //public string GetLoanHomiManageViewFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        //{
        //    return _repository.GetLoanHomiManageViewFormFields(companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
        //}
        public string GetLoanHomiManageViewFormFieldsList(string fieldlistFilter, string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode, string type)
        {
            return _repository.GetLoanHomiManageViewFormFieldsList(fieldlistFilter, companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId, RefId, displayCode, type);
        }
        //========================END==================================

        public async Task<string> GetTimeZoneList()
        {
            return await _repository.GetTimeZoneList();
        }
        public string GetTimeZone(string timeZone)
        {
            if (!string.IsNullOrEmpty(timeZone))
            {
                timeZone = TZConvert.WindowsToIana(timeZone);
            }
            return timeZone;
        }

        public async Task<string> GetDocumentCategory(long campanyId)
        {
            return await _repository.GetDocumentCategory(campanyId);
        }

        public async Task<string> GetDocumentTypeByCategoryId(long categoryid, long campanyId)
        {
            return await _repository.GetDocumentTypeByCategoryId(categoryid, campanyId);
        }
        public async Task<PagedData> GetFileListForRelatedTab(string ServiceId, string categoryId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId, string moduleName, string subModuleName)
        {
            return await _repository.GetFileListForRelatedTab(ServiceId, categoryId, sortColumn, sortDir, pageIndex, pageSize, UserId, CompanyId, moduleName, subModuleName);
        }
        public async Task<int> addOrUpdateFiles(ServiceResourceFiles model)
        {
            return await _repository.addOrUpdateFiles(model);
        }
        public string getMasterItemsByCustomFieldId(long customFieldId, long companyId)
        {
            return _repository.getMasterItemsByCustomFieldId(customFieldId, companyId);
        }
        public async Task<string> GetModulesNameList(string companyId, string loginuserid, long module_id)
        {
            return await _repository.GetModulesNameList(companyId, loginuserid, module_id);
        }
        public PagedData GetSubModulesNameList(int PageNo, int PageSize, Guid? userId, long companyID, int modulecode, int submodulecode, string deviceType, string layoutType, string sortDir, string sortColumn, string filterText)
        {
            return _repository.GetSubModulesNameList(PageNo, PageSize, userId, companyID, modulecode, submodulecode, deviceType, layoutType, sortDir, sortColumn, filterText);
        }

        public string saveLayoutType(LayoutModuleModel layoutModuleModel, Guid? userid, long companyId)
        {
            return _repository.saveLayoutType(layoutModuleModel, userid, companyId);
        }

        public string GetCustomFieldsData(string companyId, string userId, string viewId)
        {
            return _repository.GetCustomFieldsData(companyId, userId, viewId);
        }

        public int addUpdateActivity(ActivityDataModel model)
        {
            return _repository.addUpdateActivity(model);
        }

        public PagedData GetActivityData(string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName, long companyId, long refid)
        {
            return _repository.GetActivityData(sortColumn, sortDir, pageIndex, pageSize, userId, ModuleName, SubModuleName, companyId, refid);
        }

        public string SaveCustomLayoutData(string jsondata, string view, Guid? userid, long companyId, string relation,string automationFlow)
        {
            return _repository.SaveCustomLayoutData(jsondata, view, userid, companyId, relation, automationFlow);
        }

        public int SaveUserDefinedCustomField(string customFieldJson, Guid? userid, long companyId, int viewId)
        {
            return _repository.SaveUserDefinedCustomField(customFieldJson, userid, companyId, viewId);
        }


        public int DeleteActivity(long Id, long companyid, Guid userid)
        {
            return _repository.DeleteActivity(Id, companyid, userid);
        }
        public async Task<string> GetDDLItemsByFieldCode(string fieldCode, string moduleCode, string submoduleCode, Guid? userid, long CompanyID)
        {
            return await _repository.GetDDLItemsByFieldCode(fieldCode, moduleCode, submoduleCode, userid, CompanyID);
        }
         public async Task<string> GetDDLItemsForRole(string fieldCode, long? accountId, Guid? userid, long CompanyID)
        {
            return await _repository.GetDDLItemsForRole(fieldCode, accountId,  userid, CompanyID);
        }

        public List<OperatorsItems> getLoanHomiOperatorsList(string filedNameId, Guid UserID, string companyid, string module_name = "")
        {
            return _repository.getLoanHomiOperatorsList(filedNameId, UserID, companyid, module_name);
        }
        public List<MasterItems> GetWorkTypeDDL(Guid userid, long companyid, string id, int length, string serchText)
        {
            return _repository.GetWorkTypeDDL(userid, companyid, id, length, serchText);
        }

        public string CloneSelectedListView(Guid UserId, long CompanyId, long ViewId, string ViewName, string listType)
        {
            return _repository.CloneSelectedListView(UserId, CompanyId, ViewId, ViewName, listType);
        }

        public int saveWelcomeCall(welcomeSaveModel model)
        {
            return _repository.saveWelcomeCall(model);
        }
        public string SaveSMSResponse(string To, string AccountSid, string ApiVersion, string MessageStatus, string SmsSid, string MessagingServiceSid, string From, string MessageSid, string SmsStatus, string body, DateTime? DateCreated, string type, long? ref_id, string ref_code, long? companyId, Guid? userId)
        {
            return _repository.SaveSMSResponse(To, AccountSid, ApiVersion, MessageStatus, SmsSid, MessagingServiceSid, From, MessageSid, SmsStatus, body, DateCreated, type, ref_id, ref_code, companyId, userId);
        }

        public string SaveReceiveSMSResponse(string ToCountry, string ToState, string SmsMessageSid, string NumMedia, string ToCity, string FromZip, string SmsSid, string FromState, string SmsStatus, string FromCity
        , string Body, string FromCountry, string To, string MessagingServiceSid, string ToZip, string NumSegments, string MessageSid, string AccountSid, string From, string ApiVersion, string type)
        {
            return _repository.SaveReceiveSMSResponse(ToCountry, ToState, SmsMessageSid, NumMedia, ToCity, FromZip, SmsSid, FromState, SmsStatus, FromCity
        , Body, FromCountry, To, MessagingServiceSid, ToZip, NumSegments, MessageSid, AccountSid, From, ApiVersion, type);
        }
        public string saveUserActivityLog(userActivityLog model)
        {
            return _repository.saveUserActivityLog(model);
        }

        public string UpdateUserProfileFromCompanyMapping(string userId, string companyId, bool IsActive, bool IsHOD, bool? emailNotification = false)
        {
            return _repository.UpdateUserProfileFromCompanyMapping(userId, companyId, IsActive, IsHOD, emailNotification);
        }

        public string LockUserAccount(string userId, bool IsActive)
        {
            return _repository.LockUserAccount(userId, IsActive);
        }

        public List<MasterItems> GetScrollableData(Guid userid, long companyid, string id, int length, string serchText, long departmentid, string fieldCode)
        {
            return _repository.GetScrollableData(userid, companyid, id, length, serchText, departmentid, fieldCode);
        }
        public Task<int> AddOrUpdateCustomerApproval(string json, string companyId, string userId)
        {
            return _repository.AddOrUpdateCustomerApproval(json, companyId, userId);

        }
        public async Task<string> GetCustomFields(string PrimaryId, string customViewId, string companyId, string moduleName, string subModuleName, string userId, string displayCode)
        {
            return await _repository.GetCustomFields(PrimaryId, customViewId, companyId, moduleName, subModuleName, userId, displayCode);
        }
        public async Task<string> AddOrUpdateFormView(JsonModel model)
        {
            return await _repository.AddOrUpdateFormView(model);
        }

        public dynamic GetConfigurationTypeFileExtensions(string configurationType, long companyId)
        {
            return _repository.GetConfigurationTypeFileExtensions(configurationType, companyId);
        }
        public MasterItems GetCustomerContactInfo(string subModuleNameCode, string serviceId, long companyId)
        {

            return _repository.GetCustomerContactInfo(subModuleNameCode, serviceId, companyId);

        }
        public string GetEcryptedId(decimal id)
        {
            return _repository.GetEcryptedId(id);
        }

        public string GetFileUrl(long? accountId)
        {
            return _repository.GetFileUrl(accountId);
        }
        public dynamic GetopportunityDetailsByid(int OppId)
        {
            return _repository.GetopportunityDetailsByid(OppId);
        }
    }
}
