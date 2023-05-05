using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class VendorModel
    {
        public string ID { get; set; }
        public string BusinessName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get { return FirstName + " " + LastName; } }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string StateName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public Guid? State { get; set; }
        public string ZipCode { get; set; }
        public string County { get; set; }
        public string Status { get; set; }
        public string StatusID { get; set; }
        public string CreatedByID { get; set; }
        public Guid? AssociateUser { get; set; }
        public string Password { get; set; }
        public string VendorAdminUserId { get; set; }
        public string WiringBankName { get; set;}
        public string WiringRoutingNumber { get; set;}
        public string WiringAccountNumber { get; set;}
        public string WiringBankAddress { get; set;}
        public string wiringBankCounty { get; set; }
        public string wiringBankCity { get; set; }
        public string wiringBankZipcode { get; set; }
        public Guid? wiringBankState { get; set; }
        public long companyID { get; set; }
    }
}
