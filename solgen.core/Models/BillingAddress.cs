using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class BillingAddress
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string  City{get; set;}
        public string State { get; set; }
        public string CountryId { get; set; }
        public string CountryName { get; set; }
        public string ZipCode { get; set; }
    }
}
