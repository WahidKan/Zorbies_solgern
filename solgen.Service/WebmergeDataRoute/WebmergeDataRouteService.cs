using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class WebmergeDataRouteService : IWebmergeDataRouteService
    {
        private readonly IWebmergeDataRouteRepository _webmergeDataRouteRepository;
        public WebmergeDataRouteService(IWebmergeDataRouteRepository webmergeDataRouteRepository)
        {
            _webmergeDataRouteRepository = webmergeDataRouteRepository;
        }
        public async Task<string> GetWebmergeDataRoute(long dataRouteId, long companyId)
        {
            return await _webmergeDataRouteRepository.GetWebmergeDataRoute(dataRouteId, companyId);
        }

        public async Task<string> GetWebmergeDataRouteRules(long dataRouteId, long companyId)
        {
            return await _webmergeDataRouteRepository.GetWebmergeDataRouteRules(dataRouteId, companyId);
        }

        public async Task<string> GetWebmergeDataRoutes(long bankId, long companyId)
        {
            return await _webmergeDataRouteRepository.GetWebmergeDataRoutes(bankId, companyId);
        }

        public async Task<long> SaveWebmergeDataRoute(string data, long bankId, Guid userId, long companyId)
        {
            return await _webmergeDataRouteRepository.SaveWebmergeDataRoute(data, bankId, userId, companyId);
        }

        public async Task<long> UpdateWebmergeDataRoute(string data, Guid userId, long companyId)
        {
            return await _webmergeDataRouteRepository.UpdateWebmergeDataRoute(data, userId, companyId);
        }
    }
}
