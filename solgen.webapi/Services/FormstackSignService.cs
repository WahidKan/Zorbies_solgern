using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Solgen.WebApi.Models.Formstack.Sign;
using Solgen.Core;
using System.IO;
using Solgen.Service;

namespace Solgen.WebApi.Services
{
    public class FormstackSignService : IFormstackSignService
    {
        private readonly FormstackSignCredentials credentials;
        private HttpClient httpClient;

        public ILogService logService { get; }

        public FormstackSignService(ILogService logService)
        {
            credentials = new FormstackSignCredentials();
            //credentials.ClientId = "3a4igtm0a3vd745gdmt7q1gun9";
            //credentials.ClientSecret = "dbmrih3k878dek63nga61l0gaikvrtug8er7ql44rs0u7utkho1";
            credentials.IntegratorId = "LOANHOMI";
            credentials.CallbackUrl = "https://loanhomi.com";
            credentials.RedirectUrl = "http://localhost:8530";
            //credentials.ApiUrl = $"https://api-v2.insuresign.io";
            //credentials.AuthUrl = $"https://auth.insuresign.io/oauth2/token";

            credentials.ClientId = CommonSettings.AppSetting["CommonSettings:FormstackSignClientId"];
            credentials.ClientSecret = CommonSettings.AppSetting["CommonSettings:FormstackSignClientSecret"];
            credentials.ApiUrl = CommonSettings.AppSetting["CommonSettings:FormstackSignApiUrl"];
            credentials.AuthUrl = CommonSettings.AppSetting["CommonSettings:FormstackSignAuthUrl"];

            httpClient = new HttpClient();

            this.logService = logService;
        }

        private string GetBearerTokenViaClientCredentials()
        {
            try
            {
                var authBytes = Encoding.UTF8.GetBytes($"{credentials.ClientId}:{credentials.ClientSecret}");
                var authToken = Convert.ToBase64String(authBytes);
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);

                var payload = new StringContent($"grant_type=client_credentials&client_id={credentials.ClientId}");
                payload.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded");

                var response = httpClient.PostAsync($"{credentials.AuthUrl}", payload).Result;

                dynamic json = "";

                if (response.IsSuccessStatusCode)
                {
                    json = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);
                }
                else
                {
                    Guid guid = logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception getting Insuresign token",
                        LogLongMessage = response.Content.ReadAsStringAsync().Result,
                        LogIpAddress = "",
                        LogPageUrl = "",
                        LogReferrerUrl = "",
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });
                }

                return json.access_token;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Insuresign token",
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

        public async Task<Document[]> GetDocumentsByStatus(string status, int pageSize)
        {
            try
            {
                var token = GetBearerTokenViaClientCredentials();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await httpClient.GetAsync($"{credentials.ApiUrl}/my/documents?status={status}&pageSize={pageSize}");

                if (response.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<Document[]>(response.Content.ReadAsStringAsync().Result);
                }
                else
                {
                    Guid guid = logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception getting Insuresign document by status",
                        LogLongMessage = response.Content.ReadAsStringAsync().Result,
                        LogIpAddress = "",
                        LogPageUrl = "",
                        LogReferrerUrl = "",
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });
                    return null;
                }
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Insuresign document by status",
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

        public async Task<dynamic> CancelDocument(Guid documentId)
        {
            try
            {
                var token = GetBearerTokenViaClientCredentials();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await httpClient.PostAsJsonAsync($"{credentials.ApiUrl}/documents/{documentId}/cancel", new { reasonToCancel = "Document voided by Loanhomi" });

                if (response.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);
                }
                else
                {
                    Guid guid = logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception cancelling Insuresign document {documentId}",
                        LogLongMessage = response.Content.ReadAsStringAsync().Result,
                        LogIpAddress = "",
                        LogPageUrl = "",
                        LogReferrerUrl = "",
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });
                    return null;
                }
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception cancelling Insuresign document {documentId}",
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

        public async Task<string> GetDocumentDownloadLink(Guid documentId)
        {
            try
            {
                var token = GetBearerTokenViaClientCredentials();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await httpClient.GetAsync($"{credentials.ApiUrl}/documents/{documentId}/pdf");

                string link = "";

                if (response.IsSuccessStatusCode)
                {
                    link = response.Content.ReadAsStringAsync().Result;
                }
                else
                {
                    Guid guid = logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception getting download link of Insuresign document {documentId}",
                        LogLongMessage = response.Content.ReadAsStringAsync().Result,
                        LogIpAddress = "",
                        LogPageUrl = "",
                        LogReferrerUrl = "",
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });
                }

                return link;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting download link of Insuresign document {documentId}",
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

        public async Task<dynamic> CreateDocumentAndSend(string fileName,string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, string fileUrl)
        {
            try
            {
                var token = GetBearerTokenViaClientCredentials();

                dynamic json = null;

                MultipartFormDataContent formData = new MultipartFormDataContent();
                formData.Add(new StringContent("application/pdf"), "type");
                formData.Add(new StringContent("true"), "useTextTags");
                formData.Add(new StringContent($"{fileName}"), "name");
                formData.Add(new StringContent("Please sign this document"), "message");
                if (applicantName != null)
                {
                    formData.Add(new StringContent(applicantName), "participants[0].name");
                }
                if (applicantEmail != null)
                {
                    formData.Add(new StringContent(applicantEmail), "participants[0].email");
                }
                if (coApplicantName != null)
                {
                    formData.Add(new StringContent(coApplicantName), "participants[1].name");
                }
                if (coApplicantEmail != null)
                {
                    formData.Add(new StringContent(coApplicantEmail), "participants[1].email");
                }

                formData.Add(new StringContent(CommonSettings.AppSetting["CommonSettings:FormstackWebhookUrl"]), "callback.url");

                using (Stream stream = await httpClient.GetStreamAsync(fileUrl))
                {
                    formData.Add(new StreamContent(await httpClient.GetStreamAsync(fileUrl)), "file", $"{fileName}.pdf");
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    try
                    {
                        var response = httpClient.PostAsync($"{credentials.ApiUrl}/documents/send", formData).Result;
                        if (response.IsSuccessStatusCode)
                        {
                            json = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);
                        }
                        else
                        {
                            Guid guid = logService.Save(new LogModel
                            {
                                LogId = Guid.NewGuid(),
                                LogType = LogTypes.Error,
                                LogShortMessage = $"Exception create and send Insuresign document",
                                LogLongMessage = response.Content.ReadAsStringAsync().Result,
                                LogIpAddress = "",
                                LogPageUrl = "",
                                LogReferrerUrl = "",
                                LogCreatedBy = Guid.NewGuid(),
                                LogCreatedOn = DateTime.UtcNow
                            });
                        }
                    }
                    catch (Exception ex)
                    {
                        Guid guid = logService.Save(new LogModel
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = $"Exception create and send Insuresign document",
                            LogLongMessage = ex.Message,
                            LogIpAddress = "",
                            LogPageUrl = "",
                            LogReferrerUrl = "",
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.UtcNow
                        });
                    }
                }

                return json;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception create and send Insuresign document",
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

        public async Task<dynamic> CreateDocumentAndSend(string fileName, string applicantName, string applicantEmail, string coApplicantName, string coApplicantEmail, Stream fileStream)
        {
            try
            {
                var token = GetBearerTokenViaClientCredentials();

                dynamic json = null;

                MultipartFormDataContent formData = new MultipartFormDataContent();
                formData.Add(new StringContent("application/pdf"), "type");
                formData.Add(new StringContent("true"), "useTextTags");
                formData.Add(new StringContent($"{fileName}"), "name");
                formData.Add(new StringContent("Please sign this document"), "message");
                if (applicantName != null)
                {
                    formData.Add(new StringContent(applicantName), "participants[0].name");
                }
                if (applicantEmail != null)
                {
                    formData.Add(new StringContent(applicantEmail), "participants[0].email");
                }
                if (coApplicantName != null)
                {
                    formData.Add(new StringContent(coApplicantName), "participants[1].name");
                }
                if (coApplicantEmail != null)
                {
                    formData.Add(new StringContent(coApplicantEmail), "participants[1].email");
                }

                formData.Add(new StringContent(CommonSettings.AppSetting["CommonSettings:FormstackWebhookUrl"]), "callback.url");

                formData.Add(new StreamContent(fileStream), "file", $"{fileName}.pdf");
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                try
                {
                    var response = httpClient.PostAsync($"{credentials.ApiUrl}/documents/send", formData).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        json = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);
                    }
                    else
                    {
                        Guid guid = logService.Save(new LogModel
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = $"Exception create and send Insuresign document",
                            LogLongMessage = response.Content.ReadAsStringAsync().Result,
                            LogIpAddress = "",
                            LogPageUrl = "",
                            LogReferrerUrl = "",
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.UtcNow
                        });
                    }
                }
                catch (Exception ex)
                {
                    Guid guid = logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception create and send Insuresign document",
                        LogLongMessage = ex.Message,
                        LogIpAddress = "",
                        LogPageUrl = "",
                        LogReferrerUrl = "",
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });
                }

                return json;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception create and send Insuresign document",
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

        public async Task<Document> GetDocument(Guid documentId)
        {
            try
            {
                var token = GetBearerTokenViaClientCredentials();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = httpClient.GetAsync($"{credentials.ApiUrl}/documents/{documentId}").Result;

                if (response.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<Document>(response.Content.ReadAsStringAsync().Result);
                }
                else
                {
                    Guid guid = logService.Save(new LogModel
                    {
                        LogId = Guid.NewGuid(),
                        LogType = LogTypes.Error,
                        LogShortMessage = $"Exception getting Insuresign document {documentId}",
                        LogLongMessage = response.Content.ReadAsStringAsync().Result,
                        LogIpAddress = "",
                        LogPageUrl = "",
                        LogReferrerUrl = "",
                        LogCreatedBy = Guid.NewGuid(),
                        LogCreatedOn = DateTime.UtcNow
                    });
                }

                return null;
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception getting Insuresign document {documentId}",
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

    public class FormstackSignCredentials
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string IntegratorId { get; set; }
        public string CallbackUrl { get; set; }
        public string RedirectUrl { get; set; }
        public string ApiUrl { get; set; }
        public string AuthUrl { get; set; }
    }
}
