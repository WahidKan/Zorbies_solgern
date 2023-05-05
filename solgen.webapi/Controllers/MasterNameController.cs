using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api/MasterName")]
    public class MasterNameController : Controller
    { 
        private readonly IMasterNameService masterNameService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        public MasterNameController(  IMasterNameService masterNameService, ICommonService commonService
            , IHttpContextAccessor httpContext)
        { 
            this.masterNameService = masterNameService;
            this._commonService = commonService;
            _httpContext = httpContext;
        }

        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }

        [Route("GetMasterNameList")]
        [HttpGet]
        [Authorize]
        /*! 
       * \brief   Get listing of master names
       * \details Function is used to Get the listing of master names
       * \author  Deepak jha
       * \date    24 August 2019    
       * \version 1.0    
       */
        public IActionResult GetMasterNameList(string masterNameValue, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(masterNameService.GetMasterNameList(masterNameValue, sortColumn, sortDir, page, pageSize, userId));
        }

        [HttpGet]
        [Route("GetMasterList")]
        [Authorize]
        /*! 
       * \brief   Get listing of masters
       * \details Function is used to Get the listing of masters
       * \author  Deepak jha
       * \date    24 August 2019    
       * \version 1.0    
       */
        public IActionResult GetMasterList(string search)
        {
            return Ok();
        }


        [HttpPost]
        [Route("AddUpdateMasterName")]
        [Authorize]
        /*! 
       * \brief   Add update master name.
       * \details Function is used to Get the Add update master name.
       * \author  Deepak jha
       * \date    24 August 2019    
       * \version 1.0    
       */
        public IActionResult AddUpdateMasterName([FromBody]MasterNamesModel model)
        {

            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var result = masterNameService.AddUpdateMasterName(model);
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (result == 1)
            {
                

                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), " has Added new Master Name");
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Master name has been added successfully.";
                return Ok(resultResponseModel);
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " has Updated Master Name");
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Master name has been updated successfully.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Route("GetMasterNameById")]
        [Authorize]
        /*! 
       * \brief   get master name by id.
       * \details Function is used to Get the  master name by id.
       * \author  Deepak jha
       * \date    24 August 2019    
       * \version 1.0    
       */
        public IActionResult GetMasterNameById(string Id)
        {
            var result = masterNameService.GetMasterNameById(Id);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }
    }
}