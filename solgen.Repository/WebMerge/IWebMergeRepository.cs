using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IWebMergeRepository
    {
        Task<string> GetFieldsWithValue(int LoanApplicationId, long companyId);
        Task<string> GetFields(long companyId);
        Task<string> GetFields(long companyId, string module, int? formmasterid);
        Task<string> GetLoanDocMapping(int bankId,long webMergeMappingId);
        Task<long> SaveWebmergeMapping(long mappingId, string mappingName, int webmergeObjectId, string webmergeObjectType, string data, long bankId, long companyId, Guid userId);
        Task<PagedData> GetWebmergeMappingList(long bankId, long companyId, string SortColumn, string SortDir, int PageNo, int PageSize);
        Task<string> GetWebmergeMapping(long webMergeMappingId);
        Task<string> GetDefaultWebmergeMapping(long bankId, long companyId);
        Task<long> SetDefaultWebmergeMapping(long webmergeMappingId, long bankId, long companyId);
        Task<string> GetFormstackDocumentMappings(long bankId, long webmergeMappingId, long companyId);
        Task<long> GetBankIdByLoanApplicationId(long loanApplicationId);
        Task<string> UpdateStatusScheduler(string data);
        Task<string> GetLoanDocumentHistoryByStatus(string status);
        Task<string> GetCompanyAdminByAppId(string LoanApplicationId, string CompanyId);
        string SaveSignowEmailNotifications(dynamic emaildata, string emailSubject, string emailubjectBody, long LoanApplicationId, long CompanyId);
        List<dynamic> GetUsersForEmailNotification();
        string GetSignerName(long companyId);
    }
}
