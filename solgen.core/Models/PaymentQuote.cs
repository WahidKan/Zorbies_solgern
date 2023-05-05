using System;
using System.Collections.Generic;

namespace Solgen.Core
{
    public class PaymentQuote
    {
        public PaymentQuote()
        {
            Leases = new List<LeaseAddOrUpdateModel>();
        }
        public Guid? PaymentQuoteId { get; set; }
        public string PaymentQuoteName { get; set; }
        public string PaymentQuoteEmail { get; set; }
        public string PaymentQuoteText { get; set; }
        public Guid? PaymentQuoteCreatedBy { get; set; }
        public DateTime? PaymentQuoteCreatedOn { get; set; }
        public Guid? PaymentQuoteModifiedBy { get; set; }
        public DateTime? PaymentQuoteModifiedOn { get; set; }
        public List<LeaseAddOrUpdateModel> Leases { get; set; }
    }
}
