using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solgen.Service;

namespace Solgen.WebApi.Controllers
{

    [Produces("application/json")]
    [Route("api/EmailTrack")]
    public class EmailsTrackingController : Controller
    {
        private IEmailTrackingService _emailtrackingService;
        public EmailsTrackingController(IEmailTrackingService emailtrackingService)
        {
            _emailtrackingService = emailtrackingService;
        }
        public IActionResult Index()
        {
            return View();
        }

        /*! 
       * \brief   Get the list of email trackings
       * \details Function is used to fetch the list of email trackings
       * \author  Dheeraj 
       * \date    12 Dec 2019
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("EmailTrackingList")]
        public IActionResult EmailTrackingList( DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize,int type)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_emailtrackingService.GetList(From, To, sortColumn, sortDir, page, pageSize,type, Guid.Parse(uid)));
        }
    }
}