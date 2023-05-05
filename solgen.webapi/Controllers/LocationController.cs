using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/location")]
    public class LocationController : Controller
    {

        private ILocationRepository _locationService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;

        public LocationController(ILocationRepository locationService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _locationService = locationService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        //  [Authorize]
        [Route("GetLocationList")]
        public async Task<IActionResult> GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = await _locationService.GetLocationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetLocationById")]
        public async Task<IActionResult> GetLocationById(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _locationService.GetLocationById(id, moduleName, submoduleName, companyid, userid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditLocation")]
        public async Task<IActionResult> AddEditLocation([FromBody]JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                 model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId= User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Location has been {0} successfully.", (model.Id == null || model.Id=="") ? "added" : "updated");
                string data = _locationService.AddEditLocation(model);
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


        [HttpPost]
        [Authorize]
        [Route("CheckLocationNameExist")]

        public IActionResult CheckLocationNameExist([FromBody] CheckLoactionName model)
        {
            ResultResponseModel result = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var data = _locationService.CheckLocationNameExist(model.LocationName, model.ID, userid, Convert.ToInt64(companyid));
            if (data == "Exists")
            {
                result.StatusCode = 201;
                result.ResponseMessage = "Location Name already exists.";
            }
            else
            {

            }

            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("CheckServiceTerritory")]

        public IActionResult CheckServiceTerritory(string id)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_locationService.CheckServiceTerritory(id,  companyid, userid));
        }

        [Route("CheckLocationAssigned")]
        public async Task<IActionResult> CheckLocationAssigned(long LocationId)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                result.StatusCode = 200;
                result.ResponseMessage = await _locationService.CheckLocationAssigned(LocationId);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok(result);
        }

    }
}