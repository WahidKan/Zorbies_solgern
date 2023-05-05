using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.Models;
using authorizeLibrary;
namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]

    [Route("api/Requirements")]
    public class RequirementsController : Controller
    {
        private IRequirementsService _RequirementsService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? UserID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }

        public RequirementsController(IRequirementsService RequirementsService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _RequirementsService = RequirementsService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        [HttpGet]
        [Route("GetrequirementList")]
        public async Task<IActionResult> GetrequirementList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = await _RequirementsService.getRequirementsList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }


        [HttpPost]
        [Authorize]
        [Route("AddEditRequirement")]
        public async Task<IActionResult> AddEditRequirement([FromBody] ProjectModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.userId = userid;
                model.companyId = CompanyID;
                string data = _RequirementsService.AddEditRequirement(model);

                var datacode = data.Split('~');

                if (datacode.Length > 1)
                {
                    if (datacode[0] == "-1")
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = datacode[1];
                    }
                }
                else if (data != null)
                {
                    if (model.Id == "")
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Requirement has been added successfully.";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Requirement has been updated successfully.";
                    }
                }

                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later!.";
                }

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }


        //[HttpGet]
        //[Authorize]
        //[Route("GetTypeOnBaseRecordType")]
       
        //public IActionResult GetTypeOnBaseRecordType(string MasterIdAuto ,string SerchText ="", long length = 0 , long ID = 0)
        //{
        //    List<MasterItems> lst = new List<MasterItems>();
        //    try
        //    {
        //        var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        //        lst = _RequirementsService.GetTypeOnBaseRecordType(MasterIdAuto, SerchText, length, ID, CompanyID);

        //        return Ok(lst);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest();
        //    }
        //}


        [HttpGet]
        [Authorize]
        [Route("GetTypeOnBaseRecordType")]
        public async Task<IActionResult> GetTypeOnBaseRecordType(string MasterIdAuto, string SerchText = "", long length = 0, long ID = 0)
        {           
            var result = _RequirementsService.GetTypeOnBaseRecordType(MasterIdAuto, SerchText, length, ID, CompanyID);
            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }





    }

}