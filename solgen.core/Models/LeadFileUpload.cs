using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class LeadFileUpload
    {
        public string Id { get; set; }
        public string FileUrl { get; set; }
        public string FileName { get; set; }
        public long? CompanyId { get; set; }
        public string Userid { get; set; }
        public string moduleName { get; set; }
        public string SubModuleName { get; set; }
        public string Type { get; set; }
        public bool isLead { get; set; }
        public string documentTitle { get; set; }
        public string description { get; set; }
        public Boolean isWorkorder { get; set; }
        public bool isServicecrew { get; set; }
        public bool isOpportunity { get; set; }
        public bool isaccount { get; set; }
        public string filetype { get; set; }
        public string categoryId { get; set; }
        public string image { get; set; }
        public long accountid { get; set; }
    }
}
