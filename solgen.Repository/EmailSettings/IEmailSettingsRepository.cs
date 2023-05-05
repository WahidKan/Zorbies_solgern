using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IEmailSettingsRepository
    {
        EmailSettingsModel GetEmailSettings(Guid userId,string companyId="");
        int SaveEmailSettings(EmailSettingsModel model);
       
    }
}
