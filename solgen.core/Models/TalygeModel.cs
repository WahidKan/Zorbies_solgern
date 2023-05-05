using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class TalygeModel
    {
        public int IsTrial { get; set; }
        public int RefCode { get; set; }
        public bool IsClientToCa { get; set; }
        public string AdditionalUsers { get; set; }
        public string State { get; set; }
        public string CountryId { get; set; }
        public string CountryName { get; set; }
        public string Captcha { get; set; }
        public string PackageId { get; set; }
        public string AddOnIds { get; set; }
        public string PackageName { get; set; }
        public string PackageDesc { get; set; }
        public int NoOfUsers { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int OneTimePayment { get; set; }
        public int NetAmount { get; set; }
        public string ProNetAmount { get; set; }
        public string PaymentStatus { get; set; }
        public string NoOfLicense { get; set; }
        public string AddonPrice { get; set; }
        public int SubTotal { get; set; }
        public string DiscountType { get; set; }
        public int TotalNoOfLicense { get; set; }
        public string PackageWithLicense { get; set; }
        public string PckageDiscount { get; set; }
        public string BatchId { get; set; }
        public string EnableFreeTrialInDays { get; set; }
        public string FreeTrialInDays { get; set; }
        public string CouponCode { get; set; }
        public string CouponDiscount { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompDescription { get; set; }
        public string CompanyType { get; set; }
        public int ParentCompanyId { get; set; }
        public int BillingId { get; set; }
        public BillingAddress billingAddress { get; set; }
        public string Comments { get; set; }
        public string CustomizeAddOn { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string AddonNameData { get; set; }
        public int SubscriptionId { get; set; }
        public int UserId { get; set; }
        public int UserStatusId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Token { get; set; }
        public int PaymentOption { get; set; }
        public int PaymentMode { get; set; }
        public int AccountStatus { get; set; }
        public int BillingAnniversaryDate { get; set; }
        public string BillingScheduleType { get; set; }
        public string BillingAnniversaryDateText { get; set; }
        public int? TimeZoneId { get; set; }
        public string AnniversaryDateList { get; set; }
        public DateTime? SubscriptionCreatedDate { get; set; }
        public int AgentId { get; set; }
        public decimal TalygenAmount { get; set; }
        public CreditCards creditCards { get; set; }
        public Info info { get; set; }
      
    }
    public class TalygenResponse
    {
        public decimal StatusCode { get; set; }
        public decimal UserId { get; set; }
        public decimal CompanyId { get; set; }
        public decimal SubscriptionId { get; set; }
        public string InvoiceId { get; set; }
        public string StatusMsg { get; set; }
    }
    public class packageInfo
    {
        public string name { get; set; }
        public int id { get; set; }
        public int license { get; set; }
    }
    public static class TalygenExtension
    {
        public static TalygeModel ToTalygeModel(this CompanySubscriptionModel model)
        {
            //var tgnRes = JsonConvert.DeserializeObject<List<packageInfo>>(model.Ref_Package_Name);


            return new TalygeModel()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                CompanyName = model.CompanyName,
                Email = model.Email,
                Phone = model.PhoneNumber,
                Password = "@Password1",
                ConfirmPassword = "@Password1",
                CompanyType = model.IndustryType,
                City = model.CompanyCity,
                State = model.CompanyState,
                CountryId = model.CompanyCountry,
                CountryName = model.CompanyCountry,
                ZipCode = model.CompanyPostalCode,
                SubscriptionCreatedDate = model.ActivationDate,
                TalygenAmount = model.amount,
                PackageId = model.Ref_Package_Id,
                AddOnIds = model.Ref_AdOn_Id,
                //PackageName = tgnRes.name,
                PackageDesc = model.PackageShortDesc,
                AddonNameData = model.Ref_AdOn_Name,
                BillingScheduleType = model.BillingType,
                IsTrial = 2,
                NoOfLicense = model.NoOfLicense,
                NoOfUsers = 1,
                BillingAnniversaryDate = '6',
                TimeZoneId=null,
                billingAddress = new BillingAddress()
                {
                    Address1 = model.BillingAddress1,
                    Address2 = model.BillingAddress2,
                    City = model.BillingCity,
                    State = model.CompanyState,
                    CountryName = model.BillingCountry,
                    CountryId = model.BillingCountry,
                    ZipCode = model.BillingPostalCode
                },
                creditCards = new CreditCards()
                {
                    CardNum = model.creditCardNumber,
                    CardType = model.CardType,
                    CardMonth = model.expirationMonth,
                    CardYear = model.expirationYear,
                    NameOnCard = model.creditCardName,
                    Cvv = model.cvv
                },
                info = new Info()
                {
                    Browser = null,
                    ip = "",
                    os=null
                }
            };
        }

    }
}
