using System;

namespace Solgen.Core
{
    public class LeaseAddOrUpdateModel
    {
        public Guid? LeaseId { get; set; }
        public Guid? LeaseContactId { get; set; }
        public Guid? LeaseVendorId { get; set; }
        
        public string LeaseUseType { get; set; }
        public string LeaseType { get; set; }
        public string LeaseOtherDescription { get; set; }
        public string LeaseDescription { get; set; }
        public bool? IsLeaseUCCFilling { get; set; }
        public Guid? LeaseState { get; set; }
        public string LeaseUCCFillingDocument { get; set; }
        public string LeaseUCCFillingNumber { get; set; }
        public string LeaseSerialNumber { get; set; }
        public decimal? LeaseRate { get; set; }
        public decimal? LeaseFeePercentage { get; set; }
        public Guid? LeaseResidualPercentage { get; set; }
        public Guid? LeaseTerm { get; set; }
        public decimal? LeaseEquipmentMSRP { get; set; }
        public decimal? LeaseEquipmentCost { get; set; }
        public decimal? LeaseAdditions1 { get; set; }
        public decimal? LeaseAdditions2 { get; set; }
        public decimal? LeaseTotalEquipmentMSRP { get; set; }
        public decimal? LeaseSalesTax { get; set; }
        public decimal? LeaseResidualAmount { get; set; }
        public decimal? LeaseWarranty { get; set; }
        public Guid? LeaseAccountType { get; set; }
        public decimal? LeaseOther { get; set; }
        public decimal? LeaseMonthlyRentalPayment { get; set; }
        public decimal? LeasePlacementFee { get; set; }
        public decimal? LeaseAmountDueAtSigining { get; set; }
        public decimal? LeaseTotalAmount { get; set; }
        public Guid? LeaseInsuranceRequirement { get; set; }
        public Guid? LeaseCreatedBy { get; set; }
        public Guid? LeaseAssignedBankId { get; set; }        
        public DateTime? LeaseDate { get; set; }
        public DateTime? LeaseMaturityDate { get; set; }
        
        public DateTime? LenderDate { get; set; }
        public string LenderName { get; set; }
        public string lenderNotes { get; set; }
        public bool? lenderAgree { get; set; }
        public Guid? LeaseInsurance { get; set; }
        public decimal? LeaseLicenceFee { get; set; }
        public string LeasePreferredDocumentSignedBy { get; set; }
        public Guid? LeaseTemplateId { get; set; }
       public DateTime? InsuranceExpirationDate { get; set; }
        public long CompanyID { get; set; }

    }

    public class DocumentUploadModel
    {
        public string FileName { get; set; }
        public string LeaseId { get; set; }
        public string LeaseNumber { get; set; }
    }

    public class DeleteLeaseModel
    {
        public Guid? LeaseContactId { get; set; }
        public Guid? LeaseAssignedBankId { get; set; }
        public string LeaseNumber { get; set; }
        public string VendorName { get; set; }

    }
    public class LeaseTemplateDetailModel
    {
        public Guid? TemplateId { get; set; }
        public Guid? LeaseId { get; set; }
        public string TemplateName { get; set; }
    }

    public class DocuSignJsonConveterData
    {
        public string envelopeId { get; set; }

        public string status { get; set; }
        public string statusDateTime { get; set; }
        public string uri { get; set; }
    }

    public class DocuSignDetailModel
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public Boolean IsGenerateLeaseDoc { get; set; }
        public string LeasePDFDocumentName { get; set; }
    }

    public class LeaseReviewDocModel
    {
        public string DocumentName { get; set; }
        public string DocumentFileName { get; set; }
        public string DocumentId { get; set; }
        public string UploadedOn { get; set; }
        public int TotalRecord { get; set; }
    }

    public class AddLeaseRequestModel
    {
        public Guid? LeaseRequestId { get; set; }
        public Guid? LeaseCustomerId { get; set; }
        public string LeaseContactId { get; set; }
        public Guid? ContactAdminId { get; set; }
        public string LeaseRequest { get; set; }
        public string LeaseRequestRateToBank { get; set; }
        public string LeaseRequestTerm { get; set; }
        public decimal? LeaseRequestPayment { get; set; }
        public string LeaseRequestResidual { get; set; }
        public string LeaseRequestCollateral { get; set; }
        public string LeaseRequestPurpose { get; set; }
        public string LeaseRequestSOROne { get; set; }
        public string LeaseRequestSORTwo { get; set; }
        public string LeaseRequestSORThree { get; set; }
        public string LeaseRequestAccountType { get; set; }
        public string LeaseRequestBankName { get; set; }
        public string LeaseRequestNameOnBank { get; set; }
        public decimal? LeaseRequestBalance { get; set; }
        public string LeaseRequestCompanyoverview { get; set; }
        public Guid? LeaseRequestCreatedBy { get; set; }
        public Guid? LeaseRequestModifiedBy { get; set; }
        public String LeaseRequestDescription { get; set; }
        public long CompanyID  { get; set; }
    }

    public class TitleWorkRequestModel
    {
        public Guid? LeaseId { get; set; }
        public Guid? LeaseContactId { get; set; }
        public string LeaseOtherDescription { get; set; }
        public string LeaseSerialNumber { get; set; }
        public string AddionalLienInformation { get; set; }
        public string LienHolder { get; set; }
        public string LeaseNumber { get; set; }
        public string OwnerAndRegistrant { get; set; }
        public DateTime? LeaseMaturityDate1 { get; set; }
        public string LeaseMaturityDate { get { return CommonSettings.GetFormattedDateOnly(CommonSettings.UtcToLocal(LeaseMaturityDate1 ?? DateTime.UtcNow)); } }
        public string ContactBussinessName { get; set; }
        public string ContactBussinessMailAddress { get; set; }
        public string ContactMailAddressZip { get; set; }
        public string BankName { get; set; }
        public string City { get; set; }
        public string StateName { get; set; }
        public string County { get; set; }
        public string ZipCode { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ContactMailAddressCity { get; set; }
        public string ContactMailAddressState { get; set; }
        public string ContactMailAddressCounty { get; set; }
        public string VendorName { get; set; }


    }

    public class TitleWorkModel
    {
        public Guid LeaseId { get; set; }
        public Guid LeaseContactId { get; set; }
        public string LeaseOtherDescription { get; set; }
        public string LeaseSerialNumber { get; set; }
        public string LeaseNumber { get; set; }
        public string AddionalLienInformation { get; set; }
        public string BankName { get; set; }
        public string City { get; set; }
        public string StateName { get; set; }
        public string County { get; set; }
        public string ZipCode { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string ContactMailAddressState { get; set; }
        public string ContactBussinessName { get; set; }
        public string ContactBussinessMailAddress { get; set; }
        public string ContactMailAddressCity { get; set; }
        public string ContactMailAddressCounty { get; set; }
        public string ContactMailAddressZip { get; set; }
        public string LeaseMaturityDate { get; set; }
        public string VendorName { get; set; }
    }
    public class LeaseDetailsNotification
    {
        public string LeaseNumber { get; set; }
        public Guid? LeaseAssignedBankId { get; set; }
        public Guid? LeaseContactId { get; set; }

    }

    public class BankApprovalModel
    {
        public string LeaseNumber { get; set; }
        public Guid? LeaseAssignedBankId { get; set; }
        public Guid? LeaseContactId { get; set; }
        public string BankEmailIDs { get; set; }
        public string ContactbusinessName { get; set; }
    }
    public class SendFundingBankApprovalModel
    {
        public string LeaseNumber { get; set; }
        public Guid? LeaseAssignedBankId { get; set; }
        public Guid? LeaseContactId { get; set; }
        public string BankEmailIDs { get; set; }
        public string ContactbusinessName { get; set; }
        public string BankName { get; set; }
    }
    public class SendFund
    {
        public string LeaseNumber { get; set; }
        public string BankName { get; set; }

    }
    public class ManageLeaseTemplate
    {
        public Guid? TemplateId { get; set; }
        public string TemplateName { get; set; }
        public string TemplateContent { get; set; }
        public DateTime TemplateCreatedOn { get; set; }
        public Guid TemplateCreatedBy { get; set; }
        public DateTime TemplateModifiedOn { get; set; }
        public Guid TemplateModifiedBy { get; set; }
        public bool TemplateIsDeleted { get; set; }
        public Guid TemplateIsActive { get; set; }
        public int IsActive { get; set; }
        public Guid? StatusId { get; set; }
        public long CompanyId { get; set; }

    }
    public class UpdateManageTemplate
    {
        public Guid? TemplateId { get; set; }
        public string TemplateName { get; set; }
        public string TemplateContent { get; set; }
        public Guid TemplateModifiedBy { get; set; }
        public int IsActive { get; set; }
    }
    public class LeadModel
    {
        public string LeadId { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
        public string permission { get; set; }
    }
    public class OpportunityModel
    {
        public string OpportunityId { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public Int64 companyId { get; set; }
    }
    public class ProjectModel
    {
        public string Id { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public Int64 companyId { get; set; }
    }

    public class ServiceAppointmentModel
    {
        public string ServiceAppointmentId { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
    }
    public class ServiceAppointmentAttendanceModel
    {
        public string serviceappointmentid { get; set; }
        public string jsondata { get; set; }
        public Guid userId { get; set; }
        public long companyid{ get; set; }
        
    }

    public class AssignedResourcesModel
    {
        public double? Id { get; set; }
        public string serviceAppointment { get; set; }
        public string serviceResourceId { get; set; }
        public decimal? estimatedTravelTime { get; set; }
        public decimal? actualTravelTime { get; set; }
        public string serviceCrewId { get; set; }
        public string estimatedTravelTimeFromSourceId { get; set; }
        public string approximateTravelDistanceForm { get; set; }
        public string estimatedTravelTimeToSourceId { get; set; }
        public string approximateTravelDistanceTo { get; set; }
        public string lastUpdatedEpoch { get; set; }
        public string approximateTravelTimeForm { get; set; }
        public string isUpdatedByOptimization { get; set; }
        public string calculatedDurationMinutes { get; set; }
        public bool isServiceResource { get; set; } = false;
        public long? CompanyId { get; set; }
    }
    public class AssignedSacheduleResourcesModel
    {
        public string Id { get; set; }
        public string serviceAppointment { get; set; }
        public string serviceResourceId { get; set; }
        public decimal? estimatedTravelTime { get; set; }
        public decimal? actualTravelTime { get; set; }
        public string serviceCrewId { get; set; }
        public string equipmentResourceId { get; set; }
        public string estimatedTravelTimeFromSourceId { get; set; }
        public string approximateTravelDistanceForm { get; set; }
        public string estimatedTravelTimeToSourceId { get; set; }
        public string approximateTravelDistanceTo { get; set; }
        public string lastUpdatedEpoch { get; set; }
        public string approximateTravelTimeForm { get; set; }
        public string isUpdatedByOptimization { get; set; }
        public string calculatedDurationMinutes { get; set; }
        public bool isServiceResource { get; set; } = false;
        public long? CompanyId { get; set; }
        public string description { get; set; }
        public string accountId  { get; set; }
        public string statusId  { get; set; }
        public string subject  { get; set; }
        public string workType  { get; set; }
        public string WorkOrder  { get; set; }
        public DateTime? arrivalWindowStartTime  { get; set; }
        public DateTime? arrivalWindowEndTime { get; set; }
        public DateTime? scheduledStartTime  { get; set; }
        public DateTime? scheduledEndTime  { get; set; }
        public string userId { get; set; }
    }
    public class JsonModel
    {
        public string Id { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
        public string leadconvert { get; set; }
        public string leadid { get; set; }
        public string selecteddata { get; set; }
        public string docDate { get; set; }
        public string dealerDocName { get; set; }
        public string isForChangeOrder { get; set; }
        public string isSendNotification { get; set; }
        public string StageName { get; set; }
        public string fileExtension { get; set; }
        public string FileUrl { get; set; }

        public string SFOpportunityId { get; set; }
        public string ApplicationNumber { get; set; }
        public string SourceType { get; set; }
        public string DealerName { get; set; }
        public bool isMediaServer { get; set; }
        public string Type { get; set; }
        public string AccountType { get; set; }
        

    }

    public class installStepJsonModel
    {
        public string Id { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
        public string leadconvert { get; set; }
        public string leadid { get; set; }
        public string selecteddata { get; set; }
        public string docDate { get; set; }
        public string HouseInViewfile { get; set; }
        public string ElectricHookupfile { get; set; }
        public string ResidenceWithAddressInViewfile { get; set; }
        public string BatteryStoragefile { get; set; }
        public string BorrowerPhoneNumber { get; set; }
        public string ApplicantEmail { get; set; }
        public bool isMediaServer { get; set; }
        public string FileUrl { get; set; }
        public string FileName { get; set; }
        public string Type { get; set; }

    }

    public class emailDataModel
    {
        public string email { get; set; }
        public string name { get; set; }
    }

    public class EmailForCompanyAdminModel
    {
        public string email { get; set; }
        public string name { get; set; }
    }

    public class LenderModel
    {
        public string ID { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
    }

    public class savesubstagemodel
    {
        public long batchid { get; set; }
        public long subModuleId { get; set; }
        public long moduleId { get; set; }
        public string stagedata { get; set; }
        public Guid userId { get; set; }
        public bool sequencemandatory { get; set; }
      
        public long companyId { get; set; }
    }

    public class LineItemModel
    {
        public string ProposalId { get; set; }
        public string lineItemId { get; set; }
        public string opportunityId { get; set; }
        public string Fields { get; set; }
        public long? CompanyId { get; set; }
        public string userId { get; set; }
    }

    public class PriceBookModelForProductItem
    {
        public string PriceBookId { get; set; }
        public string lineItemId { get; set; }
        public string opportunityId { get; set; }
        public string Fields { get; set; }
        public long? CompanyId { get; set; }
        public string userId { get; set; }
    }
    public class ServiceAppointmentAssignedCalenderModel
    {
        public string jsondata { get; set; }
        public string viewtype { get; set; }
        public Guid? userId { get; set; }
        public long companyid { get; set; }

    }
    public class saveSa_Data
    {
        public string filterdata { get; set; }
        public int Sa_viewtype { get; set; }
        public int ghantviewtype { get; set; }
        public Guid? userId { get; set; }
        public long companyid { get; set; }

    }
    public class timezoneModel
    {
        public int timezone_id { get; set; }
        public string timezone_standard_identifier { get; set; }
        public string display_name { get; set; }
        public string standard_name { get; set; }
        public int baseutc_offset { get; set; }

    }

    public class VerityFileModel
    {
        public string RemotePath { get; set; }
        public bool IsSuccess { get; set; }
        public string Name { get; set; }
        public bool IsFailed { get; set; }
        public bool IsSkipped { get; set; }
        public string Exceptionmsg { get; set; }

    }




}
