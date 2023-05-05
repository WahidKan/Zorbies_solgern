using System;
namespace Solgen.Core
{
    public class ApplicationUserModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IPAddress { get; set; }
        public string Webbrowser { get; set; }
        public string BrowserVersion { get; set; }
        public bool IsActive { get; set; }
        public string UserType { get; set; }
        public Guid? Position { get; set; }
        public Guid? EmployeeType { get; set; }
        public string UManagerId { get; set; }  
        public string Notes { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Id { get; set; }
        public Guid? AssignedBankId { get; set; }

        public string ProfilePic { get; set; }

        public string FileName { get; set; }
        public string City { get; set; }
        public Guid? State { get; set; }
        public string ZipCode { get; set; }
        public string County { get; set; }
        // public Guid? RoleID { get; set; }
        public long? RoleID { get; set; }
        public string ExecutiveCommisionFormula { get; set; }
        public Int64? DepartmentID { get; set; }
        public Int64? TimeZoneId { get; set; }
        public Int64? TimeFormat { get; set; }
        public Int64? LocationID { get; set; }
        public bool IsHOD { get; set; }
        public long? companyid { get;  set; }
        public long? salesForceEmployeOrContact { get; set; }
        public string refFrom { get; set; }
        public string oldemail { get; set; }
        public bool sendMail { get; set; }
        public string reportToId { get; set; }
        public string sfid { get; set; }
        public string sid { get; set; }
        public bool? emailNotification { get; set; }
    }

//    Id: null
//address: "united s"
//assignedBankId: undefined
//city: "union"
//companyid: null
//county: "usa"
//departmentID: "25"
//email: "tom@yopmail.com"
//employeeType: null
//executiveCommisionFormula: null
//firstName: "tom"
//isActive: true
//isHOD: true
//lastName: "hery"
//locationID: null
//notes: ""
//phoneNumber: "(444) 444-4444"
//position: null
//refFrom: "Employee"
//roleId: "49c9e8f0-dad7-4b7f-951b-c7b9bb17fd07"
//salesForceEmployeOrContact: null
//state: 5
//userType: "5e3366c2-cbea-4080-ba0d-0ca74a3f3394"
//zipCode: "12321"
}
