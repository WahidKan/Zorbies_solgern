using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Solgen.Service;
using Solgen.WebApi.Helpers;
using Solgen.Core.Models;
using System;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Modules")]
    public class ModulesController : Controller
    {
        private readonly IModuleService _moduleService;
        private long companyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private string userID { get { return User.Claims.FirstOrDefault(x => x.Type == "UserID").Value; } }
        public ModulesController(IModuleService moduleService)
        {
            _moduleService = moduleService;
        }
        [HttpGet]
        [Authorize]
        /*! 
      * \brief   get module list.
      * \details Function is used to Get the  get module list.
      * \author  kiran bala.
      * \date    24 oct 2019    
      * \version 1.0    
      */
        public IActionResult Get(string userid)
        {
            var moduleList = _moduleService.GetModuleList(userid, companyID.ToString());
            foreach (var item in moduleList)
            {
                item.CompanyLogo = CommonFunctions.GetFileLink(item.CompanyLogo, "image", enumFileFolder.user);
                if (item.CompanyLogo.Contains("defaultNoImage"))
                {
                    item.CompanyLogo = "javascript:void(0);";

                }
                else
                {

                    item.CompanyLogo = item.CompanyLogo.Replace("wwwroot", "");
                    //item.CompanyLogo= item.CompanyLogo.Replace("UserProfilePick/", "UserProfilePick//////");
                }
            }
            return Ok(moduleList);
        }


        [HttpGet]
        [Authorize]
        [Route("GetSubModules")]

        /*! 
      * \brief   get sub module list.
      * \details Function is used to Get the  get sub module list.
      * \author  Amandeep Singh
      * \date    8 oct 2020    
      * \version 1.0    
      */
      

        [HttpGet]
        //[Authorize]
        [Route("GetSubModuleFields")]
        public IActionResult GetSubModuleFields(string subModuleName)
        {
            var result = _moduleService.GetSubModuleDetails(Convert.ToInt32(companyID), subModuleName,userID);
            //return BadRequest();

            return Content(result, "application/json");
        }
        [HttpGet]
        [Authorize]
        [Route("getRoleModuleList")]
        public IActionResult getRoleModuleList(bool isApplyRole, bool fromMobile=false)
        {
            var result = _moduleService.getRoleModuleList(companyID, Guid.Parse(userID), isApplyRole, fromMobile);
            /////why bad request if data is null
            ////////if(result == null)
            ////////return BadRequest();
            if (fromMobile)
                return Content(result, "application/json");
            else
                return Ok(result);
        }
    }
}