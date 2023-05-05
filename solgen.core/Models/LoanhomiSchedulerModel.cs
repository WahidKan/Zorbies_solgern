using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class LoanhomiScheduledEmail
    {
        public long Id { get; set; }
        public long LoanApplicationId { get; set; }
        public string LoanApplicationNumber { get; set; }
        public DateTime LoanApplicationDated { get; set; }
        public string SentTo { get; set; }
        public string CcTo { get; set; }
        public string Message { get; set; }
        public string ExceptionMessage { get; set; }
        public DateTime CreatedOn { get; set; }
        public int Status { get; set; }
        public DateTime? SentOn { get; set; }
        public long CompanyId { get; set; }
    }
    public class LoanApplicationNumberForTranserFilesToSFTP
    {
        public long LoanApplicationId { get; set; }
        public string LoanApplicationNumber { get; set; }
        public long CompanyId { get; set; }
    }
}
