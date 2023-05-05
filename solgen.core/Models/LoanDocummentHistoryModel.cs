using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class LoanDocummentHistoryModel
    {
        public long Id { get; set; }
        public long LoanApplicationId { get; set; }
        public string FileName { get; set; }
        public string FileUrl { get; set; }
        public string CreatedOn { get; set; }
        public string DocumentId { get; set; }
        public DateTime? SignedDate { get; set; }
        public int DocumentStatusId { get; set; }
        public string SourceType { get; set; }
        public string DocumentType { get; set; }
        public string DocumentStatus { get; set; }

    }
}
