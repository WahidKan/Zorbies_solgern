using System.Collections.Generic;

namespace Solgen.Core.Models
{
    public class RouteRuleMapping
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long DocumentId { get; set; }
        public bool Combine { get; set; }
        public long Sort { get; set; }
        public List<Conditions> Conditions { get; set; }

    }
    public class Conditions
    {
        public long Id { get; set; }
        public long Field { get; set; }
        public string Exp { get; set; }
        public string Value { get; set; }
        public string Operator { get; set; }
        public string FieldKey { get; set; }
    }
}