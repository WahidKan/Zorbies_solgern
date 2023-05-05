using Newtonsoft.Json;
using Solgen.Core.Extensions;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.Subscription
{
    public class PackageService : IPackageService
    {
        private ISubscriptionService _subscriptionService;

        public PackageService(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

       
        public async Task<string> GetPackage(string companyId)
        {
            string baseUrl = this._subscriptionService.GetSubscriptionApi(companyId);
            PackageHttpClient _client = PackageHttpClient.Create(baseUrl);
            string url =  "/package/get?externalAppCode=zolar";
            var result = await _client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }
        public async Task<string> GetAddOn(string companyId)
        {
            string baseUrl = this._subscriptionService.GetSubscriptionApi(companyId);
            PackageHttpClient _client = PackageHttpClient.Create(baseUrl);
            string url = "/package/GetAddons";
            var result = await _client.Get(url);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
        }

        public async Task<string> GetDiscount(string companyId)
        {
            string baseUrl = this._subscriptionService.GetSubscriptionApi(companyId);
            PackageHttpClient _client = PackageHttpClient.Create(baseUrl);
            string LicenseBaseUrl = "/package/GetAllSubsDiscount?ruleType=LicenseBase";
            var LicenseBaseResult = await _client.Get(LicenseBaseUrl);
            string AmountBaseUrl = "/package/GetAllSubsDiscount?ruleType=AmountBase";
            var AmountBaseResult = await _client.Get(AmountBaseUrl);
            string TimeLimitUrl = "/package/GetAllSubsDiscount?ruleType=TimeLimit";
            var TimeLimitResult = await _client.Get(TimeLimitUrl);
            string CouponBaseUrl = "/package/GetAllSubsDiscount?ruleType=CouponBase";
            var CouponBaseResult = await _client.Get(CouponBaseUrl);
            string licenseBaseContent = "";
            string AmountBaseContent = "";
            string TimeLimitContent = "";
            string CouponBaseContent = "";
            if (LicenseBaseResult.StatusCode == HttpStatusCode.OK )
            {
                licenseBaseContent= await LicenseBaseResult.Content.ReadAsStringAsync();
            }
            if (LicenseBaseResult.StatusCode == HttpStatusCode.OK)
            {
                AmountBaseContent = await AmountBaseResult.Content.ReadAsStringAsync();
            }
            if (LicenseBaseResult.StatusCode == HttpStatusCode.OK)
            {
                TimeLimitContent = await TimeLimitResult.Content.ReadAsStringAsync();
            }
            if (LicenseBaseResult.StatusCode == HttpStatusCode.OK)
            {
                CouponBaseContent = await CouponBaseResult.Content.ReadAsStringAsync();
            }
            else
            {
                return null;
            }
            var response= "{\"LicenseBase\":" + licenseBaseContent + ",\"AmountBase\":" + 
                           AmountBaseContent + ", \"TimeLimit\": " + TimeLimitContent+ ",\"CouponBase\": " + CouponBaseContent+"}";
            return response;
        }

        public async Task<string> PostApi(string companyId, TalygeModel model)
        {
            //string test = "{\"IsTrial\":2,\"RefCode\":0,\"IsClientToCa\":true,\"AdditionalUsers\":null,\"State\":\"Haryana\",\"CountryId\":99,\"CountryName\":\"India\",\"Captcha\":null,\"PackageId\":\"1171\",\"AddOnIds\":null,\"PackageName\":\"CRM\",\"PackageDesc\":null,\"NoOfUsers\":1,\"Price\":234,\"Discount\":0,\"OneTimePayment\":0,\"NetAmount\":0,\"ProNetAmount\":null,\"PaymentStatus\":null,\"NoOfLicense\":\"1\",\"AddonPrice\":null,\"SubTotal\":234,\"DiscountType\":null,\"TotalNoOfLicense\":1,\"PackageWithLicense\":null,\"PckageDiscount\":null,\"BatchId\":\"\",\"EnableFreeTrialInDays\":null,\"FreeTrialInDays\":null,\"CouponCode\":null,\"CouponDiscount\":null,\"CompanyId\":0,\"CompanyName\":\"Sony Tech\",\"CompDescription\":\"Happy\",\"CompanyType\":\"Normal\",\"ParentCompanyId\":0,\"BillingId\":0,\"BillingAddress\":{\"Address1\":\"Hisar\",\"Address2\":\"Hisar\",\"City\":\"Hisar\",\"State\":\"Haryana\",\"CountryId\":99,\"CountryName\":\"India\",\"ZipCode\":\"2345657\"},\"Comments\":null,\"CustomizeAddOn\":null,\"City\":\"Hisar\",\"ZipCode\":\"565887\",\"AddonNameData\":null,\"SubscriptionId\":0,\"UserId\":0,\"UserStatusId\":0,\"FirstName\":\"Alen\",\"LastName\":\"Cooper\",\"Password\":\"@password1\",\"PasswordSalt\":\"\",\"ConfirmPassword\":\"@password1\",\"Email\":\"test333@yopmail.com\",\"Phone\":\"534543543\",\"Token\":null,\"PaymentOption\":1,\"PaymentMode\":2,\"AccountStatus\":1,\"BillingAnniversaryDate\":6,\"BillingScheduleType\":null,\"BillingAnniversaryDateText\":\"6\",\"TimeZoneId\":32,\"AnniversaryDateList\":null,\"SubscriptionCreatedDate\":null,\"AgentId\":0,\"TalygenAmount\":0,\"CreditCards\":{\"UserCreditCardId\":0,\"CardNum\":\"4111111111111111\",\"CardType\":\"Visa\",\"CardMonth\":\"12\",\"CardYear\":\"2030\",\"NameOnCard\":\"Harsh\",\"Cvv\":\"567\"},\"Info\":{\"Browser\":null,\"ip\":\"\",\"os\":null}}";
            string baseUrl = this._subscriptionService.GetSubscriptionApi(companyId);
            PackageHttpClient _client = PackageHttpClient.Create(baseUrl);
            string RegisterUrl = "/Package/Register";

            var myContent = JsonConvert.SerializeObject(model);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = await _client.Post(RegisterUrl, byteContent);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                throw new Exception(result.StatusCode.ToString());
            }
        }
    }
}
