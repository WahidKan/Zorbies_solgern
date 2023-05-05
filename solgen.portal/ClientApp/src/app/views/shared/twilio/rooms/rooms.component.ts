import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debug } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NamedRoom, VideoChatService } from '../videochat.service';


@Component({
  selector: 'app-rooms',
  styleUrls: ['./rooms.component.css'],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit, OnDestroy {
  @Output() roomChanged = new EventEmitter<string>();
  @Output() participantCount = new EventEmitter<number>();
  @Input() activeRoomName: string;
  @Input() defaultRoom: string;
  @Input() createRoom: string;
  @Input() isOwner: boolean;

  roomName: string;
  rooms: NamedRoom[];
  join: boolean = false;
  joinId: any;
  public baseUri = location.origin;

  private subscription: Subscription;

  constructor(
    private readonly videoChatService: VideoChatService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {

  }

  async ngOnInit() {
    ;
    this.route.queryParams.subscribe(params => {
      this.joinId = params['joinId'];
      if (this.joinId) {
        this.join = true;
      }
    })
    if (this.join) {
      await this.getRooms(this.joinId);
      this.subscription =
        this.videoChatService
          .$roomsUpdated
          .pipe(tap(_ => this.getRooms(this.joinId)))
          .subscribe();
    }
    else {
      await this.updateRooms();
      this.subscription =
        this.videoChatService
          .$roomsUpdated
          .pipe(tap(_ => this.updateRooms()))
          .subscribe();
          if (this.rooms == undefined || this.rooms.filter(x=>x.name== this.defaultRoom || x.name==this.roomName).length == 0) {
        setTimeout(() => {
          this.onAddRoom(this.defaultRoom);
        }, 1000);
      }
    }

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTryAddRoom() {
    if (this.roomName) {
      this.onAddRoom(this.roomName);
    }
  }

  onAddRoom(roomName: string) {
    this.roomName = null;
    this.roomChanged.emit(roomName);
  }

  onJoinRoom(roomName: string) {
    ;
    this.roomChanged.emit(roomName);
  }

  async updateRooms() {
    this.rooms = (await this.videoChatService.getAllRooms()) as NamedRoom[];
    // console.log("Rooms", this.rooms);
  }

  async getRooms(joinId: any) {
    // this.rooms : NamedRoom[];
    this.rooms = await this.videoChatService.joinRooms(joinId);
    return this.rooms;

  }
  filterRooms() {
    if (this.rooms != undefined && this.rooms.length > 0) {
      if (this.rooms.find(x => x.name == this.activeRoomName)) {
        this.participantCount.emit(this.rooms.find(x => x.name == this.activeRoomName).participantCount);
      }
      return this.rooms.filter(x => x.name == this.activeRoomName);

    } else {
      return [];
    }

  }
  filterRoomJoiningLink() {
    if (this.rooms != undefined && this.rooms.length > 0) {
      if (this.rooms.find(x => x.name == this.activeRoomName)) {
        return this.rooms.find(x => x.name == this.activeRoomName).id;
      } else {
        return "";
      }
    } else {
      return "";
    }

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
      this.toaster.success("Link Copied")
    }

  }
}
