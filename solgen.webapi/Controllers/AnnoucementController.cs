using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml.FormulaParsing.Utilities;
using Solgen.Core;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Solgen.Core.Models;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Route("api/announcement")]
    [ApiController]
    public class AnnoucementController : ControllerBase
    {
        private readonly IAnnoucementService _annoucementService;
        private readonly IConfiguration configuration;
        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        private Guid parsedUserID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        private long UserTypeID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "UserTypeID")?.Value); } }

        public IHostingEnvironment Environment { get; }

        public AnnoucementController(IAnnoucementService annoucementService, IConfiguration iConfig, IHostingEnvironment environment)
        {
            configuration = iConfig;
            _annoucementService = annoucementService;
            Environment = environment;
        }

        [HttpGet]
        [Authorize]
        [Route("GetAnnouncementList")]
        public IActionResult GetAnnouncementList(string title, string sortColumn, string sortDir, int page, int pageSize)
        {
            return Ok(_annoucementService.GetAnnouncementList(title, sortColumn, sortDir, page, pageSize, userID.ToString(), companyID));
        }

        [HttpGet]
        [Authorize]
        [Route("Delete")]
        /*! 
        * \brief  delete record of Announcement.
        * \details Function is used to delete Announcement.
        * \author  Vinay Mahajan 
        * \date    26 Nov 2020
        * \version 1.0    
        */
        public IActionResult Delete(string ids)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _annoucementService.DeleteAnnouncement(userID.ToString(), "tblAnnouncements", "id", ids);
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
        [Route("DeleteMultipleAnnouncements")]
        /*! 
        * \brief  delete record of Announcement.
        * \details Function is used to delete Announcement.
        * \author  Vinay Mahajan 
        * \date    26 Nov 2020
        * \version 1.0    
        */
        public IActionResult DeleteMultipleAnnouncements(string ids)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string data = ids.Replace("undefined", "");
                var dataFinal = data.Remove(data.Length - 1, 1);
                var result = _annoucementService.DeleteAnnouncement(userID.ToString(), "tblAnnouncements", "id", dataFinal);
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
        [Route("ChangeStatus")]
        /*! 
        * \brief  Change Status of Announcement.
        * \details Function is used to change Announcement Status.
        * \author  Vinay Mahajan 
        * \date    26 Nov 2020
        * \version 1.0    
        */
        public IActionResult ChangeStatus(string ids, long statusId)
        {
            ResultResponseModel result = new ResultResponseModel();
            var effectedRow = _annoucementService.ChangeStatus(userID.ToString(), "tblAnnouncements", "id", ids, statusId);
            if (effectedRow != null)
            {
                result.ResponseMessage = "Success";
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else
            {
                result.ResponseMessage = "Error";
                result.StatusCode = (int)HttpStatusCode.OK;

            }
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("GetDashboardAnnoucements/{isFirstTime}")]
        public async Task<IActionResult> GetDashboardAnnoucements(bool isFirstTime)
        {
            try
            {
                var _baseurl = configuration.GetValue<string>("CommonSettings:SiteLink");
                var _result = await _annoucementService.GetAnnoucementForDashboardByUserTypeId(UserTypeID, companyID, isFirstTime);
                foreach (var item in _result)
                {
                    item.ProfilePic = (CommonFunctions.GetFileLink(item.ProfilePic, "image", enumFileFolder.user)).Replace("wwwroot", "");
                    if (!string.IsNullOrEmpty(item.FilePath))
                    {
                        item.FilePath = string.Concat(_baseurl, (item.FilePath).Replace("wwwroot", ""));
                    }
                }


                return Ok(_result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }


        }
        [HttpPost]
        [Authorize]
        [Route("saveAnnouncement")]
        public async Task<IActionResult> saveAnnouncement([FromForm] AnnouncementModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();

            try
            {
                if (model.Usertype == "null")
                {
                    model.Usertype = null;
                }
                if (Request.Form.Files.Count > 0)
                {
                    var fileResult = Util.UploadFileFromBase64(Request.Form.Files, CommonSettings.AppSetting["CommonSettings:UploadAnnouncementsData"], "Announcement");
                    model.FileName = fileResult.Item1;
                    model.File = fileResult.Item2;
                }

                model.User_id = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                var _result = await _annoucementService.saveAnnouncement(model, companyID);
                if (_result > 0)
                {
                    if (model.Id == 0)
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Announcement has been added successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Announcement has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong.";
                    return Ok(resultResponseModel);
                }
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong.";
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Route("GetAnnouncementDetailById")]
        [Authorize]
        public IActionResult GetAnnouncementDetailById(long? id)
        {
            var result = _annoucementService.GetAnnouncementDetailById(id, companyID, userID);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpGet]
        [Route("CallLogList")]
        [Authorize]
        
       

        public IActionResult CallLogList(string accountId, string contactId, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageSizeValue, 
            int pageSize)
        {
            var result = _annoucementService.CallLogList(parsedUserID, accountId, contactId, From, To, sortColumn, sortDir, pageSizeValue, pageSize, companyID);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }
    }
}