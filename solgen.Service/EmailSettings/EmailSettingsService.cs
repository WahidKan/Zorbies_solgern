using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
namespace Solgen.Service
{
    public class EmailSettingsService : IEmailSettingsService
    {
        private IEmailSettingsRepository _emailSettingsRepository;
        private IEmailTemplateRepository _emailTemplateRepository;
        private IEmailTrackingRepository _emailTrackingRepository;
        public EmailSettingsService(IEmailSettingsRepository emailSettingsRepository, IEmailTemplateRepository emailTemplateRepository, IEmailTrackingRepository emailTrackingRepository)
        {
            _emailSettingsRepository = emailSettingsRepository;
            _emailTemplateRepository = emailTemplateRepository;
            _emailTrackingRepository = emailTrackingRepository;
        }
        /*! 
       * \brief  Get email setings.
       * \details function is used to Delete document basis of document id.
       * \author  Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public EmailSettingsModel GetEmailSettings(Guid userId, string CompanyId="")
        {
            return _emailSettingsRepository.GetEmailSettings(userId, CompanyId);
        }
        /*! 
       * \brief  Add update Email settings.
       * \details function is used to Add update Email settings.
       * \author  Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public int SaveEmailSettings(EmailSettingsModel model)
        {
            return _emailSettingsRepository.SaveEmailSettings(model);
        }
        /*! 
       * \brief  Replace Emaplete variables.
       * \details function is used to Replace Emaplete variables.
       * \author  Anish K.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public string ReplaceFileVariables(Hashtable hashVars, string content)
        {
            IDictionaryEnumerator dicEn = hashVars.GetEnumerator();
            if (!string.IsNullOrEmpty(content))
            {
                while (dicEn.MoveNext())
                {
                    content = content.Replace(dicEn.Key.ToString(), Convert.ToString(dicEn.Value));
                }
            }

            return content;
        }

        /*! 
       * \brief  Send email .
       * \details function is used to Send email for all user and all function.
       * \author Vikarnt verma.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public async Task SendEmail(string toEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyId = "", bool isforgot = false)
        {
            try
            {

                var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, companyId);
                if (objTemplate != null)
                {
                   // objTemplate.EmailTemplateLogo = CommonService.GetFileLink(objTemplate.EmailTemplateLogo, "image", enumFileFolder.user);

                    if (objTemplate.EmailTemplateLogo.Contains("defaultNoImage"))
                    {
                        objTemplate.EmailTemplateLogo = "javascript:;";

                    }
                    else
                    {

                        objTemplate.EmailTemplateLogo = objTemplate.EmailTemplateLogo.Replace("wwwroot", "");
                    }
                    if (objTemplate.companyName != null && objTemplate.companyName != "" && !isforgot)
                    {
                        htbl["@sitename"] = objTemplate.companyName;
                    }
                    //if (!isforgot)
                    //{
                    //    htbl["@logolink"] = objTemplate.EmailTemplateLogo;
                    //}
                    htbl["@logolink"] = objTemplate.EmailTemplateLogo;

                    htbl["@year"] = DateTime.Now.Year.ToString();

                    string content = "";
                    if (htbl.Count > 0)
                    {
                        if (objTemplate != null)
                        {
                            content = ReplaceFileVariables(htbl, objTemplate.Template);
                        }
                    }

                    if (string.IsNullOrEmpty(content))
                    {
                        content = emailMessage;
                    }

                    if (objTemplate != null)
                    {
                        if (!string.IsNullOrEmpty(objTemplate.EmailTemplateSubject))
                        {
                            if (!dynamicSubject)
                            {
                                emailSubject = objTemplate.EmailTemplateSubject;
                            }
                        }
                    }
                  
                    var emailSettings = _emailSettingsRepository.GetEmailSettings(CreatedBy, companyId);

                    if (emailSettings != null)
                    {
                        var message = new MailMessage();

                        message.To.Add(new MailAddress(toEmailAddress));
                        //message.CC.Add(toEmailAddress);
                        message.Subject = emailSubject;
                        message.Body = content;
                        message.From = new MailAddress(emailSettings.FromEmailId);
                        message.IsBodyHtml = true;
                        EmailSendingModel model = new EmailSendingModel();
                        model.EmailSubject = emailSubject;
                        model.EmailContent = content;
                        model.EmailFrom = emailSettings.FromEmailId;
                        model.EmailTo = toEmailAddress;
                        model.CreatedBy = CreatedBy;
                        model.ModuleName = ModuleName;
                        model.PrimaryId = PrimaryId;
                        using (var smtpClient = new SmtpClient(emailSettings.SMTPServer))
                        {
                            // smtpClient.UseDefaultCredentials = false;

                            smtpClient.EnableSsl = emailSettings.IsEnableSSL;

                            if (emailSettings.SMTPPort != "")
                                smtpClient.Port = Convert.ToInt16(emailSettings.SMTPPort);
                                smtpClient.Credentials = new NetworkCredential(emailSettings.SMTPUserName, emailSettings.SMTPPassword);

                            try
                            {
                                await smtpClient.SendMailAsync(message);
                                model.EmailStatus = true;
                                var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                            }
                            catch (Exception ex)
                            {
                                model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                                model.EmailStatus = false;
                                var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                EmailSendingModel model = new EmailSendingModel();
                model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                model.EmailStatus = false;
                var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
            }
        }

        public async Task SendEmailDocs(string toEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyId = "")
        {
            try
            {
                var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, companyId);



                if (objTemplate.CompanyLogo.Contains("defaultNoImage"))
                {
                    objTemplate.CompanyLogo = "javascript:;";

                }
                else
                {

                    objTemplate.CompanyLogo = objTemplate.CompanyLogo.Replace("wwwroot", "");
                    //item.CompanyLogo= item.CompanyLogo.Replace("UserProfilePick/", "UserProfilePick//////");
                }
                //htbl["@logolink"] = objTemplate.CompanyLogo;

                //string content = "";
                //if (htbl.Count > 0)
                //{
                //    if (objTemplate != null)
                //    {
                //        content = ReplaceFileVariables(htbl, objTemplate.Template);
                //    }
                //}

                //if (string.IsNullOrEmpty(content))
                //{
                //    content = emailMessage;
                //}

                if (objTemplate != null)
                {
                    if (!string.IsNullOrEmpty(objTemplate.EmailTemplateSubject))
                    {
                        if (!dynamicSubject)
                        {
                            emailSubject = objTemplate.EmailTemplateSubject;
                        }
                    }
                }

                var emailSettings = _emailSettingsRepository.GetEmailSettings(CreatedBy, companyId);
                EmailSendingModel model = new EmailSendingModel();
                if (emailSettings != null)
                {
                    var message = new MailMessage();
                    //foreach (var item in toEmailAddress)
                    //{
                    //    message.To.Add(new MailAddress(item));
                    //    model.EmailTo = item;
                    //}

                    message.To.Add(new MailAddress(toEmailAddress));
                    message.Subject = emailSubject;
                    message.Body = emailMessage;
                    message.From = new MailAddress(emailSettings.FromEmailId);
                    message.IsBodyHtml = true;

                    // model.EmailTo = toEmailAddress;
                    model.EmailSubject = emailSubject;
                    model.EmailContent = emailMessage;
                    model.EmailFrom = emailSettings.FromEmailId;

                    model.CreatedBy = CreatedBy;
                    model.ModuleName = ModuleName;
                    model.PrimaryId = PrimaryId;
                    using (var smtpClient = new SmtpClient(emailSettings.SMTPServer))
                    {
                        smtpClient.UseDefaultCredentials = false;

                        smtpClient.EnableSsl = emailSettings.IsEnableSSL;
                        if (emailSettings.SMTPPort != "")
                            smtpClient.Port = Convert.ToInt16(emailSettings.SMTPPort);
                        smtpClient.Credentials = new NetworkCredential(emailSettings.SMTPUserName, emailSettings.SMTPPassword);

                        try
                        {
                            await smtpClient.SendMailAsync(message);
                            model.EmailStatus = true;
                            var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                        }
                        catch (Exception ex)
                        {
                            model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                            model.EmailStatus = false;
                            var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                EmailSendingModel model = new EmailSendingModel();
                model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                model.EmailStatus = false;
                var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
            }
        }


        public async Task SendEmailForMutipleUser(string toEmailAddress, string[] ccEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyId = "")
        {
            try
            {
                var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, companyId);
                //htbl["@logolink"] = "";
                //string headerlogo = CommonFunctions.GetFileLink(objTemplate.EmailTemplateLogo, "image", enumFileFolder.user);
                //if (data.Contains("defaultNoImage"))
                //{
                //    data = "javascript:;";
                //}
                //else
                //{

                //    data = data.Replace("wwwroot", "");
                //    //item.CompanyLogo= item.CompanyLogo.Replace("UserProfilePick/", "UserProfilePick//////");
                //}

                //string content = "";
                //if (htbl.Count > 0)
                //{
                //    if (objTemplate != null)
                //    {
                //        if (!dynamicSubject)
                //        {
                //            content = ReplaceFileVariables(htbl, objTemplate.Template);
                //        }
                //    }
                //}

                //if (string.IsNullOrEmpty(content))
                //{
                //    if (dynamicSubject)
                //    {
                //        content = ReplaceFileVariables(htbl, emailMessage); 
                //    }
                //}

                //if (objTemplate != null)
                //{
                //    if (!string.IsNullOrEmpty(objTemplate.EmailTemplateSubject))
                //    {
                //        if (!dynamicSubject)
                //        {
                //            emailSubject = objTemplate.EmailTemplateSubject;
                //        }
                //    }
                //}


                if (objTemplate.CompanyLogo.Contains("defaultNoImage"))
                {
                    objTemplate.CompanyLogo = "javascript:;";

                }
                else
                {

                    objTemplate.CompanyLogo = objTemplate.CompanyLogo.Replace("wwwroot", "");
                    //item.CompanyLogo= item.CompanyLogo.Replace("UserProfilePick/", "UserProfilePick//////");
                }
                //htbl["@logolink"] = objTemplate.CompanyLogo;

                string content = "";
                if (htbl.Count > 0)
                {
                    if (objTemplate != null)
                    {
                        content = ReplaceFileVariables(htbl, objTemplate.Template);
                    }
                }

                if (string.IsNullOrEmpty(content))
                {
                    content = emailMessage;
                }

                if (objTemplate != null)
                {
                    if (!string.IsNullOrEmpty(objTemplate.EmailTemplateSubject))
                    {
                        if (!dynamicSubject)
                        {
                            emailSubject = objTemplate.EmailTemplateSubject;
                        }
                    }
                }

                var emailSettings = _emailSettingsRepository.GetEmailSettings(CreatedBy, companyId);
                EmailSendingModel model = new EmailSendingModel();
                if (emailSettings != null)
                {
                    var message = new MailMessage();
                    //foreach (var item in toEmailAddress)
                    //{
                    //    message.To.Add(new MailAddress(item));
                    //    model.EmailTo = item;
                    //}
                    if (ccEmailAddress != null)
                    {
                        foreach (var ccItem in ccEmailAddress)
                        {
                            message.CC.Add(new MailAddress(ccItem));
                        }
                    }
                    message.To.Add(new MailAddress(toEmailAddress));
                    message.Subject = emailSubject;
                    message.Body = content;
                    message.From = new MailAddress(emailSettings.FromEmailId);
                    message.IsBodyHtml = true;

                    // model.EmailTo = toEmailAddress;
                    model.EmailSubject = emailSubject;
                    model.EmailContent = content;
                    model.EmailFrom = emailSettings.FromEmailId;

                    model.CreatedBy = CreatedBy;
                    model.ModuleName = ModuleName;
                    model.PrimaryId = PrimaryId;
                    using (var smtpClient = new SmtpClient(emailSettings.SMTPServer))
                    {
                        smtpClient.UseDefaultCredentials = false;

                        smtpClient.EnableSsl = emailSettings.IsEnableSSL;
                        if (emailSettings.SMTPPort != "")
                            smtpClient.Port = Convert.ToInt16(emailSettings.SMTPPort);
                        smtpClient.Credentials = new NetworkCredential(emailSettings.SMTPUserName, emailSettings.SMTPPassword);

                        try
                        {
                            await smtpClient.SendMailAsync(message);
                            model.EmailStatus = true;
                            var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                        }
                        catch (Exception ex)
                        {
                            model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                            model.EmailStatus = false;
                            var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                EmailSendingModel model = new EmailSendingModel();
                model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                model.EmailStatus = false;
                var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
            }
        }
        public async Task SendEmailForAssignedMutipleUser(string toEmailAddress, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyId = "")
        {
            try
            {
                var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, companyId);
               
                if (objTemplate.CompanyLogo.Contains("defaultNoImage"))
                {
                    objTemplate.CompanyLogo = "javascript:;";

                }
                else
                {

                    objTemplate.CompanyLogo = objTemplate.CompanyLogo.Replace("wwwroot", "");
                }

                string content = "";
                if (htbl.Count > 0)
                {
                    if (objTemplate != null)
                    {
                        content = ReplaceFileVariables(htbl, objTemplate.Template);
                    }
                }

                if (string.IsNullOrEmpty(content))
                {
                    content = emailMessage;
                }

                if (objTemplate != null)
                {
                    if (!string.IsNullOrEmpty(objTemplate.EmailTemplateSubject))
                    {
                        if (!dynamicSubject)
                        {
                            emailSubject = objTemplate.EmailTemplateSubject;
                        }
                    }
                }

                var emailSettings = _emailSettingsRepository.GetEmailSettings(CreatedBy, companyId);
                EmailSendingModel model = new EmailSendingModel();
                if (emailSettings != null)
                {
                    var message = new MailMessage();
                 
                    message.To.Add(new MailAddress(toEmailAddress));
                    message.Subject = emailSubject;
                    message.Body = content;
                    message.From = new MailAddress(emailSettings.FromEmailId);
                    message.IsBodyHtml = true;

                    model.EmailSubject = emailSubject;
                    model.EmailContent = content;
                    model.EmailFrom = emailSettings.FromEmailId;

                    model.CreatedBy = CreatedBy;
                    model.ModuleName = ModuleName;
                    model.PrimaryId = PrimaryId;
                    using (var smtpClient = new SmtpClient(emailSettings.SMTPServer))
                    {
                        smtpClient.UseDefaultCredentials = false;

                        smtpClient.EnableSsl = emailSettings.IsEnableSSL;
                        if (emailSettings.SMTPPort != "")
                            smtpClient.Port = Convert.ToInt16(emailSettings.SMTPPort);
                        smtpClient.Credentials = new NetworkCredential(emailSettings.SMTPUserName, emailSettings.SMTPPassword);

                        try
                        {
                            
                            await smtpClient.SendMailAsync(message);
                            model.EmailStatus = true;
                            var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                            
                        }
                        catch (Exception ex)
                        {
                            model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                            model.EmailStatus = false;
                            var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                EmailSendingModel model = new EmailSendingModel();
                model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                model.EmailStatus = false;
                var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
            }
        }

        public async Task SendEmailWithNotificationToUsers(dynamic emaildata, Hashtable htbl, string emailSubject, string emailMessage, string PrimaryId, Guid CreatedBy, bool dynamicSubject = false, string templateName = "", string ModuleName = "", string companyId = "",long SendEmailId=0, string UserName = "")
        {
            try
            {

                var objTemplate = _emailTemplateRepository.GetEmailTemplteByTemplateName(templateName, companyId);
                if (objTemplate != null)
                {
                    objTemplate.EmailTemplateLogo = CommonService.GetFileLink(objTemplate.EmailTemplateLogo, "image", enumFileFolder.user);

                    if (objTemplate.EmailTemplateLogo.Contains("defaultNoImage"))
                    {
                        objTemplate.EmailTemplateLogo = "javascript:;";

                    }
                    else
                    {

                        objTemplate.EmailTemplateLogo = objTemplate.EmailTemplateLogo.Replace("wwwroot", "");
                    }
                    if (objTemplate.companyName != null && objTemplate.companyName != "")
                    {
                        htbl["@sitename"] = objTemplate.companyName;
                    }
                   
                    htbl["@logolink"] = objTemplate.EmailTemplateLogo;

                    htbl["@year"] = DateTime.Now.Year.ToString();
                    htbl["@bodycontent"] = emailMessage;
                    htbl["@SenderName"] = UserName;


                    //if (objTemplate != null)
                    //{
                    //    if (!string.IsNullOrEmpty(objTemplate.EmailTemplateSubject))
                    //    {
                    //        if (!dynamicSubject)
                    //        {
                    //            if (objTemplate.EmailTemplateSubject == "Email Subject")
                    //            {
                    //                var sub = emailSubject;
                    //                emailSubject = sub;
                    //            }
                    //            else { 
                    //            emailSubject = objTemplate.EmailTemplateSubject;
                    //            }
                    //        }
                    //    }
                    //}

                    var emailSettings = _emailSettingsRepository.GetEmailSettings(CreatedBy, companyId);

                    if (emaildata !=null) 
                    {
                        if (emailSettings != null)
                        {
                           
                                foreach (var item in emaildata)
                                {

                                    htbl["@username"] = item.name;
                                    string content = "";
                                    if (htbl.Count > 0)
                                    {
                                        if (objTemplate != null)
                                        {
                                            content = ReplaceFileVariables(htbl, objTemplate.Template);
                                        }
                                    }

                                    if (string.IsNullOrEmpty(content))
                                    {
                                        content = emailMessage;
                                    }

                                
                                    var message = new MailMessage();

                                    message.To.Add(new MailAddress(item.email));
                                    message.Subject = emailSubject;
                                    message.Body = content;
                                    message.From = new MailAddress(emailSettings.FromEmailId);
                                    message.IsBodyHtml = true;
                                    EmailSendingModel model = new EmailSendingModel();
                                    model.EmailSubject = emailSubject;
                                    model.EmailContent = content;
                                    model.EmailFrom = emailSettings.FromEmailId;
                                    model.EmailTo = item.email;
                                    model.CreatedBy = CreatedBy;
                                    model.ModuleName = ModuleName;
                                    model.PrimaryId = PrimaryId;
                                    model.SendEmailId = SendEmailId;
                                using (var smtpClient = new SmtpClient(emailSettings.SMTPServer))
                                {
                                    smtpClient.EnableSsl = emailSettings.IsEnableSSL;
                                    if (emailSettings.SMTPPort != "")
                                        smtpClient.Port = Convert.ToInt16(emailSettings.SMTPPort);
                                    smtpClient.Credentials = new NetworkCredential(emailSettings.SMTPUserName, emailSettings.SMTPPassword);

                                    try
                                    {
                                        await smtpClient.SendMailAsync(message);
                                        model.EmailStatus = true;
                                        var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                                    }
                                    catch (Exception ex)
                                    {
                                        model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                                        model.EmailStatus = false;
                                        var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
                                    }

                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                EmailSendingModel model = new EmailSendingModel();
                model.EmailSendingResponse = "Message: " + Convert.ToString(ex.Message) + " **InnerException-" + Convert.ToString(ex.InnerException);
                model.EmailStatus = false;
                var newid = _emailTrackingRepository.SaveSendEmailStatus(model);
            }
        }
    }
}
