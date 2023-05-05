import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, Output, EventEmitter, OnChanges, ComponentFactory, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Device } from 'twilio-client';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from '../../common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { TwilioService } from '../twilio.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { VideocallComponent } from '../videocall/videocall.component';


@Component({
  selector: 'app-voicecall',
  templateUrl: './voicecall.component.html',
  styleUrls: ['./voicecall.component.scss']
})

export class VoicecallComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild("videoChat", { read: ViewContainerRef, static: true })
  videoChat: ViewContainerRef;
  //@ViewChild('videoChat',{static:false}) videoChat: HomeComponent
  subscriber = new Subject()
  subscription: any;

  title = 'Solgen Dialer';
  toNumber = '+919541633512';
  fromNumber = '+16179256430';
  device = new Device();
  @Output() refreshParentEmitter = new EventEmitter();


  token: any;
  activeConnection: any;

  RecordingTime: number = 0;
  tick = 1000;

  preventSimpleClick = false;
  onCall = false;
  isOnMute = false;
  isOnHold = false;
  isRinging = false;
  isShowLogs = false; ///set it 'true' for debug mode
  //loadVideo = false;


  @ViewChild("voiceCallPopup", { static: false }) voiceCallModel: ModalDirective;
  @ViewChild("videocall", { static: false }) videocall: VideocallComponent;
  @ViewChild("btnCall", { static: false }) btnCall: ElementRef;
  @ViewChild("btnHangUp", { static: false }) btnHangUp: ElementRef;
  @ViewChild("btnClear", { static: false }) btnClear: ElementRef;
  @ViewChild("btnHold", { static: false }) btnHold: ElementRef;
  @ViewChild("btnMute", { static: false }) btnMute: ElementRef;

  //@Input("PhoneNo") Phone: string = '';
  //@Input("Default") IsDefault: boolean = false;;
  //@Input("columnName") columnName: string = '';
  //@Input("refTable") refTable: string = '';
  //@Input("refColumn") refColumn: string = '';
  //@Input("refId") refId: number;
  //@Input("primaryId") primaryId: number = 0;
  //@Input("Minimize") isDialerMinimize: boolean = false;;

  @Input() Default: boolean = true;
  @Input() CallOnLoad: boolean = false;
  @Input() PhoneNo: string = null;
  @Input("Minimize") isDialerMinimize: boolean = true;
  refTable = 'tblContacts';
  refColumn = 'AccountId';
  columnName = 'MobilePhone';
  @Input() RefId = '0';
  @Input() PrimaryId: number = 0;
  ObjectName : string = null;
  UserId: string = '';
  CompanyId: string = '';
  @Output() refreshParent : EventEmitter<boolean> ;
  countDown: Subscription;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private commanservice: CommonService, private twilioService: TwilioService,
    private toastr: ToastrService, private commonService: CommonService,
    private router: Router) {
  }

  ngOnInit() {
    this.RecordingTime = 0;
    //this.PhoneNo = this.IsDefault ? this.Phone : '';
    //;
    //if(this.activeConnection == null)
    //{
    //this.GenerateTwilioToken();
    //}
    if (!this.Default) {
      this.GetPhoneNumber();
    }

  }

  ngOnChanges() {
    if (this.CallOnLoad) {
      this.onCallClick();
    }
    if (!this.isDialerMinimize) {
      this.GenerateTwilioToken();
    }
    //if (!this.Default) {
    //  this.GetPhoneNumber();
    //}
  }

  ngOnDestroy() {
    if (this.countDown) {
      this.countDown.unsubscribe();
    }
    this.RecordingTime = 0;

    this.subscriber.next();
    this.subscriber.complete();
    this.Default = false;
  }

  // Function to start a call
  onCallClick(): any {
    if (this.PhoneNo) {
      this.isRinging = true;
      if (this.activeConnection == null) {
        this.log('Initiating the call');

        type parameterType = Record<string, string>;

        const params: parameterType = {
          To: this.PhoneNo,
          From: this.fromNumber,
          Caller: this.fromNumber,
          AccountId: String(this.RefId),
          CompanyId: String(this.CompanyId),
          UserId: String(this.UserId),
          ObjectName : String(this.ObjectName)
        };

        this.log('Calling ' + params.To + '...');

        this.activeConnection = this.device.connect(params);

        this.activeConnection.on("ringing", (conn) => {
          this.isRinging = true;
          this.log("phone is ringing.");
        });

        this.activeConnection.on("accept", (connection) => {
          this.RecordingTime = 0;
          this.onCall = true;
          this.countDown = this.twilioService.getCounter(this.tick)
            .pipe(takeUntil(this.subscriber))
            .subscribe(() => ++this.RecordingTime);

          this.log('Successfully established call!');
        });


        this.activeConnection.on("failed", (connection) => {
          this.RecordingTime = 0;
          this.onCall = false;
          this.isRinging = false;;

          if (this.countDown) {
            this.countDown.unsubscribe();
          }

          this.onHangUpClick();
          this.log('User busy.');
        });



      }
      else {
        //this.activeConnection = null;
        //this.device.disconnectAll();
      }
    }
    else {
      this.toastr.error("Phone Number should not be empty.");
    }
  }


  //getConnections() {
  //  this.commonService.hubConnection.off("voiceCallStatusToClient");
  //  this.commonService.hubConnection.on("voiceCallStatusToClient", (resp: any) => {
  //  });
  //}
  // Bind button to hangup call
  onHangUpClick(): any {
    this.log('Hanging up...');
    this.onCall = false;
    this.isRinging = false;

    this.activeConnection = null;

    this.device.disconnectAll();
    this.commanservice.setRefreshDailerCaller = true;
  }

  // Bind button to mute call
  OnMuteClick() {
    if (this.isOnMute) {
      this.isOnMute = false;
      this.device.activeConnection().unmute();
    }
    else {
      this.isOnMute = true;
      this.device.activeConnection().mute();
    }
  }

  // Bind button to hold call
  OnHoldClick() {
    if (this.isOnHold) {
      this.isOnHold = false;
      this.device.activeConnection().eventNames()
    }
    else {
      this.isOnHold = true;
    }
  }
  @ViewChild('log', { static: true }) logDiv: ElementRef;

  // Activity log
  log(message): any {
    if (this.isShowLogs) {
      const logDiv = document.getElementById('log');
      if (logDiv) {

        logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
        logDiv.scrollTop = logDiv.scrollHeight;
      }
    }
  }

  clearLogs() {

    if (this.isShowLogs) {
      const logDiv = document.getElementById('log');
      logDiv.innerHTML = '';
    }
  }

  onToggleClick() {
    this.isDialerMinimize = true;
    if (this.isDialerMinimize) {
      this.isDialerMinimize = false;
      if (!this.device.isInitialized) {
        //this.GenerateTwilioToken();
        this.voiceCallModel.show();
      }
    }
    else {
      this.isDialerMinimize = true;

      //this.onHangUpClick();
    }
  }

  GenerateTwilioToken() {
    this.clearLogs();

    this.commonService.getLoggedInName.pipe(takeUntil(this.subscriber)).subscribe((userdetail: any) => {
      this.UserId = userdetail.id;
      this.CompanyId = userdetail.companyId;
    });
    this.RecordingTime = 0;
    this.twilioService.GenerateTwilioCapabilityAccessToken().pipe(takeUntil(this.subscriber)).subscribe(result => {
      if (result) {
        if (result.statusCode == 200) {
          this.token = result.responseMessage;

          const options = { enableRingingState: true };
          this.device.setup(this.token, options);

          this.device.on('ready', client => {
            this.log('Device Ready!');
          });

          // this.device.on('error', error => {
          //   this.onHangUpClick();
          //   this.log('this.device Error: ' + error.message);
          //   if (error.message.includes("microphone")) {
          //     this.toastr.error("No microphone is connected with your device. Please connect microphone to dial a call.");
          //   }
          //   else {
          //     this.toastr.error("An application error occurred. Please try gain after some time.");
          //   }
          // });

          this.device.on("connect", conn => {

            //setInterval(() => { this.getConnections() }, 1000);

            this.log("Successfully established the call.");
          });

          this.device.on('disconnect', conn => {
            this.log('Call ended.');
            this.onCall = false;
            if (this.countDown) {
              this.countDown.unsubscribe();
            }
            this.RecordingTime = 0;
            this.onHangUpClick();
          });


        }
        else {
          this.log("Error: Invalid Token.");
        }
      }
      else {
        this.log("Error: Something went wrong while generating the token.");
      }
    });

  }

  GetPhoneNumber() {
    this.twilioService.GetPhoneNumber(this.PrimaryId, this.RefId, this.columnName, this.refTable, this.refColumn)
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp => {
        if (resp) {
          if (resp.statusCode == 200) {
            if (resp.responseMessage) {
              if (this.isShowLogs) {
                this.PhoneNo = resp.responseMessage;
              }
              else {
                this.PhoneNo = resp.responseMessage;
              }
            }
          }
          else {
            this.log(resp.responseMessage);
          }
        }
        else {
          this.log('Something went wrong. Please contact administrator.');
        }
      }, (_error) => { }, () => { });
  }



  timer: any;
  onButtonClick(number) {
    this.preventSimpleClick = false;

    this.timer = setTimeout(() => {
      if (!this.preventSimpleClick) {
        if (this.PhoneNo) {
          this.PhoneNo += number;
        }
        else {
          this.PhoneNo = number;
        }
      }
    }, 250);
  }
  onButtonDoubleClick(number) {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);

    if (this.PhoneNo) {
      this.PhoneNo += number;
    }
    else {
      this.PhoneNo = number;
    }
  }

  onClearClick() {
    var value = this.PhoneNo as string;
    if (value) {
      this.PhoneNo = value.slice(0, -1);
    }

  }

  onKeyPress(event: any) {
    const pattern = /[- +()*#0-9]+/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  OnWrapperClick() {
    this.refreshParentEmitter.emit();
    this.commanservice.setRefreshDailerCaller = true;
  }

  onVideoClick()
  {
    this.onToggleClick();
    // this.videocall.show();
    let componentFactory: ComponentFactory<any>;
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomeComponent);
    var videoRef = this.videoChat.createComponent(componentFactory);
    // (videoRef.instance as VideocallComponent).phoneNo = this.PhoneNo;
    (videoRef.instance as HomeComponent).show();
  }


  close() {
    this.voiceCallModel.hide();
  }
}
