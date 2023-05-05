using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using authorizeLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using Solgen.Service;
using Solgen.WebApi.Helpers;
namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkOrderController : ControllerBase
    {
        private IWorkOrderService _workOrderService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public WorkOrderController(IWorkOrderService workOrderService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _commonService = commonService;
            _httpContext = httpContext;
            _workOrderService = workOrderService;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        [AuthorizeFilter]
        [Route("GetDurationByType")]
        public async Task<string> GetDurationByWorkOrderType(int id)
        {
            return await _workOrderService.GetDurationByWorkOrderType(id);
        }
        [HttpGet]
        [AuthorizeFilter]
        [Route("GetWorkOrderAccountDetail")]
        public async Task<string> GetWorkOrderAccountDetail(int accountId)
        {
            return await _workOrderService.GetWorkOrderAccountDetail(accountId);
        }
        [HttpGet]
        [AuthorizeFilter]
        [Route("GetServiceResourceDetail")]
        public async Task<string> GetServiceResourceDetail(string UserId)
        {
            return await _workOrderService.GetServiceResourceDetail(UserId);
        }
        [HttpPost]
        [AuthorizeFilter]
        [Route("GetWorkOrderList")]
        public async Task<IActionResult> GetWorkOrderList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long? companyId, string custom_view_id, bool isAllRecords)
        {
            try
            {
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                if (companyId == null)
                {
                    companyId = Convert.ToInt64(companyid);
                }

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                if (userId == null)
                {
                    userId = Guid.Parse(userid);
                }

                var lst = await _workOrderService.GetWorkOrderList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetServiceResourseServiceList")]
        public async Task<IActionResult> GetServiceResourseServiceList(string listFiltertext, string searchUserType,
            string sortColumn, string sortDir, int currentPage, int pageSizeValue, string loginuserid, string custom_view_id, string searchFilter, string moduleName, string submoduleName, Int64 companyId, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var lst = await _workOrderService.GetServiceResourseServiceList(listFiltertext, sortColumn, sortDir, currentPage, pageSizeValue, Guid.Parse(userid), moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetWorkOrderById")]
        public async Task<IActionResult> GetDepartmentById(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _workOrderService.GetWorkOrderById(id, moduleName, submoduleName, companyid, userid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("manageWorkOrder")]
        public async Task<IActionResult> manageWorkOrder([FromBody] CommanJsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Work Order has been {0} successfully.", (string.IsNullOrEmpty(model.Id)) ? "inserted" : "updated");
                string data = await _workOrderService.AddEditWorkOrder(model);
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

        [HttpPost]
        [Authorize]
        [Route("AddOrUpdateResourceService")]
        public async Task<IActionResult> AddOrUpdateResourceService([FromBody] ResourceServiceModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = await _workOrderService.AddOrUpdateResourceService(model);

                string retResponseMessage = string.Format("Service Resource has been {0} successfully.", (model.Id == null || model.Id == "") ? "added" : "updated");
                if (!string.IsNullOrEmpty(data))
                {
                    JObject _obj = JsonConvert.DeserializeObject(data) as JObject;
                    if(_obj != null)
                    {
                        if(_obj["ResourceData"] !=null)
                        {
                            var _data = _obj["ResourceData"][0];
                            responseModel.StatusCode = 500;
                            responseModel.ResponseMessage = string.Format("{0} already exists with name {1}.", _data["UserName"], _data["Name"], _data["ResourceType"]);
                        }
                        else
                        {
                            responseModel.StatusCode = 200;
                            responseModel.OptionalExtraParamers = data;
                            responseModel.ResponseMessage = retResponseMessage;
                        }
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = retResponseMessage;
                    }
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
        [Route("GetServiceTerritoryList")]

        public async Task<ActionResult> GetServiceTerritoryList(string ServiceId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string UserId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var data = await _workOrderService.GetServiceTerritoryList(ServiceId, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), UserId, CompanyId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetServiceAppointmentList")]

        public async Task<ActionResult> GetServiceAppointmentList(string ServiceId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var data = await _workOrderService.GetServiceAppointmentList(ServiceId, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), UserId, CompanyId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetServiceServiceCrewList")]

        public async Task<ActionResult> GetServiceServiceCrewList(string ServiceId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var data = await _workOrderService.GetServiceServiceCrewList(ServiceId, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), UserId, CompanyId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetServiceSkillList")]

        public async Task<ActionResult> GetServiceSkillList(string ServiceId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var data = await _workOrderService.GetServiceSkillList(ServiceId, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), UserId, CompanyId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        //added new
        [HttpGet]
        [Authorize]
        [Route("GetServiceCrewSkillList")]

        public async Task<ActionResult> GetServiceCrewSkillList(string ServiceId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var data = await _workOrderService.GetServiceCrewSkillList(ServiceId, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), UserId, CompanyId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetServiceGetAbcenseList")]
        public async Task<ActionResult> GetServiceGetAbcenseList(string ServiceId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var data = await _workOrderService.GetServiceGetAbcenseList(ServiceId, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), UserId, CompanyId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SaveServiceSkill")]
        public async Task<IActionResult> SaveServiceSkill([FromBody] ServiceResourceSkillModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyID;
                var data = _workOrderService.SaveServiceSkill(model);
                if (model.skillId == null || model.skillId == "")
                {

                    result.ResponseMessage = "Service Resource Skill has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Service Resource Skill has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        [Authorize]
        [Route("SaveServiceCrewSkill")]
        public async Task<IActionResult> SaveServiceCrewSkill([FromBody] ServiceResourceSkillModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyID;
                var data = _workOrderService.SaveServiceCrewSkill(model);
                if (model.skillId == null || model.skillId == "")
                {

                    result.ResponseMessage = "Service Resource Skill has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Service Resource Skill has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }

        #region ManageSkill

        [HttpPost]
        [Authorize]
        [Route("AddEditSkill")]
        public async Task<IActionResult> AddEditSkill([FromBody] SkillModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyID;
                var data = _workOrderService.AddEditSkill(model);
                
                result.ResponseMessage = data.Result;
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }



        [HttpPost]
        [Authorize]
        [Route("AddEditTimezone")]
        public async Task<IActionResult> AddEditTimezone([FromBody] TimeZoneModel models)
        {
            ResultResponseModel result = new ResultResponseModel();
            models.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                models.companyId = companyID;
                var data = _workOrderService.AddEditTimezone(models);

                result.ResponseMessage = data.Result;
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }


        [Authorize]
        [HttpGet]
        [Route("GetManageSkillListingData")]
        public async Task<ActionResult> GetManageSkillListingData(string name, string sortColumn, string sortDir, long page, long pageSize)
        {
            try
            
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetManageSkillListingData(name,sortColumn, sortDir, page, pageSize, companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetTimezoneListingData")]
        public async Task<ActionResult> GetTimezoneListingData(string name, string sortColumn, string sortDir, long page, long pageSize)
        {
            try
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetTimezoneListingData(name, sortColumn, sortDir, page, pageSize, companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        #region Requirements
        [Authorize]
        [HttpGet]
        [Route("GetRequirementListingData")]
        public async Task<ActionResult> GetRequirementListingData(string name, string sortColumn, string sortDir, long page, long pageSize)
        {
            try

            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetRequirementListingData(name, sortColumn, sortDir, page, pageSize, companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddeditRequirement")]
      public async Task<ActionResult> AddeditRequirement([FromBody] requirementModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyID;
                var data = _workOrderService.AddeditRequirement(model);
                result.ResponseMessage = data.Result;
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetRequirementById")]
        public IActionResult GetRequirementById(string documentId)
        {
            try
            {
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = _workOrderService.GetRequirementById(documentId, companyId);

                if (result == null)
                    return BadRequest();
                return Content(result, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }




        #endregion

        #region WorkType

        [Authorize]
        [HttpGet]
        [Route("GetWorkTypeListingData")]
        public async Task<ActionResult> GetWorkTypeListingData(string name, string sortColumn, string sortDir, long page, long pageSize)
        {
            try

            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetWorkTypeListingData(name, sortColumn, sortDir, page, pageSize, companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddeditWorkTypeRecords")]
        public async Task<ActionResult> AddeditWorkTypeRecords([FromBody] workTypeModel model)
        {

            ResultResponseModel result = new ResultResponseModel();
            try
            {
                model.Userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = await _workOrderService.AddeditWorkTypeRecords(model);

                result.ResponseMessage = data;
                result.StatusCode = 200;

                return Ok(result);
            }   
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [Authorize]
        [HttpGet]
        [Route("GetEditWorkTypeRecordsById")]
        public async Task<ActionResult> GetEditWorkTypeRecordsById(string Id)
        {
            try

            {

                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetEditWorkTypeRecordsById(Id,companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteWorkType")]
        public IActionResult DeleteWorkType(int Id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var result = _workOrderService.DeleteWorkType(Id, companyId,UserId);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = result.Result;

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
        [Authorize]
        [Route("AddEditProductRequiredData")]
        public async Task<ActionResult> AddEditProductRequiredData([FromBody] ProductRequiredmodel model)
        {

            ResultResponseModel result = new ResultResponseModel();
            try
            {
                model.Userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = await _workOrderService.AddEditProductRequiredData(model);

                result.ResponseMessage = data;
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }



        [HttpPost]
        [Authorize]
        [Route("AddEditskillRequirementsData")]
        public async Task<ActionResult> AddEditskillRequirementsData([FromBody] SkillRequirementModel model)
        {

            ResultResponseModel result = new ResultResponseModel();
            try
            {
                model.Userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = await _workOrderService.AddEditskillRequirementsData(model);

                result.ResponseMessage = data;
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetProductRequiredGridData")]
        public async Task<ActionResult> GetProductRequiredGridData(string sortColumn, string sortDir, long page, long pageSize,int WorkOrderId=0)
        {
            try

            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetProductRequiredGridData(sortColumn, sortDir, page, pageSize, companyId, UserId, WorkOrderId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetSkillRequirementsGridData")]
        public async Task<ActionResult> GetSkillRequirementsGridData(string sortColumn, string sortDir, long page, long pageSize)
        {
            try

            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetSkillRequirementsGridData(sortColumn, sortDir, page, pageSize, companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        #endregion



        #region Project Requirements 
        [Authorize]
        [HttpGet]
        [Route("GetProjectRequirementListingData")]
        public async Task<ActionResult> GetProjectRequirementListingData(string AccountNumber, string name, string sortColumn, string sortDir, long page, long pageSize)
        {
            try

            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetProjectRequirementListingData(AccountNumber,name, sortColumn, sortDir, page, pageSize, companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Route("GetRequirementDll")]
        public List<MasterItems> GetRequirementDll(string id, int length, string serchText)
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if (id == "null")
            { id = "0"; }

            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _workOrderService.GetRequirementDll(userid, companyid, id, length, serchText);

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


        [HttpPost]
        [Authorize]
        [Route("AddeditProjectRequirement")]
        public async Task<ActionResult> AddeditProjectRequirement([FromBody] requirementModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyID;
                var data = _workOrderService.AddeditProjectRequirement(model);
                result.ResponseMessage = data.Result;
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        #endregion


        [HttpGet]
        [Authorize]
        [Route("DeleteSkill")]
        public IActionResult DeleteSkill(int Id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var result = _workOrderService.DeleteSkill(Id, companyId);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = result.Result;

                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        #endregion

        [HttpPost]
        [Authorize]
        [Route("SaveServiceTerritory")]
        public async Task<IActionResult> SaveServiceTerritory([FromBody] ServiceTerritoryModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyID;
                var data = _workOrderService.SaveServiceTerritory(model);
                if (model.territoryId == null || model.territoryId == "")
                {

                    result.ResponseMessage = "Service Territory has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Service Territory Skill has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        [Authorize]
        [Route("SaveServiceCrew")]
        public async Task<IActionResult> SaveServiceCrew([FromBody] ServiceResourceCrewModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = _workOrderService.SaveServiceCrew(model);
                if (model.crewMemberId == null || model.crewMemberId == "")
                {

                    result.ResponseMessage = "Service Territory has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Service Territory Skill has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }

        //SaveServiceAbcense

        [HttpPost]
        [Authorize]
        [Route("SaveServiceAbcense")]
        public async Task<IActionResult> SaveServiceAbcense([FromBody] ServiceAbcenseModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = _workOrderService.SaveServiceAbcense(model);
                if (model.id == null || model.id == "")
                {
                    
                    result.ResponseMessage = "Absence record of the resource has been added successfully";
                }
                else
                {
                    result.ResponseMessage = "Absence record of the resource has been updated successfully";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }
      
        [Authorize]
        [HttpGet]
        [Route("GetWorkOrderServiceAppointmentList")]
        public async Task<ActionResult> GetWorkOrderServiceAppointmentList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _workOrderService.GetWorkOrderServiceAppointmentList(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [Authorize]
        [HttpPost]
        [Route("addeditProductRequired")]
        public async Task<ActionResult> addeditProductRequired([FromBody] ProductRequiredModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = _workOrderService.addeditProductRequired(model);
                if (model.Id == null || model.Id == "")
                {

                    result.ResponseMessage = "Product Required has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Product Required has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }
        }


        [Authorize]
        [HttpPost]
        [Route("AddeditEngineeringQuestionData")]
        public async Task<ActionResult> AddeditEngineeringQuestionData([FromBody] AddeditEngineeringQuestionModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = _workOrderService.AddeditEngineeringQuestionData(model);
                if (model.workOrderId == null || model.workOrderId == "")
                {

                    result.ResponseMessage = "Record has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Record has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetWorkOrderProductRequiredList")]
        public async Task<ActionResult> GetWorkOrderProductRequiredList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _workOrderService.GetWorkOrderProductRequiredList(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }




        [Authorize]
        [HttpGet]
        [Route("GetOpportunityList")]
        public async Task<ActionResult> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _workOrderService.GetOpportunityList(Id, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }



        [Authorize]
        [HttpGet]
        [Route("GetEngineeringQuestionData")]
        public async Task<ActionResult> GetEngineeringQuestionData(long workOrderId)
        {
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                string UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var data = await _workOrderService.GetEngineeringQuestionData(workOrderId, companyID, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetWorkOrderProposal")]
        public async Task<ActionResult> GetWorkOrderProposal(long workOrderId)
        {
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _workOrderService.GetWorkOrderProposal(workOrderId, companyID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetWorkOrderSumaryData")]
        public  ActionResult GetWorkOrderSumaryData(long workOrderId)
        {
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data =  _workOrderService.GetWorkOrderSumaryData(workOrderId, companyID,UserId.ToString());
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditfixOrder")]
        public async Task<IActionResult> AddEditfixOrder([FromBody] FixOrderJsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Fix Order has been {0} successfully.", (string.IsNullOrEmpty(model.object_id)) ? "created" : "created");
                var data = await _workOrderService.AddEditfixOrder(model);
                if (model.object_id == null || model.object_id == "" || model.object_id == "0" || data == 1)
                {
                    responseModel.StatusCode = 200;
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

        [HttpGet]
        [Authorize]
        [Route("GetFixOrderData")]
        public async Task<IActionResult> GetFixOrderData(string workOrderid)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _workOrderService.GetFixOrderData(workOrderid, companyid, userid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [Authorize]
        [HttpGet]
        [Route("GetWorkOrderLineItemList")]
        public async Task<ActionResult> GetWorkOrderLineItemList(long workorderid, string sortColumn, string sortDir, int PageNo, int pageSize)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var data = await _workOrderService.GetWorkOrderLineItemList(workorderid, sortColumn, sortDir, PageNo, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpPost]
        [Route("updateStatusOrCreateLog")]
        public async Task<ActionResult> updateStatusOrCreateLog([FromBody]StartWorkOrderModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();

            try
            {
                model.userId = UserId.ToString();
                model.companyId = CompanyID;

                var data = await _workOrderService.updateStatusOrCreateLog(model);
                if (!string.IsNullOrEmpty(data))
                {
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Work Order Status updated Successfully.";
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
                responseModel.Result = ex.Message.ToString();
                return Ok(responseModel);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetWorkOrderHistoryList")]
        public async Task<ActionResult> GetWorkOrderHistoryList(long workorderid, string sortColumn, string sortDir, long PageNo, long pageSize)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var data = await _workOrderService.GetWorkOrderHistoryList(workorderid, sortColumn, sortDir, PageNo, pageSize);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [HttpGet]
        [Authorize]
        [Route("WorkOrderAuditReviewData")]
        public IActionResult WorkOrderAuditReviewData(long id,string accountId)
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _workOrderService.WorkOrderAuditReviewData(id, accountId, companyId, userId);
            //if (result == null)
            //    return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        [Route("GetZonesLocationsList")]
        public async Task<IActionResult> GetZonesLocationsList(long offset, string searchText)
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var result = await _workOrderService.GetZonesLocationsList(companyId, offset, searchText);
            return Content(result, "application/json");
        }

        [HttpGet]
        [Route("GetSiteZonePriorityList")]
        public async Task<IActionResult> GetSiteZonePriorityList(string sortColumn, string sortDir, long pageNo, long pageSize, long primaryKey)
        {
            var result = await _workOrderService.GetSiteZonePriorityList(sortColumn,sortDir,pageNo,pageSize,primaryKey);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetSiteZonePriorityListForEdit")]
        public async Task<IActionResult> GetSiteZonePriorityListForEdit(long primaryKey)
        {
            var result = await _workOrderService.GetSiteZonePriorityListForEdit(primaryKey);
            return Ok(result);
        }

        [HttpPost]
        [Route("ManagetSiteSurveyZonePriority")]
        public async Task<IActionResult> ManagetSiteSurveyZonePriority([FromBody]SiteSurveyModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var result = await _workOrderService.ManagetSiteSurveyZonePriority(model);

                if (result == "1" && model.EditMode == true)
                {
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Site Survey Zone Priority updated suceessfully.";
                }
                else if (result == "1" && model.EditMode == false)
                {
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Site Survey Zone Priority added suceessfully.";
                }
                else 
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                    return BadRequest(responseModel);
                }

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                responseModel.Result = ex.Message.ToString();
                return BadRequest(responseModel);
            }
        }

        [HttpGet]
        [Route("GetAutoGenerateLineItemNo")]
        public async Task<IActionResult> GetAutoGenerateLineItemNo(long PworkOrderId)
        {
            var result = await _workOrderService.GetAutoGenerateLineItemNo(PworkOrderId);
            return Ok(result);
        }
        [HttpGet]
        [Route("getWorkOrderList")]
        public async Task<IActionResult> getWorkOrderList(long PworkOrderId)
        {
            var result = await _workOrderService.getWorkOrderList(PworkOrderId);
            return Ok(result);
        }
        [HttpGet]
        [Route("getlineItemStatusList")]
        public async Task<IActionResult> getlineItemStatusList()
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

            var result = await _workOrderService.getlineItemStatusList(companyId);
            return Ok(result);
        }
        [Authorize]
        [HttpPost]
        [Route("addeditWorkOrderLineItem")]
        public async Task<ActionResult> addeditWorkOrderLineItem([FromBody] workOrderLineItemModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = await _workOrderService.addeditWorkOrderLineItem(model);
                if (model.lineItem_id == null || model.lineItem_id == 0)
                {

                    result.ResponseMessage = "Record has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Record has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet]
        [Route("getLineItemById")]
        public IActionResult getLineItemById(string id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {

                int Id = Convert.ToInt32(id);
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
           
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        
                var data = _workOrderService.getLineItemById(Id);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
    }
}