import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room, createLocalAudioTrack, RemoteParticipant, LocalTrack, LocalAudioTrack, LocalVideoTrack } from 'twilio-video';
import { debounce } from 'underscore';
import { CommonService } from '../shared/common.service';
import { CameraComponent } from '../shared/twilio/camera/camera.component';
import { ParticipantsComponent } from '../shared/twilio/participants/participants.component';
import { RoomsComponent } from '../shared/twilio/rooms/rooms.component';
import { SettingsComponent } from '../shared/twilio/settings/settings.component';
import { MuteUnmuteOptions, NamedRoom, RoomsStatusRequest, VideoChatService } from '../shared/twilio/videochat.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent implements AfterViewInit {
  @ViewChild('videoModal', { static: false }) videoModal: ModalDirective;
  @ViewChild('rooms', { static: false }) rooms: RoomsComponent;
  @ViewChild('camera', { static: false }) camera: CameraComponent;
  @ViewChild('settings', { static: false }) settings: SettingsComponent;
  @ViewChild('participants', { static: false }) participants: ParticipantsComponent;
  @ViewChild('CallUserModal', { static: true }) CallUserModal: ModalDirective;
  @ViewChild('IsFullOrNonActive', { static: true }) IsFullOrNonActive: ModalDirective;
  createRoom: boolean = true;
  phoneNo: string = '';
  roomsList : NamedRoom[];
  activeRoom: Room;
  loadSave: false;
  joinId: any;
  roomName: any;
  blnMuteVideo: boolean = false;
  blnMuteAudio: boolean = false;
  isFull: boolean = false;
  username = "";
  blnUserNameSelect: boolean = false;
  private notificationHub: HubConnection;
  participantCount: number;
  isActiveRoom : boolean = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private commonService: CommonService,
    private readonly videoChatService: VideoChatService,
    private route: ActivatedRoute, private toaster: ToastrService) {

  }
  async ngAfterViewInit() {
    this.videoChatService.getMuteVideo.subscribe(result => {
      const param = new MuteUnmuteOptions();
      param.video = true;
      if (result) {
        this.mute(param);
      } else {
        this.unmute(param);
      }
    });
    this.videoChatService.getMuteAudio.subscribe(result => {
      const param = new MuteUnmuteOptions();
      param.audio = true;
      if (result) {
        this.mute(param);
      } else {
        this.unmute(param);
      }
    });
    this.route.queryParams.subscribe(params => {
      this.joinId = params['joinId'];
    });
    this.getRooms(this.joinId).then(async (arg: any) => {
      if(arg.length > 0){
        if(arg[0].isActive){
          if(arg[0].participantCount <= 3){
            if (!this.blnUserNameSelect) {
              setTimeout(() => {
                this.CallUserModal.show();
              });
            } else {
              await this.createRooms();
            }
          }else{
            this.isActiveRoom = true;
            this.isFull = true;
            setTimeout(() => {
              this.IsFullOrNonActive.show();
            });
          }
        }else{
          this.isFull = false;
          this.isActiveRoom = false;
          setTimeout(() => {
            this.IsFullOrNonActive.show();
          });
        }
      }else{
        this.isActiveRoom = false;
        setTimeout(() => {
          this.IsFullOrNonActive.show();
        });
      }
    });
  }
  close(){
    let wind = window.open('', '_self')
    wind.close();
    window.history.go(-1);
  }
  async save() {
    if (this.username.length < 1 || this.username == undefined)
      return
    this.blnUserNameSelect = true;
    this.CallUserModal.hide();
    setTimeout(async () => {
      await this.createRooms();
    }, 100);
  }
  async getRooms(joinId: any) {
    this.roomsList = await this.videoChatService.joinRooms(joinId);
    return this.roomsList;

  }
  async createRooms() {
    this.rooms.getRooms(this.joinId).then(async (arg: any) => {
      ;
      if (arg.length > 0) {
        if (arg[0].participantCount <= 3 && arg[0].isActive) {
          await this.addParticipant(arg[0].name);
        } else {
          this.isFull = true;
          this.toaster.success("Room is already full!");
        }
      } else {
        this.toaster.success("Something went wrong while joining. Please reload the page.");
      }
    });
  }
  async addParticipant(name : string){
    this.onRoomChanged(name);
    const builder =
      new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withUrl(`${location.origin}/notificationHub`);
    this.notificationHub = builder.build();
    this.notificationHub.on('RoomsUpdated', async updated => {
      if (updated) {
        await this.rooms.getRooms(this.joinId);
      }
    });
    await this.notificationHub.start();
  }
  getParticipantsCount(count: number) {
    if (count) {
      this.participantCount = count;
    }
  }
  async onSettingsChanged(deviceInfo?: MediaDeviceInfo) {
    await this.camera.initializePreview(deviceInfo.deviceId);
    if (this.settings.isPreviewing) {
      const track = await this.settings.showPreviewCamera();
      if (this.activeRoom) {
        this.username = this.activeRoom.localParticipant.identity;
        const localParticipant = this.activeRoom.localParticipant;
        localParticipant.videoTracks.forEach(publication => publication.unpublish());
        await localParticipant.publishTrack(track);
      }
    }
  }

  async onLeaveRoom(_: boolean) {
    if (this.activeRoom) {
      this.activeRoom.disconnect();
      this.activeRoom = null;
    }
    const videoDevice = this.settings.hidePreviewCamera();
    await this.camera.initializePreview(videoDevice && videoDevice.deviceId);
    this.participants.clear();
    let wind = window.open('', '_self')
    wind.close();
    window.history.go(-1);
  }

  async onRoomChanged(roomName: string) {
    ;
    if (roomName) {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
      }
      const tracks = await Promise.all([
        createLocalAudioTrack(),
        this.settings.showPreviewCamera()
      ]);
      if (tracks[1]) {
        this.activeRoom =
          await this.videoChatService
            .joinOrCreateRoom(this.username, roomName, tracks);
        if (this.activeRoom) {
          this.participants.initialize(this.activeRoom.participants);
          // console.log("Active room after join in client side", this.activeRoom);
          this.registerRoomEvents();
          this.notificationHub.send('RoomsUpdated', true);
        } else {
          this.toaster.success("No active room found. Please reload the page.");
        }
      } else {
        this.toaster.success("Unable to create video tracks. Camera is already in use by other application.");
      }

    }
  }

  onParticipantsChanged(event) {
    this.videoChatService.nudge();
  }

  private registerRoomEvents() {
    ;
    this.activeRoom
      .on('disconnected',
        (room: Room) => room.localParticipant.tracks.forEach(publication => this.detachLocalTrack(publication.track)))
      .on('participantConnected',
        (participant: RemoteParticipant) => this.participants.add(participant))
      .on('participantDisconnected',
        (participant: RemoteParticipant) => this.participants.remove(participant))
      .on('dominantSpeakerChanged',
        (dominantSpeaker: RemoteParticipant) => this.participants.loudest(dominantSpeaker));
  }

  private detachLocalTrack(track: LocalTrack) {
    if (this.isDetachable(track)) {
      track.detach().forEach(el => el.remove());
    }
  }

  private isDetachable(track: LocalTrack): track is LocalAudioTrack | LocalVideoTrack {
    return !!track
      && ((track as LocalAudioTrack).detach !== undefined
        || (track as LocalVideoTrack).detach !== undefined);
  }
  // MuteAudio() {
  //   this.blnMuteAudio = !this.blnMuteAudio;
  //   const param = new MuteUnmuteOptions();
  //   param.audio = true;
  //   if (this.blnMuteAudio) {
  //     this.mute(param);
  //   } else {
  //     this.unmute(param);
  //   }
  // }
  // MuteVideo() {
  //   this.blnMuteVideo = !this.blnMuteVideo;
  //   const param = new MuteUnmuteOptions();
  //   param.video = true;
  //   if (this.blnMuteVideo) {
  //     this.mute(param);
  //   } else {
  //     this.unmute(param);
  //   }
  // }

  /**
 * Mutes the local participant's tracks based on the specified options.
 * 
 * @param opts
 * Specifies which kind of tracks to mute.
 */
  mute(opts: MuteUnmuteOptions) {
    if (!this.activeRoom || !this.activeRoom.localParticipant)
      throw new Error('You must be connected to a room to mute tracks.');

    if (opts.audio) {
      this.activeRoom.localParticipant.audioTracks.forEach(
        publication => publication.track.disable()
      );
    }

    if (opts.video) {
      this.activeRoom.localParticipant.videoTracks.forEach(
        publication => publication.track.disable()
      );
    }
  }
  /**
   * Unmutes the local participant's tracks based on the specified options.
   * 
   * @param opts
   * Specifies which kind of tracks to unmute.
   */
  unmute(opts: MuteUnmuteOptions) {
    if (!this.activeRoom || !this.activeRoom.localParticipant)
      throw new Error('You must be connected to a room to unmute tracks.');

    if (opts.audio) {
      this.activeRoom.localParticipant.audioTracks.forEach(
        publication => publication.track.enable()
      );
    }

    if (opts.video) {
      this.activeRoom.localParticipant.videoTracks.forEach(
        publication => publication.track.enable()
      );
    }
  }
}
