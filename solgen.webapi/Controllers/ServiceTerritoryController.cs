using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Repository;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/serviceterritory")]
    public class ServiceTerritoryController : Controller
    {

        private IServiceTerritoryRepository _lserviceterritoryService;
        private readonly IServiceTerritoryService _serviceterritoryService;

        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;

        public ServiceTerritoryController(IServiceTerritoryRepository serviceterritoryService, IServiceTerritoryService serviceterritoryServices, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _serviceterritoryService = serviceterritoryServices;
             _lserviceterritoryService = serviceterritoryService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        //  [Authorize]
        [Route("GetServiceTerritoryList")]
        public async Task<IActionResult> GetServiceTerritoryList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = await _lserviceterritoryService.GetServiceTerritoryList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetServiceTerritoryById")]
        public async Task<IActionResult> GetServiceTerritoryById(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _lserviceterritoryService.GetServiceTerritoryById(id, moduleName, submoduleName, companyid, userid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditServiceTerritory")]
        public async Task<IActionResult> AddEditServiceTerritory([FromBody]JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                 model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId= User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Service Territory has been {0} successfully.", (model.Id == "") ? "added" : "updated");
                string data = _lserviceterritoryService.AddEditServiceTerritory(model);
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
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



        [HttpGet]
        [Authorize]
        [Route("GetUserslistByServiceTerritoryId")]
        public async Task<IActionResult> GetUserslistByServiceTerritoryId(long serviceTerritoryId, string sortColumn, string sortDir, int pageNo, int pageSize)
        {
            try
            {
                var companyid = long.Parse(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = await _serviceterritoryService.GetUserslistByServiceTerritoryId(serviceTerritoryId, companyid, sortColumn, sortDir, pageNo, pageSize);
                return Content(JsonConvert.SerializeObject(lst));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}