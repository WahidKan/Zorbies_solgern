using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Repository.Subscription
{
    public interface ISubscriptionRepository
    {
        //string GetPackageList();
        //string GetAdOnsList();
        int AddCompanySubscription(string userId, CompanySubscriptionModel json);
        PagedData GetSubscriptionList(string sortCol, string sortOrder, int totalPage, int pageNum, string searchBy,string searchIndustry, bool? isForSuperAdminDashboard, string fromDate, string toDate);
        string CheckEmailDuplicate(string Email);
        bool DeleteSubscription(int Id);
        string CreateCompany(int Id);
        string GetSubscriptionApi(string CompanyId);
    }
}
