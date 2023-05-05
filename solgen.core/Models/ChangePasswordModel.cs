using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class ChangePasswordModel
    {
        public string CurrentPassword { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public Guid? UserID { get; set; }
    }
}
