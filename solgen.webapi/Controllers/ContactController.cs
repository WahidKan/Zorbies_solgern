using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Contact")]
    public class ContactController : Controller
    {
        private IHubContext<UserHub> _hub;
        private readonly IContactService _contactService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly IUserService _UserService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ICommonService _commonService;
        private readonly IEmailTemplateService _emailTemplateService;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IConfiguration _config;
        public ContactController(IContactService contactService, IHubContext<UserHub> hub
                                , UserManager<ApplicationUser> userManager
                                , SignInManager<ApplicationUser> signinManager
                                , IHttpContextAccessor httpContext
                                , ICommonService commonService
                                , IEmailTemplateService emailTemplateService
                                , IEmailSettingsService emailSettingsService
                                , IConfiguration config,IUserService userService)
        {
            _contactService = contactService;
            _userManager = userManager;
            _signinManager = signinManager;
            _httpContext = httpContext;
            _commonService = commonService;
            _emailTemplateService = emailTemplateService;
            _emailSettingsService = emailSettingsService;
            _hub = hub;
            _config = config;
            _UserService = userService;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private string SiteUrlClaim { get { return Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "SiteUrlClaim")?.Value); } }
        private Guid? UserID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }

        [HttpGet]
        [Authorize]
        public IActionResult Get(Guid contactId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var model = _contactService.GetContactDetailsById(contactId);
            if (model == null)
            {
                return BadRequest();
            }
            return Ok(model);
        }

        [HttpDelete]
        [Authorize]
        public IActionResult Delete(Guid guarantorID)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var guid = _contactService.DeleteGuarantor(guarantorID);
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            if (guid == Guid.Empty)
            {
                return BadRequest();
            }
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("logoutuser", guarantorID));

            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has deleted Contact");
            return Ok(guid);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] ContactFormModel contactFormModel)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;

            if (contactFormModel.ContactId == null)
            {
                var contactModel = contactFormModel.ContactDetails.FirstOrDefault();
                if (contactModel != null)
                {
                    var applicationUser = new ApplicationUser()
                    {
                        NormalizedUserName = contactModel.ContactEmail,
                        Email = contactModel.ContactEmail,
                        FirstName = contactModel.ContactFirstName,
                        LastName = contactModel.ContactLastName,
                        UserName = contactModel.ContactEmail,
                        UserType = "AEA72F14-7616-4494-912E-24EBD3EDAA35",
                        PhoneNumber = contactModel.ContactBussinessPhone,
                        Address = contactModel.ContactBussinessPhysicalAddress,
                        IsActive = true,
                        Position = contactModel.ContactPosition,
                        EmployeeType = Guid.Empty,
                        Notes = "",
                        Webbrowser = WebBrowser,
                        BrowserVersion = OSWebBrowser,
                        IPAddress = IPAddress,
                        LastLoginDate = DateTime.UtcNow,
                        CreatedOn = DateTime.UtcNow,
                        CompanyID = CompanyID

                    };
                    try
                    {
                        var result = _userManager.CreateAsync(applicationUser).GetAwaiter().GetResult();
                        if (result.Succeeded)
                        {
                            contactFormModel.ContactAdminId = applicationUser.Id;
                        }
                        else
                        {
                            responseModel.StatusCode = 500;
                            var error = result.Errors.FirstOrDefault();
                            if (error != null)
                            {
                                responseModel.ResponseMessage = error.Description;
                            }
                            else
                            {
                                responseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
                            }
                            return Ok(responseModel);
                        }
                    }
                    catch (Exception ex)
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = ex.Message;
                        return Ok(responseModel);
                    }
                }
            }
            else
            {
                string status = _contactService.IsEmailExist(contactFormModel.ContactId, Convert.ToString(contactFormModel.ContactDetails[0].ContactEmail));
                if (status != "Success")
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = status;
                    return Ok(responseModel);
                }
            }
            contactFormModel.UserID = User.Claims.FirstOrDefault(x => x.Type == "UserID").Value.ToGuid();
            contactFormModel.ContactDetails[0].CompanyID = CompanyID;
            var contactId = _contactService.AddOrUpdateContactDetails(contactFormModel, CompanyID);
            if (contactId == null || contactId == Guid.Empty)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Error.ToString(), " Error occurs while Add/Updated Contact");
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
                return Ok(responseModel);
            }
            responseModel.StatusCode = 200;
            if (contactFormModel.ContactId == null)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), " has Added new Contact of " + contactFormModel.ContactDetails[0].ContactFirstName + " " + contactFormModel.ContactDetails[0].ContactLastName);
                responseModel.ResponseMessage = "Contact has been added successfully.";

                _commonService.AddNotification("Contact Added ", "<b>" + contactFormModel.ContactDetails[0].ContactFirstName + " " + contactFormModel.ContactDetails[0].ContactLastName + "</b> Contact has been added by " + name, userid, userid,
                          enumNotificationType.ContactAdded.ToEnumString(), enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString(),
                          userid, contactId.ToString(), "Contact");

            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " has Updated Contact of " + contactFormModel.ContactDetails[0].ContactFirstName + " " + contactFormModel.ContactDetails[0].ContactLastName);
                responseModel.ResponseMessage = "Contact has been updated successfully.";
            }
            return Ok(responseModel);
        }

        [HttpGet]
        [Authorize]
        [Route("GetContactList")]
        /*! 
        * \brief   Get the list of contact
        * \details Function is used to fetch the list of contact
        * \author  Kiran Bala 
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetContactList(string name, DateTime? from, DateTime? to, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, bool isDashBoard)
        {
            var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            return Ok(_contactService.GetContactList(name, from, to, sortColumn, sortDir, page, pageSize, uid, isDashBoard, CompanyID));
        }

        [HttpGet]
        [Authorize]
        [Route("GetSearchResult")]
        /*! 
    *  \brief     GetSearchResult API.
    *  \details   This API is used to get Search result of contact.
    *  \author    Vikrant verma.
    *  \version   1.0
    *  \date      24-09-2019
    *  \pre       First initialize the system.
    *  \copyright Solgen.
    */
        public IActionResult GetSearchResult(string searchType)
        {
            //if (string.IsNullOrEmpty(searchType))
            //    return BadRequest();

            var records = _contactService.GetSearchResult(searchType, CompanyID);
            return Ok(records);
        }

        [HttpGet]
        [Authorize]
        [Route("GetEmailPackage")]
        /*! 
    *  \brief     GetEmailPackage API.
    *  \details   This API is used to get Email package by ContactId.
    *  \author    Dhiraj patyal
    *  \version   1.0
    *  \date      24-10-2019
    *  \pre       First initialize the system.
    *  \copyright Solgen.
    */
        public IActionResult GetEmailPackage(Guid contactId)
        {
            string templateHtml = "Something went worng. Please contact site administrator.";
            var emailTemplateModel = _emailTemplateService.GetEmailTemplteByTemplateName(CommonSettings.AppSetting["CommonSettings:WelcomePackage"]);
            if (contactId != Guid.Empty)
            {
                var contact = _contactService.GetContactDetailsById(contactId);
                if (emailTemplateModel != null)
                {
                    if (contact != null)
                    {
                        Hashtable htbl = new Hashtable();
                        htbl["@firstname"] = contact.ContactDetails[0].ContactFirstName;
                        htbl["@username"] = contact.ContactDetails[0].ContactEmail;
                        htbl["@link"] = $"<a href='javascript:void(0);'>Click here</a>";
                        htbl["@sitename"] = CommonSettings.AppSetting["CommonSettings:Sitename"];
                        htbl["@logolink"] = CommonSettings.AppSetting["CommonSettings:Logolink"];
                        htbl["@sitelink"] = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                        templateHtml = CommonSettings.ReplaceFileVariables(htbl, emailTemplateModel.Template);
                    }
                }
            }
            return Ok(templateHtml);
        }

        [HttpGet]
        [Authorize]
        [Route("SendEmailPackage")]
        /*! 
     *  \brief     SendEmailPackage API.
     *  \details   This API is used to Send Email package by ContactId.
     *  \author    Dhiraj patyal
     *  \version   1.0
     *  \date      24-10-2019
     *  \pre       First initialize the system.
     *  \copyright Solgen.
     */
        public async Task<IActionResult> SendEmailPackage(Guid contactId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
              + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
              + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            if (contactId != Guid.Empty)
            {
                var contact = _contactService.GetContactDetailsById(contactId);


                if (contact != null)
                {
                    var applicationUser = _userManager.Users.FirstOrDefault(x => x.Id == contact.ContactAdminId);
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                    var callbackUrl = CommonSettings.AppSetting["CommonSettings:SiteLink"] + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;
                    try
                    {
                        Hashtable htbl = new Hashtable();
                        htbl["@firstname"] = contact.ContactDetails[0].ContactFirstName;
                        htbl["@username"] = contact.ContactDetails[0].ContactEmail;
                        htbl["@link"] = $"<a href='{callbackUrl}'>Click here</a>";
                        htbl["@sitename"] = CommonSettings.AppSetting["CommonSettings:Sitename"];
                        htbl["@year"] = DateTime.Now.Year.ToString();
                        htbl["@logolink"] = CommonSettings.AppSetting["CommonSettings:Logolink"];
                        htbl["@sitelink"] = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                        await _emailSettingsService.SendEmail(applicationUser.Email, htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", contactId.ToString(), Guid.Parse(applicationUser.Id), false, CommonSettings.AppSetting["CommonSettings:WelcomePackage"], "Contact");
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Welcome package has been sent successfully.";

                        _commonService.AddNotification("Welcome Package sent to <b>" + contact.ContactDetails[0].ContactFirstName + " " + contact.ContactDetails[0].ContactLastName + "</b>", "Welcome Package has been sent to <b>" + contact.ContactDetails[0].ContactFirstName + " " + contact.ContactDetails[0].ContactLastName + "</b> by " + name, userid, contactId.ToString(), enumNotificationType.WelcomePackage.ToEnumString(), notificationToUser, userid);


                        _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "WelcomePackage", " has sent welcome package to " + contact.ContactDetails[0].ContactFirstName + " " + contact.ContactDetails[0].ContactLastName);

                        var isWelcomeSend = _contactService.IsWelcomePackageSend(contactId, userid);
                    }
                    catch
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
                    }
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
                }
            }
            else
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
            }
            return Ok(responseModel);
        }

        /*! 
      *  \brief     GetContactIdByUserId API.
      *  \details   This API is used to get Contact IDby User id.
      *  \author    Sharma Sharma
      *  \version   1.0
      *  \date      24-10-2019
      *  \pre       First initialize the system.
      *  \copyright Solgen.
      */
        [Route("GetContactIdByUserId")]
        [HttpGet]
        [Authorize]
        public IActionResult GetContactIdByUserId(Guid id)
        {
            var ContactId = _contactService.GetContactIdByUserId(id);
            if (ContactId == null)
                return NotFound();

            return Ok(ContactId);
        }

        /*! 
        *  \brief     Post API.
        *  \details   This API is used to save the Customer Bulk Upload from excel file into database.
        *  \author    Rahul Sharma 
        *  \version   1.0
        *  \date      03-12-2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        [HttpPost]
        [Route("SaveBulkUpload")]
        [Authorize]
        public IActionResult SaveBulkUpload([FromForm] BulkUploadModel model)
        {
            var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            bool isvalid = true, isListStateExist = false, istypeofCompanyExist = false, isPositionExist = false, isDocumentSignedExist = false;
            List<SelectItemModel> stateList = new List<SelectItemModel>();
            stateList = _commonService.GetStateList();

            List<MasterItems> companyTypeLst = new List<MasterItems>();
            companyTypeLst = _commonService.GetMasterItems("CompanyType", uid, CompanyID);

            List<MasterItems> positionLst = new List<MasterItems>();
            positionLst = _commonService.GetMasterItems("BussinessContactPosition", uid, CompanyID);

            List<string> preferredDocumentSigned = new List<string>();
            preferredDocumentSigned.Add("DocuSign");
            preferredDocumentSigned.Add("Wet Signature");

            ResultResponseModel result = new ResultResponseModel();
            RootJsonObject obj = JsonConvert.DeserializeObject<RootJsonObject>(model.BulkUploadJSONObject);
            if (obj.ContactInformation != null)
            {
                if (obj.ContactInformation.Count > 0)
                {
                    StringBuilder sbAlertLog = new StringBuilder();
                    StringBuilder sbSecondSheetError = new StringBuilder();
                    StringBuilder sbDuplicate = new StringBuilder();
                    decimal value;
                    Int32 count = 2;
                    string pattern = @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z";
                    Regex regex = new Regex(pattern, RegexOptions.IgnoreCase);
                    #region Validate Sheet
                    foreach (ContactInformation sheet in obj.ContactInformation)
                    {
                        if (string.IsNullOrEmpty(sheet.BusinessName))  // string value
                        {
                            sbAlertLog.Append($"Cell <b>A{count}</b> Business Name is required. <br/>");
                            isvalid = false;
                        }
                        if (!decimal.TryParse(sheet.Tin, out value)) // integer value
                        {
                            sbAlertLog.Append($"Cell <b>B{count}</b> Please enter valid TIN. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.TypeofCompany)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>C{count}</b> Type of Company is required. <br/>");
                            isvalid = false;
                        }
                        if (!string.IsNullOrEmpty(sheet.TypeofCompany))
                        {
                            istypeofCompanyExist = false;
                            foreach (MasterItems list in companyTypeLst)
                            {
                                if (list.Text == sheet.TypeofCompany)
                                {
                                    istypeofCompanyExist = true;
                                    break;
                                }

                            }
                            if (!istypeofCompanyExist)
                            {
                                sbAlertLog.Append($"Cell <b>C{count}</b> Type of Company: <b>{sheet.TypeofCompany}</b> does not exist. <br/>");
                                isvalid = false;
                            }
                        }
                        if (!decimal.TryParse(sheet.BusinessPhone, out value)) // int value
                        {
                            sbAlertLog.Append($"Cell <b>D{count}</b> Please enter valid Business Phone. <br/>");
                            isvalid = false;
                        }
                        if (!decimal.TryParse(sheet.ContactPhone, out value)) // int value
                        {
                            sbAlertLog.Append($"Cell <b>E{count}</b> Please enter valid Contact Phone. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.ContactFirstName)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>F{count}</b> Contact First Name is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.ContactLastName)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>G{count}</b> Contact Last Name is required. <br/>");
                            isvalid = false;
                        }
                        if (!string.IsNullOrEmpty(sheet.ContactPosition))
                        {
                            isPositionExist = false;
                            foreach (MasterItems list in positionLst)
                            {
                                if (list.Text == sheet.ContactPosition)
                                {
                                    isPositionExist = true;
                                    break;
                                }

                            }
                            if (!isPositionExist)
                            {
                                sbAlertLog.Append($"Cell <b>H{count}</b> Contact Position: <b>{sheet.ContactPosition}</b> does not exist. <br/>");
                                isvalid = false;
                            }
                        }
                        if (string.IsNullOrEmpty(sheet.ContactEmail))
                        {
                            sbAlertLog.Append($"Cell <b>I{count}</b> Contact Email is required. <br/>");
                            isvalid = false;

                        }
                        else
                        {
                            if (!regex.IsMatch(sheet.ContactEmail)) // string value
                            {
                                sbAlertLog.Append($"Cell <b>I{count}</b> Not valid email address:<b> {sheet.ContactEmail}</b> <br/>");
                                isvalid = false;
                            }
                            else
                            {//valid email...check duplicate mail
                                string status = _contactService.IsEmailExist(null, Convert.ToString(sheet.ContactEmail));
                                if (status != "Success")
                                {
                                    sbDuplicate.Append($"Cell <b>I{count}</b> Email already exists:<b> {sheet.ContactEmail}</b> <br/>");
                                    isvalid = false;
                                }
                            }
                        }
                        if (string.IsNullOrEmpty(sheet.ContactPreferredDocumentSigned)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>J{count}</b> Contact Preferred Document Signed is required <br/>");
                            isvalid = false;
                        }
                        isDocumentSignedExist = false;
                        if (sheet.ContactPreferredDocumentSigned == "DocuSign" || sheet.ContactPreferredDocumentSigned == "Wet Signature") // string value
                        {
                            isDocumentSignedExist = true;
                        }
                        if (!isDocumentSignedExist)
                        {
                            sbAlertLog.Append($"Cell <b>J{count}</b> Contact Preferred Document Signed: <b>{sheet.ContactPreferredDocumentSigned}</b> does not exist. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.MailingAddress)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>K{count}</b> Mailing Address is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.MailingAddressCity)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>L{count}</b> Mailing Address City is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.MailingAddressState)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>M{count}</b> Mailing Address State is required. <br/>");
                            isvalid = false;
                        }
                        if (!string.IsNullOrEmpty(sheet.MailingAddressState))
                        {
                            isListStateExist = false;
                            foreach (SelectItemModel list in stateList)
                            {
                                if (list.text == sheet.MailingAddressState)
                                {
                                    isListStateExist = true;
                                    break;
                                }

                            }
                            if (!isListStateExist)
                            {
                                sbAlertLog.Append($"Cell <b>M{count}</b> Mailing Address State: <b>{sheet.MailingAddressState}</b> does not exist <br/>");
                                isvalid = false;
                            }
                        }
                        if (!decimal.TryParse(sheet.MailingAddressZip, out value)) // int value
                        {
                            sbAlertLog.Append($"Cell <b>N{count}</b> Mailing Address Zip is required. <br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (sheet.MailingAddressZip.Length > 5)
                            {
                                sbAlertLog.Append($"Cell <b>N{count}</b> Zip can not be greater than 5 characters. <br/>");
                                isvalid = false;
                            }

                        }

                        if (string.IsNullOrEmpty(sheet.MailingAddressCounty)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>O{count}</b> Mailing Address County is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.PhysicalAddress)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>P{count}</b> Physical Address is required .<br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.PhysicalAddressCity)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>Q{count}</b> Physical Address City is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.PhysicalAddressState)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>R{count}</b> Physical Address State is required. <br/>");
                            isvalid = false;
                        }
                        if (!string.IsNullOrEmpty(sheet.PhysicalAddressState))
                        {
                            isListStateExist = false;
                            foreach (SelectItemModel list in stateList)
                            {
                                if (list.text == sheet.PhysicalAddressState)
                                {
                                    isListStateExist = true;
                                    break;
                                }
                            }

                            if (!isListStateExist)
                            {
                                sbAlertLog.Append($"Cell <b>R{count}</b> Physical Address State: <b>{sheet.PhysicalAddressState}</b> does not exist <br/>");
                                isvalid = false;

                            }
                        }

                        if (!decimal.TryParse(sheet.PhysicalAddressZip, out value)) // int value
                        {
                            sbAlertLog.Append($"Cell <b>S{count}</b> Physical Address Zip is required. <br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (sheet.PhysicalAddressZip.Length > 5)
                            {
                                sbAlertLog.Append($"Cell <b>S{count}</b> Zip can not be greater than 5 characters. <br/>");
                                isvalid = false;
                            }
                        }
                        if (string.IsNullOrEmpty(sheet.PhysicalAddressCounty)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>T{count}</b> Physical Address County is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.InsuranceName)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>U{count}</b> Insurance Name is required. <br/>");
                            isvalid = false;
                        }
                        if (!decimal.TryParse(sheet.InsurancePhone, out value)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>V{count}</b> Insurance Phone is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.InsuranceAgentName)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>W{count}</b> Insurance Agent Name is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.InsuranceAgentEmail))
                        {
                            sbAlertLog.Append($"Cell <b>X{count}</b> Insurance Agent Email is required.<br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (!regex.IsMatch(sheet.InsuranceAgentEmail)) // string value
                            {
                                sbAlertLog.Append($"Cell <b>X{count}</b> Not valid email address:<b> {sheet.InsuranceAgentEmail}</b><br/>");
                                isvalid = false;
                            }
                        }
                        if (string.IsNullOrEmpty(sheet.InsuranceAddress)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>Y{count}</b> Insurance Address is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.InsuranceCity)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>Z{count}</b> Insurance City is required. <br/>");
                            isvalid = false;
                        }
                        if (string.IsNullOrEmpty(sheet.InsuranceState)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>AA{count}</b> Insurance State is required. <br/>");
                            isvalid = false;
                        }
                        if (!string.IsNullOrEmpty(sheet.InsuranceState))
                        {
                            isListStateExist = false;
                            foreach (SelectItemModel list in stateList)
                            {
                                if (list.text == sheet.InsuranceState)
                                {
                                    isListStateExist = true;
                                    break;
                                }

                            }
                            if (!isListStateExist)
                            {
                                sbAlertLog.Append($"Cell <b>AA{count}</b> Insurance State: <b>{sheet.InsuranceState}</b> does not exist <br/>");
                                isvalid = false;
                            }
                        }
                        if (!decimal.TryParse(sheet.InsuranceZip, out value)) // int value
                        {
                            sbAlertLog.Append($"Cell <b>AB{count}</b> Insurance Zip is required. <br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (sheet.InsuranceZip.Length > 5)
                            {
                                sbAlertLog.Append($"Cell <b>AB{count}</b> Zip can not be greater than 5 characters. <br/>");
                                isvalid = false;
                            }

                        }
                        if (string.IsNullOrEmpty(sheet.InsuranceAgentCounty)) // string value
                        {
                            sbAlertLog.Append($"Cell <b>AC{count}</b> Insurance Agent County is required. <br/>");
                            isvalid = false;
                        }
                        count++;
                    }

                    if (Convert.ToString(sbAlertLog) != "")
                    {
                        sbAlertLog.Insert(0, $"<b> Sheet 1 Errors:- </b> <br/>");
                    }
                    count = 2;
                    foreach (ContactGuarantorInformation sheet in obj.ContactGuarantorInformation)
                    {
                        if (string.IsNullOrEmpty(sheet.ContactEmail))
                        {
                            sbSecondSheetError.Append($"Cell <b>A{count}</b> Contact Email is required.<br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (!regex.IsMatch(sheet.ContactEmail)) // string value
                            {
                                sbSecondSheetError.Append($"Cell <b>A{count}</b> Not valid email address:<b> {sheet.ContactEmail}</b><br/>");
                                isvalid = false;
                            }
                        }

                        if (string.IsNullOrEmpty(sheet.GuarantorFirstName)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>B{count}</b> Guarantor First Name is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.GuarantorLastName)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>C{count}</b> Guarantor Last Name is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.GuarantorTitle)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>D{count}</b> Guarantor Title is required. <br/>");
                            isvalid = false;
                        }

                        if (!decimal.TryParse(sheet.Ownership, out value)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>E{count}</b> Owner ship is required. <br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (sheet.Ownership.Length > 2 || Convert.ToInt32(sheet.Ownership) > 100)
                            {
                                sbSecondSheetError.Append($"Cell <b>E{count}</b> Please enter valid ownership between 0 to 100 <br/>");
                                isvalid = false;
                            }
                        }

                        if (string.IsNullOrEmpty(sheet.GuarantorEmail))
                        {
                            sbSecondSheetError.Append($"Cell <b>F{count}</b> Guarantor Email is required.<br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (!regex.IsMatch(sheet.GuarantorEmail)) // string value
                            {
                                sbSecondSheetError.Append($"Cell <b>F{count}</b> Not valid email address:<b> {sheet.GuarantorEmail}</b><br/>");
                                isvalid = false;
                            }
                        }

                        if (!decimal.TryParse(sheet.GuarantorPhone, out value)) // int value
                        {
                            sbSecondSheetError.Append($"Cell <b>G{count}</b> Guarantor Phone is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.BussinessAddress)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>H{count}</b> Bussiness Address is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.BussinessCity)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>I{count}</b> IBussiness City is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.BussinessState)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>J{count}</b>  Bussiness State is required. <br/>");
                            isvalid = false;
                        }
                        if (!string.IsNullOrEmpty(sheet.BussinessState))
                        {
                            isListStateExist = false;
                            foreach (SelectItemModel list in stateList)
                            {
                                if (list.text == sheet.BussinessState)
                                {
                                    isListStateExist = true;
                                    break;
                                }

                            }
                            if (!isListStateExist)
                            {
                                sbSecondSheetError.Append($"Cell <b>J{count}</b> Bussiness State: <b>{sheet.BussinessState}</b> does not exist <br/>");
                                isvalid = false;
                            }
                        }
                        if (!decimal.TryParse(sheet.BussinessZip, out value)) // int value
                        {
                            sbSecondSheetError.Append($"Cell <b>k{count}</b> Bussiness Zip is required. <br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (sheet.BussinessZip.Length > 5)
                            {
                                sbSecondSheetError.Append($"Cell <b>K{count}</b> Zip can not be greater than 5 characters. <br/>");
                                isvalid = false;
                            }
                        }

                        if (string.IsNullOrEmpty(sheet.BussinessCounty)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>L{count}</b> Bussiness County is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.HomeAddress)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>M{count}</b> Home Address is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.HomeCity)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>N{count}</b> Home City is required. <br/>");
                            isvalid = false;
                        }

                        if (string.IsNullOrEmpty(sheet.HomeState)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>O{count}</b> Home State is required. <br/>");
                            isvalid = false;
                        }

                        if (!string.IsNullOrEmpty(sheet.HomeState))
                        {
                            isListStateExist = false;
                            foreach (SelectItemModel list in stateList)
                            {
                                if (list.text == sheet.HomeState)
                                {
                                    isListStateExist = true;
                                    break;
                                }

                            }
                            if (!isListStateExist)
                            {
                                sbSecondSheetError.Append($"Cell <b>O{count}</b> Home State: <b>{sheet.HomeState}</b> does not exist <br/>");
                                isvalid = false;
                            }
                        }
                        if (!decimal.TryParse(sheet.HomeZip, out value)) // int value
                        {
                            sbSecondSheetError.Append($"Cell <b>P{count}</b> Home Zip is required. <br/>");
                            isvalid = false;
                        }
                        else
                        {
                            if (sheet.HomeZip.Length > 5)
                            {
                                sbSecondSheetError.Append($"Cell <b>P{count}</b> Zip can not be greater than 5 characters. <br/>");
                                isvalid = false;
                            }
                        }

                        if (string.IsNullOrEmpty(sheet.HomeCounty)) // string value
                        {
                            sbSecondSheetError.Append($"Cell <b>Q{count}</b> Home County is required. <br/>");
                            isvalid = false;
                        }
                        if (!string.IsNullOrEmpty(sheet.GuarantorDateOfBirth)) // string value
                        {
                            try
                            {
                                DateTime dt = Convert.ToDateTime(sheet.GuarantorDateOfBirth);
                            }
                            catch//(Exception ex) 
                            {
                                sbSecondSheetError.Append($"Cell <b>S{count}</b> Guarantor DOB is not vaild <br/>");
                                isvalid = false;
                            }

                            // isvalid = false;
                        }
                        count++;
                    }
                    if (Convert.ToString(sbSecondSheetError) != "")
                    {
                        sbSecondSheetError.Insert(0, $"<b> Sheet 2 Errors:- </b> <br/>");
                        sbAlertLog.Append(sbSecondSheetError.ToString());
                    }

                    #endregion

                    if (isvalid)
                    {
                        var data = _contactService.SaveBulkUpload(model);
                        //return Ok(data);

                        result.StatusCode = 200;
                        result.ResponseMessage = data.Total + " contact(s) has been uploaded from Bulkupload";// "Total Skipped: " + data.Skipped + " <br/>Total Inserted: " + data.Total;
                        if (Convert.ToInt32(data.Total) > 0)
                        {
                            _commonService.AddActivityLog(uid.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                           " has uploaded " + data.Total + " contact(s) from Bulkupload");
                        }
                        return Ok(result);
                    }
                    else
                    {
                        result.StatusCode = 500;
                        result.ResponseMessage = Convert.ToString(sbAlertLog) + "<br/>" + Convert.ToString(sbDuplicate);
                        return Ok(result);
                    }
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Excel file is empty or not in correct format.";
                    return Ok(result);
                }
            }
            else
            {
                result.StatusCode = 500;
                result.ResponseMessage = "Excel file is empty or not in correct format.";
                return Ok(result);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("WelcomePackageTrackingReport")]
        /*! 
        * \brief   Get the Lese Request List
        * \details Function is used to fetch the list of Lease Request
        * \author  Surendra Maurya 
        * \date    11 Dec 2019
        * \version 1.0    
        */
        public IActionResult WelcomePackageTrackingReport(string searchText, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _contactService.WelcomePackageTrackingReport(searchText, From, To, sortColumn, sortDir, pageIndex, pageSize, uid);

                return Ok(lst);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetBankInformationByContactBankId")]
        public IActionResult GetBankInformationByContactBankId(string contactBankId)
        {
            var result = _contactService.GetBankInformationByContactBankId(contactBankId);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        /*! 
        * \brief  Add update Email template.
        * \details Function is used to  Add update Email template.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        [HttpPost]
        [Authorize]
        [Route("SaveContactBankInformation")]
        public IActionResult SaveContactBankInformation([FromBody] BankInformationModel model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            model.CreatedByID = userid;

            var data = _contactService.SaveContactBankInformation(model);
            result.StatusCode = 200;
            if (model.ContactBankId == null)
            {
                result.ResponseMessage = "Bank Information has been added successfully.";
            }
            else
            {
                result.ResponseMessage = "Bank Information has been updated successfully.";
            }
            return Ok(result);

        }


        [HttpPost]
        [Authorize]
        [Route("AddEditContact")]
        public async Task<IActionResult> AddEditContact([FromBody] JsonModel model, int leadid, int accountid, int opportunityid)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var enablemod = JsonConvert.DeserializeObject<Dictionary<string, string>>(model.FormJsonData);

                  string enableLoginValue = enablemod.FirstOrDefault(x => x.Key.Contains("EnableLogin")).Value;
                  string emailAddress= enablemod.FirstOrDefault(x => x.Key.Contains("Email")).Value;
                  string firstName = enablemod.FirstOrDefault(x => x.Key.Contains("FirstName")).Value;
                  string lastName = enablemod.FirstOrDefault(x => x.Key.Contains("LastName")).Value;

                bool enabLoginValue = Convert.ToBoolean(enableLoginValue);
                int Isenable = Convert.ToInt32(enabLoginValue);

                if (CompanyID == 1004)
                {
                    Isenable = 1;
                }

                string data = _contactService.AddEditContact(model, leadid, accountid, opportunityid, Isenable);
                string retResponseMessage = string.Format("Contact has been {0} successfully.", (model.Id == "") ? "added" : "updated");
                responseModel.StatusCode = 200;
                responseModel.OptionalExtraParamers = model.Id == "" ? data: model.Id;
                responseModel.ResponseMessage = retResponseMessage; //"Contacts has been updated successfully!";

                if (Isenable == 1)
                {
                    string email = emailAddress !=null? emailAddress.ToString(): null ;
                    string FirstName = firstName != null ? firstName.ToString() : null;
                    string LastName = lastName != null ? lastName.ToString() : null;
                    #region Send Email

                    var applicationUser = new ApplicationUser()
                    {
                        UserName = email,
                        Email = email,
                        FirstName = FirstName,
                        LastName = LastName,
                        UserType = "",
                        PhoneNumber = "",
                        Address = "",
                        City = "",
                        State = Guid.Empty,
                        ZipCode = "",
                        AssignedBankId = Guid.Empty,
                        County = "",
                        IsActive = false,
                        Position = Guid.Empty,
                        EmployeeType = Guid.Empty,
                        RoleID = Guid.Empty,
                        Notes = "",
                        Webbrowser = "",
                        BrowserVersion = OSWebBrowser,
                        IPAddress = IPAddress,
                        LastLoginDate = DateTime.UtcNow,
                        CreatedOn = DateTime.UtcNow,
                        ExecutiveCommisionFormula = "",
                        CompanyID = Convert.ToInt32(CompanyID),
                        DepartmentID = 0,
                        LocationID = 0,
                        IsHOD = false,
                        RefID = 0,
                        // Reffrom=model.refFrom

                    };
                    var result = await _userManager.CreateAsync(applicationUser);
                    if (result.Succeeded || result.Errors.Any(x=>x.Code== "DuplicateUserName"))
                    {
                        if (result.Errors.Any(x => x.Code == "DuplicateUserName"))
                            {
                            var res = _UserService.GetUserByEmail(applicationUser.Email);
                            applicationUser = JsonConvert.DeserializeObject<ApplicationUser>(res);
                        }
                        var token = _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                        var sitedomain = "http://";
                        if (_config.GetSection("CommonSettings")["SSLEnabledForSite"] == "1")
                        {
                            sitedomain = "https://";
                        }
                        //var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token;

                        var callbackUrl = sitedomain + SiteUrlClaim + "/account/setpassword?userId=" + applicationUser.Id + "&token=" + token.Result;

                        try
                        {
                            Hashtable htbl = new Hashtable();
                            htbl["@username"] = applicationUser.FirstName + " " + applicationUser.LastName;
                            htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                            htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                            //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                            htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                            if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                            else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                            else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                            else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                            string temName = "MultiCompanyMappingAcceptance";
                            if(CompanyID!=1003 && CompanyID != 1000)
                            {
                                temName = "Customer Registration";
                            }

                            await _emailSettingsService.SendEmail(applicationUser.Email, htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a class='btn btn-success' href='{callbackUrl}'>link</a>", Convert.ToString(applicationUser.Id), Guid.Parse(UserID.ToString()), false, temName, "Registration", CompanyID.ToString());

                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }
                        #endregion
                    }
                    else
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                    }
                }
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("CheckUserDuplicateORAssociateContact")]
        [Authorize]
        public IActionResult CheckUserDuplicateORAssociateContact(string emailID)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var UserID = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string status = _contactService.CheckUserDuplicateORAssociateContact(UserID, CompanyID, emailID);

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
        [Route("ContactAccountMapping")]
        [Authorize]
        public IActionResult ContactAccountMapping(int accountId,string email,int opportunityId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var UserID = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string status = _contactService.ContactAccountMapping( accountId,email,Convert.ToInt32(CompanyID), UserID, opportunityId);

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
        [Route("IsValueDuplicate")]
        [Authorize]
        public IActionResult IsValueDuplicate(int type,string refString)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                
                var status = _contactService.IsValueDuplicate(type, refString);
                return Ok(status);
            }
            catch (Exception ex)
            {

                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }
        
        [HttpGet]
        [Route("SetPrimaryContact")]
        [Authorize]
        public IActionResult SetPrimaryContact(long contactId, long accountId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var status = _contactService.SetPrimaryContact(contactId, accountId, UserID.ToString());
                resultResponseModel.StatusCode = 200;
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
        [Route("GetOpportuniryByContact")]
        [Authorize]
        public IActionResult GetOpportuniryByContact(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var sorcolumnRemoveSpace = sortColumn.Replace(" ", "");
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _contactService.GetOpportuniryByContact(contId, sorcolumnRemoveSpace, sortDir, pageIndex, pageSize, Convert.ToInt64(CompanyID));

                return Ok(lst);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetRelatedAccountForContactList")]
        [Authorize]
        public IActionResult GetRelatedAccountForContactList(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var sorcolumnRemoveSpace = sortColumn.Replace(" ", "");
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _contactService.GetRelatedAccountForContactList(contId, sorcolumnRemoveSpace, sortDir, pageIndex, pageSize, Convert.ToInt64(CompanyID));

                return Ok(lst);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetProposalsListByContactId")]
        [Authorize]
        public IActionResult GetProposalsListByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var sorcolumnRemoveSpace = sortColumn.Replace(" ", "");
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _contactService.GetProposalsListByContactId(contId, sorcolumnRemoveSpace, sortDir, pageIndex, pageSize, Convert.ToInt64(CompanyID));

                return Ok(lst);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
    

    [HttpGet]
    [Route("GetLeadByContactId")]
    [Authorize]
    public IActionResult GetLeadByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize)
    {
        try
        {
            var sorcolumnRemoveSpace = sortColumn.Replace(" ", "");
            var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var lst = _contactService.GetLeadByContactId(contId, sorcolumnRemoveSpace, sortDir, pageIndex, pageSize, Convert.ToInt64(CompanyID));

            return Ok(lst);
        }
        catch// (Exception ex)
        {
            return BadRequest();
        }
    }
}

}
    
