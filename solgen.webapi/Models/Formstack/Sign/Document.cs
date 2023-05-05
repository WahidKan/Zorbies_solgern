using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models.Formstack.Sign
{
    public partial class Document
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("message")]
        public object Message { get; set; }

        [JsonProperty("url")]
        public Url Url { get; set; }

        [JsonProperty("signedUrl")]
        public object SignedUrl { get; set; }

        [JsonProperty("password")]
        public object Password { get; set; }

        [JsonProperty("suppressEmail")]
        public bool SuppressEmail { get; set; }

        [JsonProperty("customLogoUrl")]
        public object CustomLogoUrl { get; set; }

        [JsonProperty("sentDate")]
        public double? SentDate { get; set; }

        [JsonProperty("separatedNumberOfPages")]
        public long? SeparatedNumberOfPages { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("previousStatus")]
        public object PreviousStatus { get; set; }

        [JsonProperty("sender")]
        public Guid Sender { get; set; }

        [JsonProperty("group")]
        public Guid Group { get; set; }

        [JsonProperty("useTextTags")]
        public bool UseTextTags { get; set; }

        [JsonProperty("platform")]
        public object Platform { get; set; }

        [JsonProperty("created")]
        public double Created { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("notifyParticipants")]
        public bool? NotifyParticipants { get; set; }

        [JsonProperty("cc")]
        public object[] Cc { get; set; }

        [JsonProperty("reminderType")]
        public object ReminderType { get; set; }

        [JsonProperty("nextReminderDue")]
        public object NextReminderDue { get; set; }

        [JsonProperty("reminderAttemptCount")]
        public object ReminderAttemptCount { get; set; }

        [JsonProperty("ipsCode")]
        public object IpsCode { get; set; }

        [JsonProperty("cancelReason")]
        public object CancelReason { get; set; }

        [JsonProperty("integrator")]
        public string Integrator { get; set; }

        [JsonProperty("action")]
        public string Action { get; set; }

        [JsonProperty("link")]
        public object Link { get; set; }

        [JsonProperty("redirectUrl")]
        public object RedirectUrl { get; set; }

        [JsonProperty("uploadIds")]
        public Guid[] UploadIds { get; set; }

        [JsonProperty("autoFile")]
        public bool AutoFile { get; set; }

        [JsonProperty("fields")]
        public object[] Fields { get; set; }

        [JsonProperty("participants")]
        public Participant[] Participants { get; set; }

        [JsonProperty("pages")]
        public Page[] Pages { get; set; }

        [JsonProperty("separatedDocs")]
        public object[] SeparatedDocs { get; set; }

        [JsonProperty("dynamicWebhookConfig")]
        public object DynamicWebhookConfig { get; set; }
    }

    public partial class Page
    {
        [JsonProperty("number")]
        public long Number { get; set; }

        [JsonProperty("height")]
        public long Height { get; set; }

        [JsonProperty("width")]
        public long Width { get; set; }

        [JsonProperty("documentPartName")]
        public Guid DocumentPartName { get; set; }

        [JsonProperty("url")]
        public Url Url { get; set; }

        [JsonProperty("thumbnailUrl")]
        public object ThumbnailUrl { get; set; }
    }

    public partial class Url
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("version")]
        public object Version { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }
    }

    public partial class Participant
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("phone")]
        public object Phone { get; set; }

        [JsonProperty("sms")]
        public object Sms { get; set; }

        [JsonProperty("signedOrApproved")]
        public double? SignedOrApproved { get; set; }
    }
}
