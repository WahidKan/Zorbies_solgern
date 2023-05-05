using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class RuleEngineExecuteModel
    {
        public long LoanApplicationId { get; set; }

        public string EventCode { get; set; }

        public string ConnectionId { get; set; }

    }
}
