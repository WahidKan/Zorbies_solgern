using System;

namespace Solgen.Core
{
    public class LeaseTemplateModel
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
        public string LeaseTerm { get; set; }
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
        public string SolgenAddress { get; set; }
        public string ContactDetail { get; set; }
        public string ContactAddress { get; set; }
        public string ContactBussinessName { get; set; }
        public string VendorDetail { get; set; }
        public string SolgenPrintNameValue { get; set; }
        public string LeaseLicenceFee { get; set; }
        public string ContactCity { get; set; }
        public string ContactCounty { get; set; }
        public string LeaseInsurance { get; set; }
        public string GuarantorName { get; set; }
        public string ContactState { get; set; }
        public string ContactName { get; set; }
        public string ContactBankName { get; set; }
        public string ContactBankAddress { get; set; }
        public string ContactBankRoutingNumber { get; set; }
        public string ContactBankAccountNumber { get; set; }
        public string LeaseTerm1 { get; set; }
        public string LeaseTerm2 { get; set; }
        public string DocumentationFee{ get; set; }
        public string DebitAuthLeaseDateFrom { get; set; }
        public string DebitAuthMaturityDateBefore { get; set; }

        public string LeaseDateFormated { get; set; }
        public string DebitContactDetail { get; set; }

    }
}
