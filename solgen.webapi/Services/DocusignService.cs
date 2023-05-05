using DocuSign.eSign.Api;
using DocuSign.eSign.Client;
using DocuSign.eSign.Model;
using Microsoft.Extensions.Configuration;
using Solgen.Core;
using Solgen.Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static DocuSign.eSign.Client.Auth.OAuth;

namespace Solgen.WebApi.Services
{
    public class DocusignService : IDocusignService
    {
        protected static ApiClient _apiClient { get; private set; }
        private readonly IConfiguration _configuration;
        private OAuthToken _authToken;
        public ILogService logService { get; }

        public DocusignService(ILogService logService, IConfiguration configuration)
        {
            this.logService = logService;
             _configuration = configuration;
            _apiClient ??= new ApiClient();
        }
        public async Task<string> GetAccesToken()
        {
            try
            {
               
                var scopes = new List<string>
                {
                    "signature",
                    "impersonation",
                   
                };

                //byte[] b = System.IO.File.ReadAllBytes(this._configuration["DocuSignJWT:PrivateKeyFile"]);
                //var filepath = this._configuration["DocuSignJWT:PrivateKeyFile"];

                this._authToken = _apiClient.RequestJWTUserToken(
               this._configuration["DocuSignJWT:ClientId"],
               this._configuration["DocuSignJWT:ImpersonatedUserId"],
               this._configuration["DocuSignJWT:AuthServer"],
               //b, 1, scopes);
               File.ReadAllBytes(this._configuration["DocuSignJWT:PrivateKeyFile"]), 1, scopes);
                return _authToken.access_token;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Docusign token",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return null;
            }
        }

        public async Task<string> CreateEnvelopeAndSend(string fileName,string documentId, string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, Stream fileStream)
        {
            try
            {
                

                var accessToken = GetAccesToken().Result;

                byte[] file = null;

                using (MemoryStream ms = new MemoryStream())
                {
                    fileStream.CopyTo(ms);
                    file= ms.ToArray();
                }

                

                EnvelopeDefinition env = await MakeEnvelope(fileName, documentId, applicantName, applicantEmail, coApplicantName, coApplicantEmail, file);
                var apiClient = new ApiClient(this._configuration["DocuSignJWT:Basepath"]+ "/restapi");

                apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
                EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
                EnvelopeSummary results = envelopesApi.CreateEnvelope(this._configuration["DocuSignJWT:AccountId"], env);
                return results.EnvelopeId;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception create envelope and send via Docusign ",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return null;
            }
        }


        public async Task<EnvelopeDefinition> MakeEnvelope(string fileName,string documentId, string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, byte[] file)
        {
         
            string docPdfBytes = Convert.ToBase64String(file);
            EnvelopeDefinition env = new EnvelopeDefinition();
            env.EmailSubject = this._configuration["DocuSignJWT:EmailSubject"];


            Document doc = new Document
            {
                DocumentBase64 = docPdfBytes,
                Name = fileName, // can be different from actual file name
                FileExtension = "pdf",
               DocumentId = documentId,
                TransformPdfFields = "true"
            };

            env.Documents = new List<Document> { doc };

            Signer signer1 = new Signer
            {
                Email = applicantEmail,
                Name = applicantName,
                RecipientId = "1",
                RoutingOrder = "1"
            };



            /*
            CarbonCopy cc1 = new CarbonCopy
            {
                Email = ccEmail,
                Name = ccName,
                RecipientId = "2",
                RoutingOrder = "2"
            };
            */

            SignHere signHere1 = new SignHere
            {
                AnchorString = "Signer 1",
                AnchorUnits = "pixels",
                AnchorYOffset = "0",  // old 10
                AnchorXOffset = "1"   // old 20
            };



            Date date = new Date
            {
                AnchorString = "eSignDate1",
                AnchorUnits = "pixels",
                AnchorYOffset = "0",
                AnchorXOffset = "1"

            };



            InitialHere initialsign1 = new InitialHere
            {
                AnchorString = "InitialHere1",
                AnchorUnits = "pixels",
                AnchorYOffset = "0",
                AnchorXOffset = "1",
                Optional = string.IsNullOrEmpty(coApplicantEmail) ? "true" : "false"

            };


            Tabs signer1Tabs = new Tabs
            {
                SignHereTabs = new List<SignHere> { signHere1 },
                DateTabs = new List<Date> { date },
                InitialHereTabs = new List<InitialHere> { initialsign1 }
            };


            signer1.Tabs = signer1Tabs;

            
            List<Signer> listsigners = new List<Signer>();
            listsigners.Add(signer1);

            
            if (!string.IsNullOrEmpty(coApplicantEmail) && !string.IsNullOrEmpty(coApplicantName))
            {
                Signer signer2 = new Signer
                {
                    Email = coApplicantEmail,
                    Name = coApplicantName,
                    RecipientId = "2",
                    RoutingOrder = "2"
                };


                SignHere signHere2 = new SignHere
                {
                    AnchorString = "Signer 2",
                    AnchorUnits = "pixels",
                    AnchorYOffset = "0",
                    AnchorXOffset = "1",
                    Optional = "false"
                };

                InitialHere initialsign2 = new InitialHere
                {
                    AnchorString = "InitialHere2",
                    AnchorUnits = "pixels",
                    AnchorYOffset = "0",
                    AnchorXOffset = "1",
                    Optional = "false"

                };

                Date date2 = new Date
                {
                    AnchorString = "eSignDate2",
                    AnchorUnits = "pixels",
                    AnchorYOffset = "0",
                    AnchorXOffset = "1"

                };

                Tabs signer2Tabs = new Tabs
                {
                    SignHereTabs = new List<SignHere> { signHere2 },
                    InitialHereTabs = new List<InitialHere> { initialsign2 },
                    DateTabs = new List<Date> { date2 }

                };

                signer2.Tabs = signer2Tabs;

                listsigners.Add(signer2);
            }





            Recipients recipients = new Recipients
            {
                Signers = listsigners
                //CarbonCopies = new List<CarbonCopy> { cc1 }
            };


            EventNotification webhook = new EventNotification();

            List<EnvelopeEvent> events = new List<EnvelopeEvent> {
                    new EnvelopeEvent { EnvelopeEventStatusCode= "Completed" } ,
                    new EnvelopeEvent { EnvelopeEventStatusCode="Declined"},
                    new EnvelopeEvent { EnvelopeEventStatusCode="Voided"}

                };

            ConnectEventData eventData = new ConnectEventData
            {
                Format = "json",
                Version = "restv2.1"


            };

            webhook.EnvelopeEvents = events;
            webhook.Url = this._configuration["DocuSignJWT:Webhook"];
            webhook.IncludeDocuments = "false";
            webhook.IncludeDocumentFields = "false";
            webhook.EventData = eventData;
            
            env.Recipients = recipients;
            env.Status = "Sent";
            env.EventNotification = webhook;

            return env;
        }

        public async Task<string> VoidEnvelope(string EnvelopId,string voidReason)
        {
             

            try
            {
                var access_token = await GetAccesToken();
                 
                Envelope env = new Envelope();
                env.Status = "voided";
                env.VoidedReason = voidReason;
                
                ApiClient apiClient = new ApiClient(this._configuration["DocuSignJWT:Basepath"]+"/restapi");
                apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + access_token);
                // apiClient.GenerateAccessToken(this._configuration["DocuSignJWT:ClientId"], this._configuration["DocuSignJWT:SecretKey"],"Test");
                EnvelopesApi ea = new EnvelopesApi(apiClient);
              var result = ea.Update(this._configuration["DocuSignJWT:AccountId"], EnvelopId, env);

                return "Success";
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception occured during void envelope ( " + EnvelopId + " )  Docusign " ,
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });

                return ex.Message;
            }
             
        }

        public async Task<byte[]> DownloadDocument(string EnvelopId, string DocumentId)
        {
            try
            {
                string access_token = await GetAccesToken();
                ApiClient apiClient = new ApiClient(this._configuration["DocuSignJWT:Basepath"] + "/restapi");
                apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + access_token);
                var envelopesApi = new EnvelopesApi(apiClient);
                Stream results = envelopesApi.GetDocument(this._configuration["DocuSignJWT:AccountId"], EnvelopId, DocumentId);
                byte[] file = null;
                using (MemoryStream ms = new MemoryStream())
                {
                    results.CopyTo(ms);
                    file = ms.ToArray();
                }

                //  string root = "D:\\Satnam Toura\\myfile.pdf";  //HttpContext.Current.Server.MapPath("~" + "/ContractDocuments/" + guid2 + '.' + rec1.FileExtension);
                //File.WriteAllBytes(root, file);

                return file;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception occured during download document ( " + EnvelopId + " )  Docusign ",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return null;
            }
        }

        public async Task<EnvelopeAuditEventResponse> GetDocusingEnvelop_History(string EnvelopId)
        {
            try
            {
                string access_token = await GetAccesToken();
                ApiClient apiClient = new ApiClient(this._configuration["DocuSignJWT:Basepath"] + "/restapi");
                apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + access_token);
                var envelopesApi = new EnvelopesApi(apiClient);

                EnvelopeAuditEventResponse results = envelopesApi.ListAuditEvents(this._configuration["DocuSignJWT:AccountId"], EnvelopId);
                return results;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception occured getting envelop history ( " + EnvelopId + " )  Docusign ",
                    LogLongMessage = ex.Message,
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                });
                return null;
            }
        }

    }
}
