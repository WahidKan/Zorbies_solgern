using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ILoanDocumentHistoryRepository
    {
        Task<long> AddNewLoanDocumentHistory(long loanApplicationId, string fileName, string fileUrl, string documentId, string documentStatus, long companyId, string SourceType, string DocumentType);
        Task<PagedData> GetLoanDocumentHistoryList(long loanApplicationId, string SortColumn, string SortDir, int PageNo, int PageSize, Guid UserId, long CompanyId);
        Task<IEnumerable<LoanDocummentHistoryModel>> GetLoanDocumentHistory(long loanApplicationId, bool Isvoid);
        LoanDocummentHistoryModel GetLoanDocumentHistory_Status(long loanApplicationId);
        Task<int> VoidDocuments(long LoanApplicationId, bool resend, Guid UserId, string docId);
        Task<int> VoidChangeOrderDocument(long LoanApplicationId, long ChangeOrderDocumentId);
        Task<long> UpdateLoanDocumentManual(string fileUrl, string documentStatus, long historyId, bool isMediaServer);
    }
}
