using DocuSign.eSign.Api;
using DocuSign.eSign.Client;
using DocuSign.eSign.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Lease")]
    public class LeaseController : Controller
    {
        private readonly ILeaseService _leaseService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _config;
        private readonly IEmailSettingsService _emailSettingsService;
        public IHostingEnvironment Environment { get; }
        public LeaseController(ILeaseService leaseService, ICommonService commonService
            , IHttpContextAccessor httpContext
            , IConfiguration config
            , IHostingEnvironment environment
              , IEmailSettingsService emailSettingsService
            )
        {
            _leaseService = leaseService;
            this._commonService = commonService;
            _httpContext = httpContext;
            _emailSettingsService = emailSettingsService;
            _config = config;
            Environment = environment;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }


        [HttpGet]
        [Authorize]
        [Route("GetLeaseRequestList")]
        /*! 
        * \brief   Get the Lese Request List
        * \details Function is used to fetch the list of Perposal Request
        * \author  Surendra Maurya 
        * \date    14 Nov 2019
        * \version 1.0    
        */
        public IActionResult GetLeaseRequestList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {

            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetLeaseRequestList(searchText, sortColumn, sortDir, pageIndex, pageSize, uid, CompanyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetLeaseList")]
        /*! 
        * \brief   Get the Lese List
        * \details Function is used to fetch the list of Lease
        * \author  Kiran Bala 
        * \date    27 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetLeaseList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetLeaseList(searchText, leaseStatus, saleMan, expFrom, expTo, commFrom, commTo, sortColumn, sortDir, pageIndex, pageSize, uid, isDashboard, contactId, CompanyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GenPDF")]
        /*! 
        * \brief   generate pdf
        * \details function is used to generate pdf for lease
        * \author  Dheeraj 
        * \date    24 Oct 2019
        * \version 1.0    
        */
        public IActionResult GenPDF(Guid id)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetLeaseDetail(id);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }
        public static Decimal IsEmpty(Decimal value)
        {
            if (value == null || value == 0)
            {
                value = Convert.ToDecimal("0.00");
            }
            return value;
        }
        [HttpPost]
        [Authorize]
        /*! 
       * \brief   Add update lease
       * \details function is used to  Add update lease
       * \author  Vikrant verma 
       * \date    24 Oct 2019
       * \version 1.0    
       */
        public IActionResult Post([FromBody] LeaseAddOrUpdateModel leaseAddOrUpdateModel, Guid? oldleasebank, bool IsApprovedForPurchase, string nameOfBusiness, string bankName)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            leaseAddOrUpdateModel.LeaseAdditions2 = IsEmpty(Convert.ToDecimal(leaseAddOrUpdateModel.LeaseAdditions2));
            leaseAddOrUpdateModel.LeaseAdditions1 = IsEmpty(Convert.ToDecimal(leaseAddOrUpdateModel.LeaseAdditions1));
            leaseAddOrUpdateModel.LeaseSalesTax = IsEmpty(Convert.ToDecimal(leaseAddOrUpdateModel.LeaseSalesTax));
            leaseAddOrUpdateModel.LeaseWarranty = IsEmpty(Convert.ToDecimal(leaseAddOrUpdateModel.LeaseWarranty));
            leaseAddOrUpdateModel.LeaseOther = IsEmpty(Convert.ToDecimal(leaseAddOrUpdateModel.LeaseOther));
            if (leaseAddOrUpdateModel != null)
            {
                leaseAddOrUpdateModel.LeaseUCCFillingDocument = Path.GetFileName(leaseAddOrUpdateModel.LeaseUCCFillingDocument);
            }
            if (leaseAddOrUpdateModel == null)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please contact site adminsitrator.";
                return Ok(responseModel);
            }

            leaseAddOrUpdateModel.LeaseCreatedBy = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID").Value);
            leaseAddOrUpdateModel.CompanyID = CompanyID;
            var record = _leaseService.AddOrUpdateLease(leaseAddOrUpdateModel, IsApprovedForPurchase, CompanyID);
            // if (record == Guid.Empty || record == null)
            if (record == "")
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please contact site adminsitrator.";
                return Ok(responseModel);
            }
            if (leaseAddOrUpdateModel.LeaseAdditions2 == null)
            {
                leaseAddOrUpdateModel.LeaseAdditions2 = Convert.ToDecimal("0.00");
            }
            string contactid = Convert.ToString(leaseAddOrUpdateModel.LeaseContactId);//send costomerid for notificationusertype=CustomerUser
            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
            // enumNotificationUserType.BankUser.ToEnumString()  --- kiran 27 nov-- no need to send notification to bank user untill selected from dropdown

            var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "account";
            if (IsApprovedForPurchase)
            {//if  click on Approved for Purchase by bank user
             //send notification to bank user too

                var emailIds = _leaseService.ApprovedByBank(leaseAddOrUpdateModel, IsApprovedForPurchase);

                responseModel.StatusCode = 200;
                responseModel.ResponseMessage = "Proposal #" + record + " has been approved for purchase successfully";
                //  responseModel.Result = record;
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "Approved For Purchase", " has approved <b>" + nameOfBusiness + "</b>'s Proposal <b>#" + record + "</b> for Purchase");
                _commonService.AddNotification("Proposal <b>#" + record + "</b> Approved for Purchase", "<b>" + nameOfBusiness + "</b>" + "'s Proposal <b>#" + record + "</b> has been approved for Purchase by "
                    + "<b>" + bankName + "</b>", userid, contactid, enumNotificationType.LeaseApproveForPurchase.ToEnumString(), notificationToUser + "," + enumNotificationUserType.BankUser.ToEnumString(), userid, record, "Proposal");


                Hashtable htbl = new Hashtable();
                htbl["@BankUserName"] = name;
                htbl["@LeaseNumber"] = "#<b>" + record + "</b>";
                htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                htbl["@BusinessName"] = nameOfBusiness;
                htbl["@year"] = DateTime.Now.Year.ToString();
                htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                _emailSettingsService.SendEmail(emailIds, htbl, "Proposal Approved For Purchase", $"Proposal Approved For Purchase for Perposal #" + record.ToString(), record, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["LeaseApprovedForPurchase"], "Lease");

            }
            else
            {//add /update
                responseModel.StatusCode = 200;
                responseModel.ResponseMessage = leaseAddOrUpdateModel.LeaseId == null ? "Proposal has been added successfully." : "Proposal has been updated successfully.";
                responseModel.Result = record;
                if (leaseAddOrUpdateModel.LeaseId == null)
                {//add
                    _commonService.AddNotification("Proposal <b>#" + record + "</b> Added", "@contactbusinessname 's Proposal <b>#" + record + "</b> has been added by " + name, userid, contactid,
                          enumNotificationType.LeaseAdded.ToEnumString(), notificationToUser, userid, record, "Lease");
                    if (leaseAddOrUpdateModel.LeaseAssignedBankId != oldleasebank)
                    {
                        _commonService.AddNotification("Proposal Created", "One Proposal has been created by " + name + " for you. We will send for your approval soon. ", userid, userid,
                             enumNotificationType.LeaseAdded.ToEnumString(), enumNotificationUserType.BankUser.ToEnumString(), userid, record, "Lease");
                    }
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToEnumString(), " has Added new Perposal #" + record);
                }
                else
                {
                    if (leaseAddOrUpdateModel.LeaseAssignedBankId != oldleasebank)
                    {
                        _commonService.AddNotification("Proposal Created", "One Proposal has been created by " + name + " for you. We will send for your approval soon. ", userid, userid,
                             enumNotificationType.LeaseAdded.ToEnumString(), enumNotificationUserType.BankUser.ToEnumString(), userid, record, "Lease");
                    }
                    else
                    {//upate -- send notification to bank user if already assigned
                        notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
                    }


                    _commonService.AddNotification("Proposal <b>#" + record + "</b> Updated", "@contactbusinessname 's Proposal <b>#" + record + "</b> has been updated by " + name, userid, contactid,
                            enumNotificationType.LeaseUpdated.ToEnumString(), notificationToUser, userid, record, "Lease");

                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToEnumString(), " has Updated the Proposal #" + record);
                }
            }
            return Ok(responseModel);
        }

        /*! 
         *  \brief    Delete Lease.
        *  \details   This API is used to delete Lease.
        *  \author    Kiran Bala
        *  \version   1.0
        *  \date      3 oct 2019
        */
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
                + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
                + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            DeleteLeaseModel effectedRow = _leaseService.DeleteLease(id);
            var contactId = effectedRow.LeaseContactId;
            var LeaseNumber = effectedRow.LeaseNumber;

            if (effectedRow == null)
            {
                throw new Exception("Unable to delete this record.");
            }
            if (effectedRow.LeaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
            }
            _commonService.AddNotification("Proposal <b>#" + LeaseNumber + "</b> Deleted", "Proposal <b>#" + LeaseNumber + "</b> has been deleted by " + name, userid, contactId.ToString(),
                        enumNotificationType.LeaseDeleted.ToEnumString(), notificationToUser, userid, LeaseNumber, "Lease");

            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToEnumString(), " has deleted Proposal #" + LeaseNumber);
            result.ResponseMessage = "Success";
            result.StatusCode = 200;

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteLeaseRequest")]
        /*! 
       * \brief   Delete Proposal Request
       * \details function is used to   Delete Proposal Request
       * \author  Deepak jha 
       * \date    24 Nov 2019
       * \version 1.0    
       */
        public IActionResult DeleteLeaseRequest(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();



            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;

            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
                + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
                + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            int effectedRow = _leaseService.DeleteLeaseRequest(id);
            if (effectedRow == 0)
            {
                throw new Exception("Unable to delete this record.");
            }

            _commonService.AddNotification("Proposal Request Deleted", "Proposal Request has been deleted by " + name, userid, userid,
                enumNotificationType.LEASEREQUESTDELETED.ToEnumString(), notificationToUser, userid);
            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has deleted Proposal Request");
            result.ResponseMessage = "Success";
            result.StatusCode = 200;

            return Ok(result);
        }
        /*! 
      * \brief   get detail from lease
      * \details Function is used to get the detail of Proposal basis of leaseid.
      * \author  deepak jha 
      * \date    2 octber 2019
      * \version 1.0    
      */
        [HttpGet]
        [Authorize]
        public IActionResult Get(Guid leaseid, Boolean isBankUser)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var leaseDetail = _leaseService.GetLeaseDetail(leaseid, uid, true);
            if (leaseDetail.LenderName == null || leaseDetail.LenderName == "" && isBankUser == true)
            {
                leaseDetail.LenderName = User.Claims.FirstOrDefault(x => x.Type == "Name").Value;
            }

            if (leaseDetail == null)
            {
                return BadRequest();
            }

            leaseDetail.LeaseUCCFillingDocumentLink = CommonFunctions.GetFileLink(leaseDetail.LeaseUCCFillingDocument, "image", enumFileFolder.leasedocpdf);
            leaseDetail.LeasePDFDocumentNameLink = CommonFunctions.GetFileLink(leaseDetail.LeasePDFDocumentName, "pdf", enumFileFolder.leasedocpdf);
            leaseDetail.LeasePDFDocumentNameLink = leaseDetail.LeasePDFDocumentNameLink.Replace("wwwroot", "");
            if (leaseDetail.LeaseUCCFillingDocumentLink.Contains("defaultNoImage"))
            {
                leaseDetail.LeaseUCCFillingDocumentLink = "javascript:void(0);";
                leaseDetail.LeaseUCCFillingDocument = "";
            }
            else
            {
                leaseDetail.LeaseUCCFillingDocumentLink = leaseDetail.LeaseUCCFillingDocumentLink.Replace("wwwroot", "");
            }
            return Ok(leaseDetail);
        }
        /*! 
      * \brief   get detail from weight signature by Proposal id
      * \details Function is used to get weight signature detail basis of Proposal id .
      * \author  deepak jha 
      * \date    2 december 2019
      * \version 1.0    
      */
        [HttpGet]
        [Authorize]
        [Route("GetLeaseDetailForWetSignature")]
        public IActionResult GetLeaseDetailForWetSignature(Guid leaseid)
        {
            ResultResponseModel result = new ResultResponseModel();
            var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var model = _leaseService.GetDocuSignDetailByLeaseId(Convert.ToString(leaseid));
            var sendToDocuSignCreatedBy = uid;
            var serverpath = "";
            string msg = "";
            if (model.IsGenerateLeaseDoc == false)
            {
                result.ResponseMessage = "Please generate Proposal Document before uploading wet signature.";
                result.StatusCode = (int)HttpStatusCode.Continue;
                return Ok(result);
            }
            else
            {
                var leaseDetail = _leaseService.GetLeaseDetail(leaseid);
                var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
                if (leaseDetail == null)
                {
                    return BadRequest();
                }

                leaseDetail.LeaseUCCFillingDocumentLink = CommonFunctions.GetFileLink(leaseDetail.LeasePDFDocumentName, "Pdf", enumFileFolder.leasedocpdf);
                leaseDetail.LeasePDFDocumentNameLink = leaseDetail.LeaseUCCFillingDocumentLink.Replace("wwwroot", "");
                if (leaseDetail.LeaseUCCFillingDocumentLink.Contains("defaultNoImage"))
                {
                    leaseDetail.LeaseUCCFillingDocumentLink = "javascript:void(0);";
                    leaseDetail.LeaseUCCFillingDocument = "";
                }
                else
                {
                    leaseDetail.LeaseUCCFillingDocumentLink = leaseDetail.LeaseUCCFillingDocumentLink.Replace("wwwroot", "");
                }
                return Ok(leaseDetail);
            }
        }
        /*! 
      * \brief   update  status for weight signature status
      * \details Function is used to update weight signature status .
      * \author  deepak jha 
      * \date    29 November 2019
      * \version 1.0    
      */
        [HttpGet]
        [Authorize]
        [Route("SendStatusForWeightSignature")]
        public IActionResult SendStatusForWeightSignature(Guid leaseid, Guid contactId, Guid leaseAssignedBankId)
        {
            Guid uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var leaseReuestDetail = _leaseService.SendStatusForWeightSignature(leaseid, uid);
            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            if (leaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
            }
            if (leaseReuestDetail != null)
            {
                _commonService.AddActivityLog(uid.ToString(), IPAddress, WebBrowser, OSWebBrowser, "Downloaded for Wet Signature", " has downloaded the Proposal Document for Wet Signature for Proposal #" + leaseReuestDetail);

                _commonService.AddNotification("Proposal #" + leaseReuestDetail.LeaseNumber + " Downloaded for Wet Signature ",
                    "Proposal Document has been downloaded for Wet Signature for Proposal #" + leaseReuestDetail.LeaseNumber + "by " + name, uid.ToString(), contactId.ToString(), enumNotificationType.DownloadToPDFWetSig.ToEnumString(), notificationToUser, uid.ToString(), leaseReuestDetail.LeaseNumber, "Lease");
            }
            return Ok(leaseReuestDetail);
        }
        [HttpGet]
        [Authorize]
        [Route("LeaseRequestByRequestId")]
        /*! 
       * \brief   Let Proposal Request
       * \details function is used to   Get Proposal Request basis of Perposal 
       * Reuest Id.
       * \author  Deepak jha 
       * \date    24 Nov 2019
       * \version 1.0    
       */
        public IActionResult LeaseRequestByRequestId(Guid leaseRequestId)
        {
            var leaseReuestDetail = _leaseService.LeaseRequestByRequestId(leaseRequestId);
            return Ok(leaseReuestDetail);
        }
        [HttpGet]
        [Authorize]
        [Route("SetMaturityDate")]
        /*! 
       * \brief   Let Proposal Maturity Date to dynamically.
       * \details function is used to    Let Proposal Maturity Date to dynamically. 
       * Reuest Id.
       * \author  Deepak jha 
       * \date    24 Nov 2019
       * \version 1.0    
       */
        public IActionResult SetMaturityDate(int month)
        {
            var date = CommonSettings.GetFormattedDateOnly(DateTime.UtcNow.AddMonths(month));
            return Ok(date);
        }

        [HttpGet]
        [Authorize]
        [Route("GetCurrentDate")]
        /*! 
       * \brief   Let Perposal Currunt Date to dynamically.
       * \details function is used to    Let Perposal Currunt Date to dynamically. 
       * Reuest Id.
       * \author  Deepak jha 
       * \date    24 Nov 2019
       * \version 1.0    
       */
        public IActionResult GetCurrentDate()
        {
            var date = CommonSettings.GetFormattedDateOnly(DateTime.UtcNow);
            return Ok(date);
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateLeaseDocument")]
        /*! 
       * \brief   Add update Perposal document.
       * \details function is used to Add update Perposal document. 
       * Reuest Id.
       * \author  Deepak jha 
       * \date    24 Nov 2019
       * \version 1.0    
       */
        public IActionResult UpdateLeaseDocument([FromForm] DocumentUploadModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var fileResult = Util.UploadFileFromBase64(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:LeaseDocument"], "UCC_Lease" + model.LeaseNumber);
            model.FileName = fileResult.Item1;
            var documentModel = _leaseService.updateLeaseDocument(model);
            return Ok(documentModel);
        }

        [HttpGet]
        [Authorize]
        [Route("GetLeaseListByStatus")]
        /*! 
        * \brief   Get the Lese List
        * \details Function is used to fetch the list of Perposal By Status
        * \author  Rahul Sharma 
        * \date    09 Oct 2019
        * \version 1.0    
        */
        public IActionResult GetLeaseListByStatus(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashboard, string contactId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetLeaseListByStatus(searchText, leaseStatus, saleMan, expFrom, expTo, commFrom, commTo, sortColumn, sortDir, pageIndex, pageSize, uid, isDashboard, contactId);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetContactDocbyLease")]
        /*! 
        * \brief   Get the Lese List
        * \details Function is used to fetch the list of Lease
        * \author  Dheeraj Patyal 
        * \date    11 Oct 2019
        * \version 1.0    
        */
        public IActionResult GetContactDocbyLease(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetContactDocbyLease(leaseId, sortColumn, sortDir, pageIndex, pageSize);
                foreach (var item in lst.Data)
                {
                    item.DocumentFileName = CommonFunctions.GetFileLink(item.DocumentFileName, "image", enumFileFolder.leasedocpdf);
                    if (item.DocumentFileName.Contains("defaultNoImage"))
                    {
                        item.DocumentFileName = "javascript:void(0);";

                    }
                    else
                    {

                        item.DocumentFileName = item.DocumentFileName.Replace("wwwroot", "");
                    }
                }
                return Ok(lst);
            }
            catch// (Exception ex)
            {

                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetleaseReviewDoc")]
        /*! 
        * \brief   Get the Lese Review List
        * \details Function is used to  Get the Lese Review List
        * \author  deepak jha. 
        * \date    11 Oct 2019
        * \version 1.0    
        */
        public IActionResult GetleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string filePath = CommonFunctions.GetFileLink("", "Image", enumFileFolder.leasedocpdf);
                var lst = _leaseService.GetleaseReviewDoc(leaseId, sortColumn, sortDir, pageIndex, pageSize);
                foreach (var item in lst.Data)
                {
                    item.DocumentFileName = CommonFunctions.GetFileLink(item.LeasePDFDocumentName, "pdf", enumFileFolder.leasedocpdf);
                    //item.DocumentFileName = CommonFunctions.GetFileLink(item.DocumentFileName, "image", enumFileFolder.leasedocpdf);
                    if (item.DocumentFileName.Contains("defaultNoImage"))
                    {
                        item.DocumentFileName = "javascript:void(0);";

                    }
                    else
                    {

                        item.DocumentFileName = item.DocumentFileName.Replace("wwwroot", "");
                    }
                }
                return Ok(lst);
            }
            catch// (Exception ex)
            {

                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetFundingPackageleaseReviewDoc")]
        /*! 
        * \brief   Get the Lese Review List
        * \details Function is used to  Get the Lese Review List
        * \author  deepak jha. 
        * \date    11 Oct 2019
        * \version 1.0    
        */
        public IActionResult GetFundingPackageleaseReviewDoc(Guid? leaseId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string filePath = CommonFunctions.GetFileLink("", "Image", enumFileFolder.leasedocpdf);
                var lst = _leaseService.GetFundingPackageleaseReviewDoc(leaseId, sortColumn, sortDir, pageIndex, pageSize);
                foreach (var item in lst.Data)
                {
                    //item.DocumentFileName = CommonFunctions.GetFileLink(item.LeasePDFDocumentName, "pdf", enumFileFolder.leasedocpdf);
                    item.DocumentFileName = CommonFunctions.GetFileLink(item.DocumentFileName, "image", enumFileFolder.leasedocpdf);
                    if (item.DocumentFileName.Contains("defaultNoImage"))
                    {
                        item.DocumentFileName = "javascript:void(0);";

                    }
                    else
                    {

                        item.DocumentFileName = item.DocumentFileName.Replace("wwwroot", "");
                    }
                }
                return Ok(lst);
            }
            catch// (Exception ex)
            {

                return BadRequest();
            }
        }
        /*! 
       * \brief   Operation user Send Perposal to bank 
       * \details Function is used to Operation user Send Perposal to bank .
       * \author  Anish 
       * \date    2 November 2019
       * \version 1.0    
       */
        [HttpPost]
        [Authorize]
        [Route("SendLeaseToBank")]
        public IActionResult SendLeaseToBank(Guid leaseId, string contactId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();

            try
            {
                bool result = false;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                var sendToBankApprovalCreatedBy = userid;
                string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

                string editLeaseLink = "";

                var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "account";

                BankApprovalModel data = SetLeaseBankApproveStatus(leaseId, 1, sendToBankApprovalCreatedBy);
                var LeaseNumber = data.LeaseNumber;
                if (data.LeaseContactId != null)
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.SendForBankApproval.ToEnumString(), " has sent the Perposal #" + LeaseNumber + " for Bank Approval");

                    //notification to all
                    result = _commonService.AddNotification("Perposal <b>#" + LeaseNumber + "</b> Sent for Bank Approval", "@contactbusinessname 's Perposal <b>#" + LeaseNumber + "</b> has been sent for Approval to @leasebankname by " + name, userid, contactId,
                        enumNotificationType.LeaseSendForBankApproval.ToEnumString(), notificationToUser, userid, leaseId.ToString(), "LeaseSendToBank");
                    if (data.LeaseAssignedBankId != null)
                    {
                        notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
                    }
                    //notification to bank user
                    editLeaseLink = CommonSettings.AppSetting["CommonSettings:SiteLink"] + "lease/editlease/" + leaseId;
                    editLeaseLink = "@contactbusinessname 's Perposal #" + LeaseNumber + " has been sent for Approval to @leasebankname by " + name + ".Please <a href=" + editLeaseLink + ">Click Here</a> to approve it.";
                    result = _commonService.AddNotification("Perposal <b>#" + LeaseNumber + "</b> Sent for Bank Approval.", editLeaseLink, userid, userid,
                     enumNotificationType.LeaseSendForBankApproval.ToEnumString(), enumNotificationUserType.BankUser.ToEnumString(), userid, leaseId.ToString(), "LeaseSendToBank");

                    Hashtable htbl = new Hashtable();
                    htbl["@OperationUserName"] = name;
                    htbl["@LeaseNumber"] = "#<b>" + data.LeaseNumber + "</b>";
                    htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                    htbl["@BusinessName"] = data.ContactbusinessName;
                    htbl["@year"] = DateTime.Now.Year.ToString();
                    htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                    htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                    htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                    _emailSettingsService.SendEmail(data.BankEmailIDs, htbl, "Perposal Approval Request", $"Perposal Approval Request for Perposal #" + data.LeaseNumber.ToString(), data.LeaseNumber, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["LeaseApprovalRequest"], "Lease");

                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Perposal has been send to bank Approval successfully";
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. PPerposal try again later.";
                }
                return Ok(responseModel);
            }
            catch// (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. PPerposal try again later.";
                return BadRequest();
            }
        }
        /*! 
       * \brief   Operation user Send funding package to package 
       * \details Function is used to Operation user Send funding package to package for bank user.
       * \author  deepak jha
       * \date    2 November 2019
       * \version 1.0    
       */
        [HttpPost]
        [Authorize]
        [Route("SendFundingPackageToBank")]
        public IActionResult SendFundingPackageToBank(Guid leaseId, string contactId, Guid LeaseAssignedBankId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                bool result = false;
                if (leaseId != null)
                {
                    var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                    var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                    var sendToBankApprovalCreatedBy = userid;
                    string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
                    var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "account";
                    if (LeaseAssignedBankId != null)
                    {
                        notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
                    }

                    SendFundingBankApprovalModel data = SetLeaseFundingPackageToBankStatus(leaseId, 1, sendToBankApprovalCreatedBy);
                    var LeaseNumber = data.LeaseNumber;
                    var BankName = data.BankName;
                    if (data != null)
                    {
                        _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "Perposal #" + LeaseNumber + " sent for Funding Package to Bank", " has sent the Perposal #" + LeaseNumber + " for Funding Package to Bank");
                        //notification to all
                        result = _commonService.AddNotification("Perposal <b>#" + LeaseNumber + "</b> sent for Funding Package to Bank", "@contactbusinessname 's Perposal <b>#" + LeaseNumber + "</b> has been sent for Funding Package to @leasebankname by " + name, userid, contactId, enumNotificationType.LeaseSendFundingPackageToBank.ToEnumString(), notificationToUser, userid, LeaseNumber, "Lease");

                        Hashtable htbl = new Hashtable();
                        htbl["@OperationUserName"] = name;
                        htbl["@LeaseNumber"] = "#<b>" + data.LeaseNumber + "</b>";
                        htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                        htbl["@BusinessName"] = data.ContactbusinessName;
                        htbl["@year"] = DateTime.Now.Year.ToString();
                        htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                        htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                        htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                        _emailSettingsService.SendEmail(data.BankEmailIDs, htbl, "Perposal Funding Package Request", $"Perposal Funding Package Request #" + data.LeaseNumber.ToString(), data.LeaseNumber, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["LeaseFundingPackageRequest"], "Lease");

                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Perposal sent for Funding Package to " + BankName;
                    }
                    else
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                    }
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

        [HttpGet]
        [Authorize]
        [Route("GetvendorTitleRequestByLeaseId")]
        public IActionResult GetvendorTitleRequestByLeaseId(Guid LeaseId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var sendToBankApprovalCreatedBy = userid;
            var data = SetTitleWorkRequest(LeaseId, sendToBankApprovalCreatedBy);
            responseModel.StatusCode = 206;
            responseModel.ResponseMessage = "";
            return Ok(responseModel);
        }
        /*! 
       * \brief   Title Work Request in Perposal document 
       * \details Function is used to Title Work Request in operation user popup window data
       * \author  deepak jha
       * \date    2 November 2019
       * \version 1.0    
       */
        [HttpPost]
        [Authorize]
        [Route("sendTitleWorkRequest")]
        public async Task<IActionResult> sendTitleWorkRequest([FromBody] TitleWorkModel titleWorkRequest,
            Guid contactId, Guid LeaseAssignedBankId, string venderEmailId)

        {
            ResultResponseModel responseModel = new ResultResponseModel();
            Guid leaseId;
            try
            {
                bool result = false;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                var sendToBankApprovalCreatedBy = userid;
                string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
                + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
                + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

                if (LeaseAssignedBankId != null)
                {
                    notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();

                }
                string editLeaseLink = "";
                var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "account";

                var data = SetTitleWorkRequest(titleWorkRequest.LeaseId, sendToBankApprovalCreatedBy);
                if (titleWorkRequest != null)
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "Title Work Request",
                        " has generated the Title Work Request for Perposal #" + titleWorkRequest.LeaseNumber);

                    _commonService.AddNotification("Title Work Request generated for Perposal <b>#" + titleWorkRequest.LeaseNumber + "</b>"
                        , "Title Work Request has been generated for @contactbusinessname 's Perposal <b>#" + titleWorkRequest.LeaseNumber + "</b> by "
                    + name, userid, Convert.ToString(contactId),
                       enumNotificationType.CreateTitleWorkRequest.ToEnumString(), notificationToUser, userid, titleWorkRequest.LeaseNumber.ToString(), "Lease");

                    Hashtable htbl = new Hashtable();
                    htbl["@vendorname"] = titleWorkRequest.VendorName;
                    htbl["@loginusername"] = name;
                    htbl["@leasenumber"] = "#<b>" + titleWorkRequest.LeaseNumber + "</b>";
                    htbl["@username"] = titleWorkRequest.Email;
                    htbl["@password"] = Convert.ToString(titleWorkRequest.Password);
                    htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                    htbl["@ownerRegistration"] = titleWorkRequest.ContactBussinessName + " <br />" + titleWorkRequest.ContactBussinessMailAddress + " " + titleWorkRequest.ContactMailAddressCity + " " + titleWorkRequest.ContactMailAddressState + "<br />" + titleWorkRequest.ContactMailAddressCounty + " ," + titleWorkRequest.ContactMailAddressZip;
                    htbl["@lienHolder"] = titleWorkRequest.BankName + " <br />" + titleWorkRequest.Address + " " + titleWorkRequest.City + " " + titleWorkRequest.StateName + "<br />" + titleWorkRequest.County + "," + titleWorkRequest.ZipCode;
                    htbl["@addLienInformation"] = titleWorkRequest.AddionalLienInformation;
                    htbl["@collateraldesc"] = titleWorkRequest.LeaseOtherDescription ?? "N/A";
                    htbl["@leasevin"] = titleWorkRequest.LeaseSerialNumber;
                    htbl["@maturityDate"] = titleWorkRequest.LeaseMaturityDate;
                    htbl["@mileage"] = "N/A";
                    htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                    htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                    htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                    await _emailSettingsService.SendEmail(venderEmailId, htbl, "Title work request generated for Lease", $"Title work request generated for Perposal #" + titleWorkRequest.LeaseNumber.ToString(), titleWorkRequest.LeaseNumber, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["TitleWorkRequest"], "Lease");

                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Perposal has been sent to " + venderEmailId + " for Title Work Request";
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
        /*! 
      * \brief   set staus for Bank approval.
      * \details Function is used to internally in api using update status for Bank approval.
      * \author  deepak jha 
      * \date    2 octber 2019
      * \version 1.0    
      */
        private BankApprovalModel SetLeaseBankApproveStatus(Guid leaseId, int statusId, string sendToBankApprovalCreatedBy)
        {
            return _leaseService.SetLeaseBankApproveStatus(leaseId, statusId, sendToBankApprovalCreatedBy);
        }
        /*! 
      * \brief   set staus for funding package
      * \details Function is used to internally in api using update status for funding package.
      * \author  deepak jha 
      * \date    2 octber 2019
      * \version 1.0    
      */
        private SendFundingBankApprovalModel SetLeaseFundingPackageToBankStatus(Guid leaseId, int statusId, string sendToBankApprovalCreatedBy)
        {
            return _leaseService.SetLeaseFundingPackageToBankStatus(leaseId, statusId, sendToBankApprovalCreatedBy);
        }
        /*! 
      * \brief   set staus for set Title Work Request
      * \details Function is used to internally in api using update status for set Title Work Request 
      * status.
      * \author  deepak jha 
      * \date    2 octber 2019
      * \version 1.0    
      */
        private string SetTitleWorkRequest(Guid leaseId, string sendToBankApprovalCreatedBy)
        {
            return _leaseService.SetTitleWorkRequest(leaseId, sendToBankApprovalCreatedBy);
        }
        /*! 
       * \brief   Bank user approve for purchase to lease
       * \details Function is used to approve for purchase lease
       * \author  deepak jha
       * \date    25 October 2019
       * \version 1.0    
       */
        [HttpPost]
        [Authorize]
        [Route("ChangeLeaseStatus")]
        public IActionResult ChangeLeaseStatus(Guid leaseId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            int result = -1;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            result = _leaseService.ChangeLeaseStatus(leaseId, userid);
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            string contactid = Convert.ToString(Guid.Empty);
            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
            if (result == 0)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.ApprovedForPurchase.ToEnumString(), " has approved the Perposal for Purchase");
                _commonService.AddNotification("Perposal Approved for Purchase", "Perposal has been approved for Purchase by "
                    + name, userid, contactid,
                       enumNotificationType.LeaseApproveForPurchase.ToEnumString(), notificationToUser, userid, leaseId.ToString(), "Lease");
                responseModel.StatusCode = 200;
                responseModel.ResponseMessage = "Perposal Approved";
            }
            else
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";

            }
            return Ok(responseModel);
        }
        /*! 
       * \brief   Revive supporting Perposal update for supporting documents status
       * \details Function is used to update status for  supporting reviewed documents status
       * \author  deepak jha
       * \date    17 Nov 2019
       * \version 1.0    
       */
        [HttpPost("ReviewSupportingDoc")]
        [Authorize]
        public IActionResult ReviewSupportingDoc(Guid leaseId)
        {
            ResultResponseModel result = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var reviewSupportingDocCreatedBy = userid;

            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
              + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
              + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
            LeaseDetailsNotification data = _leaseService.ReviewSupportingDoc(leaseId, reviewSupportingDocCreatedBy);//it returns the contactid of Lease
            var contactId = data.LeaseContactId;
            var LeaseNumber = data.LeaseNumber;
            if (data.LeaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();

            }

            _commonService.AddNotification("Review Supporting Document for Perposal <b>#" + LeaseNumber, "</b> Supporting Document(s) has been reviewed and updated the status for @contactbusinessname 's Perposal <b>#" + LeaseNumber + "</b> by " + name, userid, contactId.ToString(),
                enumNotificationType.ReviewSupportingDocument.ToEnumString(), notificationToUser, userid, leaseId.ToString(), "Lease");
            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.ReviewSupporting.ToEnumString(), " has reviewed the supporting document(s) and updated the status for Perposal #" + LeaseNumber);
            result.StatusCode = 200;
            result.ResponseMessage = "Perposal review supporting has been updated";

            return Ok(result);
        }
        /*! 
       * \brief   Revive Perposal update Perposal doc status
       * \details Function is used to update status for review documents
       * \author  deepak jha
       * \date    16 Nov 2019
       * \version 1.0    
       */
        [HttpPost("ReviewLeaseDoc")]
        [Authorize]
        public IActionResult ReviewLeaseDoc(Guid leaseId)
        {
            ResultResponseModel result = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var reviewLeaseDocCreatedBy = userid;
            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
              + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
              + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();


            LeaseDetailsNotification data = _leaseService.ReviewLeaseDoc(leaseId, reviewLeaseDocCreatedBy); //it returns the contactid of Lease
            var contactId = data.LeaseContactId;
            var LeaseNumber = data.LeaseNumber;
            if (data.LeaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();

            }
            _commonService.AddNotification("Review Perposal Document for Perposal #" + LeaseNumber, "Perposal Document(s) has been reviewed and updated the status for @contactbusinessname 's Perposal #" + LeaseNumber + " by " + name, userid, contactId.ToString(),
                enumNotificationType.ReviewSupportingDocument.ToEnumString(), notificationToUser, userid, leaseId.ToString(), "Lease");
            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.ReviewLeaseDoc.ToEnumString(), " has reviewed the Perposal document(s) and updated the status for Perposal #" + LeaseNumber);

            result.StatusCode = 200;
            result.ResponseMessage = "Perposal review doc status updated";

            return Ok(result);
        }


        #region DocuSign Section

        /*! 
       * \brief   DocuSign send decument And  check
       * \details Function is used to send DocuSign and check Perposal doc is generated or not
       * \author  deepak jha
       * \date    24 Oct 2019
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("SendDocumentforDocuSign")]
        public IActionResult SendDocumentforDocuSign(string leaseId)
        {
            ResultResponseModel result = new ResultResponseModel();
            var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var model = _leaseService.GetDocuSignDetailByLeaseId(leaseId);
            var sendToDocuSignCreatedBy = uid;
            var serverpath = "";
            string msg = "";
            if (model.IsGenerateLeaseDoc == false)
            {
                result.ResponseMessage = "Please generate Perposal Document before sending for DocuSign!";
                result.StatusCode = (int)HttpStatusCode.Continue;
                return Ok(result);
            }
            else
            {
                try
                {
                    byte[] data;
                    data = null;
                    serverpath = CommonFunctions.GetFileLinkFromWebRoot(Environment.WebRootPath, model.LeasePDFDocumentName, "PDF", enumFileFolder.leaseWebRootPathdocpdf);

                    data = CommonFunctions.FileToByteArray(serverpath);

                    System.IO.File.WriteAllBytes(serverpath, data);

                    JsonResult dataa = null; // docusign(serverpath, model.FirstName, model.UserName);
                    var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                    var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                    string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
                    + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
                    + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
                    if (dataa != null)
                    {
                        //Note: -statusid is contactId.
                        LeaseDetailsNotification res = _leaseService.UpdateLeaseDosuSignStatus(leaseId, Convert.ToString(sendToDocuSignCreatedBy));
                        var contactId = res.LeaseContactId;
                        var LeaseNumber = res.LeaseNumber;
                        if (res.LeaseAssignedBankId != null)
                        {
                            notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();

                        }

                        if (contactId != Guid.Empty)
                        {
                            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.DocuSign.ToEnumString(), "Perposal #" + LeaseNumber + " has sent " + model.FirstName + " for DocuSign");
                            _commonService.AddNotification("Perposal #" + LeaseNumber + " sent to DocuSign", "Document of Perposal #" + LeaseNumber + " has been sent to " + model.FirstName + " for DocuSign Process by "
                                + name, userid, Convert.ToString(contactId), enumNotificationType.docuSignSendDocument.ToEnumString(), notificationToUser, userid, leaseId.ToString(), "Lease");

                            HttpContext.Session.SetString("data", dataa.ToString());
                            result.ResponseMessage = "Document has been sent to " + model.UserName + " for DocuSign Process";
                            result.StatusCode = (int)HttpStatusCode.OK;
                            return Ok(result);
                        }
                        else
                        {
                            result.ResponseMessage = "Document has been not sent, Please Try again later";
                            result.StatusCode = (int)HttpStatusCode.InternalServerError;
                            return Ok(result);
                        }
                    }
                    else
                    {
                        result.ResponseMessage = "Document has been not sent, Please Try again later";
                        result.StatusCode = (int)HttpStatusCode.InternalServerError;
                        return Ok(result);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                    result.ResponseMessage = ex.Message + "***" + serverpath + "***" + msg;
                    result.StatusCode = (int)HttpStatusCode.InternalServerError;
                    return Ok(result);
                }
            }
        }



        /*! 
      * \brief   This methods is used to docuSign API login
      * \details Function is used to Login And Create envelope to send documen.
      * \author  deepak jha
      * \date    24 Oct 2019
      * \version 1.0    
      */
       /* public JsonResult docusign(string path, string recipientName, string recipientEmail)
        {
            try
            {
                var userName = _config.GetSection("CommonSettings")["DocusignUserName"];
                var password = _config.GetSection("CommonSettings")["DocusignPassword"];
                var INTEGRATOR_KEY = _config.GetSection("CommonSettings")["DocusignIntergratedKey"];
                ApiClient apiClient = new ApiClient("https://demo.docusign.net/restapi");

                Configuration.Default.ApiClient = apiClient;
                

              //  apiClient.Configuration.DefaultHeader.Add()
                string accountId = CommonFunctions.loginApi(userName, password, INTEGRATOR_KEY);
                byte[] fileBytes = System.IO.File.ReadAllBytes(path);

                EnvelopeDefinition envDef = new EnvelopeDefinition();
                envDef.EmailSubject = "Solgen Perposal - Please review the Document and DocuSign process.";

                Document doc = new Document();
                doc.DocumentBase64 = System.Convert.ToBase64String(fileBytes);
                doc.Name = System.IO.Path.GetFileName(path);
                doc.DocumentId = "1";
                doc.FileExtension = "pdf";
                envDef.Documents = new List<Document>();
                envDef.Documents.Add(doc);

                DocuSign.eSign.Model.Signer signer = new DocuSign.eSign.Model.Signer();
                signer.Email = recipientEmail;
                signer.Name = recipientName;
                signer.RecipientId = "1";

                envDef.Recipients = new DocuSign.eSign.Model.Recipients();
                envDef.Recipients.Signers = new List<DocuSign.eSign.Model.Signer>();
                envDef.Recipients.Signers.Add(signer);

                envDef.Status = "sent";

                EnvelopesApi envelopesApi = new EnvelopesApi();
                var data = envDef;
                EnvelopeSummary envelopeSummary = envelopesApi.CreateEnvelope(accountId, envDef);

                var result = JsonConvert.SerializeObject(envelopeSummary);
                return Json(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        */
        /*! 
      * \brief   Get inveloped information for redirect response to action {Inprogree}
      * \details {Inprogress to response}.
      * \author  deepak jha
      * \date    24 Oct 2019
      * \version 1.0    
      */
      /*  public ActionResult GetEnvelopeInformation()
        {
            dynamic da = HttpContext.Session.GetString("data");
            ApiClient apiClient = new ApiClient("https://demo.docusign.net/restapi");
            Configuration.Default.ApiClient = apiClient;

            DocuSignJsonConveterData objCustomer = JsonConvert.DeserializeObject(da.Data);

            string envelopeId = objCustomer.envelopeId;
            var userName = _config.GetSection("CommonSettings")["DocusignUserName"];
            var password = _config.GetSection("CommonSettings")["DocusignPassword"];
            var INTEGRATOR_KEY = _config.GetSection("CommonSettings")["DocusignIntergratedKey"];

            string accountId = CommonFunctions.loginApi(userName, password, INTEGRATOR_KEY);
            EnvelopesApi envelopesApi = new EnvelopesApi();
            Envelope envInfo = envelopesApi.GetEnvelope(accountId, envelopeId);
            return View();
        }

        */
        #endregion


        /*! 
      * \brief   Upload Perposal Document PDF
      * \details Function is used to upload Perposal Document PDF by Perposal Id
      * \author  Rahul Sharma
      * \date    01 Nov 2019
      * \version 1.0    
      */
        [HttpPost]
        [Authorize]
        [Route("UploadLeaseDocumentPDF")]
        public IActionResult UploadLeaseDocumentPDF([FromForm] PDFDocumentModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var generateLeaseDocCreatedBy = userid;
            string filePath = CommonSettings.AppSetting["CommonSettings:LeaseDocument"];
            string filePrefix = "";
            filePrefix = "Lease" + model.LeaseNumber;
            var fileResult = Util.UploadPDFFile(model.DocumentName, filePath, filePrefix);
            model.DocumentName = fileResult.Item1 ?? "";
            string fileWithPath = fileResult.Item2 ?? "";
            var lesaeId = model.LeaseId;
            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
               + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
               + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
            LeaseDetailsNotification data = _leaseService.AddDocumentPdf(model, generateLeaseDocCreatedBy);
            var contactId = data.LeaseContactId;
            var LeaseNumber = data.LeaseNumber;
            if (data.LeaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();

            }
            if (data.LeaseContactId != null)//in place of success we have sent the contactid of lease
            {
                _commonService.AddNotification("Generate Perposal Document for Perposal #" + LeaseNumber, "Perposal Document has been generated for @contactbusinessname 's Perposal #" + LeaseNumber + " by " + name, userid, contactId.ToString(),
                    enumNotificationType.ReviewSupportingDocument.ToEnumString(), notificationToUser, userid, lesaeId.ToString(), "Lease");
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.GenerateLease.ToEnumString(), "has generated the Perposal Document for Perposal #" + LeaseNumber);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Perposal Document PDF has been generated successfully.";
                return Ok(resultResponseModel);
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }

        }

        /*! 
     * \brief   Add Edit for Perposal Request
     * \details Function is used to Add Edit for Perposal request.
     * \author  deepak jha
     * \date    15 Nov 2019
     * \version 1.0    
     */
        [HttpPost]
        [Authorize]
        [Route("AddEditLeaseRequest")]
        public IActionResult AddEditLeaseRequest([FromBody] AddLeaseRequestModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            if (model == null)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please contact site adminsitrator.";
                return Ok(responseModel);
            }

            model.LeaseRequestCreatedBy = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID").Value);
            model.ContactAdminId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID").Value);
            if (model.LeaseRequestId != Guid.Empty && model.LeaseRequestId != null)
            {
                model.LeaseRequestModifiedBy = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID").Value);
            }
            model.CompanyID = CompanyID;
            var record = _leaseService.AddEditLeaseRequest(model);
            responseModel.StatusCode = 200;
            responseModel.ResponseMessage = model.LeaseRequestId == null ? "Perposal request has been added successfully." : "Perposal request has been updated successfully.";
            responseModel.Result = record;

            string contactid = Convert.ToString(model.LeaseContactId);//send costomerid for notificationusertype=CustomerUser
            if (model.LeaseRequestId == null)
            {
                string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
                _commonService.AddNotification("Perposal Request Added", "Perposal Request has been added by " + name, userid, contactid,
                      enumNotificationType.LeaseRequestAdded.ToEnumString(), notificationToUser, userid, model.LeaseRequestId.ToString(), "LeaseRequest");

                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToEnumString(), " has Added new Perposal Request");
            }
            else
            {
                string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();
                _commonService.AddNotification("Perposal Request Updated", "Perposal Request has been updated by " + name, userid, contactid,
                         enumNotificationType.LeaseRequestUpdated.ToEnumString(), notificationToUser, userid, model.LeaseRequestId.ToString(), "LeaseRequest");

                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToEnumString(), " has Updated new  Perposal Request");
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
        [Route("GetContactIdByLeaseRequestId")]
        [HttpGet]
        [Authorize]
        public IActionResult GetContactIdByLeaseRequestId(Guid id)
        {
            var ContactId = _leaseService.GetContactIdByLeaseRequestId(id);
            if (ContactId == null)
            {
                return NotFound();
            }

            return Ok(ContactId);
        }
        /*! 
     *  \brief     GetTitleWorkRequestByLeaseId API.
     *  \details   This API is used to get title work request ID by Perposal id.
     *  \author    deepak jha
     *  \version   1.0
     *  \date      2-12-2019
     *  \pre       First initialize the system.
     *  \copyright Solgen.
     */
        [Route("GetTitleWorkRequestByLeaseId")]
        [HttpGet]
        [Authorize]
        public IActionResult GetTitleWorkRequestByLeaseId(Guid leaseId)
        {
            var detail = _leaseService.GetTitleWorkRequestByLeaseId(leaseId);
            return Ok(detail);
        }

        [HttpGet]
        [Authorize]
        [Route("GetLeaseInsuranceDropList")]
        /*! 
    *  \brief     GetLeaseInsuranceDropList API.
    *  \details   This API is used to get Perposal insurance dropdown list.
    *  \author    Anish K
    *  \version   1.0
    *  \date      2-12-2019
    *  \pre       First initialize the system.
    *  \copyright Solgen.
    */
        public IActionResult GetLeaseInsuranceDropList()
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var records = _leaseService.GetLeaseInsuranceDropList(userid);
            return Ok(records);
        }

        [HttpGet]
        [Authorize]
        [Route("GetLeaseDetailForCreateInsuranceRequest")]
        /*! 
    *  \brief     GetLeaseDetailForCreateInsuranceRequest API.
    *  \details   This API is used to get Perposal insurance deatil.
    *  \author    Anish K
    *  \version   1.0
    *  \date      2-12-2019
    *  \pre       First initialize the system.
    *  \copyright Solgen.
    */
        public IActionResult GetLeaseDetailForCreateInsuranceRequest(string leaseId)
        {
            var result = _leaseService.GetLeaseDetailForCreateInsuranceRequest(leaseId);
            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("SaveInsuranceRequestPreview")]
        /*! 
    *  \brief     SaveInsuranceRequestPreview API.
    *  \details   This API is used to Add update insurance deatil.
    *  \author    Anish K
    *  \version   1.0
    *  \date      2-12-2019
    *  \pre       First initialize the system.
    *  \copyright Solgen.
    */
        public async Task<IActionResult> SaveInsuranceRequestPreview([FromForm] SaveCreateInsuranceRequest model)
        {
            ResultResponseModel result = new ResultResponseModel();

            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var CreateInsuranceRequestCreatedBy = userid;

            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
                + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
                + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            var data = _leaseService.SaveInsuranceRequestPreview(model, CreateInsuranceRequestCreatedBy);
            var contactId = data.LeaseContactId;
            var LeaseNumber = data.LeaseNumber;
            var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "account";
            if (data.LeaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
            }
            _commonService.AddNotification("Insurance Request generated for Perposal <b>#" + LeaseNumber + "</b>", "Insurance Request has been generated for @contactbusinessname 's Lease<b> #" + LeaseNumber + "</b> by " + name, userid, contactId.ToString(),
                       enumNotificationType.CreateInsuranceRequest.ToEnumString(), notificationToUser, userid, LeaseNumber, "Lease");

            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "Insurance Request", " has been generated the insurance request for Perposal #" + LeaseNumber);
            try
            {
                Hashtable htbl1 = new Hashtable();
                htbl1["@insurancename"] = model.InsuranceName;
                htbl1["@insured"] = model.Insured;

                htbl1["@vendorname"] = data.VendorName;
                htbl1["@loginusername"] = name;
                htbl1["@lossPayee"] = model.LossPayee;
                htbl1["@addInsured"] = model.SolgenADDRESS;
                htbl1["@collateraldesc"] = (model.Description == null) ? "-" : model.Description;
                htbl1["@leasevin"] = model.VIN;
                htbl1["@maturityDate"] = model.MaturityDate;
                htbl1["@cost"] = model.Cost;
                htbl1["@password"] = model.Password;
                htbl1["@leasenumber"] = model.LeaseNumber;
                htbl1["@username"] = model.AgentEmail;
                htbl1["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                htbl1["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                htbl1["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                htbl1["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                await _emailSettingsService.SendEmail(model.AgentEmail, htbl1, "Insurance Request generated for Perposal #" + LeaseNumber, $"Insurance Request has been generated for Perposal #" + LeaseNumber, LeaseNumber, Guid.Parse(userid), false, _config.GetSection("CommonSettings")["CreateInsuranceRequest"], "Lease");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            result.ResponseMessage = "Success";
            result.StatusCode = 200;
            return Ok(result);
        }
        /*! 
     *  \brief     UploadLeaseDocument API.
     *  \details   This API is used to Upload Signed Perposal Document.
     *  \author    deepak jha
     *  \version   1.0
     *  \date      6-12-2019
     *  \pre       First initialize the system.
     *  \copyright Solgen.
     */
        [HttpPost]
        [Authorize]
        [Route("UploadLeaseDocument")]
        public IActionResult UploadLeaseDocument([FromForm] LeaseDocumentUploadModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string filePath = CommonSettings.AppSetting["CommonSettings:LeaseDocument"];
            var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, "LeaseSignedDocument");
            model.DocumentFileName = fileResult.Item1 ?? "";
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.DocumentUploadedBy = Guid.Parse(userid);
            var data = _leaseService.UploadLeaseDocument(model);

            if (data == null)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
            else
            {
                DeleteLeaseModel result = _leaseService.SendStatusForWeightSignature(model.DocumentUploadedForUser, Guid.Parse(userid));
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

                if (result.LeaseAssignedBankId != null)
                {
                    notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
                }
                if (result != null)
                {

                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), " has uploaded Signed wet signature Document");

                    _commonService.AddNotification("Signed wet signature document uploaded for " + "Perposal #" + result.LeaseNumber,
                        "Signed wet signature Document has been uploaded for @contactbusinessname 's Perposal #" + result.LeaseNumber + " by " + name, userid.ToString(), result.LeaseContactId.ToString(), enumNotificationType.UploadedToPDFWetSig.ToEnumString(), notificationToUser, userid.ToString(), result.LeaseNumber, "Lease");
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Document has been uploaded successfully.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("LeaseInventoryList")]
        /*! 
        * \brief   Get the Lese Request List
        * \details Function is used to fetch the list of Perposal Request
        * \author  Surendra Maurya 
        * \date    11 Dec 2019
        * \version 1.0    
        */
        public IActionResult LeaseInventoryList(DateTime? expFrom, DateTime? expTo, string leaseStatus, string bankName, string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.LeaseInventoryList(expFrom, expTo, leaseStatus, bankName, searchText, sortColumn, sortDir, pageIndex, pageSize, uid);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetTitleWorkRequestReportList")]
        /*! 
        * \brief   Get the title work request report
        * \details Function is used to fetch the report of title work request
        * \author  deepak jha
        * \date    19 dec 2019
        * \version 1.0    
        */
        public IActionResult GetTitleWorkRequestReportList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, Guid? leaseId)
        {
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetTitleWorkRequestReportList(name, From, To, sortColumn, sortDir, page, pageSize, userId, leaseId);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }

        /*! 
       * \brief   Get the customer log report list
       * \details Function is used to fetch the list of customer log report 
       * \author  Anish Sharma
       * \date    19 Dec 2019
       * \version 3.0    
       */
        [Route("GetCustomerLogReportList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetCustomerLogReportList(string name, DateTime? expFrom, DateTime? expTo, Guid? contactStatus, Guid? leaseStatus, Guid? bankName, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_leaseService.GetCustomerLogReportList(name, expFrom, expTo, contactStatus, leaseStatus, bankName, sortColumn, sortDir, page, pageSize, userId));
        }
        /*! 
      * \brief   Get the customer log report list
      * \details Function is used to fetch the list of Monthly Perposal log report
      * \author  Surendra Maurya
      * \date    23 Dec 2019
      * \version 3.0    
      */
        [Route("GetMonthlyLeaseLog")]
        [HttpGet]
        [Authorize]
        public IActionResult GetMonthlyLeaseLog(string name, DateTime? expFrom, DateTime? expTo, string leaseStatus, Guid? bankName, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_leaseService.GetMonthlyLeaseLog(name, expFrom, expTo, leaseStatus, bankName, sortColumn, sortDir, page, pageSize, userId));
        }

        [Route("AddCreditScore")]
        [HttpPost]
        [Authorize]
        public IActionResult AddCreditScore([FromForm] CreditScoreCheckModel model, string CheckCreditAction)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string filePath = CommonSettings.AppSetting["CommonSettings:LeaseDocument"];
            string filePrefix = "contact_" + model.ContactName;
            int cnt = 0;
            foreach (var item in Request.Form.Files)
            {
                var fileResult = Util.UploadFileForCreditScoreFromBase64(item, filePath, filePrefix);
                if (cnt == 0)
                {
                    if (item.Name == "fileNameOne")
                    {
                        model.documentScoreOneFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeOne = fileResult.Item2 ?? "";
                    }
                    else if (item.Name == "fileNametwo")
                    {
                        model.documentScoreTwoFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeTwo = fileResult.Item2 ?? "";
                    }
                    else
                    {
                        model.documentScoreThreeFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeThree = fileResult.Item2 ?? "";
                    }
                }
                if (cnt == 1)
                {
                    if (item.Name == "fileNameOne")
                    {
                        model.documentScoreOneFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeOne = fileResult.Item2 ?? "";
                    }
                    else if (item.Name == "fileNametwo")
                    {
                        model.documentScoreTwoFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeTwo = fileResult.Item2 ?? "";
                    }
                    else
                    {
                        model.documentScoreThreeFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeThree = fileResult.Item2 ?? "";
                    }
                }
                if (cnt == 2)
                {
                    if (item.Name == "fileNameOne")
                    {
                        model.documentScoreOneFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeOne = fileResult.Item2 ?? "";
                    }
                    else if (item.Name == "fileNametwo")
                    {
                        model.documentScoreTwoFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeTwo = fileResult.Item2 ?? "";
                    }
                    else
                    {
                        model.documentScoreThreeFileName = fileResult.Item1 ?? "";
                        model.DocumentTypeThree = fileResult.Item2 ?? "";
                    }
                }
                cnt++;
            }
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.userid = userid;
            DeleteLeaseModel data = _leaseService.AddCreditScore(model, CheckCreditAction);

            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            if (data == null)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
            else if (CheckCreditAction == "Save")
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "Check Credit Score",
                    "has been checked the Credit score for " + data.LeaseNumber);

                _commonService.AddNotification("Check Credit Score for Perposal <b>#" + data.LeaseNumber + "</b>", "Credit Score has been checked for @contactbusinessname 's Perposal <b>#" + data.LeaseNumber + "</b> by " + name, userid, userid,
                       enumNotificationType.CreditCheck.ToEnumString(), notificationToUser, userid, data.LeaseNumber, "Lease");

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Credit Score document has been Saved successfully.";
                return Ok(resultResponseModel);
            }
            else
            {

                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "Skipped the Check Credit Score",
                    "has been Skipped the Check Credit Score for <b>" + data.LeaseNumber + "</b>");

                _commonService.AddNotification("Skipped the Check Credit Score for Perposal <b>#" + data.LeaseNumber + "</b>", "Credit Score has been skipped for @contactbusinessname 's Perposal <b>#" + data.LeaseNumber + "</b> by " + name, userid, Convert.ToString(data.LeaseContactId), enumNotificationType.CreditCheck.ToEnumString(), notificationToUser, userid, data.LeaseNumber, "Lease");

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Check Credit Score has been Skipped successfully.";
                return Ok(resultResponseModel);
            }

        }

        [HttpPost]
        [Route("PrepareUCCFilingRequest")]
        [Authorize]
        /*! 
        * \brief  Add documents.
        * \details Function is used to Add document for all forms And Perposal And Contact sections.
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult PrepareUCCFilingRequest([FromForm] PrepareUCCFilingRequestModal model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();

            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
                + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
                + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            string filePath = CommonSettings.AppSetting["CommonSettings:LeaseDocument"];
            string filePrefix = "";

            filePrefix = "Lease" + model.PrefixNameOfDocument;

            var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
            model.DocumentFileName = fileResult.Item1 ?? "";
            model.DocumentType = fileResult.Item2 ?? "";
            model.DocumentUploadedBy = userid.ToGuid();

            var data = _leaseService.PrepareUCCFilingRequest(model);
            var contactId = data.LeaseContactId;
            var LeaseNumber = data.LeaseNumber;

            if (data.LeaseAssignedBankId != null)
            {
                notificationToUser += "," + enumNotificationUserType.BankUser.ToEnumString();
            }
            if (data.LeaseContactId == Guid.Empty)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
            else
            {
                if (model.PrepareUCCFillingRequestAction == "skip")
                {
                    _commonService.AddNotification("UCC Filing Request skipped for Perposal <b>#" + LeaseNumber + "</b>", "UCC Filing Request has been skipped for @contactbusinessname 's Lease<b> #" + LeaseNumber + "</b> by " + name, userid, contactId.ToString(),
                         enumNotificationType.PrepareUCCFilingRequest.ToEnumString(), notificationToUser, userid, LeaseNumber, "Lease");

                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "UCC Filing Request Skipped", " has been skipped the UCC Filing Request for Perposal #" + LeaseNumber);
                }
                else if (model.PrepareUCCFillingRequestAction == "withdraft")
                {// with draft
                    _commonService.AddNotification("UCC Filing Request With Draft for Perposal <b>#" + LeaseNumber + "</b>", "UCC Filing Request With Draft has been generated for @contactbusinessname 's Perposal <b>#" + LeaseNumber + "</b> by " + name, userid, contactId.ToString(),
                         enumNotificationType.PrepareUCCFilingRequest.ToEnumString(), notificationToUser, userid, LeaseNumber, "Lease");

                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "UCC Filing Request With Draft", " has been generated the UCC Filing Request With Draft for Perposal #" + LeaseNumber);
                }

                else if (model.PrepareUCCFillingRequestAction == "directupload")
                {//direct upload 
                    _commonService.AddNotification("UCC Filing Request With Direct Upload for Perposal <b>#" + LeaseNumber + "</b>", "UCC Filing Request With Direct Upload has been generated for @contactbusinessname 's Perposal <b>#" + LeaseNumber + "</b> by " + name, userid, contactId.ToString(),
                         enumNotificationType.PrepareUCCFilingRequest.ToEnumString(), notificationToUser, userid, LeaseNumber, "Lease");

                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, "UCC Filing Request With Direct Upload", " has been generated the UCC Filing Request With Direct Upload for Perposal #" + LeaseNumber);
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "UCC Filing Request has been added successfully.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetManageLeaseTemplateList")]
        /*! 
        * \brief   Get the Lese Request List
        * \details Function is used to fetch the list of Perposal Request
        * \author  Surendra Maurya 
        * \date    11 Dec 2019
        * \version 1.0    
        */
        public IActionResult GetManageLeaseTemplateList(string searchText, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetManageLeaseTemplateList(searchText, sortColumn, sortDir, pageIndex, pageSize, userId, CompanyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }
        /*! 
        *  \brief     Get Manage Template data By Id for using edit and update
        *  \details   This API is used to edit data on the bases of Manage template Id.
        *  \author    Surendra Maurya
        *  \version   1.0
        *  \date      15 jan 2020
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        [HttpGet("{id}")]
        [Authorize]
        [Route("GetManageLeaseTemplateById")]
        public IActionResult Get(Guid id)
        {

            ManageLeaseTemplate data = _leaseService.GetById(id);
            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);


        }
        [HttpPost("ChangeStatus/{id}")]
        [Authorize]
        /*! 
        * \brief  Change and update Manage template Status.
        * \details Function is used to   update Manage template Status.
        * \author  Surendra Maurya 
        * \date    15 Jan 2020
        * \version 1.0    
        */
        public IActionResult ChangeStatus(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();
            CommonStatusModel effectedRow = _leaseService.ChangeStatus(id);

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (effectedRow == null)
            {
                throw new Exception("Unable to change status of this record.");
            }
            if (effectedRow.Status == "common-001")
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(),
                    " has set status of Perposal Template <strong> " + effectedRow.Name + " </strong> to Active");
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(),
                    " has set status of Perposal Template <strong> " + effectedRow.Name + " </strong> to In-Active");
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditManageTemplate")]
        public IActionResult AddEditManageTemplate([FromBody] ManageLeaseTemplate model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            if (model != null)
            {
                model.CompanyId = CompanyID;
                var data = _leaseService.UpdateManageTemplate(model);
                if (data != null)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Template has been updated successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Template has been added successfully.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Some thing is wrong please contact site adminstrator.";
                return Ok(resultResponseModel);
            }
        }


        /*! 
     * \brief   Get Perposal Template Detail
     * \details Function is used to get the detail of Perposal Template.
     * \author  Anish Sharma
     * \date    17 Jan 2020
     * \version 3.0    
     */
        [HttpGet]
        [Authorize]
        [Route("GetLeaseTemplateDetail")]
        public IActionResult GetLeaseTemplateDetail(Guid leaseid)
        {
            if (leaseid != Guid.Empty)// '00000000-0000-0000-0000-000000000000')
            {
                var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
                var leaseDetail = _leaseService.GetLeaseTemplateDetail(leaseid, uid);
                string leaseContent = leaseDetail.LeaseTemplateContent == null ? "" : leaseDetail.LeaseTemplateContent;
                leaseDetail.LeaseTemplateContent = leaseContent
                        .Replace("@leaseNumber", leaseDetail.LeaseNumber)
                        .Replace("@solgenAddressValue", leaseDetail.SolgenAddress)
                        .Replace("@LesseeContact", leaseDetail.ContactDetail)
                        .Replace("@vendorAddress", leaseDetail.VendorDetail)
                        //.Replace("@leaseDate", (leaseDetail.LeaseDate == null) ? "N/A" : Convert.ToString(leaseDetail.LeaseDate).Substring(0, 10))
                        .Replace("@leaseDate", leaseDetail.LeaseDateFormated)
                        .Replace("@leaseDay", Convert.ToString(leaseDetail.LeaseDate.Value.Day))
                        .Replace("@leaseMonth", Convert.ToString(leaseDetail.LeaseDate.Value.Month))
                        .Replace("@leaseYear", Convert.ToString(leaseDetail.LeaseDate.Value.Year))
                        .Replace("@leaseSerialNumber", leaseDetail.LeaseSerialNumber)
                        .Replace("@leaseOtherDescription", leaseDetail.LeaseOtherDescription == "" ? "N/A" : leaseDetail.LeaseOtherDescription)
                        .Replace("@lesseeName", leaseDetail.ContactBussinessName)
                        .Replace("@lesseeAddress", leaseDetail.ContactAddress)
                        .Replace("@leasePayment", string.Format(new CultureInfo("en-US"), "{0:c}", leaseDetail.LeaseMonthlyRentalPayment))
                        .Replace("@leaseSales", String.Format("{0:0.00}", leaseDetail.LeaseSalesTax))
                        //  .Replace("@licenseFee", Convert.ToString(leaseDetail.LeaseLicenceFee))
                        .Replace("@licenseFee", string.Format(new CultureInfo("en-US"), "{0:c}", Convert.ToDecimal(leaseDetail.LeaseLicenceFee)))
                        .Replace("@lsttermstext", Convert.ToString(leaseDetail.LeaseTerm))
                        .Replace("@leaseResidualAmount", string.Format(new CultureInfo("en-US"), "{0:c}", leaseDetail.LeaseResidualAmount))
                        .Replace("@solgenPrintNameValue", leaseDetail.SolgenPrintNameValue)
                        .Replace("@lesseeCounty", leaseDetail.ContactCounty)
                        .Replace("@leaseInsurance", leaseDetail.LeaseInsurance == null ? "N/A" : leaseDetail.LeaseInsurance)
                        .Replace("@lesseeCity", leaseDetail.ContactCity)
                        .Replace("@bankNamevalue", leaseDetail.BankName)
                        .Replace("@guarantorName", leaseDetail.GuarantorName)
                        .Replace("@lesseestateValue", leaseDetail.ContactState)
                        .Replace("@leaseAmountDueAtSigining", String.Format("{0:0.00}", leaseDetail.LeaseAmountDueAtSigining))
                        .Replace("@nextPaymentDueDate", (leaseDetail.LeaseDate == null) ? "N/A" : Convert.ToString(leaseDetail.LeaseDate.Value.AddMonths(1)).Substring(0, 10))
                        .Replace("@leaseAdditions2", String.Format("{0:0.00}", leaseDetail.LeaseAdditions2))
                        .Replace("@LeaseType", leaseDetail.LeaseType)
                        .Replace("@lesseeContactName", leaseDetail.ContactName)


                        .Replace("@contactBankName", leaseDetail.ContactBankName)
                        .Replace("@contactBankAddress", leaseDetail.ContactBankAddress)
                        .Replace("@contactBankRoutingNumber", leaseDetail.ContactBankRoutingNumber)
                        .Replace("@contactBankAccountNumber", leaseDetail.ContactBankAccountNumber)
                        .Replace("@leaseTerm1", leaseDetail.LeaseTerm1)
                        .Replace("@leaseTerm2", leaseDetail.LeaseTerm2)
                        .Replace("@documentationFee", leaseDetail.DocumentationFee)
                        .Replace("@leaseDescription", leaseDetail.LeaseDescription == "" ? "N/A" : leaseDetail.LeaseDescription)
                        .Replace("@debitContactDetail", leaseDetail.DebitContactDetail)
                         .Replace("@debitAuthLeaseDateFrom", leaseDetail.DebitAuthLeaseDateFrom)
                         .Replace("@debitAuthMaturityDateBefore", leaseDetail.DebitAuthMaturityDateBefore)
                        ;

                if (leaseDetail == null)
                {
                    return BadRequest();
                }
                return Ok(leaseDetail);
            }
            return Ok();
        }
        [HttpGet]
        [Authorize]
        [Route("deleteLeaseTemplatebyId")]
        /*! 
       * \brief   Delete Perposal Request
       * \details function is used to   Delete Perposal Request
       * \author  Deepak jha 
       * \date    24 Nov 2019
       * \version 1.0    
       */
        public IActionResult deleteLeaseTemplatebyId(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();



            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var userType = User.Claims.FirstOrDefault(x => x.Type == "UserType")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;

            string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + ","
                + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString()
                + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();

            int effectedRow = _leaseService.deleteLeaseTemplatebyId(id);
            if (effectedRow == 0)
            {
                throw new Exception("Unable to delete this record.");
            }

            _commonService.AddNotification("Perposal Template Deleted", "Perposal Request has been deleted by " + name, userid, userid,
                enumNotificationType.LEASEREQUESTDELETED.ToEnumString(), notificationToUser, userid);
            _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has deleted Perposal Template");
            result.ResponseMessage = "Success";
            result.StatusCode = 200;

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("GetLeaseTemplateByTemplateId")]
        public IActionResult GetLeaseTemplateByTemplateId(string templateId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _leaseService.GetLeaseTemplateByTemplateId(templateId);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }
        [HttpPost]
        [Authorize]
        [Route("LeaseTemplateEditUpdate")]
        public IActionResult LeaseTemplateEditUpdate([FromBody] LeaseTemplateDetailModel model, string leaseId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            if (model != null)
            {
                var data = _leaseService.LeaseTemplateEditUpdate(model);
                if (data != null)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Perposal template has been updated successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Some thing is wrong please contact site adminstrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Some thing is wrong please contact site adminstrator.";
                return Ok(resultResponseModel);
            }
        }

        /*! 
      * \brief   Update Perposal Status
      * \details This function is used to Update Perposal Status
      * \author  Deepak jha 
      * \date    24 Nov 2019
      * \version 4.0    
      */
        [HttpPost]
        [Authorize]
        [Route("UpdateLeaseStatus")]
        public async Task<IActionResult> UpdateLeaseStatus(string leaseStatus, string leaseId, string calledFrom)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;

                var data = _leaseService.UpdateLeaseStatus(leaseStatus, leaseId, userid, calledFrom);
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "";
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
        [Route("AddEditLead")]
        public async Task<IActionResult> AddEditLead([FromBody] LeadModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                //var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;

                string data = _leaseService.AddEditLead(model);
                string retResponseMessage = string.Format("Lead has been {0} successfully.", string.IsNullOrEmpty(model.LeadId) ? "added" : "updated");
                if (!string.IsNullOrEmpty(data))
                {
                    JObject _obj = JsonConvert.DeserializeObject(data) as JObject;
                    if (_obj != null)
                    {
                        if (_obj["LeadData"] != null)
                        {
                            var _data = _obj["LeadData"][0];
                            responseModel.StatusCode = 220;
                            responseModel.ResponseMessage = string.Format(@"Lead <a href='/lead/view/{1}' target='_blank'>{0} <i class='fa fa-external-link'></i> </a> already exists with same address.", _data["Name"], _data["LeadID"]);
                        }
                        else
                        {
                            responseModel.StatusCode = 200;
                            responseModel.OptionalExtraParamers = data;
                            responseModel.ResponseMessage = retResponseMessage;
                        }
                    }
                    else
                    {
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
            catch //(Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditOpportunity")]
        public async Task<IActionResult> AddEditOpportunity([FromBody] OpportunityModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.userId = userid;
                model.companyId = CompanyID;
                string data = _leaseService.AddEditOpportunity(model);

                var datacode = data.Split('~');

                if (datacode.Length > 1)
                {
                    if (datacode[0] == "-1")
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = datacode[1];
                    }
                }
                else if (data != null)
                {
                    if (model.OpportunityId == "")
                    {
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = "Opportunity has been added successfully.";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = "Opportunity has been updated successfully.";
                    }
                }

                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later!.";
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
        [Route("AddEditAccount")]
        public async Task<IActionResult> AddEditAccount([FromForm] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string filePath = CommonSettings.AppSetting["CommonSettings:AccountdealerDocument"];
                string filePrefix = "dealerDocName";
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

                            model.dealerDocName = model.FileUrl;
                            model.isMediaServer = true;
                            model.Type = Path.GetExtension(model.FileUrl);
                        }
                    }

                }
                string data = _leaseService.AddEditAccount(model);
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    if (model.Id != "" && model.Id != null)
                    {
                        responseModel.OptionalExtraParamers = model.Id;

                        if(model.AccountType=="Bank")
                        {
                            responseModel.ResponseMessage = "Bank has been updated successfully.";
                        }
                        else
                        {
                            responseModel.ResponseMessage = "Account has been updated successfully.";
                        }
                        
                    }
                    else
                    {
                        responseModel.OptionalExtraParamers = data;

                        if (model.AccountType == "Bank")
                        {
                            responseModel.ResponseMessage = "Bank has been Added successfully.";
                        }
                        else
                        {
                            responseModel.ResponseMessage = "Account has been Added successfully.";
                        }
                       
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
        [Route("GetFileUploadSource")]
        public IActionResult GetFileUploadSource(string file)
        {
            var imageLink = "";
            if (file!=null && file!="")
            {
                 imageLink = CommonFunctions.GetFileLink(file, "image", enumFileFolder.accountDealerlogo);

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
        [Route("GetInstallStepFileUploadSource")]
        public IActionResult GetInstallStepFileUploadSource(string file)
        {
            var imageLink = "";
            if (file != null && file != "")
            {
                imageLink = CommonFunctions.GetFileLink(file, "image", enumFileFolder.InstallStepDocuments);

                if (imageLink.Contains("defaultNoImage"))
                {
                    // imageLink = "javascript:void(0);";
                    imageLink = "";
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
        [Route("GetFileUploadSourceNoAuth")]
        public IActionResult GetFileUploadSourceNoAuth(string file)
        {
            var imageLink = "";
            if (file != null && file != "")
            {
                imageLink = CommonFunctions.GetFileLink(file, "image", enumFileFolder.accountDealerlogo);

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


        [HttpPost]
        [Authorize]
        [Route("AddEditLender")]
        public async Task<IActionResult> AddEditLender([FromBody] LenderModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = _leaseService.AddEditLender(model);
                if (data != null)
                {
                    if (model.ID != "")
                    {
                        HttpClient obj = new HttpClient();
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = "Lender has been updated successfully.";

                    }
                    else
                    {
                        HttpClient obj = new HttpClient();
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = "Lender has been inserted successfully.";
                    }
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


        [HttpGet]
        [Authorize]
        [Route("CheckDealerCompanyName")]
        public IActionResult CheckDealerCompanyName(string accountid, string dealerCompanyName)
        {
            try
            {
                ResultResponseModel responseModel = new ResultResponseModel();
                var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var lst = _leaseService.CheckDealerCompanyName(accountid,dealerCompanyName, uid,CompanyID.ToString());
                if(lst=="1")
                {
                    responseModel.StatusCode = 300;
                }
                else
                {
                    responseModel.StatusCode = 200;
                }
                return Ok(responseModel);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }
    }
}







