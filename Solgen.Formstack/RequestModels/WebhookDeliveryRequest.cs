using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Formstack.RequestModels
{
    public class WebhookDeliveryRequest
    {
        [JsonProperty("id", NullValueHandling = NullValueHandling.Ignore)]
        public int Id { get; set; }

        [JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
        public string Type { get; set; }

        [JsonProperty("settings", NullValueHandling = NullValueHandling.Ignore)]
        public WebhookDeliverySettings Settings { get; set; }
    }

    public class WebhookDeliverySettings
    {
        [JsonProperty("message", NullValueHandling = NullValueHandling.Ignore)]
        public string Url { get; set; }

        [JsonProperty("file_url", NullValueHandling = NullValueHandling.Ignore)]
        public int FileUrl { get; set; }

        [JsonProperty("json", NullValueHandling = NullValueHandling.Ignore)]
        public int Json { get; set; }

        [JsonProperty("one_request", NullValueHandling = NullValueHandling.Ignore)]
        public int OneRequest { get; set; }
    }
}
