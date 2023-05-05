using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class WhatsNext
    {
        public Guid LeaseId { get; set; }
        public string leaseNumber { get; set; }
        public string contactBussinessName { get; set; }
        public string contactName { get; set; }
        public string WhatNextStep { get; set; }
        public string WhatNextDesc { get; set; }
        public string WhatNextStatus { get; set; }
        public DateTime ContactCreatedOn { get; set; }
        public string Icon { get; set; }
        public string WhatNextRecentStatus { get; set; }
    }
}
