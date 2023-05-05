using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;

namespace Solgen.Service
{
    public interface IEmailSettingsService
    {
        EmailSettingsModel GetEmailSettings(Guid userId,string CompanyId="");
        int SaveEmailSettings(EmailSettingsModel model);
        Task SendEmail(string toEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName="",string ModuleName = "",string companyid="",bool isforgot=false);
         Task SendEmailDocs(string toEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyId = "");
        Task SendEmailForMutipleUser(string toEmailAddress, string[] ccEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyid = "");
        Task SendEmailForAssignedMutipleUser(string toEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyid = "");
        Task SendEmailWithNotificationToUsers(dynamic emaildata, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyId = "",long SendEmailId=0, string UserName = "");
    }
}
