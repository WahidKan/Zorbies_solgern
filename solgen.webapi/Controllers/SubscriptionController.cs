using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.Service.Subscription;
using Solgen.WebApi.Helpers;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/subscription")]
    public class SubscriptionController : Controller
    {
        private readonly ISubscriptionService _subscriptionService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IPackageService _packageService;
        public ILogService _logService;
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? UserID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }

        private string SiteUrlClaim { get { return Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "SiteUrlClaim")?.Value); } }
        IConfiguration _config;
        public SubscriptionController(ILogService logService,IPackageService packageService,IEmailSettingsService emailSettingsService, IConfiguration config, ISubscriptionService subscriptionService, UserManager<ApplicationUser> userManager)
        {
            _packageService = packageService;
            _subscriptionService = subscriptionService;
            _userManager = userManager;
            _config = config;
            _emailSettingsService = emailSettingsService;
            _logService = logService;
        }
        [HttpGet]
        [Authorize]
        [Route("GetResetPassword")]
        public async Task<ResetPasswordModel> GetResetPassword(string email)
        
        {
            var res = new ResetPasswordModel();

            var user = await _userManager.FindByEmailAsync(email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            res.UserId = user.Id;
            res.ResetToken = token;
            return res;
            //var sitedomain = "http://";
            //if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
            //{
            //    sitedomain = "https://";
            //}

            //string url= sitedomain + SiteUrlClaim + "/account/resetpassword?userId=" + user.Id + "&token=" + token;
            //return url;
        }
        [HttpPost]
        [Authorize]
        [Route("AddCompanySubscription")]
        public async Task<ResultResponseModel> AddCompanySubscription([FromBody] CompanySubscriptionModel model)
        {
            var response = new ResultResponseModel();
            try {
                var userId="";
               var talygeModel = model.ToTalygeModel();
               string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var result = await _packageService.PostApi(CompanyID.ToString(), talygeModel);
                var tgnRes = JsonConvert.DeserializeObject<TalygenResponse>(result);
                if (tgnRes.StatusCode == -1)
                {
                    response.StatusCode = 400;

                   _logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception in subscription of new company",
                        LogLongMessage = tgnRes.StatusMsg,
                        LogIpAddress = HttpContext.Request?.Host.Value,
                        LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                        LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });
                    return response;
                }
                    model.Ref_Company_Id = tgnRes.CompanyId.ToString();
                    model.Ref_Subscription_Id = tgnRes.SubscriptionId.ToString();
                    model.Status = tgnRes.StatusMsg;
                    model.Ref_User_Id = tgnRes.UserId;
                    model.Ref_Subscription_Id = model.Ref_Subscription_Id.ToString();
                    var Id = this._subscriptionService.AddCompanySubscription(UserId, model);
                    userId = this._subscriptionService.CreateCompany(Id);
                    var applicationUser = new ApplicationUser()
                    {
                        UserName = model.Email,
                        Email = model.Email,
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        ////////  UserType = model.UserType,
                        PhoneNumber = model.PhoneNumber,
                        Address = model.CompanyAddress1,
                        Id = userId
                    };
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    if (await _userManager.HasPasswordAsync(user))
                        await _userManager.RemovePasswordAsync(user);
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var sitedomain = "http://";
                    if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
                    {
                        sitedomain = "https://";
                    }

                    //var callbackUrl = "http://localhost:8530" + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;

                    var callbackUrl = sitedomain + SiteUrlClaim + "/account/setpassword?userId=" + user.Id + "&token=" + token;

                    Hashtable htbl = new Hashtable();
                    htbl["@username"] = applicationUser.FirstName + " " + applicationUser.LastName;
                    htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                    htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                    //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                    htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                    //await _emailSettingsService.SendEmail("nramzan@zorbis.net", htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(applicationUser.Id), Guid.Parse(UserID.ToString()), false, _config.GetSection("CommonSettings")["Register"], "Registration", "1003");
                    await _emailSettingsService.SendEmail(model.Email, htbl,
                    "Set Password", $"Please Set your account by clicking this link: <a href='{callbackUrl}'>link</a>",
                     Convert.ToString(user.Id), Guid.Parse(user.Id), false, _config.GetSection("CommonSettings")["SuperAdminRegisteration"],
                    "Set Password", CompanyID.ToString(), true);


                    Guid guid = _logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Information,
                        LogShortMessage = $"Company is subscribed successfully",
                        //LogLongMessage = ex.Message,
                        LogIpAddress = HttpContext.Request?.Host.Value,
                        LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                        LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });

                //var tgnRes= JsonConvert.DeserializeObject<TalygenResponse>(result);
                //model.Ref_Company_Id = tgnRes.CompanyId.ToString();
                //model.Ref_Subscription_Id = tgnRes.SubscriptionId.ToString();
                //model.Status = tgnRes.StatusMsg;
                //model.Ref_User_Id = tgnRes.UserId;
                //model.Ref_Subscription_Id = model.Ref_Subscription_Id.ToString();
                //Id = this._subscriptionService.AddCompanySubscription(UserId, model);
                //var userId = this._subscriptionService.CreateCompany(Id);
                //var applicationUser = new ApplicationUser()
                //{
                //    UserName = model.Email,
                //    Email = model.Email,
                //    FirstName = model.FirstName,
                //    LastName = model.LastName,
                //    ////////  UserType = model.UserType,
                //    PhoneNumber = model.PhoneNumber,
                //    Address = model.CompanyAddress1,
                //    Id = userId
                //}; 
                //var token = await _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);

                //var user = await _userManager.FindByEmailAsync(model.Email);
                //if (await _userManager.HasPasswordAsync(user))
                //    await _userManager.RemovePasswordAsync(user);
                //var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                //var sitedomain = "http://";
                //if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
                //{
                //    sitedomain = "https://";
                //}

                ////var callbackUrl = "http://localhost:8530" + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;

                //var callbackUrl = sitedomain + SiteUrlClaim + "/account/setpassword?userId=" + user.Id + "&token=" + token;

                //Hashtable htbl = new Hashtable();
                //htbl["@username"] = applicationUser.FirstName + " " + applicationUser.LastName;
                //htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                //htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                ////  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                //htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                ////await _emailSettingsService.SendEmail("nramzan@zorbis.net", htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(applicationUser.Id), Guid.Parse(UserID.ToString()), false, _config.GetSection("CommonSettings")["Register"], "Registration", "1003");
                //await _emailSettingsService.SendEmail(model.Email, htbl,
                //"Set Password", $"Please Set your account by clicking this link: <a href='{callbackUrl}'>link</a>",
                // Convert.ToString(user.Id), Guid.Parse(user.Id), false, _config.GetSection("CommonSettings")["SuperAdminRegisteration"],
                //"Set Password", CompanyID.ToString(), true);


                //Guid guid = _logService.Save(new LogModel
                //{
                //    LogId = Guid.NewGuid(),
                //    LogType = LogTypes.Information,
                //    LogShortMessage = $"Company is subscribed successfully",
                //    //LogLongMessage = ex.Message,
                //    LogIpAddress = HttpContext.Request?.Host.Value,
                //    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                //    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                //    LogCreatedBy = Guid.NewGuid(),
                //    LogCreatedOn = DateTime.UtcNow
                //});
                response.StatusCode = 200;
                return response;

            }



            catch (Exception ex)
            {
                 response.StatusCode = 400;
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in subscription of new company",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
            }
            return response;
        }


        // method for add subsciption from storefront

            [HttpPost]
        [AllowAnonymous]
        [Route("AddCompanySubscriptionFromStorefront")]
        public async Task<int> AddCompanySubscriptionFromStorefront([FromBody] CompanySubscriptionModel model)
        {
            string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var Id = this._subscriptionService.AddCompanySubscription(UserId, model);
            var userId = this._subscriptionService.CreateCompany(Id);
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                ////////  UserType = model.UserType,
                PhoneNumber = model.PhoneNumber,
                Address = model.CompanyAddress1,
                Id = userId
            };
            //var token = await _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);

            var user = await _userManager.FindByEmailAsync(model.Email);

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            if (await _userManager.HasPasswordAsync(user))
                await _userManager.RemovePasswordAsync(user);
            var sitedomain = "http://";
            if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
            {
                sitedomain = "https://";
            }

            //var callbackUrl = "http://localhost:8530" + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;
            var callbackUrl = sitedomain + SiteUrlClaim + "/account/setpassword?userId=" + user.Id + "&token=" + token;

            Hashtable htbl = new Hashtable();
            htbl["@username"] = applicationUser.FirstName + " " + applicationUser.LastName;
            htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
            htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
            //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
            htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
            //await _emailSettingsService.SendEmail("nramzan@zorbis.net", htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(applicationUser.Id), Guid.Parse(UserID.ToString()), false, _config.GetSection("CommonSettings")["Register"], "Registration", "1003");
            await _emailSettingsService.SendEmail(model.Email, htbl,
            "Set Password", $"Please Set your account by clicking this link: <a href='{callbackUrl}'>link</a>",
             Convert.ToString(user.Id), Guid.Parse(user.Id), false, _config.GetSection("CommonSettings")["SuperAdminRegisteration"],
            "Set Password", CompanyID.ToString(), true);

            return Id;
        }
        [HttpGet]
        [Authorize]
        [Route("GetSubscriptionList")]
        public IActionResult GetSubscriptionList(string sortCol, string sortOrder, int totalPage, int pageNum, string searchBy, string searchIndustry, bool? isForSuperAdminDashboard, string fromDate, string toDate)
        {
            
            try
            {
                var lst = this._subscriptionService.GetSubscriptionList(sortCol, sortOrder, totalPage, pageNum, searchBy, searchIndustry, isForSuperAdminDashboard, fromDate, toDate);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("CheckEmailDuplicate")]
        public string CheckEmailDuplicate(string Email)
        {
            return this._subscriptionService.CheckEmailDuplicate(Email);
        }
        [HttpGet]
        [Route("DeleteSubscription")]
        public bool DeleteSubscription(int Id)
        {
            return this._subscriptionService.DeleteSubscription(Id);
        }

        [HttpPost]
        [Route("deleteselectedSubs")]
        [Authorize]
        public bool deleteselectedSubs(string ids)
        {
            try
            {
                string data = ids.Replace("undefined", "");
                string[] values = data.Split(',');
                dynamic result = "";

                foreach (var item in values)
                {
                    if (!string.IsNullOrEmpty(item))
                        _subscriptionService.DeleteSubscription(Convert.ToInt32(item));
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpGet]
        [Route("GetPackage")]
        public async Task<IActionResult> GetPackage()
        {
            try
            {
                var result = await _packageService.GetPackage(CompanyID.ToString());
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("GetDiscount")]
        public async Task<IActionResult> GetDiscount()
        {
            try
            {
                var result = await _packageService.GetDiscount(CompanyID.ToString());
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet]
        [Route("GetAddOn")]
        public async Task<IActionResult> GetAddOn()
        {
            try
            {
                var result = await _packageService.GetAddOn(CompanyID.ToString());
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        //[HttpGet]
        //[Route("GetPackageList")]
        //public string GetPackageList()
        //{
        //    return this._subscriptionService.GetPackageList();
        //}
        //[HttpGet]
        //[Route("GetAdOnsList")]
        //public string GetAdOnsList()
        //{
        //    return this._subscriptionService.GetAdOnsList();
        //}
    }
}
