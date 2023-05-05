using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class UserListingModel
    {
        public string ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get { return FirstName + " " + LastName; } }
        public bool IsActive { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
        public string EmployeeType { get; set; }
        public string Position { get; set; }
        public string UserTypeName { get; set; }
        public string EmployeeTypeName { get; set; }
        public string PositionName { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }
    }
}
