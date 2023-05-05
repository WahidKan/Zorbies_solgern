using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class RuleEngineModel
    {
        public long RuleId { get; set; }

        public string RuleName { get; set; }
        
        public long SubModuleEventId { get; set; }

        public string Description { get; set; }

        public long CompanyId { get; set; }

        public DateTime CreatedAt{ get; set; }

        public Guid CreatedBy { get; set; }

        public DateTime? ModifyAt { get; set; }

        public Guid? ModifyBy { get; set; }

        public long StatusId { get; set; }

        public int? RuleVersion { get; set; }

        public long? RuleClonedFrom { get; set; }



    }


    public class CheckRuleName
    {
        public long? RuleId { get; set; }
        public string RuleName { get; set; }
    }
    public class CheckFlowName
    {
        public long? FlowId { get; set; }
        public string FlowName { get; set; }
    }

    public class ApplyVersionModel
    {
        public long RuleId { get; set; }
        public string ApplicationIds { get; set; }
    }
}
