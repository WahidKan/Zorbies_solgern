using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class ApplicationStatusResponse
    {
        public long applicantCreditScoreId { get; set; }
        public long loanApplicationId { get; set; }
        public int? creditScore { get; set; }
        public string creditScoreCategory { get; set; }
        public string applicationStatus { get; set; }
        public int miniumCreditScore { get; set; }
        public string status { get; set; }
        public bool needsAdminReview { get; set; }
        public string Error { get; set; }
    }

}
