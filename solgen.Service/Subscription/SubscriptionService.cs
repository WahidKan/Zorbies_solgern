using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository.Subscription;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.Subscription
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        public SubscriptionService(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public int AddCompanySubscription(string UserId, CompanySubscriptionModel model)
        {
           return  _subscriptionRepository.AddCompanySubscription(UserId, model);
        }

        public PagedData GetSubscriptionList(string sortCol, string sortOrder, int totalPage, int pageNum, string searchBy,string searchIndustry, bool? isForSuperAdminDashboard, string fromDate, string toDate)
        {
            return this._subscriptionRepository.GetSubscriptionList(sortCol, sortOrder, totalPage, pageNum, searchBy, searchIndustry, isForSuperAdminDashboard, fromDate, toDate);
        }
        public string CheckEmailDuplicate(string Email)
        {
            return this._subscriptionRepository.CheckEmailDuplicate(Email);
        }

        public bool DeleteSubscription(int Id)
        {
            return this._subscriptionRepository.DeleteSubscription(Id);
        }

        public string CreateCompany(int Id)
        {
            return this._subscriptionRepository.CreateCompany(Id);
        }
        public string GetSubscriptionApi(string companyId)
        {
            return this._subscriptionRepository.GetSubscriptionApi(companyId);
        }
        //public string GetAdOnsList()
        //{
        //    return this._subscriptionRepository.GetAdOnsList();
        //}

        //public string GetPackageList()
        //{
        //    return this._subscriptionRepository.GetPackageList();
        //}
    }
}
