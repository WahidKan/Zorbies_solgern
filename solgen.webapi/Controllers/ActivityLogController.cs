using System;
using System.Collections.Generic;
using Solgen.Service;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/ActivityLog")]
    public class ActivityLogController : Controller
    {
        private readonly IActivityLogService _ActivityLogService;
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public ActivityLogController(IActivityLogService ActivityLogService)
        {
            _ActivityLogService = ActivityLogService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetActivityLogList")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch Activity Logs
        * \author  Aakash Sharma 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetActivityLogList(string name, string userType, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, DateTime? expFrom, DateTime? expTo)
        {
            return Ok(_ActivityLogService.GetActivityLogList(name, userType, sortColumn, sortDir, page, pageSize, userId,expFrom,expTo, CompanyID));

        }
    }
}