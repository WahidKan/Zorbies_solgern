using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solgen.Core
{
    public class ContactDetailsModel
    {
        public Guid? ContactId { get; set; }
        public string ContactBussinessName { get; set; }
        public string ContactBussinessMailAddress { get; set; }
        public string ContactMailAddressCity { get; set; }
        public Guid? ContactMailAddressState { get; set; }
       
        public string ContactMailAddressZip { get; set; }
        public string ContactMailAddressCounty { get; set; }
        public string ContactBussinessPhysicalAddress { get; set; }
        public string ContactPhysicalAddressCity { get; set; }
        public Guid? ContactPhysicalAddressState { get; set; }
        public string ContactPhysicalAddressZip { get; set; }
        public string ContactBussinessPhone { get; set; }
        public string BussinessPhone { get; set; }
        public string ContactBussinessTIN { get; set; }
        public Guid? ContactTypeOfCompany{ get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactEmail { get; set; }
        public Guid? ContactPosition { get; set; }
        public string ContactPreferredDocumentSignedBy { get; set; }
        public DateTime? ContactCreatedOn { get; set; }
        public DateTime? ContactModifiedOn { get; set; }
        public Guid? ContactCreatedBy { get; set; }
        public Guid? ContactModifiedBy { get; set; }
        public Guid? ContactStatusID { get; set; }
        public bool? ContactIsDeleted { get; set; }
        public string ContactPhysicalAddressCounty { get; set; }
        public string ContactSocialSecurityNumber { get; set; }
        public bool IsLeaseCreated { get; set; }
        public long CompanyID { get; set; }
    }

    public class ContactBankInfo
    {
        public Guid? ContactBankId { get; set; }
        public string ContactBankName { get; set; }
        public string contactBankAddress { get; set; }
        public string contactBankRoutingNumber { get; set; }
   
        public string contactBankAccountNum { get; set; }
       
        public DateTime? ContactBankCreatedOn { get; set; }
        public Guid? ContactBankCreatedBy { get; set; }
        public DateTime? ContactBankModifiedOn { get; set; }
        public Guid? ContactBankModifiedBy { get; set; }
        public bool? ContactBankIsDeleted { get; set; }
        public Guid? ContactBankContactId { get; set; }
        public string ContactBankCity { get; set; }
        public Guid? ContactBankState { get; set; }
        public string ContactBankCounty { get; set; }
        public string ContactBankZipcode { get; set; }
    }
}
