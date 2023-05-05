using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Service;
using Solgen.Service.DocumentMaker;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Parsing;
using Syncfusion.Pdf.Graphics;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/DocumentMaker")]

    public class DocumentMakerController : Controller
    {
        private readonly IDocumentMakerService _DocumentMakerService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private static ICommonRepository _commonRepository;
      
        public ILogService _logService { get; } 

        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public DocumentMakerController(IDocumentMakerService DocumentMakerService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _DocumentMakerService = DocumentMakerService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [Route("GetDocumentMakerList")]
        [Authorize]
        [HttpGet]
       
        public IActionResult GetDocumentMakerList(string filter, string sortColumn, string sortDir, int page, int pageSize)
        {
            return Ok(_DocumentMakerService.GetDocumentMaker(filter, sortColumn, sortDir, page, pageSize, CompanyId.ToString()));
        }
        [HttpPost]
        [Authorize]
        [Route("DeleteDocumentMaker")]
        public IActionResult DeleteDocumentMaker(string Id)
        {
            var result = new ResultResponseModel();


            var response = _DocumentMakerService.DeleteDocumentMaker(Id, CompanyId.ToString(), UserId.ToString());
            if (!string.IsNullOrEmpty(response))
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Document Maker has been deleted successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while deleting Document Maker.";
            }

            return Ok(result);
        }
        [HttpGet]
        [Route("DeletedMultipleDocuments")]
        [Authorize]
        public IActionResult DeletedMultipleDocuments(string documentsId)
        {
            var resultResponseModel = new ResultResponseModel();
            try
            {
                string data = documentsId.Replace("undefined", "");
                var dataFinal = data;
                //string dataFinal = "";
                //if (data.Contains(','))
                //{
                //    dataFinal = data.Remove(data.Length - 1, 1);
                //}
                //else
                //{
                //    dataFinal = data;
                //}
                //--var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result =_DocumentMakerService.DeleteDocumentMaker(item, CompanyId.ToString(), UserId.ToString());
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Documents has been deleted successfully.";
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
        [Authorize]
        [Route("GetSubModuleList")]
        public IActionResult GetSubModulesForDocumentMaker()
        {
            try
            {
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var subModules = _DocumentMakerService.GetSubModuleList(Convert.ToInt32(companyId));
                if (subModules == null)
                    return NotFound();

                return Ok(subModules);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("getHtmlContentList")]
        public IActionResult getHtmlContentList()
        {
            try
            {
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var subModules = _DocumentMakerService.GetHtmlContentList(Convert.ToInt32(companyId));
                if (subModules == null)
                    return NotFound();

                return Ok(subModules);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("CreateUpdateDocument")]
        public IActionResult CreateUpdateDocument(string payload)
        {
            var result = new ResultResponseModel();
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var response = _DocumentMakerService.AddEditDocumentMaker(payload, Convert.ToInt64(companyId), userId.ToString());

            if (!string.IsNullOrEmpty(response))
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Document created successfully.";
                result.ID = response;
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while creating Document Maker.";
            }

            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetDocumentById")]
        public IActionResult GetDocumentById(string documentId)
        {
            try
            {
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = _DocumentMakerService.GetDocumentMakerById(documentId, companyId);

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
        [Route("GetDocumentFields")]
        public IActionResult GetDocumentFields(int documentId)
        {
            try
            {
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = JsonConvert.DeserializeObject<FilePath>(_DocumentMakerService.GetDocumentFields(documentId.ToString(), companyId));

                if (data == null)
                {
                    return BadRequest();
                }
                var client = new WebClient();
                var content = client.DownloadData(data.FileUrl);
                var stream = new MemoryStream(content);
                var doc = new PdfLoadedDocument(stream);

                var form = doc.Form;

                var str = new List<string>();
                 
                foreach (PdfLoadedField field in form.Fields)
                {
                    str.Add(field.Name);
                }

                return Ok(str);
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting document fields : Document Id {documentId}",
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
        [Route("GetDocumentDetailById")]
        public async Task<IActionResult> GetDocumentDetailById(string documentId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _DocumentMakerService.GetDocumentDetailById(documentId);

                if (result == null)
                    return BadRequest();
                return Content(result, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [Route("SavePlaceHolder")]
        public IActionResult SavePlaceHolder([FromBody]dynamic placeHolderList)
        {
            try
            {
                var result = new ResultResponseModel();
                var response = _DocumentMakerService.SavePlaceHolder(placeHolderList);

                if (!string.IsNullOrEmpty(response))
                {
                    result.StatusCode = 200;
                    result.ResponseMessage = response;
                }
                else
                {
                    result.StatusCode = 400;
                    result.ResponseMessage = "An error occurred while Uploading.";
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("PreviewFields")]
        public IActionResult PreviewFields()
        {
            try
            {
                var pathToUploadFile = CommonSettings.AppSetting["CommonSettings:TempDocument"];
                var uploadedPath = string.Empty;
                if (Request.Form.Files.Count > 0)
                {
                    uploadedPath = Util.UploadTemporaryDocument(Request.Form.Files, pathToUploadFile);
                }
                if (uploadedPath == null)
                {
                    return BadRequest("Error in file uploading");
                }

                var file = new FileStream(Convert.ToString(uploadedPath), FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                var doc = new PdfLoadedDocument(file);

                var form = doc.Form;

                if (form == null)
                {
                    return BadRequest("Uploaded PDF is not editable.");
                }
                var str = new List<string>();
                foreach (PdfLoadedField field in form.Fields)
                {
                    str.Add(field.Name);
                }
                str.Add(doc.PageCount.ToString());
                file.Close();
                System.IO.File.Delete(uploadedPath);
                return Ok(str);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("PreviewDocument")]
        public IActionResult PreviewDocument([FromBody] Payload list)
        {


            var client = new WebClient();
            var content = client.DownloadData(list.url);
            var fileStream = new MemoryStream(content);
            var doc = new PdfLoadedDocument(fileStream);
            var form = doc.Form;
            var pdf = new List<PdfLoadedDocument>();
            var mergedDoc = new PdfDocument();
            var stream = new MemoryStream();
            foreach (PdfLoadedField field in form.Fields)
            {
                var mapping = list.keyValueList.FirstOrDefault(m => m.FieldName == field.Name );
                if (field.GetType() == typeof(PdfLoadedTextBoxField))
                {
                    form.Fields[field.Name].ReadOnly = false;
                    (form.Fields[field.Name] as PdfLoadedTextBoxField).Text = (mapping != null && mapping.FieldValue!=null) ? mapping.FieldValue : string.Empty;
                    form.Fields[field.Name].ReadOnly = true;
                }
            }
            var EmbededField = list.keyValueList.Where(x => x.IsImage).ToList();
            foreach (var field1 in EmbededField)
            {
                if(!string.IsNullOrWhiteSpace(field1.FieldValue))
                {
                    PdfLoadedPage page4 = (PdfLoadedPage)doc.Pages[field1.PageNumber - 1];
                    PdfGraphics graphics2 = page4.Graphics;
                    var ImageData2 = client.DownloadData(field1.FieldValue);
                    var ImageSream2 = new MemoryStream(ImageData2);
                    PdfBitmap image2 = new PdfBitmap(ImageSream2);
                    graphics2.DrawImage(image2, field1.left, field1.top, field1.Width, field1.height);
                }
                
            }

            doc.Form.Flatten = true;
            pdf.Add(doc);

            PdfDocument.Merge(mergedDoc, pdf.ToArray());
            mergedDoc.Form.Flatten = true;

            mergedDoc.Save(stream);
            stream.Position = 0;

            //Save the PDF document
            //Close the PDF document
            mergedDoc.Close(true);
            foreach (var item in pdf)
            {
                item.Close(true);
            }
            var folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:TempDocument"]);

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileUrl = Path.Combine(folderPath, $"combined.pdf");

            System.IO.File.WriteAllBytes(fileUrl, stream.ToArray());
            var bytes = System.IO.File.ReadAllBytes(fileUrl);
            var pdfBase64 = Convert.ToBase64String(bytes);
            System.IO.File.Delete(fileUrl);
            return Ok(pdfBase64);
        }

        [HttpGet]
        [Authorize]
        [Route("VerifyDuplicateName")]
        public IActionResult VerifyDuplicateName(string name, string id)
        {
            try
            {
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var response = _DocumentMakerService.VerifyDuplicateName(name, id, companyId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in updating document maker data route {id}",
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
    }
}

