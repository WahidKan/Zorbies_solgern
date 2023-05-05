using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Solgen.Core.Models;

namespace Solgen.Core
{
    public class BulkUploadModel
    {
        public Guid? Id { get; set; }
        public string BulkUploadJSONObject { get; set; }

    }
    public class BulkUploadResult
    {
        public int Skipped { get; set; }
        public int Total { get; set; }

    }
    public class ContactInformation
    { 
        public string BusinessName { get; set; }
        public string Tin { get; set; }
        public string TypeofCompany { get; set; }
        public string BusinessPhone { get; set; }
        public string ContactPhone { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactPosition { get; set; }
        public string ContactSocialSecurityNumber { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPreferredDocumentSigned { get; set; }
        public string MailingAddress { get; set; }
        public string MailingAddressCity { get; set; }
        public string MailingAddressState { get; set; }
        public string MailingAddressZip { get; set; }
        public string MailingAddressCounty { get; set; }
        public string PhysicalAddress { get; set; }
        public string PhysicalAddressCity { get; set; }
        public string PhysicalAddressState { get; set; }
        public string PhysicalAddressZip { get; set; }
        public string PhysicalAddressCounty { get; set; }
        public string InsuranceName { get; set; }
        public string InsurancePhone { get; set; }
        public string InsuranceAgentName { get; set; }
        public string InsuranceAgentEmail { get; set; }
        public string InsuranceAddress { get; set; }
        public string InsuranceCity { get; set; }
        public string InsuranceState { get; set; }
        public string InsuranceZip { get; set; }
        public string InsuranceAgentCounty { get; set; }
    }

    public class ContactGuarantorInformation
    {
        public string ContactEmail { get; set; }
        public string GuarantorFirstName { get; set; }
        public string GuarantorLastName { get; set; }
        public string GuarantorTitle { get; set; }
        public string Ownership { get; set; }
        public string GuarantorEmail { get; set; }
        public string GuarantorPhone { get; set; }
        public string BussinessAddress { get; set; }
        public string BussinessCity { get; set; }
        public string BussinessState { get; set; }
        public string BussinessZip { get; set; }
        public string BussinessCounty { get; set; }
        public string HomeAddress { get; set; }
        public string HomeCity { get; set; }
        public string HomeState { get; set; }
        public string HomeZip { get; set; }
        public string HomeCounty { get; set; }
        public string GuarantorSocialSecurityNumber { get; set; }
        public string GuarantorDateOfBirth { get; set; }
    }

public class RootJsonObject
    {
    public List<ContactInformation> ContactInformation { get; set; }
    public List<ContactGuarantorInformation> ContactGuarantorInformation { get; set; }
}
   

}
