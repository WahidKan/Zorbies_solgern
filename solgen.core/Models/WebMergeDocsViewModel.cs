using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class WebMergeDocsViewModel
    {
        public int id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string Url { get; set; }
        public string folder { get; set; }
        public int BankId { get; set; }
        public int StatusId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int CompanyId { get; set; }

    }
}
