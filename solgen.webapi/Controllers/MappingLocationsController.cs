using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

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
using Microsoft.AspNetCore.Mvc;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/mappinglocation")]
    public class MappingLocationsController : Controller
    {
        private readonly IMappingLocationsService _mappingLocationsService;
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContext;
        private string WebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "Browser")?.Value.ToString(); } }
        private string OSWebBrowser { get { return User.Claims.FirstOrDefault(x => x.Type == "BrowserVersion")?.Value.ToString(); } }
        private string IPAddress { get { return _httpContext.HttpContext.Connection.RemoteIpAddress.ToString(); } }
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        public MappingLocationsController(IMappingLocationsService mappingLocationsService, ICommonService commonService, IHttpContextAccessor httpContext)
        {
            _mappingLocationsService = mappingLocationsService;
            _commonService = commonService;
            _httpContext = httpContext;
        }
        [HttpGet]
        //[Authorize]
        [Route("getmappinglocationlist")]
        public IActionResult getNoteslist(long locationId=0, string SortColumn = "", string SortDir = "", int PageNo=0, int PageSize=10)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _mappingLocationsService.getMappingLocationslist(locationId, SortColumn, SortDir, PageNo, PageSize, companyID);
                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        } 
        [HttpGet]
        //[Authorize]
        [Route("getMappingMembersList")]
        public IActionResult GetMappingMembersList(long locationId=0, string SortColumn = "", string SortDir = "", int PageNo=0, int PageSize=10)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _mappingLocationsService.GetMappingMembersList(locationId, SortColumn, SortDir, PageNo, PageSize, companyID);
                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [HttpGet]
        [Route("GetRelatedMappingWareHouse")]
        public IActionResult GetRelatedMappingWareHouse(long id = 0)
        {
            ResultResponseModel resultResponseModel = new ResultResponseModel();
            try
            {
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _mappingLocationsService.GetRelatedMappingWareHouse(id, companyID);
                return Ok(data);


            }
            catch (Exception ex)
            {

                return BadRequest();
            }


        }
        [Route("DeleteMappingLocation")]
        [HttpGet]
        public int DeleteNote(string id)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _mappingLocationsService.DeleteMappingLocation(id, userId,companyID);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [Route("DeleteMappingMember")]
        [HttpGet]
        public int DeleteMappingMember(string id)
        {
            try
            {
                Guid userId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
                long companyID = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
                var data = _mappingLocationsService.DeleteMappingMember(id, userId, companyID);
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpGet]
        [Route("GetLocationDropdownBasedOnLocationType")]
        public IActionResult GetWorkOrderTypeBasedonWorkorder(string id)
        {
            int companyId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
            string userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
            var result = _mappingLocationsService.GetLocationDropdownBasedOnLocationType(id, userId, companyId.ToString());
            return Ok(result);
        }
        [Route("NewMappingLocationSave")]
        [HttpPost]
        [Authorize]
        public IActionResult NewMappingLocationSave([FromBody]JsonModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();
            try
            {
                model.userId = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                model.companyId = User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value;
                string retResponseMessage = string.Format("Mapping location has been created successfully");
                string data = _mappingLocationsService.NewMappingLocationSave(model);
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
            catch (Exception ex)
            {

                responseModel.StatusCode = 500;
                responseModel.ResponseMessage = "Something went wrong. Please try again later.";
                return BadRequest();
            }
        }
    }
}
