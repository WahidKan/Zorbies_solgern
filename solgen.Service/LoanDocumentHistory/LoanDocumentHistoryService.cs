using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Repository;

namespace Solgen.Service
{
    public class LoanDocumentHistoryService : ILoanDocumentHistoryService
    {

        private readonly ILoanDocumentHistoryRepository _loanDocumentHistoryRepository;
        public LoanDocumentHistoryService(ILoanDocumentHistoryRepository loanDocumentHistoryRepository)
        {
            _loanDocumentHistoryRepository = loanDocumentHistoryRepository;
        }
        public async Task<long> AddNewLoanDocumentHistory(long loanApplicationId, string fileName, string fileUrl, string documentId, string documentStatus, long companyId, string SourceType, string DocumentType)
        {
            var _result = await _loanDocumentHistoryRepository.AddNewLoanDocumentHistory(loanApplicationId, fileName, fileUrl, documentId, documentStatus, companyId, SourceType, DocumentType);
            return _result;
        }

        public Task<PagedData> GetLoanDocumentHistoryList(long loanApplicationId, string SortColumn, string SortDir, int PageNo, int PageSize, Guid UserId,long CompanyId)
        {
            var _list = _loanDocumentHistoryRepository.GetLoanDocumentHistoryList(loanApplicationId, SortColumn, SortDir, PageNo, PageSize, UserId,CompanyId);
            return _list;
        }

        public Task<IEnumerable<LoanDocummentHistoryModel>> GetLoanDocumentHistory(long loanApplicationId, bool Isvoid)
        {
            var _list = _loanDocumentHistoryRepository.GetLoanDocumentHistory(loanApplicationId, Isvoid);
            return _list;
        }

        public LoanDocummentHistoryModel GetLoanDocumentHistory_Status(long loanApplicationId)
        {
            var _list =  _loanDocumentHistoryRepository.GetLoanDocumentHistory_Status(loanApplicationId);
            return _list;
        }

        public async Task<int> VoidDocuments(long LoanApplicationId, bool resend, Guid UserId, string docId)
        {
            return await _loanDocumentHistoryRepository.VoidDocuments(LoanApplicationId, resend, UserId, docId);
        }

        public async Task<long> UpdateLoanDocumentManual(string fileUrl, string documentStatus, long historyId, bool isMediaServer)
        {
            return await _loanDocumentHistoryRepository.UpdateLoanDocumentManual(fileUrl, documentStatus, historyId, isMediaServer);
        }

        public async Task<int> VoidChangeOrderDocument(long LoanApplicationId, long ChangeOrderDocumentId)
        {
            return await _loanDocumentHistoryRepository.VoidChangeOrderDocument(LoanApplicationId, ChangeOrderDocumentId);
        }
    }
}
