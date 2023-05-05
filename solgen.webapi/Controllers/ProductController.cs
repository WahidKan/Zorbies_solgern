using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{

    [Produces("application/json")]
    [Route("api/product")]
    public class ProductController : Controller
    {
        private IProductService _productService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private long CompanyId => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? UserId => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public ProductController(IProductService productService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _productService = productService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        [HttpGet]
        [Authorize]
        [Route("GetProductById")]
        public async Task<IActionResult> GetProductById(string id, string moduleName, string submoduleName)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _commonService.GetProductById(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetProductList")]
        public async Task<IActionResult> GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = await _productService.GetproductList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddEditProduct")]
        public async Task<IActionResult> AddEditProduct([FromBody]JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = _productService.AddEditProduct(model);
                //string retResponseMessage = string.Format("Product has been {0} successfully.", (model.Id == "") ? "inserted" : "updated");
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    if(model.Id == "" || model.Id==null)
                    {
                        responseModel.ResponseMessage = "Product has been added successfullyy";
                    }
                    else
                    {
                        responseModel.ResponseMessage = "Product has been updated successfully";
                    }
                   
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                }

                return Ok(responseModel);
            }
            catch //(Exception ex)
            {
                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetPriceBookList")]
        public IActionResult GetPriceBookList( string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _productService.GetPriceBookList( nameSearch, SortColumn, SortDir, PageNo, PageSize, productid,userId, companyID);
                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }


        [Authorize]
        [HttpGet]
        [Route("GetProductsPriceBooksList")]
        public async Task<ActionResult> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _productService.GetProductsPriceBooksList(productId, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetProductCampaignsList")]
        public async Task<ActionResult> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var data = await _productService.GetProductCampaignsList(productId, sortColumn, sortDir, pageIndex, pageSize, CompanyId, UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        #region Product Required Section API
        [Authorize]
        [HttpGet]
        [Route("GetProductRequiredList")]
        public async Task<ActionResult> GetProductRequiredList(string pNameAndNumber, string sortColumn, string sortDir,int pageIndex, int pageSize,DateTime? From,DateTime? To,int workTypeId)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _productService.GetProductRequiredList(pNameAndNumber,sortColumn,  sortDir, pageIndex, pageSize, From,  To,  workTypeId,companyID, userId.ToString());
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetProductRequiredDetailById")]
        public async Task<IActionResult> GetProductRequiredDetailById(string Id)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _productService.GetProductRequiredDetailById(Id, userid, companyid);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }
        #endregion

    }
}
