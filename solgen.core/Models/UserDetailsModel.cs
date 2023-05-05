using System;

namespace Solgen.Core
{
    public class UserDetailsModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ProfilePic { get; set; }
        public string IPAddress { get; set; }
        public string AccountId { get; set; }
        public string Webbrowser { get; set; }
        public string BrowserVersion { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public string UserType { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string ID { get; set; }
        public string ConnectionID { get; set; }
        public string CompanyName { get; set; }
        public long CompanyStatus { get; set; }
        public Int64 CompanyId { get; set; }
        public string StorageType { get; set; }
        public string StorageRegion { get; set; }
        public string PrimaryKey { get; set; }
        public string SecondaryKey { get; set; }
        public string BlobPath { get; set; }
        public string ContainerName { get; set; }
        public bool IsInternalUser { get; set; }
        public long UserTypeID { get; set; }
        public string CompanyType { get; set; }
        public long UserStatus { get; set; }
        public string UserTypeName { get; set; }
        public bool IsHOD { get; set; }
        public string SiteUrl { get; set; }
        public string TimeZone { get; set; }
        public string TimeZoneId { get; set; }
        public string TimeZone_display_name { get; set; }
        public long TimeFormat { get; set; }
        public string RoleCode { get; set; }
        public string CompanyLogo { get; set; }
    }
}
