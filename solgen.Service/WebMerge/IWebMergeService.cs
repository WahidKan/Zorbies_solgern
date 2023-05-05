using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface IWebMergeService
    {
        Task<List<CustomFormFieldModel>> GetFieldsWithValue(int LoanApplicationId, long companyId);
        Task<List<dynamic>> GetFields(long companyId);
        Task<List<dynamic>> GetFields(long companyId, string module, int? formmasterid);
        Task<List<LoanDocMappingModel>> GetLoanDocMapping(int bankId,long webMergeMappingId);
       dynamic GetLoanDocFinalMapping(List<CustomFormFieldModel> fieldsWithValue, List<LoanDocMappingModel> fieldsWithName);
        Task<long> SaveWebmergeMapping(WebmergeMapping data, long webmergeMappingId, long bankId, long companyId, Guid userId);
        Task<WebmergeMapping> GetWebmergeMapping(long bankId, long webMergeMappingId, long companyId);
        Task<WebmergeMapping> GetDefaultWebmergeMapping(long bankId, long companyId);
        Task<long> SetDefaultWebmergeMapping(long webmergeMappingId, long bankId, long companyId);
        Task<PagedData> GetWebmergeMappingList(long bankId, long companyId, string SortColumn, string SortDir, int PageNo, int PageSize);        
        Task<long> GetBankIdByLoanApplicationId(long loanApplicationId);

        Task<string> UpdateStatusScheduler(string data);
        Task<string> GetLoanDocumentHistoryByStatus(string status);
        Task<string> GetCompanyAdminByAppId(string LoanApplicationId, string CompanyId);

        string SaveSignowEmailNotifications(dynamic emaildata, string emailSubject, string emailubjectBody, long LoanApplicationId, long CompanyId);
        List<dynamic> GetUsersForEmailNotification();

        string GetSignerName(long companyId);
    }
}
