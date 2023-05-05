using System;

namespace Solgen.Core
{
    public class SetPasswordModel
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string token { get; set; }
    }
    public class SetCompanyMapingModel
    {
        public string userId { get; set; }
        public int CompanyMappingStatusId { get; set; }
    }
    public class SetPasswordByEmail
    {
        public string UserId { get; set; }
        public string email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string token { get; set; }
    }
}
