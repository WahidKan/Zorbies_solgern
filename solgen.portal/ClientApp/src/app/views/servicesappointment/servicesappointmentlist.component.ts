
import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy, ElementRef, HostListener, Renderer2, } from '@angular/core';
import { ServicesappointmentService, addAssignedResourcesModel, AssignSheduleAppointmentModel, ServiceAppointmentJsonData, attendancedata, ListingViews, blockData, addupdateassignedResourceModel, saveSa_Data } from './servicesappointment.service';
import { CommonService, ModuleList, validationModel } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewnewComponent } from '../shared/manageviewnew/manageviewnew.component';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AddassignedresourcepopupComponent } from './addassignedresourcepopup/addassignedresourcepopup.component';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput, getDayClasses } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';
import { ScriptService } from '../shared/scriptservice.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { LightboxConfig, Lightbox } from 'ngx-lightbox';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AuditpopupComponent } from './auditpopup/auditpopup.component';
import { AuditchecklistpopupComponent } from './auditchecklistpopup/auditchecklistpopup.component';
import { parse } from 'cfb/types';
import { Parser } from '@angular/compiler';
import { document } from 'ngx-bootstrap/utils';
import { CheckboxData } from './servicesappointment.service';
import { extend, closest, remove, addClass, Ajax, Internationalization } from '@syncfusion/ej2-base';
import {
  EventSettingsModel, View, GroupModel, TimelineViewsService, TimelineMonthService,
  ResizeService, WorkHoursModel, DragAndDropService, ResourceDetails, ScheduleComponent, ActionEventArgs, CellClickEventArgs, RenderCellEventArgs, NavigatingEventArgs, Schedule, PopupOpenEventArgs, EventRenderedArgs, TimeScaleModel, EventClickArgs, MoreEventsClickArgs
} from '@syncfusion/ej2-angular-schedule';
import { DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Subject, Observable } from 'rxjs';
import { takeUntil, take, filter } from 'rxjs/operators';
import { FilterpopupComponent } from './filterpopup/filterpopup.component';
import { ServiceCrewMembersPopupComponent } from '../manageservicecrew/service-crew-members-popup/service-crew-members-popup.component';
import { DataManager, WebApiAdaptor, UrlAdaptor, Query, ReturnOption } from '@syncfusion/ej2-data';
import { DateTimeToLocalForAddEditPipe, DateTimeToLocalPipe, DateTimeToLocalForGhantView } from '../../pipes/datetime.pipe';
import moment from 'moment';
import { VoicecallComponent } from '../shared/twilio/voicecall/voicecall.component';
import { AppComponent } from '../../app.component';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { convertToArrayListPipe } from '../../pipes/functions.pipe';
import { UtcDateTimeToLocalPipe } from '../../pipes/utctolocal.pipe';
import { debug, error } from 'console';



declare var google: any;
@Component({
  selector: 'app-servicesappointmentlist',
  templateUrl: './servicesappointmentlist.component.html',
  styleUrls: ['./servicesappointmentlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class ServicesappointmentlistComponent implements OnInit, OnDestroy {
  @ViewChild('searchTypeSelect', { static: false }) searchTypeSelect: NgSelectComponent;
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewnewComponent;
  @ViewChild('addAssignedResourcesPopup', { static: false }) addAssignedResourcesPopupModel: AddassignedresourcepopupComponent;
  @ViewChild('ghantviewTypeSelect', { static: false }) ghantviewTypeSelect: NgSelectComponent;
  //@ViewChild('audit') auditModel: ModalDirective;
  //@ViewChild('auditCheckList') auditCheckListModel: ModalDirective;
  @ViewChild('attendancemodel', { static: false }) attendancemodel: ModalDirective;
  @ViewChild('settingModel', { static: false }) settingModel: ModalDirective;
  @ViewChild("table", { static: false }) table: DatatableComponent;
  @ViewChild('DetailPopup', { static: false }) DetailPopup: ModalDirective;
  @ViewChild('auditsPopup', { static: false }) auditsPopupModel: AuditpopupComponent;
  @ViewChild('auditCheckListsPopup', { static: false }) auditCheckListsPopupModel: AuditchecklistpopupComponent;
  @ViewChild('filterPopup', { static: false }) filterModal: FilterpopupComponent;

  @ViewChild('serviceAppointmentdetail', { static: false }) serviceAppointmentdetail: ModalDirective;

  @ViewChild('ServiceCrewMembersList', { static: false }) ServiceCrewMembersPopup: ServiceCrewMembersPopupComponent;
  @ViewChild('calendar', undefined) private calendar: any;
  public instance: Internationalization = new Internationalization();

  placeholder: string = 'Search by Appt no. and Account Name'
  subscriber = new Subject()
  rangeDates: Date[];
  @Input() offset: number;
  moduleName = 'serviceappointment';
  submoduleName = 'serviceappointment';
  custom_view_id = '';
  searchUserType = '';
  searchFilter = '';
  listFiltertext = '';
  listFiltersearchTypetext = '';
  calenderCondition: string = '';
  loginuserid: any;
  //modulePermission: ModuleList;
  loadSave = false;
  DataOfValue: any;
  lstTimeZone: any;
  loadSaveunSchd = false;
  dynamicClasss: string = 'fa fa-area-chart';
  sortDir = 'desc';
  isDisplayExportButton = false;
  ViewModel: any;
  sortColumn = 'id';
  lstbuttonsdata: any;
  rowsForExport = [];
  vewId: any = '';
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDatafor: any = {
    pager: {},
    data: []
  };
  searchTxt = '';
  listFilter = '';
  unscheduleFilter = '';
  lstPageSize: any;
  pageSizeValue: number = 15;
  SelectionType = SelectionType;
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  currentPage: number;
  companyId: any;
  CalenderSchema: any;
  tableName = 'tblserviceappointment';
  deleteId: any;
  selected = [];
  is_filter: any;
  SearhName: any;
  lstListingColorCode: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  isAudit: boolean = false;
  serviceResourceNames: any;
  serviceCrewNames: any;
  estimatedTravelTimeFromSourceNames: any;
  estimatedTravelTimeToSourceNames: any;
  customCompnentValues: any[];
  title: any;
  lstAccount: any;
  lstStatus: any;
  lstWorkType: any;
  lstWorkorder: any;
  editStatusId: any;
  editWorkOrder: any;
  editWorkType: any;
  addAssignedResourcesForm: FormGroup;
  attendanceform: FormGroup;
  addAssignedResourcesmodel: AssignSheduleAppointmentModel = new AssignSheduleAppointmentModel();
  addupdateassignedResourceModel: addupdateassignedResourceModel = new addupdateassignedResourceModel();
  attendancedata: attendancedata = new attendancedata();
  validityServiceResource: boolean = false;
  validityServiceCrew: boolean = false;
  isCalenderView: boolean = false;
  editAccountId: any;
  form_type = 'LIST';
  //auditData: any;
  attendanceData: any[] = [];
  //auditCheckListData: any[];
  display_date: any = '';
  appointmenttypes: any[] = [];
  isMapView: boolean = false;
  AppointmentNumber: any;
  WorkOrderNumber: any;
  SchedStartTime: any;
  name: any;
  address: any;
  id: any;
  overlays: any[];
  overlaysMap: any[];
  optionsMap: any;
  optionsGhantMap: any;
  appointmentTypeSelectedId: number = 1;
  searchType: any;
  defaultSelect: any;
  manageviewddlList: any;
  dotCount: number;
  checkNumberOnly: number;
  checkString: any;
  chkbx = [];
  myCheckbox: any = false;
  JsonData: ServiceAppointmentJsonData = new ServiceAppointmentJsonData();
  jsonDatapack: any;

  attendancemodeldata: any[] = [];
  serviceappointmentid: any;
  showCalendarList: boolean = true;

  formControlList: any[] = [];
  checkboxdata1: Array<CheckboxData> = [];
  form: FormGroup;
  lstAssignedResources: any = {
    pager: {},
    data: []
  };
  currentPageAssignedRes: number;
  AssignedResourcesCount: number = 0;
  pageSizeValueAssignedResList: number = 4;
  totalRecordsAssignedRes: any;
  servicesappointmentidCal: any;
  defaultDate = moment(new Date()).format('L');
  accordionForm: FormGroup;

  viewTypes = ListingViews;
  currentView: any = null;
  isCal: boolean = false;
  calenderdatalist: any[] = [];
  callenderCurrentView: string = 'Week';
  workTypeItems: any;
  siteurl: string = '';
  filterData: any = null;
  isVisibleDialer = false;
  PhoneNo: any;
  isHidden = false;
  toolData: any;
  //@ViewChild("voiceCallPopup", { static: false }) voiceCallModel: VoicecallComponent;
  popupdata: any;
  accountname: string;
  SchStartDate: any;
  SchEndDate: any;
  ghantviewtypes: any;
  locktooltip: string = 'UnLock'
  totalPageSizeForExport: any = '';
  calstartDate: Date = new Date();
  calendDate: Date = new Date();
  viewType: any = "Resource Type View";
  viewDdl: any;
  SA_viewTypes: any;
  viewtypeid: any;
  viewtypevalue: any;
  saveSa_Data: saveSa_Data = new saveSa_Data();
  filterDataResponse: any;
  //= [{ "Id": 40481, "Subject": "SA-10390", "EmployeeId": 52, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-10T19:58:00", "EndTime": "2021-05-10T19:59:00" }, { "Id": 40839, "Subject": "SA-8552", "EmployeeId": 55, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-06T00:01:00", "EndTime": "2021-05-15T00:01:00" }, { "Id": 40839, "Subject": "SA-8552", "EmployeeId": 397, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-06T00:01:00", "EndTime": "2021-05-15T00:01:00" }, { "Id": 40481, "Subject": "SA-10390", "EmployeeId": 448, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-10T19:58:00", "EndTime": "2021-05-10T19:59:00" }];
  isreadonly: boolean = true;
  actionarray: any[] = [];
  load: boolean = false;

  jsoncondition: any;
  mapFrom: any=null;
  mapTo: any=null;
  mapdata: any;
  timezoneid: number=0;
  timezone: string=null;
  showtimezone: any = '';
  isShow: boolean = false;
  userinfodata: any;
  changeFilterbtnColor: boolean = false;

  contentHeader: object;
  validationModel: validationModel = new validationModel()
  constructor(private serviceappointmentlistService: ServicesappointmentService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router, private fb: FormBuilder, private dateTimeToLocal: DateTimeToLocalPipe,
    private servicesappointmentlistService: ServicesappointmentService,
    private activeRoute: ActivatedRoute, private toaster: ToastrService, private datetime: DatePipe, private dynamicScripts: ScriptService, private _lightboxConfig: LightboxConfig,
    private _lightbox: Lightbox, private elRef: ElementRef, private renderer: Renderer2, private datePipe: DatePipe, private app: AppComponent) {



    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    let auditdata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTAUDIT');
    if (auditdata == undefined) {
      auditdata = "null";
    } else {
      this.validationModel.isAudit = true;
      this.isAudit = true;
    }

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
      this.validationModel.companyType = userdetail.companyType;
    });

    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    this.commonService.getMasterItemsList("WorkType").subscribe((result: any) => {
      this.workTypeItems = this.commonService.masters;
    })
    this.commonService.getMasterItemsList("SA_viewTypes").subscribe((result: any) => {
      this.SA_viewTypes = this.commonService.masters;
    })

  }

  //url: "http://localhost:8530/serviceappointment/GetCrewResourceCalenderList"
  ngOnInit() {
    this.loadSave = true;
    this.actionarray = [
      { "name": "View", "click": "goToPage(row)", "route": "/serviceappointment/view/", "title": "View Detail", "iclass": "fa text-info fa-eye pr-2", "condition": "1==1" },
      { "name": "Edit", "click": "goToPage(row)", "route": "/serviceappointment/addeditservicesappointment/", "title": "Edit", "iclass": "fa fa-pencil text-success", "condition": "this.isUpdate && (r.conditionstatus!='Completed' && r.conditionstatus!='Canceled')" },
      { "name": "Edit", "route": "null", "click": "goToPage(row)", "title": "Edit", "iclass": "fa fa-pencil text-secondary mr-2", "condition": "this.isUpdate && (r.conditionstatus=='Completed' || r.conditionstatus=='Canceled')" },

      { "name": "Scheduledsecondary", "click": "goToPage(row)", "route": "null", "title": "Scheduled Appointment", "iclass": "fa fa-clock-o text-secondary mr-2", "condition": "r.conditionstatus=='Completed' || r.conditionstatus=='Canceled'" },
      { "name": "Scheduled", "click": "goToPage(row)", "route": "null", "title": "Scheduled Appointment", "iclass": "fa fa-clock-o text-primary mr-2", "condition": "r.conditionstatus!='Completed' && r.conditionstatus!='Canceled'" },

      { "name": "Audit", "click": "goToPage(row)", "title": "Audit", "iclass": "fa fa-comment text-primary mr-2", "condition": "r.conditionstatus=='Completed' && this.condition.isAudit" },
      { "name": "View Audit", "click": "goToPage(row)", "title": "View Audit", "iclass": "fa fa-list-ul text-primary mr-2", "condition": "r.conditionstatus=='Completed'" },
      { "name": "Attendance", "click": "goToPage(row)", "title": "Attendance", "iclass": "fa fa-calendar-check-o text-info mr-2", "condition": "1==1" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }

    ]
    this.userinfodata = localStorage.getItem('userinfo');

    this.siteurl = window.location.origin;
    //const SERVICE_URI = 'http://localhost:8530/api/serviceappointment/GetCrewResourceCalenderList';
    this.isCal = false;
    //this.GetCrewResourceCalenderList();
    //this.GetCrewResourceList();
    //this.GetUnschedulledList();
    // public items: object[];

    //new DataManager({ url: SERVICE_URI }).executeQuery(new Query().take(6)).then((e: ReturnOption) => {
    //  this.calenderdatalist = e.result as object[];

    //}).catch((e) => true);
    this.DataOfValue = 'Gantt Chart View';
    this.overlays = [];
    this.overlaysMap = [];
    this.SearhName = '';
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.getPageSizes();
    this.getGhantViewType();
    this.LoadViewData();
    this.initForm();
    this.getRecoarding();
    this.getSA_View();
    //this.refresh();
    this.getViewData();
    
    this.defaultSelect = 1;
    this.currentPageAssignedRes = 1;


    this.appointmenttypes = [
      { id: 1, name: 'View By Schedule Date' },
      { id: 2, name: 'View By Due Date' },

    ];

    //this.dynamicScripts.load('map');
    this.searchType = [
      { value: 1, text: 'Appointment Number' },
      { value: 2, text: 'Assigned Resource' }
    ];
    this.getmanageviewddllist();
    
 
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Service Appointments',
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
             name: 'Manage Service Appointments',
             isLink: false
           }
  
         ]
     };
   }
  ngOnChanges() {
    var testElements = document.getElementsByClassName("fc-title");
  }

  ngOnDestroy() {
    this.subscriber.next();
    this.subscriber.complete();
  }
  getSA_View() {
    this.commonService.getMasterItemsList("SA_viewTypes").subscribe((result: any) => {
      this.SA_viewTypes = this.commonService.masters;
    })
  }

  getViewData() {
    this.serviceappointmentlistService.getGhantViewFilter().subscribe((result: any) => {
      result = JSON.parse(result);
      if (result != null) {
        this.filterDataResponse = result[0];
        if (result[0].Sa_viewtype == null) {
          let data: any;
          data = this.SA_viewTypes.filter(m => m.text == "Gantt View")
          this.viewtypeid = data[0].value;
          this.currentView = this.viewTypes.Ghant;
        }
        else {
          this.viewtypeid = result[0].Sa_viewtype.toString();
          let dataas: any;
          dataas = this.SA_viewTypes.filter(m => m.value == this.viewtypeid)
          this.currentView = dataas[0].text;
        }
        let datagh: any;
        //if (this.filterDataResponse.ghantviewtype != null) {

        //  try {
        //    this.viewDdl = this.filterDataResponse.ghantviewtype;
        //    let gahntview: any;

        //    gahntview = this.ghantviewtypes.filter(m => m.value == this.viewDdl)
        //    this.viewType = "Resource Type View";
        //   // this.viewType = gahntview[0].text;
        //  } catch {
        //    this.viewType = "Resource Type View";
        //  }


        //}
        //else {


          //datagh = this.ghantviewtypes.filter(m => m.text == "Resource Type View")
          //this.viewDdl = datagh[0].value;
        //}
      }
      else {
        let dataa: any;
        dataa = this.SA_viewTypes.filter(m => m.text == "Gantt View")
        this.viewtypeid = dataa[0].value;
        this.currentView = dataa[0].text;
      }
      this.SwitchListingView(this.currentView);
    })
  };


  getListingColorCode(fieldValue: any) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }
    }
    return this.lstListingColorCode;
  }
  GetcustomViewid(event) {
    if (event == 'undefined' || typeof event == 'undefined') {
      this.LoadViewData();
    }
    this.pagedDatafor.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
      }
    });
    this.vewId = event;
    this.custom_view_id = event;
    this.refresh();
  }
  getmanageviewddllist() {
    this.commonService.GetManageViewDropDownList(this.moduleName, this.submoduleName).subscribe((result: any) => {
      this.manageviewddlList = result;
    })
  }

  refresh() {
    ;
    this.selected = [];
    this.deleteId = null;
    this.overlays = [];
    this.loadSave = true;

    if (this.currentView == this.viewTypes.List) {
      this.isDaySelected = true;
    }
    this.serviceappointmentlistService.GetServiceAppointmentList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter, this.form_type, this.display_date, this.isDaySelected, this.searchColumn, this.isWeekSelected, this.myCheckbox, false, 0)
      .pipe(takeUntil(this.subscriber))
      .subscribe(response => {
        this.load = false;
        this.jsonData = response as [];

        this.jsonDatapack = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);
        this.columndata = this.jsonData.data;
        this.load = true;

        if (this.jsonData.data.length > 0) {
          this.totalPageSizeForExport = this.jsonData.data[0].total_records;
        } else {
          this.totalPageSizeForExport = 0;
        }
        this.columnheading = this.jsonData.schema;

        if (this.currentView == this.viewTypes.Calender && !this.isDaySelected) {

          this.eventsModel = this.jsonData.calenderSchema;

          //if (typeof this.jsonData !== 'undefined' && this.jsonData.calenderSchema.length > 0) {

          // const datetime = new DateTimeToLocalPipe;
          // var _datetime = datetime.transform(value, 'Date');

          //  let data = JSON.parse(this.jsonData.calenderSchema);

          //  let newSchema: any[] = [];
          //  data.forEach(item => {
          //  var parser = new DOMParser();
          //    item.title = parser.parseFromString(item.title, 'text/html');
          //    newSchema.push(item);
          //  });

          //  let finalschema = JSON.stringify(newSchema);
          //  this.eventsModel = finalschema;
          //}
        }
        else {
          this.eventsModel = [];
        }

        if (this.currentView == this.viewTypes.Map) {
          this.columndata.forEach(t => {
            this.addMarker(t);
          });
        }


        if (response.data.length > 0) {
          this.totalRecords = this.columndata[0].total_records;
          for (var i = 0; i < response.data.length; i++) {
            if (parseInt(response.data[i].Wattage) >= 0) {
              response.data[i].Wattage = this.commonService.formatAmount(response.data[i].Wattage);
            }
            if (parseInt(response.data[i].Efficiency) >= 0) {
              response.data[i].Efficiency = this.commonService.formatAmount(response.data[i].Efficiency);
            }
            if (parseInt(response.data[i].AmountNeededPerkW) >= 0) {
              response.data[i].AmountNeededPerkW = this.commonService.formatAmount(response.data[i].AmountNeededPerkW);
            }
          }
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;

      }, error => {
        setTimeout(() => {  this.loadSave = false}, 2000);;
      }, () => {
        setTimeout(() => {  this.loadSave = false}, 2000);
      });
  };


  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  setPage($event) {
    this.loadSave = true;
    this.currentPage = $event.page;
    this.refresh();


  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  onsearchTypeSelect(e) {
    this.listFiltersearchTypetext = e.text;
    this.listFilter = "";
  }


  selectAttendanceDate() {
    this.serviceappointmentlistService.AttendanceData(this.serviceappointmentid)
      .subscribe((s) => {
        while (this.fields.length != 0) {
          this.fields.removeAt(0);
        }

        var data = s;
        this.attendanceData = [];
        this.attendanceData.length = 0;
        if (data != null) {
          this.attendanceData.push(data);

          this.attendanceData[0].filter((x) => {
            this.fields.push(
              this.fb.group({
                serviceResourceId: [x.ServiceResourceId],
                attendanceid: [x.Service_AttendanceId],

                resourcename: [x.Name],
                hours: [x.hours],
                isPresent: [x.Is_Present],
                serviceAppointmentId: [x.ServiceAppointmentId],

                //       ScheduleStartDate: [''],
                // ScheduleEnda.Date: [''],
              })
            );
          });
        } else {
          this.attendanceData = [];
          while (this.fields.length != 0) {
            this.fields.removeAt(0);
          }
        }
      });
    // const term = this.lstterms.find(m => m.value ===     this.leaseTerm.value);

    // if (term) {
    //   this.leaseTermAmount = parseInt(term.text.replace(/^\D+/g, '')); ;
    // }

    // if (!this.showHideTag && this.customerHideTag) {
    //   if (this.leaseTermAmount != 0 && this.leaseDate.value!=null) {
    //     let dt = new Date(this.leaseDate.value);
    //     var newDate = new Date(dt.setMonth(dt.getMonth() + this.leaseTermAmount));
    //     this.leaseMaturityDate.setValue(this.datePipe.transform(newDate, 'MM/dd/yyyy'));
    //   }
    //   else {
    //     this.leaseMaturityDate.setValue("");
    //   }
    // }
  }

  updateFilter(event) {
    //this.SearhName = event.target.value;
    //if (this.listFiltersearchTypetext =="Appointment Number") {
    //  this.listFiltertext = "AppointmentNumber like '%" + event.target.value + "%'";
    //}

    //if (this.listFiltersearchTypetext == "Assigned Resource") {
    //  this.listFiltertext = "Resources like '%" + event.target.value + "%'";
    //}
    this.currentPage = 1;
    this.listFiltertext = "(tsa.AppointmentNumber like '%" + event.target.value + "%' or acc.Name like '%" + event.target.value + "%')";
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }

  add() {
    this.router.navigateByUrl('/serviceappointment/addeditservicesappointment/')
  }

  searchServiceAppointment() {
    //this.listFiltertext = '';
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "(tsa.AppointmentNumber like '%" + this.listFilter + "%'  or acc.Name like '%" + this.listFilter + "%')";
    }
    //if (this.listFiltersearchTypetext=="") {
    //  this.listFiltertext = "AppointmentNumber like '%" + this.listFilter + "%'";
    //}
    this.refresh();
    //this.listFiltertext = "";
    //this.listFiltersearchTypetext = "";
  }
  reset() {
    //this.searchTypeSelect.clearModel();
    this.isDaySelected = false;
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.sortDir = 'desc';
    this.sortColumn = 'Id';
    this.myCheckbox = false;
    this.refresh();
  }
  onSelect({ selected }) {
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id.toString() + ",";
      }
    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id.toString() + ",";
      }
    }
  }
  popUpOpen() {
    this.is_filter = '';
    //this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }
  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
        const message = `Are you sure you want to delete all the selected Service Appointment(s)"`;
        this.dialogService.confirm('Delete Service Appointment(s)', message).subscribe(confirmed => {
          if (confirmed) {
            this.serviceappointmentlistService.DeleteRecords(this.deleteId, this.tableName).subscribe(a => {
              this.toaster.success(`All the selected Service Appointment(s) have been deleted successfully`);
              this.deleteId = "";
              this.selected = [];
              this.refresh();
            }, error => {
            });
          }
        });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }
  Delete(row: any) {
    const message = `Are you sure you want to delete Service Appointment  "${row.AppointmentNumber}"?`;
    this.dialogService.confirm('Delete Service Appointment', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceappointmentlistService.DeleteRecords(row.id, this.tableName).subscribe(r => {
          this.toaster.success(`Service Appointment "${row.AppointmentNumber}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }
  ApplyAdvanceFilter(event) {

    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.calenderCondition = '';
    this.calenderCondition = event;
    //this.getcalenderDetail(this.calenderCondition);
    this.refresh();
  }

  //====================================== Assigned Resource ====================================

  refreshList(e: any) {
    //e = {isGhantView: true, starttime: "2021-07-09 07:00:00 am", endTime: "2021-07-09 08:00:00 am"}

    if (this.filterData == null && e.isGhantView != true) {
      this.SwitchListingView(this.currentView);
    }
    else {
      var data = JSON.parse(this.filterData);
      if (this.filterData != null) {
        this.GetUnschedulledList();
      }
      else {
        this.GetUnschedulledList();
      }
      //var date = e.starttime;
      let date = new Date(e.starttime);
      var y = date.getFullYear();
      var m = date.getMonth();
      var firstday = new Date(y, m, 1);
      let endate = new Date(e.endTime);
      var ey = endate.getFullYear();
      var em = endate.getMonth();
      var lastDay = new Date(ey, em + 1, 0);
      //var firstDay = new Date(y, m, 1);

      this.GetCrewResourceCalenderList(firstday, lastDay, true, this.filterData);

      this.GetCrewResourceList(firstday, lastDay);

      this.GetCrewListForGanttView(firstday, lastDay);


      //this.getFilterData(this.filterData);
    }
  }
  //getFilterData(event) {
  //  this.filterData = event;
  //  this.loadSave = true;
  //  var data = JSON.parse(event)
  //  // this.worktypeid = data.worktypeid
  //  if (event != null) {
  //    this.GetUnschedulledList(data.worktypeid, data.accountid, data.categoryid, data.teritoryid);
  //  }
  //  else {
  //    this.GetUnschedulledList();
  //  }
  //  //var ab = new Date()
  //  var last: any;
  //  var ab = new Date();
  //  var date = new Date(),
  //    y = date.getFullYear(),
  //    m = date.getMonth();

  //  var lastDay = new Date(y, m + 1, 0);
  //  var firstDay = new Date(y, m, 1);
  //  if (this.callenderCurrentView == 'Month') {
  //    last = lastDay;
  //    ab = firstDay;
  //  }

  //  else {
  //    last = ab;
  //  }
  //  this.GetCrewResourceCalenderList(ab, last, true, event);

  //  // {"crewid":null,"resourceid":null,"departmentid":null,"worktypeid":null,"accountid":null,"teritoryid":null,"categoryid":"1305"}

  //  this.serviceappointmentlistService.GetCrewResourceList(event)
  //    .pipe(take(1))
  //    .subscribe((resp: any) => {
  //      if (resp) {
  //        this.employeeDataSource = JSON.parse(resp);
  //        //this.data = <Object[]>extend([], this.calenderdatalist, null, true)
  //      }
  //    }, (error) => { }, () => { });
  //  setTimeout(() => {  this.loadSave = false}, 2000);;
  //}



  //=================================================

  //====================================== Calender view Start here ====================================

  currentDate: any;
  day: string = null;
  month: string = '';
  year: string = '';
  @ViewChild('fullcalendar', { static: false }) fullcalendar: CalendarComponent;
  options: OptionsInput;
  eventsModel: any;
  isDaySelected: any = false;
  isWeekSelected: any = false;
  searchColumn: string = 'SchedStartTime';


  //SwitchView() {
  //  this.loadSave = true;
  //  this.pageSizeValue = 15;
  //  this.currentPage = 1;
  //  if (this.isCalenderView) {
  //    this.isCalenderView = false;
  //    this.display_date = '';
  //    this.form_type = 'LIST';
  //    this.showCalendarList = true;
  //  }
  //  else {
  //    this.display_date = this.datetime.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
  //    this.form_type = 'CALENDER';
  //    this.isCalenderView = true;
  //    this.isWeekSelected = false;
  //    this.isDaySelected = false;

  //    this.OnLoad();
  //  }
  //  this.isMapView = false;

  //  this.refresh();
  //  // setTimeout(() => { setTimeout(() => {  this.loadSave = false}, 2000);; },500)

  //}
  //SwitchViewMap() {
  //  this.loadSave = true;
  //  this.pageSizeValue = 15;
  //  this.currentPage = 1;
  //  if (this.isMapView) {
  //    this.isMapView = false;

  //    this.form_type = 'LIST';
  //    this.showCalendarList = true;

  //    this.refresh();
  //    setTimeout(() => {  this.loadSave = false}, 2000);;
  //  }
  //}

  OnLoad() {
    localStorage.removeItem('opid');
    this.pageSizeValue = 15;
    this.getPageSizes();
    //this.refresh();
    this.currentDate = new Date();
    this.day = null;
    this.eventClick = (model) => {
      let serviceAppId = model.event.id;
      let selectedDate = this.datetime.transform(model.event.start, 'yyyy-MM-dd');
      this.currentPage = 1;
      this.display_date = selectedDate;
      this.isDaySelected = true;
      ///////////////this.refresh();
      //this.ShowAppointmentDetail(serviceAppId);
      this.addAssignedResourcesPopupModel.show(serviceAppId)
      this.fullcalendar.calendar.select(model.event.start);
      this.fullcalendar.calendar.refetchEvents();
    }
    //this.eventRender = (model) => {
    //}
    //this.eventContent = (model) => {
    //}
    this.options = {
      selectable: true,
      editable: false,
      firstDay: 0,
      navLinks: false,
      eventBorderColor: 'transparent',
      eventRender: (item) => {
        item.el.innerHTML = item.el.innerText;
      },


      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],

    };
    //this.eventsModel = [];
    //this.eventsModel = this.CalenderSchema;
    //this.getcalenderDetail(this.calenderCondition);
  }

  getcalenderDetail(cond: any) {
    //this.serviceappointmentlistService.GetServiceAppointmentsForCalendar('',cond).subscribe(s => {
    //  this.eventsModel = s;
    //});
  }
  eventClick(model) {
  }
  eventRender(model) {
  }
  eventMouseover(model) {
  }
  eventContent(model) {
  }

  clickButton(model) {
    this.isDaySelected = false;
    this.display_date = this.datetime.transform(model.data, 'yyyy-MM-dd')
    this.form_type = 'CALENDER';

    if (model.buttonType == 'timeGridWeek') {
      this.isWeekSelected = true;
    }
    else if (model.buttonType == 'dayGridMonth') {
      this.isWeekSelected = false;
    }
    else if ((model.buttonType == 'prev' || model.buttonType == 'next') && this.isWeekSelected) {
      this.isWeekSelected = true;
    }
    this.refresh();
    this.OnLoad();
  }

  dateClick(model) {
    //let selectedDate = this.datetime.transform(model.date, 'yyyy-MM-dd');
    //this.currentPage = 1;
    //this.display_date = selectedDate;
    //this.isDaySelected = true;
    //this.refresh();
    return false;
  }

  //auditpopup(serviceAppointmentsId: any) {

  //  this.serviceappointmentlistService.auditReviewData(serviceAppointmentsId).subscribe(s => {
  //    this.auditData = s;
  //    this.ActualauditCheckListData = [];
  //    this.auditModel.show();
  //  });
  //}

  //closeAudit() {
  //  this.auditModel.hide();
  //}
  //closeAuditCheckList() {
  //  this.auditCheckListModel.hide();
  //}
  //closeAuditCheckBackList() {
  //  this.auditCheckListModel.hide();
  //  this.auditModel.show();
  //}

  //SectionGroup: any[] = [];
  //ActualauditCheckListData: { Main: any, Child: any[] }[] = [];

  //auditChecklistDetail(checkList_Id: number, serviceAppointmentId: number) {
  //  this.auditCheckListData = [];
  //  this.ActualauditCheckListData = [];
  //  this.serviceappointmentlistService.auditChecklistDetail(checkList_Id, serviceAppointmentId).subscribe(s => {
  //    this.auditCheckListData = s as any[];
  //    if (this.auditCheckListData != null) {
  //      if (this.auditCheckListData) {
  //        let _data = this.auditCheckListData as any[];
  //        if (_data) {
  //          this.auditTitle = _data[0].CHECK_LIST_NAME;
  //        }
  //      }
  //      var ths = this;
  //      ths.SectionGroup = [];
  //      this.auditCheckListData.forEach(sc => {
  //        let checkIfAlreadyExist = ths.SectionGroup.filter(function (itm) { return itm.sectionId == sc.SECTION_ID });
  //        if (checkIfAlreadyExist.length == 0) {
  //          let groupArray = ths.auditCheckListData.filter(function (itm) { return itm.SECTION_ID == sc.SECTION_ID });
  //          var section = {
  //            sectionName: sc.SECTION_NAME,
  //            sectionId: sc.SECTION_ID,
  //            sectionGroup: []
  //          }
  //          this.ActualauditCheckListData = [];
  //          groupArray.forEach(i => {
  //            let isFound = false;
  //            if (i.PARENT_ID == null) {

  //              this.ActualauditCheckListData.forEach(m => {
  //                if (m.Main.QUESTION_ID == i.QUESTION_ID) {
  //                  if (i.QUESTION_TYPE != "checkbox") {
  //                    var obj = {
  //                      answer: i.ANSWER,
  //                      answerGivenBy: i.ANSWER_GIVEN_BY,
  //                      attachment: i.ATTACHMENT_PATH
  //                    };
  //                    if (typeof m.Main.ANSWERS == "undefined") {
  //                      m.Main.ANSWERS = [];
  //                    }
  //                    m.Main.ANSWERS.push(obj);
  //                  }
  //                  isFound = true;
  //                }
  //              });
  //              if (isFound == false) {
  //                i.ATTACHMENT_PATHS = [];
  //                if (i.QUESTION_TYPE != "checkbox") {
  //                  var obj = {
  //                    answer: i.ANSWER,
  //                    answerGivenBy: i.ANSWER_GIVEN_BY,
  //                    attachment: i.ATTACHMENT_PATH
  //                  };
  //                  if (typeof i.ANSWERS == "undefined") {
  //                    i.ANSWERS = [];
  //                  }
  //                  i.ANSWERS.push(obj);
  //                }
  //                this.ActualauditCheckListData.push({
  //                  Main: i,
  //                  Child: []
  //                })
  //              }

  //            }
  //            else {
  //              let index = 0;

  //              this.ActualauditCheckListData.forEach(j => {
  //                if (j.Main.QUESTION_ID === i.PARENT_ID) {
  //                  if (i.QUESTION_TYPE != "checkbox") {
  //                    var obj = {
  //                      answer: i.ANSWER,
  //                      answerGivenBy: i.ANSWER_GIVEN_BY,
  //                      attachment: i.ATTACHMENT_PATH
  //                    };
  //                    if (typeof j.Main.ANSWERS == "undefined") {
  //                      j.Main.ANSWERS = [];
  //                    }
  //                    j.Main.ANSWERS.push(obj);
  //                  } else {
  //                    i.ANSWER = ((i.ANSWER == "true") ? true : false)
  //                  }
  //                  this.ActualauditCheckListData[index].Child.push(i);
  //                }
  //                index += 1;
  //              });
  //            }
  //          });
  //          section.sectionGroup = this.ActualauditCheckListData;
  //          this.SectionGroup.push(section);
  //        }
  //      });
  //      this.auditCheckListModel.show();
  //    }
  //    else {
  //      this.toaster.error("No record found");
  //      setTimeout(() => {  this.loadSave = false}, 2000);;
  //      this.auditModel.show();
  //      this.auditCheckListModel.hide();
  //    }
  //  });
  //}

  //open(imageList: any[], index: number): void {
  //  // open lightbox
  //  var ImageObject = [];
  //  var currIndexImage = imageList[index];
  //  var index = 0;
  //  let tempindex = 0;
  //  imageList.forEach(x => {
  //    if (typeof x.attachment != "undefined" && x.attachment != null && x.attachment != "") {
  //      var obj = {
  //        src: x.attachment,
  //        caption: x.answer,
  //        thumb: x.attachment
  //      }
  //      if (currIndexImage.attachment == x.attachment) {
  //        index = tempindex;
  //      }
  //      ImageObject.push(obj);
  //      tempindex++;
  //    }
  //  });

  //  this._lightbox.open(ImageObject, index);
  //}
  //onSubmitAuditCheckList() {
  //  let SubmitModel: any[] = [];
  //  let SubmitModelChildModel: any[] = [];

  //  this.SectionGroup.forEach(sc => {
  //    sc.sectionGroup.forEach(s => {
  //      let obj: any = {};
  //      obj.QUESTION_ID = s.Main.QUESTION_ID;
  //      obj.SECTION_ID = s.Main.SECTION_ID;
  //      obj.SERVICE_APPT_ID = s.Main.SERVICE_APPT_ID;
  //      obj.Answer = s.Main.ANSWER;
  //      obj.Comment = s.Main.Comment;
  //      obj.IsCorrect = s.Main.IsCorrect == true ? 1 : 0;

  //      SubmitModel.push(obj);
  //      if (s.Child.length > 0) {
  //        s.Child.forEach(d => {

  //          let objChild: any = {};

  //          objChild.QUESTION_ID = d.QUESTION_ID;
  //          objChild.SECTION_ID = s.Main.SECTION_ID;
  //          objChild.SERVICE_APPT_ID = d.SERVICE_APPT_ID;
  //          objChild.Answer = d.ANSWER;
  //          objChild.Comment = '';
  //          objChild.IsCorrect = 0;
  //          SubmitModelChildModel.push(objChild);
  //        })
  //      }

  //    });
  //  });
  //  this.loadSave = true;
  //  this.JsonData.FormJsonData = JSON.stringify(SubmitModel);
  //  this.JsonData.subModuleCode = JSON.stringify(SubmitModelChildModel);
  //  this.serviceappointmentlistService.addEditAudit(this.JsonData).subscribe((result: any) => {
  //    if (result.statusCode == 200) {
  //      setTimeout(() => {
  //        this.toaster.success(result.responseMessage);
  //        setTimeout(() => {  this.loadSave = false}, 2000);;

  //      }, 1000);
  //      this.auditCheckListModel.hide();
  //    }
  //    else {
  //      this.toaster.error(result.responseMessage);
  //      setTimeout(() => {  this.loadSave = false}, 2000);;
  //    }
  //  }, error => {
  //    setTimeout(() => {  this.loadSave = false}, 2000);;
  //  });
  //  this.ActualauditCheckListData = [];
  //}

  appointmenttypedll(id: any) {
    //this.display_date = this.datetime.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')

    this.form_type = 'CALENDER';
    this.isDaySelected = false;
    this.currentPage = 1;
    if (id == 1) {
      this.searchColumn = 'SchedStartTime';
      this.appointmentTypeSelectedId = 1;
    } else if (id == 2) {
      this.searchColumn = 'DueDate';
      this.appointmentTypeSelectedId = 2;
    }

    this.fullcalendar.calendar.unselect();
    this.fullcalendar.calendar.refetchEvents();
    this.refresh();
    this.OnLoad();

  }
  //map data
  mapview() {
    this.isMapView = true;
    if (this.isCalenderView) {
      this.isCalenderView = false;
      this.isDaySelected = false;
    }

    this.optionsMap = {
      center: { lat: 47.500000, lng: -100.000000 },
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.form_type = 'Map'
    this.refresh();
  }
  handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
      let title = event.overlay.getTitle();


      const result = this.columndata.filter(function (x) { return x.id == event.overlay.customInfo; });
      let id = event.overlay.customInfo;

      this.AppointmentNumber = result[0].AppointmentNumber;
      this.WorkOrderNumber = result[0].WorkOrderNumber;
      this.SchedStartTime = result[0].SchedStartTime;
      this.name = result[0].name;
      this.address = result[0].address;
      this.addAssignedResourcesPopupModel.show(id);
      //this.infoWindow.setContent('' + title + '');
      //this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }

  }
  handleOverlayClickMap(event) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
      let title = event.overlay.getTitle();


      const result = this.mapdata.filter(function (x) { return x.id == event.overlay.customInfo; });
      let id = event.overlay.customInfo;
      if (result[0].Status == 'Completed') {
        this.toaster.error('This appointment is already completed. You can not edit completed appointments.');
      }
      else if (result[0].Status == 'Cancelled') {
        this.toaster.error('This appointment is already cancelled. You can not edit cancelled appointments.');
      }
      else {

        this.AppointmentNumber = result[0].AppointmentNumber;
        this.WorkOrderNumber = result[0].WorkOrderNumber;
        this.SchedStartTime = result[0].SchedStartTime;
        this.name = result[0].name;
        this.address = result[0].address;
        this.addAssignedResourcesPopupModel.show(id);
        //this.infoWindow.setContent('' + title + '');
        //this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());
      }  
    }

  }
  AddAssignedResources(appointmentid: any) {

    this.addAssignedResourcesPopupModel.show(appointmentid);
  }

  auditpopup(appointmentid: any, disable: boolean) {
    this.auditsPopupModel.show({ serviceAppointmentsId: appointmentid, disable: disable });
  }


  addMarker(object: any) {
    var parser = new DOMParser();

    let titleText = parser.parseFromString('Address: ' + object.address + '\nAccount : ' + object.AccountId, 'text/html');
    this.overlays.push(new google.maps.Marker({
      position: { lat: object.Latitude, lng: object.Longitude }, title: titleText.documentElement.textContent, customInfo: object.id, animation: google.maps.Animation.DROP, icon: (object.Status == 'None' || object.Status == null) ? '//maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png' : '//maps.google.com/mapfiles/ms/micons/green-dot.png'
    }));
  };

  LoadViewData() {
    // this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, 100, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedDatafor = this.commonService.pagedData;
      this.pagedDatafor.data.forEach(cnt => {
        if (cnt.is_default == true) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
        }
      });

    }, error => {
      // setTimeout(() => {  this.loadSave = false}, 2000);;
    },
      () => {
        // setTimeout(() => {  this.loadSave = false}, 2000);;
      });
  }
  SetManageViewValue(event, text) {

    this.custom_view_id = event;
    this.ViewModel = text;
    this.refresh();
    //this.LoadViewData();
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  showattendancemodel(id) {
    this.serviceappointmentid = id;
    const convertDateTime = new DateTimeToLocalForAddEditPipe;
    this.serviceappointmentlistService.AttendanceData(id).subscribe((response: any) => {
      while (this.fields.length != 0) {
        this.fields.removeAt(0);
      }
      this.attendanceData = [];
      this.attendanceData.length = 0;
      if (response) {
        let showMessage = false;
        this.SchEndDate = convertDateTime.transform(response.SchedEndTime, null)
        this.SchStartDate = convertDateTime.transform(response.SchedStartTime, null)
        var result = response as any;
        this.attendanceform.patchValue({
          ScheduleStartDate: moment(this.SchStartDate).format('L'),
          ScheduleEndDate: moment(this.SchEndDate).format('L')
          // ScheduleStartDate:moment(convertDateTime.transform(result[0].START_DATE, null)).format('L'), 
          // ScheduleEndDate: moment(convertDateTime.transform(result[0].END_DATE, null)).format('L')
        });
        let resources = []
        if (result.Temp_Json) {
          resources = result.Temp_Json.map(x => x.Name)
          resources = resources.filter(this.onlyUnique)
        }
        let schStartTime = moment(convertDateTime.transform(response.SchedStartTime, null)).format('HH:mm:ss');
        let schEndTime = moment(convertDateTime.transform(response.SchedEndTime, null)).format('HH:mm:ss');
        this.SchStartDate = moment(this.SchStartDate).format('MM-DD-YYYY');
        this.SchEndDate = moment(this.SchEndDate).format('MM-DD-YYYY');

        let difference = moment(this.SchEndDate).diff(moment(this.SchStartDate), 'days');
        for (let index = 0; index <= difference; index++) {
          let accodName = moment(this.SchStartDate).add(index, 'days').format('L')
          this.attendanceData.push(accodName);
          if (result.Temp_Json) {
            const today = result.Temp_Json.filter(x => x.AttendanceDate && moment(convertDateTime.transform(x.AttendanceDate, null)).format('L') == accodName);
            if (today.length > 0) {
              today.forEach(element => {
                this.fields.push(this.fb.group({
                  serviceResourceId: [element.ServiceResourceId],
                  attendanceid: [element.Service_AttendanceId],
                  resourcename: [element.Name],
                  hours: [element.hours],
                  isPresent: [element.Is_Present],
                  serviceAppointmentId: [element.ServiceAppointmentId],
                  attendanceDate: [accodName],
                  ScheduleStartDatewithTime: today.AttendanceDate ? today.AttendanceDate : this.commonService.getUserSelectedZoneToUTC(moment(accodName + ' ' + schStartTime))
                }));
              });
            }
            else {
              resources.forEach(element1 => {
                let Att = result.Temp_Json.find(x => x.Name = element1)
                this.fields.push(this.fb.group({
                  serviceResourceId: [Att.ServiceResourceId],
                  attendanceid: [Att.Service_AttendanceId],
                  resourcename: [Att.Name],
                  hours: [null],
                  isPresent: [1],
                  serviceAppointmentId: [Att.ServiceAppointmentId],
                  attendanceDate: [accodName],
                  // ScheduleStartDatewithTime : this.commonService.getUserSelectedZoneToUTC(moment(accodName + ' ' + ( difference== index ? schEndTime: schStartTime)))
                  ScheduleStartDatewithTime: this.commonService.getUserSelectedZoneToUTC(moment(accodName + ' ' + schStartTime))
                }));
              });
            }
          }
          else {
            this.fields.push(this.fb.array([]));
            showMessage = true;
          }

        };


        // const element = array[index];






        const length = result.length;
        // result.forEach((element, index) => {
        //   // this.attendanceData.push(moment(element.AccordionHeading).format('L'));
        //  // this.attendanceData.push(moment(convertDateTime.transform(element.SchedStartTime, null)).format('L'));
        //   if (element.Temp_Json) {
        //     element.Temp_Json.forEach(item => {
        //       this.fields.push(this.fb.group({
        //         serviceResourceId: [item.ServiceResourceId],
        //         attendanceid: [item.Service_AttendanceId],
        //         resourcename: [item.Name],
        //         hours: [item.hours],
        //         isPresent: [item.Is_Present],
        //         serviceAppointmentId: [item.ServiceAppointmentId],                  
        //         attendanceDate: [moment(convertDateTime.transform(element.AccordionHeading1,null)).format('L')],
        //         ScheduleStartDatewithTime:convertDateTime.transform(result[0].START_DATE, null), 
        //         ScheduleEndDatewithtime:convertDateTime.transform(result[0].END_DATE, null),   
        //       }));
        //     })
        //     showMessage = false;
        //   }
        //   else {
        //     this.fields.push(this.fb.array([]));
        //     showMessage = true;
        //   }

        // });



        if (showMessage) {
          this.toaster.info("No resources assigned");
        }
        this.attendancemodel.show();
      }
      else {
        this.toaster.error("Please Schedule appointment first")
      }
    });


  }
  childrenItems = [];
  getUniqueRow(obj: any) {
    let result = [];
    if (obj) {
      let data = obj.map(m => {
        return { 'QUESTION_ID': m.QUESTION_ID, 'QUESTION': m.QUESTION, 'ANSWER': m.ANSWER, 'VISIBLE_TO': m.VISIBLE_TO };
      });

      const key = 'QUESTION_ID';
      const finalResult = Array.from(new Map(data.map(item => [item[key], item])).values());

      result = finalResult;
    }
    return result;
  }




  onChangeCheckbox(event: any, id: any, s: any) {
    const checked = event.target.checked;

    if (checked) {
      s.Is_Present = true;
    }
    else {
      s.Is_Present = false;

    }
  }
  closeattendancepopup() {
    this.attendancemodel.hide();
  }
  onSubmitattendance() {

    if (this.attendanceform.value.fields.length == 1 && this.attendanceform.value.fields[0].toString() == "") { //1 length will be default because fields are initialized on page load
      this.toaster.info("No rows for submit");
    }
    else {
      this.attendancemodeldata = [];
      this.attendancemodeldata.length = 0;
      this.attendanceform.value.fields.filter(m => {
        if (Date.parse(m.attendanceDate) <= Date.parse(this.defaultDate)) {
          let curdatetime: any;

          //curdatetime = this.commonService.getUserSelectedZoneToUTC(moment(m.attendanceDate + ' ' + moment(m.ScheduleStartDatewithTime).format('HH:mm:ss')));
          curdatetime = m.ScheduleStartDatewithTime;
          // curdatetime = this.commonService.getUserSelectedZoneToUTC(m.ScheduleStartDatewithTime);
          m.attendanceDate = curdatetime;
          this.attendancemodeldata.push(m);
        }
      });
      if (this.attendancemodeldata) {
        this.attendancedata.jsondata = JSON.stringify(this.attendancemodeldata)
        this.serviceappointmentlistService.saveAttendanceData(this.attendancedata).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            setTimeout(() => {  this.loadSave = false}, 2000);;
            this.attendancemodel.hide()
          }
          else {
            this.toaster.error(result.responseMessage);
            setTimeout(() => {  this.loadSave = false}, 2000);;
          }
        })
      }
      else {
        this.toaster.error("future dates are readonly");
        setTimeout(() => {  this.loadSave = false}, 2000);;
      }
    }
  }

  ParseDate(RecDate) {
    if (RecDate) {
      return Date.parse(RecDate)
    }
  }
  private initForm() {
    this.attendanceform = this.fb.group({
      serviceResourceId: [null, Validators.required],
      ScheduleStartDate: [null],
      ScheduleEndDate: [null],
      attendanceid: [null],
      resourcename: [''],
      AttendanceDate: [this.defaultDate],
      hours: [''],
      isPresent: [false],
      ScheduleStartDatewithTime: [null],
      ScheduleEndDatewithtime: [null],
      fields: this.fb.array([this.buildFields()])
    });
  }
  buildFields(): FormGroup {
    return this.fb.group({
      serviceResourceId: [null, Validators.required],
      attendanceid: [null],

      resourcename: [''],
      AttendanceDate: [''],
      hours: [''],
      isPresent: [false],
    });
  }
  get fields(): FormArray {
    return this.attendanceform.get('fields') as FormArray;
  }
  get serviceResourceId() { return this.attendanceform.get('serviceResourceId'); }
  get attendanceid() { return this.attendanceform.get('attendanceid'); }
  get resourcename() { return this.attendanceform.get('resourcename'); }
  get AttendanceDate() { return this.attendanceform.get('AttendanceDate'); }
  get hours() { return this.attendanceform.get('hours'); }
  get isPresent() { return this.attendanceform.get('isPresent'); }

  /// added by nazir
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      this.dotCount += 1;
      this.checkNumberOnly = (event.target.value);
      var numericCheck = (event.target.value).toString();
      if (numericCheck.includes('.')) {
        this.dotCount += 1;
      }
      if (this.dotCount > 1) {
        this.dotCount = 0;
        return false;
      }
    }
    if (charCode > 31 && (charCode <= 45 || charCode > 57 || charCode == 47)) {
      return false;
    }
    this.checkNumberOnly = (event.target.value);
    if (this.checkNumberOnly != null) {

      var numeric = (event.target.value).toString();
      if (numeric.includes('.')) {
        var checkNumeric = numeric.split('.');
        if (checkNumeric.length > 2) {
          return false;
        }
        this.checkString = checkNumeric[1].split('');
        if (this.checkString.length > 1) {
          // this.toastrService.warning("Invalid value", "Warning");
          return false;
        }
      }
    }
    this.dotCount = 0;
    return true;
  }


  ToggleCalendarList() {
    this.showCalendarList = !this.showCalendarList;
  }
  ShowAppointmentDetail(servicesappointmentid) {
    this.servicesappointmentidCal = servicesappointmentid;
    this.ShowServiceAppointmentDetail(servicesappointmentid);
    this.GetAssignedResourcesList(servicesappointmentid);
    this.serviceAppointmentdetail.show();
  }
  closeAppointmentDetailpopup() {
    this.serviceAppointmentdetail.hide();
  }
  ShowServiceAppointmentDetail(servicesappointmentid) {
    // this.displayType = 'VIEW';
    this.formControlList = [];
    this.servicesappointmentlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, servicesappointmentid, 'VIEW').subscribe(result => {
      if (result) {
        this.customCompnentValues = this.servicesappointmentlistService.customFieldsList.data;

        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }
            this.formControlList.push(obj);
          }
        })
        const group: any = {};

        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          if (cnt.ColumnName == 'AppointmentNumber') {
            this.AppointmentNumber = cnt.value;
          }

          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
                else {
                  //cnt.value = null;
                }
              });
            }
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        setTimeout(() => {  this.loadSave = false}, 2000);;
        ////this.GetCustomFieldsListTopRow();
      }
    }, err => { setTimeout(() => {  this.loadSave = false}, 2000);; }, () => { setTimeout(() => {  this.loadSave = false}, 2000);; });
  }


  GetAssignedResourcesList(servicesappointmentid) {
    this.loadSave = true;
    this.servicesappointmentlistService.GetAssignedResourcesList(servicesappointmentid, this.sortColumn, this.currentPageAssignedRes, this.sortDir, this.pageSizeValueAssignedResList)
      .subscribe(resp => {
        this.lstAssignedResources = resp;
        this.AssignedResourcesCount = resp.pager.totalItems;

        if (resp.data.length > 0) {

          this.totalRecordsAssignedRes = resp.pager.totalItems;
        }
        else {
          this.totalRecordsAssignedRes = 0;
          this.currentPageAssignedRes = this.currentPageAssignedRes - 1;
          this.GetAssignedResourcesList(servicesappointmentid);
        }
        this.offset = this.currentPageAssignedRes;
        setTimeout(() => {  this.loadSave = false}, 2000);;
      }, error => {
        setTimeout(() => {  this.loadSave = false}, 2000);;
      });
  }

  setAssignedResourcesPageNo($event) {
    this.loadSave = true;
    this.currentPageAssignedRes = $event.page;
    this.GetAssignedResourcesList(this.servicesappointmentidCal);
  }

  setPageAssignedResList($event) {
    this.loadSave = true;
    this.currentPageAssignedRes = $event.page;
    this.GetAssignedResourcesList(this.servicesappointmentidCal);
  }

  onSortAssignedResList($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageAssignedRes = 1;
    this.GetAssignedResourcesList(this.servicesappointmentidCal);
  }

  switchClicked(event) {
    
    // if(this.listFilter.trim().length){}
    // this.listFiltertext = '';
    // this.myCheckbox = event.srcElement.checked
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {

      this.listFiltertext = "(tsa.AppointmentNumber like '%" + this.listFilter + "%' or acc.Name like '%" + this.listFilter + "%')";
      //"tsa.AppointmentNumber like '%" + this.listFilter + "%'";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.refresh();
    }
    else{
      this.refresh();
    }
  }

  SwitchListingViewGhant(e) {
    this.filterModal.clearAllFields();
    this.SwitchListingView('Gantt View');
  }
  public timeScaleOptions: TimeScaleModel = { enable: true, interval: 360 };

  SwitchListingView(data: string) {
    this.GetGhantViewTimeZone();
    this.getTimeZoneList();
    this.loadSave = true;
    this.isDisplayExportButton = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    const _data = data;
    this.serviceappointmentlistService.getGhantViewFilter().subscribe((result: any) => {
      if (result != null) {
        var filterDataValues = JSON.parse(result);

        var Data = filterDataValues[0].FilterJson;
        Data = JSON.parse(Data)

        if (Data.crewid == null && Data.resourceid == null && Data.departmentid == null
          && Data.worktypeid == null && Data.accountid == null && Data.teritoryid == null
          && Data.categoryid == null && Data.warehouseid == null && Data.sitesurveyZone == null
          && Data.testAccount == null) {
          this.changeFilterbtnColor = false;
        }
        else {
          this.changeFilterbtnColor = true;
        }
      }
    });

    if (_data == this.viewTypes.Ghant) {
      this.currentView = this.viewTypes.Ghant;
      this.dynamicClasss = 'fa fa-area-chart';
      //var element = document.getElementById("TabChange");
      //element.classList.addClass("fa fa-area-chart");
      if (this.viewType != 'Map Type View') {
        var ab = new Date()
        this.GetCrewResourceCalenderList(ab, null, true);
        this.GetCrewListForGanttView(ab, null);
      }
      if (this.viewType == 'Map Type View') {
        if (this.mapFrom == null && this.mapTo == null) {
          this.optionsGhantMap = {
            center: { lat: 47.500000, lng: -100.000000 },
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth();
          var firstDay = new Date(y, m, 1);
          var lastDay = new Date(y, m + 1, 0);
          this.mapFrom = this.datePipe.transform(firstDay);

          this.mapTo = this.datePipe.transform(lastDay);
        }
        this.GetMapGhantviewData(this.mapFrom, this.mapTo);
      }
      this.GetUnschedulledList();
      this.GetCrewResourceList(ab, null);
    }
    else if (_data == this.viewTypes.Calender) {
      this.currentView = this.viewTypes.Calender;

      this.display_date = this.datetime.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
      this.form_type = 'CALENDER';
      this.dynamicClasss = 'fa fa-calendar';
      //var element = document.getElementById("TabChange");
      //element.classList.addClass("fa fa-calendar");
      this.isWeekSelected = false;
      this.isDaySelected = false;

      this.OnLoad();
    }
    else if (_data == this.viewTypes.Map) {
      this.currentView = this.viewTypes.Map;
      this.isDaySelected = false;
      this.form_type = 'Map'
      this.dynamicClasss = 'fa fa-map-marker';
      this.optionsMap = {
        center: { lat: 47.500000, lng: -100.000000 },
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    }
    else {
      this.currentView = this.viewTypes.List;
      this.dynamicClasss = 'fa fa-list';
      this.form_type = 'LIST';
    }
    this.refresh();
    setTimeout(() => {  this.loadSave = false}, 2000);;
  };


  //hospitalData: Object[] = [
  //  {
  //    Id: 10,
  //    Name: 'David',
  //    StartTime: new Date(2018, 7, 1, 9, 0),
  //    EndTime: new Date(2018, 7, 1, 10, 0),
  //    Description: 'Health Checkup',
  //    DepartmentID: 1,
  //    ConsultantID: 1,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 11,
  //    Name: 'John',
  //    StartTime: new Date(2018, 7, 1, 10, 30),
  //    EndTime: new Date(2018, 7, 1, 11, 30),
  //    Description: 'Tooth Erosion',
  //    DepartmentID: 2,
  //    ConsultantID: 2,
  //    DepartmentName: 'DENTAL'
  //  }, {
  //    Id: 12,
  //    Name: 'Peter',
  //    StartTime: new Date(2018, 7, 1, 12, 0),
  //    EndTime: new Date(2018, 7, 1, 13, 0),
  //    Description: 'Eye and Spectacles Checkup',
  //    DepartmentID: 1,
  //    ConsultantID: 3,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 13,
  //    Name: 'Starc',
  //    StartTime: new Date(2018, 7, 1, 14, 0),
  //    EndTime: new Date(2018, 7, 1, 15, 0),
  //    Description: 'Toothaches',
  //    DepartmentID: 2,
  //    ConsultantID: 4,
  //    DepartmentName: 'DENTAL'
  //  }, {
  //    Id: 14,
  //    Name: 'James',
  //    StartTime: new Date(2018, 7, 1, 10, 0),
  //    EndTime: new Date(2018, 7, 1, 11, 0),
  //    Description: 'Surgery Appointment',
  //    DepartmentID: 1,
  //    ConsultantID: 5,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 15,
  //    Name: 'Jercy',
  //    StartTime: new Date(2018, 7, 1, 9, 30),
  //    EndTime: new Date(2018, 7, 1, 10, 30),
  //    Description: 'Tooth Sensitivity',
  //    DepartmentID: 2,
  //    ConsultantID: 6,
  //    DepartmentName: 'DENTAL'
  //  }, {
  //    Id: 16,
  //    Name: 'Albert',
  //    StartTime: new Date(2018, 7, 2, 10, 0),
  //    EndTime: new Date(2018, 7, 2, 11, 30),
  //    Description: 'Skin care treatment',
  //    DepartmentID: 1,
  //    ConsultantID: 7,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 17,
  //    Name: 'Louis',
  //    StartTime: new Date(2018, 7, 2, 12, 30),
  //    EndTime: new Date(2018, 7, 2, 13, 45),
  //    Description: 'General Checkup',
  //    DepartmentID: 1,
  //    ConsultantID: 9,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 18,
  //    Name: 'Williams',
  //    StartTime: new Date(2018, 7, 2, 12, 0),
  //    EndTime: new Date(2018, 7, 2, 14, 0),
  //    Description: 'Mouth Sores',
  //    DepartmentID: 2,
  //    ConsultantID: 10,
  //    DepartmentName: 'DENTAL'
  //  },
  //  {
  //    Id: 19,
  //    Name: 'David',
  //    StartTime: new Date(2018, 7, 2, 16, 30),
  //    EndTime: new Date(2018, 7, 2, 18, 15),
  //    Description: 'Eye checkup and Treatment',
  //    DepartmentID: 1,
  //    ConsultantID: 1,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 20,
  //    Name: 'John',
  //    StartTime: new Date(2018, 7, 2, 19, 30),
  //    EndTime: new Date(2018, 7, 2, 21, 45),
  //    Description: 'Toothaches',
  //    DepartmentID: 2,
  //    ConsultantID: 2,
  //    DepartmentName: 'DENTAL'
  //  }, {
  //    Id: 21,
  //    Name: 'Peter',
  //    StartTime: new Date(2018, 7, 3, 17, 30),
  //    EndTime: new Date(2018, 7, 3, 19, 30),
  //    Description: 'Surgery Treatment',
  //    DepartmentID: 1,
  //    ConsultantID: 3,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 22,
  //    Name: 'Starc',
  //    StartTime: new Date(2018, 7, 4, 18, 30),
  //    EndTime: new Date(2018, 7, 4, 21, 30),
  //    Description: 'Tooth Decay',
  //    DepartmentID: 2,
  //    ConsultantID: 4,
  //    DepartmentName: 'DENTAL'
  //  }, {
  //    Id: 23,
  //    Name: 'James',
  //    StartTime: new Date(2018, 7, 3, 19, 0),
  //    EndTime: new Date(2018, 7, 3, 21, 0),
  //    Description: 'General Checkup',
  //    DepartmentID: 1,
  //    ConsultantID: 5,
  //    DepartmentName: 'GENERAL'
  //  }, {
  //    Id: 24,
  //    Name: 'Jercy',
  //    StartTime: new Date(2018, 7, 4, 20, 0),
  //    EndTime: new Date(2018, 7, 4, 22, 0),
  //    Description: 'Tooth Erosion',
  //    DepartmentID: 2,
  //    ConsultantID: 6,
  //    DepartmentName: 'DENTAL'
  //  }];

  waitingList: any[] = [];


  @ViewChild('scheduleObj', { static: false })
  public scheduleObj: ScheduleComponent;

  public data: Object[] = null;
  //= <Object[]>extend([], this.calenderdatalist, null, true);

  //public data: Object[] = <Object[]>extend([], this.calenderdatalist, null, true);
  //private data: DataManager = new DataManager({
  // url: 'http://localhost:8530/serviceappointment/GetCrewResourceCalenderList',

  //  adaptor: new UrlAdaptor,
  //  crossDomain: true
  //});
  public employeeDataSource: Object[] = [];
  public CrewDataSource: Object[] = [];
  public rowAutoHeight: boolean = true;
  //public group: GroupModel = { enableCompactView: false, resources: ['Employee'] };
  public group: GroupModel = { enableCompactView: true, resources: ['Consultants', 'Employee'] };
  @ViewChild('treeObj', { static: false })
  public treeObj: TreeViewComponent;

  public isTreeItemDropped: boolean = false;
  public draggedItemId: string = '';
  public at: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  //this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  public selectedDate: Date = new Date();

  public showTimeIndicator: boolean = false;
  public enablePersistence: Boolean = false;
  public currView: View = 'TimelineWeek';
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
  //public departmentDataSource: Object[] = [
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
  //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
  //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
  //];
  //public consultantDataSource: Object[] = [
  //  { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
  //  { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
  //  { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
  //  { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
  //  { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
  //  { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
  //];
  //public group: GroupModel = { enableCompactView: false, resources: ['Departments', 'Consultants']};
  public allowMultiple: Boolean = false;
  //public eventSettings: EventSettingsModel = {

  //  dataSource: this.data,
  //  fields: {
  //    subject: { title: 'Patient Name', name: 'Name' },
  //    startTime: { title: 'From', name: 'StartTime' },
  //    endTime: { title: 'To', name: 'EndTime' },
  //    description: { title: 'Reason', name: 'Description' }
  //  }
  //};

  public field: Object = { dataSource: this.waitingList, id: 'Id', text: 'Name' };
  public allowDragAndDrop: boolean = true;

  getConsultantName(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
  }

  getConsultantStatus(value: ResourceDetails): boolean {
    let resourceName: string =
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
      return false;
    } else {
      return true;
    }
  }

  getConsultantDesignation(value: ResourceDetails): string {
    let resourceName: string =
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
      return '';
    } else {
      return (value as ResourceDetails).resourceData.Designation as string;
    }
  }

  getConsultantImageName(value: ResourceDetails): string {
    return this.getConsultantName(value).toLowerCase();
  }

  onItemDrag(event: any): void {
    if (this.scheduleObj.isAdaptive) {
      let classElement: HTMLElement = this.scheduleObj.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (event.target.classList.contains('e-work-cells')) {
        addClass([event.target], 'e-device-hover');
      }
    }
    if (document.body.style.cursor === 'not-allowed') {
      document.body.style.cursor = '';
    }
    if (event.name === 'nodeDragging') {
      let dragElementIcon: NodeListOf<HTMLElement> =
        document.querySelectorAll('.e-drag-item.treeview-external-drag .e-icon-expandable');
      for (let i: number = 0; i < dragElementIcon.length; i++) {
        dragElementIcon[i].style.display = 'none';
      }
    }
  }
  onRenderCell(args: RenderCellEventArgs, value: string): void {
    this.scheduleObj.startHour = '01: 00';

    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {

      let target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
      //(args.element as HTMLElement).style.background = differentTimeData[i].Color;

      target.innerHTML = `<div class="name"  >Crew/Resource Name </div>`;
    }
    // (args.element as HTMLElement).style.background = '#FF5722';

  }

  onActionBegin(event: ActionEventArgs): void {
    if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
      let treeViewdata: { [key: string]: Object }[] = this.treeObj.fields.dataSource as { [key: string]: Object }[];
      const filteredPeople: { [key: string]: Object }[] =
        treeViewdata.filter((item: any) => item.Id !== parseInt(this.draggedItemId, 10));
      this.treeObj.fields.dataSource = filteredPeople;
      let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.treeview-external-drag');
      for (let i: number = 0; i < elements.length; i++) {
        remove(elements[i]);
      }
    }
  }

  onTreeDragStop(event: DragAndDropEventArgs): void {

    let treeElement: Element = <Element>closest(event.target, '.e-treeview');
    let classElement: HTMLElement = this.scheduleObj.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement: Element = <Element>closest(event.target, '.e-content-wrap');
      if (scheduleElement) {
        let treeviewData: { [key: string]: Object }[] =
          this.treeObj.fields.dataSource as { [key: string]: Object }[];
        if (event.target.classList.contains('e-work-cells')) {
          const filteredData: { [key: string]: Object }[] =
            treeviewData.filter((item: any) => item.Id === parseInt(event.draggedNodeData.id as string, 10));
          let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
          //let draggedNodeData = event.draggedNodeData.id;

          let resourceDetails: ResourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
          let eventData: { [key: string]: Object } = {
            IsCrew: resourceDetails.resourceData.IsCrew,
            Id: event.draggedNodeData.id,
            // absenddate: resourceDetails.resourceData.absenddate,
            //abstartdate: resourceDetails.resourceData.abstartdate,
            Name: filteredData[0].Name,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
            Description: filteredData[0].Description,
            DepartmentID: resourceDetails.resourceData.GroupId,
            ConsultantID: resourceDetails.resourceData.Id,
            DurationType: filteredData[0].DurationType,
            EstimatedDuration: filteredData[0].EstimatedDuration
          };
          this.scheduleObj.openEditor(eventData, 'Add', true);
          this.isTreeItemDropped = true;
          this.draggedItemId = event.draggedNodeData.id as string;
        }
      }
    }
  }

  @HostListener("click", ["$event"])

  onFilterClick(event: any) {
    let ab: any;
    let ac: any;
    if (event.srcElement.classList != undefined && event.srcElement.classList != null && event.srcElement.offsetParent) {



      if (event.srcElement.classList[1] == undefined || event.srcElement.offsetParent.classList[0] == undefined) {
        ab = null;
        ac = null;
      }
      else {
        ab = event.srcElement.classList[1];
        ac = event.srcElement.offsetParent.classList[0];
      }
    }
    else {
      ab = null;
      ac = null;
    }

    if (ab == 'fa-filter' && ac == 'pull-right') {
      this.filterModal.show();


    }
    if (ab == 'fa-refresh' && ac == 'pull-right') {
      this.filterModal.clearallForm();
      this.filterData = null;
      var ad = new Date()
      // this.GetCrewResourceCalenderList(ad, null, true);
      // this.GetCrewResourceList();
      this.GetUnschedulledList();

    }

  }
  searchFilterCalender(e) {
    this.filterModal.show();
    // this.filterModal.show();
  }

  StartDate: any;
  onActionComplete(event: ActionEventArgs): void {
    // this.onFilterClick(null);
    if (event.requestType == "eventChanged") {
      this.loadSave = true;
      let data: any;
      data = event.data;
      this.StartDate = data[0].StartTime;
      this.currentDate = new Date();
      if (data[0].MainId.includes('Crew')) {
        data[0].logo = 1
      }
      else {
        data[0].logo = 0
      }

      var checkmain = data[0].MainId.slice(0, data[0].MainId.indexOf('-'));
      if (this.viewType != 'Customer Type View' && data[0].MainId == data[0].EmployeeId) {
        this.addupdateassignedResourceModel.viewtype = 'Customer Type View';
      }
      else if (this.viewType != 'Customer Type View' && ((data[0].MainId == data[0].EmployeeId) || data[0].EmployeeId == undefined) && (data[0].crewId == checkmain && data[0].EmployeeId == undefined)) {
        this.addupdateassignedResourceModel.viewtype = 'Customer Type View';
      }
      else {
        this.addupdateassignedResourceModel.viewtype = this.viewType;
      }

      const convertDateTime = new DateTimeToLocalForAddEditPipe;

      if (this.viewType == 'Customer Type View') {
        if (data[0].EmployeeId != undefined) {

          var main = data[0].MainId.slice(0, data[0].MainId.indexOf('-'));
          var employe = data[0].EmployeeId.slice(0, data[0].MainId.indexOf('-'));
          if (main != employe) {
            this.toaster.error('You cannot move and re-assign the service appointment.');
            this.callCurrentView(data[0].StartTime, data[0].EndTime)
            return
          }
        }
        else {
          this.toaster.error('You cannot move and re-assign the service appointment.');
          this.callCurrentView(data[0].StartTime, data[0].EndTime)
          return
        }
      }
      if (data[0].MainId != "-1") {
       

        if (data[0].mastervalue != 'Completed' && data[0].mastervalue != 'Cancelled') {

          var startdateMoment = moment(data[0].StartTime);
          var enddateMoment = moment(data[0].EndTime);


          //getting the difference in years
          var years = enddateMoment.diff(startdateMoment, 'years');

          //moment returns the total months between the two dates, subtracting the years
          var months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);

          //to calculate the days, first get the previous month and then subtract it
          startdateMoment.add(years, 'years').add(months, 'months');
          var days = enddateMoment.diff(startdateMoment, 'days')

          var diff = (data[0].StartTime.getTime() - data[0].EndTime.getTime()) / 1000;
          diff /= 60;
          var minute = Math.abs(Math.round(diff));
          if (this.addupdateassignedResourceModel.viewtype == 'Crew Type View' && data[0].MainId.includes('Resource')) {
            data[0].mastervalue = data[0].crewId;
            data[0].IsCrew = 1;
          }
          if (this.addupdateassignedResourceModel.viewtype != 'Customer Type View' && data[0].EmployeeId != undefined) {
            if (data[0].EmployeeId.includes('Crew')) {
              data[0].IsCrew = 1
            }
            else {
              data[0].IsCrew = 0
            }
          }

          if (data[0].EmployeeId == undefined && data[0].MainId.includes('Crew')) {
            data[0].MainId = data[0].MainId.slice(0, data[0].MainId.indexOf('-'));
            data[0].MainId = data[0].crewId;
            data[0].IsCrew = 1;
            data[0].mastervalue = data[0].MainId;
          }
          else {
            data[0].MainId = data[0].MainId.slice(0, data[0].MainId.indexOf('-'));

          }

          if (data[0].MainId == "-1") {
            event.cancel = true
          } else {

            if (this.timezoneid != 0) {
              data[0].StartTime = (data[0].StartTime == null ? null : this.commonService.getUserSelectedZoneToUTCghantView(data[0].StartTime, this.timezone));
              data[0].EndTime = (data[0].EndTime == null ? null : this.commonService.getUserSelectedZoneToUTCghantView(data[0].EndTime, this.timezone));

            }

            data[0].StartTime = (data[0].StartTime == null ? null : this.commonService.getUserSelectedZoneToUTC(data[0].StartTime));
            data[0].EndTime = (data[0].EndTime == null ? null : this.commonService.getUserSelectedZoneToUTC(data[0].EndTime));


            if (data[0].EmployeeId != undefined) {
              data[0].EmployeeId = data[0].EmployeeId.slice(0, data[0].EmployeeId.indexOf('-'));
              data[0].mastervalue = data[0].EmployeeId;
            }
            if (data[0].MainId == 'unassigne') {
              data[0].MainId = 0
            }

            this.addupdateassignedResourceModel.jsondata = JSON.stringify(data);
            this.serviceappointmentlistService.AddUpdateAssignedServiceAppointment(this.addupdateassignedResourceModel).subscribe((result: any) => {
              if (result == 1 || result == -9 || result == -10) {
                //var last: any;
                //var ab = new Date();
                //var date = this.StartDate,
                //  y = date.getFullYear(),
                //  m = date.getMonth();

                //var lastDay = new Date(y, m + 1, 0);
                //var firstDay = new Date(y, m, 1);
                //if (this.callenderCurrentView == 'Month') {
                //  last = lastDay;
                //  ab = firstDay;
                //}
                //else {
                //  last = ab;
                //}
                this.GetCrewResourceCalenderList(this.calstartDate, this.calendDate, true);

                this.GetCrewResourceList(this.calstartDate, this.calendDate);

                this.GetCrewListForGanttView(this.calstartDate, this.calendDate);
                if (result == 1) {
                  setTimeout(() => {  this.loadSave = false}, 2000);;
                  this.toaster.success('Appointment Assigned succesfully');
                }
                else if (result == -9) {

                  this.toaster.error('The resource is not operational at the selected time.');
                  setTimeout(() => {  this.loadSave = false}, 2000);;
                }

                else if (result == -10) {

                  this.toaster.error('You can not schedule appointment before 7AM and after 7PM');
                  setTimeout(() => {  this.loadSave = false}, 2000);;
                }
              }

              else {
                setTimeout(() => {  this.loadSave = false}, 2000);;
              }
            })
          }
        }
        else {
          //event.cancel = true;
          if (data[0].mastervalue == 'Completed') {
            this.toaster.error('This appointment is already completed. You can not edit completed appointments.');
          }
          if (data[0].mastervalue == 'Cancelled') {
            this.toaster.error('This appointment is already cancelled. You can not edit cancelled appointments.');
          }

          //var last= new Date(data[0].EndTime)
          //  var ab = new Date(data[0].StartTime);
          //  var yl = last.getFullYear(),
          //  var ml = last.getMonth();
          //  //var date = this.StartDate,
          //  y = ab.getFullYear(),
          //    m = ab.getMonth();


          //  var firstDay = new Date(y, m, 1);
          //  var lastDay = new Date(yl, ml + 1, 0);


          var last = new Date(data[0].EndTime);
          var ab = new Date(data[0].StartTime);
          //var date = new Date(),
          var y = ab.getFullYear();
          var m = ab.getMonth();
          var yl = last.getFullYear();
          var ml = last.getMonth();
          var firstDay = new Date(y, m, 1);
          var lastDay = new Date(yl, ml + 1, 0);
          if (this.callenderCurrentView == 'Month') {
            last = lastDay;
            ab = firstDay;
          }

          else {
            last = ab;
          }
          this.GetCrewResourceCalenderList(ab, last, true);

          setTimeout(() => {  this.loadSave = false}, 2000);;

        }
      }
      else {
        this.toaster.error('You cannot unassign the service appointment.');
        var last = new Date(data[0].EndTime);
        var ab = new Date(data[0].StartTime);
        //var date = new Date(),
        var y = ab.getFullYear();
        var m = ab.getMonth();
        var yl = last.getFullYear();
        var ml = last.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(yl, ml + 1, 0);
        if (this.callenderCurrentView == 'Month') {
          last = lastDay;
          ab = firstDay;
        }

        else {
          last = ab;
        }
        this.GetCrewResourceCalenderList(ab, last, true);
        setTimeout(() => {  this.loadSave = false}, 2000);;
      }





    }
    if (event.requestType === "viewNavigate" || event.requestType === "dateNavigate") {

      var currentViewDates = this.scheduleObj.getCurrentViewDates();
      var startDate = currentViewDates[0];
      this.calstartDate = startDate;
      var endDate = currentViewDates[currentViewDates.length - 1];
      this.calendDate = endDate;

      var startdateMoment = moment(startDate);
      var enddateMoment = moment(endDate);
      startdateMoment.add(years, 'years').add(months, 'months');
      var days = enddateMoment.diff(startdateMoment, 'days')

      if (days > 10) {
        this.callenderCurrentView = 'Month'
      }
      else if (days == 0) {
        this.callenderCurrentView = 'Day'

      }
      else {
        this.callenderCurrentView = 'Week';
      }

      this.GetCrewResourceCalenderList(startDate, endDate, true);

      this.GetCrewResourceList(startDate, endDate);

      this.GetCrewListForGanttView(startDate, endDate);

    }
    //----------do not delete this start here-----------------
    setTimeout(() => {
      let part = document.getElementById('btnFilter');
      if (part) {
        part.click();
      }
    }, 1000);
    //----------do not delete this end here-----------------
  }


  GetUnschedulledList(filterid: any = null, filtersearch: any = null) {
    this.loadSaveunSchd = true;
    this.serviceappointmentlistService.GetUnscheduledApptList(filterid, filtersearch)
      .pipe(take(1))
      .subscribe((resp: string) => {
        this.waitingList = [];
        this.field = { dataSource: this.waitingList, id: 'Id', text: 'Name' };
        if (resp) {
          this.waitingList = JSON.parse(resp);
          this.field = { dataSource: this.waitingList, id: 'Id', text: 'Name' };
          this.loadSaveunSchd = false;
        }
      }, (error) => { this.loadSaveunSchd = false; }, () => { this.loadSaveunSchd = false; });
  };

  GetCrewResourceList(starttime: any, endTime: any) {

    starttime = this.datePipe.transform(starttime)
    if (endTime != null) {
      endTime = this.datePipe.transform(endTime)
    }
    this.loadSave = true;
    
    this.serviceappointmentlistService.GetCrewResourceList(this.viewType, starttime, endTime)
      .pipe(take(1))
      .subscribe((resp: any) => {
        if (resp) {
          this.employeeDataSource = JSON.parse(resp);
          setTimeout(() => {  this.loadSave = false}, 2000);;
        }
      }, (error) => {
        setTimeout(() => {  this.loadSave = false}, 2000);;
      }, () => { });
  }


  callCurrentView(startime: any = null, endtime: any = null) {
    var last = new Date(endtime);
    var ab = new Date(startime);
    //var date = new Date(),
    var y = ab.getFullYear();
    var m = ab.getMonth();
    var yl = last.getFullYear();
    var ml = last.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(yl, ml + 1, 0);
    if (this.callenderCurrentView == 'Month') {
      last = lastDay;
      ab = firstDay;
    }

    else {
      last = ab;
    }

    this.GetCrewResourceCalenderList(ab, last, true);
    setTimeout(() => {  this.loadSave = false}, 2000);;
  }


  OnServiceCrewClick(data) {

    if (data.Id.includes('-')) {
      data.Id = data.Id.slice(0, data.Id.indexOf('-'));
    }
    let _data: Object = {

      id: data.Id,
      name: data.Text
    };
    this.ServiceCrewMembersPopup.show(_data);
  }
  GetCrewResourceCalenderList(cuurentdate: any, lastdate: any = null, isFirstTime: boolean = true, filters: any = null) {
    

    cuurentdate = this.datePipe.transform(cuurentdate)
    if (lastdate != null) {
      lastdate = this.datePipe.transform(lastdate)
    }
    this.serviceappointmentlistService.GetCrewResourceCalenderList(this.viewType, cuurentdate, lastdate, true, filters).subscribe((resp: any) => {
      const convertDateTime = new DateTimeToLocalForGhantView;
      if (resp) {
        this.calenderdatalist = this.serviceappointmentlistService.objectdata;

        this.calenderdatalist.forEach(m => {
          m.StartTime = (m.StartTime == null ? null : convertDateTime.transform(m.StartTime, null, this.timezone, this.timezoneid));
          m.EndTime = (m.EndTime == null ? null : convertDateTime.transform(m.EndTime, null, this.timezone, this.timezoneid));
        })
        let data: object[] = [];
        if (this.viewType == "Crew Type View") {

          this.calenderdatalist.forEach(m => {
            if (m.IsCrew == 1) {
              m = Object.keys(m).filter(key =>
                key !== 'EmployeeId').reduce((obj, key) => {
                  obj[key] = m[key];
                  return obj;
                }, {}
                );
              data.push(m);
            } else {
              data.push(m);
            }
          })
          //data = this.calenderdatalist;
        }
        else {
          data = this.calenderdatalist;
        }




        this.BindToScheduler(data);
        //let DateScheduleStartTime = (result.ServiceAppoitnt[0].ScheduleStartTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ScheduleStartTime, null));
        //let DateScheduleEndTime = (result.ServiceAppoitnt[0].ScheduleEndTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ScheduleEndTime, null));


      }

    })
  }

  BindToScheduler(tempData: any) {

    this.data = <Object[]>extend([], tempData, null, true);

    this.eventSettings.dataSource = this.data;
    this.scheduleObj.collapseResource(38,'AZ Crew 1');
    if(this.scheduleObj != undefined)
    {
       this.scheduleObj.eventSettings.dataSource = this.data;
    }
   
    this.onCreated();
  };


  public eventSettings: EventSettingsModel = {

    dataSource: this.data,
    enableTooltip: true
    //dataSource: this.data,


  };
  onCreated(): void {
    let currTime: Date = new Date();
    let hours: string = currTime.getHours() < 10 ? '0' + currTime.getHours().toString() : currTime.getHours().toString();
    let minutes: string = currTime.getMinutes().toString();
    let time: string = hours + ':' + minutes;
    let weektime: string = '1:00';
    if (this.callenderCurrentView == 'Month') {
      this.scheduleObj.scrollTo(null, currTime);
    }
    else if (this.callenderCurrentView == 'Day') {
      this.scheduleObj.scrollTo(weektime);
    }
    else {
      if(this.scheduleObj != undefined){

        this.scheduleObj.scrollTo(null, currTime);
      }
      
    }

  }
  getEmployeeName(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
  }
  getEmployeeDesignation(value: ResourceDetails): string {
    let resourceName: string =
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    return (value as ResourceDetails).resourceData.Designation as string;
  }
  getEmployeeImageName(value: ResourceDetails): string {
    return this.getEmployeeName(value).toLowerCase();
  }
  starttime: Date = new Date();
  endtime: Date = new Date();
  onPopupOpen(args: PopupOpenEventArgs) {
    args.cancel = true;

    if (!args.data.IsReadonly) {
      if (args.type == "EventContainer") {

        args.cancel = false;
      }
      if (args.type == 'QuickInfo') {
        if (this.viewType != 'Customer Type View') {
          args.data.MainId = args.data.MainId.slice(0, args.data.MainId.indexOf('-'));
        }
        if (args.data.mastervalue != "Completed" && args.data.mastervalue != "Cancelled") {
          if (args.data.Id != undefined && args.data.Id != null && args.data.Id != '') {
            if (args.data.IsCrew == '0' && args.data.MainId != "-1") {
              var resourceId = args.data.MainId;
            }
            else if (args.data.IsCrew == '1' && args.data.MainId != "-1") {
              var crewId = args.data.MainId;
            }
            if (this.viewType != 'Customer Type View') {

              this.addAssignedResourcesPopupModel.show(args.data.Id, resourceId, crewId, null, null, null, this.timezoneid, this.timezone);
            } else {
              this.addAssignedResourcesPopupModel.show(args.data.Id, null, null, null, null, null, this.timezoneid, this.timezone);
            }


          }
          else {
            this.toaster.error('Please drop  the appointment from right side')
          }
        }

        else {
          if (args.data.mastervalue == "Completed") {
            this.toaster.error('This appointment is already completed. You can not edit completed appointments.');
          }
          else {
            this.toaster.error('This appointment is already cancelled. You can not edit cancelled appointments.');
          }

        }

      }
      if (args.type == 'Editor') {

        const convertDateTime = new DateTimeToLocalForAddEditPipe;
        args.data.ConsultantID = args.data.ConsultantID.slice(0, args.data.ConsultantID.indexOf('-'));
        //if (args.data.abstartdate != null && args.data.absenddate != null) {
        //  if (args.data.abstartdate != null && args.data.absenddate != null) {
        //    args.data.abstartdate = convertDateTime.transform(args.data.abstartdate, null)//.commonService.getUserSelectedZoneToUTC(data[0].abstartdate);
        //    var absdasd = convertDateTime.transform(args.data.abstartdate, null)//.commonService.getUserSelectedZoneToUTC(data[0].abstartdate);
        //    args.data.absenddate = convertDateTime.transform(args.data.absenddate, null)//this.commonService.getUserSelectedZoneToUTC(data[0].abenddate);
        //    var add = convertDateTime.transform(args.data.absenddate, null)//this.commonService.getUserSelectedZoneToUTC(data[0].abenddate);
        //    var asss = args.data.StartTime.getTime();




        //    if ((args.data.StartTime.getTime() >= args.data.abstartdate.getTime() && args.data.StartTime.getTime() <= args.data.absenddate.getTime())) {
        //      this.toaster.error(`This resource is on leave from "${args.data.abstartdate}" to "${args.data.absenddate}"  .You cannot assign the service appointment in this time.`);
        //      this.callCurrentView(this.calstartDate, this.calendDate);
        //      return;
        //    }
        //    else if ((args.data.EndTime.getTime() >= args.data.abstartdate.getTime() && args.data.EndTime.getTime() <= args.data.absenddate.getTime())) {
        //      this.toaster.error(`This resource is on leave from "${args.data.abstartdate}" to "${args.data.absenddate}"  .You cannot assign the service appointment in this time.`);
        //      this.callCurrentView(this.calstartDate, this.calendDate)
        //      return;
        //    }


        //  }

        //}
        if (args.data.ConsultantID != undefined && args.data.ConsultantID != null && args.data.ConsultantID != '') {

          var currentDate = new Date();

          //let starttime12: any = args.data.StartTime;
          this.starttime = new Date(args.data.StartTime);


          this.endtime = new Date(args.data.StartTime);
          if (args.data.DurationType == "Hours") {
            this.endtime.setHours(this.endtime.getHours() + args.data.EstimatedDuration)
          }
          else if (args.data.DurationType == "Minutes") {
            this.endtime.setMinutes(this.endtime.getMinutes() + args.data.EstimatedDuration);

          }
          else {
            this.endtime = null;
          }


          if (args.data.IsCrew == '0' && args.data.ConsultantID != "-1") {
            var resourceId = args.data.ConsultantID;
          }
          else if (args.data.IsCrew == '1' && args.data.ConsultantID != "-1") {
            var crewId = args.data.ConsultantID;
          }

          this.addAssignedResourcesPopupModel.show(args.data.Id, resourceId, crewId, this.starttime, this.endtime, 'drag', this.timezoneid, this.timezone);

        }


      }
    }
    //else {
    //  this.toaster.error('You cannot edit the appointments which is assign to crew.');
    //}

  }


  getDateHeaderText: Function = (value: Date) => {
    return this.instance.formatDate(value, { skeleton: 'Ed' });
  };
  worktypeid: any = null;

  getFilterData(event) {
    var Data = JSON.parse(event.data);

    if (event.isClearFilter=='false') {
      this.changeFilterbtnColor = true;
      this.GetUnschedulledList(null, this.unscheduleFilter);
    }
    else {
      this.changeFilterbtnColor = false;
      this.GetUnschedulledList(null, this.unscheduleFilter);
    }
    if (Data.accountid == null && Data.categoryid == null && Data.crewid == null && Data.departmentid == null && Data.resourceid == null && Data.sitesurveyZone == null
      && Data.teritoryid == null && Data.testAccount == null && Data.warehouseid == null && Data.worktypeid == null  ) {
      this.changeFilterbtnColor = false;
    }

    this.isShow = false;
    var datateritory = JSON.parse(event)
    this.GetGhantViewTimeZone(datateritory.teritoryid);
    this.getTimeZoneList(datateritory.teritoryid);
    this.filterData = event;
    this.loadSave = true;
    var data = JSON.parse(event)
    // this.worktypeid = data.worktypeid
    if (event != null) {
      this.GetUnschedulledList(event);
    }
    else {
      this.GetUnschedulledList();
    }
    //var ab = new Date()
    var last: any;
    var startdate: any
    var ab = new Date();
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();

    var lastDay = new Date(y, m + 1, 0);
    var firstDay = new Date(y, m, 1);
    if (this.callenderCurrentView == 'Month') {
      last = lastDay;
      ab = firstDay;
    }

    else {
      last = ab;
    }
    last = this.datePipe.transform(last)
    if (ab != null) {
      startdate = this.datePipe.transform(ab)
    }
    if (this.viewType == "Map Type View") {
      this.GetMapGhantviewData(this.mapFrom, this.mapTo, event);
    }
    this.GetCrewListForGanttView(startdate, last)
    this.serviceappointmentlistService.GetCrewResourceList(this.viewType, startdate, last, event)
      .pipe(take(1))
      .subscribe((resp: any) => {
        this.employeeDataSource = [];
        if (resp) {
          this.employeeDataSource = JSON.parse(resp);
          //this.data = <Object[]>extend([], this.calenderdatalist, null, true)
        }
      }, (error) => { }, () => { });
  
    setTimeout(() => {  this.loadSave = false}, 2000);;
  };

  oneventRendered(args: EventRenderedArgs): void {

    if (args.data.Color != null && args.data.Color != 'null' && args.data.Color != undefined) {
      args.element.style.backgroundColor = args.data.Color;
    }
    //let categoryColor: string = args.data.CategoryColor as string;
    //if (!args.element || !categoryColor) {
    //  return;
    //}
    //if (this.scheduleObj.currentView === 'Agenda') {
    //  (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    //} else {
    //  args.element.style.backgroundColor = categoryColor;
    //}
  }

  onNumberClick(phoneNo) {

    this.PhoneNo = phoneNo;
    this.isVisibleDialer = true;
    this.app.ShowDialer({ phoneNo: this.PhoneNo, visible: this.isVisibleDialer, defaultValue: true, Minimize: false });
  }

  closeWelcomeCall() {
    this.PhoneNo = '';
    this.isVisibleDialer = false;
    this.app.ShowDialer({ phoneNo: this.PhoneNo, visible: this.isVisibleDialer, defaultValue: false });

  }

  //eventMouseEnter(model) {
  //  this.popupdata = model.event._def.extendedProps
  //  document.getElementById("myForm").style.display = "block";
  //}
  //eventMouseLeave(model) {
  //  document.getElementById("myForm").style.display = "none";
  //}
  onMoreEventsClick(args: MoreEventsClickArgs): void {
    //args.isPopupOpen = false;
  }
  GetCrewListForGanttView(starttime: any = null, endTime: any = null) {

    starttime = this.datePipe.transform(starttime)
    if (endTime != null) {
      endTime = this.datePipe.transform(endTime)
    }
    this.loadSave = true;
    this.serviceappointmentlistService.GetCrewListForGanttView(this.viewType, starttime, endTime)
      .pipe(take(1))
      .subscribe((resp: any) => {     
        if (resp) {
          this.CrewDataSource = JSON.parse(resp);
          //this.data = <Object[]>extend([], this.calenderdatalist, null, true)
          setTimeout(() => {  this.loadSave = false}, 2000);;
        }
      }, (error) => {
        setTimeout(() => {  this.loadSave = false}, 2000);;
      }, () => { });
  }

  UnLock(a) {

    if (a == false) {

      this.locktooltip = 'UnLock';
      this.isreadonly = true;
      var last: any;
      var ab = new Date();
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();

      var lastDay = new Date(y, m + 1, 0);
      var firstDay = new Date(y, m, 1);
      if (this.callenderCurrentView == 'Month') {
        last = lastDay;
        ab = firstDay;
      }
      else {

        last = ab;
      }

      //this.GetCrewResourceCalenderList(ab, last, true);

      this.GetCrewResourceCalenderList(this.calstartDate, this.calendDate, true);

    }
    else {

      this.isreadonly = false;
      this.locktooltip = "Lock";

      var last: any;
      var ab = new Date();
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();

      var lastDay = new Date(y, m + 1, 0);
      var firstDay = new Date(y, m, 1);
      if (this.callenderCurrentView == 'Month') {
        last = lastDay;
        ab = firstDay;
      }

      else {

        last = ab;
      }

      //this.GetCrewResourceCalenderList(ab, last, true);
      this.GetCrewResourceCalenderList(this.calstartDate, this.calendDate, true);


    }

  }
  getGhantViewType() {
    this.commonService.getMasterItemsList("ghantviewtypes").subscribe((result: any) => {

      this.ghantviewtypes = this.commonService.masters;

      let datagh: any;
      datagh = this.ghantviewtypes.filter(m => m.text == "Resource Type View")
      this.viewDdl = datagh[0].value;
      
    })
    this.dynamicClasss = 'fa fa-area-chart';
  }

  setViewType(utype: any) {
    if (typeof utype === 'undefined') {
      this.searchUserType = '';
    } else {
      this.viewType = utype.text;
      //this.SwitchListingView(this.viewTypes.Ghant)
      this.viewDdl = utype.value;
      this.saveSa_Data.ghantviewtype = utype.value;
      this.serviceappointmentlistService.SaveGhantViewFilter(this.saveSa_Data).subscribe((result: any) => {
        this.toaster.success(`"${utype.masterName}" applied successfully on gantt chart.`)

      })
      if (this.viewType != 'Map Type View') {



        this.GetUnschedulledList();
        var last: any;
        var ab = new Date();
        var date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();

        var lastDay = new Date(y, m + 1, 0);
        var firstDay = new Date(y, m, 1);
        if (this.callenderCurrentView == 'Month') {
          last = lastDay;
          ab = firstDay;
        }

        else {
          last = ab;
        }

        this.GetCrewResourceList(ab, last);
        this.GetCrewResourceCalenderList(ab, last, true);
        this.GetCrewListForGanttView(ab, last);
      } else {
        this.SwitchListingView(this.viewTypes.Ghant)
      }
    }
    // this.searchUserType = utype.value;

  }
  //restddl() {

  //  this.GetUnschedulledList();
  //  var last: any;
  //  var ab = new Date();
  //  var date = new Date(),
  //    y = date.getFullYear(),
  //    m = date.getMonth();

  //  var lastDay = new Date(y, m + 1, 0);
  //  var firstDay = new Date(y, m, 1);
  //  if (this.callenderCurrentView == 'Month') {
  //    last = lastDay;
  //    ab = firstDay;
  //  }

  //  else {
  //    last = ab;
  //  }

  //  this.GetCrewResourceList(ab, last);
  //  this.GetCrewResourceCalenderList(ab, last, true);
  //  this.GetCrewListForGanttView(ab, last);

  //  let data: any;
  //  data = this.ghantviewtypes.filter(m => m.text == "Resource Type View")
  //  this.viewDdl = data[0].value;
  //}

  setSa_View(e: any) {

    if (e != undefined) {
      this.viewtypeid = e.value;
      this.viewtypevalue = e.text;
      this.saveSa_Data.Sa_viewtype = e.value;
    }
    else {
      this.viewtypeid = null;
    }
  }
  saveSa_View() {
    if (this.viewtypeid != null) {


      this.saveSa_Data.Sa_viewtype = this.viewtypeid;
      this.serviceappointmentlistService.SaveGhantViewFilter(this.saveSa_Data).subscribe((result: any) => {
        this.toaster.success('View applied successfully.')
        if (this.viewtypevalue != 'Gantt View') {
          this.SwitchListingView(this.viewtypevalue);
        }
        else {
          this.SwitchListingViewGhant(this.viewtypevalue);
        }
        this.settingModel.hide();
      })
    }
    else {
      this.toaster.error('Please select atleast one view.')
    }
  }
  openSettingPopup() {
    this.settingModel.show();
  }
  closeSettingPopup() {
    this.settingModel.hide();
  }
  ghantviewRefresh() {
    //this.filterModal.clearallForm();
    this.filterData = null;
    var ad = new Date()
    this.GetMapGhantviewData(this.mapFrom, this.mapTo);
    this.GetCrewResourceCalenderList(this.calstartDate, this.calendDate, true);
    this.GetCrewResourceList(this.calstartDate, this.calendDate);
    this.GetCrewListForGanttView(this.calstartDate, this.calendDate)
    this.GetUnschedulledList();
  }
  ghantviewFilter() {
    this.filterModal.show();
  }
  leftMove() {
    if (this.callenderCurrentView == 'Week') {

      this.calstartDate.setDate(this.calstartDate.getDate() - 7);
      this.GetCrewResourceCalenderList(this.calstartDate, this.calstartDate, true);

      this.GetCrewResourceList(this.calstartDate, this.calstartDate);

      this.GetCrewListForGanttView(this.calstartDate, this.calstartDate);
    }
    else if (this.callenderCurrentView == 'Month') {
      //var date = this.calstartDate;
      this.calstartDate.setMonth(this.calstartDate.getMonth() - 1);
      var monthStartDay = new Date(this.calstartDate.getFullYear(), this.calstartDate.getMonth(), 1);
      var monthEndDay = new Date(this.calstartDate.getFullYear(), this.calstartDate.getMonth() + 1, 0);
      this.calstartDate = monthStartDay;
      this.calendDate = monthEndDay;


      var first = this.datePipe.transform(monthStartDay);

      var last = this.datePipe.transform(monthEndDay);
      this.GetCrewResourceCalenderList(first, last, true);

      this.GetCrewResourceList(first, last);

      this.GetCrewListForGanttView(first, last);
    }
    else {

      this.calstartDate.setDate(this.calstartDate.getDate() - 1);
      this.calstartDate.toString();

      var yesterdaydate = this.datePipe.transform(this.calstartDate);
      this.GetCrewResourceCalenderList(yesterdaydate, yesterdaydate, true);

      this.GetCrewResourceList(yesterdaydate, yesterdaydate);

      this.GetCrewListForGanttView(yesterdaydate, yesterdaydate);
    }
    this.selectedDate = this.calstartDate;

  }
  RightMove() {
    if (this.callenderCurrentView == 'Week') {

      this.calstartDate.setDate(this.calstartDate.getDate() + 7);
      this.GetCrewResourceCalenderList(this.calstartDate, this.calstartDate, true);

      this.GetCrewResourceList(this.calstartDate, this.calstartDate);

      this.GetCrewListForGanttView(this.calstartDate, this.calstartDate);
    }
    else if (this.callenderCurrentView == 'Month') {
      //var date = this.calstartDate;
      this.calstartDate.setMonth(this.calstartDate.getMonth() + 1);
      var monthStartDay = new Date(this.calstartDate.getFullYear(), this.calstartDate.getMonth(), 1);
      var monthEndDay = new Date(this.calstartDate.getFullYear(), this.calstartDate.getMonth() + 1, 0);
      this.calstartDate = monthStartDay;
      this.calendDate = monthEndDay;


      var first = this.datePipe.transform(monthStartDay);

      var last = this.datePipe.transform(monthEndDay);
      this.GetCrewResourceCalenderList(first, last, true);

      this.GetCrewResourceList(first, last);

      this.GetCrewListForGanttView(first, last);
    }
    else {

      this.calstartDate.setDate(this.calstartDate.getDate() + 1);
      this.calstartDate.toString();

      var yesterdaydate = this.datePipe.transform(this.calstartDate);
      this.GetCrewResourceCalenderList(yesterdaydate, yesterdaydate, true);

      this.GetCrewResourceList(yesterdaydate, yesterdaydate);

      this.GetCrewListForGanttView(yesterdaydate, yesterdaydate);
    }
    this.selectedDate = this.calstartDate;
  }

  ExportTOExcel() {
    
    this.loadSave = true;
    this.rowsForExport = [];
    this.serviceappointmentlistService.GetServiceAppointmentList(this.listFiltertext, this.sortColumn, this.currentPage, this.totalPageSizeForExport, this.sortDir, this.loginuserid,
          this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter, this.form_type, this.display_date, this.isDaySelected, this.searchColumn,
          this.isWeekSelected, this.myCheckbox, false, 0)
          .pipe(takeUntil(this.subscriber))
      .subscribe(response => {
        
        this.jsonData = response as [];
        if (this.jsonData.data.length > 0) {
          this.columndata = this.jsonData.data;
          this.columnheading = this.jsonData.schema;
          var json;
          let columnheading;
          var $this = this;
          var dataArary = [];
          for (var i = 0; i < this.columndata.length; i++) {
            var obj = {};
            for (var j = 0; j < this.columnheading.length; j++) {
              var columnName = this.columnheading[j].COLUMN_NAME;
              var item = this.columndata[i];
              if (this.columnheading[j].DATA_TYPE == 'datetime' || this.columnheading[j].DATA_TYPE == 'date') {
                obj[this.columnheading[j].DISPLAY_NAME] = this.dateTimeToLocal.transform(item[columnName] == '' ? null : item[columnName], '');
              }
              else if (this.columnheading[j].DATA_TYPE == 'bit' || this.columnheading[j].DATA_TYPE == 'bit') {
                if (item[columnName] == false) {
                  obj[this.columnheading[j].DISPLAY_NAME] = 'No';
                }
                else {
                  obj[this.columnheading[j].DISPLAY_NAME] = 'Yes';
                }
              }
              else if (this.columnheading[j].COLUMN_NAME == 'Status') {
                var accutalldata;
                var values = item[columnName];
                if (values != null && values != '') {
                  var responses = values.substring(values.indexOf(":"));
                  accutalldata = values.replace(responses, '');
                  obj[this.columnheading[j].DISPLAY_NAME] = accutalldata;
                }
                else {
                  obj[this.columnheading[j].DISPLAY_NAME] = values;
                }

              }
              else {
                obj[this.columnheading[j].DISPLAY_NAME] = item[columnName];
              }

            }

            dataArary.push(obj);
          }
          this.commonService.ExportData(dataArary, 'Excel', "Service_Appointments", null);
        

        } else { }
      }, 
      error => {
        
        setTimeout(() => {  this.loadSave = false}, 2000);;
        // console.log(error);
      },);
      setTimeout(() => {  this.loadSave = false}, 2000);
    }

  generatePdf() {
    
    this.loadSave = true;
    this.rowsForExport = [];
    this.serviceappointmentlistService.GetServiceAppointmentList(this.listFiltertext, this.sortColumn, this.currentPage, this.totalPageSizeForExport, this.sortDir, this.loginuserid,
        this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter, this.form_type, this.display_date, this.isDaySelected, this.searchColumn,
        this.isWeekSelected, this.myCheckbox, false, 0).subscribe( response => {
        
        let data = response;
        // console.log(data);

        this.jsonData = response as [];
        if (this.jsonData.data.length > 0) {
          this.columndata = this.jsonData.data;
          this.columnheading = this.jsonData.schema;

          var json;
          let columnheading;
          var $this = this;
          var dataArary = [];


          for (var i = 0; i < this.columndata.length; i++) {
            var obj = {};
            for (var j = 0; j < this.columnheading.length; j++) {
              var columnName = this.columnheading[j].COLUMN_NAME;
              var item = this.columndata[i];
              if (this.columnheading[j].DATA_TYPE == 'datetime' || this.columnheading[j].DATA_TYPE == 'date') {
                obj[this.columnheading[j].DISPLAY_NAME] = this.dateTimeToLocal.transform(item[columnName] == '' ? null : item[columnName], '');
              }
              else if (this.columnheading[j].DATA_TYPE == 'bit' || this.columnheading[j].DATA_TYPE == 'bit') {
                if (item[columnName] == false) {
                  obj[this.columnheading[j].DISPLAY_NAME] = 'No';
                }
                else {
                  obj[this.columnheading[j].DISPLAY_NAME] = 'Yes';
                }
              }
              else if (this.columnheading[j].COLUMN_NAME == 'Status') {
                var accutalldata;
                var values = item[columnName];
                if (values != null && values != '') {
                  var responses = values.substring(values.indexOf(":"));
                  accutalldata = values.replace(responses, '');
                  obj[this.columnheading[j].DISPLAY_NAME] = accutalldata;
                }
                else {
                  obj[this.columnheading[j].DISPLAY_NAME] = values;
                }

              }
              else {
                obj[this.columnheading[j].DISPLAY_NAME] = item[columnName];
              }

            }

            dataArary.push(obj);
          }
          ;
          this.commonService.ExportData(dataArary, 'PDF', "Service_Appointments", "Large");
        } else { }
        setTimeout(() => { this.loadSave = false }, 2000);;
      },

        error => {
          setTimeout(() => { this.loadSave = false }, 2000);;
          // console.log(error);
        });

    setTimeout(() => { this.loadSave = false }, 2000);
  }

  download(data) {
    if (data == 'excel') {
      this.ExportTOExcel();
    }
    else if (data == 'pdf') {
      this.generatePdf();
    }
  }
  CompleteRenderFn(event) {
    if (event.value == 'Calender View') {
      this.SwitchListingView('Calender View');
    }
    else if (event.value == 'List View') {
      this.SwitchListingView('List View');
    }
    else if (event.value == 'Gantt Chart View') {
      this.SwitchListingViewGhant('Gantt View');
    }
    else if (event.value == 'Map View') {
      this.SwitchListingView('Map View');
    }
  }
  getRecoarding() {
    let viewForDisplay = [{ text: "List View", value: "List View" }, { text: "Gantt Chart View", value: "Gantt Chart View" }, { text: "Map View", value: "Map View" },
    { text: "Calender View", value: "Calender View" }];
    this.lstbuttonsdata = viewForDisplay;
  }
  goToPage(e: any) {
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      this.Delete(e.row)
    }
    if (e.page.name == "view") {
      this.router.navigateByUrl('/lead/view/' + e.row.Id);
    }
    if (e.page.name == "Scheduled") {
      this.AddAssignedResources(e.row.Id)
    }
    if (e.page.name == "Audit") {
      this.auditpopup(e.row.Id, false)
    }
    if (e.page.name == "View Audit") {
      this.auditpopup(e.row.Id, true)
    }
    if (e.page.name == "Attendance") {
      this.showattendancemodel(e.row.Id)
    }
  };

  curPageemit(e) {

    return this.offset;
  }

  selectdata(e) {
    this.deleteId = '';
    this.deleteId = e;

  }
  MainMethod(e: any) {
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
  }
  mapDateFilter(e: any, ev: any) {
    this.rangeDates = null;
    document.getElementById('Day').classList.remove('active');
    document.getElementById('Week').classList.remove('active');
    document.getElementById('Month').classList.remove('active');
    ev.target.classList.add('active');
    if (e == "day") {
      var myDate = new Date();
      var todaydate = this.datePipe.transform(myDate);
      this.mapFrom = todaydate;
      this.mapTo = todaydate;
    }
    else if (e == "week") {
      var current = new Date();
      var weekstart = current.getDate() - current.getDay() + 1;
      var last = weekstart + 6;
      var monday = new Date(current.setDate(weekstart));
      var sunday = new Date(current.setDate(last));
     
      this.mapFrom = this.datePipe.transform(monday)
      this.mapTo= this.datePipe.transform(sunday);

    }
    else if (e == "month") {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);

     
      

      this.mapFrom = this.datePipe.transform(firstDay);

      this.mapTo = this.datePipe.transform(lastDay);
    }
   
    
    this.GetMapGhantviewData(this.mapFrom, this.mapTo);
  }
  OnChangedDateRange(event: any) {
    this.mapFrom = null;

    this.mapTo = null;
    
    this.mapFrom = this.datePipe.transform(this.rangeDates[0]);
    if (this.rangeDates[1] != null) {
      this.mapTo = this.datePipe.transform(this.rangeDates[1]);
     
    }

    if (this.mapFrom != null && this.mapTo != null) {
      this.GetMapGhantviewData(this.mapFrom, this.mapTo);

     

    }
    
  }
  GetMapGhantviewData(starttime: any, endTime: any, filter: any = null) {
    this.loadSave = true;
    this.overlaysMap = [];
    starttime = this.datePipe.transform(starttime)
    if (endTime != null) {
      endTime = this.datePipe.transform(endTime)
    }
    this.serviceappointmentlistService.GetMapGhantviewData(starttime, endTime, filter)
      .subscribe((resp: any) => {
        if (resp) {
          if (resp != null) {
            this.mapdata = JSON.parse(resp);
            this.mapdata.forEach(t => {
              this.addMarkerGhantMAp(t);
            });
          }
          setTimeout(() => {  this.loadSave = false}, 2000);;
        }
        else {
          setTimeout(() => {  this.loadSave = false}, 2000);;
        }
      })
   
  }
  addMarkerGhantMAp(object: any) {
    var parser = new DOMParser();
   
   var ResourceName= this.getInitials(object.name);
   

    let titleText = parser.parseFromString('Address: ' + object.address + '\nAccount : ' + object.AccountId, 'text/html');
   
    var svga = `    
<svg width="42" height="42"  viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .cls-1 {  fill: transparent;  }
      .cls-1, .cls-3 {  stroke-width: 25px;}
      .cls-2 {  fill: none;  stroke-width: 15px; }
      .cls-4 {  fill-rule: evenodd; }
    </style>  
   
  </defs>
  <circle   class="cls-1" stroke="strokecolor"  cx="105.5" cy="106.5" r="80.5"/>
  <ellipse id="Ellipse_1_copy_2" data-name="Ellipse 1 copy 2" class="cls-2" stroke="strokecolor" cx="104.5" cy="231.5" rx="59.5" ry="29.5" />
  <circle id="Ellipse_1_copy" data-name="Ellipse 1 copy" class="cls-3" stroke="changecolor"  fill="changecolor" cx="104.5" cy="106.5" r="55.5"/>
  <path class="cls-4" fill="strokecolor" d="M73,179l32,65,31-65H73Z"/>
  <text transform="matrix(1.503438, 0, 0, 1.542827, -27.807068, -29.507713)" style="fill: #2f4050; font-weight:bold; font-family: Lato,sans-serif; font-size: 40px; white-space: pre;" x="55.236" y="103.296">ResourceName</text>
</svg>

`
    var svga1 = svga.split("changecolor").join(object.outcolor);
    svga1 = svga1.split("strokecolor").join(object.color);
    var svga2 = svga1.replace("ResourceName", ResourceName);
    // var svga2 = svga1.replace("strokecolor", "#FF00FF.")

    this.overlaysMap.push(new google.maps.Marker({
      position: { lat: object.Latitude, lng: object.Longitude }, title: titleText.documentElement.textContent, customInfo: object.id, animation: google.maps.Animation.DROP,
      icon: {

        url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svga2)
      },


    }));
  }
  getInitials(resName) {
    if (resName == null || resName == undefined) {
      return "";
    }
    
       var names = resName.trim().split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
  };


  showme(Id) {
    if (this.mapdata != undefined && this.mapdata != null) {

      var index = this.mapdata.findIndex(x => x.id === Id);

      if (this.overlaysMap[index].getAnimation() != google.maps.Animation.BOUNCE) {
        this.overlaysMap[index].setAnimation(google.maps.Animation.BOUNCE);
      } else {
        this.overlaysMap[index].setAnimation(null);
      }
    }
  }
  UnscheduleSearch(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.GetUnschedulledList(null,this.unscheduleFilter)
    }
  }
  timeZoneChange(e:any) {
    this.isShow = false;
    this.timezone = e.name,
      this.timezoneid = e.value;
    this.showtimezone = e.text;
    this.GetCrewResourceCalenderList(this.calstartDate, this.calendDate, true)
    
  }
 // timeZoneChange(e: any) {
    //this.serviceappointmentlistService.saveTimeZone(e.value).subscribe((result: any) => {
    //  this.toaster.success("Timezone updated successfully");
      
    //}, err => { }, () => {
    //    this.commonService.getCurrentUserDetail();
    //    setTimeout(()=>{ this.GetCrewResourceCalenderList(this.calstartDate, this.calendDate, true) },1000);
    //}) 
   // this.timeZoneId = e.value;
    
    
  //}
  GetGhantViewTimeZone(teritoryid:any=null) {
    this.serviceappointmentlistService.GetGhantViewTimeZone(teritoryid).subscribe((result: any) => {
      this.timezoneid = result.timezone_id;
      this.timezone = result.timezone_standard_identifier;
      this.showtimezone = result.display_name;
    }, err => { }, () => {
      this.commonService.getCurrentUserDetail();
      setTimeout(() => { this.GetCrewResourceCalenderList(this.calstartDate, this.calendDate, true) }, 1000);
    })
  };

  getTimeZoneList(e: any = null) {
    this.lstTimeZone = null;
      this.serviceappointmentlistService.GetTimeZoneGhantView(e).subscribe((result: any) => {
        this.lstTimeZone = result;
      })
  };

  showDDL() {
    this.isShow = true;
  };
  
}
