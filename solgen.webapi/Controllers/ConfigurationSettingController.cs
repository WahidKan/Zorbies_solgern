using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/ConfigurationSetting")]
    public class ConfigurationSettingController : Controller
    {
        private IConfigurationSettingService _configurationSettingService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }

        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        private Guid parsedUserID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public ConfigurationSettingController(IConfigurationSettingService configurationSetting, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _configurationSettingService = configurationSetting;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        [HttpGet]
        [Authorize]
        [Route("GetConfigurationSettings")]
        public IActionResult GetConfigurationSettings(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string custom_view_id, string searchFilter, string moduleName, string submoduleName, long companyId)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;

                var lst =  _configurationSettingService.GetConfigurationSettings(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("getcompanySetupDetail")]
        public IActionResult GetcompanySetupDetail()
        {
            var result = _configurationSettingService.getcompanySetupDetail(companyID);
            result.imageLink = CommonFunctions.GetFileLink(result.imageLink, "image", enumFileFolder.user);

            if (result.imageLink.Contains("defaultNoImage"))
            {
                result.imageLink = "javascript:void(0);";

            }
            else
            {

                result.imageLink = result.imageLink.Replace("wwwroot", "");
            }
            result.imagelinkemail = CommonFunctions.GetFileLink(result.imagelinkemail, "image", enumFileFolder.user);

            if (result.imagelinkemail.Contains("defaultNoImage"))
            {
                result.imagelinkemail = "javascript:void(0);";

            }
            else
            {

                result.imagelinkemail = result.imagelinkemail.Replace("wwwroot", "");
            }
            if (result == null)
                return BadRequest();

            return Ok(result);
        }
        [HttpPost]
        [Authorize]
        [Route("AddOrUpdateCompanySetup")]
        public async Task<IActionResult> AddOrUpdateCompanySetup([FromForm]CompanySetupModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            if (model!=null)
            {
                model.CreatedBy = userID.ToString();

                if (Request.Form.Files.Count > 0)
                {
                    foreach (FormFile item in Request.Form.Files)
                    {
                        if (item.Name == "file")
                        {
                            string filePath = CommonSettings.AppSetting["CommonSettings:CompanyLogo"];
                            string filePrefix = "companyLogo";

                            HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                            if (NodefilePath.Headers.Location != null)
                            {
                                string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                                var url = nodeFileUrl.Split("//");
                                if (url.Count() > 0)
                                {
                                    model.CompanyLogo = "https://" + url[1];
                                }
                            }
                        }
                        if (item.Name == "fileemail")
                        {
                            string filePathEmail = CommonSettings.AppSetting["CommonSettings:TemplateLogo"];
                            string filePrefixEmail = "templateLogo";

                            HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefixEmail, filePathEmail);
                            if (NodefilePath.Headers.Location != null)
                            {
                                string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                                var url = nodeFileUrl.Split("//");
                                if (url.Count() > 0)
                                {
                                    model.EmailTemplateLogo = "https://" + url[1];
                                }
                            }
                        }
                    }
                }

                var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    if (model.CompanyId>0)
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Company setup detail inserted successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Company setup detail updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }



        [HttpPost]
        [Authorize]
        [Route("AddOrUpdateManageStatus")]
        public IActionResult AddOrUpdateManageStatus([FromBody]ManageStatusModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            if (model != null)
            {
                model.CreatedBy = userID.ToString();
                model.CompanyId = companyID;
                var data = _configurationSettingService.AddOrUpdateManageStatus(model);
                if (data > 0)
                {
                    resultResponseModel.StatusCode = 200;
                    if (model.masterId !=null)
                    {
                        resultResponseModel.ResponseMessage = "Company setup detail updated successfully.";
                    }
                    else
                    {
                        resultResponseModel.ResponseMessage = "Company setup detail inserted successfully.";
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
            }
            return Ok(resultResponseModel);
        }
        [HttpGet]
        [Authorize]
        [Route("GetManageStatusDetail")]
        public IActionResult GetManageStatusDetail(string moduleId,string subModuleId,string fieldId)
        {
            var model = _configurationSettingService.GetManageStatusDetail(moduleId, subModuleId, fieldId, companyID.ToString());
            if (model == null)
                return NotFound();

            return Ok(model);
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocumentsFromMaster")]
        public IActionResult GetDocumentsFromMaster()
        {
            var model = _configurationSettingService.GetDocumentsFromMaster();
            if (model == null)
                return NotFound();

            return Ok(model);
        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateDocumentsMaster")]
        public IActionResult AddUpdateDocumentsMaster([FromBody] ManageStatusModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            if (model != null)
            {
                model.CreatedBy = userID.ToString();
                model.CompanyId = companyID;
                var data = _configurationSettingService.AddUpdateDocumentsMaster(model);
                if (data > 0)
                {
                    resultResponseModel.StatusCode = 200;
                    if (model.masterId != null)
                    {
                        resultResponseModel.ResponseMessage = "Company setup detail updated successfully.";
                    }
                    else
                    {
                        resultResponseModel.ResponseMessage = "Company setup detail inserted successfully.";
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
            }
            return Ok(resultResponseModel);

        }

        [HttpGet]
        [Authorize]
        [Route("GetModuleAndSubModuleData")]
        public IActionResult GetModuleAndSubModuleData(string moduleId, string subModuleId, string fieldId)
        {
            var model = _configurationSettingService.GetModuleAndSubModuleData(moduleId, subModuleId, companyID.ToString());
            if (model == null)
                return NotFound();

            return Ok(model);
        }

        [HttpGet]
        [Authorize]
        [Route("getStagesList")]
        public IActionResult getStagesList( string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId,long moduleid, long submoduleid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var data = _configurationSettingService.getStagesList( SortColumn, SortDir, PageNo, PageSize, parsedUserID, companyID,moduleid,submoduleid);
             
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetStagePages")]
        public IActionResult GetStagePages(long moduleId, long subModuleId)
        {
            var model = _configurationSettingService.GetStagePages(parsedUserID, companyID,moduleId, subModuleId );
            if (model == null)
                return NotFound();

            return Ok(model);
        }
        [HttpPost]
        [Authorize]
        [Route("AddStageForm")]
        public IActionResult AddStageForm([FromBody]dynamic model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string Json = Newtonsoft.Json.JsonConvert.SerializeObject(model.data);

            var  Object = new StageFormSubmitModel()
            {
                json = Json,
                formname = model.Formname,
                moduleid = model.ModuleId,
                subModuleId = model.SubModuleId,
                formMasterId= model.FormMasterId,
                classType = model.ClassType

            };

           var Result =_configurationSettingService.AddStageForm(Object, companyID,parsedUserID);
           if(Result !=null)
           {
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ID = Result;
                resultResponseModel.ResponseMessage = "Form has been "+(model.FormMasterId == null ? "added ":"Updated ") + "successfully.";
           }
           else
           {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong.";
           }
           return Ok(resultResponseModel);
        }

        [HttpGet]
        [Authorize]
        [Route("GetStageFormDetail")]
        public IActionResult GetStageFormDetail(long formId)
        {
            var result = _configurationSettingService.GetStageFormDetail(companyID.ToString(), parsedUserID, formId);
            if (result == null)
                return BadRequest();
            string prepareResult = string.Concat("[", result, "]");
            return Content(prepareResult, "application/json");
        }

    }
}