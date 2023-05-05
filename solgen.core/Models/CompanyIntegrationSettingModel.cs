using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class CompanyIntegrationSettingModel
    {
        public string CompanyId { get; set; }
        public string FormJsonData { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string UserId { get; set; }
       
    }
    public class SettingModel
    {
        public string signNowApiUrl { get; set; }
        public string signNowToken { get; set; }
        public string signNowLogin { get; set; }
        public string signNowPassword { get; set; }
        public string signNowCallback { get; set; }
        public string docusignIntergratedKey { get; set; }
        public string docusignPassword { get; set; }
        public string docusignUserName { get; set; }
        public string facebookSandboxAuth { get; set; }
        public string facebookAccountId { get; set; }
        public string facebookPageId { get; set; }
        public string fbDataLimit { get; set; }
        public string twilioAccountSid { get; set; }
        public string outgoingApplicationSid { get; set; }
        public string authToken { get; set; }
        public string twilioApiSecret { get; set; }
        public string twilioApiKey { get; set; }
        public string messagingServiceSid { get; set; }
        public string fromPhone { get; set; }
        public string smsStatusCallBackURL { get; set; }
        public string actionURL { get; set; }
        public string recordingStatusCallbackURL { get; set; }
        public string roomStatusCallBackUrl { get; set; }

		public string server { get; set; }

		public string userName  { get; set; }

		public string password { get; set; }

		public int port { get; set; }

		public string  remotePath { get; set; }

		public string folderPath { get; set; }

	}
}
