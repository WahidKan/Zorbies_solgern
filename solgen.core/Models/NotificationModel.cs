using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class NotificationModel
    {
        public string ID { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string SenderName { get; set; }
        public string ReceiverName { get; set; }
        public string NotificationType { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public DateTime? CreatedOn { get; set; } 
        public DateTime? ModifiedOn { get; set; }
        public string NotificationUserType { get; set; }
        public string NotificationCreatedBy { get; set; }
        public string PrimaryId { get; set; }
        public string ModuleName { get; set; }
    }
}
