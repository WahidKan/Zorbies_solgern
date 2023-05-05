using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class SaveQuestionFileModel
    {
        public Int64 questionId { get; set; }
        public Int64 imgId { get; set; }

        public Int64 ServiceApptId { get; set; }

        public Int64 companyid { get; set; }
        public Int64 sectionId { get; set; }
        public string userId { get; set; }
        public string note { get; set; }


    }
}
