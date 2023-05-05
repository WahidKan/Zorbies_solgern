using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Service;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/WhatsNext")]
    public class WhatsNextController : Controller
    {
        private readonly IWhatsNextService _whatsNewService;
        public WhatsNextController(IWhatsNextService whatNewService)
        {
            _whatsNewService = whatNewService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetCustomersWithLease")]
        /*! 
        * \brief   Get the list of contact
        * \details Function is used to fetch the list of contact
        * \author  Kiran Bala 
        * \date    9 Oct 2019
        * \version 1.0    
        */
        public IActionResult GetCustomersWithLease(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, bool isDashBoard)
        {
            var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            return Ok(_whatsNewService.GetCustomersWithLease(name, From, To, sortColumn, sortDir, page, pageSize, uid, isDashBoard));
        }



        /*! 
*  \brief     Get API.
*  \details   This API is used to get details of the lease.
*  \author    Anish
*  \version   1.0
*  \date      15-Nov-2019
*  \pre       First initialize the system.
*  \copyright Solgen.
*/
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(Guid id)
        {
            return Ok(_whatsNewService.GetById(id));
        }

    }
}