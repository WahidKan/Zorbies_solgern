
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Solgen.Core;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Employee")]
    public class EmployeeController : Controller
    {

        private readonly IEmployeeService _employeeService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _config;
        private readonly IEmailSettingsService _emailSettingsService;
        public IHostingEnvironment Environment { get; }
        public EmployeeController(IEmployeeService employeeService, ICommonService commonService
            , IHttpContextAccessor httpContext
            , IConfiguration config
            , IHostingEnvironment environment
              , IEmailSettingsService emailSettingsService
            )
        {
            _employeeService = employeeService;
            this._commonService = commonService;
            _httpContext = httpContext;
            _emailSettingsService = emailSettingsService;
            _config = config;
            Environment = environment;
        }

        [HttpGet]
        [Authorize]
        [Route("GetEmployeeList")]
        public IActionResult GetEmployeeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                var lst = _employeeService.GetEmployeeList(nameSearch, sortColumn, sortDir, pageIndex, pageSize,userId, moduleName, submoduleName, companyId, custom_view_id);

                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetEmployeeDetailById")]
        public async Task<IActionResult> GetEmployeeDetailById(string id)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _employeeService.GetEmployeeDetailById(id);
            //dynamic stuff = JsonConvert.DeserializeObject(result);
            //JObject json = new JObject(result);
            //json = (JObject)result;
            if (result == null)
                return BadRequest();
            // return Ok(result);
            return Content(result, "application/json");
        }
        [HttpGet]
        [Authorize]
        [Route("DeletedDepartmentById")]
        public IActionResult DeletedDepartmentById(string deptId,string deptName)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            if (deptId!=null)
            {
                var data = _employeeService.DeletedDepartmentById(deptId);
                if(data=="1")
                {
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "delete department " + deptName + " successfully.";
                    return Ok(responseModel);
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                    return Ok(responseModel);
                }
                
                
            }
            else
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Some thing happend wrong, please contact at site admistror!";
                return Ok(responseModel);
            }
        }
    }

}