using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using authorizeLibrary;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/opportunity")]
    public class OpportunityController : Controller
    {
        private IOpportunityService _opportunityService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly SolgenDbContext _dbContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? userID
        {
            get
            {
                string user = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                return !string.IsNullOrEmpty(user) ? Guid.Parse(user) : Guid.Empty;
            }
        }

        private readonly UserManager<ApplicationUser> _userManager;

        public OpportunityController(IOpportunityService opportunityService, ICommonService commonService, IHttpContextAccessor httpContext, UserManager<ApplicationUser> userManager, SolgenDbContext dbContext)
        {
            _opportunityService = opportunityService;
            _commonService = commonService;
            _httpContext = httpContext;
            _userManager = userManager;
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Authorize]
        [Route("GetTypeOnBaseType")]
        public async Task<IActionResult> GetTypeOnBaseType(string SerchText = "", long length = 0, long ID = 0, string Type = "")
        {
            var result = _opportunityService.GetTypeOnBaseType(CompanyID, SerchText, length, ID, Type);
            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityview")]
        public IActionResult GetOpportunityview(long opid, int stageid, Guid userid, int CompanyID)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityview(opid, stageid, userid, CompanyID);
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
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                list = _opportunityService.getopportunitystage(opid, userid, CompanyID);
                return Ok(list);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetOpprtunityProductsList")]
        public async Task<IActionResult> GetOpprtunityProductsList(long opportunityId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var UserID = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var result = await _opportunityService.GetOpprtunityProductsList(opportunityId, sortColumn, sortDir, pageIndex, pageSize, CompanyID, UserID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetSendToLoanHomiDetail")]
        public async Task<IActionResult> GetSendToLoanHomiDetail(long opportunityId)
        {
            try
            {
                var UserID = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var result = await _opportunityService.GetSendToLoanHomiDetail(opportunityId, "", "", 1, 10, CompanyID, UserID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("GenerateLoanApplication")]
        public async Task<IActionResult> CreateLoanApplicationFromOpportunity([FromBody] SendLoanHomiDetailModel model)
        {
            try
            {
                DbConnection connection = _dbContext.Database.GetDbConnection();
                long company = 0;
                string user = null;
                var host = HttpContext.Request?.Host;
                string SolgenApiUrl1 = null;
                string domainurl = null;
                string tokenApp = model.AuthToken;
                HttpResponseMessage authResponse = null;
                if (host.HasValue)
                {
                    if (host?.Value == "localhost:8530")
                    {
                        SolgenApiUrl1 = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationLocalLink"];
                        domainurl = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationLocalDomainLink"];
                    }
                    else
                    {
                        SolgenApiUrl1 = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationStageLink"];
                        domainurl = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationStageDomainLink"];
                    }
                }
                else
                {
                    SolgenApiUrl1 = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationStageLink"];
                    domainurl = CommonSettings.AppSetting["CommonSettings:GenerateLoanApplicationStageDomainLink"];
                }

                var LoanHomiLoginId = CommonSettings.AppSetting["CommonSettings:LoanHomiLoginId"];
                var LoanHomiLoginPass = CommonSettings.AppSetting["CommonSettings:LoanHomiLoginPass"];
                var client = new HttpClient();
                var obj = JsonConvert.DeserializeObject<OpportunitySyncSF>(model.FormJsonData);

                //string conn = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
                //SqlConnection con = new SqlConnection(Conn);
                try
                {
                    if (string.IsNullOrEmpty(tokenApp))
                    {
                        string authUrl = SolgenApiUrl1 + "/Account/LoginForLoan?id=" + obj.OppOwnerId;
                        client.DefaultRequestHeaders.Connection.Add("keep-alive");
                        //var payload = new StringContent(JsonConvert.SerializeObject(new
                        //{
                        //    userName = LoanHomiLoginId,
                        //    password = LoanHomiLoginPass,
                        //    rememberMe = false,
                        //    browser = "",
                        //    os = ""
                        //}));
                        //payload.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/json");
                        authResponse = await client.GetAsync(authUrl);
                        var contents = await authResponse.Content.ReadAsStringAsync();
                        var returnobj = JsonConvert.DeserializeObject(Convert.ToString(contents));
                        tokenApp = Convert.ToString(JObject.Parse(Convert.ToString(returnobj))["token"]);
                    }
                    if (CompanyID > 0)
                    {
                        obj.CompanyId = CompanyID;
                    }
                    client = new HttpClient();
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                    client.DefaultRequestHeaders.Connection.Add("keep-alive");
                    string CheckEmailNotExistInOthersTypeAccountUrl = SolgenApiUrl1 + "/lead/CheckEmailNotExistInOthersTypeAccount?email=" + obj.Email;
                    var CheckEmailNotExistResponse = await client.GetAsync(CheckEmailNotExistInOthersTypeAccountUrl);
                    var CheckEmailNotExistcontents2 = await CheckEmailNotExistResponse.Content.ReadAsStringAsync();
                    if (CheckEmailNotExistcontents2.ToLower() == "true")
                    {
                        return Ok(new ReturnResult { Code = "Failure", StatusCode = "Email already associated with other User Type. Please use different Email." });
                    }

                    #region Save information in database
                    ReturnResult ReturnResult = new ReturnResult();
                    try
                    {
                        
                        if (userID == null || Guid.Empty == userID)
                        {
                            user = obj.OppOwnerId;
                        }
                        else
                        {
                            user = userID.ToString();
                        }
                        if (CompanyID == 0)
                        {
                            company = obj.CompanyId;
                        }
                        else
                        {
                            company = CompanyID;
                        }
                        connection.Open();
                        var jsonstring = Newtonsoft.Json.JsonConvert.SerializeObject(obj);

                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@json", jsonstring);
                        parameters.Add("@createdby", user);
                        parameters.Add("@companyid", company);
                        parameters.Add("@domainUrl", domainurl);
                        //   parameters.AddTable("@SolgenContact", "dbo.SolgenContact", jsonstring);
                        var data = connection.QueryFirstOrDefault<string>("sp_solgen_SFOpportunitySync",
                        parameters, commandType: System.Data.CommandType.StoredProcedure, commandTimeout: 0);

                        var InsertLoanProductResult = data.ToString();
                        ReturnResult = JsonConvert.DeserializeObject<ReturnResult>(InsertLoanProductResult);
                    }
                    catch (Exception ex)
                    {
                        LogSave(new LogModel()
                        {
                            LogId = Guid.NewGuid(),
                            LogType = "Information",
                            LogShortMessage = String.Concat("Save information in database:  ", obj.OpportunityId),
                            LogLongMessage = ex.Message,
                            LogIpAddress = IPAddress,
                            LogPageUrl = " ",
                            LogReferrerUrl = string.IsNullOrEmpty(HttpContext.Request.Headers["Referer"]) ? "" : HttpContext.Request.Headers["Referer"].ToString(),
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.Now
                        });
                    }
                    finally
                    {
                        connection.Close();
                    }
                    #endregion

                    if (ReturnResult.Code != "Failure")
                    {
                        if (tokenApp != null || (authResponse != null && authResponse.IsSuccessStatusCode))
                        {
                            #region GetCreditBuearuList
                            try
                            {
                                string creditScoreUrl = SolgenApiUrl1 + "/CreditBureau/GetCreditBuearuList";

                                client = new HttpClient();
                                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                                client.DefaultRequestHeaders.Connection.Add("keep-alive");

                                var creditScoreResponse = await client.GetAsync(creditScoreUrl);
                                var contents2 = await creditScoreResponse.Content.ReadAsStringAsync();

                                var items = JsonConvert.DeserializeObject<List<Bureau>>(contents2);
                                string LoanappUrl = SolgenApiUrl1 + "/CreditScore/PullCreditScoreData/" + ReturnResult.LoanAppAutoId + "/applicants/All/bureau/" + items.FirstOrDefault(b => b.BureauName == "Equifax").Id;
                                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                                client.DefaultRequestHeaders.Connection.Add("keep-alive");

                                var creditScoreResponse2 = await client.GetAsync(LoanappUrl);
                                var contents12 = await creditScoreResponse2.Content.ReadAsStringAsync();
                                var myDeserializedClass = JsonConvert.DeserializeObject<List<CreditScoreResponseRoot>>(contents12);
                                if (myDeserializedClass[0].error != null)
                                {
                                    ReturnResult.creditScore = "FICO Score for Primary applicant not returned. Please contact Equifax support.";
                                }
                                else
                                {
                                    if (myDeserializedClass.Count > 0)
                                    {
                                        ReturnResult.creditScore = myDeserializedClass[0].creditScore.ToString(); ;
                                        ReturnResult.miniumCreditScore = myDeserializedClass[0].miniumCreditScore.ToString();
                                        ReturnResult.creditScoreCategory = myDeserializedClass[0].creditScoreCategory.ToString();
                                    }
                                    if (myDeserializedClass.Count > 1)
                                    {
                                        ReturnResult.creditScore2 = myDeserializedClass[1].creditScore.ToString(); ;
                                        ReturnResult.miniumCreditScore2 = myDeserializedClass[1].miniumCreditScore.ToString();
                                        ReturnResult.creditScoreCategory2 = myDeserializedClass[1].creditScoreCategory.ToString();
                                        if (myDeserializedClass[1].creditScore != null && myDeserializedClass[0].creditScore != null && myDeserializedClass[1].creditScore > myDeserializedClass[0].creditScore)
                                        { ReturnResult.creditScore = myDeserializedClass[1].creditScore.ToString(); ; }
                                    }
                                }


                                #region ExecuteRuleEngineTarget
                                try
                                {
                                    string ExecuteRuleEngineTargetUrl = SolgenApiUrl1 + "/RuleEngine/ExecuteRuleEngineTarget";

                                    client = new HttpClient();
                                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                                    client.DefaultRequestHeaders.Connection.Add("keep-alive");
                                    var ExecuteRuleEngineTarget = new StringContent(JsonConvert.SerializeObject(new RuleEngine { LoanApplicationId = ReturnResult.LoanAppAutoId, EventCode = "ON_CREATE_AND_UPDATE", ConnectionId = null }));

                                    ExecuteRuleEngineTarget.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/json");
                                    var RuleEngineResponse = await client.PostAsync(ExecuteRuleEngineTargetUrl, ExecuteRuleEngineTarget);
                                    var RuleEngineResponsecontents2 = await RuleEngineResponse.Content.ReadAsStringAsync();
                                    ReturnResult.applicationStatus = Convert.ToString(JObject.Parse(Convert.ToString(RuleEngineResponsecontents2))["Status"]);
                                }
                                catch (Exception ex)
                                {
                                    LogSave(new LogModel()
                                    {
                                        LogId = Guid.NewGuid(),
                                        LogType = "Information",
                                        LogShortMessage = String.Concat("ExecuteRuleEngineTarget:  ", obj.OpportunityId),
                                        LogLongMessage = ex.Message,
                                        LogIpAddress = IPAddress,
                                        LogPageUrl = " ",
                                        LogReferrerUrl = string.IsNullOrEmpty(HttpContext.Request.Headers["Referer"]) ? "" : HttpContext.Request.Headers["Referer"].ToString(),
                                        LogCreatedBy = Guid.NewGuid(),
                                        LogCreatedOn = DateTime.Now
                                    });
                                }
                                finally
                                {

                                }
                                #endregion

                                #region GetApplicantInfo

                                try
                                {
                                    if (ReturnResult.applicationStatus.ToLower() != "failed")
                                    {
                                        client = new HttpClient();
                                        string IncomeVerificationUrl = SolgenApiUrl1 + "/loan/GetApplicantInfo?applicationid=" + ReturnResult.LoanAppAutoId;
                                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                                        client.DefaultRequestHeaders.Connection.Add("keep-alive");

                                        var IncomeVerificationResponse = await client.GetAsync(IncomeVerificationUrl);
                                        var IncomeVerificationResponseFinal = await IncomeVerificationResponse.Content.ReadAsStringAsync();
                                        var avdds = JsonConvert.DeserializeObject<List<ApplicantInfoResult>>(IncomeVerificationResponseFinal);
                                        if (avdds.Count() > 0)
                                        {
                                            ReturnResult.IncomeVerificationValue = JsonConvert.DeserializeObject<List<ApplicantInfoResult>>(IncomeVerificationResponseFinal)[0].IncomeVerificationValue;
                                            if (ReturnResult.IncomeVerificationValue == null) { ReturnResult.IncomeVerificationValue = "No"; }
                                        }
                                    }
                                }
                                catch (Exception ex)
                                {
                                    LogSave(new LogModel()
                                    {
                                        LogId = Guid.NewGuid(),
                                        LogType = "Information",
                                        LogShortMessage = String.Concat("GetApplicantInfo:  ", obj.OpportunityId),
                                        LogLongMessage = ex.Message,
                                        LogIpAddress = IPAddress,
                                        LogPageUrl = " ",
                                        LogReferrerUrl = string.IsNullOrEmpty(HttpContext.Request.Headers["Referer"]) ? "" : HttpContext.Request.Headers["Referer"].ToString(),
                                        LogCreatedBy = Guid.NewGuid(),
                                        LogCreatedOn = DateTime.Now
                                    });
                                }
                                finally
                                {

                                }

                                #endregion

                                #region WebMerge/GetBankIdByLoanApplicationId
                                try
                                {
                                    if (ReturnResult.applicationStatus.ToLower() != "failed")
                                    {
                                        string GetBankIdApiUrl = SolgenApiUrl1 + "/WebMerge/GetBankIdByLoanApplicationId/" + ReturnResult.LoanAppAutoId;
                                        client = new HttpClient();
                                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                                        client.DefaultRequestHeaders.Connection.Add("keep-alive");
                                        var GetBankIdResponse = await client.GetAsync(GetBankIdApiUrl);
                                        ReturnResult.bankid = await GetBankIdResponse.Content.ReadAsStringAsync();
                                        // webmergecall(ReturnResult, tokenApp);


                                        string GetBankDocumentsApiUrl = SolgenApiUrl1 + "/WebMerge/MergeWebmergeMapping/" + ReturnResult.LoanAppAutoId + '/' + ReturnResult.bankid + "/false/null";// For Live not required + " /false";
                                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                                        client.DefaultRequestHeaders.Connection.Add("keep-alive");
                                        var GetBankDocumentsResponse = await client.GetAsync(GetBankDocumentsApiUrl);
                                        var GetBankDocumentsResponseString = await GetBankDocumentsResponse.Content.ReadAsStringAsync();
                                        if (Convert.ToString(JObject.Parse(Convert.ToString(GetBankDocumentsResponseString))["statusCode"]) == "500")
                                        {
                                            string resp = Convert.ToString(JObject.Parse(Convert.ToString(GetBankDocumentsResponseString))["responseMessage"]);
                                        }
                                    }
                                }
                                catch (Exception ex)
                                {
                                    LogSave(new LogModel()
                                    {
                                        LogId = Guid.NewGuid(),
                                        LogType = "Information",
                                        LogShortMessage = String.Concat("WebMerge/GetBankIdByLoanApplicationId:  ", obj.OpportunityId),
                                        LogLongMessage = ex.Message,
                                        LogIpAddress = IPAddress,
                                        LogPageUrl = " ",
                                        LogReferrerUrl = string.IsNullOrEmpty(HttpContext.Request.Headers["Referer"]) ? "" : HttpContext.Request.Headers["Referer"].ToString(),
                                        LogCreatedBy = Guid.NewGuid(),
                                        LogCreatedOn = DateTime.Now
                                    });
                                }
                                finally
                                {

                                }
                                #endregion

                                #region GetMandatoryDocumentsByLoanId
                                try
                                {
                                    string MandatoryDocumentsApiUrl = SolgenApiUrl1 + "/Lead/GetMandatoryDocumentsByLoanId/" + ReturnResult.LoanAppAutoId;
                                    client = new HttpClient();
                                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenApp);
                                    client.DefaultRequestHeaders.Connection.Add("keep-alive");
                                    var MandatoryDocumentsResponse = await client.GetAsync(MandatoryDocumentsApiUrl);
                                    var MandatoryDocumentscontents = await MandatoryDocumentsResponse.Content.ReadAsStringAsync();
                                    var MandatoryDocumentscontentsitems = JsonConvert.DeserializeObject<List<MandatoryDocuments>>(MandatoryDocumentscontents);
                                    ReturnResult.MandatoryDocuments = MandatoryDocumentscontentsitems;
                                }
                                catch (Exception ex)
                                {
                                    LogSave(new LogModel()
                                    {
                                        LogId = Guid.NewGuid(),
                                        LogType = "Information",
                                        LogShortMessage = String.Concat("GetMandatoryDocumentsByLoanId:  ", obj.OpportunityId),
                                        LogLongMessage = ex.Message,
                                        LogIpAddress = IPAddress,
                                        LogPageUrl = " ",
                                        LogReferrerUrl = string.IsNullOrEmpty(HttpContext.Request.Headers["Referer"]) ? "" : HttpContext.Request.Headers["Referer"].ToString(),
                                        LogCreatedBy = Guid.NewGuid(),
                                        LogCreatedOn = DateTime.Now
                                    });
                                }
                                finally
                                {

                                }
                                #endregion

                            }
                            catch (Exception ex)
                            {
                                LogSave(new LogModel()
                                {
                                    LogId = Guid.NewGuid(),
                                    LogType = "Information",
                                    LogShortMessage = String.Concat("GetCreditBuearuList:  ", obj.OpportunityId),
                                    LogLongMessage = ex.Message,
                                    LogIpAddress = IPAddress,
                                    LogPageUrl = " ",
                                    LogReferrerUrl = string.IsNullOrEmpty(HttpContext.Request.Headers["Referer"]) ? "" : HttpContext.Request.Headers["Referer"].ToString(),
                                    LogCreatedBy = Guid.NewGuid(),
                                    LogCreatedOn = DateTime.Now
                                });
                            }
                            finally
                            {

                            }
                            #endregion
                        }
                    }

                    if (string.IsNullOrEmpty(ReturnResult.creditScore))
                    {
                        ReturnResult.applicationStatus = "failed";
                    }
                    ReturnResult.CompanyId = company;
                    ReturnResult.UserId = user;

                    return Ok(ReturnResult);
                }
                catch (Exception ex)
                {
                    LogSave(new LogModel()
                    {
                        LogId = Guid.NewGuid(),
                        LogType = "Information",
                        LogShortMessage = String.Concat("Add SF Opportunity to Loanhomi Merge:  ", obj.OpportunityId),
                        LogLongMessage = ex.Message,
                        LogIpAddress = IPAddress,
                        LogPageUrl = " ",
                        LogReferrerUrl = string.IsNullOrEmpty(HttpContext.Request.Headers["Referer"]) ? "" : HttpContext.Request.Headers["Referer"].ToString(),
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.Now
                    });
                    return null;
                }
                //return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SendLoanHomiDetail")]
        public async Task<IActionResult> SendLoanHomiDetail([FromBody] SendLoanHomiDetailModel model)
        {
            try
            {
                // http://45.35.44.173:8081/Home/UpdateServiceAppointment?SaId=ContractId&AssignTo=name&AssignToEmail=email [FromBody]

                SalesforceHttpClientHelper httpClientHelper = SalesforceHttpClientHelper.Create();
                var response = await httpClientHelper.Post($"Home/OpportunitySync", model.FormJsonData);
                var contents = response.Content.ReadAsStringAsync().Result;
                return Ok(contents);
            }
            catch (Exception ex)
            {

                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }


        [HttpPost]
        [Route("StandAloneSendLoanHomiDetail")]
        public async Task<IActionResult> StandAloneSendLoanHomiDetail([FromBody] SendLoanHomiDetailModel model)
        {
            try
            {
                // http://45.35.44.173:8081/Home/UpdateServiceAppointment?SaId=ContractId&AssignTo=name&AssignToEmail=email [FromBody]

                SalesforceHttpClientHelper httpClientHelper = SalesforceHttpClientHelper.Create();
                var response = await httpClientHelper.Post($"Home/OpportunitySync", model.FormJsonData);
                var contents = response.Content.ReadAsStringAsync().Result;
                return Ok(contents);
            }
            catch (Exception ex)
            {

                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("CheckExistingEmailAddress")]
        public IActionResult CheckExistingEmailAddress(string email)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var data = _opportunityService.CheckExistingEmailAddress(email, companyID);

            if (data != "0")
            {
                resultResponseModel.StatusCode = 202;
                resultResponseModel.ResponseMessage = "This email id is already in use.";
                resultResponseModel.Result = data;
                return Ok(resultResponseModel);
            }
            return Ok(resultResponseModel);
        }

        [HttpGet]
        [Route("GetInstallerRepNameList")]
        public IActionResult GetInstallerRepNameList(string salesRepName, long accountId, long companyId)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                //long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                lst = _opportunityService.GetInstallerRepNameList(salesRepName, accountId, companyId);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetSalesRepNameList")]
        public IActionResult GetSalesRepNameList(string salesRepName, long accountId, long companyId)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                //long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                lst = _opportunityService.GetSalesRepNameList(salesRepName, accountId, companyId);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetOpprtunityWorkOrderList")]
        public async Task<IActionResult> GetOpprtunityWorkOrderList(long opportunityId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var UserID = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var result = await _opportunityService.GetOpprtunityWorkOrderList(opportunityId, sortColumn, sortDir, pageIndex, pageSize, CompanyID, UserID);

                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }

        [HttpGet]
        [Authorize]
        [Route("GetOpprtunityContractList")]
        public async Task<IActionResult> GetOpprtunityContractList(long opportunityId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var UserID = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var result = await _opportunityService.GetOpprtunityContractList(opportunityId, sortColumn, sortDir, pageIndex, pageSize, CompanyID, UserID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }
        [HttpGet]
        [Authorize]
        [Route("GetOpprtunityAccountsList")]
        public async Task<IActionResult> GetOpprtunityAccountsList(long opportunityId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var UserID = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var result = await _opportunityService.GetOpprtunityAccountsList(opportunityId, sortColumn, sortDir, pageIndex, pageSize, CompanyID, UserID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }

        }

        [HttpGet]
        [Authorize]
        [Route("GetOpprtunityProposalsList")]
        public async Task<IActionResult> GetOpprtunityProposalsList(long opportunityId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var UserID = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var result = await _opportunityService.GetOpprtunityProposalsList(opportunityId, sortColumn, sortDir, pageIndex, pageSize, CompanyID, UserID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }

        [HttpGet]
        [Route("GetUtilityCompanyDll")]
        public List<MasterItems> GetUtilityCompanyDll(string id, int length, string serchText)
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if (id == "null")
            { id = "0"; }

            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _opportunityService.GetUtilityCompanyDll(userid, companyid, id, length, serchText);

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
        //  [Authorize]
        [Route("GetOpportunityviewTabData")]
        public IActionResult GetOpportunityviewTabData(long opid, Guid userid, int CompanyID)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityviewTabData(opid, userid, CompanyID);
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
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityViewProposal(opid, userid, CompanyID);
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
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityViewTask(opid, userid, CompanyID);
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
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityViewWorkorder(opid, userid, CompanyID);
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
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityViewProduct(opid, userid, CompanyID);
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
            userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var data = _opportunityService.GetAppointmentbyopportunityId(opid, userid, CompanyID);
            return Ok(data);
        }
        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewAccData")]
        public IActionResult GetOpportunityViewAccData(long opid, Guid userid, int CompanyID)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityViewAccData(opid, userid, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [AuthorizeFilter]
        [Route("GetOpportunityList")]
        public async Task<IActionResult> GetOpportunityList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords, string viewType = "", string groupBy = "")
        {
            try
            {
                if (userId == null)
                    userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                if (companyId == 0)
                    companyId = CompanyID;
                var lst = await _opportunityService.GetOpportunityList(listFilter, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, viewType, groupBy, isAllRecords);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("UpdateOpportunityStage")]
        public IActionResult UpdateOpportunityStage(long stageId, long opportunityId)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.UpdateOpportunityStage(stageId, opportunityId, companyId, userId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //  [Authorize]
        [Route("GetOpportunityViewFileupload")]
        public IActionResult GetOpportunityViewFileupload(long opid, Guid userid, int CompanyID)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityViewFileupload(opid, userid, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetOpportunityViewcontractlist")]
        public IActionResult GetOpportunityViewcontractlist(long opid, Guid userid, int CompanyID)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetOpportunityViewcontractlist(opid, userid, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }



        [HttpGet]
        [Authorize]
        [Route("updateStage")]
        public IActionResult updateStage(long opid, long substageid)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.updateStage(opid, substageid, userid, companyid);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetOpportunityById")]
        public async Task<IActionResult> GetOpportunityById(string id, string moduleName, string submoduleName, Guid user, long company)
        {
            var result = await _opportunityService.GetOpportunityById(id, moduleName, submoduleName, user, company);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetOppDataById/{opportunityId}")]
        public async Task<IActionResult> GetOppDataById(long opportunityId)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = await _opportunityService.GetOppDataById(opportunityId, companyid, userid);
                var result = JsonConvert.DeserializeObject<dynamic>(data);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Authorize]
        [Route("SaveRequestDesignOpportunity")]
        public IActionResult SaveRequestDesignOpportunity([FromBody] RequestDesignModel model)
        {
            //model.RequestDate = model.RequestDate.AddHours(model.FromTime.Hours);
            //model.RequestDate = model.RequestDate.AddMinutes(model.FromTime.Minutes);
            ResultResponseModel result = new ResultResponseModel();
            var ab = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            model.CreatedBy = ab;
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID;
                var data = _opportunityService.SaveRequestDesignOpportunity(model);
                if (data != 0)
                {
                    result.StatusCode = 200;
                    if (model.isredisgn == true)
                    {
                        result.ResponseMessage = "Request Re Design  has been added successfully.";
                    }
                    else
                    {
                        result.ResponseMessage = "Request Design  has been added successfully.";
                    }
                }
                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpGet]
        [Authorize]
        [Route("GetRequestDesignOpportunity")]
        public IActionResult GetRequestDesignOpportunity(long opid, Guid userid, int CompanyID)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetRequestDesignOpportunity(opid, userid, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }




        [HttpGet]
        [Authorize]
        [Route("GetOpportunityProposalList")]
        public IActionResult GetOpportunityProposalList(long id, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _opportunityService.GetOpportunityProposalList(id, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }

        [HttpGet]
        [Authorize]
        [Route("SendAutomaticContract")]
        public IActionResult SendAutomaticContract(long opid, Guid userid, int CompanyID)
        {
            try
            {
                ResultResponseModel result = new ResultResponseModel();
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.SendAutomaticContract(opid, userid, CompanyID);
                if (lst == "1")
                {
                    result.ResponseMessage = "Automatic Contract updated successfully.";
                    result.StatusCode = 200;
                    return Ok(result);
                }
                {
                    result.ResponseMessage = lst;
                    result.StatusCode = 201;
                }
                if (lst == "No Primary Proposal available for this opportunity")
                {
                    result.ResponseMessage = lst;
                    result.StatusCode = 1;
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SaveUtility_Proposal_Design_Information")]
        public async Task<IActionResult> SaveUtility_Proposal_Design_Information([FromBody] SaveUtilityModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                string data = _opportunityService.SaveUtility_Proposal_Design_Information(model, companyID);


                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Data updated successfully.";
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
        [HttpGet]
        [Authorize]
        [Route("GetOpportunityviewFileList")]
        public async Task<IActionResult> GetOpportunityviewFileList(long id, bool isaccount, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var result = await _opportunityService.GetOpportunityviewFileList(id, 0, isaccount, sortColumn, sortDir, pageIndex, pageSize, userid, CompanyID);
                enumFileFolder enumfoldername = enumFileFolder.leadViewData;
                //string fileUrl = CommonFunctions.GetFileLink(model.FileName, "image", enumfoldername);
                //foreach (var item in result.Data)
                //{
                //    item.filenew = CommonFunctions.GetFileLink(item.FileName, "image", enumfoldername);
                //    item.filenew = item.filenew.Replace("wwwroot", "");
                //}
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong. Please contact with administrator.");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SaveWelcomecallNoteOpportunity")]
        public async Task<IActionResult> SaveWelcomecallNoteOpportunity([FromBody] welcomeNoteOpportunityModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                model.companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                string data = _opportunityService.SaveWelcomecallNoteOpportunity(model);


                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.ResponseMessage = "Data updated successfully.";
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
        [HttpGet]
        [Authorize]
        [Route("GetWelcomecallNoteOpportunity")]
        public IActionResult GetWelcomecallNoteOpportunity(long opid, Guid userid, int CompanyID)
        {
            try
            {
                userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                CompanyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _opportunityService.GetWelcomecallNoteOpportunity(opid, userid, CompanyID);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("CheckLoanAssociate")]
        public IActionResult CheckLoanAssociate(string id)
        {
            bool lst = new bool();
            try
            {
                long companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                //long companyId = 1018;
                lst = _opportunityService.CheckLoanAssociate(companyId, long.Parse(id));


                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        public Guid LogSave(LogModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (connection.State == ConnectionState.Closed)
                {
                    connection.Open();
                }

                id = connection.ExecuteScalar<Guid>("sp_solgen_SaveLog",
                    param: new
                    {
                        LogId = model.LogId,
                        LogType = model.LogType,
                        LogShortMessage = model.LogShortMessage,
                        LogLongMessage = model.LogLongMessage,
                        LogIpAddress = model.LogIpAddress,
                        LogPageUrl = model.LogPageUrl,
                        LogReferrerUrl = model.LogReferrerUrl,
                        LogCreatedBy = model.LogCreatedBy,
                        LogCreatedOn = model.LogCreatedOn,
                    },
                    commandType: CommandType.StoredProcedure);

                return id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

    }


    //[HttpGet]
    //[Authorize]
    //[Route("updateStage")]
    //public IActionResult updateStage(long opid,long substageid)
    //{
    //   // ResultResponseModel result = new ResultResponseModel();
    //    Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
    //   long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
    //    try
    //    {
    //        var data = _opportunityService.updateStage(model);
    //        //if (model.id == null || model.id == Guid.Empty)
    //        // {
    //        result.ResponseMessage = "Note has been added successfully.";
    //        // }
    //        //else
    //        //{
    //        //    result.ResponseMessage = "Loan term has been updated successfully.";
    //        //}
    //        result.StatusCode = 200;

    //        return Ok(result);

    //    }
    //    catch (Exception)
    //    {

    //        throw;
    //    }

    //}

}

