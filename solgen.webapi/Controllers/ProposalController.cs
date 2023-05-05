using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.Services;
using Syncfusion.Drawing;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Parsing;
using System.Text.RegularExpressions;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/proposal")]
    public class ProposalController : Controller
    {
        private IProposalService _proposalService;
        private IVendorService _vendorService;
        private readonly ICommonService _commonService;
        private IWorkOrderService _workOrderService;
        private readonly IHttpContextAccessor _httpContext;

        private readonly ISignNowService _signNowService; //Handles SingNow API calls
        private readonly IFormstackSignService _formstackSignService; //Handles Formstack Sing API calls (NOT IN USE)
        private IConfigurationSettingService _configurationSettingService;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        public ILogService logService { get; }
        public ProposalController(IConfigurationSettingService configurationSetting, ILogService logService, IFormstackSignService formstackSignService, ISignNowService signNowService, IProposalService proposalService, IWorkOrderService workOrderService, ICommonService commonService, IHttpContextAccessor httpContext, IVendorService vendorService)
        {
            _configurationSettingService = configurationSetting;
            _proposalService = proposalService;
            _commonService = commonService;
            _httpContext = httpContext;
            _vendorService = vendorService;
            _workOrderService = workOrderService;
            _signNowService = signNowService;
            _formstackSignService = formstackSignService;
            this.logService = logService;
        }
        public IActionResult Index()
        {
            return Ok();
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetproposalList")]
        public async Task<IActionResult> GetproposalList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var lst =await _proposalService.GetproposalList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetProposalDetailsbyid")]
        public async Task<IActionResult> GetProposalDetailsbyid(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _proposalService.GetProposalDetailsbyid(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("SetPrimaryProposal")]
        public async Task<IActionResult> SetPrimaryProposal(string proposalId, string opportunityId, bool value)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _proposalService.SetPrimaryProposal(companyid, Convert.ToInt32(proposalId), Convert.ToInt32(opportunityId), value);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditproposal")]
        public async Task<IActionResult> AddEditproposal([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                model.userId = userid;
                model.companyId = companyid;
                string data = _proposalService.AddEditproposal(model);
                if (model.Id != null && model.Id != "")
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = "Proposal has been updated successfully.";
                }
                else
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = "Proposal has been created successfully.";
                }
                if(data == null)
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
        [Route("GetAssociateProductList")]
        public IActionResult GetAssociateProductList(long? proposalId, long? opportunityId, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _proposalService.GetAssociateProductList(proposalId, opportunityId, companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetPriceBookListDetail")]
        public IActionResult GetPriceBookListDetail(long Productid, string SortColumn, string SortDir, int PageNo, int PageSize)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _proposalService.GetPriceBookListDetail(Productid, SortColumn, SortDir, PageNo, PageSize, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetAssociateProductWithProposalLineItemList")]
        public IActionResult GetAssociateProductWithProposalLineItemList(long? proposalId, long? opportunityId, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _proposalService.GetAssociateProductWithProposalLineItemList(proposalId, opportunityId, companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpPost]
        [Authorize]
        [Route("AddUpdateLineItem")]
        public IActionResult AddUpdateLineItem([FromForm] LineItemModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            model.CompanyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (model != null)
            {
                var data = _proposalService.AddUpdateLineItem(model);
                if (model.lineItemId == null)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Line Item has been inserted successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Line Item has been updated successfully.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Some thing went wrong, Please try again later!.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("DeleteProduct")]
        public IActionResult DeleteProduct(string productId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = _proposalService.DeleteProduct(productId, CompanyId);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                if (result == 1)
                {
                    // _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has Deleted Master");
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Company has been Deleted successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    //_commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " Error occurs while deleting master record, Master");
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while deleting Company record";
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

        [HttpPost]
        [Authorize]
        [Route("addOrUpdateFiles")]
        public async Task<IActionResult> addOrUpdateFiles([FromForm] ProposalFilesModel model)
        {
            try
            {
                string filePath = ""; string filePrefix = ""; enumFileFolder enumfoldername;

                if (model.isLead == false && model.isWorkorder == false && model.isProposal == true)
                {
                    filePath = CommonSettings.AppSetting["CommonSettings:UploadProposalViewDataSave"];
                    filePrefix = "ViewProposal";
                    enumfoldername = enumFileFolder.propsoalFileDataSave;
                }
                else
                {
                    filePath = CommonSettings.AppSetting["CommonSettings:UploadServiceResourceData"];
                    filePrefix = "ServiceResouce";
                    enumfoldername = enumFileFolder.serviceResourceFile;
                }

                ResultResponseModel result = new ResultResponseModel();
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CompanyId = CompanyID;
                model.Userid = userid;
                if (Request.Form.Files.Count > 0)
                {
                    var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
                    model.FileName = fileResult.Item1 ?? "";
                }



                //string fileUrl = CommonFunctions.GetFileLink(model.FileName, "image", enumfoldername);
                //string fileUrl = CommonFunctions.GetFileLink(model.FileName, "image", enumfoldername);
                //string fileUrl = "/Documents/Proposal/" + model.FileName;
                //if (fileUrl.Contains("defaultNoImage"))
                //{
                //    fileUrl = "javascript:void(0);";

                //}                
                //else
                //{

                //    fileUrl = fileUrl.Replace("wwwroot", "");
                //}
                string fileUrl = CommonFunctions.GetFileLink(model.FileName, "image", enumfoldername);
                if (fileUrl.Contains("defaultNoImage"))
                {
                    fileUrl = "javascript:void(0);";

                }
                else
                {

                    fileUrl = fileUrl.Replace("wwwroot", "");
                }
                if (model.isProposal)
                {
                    string domainName = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                    fileUrl = fileUrl.Replace(domainName, "");
                }
                model.FileUrl = fileUrl;
                model.Type = Path.GetExtension(model.FileUrl);
                var data = _proposalService.addOrUpdateFiles(model);
                if (model.Id == null || model.Id == "")
                {

                    result.ResponseMessage = "Files has been uploaded successfully.";
                }
                else
                {
                    result.ResponseMessage = "Files  has been uploaded successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetProposalLineItemList")]
        public async Task<IActionResult> GetProposalLineItemList(long? proposalId, long? opportunityId, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _proposalService.GetProposalLineItemList(proposalId, opportunityId, companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("ValidateUtilityAccount")]


        [HttpGet]
        [Authorize]
        [Route("VoidGenerateDocument")]
        public IActionResult VoidGenerateDocument(long DocumentMappingId, long ProposalId, string submodule)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var result = _proposalService.VoidGenerateDocument(DocumentMappingId, userid, ProposalId);
                if (result == 1)
                {
                    // _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has Deleted Master");
                    var data = _proposalService.GetMappingListv1(submodule, CompanyID, ProposalId);
                    resultResponseModel.Result = data;
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Document has been voided successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    //_commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " Error occurs while deleting master record, Master");
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while voiding document";
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

        public IActionResult ValidateUtilityAccount([FromBody] ProposalModel.CheckProposal model)
        {

            ResultResponseModel result = new ResultResponseModel();
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var data = _proposalService.ValidateUtilityAccount(model.Ids, Convert.ToInt64(companyid));
            if (data == "NotExists")
            {
                result.StatusCode = 201;
                result.ResponseMessage = "You can't add/Update new record because you need to add a Utility Account Number and a Meter Number OR Select No Utility Account or Meter Number .";
            }
            else
            {

            }

            return Ok(result);

        }

        [Authorize]
        [HttpGet]
        [Route("GetOpportunityList")]
        public async Task<ActionResult> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            try
            {
                var data = await _proposalService.GetOpportunityList(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyID, userId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocument")] //Preview document
        public IActionResult GetDocument(long proposalId, string mappingId, string submodule)
        {
            try
            {
                string idsList = mappingId.Replace("undefined", "");
                string[] values = idsList.Split(',');
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:ReplacedDocument"]);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                var fileUrl = Path.Combine(folderPath, $"combined.pdf");
                var mergedDoc = new PdfDocument();
                var stream = new MemoryStream();
                var pdfs = new List<PdfLoadedDocument>();
                foreach (var id in values)
                {
                    var documentMapping = _proposalService.GetDocumentProposalByMappingId(submodule.ToLower(), CompanyID, Convert.ToInt64(id), proposalId);

                    foreach (var item in documentMapping)
                    {
                        var client = new WebClient();
                        var content = client.DownloadData(item.FileUrl);
                        var fileStream = new MemoryStream(content);
                        var doc = new PdfLoadedDocument(fileStream);

                        foreach (PdfPageBase page in doc.Pages)
                        {
                            var loadedPage = page;
                            var graphics = loadedPage.Graphics;
                            var font = new PdfStandardFont(PdfFontFamily.Helvetica, 30);
                            var state = graphics.Save();
                            graphics.RotateTransform(-40);
                            graphics.SetTransparency(0.25f);
                            graphics.DrawString("Solgen Power Preview", font, PdfPens.Red, PdfBrushes.Red, new PointF(-30, 500));
                            graphics.Restore(state);
                        }

                        doc.Form.Flatten = true;
                        pdfs.Add(doc);
                    }
                }
                PdfDocument.Merge(mergedDoc, pdfs.ToArray());
                mergedDoc.Form.Flatten = true;

                mergedDoc.Save(stream);
                stream.Position = 0;

                mergedDoc.Close(true);
                foreach (var pdf in pdfs)
                {
                    pdf.Close(true);
                }
                System.IO.File.WriteAllBytes(fileUrl, stream.ToArray());
                var bytes = System.IO.File.ReadAllBytes(fileUrl);
                var pdfBase64 = Convert.ToBase64String(bytes);
                System.IO.File.Delete(fileUrl);
                return Ok(pdfBase64);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetDocumentMappingListV1")]
        public IActionResult GetDocumentMappingListV1(long proposalId,string subModule)
        {
            try
            {
                var data = _proposalService.GetMappingList(subModule, CompanyID, proposalId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocumentMappingList")]
        public IActionResult GetDocumentMappingList(long proposalId)
        {
            try
            {
                var data = _proposalService.GetMappingList("proposal", CompanyID, proposalId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetDocumentMappingsList")]
        public IActionResult GetDocumentMappingsList(long proposalId, string subModuleName)
        {
            try
            {
                var data = _proposalService.GetMappingList(subModuleName, CompanyID, proposalId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetTempalteList")]
        public IActionResult GetTempalteList(long ProposalId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _proposalService.GetTempalteList(companyid, ProposalId);
            return Ok(result);
        }

        //[HttpGet]
        //[Authorize]
        //[Route("GetGenerateMappingList")]
        //public IActionResult GetGenerateMappingList(long proposalId)
        //{
        //    try
        //    {
        //        var data = _proposalService.GetMappingListv1("proposal", CompanyID, proposalId);
        //        return Ok(data);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}


        [HttpGet]
        [Authorize]
        [Route("GetGenerateMappingList")]
        public IActionResult GetGenerateMappingList(long proposalId, string subModuleName)
        {
            try
            {
                var data = _proposalService.GetMappingListv1(subModuleName, CompanyID, proposalId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetProposalDocumentList")]
        public async Task<ActionResult> GetProposalDocumentList(long Id)
        {

            try
            {
                var data = await _proposalService.GetProposalDocumentList(Id);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }




        [HttpPost]
        [Authorize]
        [Route("SendDocumentSignNow")]
        //public async Task<IActionResult> SendDocumentSignNow(long proposalId, string mappingIds, string sendingSource, long deliveryId, string subject, dynamic body)
        //{
        public async Task<IActionResult> SendDocumentSignNow([FromBody] dynamic modelpar)
        {
            string json = JsonConvert.SerializeObject(modelpar);
            long proposalId1 = Convert.ToInt64(JObject.Parse(json)["proposalId"]);

            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                

                var errorList = new List<string>();
                string idsList = Convert.ToString(JObject.Parse(json)["mappingIds"]).Replace("undefined", "");
                string sendingSource = Convert.ToString(JObject.Parse(json)["sendingSource"]);
                string body = Convert.ToString(JObject.Parse(json)["body"]);
                string subject = Convert.ToString(JObject.Parse(json)["subject"]);
                string onlyhtml = Convert.ToString(JObject.Parse(json)["onlyhtml"]);
                long proposalId = Convert.ToInt64(JObject.Parse(json)["proposalId"]);
                string submodule = Convert.ToString(JObject.Parse(json)["submodule"]); 

                string[] values = idsList.Split(',');
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string applicantName = "Proposal Document", coApplicantName = "test sign now";
                string signer1Email = string.Empty, signer2Email = string.Empty, email = string.Empty, ccemail = string.Empty;
                var isEmail = false;
                var isSignNow = false;
                var mergedDoc = new PdfDocument();
                var stream = new MemoryStream();
                bool ishtml = false;
                string htmlUrl = "";
                var pdfs = new List<PdfLoadedDocument>();
                List<dynamic> statusUpdateList = new List<dynamic>();
                bool hasattachment = false;
                foreach (var mappingId in values)
                {

                    var documentMapping = _proposalService.GetDocumentProposalByMappingId(submodule.ToLower(), CompanyID, Convert.ToInt64(mappingId), proposalId);
                    int innercount = documentMapping.Count;
                    foreach (var item in documentMapping)
                    {
                        if (item.DocumentType == "html")
                        {
                            statusUpdateList.Add(new { Id = mappingId, DocId = item.Id });
                            if (!ishtml)
                            {
                                var host = HttpContext.Request?.Host;
                                var siteUrl = "";

                                if (host.HasValue)
                                {
                                    if (host?.Value == "localhost:8530")
                                    {
                                        siteUrl = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationLocalDomainLink"];
                                    }
                                    else
                                    {
                                        siteUrl = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationStageDomainLink"];
                                    }
                                }
                                else
                                {
                                    siteUrl = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationStageDomainLink"];
                                }
                                //var model = _configurationSettingService.getcompanySetupDetail(CompanyID);
                                //if (model.SiteUrl != null)
                                //{
                                //    siteUrl = model.SiteUrl + "/";
                                //    //return BadRequest("From Email should not be empty.");
                                //}
                                //else
                                //{
                                //    siteUrl =  siteUrl = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                                //}

                                ishtml = true;
                                string EncryptyURL =  _commonService.GetEcryptedId(proposalId);
                                htmlUrl = "<a href=\"" + siteUrl + "/proposal-document/"  + HttpUtility.UrlEncode(EncryptyURL) + "/system" + "\">Click to view Html Templates</a>";

                            } 
                            if (!sendingSource.ToLower().Equals("signnow"))
                            {
                                if (onlyhtml == "yes")
                                {
                                    if (item.DeliveryOption != null)
                                    {
                                        var deliveryOption = JsonConvert.DeserializeObject<DeliveryOption>(item.DeliveryOption);
                                        var customeFieldIdList = new List<string>()
                                            {
                                                deliveryOption.SendToOption //I am getting custom filed id in this variable

                                            };
                                        if (!string.IsNullOrEmpty(deliveryOption.ccEmailOption))
                                        {
                                            customeFieldIdList.Add(deliveryOption.ccEmailOption);
                                        }

                                        //if (string.IsNullOrEmpty(deliveryOption.SendToOption))
                                        //{
                                        //    errorList.Add("Receiver Email is not valid.");
                                        //    //return BadRequest("Receiver Email should not be empty.");
                                        //}
                                        //if (string.IsNullOrEmpty(deliveryOption.ccEmail))
                                        //{
                                        //    errorList.Add("CC Email should not be empty.");
                                        //    //return BadRequest("CC Email should not be empty.");
                                        //}
                                        var data = _proposalService.GetValuesByCustomFieldIdForProposal(CompanyID.ToString(), userid, "crm",
                                              proposalId.ToString(), string.Join(',', customeFieldIdList), submodule.ToLower());
                                        if (!string.IsNullOrEmpty(deliveryOption.SendToOption))
                                        {
                                            var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
                                            response.All = new List<Data>();
                                            if (response.Products != null)
                                            {
                                                response.All.AddRange(response.Products);
                                            }
                                            if (response.account != null)
                                            {
                                                response.All.AddRange(response.account);
                                            }
                                            if (response.contact != null)
                                            {
                                                response.All.AddRange(response.contact);
                                            }
                                            if (response.loanproduct != null)
                                            {
                                                response.All.AddRange(response.loanproduct);
                                            }
                                            if (response.opportunity != null)
                                            {
                                                response.All.AddRange(response.opportunity);
                                            }
                                            if (response.pricebookentity != null)
                                            {
                                                response.All.AddRange(response.pricebookentity);
                                            }
                                            if (response.proposal != null)
                                            {
                                                response.All.AddRange(response.proposal);
                                            }
                                            if (response.serviceterritory != null)
                                            {
                                                response.All.AddRange(response.serviceterritory);
                                            }
                                            if (response.workorder != null)
                                            {
                                                response.All.AddRange(response.workorder);
                                            }
                                            if (response.contract != null)
                                            {
                                                response.All.AddRange(response.contract);
                                            }
                                            email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.SendToOption) && !string.IsNullOrEmpty(m.value))?.value;
                                            if (email == null)
                                            {
                                                //errorList.Add("Receiver Email should not be empty.");
                                                ////return BadRequest("Receiver Email should not be empty.");
                                                //if (!IsValidEmail(email))
                                                //{
                                                //    errorList.Add("Receiver Email is not valid.");
                                                //    //return BadRequest("Receiver Email is not valid.");
                                                //}
                                            }
                                            if (!string.IsNullOrWhiteSpace(deliveryOption.ccEmail))
                                            {
                                                if (deliveryOption.ccEmailOption != null)
                                                {
                                                    ccemail = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.ccEmailOption) && !string.IsNullOrEmpty(m.value))?.value;
                                                }
                                                else
                                                {
                                                    ccemail = deliveryOption.ccEmail;
                                                }
                                            }
                                            //if (ccemail == null)
                                            //{
                                            //    errorList.Add("CC Email should not be empty.");

                                            //    if (!IsValidEmail(ccemail))
                                            //    {
                                            //        errorList.Add("CC Email is not valid.");

                                            //    }
                                            //}
                                        }
                                        else
                                        {

                                        }

                                    }
                                }
                            }

                        }
                        else
                        {
                            hasattachment = true;
                            statusUpdateList.Add(new { Id = mappingId, DocId = item.Id });
                            var client = new WebClient();
                            var content = client.DownloadData(item.FileUrl);
                            var fileStream = new MemoryStream(content);
                            var doc = new PdfLoadedDocument(fileStream);
                            var form = doc.Form;
                            if (sendingSource.ToLower().Equals("signnow"))
                            {
                                var customFields = JsonConvert.DeserializeObject<List<CustomFieldMapper>>(item.Fields);
                                if (item.DeliveryOption != null)
                                {
                                    var deliveryOption = JsonConvert.DeserializeObject<DeliveryOption>(item.DeliveryOption);
                                    if (string.IsNullOrEmpty(deliveryOption.Signer1Option))
                                    {
                                        errorList.Add("Signer 1 is not mapped.");
                                        //return BadRequest("Signer 1 should not be empty.");
                                    }
                                    else if (deliveryOption.Signer1Option != null)
                                    {
                                        var customeFieldIdList = new List<string>
                                    {
                                        deliveryOption.Signer1Option
                                    };
                                        if (!string.IsNullOrEmpty(deliveryOption.Signer2Option))
                                        {
                                            customeFieldIdList.Add(deliveryOption.Signer2Option);
                                        }

                                        var data = _proposalService.GetValuesByCustomFieldIdForProposal(CompanyID.ToString(), userid, "crm",
                                              proposalId.ToString(), string.Join(',', customeFieldIdList),submodule.ToLower());
                                        var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
                                        response.All = new List<Data>();
                                        if (response.Products != null)
                                        {
                                            response.All.AddRange(response.Products);
                                        }
                                        if (response.account != null)
                                        {
                                            response.All.AddRange(response.account);
                                        }
                                        if (response.contact != null)
                                        {
                                            response.All.AddRange(response.contact);
                                        }
                                        if (response.loanproduct != null)
                                        {
                                            response.All.AddRange(response.loanproduct);
                                        }
                                        if (response.opportunity != null)
                                        {
                                            response.All.AddRange(response.opportunity);
                                        }
                                        if (response.pricebookentity != null)
                                        {
                                            response.All.AddRange(response.pricebookentity);
                                        }
                                        if (response.proposal != null)
                                        {
                                            response.All.AddRange(response.proposal);
                                        }
                                        if (response.serviceterritory != null)
                                        {
                                            response.All.AddRange(response.serviceterritory);
                                        }
                                        if (response.workorder != null)
                                        {
                                            response.All.AddRange(response.workorder);
                                        }
                                        if (response.contract != null)
                                        {
                                            response.All.AddRange(response.contract);
                                        }                                       
                                        if (data == null) continue;
                                        {
                                            signer1Email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.Signer1Option) && !string.IsNullOrEmpty(m.value))?.value;
                                            if (signer1Email == null)
                                            {
                                                errorList.Add("Signer 1 should not be empty.");
                                                //return BadRequest("Signer 1 should not be empty.");
                                            }
                                            if (!IsValidEmail(signer1Email))
                                            {
                                                errorList.Add("Signer 1 email is not valid.");
                                                //return BadRequest("Signer 1 email is not valid.");
                                            }

                                            signer2Email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.Signer2Option) && !string.IsNullOrEmpty(m.value))?.value;
                                            //if (signer2Email == null)
                                            //{
                                            //    return BadRequest("Signer 2 should not be empty.");
                                            //}
                                            if (!string.IsNullOrEmpty(signer2Email) && !IsValidEmail(signer2Email))
                                            {
                                                errorList.Add("Signer 2 email is not valid.");
                                                //return BadRequest("Signer 2 email is not valid.");
                                            }
                                        }

                                    }
                                }
                            }
                            else
                            {
                                if (item.DeliveryOption != null)
                                {
                                    var deliveryOption = JsonConvert.DeserializeObject<DeliveryOption>(item.DeliveryOption);
                                    var customeFieldIdList = new List<string>()
                                    {
                                        deliveryOption.SendToOption //I am getting custom filed id in this variable

                                    };
                                    if (!string.IsNullOrEmpty(deliveryOption.ccEmailOption))
                                    {
                                        customeFieldIdList.Add(deliveryOption.ccEmailOption);
                                    }

                                    if (string.IsNullOrEmpty(deliveryOption.SendToOption))
                                    {
                                        errorList.Add("Receiver Email is not valid.");
                                        //return BadRequest("Receiver Email should not be empty.");
                                    }
                                    if (string.IsNullOrEmpty(deliveryOption.ccEmail))
                                    {
                                        errorList.Add("CC Email should not be empty.");
                                        //return BadRequest("CC Email should not be empty.");
                                    }
                                    var data = _proposalService.GetValuesByCustomFieldIdForProposal(CompanyID.ToString(), userid, "crm",
                                          proposalId.ToString(), string.Join(',', customeFieldIdList), submodule.ToLower());
                                    if (!string.IsNullOrEmpty(deliveryOption.SendToOption))
                                    {
                                        var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
                                        response.All = new List<Data>();
                                        if (response.Products != null)
                                        {
                                            response.All.AddRange(response.Products);
                                        }
                                        if (response.account != null)
                                        {
                                            response.All.AddRange(response.account);
                                        }
                                        if (response.contact != null)
                                        {
                                            response.All.AddRange(response.contact);
                                        }
                                        if (response.loanproduct != null)
                                        {
                                            response.All.AddRange(response.loanproduct);
                                        }
                                        if (response.opportunity != null)
                                        {
                                            response.All.AddRange(response.opportunity);
                                        }
                                        if (response.pricebookentity != null)
                                        {
                                            response.All.AddRange(response.pricebookentity);
                                        }
                                        if (response.proposal != null)
                                        {
                                            response.All.AddRange(response.proposal);
                                        }
                                        if (response.serviceterritory != null)
                                        {
                                            response.All.AddRange(response.serviceterritory);
                                        }
                                        if (response.workorder != null)
                                        {
                                            response.All.AddRange(response.workorder);
                                        }
                                        if (response.contract != null)
                                        {
                                            response.All.AddRange(response.contract);
                                        }
                                        email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.SendToOption) && !string.IsNullOrEmpty(m.value))?.value;
                                        if (email == null)
                                        {
                                            errorList.Add("Receiver Email should not be empty.");
                                            //return BadRequest("Receiver Email should not be empty.");
                                            if (!IsValidEmail(email))
                                            {
                                                errorList.Add("Receiver Email is not valid.");
                                                //return BadRequest("Receiver Email is not valid.");
                                            }
                                        }
                                        if (!string.IsNullOrWhiteSpace(deliveryOption.ccEmail))
                                        {
                                            if (deliveryOption.ccEmailOption != null)
                                            {
                                                ccemail = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.ccEmailOption) && !string.IsNullOrEmpty(m.value))?.value;
                                            }
                                            else
                                            {
                                                ccemail = deliveryOption.ccEmail;
                                            }
                                        }
                                        if (ccemail == null)
                                        {
                                            errorList.Add("CC Email should not be empty.");
                                            //return BadRequest("CC Email should not be empty.");
                                            if (!IsValidEmail(ccemail))
                                            {
                                                errorList.Add("CC Email is not valid.");
                                                //return BadRequest("CC Email is not valid.");
                                            }
                                        }
                                    }
                                    else
                                    {

                                    }

                                }
                            }

                            doc.Form.Flatten = true;
                            pdfs.Add(doc);
                        }



                    }
                }
                //if(hasattachment)
                //{ 
                PdfDocument.Merge(mergedDoc, pdfs.ToArray());
                mergedDoc.Form.Flatten = true;

                mergedDoc.Save(stream);
                stream.Position = 0;
                mergedDoc.Close(true);
                foreach (var pdf in pdfs)
                {
                    pdf.Close(true);
                }
                if (!string.IsNullOrEmpty(body))
                {
                    var data1 = _proposalService.GetCustomFieldsForProposal(CompanyID.ToString(), userid, "crm",
                   proposalId.ToString(), submodule.ToLower());
                    if (!string.IsNullOrWhiteSpace(data1))
                    {
                        var response1 = JsonConvert.DeserializeObject<ProposalFieldMapping>(data1);
                        response1.All = new List<Data>();
                        if (response1.Products != null)
                        {
                            response1.All.AddRange(response1.Products);
                        }
                        if (response1.account != null)
                        {
                            response1.All.AddRange(response1.account);
                        }
                        if (response1.contact != null)
                        {
                            response1.All.AddRange(response1.contact);
                        }
                        if (response1.loanproduct != null)
                        {
                            response1.All.AddRange(response1.loanproduct);
                        }
                        if (response1.opportunity != null)
                        {
                            response1.All.AddRange(response1.opportunity);
                        }
                        if (response1.pricebookentity != null)
                        {
                            response1.All.AddRange(response1.pricebookentity);
                        }
                        if (response1.proposal != null)
                        {
                            response1.All.AddRange(response1.proposal);
                        }
                        if (response1.serviceterritory != null)
                        {
                            response1.All.AddRange(response1.serviceterritory);
                        }
                        if (response1.workorder != null)
                        {
                            response1.All.AddRange(response1.workorder);
                        }
                        if (response1.contract != null)
                        {
                            response1.All.AddRange(response1.contract);
                        }
                        foreach (var d in response1.All)
                        {
                            var value = d.dt_code == "select" ? d.select_options.FirstOrDefault(p => string.Equals(p.value, d.value,
                                                                 StringComparison.CurrentCultureIgnoreCase))?.name
                                                                : d.value;
                            body = body.Replace(d.FormFieldName.Trim(), value);
                        }


                    }
                }
                string UniqueId = $"{proposalId}_{Guid.NewGuid()}";
                if (sendingSource.ToLower().Equals("signnow") && hasattachment)
                {
                    if (signer1Email != null)
                    {
                        var body1 = new StringBuilder();
                        body1.AppendLine(body);
                        if (ishtml)
                        {
                            body1.AppendLine(htmlUrl);
                        }
                        body = Util.HTMLToText(body1.ToString());
                        var document_id = await _signNowService.UploadDocument(UniqueId, stream, CompanyID.ToString());

                        var signResponse = await _signNowService.SendInvite(document_id, signer1Email, signer2Email, subject, body.ToString(), CompanyID.ToString());

                        await _signNowService.SetWebhookproposal(document_id, "document.complete", CompanyID.ToString(), "updateStatus");
                        var document = await _signNowService.SendEmbeddedInvite(document_id, signer1Email, signer2Email, CompanyID.ToString()) ;
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document have been Sent successfully through Sign Now.";
                        foreach (dynamic status in statusUpdateList)
                        {
                            _proposalService.UpdateProposalStatus(Convert.ToInt64(status.Id), Convert.ToInt64(status.DocId), proposalId, "SENT", sendingSource.ToUpper(), document_id);
                        }
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 400;
                        resultResponseModel.ResponseMessage = "Signer Email should not be empty.";
                    }
                }
                else
                {
                    if (email != null && IsValidEmail(email))
                    {
                        var model = _configurationSettingService.getcompanySetupDetail(CompanyID);
                        if (model.FromEmail == null)
                        {
                            errorList.Add("From Email should not be empty.");
                            //return BadRequest("From Email should not be empty.");
                        }
                        else if (!IsValidEmail(model.FromEmail))
                        {
                            errorList.Add("From Email is not valid.");
                            //return BadRequest("From Email is not valid.");
                        }
                        else
                        {
                            MailMessage mail = new MailMessage();
                            SmtpClient SmtpServer = new SmtpClient();
                            mail.From = new MailAddress(model.FromEmail);
                            mail.To.Add(email);
                            mail.Subject = subject;
                            mail.IsBodyHtml = true;
                            mail.Body = body;
                            if (!string.IsNullOrWhiteSpace(ccemail))
                            {
                                mail.CC.Add(ccemail);
                            }
                            // mail.Body = "proposal test";
                            var body1 = new StringBuilder();
                            body1.AppendLine(body);
                            if (ishtml)
                            {
                                body1.AppendLine(htmlUrl);
                            }
                            mail.Body = body1.ToString();
                            if (hasattachment)
                            {
                                Attachment attachment = new Attachment(stream, UniqueId + ".pdf");
                                mail.Attachments.Add(attachment);
                            }
                            SmtpServer.Port = Convert.ToInt32(model.SMTPport);
                            SmtpServer.Host = model.SMTPHost;
                            SmtpServer.Credentials = new System.Net.NetworkCredential(model.SMTPusername, model.SMTPpassword);
                            SmtpServer.EnableSsl = model.IsEnableSSL;
                            SmtpServer.Send(mail);
                            stream.Close();
                            resultResponseModel.StatusCode = 200;
                            resultResponseModel.ResponseMessage = "Document have been Sent successfully through Email.";
                            foreach (dynamic status in statusUpdateList)
                            {
                                _proposalService.UpdateProposalStatus(Convert.ToInt64(status.Id), Convert.ToInt64(status.DocId), proposalId, "SENT", sendingSource.ToUpper(),"");
                            }
                        }
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 400;
                        resultResponseModel.ResponseMessage = "Receiver Email should not be empty.";
                    }

                }

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
                    resultResponseModel.ResponseMessage = "Please upload v documents";
                }

                if (ex.Message.Contains("Value cannot be null. (Parameter 'value')"))
                {
                    resultResponseModel.ResponseMessage = "Please set mappings of proposal documents";
                }

                // await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, "", null, "", "FAILED", companyid, CommonSettings.AppSetting["CommonSettings:SignAPISourceType"], "");

                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("DownloadSignedDocument")]
        public async Task<IActionResult> DownloadSignedDocument(string documentId)
        {
            //USED
            //Downloads the document from signing authority based on Document Source Type
            try
            {
                var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string link = null;
                byte[] file = null;
                var client = new HttpClient();
                file = await _signNowService.DownloadSignedDocument(documentId, CompanyID);
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


        [HttpGet]
        [Authorize]
        [Route("GetURLlinkForSignDocument")]
        public async Task<IActionResult> GetURLlinkForSignDocument(string documentId)
        {
            //USED
            //Get SignNow Document history (when downloaded, when opened, when signed, etc.)
            var CompanyID = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            try
            {
               
                var history = JsonConvert.DeserializeObject<dynamic>(await _signNowService.GetDocumentForSigned(documentId, CompanyID));
                if (history!=null)
                {
                    var Roleid = history.roles.unique_id;
                }
                

                return Ok(history);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
       

        [HttpPost]
        [Route("updateStatus")]
        public async Task<IActionResult> updateStatus([FromBody] dynamic data)
        {
            //USED
            //SignNow sends the information on this webhok when document status is changed
            string documentId = Convert.ToString(data.content.document_id);
            string eventType = Convert.ToString(data.meta.@event);
             if (eventType == "document.complete")
            {
                _proposalService.UpdateProposalStatuswebhook(documentId);
            }
           
            return Ok();
        }




        [HttpGet]
        [Authorize]
        [Route("GenerateDocument")]
        public async Task<IActionResult> GenerateDocument(long proposalId, string mappingIds, string? subModuleName)
        {
            ProposalResultResponseModel resultResponseModel = new ProposalResultResponseModel();
            string innerHtml = "";

            try
            {
                bool routeMassage = false;
                bool documentMassage = false;
                List<string> mappingErrorList = new List<string>();
                List<string> imageDownloadingErrorList = new List<string>();
                List<string> imageUploadingErrorList = new List<string>();
                List<string> routeRuleErrorList = new List<string>();
                var idsList = mappingIds.Replace("undefined", "");
                var values = idsList.Split(',');
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var data = _proposalService.GetCustomFieldsForProposal(CompanyID.ToString(), userid, "crm",
                        proposalId.ToString(), subModuleName.ToLower());
                var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
                response.All = new List<Data>();


                if(subModuleName.ToLower()=="proposal")
                {
                    response.All.AddRange(response.Products);
                    response.All.AddRange(response.account);
                    response.All.AddRange(response.contact);
                    response.All.AddRange(response.contract);
                    response.All.AddRange(response.loanproduct);
                    response.All.AddRange(response.opportunity);
                    response.All.AddRange(response.pricebookentity);
                    response.All.AddRange(response.proposal);
                    response.All.AddRange(response.serviceterritory);
                    response.All.AddRange(response.workorder);
                }
                else
                if (subModuleName.ToLower() == "contract")
                {
                  
                    response.All.AddRange(response.account);
                   
                    response.All.AddRange(response.contract);
                
                    response.All.AddRange(response.opportunity);
                   
                    response.All.AddRange(response.workorder);
                    response.All.AddRange(response.proposal);
                    response.All.AddRange(response.contact);
                }

                foreach (var mappingId in values)
                {
                    var mergedDoc = new PdfDocument();
                    var stream = new MemoryStream();
                    var pdfs = new List<PdfLoadedDocument>();
                  

                    /// var documentMapping = _proposalService.GetDocumentMappingByModule("contract", CompanyID, Convert.ToInt64(mappingId));proposal
                   
                    var documentMapping = _proposalService.GetDocumentMappingByModule(subModuleName.ToLower(), CompanyID, Convert.ToInt64(mappingId)); 

                    foreach (var item in documentMapping)
                    {
                        if (item.DocumentType.ToLower().ToString() == "html")
                        {
                            if (item.Fields != null)
                            {
                                innerHtml = Helpers.CommonFunctions.UpdatePlaceHodler(item, response.All);
                                var saveProposalMapping = _proposalService.SaveProposalMapping(proposalId, Convert.ToInt64(mappingId),
                                               item.Id, userid, innerHtml);
                                documentMassage = true;
                            }
                            else
                            {
                                mappingErrorList.Add(item.Name);
                            }
                        }
                        else
                        {
                            var rulesApplied = true;
                            var customFields = new List<CustomFieldMapper>();
                            if (item.Fields != null)
                            {
                                customFields = JsonConvert.DeserializeObject<List<CustomFieldMapper>>(item.Fields);
                                if (item.IsMappedDocumentMakerRouteRule)
                                {
                                    if (item.RouteRules == null) continue;
                                    var routeRule = JsonConvert.DeserializeObject<List<RouteRuleMapping>>(item.RouteRules);
                                    foreach (var rule in routeRule)
                                    {
                                        rulesApplied = RuleValidator(rule, customFields, response.All);
                                        if (!rulesApplied)
                                        {
                                            var d = routeRuleErrorList.Find(x => x == item.Name);
                                            if (String.IsNullOrEmpty(d))
                                            {
                                                routeRuleErrorList.Add(item.Name);
                                            }
                                            //return BadRequest("Route/Rule validation failed.");
                                        }
                                        else
                                        {
                                            var client = new WebClient();
                                            var content = client.DownloadData(item.FileUrl);
                                            var fileStream = new MemoryStream(content);
                                            var doc = new PdfLoadedDocument(fileStream);
                                            var form = doc.Form;

                                            foreach (PdfLoadedField field in form.Fields)
                                            {
                                                var mapping = customFields.Where(m => m.FieldKey == field.Name).ToList();
                                                if (field.GetType() != typeof(PdfLoadedTextBoxField)) continue;
                                                {
                                                    if (mapping.Count != 0)
                                                    {
                                                        var result = response.All
                                                            .Where(m => mapping.Any(p => p.CustomFieldId == m.custom_field_id)).Select(
                                                                m =>
                                                                {
                                                                    if (m.dt_code == "select")
                                                                    {
                                                                        return m.select_options.FirstOrDefault(p =>
                                                                           string.Equals(p.value, m.value,
                                                                               StringComparison.CurrentCultureIgnoreCase)
                                                                           || string.Equals(p.name, m.value,
                                                                               StringComparison.CurrentCultureIgnoreCase)
                                                                           )?.name;
                                                                    }
                                                                    return m.value;
                                                                }).Distinct().ToList();
                                                        form.Fields[field.Name].ReadOnly = false;
                                                        (form.Fields[field.Name] as PdfLoadedTextBoxField).Text =
                                                            result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
                                                        form.Fields[field.Name].ReadOnly = true;
                                                    }
                                                    else
                                                    {
                                                        form.Fields[field.Name].ReadOnly = false;
                                                        (form.Fields[field.Name] as PdfLoadedTextBoxField).Text = string.Empty;
                                                        form.Fields[field.Name].ReadOnly = true;
                                                    }
                                                }
                                            }

                                            var embaddedImages = customFields.Where(x => x.IsImage).ToList();
                                            foreach (var imgField in embaddedImages)
                                            {
                                                var result = response.All
                                                           .Where(m => imgField.CustomFieldId == m.custom_field_id).Select(
                                                               m =>
                                                               {
                                                                   if (m.dt_code == "select")
                                                                   {
                                                                       return m.select_options.FirstOrDefault(p =>
                                                                          string.Equals(p.value, m.value,
                                                                              StringComparison.CurrentCultureIgnoreCase)
                                                                          || string.Equals(p.name, m.value,
                                                                               StringComparison.CurrentCultureIgnoreCase))?.name;
                                                                   }
                                                                   return m.value;
                                                               }).Distinct().ToList();

                                                var value = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";

                                                if (!string.IsNullOrWhiteSpace(value))
                                                {
                                                    try
                                                    {
                                                        PdfLoadedPage page4 = (PdfLoadedPage)doc.Pages[imgField.PageNumber - 1];
                                                        PdfGraphics graphics2 = page4.Graphics;
                                                        var ImageData2 = client.DownloadData(value);
                                                        var ImageSream2 = new MemoryStream(ImageData2);
                                                        PdfBitmap image2 = new PdfBitmap(ImageSream2);
                                                        graphics2.DrawImage(image2, imgField.left, imgField.top, imgField.Width, imgField.height);
                                                    }
                                                    catch (Exception)
                                                    {
                                                        imageDownloadingErrorList.Add("Cannot download file named " + item.FileName + " from server");
                                                        //return BadRequest("Error in downloading image.");
                                                    }

                                                }
                                            }

                                            doc.Form.Flatten = true;
                                            pdfs = new List<PdfLoadedDocument>();
                                            pdfs.Add(doc);
                                            PdfDocument.Merge(mergedDoc, pdfs.ToArray());
                                            mergedDoc.Form.Flatten = true;
                                            var stream1 = new MemoryStream();

                                            mergedDoc.Save(stream1);
                                            stream1.Position = 0;
                                            var nodeFilePath = await Util.UploadAttachmentNode(stream1, item.FileName, "DocumentMaker");
                                            //stream = null;
                                            mergedDoc = new PdfDocument();
                                            if (nodeFilePath.Headers.Location == null) continue;
                                            {
                                                var nodeFileUrl = nodeFilePath.Headers.Location.ToString();
                                                var saveProposalMapping = _proposalService.SaveProposalMapping(proposalId, Convert.ToInt64(mappingId),
                                                    item.Id, userid, "");
                                                var url = nodeFileUrl.Split("//");
                                                var model = new ServiceResourceFiles
                                                {
                                                    CompanyId = CompanyID,
                                                    Userid = userid,
                                                    moduleName = "crm",
                                                    SubModuleName = "proposal",
                                                    Id = saveProposalMapping,
                                                    IsFinalized = true
                                                };
                                                if (url.Length > 0)
                                                {
                                                    model.FileUrl = "https://" + url[1];
                                                    model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                                                    model.isMediaServer = true;
                                                    model.Type = Path.GetExtension(model.FileUrl);
                                                    var result = await _commonService.addOrUpdateFiles(model);
                                                    routeMassage = true;
                                                }
                                                else
                                                {
                                                    imageUploadingErrorList.Add("Connot upload file named " + item.FileName + " to server");
                                                    //return BadRequest("Issue in document uploading.");
                                                }
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    var client = new WebClient();
                                    var content = client.DownloadData(item.FileUrl);
                                    var fileStream = new MemoryStream(content);
                                    var doc = new PdfLoadedDocument(fileStream);
                                    var form = doc.Form;

                                    foreach (PdfLoadedField field in form.Fields)
                                    {
                                        var mapping = customFields.Where(m => m.FieldKey == field.Name).ToList();
                                        if (field.GetType() != typeof(PdfLoadedTextBoxField)) continue;
                                        {
                                            if (mapping.Count != 0)
                                            {
                                                var result = response.All
                                                    .Where(m => mapping.Any(p => p.CustomFieldId == m.custom_field_id)).Select(
                                                        m =>
                                                        {
                                                            return m.dt_code == "select"
                                                                ? m.select_options.FirstOrDefault(p =>
                                                                    string.Equals(p.value, m.value,
                                                                        StringComparison.CurrentCultureIgnoreCase)
                                                                        || string.Equals(p.name, m.value,
                                                                           StringComparison.CurrentCultureIgnoreCase))?.name
                                                                : m.value;
                                                        }).Distinct().ToList();
                                                form.Fields[field.Name].ReadOnly = false;
                                                (form.Fields[field.Name] as PdfLoadedTextBoxField).Text =
                                                    result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
                                                form.Fields[field.Name].ReadOnly = true;
                                            }
                                            else
                                            {
                                                form.Fields[field.Name].ReadOnly = false;
                                                (form.Fields[field.Name] as PdfLoadedTextBoxField).Text = string.Empty;
                                                form.Fields[field.Name].ReadOnly = true;
                                            }
                                        }
                                    }

                                    var embaddedImages = customFields.Where(x => x.IsImage).ToList();
                                    foreach (var imgField in embaddedImages)
                                    {
                                        var result = response.All
                                                   .Where(m => imgField.CustomFieldId == m.custom_field_id).Select(
                                                       m =>
                                                       {
                                                           if (m.dt_code == "select")
                                                           {
                                                               return m.select_options.FirstOrDefault(p =>
                                                                  string.Equals(p.value, m.value,
                                                                      StringComparison.CurrentCultureIgnoreCase)
                                                                  || string.Equals(p.name, m.value,
                                                                           StringComparison.CurrentCultureIgnoreCase))?.name;
                                                           }
                                                           return m.value;
                                                       }).Distinct().ToList();

                                        var value = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";

                                        if (!string.IsNullOrWhiteSpace(value))
                                        {
                                            try
                                            {
                                                PdfLoadedPage page4 = (PdfLoadedPage)doc.Pages[imgField.PageNumber - 1];
                                                PdfGraphics graphics2 = page4.Graphics;
                                                var ImageData2 = client.DownloadData(value);
                                                var ImageSream2 = new MemoryStream(ImageData2);
                                                PdfBitmap image2 = new PdfBitmap(ImageSream2);
                                                graphics2.DrawImage(image2, imgField.left, imgField.top, imgField.Width, imgField.height);
                                            }
                                            catch (Exception)
                                            {
                                                imageDownloadingErrorList.Add("Cannot download file named " + item.FileName + " from server");
                                                //return BadRequest("Error in downloading image.");
                                            }

                                        }
                                    }
                                    doc.Form.Flatten = true;
                                    pdfs.Add(doc);
                                    PdfDocument.Merge(mergedDoc, pdfs.ToArray());
                                    mergedDoc.Form.Flatten = true;

                                    mergedDoc.Save(stream);
                                    stream.Position = 0;
                                    var nodeFilePath = await Util.UploadAttachmentNode(stream, item.FileName, "DocumentMaker");
                                    //stream = null;
                                    if (nodeFilePath.Headers.Location == null) continue;
                                    {
                                        var nodeFileUrl = nodeFilePath.Headers.Location.ToString();
                                        var saveProposalMapping = _proposalService.SaveProposalMapping(proposalId, Convert.ToInt64(mappingId),
                                            item.Id, userid, "");
                                        var url = nodeFileUrl.Split("//");
                                        var model = new ServiceResourceFiles
                                        {
                                            CompanyId = CompanyID,
                                            Userid = userid,
                                            moduleName = "crm",
                                            SubModuleName = subModuleName.ToLower(),
                                            Id = saveProposalMapping,
                                            IsFinalized = true
                                        };
                                        if (url.Length > 0)
                                        {
                                            model.FileUrl = "https://" + url[1];
                                            model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                                            model.isMediaServer = true;
                                            model.Type = Path.GetExtension(model.FileUrl);
                                            var result = await _commonService.addOrUpdateFiles(model);
                                            documentMassage = true;
                                        }
                                        else
                                        {
                                            imageUploadingErrorList.Add("Connot upload file named " + item.FileName + " to server");
                                            //return BadRequest("Issue in document uploading.");
                                        }


                                    }
                                }
                            }
                            else
                            {
                                mappingErrorList.Add(item.Name);
                                //return BadRequest("One of the selected document has no mapping.");
                            }
                        }

                    }

                }
                var updatedMapping = _proposalService.GetMappingListv1(subModuleName, CompanyID, proposalId);

                // resultResponseModel.Result = new { updatedMapping } ;
                resultResponseModel.Result = updatedMapping;
                if (documentMassage || routeMassage)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Document mapping has been successfully generated";
                    resultResponseModel.DocumentErrorMessage = String.Join(",", mappingErrorList);
                    if (!routeMassage)
                    {
                        resultResponseModel.RouteErrorMessage = String.Join(",", routeRuleErrorList);
                    }
                }
                else if (!documentMassage && !routeMassage)
                {
                    resultResponseModel.StatusCode = 400;
                    resultResponseModel.ResponseMessage = "Document mapping has not been generated";
                    resultResponseModel.DocumentErrorMessage = String.Join(",", mappingErrorList);
                    resultResponseModel.RouteErrorMessage = String.Join(",", routeRuleErrorList);
                }
                return Ok(resultResponseModel);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetHtmlForProposal/{proposalId}")]
        public IActionResult GetHtmlForProposal(string proposalId)
        {
            try
            {

                var doc = _proposalService.GetHtmlForProposal(proposalId);
                return Ok(doc);
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }


      

        [HttpGet]
        [Route("GetHtmlForDocument/{documentMakerId}")]
        public IActionResult GetHtmlForDocument(string documentMakerId)
        {
            try
            {

                var doc = _proposalService.GetHtmlForDocument(documentMakerId);
                return Ok(doc);
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }


        //[HttpGet]
        //[Authorize]
        //[Route("GenerateDocument")]
        //public async Task<IActionResult> GenerateDocument(long proposalId, string mappingIds)
        //{
        //    try
        //    {
        //        var idsList = mappingIds.Replace("undefined", "");
        //        var values = idsList.Split(',');
        //        var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
        //        var data = _proposalService.GetCustomFieldsForProposal(CompanyID.ToString(), userid, "crm",
        //                proposalId.ToString());
        //        var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
        //        response.All = new List<Data>();
        //        response.All.AddRange(response.Products);
        //        response.All.AddRange(response.account);
        //        response.All.AddRange(response.contact);
        //        response.All.AddRange(response.loanproduct);
        //        response.All.AddRange(response.opportunity);
        //        response.All.AddRange(response.pricebookentity);
        //        response.All.AddRange(response.proposal);
        //        response.All.AddRange(response.serviceterritory);
        //        response.All.AddRange(response.workorder);
        //        foreach (var mappingId in values)
        //        {
        //            var mergedDoc = new PdfDocument();
        //            var stream = new MemoryStream();
        //            var pdfs = new List<PdfLoadedDocument>();
        //            var documentMapping = _proposalService.GetDocumentMappingByModule("proposal", CompanyID, Convert.ToInt64(mappingId));

        //            foreach (var item in documentMapping)
        //            {
        //                var rulesApplied = true;
        //                var customFields = new List<CustomFieldMapper>();
        //                if (item.Fields != null)
        //                {
        //                    customFields = JsonConvert.DeserializeObject<List<CustomFieldMapper>>(item.Fields);
        //                }
        //                else
        //                {
        //                    return BadRequest("One of the selected document has no mapping.");
        //                }
        //                if (item.IsMappedDocumentMakerRouteRule)
        //                {
        //                    if (item.RouteRules == null) continue;
        //                    var routeRule = JsonConvert.DeserializeObject<List<RouteRuleMapping>>(item.RouteRules);
        //                    foreach (var rule in routeRule)
        //                    {
        //                        rulesApplied = RuleValidator(rule, customFields, response.All);
        //                        if (!rulesApplied)
        //                        {
        //                            return BadRequest("Route/Rule validation failed.");
        //                        }
        //                        var client = new WebClient();
        //                        var content = client.DownloadData(item.FileUrl);
        //                        var fileStream = new MemoryStream(content);
        //                        var doc = new PdfLoadedDocument(fileStream);
        //                        var form = doc.Form;

        //                        foreach (PdfLoadedField field in form.Fields)
        //                        {
        //                            var mapping = customFields.Where(m => m.FieldKey == field.Name).ToList();
        //                            if (field.GetType() != typeof(PdfLoadedTextBoxField)) continue;
        //                            {
        //                                if (mapping.Count != 0)
        //                                {
        //                                    var result = response.All
        //                                        .Where(m => mapping.Any(p => p.CustomFieldId == m.custom_field_id)).Select(
        //                                            m =>
        //                                            {
        //                                                if (m.dt_code == "select")
        //                                                {
        //                                                    return m.select_options.FirstOrDefault(p =>
        //                                                       string.Equals(p.value, m.value,
        //                                                           StringComparison.CurrentCultureIgnoreCase)
        //                                                       || string.Equals(p.name, m.value,
        //                                                           StringComparison.CurrentCultureIgnoreCase)
        //                                                       )?.name;
        //                                                }
        //                                                return m.value;
        //                                            }).Distinct().ToList();
        //                                    form.Fields[field.Name].ReadOnly = false;
        //                                    (form.Fields[field.Name] as PdfLoadedTextBoxField).Text =
        //                                        result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
        //                                    form.Fields[field.Name].ReadOnly = true;
        //                                }
        //                                else
        //                                {
        //                                    form.Fields[field.Name].ReadOnly = false;
        //                                    (form.Fields[field.Name] as PdfLoadedTextBoxField).Text = string.Empty;
        //                                    form.Fields[field.Name].ReadOnly = true;
        //                                }
        //                            }
        //                        }

        //                        var embaddedImages = customFields.Where(x => x.IsImage).ToList();
        //                        foreach (var imgField in embaddedImages)
        //                        {
        //                            var result = response.All
        //                                       .Where(m => imgField.CustomFieldId == m.custom_field_id).Select(
        //                                           m =>
        //                                           {
        //                                               if (m.dt_code == "select")
        //                                               {
        //                                                   return m.select_options.FirstOrDefault(p =>
        //                                                      string.Equals(p.value, m.value,
        //                                                          StringComparison.CurrentCultureIgnoreCase)
        //                                                      || string.Equals(p.name, m.value,
        //                                                           StringComparison.CurrentCultureIgnoreCase))?.name;
        //                                               }
        //                                               return m.value;
        //                                           }).Distinct().ToList();

        //                            var value = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";

        //                            if (!string.IsNullOrWhiteSpace(value))
        //                            {
        //                                try
        //                                {
        //                                    PdfLoadedPage page4 = (PdfLoadedPage)doc.Pages[imgField.PageNumber - 1];
        //                                    PdfGraphics graphics2 = page4.Graphics;
        //                                    var ImageData2 = client.DownloadData(value);
        //                                    var ImageSream2 = new MemoryStream(ImageData2);
        //                                    PdfBitmap image2 = new PdfBitmap(ImageSream2);
        //                                    graphics2.DrawImage(image2, imgField.left, imgField.top, imgField.Width, imgField.height);
        //                                }
        //                                catch (Exception)
        //                                {
        //                                    return BadRequest("Error in downloading image.");
        //                                }

        //                            }
        //                        }

        //                        doc.Form.Flatten = true;
        //                        pdfs.Add(doc);
        //                        PdfDocument.Merge(mergedDoc, pdfs.ToArray());
        //                        mergedDoc.Form.Flatten = true;

        //                        mergedDoc.Save(stream);
        //                        stream.Position = 0;
        //                        var nodeFilePath = await Util.UploadAttachmentNode(stream, item.FileName, "DocumentMaker");
        //                        if (nodeFilePath.Headers.Location == null) continue;
        //                        {
        //                            var nodeFileUrl = nodeFilePath.Headers.Location.ToString();
        //                            var saveProposalMapping = _proposalService.SaveProposalMapping(proposalId, Convert.ToInt64(mappingId),
        //                                item.Id, userid);
        //                            var url = nodeFileUrl.Split("//");
        //                            var model = new ServiceResourceFiles
        //                            {
        //                                CompanyId = CompanyID,
        //                                Userid = userid,
        //                                moduleName = "crm",
        //                                SubModuleName = "proposal",
        //                                Id = saveProposalMapping,
        //                                IsFinalized = true
        //                            };
        //                            if (url.Length > 0)
        //                            {
        //                                model.FileUrl = "https://" + url[1];
        //                            }
        //                            else
        //                            {
        //                                return BadRequest("Issue in document uploading.");
        //                            }

        //                            model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
        //                            model.isMediaServer = true;
        //                            model.Type = Path.GetExtension(model.FileUrl);
        //                            var result = await _commonService.addOrUpdateFiles(model);
        //                        }
        //                    }
        //                }
        //                else
        //                {
        //                    var client = new WebClient();
        //                    var content = client.DownloadData(item.FileUrl);
        //                    var fileStream = new MemoryStream(content);
        //                    var doc = new PdfLoadedDocument(fileStream);
        //                    var form = doc.Form;

        //                    foreach (PdfLoadedField field in form.Fields)
        //                    {
        //                        var mapping = customFields.Where(m => m.FieldKey == field.Name).ToList();
        //                        if (field.GetType() != typeof(PdfLoadedTextBoxField)) continue;
        //                        {
        //                            if (mapping.Count != 0)
        //                            {
        //                                var result = response.All
        //                                    .Where(m => mapping.Any(p => p.CustomFieldId == m.custom_field_id)).Select(
        //                                        m =>
        //                                        {
        //                                            return m.dt_code == "select"
        //                                                ? m.select_options.FirstOrDefault(p =>
        //                                                    string.Equals(p.value, m.value,
        //                                                        StringComparison.CurrentCultureIgnoreCase)
        //                                                        || string.Equals(p.name, m.value,
        //                                                           StringComparison.CurrentCultureIgnoreCase))?.name
        //                                                : m.value;
        //                                        }).Distinct().ToList();
        //                                form.Fields[field.Name].ReadOnly = false;
        //                                (form.Fields[field.Name] as PdfLoadedTextBoxField).Text =
        //                                    result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
        //                                form.Fields[field.Name].ReadOnly = true;
        //                            }
        //                            else
        //                            {
        //                                form.Fields[field.Name].ReadOnly = false;
        //                                (form.Fields[field.Name] as PdfLoadedTextBoxField).Text = string.Empty;
        //                                form.Fields[field.Name].ReadOnly = true;
        //                            }
        //                        }
        //                    }

        //                    var embaddedImages = customFields.Where(x => x.IsImage).ToList();
        //                    foreach (var imgField in embaddedImages)
        //                    {
        //                        var result = response.All
        //                                   .Where(m => imgField.CustomFieldId == m.custom_field_id).Select(
        //                                       m =>
        //                                       {
        //                                           if (m.dt_code == "select")
        //                                           {
        //                                               return m.select_options.FirstOrDefault(p =>
        //                                                  string.Equals(p.value, m.value,
        //                                                      StringComparison.CurrentCultureIgnoreCase)
        //                                                  || string.Equals(p.name, m.value,
        //                                                           StringComparison.CurrentCultureIgnoreCase))?.name;
        //                                           }
        //                                           return m.value;
        //                                       }).Distinct().ToList();

        //                        var value = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";

        //                        if (!string.IsNullOrWhiteSpace(value))
        //                        {
        //                            try
        //                            {
        //                                PdfLoadedPage page4 = (PdfLoadedPage)doc.Pages[imgField.PageNumber - 1];
        //                                PdfGraphics graphics2 = page4.Graphics;
        //                                var ImageData2 = client.DownloadData(value);
        //                                var ImageSream2 = new MemoryStream(ImageData2);
        //                                PdfBitmap image2 = new PdfBitmap(ImageSream2);
        //                                graphics2.DrawImage(image2, imgField.left, imgField.top, imgField.Width, imgField.height);
        //                            }
        //                            catch (Exception)
        //                            {
        //                                return BadRequest("Error in downloading image.");
        //                            }

        //                        }
        //                    }



        //                    doc.Form.Flatten = true;
        //                    pdfs.Add(doc);
        //                    PdfDocument.Merge(mergedDoc, pdfs.ToArray());
        //                    mergedDoc.Form.Flatten = true;

        //                    mergedDoc.Save(stream);
        //                    stream.Position = 0;
        //                    var nodeFilePath = await Util.UploadAttachmentNode(stream, item.FileName, "DocumentMaker");
        //                    if (nodeFilePath.Headers.Location == null) continue;
        //                    {
        //                        var nodeFileUrl = nodeFilePath.Headers.Location.ToString();
        //                        var saveProposalMapping = _proposalService.SaveProposalMapping(proposalId, Convert.ToInt64(mappingId),
        //                            item.Id, userid);
        //                        var url = nodeFileUrl.Split("//");
        //                        var model = new ServiceResourceFiles
        //                        {
        //                            CompanyId = CompanyID,
        //                            Userid = userid,
        //                            moduleName = "crm",
        //                            SubModuleName = "proposal",
        //                            Id = saveProposalMapping,
        //                            IsFinalized = true
        //                        };
        //                        if (url.Length > 0)
        //                        {
        //                            model.FileUrl = "https://" + url[1];
        //                        }
        //                        else
        //                        {
        //                            return BadRequest("Issue in document uploading.");
        //                        }

        //                        model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
        //                        model.isMediaServer = true;
        //                        model.Type = Path.GetExtension(model.FileUrl);
        //                        var result = await _commonService.addOrUpdateFiles(model);
        //                    }
        //                }
        //            }

        //        }
        //        var updatedMapping = _proposalService.GetMappingListv1("proposal", CompanyID, proposalId);
        //        ResultResponseModel resultResponseModel = new ResultResponseModel();

        //        resultResponseModel.Result = updatedMapping;
        //        resultResponseModel.StatusCode = 200;
        //        resultResponseModel.ResponseMessage = "Document Generated Successfully.";
        //        return Ok(resultResponseModel);
        //    }

        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}






        #region Private methods

        //private bool CheckCondition(string exp, List<Data> data, string actualValue)
        //{
        //    var valuesList = data.Select(m =>
        //    {
        //        return m.dt_code == "select"
        //            ? m.select_options.FirstOrDefault(p =>
        //                string.Equals(p.value, m.value, StringComparison.CurrentCultureIgnoreCase)
        //                || string.Equals(p.name, m.value, StringComparison.CurrentCultureIgnoreCase))?.name
        //            : m.value;
        //    }).Distinct().ToList();
        //    switch (exp)
        //    {
        //        case "==":
        //            if (valuesList.Any(m => string.Equals(m, actualValue, StringComparison.CurrentCultureIgnoreCase)))
        //            {
        //                return true;
        //            }
        //            break;
        //        case "!=":
        //            if (!valuesList.Any(m => string.Equals(m, actualValue, StringComparison.CurrentCultureIgnoreCase)))
        //            {
        //                return true;
        //            }
        //            break;
        //        case "<":
        //            if (valuesList.Any(m => m.LessThanDouble(actualValue)))
        //            {
        //                return true;
        //            }
        //            break;
        //        case "<=":
        //            if (valuesList.Any(m => m.LessThanEqualDouble(actualValue)))
        //            {
        //                return true;
        //            }
        //            break;
        //        case ">":
        //            if (valuesList.Any(m => m.GreaterThanDouble(actualValue)))
        //            {
        //                return true;
        //            }
        //            break;
        //        case ">=":
        //            if (valuesList.Any(m => m.GreaterThanEqualDouble(actualValue)))
        //            {
        //                return true;
        //            }
        //            break;
        //        case "contains":
        //            if (valuesList.Any(m => m.ToLower().Contains(actualValue.ToLower())))
        //            {
        //                return true;
        //            }
        //            break;
        //        case "!contains":
        //            if (!valuesList.Any(m => m.ToLower().Contains(actualValue.ToLower())))
        //            {
        //                return true;
        //            }
        //            break;
        //        default:
        //            return false;
        //    }

        //    return false;
        //}
        private bool CheckCondition(string exp, List<Data> data, string actualValue)
        {
            var isNumeric = data.Any(m => m.dt_code == "decimal");
            if (isNumeric)
            {
                decimal.TryParse(actualValue, out decimal value);
                actualValue = String.Format("{0:0.00}", value);
            }
            var valuesList = data.Select(m =>
            {

                return m.dt_code == "select"
                    ? m.select_options.FirstOrDefault(p =>
                        string.Equals(p.value, m.value, StringComparison.CurrentCultureIgnoreCase)
                        || string.Equals(p.name, m.value, StringComparison.CurrentCultureIgnoreCase))?.name
                    : m.value;
            }).Distinct().ToList();
            switch (exp)
            {
                case "==":
                    if (valuesList.Any(m => string.Equals(m, actualValue, StringComparison.CurrentCultureIgnoreCase)))
                    {
                        return true;
                    }
                    break;
                case "!=":
                    if (!valuesList.Any(m => string.Equals(m, actualValue, StringComparison.CurrentCultureIgnoreCase)))
                    {
                        return true;
                    }
                    break;
                case "<":
                    if (valuesList.Any(m => m.LessThanDouble(actualValue)))
                    {
                        return true;
                    }
                    break;
                case "<=":
                    if (valuesList.Any(m => m.LessThanEqualDouble(actualValue)))
                    {
                        return true;
                    }
                    break;
                case ">":
                    if (valuesList.Any(m => m.GreaterThanDouble(actualValue)))
                    {
                        return true;
                    }
                    break;
                case ">=":
                    if (valuesList.Any(m => m.GreaterThanEqualDouble(actualValue)))
                    {
                        return true;
                    }
                    break;
                case "contains":
                    if (valuesList.Any(m => m.ToLower().Contains(actualValue.ToLower())))
                    {
                        return true;
                    }
                    break;
                case "!contains":
                    if (!valuesList.Any(m => m.ToLower().Contains(actualValue.ToLower())))
                    {
                        return true;
                    }
                    break;
                default:
                    return false;
            }

            return false;
        }
        private bool RuleValidator(RouteRuleMapping rule, IReadOnlyCollection<CustomFieldMapper> mapping, IReadOnlyCollection<Data> data)
        {
            var ruleStatus = false;
            foreach (var condition in rule.Conditions)
            {
                var mappingObject = mapping.FirstOrDefault(m => m.DocumentMakerPlaceHolderId == condition.Field);
                if (mappingObject == null) continue;
                {
                    var valueObject = data.Where(m => m.custom_field_id == mappingObject.CustomFieldId).ToList();
                    if (valueObject.Count == 0) continue;
                    ruleStatus = condition.Operator switch
                    {
                        "and" => (ruleStatus && CheckCondition(condition.Exp, valueObject, condition.Value)),
                        "or" => (ruleStatus || CheckCondition(condition.Exp, valueObject, condition.Value)),
                        _ => CheckCondition(condition.Exp, valueObject, condition.Value),
                    };
                }
            }
            return ruleStatus;
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
        #endregion


    }
}