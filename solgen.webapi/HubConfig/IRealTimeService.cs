using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.HubConfig
{
   public interface IRealTimeService
    {
        Task SendNotification(NotificationSendModel model);
        Task ReloadNotification(string userId, bool isShowToaster = false);
        Task RuleStartNotification(string connectionID, long ruleId);
        Task RuleCompletionNotification(string connectionID, long ruleId, short status);
        Task TargetCompletionNotification(string connectionID, long ruleId, long targetId, short status);
        Task ApplicationStatusStartNotification(string connectionID, long applicationId, short status);
        Task ApplicationStatusCompletionNotification(string connectionID, long applicationId, short status);
        Task OnAppointStarted(string userId);
        
    }
}
