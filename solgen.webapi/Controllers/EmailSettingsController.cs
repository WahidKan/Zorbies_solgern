using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/EmailSettings")]
    public class EmailSettingsController : Controller
    {
        private IEmailSettingsService _emailSettingsService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value).ToString(); } }
        public EmailSettingsController(IEmailSettingsService emailSettingsService, ICommonService commonService
            , IHttpContextAccessor httpContext)
        {
            _emailSettingsService = emailSettingsService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }

        [HttpGet]
        [Route("GetEmailSettings")]
        [Authorize]
        /*! 
        * \brief  Get Email seting for dynamically.
        * \details Function is used to Get the Email seting detail for SMTP.
        * \author  Anish K
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult Get()
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _emailSettingsService.GetEmailSettings(userid, CompanyID);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpPost]
        [Route("SaveEmailSettings")]
        [Authorize]
        /*! 
        * \brief  Add update Email setting.
        * \details Function is used to  Add update Email setting for SMTP.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult Post([FromBody]EmailSettingsModel model)
        {
            model.CompanyId = CompanyID;
            var result = _emailSettingsService.SaveEmailSettings(model);
          
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (result == null)
                return BadRequest();
            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                " has Added new Email Settings <strong>" + model.SMTPUserName + "</strong>");
            return Ok(result);
        }
    }
}