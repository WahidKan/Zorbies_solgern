using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Solgen.Service.AutomationFlow;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/AutomationFlow")]
    public class AutomationFlowController : Controller
    {
        private readonly IAutomationFlowService _AutomationFlowService;
        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        private Guid parsedUserID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public AutomationFlowController(IAutomationFlowService AutomationFlowService)
        {
            _AutomationFlowService = AutomationFlowService;
        }

        [Route("GetAutomationFlowList")]
        [Authorize]
        [HttpGet]

        public IActionResult GetAutomationFlowList(string sortDir, string sortColumn, int page, int pageSize, int submoduleid, string objectname)
        {
            var automationFlowList = _AutomationFlowService.GetAutomationFlow(sortDir, sortColumn, page, pageSize, userID.ToString(), (int)companyID, submoduleid, objectname);
            return Ok(automationFlowList);
        }

        [HttpPost]
        [Authorize]
        [Route("DeleteAutomationFlow")]
        public IActionResult DeleteAutomationFlow(string Id)
        {
            var result = new ResultResponseModel();
            var response = _AutomationFlowService.DeleteAutomationFlow(Id, (int)companyID, userID.ToString());
            if (!string.IsNullOrEmpty(response))
            {

                result.StatusCode = 200;
                result.ResponseMessage = "Automation Flow has been deleted successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while deleting Automation Flow.";
            }

            return Ok(result);
        }
        [HttpPost]
        [Route("DeleteMultipleAutomationFlow")]
        [Authorize]
        public IActionResult DeleteMultipleAutomationFlow(string ids)
        {
            var resultResponseModel = new ResultResponseModel();
            try
            {
                string data = ids.Replace("undefined", "");
                var dataFinal = data;
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result = _AutomationFlowService.DeleteAutomationFlow(item, (int)companyID, userID.ToString());
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Automation Flow has been deleted successfully.";
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
        [Route("AutomationFlowQueryExecution")]
        public IActionResult AutomationFlowQueryExecution(string sqlQuery, int subModuleId, string operation, long refId)
        {
            var resultResponseModel = new ResultResponseModel();
            try
            {
                //var result;
                var result = _AutomationFlowService.AutomationFlowQueryExecution(sqlQuery, subModuleId, userID.ToString(), (int)companyID, operation, refId);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "";
                resultResponseModel.Result = result;
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [Authorize]
        [Route("AddEditAutomationFlow")]
        [HttpPost]
        public IActionResult AddEditAutomationFlow([FromBody] dynamic payload)
        {
            var result = new ResultResponseModel();
            try
            {
                string json = JsonConvert.SerializeObject(payload);

                string prepareModel = string.Concat("[", json, "]");
                var response = _AutomationFlowService.AddEditAutomationFlow(prepareModel, companyID, userID.ToString());

                if (response)
                {
                    result.StatusCode = 200;
                    result.ResponseMessage = "Flow has been updated successfully.";
                }
                else
                {
                    result.StatusCode = 200;
                    result.ResponseMessage = "Flow has been added successfully.";
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.StatusCode = 400;
                result.ResponseMessage = ex.Message;
                return Ok(result);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetAutomationFlowById")]
        public IActionResult GetAutomationFlowById(long automationFlowId)
        {
            try
            {
                var result = _AutomationFlowService.GetAutomationFlowById(automationFlowId, companyID.ToString());
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
        [Route("VerifyDuplicateFlowName")]
        public IActionResult VerifyDuplicateFlowName(string name, int? id)
        {
            try
            {
                //check duplicate name
                var response = _AutomationFlowService.VerifyDuplicateFlowName(name, id, companyID);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetSubModuleListCreatedByCustomFields")]
        public IActionResult GetSubModulesForDocumentMaker()
        {
            try
            {
                var subModules = _AutomationFlowService.GetSubModuleList((int)companyID);
                if (subModules == null)
                    return NotFound();

                return Ok(subModules);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetAutomationFlowCustomFields")]
        public IActionResult GetAutomationFlowCustomFields(string filter, int PageNo, int subModuleId)
        {
            try
            {
                var result = _AutomationFlowService.GetAutomationFlowCustomFields(companyID.ToString(), filter, PageNo, userID.ToString(), subModuleId);
                if (result == null)
                    return BadRequest();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetAutomationFlowSubFlowddl")]
        public IActionResult GetAutomationFlowSubFlowddl(string serchText, int PageNo, int id)
        {

            try
            {
                var result = _AutomationFlowService.GetAutomationFlowSubFlow(companyID.ToString(), serchText, PageNo, userID.ToString(), id);
                if (result == null)
                    return BadRequest();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetAutomationFlowCustomFieldsWithoutPaging")]
        public IActionResult GetAutomationFlowCustomFieldsWithoutPaging(int subModuleId)
        {
            try
            {
                var result = _AutomationFlowService.GetAutomationFlowCustomFieldsWithoutpaging(companyID.ToString(), userID.ToString(), subModuleId);
                if (result == null)
                    return BadRequest();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
