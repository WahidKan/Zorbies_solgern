import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { NamedRoom, VideoChatService } from '../videochat.service';
import { ModalDirective } from 'ngx-bootstrap/modal'
import { createLocalAudioTrack, createLocalVideoTrack, LocalAudioTrack, LocalTrack, LocalVideoTrack, Participant, RemoteAudioTrack, RemoteParticipant, RemoteTrack, RemoteTrackPublication, RemoteVideoTrack, Room } from 'twilio-video';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs-compat/Subscription';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss']
})
export class VideocallComponent implements OnInit, AfterViewInit {

  @ViewChild('videoModal', { static: false }) videoModal: ModalDirective;
  @ViewChild('preview', { static: false }) previewElement: ElementRef;
  @ViewChild('nocamera', { static: false }) noCameraElement: ElementRef;
  private devices: MediaDeviceInfo[] = [];
  videoChat: ViewContainerRef;
  cmpRef: ComponentRef<VideocallComponent>;
  loadSave: boolean = false;
  isInitializing: boolean = true;
  videoTrack: LocalVideoTrack = null;
  isCameraFound: boolean = false;
  public baseUri = location.origin;
  private subscription: Subscription;
  private videoDeviceId: string;
  //rooms declare
  rooms: NamedRoom[];
  activeRoom: Room;
  private participants: Map<Participant.SID, RemoteParticipant>;
  userName: string;
  roomName: string;
  isOwner: boolean;
  isAlone: boolean;
  selectedId: string;
  private dominantSpeaker: RemoteParticipant;
  @ViewChild('list', { static: false }) listRef: ElementRef;
  private notificationHub: HubConnection;
  isPreviewing: boolean;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private dialogService: ConfirmationDialogService,
    private readonly storageService: StorageService,
    private readonly renderer: Renderer2,
    private readonly videoChatService: VideoChatService) { }
  async ngAfterViewInit() {
    if (this.previewElement && this.previewElement.nativeElement) {
      
      const selectedVideoInput = this.storageService.get('videoInputId');
      if (selectedVideoInput) {
        await this.initializeDevice(selectedVideoInput);
      } else {
        // console.log("No camera found");
      }
    }
  }

  async ngOnInit() {
    this.userName = "fafibutt";
    this.roomName = Date.now().toString();
    this.isOwner = true;
    const builder =
      new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withUrl(`${location.origin}/notificationHub`);
    this.notificationHub = builder.build();
    
    this.notificationHub.on('RoomsUpdated', async updated => {
      if (updated) {
        await this.updateRooms();
      }
    });
    await this.notificationHub.start();
    await this.updateRooms();
    this.subscription =
      this.videoChatService
        .$roomsUpdated
        .pipe(tap(_ => this.updateRooms()))
        .subscribe();
    if (this.rooms == undefined || this.rooms.length == 0) {
      setTimeout(() => {
        this.onAddRoom(!!this.activeRoom ? this.activeRoom.name : this.roomName);
      }, 1000);
    }
  }
  onAddRoom(roomName: string) {
    this.roomName = null;
    this.onRoomChanged(roomName);
  }
  async onRoomChanged(roomName: string) {
    ;
    if (roomName) {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
      }

      // this.camera.finalizePreview();

      const tracks = await Promise.all([
        createLocalAudioTrack(),
        this.showPreviewCamera()
      ]);

      ;
      this.activeRoom =
        await this.videoChatService
          .joinOrCreateRoom(null, roomName, tracks);
      ;
      this.initialize(this.activeRoom.participants);
      this.registerRoomEvents();
      // console.log("participants", this.participants);
      this.notificationHub.send('RoomsUpdated', true);
    }
  }
  async showPreviewCamera() {
    this.isPreviewing = true;
    ;
    if (!this.videoTrack || this.videoDeviceId !== this.selectedId) {
      this.videoDeviceId = this.selectedId;
      const videoDevice = this.devices.find(d => d.deviceId === this.selectedId);
      await this.initializePreview(videoDevice.deviceId);
    }

    return this.videoTrack;
  }
  async initializePreview(deviceId: string) {
    
    await this.initializeDevice(deviceId);
  }
  hidePreviewCamera() {
    this.isPreviewing = false;
    this.finalizePreview();
    return this.devices.find(d => d.deviceId === this.selectedId);
  }

  private handleDeviceAvailabilityChanges() {
    if (this.devices && this.devices.length && this.selectedId) {
      let videoDevice = this.devices.find(d => d.deviceId === this.selectedId);
      if (!videoDevice) {
        videoDevice = this.devices.find(d => d.kind === 'videoinput');
        if (videoDevice) {
          this.selectedId = videoDevice.deviceId;
          this.onSettingsChanged(videoDevice);
        }
      }
    }
  }
  async onSettingsChanged(deviceInfo: MediaDeviceInfo) {
    ;
    this.onSettingsChanged(deviceInfo);
  }
  initialize(participants: Map<Participant.SID, RemoteParticipant>) {
    this.participants = participants;
    if (this.participants) {
      this.participants.forEach(participant => this.registerParticipantEvents(participant));
    }
    // console.log("part=>", this.participants);
  }
  private registerParticipantEvents(participant: RemoteParticipant) {
    if (participant) {
      participant.tracks.forEach(publication => this.subscribe(publication, participant));
      participant.on('trackPublished', publication => this.subscribe(publication, participant));
      participant.on('trackUnpublished',
        publication => {
          if (publication && publication.track) {
            this.detachRemoteTrack(publication.track, participant);
          }
        });
    }
  }

  private subscribe(publication: RemoteTrackPublication | any, participant: RemoteParticipant) {
    if (publication && publication.on) {
      publication.on('subscribed', (track: RemoteTrack) => this.attachRemoteTrack(track, participant));
      publication.on('unsubscribed', (track: RemoteTrack) => this.detachRemoteTrack(track, participant));
    }
  }

  private attachRemoteTrack(track: RemoteTrack, participant: RemoteParticipant) {
    if (this.isAttachable(track)) {
      const element = track.attach();
      this.renderer.data.id = track.sid;
      this.renderer.setStyle(element, 'height', '100%');
      this.renderer.setStyle(element, 'width', '100%');
      this.renderer.appendChild(this.listRef.nativeElement, element);
      this.onParticipantsChanged(true);
    }
  }

  private detachRemoteTrack(track: RemoteTrack, participant: RemoteParticipant) {
    if (this.isRemoteDetachable(track)) {
      track.detach().forEach(el => el.remove());
      this.onParticipantsChanged(true);
    }
  }
  onParticipantsChanged(_: boolean) {
    this.videoChatService.nudge();
  }
  private isAttachable(track: RemoteTrack): track is RemoteAudioTrack | RemoteVideoTrack {
    return !!track &&
      ((track as RemoteAudioTrack).attach !== undefined ||
        (track as RemoteVideoTrack).attach !== undefined);
  }

  async updateRooms() {
    
    this.rooms = (await this.videoChatService.getAllRooms()) as NamedRoom[];
    // console.log("Rooms", this.rooms);
  }
  remove(participant: RemoteParticipant) {
    if (this.participants && this.participants.has(participant.sid)) {
      this.participants.delete(participant.sid);
    }
  }
  private registerRoomEvents() {
    ;
    this.activeRoom
      .on('disconnected',
        (room: Room) => room.localParticipant.tracks.forEach(publication => this.detachLocalTrack(publication.track)))
      .on('participantConnected',
        (participant: RemoteParticipant) => this.add(participant))
      .on('participantDisconnected',
        (participant: RemoteParticipant) => this.remove(participant))
      .on('dominantSpeakerChanged',
        (dominantSpeaker: RemoteParticipant) => this.loudest(dominantSpeaker));
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
  add(participant: RemoteParticipant) {
    if (this.participants && participant) {
      this.participants.set(participant.sid, participant);
      this.registerParticipantEvents(participant);
    }
  }
  private isRemoteDetachable(track: RemoteTrack): track is RemoteAudioTrack | RemoteVideoTrack {
    return !!track &&
      ((track as RemoteAudioTrack).detach !== undefined ||
        (track as RemoteVideoTrack).detach !== undefined);
  }
  loudest(participant: RemoteParticipant) {
    this.dominantSpeaker = participant;
  }
  CopyLink(e) {
    
    if (e) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = e.value;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }

  }
  private async initializeDevice(deviceId?: string) {
    try {
      
      this.isInitializing = true;

      this.finalizePreview();

      this.videoTrack = deviceId
        ? await createLocalVideoTrack({ deviceId })
        : await createLocalVideoTrack();

      const videoElement = this.videoTrack.attach();
      this.renderer.setStyle(videoElement, 'height', '100%');
      this.renderer.setStyle(videoElement, 'width', '100%');
      this.renderer.appendChild(this.previewElement.nativeElement, videoElement);
      this.isCameraFound = true;
    } catch (e) {
      // console.log("No camera found-------");
    }
    finally {
      this.isInitializing = false;
    }
  }
  finalizePreview() {
    try {
      
      if (this.videoTrack) {
        this.videoTrack.detach().forEach(element => element.remove());
      }
      this.videoTrack = null;
    } catch (e) {
      // console.log("no camera found ==>")
      console.error(e);
    }
  }
  close() {
    ;
    if (this.rooms.length > 0) {
      const message = `Are you sure you want to end the video call?`;
      this.dialogService.confirm('End Video Call', message).subscribe(confirmed => {
        if (confirmed) {
          this.videoChatService.cancelRoom(this.rooms[0].id).subscribe(result => {
            if (result) {
              this.autoDestroy();
              this.videoModal.hide();
            }
          });
        }
      });
    } else {
      this.videoModal.hide();
    }
  }
  show() {
    ;
    setTimeout(() => {
      this.videoModal.show();
    }, 1000);
  }
  autoDestroy(): void {
    ;
    //this.camera.finalizePreview();
    // let componentFactory: ComponentFactory<any>;
    // componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideocallComponent);
    // var videoRef = this.videoChat.createComponent(componentFactory);
    // if (videoRef) {
    //   videoRef.destroy();
    // }
  }
}
