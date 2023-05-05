using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class AnnoucementModel
    {
        public int AnnoucementId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public string ProfilePic { get; set; }
        public string RecurringType { get; set; }
        public long TodayAnnount { get; set; }


    }
}
