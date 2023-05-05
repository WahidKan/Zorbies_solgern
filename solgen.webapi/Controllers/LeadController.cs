using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;  
using Solgen.WebApi.HubConfig;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/lead")]
    public class LeadController : Controller
    {
        private ILeadService _leadService;
        private IMapService _mapService;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IConfiguration _config;
        private readonly IWebMergeService _webMergeService;
        private readonly IRealTimeService _realTimeService;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        public LeadController(ILeadService leadService, UserManager<ApplicationUser> userManager, ICommonService commonService, IConfiguration config, IEmailSettingsService emailSettingsService, IHttpContextAccessor httpContext, IWebMergeService webMergeService, IRealTimeService realTimeService, IMapService mapService, IServiceScopeFactory serviceScopeFactory)
        {
            _config = config;
            _userManager = userManager;
            _leadService = leadService;
            _mapService = mapService;
            _commonService = commonService;
            _httpContext = httpContext;
            _emailSettingsService = emailSettingsService;
            _webMergeService = webMergeService;
            _realTimeService = realTimeService;
            _serviceScopeFactory = serviceScopeFactory;
        }
        [HttpGet]
        [Authorize]
        [Route("GetLeadAccountdata")]
        public IActionResult GetLeadAccountdata(long leadid, int submoduleid, string objectname)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _leadService.GetLeadAccountdata(leadid, userid, companyid, submoduleid, objectname);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetLeadappointments")]
        public IActionResult GetLeadappointments(long leadid, int submoduleid, string objectname)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _leadService.GetLeadappointments(leadid, userid, companyid, submoduleid, objectname);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetProductList")]
        public IActionResult GetProductList(long leadid, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.GetProductList(leadid, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);

            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpGet]
        [Authorize]
        [Route("AssociteProduct")]
        public async Task<IActionResult> AssociteProduct(string productids, long leadid, int submoduleid, string objectname, bool isLoanapp)
        {
            productids = productids.TrimEnd(',');
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var result = await _leadService.AssociteProduct(productids, leadid, userid, companyid, submoduleid, objectname, isLoanapp);

                if (result == 1)
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Product Has Been Associated Succesfully";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Error occurs while Associated Succesfully";
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
        [Route("GetAssociateProductList")]
        public IActionResult GetAssociateProductList(long leadid, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var ab = User.Claims.FirstOrDefault(x => x.Type == "AccoutId")?.Value;
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.GetAssociateProductList(leadid, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpPost]
        [Authorize]
        [Route("saveNotes")]
        public IActionResult saveNotes([FromBody] leadNotesModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.created_by = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            model.company_id = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data = _leadService.saveNotes(model);
                if (model.note_id > 0)
                {
                    result.ResponseMessage = "Note has been updated successfully.";

                }
                else
                {
                    result.ResponseMessage = "Note has been added successfully.";

                }
                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpGet]
        [Authorize]
        [Route("getNoteslist")]
        public IActionResult getNoteslist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.getNoteslist(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }

        [HttpGet]
        [Authorize]
        [Route("getLeadSMSlist")]
        public IActionResult getLeadSMSlist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.getLeadSMSlist(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteAssociateProductbyid")]
        public int DeleteAssociateProductbyid(string id, long leadid, int submoduleid, string objectname)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.DeleteAssociateProductbyid(id, leadid, submoduleid, objectname, userId, companyID);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpGet]
        [Authorize]
        [Route("Deleteimage")]
        public int Deleteimage(string id)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.Deleteimage(id, userId, companyID);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [Route("DeleteNote")]
        [HttpGet]
        [Authorize]
        public int DeleteNote(string id, long leadid, int submoduleid, string objectname)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.DeleteNote(id, leadid, submoduleid, objectname, userId, companyID);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [Route("DeleteContact")]
        [HttpGet]
        [Authorize]
        public int DeleteContact(string id, long leadid, int submoduleid, string objectname)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.DeleteContact(id, leadid, submoduleid, objectname, userId, companyID);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpPost]
        [Authorize]
        [Route("saveEmail")]
        public IActionResult saveEmail([FromBody] leadEmailModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.created_by = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            model.company_id = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                if (model.templateid > 0)
                {
                    dynamic objDET = _commonService.GetEmailTemplateDataForReplaceContent(Convert.ToString(model.object_ref_id), Convert.ToString(model.templateid), model.created_by, model.company_id);
                    if (objDET.Count > 0)
                    {
                        foreach (var itmval in objDET)
                        {
                            model.description = model.description.Replace(string.Format("@{0}", itmval.repKey), itmval.repValue);
                        }
                    }
                }

                string data = _leadService.saveEmail(model); //Save Email Data Here

                data = CommonFunctions.GetFileLink(data, "image", enumFileFolder.user);
                if (data.Contains("defaultNoImage"))
                {
                    data = "javascript:void(0);";
                }
                else
                {
                    data = data.Replace("wwwroot", "");
                    //item.CompanyLogo= item.CompanyLogo.Replace("UserProfilePick/", "UserProfilePick//////");
                }
                result.ResponseMessage = "Email has been send successfully.";
                var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "account";

                try
                {
                    Hashtable htbl = new Hashtable();
                    htbl["@bodycontent"] = model.description;
                    htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                    htbl["@logolink"] = data;


                    htbl["@year"] = DateTime.Now.Year.ToString();
                    _emailSettingsService.SendEmail(model.sent_to, htbl, "Email", $"Email", Convert.ToString(model.object_id), model.created_by, false, _config.GetSection("CommonSettings")["SendMail"], "SendMail", model.company_id.ToString());
                }
                catch
                {
                    HttpContext.Session.Clear();
                }

                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [HttpGet]
        [Authorize]
        [Route("getEmaillist")]
        public IActionResult getEmaillist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.getEmaillist(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpGet]
        [Authorize]
        [Route("getContactList")]
        public IActionResult getContactList(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.getContactList(leadid, submoduleid, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpPost]
        [Authorize]
        [Route("saveLeadConvert")]
        public IActionResult saveLeadConvert([FromBody] leadConvertModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.created_by = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            model.company_id = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data = _leadService.saveLeadConvert(model);

                result.ResponseMessage = "Lead  has been converted successfully.";

                result.StatusCode = 200;
                result.ID = data.ToString();

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpPost]
        [Authorize]
        [Route("saveLeadConvertproduct")]
        public async Task<IActionResult> saveLeadConvertproduct([FromBody] leadConvertModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.created_by = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            model.company_id = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data = _leadService.saveLeadConvertproduct(model);


                dynamic lst = JValue.Parse(data);

                //var email = JValue.Parse(lst.email);
                var name = lst.name;
                string email = Convert.ToString(lst.email);
                //if(email != null || email != "")
                //{
                //    email = email.Trim('{');
                //    email = email.Trim('}');
                //}
                var user = await _userManager.FindByEmailAsync(email);

                if (user != null && email != "")
                {


                    var companyid = Convert.ToString(user.CompanyID);
                    var code1 = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                    var callbackUrl1 = _config.GetSection("CommonSettings")["SiteLink"] + "/account/setpassword?userId=" + user.Id + "&token=" + token;
                    try
                    {
                        Hashtable htbl = new Hashtable();
                        htbl["@username"] = name;
                        htbl["@link"] = $"<a href=" + callbackUrl1 + ">Click here</a>";
                        htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                        //  htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                        htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                        if (CompanyID == 1001) { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        else if (CompanyID == 1002) { htbl["@logolink"] = _config.GetSection("CommonSettings")["LoanHomi_EmailHeader"]; }
                        else if (CompanyID == 1003) { htbl["@logolink"] = _config.GetSection("CommonSettings")["SolgenLive_EmailHeader"]; }
                        else { htbl["@logolink"] = _config.GetSection("CommonSettings")["Solgen_EmailHeader"]; }
                        await _emailSettingsService.SendEmail(email, htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl1}'>link</a>", Convert.ToString(user.Id), Guid.Parse(model.created_by.ToString()), false, _config.GetSection("CommonSettings")["Register"], "Registration", CompanyID.ToString());
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }

                var dataForNotification = JsonConvert.DeserializeObject<dynamic>(data);
                List<string> userIds = new List<string>();
                dynamic userDET = JsonConvert.DeserializeObject<dynamic>(await _webMergeService.GetCompanyAdminByAppId(dataForNotification.Id.ToString(), CompanyID.ToString()));
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
                        Subject = $"New Loan Application #{dataForNotification.ApplicationNumber.ToString()}",
                        SubjectBody = $"New Loan Application #{dataForNotification.ApplicationNumber.ToString()}",
                        RouteUrl = "loanApplication/Detail/" + dataForNotification.Id.ToString(),
                        ObjectId = dataForNotification.Id.ToString().ToString(),
                        CreatedBy = strUserTo,
                        UserIdList = userIds,
                        CompanyId = Convert.ToString(CompanyID),

                    };
                    await _realTimeService.SendNotification(notification);
                }




                result.ResponseMessage = "Lead  has been converted successfully.";

                result.StatusCode = 200;
                result.OptionalExtraParamers = data.ToString();

                return Ok(result);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpGet]
        [Authorize]
        [Route("getLeadConvertData")]
        public IActionResult getLeadConvertData(long leadid)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _leadService.getLeadConvertData(leadid, userid, companyid);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("getImages")]
        public IActionResult getImages(long leadid, int submoduleid)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _leadService.getImages(leadid, submoduleid, userid, companyid);
                foreach (var item in lst)
                {
                    if (item.MasterValue == "Change Order")
                    {
                        item.FileUrl = CommonFunctions.GetFileLink(item.FileUrl, "", enumFileFolder.changeOrderDocument);
                        item.FileUrl = item.FileUrl.Replace("wwwroot", "");
                    }
                    else
                    {
                        item.FileUrl = CommonFunctions.GetFileLink(item.FileUrl, "image", enumFileFolder.UploadDocuments);
                        item.FileUrl = item.FileUrl.Replace("wwwroot", "");
                    }
                }

                //lst.ProfilePicLink = CommonFunctions.GetFileLink(result.ProfilePic, "image", enumFileFolder.user);
                //lst.ProfilePicLink = result.ProfilePicLink.Replace("wwwroot", "");
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetContactDll")]
        [Authorize]
        public List<MasterItems> GetContactDll(long leadid, int submoduleid, string objectname)
        {
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                data = _leadService.GetContactDll(leadid, submoduleid, userid, companyid, objectname);

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
        [Authorize]
        [Route("updateLeadStatus")]
        public IActionResult updateLeadStatus(long leadstatus, long leadid)
        {
            ResultResponseModel result = new ResultResponseModel();
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data = _leadService.updateLeadStatus(leadstatus, leadid, userid, companyid);

                result.ResponseMessage = "lead  has been converted successfully.";

                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpGet]
        [Authorize]
        [Route("getLeadConvertModuleWizard")]
        public IActionResult getLeadConvertModuleWizard()
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.getLeadConvertModuleWizard(userid, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpGet]
        [Authorize]
        [Route("updatecreatedBy")]
        public IActionResult updatecreatedBy(string ownerid, long leadid)
        {
            ResultResponseModel result = new ResultResponseModel();
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data = _leadService.updatecreatedBy(ownerid, leadid, userid, companyid);

                result.ResponseMessage = "owner Name updated successfully.";

                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpGet]
        [Authorize]
        [Route("GetLeadById")]
        public async Task<IActionResult> GetLeadById(long leadId, bool ismobile)
        {
            try
            {

                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);


                var data = await _leadService.GetLeadById(leadId, companyid, userid);


                var lead = JsonConvert.DeserializeObject<dynamic>(data);
                if (ismobile == true)
                {
                    return Ok(data);

                }
                else
                {
                    return Ok(lead);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("CheckRequiredDataOnLeadConvert")]
        public async Task<IActionResult> CheckRequiredDataOnLeadConvert(long leadId)
        {
            try
            {

                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);


                var data = await _leadService.CheckRequiredDataOnLeadConvert(leadId, companyid, userid);


                var lead = JsonConvert.DeserializeObject<dynamic>(data);
                     return Ok(lead);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetMandatoryDocumentsByLoanId/{loanId}")]
        public async Task<IActionResult> GetMandatoryDocumentsByLoanId(long loanId)
        {
            try
            {
                Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = await _leadService.GetMandatoryDocumentsByLoanId(loanId, 0, companyid);

                if (data != null)
                {
                    var documents = JsonConvert.DeserializeObject<dynamic>(data);
                    return Ok(documents);
                }
                else
                {
                    return Ok(null);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("CheckEmailNotExistInOthersTypeAccount")]
        public IActionResult CheckEmailNotExistInOthersTypeAccount(string email)
        {
            try
            {
                int companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

                var data = _leadService.CheckEmailNotExistInOthersTypeAccount(email, companyId);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetLeadConvertAccountDll")]
        public List<MasterItems> GetLeadConvertAccountDll(string id, int length, string serchText)
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if (id == "null")
            { id = "0"; }

            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _leadService.GetLeadConvertAccountDll(userid, companyid, id, length, serchText);

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
        [Authorize]
        [Route("GetLeadConvertContactDll")]
        public List<MasterItems> GetLeadConvertContactDll(string id, int length, string serchText, bool isLead)
        {
            Guid userid = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            if (id == "null")
            { id = "0"; }

            long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _leadService.GetLeadConvertContactDll(userid, companyid, id, length, serchText, isLead);

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
        [Route("saveLeadConvertopportunity")]
        public IActionResult saveLeadConvertopportunityAsync([FromBody] leadConvertModelopportunity model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.created_by = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            model.company_id = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            try
            {
                var data = _leadService.saveLeadConvertopportunity(model);

                result.ResponseMessage = "Lead has been converted successfully.";

                result.StatusCode = 200;
                result.ID = data.ToString();
                if (!string.IsNullOrEmpty(result.ID))
                {
                    var opportunityId = Convert.ToInt32(result.ID);

                    _ = _leadService.SetNearbyWarehouseAndLocation(opportunityId, model.company_id);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        [HttpGet]
        [Route("GetLocations")]
        public IActionResult GetLocations(long opportunityId, long companyId, string type)
        {

            var jsonResult = _leadService.GetSourceDestinationLocations(opportunityId, companyId, type);

            var source = jsonResult.source;// warehouses
            var destination = jsonResult.destination; // account addess
            List<SourceDestinationCopmarisonModel> model = new List<SourceDestinationCopmarisonModel>();
            foreach (var item in source)
            {
                SourceDestinationCopmarisonModel resp = new SourceDestinationCopmarisonModel();
                var distance = _mapService.GetDuration(item.Address, destination.Address);

                resp.AccountId = destination.Id;
                resp.AccountAddress = destination.Address;
                resp.LocationId = item.Id;
                resp.LocationAddress = item.Address;
                resp.Time = distance.Time;
                resp.Steps = distance.Steps;
                resp.TotalSeconds = distance.TotalSeconds;
                resp.Distance = distance.Distance;

                model.Add(resp);
            }
            var minValue = model.Find(x => x.Steps == model.Min(item => item.Steps));

            var json = new
            {
                NearBy = minValue,
                LocationDistanceFromAccount = model,
                LocationAddress = source,
                AccountAddress = destination,
            };
            return Json(json);
        }


        [HttpGet]
        [Route("SetNearByWarehouseAndSiteSurveyZone")]
        public IActionResult SetNearByWarehouseAndSiteSurveyZone(long opportunityId, long companyId)
        {
            ResultResponseModel result = new ResultResponseModel();
            var _result = _leadService.SetNearbyWarehouseAndLocation(opportunityId, companyId);
            if (_result == 1)
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Near by warehouse and site survey zone updated successfully.";
            }
            else
            {
                result.StatusCode = 500;
                result.ResponseMessage = "We are sorry for the inconvenience. Please contact your administrator for help.";
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("SendBack")]
        public IActionResult SendBack(long LeadId)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _leadService.SendBackStatus(companyid, LeadId);
                if (data == 1)
                {
                    result.StatusCode = 200;
                    result.ResponseMessage = "Lead has been sent back to queue successfully.";
                }
                else
                {
                    result.StatusCode = 400;
                    result.ResponseMessage = "Something went wrong";
                }
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
           
        }
    }
}
