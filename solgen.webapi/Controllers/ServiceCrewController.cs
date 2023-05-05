using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceCrewController : ControllerBase
    {
        private IServiceCrewService _serviceCrewService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public ServiceCrewController(IServiceCrewService serviceCrewService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _serviceCrewService = serviceCrewService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        [HttpGet]
        [Route("GetServiceCrewList")]
        public async Task<IActionResult> GetServiceCrewList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyId;
                var lst = await _serviceCrewService.GetServiceCrewList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }

        [HttpPost]
        [Route("ManageServiceCrew")]
        public async Task<IActionResult> ManageServiceCrew([FromBody]ServiceCrewModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.companyId = CompanyId;
                string data = await _serviceCrewService.ManageServiceCrew(model);       
                    
                string retResponseMessage = string.Format("Service Crew has been {0} successfully.", string.IsNullOrEmpty(model.CrewId) ? "added" : "updated");
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
            catch //(Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }

    }
}