using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Solgen.WebApi.Models.Formstack.Sign;

namespace Solgen.WebApi.Services
{
    public interface IFormstackSignService
    {
        Task<Document[]> GetDocumentsByStatus(string status, int pageSize);
        Task<dynamic> CancelDocument(Guid documentId);
        Task<string> GetDocumentDownloadLink(Guid documentId);
        Task<dynamic> CreateDocumentAndSend(string fileName, string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, string fileUrl);
        Task<dynamic> CreateDocumentAndSend(string fileName, string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, Stream fileStream);
        Task<Document> GetDocument(Guid documentId);
    }
}
