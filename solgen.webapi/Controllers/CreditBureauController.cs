using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/CreditBureau")]
    public class CreditBureauController : Controller
    {
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ICreditBureauMasterService _creditBureauMasterService;

        public CreditBureauController(ICommonService commonService, IHttpContextAccessor httpContext, ICreditBureauMasterService creditBureauMasterService)
        {
            _commonService = commonService;
            _httpContext = httpContext;
            _creditBureauMasterService = creditBureauMasterService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetCreditBuearuList")]
        /*! 
        * \brief   GetCreditBuearuList
        * \details GetCreditBuearuList from Credit Buearu Master
        * \author  Rajbir Singh 
        * \date    26 Oct 2020
        * \version 1.0    
        */
        public async Task<IActionResult> GetCreditBuearuList()
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _creditBureauMasterService.GetCreditBureauList(companyid, userid);

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
