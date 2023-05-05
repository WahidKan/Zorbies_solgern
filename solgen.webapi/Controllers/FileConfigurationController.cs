using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Solgen.Service.FileConfiguration;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Service;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/FileConfiguration")]
    public class FileConfigurationController : Controller
    {
        private IFileConfigurationService _fileConfigurationService;
        public ILogService _logService { get; }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public FileConfigurationController(IFileConfigurationService fileConfigurationService, ILogService logService)
        {
            _fileConfigurationService = fileConfigurationService;
            _logService = logService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetFileTypeExtensionList")]
        public IActionResult GetFileTypeExtensionList()
        {
            var result = _fileConfigurationService.GetFileExtensionList(CompanyID);
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetFileConfigurationList")]
        public IActionResult GetFileConfigurationList()
        {
            var result = _fileConfigurationService.GetFileConfigurationList(CompanyID);
            return Ok(result);
        }
        [HttpPost]
        [Route("AddEditFileTypeExtensionConfiguration")]
        public IActionResult AddEditFileTypeExtensionConfiguration([FromBody] dynamic data)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value).ToString();
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                _fileConfigurationService.Save(JsonConvert.SerializeObject(data), userid, companyid);
                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                Guid guid = _logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception adding document mapping",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest();
            }
        }
    }
}
  