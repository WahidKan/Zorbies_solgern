using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ICreditScoreRawDataRepository
    {
        Task<long> Save(string CreditScoreRawDataModel);
        Task<string> GetRawData(long LoanApplicationId, string ApplicantType, long BureauId);
    }
}
