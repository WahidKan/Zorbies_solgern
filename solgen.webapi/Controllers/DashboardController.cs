using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Presentation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
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
    [Route("api/Dashboard")]
    public class DashboardController : Controller
    {
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private IDashboardService _dashboardService;
        private ILoanApplicationService _loanService;
        private readonly IHttpContextAccessor _httpContext;
        private ITaskService _taskService;
        private readonly IRealTimeService _realTimeService;
        string PrimaryKey { get; set; }
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly IEmailSettingsService _emailSettingsService;
        //private string PrimaryKey { get { return Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "PrimaryKey")?.Value); } }
        private string ContainerName { get; set; }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        //string _storageConnection = "DefaultEndpointsProtocol=https;AccountName=cogniterblob;AccountKey=oXQjBBKmxYqW25tdQMlbULpgufzkpxnc+k1ecUNUSL1FOkRplbAcQ0vanCYSiqyvMf4dudyceSDw4GMgGC2w6w==;EndpointSuffix=core.windows.net";
        string _storageConnection { get; set; }
        public ILogService logService { get; }
        CloudStorageAccount cloudStorageAccount;
        CloudBlobClient cloudBlobClient;
        CloudBlobContainer blobContainer;
        //public DashboardController(IDashboardService dashboardService)
        //{
        //    _dashboardService = dashboardService;
        //}
        public DashboardController(IDashboardService dashboardService, IEmailSettingsService emailSettingsService,
            IConfiguration config, IHttpContextAccessor httpContext, ILoanApplicationService loanService,
            UserManager<ApplicationUser> userManager, ITaskService taskService, IRealTimeService realTimeService)
        {


            _dashboardService = dashboardService;
            _taskService = taskService;
            _userManager = userManager;
            _config = config;
            _httpContext = httpContext;
            _emailSettingsService = emailSettingsService;
            _loanService = loanService;
            _realTimeService = realTimeService;

        }
        [HttpGet]
        [Authorize]
        [Route("GetDashboardNotifications")]
        /*! 
        * \brief   Get the top 5 Notification
        * \details Function is used to fetch the top 5 Notification
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetDashboardNotifications(string name, DateTime? from, DateTime? to)
        {
            List<DashboardModel> lst = new List<DashboardModel>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                lst = _dashboardService.GetDashboardNotifications(name, from, to, userid);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetTaskList")]
        /*! 
        * \brief   Get Dashboard AnnouncementList
        * \details Function is used to Get AnnouncementList for superadmin dashboard.
        * \author  Deepanshu Mangla
        * \date    28 May 2020
        * \version 1.0    
        */
        public IActionResult GetTaskList()
        {
            List<DashboardTaskList> datalist = new List<DashboardTaskList>();
            try
            {
                long companyid = CompanyID;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                datalist = _dashboardService.GetTaskList(Guid.Parse(userid), companyid);
                return Ok(datalist);
            }
            catch
            {

                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetDashboardAppointmentList")]
        /*! 
        * \brief   Get Dashboard Appointment
        * \details Function is used to Get Appointment List 
        * \author  Deepanshu Mangla
        * \date    9 sep 2020
        * \version 1.0    
        */
        public IActionResult GetDashboardAppointmentList(string fromDate, string toDate)
        {

            //DateTime sqlDate = fromDate.ToString("yyyy-MM-dd HH:mm:ss");

            List<DashboardAppointmentList> datalist = new List<DashboardAppointmentList>();

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long companyid = CompanyID;
                datalist = _dashboardService.GetDashboardAppointmentList(Guid.Parse(userid), companyid, fromDate, toDate);
                return Ok(datalist);
            }
            catch
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDashboardNewContacts")]
        /*! 
        * \brief   Get the top 5 Notification
        * \details Function is used to fetch the top 5 new contacts
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetDashboardNewContacts(string name, DateTime? from, DateTime? to)
        {
            List<ContactDashboradModel> lst = new List<ContactDashboradModel>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                lst = _dashboardService.GetDashboardNewContacts(name, from, to);
                return Ok(lst);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDashboardCounts")]
        /*! 
        * \brief   Get Dashboard Count
        * \details Function is used to Get Dashboard Count
        * \author  Kiran Bala
        * \date    27 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetDashboardCounts()
        {
            DashboardCountsModel detail = new DashboardCountsModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                detail = _dashboardService.GetDashboardCounts(userid);

                return Ok(detail);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetDashboardTotalLeaseAmount")]
        /*! 
        * \brief   Get Dashboard Total lease amount
        * \details Function is used to Get Dashboard lease amount on graph purpose.
        * \author  deepak jha
        * \date    27 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetDashboardTotalLeaseAmount(string userId)
        {
            List<DashboardTotalLeaseAmountModel> dataList = new List<DashboardTotalLeaseAmountModel>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                dataList = _dashboardService.GetDashboardTotalLeaseAmount(userId);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetDashboardWidgetforuser")]
        /*! 
        * \brief   Get Dashboard widget
        * \details Function is used to Get Dashboard widget.
        * \author  deepanshu mangla
        * \date    1 Sep 2020
        * \version 1.0    
        */
        public IActionResult GetDashboardWidgetforuser(string userId)
        {

            try
                {
                List<DashboardWidgetModel> list = new List<DashboardWidgetModel>();
                long companyid = CompanyID;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                list = _dashboardService.GetDashboardWidgetforuser(userid, companyid);

                return Ok(list);


            }

            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetDashboardWidgetForAddeditforuser")]
        /*! 
        * \brief   Get Dashboard widget
        * \details Function is used to Get Dashboard widget.
        * \author  deepanshu mangla   
        * \date    1 Sep 2020
        * \version 1.0    
        */
        public async Task<IActionResult> GetDashboardWidgetForAddeditforuser(string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID,string serviceTerritory, bool? isSuperAdmin, string companyType)
        {

            try
            {
                List<DashboardWidgetModel> list = new List<DashboardWidgetModel>();
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                list = await _dashboardService.GetDashboardWidgetForAddeditforuser(userid, CompanyID, fromDate, toDate, widgetType, recordFilter, teamID, teamMemberID, serviceTerritory, isSuperAdmin, companyType);

                return Ok(list);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetDashboardWidgetsForSuperAdmin")]
        /*! 
        * \brief   Get Dashboard widget For Super Admin 
        * \details Function is used to Get Dashboard widget For Super Admin .
        * \author  MUHAMMAD AZAM   
        * \date    25 AUG 2022
        * \version 1.0    
        */
        public async Task<IActionResult> GetDashboardWidgetsForSuperAdmin(string fromDate, string toDate, string widgetType, string recordFilter, string teamID, string teamMemberID, string serviceTerritory, bool? isSuperAdmin)
        {

            try
            {
                List<dynamic> list = new List<dynamic>();
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                list = await _dashboardService.GetDashboardWidgetsForSuperAdmin(userid, CompanyID, fromDate, toDate, widgetType, recordFilter, teamID, teamMemberID, serviceTerritory, isSuperAdmin);

                return Ok(list);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]

        // [Authorize]
        [Route("SaveWidget")]
        /*! 
        * \brief   save Dashboard widget
        * \details Function is used to save Dashboard widget
        * \author  deepanshu mangla
        * \date    1 Sep 2020
        * \version 1.0    
        */
        public IActionResult SaveWidget([FromBody] Dashboarddata model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long companyid = CompanyID;
                var result = _dashboardService.SaveWidget(companyid, userid, model.data);
                if (result != null)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Widget Has Been Added Succesfully";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while Adding Widget";
                    return Ok(resultResponseModel);
                }
            }
            catch
            {

                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetDashboardWidgetcount")]
        /*! 
        * \brief   Get Dashboard  widget   count
        * \details Function is used to Get Dashboard widget   count
        * \author  deepak jha
        * \date    27 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetDashboardWidgetcount()
        {
            List<DashboardWidgetcountmodel> dataList = new List<DashboardWidgetcountmodel>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                dataList = _dashboardService.GetDashboardWidgetcount(userid);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetOpportunityGraph")]
        /*! 
        * \brief   Get Dashboard Opportunity Graph
        * \details Function is used to Get Dashboard Opportunity graph.
        * \author  deepak jha
        * \date    27 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetOpportunityGraph(string userId, string fromDate, string toDate)
        {
            List<DashboardOpportunityGraphModel> dataList = new List<DashboardOpportunityGraphModel>();
            try
            {
                long companyid = CompanyID;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                dataList = _dashboardService.GetOpportunityGraph(userId, companyid, fromDate, toDate);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
       
        [Route("GetReferenceIntervalTime")]
        /* 
         \brief   Get Dashboard Reference Interval Time
         \details Function is used to Get Reference Interval Time.
       * \author  Vikas Rao
       * \date    19 Oct 2020
       */
        public IActionResult GetReferenceIntervalTime()
        {

            try
            {
                
                long companyid = CompanyID;
                var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
               
                int referenceInterval = _dashboardService.GetRefIntervalTime(userId, companyid);

                return Ok(referenceInterval);
            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpGet]
      
        [Route("checkUserStatus")]
        public IActionResult checkUserStatus()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            bool referenceInterval1 = _dashboardService.checkUserStatus(userId);
            return Ok(referenceInterval1);
           

        }

        [HttpGet]
        [Authorize]
        [Route("GetLeadGraph")]
        /*! 
        * \brief   Get Dashboard Opportunity Graph
        * \details Function is used to Get Dashboard Opportunity graph.
        * \author  deepak jha
        * \date    27 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetLeadGraph(string userId, string fromDate, string toDate)
        {
            List<DashboardLeadGraphModel> dataList = new List<DashboardLeadGraphModel>();
            try
            {
                long companyid = CompanyID;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                dataList = _dashboardService.GetLeadGraph(userId, companyid, fromDate, toDate);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetOpportunityOwnerGraph")]
        /*! 
        * \brief   Get Dashboard Opportunity Graph
        * \details Function is used to Get Dashboard Opportunity graph.
        * \author  deepak jha
        * \date    27 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetOpportunityOwnerGraph(string userId, string fromDate, string toDate)
        {
            List<DashboardOpportunityOwnerModel> dataList = new List<DashboardOpportunityOwnerModel>();
            try
            {
                long companyid = CompanyID;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                dataList = _dashboardService.GetOpportunityOwnerGraph(userId, companyid, fromDate, toDate);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
        //[HttpGet]
        //[Authorize]
        //[Route("GetCustommerOpportunity")]
        //public IActionResult GetCustommerOpportunity()
        //{
        //    CustomerDashboardData dataList = new CustomerDashboardData();
        //    try
        //    {
        //        var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
        //        var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
        //        dataList = _dashboardService.GetCustommerOpportunity(userid, companyId);
        //        // Version data = json.parse(dataList);
        //        return Ok(dataList);
        //    }
        //    catch// (Exception ex)
        //    {
        //        return BadRequest();
        //    }
        //}

        [HttpGet]
        [Authorize]
        [Route("GetCustommerOpportunity")]
        public IActionResult GetCustommerOpportunity(string masterNames, string masterKeyText = "")
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                lst = _dashboardService.GetCustommerOpportunity(userid, companyId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetCompanyAccountData")]
        public IActionResult GetCompanyAccountData(string oppId =null)
        {
           
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
              var  dataList = _dashboardService.GetCompanyAccountData(userid, companyId, oppId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetServiceAppointmentData")]
        public IActionResult GetServiceAppointmentData(string oppId)
        {

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var dataList = _dashboardService.GetServiceAppointmentData(oppId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetCustomerAnnouncements")]
        public IActionResult GetCustomerAnnouncements()
        {

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var dataList = _dashboardService.GetCustomerAnnouncements(companyId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetProposalAndContractStatus")]
        public IActionResult GetProposalAndContractStatus(string proposalId,string subModuleCode)
        {

            try
        
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var dataList = _dashboardService.GetProposalAndContractStatus(companyId, proposalId, subModuleCode);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetUnsignedDocument")]
        public IActionResult GetUnsignedDocument(string opportunityId)
        {

            try

            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var dataList = _dashboardService.GetUnsignedDocument(companyId, opportunityId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetContractData")]
        public IActionResult GetContractData(string OpportunityId)
        {

            try

            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var dataList = _dashboardService.GetContractData(userid,companyId, OpportunityId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetHtmlTemplates")]
        public IActionResult GetHtmlTemplates()
        {

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var dataList = _dashboardService.GetHtmlTemplates(userid, companyId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetCustomerDocumentsCount")]
        public IActionResult GetCustomerDocumentsCount(string contactId,long oppId)
        {

            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var dataList = _dashboardService.GetCustomerDocumentsCount(contactId, oppId, companyId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }



        [HttpGet]
        [Authorize]
        [Route("GetCustommerLoanApplication")]
        public IActionResult GetCustommerLoanApplication(long? id)
        {
            CustomerDashboardLoanApplicationData dataList = new CustomerDashboardLoanApplicationData();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                dataList = _dashboardService.GetCustommerLoanApplication(userid,  id, companyId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetCustommerLoanApplicationAppointment")]
        public IActionResult GetCustommerLoanApplicationAppointment()
        {
            List<AppointmentForLoanApplicationModel> dataList = new List<AppointmentForLoanApplicationModel>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                dataList = _dashboardService.GetCustommerLoanApplicationAppointment(userid, companyId);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetAccounDetails")]
        public IActionResult GetAccounDetails(string id)
        {
            AccountDetailModel dataList = new AccountDetailModel();
            try
            {
                var host = HttpContext.Request?.Host;
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                dataList = _dashboardService.GetAccounDetails(userid, id,CompanyID,host?.Value);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetContactList")]
        public IActionResult ContactList(string listFilte, string sortColumn, string sortDir, string page, string pageSize, string pageSizeValue, string loginuserid, string accountId)
        
        {
            var lst = _dashboardService.ContactList(listFilte, sortColumn, sortDir, page, pageSize, loginuserid, accountId, CompanyID);
            return Ok(lst);
        }

        [HttpGet]
        [Authorize]
        [Route("GetRelatedContactList")]
        public IActionResult GetRelatedContactList(string listFilte, string sortColumn, string sortDir, int page, int pageSize, string loginuserid, string accountId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
              var  userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _dashboardService.GetRelatedContactList(listFilte, sortColumn, sortDir, page, pageSize, loginuserid, accountId, CompanyID,userId);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("addOrUpdateUploadFileOnAzzure"), DisableRequestSizeLimit]
        public async Task<IActionResult> addOrUpdateUploadFileOnAzzure([FromForm] StoredFileOnAzure model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            List<emailDataModel> emaildata = new List<emailDataModel>();
            emailDataModel emaildata1 = new emailDataModel();
            FileUpload objModel = null;
            if (model != null)
            {
                model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CompanyId = CompanyID;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                //string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
                //string filePrefix = "companyLogo";
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                //PrimaryKey = (User.Claims.FirstOrDefault(x => x.Type == "PrimaryKey")?.Value);
                //ContainerName = Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "ContainerName")?.Value);
                //_storageConnection = "DefaultEndpointsProtocol=https;AccountName=cogniterblob;AccountKey=" + PrimaryKey + ";EndpointSuffix=core.windows.net";
                //cloudStorageAccount = CloudStorageAccount.Parse(_storageConnection);
                //cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                //blobContainer = cloudBlobClient.GetContainerReference(ContainerName);
                model.UserId = userid;
                if (Request.Form.Files.Count > 0)
                {
                    //var file = Request.Form.Files[0];
                    //string blobPath = "files/" + "CRM" + "/" + "Account" + "/" +
                    //    Guid.NewGuid().ToString() + "." + model.fileExtension;
                    //var filePath2 = Path.GetTempFileName();
                    //var result = "";
                    //using (var stream = file.OpenReadStream())
                    //{
                    //    result = await UploadBlob(stream, "." + model.fileExtension, "", "", "", blobPath);
                    //}
                    //if(model.filetype=="null")
                    //{
                    //    model.filetype = null;
                    //}

                    //if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]))
                    //{
                    //    Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    //}

                    //var result = Util.UploadFileFromBase64(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
                    //model.image= result.Item1;


                    foreach (FormFile item in Request.Form.Files)
                    {
                        HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, "Document", CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                        if (NodefilePath.Headers.Location != null)
                        {
                            string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                            var url = nodeFileUrl.Split("//");
                            if (url.Count() > 0)
                            {
                                model.FileUrl = "https://" + url[1];
                            }

                            model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                            model.isMediaServer = true;
                           
                            objModel = new FileUpload();
                            
                            objModel.FileUrl = model.FileUrl;
                            objModel.User = userid;
                            objModel.CompanyId = CompanyID + "";
                            objModel.type = model.filetype;
                            objModel.submodule = model.submoduleid;
                            objModel.module = model.moduleid;
                            objModel.accountid = model.accountid;
                            objModel.RefId = model.refid;

                            objModel.image = model.FileName;
                            objModel.fileExtension = Path.GetExtension(model.FileUrl);
                            objModel.FileName = model.DocumentTitle;
                            objModel.Description = model.description;
                            objModel.isMediaServer = model.isMediaServer;
                            var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(companyid));
                        }
                    }




                  
                    
                }
                var data = 2;
                // var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    if (model.submoduleid == "loanapplication")
                    {
                        var result = _loanService.GetDocumentForReceiveAndPending(userid, companyid, Convert.ToString(model.refid), null);
                        if (Convert.ToInt32(result.pendingDocs) == 0 && Convert.ToInt32(result.requireDoc) > 0)
                        {
                            List<string> userIds = new List<string>();
                            //  dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, companyid, "usertypefinance");
                            dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, companyid, "ReadyForReview");
                            string strUserTo = string.Empty;
                            string strCcUser = string.Empty;
                            string subjectBody = "Loan Application ***" + model.refid + " is ready for review.";
                            if (userDET.Count > 0)
                            {
                                foreach (var usrVal in userDET)
                                {
                                    userIds.Add(usrVal.Id);
                                    //strUserTo = usrVal.Id;

                                    if (string.IsNullOrEmpty(strUserTo))
                                    {
                                        strUserTo = usrVal.Id;
                                        strCcUser = usrVal.Id;
                                    }
                                    else
                                    {
                                        strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                    }
                                    if (usrVal.EmailNotification == true)
                                    {
                                        emaildata1 = new emailDataModel();
                                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                        emaildata1.email = usrVal.Email;
                                        emaildata.Add(emaildata1);
                                    }
                                }
                                var notification = new NotificationSendModel
                                {
                                    ToUser = null,
                                    CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                    Subject = "Ready for Review",
                                    SubjectBody = subjectBody,
                                    RouteUrl = "loanApplication/Detail/" + model.refid,
                                    ObjectId = model.refid.ToString(),
                                    CreatedBy = Guid.Empty.ToString(),
                                    UserIdList = userIds,
                                    CompanyId = Convert.ToString(CompanyID),

                                };
                                await _realTimeService.SendNotification(notification);
                            }

                            try
                            {
                                if (emaildata != null)
                                {
                                    Hashtable htbl = new Hashtable();
                                    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Ready for Review", subjectBody, Convert.ToString(model.refid), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                                }
                            }
                            catch
                            {
                                HttpContext.Session.Clear();
                            }

                        }
                    }
                    if (model.CompanyId > 0)
                    {
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ID = model.refid;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ID = model.refid;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Route("addOrUpdateUploadFileOnAzzureNoAuth"), DisableRequestSizeLimit]
        public async Task<IActionResult> addOrUpdateUploadFileOnAzzureNoAuth([FromForm] StoredFileOnAzure model)
        {
            string filePath = ""; string filePrefix = ""; enumFileFolder enumfoldername = enumFileFolder.leadViewData;

            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            List<emailDataModel> emaildata = new List<emailDataModel>();
            emailDataModel emaildata1 = new emailDataModel();
            if (model != null)
            {
                filePath = CommonSettings.AppSetting["CommonSettings:UploadDocuments"];
                filePrefix = "ViewDocuments";
                //enumfoldername = enumFileFolder.leadViewData;

                if (Request.Form.Files.Count > 0)
                {
                    //var result = Util.UploadFileFromBase64(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
                    //model.image = result.Item1;
                    FileUpload objModel = new FileUpload();

                    objModel.User = model.UserId;
                    objModel.CompanyId = model.CompanyId.ToString();
                    objModel.type = model.filetype;
                    objModel.submodule = model.submoduleid;
                    objModel.module = model.moduleid;
                    objModel.accountid = model.accountid;
                    objModel.RefId = model.refid ==null ? "0" : model.refid;
                    objModel.image = model.image;
                    objModel.Description = model.description;
              

                    foreach (FormFile item in Request.Form.Files)
                    {
                        HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                        if (NodefilePath.Headers.Location != null)
                        {
                            string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                            var url = nodeFileUrl.Split("//");
                            if (url.Count() > 0)
                            {
                                objModel.FileUrl = "https://" + url[1];
                            }

                            objModel.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                            objModel.isMediaServer = true;
                            model.fileExtension = Path.GetExtension(objModel.FileUrl);
                            var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(model.CompanyId));
                        }
                    }

       

                    //if (model.image != null)
                    //{

                    //    objModel.FileUrl = CommonFunctions.GetFileLink(model.image, "image", enumFileFolder.UploadDocuments);
                    //    objModel.FileUrl = objModel.FileUrl.Replace("wwwroot", "");
                    //}

                    //objModel.User = userid;
                    //objModel.CompanyId = "1004";
                    //objModel.type = model.filetype;
                    //objModel.submodule = model.submoduleid;
                    //objModel.module = model.moduleid;
                    //objModel.accountid = model.accountid;
                    //objModel.RefId = model.refid;

                    //objModel.image = model.image;
                    //objModel.fileExtension = model.fileExtension;
                    //objModel.FileName = model.DocumentTitle;
                    //objModel.Description = model.description;
                    //var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(companyid));

                }
                var data = 2;
                // var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    if (model.submoduleid == "loanapplication")
                    {
                        var result = _loanService.GetDocumentForReceiveAndPending(model.UserId, model.CompanyId.ToString(), Convert.ToString(model.refid), null);
                        if (Convert.ToInt32(result.pendingDocs) == 0 && Convert.ToInt32(result.requireDoc) > 0)
                        {
                            List<string> userIds = new List<string>();
                            //  dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, companyid, "usertypefinance");
                            dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, model.CompanyId.ToString(), "ReadyForReview");
                            string strUserTo = string.Empty;
                            string strCcUser = string.Empty;
                            if (userDET.Count > 0)
                            {
                                foreach (var usrVal in userDET)
                                {
                                    userIds.Add(usrVal.Id);
                                    //strUserTo = usrVal.Id;

                                    if (string.IsNullOrEmpty(strUserTo))
                                    {
                                        strUserTo = usrVal.Id;
                                        strCcUser = usrVal.Id;
                                    }
                                    else
                                    {
                                        strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                    }
                                    if (usrVal.EmailNotification == true)
                                    {
                                        emaildata1 = new emailDataModel();
                                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                        emaildata1.email = usrVal.Email;
                                        emaildata.Add(emaildata1);
                                    }
                                }
                                var notification = new NotificationSendModel
                                {
                                    ToUser = null,
                                    CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                    Subject = "Ready for Review",
                                    SubjectBody = "Loan Application ***" + model.refid + " is ready for review.",
                                    RouteUrl = "loanApplication/Detail/" + model.refid,
                                    ObjectId = model.refid.ToString(),
                                    CreatedBy = Guid.Empty.ToString(),
                                    UserIdList = userIds,
                                    CompanyId = Convert.ToString(CompanyID),

                                };
                                await _realTimeService.SendNotification(notification);
                            }
                           
                            try
                            {
                                if (emaildata != null)
                                {
                                    Hashtable htbl = new Hashtable();
                                    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Ready for Review", "Loan Application ***" + model.refid + " is ready for review.", Convert.ToString(model.refid), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                                }
                            }
                            catch
                            {
                                HttpContext.Session.Clear();
                            }

                        }
                    }
                    if (model.CompanyId > 0)
                    {
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ID = model.refid;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ID = model.refid;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }

        //----
        [HttpPost]
        [Authorize]
        [Route("addOrUpdateUploadFileOnAzzurePDF"), DisableRequestSizeLimit]
        public async Task<IActionResult> addOrUpdateUploadFileOnAzzurePDF([FromForm] StoredFileOnAzure model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            List<emailDataModel> emaildata = new List<emailDataModel>();
            emailDataModel emaildata1 = new emailDataModel();
            //FileUpload objModel = null;
            if (model != null)
            {
                model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CompanyId = CompanyID;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                //string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
                //string filePrefix = "companyLogo";
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                //PrimaryKey = (User.Claims.FirstOrDefault(x => x.Type == "PrimaryKey")?.Value);
                //ContainerName = Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "ContainerName")?.Value);
                //_storageConnection = "DefaultEndpointsProtocol=https;AccountName=cogniterblob;AccountKey=" + PrimaryKey + ";EndpointSuffix=core.windows.net";
                //cloudStorageAccount = CloudStorageAccount.Parse(_storageConnection);
                //cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                //blobContainer = cloudBlobClient.GetContainerReference(ContainerName);
                model.UserId = userid;
                if (Request.Form.Files.Count > 0)
                {
                    //var file = Request.Form.Files[0];
                    //string blobPath = "files/" + "CRM" + "/" + "Account" + "/" +
                    //    Guid.NewGuid().ToString() + "." + model.fileExtension;
                    //var filePath2 = Path.GetTempFileName();
                    //var result = "";
                    //using (var stream = file.OpenReadStream())
                    //{
                    //    result = await UploadBlob(stream, "." + model.fileExtension, "", "", "", blobPath);
                    //}
                    //if(model.filetype=="null")
                    //{
                    //    model.filetype = null;
                    //}
                  
                    //if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]))
                    //{
                    //    Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    //}





                    var result = Util.UploadFileFromBase64ToPDF(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
                    model.image = result.Item1;

                    // convert string to stream
                    //byte[] byteArray = Encoding.ASCII.GetBytes(contents);
                    //var fileWithPath = Path.Combine("UploadDocuments", "Aneesh.Pdf");
                    //var path = Path.Combine(fileWithPath);

                    // System.IO.File.WriteAllBytes(path, byteArray);

                    MemoryStream stream = new MemoryStream(result.Item2);

                    HttpResponseMessage NodefilePathto = await Util.UploadAttachmentNode1(stream, result.Item1, CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    if (NodefilePathto.Headers.Location != null)
                    {
                        string nodeFileUrl = NodefilePathto.Headers.Location.ToString();

                        var url = nodeFileUrl.Split("//");
                        if (url.Count() > 0)
                        {
                            model.FileUrl = "https://" + url[1];
                        }
                        model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                        model.isMediaServer = true;
                    }

                    //foreach (FormFile item in Request.Form.Files)
                    //{
                    //    HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, "Document", CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    //    if (NodefilePath.Headers.Location != null)
                    //    {
                    //        string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                    //        var url = nodeFileUrl.Split("//");
                    //        if (url.Count() > 0)
                    //        {
                    //            model.FileUrl = "https://" + url[1];
                    //        }

                    //        model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                    //        model.isMediaServer = true;

                    //        objModel = new FileUpload();

                    //        objModel.FileUrl = model.FileUrl;
                    //        objModel.User = userid;
                    //        objModel.CompanyId = CompanyID + "";
                    //        objModel.type = model.filetype;
                    //        objModel.submodule = model.submoduleid;
                    //        objModel.module = model.moduleid;
                    //        objModel.accountid = model.accountid;
                    //        objModel.RefId = model.refid;

                    //        objModel.image = model.FileName;
                    //        objModel.fileExtension = Path.GetExtension(model.FileUrl);
                    //        objModel.FileName = model.DocumentTitle;
                    //        objModel.Description = model.description;
                    //        objModel.isMediaServer = model.isMediaServer;
                    //        var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(companyid));
                    //    }
                    //}

             
                        FileUpload objModel = new FileUpload();

                        //if (model.image != null)
                        //{

                        //    objModel.FileUrl = CommonFunctions.GetFileLink(model.image, "image", enumFileFolder.UploadDocuments);
                        //    objModel.FileUrl = objModel.FileUrl.Replace("wwwroot", "");
                        //}
                   
                        objModel.FileUrl = model.FileUrl;
                        objModel.User = userid;
                        objModel.CompanyId = CompanyID + "";
                        objModel.type = model.filetype;
                        objModel.submodule = model.submoduleid;
                        objModel.module = model.moduleid;
                        objModel.accountid = model.accountid;
                        objModel.RefId = model.refid;

                        objModel.image = model.FileName;
                        objModel.fileExtension = Path.GetExtension(model.FileUrl);
                        objModel.FileName = model.DocumentTitle;
                        objModel.Description = model.description;
                        objModel.isMediaServer = model.isMediaServer;
                    var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(companyid));

                }
                var data = 2;
                // var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    if (model.submoduleid == "loanapplication")
                    {
                        var result = _loanService.GetDocumentForReceiveAndPending(userid, companyid, Convert.ToString(model.refid), null);
                        if (Convert.ToInt32(result.pendingDocs) == 0 && Convert.ToInt32(result.requireDoc) > 0)
                        {
                            List<string> userIds = new List<string>();
                            //  dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, companyid, "usertypefinance");
                            dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, companyid, "ReadyForReview");
                            string strUserTo = string.Empty;
                            string strCcUser = string.Empty;
                            string subjectBody = "Loan Application ***" + model.refid + " is ready for review.";
                            if (userDET.Count > 0)
                            {
                                foreach (var usrVal in userDET)
                                {
                                    userIds.Add(usrVal.Id);
                                    //strUserTo = usrVal.Id;

                                    if (string.IsNullOrEmpty(strUserTo))
                                    {
                                        strUserTo = usrVal.Id;
                                        strCcUser = usrVal.Id;
                                    }
                                    else
                                    {
                                        strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                    }
                                    if (usrVal.EmailNotification == true)
                                    {
                                        emaildata1 = new emailDataModel();
                                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                        emaildata1.email = usrVal.Email;
                                        emaildata.Add(emaildata1);
                                    }
                                }
                                var notification = new NotificationSendModel
                                {
                                    ToUser = null,
                                    CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                    Subject = "Ready for Review",
                                    SubjectBody = subjectBody,
                                    RouteUrl = "loanApplication/Detail/" + model.refid,
                                    ObjectId = model.refid.ToString(),
                                    CreatedBy = Guid.Empty.ToString(),
                                    UserIdList = userIds,
                                    CompanyId = Convert.ToString(CompanyID),

                                };
                                await _realTimeService.SendNotification(notification);
                            }

                            try
                            {
                                if (emaildata != null)
                                {
                                    Hashtable htbl = new Hashtable();
                                    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Ready for Review", subjectBody, Convert.ToString(model.refid), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                                }
                            }
                            catch
                            {
                                HttpContext.Session.Clear();
                            }
                        }
                    }
                    if (model.CompanyId > 0)
                    {
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ID = model.refid;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ID = model.refid;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Route("addOrUpdateUploadFileOnAzzureNoAuthPDF"), DisableRequestSizeLimit]
        public async Task<IActionResult> addOrUpdateUploadFileOnAzzureNoAuthPDF([FromForm] StoredFileOnAzure model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            List<emailDataModel> emaildata = new List<emailDataModel>();
            emailDataModel emaildata1 = new emailDataModel();
            //FileUpload objModel = null;
            if (model != null)
            {
                model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CompanyId = 1004;//CompanyID;
                var companyid = "1004";  //User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                //string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
                //string filePrefix = "companyLogo";
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                //PrimaryKey = (User.Claims.FirstOrDefault(x => x.Type == "PrimaryKey")?.Value);
                //ContainerName = Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "ContainerName")?.Value);
                //_storageConnection = "DefaultEndpointsProtocol=https;AccountName=cogniterblob;AccountKey=" + PrimaryKey + ";EndpointSuffix=core.windows.net";
                //cloudStorageAccount = CloudStorageAccount.Parse(_storageConnection);
                //cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                //blobContainer = cloudBlobClient.GetContainerReference(ContainerName);
                model.UserId = userid;
                if (Request.Form.Files.Count > 0)
                {
                    //var file = Request.Form.Files[0];
                    //string blobPath = "files/" + "CRM" + "/" + "Account" + "/" +
                    //    Guid.NewGuid().ToString() + "." + model.fileExtension;
                    //var filePath2 = Path.GetTempFileName();
                    //var result = "";
                    //using (var stream = file.OpenReadStream())
                    //{
                    //    result = await UploadBlob(stream, "." + model.fileExtension, "", "", "", blobPath);
                    //}
                    //if(model.filetype=="null")
                    //{
                    //    model.filetype = null;
                    //}
                    
                    //if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]))
                    //{
                    //    Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    //}

                    var result = Util.UploadFileFromBase64ToPDF(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
                    model.image = result.Item1;

                    MemoryStream stream = new MemoryStream(result.Item2);

                    HttpResponseMessage NodefilePathto = await Util.UploadAttachmentNode1(stream, result.Item1, CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    if (NodefilePathto.Headers.Location != null)
                    {
                        string nodeFileUrl = NodefilePathto.Headers.Location.ToString();

                        var url = nodeFileUrl.Split("//");
                        if (url.Count() > 0)
                        {
                            model.FileUrl = "https://" + url[1];
                        }
                        model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                        model.isMediaServer = true;
                    }

                    FileUpload objModel = new FileUpload();

                    //if (model.image != null)
                    //{

                    //    objModel.FileUrl = CommonFunctions.GetFileLink(model.image, "image", enumFileFolder.UploadDocuments);
                    //    objModel.FileUrl = objModel.FileUrl.Replace("wwwroot", "");
                    //}

                    objModel.FileUrl = model.FileUrl;
                    objModel.User = userid;
                    objModel.CompanyId = "1004";
                    objModel.type = model.filetype;
                    objModel.submodule = model.submoduleid;
                    objModel.module = model.moduleid;
                    objModel.accountid = model.accountid;
                    objModel.RefId = model.refid;

                    objModel.image = model.FileName;
                    objModel.fileExtension = Path.GetExtension(model.FileUrl); 
                    objModel.FileName = model.DocumentTitle;
                    objModel.Description = model.description;
                    objModel.isMediaServer = model.isMediaServer;
                    var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(companyid));

                }
                var data = 2;
                // var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    if (model.submoduleid == "loanapplication")
                    {
                        var result = _loanService.GetDocumentForReceiveAndPending(userid, companyid, Convert.ToString(model.refid), null);
                        if (Convert.ToInt32(result.pendingDocs) == 0 && Convert.ToInt32(result.requireDoc) > 0)
                        {
                            List<string> userIds = new List<string>();
                            //  dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, companyid, "usertypefinance");
                            dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, companyid, "ReadyForReview");
                            string strUserTo = string.Empty;
                            string strCcUser = string.Empty;
                            if (userDET.Count > 0)
                            {
                                foreach (var usrVal in userDET)
                                {
                                    userIds.Add(usrVal.Id);
                                    //strUserTo = usrVal.Id;

                                    if (string.IsNullOrEmpty(strUserTo))
                                    {
                                        strUserTo = usrVal.Id;
                                        strCcUser = usrVal.Id;
                                    }
                                    else
                                    {
                                        strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                    }
                                    if (usrVal.EmailNotification == true)
                                    {
                                        emaildata1 = new emailDataModel();
                                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                        emaildata1.email = usrVal.Email;
                                        emaildata.Add(emaildata1);
                                    }
                                }
                                var notification = new NotificationSendModel
                                {
                                    ToUser = null,
                                    CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                    Subject = "Ready for Review",
                                    SubjectBody = "Loan Application ***" + model.refid + " is ready for review.",
                                    RouteUrl = "loanApplication/Detail/" + model.refid,
                                    ObjectId = model.refid.ToString(),
                                    CreatedBy = Guid.Empty.ToString(),
                                    UserIdList = userIds,
                                    CompanyId = Convert.ToString(CompanyID),

                                };
                                await _realTimeService.SendNotification(notification);
                            }
                            try
                            {
                                if (emaildata != null)
                                {
                                    Hashtable htbl = new Hashtable();
                                    await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Ready for Review", "Loan Application ***" + model.refid + " is ready for review.", Convert.ToString(model.refid), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                                }
                            }
                            catch
                            {
                                HttpContext.Session.Clear();
                            }

                        }
                    }
                    if (model.CompanyId > 0)
                    {
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ID = model.refid;
                        resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ID = model.refid;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ID = model.refid;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("customeruploadfile"), DisableRequestSizeLimit]
        public async Task<IActionResult> customeruploadfile([FromForm] StoredFileOnAzure model)
        {
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var created_by = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            List<emailDataModel> emaildata = new List<emailDataModel>();
            emailDataModel emaildata1 = new emailDataModel();
            FileUpload objModel = null;
            if (model != null)
            {
                model.UserId = Guid.Empty.ToString();// User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CompanyId = model.CompanyId;
                //var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                //string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
                //string filePrefix = "companyLogo";
              //  var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
               
                model.UserId = model.UserId;
                if (Request.Form.Files.Count > 0)
                {
                    
                    //if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]))
                    //{
                    //    Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    //}

                    //var result = Util.UploadFileFromBase64(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
                    //model.image = result.Item1;


                    foreach (FormFile item in Request.Form.Files)
                    {
                        HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, "Document", CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                        if (NodefilePath.Headers.Location != null)
                        {
                            string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                            var url = nodeFileUrl.Split("//");
                            if (url.Count() > 0)
                            {
                                model.FileUrl = "https://" + url[1];
                            }

                            model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                            model.isMediaServer = true;

                            objModel = new FileUpload();

                            objModel.FileUrl = model.FileUrl;
                            objModel.User = model.UserId;
                            objModel.CompanyId = CompanyID + "";
                            objModel.type = model.filetype;
                            objModel.submodule = model.submoduleid;
                            objModel.module = model.moduleid;
                            objModel.accountid = model.accountid;
                            objModel.RefId = model.refid;
                            objModel.image = model.FileName;
                            objModel.fileExtension = Path.GetExtension(model.FileUrl);
                            objModel.FileName = model.DocumentTitle;
                            objModel.Description = model.description;
                            objModel.isMediaServer = model.isMediaServer;
                            var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(model.CompanyId));
                        }
                    }




                    //FileUpload objModel = new FileUpload();

                    //if (model.image != null)
                    //{

                    //    objModel.FileUrl = CommonFunctions.GetFileLink(model.image, "image", enumFileFolder.UploadDocuments);
                    //    objModel.FileUrl = objModel.FileUrl.Replace("wwwroot", "");
                    //}

                    //objModel.User = model.UserId;
                    //objModel.CompanyId = model.CompanyId + "";
                    //objModel.type = model.filetype;
                    //objModel.submodule = model.submoduleid;
                    //objModel.module = model.moduleid;
                    //objModel.accountid = model.accountid;
                    //objModel.RefId = model.refid;

                    //objModel.image = model.image;
                    //objModel.fileExtension = model.fileExtension;
                    //objModel.FileName = model.DocumentTitle;
                    //objModel.Description = model.description;
                    //var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(model.CompanyId));



                    #region Send Notification for the assigned Finance/Sales Users
                    bool _prodflag = true;
                  
                        string useTypeVal = "";
                        string strEmailSubject = "Document Upload";
                        string strBodyContent = "Upload Document for Application Number# ****" + model.refid + " has been uploaded";
                        if (_prodflag)
                        {
                            List<string> userIds = new List<string>();
                            dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, Convert.ToString(model.CompanyId), useTypeVal, "UploadDocument");
                            string strUserTo = string.Empty;
                            string strCcUser = string.Empty;
                            if (userDET.Count > 0)
                            {
                                foreach (var usrVal in userDET)
                                {
                                    userIds.Add(usrVal.Id);
                                    //strUserTo = usrVal.Id;

                                    if (string.IsNullOrEmpty(strUserTo))
                                    {
                                        strUserTo = usrVal.Id;
                                        strCcUser = usrVal.Id;
                                    }
                                    else
                                    {
                                        strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                    }
                                    if (usrVal.EmailNotification == true)
                                    {
                                        emaildata1 = new emailDataModel();
                                        emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                        emaildata1.email = usrVal.Email;
                                        emaildata.Add(emaildata1);
                                    }
                                }

                                var notification = new NotificationSendModel
                                {
                                    ToUser = null,
                                    CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                    Subject = strEmailSubject,
                                    SubjectBody = strBodyContent,
                                    RouteUrl = "loanApplication/Detail/" + model.refid,
                                    ObjectId = model.refid.ToString(),
                                    CreatedBy = Guid.Empty.ToString(),
                                    UserIdList = userIds,
                                    CompanyId = Convert.ToString(model.CompanyId),

                                };
                                await _realTimeService.SendNotification(notification);
                            }
                     
                       
                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Document Upload", strBodyContent, Convert.ToString(model.refid), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }
                    }


                    

                    #endregion Send Notification for the assigned Finance/Sales Users





                }
                var data = 2;
                // var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    var result = _loanService.GetDocumentForReceiveAndPending(model.UserId, Convert.ToString(model.CompanyId), Convert.ToString(model.refid), "EXTERNAL_LINK");
                    if (Convert.ToInt32(result.pendingDocs) == 0 && Convert.ToInt32(result.requireDoc) > 0)
                    {
                        List<string> userIds = new List<string>();
                        // dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, Convert.ToString(model.CompanyId), "usertypefinance");
                        dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, Convert.ToString(model.CompanyId), "ReadyForReview");
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        if (userDET.Count > 0)
                        {
                            foreach (var usrVal in userDET)
                            {
                                userIds.Add(usrVal.Id);
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = usrVal.Id;
                                    strCcUser = usrVal.Id;
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                }
                                if (usrVal.EmailNotification == true)
                                {
                                    emaildata1 = new emailDataModel();
                                    emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                    emaildata1.email = usrVal.Email;
                                    emaildata.Add(emaildata1);
                                }
                            }
                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = "Ready for Review",
                                SubjectBody = "Loan Application ***" + model.refid + " is ready for review.",
                                RouteUrl = "loanApplication/Detail/" + model.refid,
                                ObjectId = model.refid.ToString(),
                                CreatedBy = model.UserId.ToString(),
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(CompanyID),

                            };
                            await _realTimeService.SendNotification(notification);
                        }
                      
                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Ready for Review", "Loan Application ***" + model.refid + " is ready for review.", Convert.ToString(model.refid), Guid.Parse(model.UserId.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }
                    }
                    if (model.CompanyId > 0)
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Route("checkUserSession")]
        public IActionResult checkUserSession()
        {

            try
            {
             
                string data = "this is test";
                this._dashboardService.checkUserSession();
                

                
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("customeruploadfilePDF"), DisableRequestSizeLimit]
        public async Task<IActionResult> customeruploadfilePDF([FromForm] StoredFileOnAzure model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string UserName = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
            var created_by = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
         
            if (model != null)
            {
                model.UserId = Guid.Empty.ToString();// User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CompanyId = model.CompanyId;
                //var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                //string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
                //string filePrefix = "companyLogo";
                //  var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                model.UserId = model.UserId;
                if (Request.Form.Files.Count > 0)
                {

                    //if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]))
                    //{
                    //    Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    //}

                    var result = Util.UploadFileFromBase64ToPDF(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadDocuments"], "Document");
                    model.image = result.Item1;

                    MemoryStream stream = new MemoryStream(result.Item2);

                    HttpResponseMessage NodefilePathto = await Util.UploadAttachmentNode1(stream, result.Item1, CommonSettings.AppSetting["CommonSettings:UploadDocuments"]);
                    if (NodefilePathto.Headers.Location != null)
                    {
                        string nodeFileUrl = NodefilePathto.Headers.Location.ToString();

                        var url = nodeFileUrl.Split("//");
                        if (url.Count() > 0)
                        {
                            model.FileUrl = "https://" + url[1];
                        }
                        model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                        model.isMediaServer = true;
                    }

                    FileUpload objModel = new FileUpload();

                    //if (model.image != null)
                    //{

                    //    objModel.FileUrl = CommonFunctions.GetFileLink(model.image, "image", enumFileFolder.UploadDocuments);
                    //    objModel.FileUrl = objModel.FileUrl.Replace("wwwroot", "");
                    //}
                    objModel.FileUrl = model.FileUrl;
                    objModel.User = model.UserId;
                    objModel.CompanyId = model.CompanyId + "";
                    objModel.type = model.filetype;
                    objModel.submodule = model.submoduleid;
                    objModel.module = model.moduleid;
                    objModel.accountid = model.accountid;
                    objModel.RefId = model.refid;

                    objModel.image = model.FileName;
                    objModel.fileExtension = Path.GetExtension(model.FileUrl);
                    objModel.FileName = model.DocumentTitle;
                    objModel.Description = model.description;
                    objModel.isMediaServer = model.isMediaServer;
                    objModel.linkfrom = model.linkfrom;
                    var returnValue = _taskService.SaveOpportunityAttachment(objModel, Convert.ToInt32(model.CompanyId));



                    #region Send Notification for the assigned Finance/Sales Users
                    bool _prodflag = true;

                    string useTypeVal = "";
                    string strEmailSubject = "Document Upload";
                    string strBodyContent = "Upload Document for Application Number# ****" + model.refid + " has been uploaded";
                    if (_prodflag)
                    {
                        List<emailDataModel> emaildata = new List<emailDataModel>();
                        emailDataModel emaildata1 = new emailDataModel();
                        List<string> userIds = new List<string>();
                        dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, Convert.ToString(model.CompanyId), useTypeVal, "UploadDocument");
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        if (userDET.Count > 0)
                        {
                            foreach (var usrVal in userDET)
                            {
                                userIds.Add(usrVal.Id);
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = usrVal.Id;
                                    strCcUser = usrVal.Id;
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                }
                               
                                if (usrVal.EmailNotification == true)
                                {
                                    emaildata1 = new emailDataModel();
                                    emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                    emaildata1.email = usrVal.Email;
                                    emaildata.Add(emaildata1);
                                }
                            }

                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = strEmailSubject,
                                SubjectBody = strBodyContent,
                                RouteUrl = "loanApplication/Detail/" + model.refid,
                                ObjectId = model.refid.ToString(),
                                CreatedBy = Guid.Empty.ToString(),
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(model.CompanyId),

                            };
                            await _realTimeService.SendNotification(notification);
                        }

                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Document Upload", strBodyContent, Convert.ToString(model.refid), Guid.Empty, false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }

                    }

                    #endregion Send Notification for the assigned Finance/Sales Users





                }
                var data = 2;
                // var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    var result = _loanService.GetDocumentForReceiveAndPending(model.UserId, Convert.ToString(model.CompanyId), Convert.ToString(model.refid), "EXTERNAL_LINK");
                    if (Convert.ToInt32(result.pendingDocs) == 0 && Convert.ToInt32(result.requireDoc) > 0)
                    {
                        List<emailDataModel> emaildata = new List<emailDataModel>();
                        emailDataModel emaildata1 = new emailDataModel();
                        List<string> userIds = new List<string>();
                        // dynamic userDET = _loanService.GetUserDetailByUserTypeAppId(model.refid, Convert.ToString(model.CompanyId), "usertypefinance");
                        dynamic userDET1 = _loanService.GetUserDetailByUserTypeAppId(model.refid, Convert.ToString(model.CompanyId), "ReadyForReview");
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        if (userDET1.Count > 0)
                        {
                            foreach (var usrVal in userDET1)
                            {
                                userIds.Add(usrVal.Id);
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = usrVal.Id;
                                    strCcUser = usrVal.Id;
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? usrVal.Id : string.Format(",{0}", usrVal.Id);
                                }
                                if (usrVal.EmailNotification == true)
                                {
                                    emaildata1 = new emailDataModel();
                                    emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                    emaildata1.email = usrVal.Email;
                                    emaildata.Add(emaildata1);
                                }
                            }
                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = "Ready for Review",
                                SubjectBody = "Loan Application ***" + model.refid + " is ready for review.",
                                RouteUrl = "loanApplication/Detail/" + model.refid,
                                ObjectId = model.refid.ToString(),
                                CreatedBy = model.UserId.ToString(),
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(CompanyID),

                            };
                            await _realTimeService.SendNotification(notification);
                        }
                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, "Ready for Review", "Loan Application ***" + model.refid + " is ready for review.", Convert.ToString(model.refid), Guid.Parse(model.UserId.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", CompanyID.ToString(),0,UserName);
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }


                    }
                    if (model.CompanyId > 0)
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }

        public async Task<string> UploadBlob(Stream file, string extension, string contentType, string moduleName, string subModuleName, string blobPath)
        {
            try
            {
                await blobContainer.CreateIfNotExistsAsync(BlobContainerPublicAccessType.Container, null, null);
                //   TalygenApp.Models.BasePage.Hide();
                if (blobContainer != null)
                {
                    extension = extension.Replace(".", "");
                    var newBlob = blobContainer.GetBlockBlobReference(blobPath);
                    var path = newBlob.StorageUri;
                    newBlob.Properties.ContentType = contentType;

                    //await newBlob.UploadFromByteArrayAsync(imageBytes, 0, imageBytes.Length);
                    //var rslt = newBlob.Properties.ContentType;
                    //fileName = Path.GetFileNameWithoutExtension(fileName);
                    //result = await _ComServices.SaveAttachment(blobPath, mimeType, fileSize, id, moduleName, subModuleCode, fileName + "." + extension, userId, companyId, AttachmentFor, linkedId);
                    //result.Msg = newBlob?.Uri.ToString();

                    // var fileName = $"{Guid.NewGuid()}{extension}";

                    var blob = blobContainer.GetBlockBlobReference(blobPath);
                    await blob.UploadFromStreamAsync(file);

                    return blobPath;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddUpdateEnableLogin")]
        public async Task<object> AddUpdateEnableLogin([FromForm] EnableAccountSubmitModel model, string accountId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            List<loanApplicationEnableAccountForIncompleteModel> loanApp = new List<loanApplicationEnableAccountForIncompleteModel>();
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {
                EnableAccountLogin result = new EnableAccountLogin();

                //JavascriptSerlization obj = JsonConvert.DeserializeObject<JavascriptSerlization>(model.contactList);
                //List<EnableAccountLogin> objResponse1 = JsonConvert.DeserializeObject<List<EnableAccountLogin>>(model.contactList);
                var data = JsonConvert.DeserializeObject<EnableAccountLogin>(model.contactList);
                string contactName = data.Name;

                if (data.EnableLogin == false)
                {
                    loanApp = _dashboardService.LoanApplicationEnableAccountForIncomplete(data.UserId, userid, companyid);
                    int mapingLast = loanApp.Count - 1;
                    int MapIndex = 0;
                    if (loanApp != null && loanApp.Count() > 0)
                    {
                        bool isComplateStage = false;
                        foreach (var item in loanApp)
                        {
                            var results = _dashboardService.GetLoanApplicationStage(userid, Convert.ToInt64(companyid), Convert.ToInt64(item.loanId));
                            int last = results.Count - 1;
                            int index = 0;
                            foreach (var item1 in results)
                            {
                                if (item1.stageActive == true && item1.stageapproved == true)
                                {
                                    if (index == last)
                                    {
                                        isComplateStage = true;
                                    }
                                    index++;
                                }
                                else
                                {
                                    isComplateStage = false;
                                }
                            }
                            if (isComplateStage == true)
                            {
                                if (mapingLast == MapIndex)
                                {
                                    EnableAccountLogin returnResult = _dashboardService.AddUpdateEnableLoginDelete(data, userid, companyid);
                                }
                                MapIndex++;
                            }
                            else
                            {
                                if (mapingLast == MapIndex)
                                {
                                    resultResponseModel.StatusCode = 300;
                                    resultResponseModel.ResponseMessage = "Account cannot be disabled, assigned application to this account is not completed.";
                                    return Ok(resultResponseModel);
                                }
                                MapIndex++;
                            }
                        }
                    }
                    else
                    {
                        EnableAccountLogin results = _dashboardService.AddUpdateEnableLoginDelete(data, userid, companyid);
                    }

                }


                // EnableAccountLogin result = new EnableAccountLogin();


                if (data.EnableLogin == true)
                {
                    result = _dashboardService.AddUpdateEnableLogin(data, userid, companyid, accountId);
                }
                if ((result != null && result.Name == "First Time Enable Customer") || result.Name == "First Time Enable Customer1")
                {
                    var email = result.Email.Replace(',', ' ');
                    var userId = result.UserId.Replace(',', ' ');
                    //Send Email on password 
                    var user = new ApplicationUser { UserName = result.Email, Email = result.Email };
                    var applicationUser = new ApplicationUser()
                    {
                        UserName = email,
                        Email = email,
                        FirstName = "",
                        LastName = "",
                        UserType = "",
                        PhoneNumber = "",
                        Address = "",
                        City = "",
                        State = Guid.Empty,
                        ZipCode = "",
                        AssignedBankId = Guid.Empty,
                        County = "",
                        IsActive = false,
                        Position = Guid.Empty,
                        EmployeeType = Guid.Empty,
                        RoleID = Guid.Empty,
                        Notes = "",
                        Webbrowser = "",
                        BrowserVersion = OSWebBrowser,
                        IPAddress = IPAddress,
                        LastLoginDate = DateTime.UtcNow,
                        CreatedOn = DateTime.UtcNow,
                        ExecutiveCommisionFormula = "",
                        CompanyID = Convert.ToInt32(companyid),
                        DepartmentID = 0,
                        LocationID = 0,
                        IsHOD = false,
                        RefID = 0,
                        // Reffrom=model.refFrom

                    };
                    // var users = await _userManager.FindByNameAsync(result.Email);
                    // var code =  _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                    //var token = "";
                    var token = _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                    var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "/account/setpassword?userId=" + userId.TrimStart() + "&token=" + token.Result;
                    try
                    {
                        Hashtable htbl = new Hashtable();
                        htbl["@username"] = contactName;
                        htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                        htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                        //htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                        htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                        if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                        else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                        else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        await _emailSettingsService.SendEmail(email, htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(userId), Guid.Parse(userid), false, _config.GetSection("CommonSettings")["Register"], "Registration", companyid);
                    }
                    catch
                    {
                        HttpContext.Session.Clear();
                    }


                    //end password
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                    return Ok(resultResponseModel);
                }
                else if (result.Name == "Only Update for table")
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                    return Ok(resultResponseModel);
                }

                //return Ok(resultResponseModel);

            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddUpdateEnableLoginSF")]
        public async Task<object> AddUpdateEnableLoginSF([FromBody]dynamic model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            List<loanApplicationEnableAccountForIncompleteModel> loanApp = new List<loanApplicationEnableAccountForIncompleteModel>();
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {
               // string fff= strObject.accountId;
                EnableAccountLogin result = new EnableAccountLogin();
                //dynamic model = JsonConvert.DeserializeObject<EnableAccountLogin>(strObject);
                //JavascriptSerlization obj = JsonConvert.DeserializeObject<JavascriptSerlization>(model.contactList);
                //List<EnableAccountLogin> objResponse1 = JsonConvert.DeserializeObject<List<EnableAccountLogin>>(model.contactList);
                //var data = JsonConvert.DeserializeObject<EnableAccountLogin>(strObject);
                EnableAccountLogin data = new EnableAccountLogin();
                data.Name = model.name;
                data.AccountId = model.accountId;
                data.Email = model.email;
                data.IsPrimary = model.isPrimary;
                data.EnableLogin = model.enableLogin;
                data.Phone = model.phone;
                data.Role = model.role;
                data.UserId = model.userId;
                string contactName = data.Name;

                if (data.EnableLogin == false)
                {
                    loanApp = _dashboardService.LoanApplicationEnableAccountForIncomplete(data.UserId, userid, companyid);
                    int mapingLast = loanApp.Count - 1;
                    int MapIndex = 0;
                    if (loanApp != null && loanApp.Count() > 0)
                    {
                        bool isComplateStage = false;
                        foreach (var item in loanApp)
                        {
                            var results = _dashboardService.GetLoanApplicationStage(userid, Convert.ToInt64(companyid), Convert.ToInt64(item.loanId));
                            int last = results.Count - 1;
                            int index = 0;
                            foreach (var item1 in results)
                            {
                                if (item1.stageActive == true && item1.stageapproved == true)
                                {
                                    if (index == last)
                                    {
                                        isComplateStage = true;
                                    }
                                    index++;
                                }
                                else
                                {
                                    isComplateStage = false;
                                }
                            }
                            if (isComplateStage == true)
                            {
                                if (mapingLast == MapIndex)
                                {
                                    EnableAccountLogin returnResult = _dashboardService.AddUpdateEnableLoginDelete(data, userid, companyid);
                                }
                                MapIndex++;
                            }
                            else
                            {
                                if (mapingLast == MapIndex)
                                {
                                    resultResponseModel.StatusCode = 500;
                                    resultResponseModel.ResponseMessage = "Account cannot be disabled, assigned application to this account is not completed.";
                                    return Ok(resultResponseModel);
                                }
                                MapIndex++;
                            }
                        }
                    }
                    else
                    {
                        EnableAccountLogin results = _dashboardService.AddUpdateEnableLoginDelete(data, userid, companyid);
                    }

                }


                // EnableAccountLogin result = new EnableAccountLogin();


                if (data.EnableLogin == true)
                {
                    result = _dashboardService.AddUpdateEnableLogin(data, userid, companyid, data.AccountId);
                }
                if ((result != null && result.Name == "First Time Enable Customer") || result.Name == "First Time Enable Customer1")
                {
                    var email = result.Email.Replace(',', ' ');
                    var userId = result.UserId.Replace(',', ' ');
                    //Send Email on password 
                    var user = new ApplicationUser { UserName = result.Email, Email = result.Email };
                    var applicationUser = new ApplicationUser()
                    {
                        UserName = email,
                        Email = email,
                        FirstName = "",
                        LastName = "",
                        UserType = "",
                        PhoneNumber = "",
                        Address = "",
                        City = "",
                        State = Guid.Empty,
                        ZipCode = "",
                        AssignedBankId = Guid.Empty,
                        County = "",
                        IsActive = false,
                        Position = Guid.Empty,
                        EmployeeType = Guid.Empty,
                        RoleID = Guid.Empty,
                        Notes = "",
                        Webbrowser = "",
                        BrowserVersion = OSWebBrowser,
                        IPAddress = IPAddress,
                        LastLoginDate = DateTime.UtcNow,
                        CreatedOn = DateTime.UtcNow,
                        ExecutiveCommisionFormula = "",
                        CompanyID = Convert.ToInt32(companyid),
                        DepartmentID = 0,
                        LocationID = 0,
                        IsHOD = false,
                        RefID = 0,
                        // Reffrom=model.refFrom

                    };
                    // var users = await _userManager.FindByNameAsync(result.Email);
                    // var code =  _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                    //var token = "";
                    var token = _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                    var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "/account/setpassword?userId=" + userId.TrimStart() + "&token=" + token.Result;
                    try
                    {
                        Hashtable htbl = new Hashtable();
                        htbl["@username"] = contactName;
                        htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                        htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                        //htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                        htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                        if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                        else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                        else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        await _emailSettingsService.SendEmail(email, htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(userId), Guid.Parse(userid), false, _config.GetSection("CommonSettings")["Register"], "Registration", companyid);
                    }
                    catch
                    {
                        HttpContext.Session.Clear();
                    }


                    //end password
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                    return Ok(resultResponseModel);
                }
                else if (result.Name == "Only Update for table")
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                    return Ok(resultResponseModel);
                }

                //return Ok(resultResponseModel);

            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetRoleListForEnableLogin")]
        public IActionResult GetRoleListForEnableLogin(string accountId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _dashboardService.GetRoleListForEnableLogin(userid, companyid, accountId);
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("LoanApplicationNotificationForCustommer")]
        public IActionResult LoanApplicationNotificationForCustommer(string Id)
        {
            List<LoanApplicationNotications> dataList = new List<LoanApplicationNotications>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                dataList = _dashboardService.LoanApplicationNotificationForCustommer(userid, companyId, Id);
                // Version data = json.parse(dataList);
                return Ok(dataList);
            }
            catch// (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("AssociateUserWithCompany")]
        [Authorize]
        public async Task<object> AssociateUserWithCompany(string emailID, string uid, string RoleID, string userTypeId, string PrimaryKey)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                //string userId = User.Claims.FirstOrDefault(x => x.Type == "userID")?.Value;
                //string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;  //CompanyName
                string companyName = User.Claims.FirstOrDefault(x => x.Type == "CompanyName")?.Value;
                string userId = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string status = _dashboardService.AssociateUserWithCompany(userId, companyid, emailID, uid, RoleID, userTypeId, PrimaryKey);
                if (status == "associate")
                {
                    try
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                        return Ok(resultResponseModel);
                        //Hashtable htbl = new Hashtable();
                        //htbl["@username"] = companyName;
                        ////htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                        //htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                        ////  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                        //htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                        //if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        //else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                        //else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                        //else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        //await _emailSettingsService.SendEmail(emailID, htbl, "Associate User", $"Your company has been associate, Same company!", userId, Guid.Parse(userId), false, _config.GetSection("CommonSettings")["AssociateUser"], "AssociateUser", CompanyID.ToString());
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }

                }
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = status;
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
        [Route("CheckUserDuplicateORAssociate")]
        [Authorize]
        public IActionResult CheckUserDuplicateORAssociate(string emailID, string uid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;  //CompanyName
                string companyName = User.Claims.FirstOrDefault(x => x.Type == "CompanyName")?.Value;
                string userId = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                string status = _dashboardService.CheckUserDuplicateORAssociate(userId, companyid, emailID, uid);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = status;
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
        [HttpGet]
        [Route("GetKyiOverviewData")]
        public async Task<ActionResult> GetKyiOverviewData(string starttime, string endtime,int teritoryId)
        {
            try
            {

                DateTime myDate = DateTime.Parse(starttime);

                DateTime lsdate = DateTime.UtcNow.Date;
                if (endtime != "null")
                {
                    lsdate = DateTime.Parse(endtime);
                }
                Guid userId = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value).ToGuid();
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _dashboardService.GetKyiOverviewData(companyId, userId, myDate, lsdate, teritoryId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}