using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class StartWorkOrderModel
    {
        public long workOrderId { get; set; }
        public long? statusId { get; set; }
        public string moduleName { get; set; }
        public string submoduleName { get; set; }
        public string displayType { get; set; }
        public long companyId { get; set; }
        public string userId { get; set; }
    }

    public class SiteSurveyModel
    {
        public long Id { get; set; }
        public string FormJsonData { get; set; }
        public bool EditMode { get; set; }
    }


}
