using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class MasterModel
    {   public Guid MasterId { get; set; }
        public string MasterKey { get; set; }
        public string MasterValue { get; set; }
        public string MasterNames { get; set; }
        public Guid MasterNameId { get; set; } 
        public Guid MasterStatusId { get; set; } 
        public bool MasterIsDeleted { get; set; }
        public string MasterDescription { get; set; }
        public bool IsActive { get; set; }
        public DateTime MasterCreatedOn { get; set; }
        public string MasterNameValue { get; set; }
        
    }

    public class DepartementModel
    {
        public string departmentId { get; set; }
        public string FormJsonData { get; set; }
        public string moduleCode { get; set; }
        public string subModuleCode { get; set; }
        public string userId { get; set; }
    }
}
