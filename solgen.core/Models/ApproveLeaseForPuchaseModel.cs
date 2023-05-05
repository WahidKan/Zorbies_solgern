using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class ApproveLeaseForPuchaseModel
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
        public int? LeaseWarranty { get; set; }
        public Guid? LeaseAccountType { get; set; }
        public int? LeaseOther { get; set; }
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
        public string LenderNotes { get; set; }
    }
}
