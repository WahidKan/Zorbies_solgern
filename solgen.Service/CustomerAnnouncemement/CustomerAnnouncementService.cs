using Solgen.Core;
using Solgen.Repository.CustomerAnnouncement;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.CustomerAnnouncemement
{
    public class CustomerAnnouncementService : ICustomerAnnouncementService
    {
        private readonly ICustomerAnnouncementRepository _customerAnnouncementRepository;
        public CustomerAnnouncementService(ICustomerAnnouncementRepository customerAnnouncementRepository)
        {
            _customerAnnouncementRepository = customerAnnouncementRepository;
        }
        public int AddEditCustomerAnnouncement(int Id, string UserId, string model, string companyId)
        {
            return _customerAnnouncementRepository.AddEditCustomerAnnouncement(Id, UserId, model, companyId);
        }

        public bool DeleteCustomerAnnouncement(int Id, string UserId)
        {
            return _customerAnnouncementRepository.DeleteCustomerAnnouncement(Id, UserId);
        }

        public string GetCustomerAnnouncementById(int id)
        {
            return _customerAnnouncementRepository.GetCustomerAnnouncementById(id);
        }

        public PagedData GetCustomerAnnouncementList(int pageNo, int totalPage, string sortCol, string sortDir, string seacrh)
        {
            return _customerAnnouncementRepository.GetCustomerAnnouncementList(pageNo, totalPage, sortCol, sortDir, seacrh);
        }
    }
}
