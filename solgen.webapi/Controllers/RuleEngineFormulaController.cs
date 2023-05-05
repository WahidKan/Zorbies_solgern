using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Service;
using Solgen.Service.RuleEngineFormula;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/RuleEngineFormula")]
    public class RuleEngineFormulaController : Controller
    {
        private IRuleEngineFormulaService _RuleEngineFormulaService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public RuleEngineFormulaController(IRuleEngineFormulaService RuleEngineFormulaService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _RuleEngineFormulaService = RuleEngineFormulaService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }


        [Route("GetRuleEngineList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetOperatingHoursList(string filter, string sortColumn, string sortDir, int page, int pageSize)
        {
            return Ok(_RuleEngineFormulaService.GetRuleEngineFormulaList(filter, sortColumn, sortDir, page, pageSize, CompanyId.ToString()));
        }




        [HttpPost]
        [Authorize]
        [Route("AddEditRuleEngineFormula")]
        public IActionResult AddEditRuleEngineFormula([FromBody] dynamic model)
        {
            ResultResponseModel result = new ResultResponseModel();
            string json = JsonConvert.SerializeObject(model);

            string prepareModel = string.Concat("[", json, "]");
            string id = Convert.ToString(JObject.Parse(json)["id"]);

            bool isSuccess = _RuleEngineFormulaService.AddEditRuleEngineFormula(id, prepareModel, CompanyId.ToString(), UserId.ToString());
            if (isSuccess)
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Rule Engine Formula has been added successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while saving Rule Engine Formula.";
            }

            return Ok(result);

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
