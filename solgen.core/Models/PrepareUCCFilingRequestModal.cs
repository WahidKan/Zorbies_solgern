using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class PrepareUCCFilingRequestModal
    {
        public string PrefixNameOfDocument { get; set; }
        public Guid? DocumentId { get; set; }
        public string DocumentFileName { get; set; }
        public string DocumentTitle { get; set; }
        public string DocumentType { get; set; }
        public Guid DocumentUploadedForUser { get; set; }
        public Guid? DocumentUploadedBy { get; set; }
        public string DocumentCreatedOn { get; set; }
        public string DocumentRefNumber { get; set; }
        public string PrepareUCCFillingRequestAction { get; set; }
        public string TXUCCDraft { get; set; }
        public string ReceiptNumDraft { get; set; }
        public DateTime? PrepareUCCFillingRequestReminder { get; set; }
        public Guid? UCCFilingState { get; set; }
        
    }
}
