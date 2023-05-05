import { id } from '@swimlane/ngx-datatable';
import { ExpenseDebtModel } from './../../loanapplication/loanapplicationservice.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { FilesuploadComponent } from '../tabs/files/uploadfile/filesupload.component';
import { ModalDirective } from 'ngx-bootstrap';
import { appointmentmodel, CalendarlistService } from '../../calendar/calendarlist.service';
import { addListener } from 'process';
import { NewnoteslistComponent } from '../new-notes/newnoteslist.component';
import { MakeappointmentComponent } from '../../calendar/makeappointment/makeappointment.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimeToLocalPipe, DateTimeToLocalPipeForAppointment } from '../../../pipes/datetime.pipe';
import moment from 'moment';
import { NgSelectComponent } from '@ng-select/ng-select';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('AppointmentHistoryModal', { static: false }) AppointmentHistoryModal: ModalDirective;
  @Input('submoduleName') submoduleName: any;
  @Input('selectedCustomer') selectedCustomer: any;
  @Input('primaryKey') primaryKey: number;
  @Input('is_converted') is_converted: boolean;
  @Input('solgenpower') solgenpower: boolean;
  @Input('unqualifiedStage') unqualifiedStage: boolean;
  @Input('title') title: string;
  @Input('header') header: boolean = true;
  @ViewChild('makeappointment', { static: false }) makeappointment: MakeappointmentComponent;
  @ViewChild('uploadFileModal', { static: false }) uploadFileModal: FilesuploadComponent;//#previewModelPoup
  @ViewChild('previewModelPoup', { static: false }) previewModal: ModalDirective;
  @ViewChild('listnotesmodel', { static: false }) addNewNotesPopupModel: NewnoteslistComponent;
  @ViewChild('CallHistoryModal', { static: false }) CallHistoryModal: ModalDirective;
  @ViewChild('VideoCallHistoryModal', { static: false }) VideoCallHistoryModal: ModalDirective;

  @ViewChild('makeappointment', { static: false }) modalmakeAppointment: ModalDirective;
  @ViewChild('clearDrop', { static: false }) clearDrop: NgSelectComponent;
  @ViewChild('clearAppointment', { static: false }) Objectunknown: NgSelectComponent
  @Output('Onsaved') hideEvent: EventEmitter<any> = new EventEmitter();
  // @Output('appointmentRefresh') appointmentRefresh: EventEmitter<any> = new EventEmitter();
  lstDocumentCategory = [];
  callHistoryList = [];
  VideoCallHistoryModalView = false;
  ddlDocumentCategory;
  lstAppointments: any = {
    pager: {},
    data: []
  }
  lstAppointmentHistory: any = {
    endTime: null,
    Status: '',
    History: []
  }
  imageExtension: any = '';
  pageNo = 1;
  pageSize = 4;
  previewImage: any = '';
  modalImages: any;
  sortDir = 'ASC';
  sortColumn = 'FromTime';
  categoryId = '';
  dataFileUrl = 'https://stage.loanhomi.com/\\src\\assets\\Uploads\\Documents\\Proposal\ViewProposal_637588180580487435.pdf';
  filesCount = 0;
  siteurl = document.location.origin;
  loadSave = false;
  Id: any;


  active = false;
  addForm: FormGroup;
  appointments: any;
  customers: any;
  lstappointment: any;
  lstappointmentstatus: any;
  lstappointmentstatusForFinancialInstitute: any;
  isDateChanged: any = true;
  appmodel: appointmentmodel = new appointmentmodel();
  fTime: Date;//= new Date(0);
  Tdate: Date;//= new Date(0);
  customerID: any;
  utcDate: Date;
  appId: any;
  FromTimemodel: Date;
  Title: any;
  minimumDate;// new Date();
  isEdit = false;
  minToTime: Date;// new Date();;
  maxToTime: Date;
  minFromTime: Date;// new Date();;
  todate: Date; comptype: any = '';
  addOrUpdatePermission: boolean = true;
  leadContactId: any = 0;
  calenderId: any = 0;
  //modulePermission: ModuleList;
  isAdd: boolean = true;
  isUpdate: boolean = true;
  routeFrom: any;
  datefrommodel: Date;
  showTime: boolean = false;
  defaultminTime: Date;
  defaultminDate: Date;
  modulePermission: any[] = [];
  des: boolean = false;
  todayDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));

  AppointmentIdAuto: any;
  constructor(
    private commanService: CommonService,
    private dialogService: ConfirmationDialogService,
    private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig,
    private http: HttpClient,
    private calendarlistService: CalendarlistService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private calenderService: CalendarlistService,
    private router: Router,
    private dateTimeToLocal: DateTimeToLocalPipe,
    private dateTimeToLocalForApp: DateTimeToLocalPipeForAppointment,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {
    this.fTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.Tdate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minimumDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minToTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minFromTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.FromTimemodel = this.minFromTime;
    this.comptype = JSON.parse(localStorage.getItem("userinfo"));
    this.InitForm();
  }
  ngOnInit() {
    this.refresh();
    this.commanService.getRefreshAppointsHistory.subscribe(res => {
      this.refresh();
    });
    this.getAppointmentType();
    this.getAppointmentWith();
    this.getAppointmentStatus();
    this.getAppointmentStatusFinancialInstitute();
    this.calendarlistService.getAditAppointment.subscribe(id => {
      ;
      this.editWithRedirect(id, this.submoduleName);
    });

    this.loadSave = false;
    this.defaultminTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minimumDate = this.defaultminDate;
    this.addOrUpdatePermission = true;

    this.showTime = false;
    // console.log("comptype", this.comptype);
  }

  makeAppointment() {

    this.showComponent(this.submoduleName, this.primaryKey);
  }
  getDocumentCategory() {
    this.commanService.GetDocumentCategory().subscribe(resp => {
      if (resp) {
        this.lstDocumentCategory = JSON.parse(resp);
      }
    });
  }

  GetDocumentType(evt) {
    this.pageNo = 1;
    if (evt) {
      this.categoryId = evt.value;
    }
    else {
      this.categoryId = '';
    }
    this.refresh();
  }

  resetDocumentDDL() {
    this.pageNo = 1;
    this.categoryId = '';
    this.refresh();
  }

  refresh() {
    this.loadSave = true;
    this.calendarlistService.GetAppointmentsBySubmodule(this.primaryKey, this.submoduleName, this.sortColumn, this.sortDir, this.pageNo, this.pageSize).subscribe(result => {
      // console.log(result);
      if (result) {
        this.lstAppointments = result;

        this.filesCount = result.pager.totalItems;
        this.loadSave = false;
      }
    });
  }

  setPageNo($event) {
    this.pageNo = $event.page;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refresh();
  }
  AppointmentHistory(row: any) {
    ;
    this.AppointmentHistoryModal.show();
    this.calendarlistService.getAppointmentHistory(row.leadId, row.appointmentIDAuto, this.submoduleName).subscribe((result: any) => {
      this.lstAppointmentHistory.endTime = result.EndTime;
      this.lstAppointmentHistory.Status = result.Status;
      this.lstAppointmentHistory.History = result.History != null ? JSON.parse(result.History) : [];
    })
  }

  ViewDetail(parm: any) {
    ;
    let row = JSON.parse(JSON.stringify(parm));
    if (row.Type == 'Note') {
      let data = JSON.parse(row.Detail);
      this.addNewNotesPopupModel.displayDetailNotificationHistory('itenone', data.note_id, data.object_ref_id);
    }
    if (row.Type == 'Audio Call') {
      this.callHistoryList = JSON.parse(row.Detail);
      this.CallHistoryModal.show();
    }
    if (row.Type == 'Video Call') {
      this.callHistoryList = JSON.parse(row.Detail);
      this.VideoCallHistoryModalView = true;
      this.VideoCallHistoryModal.show();
    }
  }
  getParticipents(list) {
    if (list != null) {
      return list.map(x => x.ParticipantIdentity).join(',');
    }
    else {
      return '';
    }
  }
  close() {
    this.AppointmentHistoryModal.hide();
    this.lstAppointmentHistory.endTime = '';
    this.lstAppointmentHistory.Status = '';
    this.lstAppointmentHistory.History = [];
  }

  closeCallHistory() {
    this.CallHistoryModal.hide();
  }
  closeVideoCallHistory() {
    this.VideoCallHistoryModal.hide();
    this.VideoCallHistoryModalView = false;
  }
  deleteAppointment(id) {
    const message = `Are you sure you want to delete Appointment?`;
    this.dialogService.confirm('Delete Appointment', message).subscribe(confirmed => {
      if (confirmed) {
        this.calendarlistService.deleteAppointment(id).subscribe((res: any) => {
          this.toaster.success(`Appointment has been deleted successfully`);
          this.pageNo = 1;
          this.refresh();
        });
      }
    });
  }

  editAppointment(id, appointmentStatus) {
    if (appointmentStatus == 'Completed' || appointmentStatus == 'Cancelled') {
      this.toaster.error(`You cannot edit the completed/cancelled appointments.`);
    }
    else {
      this.calendarlistService.setAditAppointment = id;
    }

  }
  closePreview() {
    this.previewModal.hide();
  }
  getAppointmentType() {
    this.commonService.getMasterItemsList('appointmenttype').subscribe((result: any) => {
      this.lstappointment = this.commonService.masters;
    })
  }

  getAppointmentStatus() {
    this.commonService.getMasterItemsList('appointmentstatus').subscribe((result: any) => {
      this.lstappointmentstatus = this.commonService.masters;
    })
  }

  //lstappointmentstatusForFinancialInstitute
  getAppointmentStatusFinancialInstitute() {
    this.commonService.getMasterItemsList('appointmentstatusForFinancialInstitute').subscribe((result: any) => {
      this.lstappointmentstatusForFinancialInstitute = this.commonService.masters;
    })
  }
  getAppointmentWith() {
    ;
    this.commonService.getMasterItemsList('appointmentobject').subscribe((result: any) => {
      this.appointments = this.commonService.masters;
      if (this.comptype.companyType == 'companytypeFinancialInstitute') {
        this.getcustomers(1);
      }
    })
  }

  selectAppointmentWith(event: any) {
    let value = null;
    if (typeof event != 'undefined') {
      value = event.value;
      this.addForm.patchValue(
        {
          customer: [null]
        });
      this.customers = [];
      this.getcustomers(value);
    }
  }

  getcustomers(value: any) {
    ;
    this.calenderService.getcustomerList(value, this.leadContactId).subscribe((result: any) => {
      if (result) {
        this.customers = result;
        this.setcustomerid();
        if (this.customers.length > 0) {
          var id = Number(this.leadContactId);
          this.addForm.get('customer').setValue(this.customers[0].value);
        }
      }
    });
  }
  getcustomersForSelected(value: any, selected: any) {

    this.calenderService.getcustomerList(value.text, this.leadContactId).subscribe((result: any) => {
      this.customers = result;
      this.addForm.patchValue(
        {
          customer: selected
        });
    })
  }

  closeAppointment() {
    this.active = false;
    this.showTime = false;
    this.addForm.reset();
    const elements: any = document.querySelectorAll(".modal-backdrop");
    for (let index = 0; index < elements.length; index++) {
      elements[index].style.display = "none";
    }
    this.modalmakeAppointment.hide();
    this.hideEvent.emit();
  }
  onTodayClick(e: any) {
    this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.addForm.get('appointmentDueDate').setValue(this.defaultminDate);
  }
  InitialFromTime($event) {
    if (this.addForm.get('fromTime').value) {
      let fromtime = moment(this.addForm.get('fromTime').value).format('HH:mm');
      let fromtimeDate = moment(this.appointmentDueDate.value).format('MM/DD/YYYY') + ' ' + fromtime;
      this.addForm.get('fromTime').setValue(new Date(fromtimeDate));
      this.defaultminDate = new Date(fromtimeDate);
    } else {
      let fromtime = moment(this.dateTimeToLocalForApp.transform(new Date(), '')).format('HH:mm');
      let fromtimeDate = moment(this.appointmentDueDate.value).format('MM/DD/YYYY') + ' ' + fromtime;
      this.addForm.get('fromTime').setValue(new Date(fromtimeDate));
      this.defaultminDate = new Date(fromtimeDate);
    }
  }
  InitialToTime($event) {
    if (this.addForm.get('toTime').value) {
      let totime = moment(this.addForm.get('toTime').value).format('HH:mm');
      let totimeDate = moment(this.appointmentDueDate.value).format('MM/DD/YYYY') + ' ' + totime;
      this.addForm.get('toTime').setValue(new Date(totimeDate));
    } else {
      let totime = moment(this.dateTimeToLocalForApp.transform(new Date(), '')).format('HH:mm');
      let totimeDate = moment(this.appointmentDueDate.value).format('MM/DD/YYYY') + ' ' + totime;
      this.addForm.get('toTime').setValue(new Date(totimeDate));
    }
  }
  OnChanged(e: any) {
    this.showTime = true;
    this.isDateChanged = true;
    this.datefrommodel = e;
    this.defaultminDate = e;
    this.defaultminTime = this.defaultminDate;
    e = e.getDate() + ' ' + e.getFullYear();
    let ab: Date = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    var as = ab.getDate() + ' ' + ab.getFullYear();
    this.addForm.get('toTime').setValue(null);
    this.addForm.get('fromTime').setValue(null);
    this.minFromTime = null;
    this.minToTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
  }
  setcustomerid() {
    this.customerID = this.leadContactId;
  }

  Save() {
    ;
    if (this.addForm.valid) {
      this.loadSave = true;
      this.appmodel.AppointmentTypeID = this.addForm.value.appointmenttypeId;
      this.appmodel.AppointmentStatusID = this.addForm.value.appointmentstatusId;
      this.appmodel.AppointmentStatus = this.lstappointmentstatus.find(x => x.value == this.addForm.value.appointmentstatusId).text;
      this.appmodel.AppointmentType = this.lstappointment.find(x => x.value == this.addForm.value.appointmenttypeId).text;
      this.appmodel.appointmentWith = this.addForm.value.appointmentWith;
     const module = this.appointments.find(x => x.value == this.addForm.value.appointmentWith).text;
    ;
    this.appmodel.ModuleName = module;

    if(module.toLowerCase() !='lead')
    {
      this.appmodel.customer = this.primaryKey;

    }
    else
    {
      this.appmodel.customer = this.addForm.value.customer;

    }
      this.appmodel.customerName = this.customers.find(x => x.value == this.addForm.value.customer).text;
      this.appmodel.CustomerID = this.leadContactId;
      this.appmodel.description = this.addForm.value.description;
      // let dtdate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTC(this.dateTimeToLocalForApp.transform(this.addForm.value.appointmentDueDate,'')));
      let dtdate = new Date(this.addForm.value.appointmentDueDate);
      let fromtime = moment(this.addForm.value.fromTime).format('HH:mm');
      // let fromtime =moment(this.dateTimeToLocalForApp.transform(new Date(), '')).format('HH:mm');
      let fromtimeDate = moment(dtdate).format('MM/DD/YYYY') + ' ' + fromtime;
      let dtDueDate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(fromtimeDate));
      let currentdt = moment(new Date(this.dateTimeToLocalForApp.transform(new Date(), ''))).format('MM/DD/YYYY');
      // let cu rrentdt = moment(new Date(this.dateTimeToLocalForApp.transform(new Date(), ''))).format('MM-DD-YYYY');
      let currenttime = moment(new Date(this.dateTimeToLocalForApp.transform(new Date(), ''))).format('HH:mm');
      let duedt = moment(dtdate).format('MM/DD/YYYY');
      let dtFromtime = moment(this.addForm.value.fromTime).format('HH:mm');
      let dtTotime = moment(this.addForm.value.toTime).format('HH:mm');
      // console.log(currentdt);
      // || dtFromtime<currenttime || dtTotime<currenttime
      if (duedt < currentdt) {
        this.toaster.error('You can not schedule the appointment for past date/time.');
        this.loadSave = false;
        return
      }
      if (duedt == currentdt && (dtFromtime < currenttime || dtTotime < currenttime)) {
        this.toaster.error('You can not schedule the appointment for past date/time.');
        this.loadSave = false;
        return
      }
      this.appmodel.AppointmentDueDate = dtDueDate.toDateString();
      this.appmodel.FromTime = this.addForm.value.fromTime;
      this.appmodel.ToTime = this.addForm.value.toTime;
      // this.fTime = new Date(this.appmodel.FromTime);
      // this.Tdate = new Date(this.appmodel.ToTime);
      this.fTime = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(this.appmodel.FromTime));
      this.Tdate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(this.appmodel.ToTime));
      if ((this.customers.find(x => x.value = this.leadContactId).email) != null || (this.customers.find(x => x.value = this.leadContactId).email) != undefined) {
        this.appmodel.Email = this.customers.find(x => x.value = this.leadContactId).email;
      }
      else {
        this.toaster.error('Email Is Required');
        this.loadSave = false;
        return
      }
      this.appmodel.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
      this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
      this.appmodel.AppointmentID = this.appId;
      let userinfo = JSON.parse(localStorage.getItem('userinfo'));
      this.appmodel.userEmail = userinfo['email'];
      this.appmodel.calenderId = this.calenderId;
      /////////Date Time For Notification Start//////////
      let dudate = new Date(this.addForm.value.appointmentDueDate);
      //let fromtime = moment(this.addForm.value.fromTime).format('HH:mm');
      // let fromtime =moment(this.dateTimeToLocalForApp.transform(new Date(), '')).format('HH:mm');
      let dueDatef = moment(dudate).format('MM/DD/YYYY') + ' ' + fromtime;
      let dueDatet = moment(dudate).format('MM/DD/YYYY') + ' ' + dtTotime;
      let DueDate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(dueDatef));
      let toDate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(dueDatet));
      let fromtimeNotify = moment(DueDate).format('MM/DD/YYYY HH:mm');// + ' ' + this.appmodel.FromTime;
      let totimeNoifyDate = moment(toDate).format('MM/DD/YYYY') + ' ' + this.appmodel.ToTime;
      this.appmodel.FromTime_Notification = fromtimeNotify;
      this.appmodel.ToTime_Notification = totimeNoifyDate;
      this.appmodel.AppointmentDueDate_Notification = fromtimeNotify;
      /////////Date Time For Notification End///////////
      const appdt = moment(this.appmodel.AppointmentDueDate).format('MM/DD/YYYY')
      this.calenderService.CheckScheduledAppointmentTime(appdt, this.appmodel.FromTime, this.AppointmentIdAuto).subscribe((result: any) => {

        if (result) {
          this.toaster.error("An appointment is already scheduled for the same time. Please change start time of the appointment.");
          this.loadSave = false;
          this.AppointmentIdAuto = null;
          return;
        }
        else {
          this.calenderService.addeditannouncement(this.appmodel).subscribe((result: any) => {
            
            this.loadSave = false;
            if (result.statusCode == 200) {

              this.toaster.success(result.responseMessage);
              var toNumber = this.customers.find(x => x.value = this.leadContactId).mobilePhone;
              if (toNumber) {
                const phoneno = '+1' + toNumber;
                this.commonService.sendSms(phoneno, this.leadContactId).subscribe((msgResult: any) => {
                  if (msgResult.statusCode == 200) {
                    this.commonService.setRefreshSmsHistory = true;
                    this.toaster.success(msgResult.responseMessage)
                    this.loadSave = false;
                    this.AppointmentIdAuto = null;
                  }
                  else {
                    this.commonService.setRefreshSmsHistory = true;
                    this.toaster.error(msgResult.responseMessage);
                  }
                });
              }
              else {
                this.toaster.error("Please provide phone number for SMS Notification");
              }
              if (this.routeFrom.toLowerCase() == 'lead') {
                this.refresh();
                // this.appointmentRefresh.emit();
                // this.router.navigate(["/lead"]);
              } else if (this.routeFrom.toLowerCase() == 'opportunity' ) {
                this.refresh();
                // this.appointmentRefresh.emit();
              }else if (this.routeFrom.toLowerCase() == 'proposal') {
                this.refresh();
                // this.appointmentRefresh.emit();
              }
              else if (this.routeFrom.toLowerCase() == 'account') {
                this.refresh();
                // this.appointmentRefresh.emit();
              }
              else if (this.routeFrom.toLowerCase() == 'workorder') {
                this.refresh();
                // this.appointmentRefresh.emit();
              }
              else if (this.routeFrom.toLowerCase() == 'requirement') {
                this.refresh();

                // this.appointmentRefresh.emit();
              }
              else if (this.routeFrom.toLowerCase() == 'contract') {
                this.refresh();
                // this.appointmentRefresh.emit();
              }
               else {
                this.router.navigate(["/calendar"]);
              }
              this.hideEvent.emit('abc');
              this.addForm.reset();
              this.modalmakeAppointment.hide();
              const elements: any = document.querySelectorAll(".modal-backdrop");
              for (let index = 0; index < elements.length; index++) {
                elements[index].style.display = "none";
              }
              this.showTime = false;
            }
            else {
              this.loadSave = false;
              this.toaster.error(result.responseMessage);
            }
          }, error => {
            this.loadSave = false;
          });
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
      this.loadSave = false;
    }
  }

  show() {
    this.Title = "Add Appointment";
    this.showTime = false;
    this.loadSave = false;
    this.appId = null;
    this.isAdd = true;
    this.addOrUpdatePermission = this.isAdd;
    this.modalmakeAppointment.show();
    this.active = true;
    this.isEdit = false;
  }

  showComponent(subModuleName: any, id = 0) {
    ;
    this.defaultminTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minimumDate = this.defaultminDate;
    this.leadContactId = id;
    this.Title = "Add Appointment";
    this.appId = null;
    this.isAdd = true;
    this.addOrUpdatePermission = this.isAdd;
    this.modalmakeAppointment.show();
    this.active = true;
    this.isEdit = false;
    this.routeFrom = subModuleName;
    this.commonService.getMasterItemsList('appointmentobject').subscribe((result: any) => {
      this.appointments = [];
      this.commonService.masters.forEach(t => {
        if (t.text.toLowerCase().replace(/\s/g,'') == subModuleName.toLowerCase().replace(/\s/g,'')) {
          this.appointments.push(t);
          this.addForm.get('appointmentWith').setValue(t.value);
          this.getcustomers(t.value);
        }
      });
    })
  }
  editWithRedirect(id: any, subModuleName: any) {
    ;
    this.routeFrom = subModuleName;
    this.edit(id);
  }
  edit(id: any) {
    ;
    this.Title = "Edit Appointment";
    this.addOrUpdatePermission = this.isUpdate;
    this.appId = id;
    this.calenderService.getAppointmentById(id).subscribe((result: any) => {
      ;
      this.leadContactId = result.contact_Id;
      this.calenderId = result.calenderId;
      this.AppointmentIdAuto = result.appointmentIDAuto;
      // const dDate= new Date(this.commonService.ConvertUserSelectedTimeZoneToUTC(this.dateTimeToLocalForApp.transform(result.editDateFrom, '')));
      const dDate = new Date(moment(this.dateTimeToLocalForApp.transform(result.editDateFrom, '')).format('MM/DD/YYYY HH:mm'));
      const dDueDate = new Date(moment(new Date(this.dateTimeToLocalForApp.transform(result.editDateFrom, ''))).format('MM/DD/YYYY'));
      this.datefrommodel = dDate;
      this.defaultminTime = dDate;
      this.defaultminDate = dDate;
      // let test = moment(this.addForm.get('fromTime').value).format('HH:mm');
      // let d2 = moment(this.defaultminDate).format('MM-DD-YYYY') + ' ' + test;
      //this.addForm.get('fromTime').setValue(new Date(d2));



      //From time Conversion to local
      let totimeEdit = new Date(this.dateTimeToLocalForApp.transform(result.editDateTo, ''));
      let toTimeval = moment(totimeEdit).format('HH:mm');
      let UpdatedtoTimeval = moment(dDate).format('MM/DD/YYYY') + ' ' + toTimeval;
      let totime = new Date(UpdatedtoTimeval)
      //To time Conversion to local
      let fromtimeEdit = new Date(this.dateTimeToLocalForApp.transform(result.editDateFrom, ''));
      let fromTimeval = moment(fromtimeEdit).format('HH:mm');
      let UpdatedfromTimeval = moment(dDate).format('MM/DD/YYYY') + ' ' + fromTimeval;
      let fromtime = new Date(UpdatedfromTimeval)

      this.showTime = true;
      this.isDateChanged = false;
      this.addForm.patchValue({
        appointmentId: id,
        appointmenttypeId: result.appointmentTypeID,
        appointmentstatusId: result.appointmentStatusID == null ? result.appointmentStatusID : result.appointmentStatusID.toString(),
        appointmentWith: result.module_obj == null ? null : result.module_obj.toString(),
        customer: result.contact_Id,
        description: result.description,
        // appointmentDueDate:fromtime,
        appointmentDueDate: dDueDate,

        toTime: totime,
        fromTime: fromtime,

      })
      this.todate = totime;
      this.FromTimemodel = fromtime;



      this.isEdit = true;
      this.modalmakeAppointment.show();
      if (result.module_obj != null) {
        this.getcustomers(result.module_obj.toString());
        // this.getcustomersForSelected(this.Objectunknown.items.find(element => {
        //   if (element.value == result.module_obj.toString()) {
        //     this.routeFrom == element.text;
        //     return element.text;
        //   }
        // }), result.contact_Id);
      }
      this.loadSave = false;

    });
  }




  InitForm() {
    this.addForm = this.fb.group({
      appointmenttypeId: [null, this.comptype.companyType != 'companytypeFinancialInstitute' ? Validators.required : Validators.nullValidator],
      appointmentstatusId: [null],
      appointmentDueDate: [null, Validators.required],
      fromTime: [null, Validators.required],
      toTime: [null, Validators.required],
      customer: [null, Validators.required],
      appointmentWith: [null, this.comptype.companyType != 'companytypeFinancialInstitute' ? Validators.required : Validators.nullValidator],
      description: null,
      appointmentId: '',
    })
  }

  get appointmentId() { return this.addForm.get('appointmentId'); }
  get appointmenttypeId() { return this.addForm.get('appointmenttypeId'); }
  get appointmentstatusId() { return this.addForm.get('appointmentstatusId'); }
  get appointmentDueDate() { return this.addForm.get('appointmentDueDate'); }
  get fromTime() { return this.addForm.get('fromTime'); }
  get toTime() { return this.addForm.get('toTime'); }
  get appointmentWith() { return this.addForm.get('appointmentWith'); }
  get customer() { return this.addForm.get('customer'); }
  get description() { return this.addForm.get('description'); }


  changeToValue(evt) {

    var as = evt.getDay() + ' ' + evt.getMonth() + ' ' + evt.getFullYear();
    var ab = this.datefrommodel.getDay() + ' ' + this.datefrommodel.getMonth() + ' ' + this.datefrommodel.getFullYear();
    /////////////////////////
    let currentdt = moment(new Date(this.dateTimeToLocalForApp.transform(new Date(), ''))).format('MM-DD-YYYY');
    let currenttime = moment(new Date(this.dateTimeToLocalForApp.transform(new Date(), ''))).format('HH:mm');
    //let fromtimeDate = moment(this.appointmentDueDate.value).format('MM-DD-YYYY') + ' ' + fromtime;

    let duedt = moment(this.defaultminDate).format('MM-DD-YYYY');
    let dtFromtime = moment(this.addForm.value.fromTime).format('HH:mm');
    let dtTotime = moment(this.addForm.value.toTime).format('HH:mm');

    // console.log(currentdt);
    // || dtFromtime<currenttime || dtTotime<currenttime
    if (duedt >= currentdt) {
      let defaultdt = moment(new Date(this.dateTimeToLocalForApp.transform(new Date(), ''))).format('MM-DD-YYYY HH:mm');
      this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(defaultdt, ''));
    }

    ////////////////////////



    const dt: Date = this.defaultminDate;

    if (evt < dt) {
      this.addForm.get('fromTime').setValue(null);
      this.toaster.error('You can not schedule the appointment for past date/time.')
      return;
    }
    //this.maxToTime.setHours(23);
    //this.maxToTime.setMinutes(59);
    if (this.todate != undefined || this.todate != null) {
      if (this.todate < evt) {
        this.addForm.get('fromTime').setValue(this.todate);
        this.toaster.error('From time must be less than from To time.')
      }
    }
  }
  selectTodayCss(elem, date1, date2) {
    if (date1.day == date2.getDate()
      && date1.month == date2.getMonth()
      && date1.year == date2.getFullYear()) {
      elem.parentElement.parentElement.classList.add('ui-datepicker-today');
    } else {
      elem.parentElement.parentElement.classList.remove('ui-datepicker-today');
    }
  }

  cliecked(e) {
    if (this.addForm.get('toTime').value == null)
      this.addForm.get('toTime').setValue(this.addForm.get('fromTime').value);
  }
  changeTotimeValue(evt) {

    var as = this.todate.getDay() + ' ' + this.todate.getMonth() + ' ' + this.todate.getFullYear();
    var ab = this.datefrommodel.getDay() + ' ' + this.datefrommodel.getMonth() + ' ' + this.datefrommodel.getFullYear();
    const dt: Date = this.defaultminDate;

    if (evt < dt) {
      this.addForm.get('toTime').setValue(null);
      this.toaster.error('You can not schedule the appointment for past date/time.')
      return;
    }
    if (ab == as) {
      if (this.FromTimemodel < this.datefrommodel) {
        this.addForm.get('toTime').setValue(null);
      }
    }
    if (this.FromTimemodel != undefined || this.FromTimemodel != null) {
      if (this.FromTimemodel > this.todate) {
        this.addForm.get('toTime').setValue(null);
        this.toaster.error('From time must be less than from To time.')

      }
    }
  }


}
