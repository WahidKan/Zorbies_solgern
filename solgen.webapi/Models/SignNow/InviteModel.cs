using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models.SignNow
{
    public class InviteModel
    {
        public string document_id { get; set; }
        public string subject { get; set; }
        public string message { get; set; }
        public string from { get; set; }
        public SignNowSigner[] to { get; set; }
    }
    
    public class SignNowSigner
    {
        public string email { get; set; }
        public string role { get; set; }
        public int order { get; set; }
    }
}
