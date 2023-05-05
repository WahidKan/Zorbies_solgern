using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository.SFContactUs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.SFContactUs
{
   public class ContactUsService: IContactUsService
    {
      

        private readonly IContactUsRepository _repository;
        public ContactUsService(IContactUsRepository repository)
        {
            _repository = repository;
        }
        public async Task<dynamic> AddContactUs(SFContactUsModel contactUsModel)
        {
            var data = await _repository.AddContactUs(contactUsModel);

            return data;
        }
        public string GetSuperAdminMail()
        {
            var data = _repository.GetSuperAdminMail();

            return data;
        }
            
        
      
        
        public async Task<PagedData> GetContactUsLeadsList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, bool? isForSuperAdminDashboard, string fromDate, string toDate)
        {
            var data = await _repository.GetContactUsLeadsList(listFilter,sortColumn, sortDir, pageIndex, pageSize, isForSuperAdminDashboard, fromDate, toDate);

            return data;
        }

    }
}
