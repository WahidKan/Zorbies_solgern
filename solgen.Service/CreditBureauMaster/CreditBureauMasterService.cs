using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class CreditBureauMasterService : ICreditBureauMasterService
    {
        private readonly ICreditBureauMasterRepository _creditBureauMasterRepository;

        public CreditBureauMasterService(ICreditBureauMasterRepository creditBureauMasterRepository)
        {
            _creditBureauMasterRepository = creditBureauMasterRepository;
        }
        public async Task<string> GetCreditBureauById(long BureauId, long CompanyId, Guid UserId)
        {
            return await _creditBureauMasterRepository.GetCreditBureauById(BureauId, CompanyId, UserId);
        }

        public async Task<string> GetCreditBureauList(long CompanyId, Guid UserId)
        {
            return await _creditBureauMasterRepository.GetCreditBureauList(CompanyId, UserId);
        }
    }
}
