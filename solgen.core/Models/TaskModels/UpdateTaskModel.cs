using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class UpdateTaskModel
    {
        public string UserName { get; set; }
        public string TaskAutoId { get; set; }
        public string NewTask { get; set; }
        public DateTime DueDate { get; set; }
        public string DueTime { get; set; }
        public Guid? AssignedUser { get; set; }
        public bool SendEmail { get; set; }
        public bool SendSms { get; set; }
        public string Status { get; set; }
        public string userId { get; set; }

    }
}
