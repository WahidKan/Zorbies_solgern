using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Core.Extensions
{
    public class FacebookHttpClient
    {
        private HttpClient _client;
      
        public FacebookHttpClient(HttpClient client)
        {
            _client = client;
        }
        public static FacebookHttpClient Create(SettingModel setting)
        {
            string accountId;
            if (setting != null && !string.IsNullOrEmpty(setting.facebookAccountId))
            {
                accountId = "act_" + setting.facebookAccountId;
            }
            else
            {
               accountId = "act_" + CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
            }
            string baseUrl = CommonSettings.AppSetting["CommonSettings:facebookBaseUrl"];
           
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl + accountId);
            return new FacebookHttpClient(client);
        }
        public static FacebookHttpClient Update()
        {
            string baseUrl = CommonSettings.AppSetting["CommonSettings:facebookBaseUrl"];
           // string accountId = CommonSettings.AppSetting["CommonSettings:facebookAccountId"];
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            return new FacebookHttpClient(client);
        }
        public static FacebookHttpClient CreateInsight()
        {
            string baseUrl = CommonSettings.AppSetting["CommonSettings:facebookBaseUrl"];          
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            return new FacebookHttpClient(client);
        }
        public async Task<HttpResponseMessage> Post(string url, IDictionary<string, string> values)
        {
            try
            {
                var content = new FormUrlEncodedContent(values);
                return await _client.PostAsync(new Uri(_client.BaseAddress + url), content);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<HttpResponseMessage> Get(string url)
        {
            try
            {
                return await _client.GetAsync(new Uri(_client.BaseAddress + url));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<HttpResponseMessage> Delete(string url)
        {
            try
            {
                return await _client.DeleteAsync(new Uri(_client.BaseAddress + url));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
