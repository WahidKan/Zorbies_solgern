using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Microsoft.AspNetCore.Identity;


namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/layout")]
    public class LayoutController : Controller
    {
        private ILayoutService _layoutService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }


        public LayoutController(ILayoutService layoutService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _layoutService = layoutService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        [HttpGet]
      //  [Authorize]
        [Route("GetLayoutList")]
        public IActionResult GetLayoutList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, int modulecode)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _layoutService.GetLayoutList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID,modulecode);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }


        [HttpPost]
        //  [Authorize]
        [Route("SaveLayoutControls")]
        public IActionResult SaveLayoutControls([FromBody] GroupModel[] layoutControlModel,string modulecode,string submodulecode)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string json = JsonConvert.SerializeObject(layoutControlModel);
                var result = _layoutService.AddOrUpdateCustomeFields(json, modulecode, submodulecode, null, Convert.ToInt64(companyid));
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Data has been updated successfully.";
                return Ok(resultResponseModel);


            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }


        }

        [HttpPost]
        //  [Authorize]
        [Route("SaveFormControls")]
        public IActionResult SaveFormControls([FromBody] dynamic[] formControlModel, string modulecode, string submodulecode,string formMasterId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string json = JsonConvert.SerializeObject(formControlModel);
                var result = _layoutService.AddOrUpdateFormFields(json, modulecode, submodulecode,formMasterId, null, Convert.ToInt64(companyid));
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Data has been updated successfully.";
                return Ok(resultResponseModel);


            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }


        }

        [HttpGet]
        [Route("GetFormList")]
        public IActionResult GetFormList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long moduleId, long subModuleId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _layoutService.GetFormList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID, moduleId, subModuleId);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpGet]
        [Route("GetFormList_finance")]
        public IActionResult GetFormList_finance(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _layoutService.GetFormList_finance(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }

        [HttpPost]
        //  [Authorize]     
        [Route("SaveNewSubModule")]
        public IActionResult SaveNewSubModule([FromBody] FormModuleModel formSubModuleModel, Guid? userId,long companyId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId= Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                companyId = CompanyID;
                var result = _layoutService.AddNewSubModule(formSubModuleModel, userId, companyId);

                if(Convert.ToInt64(result) > 0)
                {
                    if((Convert.ToInt64(result)==3))
                    {
                        resultResponseModel.ID = result;
                        resultResponseModel.StatusCode = 300;  // this code is used on front end for perforn operations
                        resultResponseModel.ResponseMessage = "Form has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.ID = result;
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Form has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    
                }
                else
                {
                    resultResponseModel.ID = result;
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while Associated Succesfully";
                    return Ok(resultResponseModel);
                }
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }


        }

        [HttpGet]
        [Route("GetModuleSubModuleByCompany")]
        public async Task<IActionResult> GetModuleSubModuleByCompany(long moduleId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var UserId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var data = await _layoutService.GetModuleSubModuleByCompany(moduleId, CompanyID, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Route("GetfinanceModuleSubModuleByCompany")]
        public async Task<IActionResult> GetfinanceModuleSubModuleByCompany(long moduleId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var UserId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var data = await _layoutService.GetfinanceModuleSubModuleByCompany(moduleId, CompanyID, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Route("GetFormEditData")]
        public async Task<IActionResult> GetFormEditData(long formMasterId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var UserId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var data = await _layoutService.GetFormEditData(formMasterId, CompanyID, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [Route("deleteForm")]
        public async Task<IActionResult> deleteForm(string module, string submodule, long formMasterId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var UserId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var data = await _layoutService.deleteForm(module, submodule, formMasterId, CompanyID, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [Route("deleteFormMultiple")]
        public async Task<IActionResult> deleteFormMultiple(string deleteFormIds)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var UserId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var data = await _layoutService.deleteFormMultiple(deleteFormIds, CompanyID, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Route("UpdateCustomLayoutDefaultStatus")]
        public async Task<IActionResult> UpdateCustomLayoutDefaultStatus([FromBody] ManageLayoutDefaultStatusModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                model.companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _layoutService.UpdateCustomLayoutDefaultStatus(model,userId.ToString());

                if(!string.IsNullOrEmpty(data))
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = string.Format("Default layout has been changed successfully.", model.device_type,model.layout_type.ToLower());
                }
                else
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                }
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Route("isFlowExistInLayout")]
        public async  Task<IActionResult> isFlowExistInLayout(int flowId, string automationFlowName, int customViewId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result =await _layoutService.isFlowExistInLayout(flowId, automationFlowName, customViewId);

                return Ok(result);


            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }


        }
    }
}
