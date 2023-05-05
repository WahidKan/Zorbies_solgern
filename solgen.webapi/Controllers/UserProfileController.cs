using Microsoft.AspNetCore.Mvc;
using Solgen.Service;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Solgen.Core;
using System;
using System.Threading.Tasks;
using Solgen.WebApi.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Solgen.Core.Models;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Solgen.WebApi.HubConfig;
using System.Collections;
using Microsoft.Extensions.Configuration;
using System.Net.Http;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserProfile")]
    public class UserProfileController : Controller
    {
        private readonly UserHub _timeHub;
        private IHubContext<UserHub> _hub;
        private IUserService _userService;
        private IHostingEnvironment _env;
        private readonly IConfiguration _config;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IManageMasterService manageMasterService;
        private readonly IEmailSettingsService _emailSettingsService;

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private string UserID { get { return User.Claims.FirstOrDefault(x => x.Type == "UserID").Value; } }
        public UserProfileController(IUserService userService, UserManager<ApplicationUser> userManager, IHubContext<UserHub> hub
                                   , UserHub timeHub,  IHostingEnvironment env, IEmailSettingsService emailSettingsService
                                , IConfiguration config,
            ICommonService commonService, IHttpContextAccessor httpContext, IManageMasterService manageMasterService)
        {
            _userService = userService;
            _userManager = userManager;
            _env = env;
            _emailSettingsService = emailSettingsService;
            _config = config;
            _commonService = commonService;
            _httpContext = httpContext; _hub = hub; _timeHub = timeHub;
            this.manageMasterService = manageMasterService;
        }

        [HttpGet]
        [Route("GetUserDetail")]
        [Authorize]
        /*! 
        * \brief   Get User Detail
        * \details Function is used to get the detail of Logined user
        * \author  Vikrant
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult Get()
        {
            var result = _userService.GetUserDetails(UserID, CompanyID.ToString());
            if (result == null)
                return BadRequest();
            result.ProfilePicLink = CommonFunctions.GetFileLink(result.ProfilePic, "image", enumFileFolder.user);
            result.ProfilePicLink = result.ProfilePicLink.Replace("wwwroot", "");
            return Ok(result);
        }

        [HttpGet]
        [Route("GetDealerAccountDetail")]
        [Authorize]
        public IActionResult GetDealerAccountDetail()
        {
            var result = _userService.GetDealerAccountDetail(UserID, CompanyID.ToString());
            if (result == null)
                return BadRequest();
            result.ProfilePicLink = CommonFunctions.GetFileLink(result.ProfilePic, "image", enumFileFolder.user);
            result.ProfilePicLink = result.ProfilePicLink.Replace("wwwroot", "");
            return Ok(result);
        }


        [HttpGet]
        [Route("GetUserInfo")]
        [Authorize]
        /*! 
        * \brief   Get User Detail
        * \details Function is used to get the detail of Logined user
        * \author  Vikrant
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetUserInfo()
        {
            var result = _userService.GetUserInfo(UserID, CompanyID.ToString());

            if (result == null)
                return BadRequest();

            result.TimeZone = _commonService.GetTimeZone(result.TimeZone);
            return Ok(result);
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
        [Route("GetUsersList")]
        public IActionResult GetUsersList(string name,string userType, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_userService.GetUsersList(name, userType, sortColumn, sortDir, page, pageSize, userId, CompanyID));
        }


        [HttpGet]
        //  [Authorize]
        [Route("GetUserlist")]
        public async Task<IActionResult> GetUserlist(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string custom_view_id, string searchFilter, string moduleName, string submoduleName, long companyId,bool isAllRecords)
        {
            try
            {
                if (userId == null)
                    userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

                if (companyId == 0)
                    companyId = CompanyID;

                var lst = await _userService.GetUserlist(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }




        /*! 
       * \brief   ManageUserStatus
       * \details Function is used to update active/inactive status
       * \author  Kiran Bala 
       * \date    12 Sep 2019
       * \version 1.0    
       */

        [HttpPost("ChangeStatus/{id}")]
        [Authorize]
        public IActionResult ChangeStatus(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();
            ChangeStatusModel effectedRow = _userService.ChangeStatus(id);

            result.ResponseMessage = "Success";
            result.StatusCode = (int)HttpStatusCode.OK;
            if (effectedRow.Status == true)
            {
                _commonService.AddActivityLog(UserID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(),
                    " has set status of @stafftype <strong>" + effectedRow.Name + "</strong>" + " to Active", Convert.ToString(id));
            }
            else
            {
                _commonService.AddActivityLog(UserID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(),
                    " has set status of @stafftype <strong>" + effectedRow.Name + "</strong>" + " to In-Active", Convert.ToString(id));
            }            
            return Ok(result);
        }

        [HttpGet]
        [Route("GetUserDetailById")]
        [Authorize]
        /*! 
        * \brief   Get User Detail
        * \details Function is used to get the detail based of parameter id
        * \author  Vikrant
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetUserDetailById(string userId)
        {
            var result = _userService.GetUserDetails(userId, CompanyID.ToString());
            if (result == null)
                return BadRequest();

            return Ok(result);
        }
        [HttpGet]
        [Route("GetContactOrEmployeeById")]
        [Authorize]
        public IActionResult GetContactOrEmployeeById(string userId,Boolean isEmployee)
        {
            var result = _userService.GetContactOrEmployeeById(userId, isEmployee);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }
        /*! 
       * \brief   Delete User
       * \details Function is used to Delete User
       * \author  Kiran Bala 
       * \date    12 Sep 2019
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("DeleteUser")]
        public IActionResult DeleteUser(string userid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _userService.DeleteUser(userid,CompanyID);
                //12 May--giving error _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(),
                //    " has deleted @stafftype <strong>" + result +"</strong>", userid);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "User has been deleted successfully.";
               
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
        [Route("UpdateUser")]
        [Authorize]
        /*! 
        * \brief  Update User
        * \details Function is used to update user detail
        * \author  Lovepreet Kumar 
        * \date    12 Sep 2019
        * \version 1.0    
        */
        public async Task<object> UpdateUser([FromBody] ApplicationUserModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var user = await _userManager.FindByIdAsync(model.Id);

            if (user == null)
            {
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "User not exists.";
                return Ok(resultResponseModel);
            }
            try
            {
                user.UserName = model.Email;
                user.Email = model.Email;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
              
                user.UserType = model.UserType;


                user.PhoneNumber = model.PhoneNumber;
                user.Address = model.Address;
                user.City = model.City;
                user.State = model.State;
                user.ZipCode = model.ZipCode;
                user.County = model.County;
                user.Country = model.County;
                user.IsActive = model.IsActive;
                user.AssignedBankId = model.AssignedBankId == null ? Guid.Empty : model.AssignedBankId;
                user.Position = model.Position == null ? Guid.Empty : model.Position;
                user.EmployeeType = model.EmployeeType == null ? Guid.Empty : model.EmployeeType;
               /////// user.RoleID = model.RoleID == null ? Guid.Empty : model.RoleID;
                user.Notes = model.Notes;
                user.Webbrowser = "";
                user.BrowserVersion = "";
                user.ModifiedOn = DateTime.UtcNow;
                user.ExecutiveCommisionFormula = model.ExecutiveCommisionFormula;
               // user.DepartmentID = model.DepartmentID;
                user.LocationID = model.LocationID;
                user.sfid = model.sfid;
                user.s_id= model.sid;
                user.IsHOD = model.IsHOD;
                user.UManagerId = model.UManagerId;
                user.TimeZone = model.TimeZoneId;
                user.TimeFormat = model.TimeFormat;
                user.ReportToId = model.reportToId;

                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    _commonService.UpdateUserProfileFromCompanyMapping(model.Id, CompanyID.ToString(),model.IsActive,model.IsHOD,model.emailNotification);
                    if (model.sendMail)
                    {


                        try
                        {
                            Hashtable htbl = new Hashtable();
                            htbl["@username"] = model.FirstName + " " + model.LastName;
                            htbl["@oldemail"] = model.oldemail;
                            htbl["@newemail"] = model.Email;

                            htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                            
                            //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                            htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                            if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                            else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                            else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                            else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                            await _emailSettingsService.SendEmail(model.Email, htbl, "", "", Convert.ToString(model.Id), Guid.Parse(model.Id.ToString()), false, _config.GetSection("CommonSettings")["CheckEmail"], "Registration", CompanyID.ToString());
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }

                    }
                    //--make entry in Mapping table
                    _commonService.AssociateUserWithCompany(Guid.Parse(UserID), CompanyID, model.Email, Guid.Parse(model.Id), model.RoleID, Convert.ToInt64(model.UserType), model.DepartmentID, model.IsHOD,false,model.emailNotification);


                    
                    //_commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                    //    " has updated @utype <strong>" + model.FirstName + " " + model.LastName + "</strong>", Guid.Empty()) ;
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "User has been updated successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    var err = result.Errors.FirstOrDefault();
                    resultResponseModel.StatusCode = 500;
                    if (err != null)
                    {
                        if (err.Code == "DuplicateUserName")
                        {
                            resultResponseModel.ResponseMessage = "Email already exists";
                        }
                        else
                        {
                            resultResponseModel.ResponseMessage = err.Description;
                        }
                    }
                    else
                    {
                        resultResponseModel.ResponseMessage = "Something went wrong. Please contact site administrator.";
                    }
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

        [HttpPost]
        [Route("UpdateUserProfile")]
        [Authorize]
        /*! 
        * \brief  Update User Profile Data
        * \details Function is used to update user Profile data
        * \author  Aakash Sharma 
        * \date    13 Sep 2019
        * \version 1.0    
        */

        public async Task<object> UpdateUserProfile([FromForm] ApplicationUserModel userModel)
        {
            string filePath = ""; string filePrefix = ""; int data = 0;
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var applicationUser = new ApplicationUser();
            if (Request.Form.Files.Count > 0)
            {
                filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
                filePrefix = "ProfilePick";

                foreach (FormFile item in Request.Form.Files)
                {
                    HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                    if (NodefilePath.Headers.Location != null)
                    {
                        string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                        var url = nodeFileUrl.Split("//");
                        if (url.Count() > 0)
                        {
                            userModel.ProfilePic = "https://" + url[1];
                        }
                    }
                }
            }
            var user = await _userManager.FindByIdAsync(UserID); //_userManager.FindByIdAsync(userModel.Id);

            if (user == null)
            {
                resultResponseModel.StatusCode = 201;
                resultResponseModel.ResponseMessage = "User does not exists.";
                return Ok(resultResponseModel);
            }
       
            try
            {
                var userEmail = await _userManager.FindByNameAsync(userModel.Email);
                if (userEmail != null && userEmail.Id!= UserID)
                {
                    resultResponseModel.StatusCode = 202;
                    resultResponseModel.ResponseMessage = "This email id is already in use. Please enter another email id";
                    return Ok(resultResponseModel);
                }

                var result = _userService.UpdateUserProfile(userModel);
                _commonService.AddActivityLog(UserID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " has updated his Profile ");
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Profile details has been updated successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [Route("DeleteUserImage")]
        [HttpDelete]
        /*! 
        * \brief  Delete User Profile Image
        * \details Function is used to delete user profile Image
        * \author  Kiran Bala
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult DeleteUserImage(Guid? id = null, string imgname = "")
        {
            var fpath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"] + "\\" + imgname;
            if (fpath != null && fpath != string.Empty)
            {
                System.IO.File.Delete(fpath);
            }
            var models = _userService.UpdateUserProfileImage(id);
            _commonService.AddActivityLog(UserID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has deleted User Image");
            if (models == true)
                return Ok(models);

            return Ok(models);
        }



        [HttpGet]
        [Authorize]
        [Route("GetCustomFieldsData")]
        public IActionResult GetCustomFieldsData()
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _userService.GetCustomFieldsData();
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = result;
               // JsonConvert.SerializeObject(ressult)
               // return Ok(JsonConvert.SerializeObject(result));
                return Ok(result);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [Route("AddUpdateUserType")]
        [Authorize]
        [HttpPost]
        public IActionResult AddUpdateUserType([FromBody]TblMasterModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                model.userid = Guid.Parse(UserID);
                model.companyid = Convert.ToInt64(CompanyID);
                var result = _userService.AddUpdateUserType(model);
                resultResponseModel.StatusCode = 200;
                if (model.MasterId == null)
                {
                    _commonService.AddActivityLog(UserID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                        " has Added new User Type <strong>" + model.MasterValue + "</strong>");
                    resultResponseModel.ResponseMessage = "User Type has been added successfully.";
                }
                else
                {
                    _commonService.AddActivityLog(UserID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                        " has Updated User Type <strong>" + model.MasterValue + "</strong>");
                    resultResponseModel.ResponseMessage = "User Type has been updated successfully.";
                }
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                _commonService.AddActivityLog(UserID, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " is trying to update the status of Bank but error occurs in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Route("GetUserTypeList")]
        public IActionResult GetUserTypeList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _userService.GetUserTypeList(name, sortColumn, sortDir, pageIndex, pageSize, userId, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("DeleteUserType")]
        public IActionResult DeleteUserType(string id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _userService.DeleteUserType(id);
                _commonService.AddActivityLog(id, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(),
                    " has deleted @usertype Id:<strong>" + result + "</strong>", id);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "User Type has been deleted successfully.";
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
        [Route("GetUserTypeDetailById")]
        [Authorize]
        public IActionResult GetUserTypeDetailById(string Id)
        {
            var result = _userService.GetUserTypeDetailById(Id);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetServiceTerritoryDDL")]
       // [Authorize]
        public List<MasterItems> GetServiceTerritoryDDL()
        {
            List<MasterItems> data = new  List<MasterItems>();
            try
            {
                data = _userService.GetServiceTerritoryDDL(Guid.Parse(UserID), CompanyID);
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
        [HttpGet]
        [Route("GetDepartmentDll")]
         [Authorize]
        public List<MasterItems> GetDepartmentDll()
        {
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _userService.GetDepartmentDll(Guid.Parse(UserID), CompanyID);
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
        [HttpGet]
        [Route("GetCompanyDll")]
        [Authorize]
        public List<MasterItems> GetCompanyDll()
        {
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _userService.GetCompanyDll();
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
        [HttpGet]
        [Route("GetModuleSubmoduleList")]
        [Authorize]
        public IActionResult GetModuleSubmoduleList(string id)
        {
            try
            {
               var data = _userService.GetModuleSubmoduleList(Guid.Parse(UserID), CompanyID, id);
                if (data != null)
                {
                    //foreach (var item in data)
                    //{
                    //    item.

                    //    //item.FileUrl = CommonFunctions.GetFileLink(item.FileUrl, "image", enumFileFolder.UploadDocuments);
                    //    //item.FileUrl = item.FileUrl.Replace("wwwroot", "");
                    //}
                    return Ok(data);
                }
                else
                {
                    return BadRequest();
                } 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        [Route("gettoken")]
        [Authorize]
        public async Task<IActionResult> gettoken(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
              if(user != null)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    return Ok(token);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}