import {
    Component,
    ViewChild,
    ElementRef,
    Output,
    Input,
    EventEmitter,
    Renderer2,
    OnInit
} from '@angular/core';
import {
    Participant,
    RemoteTrack,
    RemoteAudioTrack,
    RemoteVideoTrack,
    RemoteParticipant,
    RemoteTrackPublication,
    Room
} from 'twilio-video';
import { VideoChatService } from '../videochat.service';

@Component({
    selector: 'app-participants',
    styleUrls: ['./participants.component.css'],
    templateUrl: './participants.component.html',
})
export class ParticipantsComponent implements OnInit {
    @ViewChild('list', { static: false }) listRef: ElementRef;
    @Output('participantsChanged') participantsChanged = new EventEmitter<boolean>();
    @Output('leaveRoom') leaveRoom = new EventEmitter<boolean>();
    @Input('activeRoomName') activeRoomName: string;
    @Input('isOwner') isOwner: boolean;
    @Input('userName') userName: string;
    @Input('isFull') isFull: boolean;
    @Input('activeRoom') activeRoom: Room;
    isRoomActive: boolean = true;
    _participantCount = 0;
    get participantCount() {
        return this._participantCount;
    }

    get isAlone() {
        // if(this.participants)
        //     // console.log(this.participants.size,this.participantCount,this.activeRoom)
        return (this.participants != null ? this.participants.size : 0) == 0 || this.activeRoom.state == 'disconnected';
    }

    private participants: Map<Participant.SID, RemoteParticipant>;
    private dominantSpeaker: RemoteParticipant;

    constructor(private readonly renderer: Renderer2, private readonly videoCallService: VideoChatService) { }
    ngOnInit(): void {
        this.videoCallService.getIsCallEnded.subscribe(result => {
            if (!result) {
                this.isRoomActive = result;
            }
        });
    }

    clear() {
        if (this.participants) {
            this.participants.clear();
        }
    }
    getParticipantsCount() {
        return this.participantCount;
    }
    initialize(participants: Map<Participant.SID, RemoteParticipant>) {
        this.participants = participants;
        this._participantCount = !!this.participants ? this.participants.size : 0;
        if (this.participants) {
            this.participants.forEach(participant => this.registerParticipantEvents(participant));
        }
        // console.log("part=>", this.participants);
    }

    add(participant: RemoteParticipant) {

        if (this.participants && participant) {
            this.participants.set(participant.sid, participant);
            this.registerParticipantEvents(participant);
            this._participantCount = !!this.participants ? this.participants.size : 0;
        }
    }

    remove(participant: RemoteParticipant) {
        if (this.participants && this.participants.has(participant.sid)) {
            participant.tracks.clear();
            this.participants.delete(participant.sid);
            this._participantCount = !!this.participants ? this.participants.size : 0;
        }
    }

    loudest(participant: RemoteParticipant) {
        this.dominantSpeaker = participant;
    }

    onLeaveRoom(event) {
        ;
        this.leaveRoom.emit(true);
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

            const container = this.renderer.createElement('div');
            this.renderer.setStyle(element, 'object-fit', 'fill');
            this.renderer.appendChild(container, element);
            this.renderer.addClass(container, 'video-container')
            const d2 = this.renderer.createElement('h4');
            this.renderer.addClass(d2, "video-title");
            this.renderer.addClass(element, "video-component");
            if (track.kind == 'video') {

                if (participant.state == "connected" && participant.videoTracks != null) {
                    const text = this.renderer.createText(participant.identity);
                    this.renderer.appendChild(d2, text);
                    this.renderer.setStyle(d2, 'color', 'white');
                    this.renderer.appendChild(container, d2);
                }
                this.renderer.appendChild(this.listRef.nativeElement, container);
            }else{

            }
            this.participantsChanged.emit(true);         
        }
    }

    private detachRemoteTrack(track: RemoteTrack, participant: RemoteParticipant) {
        if (this.isDetachable(track)) {
            track.detach().forEach(el => {
                if (el.tagName.toLowerCase() == 'video')
                    el.parentElement.remove()
                else
                    el.remove()
            });
            this.participantsChanged.emit(true);
        }
    }

    private isAttachable(track: RemoteTrack): track is RemoteAudioTrack | RemoteVideoTrack {
        return !!track &&
            ((track as RemoteAudioTrack).attach !== undefined ||
                (track as RemoteVideoTrack).attach !== undefined);
    }

    private isDetachable(track: RemoteTrack): track is RemoteAudioTrack | RemoteVideoTrack {
        return !!track &&
            ((track as RemoteAudioTrack).detach !== undefined ||
                (track as RemoteVideoTrack).detach !== undefined);
    }
}
