import { Component, ViewChild, OnInit, Input, OnDestroy, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from '@angular/core';
import { createLocalAudioTrack, Room, LocalTrack, LocalVideoTrack, LocalAudioTrack, RemoteParticipant } from 'twilio-video';
import { CameraComponent } from '../camera/camera.component';
import { SettingsComponent } from '../settings/settings.component';
import { ParticipantsComponent } from '../participants/participants.component';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { RoomsComponent } from '../rooms/rooms.component';
import { MuteUnmuteOptions, RoomsStatusRequest, TwilioVideoCall, TwilioVideoCallParticipants, VideoChatService } from '../videochat.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VideoChatComponent } from 'src/app/views/video-chat/video-chat.component';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../../common.service';
import { ActivatedRoute } from '@angular/router';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { Console } from 'console';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild("videoChat", { read: ViewContainerRef, static: true })
  videoChat: ViewContainerRef;
  @ViewChild('videoModal', { static: false }) videoModal: ModalDirective;
  @ViewChild('rooms', { static: false }) rooms: RoomsComponent;
  @ViewChild('camera', { static: false }) camera: CameraComponent;
  @ViewChild('settings', { static: false }) settings: SettingsComponent;
  @ViewChild('participants', { static: false }) participants: ParticipantsComponent;
  cmpRef: ComponentRef<HomeComponent>;

  createRoom: boolean = true;
  phoneNo: string = '';
  roomName: string = null;
  twilioVideoCallModel: TwilioVideoCall;
  activeRoom: Room;
  loadSave: false;
  userName: string;
  headeruserid: string;
  companyLogo: string;
  participantCount: number;
  subModuleCodeName: string;
  refId: number;


  private notificationHub: HubConnection;
  blnMuteVideo: boolean;
  blnMuteAudio: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogService: ConfirmationDialogService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private readonly videoChatService: VideoChatService) { }

  async ngOnInit() {
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
    if (this.activatedRoute && this.activatedRoute.firstChild && this.activatedRoute.firstChild.data) {
      var routeSubModuleCode: any = this.activatedRoute.firstChild.data;
      // console.log(this.subModuleCodeName);
      if (routeSubModuleCode._value) {
        this.subModuleCodeName = routeSubModuleCode._value.subModuleCodeName;
        // console.log("sub module name ==>", this.subModuleCodeName);
        if (this.activatedRoute.firstChild.snapshot.firstChild.params) {
          var routeObjId: any = this.activatedRoute.firstChild.snapshot.firstChild.params;
          this.refId = routeObjId.id;
          // console.log("ref id ==>", this.refId);
        }
      }
    }
    this.commonService.getLoggedInName.subscribe((user: any) => {
      this.headeruserid = user.id;
      this.GeHeaderCompanyList();
    });
    this.roomName = Date.now().toString();
    const builder =
      new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withUrl(`${location.origin}/notificationHub`);

    this.notificationHub = builder.build();
    this.notificationHub.on('RoomsUpdated', async updated => {
      if (updated) {
        // console.log("room update");
        await this.rooms.updateRooms();
      }
    });
    await this.notificationHub.start();
    // if(this.createRoom)
    // {
    //   setTimeout(() => {
    //     this.rooms.onAddRoom("Video Chat");
    //   });
    // }
  }
  GeHeaderCompanyList() {
    this.commonService.GeHeaderCompanyList(this.headeruserid).subscribe((data: any) => {
      this.companyLogo = data[0].CompanyLogo.replace("UserProfilePick", "UserProfilePick\\");
    });
  }
  async onSettingsChanged(deviceInfo?: MediaDeviceInfo) {
    await this.camera.initializePreview(deviceInfo.deviceId);
    if (this.settings.isPreviewing) {

      const track = await this.settings.showPreviewCamera();
      if (this.activeRoom) {
        const localParticipant = this.activeRoom.localParticipant;
        localParticipant.videoTracks.forEach(publication => publication.unpublish());
        await localParticipant.publishTrack(track);
      }
    }
  }

  async onLeaveRoom(event) {
    if (this.activeRoom) {
      this.activeRoom.disconnect();
      this.activeRoom = null;
    }
    const videoDevice = this.settings.hidePreviewCamera();
    await this.camera.initializePreview(videoDevice && videoDevice.deviceId);
    this.participants.clear();
  }

  getParticipantsCount(count: number) {
    if (count) {
      this.participantCount = count;
    }
  }
  async onRoomChanged(roomName: string) {
    if (roomName) {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
      }
      const tracks = await Promise.all([
        createLocalAudioTrack(),
        this.settings.showPreviewCamera()
      ]);
      if (tracks) {
        let userinfo: any = localStorage.getItem('userinfo');
        let participantName = '';
        let companyId = '';
        if (userinfo && userinfo != '') {
          userinfo = JSON.parse(userinfo);
          participantName = userinfo.firstName + ' ' + userinfo.lastName;
          companyId = userinfo.companyId;
        }

        this.activeRoom =
          await this.videoChatService
            .joinOrCreateRoom(participantName, roomName, tracks);
        if (this.activeRoom) {
          this.userName = this.activeRoom.localParticipant.identity;
          this.participants.initialize(this.activeRoom.participants);
          this.registerRoomEvents();
          this.twilioVideoCallModel = new TwilioVideoCall();
          this.twilioVideoCallModel.objectName = this.subModuleCodeName;
          this.twilioVideoCallModel.refId = this.refId;
          this.twilioVideoCallModel.roomName = this.activeRoom.name;
          this.twilioVideoCallModel.roomId = this.activeRoom.sid;
          this.twilioVideoCallModel.participants.push({ id: this.activeRoom.localParticipant.sid, identity: this.activeRoom.localParticipant.identity });
          this.notificationHub.send('RoomsUpdated', true);
          let updateRoom = new RoomsStatusRequest();
          let userinfo: any = localStorage.getItem('userinfo');
          let participantName = '';
          let companyId = '';
          if (userinfo && userinfo != '') {
            userinfo = JSON.parse(userinfo);
            participantName = userinfo.firstName + ' ' + userinfo.lastName;
            companyId = userinfo.companyId;
          }

          updateRoom.RefId = this.refId ? this.refId.toString() : "";
          updateRoom.ObjectId = this.subModuleCodeName;
          updateRoom.CompanyId = companyId;
          updateRoom.ParticipantName = participantName;
          updateRoom.ParticipantSid = this.activeRoom.localParticipant.sid;
          updateRoom.ParticipantIdentity = this.activeRoom.localParticipant.identity;
          ;
          this.commonService.roomStatusCallBack(updateRoom).subscribe(res => {

          });
        }
      } else {

      }
    } else {
      // console.log("No room found", roomName);
    }
  }

  onParticipantsChanged(_: boolean) {
    this.videoChatService.nudge();
  }

  private registerRoomEvents() {

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

  show() {

    setTimeout(() => {
      this.videoModal.show();
    }, 1000);
  }

  async close() {

    if (this.rooms.rooms && this.rooms.rooms.length > 0) {
      const message = `Are you sure you want to end the video call?`;
      this.dialogService.confirm('End Video Call', message).subscribe(confirmed => {
        if (confirmed) {
          this.videoChatService.cancelRoom(this.rooms.filterRoomJoiningLink()).subscribe(async (result :any)=> {
            if (result) {
              this.autoDestroy();
              this.videoModal.hide();
              this.videoChatService.setIsCallEnded = result.isActive;
              await this.rooms.updateRooms();
            }
          });
        }
      });
    } else {
      this.videoModal.hide();
    }
  }
  autoDestroy(): void {

    //this.camera.finalizePreview();
    let componentFactory: ComponentFactory<any>;
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomeComponent);
    var videoRef = this.videoChat.createComponent(componentFactory);
    if (videoRef) {
      videoRef.destroy();
    }
  }
  MuteAudio() {
    this.blnMuteAudio = !this.blnMuteAudio;
    const param = new MuteUnmuteOptions();
    param.audio = true;
    if (this.blnMuteAudio) {
      this.mute(param);
    } else {
      this.unmute(param);
    }
  }

  MuteVideo() {
    this.blnMuteVideo = !this.blnMuteVideo;
    const param = new MuteUnmuteOptions();
    param.video = true;
    if (this.blnMuteVideo) {
      this.mute(param);
    } else {
      this.unmute(param);
    }
  }
  RemoveVideo() {
    this.activeRoom.localParticipant.videoTracks.forEach((publication) => {
      publication.track.stop();
      const attachedElements = publication.track.detach();
      attachedElements.forEach(element => element.remove());
    });
  }
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
