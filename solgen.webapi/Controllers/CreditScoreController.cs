using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.HubConfig;
using Solgen.WebApi.Models.Equifax;
using Solgen.WebApi.Models.Equifax.FileStatus.Response;
using Solgen.WebApi.Services;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/CreditScore")]
    public class CreditScoreController : Controller
    {
        private readonly ILoanApplicationService _loanService;
        private readonly IRealTimeService _realTimeService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IPullCreditScoreService _pullCreditScoreService;
        private readonly ILoanApplicationService _loanApplicationService;
        private readonly ICreditScoreService _creditScoreService;
        private readonly ICreditScoreRawDataService _creditScoreRawDataService;
        private readonly ICreditBureauHistoryService _creditBureauHistoryService;
        private readonly ICreditBureauMasterService _creditBureauMasterService;
        private readonly IWebMergeService _webMergeService;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IConfiguration _config;

        public ILogService logService { get; }

        public CreditScoreController(ICommonService commonService, IHttpContextAccessor httpContext,
            IPullCreditScoreService pullCreditScoreService, ILoanApplicationService loanApplicationService,
            ICreditScoreService creditScoreService, ICreditScoreRawDataService creditScoreRawDataService,
            ICreditBureauHistoryService creditBureauHistoryService, ICreditBureauMasterService creditBureauMasterService,
            ILoanApplicationService loanService, IRealTimeService realTimeService, ILogService logService, IWebMergeService webMergeService, 
            IEmailSettingsService emailSettingsService,
            IConfiguration config)
        {
            _commonService = commonService;
            _httpContext = httpContext;
            _pullCreditScoreService = pullCreditScoreService;
            _loanApplicationService = loanApplicationService;
            _creditScoreService = creditScoreService;
            _creditScoreRawDataService = creditScoreRawDataService;
            _creditBureauHistoryService = creditBureauHistoryService;
            _creditBureauMasterService = creditBureauMasterService;
            _loanService = loanService;
            _realTimeService = realTimeService;
            _webMergeService = webMergeService;
            this.logService = logService;
            _emailSettingsService = emailSettingsService;
            _config = config;
        }

        [HttpGet]
        [Authorize]
        [Route("GetCreditScoreReport/{loanApplicationId}/applicants/{applicant}/bureau/{BureauId}")]
        public async Task<IActionResult> GetCreditScoreReport(long loanApplicationId, string applicant, long BureauId, bool rawData = false)
        {
            string data = "";
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                if (applicant == "All")
                {
                    await _creditScoreRawDataService.GetRawData(loanApplicationId, "Primary", BureauId);
                    await _creditScoreRawDataService.GetRawData(loanApplicationId, "Co-Applicant", BureauId);
                    //Actually do nothing here
                }
                else
                {
                    string temp = await _creditScoreRawDataService.GetRawData(loanApplicationId, applicant, BureauId);
                    if (!string.IsNullOrEmpty(temp))
                    {
                        if(rawData)
                        {
                            return Ok(temp);
                        }    
                        data = await _pullCreditScoreService.PopulateJsonToText(temp);
                    }
                    else
                    {
                        data = "N/A";
                    }
                }

                return Ok(data);

            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = String.Concat("Exception getting Credit Score Report for Loan Application : ", loanApplicationId),
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("PullCreditScoreData/{loanApplicationId}/applicants/{applicants}/bureau/{BureauId}")]
        /*! 
        * \brief   Pull Credit Score Data
        * \details Pull Credit Score data from Credit Score Bureau
        * \author  Rajbir Singh 
        * \date    26 Oct 2020
        * \version 1.0    
        */
        public async Task<IActionResult> PullCreditScoreData(long loanApplicationId, string applicants, long BureauId)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                List<ApplicationStatusResponse> CreditScore = new List<ApplicationStatusResponse>();
                List<emailDataModel> emaildata = new List<emailDataModel>();
                emailDataModel emaildata1 = new emailDataModel();

                if (applicants == "All")
                {
                    var applicantString = await _loanApplicationService.GetApplicantInfo(userid, companyid, loanApplicationId);
                    if (applicantString != null)
                    {
                        var credit = await FetchCreditScore(applicantString, loanApplicationId, userid, companyid, "Primary", BureauId);
                        CreditScore.Add(credit);
                    }
                    var coApplicantString = await _loanApplicationService.GetCoApplicantInfo(userid, companyid, loanApplicationId);
                    if (coApplicantString != null)
                    {
                        var credit = await FetchCreditScore(coApplicantString, loanApplicationId, userid, companyid, "Co-Applicant", BureauId);
                        CreditScore.Add(credit);
                    }
                }
                else
                {
                    string applicantString = null;
                    if (applicants == "Primary")
                    {
                        applicantString = await _loanApplicationService.GetApplicantInfo(userid, companyid, loanApplicationId);
                    }
                    else if(applicants == "Co-Applicant")
                    {
                        applicantString = await _loanApplicationService.GetCoApplicantInfo(userid, companyid, loanApplicationId);
                    }

                    if (applicantString != null)
                    {
                        var credit = await FetchCreditScore(applicantString, loanApplicationId, userid, companyid, applicants, BureauId);
                        CreditScore.Add(credit);
                    }
                }

                string error = "";

                if(CreditScore.Count == 1)
                {
                    if (CreditScore[0].creditScore == null)
                    {
                        error += $"FICO Score for {applicants} applicant not returned. Please contact Equifax support.{Environment.NewLine}";
                    }

                    if(CreditScore[0].creditScore == 0)
                    {
                        //error += $"No qualifying accounts present. Marking credit score as 0.{Environment.NewLine}";
                    }

                    if (CreditScore[0].creditScore == -1)
                    {
                        error += $"First Name, Last Name, SSN, Date of Birth, City and State of {applicants} applicant is mandatory. Please verify the values are entered.{Environment.NewLine}";
                    }

                    if(CreditScore[0].creditScore == -2)
                    {
                        error += CreditScore[0].creditScoreCategory;
                    }

                    if (CreditScore[0].creditScore >= 670)
                    {
                        CreditScore[0].creditScoreCategory = "A+";
                    }
                    else
                    {
                        CreditScore[0].creditScoreCategory = "A";
                    }

                    CreditScore[0].status = "success";
                }

                if (CreditScore.Count == 2)
                {
                    //Primary
                    if (CreditScore[0].creditScore == null)
                    {
                        error += "FICO Score for Primary applicant not returned. Please contact Equifax support." + Environment.NewLine;
                    }

                    if (CreditScore[0].creditScore == 0)
                    {
                        //error += $"No qualifying accounts present. Marking credit score as 0 {Environment.NewLine}";
                    }

                    if (CreditScore[0].creditScore == -1)
                    {
                        error += "First Name, Last Name, SSN, Date of Birth, City and State of Primary applicant is mandatory. Please verify the values are entered." + Environment.NewLine;
                    }

                    if (CreditScore[0].creditScore == -2)
                    {
                        error += CreditScore[0].creditScoreCategory;
                    }

                    if (CreditScore[0].creditScore >= 670)
                    {
                        CreditScore[0].creditScoreCategory = "A+";
                    }
                    else
                    {
                        CreditScore[0].creditScoreCategory = "A";
                    }

                    CreditScore[0].status = "success";

                    //Co-Applicant
                    if (CreditScore[1].creditScore == null)
                    {
                        error += "FICO Score for co-applicant not returned. Please contact Equifax support." + Environment.NewLine;
                    }

                    if (CreditScore[1].creditScore == 0)
                    {
                        //error += $"No qualifying accounts present. Marking credit score as 0 {Environment.NewLine}";
                    }

                    if (CreditScore[1].creditScore == -1)
                    {
                        error += "First Name, Last Name, SSN, Date of Birth, City and State of co-applicant is mandatory. Please verify the values are entered." + Environment.NewLine;
                    }

                    if (CreditScore[1].creditScore == -2)
                    {
                        error += CreditScore[0].creditScoreCategory;
                    }

                    if (CreditScore[1].creditScore >= 670)
                    {
                        CreditScore[1].creditScoreCategory = "A+";
                    }
                    else
                    {
                        CreditScore[1].creditScoreCategory = "A";
                    }

                    CreditScore[1].status = "success";
                }

                if(!string.IsNullOrEmpty(error))
                {
                    return Ok(new { error = error });
                }

                if (CreditScore.Count == 1)
                {
                    if (CreditScore[0].needsAdminReview) //SEND NOTIFICATION
                    {
                        List<string> userIds = new List<string>();
                        dynamic userDET = JsonConvert.DeserializeObject<dynamic>(await _webMergeService.GetCompanyAdminByAppId(loanApplicationId.ToString(), companyid.ToString()));
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        string emailSubject = $"Credit Score Report of Primary applicant Needs Admin Review for Loan Application : {loanApplicationId}";
                        string emailBody = $"Credit Score Report of Primary applicant needs admin review because of:<br><ul><li>Subject SSN is blank</li></ul>";

                        if (userDET.Count > 0)
                        {
                            foreach (var usrVal in userDET)
                            {
                                userIds.Add(Convert.ToString(usrVal.AdminId));
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = Convert.ToString(usrVal.AdminId);
                                    strCcUser = Convert.ToString(usrVal.AdminId);
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? Convert.ToString(usrVal.AdminId) : string.Format(",{0}", Convert.ToString(usrVal.AdminId));
                                }
                                if (usrVal.EmailNotification == true)
                                {
                                    emaildata1 = new emailDataModel();
                                    emaildata1.name = string.Concat(usrVal.FirstName, usrVal.LastName);//(string.IsNullOrEmpty(emaildata.email)) ? string.Concat(usrVal.FirstName, usrVal.LastName) : string.Format(",{0}", string.Concat(usrVal.FirstName, usrVal.LastName));
                                    emaildata1.email = usrVal.Email;
                                    emaildata.Add(emaildata1);
                                }
                            }
                            
                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = emailSubject,
                                SubjectBody = emailBody,
                                RouteUrl = "loanApplication/Detail/" + loanApplicationId,
                                ObjectId = loanApplicationId.ToString(),
                                CreatedBy = strUserTo,
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(companyid),

                            };
                            await _realTimeService.SendNotification(notification);
                        }
                        try
                        {
                            if (emaildata != null)
                            {
                                Hashtable htbl = new Hashtable();
                                await _emailSettingsService.SendEmailWithNotificationToUsers(emaildata, htbl, emailSubject, emailBody, Convert.ToString(loanApplicationId), Guid.Parse(userid.ToString()), false, _config.GetSection("CommonSettings")["EmailNotification"], "LoanApplication", companyid.ToString());
                            }
                        }
                        catch
                        {
                            HttpContext.Session.Clear();
                        }

                    }
                }
                if (CreditScore.Count == 2)
                {
                    if (CreditScore[1].needsAdminReview) //SEND NOTIFICATION
                    {
                        List<string> userIds = new List<string>();
                        dynamic userDET = JsonConvert.DeserializeObject<dynamic>(await _webMergeService.GetCompanyAdminByAppId(loanApplicationId.ToString(), companyid.ToString()));
                        string strUserTo = string.Empty;
                        string strCcUser = string.Empty;
                        if (userDET.Count > 0)
                        {
                            foreach (var usrVal in userDET)
                            {
                                userIds.Add(Convert.ToString(usrVal.AdminId));
                                //strUserTo = usrVal.Id;

                                if (string.IsNullOrEmpty(strUserTo))
                                {
                                    strUserTo = Convert.ToString(usrVal.AdminId);
                                    strCcUser = Convert.ToString(usrVal.AdminId);
                                }
                                else
                                {
                                    strCcUser += (string.IsNullOrEmpty(strCcUser)) ? Convert.ToString(usrVal.AdminId) : string.Format(",{0}", Convert.ToString(usrVal.AdminId));
                                }
                            }

                            var notification = new NotificationSendModel
                            {
                                ToUser = null,
                                CcUser = (string.IsNullOrEmpty(strCcUser)) ? null : strCcUser.Split(','),
                                Subject = $"Credit Score Report of co-applicant Needs Admin Review for Loan Application : {loanApplicationId}",
                                SubjectBody = $"Credit Score Report of co-applicant needs admin review because of:<br><ul><li>Subject SSN is blank</li></ul>",
                                RouteUrl = "loanApplication/Detail/" + loanApplicationId,
                                ObjectId = loanApplicationId.ToString(),
                                CreatedBy = strUserTo,
                                UserIdList = userIds,
                                CompanyId = Convert.ToString(companyid),

                            };
                            await _realTimeService.SendNotification(notification);
                        }
                    }
                }
                return Ok(CreditScore.ToArray());

            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = String.Concat("Exception pulling Credit Score Report for Loan Application : ", loanApplicationId),
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("TestPullCreditScoreData/{loanApplicationId}/applicants/{applicants}/bureau/{BureauId}/Score/{Score}")]
        /*! 
        * \brief   Pull Credit Score Data
        * \details Pull Credit Score data from Credit Score Bureau
        * \author  Rajbir Singh 
        * \date    26 Oct 2020
        * \version 1.0    
        */
        public async Task<IActionResult> TestPullCreditScoreData(long loanApplicationId, string applicants, long BureauId, long Score)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                ApplicationStatusResponse CreditScore = new ApplicationStatusResponse();                

                dynamic applicant = null;

                if(applicants == "Primary")
                {
                    applicant = JsonConvert.DeserializeObject<dynamic>(await _loanApplicationService.GetApplicantInfo(userid, companyid, loanApplicationId));
                }
                else if(applicants == "Co-Applicant")
                {
                    applicant = JsonConvert.DeserializeObject<dynamic>(await _loanApplicationService.GetCoApplicantInfo(userid, companyid, loanApplicationId));
                }

                if (applicant != null)
                {
                    var applicantCreditScoreModel = new CreditScoreModel
                    {
                        LoanApplicationId = loanApplicationId,
                        ApplicantId = applicant.Id,
                        ApplicantType = applicants,
                        CreditScore = Score,
                        //CreditScoreCategory = CreditScoreCategory,
                        FrozenAccount = false,
                        CreditBureauId = BureauId,
                        StatusId = 1001,
                        CreatedOn = DateTime.UtcNow.ToString("MM/dd/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture),
                        CreatedBy = userid,
                        //ModifyDate = null,
                        //ModifyBy = null,
                        CompanyId = Convert.ToInt64(companyid),
                        IsSubmitted = true
                    };

                    var applicantCreditScoreData = JsonConvert.DeserializeObject<ApplicationStatusResponse>(await _creditScoreService.Save(JsonConvert.SerializeObject(applicantCreditScoreModel), userid, companyid));
                }

                CreditScore.creditScore = (int)Score;
                CreditScore.status = "success";

                return Ok(CreditScore);

            }
            catch (Exception ex)
            {
                return Ok(new { error = ex.Message });
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetCreditScoreData/{loanApplicationId}")]
        /*! 
        * \brief   Get Credit Score Data
        * \details Get Credit Score data from Credit Score Bureau
        * \author  Rajbir Singh 
        * \date    26 Oct 2020
        * \version 1.0    
        */
        public async Task<IActionResult> GetCreditScoreData(long loanApplicationId, string BureauId)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _creditScoreService.GetCreditScoreByLoanAppicationId(loanApplicationId, companyid);

                if (data == null)
                {
                    return BadRequest();
                }

                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting credit score of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetFileStatus/{loanApplicationId}/applicants/{applicants}/bureau/{BureauId}")]
        public async Task<IActionResult> GetFileStatus(long loanApplicationId, string applicants, long BureauId)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                EquifaxFileStatusResponse fileStatusResponse = null;

                if (applicants == "All")
                {
                    //Actually it is not in use
                    var applicantString = await _loanApplicationService.GetApplicantInfo(userid, companyid, loanApplicationId);
                    if (applicantString != null)
                    {
                        fileStatusResponse = await FetchFileStatus(applicantString, loanApplicationId, userid, companyid, "Primary", BureauId);
                    }
                    var coApplicantString = await _loanApplicationService.GetCoApplicantInfo(userid, companyid, loanApplicationId);
                    if (coApplicantString != null)
                    {
                        await FetchFileStatus(coApplicantString, loanApplicationId, userid, companyid, "Co-Applicant", BureauId);
                    }
                }
                else
                {
                    string applicantString = null;
                    if (applicants == "Primary")
                    {
                        applicantString = await _loanApplicationService.GetApplicantInfo(userid, companyid, loanApplicationId);
                    }
                    else if (applicants == "Co-Applicant")
                    {
                        applicantString = await _loanApplicationService.GetCoApplicantInfo(userid, companyid, loanApplicationId);
                    }

                    if (applicantString != null)
                    {
                        fileStatusResponse = await FetchFileStatus(applicantString, loanApplicationId, userid, companyid, applicants, BureauId);
                    }
                }

                return Ok(fileStatusResponse);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception fetching File Status of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetCreditBureauHistory/{loanApplicationId}")]
        /*! 
        * \brief   Get Credit Bureau History
        * \details Get Credit Bureau History from Credit Score Bureau
        * \author  Rajbir Singh 
        * \date    26 Oct 2020
        * \version 1.0    
        */
        public async Task<IActionResult> GetCreditBureauHistory(long loanApplicationId, string BureauId, string sortColumn, string sortDir, int pageIndex, int pageSize)
        {
            try
            {
                var userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _creditBureauHistoryService.GetHistoryByLoanApplicationId(loanApplicationId, sortColumn, sortDir, pageIndex, pageSize, userid, companyid);

                if (data == null)
                {
                    return BadRequest();
                }

                return Ok(data);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting credit bureau history of Loan Application {loanApplicationId}",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return BadRequest(ex.Message);
            }
        }

        private async Task<ApplicationStatusResponse> FetchCreditScore(string applicantString, long loanApplicationId, Guid userid, long companyid, string ApplicantType, long BureauId)
        {
            //var applicantString = await _loanApplicationService.GetApplicantInfo(userid, companyid, loanApplicationId);
            var applicant = JsonConvert.DeserializeObject<dynamic>(applicantString);

            ApplicantRequestModel applicantRequestModel = new ApplicantRequestModel()
            {
                FirstName = applicant.FirstName,
                LastName = applicant.LastName,
                SSN = applicant.SSN,
                Identifier = "Current",
                DOB = applicant.DOB == null ? null : Convert.ToDateTime(applicant.DOB),
                City = applicant.City,
                State = applicant.AbbreviatedStateName,
                LoanApplicationId = loanApplicationId,
                CompanyId = companyid
            };

            if (string.IsNullOrEmpty(applicantRequestModel.FirstName) ||
                string.IsNullOrEmpty(applicantRequestModel.LastName) ||
                string.IsNullOrEmpty(applicantRequestModel.SSN) ||
                string.IsNullOrEmpty(applicantRequestModel.City) ||
                string.IsNullOrEmpty(applicantRequestModel.State) ||
                applicantRequestModel.DOB == null)
            {

                return new ApplicationStatusResponse() { creditScore = -1, applicationStatus = "failed", creditScoreCategory = "N/A", loanApplicationId = loanApplicationId };
            }

            var CreditBureau = JsonConvert.DeserializeObject<dynamic>(await _creditBureauMasterService.GetCreditBureauById(BureauId, companyid, userid));
            string CreditBureauName = CreditBureau.BureauName;

            var applicantResp = await _pullCreditScoreService.PullCreditScore(CreditBureauName, applicantRequestModel);

            

            if (applicantResp == null)
            {
                //TO DO
                //Send a proper response
                return new ApplicationStatusResponse() { creditScore = null, applicationStatus = "failed", creditScoreCategory = "N/A", loanApplicationId = loanApplicationId };
            }
            else
            {
                if(applicantResp.ApplicantScore == -2)
                {
                    Guid guid = logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception pulling credit score for {ApplicantType} applicant of Loan Application {loanApplicationId}",
                        LogLongMessage = applicantResp.RawData,
                        LogIpAddress = HttpContext.Request?.Host.Value,
                        LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                        LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });

                    string errorByEquifax = "";

                    try
                    {
                        var rawData = JsonConvert.DeserializeObject<dynamic>(applicantResp.RawData);
                        var errors = rawData.additionalErrorDetails.errors as JArray;
                        if (errors != null)
                        {
                            foreach (var error in errors)
                            {
                                errorByEquifax += error.Value<string>("message") + "<br />";
                            }
                        }
                    }
                    catch (Exception ex)
                    {

                    }
                    
                    return new ApplicationStatusResponse() { creditScore = -2, applicationStatus = "failed", creditScoreCategory = errorByEquifax, loanApplicationId = loanApplicationId };
                }

                applicantResp.Trades = applicantResp.Trades.Select(t => { t.Party = ApplicantType; return t; }).ToArray();

                if(ApplicantType == "Co-Applicant")
                {
                    applicantResp.Trades = applicantResp.Trades.Select(t =>
                    {
                        if (t.Joint == true)
                        {
                            t.Include = false;
                        }
                        return t;
                    }).ToArray();
                }

                bool frozen = applicantResp.ApplicantScore == -11 ? true : false;
                bool isFraudulent = applicantResp.ApplicantScore == -12 ? true : false;

                if (applicantResp.ApplicantScore == -11 || applicantResp.ApplicantScore == -12)
                {
                    applicantResp.ApplicantScore = null;
                }

                var applicantCreditScoreModel = new CreditScoreModel
                {
                    LoanApplicationId = loanApplicationId,
                    ApplicantId = applicant.Id,
                    ApplicantType = ApplicantType,
                    CreditScore = applicantResp.ApplicantScore,
                    //CreditScoreCategory = applicantResp.CreditScoreCategory,
                    FrozenAccount = frozen,
                    IsFraudulent = isFraudulent,
                    CreditBureauId = BureauId,
                    StatusId = 1001,
                    CreatedOn = DateTime.UtcNow.ToString("MM/dd/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture),
                    CreatedBy = userid,
                    //ModifyDate = null,
                    //ModifyBy = null,
                    CompanyId = Convert.ToInt64(companyid),
                    IsSubmitted = true
                };

                
                var applicantCreditScoreData = JsonConvert.DeserializeObject<ApplicationStatusResponse>(await _creditScoreService.Save(JsonConvert.SerializeObject(applicantCreditScoreModel), userid, companyid));

                var applicantCreditScoreRawDataModel = new CreditScoreRawDataModel
                {
                    LACreditScoreId = applicantCreditScoreData.applicantCreditScoreId,
                    LoanApplicationId = loanApplicationId,
                    ApplicantId = applicant.Id,
                    ApplicantType = ApplicantType,
                    CreditScore = applicantResp.ApplicantScore,
                    FrozenAccount = frozen,
                    IsFraudulent = isFraudulent,
                    CreditBureauId = BureauId,
                    RawData = applicantResp.RawData,
                    StatusId = 1001,
                    CreatedOn = DateTime.UtcNow.ToString("MM/dd/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture),
                    CreatedBy = userid,
                    //ModifyDate = null,
                    //ModifyBy = null,
                    CompanyId = Convert.ToInt64(companyid),
                    IsSubmitted = true
                };

                var applicantCreditScoreRawDataId = await _creditScoreRawDataService.Save(JsonConvert.SerializeObject(applicantCreditScoreRawDataModel));

                var trades = JsonConvert.SerializeObject(applicantResp.Trades);
                var employments = JsonConvert.SerializeObject(applicantResp.Employments.Where(emp => emp.Identifier.ToLower() == "former").Take(1).ToArray());

                await _creditBureauHistoryService.Save(trades, employments, loanApplicationId, Convert.ToInt64(applicant.Id), ApplicantType, BureauId, companyid, userid);

                applicantCreditScoreData.needsAdminReview = applicantResp.NeedsAdminReview;

                return applicantCreditScoreData;
            }
        }
        private async Task<EquifaxFileStatusResponse> FetchFileStatus(string applicantString, long loanApplicationId, Guid userid, long companyid, string ApplicantType, long BureauId)
        {
          
            var applicant = JsonConvert.DeserializeObject<dynamic>(applicantString);

            ApplicantRequestModel applicantRequestModel = new ApplicantRequestModel()
            {
                FirstName = applicant.FirstName,
                LastName = applicant.LastName,
                SSN = applicant.SSN,
                Identifier = "Current",
                DOB = applicant.DOB == null ? null : Convert.ToDateTime(applicant.DOB)
            };

            var CreditBureau = JsonConvert.DeserializeObject<dynamic>(await _creditBureauMasterService.GetCreditBureauById(BureauId, companyid, userid));
            string CreditBureauName = CreditBureau.BureauName;

            var applicantResp = await _pullCreditScoreService.CheckFileStatus(CreditBureauName, applicantRequestModel);
            if (applicantResp == null)
            {
                //TO DO
                //Send a proper response
                return null;
            }
            else
            {
                var applicantCreditScoreModel = new CreditScoreModel
                {
                    LoanApplicationId = loanApplicationId,
                    ApplicantId = applicant.Id,
                    ApplicantType = ApplicantType,
                    CreditScore = -1,
                    FrozenAccount = applicantResp.Consumers.EquifaxPrecheckReport[0].HitCode.Code == "U" ? false : true,
                    CreditBureauId = BureauId,
                    StatusId = 1001,
                    CreatedOn = DateTime.UtcNow.ToString("MM/dd/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture),
                    CreatedBy = userid,
                    //ModifyDate = null,
                    //ModifyBy = null,
                    CompanyId = Convert.ToInt64(companyid),
                    IsSubmitted = true
                };

                var applicantCreditScoreData = JsonConvert.DeserializeObject<ApplicationStatusResponse>(await _creditScoreService.Save(JsonConvert.SerializeObject(applicantCreditScoreModel), userid, companyid));

                var applicantCreditScoreRawDataModel = new CreditScoreRawDataModel
                {
                    LACreditScoreId = applicantCreditScoreData.applicantCreditScoreId,
                    LoanApplicationId = loanApplicationId,
                    ApplicantId = applicant.Id,
                    ApplicantType = ApplicantType,
                    CreditScore = -1,
                    FrozenAccount = applicantResp.Consumers.EquifaxPrecheckReport[0].HitCode.Code == "U" ? false : true,
                    CreditBureauId = BureauId,
                    RawData = "",
                    StatusId = 1001,
                    CreatedOn = DateTime.UtcNow.ToString("MM/dd/yyyy hh:mm tt", System.Globalization.CultureInfo.InvariantCulture),
                    CreatedBy = userid,
                    //ModifyDate = null,
                    //ModifyBy = null,
                    CompanyId = Convert.ToInt64(companyid),
                    IsSubmitted = true
                };

                var applicantCreditScoreRawDataId = await _creditScoreRawDataService.Save(JsonConvert.SerializeObject(applicantCreditScoreRawDataModel));

                return applicantResp;
            }
        }
    }

    public class CreditScoreModel
    {
        public long? LoanApplicationId { get; set; }
        public long? ApplicantId { get; set; }
        public string ApplicantType { get; set; }
        public long? CreditScore { get; set; }
        public string CreditScoreCategory { get; set; }
        public bool? FrozenAccount { get; set; }
        public bool? IsFraudulent { get; set; }
        public long? CreditBureauId { get; set; }
        public long? StatusId { get; set; }
        public string CreatedOn { get; set; }
        public Guid? CreatedBy { get; set; }
        public long? CompanyId { get; set; }
        public bool? IsSubmitted { get; set; }
    }

    public class CreditScoreRawDataModel
    {
        public long? LACreditScoreId { get; set; }
        public long? LoanApplicationId { get; set; }
        public long? ApplicantId { get; set; }
        public string ApplicantType { get; set; }
        public long? CreditScore { get; set; }
        public bool? FrozenAccount { get; set; }
        public bool? IsFraudulent { get; set; }
        public long? CreditBureauId { get; set; }
        public string RawData { get; set; }
        public long? StatusId { get; set; }
        public string CreatedOn { get; set; }
        public Guid? CreatedBy { get; set; }
        public long? CompanyId { get; set; }
        public bool? IsSubmitted { get; set; }
    }

    
}
