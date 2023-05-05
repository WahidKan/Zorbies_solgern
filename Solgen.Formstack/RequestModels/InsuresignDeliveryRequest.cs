using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Formstack.RequestModels
{
    public class InsuresignDeliveryRequest
    {
        [JsonProperty("id", NullValueHandling = NullValueHandling.Ignore)]
        public int Id { get; set; }

        [JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
        public string Type { get; set; }

        [JsonProperty("notification_account_id", NullValueHandling = NullValueHandling.Ignore)]
        public int NotificationAccountId { get; set; }

        [JsonProperty("settings", NullValueHandling = NullValueHandling.Ignore)]
        public InsuresignDeliverySettings Settings { get; set; }
    }

    public class InsuresignDeliverySettings
    {
        [JsonProperty("message", NullValueHandling = NullValueHandling.Ignore)]
        public string Message { get; set; }

        [JsonProperty("recipients", NullValueHandling = NullValueHandling.Ignore)]
        public InsuresignDeliveryRecipient[] Recipients { get; set; }
    }

    public class InsuresignDeliveryRecipient
    {
        [JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
        public string Type { get; set; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty("name_other", NullValueHandling = NullValueHandling.Ignore)]
        public string NameOther { get; set; }

        [JsonProperty("email", NullValueHandling = NullValueHandling.Ignore)]
        public string Email { get; set; }

        [JsonProperty("email_other", NullValueHandling = NullValueHandling.Ignore)]
        public string EmailOther { get; set; }
    }
}
