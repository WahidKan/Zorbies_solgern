using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface ICreditScoreService
    {
        Task<string> Save(string CreditScoreModel, Guid userid, long companyid);
        Task<string> GetCreditScoreByLoanAppicationId(long LoanApplicationId, long CompanyID);
    }
}
