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
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Workflow")]
    public class WorkFlowController : Controller
    {
        private readonly UserHub _timeHub;
        private IWorkFlowService _WorkFlowService;
        private IUserConnectionManager _userConnectionManager;
        private IRealTimeService _realTimeService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public ILogService logService { get; }

        public WorkFlowController(IWorkFlowService WorkFlowService,
            IRealTimeService realTimeService,
            IUserConnectionManager userConnectionManager,
            ILogService logService)
        {
            _WorkFlowService = WorkFlowService;
            _userConnectionManager = userConnectionManager;
            this.logService = logService;
            _realTimeService = realTimeService;
        }

        /*! 
        * \brief   Get the list of RuleEngine
        * \details Function is used to fetch the list of Noification
        * \author  Kiran Bala 
        * \date    13 Sep 2019
        * \version 1.0    
        */
        [HttpGet]
        [Authorize]
        [Route("GetRuleEngineList")]

        public IActionResult GetRuleEngineList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_WorkFlowService.GetList(name, sortColumn, sortDir, page, pageSize, Guid.Parse(uid), CompanyID));
        }


        [HttpGet]
        [Authorize]
        [Route("GetCustomFieldBySubModuleId")]
        public IActionResult GetCustomFieldBySubModuleId(long? subModuleId,long screenid,bool isdecision)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _WorkFlowService.GetCustomFieldBySubModuleId(companyid, userid, 1, subModuleId,screenid,isdecision);

            return Content(result, "application/json");
        }

        [HttpGet]
        [Route("GetCustomButtonDDL")]
        public List<MasterItems> GetCustomButtonDDL(string id, int length, string serchText)
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if (id == "null")
            { id = "0"; }

            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _WorkFlowService.GetCustomButtonDDL(userid, companyid, id, length, serchText);

                if (data != null)
                {
                    return data;
                }
                else
                {
                    return new List<MasterItems>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetCustomButtonDetailByFlowId")]
        [Authorize]
        public IActionResult GetCustomButtonDetailByFlowId(long? id)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            var User_id = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _WorkFlowService.GetCustomButtonDetailByFlowId(id, CompanyID, User_id);
            if (result != null)
            {
                responseModel.StatusCode = 200;
            }
            else
            {
                responseModel.StatusCode = 220;
            }
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("saveCustomButton")]
        public async Task<IActionResult> saveCustomButton([FromBody] WorkFlowModel model)   
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var _result = await _WorkFlowService.saveCustomButton(model, userid, Convert.ToInt64(companyid));
                if (_result > 0)
                {
                    if (model.Id == 0)
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Flow has been mapped with selected custom button.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Flow has been mapped with selected custom button";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong.";
                    return Ok(resultResponseModel);
                }
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong.";
                return Ok(resultResponseModel);
            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddUpdateRuleEngine")]

        public IActionResult AddUpdateRuleEngine([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);

            string prepareModel = string.Concat("[", json, "]");



            bool isSuccess = _WorkFlowService.Save(prepareModel, userid, Convert.ToInt64(companyid));
            if (isSuccess)
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Flow has been added successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while saving  Flow.";
            }

            return Ok(result);

        }


        [HttpPost]
        [Authorize]
        [Route("CheckRuleNameExist")]

        public IActionResult CheckRuleNameExist([FromBody] CheckFlowName model)
        {


            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var data = _WorkFlowService.CheckRuleNameExist(model.FlowName, model.FlowId, userid, Convert.ToInt64(companyid));
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
        [Route("GetRuleList")]

        public IActionResult GetRuleList(string name, long? loanProduct, string sortColumn, string sortDir, int page, int pageSize)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_WorkFlowService.GetRuleList(name, loanProduct, sortColumn, sortDir, page, pageSize, userid, Convert.ToInt64(companyid)));
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
        [Route("GetRuleSummaryList")]

        public IActionResult GetRuleSummaryList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_WorkFlowService.GetRuleSummaryList(name, sortColumn, sortDir, page, pageSize, userid, CompanyID));
        }

        [HttpGet]
        [Authorize]
        [Route("GetRuleDetailById")]
        public async Task<IActionResult> GetRuleDetailById(long ruleId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _WorkFlowService.GetRuleDetailById(Guid.Parse(userid), Convert.ToInt64(companyid), ruleId);

                if (result == null)
                    return BadRequest();
                return Content(result, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteRule")]
        public IActionResult DeleteRule(long ruleId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _WorkFlowService.DeleteRule(Convert.ToInt64(ruleId));

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Flow has been deleted successfully.";
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
        [Route("DeletedMultipleRules")]
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
                    result = _WorkFlowService.DeleteRule(Convert.ToInt64(item));
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Rules has been deleted successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [HttpPost("ChangeStatus/{id}")]
        [Authorize]
        /*! 
        * \brief  Change Status of Rule.
        * \details Function is used to  Add update Email template Status.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult ChangeStatus(long id)
        {
            ResultResponseModel result = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var effectedRow = _WorkFlowService.ChangeStatus(id);
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
        [Authorize]
        [Route("GetRuleTypeList")]

        public IActionResult GetRuleTypeList()
        {
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_WorkFlowService.GetRuleTypeList(Convert.ToInt64(companyId)));
        }

        [HttpGet]
        [Authorize]
        [Route("GetRuleEngineVersionList")]

        public IActionResult GetRuleEngineVersionList(long ruleId)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_WorkFlowService.GetRuleEngineVersionList(ruleId, Convert.ToInt32(companyId), Guid.Parse(userId)));
        }

        [HttpGet]
        [Authorize]
        [Route("GetSubModules")]
        public IActionResult GetSubModules(int moduleId,string screenids,bool isDecision)
        {
            try
            {
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var subModules = _WorkFlowService.GetSubModuleList(moduleId, Convert.ToInt32(companyid),screenids,isDecision);
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
        [Route("GetSubModuleEventList")]
        public IActionResult GetSubModuleEventList(int subModuleId)
        {
            try
            {
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var subModules = _WorkFlowService.GetSubModuleEventList(subModuleId, Convert.ToInt32(companyid));
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
        [Route("GetLoanApplicationRuleList")]
        public IActionResult GetLoanApplicationRuleList(long loanApplicationId, string eventCode)
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var rules = _WorkFlowService.GetLoanApplicationRuleList(loanApplicationId, eventCode, Convert.ToInt32(companyid), false);
            return Ok(rules);
        }

        [HttpGet]
        [Authorize]
        [Route("GetDisplayOrder")]
        public IActionResult GetDisplayOrder()
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var displayOrder = _WorkFlowService.GetDisplayOrder(Convert.ToInt32(companyid));
            return Ok(displayOrder);
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
                    LogShortMessage = String.Concat("Start execute rule engine target for  ", model.LoanApplicationId),
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
                var rules = _WorkFlowService.GetLoanApplicationRuleList(model.LoanApplicationId, model.EventCode, Convert.ToInt32(companyid), true);

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

                    var targets = _WorkFlowService.GetLoanApplicationRuleTargetList(rule.RuleId, Convert.ToInt32(companyid));

                    foreach (var target in targets)
                    {
                        try
                        {
                            targetId = target.TargetId;
                        }
                        catch (Exception ex) { }
                        try
                        {
                            var result = _WorkFlowService.ExecuteRuleEngineTarget(rule.RuleId, rule.RuleEngineTrackId, Convert.ToInt32(companyid), model.LoanApplicationId, target.TargetId, target.DatabaseCondition, target.DisplayCondition, rule.RuleTypeId);
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

                var data = _WorkFlowService.ExecuteRuleEngineApplicationStatus(model.LoanApplicationId, Convert.ToInt32(companyid), Guid.Parse(userId));

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

            var lst = _WorkFlowService.GetLoanApplicationListForApplyRule(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, CompanyID, batchid, ruleId, listFor);

            return Ok(lst);
        }

        [HttpPost]
        [Authorize]
        [Route("ApplyRuleVersionToApplication")]
        public IActionResult ApplyRuleVersion([FromBody] ApplyVersionModel model)
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            var rslt = _WorkFlowService.ApplyRuleVersion(model.RuleId, model.ApplicationIds, Convert.ToInt64(companyid));

            return Ok(rslt);
        }
        [HttpGet]
        [Authorize]
        [Route("getScreenFormField")]
        public IActionResult getScreenFormField(long? moduleId, long? subModuleId, long? formid)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyid = CompanyID;
            var result = _WorkFlowService.getScreenFormField(moduleId, subModuleId, formid, userid, companyid);

            return Content(result, "application/json");
        }
        [HttpGet]
        [Authorize]
        [Route("GetScreenFormsList")]

        public IActionResult GetScreenFormsList(string name, string sortColumn, string sortDir, int page, int pageSize, long submoduleid, string usedSreenid)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_WorkFlowService.GetScreenFormsList(name, sortColumn, sortDir, page, pageSize, Guid.Parse(uid), CompanyID, submoduleid, usedSreenid));
        }

    }
}