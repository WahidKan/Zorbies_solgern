using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Service;
using Solgen.Service.OperatingHours;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{

    [Produces("application/json")]
    [Route("api/OperatingHours")]
    public class OperatingHoursController : Controller
    {
        private IOperatingHoursService _operatingHoursService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public OperatingHoursController(IOperatingHoursService operatingHoursService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _operatingHoursService = operatingHoursService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [Route("GetOperatingHoursList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetOperatingHoursList(string filter, string sortColumn, string sortDir, int page, int pageSize)
        {
            return Ok(_operatingHoursService.GetOperatingHoursList(filter, sortColumn, sortDir, page, pageSize, CompanyId.ToString()));
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditOperatingHours")]
        public IActionResult AddEditOperatingHours([FromBody] dynamic model)
        {
            ResultResponseModel result = new ResultResponseModel();
            string json = JsonConvert.SerializeObject(model);

            string prepareModel = string.Concat("[", json, "]");
            string id = Convert.ToString(JObject.Parse(json)["id"]);

            bool isSuccess = _operatingHoursService.AddEditOperatingHours(id, prepareModel, CompanyId.ToString(), UserId.ToString());
            if (isSuccess)
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Operating Hours has been added successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while saving Operating Hours.";
            }

            return Ok(result);

        }

        [HttpPost]
        [Authorize]
        [Route("DeleteOperatingHours")]
        public IActionResult DeleteOperatingHours(string Id)
        {
            ResultResponseModel result = new ResultResponseModel();


            string response = _operatingHoursService.DeleteOperatingHours(Id, CompanyId.ToString(), UserId.ToString());
            if (!string.IsNullOrEmpty(response))
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Rule Engine has been deleted successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while deleting Operating Hours.";
            }

            return Ok(result);
        }

        [HttpPost]
        [Route("DeleteMultipleOperatingHours")]
        [Authorize]
        public IActionResult DeletedMultipleOperatingHours(string ids)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string data = ids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result = _operatingHoursService.DeleteOperatingHours(item, CompanyId.ToString(), UserId.ToString());
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Operating Hours has been deleted successfully.";
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
        [Authorize]
        [Route("DeleteOperatingHoursTimeSlot")]
        public IActionResult DeleteOperatingHoursTimeSlot(string Id)
        {
            ResultResponseModel result = new ResultResponseModel();


            string response = _operatingHoursService.DeleteOperatingHoursTimeSlot(Id, CompanyId.ToString(), UserId.ToString());
            if (!string.IsNullOrEmpty(response))
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Operating Hour TimeSlot has been deleted successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while deleting Operating Hours TimeSlot.";
            }

            return Ok(result);

        }

        [HttpGet]
        [Authorize]
        [Route("GetOperatingHoursById")]
        public IActionResult GetOperatingHoursById(string Id)
        {
            ResultResponseModel result = new ResultResponseModel();

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var response = _operatingHoursService.GetOperatingHoursById(Id, CompanyId.ToString(), UserId.ToString());

                if (response == null)
                    return BadRequest();
                return Content(response, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("CheckOperatingHoursExist")]
        public IActionResult CheckOperatingHoursExist(string Id,string name)
        {
            ResultResponseModel result = new ResultResponseModel();

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var response = _operatingHoursService.CheckOperatingHoursExist(Id, name, CompanyId.ToString(), UserId.ToString());

                if (response == null)
                    return BadRequest();
                return Ok(response);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
