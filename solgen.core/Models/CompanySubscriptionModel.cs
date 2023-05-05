using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class CompanySubscriptionModel
    {
        //CompanySubscription
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Password { get; set; }
        public string IndustryType { get; set; }
        public string CompanyAddress1 { get; set; }
        public string CompanyAddress2 { get; set; }
        public string CompanyCity { get; set; }
        public string CompanyState { get; set; }
        public string CompanyCountry { get; set; }
        public string CompanyPostalCode { get; set; }
        public string BillingAddress1 { get; set; }
        public string BillingAddress2 { get; set; }
        public string BillingCity { get; set; }
        public string BillingState { get; set; }
        public string BillingCountry { get; set; }
        public string BillingPostalCode { get; set; }
        public DateTime? ActivationDate { get; set; }
        public string Status { get; set; }
        public string CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string Ref_Subscription_Id { get; set; }
        public string Ref_Company_Id { get; set; }
        public string Company_id { get; set; }
        public string subscription_number { get; set; }
        public decimal amount { get; set; }
        public string last_billed_on { get; set; }

        //tblSubscribedPackageInfo
        public string SubscribedPackageId { get; set; }
        public string Ref_Package_Id { get; set; }
        public string Ref_Package_Name { get; set; }
        public string Ref_AdOn_Id { get; set; }
        public string Ref_AdOn_Name { get; set; }
        public string BillingType { get; set; }
        public string ExpiryDate { get; set; }
        public string PaymentMode { get; set; }
        public int IsTrial { get; set; }
        public string PackageShortDesc { get; set; }
        public string NoOfLicense { get; set; }
        public string billingCycle { get; set; }
        public string creditCardNumber { get; set; }
        public string CardType { get; set; }
        public string expirationMonth { get; set; }
        public string expirationYear { get; set; }
        public string creditCardName { get; set; }
        public string cvv { get; set; }
        public decimal Ref_User_Id { get; set; }
    }
}
