using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Base;
using Twilio.Jwt.AccessToken;
using Twilio.Rest.Video.V1;
using Twilio.Rest.Video.V1.Room;
using ParticipantStatus = Twilio.Rest.Video.V1.Room.ParticipantResource.StatusEnum;
using Solgen.Core;
using Solgen.Repository;
using System.Net.Http;
using Solgen.Repository.CompanySetting;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public class VideoService : IVideoService
    {
        private readonly VideoSettings _twilioSettings;
        private readonly ICommonRepository _commonRepository;
        private readonly ITwilioRepository _twilioRepository;
        private readonly ICompanyIntegrationSettingRepository _companyIntegrationSetting;
        private SettingModel _settings;

        public VideoService(Microsoft.Extensions.Options.IOptions<VideoSettings> twilioOptions, ICommonRepository commonRepository, ITwilioRepository twilioRepository,ICompanyIntegrationSettingRepository companyIntegrationSetting)
        {
            _companyIntegrationSetting = companyIntegrationSetting;
            _twilioRepository = twilioRepository;
            _twilioSettings =
                twilioOptions?.Value
             ?? throw new ArgumentNullException(nameof(twilioOptions));

            TwilioClient.Init(_twilioSettings.ApiKey, _twilioSettings.ApiSecret);
            _commonRepository = commonRepository;
        }

        public string GetTwilioJwt(string identity,string companyid)
        {
            _settings = _companyIntegrationSetting.GetCompanyIntegrationSettingById(companyid);
            if (_settings != null && !string.IsNullOrEmpty(_settings.twilioApiKey))
            {
                _twilioSettings.ApiKey = _settings.twilioApiKey;
            }
            if (_settings != null && !string.IsNullOrEmpty(_settings.twilioApiSecret))
            {
                _twilioSettings.ApiSecret = _settings.twilioApiSecret;
            }
            var token = new Token(_twilioSettings.AccountSid,
                         _twilioSettings.ApiKey,
                         _twilioSettings.ApiSecret,
                         identity ?? Guid.NewGuid().ToString(),
                         grants: new HashSet<IGrant> { new VideoGrant() }).ToJwt();
            return token;
        }

        public async Task<IEnumerable<RoomDetails>> GetAllRoomsAsync(string joinId = null)
        {
            var rooms = await RoomResource.ReadAsync();
            var reponse = new List<RoomDetails>();
            foreach (var room in rooms)
            {
                var participantTask = await ParticipantResource.ReadAsync(room.Sid, ParticipantStatus.Connected);

                reponse.Add(GetRoomDetailsAsync(room, participantTask, joinId));
            }
            //var tasks = rooms.Select(
            //    (room) => GetRoomDetailsAsync(
            //        room,
            //      ParticipantResource.ReadAsync(
            //            room.Sid,
            //            ParticipantStatus.Connected).Result, joinId)
            //    );

            //var result = tasks;
            //if (joinId != null)
            //{
            //    var roomId = _commonRepository.GetVideoDetails(joinId);
            //    reponse = reponse.Where(a => a.Id == roomId).ToList();
            //}
            return reponse;

        }
        private RoomDetails GetRoomDetailsAsync(RoomResource room, ResourceSet<ParticipantResource> participantTask, string joinId)
        {
            var participants = participantTask;
            var joinLink = (dynamic)null;
            if (joinId == null && room != null && room.Sid != null)
            {
                joinLink = Guid.NewGuid().ToString();
                _commonRepository.AddVideoChat(room.Sid, room.UniqueName, joinLink);
            }
            return new RoomDetails
            {
                Id = room.Sid,
                Name = room.UniqueName,
                MaxParticipants = room.MaxParticipants ?? 0,
                ParticipantCount = participants.ToList().Count,
                JoinId = joinLink,
                IsActive = room.Status == RoomResource.RoomStatusEnum.InProgress ? true : false
            };
        }

        public RoomDetails CancelRooms(string roomSid)
        {
            var room = RoomResource.Update(
               status: RoomResource.RoomStatusEnum.Completed,
               pathSid: roomSid
           );
            return new RoomDetails
            {

                Id = room.Sid,
                Name = room.UniqueName,
                MaxParticipants = room.MaxParticipants ?? 0
            };
        }

        public object CreateRoom(string uniqueName)
        {
            var options = new CreateRoomOptions()
            {
                UniqueName = uniqueName,
                Type = RoomResource.RoomTypeEnum.Group
            };
            var room = RoomResource.Create(options);
            return room;
        }

        public async Task<string> VideoCallLogHistory(string json)
        {
            return await _twilioRepository.VideoCallLogHistory(json);
        }
    }
}
