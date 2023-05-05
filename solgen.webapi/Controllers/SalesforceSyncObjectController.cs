using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solgen.Service;
using Microsoft.Extensions.Configuration;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesforceSyncObjectController : ControllerBase
    {
        private readonly ISalesforceSyncObjectService _salesforceSyncObjectService;
        private readonly IConfiguration configuration;
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private long UserTypeID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "UserTypeID")?.Value); } }

        public SalesforceSyncObjectController(ISalesforceSyncObjectService salesforceSyncObjectService, IConfiguration iConfig)
        {
            configuration = iConfig;
            _salesforceSyncObjectService = salesforceSyncObjectService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetSalesforceSyncObjectList")]
        public IActionResult GetSalesforceSyncObjectList(string objectName, string name, string createdByName, string startDate, string endDate, string sortColumn, string sortDir, int page, int pageSize)
        {
            long companyID = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            string userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            return Ok(_salesforceSyncObjectService.GetSalesforceSyncObjectList(objectName, name, createdByName, startDate, endDate,sortColumn, sortDir, page, pageSize, userid, companyID));
        }
    }
}