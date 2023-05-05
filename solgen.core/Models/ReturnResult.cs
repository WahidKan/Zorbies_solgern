using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class ReturnResult
    {

        public string Code { get; set; }
        public string LoanAppAutoId { get; set; }
        public string LoanAppId { get; set; }
        public string IncomeVerificationValue { get; set; }
        public string creditScore { get; set; }
        public string creditScore2 { get; set; }
        public string creditScoreCategory { get; set; }
        public string creditScoreCategory2 { get; set; }
        public string applicationStatus { get; set; }
        public string bankid { get; set; }
        public string UserName { get; set; }
        public string accountId { get; set; }
        public string contactID { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
        public string StatusCode { get; set; }
        public List<MandatoryDocuments> MandatoryDocuments { get; set; }
        public string WebmergeResponse { get; set; }
        public string miniumCreditScore { get; set; }
        public string miniumCreditScore2 { get; set; }
        public string EnableusercontentsResult { get; set; }
        public string Url { get; set; }
        public string DocUrl { get; set; }
        public string UserId { get; set; }
        public long CompanyId { get; set; }
    }
    public class MandatoryDocuments
    {
        public long Id { get; set; }
        public string MasterValue { get; set; }
        public string Type { get; set; }
        public bool IsVerified { get; set; }
    }
    public class Bureau
    {
        public int Id { get; set; }
        public string BureauName { get; set; }
        public bool IsEnableSoftPull { get; set; }
        public bool IsEnableHardPull { get; set; }
    }
    public class CreditScoreResponseRoot
    {
        public int applicantCreditScoreId { get; set; }
        public int loanApplicationId { get; set; }
        public int? creditScore { get; set; }
        public string creditScoreCategory { get; set; }
        public string applicationStatus { get; set; }
        public int miniumCreditScore { get; set; }
        public string status { get; set; }
        public string error { get; set; }
    }
    public class RuleEngine
    {
        public string LoanApplicationId { get; set; }
        public string EventCode { get; set; }
        public string ConnectionId { get; set; }
    }
    public class ApplicantInfoResult
    {
        public string Email { get; set; }
        public string IncomeVerificationValue { get; set; }
    }
}
