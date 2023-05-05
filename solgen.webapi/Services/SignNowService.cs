using Newtonsoft.Json;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository.CompanySetting;
using Solgen.Service;
using Solgen.WebApi.Models.SignNow;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Solgen.WebApi.Services
{
    public class SignNowService : ISignNowService
    {
        private readonly SignNowCredentials credentials;
        private HttpClient httpClient;
        private readonly ICompanyIntegrationSettingRepository _companyIntegrationSetting;
        private SettingModel _settings;

        public ILogService logService { get; }

        public SignNowService(ICompanyIntegrationSettingRepository companyIntegrationSetting)
        {
            httpClient = new HttpClient();
            credentials = new SignNowCredentials();
            _companyIntegrationSetting = companyIntegrationSetting;
            credentials.apiBaseUrl = CommonSettings.AppSetting["CommonSettings:SignNowApiUrl"];
            credentials.authToken = CommonSettings.AppSetting["CommonSettings:SignNowToken"];
            credentials.login = CommonSettings.AppSetting["CommonSettings:SignNowLogin"];
            credentials.password = CommonSettings.AppSetting["CommonSettings:SignNowPassword"];
        }

        public async Task<string> GetToken(string companyid)
        {
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowToken))
            {
                credentials.authToken = _settings.signNowToken;
            }
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowLogin))
            {
                credentials.login = _settings.signNowLogin;
            }
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowPassword))
            {
                credentials.password = _settings.signNowPassword;
            }
            var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"{credentials.apiBaseUrl}/oauth2/token");
            requestMessage.Headers.Add("Authorization", $"Basic {credentials.authToken}");

            var body = new Dictionary<string, string>
            {
               { "grant_type", "password" },
               { "username", credentials.login },
               { "password", credentials.password },//credentials.password },
               { "scope", "*" }
            };

            requestMessage.Content = new FormUrlEncodedContent(body);

            var response = await httpClient.SendAsync(requestMessage);

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
            }

            // For Live use only
            //return "0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";

            // For Stage
            return json.access_token;
        }

        public async Task CancelInvite(string document_id, string companyid)
        {
            string token = await GetToken(companyid);
            //string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = await httpClient.PutAsJsonAsync($"{credentials.apiBaseUrl}/document/{document_id}/fieldinvitecancel", new { });

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
            }
        }

        public async Task<string> GetDownloadLink(string document_id, string companyid)
        {
            string token = await GetToken(companyid);
            // string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = await httpClient.PostAsJsonAsync($"{credentials.apiBaseUrl}/document/{document_id}/download/link", new { });

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                return json.link;
            }

            return null;
        }

        public async Task<SignNowDocument> SendEmbeddedInvite(string document_id, string email1, string email2, string companyid)
        {
            //
            var res = new SignNowDocument();
            string token = await GetToken(companyid);
            // string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowLogin))
            {
                credentials.login = _settings.signNowLogin;
            }
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await httpClient.GetAsync($"{credentials.apiBaseUrl}/document/{document_id}");

            if (response.IsSuccessStatusCode)
            {
                res = JsonConvert.DeserializeObject<SignNowDocument>(response.Content.ReadAsStringAsync().Result);
            }


            return res;
        }
        public async Task<dynamic> SendInvite(string document_id, string email1, string email2, string companyid)
        {
            string token = await GetToken(companyid);
            // string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowLogin))
            {
                credentials.login = _settings.signNowLogin;
            }
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            InviteModel model = new InviteModel()
            {
                document_id = document_id,
                subject = "LoanHomi sending email for signature",
                message = "Please sign your loan document",
                from = credentials.login,
            };

            List<SignNowSigner> signers = new List<SignNowSigner>();
            signers.Add(new SignNowSigner()
            {
                email = email1,
                order = 1,
                role = "Signer 1"
            });

            if (!string.IsNullOrEmpty(email2))
            {
                signers.Add(new SignNowSigner()
                {
                    email = email2,
                    order = 2,
                    role = "Signer 2"
                });
            }

            model.to = signers.ToArray();

            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = await httpClient.PostAsJsonAsync($"{credentials.apiBaseUrl}/document/{document_id}/invite", model);

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                return json;
            }
            else
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = $"Exception in SendInvite method",
                    LogLongMessage = await response.Content.ReadAsStringAsync(),
                    LogIpAddress = "",
                    LogPageUrl = "",
                    LogReferrerUrl = "",
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.UtcNow
                }); ;
            }

            return json;
        }

        public async Task SetWebhook(string document_id, string webhook, string companyid)
        {
            string token = await GetToken(companyid);
            //  string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = await httpClient.PostAsJsonAsync($"{credentials.apiBaseUrl}/api/v2/events",
                new
                {
                    @event = webhook,
                    entity_id = document_id,
                    action = "callback",
                    attributes = new
                    {
                        callback = CommonSettings.AppSetting["CommonSettings:SignNowCallback"],
                        use_tls_12 = false,
                        docid_queryparam = true
                    }
                }
                );

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
            }
        }

        public async Task SetWebhookproposal(string document_id, string webhook, string companyid, string CallMethod)
        {
            string token = await GetToken(companyid);
            //  string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = await httpClient.PostAsJsonAsync($"{credentials.apiBaseUrl}/api/v2/events",
                new
                {
                    @event = webhook,
                    entity_id = document_id,
                    action = "callback",
                    attributes = new
                    {
                        callback = CommonSettings.AppSetting["CommonSettings:SignNowCallbackproposal"] + "/" + CallMethod,
                        use_tls_12 = false,
                        docid_queryparam = true
                    }
                }
                );

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
            }
        }

        public async Task<string> UploadDocument(string fileName, string fileUrl, string companyid)
        {
            string token = await GetToken(companyid);
            //string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            using (Stream stream = await httpClient.GetStreamAsync(fileUrl))
            {
                MultipartFormDataContent formData = new MultipartFormDataContent();

                formData.Add(new StreamContent(await httpClient.GetStreamAsync(fileUrl)), "file", $"{fileName}.pdf");
                _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
                if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
                {
                    credentials.apiBaseUrl = _settings.signNowApiUrl;
                }
                var response = await httpClient.PostAsync($"{credentials.apiBaseUrl}/document/fieldextract", formData);

                dynamic json = "";

                if (response.IsSuccessStatusCode)
                {
                    json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return json.id;
                }

                return null;
            }
        }

        public async Task<string> UploadDocument(string fileName, Stream fileStream, string companyid)
        {
            string token = await GetToken(companyid);
            // string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);


            MultipartFormDataContent formData = new MultipartFormDataContent();

            formData.Add(new StreamContent(fileStream), "file", $"{fileName}.pdf");
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = await httpClient.PostAsync($"{credentials.apiBaseUrl}/document/fieldextract", formData);

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                return json.id;
            }

            return null;
        }

        public async Task<byte[]> DownloadDocument(string document_id, string companyid)
        {
            string token = await GetToken(companyid);
            //string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = httpClient.GetAsync($"{credentials.apiBaseUrl}/document/{document_id}/download/collapsed?with_history=1").GetAwaiter().GetResult();

            byte[] file = null;

            if (response.IsSuccessStatusCode)
            {
                file = response.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult();
            }

            return file;
        }


        public async Task<byte[]> DownloadSignedDocument(string document_id, string companyid)
        {
            string token = await GetToken(companyid);
            //string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = httpClient.GetAsync($"{credentials.apiBaseUrl}/document/{document_id}/download/collapsed").GetAwaiter().GetResult();

            byte[] file = null;

            if (response.IsSuccessStatusCode)
            {
                file = response.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult();
            }

            return file;
        }

        public async Task<dynamic> GetDocumentHistory(string document_id, string companyid)
        {
            string token = await GetToken(companyid);
            //string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = httpClient.GetAsync($"{credentials.apiBaseUrl}/document/{document_id}/historyfull").GetAwaiter().GetResult();

            dynamic json = null;

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);
            }

            return json;
        }


        public async Task<dynamic> GetDocumentForSigned(string document_id, string companyid)
        {
            string token = await GetToken(companyid);
            //string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = httpClient.GetAsync($"{credentials.apiBaseUrl}/document/{document_id}").GetAwaiter().GetResult();

            dynamic json = null;

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);
            }

            return json;
        }




        public async Task<dynamic> SendInvite(string document_id, string email1, string email2, string subject, string body,string companyid)
        {
            string token = await GetToken(companyid);
            // string token = " 0943e1e24541ed23420591cbef9ccdafdf11388f47bfe67eafc5aba1b2203a02";
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowLogin))
            {
                credentials.login = _settings.signNowLogin;
            }
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            InviteModel model = new InviteModel()
            {
                document_id = document_id,
                subject = subject,
                message = body,
                from = credentials.login,
            };

            List<SignNowSigner> signers = new List<SignNowSigner>();
            signers.Add(new SignNowSigner()
            {
                email = email1,
                order = 1,
                role = "Signer 1"
            });

            if (!string.IsNullOrEmpty(email2))
            {
                signers.Add(new SignNowSigner()
                {
                    email = email2,
                    order = 2,
                    role = "Signer 2"
                });
            }

            model.to = signers.ToArray();
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.signNowApiUrl))
            {
                credentials.apiBaseUrl = _settings.signNowApiUrl;
            }
            var response = await httpClient.PostAsJsonAsync($"{credentials.apiBaseUrl}/document/{document_id}/invite", model);

            dynamic json = "";

            if (response.IsSuccessStatusCode)
            {
                json = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                return json;
            }

            return json;
        }
    }

    public class SignNowCredentials
    {
        public string apiBaseUrl { get; set; }
        public string authToken { get; set; }
        public string login { get; set; }
        public string password { get; set; }
    }
    public class SignNowDocument
    {
        public string id { get; set; }
        public List<SignNowDocumentRole> roles { get; set; }
        public List<SignNowDocumentInvite> field_invites { get; set; }
    }
    public class SignNowDocumentInvite
    {
        public string id { get; set; }
        public string status { get; set; }
        public string role { get; set; }
        public string role_id { get; set; }
    }
    public class SignNowDocumentRole
    {
        public string unique_id { get; set; }
        public string signing_order { get; set; }
        public string name { get; set; }
    }


}
