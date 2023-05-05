using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class CreditScoreModel
    {
        public long? LoanApplicationId { get; set; }
        public long? ApplicantId { get; set; }
        public string ApplicantType { get; set; }
        public long? CreditScore { get; set; }
        public string CreditScoreCategory { get; set; }
        public bool? FrozenAccount { get; set; }
        public bool? IsFraudulent { get; set; }
        public long? CreditBureauId { get; set; }
        public long? StatusId { get; set; }
        public string CreatedOn { get; set; }
        public Guid? CreatedBy { get; set; }
        public long? CompanyId { get; set; }
        public bool? IsSubmitted { get; set; }
    }
}
