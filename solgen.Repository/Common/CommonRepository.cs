using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using System.Data;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Solgen.Repository
{
    public class CommonRepository : ICommonRepository
    {
        private readonly SolgenDbContext _dbContext;

        public CommonRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }



        /*! 
        * \brief   Get the Master Items values
        * \details Fetch the list of MasterItems based on Master Name
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \Parameter   masterName:comma seperated MasterNamesTitle
        * \version 1.0    
        */
        public List<MasterItems> GetMasterItemsList(string masterName, Guid uid, long CompanyID, string masterKeyText = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();
                //var masterKeytext = masterKeyText == "" ? string.Empty : masterKeyText;
                dataList = connection.Query<MasterItems>("sp_solgen_GetMasterItems",
                    new { MasterItems = masterName, userid = uid, MasterText = masterKeyText == "" ? null : masterKeyText, CompanyID = CompanyID }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }



        /*! 
    * \brief   Get Listing of account type .
    * \details Get Listing of account type  
    * \author  Dheeraj
    * \date    11 oct 2020
    * \version 1.0    
    */
        public List<SelectItemModel> LAAccountList()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModel> stateList = new List<SelectItemModel>();
                connection.Open();
                stateList = connection.Query<SelectItemModel>("sp_solgen_GetLAAccountType", new { }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return stateList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<MasterItems> GetMasterItemsForMultipleId(string masterName, Guid uid, long CompanyID, string masterKeyText = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (masterName == "null" || masterName == null)
                {
                    masterName = "";
                }

                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();
                dataList = connection.Query<MasterItems>("sp_solgen_GetMasterItems", new { MasterItems = masterKeyText, userid = uid, MasterText = masterName, CompanyID = CompanyID }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   Get the State list
        * \details Fetch the list of States
        * \author  Kiran Bala 
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public List<SelectItemModel> GetStateList()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModel> stateList = new List<SelectItemModel>();
                connection.Open();
                stateList = connection.Query<SelectItemModel>("sp_solgen_GetState", new { }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return stateList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<SelectItemModel> GetStateList_V1(string countryCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModel> stateList = new List<SelectItemModel>();
                connection.Open();
                stateList = connection.Query<SelectItemModel>("sp_solgen_GetState_V1", 
            new {
                countryCode= countryCode
            }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return stateList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        /*! 
    * \brief   get Template list for dropdown list
    * \details get Template list for dropdown list
    * \author  Deepak jha 
    * \date    6 jan 2020
    * \version 1.0    
    */
        public List<SelectItemModel> GetTemplateList(long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModel> stateList = new List<SelectItemModel>();
                connection.Open();
                stateList = connection.Query<SelectItemModel>("sp_solgen_GetTemplateList", new { CompanyId = companyId }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return stateList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
    * \brief   get connectionid for user in db
    * \details get connectionid for user in db
    * \author  Dhheraj 
    * \date    5 dec 2019
    * \version 1.0    
    */
        public List<UsersConnections> GetConnection(Guid UserID)
        {
            List<UsersConnections> _status = new List<UsersConnections>();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<UsersConnections>("sp_solgen_getuserconnection", new { UserID = UserID }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
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
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_updateuserconnection", new { UserID = UserID, connID = connID, logout = logout }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
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
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                ChangeStatusModel _status = connection.Query<ChangeStatusModel>("sp_solgen_Delete", new { primaryKey = primaryKey, tableName = tableName }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
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
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                ChangeStatusModel _status = connection.Query<ChangeStatusModel>("sp_solgen_UpdateStatus", new { PrimaryKey = primaryKey, TableName = tableName, ActiveInactiveStatus = status }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   Add Notification
        * \details Function is used to add Notifications
        * \author  Kiran Bala 
        * \date    19 Sep 2019
        * \version 1.0    
        */
        public bool AddNotification(NotificationModel model)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_AddNotification", new
                {
                    Subject = model.Subject,
                    Message = model.Message,
                    SenderID = model.SenderId,
                    ReceiverId = model.ReceiverId,
                    NotificationType = model.NotificationType,
                    NotificationUserType = model.NotificationUserType,
                    NotificationCreatedBy = model.NotificationCreatedBy,
                    ModulePrimaryId = model.PrimaryId,
                    ModuleName = model.ModuleName
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
      * \brief   Add Acitivity Log
      * \details Function is used to add Activity Log
      * \author  Kiran Bala 
      * \date    20 Sep 2019
      * \version 1.0    
      */
        public bool AddActivityLog(ActivityLogListModel model)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_AddActivityLog", new
                {
                    ActivityUserId = model.UserID,
                    ActivityIPAddress = model.IPAddress,
                    ActivityWebBrowser = model.WebBrowser,
                    ActivityOperatingSystem = model.OSBrowser,
                    ActivityActionType = model.ActionType,
                    ActivityDetail = model.Detail,
                    Message = model.Message
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   Get Header Data
        * \details Function is used to get Notification Count, UserType for Header
        * \author  Kiran Bala 
        * \date    30 Sep 2019
        * \version 1.0    
        */
        public HeaderDataMode GetHeaderData(string id)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                HeaderDataMode data = _connection.QuerySingleOrDefault<HeaderDataMode>("sp_solgen_GetHeaderData", new { UserId = id }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
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
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<RoleModules> dataList = new List<RoleModules>();
                connection.Open();
                dataList = connection.Query<RoleModules>("sp_solgen_GetRolesForUser", new { userID = userId, isApplyRole = isApplyRole, companyid = companyid }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public string GetNotificationByOperationUser(string Id, string siteLink)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                string data = _connection.QuerySingleOrDefault<string>("sp_solgen_SendReminderNotifications", new { Userid = Id, EditUrl = siteLink }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public string UpdateScheduledAppointmentStatus(string AppId, string status)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                
                string data = _connection.QuerySingleOrDefault<string>("[Sp_Solgen_AppointmentAttendance]", new
                {
                    Id = Convert.ToInt32(AppId),
                    Status = status

                },
                commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string AddDataFormJsonFormat(DepartementModel model)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (model.departmentId == null)
                    model.departmentId = "0";
                string data = _connection.QuerySingleOrDefault<string>("[sp_solgen_AddEditDepartment_custom1]", new
                {
                    JSON = model.FormJsonData,
                    departmentId = model.departmentId,
                    USER_ID = model.userId,
                    module_code = model.moduleCode,
                    submodule_code = model.subModuleCode
                },
                commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string AddLoginHistory(LoginModel model, long companyid)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                string data = _connection.QuerySingleOrDefault<string>("[sp_solgen_addloginhistory]", new
                {
                    email_id = model.UserName,
                    browser_os = model.Browser,
                    ip_adrress = model.IPAddress,
                    user_agent = model.OS,
                    companyid = companyid
                },
                commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<OperatorsItems> GetOperatorsItems(string filedNameId, Guid uid, string expression = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<OperatorsItems> dataList = new List<OperatorsItems>();
                connection.Open();
                dataList = connection.Query<OperatorsItems>("sp_solgen_GetOperators", new { FIELD_ID = filedNameId, Module_Name = "" }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


       
        public async Task<string> GetDepartmentsById(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetDepartmentByDeptAutoId",
                    new
                    {
                        departmetId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic GetScheduleAppointment(string userid, string companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data =  connection.Query<dynamic>("sp_solgen_GetAppointmentForLoginUsers", param: new
                {
                    UserId = userid,
                    CompanyId = companyid
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetLeadsById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLeadByLeadId",
                    new
                    {
                        leadId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<dynamic> GetEmailTemplateDataForReplaceContent(string objId, string templateId, Guid userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetCustomFieldWithValueForEmailTemplateContentReplace",
                    new
                    {
                        objId = objId,
                        templateId = templateId,
                        userId = userid,
                        companyId = CompanyID
                    }, commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> GetLenderById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLenderByLenderId",
                    new
                    {
                        ID = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public async Task<string> GetCustomContactById(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_CustomContactListingById",
                    new
                    {
                        ContactId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetProductById(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_ProductListingById",
                    new
                    {
                        productId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public async Task<string> GetAccountById(string id, string moduleName, string submoduleName, Guid userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetAccountById",
                    new
                    {
                        accountId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName,
                        userId = userId,
                        companyId = companyId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetLeadListing()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Custom_Lead_Listing"
                   , commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string GeProductListing()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Custom_Product_Listing"
                   , commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetUserTeam(string type, string userId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetTeam_ByUserId_test",
                     new
                     {
                         userId = userId,
                         companyIDs = companyId,
                         type = type

                     }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public PagedData GetCompanyList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetHeaderCompanies",
                    new
                    {
                        userId = userId
                    }, commandType: CommandType.StoredProcedure).ToList();
                return new PagedData(data, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public IEnumerable<dynamic> GeHeaderCompanyList(string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetHeaderCompanies",
                    new
                    {
                        userId = userId
                    }
                   , commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public IEnumerable<dynamic> GeHeaderCompanyListForMobile(string userId, string companyType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetHeaderCompaniesForMobile",
                    new
                    {
                        userId = userId,
                        comptype = companyType
                    }
                   , commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        //public string AddDataFormJsonFormat(string records, Guid? userid, string storedProcedureName)
        //{
        //    throw new NotImplementedException();
        //}

        public PagedData GetCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
        long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetCustomViewListing",
                    new
                    {
                        ModuleName = ModuleName,
                        SubModuleName = SubModuleName,
                        nameSearch = nameSearch,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyId
                        // ModuleName = "lead",
                        // SubModuleName = "lead"
                    }, commandType: CommandType.StoredProcedure).ToList();
                return new PagedData(data, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetCustomViewNameWithCountForWidgets(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
       long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetCustomViewListing_COUNT",
                    new
                    {
                        ModuleName = ModuleName,
                        SubModuleName = SubModuleName,
                        nameSearch = nameSearch,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyId
                        // ModuleName = "lead",
                        // SubModuleName = "lead"
                    }, commandType: CommandType.StoredProcedure).ToList();
                return new PagedData(data, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string AddEditCustomField(ManageLayout model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_AddCustomView", new
                {
                    CompanyId = model.CompanyId,
                    moduleName = model.moduleName,
                    subModuleName = model.subModuleName,
                    defaultSectionData = model.defaultSectionData,
                    DynamicSectionData = model.DynamicSectionData,
                    selectedFields = "",
                    defaultSectionGroupName = model.defaultSectionGroupName,
                    dynamicSectionGroupName = model.dynamicSectionGroupName,
                    CreatedByID = model.CreatedByID,
                    Id = "",
                },
            commandType: System.Data.CommandType.StoredProcedure);

                return _status;
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public async Task<List<CustomView>> GetCustomViewbyId(Int64 id)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {

                List<CustomView> dataList = new List<CustomView>();
                dataList = (List<CustomView>)await _connection.QueryAsync<CustomView>("sp_solgen_GetCustomViewValues", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure);
                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<string> GetContractDetails(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetContractById",
                    new
                    {
                        ContractId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetProposalDetailsbyid(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetProposalById",
                    new
                    {
                        ProposalId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public Boolean DeleteRecords(string tableName, string primaryKey, string deletedBy)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<Boolean>("sp_solgen_Delete_Ids", new { primaryKey = primaryKey, tableName = tableName, deletedBy = deletedBy }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public EnableAccountLogin ApproveAccount(string primaryKey, string userId, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<EnableAccountLogin>("[sp_solgen_AccountApprove1]",
                    new { primaryKey = Convert.ToInt32(primaryKey), createdBy = userId, @companyIDs = companyid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public EnableAccountLogin DisabledAccount(string primaryKey, string userId, string companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<EnableAccountLogin>("[sp_solgen_DisableAccountLogin]",
                    new { primaryKey = Convert.ToInt32(primaryKey), createdBy = userId, @companyIDs = companyid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        /*! 
         * \brief   Add Edit Bank detail
         * \details function is used to add/edit Bank
         * \author  Kiran Bala 
         * \date    16 Sep 2019
         * \version 1.0    
         */
        public string ManageLeadConfiguration(LeadConfigurationModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                long? id = 0;
                if (model.Id > 0) { id = model.Id; }
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_SaveLeadConfiguration", new
                {
                    Id = id,
                    IsLoanapplication = model.IsLoanapplication,
                    IsOpportunity = model.IsOpportunity,
                    IsAccount = model.IsAccount,
                    IsContact = model.IsContact,
                    CompanyId = model.CompanyId,
                    moduleWizard = model.moduleWizard
                }, commandType: System.Data.CommandType.StoredProcedure);

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public LeadConfigurationModel GetLeadConfigurationDetails(Int64? CompanyId)
        {


            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                LeadConfigurationModel retdataList = new LeadConfigurationModel();
                connection.Open();
                retdataList = connection.QueryFirstOrDefault<LeadConfigurationModel>("sp_solgen_GetLeadConfiguration", new { CompanyId }, commandType: System.Data.CommandType.StoredProcedure);
                return retdataList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetcustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                string data = connection.ExecuteScalar<string>("sp_solgen_SaveCustomDefaultView", new { view_Id = view_Id, userid = userid, companyid = companyid, moduleName = moduleName, submoduleName = submoduleName }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<dynamic> GetOperatorsByDataTypeCode(string dataTypeCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("DATA_TYPE_CODE", dataTypeCode, DbType.String);
                return connection.Query("sp_solgen_GetOperatorsByDataTypeCode", parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<dynamic> GetResultActions(long companyId,string objectName = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("companyId", companyId, DbType.Int64);
                parameters.Add("objectName", objectName);
                return connection.Query("sp_solgen_Get_ResultActions", parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public string GetFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_form_Fields_Dynamic_Data",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = strType,
                        OTHER_DATA = "",
                        USER_ID = Id,
                        //displayCode = displayCode
                        //TYPE=strType,
                        //SEARCH=search,
                        IS_FOR = isFor,
                        //REF_ID=isRef
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetDataForVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_get_app_verification_data",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        stageid = stageid,
                        USER_ID = Id
                        //TYPE=strType,
                        //SEARCH=search,
                        //IS_FOR=isFor,
                        //REF_ID=isRef
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetDataForBankVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (stageid == "undefined")
                stageid = "";
            try
            {
              
                connection.Open();
                var data = connection.Query<string>("sp_solgen_get_bank_verification_data",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        stageid = stageid,
                        USER_ID = Id
                        //TYPE=strType,
                        //SEARCH=search,
                        //IS_FOR=isFor,
                        //REF_ID=isRef
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string CheckUserDuplicateORAssociate(Guid? userID, long? companyID, string emailID, Guid? uid)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<string>("sp_solgen_Check_User_Duplicate_OR_Associate", new
                {
                    userId = userID,
                    CompanyId = companyID,
                    EmailId = emailID,
                    id = uid
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public string CheckUserAssociate(Guid? userID, long? companyID, string emailID, Guid? uid)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<string>("sp_solgen_Check_User_Associate", new
                {
                    userId = userID,
                    CompanyId = companyID,
                    EmailId = emailID,
                    id = uid
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public string AssociateUserWithCompany(Guid? userID, long? companyID, string emailID, Guid? uid, long? RoleID, long? userTypeId, long? deptid, bool ishod = false, bool isEnableUser = false, bool? emailNotification = false)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<string>("sp_solgen_Associate_User_WithCompany", new
                {
                    userId = userID,
                    CompanyId = companyID,
                    EmailId = emailID,
                    id = uid,
                    RoleID = RoleID,
                    userTypeId = userTypeId,
                    deptid = deptid,
                    ishod = ishod,
                    EmailNotification = emailNotification
                    //isEnableUser= isEnableUser
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public string AssociateUserWithCompany(Guid? userID, long? companyID, string emailID, Guid? uid, long? RoleID, long? userTypeId)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<string>("sp_solgen_Associate_User_WithCompany", new
                {
                    userId = userID,
                    CompanyId = companyID,
                    EmailId = emailID,
                    id = uid,
                    RoleID = RoleID,
                    userTypeId = userTypeId,
                    //isEnableUser = isEnableUser
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> SetCompanyMapping(string userid, int CompanyMappingStatusId, long? companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_SaveUserCompanyMapping",
                     new
                     {
                         UserId = userid,
                         CompanyId = companyID,
                         CompanyMappingStatusId = CompanyMappingStatusId
                     }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> SetPasswordStatus(string userid, long? companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_UpdatePasswordStatus",
                     new
                     {
                         userId = userid,
                         CompanyId = companyID
                     }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<dynamic> GetSqlNumericFunctionList(string sqlFunctionTypeCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetSqlFunctionList", new { sqlFunctionTypeCode = sqlFunctionTypeCode }, commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetStageDetailsById(Guid userid, long CompanyID, long id, string moduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetStageDetailsById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        Id = id,
                        ModuleName = moduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetEmploymentTypes(long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", companyId);
                var data = await connection.ExecuteScalarAsync<string>("sp_solgen_GetEmploymentTypes", parameters, null, 30, CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetWelcomeCallDetails(long? accountId, string moduleName, string subModuleName, string CompanyID, Guid userId, long flowid, long stepno, string type, string buttoncode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_Flow_Details_2",
                    new
                    {
                        ID = accountId,
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = subModuleName,
                        COMPANY_ID = CompanyID,
                        USER_ID = userId,
                        flow_id = flowid,
                        step_no = stepno,
                        type = type,
                        buttoncode = buttoncode
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<MasterItems> GetCustomFieldsDropDownList(long length, long custom_field_id, long companyID, Guid userId, string field_code, string serchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();
                dataList = connection.Query<MasterItems>("sp_solgen_GetCustomFieldsDropDownList",
                    new { Length = length, Custom_field_id = custom_field_id, CompanyID = companyID, UserId = userId, Field_code = field_code, SerchText = serchText }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<MasterItems> GetFixedPageScrollDropDownList(long length, long custom_field_id, long CompanyID, Guid userId, string field_code, string serchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();
                dataList = connection.Query<MasterItems>("sp_solgen_GetFixedPageDropdownscroll",
                    new { Length = length, Custom_field_id = custom_field_id, CompanyID = CompanyID, UserId = userId, Field_code = field_code, SerchText = serchText }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public string GetSolCustomFieldsList(long companyId, Guid userId, long loanAppStageId, long PrimaryId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_SolCustomFields_List",
                    new
                    {

                        COMPANY_ID = companyId,
                        USER_ID = userId,
                        LoanAppStageId = loanAppStageId,
                        PRIMARY_KEY_VALUE = PrimaryId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string AddEditSolgenStageForm(SolgenStageModel model, Guid UserId, long CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.Id);
                // parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (UserId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (CompanyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditSolgenStageForm_custom"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public string MarkAsCompleteStatus(MarkAsCompleteModel model, Guid UserId, long CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.Id);
                parameters.Add("@USER_ID", (UserId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (CompanyId));
                parameters.Add("@StageId", model.StageId);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_MarkAsCompleteStatus"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public string GetMapView(string companyid, string moduleName, string subModuleName, Guid userId, string listFilter)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_Map_View",
                    new
                    {
                        COMPANY_ID = Convert.ToInt32(companyid),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = subModuleName,
                        @SEARCH_CONDITION = listFilter,
                        USER_ID = userId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetGlobalSeacrchData(string listFilter, long? length, string companyid, Guid userId, string recordFilter, string teamID, string teamMemberID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (recordFilter == "null")
                {
                    recordFilter = null;
                }
                if (teamID == "null")
                {
                    teamID = null;
                }
                if (teamMemberID == "null")
                {
                    teamMemberID = null;
                }
                if (listFilter == "null")
                {
                    listFilter = null;
                }
                var data = connection.Query<string>("sp_solgen_GetGlobalSeacrchData_length",
                    new
                    {
                        COMPANY_ID = Convert.ToInt32(companyid),
                        SEARCHText = listFilter,
                        USER_ID = userId,
                        Length = length,
                        recordFilter = recordFilter,
                        teamID = teamID,
                        teamMemberID = teamMemberID
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public async Task<string> GetGlobalSearchDataAsync(string listFilter, long? length, string companyid, Guid userId, string recordFilter, string teamID, string teamMemberID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (recordFilter == "null")
                {
                    recordFilter = null;
                }
                if (teamID == "null")
                {
                    teamID = null;
                }
                if (teamMemberID == "null")
                {
                    teamMemberID = null;
                }
                if (listFilter == "null")
                {
                    listFilter = null;
                }
                var data = await connection.QueryFirstOrDefaultAsync<string>("sp_solgen_GetGlobalSeacrchData_length",
                    new
                    {
                        COMPANY_ID = Convert.ToInt32(companyid),
                        SEARCHText = listFilter,
                        USER_ID = userId,
                        Length = length,
                        recordFilter = recordFilter,
                        teamID = teamID,
                        teamMemberID = teamMemberID
                    }, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string AddErrorAndException(string exception, string url)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@exception", exception);
                parameters.Add("@url", url);
                string data = connection.QueryFirstOrDefault<string>("sp_Solgen_ErrorForApi"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> GetLasttimeLoginForCompany(string userid, long companyid, string callFrom)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userid", userid);
                parameters.Add("@CompanyId", companyid);
                parameters.Add("@CallFrom", callFrom);
                string data = connection.QueryFirstOrDefault<string>("sp_Solgen_LastLoginFromCompanyForLoginProcess"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<MasterItems> GetManageViewDropDownList(long CompanyID, Guid userId, string ModuleName, string SubModuleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();

                dataList = connection.Query<MasterItems>("sp_solgen_GetManageViewDDl_List",
                    new { CompanyID = CompanyID, userId = userId, ModuleName = ModuleName, SubModuleName = SubModuleName }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetCascadingData(string id, string moduleName, string submoduleName, Guid user, long company)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetCascadingData",
                    new
                    {
                        COMPANY_ID = Convert.ToInt32(company),
                        USER_ID = user,
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = submoduleName,
                        KEY_VALUE = id
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        //========================LoanHomi Manage View Form Functions==================================

        public PagedData GetLoanHomiCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
   long companyId, string listType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetLoanHomiCustomViewListing",
                    new
                    {
                        ModuleName = ModuleName,
                        SubModuleName = SubModuleName,
                        nameSearch = nameSearch,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyId,
                        ListType = listType
                    }, commandType: CommandType.StoredProcedure).ToList();
                return new PagedData(data, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public Boolean DeleteLoanHomiRecords(string tableName, string primaryKey, string deletedBy)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<Boolean>("sp_solgen_DeleteLoanHomi_Ids", new { primaryKey = primaryKey, tableName = tableName, deletedBy = deletedBy }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetLoanHomiCustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName, string listType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                string data = connection.ExecuteScalar<string>("sp_solgen_SaveLoanHomiCustomDefaultView", new { view_Id = view_Id, userid = userid, companyid = companyid, moduleName = moduleName, submoduleName = submoduleName, ListType = listType }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<List<CustomView>> GetLoanHomiCustomViewbyId(Int64 id)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {

                List<CustomView> dataList = new List<CustomView>();
                dataList = (List<CustomView>)await _connection.QueryAsync<CustomView>("sp_solgen_GetLoanHomiCustomViewValues", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure);
                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public string SaveLoanHomiCustomManagePopup(LoanHomiManageViewModelWithCompany model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_AddLoanHomiCustomView", new
                {
                    ModuleName = model.ModuleName,
                    SubModuleName = model.SubModuleName,
                    view_name = model.select,
                    view_for = model.radiogroup,
                    searchFilter = model.customWhereCondition,
                    selectedFields = model.selectedFields,
                    userid = model.CreatedByID,
                    view_id = model.Id,
                    searchFilter_Json = model.view_searchFilterJson,
                    companyid = model.CompanyID,
                    Roles = model.Roles,
                    ManageViewFor = model.manage_view_for
                },
            commandType: System.Data.CommandType.StoredProcedure); ;

                return _status;
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public string AddUpdateLoanApplicationReportData(LoanApplicationReportModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                if (model.companyType == "companytypeSolarInstall" || model.companyType == "companytypeCRMLoanInstall" || model.companyType == "companytypeFinancialInstitute")
                {
                     _status = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateCustomReportsData", new
                    {
                        ReportName = model.ReportName,
                        ModuleId = model.moduleId,
                        SubModuleId = model.subModuleId,
                        SearchFilter = model.customWhereCondition,
                        SelectedFields = model.selectedFields,
                        Userid = model.CreatedByID,
                        DateFrom = model.DateFrom,
                        DateTo = model.DateTo,
                        ReportId = model.Id,
                        filtertype = model.filterType,
                        Report_searchFilterJson = model.report_searchFilterJson,
                        isCountWidget=model.isCountWidget,
                        isChartView=model.isChartView,
                        isListView=model.isListView,
                        Companyid = model.CompanyID,
                        Roles = model.Roles,
                        ApplyTo = model.radiogroup,
                        ChartViewYAxis=model.chartViewYAxis,
                        ChartType=model.chartType,
                        ListViewFieldsId = model.listViewFields,
                        RadioChartBtn=model.radioChartBtn,
                        ChartSelectedRole=model.chartSelectedRole,
                        ListViewRadioBtn = model.listViewRadioBtn,
                        ListViewselectedRole = model.listViewselectedRole,
                        ReportIconClass = model.reportIconClass,
                        ReportIconSpanColorClass = model.reportIconSpanColorClass,
                        CompanyType = model.companyType
                    },
                      commandType: System.Data.CommandType.StoredProcedure); ;
                      return _status;
                }
            
                else
                {
                    _status = connection.QueryFirstOrDefault<string>("sp_solgen_AddUpdateLoanApplicationReportData", new
                    {
                        ReportName = model.ReportName,
                        Description = model.Description,
                        SearchFilter = model.customWhereCondition,
                        SelectedFields = model.selectedFields,
                        Userid = model.CreatedByID,
                        DateFrom = model.DateFrom,
                        DateTo = model.DateTo,
                        ReportId = model.Id,
                        filtertype = model.filterType,
                        Report_searchFilterJson = model.report_searchFilterJson,
                        Companyid = model.CompanyID,
                        ChartType = model.chartType,
                        GroupByFieldId = model.groupByFieldId,
                    },
                    commandType: System.Data.CommandType.StoredProcedure); 
                    return _status;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        //public string GetLoanHomiManageViewFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        var data = connection.Query<string>("sp_solgen_Custom_Get_Custom_Fields_Dynamic",
        //            new
        //            {
        //                PRIMARY_KEY_VALUE = PrimaryId,
        //                COMPANY_ID = Convert.ToInt32(companyId),
        //                MODULE_NAME = moduleName,
        //                SUB_MODULE_CODE = strType,
        //                OTHER_DATA = "",
        //                USER_ID = Id,
        //                RefId = RefId,
        //                displayCode = displayCode,
        //                isFor = isFor//1 Feb-- Opportunity/Lead/Account --- Add Contact
        //            }, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //        return data;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == ConnectionState.Open)
        //            connection.Close();
        //    }
        //}
        public string GetLoanHomiManageViewFormFieldsList(string fieldlistFilter, string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode, string type)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Custom_GetLoanHomi_Manage_View_Form_Fields_Dynamic",
                    new
                    {
                        FieldlistFilter = fieldlistFilter,
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = strType,
                        OTHER_DATA = "",
                        USER_ID = Id,
                        RefId = RefId,
                        displayCode = displayCode,
                        Type = type
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<OperatorsItems> getLoanHomiOperatorsList(string filedNameId, Guid UserID,string companyid, string module_name = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<OperatorsItems> dataList = new List<OperatorsItems>();
                connection.Open();

                //if (companyid =="1003")
                //{
                //    dataList = connection.Query<OperatorsItems>("sp_solgen_GetFilterOperators", new { CustomFieldId = filedNameId, UserID= UserID, Companyid= companyid ,Module_Name = module_name }, commandType: System.Data.CommandType.StoredProcedure).ToList();
                //}
                //else
                //{
                    dataList = connection.Query<OperatorsItems>("sp_solgen_GetOperators", new { FIELD_ID = filedNameId, Module_Name = module_name }, commandType: System.Data.CommandType.StoredProcedure).ToList();
                //}

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        //========================END==================================


        public async Task<string> GetTimeZoneList()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var timeZoneList = await connection.ExecuteScalarAsync<string>("sp_solgen_GetTimeZoneList", new { }, commandType: System.Data.CommandType.StoredProcedure);

                return timeZoneList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetDocumentCategory(long campanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var docmentCatgoryList = await connection.ExecuteScalarAsync<string>("sp_solgen_GetDocumentCategory", new { CompanyId = campanyId }, commandType: System.Data.CommandType.StoredProcedure);

                return docmentCatgoryList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetDocumentTypeByCategoryId(long categoryid, long campanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var documentTypelist = await connection.ExecuteScalarAsync<string>("sp_solgen_GetDocumentTypeByCategoryId", new { CategoryId = categoryid, CompanyId = campanyId }, commandType: System.Data.CommandType.StoredProcedure);

                return documentTypelist;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<PagedData> GetFileListForRelatedTab(string ServiceId, string categoryId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId, string moduleName, string subModuleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetServiceResourceFileList",
                param: new
                {
                    CompanyId = CompanyId,
                    ServiceId = ServiceId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex),
                    moduleName = moduleName,
                    subModuleName = subModuleName,
                    categoryId = categoryId
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<int> addOrUpdateFiles(ServiceResourceFiles model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (model.description == "null")
                {
                    model.description = null;
                }

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@FileName", (model.FileName));
                parameters.Add("@FileUrl", (model.FileUrl));
                parameters.Add("@Filetype", ((model.filetype == "null") ? null : model.filetype));
                parameters.Add("@moduleName", (model.moduleName));
                parameters.Add("@SubModuleName", model.SubModuleName);
                parameters.Add("@type", model.Type);
                parameters.Add("@UserId", model.Userid);
                parameters.Add("@companyId", model.CompanyId);
                parameters.Add("@Description", model.description);
                parameters.Add("@DoumentTitle", model.documentTitle);
                parameters.Add("@isMediaServer", model.isMediaServer);
                parameters.Add("@CategoryId", model.categoryId == "null" ? null : model.categoryId);
                parameters.Add("@IsFinalized", model.IsFinalized); //Used for proposal generated documented! Nazia
                //parameters.Add("@accountid", model.accountid);
                int data = await connection.QueryFirstOrDefaultAsync<int>("SP_Solgen_AddServiceResourceFile"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetModulesNameList(string companyId, string loginuserid, long module_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ModuleID", module_id);
                parameters.Add("@Userid", loginuserid);
                parameters.Add("@companyId", companyId);

                var formnumber = await connection.ExecuteScalarAsync<string>("sp_solgen_GetModuleSubmodule", parameters, commandType: CommandType.StoredProcedure);
                return formnumber;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetSubModulesNameList(int PageNo, int PageSize, Guid? userId, long companyID, int modulecode, int submodulecode, string deviceType, string layoutType, string sortDir, string sortColumn, string filterText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetModuleSubmoduleDetails_v1", param: new
                {
                    modulecode = modulecode,
                    submodulecode = submodulecode,
                    deviceType = deviceType,
                    layoutType = layoutType,
                    sortDir = sortDir,
                    sortColumn = sortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    filter = filterText

                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, PageNo, PageSize);

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public string saveLayoutType(LayoutModuleModel layoutModuleModel, Guid? userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@DisplayName", layoutModuleModel.displayName);
                parameters.Add("@LayoutName", layoutModuleModel.layoutName);
                parameters.Add("@CompanyID", companyId);
                parameters.Add("@ModuleID", layoutModuleModel.moduleid);
                parameters.Add("@SubModuleID", layoutModuleModel.submoduleid);
                parameters.Add("@Description", layoutModuleModel.layoutNameDesc);
                parameters.Add("@Device", layoutModuleModel.deviceid);
                parameters.Add("@LayoutType", layoutModuleModel.layoutTypeid);

                var formnumber = connection.QueryFirstOrDefault<string>("sp_solgen_SAVE_NEW_Layout_Type_v1"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return formnumber;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetCustomFieldsData(string companyId, string Id, string viewId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_Get_Custom_Fields_Layout_Detail_v1",
                //var data = connection.QueryFirstOrDefault<string>("sp_solgen_Get_Custom_Fields_Layout_Detail_v2",
                new
                {
                        COMPANY_ID = Convert.ToInt32(companyId),
                        VIEW_ID = viewId,
                        USER_ID = Id
                    }, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public int addUpdateActivity(ActivityDataModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@call_purpose", model.call_purpose);
                parameters.Add("@contactid", model.contactid);
                parameters.Add("@message", model.message);
                parameters.Add("@scheduleDate", (model.scheduleDate));
                parameters.Add("@priority", model.priority);
                parameters.Add("@SubModuleCode", model.SubModuleCode);
                parameters.Add("@ModuleCode", model.ModuleCode);
                parameters.Add("@companyid", model.companyid);
                parameters.Add("@userid", model.userid);
                parameters.Add("@ref_id", model.ref_id);
                parameters.Add("@subject", model.subject);
                parameters.Add("@activity_type", model.activity_type);
                parameters.Add("@activityStatus", model.activityStatus);
                //parameters.Add("@accountid", model.accountid);
                int data = connection.QueryFirstOrDefault<int>("sp_solgen_Add_Edit_Activity_Tabs"
                                                                     , parameters, commandType: CommandType.StoredProcedure);


                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string getMasterItemsByCustomFieldId(long customFieldId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@customFieldId", customFieldId);
                parameters.Add("@companyId", companyId);

                var data = connection.ExecuteScalar<string>("SP_Solgen_GetMasterItemByCustomFieldId"
                                                                     , parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetActivityData(string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName, long companyId, long refid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetActivityList",
                    new
                    {
                        ModuleName = ModuleName,
                        SubModuleName = SubModuleName,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyId,
                        refid = refid
                    }, commandType: CommandType.StoredProcedure).ToList();
                return new PagedData(data, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveCustomLayoutData(string jsondata, string view, Guid? userid, long companyId, string relation,string automationFlow)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@view", view);
                parameters.Add("@userID", userid);
                parameters.Add("@JSON", jsondata);
                parameters.Add("@relation", relation);
                parameters.Add("@CompanyID", companyId);
                parameters.Add("@AutomationFlow", automationFlow);
                // var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_SAVE_CUSTOM_LAYOUT_DATA_v2"
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_SAVE_CUSTOM_LAYOUT_DATA_v1"
                                                                      , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leasenumber;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public int SaveUserDefinedCustomField(string customFieldJson, Guid? userid, long companyId, int viewId)
		{

            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
			{
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@customFieldJson", customFieldJson);
                parameters.Add("@userid", customFieldJson);
                parameters.Add("@companyId", companyId);
                parameters.Add("@viewId", viewId);
                var  result = connection.QueryFirstOrDefault<int>("sp_save_user_defined_custom_field"
                                                                      , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public int DeleteActivity(long Id, long companyid, Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<int>("sp_solgen_Delete_Activity", new { Id = Id, companyid = companyid, userid = userid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetDDLItemsByFieldCode(string fieldCode, string moduleCode, string submoduleCode, Guid? userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = await connection.QueryFirstOrDefaultAsync<string>("sp_solgen_GetDDLListByFiledCode",
                    new
                    {
                        fieldCode = fieldCode,
                        moduleCode = moduleCode,
                        userid = userid.ToString(),
                        companyId = CompanyID
                    }, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> GetDDLItemsForRole(string fieldCode, long? accountId, Guid? userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = await connection.QueryFirstOrDefaultAsync<string>("sp_solgen_GetDDLItemsForRole",
                    new
                    {
                        FieldCode = fieldCode,
                        AccountId = accountId,
                        userid = userid.ToString(),
                        companyId = CompanyID
                    }, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public Boolean CheckAccountTypeIsDealer(long? accountId, Guid? userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<Boolean>("sp_solgen_CheckAccountTypeIsDealer", new { AccountId = accountId, Userid = userid, CompanyID = CompanyID }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetFileUrl(long? accountId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_imageUrl", new { @proposalId = accountId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        

        public List<MasterItems> GetWorkTypeDDL(Guid userid, long companyid, string id, int length, string serchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("sp_solgen_GetWorkTypesDDl", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,
                    length = length,
                    serchText = serchText

                }, commandType: CommandType.StoredProcedure).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string CloneSelectedListView(Guid UserId, long CompanyId, long ViewId, string ViewName, string listType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                parameters.Add("@CompanyId", CompanyId);
                parameters.Add("@ViewId", ViewId);
                parameters.Add("@ViewName", ViewName);
                parameters.Add("@ListType", listType);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_Clone_ListView_By_Id"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leasenumber;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public int saveWelcomeCall(welcomeSaveModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                string json = JsonConvert.SerializeObject(model);

                string prepareModel = string.Concat("[", json, "]");


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@JSON", prepareModel);
                //parameters.Add("@call_purpose", model.call_purpose);
                //parameters.Add("@contactid", model.contactid);
                //parameters.Add("@message", model.message);
                //parameters.Add("@scheduleDate", (model.scheduleDate));
                //parameters.Add("@priority", model.priority);
                //parameters.Add("@SubModuleCode", model.SubModuleCode);
                //parameters.Add("@ModuleCode", model.ModuleCode);
                //parameters.Add("@companyid", model.companyid);
                //parameters.Add("@userid", model.userid);
                //parameters.Add("@ref_id", model.ref_id);
                //parameters.Add("@subject", model.subject);
                //parameters.Add("@activity_type", model.activity_type);
                //parameters.Add("@activityStatus", model.activityStatus);
                ////parameters.Add("@accountid", model.accountid);
                int data = connection.QueryFirstOrDefault<int>("sp_solgen_Save_Welcome_Call_Data"
                                                                    , parameters, commandType: CommandType.StoredProcedure);


                //int data = 1;
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveSMSResponse(string To, string AccountSid, string ApiVersion, string MessageStatus, string SmsSid, string MessagingServiceSid, string From, string MessageSid, string SmsStatus, string body, DateTime? DateCreated, string type, long? ref_id, string ref_code, long? companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@To", To);
                parameters.Add("@AccountSid", AccountSid);
                parameters.Add("@ApiVersion", ApiVersion);
                parameters.Add("@MessageStatus", MessageStatus);
                parameters.Add("@SmsSid", SmsSid);
                parameters.Add("@MessagingServiceSid", MessagingServiceSid);
                parameters.Add("@From", From);
                parameters.Add("@MessageSid", MessageSid);
                parameters.Add("@SmsStatus", SmsStatus);
                parameters.Add("@Body", body);
                parameters.Add("@Type", type);
                parameters.Add("@DateCreated", DateCreated);
                parameters.Add("@RefId", ref_id);
                parameters.Add("@RefCode", ref_code);
                parameters.Add("@CompanyId", companyId);
                parameters.Add("@UserId", userId);


                string data = connection.QueryFirstOrDefault<string>("sp_solgen_inserttwilioResponse"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveReceiveSMSResponse(string ToCountry, string ToState, string SmsMessageSid, string NumMedia, string ToCity, string FromZip, string SmsSid, string FromState, string SmsStatus, string FromCity
   , string Body, string FromCountry, string To, string MessagingServiceSid, string ToZip, string NumSegments, string MessageSid, string AccountSid, string From, string ApiVersion, string type)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ToCountry", ToCountry);
                parameters.Add("@ToState", ToState);
                //parameters.Add("@SmsMessageSid", SmsMessageSid);
                parameters.Add("@NumMedia", NumMedia);
                parameters.Add("@ToCity", ToCity);
                parameters.Add("@FromZip", FromZip);
                parameters.Add("@SmsSid", SmsSid);
                parameters.Add("@FromState", FromState);
                parameters.Add("@SmsStatus", SmsStatus);
                parameters.Add("@FromCity", FromCity);
                parameters.Add("@Body", Body);
                parameters.Add("@FromCountry", FromCountry);
                parameters.Add("@To", To);
                parameters.Add("@MessagingServiceSid", MessagingServiceSid);
                parameters.Add("@ToZip", ToZip);
                parameters.Add("@NumSegments", NumSegments);
                parameters.Add("@MessageSid", MessageSid);
                parameters.Add("@AccountSid", AccountSid);
                parameters.Add("@From", From);
                parameters.Add("@ApiVersion", ApiVersion);
                parameters.Add("@Type", type);

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_inserttwilioResponse"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }

        }
        public string saveUserActivityLog(userActivityLog model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
               DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@user_id", model.userID);
                parameters.Add("@company_id", model.companyID);
                parameters.Add("@page_url", model.pageUrl);
                parameters.Add("@redirected_from", model.redirectedFrom);

                string data = connection.QueryFirstOrDefault<string>("sp_solgen_SaveUserActiviyLog", parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string UpdateUserProfileFromCompanyMapping(string userId, string companyId, bool IsActive, bool IsHOD, bool? emailNotification = false)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userId", userId);
                parameters.Add("@companyId", companyId);
                parameters.Add("@IsHOD", IsHOD);
                parameters.Add("@IsActive", IsActive);
                parameters.Add("@EmailNotification", emailNotification);


                string data = connection.QueryFirstOrDefault<string>("sp_solgen_updateUserStatusAndHod", parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string LockUserAccount(string userId, bool isActive)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userId", userId);
                parameters.Add("@isActive", isActive);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_Lock_Unlock_UserAccount", parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<MasterItems> GetScrollableData(Guid userid, long companyid, string id, int length, string serchText, long departmentid, string fieldCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();



                var data = connection.Query<MasterItems>("[sp_solgen_GetScrollableData]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,
                    length = length,
                    serchText = serchText,
                    departmentid = departmentid,
                    fieldCode = fieldCode

                }, commandType: CommandType.StoredProcedure).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<int> AddOrUpdateCustomerApproval(string json, string companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@json", json);
                parameters.Add("@companyId", (companyId));
                parameters.Add("@userId", (userId));
                //Used for proposal generated documented! Nazia
                //parameters.Add("@accountid", model.accountid);
                int data = await connection.QueryFirstOrDefaultAsync<int>("sp_solgen_AddOrUpdateCustomerApprovalMapping"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> GetCustomFields(string PrimaryId, string customViewId, string companyId, string moduleName, string subModuleName, string userId, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (PrimaryId == "undefined")
                {
                    PrimaryId = null;
                }
                var data = await connection.ExecuteScalarAsync<string>("solgen_GetRealtedObjects_dynamic_form_view_v1",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = subModuleName,
                        USER_ID = userId,
                        displayCode = displayCode,
                        custom_view_id = customViewId
                    }, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> AddOrUpdateFormView(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                string data = await connection.QueryFirstOrDefaultAsync<string>("solgen_GetRealtedObjects_Manage_form_view_v1"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public IEnumerable<dynamic> GetRequiredCustomerFileList(string accountId, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetRequiredCustomerFileList",
                    new
                    {
                        accountId = accountId,
                        companyId = companyId
                    }
                   , commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic GetConfigurationTypeFileExtensions(string configurationType, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_GetFileTypesExtensionsByConfigurationType",
                    new
                    {
                        CompanyId = companyId,
                        ConfigurationType = configurationType
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public MasterItems GetCustomerContactInfo(string subModuleNameCode, string serviceId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_GetCustomerContactInfo",
                    new
                    {
                        companyId = companyId,
                        subModuleNameCode = subModuleNameCode,
                        serviceId = serviceId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
       public string GetEcryptedId(decimal id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_encryptId",
                    new
                    {
                        id = id,
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string AddVideoChat(string roomId, string roomName, string joinId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_AddVideoChat",
                    new
                    {
                        RoomId = roomId,
                        RoomName = roomName,
                        JoinId = joinId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetVideoDetails(string joinId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetVideoChat",
                    new
                    {
                        JoinId = joinId
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic GetopportunityDetailsByid(int OppId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_OpportunityDetailsById", param: new
                {                  
                    OppId = OppId
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }
    }
}
