using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Solgen.Core;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio.Jwt.AccessToken;
using Twilio.Jwt;
using Twilio.Jwt.Client;
using Twilio.TwiML;
using Twilio.TwiML.Voice;
using static Twilio.TwiML.Voice.Dial;
using Microsoft.AspNetCore.Cors;
using Twilio.Rest.Api.V2010.Account;
using Twilio;
using Twilio.Types;
using Solgen.Service;
using Twilio.AspNet.Common;
using Solgen.WebApi.HubConfig;
using Newtonsoft.Json;
using Solgen.Service.CompanyIntegrationSetting;
using Solgen.Core.Models;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class TwilioController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IRealTimeService _realTimeService;
        private SettingModel _settings;

        private readonly ITwilioService _twilioService;
        private readonly ICommonService _commonService;
        private string twilioAccountSid = string.Empty;
        private string outgoingApplicationSid = string.Empty;
        private string authToken = string.Empty;
        private string fromNumber = string.Empty;
        private string smsStatusCallBack = string.Empty;
        private string actionURL = string.Empty;
        private string recordingStatusCallbackURL = string.Empty;
        private string messagingServiceSid = string.Empty;

        //private Guid? UserID { get { return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value); } }

        private readonly UserHub _userHub;
        private readonly IUserConnectionManager _userConnectionManager;

        private readonly IVideoService _videoService;
        private readonly ICompanyIntegrationSettingService _companyIntegrationSettingService;

        public object TempData { get; private set; }

        public TwilioController(IConfiguration configuration, ITwilioService twilioService, IUserConnectionManager userConnectionManager
, UserHub userHub, IRealTimeService realTimeService, IVideoService videoService, ICommonService commonService,
            ICompanyIntegrationSettingService companyIntegrationSettingService)
        {
            _twilioService = twilioService;
            _config = configuration;
            _companyIntegrationSettingService = companyIntegrationSettingService;

            twilioAccountSid = _config.GetValue<string>("TwilioSetting:twilioAccountSid");
            outgoingApplicationSid = _config.GetValue<string>("TwilioSetting:outgoingApplicationSid");
            authToken = _config.GetValue<string>("TwilioSetting:authToken");
            fromNumber = _config.GetValue<string>("TwilioSetting:from");
            actionURL = _config.GetValue<string>("TwilioSetting:actionURL");
            recordingStatusCallbackURL = _config.GetValue<string>("TwilioSetting:recordingStatusCallbackURL");
            smsStatusCallBack = _config.GetValue<string>("TwilioSetting:smsStatusCallBackURL");
            messagingServiceSid = _config.GetValue<string>("TwilioSetting:messagingServiceSid");

            _userConnectionManager = userConnectionManager;
            _userHub = userHub;
            _realTimeService = realTimeService;
            _videoService = videoService;
            _commonService = commonService;
        }


        [HttpGet]
        [Authorize]
        [Route("CapabilityAccessToken")]
        public IActionResult CapabilityAccessToken()
        {
            string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyId);
                if (_settings != null && !string.IsNullOrEmpty(_settings.outgoingApplicationSid))
                {
                    outgoingApplicationSid = _settings.outgoingApplicationSid;
                }
                var scopes = new HashSet<IScope>
                {
                    new OutgoingClientScope(outgoingApplicationSid)
                };
                if (_settings != null && !string.IsNullOrEmpty(_settings.twilioAccountSid))
                {
                    twilioAccountSid = _settings.twilioAccountSid;
                }
               
                if (_settings != null && !string.IsNullOrEmpty(_settings.authToken))
                {
                    authToken = _settings.authToken;
                }
                var capability = new ClientCapability(twilioAccountSid, authToken, scopes: scopes);

                result.StatusCode = 200;
                result.ResponseMessage = capability.ToJwt();

                return Ok(result);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("call")]
        [Obsolete]
        public ActionResult StartCall([FromForm] VoiceRequestModal request)
        {
            var response = new VoiceResponse();
            string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            if (!string.IsNullOrEmpty(request.To))
            {


                var statusCallbackEvent = new List<Number.EventEnum> {
                    "initiated",
                    "ringing",
                    "answered",
                    "completed",
                    "reject",
                    "busy"
                };

                if (string.IsNullOrEmpty(request.AccountId))
                {
                    request.AccountId = "0";
                }
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyId);
                if (_settings != null && !string.IsNullOrEmpty(_settings.fromPhone))
                {
                    fromNumber = _settings.fromPhone;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.actionURL))
                {
                    actionURL = _settings.actionURL;
                }
                var dial = new Dial(callerId: fromNumber, record: RecordEnum.RecordFromAnswer, answerOnBridge: true);
                dial.Number(phoneNumber: new PhoneNumber(request.To),
                    statusCallback: new Uri(actionURL),
                    statusCallbackEvent: statusCallbackEvent,
                    sendDigits: request.AccountId + "/" + request.CompanyId,
                    statusCallbackMethod: Twilio.Http.HttpMethod.Post
                   );

                response.Append(dial);
                Console.WriteLine("From call" + JsonConvert.SerializeObject(request));
                var data = _twilioService.statusCallBackForCompany(request, fromNumber, Convert.ToInt32(request.CompanyId), request.UserId.ToString(), request.AccountId);
                var data1 = HttpContext.Session.GetString("UserId");
            }
            else
            {
                response.Say("Invalid Mobile Number. Please try with diffrence one.");
            }
            return Content(response.ToString(), "text/xml");
        }

        [HttpPost("testcall")]
        [Obsolete]
        public ActionResult testcall([FromForm] VoiceRequestModal request)
        {
            var response = new VoiceResponse();
                long CompanyId = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);

            if (!string.IsNullOrEmpty(request.To))
            {
                var statusCallbackEvent = new List<Number.EventEnum> {
                    "initiated",
                    "ringing",
                    "answered",
                    "completed"
                };
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyId.ToString());
                if (_settings != null && !string.IsNullOrEmpty(_settings.fromPhone))
                {
                    fromNumber = _settings.fromPhone;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.actionURL))
                {
                    actionURL = _settings.actionURL;
                }
                var dial = new Dial(callerId: fromNumber, record: RecordEnum.RecordFromAnswer, answerOnBridge: true);

                dial.Number(phoneNumber: new PhoneNumber(request.To),
                    statusCallback: new Uri(actionURL),
                    statusCallbackEvent: statusCallbackEvent,
                    statusCallbackMethod: Twilio.Http.HttpMethod.Post
                   );
                response.Append(dial);

                //string UserId = "";

                // var data =  _twilioService.statusCallBackForCompany(request, CompanyId, UserId.ToString(), request.AccountId);
            }
            else
            {
                response.Say("Invalid Mobile Number. Please try with diffrence one.");
            }

            return Content(response.ToString(), "text/xml");
        }
        public async Task<IActionResult> HoldVoiceCall()
        {
            return Ok();
        }
       
        [HttpPost("roomStatusCallBack")]
        public async Task<IActionResult> roomStatusCallBack([FromForm] RoomsStatusRequest request)
        {
            try
            {
                if (request.ParticipantSid != null)
                {
                    string obj = "[" + JsonConvert.SerializeObject(request) + "]";
                    await _videoService.VideoCallLogHistory(obj);
                }
            }
            catch (Exception ex)
            {
                return Ok(request);
            }
            return Ok(request);
        }
       
        [HttpPost("statusCallBack")]
        public async Task<IActionResult> statusCallBack([FromForm] StatusCallbackRequest request)
        {
            ResultResponseModel result = new ResultResponseModel();
            string UserId = "";
            string AccountId = "";
            string CompanyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            Console.WriteLine("from call back" + JsonConvert.SerializeObject(request));
            //if(request.CallStatus!="ringing")
            //{
            _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(CompanyId);
            if (_settings != null && !string.IsNullOrEmpty(_settings.fromPhone))
            {
                fromNumber = _settings.fromPhone;
            }
            var data = await _twilioService.statusCallBack(request, fromNumber, 0, "", "");
            if (data == "1")
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Call Log Detail has been save successfully";
            }
            else if (data == "2")
            {
                result.StatusCode = 200;
                result.ResponseMessage = "Call Log Detail has been updated successfully";
            }
            else
            {
                result.StatusCode = 500;
                result.ResponseMessage = "Some thing went wrong, Please try again later!";
            }

            if (request.CallStatus == "failed")
            {
                request.CallStatus = "completed";
            }
            //}
            //else
            //{
            //    result.StatusCode = 500;
            //    result.ResponseMessage = "Some thing went wrong, Please try again later!";
            //}

            return Ok(request);
        }

        [HttpPost("recordingStatusCallBack")]
        public ActionResult recordingStatusCallBack([FromForm] VoiceCallModel request)
        {
            return Content("", "text/xml");
        }

        [HttpGet]
        [Route("GetPhoneNumberForCall")]
        public async Task<IActionResult> GetPhoneNumber(long primaryId, long refId, string columnName, string refTable, string refColumn)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                var data = await _twilioService.GetPhoneNumber(primaryId, refId, columnName, refTable, refColumn);

                if (!string.IsNullOrEmpty(data))
                {
                    result.StatusCode = 200;
                    result.ResponseMessage = data;
                }
                else
                {
                    result.StatusCode = 500;
                    result.ResponseMessage = "Phone Number not found.";
                }

                return Ok(result);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("SendSms")]
        public IActionResult SendSms(string toNumber, long refId)
        {

            ResultResponseModel result = new ResultResponseModel();
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            
            try
            {
                _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyid);
                if (_settings != null && !string.IsNullOrEmpty(_settings.twilioAccountSid))
                {
                    twilioAccountSid = _settings.twilioAccountSid;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.fromPhone))
                {
                    fromNumber = _settings.fromPhone;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.smsStatusCallBackURL))
                {
                    smsStatusCallBack = _settings.smsStatusCallBackURL;
                }
                if (_settings != null && !string.IsNullOrEmpty(_settings.messagingServiceSid))
                {
                    messagingServiceSid = _settings.messagingServiceSid;
                }

                TwilioClient.Init(twilioAccountSid, authToken);
                var message = MessageResource.Create(
                body: "Your meeting is going to start in next 5 minutes!",
                messagingServiceSid: messagingServiceSid,
                from: new PhoneNumber(fromNumber),
                statusCallback: new Uri(smsStatusCallBack),
                to: new PhoneNumber(toNumber)
                );
                result.StatusCode = 200;
                result.ResponseMessage = $"Message {message.Status}";
                _commonService.SaveSMSResponse(toNumber, twilioAccountSid, message.ApiVersion, message.Status.ToString(), message.Sid, message.MessagingServiceSid,
                    fromNumber, null, null, message.Body, message.DateCreated, "OutBound", refId, null, Convert.ToInt64(companyid), Guid.Parse(userid));
            }
            catch (Exception ex)
            {
                result.StatusCode = 500;
                result.ResponseMessage = ex.Message;
                return Ok(result);
            }
            return Ok(result);
        }
        [HttpPost]
        [Route("SMSResponse")]
        public IActionResult GetSMSResponse([FromForm] SmsResponse smsResponse)
        {
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;

            _settings = _companyIntegrationSettingService.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.messagingServiceSid))
            {
                messagingServiceSid = _settings.messagingServiceSid;
            }
            _commonService.SaveSMSResponse(smsResponse.To, smsResponse.AccountSid, smsResponse.ApiVersion, smsResponse.MessageStatus.ToString(), smsResponse.SmsSid, messagingServiceSid,
                smsResponse.From, null, null, null, null, "OutBound", null, null, null, Guid.Empty);
            return Content("Handled");
        }

        [HttpGet("token")]
        public IActionResult GetToken(string username,string companyid)
       => new JsonResult(new { token = _videoService.GetTwilioJwt(username,companyid) });
        [HttpPost]
        [Route("CreateRoom")]
        public IActionResult CreateRoom(string uniqueName)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                var room = _videoService.CreateRoom(uniqueName);
                responseModel.StatusCode = 200;
                responseModel.ResponseMessage = "Video call room has been created successfully";
                responseModel.Result = room;
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                responseModel.StatusCode = 400;
                responseModel.ResponseMessage = ex.Message;
                return Ok(responseModel);
            }
        }
        [HttpGet("rooms")]
        public async Task<IActionResult> GetRooms(string joinId)
        {
            var response = await _videoService.GetAllRoomsAsync(joinId);
            return new JsonResult(response);
        }
        [HttpGet("cancel")]
        public IActionResult CancelRoom(string roomSid)
        {
            try
            {
                return new JsonResult(_videoService.CancelRooms(roomSid));
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }

        }

    }
}
