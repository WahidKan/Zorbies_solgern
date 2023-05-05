using Microsoft.AspNetCore.Mvc;
using Solgen.Core;
using Solgen.Service.CustomerAnnouncemement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/CustomerAnnouncement")]
    public class CustomerAnnouncementController : Controller
    {
        private readonly ICustomerAnnouncementService _customerAnnouncementService;
        private long CompanyID { get { return Convert.ToInt64(User.Claims.FirstOrDefault(x => x.Type == "CompanyID")?.Value); } }
        private Guid? userID
        {
            get
            {
                string user = User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                return !string.IsNullOrEmpty(user) ? Guid.Parse(user) : Guid.Empty;
            }
        }
        public CustomerAnnouncementController(ICustomerAnnouncementService customerAnnouncementService)
        {
            _customerAnnouncementService = customerAnnouncementService; 
        }
        [HttpPost]
        [Route("AddEditCustomerAnnouncement")]
        public int AddEditCustomerAnnouncement(int Id, string model)
        {
            return _customerAnnouncementService.AddEditCustomerAnnouncement(Id, userID.ToString(), model, CompanyID.ToString());
        }
        [HttpGet]
        [Route("DeleteCustomerAnnouncement")]
        public bool DeleteCustomerAnnouncement(int Id)
        {
            return _customerAnnouncementService.DeleteCustomerAnnouncement(Id, userID.ToString());
        }
        [HttpGet]
        [Route("GetCustomerAnnouncementById")]
        public string GetCustomerAnnouncementById(int id)
        {
            return _customerAnnouncementService.GetCustomerAnnouncementById(id);
        }
        [HttpGet]
        [Route("GetCustomerAnnouncementList")]
        public PagedData GetCustomerAnnouncementList(int pageNo, int totalPage, string sortCol, string sortDir, string seacrh)
        {
            return _customerAnnouncementService.GetCustomerAnnouncementList(pageNo, totalPage, sortCol, sortDir, seacrh);
        }



    }
}
