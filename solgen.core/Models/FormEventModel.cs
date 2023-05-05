using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
  public  class FormEventModel
    {
        public long form_event_id { get; set; }

        public string event_name { get; set; }

        public string event_code { get; set; }

        public int status_id { get; set; }
    }
}
