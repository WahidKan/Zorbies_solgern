using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Solgen.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using System.Collections;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/LeaseFunding")]
    public class LeaseFundingPackageController : Controller
    {
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _config;
        private readonly ILeaseFundingPackageService _fundingPackageService;
        private readonly IEmailSettingsService _emailSettingsService;

        public LeaseFundingPackageController(ICommonService commonService,
            IHttpContextAccessor httpContext, IEmailSettingsService emailSettingsService,
            IConfiguration config, ILeaseFundingPackageService fundingPackageService)
        {
            this._commonService = commonService;
            _httpContext = httpContext;
            _config = config;
            _emailSettingsService = emailSettingsService;
            _fundingPackageService = fundingPackageService;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        [HttpGet]
        [Authorize]
        [Route("GetFundingPackageList")]
        /*! 
     * \brief   Get funding package list
     * \details Function is used to Get funding package list
     * \author  deepak jha
     * \date    25 October 2019
     * \version 1.0    
     */
        public IActionResult GetFundingPackageList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string contactId)
        {
            var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var lst = _fundingPackageService.GetLeaseFundingPackageList(searchText, leaseStatus, saleMan, expFrom, expTo, commFrom, commTo, sortColumn, sortDir, pageIndex, pageSize, uid, contactId);
            return Ok(lst);
        }
       
        [HttpPost]
        [Authorize]
        [Route("ChangeLeaseStatusForApprove")]
        /*! 
     * \brief   Bank user approve for purchase to lease
     * \details Function is used to approve for purchase lease
     * \author  deepak jha
     * \date    25 October 2019
     * \version 1.0    
     */
        public IActionResult ChangeLeaseStatusForApprove(Guid leaseId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            int result = -1;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            BankApprovalModel model = _fundingPackageService.ChangeLeaseStatusForApprove(leaseId, userid);
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            string contactid = Convert.ToString(Guid.Empty);
            string editLeaseLink = "";
            var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "account";
            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
            if (model.LeaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
            }
            if (model!= null)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "Approved For Funding", " has approved the Lease #" + model.LeaseNumber + " for Funding");
                _commonService.AddNotification("Lease #"+model.LeaseNumber+" Approved for Funding", "@contactbusinessname 's Lease #" + model.LeaseNumber + " has been approved for Funding by "
                    + name, userid, model.LeaseContactId.ToString(),
                       enumNotificationType.LeaseFundApprove.ToEnumString(), notificationToUser, userid, model.LeaseNumber, "Lease");


                editLeaseLink = CommonSettings.AppSetting["CommonSettings:SiteLink"] + "lease/editlease/" + leaseId;
                editLeaseLink = "@contactbusinessname 's Lease #" + model.LeaseNumber + " has been sent for Approval to @leasebankname by " + name + ".Please <a href=" + editLeaseLink + ">Click Here</a> to approve it.";
               

                Hashtable htbl = new Hashtable();
                htbl["@OperationUserName"] = name;
                htbl["@LeaseNumber"] = "#<b>" + model.LeaseNumber + "</b>";
                htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                htbl["@BusinessName"] = model.ContactbusinessName;
                htbl["@year"] = DateTime.Now.Year.ToString();
                htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                _emailSettingsService.SendEmail(model.BankEmailIDs, htbl, "Lease Approved for funding", $"Lease #"+ model.LeaseNumber.ToString() + " has been approved for funding" , model.LeaseNumber, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["LeaseApprovedFunded"], "Lease");
                responseModel.StatusCode = 200;
                responseModel.ResponseMessage = "Lease Approved for Funding";
            }
            else
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";

            }
            return Ok(responseModel);
        }
    }
}