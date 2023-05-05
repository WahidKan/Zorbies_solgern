using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/SolgenRuleEngine")]
    public class SolgenRuleEngineController : Controller
    {
        private readonly UserHub _timeHub;
        private ISolgenRuleEngineService _SolgenRuleEngineService;
        private IUserConnectionManager _userConnectionManager;
        private IRealTimeService _realTimeService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public ILogService logService { get; }

        public SolgenRuleEngineController(ISolgenRuleEngineService SettingRuleEngineService,
            IRealTimeService realTimeService, 
            IUserConnectionManager userConnectionManager,
            ILogService logService)
        {
            _SolgenRuleEngineService = SettingRuleEngineService;
            _userConnectionManager = userConnectionManager;
            this.logService = logService;
            _realTimeService = realTimeService;
        }

        /*! 
        * \brief   Get the list of SolgenRuleEngine
        * \details Function is used to fetch the list of Noification
        * \author  Afnan Akhtar
        * \date    30 Apr 2021
        * \version 1.0    
        */

        [HttpGet]
        [Authorize]
        [Route("GetSolgenRuleList")]

        public IActionResult GetRuleList(string name, long? ModuleId, long? SubModuleId, string sortColumn, string sortDir, int PageNo, int pageSize)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_SolgenRuleEngineService.GetRuleList(name, ModuleId, SubModuleId, sortColumn, sortDir, PageNo, pageSize, Convert.ToInt64(companyid)));
        }

        [HttpGet]
        [Authorize]
        [Route("GetSolgenRuleDetailById")]
        public async Task<IActionResult> GetRuleDetailById(string ruleId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _SolgenRuleEngineService.GetRuleDetailById(Guid.Parse(userid), Convert.ToInt64(companyid), ruleId);

                if (result == null)
                    return BadRequest();
                return Content(result, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateSolgenRuleEngine")]

        public IActionResult AddUpdateRuleEngine([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);
            string ruleId = Convert.ToString(JObject.Parse(json)["ruleId"]);

            string prepareModel = string.Concat("[", json, "]");

            bool isSuccess = _SolgenRuleEngineService.Save(prepareModel, ruleId, userid, Convert.ToInt64(companyid));
            if (isSuccess)
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Rule Engine has been added successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while saving rule.";
            }

            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        [Route("CheckSolgenRuleNameExist")]
        public IActionResult CheckRuleNameExist([FromBody] CheckRuleName model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var data = _SolgenRuleEngineService.CheckRuleNameExist(model.RuleName, model.RuleId, userid, Convert.ToInt64(companyid));
            if (data == "Exists")
            {
                result.StatusCode = 201;
                result.ResponseMessage = "Rule Name already exists.";
            }
            else
            {

            }

            return Ok(result);

        }


        [HttpGet]
        [Authorize]
        [Route("GetSolgenSubModuleEventList")]
        public IActionResult GetSubModuleEventList(int subModuleId)
        {
            try
            {
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var subModules = _SolgenRuleEngineService.GetSubModuleEventList(subModuleId, Convert.ToInt32(companyid));
                if (subModules == null)
                    return NotFound();

                return Ok(subModules);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetSolgenSubModules")]
        public IActionResult GetSubModules(int moduleId)
        {
            try
            {
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var subModules = _SolgenRuleEngineService.GetSubModuleList(moduleId, Convert.ToInt32(companyid));
                if (subModules == null)
                    return NotFound();

                return Ok(subModules);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetSolgenModules/{masterNames}")]
        public IActionResult GetMasterItems(string masterNames, string masterKeyText = "")
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                lst = _SolgenRuleEngineService.GetSolgenModules(masterNames, uid, CompanyID, masterKeyText);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetSolgenCustomFieldBySubModuleId")]
        public IActionResult GetCustomFieldBySubModuleId(long?moduleId,long? subModuleId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _SolgenRuleEngineService.GetCustomFieldBySubModuleId(companyid, userid, moduleId, subModuleId);

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetDynamicReportFieldsListBySubModuleId")]
        public IActionResult GetDynamicReportFieldsListBySubModuleId(long? moduleId, long? subModuleId, string subModuleCode)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _SolgenRuleEngineService.GetDynamicReportFieldsListBySubModuleId(companyid, userid, moduleId, subModuleId, subModuleCode);

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetCustomFieldOptionsList")]
        public IActionResult GetCustomFieldOptionsList( long fieldId, long? subModuleId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _SolgenRuleEngineService.GetCustomFieldOptionsList(companyid, userid, 1, subModuleId, fieldId);

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteSolgenRule")]
        public IActionResult DeleteRule(string ruleId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _SolgenRuleEngineService.DeleteRule(ruleId);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Rule has been deleted successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [HttpPost("ChangeSolgenRuleStatus/{id}")]
        [Authorize]
        /*! 
        * \brief  Change Status of Rule.
        * \details Function is used to  Add update Email template Status.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult ChangeStatus(string id)
        {
            ResultResponseModel result = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var effectedRow = _SolgenRuleEngineService.ChangeStatus(id);
            if (effectedRow != null)
            {
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else
            {
                result.ResponseMessage = "Error";
                result.StatusCode = (int)HttpStatusCode.OK;

            }
            return Ok(result);
        }

        [HttpGet]
        [Route("DeletedMultipleSolgenRules")]
        [Authorize]
        public IActionResult DeletedMultipleRules(string ruleIds)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string data = ruleIds.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result = _SolgenRuleEngineService.DeleteRule(item);
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Users has been deleted successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetSolgenRuleDisplayOrder")]
        public IActionResult GetDisplayOrder()
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var displayOrder = _SolgenRuleEngineService.GetDisplayOrder(Convert.ToInt32(companyid));
            return Ok(displayOrder);
        }

        [HttpGet]
        [Authorize]
        [Route("GetSettingRuleEngineList")]
        
        public IActionResult GetSettingRuleEngineList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_SolgenRuleEngineService.GetList(name, sortColumn, sortDir, page, pageSize, Guid.Parse( uid), CompanyID));
        }

        /*! 
       * \brief   Get the list of Rule Summary
       * \details Function is used to fetch the rule engine summary
       * \author  Amandeep Singh
       * \date    29 Oct 2020
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("GetSettingRuleSummaryList")]
        public IActionResult GetRuleSummaryList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_SolgenRuleEngineService.GetRuleSummaryList(name, sortColumn, sortDir, page, pageSize, userid, CompanyID));
        }

        [HttpGet]
        [Authorize]
        [Route("GetRuleTypeList")]
        public IActionResult GetRuleTypeList()
        {
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_SolgenRuleEngineService.GetRuleTypeList(Convert.ToInt64(companyId)));
        }

        [HttpGet]
        [Authorize]
        [Route("GetRuleEngineVersionList")]
        public IActionResult GetRuleEngineVersionList(long ruleId)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_SolgenRuleEngineService.GetRuleEngineVersionList(ruleId, Convert.ToInt32(companyId),Guid.Parse(userId)));
        }

        [HttpGet]
        [Authorize]
        [Route("GetLoanApplicationRuleList")]
        public IActionResult GetLoanApplicationRuleList(long loanApplicationId,string eventCode)
        {
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var rules= _SolgenRuleEngineService.GetLoanApplicationRuleList(loanApplicationId,eventCode, Convert.ToInt32(companyid), false);               
                return Ok(rules);            
        }
       
        [HttpPost]
        [Authorize]
        [Route("ExecuteRuleEngineTarget")]
        public IActionResult ExecuteRuleEngineTarget([FromBody]RuleEngineExecuteModel model)
        {
            long ruleId = 0;
            long targetId = 0;
            try
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Information,
                    LogShortMessage =String.Concat("Start execute rule engine target for  ",model.LoanApplicationId),
                    LogLongMessage = String.Concat("Start execute rule engine target for  ", model.LoanApplicationId),
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.Now
                });

                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var stamp = User.Claims.FirstOrDefault(x => x.Type == "Stamp")?.Value;
                var rules = _SolgenRuleEngineService.GetLoanApplicationRuleList(model.LoanApplicationId, model.EventCode, Convert.ToInt32(companyid), true);

                foreach (var rule in rules)
                {
                    targetId = 0;
                    try
                    {
                        ruleId = rule.RuleId;
                    }
                    catch (Exception ex) { }
                    if (model.ConnectionId != null)
                    {
                        _realTimeService.RuleStartNotification(model.ConnectionId, rule.RuleId);
                    }

                    var targets = _SolgenRuleEngineService.GetLoanApplicationRuleTargetList(rule.RuleId, Convert.ToInt32(companyid));

                    foreach (var target in targets)
                    {
                        try
                        {
                            targetId = target.TargetId;
                        }
                        catch (Exception ex) { }
                        try
                        {
                            var result = _SolgenRuleEngineService.ExecuteRuleEngineTarget(rule.RuleId, rule.RuleEngineTrackId, Convert.ToInt32(companyid), model.LoanApplicationId, target.TargetId, target.DatabaseCondition, target.DisplayCondition, rule.RuleTypeId);
                            if (model.ConnectionId != null)
                            {
                                _realTimeService.TargetCompletionNotification(model.ConnectionId, rule.RuleId, target.TargetId, Convert.ToInt16(result.Status.ToString()));
                            }
                        }
                        catch (Exception ex)
                        {
                            if (model.ConnectionId != null)
                            {
                                _realTimeService.TargetCompletionNotification(model.ConnectionId, rule.RuleId, target.TargetId, 0);
                            }
                        }
                        targetId = 0;
                    }

                    if (model.ConnectionId != null)
                    {
                        _realTimeService.RuleCompletionNotification(model.ConnectionId, rule.RuleId, 1);
                    }

                    ruleId = 0;
                }

                var data = _SolgenRuleEngineService.ExecuteRuleEngineApplicationStatus(model.LoanApplicationId, Convert.ToInt32(companyid));

                if (model.ConnectionId != null)
                {
                    _realTimeService.ApplicationStatusCompletionNotification(model.ConnectionId, model.LoanApplicationId, 1);
                }

                logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Information,
                    LogShortMessage = String.Concat("End execute rule engine target for  ", model.LoanApplicationId),
                    LogLongMessage = String.Concat("End execute rule engine target for  ", model.LoanApplicationId),
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.Now
                });

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Information,
                    LogShortMessage = String.Concat("Exception execute rule engine target for  ", model.LoanApplicationId, "--ruleid--", ruleId, "--TargetId--", targetId),
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.Now
                });

                return BadRequest();

            }
            
            
            
        }

        [HttpGet]
        [Authorize]
        [Route("GetLoanApplicationListForApplyRule")]
        public IActionResult GetLoanApplicationListForApplyRule(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long batchid, long ruleId, string listFor)
        {
            userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

            var lst = _SolgenRuleEngineService.GetLoanApplicationListForApplyRule(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, CompanyID, batchid, ruleId, listFor);

            return Ok(lst);
        }

        [HttpPost]
        [Authorize]
        [Route("ApplyRuleVersionToApplication")]
        public IActionResult ApplyRuleVersion([FromBody] ApplyVersionModel model)
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            var rslt = _SolgenRuleEngineService.ApplyRuleVersion(model.RuleId, model.ApplicationIds, Convert.ToInt64(companyid));

            return Ok(rslt);
        }

        [HttpGet]
        [Authorize]
        [Route("GetSolgenRuleEngineFormulasList")]
        public IActionResult GetSolgenRuleEngineFormulasList(int length, string searchText = null)
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            var result = _SolgenRuleEngineService.GetSolgenRuleEngineFormulasList(Convert.ToInt64(companyid), length, searchText);

            return Ok(result);

        }
        
    }
}