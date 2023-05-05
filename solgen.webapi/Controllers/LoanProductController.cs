using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Service;
using Solgen.WebApi.Helpers;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/loanproduct")]
    public class LoanProductController : Controller
    {
        private ILoanProductService _loanproductService;
        private ITaskService _taskService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        //private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }

        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private IDashboardService _dashboardService;
        // private ITaskService _taskService;
        string PrimaryKey { get; set; }

        //private string PrimaryKey { get { return Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "PrimaryKey")?.Value); } }
        private string ContainerName { get; set; }
        //string _storageConnection = "DefaultEndpointsProtocol=https;AccountName=cogniterblob;AccountKey=oXQjBBKmxYqW25tdQMlbULpgufzkpxnc+k1ecUNUSL1FOkRplbAcQ0vanCYSiqyvMf4dudyceSDw4GMgGC2w6w==;EndpointSuffix=core.windows.net";
        string _storageConnection { get; set; }
        CloudStorageAccount cloudStorageAccount;
        CloudBlobClient cloudBlobClient;
        CloudBlobContainer blobContainer;

        public LoanProductController(ILoanProductService loanproductService, ITaskService taskService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _loanproductService = loanproductService;
            _taskService = taskService;
            _commonService = commonService;
            _httpContext = httpContext;
        }

        [HttpGet]
        [Authorize]
        [Route("GetCreditBureauMaster")]
        public IActionResult GetCreditBureauMaster(long leadid, int submoduleid, string objectname)
        {
            try
            {
                string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetCreditBureauMaster(userid, companyid.ToString());
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetLoanProducts")]
        public IActionResult GetLoanProducts(string bankIds)
        {
            try
            {                
                long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetLoanProductList(companyid, bankIds);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("GetLoanProductDetailById")]
        public IActionResult GetLoanProductDetailById(long? id, long loanid)
        {
            try
            {
                long companyid = Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetLoanProductDetailById(id, companyid, loanid);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }



        [HttpGet]
        [Authorize]
        [Route("GetPrerequisiteLoanProductDocumentTypeNames")]
        public IActionResult GetPrerequisiteLoanProductDocumentTypeNames(string masterName)
        {
            try
            {
                string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetPrerequisiteLoanProductDocumentTypeNames(userid, companyid.ToString(), masterName);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetGetLoanProductDiscountCategoryNames")]
        public IActionResult GetGetLoanProductDiscountCategoryNames(string masterName)
        {
            try
            {
                string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetGetLoanProductDiscountCategoryNames(userid, companyid.ToString(), masterName);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetCreditBureauMasterEdit")]
        public IActionResult GetCreditBureauMasterEdit(long leadid, int submoduleid, string productId)
        {
            try
            {
                string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetCreditBureauMasterEdit(userid, companyid.ToString(), productId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetPrerequisiteLoanProductEdit")]
        public IActionResult GetPrerequisiteLoanProductEdit(long leadid, int submoduleid, string productId)
        {
            try
            {
                string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetPrerequisiteLoanProductEdit(userid, companyid.ToString(), productId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetLoanProductDiscountCategoryEdit")]
        public IActionResult GetLoanProductDiscountCategoryEdit(long leadid, int submoduleid, string productId)
        {
            try
            {
                string userid = (User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var lst = _loanproductService.GetLoanProductDiscountCategoryEdit(userid, companyid.ToString(), productId);
                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddUpdateLoanProduct")]
        public async Task<IActionResult> AddUpdateLoanProduct([FromForm]LoanApplicationProductModel model)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            List<FileUploadList> objModel = new List<FileUploadList>();
            FileUploadList objData = new FileUploadList();
            if (model != null)
            {
                int companyid = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.companyId = companyid;
                string filePath = CommonSettings.AppSetting["CommonSettings:UserProfilePick"];

                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                //Azure server path
                PrimaryKey = (User.Claims.FirstOrDefault(x => x.Type == "PrimaryKey")?.Value);
                ContainerName = Convert.ToString(User.Claims.FirstOrDefault(x => x.Type == "ContainerName")?.Value);

                
               // var result = "";
                //end azure server
                model.CreatedBy = userid;
                if (Request.Form.Files.Count > 0)
                {
                    //_storageConnection = "DefaultEndpointsProtocol=https;AccountName=cogniterblob;AccountKey=" + PrimaryKey + ";EndpointSuffix=core.windows.net";
                    //cloudStorageAccount = CloudStorageAccount.Parse(_storageConnection);
                    //cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                    //blobContainer = cloudBlobClient.GetContainerReference(ContainerName);
                    //string filePrefix = "";
                    //string filePrefixImage = "";
                    //string FilePrefixType = "";
                    //foreach (var filePre in Request.Form.Files)
                    //{
                    //    if (filePre.Name == "fileNameImage")
                    //    {
                    //        filePrefixImage = "loanProductImage";
                    //    }
                    //    if (filePre.Name == "file")
                    //    {
                    //        filePrefix = "loanProductBrochure";
                    //    }
                    //}

                    //var file = Request.Form.Files[0];

                    foreach (var file in Request.Form.Files)
                    {
                        string blobPath = "files/" + "FSM" + "/" + "FSM_DETAIL" + "/" +
                            Guid.NewGuid().ToString() + ".jpg";
                        var filePath2 = Path.GetTempFileName();
                        if (!Directory.Exists(CommonSettings.AppSetting["CommonSettings:UploadLoanDocuments"]))
                        {
                            Directory.CreateDirectory(CommonSettings.AppSetting["CommonSettings:UploadLoanDocuments"]);
                        }

                       
                        using (var stream = file.OpenReadStream())
                        {
                            // result = await UploadBlob(stream, ".jpg", "", "", "", blobPath);
                            var result = Util.UploadFileFromStream(stream, file.FileName, CommonSettings.AppSetting["CommonSettings:UploadLoanDocuments"], "Document");

                            if (file.Name == "fileNameImage")
                            {
                                string fileExtension = Path.GetExtension(result.Item1);
                                model.DocumentTypeFileImage = fileExtension;
                                objData.FileUrl =  "";
                                objData.FileName = Path.GetFileName(result.Item1);
                                objData.Type = fileExtension;
                                objModel.Add(objData);
                                
                            }
                            else if (file.Name == "file")
                            {
                                string fileExtension = Path.GetExtension(result.Item1);
                                model.DocumentTypeFileBrochure = fileExtension;
                                model.BrochureFileName = result.Item1 ?? "";
                                objData.FileUrl = "";
                                objData.FileName = Path.GetFileName(result.Item1);
                                objData.Type = fileExtension;
                                //filePrefix = "loanProductBrochure";
                                objModel.Add(objData);
                            }
                        }
                    }

                }
                //var data = 0;
                var data = _loanproductService.AddUpdateLoanProduct(model);
                if (data != null)
                {
                    if (data == "-2")
                    {
                        resultResponseModel.StatusCode = 500;
                        resultResponseModel.ResponseMessage = "SFProductId already exist.";
                        return Ok(resultResponseModel);
                    }
                    if (model.ProductId == null)
                    {
                        try
                        {
                            foreach (var item in objModel)
                            {
                                item.UserId = userid;
                                item.RefId = data;

                                item.CompanyId = CompanyID + "";
                                //item.FileUrl = result;
                                //item.FileName = model.BrochureFileName;
                                item.Module = 1;
                                item.SubModule = 2;
                                //objModel.Add(item);
                            }
                        }
                        catch (Exception ex)
                        {

                        }


                        _taskService.SaveOpportunityAttachmentList(objModel, model.ProductId);
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Loan Product has been inserted successfully.";
                        return Ok(resultResponseModel);
                    }
                    else
                    {
                        foreach (var item in objModel)
                        {
                            item.UserId = userid;
                            item.RefId = Convert.ToString(model.ProductId);
                            item.Id = model.ProductId;
                            item.CompanyId = CompanyID + "";
                            //item.FileUrl = result;
                            //item.FileName = model.BrochureFileName;
                            item.Module = 1;
                            item.SubModule = 2;
                            //objModel.Add(item);
                        }
                        _taskService.SaveOpportunityAttachmentList(objModel, model.ProductId);
                        // _taskService.SaveOpportunityAttachment(objModel);
                        resultResponseModel.StatusCode = 200;
                        resultResponseModel.ResponseMessage = "Loan Product has been updated successfully.";
                        return Ok(resultResponseModel);
                    }
                }
                else
                {
                    resultResponseModel.StatusCode = 500;
                    resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                    return Ok(resultResponseModel);
                }
            }
            else
            {
                resultResponseModel.StatusCode = 500;
                resultResponseModel.ResponseMessage = "Something went wrong. Please contact administrator.";
                return Ok(resultResponseModel);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetLoanProductlist")]
        public async Task<IActionResult> GetLoanProductlist(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string custom_view_id, string searchFilter, string moduleName, string submoduleName, long companyId)
        {
            try
            {
                if (companyId == 0)
                    companyId = CompanyID;

                var lst = await _loanproductService.GetLoanProductlist(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
                return Content(lst, "application/json");
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetLoanProductById")]
        public async Task<IActionResult> GetLoanProductById(string id, string moduleName, string submoduleName, Guid user, long company)
        {
            var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
            var result = await _loanproductService.GetLoanProductById(id, moduleName, submoduleName, user, company);

            if (result == null)
                return BadRequest();
            return Content(result, "application/json");
        }
        [HttpGet]
        [Authorize]
        [Route("DeleteRecords")]
        public IActionResult DeleteRecords(string primaryKey, string tableName)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                var result = _loanproductService.DeleteRecords(tableName, primaryKey.TrimEnd(','));

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

        public async Task<string> UploadBlob(Stream file, string extension, string contentType, string moduleName, string subModuleName, string blobPath)
        {
            try
            {
                await blobContainer.CreateIfNotExistsAsync(BlobContainerPublicAccessType.Container, null, null);
                //   TalygenApp.Models.BasePage.Hide();
                if (blobContainer != null)
                {
                    extension = extension.Replace(".", "");
                    var newBlob = blobContainer.GetBlockBlobReference(blobPath);
                    var path = newBlob.StorageUri;
                    newBlob.Properties.ContentType = contentType;

                    var blob = blobContainer.GetBlockBlobReference(blobPath);
                    await blob.UploadFromStreamAsync(file);

                    return blobPath;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet]
        [Authorize]
        [Route("GetSolgenUser")]
        public IActionResult GetSolgenUser()
        {
            List<ComapanyModel> lst = new List<ComapanyModel>();
            try
            {
                var userid = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var companyid = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                lst = _loanproductService.GetSolgenUser(userid,companyid);

                return Ok(lst);
            }
            catch //(Exception ex)
            {
                return BadRequest();
            }
        }

       
        [HttpPost]
        [Authorize]
        [Route("SaveLoanproductPresiteDocument")]
        public async Task<IActionResult> SaveLoanproductPresiteDocument([FromBody] PresiteDocumentModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.CreatedBy =User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var records = await _loanproductService.GetLoanProductPresiteDocumentByDocumentType(companyID,Convert.ToInt64(model.LoanProductId), model.DocumentName);

                if (records > 0)
                {
                    result.ResponseMessage = "Document Type with \""+model.DocumentName+ "\" already exists. Please try with diffrent Document Type.";
                    result.StatusCode = 403;
                    return Ok(result);
                }
                else
                {
                    model.CompanyId = companyID.ToString();
                    result.ResponseMessage = _loanproductService.SaveLoanproductPresiteDocument(model);
                    result.StatusCode = 200;
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UpdatePresiteDocumentById")]
        public async Task<IActionResult>  UpdatePresiteDocumentById([FromBody] UpdatePresiteDocumentModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.ModifiedBy = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var records = await _loanproductService.GetLoanProductPresiteDocumentByDocumentType(companyID,0, model.DocumentName);

                if (records > 0)
                {
                    result.ResponseMessage = "Document Type with \"" + model.DocumentName + "\" already exists. Please try with diffrent Document Type.";
                    result.StatusCode = 403;
                    return Ok(result);
                }
                else
                {
                    var data = _loanproductService.UpdateLoanproductPresiteDocumentById(model);
                    result.ResponseMessage = "Prerequisite Document has been updated successfully.";
                    result.StatusCode = 200;
                    return Ok(result);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost]
        [Authorize]
        [Route("AddEditDiscountDocument")]
        public IActionResult AddEditDiscountDocument([FromBody] PresiteDocumentModel model)
        {
            ResultResponseModel result = new ResultResponseModel();
            model.CreatedBy = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID.ToString();
                var data = _loanproductService.AddEditDiscountDocument(model);
                if (model.DocumentId == null || model.DocumentId == "")
                {
                    result.ResponseMessage = "Prerequisite Document has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Prerequisite Document has been updated successfully.";
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
        [Route("DeletePrerequisite")]
        public IActionResult DeletePrerequisite(string docId,string loanProductId)
        {
            DeletePresiteDocumentModel model = new DeletePresiteDocumentModel();
            ResultResponseModel result = new ResultResponseModel();
            model.ModifiedBy = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID.ToString();
                model.DocumentId = docId;
                model.LoanProductId = loanProductId;
                var data = _loanproductService.DeletePrerequisite(model);
                if (model.DocumentId == null || model.DocumentId == "")
                {
                    result.ResponseMessage = "Prerequisite Document has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Prerequisite Document has been added successfully.";
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
        [Route("DeleteDiscountCategory")]
        public IActionResult DeleteDiscountCategory(string docId, string loanProductId)
        {
            PresiteDocumentModel model = new PresiteDocumentModel();
            ResultResponseModel result = new ResultResponseModel();
            model.CreatedBy = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;

            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                model.CompanyId = companyID.ToString();
                model.DocumentId = docId;
                model.DocumentName = loanProductId;
                var data = _loanproductService.DeleteDiscountCategory(model);
                if (model.DocumentId == null || model.DocumentId == "")
                {
                    result.ResponseMessage = "Prerequisite Document has been added successfully.";
                }
                else
                {
                    result.ResponseMessage = "Prerequisite Document has been added successfully.";
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
        [Route("UpdateLoanPrerequisiteDocumentName")]
        public IActionResult UpdateLoanPrerequisiteDocumentName(string documentName,long documentTypeId)
        {
            ResultResponseModel result = new ResultResponseModel();
            try
            {
                var UserId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                var data = _loanproductService.UpdateLoanPrerequisiteDocumentName(documentName, documentTypeId, UserId);
                if (data > 0)
                {
                    result.ResponseMessage = "Prerequisite Document has been updated successfully.";
                    result.StatusCode = 200;
                }
                else
                {
                    result.ResponseMessage = "Something went wrong. Please contact administrator";
                    result.StatusCode = 500;
                }


                return Ok(result);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}