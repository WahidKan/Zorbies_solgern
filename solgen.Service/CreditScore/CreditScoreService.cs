using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class CreditScoreService : ICreditScoreService
    {
        private readonly ICreditScoreRepository _creditScoreRepository;

        public CreditScoreService(ICreditScoreRepository creditScoreRepository)
        {
            _creditScoreRepository = creditScoreRepository;
        }

        public async Task<string> GetCreditScoreByLoanAppicationId(long LoanApplicationId, long CompanyID)
        {
            return await _creditScoreRepository.GetCreditScoreByLoanAppicationId(LoanApplicationId, CompanyID);
        }

        public async Task<string> Save(string CreditScoreModel, Guid userid, long companyid)
        {
            return await _creditScoreRepository.Save(CreditScoreModel, userid, companyid);
        }
    }
}
