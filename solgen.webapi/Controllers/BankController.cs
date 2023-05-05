using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.Models;
using authorizeLibrary;
namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]

    [Route("api/Bank")]
    public class BankController : Controller
    {
        private IBankService _bankService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        private Guid parsedUserID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public BankController(IBankService bankService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _bankService = bankService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        [HttpGet]
        //  [Authorize]
        [AuthorizeFilter]
        [Route("GetBankList")]
        /*! 
        * \brief   Get the Bank List
        * \details Function is used to fetch the list of Banks
        * \author  Kiran Bala 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetBankList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _bankService.GetBankList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        /*! 
       * \brief   Update Bank Status
       * \details Function is used to update active/inactive status of Bank
       * \author  Kiran Bala 
       * \date    16 Sep 2019
       * \version 1.0    
       */
        [HttpGet]
        [Authorize]
        [Route("UpdateBankStatus")]
        public IActionResult UpdateBankStatus(string BankId, string BankStatus)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _bankService.UpdateBankStatus(BankId, BankStatus);
                if (BankStatus == "True")
                {
                    _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(), " has set Status of Bank to Active");
                }
                else
                {
                    _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(), " has set Status of Bank to In-Active");
                }
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Status has been updated successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " is trying to update the status of Bank but error occurs in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteBank")]

        /*! 
       * \brief   Delete Bank
       * \details Function is used to Delete Bank
       * \author  Kiran Bala 
       * \date    16 Sep 2019
       * \version 1.0    
       */
        public IActionResult DeleteBank(string Bankid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _bankService.DeleteBank(Bankid);
                _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " has Updated Bank");
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Bank has been deleted successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(), " is trying to delete the bank but error occurs in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Route("GetBankDetailById")]
        [Authorize]
        /*! 
        * \brief   Get User Detail
        * \details Function is used to get the detail based of parameter id
        * \author  Kiran Bala
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetBankDetailById(string Bankid)
        {
            var result = _bankService.GetBankDetailById(Bankid);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpPost]
        [Route("AddEditBank")]
        [Authorize]
        /*! 
        * \brief   Add Edit Bank detail
        * \details function is used to add/edit Bank
        * \author  Kiran Bala 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public IActionResult AddEditBank([FromBody] BankModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {

                model.CreatedByID = userID.ToString();
                model.CompanyID = companyID;
                var result = _bankService.AddEditBank(model);
                resultResponseModel.StatusCode = 200;
                if (model.ID == null)
                {
                    _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                        " has Added new Bank <strong>" + model.BankName + "</strong>");
                    resultResponseModel.ResponseMessage = "Bank has been added successfully.";
                }
                else
                {
                    _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                        " has Updated Bank <strong>" + model.BankName + "</strong>");
                    resultResponseModel.ResponseMessage = "Bank has been updated successfully.";
                }
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Error.ToString(), " is trying to add/edit bank but error occur in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }
        [HttpPost]
        [Route("AddEditCustomField")]
        [Authorize]
        public IActionResult AddEditCustomField([FromBody] CustomFieldModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {

                model.CreatedByID = userID.ToString();
                //model.CompanyID = CompanyID;
                string result = _bankService.AddEditCustomField(model);
                resultResponseModel.StatusCode = 200;
                if (model.Id == null)
                {
                    //    _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                    //        " has Added new Bank <strong>" + model.BankName + "</strong>");
                    resultResponseModel.ResponseMessage = "Custom Field has been added successfully.";
                }
                else
                {
                    //_commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
                    //    " has Updated Bank <strong>" + model.BankName + "</strong>");
                    resultResponseModel.ResponseMessage = "Custom Field has been updated successfully.";
                }
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                // _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Error.ToString(), " is trying to add/edit bank but error occur in the process " + ex.Message);
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpPost]
        [Route("SaveCustomManagePopup")]
        [Authorize]
        public IActionResult SaveCustomManagePopup([FromBody] ManageViewModelWithCompany model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                model.CreatedByID = userID.ToString();
                model.CompanyID = companyID;
                string result = _bankService.SaveCustomManagePopup(model);
                resultResponseModel.StatusCode = 200;
                if (model.Id == null || model.Id == "0" || model.Id == "")
                {
                    resultResponseModel.ResponseMessage = "View `" + model.select + "` has been added successfully.";
                }
                else
                {
                    resultResponseModel.ResponseMessage = "View `" + model.select + "` has been updated successfully.";
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



        [HttpPost]
        [Route("checkDublicateViewName")]
        [Authorize]
        public IActionResult checkDublicateViewName([FromBody] ManageViewModelWithCompany model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                model.CreatedByID = userID.ToString();
                model.CompanyID = companyID;
                string result = _bankService.checkDublicateViewName(model);

                if (result == "1")
                {
                    resultResponseModel.ResponseMessage = "1";
                }
                else
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = result;
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


        //[HttpPost]
        //[Route("SaveManageViewPopup")]
        //[Authorize]
        //public IActionResult SaveManageViewPopup([FromBody] ManageViewModel model)
        //{
        //    ResultResponseModel resultResponseModel = new ResultResponseModel();
        //    var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
        //    try
        //    {

        //        //model.CreatedByID = userid;
        //        //model.CompanyID = CompanyID;
        //        string result = _bankService.SaveManageViewPopup(model);
        //        resultResponseModel.StatusCode = 200;
        //        if (model.Id == null)
        //        {

        //            resultResponseModel.ResponseMessage = "Custom Field has been added successfully.";
        //        }
        //        else
        //        {
        //            //_commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Edit.ToString(),
        //            //    " has Updated Bank <strong>" + model.BankName + "</strong>");
        //            resultResponseModel.ResponseMessage = "Custom Field has been updated successfully.";
        //        }
        //        return Ok(resultResponseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        // _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Error.ToString(), " is trying to add/edit bank but error occur in the process " + ex.Message);
        //        resultResponseModel.StatusCode = 500;
        //        resultResponseModel.ResponseMessage = ex.Message;
        //        return Ok(resultResponseModel);
        //    }
        //}
        [HttpGet]
        [Authorize]
        [Route("GetBankDropList")]
        /*! 
        * \brief   Get the  listing of bank
        * \details function is used to get the listing of bank.
        * \author  Deepak jha 
        * \date    20 Dec 2019
        * \version 1.0    
        */
        public IActionResult GetBankDropList()
        {
            var banks = _bankService.GetBankDropList(companyID);
            return Ok(banks);
        }

        [HttpGet]
        [Authorize]
        [Route("GetRolesDropListByUserType")]
        /*! 
       * \brief   Get the  listing of Roles by user type
       * \details function is used to get the listing of Roles by user type.
       * \author  Kiran Bala
       * \date    20 Oct 2019
       * \version 1.0    
       */
        public IActionResult GetRolesDropListByUserType(long id)
        {
            var roles = _bankService.GetRolesDropListByUserType(id, companyID, userID);
            return Ok(roles);
        }

        /*! 
        * \brief   Get the Bank List
        * \details Function is used to fetch the list of Banks
        * \author  Kiran Bala 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        [Authorize]
        [HttpGet]
        [Route("GetUsersBankList")]

        public IActionResult GetUsersBankList(int pageIndex, int pageSize, Guid? bankId)
        {
            try
            {
                var lst = _bankService.GetUsersBankList(pageIndex, pageSize, bankId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetLoanApplicationList")]
        public IActionResult GetLoanApplicationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long batchid)
        {
            try
            {
                var lst = _bankService.GetLoanApplicationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, parsedUserID, companyID, batchid);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetLoanTermList")]
        public IActionResult GetLoanTermList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _bankService.GetLoanTermList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }





        [HttpGet]
        //  [Authorize]  GetTaskList
        [Route("GetTaskList")]
        public IActionResult GetTaskList(string nameSearch, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _bankService.GetTaskList(nameSearch, sortColumn, sortDir, page, pageSize, userId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize] GetcibilScoreList
        [Route("GetDesignationList")]
        public IActionResult GetDesignationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _bankService.GetDesignationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize]  GetTaskList
        [Route("GetLocationList")]
        public IActionResult GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _bankService.GetLocationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        //  [Authorize]
        [Route("GetLocationTypeList")]
        public IActionResult GetLocationTypeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _bankService.GetLocationTypeList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetcibilScoreList")]
        public IActionResult GetcibilScoreList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                var lst = _bankService.GetcibilScoreList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }




        //[HttpGet]
        ////  [Authorize]
        //[Route("GetLeadlistJson")]
        //public IActionResult GetLeadlistJson(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        //{
        //    try
        //    {

        //        var lst = _bankService.GetLeadlist(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, CompanyID,"","","crm","lead");

        //        return Ok(lst);
        //    }
        //    catch //(Exception ex)
        //    {
        //        return BadRequest();


        //    }
        //}
        [HttpGet]
        [Authorize]
        [Route("GetCustomFieldList")]
        public IActionResult GetCustomFieldList(string moduleId, string SubModuleId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, int companyId)
        {
            var lst = _bankService.GetCustomFieldList(moduleId, SubModuleId, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
            return Ok(lst);
        }

        [HttpGet]
        [Authorize]
        [Route("GetCustomFieldDetail")]
        public IActionResult GetCustomFieldDetail(Int64 id)
        {
            var result = _bankService.GetCustomFieldDetail(id);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }






        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityview")]
        public IActionResult GetOpportunityview(long opid, int stageid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityview(opid, stageid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("getopportunitystage")]

        public IActionResult getopportunitystage(long opid, Guid userid, int CompanyID)
        {
            List<opportunitystage> list = new List<opportunitystage>();
            try
            {
                list = _bankService.getopportunitystage(opid, parsedUserID, (int)companyID);
                return Ok(list);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetEmployeeDetailById")]
        public async Task<IActionResult> GetEmployeeDetailById(string id, string moduleName, string submoduleName)
        {
            var result = await _bankService.GetEmployeeDetailById(id, moduleName, submoduleName);
            //dynamic stuff = JsonConvert.DeserializeObject(result);
            //JObject json = new JObject(result);
            //json = (JObject)result;
            if (result == null)
                return BadRequest();
            // return Ok(result);
            return Content(result, "application/json");
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityviewTabData")]
        public IActionResult GetOpportunityviewTabData(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityviewTabData(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewProposal")]
        public IActionResult GetOpportunityViewProposal(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityViewProposal(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewTask")]
        public IActionResult GetOpportunityViewTask(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityViewTask(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewWorkorder")]
        public IActionResult GetOpportunityViewWorkorder(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityViewWorkorder(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewProduct")]
        public IActionResult GetOpportunityViewProduct(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityViewProduct(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetAppointmentbyopportunityId")]
        /*! 
        * \brief   Get the  listing of bank
        * \details function is used to get the listing of bank.
        * \author  Deepak jha 
        * \date    20 Dec 2019
        * \version 1.0    
        */
        public IActionResult GetAppointmentbyopportunityId(long opid, Guid userid, int CompanyID)
        {
            var data = _bankService.GetAppointmentbyopportunityId(opid, parsedUserID, (int)companyID);
            return Ok(data);
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewAccData")]
        public IActionResult GetOpportunityViewAccData(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityViewAccData(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }



        #region dynamic listing

        [HttpGet]
        //  [Authorize]
        [AuthorizeFilter]
        [Route("GetLeadlist")]
        public async Task<IActionResult> GetLeadlist(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string custom_view_id, string searchFilter, string moduleName, string submoduleName, long companyId, string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords)
        {
            try
            {
                if (userId == null)
                    userId = parsedUserID;

                if (companyId == 0)
                    companyId = companyID;

                var lst = await _bankService.GetLeadlist(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, isAllRecords);
                return Content(lst, "application/json");
            }
            catch (Exception ex)
            {
                if(ex.Message.Contains("Timeout"))
                {
                    var lst = await _bankService.GetLeadlist(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, isAllRecords);
                    return Content(lst, "application/json");
                }
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("GetLenderlist")]
        public async Task<IActionResult> GetLenderlist(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string custom_view_id, string searchFilter, string moduleName, string submoduleName, long companyId)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;

                userId = userID;
                var lst = await _bankService.GetLenderlist(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }



        [HttpGet]
        //  [Authorize]  GetTaskList
        [AuthorizeFilter]
        [Route("GetAccountsList")]
        public async Task<IActionResult> GetAccountsList(bool isCustomerList, bool isSubDealerList, string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string custom_view_id, string searchFilter, string moduleName, string submoduleName, long companyId, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;

                userId = userID;
                var lst = await _bankService.GetAccountsList(isCustomerList, isSubDealerList, nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        //  [Authorize]  GetTaskList
        [Route("GetBankListNew")]
        public async Task<IActionResult> GetBankListNew(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string custom_view_id, string searchFilter, string moduleName, string submoduleName, long companyId)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;

                var lst = await _bankService.GetBankListNew(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetProductList")]
        public IActionResult GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = _bankService.GetproductList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetproposalList")]
        public IActionResult GetproposalList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = _bankService.GetproposalList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetContractList")]
        public IActionResult GetContractList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = _bankService.GetContractList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize] 
        [Route("GetDepartmentList")]
        public IActionResult GetDepartmentList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = _bankService.GetDepartmentList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityList")]
        public IActionResult GetOpportunityList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = _bankService.GetOpportunityList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetEmployeeList")]
        public IActionResult GetEmployeeList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = _bankService.GetEmployeeList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);

                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetSolgenContactList")]
        public IActionResult GetSolgenContactList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = _bankService.GetSolgenContactList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        #endregion

        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewFileupload")]
        public IActionResult GetOpportunityViewFileupload(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityViewFileupload(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewcontractlist")]
        public IActionResult GetOpportunityViewcontractlist(long opid, Guid userid, int CompanyID)
        {
            try
            {
                var lst = _bankService.GetOpportunityViewcontractlist(opid, parsedUserID, (int)companyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("SendEmail")]
        public IActionResult SendEmail([FromBody] SMTPSettingModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient();

                mail.From = new MailAddress(model.FromEmail);
                mail.To.Add(model.ToEmail);
                mail.Subject = model.Subject;
                mail.Body = model.Message;
                // Attachment attachment = new Attachment(filename);
                // mail.Attachments.Add(attachment);

                SmtpServer.Port = model.SmtpPort;
                SmtpServer.Host = model.SmtpHost;
                SmtpServer.Credentials = new System.Net.NetworkCredential(model.Username, model.Password);
                SmtpServer.EnableSsl = model.IsEnableSSL;
                SmtpServer.Send(mail);

                responseModel.StatusCode = 200;
                responseModel.OptionalExtraParamers = "";
                responseModel.ResponseMessage = "Email Sent successfully.";

                return Ok(responseModel);

            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = ex.Message;

                return Ok(responseModel);
            }
        }
        [HttpGet]
        [Route("GetprojectList")]
        public async Task<IActionResult> getProjectList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            try
            {
                if (companyId == 0)
                    companyId = companyID;
                var lst = await _bankService.getProjectList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddEditProject")]
        public async Task<IActionResult> AddEditProject([FromBody] ProjectModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userId = userID.ToString();
                model.companyId = companyID;
                string data = _bankService.AddEditProject(model);

                var datacode = data.Split('~');

                if (datacode.Length > 1)
                {
                    if (datacode[0] == "-1")
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = datacode[1];
                    }
                }
                else if (data != null)
                {
                    if (model.Id == "")
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Opportunity has been added successfully.";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Opportunity has been updated successfully.";
                    }
                }

                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later!.";
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

    }

}