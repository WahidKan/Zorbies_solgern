using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class LoanTermModel
    {
        public Guid? id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Term { get; set; }
        public string Apr { get; set; }
        public string DealerFee{ get; set; }
        public long LenderID{ get; set; }
    }
}
