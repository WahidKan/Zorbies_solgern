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
    [Route("api/department")]
    public class DepartmentController : Controller
    {
        private IDepartmentRepository _departmentService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;

        public DepartmentController(IDepartmentRepository departmentService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _departmentService = departmentService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        //  [Authorize]
        [Route("GetDepartmentList")]
        public async Task<IActionResult> GetDepartmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = await _departmentService.GetDepartmentList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetDepartmentById")]
        public async Task<IActionResult> GetDepartmentById(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _departmentService.GetDepartmentById(id, moduleName, submoduleName, companyid, userid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditDepartment")]
        public async Task<IActionResult> AddEditDepartment([FromBody]JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Department has been {0} successfully.", (model.Id == "") ? "added" : "updated");
                string data = _departmentService.AddEditDepartment(model);
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