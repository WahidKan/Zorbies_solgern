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
    [Route("api/Loanterm")]
    public class LoanTermController : Controller
    {
        
        private ILoanTermService _loanTermService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public LoanTermController(ILoanTermService loanTermService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _loanTermService = loanTermService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        [HttpGet]
         [Authorize]
        [Route("GetLoanTermList")]
        public IActionResult GetLoanTermList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
               long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _loanTermService.GetLoanTermList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
                
                    return Ok(data);
               
                   
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
          

        }
        [HttpGet]
        [Route("GetBankDll")]
        [Authorize]
        public List<MasterItems> GetBankDll()
        {
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _loanTermService.GetBankDll();

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
        [HttpPost]
        [Authorize]
        [Route("SaveLoan")]
        public IActionResult Save([FromBody] LoanTermModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            // var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {
                var data = _loanTermService.Save(model);
                if (model.id == null || model.id== Guid.Empty)
                {
                    result.ResponseMessage = "Loan term has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Loan term has been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }
        [Route("GetLoanTermById")]
        [HttpGet]
        [Authorize]
        public LoanTermModel GetLoanTermById(string Id)
        {
            var data = _loanTermService.GetLoanTermById(Id);
            if (data != null)
            {
                return data;
            }
            else
            {
                return new LoanTermModel();
            }
        }
        [Route("DeleteLoanTermById")]
        [HttpGet]
        [Authorize]
        public int DeleteLoanTermById(string id)
        {
            try
            {
               var data = _loanTermService.DeleteLoanTermById(id);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }
    }
}
