using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using Solgen.Core;
using System.Data;
using Solgen.Core.Models;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly SolgenDbContext _dbContext;
        public DashboardRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*! 
        * \brief   Get the list of Notifications for dashboard useses
        * \details Fetch the Top 5 of Notifications
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public List<DashboardModel> GetDashboardNotifications(string name, DateTime? from, DateTime? to, string UserID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<DashboardModel> dataList = new List<DashboardModel>();
                connection.Open();
                dataList = connection.Query<DashboardModel>("sp_solgen_GetNotificationList", new { nameSearch = name, FromDateSearch = from, ToDateSearch = to, userID = UserID, IsDashborad = true }, commandType: System.Data.CommandType.StoredProcedure).ToList();

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

        public List<ContactDashboradModel> GetDashboardNewContacts(string name, DateTime? from, DateTime? to)
        {
            bool IsDashborad = true;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<ContactDashboradModel> dataList = new List<ContactDashboradModel>();
                connection.Open();
                dataList = connection.Query<ContactDashboradModel>("[sp_solgen_GetContactList]", new { name = name, FromDateSearch = from, SortDir = "DESC", SortColumn = "ContactId", PageNo = 0, PageSize = 10, ToDateSearch = to, IsDashborad = IsDashborad }, commandType: System.Data.CommandType.StoredProcedure).ToList();

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
        * \brief   Get the Dashbord Counts
        * \details Get the Dashbord Counts
        * \author  Kiran Bala
        * \date    26 Sep 2019
        * \version 1.0    
        */
        public DashboardCountsModel GetDashboardCounts(string UserID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DashboardCountsModel detail = new DashboardCountsModel();
                connection.Open();
                detail = connection.Query<DashboardCountsModel>("sp_solgen_GetDashboardCount", new { userID = UserID }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return detail;
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

        public List<DashboardTotalLeaseAmountModel> GetDashboardTotalLeaseAmount(string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<DashboardTotalLeaseAmountModel> dataList = new List<DashboardTotalLeaseAmountModel>();
                connection.Open();
                dataList = connection.Query<DashboardTotalLeaseAmountModel>("[sp_solgen_GetLeaseAmountByMonths]", new { userID = Guid.Parse(userId) }, commandType: System.Data.CommandType.StoredProcedure).ToList();
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

        public List<DashboardWidgetModel> GetDashboardWidgetforuser(string userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<DashboardWidgetModel> list = new List<DashboardWidgetModel>();
                connection.Open();
                list = connection.Query<DashboardWidgetModel>("[sp_solgen_Dashboard_Get_Widgets_For_User_RoleWise]", new
                {
                    userid = Guid.Parse(userid)
                    ,
                    companyid = companyid
                }, commandType: CommandType.StoredProcedure).ToList();
                return list;
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
        public async Task<List<DashboardWidgetModel>> GetDashboardWidgetForAddeditforuser(string userid, long companyid, string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID, string serviceTerritory, bool? isSuperAdmin, string companyType)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }
            if (serviceTerritory == "undefined" || serviceTerritory == "")
            {
                serviceTerritory = null;
            }
            if (teamID == "null")
                teamID = null;
            if (teamMemberID == "null")
                teamMemberID = null;
            if (serviceTerritory == "null")
                serviceTerritory = null;
            try
            {
                List<DashboardWidgetModel> list = new List<DashboardWidgetModel>();
                connection.Open();

                list = await Task.FromResult(connection.Query<DashboardWidgetModel>((bool)isSuperAdmin && isSuperAdmin != null ? "sp_solgen_DashboardAddEdit_Get_Widgets_For_SuperAdmin_Edit" : "sp_solgen_DashboardAddEdit_Get_Widgets_For_User_RoleWise", new
                {
                    userid = Guid.Parse(userid),
                    companyid = companyid,
                    fromDate = fromDate,
                    toDate = toDate,
                    widgetType = widgetType,
                    recordFilter = recordFilter,
                    teamID = teamID,
                    teamMemberID = teamMemberID,
                    serviceTerritory = serviceTerritory,
                    isSuperAdmin = isSuperAdmin,
                    companyType = companyType
                }, commandTimeout: 0, commandType: CommandType.StoredProcedure).ToList());
                return list;
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

        public async Task<List<dynamic>> GetDashboardWidgetsForSuperAdmin(string userid, long companyid, string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID, string serviceTerritory, bool? isSuperAdmin)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }
            if (serviceTerritory == "undefined" || serviceTerritory == "")
            {
                serviceTerritory = null;
            }
            if (teamID == "null")
                teamID = null;
            if (teamMemberID == "null")
                teamMemberID = null;
            if (serviceTerritory == "null")
                serviceTerritory = null;
            try
            {
                List<dynamic> list = new List<dynamic>();
                connection.Open();

                list = await Task.FromResult(connection.Query<dynamic>("sp_solgen_DashboardAddEdit_Get_Widgets_For_SuperAdmin" , new
                {
                    userid = Guid.Parse(userid),
                    companyid = companyid,
                    fromDate = fromDate,
                    toDate = toDate,
                    widgetType = widgetType,
                    recordFilter = recordFilter,
                    teamID = teamID,
                    teamMemberID = teamMemberID,
                    serviceTerritory = serviceTerritory
                }, commandTimeout: 0, commandType: CommandType.StoredProcedure).ToList());
                return list;
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

        public int SaveWidget(long companyid, string userid, string dashborddata)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                //sp_solgen_Dashboard_Save_Widgets1232
                var result = connection.Query<int>("[sp_solgen_DashBoardWidgetUserMapping]", new { companyid = companyid, userid = Guid.Parse(userid), dashborddata = dashborddata }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public List<DashboardWidgetcountmodel> GetDashboardWidgetcount(string userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<DashboardWidgetcountmodel> datalist = new List<DashboardWidgetcountmodel>();
                connection.Open();
                datalist = connection.Query<DashboardWidgetcountmodel>("sp_solgen_GetDashboard_WidgetCount", new
                { userid = userid }, commandType: CommandType.StoredProcedure).ToList();
                return datalist;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
                throw;
            }
        }

        public List<DashboardTaskList> GetTaskList(Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<DashboardTaskList> dataList = new List<DashboardTaskList>();
                connection.Open();
                dataList = connection.Query<DashboardTaskList>("[sp_solgen_DashboardTaskList]", new { UserId = userid, companyid = companyid }, commandType: System.Data.CommandType.StoredProcedure).ToList();
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
        public List<DashboardOpportunityGraphModel> GetOpportunityGraph(string userId, long companyid, string fromDate, string toDate)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }
            try
            {
                List<DashboardOpportunityGraphModel> dataList = new List<DashboardOpportunityGraphModel>();
                connection.Open();
                dataList = connection.Query<DashboardOpportunityGraphModel>("[sp_solgen_GetOpportunityGraph]", new
                {
                    userID = Guid.Parse(userId),
                    companyid = companyid,
                    fromDate = fromDate,
                    toDate = toDate
                }, commandType: System.Data.CommandType.StoredProcedure).ToList();
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

        public int GetRefIntervalTime(string userId, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                int list = connection.Query<int>("sp_GetReferenceIntervalTime", new { userID = Guid.Parse(userId), companyid = companyid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return (list);
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

        public List<DashboardLeadGraphModel> GetLeadGraph(string userId, long companyid, string fromDate, string toDate)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }

            try
            {
                List<DashboardLeadGraphModel> dataList = new List<DashboardLeadGraphModel>();
                connection.Open();
                dataList = connection.Query<DashboardLeadGraphModel>("[sp_solgen_GetLeadGraph]", new
                {
                    userID = Guid.Parse(userId),
                    companyid = companyid
                    ,
                    fromDate = fromDate,
                    toDate = toDate

                }, commandType: System.Data.CommandType.StoredProcedure).ToList();
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
        public List<DashboardOpportunityOwnerModel> GetOpportunityOwnerGraph(string userId, long companyid, string fromDate, string toDate)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }
            try
            {
                List<DashboardOpportunityOwnerModel> dataList = new List<DashboardOpportunityOwnerModel>();
                connection.Open();
                dataList = connection.Query<DashboardOpportunityOwnerModel>("[sp_solgen_GetOpportunityOwnerGraph]", new
                {
                    userID = Guid.Parse(userId),
                    companyid = companyid,
                    fromDate = fromDate,
                    toDate = toDate
                }, commandType: System.Data.CommandType.StoredProcedure).ToList();
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

        public List<DashboardAppointmentList> GetDashboardAppointmentList(Guid userid, long companyid, string fromDate, string toDate)
        {
            if (toDate == "undefined" || toDate == "")
            {
                toDate = null;
            }
            if (fromDate == "undefined" || fromDate == "")
            {
                fromDate = null;
            }

            List<DashboardAppointmentList> list = new List<DashboardAppointmentList>();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                list = connection.Query<DashboardAppointmentList>("sp_solgen_GetDashboard_AppointmentList", new { userid = userid, companyid = companyid, fromDate = fromDate, toDate = toDate }, commandType: CommandType.StoredProcedure).ToList();
                return list;
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



        public List<dynamic> GetCustomerDocumentsCount(string contactId,long oppId, string companyId = "")
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetCustomerDocumentsCount",
                   param: new
                   {
                       companyId = companyId,
                       contactId = contactId,
                       OppId= oppId

                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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
        public dynamic GetCompanyAccountData(string userId, string companyId = "", string oppId = null)
        {
          
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var dataList = connection.Query("sp_solgen_GetCompanyAccountData",
                   param: new
                   {
                       UserId = userId,
                       companyID = companyId,
                       OppId= oppId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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

        public dynamic GetServiceAppointmentData(string oppId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var dataList = connection.Query("sp_solgen_GetServiceAppointmentData",
                   param: new
                   {
                      
                       OppId = oppId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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


        public dynamic GetCustomerAnnouncements(string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var dataList = connection.Query("sp_solgen_GetCustomerAnnouncement",
                   param: new
                   {

                       companyId = companyId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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


        public dynamic GetProposalAndContractStatus(string CompanyId,string proposalId,string subModuleCode)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var dataList = connection.Query("sp_zolar_get_document_mapping_by_submodule",
                   param: new
                   {
                       companyId = CompanyId,
                       proposalId = proposalId,
                       subModuleCode = subModuleCode
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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


        public dynamic GetUnsignedDocument(string CompanyId, string opportunityId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var dataList = connection.Query("sp_zolar_get_document_mapping_by_submodule_unsignedDocument",
                   param: new
                   {
                       companyId = CompanyId,
                       opportunityId = opportunityId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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


        public dynamic GetContractData(string userid, string companyId, string OpportunityId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var dataList = connection.Query("sp_solgen_GetContractData",
                   param: new
                   {
                       UserId = userid,
                       companyID = companyId,
                       @OpportunityId = OpportunityId,                     
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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
        public dynamic GetHtmlTemplates(string userId, string companyId = "")
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var dataList = connection.Query("sp_solgen_GetHtmlTemplates",
                   param: new
                   {
                       UserId = userId,
                       companyID = companyId

                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return dataList;
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

        //public CustomerDashboardData GetCustommerOpportunity(string userId, string companyId = "")
        //{
        //    CustomerDashboardData list = new CustomerDashboardData();
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
        //        connection.Open();
        //        using (var multi = connection.QueryMultiple("sp_solgen_GetCustommerDashboardDataForOpprotunitySingle", new { UserId = userId, companyID = companyId }, commandType: System.Data.CommandType.StoredProcedure))
        //        {
        //            list.CustomerDashboardDataList = multi.Read<CustommerDashboardListData>().ToList();
        //            if (list != null)
        //                list.PrimaryContactList = multi.Read<PrimaryContactModel>().ToList();
        //            //if (list.OpportunityOwnerList!=null && list.OpportunityOwnerList.Count() > 0)
        //            list.OpportunityOwnerList = multi.Read<OpportunityOwnerModel>().ToList();
        //            //if (list.UpcommingAppointsList.Count() > 0)
        //            list.UpcommingAppointsList = multi.Read<UpcommingAppoints>().ToList();
        //        }
        //        return list;
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

        public List<MasterItems> GetCustommerOpportunity(string userId, string companyId = "")
        {
            CustomerDashboardData list = new CustomerDashboardData();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();
                dataList = connection.Query<MasterItems>("sp_solgen_GetCustomerOpportunitiesList",
                    new { userid = userId, CompanyID = companyId }
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


        public CustomerDashboardLoanApplicationData GetCustommerLoanApplication(string userId, long? id, string companyId = "")
        {
            CustomerDashboardLoanApplicationData list = new CustomerDashboardLoanApplicationData();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                // This SP is user for ready To use [sp_solgen_GetCustommerDashboardDataForOpprotunity]
                connection.Open();
                using (var multi = connection.QueryMultiple("sp_solgen_GetCustommerDashboardDataForLoanApplication", new { UserId = userId, id = id, companyID = companyId }, commandType: System.Data.CommandType.StoredProcedure))
                {
                    list.LoanApplicationNumber = multi.Read<LoanApplicationNumber>().ToList();
                    if (list != null)
                        list.LoanApplicationDetail = multi.Read<LoanApplicationDetail>().ToList();
                    //if (list.OpportunityOwnerList!=null && list.OpportunityOwnerList.Count() > 0)
                    list.ProductDetail = multi.Read<ProductDetail>().ToList();
                    //if (list.UpcommingAppointsList.Count() > 0)
                    list.FinanceDetail = multi.Read<FinanceDetail>().ToList();
                    list.LoanApplicationPaymentDetails = multi.Read<LoanApplicationPaymentDetails>().ToList();
                    list.SalesRapeLoanApplicationDetail = multi.Read<SalesRapeLoanApplicationDetail>().ToList();
                }
                return list;
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




        public List<AppointmentForLoanApplicationModel> GetCustommerLoanApplicationAppointment(string userid, string companyId)
        {
            List<AppointmentForLoanApplicationModel> list = new List<AppointmentForLoanApplicationModel>();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                list = connection.Query<AppointmentForLoanApplicationModel>("sp_solgen_GetCustommerDashboardAppointment", new { companyId = companyId, userId = userid }, commandType: CommandType.StoredProcedure).ToList();
                return list;
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
        public AccountDetailModel GetAccounDetails(string userid, string id, long companyId,string domainUrl)
        {
            AccountDetailModel list = new AccountDetailModel();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                list = connection.Query<AccountDetailModel>("sp_solgen_GetAccountDetail", new { AccountId = id, userId = userid, CompanyId = companyId,DomainUrl = domainUrl }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return list;
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

        public IEnumerable<dynamic> ContactList(string listFilte, string sortColumn, string sortDir, string page, string pageSizeValue, string loginuserid, string accountId, long companyid)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetAccontDetailListing", new
                {
                    searchName = listFilte,
                    accountId = accountId,
                    userId = loginuserid,
                    CompanyID = companyid
                }, commandType: CommandType.StoredProcedure).ToList();

                return data;
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


        public PagedData GetRelatedContactList(string listFilte, string sortColumn, string sortDir, int page, int pageSizeValue, string loginuserid, string accountId, long companyID, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query("[sp_solgen_GetRelatedContactList]", param: new
                {
                    accountId = accountId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    page = page,
                    pageSizeValue = pageSizeValue,
                    userId = loginuserid,
                    CompanyID = companyID
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return new PagedData(data, page, pageSizeValue);

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


        public EnableAccountLogin AddUpdateEnableLogin(EnableAccountLogin model, string userid, string companyid, string accountId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@primaryKey", accountId);
                parameters.Add("@companyids", companyid);
                parameters.Add("@createdBy", userid);
                parameters.AddSingleTableType("@SolgenEnableTableType", "dbo.SolgenEnableAccountLogin", model);
                var _status = connection.QueryFirstOrDefault<EnableAccountLogin>("[sp_solgen_AccountApproveForAccountAndOpportunity]"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                //connection.Open();
                //var _status = connection.Query<EnableAccountLogin>("[sp_solgen_AccountApprove1]",
                //    new { jsonData = model, createdBy = userid, @companyIDs = companyid }, commandType: System.Data.CommandType.StoredProcedure).ToList();
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
        public List<loanApplicationEnableAccountForIncompleteModel> LoanApplicationEnableAccountForIncomplete(string contactUserId, string userid, string companyid)
        {
            List<loanApplicationEnableAccountForIncompleteModel> list = new List<loanApplicationEnableAccountForIncompleteModel>();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                list = connection.Query<loanApplicationEnableAccountForIncompleteModel>("[sp_solgen_GetLoanapplicationAssignedDetailForDisabledUser]",
                    new { contactUserId = contactUserId, companyid = Convert.ToInt64(companyid) }, commandType: CommandType.StoredProcedure).ToList();
                return list;
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
        public List<GetloanApplicationStageModel> GetLoanApplicationStage(string userid, long companyid, long loanId)
        {
            List<GetloanApplicationStageModel> list = new List<GetloanApplicationStageModel>();
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                list = connection.Query<GetloanApplicationStageModel>("[sp_solgen_CheckDisabledUserAssociatedWIthLoanApplication]",
                    new { contactUserId = userid, companyid = companyid, loanId = loanId }, commandType: CommandType.StoredProcedure).ToList();
                return list;
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
        public async Task<string> GetLoanStages(Guid userid, long CompanyID, long applicationid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetLoanApplicationSatgeById",
                    new
                    {
                        CompanyId = CompanyID,
                        UserId = userid,
                        ApplicationId = applicationid

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
        public EnableAccountLogin AddUpdateEnableLoginDelete(EnableAccountLogin model, string userid, string companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@primaryKey", "");
                parameters.Add("@companyids", companyid);
                parameters.Add("@createdBy", userid);
                parameters.Add("@Email", model.Email);
                var _status = connection.QueryFirstOrDefault<EnableAccountLogin>("sp_solgen_GetAccontDeactiveUser"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                //connection.Open();
                //var _status = connection.Query<EnableAccountLogin>("[sp_solgen_AccountApprove1]",
                //    new { jsonData = model, createdBy = userid, @companyIDs = companyid }, commandType: System.Data.CommandType.StoredProcedure).ToList();
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

        public IEnumerable<dynamic> GetRoleListForEnableLogin(string userid, string companyid, string accountId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetEnableLoginUserRole",
                    new
                    {
                        userId = userid,
                        companyId = companyid,
                        accountId = accountId
                    }
                   , commandType: CommandType.StoredProcedure).ToList();
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
        public List<LoanApplicationNotications> LoanApplicationNotificationForCustommer(string userid, string companyId, string Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<LoanApplicationNotications>("sp_solgen_CustommerDashboardNoticationForLoanApplication", new
                {
                    userid = userid,
                    companyId = companyId,
                    Id = Id
                }, commandType: CommandType.StoredProcedure).ToList();

                return data;
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

        public string AssociateUserWithCompany(string userId, string CompanyID, string emailID, string uid, string RoleID, string userTypeId, string PrimaryKey)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_AccountApproveForMappingTableOnly", new
                {
                    primaryKey = PrimaryKey,
                    createdBy = userId,
                    companyID = CompanyID,
                    RoleID = RoleID,
                    emailId = emailID
                }, commandType: CommandType.StoredProcedure);

                return data;
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

        public string CheckUserDuplicateORAssociate(string UserID, string CompanyID, string emailID, string uid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_Check_User_Duplicate_OR_Associate_EnableAccountLogin", new
                {
                    EmailId = emailID,
                    id = uid,
                    companyID = CompanyID,
                    userId = UserID
                }, commandType: CommandType.StoredProcedure);

                return data;
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
        public async Task<string> GetKyiOverviewData(long companyId, Guid? UserId, DateTime starttime, DateTime endtime, int teritoryId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();


               
                var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetKYI_Overview_Data]",
                param: new
                {
                    CompanyId = companyId,
                    UserId = UserId,
                    startdate = starttime,
                    enddate = endtime,
                    teritoryId= teritoryId

                },
                commandType: CommandType.StoredProcedure);

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

        public string checkUserSession()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var result =  connection.ExecuteScalar<string>("[Sp_Solgen_checkUserSession]",
                param: new{ },commandType: CommandType.StoredProcedure);

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

        public bool checkUserStatus(string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                //var sql = "select top 1 isdeleted from aspnetusers where id= @userid";
                //var result = connection.Query<bool>(sql, parameters).FirstOrDefault();
                var result = connection.ExecuteScalar<bool>("[Sp_Solgen_checkUserStatus]",
                param: new { userid = userId }, commandType: CommandType.StoredProcedure);


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
    }
}
