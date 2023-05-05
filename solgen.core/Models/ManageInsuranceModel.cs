using System;
using System.Collections.Generic;

namespace Solgen.Core
{
    //ListInsuranceModel
    public class ListInsuranceModel
    {
        public Guid InsuranceId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string AgentName { get; set; }
        public string AgentEmail { get; set; }
        public string CreatedOn { get; set; }
        public bool IsActive { get; set; }
        public Guid InsuranceContactId { get; set; }
        public string County { get; set; }
    }
   
    //InsuranceDetailsModel
    public class InsuranceDetailsModel
    {
        public Guid? InsuranceId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public Guid? State { get; set; }
        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string AgentName { get; set; }
        public string AgentEmail { get; set; }
        public string County { get; set; }
        public Guid? StatusId { get; set; }
        public Guid? AssociateUser { get; set; }
        public string StateName { get; set; }

        public string InsuranceAdminUserId { get; set; }
        public string Password { get; set; }
        public string CreatedById { get; set; }
        public long CompanyID { get; set; }
    }

    //SelectItemModel
    public class SelectItemModel
    {
        public int value { get; set; }
        public string text { get; set; }
        public string code { get; set; }
        public Guid? StateGuidValues { get; set; }
    }
    public class SelectItemModelIso
    {
        public string value { get; set; }
        public string text { get; set; }
        public string code { get; set; }
        public Guid? StateGuidValues { get; set; }
    }

    public class ReportToModel
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class CompanySetupModel
    {
        public long? CompanyId { get; set; }
        public string CompanyName { get; set; }
		public string IndustryType { get; set; }
		public string AddressLineOne { get; set; }
        public string Status { get; set; }
        public string CompanyLogo { get; set; }
        public string EmailTemplateLogo { get; set; }
        public string companyType { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public string Country3 { get; set; }
        public string State { get; set; } 
        public string ZipCode { get; set; } 
        public string SMTPHost { get; set; } 
        public string SMTPusername { get; set; } 
        public string SMTPpassword { get; set; }
        public string SMTPport { get; set; }
        public string FromEmail { get; set; }
        public string DocumentType { get; set; }
        public string CreatedBy { get; set; }
        public string imageLink { get; set; }
        public string imagelinkemail { get; set; }
        public string ReferenceInterval { get; set; }

        public string SiteUrl { get; set; }

        public int autoSaveInterval { get; set; }
        public bool IsTLS { get; set; }
        public bool IsEnableSSL { get; set; }
        public string signerType { get; set; }
        public string signerBy { get; set; }

        public string AddressLineTwo { get; set; }
    }

    public class ManageStatusModel
    {
        public string masterId { get; set; }
        
        public string ModuleId { get; set; }
        public string SubModuleId { get; set; }
        public string Controls { get; set; }
        public string FieldsData { get; set; }
        public string CreatedBy { get; set; }
        public string UserId { get; set; }
        public long CompanyId { get; set; }
    }

    public class StatusModelDetails
    {
        public StatusModelDetails()
        {
            addmoreFields = new List<StatusModels>();
            StatusSingleModels = new List<StatusSingleModels>();
        }
        public string ModuleId { get; set; }
        public string SubMouldeId { get; set; }
        public string controls { get; set; }
        public List<StatusModels> addmoreFields { get; set; }
        public List<StatusSingleModels> StatusSingleModels { get; set; }
    }

    public class StatusModels
    {
        public Guid MasterId { get; set; }
        public string status { get; set; }
        public string description { get; set; }
        public string chooseColor { get; set; }
        public Boolean isSystemGenerated { get; set; }
    }

    public class StatusSingleModels
    {
        public Guid MasterId { get; set; }
        public string ModuleId { get; set; }
        public string SubMouldeId { get; set; }
        public string controls { get; set; }
    }

    public class StoredFileOnAzure
    {
        public long moduleid { get; set; }
        public string submoduleid { get; set; }
        public string refid { get; set; }
        public string accountid { get; set; }
        public long? CompanyId { get; set; }
        public string companyName { get; set; }
        public string UserId { get; set; }
        public string DocumentType { get; set; }
        public string FileName { get; set; }
        public string filetype { get; set; }
        public string fileExtension { get; set; }
        public string DocumentTitle { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public string linkfrom { get; set; }
        public bool isMediaServer { get; set; }
        public string FileUrl { get; set; }
        public string Type { get; set; }
    }

    public class CustomFieldDropDown
    {
        public string Custom_fild_id { get; set; }
        public string CustomFieldName { get; set; }
    }
}
