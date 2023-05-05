using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.Subscription
{
    public interface IPackageService
    {
        Task<string> GetPackage(string companyId);
        Task<string> GetDiscount(string companyId);
        Task<string> GetAddOn(string companyId);
        Task<string> PostApi(string companyId, TalygeModel model);
     }
}
