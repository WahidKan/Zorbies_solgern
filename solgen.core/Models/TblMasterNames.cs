using System.ComponentModel.DataAnnotations;

using System;

namespace Solgen.Core
{
    public partial class TblMasterNames
    {
        [Key]
        public System.Guid MasterNameId { get; set; }
        public string MasterNameValue { get; set; }
        public string MasterNameTitle { get; set; }
    }
}
