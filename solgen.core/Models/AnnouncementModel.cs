using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class AnnouncementModel
    {
        public long? Id{ get; set; }
        public string Title { get; set; }
        public string RecuringType { get; set; }
        public string StartDate { get; set; }   
        public string EndDate { get; set; }
        public bool? Status { get; set; }
        public bool? AcknowledgmentRequired { get; set; }
        public string Usertype { get; set; }
        public string Message { get; set; }
        public string FileName { get; set; }
        public string File { get; set; }
        public long CompanyID { get; set; }
        public Guid User_id{ get; set; }
        public long? status_id { get; set; }

        public DateTime? SDate { get; set; }
        public DateTime? EDate { get; set; }
    }
}
