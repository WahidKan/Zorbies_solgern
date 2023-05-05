using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceCrewMemberController : ControllerBase
    {
        private IServiceCrewMemberService _serviceCrewMemberService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public ServiceCrewMemberController(IServiceCrewMemberService serviceCrewMemberService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _serviceCrewMemberService = serviceCrewMemberService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        [HttpGet]
        [Route("GetServiceCrewMembersList")]
        public async Task<IActionResult> GetServiceCrewList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyId;
                var lst = await _serviceCrewMemberService.GetServiceCrewMemberList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }


        [HttpGet]
        [Route("GetServiceCrewMemberListByServiceCrewId")]
        public async Task<IActionResult> GetServiceCrewMemberListByServiceCrewId(string sortColumn, string sortDir, int pageIndex, int pageSize, long crewId)
        {
            try
            {
                var lst = await _serviceCrewMemberService.GetServiceCrewMemberListByServiceCrewId(sortColumn, sortDir, pageIndex, pageSize, crewId, UserId, CompanyId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpGet]
        [Route("GetServiceAppointmentListByServiceCrewId")]
        public async Task<IActionResult> GetServiceAppointmentListByServiceCrewId(string sortColumn, string sortDir, int pageIndex, int pageSize, long crewId)
        {
            try
            {
                var lst = await _serviceCrewMemberService.GetServiceAppointmentListByServiceCrewId(sortColumn, sortDir, pageIndex, pageSize, crewId, UserId, CompanyId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }

        [HttpPost]
        [Route("ManageServiceCrewMember")]
        public async Task<IActionResult> ManageServiceCrewMember([FromBody]ServiceCrewMemberModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var resourceModel = _serviceCrewMemberService.ConvertForCheckResourceAvailability(model.FormJsonData);
                resourceModel.CrewMemberId = model.CrewMemberId;
                resourceModel.companyId = CompanyId.ToString();
                model.companyId = CompanyId.ToString();

                var _result = await _serviceCrewMemberService.CheckResourceAvailability(resourceModel);
                if(string.IsNullOrEmpty(_result) || String.Equals(_result,"4"))
                {
                    string data = await _serviceCrewMemberService.ManageServiceCrewMember(model);
                    string retResponseMessage = string.Format("Service Crew Member has been {0} successfully.", string.IsNullOrEmpty(model.CrewMemberId) ? "inserted" : "updated");
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
                }
                //else if(String.Equals(_result, "4"))
                //{
                //    responseModel.StatusCode = 500;
                //    responseModel.ResponseMessage = "Already Exists";
                //}
                else
                {
                    responseModel.StatusCode = 220;
                    responseModel.ResponseMessage = _result;
                }
                return Ok(responseModel);
            }
            catch //(Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return Ok(responseModel);
            }
        }


        [HttpGet]
        [Route("GetServiceResourcesByServiceCrewId/{crewId}")]
        public async Task<IActionResult> GetServiceResourcesByServiceCrewId( long crewId)
        {
            try
            {
                ResultResponseModel responseModel = new ResultResponseModel();
                var data = await _serviceCrewMemberService.GetServiceResourcesByServiceCrewId(crewId);
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = data;
                }
                return Ok(responseModel);
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }

        [HttpGet]
        [Route("GetServiceCrewMembersWithResourceType")]
        public async Task<IActionResult> GetServiceCrewMembersWithResourceType(string searchtxt, string sortColumn, string sortDir, int pageIndex, int pageSize, long crewId)
        {
            try
            {
                var lst = await _serviceCrewMemberService.GetServiceCrewMembersWithResourceType(searchtxt,sortColumn, sortDir, pageIndex, pageSize, crewId, UserId, CompanyId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }

    }
}