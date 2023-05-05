using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class FileUpload
    {
        public string  User { get; set; }
        public string FileUrl { get; set; }
        public string RefId { get; set; } 
        public string accountid { get; set; }
        public string Description { get; set; }
        public long module { get; set; }
        public string submodule { get; set; }
        public string CompanyId { get; set; }
        public string type { get; set; }
        public string CreateOn { get; set; }
        public    int PageNo { get; set; }

        public long FileSize 
        { get; set; }
        public string FileName { get; set; }
        public string ThumbnailUrl { get; set; }
        public string image { get; set; }
        public string fileExtension { get; set; }
        public string linkfrom { get; set; }

        public bool isMediaServer { get; set; }
    }
}
