using System;

namespace Solgen.Core
{
    public class GuarantorDetailsModel
    {
        public Guid? GuarantorID { get; set; }
        public Guid? GuarantorContactID { get; set; }
        public string GuarantorFirstName { get; set; }
        public string GuarantorLastName { get; set; }
        public string GuarantorTitle { get; set; }
        public string GuarantorOwnership { get; set; }
        public string GuarantorBussinessAddress { get; set; }
        public string GuarantorBussinessCity { get; set; }
        public Guid? GuarantorBussinessState { get; set; }
        public string GuarantorBussinessZip { get; set; }
        public string GuarantorBussinessCounty { get; set; }
        public string GuarantorHomeAddress { get; set; }
        public string GuarantorHomeCity { get; set; }
        public Guid? GuarantorHomeState { get; set; }
        public string GuarantorHomeZip { get; set; }
        public string GuarantorHomeCounty { get; set; }
        public string GuarantorPhone { get; set; }
        public string GuarantorEmail { get; set; }
        public string GuarantorSocialNumber { get; set; }
        public DateTime? GuarantorDateOfBirth { get; set; }
        public DateTime? GuarantorCreatedOn { get; set; }
        public DateTime? GuarantorModifiedOn { get; set; }
        public Guid? GuarantorCreatedBy { get; set; }
        public Guid? GuarantorModifiedBy { get; set; }
        public bool? GuarantorIsDeleted { get; set; }
        public Guid? GuarantorStatusID { get; set; }
        public string GuarantorFormattedDateOfBirth { get; set; }
    }
}
