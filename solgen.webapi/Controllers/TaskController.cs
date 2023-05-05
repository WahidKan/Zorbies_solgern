using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;

using Solgen.Service;

using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Task")]
    public class TaskController : Controller
    {
        private ITaskService _taskService;
        private ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        private readonly UserManager<ApplicationUser> _userManager;
        public TaskController(ITaskService taskService, ICommonService commonService, IHttpContextAccessor httpContext, UserManager<ApplicationUser> userManager)
        {
            _taskService = taskService;
            _commonService = commonService;
            _httpContext = httpContext;
            _userManager = userManager;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }

        public static object Factory { get; internal set; }

        public IActionResult Index()
        {
            return Json("test");
        }

        [Route("TaskGetAssignedUsers")]

        //[Authorize]
        public IActionResult GetAssignedUsers()
        {

            var masterItems = _taskService.GetAssignedUsers();
            if (masterItems == null)
            {
                masterItems = new List<MasterItems>();
            }
            return Json(masterItems);

        }



        [Route("AddEditTask")]
        [HttpPost]
        [Authorize]


        public IActionResult AddEditTask([FromBody] UpdateTaskModel model)
        {
            model.DueDate = model.DueDate.AddDays(1);
            //model.DueDate= model.DueDate.Replace('T', ' ').Replace("Z", "");


            //model.DueTime = model.DueTime.Substring(model.DueTime.IndexOf('T'), 5);

            ResultResponseModel resultResponseModel = new ResultResponseModel();
            model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {



                var result = _taskService.UpdateTaskData(model);
                resultResponseModel.StatusCode = 200;

                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                _commonService.AddActivityLog(model.userId, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Error.ToString(), " is trying to add/edit bank but error occur in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }



        [Route("GetSingleTask")]
        public IActionResult GetTaskData(string taskID)
        {

            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {



                var result = _taskService.GetSingleTaskData(taskID);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.Result = result;
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Error.ToString(), " is trying to add/edit bank but error occur in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }

        }



        [Route("DeleteTask")]
        public IActionResult DeleteTask(string taskID)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {



                var result = _taskService.DelteTaskData(taskID);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.Result = result;
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Error.ToString(), " is trying to add/edit bank but error occur in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }

        }

        [Route("SaveAttachment")]
        //[Authorize]
        [HttpPost]
        public IActionResult SaveAttachment([FromBody] FileUpload objModel)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            objModel.CompanyId = CompanyID.ToString();
            try
            {

                objModel.User = userid;
                objModel.CompanyId = CompanyID.ToString();
                string data = _taskService.SaveOpportunityAttachment(objModel, (int)CompanyID);
                return Ok(data);
            }catch(Exception ex)
            {
                return  BadRequest(ex.Message);
            }
        }



        //[Route("SaveAttachment")]
        ////[Authorize]
        //[HttpPost]
        //public async Task<IActionResult> SaveAttachment([FromForm] FileUpload model)
        //{
        //    //var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
        //    //objModel.CompanyId = CompanyID.ToString();
        //    //try
        //    //{

        //    //    objModel.User = userid;
        //    //    objModel.CompanyId = CompanyID.ToString();
        //    //    string data = _taskService.SaveOpportunityAttachment(objModel, (int)CompanyID);
        //    //    return Ok(data);
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return BadRequest(ex.Message);
        //    //}
        //    string filePath = ""; string filePrefix = ""; enumFileFolder enumfoldername = enumFileFolder.leadViewData;
        //    bool isMediaServer = false; string Type = "";

        //    var data = "";
        //    filePath = CommonSettings.AppSetting["CommonSettings:UploadAppointmentViewData"];
        //    filePrefix = "Appointment";
        //    enumfoldername = enumFileFolder.appointmentFile;

        //    var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
        //    model.CompanyId = CompanyID.ToString();
        //    model.User = userid;
        //    if (Request.Form.Files.Count > 0)
        //    {
        //        var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
        //        model.FileName = fileResult.Item1 ?? "";

        //        foreach (FormFile item in Request.Form.Files)
        //        {
        //            HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
        //            if (NodefilePath.Headers.Location != null)
        //            {
        //                string nodeFileUrl = NodefilePath.Headers.Location.ToString();

        //                var url = nodeFileUrl.Split("//");
        //                if (url.Count() > 0)
        //                {
        //                    model.FileUrl = "https://" + url[1];
        //                }

        //                model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
        //                isMediaServer = true;
        //                Type = Path.GetExtension(model.FileUrl);
        //                data = await _taskService.SaveOpportunityAttachment(model,(int)CompanyID, isMediaServer, Type);
        //            }
        //        }
        //    }
        //    return Ok(data);
        //}

        [Route("SaveLeadMobileAttachment")]
        //[Authorize]
        [HttpPost]
        public IActionResult SaveLeadMobileAttachment([FromBody] LeadFileUpload leadobjModel)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            leadobjModel.CompanyId = CompanyID;
            try
            {

                leadobjModel.Userid = userid;
                leadobjModel.CompanyId = CompanyID;
                string domainName = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                if (leadobjModel.FileUrl.Contains(domainName))
                {
                    leadobjModel.FileUrl = leadobjModel.FileUrl.Replace(domainName, "");
                }
                
                string data = _taskService.SaveLeadMobileAttachment(leadobjModel, (int)CompanyID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("GetAttachments")]
        [HttpGet]

        public IActionResult GetAttachmentList(int pageNo, string type,string LoanId)
        {
            FileUpload objModel = new FileUpload();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            objModel.User = userid;
            objModel.RefId = LoanId;
            objModel.CompanyId = Convert.ToString(CompanyID);
            objModel.PageNo = pageNo;
            objModel.type = type;


            var result = _taskService.GetAttachmentList(objModel, (int)CompanyID);
            return Json(result);

        }

        [Route("GetCommunicationForCustomers")]
        public IActionResult GetCommunicationForCustomers()
        {

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;


            var result = _taskService.GetCommunicationForCustomers(Guid.Parse(userid), (int)CompanyID);
            return Content(result, "application/json");
        }
        [Route("GetMobileDashBoard")]
        public IActionResult GetMobileDashBoard()
        {

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;


            var result = _taskService.GetDashboardCountForMobile(Guid.Parse(userid), (int)CompanyID);
            return Json(result);
        }
        [Route("GetNotificationsforListing")]
        public IActionResult GetNotificationsList()
        {

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;


            var result = _taskService.GetNotificationsforListing(Guid.Parse(userid), (int)CompanyID);
            return Content(result, "application/json");
        }
        [Route("GetLoanApplicationSatgeByAccountId")]
        [HttpGet]

        public IActionResult GetLoanApplicationSatgeByAccountId(int ApplicationId)
        {

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;


            var result = _taskService.GetLoanApplicationSatgeByAccountId(Guid.Parse(userid), (int)CompanyID, ApplicationId);
            return Content(result, "application/json");
        }
        [Route("GetDocumentsDashBoardCount")]
        [HttpGet]
        [Authorize]
        public IActionResult GetDocumentsDashBoardCount(int LoanApplicationID)
        {

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;




            var result = _taskService.GetDocumentsDashBoardCount(userid, (int)CompanyID,LoanApplicationID);
            return Content(result, "application/json");




        }

        [Route("GetLoanApplicationsForCustomers")]
        [HttpPost]

        public IActionResult GetLoanApplicationsForCustomers()
        {

            ResultResponseModel resultResponseModel = new ResultResponseModel();


            try
            {

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var result = _taskService.GetLoanApplicationsForCustomers(Guid.Parse(userid), (int)CompanyID);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.Result = result;
                return Ok(resultResponseModel);

            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.Result = null;

                return Ok(resultResponseModel);
            }


        }
        //[Route("UploadImageFromMobile")]
        //[HttpPost]
        //public IActionResult UploadImageFromMobile([FromForm] FileUpload model)
        //{
        //    try
        //    {       
        //    ResultResponseModel resultResponseModel = new ResultResponseModel();
        //    if (model != null && Request.Form.Files.Count > 0)
        //    {
        //            if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]))
        //            {
        //                Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
        //            }
        //            var result = Util.UploadFileFromBase64(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
        //            model.image = result.Item1;

        //            string fileUrl = "";
        //            if (model.image != null)
        //            {
        //                fileUrl = CommonFunctions.GetFileLink(model.image, "image", enumFileFolder.UploadDocuments);
        //                fileUrl = fileUrl.Replace("wwwroot", "");
        //            }

        //        resultResponseModel.StatusCode = 200;
        //        resultResponseModel.ResponseMessage = fileUrl;

        //        return Ok(resultResponseModel);
        //    }

        //    else
        //    {
        //        resultResponseModel.StatusCode = 500;
        //        resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
        //        return Ok(resultResponseModel);
        //    }
        //    }
        //    catch (Exception ex)
        //    {
        //        ResultResponseModel resultResponseModel = new ResultResponseModel();

        //        resultResponseModel.StatusCode = 200;
        //        resultResponseModel.ResponseMessage = ex.Message;

        //        return Ok(resultResponseModel);
        //    }
        //}

        [Route("UploadLeadImageFromMobile")]
        [HttpPost]
        public IActionResult UploadLeadImageFromMobile([FromForm] LeadFileUpload model)
        {
            try
            {
                ResultResponseModel resultResponseModel = new ResultResponseModel();
                if (model != null && Request.Form.Files.Count > 0)
                {
                    if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]))
                    {
                        Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    }
                    var result = Util.UploadFileFromBase64(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
                    model.image = result.Item1;

                    string fileUrl = "";
                    if (model.image != null)
                    {
                        fileUrl = CommonFunctions.GetFileLink(model.image, "image", enumFileFolder.UploadDocuments);
                        fileUrl = fileUrl.Replace("wwwroot", "");
                    }

                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = fileUrl;

                    return Ok(resultResponseModel);
                }

                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            catch (Exception ex)
            {
                ResultResponseModel resultResponseModel = new ResultResponseModel();

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = ex.Message;

                return Ok(resultResponseModel);
            }
        }


        [Route("SaveProductDeliveryDate")]
        [HttpPost]
        [Authorize]
        public IActionResult SaveProductDeliveryDate([FromBody] SaveProductDateModel result)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            result.companyid = CompanyID;
            result.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var data = _taskService.SaveProductDeliveryDate(result);
            resultResponseModel.StatusCode = 200;
            resultResponseModel.ResponseMessage = "Product delivered date Updated.";
            return Ok(resultResponseModel);
        }
    }
}
