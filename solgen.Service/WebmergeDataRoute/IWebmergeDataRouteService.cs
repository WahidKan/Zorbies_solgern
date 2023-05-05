using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface IWebmergeDataRouteService
    {
        Task<long> SaveWebmergeDataRoute(string data, long bankId, Guid userId, long companyId);
        Task<long> UpdateWebmergeDataRoute(string data, Guid userId, long companyId);
        Task<string> GetWebmergeDataRoute(long dataRouteId, long companyId);
        Task<string> GetWebmergeDataRoutes(long bankId, long companyId);
        Task<string> GetWebmergeDataRouteRules(long dataRouteId, long companyId);
    }
}
