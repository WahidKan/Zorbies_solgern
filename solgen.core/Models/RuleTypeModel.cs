using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class RuleTypeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public long CompanyId { get; set; }
    }
}
