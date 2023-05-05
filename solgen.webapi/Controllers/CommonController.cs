using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Data.Common;
using System.Data.SqlClient;
using Dapper;
using System.Collections;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Drawing;
using Font = iTextSharp.text.Font;
using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using Solgen.Repository;
using System.Net.Mail;
using Solgen.WebApi.HubConfig;
using Newtonsoft.Json.Linq;
using Syncfusion.Pdf.Parsing;
using System.Web;
using System.Net;
using Solgen.WebApi.Services;
using Syncfusion.Drawing;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Common")]
    public class CommonController : Controller
    {

        private IUserService _userService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private IEmailTemplateRepository _emailTemplateRepository;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly IEmailSettingsService _emailSettingsService;
        private readonly IConfiguration _config;
        private readonly SolgenDbContext _dbContext;
        private IConfigurationSettingService _configurationSettingService;
        private readonly IRealTimeService _realTimeService;
        private readonly IVideoService _videoService;

        private IProposalService _proposalService;
        private IVendorService _vendorService;
        private IWorkOrderService _workOrderService;
        private readonly ISignNowService _signNowService; //Handles SingNow API calls
        private readonly IFormstackSignService _formstackSignService; //Handles Formstack Sing API calls (NOT IN USE)

        public CommonController(UserManager<ApplicationUser> userManager, IUserService userService, ICommonService commonService, IHttpContextAccessor httpContext,
            IConfiguration config, IEmailSettingsService emailSettingsService, SignInManager<ApplicationUser> signinManager, IEmailTemplateRepository emailTemplateRepository
            , IConfigurationSettingService configurationSettingService, IRealTimeService realTimeService, IVideoService videoService,
            IProposalService proposalService, IVendorService vendorService, IWorkOrderService workOrderService, ISignNowService signNowService,
            IFormstackSignService formstackSignService, ILogService logService)
        {
            _videoService = videoService;
            _userManager = userManager;
            _userService = userService;
            _commonService = commonService;
            _httpContext = httpContext;
            _emailSettingsService = emailSettingsService;
            _config = config;
            _emailTemplateRepository = emailTemplateRepository;
            _configurationSettingService = configurationSettingService;
            _realTimeService = realTimeService;

            _proposalService = proposalService;
            _vendorService = vendorService;
            _workOrderService = workOrderService;
            _signNowService = signNowService;
            _formstackSignService = formstackSignService;
            this.logService = logService;
        }
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        private Guid parsedUserID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public ILogService logService { get; }

        /*! 
        * \brief   Get the State list .
        * \details Function is used to fetch the list of Get the  list of State for drp purpose.
        * \author  deepak jha 
        * \date    06 oct 2019
        * \version 1.0    
        */
        [HttpGet]
        [Authorize]
        [Route("GetStatesList")]
        public IActionResult GetStatesList()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            try
            {
                list = _commonService.GetStateList();
                return Ok(list);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        

        // get state list for storefront
        
        [HttpGet]
        [AllowAnonymous]
        [Route("GetStatesListForStorefront")]
        public IActionResult GetStatesListForStorefront()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            try
            {
                list = _commonService.GetStateList();
                return Ok(list);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetStatesList_V1")]
        public IActionResult GetStatesList_V1(string code)
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            try
            {
                list = _commonService.GetStateList_V1(code);
                return Ok(list);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        /*! 
        * \brief   Get the template list .
        * \details Function is used to fetch the list of template name for drp purpose
        * \author  deepak jha 
        * \date    06 Nov 2019
        * \version 1.0    
        */
        [HttpGet]
        [Authorize]
        [Route("GetTemplateList")]
        public IActionResult GetTemplateList()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            try
            {
                list = _commonService.GetTemplateList(companyID);
                return Ok(list);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        /*! 
             *  \brief     Get API.
             *  \details   This API is used to State list.
             *  \author    Dheeraj
             *  \version   1.0
             *  \date      11 Oct 2020
             *  \pre       First initialize the system.
             *  \copyright Solgen.
             */
        [HttpGet]
        [Authorize]
        [Route("LAAccountList")]
        public IActionResult LAAccountList()
        {
            List<SelectItemModel> list = new List<SelectItemModel>();
            list = _commonService.LAAccountList();
            return Ok(list);
        }


        [HttpGet]
        [Authorize]
        [Route("GetMasterItems/{masterNames}")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetMasterItems(string masterNames, string masterKeyText = "")
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = _commonService.GetMasterItems(masterNames, parsedUserID, companyID, masterKeyText);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetMasterItemsMultiple")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetMasterItemsMultiple(string masterNames, string masterKeyText = "")
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = _commonService.GetMasterItems(masterNames, parsedUserID, companyID, masterKeyText);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetMasterItemsForMultipleId/{ModuleName}/{SubModuleCode}")]
        public IActionResult GetMasterItemsForMultipleId(string ModuleName, string SubModuleCode)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = _commonService.GetMasterItemsForMultipleId(ModuleName, parsedUserID, companyID, SubModuleCode);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("DeleteRecord")]
        /*! 
           * \brief   Delete Record from table
           * \details Function is used to delete record from the table
           * \author  Kiran Bala 
           * \date    17 Sep 2019
           * \version 1.0    
           */
        public IActionResult DeleteRecord(string tableName, string primaryKey, string moduleName)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string tbName = CommonFunctions.GetTableName(tableName);
                if (string.IsNullOrEmpty(tbName))
                {
                    resultResponseModel.StatusCode = 201;
                    resultResponseModel.ResponseMessage = "Not able to delete the record. Please contact Site Administrator.";
                    return Ok(resultResponseModel);
                }
                var result = _commonService.DeleteRecord(tbName, primaryKey);

                if (moduleName == "Vendor")
                {
                    _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(),
                        " has deleted the Vendor <strong>" + result.Name + "</strong>");
                }
                else
                {
                    _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Delete.ToString(),
                        " has deleted the Bank <strong>" + result.Name + "</strong>");
                }


                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = moduleName + " has been deleted successfully.";
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
        [Route("UpdateActiveInactiveStatus")]
        /*! 
        * \brief   Update Status
        * \details Function is used to update status(Active/inactive)
        * \author  Kiran Bala 
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public IActionResult UpdateActiveInactiveStatus(string tableName, string primaryKey, string status, string moduleName, string statusName)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string tbName = CommonFunctions.GetTableName(tableName);
                if (string.IsNullOrEmpty(tbName))
                {
                    resultResponseModel.StatusCode = 201;
                    resultResponseModel.ResponseMessage = "Not able to delete the record. Please contact Site Administrator.";
                    return Ok(resultResponseModel);
                }
                var result = _commonService.UpdateActiveInactiveStatus(tbName, primaryKey, status);

                //activity log
                if (tbName == "tblVendor")
                {
                    if (statusName.ToLower() == "enable")
                    {
                        _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(),
                            "has set status of Vendor <strong>" + result.Name + "</strong> to Active");
                    }
                    else if (statusName.ToLower() == "disable")
                    {
                        _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(), "has set status of Vendor <strong>" + result.Name + "</strong> to  In-Active");
                    }
                }
                else
                {
                    if (statusName.ToLower() == "enable")
                    {
                        _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Enable.ToString(),
                            "has set status of Bank <strong>" + result.Name + "</strong> to Active");
                    }
                    else if (statusName.ToLower() == "disable")
                    {
                        _commonService.AddActivityLog(userID.ToString(), IPAddress, WebBrowser, OSWebBrowser, enumActivityLogType.Disable.ToString(), "has set status of Bank <strong>" + result.Name + "</strong> to  In-Active");
                    }
                }

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Status has been updated successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [Route("ExportExcelInvoice/{type}/{filename}/{pageLength}")]
        [HttpPost]
        /*! 
        * \brief   Export And Import excel sheet for single table
        * \details Function is used to Export And Import excel sheet And Pdf
        * \author  Dhiraj patyal
        * \date    17 Oct 2019
        * \version 1.0    
        */
        public IActionResult ExportExcelInvoice(string filename, string type, string pageLength, [FromBody] List<dynamic> records)
        {
            if (type == "Excel")
            {
                DataTable dt = CommonFunctions.ToDataTable(records);
                DataTable dtCommision = new DataTable();
                if (dt.Columns.Contains("TotalRecord"))
                    dt.Columns.Remove("TotalRecord");

                string cellNumber = "A1";

                if (dt.Rows.Count > 0 && dt.Columns.Contains("ContractorNameExport"))
                {//called from Commision Paid Report
                    dtCommision.Columns.Add("Col1", typeof(string));
                    dtCommision.Columns.Add("Col2", typeof(string));
                    dtCommision.Rows.Add("Contractor Name", Convert.ToString(dt.Rows[0]["ContractorNameExport"]));
                    dtCommision.Rows.Add("Start Date", Convert.ToString(dt.Rows[0]["ContractorStDateExport"]));
                    dtCommision.Rows.Add("End Date", Convert.ToString(dt.Rows[0]["ContractorEndDateExport"]));
                    dtCommision.Rows.Add("Commision - Placement Fee", Convert.ToString(dt.Rows[0]["CommissionFormulaExport"]));
                    cellNumber = "A7";

                    dt.Columns.Remove("ContractorNameExport");
                    dt.Columns.Remove("ContractorStDateExport");
                    dt.Columns.Remove("ContractorEndDateExport");
                    dt.Columns.Remove("CommissionFormulaExport");

                }
                byte[] fileContents;
                using (var package = new ExcelPackage())
                {
                    var worksheet = package.Workbook.Worksheets.Add(filename);
                    worksheet.Cells[cellNumber].LoadFromDataTable(dt, true);
                    if (dtCommision.Rows.Count > 0)
                    {
                        worksheet.Cells["A1"].LoadFromDataTable(dtCommision, false);
                        worksheet.SelectedRange["A7:Z7"].Style.Font.Bold = true;
                    }
                    else
                    {
                        worksheet.SelectedRange["A1:Z1"].Style.Font.Bold = true;
                    }
                    fileContents = package.GetAsByteArray();
                }
                if (fileContents == null || fileContents.Length == 0)
                {
                    return NotFound();
                }
                return File(
                    fileContents: fileContents,
                    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    fileDownloadName: filename + ".xlsx"
                );
            }
            else if (type == "CSV")
            {
                DataTable dt = CommonFunctions.ToDataTable(records);
                string str = string.Empty;

                StringBuilder sb = new StringBuilder();
                for (int k = 0; k < dt.Columns.Count; k++)
                {
                    //add separator
                    sb.Append(dt.Columns[k].ColumnName + ',');
                }
                //append new line
                sb.Append("\r\n");
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    for (int k = 0; k < dt.Columns.Count; k++)
                    {
                        //add separator
                        sb.Append(dt.Rows[i][k].ToString().Replace(",", ";") + ',');
                    }
                    //append new line
                    sb.Append("\r\n");
                }
                byte[] fileContents;
                using (var package = new ExcelPackage())
                {
                    var worksheet = package.Workbook.Worksheets.Add(filename);
                    worksheet.Cells["A1"].LoadFromText(sb.ToString());
                    fileContents = package.GetAsByteArray();
                }
                if (fileContents == null || fileContents.Length == 0)
                {
                    return NotFound();
                }
                return File(new System.Text.UTF8Encoding().GetBytes(sb.ToString()), "text/csv", filename + ".csv");

            }

            else if (type == "PDF")
            {
                DataTable dt = CommonFunctions.ToDataTable(records);
                DataTable dtCommision = new DataTable();
                if (dt.Columns.Contains("TotalRecord"))
                    dt.Columns.Remove("TotalRecord");
                Document document = null;
                if (pageLength == "Large")
                {
                    document = new Document(PageSize.A0, 15, 15, 15, 15);
                }
                else
                {
                    document = new Document();
                }

                var streamOut = new MemoryStream();
                PdfWriter writer = PdfWriter.GetInstance(document, streamOut);
                document.Open();

                if (dt.Rows.Count > 0 && dt.Columns.Contains("ContractorNameExport"))
                {//called from Commision Paid Report
                    dtCommision.Columns.Add("Col1", typeof(string));
                    dtCommision.Columns.Add("Col2", typeof(string));
                    dtCommision.Rows.Add("Contractor Name", Convert.ToString(dt.Rows[0]["ContractorNameExport"]));
                    dtCommision.Rows.Add("Start Date", Convert.ToString(dt.Rows[0]["ContractorStDateExport"]));
                    dtCommision.Rows.Add("End Date", Convert.ToString(dt.Rows[0]["ContractorEndDateExport"]));
                    dtCommision.Rows.Add("Commision - Placement Fee", Convert.ToString(dt.Rows[0]["CommissionFormulaExport"]));

                    dt.Columns.Remove("ContractorNameExport");
                    dt.Columns.Remove("ContractorStDateExport");
                    dt.Columns.Remove("ContractorEndDateExport");
                    dt.Columns.Remove("CommissionFormulaExport");
                }

                Font fontHeader = FontFactory.GetFont(FontFactory.TIMES_BOLD, 15);//TIMES_ROMAN
                Font font5 = FontFactory.GetFont(FontFactory.TIMES, 15);//TIMES_ROMAN
                PdfPTable table = new PdfPTable(dt.Columns.Count);
                PdfPCell cell = new PdfPCell(new Phrase("Products"));
                cell.Colspan = dt.Columns.Count;

                PdfPTable tableContrator = null; PdfPCell cellContrator = null;
                if (dtCommision.Columns.Count > 0)
                {
                    tableContrator = new PdfPTable(dtCommision.Columns.Count);
                    cellContrator = new PdfPCell(new Phrase("Contrator"));
                    cellContrator.Colspan = dtCommision.Columns.Count;

                }
                for (int rows = 0; rows < dtCommision.Rows.Count; rows++)
                {
                    for (int column = 0; column < dtCommision.Columns.Count; column++)
                    {
                        cellContrator = new PdfPCell(new Phrase(new Chunk(dtCommision.Rows[rows][column].ToString(), font5)));
                        tableContrator.AddCell(cellContrator);
                    }
                }
                foreach (DataColumn c in dt.Columns)
                {
                    table.AddCell(new Phrase(c.ColumnName, fontHeader));
                }
                for (int rows = 0; rows < dt.Rows.Count; rows++)
                {
                    for (int column = 0; column < dt.Columns.Count; column++)
                    {
                        cell = new PdfPCell(new Phrase(new Chunk(dt.Rows[rows][column].ToString(), font5)));
                        table.AddCell(cell);
                    }
                }
                if (tableContrator != null)
                    document.Add(tableContrator);
                document.Add(new Paragraph("     "));
                document.Add(table);
                document.Close();
                var fileContentResult = new FileContentResult(streamOut.ToArray(), "application/pdf")
                {
                    FileDownloadName = filename + ".pdf"
                };
                return (fileContentResult);
            }
            return Ok("ok");

        }


        [Route("ExportExcelReportFromTwoTable")]
        [HttpPost]
        /*! 
        * \brief   Export And Import excel sheet for Two table
        * \details Function is used to Export And Import excel sheet And Pdf -
        * - for two table
        * \author  Dhiraj patyal
        * \date    17 Oct 2019
        * \version 1.0    
        */
        public IActionResult ExportExcelReportFromTwoTable([FromBody] dynamic records)
        {
            var typer = records.typer;

            string Filename = records.FM;
            var record1 = records.record1.ToObject<List<dynamic>>();
            var record2 = records.record2.ToObject<List<dynamic>>();

            if (typer == "Excel")
            {
                DataTable dt = CommonFunctions.ToDataTable(record2);
                DataTable dt2 = CommonFunctions.ToDataTable(record1);
                int c = dt.Rows.Count + 3;
                byte[] fileContents;
                using (var package = new ExcelPackage())
                {
                    var worksheet = package.Workbook.Worksheets.Add(Filename);
                    worksheet.Cells["A1"].LoadFromDataTable(dt, true);
                    worksheet.Cells["A" + c].LoadFromDataTable(dt2, true);

                    fileContents = package.GetAsByteArray();
                }
                if (fileContents == null || fileContents.Length == 0)
                {
                    return NotFound();
                }
                return File(
                    fileContents: fileContents,
                    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    fileDownloadName: Filename + ".xlsx"
                );
            }

            return Ok("ok");
        }

        [Route("ExportExcelReportFromSixTable")]
        [HttpPost]
        /*! 
        * \brief   Export And Import excel sheet for Mutiple table
        * \details Function is used to Export And Import excel sheet And Pdf -
        * - for Mutiple table
        * \author  Dhiraj patyal
        * \date    17 Oct 2019
        * \version 1.0    
        */
        public IActionResult ExportExcelReportFromSixTable([FromBody] dynamic records)
        {
            var typer = records.typer;

            string Filename = records.FM;
            var record1 = records.record1.ToObject<List<dynamic>>();
            var record2 = records.record2.ToObject<List<dynamic>>();
            var record3 = records.record3.ToObject<List<dynamic>>();
            var record4 = records.record4.ToObject<List<dynamic>>();
            var record5 = records.record5.ToObject<List<dynamic>>();
            var record6 = records.record6.ToObject<List<dynamic>>();

            if (typer == "Excel")
            {
                DataTable dt = CommonFunctions.ToDataTable(record2);
                DataTable dt2 = CommonFunctions.ToDataTable(record1);
                DataTable dt3 = CommonFunctions.ToDataTable(record3);
                DataTable dt4 = CommonFunctions.ToDataTable(record4);
                DataTable dt5 = CommonFunctions.ToDataTable(record5);
                DataTable dt6 = CommonFunctions.ToDataTable(record6);

                dt.Columns["SubTitle"].ColumnName = "Sub Title";
                dt2.Columns["SubTitle"].ColumnName = "Sub Title";
                dt3.Columns["SubTitle"].ColumnName = "Sub Title";
                dt4.Columns["SubTitle"].ColumnName = "Sub Title";
                dt5.Columns["SubTitle"].ColumnName = "Sub Title";
                dt6.Columns["SubTitle"].ColumnName = "Sub Title";
                int c = dt.Rows.Count + 4;
                int c1 = c + 1;
                int d = dt2.Rows.Count + c + 4;
                int d1 = d + 1;
                int e = dt3.Rows.Count + d + 4;
                int e1 = e + 1;
                int f = dt4.Rows.Count + e + 4;
                int f1 = f + 1;
                int g = dt5.Rows.Count + f + 4;
                int g1 = g + 1;
                byte[] fileContents;
                using (var package = new ExcelPackage())
                {
                    var worksheet = package.Workbook.Worksheets.Add(Filename);
                    ExcelRange Rng = worksheet.Cells["A1"];
                    Rng.Value = "SALES";
                    Rng.Style.Font.Size = 14;
                    Rng.Style.Font.Bold = true;
                    ExcelRange Rng1 = worksheet.Cells["A" + c];
                    Rng1.Value = "DISCOUNT";
                    Rng1.Style.Font.Size = 14;
                    Rng1.Style.Font.Bold = true;
                    ExcelRange Rng2 = worksheet.Cells["A" + d];
                    Rng2.Value = "CREDIT/ARCHIVE";
                    Rng2.Style.Font.Size = 14;
                    Rng2.Style.Font.Bold = true;
                    ExcelRange Rng3 = worksheet.Cells["A" + e];
                    Rng3.Value = "NET REVENUE";
                    Rng3.Style.Font.Size = 14;
                    Rng3.Style.Font.Bold = true;
                    ExcelRange Rng4 = worksheet.Cells["A" + f];
                    Rng4.Value = "PAYMENTS";
                    Rng4.Style.Font.Size = 14;
                    Rng4.Style.Font.Bold = true;
                    ExcelRange Rng5 = worksheet.Cells["A" + g];
                    Rng5.Value = "EXPECTED PAYMENTS";
                    Rng5.Style.Font.Size = 14;
                    Rng5.Style.Font.Bold = true;
                    worksheet.Cells["A2"].LoadFromDataTable(dt, true);
                    worksheet.Cells["A" + c1].LoadFromDataTable(dt2, true);
                    worksheet.Cells["A" + d1].LoadFromDataTable(dt3, true);
                    worksheet.Cells["A" + e1].LoadFromDataTable(dt4, true);
                    worksheet.Cells["A" + f1].LoadFromDataTable(dt5, true);
                    worksheet.Cells["A" + g1].LoadFromDataTable(dt6, true);

                    fileContents = package.GetAsByteArray();
                }
                if (fileContents == null || fileContents.Length == 0)
                {
                    return NotFound();
                }
                return File(
                    fileContents: fileContents,
                    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    fileDownloadName: Filename + ".xlsx"
                );
            }

            return Ok("ok");
        }

        [Route("DownLoadDocument")]
        [HttpPost]
        /*! 
       * \brief  Download document for dynamically
       * \details Function is used to Download document for dynamically.
       * \author  Dhiraj patyal
       * \date    17 Oct 2019
       * \version 1.0    
       */
        public FileStream DownLoadDocument([FromBody] dynamic model)
        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\" + CommonSettings.AppSetting["CommonSettings:" + model.folderName + ""];
            string fileName = model.documentName;
            var file = Path.Combine(currentDirectory, fileName);

            return new FileStream(file, FileMode.Open, FileAccess.Read);
        }

        [Route("GetHeaderData")]
        [HttpGet]
        [Authorize]
        /*! 
       * \brief  Get the header data .
       * \details Function is used to get the header data.
       * \author  Dhiraj patyal
       * \date    17 Oct 2019
       * \version 1.0    
       */
        public IActionResult GetHeaderData(string id)
        {

            HeaderDataMode data = new HeaderDataMode();// _commonService.GetHeaderData(id);
            var companyName = User.Claims.FirstOrDefault(x => x.Type == "CompanyName").Value;
            var result = _userService.GetUserInfo(userID.ToString(), companyID.ToString());
            //result.ProfilePic = CommonFunctions.GetFileLink(result.ProfilePic, "image", enumFileFolder.user);
            //data.ProfilePic = result.ProfilePic.Replace("wwwroot", "");
            data.ProfilePic = result.ProfilePic;
            if(result.CompanyType== "usertypesuperadmin")
            {
                data.CompanyName = "";
            }
            else
            {
                data.CompanyName = companyName != null ? "(" + companyName + ")" : companyName;
            }
            
            data.IsInternalUser = bool.Parse(User.Claims.FirstOrDefault(x => x.Type == "IsInternalUser").Value);
            data.CompanyID = companyID.ToString();
            data.UserType = result.UserTypeName;
            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }
        /*! 
       * \brief  Get the module permission list .
       * \details Function is used to Get the module permission list.
       * \author  Dhiraj patyal
       * \date    17 Nov 2019
       * \version 1.0    
       */

        [Route("GetUserModulePermissionList")]
        [HttpGet]
        public IActionResult GetUserModulePermissionList()
        {
            try
            {
                bool isApplyrole = false;
                isApplyrole = Convert.ToBoolean(CommonSettings.AppSetting["CommonSettings:IsApplyRole"]);

                var data = _commonService.GetUserModulePermissionList(parsedUserID, isApplyrole, companyID.ToString());
                if (data == null)
                {
                    return NotFound();
                }

                return Ok(data);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [Route("AddDataFormJsonFormat")]
        [HttpPost]
        [Authorize]
        public IActionResult AddDataFormJsonFormat([FromBody] DepartementModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {

                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.userId = userID.ToString();
                var data = _commonService.AddDataFormJsonFormat(model);
                if (data == "1")
                {
                    resultResponseModel.ResponseMessage = "Data has been save sucessfyully!";
                    resultResponseModel.StatusCode = 200;
                }
                else
                {
                    resultResponseModel.ResponseMessage = "Data has been Updated sucessfyully!";
                    resultResponseModel.StatusCode = 200;
                }
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("GetLeadListing")]
        [HttpGet]
        //[Authorize]
        public IActionResult GetLeadListing()
        {
            var result = _commonService.GetLeadListing();
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        public class StringMapper
        {
            public string Records { get; set; }
        }


        [HttpGet]
        [Authorize]
        [Route("GetOperatorsItems/{filedNameId}")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetOperatorsItems(string filedNameId, string expression = "")
        {
            List<OperatorsItems> lst = new List<OperatorsItems>();
            try
            {
                lst = _commonService.GetOperatorsItems(filedNameId, parsedUserID, expression);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetDepartmentsById")]
        public async Task<IActionResult> GetDepartmentsById(string id, string moduleName, string submoduleName)
        {
            var result = await _commonService.GetDepartmentsById(id, moduleName, submoduleName);
            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }
        [HttpGet]
        [Authorize]
        [Route("GetScheduleAppointment")]
        public IActionResult GetScheduleAppointment(string id, string moduleName, string submoduleName)
        {
            var result = _commonService.GetScheduleAppointment(userID.ToString(), companyID.ToString());
            var abc = JsonConvert.SerializeObject(result);
            if (result == null)
                return BadRequest();
            return Content(abc, "application/json");

        }
        [Route("UpdateScheduledAppointmentStatus")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateScheduledAppointmentStatus(string AppointmentId, string status)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                var data = _commonService.UpdateScheduledAppointmentStatus(AppointmentId, status);
                resultResponseModel.StatusCode = 200;
                await _realTimeService.OnAppointStarted(userID.ToString());
                return Ok(resultResponseModel);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetLeadsById")]
        public async Task<IActionResult> GetLeadsById(string id, string moduleName, string submoduleName, Guid user, long company)
        {
            var result = await _commonService.GetLeadsById(id, moduleName, submoduleName, user, company);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetLenderById")]
        public async Task<IActionResult> GetLenderById(string id, string moduleName, string submoduleName, Guid user, long company)
        {
            var result = await _commonService.GetLenderById(id, moduleName, submoduleName, user, company);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }



        [HttpGet]
        [Authorize]
        [Route("GetCustomContactById")]
        public async Task<IActionResult> GetCustomContactById(string id, string moduleName, string submoduleName)
        {
            var result = await _commonService.GetCustomContactById(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetProductById")]
        public async Task<IActionResult> GetProductById(string id, string moduleName, string submoduleName)
        {
            var result = await _commonService.GetProductById(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }


        [HttpGet]
        [Authorize]
        [Route("GetCustomViewName")]
        public IActionResult GetCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
            long companyId)
        {
            //SubModuleName = "Products";
            var result = _commonService.GetCustomViewName(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userID, ModuleName, SubModuleName, companyID);

            if (result == null)
                return BadRequest();
            return Ok(result);
        }


        [HttpGet]
        [Authorize]
        [Route("GetCustomViewNameWithCountForWidgets")]
        public IActionResult GetCustomViewNameWithCountForWidgets(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName,
           long companyId)
        {
            //SubModuleName = "Products";
            var result = _commonService.GetCustomViewNameWithCountForWidgets(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userID, ModuleName, SubModuleName, companyID);

            if (result == null)
                return BadRequest();
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize]
        [Route("GetCustomViewbyId")]
        public async Task<IActionResult> GetCustomViewbyId(Int64 id)
        {
            List<CustomView> lst = new List<CustomView>();
            try
            {
                lst = await _commonService.GetCustomViewbyId(id);
                Thread.Sleep(2000);
                if (lst == null)
                    return NotFound();

                return Ok(lst);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetContractDetails")]
        public async Task<IActionResult> GetContractDetails(string id, string moduleName, string submoduleName)
        {
            var result = await _commonService.GetContractDetails(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }
        [HttpGet]
        [Authorize]
        [Route("GetProposalDetailsbyid")]
        public async Task<IActionResult> GetProposalDetailsbyid(string id, string moduleName, string submoduleName)
        {
            var result = await _commonService.GetProposalDetailsbyid(id, moduleName, submoduleName);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }
        [HttpPost]
        [Authorize]
        [Route("AddEditCustomField")]
        public IActionResult AddEditCustomField([FromBody] ManageLayout model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                model.CreatedByID = userID.ToString();
                //model.CompanyID = CompanyID;
                string result = _commonService.AddEditCustomField(model);
                resultResponseModel.StatusCode = 200;
                if (model.Id == null)
                {
                    resultResponseModel.ResponseMessage = "Layout has been added successfully.";
                }
                else
                {
                    resultResponseModel.ResponseMessage = "Layout has been updated successfully.";
                }
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
        [Route("DeleteRecords")]
        public IActionResult DeleteRecords(string primaryKey, string tableName, string deletedBy)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _commonService.DeleteRecords(tableName, primaryKey.TrimEnd(','), deletedBy);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Records has been updated successfully.";
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
        [Route("DisabledAccount")]
        public IActionResult DisabledAccount(string primaryKey, string tableName)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                EnableAccountLogin result = _commonService.DisabledAccount(primaryKey, userID.ToString(), Convert.ToString(companyID));
                // if(result.ReturnValues == 1)
                // {
                //     resultResponseModel.StatusCode = 300;
                //     resultResponseModel.ResponseMessage = "Account has been disabled successfully!";
                //     return Ok(resultResponseModel);
                // }
                //else if (result.ReturnValues == 4)
                // {
                //     resultResponseModel.StatusCode = 300;
                //     resultResponseModel.ResponseMessage = "No Contact Exit. Please Add contact first!";
                //     return Ok(resultResponseModel);
                // }
                resultResponseModel.StatusCode = 300;
                resultResponseModel.ResponseMessage = "No Contact Exit. Please Add contact first!";
                return Ok(resultResponseModel);
                //else
                //{
                //    resultResponseModel.StatusCode = 300;
                //    resultResponseModel.ResponseMessage = "Email Id already exist, try another email id";
                //    return Ok(resultResponseModel);
                //}
                // return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }
        [HttpGet]
        [Authorize]
        [Route("ApproveAccount")]
        public async Task<object> ApproveAccount(string primaryKey, string tableName)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                EnableAccountLogin result = _commonService.ApproveAccount(primaryKey, userID.ToString(), Convert.ToInt64(companyID));
                //if (result.ReturnValues == 1 || result.ReturnValues == "2")
                //{
                //    //Send Email on password 
                //    var user = new ApplicationUser { UserName = result.Email, Email = result.Email };
                //    var applicationUser = new ApplicationUser()
                //    {
                //        UserName = result.Email,
                //        Email = result.Email,
                //        FirstName = "",
                //        LastName = "",
                //        UserType = "",
                //        PhoneNumber = "",
                //        Address = "",
                //        City = "",
                //        State = Guid.Empty,
                //        ZipCode = "",
                //        AssignedBankId = Guid.Empty,
                //        County = "",
                //        IsActive = false,
                //        Position = Guid.Empty,
                //        EmployeeType = Guid.Empty,
                //        RoleID = Guid.Empty,
                //        Notes = "",
                //        Webbrowser = WebBrowser,
                //        BrowserVersion = OSWebBrowser,
                //        IPAddress = IPAddress,
                //        LastLoginDate = DateTime.UtcNow,
                //        CreatedOn = DateTime.UtcNow,
                //        ExecutiveCommisionFormula = "",
                //        CompanyID = Convert.ToInt32(companyid),
                //        DepartmentID = 0,
                //        LocationID = 0,
                //        IsHOD = false,
                //        RefID = 0,
                //        // Reffrom=model.refFrom

                //    };
                //    // var users = await _userManager.FindByNameAsync(result.Email);
                //    // var code =  _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                //    //var token = "";
                //    var token = _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                //    var callbackUrl = _config.GetSection("CommonSettings")["SiteLink"] + "/account/setpassword?userId=" + result.UserId + "&token=" + token.Result;
                //    try
                //    {
                //        Hashtable htbl = new Hashtable();
                //        htbl["@username"] = result.Name;
                //        htbl["@link"] = $"<a href=" + callbackUrl + ">Click here</a>";
                //        htbl["@sitename"] = _config.GetSection("CommonSettings")["Sitename"];
                //        htbl["@logolink"] = _config.GetSection("CommonSettings")["Logolink"];
                //        htbl["@sitelink"] = _config.GetSection("CommonSettings")["SiteLink"];
                //        await _emailSettingsService.SendEmail(result.Email, htbl, "Confirm your account", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", Convert.ToString(result.UserId), Guid.Parse(userid), false, _config.GetSection("CommonSettings")["Register"], "Registration", companyid);
                //    }
                //    catch
                //    {
                //        HttpContext.Session.Clear();
                //    }


                //    //end password
                //    resultResponseModel.StatusCode = 200;
                //    resultResponseModel.ResponseMessage = "Account has been Approved successfully.";
                //    return Ok(resultResponseModel);
                //}
                //else if (result.ReturnValues == 4)
                //{
                //    resultResponseModel.StatusCode = 300;
                //    resultResponseModel.ResponseMessage = "No Contact Exit. Please Add contact first!";
                //    return Ok(resultResponseModel);
                //}
                //else
                //{
                //    resultResponseModel.StatusCode = 300;
                //    resultResponseModel.ResponseMessage = "Email Id already exist, try another email id";
                //    return Ok(resultResponseModel);
                //}
                resultResponseModel.StatusCode = 300;
                resultResponseModel.ResponseMessage = "Email Id already exist, try another email id";
                return Ok(resultResponseModel);

            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }
        [HttpPost]
        [Authorize]
        [Route("ManageLeadConfiguration")]
        public IActionResult ManageLeadConfiguration([FromBody] LeadConfigurationModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                model.moduleWizard = model.moduleWizard.TrimEnd(',');
                model.CompanyId = (model.CompanyId == null) ? companyID : model.CompanyId;
                string result = _commonService.ManageLeadConfiguration(model);
                resultResponseModel.StatusCode = 200;
                string strResponse = "Lead Configuration has been {0} successfully.";
                resultResponseModel.ResponseMessage = (model.Id == null) ? string.Format(strResponse, "added") : string.Format(strResponse, "updated");

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
        [Route("GetLeadConfigurationDetails")]
        public IActionResult GetLeadConfigurationDetails(long? CompanyId)
        {
            CompanyId = (CompanyId == null) ? companyID : CompanyId;
            try
            {
                var model = _commonService.GetLeadConfigurationDetails(CompanyId);
                if (model == null)
                    return NotFound();

                return Ok(model);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetOperatorsByDataTypeCode")]
        public IActionResult GetOperatorsByDataTypeCode(string dataTypeCode)
        {
            try
            {
                var model = _commonService.GetOperatorsByDataTypeCode(dataTypeCode);
                if (model == null)
                    return NotFound();

                return Ok(model);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetResultActions")]
        public IActionResult GetResultActions(string objectName = "")
        {
            try
            {
                var model = _commonService.GetResultActions(companyID, objectName);
                if (model == null)
                    return NotFound();

                return Ok(model);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetcustomDefaultView")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetcustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName)
        {
            try
            {
                string result = _commonService.GetcustomDefaultView(view_Id, parsedUserID, companyID, moduleName, submoduleName);
                return Ok(result);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize]
        [Route("GetAccountById")]
        public async Task<IActionResult> GetAccountById(string id, string moduleName, string submoduleName, Guid userId, long companyId)
        {
            // var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            // var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _commonService.GetAccountById(id, moduleName, submoduleName, userId, companyId);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }

        [Route("GeProductListing")]
        [HttpGet]
        //[Authorize]
        public IActionResult GeProductListing()
        {
            var result = _commonService.GeProductListing();
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [Route("GetUserTeam")]
        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetUserTeam(string type)
        {
            var result = await _commonService.GetUserTeam(type, userID.ToString(), companyID);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [Route("GeHeaderCompanyList")]
        [HttpGet]
        //[Authorize]
        public IActionResult GeHeaderCompanyList(string UserId)
        {
            string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];
           
            var result = _commonService.GeHeaderCompanyList(userID == null ? UserId : userID.ToString());

            if (result == null)
                return BadRequest();
            //else
            //    foreach (dynamic item in result)
            //    {
            //        try
            //        {
            //            item.CompanyLogo = CommonFunctions.GetFileLink(item.CompanyLogo, "image", enumFileFolder.user);
            //            item.CompanyLogo = item.CompanyLogo.Replace("wwwroot", "");
            //            //compStatus = item.companystatus; //item.companystatus;
            //            //model.CompanyId = Convert.ToString(item.CompanyId);
            //            //model.CompanyName = item.CompanyName;
            //        }
            //        catch (Exception ex)
            //        {

            //        }
            //    }

            // return Content(result, "application/json");
            return Ok(result);
        }
        [HttpGet]
        //[Authorize]
        [Route("GetFormFields")]
        public IActionResult GetFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, long isRef, string PrimaryId, string displayCode, string isFor = null)
        {
            var result = _commonService.GetFormFields(companyID.ToString(), userId, moduleName, userID.ToString(), strType, search, isFor, isRef, PrimaryId, displayCode);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        //[Authorize]
        [Route("GetDataForVerificationList")]
        public IActionResult GetDataForVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId)
        {
            var result = _commonService.GetDataForVerificationList(companyID.ToString(), userID.ToString(), moduleName, userID.ToString(), stageid, PrimaryId);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        //[Authorize]
        [Route("GetDataForBankVerificationList")]
        public IActionResult GetDataForBankVerificationList(string companyId, string userId, string moduleName, string Id, string stageid, string PrimaryId)
        {
            var result = _commonService.GetDataForBankVerificationList(companyID.ToString(), userID.ToString(), moduleName, userID.ToString(), stageid, PrimaryId);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }


        [HttpGet]
        [Authorize]
        [Route("GetSqlNumericFunctionList")]
        public IActionResult GetSqlNumericFunctionList(string sqlFunctionTypeCode)
        {
            var result = _commonService.GetSqlNumericFunctionList(sqlFunctionTypeCode);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("GetStageDetailsById")]
        public async Task<IActionResult> GetStageDetailsById(long id, string moduleName)
        {
            try
            {
                var result = await _commonService.GetStageDetailsById(parsedUserID, companyID, id, moduleName);

                //if (result == null)
                //    return BadRequest();

                return Content(result, "application/json");

            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetEmploymentTypes")]
        public async Task<IActionResult> GetEmploymentTypes()
        {
            var result = await _commonService.GetEmploymentTypes(companyID);
            if (result == null)
                return Ok("No Record Found.");

            return Ok(result);
        }

        [HttpGet]
        //[Authorize]
        [Route("GetWelcomeCallDetails")]
        public IActionResult GetWelcomeCallDetails(long? accountId, string moduleName, string subModuleName, long flowid, long stepno, string type, string buttoncode)
        {
            var result = _commonService.GetWelcomeCallDetails(accountId, moduleName, subModuleName, companyID.ToString(), parsedUserID, flowid, stepno, type, buttoncode);
            //return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetCustomFieldsDropDownList")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetCustomFieldsDropDownList(long length, long custom_field_id, string field_code, string serchText)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = _commonService.GetCustomFieldsDropDownList(length, custom_field_id, companyID, parsedUserID, field_code, serchText);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetFixedPageScrollDropDownList")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetFixedPageScrollDropDownList(long length, long custom_field_id, string field_code, string serchText)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = _commonService.GetFixedPageScrollDropDownList(length, custom_field_id, companyID, parsedUserID, field_code, serchText);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetSolCustomFieldsList")]
        public IActionResult GetSolCustomFieldsList(long loanAppStageId, long PrimaryId)
        {
            var result = _commonService.GetSolCustomFieldsList(companyID, parsedUserID, loanAppStageId, PrimaryId);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpPost]
        [Authorize]
        [Route("AddEditSolgenStageForm")]
        public async Task<IActionResult> AddEditSolgenStageForm([FromBody] SolgenStageModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = _commonService.AddEditSolgenStageForm(model, parsedUserID, companyID);
                string retResponseMessage = string.Format("Record has been {0} successfully.", (model.Id == null) ? "inserted" : "updated");
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = retResponseMessage; //"Lead has been updated successfully!";
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

        [HttpPost]
        [Authorize]
        [Route("MarkAsCompleteStatus")]
        public async Task<IActionResult> MarkAsCompleteStatus([FromBody] MarkAsCompleteModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = _commonService.MarkAsCompleteStatus(model, parsedUserID, companyID);
                if (data != null)
                {
                    if (model.SubModuleCode == "lead")
                    {
                        string retResponseMessage = string.Format("Lead stage has been updated successfully");
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = retResponseMessage;
                    }
                    else if (model.SubModuleCode == "opportunity")
                    {
                        string retResponseMessage = string.Format("Opportunity stage has been updated successfully");
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = retResponseMessage;
                    }
                    else if (model.SubModuleCode == "projects")
                    {
                        string retResponseMessage = string.Format("project stage has been updated successfully");
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = retResponseMessage;
                    }
                    else if (model.SubModuleCode == "proposal")
                    {
                        string retResponseMessage = string.Format("Proposal stage has been updated successfully");
                        responseModel.StatusCode = 200;
                        responseModel.OptionalExtraParamers = data;
                        responseModel.ResponseMessage = retResponseMessage;
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
        // [Authorize]
        [Route("GetMapView")]
        public IActionResult GetMapView(string companyId, string ModuleName, string SubModuleName, string listFilter)
        {
            var result = _commonService.GetMapView(companyID.ToString(), ModuleName, SubModuleName, parsedUserID, listFilter);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpGet]
        [Authorize]
        [Route("GetGlobalSeacrchData")]
        public IActionResult GetGlobalSeacrchData(string listFilter, long? length, string recordFilter = "", string teamID = "", string teamMemberID = "")
        {
            var result = _commonService.GetGlobalSeacrchData(listFilter, length, companyID.ToString(), parsedUserID, recordFilter, teamID, teamMemberID);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }


        [HttpGet]
        [Route("GetGlobalSearchDataAsync")]
        public async Task<IActionResult> GetGlobalSearchDataAsync(string listFilter, long? length, string recordFilter = "", string teamID = "", string teamMemberID = "")
        {
            var userid = Guid.Parse("E9E022F5-BAA8-468A-8EB4-2798772A6783");//Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
           // var companyid = "1003";// User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _commonService.GetGlobalSearchDataAsync(listFilter, length, companyID.ToString(), userid, recordFilter, teamID, teamMemberID);

            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }



        [HttpGet]
        [Authorize]
        [Route("GetLasttimeLoginForCompany")]
        public async Task<IActionResult> GetLasttimeLoginForCompany(string callFrom)
        {
            var data = _commonService.GetLasttimeLoginForCompany(userID.ToString(), companyID, callFrom);
            return Ok(data);
        }


        [HttpGet]
        [Authorize]
        [Route("GetManageViewDropDownList")]

        public IActionResult GetManageViewDropDownList(string ModuleName, string SubModuleName)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                lst = _commonService.GetManageViewDropDownList(companyID, parsedUserID, ModuleName, SubModuleName);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetCascadingData")]
        public async Task<IActionResult> GetCascadingData(string id, string moduleName, string submoduleName, long companyId)
        {
            var result = _commonService.GetCascadingData(id, moduleName, submoduleName, parsedUserID, companyID);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }


        //========================LoanHomi Manage View Form Functions==================================

        [HttpGet]
        [Authorize]
        [Route("GetLoanHomiCustomViewName")]
        public IActionResult GetLoanHomiCustomViewName(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string ModuleName, string SubModuleName, long companyId, string listType)
        {
            //SubModuleName = "Products";
            var result = _commonService.GetLoanHomiCustomViewName(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, ModuleName, SubModuleName, companyId, listType);

            if (result == null)
                return BadRequest();
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("DeleteLoanHomiRecords")]
        public IActionResult DeleteLoanHomiRecords(string primaryKey, string tableName, string deletedBy)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _commonService.DeleteLoanHomiRecords(tableName, primaryKey.TrimEnd(','), deletedBy);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Records has been updated successfully.";
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
        [Route("GetLoanHomiCustomDefaultView")]

        public IActionResult GetLoanHomiCustomDefaultView(long view_Id, Guid userid, long companyid, string moduleName, string submoduleName, string listType)
        {

            try
            {
                string result = _commonService.GetLoanHomiCustomDefaultView(view_Id, parsedUserID, companyID, moduleName, submoduleName, listType);

                return Ok(result);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        [Route("GetLoanHomiCustomViewbyId")]
        public async Task<IActionResult> GetLoanHomiCustomViewbyId(Int64 id)
        {
            List<CustomView> lst = new List<CustomView>();
            try
            {
                lst = await _commonService.GetLoanHomiCustomViewbyId(id);
                Thread.Sleep(2000);
                if (lst == null)
                    return NotFound();

                return Ok(lst);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("SaveLoanHomiCustomManagePopup")]
        [Authorize]
        public IActionResult SaveLoanHomiCustomManagePopup([FromBody] LoanHomiManageViewModelWithCompany model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                model.CreatedByID = userID.ToString();
                model.CompanyID = companyID;
                string result = _commonService.SaveLoanHomiCustomManagePopup(model);
                resultResponseModel.StatusCode = 200;
                if (model.Id == null || model.Id == "0" || model.Id == "")
                {
                    resultResponseModel.ResponseMessage = "View " + '"' + model.select + '"' + " has been added successfully.";
                }
                else
                {
                    resultResponseModel.ResponseMessage = "View " + '"' + model.select + '"' + " has been updated successfully.";
                }
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
        [Route("AddUpdateLoanApplicationReportData")]
        [Authorize]
        public IActionResult AddUpdateLoanApplicationReportData([FromBody] LoanApplicationReportModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                model.CreatedByID = userID.ToString();
                model.CompanyID = companyID;
                string result = _commonService.AddUpdateLoanApplicationReportData(model);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ID = result;
                if (model.Id == null || model.Id == "0" || model.Id == "")
                {
                    
                    resultResponseModel.ResponseMessage = "Report has been added successfully.";
                }
                else
                {
                    resultResponseModel.ResponseMessage = "Report has been updated successfully.";
                }
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        //[HttpGet]
        ////[Authorize]
        //[Route("GetLoanHomiManageViewFormFields")]
        //public IActionResult GetLoanHomiManageViewFormFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        //{
        //    var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
        //    var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
        //    var result = _commonService.GetLoanHomiManageViewFormFields(companyid, userId, moduleName, userid, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
        //    if (result == null)
        //        return BadRequest();

        //    return Content(result, "application/json");
        //}

        [HttpGet]
        //[Authorize]
        [Route("GetLoanHomiManageViewFormFieldsList")]
        public IActionResult GetLoanHomiManageViewFormFieldsList(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode, string fieldlistFilter = null, string type = null)
        {
            var result = _commonService.GetLoanHomiManageViewFormFieldsList(fieldlistFilter, companyID.ToString(), userId, moduleName, userID.ToString(), strType, search, isFor, isRef, PrimaryId, RefId, displayCode, type);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }


        [HttpGet]
        [Authorize]
        [Route("getLoanHomiOperatorsList")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult getLoanHomiOperatorsList(string filedNameId, string modulename = "")
        {
            List<OperatorsItems> lst = new List<OperatorsItems>();
            try
            {
                if (companyID.ToString() == "1003")
                {
                    modulename = "SolgenOne";
                }
                lst = _commonService.getLoanHomiOperatorsList(filedNameId, parsedUserID, companyID.ToString(), modulename);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        //========================END==================================



        [HttpGet]
        [Authorize]
        [Route("GetTimeZoneList")]
        public async Task<IActionResult> GetTimeZoneList()
        {
            var result = await _commonService.GetTimeZoneList();

            if (result == null)
                return NotFound("no record exists.");

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocumentCategory")]
        public async Task<IActionResult> GetDocumentCategory()
        {
            var result = await _commonService.GetDocumentCategory(companyID);

            if (result == null)
                return NotFound("no record exists.");

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("GetDocumentTypeByCategoryId/{categoryid}")]
        public async Task<IActionResult> GetDocumentTypeByCategoryId(long categoryid)
        {
            var result = await _commonService.GetDocumentTypeByCategoryId(categoryid, companyID);

            if (result == null)
                return NotFound("no record exists.");

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("GetFileListForRelatedTab")]
        public async Task<IActionResult> GetFileListForRelatedTab(string ServiceId, string categoryId, string sortColumn, string sortDir, string pageIndex, string pageSize, string moduleName, string subModuleName)
        {
            try
            {
                var data = await _commonService.GetFileListForRelatedTab(ServiceId, categoryId, sortColumn, sortDir, pageIndex.ToString(), pageSize.ToString(), userID.ToString(), companyID.ToString(), moduleName, subModuleName);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [HttpPost]
        [Authorize]
        [Route("addOrUpdateFiles")]
        public async Task<IActionResult> addOrUpdateFiles([FromForm] ServiceResourceFiles model)
        {
            try

            {
                string filePath = ""; string filePrefix = ""; enumFileFolder enumfoldername = enumFileFolder.leadViewData;
                int data = 0;
                if (model.isDocumentModule)
                {
                    filePath = CommonSettings.AppSetting["CommonSettings:DocumentMaker"];
                    filePrefix = "DocumentMaker";
                    enumfoldername = enumFileFolder.DocumentMaker;
                }
                else
                {
                    switch (model.SubModuleName)
                    {
                        case "lead":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "ViewLead";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                        case "workorder":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadWorkorderViewData"];
                            filePrefix = "ViewWorkorder";
                            enumfoldername = enumFileFolder.workorderViewData;
                            break;
                        case "servicecrew":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadServiceCrewViewData"];
                            filePrefix = "ViewServiceCrew";
                            enumfoldername = enumFileFolder.serviceCrewViewData;
                            break;
                        case "opportunity":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "viewOpportunity";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                        case "account":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "viewAccount";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                        case "serviceresource":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadServiceResourceData"];
                            filePrefix = "ServiceResouce";
                            enumfoldername = enumFileFolder.serviceResourceFile;
                            break;
                        case "proposal":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadProposalViewDataSave"];
                            filePrefix = "ViewProposal";
                            enumfoldername = enumFileFolder.propsoalFileDataSave;
                            break;
                        case "serviceappointment":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadAppointmentViewData"];
                            filePrefix = "Appointment";
                            enumfoldername = enumFileFolder.appointmentFile;
                            break;
                        default:
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "ViewLead";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                    }
                }

                ResultResponseModel result = new ResultResponseModel();
                model.CompanyId = companyID;
                model.Userid = userID.ToString();
                if (Request.Form.Files.Count > 0)
                {

                    //var fileResult = Util.UploadFileFromBase64(Request.Form.Files, filePath, filePrefix);
                    //model.FileName = fileResult.Item1 ?? "";

                    foreach (FormFile item in Request.Form.Files)
                    {
                        HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                        if (NodefilePath.Headers.Location != null)
                        {
                            string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                            var url = nodeFileUrl.Split("//");
                            if (url.Count() > 0)
                            {
                                model.FileUrl = "https://" + url[1];
                            }

                            model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                            model.isMediaServer = true;
                            model.Type = Path.GetExtension(model.FileUrl);
                            data = await _commonService.addOrUpdateFiles(model);
                            var emailDetail = _commonService.GetCustomerContactInfo(model.SubModuleName, model.Id.ToString(), model.CompanyId.Value);

                            if (emailDetail != null && !string.IsNullOrEmpty(emailDetail.Email))
                            {
                                string templateName = _config.GetSection("CommonSettings")["CustomerReviewTemplate"];
                                var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, companyID.ToString());
                                if (objTemplate != null)
                                {
                                    objTemplate.Template = objTemplate.Template.Replace("@username", emailDetail.Name);
                                    objTemplate.Template = objTemplate.Template.Replace("@url", model.FileUrl);
                                    objTemplate.Template = objTemplate.Template.Replace("@sitename", objTemplate.companyName);
                                    objTemplate.Template = objTemplate.Template.Replace("@logolink", objTemplate.EmailTemplateLogo);
                                    objTemplate.Template = objTemplate.Template.Replace("@year", DateTime.Now.Year.ToString());

                                    var emailSetting = _configurationSettingService.getcompanySetupDetail(companyID);
                                    MailMessage mail = new MailMessage();
                                    SmtpClient SmtpServer = new SmtpClient();
                                    mail.From = new MailAddress(emailSetting.FromEmail);
                                    mail.To.Add(emailDetail.Email);
                                    mail.Subject = objTemplate.EmailTemplateSubject;
                                    mail.IsBodyHtml = true;
                                    mail.Body = objTemplate.Template;
                                    // mail.Body = "proposal test";
                                    SmtpServer.Port = Convert.ToInt32(emailSetting.SMTPport);
                                    SmtpServer.Host = emailSetting.SMTPHost;
                                    SmtpServer.Credentials = new System.Net.NetworkCredential(emailSetting.SMTPusername, emailSetting.SMTPpassword);
                                    SmtpServer.EnableSsl = emailSetting.IsEnableSSL;
                                    SmtpServer.Send(mail);
                                }
                            }

                            //Code for customer Approval [MNasir]
                            var customerMapping = "[{\"id\":0,\"isRequired\":" + (model.isRequired ? 1 : 0) + ",\"documentId\":" + data + ",\"workOrderId\":" + model.Id + ",\"statusId\":\"1003\"}]";
                            var approvalId = await _commonService.AddOrUpdateCustomerApproval(customerMapping, companyID.ToString(), userID.ToString());

                        }
                        if (NodefilePath.Headers.Location == null)
                        {
                            result.ResponseMessage = "Empty response comes from Media Server.";
                            return Ok(result);
                        }
                    }
                }


                if (model.Id == null || model.Id == "")
                {
                    result.ResponseMessage = "Files have been uploaded successfully.";
                    result.ID = data.ToString();
                }
                else
                {
                    result.ResponseMessage = "Files have been uploaded successfully.";
                    result.ID = data.ToString();
                }
                result.StatusCode = 200;
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
        [Route("getMasterItemsByCustomFieldId/{customFieldId}")]
        public IActionResult getMasterItemsByCustomFieldId(long customFieldId)
        {
            try
            {
                var lst = _commonService.getMasterItemsByCustomFieldId(customFieldId, companyID);
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpPost]
        [Authorize]
        [Route("addUpdateActivity")]
        public IActionResult addUpdateActivity([FromBody] ActivityDataModel model)
        {
            try
            {
                model.userid = parsedUserID;
                model.companyid = companyID;
                var data = _commonService.addUpdateActivity(model);
                ResultResponseModel result = new ResultResponseModel();
                if (model.Id == null || model.Id == "")
                {
                    result.ResponseMessage = model.activity_type + " have been added successfully.";
                }
                else
                {
                    result.ResponseMessage = model.activity_type + " have been updated successfully.";
                }
                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetActivityData")]
        public IActionResult GetActivityData(string sortColumn, string sortDir, int pageIndex, int pageSize, string ModuleName, string SubModuleName,
            long refid)
        {
            //SubModuleName = "Products";
            var result = _commonService.GetActivityData(sortColumn, sortDir, pageIndex, pageSize, parsedUserID, ModuleName, SubModuleName, companyID, refid);

            if (result == null)
                return BadRequest();
            return Ok(result);
        }
        [HttpGet]
        [Authorize]
        [Route("DeleteActivity")]
        public IActionResult DeleteActivity(long Id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _commonService.DeleteActivity(Id, companyID, parsedUserID);
                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Records has been updated successfully.";
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
        [Route("GetModulesNameList")]
        public async Task<IActionResult> GetModulesNameList(long module_id)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var data = await _commonService.GetModulesNameList(companyID.ToString(), userID.ToString(), module_id);
                return Ok(data);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [HttpGet]
        [Route("GetSubModulesNameList")]
        public IActionResult GetSubModulesNameList(int PageNo, int PageSize, Guid? userId, int modulecode, int submodulecode, string deviceType, string layoutType, string sortDir, string sortColumn, string filterText)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var data = _commonService.GetSubModulesNameList(PageNo, PageSize, parsedUserID, companyID, modulecode, submodulecode, deviceType, layoutType, sortDir, sortColumn, filterText);
                return Ok(data);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }


        }

        [HttpPost]
        [Route("saveLayoutType")]
        public IActionResult saveLayoutType([FromBody] LayoutModuleModel layoutModuleModel, Guid? userId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _commonService.saveLayoutType(layoutModuleModel, parsedUserID, companyID);

                if (Convert.ToInt64(result) > 0)
                {
                    resultResponseModel.ID = result;
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Data has been updated successfully.";
                    return Ok(resultResponseModel);
                }
                else
                {
                    resultResponseModel.ID = result;
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
        [HttpPost]
        [Route("setRoomParticipantInfo")]
        public async Task<IActionResult> setRoomParticipantInfo([FromBody] RoomsParticipant request)
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

        [HttpGet]
        [Route("GetCustomFieldsData")]
        public IActionResult GetCustomFieldsData(string companyId, string userId, string viewId)
        {
            var result = _commonService.GetCustomFieldsData(companyID.ToString(), userId, viewId);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpPost]
        [Route("SaveCustomLayoutData")]
        [DisableRequestSizeLimit]
        public IActionResult SaveCustomLayoutData([FromBody] ManageCustomLayoutModelRevise manageCustomLayout)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                string json = JsonConvert.SerializeObject(manageCustomLayout.group);

                var result = _commonService.SaveCustomLayoutData(json, manageCustomLayout.view, userID, companyID, manageCustomLayout.relation, manageCustomLayout.flowAutomation);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Data has been updated successfully.";
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
        [Route("SaveUserDefinedCustomField")]
        [DisableRequestSizeLimit]
        public IActionResult SaveUserDefinedCustomField([FromBody]  SaveUserDefinedFieldModal modal)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
               // string json = JsonConvert.SerializeObject(modal.userDefinedControl);

                var result = _commonService.SaveUserDefinedCustomField(modal.userDefinedControl, userID,companyID, modal.viewId);

                resultResponseModel.StatusCode = 200;
                resultResponseModel.ResponseMessage = "Data has been updated successfully.";
                return Ok(resultResponseModel);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }




        [Route("GetDDLItemsByFieldCode")]
        public async Task<IActionResult> GetDDLItemsByFieldCode(string fieldCode, string moduleCode, string submoduleCode)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = await _commonService.GetDDLItemsByFieldCode(fieldCode, moduleCode, submoduleCode, userID, companyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Route("GetWorkTypeDDL")]
        public List<MasterItems> GetWorkTypeDDL(string id, int length, string serchText)
        {
            if (id == "null")
            { id = "0"; }

            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _commonService.GetWorkTypeDDL(parsedUserID, companyID, id, length, serchText);

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

        [Route("CloneSelectedViewList")]
        [HttpPost]
        public IActionResult CloneSelectedViewList([FromBody] View view)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _commonService.CloneSelectedListView(parsedUserID, companyID, view.id, view.name, view.listType);
                if (result == "success")
                {
                    resultResponseModel.StatusCode = 200;
                    resultResponseModel.ResponseMessage = "Data has been updated successfully.";
                }
                else if (result == "alreadyexist")
                {
                    resultResponseModel.StatusCode = 409;
                    resultResponseModel.ResponseMessage = "View is already exist with the name \"" + view.name + "\".";
                }
                else
                {
                    resultResponseModel.StatusCode = 400;
                    //resultResponseModel.ResponseMessage = "View is already exist with the name \"" + ViewName + "\".";
                }
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
        [Route("saveWelcomeCall")]
        public IActionResult saveWelcomeCall([FromBody] welcomeSaveModel model)
        {
            try
            {
                model.userid = parsedUserID;
                model.CompanyID = companyID;
                var data = _commonService.saveWelcomeCall(model);
                ResultResponseModel result = new ResultResponseModel();

                result.StatusCode = 200;

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        [HttpGet]
        [Route("GetMasterItemsNotAuth/{masterNames}")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetMasterItemsNotAuth(string masterNames, string masterKeyText = "")
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                var uid = Guid.Parse("E9E022F5-BAA8-468A-8EB4-2798772A6783"); //Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

                lst = _commonService.GetMasterItems(masterNames, uid, companyID, masterKeyText);

                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetMasterItemsNotAuthLoanProduct")]
        /*! 
        * \brief   Get the Master Items values
        * \details Function is used to fetch the list of MasterItems based on Master Names
        * \author  Kiran Bala 
        * \date    06 Sep 2019
        * \version 1.0    
        */
        public IActionResult GetMasterItemsNotAuthLoanProduct(string masterNames, string masterKeyText, long companyId)
        {
            List<MasterItems> lst = new List<MasterItems>();
            try
            {
                var uid = Guid.Parse("E9E022F5-BAA8-468A-8EB4-2798772A6783"); //Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);

                lst = _commonService.GetMasterItems(masterNames, uid, companyId, masterKeyText);

                return Ok(lst);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("saveUserActivityLog")]
        public IActionResult saveUserActivityLog([FromBody] userActivityLog model)
        {
            try
            {
                model.userID = userID;
                model.companyID = companyID;
                var data = _commonService.saveUserActivityLog(model);
                ResultResponseModel result = new ResultResponseModel();
                result.StatusCode = 200;
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Route("GetScrollableData")]
        public List<MasterItems> GetScrollableData(string id, int length, string serchText, long departmentid, string fieldCode)
        {
            if (id == "null")
            { id = "0"; }

            List<MasterItems> data = new List<MasterItems>();
            try
            {
                data = _commonService.GetScrollableData(parsedUserID, companyID, id, length, serchText, departmentid, fieldCode);

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

        public async Task<string> GetCustomFields(string PrimaryId, string companyId, string moduleName, string subModuleName, string userId, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (PrimaryId == "undefined")
                {
                    PrimaryId = null;
                }
                var data = await connection.ExecuteScalarAsync<string>("solgen_GetRealtedObjects_dynamic_form_view_v1",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = subModuleName,
                        USER_ID = userId,
                        displayCode = displayCode,
                    }, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        [HttpGet]
        [Route("GetCustomFieldsAsync")]
        public async Task<IActionResult> GetCustomFieldsAsync(string PrimaryId, string customViewId, string moduleName, string subModuleName, string displayCode)
        {
            var result = await _commonService.GetCustomFields(PrimaryId, customViewId, companyID.ToString(), moduleName, subModuleName, userID.ToString(), displayCode);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpPost]
        [Route("AddOrUpdateFormView")]
        public async Task<IActionResult> AddOrUpdateFormView([FromBody] JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                string data = await _commonService.AddOrUpdateFormView(model);
                string retResponseMessage = string.Format("Data has been {0} successfully.", (model.Id == null) ? "inserted" : "updated");
                if (data != null)
                {
                    responseModel.StatusCode = 200;
                    responseModel.OptionalExtraParamers = data;
                    responseModel.ResponseMessage = retResponseMessage;
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

        [Route("LoanApplicationExportExcelInvoice/{type}/{filename}/{reportName}/{dateFrom}/{dateTo}")]
        [HttpPost]
        public IActionResult LoanApplicationExportExcelInvoice(string filename, string type, string reportName, string dateFrom, string dateTo, [FromBody] List<dynamic> records)
        {
            if (type == "Excel")
            {
                DataTable dt = CommonFunctions.ToDataTable(records);
                DataTable dtCommision = new DataTable();
                if (dt.Columns.Contains("TotalRecord"))
                    dt.Columns.Remove("TotalRecord");

                string cellNumber = "A5";
                //var rowCount = dt.Rows.Count;
                if (dt.Rows.Count > 0 && dt.Columns.Contains("ContractorNameExport"))
                {//called from Commision Paid Report
                    dtCommision.Columns.Add("Col1", typeof(string));
                    dtCommision.Columns.Add("Col2", typeof(string));
                    dtCommision.Rows.Add("Contractor Name", Convert.ToString(dt.Rows[0]["ContractorNameExport"]));
                    dtCommision.Rows.Add("Start Date", Convert.ToString(dt.Rows[0]["ContractorStDateExport"]));
                    dtCommision.Rows.Add("End Date", Convert.ToString(dt.Rows[0]["ContractorEndDateExport"]));
                    dtCommision.Rows.Add("Commision - Placement Fee", Convert.ToString(dt.Rows[0]["CommissionFormulaExport"]));
                    cellNumber = "A11";

                    dt.Columns.Remove("ContractorNameExport");
                    dt.Columns.Remove("ContractorStDateExport");
                    dt.Columns.Remove("ContractorEndDateExport");
                    dt.Columns.Remove("CommissionFormulaExport");

                }
                byte[] fileContents;
                using (var package = new ExcelPackage())
                {
                    var worksheet = package.Workbook.Worksheets.Add(filename);

                    worksheet.Cells["A2"].Value = "Report Name";
                    worksheet.SelectedRange["A2"].Style.Font.Bold = true;
                    worksheet.SelectedRange["A2"].Style.Font.Size = 14;
                    worksheet.Cells["B2"].Value = reportName;
                    worksheet.SelectedRange["B2"].Style.Font.Size = 14;

                    if (dateFrom != null && dateTo != null)
                    {

                        worksheet.Cells["A3"].Value = "Date From";
                        worksheet.SelectedRange["A3"].Style.Font.Bold = true;
                        worksheet.SelectedRange["A3"].Style.Font.Size = 14;
                        worksheet.Cells["B3"].Value = dateFrom;
                        worksheet.SelectedRange["B3"].Style.Font.Size = 14;

                        worksheet.Cells["D3"].Value = "Date To";
                        worksheet.SelectedRange["D3"].Style.Font.Bold = true;
                        worksheet.SelectedRange["D3"].Style.Font.Size = 14;
                        worksheet.Cells["E3"].Value = dateTo;
                        worksheet.SelectedRange["E3"].Style.Font.Size = 14;
                    }
                    worksheet.Cells[cellNumber].LoadFromDataTable(dt, true);
                   
                    //worksheet.Cells["A"+(rowCount+6)].Value = "Total";
                    //worksheet.SelectedRange["A" + (rowCount + 6)].Style.Font.Bold = true;
                    //worksheet.Cells["A" + (rowCount + 6)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Right;

                    if (dtCommision.Rows.Count > 0)
                    {

                        worksheet.Cells["A5"].LoadFromDataTable(dtCommision, false);
                        worksheet.SelectedRange["A11:Z11"].Style.Font.Bold = true;
                    }
                    else
                    {
                        worksheet.SelectedRange["A5:Z5"].Style.Font.Bold = true;
                        worksheet.SelectedRange["A5:Z5"].Style.Font.Size = 12;
                    }
                    worksheet.Cells.AutoFitColumns();
                    fileContents = package.GetAsByteArray();
                }
                if (fileContents == null || fileContents.Length == 0)
                {
                    return NotFound();
                }
                return File(
                    fileContents: fileContents,
                    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    fileDownloadName: filename + ".xlsx"
                );
            }
            return Ok("ok");

        }

        [Route("GetConfigurationTypeFileExtensions/{configurationType}")]
        [HttpGet]
        [Authorize]
        public IActionResult GetConfigurationTypeFileExtensions(string configurationType)
        {
            try
            {
                object data = _commonService.GetConfigurationTypeFileExtensions(configurationType, companyID);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("UploadAsset")]
        public async Task<IActionResult> UploadAsset()
        {
            ServiceResourceFiles model = new ServiceResourceFiles()
            {
                isDocumentModule = false,
                moduleName = "CRM",
                SubModuleName = "lead"
            };
            try
            {
                string filePath = ""; string filePrefix = ""; enumFileFolder enumfoldername = enumFileFolder.leadViewData;
                int data = 0;
                if (model.isDocumentModule)
                {
                    filePath = CommonSettings.AppSetting["CommonSettings:DocumentMaker"];
                    filePrefix = "DocumentMaker";
                    enumfoldername = enumFileFolder.DocumentMaker;
                }
                else
                {
                    switch (model.SubModuleName)
                    {
                        case "lead":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "ViewLead";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                        case "workorder":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadWorkorderViewData"];
                            filePrefix = "ViewWorkorder";
                            enumfoldername = enumFileFolder.workorderViewData;
                            break;
                        case "servicecrew":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadServiceCrewViewData"];
                            filePrefix = "ViewServiceCrew";
                            enumfoldername = enumFileFolder.serviceCrewViewData;
                            break;
                        case "opportunity":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "viewOpportunity";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                        case "account":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "viewAccount";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                        case "serviceresource":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadServiceResourceData"];
                            filePrefix = "ServiceResouce";
                            enumfoldername = enumFileFolder.serviceResourceFile;
                            break;
                        case "proposal":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadProposalViewDataSave"];
                            filePrefix = "ViewProposal";
                            enumfoldername = enumFileFolder.propsoalFileDataSave;
                            break;
                        case "serviceappointment":
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadAppointmentViewData"];
                            filePrefix = "Appointment";
                            enumfoldername = enumFileFolder.appointmentFile;
                            break;
                        default:
                            filePath = CommonSettings.AppSetting["CommonSettings:UploadLeadViewData"];
                            filePrefix = "ViewLead";
                            enumfoldername = enumFileFolder.leadViewData;
                            break;
                    }
                }

                ResultResponseModel result = new ResultResponseModel();
                model.CompanyId = companyID;
                model.Userid = userID.ToString();
                if (Request.Form.Files.Count > 0)
                {

                    foreach (FormFile item in Request.Form.Files)
                    {
                        HttpResponseMessage NodefilePath = await Util.UploadAttachmentNode(item, filePrefix, filePath);
                        if (NodefilePath.Headers.Location != null)
                        {
                            string nodeFileUrl = NodefilePath.Headers.Location.ToString();

                            var url = nodeFileUrl.Split("//");
                            if (url.Count() > 0)
                            {
                                model.FileUrl = "https://" + url[1];
                            }

                            model.FileName = Path.GetFileName(new Uri(nodeFileUrl).AbsolutePath);
                            model.isMediaServer = true;
                            model.Type = Path.GetExtension(model.FileUrl);
                            data = await _commonService.addOrUpdateFiles(model);
                            //var emailDetail = _commonService.GetCustomerContactInfo(model.SubModuleName, model.Id.ToString(), model.CompanyId.Value);

                            //if (emailDetail != null && !string.IsNullOrEmpty(emailDetail.Email))
                            //{
                            //    string templateName = _config.GetSection("CommonSettings")["CustomerReviewTemplate"];
                            //    var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, CompanyID.ToString());
                            //    if (objTemplate != null)
                            //    {
                            //        objTemplate.Template = objTemplate.Template.Replace("@username", emailDetail.Name);
                            //        objTemplate.Template = objTemplate.Template.Replace("@url", model.FileUrl);
                            //        objTemplate.Template = objTemplate.Template.Replace("@sitename", objTemplate.companyName);
                            //        objTemplate.Template = objTemplate.Template.Replace("@logolink", objTemplate.EmailTemplateLogo);
                            //        objTemplate.Template = objTemplate.Template.Replace("@year", DateTime.Now.Year.ToString());

                            //        var emailSetting = _configurationSettingService.getcompanySetupDetail(CompanyID);
                            //        MailMessage mail = new MailMessage();
                            //        SmtpClient SmtpServer = new SmtpClient();
                            //        mail.From = new MailAddress(emailSetting.FromEmail);
                            //        mail.To.Add(emailDetail.Email);
                            //        mail.Subject = objTemplate.EmailTemplateSubject;
                            //        mail.IsBodyHtml = true;
                            //        mail.Body = objTemplate.Template;
                            //        // mail.Body = "proposal test";
                            //        SmtpServer.Port = Convert.ToInt32(emailSetting.SMTPport);
                            //        SmtpServer.Host = emailSetting.SMTPHost;
                            //        SmtpServer.Credentials = new System.Net.NetworkCredential(emailSetting.SMTPusername, emailSetting.SMTPpassword);
                            //        SmtpServer.EnableSsl = emailSetting.IsEnableSSL;
                            //        SmtpServer.Send(mail);
                            //    }
                            //}

                            ////Code for customer Approval [MNasir]
                            //var customerMapping = "[{\"id\":0,\"isRequired\":" + (model.isRequired ? 1 : 0) + ",\"documentId\":" + data + ",\"workOrderId\":" + model.Id + ",\"statusId\":\"1003\"}]";
                            //var approvalId = await _commonService.AddOrUpdateCustomerApproval(customerMapping, CompanyID.ToString(), userid);

                        }
                        if (NodefilePath.Headers.Location == null)
                        {
                            result.ResponseMessage = "Empty response comes from Media Server.";
                            return Ok(result);
                        }
                    }
                }


                if (model.Id == null || model.Id == "")
                {
                    result.ResponseMessage = "Files have been uploaded successfully.";
                    result.ID = data.ToString();
                }
                else
                {
                    result.ResponseMessage = "Files have been uploaded successfully.";
                    result.ID = data.ToString();
                }
                result.StatusCode = 200;
                //return Ok(result);
                //var list = new List<string>();
                //list.Add(model.FileUrl);
                //return Json(new { data = list });

                return Json(new { data = model.FileUrl });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        [Route("GetEcryptedId/{id}")]
        public string GetEcryptedId(decimal id)
        {
            try
            {
                return _commonService.GetEcryptedId(id);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        [Route("GetDDLItemsForRole")]
        public async Task<IActionResult> GetDDLItemsForRole(string fieldCode, long? accountId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = await _commonService.GetDDLItemsForRole(fieldCode, accountId ,parsedUserID, companyID);
                return Ok(result);
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
        [Route("CheckAccountTypeIsDealer")]
        public IActionResult CheckAccountTypeIsDealer(long? accountId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _commonService.CheckAccountTypeIsDealer(accountId, parsedUserID, companyID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = ex.Message;
                return Ok(resultResponseModel);
            }
        }


        [Route("GetThemeType")]
        [HttpGet]
        public int GetThemeType()
        {
            return Convert.ToInt16(CommonSettings.AppSetting["CommonSettings:ThemeType"]);
        }


        [HttpGet]
        [Authorize]
        [Route("GetFileUrl")]
        public IActionResult GetFileUrl(long? accountId)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _commonService.GetFileUrl(accountId);
                return Ok(result);
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
        [Route("GetopportunityDetailsByid")]
        public IActionResult GetopportunityDetailsByid(int oppid)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var data = _commonService.GetopportunityDetailsByid(oppid);
                
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }



        [HttpPost]
        [Authorize]
        [Route("SendDocumentForSignNow")]
        //public async Task<IActionResult> SendDocumentSignNow(long proposalId, string mappingIds, string sendingSource, long deliveryId, string subject, dynamic body)
        //{
        public async Task<IActionResult> SendDocumentForSignNow([FromBody] dynamic dynamicModel)
        {
            string json = JsonConvert.SerializeObject(dynamicModel);
            long proposalId1 = Convert.ToInt64(JObject.Parse(json)["proposalId"]);

            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {

                
                var errorList = new List<string>();
                string idsList = Convert.ToString(JObject.Parse(json)["mappingIds"]).Replace("undefined", "");
                string sendingSource = Convert.ToString(JObject.Parse(json)["sendingSource"]);
                string body = Convert.ToString(JObject.Parse(json)["body"]);
                string subject = Convert.ToString(JObject.Parse(json)["subject"]);
                string onlyhtml = Convert.ToString(JObject.Parse(json)["onlyhtml"]);
                long proposalId = Convert.ToInt64(JObject.Parse(json)["proposalId"]);
                string submoduleName = Convert.ToString(JObject.Parse(json)["submoduleName"]);

                string[] values = idsList.Split(',');
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                string applicantName = submoduleName + " Document", coApplicantName = "test sign now";
                string signer1Email = string.Empty, signer2Email = string.Empty, email = string.Empty, ccemail = string.Empty;
                var isEmail = false;
                var isSignNow = false;
                var mergedDoc = new Syncfusion.Pdf.PdfDocument();
                var stream = new MemoryStream();
                bool ishtml = false;
                string htmlUrl = "";
                var pdfs = new List<PdfLoadedDocument>();
                List<dynamic> statusUpdateList = new List<dynamic>();
                bool hasattachment = false;
                foreach (var mappingId in values)
                {
                    var documentMapping = _proposalService.GetDocumentProposalByMappingId(submoduleName.ToLower(), companyID, Convert.ToInt64(mappingId), proposalId);
                    int innercount = documentMapping.Count;
                    foreach (var item in documentMapping)
                    {
                        if (item.DocumentType == "html")
                        {
                            statusUpdateList.Add(new { Id = mappingId, DocId = item.Id });
                            if (!ishtml)
                            {
                                var siteUrl = "";
                                var model = _configurationSettingService.getcompanySetupDetail(companyID);
                                if (model.SiteUrl != null)
                                {
                                    siteUrl = model.SiteUrl + "/";
                                    //return BadRequest("From Email should not be empty.");
                                }
                                else
                                {
                                    siteUrl = siteUrl = CommonSettings.AppSetting["CommonSettings:SiteLink"];
                                }

                                ishtml = true;
                                string EncryptyURL = _commonService.GetEcryptedId(proposalId);
                                htmlUrl = "<a href=\"" + siteUrl + "proposal-document/" + HttpUtility.UrlEncode(EncryptyURL) + "/system" + "\">Click to view Html Templates</a>";

                            }
                            if (!sendingSource.ToLower().Equals("signnow"))
                            {
                                if (onlyhtml == "yes")
                                {
                                    if (item.DeliveryOption != null)
                                    {
                                        var deliveryOption = JsonConvert.DeserializeObject<DeliveryOption>(item.DeliveryOption);
                                        var customeFieldIdList = new List<string>()
                                            {
                                                deliveryOption.SendToOption //I am getting custom filed id in this variable

                                            };
                                        if (!string.IsNullOrEmpty(deliveryOption.ccEmailOption))
                                        {
                                            customeFieldIdList.Add(deliveryOption.ccEmailOption);
                                        }

                                        //if (string.IsNullOrEmpty(deliveryOption.SendToOption))
                                        //{
                                        //    errorList.Add("Receiver Email is not valid.");
                                        //    //return BadRequest("Receiver Email should not be empty.");
                                        //}
                                        //if (string.IsNullOrEmpty(deliveryOption.ccEmail))
                                        //{
                                        //    errorList.Add("CC Email should not be empty.");
                                        //    //return BadRequest("CC Email should not be empty.");
                                        //}
                                        var data = _proposalService.GetValuesByCustomFieldIdForProposal(companyID.ToString(), userid, "crm",
                                              proposalId.ToString(), string.Join(',', customeFieldIdList),submoduleName.ToLower());
                                        if (!string.IsNullOrEmpty(deliveryOption.SendToOption))
                                        {
                                            var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
                                            response.All = new List<Data>();
                                            if (response.Products != null)
                                            {
                                                response.All.AddRange(response.Products);
                                            }
                                            if (response.account != null)
                                            {
                                                response.All.AddRange(response.account);
                                            }
                                            if (response.contact != null)
                                            {
                                                response.All.AddRange(response.contact);
                                            }
                                            if (response.loanproduct != null)
                                            {
                                                response.All.AddRange(response.loanproduct);
                                            }
                                            if (response.opportunity != null)
                                            {
                                                response.All.AddRange(response.opportunity);
                                            }
                                            if (response.pricebookentity != null)
                                            {
                                                response.All.AddRange(response.pricebookentity);
                                            }
                                            if (response.proposal != null)
                                            {
                                                response.All.AddRange(response.proposal);
                                            }
                                            if (response.serviceterritory != null)
                                            {
                                                response.All.AddRange(response.serviceterritory);
                                            }
                                            if (response.workorder != null)
                                            {
                                                response.All.AddRange(response.workorder);
                                            }
                                            if (response.contract != null)
                                            {
                                                response.All.AddRange(response.contract);
                                            }
                                            email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.SendToOption) && !string.IsNullOrEmpty(m.value))?.value;
                                            if (email == null)
                                            {
                                                //errorList.Add("Receiver Email should not be empty.");
                                                ////return BadRequest("Receiver Email should not be empty.");
                                                //if (!IsValidEmail(email))
                                                //{
                                                //    errorList.Add("Receiver Email is not valid.");
                                                //    //return BadRequest("Receiver Email is not valid.");
                                                //}
                                            }
                                            if (!string.IsNullOrWhiteSpace(deliveryOption.ccEmail))
                                            {
                                                if (deliveryOption.ccEmailOption != null)
                                                {
                                                    ccemail = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.ccEmailOption) && !string.IsNullOrEmpty(m.value))?.value;
                                                }
                                                else
                                                {
                                                    ccemail = deliveryOption.ccEmail;
                                                }
                                            }
                                            //if (ccemail == null)
                                            //{
                                            //    errorList.Add("CC Email should not be empty.");

                                            //    if (!IsValidEmail(ccemail))
                                            //    {
                                            //        errorList.Add("CC Email is not valid.");

                                            //    }
                                            //}
                                        }
                                        else
                                        {

                                        }

                                    }
                                }
                            }

                        }
                        else
                        {
                            hasattachment = true;
                            statusUpdateList.Add(new { Id = mappingId, DocId = item.Id });
                            var client = new WebClient();
                            var content = client.DownloadData(item.FileUrl);
                            var fileStream = new MemoryStream(content);
                            var doc = new PdfLoadedDocument(fileStream);
                            var form = doc.Form;
                            if (sendingSource.ToLower().Equals("signnow"))
                            {
                                var customFields = JsonConvert.DeserializeObject<List<CustomFieldMapper>>(item.Fields);
                                if (item.DeliveryOption != null)
                                {
                                    var deliveryOption = JsonConvert.DeserializeObject<DeliveryOption>(item.DeliveryOption);
                                    if (string.IsNullOrEmpty(deliveryOption.Signer1Option))
                                    {
                                        errorList.Add("Signer 1 is not mapped.");
                                        //return BadRequest("Signer 1 should not be empty.");
                                    }
                                    else if (deliveryOption.Signer1Option != null)
                                    {
                                        var customeFieldIdList = new List<string>
                                    {
                                        deliveryOption.Signer1Option
                                    };
                                        if (!string.IsNullOrEmpty(deliveryOption.Signer2Option))
                                        {
                                            customeFieldIdList.Add(deliveryOption.Signer2Option);
                                        }

                                        var data = _proposalService.GetValuesByCustomFieldIdForProposal(companyID.ToString(), userid, "crm",
                                              proposalId.ToString(), string.Join(',', customeFieldIdList), submoduleName.ToLower());
                                        var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
                                        response.All = new List<Data>();
                                        if (response.Products != null)
                                        {
                                            response.All.AddRange(response.Products);
                                        }
                                        if (response.account != null)
                                        {
                                            response.All.AddRange(response.account);
                                        }
                                        if (response.contact != null)
                                        {
                                            response.All.AddRange(response.contact);
                                        }
                                        if (response.loanproduct != null)
                                        {
                                            response.All.AddRange(response.loanproduct);
                                        }
                                        if (response.opportunity != null)
                                        {
                                            response.All.AddRange(response.opportunity);
                                        }
                                        if (response.pricebookentity != null)
                                        {
                                            response.All.AddRange(response.pricebookentity);
                                        }
                                        if (response.proposal != null)
                                        {
                                            response.All.AddRange(response.proposal);
                                        }
                                        if (response.serviceterritory != null)
                                        {
                                            response.All.AddRange(response.serviceterritory);
                                        }
                                        if (response.workorder != null)
                                        {
                                            response.All.AddRange(response.workorder);
                                        }
                                        if (response.contract != null)
                                        {
                                            response.All.AddRange(response.contract);
                                        }
                                        if (data == null) continue;
                                        {
                                            signer1Email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.Signer1Option) && !string.IsNullOrEmpty(m.value))?.value;
                                            if (signer1Email == null)
                                            {
                                                errorList.Add("Signer 1 should not be empty.");
                                                //return BadRequest("Signer 1 should not be empty.");
                                            }
                                            if (!IsValidEmail(signer1Email))
                                            {
                                                errorList.Add("Signer 1 email is not valid.");
                                                //return BadRequest("Signer 1 email is not valid.");
                                            }

                                            signer2Email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.Signer2Option) && !string.IsNullOrEmpty(m.value))?.value;
                                            //if (signer2Email == null)
                                            //{
                                            //    return BadRequest("Signer 2 should not be empty.");
                                            //}
                                            if (!string.IsNullOrEmpty(signer2Email) && !IsValidEmail(signer2Email))
                                            {
                                                errorList.Add("Signer 2 email is not valid.");
                                                //return BadRequest("Signer 2 email is not valid.");
                                            }
                                        }

                                    }
                                }
                            }
                            else
                            {
                                if (item.DeliveryOption != null)
                                {
                                    var deliveryOption = JsonConvert.DeserializeObject<DeliveryOption>(item.DeliveryOption);
                                    var customeFieldIdList = new List<string>()
                                    {
                                        deliveryOption.SendToOption //I am getting custom filed id in this variable

                                    };
                                    if (!string.IsNullOrEmpty(deliveryOption.ccEmailOption))
                                    {
                                        customeFieldIdList.Add(deliveryOption.ccEmailOption);
                                    }

                                    if (string.IsNullOrEmpty(deliveryOption.SendToOption))
                                    {
                                        errorList.Add("Receiver Email is not valid.");
                                        //return BadRequest("Receiver Email should not be empty.");
                                    }
                                    if (string.IsNullOrEmpty(deliveryOption.ccEmail))
                                    {
                                        errorList.Add("CC Email should not be empty.");
                                        //return BadRequest("CC Email should not be empty.");
                                    }
                                    var data = _proposalService.GetValuesByCustomFieldIdForProposal(companyID.ToString(), userid, "crm",
                                          proposalId.ToString(), string.Join(',', customeFieldIdList), submoduleName.ToLower());
                                    if (!string.IsNullOrEmpty(deliveryOption.SendToOption))
                                    {
                                        var response = JsonConvert.DeserializeObject<ProposalFieldMapping>(data);
                                        response.All = new List<Data>();
                                        if (response.Products != null)
                                        {
                                            response.All.AddRange(response.Products);
                                        }
                                        if (response.account != null)
                                        {
                                            response.All.AddRange(response.account);
                                        }
                                        if (response.contact != null)
                                        {
                                            response.All.AddRange(response.contact);
                                        }
                                        if (response.loanproduct != null)
                                        {
                                            response.All.AddRange(response.loanproduct);
                                        }
                                        if (response.opportunity != null)
                                        {
                                            response.All.AddRange(response.opportunity);
                                        }
                                        if (response.pricebookentity != null)
                                        {
                                            response.All.AddRange(response.pricebookentity);
                                        }
                                        if (response.proposal != null)
                                        {
                                            response.All.AddRange(response.proposal);
                                        }
                                        if (response.serviceterritory != null)
                                        {
                                            response.All.AddRange(response.serviceterritory);
                                        }
                                        if (response.workorder != null)
                                        {
                                            response.All.AddRange(response.workorder);
                                        }
                                        if (response.contract != null)
                                        {
                                            response.All.AddRange(response.contract);
                                        }
                                        email = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.SendToOption) && !string.IsNullOrEmpty(m.value))?.value;
                                        if (email == null)
                                        {
                                            errorList.Add("Receiver Email should not be empty.");
                                            //return BadRequest("Receiver Email should not be empty.");
                                            if (!IsValidEmail(email))
                                            {
                                                errorList.Add("Receiver Email is not valid.");
                                                //return BadRequest("Receiver Email is not valid.");
                                            }
                                        }
                                        if (!string.IsNullOrWhiteSpace(deliveryOption.ccEmail))
                                        {
                                            if (deliveryOption.ccEmailOption != null)
                                            {
                                                ccemail = response.All.FirstOrDefault(m => m.custom_field_id == Convert.ToInt64(deliveryOption.ccEmailOption) && !string.IsNullOrEmpty(m.value))?.value;
                                            }
                                            else
                                            {
                                                ccemail = deliveryOption.ccEmail;
                                            }
                                        }
                                        if (ccemail == null)
                                        {
                                            errorList.Add("CC Email should not be empty.");
                                            //return BadRequest("CC Email should not be empty.");
                                            if (!IsValidEmail(ccemail))
                                            {
                                                errorList.Add("CC Email is not valid.");
                                                //return BadRequest("CC Email is not valid.");
                                            }
                                        }
                                    }
                                    else
                                    {

                                    }

                                }
                            }

                            doc.Form.Flatten = true;
                            pdfs.Add(doc);
                        }



                    }
                }
                //if(hasattachment)
                //{ 
                Syncfusion.Pdf.PdfDocument.Merge(mergedDoc, pdfs.ToArray());
                mergedDoc.Form.Flatten = true;

                mergedDoc.Save(stream);
                stream.Position = 0;
                mergedDoc.Close(true);
                foreach (var pdf in pdfs)
                {
                    pdf.Close(true);
                }
                if (!string.IsNullOrEmpty(body))
                {
                    var data1 = _proposalService.GetCustomFieldsForProposal(companyID.ToString(), userid, "crm",
                   proposalId.ToString(),submoduleName.ToLower());
                    if (!string.IsNullOrWhiteSpace(data1))
                    {
                        var response1 = JsonConvert.DeserializeObject<ProposalFieldMapping>(data1);
                        response1.All = new List<Data>();
                        if (response1.Products != null)
                        {
                            response1.All.AddRange(response1.Products);
                        }
                        if (response1.account != null)
                        {
                            response1.All.AddRange(response1.account);
                        }
                        if (response1.contact != null)
                        {
                            response1.All.AddRange(response1.contact);
                        }
                        if (response1.loanproduct != null)
                        {
                            response1.All.AddRange(response1.loanproduct);
                        }
                        if (response1.opportunity != null)
                        {
                            response1.All.AddRange(response1.opportunity);
                        }
                        if (response1.pricebookentity != null)
                        {
                            response1.All.AddRange(response1.pricebookentity);
                        }
                        if (response1.proposal != null)
                        {
                            response1.All.AddRange(response1.proposal);
                        }
                        if (response1.serviceterritory != null)
                        {
                            response1.All.AddRange(response1.serviceterritory);
                        }
                        if (response1.workorder != null)
                        {
                            response1.All.AddRange(response1.workorder);
                        }
                        if (response1.contract != null)
                        {
                            response1.All.AddRange(response1.contract);
                        }
                        foreach (var d in response1.All)
                        {
                            var value = d.dt_code == "select" ? d.select_options.FirstOrDefault(p => string.Equals(p.value, d.value,
                                                                 StringComparison.CurrentCultureIgnoreCase))?.name
                                                                : d.value;
                            body = body.Replace(d.FormFieldName.Trim(), value);
                        }


                    }
                }
                string UniqueId = $"{proposalId}_{Guid.NewGuid()}";
                if (sendingSource.ToLower().Equals("signnow") && hasattachment)
                {
                    if (signer1Email != null)
                    {
                        var body1 = new StringBuilder();
                        body1.AppendLine(body);
                        if (ishtml)
                        {
                            body1.AppendLine(htmlUrl);
                        }
                        body = body1.ToString();
                        var document_id = await _signNowService.UploadDocument(UniqueId, stream, companyID.ToString());
                        var document = await _signNowService.SendEmbeddedInvite(document_id, signer1Email, signer2Email, companyID.ToString()) ;

                        var signResponse = await _signNowService.SendInvite(document_id, signer1Email, signer2Email, subject, body.ToString(), companyID.ToString());
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Document have been Sent successfully through Sign Now.";
                        foreach (dynamic status in statusUpdateList)
                        {
                            _proposalService.UpdateProposalStatus(Convert.ToInt64(status.Id), Convert.ToInt64(status.DocId), proposalId, "SENT", sendingSource.ToUpper(), document_id);
                        }
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 400;
                        resultResponseModel.ResponseMessage = "Signer Email should not be empty.";
                    }
                }
                else
                {
                    if (email != null && IsValidEmail(email))
                    {
                        var model = _configurationSettingService.getcompanySetupDetail(companyID);
                        if (model.FromEmail == null)
                        {
                            errorList.Add("From Email should not be empty.");
                            //return BadRequest("From Email should not be empty.");
                        }
                        else if (!IsValidEmail(model.FromEmail))
                        {
                            errorList.Add("From Email is not valid.");
                            //return BadRequest("From Email is not valid.");
                        }
                        else
                        {
                            MailMessage mail = new MailMessage();
                            SmtpClient SmtpServer = new SmtpClient();
                            mail.From = new MailAddress(model.FromEmail);
                            mail.To.Add(email);
                            mail.Subject = subject;
                            mail.IsBodyHtml = true;
                            mail.Body = body;
                            if (!string.IsNullOrWhiteSpace(ccemail))
                            {
                                mail.CC.Add(ccemail);
                            }
                            // mail.Body = "proposal test";
                            var body1 = new StringBuilder();
                            body1.AppendLine(body);
                            if (ishtml)
                            {
                                body1.AppendLine(htmlUrl);
                            }
                            mail.Body = body1.ToString();
                            if (hasattachment)
                            {
                                Attachment attachment = new Attachment(stream, UniqueId + ".pdf");
                                mail.Attachments.Add(attachment);
                            }
                            SmtpServer.Port = Convert.ToInt32(model.SMTPport);
                            SmtpServer.Host = model.SMTPHost;
                            SmtpServer.Credentials = new System.Net.NetworkCredential(model.SMTPusername, model.SMTPpassword);
                            SmtpServer.EnableSsl = model.IsEnableSSL;
                            SmtpServer.Send(mail);
                            stream.Close();
                            resultResponseModel.StatusCode = 200;
                            resultResponseModel.ResponseMessage = "Document have been Sent successfully through Email.";
                            foreach (dynamic status in statusUpdateList)
                            {
                                _proposalService.UpdateProposalStatus(Convert.ToInt64(status.Id), Convert.ToInt64(status.DocId), proposalId, "SENT", sendingSource.ToUpper(),"");
                            }
                        }
                    }
                    else
                    {
                        resultResponseModel.StatusCode = 400;
                        resultResponseModel.ResponseMessage = "Receiver Email should not be empty.";
                    }

                }

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

                var companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
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

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

    }




}