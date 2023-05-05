using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class TblActionModel
    {
        public long action_id { get; set; }

        public long form_master_id { get; set; }

        public string display_name { get; set; }

        public int status_id { get; set; }

        public string controller_name { get; set; }

        public string action_name { get; set; }

        public string resource_key { get; set; }
    }
}
