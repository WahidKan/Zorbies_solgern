using Solgen.Core.Models;
using Solgen.WebApi.Models;
using Solgen.WebApi.Models.Equifax;
using Solgen.WebApi.Models.Equifax.FileStatus.Response;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Solgen.WebApi.Services
{
    public interface IPullCreditScoreService
    {
        //Task<List<ApplicationStatusResponse>> ReturnCreditScore(long loanApplicationId, string applicants, long BureauId,long companyid, Guid userid);
        Task<CreditScore> PullCreditScore(string Bureau, ApplicantRequestModel request);
        Task<string> PopulateJsonToText(string json);
        Task<EquifaxFileStatusResponse> CheckFileStatus(string Bureau, ApplicantRequestModel request);
    }
}
