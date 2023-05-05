using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IWebmergeDocumentRepository
    {
        Task<long> SaveWebmergeDocument(string documentName, string fileUrl, string documentType, string folderName, long bankId, Guid userId, long companyId);
        Task<long> UpdateWebmergeDocument(string documentName, string fileUrl, Guid userId, long companyId, long documentId);
        Task<string> GetWebmergeDocument(long documentId, long companyId, string SignerBy);
        Task<string> GetWebmergeDocuments(long bankId, long companyId);
    }
}
