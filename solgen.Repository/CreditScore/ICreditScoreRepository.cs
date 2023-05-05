using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ICreditScoreRepository
    {
        Task<string> Save(string CreditScoreModel, Guid userid, long companyid);
        Task<string> GetCreditScoreByLoanAppicationId(long LoanApplicationId, long CompanyID);
        Task<string> GetTestCreditScoreBySSN(long ssn, long companyId);
    }
}
