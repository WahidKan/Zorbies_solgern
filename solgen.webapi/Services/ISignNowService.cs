using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Services
{
    public interface ISignNowService
    {
        Task<string> UploadDocument(string fileName, string fileUrl, string companyid);
        Task<string> UploadDocument(string fileName, Stream fileStream, string companyid);
        Task<dynamic> SendInvite(string document_id, string email1, string email2, string companyid);
        Task<dynamic> SendInvite(string document_id, string email1, string email2, string subject, string body, string companyid);
        Task SetWebhook(string document_id, string webhook, string companyid);
        Task CancelInvite(string document_id, string companyid);
        Task<string> GetDownloadLink(string document_id, string companyid);
        Task<byte[]> DownloadDocument(string document_id, string companyid);
        Task<byte[]> DownloadSignedDocument(string document_id, string companyid); 
        Task<dynamic> GetDocumentHistory(string document_id, string companyid);
        Task<SignNowDocument> SendEmbeddedInvite(string document_id, string email1, string email2, string companyid);

        Task<dynamic> GetDocumentForSigned(string document_id, string companyid);

        Task SetWebhookproposal(string document_id, string webhook, string companyid,string CallMethod);
    }
}
