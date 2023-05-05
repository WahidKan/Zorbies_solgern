using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using System.Collections.Generic;
using System.IO;
using Solgen.WebApi.HubConfig;
using System.Drawing;
using System.Net.Http;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Notes")]
    public class NotesController : Controller
    {
        private readonly INotesService notesService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IRealTimeService _realTimeService;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        public NotesController(INotesService notesService, ICommonService commonService, IHttpContextAccessor httpContext, IRealTimeService realTimeService)
        {
            this.notesService = notesService;
            this._commonService = commonService;
            _httpContext = httpContext;
            _realTimeService = realTimeService;
        }

        [HttpPost]
        [Authorize]
        /*! 
      * \brief   Add update notes.
      * \details Function is used to Add update notes.
      * \author  deepak jha.
      * \date    24 oct 2019    
      * \version 1.0    
      */
        public IActionResult Post([FromBody] NotesHistory model)
        {
            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.NotesAddedById = userid.ToGuid();

            var data = notesService.Save(model);
            result.StatusCode = 200;
            if (model.NotesHistoryId == null)
            {
                _commonService.AddActivityLog(userid, IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Add.ToString(),
                    " has added new Note for @contactname", Convert.ToString(model.NotesAddedForId));
                result.ResponseMessage = "Notes has been added successfully.";
            }
            else { result.ResponseMessage = "Error!"; }
            return Ok(result);
        }

        [Route("GetList")]
        [HttpGet]
        /*! 
      * \brief   Get the listing of notes.
      * \details Function is used to Get the listing of notes..
      * \author  deepak jha.
      * \date    24 oct 2019    
      * \version 1.0    
      */
        public IActionResult GetList(string notesComment, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            return Ok(notesService.GetList(notesComment, sortColumn, sortDir, page, pageSize, userId));
        }
        [Route("NewNoteSave")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> NewNoteSave([FromForm] Notes model)
        {
            ResultResponseModel result = new ResultResponseModel();

            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            model.userid = userid.ToGuid();
            string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
            string filePrefix = "notesFile";
            model.Companyid = CompanyID;
            dynamic dataFileName;
            List<UploadFileModelList> list = new List<UploadFileModelList>();
            if (Request.Form.Files.Count > 0)
            {
                // Util.UploadAttachmentNode(Request.Form.Files, filePrefix).GetAwaiter().GetResult();// comment by aakash goyal

                //var fileResult = Util.UploadMultipleFileFromBase64(Request.Form.Files, filePath, filePrefix);

                foreach (FormFile item in Request.Form.Files)
                {
                    //var fileUrl = CommonFunctions.GetFileLink(item.Key, "image", enumFileFolder.user); ;
                    //string domainName = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                    //var fileUrl = Path.Combine(domainName, item.ToString());
                    //string ext = System.IO.Path.GetExtension(fileUrl);
                    //string fileName = Util.GetFileExtensionFromUrl(fileUrl);
                    //string tempFileUrl = fileUrl;
                    //if (fileUrl.Contains("defaultNoImage"))
                    //{
                    //    fileUrl = "javascript:void(0);";
                    //}
                    //else
                    //{
                    //    fileUrl = fileUrl.Replace("wwwroot", "");
                    //}
                    var fileUrl = "";
                    string fileName = "";
                    string ext = "";
                    HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                    if (NodefilePath.Headers.Location != null)
                    {
                        string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                        var url = nodeFileUrl.Split("//");
                        if (url.Count() > 0)
                        {
                             fileUrl = "https://" + url[1];
                        }

                         fileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                         ext = System.IO.Path.GetExtension(nodeFileUrl);
                    }
                        list.Add(new UploadFileModelList()
                    {
                        NoteId = model.noteid,
                        AccountId = model.objectrefid,
                        UserId = userid,
                        CompanyId = CompanyID.ToString(),
                        FileUrl = fileUrl,
                        ModuleId = model.moduleName,
                        SubModuleId = model.submoduleName,
                        FileName = fileName.Replace("\\", ""),
                        Extension = ext.Replace(".", ""),
                        ParentType = "notes",
                        isMediaServer=true
                        });


                    //===========================================================

                    IFormFileCollection File = Request.Form.Files;
                    string fileExtension = System.IO.Path.GetExtension(File[0].FileName);

                    if (ext == ".jpeg" || ext == ".png" || ext == ".jpg")
                    {
                        string filePrefixName = "notesFilethumbnail";
                        var stream = File[0].OpenReadStream();
                        string fileWithPath = Path.Combine(filePath, filePrefixName + "_" + DateTime.Now.Ticks + ext);
                      //  Crop(50, 50, stream, fileWithPath);
                    };

                    //===========================================================

                }
            }
          
            int data = notesService.NewNoteSave(model);
            if (model.noteid == null || model.noteid == 0)
            {
                foreach (var item in list)
                {
                    item.NoteId = data;
                }
                int returnFileUploadData = notesService.SaveFileUploadingDetails(list);
            }
            else
            {
                int returnFileUploadData = notesService.SaveFileUploadingDetails(list);
            }

            if (data != 0)
            {
                string domainName = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                model.DomainName =  model.DomainName.Replace(domainName, "");
                if (model.notifyTo != null && (model.noteid == null || model.noteid == 0))
                {
                    
                    if (model.isReplyNotes == true)
                    {
                        List<string> notifications = model.assignTo.Split(",").ToList();
                        
                        if(model.assignTo!=userid)
                        {
                            var notification = new NotificationSendModel()
                            {
                                CcUser = new string[1] { model.assignTo.ToString() },
                                Subject = "Reply note",
                                //  New Note added by Harris Singh: This is a test note...
                                SubjectBody = "Reply Note by " + (User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value).ToUpper() + ": " + model.notesComments,
                                RouteUrl = model.DomainName,//"workorder/view/" + model.objectrefid, //"/notifications",
                                ObjectId = model.objectrefid.ToString(),
                                CreatedBy = model.userid.ToString(),
                                //string joined = string.Join(",", strings);
                                UserIdList = notifications,
                                CompanyId = CompanyID.ToString(),

                            };
                            _realTimeService.SendNotification(notification);
                        }
                        
                    }
                    else
                    {
                        List<string> notifications = model.notifyTo.Split(",").ToList();
                        var notification = new NotificationSendModel()
                        {

                            CcUser = new string[1] { model.notifyTo.ToString() },
                            Subject = "Add new notes",
                            //  New Note added by Harris Singh: This is a test note...
                            SubjectBody = "New note added by " + (User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value).ToUpper() + ": " + model.notesComments,
                            RouteUrl = "/"+model.DomainName,//"workorder/view/" + model.objectrefid, //"/notifications",

                            ObjectId = model.objectrefid.ToString(),
                            CreatedBy = model.userid.ToString(),
                            //string joined = string.Join(",", strings);
                            UserIdList = notifications,
                            CompanyId = CompanyID.ToString(),

                        };
                        _realTimeService.SendNotification(notification);
                    }
                    
                }

                result.StatusCode = 200;
                if (model.isReplyNotes == true)
                {
                    result.ResponseMessage = "Note reply has been sent successfully.";
                }
                else
                {
                    result.ResponseMessage = "Note has been added successfully.";
                }
                   
            }
            else
            {
                result.StatusCode = 500;
            }


            return Ok(result);
        }

        //=====================Resize img=========================
        public static void Crop(int Width, int Height, Stream streamImg, string saveFilePath)
        {
            Bitmap sourceImage = new Bitmap(streamImg);
            using (Bitmap objBitmap = new Bitmap(Width, Height))
            {
                objBitmap.SetResolution(sourceImage.HorizontalResolution, sourceImage.VerticalResolution);
                using (Graphics objGraphics = Graphics.FromImage(objBitmap))
                {
                    // Set the graphic format for better result cropping   
                    objGraphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;

                    objGraphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    objGraphics.DrawImage(sourceImage, 0, 0, Width, Height);

                    string path = Directory.GetCurrentDirectory();
                    // Save the file path, note we use png format to support png file   
                 //   objBitmap.Save(Directory.GetCurrentDirectory()+"/abc.jpg");
                    objBitmap.Save(saveFilePath);
                }
            }
        }
        //========================================================


        [HttpGet]
        [Authorize]
        [Route("GetImageList")]
        public IActionResult GetImageList(string noteId, string modulename, string objectRefId)
        {

            var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var data = notesService.GetNoteImageList(noteId, modulename, objectRefId, companyID.ToString(), userId.ToString());
            return Ok(data);
        }
        [HttpGet]
        [Authorize]
        [Route("deleteMulipleUploadingImageImage")]
        public IActionResult deleteMulipleUploadingImageImage(string Id, string noteId, string modulename, string objectRefId)
        {
            var userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
            long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            var data = notesService.deleteMulipleUploadingImageImage(Id, noteId, modulename, objectRefId, companyID.ToString(), userId.ToString());
            return Ok(data);
        }
        [HttpGet]
        [Authorize]
        [Route("getNoteslist")]
        public IActionResult getNoteslist(long leadid,string searchText, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId,Boolean view)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = notesService.getNoteslist(leadid, searchText, submodulename, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID, view);
                foreach (var item in data.Data)
                {
                    item.fileUrl = CommonFunctions.GetFileLink(item.fileUrl, "image", enumFileFolder.user);
                    if (item.fileUrl.Contains("defaultNoImage"))
                    {
                        item.fileUrl = "javascript:void(0);";

                    }
                    else
                    {

                        item.fileUrl = item.fileUrl.Replace("wwwroot", "");
                    }
                }

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }

        [HttpGet]
        [Authorize]
        [Route("getNoteslistForCardView")]
        public IActionResult getNoteslistForCardView(long leadid, string submodulename, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = notesService.getNoteslistForCardView(leadid, submodulename, objectname, SortColumn, SortDir, PageNo, PageSize, userId, companyID);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpGet]
        [Authorize]
        [Route("getNoteslistForNotesThreadsByNoteId")]
        public IActionResult getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(long leadid,string NotesId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string submodulename = "";string objectname = "";string SortColumn = "";string SortDir = "";int PageNo = 0;int PageSize = 0;

            try
            {
               Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = notesService.getNoteslistForCardViewgetNoteslistForNotesThreadsByNoteId(leadid, NotesId, companyID, submodulename, objectname, SortColumn, SortDir, PageNo, PageSize, userId);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [Route("GetNoteCurentDataList")]
        [HttpGet]
        [Authorize]
        public IActionResult GetNoteCurentDataList(string leadid, string NotesId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            string submodulename = ""; string objectname = ""; string SortColumn = ""; string SortDir = ""; int PageNo = 0; int PageSize = 0;

            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = notesService.GetNoteCurentDataList(leadid, NotesId, companyID.ToString(), userId);

                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [Route("DeleteNote")]
        [HttpGet]
        [Authorize]
        public int DeleteNote(string id)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = notesService.DeleteNote(id, userId);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [Route("PinNote")]
        [HttpGet]
        [Authorize]
        public int PinNote(string id)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = notesService.PinNote(id, userId.ToString(), companyID);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpGet]
        [Authorize]
        [Route("SetNotesToRead")]
        /*! 
      * \brief   Update status for notidfication.
      * \details Function is used to set the status for notidfication..
      * \author  Anish K.
      * \date    24 Oct 2019    
      * \version 1.0    
      */
        public IActionResult SetNotesToRead(string noteid)
        {
            int companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            string userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = notesService.SetNotesToRead(noteid, companyId.ToString());
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetWorkOrderTypeBasedonWorkorder")]
        public IActionResult GetWorkOrderTypeBasedonWorkorder(string accountId, string objectRefId,string submoduleName)
        {
            int companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            string userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = notesService.GetWorkOrderTypeBasedonWorkorder(accountId, objectRefId, userId, companyId.ToString(), submoduleName);
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("GetChangeStatusForAddmin")]
        public IActionResult GetChangeStatusForAddmin(string objectRefId,string notesId, string status)
        {
            int companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            string userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = "";
            if (status!=null && status!="")
            {
                 result = notesService.GetChangeStatusForAddmin(objectRefId, userId, companyId.ToString(), notesId, status);
            }
            else
            {
                 result = "";
            }
            
            return Ok(result);
        }
    }

    
}