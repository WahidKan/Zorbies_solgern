using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;
using System.IO;
using System.Net.Http;
using System.Threading;
using Newtonsoft.Json;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        private readonly UserHub _userHub;
        private readonly IContactService _contactService;
        private readonly SolgenDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IConfiguration _config;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private IUserService _userService;
        private readonly IUserConnectionManager _userConnectionManager;
        private readonly INotificationService _notificationService;
        private readonly IAccountService _accountService;

        private static readonly HttpClient httpClient = new HttpClient();
        //private const string tokenEndpoint = "https://login.microsoftonline.com/6bedc3ec-9470-4ba2-9129-739aacff7873/oauth2/v2.0/token";
        private const string tokenEndpoint = "https://login.microsoftonline.com/6bedc3ec-9470-4ba2-9129-739aacff7873/oauth2/token";
        //https://login.microsoftonline.com/common/oauth2/token";

        //private const string defaultAADAppId = "d03d594a-a0cb-471f-8bb7-28ddce2d9966  abb96df2-1e63-44a6-8753-77a1f3502f85";  //6bedc3ec-9470-4ba2-9129-739aacff7873
        private const string defaultAADAppId = "21e7661e-c26b-493b-afee-33779d9ffecc";//59ae2965-5ecf-4fed-8ed4-0dde6713a2a7
                                                                                      // private const string client_secret = "7rlKwMEhpSTfIrg55Sxn7gyvoJ9hrFgSYQPZC0dYjqU="; 
        private const string client_secret = "Z~3bf~xmrrHxvwDN.b4m60W~gdDWmVieKW";
        // Token cache handling
        private static readonly SemaphoreSlim semaphoreSlimTokens = new SemaphoreSlim(1);
        private AutoResetEvent tokenResetEvent = null;
        //private readonly ConcurrentDictionary<string, string> tokenCache = new ConcurrentDictionary<string, string>();
        private bool disposedValue;
        private CookieOptions option;
        Random random = null;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long companyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? userID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }
        private string SiteUrlClaim { get { return Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "SiteUrlClaim")?.Value); } }

        public AccountController(UserManager<ApplicationUser> userManager, IHubContext<UserHub> hub
                                , SignInManager<ApplicationUser> signinManager, UserHub userHub
                                , ICommonService commonService
                                , SolgenDbContext dbContext
                                , IEmailSettingsService emailSettingsService
                                , IConfiguration config
                                , IHttpContextAccessor httpContext, IUserService userservice
                                , IUserConnectionManager userConnectionManager
                                , INotificationService notificationService
                                , IAccountService accountService
                                 , IContactService contactService)

        {
            _userManager = userManager;
            _signinManager = signinManager;
            _dbContext = dbContext;
            _contactService = contactService;
            _commonService = commonService; _userHub = userHub;
            _emailSettingsService = emailSettingsService;
            _config = config;
            _httpContext = httpContext;
            _userService = userservice;
            _userConnectionManager = userConnectionManager;
            _notificationService = notificationService;
            _accountService = accountService;
        }

        /*! 
        * \brief   Registration
        * \details Function is used to Register user for client
        * \author  Vikrant
        * \date    05 Sep 2019
        * \version 1.0    
        */
        [HttpPost]
        [Route("Register")]
        [Authorize]
        public async Task<object> Register([FromBody] ApplicationUserModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();

            // var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            // var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                ////////  UserType = model.UserType,
                PhoneNumber = model.PhoneNumber,
                Address = model.Address,
                City = model.City,
                State = model.State == null ? Guid.Empty : model.State,
                ZipCode = model.ZipCode,
                AssignedBankId = model.AssignedBankId == null ? Guid.Empty : model.AssignedBankId,
                County = model.County,
                IsActive = model.IsActive,
                Position = model.Position == null ? Guid.Empty : model.Position,
                EmployeeType = model.EmployeeType == null ? Guid.Empty : model.EmployeeType,
                ///////////// RoleID = model.RoleID == null ? Guid.Empty : model.RoleID,
                Notes = model.Notes,
                Webbrowser = WebBrowser,
                BrowserVersion = OSWebBrowser,
                IPAddress = IPAddress,
                LastLoginDate = DateTime.UtcNow,
                CreatedOn = DateTime.UtcNow,
                ExecutiveCommisionFormula = model.ExecutiveCommisionFormula,
                CompanyID = Convert.ToInt64(companyID),//model.companyid,--not from Company dropdown
                DepartmentID = model.DepartmentID,
                LocationID = model.LocationID,
                IsHOD = model.IsHOD,
                RefID = model.salesForceEmployeOrContact == null ? 0 : model.salesForceEmployeOrContact,
                TimeZone = model.TimeZoneId,
                TimeFormat = model.TimeFormat,
                ReportToId = model.reportToId,
                sfid = model.sfid,
                s_id = model.sid
                // Reffrom=model.refFrom

            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser);

                if (result.Succeeded)
                {


                    //--make entry in Mapping table
                    _commonService.AssociateUserWithCompany(userID, companyID, model.Email, Guid.Parse(applicationUser.Id), model.RoleID, Convert.ToInt64(model.UserType), model.DepartmentID, model.IsHOD, false, model.emailNotification);

                    _contactService.AddContactSaleFinance(model, companyID, userID);

                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);

                    var sitedomain = "http://";
                    if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
                    {
                        sitedomain = "https://";
                    }
                    //var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;

                    var callbackUrl = sitedomain + SiteUrlClaim + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;

                    try
                    {
                        Hashtable htbl = new Hashtable();
                        htbl["@username"] = applicationUser.FirstName + " " + applicationUser.LastName;
                        htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                        htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                        //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                        htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                        if (companyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        else if (companyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                        else if (companyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                        else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        await _emailSettingsService.SendEmail(applicationUser.Email, htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(applicationUser.Id), Guid.Parse(userID.ToString()), false, _config.GetSection("CommonSettings")["Register"], "Registration", companyID.ToString());
                    }
                    catch
                    {
                        HttpContext.Session.Clear();
                    }
                    _commonService.AddActivityLog(Convert.ToString(userID), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                        " has Added new @utype <strong>" + model.FirstName + " " + model.LastName + "</strong>", string.Empty); //model.UserType);
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "User has been added successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    if (result.Errors.Count() > 0)
                    {
                        _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), "Error occurs while updating User");
                        var err = result.Errors.FirstOrDefault();
                        if (err != null)
                        {
                            if (err.Code == "DuplicateUserName")
                            {
                                resultResponseModel.ResponseMessage = "Email already exists";
                            }
                            else
                            {
                                resultResponseModel.ResponseMessage = err.Description;
                            }
                        }
                        else
                        {
                            resultResponseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
                        }
                    }
                    else
                    {
                        resultResponseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
                    }
                    return Ok(resultResponseModel);
                }
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        #region Jurisdiction Account 



        [HttpPost]
        [Authorize]
        [Route("AddeditJurisdictionAccount")]
        public async Task<ActionResult> AddeditJurisdictionAccount([FromBody] JurisdictionModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyID;
                var data = _accountService.AddeditJurisdictionAccount(model);
                result.ResponseMessage = data.Result;
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetJurisdictionById")]
        public IActionResult GetJurisdictionById(string documentId)
        {
            try
            {
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = _accountService.GetJurisdictionById(documentId, companyId);

                if (result == null)
                    return BadRequest();
                return Content(result, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        #endregion

        [HttpGet]
        [Route("CheckUserDuplicateORAssociate")]
        [Authorize]
        public IActionResult CheckUserDuplicateORAssociate(string emailID, Guid? uid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string status = _commonService.CheckUserDuplicateORAssociate(userID, companyID, emailID, uid);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = status;
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {

                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Route("CheckUserAssociate")]
        [Authorize]
        public IActionResult CheckUserAssociate(string emailID, Guid? uid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string status = _commonService.CheckUserAssociate(userID, companyID, emailID, uid);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = status;
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {

                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Route("AssociateUserWithCompany")]
        [Authorize]
        public async Task<object> AssociateUserWithCompany(string emailID, Guid? uid, long? RoleID, long? userTypeId, long? deptid, bool ishod = false, bool isEnableUser = false)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                //string userId = User.Claims.FirstOrDefault(x => x.Type == "userID")?.Value;
                //string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;  //CompanyName
                string companyName = User.Claims.FirstOrDefault(x => x.Type == "CompanyName")?.Value;
                string userId = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string status = _commonService.AssociateUserWithCompany(userID, companyID, emailID, uid, RoleID, userTypeId, deptid, ishod, isEnableUser);
                if (status == "associate")
                {
                    try
                    {
                        Hashtable htbl = new Hashtable();
                        htbl["@username"] = companyName;
                        //htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                        htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                        //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                        htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                        if (companyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        else if (companyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                        else if (companyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                        else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        await _emailSettingsService.SendEmail(emailID, htbl, "Associate User", $"Your company has been associate, Same company!", userId, Guid.Parse(userId), false, _config.GetSection("CommonSettings")["AssociateUser"], "AssociateUser", companyID.ToString());
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }

                }
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = status;
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {

                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }
        //public string ClientIPAddr { get; private set; }
        public string LocalIPAddr { get; private set; }

        [HttpPost]
        [Route("Login")]
        /*! 
        * \brief   Login
        * \details Function is used to validate the user and login
        * \author  deepak jha
        * \date    04 Sep 2020
        * \version 1.0    
        */

        public async Task<object> Login([FromBody] LoginModel model)
        {
            try
            {
                dynamic usrdetails = null;
                model.IPAddress = IPAddress;

                var user = await _userManager.FindByNameAsync(model.UserName);
				if (user==null)
				{
                    return Ok(new { token = "User not found", status = 404 });
                }
				else
				{

                if(user.IsActive)
                {
                    if (user == null)
                    {
                        return Ok(new { token = "Invalid Email/Password", status = 201 });
                    }
                    else if (user != null && user.IsDeleted == true)
                    {//if user is deleted or inactive
                        return Ok(new { token = "Invalid Username/Password!", status = 201 });
                    }
                    else if (user != null && user.EmailConfirmed == false)
                    {
                        return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
                    }

                    option = new CookieOptions();

                    if (model.isLoginForMutipleUserCredential == true)
                    {
                        usrdetails = _userService.GetUserInfo(user.Id, model.CompanyId);
                        //Remove session 
                        HttpContext.Session.Remove("passwoprd");
                        //////var siteLink = CommonSettings.AppSetting["CommonSettings:SiteLink"] + "lease/editlease/";
                        //////var notification = _commonService.GetNotificationByOperationUser(user.Id, siteLink);
                        #region //set the cookie 
                        /// <summary>  
                        /// set the cookie  
                        /// </summary>  
                        /// <param name="Key ("UserName")">key (unique indentifier)</param>  
                        /// <param name="value (model.UserName)">value to store in cookie object</param>  
                        /// <param name="expireTime">expiration time it may be//minutes/days/hours anything u want</param>  
                        /// 
                        if (model.RememberMe)
                        {

                            option.Expires = DateTime.Now.AddMinutes(30);
                            //option.Expires = DateTime.Now.AddDays(30);
                            // option.Expires = DateTime.Now.AddHours(30); 

                            Response.Cookies.Append("UserName", model.UserName, option);
                            Response.Cookies.Append("Password", model.Password, option);
                        }
                        else
                        {
                            //Remove cookies if Not Remember me
                            Response.Cookies.Delete("UserName");
                            Response.Cookies.Delete("Password");
                        }
                        #endregion

                        //  _userHub.OnLogin(Guid.Parse(user.Id));
                        int stamp = RandomCodeGenerator();
                        var token = CommonFunctions.GetToken(user, stamp, model.Browser, model.OS, usrdetails, model.CompanyId, model.CompanyName);
                        if (model.CompanyId != "" && model.CompanyName != "")
                        {
                            usrdetails.CompanyId = Convert.ToInt64(model.CompanyId);
                        }

                        _commonService.AddLoginHistory(model, usrdetails.CompanyId);
                        // _userHub.GetConnectionId(usrdetail.ID,stamp);
                        return Ok(new
                        {
                            token,
                            status = 200,
                            CompanyId = usrdetails.CompanyId,
                            Name = usrdetails.FirstName + " " + usrdetails.LastName,
                            ProfilePic = usrdetails.ProfilePic,
                            StorageType = usrdetails.StorageType,
                            StorageRegion = usrdetails.StorageRegion,
                            PrimaryKey = usrdetails.PrimaryKey,
                            SecondaryKey = usrdetails.SecondaryKey,
                            BlobPath = usrdetails.BlobPath,
                            ContainerName = usrdetails.ContainerName,
                            usertype = usrdetails.UserType,
                            timeZone = _commonService.GetTimeZone(usrdetails.TimeZone),
                            timeFormat = usrdetails.TimeFormat
                        });
                    }
                    if (string.IsNullOrEmpty(model.Password))
                    {
                        //if (TempData["password"] != "" && TempData["password"] != null)
                        //{
                        //    model.Password = Convert.ToString(TempData.Peek("password"));

                        //}
                        if (_httpContext.HttpContext.Session.GetString("passwoprd") != null && HttpContext.Session.GetString("passwoprd") != "")
                        {
                            model.Password = _httpContext.HttpContext.Session.GetString("passwoprd");
                        }
                        var data = _commonService.AddErrorAndException("Password Fill" + model.Password, "_httpContext.HttpContext.Session.GetString()");
                    }
                    var multipleUserResponse = await _signinManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: true);
                    if (multipleUserResponse.Succeeded)
                    {
                        IEnumerable<dynamic> companyMappingData = _commonService.GeHeaderCompanyList(user.Id);
                        var obj = JsonConvert.SerializeObject(companyMappingData);

                        //var activeMapping = JsonConvert.DeserializeObject<List<ApplicantCompanyMappingModel>>(obj);
                        //activeMapping = activeMapping.Where(x => x.StatusId == "1001").ToList();
                        if (companyMappingData != null && companyMappingData.Count() > 0)
                        {
                            if (companyMappingData.Count() == 1)
                            {
                                long compStatus = 0;
                                foreach (dynamic item in companyMappingData)
                                {
                                    try
                                    {
                                        compStatus = item.companystatus; //item.companystatus;
                                        model.CompanyId = Convert.ToString(item.CompanyId);
                                        model.CompanyName = item.CompanyName;
                                    }
                                    catch (Exception ex)
                                    {

                                    }
                                }
                                if (compStatus != 1001)
                                {
                                    return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                                }
                            }
                            else
                            {
                                //var comanylist = "";
                                //foreach (var item in companyMappingData)
                                //{
                                //    comanylist = item["CompanyId "];
                                //}
                                //if (string.IsNullOrEmpty(model.CompanyId))
                                //{
                                //    var CompanyL = companyMappingData;
                                //    return Ok(new { CompanyList = CompanyL, isMultiple="true"});


                                //}
                                //else
                                //{
                                //have multiple companies associated
                                bool goMultiComp = true;
                                if (model.isMutipleUser == false)
                                {//first Login click
                                    foreach (dynamic item in companyMappingData)
                                    {//check if login with any company last time
                                        try
                                        {
                                            if (item.LastLogin == true)
                                            {//yes logined with any company
                                                model.CompanyId = Convert.ToString(item.CompanyId);
                                                model.CompanyName = item.CompanyName;
                                                goMultiComp = false;
                                                break;
                                            }
                                        }
                                        catch (Exception ex)
                                        {

                                        }
                                    }

                                    if (goMultiComp)
                                    {
                                        HttpContext.Session.SetString("passwoprd", model.Password);
                                        return Ok(new
                                        {
                                            status = 204,
                                            UserId = user.Id,
                                        });
                                    }
                                }
                                //}

                            }
                        }
                        else
                        {
                            return Ok(new { token = "Invalid Email/Password", status = 500 });
                        }
                    }
                    else
                    {
                        var data = _commonService.AddErrorAndException("Password empty", "_httpContext.HttpContext.Session.GetString()");
                        return Ok(new { token = "Invalid Email/Password", status = 500 });
                    }

                    //else if (user != null && user.IsActive == false)
                    //{
                    //    return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                    //}
                    //if (user != null && user.IsActive == false && user.EmailConfirmed == false)
                    //{
                    //    return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
                    //}
                    var usrdetail = _userService.GetUserInfo(user.Id, model.CompanyId);

                    if (usrdetail.CompanyStatus == 1003)
                    {//company deleted
                        return Ok(new { token = "Invalid Email/Password", status = 201 });
                    }
                    else if (usrdetail.UserStatus != 1001)
                    {//company deleted
                        return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                    }
                    else if (usrdetail.CompanyStatus == 1002)
                    {
                        return Ok(new { token = "Your Company has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                    }

                    var result = await _signinManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: true);

                    if (result.Succeeded)
                    {
                        //Remove session 
                        HttpContext.Session.Remove("passwoprd");
                        //////var siteLink = CommonSettings.AppSetting["CommonSettings:SiteLink"] + "lease/editlease/";
                        //////var notification = _commonService.GetNotificationByOperationUser(user.Id, siteLink);
                        #region //set the cookie 
                        /// <summary>  
                        /// set the cookie  
                        /// </summary>  
                        /// <param name="Key ("UserName")">key (unique indentifier)</param>  
                        /// <param name="value (model.UserName)">value to store in cookie object</param>  
                        /// <param name="expireTime">expiration time it may be//minutes/days/hours anything u want</param>  
                        /// 
                        if (model.RememberMe)
                        {

                            option.Expires = DateTime.Now.AddMinutes(30);
                            //option.Expires = DateTime.Now.AddDays(30);
                            // option.Expires = DateTime.Now.AddHours(30); 

                            Response.Cookies.Append("UserName", model.UserName, option);
                            Response.Cookies.Append("Password", model.Password, option);
                        }
                        else
                        {
                            //Remove cookies if Not Remember me
                            Response.Cookies.Delete("UserName");
                            Response.Cookies.Delete("Password");
                        }
                        #endregion

                        //  _userHub.OnLogin(Guid.Parse(user.Id));
                        int stamp = RandomCodeGenerator();
                        var token = CommonFunctions.GetToken(user, stamp, model.Browser, model.OS, usrdetail, model.CompanyId, model.CompanyName);
                        if (model.CompanyId != "" && model.CompanyName != "")
                        {
                            usrdetail.CompanyId = Convert.ToInt64(model.CompanyId);
                        }

                        _commonService.AddLoginHistory(model, usrdetail.CompanyId);
                        // _userHub.GetConnectionId(usrdetail.ID,stamp);
                        return Ok(new
                        {
                            token,
                            status = 200,
                            CompanyId = usrdetail.CompanyId,
                            Name = usrdetail.FirstName + " " + usrdetail.LastName,
                            ProfilePic = usrdetail.ProfilePic,
                            StorageType = usrdetail.StorageType,
                            StorageRegion = usrdetail.StorageRegion,
                            PrimaryKey = usrdetail.PrimaryKey,
                            SecondaryKey = usrdetail.SecondaryKey,
                            BlobPath = usrdetail.BlobPath,
                            ContainerName = usrdetail.ContainerName,
                            usertype = usrdetail.UserType,
                            TimeZone = _commonService.GetTimeZone(usrdetail.TimeZone),
                            timeFormat = usrdetail.TimeFormat

                        }); ;
                    }
                    else if (result.IsLockedOut)
                    {
                        return Ok(new { token = "Your Account is Blocked for 30 minutes because you have entered wrong Email/Password.", status = 501 });
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    }
                }
                else
                {

                    return Ok(new { token = "Your account has been locked due to invalid attempts.", status = 201 });
                }
				}
                
                return Ok(new { token = "Invalid Email/Password", status = 500 });
            }
            catch (Exception ex)
            {
                return Ok(new { Error = ex.Message.ToString(), status = 500 });
            }
        }


		[HttpPost]
		[Route("GetUserByEmail")]

		public async Task<object> GetUserByEmail([FromBody]  LoginModel model)
		{
			


            try
            {
                dynamic usrdetails = null;
                model.IPAddress = IPAddress;

                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user == null)
                {
                    return Ok(new { token = "User not found", status = 404 });
                }
                else
                {

                    if (user.IsActive)
                    {
                        if (user == null)
                        {
                            return Ok(new { token = "Invalid Email/Password", status = 201 });
                        }
                        else if (user != null && user.IsDeleted == true)
                        {//if user is deleted or inactive
                            return Ok(new { token = "Invalid Username/Password!", status = 201 });
                        }
                        else if (user != null && user.EmailConfirmed == false)
                        {
                            return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
                        }

                        else if (user != null && string.IsNullOrWhiteSpace(user.PasswordHash))
                        {
                            return Ok(new { token = "Company Password is not set yet.", status = 201 });
                        }


                        option = new CookieOptions();



                        IEnumerable<dynamic> companyMappingData = _commonService.GeHeaderCompanyList(user.Id);
                        var obj = JsonConvert.SerializeObject(companyMappingData);

                        //var activeMapping = JsonConvert.DeserializeObject<List<ApplicantCompanyMappingModel>>(obj);
                        //activeMapping = activeMapping.Where(x => x.StatusId == "1001").ToList();
                        if (companyMappingData != null && companyMappingData.Count() > 0)
                        {
                            if (companyMappingData.Count() == 1)
                            {
                                long compStatus = 0;
                                foreach (dynamic item in companyMappingData)
                                {
                                    try
                                    {
                                        compStatus = item.companystatus; //item.companystatus;
                                        model.CompanyId = Convert.ToString(item.CompanyId);
                                        model.CompanyName = item.CompanyName;
                                    }
                                    catch (Exception ex)
                                    {

                                    }
                                }
                                if (compStatus != 1001)
                                {
                                    return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                                }
                            }
                            else
                            {
                                //var comanylist = "";
                                //foreach (var item in companyMappingData)
                                //{
                                //    comanylist = item["CompanyId "];
                                //}
                                //if (string.IsNullOrEmpty(model.CompanyId))
                                //{
                                //    var CompanyL = companyMappingData;
                                //    return Ok(new { CompanyList = CompanyL, isMultiple="true"});


                                //}
                                //else
                                //{
                                //have multiple companies associated
                                bool goMultiComp = true;
                                if (model.isMutipleUser == false)
                                {//first Login click
                                    foreach (dynamic item in companyMappingData)
                                    {//check if login with any company last time
                                        try
                                        {
                                            if (item.LastLogin == true)
                                            {//yes logined with any company
                                                model.CompanyId = Convert.ToString(item.CompanyId);
                                                model.CompanyName = item.CompanyName;
                                                goMultiComp = false;
                                                break;
                                            }
                                        }
                                        catch (Exception ex)
                                        {

                                        }
                                    }

                                    if (goMultiComp)
                                    {
                                        HttpContext.Session.SetString("passwoprd", model.Password);
                                        return Ok(new
                                        {
                                            status = 204,
                                            UserId = user.Id,
                                        });
                                    }
                                }
                                //}

                            }
                        }
                        else
                        {
                            return Ok(new { token = "Invalid Email/Password", status = 500 });
                        }

                        var usrdetail = _userService.GetUserInfo(user.Id, model.CompanyId);

                        if (usrdetail.CompanyStatus == 1003)
                        {//company deleted
                            return Ok(new { token = "Invalid Email/Password", status = 201 });
                        }
                        else if (usrdetail.UserStatus != 1001)
                        {//company deleted
                            return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                        }
                        else if (usrdetail.CompanyStatus == 1002)
                        {
                            return Ok(new { token = "Your Company has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                        }


                        int stamp = RandomCodeGenerator();
                        var token = CommonFunctions.GetToken(user, stamp, model.Browser, model.OS, usrdetail, model.CompanyId, model.CompanyName);
                        if (model.CompanyId != "" && model.CompanyName != "")
                        {
                            usrdetail.CompanyId = Convert.ToInt64(model.CompanyId);
                        }

                        _commonService.AddLoginHistory(model, usrdetail.CompanyId);
                        // _userHub.GetConnectionId(usrdetail.ID,stamp);
                        return Ok(new
                        {
                            token,
                            status = 200,
                            CompanyId = usrdetail.CompanyId,
                            Name = usrdetail.FirstName + " " + usrdetail.LastName,
                            ProfilePic = usrdetail.ProfilePic,
                            StorageType = usrdetail.StorageType,
                            StorageRegion = usrdetail.StorageRegion,
                            PrimaryKey = usrdetail.PrimaryKey,
                            SecondaryKey = usrdetail.SecondaryKey,
                            BlobPath = usrdetail.BlobPath,
                            ContainerName = usrdetail.ContainerName,
                            usertype = usrdetail.UserType,
                            TimeZone = _commonService.GetTimeZone(usrdetail.TimeZone),
                            timeFormat = usrdetail.TimeFormat,
                            email= usrdetail.Email

                        });


                    }
                    else
                    {

                        return Ok(new { token = "Your account has been locked due to invalid attempts.", status = 201 });
                    }
                }
               
            }

            catch (Exception ex)
            {

                throw;
            }
		}



        [HttpPost]
        [Route("ValidateUserByEmail")]

        public async Task<object> ValidateUserByEmail([FromBody] LoginModel model)
        {



            try
            {
                dynamic usrdetails = null;
                model.IPAddress = IPAddress;

                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user == null)
                {
                    return Ok(new { token = "User not found", status = 404 });
                }
                else
                {

                    if (user.IsActive)
                    {
                        if (user == null)
                        {
                            return Ok(new { token = "Invalid Email/Password", status = 201 });
                        }
                        else if (user != null && user.IsDeleted == true)
                        {//if user is deleted or inactive
                            return Ok(new { token = "Invalid Username/Password!", status = 201 });
                        }
                        else if (user != null && user.EmailConfirmed == false)
                        {
                            return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
                        }

                        else if (user != null && string.IsNullOrWhiteSpace(user.PasswordHash))
                        {
                            return Ok(new { token = "Company Password is not set yet.", status = 201 });
                        }


                        option = new CookieOptions();



                        IEnumerable<dynamic> companyMappingData = _commonService.GeHeaderCompanyList(user.Id);
                        var obj = JsonConvert.SerializeObject(companyMappingData);

                        //var activeMapping = JsonConvert.DeserializeObject<List<ApplicantCompanyMappingModel>>(obj);
                        //activeMapping = activeMapping.Where(x => x.StatusId == "1001").ToList();
                        if (companyMappingData != null && companyMappingData.Count() > 0)
                        {
                            if (companyMappingData.Count() == 1)
                            {
                                long compStatus = 0;
                                foreach (dynamic item in companyMappingData)
                                {
                                    try
                                    {
                                         model.CompanyId = Convert.ToString(item.CompanyId);
                                        model.CompanyName = item.CompanyName;
                                        compStatus = item.companystatus; //item.companystatus;                                       
                                    }
                                    catch (Exception ex)
                                    {

                                    }
                                }
                                if (compStatus != 1001)
                                {
                                    return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                                }
                            }
                            else
                            {
                                //var comanylist = "";
                                //foreach (var item in companyMappingData)
                                //{
                                //    comanylist = item["CompanyId "];
                                //}
                                //if (string.IsNullOrEmpty(model.CompanyId))
                                //{
                                //    var CompanyL = companyMappingData;
                                //    return Ok(new { CompanyList = CompanyL, isMultiple="true"});


                                //}
                                //else
                                //{
                                //have multiple companies associated
                                bool goMultiComp = true;
                                if (model.isMutipleUser == false)
                                {//first Login click
                                    foreach (dynamic item in companyMappingData)
                                    {//check if login with any company last time
                                        try
                                        {
                                            if (item.LastLogin == true)
                                            {//yes logined with any company                                              
                                                goMultiComp = false;
                                                model.CompanyId = Convert.ToString(item.CompanyId);
                                                model.CompanyName = item.CompanyName;
                                                break;
                                            }
                                        }
                                        catch (Exception ex)
                                        {

                                        }
                                    }

                                    if (goMultiComp)
                                    {
                                      
                                    }
                                }
                                //}

                            }
                        }
                        else
                        {
                            return Ok(new { token = "Invalid Email/Password", status = 500 });
                        }

                        var usrdetail = _userService.GetUserInfo(user.Id, model.CompanyId);

                        if (usrdetail.CompanyStatus == 1003)
                        {//company deleted
                            return Ok(new { token = "Invalid Email/Password", status = 201 });
                        }
                        else if (usrdetail.UserStatus != 1001)
                        {//company deleted
                            return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                        }
                        else if (usrdetail.CompanyStatus == 1002)
                        {
                            return Ok(new { token = "Your Company has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
                        }


                      
                        return Ok(new
                        {                            
                            status = 200,
                           
                        });


                    }
                    else
                    {

                        return Ok(new { token = "Your account has been locked due to invalid attempts.", status = 201 });
                    }
                }

            }

            catch (Exception ex)
            {

                throw;
            }
        }


        [HttpGet]
        [Route("LoginForLoan")]
        /*! 
        * \brief   Login
        * \details Function is used to validate the user and login
        * \author  deepak jha
        * \date    04 Sep 2020
        * \version 1.0    
        */

        public async Task<object> LoginForLoan(string id)
        {
            try
            {
                dynamic usrdetails = null;                

                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return Ok(new { token = "User not found", status = 404 });
                }
                else
                {

                    if (user.IsActive)
                    {
                        if (user == null)
                        {
                            return Ok(new { token = "Invalid Email/Password", status = 201 });
                        }
                        else if (user != null && user.IsDeleted == true)
                        {//if user is deleted or inactive
                            return Ok(new { token = "Invalid Username/Password!", status = 201 });
                        }
                        else if (user != null && user.EmailConfirmed == false)
                        {
                            return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
                        }

                        option = new CookieOptions();

                      
                        
                        await _signinManager.SignInAsync(user, isPersistent: false);
                        var usrdetail = _userService.GetUserInfo(user.Id, user.CompanyID.ToString());
                        //  _userHub.OnLogin(Guid.Parse(user.Id));
                        int stamp = RandomCodeGenerator();
                        var token = CommonFunctions.GetToken(user, stamp, "Chrome", "Windows", usrdetail, user.CompanyID.ToString(), user.FirstName);
                        //_commonService.AddLoginHistory(model, usrdetail.CompanyId);
                        // _userHub.GetConnectionId(usrdetail.ID,stamp);
                        return Ok(new
                        {
                            token,
                            status = 200,
                            CompanyId = usrdetail.CompanyId,
                            Name = usrdetail.FirstName + " " + usrdetail.LastName,
                            ProfilePic = usrdetail.ProfilePic,
                            StorageType = usrdetail.StorageType,
                            StorageRegion = usrdetail.StorageRegion,
                            PrimaryKey = usrdetail.PrimaryKey,
                            SecondaryKey = usrdetail.SecondaryKey,
                            BlobPath = usrdetail.BlobPath,
                            ContainerName = usrdetail.ContainerName,
                            usertype = usrdetail.UserType,
                            TimeZone = _commonService.GetTimeZone(usrdetail.TimeZone),
                            timeFormat = usrdetail.TimeFormat

                        });
                    }
                    else
                    {

                        return Ok(new { token = "Your account has been locked due to invalid attempts.", status = 201 });
                    }
                }

            }
            catch (Exception ex)
            {
                return Ok(new { Error = ex.Message.ToString(), status = 500 });
            }
        }

        [HttpPost]
        [Route("IsAccountLocked")]
        public async Task<object> IsAccountLocked([FromBody] LoginModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.UserName);
                if (user == null)
                {
                    return Ok(new { token = "User not found", status = 404 });
				}
				else
				{
                    if (user.AccessFailedCount >= 3)
                    {
                        _commonService.LockUserAccount(user.Id, false);
                        return Ok(new { token = "Your account has been locked due to invalid attempts.", status = 201 });
                    }
                    else
                    {
                        int leftAttempts = 3;
                        return Ok(new { token = "Only " + (leftAttempts - user.AccessFailedCount) + " attempts are remaining.After that your account will be locked.", status = 500 });
                    }
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Error = ex.Message.ToString(), status = 500 });
            }
        }

        [HttpPost]
        [Route("Lock_Unlock_Account")]
        public async Task<object> Lock_Unlock_Account([FromBody] dynamic userObj)
        {
            try
            {
                if(userObj != null)
                {
                    bool status = Convert.ToBoolean(userObj["status"]);
                    string userId = Convert.ToString(userObj["userId"]);
                    var user = await _userManager.FindByIdAsync(userId);
                    if (user != null)
                    {
                        _commonService.LockUserAccount(user.Id, status);
                        string statusText = status ? " unblocked " : " blocked ";
                        return Ok(new { token = "Account has been" + statusText + "successfully.", status = 201 });
                    }
                    else
                    {
                        return Ok(new { token = "Account not found. Please try again.", status = 500 });
                    }
                }
                else
                {
                    return Ok(new { token = "Something went wrong. Please try again.", status = 500 });
                }

            }
            catch (Exception ex)
            {
                return Ok(new { Error = ex.Message.ToString(), status = 500 });
            }
        }

        private int RandomCodeGenerator()
        {
            random = new Random();
            int stamp = random.Next(int.MinValue, int.MaxValue);
            return stamp;
        }

        [HttpPost]
        [Route("GetAvailableCompaniesForMobile")]
        public async Task<object> GetAvailableCompaniesForMobile([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Ok(new { token = "Invalid Email/Password", status = 201 });
            }
            else if (user != null && user.IsDeleted == true)
            {//if user is deleted or inactive
                return Ok(new { token = "Invalid Username/Password!", status = 201 });
            }
            else if (user != null && user.EmailConfirmed == false)
            {
                return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
            }
            if (model.Password == "")
            {
                if (TempData["password"] != "")
                {
                    model.Password = TempData.Peek("password").ToString();

                }
            }
            var multipleUserResponse = await _signinManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: true);
            if (multipleUserResponse.Succeeded)
            {
                IEnumerable<dynamic> companyMappingData = _commonService.GeHeaderCompanyListForMobile(user.Id, model.CompanyType);
                if (companyMappingData != null && companyMappingData.Count() > 0)
                {
                    //have multiple companies associated
                    bool isFound = false;
                    List<LoginModel> loginModelList = new List<LoginModel>();
                    foreach (dynamic item in companyMappingData)
                    {//check if login with any company last time
                        try
                        {
                           
                            loginModelList.Add(

                                new LoginModel()
                                {
                                    CompanyId = Convert.ToString(item.CompanyId),
                                    CompanyName = Convert.ToString(item.mastervalue),
                                    userType = item.userType
                                });


                            isFound = true;

                            // company ID not found
                            // return Ok(new { token = "Invalid Email/Password", status = 201 });


                        }
                        catch (Exception ex)
                        {

                        }
                    }
                    if (isFound == false)
                    {
                        return Ok(new { token = "Invalid Email/Password", status = 201 });
                    }

                    else

                    {
                        return Ok(new
                        {
                            status = 200,
                            data = loginModelList
                        });
                    }
                }

                else
                {
                    return Ok(new { token = "Invalid Email/Password", status = 500 });
                }
            }
            else
            {
                return Ok(new { token = "Invalid Email/Password", status = 500 });
            }


        }

        [HttpPost]
        [Route("LoginFromMobile")]
        public async Task<object> LoginForMobile([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Ok(new { token = "Invalid Email/Password", status = 201 });
            }
            else if (user != null && user.IsDeleted == true)
            {//if user is deleted or inactive
                return Ok(new { token = "Invalid Username/Password!", status = 201 });
            }
            else if (user != null && user.EmailConfirmed == false)
            {
                return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
            }
            if (model.Password == "")
            {
                if (TempData["password"] != "")
                {
                    model.Password = TempData.Peek("password").ToString();

                }
            }
            var multipleUserResponse = await _signinManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: true);
            if (multipleUserResponse.Succeeded)
            {
                IEnumerable<dynamic> companyMappingData = _commonService.GeHeaderCompanyList(user.Id);
                if (companyMappingData != null && companyMappingData.Count() > 0)
                {
                    //have multiple companies associated
                    bool isFound = false;

                    foreach (dynamic item in companyMappingData)
                    {//check if login with any company last time
                        try
                        {
                            //if (Convert.ToString(item.CompanyId).Equals(model.CompanyId))
                            //{

                                model.CompanyId = Convert.ToString(item.CompanyId);
                                model.CompanyName = item.CompanyName;
                                isFound = true;

                            //}

                            // company ID not found
                            // return Ok(new { token = "Invalid Email/Password", status = 201 });


                        }
                        catch (Exception ex)
                        {

                        }
                    }
                    if (isFound == false)
                    {
                        return Ok(new { token = "Invalid Email/Password", status = 201 });
                    }

                }

                else
                {
                    return Ok(new { token = "Invalid Email/Password", status = 500 });
                }
            }
            else
            {
                return Ok(new { token = "Invalid Email/Password", status = 500 });
            }

            //else if (user != null && user.IsActive == false)
            //{
            //    return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
            //}
            //if (user != null && user.IsActive == false && user.EmailConfirmed == false)
            //{
            //    return Ok(new { token = "You have not confirmed your account. Please confirm your account first to Login.", status = 201 });
            //}
            var usrdetail = _userService.GetUserInfo(user.Id, model.CompanyId);

            if (usrdetail.CompanyStatus == 1003)
            {//company deleted
                return Ok(new { token = "Invalid Email/Password", status = 201 });
            }
            else if (usrdetail.UserStatus != 1001)
            {//company deleted
                return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
            }
            else if (usrdetail.CompanyStatus == 1002)
            {
                return Ok(new { token = "Your Company has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
            }

            var result = await _signinManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: true);

            if (result.Succeeded)
            {
                //////var siteLink = CommonSettings.AppSetting["CommonSettings:SiteLink"] + "lease/editlease/";
                //////var notification = _commonService.GetNotificationByOperationUser(user.Id, siteLink);
                #region //set the cookie 
                /// <summary>  
                /// set the cookie  
                /// </summary>  
                /// <param name="Key ("UserName")">key (unique indentifier)</param>  
                /// <param name="value (model.UserName)">value to store in cookie object</param>  
                /// <param name="expireTime">expiration time it may be//minutes/days/hours anything u want</param>  
                /// 
                option = new CookieOptions();

                if (model.RememberMe)
                {

                    option.Expires = DateTime.Now.AddMinutes(30);
                    //option.Expires = DateTime.Now.AddDays(30);
                    // option.Expires = DateTime.Now.AddHours(30); 

                    Response.Cookies.Append("UserName", model.UserName, option);
                    Response.Cookies.Append("Password", model.Password, option);
                }
                else
                {
                    //Remove cookies if Not Remember me
                    Response.Cookies.Delete("UserName");
                    Response.Cookies.Delete("Password");
                }
                #endregion
                int stamp = RandomCodeGenerator();

                var token = CommonFunctions.GetToken(user, stamp, model.Browser, model.OS, usrdetail, model.CompanyId, model.CompanyName);
                if (model.CompanyId != "" && model.CompanyName != "")
                {
                    usrdetail.CompanyId = Convert.ToInt64(model.CompanyId);
                }

                var url = Request.Scheme + "://" + Request.Host.Value;
                model.ServiceRequest = url + "/dashboard/mobile/service-request";
                model.Contract = url + "/dashboard/mobile/total-contracts";
                model.DocumentUpload = url + "/dashboard/mobile/document-upload";
                model.SignedLoanDocument = url + "/dashboard/mobile/signed-loan-document";

                _commonService.AddLoginHistory(model, usrdetail.CompanyId);
                return Ok(new
                {
                    token,
                    status = 200,
                    CompanyId = usrdetail.CompanyId,
                    Name = usrdetail.FirstName + " " + usrdetail.LastName,
                    ProfilePic = usrdetail.ProfilePic,
                    StorageType = usrdetail.StorageType,
                    StorageRegion = usrdetail.StorageRegion,
                    PrimaryKey = usrdetail.PrimaryKey,
                    SecondaryKey = usrdetail.SecondaryKey,
                    BlobPath = usrdetail.BlobPath,
                    ContainerName = usrdetail.ContainerName,
                    usertype = usrdetail.UserType,
                    serviceRequest = model.ServiceRequest,
                    contract = model.Contract,
                    documentUpload = model.DocumentUpload,
                    signedLoanDocument = model.SignedLoanDocument,
                    setting = model.Setting
                }); 
            }
            else if (result.IsLockedOut)
            {
                return Ok(new { token = "Your Account is Blocked for 30 minutes because you have entered wrong Email/Password.", status = 501 });
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }
            return Ok(new { token = "Invalid Email/Password", status = 500 });
        }
        [HttpGet]
        [Route("RefreshToken")]
        /*! 
        * \brief   Login
        * \details Function is used to validate the user and login
        * \author  Vikrant
        * \date    04 Sep 2019
        * \version 1.0    
        */
        public async Task<object> RefreshToken(string username, string browser, string browserVersion, string os, string OSVersion)
        {
            var user = await _userManager.FindByNameAsync(username);
            var usrdetail = _userService.GetUserInfo(user.Id);
            int stamp = RandomCodeGenerator();
            var token = CommonFunctions.GetToken(user, stamp, browser + " " + browserVersion, OSVersion, usrdetail);
            return Ok(new { token, status = 200 });
        }
        [HttpGet]
        [Route("UpdateToken")]
        /*! 
        * \brief   Update token behalf on header company dropdown
        * \details Function is used to validate the user and login
        * \author  Naresh Saini
        * \date    26 Oct 2020
        * \version 1.0    
        */
        public async Task<object> UpdateToken(string username, string browser, string browserVersion, string os, string OSVersion, long companyId)
        {
            var user = await _userManager.FindByNameAsync(username);
            user.CompanyID = companyId;
            var usrdetail = _userService.GetUserInfoByUserIDCompanyID(user.Id, companyId);
            if (usrdetail.CompanyStatus == 1003)
            {//company deleted
                return Ok(new { token = "Invalid Email/Password", status = 201 });
            }
            else if (usrdetail.UserStatus != 1001)
            {//company deleted
                return Ok(new { token = "Your account has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
            }
            else if (usrdetail.CompanyStatus == 1002)
            {
                return Ok(new { token = "Your Company has been Deactivated. Please contact Site Administrator for further query.", status = 201 });
            }
            int stamp = RandomCodeGenerator();
            var token = CommonFunctions.GetToken(user, stamp, browser + " " + browserVersion, OSVersion, usrdetail);
            return Ok(new { token, usertype = usrdetail.UserType, status = 200 });
        }

        [HttpGet]
        [Route("GetConnectionID")]
        public IActionResult GetConnectionID()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var stamp = User.Claims.FirstOrDefault(x => x.Type == "Stamp")?.Value;
            string result = string.Empty;
            if (userId != null)
            {
                result = _userHub.GetConnectionId(userId, Convert.ToInt32(stamp));
            }
            return Ok(result);
        }


        [HttpGet]
        [Route("SendNotification")]
        public async Task<IActionResult> SendNotification(string userId)
        {
            var connections = _userConnectionManager.GetUserConnections(userId);
            if (connections != null && connections.Count > 0)
            {
                foreach (var connection in connections)
                {
                    await _userHub.Clients.Client(connection.ConnectionID).SendAsync("sendNotificationToClient", userId, "Hi, this is new notification from signalR.");

                }
            }

            return Ok("Done");
        }


        [HttpGet]
        [Route("GetRememberMeCredentials")]
        /*! 
        * \brief   Get the RememberMe Credential From cookies
        * \details Function is used to fetch the RememberMe Credential of User From cookies
        * \author  Lovepreet Kumar 
        * \date    09 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetRememberMeCredentials()
        {
            List<LoginModel> lst = new List<LoginModel>();
            try
            {
                LoginModel loginModel = new LoginModel();
                loginModel.UserName = Request.Cookies["UserName"];
                loginModel.Password = Request.Cookies["Password"];
                if (loginModel.UserName != null && loginModel.Password != null)
                {
                    loginModel.RememberMe = true;
                }
                else
                {
                    loginModel.RememberMe = false;
                }
                lst.Add(loginModel);
                return Ok(lst);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("Confirm")]
        [AllowAnonymous]
        /*! 
       * \brief   Get the conformation of account detail using email .
       * \details Function is used to fetch the  conformation of account detail using email.
       * \author  Vikrant verma. 
       * \date    09 Sep 2019
       * \version 1.0    
       */
        public async Task<IActionResult> Confirm(Guid userId, string token)
        {
            ResultResponseModel model = new ResultResponseModel();
            if (userId == null || token == null)
            {
                model.StatusCode = 500;
                model.ResponseMessage = "User not exists.";
                return Ok(model);
            }
            var user = await _userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                model.StatusCode = 500;
                model.ResponseMessage = "User not exists.";
                return Ok(model);
            }
            token = token.Replace(" ", "+");
            model.StatusCode = 200;
            model.Result = user.Id;
            return Ok(model);
        }

        [HttpPost]
        [Route("SetPassword")]
        [AllowAnonymous]
        /*! 
        * \brief   set password for user
        * \details Function is used to Set password for user regitration period.
        * \author  Dhiraj patyal.
        * \date    9 Sept 2019
        * \version 1.0    
        */
        public async Task<IActionResult> SetPassword([FromBody] SetPasswordModel model)
        {
            ResultResponseModel resultModel = new ResultResponseModel();

            if (model == null)
            {
                resultModel.StatusCode = 500;
                resultModel.ResponseMessage = "";
                return Ok(resultModel);
            }
            var user = await _userManager.FindByIdAsync(model.UserId.ToString());

            if (user == null)
            {
                resultModel.StatusCode = 500;
                resultModel.ResponseMessage = "User not exists";
                return Ok(resultModel);
            }
            //if (!await this._userManager.VerifyUserTokenAsync(user, this._userManager.Options.Tokens.PasswordResetTokenProvider, "ResetPassword", model.token))
            //{
            //    resultModel.StatusCode = 500;
            //    resultModel.ResponseMessage = "You have already generated your Password.";
            //    return Ok(resultModel);
            //}

            var changePasswordResult = await _userManager.AddPasswordAsync(user, model.Password);
            if (!changePasswordResult.Succeeded)
            {
                foreach (var error in changePasswordResult.Errors)
                {
                    if (error != null)
                    {
                        if (error.Code.Contains("UserAlreadyHasPassword"))
                        {
                            resultModel.StatusCode = 500;
                            resultModel.ResponseMessage = "You have already generated your Password.";
                            break;
                        }
                        else if (error.Code.Contains("Password"))
                        {
                            resultModel.StatusCode = 500;
                            resultModel.ResponseMessage = "Password must be combination of lower case, upper case, numeric and special character.";
                            break;
                        }
                    }
                }
            }
            else
            {
                user.IsActive = true;
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);

                await _commonService.SetPasswordStatus(model.UserId.ToString(), user.CompanyID);

                resultModel.StatusCode = 200;
                resultModel.ResponseMessage = "Your password has been set successfully.";
            }
            return Ok(resultModel);
        }

        [HttpPost]
        [Route("SetCompanyMapping")]
        [AllowAnonymous]
        /*! 
        * \brief   set password for user
        * \details Function is used to Set password for user regitration period.
        * \author  Dhiraj patyal.
        * \date    9 Sept 2019
        * \version 1.0    
        */
        public async Task<IActionResult> SetCompanyMapping([FromBody] SetCompanyMapingModel model)
        {
            ResultResponseModel resultModel = new ResultResponseModel();

            if (model == null)
            {
                resultModel.StatusCode = 500;
                resultModel.ResponseMessage = "";
                return Ok(resultModel);
            }

            await _commonService.SetCompanyMapping(model.userId.ToString(), model.CompanyMappingStatusId, companyID);

            resultModel.StatusCode = 200;
            resultModel.ResponseMessage = "Your Status  has been set successfully.";

            return Ok(resultModel);
        }



        [HttpPost]
        [AllowAnonymous]
        [Route("ForgotPassword")]
        /*! 
        * \brief   Get the password to forget time
        * \details Function is used to Forgot password on Email.
        * \author  Dhiraj patyal.
        * \date    9 Sept 2019
        * \version 1.0    
        */
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model)
        {
            ResultResponseModel resultModel = new ResultResponseModel();
            //////////  var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var companyid = model.SiteCompanyID.ToString();

            if (model == null)
            {
                resultModel.StatusCode = 500;
                resultModel.ResponseMessage = "";
                return Ok(resultModel);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                resultModel.StatusCode = 500;
                resultModel.ResponseMessage = "User does not exist";
            }
            else if (user != null)
            {
                ////// companyid = Convert.ToString(user.CompanyID);
                var code1 = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                //var callbackUrl1 = _config.GetSection("CommonSettings")["SiteLink"] + "/account/resetpassword?userId=" + user.Id + "&token=" + token;
                var sitedomain = "http://";
                if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
                {
                    sitedomain = "https://";
                }
                var callbackUrl1 = sitedomain + model.SiteCompanyURL + "/account/resetpassword?userId=" + user.Id + "&token=" + token;

                try
                {
                    Hashtable htbl1 = new Hashtable();
                    htbl1["@username"] = user.FirstName + " " + user.LastName;
                    htbl1["@year"] = DateTime.Now.Year.ToString();
                    htbl1["@link"] = $"<a href='{callbackUrl1}'>Click here</a>";
                    htbl1["@sitename"] = model.SiteTitle;//_config.GetSection("CommonSettings")["Sitename"];
                    // htbl1["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                    htbl1["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                    //if (CompanyID == 1001) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                    //else if (CompanyID == 1002) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                    //else if (CompanyID == 1003) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                    //else { htbl1["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                    var data = _config.GetSection("CommonSettings")["SiteLink"];
                    htbl1["@logolink"] = data + "/" + model.SiteImg;
                    //htbl1["@logolink"] = model.SiteImg;
                    await _emailSettingsService.SendEmail(user.Email, htbl1,
                        "Reset Password", $"Please Reset your account by clicking this link: <a href='{callbackUrl1}'>link</a>",
                        Convert.ToString(user.Id), Guid.Parse(user.Id), false, _config.GetSection("CommonSettings")["ForgotPassword"],
                        "Forgot Password", companyid, true);


                    resultModel.StatusCode = 200;
                    resultModel.ResponseMessage = "Reset Password Link has been sent to your Registered Email-Id '" + user.Email + "'";
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return Ok(resultModel);
        }

        [HttpPost]
        [Route("ResetPassword")]
        [AllowAnonymous]
        /*! 
       * \brief   Get the password to Reset password
       * \details Function is used to Reset password on Email.
       * \author  Dhiraj patyal.
       * \date    9 Sept 2019
       * \version 1.0    
       */
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            ResultResponseModel resultModel = new ResultResponseModel();
            resultModel.StatusCode = 500;
            if (model == null)
            {
                resultModel.ResponseMessage = "";
                return Ok(resultModel);
            }

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                resultModel.ResponseMessage = "User not exists";
                return Ok(resultModel);
            }
            if (user.IsActive != true)
            {
                resultModel.ResponseMessage = "Your account has been Deactivated. Please contact Site Administrator for further query.";
                return Ok(resultModel);
            }
            model.ResetToken = model.ResetToken.Replace(" ", "+");
            var changePasswordResult = await _userManager.ResetPasswordAsync(user, model.ResetToken, model.Password);

            if (!changePasswordResult.Succeeded)
            {
                foreach (var error in changePasswordResult.Errors)
                {
                    if (error != null)
                    {
                        if (error.Code.Contains("Password"))
                        {
                            resultModel.ResponseMessage = "Password must be combination of lower case, upper case, numeric and special character.";
                            break;
                        }
                        else if (error.Code.Contains("InvalidToken"))
                        {
                            resultModel.ResponseMessage = "The Password reset link has been expired.To request a new password, you need to go to the Forgot Password Page and generate a new link. Note: The link can be used only for one time.Once the user resets the password, the link immediately expires.";
                            break;
                        }
                        else
                        {
                            resultModel.ResponseMessage = "This link has been expire, please try again later!";
                            break;
                        }
                    }
                }
            }
            else
            {
                user.IsActive = true;
                await _userManager.UpdateAsync(user);
                resultModel.StatusCode = 200;
                resultModel.ResponseMessage = $"Password has been updated for the \"{user.FirstName} {user.LastName}\"";
            }
            return Ok(resultModel);
        }

        [HttpPost]
        [Route("ChangePassword")]
        [AllowAnonymous]
        /*! 
       * \brief   Get the password to Change password
       * \details Function is used to Change password on Email.
       * \author  Dhiraj patyal.
       * \date    9 Sept 2019
       * \version 1.0    
       */
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ResultResponseModel response = new ResultResponseModel();
            string WebBrowser = Request.Headers["User-Agent"].ToString();
            string OSWebBrowser = Request.Headers["User-Agent"].ToString();
            string ipAddress = _httpContext.HttpContext.Connection.RemoteIpAddress.ToString();
            string id = User.Claims.FirstOrDefault(x => x.Type == "UserID").Value;

            var user = await _userManager.FindByIdAsync(id);
            var currentpassword = await _userManager.CheckPasswordAsync(user, request.CurrentPassword);
            if (user == null)
            {
                return NotFound();
            }
            if (request.CurrentPassword == request.Password)
            {
                response.StatusCode = 500;
                response.ResponseMessage = "New password cannot be same as current password.";
                return (IActionResult)Ok(response);
            }
            var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.Password);
            if (result.Succeeded)
            {
                _commonService.AddActivityLog(id, ipAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), "Password updated successfully User");
                response.StatusCode = 200;
                response.ResponseMessage = "Password has been changed successfully.";
                return (IActionResult)Ok(response);
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    if (error != null)
                    {
                        if (error.Description == "Incorrect password.")
                        {
                            _commonService.AddActivityLog(id, ipAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), "Current password is not correct User");
                            response.StatusCode = 500;
                            response.ResponseMessage = "Current password is not correct.";
                            break;
                        }
                        else if (error.Code.Contains("Password"))
                        {
                            _commonService.AddActivityLog(id, ipAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), "Password should be combination of lower case, upper case, numeric and special character User");
                            response.StatusCode = 500;
                            response.ResponseMessage = "Password must be combination of lower case, upper case, numeric and special character.";
                            break;
                        }
                    }
                }
                return Ok(response);
            }
        }

        [HttpGet]
        [Route("GetHeaderNotification")]
        public IActionResult GetHeaderNotification()
        {
            string userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            int companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var notificationList = _notificationService.GetHeaderNotification(userId, companyId);

            return Ok(notificationList);
        }

        [HttpGet]
        [Authorize]
        [Route("GetAccountOppoutunitiesList")]
        public async Task<IActionResult> GetAccountOppoutunitiesList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountOppoutunitiesList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }

        [HttpGet]
        [Authorize]
        [Route("GetAccountContractsList")]
        public async Task<IActionResult> GetAccountContractsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountContractsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }
        [HttpGet]
        [Authorize]
        [Route("GetAccountContactsList")]
        public async Task<IActionResult> GetAccountContactsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountContactsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }
        [HttpGet]
        [Authorize]
        [Route("GetAccountProposalsList")]
        public async Task<IActionResult> GetAccountProposalsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountProposalsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }
        [HttpGet]
        [Authorize]
        [Route("GetAccountsCommunicationList")]
        public async Task<IActionResult> GetAccountsCommunicationList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountsCommunicationList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                //foreach (var item in result.Data)
                //{
                //    item.fileUrl = CommonFunctions.GetFileLink(item.fileUrl, "image", enumFileFolder.communicationAudio);
                //    if (item.fileUrl.Contains("defaultNoImage"))
                //    {
                //        item.fileUrl = "javascript:void(0);";

                //    }
                //    else
                //    {

                //        item.fileUrl = item.fileUrl.Replace("wwwroot", "");
                //    }
                //}

                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }
        [HttpGet]
        [Authorize]
        [Route("GetAccountWorkOrdersList")]
        public async Task<IActionResult> GetAccountWorkOrdersList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountWorkOrdersList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }

        [HttpGet]
        [Authorize]
        [Route("GetAccountServiceAppointmentsList")]
        public async Task<IActionResult> GetAccountServiceAppointmentsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountServiceAppointmentsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }

        [HttpGet]
        [Authorize]
        [Route("GetAccountsJurisdictionList")]
        public async Task<IActionResult> GetAccountsJurisdictionList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var result = await _accountService.GetAccountsJurisdictionList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyID, userID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }
        [HttpGet]
        //[Authorize]
        [Route("GetSiteUrl")]
        public IActionResult GetSiteURl(string url)
        {
            try
            {
                var result = _accountService.GetSiteURl(url);
                return Ok(result);
            }
            catch
            {
                string data = null;
                return Ok(data);
            }

        }

        [HttpGet]
        //[Authorize]
        [Route("GetCompanyCount")]
        public IActionResult GetCompanyCount(string userid)
        {
            try
            {
                var result = _accountService.GetCompanyCount(userid);
                return Ok(result);
            }
            catch
            {
                string data = null;
                return Ok(data);
            }

        }


        [HttpGet]
        [Authorize]
        [Route("RemoveConnections")]
        public async Task<IActionResult> Logout()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var stamp = User.Claims.FirstOrDefault(x => x.Type == "Stamp")?.Value;
            _userConnectionManager.RemoveUserConnectionByUserIdAndStamp(userId.ToLower(), Convert.ToInt32(stamp));

            return Ok();
        }


        [HttpPost]
        [Route("SetPasswordByEmail")]
        [Authorize]
        public async Task<IActionResult> SetPasswordByEmail([FromBody] ForgotPasswordViewModel model)
        {
            ResultResponseModel resultModel = new ResultResponseModel();
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

            if (model == null)
            {
                resultModel.StatusCode = 500;
                resultModel.ResponseMessage = "";
                return Ok(resultModel);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                resultModel.StatusCode = 500;
                resultModel.ResponseMessage = "User does not exist";
            }
            else if (user != null)
            {
                companyid = Convert.ToString(user.CompanyID);
                var code1 = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var callbackUrl1 = _config.GetSection("CommonSettings")["SiteLink"] + "/account/setpassword?userId=" + user.Id + "&token=" + token;

                try
                {
                    Hashtable htbl1 = new Hashtable();
                    htbl1["@username"] = user.FirstName + " " + user.LastName;
                    htbl1["@year"] = DateTime.Now.Year.ToString();
                    htbl1["@link"] = $"<a href='{callbackUrl1}'>Click here</a>";
                    htbl1["@sitename"] = model.SiteTitle;//_config.GetSection("CommonSettings")["Sitename"];
                    // htbl1["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                    htbl1["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                    //if (CompanyID == 1001) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                    //else if (CompanyID == 1002) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                    //else if (CompanyID == 1003) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                    //else { htbl1["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                    var data = _config.GetSection("CommonSettings")["SiteLink"];
                    htbl1["@logolink"] = data + "/" + model.SiteImg;
                    //htbl1["@logolink"] = model.SiteImg;
                    await _emailSettingsService.SendEmail(model.Email, htbl1, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl1}'>link</a>", Convert.ToString(user.Id), userid, false, _config.GetSection("CommonSettings")["Register"], "Registration", companyid.ToString());


                    resultModel.StatusCode = 200;
                    resultModel.ResponseMessage = "Reset Password Link has been sent to your Registered Email-Id '" + user.Email + "'";
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return Ok(resultModel);


        }
        [HttpGet]
        [Route("DownloadRingCentralRecaoding")]
        [Authorize]
        public async Task<IActionResult> DownloadRingCentralRecaoding(string recaodingPath, string accountId)
        {
            ResultResponseModel resultModel = new ResultResponseModel();
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var fileName = Path.GetFileName(recaodingPath);
            HttpClient client = new HttpClient();
            var callbackUrl1 = _config.GetSection("CommonSettings")["SfApiProductionUrl"] + "/SharePoint/DownloadFile?serverFileUrl=" + recaodingPath;
            var response = await client.GetAsync(callbackUrl1);
            //var response = await client.GetAsync("http://51.81.245.30:8082//SharePoint/DownloadFile?serverFileUrl=" + recaodingPath);
            return File(fileContents: await response.Content.ReadAsByteArrayAsync(), contentType: System.Net.Mime.MediaTypeNames.Application.Octet, fileDownloadName: fileName);

        }

        [HttpGet]
        [Route("GetRequiredCustomerFileList")]
        public IActionResult GetRequiredCustomerFileList(string accountId, string companyId)
        {
            try
            {
                var result = _accountService.GetRequiredCustomerFileList(accountId, companyId);
                return Ok(result);
            }
            catch
            {
                string data = null;
                return Ok(data);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetFundingStageCityData")]
        public IActionResult GetFundingStageCityData(long accountId)
        {
            try
            {
                var Userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _accountService.GetFundingStageCityData(Userid, CompanyID, accountId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("check_company_lisence_limit")]
        public IActionResult check_company_lisence_limit()
        {
            try
            {
                var CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var result = _accountService.check_company_lisence_limit(CompanyID);
                return Ok(result);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

    }
}