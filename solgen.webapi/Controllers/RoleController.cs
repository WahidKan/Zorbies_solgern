using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
    [Route("api/Role")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ICommonService _commonService;

        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        public RoleController(IRoleService roleService,
            ICommonService commonService, IHttpContextAccessor httpContext)
        {
            this._roleService = roleService;
            this._commonService = commonService;
            _httpContext = httpContext;
        }

        /*! 
       * \brief   Get list of data for roles
       * \details Function is used to get roles
       * \author  Deepak jha
       * \date    16 oct 2019    
       * \version 1.0    
       */
        [Route("GetRoleList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetList(string roleName, string masterNameId, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_roleService.GetRoleList(roleName, masterNameId, sortColumn, sortDir, page, pageSize, userId, CompanyID));
        }

        [HttpGet]
        [Route("GetUserList")]
        public async Task<IActionResult> GetUserList(string searchtxt, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? roleId)
        {
            try
            {
                var lst = await _roleService.GetUserList(searchtxt, sortColumn, sortDir, pageIndex, pageSize, roleId, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }

        /*! 
       * \brief   Get update IsDeleted of role
       * \details Function is used to update Isdeleted basis of roleId
       * \author  Deepak jha
       * \date    16 oct 2019    
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("DeletedRoleById")]
        public IActionResult DeletedRoleById(Guid roleId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                ChangeStatusModel result = _roleService.DeletedRoleById(roleId);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                if (result.Status == true)
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(),
                        " has Deleted Role <strong> " + result.Name + " </strong>");
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Role has been Deleted successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " Error occurs while deleting Role record, Role");
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while deleting Role record";
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
       * \brief   Get update status of Role
       * \details Function is used to update RoleStatusId basis of RoleId
       * \author  Deepak jha
       * \date    16 Oct 2019
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("ChangedRoleStatusById")]
        public IActionResult ChangedRoleStatusById(string roleId, string roleStatus)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                CommonStatusModel result = _roleService.ChangedRoleStatusById(roleId, roleStatus);
                if (result.Status == "common-001")
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(),
                        " has set status of role <strong> " + result.Name + " </strong> to Active");
                }
                else
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(),
                        " has set status of role <strong> " + result.Name + " </strong> to In-Active");
                }
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Status has been updated successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }


        }

        /*! 
   *  \brief     GetRoleModules API.
   *  \details   This API is used to get role modules
   *  \author    Rahul  Sharma
   *  \version   1.0
   *  \date      16-10-2019
   *  \pre       First initialize the system.
  
   */
        [HttpGet]
        [Authorize]
        [Route("GetRoleModule")]
        public IActionResult GetRoleModules(long? userTypeId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = _roleService.GetRoleModule(userTypeId, Guid.Parse(userid));
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

                /*! 
        *  \brief     Post API.
        *  \details   This API is used to save and update roles.
        *  \author    Anish Sharma 
        *  \version   1.0
        *  \date      17-10-2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody]RoleModel model)
        {
            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.CreatedBy = userid.ToGuid();
            model.CompanyID = CompanyID;

            var data = _roleService.Save(model);
            //return Ok(data);

            result.StatusCode = 200;
            if (model.RoleId == null)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                    " has Added new Role <strong>" + model.RoleName + "</strong>");
                result.ResponseMessage = "Role has been added successfully.";
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                    " has Updated Role <strong>" + model.RoleName + "</strong>");
                result.ResponseMessage = "Role has been updated successfully.";
            }
            return Ok(result);

        }

        /*! 
       *  \brief     CheckRoleNameIsExist API
       *  \details   This API is used to check role name is exists in database with same name.
       *  \author    Anish Sharma
       *  \version   1.0
       *  \date      17-10-2019
       *  \pre       First initialize the system.
       *  \copyright Solgen.
       */

        [Route("CheckRoleNameIsExist")]
        [HttpGet]
        [Authorize]
        public IActionResult CheckRoleNameIsExist(Guid? id, string name)
        {
            ResultResponseModel result = new ResultResponseModel();
            var isExist = _roleService.CheckRoleNameIsExist(id, name, CompanyID);

            result.ID = string.Empty;
            result.ResponseMessage = $"'{name}' role group name is already exist.";
            result.StatusCode = (int)HttpStatusCode.BadRequest;

            return Ok(isExist);
        }

        /*! 
      *  \brief     GetRoleById API.
      *  \details   This API is used to get roles by id.
      *  \author    Anish Sharma
      *  \version   1.0
      *  \date      17-10-2019
      *  \pre       First initialize the system.
      *  \copyright Solgen.
      */
        [Route("GetRoleById")]
        [HttpGet]
        [Authorize]
        public IActionResult GetRoleById(Guid id)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            RoleModel data = _roleService.GetRoleById(id, Guid.Parse(userid));
            if (data == null)
                return NotFound();

            return Ok(data);
        }
        [HttpGet]
         [Authorize]
        [Route("GetRoleNameForTree")]
        public IActionResult GetRoleNameForTree(string id )
        {
            try
            {
             Guid   userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
               int CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _roleService.GetRoleNameForTree(userid, CompanyID,id);
                if(lst == null)
                    return BadRequest();
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("getRoletabdata")]
        public async Task<IActionResult> getRoletabdata(Guid ROLEID, long usertypeid)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
               

                var lst = await _roleService.getRoletabdata(ROLEID,userid, CompanyID, usertypeid);
               
                    
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetRoleDataByid")]
        public IActionResult GetRoleDataByid(string id)
        {
            try    
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _roleService.GetRoleDataByid(userid, CompanyID, id);
                if (lst == null)
                    return BadRequest();
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SaveRole")]
        public IActionResult SaveRole(string json)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _roleService.SaveRole(userid, CompanyID, json);
                if (lst == null)
                    return BadRequest();
               
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [Route("saveLayoutRoles")]
        public async Task<IActionResult> saveLayoutRoles([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Role(s) has been assigned successfully.");
                string data = _roleService.saveLayoutRoles(model);
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = retResponseMessage;
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
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

        [HttpPost]
        [Authorize]
        [Route("CheckLayoutRolesExist")]

        public IActionResult CheckLayoutRolesExist([FromBody] JsonModel model)
        {


            ResultResponseModel result = new ResultResponseModel();
            model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var data = _roleService.CheckLayoutRolesExist(model);
            if (data == "NotExists")
            {
               
            }
            else
            {
                result.StatusCode = 201;
                result.ResponseMessage = data;
            }

            return Ok(result);

        }
    }
}