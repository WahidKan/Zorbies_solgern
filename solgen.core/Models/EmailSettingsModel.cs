using System;

namespace Solgen.Core
{
    public class EmailSettingsModel
    {
		public string CompanyId { get; set; }
		public Guid? EmailSettingId { get; set; }
        public string SMTPServer { get; set; }
        public string SMTPUserName { get; set; }
        public string SMTPPassword { get; set; }
        public string SMTPPort { get; set; }
        public string FromEmailId { get; set; }
        public bool? EmailSubscriptionCreated { get; set; }
        public bool? EmailCustomersSignUp { get; set; }
        public bool? CardExpirationEmail { get; set; }
        public Guid EmailSettingCreatedBy { get; set; }
        public DateTime EmailSettingCreatedOn { get; set; }
        public Guid EmailSettingModifiedBy { get; set; }
        public DateTime EmailSettingModifiedOn { get; set; }
        public bool EmailSettingIsActive { get; set; }
        public bool IsEnableSSL { get; set; }
        public bool? IsEnableTLS { get; set; }
    }
}
