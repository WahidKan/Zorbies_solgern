using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;

namespace Solgen.Service
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;
        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }
        /*! 
        * \brief   Get dashboard new contact list.
        * \details function is used to Get dashboard new contact list.
        * \author  Deepak jha.
        * \date    16 August 2019
        * \version 1.0    
        */
        public List<ContactDashboradModel> GetDashboardNewContacts(string name, DateTime? from, DateTime? to)
        {
            return _dashboardRepository.GetDashboardNewContacts(name, from, to);
        }
        /*! 
       * \brief   Get dashboard notification.
       * \details function is used to Get dashboard notification.
       * \author  Deepak jha.
       * \date    16 August 2019
       * \version 1.0    
       */
        public List<DashboardModel> GetDashboardNotifications(string name, DateTime? from, DateTime? to, string userID)
        {
            return _dashboardRepository.GetDashboardNotifications(name, from, to, userID);
        }
        /*! 
       * \brief   Get dashboard Counts.
       * \details function is used to Get dashboard Counts.
       * \author  Deepak jha.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public DashboardCountsModel GetDashboardCounts(string userID)
        {
            return _dashboardRepository.GetDashboardCounts(userID);
        }
        /*! 
       * \brief   Get dashboard total amounts.
       * \details function is used to Get dashboard total amounts.
       * \author  Deepak jha.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public List<DashboardTotalLeaseAmountModel> GetDashboardTotalLeaseAmount(string userId)
        {
            return _dashboardRepository.GetDashboardTotalLeaseAmount(userId);
        }

        public List<DashboardWidgetModel> GetDashboardWidgetforuser(string userId, long companyid)
        {
            return  _dashboardRepository.GetDashboardWidgetforuser(userId, companyid);
        }
        public async Task<List<DashboardWidgetModel>> GetDashboardWidgetForAddeditforuser(string userId, long companyid, string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID, string serviceTerritory, bool? isSuperAdmin, string companyType)
        {
            return await _dashboardRepository.GetDashboardWidgetForAddeditforuser(userId, companyid, fromDate, toDate, widgetType, recordFilter, teamID, teamMemberID,serviceTerritory, isSuperAdmin, companyType);
        }
        public async Task<List<dynamic>> GetDashboardWidgetsForSuperAdmin(string userId, long companyid, string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID, string serviceTerritory, bool? isSuperAdmin)
        {
            return await _dashboardRepository.GetDashboardWidgetsForSuperAdmin(userId, companyid, fromDate, toDate, widgetType, recordFilter, teamID, teamMemberID, serviceTerritory, isSuperAdmin);
        }

        public int SaveWidget(long companyid, string userid, string dashborddata)
        {
            return _dashboardRepository.SaveWidget(companyid, userid, dashborddata);
        }

        public List<DashboardWidgetcountmodel> GetDashboardWidgetcount(string userid)
        {
            return _dashboardRepository.GetDashboardWidgetcount(userid);
        }
        public List<DashboardTaskList> GetTaskList(Guid userid, long companyid)
        {
            return _dashboardRepository.GetTaskList(userid, companyid);
        }
        public List<DashboardOpportunityGraphModel> GetOpportunityGraph(string userId, long companyid, string fromDate, string toDate)
        {
            return _dashboardRepository.GetOpportunityGraph(userId, companyid,fromDate,toDate);
        }

        public int GetRefIntervalTime(string userId, long companyid)
        {
            return _dashboardRepository.GetRefIntervalTime(userId, companyid);
        }


        public List<DashboardLeadGraphModel> GetLeadGraph(string userId, long companyid, string fromDate, string toDate)
        {
            return _dashboardRepository.GetLeadGraph(userId, companyid,fromDate,toDate);
        }
        public List<DashboardOpportunityOwnerModel> GetOpportunityOwnerGraph(string userId, long companyid, string fromDate, string toDate)
        {
            return _dashboardRepository.GetOpportunityOwnerGraph(userId, companyid,fromDate,toDate);
        }

        public List<DashboardAppointmentList> GetDashboardAppointmentList(Guid userid, long companyid,string fromDate, string toDate)
        {
            return _dashboardRepository.GetDashboardAppointmentList(userid,companyid,fromDate,toDate);
        }

        //public CustomerDashboardData GetCustommerOpportunity(string userId, string companyId = "")
        //{
        //    return _dashboardRepository.GetCustommerOpportunity(userId, companyId);
        //}
        public List<MasterItems> GetCustommerOpportunity(string userId, string companyId = "")
        {
            return _dashboardRepository.GetCustommerOpportunity(userId, companyId);
        }
        public dynamic GetCompanyAccountData(string userId, string companyId = "", string oppId=null)
        {
            return _dashboardRepository.GetCompanyAccountData(userId, companyId, oppId);
        }

        public dynamic GetServiceAppointmentData(string oppId)
        {
            return _dashboardRepository.GetServiceAppointmentData(oppId);
        }

        public dynamic GetCustomerAnnouncements(string companyId)
        {
            return _dashboardRepository.GetCustomerAnnouncements(companyId);
        }

        public dynamic GetProposalAndContractStatus(string CompanyId, string proposalId, string subModuleCode)
        {
            return _dashboardRepository.GetProposalAndContractStatus(CompanyId,proposalId,subModuleCode);
        }

        public dynamic GetUnsignedDocument(string CompanyId, string opportunityId)
        {
            return _dashboardRepository.GetUnsignedDocument(CompanyId, opportunityId);
        }

        public dynamic GetContractData(string userid, string companyId, string OpportunityId)
        {
            return _dashboardRepository.GetContractData(userid, companyId, OpportunityId);
        }
        public dynamic GetHtmlTemplates(string userId, string companyId = "")
        {
            return _dashboardRepository.GetHtmlTemplates(userId, companyId);
        }
        public List<dynamic> GetCustomerDocumentsCount(string contactId, long oppId, string companyId = "")
        {
            return _dashboardRepository.GetCustomerDocumentsCount(contactId, oppId, companyId);
        }

      

        public CustomerDashboardLoanApplicationData GetCustommerLoanApplication(string userId, long? id, string companyId = "")
        {
            return _dashboardRepository.GetCustommerLoanApplication(userId, id, companyId);
        }
        public List<AppointmentForLoanApplicationModel> GetCustommerLoanApplicationAppointment(string userid, string companyId)
        {
            return _dashboardRepository.GetCustommerLoanApplicationAppointment(userid, companyId);
        }
        public AccountDetailModel GetAccounDetails(string userid, string id, long companyId,string domainUrl)
        {
            return _dashboardRepository.GetAccounDetails(userid, id,companyId, domainUrl);
        }
        public EnableAccountLogin AddUpdateEnableLogin(EnableAccountLogin model, string userid, string companyid, string accountId)
        {
            return _dashboardRepository.AddUpdateEnableLogin(model, userid, companyid, accountId);
        }
        public EnableAccountLogin AddUpdateEnableLoginDelete(EnableAccountLogin model, string userid, string companyid)
        {
            return _dashboardRepository.AddUpdateEnableLoginDelete(model, userid, companyid);
        }

        public List<loanApplicationEnableAccountForIncompleteModel> LoanApplicationEnableAccountForIncomplete(string contactUserId, string userid, string companyid)
        {
            return _dashboardRepository.LoanApplicationEnableAccountForIncomplete(contactUserId, userid, companyid);
        }
        public List<GetloanApplicationStageModel> GetLoanApplicationStage(string userid, long companyid, long loanId)
        {
            return _dashboardRepository.GetLoanApplicationStage(userid, companyid, loanId);
        }
        public async Task<string> GetLoanStages(Guid userid, long CompanyID, long applicationid)
        {
            return await _dashboardRepository.GetLoanStages(userid, CompanyID, applicationid);

        }
        public string checkUserSession()
        {
          return  this._dashboardRepository.checkUserSession();
        }
        public IEnumerable<dynamic> ContactList(string listFilte, string sortColumn, string sortDir, string page, string pageSizeValue, string loginuserid, string accountId, long companyid)
        {
            return _dashboardRepository.ContactList(listFilte, sortColumn, sortDir, page, pageSizeValue, loginuserid,  accountId,companyid);
        }

        public PagedData GetRelatedContactList(string listFilte, string sortColumn, string sortDir, int page, int pageSizeValue, string loginuserid, string accountId, long companyid, Guid? userId)
        {
         return _dashboardRepository.GetRelatedContactList(listFilte, sortColumn, sortDir, page, pageSizeValue, loginuserid, accountId, companyid, userId);
        }

    public IEnumerable<dynamic> GetRoleListForEnableLogin(string userid, string companyid,string accountId)
        {
            return _dashboardRepository.GetRoleListForEnableLogin(userid, companyid, accountId);
        }
        public List<LoanApplicationNotications> LoanApplicationNotificationForCustommer(string userid, string companyId, string Id)
        {
            return _dashboardRepository.LoanApplicationNotificationForCustommer(userid,companyId,Id);
        }

        public string AssociateUserWithCompany(string userId, string CompanyID, string emailID, string uid, string RoleID, string userTypeId, string PrimaryKey)
        {
            return _dashboardRepository.AssociateUserWithCompany(userId,CompanyID,emailID,uid,RoleID,userTypeId,PrimaryKey);
        }

        public string CheckUserDuplicateORAssociate(string UserID, string CompanyID, string emailID, string uid)
        {
            return _dashboardRepository.CheckUserDuplicateORAssociate(UserID, CompanyID, emailID, uid);
        }
        public async Task<string> GetKyiOverviewData(long companyId, Guid? UserId,  DateTime starttime, DateTime endtime, int teritoryId)
        {
            return await _dashboardRepository.GetKyiOverviewData(companyId, UserId, starttime, endtime,teritoryId);
        }

        public bool checkUserStatus(string userId)
        {
            return _dashboardRepository.checkUserStatus(userId);
        }
    }
}
