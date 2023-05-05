using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api/Report")]
    public class ReportController : Controller
    {
        private IReportService _reportService;
        private ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public ReportController(IReportService reportService, ICommonService commonService, IHttpContextAccessor httpContext, UserManager<ApplicationUser> userManager)
        {
            _reportService = reportService;
            _commonService = commonService;
            _httpContext = httpContext;
            _userManager = userManager;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        /*! 
      * \brief   Get the customer log report list
      * \details Function is used to fetch the list of Lease Tracking Report
      * \author  Deepak jha
      * \date    26 Dec 2019
      * \version 3.0    
      */
        [Route("GetLeaseTrakingReport")]
        [HttpGet]
        [Authorize]
        public IActionResult GetLeaseTrakingReport(string name, DateTime? expFrom, DateTime? expTo, DateTime? expFundFrom, DateTime? expFundTo,
            Guid? bankName, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_reportService.GetLeaseTrakingReport(name, expFrom, expTo, expFundFrom, expFundTo, bankName, sortColumn, sortDir, page, pageSize, userId));
        }

        /*! 
     * \brief   Get the customer log report list
     * \details Function is used to fetch the list of Lease Tracking Report
     * \author  Deepak jha
     * \date    26 Dec 2019
     * \version 3.0    
     */
        [Route("GetCommssionPaidReportList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetCommssionPaidReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_reportService.GetCommssionPaidReportList(name, expFrom, expTo, sortColumn, sortDir, page, pageSize, userId));
        }

        /*! 
      * \brief   Get the customer log report list
      * \details Function is used to fetch the list of Lease Tracking Report
      * \author  Deepak jha
      * \date    26 Dec 2019
      * \version 3.0    
      */
        [Route("GetCreditScoreTrackingReportList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetCreditScoreTrackingReportList(string name, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_reportService.GetCreditScoreTrackingReportList(name, expFrom, expTo, sortColumn, sortDir, page, pageSize, userId));
        }

        [HttpGet]
        [Authorize]
        [Route("GetLeaseTrackingAmount")]

        /*! 
      * \brief   Get the customer Lease traking amount 
      * \details Function is used to fetch the Get the customer Lease traking amount
      * \author  Deepak jha
      * \date    26 Dec 2019
      * \version 3.0    
      */
        public IActionResult GetLeaseTrackingAmount(string userId)
        {
            MonthlyLeaseTrackingReport dataList = new MonthlyLeaseTrackingReport();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                dataList = _reportService.GetLeaseTrackingAmount(userId);
                return Ok(dataList);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("InsuranceTrackingReport")]
        /*! 
        * \brief   Get the Lese Request List
        * \details Function is used to fetch the list of Lease Request
        * \author  Surendra Maurya 
        * \date    11 Dec 2019
        * \version 1.0    
        */
        public IActionResult InsuranceTrackingReport(string searchText, DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int pageNo, int pageSize, Guid? userId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _reportService.InsuranceTrackingReport(searchText, expFrom, expTo, sortColumn, sortDir, pageNo, pageSize, uid);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetLeaseVolumeReportList")]
        /*! 
        * \brief   Get the Lese Request List
        * \details Function is used to fetch the list of Lease Volumes(Amount of lease)
        * \author  Deepak jha
        * \date    11 Dec 2019
        * \version 1.0    
        */
        public IActionResult GetLeaseVolumeReportList(DateTime? expFrom, DateTime? expTo, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, string reportFor = "")
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = _reportService.GetLeaseVolumeReportList(expFrom, expTo, sortColumn, sortDir, page, pageSize, userId, reportFor);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetNestReport")]
        public async Task<IActionResult> GetNestReport(string name,string deliveryId , string accountId, string stateId, string stageId, DateTime? From, DateTime? To, string accountStatusId, DateTime? DeliverDateFrom, DateTime?  DeliverDateTo, string sortColumn, string sortDir,int  page,int pageSize,Boolean isGraph)
        {
            try
            {
               // UserId=
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = await _reportService.GetNestReport(name, deliveryId, accountId, stateId, stageId,  From,  To, accountStatusId,DeliverDateFrom,DeliverDateTo, sortColumn,  sortDir, page, pageSize,CompanyID.ToString(), UserId.ToString(), isGraph);

                return Ok(lst);
            }
            catch //(Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetServiceAppointmentReportList")]  
        public async Task<IActionResult> GetServiceAppointmentReportList(string serviceAppointmentSearch,string wareHouse,string serviceTerritoryId ,string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyId, DateTime? From, DateTime? To,string workTypeId,string StatusIdChk,int AttchmentId, bool IsExport, long? ExportTotalRecoards)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var lst = await _reportService.GetServiceAppointmentReportList(serviceAppointmentSearch, wareHouse, serviceTerritoryId, sortColumn, sortDir, pageIndex, pageSize, uid, companyId, From,To,  workTypeId, StatusIdChk, AttchmentId, IsExport,  ExportTotalRecoards);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpPost]
        [Route("AddEditDeliveryDate")]
        public IActionResult AddEditDeliveryDate([FromBody] tblReportDeliveryModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = _reportService.AddEditDeliveryDate(model);
                if (model.productRequiredId == null || model.productRequiredId == "")
                {

                    result.ResponseMessage = "Delivery Date has been assigned successfully.";
                }
                else
                {
                    result.ResponseMessage = "Delivery Date has been assigned successfully.";
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
        [Route("CallLogList")]
        [Authorize]

        public IActionResult CallLogList(string accountId, string contactId,string vendor,int hasRecaoding , string fromNumber, string ToNumber, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue,
            int pageSize,bool isExport)
        {
            var User_id = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if(fromNumber!=null && fromNumber!="")
            {
                fromNumber = fromNumber.Replace(" ", "");
                if(fromNumber== "\"\"")
                {
                    fromNumber = string.Empty;
                }
            }
            if (ToNumber != null && ToNumber != "")
            {
                ToNumber = ToNumber.Replace(" ", "");
            }
            var result = _reportService.CallLogList(User_id, accountId, contactId, vendor,  hasRecaoding,fromNumber,ToNumber, From, To, sortColumn, sortDir, pageSizeValue, pageSize, CompanyID, isExport);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }
    }
}