using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
    [Route("api/ManageInsurance")]
    public class ManageInsuranceController : Controller
    {
        public readonly IManageInsuranceService _ManageInsurance;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        public ManageInsuranceController(IManageInsuranceService ManageInsurance, ICommonService commonService, IHttpContextAccessor httpContext, UserManager<ApplicationUser> userManager)
        {
            _ManageInsurance = ManageInsurance;
            this._commonService = commonService;
            _httpContext = httpContext;
            _userManager = userManager;
        }

        /*! 
*  \brief     Get List API.
*  \details    This API is used to get a listing of insurance information.
*  \author    Deepak jha
*  \version   1.0
*  \date      14 Sep 2019
*  \pre       First initialize the system.
*  \copyright Solgen.
*/
        [HttpGet]
        [Authorize]
        [Route("GetInsuranceList")]
        public IActionResult GetInsuranceList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(_ManageInsurance.GetInsuranceList(name, sortColumn, sortDir, page, pageSize, userId,CompanyID));
        }


        /*! 
     *  \brief     Delete API.
     *  \details     This API is used to delete a insurance information.
     *  \author    Deepak jha
     *  \version   1.0
     *  \date      14 Sep 2019
     *  \pre       First initialize the system.
     *  \copyright Solgen.
     */
        [HttpGet]
        [Authorize]
        [Route("DeleteInsurance")]
        public IActionResult DeleteInsurance(string insuranceId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                ChangeStatusModel result = _ManageInsurance.DeleteInsurance(insuranceId);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(),
                    " has deleted the  Insurance <strong> " + result.Name + " </strong>");
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Insurance has been deleted successfully.";
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
        *  \brief     Update StatusId API.
        *  \details     This API is used to update insurance information , to StatusId.
        *  \author    Deepak jha
        *  \version   1.0
        *  \date      14 Sep 2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        [HttpPost("ChangeStatus/{id}")]
        [Authorize]
        public IActionResult ChangeStatus(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();
            CommonStatusModel effectedRow = _ManageInsurance.ChangeStatus(id);

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (effectedRow == null)
            {
                throw new Exception("Unable to change status of this record.");
            }
            if (effectedRow.Status == "common-001")
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(), " has set status of Insurance <strong> " + effectedRow.Name + " </strong> to Active");
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(), " has set status of Insurance <strong> " + effectedRow.Name + " </strong> to In-Active");
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            return Ok(result);
        }
        /*! 
             *  \brief     Get insurance detail API.
             *  \details     This API is used to get insorance detail by Insurance Id.
             *  \author    Deepak jha
             *  \version   1.0
             *  \date      16 Sep 2019
             *  \pre       First initialize the system.
             *  \copyright Solgen.
             */
        [HttpGet]
        [Authorize]
        [Route("GetInsuranceByInsuranceId")]
        public IActionResult GetInsuranceByInsuranceId(string insuranceId)
        {
            var result = _ManageInsurance.GetInsuranceByInsuranceId(insuranceId);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }
        /*! 
             *  \brief     Post API.
             *  \details     This API is used to save and update insurance information.
             *  \author    Deepak jha
             *  \version   1.0
             *  \date      16 Sep 2019
             *  \pre       First initialize the system.
             *  \copyright Solgen.
             */
        [HttpPost]
        [Authorize]
        [Route("AddOrEditInsurance")]
        public IActionResult AddEditInsurance([FromBody] InsuranceDetailsModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            string pwd = CommonFunctions.GetRandomStrongPassword();
            model.Password = pwd;
            model.CompanyID = CompanyID;

            if (model.InsuranceId == null)
            {//add
                var applicationUser = new ApplicationUser()
                {
                    NormalizedUserName = model.AgentEmail,
                    Email = model.AgentEmail,
                    FirstName = model.Name,
                    LastName ="",
                    UserName = model.AgentEmail,
                    UserType = "1FF11A07-3B64-4E63-BE8B-276BA38BC495",
                    PhoneNumber = model.Phone,
                    Address = model.Address,
                    IsActive = true,
                    EmployeeType = Guid.Empty,
                    Notes = "",
                    Webbrowser = WebBrowser,
                    BrowserVersion = OSWebBrowser,
                    IPAddress = IPAddress,
                    LastLoginDate = DateTime.UtcNow,
                    CreatedOn = DateTime.UtcNow,
                    City = model.City,
                    County = model.County,
                    State = model.State,
                    ZipCode = model.ZipCode,
                    CompanyID=model.CompanyID
                };
                try
                {
                    applicationUser.EmailConfirmed = true;
                    var data = _userManager.CreateAsync(applicationUser, pwd).GetAwaiter().GetResult();
                    if (data.Succeeded)
                    {//added user in aspnetuser 
                        model.InsuranceAdminUserId = applicationUser.Id;
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
                string status = _ManageInsurance.IsEmailExist(model.InsuranceId, model.AgentEmail);
                if (status != "Success")
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = status;
                    return Ok(resultResponseModel);
                }
            }
            model.CreatedById = userid;
            model.Password = pwd;
            var result = _ManageInsurance.AddEditInsurance(model);

            if (result == 1)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                    " has Added new Insurance <strong>" + model.Name + "</strong>");
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Insurance has been added successfully.";
                return Ok(resultResponseModel);
            }
            else
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                    " has updated  Insurance <strong>" + model.Name + "</strong>");
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Insurance has been updated successfully.";
                return Ok(resultResponseModel);
            }
        }
        /*! 
             *  \brief     Get API.
             *  \details   This API is used to State list.
             *  \author    Deepak jha
             *  \version   1.0
             *  \date      16 Sep 2019
             *  \pre       First initialize the system.
             *  \copyright Solgen.
             */
        [HttpGet]
        [Authorize]
        [Route("GetStateList")]
        public IActionResult GetStateList()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            list = _ManageInsurance.GetStateList();
            return Ok(list);
        }

        [HttpGet]
        [Authorize]
        [Route("GetReportToList")]
        public IActionResult GetReportToList()
        {
            List<ReportToModel> list = new List<ReportToModel>();
            list = _ManageInsurance.GetReportToList(CompanyID);
            return Ok(list);
        }

        [HttpGet]
        [Route("GetStateListNotAuth")]
        public IActionResult GetStateListNotAuth()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            list = _ManageInsurance.GetStateList();
            return Ok(list);
        }

        /*! 
             *  \brief     Get API.
             *  \details   This API is used to Country list.
             *  \author    Vikas Rao
             *  \version   1.0
             *  \date      02 Nov 2020
             *  \pre       First initialize the system.
             *  \copyright Solgen.
             */
        [HttpGet]
        [Authorize]
        [Route("GetCountryList")]
        public IActionResult GetCountryList()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            list = _ManageInsurance.GetCountryList();
            return Ok(list);
        }
        [HttpGet]
        [Authorize]
        [Route("GetCountryListIso")]
        public IActionResult GetCountryListIso()
        {
            List<SelectItemModelIso> list = new List<SelectItemModelIso>();
            list = _ManageInsurance.GetCountryListIso();
            return Ok(list);
        }

        [HttpGet]
        [Route("GetCountryListNotAuth")]
        public IActionResult GetCountryListNotAuth()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            list = _ManageInsurance.GetCountryList();
            return Ok(list);
        }

        #region Insurance REquest
        [HttpGet]
        [Authorize]
        [Route("GetInsuranceRequestList")]
        /*! 
             *  \brief     Get API.
             *  \details   This API is used to Get insurance request list.
             *  \author    Deepak jha
             *  \version   1.0
             *  \date      16 Sep 2019
             *  \pre       First initialize the system.
             *  \copyright Solgen.
             */
        public IActionResult GetInsuranceRequestList(string nameSearch, Guid? listFilter, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var list = _ManageInsurance.GetInsuranceRequestList(nameSearch, listFilter, sortColumn, sortDir, page, pageSize, Guid.Parse(userid));
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
        

        [HttpGet]
        [Authorize]
        [Route("GetInsuranceComboList")]/*! 
          * \brief     GetInsurance List  .
          * \author   Surendra Maurya
          * \date     5 Dec 2019
          * \version 1.0    
          */
        public IActionResult GetInsuranceComboList()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            list = _ManageInsurance.GetInsuranceDropList(CompanyID);
            return Ok(list);
        }
        #endregion

        /*! 
         *  \brief     Get insurance detail API.
         *  \details     This API is used to get insorance detail by Insurance Id.
         *  \author    Deepak jha
         *  \version   1.0
         *  \date      16 Sep 2019
         *  \pre       First initialize the system.
         *  \copyright Solgen.
         */
        [HttpGet]
        [Authorize]
        [Route("GetInsuranceDetail")]
        public IActionResult GetInsuranceDetailByInsuranceContactId(string insuranceContactId)
        {
            var result = _ManageInsurance.GetInsuranceDetailByInsuranceContactId(insuranceContactId);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        [Route("SaveInsuranceDetail")]
        /*! 
        * \brief  Add update Email template.
        * \details Function is used to  Add update Email template.
        * \author  Anish K 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public IActionResult SaveInsuranceDetail([FromBody]InsuranceDetailsModel model)
        {

            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.CreatedById = userid;

            var data = _ManageInsurance.SaveInsuranceDetail(model);
            result.StatusCode = 200;
            if (model.InsuranceId == null)
            {
                result.ResponseMessage = "Insurance Information has been added successfully.";
            }
            else
            {
                result.ResponseMessage = "Insurance Information has been updated successfully.";
            }
            return Ok(result);

        }

    }
}