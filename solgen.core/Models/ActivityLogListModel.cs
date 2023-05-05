using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class ActivityLogListModel
    {
        public Guid Id { get; set; }
        public DateTime LogDate { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string IPAddress { get; set; }
        public string OSBrowser { get; set; }
        public string ActionType { get; set; }
        public string Detail { get; set; }
        public string UserID { get; set; }
        public string WebBrowser { get; set; }
        public string Message { get; set; }

    }
}
