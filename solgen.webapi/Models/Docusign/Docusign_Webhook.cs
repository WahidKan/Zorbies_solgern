using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models.Docusign
{

    public class Docusign_Webhook
    {
        public string status { get; set; }
        public string documentsUri { get; set; }
        public string recipientsUri { get; set; }
        public string attachmentsUri { get; set; }
        public string envelopeUri { get; set; }
        public string emailSubject { get; set; }
        public string envelopeId { get; set; }
        public string signingLocation { get; set; }
        public string customFieldsUri { get; set; }
        public string notificationUri { get; set; }
        public string enableWetSign { get; set; }
        public string allowMarkup { get; set; }
        public string allowReassign { get; set; }
        public DateTime createdDateTime { get; set; }
        public DateTime lastModifiedDateTime { get; set; }
        public DateTime deliveredDateTime { get; set; }
        public DateTime initialSentDateTime { get; set; }
        public DateTime sentDateTime { get; set; }
        public DateTime completedDateTime { get; set; }
        public DateTime voidedDateTime { get; set; }
        public string voidedReason { get; set; }
        public DateTime statusChangedDateTime { get; set; }
        public string documentsCombinedUri { get; set; }

        public string certificateUri { get; set; }
        public string templatesUri { get; set; }
        public string expireEnabled { get; set; }
        public DateTime expireDateTime { get; set; }
        public string expireAfter { get; set; }
        public Sender sender { get; set; }
        public string purgeState { get; set; }
        public string envelopeIdStamping { get; set; }
        public string is21CFRPart11 { get; set; }
        public string signerCanSignOnMobile { get; set; }
        public string autoNavigation { get; set; }
        public string isSignatureProviderEnvelope { get; set; }
        public string hasFormDataChanged { get; set; }
        public string allowComments { get; set; }
        public string hasComments { get; set; }
        public string allowViewHistory { get; set; }
        public EnvelopeMetadata envelopeMetadata { get; set; }
        public object anySigner { get; set; }
        public string envelopeLocation { get; set; }
        public string isDynamicEnvelope { get; set; }
    }

    public class Sender
    {
        public string userName { get; set; }
        public string userId { get; set; }
        public string accountId { get; set; }
        public string email { get; set; }
    }

    public class EnvelopeMetadata
    {
        public string allowAdvancedCorrect { get; set; }
        public string enableSignWithNotary { get; set; }
        public string allowCorrect { get; set; }
    }

    public class DocusignEventField
    {


        public string status { get; set; }
        public string Date { get; set; }
        public string user { get; set; }
        public string Action { get; set; }
        public string Message { get; set; }
    }

}
