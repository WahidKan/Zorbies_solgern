using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Contract")]
    public class ContractController : Controller
    {
        private IContractService _contractService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? UserID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }

        public ContractController(IContractService contractService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _contractService  = contractService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        public IActionResult Index()
        {
            return View();
        }
        [Route("GetContractDetail")]
        [HttpGet]
        public async Task<string> GetContractOpportunityDetail(string opportunityId)
        {
            return await _contractService.GetContractOpportunityDetail(opportunityId);
        }
        [HttpGet]
         [Authorize]
        [Route("GetContractList")]
        public IActionResult GetContractList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, string moduleName, string submoduleName, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords)
        {
            try
            {
                var lst = _contractService.GetContractList(listFilter, sortColumn, sortDir, pageIndex, pageSize, UserID, moduleName, submoduleName, CompanyID, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, isAllRecords);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetContractDetails")]
        public async Task<IActionResult> GetContractDetails(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _contractService.GetContractDetails(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditContract")]
        public async Task<IActionResult> AddEditContract([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = _contractService.AddEditContract(model);
                if (data != null)
                {
                    var message = String.Format("Contract has been {0} successfully.", string.IsNullOrEmpty(model.Id) ? "added" : "updated");
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = message;
                   
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


        [HttpGet]
        [Authorize]
        [Route("GetOpportunityList")]
        public IActionResult GetOpportunityList(string Id, string sortColumn , string sortDir,int pageIndex, int pageSize )
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var lst = _contractService.GetOpportunityList( Id,  sortColumn,  sortDir,  pageIndex,  pageSize, userid,companyid);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}
