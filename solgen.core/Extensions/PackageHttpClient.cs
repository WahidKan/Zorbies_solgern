using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Core.Extensions
{
    public class PackageHttpClient
    {
        private HttpClient _httpClient;
        public PackageHttpClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
             
        public async Task<HttpResponseMessage> Get(string url)
        {
            try
            {
                return await _httpClient.GetAsync(new Uri(_httpClient.BaseAddress + url));
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public async Task<HttpResponseMessage> Post(string url, HttpContent model)
        {
            try
            {
                return await _httpClient.PostAsync(new Uri(_httpClient.BaseAddress + url),model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static PackageHttpClient Create(string baseUrl)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            return new PackageHttpClient(client);
        }
    }
}
