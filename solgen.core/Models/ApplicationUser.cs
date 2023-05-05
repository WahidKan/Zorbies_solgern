using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Solgen.Core
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        [MaxLength(1000)]
        public string ProfilePic { get; set; }
        [MaxLength(50)]
        public string IPAddress { get; set; }
        [MaxLength(8000)]
        public string Webbrowser { get; set; }
        [MaxLength(8000)]
        public string BrowserVersion { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public string UserType { get; set; }
        public Guid? Position { get; set; }
        public Guid? EmployeeType { get; set; }
        public Guid? AssignedBankId { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public Guid? State { get; set; }
        public string ZipCode { get; set; }
        public string County { get; set; }
        public Guid? RoleID { get; set; }
        public string ConnectionID { get; set; }
        public string ExecutiveCommisionFormula { get; set; }
        public long? CompanyID { get; set; }
        public bool IsHOD { get; set; }
        public long? LocationID { get; set; }
        public long? DepartmentID { get; set; }


        public string Title { get; set; }
        public string NickName { get; set; }
        public string Division { get; set; }
        public string PhoneExtention { get; set; }
        public string Fax { get; set; }
        public string Mobile { get; set; }
        public string EmployeeNumber { get; set; }
        public string Country { get; set; }
        public string ManagerId { get; set; }
        public DateTime? DOB { get; set; }
        public long? RefID { get; set; }
        public string RefFrom { get; set; }
        public string sfid { get; set; }
        public string StateCode { get; set; }
        public string CountryCode { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string GeocodeAccuracy { get; set; }
        public bool? EmailPreferencesAutoBcc { get; set; }

        public bool? EmailPreferencesAutoBccStayInTouch { get; set; }
        public bool? EmailPreferencesStayInTouchReminder { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string Signature { get; set; }
        public string StayInTouchSubject { get; set; }
        public string StayInTouchSignature { get; set; }
        public string StayInTouchNote { get; set; }
        public string BadgeText { get; set; }
        public bool? SFIsActive { get; set; }
        public string TimeZoneSidKey { get; set; }
        public string LocaleSidKey { get; set; }
        public bool? ReceivesInfoEmails { get; set; }
        public bool? ReceivesAdminInfoEmails { get; set; }
        public string EmailEncodingKey { get; set; }
        public string SFProfileId { get; set; }
        public string LanguageLocaleKey { get; set; }
        public string DelegatedApproverId { get; set; }
        public string SFManagerId { get; set; }
         public DateTime? LastPasswordChangeDate { get; set; }
        public string CreatedById { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public string LastModifiedById { get; set; }
        public DateTime? SystemModstamp { get; set; }
        public string SFContactId { get; set; }
        public string SFAccountId { get; set; }
        public string SFCallCenterId { get; set; }
        public string FederationIdentifier { get; set; }
        public string AboutMe { get; set; }
        public string SFFullPhotoUrl { get; set; }
        public string SFSmallPhotoUrl { get; set; }
        public bool? IsExtIndicatorVisible { get; set; }
        public string OutOfOfficeMessage { get; set; }
        public string SFMediumPhotoUrl { get; set; }
        public string SFDigestFrequency { get; set; }
        public string DefaultGroupNotificationFrequency { get; set; }
        public DateTime? LastViewedDate { get; set; }
        public DateTime? LastReferencedDate { get; set; }
        public string SFBannerPhotoUrl { get; set; }
        public string SFSmallBannerPhotoUrl { get; set; }
        public string SFMediumBannerPhotoUrl { get; set; }
        public bool? IsProfilePhotoActive { get; set; }
        public string SFIndividualId { get; set; }
        public string dsfs__DSProSFUsername__c { get; set; }
        public string SFExternal_ID__c { get; set; }
        public string SFService_Territory__c { get; set; }
        public bool? Sales_Text__c { get; set; }
        public string SFService_Territory_PL__c { get; set; }
        public string SFMy_Team_Name__c { get; set; }
        public string SFTeam_Lead__c { get; set; }
        // public string S_Id { get; set; }      

        public string UManagerId { get; set; }
        public long? TimeZone { get; set; }
        public long? TimeFormat { get; set; }
        public string ReportToId { get; set; }
      
        public string s_id { get; set; }
    }
}
