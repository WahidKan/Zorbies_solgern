using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Solgen.Service.SolgenQueue;
using System.Threading.Tasks;
using Solgen.Core.Models;
using Solgen.WebApi.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.WebApi.HubConfig;
using Solgen.Service;
using System.Net;

namespace Solgen.WebApi.Controllers
{
   
    [Produces("application/json")]
    [Route("api/solgenqueue")]
    public class SolgenQueueController : Controller
    {
        private readonly UserHub _timeHub;
        private ISolgenQueueService _SolgenQueueService;
        private IUserConnectionManager _userConnectionManager;
        private IRealTimeService _realTimeService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public ILogService logService { get; }

        public SolgenQueueController(ISolgenQueueService SettingQueueService,
            IRealTimeService realTimeService,
            IUserConnectionManager userConnectionManager,
            ILogService logService)
        {
            _SolgenQueueService = SettingQueueService;
            _userConnectionManager = userConnectionManager;
            this.logService = logService;
            _realTimeService = realTimeService;
        }

        /*! 
        * \brief   Get the list of SolgenQueue
        * \details Function is used to fetch the list of Noification
        * \author  Afnan Akhtar
        * \date    30 Apr 2021
        * \version 1.0    
        */

        [HttpGet]
        [Authorize]
        [Route("GetSolgenQueuesList")]

        public IActionResult GetQueueList(string filter, string sortColumn, string sortDir, int PageNo, int pageSize)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_SolgenQueueService.GetQueueList(filter, sortColumn, sortDir, PageNo, pageSize, Convert.ToInt64(companyid)));
        }

        [HttpGet]
        [Authorize]
        [Route("GetSolgenQueueDetailById")]
        public async Task<IActionResult> GetQueueDetailById(string queueId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = await _SolgenQueueService.GetQueueDetailById(Guid.Parse(userid), Convert.ToInt64(companyid), queueId);

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
        [Route("AddUpdateSolgenQueue")]

        public IActionResult AddUpdateQueue([FromBody] dynamic model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            string json = JsonConvert.SerializeObject(model);
            string queueId = Convert.ToString(JObject.Parse(json)["queueId"]);

            string prepareModel = string.Concat("[", json, "]");

            bool isSuccess = _SolgenQueueService.Save(prepareModel, queueId, userid, Convert.ToInt64(companyid));
            if (isSuccess)
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Queue has been added successfully.";
            }
            else
            {
                result.StatusCode = 400;
                result.ResponseMessage = "An error occurred while saving queue.";
            }

            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        [Route("CheckSolgenQueueNameExist")]
        public IActionResult CheckQueueNameExist([FromBody] CheckQueueName model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var data = _SolgenQueueService.CheckQueueNameExist(model.QueueName, model.QueueId, userid, Convert.ToInt64(companyid));
            if (data == "Exists")
            {
                result.StatusCode = 201;
                result.ResponseMessage = "Queue is already exist with same name. Please enter another Queue Name.";
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
                var subModules = _SolgenQueueService.GetSubModuleEventList(subModuleId, Convert.ToInt32(companyid));
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
        public IActionResult GetSubModules()
        {
            try
            {
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var subModules = _SolgenQueueService.GetSubModuleList(Convert.ToInt32(companyid));
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
        [Route("GetSolgenCustomFieldBySubModuleId")]
        public IActionResult GetCustomFieldBySubModuleId(long? moduleId, long? subModuleId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _SolgenQueueService.GetCustomFieldBySubModuleId(companyid, userid, moduleId, subModuleId);

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetCustomFieldOptionsList")]
        public IActionResult GetCustomFieldOptionsList(long fieldId, long? subModuleId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _SolgenQueueService.GetCustomFieldOptionsList(companyid, userid, 1, subModuleId, fieldId);

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteSolgenQueue")]
        public IActionResult DeleteQueue(string queueId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _SolgenQueueService.DeleteQueue(queueId);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Queue has been deleted successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [HttpPost("ChangeSolgenQueueStatus/{id}")]
        [Authorize]
        /*! 
        * \brief  Change Status of Queue.
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
            var effectedRow = _SolgenQueueService.ChangeStatus(id);
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
        [Route("DeletedMultipleSolgenQueues")]
        [Authorize]
        public IActionResult DeletedMultipleQueues(string queueIds)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string data = queueIds.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result = _SolgenQueueService.DeleteQueue(item);
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
        [Route("GetSolgenQueueDisplayOrder")]
        public IActionResult GetDisplayOrder()
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var displayOrder = _SolgenQueueService.GetDisplayOrder(Convert.ToInt32(companyid));
            return Ok(displayOrder);
        }

        [HttpGet]
        [Authorize]
        [Route("GetSettingQueueList")]

        public IActionResult GetSettingQueueList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_SolgenQueueService.GetList(name, sortColumn, sortDir, page, pageSize, Guid.Parse(uid), CompanyID));
        }

        /*! 
       * \brief   Get the list of Queue Summary
       * \details Function is used to fetch the queue  summary
       * \author  Amandeep Singh
       * \date    29 Oct 2020
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("GetSettingQueueSummaryList")]
        public IActionResult GetQueueSummaryList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_SolgenQueueService.GetQueueSummaryList(name, sortColumn, sortDir, page, pageSize, userid, CompanyID));
        }

  
        [HttpGet]
        [Authorize]
        [Route("GetQueueVersionList")]
        public IActionResult GetQueueVersionList(long queueId)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            return Ok(_SolgenQueueService.GetQueueVersionList(queueId, Convert.ToInt32(companyId), Guid.Parse(userId)));
        }

        [HttpGet]
        [Authorize]
        [Route("GetLoanApplicationQueueList")]
        public IActionResult GetLoanApplicationQueueList(long loanApplicationId, string eventCode)
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var queues = _SolgenQueueService.GetLoanApplicationQueueList(loanApplicationId, eventCode, Convert.ToInt32(companyid), false);
            return Ok(queues);
        }

        
        [HttpGet]
        [Authorize]
        [Route("GetLoanApplicationListForApplyQueue")]
        public IActionResult GetLoanApplicationListForApplyQueue(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long batchid, long queueId, string listFor)
        {
            userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

            var lst = _SolgenQueueService.GetLoanApplicationListForApplyQueue(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, CompanyID, batchid, queueId, listFor);

            return Ok(lst);
        }

        

        [HttpGet]
        [Authorize]
        [Route("GetSolgenQueueFormulasList")]
        public IActionResult GetSolgenQueueFormulasList(int length, string searchText = null)
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            var result = _SolgenQueueService.GetSolgenQueueFormulasList(Convert.ToInt64(companyid), length, searchText);

            return Ok(result);

        }

    }

}
