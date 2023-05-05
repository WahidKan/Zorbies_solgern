using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; //add ha 
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/ManageMaster")]
    public class ManageMasterController : ControllerBase
    { 
        private readonly IManageMasterService manageMasterService;
        private readonly IMasterNameService masterNameService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ICommonService _commonService;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        public ManageMasterController(IManageMasterService manageMasterService
            , IMasterNameService masterNameService,
            ICommonService commonService, IHttpContextAccessor httpContext)
        {
            this.manageMasterService = manageMasterService;
            this.masterNameService = masterNameService;
            this._commonService = commonService;
            _httpContext = httpContext;
        }

     
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        [HttpGet]
        [Authorize]
        [Route("GetMasterDropDown")]
        public IActionResult GetMasterDropDown()
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = manageMasterService.GetMasterDropDown();

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        /*! 
*  \brief     Get API.
*  \details   This API is used to edit data on the bases of master id.
*  \author    Anish
*  \version   1.0
*  \date     24 Sep 2019
*  \pre       First initialize the system.
*  \copyright Solgen.
*/
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(Guid id)
        {

            TblMasterModel data = manageMasterService.GetById(id);
            if (data == null)
                return NotFound();

            return Ok(data);


        }

        /*! 
      *  \brief     GetList API.
      *  \details   This API is used to get a listing of master.
      *  \author    Anish
      *  \version   1.0
      *  \date      24 Sep 2019
      *  \pre       First initialize the system.
      *  \copyright Solgen.
      */
        [Route("GetMasterList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetList(string masterNames,string masterNameId, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(manageMasterService.GetMasterList(masterNames, masterNameId, sortColumn, sortDir, page, pageSize, userId));
        }

        [Route("GetCommonStatus")]
        [HttpGet]
        [Authorize]
        public IActionResult GetCommonStatus()
        {
            List<TblMasters> list = new List<TblMasters>();
            return Ok(list);
        }

        /*! 
        * \brief   Add Updated master
        * \details Function is used to Add updated master
        * \author  Deepak jha
        * \date    24 Sep 2019
        * \version 1.0    
        */
        [Route("AddUpdateMaster")]
        [Authorize]
        [HttpPost] 
        public IActionResult Post([FromBody]TblMasterModel model)
        {
            
            ResultResponseModel result = new ResultResponseModel();
           // model.IsFrontEnd== null ? 0 : model.IsFrontEnd;
            var data= manageMasterService.Save(model);
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (data == 1)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), " has Added new Master");
                result.ResponseMessage = "Master has been added Successfully";

                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else if (data == 3)
            {
                result.ResponseMessage = "Duplicate Master";
                result.StatusCode = 201;
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " has Updated new Master");
                result.ResponseMessage = "Master has been updated Successfully";
                result.StatusCode = (int)HttpStatusCode.OK;
            } 
            return Ok(result);
        }

        /*! 
        * \brief   Get update status of master
        * \details Function is used to update masterStatusId basis of masterId
        * \author  Deepak jha
        * \date    24 Sep 2019
        * \version 1.0    
        */
        [HttpGet]
        [Authorize]
        [Route("ChangedMasterStatusById")]
        public IActionResult ChangedMasterStatusById(string masterid, bool InStatus)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                 var result = manageMasterService.ChangedMasterStatusById(Guid.Parse(masterid), InStatus);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                
                if (result == 1)
                {
                    if (InStatus == true)
                    {
                        _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(), " has set status of Master to Active");
                    }
                    else
                    {
                        _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(), " has set status of Master to In-Active");
                    }
                    resultResponseModel.ResponseMessage = "Success";
                    resultResponseModel.StatusCode = (int)HttpStatusCode.OK;
                    return Ok(resultResponseModel);
                }
                else
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(), " is trying to update status of Master but error occurs in the process ");
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while updating master status";
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
        /*! 
        * \brief   Get update IsDeleted of master
        * \details Function is used to update Isdeleted basis of masterId
        * \author  Deepak jha
        * \date    24 Sep 2019    
        * \version 1.0    
        */
        [HttpGet]
        [Authorize]
        [Route("DeletedMasterById")]
        public IActionResult DeletedMasterById(Guid masterid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
             var result = manageMasterService.DeletedMasterById(masterid);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                
                if (result == 1)
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has Deleted Master");
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Master has been Deleted successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " Error occurs while deleting master record, Master");
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while deleting master record";
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
    }
}