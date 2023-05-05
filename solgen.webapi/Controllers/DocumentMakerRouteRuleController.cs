using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Service;
using Solgen.Service.DocumentMakerRouteRule;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/DocumentMakerRouteRule")]
    public class DocumentMakerRouteRuleController : Controller
    {
        private readonly UserHub _timeHub;
        private IUserConnectionManager _userConnectionManager;
        private IRealTimeService _realTimeService;
        private IDocumentMakerRouteRuleService _documentMakerRouteRuleService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public ILogService _logService { get; }

        public DocumentMakerRouteRuleController(IDocumentMakerRouteRuleService documentMakerRouteRuleService,
          IRealTimeService realTimeService,
          IUserConnectionManager userConnectionManager,
          ILogService logService)
        {
            _documentMakerRouteRuleService = documentMakerRouteRuleService;
            _userConnectionManager = userConnectionManager;
            _logService = logService;
            _realTimeService = realTimeService;
        }
        [HttpGet]
        [Authorize]
        [Route("GetList")]

        public IActionResult GetList(string SortColumn, string SortDir, int PageNo, int PageSize, string Filter)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_documentMakerRouteRuleService.GetList(SortColumn, SortDir, PageNo, PageSize, Filter, Convert.ToInt64(companyid)));
        }

        [HttpGet]
        [Authorize]
        [Route("Delete")]
        public IActionResult Delete(string id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _documentMakerRouteRuleService.Delete(id);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Route/Rule has been deleted successfully.";
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
              
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result = _documentMakerRouteRuleService.Delete(item);
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Route/Rule has been deleted successfully.";
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
        [Route("GetLogicalOperatorsList")]
        public IActionResult GetLogicalOperatorsList(string type)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerRouteRuleService.GetLogicalOperatorsList(type);
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetComparisionOperatorsList")]
        public IActionResult GetComparisionOperatorsList(string type)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerRouteRuleService.GetComparisionOperatorsList(type);
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetPlaceHolderFieldsList")]
        public IActionResult GetPlaceHolderFieldsList(string documentId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _documentMakerRouteRuleService.GetPlaceHolderFieldsList(documentId);
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetDocumentMakerRoutes/{routeId}")]
        public async Task<IActionResult> GetDocumentMakerRoutes(int routeId)
        {
            //USED
            //Gets the list of the Data Routes
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _documentMakerRouteRuleService.GetDocumentMakerRoutes(routeId,companyId);

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
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in getting document maker data routes",
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
        [Route("GetDocumentMakerRouteRules/{routeId}")]
        public async Task<IActionResult> GetDocumentMakerRouteRules(int routeId)
        {
            //USED
            //Gets the rules (with conditions) of the route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _documentMakerRouteRuleService.GetDocumentMakerRouteRules(routeId, companyId);

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
                Guid guid = _logService.Save(new LogModel
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
        [Route("AddRouteRuleData")]
        public async Task<IActionResult> AddRouteRuleData([FromBody] dynamic routeRequest)
        {
            //USED
            //Create new Data Route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value).ToString();
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var response = await _documentMakerRouteRuleService.AddRouteRuleData(JsonConvert.SerializeObject(routeRequest), userId, companyId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception creating document maker data route",
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
        [Route("AddNewFieldRuleData")]
        public async Task<IActionResult> AddNewFieldRuleData([FromBody] dynamic routeRequest)
        {
            //USED
            //Create new Data Route
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value).ToString();
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                string json = JsonConvert.SerializeObject(routeRequest);
                int document_id = Convert.ToInt32(JObject.Parse(json)["document_id"]);
                string name = Convert.ToString(JObject.Parse(json)["name"]);
                var response = await _documentMakerRouteRuleService.AddNewFieldRuleData(document_id,name, userId, companyId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception creating document maker data route",
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
        [Route("UpdateRouteRuleData")]
        public async Task<IActionResult> UpdateRouteRuleData([FromBody] dynamic dataRouteRequest)
        {
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value).ToString();
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var response = await _documentMakerRouteRuleService.UpdateRouteRuleData(JsonConvert.SerializeObject(dataRouteRequest), userId, companyId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in updating document maker data route {dataRouteRequest.id}",
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
        [Route("VerifyDuplicateName")]
        public IActionResult VerifyDuplicateName(string routeName, long id)
        {
            try
            {
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var response = _documentMakerRouteRuleService.VerifyDuplicateName(routeName, id, companyId);
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
