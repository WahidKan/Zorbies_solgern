using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Solgen.Core.Models;
using Solgen.Service;
using System.Collections.Concurrent;

namespace Solgen.WebApi.HubConfig
{    
    public class UserHub : Hub
    {
        private readonly IUserConnectionManager _userConnectionManager;
        public UserHub(IUserConnectionManager userConnectionManager)
        {
            _userConnectionManager = userConnectionManager;
        }
        public void SetConnection(string userId,int stamp)
        {           
            if (this.Context != null)
            {
                var httpContext = this.Context.GetHttpContext();
                //var userId = Context.User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                if (userId != null)
                {
                    _userConnectionManager.KeepUserConnection(userId, Context.ConnectionId,stamp);
                    //return Context.ConnectionId;
                }                            
               
            }
          
        }

        public string GetConnectionId(string userId, int stamp)
        {
            if (this.Context != null)
            {
                var httpContext = this.Context.GetHttpContext();
                var userIdn = Context.User.Claims.FirstOrDefault(x => x.Type == "UserID")?.Value;
                if (userId != null)
                {
                    _userConnectionManager.KeepUserConnection(userId, Context.ConnectionId, stamp);
                    //return Context.ConnectionId;
                }

                try
                {
                    dynamic model = new
                    {
                        connnectionId = Context.ConnectionId,
                        userId = userId,
                        Connections = _userConnectionManager.GetUserConnections(userId)
                    };
                    return Newtonsoft.Json.JsonConvert.SerializeObject(model);
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }


            }
            return "NA-" + userId.ToString();
        }

        public override Task OnConnectedAsync()
        {
            //var name = Context.User.Identity.Name;
            //var connectionId = Context.ConnectionId;
            return base.OnConnectedAsync();
        }
        //Called when a connection with the hub is terminated.
        public async override Task OnDisconnectedAsync(Exception exception)
        {
            //get the connectionId
            var connectionId = Context.ConnectionId;
            _userConnectionManager.RemoveUserConnection(connectionId);
            var value = await Task.FromResult(0);
        }
    }    
}
