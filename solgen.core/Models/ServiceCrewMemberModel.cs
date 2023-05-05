using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class ServiceCrewMemberModel
    {
        public string CrewMemberId { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
    }

    public class ServiceResourceAvailabilityModel
    {
        public string companyId { get; set; }
        public string CrewMemberId { get; set; }
        public string ServiceResourceId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
