using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.HubConfig;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Notification")]
    public class NotificationController : Controller
    {
        private INotificationService _notificationService;
        private readonly IRealTimeService _realTimeService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        public NotificationController(INotificationService notificationService
            ,IRealTimeService realTimeService)
        {
            _notificationService = notificationService;
            _realTimeService = realTimeService;
        }

        /*! 
        * \brief   Get the list of Notification
        * \details Function is used to fetch the list of Noification
        * \author  Kiran Bala 
        * \date    13 Sep 2019
        * \version 1.0    
        */
        [HttpGet]
        [Authorize]
        [Route("GetNotificationList")]
        
        public IActionResult GetNotificationList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, bool isDashBoard)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_notificationService.GetNotificationList(name, From, To, sortColumn, sortDir, page, pageSize, Guid.Parse(uid), isDashBoard, CompanyID));
        }
        [HttpGet]
        [Authorize]
        [Route("SetNotificationToRead")]
        /*! 
      * \brief   Update status for notidfication.
      * \details Function is used to set the status for notidfication..
      * \author  Anish K.
      * \date    24 Oct 2019    
      * \version 1.0    
      */
        public IActionResult SetNotificationToRead(long noificationId)
        {
            int companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            string userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = _notificationService.ChangeNotificationStatusToRead(noificationId, companyId);
            if (result) {
                _realTimeService.ReloadNotification(userId, false);
            }
            return Ok(result); 
        }

        [Route("GetSolgenNotifications")]
        [HttpGet]
        //[Authorize]
        public IActionResult GetSolgenNotifications(string subject,string notificationType, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID)  
        {
            //var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_notificationService.GetSolgenNotifications(subject, notificationType, sortColumn, sortDir, pageIndex, pageSize, id, companyID));

        }

        [Route("GetSolgenTicketList")]
        [HttpGet]     
        public IActionResult GetSolgenTicketList(string subject, string notificationdate, string sortColumn, string sortDir, int pageIndex, int pageSize, string id, long companyID)
        {
            //var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_notificationService.GetSolgenTicketList(subject, notificationdate, sortColumn, sortDir, pageIndex, pageSize, id, companyID));

        }
    }
}