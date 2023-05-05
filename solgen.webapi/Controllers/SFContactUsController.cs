using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.Service.SFContactUs;
using Solgen.WebApi.Helpers;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/SFContactUs")]
    [ApiController]
    public class SFContactUsController : Controller
    {
        public readonly IContactUsService _service;
        IConfiguration _config;
        private readonly IEmailSettingsService _emailSettingsService;
        public SFContactUsController(IContactUsService service, IConfiguration config, IEmailSettingsService emailSettingsService)
        {
            _service = service;
            _config = config;
            _emailSettingsService = emailSettingsService;
        }

        // Request a demo

        [HttpPost]
        [AllowAnonymous]
        [Route("AddContactUs")]
        public async Task<IActionResult> AddContactUs([FromBody] SFContactUsModel model)

        {

            ResultResponseModel responseModel = new ResultResponseModel();

            try
            {
               
                var message = await _service.AddContactUs(model);
                responseModel.ResponseMessage = message;

                var superAdmin =_service.GetSuperAdminMail();
                var email = "" + model.Email + "," + superAdmin + "";
                foreach (var Toemail in email.Split(","))
                {
                    //var user = await _userManager.FindByEmailAsync(model.Email);

                    //var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    //if (await _userManager.HasPasswordAsync(user))
                    //    await _userManager.RemovePasswordAsync(user);
                    //var sitedomain = "http://";
                    //if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
                    //{
                    //    sitedomain = "https://";
                    //}

                    //var callbackUrl = "http://localhost:8530" + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;
                    // var callbackUrl = sitedomain + SiteUrlClaim + "/account/setpassword?userId=" + user.Id + "&token=" + token;

                    Hashtable htbl = new Hashtable();
                    //htbl["@username"] = applicationUser.FirstName + " " + applicationUser.LastName;
                    //  htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                    htbl["@sitename"] = model.Message;
                    //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                    htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                    //await _emailSettingsService.SendEmail("nramzan@zorbis.net", htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(applicationUser.Id), Guid.Parse(UserID.ToString()), false, _config.GetSection("CommonSettings")["Register"], "Registration", "1003");
                    await _emailSettingsService.SendEmail(Toemail, htbl,
                    model.Subject, model.Message,
                     Convert.ToString(model.ID), new Guid(), false, "contactUsEmail",
                    "Subscriptions", "1000", true);
                }
                return Ok(responseModel);
            }
            catch 
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }


        }


        [HttpGet]
        [Route("GetContactUsLeadsList")]
        public async Task<ActionResult> GetContactUsLeadsList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, bool? isForSuperAdminDashboard, string fromDate, string toDate)
        {
            try
            {
                var data = await _service.GetContactUsLeadsList(listFilter,sortColumn, sortDir, pageIndex, pageSize, isForSuperAdminDashboard, fromDate, toDate);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

    }
}
