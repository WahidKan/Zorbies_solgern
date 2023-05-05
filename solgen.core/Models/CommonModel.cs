using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class ManageLayout
    {   
        public string CompanyId { get; set; } 
        public string moduleName { get; set; }
        public string subModuleName { get; set; }
        public string defaultSectionData { get; set; }
        public string DynamicSectionData { get; set; }
        public string selectedFields { get; set; }
        public string defaultSectionGroupName { get; set; }
        public string dynamicSectionGroupName { get; set; }
        public string CreatedByID { get; set; }
        public string Id { get; set; }
    }
    public class LeadConfigurationModel
    { 
        public long? Id { get; set; }
        public Boolean IsLoanapplication { get; set; }
        public Boolean IsOpportunity { get; set; }
        public Boolean IsAccount { get; set; }
        public Boolean IsContact { get; set; }
        public long? CompanyId { get; set; }
        public string moduleWizard { get; set; }
    }

    public class EnableAccountLogin
    {

        public string Email { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public bool IsPrimary { get; set; }
        public bool EnableLogin { get; set; }
        public string AccountId { get; set; }
        public string Phone { get; set; }
        public long? Role { get; set; }
       // public string AccountId { get; set; }
    }
    public class loanApplicationEnableAccountForIncompleteModel
    {
        public string id { get; set; }
        public string loanId { get; set; }
        public string userId { get; set; }
    }
    public class GetloanApplicationStageModel
    {
        public bool stageapproved { get; set; }
        public bool stageActive { get; set; }
        public string IsSequenceForSubStage { get; set; }
    }
    public class EnableAccountSubmitModel
    {
        public string accountId { get; set; }
        public string contactList { get; set; }
    }
    public class CommanJsonModel
    {
        public string Id { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
    }

    public class FixOrderJsonModel
    {
        public string object_id { get; set; }
        public Int64 departmentId { get; set; }
        public Int64? departmentSubCategoryId { get; set; }
        public string fixOrderDescription { get; set; }
        public string object_name { get; set; }
        public Int64 object_ref_id { get; set; }
        public string userId { get; set; }
        public string companyId { get; set; }
    }


    public class SolgenStageModel
    {
        public string Id { get; set; }
        public string FormJsonData { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
    }

    public class MarkAsCompleteModel
    {
        public string Id { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string StageId { get; set; }
    }
    public class ActivityDataModel
    {
        public string Id { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string ref_id { get; set; }
        public string message { get; set; }
        public string subject { get; set; }
        public DateTime? starttime { get; set; }
        public DateTime? endtime { get; set; }
        public DateTime? scheduleDate { get; set; }
        public string displayType { get; set; }
        public string callfrom { get; set; }
        public string call_to { get; set; }
        public string priority { get; set; }
        public string contactid { get; set; }
        public string call_purpose { get; set; }
        public string activity_type { get; set; }
        public string activityStatus { get; set; }
        public long companyid{ get; set; }
        public Guid userid{ get; set; }
    }


    public class LoanHomiManageViewModelWithCompany
    {
        public string ModuleName { get; set; }
        public string SubModuleName { get; set; }
        public string radiogroup { get; set; }
        public string select { get; set; }
        public string customWhereCondition { get; set; }
        public string Id { get; set; }
        public string CreatedByID { get; set; }
        public string selectedFields { get; set; }
        public string view_searchFilterJson { get; set; }
        public long CompanyID { get; set; }
        public string Roles { get; set; }
        public string manage_view_for { get; set; }
    }

    public class LoanApplicationReportModel
    {
        public string Id { get; set; }
        public string ReportName { get; set; }
        public string moduleId { get; set; }
        public string subModuleId { get; set; }
        public string Description { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string customWhereCondition { get; set; }
        public string CreatedByID { get; set; }
        public string selectedFields { get; set; }
        public string filterType { get; set; }
        public string report_searchFilterJson { get; set; }
        public Boolean? isCountWidget { get; set; }
        public Boolean? isChartView { get; set; }
        public Boolean? isListView { get; set; }
        public long CompanyID { get; set; }
        public string radiogroup { get; set; }
        public string Roles { get; set; }
        public string radioChartBtn { get; set; }
        public string chartSelectedRole { get; set; }
        public long? chartViewYAxis { get; set; }
        public string chartType { get; set; }
        public string listViewRadioBtn { get; set; }
        public string listViewselectedRole { get; set; }
        public string listViewFields { get; set; }
        public long? groupByFieldId { get; set; }
        public string reportIconClass { get; set; }
        public string reportIconSpanColorClass { get; set; }
        public string companyType { get; set; }
    }

    public class RunLoanApplicationReportModel
    {
        public string sortColumn { get; set; }
        public string sortDir { get; set; }
        public int? currentPage { get; set; }
        public int? pageSizeValue { get; set; }
        public string selecteddata { get; set; }
        public string filterData { get; set; }
        public string From { get; set; }
        public string TO { get; set; }
        public string customWhereCondition { get; set; }
        public long? groupByFieldId { get; set; }
    }

    public class welcomeSaveModel
    {
        public string moduleName { get; set; }
        public string subModuleName { get; set; }
        public string AccountId { get; set; }
        public string FlowId { get; set; }
        public string Screenid { get; set; }
        public string data { get; set; }
        public Guid userid { get; set; }
        public long CompanyID { get; set; }
    }

    public class View
    {
        public long id { get; set; }
        public string name { get; set; }
        public string listType { get; set; }
    }
    public class userActivityLog
    {
        public Guid? userID { get; set; }
        public long companyID { get; set; }
        public string pageUrl { get; set; }
        public string redirectedFrom { get; set; }
    }


}
