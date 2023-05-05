using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.HubConfig
{
    public class UserConnectionManager:IUserConnectionManager
    {
        private static Dictionary<string, List<UserConnection>> userConnectionMap = new Dictionary<string, List<UserConnection>>();
        private static string userConnectionMapLocker = string.Empty;
        public void KeepUserConnection(string userId, string connectionId,int stamp)
        {
            lock (userConnectionMapLocker)
            {
                if (!userConnectionMap.ContainsKey(userId.ToLower()))
                {
                    userConnectionMap[userId.ToLower()] = new List<UserConnection>();
                }

                UserConnection userConnection =new UserConnection();// { userConnection.ConnectionID = "", userConnection.Stamp = 23 };
                userConnection.ConnectionID = connectionId;
                userConnection.Stamp= stamp;

                var removeConnections = userConnectionMap[userId.ToLower()].Where(m => m.Stamp == stamp).ToList();
                foreach (var removeConnection in removeConnections)
                {
                    userConnectionMap[userId.ToLower()].Remove(removeConnection);
                }

                userConnectionMap[userId.ToLower()].Add(userConnection);
            }
        }
        public void RemoveUserConnection(string connectionId)
        {
            //This method will remove the connectionId of user
            lock (userConnectionMapLocker)
            {
                foreach (var userId in userConnectionMap.Keys)
                {
                    if (userConnectionMap.ContainsKey(userId))
                    {
                        if (userConnectionMap[userId].Any(m=>m.ConnectionID ==connectionId))
                        {
                            var removeConnection = userConnectionMap[userId].FirstOrDefault(m => m.ConnectionID == connectionId);
                            userConnectionMap[userId].Remove(removeConnection);
                            break;
                        }
                    }
                }
            }
        }

        public void RemoveUserConnectionByUserIdAndStamp(string userId,int stamp) {
            var removeConnections = userConnectionMap[userId.ToLower()].Where(m => m.Stamp == stamp).ToList();
            foreach (var removeConnection in removeConnections)
            {
                userConnectionMap[userId.ToLower()].Remove(removeConnection);
            }
        }

        public List<UserConnection> GetUserConnections(string userId)
        {
            var conn = new List<UserConnection>();
            lock (userConnectionMapLocker)
            {
                string val = userId.ToLower();
                conn = userConnectionMap.FirstOrDefault(m=>m.Key== val).Value;
            }
            return conn;
        }
    }

    public struct UserConnection {
        public string ConnectionID { get; set; }

        public int Stamp { get; set; }
    }

}
