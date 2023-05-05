using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Document")]
    public class DocumentController : Controller
    {
        public readonly IDocumentService _documentService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        public DocumentController(IDocumentService documentService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _documentService = documentService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        [HttpGet]
        [Authorize]
        [Route("GetDocumentList")]
        /*! 
        * \brief   Get the listing of documents
        * \details Function is used to get the document list.
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetDocumentList(string sortColumn, string sortDir, int pageNumber, int pageSizeValue,Guid contactId,Boolean isCustomerAllForms)
        {
            var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

            if (isCustomerAllForms == true)
                contactId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

           var list = _documentService.GetDocumentList(sortColumn, sortDir, pageNumber, pageSizeValue, contactId, isCustomerAllForms, userId);
            foreach (var item in list.Data)
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
            return Ok(list);
        }

        [HttpPost]
        [Authorize]
        /*! 
        * \brief  Add documents.
        * \details Function is used to Add document for all forms And lease And Contact sections.
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult Post([FromForm]AddDocumentModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string filePath = CommonSettings.AppSetting["CommonSettings:LeaseDocument"];
            string filePrefix = "";
            if(model.DocumentAddFor == "contact")
                filePrefix = "contact_" + model.PrefixNameOfDocument;
            if (model.DocumentAddFor == "lease")
                filePrefix = "Lease" + model.PrefixNameOfDocument;
            if (model.DocumentAddFor == "docusign")
                filePrefix = "DocuSignLease" + model.PrefixNameOfDocument;
            if (model.DocumentAddFor == "CustomerAllForms")//called from All form then login user is a customer
                filePrefix = "contact_" + User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;

            var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
            model.DocumentFileName = fileResult.Item1 ?? "";
            if (fileResult.Item2 != "")
            {
                string fileExtension = Path.GetExtension(fileResult.Item2);
                model.DocumentType = fileExtension;
            }
            
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            model.DocumentUploadedBy =userid.ToGuid();

            if (model.IsCustomerAllForms == true)
                model.DocumentUploadedForUser = userid.ToGuid();
            model.DocumentComment = model.DocumentComment == "null" ? "" : model.DocumentComment;

            var id = _documentService.AddOrUpdateDocument(model);

            if (id == Guid.Empty)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
            else
            {
                string logmsg = " has added new document from All Forms";
                if(model.DocumentAddFor=="lease")
                {
                    logmsg = " has added new document for Lease# @leasenum";
                }
                else if (model.DocumentAddFor == "docusign")
                {
                    logmsg = " has added new DocuSign document for Lease# @leasenum";
                }
                else if (model.DocumentAddFor == "contact")
                {
                    logmsg = " has added new document for Contact @contactname";
                }
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), logmsg, Convert.ToString(model.DocumentUploadedForUser));
                string notificationToUser = enumNotificationUserType.SalesUser.ToEnumString() + "," + enumNotificationUserType.OperationUser.ToEnumString() + "," + enumNotificationUserType.CustomerUser.ToEnumString() + "," + enumNotificationUserType.AdminUser.ToEnumString() + "," + enumNotificationUserType.SuperAdminUser.ToEnumString();//bank user is added in sp add notification..if bank associated

                string contactid =Convert.ToString(id);//return contactid if called from docusign,createinsurancerequest,createtitlework
                if (model.DocumentAddedFrom == "docusign")
                {//called from docusign..send notification
                 ////////_commonService.AddNotification("DocuSign Received for Lease <b>#" + model.PrefixNameOfDocument + "</b>", "DocuSign has been received for @contactbusinessname 's Lease <b>#" + model.PrefixNameOfDocument + "</b> by "+ name, userid, contactid, enumNotificationType.LeaseApproveForPurchase.ToEnumString(), notificationToUser, userid, model.PrefixNameOfDocument, "Docusign");

                    _commonService.AddNotification("Signed Lease Document Received for Lease <b>#" + model.PrefixNameOfDocument + "</b>", "Signed Lease Document has been received for @contactbusinessname 's Lease <b>#" + model.PrefixNameOfDocument + "</b> by " + name, userid, contactid, enumNotificationType.LeaseApproveForPurchase.ToEnumString(), notificationToUser, userid, model.PrefixNameOfDocument, "Docusign");
                }
                else if (model.DocumentAddedFrom == "createtitlework")
                {//called from create title work..send notification
                    _commonService.AddNotification("Title Work document uploaded for Lease <b>#" + model.PrefixNameOfDocument + "</b>", "Title Work document has been uploaded for @contactbusinessname 's Lease <b>#" + model.PrefixNameOfDocument + "</b> by " + name, userid, contactid, enumNotificationType.CreateTitleWorkRequestDocument.ToEnumString(), notificationToUser, userid, model.PrefixNameOfDocument, "createtitlework");
                }
                else if (model.DocumentAddedFrom == "createinsurancerequest")
                {//called from create title work..send notification
                    _commonService.AddNotification("Insurance document uploaded for Lease <b>#" + model.PrefixNameOfDocument + "</b>", "Insurance document has been uploaded for @contactbusinessname 's Lease <b>#" + model.PrefixNameOfDocument + "</b> by " + name, userid, contactid, enumNotificationType.CreateInsuranceRequestDocument.ToEnumString(), notificationToUser, userid, model.PrefixNameOfDocument, "createinsurancerequest");
                }
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Document has been added successfully.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("DeletedDocumentByDoCumentId")]
        /*! 
        * \brief  Delete documents.
        * \details Function is used to 'Delete' document for all forms And lease And Contact sections.
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult DeletedDocumentByDoCumentId(string documentId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _documentService.DeletedDocumentByDosumentId(documentId);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                if (result != null)
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has been Deleted Document");
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Document has been Deleted successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " Error occurs while deleting Document record, Document");
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while deleting Document record";
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
    }
}