using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using authorizeLibrary;
using DocuSign.eSign.Model;
using FluentFTP;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OfficeOpenXml;
//using SimpleJson;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;
using Solgen.WebApi.Services;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.TwiML;
using Twilio.Types;
using PhoneNumber = Twilio.Types.PhoneNumber;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Parsing;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Grid;
using Syncfusion.Drawing;
using Solgen.Service.CompanyIntegrationSetting;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/loan")]
    public class LoanApplicationController : Controller
    {
        private IEmailTemplateRepository _emailTemplateRepository;
        private ILoanApplicationService _loanService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _config;
        private readonly IRealTimeService _realTimeService;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly HttpClient httpClient;
        private readonly IWebMergeService _webMergeService;
        private readonly IFormstackSignService _formstackSignService;
        private readonly ISignNowService _signNowService;
        private readonly IDocusignService _docusignService;
        private readonly IPullCreditScoreService _pullCreditScoreService;
		private readonly ICompanyIntegrationSettingService _companyIntegrationSettingService;
        private SettingModel _settings;

        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long companyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? userID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }

        public ILogService logService { get; }
        private ILeadService _leadService;

        public LoanApplicationController(ILoanApplicationService loanService, IEmailSettingsService emailSettingsService,
            ICommonService commonService, IHttpContextAccessor httpContext, IEmailTemplateRepository emailTemplateRepository,
            IConfiguration config,
            IRealTimeService realTimeService, ILogService logService, IWebMergeService webMergeService, ILeadService leadService, IFormstackSignService formstackSignService, ISignNowService signNowService, IDocusignService docusignService,
            IPullCreditScoreService pullCreditScoreService,
            ICompanyIntegrationSettingService companyIntegrationSettingService)
        {
            this.httpClient = new HttpClient();
            _loanService = loanService;
            _config = config;
            _realTimeService = realTimeService;
            _emailSettingsService = emailSettingsService;
            _commonService = commonService;
            _httpContext = httpContext;
            _emailTemplateRepository = emailTemplateRepository;
            this.logService = logService;
            _webMergeService = webMergeService;
            _leadService = leadService;
            _docusignService = docusignService;
            _signNowService = signNowService;
            _formstackSignService = formstackSignService;
            //_pullCreditScoreService = pullCreditScoreService;
			this._companyIntegrationSettingService = companyIntegrationSettingService;
		}
        [HttpGet]
        [Authorize]
        [Route("GetSubStageDll")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetSubStageDll(Guid userid, long CompanyID)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                lst = _loanService.GetSubStageDll(userid, CompanyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Authorize]
        [Route("savestages")]
        public IActionResult SaveSubstage([FromBody] savesubstagemodel Model)
        {
            ResultResponseModel result = new ResultResponseModel();
            Model.userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            Model.companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data2 = _loanService.SaveSubstage(Model);

                result.ResponseMessage = "Stages have been added successfully.";

                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpGet]
        [Authorize]
        [Route("getloansubstage")]
        public IActionResult getloansubstage(Guid userid, int CompanyID, long batchid, long modeuleid, long submoduleid)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.getloansubstage(userid, CompanyID, batchid, modeuleid, submoduleid);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("applicationinfo")]
        public async Task<IActionResult> Getapplicationinfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetApplicationById(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();
                return Content(result, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("loanstages")]
        public async Task<IActionResult> GetLoanStages(long applicationid)
        {
            try
            {
                var result = await _loanService.GetLoanStages(Guid.Parse(userID.ToString()), companyID, applicationid);

                if (result == null)
                    return BadRequest();

                //string prepareResult = string.Concat("[", result, "]");
                return Content(result, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("SyncToSF")]
        public IActionResult SyncToSF(long loanid)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var result = _loanService.getloapallicationdataforSF(Guid.Parse(userID.ToString()), companyID, loanid);
                //string json = JsonConvert.SerializeObject(result);
                var response = httpClient.PostAsJsonAsync("http://45.35.44.173:8081/home/OpportunitySync", result).Result;
                return Ok(result);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }

        
        /*! 
* \brief  Add loan application cancel reason.
* \details Function is used to  cancel application with reason.
* \author  Dheeraj
* \date    20 nov 2020
* \version 1.0  
*/
        [HttpPost]
        [Authorize]
        [Route("saveOverrideReason")]
        public IActionResult saveOverrideReason([FromBody] loanAppReasonModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.created_by = Guid.Parse( userID.ToString());
            model.company_id = companyID;
            try
            {
                _loanService.saveOverrideReason(model);
                //if (model.id == null || model.id == Guid.Empty)
                // {
                if (model.type == "Audit")
                {
                    result.ResponseMessage = "Audit has been overridden successfully.";
                }
                else
                {
                    result.ResponseMessage = "Loan application has been overridden successfully.";
                }
                // }
                //else
                //{
                //    result.ResponseMessage = "Loan term has been updated successfully.";
                //}
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                result.StatusCode = 500;
                result.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }

        }


        /*! 
   * \brief  Add loan application cancel reason.
   * \details Function is used to  cancel application with reason.
   * \author  Dheeraj
   * \date    20 nov 2020
   * \version 1.0  
   */
        [HttpPost]
        [Authorize]
        [Route("saveReason")]
        public async Task<IActionResult> saveReason([FromBody] loanAppReasonModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            model.created_by = Guid.Parse(userID.ToString());
            model.company_id = companyID;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();
          

                _loanService.saveReason(model);
                string strReason = string.Empty;
                string strReasoncontenct = string.Empty;
                
                string useTypeVal = "";
                string strEmailSubject = "Loan Application Cancelled";
                string strBodyContent = "Application Number# ****" + model.id + " has been cancelled";

                List<string> userIds = new List<string>();

                ////////if (userType != "usertypebanker" && model.isverified==true)
                ////////{
                ////////    //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                ////////     useTypeVal = "usertypebanker";
                ////////     strEmailSubject = "Loan Application Cancelled";

                ////////}
                ////////if (userType == "usertypebanker" && model.isverified == true)
                ////////{
                ////////    //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                ////////    useTypeVal = "usertypefinance";
                ////////    strEmailSubject = "Loan Application Cancelled";
                ////////}
                ///
                if (userType != "usertypebanker" && model.isverified == true)
                {
                    //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                    useTypeVal = "LoanApplicationCancelled_NOTBankUser";
                    strEmailSubject = "Loan Application Cancelled";

                }
                if (userType == "usertypebanker" && model.isverified == true)
                {
                    //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                    useTypeVal = "LoanApplicationCancelled_BankUser";
                    strEmailSubject = "Loan Application Cancelled";
                }

                dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(Convert.ToString(model.id), Convert.ToString(model.company_id), useTypeVal);
                string strUserTo = string.Empty;
                string strCcUser = string.Empty;
                if (userDET.Count > 0)
                {
                    foreach (var usrVal in userDET)
                    {
                        userIds.Add(usrVal.Id);
                        //strUserTo = usrVal.Id;

                        if (string.IsNullOrEmpty(strUserTo))
                        {
                            strUserTo = usrVal.Id;
                            strCcUser = usrVal.Id;
                        }
                        else
                        {
                            strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                        }

                        if (usrVal.EmailNotification == true)
                        {
                            emaildata1 = new emailDataModel();
                            emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                            emaildata1.email = usrVal.Email;
                            emaildata.Add(emaildata1);
                        }
                    }

                    var notification = new NotificationSendModel
                    {
                        ToUser = null,
                        CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                        Subject = strEmailSubject,
                        SubjectBody = strBodyContent,
                        RouteUrl = "loanApplication/Detail/" + model.id,
                        ObjectId = model.id.ToString(),
                        CreatedBy = model.created_by.ToString(),
                        UserIdList = userIds,
                        CompanyId = Convert.ToString(companyID),

                    };
                    await _realTimeService.SendNotification(notification);

                    
                }

                try
                {
                    if (emaildata != null)
                    {
                        Hashtable htbl = new Hashtable();
                        await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, strEmailSubject, strBodyContent, Convert.ToString(model.id), Guid.Parse(model.created_by.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0, UserName.ToString());
                    }
                }
                catch
                {
                    HttpContext.Session.Clear();
                }

                //////////////////////Send email////////////////////////////
                //////if (!string.IsNullOrEmpty(model.email))
                //////{
                //////    Hashtable htbl = new Hashtable();
                //////    htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];


                //////    string templateName = _config.GetSection("CommonSettings")["CancelApplicationTemplate"];
                //////    //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];

                //////    if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                //////    else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                //////    else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                //////    else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                //////    var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, Convert.ToString(model.company_id));
                //////    string subjectBody = ReplaceFileVariables(htbl, objTemplate.Template);
                //////    if (objTemplate.TemplateID > 0)
                //////    {
                //////        dynamic loanDET = _commonService.GetEmailTemplateDataForReplaceContent(Convert.ToString(model.id), Convert.ToString(objTemplate.TemplateID), model.created_by, model.company_id);
                //////        if (loanDET.Count > 0)
                //////        {
                //////            foreach (var itmval in loanDET)
                //////            {
                //////                subjectBody = subjectBody.Replace(string.Format("@{0}", itmval.repKey), itmval.repValue);
                //////            }
                //////        }
                //////    }

                //////    // var applicationUser = _loanService.GetApplicantInfo(Guid.Parse(userid), long.Parse(companyid), long.Parse(id));
                //////    await _emailSettingsService.SendEmailDocs(Convert.ToString(model.email), htbl, objTemplate.EmailTemplateSubject, subjectBody, Convert.ToString(model.id), model.created_by, false, _config.GetSection("CommonSettings")["CancelApplicationTemplate"], "Finance", CompanyID.ToString());

                //////}
                ////////////////////////End send email////////////////////////////


                //if (model.id == null || model.id == Guid.Empty)
                // {
                result.ResponseMessage = "Loan application has been cancelled successfully.";
                // }
                //else
                //{
                //    result.ResponseMessage = "Loan term has been updated successfully.";
                //}
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception ex)
            {

                result.StatusCode = 500;
                result.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }

        }


        /*! 
       * \brief  uncancel loan application .
       * \details Function is used to  uncancel loan application.
       * \author  Dheeraj
       * \date    13 jan 2021
       * \version 1.0  
       */
        [HttpPost]
        [Authorize]
        [Route("UncancelLoanApplication")]
        public async Task<IActionResult> UncancelLoanApplication([FromBody] loanAppReasonModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            try
            {
                
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();
                List<string> userIds = new List<string>();
                dynamic userDET = _loanService.UncancelLoanApplication(Convert.ToString(model.id), model.reason_description, Guid.Parse(userID.ToString()), companyID);
              
                // var users = _loanService.ReplyComment(model);
                //if (users != null)
                //{
                //    var notification = new NotificationSendModel()
                //    {
                //        CcUser = users.Split(','),
                //        Subject = "Uncancelled Loan Application",
                //        SubjectBody = "Loan Application ***"+model.id+" has been uncancelled.",
                //        RouteUrl = "loanApplication/Detail/" + model.id,
                //        ObjectId = model.id.ToString(),
                //        CreatedBy = Convert.ToString(created_by),
                //        UserIdList = users.Split(',').ToList(),
                //        CompanyId = Convert.ToString(company_id),

                //    };

                //    await _realTimeService.SendNotification(notification);

                //    result.ResponseMessage = "Loan application has been uncancelled successfully.";
                //    result.StatusCode = 200;
                //    return Ok(result);
                //}
                //else
                //{
                //    result.StatusCode = 500;
                //    result.ResponseMessage = "Something went wrong, please contact site adminstrator!.";
                //    return Ok(result);
                //}


               
                string strUserTo = string.Empty;
                string strCcUser = string.Empty;
                string emailsubject = "Uncancelled Loan Application";
                string SubjectBody = "Loan Application ***" + model.id + " has been uncancelled.";
                if (userDET.Count > 0)
                {
                    foreach (var usrVal in userDET)
                    {
                        userIds.Add(usrVal.Id);

                        if (string.IsNullOrEmpty(strUserTo))
                        {
                            strUserTo = usrVal.Id;
                            strCcUser = usrVal.Id;
                        }
                        else
                        {
                            strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                        }

                        if (usrVal.EmailNotification == true)
                        {
                            emaildata1 = new emailDataModel();
                            emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                            emaildata1.email = usrVal.Email;
                            emaildata.Add(emaildata1);
                        }
                    }

                  

                    var notification = new NotificationSendModel
                    {
                        ToUser = null,
                        CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                        Subject = emailsubject,
                        SubjectBody = SubjectBody,
                        RouteUrl = "loanApplication/Detail/" + model.id,
                        ObjectId = model.id.ToString(),
                        CreatedBy = model.created_by.ToString(),
                        UserIdList = userIds,
                        CompanyId = Convert.ToString(companyID),

                    };
                    await _realTimeService.SendNotification(notification);


                }
                try
                {
                    if (emaildata != null)
                    {
                        Hashtable htbl = new Hashtable();
                        await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailsubject, SubjectBody, Convert.ToString(model.id), Guid.Parse(model.created_by.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0, UserName);
                    }
                }
                catch
                {
                    HttpContext.Session.Clear();
                }

                result.ResponseMessage = "Loan application has been uncancelled successfully.";
                result.StatusCode = 200;
                return Ok(result);

            }
            catch (Exception)
            {

                result.StatusCode = 500;
                result.ResponseMessage = "Something went wrong, please contact site adminstrator!.";
                return Ok(result);
            }

        }



        /*! 
    * \brief  Add update System Information.
    * \details Function is used to  Add update System Information.
    * \author  Anish
    * \date    09 Oct 2020
    * \version 1.0    
    */

        [HttpPost]
        [Authorize]
        [Route("AddUpdateSystemInfo")]
        public async Task<IActionResult> AddUpdateSystemInfo([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();
                List<EmailForCompanyAdminModel> emailForCompanyAdmin = new List<EmailForCompanyAdminModel>();
                EmailForCompanyAdminModel emailForCompanyAdmin1 = new EmailForCompanyAdminModel();

                var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
                model.userId = userID.ToString();
                model.companyId = companyID.ToString();
                model.dealerDocName = "";
                string data = _loanService.AddUpdateSystemInfo(model);

                if(model.SubModuleCode== "LoanApplicationApplicant")
                {
                    string [] a;
                    a = data.Split('_');
                    responseModel.OptionalExtraParamersOne = a[1].ToString();
                    data = a[0].ToString();
                }

                // commented by avtar - 24-mar-2021
                //if(model.SubModuleCode.Trim() == "LoanApplicationReleaseFunds")
                //{
                //    string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                //    var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={model.Id}&Stage=InternalVerification").Result;
                //}

                bool _prodflag = true;
                bool ntpapp =false;
                #region Send Notification to Finance/Banker Users For NTP Approval and Payment 
                if (model.SubModuleCode.Trim() == "LoanApplicationPaymentInfo" || model.SubModuleCode.Trim() == "LoanApplicationNTP" || model.SubModuleCode.Trim() == "LoanApplicationbankVerification" || model.SubModuleCode.Trim() == "LoanApplicationAppVerification" || model.SubModuleCode.Trim() == "LoanApplicationReleaseFunds" || model.SubModuleCode.Trim() == "LoanApplicationProductInfo" || model.SubModuleCode.Trim() == "NTPChangeOrder")
                {
                    string strBodyContent = string.Empty;
                    string useTypeVal = string.Empty;
                    string strEmailSubject = string.Empty;
                    string adminEmailBody = string.Empty;
                    string adminEmailSubject = string.Empty;

                    if (model.SubModuleCode.Trim() == "LoanApplicationNTP")
                    {
                        //JObject obj = JObject.Parse(model.FormJsonData);
                        //JArray a = (JArray)model.FormJsonData;
                        // IList<dynamic> systemInfoList = a.ToObject<IList<dynamic>>();
                        // List<dynamic> systemInfoList = JsonConvert.DeserializeObject<List<dynamic>>(model.FormJsonData).Select(x=>x.181_NTPApproved);
                        //List<dynamic> systemInfoList = JsonConvert.DeserializeObject<List<dynamic>>(model.FormJsonData);
                        dynamic systemInfoList = JValue.Parse(model.FormJsonData);
                        string strReason = string.Empty;
                        string strReasoncontenct = string.Empty;
                       
                        foreach (var itemParent in systemInfoList)
                        {
                            if (itemParent.Name.Contains("Approved"))
                            {
                                if (itemParent.Value == "1")
                                {
                                    strReason = "NTP for Application Number# ****" + model.Id + " has been Approved";
                                    ntpapp = true;


                                    adminEmailSubject = "Application Number# ****" + model.Id + "(Standalone Page) NTP has been approved";
                                    adminEmailBody = "The NTP has been approved for application number# ****" + model.Id + ". This application has been submitted through " + model.DealerName + " (Standalone page). Please update the Contract Status to NTP Open Balance.";


                                }
                                else { 
                                    strReason = "NTP for Application Number# ****" + model.Id + " has been rejected";
                                }
                                string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                                if (model.SFOpportunityId != null && model.SFOpportunityId != "") {
                                    var response1 = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?OpportunityId={model.SFOpportunityId}&LoanAppId={model.ApplicationNumber}").Result;
                                }
                                var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={model.Id}&Stage=NTP").Result;
                            }
                            else if (itemParent.Name.Contains("Reason"))
                            {
                                if (itemParent.Value != null)
                                {
                                    strReason += " with reason <b>" + itemParent.Value + "</b>";
                                }
                            }
                        }

                        //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                        useTypeVal = "financeAndsalesUserNotifications";
                        strEmailSubject = "NTP Status";
                        strBodyContent = strReason;
                    }
                    else if (model.SubModuleCode.Trim() == "LoanApplicationReleaseFunds")
                    {
                        dynamic systemInfoList = JValue.Parse(model.FormJsonData);
                        string strReason = string.Empty;
                        string strReasoncontenct = string.Empty;
                        strReason = "Fund Release for Application Number# ****" + model.Id + " has been Approved";

                     
                        //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                        ///////////// useTypeVal = "usertypefinance";
                        useTypeVal = "FundReleaseApprovalStatus";
                        strEmailSubject = "Fund Release Approval Status";
                        strBodyContent = strReason;
                    }

                    else if (model.SubModuleCode.Trim() == "FundReleaseCO")
                    {
                        dynamic systemInfoList = JValue.Parse(model.FormJsonData);
                        string strReason = string.Empty;
                        string strReasoncontenct = string.Empty;
                        strReason = "Fund Release Change Order for Application Number# ****" + model.Id + " has been Approved";
                      

                        //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                        ///////////// useTypeVal = "usertypefinance";
                        useTypeVal = "FundReleaseChangeOrder";
                        strEmailSubject = "Fund Release Change Order Approval Status";
                        strBodyContent = strReason;
                    }

                    else if (model.SubModuleCode.Trim() == "LoanApplicationProductInfo")
                    {
                        dynamic systemInfoList = JValue.Parse(model.FormJsonData);
                        string strReason = string.Empty;
                        string strReasoncontenct = string.Empty;
                        strReason = "Estimate Fund Date for Application Number# ****" + model.Id + " has been changed";
                        //_prodflag = false;
                       
                        foreach (var itemParent in systemInfoList)
                        {
                            if (itemParent.Name.Contains("EstimatedFundDate"))
                            {
                                if (itemParent.Value != null)
                                {
                                    DateTime dtchange = Convert.ToDateTime(itemParent.Value);
                                    DateTime originaldate = Convert.ToDateTime(model.docDate);
                                    if (dtchange.Date == originaldate.Date)
                                    {
                                        _prodflag = false;
                                    }
                                }
                                else
                                {
                                    _prodflag = false;
                                }
                            }
                            else if (itemParent.Name.Contains("Reason"))
                            {
                                if (itemParent.Value != null)
                                {
                                    strReason += " with reason <b>" + itemParent.Value + "</b>";

                                }
                            }

                        }

                        //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                        ///////////useTypeVal = "usertypebanker";
                        useTypeVal = "EstimateFundDateChanged";
                        strEmailSubject = "Estimate Fund Date Changed";
                        strBodyContent = strReason;

                    }
                    else if (model.SubModuleCode.Trim() == "LoanApplicationbankVerification")
                    {
                        //JObject obj = JObject.Parse(model.FormJsonData);
                        //JArray a = (JArray)model.FormJsonData;
                        // IList<dynamic> systemInfoList = a.ToObject<IList<dynamic>>();
                        // List<dynamic> systemInfoList = JsonConvert.DeserializeObject<List<dynamic>>(model.FormJsonData).Select(x=>x.181_NTPApproved);
                        //List<dynamic> systemInfoList = JsonConvert.DeserializeObject<List<dynamic>>(model.FormJsonData);
                        dynamic systemInfoList = JValue.Parse(model.FormJsonData);
                        string strReason = string.Empty;
                        string strReasoncontenct = string.Empty;
                        foreach (var itemParent in systemInfoList)
                        {
                            string comname = Convert.ToString(itemParent.Name).Substring(Convert.ToString(itemParent.Name).IndexOf("_"));
                            if (comname.Replace("_", "") == "IsVerified")
                            {
                                if (itemParent.Value == "1")
                                {
                                    strReason = "Bank Verification for Application Number# ****" + model.Id + " has been Approved";

                                    adminEmailSubject = "Application Number# ****" + model.Id + "External Verification has been completed";
                                    adminEmailBody = "External Verification has been completed for application number# ****" + model.Id + ". This application has been submitted through " + model.DealerName + "(Standalone page). Please update the Contract Status to NTP Pending.";

                                }
                                else { strReason = "Bank Verification for Application Number# ****" + model.Id + " has been rejected";
                                   
                                }
                            }
                            else if (itemParent.Name.Contains("Reason"))
                            {
                                if (itemParent.Value != null)
                                {
                                    strReason += " with reason <b>" + itemParent.Value + "</b>";

                                }
                            }
                        }
                        string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                        var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={model.Id}&Stage=ExternalVerification").Result;
                        //dynamic FormJsonData = JsonConvert.DeserializeObject<dynamic>(model.FormJsonData);
                        useTypeVal = "financeAndsalesUserNotifications";
                        strEmailSubject = "Bank Verification Status";
                        strBodyContent = strReason;
                    }
                    else if (model.SubModuleCode.Trim() == "LoanApplicationPaymentInfo")
                    {
                        useTypeVal = "usertypebanker";
                   
                        strEmailSubject = string.Format("Loan Application {0} Payment Information", model.Id);
                        strBodyContent = string.Format("Loan Application {0} Payment Information is submitted.{1}Thank You", model.Id, Environment.NewLine);
                       
                    }
                    else if (model.SubModuleCode.Trim() == "LoanApplicationAppVerification")
                    {
                        useTypeVal = "usertypebanker";
                        strEmailSubject = "Verification for Application Number# ****" + model.Id + " has been done.";
                        strBodyContent = string.Format("Verification for Application Number# ****" + model.Id + " has been done.{0}Thank You", Environment.NewLine);
                    
                        string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                        var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={model.Id}&Stage=InternalVerification").Result;
                    }
                    else if (model.SubModuleCode.Trim() == "NTPChangeOrder")
                    {
                        string strReason = "";
                        dynamic systemInfoList = JValue.Parse(model.FormJsonData);
                        foreach (var itemParent in systemInfoList)
                        {
                            if (itemParent.Name.Contains("Approved"))
                            {
                                if (itemParent.Value == "1")
                                {
                                    strEmailSubject = "NTP Change Order";
                                    useTypeVal = "NTPChangeOrder";
                                    strReason = "NTP Change Order for Application Number# ****" + model.Id + " has been approved";
                                   
                                }
                                else
                                {
                                    strEmailSubject = "NTP Change Order";
                                    useTypeVal = "NTPChangeOrder";
                                    strReason = "NTP Change Order for Application Number# ****" + model.Id + " has been denied";
                                    
                                }
                            }
                            else if (itemParent.Name.Contains("Reason"))
                            {
                                if (itemParent.Value != null)
                                {
                                    strReason += " with reason <b>" + itemParent.Value + "</b>";
                                }
                            }
                        }
                        strBodyContent = strReason;
                    }

                    if (_prodflag)
                    {
                        List<string> userIds = new List<string>();
                        dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.Id, model.companyId, useTypeVal, model.SubModuleCode.Trim());
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        if (userDET.Count > 0)
                        {


                            foreach (var usrVal in userDET)
                            {

                                if (usrVal.CompanyAdmin == "1")
                                {
                                    emailForCompanyAdmin1 = new EmailForCompanyAdminModel();
                                    emailForCompanyAdmin1.name = string.Concat(usrVal.FirstName, usrVal.LastName);
                                    emailForCompanyAdmin1.email = usrVal.Email;
                                    emailForCompanyAdmin.Add(emailForCompanyAdmin1);
                                }
                                else
                                {
                                    userIds.Add(usrVal.Id);
                                    //strUserTo = usrVal.Id;

                                    if (string.IsNullOrEmpty(strUserTo))
                                    {
                                        strUserTo = usrVal.Id;
                                        strCcUser = usrVal.Id;
                                    }
                                    else
                                    {
                                        strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                    }

                                    if (usrVal.EmailNotification == true)
                                    {
                                        emaildata1 = new emailDataModel();
                                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                        emaildata1.email = usrVal.Email;
                                        emaildata.Add(emaildata1);
                                    }
                                }
                            }

                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = strEmailSubject,
                                SubjectBody = strBodyContent,
                                RouteUrl = "loanApplication/Detail/" + model.Id,
                                ObjectId = model.Id.ToString(),
                                CreatedBy = userID.ToString(),
                                UserIdList = userIds,
                                CompanyId = companyID.ToString(),

                            };
                            await _realTimeService.SendNotification(notification);
                        }
                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                               
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, strEmailSubject, strBodyContent, Convert.ToString(model.Id), Guid.Parse(userID.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                              
                                //else
                                //{
                                //    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Email Notification", "", Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString());
                                //}
                            }
                            if (emailForCompanyAdmin != null && emailForCompanyAdmin.Count > 0 && model.SourceType == "StandAlone" && (adminEmailSubject!=null || adminEmailSubject != ""))
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emailForCompanyAdmin, htbl, adminEmailSubject, adminEmailBody, Convert.ToString(model.Id), Guid.Parse(userID.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(), 0, UserName);
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }
                    }


                }

                //var result = _loanService.getloapallicationdataforSF(Guid.Parse(userid), Convert.ToInt64(companyid), loanid);
                //string json = JsonConvert.SerializeObject(result);

                // commented by avtar - 24-mar-2021
                //if (ntpapp)
                //{
                //    try
                //    {

                //        string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                //        //string contractid = _loanService.GetLAContractID(Convert.ToInt64(Convert.ToString(model.companyId)), Convert.ToInt64(Convert.ToString(model.Id)));
                //        //dynamic userdata = JsonConvert.DeserializeObject(contractid);
                //        //string opportunityid = Convert.ToString(userdata.SFOpportunityId);
                //        var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={model.Id}&Stage=NTP").Result;
                //    }
                //    catch { }
                //}
                #endregion Send Notification to Finance/Banker Users For NTP Approval and Payment

                string retResponseMessage = string.Format("Data has been {0} successfully.", (model.Id == null) ? "inserted" : "updated");
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ID = data;

                    responseModel.ResponseMessage = retResponseMessage;
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                }

                return Ok(responseModel);
            }
            catch (Exception ex)
            {


                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception Add Update Stages Data_" + model.SubModuleCode,
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }


        /*! 
   * \brief  Add update System Information.
   * \details Function is used to  Add update System Information.
   * \author  Anish
   * \date    09 Oct 2020
   * \version 1.0    
   */

        [HttpPost]
        [Authorize]
        [Route("AddUpdateChangeOrder")]
        public async Task<IActionResult> AddUpdateChangeOrder([FromForm] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            string data = string.Empty;
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();

                string filePath = CommonSettings.AppSetting["CommonSettings:ChangeOrderDocument"];
                string filePrefix = "ChangeOrder";
                if (Request.Form.Files.Count > 0)
                {
                    //var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
                    //model.dealerDocName = fileResult.Item1 ?? "";

                    foreach (FormFile item in Request.Form.Files)
                    {
                        HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                        if (NodefilePath.Headers.Location != null)
                        {
                            string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                            var url = nodeFileUrl.Split("//");
                            if (url.Count() > 0)
                            {
                                model.FileUrl = "https://" + url[1];
                            }

                            model.dealerDocName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                            model.isMediaServer = true;
                            model.Type = Path.GetExtension(model.FileUrl);
                            
                        }
                    }
                }

                data = _loanService.AddUpdateSystemInfo(model);

                //if (model.dealerDocName != null)
                //{

                //    model.FileUrl = CommonFunctions.GetFileLink(model.dealerDocName, "image", enumFileFolder.changeOrderDocument);
                //    model.FileUrl = model.FileUrl.Replace("wwwroot", "");
                //}

                //data = _loanService.AddUpdateSystemInfo(model);

                //if (model.isSendNotification == "Yes")
                {

                    List<string> userIds = new List<string>();
                    dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(Convert.ToString(model.Id), companyid, "ChangeOrder");
                    string strUserTo = string.Empty;
                    string strCcUser = string.Empty;
                    string strEmailSubject = "Change Order";
                    string strBodyContent = "Change Order for Application Number# ****" + model.Id + " has been occurred.";

                    if (userDET.Count > 0)
                    {
                        foreach (var usrVal in userDET)
                        {
                            userIds.Add(usrVal.Id);
                            if (string.IsNullOrEmpty(strUserTo))
                            {
                                strUserTo = usrVal.Id;
                                strCcUser = usrVal.Id;
                            }
                            else
                            {
                                strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                            }
                            if (usrVal.EmailNotification == true)
                            {
                                emaildata1 = new emailDataModel();
                                emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                emaildata1.email = usrVal.Email;
                                emaildata.Add(emaildata1);
                            }
                        }

                        var notification = new NotificationSendModel
                        {
                            ToUser = null,
                            CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                            Subject = strEmailSubject,
                            SubjectBody = strBodyContent,
                            RouteUrl = "loanApplication/Detail/" + model.Id,
                            ObjectId = model.Id.ToString(),
                            CreatedBy = model.userId.ToString(),
                            UserIdList = userIds,
                            CompanyId = Convert.ToString(companyID),

                        };
                        await _realTimeService.SendNotification(notification);
                    }
                    try
                    {
                        if (emaildata != null)
                        {
                            Hashtable htbl = new Hashtable();
                            await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, strEmailSubject, strBodyContent, Convert.ToString(model.Id), Guid.Parse(model.userId.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                        }
                    }
                    catch
                    {
                        HttpContext.Session.Clear();
                    }

                }

                string retResponseMessage = string.Format("Data has been {0} successfully.", (model.Id == null) ? "inserted" : "updated");
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ID = data;

                    responseModel.ResponseMessage = retResponseMessage;
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
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

        [HttpPost]
        [Authorize]
        [Route("AddUpdateVerificationdata")]

        public async Task<IActionResult> AddUpdateVerificationdata([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();

                List<EmailForCompanyAdminModel> emailForCompanyAdmin = new List<EmailForCompanyAdminModel>();
                EmailForCompanyAdminModel emailForCompanyAdmin1 = new EmailForCompanyAdminModel();

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.userId = userid;
                model.companyId = companyid;
                string data = _loanService.AddUpdateVerificationdata(model);
                #region Send Notification to Finance/Banker Users For NTP Approval and Payment 
                if (model.SubModuleCode.Trim() == "LoanApplicationAppVerification")
                {
                    string strBodyContent = string.Empty;
                    string useTypeVal = string.Empty;
                    string strEmailSubject = string.Empty;

                    if (model.SubModuleCode.Trim() == "LoanApplicationAppVerification")
                    {
                        useTypeVal = "usertypebanker";
                        strEmailSubject = "Verification for Application Number# ****" + model.Id + " has been done.";
                        strBodyContent = string.Format("Verification for Application Number# ****" + model.Id + " has been done.{0}Thank You", Environment.NewLine);
                        
                        string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                        var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={model.Id}&Stage=InternalVerification").Result;
                    }


                    List<string> userIds = new List<string>();
                    dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.Id, model.companyId, useTypeVal);
                    
                    string strUserTo = string.Empty;
                    string strCcUser = string.Empty;
                    if (userDET.Count > 0)
                    {
                        foreach (var usrVal in userDET)
                        {
                            if (usrVal.CompanyAdmin == "1")
                            {
                                emailForCompanyAdmin1 = new EmailForCompanyAdminModel();
                                emailForCompanyAdmin1.name = string.Concat(usrVal.FirstName, usrVal.LastName);
                                emailForCompanyAdmin1.email = usrVal.Email;
                                emailForCompanyAdmin.Add(emailForCompanyAdmin1);
                            }
                            else
                            {

                                userIds.Add(usrVal.Id);
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = usrVal.Id;
                                    strCcUser = usrVal.Id;
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                }

                                if (usrVal.EmailNotification == true)
                                {
                                    emaildata1 = new emailDataModel();
                                    emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                    emaildata1.email = usrVal.Email;
                                    emaildata.Add(emaildata1);
                                }
                            }
                        }

                        var notification = new NotificationSendModel
                        {
                            ToUser = null,
                            CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                            Subject = strEmailSubject,
                            SubjectBody = strBodyContent,
                            RouteUrl = "loanApplication/Detail/" + model.Id,
                            ObjectId = model.Id.ToString(),
                            CreatedBy = userid,
                            UserIdList = userIds,
                            CompanyId = Convert.ToString(companyid),

                        };
                        await _realTimeService.SendNotification(notification);
                    }
                    try
                    {
                        if (emaildata != null)
                        {
                            Hashtable htbl = new Hashtable();
                            await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, strEmailSubject, strBodyContent, Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                        }
                        if (emailForCompanyAdmin != null && emailForCompanyAdmin.Count>0 && model.SourceType== "StandAlone")
                        {
                          var EmailSubject = "Application number# ****" + model.Id + " (Standalone Page) Required documents have been uploaded.";
                            var BodyContent = "Required Documents have been uploaded for application number# ****" + model.Id + " successfully. This application has been submitted through " + model.DealerName+ " (Standalone page)";

                            Hashtable htbl = new Hashtable();
                            await _emailSettingsService.SendEmailWithNotificationToUsers(emailForCompanyAdmin, htbl, EmailSubject, BodyContent, Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(), 0, UserName);
                        }
                    }
                    catch
                    {
                        HttpContext.Session.Clear();
                    }


                }
                #endregion Send Notification to Finance/Banker Users For NTP Approval and Payment
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = "Application verification has been done!";
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
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
        [Route("TransferFilesToSFTPFromscheduler")]
        public async Task<IActionResult> TransferFilesToSFTPFromscheduler()
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var ApplicationNumber = "";
            //try
            //{
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

                var appNumbers = _loanService.GetLoanApplicationNumbers();

                foreach (var item in appNumbers)
                {
                    try
                    {
                        ApplicationNumber = item.LoanApplicationNumber;

                        DataTable dtCSV = _loanService.sftp(Convert.ToString(item.LoanApplicationId));
                        StringBuilder sb = new StringBuilder();

                        if (dtCSV != null && dtCSV.Rows.Count > 0)
                        {
                            // Get name of columns from datatable and assigned to the string array
                            string[] columnNames = dtCSV.Columns.Cast<DataColumn>().Select(column => column.ColumnName).ToArray();

                            // Create comma sprated column name based on the items contains string array columnNames
                            sb.AppendLine(string.Join(",", columnNames));

                            // Fatch rows from datatable and append values as comma saprated to the object of StringBuilder class 
                            foreach (DataRow row in dtCSV.Rows)
                            {
                                IEnumerable<string> fields = row.ItemArray.Select(field => string.Concat("\"", field.ToString().Replace("\"", "\"\""), "\""));
                                sb.AppendLine(string.Join(",", fields));
                            }
                        }

                        byte[] fileContents;
                        fileContents = Encoding.ASCII.GetBytes(sb.ToString());

                        var data = 0;
                        if (fileContents == null || fileContents.Length == 0)
                        {
                            return NotFound();
                        }

                        else
                        {
                            data = await TransferDocs(Convert.ToInt64(item.LoanApplicationId), 1, Guid.Empty, Convert.ToInt32(item.CompanyId), item.LoanApplicationNumber, fileContents);
                        }

                        if (data == 0)
                        {
                            var tempdata = _loanService.UpdateInternalVerification_SyncStatus(item.LoanApplicationId, companyID, "Error");
                        }
                        else
                        {
                            var tempdata = _loanService.UpdateInternalVerification_SyncStatus(item.LoanApplicationId, companyID, "Success");

                        }
                    }
                    catch (Exception ex)
                    {
                        Guid guid = logService.Save(new LogModel
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = $"Exception transfer document to SFTP from scheduler for application number #" + ApplicationNumber,
                            LogLongMessage = ex.Message,
                            LogIpAddress = HttpContext.Request?.Host.Value,
                            LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                            LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.UtcNow
                        });
                    }
                }
            //}
            //catch (Exception ex)
            //{
            //    Guid guid = logService.Save(new LogModel
            //    { 
            //        LogId = Guid.NewGuid(),
            //        LogType = LogTypes.Error,
            //        LogShortMessage = $"Exception transfer document to SFTP from scheduler for application number #" + ApplicationNumber,
            //        LogLongMessage = ex.Message,
            //        LogIpAddress = HttpContext.Request?.Host.Value,
            //        LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
            //        LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
            //        LogCreatedBy = Guid.NewGuid(),
            //        LogCreatedOn = DateTime.UtcNow
            //    }); 
            //}

            return Ok();
        }


        [HttpGet]
        [Authorize]
        [Route("sftp")]
        public async Task<IActionResult> sftp(string ApplicationNumber,string AppId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

                DataTable dtCSV = _loanService.sftp(AppId);
                //var json = JsonConvert.SerializeObject(userDET);
                //var temp = JsonConvert.DeserializeObject<List<dynamic>>(json);

                //DataTable dtCSV = CommonFunctions.ToDataTable(temp);
                //string str = string.Empty;

                StringBuilder sb = new StringBuilder();

                if (dtCSV != null && dtCSV.Rows.Count > 0)
                {
                    // create object for the StringBuilder class
                    // StringBuilder sb = new StringBuilder();

                    // Get name of columns from datatable and assigned to the string array
                    string[] columnNames = dtCSV.Columns.Cast<DataColumn>().Select(column => column.ColumnName).ToArray();

                    // Create comma sprated column name based on the items contains string array columnNames
                    sb.AppendLine(string.Join(",", columnNames));

                    // Fatch rows from datatable and append values as comma saprated to the object of StringBuilder class 
                    foreach (DataRow row in dtCSV.Rows)
                    {
                        IEnumerable<string> fields = row.ItemArray.Select(field => string.Concat("\"", field.ToString().Replace("\"", "\"\""), "\""));
                        sb.AppendLine(string.Join(",", fields));
                    }

                    // save the file
                    // System.IO.File.WriteAllText(@"D:\\Anish Sharma\\mytest3.csv", sb.ToString());
                }


                byte[] fileContents;
                fileContents = Encoding.ASCII.GetBytes(sb.ToString());


                //System.IO.File.WriteAllBytes("D:\\Anish Sharma\\mytest42.csv", fileContents);

                var data = 0;
                if (fileContents == null || fileContents.Length == 0)
                {
                    return NotFound();
                }

                else
                {
                    data = await TransferDocs(Convert.ToInt64(AppId), 1, Guid.Parse(userid), Convert.ToInt32(companyid), ApplicationNumber, fileContents);
                }

                if (data == 1)
                {
                    var tempdata = _loanService.UpdateInternalVerification_SyncStatus(Convert.ToInt64(AppId), companyID, "Success");
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "SFTP Data has been uploaded successfully.";
                }
                else
                {
                    var tempdata = _loanService.UpdateInternalVerification_SyncStatus(Convert.ToInt64(AppId), companyID, "Error");
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                }

                return Ok(responseModel);
            }
            catch (Exception ex)
            {

                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception Transfer document to SFTP for application number #" + ApplicationNumber,
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });


                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return Ok(responseModel);
            }
        }


        [HttpGet]
        [Authorize]
        [Route("DownloadBankDocument")]
        public async Task<byte[]> DownloadBankDocument(string documentId, string SourceType, string SolgenFileUrl, string LoanAppId)
        {
            //USED
            //Downloads the document from signing authority based on Document Source Type
            try
            {
                string link = null;
                byte[] file = null;
                var client = new HttpClient();
                if (SolgenFileUrl == "0")
                {
                    if (SourceType == "FormstackSign")
                    {
                        link = await _formstackSignService.GetDocumentDownloadLink(Guid.Parse(documentId));
                        var response = await client.GetAsync(link);
                        if (response.IsSuccessStatusCode)
                        {
                            file = await response.Content.ReadAsByteArrayAsync();
                        }
                    }
                    else if (SourceType == "SignNow")
                    {
                        file = await _signNowService.DownloadDocument(documentId, companyID.ToString());
                    }

                    else if (SourceType == "DocuSign")
                    {
                        file = await _docusignService.DownloadDocument(documentId, LoanAppId);
                    }
                }
                else
                {

                    WebClient webClient = new WebClient();

                    file = webClient.DownloadData(SolgenFileUrl);

                    string extension = Path.GetExtension(SolgenFileUrl);

                    /*return File(fileContents: bytes,
                        contentType: $"application/{extension.Substring(1)}",
                        fileDownloadName: $"{SolgenFileName}");
                    */
                }

                if (file == null)
                {
                    return null;
                }

                return file;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception downloading document {documentId} from Insuresign",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return null;
            }
        }

        public async Task<bool> GetDocumentList(long leadid, int submoduleid, Guid userid, int companyid, string folderPath)
        {
            try
            {
                var lst = _leadService.getImages(leadid, submoduleid, userid, companyid);
                int count = 0;
                string path = "";
                List<string> doclist = new List<string>();
                foreach (var item in lst)
                {
                    if (item.MasterValue != "Change Order")
                    {
                        WebClient webClient = new WebClient();
                        byte[] bytes = webClient.DownloadData(item.UrlLink);
                        //path = "D:\\TestImg\\" + item.FileName + item.FileExtension;
                        
                        if (item.MasterValue == "Install Agreement")
                        {
                            if (count == 0)
                            {
                                path = folderPath + "InstallAgreement" + item.FileExtension;
                                count = count + 1;
                            }
                            else
                            {
                                path = folderPath + "InstallAgreement_"+ Convert.ToString(count) + item.FileExtension;
                                count = count + 1;
                            }
                        }
                        else
                        {
                            path = folderPath + item.FileName + item.FileExtension;
                        }
                        System.IO.File.WriteAllBytes(path, bytes);
                        doclist.Add(path);
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Document Path for SFTP",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return false;

            }

        }

        
        public async Task<int> TransferDocs(long leadid, int submoduleid, Guid userid, int companyid, string ApplicationNumber, byte[] fileContents)
        {
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            try
            {

                var rPath = _config["VerityFTP:RemotePath"];
                var fPath = _config["VerityFTP:FolderPath"];

                 _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyid.ToString());

                if (_settings != null && !string.IsNullOrEmpty(_settings.remotePath))
                {
                    rPath = _settings.remotePath;

                }

                if (_settings != null && !string.IsNullOrEmpty(_settings.folderPath))
                {
                    fPath = _settings.folderPath;

                }

                string pstDate = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "Pacific Standard Time").ToString("MM-dd-yyyy");

                string RemotePath = rPath + pstDate + "/" + ApplicationNumber;


                var folderPath = fPath + pstDate + "\\" + ApplicationNumber + "\\";

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                System.IO.File.WriteAllBytes(folderPath + ApplicationNumber + ".csv", fileContents);

                DataTable loandocData = _loanService.GetLoanDocDetail(leadid.ToString(), companyid);
                if (loandocData.Rows.Count > 0)
                {

                    if (loandocData.Rows[0]["type"].ToString() == "LoanDoc")
                    {
                        
                        byte[] lonDocBytes = await DownloadBankDocument(loandocData.Rows[0]["DocumentId"].ToString(), loandocData.Rows[0]["SourceType"].ToString(), loandocData.Rows[0]["FileUrl"].ToString(), loandocData.Rows[0]["LoanApplicationId"].ToString());

                        // byte[] bytes = Encoding.ASCII.GetBytes(lonDocBytes.ToString());


                        if (lonDocBytes != null)
                        {
                            System.IO.File.WriteAllBytes(folderPath + loandocData.Rows[0]["FileName"].ToString(), lonDocBytes);

                        }

                    }

                    if (loandocData.Rows.Count > 1)
                    {
                        if (loandocData.Rows[1]["type"].ToString() == "CreditReport")
                        {
                            string rawdata = "";

                            if (!string.IsNullOrEmpty(Convert.ToString(loandocData.Rows[1]["RawData"])))
                            {
                                rawdata = await _pullCreditScoreService.PopulateJsonToText(Convert.ToString(loandocData.Rows[1]["RawData"]));
                            }

                            if (!string.IsNullOrEmpty(rawdata))
                            {

                              await  CreatePDF(rawdata, folderPath + "CreditReport_" + loandocData.Rows[1]["Applicanttype"].ToString() + ".pdf");


                            }
                            if (loandocData.Rows.Count > 2)
                            {
                                if (loandocData.Rows[2]["type"].ToString() == "CreditReport")
                                {
                                    string rawdata1 = "";

                                    if (!string.IsNullOrEmpty(Convert.ToString(loandocData.Rows[2]["RawData"])))
                                    {
                                        rawdata1 = await _pullCreditScoreService.PopulateJsonToText(Convert.ToString(loandocData.Rows[2]["RawData"]));
                                    }
                                    if (!string.IsNullOrEmpty(rawdata1))
                                    {

                                        await CreatePDF(rawdata1, folderPath + "CreditReport_" + loandocData.Rows[2]["Applicanttype"].ToString() + ".pdf");


                                    }
                                }
                            }

                        }
                    }

                }


                // IEnumerable<string> multi_files = null;

                bool status = false;

                status = await GetDocumentList(leadid, submoduleid, userid, companyid, folderPath);

                //multi_files.Append(folderPath+ ApplicationNumber + ".csv");

                // multi_files.Add(folderPath + ApplicationNumber + ".csv");
                //int resultcount = 0;

                if (status)
                {


                    var tempData = "";
                    FtpClient client = new FtpClient { Host = _config["VerityFTP:Server"], Port = Convert.ToInt32(_config["VerityFTP:Port"]), Credentials = new NetworkCredential(_config["VerityFTP:User"], _config["VerityFTP:Password"]) };

                    if (_settings != null && !string.IsNullOrEmpty(_settings.server))
                    {
                        client.Host = _settings.server;

                    }

                    if (_settings != null && _settings.port > 0)
                    {
                        client.Port = _settings.port;
                    }

                    if (_settings != null && !string.IsNullOrEmpty(_settings.password))
                    {
                        client.Credentials.Password = _settings.password;
                    }

                    if (_settings != null && !string.IsNullOrEmpty(_settings.userName))
                    {
                        client.Credentials.UserName = _settings.userName;
                    }

                    try
                    {

                        client.EncryptionMode = FtpEncryptionMode.None;
                        //if (!client.IsConnected)
                        //{
                        //    await client.ConnectAsync();
                        //    client.RetryAttempts = 3;
                        //}
                        if (client.IsConnected)
                        {
                            await client.DisconnectAsync();
                            await client.ConnectAsync();
                            client.RetryAttempts = 3;
                        }
                        else
                        {
                            await client.ConnectAsync();
                            client.RetryAttempts = 3;
                        }


                        var result = await client.UploadDirectoryAsync(folderPath, RemotePath, FtpFolderSyncMode.Update, FtpRemoteExists.Overwrite);

                        List<VerityFileModel> verityFileModel = new List<VerityFileModel>();
                        VerityFileModel verityModel = new VerityFileModel();


                        foreach (var item in result)
                        {
                            verityModel = new VerityFileModel();
                            verityModel.Name = item.Name;
                            verityModel.RemotePath = item.RemotePath;
                            verityModel.IsSuccess = item.IsSuccess;
                            verityModel.IsFailed = item.IsFailed;
                            verityModel.IsSkipped = item.IsSkipped;
                            // verityModel.Exceptionmsg = item.Exception.Message;

                            verityFileModel.Add(verityModel);



                            //result = "Remote Path: " + item.RemotePath + " IsSuccess: " + item.IsSuccess + " Name " + item.Name + "  " + item.IsFailed + item.IsSkipped;
                        }

                        var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(verityFileModel);
                        client.DisconnectAsync();

                        tempData = _loanService.SaveVerityFileTransferDetail(leadid, userid, companyid, RemotePath, jsonString);
                    }
                    catch (FtpCommandException ex)
                    {
                        Guid guid = logService.Save(new LogModel
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = $"FtpCommandException occured during TransferDocs using SFTP#" + ApplicationNumber,
                            LogLongMessage = ex.Message,
                            LogIpAddress = HttpContext.Request?.Host.Value,
                            LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                            LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.UtcNow,
                            ObjectRefId = leadid

                        }); 
                        return 0;
                    }
                    catch (Exception ex)
                    {
                        Guid guid = logService.Save(new LogModel
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = $"Exception occured during TransferDocs using SFTP#" + ApplicationNumber,
                            LogLongMessage = ex.Message,
                            LogIpAddress = HttpContext.Request?.Host.Value,
                            LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                            LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.UtcNow,
                            ObjectRefId = leadid

                        });
                        return 0;
                    }
                    
                    finally
                    {
                        if (client.IsConnected)
                        {
                            client.DisconnectAsync();
                        }
                    }




                    //FtpClient client = new FtpClient { Host = _config["VerityFTP:Server"], Port = Convert.ToInt32(_config["VerityFTP:Port"]), Credentials = new NetworkCredential(_config["VerityFTP:User"], _config["VerityFTP:Password"]) };
                    //client.EncryptionMode = FtpEncryptionMode.None;
                    //if (!client.IsConnected)
                    //{
                    //    await client.ConnectAsync();
                    //    client.RetryAttempts = 3;
                    //}


                    //var result = await client.UploadDirectoryAsync(folderPath, RemotePath, FtpFolderSyncMode.Update, FtpRemoteExists.Overwrite);

                    //List<VerityFileModel> verityFileModel = new List<VerityFileModel>();
                    //VerityFileModel verityModel = new VerityFileModel();


                    //foreach (var item in result)
                    //{
                    //    verityModel = new VerityFileModel();
                    //    verityModel.Name = item.Name;
                    //    verityModel.RemotePath = item.RemotePath;
                    //    verityModel.IsSuccess = item.IsSuccess;
                    //    verityModel.IsFailed = item.IsFailed;
                    //    verityModel.IsSkipped = item.IsSkipped;
                    //    // verityModel.Exceptionmsg = item.Exception.Message;

                    //    verityFileModel.Add(verityModel);


                     
                    //    //result = "Remote Path: " + item.RemotePath + " IsSuccess: " + item.IsSuccess + " Name " + item.Name + "  " + item.IsFailed + item.IsSkipped;
                    //}

                    //var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(verityFileModel);
                    //client.DisconnectAsync();

                    //var tempData = _loanService.SaveVerityFileTransferDetail(leadid, userid, companyid, RemotePath, jsonString);
                    List<emailDataModel> emaildata = new List<emailDataModel>();
                    emailDataModel emaildata1 = new emailDataModel();

                    if (tempData == "Success")
                    {

                        #region Send Notification to Banker Users
                        List<string> userIds = new List<string>();
                        dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(Convert.ToString(leadid), Convert.ToString(companyid),"usertypeConsumer_Lending@VerityCU");
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        
                        string subjectBody = string.Format("A new loan application number " +ApplicationNumber+ " has been trasnmitted to SFTP.");
                        string emailsubject = "A new loan application "+ApplicationNumber+ " has arrived";
                        if (userDET.Count > 0)
                        {
                            foreach (var usrVal in userDET)
                            {
                                userIds.Add(usrVal.Id);
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = usrVal.Id;
                                    strCcUser = usrVal.Id;
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                }
                                if (usrVal.EmailNotification == true)
                                {
                                    emaildata1 = new emailDataModel();
                                    emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);
                                    emaildata1.email = usrVal.Email;
                                    emaildata.Add(emaildata1);
                                }
                            }

                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = emailsubject,
                                SubjectBody = subjectBody,
                                RouteUrl = "loanApplication/Detail/" + leadid,
                                ObjectId = leadid.ToString(),
                                CreatedBy = Convert.ToString(userid),
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(companyid),

                            };
                            await _realTimeService.SendNotification(notification);
                        }
                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailsubject, subjectBody, Convert.ToString(leadid), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(), 0, UserName);
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }

                        #endregion Send Notification to Banker Users

                        if (Directory.Exists(folderPath))
                        {

                            Directory.Delete(folderPath,true);

                        }
                    }
            
                    
                }

                return 1;
                
            }
            catch (Exception ex)
            {

                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception occured during TransferDocs using SFTP for Application Number #"+ ApplicationNumber,
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow,
                    ObjectRefId = leadid
                });
                return 0;   
            }


        }


        



        [HttpPost]
        [Authorize]
        [Route("AddUpdateBankdata")]

        public async Task<IActionResult> AddUpdateBankdata([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.userId = userid;
                model.companyId = companyid;
                string data = _loanService.AddUpdateBankdata(model);
                
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = "Application verification has been done!";
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                }

                return Ok(responseModel);

            }
            catch //(Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateDynamicForm")]
        public async Task<IActionResult> AddUpdateDynamicForm([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.userId = userid;
                model.companyId = companyid;
                string data = _loanService.AddUpdateDynamicForm(model);
                string retResponseMessage = string.Format("Form Data has been {0} successfully.", (model.Id == null) ? "inserted" : "updated");
                if (data != null)
                {
                    #region Notification
                    string strBodyContent = string.Empty;
                    string useTypeVal = string.Empty;
                    string strEmailSubject = string.Empty;
                    string strReason = string.Empty;
                    bool sendNotification = false;
                    if (model.StageName.Trim().ToUpper() == "AUDIT")
                    {
                        dynamic systemInfoList = JValue.Parse(model.FormJsonData);
                        foreach (var itemParent in systemInfoList)
                        {
                            if (itemParent.Name.Contains("Audit"))
                            {
                                if (itemParent.Value == "1")
                                {
                                    strEmailSubject = "Audit Approve";
                                    useTypeVal = "AuditApprove";
                                    strReason = "Audit for Application Number# ****" + model.Id + " has been Approved";

                                }
                                else
                                {
                                    strEmailSubject = "Audit Deny";
                                    useTypeVal = "AuditDeny";
                                    strReason = "Audit for Application Number# ****" + model.Id + " has been denied";
                                }
                            }
                            else if (itemParent.Name.Contains("Reason"))
                            {
                                if (itemParent.Value != null)
                                {
                                    strReason += " with reason <b>" + itemParent.Value + "</b>";
                                }
                            }
                        }
                        strBodyContent = strReason;
                        if (strBodyContent != "")
                            sendNotification = true;
                    }
                    else if (model.StageName.Trim().ToUpper() == "NTP FUNDING")
                    {
                        strEmailSubject = "NTP Funding";
                        useTypeVal = "NTPFunding";
                        strBodyContent = "NTP Funding for Application Number# ****" + model.Id + " has been Approved";

                        if (strBodyContent != "")
                            sendNotification = true;
                    }
                    else if (model.StageName.Trim().ToUpper() == "INSTALLER FUNDING")
                    {
                        strEmailSubject = "Install Funding";
                        useTypeVal = "InstallFunding";
                        strBodyContent = "Install Funding for Application Number# ****" + model.Id + " has been Approved";

                        if (strBodyContent != "")
                            sendNotification = true;
                    }
                    else if (model.StageName.Trim().ToUpper() == "INSTALLER FUNDING(CO)")
                        {
                        strEmailSubject = "INSTALLER FUNDING(CO)";
                        useTypeVal = "InstallFundingChangeOrder";
                        strBodyContent = "Installer Funding(CO) for Application Number# ****" + model.Id + " has been Approved";

                        if (strBodyContent != "")
                            sendNotification = true;
                    }


                    if (sendNotification)
                    {
                        List<string> userIds = new List<string>();
                        dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.Id, model.companyId, useTypeVal, model.SubModuleCode.Trim());
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        if (userDET.Count > 0)
                        {
                            foreach (var usrVal in userDET)
                            {
                                userIds.Add(usrVal.Id);
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = usrVal.Id;
                                    strCcUser = usrVal.Id;
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                }
                                if (usrVal.EmailNotification == true)
                                {
                                    emaildata1 = new emailDataModel();
                                    emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                    emaildata1.email = usrVal.Email;
                                    emaildata.Add(emaildata1);
                                }
                            }

                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = strEmailSubject,
                                SubjectBody = strBodyContent,
                                RouteUrl = "loanApplication/Detail/" + model.Id,
                                ObjectId = model.Id.ToString(),
                                CreatedBy = userid,
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(companyid),

                            };
                            await _realTimeService.SendNotification(notification);
                        }

                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, strEmailSubject, strBodyContent, Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }
                    }
                    #endregion
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = retResponseMessage; //"Lead has been updated successfully!";
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                }

                return Ok(responseModel);
            }
            catch //(Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddUpdateInstallStepForm")]
        public async Task<IActionResult> AddUpdateInstallStepForm([FromForm] installStepJsonModel model)
        {
            var href = "";
            ResultResponseModel responseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            
                model.userId = userid;
                model.companyId = companyid;
                string filePath = CommonSettings.AppSetting["CommonSettings:InstallStepDocuments"];
                string filePrefix = "installStep";
                if (Request.Form.Files.Count > 0)
                {
                    foreach (FormFile item in Request.Form.Files)
                    {
                        if (item.Name == "file")
                        {
                            HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                            if (NodefilePath.Headers.Location != null)
                            {
                                string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                                var url = nodeFileUrl.Split("//");
                                if (url.Count() > 0)
                                {
                                     href= "https://" + url[1];
                                }
                                if (href !="")
                                {
                                    href += ",";
                                }
                            }
                            model.HouseInViewfile = model.HouseInViewfile + href;
                        }

                        if (item.Name == "file2")
                        {
                            HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                            if (NodefilePath.Headers.Location != null)
                            {
                                string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                                var url = nodeFileUrl.Split("//");
                                if (url.Count() > 0)
                                {
                                    href = "https://" + url[1];
                                }
                                if (href != "")
                                {
                                    href += ",";
                                }
                            }
                            model.ElectricHookupfile = model.ElectricHookupfile + href;
                        }

                        if (item.Name == "file3")
                        {
                            HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                            if (NodefilePath.Headers.Location != null)
                            {
                                string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                                var url = nodeFileUrl.Split("//");
                                if (url.Count() > 0)
                                {
                                    href = "https://" + url[1];
                                }
                                if (href != "")
                                {
                                    href += ",";
                                }
                            }
                            model.ResidenceWithAddressInViewfile = model.ResidenceWithAddressInViewfile + href;
                        }

                        if (item.Name == "file4")
                        {
                            HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                            if (NodefilePath.Headers.Location != null)
                            {
                                string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                                var url = nodeFileUrl.Split("//");
                                if (url.Count() > 0)
                                {
                                    href = "https://" + url[1];
                                }
                                if (href != "")
                                {
                                    href += ",";
                                }
                            }
                            model.BatteryStoragefile = model.BatteryStoragefile + href;
                        }

                    }
                }
                string data = _loanService.AddUpdateInstallStepForm(model);

                List<string> userIds = new List<string>();
                dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(Convert.ToString(model.Id), companyid.ToString(), "InstallStep");
             


                string strUserTo = string.Empty;
                string strCcUser = string.Empty;
               
                string strEmailSubject = "Install Step";
                string strBodyContent = "Installation for Application Number# ****" + Convert.ToString(model.Id) + " has been done.";

                if (userDET.Count > 0)
                {
                    foreach (var usrVal in userDET)
                    {
                        userIds.Add(usrVal.Id);
                        if (string.IsNullOrEmpty(strUserTo))
                        {
                            strUserTo = usrVal.Id;
                            strCcUser = usrVal.Id;
                        }
                        else
                        {
                            strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                        }
                        
                        if(usrVal.EmailNotification==true)
                        {
                            emaildata1 = new emailDataModel();
                            emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                            emaildata1.email = usrVal.Email;
                            emaildata.Add(emaildata1);
                        }
                    }

                    var notification = new NotificationSendModel
                    {
                        ToUser = null,
                        CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                        Subject = strEmailSubject,
                        SubjectBody = strBodyContent,
                        RouteUrl = "loanApplication/Detail/" + Convert.ToString(model.Id),
                        ObjectId = Convert.ToString(model.Id),
                        CreatedBy = userid.ToString(),
                        UserIdList = userIds,
                        CompanyId = Convert.ToString(companyID),

                    };
                    await _realTimeService.SendNotification(notification);
                }

                try
                {
                    if (emaildata != null)
                    {
                        Hashtable htbl = new Hashtable();
                        await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, strEmailSubject, strBodyContent, Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                    }
                }
                catch
                {
                    HttpContext.Session.Clear();
                }


                //try
                //{
                //    Hashtable htbl = new Hashtable();
                //    //htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                //    htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                //    if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                //    else if (CompanyID == 1002 || CompanyID==1004) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                //    else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                //    else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                //    await _emailSettingsService.SendEmail(model.ApplicantEmail, htbl, "Solar Installation", "Congratulations on your decision to go Solar! As a part of the next steps can you please share your feedback with us how has the installation been working for you?", Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["SolarInstallation"], "LoanApplication", CompanyID.ToString());
                //}
                //catch
                //{
                //    HttpContext.Session.Clear();
                //}


                string retResponseMessage = string.Format("Form Data has been {0} successfully.", (model.Id == null) ? "inserted" : "updated");
                if (data != null)
                {

                   
                    //result.imageLink = CommonFunctions.GetFileLink(result.imageLink, "image", enumFileFolder.user);
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = retResponseMessage; //"Lead has been updated successfully!";
                    try {
                        if (data == "1") { 
                        SendSms(model.BorrowerPhoneNumber, Convert.ToInt32(model.Id), "INSTALL_STEP", Convert.ToInt32(companyid), Guid.Parse(userid));
                        }
                    }
                    catch {
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = retResponseMessage;
                    }

                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
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
        [Authorize]
        [Route("GetSystemInfo")]
        public async Task<IActionResult> GetSystemInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetSystemInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddUpdateApplicant")]

        public IActionResult AddUpdateApplicant([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);
            string prepareModel = string.Concat("[", json, "]");
            var data = _loanService.AddUpdateApplicant(prepareModel, userid, Convert.ToInt64(companyid));
            result.StatusCode = 200;
            result.ResponseMessage = "Applicant has been added successfully.";

            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("GetApplicantInfo")]
        public async Task<IActionResult> GetApplicantInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetApplicantInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetbankApplicantInfo")]
        public async Task<IActionResult> GetbankApplicantInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetbankApplicantInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddUpdateCoApplicant")]

        public IActionResult AddUpdateCoApplicant([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);
            string prepareModel = string.Concat("[", json, "]");
            var data = _loanService.AddUpdateCoApplicant(prepareModel, userid, Convert.ToInt64(companyid));
            result.StatusCode = 200;
            result.ResponseMessage = "Co-Applicant has been added successfully.";

            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("GetCoApplicantInfo")]
        public async Task<IActionResult> GetCoApplicantInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetCoApplicantInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }



        [HttpPost]
        [Authorize]
        [Route("AddUpdateInstallerProperty")]

        public IActionResult AddUpdateInstallerProperty([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            //string prepareModel = string.Concat("[", model, "]");
            string json = JsonConvert.SerializeObject(model);
            string prepareModel = string.Concat("[", json, "]");
            var data = _loanService.AddUpdateInstallerProperty(prepareModel, userid, Convert.ToInt64(companyid));
            result.StatusCode = 200;
            result.ResponseMessage = "Installation has been added successfully.";

            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("GetInstallerPropertyInfo")]
        public async Task<IActionResult> GetInstallerPropertyInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetInstallerPropertyInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }



        [HttpPost]
        [Authorize]
        [Route("AddUpdatePaymentInfo")]

        public async Task<IActionResult> AddUpdatePaymentInfo([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();
            List<emailDataModel> emaildata = new List<emailDataModel>();
            emailDataModel emaildata1 = new emailDataModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            //string prepareModel = string.Concat("[", model, "]");
            string json = JsonConvert.SerializeObject(model);
            string prepareModel = string.Concat("[", json, "]");
            var data = _loanService.AddUpdatePaymentInfo(prepareModel, userid, Convert.ToInt64(companyid));
            result.StatusCode = 200;
            result.ResponseMessage = "Payment information has been added successfully.";

            #region Send Notification to Banker Users
            List<string> userIds = new List<string>();
            dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.LoanApplicationId, "usertypebanker", long.Parse(model.CompanyId));
            string strUserTo = string.Empty;
            string subjectBody = string.Format("Loan Application {0} Payment is done. \n Thanks", model.LoanApplicationId);
            string emailsubject = "Loan Application Payment";
            if (userDET.Count > 0)
            {
                foreach (var usrVal in userDET)
                {
                    userIds.Add(usrVal.Id);
                    strUserTo += (string.IsNullOrEmpty(strUserTo)) ? string.Format("'{0}';", usrVal.Email) : string.Format(",'{0}';", usrVal.Email);

                    if (usrVal.EmailNotification == true)
                    {
                        emaildata1 = new emailDataModel();
                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                        emaildata1.email = usrVal.Email;
                        emaildata.Add(emaildata1);
                    }
                }

              

                var notification = new NotificationSendModel
                {
                    ToUser = strUserTo,
                    CcUser = null,
                    Subject = string.Format("Loan Application {0} Payment Information", model.LoanApplicationId),
                    SubjectBody = subjectBody,
                    RouteUrl = "loanApplication/Detail/" + model.LoanApplicationId,
                    ObjectId = model.LoanApplicationId.ToString(),
                    CreatedBy = userid,
                    UserIdList = userIds,
                    CompanyId = Convert.ToString(companyID),

                };
                await _realTimeService.SendNotification(notification);
            }
            try
            {
                if (emaildata != null)
                {
                    Hashtable htbl = new Hashtable();
                    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailsubject, subjectBody, Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                }
            }
            catch
            {
                HttpContext.Session.Clear();
            }

            #endregion Send Notification to Banker Users

            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("GetPaymentInfo")]
        public async Task<IActionResult> GetPaymentInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetPaymentInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateLoanProduct")]

        public IActionResult AddUpdateLoanProduct([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);
            string prepareModel = string.Concat("[", json, "]");
            var data = _loanService.AddUpdateLoanProduct(prepareModel, userid, Convert.ToInt64(companyid));
            result.StatusCode = 200;
            result.ResponseMessage = "Loan Product has been added successfully.";

            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("GetLoanProductInfo")]
        public async Task<IActionResult> GetLoanProductInfo(long applicationid,string submoduleName=null)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetLoanProductInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid, submoduleName);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("addUpdateReleaseFunds")]

        public IActionResult AddUpdateReleaseFunds([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);
            string prepareModel = string.Concat("[", json, "]");
            var data = _loanService.AddUpdateReleaseFunds(prepareModel, userid, Convert.ToInt64(companyid));
            result.StatusCode = 200;
            result.ResponseMessage = "Release fund amount has been saved successfully.";

            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("GetReleaseFundsInfo")]
        public async Task<IActionResult> GetReleaseFundsInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetReleaseFundsInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateNtp")]

        public async Task<IActionResult> AddUpdateNtp([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();
            List<emailDataModel> emaildata = new List<emailDataModel>();
            emailDataModel emaildata1 = new emailDataModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);
            string prepareModel = string.Concat("[", json, "]");
            var data = _loanService.AddUpdateNtp(prepareModel, userid, Convert.ToInt64(companyid));
            result.StatusCode = 200;
            result.ResponseMessage = "NTP has been added successfully.";

            #region Send Notification to Finance Users
            List<string> userIds = new List<string>();
            dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.LoanApplicationId, "usertypefinance", long.Parse(model.CompanyId));
            string strUserTo = string.Empty;
            string strCcUser = string.Empty;
            if (userDET.Count > 0)
            {
                foreach (var usrVal in userDET)
                {
                    userIds.Add(usrVal.Id);
                    strUserTo = usrVal.Id;
                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                    if (usrVal.EmailNotification == true)
                    {
                        emaildata1 = new emailDataModel();
                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                        emaildata1.email = usrVal.Email;
                        emaildata.Add(emaildata1);
                    }
                }

                string subjectBody = (model.IsApproved) ? "NTP Approved" : model.Reason;
                var notification = new NotificationSendModel
                {
                    ToUser = strUserTo,
                    CcUser = (strUserTo == strCcUser) ? null : strCcUser.Split(','),
                    Subject = "NTP Approval Status",
                    SubjectBody = subjectBody,
                    RouteUrl = "loanApplication/Detail/" + model.LoanApplicationId,
                    ObjectId = model.LoanApplicationId.ToString(),
                    CreatedBy = userid,
                    UserIdList = userIds,
                    CompanyId = Convert.ToString(companyID),

                };
                await _realTimeService.SendNotification(notification);
            }

            try
            {
                if (emaildata != null)
                {
                    Hashtable htbl = new Hashtable();
                    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Email Notification", "You have a new notification in your notification box. Please review. ", Convert.ToString(model.Id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                }
            }
            catch
            {
                HttpContext.Session.Clear();
            }
            #endregion Send Notification to Finance Users
            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("GetNtpInfo")]
        public async Task<IActionResult> GetNtpInfo(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetNtpInfo(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("getUploadedImages")]
        public IActionResult getUploadedImages(long accid)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.getUploadedImages(accid, userid, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetLoanapplicationNotificationList")]
        public IActionResult GetLoanapplicationNotificationList(long applicationid, string sortColumn, string sortDir, int pageNumber, int pageSizeValue)
        {
            try
            {
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.GetLoanapplicationNotificationList(applicationid, userid, CompanyID, sortDir, sortColumn, pageNumber, pageSizeValue);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetToUserDrpList")]
        public IActionResult GetToUserDrpList(long? loanId, int? isPrivate)
        {
            try
            {
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.GetToUserDrpList(userid, CompanyID.ToString(), loanId, isPrivate);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetFollowUpToList")]
        public IActionResult GetFollowUpToList(string loanId, long commenthistoryId)
        {
            try
            {
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.GetFollowUpToList(loanId, CompanyID.ToString(), commenthistoryId);
                return Ok(lst);
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetCCUserDrpList")]
        public IActionResult GetCCUserDrpList()
        {
            try
            {
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.GetCCUserDrpList(userid, CompanyID.ToString());
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Authorize]
        [Route("SendManualNotification")]
        public async Task<object> SendManualNotification([FromBody] SendMaualNotificationModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            if (model != null)
            {
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CreatedBy = userid; model.CompanyId = Convert.ToString(CompanyID);
                Hashtable htbl1 = new Hashtable();
                htbl1["@username"] = model.fromName;
                // htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                htbl1["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                htbl1["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                if (CompanyID == 1001) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                else if (CompanyID == 1002) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                else if (CompanyID == 1003) { htbl1["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                else { htbl1["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                model.subjectBody = ReplaceFileVariables(htbl1, model.subjectBody);
                if (!string.IsNullOrEmpty(model.templateId))
                {
                    dynamic loanDET = _commonService.GetEmailTemplateDataForReplaceContent(Convert.ToString(model.objectId), Convert.ToString(model.templateId), Guid.Parse(model.CreatedBy), long.Parse(model.CompanyId));
                    if (loanDET.Count > 0)
                    {
                        foreach (var itmval in loanDET)
                        {
                            model.subjectBody = model.subjectBody.Replace(string.Format("@{0}", itmval.repKey), itmval.repValue);
                        }
                    }
                }
                // var lst = _loanService.SendEmailForManualNotification(model);
                var lst = _loanService.SaveUserEmail(model);


                Hashtable htbl = new Hashtable();
                htbl["@username"] = model.fromName;
                // htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                htbl["@bodycontent"] = model.subjectBody;
                htbl["@year"] = DateTime.Parse(DateTime.Now.ToString()).Year.ToString();
                if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                await _emailSettingsService.SendEmailForMutipleUser(model.toemail, model?.ccEmail?.Split(','), htbl, "Email", $"Email", userid, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["SendMail"], "SendMail", CompanyID.ToString());

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Notification has been Send successfully.";
                List<string> userIds = new List<string>();
                userIds.Add(model.toUser);
                if (model.ccUser != null)
                {
                    foreach (var id in model.ccUser)
                    {
                        userIds.Add(id);
                    }
                }
                var notification = new NotificationSendModel
                {
                    ToUser = model.toUser,
                    CcUser = model.ccUser,
                    Subject = "Email",
                    SubjectBody = model.subjectBody,
                    RouteUrl = "loanApplication/Detail/" + model.objectId,
                    ObjectId = model.objectId.ToString(),
                    CreatedBy = userid,
                    UserIdList = userIds,
                    CompanyId = Convert.ToString(CompanyID),

                };


                model.RouteUrl = "loanApplication/Detail/" + model.objectId;
                await _realTimeService.SendNotification(notification);

                return Ok(resultResponseModel);
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Some thing went wrong, please contact site adminstrator!.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("ShareLink")]
        public async Task<string> ShareLink(string id,string type="", string borrowerPhoneNumber="", string applicantName = "")
        {

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

                string accid = "";
                dynamic json = JsonConvert.DeserializeObject<dynamic>(await _loanService.GetApplicationById(Guid.Parse(userid), long.Parse(companyid), long.Parse(id)));
                accid = json.AccountId;

                if (type == "EMAIL")
                {

                    Hashtable htbl = new Hashtable();
                    htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                    //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                    string link = _config.GetSection("CommonSettings")["SiteLink"] + "/uploadfiles/upload/" + id + "/" + accid;

                    htbl["@link"] = $"<a href=" + link + ">Click here To Upload Documents</a>";
                    string templateName = _config.GetSection("CommonSettings")["DocumentUploadTemplate"];
                    //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];

                    if (companyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                    else if (companyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                    else if (companyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                    else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                    var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, companyid);
                    string subjectBody = ReplaceFileVariables(htbl, objTemplate.Template);
                    if (objTemplate.TemplateID > 0)
                    {
                        dynamic loanDET = _commonService.GetEmailTemplateDataForReplaceContent(Convert.ToString(id), Convert.ToString(objTemplate.TemplateID), Guid.Parse(userid), long.Parse(companyid));
                        if (loanDET.Count > 0)
                        {
                            foreach (var itmval in loanDET)
                            {
                                subjectBody = subjectBody.Replace(string.Format("@{0}", itmval.repKey), itmval.repValue);
                            }
                        }
                    }

                    // var applicationUser = _loanService.GetApplicantInfo(Guid.Parse(userid), long.Parse(companyid), long.Parse(id));
                    await _emailSettingsService.SendEmailDocs(json.Email.ToString(), htbl, objTemplate.EmailTemplateSubject, subjectBody, Convert.ToString(id), Guid.Parse(userid), false, _config.GetSection("CommonSettings")["DocumentUploadTemplate"], "Finance", companyID.ToString());
                }
                else
                {
                    var encryId = Encrypt1(Convert.ToInt32(id));
                    string link = _config.GetSection("CommonSettings")["SiteLink"] + "/u/a/" + encryId;
                    SendSms(borrowerPhoneNumber, Convert.ToInt64(id), "UploadShareLink", Convert.ToInt64(companyid), Guid.Parse(userid), "ShareLink", link,applicantName);
                }
            }
            catch(Exception ex)
            {
                HttpContext.Session.Clear();
            }
         
            return "";
        }
        public string Encrypt1(int value)
        {
            return Convert.ToBase64String(BitConverter.GetBytes(value)).Replace("==", "");
        }

        public string ReplaceFileVariables(Hashtable hashVars, string content)
        {
            IDictionaryEnumerator dicEn = hashVars.GetEnumerator();
            if (!string.IsNullOrEmpty(content))
            {
                while (dicEn.MoveNext())
                {
                    content = content.Replace(dicEn.Key.ToString(), Convert.ToString(dicEn.Value));
                }
            }

            return content;
        }
        [HttpGet]
        [Authorize]
        [Route("GetAuditHistoryList")]
        public IActionResult GetAuditHistoryList(long? sectionId, string tableName, long appid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _loanService.GetAuditHistoryList(sectionId, tableName, userid, Convert.ToInt64(companyid), appid);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetAuditHistoryDetail")]
        public IActionResult GetAuditHistoryDetail(long? id1, long? id2, string tblName1, string tblName2, string appid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _loanService.GetAuditHistoryDetail(id1, id2, tblName1, tblName2, userid, Convert.ToInt64(companyid), appid);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("SendToBankUser")]
        public async Task<IActionResult> SendToBankUser(long id, string applicationNumber,string reason,string reqdate)
        {
            ResultResponseModel result = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();
                DateTime dt = DateTime.ParseExact(reqdate.Substring(0, 24),
                  "ddd MMM dd yyyy HH:mm:ss",
                  CultureInfo.InvariantCulture);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

                #region Send Notification to Finance Users
                string subjectBody = "#" + applicationNumber + ": Loan Application Cancellation Request";
                string emailsubject = "Loan Application Cancellation Request";
                List<string> userIds = new List<string>();
                dynamic userDET = _loanService.GetBankUserSetCancelReqForNotification(id, companyid, userid, reason, (dt.ToString("MM/dd/yyyy")));
                string strUserTo = string.Empty;
                string strCcUser = string.Empty;
                if (userDET.Count > 0)
                {
                    foreach (var usrVal in userDET)
                    {
                        userIds.Add(usrVal.UserId.ToString());
                        strUserTo = usrVal.UserId.ToString();
                        strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.UserId.ToString() : string.Format(",{0}", usrVal.UserId.ToString());

                        if (usrVal.EmailNotification == true)
                        {
                            emaildata1 = new emailDataModel();
                            emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                            emaildata1.email = usrVal.Email;
                            emaildata.Add(emaildata1);
                        }
                    }

                    
                 
                    var notification = new NotificationSendModel
                    {
                        ToUser = null,
                        CcUser = (strUserTo == strCcUser) ? null : strCcUser.Split(','),
                        Subject = "#" + applicationNumber + ": Loan Application Cancellation Request",
                        SubjectBody = subjectBody,
                        RouteUrl = "loanApplication/Detail/" + id,
                        ObjectId = id.ToString(),
                        CreatedBy = userid,
                        UserIdList = userIds,
                        CompanyId = Convert.ToString(companyID),

                    };
                    await _realTimeService.SendNotification(notification);
                }

                try
                {
                    if (emaildata != null)
                    {
                        Hashtable htbl = new Hashtable();
                        await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailsubject, subjectBody, Convert.ToString(id), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                    }
                }
                catch
                {
                    HttpContext.Session.Clear();
                }
                #endregion Send Notification to Finance Users

                result.ResponseMessage = "Application Number: " + applicationNumber + ": Cancellation request has been sent to bank user.";
                result.StatusCode = 200;
                return Ok(result);
            }
            catch
            {
                result.StatusCode = 500;
                result.ResponseMessage = "Something went wrong, please contact site adminstrator!.";
                return Ok(result);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddComment")]
        public async Task<IActionResult> AddComment([FromBody] CommentModel model)
        {
            ResultResponseModel result = new ResultResponseModel();

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.CompanyId = Convert.ToInt64(companyid);
                model.UserId = userid;
                var data = _loanService.AddComment(model);
                if (data != 0)
                {
                    var notification = new NotificationSendModel()
                    {
                        CcUser = model.AssignTo.Split(','),
                        Subject = "Comment",
                        SubjectBody = model.Comment,
                        RouteUrl = "loanApplication/Detail/" + model.LoanApplicationId,
                        ObjectId = model.LoanApplicationId.ToString(),
                        CreatedBy = userid,
                        UserIdList = model.AssignTo.Split(',').ToList(),
                        CompanyId = companyid,

                    };

                    await _realTimeService.SendNotification(notification);

                    result.ResponseMessage = "Comment has been added successfully.";
                    result.StatusCode = 200;
                    return Ok(result);
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Something went wrong, please contact site adminstrator!.";
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {

                result.StatusCode = 500;
                result.ResponseMessage = "Something went wrong, please contact site adminstrator!.";
                return Ok(result);
            }

        }

        [HttpPost]
        [Authorize]
        [Route("ReplyComment")]
        public async Task<IActionResult> ReplyComment([FromBody] ReplyCommentModel model)
        {
            ResultResponseModel result = new ResultResponseModel();

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.CompanyId = Convert.ToInt64(companyid);
                model.UserId = userid;
                var users = _loanService.ReplyComment(model);
                if (users != null)
                {
                    var notification = new NotificationSendModel()
                    {
                        CcUser = users.Split(','),
                        Subject = "Comment",
                        SubjectBody = model.ReplyComment,
                        RouteUrl = "loanApplication/Detail/" + model.ReplyLoanApplicationId,
                        ObjectId = model.ReplyLoanApplicationId.ToString(),
                        CreatedBy = userid,
                        UserIdList = users.Split(',').ToList(),
                        CompanyId = companyid,

                    };

                    await _realTimeService.SendNotification(notification);

                    result.ResponseMessage = "Comment has been added successfully.";
                    result.StatusCode = 200;
                    return Ok(result);
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Something went wrong, please contact site adminstrator!.";
                    return Ok(result);
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpGet]
        [Authorize]
        [Route("GetCommentHistoryList")]
        public IActionResult GetCommentHistoryList(string sortColumn, string sortDir, int pageNumber, int pageSizeValue, long loanId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _loanService.GetCommentHistoryList(userid, Convert.ToInt64(companyID), sortDir, sortColumn, pageNumber, pageSizeValue, loanId);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetAssignedUserList")]

        public IActionResult GetAssignedUserList(string sortColumn, string sortDir, int pageNumber, int pageSizeValue, long loanId, long commentId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _loanService.GetAssignedUserList(userid, Convert.ToInt64(companyID), sortDir, sortColumn, pageNumber, pageSizeValue, loanId, commentId);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetRuleEngineHistoryList")]
        public IActionResult GetRuleEngineHistoryList(string sortColumn, string sortDir, int pageNumber, int pageSizeValue, long loanId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _loanService.GetRuleEngineHistoryList(userid, Convert.ToInt64(companyID), sortDir, sortColumn, pageNumber, pageSizeValue, loanId);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetExpensesIncomeDetail")]
        public async Task<IActionResult> GetExpensesIncomeDetail(long loanId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetExpensesIncomeList(userid, Convert.ToInt64(companyid), loanId);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                var CT= Content(prepareResult, "application/json");
                return CT;

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetExpensesDebtDetail")]
        public async Task<IActionResult> GetExpensesDebtList(long loanId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetExpensesDebtList(userid, Convert.ToInt64(companyid), loanId);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateExpenseIncome")]
        public IActionResult AddUpdateExpenseIncome([FromBody] ExpensesModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            model.CompanyId = Convert.ToInt64(companyid);
            model.UserId = userid;
            if (model != null)
            {
                var data = _loanService.AddUpdateExpenseIncome(model);
                if (data > 0)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Income has been updated successfully";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateExpenseDebt")]
        public IActionResult AddUpdateExpenseDebt([FromBody] ExpensesModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            model.CompanyId = Convert.ToInt64(companyid);
            model.UserId = userid;
            if (model != null)
            {
                var data = _loanService.AddUpdateExpenseDebt(model);
                if (data > 0)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Debt has been updated successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetExpensesRatiosDetail")]
        public async Task<IActionResult> GetExpensesRatiosDetail(long loanId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetExpensesRatiosDetail(userid, Convert.ToInt64(companyid), loanId);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("getDocumentForReceiveAndPending")]
        public IActionResult getDocumentForReceiveAndPending(long productId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = _loanService.GetDocumentForReceiveAndPending(userid, companyid, Convert.ToString(productId), null);

                if (result == null)
                    return BadRequest();

                //string prepareResult = string.Concat("[", result, "]");
                //return Content(prepareResult, "application/json");
                return Ok(result);

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("getDocumentForReceiveAndPendingForCust")]
        public IActionResult getDocumentForReceiveAndPendingForCust(long productId,string companyid, string reqFrom)
        {
            try
            {
                
               
                var result = _loanService.GetDocumentForReceiveAndPending(Guid.Empty.ToString(), companyid, Convert.ToString(productId), reqFrom);

                if (result == null)
                    return BadRequest();

                //string prepareResult = string.Concat("[", result, "]");
                //return Content(prepareResult, "application/json");
                return Ok(result);

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
   
        [HttpGet]
        [Authorize]
        [Route("GetPendingDocumentName")]
        public IActionResult GetPendingDocumentName(string loanId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = _loanService.GetPendingDocumentName(userid, companyid, loanId);

                if (result == null)
                    return BadRequest();

                //string prepareResult = string.Concat("[", result, "]");
                //return Content(prepareResult, "application/json");
                return Ok(result);

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
     
        [HttpGet]
        [Authorize]
        [Route("GetLoanApplicationBankerList")]
        public IActionResult GetLoanApplicationBankerList(string name, string sortColumn, string sortDir, int pageNumber, int pageSizeValue, long loanapplicationId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _loanService.GetLoanApplicationBankerList(userid, Convert.ToInt64(companyID), name, sortDir, sortColumn, pageNumber, pageSizeValue, loanapplicationId);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetLoanApplicationSalesList")]
        public IActionResult GetLoanApplicationSalesList(string name, string userType, string sortColumn, string sortDir, int pageNumber, int pageSizeValue, long loanapplicationId,string listType="")
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _loanService.GetLoanApplicationSalesList(userid, Convert.ToInt64(companyID), name, userType, sortDir, sortColumn, pageNumber, pageSizeValue, loanapplicationId, listType);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
   
        [HttpPost]
        [Authorize]
        [Route("saveAssociateBanker")]
        public async Task<IActionResult> saveAssociateBanker([FromBody] saveAssociateBankerModel model)
        {
            ResultResponseModel result = new ResultResponseModel();

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.CompanyId = Convert.ToInt64(companyid);
                model.UserId = userid;

                var data = _loanService.saveAssociateBanker(model);

                if (data != null)
                {
                    var contactList = JsonConvert.DeserializeObject<List<dynamic>>(model.contactids).Where(m => m.Status == 1 && m.Status == true);

                    if (contactList != null)
                    {
                        foreach (var item in contactList)
                        {
                            string email = item.Email;
                            string username = item.Name;

                            var callbackUrl1 = _config.GetSection("CommonSettings")["SiteLink"];
                            Hashtable htbl = new Hashtable();
                            htbl["@link"] = $"<a href='{callbackUrl1}'>Click here</a>";
                            htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                            htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                            htbl["@year"] = DateTime.Parse(DateTime.Now.ToString()).Year.ToString();
                            htbl["@applicantName"] = model.ApplicantName;
                            htbl["@applicationNumber"] = model.ApplicationNumber;
                            htbl["@userName"] = username;
                            if (companyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                            else if (companyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                            else if (companyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                            else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                            await _emailSettingsService.SendEmailForAssignedMutipleUser(email, htbl, "Email", $"Email", userid, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["ApplicationAssignedToUser"], "ApplicationAssignedToUser", companyID.ToString());

                        }
                    }


                    var notification = new NotificationSendModel()
                    {
                        CcUser = contactList.Select(m => (string)m.Id).ToArray(),
                        Subject = "Assigned",
                        //SubjectBody = "New loan application assigned to you.",
                        SubjectBody = "New loan Application Number# ****" + model.loanappid + " has been assigned to you",
                        RouteUrl = "loanApplication/Detail/" + model.loanappid,
                        ObjectId = model.loanappid.ToString(),
                        CreatedBy = userid,
                        UserIdList = contactList.Select(m => (string)m.Id).ToList(),
                        CompanyId = companyid,

                    };
                    await _realTimeService.SendNotification(notification);
                    result.ResponseMessage = "User  has been associated successfully.";
                    result.StatusCode = 200;
                    return Ok(result);
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Some thing went wrong, please contact site adminstrator!.";
                    return Ok(result);
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        [Authorize]
        [Route("saveAssignedSalesUserDetail")]
        public async Task<IActionResult> saveAssignedSalesUserDetail([FromBody] saveAssociateBankerModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.CompanyId = Convert.ToInt64(companyid);
                model.UserId = userid;

                var data = _loanService.saveAssignedSalesUserDetail(model);
                if (data != null)
                {
                    var contactList = JsonConvert.DeserializeObject<List<dynamic>>(model.contactids).Where(m => m.Status == 1 && m.Status == true);
     
                    if (contactList != null)
                    {
                        foreach (var item in contactList)
                        {
                            string email = item.Email;
                            string username= item.Name;
                            var callbackUrl1 = _config.GetSection("CommonSettings")["SiteLink"];
                              
                            Hashtable htbl = new Hashtable();
                                htbl["@link"] = $"<a href='{callbackUrl1}'>Click here</a>";
                                htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                                htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                                htbl["@year"] = DateTime.Parse(DateTime.Now.ToString()).Year.ToString();
                                htbl["@applicantName"] = model.ApplicantName;
                                htbl["@applicationNumber"] = model.ApplicationNumber;
                                htbl["@userName"] = username;
                                if (companyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                                else if (companyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                                else if (companyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                                else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                                await _emailSettingsService.SendEmailForAssignedMutipleUser(email, htbl, "Email", $"Email", userid, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["ApplicationAssignedToUser"], "ApplicationAssignedToUser", companyID.ToString());
                            }
                        
                    }

                    var notification = new NotificationSendModel()
                    {
                        CcUser = contactList.Select(m => (string)m.UserId).ToArray(),
                        Subject = "Assigned",
                       // SubjectBody = "New loan application assigned to you.",
                        SubjectBody = "New loan Application Number# ****" + model.loanappid + " has been assigned to you",
                        RouteUrl = "loanApplication/Detail/" + model.loanappid,
                        ObjectId = model.loanappid.ToString(),
                        CreatedBy = userid,
                        UserIdList = contactList.Select(m => (string)m.UserId).ToList(),
                        CompanyId = companyid,

                    };
                    if(model.Type == "Dealer") {
                        result.ResponseMessage = "User  has been associated successfully.";
                        result.StatusCode = 200;
                        return Ok(result);
                    }
                    else {
                    await _realTimeService.SendNotification(notification);
                        result.ResponseMessage = "User  has been associated successfully.";
                        result.StatusCode = 200;
                        return Ok(result);
                    }
               
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Some thing went wrong, please contact site adminstrator!.";
                    return Ok(result);
                }
            }
            catch (Exception Ex)
            {

                throw;
            }
        }


        [HttpPost]
        [Authorize]
        [Route("saveAssignedApplicationToDealer")]
        public async Task<IActionResult> saveAssignedApplicationToDealer([FromBody] saveAssignedApplicationToDealer model)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();
                string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.companyId = Convert.ToInt64(companyid);

                var data = _loanService.saveAssignedApplicationToDealer(model);
                if (data != null)
                {
                    List<string> userIds = new List<string>();
                    dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(Convert.ToString(model.loanappid), companyid.ToString(), "TransferLoanApp");
                    string strUserTo = string.Empty;
                    string strCcUser = string.Empty;
                    string strEmailSubject = "Loan Application Transfer";
                    string strBodyContent = "A new loan Application Number# ****" + Convert.ToString(model.loanappid) + " has been transferred to you.";

                    if (userDET.Count > 0)
                    {
                        foreach (var usrVal in userDET)
                        {
                            userIds.Add(usrVal.Id);
                            if (string.IsNullOrEmpty(strUserTo))
                            {
                                strUserTo = usrVal.Id;
                                strCcUser = usrVal.Id;
                            }
                            else
                            {
                                strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                            }

                            if (usrVal.EmailNotification == true)
                            {
                                emaildata1 = new emailDataModel();
                                emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                emaildata1.email = usrVal.Email;
                                emaildata.Add(emaildata1);
                            }
                        }

                        var notification = new NotificationSendModel
                        {
                            ToUser = null,
                            CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                            Subject = strEmailSubject,
                            SubjectBody = strBodyContent,
                            RouteUrl = "loanApplication/Detail/" + Convert.ToString(model.loanappid),
                            ObjectId = Convert.ToString(model.loanappid),
                            CreatedBy = model.UserId.ToString(),
                            UserIdList = userIds,
                            CompanyId = Convert.ToString(companyID),

                        };
                        await _realTimeService.SendNotification(notification);
                    }
                    try
                    {
                        if (emaildata != null)
                        {
                            Hashtable htbl = new Hashtable();
                            await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, strEmailSubject, strBodyContent, Convert.ToString(model.loanappid), Guid.Parse(model.UserId.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyID.ToString(),0,UserName);
                        }
                    }
                    catch
                    {
                        HttpContext.Session.Clear();
                    }

                    result.ResponseMessage = "Loan application transfer has been transferred successfully.";
                    result.StatusCode = 200;
                    return Ok(result);
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Some thing went wrong, please contact site adminstrator!.";
                    return Ok(result);
                }
            }
            catch (Exception Ex)
            {

                throw;
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetLoanApplicationSales_Rep")]
        public IActionResult GetLoanApplicationSales_Rep(long applicationid)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.GetLoanApplicationSales_Rep(userid, CompanyID, applicationid);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetLoanapplicationDocumentType")]
        public List<LoanapplicationDocumentTypeModel> GetLoanapplicationDocumentType(string id)
        {
            try
            {

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

                List<LoanapplicationDocumentTypeModel> lstDocumentType = new List<LoanapplicationDocumentTypeModel>();
                lstDocumentType = _loanService.GetLoanapplicationDocumentType(userid, companyid, id);
                if (lstDocumentType != null)
                {
                    return lstDocumentType;
                }
                else
                {
                    return new List<LoanapplicationDocumentTypeModel>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetLoanapplicationDocumentTypeforcust")]
        public List<LoanapplicationDocumentTypeModel> GetLoanapplicationDocumentTypeforcust(string id)
        {
            try
            {

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

                List<LoanapplicationDocumentTypeModel> lstDocumentType = new List<LoanapplicationDocumentTypeModel>();
                lstDocumentType = _loanService.GetLoanapplicationDocumentType(userid, companyid, id);
                if (lstDocumentType != null)
                {
                    return lstDocumentType;
                }
                else
                {
                    return new List<LoanapplicationDocumentTypeModel>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetDecryptid")]
        public long GetDecryptid(string encryptid)
        {
            return BitConverter.ToInt32(Convert.FromBase64String(encryptid + "=="), 0);
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetCanceledLoanApplicationList")]
        public IActionResult GetCanceledLoanApplicationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long batchid)
        {
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

                var lst = _loanService.GetCanceledLoanApplicationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, batchid);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetStateManagementList")]
        public IActionResult GetStateManagementList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _loanService.GetStateManagementList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }

        [HttpGet]
        [Authorize]
        [Route("UpdateOverRide")]
        public IActionResult UpdateOverRide(long loanId)
        {
            try
            {
                ResultResponseModel result = new ResultResponseModel();
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _loanService.UpdateOverRide(userid, CompanyID, loanId);
                if (data != null)
                {
                  
                    result.ResponseMessage = "Success.";
                    result.StatusCode = 200;
                    return Ok(result);
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Some thing went wrong, please contact site adminstrator!.";
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SaveStagesFromSolgen")]
        public IActionResult SaveStagesFromSolgen([FromBody] savesubstagemodel Model)
        {
            ResultResponseModel result = new ResultResponseModel();
            Model.userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            Model.companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data2 = _loanService.SaveStagesFromSolgen(Model);

                result.ResponseMessage = "Stages has been added successfully.";

                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpGet]
        [Authorize]
        [Route("UpdateDenyReson")]
        public IActionResult UpdateDenyReson(long loanId,string type, string denyReason)
        {
            try
            {
                ResultResponseModel result = new ResultResponseModel();
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _loanService.UpdateDenyReson(userid, CompanyID, loanId, type, denyReason);
                if (data != null)
                {
                    if (type == "NTP") { 
                    result.ResponseMessage = "NTP deny reason has been updated successfully.";
                    }
                    else
                    {
                        result.ResponseMessage = "Bank deny reason has been updated successfully.";
                    }
                    result.StatusCode = 200;
                    return Ok(result);
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Some thing went wrong, please contact site adminstrator!.";
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [AuthorizeFilter]
        [Route("GetNewLoanApplicationList")]
        public async Task<IActionResult> GetNewLoanApplicationList(string name, string sortColumn, string sortOrder, int pageIndex, int pageSize, string type, string custom_view_id, long batchid,string listType)
        {
            try
            {

                Guid? userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = await _loanService.GetNewLoanApplicationList(name, sortColumn, sortOrder, pageIndex, pageSize, type, custom_view_id, userid, CompanyID, batchid, listType);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetFailedApplicationsForEmail")]
        public async Task<IActionResult> GetFailedApplicationsForEmail()
        {
            try
            {
                var data = await _loanService.GetFailedApplicationsForEmail();

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting failed applications for scheduler",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("SaveScheduledEmails")]
        public async Task<IActionResult> SaveScheduledEmails([FromBody] string loanhomiScheduledEmails)
        {
            try
            {
                var data = await _loanService.SaveScheduledEmails(loanhomiScheduledEmails);

                if (data == null)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception adding scheduled emails from scheduler",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetScheduledEmails")]
        public async Task<IActionResult> GetScheduledEmails(DateTime? filterDate, string sortColumn, string sortDir, int currentPage, int pageSizeValue)
        {
            try
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _loanService.GetScheduledEmails(filterDate, sortColumn, sortDir, currentPage, pageSizeValue, companyId);

                if (data == null)
                {
                    return BadRequest();
                }

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting failed applications for front end",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetScheduledEmailsForScheduler")]
        public async Task<IActionResult> GetScheduledEmailsForScheduler()
        {
            try
            {
                var data = await _loanService.GetScheduledEmailsForScheduler();

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting scheduled emails for scheduler",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("UpdateScheduledEmails")]
        public async Task<IActionResult> UpdateScheduledEmails([FromBody] string loanhomiScheduledEmails)
        {
            try
            {
                var data = await _loanService.UpdateScheduledEmails(loanhomiScheduledEmails);

                if (data == null)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting updating scheduled emails from scheduler",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetCompletedLoanApplicationList")]
        public IActionResult CompletedLoanApplicationLis(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, long batchid)
        {
            try
            {
                Guid? userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.getCompletedApplicationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, companyId, batchid);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetApplicationsWithPendingDocuments")]
        public async Task<IActionResult> GetApplicationsWithPendingDocuments()
        {
            try
            {
                var data = await _loanService.GetApplicationsWithPendingDocuments();

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting applications with pending documents for scheduler",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }



        [HttpGet]
        [AllowAnonymous]
        [Route("GetScheduledNotificationForScheduler")]
        public async Task<IActionResult> GetScheduledNotificationForScheduler()
        {
            try
            {
                ResultResponseModel result = new ResultResponseModel();
                var data =  _loanService.GetScheduledNotificationForScheduler();


              
                if (data != null)
                {

                   foreach (var item in data)
                        {
                        List<string> USERS = new List<string>();
                        USERS.Add(item.UserId);
                        var notification = new NotificationSendModel()
                            {
                          
                                CcUser = item.UserId.Split(','),
                                Subject = "Reminder Notification",
                                SubjectBody = "NTP is not submitted yet for Application Number# ****" + item.LoanApplicationId.ToString(),
                                RouteUrl = "loanApplication/Detail/" + item.LoanApplicationId.ToString(),
                                ObjectId = item.LoanApplicationId.ToString(),
                                CreatedBy = item.UserId,
                                UserIdList = USERS,
                                CompanyId = item.CompanyId.ToString(),
                            };

                            await _realTimeService.SendNotification(notification);

                        }
                }


                if (data == null)
                {
                    return BadRequest();
                }
                result.ResponseMessage = "Loan application has been cancelled successfully.";
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting data for send notification scheduler",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetFileUploadSource")]
        public IActionResult GetFileUploadSource(string file)
        {
            var imageLink = "";
            if (file != null && file != "")
            {
                imageLink = CommonFunctions.GetFileLink(file, "image", enumFileFolder.changeOrderDocument);

                if (imageLink.Contains("defaultNoImage"))
                {
                    imageLink = "javascript:void(0);";

                }
                else
                {

                    imageLink = imageLink.Replace("wwwroot", "");
                }
            }
            else
            {
                imageLink = "";
            }

            return Ok(imageLink);
        }



        [HttpGet]
        [Authorize]
        [Route("GetFileSource")]
        public async Task<IActionResult> GetFileSource(long loanid, string type="")
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var imageLink = await _loanService.GetFileSource(Guid.Parse(userid), Convert.ToInt64(companyid), loanid, type);

            return Ok(imageLink);
        }


        [HttpGet]
        [Authorize]
        [Route("GetChangeOrderInfoById")]
        public async Task<IActionResult> GetChangeOrderInfoById(long applicationid)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetChangeOrderInfoById(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        public void SendSms(string PhoneNumber,long? ref_id,string ref_code,long? companyId,Guid? userId,string type="",string body="",string applicantName="")
        {
            try
            {
                var accountSid = CommonSettings.AppSetting["CommonSettings:AccountSid"];
                var authToken = CommonSettings.AppSetting["CommonSettings:AuthToken"];
                var MessagingServiceSid = CommonSettings.AppSetting["CommonSettings:MessagingServiceSid"];
                var twillioNumber = CommonSettings.AppSetting["CommonSettings:TwillioPhoneNumber"];
                string twilioMsgFromMobile = CommonSettings.AppSetting["CommonSettings:TwilioMsgFromMobile"];
                string twilioMsg = "";
                if (type == "ShareLink")
                {
                    twilioMsg = "Dear "+ applicantName +", "+ CommonSettings.AppSetting["CommonSettings:TwilioMsgFromMobile"] +" "+ body + ' ' + CommonSettings.AppSetting["CommonSettings:TwilioMsgFromMobileAfterLink"];
                }
                else {
                    twilioMsg = CommonSettings.AppSetting["CommonSettings:TwilioMsg"];
                }
                /*
                TwilioClient.Init(
                    Environment.GetEnvironmentVariable(accountSid),
                    Environment.GetEnvironmentVariable(authToken)
                    );
                */

                TwilioClient.Init(accountSid, authToken);
                //var to = new PhoneNumber("+16506660036");
                var to = new Twilio.Types.PhoneNumber(PhoneNumber);
                var from = new Twilio.Types.PhoneNumber(twillioNumber);

                var message = MessageResource.Create(
                    to: to,
                    from: from,
                    messagingServiceSid: MessagingServiceSid,
                    body: twilioMsg);

                var status = message.Status.ToString();

                var data = this._commonService.SaveSMSResponse(message.To.ToString(), accountSid, message.ApiVersion, status, message.Sid, message.MessagingServiceSid, from.ToString(), message.Sid, message.Status.ToString(), message.Body, message.DateCreated, "OutBound", ref_id, ref_code, companyId, userId);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting data for send sms",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                //return BadRequest(ex.Message);
            }
            //return Content(message.Sid + " Status " + message.Status);
        }

        [HttpPost]
        [Route("GetSMSResponse")]
        public ActionResult GetSMSResponse(string To, string AccountSid, string ApiVersion, string MessageStatus, string SmsSid, string MessagingServiceSid, string From, string MessageSid, string SmsStatus)
        {
            try
            {
                var data = this._commonService.SaveSMSResponse(To, AccountSid, ApiVersion, MessageStatus, SmsSid, MessagingServiceSid, From, MessageSid, SmsStatus, null, null, "OutBound",null,null,null,Guid.Empty);
            }

            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting data for sms response",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
            }

            return Content("Handled");

        }

        [HttpGet]
        [Route("GetReceiveSMSResponse")]
        public ActionResult GetReceiveSMSResponse(string ToCountry, string ToState, string SmsMessageSid, string NumMedia, string ToCity, string FromZip, string SmsSid, string FromState, string SmsStatus, string FromCity
        , string Body, string FromCountry, string To, string MessagingServiceSid, string ToZip, string NumSegments, string MessageSid, string AccountSid, string From, string ApiVersion)
        {
            try
            {
                var data = this._commonService.SaveReceiveSMSResponse(ToCountry, ToState, SmsMessageSid, NumMedia, ToCity, FromZip, SmsSid, FromState, SmsStatus, FromCity
                           , Body, FromCountry, To, MessagingServiceSid, ToZip, NumSegments, MessageSid, AccountSid, From, ApiVersion, "InBound");
            }

            catch (Exception ex){
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting data for receive sms response",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
            }
            
            return Content("");           //Trace.WriteLine(logMessage);

        }



        [HttpGet]
        [Route("GetFallBackURLResponse")]
        public void GetFallBackURLResponse(string ErrorCode, string ErrorURL)
        {
           
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting data for receive sms response",
                    LogLongMessage = ErrorCode,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = ErrorURL,
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
        }


        [HttpGet]
        [Authorize]
        [Route("GetTwilioSMSDetail")]
        public async Task<IActionResult> GetTwilioSMSDetail(long applicationid, string borrowerNumber)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _loanService.GetTwilioSMSDetail(Guid.Parse(userid), Convert.ToInt64(companyid), applicationid, borrowerNumber);

                if (result == null)
                    return BadRequest();

                string prepareResult = string.Concat("[", result, "]");
                return Content(prepareResult, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("SwapApplicants/{loanApplicationId}")]
        public async Task<IActionResult> SwapApplicants(long loanApplicationId)
        {
            try
            {
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var result = await _loanService.SwapApplicants(loanApplicationId, CompanyID);

                return Ok(result);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception swapping applicants for Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("SavePropertySearch")]
        public IActionResult SavePropertySearch(string firstName , string middelName, string lastName, string streetname, string city, string stateCode)
        {
            //var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            //var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            //var result = _commonService.GetFormFields(companyid, userId, moduleName, userid, strType, search, isFor, isRef, PrimaryId, displayCode);
            //if (result == null)
            //    return BadRequest();
            try
            {
                HttpClient httpClient = new HttpClient();



                httpClient.DefaultRequestHeaders.Add("apikey", "85a9a411fbe0c039e8b53659b2ccf23d");
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string param = null;
                if (!string.IsNullOrEmpty(streetname))
                    param = "address1=" + streetname;
                if (!string.IsNullOrEmpty(city) && !string.IsNullOrEmpty(stateCode))
                    param += "&address2=" + city +"," + stateCode;

                string url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detailowner";

                HttpResponseMessage Response = httpClient.GetAsync(url + "?" + param).Result;

                Propertydetail.Root calldata = JsonConvert.DeserializeObject<Propertydetail.Root>(Response.Content.ReadAsStringAsync().Result);
                Propertydetail.Owner1 ow = new Propertydetail.Owner1();

                if (calldata.property != null)
                {
                    foreach (var item in calldata.property)
                    {
                        if (item.owner.owner1 != null)
                        {
                            if (item.owner.owner1.lastname != null)
                                ow.lastname = item.owner.owner1.lastname;
                            if (item.owner.owner1.firstnameandmi != null)
                                ow.firstnameandmi = item.owner.owner1.firstnameandmi;
                        }
                    }
                }

                string fmname = "";
                //if (!string.IsNullOrEmpty(mname))
                fmname = firstName + " " + middelName;
                // else
                //fmname = fname;

                ow.Name = fmname;
                ow.LName = lastName;

                if ((fmname.ToUpper() == ow.firstnameandmi) && (lastName.ToUpper() == ow.lastname.Replace(" ", "")))
                {
                    
                    ow.msg = "Result Matched";
                }
                else
                {

                    ow.msg = "Deed is required";
                }
                


                return Ok(ow);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }

             
        }


        [HttpGet]
        [Route("PropertySearchFM")]
        public IActionResult SearchPropertyFM(string Name, string fulladdress)
        {
            try
            {
                string ApiUrl = $"https://dtapiuat.datatree.com";
                string token = GetBearerToken();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var payload = new
                {
                    ProductNames = new string[] { "PropertyDetailReport" },
                    SearchType = "FullAddress",
                    FullAddress = fulladdress, // 10601 92nd St Court E Graham WA

                    ReferenceId = ""
                };
                var response = httpClient.PostAsJsonAsync($"{ApiUrl}/api/Report/GetReport", payload).Result;
                dynamic data = "";
                string ownerinfo = "";
                Propertydetail.Owner1 ow = new Propertydetail.Owner1();
                if (response.IsSuccessStatusCode)
                {
                    data = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);

                    //List<Report> reports = myobj.Reports;
                    if (data.Reports != null)
                    {
                        if (data.Reports[0].Data.OwnerInformation != null)
                            ownerinfo = data.Reports[0].Data.OwnerInformation.OwnerNames;
                        else
                            ownerinfo = "Result not found";
                    }
                    else if (data.LitePropertyList != null)
                    {
                        ownerinfo = data.LitePropertyList[0].Owner;
                    }

                    /*
                foreach (Report item in reports)
                {
                    item.Data.OwnerInformation.OwnerNames
                }
                    */


                    string upname = Name.ToUpper();

                    // bool v = ownerinfo.Contains(Name,StringComparison.CurrentCultureIgnoreCase);
                    if (ownerinfo.Contains(upname))
                        ow.msg = "Result Matched";

                    else
                        ow.msg = "Deed is required";

                    ow.Name = Name;
                    ow.firstnameandmi = ownerinfo;

                }

                return Ok(ow);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }

        }

        public string GetBearerToken()
        {
            string ApiUrl = $"https://dtapiuat.datatree.com";
            var payload = new
            {
                //Username = "DTAPI_LoanHomi_UAT",
                // Password = "LoanHomiDTAPI1@UAT"
                Username = "DTAPI_LoanHomi_UAT",
                Password = "LoanHomiDTAPI1@UAT"
            };
            var response = httpClient.PostAsJsonAsync($"{ApiUrl}/api/Login/Authenticate", payload).Result;

            string token = "";

            if (response.IsSuccessStatusCode)
            {
                token = response.Content.ReadAsStringAsync().Result.Trim('\"');
            }

            return token;

        }


        //----------------------LoanApplicationReport----------------------------------------

        [HttpPost]
        [Route("GetLoanApplicationReportList")]
        [Authorize]
        public async Task<IActionResult> GetLoanApplicationReportList([FromBody] RunLoanApplicationReportModel model)
        {
          
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var lst = await _loanService.GetLoanApplicationReportList(model.sortColumn, model.sortDir, model.currentPage, model.pageSizeValue, model.selecteddata, Guid.Parse(userid), companyID, model.From, model.TO, model.customWhereCondition, model.filterData);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllReportList")]
        [Authorize]
        public async Task<IActionResult> GetAllReportList(string sortColumn, string sortOrder, int pageIndex, int pageSize, string searchText, string companyType)
        {

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var lst = await _loanService.GetAllReportList(sortColumn, sortOrder, pageIndex, pageSize, searchText, Guid.Parse(userid), companyID, companyType);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetReportDataById")]
        public async Task<IActionResult> GetReportDataById(Int64 id,  string companyType)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<LoanApplicationReportFilter> lst = new List<LoanApplicationReportFilter>();
            try
            {
                lst = await _loanService.GetReportDataById(id, Guid.Parse(userid), companyID, companyType);
                Thread.Sleep(2000);
                if (lst == null)
                    return NotFound();

                return Ok(lst);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("deleteReport")]
        public async Task<IActionResult> DeleteReport(long id)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.DeleteReport(userid, companyid, id);
                if(lst != null)
                { 
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
                }
                else { 
                    result.ResponseMessage = "Error";
                result.StatusCode = (int)HttpStatusCode.OK;
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Route("GetAssignedApplication")]
        [HttpGet]
        [Authorize]
        public IActionResult GetAssignedApplication(string value, string sortColumn, string sortDir, int page, int pageSize)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

            var list = _loanService.GetAssignedApplication(value, sortColumn, sortDir, page, pageSize, Guid.Parse(userid), companyid);
            return Ok(list);
        }

        [HttpGet]
        [Authorize]
        [Route("TransferApplicatioto_ToUser")]
        public async Task<IActionResult> TransferApplicatioto_ToUser(string transferLoanAppId,string fromUserId, string toUserId)
        {
           
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _loanService.TransferApplicatioto_ToUser(transferLoanAppId.TrimEnd(','), fromUserId, toUserId, uid, companyID);

                //List<string> USERS = new List<string>();
                //USERS.Add(toUserId);

                //var notification = new NotificationSendModel
                //{
                //    ToUser = null,
                //    CcUser = (string.IsNullOrEmpty(toUserId)) ? null : toUserId.Split(','),
                //    Subject = "Transfer Loan Application",
                //    SubjectBody = "Loan Application has been transfered to you.",
                //    RouteUrl = "loanApplication",
                //    ObjectId = (string.IsNullOrEmpty(transferLoanAppId)) ? null : transferLoanAppId,
                //    CreatedBy = uid.ToString(),
                //    UserIdList = USERS,
                //    CompanyId = Convert.ToString(CompanyID),

                //};
                //await _realTimeService.SendNotification(notification);

                return Ok(lst);
            }
            catch (Exception ex)
            {

                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception Tranfer Loan Application {transferLoanAppId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
                
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetTransferLoanApplicationList")]
        public IActionResult GetTransferLoanApplicationList(long applicationid, string sortColumn, string sortDir, int pageNumber, int pageSizeValue)
        {
            try
            {
                string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanService.GetTransferLoanApplicationList(applicationid, userid, CompanyID, sortDir, sortColumn, pageNumber, pageSizeValue);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        public async Task<int> CreatePDF(string data, string path)
        {
            try
            {
                //Create a PDF document instance

                PdfDocument document = new PdfDocument();

                //Add page to the document

                PdfPage page = document.Pages.Add();

                PdfGraphics graphics = page.Graphics;

                //Read the long text from the text file.



                const int paragraphGap = 10;


                //Create a text element with the text and font

                PdfTextElement textElement = new PdfTextElement(data, new PdfStandardFont(PdfFontFamily.Helvetica, 12));

                PdfLayoutFormat layoutFormat = new PdfLayoutFormat();

                layoutFormat.Layout = PdfLayoutType.Paginate;

                layoutFormat.Break = PdfLayoutBreakType.FitPage;

                //Draw the first paragraph

                PdfLayoutResult result = textElement.Draw(page, new RectangleF(0, 0, page.GetClientSize().Width, page.GetClientSize().Height), layoutFormat);

                //Draw the second paragraph from the first paragraph end position

                // result = textElement.Draw(page, new RectangleF(0, result.Bounds.Bottom + paragraphGap, page.GetClientSize().Width / 2, page.GetClientSize().Height), layoutFormat);

                //Creating the stream object

                MemoryStream stream = new MemoryStream();

                //Save the document into memory stream

                document.Save(stream);

                //If the position is not set to '0' then the PDF will be empty.

                stream.Position = 0;

                //Close the document.

                document.Close(true);


                //Creates a FileContentResult object by using the file contents, content type, and file name.


                using (FileStream outputFileStream = new FileStream(path, FileMode.Create))
                {
                    stream.CopyTo(outputFileStream);
                }

                return 1;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception occured during CreatePDF using Syncfusion",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return 0;
            }

        }


        [HttpGet]
        [Route("GetFilterValueDll")]
        public List<MasterItems> GetFilterValueDll(string id, int length, string serchText, string filterFieldName)
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if (id == "null")
            { id = "0"; }

            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _loanService.GetFilterValueDll(userid, companyid, id, length, serchText, filterFieldName);

                if (data != null)
                {
                    return data;
                }
                else
                {
                    return new List<MasterItems>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("GetGraphVisualizationReportData")]
        [Authorize]
        public async Task<IActionResult> GetGraphVisualizationReportData([FromBody] RunLoanApplicationReportModel model)
        {

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var lst = await _loanService.GetGraphVisualizationReportData(model.selecteddata, Guid.Parse(userid), companyID, model.From, model.TO, model.customWhereCondition, model.filterData, model.groupByFieldId);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [Route("GetSFTPLogList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetSFTPLogList(string applicationNumber, string sortColumn, string sortDir, int page, int pageSize)
        {
            Guid userId = Guid.Empty;
            userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

            return Ok(_loanService.GetSFTPLogList(applicationNumber, sortColumn, sortDir, page, pageSize, userId, companyID));
        }




    }
}
