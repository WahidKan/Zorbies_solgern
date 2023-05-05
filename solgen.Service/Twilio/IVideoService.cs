using Solgen.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface IVideoService
    {
        string GetTwilioJwt(string identity,string companyid);
        Task<IEnumerable<RoomDetails>> GetAllRoomsAsync(string joinId);
        RoomDetails CancelRooms(string roomSid);
        Task<string> VideoCallLogHistory(string json);
        object CreateRoom(string uniqueName);
    }
}
