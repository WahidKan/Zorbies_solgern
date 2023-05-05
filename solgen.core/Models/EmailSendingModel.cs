using System;

namespace Solgen.Core
{
    public class EmailSendingModel
    {
        public Guid? EmailTrackId { get; set; }
        public string EmailSubject { get; set; }
        public string EmailContent { get; set; }
        public string EmailFrom { get; set; }
        public string EmailTo { get; set; }
        public bool EmailStatus { get; set; }
        public string ModuleName { get; set; }
        public string PrimaryId { get; set; }
        public DateTime CreatedOn { get; set; }
       public string EmailSendingResponse { get; set; }
        public Guid? CreatedBy { get; set; }
        public long? SendEmailId { get; set; }
    }
}
