using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Solgen.Core.Models
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string SiteTitle { get; set; }
        public string SiteImg { get; set; }
        public string SiteCompanyURL { get; set; }
        public long SiteCompanyID { get; set; }
    }
}
