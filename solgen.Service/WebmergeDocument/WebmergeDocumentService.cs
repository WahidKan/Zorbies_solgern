using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class WebmergeDocumentService : IWebmergeDocumentService
    {
        private readonly IWebmergeDocumentRepository _webmergeDocumentRepository;
        public WebmergeDocumentService(IWebmergeDocumentRepository webmergeDocumentRepository)
        {
            _webmergeDocumentRepository = webmergeDocumentRepository;
        }

        public async Task<string> GetWebmergeDocument(long documentId, long companyId, string SignerBy)
        {
            return await _webmergeDocumentRepository.GetWebmergeDocument(documentId, companyId, SignerBy);
        }

        public async Task<string> GetWebmergeDocuments(long bankId, long companyId)
        {
            return await _webmergeDocumentRepository.GetWebmergeDocuments(bankId, companyId);
        }

        public async Task<long> SaveWebmergeDocument(string documentName, string fileUrl, string documentType, string folderName, long bankId, Guid userId, long companyId)
        {
            return await _webmergeDocumentRepository.SaveWebmergeDocument(documentName, fileUrl, documentType, folderName, bankId, userId, companyId);
        }

        public async Task<long> UpdateWebmergeDocument(string documentName, string fileUrl, Guid userId, long companyId, long documentId)
        {
            return await _webmergeDocumentRepository.UpdateWebmergeDocument(documentName, fileUrl, userId, companyId, documentId);
        }
    }
}
