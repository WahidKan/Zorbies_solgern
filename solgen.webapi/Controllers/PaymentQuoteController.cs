using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/PaymentQuote")]
    public class PaymentQuoteController : Controller
    {
        private readonly IPaymentQuoteService paymentQuoteService;
        private readonly ICommonService _commonService;
        private readonly IConfiguration _config;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        public PaymentQuoteController(IPaymentQuoteService paymentQuoteService, ICommonService commonService
            , IConfiguration config, IEmailSettingsService emailSettingsService, IHttpContextAccessor httpContext)
        {
            this.paymentQuoteService = paymentQuoteService;
            this._commonService = commonService;
            this._config = config;
            this._emailSettingsService= emailSettingsService;
            _httpContext = httpContext;
        }

        /*! 
       *  \brief     Post API.
       *  \details   This API is used to save and update payment quote.
       *  \author    Anish
       *  \version   1.0
       *  \date      9 Sep 2019
       *  \pre       First initialize the system.
       *  \copyright Solgen.
       */

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody]PaymentQuote model)
        {
            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            model.PaymentQuoteCreatedBy = Guid.Parse(userid);

            var data = paymentQuoteService.Save(model);
            

            try
            {
                Hashtable htbl1 = new Hashtable();
                htbl1["@username"] = model.PaymentQuoteName;
                htbl1["@email"] = model.PaymentQuoteEmail;
                htbl1["@loginusername"] = name;
                htbl1["@userType"] = model.Leases[0].LeaseUseType;
                htbl1["@leaseType"] = model.Leases[0].LeaseType;
                htbl1["@collateraldesc"] = model.Leases[0].LeaseOtherDescription;
                htbl1["@description"] = model.Leases[0].LeaseDescription;
                htbl1["@leaseRate"] = model.Leases[0].LeaseRate;
                htbl1["@leaseterm"] = model.PaymentQuoteText;
                htbl1["@leaseTotalEquipmentMSRP"] = Math.Round(model.Leases[0].LeaseTotalEquipmentMSRP ?? decimal.Zero, 2);
                htbl1["@leaseResidualAmount"] = Math.Round(model.Leases[0].LeaseResidualAmount ?? decimal.Zero, 2);
                htbl1["@leaseMonthlyRentalPayment"] = Math.Round(model.Leases[0].LeaseMonthlyRentalPayment ?? decimal.Zero, 2);
                htbl1["@leasePlacementFee"] = Math.Round(model.Leases[0].LeasePlacementFee ?? decimal.Zero, 2);
                htbl1["@leaseAmountDueAtSigining"] = Math.Round(model.Leases[0].LeaseAmountDueAtSigining?? decimal.Zero, 2);
                htbl1["@quoteamount"] = Math.Round(model.Leases[0].LeaseTotalAmount ?? decimal.Zero, 2);
                htbl1["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                htbl1["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                htbl1["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                await _emailSettingsService.SendEmail(model.PaymentQuoteEmail, htbl1, "Payment Quote", $"Payment quotes verifying about it", Convert.ToString(model.Leases[0].LeaseId), Guid.Parse(userid), false, _config.GetSection("CommonSettings")["PaymentQuotes"],"Payment Quote");
            }
            catch (Exception ex)
            {
                throw ex;
            }

            result.StatusCode = 200;
            if (model.PaymentQuoteId == null)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                    " has Added new Payment Quote <strong>" + model.PaymentQuoteName + "</strong>");
                result.ResponseMessage = "Payment Quote has been added successfully.";
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                    " has Updated Payment Quote <strong>" + model.PaymentQuoteName + "</strong>");
                result.ResponseMessage = "Payment Quote has been updated successfully.";
            }
            return Ok(result);
        }

        /*! 
       *  \brief     GetPaymentQuoteList API.
       *  \details   This API is used to get a listing of payment quote.
       *  \author    Anish
       *  \version   1.0
       *  \date      9 Sep 2019
       *  \pre       First initialize the system.
       *  \copyright Solgen.
       */
        [Route("GetPaymentQuoteList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetPaymentQuoteList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(paymentQuoteService.GetPaymentQuoteList(name, From, To, sortColumn, sortDir, page, pageSize, userId));
        }

        [Route("GetContactId")]
        [HttpGet]
        [Authorize]
        /*! 
      *  \brief     GetContactId API.
      *  \details   This API is used to get a Contact detail bu Email id.
      *  \author    Anish
      *  \version   1.0
      *  \date      9 Sep 2019
      *  \pre       First initialize the system.
      *  \copyright Solgen.
      */
        public IActionResult GetContactId(string email)
        {

            Guid data = paymentQuoteService.GetContactId(email);

            if (data == Guid.Empty)
                return Ok(null);

            return Ok(data);
        }
        

    }
}