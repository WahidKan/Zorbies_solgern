import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { createLocalVideoTrack, LocalVideoTrack, RemoteVideoTrack } from 'twilio-video';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { StorageService } from '../storage.service';
import { VideoChatService } from '../videochat.service';

@Component({
    selector: 'app-camera',
    styleUrls: ['./camera.component.css'],
    templateUrl: './camera.component.html',
})
export class CameraComponent implements AfterViewInit {
    @ViewChild('preview', { static: false }) previewElement: ElementRef;
    @ViewChild('nocamera', { static: false }) noCameraElement: ElementRef;
    @Output('leaveRoom') leaveRoom = new EventEmitter<boolean>();
    @Input('isOwner') isOwner: boolean;
    @Input('userName') userName: string;
    isInitializing: boolean = true;
    videoTrack: LocalVideoTrack = null;
    remoteVideoTrack: RemoteVideoTrack = null;
    isCameraFound: boolean = false;
    isAudioMuted: boolean = false;
    isVideoMuted: boolean = false;

    constructor(
        private readonly storageService: StorageService,
        private readonly renderer: Renderer2,
        private readonly videoService: VideoChatService,
        private dialogService: ConfirmationDialogService,
        private toaster: ToastrService) { }

    async ngAfterViewInit() {
        ;
        if (this.previewElement && this.previewElement.nativeElement) {
            
            const selectedVideoInput = this.storageService.get('videoInputId');
            if (selectedVideoInput) {
                await this.initializeDevice(selectedVideoInput);
            } else {
                await this.initializeDevice();
                // console.log("No camera found");
            }

        }
    }

    async initializePreview(deviceId: string) {
        
        await this.initializeDevice(deviceId);
    }

    finalizePreview() {
        try {
            
            if (this.videoTrack) {
                //  this.videoTrack.stop();
                this.videoTrack.detach().forEach(element => element.remove());
            }
            this.videoTrack = null;
        } catch (e) {
            // console.log("no camera found ==>")
            console.error(e);
        }
    }
    MuteAudio() {
        this.isAudioMuted = !this.isAudioMuted;
        this.videoService.setMuteAudio = this.isAudioMuted;
        const message = `You are ${this.isAudioMuted ? 'mute' : 'unmute'} now.`;
        this.toaster.success(message);
    }
    MuteVideo() {
        this.isVideoMuted = !this.isVideoMuted;
        this.videoService.setMuteVideo = this.isVideoMuted;
        const message = `Your video is ${this.isVideoMuted ? 'off' : 'on'} now.`;
        this.toaster.success(message);
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
            this.renderer.setStyle(videoElement, 'object-fit', 'fill');
            this.renderer.setStyle(videoElement, 'border', '1px solid #fff');
            this.renderer.appendChild(this.previewElement.nativeElement, videoElement);
            this.isCameraFound = true;
        } catch (e) {
            // console.log("No camera found-------");
        }
        finally {
            this.isInitializing = false;
        }
    }
    onLeaveRoom(event) {
        const message = `Are you sure you want to leave the group?`;
        this.dialogService.confirm('LEAVE GROUP', message).subscribe(async confirmed => {
            if (confirmed) {
                this.leaveRoom.emit(true);
            }
        });

    }
}
