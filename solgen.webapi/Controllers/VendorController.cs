using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Vendor")]
    public class VendorController : Controller
    {
        private IVendorService _vendorService;
        private ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly UserManager<ApplicationUser> _userManager;
        public VendorController(IVendorService vendorService, ICommonService commonService, IHttpContextAccessor httpContext, UserManager<ApplicationUser> userManager)
        {
            _vendorService = vendorService;
            _commonService = commonService;
            _httpContext = httpContext;
            _userManager = userManager;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        [Authorize]
        [Route("GetVendorList")]
        /*! 
        * \brief   Get the Vendor List
        * \details Function is used to fetch the list of vendors
        * \author  Kiran Bala 
        * \date    14 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetVendorList(string nameSearch, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            try
            {
               var lst = _vendorService.GetVendorList(nameSearch, sortColumn, sortDir, page, pageSize,userId,CompanyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetVendorLeaseRequestList")]
        /*! 
        * \brief   Get the Vendor List
        * \details Function is used to fetch the list of vendors
        * \author Deepak jha
        * \date    13 Dec 2019
        * \version 1.0    
        */
        public IActionResult GetVendorLeaseRequestList(string searchText,string leaseStatus, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId,Guid? contactId)
        {
            try
            {
                var uid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var list = _vendorService.GetVendorLeaseRequestList(searchText, leaseStatus, sortColumn, sortDir, pageIndex, pageSize, uid, contactId);
                foreach (var item in list.Data)
                {
                    item.DocumentFileName = CommonFunctions.GetFileLink(item.DocumentFileName, "image", enumFileFolder.leasedocpdf);
                    if (item.DocumentFileName.Contains("defaultNoImage"))
                    {
                        item.DocumentFileName = "javascript:void(0);";

                    }
                    else
                    {

                        item.DocumentFileName = item.DocumentFileName.Replace("wwwroot", "");
                    }
                }
                return Ok(list);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("UpdateVendorStatus")]        
        /*! 
       * \brief   Update Vendor Status
       * \details Function is used to update active/inactive status of vendor
       * \author  Kiran Bala 
       * \date    14 Sep 2019
       * \version 1.0    
       */
        public IActionResult UpdateVendorStatus(string vendorId, string vendorStatus)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {              
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var result = _vendorService.UpdateVendorStatus(vendorId, vendorStatus);
                if (vendorStatus == "True")
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(), " has set status of vendor to Active");
                }
                else
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(), " has set status of vendor to In-Active");
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

        [HttpGet]
        [Route("GetVendorDetailById")]
        [Authorize]
        /*! 
        * \brief   Get User Detail
        * \details Function is used to get the detail based of parameter id
        * \author  Vikrant
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetVendorDetailById(string vendorid)
        {
            var result = _vendorService.GetVendorDetailById(vendorid);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpPost]
        [Route("AddEditVendor")]
        [Authorize]
        /*! 
        * \brief   Add Edit Vendor detail
        * \details function is used to add/edit Vendor
        * \author  Kiran Bala 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public IActionResult AddEditVendor([FromBody] VendorModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                string pwd = CommonFunctions.GetRandomStrongPassword();
                model.Password = pwd;
                model.companyID = CompanyID;
                if (model.ID == null)
                {//add
                    var applicationUser = new ApplicationUser()
                    {
                        NormalizedUserName = model.Email,
                        Email = model.Email,
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        UserName = model.Email,
                        UserType = "E5EAC212-B26A-4441-83F0-08BCBE923CF5",//vendor user
                        PhoneNumber = model.Phone,
                        Address = model.Address,
                        IsActive = true,
                        EmployeeType = Guid.Empty,
                        Notes = "",
                        Webbrowser = WebBrowser,
                        BrowserVersion =OSWebBrowser,
                        IPAddress = IPAddress,
                        LastLoginDate = DateTime.UtcNow,
                        CreatedOn = DateTime.UtcNow,
                        City=model.City,
                        County=model.County,
                        State=model.State,
                        ZipCode=model.ZipCode,
                        CompanyID = model.companyID
                    };
                    try
                    {
                        applicationUser.EmailConfirmed = true;
                        var data = _userManager.CreateAsync(applicationUser, pwd).GetAwaiter().GetResult();
                        if (data.Succeeded)
                        {//added user in aspnetuser 
                            model.VendorAdminUserId = applicationUser.Id;
                        }
                        else
                        {
                            resultResponseModel.StatusCode = 500;
                            var error = data.Errors.FirstOrDefault();
                            if (error != null)
                            {
                                resultResponseModel.ResponseMessage = error.Description;
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
                else
                {//update---duplicate checks
                    string status = _vendorService.IsEmailExist(model.ID, model.Email);
                    if (status != "Success")
                    {
                        resultResponseModel.StatusCode = 500;
                        resultResponseModel.ResponseMessage = status;
                        return Ok(resultResponseModel);
                    }
                }
                model.CreatedByID = userid;
                var result = _vendorService.AddEditVendor(model);
                resultResponseModel.StatusCode = 200;
                if (model.ID == null)
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                        " has Added new Vendor <strong>" + model.FirstName+" "+model.LastName+ "</strong>");
                    resultResponseModel.ResponseMessage = "Vendor has been added successfully.";
                }
                else
                {
                    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                        " has Updated Vendor <strong>" + model.FirstName + " " + model.LastName + "</strong>");
                    resultResponseModel.ResponseMessage = "Vendor has been updated successfully.";
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
        [Authorize]
        [Route("GetVendorDropList")]
        /*! 
        * \brief  Get the vendor list for dropdown list
        * \details Function is used to Get the vendor list for dropdown list
        * \author  deepak jha
        * \date    24 Dec 2019
        * \version 1.0    
        */
        public IActionResult GetVendorDropList()
        {
            var records=_vendorService.GetVendorDropList(CompanyID);
            return Ok(records);
        }
        [HttpGet]
        [Authorize]
        [Route("GetVendorListForDropDown")]
        /*! 
        * \brief  Get the vendor list for dropdown list by vendor
        * \details Function is used to Get the vendor list for dropdown list  by vendor
        * \author  deeepak jha
        * \date    24 dec 2019
        * \version 1.0    
        */
        public IActionResult GetVendorListForDropDown(bool vendor )
        {
            var records = _vendorService.GetVendorList(CompanyID);
            return Ok(records);
        }

        [HttpGet]
        //[Authorize]
        [Route("GetDynamicFields")]
        public IActionResult GetDynamicFields(string vendorid)
        {
            var result = _vendorService.GetDynamicFields();
            if (result == null)
                return BadRequest();

            return Ok(result);
        }
        [HttpGet]
        //[Authorize]
        [Route("GetManageViewCustomFieldsList")]
        public IActionResult GetManageViewCustomFieldsList( string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode, string fieldlistFilter=null)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _vendorService.GetManageViewCustomFieldsList(fieldlistFilter,companyid, userId, moduleName, userid, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        //[Authorize]
        [Route("GetCustomFields")]
        public IActionResult GetCustomFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef,string PrimaryId,string RefId,string displayCode)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _vendorService.GetCustomFields(companyid, userId,  moduleName, userid,  strType, search, isFor,  isRef, PrimaryId, RefId, displayCode);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        //[Authorize]
        [Route("GetCustomFieldsManage")]
        public IActionResult GetCustomFieldsManage(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _vendorService.GetCustomFieldsManage(companyid, userId, moduleName, userid, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        //[Authorize]
        [Route("GetCustomFieldsManageForm")]
        public IActionResult GetCustomFieldsManageForm(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _vendorService.GetCustomFieldsManageForm(companyid, userId, moduleName, userid, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        //[Authorize]
        [Route("GetLayoutCustomFieldByModuleNameAndSubModule")]
        public IActionResult GetLayoutCustomFieldByModuleNameAndSubModule(string companyId,  string moduleName, string subModuleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _vendorService.GetLayoutCustomFieldByModuleNameAndSubModule(companyid, userid, moduleName, subModuleName);
                //return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        //[Authorize]
        [Route("GetLayoutFormFieldByModuleNameAndSubModule")]
        public IActionResult GetLayoutFormFieldByModuleNameAndSubModule(string companyId, string moduleName,string formMasterId, string subModuleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _vendorService.GetLayoutFormFieldByModuleNameAndSubModule(companyid, userid, moduleName, subModuleName, formMasterId);
            //return BadRequest();

            return Content(result, "application/json");
        }
        [HttpGet]
        //[Authorize]
        [Route("GetCustomFieldsSelectMasterFields")]
        public IActionResult GetCustomFieldsSelectMasterFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = _vendorService.GetCustomFieldsSelectMasterFields(companyid, userId, moduleName, userid, strType, search, isFor, isRef, PrimaryId);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        [Route("GetRelatedObjects")]
        public async Task<IActionResult> GetRelatedObjects(string moduleName, string subModuleName, long primaryId, string deviceType, string layoutType)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = int.Parse(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var result = await _vendorService.GetRelatedObjects(moduleName, subModuleName, primaryId, deviceType, layoutType, companyid, userid);
            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        [Route("GetRelatedObjectsCompactView")]
        public async Task<IActionResult> GetRelatedObjectsCompactView(long compact_view_id, string sub_module_code, long record_id, string sortColumn, string sortDirection, long pageNo, long pageSize)
        {
            var CompanyId = int.Parse(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var result = await _vendorService.GetRelatedObjectsCompactView(compact_view_id, sub_module_code, record_id, sortColumn, sortDirection, pageNo, pageSize, CompanyId);
            if (result == null)
                return BadRequest();
            return Content(result, "application/json");

        }
    }
}