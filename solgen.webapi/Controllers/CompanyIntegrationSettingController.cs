using Microsoft.AspNetCore.Mvc;
using Solgen.Core.Models;
using Solgen.Service.CompanyIntegrationSetting;
using Solgen.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/CompanyIntegrationSetting")]
    public class CompanyIntegrationSettingController : Controller
    {

        private ICompanyIntegrationSettingService _companyIntegrationSettingService;

        private long companyID => Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value);
        private Guid? userID => Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value);
        public CompanyIntegrationSettingController(ICompanyIntegrationSettingService companyIntegrationSettingService)
        {
            _companyIntegrationSettingService = companyIntegrationSettingService;
        }
        [HttpGet]
        //[Authorize]
        [Route("GetCompanyIntegrationSetting")]
        public IActionResult GetCompanyIntegrationSetting(string moduleName, string strType, string displayCode)
        {
            var result = _companyIntegrationSettingService.GetCompanyIntegrationSetting(companyID.ToString(), userID.ToString(), moduleName,strType,displayCode);
            if (result == null)
                return BadRequest();

            return Content(result, "application/json");
        }

        [HttpPost]
        [Route("AddEditCompanyIntegrationSetting")]
        public async Task<IActionResult> AddEditCompanyIntegrationSetting([FromBody] CompanyIntegrationSettingModel model)
        {
            ResultResponseModel responseModel = new ResultResponseModel();

            try
            {
                var name = User.Claims.FirstOrDefault(x => x.Type == "Name")?.Value;
                model.UserId = userID.ToString();
                string data = _companyIntegrationSettingService.AddEditCompanyIntegrationSetting(model);
                var datacode = data.Split('~');

                if (datacode.Length > 1)
                {
                    if (datacode[0] == "-1")
                    {
                        responseModel.StatusCode = 500;
                        responseModel.ResponseMessage = datacode[1];
                    }
                }
                else if (data != null)
                {
                    if (model.CompanyId == "")
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Company Integration Settings has been added successfully.";
                    }
                    else
                    {
                        responseModel.StatusCode = 200;
                        responseModel.ResponseMessage = "Company Integration Settings has been updated successfully.";
                    }
                }
                else
                {
                    responseModel.StatusCode = 500;
                    responseModel.ResponseMessage = "Something went wrong. Please try again later!.";
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
