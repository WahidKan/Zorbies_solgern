using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class CreditScoreRawDataService : ICreditScoreRawDataService
    {
        private readonly ICreditScoreRawDataRepository _creditScoreRawDataRepository;

        public CreditScoreRawDataService(ICreditScoreRawDataRepository creditScoreRawDataRepository)
        {
            _creditScoreRawDataRepository = creditScoreRawDataRepository;
        }

        public async Task<string> GetRawData(long LoanApplicationId, string ApplicantType, long BureauId)
        {
            return await _creditScoreRawDataRepository.GetRawData(LoanApplicationId, ApplicantType, BureauId);
        }

        public async Task<long> Save(string CreditScoreRawDataModel)
        {
            return await _creditScoreRawDataRepository.Save(CreditScoreRawDataModel);
        }
    }
}
