using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Repository;
using Solgen.Service;
using Solgen.WebApi.Helpers;
namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/designation")]
    public class DesignationController : Controller
    {
        private IDesignationRepository _designationService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;

        public DesignationController(IDesignationRepository designationService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _designationService = designationService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        //  [Authorize]
        [Route("GetDesignationList")]
        public async Task<IActionResult> GetDesignationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = await _designationService.GetDesignationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetDesignationById")]
        public async Task<IActionResult> GetDesignationById(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _designationService.GetDesignationById(id, moduleName, submoduleName, companyid, userid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditDesignation")]
        public async Task<IActionResult> AddEditDesignation([FromBody]JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Designation has been {0} successfully.", (model.Id == "") ? "added" : "updated");
                string data = _designationService.AddEditDesignation(model);
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
    }
}