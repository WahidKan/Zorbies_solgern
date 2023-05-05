using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using iTextSharp.text.pdf.qrcode;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Org.BouncyCastle.Bcpg;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.WebApi.HubConfig;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/appointment")]
    public class AppointmentController : Controller
    {
        private IAppointmentsService _appointmentService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IRealTimeService _realTimeService;
        private IConfigurationSettingService _configurationSettingService;
        public ILogService logService { get; }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        private Guid parsedUserID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

        public AppointmentController(IConfigurationSettingService configurationSetting, IAppointmentsService appointmentService,

        ICommonService commonService,
            IHttpContextAccessor httpContext,
            IRealTimeService realTimeService)
        {
            _appointmentService = appointmentService;
            _configurationSettingService = configurationSetting;
            _commonService = commonService;
            _httpContext = httpContext;
            _realTimeService = realTimeService;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        [Route("Save")]
        public async Task<IActionResult> Save([FromBody] AppointmentModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.CreatedBy = parsedUserID;

            try
            {
                bool isupdate = (model.AppointmentID != null && model.AppointmentID != Guid.Empty);
                //model.Email = "testsolgen@gmail.com";
                model.CompanyId = companyID;
                model.CalenderId = isupdate ? model.CalenderId : Guid.NewGuid().ToString();
                var data = _appointmentService.SaveUpdateAppointment(model);
                //////////////Notification Start//////////////
                string subjectBody = isupdate ? "Appointment book updated with " : "New appointment book with ";
                StringBuilder strNotifi = new StringBuilder();

                if (model.appointmentStatus == "Cancelled")
                {
                    strNotifi.AppendLine(subjectBody + User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value);
                }
                else
                {
                    //TimeSpan FromTime1 = TimeSpan.Parse(model.FromTime_Notification.ToString());
                    //string FromTime = new DateTime().Add(FromTime1).ToString("hh:mm tt");

                    //TimeSpan ToTime1 = TimeSpan.Parse(model.ToTime_Notification.ToString());
                    //string ToTime = new DateTime().Add(ToTime1).ToString("hh:mm tt");

                    string subjectBody1 = "New appointment booked with " + model.CustomerName;

                    strNotifi.AppendLine($"<b>{subjectBody1}</b> <br /><b>Subject:</b> {model.Subject} <br />" +
                        $" <b>Date/Time:</b> {model.FromTime_Notification.ToString("MM/dd/yyyy HH:mm tt")}  - {model.ToTime_Notification.ToString("MM/dd/yyyy HH:mm tt")} ");
                }
                var notification = new NotificationSendModel();
                notification.CcUser = new string[1] { model.CreatedBy.ToString() };
                if (!string.IsNullOrEmpty(model.CustomerGuid))                    
                    notification.CcUser = new string[2] { model.CreatedBy.ToString(), model.CustomerGuid };
                notification.Subject = model.Subject != null ? model.Subject : model.AppointmentType + " - " + model.AppointmentDueDate_Notification.ToString("MM/dd/yyyy HH:mm");
                notification.SubjectBody = strNotifi.ToString();
                notification.RouteUrl = "/" + model.ModuleName.ToLower() + (model.ModuleName.ToLower() == "lead" ? "/view/" : "/viewOpportunity/") + model.CustomerID;
                notification.ObjectId = "";
                notification.CreatedBy = model.CreatedBy.ToString();
                notification.UserIdList = new List<string>() { model.CreatedBy.ToString() };
                if (!string.IsNullOrEmpty(model.CustomerGuid))
                    notification.UserIdList.Add(model.CustomerGuid);
                notification.CompanyId = companyID.ToString();


                if (model.appointmentStatus != "Cancelled")
                {
                    await _realTimeService.SendNotification(notification);
                }

                if (model.AppointmentID != null && model.AppointmentID != Guid.Empty)
                {
                    result.ResponseMessage = "Appointment has been updated successfully.";
                }
                else
                {
                    result.ResponseMessage = "Appointment has been added successfully.";
                }
                ///////////////Notification End//////////////
                var emailModel = _configurationSettingService.getcompanySetupDetail(this.companyID);
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient();
                MailMessage msg = new MailMessage();
                msg.From = new MailAddress(emailModel.FromEmail);
                if (model.Email == null || model.userEmail == null)
                {
                    BadRequest();
                }
                msg.To.Add(new MailAddress(model.Email, model.userEmail));
                msg.Subject = "Assigned";
                msg.Body = "New appointment book with " + User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                StringBuilder str = new StringBuilder();
                str.AppendLine("BEGIN:VCALENDAR");
                str.AppendLine("PRODID:-//Solgen");
                str.AppendLine("VERSION:2.0");
                if (model.appointmentStatus == "Cancelled")
                {
                    str.AppendLine("METHOD:CANCEL");
                    subjectBody = "Appointment has been cancelled with";
                }
                else
                {
                    str.AppendLine("METHOD:REQUEST");
                }
                str.AppendLine("BEGIN:VEVENT");
                str.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", model.AppointmentDueDate.Date.Add(model.FromTime)));
                str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", model.AppointmentDueDate));
                str.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", model.AppointmentDueDate.Date.Add(model.ToTime)));
                str.AppendLine(string.Format("UID:{0}", model.CalenderId));
                str.AppendLine(string.Format("DESCRIPTION:{0}", msg.Body));
                str.AppendLine(string.Format("X-ALT-DESC;FMTTYPE=text/html:{0}", msg.Body));
                str.AppendLine(string.Format("SUMMARY:{0}", msg.Subject));
                str.AppendLine(string.Format("ORGANIZER:MAILTO:{0}", msg.From.Address));
                str.AppendLine(string.Format("ATTENDEE;CN=\"{0}\";RSVP=TRUE:mailto:{1}", msg.To[0].DisplayName, msg.To[0].Address));
                str.AppendLine("END:VEVENT");
                str.AppendLine("END:VCALENDAR");
                //string subjectBody = isupdate ? "appointment book updated with " : "New appointment book with ";

                System.Net.Mime.ContentType typeC = new System.Net.Mime.ContentType("text/calendar");
                if (model.appointmentStatus == "Cancelled")
                {
                    typeC.Parameters.Add("STATUS", "CANCELLED");
                    typeC.Parameters.Add("method", "CANCEL");

                }
                else
                {
                    typeC.Parameters.Add("method", "REQUEST");
                }

                typeC.Parameters.Add("name", "meeting.ics");
                AlternateView m_calV = AlternateView.CreateAlternateViewFromString(str.ToString(), typeC);
                msg.AlternateViews.Add(m_calV);
                SmtpServer.Port = Convert.ToInt32(emailModel.SMTPport);
                SmtpServer.Host = emailModel.SMTPHost;
                SmtpServer.Credentials = new System.Net.NetworkCredential(emailModel.SMTPusername, emailModel.SMTPpassword);
                SmtpServer.EnableSsl = emailModel.IsEnableSSL;
                SmtpServer.Send(msg);

                result.StatusCode = 200;

                return Ok(result);

            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception merging webmerge default mapping",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });

                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                result.StatusCode = 500;
                result.ResponseMessage = ex.Message;
                if (ex.Message.Contains("Response status code does not indicate success: 404 ()."))
                {
                    result.ResponseMessage = "Please upload v documents";
                }

                if (ex.Message.Contains("Value cannot be null. (Parameter 'value')"))
                {
                    result.ResponseMessage = "Please set mappings of proposal documents";
                }
                return Ok(result);
            }

        }



        [HttpPost]
        [Authorize]
        [Route("Save1")]
        //public async Task<IActionResult> SendDocumentSignNow(long proposalId, string mappingIds, string sendingSource, long deliveryId, string subject, dynamic body)
        //{
        public async Task<IActionResult> Save1([FromBody] AppointmentModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var modelss = _configurationSettingService.getcompanySetupDetail(companyID);
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient();
                //mail.From = new MailAddress("afnan.akhtar@yahoo.com");
                //mail.To.Add("aakhtar@zorbis.net");
                //mail.Subject = "test caleneder";
                //mail.IsBodyHtml = true;
                //mail.Body = "No Body";
                ////if (!string.IsNullOrWhiteSpace(ccemail))
                ////{
                ////    mail.CC.Add(ccemail);
                ////}
                //// mail.Body = "proposal test";
                //Attachment attachment = new Attachment(stream, UniqueId + ".pdf");
                //mail.Attachments.Add(attachment);



                MailMessage msg = new MailMessage();
                msg.From = new MailAddress("afnan.akhtar@yahoo.com");
                msg.To.Add(new MailAddress("aakhtar@zorbis.net"));
                //  msg.To.Add(new MailAddress("cirwin01@gmail.com", "Chris Irwin"));
                msg.Subject = "Send Calendar Appointment Email";
                msg.Body = "Here is the Body Content";
                StringBuilder str = new StringBuilder();
                str.AppendLine("BEGIN:VCALENDAR");
                str.AppendLine("PRODID:-//Ahmed Abu Dagga Blog");
                str.AppendLine("VERSION:2.0");
                str.AppendLine("METHOD:REQUEST");
                str.AppendLine("BEGIN:VEVENT");
                str.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", DateTime.Now.AddMinutes(5)));
                str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
                str.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", DateTime.Now.AddMinutes(10)));
                str.AppendLine("LOCATION: Dubai");
                str.AppendLine(string.Format("UID:{0}", Guid.NewGuid()));
                str.AppendLine(string.Format("DESCRIPTION:{0}", msg.Body));
                str.AppendLine(string.Format("X-ALT-DESC;FMTTYPE=text/html:{0}", msg.Body));
                str.AppendLine(string.Format("SUMMARY:{0}", msg.Subject));
                str.AppendLine(string.Format("ORGANIZER:MAILTO:{0}", msg.From.Address));
                str.AppendLine(string.Format("ATTENDEE;CN=\"{0}\";RSVP=TRUE:mailto:{1}", msg.To[0].DisplayName, msg.To[0].Address));
                str.AppendLine("END:VEVENT");
                str.AppendLine("END:VCALENDAR");
                System.Net.Mime.ContentType typeC = new System.Net.Mime.ContentType("text/calendar");
                typeC.Parameters.Add("method", "REQUEST");
                typeC.Parameters.Add("name", "meeting.ics");
                AlternateView m_calV = AlternateView.CreateAlternateViewFromString(str.ToString(), typeC);
                msg.AlternateViews.Add(m_calV);
                SmtpServer.Port = Convert.ToInt32(modelss.SMTPport);
                SmtpServer.Host = modelss.SMTPHost;
                SmtpServer.Credentials = new System.Net.NetworkCredential(modelss.SMTPusername, modelss.SMTPpassword);
                SmtpServer.EnableSsl = modelss.IsEnableSSL;

                SmtpServer.Send(msg);
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception merging webmerge default mapping",
                    LogLongMessage = ex.Message,
                    LogIpAddress = HttpContext.Request?.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request),
                    LogReferrerUrl = HttpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });

                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                if (ex.Message.Contains("Response status code does not indicate success: 404 ()."))
                {
                    resultResponseModel.ResponseMessage = "Please upload v documents";
                }

                if (ex.Message.Contains("Value cannot be null. (Parameter 'value')"))
                {
                    resultResponseModel.ResponseMessage = "Please set mappings of proposal documents";
                }

                // await _loanDocumentHistoryService.AddNewLoanDocumentHistory(LoanApplicationId, "", null, "", "FAILED", companyid, CommonSettings.AppSetting["CommonSettings:SignAPISourceType"], "");

                return Ok(resultResponseModel);
            }
        }




        [HttpGet]
        [Route("GetAppointmentById")]
        public IActionResult GetAppointmentById(string id)
        {
            try
            {
                AppointmentModel model = new AppointmentModel();
                model.AppointmentID = Guid.Parse(id);

                model.CreatedBy = parsedUserID;
                model.CompanyId = companyID;
                var data = _appointmentService.GetAppointmentById(model);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet]

        [Route("GetAppointments")]
        public IActionResult GetAppointments(string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, string year, string month,
            string day, string listFiltertext, bool isweek, string customerId, string appointmentStatusId,  bool isMobile = false)
        {
            try
            {
                var isInternal = Convert.ToBoolean(User.Claims.FirstOrDefault(x => x.Type == "IsInternalUser")?.Value);
                if (isInternal == false)
                {
                    isMobile = true;
                }
                else
                {
                    isMobile = false;
                }
                var data = _appointmentService.GetAppointments(SortColumn, SortDir, PageNo, PageSize, parsedUserID, companyID, year, month, day, isweek,  listFiltertext, customerId, appointmentStatusId, isMobile);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }


        [Route("GetAppointmentsForCalendar")]
        public IActionResult GetAppointmentsForCalendar(String condition)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var isInternal = Convert.ToBoolean(User.Claims.FirstOrDefault(x => x.Type == "IsInternalUser").Value);
                if (isInternal == false)
                {
                    condition = "customer";
                }
                else
                {
                    condition = null;
                }
                var data = _appointmentService.GetAppointmentsForCalendar(parsedUserID, (int)companyID, condition);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetAppointmentsBySubmodule")]

        public async Task<IActionResult> GetAppointmentsBySubmodule(decimal Id, string submoduleCode, string sortColumn, string sortDir, string pageIndex, string pageSize)
        {
            try
            {
                var lst = await _appointmentService.GetAppointmentsBySubmodule(Id, submoduleCode, sortColumn, sortDir, pageIndex, pageSize, companyID.ToString());

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetContactsForAppointment/{appointmentWith}/{LeadId}")]
        /*! 
        * \brief   Get the Customer
        * \details Function is used to fetch the list of customers based on Appointment with
        * \author  Anish Sharma
        * \date    30 Sep 2020
        * \version 1.0    
        */
        public IActionResult GetContactsForAppointment(string appointmentWith, string LeadId)
        {
            List<ContactsForAppointmentModel> lst = new List<ContactsForAppointmentModel>();
            try
            {
                lst = _appointmentService.GetContactsForAppointment(appointmentWith, LeadId, parsedUserID, companyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("getcustomerListForCalender")]
        public IActionResult getcustomerListForCalender()
        {
            List<ContactsForAppointmentModel> lst = new List<ContactsForAppointmentModel>();
            try
            {
                lst = _appointmentService.getcustomerListForCalender(parsedUserID, companyID);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            ResultResponseModel result = new ResultResponseModel();
            ChangeStatusModel effectedRow = _appointmentService.Delete(id);
            if (effectedRow.Status == false)
            {
                throw new Exception("Unable to delete this record.");
            }

            result.ResponseMessage = "Success";
            result.StatusCode = (int)HttpStatusCode.OK;

            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        [Route("addOrUpdateFiles")]
        public async Task<IActionResult> addOrUpdateFiles([FromForm] AppointmentFiles model)
        {
            try
            {
                string filePath = CommonSettings.AppSetting["CommonSettings:UploadAppointmentViewData"];
                string filePrefix = "Appointment";

                ResultResponseModel result = new ResultResponseModel();
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.CompanyId = companyID;
                model.Userid = userid;
                if (Request.Form.Files.Count > 0)
                {
                    var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
                    model.FileName = fileResult.Item1 ?? "";
                }
                string fileUrl = CommonFunctions.GetFileLink(model.FileName, "image", enumFileFolder.appointmentFile);
                if (fileUrl.Contains("defaultNoImage"))
                {
                    fileUrl = "javascript:void(0);";

                }
                else
                {

                    fileUrl = fileUrl.Replace("wwwroot", "");
                }
                string domainName = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                fileUrl = fileUrl.Replace(domainName, "");
                model.FileUrl = fileUrl;
                model.Type = Path.GetExtension(model.FileUrl);
                var data = _appointmentService.addOrUpdateFiles(model);
                if (model.Id == null || model.Id == "")
                {

                    result.ResponseMessage = "Files has been uploaded successfully.";
                }
                else
                {
                    result.ResponseMessage = "Files  has been uploaded successfully.";
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
        [Route("GetLeadCallHistory")]
        public IActionResult GetLeadCallHistory(string leadId, string subModuleName)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var data = _appointmentService.GetLeadCallHistory(leadId, subModuleName, (int)companyID);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetVideoCallHistory")]
        public IActionResult GetVideoCallHistory(string RefId, string subModuleName)
        {
            try
            {
                var data = _appointmentService.GetVideoCallHistory(RefId, subModuleName, (int)companyID);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }




        [HttpGet]
        [Authorize]
        [Route("GetSmsLogHistory")]
        public IActionResult GetSmsLogHistory(long leadId, string subModuleName)
        {
            try
            {
                var data = _appointmentService.GetSmsLogHistory(leadId, subModuleName, companyID, userID.ToString());

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetAppointmentNotification")]
        public IActionResult GetAppointmentNotification()
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var data = _appointmentService.GetAppointmentNotification(userID.ToString(), (int)companyID);
                //if (data.Count>0)
                //{
                //    var obj = JsonConvert.SerializeObject(data);

                //    var Appointment = JsonConvert.DeserializeObject<List<ScheduleAppointmentModel>>(obj);
                //    foreach (var item in Appointment)
                //    {
                //        var objId = Convert.ToInt32(item.Contact_Id);
                //        var autoId = Convert.ToInt32(item.AppointmentIDAuto);
                //        var notification = new NotificationSendModel()
                //        {
                //            Subject = "Assigned",
                //            SubjectBody = "Your appointment going to start in next 5 minutes",
                //            RouteUrl = "/calendar?id=" + objId + "&autoId=" + autoId,
                //            //RouteUrl = "" + Appointment[0].module_route + "?id=" + objId + "",
                //            ToUser = userid,
                //            ObjectId = Convert.ToString(objId),//model.AppointmentID.ToString(),
                //            CreatedBy = userid,
                //            UserIdList = new List<string>() { userid.ToString() },
                //            CompanyId = companyID.ToString()

                //        };

                //        await _realTimeService.SendNotification(notification);
                //    }
                //    //activeMapping = activeMapping.Where(x => x.StatusId == "1001").ToList();

                //}
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetScheduleAppointmentAgaintstUser")]
        public IActionResult GetScheduleAppointmentAgaintstUser(int leadId, int AppId)
        {
            var result = _appointmentService.GetScheduleAppointmentAgaintstUser(leadId, AppId, userID.ToString());

            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);

        }
        [HttpGet]
        [Authorize]
        [Route("CheckScheduledAppointmentTimeAgaintstUser")]
        public IActionResult CheckScheduledAppointmentTimeAgaintstUser(string startDate, string startTime, long AppointmentIdAuto)
        {
            var result = _appointmentService.CheckScheduledAppointmentTimeAgaintstUser(startDate, startTime, userID.ToString(), AppointmentIdAuto);

            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);

        }

        [HttpGet]
        [Route("GetAppointmentHistory")]
        public IActionResult GetAppointmentHistory(decimal leadId, decimal appointmentId, string submoduleCode)
        {
            try
            {
                var data = _appointmentService.GetAppointmentHistory(leadId, appointmentId, submoduleCode);
                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
    }
}
