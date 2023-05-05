import { connect, ConnectOptions, LocalTrack, Room } from 'twilio-video';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthToken {
  token: string;
}

export interface NamedRoom {
  id: string;
  name: string;
  defaultRoom: string;
  maxParticipants?: number;
  participantCount: number;
  joinId: string
}

export type Rooms = NamedRoom[];

@Injectable({
  providedIn: 'root'
})
export class VideoChatService implements OnDestroy {
  public baseUri = `${environment.WebApiBaseUrl}`;
  $roomsUpdated: Observable<boolean>;
  muteAudio : Subject<boolean> = new Subject<boolean>();
  muteVideo : Subject<boolean> = new Subject<boolean>();
  isCallEnded : Subject<boolean> = new Subject<boolean>();
  private roomBroadcast = new ReplaySubject<boolean>();

  constructor(private readonly http: HttpClient) {
    this.$roomsUpdated = this.roomBroadcast.asObservable();
  }
  get getIsCallEnded() {return this.isCallEnded};
  set setIsCallEnded(value){this.isCallEnded.next(value)};
  get getMuteAudio() { return this.muteAudio};
  set setMuteAudio(value) {this.muteAudio.next(value)};
  
  get getMuteVideo() { return this.muteVideo};
  set setMuteVideo(value) {this.muteVideo.next(value)};
  ngOnDestroy(): void {
    if (this.roomBroadcast) {
      this.roomBroadcast.unsubscribe();
    }
  }

  private async getAuthToken(participantName: string) {
    const auth =
      await this.http
        .get<AuthToken>(this.baseUri + `twilio/token?username=${participantName}`)
        .toPromise();

    return auth.token;
  }

  getAllRooms() {
    return this.http
      .get<Rooms>(this.baseUri + 'twilio/rooms')
      .toPromise();
  }

  joinRooms(joinId: any) {
    return this.http
      .get<Rooms>(this.baseUri + `twilio/rooms?joinId=${encodeURIComponent(joinId)}`)
      .toPromise();
  }

  cancelRoom(roomSid: string) {
    return this.http.get<Rooms>(this.baseUri + `twilio/cancel?roomSid=${encodeURIComponent(roomSid)}`)
  }

  async joinOrCreateRoom(participantName: string, name: string, tracks: LocalTrack[]) {
    let room: Room = null;
    try {
      ;
      const token = await this.getAuthToken(participantName);
      room =
        await connect(
          token, {
            name,
            tracks,
            dominantSpeaker: true
          } as ConnectOptions);
      ;
    } catch (error) {
      console.error(`Unable to connect to Room: ${error.message}`);
    } finally {
      if (room) {
        this.roomBroadcast.next(true);
      }
    }
    return room;
  }

  nudge() {
    this.roomBroadcast.next(true);
  }
}

export class MuteUnmuteOptions {
  audio: boolean;
  video: boolean;
  constructor() {
    this.audio = false;
    this.video = false;
  }
}

export class RoomsStatusRequest {
  CompanyId: string;
  ObjectId: string;
  RefId: string;
  ParticipantName: string;
  ParticipantIdentity: string;
  ParticipantSid: string;
}

export class TwilioVideoCall {
  id: number;
  roomId: string;
  roomName: string;
  refId: number;
  objectName: string;
  joinId: string;
  participants: TwilioVideoCallParticipants[];
  constructor() {
    this.id = null;
    this.roomId = null;
    this.roomName = null;
    this.refId = null;
    this.objectName = null;
    this.joinId = null;
    this.participants = [];
  }
}
export class TwilioVideoCallParticipants {
  id: string
  identity: string;
  constructor() {
    this.id = null;
    this.identity = null;
  }
}
