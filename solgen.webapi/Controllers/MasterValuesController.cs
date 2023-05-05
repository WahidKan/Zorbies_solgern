using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Solgen.Service.MasterValues;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class MasterValuesController : ControllerBase
    {
        private readonly IMasterValuesService _service;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public MasterValuesController(IMasterValuesService service)
        {
            _service = service;
        }
        [HttpGet]
        [Authorize]
        [Route("GetSelectTypeCustomFields")]
        public async Task<IActionResult> GetSelectTypeCustomFields(long moduleId, long subModuleId)
        {
            var result = await _service.GetSelectTypeCustomFields(moduleId, subModuleId, CompanyId);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetDDLValues")]
        public async Task<IActionResult> GetDDLValues(long moduleId, long subModuleId, long fieldId)
        {
            var result = await _service.GetDDLValues(moduleId, subModuleId, fieldId, UserId.ToString(), CompanyId);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetModuleList")]
        public async Task<IActionResult> GetModuleList()
        {
            var result = await _service.GetModuleList(UserId.ToString(), CompanyId);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
        [HttpPost]
        [Authorize]
        [Route("AddEditForm")]
        public async Task<IActionResult> AddEditForm([FromBody] dynamic data)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                string json = JsonConvert.SerializeObject(data);
                string prepareModel = string.Concat("[", json, "]");
                var obj = await _service.AddEdit(UserId.ToString(), CompanyId, prepareModel);
                if (!string.IsNullOrEmpty(obj))
                {
                    result.ResponseMessage = "Master values have been saved successfully.";
                    result.StatusCode = 200;
                }
                else
                {
                    result.ResponseMessage = "Something went wrong.";
                    result.StatusCode = 400;
                }
                return Ok(result);
            }
            catch (Exception ex)
            {

                result.ResponseMessage = ex.Message;
                result.StatusCode = 400;

                return Ok(result);
            }
        }
    }
}
