namespace Solgen.Core
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class TblMasters 
    { 
        [Key]
        public Guid MasterId { get; set; }
        public Guid? MasterNameId { get; set; }
        public string MasterKey { get; set; }
        public string MasterValue { get; set; }
        public string Image { get; set; }
        public Guid? MasterStatusId { get; set; }
        public bool? MasterIsDeleted { get; set; }
        public DateTime? MasterCreatedOn { get; set; }
        public Guid? MasterCreatedBy { get; set; }
        public Guid? MasterModifyBy { get; set; }
        public DateTime? MasterModifiedOn { get; set; }
        public bool? IsFrontEnd { get; set; }
        public string ModifiedByType { get; set; }
        public string MasterDescription { get; set; } 
         
    }
}
