using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IDashboardService
    {
        List<DashboardModel> GetDashboardNotifications(string name, DateTime? From, DateTime? To, string userID);
        List<ContactDashboradModel> GetDashboardNewContacts(string name, DateTime? from, DateTime? to);
        DashboardCountsModel GetDashboardCounts(string userID);
        List<DashboardTotalLeaseAmountModel> GetDashboardTotalLeaseAmount(string userId);
        List<DashboardWidgetModel> GetDashboardWidgetforuser(String userId, long companyid);
        Task<List<DashboardWidgetModel>> GetDashboardWidgetForAddeditforuser(string userid, long companyid, string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID, string serviceTerritory, bool? isSuperAdmin, string companyType);
        Task<List<dynamic>> GetDashboardWidgetsForSuperAdmin(string userid, long companyid, string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID, string serviceTerritory, bool? isSuperAdmin);
        int SaveWidget(long companyid, string userid, string dashborddata);
        List<DashboardWidgetcountmodel> GetDashboardWidgetcount(string userid);

        List<DashboardTaskList> GetTaskList(Guid userid, long companyid);
        List<DashboardOpportunityGraphModel> GetOpportunityGraph(string userId, long companyid, string fromDate, string toDate);

        int GetRefIntervalTime(string userId, long companyid);
        bool checkUserStatus(string userId);

        List<DashboardLeadGraphModel> GetLeadGraph(string userId, long companyid, string fromDate, string toDate);
        List<DashboardOpportunityOwnerModel> GetOpportunityOwnerGraph(string userId, long companyid, string fromDate, string toDate);


        List<DashboardAppointmentList> GetDashboardAppointmentList(Guid userid, long companyid, string fromDate, string toDate);
        //CustomerDashboardData GetCustommerOpportunity(string userId, string companyId = "");
        List<MasterItems> GetCustommerOpportunity(string userId, string companyId = "");
        dynamic GetCompanyAccountData(string userId, string companyId = "",string oppId=null);
        dynamic GetServiceAppointmentData(string oppId);

        dynamic GetCustomerAnnouncements(string companyId);
        dynamic GetProposalAndContractStatus(string CompanyId, string proposalId, string subModuleCode);
        dynamic GetUnsignedDocument(string CompanyId, string opportunityId);
        dynamic GetContractData(string userid, string companyId, string OpportunityId);
        dynamic GetHtmlTemplates(string userId, string companyId = "");
        List<dynamic> GetCustomerDocumentsCount(string contactId, long oppId, string companyId = "");

      

        CustomerDashboardLoanApplicationData GetCustommerLoanApplication(string userId, long? id, string companyId = "");
        List<AppointmentForLoanApplicationModel> GetCustommerLoanApplicationAppointment(string userid, string companyId);
        AccountDetailModel GetAccounDetails(string userid, string id, long companyId,string domainUrl);

        EnableAccountLogin AddUpdateEnableLogin(EnableAccountLogin model, string userid, string companyid, string accountId);
        EnableAccountLogin AddUpdateEnableLoginDelete(EnableAccountLogin model, string userid, string companyid);
        List<loanApplicationEnableAccountForIncompleteModel> LoanApplicationEnableAccountForIncomplete(string contactUserId, string userid, string companyid);
       List<GetloanApplicationStageModel> GetLoanApplicationStage(string userid,long companyid,long loanId);
       
        Task<string> GetLoanStages(Guid userid, long CompanyID, long applicationid);
        IEnumerable<dynamic> ContactList(string listFilte, string sortColumn, string sortDir, string page, string pageSizeValue, string loginuserid, string accountId, long companyid);

        PagedData GetRelatedContactList(string listFilte, string sortColumn, string sortDir, int page, int pageSizeValue, string loginuserid, string accountId, long companyid, Guid? userId);
        IEnumerable<dynamic> GetRoleListForEnableLogin(string userid, string companyid, string accountId);
        List<LoanApplicationNotications> LoanApplicationNotificationForCustommer(string userid, string companyId, string Id);
       string  AssociateUserWithCompany(string userId, string CompanyID, string emailID, string uid, string RoleID, string userTypeId, string PrimaryKey);

      string  CheckUserDuplicateORAssociate(string UserID, string CompanyID, string emailID, string uid);
      string checkUserSession();
        Task<string> GetKyiOverviewData(long companyId, Guid? UserId,  DateTime starttime, DateTime endtime, int teritoryId);
    }
}
