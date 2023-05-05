using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.File.Protocol;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp.Extensions;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Formstack;
using Solgen.Formstack.RequestModels;
using Solgen.Repository;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;
using Solgen.WebApi.Services;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanDocumentHistoryController : ControllerBase
    {
        private readonly ILoanDocumentHistoryService _loanDocumentHistoryService;
        private readonly IEmailSettingsRepository _emailSettingsRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IFormstackSignService _formstackSignService;
        private readonly ISignNowService _signNowService;
        private ILoanApplicationService _loanService;
        private readonly IRealTimeService _realTimeService;
        private ITaskService _taskService;
        private readonly IDocusignService _docusignService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid UserID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }


        public ILogService logService { get; }

        public LoanDocumentHistoryController(ILoanDocumentHistoryService loanDocumentHistoryService, IEmailSettingsRepository emailSettingsRepository, IWebHostEnvironment webHostEnvironment, IFormstackSignService formstackSignService, ISignNowService signNowService, ILogService logService, ILoanApplicationService loanService,
            IRealTimeService realTimeService, ITaskService taskService, IDocusignService docusignService)
        {
            _loanDocumentHistoryService = loanDocumentHistoryService;
            _emailSettingsRepository = emailSettingsRepository;
            _webHostEnvironment = webHostEnvironment;
            _formstackSignService = formstackSignService;
            _signNowService = signNowService;
            this.logService = logService;
            _loanService = loanService;
            _realTimeService = realTimeService;
            _taskService = taskService;
            _docusignService = docusignService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocumentHistoryList")]
        public async Task<IActionResult> GetDocumentHistoryList(long loanApplicationId, string SortColumn, string SortDir, int PageNo, int PageSize)
        {
            try
            {
                var _list = await _loanDocumentHistoryService.GetLoanDocumentHistoryList(loanApplicationId, SortColumn, SortDir, PageNo, PageSize, UserID,CompanyID);
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Document History List of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocumentHistory/{loanApplicationId}")]
        public async Task<IActionResult> GetDocumentHistory(long loanApplicationId)
        {
            try
            {
                var _list = await _loanDocumentHistoryService.GetLoanDocumentHistory(loanApplicationId);
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Document History of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SendWebmergeDocumentEmail/{loanApplicationId}/{documentHistoryId}")]
        public async Task<IActionResult> SendWebmergeDocumentEmail([FromBody] dynamic emailModel, long loanApplicationId, long documentHistoryId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var _list = await _loanDocumentHistoryService.GetLoanDocumentHistory(loanApplicationId);
                var obj = _list.FirstOrDefault(l => l.Id == documentHistoryId);

                var emailSettings = _emailSettingsRepository.GetEmailSettings(userid, companyid.ToString());
                if (emailSettings != null)
                {
                    var message = new MailMessage();

                    message.To.Add(new MailAddress(Convert.ToString(emailModel.toEmailAddress)));
                    //message.CC.Add(toEmailAddress);
                    message.Subject = Convert.ToString(emailModel.emailSubject);
                    message.Body = Convert.ToString(emailModel.content);
                    message.From = new MailAddress(emailSettings.FromEmailId);
                    message.IsBodyHtml = true;
                    message.Attachments.Add(new Attachment(System.IO.File.OpenRead(Path.Combine(CommonSettings.AppSetting["CommonSettings:UploadsPath"], obj.FileUrl.TrimStart('\\'))), obj.FileName));

                    EmailSendingModel model = new EmailSendingModel();
                    model.EmailSubject = Convert.ToString(emailModel.emailSubject);
                    model.EmailContent = Convert.ToString(emailModel.content);
                    model.EmailFrom = emailSettings.FromEmailId;
                    model.EmailTo = Convert.ToString(emailModel.toEmailAddress);
                    model.CreatedBy = null;
                    model.ModuleName = "";
                    model.PrimaryId = "";
                    using (var smtpClient = new SmtpClient(emailSettings.SMTPServer))
                    {
                        smtpClient.UseDefaultCredentials = false;

                        smtpClient.EnableSsl = false;

                        if (emailSettings.SMTPPort != "")
                            smtpClient.Port = Convert.ToInt16(emailSettings.SMTPPort);
                        smtpClient.Credentials = new NetworkCredential(emailSettings.SMTPUserName, emailSettings.SMTPPassword);

                        try
                        {
                            await smtpClient.SendMailAsync(message);
                            resultResponseModel.StatusCode = 200;
                            resultResponseModel.ResponseMessage = "Mail Sent successfully.";
                            return Ok(resultResponseModel);
                        }
                        catch (Exception ex)
                        {
                            model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                            resultResponseModel.StatusCode = 500;
                            resultResponseModel.ResponseMessage = ex.Message;
                            return Ok(resultResponseModel);
                        }
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception sending Webmerge Document Email of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateLoanHistoryManual/{bankId}/{historyId}/{IsChangeOrder}/{loanApplicationId}")]
        public async Task<IActionResult> UpdateLoanHistoryManual(long bankId, long historyId, bool IsChangeOrder = false, long loanApplicationId = 0)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    
                    string folderName = $"{bankId}_Bank_Documents";
                    string folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:UploadsPath"], folderName);
                    

                   /* if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }
                    */

                    string pdfFileName = $"{folderName}_{DateTime.Now.ToFileTime()}_Manual.pdf";
                    string pdfFilePath = Path.Combine(folderPath, pdfFileName);
                    string FileUrl = string.Empty;
                    bool isMediaServer = false;
                    MemoryStream stream = new MemoryStream(file.OpenReadStream().ReadAsBytes());

                    HttpResponseMessage NodefilePathto = await Util.UploadAttachmentNode1(stream, pdfFileName, CommonSettings.AppSetting["CommonSettings:UploadsPath"]);
                    if (NodefilePathto.Headers.Location != null)
                    {
                        string nodeFileUrl = NodefilePathto.Headers.Location.ToString();

                        var url = nodeFileUrl.Split("//");
                        if (url.Count() > 0)
                        {
                            FileUrl = "https://" + url[1];
                        }
                        //model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                        isMediaServer = true;
                    }

                   // System.IO.File.WriteAllBytes(pdfFilePath, file.OpenReadStream().ReadAsBytes());
                    
                    await _loanDocumentHistoryService.UpdateLoanDocumentManual(FileUrl, "FINALIZED", historyId, isMediaServer);

                    if(IsChangeOrder==true)
                    {
                        List<string> userIds = new List<string>();
                        dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(Convert.ToString(loanApplicationId), companyid.ToString(), "ModificationAgreementUpload");
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        string strEmailSubject = "Modification Agreement upload";
                        string strBodyContent = "Modification Agreement for Application Number# ****" + loanApplicationId.ToString() + " has been uploaded.";

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
                            }

                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = strEmailSubject,
                                SubjectBody = strBodyContent,
                                RouteUrl = "loanApplication/Detail/" + loanApplicationId,
                                ObjectId = loanApplicationId.ToString(),
                                CreatedBy = userid.ToString(),
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(CompanyID),

                            };
                            await _realTimeService.SendNotification(notification);
                        }
                    }
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Document has been uploaded successfully.";
                    return Ok(resultResponseModel);
                }
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Document not found";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception uploading manaul signed documment of Loan Document History Id {historyId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("DownloadFile/{loanApplicationId}/{historyId}")]
        public async Task<IActionResult> DownloadFile(long loanApplicationId, long historyId)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var _list = await _loanDocumentHistoryService.GetLoanDocumentHistory(loanApplicationId);
                var obj = _list.FirstOrDefault(l => l.Id == historyId);

               // byte[] file =System.IO.File.ReadAllBytes(obj.FileUrl);

                //byte[] URLInBytes = System.Text.Encoding.UTF8.GetBytes(obj.FileUrl);
                 
                WebClient webClient = new WebClient();
               
                byte[] bytes = webClient.DownloadData(obj.FileUrl);

                string extension = Path.GetExtension(obj.FileUrl);

                return File(fileContents: bytes,
                    contentType: $"application/{extension.Substring(1)}",
                    fileDownloadName: $"{obj.FileName}");
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception downloading signed document of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("VoidDocuments/{loanApplicationId}/{resend}")]
        public async Task<IActionResult> VoidDocuments(long loanApplicationId, bool resend)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                string docId = null;

                var documents = await _loanDocumentHistoryService.GetLoanDocumentHistory(loanApplicationId,true);

                LoanDocummentHistoryModel data = new LoanDocummentHistoryModel();

                data =  _loanDocumentHistoryService.GetLoanDocumentHistory_Status(loanApplicationId);
                

                if (data.DocumentStatus == "FINALIZED" && data.SourceType!= "Manual" && data.SourceType != "DocuSign")
                {
                    

                    try
                    {
                        string link = null;
                        byte[] file = null;
                        var client = new HttpClient();

                        if (data.SourceType == "FormstackSign")
                        {
                            link = await _formstackSignService.GetDocumentDownloadLink(Guid.Parse(data.DocumentId));
                            var response = await client.GetAsync(link);
                            if (response.IsSuccessStatusCode)
                            {
                                file = await response.Content.ReadAsByteArrayAsync();
                            }
                        }
                        else if (data.SourceType == "SignNow")
                        {
                            file = await _signNowService.DownloadDocument(data.DocumentId, CompanyID.ToString());
                        }
                        docId = data.DocumentId;

                        //if (file == null)
                        //{
                        //    return BadRequest();
                        //}


                        MemoryStream stream = new MemoryStream(file);

                        string FileUrl = "", FileName = "";
                        bool isMediaServer=false;
                        
                        HttpResponseMessage NodefilePathto = await Util.UploadAttachmentNode1(stream, data.FileName, CommonSettings.AppSetting["CommonSettings:VoidLoanHomiDocs"]);
                        if (NodefilePathto.Headers.Location != null)
                        {
                            string nodeFileUrl = NodefilePathto.Headers.Location.ToString();

                            var url = nodeFileUrl.Split("//");
                            if (url.Count() > 0)
                            {
                                FileUrl = "https://" + url[1];
                            }
                            FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                            isMediaServer = true;

                            FileUpload objModel = new FileUpload();

                            objModel.FileUrl = FileUrl;
                            objModel.User = userid.ToString();
                            objModel.CompanyId = CompanyID + "";
                            
                           
                          
                            objModel.RefId = loanApplicationId.ToString();

                            objModel.image = FileName;
                            objModel.fileExtension = Path.GetExtension(FileName);
                            objModel.FileName = FileName;
                            objModel.Description = "Void Document Copy";
                            objModel.isMediaServer = isMediaServer;

                            var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(companyid), docId);
                        }

                        //return File(fileContents: file,
                        //    contentType: $"application/pdf");
                    }
                    catch (Exception ex)
                    {
                        Guid guid = logService.Save(new LogModel
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = $"Exception downloading document {data.DocumentId} from Insuresign",
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
                
                foreach (LoanDocummentHistoryModel item in documents)
                {
                    if(item.DocumentId != null)
                    {
                        if(item.SourceType == "FormstackSign")
                        {
                            await _formstackSignService.CancelDocument(Guid.Parse(item.DocumentId));
                        }
                        else if (item.SourceType == "SignNow")
                        {
                            await _signNowService.CancelInvite(item.DocumentId.ToString(), CompanyID.ToString());
                        }
                      /*  else if (item.SourceType == "DocuSign" && data.DocumentStatus == "FINALIZED")
                        {
                            return Content("Only envelopes in the 'Sent' or 'Delivered' states can be voided.");
                        }
                        */
                        else if(item.SourceType == "DocuSign" && data.DocumentStatus != "FINALIZED")
                        {

                            var response = await _docusignService.VoidEnvelope(item.DocumentId.ToString(), "Void Envelop By Admin");

                            if (response != "Success")
                                return Content(response);
                        }
                        
                        await Task.Delay(500);
                    }
                }

                
               var  result = await _loanDocumentHistoryService.VoidDocuments(loanApplicationId, resend, userid, docId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception voiding document of Loan Application {loanApplicationId}",
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
        [Route("VoidChangeOrder/{loanApplicationId}")]
        public async Task<IActionResult> VoidChangeOrder(long loanApplicationId)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var documents = await _loanDocumentHistoryService.GetLoanDocumentHistory(loanApplicationId);
                var changeOrderDocument = documents.Where(d => d.DocumentType.ToLower() == "changeorder").OrderByDescending(d => d.Id).Take(1).FirstOrDefault();                

                if(changeOrderDocument == null)
                {
                    return Ok();
                }
                else
                {
                    if (changeOrderDocument.DocumentId != null)
                    {
                        if (changeOrderDocument.SourceType == "FormstackSign")
                        {
                            await _formstackSignService.CancelDocument(Guid.Parse(changeOrderDocument.DocumentId));
                        }
                        else if (changeOrderDocument.SourceType == "SignNow")
                        {
                            await _signNowService.CancelInvite(changeOrderDocument.DocumentId.ToString(), CompanyID.ToString());
                        }
                    }

                    var result = await _loanDocumentHistoryService.VoidChangeOrderDocument(loanApplicationId, changeOrderDocument.Id);

                    return Ok(result);
                }

                
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception voiding change order of Loan Application {loanApplicationId}",
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
    }
}