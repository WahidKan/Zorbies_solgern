using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class DashboardModel
    {
        public string id { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string SenderName { get; set; }
        public string CreatedOn { get; set; }
        public string Notifications { get; set; }
        public string ReceiverName { get; set; }
        public string senderid { get; set; }
        public string receiverid { get; set; }
        public string NotificationType { get; set; }
        public string NotificationUserType { get; set; }
    }

    public class ContactDashboradModel
    {
        public Guid? ContactId { get; set; }
        public string ContactBussinessName { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactMailAddressCity { get; set; }
        public string ContactCreatedOn { get; set; }
    }
    public class DashboardCountsModel
    {
        public int TotalStaff { get; set; }
        public int TotalContact { get; set; }
        public int ActiveContact { get; set; }
        public int TotalBank { get; set; }
        public int TotalLease { get; set; }
        public int ActiveLease { get; set; }
        public int ApprovedLease { get; set; }
        public int FundedLease { get; set; }
        public int SentLease { get; set; }
    }

    public class HeaderDataMode
    {
        public string HasMore { get; set; }
        public string Total { get; set; }
        public string UserType { get; set; }
        public string ProfilePic { get; set; }
        public string CompanyName { get; set; }
        public bool IsInternalUser { get; set; }
        public string CompanyID { get; set; }
    }

    public class DashboardTotalLeaseAmountModel
    {
        public string LeaseTotalAmount { get; set; }
        public string MonthName { get; set; }
    }
    public class MonthlyLeaseTrackingReport
    {
        public MonthlyLeaseTrackingReport()
        {
            MonthlyLeaseTrackingTotalLeaseAmountModel = new List<MonthlyLeaseTrackingTotalLeaseAmountModel>();
            LeaseTrackGraphEndDateAndStartDate = new LeaseTrackGraphEndDateAndStartDate();
        }
        public List<MonthlyLeaseTrackingTotalLeaseAmountModel> MonthlyLeaseTrackingTotalLeaseAmountModel { get; set; }
        public LeaseTrackGraphEndDateAndStartDate LeaseTrackGraphEndDateAndStartDate { get; set; }
    }
    public class MonthlyLeaseTrackingTotalLeaseAmountModel
    {
        public string LeaseTotalAmount { get; set; }
        public string MonthName { get; set; }
    }
    public class LeaseTrackGraphEndDateAndStartDate
    {
        public string LastDate { get; set; }
        public string CurrentDate { get; set; }
    }
    public class DashboardWidgetModel
    {
        public int WidgetID { get; set; }
        public string WidgetName { get; set; }
        public bool isdelete { get; set; }
        public string WidgetCode { get; set; }
        public bool OnlyForHOD { get; set; }
        public bool isSelected { get; set; }
        public int WidgetGroupID { get; set; }
        public int WidgetCount { get; set; }
        public int DisplayOrder { get; set; }
        public string WidgetGroupName { get; set; }
        public string WidgetDescription { get; set; }
        public string SelectedwidgetsIds { get; set; }
        public string WidgetIconClass { get; set; }
        public string WidgetBoxClass { get; set; }
        public string WidgetTextClass { get; set; }
        public string widgetimage { get; set; }
        public string WidgetRoute { get; set; }
        public string WidgetGroupCode { get; set; }
        public string GraphType { get; set; }
        public string GraphData { get; set; }
        public long? MasterIdAuto { get; set; }
        public string ListViewData { get; set; }
        public string ReportIconClass { get; set; }
        public string ReportIconSpanColorClass { get; set; }

    }
    public class widgetModel
    {
        public int WidgetID { get; set; }
        public string WidgetName { get; set; }
        public string WidgetCode { get; set; }
        public bool OnlyForHOD { get; set; }
        public bool isSelected { get; set; }
        public int WidgetGroupID { get; set; }
        public string WidgetGroupName { get; set; }
        public string WidgetDescription { get; set; }
    }
    public class GroupwidgetModel
    {
        public int WidgetGroupID { get; set; }
        public string WidgetGroupName { get; set; }
    }
    public class DashboardWidgetcountmodel
    {
        public int Leadcount { get; set; }
        public int Appointments { get; set; }
        public int SoldRevnue { get; set; }
        public int ClosingRate { get; set; }

        public int Discovery { get; set; }
        public int ProposalRequest { get; set; }
        public int ProposalInProgress { get; set; }
        public int ProposalComplete { get; set; }
        public int ContractSent { get; set; }
        public int AggrementSigned { get; set; }
        public int Auditing { get; set; }
        public int NTP { get; set; }
        public int SiteSurvey { get; set; }
        public int Engineering { get; set; }
        public int ICP { get; set; }
        public int Install { get; set; }
        public int Inspection { get; set; }
        public int PTO { get; set; }
        public int TurnOn { get; set; }
        public int PostInstall { get; set; }
        public int Permitting_Interconnection { get; set; }
        public int NTP_Pending { get; set; }


        public int LeadCountInProgress { get; set; }
        public int LeadCountClosed { get; set; }
        public int SiteSurveyTotal { get; set; }
        public int SiteSurveyInProgress { get; set; }
        public int SiteSurveyCompleted { get; set; }
        public int DesignRequestTotal { get; set; }
        public int DesignRequestInProgress { get; set; }
        public int DesignRequestClosed { get; set; }
        public int AgreementsTotal { get; set; }
        public int PendingFunds { get; set; }
        public int NTPPendingFinance { get; set; }
        public int InstallRequestTotal { get; set; }
        public int InstallRequestInProgress { get; set; }
        public int InstallRequestCompleted { get; set; }
        public int ICPRequestTotal { get; set; }
        public int EngineeringRequestTotal { get; set; }

    }

    public class DashboardTaskList
    {
        public string TaskId { get; set; }
        public string Task { get; set; }
        public string AssignedUser { get; set; }
        public string DueDate { get; set; }
    }

    public class DashboardOpportunityGraphModel
    {
        public int StageCount { get; set; }
        public string StageName { get; set; }
    }

    public class DashboardLeadGraphModel
    {
        public int LeadStatusCount { get; set; }
        public string LeadStatus { get; set; }
    }
    public class Dashboarddata
    {
        public string data { get; set; }
    }


    public class DashboardOpportunityOwnerModel
    {
        public int OwnerCount { get; set; }
        public string OwnerName { get; set; }
    }
    public class DashboardAppointmentList
    {
        public Guid AppointmentID { get; set; }
        public string Appointment { get; set; }
        public string AssignedUser { get; set; }
        public string Fromtime { get; set; }
        public string AppointmentDueDate { get; set; }
    }
    public class AppointmentForLoanApplicationModel
    {
        public Guid? AppointmentID { get; set; }
        public string CreatedOn { get; set; }
        public string Appointment { get; set; }
        public string AssignedUser { get; set; }
        public string AppointmentDueDate { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public string TotalRecord { get; set; }
        public string Subject { get; set; }
    }
    public class LoanApplicationNotications
    {
        public string NoitficationId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string UserName { get; set; }
        public string TotalRecord { get; set; }
        public string CreateDate { get; set; }
    }
    public class CustomerDashboardLoanApplicationData
    {
        public List<LoanApplicationNumber> LoanApplicationNumber { get; set; }
        public List<LoanApplicationDetail> LoanApplicationDetail { get; set; }
        public List<ProductDetail> ProductDetail { get; set; }
        public List<FinanceDetail> FinanceDetail { get; set; }
        public List<LoanApplicationPaymentDetails> LoanApplicationPaymentDetails { get; set; }
        public List<SalesRapeLoanApplicationDetail> SalesRapeLoanApplicationDetail { get; set; }
    }
    public class SalesRapeLoanApplicationDetail
    {
        public string SaleRepEmail { get; set; }
        public string SaleRepFirstName { get; set; }
        public string SaleRepLastName { get; set; }
        public string SaleRepPhone { get; set; }
        public string ContactId { get; set; }
        public string AccountId { get; set; }
    }
    public class FinanceDetail
    {
        public string Amount { get; set; }
        public string EMI { get; set; }
    }
    public class LoanApplicationPaymentDetails
    {
        public bool AutoPaymentViaACH { get; set; }
        public string BankName { get; set; }
        public string accountHolderName { get; set; }
        public string AccountNumber { get; set; }
    }
    public class LoanApplicationNumber
    {
        public long? Id { get; set; }
        public string LoanApplocationNumber { get; set; }

        public int? IsCompletedCount { get; set; }
        public int? InProgressCount { get; set; }
        public int? TotalCount { get; set; }

    }
    public class ProductDetail
    {
        public string ProductName { get; set; }
        public string LoanRate { get; set; }
        public string LoanTerm { get; set; }
        public string EMI { get; set; }
    }
    public class LoanApplicationDetail
    {
        public long? ApplicationNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DOB { get; set; }
        public string StateName { get; set; }
        public string CountryName { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string address { get; set; }
        public string Email { get; set; }
        public string HomePhone { get; set; }
        public string BusinessPhone { get; set; }
    }
    public class CustomerDashboardData
    {
        //public string OpportunityName { get; set; }
        //public string Id { get; set; }
        //public string Country { get; set; }
        //public string Street { get; set; }

        //public string City { get; set; }
        //public string PostalCode { get; set; }
        //public string State { get; set; }
        //public string ProposalName { get; set; }
        //public string ExpirationDate { get; set; }

        //public string UserId { get; set; }
        public List<CustommerDashboardListData> CustomerDashboardDataList { get; set; }
        public List<CustomerDashboardContactData> CustomerDashboardContactDataList { get; set; }
        public List<UpcommingAppoints> UpcommingAppointsList { get; set; }
        public List<PrimaryContactModel> PrimaryContactList { get; set; }
        public List<OpportunityOwnerModel> OpportunityOwnerList { get; set; }
    }
    public class CustommerDashboardListData
    {
        public string OpportunityName { get; set; }
        public string Id { get; set; }
        public string Contacts { get; set; }
        //public string Country { get; set; }
        //public string Street { get; set; }

        //public string City { get; set; }
        //public string PostalCode { get; set; }
        //public string State { get; set; }
        //public string ProposalName { get; set; }
        //public string ExpirationDate { get; set; }

        //public string UserId { get; set; }
    }
    public class CustomerDashboardContactData
    {
        public string Id { get; set; }
        public string ContactId { get; set; }
        public string Salutation { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string OwnerId { get; set; }
        public string AccountId { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string Country { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string StateCode { get; set; }
        public string CompanyId { get; set; }
        public string StatusId { get; set; }
        public string CreatedAt { get; set; }
        public bool IsPrimary { get; set; }
    }
    public class UpcommingAppoints
    {
        public string OpportunityName { get; set; }
        public string AppointmentDueDate { get; set; }
    }
    public class PrimaryContactModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public bool IsPrimary { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
    }
    public class OpportunityOwnerModel
    {
        public long? AccountId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string country { get; set; }
        public string OpportunityId { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Id { get; set; }
        public string PhoneNumber { get; set; }
    }
    public class AccountDetailModel
    {
        public long? Id { get; set; }
        public string AccountId { get; set; }

        public string Name { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string country { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedOnDate { get; set; }
        public string ModifiedOn { get; set; }
        public string ModifiedByName { get; set; }
        public string userType { get; set; }
        public bool IsRoleApply { get; set; }
        public string BankName { get; set; }
        public string AccountTypeKey { get; set; }
        public string CompanyUrl { get; set; }
    }
}
