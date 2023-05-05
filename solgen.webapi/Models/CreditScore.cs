using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models
{
    public class CreditScore
    {
        public long? ApplicantScore { get; set; }
        public string CreditScoreCategory { get; set; }
        public string RawData { get; set; }
        public Trade[] Trades { get; set; }
        public Employment[] Employments { get; set; }
        public bool NeedsAdminReview { get; set; }
    }

    public class Trade
    {
        public string Source { get; set; }
        public bool Include { get; set; }
        public string Category { get; set; }
        public string Party { get; set; }
        public string Creditor { get; set; }
        public string CreditorAccountNumber { get; set; }
        public string CreditorCustomerNumber { get; set; }
        public bool Joint { get; set; }
        public decimal Balance { get; set; }
        public decimal Amount { get; set; }
        public decimal AdjAmount { get; set; }
        public DateTime? DateOpened { get; set; }
        public DateTime? DateReported { get; set; }
        public long? Rating { get; set; }
        public DateTime? LastPaymentDate { get; set; }
        public string PortfolioType { get; set; }
    }

    public class Employment
    {
        public string Identifier { get; set; }
        public string Occupation { get; set; }
        public string Employer { get; set; }
        public string DateLastReported { get; set; }
        public string DateFirstReported { get; set; }
    }
}
