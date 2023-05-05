using System;

namespace Solgen.Core.Models
{
    public class ResetPasswordModel
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string ResetToken { get; set; }
    }
}
