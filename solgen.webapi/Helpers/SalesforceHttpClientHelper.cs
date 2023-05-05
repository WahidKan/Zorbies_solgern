using Newtonsoft.Json;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.WebApi.Helpers
{
    public class SalesforceHttpClientHelper
    {
        private HttpClient client;

        public SalesforceHttpClientHelper(HttpClient client)
        {
            this.client = client;
        }

        public static SalesforceHttpClientHelper Create(bool authRequired = false)
        {
            string BaseUrl = CommonSettings.AppSetting["CommonSettings:SFAPILINK"];

           // string BaseUrl = "http://45.35.44.173:8081/";
            //string BaseUrl = "http://localhost:38063/";

            HttpClient client = new HttpClient(new HttpClientHandler() { UseDefaultCredentials = true });
            client.BaseAddress = new Uri(BaseUrl);
            client.DefaultRequestHeaders.Accept.Clear();
            if (authRequired)
            {
                //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", App.LoginToken);
            }
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return new SalesforceHttpClientHelper(client);
        }
        
        public async Task<HttpResponseMessage> Get(string resource)
        {
            try
            {                
                return await client.GetAsync(resource);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<HttpResponseMessage> Post(string resource, object data, bool multipart = false)
        {
            try
            {
                HttpResponseMessage response;
                if (multipart)
                {
                    response = await client.PostAsync(resource, data as MultipartFormDataContent);
                }
                else
                {
                    //  var payLoad = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                    var payLoad = new StringContent(Convert.ToString(data), Encoding.UTF8, "application/json");
                    response = await client.PostAsync(resource, payLoad);
                    var json =  response.Content.ReadAsStringAsync().Result;
                }
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
