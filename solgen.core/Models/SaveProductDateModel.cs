using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class SaveProductDateModel
    {
        public Int64 companyid { get; set; }
        public string userId { get; set; }
        public int ProductId { get; set; }
        public string DateDelivered { get; set; }
    }
}
