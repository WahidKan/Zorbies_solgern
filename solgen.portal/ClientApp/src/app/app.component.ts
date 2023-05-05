import { Component, OnInit, ViewChild, NgModule, Inject, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output, ViewContainerRef, ComponentFactory, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonService, DailerParam } from './views/shared/common.service';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { document, window } from 'ngx-bootstrap/utils';
import { VoicecallComponent } from './views/shared/twilio/voicecall/voicecall.component';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { Device } from 'twilio-client';
import { TwilioService } from './views/shared/twilio/twilio.service';
import { VideocallComponent } from './views/shared/twilio/videocall/videocall.component';
import { ModalDirective } from 'ngx-bootstrap';
import { take, takeUntil } from 'rxjs/operators';
import { HomeComponent } from './views/shared/twilio/home/home.component';
import { Login, UserService } from './views/shared/user.service';
import { ModulesService } from './views/managemodules/modules.service';

@NgModule({
  declarations: [
    VoicecallComponent
  ]
})

@Component({
  providers: [VoicecallComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy, OnChanges {
  title = 'Solgen';
  showHeader = false;
  isVideoChat: boolean = false;
  showSidebar = false;
  showFooter = false;
  islogin = false;
  callOnLoad = false;
  isVisibleDialer = false;
  Phone = '';
  userInfo: any[] = [];
  companyType: any;
  userTypeName: any;

  userType: any;
  username: any;
  maincontClass: string = 'main-content';
  @ViewChild('voiceCallPopup', { static: false }) voiceCallPopup: VoicecallComponent;
  public baseUri = `${environment.WebApiBaseUrl}`;

  @ViewChild("videoChat", { read: ViewContainerRef, static: true })
  videoChat: ViewContainerRef;
  //@ViewChild('videoChat',{static:false}) videoChat: HomeComponent
  subscriber = new Subject()
  subscription: any;

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

  lstheadercompany: any;
  isSwitchCompany: boolean = false;

  @ViewChild("voiceCallPopup", { static: false }) voiceCallModels: ModalDirective;
  @ViewChild("videocall", { static: false }) videocall: VideocallComponent;
  @ViewChild("btnCall", { static: false }) btnCall: ElementRef;
  @ViewChild("btnHangUp", { static: false }) btnHangUp: ElementRef;
  @ViewChild("btnClear", { static: false }) btnClear: ElementRef;
  @ViewChild("btnHold", { static: false }) btnHold: ElementRef;
  @ViewChild("btnMute", { static: false }) btnMute: ElementRef;
  loadSave: boolean = true;
  headeruserid: any;
  companyLogo: string;

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
  ObjectName: string = null;
  UserId: string = '';
  CompanyId: string = '';
  @Output() refreshParent: EventEmitter<boolean>;
  countDown: Subscription;
  // constructor(
  //   private componentFactoryResolver: ComponentFactoryResolver,
  //   private commanservice: CommonService, private twilioService: TwilioService,
  //   private toastr: ToastrService, private commonService: CommonService,
  //   private router: Router) {
  // }
  
  deviceInfo = null;
  Browser: any;
  BrowserVersion: any;
  IPAddress: any;
  isChecked = false;
  baseUrl:string;
  CompaniesName:any;
  CompanyIdval:any;
  OS: string
  OSVersion: string;
  loginModel: Login = new Login();
  moduleCode : any = '1'
  
  headerData: any; imageLink = '';
  constructor(private router: Router, public signalRService: SignalRService,
    private activatedRoute: ActivatedRoute, private http: HttpClient,
    private commonService: CommonService, private voiceCallModel: VoicecallComponent, @Inject(DOCUMENT) private document: Document,
    private commanservice: CommonService, private componentFactoryResolver: ComponentFactoryResolver, private twilioService: TwilioService,
    private toastr: ToastrService, private el: ElementRef, private userService: UserService,
    private moduleService: ModulesService,) { }

  ngOnInit() {
    //var authenticated = localStorage.getItem('authenticate');
    //if (authenticated == null) {
    //  localStorage.clear();
    //  window.location.replace('/account');
    //}
    // console.log('Hi');
    
    //debugger
    this.isSwitchCompany = false;
    this.commonService.getThemeType().subscribe((result: any) => {
      if (result == 1) {
        this.loadStyle("SolgenStyle.css", "SolgenStyle");
      }
      else {
        this.loadStyle("LoanhomiStyle.css", "LoanhomiStyle");
      }
      this.loadStyle("feather.css", "feather");
    });
    
    if (localStorage.getItem('userinfo')) {
      this.islogin = true;
      this.commonService.getCurrentUserDetail();
      
      this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
      this.companyType = this.userInfo["companyType"];
      //debugger
      this.userTypeName = this.moduleCode == 199 ? 'Customer' : this.userInfo["userTypeName"];
     
     
     
      this.commonService.dialerNumber.subscribe((param: DailerParam) => {
        console.log(param);
        console.log(this.voiceCallPopup);
          this.voiceCallPopup.PhoneNo = param.phoneNo;
          this.voiceCallPopup.RefId = param.refId;
          this.voiceCallPopup.CompanyId = param.companyId;
          this.voiceCallPopup.ObjectName = param.objectName;
          
            this.voiceCallPopup.onToggleClick();
        });
  
        if (this.companyType != "companytypeFinancialInstitute") {
          this.ShowDialer({ defaultValue: true, visible: true, Minimize: true });
        }
      
     

    }
    else {
      this.islogin = false;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.isVideoChat = this.activatedRoute.firstChild.snapshot.data.isVideoChat;
        // console.log("video calll", this, this.isVideoChat)
        this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
        this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;

          this.moduleCode = this.activatedRoute.firstChild.snapshot.data.moduleCode;
        //// console.log("appcomponent1",  this.moduleCode);
        if (typeof  this.moduleCode == 'undefined' ||  this.moduleCode == '-1') {
          document.getElementById('htmlbody').removeAttribute("class");
          document.getElementById('htmlbody').setAttribute("class", "login");
        }
        else if (typeof  this.moduleCode == 'undefined' ||  this.moduleCode == '95845') {
          document.getElementById('htmlbody').removeAttribute("class");
          document.getElementById('htmlbody').setAttribute("class", "standalone-page");
        }
        else if (typeof  this.moduleCode == 'undefined' ||  this.moduleCode == '9007') {
          document.getElementById('htmlbody').removeAttribute("class");
          document.getElementById('htmlbody').setAttribute("class", "standalone-page");
        }
        else {
          var ViewPortwidth = window.innerWidth;
          if (ViewPortwidth > 1367 && ViewPortwidth < 1024) {
            document.getElementById('htmlbody').removeAttribute("class");
            document.getElementById('htmlbody').setAttribute("class", "fixed-topbar fixed-sidebar theme-sdtl color-default dashboard sidebar-collapsed");
          }
          else {
            document.getElementById('htmlbody').removeAttribute("class");
            document.getElementById('htmlbody').setAttribute("class", "fixed-topbar fixed-sidebar theme-sdtl color-default dashboard");
          }

        }

      }
    });
    let windowWidth = window.innerWidth;
    if (windowWidth < 1367 && windowWidth > 1024) {

      setTimeout(function () {
        document.getElementById('htmlbody').removeAttribute("class");
        document.getElementById('htmlbody').setAttribute("class", "fixed-topbar fixed-sidebar sidebar-collapsed theme-sdtl color-default dashboard");
      }, 500);
    }
    let currentContext = this;

    this.commonService.hubConnection.start().catch(m => { }).then(m => {
      //// console.log('signal r initialize');
      currentContext.commonService.getConnectionID().subscribe((a: any) => {
        //// console.log('connection detail: ', a)
        if (typeof a != 'undefined' && a != null && a != "") {
          currentContext.commonService.ConnectionID = JSON.parse(a).connnectionId;
          localStorage.setItem('connectionID', JSON.parse(a).connnectionId);
        }
      });
    });

    this.commonService.hubConnection.onreconnected(function (conntionId: string) {
      currentContext.commonService.getConnectionID().subscribe((a: any) => {
        //// console.log('re-connection detail: ', a)
        currentContext.commonService.ConnectionID = JSON.parse(a).connnectionId;
        localStorage.setItem('connectionID', JSON.parse(a).connnectionId);
      });
    });



    /////  this.signalRService.startConnection();
    /////////// this.signalRService.addTransferChartDataListener();
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
    this.commonService.getLoggedInName.subscribe((user: any) => {
      this.headeruserid = user.id;
      setTimeout(() => {
        //this.companyIdDdl = user.companyId;
        this.headeruserid = user.id;
        //this.modulePermission = this.commonService.getPermission(1021);
      }, 2000);
      this.headerSetup(user);
    });
    this.loadSave = false;
  }
  loadStyle(styleName: string, stypeid: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const style = this.document.createElement('link');
    style.id = stypeid;//'client-theme'; 
    style.rel = 'stylesheet';
    style.href = `${styleName}`;

    head.appendChild(style);
  }
  minimize: boolean = true;
  default: boolean = true;
  phoneNo: boolean = true;
  primaryId = 0;
  refId = '';
  ShowDialer({ callOnLoad = false, phoneNo = null, defaultValue = false, visible = true, Minimize = true, columnName = 'MobilePhone', refTable = 'tblContacts', refColumn = 'AccountId', refId = '', PrimaryId = 0 }) {

    this.minimize = Minimize;
    this.default = defaultValue;
    this.phoneNo = phoneNo;
    this.primaryId = PrimaryId;
    this.refId = refId;
    this.callOnLoad = callOnLoad;
    if (visible) {
      this.isVisibleDialer = true;
      /*this.voiceCallModel.OpenDialer({ phoneNo: phoneNo, minimize: Minimize, defaultValue: defaultValue, columnName: columnName, refTable: refTable, refColumn: refColumn, refId: refId });*/
    }
    else {
      this.isVisibleDialer = false;
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
          ObjectName: String(this.ObjectName)
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
    if (this.isDialerMinimize) {
      this.isDialerMinimize = false;
      if (!this.device.isInitialized) {
        this.GenerateTwilioToken();
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

          this.device.on('error', error => {
            this.onHangUpClick();
            this.log('this.device Error: ' + error.message);
            if (error.message.includes("microphone")) {
              this.toastr.error("No microphone is connected with your device. Please connect microphone to dial a call.");
            }
            else {
              this.toastr.error("An application error occurred. Please try gain after some time.");
            }
          });

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

  onVideoClick() {
    this.onToggleClick();
    // this.videocall.show();
    let componentFactory: ComponentFactory<any>;
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomeComponent);
    var videoRef = this.videoChat.createComponent(componentFactory);
    // (videoRef.instance as VideocallComponent).phoneNo = this.PhoneNo;
    (videoRef.instance as HomeComponent).show();
  }

  getHeaderData(id: any) {
    this.commonService.getHeaderData(id).subscribe((res: any) => {

      this.headerData = res;
      this.imageLink = res.profilePic;
    },
      (error: any) => {
      });
  }

  updateToken(CompanyId: any) {
    this.loadSave = true;
    const basicuserinfo = JSON.parse(localStorage.getItem('userinfo'));
    this.userService.updatetoken(basicuserinfo.email, CompanyId).subscribe((res: any) => {
      if (res) {
        if (res.status == 200) {
          this.loadSave = true;
          localStorage.setItem("access_token", res.token);
          localStorage.setItem("usertype", res.usertype);
          this.commonService.GetServiceGetFileList("switch").subscribe(m => { });
          setTimeout(() => {
            this.commonService.getLoggedInName.subscribe((userdetail: any) => {

              this.commonService.getUserModulePermissions(false).subscribe((m: any) => {
                localStorage.removeItem('moduleList');

                localStorage.setItem('moduleList', m);
                //  this.router.navigateByUrl('/dashboard');
                window.location.href = "dashboard";
              });
            });
          }, 2000);
          this.loadSave = true;
        }
        else if (res.status == 201) {
          this.loadSave = false;
          this.toastr.error(res.token);
        }
      }
    }, error => {
      this.loadSave = false;
    });
    this.loadSave = false;
  }
  GeHeaderCompanyList() {
    this.commonService.GeHeaderCompanyList(this.headeruserid).subscribe((data: any) => {

      this.lstheadercompany = data;
      this.companyLogo = data[0].CompanyLogo.replace("UserProfilePick", "UserProfilePick\\");
      if (this.lstheadercompany.length > 1) {
        this.isSwitchCompany = true;

      }
    })
  }
  headerSetup(user: any) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.userType = userdetail.userType;
      if (userdetail.id == null) {
        this.username = user.firstName + " " + user.lastName
      }
      else {
        this.username = userdetail.firstName + " " + userdetail.lastName
        this.getHeaderData(userdetail.id);
      }
    });
  }
}

