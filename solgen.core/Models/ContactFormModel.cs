using System;
using System.Collections.Generic;

namespace Solgen.Core
{
    public class ContactFormModel
    {
        public ContactFormModel()
        {
            Guarantors = new List<GuarantorDetailsModel>();
            ContactDetails = new List<ContactDetailsModel>();
            InsuranceDetails = new List<InsuranceDetailsModel>();
            ContactBankInfo = new List<ContactBankInfo>();
        }
        public Guid? ContactId { get; set; }
        public Guid? UserID { get; set; }
        public string ContactAdminId { get; set; }
        public List<ContactDetailsModel> ContactDetails { get; set; }
        public List<GuarantorDetailsModel> Guarantors { get; set; }
        public List<InsuranceDetailsModel> InsuranceDetails { get; set; }
        public List<ContactBankInfo> ContactBankInfo { get; set; }
    }
}
