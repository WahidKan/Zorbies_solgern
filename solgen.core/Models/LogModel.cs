using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class LogModel
    {
        public Guid LogId { get; set; }
        public string LogType { get; set; }
        public string LogShortMessage { get; set; }
        public string LogLongMessage { get; set; }
        public string LogIpAddress { get; set; }
        public string LogPageUrl { get; set; }
        public string LogReferrerUrl { get; set; }
        public Guid? LogCreatedBy { get; set; }
        public DateTime? LogCreatedOn { get; set; }
        public long? ObjectRefId { get; set; }
    }
}
