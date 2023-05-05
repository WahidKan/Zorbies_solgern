using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solgen.Core
{
    public partial class AspNetUsers
    {
        public string Id { get; set; }
        public bool IsActive { get; set; }
        public string UserType { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ProfilePic { get; set; }
        public string IPAddress { get; set; }
        public string Webbrowser { get; set; }
        public string BrowserVersion { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid? Position { get; set; }
        public Guid? EmployeeType { get; set; }
        public string Notes { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public Guid? State { get; set; }
        public string ZipCode { get; set; }
        public string UManagerId { get; set; }
        public string County { get; set; }
        public string UserName { get; set; }     
        public Guid? AssignedBankId { get; set; }
        [NotMapped]
        public string ProfilePicLink { get; set; }
        public long? RoleID { get; set; }
        public string ExecutiveCommisionFormula { get; set; }
        public Int64? DepartmentID { get; set; }
        public Int64? LocationID { get; set; }
        public bool IsHOD { get; set; }
        public long? Companyid { get; set; }
        public long? refId { get; set; }
        public long? timezone { get; set; }
        public long? timeformat { get; set; }
        public string reportToId { get; set; }
    }
    public class ChangeStatusModel
    {
        public bool Status { get; set; }
        public string Name { get; set; }
    }

    public class CommonStatusModel
    {
        public string Status { get; set; }
        public string Name { get; set; }
    }

    public partial class GetUserDetailsModel
    {
        public string Id { get; set; }
        public bool IsActive { get; set; }
        public string UserType { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ProfilePic { get; set; }
        public string IPAddress { get; set; }
        public string Webbrowser { get; set; }
        public string BrowserVersion { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid? Position { get; set; }
        public Guid? EmployeeType { get; set; }
        public string Notes { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public Guid? State { get; set; }
        public string ZipCode { get; set; }
        public string UManagerId { get; set; }
        public string County { get; set; }
        public string UserName { get; set; }
        public Guid? AssignedBankId { get; set; }
        [NotMapped]
        public string ProfilePicLink { get; set; }
        public long? RoleID { get; set; }
        public string ExecutiveCommisionFormula { get; set; }
        public Int64? DepartmentID { get; set; }
        public Int64? LocationID { get; set; }
        public bool IsHOD { get; set; }
        public long? Companyid { get; set; }
        public long? refId { get; set; }
        public long? timezone { get; set; }
        public long? timeformat { get; set; }
        public string reportToId { get; set; }
        public bool emailNotification { get; set; }
        public string s_id { get; set; }
        public string sfid { get; set; }
        public string userTypeName { get; set; }
    }
}
