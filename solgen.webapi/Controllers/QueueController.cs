using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Solgen.Core;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Queue")]
    public class QueueController : Controller
    {
        private readonly UserHub _userHub;

        private readonly SolgenDbContext _dbContext;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IConfiguration _config;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private IUserService _userService;
        private readonly IUserConnectionManager _userConnectionManager;
        private readonly INotificationService _notificationService;
        private readonly IQueueService _queueService;

        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? UserID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }

        public QueueController( ICommonService commonService, IQueueService  queueService
                                , SolgenDbContext dbContext
                                , IEmailSettingsService emailSettingsService
                                , IConfiguration config
                                , IHttpContextAccessor httpContext, IUserService userservice
                                , IUserConnectionManager userConnectionManager
                                , INotificationService notificationService)
        {
            _queueService = queueService;
            _dbContext = dbContext;
            _commonService = commonService; 
            _emailSettingsService = emailSettingsService;
            _config = config;
            _httpContext = httpContext;
            _userService = userservice;
            _userConnectionManager = userConnectionManager;
            _notificationService = notificationService;
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditQueue")]
        public async Task<IActionResult> AddEditQueue([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.userId = userid;
                string data =  _queueService.AddEditqueue(model);
                if (data != null)
                {
                    if (model.Id != null)
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Queue has been inserted successfully.";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Queue has been updated successfully.";
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
        //  [Authorize]
        [Route("GetQueueList")]
        public IActionResult GetQueueList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (userId == null)
                    userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = _queueService.GetQueueList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetUsersList")]
        public IActionResult GetUsersList(string companyId, string PrimaryId)
        {
            try
            {
                var lst = _queueService.GetUsersList(companyId, PrimaryId);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        //  [Authorize]
        [Route("GetQueueUserList")]
        public IActionResult GetQueueUserList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, string primaryKey)
        {
            try
            {
                var lst = _queueService.GetQueueUserList(listFilter, sortColumn, sortDir, pageIndex, pageSize, primaryKey);
                //return Content(lst, "application/json");
                return Ok(lst);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
