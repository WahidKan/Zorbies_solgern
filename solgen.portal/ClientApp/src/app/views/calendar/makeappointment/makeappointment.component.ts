import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService, ModuleList } from '../../shared/common.service';
import { BankService } from '../../bank/bank.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Calendar } from '@fullcalendar/core';
import { CalendarlistService, appointmentmodel } from '../calendarlist.service';
import { window } from 'rxjs/operators';
import { emit } from 'cluster';
import { id } from '@swimlane/ngx-datatable';
import { Time } from '@angular/common';
import { callbackify } from 'util';
import { AppointmentsComponent } from '../../shared/appointments/appointments.component';
import { DateTimeToLocalPipe, DateTimeToLocalPipeForAppointment } from '../../../pipes/datetime.pipe';
import moment from 'moment';

@Component({
  selector: 'app-makeappointment',
  templateUrl: './makeappointment.component.html',
  styleUrls: ['./makeappointment.component.scss']
})
export class MakeappointmentComponent implements OnInit {
  @ViewChild('makeappointment', { static: false }) modalmakeAppointment: ModalDirective;
  @ViewChild('clearDrop', { static: false }) clearDrop: NgSelectComponent;
  @ViewChild('clearAppointment', { static: false }) Objectunknown: NgSelectComponent
  @Output('Onsaved') hideEvent: EventEmitter<any> = new EventEmitter();
  @Output('appointmentRefresh') appointmentRefresh: EventEmitter<any> = new EventEmitter();

  loadSave: boolean = false;
  AssignedUName:string;
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
  title: any;
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
   isReschedule:boolean=false;
  AppointmentIdAuto: any;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private calenderService: CalendarlistService,
    private router: Router,
    private dateTimeToLocal: DateTimeToLocalPipe,
    private dateTimeToLocalForApp: DateTimeToLocalPipeForAppointment,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    this.fTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.Tdate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minimumDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minToTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minFromTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.FromTimemodel = this.minFromTime;
    this.comptype = JSON.parse(localStorage.getItem("userinfo"));
    console.log(this.comptype);

    this.InitForm();


  }

  ngOnInit() {
    ;
    this.loadSave = false;
    this.defaultminTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minimumDate = this.defaultminDate;
    this.addOrUpdatePermission = true;
    this.getAppointmentType();
    this.getAppointmentWith();
    this.getAppointmentStatus();
    this.getAppointmentStatusFinancialInstitute();
    this.showTime = false;
    // console.log("comptype", this.comptype);
    //this.isEdit = false;
    this.getContacts();
  }

  getAppointmentType() {
    ;
    this.commonService.getMasterItemsList('appointmenttype').subscribe((result: any) => {
      ;
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
      ;
      this.appointments = this.commonService.masters;
      if (this.comptype.companyType == 'companytypeFinancialInstitute') {
        this.getcustomers(1);
      }
    })
  }

  selectAppointmentWith(event: any) {
    ;
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
  getContacts() {
    debugger;
    this.calenderService.getcustomerListForCalender().subscribe((result: any) => {
      if (result) {
        ;
        this.customers = result;
        this.setcustomerid();
        if (this.customers.length > 0) {
          var id = Number(this.leadContactId);
          this.leadContactId = this.customers[0].value;
          //this.addForm.get('customer').setValue(this.customers[0].value);
        }
      }
    });
  }

  getcustomers(value: any) {
    this.calenderService.getcustomerList(value, this.leadContactId).subscribe((result: any) => {
      if (result) {
        ;
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
    ;
    this.calenderService.getcustomerList(value.text, this.leadContactId).subscribe((result: any) => {
      this.customers = result;
      this.addForm.patchValue(
        {
          customer: selected
        });
    })
  }

  close() {
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
    ;
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
    if (this.addForm.valid) {
      debugger;
      this.loadSave = true;
      // this.appmodel.AppointmentTypeID = this.addForm.value.appointmenttypeId;
      this.appmodel.AppointmentStatusID = this.addForm.value.appointmentstatusId;
      this.appmodel.AppointmentNumber = this.addForm.value.AppointmentNumber;
      this.appmodel.Subject = this.addForm.value.Subject;
      this.appmodel.AppointmentStatus = this.lstappointmentstatus.find(x => x.value == this.addForm.value.appointmentstatusId).text;
      //this.appmodel.AppointmentType = this.lstappointment.find(x => x.value == this.addForm.value.appointmenttypeId).text;
      // this.appmodel.appointmentWith = this.addForm.value.appointmentWith;
       this.appmodel.ModuleName =  'calender'; //this.appointments.find(x => x.value == this.addForm.value.appointmentWith).text;
      this.appmodel.customer = this.addForm.value.customer;
      this.appmodel.customerName = this.addForm.value.CreatedByName;
      // this.appmodel.customerName = this.customers.find(x => x.value == this.addForm.value.customer).text;
      this.appmodel.customerGuid = this.customers.find(x => x.value == this.addForm.value.customer).userId;
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
      debugger;
      this.leadContactId = this.appmodel.customer;
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
              ;
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
              if (this.routeFrom == 'Lead') {
                this.appointmentRefresh.emit();
                // this.router.navigate(["/lead"]);
              } else if (this.routeFrom == 'Opportunity') {
                this.appointmentRefresh.emit();
              } else {
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

    this.title = "Add Appointment";
    this.showTime = false;
    this.loadSave = false;
    this.appId = null;
    this.isAdd = true;
    this.isReschedule=false;
    this.addOrUpdatePermission = this.isAdd;
    this.addForm.get('CreatedByName').setValue(this.AssignedUName);
    this.modalmakeAppointment.show();
    this.active = true;
    this.isEdit = false;
  }

  showComponent(subModuleName: any, id = 0) {
    debugger;
    this.defaultminTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minimumDate = this.defaultminDate;
    this.leadContactId = id;
    this.title = "Add Appointment";
    this.appId = null;
    this.isAdd = true;
    this.addOrUpdatePermission = this.isAdd;
    this.modalmakeAppointment.show();
    this.active = true;
    this.isEdit = false;
    this.routeFrom = subModuleName;
    this.commonService.getMasterItemsList('appointmentobject').subscribe((result: any) => {
      this.appointments = [];
      ;
      this.commonService.masters.forEach(t => {

        if (t.text == subModuleName) {
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
    this.edit(id,false);
  }
   edit(id: any,isShcedule:any) {
    debugger;
    this.isReschedule=isShcedule;
    this.title = "Edit Appointment";
    this.addOrUpdatePermission = this.isUpdate;
    this.appId = id;
    this.calenderService.getAppointmentById(id).subscribe((result: any) => {
      debugger;
      this.leadContactId = result.contact_Id;
      this.calenderId = result.calenderId;
      this.AppointmentIdAuto = result.appointmentIDAuto;
       console.log(result);
      // this.modalmakeAppointment.show();
      // if (result.module_obj != null) {
      //   let AppointmentObject = this.Objectunknown.items.find(element => {
      //     if (element.value == result.module_obj == null ? null : result.module_obj.toString()) {
      //       return element;
      //     }
      //   });
      // }
 this.addForm.get('CreatedByName').setValue(this.AssignedUName);
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
        // appointmentWith: result.module_obj == null ? null : result.module_obj.toString(),
        customer: result.contact_Id,
        description: result.description,
        Subject:result.subject,
        AppointmentNumber:result.appointmentNumber,
        // appointmentDueDate:fromtime,
        appointmentDueDate: dDueDate,

        toTime: totime,
        fromTime: fromtime,

      })
      this.todate = totime;
      this.FromTimemodel = fromtime;



      this.isEdit = true;
      // if (result.module_obj != null) {
      //   this.getcustomersForSelected(this.Objectunknown.items.find(element => {
      //     if (element.value == result.module_obj.toString()) {
      //       this.routeFrom == element.text;
      //       return element.text;
      //     }
      //   }), result.contact_Id);
      //   this.getcustomers(result.module_obj.toString());
      // }
      this.loadSave = false;
      this.modalmakeAppointment.show();
    });
  }




  InitForm() {
    debugger;
    let firstN = this.comptype.firstName;
    let lastN = this.comptype.lastName
    this.AssignedUName = firstN + ' ' + lastN;
    this.addForm = this.fb.group({
      // appointmenttypeId: [null, this.comptype.companyType != 'companytypeFinancialInstitute' ? Validators.required : Validators.nullValidator],
      appointmentstatusId: [null, Validators.required],
      appointmentDueDate: [null, Validators.required],
      fromTime: [null, Validators.required],
      toTime: [null, Validators.required],
      customer: [null, Validators.required],
      // appointmentWith: [null, this.comptype.companyType != 'companytypeFinancialInstitute' ? Validators.required : Validators.nullValidator],
      description: null,
      appointmentId: '',
      AppointmentNumber: [''],
      Subject: ['', Validators.required],
      CreatedByName: ['', Validators.required]
    })
    this.addForm.get('CreatedByName').setValue(this.AssignedUName);
  }
  get CreatedByName() { return this.addForm.get('CreatedByName'); }
  get Subject() { return this.addForm.get('Subject'); }
  get AppointmentNumber() { return this.addForm.get('AppointmentNumber'); }
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
    const dt1: Date = new Date();
    if (evt < dt1.getTime()) {
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
