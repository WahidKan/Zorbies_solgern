using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Service;
using Solgen.Service.DocumentMakerSubModuleMapping;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Syncfusion.Pdf.Parsing;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/DocumentMakerSubModuleMapping")]
    public class DocumentMakerSubModuleMappingController : Controller
    {
        private readonly UserHub _timeHub;
        private IUserConnectionManager _userConnectionManager;
        private IRealTimeService _realTimeService;
        private IDocumentMakerSubModuleMappingService _documentMakerSubModuleMappingService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public ILogService _logService { get; }

        public DocumentMakerSubModuleMappingController(IDocumentMakerSubModuleMappingService documentMakerSubModuleMappingService,
          IRealTimeService realTimeService,
          IUserConnectionManager userConnectionManager,
          ILogService logService)
        {
            _documentMakerSubModuleMappingService = documentMakerSubModuleMappingService;
            _userConnectionManager = userConnectionManager;
            _logService = logService;
            _realTimeService = realTimeService;
        }
        [HttpGet]
        [Route("GetList")]

        public IActionResult GetList(string SortColumn, string SortDir, int PageNo, int PageSize, string Filter)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_documentMakerSubModuleMappingService.GetList(SortColumn, SortDir, PageNo, PageSize, Filter, Convert.ToInt64(companyid)));
        }

        [HttpGet]
        [Route("Delete")]
        public IActionResult Delete(string id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _documentMakerSubModuleMappingService.Delete(id);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Document has been deleted successfully.";
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
        [Route("GetSubModuleList")]
        public IActionResult GetSubModuleList()
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetSubModuleList(companyid);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetDocumentList")]
        public IActionResult GetDocumentList()
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetDocumentList(companyId);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetHtmlTemListForddl")]
        public IActionResult GetHtmlTemListForddl()
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetHtmlTemListForddl(companyId);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetRoutesList")]
        public IActionResult GetRoutesList()
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetRoutesList(companyid);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetRouteDocumentList")]
        public IActionResult GetRouteDocumentListList(string routeId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetRouteDocumentList(routeId,companyid);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetDocumentBytes")]
        public IActionResult GetDocumentBytes(string path) //Change krna hy
        {
            var client = new WebClient();
            var content = client.DownloadData(path);
            var fileStream = new MemoryStream(content);
            var folderPath = Path.Combine(CommonSettings.AppSetting["CommonSettings:TempDocument"]);

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileUrl = Path.Combine(folderPath, $"temp.pdf");

            System.IO.File.WriteAllBytes(fileUrl, fileStream.ToArray());

            var bytes = System.IO.File.ReadAllBytes(fileUrl);
            var pdfBase64 = Convert.ToBase64String(bytes);
            System.IO.File.Delete(fileUrl);
            return Ok(pdfBase64);
        }
        [HttpGet]
        [Route("GetCustomFieldsList")]
        public IActionResult GetCustomFieldsList(string moduleId, string subModuleId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetCustomFieldsList(moduleId, subModuleId, companyid);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetMappingFieldsList")]
        public IActionResult GetMappingFieldsList(string data)
        {
           // data = JsonConvert.SerializeObject(data);
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetMappingFieldsList(data, companyid);
            return Ok(result);
        }


        [HttpGet]
        [Route("GetHtmlMappingFieldsList")]
        public IActionResult GetHtmlMappingFieldsList(string data)
        {
            // data = JsonConvert.SerializeObject(data);
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetHtmlMappingFieldsList(data, companyid);
            return Ok(result);
        }
        [HttpGet]
        [Route("MultiDelete")]
        public IActionResult MultipleDelete(string ids)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {


                string data = ids.Replace("undefined", "");
                string dataFinal = data;
                //if (data.Contains(','))
                //{
                //    dataFinal = data.Remove(data.Length - 1, 1);
                //}
                //else
                //{
                //    dataFinal = data;
                //}
                //var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result = _documentMakerSubModuleMappingService.Delete(item);
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Mapping has been deleted successfully.";
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
        [Route("AddDocumentMapping")]
        public IActionResult AddDocumentMapping([FromBody] dynamic data)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value).ToString();
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                 _documentMakerSubModuleMappingService.Save(JsonConvert.SerializeObject(data), userid,companyid);
                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception adding document mapping",
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
        [Route("GetDocumentMappingById")]
        public IActionResult GetDocumentMappingById(string id)
        {
            //USED
            //Gets the rules (with conditions) of the route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value).ToString();

                var data = _documentMakerSubModuleMappingService.GetDocumentMappingById(id, companyId);

                if (data == null)
                {
                    return BadRequest();
                }

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in getting details of Webmerge data route",
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
        [Route("GetDocumentMappingFieldsbyid")]

        public IActionResult GetDocumentMappingFieldsbyid(int id)
        {
            // data = JsonConvert.SerializeObject(data);
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerSubModuleMappingService.GetDocumentMappingFieldsbyid(id, Convert.ToInt64(companyid));
            return Ok(result);
        }


        [HttpPost]      
        [Route("AddEditSubModuleMappingDelivery")]
        public IActionResult AddEditSubModuleMappingDelivery([FromBody] dynamic model)
        {
            var result = new ResultResponseModel();
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            string test = Convert.ToString(model.documentMakerMappingId);
            var response = _documentMakerSubModuleMappingService.AddEditSubModuleMappingDelivery(model, userId.ToString());

            if (!string.IsNullOrEmpty(response) && response!="400")
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Delivery option created successfully.";
                result.ID = response;
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while creating Delivery options.";
            }
            return Ok(result);
        }


        [HttpGet]
        [Route("GetSubModuleMappingDeliveryById")]
        public async Task<IActionResult> GetSubModuleMappingDeliveryById(long Id, long DocumentMakerMappingId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _documentMakerSubModuleMappingService.GetSubModuleMappingDeliveryById(Id, DocumentMakerMappingId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("VerifyDuplicateName")]
        public IActionResult VerifyDuplicateName(string routeName, long id)
        {
            try
            {
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var response = _documentMakerSubModuleMappingService.VerifyDuplicateName(routeName, id, companyId);
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
