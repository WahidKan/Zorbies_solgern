using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class CreateInsuranceRequest
    {
        public Guid? LeaseId { get; set; }
        public Guid? InsuranceId { get; set; }
        public string LeaseNumber { get; set; }
        public string BankName { get; set; }
        public string LeaseUseType { get; set; }
        public string LeaseType { get; set; }
        public string CollateralInformation { get; set; }
        public string LeaseDescription { get; set; }
        public string LeaseVINSerialNumber { get; set; }
        public DateTime? LeaseDate { get; set; }
        public DateTime? LeaseMaturityDate { get; set; }
        public string LeaseFormattedDate { get { return CommonSettings.GetFormattedDateOnly(CommonSettings.UtcToLocal(LeaseDate ?? DateTime.UtcNow)); } }
        public string LeaseFormattedMaturityDate { get { return CommonSettings.GetFormattedDateOnly(CommonSettings.UtcToLocal(LeaseMaturityDate ?? DateTime.UtcNow)); } }

        public string ContactBussinessName { get; set; }
        public string ContactBussinessMailAddress { get; set; }
        public string ContactMailAddressCity { get; set; }
        public string ContactMailAddressState { get; set; }
        public string ContactMailAddressZip { get; set; }
        public string ContactMailAddressCounty { get; set; }
        public string ContactBussinessPhysicalAddress { get; set; }
        public string ContactPhysicalAddressCity { get; set; }
        public string ContactPhysicalAddressState { get; set; }
        public string ContactPhysicalAddressZip { get; set; }
        public string ContactPhysicalAddressCounty { get; set; }
        public string ContactBussinessPhone { get; set; }
        public string BussinessPhone { get; set; }
        public string ContactBussinessTIN { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactPosition { get; set; }
        public string LeaseEquipmentCost { get; set; }

        public string BankCity { get; set; }
        public string BankStateName { get; set; }
        public string BankCounty { get; set; }
        public string BankZipCode { get; set; }
        public string BankAddress { get; set; }
        public string SolgenAddress { get; set; }

    }

    public class SaveCreateInsuranceRequest
    {
        public string LeaseId { get; set; }
        public string AgentEmail { get; set; }
        public string InsuranceName { get; set; }
        public string Insured { get; set; }
        public string LossPayee { get; set; }
        public string SolgenADDRESS { get; set; }
        public string Description { get; set; }
        public string VIN { get; set; }
        public string MaturityDate { get; set; }
        public string Cost { get; set; }
        public string InsuranceId { get; set; }
        public string LeaseNumber { get; set; }
        public string Password { get; set; }


    }
    public class LeaseDocumentUploadModel
    {
        public string DocumentName { get; set; }
        public string UploadedOn { get; set; }
        public string PrefixNameOfDocument { get; set; }
        public Guid? DocumentId { get; set; }
        public string DocumentFileName { get; set; }
        public string DocumentComment { get; set; }
        public string DocumentTitle { get; set; }
        public string DocumentType { get; set; }
        public Guid DocumentUploadedForUser { get; set; }
        public bool? IsLeaseDocument { get; set; }
        public bool? IsSupportingDocument { get; set; }
        public Guid? DocumentUploadedBy { get; set; }
        public string DocumentCreatedOn { get; set; }
        public bool? IsCustomerAllForms { get; set; }
        public string DocumentAddFor { get; set; }
        public string DocumentRefNumber { get; set; }
        public DateTime? DocumentDate { get; set; }
        public string DocumentAddedFrom { get; set; }
    }

    public class CreditScoreCheckModel
    {
        public string userid { get; set; }
        public string LeaseId { get; set; }
        public DateTime? DatePulled { get; set; }
        public string scoreOneTitle { get; set; }
        public string scoreTwoTitle { get; set; }
        public string scoreThreeTitle { get; set; }
        public string documentScoreThreeFileName { get; set; }
        public string documentScoreTwoFileName { get; set; }
        public string documentScoreOneFileName { get; set; }
        public string DocumentTypeOne { get; set; }
        public string DocumentTypeTwo { get; set; }
        public string DocumentTypeThree { get; set; }

        public string documentFile1 { get; set; }
        public string documentFile2 { get; set; }
        public string documentFile3 { get; set; }
        public string LeaseNumber { get; set; }
        public string ContactName { get; set; }
    }
}
