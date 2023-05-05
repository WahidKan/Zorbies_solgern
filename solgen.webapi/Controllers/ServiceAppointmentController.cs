using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocuSign.eSign.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/serviceappointment")]
    public class ServiceAppointmentController : Controller
    {
        private IServiceAppointmentService _serviceappointmentService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public ServiceAppointmentController(IServiceAppointmentService serviceappointmentService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _serviceappointmentService = serviceappointmentService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        [Authorize]
        [Route("GetProductById")]
        public async Task<IActionResult> GetProductById(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _commonService.GetProductById(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        [Route("GetServiceAppointmentList")]
        public async Task<IActionResult> GetServiceAppointmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string form_type, string displaydate, bool isDaySelected, string searchColumn, bool isWeekSelected, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = await _serviceappointmentService.GetServiceAppointmentList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, form_type, displaydate, isDaySelected, searchColumn, isWeekSelected, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddEditProduct")]
        public async Task<IActionResult> AddEditProduct([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = _serviceappointmentService.AddEditProduct(model);
                string retResponseMessage = string.Format("Product has been {0} successfully.", (model.Id == "") ? "inserted" : "updated");
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = retResponseMessage; //"Product has been updated successfully!";
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
        [Route("GetPriceBookList")]
        public IActionResult GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetPriceBookList(nameSearch, SortColumn, SortDir, PageNo, PageSize, productid, userId, companyID);
                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }


        [Authorize]
        [HttpGet]
        [Route("GetProductsPriceBooksList")]
        public async Task<ActionResult> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _serviceappointmentService.GetProductsPriceBooksList(productId, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetProductCampaignsList")]
        public async Task<ActionResult> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _serviceappointmentService.GetProductCampaignsList(productId, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        // [Authorize]
        [HttpGet]
        [Route("GetserviceAppointmentListCountForMobile")]
        public IActionResult GetserviceAppointmentListCountForMobile()
        {
            try
            {

                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetserviceAppointmentListCountForMobile(
                  userId, companyID);

                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Route("GetserviceAppointmentListForMobile")]
        public IActionResult GetserviceAppointmentListForMobile(DateTime currentDate)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID =
                Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetserviceAppointmentListForMobile("desc", "CreatedOn", 0, 500, currentDate, userId, companyID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

        [HttpGet]
        [Route("GetserviceAppointmentStatusForMobile")]
        public IActionResult GetserviceAppointmentStatusForMobile()
        {
            try
            {
                //Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                //long companyID =
                //Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetserviceAppointmentStatusForMobile();
                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

        [HttpGet]
        [Route("GetCheckListListing")]
        public IActionResult GetCheckListListing(long questionId, long serviceAppointmentId)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetCheckListListing(userId, companyID, questionId, serviceAppointmentId);
                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Route("GetserviceAppointmentWorkOrderForMobile")]
        public IActionResult GetserviceAppointmentWorkOrderForMobile(int WorkOrderId)
        {
            try
            {
                //Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                //long companyID =
                //Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetserviceAppointmentWorkOrderForMobile(WorkOrderId);
                return Content(data, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }


        [HttpPost]
        [Route("GetChecklistForOfflineForMobile")]
        public IActionResult GetChecklistForOfflineForMobile(string version = null)
        {
            try
            {
                if (version != null)
                {
                    Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                    long companyID =
                    Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                    var data = _serviceappointmentService.GetChecklistForOfflineForMobile(userId, companyID, version);
                    return Content(data, "application/json");
                }
                else
                {
                    //Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                    //long companyID =
                    //Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                    var data = _serviceappointmentService.GetChecklistForOfflineForMobile(null, null, version);
                    return Content(data, "application/json");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Route("GetCheckListOfflineForMobileByDate")]
        public async Task<IActionResult> GetCheckListOfflineForMobileByDate(DateTime? SAScheduledDate)
        {
            try
            {
                var data = await _serviceappointmentService.GetCheckListOfflineForMobileAsync(SAScheduledDate, CompanyID);
                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Route("GetWorkOrderAccountDetailForMobile")]
        public IActionResult GetWorkOrderAccountDetailForMobile(int accountid)
        {
            try
            {
                //Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                //long companyID =
                //Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetWorkOrderAccountDetailForMobile(accountid);
                return Content(data, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

        [HttpPost]
        [Route("UpdateAppointmentStatusForMobile")]
        public IActionResult UpdateAppointmentStatusForMobile([FromBody] ServiceAppointmentStatusModel model)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID =
                Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.UserId = UserId;
                model.CompanyId = companyID;
                var data = _serviceappointmentService.UpdateAppointmentStatusForMobile(model);
                return Content(data, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }


        [HttpGet]
        [Route("GetCurrentAppointmentStatusForMobile")]
        public IActionResult GetCurrentAppointmentStatusForMobile(int SANum)
        {
            try
            {
                ServiceAppointmentStatusModel model = new ServiceAppointmentStatusModel();
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID =
                Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.UserId = UserId;
                model.CompanyId = companyID;
                model.ServiceAppointmentID = SANum;
                var data = _serviceappointmentService.GetCurrentAppointmentStatusForMobile(model);
                return Content(data, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

        [Route("SaveQuestionFile")]
        [HttpPost]
        public IActionResult SaveQuestionFile([FromBody] SaveQuestionFileModel result)
        {
            try
            {
                result.companyid = CompanyId;
                result.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var data = _serviceappointmentService.SaveQuestionFile(result);
                return Content(data, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }



        [Route("GetQuestionairForMobile")]
        [HttpGet]

        public IActionResult GetQuestionairForMobile(int SANum, string ResourceTypeName, int CheckListId, string version = null)
        {
            try
            {
                ServiceAppointmentStatusModel model = new ServiceAppointmentStatusModel();
                model.ID = CheckListId;
                model.Name = ResourceTypeName;
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.UserId = userId;
                model.version = version;
                model.CompanyId = companyID;
                model.ServiceAppointmentID = SANum;
                var data = _serviceappointmentService.GetQuestionairForMobile(model);
                return Content(data, "application/json");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [Route("DeleteAnswerForMobile")]
        [HttpGet]
        public IActionResult DeleteAnswerForMobile(int SANum)
        {
            {
                try
                {
                    //ServiceAppointmentStatusModel model = new ServiceAppointmentStatusModel();
                    Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                    long companyID =
                    Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                    var data = _serviceappointmentService.DeleteAnswerForMobile(userId, (int)companyID, SANum);
                    return Ok(data);



                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message.ToString());
                }
            }



        }


        [Route("SaveQuestionairForMobile")]
        [HttpPost]
        public IActionResult SaveQuestionairForMobile([FromBody] dynamic data)
        {

            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(data);
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyID =
            Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

            var returndata = _serviceappointmentService.SaveQuestionairForMobile(userId, (int)companyID, jsonData);
            return Ok(data);
        }


        [HttpPost]
        [Authorize]
        [Route("SaveAssignedResources")]
        public async Task<IActionResult> SaveAssignedResources([FromBody] AssignedResourcesModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.CompanyId = CompanyId;

                string data = _serviceappointmentService.SaveAssignedResources(model);

                string checkdata = Convert.ToString(data).Trim();
                if (checkdata == "-1")
                {
                    responseModel.StatusCode = 400;
                    responseModel.ResponseMessage = "Already Assigned.";
                    return Ok(responseModel);
                }

                if (checkdata == "null")
                {
                    responseModel.StatusCode = 400;
                    responseModel.ResponseMessage = "User Not Match Please Check Service Resource User.";
                    return Ok(responseModel);
                }
                if (data != null)
                {

                    //DataContractJsonSerializer deserializer = new DataContractJsonSerializer());
                    ////http://45.35.44.173:8081/Home/UpdateServiceAppointment?SaId=ContractId&AssignTo=name&AssignToEmail=email

                    //string ServiceAppointmentSF_Id = Convert.ToString(data[0].ServiceAppointmentSF_Id);
                    //string ServiceResourceName = Convert.ToString(data[0].ServiceResourceName);
                    //string ServiceResourceEmail = Convert.ToString(data[0].Email);


                    //SalesforceHttpClientHelper httpClientHelper = SalesforceHttpClientHelper.Create();
                    //var response = await httpClientHelper.Get($"Home/UpdateServiceAppointment?SaId={ServiceAppointmentSF_Id}&AssignTo={ServiceResourceName}&AssignToEmail={ServiceResourceEmail}");
                    //var contents = await response.Content.ReadAsStringAsync();

                    //if (contents == "Success")
                    //{
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Service Resource has been added successfully.";
                    //}
                    //else
                    //{
                    //    responseModel.StatusCode = 400;
                    //    responseModel.ResponseMessage = contents;
                    //}


                    //if (model.Id > 0)
                    //{
                    //    responseModel.StatusCode = 200;
                    //    responseModel.ResponseMessage = "Service Appointment has been updated successfully! ";
                    //}
                    //else
                    //{
                    //    responseModel.StatusCode = 200;
                    //    responseModel.ResponseMessage = "Service Appointment has been inserted successfully!";
                    //}
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
        [Route("AddEditServiceAppointment")]
        public async Task<IActionResult> AddEditServiceAppointment([FromBody] ServiceAppointmentModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.userId = userid;
                string data = _serviceappointmentService.AddEditServiceAppointment(model);
                dynamic obj = JsonConvert.DeserializeObject(data);
                if (data != null)
                {
                    if (string.IsNullOrEmpty(model.ServiceAppointmentId))
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Service Appointment has been added successfully";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Service Appointment has been updated successfully.";
                        responseModel.OptionalExtraParamers = obj.Status;
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
        [Route("createDublicateServiceAppt")]
        public async Task<IActionResult> CreateDublicateServiceAppt(string serviceApptId)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                //model.userId = userid;
                string data = _serviceappointmentService.CreateDublicateServiceAppt(serviceApptId, userid);
                dynamic obj = JsonConvert.DeserializeObject(data);
                if (data != null)
                {
                    if (serviceApptId == null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Service Appointment has been inserted successfully.";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Service Appointment has been updated successfully.";
                        responseModel.OptionalExtraParamers = obj.Status;
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

        [HttpPost]
        [Authorize]
        [Route("addEditAudit")]
        public async Task<IActionResult> addEditAudit([FromBody] ServiceAppointmentModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.userId = userid;

                if (model.FormJsonData == "[]")
                {
                    model.FormJsonData = null;
                }

                if (model.SubModuleCode == "[]")
                {
                    model.SubModuleCode = null;
                }

                string data = _serviceappointmentService.addEditAudit(model, CompanyId);
                if (data != null)
                {
                    if (data == "1")
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Record has been inserted successfully.";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Record has been updated successfully.";
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


        [HttpPost]
        [Authorize]
        [Route("SaveShuduleAppointAndResources")]
        public async Task<IActionResult> SaveShuduleAppointAndResources([FromBody] AssignedSacheduleResourcesModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.CompanyId = CompanyId;
                model.userId = userid;
                var dataForNotification = JsonConvert.DeserializeObject<dynamic>(model.Id);
                foreach (var p in dataForNotification)
                {
                    model.Id = p.Id;
                    model.serviceAppointment = p.SaNo;
                    string data = _serviceappointmentService.SaveShuduleAppointAndResources(model);


                    string checkdata = Convert.ToString(data).Trim();
                    if (checkdata == "-1")
                    {
                        responseModel.StatusCode = 400;
                        responseModel.ResponseMessage = "Already Assigned.";
                        return Ok(responseModel);
                    }
                    var results = JsonConvert.SerializeObject(data);

                    if (data != null)
                    {
                        if (data == "4")
                        {
                            responseModel.StatusCode = 400;
                            //responseModel.ResponseMessage = "Already Assigned this time period, Please choose another time to same resource! ";
                            responseModel.ResponseMessage = "This resource is already assigned for this service appointment, Please choose another resource!";

                        }
                        else if (data == "-9")
                        {
                            responseModel.StatusCode = 400;
                            responseModel.ResponseMessage = "The resource is not operational at the selected time.";
                        }
                        else if (data == "-10")
                        {
                            responseModel.StatusCode = 400;
                            responseModel.ResponseMessage = "You can not schedule appointment before 7AM and after 7PM";
                        }
                        else if (data == "-5")
                        {
                            responseModel.StatusCode = 400;
                            //responseModel.ResponseMessage = "Already Assigned this time period, Please choose another time to same resource! ";
                            responseModel.ResponseMessage = "This resource is not availabe at that time!";
                        }
                        else if (data == "-3")
                        {
                            responseModel.StatusCode = 400;
                            //responseModel.ResponseMessage = "Already Assigned this time period, Please choose another time to same resource! ";
                            responseModel.ResponseMessage = "This equipment resource is not availabe at that time!";
                        }
                        else
                        {
                            responseModel.StatusCode = 200;
                            responseModel.ResponseMessage = "Service appointment has been assigned successfully.";
                        }


                    }

                    else
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                    }
                }

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                //return Ok(responseModel);
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("GetServiceResourceDll")]
        public List<MasterItems> GetServiceResourceDll(string id, int length, string serchText, long departmentid)
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if (id == "null")
            { id = "0"; }

            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _serviceappointmentService.GetServiceResourceDll(userid, companyid, id, length, serchText, departmentid);

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
        [Route("GetServiceCrewDll")]
        public List<MasterItems> GetServiceCrewDll(string id, int length, string serchText)
        {
            if (id == "null")
            { id = "0"; }

            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _serviceappointmentService.GetServiceCrewDll(userid, companyid, id, length, serchText);

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
        //[Authorize]
        [Route("SaveSiteSurveyForm")]
        public IActionResult SaveSiteSurveyForm([FromBody] dynamic data)
        {
            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(data);
            string userId =
            User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyID =
            Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var result = _serviceappointmentService.SaveSiteSurveyForm(
                  jsonData, userId, companyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }


        [HttpGet]
        //[Authorize]
        [Route("GetSiteSurveyForm")]
        public IActionResult GetSiteSurveyForm(string WoNum)
        {

            string userId =
               User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyID =
           Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var result = _serviceappointmentService.GetSiteSurveyForm(
                  WoNum, userId, companyID);
                return Content(result, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }

        [HttpGet]
        //[Authorize]
        [Route("GetCheckListForMobile")]
        public IActionResult GetCheckListForMobile(string ServiceAppointmentNumber, string version = null)
        {

            string userId =
               User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            long companyID =
           Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var result = _serviceappointmentService.GetCheckListForMobile(ServiceAppointmentNumber,
                   userId, companyID, version);
                return Content(result, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }



        [HttpGet]
        [Route("GetEstimatedTravelTimeFromAndToSourceDll")]
        public List<MasterItems> GetEstimatedTravelTimeFromAndToSourceDll()
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _serviceappointmentService.GetEstimatedTravelTimeFromAndToSourceDll(userid, companyid);

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
        [Authorize]
        [Route("GetAssignedResourcesList")]
        public async Task<IActionResult> GetAssignedResourcesList(long servicesappointmentid, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

            try
            {
                var result = await _serviceappointmentService.GetAssignedResourcesList(servicesappointmentid, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetServiceapoointDetails")]
        public IActionResult GetServiceapoointDetails(string id)
        {
            string companyId = (User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var result = _serviceappointmentService.GetServiceapoointDetails(id, companyId);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("AuditReviewData")]
        public IActionResult AuditReviewData(long id)
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _serviceappointmentService.AuditReviewData(id, companyId, userId);
            //if (result == null)
            //    return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("AuditChecklistDetail")]
        public IActionResult AuditChecklistDetail(long checkList_Id, long id)
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _serviceappointmentService.AuditChecklistDetail(checkList_Id, id, companyId, userId);
            //if (result == null)
            //    return BadRequest();

            return Content(result, "application/json");
        }



        [Route("GetServiceAppointmentsForCalendar")]
        public ActionResult GetServiceAppointmentsForCalendar(String condition, string manageviewcond)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var isInternal = Convert.ToBoolean(User.Claims.FirstOrDefault(x => x.Type == "IsInternalUser").Value);
                if (isInternal == false)
                {
                    condition = "customer";
                }
                else
                {
                    condition = null;
                }
                var data = _serviceappointmentService.GetServiceAppointmentsForCalendar(userId, (int)CompanyID, condition, manageviewcond);

                return Ok(data);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("AttendanceData")]
        public IActionResult AttendanceData(long Said)
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _serviceappointmentService.AttendanceData(Said, companyId, userId);
            return Content(result, "application/json");
        }
        [HttpPost]
        [Authorize]
        [Route("saveAttendanceData")]
        public async Task<IActionResult> saveAttendanceData([FromBody] ServiceAppointmentAttendanceModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);


                string data = _serviceappointmentService.saveAttendanceData(model);
                if (data != null)
                {
                    if (data == "1")
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Record has been saved successfully.";
                    }
                    else if (data == "2")
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Record has been updated successfully.";
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
        [Route("GetContactsFromAccountsForMobile")]
        public IActionResult GetContactsFromAccountsForMobile(long Accid)
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _serviceappointmentService.GetContactsFromAccountsForMobile(Accid, companyId, userId);

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("auditChecklistCheckBox")]
        public IActionResult auditChecklistCheckBox(long checkListId, long serviceAppointmentId, bool checkBox)
        {
            long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            var result = _serviceappointmentService.auditChecklistCheckBox(checkListId, companyId, userId, serviceAppointmentId, checkBox);
            return Content(result, "application/json");
        }


        #region Audit check List
        [HttpPost]
        [Authorize]
        [Route("AddEditAuditCheckList")]
        public async Task<IActionResult> AddEditAuditCheckList([FromBody] dynamic model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                int CheckListId = 0;
                var serializeData = JsonConvert.SerializeObject(model);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

                //string json = serializeData.ReadToEnd();
                string checkListId = Convert.ToString(JObject.Parse(serializeData)["checkListId"]);
                if (checkListId == null || checkListId == "")
                {
                    checkListId = "0";
                }
                string data = _serviceappointmentService.AddEditAuditCheckList(serializeData, companyid.ToString(), userId.ToString(), Convert.ToInt32(checkListId));
                if (data != null)
                {
                    var str = data.Split(',');
                    if (str[0] == "1")
                    {
                        responseModel.Result = await this.GetCheckListDetailAutoSave(str[1]);
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Record has been saved successfully.";
                    }
                    else if (str[0] == "2")
                    {
                        responseModel.Result = await this.GetCheckListDetailAutoSave(str[1]);
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Record has been updated successfully.";
                    }

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
        [Route("GetCustomFieldBySubModuleNameCode")]
        public IActionResult GetCustomFieldBySubModuleId(string moduleCode, string subModuleCode)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _serviceappointmentService.GetCustomFieldBySubModuleNameCode(companyid, userid, moduleCode, subModuleCode);

            return Content(result, "application/json");
        }
        [HttpGet]
        [Authorize]
        [Route("GetListingGridData")]
        public IActionResult GetListingGridData(string name, string sortColumn, string sortDir, int page, int pageSize)
        {
            long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            return Ok(_serviceappointmentService.GetListingGridData(name, sortColumn, sortDir, page, pageSize, userId, companyID));
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteQuestionnaire")]
        public IActionResult DeleteQuestionnaire(string Id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                long CompanyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var result = _serviceappointmentService.DeleteQuestionnaire(Id, CompanyID);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = result;

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
        [Route("DeleteMultipleQuestionnaire")]
        public IActionResult DeleteMultipleQuestionnaire(string Ids)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                long CompanyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                string data = Ids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                string[] values = dataFinal.Split(',');
                var result = "";
                foreach (var item in values)
                {
                    result = _serviceappointmentService.DeleteQuestionnaire(item, CompanyID);
                }
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = result;

                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        public async Task<string> GetCheckListDetailAutoSave(string Id)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _serviceappointmentService.GetCheckListDetail(Id, userid, companyid);

            if (result == null)
                return null;
            return result;
        }

        [HttpGet]
        [Authorize]
        [Route("GetCheckListDetail")]
        public async Task<IActionResult> GetCheckListDetail(string Id)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _serviceappointmentService.GetCheckListDetail(Id, userid, companyid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetChecklistAutoSaveintervalInSeconds")]
        /* 
         \brief   Get Checklist Auto Save Interval In Seconds
         \details Function is used to Get Auto Save Interval In Seconds.
       * \author  Afnan Akhtar
       * \date    24 May 2021
       */
        public IActionResult GetChecklistAutoSaveinterval()
        {

            try
            {
                long companyid = CompanyID;
                var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                int referenceInterval = _serviceappointmentService.GetCheckListAutoSaveInterval(userId, companyid);
                return Ok(referenceInterval);
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion


        [Authorize]
        [HttpGet]
        [Route("GetUnscheduledApptList")]
        public async Task<ActionResult> GetUnscheduledApptList(string filterId, string filtersearch)
        {
            try
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _serviceappointmentService.GetUnscheduledApptList(companyId, UserId, filterId, filtersearch);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetCrewResourceList")]
        public async Task<ActionResult> GetCrewResourceList(string viewType, string starttime, string endtime, string filterId)
        {
            try
            {
                DateTime myDate;
                if (starttime != "null")
                {
                    myDate = DateTime.Parse(starttime);
                }
                else
                {
                    myDate = DateTime.UtcNow.Date;
                }


                DateTime lsdate = DateTime.UtcNow.Date;
                if (endtime != "null")
                {
                    lsdate = DateTime.Parse(endtime);
                }
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _serviceappointmentService.GetCrewResourceList(companyId, UserId, viewType, myDate, lsdate, filterId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        //[Authorize]
        [HttpGet]
        [Route("GetCrewResourceCalenderList")]
        public async Task<ActionResult> GetCrewResourceCalenderList(string viewType, string cuurentdate, string lastdate, bool isFirstTime, string filters)
        {
            try
            {
                long companyId = CompanyId;
                DateTime myDate = DateTime.Parse(cuurentdate);

                DateTime lsdate = DateTime.UtcNow.Date;
                if (lastdate != "null")
                {
                    lsdate = DateTime.Parse(lastdate);
                }

                var data = await _serviceappointmentService.GetCrewResourceCalenderList(companyId, UserId, viewType, myDate, lsdate, isFirstTime, filters);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddUpdateAssignedServiceAppointment")]
        public IActionResult AddUpdateAssignedServiceAppointment([FromBody] ServiceAppointmentAssignedCalenderModel model)
        {



            model.companyid = CompanyId;
            model.userId = UserId;
            Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var result = _serviceappointmentService.AddUpdateAssignedServiceAppointment(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }
        [HttpGet]
        [Route("GetServiceCrewAndResourceDll")]
        public List<MasterItems> GetServiceCrewAndResourceDll(string id, int length, string serchText, string isCrew)
        {
            if (id == "null")
            { id = "0"; }

            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _serviceappointmentService.GetServiceCrewAndResourceDll(userid, companyid, id, length, serchText, isCrew);

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
        [Authorize]
        [HttpGet]
        [Route("GetCrewListForGanttView")]
        public async Task<ActionResult> GetCrewListForGanttView(string viewType, string starttime, string endtime, string filterId)
        {
            try
            {

                DateTime myDate = DateTime.Parse(starttime);

                DateTime lsdate = DateTime.UtcNow.Date;
                if (endtime != "null")
                {
                    lsdate = DateTime.Parse(endtime);
                }
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _serviceappointmentService.GetCrewListForGanttView(companyId, UserId, viewType, myDate, lsdate, filterId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [Authorize]
        [HttpPost]
        [Route("SaveGhantViewFilter")]
        public async Task<ActionResult> SaveGhantViewFilter([FromBody] saveSa_Data model)
        {
            try
            {
                model.companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                //long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.userId = UserId;
                var data = await _serviceappointmentService.SaveGhantViewFilter(model);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [Authorize]
        [HttpGet]
        [Route("getGhantViewFilter")]
        public async Task<ActionResult> getGhantViewFilter()
        {
            try
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _serviceappointmentService.getGhantViewFilter(companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [Authorize]
        [HttpGet]
        [Route("GetMapGhantviewData")]
        public async Task<ActionResult> GetMapGhantviewData(string starttime, string endtime, string filterId)
        {
            try
            {

                DateTime myDate = DateTime.Parse(starttime);

                DateTime lsdate = DateTime.UtcNow.Date;
                if (endtime != "null")
                {
                    lsdate = DateTime.Parse(endtime);
                }
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _serviceappointmentService.GetMapGhantviewData(companyId, UserId, "", myDate, lsdate, filterId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [Authorize]
        [HttpGet]
        [Route("saveTimeZone")]
        public async Task<ActionResult> saveTimeZone(string timezoneId)
        {
            try
            {


                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _serviceappointmentService.saveTimeZone(companyId, UserId, timezoneId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetSchdeuleSaListOnAccountId")]
        public IActionResult GetSchdeuleSaListOnAccountId(long accountid, string SANo)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _serviceappointmentService.GetSchdeuleSaListOnAccountId(accountid, userId, companyID, SANo);
                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetGhantViewTimeZone")]
        [Authorize]
        /*! 
        * \brief   Get User Detail
        * \details Function is used to get the detail of Logined user
        * \author  Vikrant
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetGhantViewTimeZone(int teritoryid)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID").Value;
            int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var result = _serviceappointmentService.GetGhantViewTimeZone(userid, companyid, teritoryid);

            if (result == null)
                return BadRequest();

            result.timezone_standard_identifier = _commonService.GetTimeZone(result.timezone_standard_identifier);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetTimeZoneGhantView")]
        public List<MasterItems> GetTimeZoneGhantView(string id)
        {
            if (id == "null")
            { id = "0"; }

            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _serviceappointmentService.GetTimeZoneGhantView(userid, companyid, id);

                if (data != null)
                {
                    foreach (var item in data)
                    {
                        item.Name= _commonService.GetTimeZone(item.Name);
                    }
                    //for (int i = 0; i < data.Count(); i++)
                    //{
                    //    i.Name = _commonService.GetTimeZone(i.Name);
                    //}
                    
                    //result.TimeZone = _commonService.GetTimeZone(result.TimeZone);
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
        [Route("GetWorkorderDetailById")]
        public async Task<string> GetWorkorderDetailById(string id)
        {
            return await _serviceappointmentService.GetWorkorderDetailById(id);
        }


    }
}
