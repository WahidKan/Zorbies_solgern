using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.IO.Compression;
using System.Linq;
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
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.Services;
using Solgen.WebApi.Models.Formstack.Sign;
using System.Diagnostics;
using Solgen.WebApi.HubConfig;
using System.Net.Http;
using Solgen.WebApi.Models.Equifax.CreditReport.Request;
using Syncfusion.Pdf.Parsing;
using Syncfusion.Pdf;
using System.Globalization;
using System.Collections;
using Microsoft.Extensions.Configuration;
using System.Net;
using Solgen.WebApi.Models.Docusign;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class WebMergeController : Controller
    {
        private readonly ILoanApplicationService _loanService;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IConfiguration _config;
        private readonly IRealTimeService _realTimeService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IWebMergeService _webMergeService; //Handles Mapping related methods
        //private IOptions<WebMergeConfiguration> _webMergeSettings;
        private readonly WebMergeConfiguration _webMergeSettings;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ILoanDocumentHistoryService _loanDocumentHistoryService; //Handles generated document related methods
        private readonly IFormstackSignService _formstackSignService; //Handles Formstack Sing API calls (NOT IN USE)
        private readonly ILoanApplicationService _loanApplicationService;
        private readonly ISignNowService _signNowService; //Handles SingNow API calls
        private readonly IWebmergeDocumentService _webmergeDocumentService; //Handles PDF document related methods via SyncFusion library
        private readonly IWebmergeDataRouteService _webmergeDataRouteService; //Handles Routes/Rules for document merging via SyncFusion library

        private readonly IDocusignService _docusignService; // Handles Docusign API calls

        public ILogService logService { get; }
        private readonly HttpClient httpClient;
        private string CompanyID { get { return User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value; } }


        public WebMergeController(ICommonService commonService, IHttpContextAccessor httpContext, IWebMergeService webMergeService, IWebHostEnvironment webHostEnvironment, ILoanDocumentHistoryService loanDocumentHistoryService, IFormstackSignService formstackSignService,
            ISignNowService signNowService, IWebmergeDocumentService webmergeDocumentService, IWebmergeDataRouteService webmergeDataRouteService,
            IDocusignService docusignService,
            ILoanApplicationService loanService, IRealTimeService realTimeService,
            ILoanApplicationService loanApplicationService, ILogService logService, IEmailSettingsService emailSettingsService, IConfiguration config)//, IOptions<WebMergeConfiguration> webMergeSettings)
        {
            this.httpClient = new HttpClient();
            _commonService = commonService;
            _httpContext = httpContext;
            _webMergeService = webMergeService;
            _webHostEnvironment = webHostEnvironment;
            _loanDocumentHistoryService = loanDocumentHistoryService;
            _emailSettingsService = emailSettingsService;
            _config = config;
            _webMergeSettings = new WebMergeConfiguration()
            {
                ApiKey = CommonSettings.AppSetting["CommonSettings:WebmergeApiKey"],
                ApiSecret = CommonSettings.AppSetting["CommonSettings:WebmergeApiSecret"]
            };
            _webmergeDocumentService = webmergeDocumentService;
            _webmergeDataRouteService = webmergeDataRouteService;
            _formstackSignService = formstackSignService;
            _loanService = loanService;
            _realTimeService = realTimeService;
            _loanApplicationService = loanApplicationService;
            _signNowService = signNowService;
            this.logService = logService;
            _docusignService = docusignService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetWebmergeDocument/{documentId}")]
        public async Task<IActionResult> GetWebmergeDocument(long documentId)
        {
            //USED
            //Brings the document related info including Local Path of the PDF file
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webmergeDocumentService.GetWebmergeDocument(documentId, companyId);

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");

                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                //var document = await client.GetDocumentAsync(documentId);

                //return Ok(document);

            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting WebMerge document : Id {documentId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetWebmergeDocumentFields/{documentId}")]
        public async Task<IActionResult> GetWebmergeDocumentFields(int documentId)
        {
            //USED
            //Brings the list of the names of fields in PDF file
            try
            {
                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                //var document = await client.GetDocumentAsync(documentId);

                //List<string> str = new List<string>();

                //foreach (var item in document.Fields)
                //{
                //    str.Add(item.Key);
                //}

                //return Ok(str);

                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = JsonConvert.DeserializeObject<dynamic>(await _webmergeDocumentService.GetWebmergeDocument(documentId, companyId));

                if (data == null)
                {
                    return BadRequest();
                }

                FileStream file = new FileStream(Convert.ToString(data.Url), FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                PdfLoadedDocument doc = new PdfLoadedDocument(file);

                PdfLoadedForm form = doc.Form;

                List<string> str = new List<string>();
                if (form != null)
                {
                    foreach (PdfLoadedField field in form.Fields)
                    {
                        str.Add(field.Name);
                    }
                }
                return Ok(str);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting WebMerge document fields : Document Id {documentId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetWebmergeDocuments/{bankId}")]
        public async Task<IActionResult> GetWebmergeDocuments(long bankId)
        {
            //USED
            //Gets the list of the PDF files on the Local system
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webmergeDocumentService.GetWebmergeDocuments(bankId, companyId);

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");

                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                //var documents = await client.GetDocumentListAsync(null, $"{bankId}_Bank_Documents");

                //return Ok(documents);

            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting WebMerge documents for bank {bankId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetFormFields")]
        public async Task<IActionResult> GetFormFields(string moduleName, int? formmasterid)
        {
            //USED
            //Gets the list of all the available custom form fields related to Loan Application (no values)
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                if (string.IsNullOrEmpty(moduleName) || formmasterid == null)
                {
                    return Ok(await _webMergeService.GetFields(companyid));
                }
                else
                {
                    var _formFields = await _webMergeService.GetFields(companyid, moduleName, formmasterid);
                    return Ok(_formFields);
                }
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting form fields",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("MergeAndDownloadWebmergeDocument/{documentId}/{documentKey}/{LoanApplicationId}/{bankId}")]
        public async Task<IActionResult> MergeAndDownloadWebmergeDocument(int documentId, string documentKey, int LoanApplicationId, int bankId)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var _fieldsWithValue = await _webMergeService.GetFieldsWithValue(LoanApplicationId, companyid);
                var _fieldsWithOutValue = await _webMergeService.GetLoanDocMapping(bankId, 11);

                var _obj = _webMergeService.GetLoanDocFinalMapping(_fieldsWithValue, _fieldsWithOutValue);

                var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                var document = await client.MergeDocumentAndDownloadAsync(documentId, documentKey, _obj, true);

                //Save Blob in Azure

                byte[] file;

                using (var memoryStream = new MemoryStream())
                {
                    document.CopyTo(memoryStream);
                    file = memoryStream.ToArray();
                }

                return File(fileContents: file,
                    contentType: "application/pdf",
                    fileDownloadName: $"{documentId}_{DateTime.Now.ToFileTime()}" + ".pdf");
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception merge and download WebMerge document {documentId} for Loan Application {LoanApplicationId} for bank {bankId}",
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
        [Route("MergeAndDownloadWebmergeDocuments/{LoanApplicationId}/{bankId}")]
        public async Task<IActionResult> MergeAndDownloadWebmergeDocuments(int LoanApplicationId, int bankId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                string folderName = $"{bankId}_Bank_Documents";
                string folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:UploadsPath"], folderName);
                string tempFolderPath = Path.Combine(folderPath, "temp");
                var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                var documents = await client.GetDocumentListAsync(null, folderName);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                if (!Directory.Exists(tempFolderPath))
                {
                    Directory.CreateDirectory(tempFolderPath);
                }

                foreach (var document in documents)
                {
                    var _fieldsWithValue = await _webMergeService.GetFieldsWithValue(LoanApplicationId, companyid);
                    var _fieldsWithOutValue = await _webMergeService.GetLoanDocMapping(bankId, document.Id);

                    var _obj = _webMergeService.GetLoanDocFinalMapping(_fieldsWithValue, _fieldsWithOutValue);


                    string fileName = $"{document.Name}.{document.DocumentType.ToString().ToLower()}";

                    Stream mergedDocument = await client.MergeDocumentAndDownloadAsync(document.Id, document.Key, _obj, true);

                    byte[] file;

                    using (var memoryStream = new MemoryStream())
                    {
                        mergedDocument.CopyTo(memoryStream);
                        file = memoryStream.ToArray();
                    }

                    System.IO.File.WriteAllBytes(Path.Combine(tempFolderPath, fileName), file);
                }

                string zipFileName = $"{folderName}_{DateTime.Now.ToFileTime()}.zip";
                string zipFilePath = Path.Combine(folderPath, zipFileName);

                ZipFile.CreateFromDirectory(tempFolderPath, zipFilePath);

                Directory.Delete(tempFolderPath, true);

                //await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, zipFileName, zipFilePath.Replace($"{_webHostEnvironment.WebRootPath}", ""), );

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Documents have been merged successfully.";
                return Ok(resultResponseModel);

            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception merge and download WebMerge documents for Loan Application {LoanApplicationId} for bank {bankId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });

                resultResponseModel.StatusCode = 500;
                if (ex.Message.Contains("Response status code does not indicate success: 404 ()."))
                {
                    resultResponseModel.ResponseMessage = "Please upload Bank documents";
                }

                if (ex.Message.Contains("Value cannot be null. (Parameter 'value')"))
                {
                    resultResponseModel.ResponseMessage = "Please set mappings of bank documents";
                }

                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SaveWebmergeMappings/{bankId}")]
        public async Task<IActionResult> SaveWebmergeMappings([FromBody] WebmergeMapping webmergeMapping, long bankId)
        {
            //USED
            //Create new mapping and mappings details
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                //UPDATE THE TABLE SCHEMA AND STORED PROCEDURES

                await _webMergeService.SaveWebmergeMapping(webmergeMapping, 0, bankId, companyid, userid);

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception adding WebMerge mappings for bank {bankId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateWebmergeMappings/{bankId}/{mappingId}")]
        public async Task<IActionResult> UpdateWebmergeMappings([FromBody] WebmergeMapping webmergeMapping, long bankId, long mappingId)
        {
            //USED
            //Updates the mapping and mapping details
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                //UPDATE THE TABLE SCHEMA AND STORED PROCEDURES

                await _webMergeService.SaveWebmergeMapping(webmergeMapping, mappingId, bankId, companyid, userid);

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception updating WebMerge mappings for Mapping Id {webmergeMapping.Id} for bank {bankId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetWebmergeMappingsList/{bankId}")]
        public async Task<IActionResult> GetWebmergeMappingsList(long bankId, string SortColumn, string SortDir, int PageNo, int PageSize)
        {
            //USED
            //Get the mapping list
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webMergeService.GetWebmergeMappingList(bankId, companyid, SortColumn, SortDir, PageNo, PageSize);

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting WebMerge mappings list for bank {bankId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetWebmergeMappingDetails/{bankId}/{mappingId}")]
        public async Task<IActionResult> GetWebmergeMappingDetails(long bankId, long mappingId)
        {
            //USED
            //Get mapping and mapping details
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webMergeService.GetWebmergeMapping(bankId, mappingId, companyid);

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception adding WebMerge mappings details of mapping {mappingId} for bank {bankId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetBankIdByLoanApplicationId/{loanApplicationId}")]
        public async Task<IActionResult> GetBankIdByLoanApplicationId(long loanApplicationId)
        {
            //USED
            //Gets the bank id related to Loan Application
            try
            {

                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webMergeService.GetBankIdByLoanApplicationId(loanApplicationId);

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting bank of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UploadWebmergeDocument")]
        public async Task<IActionResult> UploadWebmergeDocument([FromForm] UploadDocumentModel model)
        {
            //USED
            //Create the new document record and saves the PDF on Local System
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                ResultResponseModel resultResponseModel = new ResultResponseModel();
                if (model != null)
                {
                    if (Request.Form.Files.Count > 0)
                    {
                        var file = Request.Form.Files[0];
                        string folderName = $"{model.BankId}_Bank_Documents";
                        string folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:WebmergeDocumentsPath"], folderName);

                        if (!Directory.Exists(folderPath))
                        {
                            Directory.CreateDirectory(folderPath);
                        }

                        string fileUrl = Path.Combine(folderPath, $"{model.DocumentName}.pdf");

                        System.IO.File.WriteAllBytes(fileUrl, file.OpenReadStream().ReadAsBytes());
                        await _webmergeDocumentService.SaveWebmergeDocument(model.DocumentName, fileUrl, "PDF", folderName, model.BankId, userId, companyId);

                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been uploaded successfully.";
                        return Ok(resultResponseModel);

                        //var file = Request.Form.Files[0];
                        //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                        //DocumentRequest document = new FileDocumentRequest(model.DocumentName, file.OpenReadStream().ReadAsBytes(), Formstack.Enums.DocumentType.Pdf, Formstack.Enums.DocumentOutputType.Pdf);
                        //document.Folder = $"{model.BankId}_Bank_Documents";

                        //var response = await client.CreateDocumentAsync(document);
                        //if (response == null)
                        //{
                        //    resultResponseModel.StatusCode = 500;
                        //    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                        //    return Ok(resultResponseModel);
                        //}
                        //else
                        //{
                        //    resultResponseModel.StatusCode = 200;
                        //    resultResponseModel.ResponseMessage = "Document has been uploaded successfully.";
                        //    return Ok(resultResponseModel);
                        //}
                    }
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception uploading webmerge document",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }

        }

        [HttpPost]
        [Authorize]
        [Route("UpdateWebmergeDocument/{documentId}")]
        public async Task<IActionResult> UpdateWebmergeDocument([FromForm] UploadDocumentModel model, int documentId)
        {
            //USED
            //Update the existing document and save the new file if required
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                string fileUrl = null;
                string folderName = $"{model.BankId}_Bank_Documents";
                string folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:WebmergeDocumentsPath"], folderName);

                fileUrl = Path.Combine(folderPath, $"{model.DocumentName}.pdf");
                //fileUrl = Path.Combine(folderPath, model.DocumentName);

                ResultResponseModel resultResponseModel = new ResultResponseModel();
                if (model != null)
                {
                    if (Request.Form.Files.Count > 0)
                    {
                        var file = Request.Form.Files[0];

                        if (!Directory.Exists(folderPath))
                        {
                            Directory.CreateDirectory(folderPath);
                        }

                        System.IO.File.WriteAllBytes(fileUrl, file.OpenReadStream().ReadAsBytes());
                    }

                    else
                    {
                        // Rename actual document if document name is updated
                        if (model.DocumentName != model.olddocumentName)
                        {
                            string sourcefile = null;
                            sourcefile = Path.Combine(folderPath, $"{model.olddocumentName}.pdf");
                            System.IO.FileInfo fi = new System.IO.FileInfo(sourcefile);

                            if (fi.Exists)
                            {
                                fi.MoveTo(fileUrl);

                            }

                        }
                    }



                    await _webmergeDocumentService.UpdateWebmergeDocument(model.DocumentName, fileUrl, userId, companyId, documentId);

                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                    return Ok(resultResponseModel);

                    //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);

                    //DocumentUpdateRequest document = new DocumentUpdateRequest();
                    //document.Name = model.DocumentName;

                    //if (Request.Form.Files.Count > 0)
                    //{
                    //    var file = Request.Form.Files[0];
                    //    document.FileContents = Convert.ToBase64String(file.OpenReadStream().ReadAsBytes());
                    //}

                    //var response = await client.UpdateDocumentAsync(documentId, document);
                    //if (response == null)
                    //{
                    //    resultResponseModel.StatusCode = 500;
                    //    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    //    return Ok(resultResponseModel);
                    //}
                    //else
                    //{
                    //    resultResponseModel.StatusCode = 200;
                    //    resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                    //    return Ok(resultResponseModel);
                    //}
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception updating webmerge document",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("MergeWebmergeDataRoute/{LoanApplicationId}/{bankId}")]
        public async Task<IActionResult> MergeWebmergeDataRoute(int LoanApplicationId, int bankId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);

                var _fieldsWithValue = await _webMergeService.GetFieldsWithValue(LoanApplicationId, companyid);
                List<LoanDocMappingModel> _fieldsWithOutValue = new List<LoanDocMappingModel>();

                string folderName = $"{bankId}_Bank_Documents";
                var documents = await client.GetDocumentListAsync(null, folderName);
                foreach (var document in documents)
                {
                    _fieldsWithOutValue.AddRange(await _webMergeService.GetLoanDocMapping(bankId, document.Id));
                }

                var _obj = _webMergeService.GetLoanDocFinalMapping(_fieldsWithValue, _fieldsWithOutValue);

                var routes = await client.GetDataRouteListAsync();

                var routeResponse = await client.MergeDataRouteWithSingleDownloadAsync(routes.FirstOrDefault().Id, routes.FirstOrDefault().Key, _obj, true);

                byte[] file;

                using (var memoryStream = new MemoryStream())
                {
                    routeResponse.CopyTo(memoryStream);
                    file = memoryStream.ToArray();
                }

                string folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:UploadsPath"], folderName);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string pdfFileName = $"{folderName}_{DateTime.Now.ToFileTime()}.pdf";
                string pdfFilePath = Path.Combine(folderPath, pdfFileName);
                System.IO.File.WriteAllBytes(pdfFilePath, file);

                //await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, pdfFileName, pdfFilePath.Replace($"{_webHostEnvironment.WebRootPath}", ""));

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Document have been generated successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception merging webmerge data route",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                resultResponseModel.StatusCode = 500;
                if (ex.Message.Contains("Response status code does not indicate success: 404 ()."))
                {
                    resultResponseModel.ResponseMessage = "Please upload Bank documents";
                }

                if (ex.Message.Contains("Value cannot be null. (Parameter 'value')"))
                {
                    resultResponseModel.ResponseMessage = "Please set mappings of Bank documents";
                }
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("MergeWebmergeMapping/{LoanApplicationId}/{bankId}/{IsChangeOrder}/{SignerBy}")]
        public async Task<IActionResult> MergeWebmergeMapping(int LoanApplicationId, int bankId, bool IsChangeOrder = false, string SignerBy = null)
        {
            //USED
            //This merges the documents of the route/document and then combines the merged documents into a single document
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            //string signerName = string.Empty;
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                if (SignerBy == "null")
                {
                    SignerBy = _webMergeService.GetSignerName(companyid);
                }



                string folderName = $"{bankId}_Bank_Documents";

                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);

                var webmergeMapping = await _webMergeService.GetDefaultWebmergeMapping(bankId, companyid);

                List<LoanDocMappingModel> _fieldsWithOutValue = new List<LoanDocMappingModel>();

                _fieldsWithOutValue.AddRange(await _webMergeService.GetLoanDocMapping(bankId, webmergeMapping.Id));
                var _fieldsWithValue = await _webMergeService.GetFieldsWithValue(LoanApplicationId, companyid);
                var _obj = _webMergeService.GetLoanDocFinalMapping(_fieldsWithValue, _fieldsWithOutValue);

                string UniqueId = $"{companyid}_{bankId}_{LoanApplicationId}";



                (_obj as IDictionary<string, object>).Add("UniqueId", UniqueId);

                //TimeZoneInfo zone;
                //DateTime pacificNow;

                //zone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
                //pacificNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                //(_obj as IDictionary<string, object>)["LNEFFDATE"] = pacificNow.AddDays(30).Date.ToString("yyyy-MM-dd");
                //(_obj as IDictionary<string, object>)["SIRATEDAY"] = pacificNow.AddDays(30).Date.ToString("yyyy-MM-dd");

                //try
                //{
                //string _terms = Convert.ToString(_obj.LNPMT2NO);
                //DateTime maturity_date = pacificNow.AddDays(30).AddMonths(Convert.ToInt32(_terms));
                //(_obj as IDictionary<string, object>)["LNMATDATE"] = maturity_date.Date.ToShortDateString();
                //}
                //catch { }

                string dateFormat = "MM/dd/yyyy";

                (_obj as IDictionary<string, object>).Add("LNPMTFREQ", "Monthly beginning:");

                if ((_obj as IDictionary<string, object>).ContainsKey("LNPMT1DUE"))
                {
                    string pmt1dueString = Convert.ToString((_obj as IDictionary<string, object>)["LNPMT1DUE"]);

                    if (!string.IsNullOrEmpty(pmt1dueString))
                    {
                        CultureInfo culture = new CultureInfo("en-US");
                        DateTime pmt1due = DateTime.Parse(pmt1dueString, culture);
                        //DateTime pmt1due = Convert.ToDateTime(pmt1dueString);
                        //DateTime pmt1due = pacificNow.AddDays(45+30).Date;
                        //(_obj as IDictionary<string, object>)["LNPMT1DUE"] = pmt1due.ToShortDateString();
                        (_obj as IDictionary<string, object>).Add("LNPMT2DUE", pmt1due.AddMonths(18).ToString(dateFormat));
                        (_obj as IDictionary<string, object>).Add("Target Date", pmt1due.AddMonths(18).ToString(dateFormat));
                    }
                }

                if ((_obj as IDictionary<string, object>).ContainsKey("AP1PRESEMPHIRE"))
                {
                    (_obj as IDictionary<string, object>)["AP1PRESEMPHIRE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP1PRESEMPHIRE"]));
                }

                if ((_obj as IDictionary<string, object>).ContainsKey("AP2PRESEMPHIRE"))
                {
                    (_obj as IDictionary<string, object>)["AP2PRESEMPHIRE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP2PRESEMPHIRE"]));
                }
                if ((_obj as IDictionary<string, object>).ContainsKey("AP1PRESADDSINCE"))
                {
                    (_obj as IDictionary<string, object>)["AP1PRESADDSINCE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP1PRESADDSINCE"]));
                }
                if ((_obj as IDictionary<string, object>).ContainsKey("AP2PRESADDSINCE"))
                {
                    (_obj as IDictionary<string, object>)["AP2PRESADDSINCE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP2PRESADDSINCE"]));
                }

                if ((_obj as IDictionary<string, object>).ContainsKey("AP1PREVADDYRS"))
                {
                    (_obj as IDictionary<string, object>)["AP1PREVADDYRS"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP1PREVADDYRS"]));
                }

                if ((_obj as IDictionary<string, object>).ContainsKey("AP2PREVADDYRS"))
                {
                    (_obj as IDictionary<string, object>)["AP2PREVADDYRS"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP2PREVADDYRS"]));
                }



                /* string pmt1dueString = Convert.ToString((_obj as IDictionary<string, object>)["LNPMT1DUE"]);
                 if (!string.IsNullOrEmpty(pmt1dueString))
                 {
                     CultureInfo culture = new CultureInfo("en-US");
                     DateTime pmt1due = DateTime.Parse(pmt1dueString, culture);
                     //DateTime pmt1due = Convert.ToDateTime(pmt1dueString);
                     //DateTime pmt1due = pacificNow.AddDays(45+30).Date;
                     //(_obj as IDictionary<string, object>)["LNPMT1DUE"] = pmt1due.ToShortDateString();
                     (_obj as IDictionary<string, object>).Add("LNPMT2DUE", pmt1due.AddMonths(18).ToString(dateFormat));
                     (_obj as IDictionary<string, object>).Add("Target Date", pmt1due.AddMonths(18).ToString(dateFormat));
                 }

                 (_obj as IDictionary<string, object>)["AP1PRESEMPHIRE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP1PRESEMPHIRE"]));
                 (_obj as IDictionary<string, object>)["AP2PRESEMPHIRE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP2PRESEMPHIRE"]));
                 (_obj as IDictionary<string, object>)["AP1PRESADDSINCE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP1PRESADDSINCE"]));
                 (_obj as IDictionary<string, object>)["AP2PRESADDSINCE"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP2PRESADDSINCE"]));

                 (_obj as IDictionary<string, object>)["AP1PREVADDYRS"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP1PREVADDYRS"]));
                 (_obj as IDictionary<string, object>)["AP2PREVADDYRS"] = await ConvertToYearsAndMonthsString(Convert.ToString((_obj as IDictionary<string, object>)["AP2PREVADDYRS"]));

                 */
                if (IsChangeOrder)
                {
                    (_obj as IDictionary<string, object>).Add("IsChangeOrder", "TRUE");
                }
                else
                {
                    (_obj as IDictionary<string, object>).Add("IsChangeOrder", "FALSE");
                }

                string DocumentType = !IsChangeOrder ? "LoanDoc" : "ChangeOrder";

                var applicantResp = await _loanApplicationService.GetApplicantInfo(Guid.Empty, companyid, LoanApplicationId);
                var coapplicantResp = await _loanApplicationService.GetCoApplicantInfo(Guid.Empty, companyid, LoanApplicationId);

                if (string.IsNullOrEmpty(coapplicantResp))
                {
                    (_obj as IDictionary<string, object>).Add("IsCoApplicant", "FALSE");
                }
                else
                {
                    (_obj as IDictionary<string, object>).Add("IsCoApplicant", "TRUE");
                }

                List<PdfLoadedDocument> pdfs = new List<PdfLoadedDocument>();

                var route = JsonConvert.DeserializeObject<DataRoute>(await _webmergeDataRouteService.GetWebmergeDataRoute(webmergeMapping.WebmergeObjectId, companyid));

                foreach (var rule in route.rules.OrderBy(r => r.sort))
                {
                    bool ShouldMerge = true;

                    if (rule.conditions != null)
                    {
                        foreach (var condition in rule.conditions)
                        {
                            if (condition.@operator == "and")
                            {
                                ShouldMerge = (ShouldMerge && CheckCondition(_obj as IDictionary<string, object>, condition));
                            }
                            else if (condition.@operator == "or")
                            {
                                ShouldMerge = ShouldMerge || CheckCondition(_obj as IDictionary<string, object>, condition);
                            }
                        }
                    }

                    if (ShouldMerge)
                    {
                        var docData = await _webmergeDocumentService.GetWebmergeDocument(rule.document_id, companyid, SignerBy);
                        WebMergeDocsViewModel d = JsonConvert.DeserializeObject<WebMergeDocsViewModel>(docData);
                        FileStream file = new FileStream(Convert.ToString(d.Url), FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                        PdfLoadedDocument doc = new PdfLoadedDocument(file);

                        PdfLoadedForm form = doc.Form;

                        foreach (PdfLoadedField field in form.Fields)
                        {
                            if ((_obj as IDictionary<string, object>).ContainsKey(field.Name))
                            {
                                if (field.GetType() == typeof(PdfLoadedTextBoxField))
                                {
                                    (form.Fields[field.Name] as PdfLoadedTextBoxField).Text = Convert.ToString((_obj as IDictionary<string, object>)[field.Name]);
                                }
                            }
                        }

                        doc.Form.Flatten = true;

                        pdfs.Add(doc);
                    }
                }

                PdfDocument mergedDoc = new PdfDocument();

                //PdfMergeOptions pdfMergeOptions = new PdfMergeOptions();
                //pdfMergeOptions.OptimizeResources = true;
                PdfDocument.Merge(mergedDoc, pdfs.ToArray());

                mergedDoc.Form.Flatten = true;

                MemoryStream stream = new MemoryStream();

                //Save the PDF document
                mergedDoc.Save(stream);

                stream.Position = 0;

                //Close the PDF document
                mergedDoc.Close(true);
                foreach (var pdf in pdfs)
                {
                    pdf.Close(true);
                }

                string folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:WebmergeDocumentsPath"], folderName);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string fileUrl = Path.Combine(folderPath, $"combined.pdf");

                System.IO.File.WriteAllBytes(fileUrl, stream.ToArray());

                //Stream streamResponse = null;

                //if (webmergeMapping.WebmergeObjectType == "Document")
                //{
                //    var document = await client.GetDocumentAsync(webmergeMapping.WebmergeObjectId);
                //    //streamResponse = 
                //    await client.MergeDocumentAndDownloadAsync(document.Id, document.Key, _obj, false);
                //}
                //else if (webmergeMapping.WebmergeObjectType == "Route")
                //{
                //    var route = await client.GetDataRouteAsync(webmergeMapping.WebmergeObjectId);
                //    //streamResponse = 
                //    await client.MergeDataRouteWithSingleDownloadAsync(route.Id, route.Key, _obj, false);
                //}

                UniqueId = UniqueId.Replace(".pdf", "");

                string applicantName = null, coApplicantName = null;
                string applicantEmail = null, coApplicantEmail = null;

                if (!string.IsNullOrEmpty(applicantResp))
                {
                    var applicant = JsonConvert.DeserializeObject<dynamic>(applicantResp);
                    applicantName = $"{applicant.FirstName} {applicant.LastName}";
                    applicantEmail = applicant.Email;
                }

                if (!string.IsNullOrEmpty(coapplicantResp))
                {
                    var coapplicant = JsonConvert.DeserializeObject<dynamic>(coapplicantResp);
                    coApplicantName = $"{coapplicant.FirstName} {coapplicant.LastName}";
                    coApplicantEmail = coapplicant.Email;
                }

                if (SignerBy == "FormstackSign")
                {
                    //FORMSTACK SIGN
                    //
                    var signResponse = await _formstackSignService.CreateDocumentAndSend(UniqueId, applicantName, applicantEmail, coApplicantName, coApplicantEmail, stream);

                    if (signResponse != null)
                    {
                        string id = Convert.ToString(signResponse.data.id);
                        await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, $"{UniqueId}.pdf", null, id.ToUpper(), "READY_FOR_SIGNATURE", companyid, SignerBy, DocumentType);
                    }
                }
                else if (SignerBy == "SignNow")
                {
                    //SIGN NOW
                    //
                    var document_id = await _signNowService.UploadDocument(UniqueId, stream, CompanyID);
                    var signResponse = await _signNowService.SendInvite(document_id, applicantEmail, coApplicantEmail, CompanyID);
                    var document = await _signNowService.SendEmbeddedInvite(document_id, applicantEmail, coApplicantEmail, CompanyID);

                    if (signResponse != null)
                    {
                        string id = document_id;
                        await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, $"{UniqueId}.pdf", null, id, "READY_FOR_SIGNATURE", companyid, SignerBy, DocumentType);

                        //await _signNowService.SetWebhook(document_id, "document.fieldinvite.create");
                        await _signNowService.SetWebhook(document_id, "document.fieldinvite.decline", CompanyID);
                        await _signNowService.SetWebhook(document_id, "document.fieldinvite.delete", CompanyID);
                        await _signNowService.SetWebhook(document_id, "document.complete", CompanyID);
                    }
                }

                else if (SignerBy == "DocuSign")
                {
                    // Docusign
                    var EnvelopId = await _docusignService.CreateEnvelopeAndSend(UniqueId, LoanApplicationId.ToString(), applicantName, applicantEmail, coApplicantName, coApplicantEmail, stream);

                    if (EnvelopId != null)
                    {

                        await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, $"{UniqueId}.pdf", null, EnvelopId.ToUpper(), "READY_FOR_SIGNATURE", companyid, SignerBy, DocumentType);
                    }

                }


                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Document have been generated successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception merging webmerge default mapping",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });

                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                if (ex.Message.Contains("Response status code does not indicate success: 404 ()."))
                {
                    resultResponseModel.ResponseMessage = "Please upload Bank documents";
                }

                if (ex.Message.Contains("Value cannot be null. (Parameter 'value')"))
                {
                    resultResponseModel.ResponseMessage = "Please set mappings of Bank documents";
                }

                await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, "", null, "", "FAILED", companyid, SignerBy, "");

                return Ok(resultResponseModel);
            }
        }

        private bool CheckCondition(IDictionary<string, object> data, DataRouteCondition condition)
        {
            if (data.ContainsKey(condition.field))
            {
                string actualValue = data.Where(d => d.Key == condition.field).FirstOrDefault().Value.ToString();
                switch (condition.exp)
                {
                    case "==":
                        if (condition.value == actualValue)
                        {
                            return true;
                        }
                        break;
                    case "!=":
                        if (condition.value != actualValue)
                        {
                            return true;
                        }
                        break;
                    case "<":
                        if (Convert.ToDouble(condition.value) < Convert.ToDouble(actualValue))
                        {
                            return true;
                        }
                        break;
                    case "<=":
                        if (Convert.ToDouble(condition.value) <= Convert.ToDouble(actualValue))
                        {
                            return true;
                        }
                        break;
                    case ">":
                        if (Convert.ToDouble(condition.value) > Convert.ToDouble(actualValue))
                        {
                            return true;
                        }
                        break;
                    case ">=":
                        if (Convert.ToDouble(condition.value) >= Convert.ToDouble(actualValue))
                        {
                            return true;
                        }
                        break;
                    case "contains":
                        if (actualValue.Contains(condition.value))
                        {
                            return true;
                        }
                        break;
                    case "!contains":
                        if (!actualValue.Contains(condition.value))
                        {
                            return true;
                        }
                        break;
                    default:
                        return false;
                        break;
                }
            }
            else
            {
                return false;
            }
            return false;
        }

        private async Task<string> ConvertToYearsAndMonthsString(string value)
        {
            if (value.IndexOf(',') > 0)
            {
                string[] values = value.Split(',');
                if (values.Length == 1)
                {
                    value = $"{values[0]} Year";
                }
                else if (values.Length == 2)
                {
                    value = $"{values[0]} Year, {values[1]} Month";
                }
            }
            return value;
        }

        [HttpPost]
        [Route("WebmergeWebhook")]
        public async Task<IActionResult> WebmergeWebhook([FromBody] dynamic data)
        {
            //USED (Will not be used when PDF is generated by SyncFusion code)
            try
            {
                string UniqueId = Convert.ToString(data.files[0].file_name); //$"{companyid}_{bankId}_{LoanApplicationId}";
                string FileUrl = Convert.ToString(data.files[0].file_url);
                string IsChangeOrder = data.fields.IsChangeOrder;
                string DocumentType = IsChangeOrder == "FALSE" ? "LoanDoc" : "ChangeOrder";

                UniqueId = UniqueId.Replace(".pdf", "");

                string[] val = UniqueId.Split('_');

                long companyId = Convert.ToInt64(val[0]);
                long bankId = Convert.ToInt64(val[1]);
                long loanApplicationId = Convert.ToInt64(val[2]);

                var applicantResp = await _loanApplicationService.GetApplicantInfo(Guid.Empty, companyId, loanApplicationId);
                var coapplicantResp = await _loanApplicationService.GetCoApplicantInfo(Guid.Empty, companyId, loanApplicationId);

                string applicantName = null, coApplicantName = null;
                string applicantEmail = null, coApplicantEmail = null;

                if (!string.IsNullOrEmpty(applicantResp))
                {
                    var applicant = JsonConvert.DeserializeObject<dynamic>(applicantResp);
                    applicantName = $"{applicant.FirstName} {applicant.LastName}";
                    applicantEmail = applicant.Email;
                }

                if (!string.IsNullOrEmpty(coapplicantResp))
                {
                    var coapplicant = JsonConvert.DeserializeObject<dynamic>(coapplicantResp);
                    coApplicantName = $"{coapplicant.FirstName} {coapplicant.LastName}";
                    coApplicantEmail = coapplicant.Email;
                }

                if (CommonSettings.AppSetting["CommonSettings:SignAPISourceType"] == "FormstackSign")
                {
                    //FORMSTACK SIGN
                    //

                    var signResponse = await _formstackSignService.CreateDocumentAndSend(UniqueId, applicantName, applicantEmail, coApplicantName, coApplicantEmail, FileUrl);

                    if (signResponse != null)
                    {
                        string id = Convert.ToString(signResponse.data.id);
                        await _loanDocumentHistoryService.AddNewLoanDocumentHistory(loanApplicationId, $"{UniqueId}.pdf", null, id.ToUpper(), "READY_FOR_SIGNATURE", companyId, CommonSettings.AppSetting["CommonSettings:SignAPISourceType"], DocumentType);
                    }
                }
                else if (CommonSettings.AppSetting["CommonSettings:SignAPISourceType"] == "SignNow")
                {
                    //SIGN NOW
                    //
                    //string UniqueId = Convert.ToString(data.files[0].file_name); //$"{companyid}_{bankId}_{LoanApplicationId}";
                    //string FileUrl = Convert.ToString(data.files[0].file_url);
                    //string IsChangeOrder = data.fields.IsChangeOrder;

                    var document_id = await _signNowService.UploadDocument(UniqueId, FileUrl, CompanyID);
                    var signResponse = await _signNowService.SendInvite(document_id, applicantEmail, coApplicantEmail, CompanyID);
                    var document = await _signNowService.SendEmbeddedInvite(document_id, applicantEmail, coApplicantEmail, CompanyID);
                    if (signResponse != null)
                    {
                        string id = document_id;
                        await _loanDocumentHistoryService.AddNewLoanDocumentHistory(loanApplicationId, $"{UniqueId}.pdf", null, id, "READY_FOR_SIGNATURE", companyId, CommonSettings.AppSetting["CommonSettings:SignAPISourceType"], DocumentType);

                        //await _signNowService.SetWebhook(document_id, "document.fieldinvite.create");
                        await _signNowService.SetWebhook(document_id, "document.fieldinvite.decline", CompanyID);
                        await _signNowService.SetWebhook(document_id, "document.fieldinvite.delete", CompanyID);
                        await _signNowService.SetWebhook(document_id, "document.complete", CompanyID);
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
                    LogShortMessage = $"Exception in Webmerge Webhook",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [Route("CreateWebmergeDataRoute/{bankId}")]
        public async Task<IActionResult> CreateWebmergeDataRoute([FromBody] DataRoute routeRequest, int bankId)
        {
            //USED
            //Create new Data Route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var response = await _webmergeDataRouteService.SaveWebmergeDataRoute(JsonConvert.SerializeObject(routeRequest), bankId, userId, companyId);

                return Ok(response);
                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);

                //routeRequest.Folder = $"{bankId}_Routes";

                //var dataRoute = await client.CreateDataRouteAsync(routeRequest);

                //return Ok(dataRoute);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception creating webmerge data route",
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
        [Route("GetWebmergeDataRoutes/{bankId}")]
        public async Task<IActionResult> GetWebmergeDataRoutes(int bankId)
        {
            //USED
            //Gets the list of the Data Routes
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webmergeDataRouteService.GetWebmergeDataRoutes(bankId, companyId);

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");
                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                //var dataRoutes = await client.GetDataRouteListAsync($"{bankId}_Routes");
                //return Ok(dataRoutes);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in getting Webmerge data routes",
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
        [Route("GetWebmergeDataRoute/{routeId}")]
        public async Task<IActionResult> GetWebmergeDataRoute(int routeId)
        {
            //USED
            //Get the details of the data route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webmergeDataRouteService.GetWebmergeDataRoute(routeId, companyId);

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");
                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                //var dataRoute = await client.GetDataRouteAsync(routeId);
                //return Ok(dataRoute);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in getting Webmerge data route {routeId}",
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
        [Route("GetWebmergeDataRouteRules/{routeId}")]
        public async Task<IActionResult> GetWebmergeDataRouteRules(int routeId)
        {
            //USED
            //Gets the rules (with conditions) of the route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _webmergeDataRouteService.GetWebmergeDataRouteRules(routeId, companyId);

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");

                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                //var dataRouteRules = await client.GetDataRouteRulesAsync(routeId);
                //return Ok(dataRouteRules);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in getting details of Webmerge data route {routeId}",
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
        [Route("UpdateWebmergeDataRoute")]
        public async Task<IActionResult> UpdateWebmergeDataRoute([FromBody] DataRoute dataRouteRequest)
        {
            //USED
            //Update the data route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var response = await _webmergeDataRouteService.UpdateWebmergeDataRoute(JsonConvert.SerializeObject(dataRouteRequest), userId, companyId);
                return Ok(response);
                //var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                //var response = await client.UpdateDataRoute(dataRouteRequest);
                //return Ok(response);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in updating Webmerge data route {dataRouteRequest.id}",
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
        [Route("SetDefaultWebmergeMapping/{mappingId}/{bankId}")]
        public async Task<IActionResult> GetWebmergeDataRouteRules(long mappingId, long bankId)
        {
            //USED
            //Set the default mapping for the Bank
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                await _webMergeService.SetDefaultWebmergeMapping(mappingId, bankId, companyid);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Default Mapping set successully";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in setting mapping {mappingId} as default for {bankId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;

                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDeliveries/{webmergeObjectId}/{webmergeObjectType}")]
        public async Task<IActionResult> GetDocumentDeliveries(int webmergeObjectId, string webmergeObjectType)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                List<InsuresignDeliveryRequest> data = null;
                if (webmergeObjectType == "Document")
                {
                    data = await client.GetDocumentInsuresignDeliveries(webmergeObjectId);
                }
                else if (webmergeObjectType == "Route")
                {
                    data = await client.GetRouteInsuresignDeliveries(webmergeObjectId);
                }

                return Ok(data.FirstOrDefault());
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in getting deliveries of webmerge {webmergeObjectType} {webmergeObjectId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });

                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;

                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SaveDeliveries/{webmergeObjectId}/{webmergeObjectType}")]
        public async Task<IActionResult> SaveDocumentDeliveries([FromBody] InsuresignDeliveryRequest request, int webmergeObjectId, string webmergeObjectType)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var client = new WebMergeClient(new System.Net.Http.HttpClient(), _webMergeSettings);
                InsuresignDeliveryRequest data = null;
                if (webmergeObjectType == "Document")
                {
                    data = await client.CreateInsuresignDocumentDelivery(webmergeObjectId, request);
                }
                else if (webmergeObjectType == "Route")
                {
                    data = await client.CreateInsuresignRouteDelivery(webmergeObjectId, request);
                }

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in saving Insuresign delivery for webmerge {webmergeObjectType} {webmergeObjectId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;

                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Route("InsuresignWebhook")]
        public async Task<IActionResult> UpdateStatusWebhook([FromBody] dynamic data)
        {
            //USED
            //Formstack sends the information on this webhok when document status is changed
            try
            {

                //"SIGNER_CANCELLED", "SENDER_CANCELLED", "FINALIZED"

                List<FormstackDocumentStatus> documentStatuses = new List<FormstackDocumentStatus>();
                string documentId = Convert.ToString(data.documentId);
                documentStatuses.Add(new FormstackDocumentStatus() { DocumentId = documentId });

                string eventType = Convert.ToString(data.eventType);

                double SignedDate = 0;

                bool eventIsOurSubscribed = false;

                if (eventType == "SIGNER_CANCELLED" || eventType == "SENDER_CANCELLED")
                {
                    documentStatuses[0].DocumentStatus = "CANCELLED";
                    eventIsOurSubscribed = true;
                }
                else if (eventType == "FINALIZED")
                {
                    DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                    var signedDocument = await _formstackSignService.GetDocument(Guid.Parse(documentStatuses[0].DocumentId));
                    documentStatuses[0].SignDate = FromUnixTime((double)signedDocument.Participants.Last().SignedOrApproved, epoch);
                    documentStatuses[0].DocumentStatus = signedDocument.Status;
                    SignedDate = (double)signedDocument.Participants.Last().SignedOrApproved;
                    eventIsOurSubscribed = true;
                }

                if (eventIsOurSubscribed)
                {
                    var ids = JsonConvert.DeserializeObject<SchedulerSignNotification[]>(await _webMergeService.UpdateStatusScheduler(JsonConvert.SerializeObject(documentStatuses.ToArray())));

                    if (eventType == "FINALIZED")
                    {
                        try
                        {
                            //string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                            //var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?OpportunityId={ids[0].OpportunityId}&LoanAppId={ids[0].ApplicationNumber}&SignDate={SignedDate}").Result;
                            string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];
                            var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={ids[0].LoanApplicationId}&SignDate={SignedDate}&Stage=DocumentSigned").Result;
                        }
                        catch (Exception ex)
                        {
                            Guid guid = logService.Save(new LogModel
                            {
                                LogId = Guid.NewGuid(),
                                LogType = LogTypes.Error,
                                LogShortMessage = $"Exception in Syncing Sign date to Salesforce for Loan Applicantion {ids[0].LoanApplicationId}",
                                LogLongMessage = ex.Message,
                                LogIpAddress = HttpContext.Request?.Host.Value,
                                LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                                LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                                LogCreatedBy = Guid.NewGuid(),
                                LogCreatedOn = DateTime.UtcNow
                            });
                        }

                    }

                    foreach (var item in ids)
                    {
                        List<emailDataModel> emaildata = new List<emailDataModel>();
                        emailDataModel emaildata1 = new emailDataModel();

                        List<string> userIds = new List<string>();
                        dynamic userDET = JsonConvert.DeserializeObject<dynamic>(await _webMergeService.GetCompanyAdminByAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString()));
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        //if (userDET.Count > 0)
                        //{
                        //    foreach (var usrVal in userDET)
                        //    {
                        //        userIds.Add(Convert.ToString(usrVal.AdminId));
                        //        //strUserTo = usrVal.Id;

                        //        if (string.IsNullOrEmpty(strUserTo))
                        //        {
                        //            strUserTo = Convert.ToString(usrVal.AdminId);
                        //            strCcUser = Convert.ToString(usrVal.AdminId);
                        //        }
                        //        else
                        //        {
                        //            strCcUser += (string.IsNullOrEmpty(strCcUser)) ? Convert.ToString(usrVal.AdminId) : string.Format(",{0}", Convert.ToString(usrVal.AdminId));
                        //        }
                        //    }

                        //    var notification = new NotificationSendModel
                        //    {
                        //        ToUser = null,
                        //        CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                        //        Subject = $"Bank Documents signed for Loan Application : {item.ApplicationNumber}",
                        //        SubjectBody = $"Bank Documents signed for Loan Application : {item.ApplicationNumber} by applicant. Please check your email for signed documents. A signed copy has been sent to the applicant.",
                        //        RouteUrl = "loanApplication/Detail/" + item.LoanApplicationId,
                        //        ObjectId = item.LoanApplicationId.ToString(),
                        //        CreatedBy = strUserTo,
                        //        UserIdList = userIds,
                        //        CompanyId = Convert.ToString(item.CompanyId),

                        //    };
                        //    await _realTimeService.SendNotification(notification);
                        //}

                        userIds = new List<string>();
                        //userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "usertypefinance");
                        //also send this nofication to Relationship user as requested by client--
                        // now notification is sending to Finance user, superadmin, dealer finance manager/user/admin, relatioship manager/user
                        userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "documentSignedNotification");
                        strUserTo = string.Empty;
                        strCcUser = string.Empty;
                        string emailSubject = $"Bank Documents signed for Loan Application : {item.ApplicationNumber}";
                        string emailBody = $"Bank Documents signed for Loan Application : {item.ApplicationNumber} by applicant. Please check you email for signed documents. A signed copy has been sent to the applicant.";

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
                                Subject = emailSubject,
                                SubjectBody = emailBody,
                                RouteUrl = "loanApplication/Detail/" + item.LoanApplicationId,
                                ObjectId = item.LoanApplicationId.ToString(),
                                CreatedBy = strUserTo,
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(item.CompanyId),

                            };
                            await _realTimeService.SendNotification(notification);
                        }

                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailSubject, emailBody, Convert.ToString(item.LoanApplicationId), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotificationForSignNow"], "LoanApplication", item.CompanyId.ToString());
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
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
                    LogShortMessage = $"Exception in Insuresign Webhook",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }

        }

        private DateTime FromUnixTime(double unixTime, DateTime epoch)
        {
            return epoch.AddSeconds(unixTime);
        }

        [HttpPost]
        [Route("UpdateStatusScheduler")]
        public async Task<IActionResult> UpdateStatusScheduler([FromBody] string data)
        {
            try
            {

                var ids = JsonConvert.DeserializeObject<SchedulerSignNotification[]>(await _webMergeService.UpdateStatusScheduler(data));
                foreach (var item in ids)
                {
                    List<emailDataModel> emaildata = new List<emailDataModel>();
                    emailDataModel emaildata1 = new emailDataModel();
                    List<string> userIds = new List<string>();
                    dynamic userDET = JsonConvert.DeserializeObject<dynamic>(await _webMergeService.GetCompanyAdminByAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString()));
                    string strUserTo = string.Empty;
                    string strCcUser = string.Empty;
                    if (userDET.Count > 0)
                    {
                        foreach (var usrVal in userDET)
                        {
                            userIds.Add(Convert.ToString(usrVal.AdminId));
                            //strUserTo = usrVal.Id;

                            if (string.IsNullOrEmpty(strUserTo))
                            {
                                strUserTo = Convert.ToString(usrVal.AdminId);
                                strCcUser = Convert.ToString(usrVal.AdminId);
                            }
                            else
                            {
                                strCcUser += (string.IsNullOrEmpty(strCcUser)) ? Convert.ToString(usrVal.AdminId) : string.Format(",{0}", Convert.ToString(usrVal.AdminId));
                            }
                        }

                        var notification = new NotificationSendModel
                        {
                            ToUser = null,
                            CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                            Subject = $"Bank Documents signed for Loan Application : {item.ApplicationNumber}",
                            SubjectBody = $"Bank Documents signed for Loan Application : {item.ApplicationNumber} by applicant. Please check your email for signed documents. A signed copy has been sent to the applicant.",
                            RouteUrl = "loanApplication/Detail/" + item.LoanApplicationId,
                            ObjectId = item.LoanApplicationId.ToString(),
                            CreatedBy = strUserTo,
                            UserIdList = userIds,
                            CompanyId = Convert.ToString(item.CompanyId),

                        };
                        await _realTimeService.SendNotification(notification);
                    }


                    userIds = new List<string>();
                    //userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "usertypefinance");
                    userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "documentSignedNotification");



                    strUserTo = string.Empty;
                    strCcUser = string.Empty;
                    string emailSubject = $"Bank Documents signed for Loan Application : {item.ApplicationNumber}";
                    string emailBody = $"Bank Documents signed for Loan Application : {item.ApplicationNumber} by applicant. Please check you email for signed documents. A signed copy has been sent to the applicant.";

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
                            Subject = emailSubject,
                            SubjectBody = emailBody,
                            RouteUrl = "loanApplication/Detail/" + item.LoanApplicationId,
                            ObjectId = item.LoanApplicationId.ToString(),
                            CreatedBy = strUserTo,
                            UserIdList = userIds,
                            CompanyId = Convert.ToString(item.CompanyId),

                        };
                        await _realTimeService.SendNotification(notification);
                    }
                    try
                    {
                        if (emaildata != null)
                        {
                            Hashtable htbl = new Hashtable();
                            await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailSubject, emailBody, Convert.ToString(item.LoanApplicationId), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotificationForSignNow"], "LoanApplication", item.CompanyId.ToString());
                        }
                    }
                    catch
                    {
                        HttpContext.Session.Clear();
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
                    LogShortMessage = $"Exception in updating status of scheduler",
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
        [Route("GetLoanDocumentHistoryByStatus/{status}")]
        public async Task<IActionResult> GetLoanDocumentHistoryByStatus(string status)
        {
            try
            {
                var data = await _webMergeService.GetLoanDocumentHistoryByStatus(status);
                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in getting loan document history by status {status}",
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
        [Route("DownloadBankDocument")]
        public async Task<IActionResult> DownloadBankDocument(string documentId, string SourceType, string SolgenFileUrl, string LoanAppId)
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
                        file = await _signNowService.DownloadDocument(documentId, CompanyID);
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
                    return BadRequest();
                }

                return File(fileContents: file,
                    contentType: $"application/pdf");
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
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SignnowWebhook")]
        public async Task<IActionResult> SignnowWebhook([FromBody] dynamic data)
        {
            //USED
            //SignNow sends the information on this webhok when document status is changed
            List<FormstackDocumentStatus> documentStatuses = new List<FormstackDocumentStatus>();
            string documentId = Convert.ToString(data.content.document_id);

            documentStatuses.Add(new FormstackDocumentStatus() { DocumentId = documentId });

            string eventType = Convert.ToString(data.meta.@event);

            double SignedDate = 0;

            bool eventIsOurSubscribed = false;

            if (eventType == "document.fieldinvite.decline" || eventType == "document.fieldinvite.delete")
            {
                documentStatuses[0].DocumentStatus = "CANCELLED";
                eventIsOurSubscribed = true;
            }
            else if (eventType == "document.complete")
            {
                DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                documentStatuses[0].SignDate = FromUnixTime(Convert.ToDouble(data.meta.timestamp), epoch);
                documentStatuses[0].DocumentStatus = "FINALIZED";
                SignedDate = Convert.ToDouble(data.meta.timestamp);
                eventIsOurSubscribed = true;
            }

            if (eventIsOurSubscribed)
            {
                var ids = JsonConvert.DeserializeObject<SchedulerSignNotification[]>(await _webMergeService.UpdateStatusScheduler(JsonConvert.SerializeObject(documentStatuses.ToArray())));

                if (eventType == "document.complete")
                {
                    try
                    {
                        string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];

                        if (ids[0].OpportunityId != null && ids[0].OpportunityId != "")
                        {
                            var response1 = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanAppId={ids[0].LoanApplicationId}&SignDate={SignedDate}&OpportunityId={ids[0].OpportunityId}").Result;
                        }
                        var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={ids[0].LoanApplicationId}&SignDate={SignedDate}&Stage=DocumentSigned").Result;
                    }
                    catch (Exception ex)
                    {
                        Guid guid = logService.Save(new LogModel
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = $"Exception in Syncing Sign date to Salesforce for Loan Applicantion {ids[0].LoanApplicationId}",
                            LogLongMessage = ex.Message,
                            LogIpAddress = HttpContext.Request?.Host.Value,
                            LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                            LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.UtcNow
                        });
                    }

                }

                foreach (var item in ids)
                {
                    List<emailDataModel> emaildata = new List<emailDataModel>();
                    emailDataModel emaildata1 = new emailDataModel();
                    List<string> userIds = new List<string>();
                    dynamic userDET = JsonConvert.DeserializeObject<dynamic>(await _webMergeService.GetCompanyAdminByAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString()));
                    string strUserTo = string.Empty;
                    string strCcUser = string.Empty;

                    userIds = new List<string>();
                    //userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "usertypefinance");
                    //also send this nofication to Relationship user as requested by client--
                    // now notification is sending to Finance user, superadmin, dealer finance manager/user/admin, relatioship manager/user, sales user
                    userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "documentSignedNotification");

                    strUserTo = string.Empty;
                    strCcUser = string.Empty;
                    string emailSubject = $"Bank Documents signed for Loan Application : {item.ApplicationNumber}";
                    string emailubjectBody = $"Bank Documents signed for Loan Application : {item.ApplicationNumber} by applicant. Please check you email for signed documents. A signed copy has been sent to the applicant.";
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
                            Subject = emailSubject,
                            SubjectBody = emailubjectBody,
                            RouteUrl = "loanApplication/Detail/" + item.LoanApplicationId,
                            ObjectId = item.LoanApplicationId.ToString(),
                            CreatedBy = strUserTo,
                            UserIdList = userIds,
                            CompanyId = Convert.ToString(item.CompanyId),

                        };
                        _realTimeService.SendNotification(notification);

                    }

                    try
                    {
                        if (emaildata != null)
                        {


                            var j = System.Text.Json.JsonSerializer.Serialize(emaildata);

                            _webMergeService.SaveSignowEmailNotifications(j, emailSubject, emailubjectBody, item.LoanApplicationId, item.CompanyId);

                            // _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailSubject, emailubjectBody, Convert.ToString(item.LoanApplicationId), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", item.CompanyId.ToString());


                        }

                    }
                    catch
                    {
                        HttpContext.Session.Clear();
                    }
                }
            }
            return Ok();
        }


        [HttpPost]
        [Route("DocusignWebhook")]
        public async Task<IActionResult> DocusignWebhook([FromBody] dynamic data)
        {
            try
            {

                var d = (object)data;

                Docusign_Webhook obj = JsonConvert.DeserializeObject<Docusign_Webhook>(d.ToString());



                List<FormstackDocumentStatus> documentStatuses = new List<FormstackDocumentStatus>();
                documentStatuses.Add(new FormstackDocumentStatus() { DocumentId = obj.envelopeId });
                bool eventIsOurSubscribed = false;

                if (obj.status == "declined" || obj.status == "Declined")
                {
                    documentStatuses[0].DocumentStatus = "CANCELLED";
                    eventIsOurSubscribed = true;
                }
                else if (obj.status == "completed" || obj.status == "Completed")
                {
                    documentStatuses[0].SignDate = obj.completedDateTime;
                    documentStatuses[0].DocumentStatus = "FINALIZED";
                    eventIsOurSubscribed = true;
                }

                //return obj.status + " " + obj.completedDateTime;

                if (eventIsOurSubscribed)
                {
                    var ids = JsonConvert.DeserializeObject<SchedulerSignNotification[]>(await _webMergeService.UpdateStatusScheduler(JsonConvert.SerializeObject(documentStatuses.ToArray())));

                    if (obj.status == "completed" || obj.status == "Completed")
                    {
                        try
                        {
                            string apilink = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];

                            if (ids[0].OpportunityId != null && ids[0].OpportunityId != "")
                            {

                                var response1 = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanAppId={ids[0].LoanApplicationId}&DocuSignDate={obj.completedDateTime}&OpportunityId={ids[0].OpportunityId}").Result;
                            }
                            var response = httpClient.GetAsync($"{apilink}/Home/UpdateContractStatus?LoanId={ids[0].LoanApplicationId}&DocuSignDate={obj.completedDateTime}&Stage=DocumentSigned").Result;
                        }
                        catch (Exception ex)
                        {
                            Guid guid = logService.Save(new LogModel
                            {
                                LogId = Guid.NewGuid(),
                                LogType = LogTypes.Error,
                                LogShortMessage = $"Exception in Syncing Sign date to Salesforce for Loan Applicantion {ids[0].LoanApplicationId}",
                                LogLongMessage = ex.Message,
                                LogIpAddress = HttpContext.Request?.Host.Value,
                                LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                                LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                                LogCreatedBy = Guid.NewGuid(),
                                LogCreatedOn = DateTime.UtcNow
                            });
                        }

                    }

                    foreach (var item in ids)
                    {
                        List<emailDataModel> emaildata = new List<emailDataModel>();
                        emailDataModel emaildata1 = new emailDataModel();
                        List<string> userIds = new List<string>();
                        dynamic userDET = JsonConvert.DeserializeObject<dynamic>(await _webMergeService.GetCompanyAdminByAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString()));
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;

                        userIds = new List<string>();
                        //userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "usertypefinance");
                        //also send this nofication to Relationship user as requested by client--
                        // now notification is sending to Finance user, superadmin, dealer finance manager/user/admin, relatioship manager/user, sales user
                        userDET = _loanService.GetUserDetailByUserTypeAppId(item.LoanApplicationId.ToString(), item.CompanyId.ToString(), "documentSignedNotification");

                        strUserTo = string.Empty;
                        strCcUser = string.Empty;
                        string emailSubject = $"Bank Documents signed for Loan Application : {item.ApplicationNumber}";
                        string emailubjectBody = $"Bank Documents signed for Loan Application : {item.ApplicationNumber} by applicant. Please check you email for signed documents. A signed copy has been sent to the applicant.";
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
                                Subject = emailSubject,
                                SubjectBody = emailubjectBody,
                                RouteUrl = "loanApplication/Detail/" + item.LoanApplicationId,
                                ObjectId = item.LoanApplicationId.ToString(),
                                CreatedBy = strUserTo,
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(item.CompanyId),

                            };
                            _realTimeService.SendNotification(notification);

                        }

                        try
                        {
                            if (emaildata != null)
                            {


                                var j = System.Text.Json.JsonSerializer.Serialize(emaildata);

                                _webMergeService.SaveSignowEmailNotifications(j, emailSubject, emailubjectBody, item.LoanApplicationId, item.CompanyId);

                                // _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailSubject, emailubjectBody, Convert.ToString(item.LoanApplicationId), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", item.CompanyId.ToString());


                            }

                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in DocuSign Webhook",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });

            }

            return Ok();
        }


        [HttpGet]
        [Route("GetUsersForEmailNotification")]
        public async Task<IActionResult> SendEmailNotification()
        {
            string loanId = null;
            try
            {
                dynamic userDET = _webMergeService.GetUsersForEmailNotification();

                if (userDET.Count > 0)
                {
                    List<emailDataModel> emaildata = new List<emailDataModel>();
                    emailDataModel emaildata1 = new emailDataModel();
                    string[] userName = null;
                    string[] emails = null;
                    string subject = null;
                    string body = null;

                    string companyid = null;
                    long SendEmailId = 0;
                    foreach (var usrVal1 in userDET)
                    {
                        userName = usrVal1.Emailusers.Split(",");
                        emails = usrVal1.Email.Split(",");
                        subject = usrVal1.EmailSubject;
                        body = usrVal1.EmailBody;
                        loanId = Convert.ToString(usrVal1.LoanAppId);
                        companyid = Convert.ToString(usrVal1.CompanyId);
                        SendEmailId = usrVal1.Id;
                    }

                    for (int i = 0; i < userName.Length; i++)
                    {
                        emaildata1 = new emailDataModel();
                        emaildata1.name = userName[i];
                        emaildata1.email = emails[i];
                        emaildata.Add(emaildata1);

                    }

                    Hashtable htbl = new Hashtable();
                    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, subject, body, loanId, Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotificationForSignNow"], "LoanApplication", companyid, SendEmailId);
                }
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in Send Email Notification SignNow for Loan Applicantion {loanId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
            }

            return Ok();
        }


        [HttpGet]
        [Authorize]
        [Route("GetSignNowDocumentHistory/{documentid}")]
        public async Task<IActionResult> GetSignNowDocumentHistory(string documentId)
        {
            //USED
            //Get SignNow Document history (when downloaded, when opened, when signed, etc.)
            try
            {
                var history = await _signNowService.GetDocumentHistory(documentId, CompanyID);

                return Ok(history);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocusignDocumentHistory/{documentid}")]
        public async Task<List<DocusignEventField>> GetDocusignDocumentHistory(string documentId)
        {
            //USED
            //Get Docusign Document history (when downloaded, when opened, when signed, etc.)
            try
            {
                var history = await _docusignService.GetDocusingEnvelop_History(documentId);

                List<DocusignEventField> listobj = new List<DocusignEventField>(); ;

                DocusignEventField obj;

                if (history != null)
                {
                    if (history.AuditEvents != null)
                    {
                        foreach (var item in history.AuditEvents)
                        {

                            obj = new DocusignEventField();
                            foreach (var i in item.EventFields)
                            {

                                if (i.Name == "logTime")
                                    obj.Date = i.Value;
                                else if (i.Name == "UserName")
                                    obj.user = i.Value;
                                else if (i.Name == "Action")
                                    obj.Action = i.Value;
                                else if (i.Name == "Message")
                                    obj.Message = i.Value;
                                else if (i.Name == "EnvelopeStatus")
                                    obj.status = i.Value;

                            }

                            listobj.Add(obj);

                        }
                    }
                }
                return listobj;



            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in GetDocusignDocumentHistory " + documentId,
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

    }



    public class SchedulerSignNotification
    {
        public long LoanApplicationId { get; set; }
        public long CompanyId { get; set; }
        public string ApplicationNumber { get; set; }
        public string OpportunityId { get; set; }
    }

    public class FormstackDocumentStatus
    {
        public string DocumentId { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DocumentStatus { get; set; }
        public DateTime? SignDate { get; set; }
    }

    public class DataRouteCondition
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long id { get; set; }
        public string field { get; set; }
        public string exp { get; set; }
        public string value { get; set; }
        public string @operator { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool deleted { get; set; }
    }

    public class DataRouteRule
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long id { get; set; }
        public long document_id { get; set; }
        public int sort { get; set; }
        public int combine { get; set; }
        public DataRouteCondition[] conditions { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool deleted { get; set; }
    }

    public class DataRoute
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long id { get; set; }
        public string name { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string folder { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long BankId { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long CompanyId { get; set; }
        public DataRouteRule[] rules { get; set; }
    }
}
