using System;

namespace Solgen.Core
{
    public class LeaseDetailsModel
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
        public string LeaseUCCFillingDocumentLink { get; set; }
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

        public Boolean SendToBankApproval { get; set; }

        public Boolean IsReviewSupportingDoc { get; set; }
        public Boolean IsReviewLeaseDoc { get; set; }
        public Boolean IsGenerateLeaseDoc { get; set; }
        public Boolean IsTitleWorkRequest { get; set; }
        public Boolean IsSendToDocuSign { get; set; }
        public Boolean IsDownloadToPDFWet { get; set; }
        public Boolean IsCreateInsuranceRequest { get; set; }
        public Boolean IsCreateTitleWorkRequest { get; set; }
        public Boolean IsPrepareUCCFillingRequest { get; set; }
        public Boolean IsCreateAmorSchedule { get; set; }
        public Boolean IsSendFundingPackToBank { get; set; }
        public Boolean IsApprovedForPurchase { get; set; }
        public Boolean IsCheckCreditScore { get; set; }
        public string LeaseFormattedDate { get { return CommonSettings.GetFormattedDateOnly(CommonSettings.UtcToLocal(LeaseDate ?? DateTime.UtcNow)); } }
        public string LeaseFormattedMaturityDate {get { return CommonSettings.GetFormattedDateOnly(CommonSettings.UtcToLocal(LeaseMaturityDate  ?? DateTime.UtcNow)); } }

        public DateTime? LenderDate { get; set; }
        public string LenderName { get; set; }
        public string LenderNotes { get; set; }
        public bool LenderAgree { get; set; }
        public Guid? LeaseInsurance { get; set; }
        public string LeasePDFDocumentName { get; set; }

        public string LeasePDFDocumentNameLink { get; set; }
        public string LeaseNumber{ get; set; }
        public string LeasePreferredDocumentSignedBy { get; set; }
        public Guid? leaseTemplateId { get; set; }
        public string LeaseTemplateContent { get; set; }
        public Guid? insuranceDocument { get; set; }
        public Guid? vendorDocument { get; set; }
        public Boolean IsApprovedForFund { get; set; }
        public string BankName { get; set; }
        public DateTime? InsuranceExpirationDate { get; set; }
        // public string LeaseFormattedInsuranceExpirationDate { get { return CommonSettings.GetFormattedDateOnly(CommonSettings.UtcToLocal(InsuranceExpirationDate ?? DateTime.UtcNow)); } }
        public string LeaseFormattedInsuranceExpirationDate
        {
            get {
                return InsuranceExpirationDate==null?null:CommonSettings.GetFormattedDateOnly(CommonSettings.UtcToLocal(InsuranceExpirationDate ?? DateTime.UtcNow));
            }
        }
        public decimal? LeaseLicenceFee { get; set; }
    }
}
