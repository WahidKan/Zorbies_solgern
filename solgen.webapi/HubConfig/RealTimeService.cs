using Microsoft.AspNetCore.SignalR;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Drawing.Text;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.HubConfig
{
    public class RealTimeService : IRealTimeService
    {
        public IUserConnectionManager _userConnectionManager { get; }

        public INotificationRepository _notificationRepository { get; }

        private IHubContext<UserHub> _userHub;
        public RealTimeService(IUserConnectionManager userConnectionManager,
            IHubContext<UserHub> userHub, INotificationRepository notificationRepository)
        {
            _userConnectionManager = userConnectionManager;
            _userHub = userHub;
            _notificationRepository = notificationRepository;
        }

        public async Task SendNotification(NotificationSendModel model)
        {

            var result = _notificationRepository.SendNotification(model);

            if (result)
            {
                foreach (var userId in model.UserIdList)
                {
                    var connections = _userConnectionManager.GetUserConnections(userId);
                    if (connections != null && connections.Count > 0)
                    {
                        foreach (var connection in connections)
                        {
                            await _userHub.Clients.Client(connection.ConnectionID).SendAsync("sendNotificationToClient", "New notification received.", true);

                        }
                    }
                }
            }
        }
        public async Task OnAppointStarted(string userId)
        {
            var connections = _userConnectionManager.GetUserConnections(userId);
            if (connections != null && connections.Count > 0)
            {
                foreach (var connection in connections)
                {
                    await _userHub.Clients.Client(connection.ConnectionID).SendAsync("onAppointmentStartedNotifyClient", true);

                }
            }

        }

        public async Task ReloadNotification(string userId, bool isShowToaster = false)
        {
            var connections = _userConnectionManager.GetUserConnections(userId);
            if (connections != null && connections.Count > 0)
            {
                foreach (var connection in connections)
                {
                    await _userHub.Clients.Client(connection.ConnectionID).SendAsync("sendNotificationToClient", "New notification received.", isShowToaster);

                }
            }
        }

        public async Task RuleCompletionNotification(string connectionID, long ruleId, short status)
        {
            await _userHub.Clients.Client(connectionID).SendAsync("ruleCompletionNotification", ruleId, status);
        }

        public async Task TargetCompletionNotification(string connectionID, long ruleId, long targetId, short status)
        {
            await _userHub.Clients.Client(connectionID).SendAsync("targetCompletionNotification", ruleId, targetId, status);
        }

        public async Task RuleStartNotification(string connectionID, long ruleId)
        {
            await _userHub.Clients.Client(connectionID).SendAsync("ruleStartNotification", ruleId);
        }

        public async Task ApplicationStatusStartNotification(string connectionID, long applicationId, short status)
        {
            await _userHub.Clients.Client(connectionID).SendAsync("applicationStatusStartNotification", applicationId);
        }

        public async Task ApplicationStatusCompletionNotification(string connectionID, long applicationId, short status)
        {
            await _userHub.Clients.Client(connectionID).SendAsync("applicationStatusCompletionNotification", applicationId);
        }
    }
}
