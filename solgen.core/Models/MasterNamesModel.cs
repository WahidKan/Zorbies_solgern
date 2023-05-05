using System;
using System.ComponentModel.DataAnnotations;

namespace Solgen.Core
{
    public class MasterNamesModel
    {
        [Key]
        public System.Guid? MasterNameId { get; set; } 
        public string MasterNameValue { get; set; }
        public string MasterNameTitle { get; set; }
    }
}
