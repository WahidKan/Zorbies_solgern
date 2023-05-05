using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class NotificationSendModel
    {
        public string TemplateId { get; set; }
        public string FromName { get; set; }
        public string Toemail { get; set; }
        public string ToUser { get; set; }
        public string CcEmail { get; set; }
        public string[] CcUser { get; set; }
        public string Subject { get; set; }
        public string SubjectBody { get; set; }
        public string CreatedBy { get; set; }
        public string CompanyId { get; set; }
        public string ObjectId { get; set; }
        public string ObjectName { get; set; }
        public string RouteUrl { get; set; }

        public List<string> UserIdList { get; set; }
    }

    public class LoanapplicationDocumentTypeModel
    {
        public string Id { get; set; }
        public string DocumentType { get; set; }
    }
}
