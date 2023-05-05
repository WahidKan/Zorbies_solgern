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
    [Route("api/FormMaster")]
    public class FormMasterController : ControllerBase
    { 
        private readonly IManageFormService manageformService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ICommonService _commonService;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        public FormMasterController(IManageFormService manageformService,
           
            ICommonService commonService, IHttpContextAccessor httpContext)
        {
            this.manageformService = manageformService;
            this._commonService = commonService;
            _httpContext = httpContext;
        }

     
        /*! 
        * \brief   Get the form Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Dheeraj 
        * \date    29 sep 2020
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
                lst = manageformService.GetMasterDropDown();

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        /*! 
*  \brief     Get API.
*  \details   This API is used to edit data on the bases of form master id.
*  \author    Dheeraj
*  \version   1.0
*  \date     29 Sep 2020
*  \pre       First initialize the system.
*  \copyright Solgen.
*/
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(long id)
        {

            TblFormMasterModel data = manageformService.GetById(id);
            if (data == null)
                return NotFound();

            return Ok(data);


        }

        /*! 
      *  \brief     GetList API.
      *  \details   This API is used to get a listing of form master.
      *  \author    Dheeraj
      *  \version   1.0
      *  \date      29 Sep 2020
      *  \pre       First initialize the system.
      *  \copyright Solgen.
      */
        [Route("GetFormsList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(manageformService.GetFormMasterList(name, "", sortColumn, sortDir, page, pageSize, userId));
        }

        [Route("GetCommonStatus")]
        [HttpGet]
        [Authorize]
        public IActionResult GetCommonStatus()
        {
            List<TblMasters> list = new List<TblMasters>();
            return Ok(list);
        }

        [Route("GetFormMasterList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetFormMasterList()
        {
            var companyid =Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var objList = manageformService.GetAll(companyid);
            return Ok(objList);
            
        }


        /*! 
       * \brief   Get the laon product Items values
       * \details Function is used to fetch the list of loan products
       * \author  Dheeraj 
       * \date    06 Sep 2019
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("GetProductDropDown")]
        public IActionResult GetProductDropDown()
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = manageformService.GetMasterDropDown();

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        /*! 
        * \brief   Add Updated Form master
        * \details Function is used to Add updated form master
        * \author  Dheeraj
        * \date    20 Sep 2020
        * \version 1.0    
        */
        [Route("AddUpdateFormMaster")]
        [Authorize]
        [HttpPost] 
        public IActionResult Post([FromBody]TblFormMasterModel model)
        {
            
            ResultResponseModel result = new ResultResponseModel();
            // model.IsFrontEnd== null ? 0 : model.IsFrontEnd;
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            model.CreatedOn = DateTime.UtcNow;
            model.ModifyOn = DateTime.UtcNow;
            model.Createdby = Guid.Parse(userid);
            
            model.Modifyby = Guid.Parse(userid);
            var data= manageformService.Save(model);
           
            if (data == 1)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(), " has Added new form master");
                result.ResponseMessage = "Form Master has been added Successfully";

                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else if (data == 3)
            {
                result.ResponseMessage = "Duplicate form master";
                result.StatusCode = 201;
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " has Updated new Master");
                result.ResponseMessage = "Form Master has been updated Successfully";
                result.StatusCode = (int)HttpStatusCode.OK;
            } 
            return Ok(result);
        }


        [HttpPost]
        //  [Authorize]
        [Route("SaveLayoutControls")]
        public IActionResult SaveLayoutControls([FromBody] GroupModel[] layoutControlModel, long? formid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string json = JsonConvert.SerializeObject(layoutControlModel);
                var result = manageformService.AddOrUpdateCustomeFields(json, formid, null, Convert.ToInt64(companyid));
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
        //[Authorize]
        [Route("GetLayoutCustomFieldByModuleNameAndSubModule")]
        public IActionResult GetLayoutCustomFieldByModuleNameAndSubModule(string companyId, long? formid)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = manageformService.GetLayoutCustomFieldByModuleNameAndSubModule(companyid, userid, formid);
            //return BadRequest();

            return Content(result, "application/json");
        }


    }
}