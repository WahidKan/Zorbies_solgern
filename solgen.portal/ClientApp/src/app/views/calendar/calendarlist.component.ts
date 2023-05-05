import { forEach } from 'underscore';
import { ScheduleAppointmentComponent } from './../shared/schedule-appointment/schedule-appointment.component';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';
import { CbilscoreComponent } from '../loanapplication/cbilscore/cbilscore.component';
import { MakeappointmentComponent } from './makeappointment/makeappointment.component';
import { CallandardetailComponent } from './callanderdetail/callandardetail.component';
import { CalendarlistService } from './calendarlist.service';
import { ModuleList, CommonService, DailerParam } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProposalMappingComponent } from '../shared/proposal-mapping/proposal-mapping.component';
import { timeout } from 'rxjs/operators';
import moment from 'moment';
import { DateTimeToLocalPipeForAppointment } from 'src/app/pipes/datetime.pipe';

@Component({
  selector: 'app-calendarlist',
  //template: `<app-calendarlist (Onsaved)='onDialogSaved($event)'></app-calendarlist>`,
  templateUrl: './calendarlist.component.html',
  styleUrls: ['./calendarlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarListComponent implements OnInit {
  @ViewChild('makeappointment', { static: false }) makeappointment: MakeappointmentComponent;
  @ViewChild('callandarDetail', { static: false }) callendarDetail: CallandardetailComponent;
  @ViewChild('messageDetailsPopup', { static: false }) attendancemodel: ModalDirective;
  @ViewChild('scheduleAppointment', { static: false }) scheduleAppointment: ScheduleAppointmentComponent;
  @ViewChild('AppointmentHistoryModal', { static: false }) AppointmentHistoryModal: ModalDirective;
  @Input('submoduleName') submoduleName: any;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  //modulePermission: ModuleList;
  loadSave: boolean = false;
  loading = false;
  sortDir = 'desc';
  day: string = null;
  month: string = '';
  messageContent: any;
  year: string = '';
  sortColumn = 'AppointmentDueDate';
  pagedData: any = {
    pager: {},
    data: []
  };
  lstAppointmentHistory: any = {
    endTime: null,
    Status: '',
    History: []
  }
  pageNo = 1;
  listFilter = '';
  searchTxt = '';
  listFiltertext='';
  lastButtonType = 'dayGridMonth';
  buttonType: string[] =
    [
      'dayGridMonth',
      'timeGridDay',
      'timeGridWeek'
    ];
  lstPageSize: any
  pageSizeValue: number;
  isWeekSelected: boolean = false;
  isContact: boolean = false;
  isAdd: boolean = true;
  isFinancialInstitute: boolean = false;
  isUpdate: boolean = true;
  isDelete: boolean = true;
  isReschedule: boolean = false;
  id: any = 0;
  appId: any;
  modulePermission: any[] = [];
  contentHeader: object;
  customerList: any;
  AppointmentStatuses:any;
  customerId:any =null;
  customerProfile: boolean = false

  appointmentStatusId: any = null;

  constructor(private calendarlistService: CalendarlistService,
    private dialogService: ConfirmationDialogService,
    public commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService,
    private dateTimeToLocalForApp: DateTimeToLocalPipeForAppointment
    , private route: ActivatedRoute
  ) {
    // const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    // this.modulePermission = this.commonService.getPermissiondata(moduleCode);



    //

    //let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTADD');
    //if (add == undefined) {
    //  add = "null";
    //} else {
    //  this.isAdd = true;
    //}
    //let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTUPDATE');
    //if (update == undefined) {
    //  update = "null";
    //} else {
    //  this.isUpdate = true;
    //}

    //let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTDELETE');
    //if (deletedata == undefined) {
    //  deletedata = "null";
    //} else {
    //  this.isDelete = true;
    //}
    
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      console.log("userdetail", userdetail)
      if (userdetail.userTypeName == "Customer") {
        this.customerProfile = true;
      }
      if (userdetail.userType == "usertypecontact") {
        this.isContact = true;
      }
      else if (userdetail.companyType == "companytypeFinancialInstitute") {
        this.isFinancialInstitute = true;
      }
    });
  }
  options: OptionsInput;
  currentDate: any;

  eventsModel: any;
  DayClicked(date, jsevent) {



  }
  @ViewChild('fullcalendar', { static: false }) fullcalendar: CalendarComponent;
  ngOnInit() {
    debugger;
     this.submoduleName;
    this.loadSave = true;
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.appId = params['autoId'];
      if (this.id != null && this.id != undefined && this.appId != null && this.appId != undefined)
        this.ShowAppointmentPopup();
    });
    this.OnLoad();

    this.initBreadCrumb();

    this.getCustomers();
    this.getAppointmentStatus()
  }
  ResceduleAppointment(row) {
    this.isReschedule = true;
    this.makeappointment.edit(row.AppointmentID, this.isReschedule);
  }

  openDailer(row) {
    debugger;
    console.log(row);
    if(this.submoduleName==null)
    {
      this.submoduleName='calender';
    }
    // this.commonService.SetdialerNumber = new DailerParam(phoneNo: "string", companyId: "string", userId: "string", objectName: "string", refId: "string");
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    // const phoneno = '+1' + phoneNumber;
    this.commonService.SetdialerNumber = new DailerParam('+1' +row.MobilePhone, userinfo['companyId'], userinfo['id'], this.submoduleName, row.AppointmentIDAuto);

  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Calendar',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: 'Calendar',
            isLink: false
          }

        ]
    };
  }
  ShowAppointmentPopup() {
    this.calendarlistService.GetAppointmentSAgaintstUser(this.id, this.appId).subscribe((result: any) => {
      if (result) {
        // console.log(result);
        this.scheduleAppointment.show(this.id, this.appId);
      }
      else {
        this.toaster.error('Appointment Does Not Exist Against this User');
      }
    });
  }
  OnLoad() {
    localStorage.removeItem('opid');
    this.loadSave = true;
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
    this.currentDate = new Date();
    const dt1: Date = new Date();
    this.day = null;
    this.eventClick = (info) => {
      const dt: Date = new Date(info.event.start);
      this.month = (dt.getMonth() + 1).toString();
      this.year = dt.getFullYear().toString();
      this.day = dt.getDate().toString();

      this.calendarlistService.GetAppointments(this.sortColumn, this.sortDir, 0, this.pageSizeValue,
        this.loginuserid, this.day, this.month, this.year,this.listFiltertext,this.customerId,this.appointmentStatusId, this.isWeekSelected).subscribe(response => {
          debugger;
          console.log(response);
          this.pagedData = this.calendarlistService.pagedData;
          this.loadSave = false;

          this.pagedData.data.forEach(x => {
            debugger;
           
           var start=new Date(this.dateTimeToLocalForApp.transform(x.AppointmentDueDate, ''));
            var end = new Date(this.dateTimeToLocalForApp.transform(x.EndDate, ''));
            if (dt1.getTime() > end.getTime())
            {
              x.reschedule = true;
              x.AppointmentStatus='Expired';
            }
            else if(start.getTime() <= dt1.getTime() && end.getTime() >= dt1.getTime())
          {
                 x.startMeeting=true;
          }
          })

        }, error => {
          this.loadSave = false;
        })
    }
    this.options = {
      selectable: true,
      editable: false,

      navLinks: true,

      navLinkWeekClick: (s, e) => {

      },
      events: [
        {
          title: 'new demo',
          start: '2020-09-11',
          end: '2020-09-11',

        }
      ],


      eventBorderColor: 'transparent',
      eventBackgroundColor: 'yellow ',
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {

          }
        }
      },
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },

      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],


    };


    this.calendarlistService.GetAppointmentsForCalendar('').subscribe(s => {
      let currentTime = new Date();
      debugger;
      var start=new Date(this.dateTimeToLocalForApp.transform(s.AppointmentDueDate, ''));
          var end = new Date(this.dateTimeToLocalForApp.transform(s.EndDate, ''));
      s.forEach(x => {
        if (currentTime > x.EndDate)
        {
          x.reschedule = true;
          x.AppointmentStatus='Expired';
        }
        else if(start.getTime() <= dt1.getTime() && end.getTime() >= dt1.getTime())
        {
               x.startMeeting=true;
        }
        
      })
      this.eventsModel = s;
    });
  }
  eventClick(model) {

  }
  eventDragStop(model) {

  }
  clickButton(model) {
    if (!(model.buttonType == 'prev' || model.buttonType == 'next')) {
      if (this.lastButtonType == model.buttonType) {
        return;
      }
      else {
        this.lastButtonType = model.buttonType;
      }
    }
    const dt: Date = new Date(model.data);

    this.month = (dt.getMonth() + 1).toString();
    this.year = dt.getFullYear().toString();

    if (this.lastButtonType == 'dayGridMonth') {
      this.day = null;
      this.isWeekSelected = false;
    }
    else if (this.lastButtonType == 'timeGridWeek') {
      this.isWeekSelected = true;

      dt.setDate(dt.getDate() - dt.getDay());
      this.day = dt.getDate().toString();
      this.isWeekSelected = true;
    }
    else {
      this.isWeekSelected = false;
      this.day = dt.getDate().toString();
    }


    const dt1: Date = new Date();
    this.calendarlistService.GetAppointments(this.sortColumn, this.sortDir, 0, this.pageSizeValue,
      this.loginuserid,
      this.day, this.month, this.year,this.listFiltertext,this.customerId,this.appointmentStatusId, this.isWeekSelected).subscribe(response => {
        debugger
        this.pagedData = this.calendarlistService.pagedData;
        this.pagedData.data.forEach(x => {
          var start=new Date(this.dateTimeToLocalForApp.transform(x.AppointmentDueDate, ''));
          var end = new Date(this.dateTimeToLocalForApp.transform(x.EndDate, ''));
          if (dt1.getTime() > end.getTime())
           {
            x.reschedule = true;
            x.AppointmentStatus='Expired';
           }
           else if(start.getTime() <= dt1.getTime() && end.getTime() >= dt1.getTime())
           {
                  x.startMeeting=true;
           }
        })
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      })
  }



  reset(){
    // this.listFilter='';
    // this.listFiltertext = '';
    // this.customerId = null;
    // this.appointmentStatusId = null;
    // this.refresh();
    this.loadSave = true;
    window.location.reload();
  }

  SetCustomerId(id){
    this.customerId = id;
    this.refresh();
  }

  SetAppointmentId(id){
    this.appointmentStatusId= id;
    this.refresh();
  }

  clearCustomerId(event){
    this.customerId=null;
    this.refresh();
  }

  clearAppointmentId(event){
    this.appointmentStatusId=null;
    this.refresh();
  }

  searchServiceAppointment(){
    debugger
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = this.listFilter.trim();
    }

    this.refresh();

  }

  getCustomers(){
    this.commonService.getMasterItemsList('contact_user').subscribe((result: any) => {
      this.customerList = this.commonService.masters;
      console.log(this.customerList);
    })
  }

  getAppointmentStatus(){
    this.commonService.getMasterItemsList('AppointmentStatus').subscribe((result: any) => {
      debugger
      this.AppointmentStatuses = this.commonService.masters;
    })
  }



  setPage(s) {
    const pageNumber: number = parseInt(s.page) - 1;

    this.refresh(pageNumber);
  }
  dateClick(model) {
    debugger;
    const dt: Date = new Date(model.date);
    const dt1: Date = new Date();
    this.month = (dt.getMonth() + 1).toString();
    this.year = dt.getFullYear().toString();
    this.day = dt.getDate().toString();
    var days = document.querySelectorAll(".selectedDate");
    days.forEach(function(day) {
      day.classList.remove("selectedDate");
    });
    model.dayEl.classList.add("selectedDate");
    this.calendarlistService.GetAppointments(this.sortColumn,
      this.sortDir, 0, this.pageSizeValue,
      this.loginuserid,
      this.day, this.month, this.year,this.listFiltertext,this.customerId,this.appointmentStatusId, false).subscribe(response => {
        debugger;
        this.pagedData = this.calendarlistService.pagedData;
        this.loadSave = false;
        this.pagedData.data.forEach(x => {
          var start=new Date(this.dateTimeToLocalForApp.transform(x.AppointmentDueDate, ''));
          var end = new Date(this.dateTimeToLocalForApp.transform(x.EndDate, ''));
          if (dt1.getTime() > end.getTime())
          { x.reschedule = true;
            x.AppointmentStatus='Expired';
          }
          else if(start.getTime() <= dt1.getTime() && end.getTime() >= dt1.getTime())
          {
            debugger;
                 x.startMeeting=true;
          }
        })
      }, error => {
        this.loadSave = false;
      })
  }
  updateEvents() {
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

  makeAppointment() {
    this.loadSave = true;
    this.makeappointment.show();
    setTimeout(() => {
      this.loadSave = false;
    }, 500);
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refresh();
  }
  setPageNo($event) {
    this.pageNo = $event.page;
    this.refresh();
  }
  editAppointment(row) {
    debugger;
    console.log(row);
    this.isReschedule = false;
    this.makeappointment.edit(row.AppointmentID, this.isReschedule);

  }
  DisplaySiteDetail() {
    this.callendarDetail.show();
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  refresh(pageNum: number = 0) {
    debugger
    const dt: Date = new Date();
    const dt1: Date = new Date();
    this.month = (dt.getMonth() + 1).toString();
    this.year = dt.getFullYear().toString();
    this.calendarlistService.GetAppointments(this.sortColumn, this.sortDir, pageNum,
      this.pageSizeValue, this.loginuserid, this.day,
      this.month, this.year,this.listFiltertext,this.customerId,this.appointmentStatusId, this.isWeekSelected).subscribe(response => {

        debugger
        this.pagedData = this.calendarlistService.pagedData;
        this.loadSave = false;
        this.pagedData.data.forEach(x => {
          debugger;
          var start=new Date(this.dateTimeToLocalForApp.transform(x.AppointmentDueDate, ''));
          var end = new Date(this.dateTimeToLocalForApp.transform(x.EndDate, ''));
          if (dt1.getTime() > end.getTime())
          {
            x.reschedule = true;
            x.AppointmentStatus='Expired';
          }
          else if(start.getTime() <= dt1.getTime() && end.getTime() >= dt1.getTime())
          {
                 x.startMeeting=true;
          }
        })
      }, error => {
        this.loadSave = false;
      })
  }

  OnDialogSaved(event) {
    this.OnLoad();
  }

  deleteAppointment(appointment) {
    debugger;
    console.log(appointment);
    const message = `Are you sure you want to delete appointment "${appointment.Subject}"?`;
    this.dialogService.confirm('Delete Appointment', message).subscribe(confirmed => {
      if (confirmed) {
        this.calendarlistService.deleteAppointment(appointment.AppointmentID).subscribe((response: any) => {
          if (response.responseMessage == "Success") {
            this.toaster.success(`Appointment "${appointment.Subject}" has been deleted successfully`);
            this.OnLoad();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {

        });
      }
    });
  }

  DisplayDescription(row) {
    this.messageContent = row.Description;
    this.attendancemodel.show();
  }
  closemessageDetailsPopup() {
    this.attendancemodel.hide();
  }

  AppointmentHistory(row: any) {
    debugger;
    console.log(row);
    this.AppointmentHistoryModal.show();
    this.calendarlistService.getAppointmentHistory(row.Contact_Id, row.AppointmentIDAuto, '').subscribe((result: any) => {
      debugger;
      this.lstAppointmentHistory.endTime = result.EndTime;
      this.lstAppointmentHistory.Status = result.Status;
      this.lstAppointmentHistory.History = result.History != null ? JSON.parse(result.History) : [];
    })
  }

  close() {
    this.AppointmentHistoryModal.hide();
    this.lstAppointmentHistory.endTime = '';
    this.lstAppointmentHistory.Status = '';
    this.lstAppointmentHistory.History = [];
  }


}
