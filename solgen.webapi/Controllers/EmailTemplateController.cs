
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/EmailTemplate")]
    public class EmailTemplateController : Controller
    {
        private readonly IEmailTemplateService emailTemplateService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        public ILogService logService { get; }

        public EmailTemplateController(IEmailTemplateService emailTemplateService, ICommonService commonService
                , IHttpContextAccessor httpContext, ILogService logService)
        {
            this.emailTemplateService = emailTemplateService;
            this._commonService = commonService;
            _httpContext = httpContext;
            this.logService = logService;
        }

        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpPost("ChangeStatus/{id}")]
        [Authorize]
        /*! 
        * \brief  Add update Email template Status.
        * \details Function is used to  Add update Email template Status.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult ChangeStatus(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();
            CommonStatusModel effectedRow = emailTemplateService.ChangeStatus(id);
           
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (effectedRow==null)
            {
                throw new Exception("Unable to change status of this record.");
            }
            if(effectedRow.Status== "common-001")
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(),
                    " has set status of Email Template <strong> " + effectedRow.Name + " </strong> to Active");
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(),
                    " has set status of Email Template <strong> " + effectedRow.Name + " </strong> to In-Active");
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            return Ok(result);
        }



        /*! 
*  \brief     Get API.
*  \details   This API is used to edit data on the bases of email template Id.
*  \author    Dheeraj
*  \version   1.0
*  \date      9 Sep 2019
*  \pre       First initialize the system.
*  \copyright Solgen.
*/
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(long id)
        {

            EmailTemplates data = emailTemplateService.GetById(id);
            if (data == null)
                return NotFound();

            return Ok(data);


        }

        /*! 
        *  \brief     Post API.
        *  \details   This API is used to save and update email template.
        *  \author    Dheeraj
        *  \version   1.0
        *  \date      9 Sep 2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        [HttpPost]
        [Authorize]
        /*! 
        * \brief  Add update Email template.
        * \details Function is used to  Add update Email template.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult Post([FromBody]EmailTemplates model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.EmailTemplateCreatedBy = userid.ToGuid();
            model.CompanyID = CompanyID;

            var data = emailTemplateService.Save(model);
            result.StatusCode = 200;
            if (model.EmailTemplateId == null)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                    " has Added new Email Template <strong>" + model.EmailTemplateName + "</strong>");
                result.ResponseMessage = "Email Template has been added successfully.";
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                    " has Updated Email Template <strong>" + model.EmailTemplateName + "</strong>");
                result.ResponseMessage = "Email Template has been updated successfully.";
            }
            return Ok(result);

        }
        
        [HttpPut("{id}")]
        [Authorize]
        /*! 
        * \brief  Add update Email template.
        * \details Function is used to  Add update Email template.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult Put(Guid id, [FromBody]EmailTemplates model)
        {
            ResultResponseModel result = new ResultResponseModel();
          
            model.Template = WebUtility.HtmlDecode(model.Template);
            model.EmailTemplateId = id;
            Guid guid = emailTemplateService.Save(model);

            if (guid == Guid.Empty)
                throw new Exception("Error occurring while saving record.");

            _commonService.AddActivityLog(Convert.ToString(id), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), " has Added new Email Template");
            result.ResponseMessage = "Success";
            result.StatusCode = (int)HttpStatusCode.OK;

            return Ok(result);

        }

        /*! 
         *  \brief    Delete API.
        *  \details   This API is used to delete a email template.
        *  \author    Dheeraj
        *  \version   1.0
        *  \date      9 Sep 2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var re = Request;
            Guid OrgId1 = new Guid();
            var OrgId = re.Headers.SingleOrDefault(m => m.Key == "OrganizationID").Value.ToString();
            var usrid = re.Headers.SingleOrDefault(m => m.Key == "UserId").Value;
            var userID = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            string ipadddress = HttpContext.Connection.RemoteIpAddress.ToString();
            if (OrgId == "")
            {
                OrgId1 = Guid.Empty;

            }
            else
            {
                OrgId1 = Guid.Parse(OrgId);
            }

            ResultResponseModel result = new ResultResponseModel();
            ChangeStatusModel effectedRow = emailTemplateService.Delete(id);
            if (effectedRow.Status == false)
            {
                throw new Exception("Unable to delete this record.");
            }
            _commonService.AddActivityLog(userID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(),
                " has deleted Email Template <strong> " + effectedRow.Name + " </strong>");
            result.ResponseMessage = "Success";
           result.StatusCode = (int)HttpStatusCode.OK;

            return Ok(result);
        }

        /*! 
        *  \brief     GetList API.
        *  \details   This API is used to get a listing of email template.
        *  \author    Dheeraj
        *  \version   1.0
        *  \date      9 Sep 2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        [Route("GetList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetList(string emailTemplateName, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            if (userId == null)
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

            return Ok(emailTemplateService.GetList(emailTemplateName, sortColumn, sortDir, page, pageSize,userId,CompanyID));
        }

        [HttpGet]
        [Route("GettemplatetDll")]
        [Authorize]
        public List<MasterItems> GettemplatetDll( string objectname)
        {
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                data = emailTemplateService.GettemplatetDll(userid, companyid, objectname);

                if (data != null)
                {
                    return data;
                }
                else
                {
                    return new List<MasterItems>();
                }
            }
            catch (Exception ex)

            {

                throw ex;
            }
        }

        [HttpGet("GetByIdForScheduler/{id}")]
        [AllowAnonymous]
        public IActionResult GetByIdForScheduler(long id)
        {
            try
            {
                EmailTemplates data = emailTemplateService.GetById(id);
                if (data == null)
                    return NotFound();

                return Content(JsonConvert.SerializeObject(data), "application/json");
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = String.Concat("Exception fetching Email Template for Scheduler. Template Id : ", id),
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


        [Authorize]
        [HttpGet]
        [Route("GetHtmlContentFromDatabase")]
        public async Task<ActionResult> GetHtmlContentFromDatabase(bool? isDefaultView,long? Id)
        {
            try

            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await emailTemplateService.GetHtmlContentFromDatabase(isDefaultView, Id);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [HttpPost]
        [Route("SaveHtmlBuilderData")]
        [Authorize]
        public async Task<IActionResult> SaveHtmlBuilderData([FromBody] GrapesJsModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                 model.CreatedBy = userid;
                 model.CompanyID = CompanyID;

            var data = emailTemplateService.SaveHtmlBuilderData(model);
                if (true)
                {
                    string[] dataValue = data.Result.Split(',');
                    result.ResponseMessage = dataValue[0];
                    result.StatusCode = Convert.ToInt32(dataValue[1]);
                }
          
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        [Authorize]
        [HttpGet]
        [Route("VerifyDuplicateName")]
        public ActionResult VerifyDuplicateName(string Name,long Id)
        {
            try
            {
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var response = emailTemplateService.VerifyDuplicateName(Name, Id, companyId);
                return Ok(response);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize]
        [HttpPost]
        [Route("CloneTemplete")]
        public ActionResult CloneTemplete(long Id)
        {
            try
            {
                var companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var response = emailTemplateService.CloneTemplete(Id, companyId, userid);
                return Ok(response);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize]
        [HttpGet]
        [Route("GetHtmlContentListingData")]
        public async Task<ActionResult> GetHtmlContentListingData(string name, string sortColumn, string sortDir, long page, long pageSize)
        {
            try

            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                Guid? UserId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var data = await emailTemplateService.GetHtmlContentListingData(name, sortColumn, sortDir, page, pageSize, companyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SavePlaceHolder")]
        public IActionResult SavePlaceHolder([FromBody] dynamic placeHolderList)
        {

            try
            {
                string json = JsonConvert.SerializeObject(placeHolderList);
                var result = new ResultResponseModel();
                string PlaceHolders = Convert.ToString(JObject.Parse(json)["PlaceHolders"]);
                long Id = Convert.ToInt64(JObject.Parse(json)["Id"]);
                var response = emailTemplateService.SavePlaceHolder(PlaceHolders, Id);
                if (!string.IsNullOrEmpty(response))
                {
                    result.StatusCode = 200;
                    result.ResponseMessage = response;
                }
                else
                {
                    result.StatusCode = 400;
                    result.ResponseMessage = "An error occurred while Uploading.";
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

    }
}
