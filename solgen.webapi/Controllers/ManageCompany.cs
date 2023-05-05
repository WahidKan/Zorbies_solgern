using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Company")]
    public class ManageCompany : Controller
    {
        private readonly UserHub _timeHub;
        private IManageCompanyService _ManageCompanyService;
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        public ManageCompany(IManageCompanyService ManageCompanyService)
        {
            _ManageCompanyService = ManageCompanyService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetCompanyList")]

        public IActionResult GetCompanyList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var data = _ManageCompanyService.GetCompanyList(name, sortColumn, sortDir, page, pageSize, Guid.Parse(uid), CompanyID);
            foreach (dynamic item in data.Data)
            {
                item.CompanyLogo = CommonFunctions.GetFileLink(item.CompanyLogo, "image", enumFileFolder.user);
            }
            return Ok(data);
        }
        [HttpGet]
        [Authorize]
        [Route("GetPriceBookList")]
        public IActionResult GetPriceBookList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID)
        {
            var uid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var data = _ManageCompanyService.GetPriceBookList(name, sortColumn, sortDir, page, pageSize, Guid.Parse(uid), CompanyID);
            return Ok(data);
        }
        [HttpGet]
        [Authorize]
        [Route("DeleteCompanys")]
        public IActionResult DeleteCompanys(string companyIds)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _ManageCompanyService.DeleteCompanys(companyIds);
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

                if (result == 1)
                {
                    // _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " has Deleted Master");
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Company has been Deleted successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    //_commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(), " Error occurs while deleting master record, Master");
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while deleting Company record";
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

        [HttpGet]
        [Authorize]
        [Route("GetCompanyModule")]
        public IActionResult GetCompanyModule(long? userTypeId)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = _ManageCompanyService.GetCompanyModule(userTypeId, Guid.Parse(userid));
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("AddOrUpdateCompany")]
        public IActionResult AddOrUpdateCompany([FromForm] CompanyModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            if (model != null)
            {
                string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
                string filePrefix = "companyLogo";
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CreatedBy = Guid.Parse(userid);
                if (Request.Form.Files.Count > 0)
                {
                    for (int i = 0; i < Request.Form.Files.Count; i++)
                    {
                        //if(i==0)
                        //{
                        //    //if(Reqi)
                        //}
                    }
                    var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
                    model.CompanyLogo = fileResult.Item1 ?? "";


                    filePrefix = "templateLogo";
                    var fileResultemail = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
                    // model.EmailTemplateLogo = fileResultemail.Item1 ?? "";
                }
                var data = 0;
                //var data = _configurationSettingService.AddOrUpdateCompanySetup(model);
                if (data > 0)
                {
                    if (model.CompanyId > 0)
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "company setup detail inserted successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "company setup detail updated successfully.";
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
        [HttpGet]
        [Authorize]
        [Route("DeleteBookPrice")]
        public IActionResult DeleteBookPrice(string ids)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var result = _ManageCompanyService.DeleteBookPrice(userid, CompanyID, ids);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Announcement has been deleted successfully.";
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
        [Route("deleteMultiplePriceBook")]
        public IActionResult deleteMultiplePriceBook(string ids)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string data = ids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                var result = _ManageCompanyService.DeleteBookPrice(userid, CompanyID, dataFinal);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Announcement has been deleted successfully.";
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
        [Authorize]
        [Route("addOrUpdatePriceBook")]
        public IActionResult addOrUpdatePriceBook([FromForm] PriceBookModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.CreatedBy = userid;
            model.CompanyId = CompanyID;
            if (model != null)
            {
                var data = _ManageCompanyService.addOrUpdatePriceBook(model);
                if (data != null)
                {
                    if (model.PriceBookID ==null || model.PriceBookID==0)
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Book Price has been inserted successfully!";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Book Price has been updated successfully!";
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
        [HttpGet]
        [Authorize]
        [Route("GetPriceBookById")]
        public IActionResult GetPriceBookById(string id)
        {
            var User_id = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = _ManageCompanyService.GetPriceBookById(id, CompanyID.ToString(), User_id);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }


        [HttpGet]
        [Authorize]
        [Route("GetAssociateProductList")]
        public IActionResult GetAssociateProductList(long priceBookId, long opportunityId, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, string userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _ManageCompanyService.GetAssociateProductList(priceBookId, opportunityId, companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }

        [HttpPost]
        [Authorize]
        [Route("AddUpdateLineItem")]
        public IActionResult AddUpdateLineItem([FromForm] PriceBookModelForProductItem model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            model.CompanyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            if (model != null)
            {
                var data = _ManageCompanyService.AddUpdateLineItem(model);
                if (model.lineItemId == null)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Line Item has been inserted successfully!";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Line Item has been updated successfully!";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Some thing went wrong, Please try again later!.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetAssociateDocumentList")]
        public IActionResult GetAssociateDocumentList(string priceBookId)
        {
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                var result = _ManageCompanyService.GetAssociateDocumentList(userid, companyid, priceBookId);

                if (result == null)
                    return BadRequest();

                //string prepareResult = string.Concat("[", result, "]");
                //return Content(prepareResult, "application/json");
                return Ok(result);

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("DeleteAssociateProduct")]
        public IActionResult DeleteAssociateProduct(string pricemapId, string priceBookId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var result = _ManageCompanyService.DeleteAssociateProduct(userid, CompanyID.ToString(), pricemapId, priceBookId);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Associate Price book item has been deleted successfully.";
                return Ok(resultResponseModel);
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
