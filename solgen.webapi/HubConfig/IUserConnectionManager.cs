using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.HubConfig
{
   public interface IUserConnectionManager
    {
        void KeepUserConnection(string userId, string connectionId,int stamp);
        void RemoveUserConnection(string connectionId);
        void RemoveUserConnectionByUserIdAndStamp(string userId, int stamp);
        List<UserConnection> GetUserConnections(string userId);
    }
}
