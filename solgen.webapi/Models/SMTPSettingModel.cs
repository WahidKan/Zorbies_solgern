using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models
{
    public class SMTPSettingModel
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }

        public string Message { get; set; }
        public string FromEmail { get; set; }

        public string SmtpHost { get; set; }

        public int SmtpPort { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
        public bool IsEnableSSL { get; set; }
    }
}
