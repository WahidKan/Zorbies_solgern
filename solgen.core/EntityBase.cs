using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solgen.Core
{
    public abstract class EntityBase
    {
        [NotMapped]
        public Guid? UserId { get; set; }

        [NotMapped]
        public bool Enabled { get; set; }

        [NotMapped]
        public bool IsActive { get; set; }

        [NotMapped]
        public int TotalRecord { get; set; }
    }
}
