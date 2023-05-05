import { location } from 'ngx-bootstrap/utils/facade/browser';
import { Subscriber } from 'rxjs/Subscriber';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, OnDestroy, Inject, NgModule, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, UserDetails, ChangePasswordModel, ModuleList } from 'src/app/views/shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { debuglog, isNull } from 'util';
import { UserService } from '../../views/shared/user.service';
import { window } from 'ngx-bootstrap/utils';
import * as signalR from '@aspnet/signalr';
import { NotificationService } from '../../views/notifications/notification.service';
import { Observable, Subject, of, concat } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError, isEmpty, debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModulesService, ModuleModel } from '../../views/managemodules/modules.service';
import { AppComponent } from '../../app.component';
import { NotificationDetailComponent } from '../../views/notifications/notification-detail.component';
import { strictEqual } from 'assert';
import { DateTimeToLocalPipe, DateTimeToLocalPipeForAppointment } from '../../pipes/datetime.pipe';
import moment from 'moment';
import { VoicecallComponent } from 'src/app/views/shared/twilio/voicecall/voicecall.component';
import { DOCUMENT } from '@angular/common';
import { UserprofileService } from 'src/app/views/userprofile/userProfile.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';
import { SubscriptionListComponent } from 'src/app/views/superadmin/super-admin-subscriptions/subscription-list/subscription-list.component';
//import { environment } from 'src/environments/environment';


// @NgModule({
//   declarations: [
//     VoicecallComponent
//   ]
// })

@Component({
  providers: [VoicecallComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  //public baseUri = `${environment.WebApiBaseUrl}`;
  // headerDashboardLink = this.baseUri + "dashboard";
  @ViewChild('voiceCallPopup', { static: false }) voiceCallPopup: VoicecallComponent;
  @ViewChild('notificationDetailModal1', { static: false }) notificationDetailModal1: NotificationDetailComponent;
  @ViewChild('ddlSearch', { static: false }) public ngSelectComponent: NgSelectComponent;
  @ViewChild('mobileSidebarmappingModalvalue', { static: false }) mobileSidebarmappingModal: MobileSidebarComponent;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  loadSave: boolean = false;

  headerData: any; imageLink = '../../assets/images/default-user-icon.jpg';
  modulePermission: ModuleList;
  userType: any;
  lstheadercompany: any;
  companyIdDdl: any;
  selectedDay: string = '';
  loading = false;
  sortDir = 'desc';
  iscompletescroll = true;
  isScroll = false;
  sortColumn = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  headeruserid: any;
  companyLogo: string;
  lstPageSize: any;
  screen_width:any;
  menulist: any;
  pageSizeValue: number;
  moduleList: ModuleModel[];
  notificationList: any = [];
  isSwitchCompany: boolean = false;
  connection: any;
  filteredData: any[];
  selectedData: any;
  length: any = 10;
  tablename: string;
  comptype: any;
  recordFilter: any;
  teamID: any;
  teamMemberID: any;
  userSearch: any;
  public users$;
  public selectedUser;
  public typeahead = new EventEmitter<string>();

  closesidebar:boolean = false
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

  minimize: boolean = true;
  default: boolean = true;
  phoneNo: boolean = true;
  primaryId = 0;
  refId = '';
  elem: any;
  isFullScreenSection: boolean = false;
  isFullScreen: boolean;
  sizeNo: number;
  currPageNo: number;
  headerMargin: string = "";
  isrespoBtn: boolean = false;
  modalRef: BsModalRef;
  mobileScreen:boolean = false;
  isFromSuperAdmin: string=''


  constructor(private dateTimeToLocal: DateTimeToLocalPipeForAppointment, private routerService: Router, private toaster: ToastrService, private userService: UserService,
    private commonService: CommonService, private moduleService: ModulesService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private el: ElementRef,
    private modalService: BsModalService,
    @Inject(DOCUMENT) private document: any,
    private notificationService: NotificationService, private app: AppComponent,
    private userprofileService: UserprofileService) {

    this.comptype = JSON.parse(localStorage.getItem("userinfo"));
    // console.log("userHerder", this.comptype);

    console.log('Header is reloading. . .');
  }

  username: any;
  @HostListener('window:resize', ['$event'])
 onResize(event) {
  event.target.innerWidth;
  this.screen_width = document.documentElement.clientWidth;
  if(this.screen_width < 992){
    this.mobileScreen = true;
  }else{
    this.mobileScreen = false;
  }
}


  ngOnInit() {
    this.screen_width = document.documentElement.clientWidth;
    if(this.screen_width < 992){
      this.mobileScreen = true;
    }
    this.headerMargin = "float:right;margin-left:900px;";
    this.bindGlobalSearch();
    this.isSwitchCompany = false;
    this.companyIdDdl = null;
    this.GeHeaderCompanyList();
    this.commonService.getLoggedInName.subscribe((user: any) => {
      this.headeruserid = user.id;
      //setTimeout(() => {
        //this.companyIdDdl = user.companyId;
        this.headeruserid = user.id;
        this.modulePermission = this.commonService.getPermission(1021);
     // }, 2000);
      this.headerSetup(user);
    });
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.getRoleModuleList();
    let currentContext = this;
    this.getHeaderNotification();
    this.prepareSignalR();
    this.isFromSuperAdmin = localStorage.getItem('isFromSuperAdmin');
    //this.voiceCallPopup.isDialerMinimize = true;
    // this.onAppointmentNotification();



    //this.connection.start().catch(function (err) {
    //  return console.error(err.toString());
    //}).then(function () {
    //  currentContext.commonService.getConnectionID().subscribe(m => {

    //  });
    //});
    this.recordFilter = this.commonService.getQueryStringValue("recordFilter");
    this.teamID = this.commonService.getQueryStringValue("teamID");
    this.teamMemberID = this.commonService.getQueryStringValue("teamMemberID");
    if (this.teamID == "null")
      this.teamID = null;
    if (this.teamMemberID == "null")
      this.teamMemberID = null;
    if (this.recordFilter == "null")
      this.recordFilter = null;
    this.elem = document.documentElement;
    this.getUserProfile();


  }


  switchToAdmin(){
    //debugger
    if(localStorage.getItem('A_Email')){
      var email = localStorage.getItem('A_Email')
      this.commonService.switchToSuperAdmin(email);
    }
  }


  getUserProfile(){
    this.userprofileService.getUserProfile().subscribe((result: any) => {
      if(result){
      localStorage.setItem('isSuperAdmin', result.userTypeName=='usertypesuperadmin'? 'true' : 'false' );
      }
    })
  }

  closeSidebar(){
    this.closesidebar = false;
  }

  closeSidebarData(){
    this.closesidebar = !this.closesidebar;
  }

  // opens the full screen mode
  openFullscreen() {

    this.isFullScreenSection = !this.isFullScreenSection;
    this.sizeNo = 28;
    this.currPageNo = 0;

    this.headerMargin = "float:right;margin-left:1150px;";
    if (this.isFullScreenSection) {
      let myTag = document.getElementById('htmlbody');
      if (!myTag.classList.contains('fixed-topbar fixed-sidebar theme-sdtl color-default dashboard')) {
        myTag.classList.remove('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard');
        myTag.classList.add('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard', 'sidebar-collapsed');
      }
    }
    else {
      let myTag1 = document.getElementById('htmlbody');
      myTag1.classList.remove('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard', 'sidebar-collapsed');
      myTag1.classList.add('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard');
    }


    this.isFullScreen = !this.isFullScreen;//true;
    if (this.isFullScreen == false) {
      this.closeFullscreen();
    }
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  };

  // closes the full screen mode
  closeFullscreen() {
    //;
    this.isFullScreen = false;

    this.headerMargin = "float:right;margin-left:900px;";
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    }
    else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    }
    else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    }
    else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  manageDialer() {

    if (this.voiceCallPopup.isDialerMinimize) {
      this.ShowDialer({ defaultValue: true, visible: true, Minimize: true });
      this.voiceCallPopup.onToggleClick();
    }
    else {
      this.ShowDialer({ defaultValue: true, visible: false, Minimize: true });
      this.voiceCallPopup.onToggleClick();
    }
  }

  ShowDialer({ callOnLoad = false, phoneNo = null, defaultValue = false, visible = true, Minimize = true, columnName = 'MobilePhone', refTable = 'tblContacts', refColumn = 'AccountId', refId = '', PrimaryId = 0 }) {

    this.minimize = Minimize;
    this.default = defaultValue;
    this.phoneNo = phoneNo;
    this.primaryId = PrimaryId;
    this.refId = refId;
    this.callOnLoad = callOnLoad;
    if (visible) {
      this.isVisibleDialer = true;
      // this.voiceCallModel.OpenDialer({ phoneNo: phoneNo, minimize: Minimize, defaultValue: defaultValue, columnName: columnName, refTable: refTable, refColumn: refColumn, refId: refId });
    }
    else {
      this.isVisibleDialer = false;
    }

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
  getRoleModuleList() {
    this.moduleService.getModuleList(this.comptype.id).subscribe((response: any) => {
      if (response) {

        this.moduleList = response;
        // this.companyLogo = response[0].companyLogo.replace("UserProfilePick", "UserProfilePick\\");;

        this.loadSave = false;
      }
      else {
        this.moduleList = [];
      }
    }, error => {
      this.loadSave = false;
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  GetCompanyList() {
    this.commonService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.headeruserid).subscribe(response => {
      this.pagedData = this.commonService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
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

  getHeaderData(id: any) {
    this.commonService.getHeaderData(id).subscribe((res: any) => {

      this.headerData = res;
      //debugger
      this.imageLink = res.profilePic;
      if(this.imageLink==null || this.imageLink== "null" || this.imageLink== "")
      this.imageLink ='../../assets/images/default-user-icon.jpg';
    },
      (error: any) => {
      });
  }

  GetFileLink(fileName: any) {
    this.userService.GetFileLink(fileName, "image", "user").subscribe((res: any) => {
      if (res) {
      }
    });
  }

  logout() {
    this.loadSave = true;
    // setTimeout(() => {
    //   this.commonService.logout();
    //   this.app.ShowDialer({ phoneNo: '', visible: false });

    // }, 2000);
    this.commonService.logout();
      this.app.ShowDialer({ phoneNo: '', visible: false });
    this.loadSave = false;
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
          //setTimeout(() => {
            this.commonService.getLoggedInName.subscribe((userdetail: any) => {

              this.commonService.getUserModulePermissions(false).subscribe((m: any) => {
                localStorage.removeItem('moduleList');

                localStorage.setItem('moduleList', m);
                //  this.router.navigateByUrl('/dashboard');
                window.location.href = "dashboard";
              });
            });
          //}, 2000);
          this.loadSave = true;
        }
        else if (res.status == 201) {
          this.loadSave = false;
          this.toaster.error(res.token);
        }
      }
    }, error => {
      this.loadSave = false;
    });
    this.loadSave = false;
  }

  prepareSignalR() {
    this.commonService.hubConnection.on("sendNotificationToClient", (message: string, isShowToaster: boolean) => {

      this.getHeaderNotification(isShowToaster, message);

    });
  }


  connectionId: string;
  totalNotification: number = 0;
  getHeaderNotification(isNew = false, message = null) {

    this.commonService.getHeaderNotification().subscribe((m: any[]) => {
      this.totalNotification = m.length;
      this.notificationList = m.slice(0, 5);
      this.notificationList.forEach((item) => {
        /////Message/////////
        if (item.Message.indexOf('Date:') > 0) {
          let indxmsgdt = 5 + (item.Message.indexOf('Date:'));
          let msgdtString = item.Message.substr(indxmsgdt, 16);
          let msgdateString = this.dateTimeToLocal.transform(msgdtString, '');
          let msgjdueDate = moment(msgdateString).format('MM/DD/yyyy hh:mm A');
          item.Message = item.Message.replace(msgdtString, msgjdueDate);
        }
        // /////Subject/////////
        // let indxsubjdt = ((item.Subject.length) - 16);
        // let subjdtString = item.Subject.substr(indxsubjdt, 21);
        // let subjdateString = this.dateTimeToLocal.transform(subjdtString, '');
        // if(subjdateString !="Invalid date")
        // {
        // let subjdueDate = moment(subjdateString).format('MM/DD/yyyy');
        // item.Subject = item.Subject.replace(subjdtString, subjdueDate);
        // }
        // /////Date/////////
        // if(item.leadMessage.indexOf('Date:</b>')>0)
        // {
        // let indxdt = 9 + (item.leadMessage.indexOf('Date:</b>'));
        // let dtString = item.leadMessage.substr(indxdt, 16);
        // let dateString = this.dateTimeToLocal.transform(dtString, '');
        // let dueDate = moment(dateString).format('MM-DD-YYYY');
        // item.leadMessage = item.leadMessage.replace(dtString, dueDate);
        // }
        // /////FromTime/////////
        // if(item.leadMessage.indexOf('Start Time:</b>')>0)
        // {
        // let indxfromTime = 16 + (item.leadMessage.indexOf('Start Time:</b>'));
        // let fromTimeString = item.leadMessage.substr(indxfromTime, 16);
        // let fromTimeDateString = this.dateTimeToLocal.transform(fromTimeString, '');
        // let fromTime = moment(fromTimeDateString).format('hh:mm A');

        // item.leadMessage = item.leadMessage.replace(fromTimeString, fromTime);
        // }
        // //////////End Time////////////
        // if(item.leadMessage.indexOf('End Time:</b> ')>0)
        // {
        // let indxtoTime = 14 + (item.leadMessage.indexOf('End Time:</b> '));
        // let toTimeString = item.leadMessage.substr(indxtoTime, 16);
        // let toTimeDateString = this.dateTimeToLocal.transform(toTimeString, '');
        // let toime = moment(toTimeDateString,).format('hh:mm A');
        // item.leadMessage = item.leadMessage.replace(toTimeString, toime);
        // }
        /////////
      });
      if (isNew) {
        this.toaster.info(message);
      }
    });
  }

  onNotification(notification: any) {
    if (!notification.IsRead) {
      this.notificationService.setNotificationToRead(notification.UserNotificationId).subscribe(response => {
        // this.routerService.navigateByUrl(notification.RouteUrl)
        notification.IsRead = true;
        let dtdate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTC(this.dateTimeToLocal.transform(new Date(), '')));

        let dtDueDate = moment(this.dateTimeToLocal.transform(new Date(), '')).format("MM-DD-yyyy hh:mm A");
        notification.ReadOn = dtdate.toString();
      }, error => {
        this.loading = false;
      });

    }
    this.notificationDetailModal1.show(notification);

  }
  onLoanHomiNotification(notification: any) {
    this.notificationService.setNotificationToRead(notification.UserNotificationId).subscribe(m => {
      this.getHeaderNotification();
      this.routerService.navigateByUrl(notification.RouteUrl)
    });
  }
  onNotificationMessaeg(notification: any) {
    let NotiMesae = "";
    if (notification) {
      NotiMesae = notification.split('Start Time')[0];
    }
    return NotiMesae;
  }




  onAppointmentNotification() {
    this.commonService.getAppointmentNotification().subscribe(m => {
      this.getHeaderNotification();
    });
  }

  onScrollToEnd() {
    debugger
    if (this.iscompletescroll == true) {
      this.isScroll = true;
      if (this.selectedData == undefined) {
        this.selectedData = '';
      }
      if (this.length == 10) {
        this.length = 20;
      }
      else {
        let oldlebn = this.length + 10;
        this.length = oldlebn;
      }

      if (this.iscompletescroll == true) {
        this.bindGlobalSearch();
      }
    }
    else {
      if (this.length == 10) {
        this.length = 20;
      }
      else {
        let oldlebn = this.length + 10;
        this.length = oldlebn;
      }
      //setTimeout(function () { this.bindGlobalSearch(); }, 5000);

      this.bindGlobalSearch();
    }



  }

  btnSearch(term: any): Observable<any> {
   debugger
    this.selectedData = term;
   // console.log('btnSearch Called:', this.selectedData);
    return this.commonService.getGlobalSeacrchData(this.selectedData, this.length, this.recordFilter, this.teamID, this.teamMemberID);
  }

  list: any=[];

  bindGlobalSearch() {
    debugger
    if (this.isScroll == true) {
      this.iscompletescroll = false;

        //filter((term) => term.length >= 3), // HERE I FILTERED THE TYPEAHEAD
        //distinctUntilChanged(),
        // //debounceTime(200),
        // setInterval(() => {
        //   this.btnSearch(this.selectedData).subscribe((x:any)=>{
        //     debugger

        //     this.list = x
        //   });
        // }, 3000);
        if(this.selectedData.length  >= 3){
          this.btnSearch(this.selectedData).subscribe((x:any)=>{
            debugger

            this.list = x
          });
        }

    }
    else {
      debugger
      this.iscompletescroll = true;
      this.typeahead.pipe(
        filter((term) => term.length >= 3), // HERE I FILTERED THE TYPEAHEAD
        distinctUntilChanged(),
        debounceTime(200),
        tap(() => this.loading = true),
        switchMap(
          (term) => this.btnSearch(term).pipe(
            takeUntil(this.ngUnsubscribe),
            catchError(() => of({ items: [] })),
            map(rsp => rsp),
            tap(() => this.loading = false),
          )
        )
      ).subscribe(x=>{
        //debugger
        this.list = x
      });
    }
  }

  searchTerm :any =null;

  Clearddl() {
  debugger
    this.ngSelectComponent.filterValue=null
    this.searchTerm =null
    this.users$ = [];
    this.selectedData = null;
    this.bindGlobalSearch();
    this.list =null;
  }


  closedropdown() {

    this.users$ = [];
    this.selectedData = null;
    this.bindGlobalSearch();

  }
  redirectToPage(link: any) {
    debugger
    this.loadSave = true;
    //this.Clearddl();
    this.route.navigateByUrl(link);


    this.loadSave = false;
  }

  OnChange(obj) {
    if (obj.link_name) {
      this.redirectToPage(obj.link_name);
    } else {
      let keycode = (obj.keyCode ? obj.keyCode : obj.which);
      if (keycode === 13 || keycode === '13') {
        var length = obj.target.value.length;
        this.iscompletescroll = true;
        this.length = 10;
        if (length >= 3) {
          this.Clearddl();
        }
      }
    }

    var length = obj.target.value.length;
      if (length == 0) {
        this.list=null;
      }
  }

  blueEvent(){
    debugger
    console.log(this.selectedData);


  }



  onScrollToEnds() {
    this.fetchMore();
  }

  fetchMore() {
    this.users$ = this.getFilterValue1()
      .pipe(
        map(combined => {
          return combined[1].concat(combined[0])
        })
      );
  }

  getFilterValues() {
    return this.users$.pipe(
      tap(() => this.users$ = true),
      distinctUntilChanged(),
      switchMap(term => this.btnSearch(this.selectedData).pipe(
        takeUntil(this.ngUnsubscribe),
        tap(res => {

          //this.bufferLength += this.initialValues.length;
        }),
        map(res => res),
        catchError(() => of([])) // empty list on error
      ))
    )
  }


  getFilterValue1() {
    return this.users$ = this.typeahead.pipe(
      tap(() => this.loading = true),
      switchMap(
        (term) => this.btnSearch(term).pipe(
          takeUntil(this.ngUnsubscribe),
          catchError(() => of({ items: [] })),
          map(rsp => rsp),
          tap(() => this.loading = false),
        )
      )
    );
  }

  isResponsiveMenu(e) {
    this.isrespoBtn = !this.isrespoBtn;
  };
    //// console.log("easd3432432", e);
    //let myTag = document.getElementById('htmlbody');
    //// console.log("myTagmyTag", myTag);
    //if (!myTag.classList.contains('fixed-topbar fixed-sidebar theme-sdtl color-default dashboard header-menu nav navbar-nav')) {
    //  ;
    //  myTag.classList.remove('fixed-topbar','fixed-sidebar','theme-sdtl', 'color-default', 'dashboard','header-menu', 'nav', 'navbar-nav','restop-view');
    //  myTag.classList.add('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard','header-menu', 'nav', 'navbar-nav');
    //}
    //else {
    //  let myTag1 = document.getElementById('htmlbody');
    //  ;
    //  myTag1.classList.remove('header-menu', 'nav', 'navbar-nav', 'restop-view');
    //  myTag1.classList.add('header - menu', 'nav', 'navbar - nav');
    //}


    openModal() {
      this.mobileSidebarmappingModal.show();
   }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
