using DocuSign.eSign.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Services
{
   public interface IDocusignService
    {
        Task<string> GetAccesToken();
        Task<string> CreateEnvelopeAndSend(string fileName,string documentId, string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, Stream fileStream);

        Task<EnvelopeDefinition> MakeEnvelope(string fileName, string documentId, string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, byte[] file);

        Task<string> VoidEnvelope(string EnvelopId, string voidReason);
        Task<byte[]> DownloadDocument(string EnvelopId, string DocumentId);

        Task<EnvelopeAuditEventResponse> GetDocusingEnvelop_History(string EnvelopId);
    }
}
