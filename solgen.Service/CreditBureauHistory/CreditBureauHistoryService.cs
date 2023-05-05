using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class CreditBureauHistoryService : ICreditBureauHistoryService
    {
        private readonly ICreditBureauHistoryRepository _creditBureauHistoryRepository;

        public CreditBureauHistoryService(ICreditBureauHistoryRepository creditBureauHistoryRepository)
        {
            _creditBureauHistoryRepository = creditBureauHistoryRepository;
        }

        public async Task<PagedData> GetHistoryByLoanApplicationId(long loanApplicationId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid userId, long companyID)
        {
            return await _creditBureauHistoryRepository.GetHistoryByLoanApplicationId(loanApplicationId, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
        }

        public async Task<long> Save(string trades, string employments, long loanApplicationId, long applicantId, string applicantType, long creditBureauId, long companyId, Guid userId)
        {
            return await _creditBureauHistoryRepository.Save(trades, employments, loanApplicationId, applicantId, applicantType, creditBureauId, companyId, userId);
        }
    }
}
