using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ICreditBureauHistoryRepository
    {
        Task<Int64> Save(string trades, string employments, long loanApplicationId, long applicantId, string applicantType, long creditBureauId, long companyId, Guid userId);
        Task<PagedData> GetHistoryByLoanApplicationId(long loanApplicationId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid userId, long companyID);
    }
}
