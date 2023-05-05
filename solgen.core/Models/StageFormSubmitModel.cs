using System;
using System.Collections.Generic;
using System.Numerics;
using System.Text;

namespace Solgen.Core.Models
{
    public class StageFormSubmitModel
    {
        public string json { get; set; }
        public string formname { get; set; }
        public string moduleid { get; set; }
        public string subModuleId { get; set; }
        public long? formMasterId { get; set; }
        public string classType { get; set; }
    }
}
