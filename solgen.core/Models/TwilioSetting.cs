using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class TwilioSetting
    {
        public string twilioAccountSid { get; set; }
        public string outgoingApplicationSid { get; set; }
        public string twilioApiKey { get; set; }
        public string twilioApiSecret { get; set; }
        public string identity { get; set; }
    }
    public class VoiceCallModel
    {
        public string ApplicationSid { get; set; }
        public string ApiVersion { get; set; }
        public string Called { get; set; }
        public string Caller { get; set; }
        public string CallStatus { get; set; }
        public string from { get; set; }
        public string CallSid { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Direction { get; set; }
        public string AccountSid { get; set; }
    }
    public class RoomsParticipant
    {
        public string ParticipantName { get; set; }
        public string ParticipantIdentity { get; set; }
        public string ObjectId { get; set; }
        public string ParticipantSid { get; set; }
        public string RefId { get; set; }
        public string CompanyId { get; set; }
    }

    public class RoomsStatusRequest
    {
        public string AccountSid { get; set; }
        public string RoomName { get; set; }
        public string RoomSid { get; set; }
        public string RoomStatus { get; set; }
        public string RoomType { get; set; }
        public string StatusCallbackEvent { get; set; }
        public string Timestamp { get; set; }
        public string ParticipantSid { get; set; }
        public string ParticipantStatus { get; set; }
        public string ParticipantDuration { get; set; }
        public string ParticipantIdentity { get; set; }
        public string RoomDuration { get; set; }
        public string SequenceNumber { get; set; }
        public string TrackSid { get; set; }
        public string TrackKind { get; set; }
        public string ParticipantName { get; set; }
        public string ObjectId { get; set; }
        public string RefId { get; set; }
        public string CompanyId { get; set; }

    }
    public class VoiceRequestModal : TwilioRequest
    {
        public string SipUsername { get; set; }
        public string SipDomain { get; set; }
        public string DialCallDuration { get; set; }
        public string DialCallSid { get; set; }
        public string DialCallStatus { get; set; }
        public string RecordingSid { get; set; }
        public string TranscriptionUrl { get; set; }
        public string TranscriptionStatus { get; set; }
        public string TranscriptionText { get; set; }
        public string TranscriptionSid { get; set; }
        public string RecordingSource { get; set; }
        public string SipCallId { get; set; }
        public int? RecordingChannels { get; set; }
        public string RecordingStatus { get; set; }
        public string RecordingUrl { get; set; }
        public float? Confidence { get; set; }
        public string SpeechResult { get; set; }
        public string Digits { get; set; }
        public string CallerName { get; set; }
        public string ForwardedFrom { get; set; }
        public string Direction { get; set; }
        public string ApiVersion { get; set; }
        public string CallStatus { get; set; }
        public string CallSid { get; set; }
        public string RecordingDuration { get; set; }
        public string SipSourceIp { get; set; }

    }

    public abstract class TwilioRequest
    {
        public string AccountId { get; set; }
        public string CompanyId { get; set; }
        public string UserId { get; set; }
        public string ObjectName { get; set; }
        public string AccountSid { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string FromCity { get; set; }
        public string FromState { get; set; }
        public string FromZip { get; set; }
        public string FromCountry { get; set; }
        public string ToCity { get; set; }
        public string ToState { get; set; }
        public string ToZip { get; set; }
        public string ToCountry { get; set; }
    }
    public class SmsSettings
    {
        public string Body { get; set; }
        public string ToNumber { get; set; }
    }
    public class VideoSettings
    {
        public string AccountSid { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
    public class RoomDetails
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int ParticipantCount { get; set; }
        public int MaxParticipants { get; set; }
        public string JoinId { get; set; }
        public bool IsActive { get; set; }
    }

    public class SmsResponse
    {
        public string SmsSid { get; set; }
        public string SmsStatus { get; set; }
        public string MessageStatus { get; set; }
        public string To { get; set; }
        public string MessageSid { get; set; }
        public string AccountSid { get; set; }
        public string From { get; set; }
        public string ApiVersion { get; set; }
    }
}
