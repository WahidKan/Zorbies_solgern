import { Component, OnInit, Input, ViewChild, NgModule, OnDestroy, Inject, ElementRef, HostListener  } from '@angular/core';
import { UserDetails, CommonService, ModuleList, LoanApplicationReportModel  } from '../../shared/common.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
//import { WidgetComponent } from '../../widget/widget.component';
//import { WidgetService } from '../../widget/widget.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { parse } from '@fullcalendar/core/datelib/parsing';
import { DashboardService } from '../dashboard.service';
import { debounceTime, take } from 'rxjs/operators';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Calendar } from 'primeng/calendar';
import { ConfigurationsettingService } from '../../configurationsetting/configurationsetting.service';
import { Login, UserService } from '../../shared/user.service';
import { UserprofileService } from '../../userprofile/userProfile.service';
import { ModulesService } from '../../managemodules/modules.service';

@Component({
  selector: 'app-otheruserdashboard',
  templateUrl: './otheruserdashboard.component.html',
  styleUrls: ['./otheruserdashboard.component.scss']
})
export class OtheruserdashboardComponent implements OnInit {
  @ViewChild('myStartCalendar', { static: false }) startCalendar: Calendar;
  elem: any;
  public primaryXAxis!: Object;
  public chartData: Object[] = [];

  @Input() user: UserDetails;
  maxdate: Date = new Date();
  show: boolean = false;
  loadSave: boolean = true;
  widgetdata: any;
  itemarray= [];
  itemGraphArray = [];
  widgetRecords: any;

  widgetGroup: any;
  selected: any[] = [];
  count: any;
  values: any;
  widgetId: any;
  From: any;
  TO: any;
  usertype: any;
  selectedid: any;
  SWLead: boolean = false;
  SW_Appointments: boolean = false;
  SW_Aggrements_Signed: boolean = false;
  SW_Sold_Revenue: boolean = false;
  SW_Closing_Rate: boolean = false;
  SW_NTP_Pending: boolean = false;
  SW_Site_Survey: boolean = false;
  SW_Install: boolean = false;
  SW_New_Cases_Report: boolean = false;
  SW_Engineering: boolean = false;
  SW_Inspection: boolean = false;
  SW_PTO: boolean = false;
  SW_Post_Install: boolean = false;
  W_Permiting: boolean = false;
  W_Accounts_by_AM: boolean = false;
  W_Accounts_Not_Assigned_to_AM: boolean = false;
  W_Accounts_Not_Assigned_to_CSM: boolean = false;
  W_Today_Task: boolean = false;
  W_Today_Appointment: boolean = false;
  SW_Total_Leads: boolean = false;
  SW_Leads_InProgress: boolean = false;
  SW_Leads_Closed: boolean = false;
  W_Sales_Pipeline_by_Stages: boolean = false;
  W_Sales_Pipeline_by_Sales_Rep: boolean = false;
  W_Sales_Activity_by_Sales_Rep: boolean = false;
  W_Most_Active_Salespeople: boolean = false;
  W_Most_Least_Active: boolean = false;
  W_Open_Opportunities: boolean = false;

  SW_Total_Site_Survey: boolean = false;
  SW_Site_Survey_In_Progress: boolean = false;
  SW_Site_Survey_Completed: boolean = false;
  W_Productivity: boolean = false;
  W_Site_Survey: boolean = false;
  W_Top5_Rank: boolean = false;
  W_Today_Visits: boolean = false;
  W_Design_Request_This_Week: boolean = false;
  SW_Design_Completed: boolean = false;
  SW_Design_InProgress: boolean = false;
  SW_Total_Design_Request: boolean = false;


  W_NTP_Pending_Lender_Wise: boolean = false;
  W_Pending_Fund: boolean = false;
  W_NTP_Pending: boolean = false;

  SW_Pending_Funds: boolean = false;

  SW_Total_Agreements: boolean = false;
  SW_NTP_Pending_finance: boolean = false;

  W_Average_Day: boolean = false;
  W_Install_Record_Count: boolean = false;
  W_Install_Inprogress: boolean = false;

  SW_Request_Completed: boolean = false;
  SW_Request_InProgress: boolean = false;
  SW_Total_Install_Request: boolean = false;


  W_Average_Day_Icp: boolean = false;
  W_ICP_Record_Count: boolean = false;
  W_ICP_InProgress: boolean = false;


  SW_Total_ICP_Request: boolean = false;


  W_Engineering_Record_Count: boolean = false;
  W_Average_Day_Engineering: boolean = false;
  W_Engineering_InProgress: boolean = false;
  SW_Total_Engineering_Requests: boolean = false;

  ProposalRequest: any;
  ProposalInProgress: any;
  ProposalComplete: any;
  ContractSent: any;
  Auditing: any;
  NTP: any;
  ICP: any;
  TurnOn: any;


  SW_Discovery: boolean = false;
  SW_ProposalRequests: boolean = false;
  SW_ProposalInProgress: boolean = false;
  SW_ProposalComplete: boolean = false;
  SW_ContractSent: boolean = false;
  SW_Auditing: boolean = false;
  SW_ICP: boolean = false;
  SW_TurnOn: boolean = false;

  TaskList: any;
  data: any;
  leadData: any;
  ownerdata: any;
  loadChart = false;
  leadloadChart = false;
  ownerloadChart = false;
  AppointmentList: any;
  Widgetcount: any;
  isHOD: any;
  loginuserid: any;
  graphrows = [];
  graphtemp = [];
  gcolumnNames: any;
  leadgraphrows = [];
  leadgraphtemp = [];
  leadgcolumnNames: any;
  options: any;
  leadoptions: any;
  owneroptions: any;

  ownergraphrows = [];
  ownergraphtemp = [];
  ownergcolumnNames: any;
  widgetGraphData: any;

  widgetGraphData_ColumnChart: any;
  widgetGraphData_LineChart: any;
  widgetGraphData_DoughnutChart: any;

  widgetListCountDate = [];
  widgetTableData: any;
  tilewidget: any = [];
  referenceIntervalTime: any
  minimumDate = new Date();
  rangeDates: Date[];
  selectedFilter = "All";
  showDateFilter = false;
  DashboardViewData = true;
  DashboardViewType: any = 'me';
  UserTeam: any;
  DashboardFilterTeam: any;
  ShowTeamData: any;
  TeamDataText: any = "Select";
  FilterUrl: any = "";
  stage: any = "";
  datatss: any;
  datatss2 = [];
  ShowServiceTerrData: any;
  ShowServiceTerrList: any;
  ServiceTerritoryid: any;
  ServiceTerritoryName: any = "Select";
  isFullScreen: boolean;
  sizeNo: number;
  currPageNo: number;
  referenceIntervalTimeFullScreen: number = 20000;

  tilewidgetFullscreen: any;
  widgetGraphDataFullScreen: any;
  widgetTableDataFullScreen: any;
  widgetListCountDateFullScreen = [];
  datatss2FullScreen = [];
  noOfRecordOnPageFullScreen: number = 10;
  key: any;
  isFullScreenSection: boolean = false;
  lstheadercompany: any;
  headeruserid: any;
  isSwitchCompany: boolean = false;
  companyLogo: string;
  companyIdDdl: any;
  headerData: any; imageLink = '';
  modulePermission: ModuleList;
  userType: any;
  username: any;
  totalLeads: number = 0;
  isSuperAdmin:boolean=false;
  companyId: number;
  companyType: string;
  loanApplicationReportModel: LoanApplicationReportModel = new LoanApplicationReportModel();

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


  constructor(private dashboardservice: DashboardService, private dialogService: ConfirmationDialogService,private userprofileService: UserprofileService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private toaster: ToastrService,
    private userService: UserService,
    private moduleService: ModulesService,
    private el: ElementRef,
    @Inject(DOCUMENT) private document: any

  ) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.usertype = userdetail.userType;
      this.loginuserid = userdetail.id;
      this.isHOD = userdetail.isHOD;
    });
    //this.minimumDate.setDate(this.minimumDate.getDate() + 3);
  }
  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.closeFullscreen();
    }
  }

  //@HostListener('document:keypress', ['$event'])
  //handleKeyboardEvent(event: KeyboardEvent) {
  //  this.key = event.key;
  //  if (this.key == 'Escape') {
  //   this.closeFullscreen();
  //  }
  //}

  ngOnInit() {
    //debugger
    this.userprofileService.getUserProfile().subscribe((result: any) => {
      if (result && result.userTypeName=="usertypesuperadmin") {
        this.isSuperAdmin = true;
      }
    })
    //$(window).load(function () {
    //  $('#loadSave').hide();
    //});
    this.loadSave = true;
    this.sizeNo = 28;
    this.currPageNo = 0;
    this.selected = [];
    this.show = false;
    this.DashboardViewType = 'me';
    this.isFullScreen = false;
    
    this.checkUserStatus();
    this.onMonth();
    
    // this.dashboardservice.GetReferenceIntervalTime().subscribe(response => {
    //   this.referenceIntervalTime = response;
    //   setInterval(function () {
    //     //this.onMonth();
    //   }, this.referenceIntervalTime)
    // }, err => {
    //   //this.loadSave = false;
    // }, () => {
    //   //this.loadSave = false;
    // });
    //this.GetserviceTerr();
    //this.elem = document.documentElement;
    //this.loadSave = true;
  };

  @ViewChild('htmlbody', { static: false }) body: ElementRef;

  openFullscreen() {
    this.isFullScreenSection = !this.isFullScreenSection;


    this.sizeNo = 28;
    this.currPageNo = 0;
    //this.body.nativeElement.classList.remove('fixed-topbar fixed-sidebar theme-sdtl color-default dashboard');
    //this.body.nativeElement.classList.add("fixed-topbar fixed-sidebar theme-sdtl color-default dashboard sidebar-collapsed");

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

    //let myTag = document.getElementById('htmlbody');
    //if (!myTag.classList.contains('fixed-topbar fixed-sidebar theme-sdtl color-default dashboard')) {
    //  myTag.classList.remove('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard');
    //  myTag.classList.add('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard', 'sidebar-collapsed');
    //}
    //else {
    //  myTag.classList.remove('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard', 'sidebar-collapsed');
    //  myTag.classList.add('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard');
    //}

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
    //if (this.isFullScreen == true) {
    //  this.GetWidgetRecordsRowWise();

    //  let current = this;
    //  setInterval(function () {
    //    current.itemarray = [];
    //    current.itemGraphArray = [];
    //    current.GetWidgetRecordsRowWise();
    //  }, this.referenceIntervalTimeFullScreen)
    //}
  };

  GetWidgetRecordsRowWise() {
    this.widgetRecords.forEach(t => {
      if (t.graphType == null) {
        let obj =
        {
          displayOrder:t.displayOrder,
          graphData: t.graphData,
          graphType: t.graphType,
          isSelected: t.isSelected,
          masterIdAuto: t.masterIdAuto,
          onlyForHOD: t.onlyForHOD,
          selectedwidgetsIds: t.selectedwidgetsIds,
          widgetBoxClass: t.widgetBoxClass,
          widgetCode: t.widgetCode,
          widgetCount: t.widgetCount,
          widgetDescription: t.widgetDescription,
          widgetGroupCode: t.widgetGroupCode,
          widgetGroupID: t.widgetGroupID,
          widgetGroupName: t.widgetGroupName,
          widgetID: t.widgetID,
          widgetIconClass: t.widgetIconClass,
          widgetName: t.widgetName,
          widgetRoute: t.widgetRoute,
          widgetTextClass: t.widgetTextClass,
          widgetimage: t.widgetimage
        }
        this.itemarray.push(obj);
      }
    });

    this.widgetRecords.forEach(t => {
      if (t.graphType != null) {
        let obj =
        {
          displayOrder: t.displayOrder,
          graphData: t.graphData,
          graphType: t.graphType,
          isSelected: t.isSelected,
          masterIdAuto: t.masterIdAuto,
          onlyForHOD: t.onlyForHOD,
          selectedwidgetsIds: t.selectedwidgetsIds,
          widgetBoxClass: t.widgetBoxClass,
          widgetCode: t.widgetCode,
          widgetCount: t.widgetCount,
          widgetDescription: t.widgetDescription,
          widgetGroupCode: t.widgetGroupCode,
          widgetGroupID: t.widgetGroupID,
          widgetGroupName: t.widgetGroupName,
          widgetID: t.widgetID,
          widgetIconClass: t.widgetIconClass,
          widgetName: t.widgetName,
          widgetRoute: t.widgetRoute,
          widgetTextClass: t.widgetTextClass,
          widgetimage: t.widgetimage
        }
        this.itemGraphArray.push(obj);
      }
    });

    this.widgetdata = this.itemarray.concat(this.itemGraphArray);
    this.widgetdata = this.widgetdata.slice(this.currPageNo, this.sizeNo);
    this.widgetGraphDataFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "Graph_Widget");
    if (this.currPageNo == this.sizeNo)
    {
      this.sizeNo = 0;
    }
    else {
      this.currPageNo = this.sizeNo;
      this.sizeNo = this.sizeNo + this.noOfRecordOnPageFullScreen;
    //this.currPageNo = this.currPageNo + this.noOfRecordOnPageFullScreen;
    this.tilewidgetFullscreen = this.widgetdata.filter(x => x.widgetGroupCode == "Tile_Widget");//1
    this.widgetGraphDataFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "Graph_Widget");//3

    this.widgetTableDataFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "List_Widget");//4
    this.widgetListCountDateFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "List_Count_widget")

    let backgroundcolor: String[] = [];
    for (i = 0; i < this.widgetListCountDateFullScreen.length; i++) {
      this.datatss2FullScreen.push(JSON.parse(this.widgetListCountDateFullScreen[i].graphData));
    }
    for (var i = 0; i < this.tilewidgetFullscreen.length; i++) {
      if (parseInt(this.tilewidgetFullscreen[i].widgetCount) >= 0) {
        this.tilewidgetFullscreen[i].widgetCount = this.commonService.formatAmount(this.tilewidgetFullscreen[i].widgetCount);
      }
    }
    }
    if (this.widgetRecords.length < this.sizeNo) {
      let diff = this.sizeNo - this.widgetRecords.length;
      if (diff > 0) {
        this.sizeNo = this.sizeNo - (diff);
      }
      else {
        this.sizeNo = 28;
        this.currPageNo = 0;
      }
    }
    if (this.sizeNo==0) {
      this.sizeNo = 28;
      this.currPageNo = 0;
    }
  };

  checkUserStatus()
  {
    //debugger
    this.dashboardservice.checkUserStatus().subscribe(r =>
      {
        if (r)
        {
          localStorage.removeItem('access_token');
          localStorage.removeItem('usertype');
          localStorage.removeItem('moduleList');
          localStorage.removeItem('userinfo');
          this.router.navigate(['/account'])
        }
    });
  }
  closeFullscreen() {
    this.isFullScreen = false;
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }


  loadDashboard() {
    var current = new Date();
    // let today = new Date().toLocaleDateString();
    var weekstart = current.getDate() - current.getDay() + 1
    var last = weekstart + 6;
    // end day is the first day + 6
    var monday = new Date(current.setDate(weekstart));
    var sunday = new Date(current.setDate(last)).toUTCString();
    var weekstartday: any = this.datePipe.transform(monday, 'MM/dd/yyyy')
    var weekendday: any = this.datePipe.transform(sunday, 'MM/dd/yyyy');
    this.GetDashboardWidgetforuser(weekstartday, weekendday, this.DashboardViewData);
  };

  ShowLeadGraph(fromDate, toDate) {
    this.leadloadChart = true;
    this.dashboardservice.GetLeadGraph(this.loginuserid, fromDate, toDate).pipe(debounceTime(5000)).subscribe(response => {
      this.leadgraphrows = response;
      this.leadgraphtemp = this.leadgraphrows;

      this.leadgcolumnNames = this.leadgraphrows.map(function (a) {
        return a.leadStatus;
      });
      let countlic = null;
      if (this.leadgraphrows.length == 0) {
        this.leadgcolumnNames = [];
        this.leadgraphtemp = [];
        countlic = 1;
      }
      else {
        this.leadgraphtemp = this.leadgraphrows.map(function (a) {
          return a.leadStatusCount;
        });
      }
      if (this.leadgraphtemp[0] < 10) {
        countlic = 1;
      }
      let backgroundcolor: String[] = [];
      let index = 0;
      for (let color of this.leadgcolumnNames) {
        backgroundcolor[index] = '#' + Math.floor(Math.random() * 16777215).toString(16);
        index = index + 1;
      }

      this.leadData = {
        labels: this.leadgcolumnNames,
        datasets: [
          {
            backgroundColor: backgroundcolor,
            data: this.leadgraphtemp
          }
        ]
      }
      this.leadoptions = {
        legend: {
          position: 'bottom'
        }
      }
      this.leadloadChart = false;
      this.From = null;
      this.TO = null;
    });

  }

  ShowOpportunityOwnerGraph(fromDate, toDate) {
    this.ownerloadChart = true;
    this.dashboardservice.GetOpportunityOwnerGraph(this.loginuserid, fromDate, toDate).subscribe(response => {
      this.ownergraphrows = response;
      this.ownergraphtemp = this.ownergraphrows;

      this.ownergcolumnNames = this.ownergraphrows.map(function (a) {
        return a.ownerName;
      });
      let countlic = null;
      if (this.ownergraphrows.length == 0) {
        this.ownergcolumnNames = [];
        this.ownergraphtemp = [];
        countlic = 1;
      }
      else {
        this.ownergraphtemp = this.ownergraphrows.map(function (a) {
          return a.ownerCount;
        });
      }
      if (this.ownergraphtemp[0] < 10) {
        countlic = 1;
      }

      this.ownerdata = {
        labels: this.ownergcolumnNames,
        datasets: [
          {
            barThickness: 25,
            label: '',
            backgroundColor: '#22466a',
            borderColor: '#1E88E5',
            data: this.ownergraphtemp
          }
        ]
      }
      this.owneroptions = {
        scales: {
          xAxes: [
            {
              showTooltips: true,
              responsive: false,
              maintainAspectRatio: false,
              multiTooltipTemplate: function (label) {
                return label.toString();
              },

              ticks: {
                beginAtZero: true,
                fixedStepSize: countlic,
              }
            }
          ],
        },
        legend: { display: false }
      }
      this.loadChart = false;
      this.From = null;
      this.TO = null;
    });

  }

  ShowOpportunityGraph(fromDate, toDate) {
    this.loadChart = true;
    this.dashboardservice.GetOpportunityGraph(this.loginuserid, fromDate, toDate).subscribe(response => {
      this.graphrows = response;
      this.graphtemp = this.graphrows;
      this.gcolumnNames = this.graphrows.map(function (a) {
        return a.stageName;
      });
      let countlic = null;
      if (this.graphrows.length == 0) {
        this.gcolumnNames = [];
        this.graphtemp = [];
        countlic = 1;
      }
      else {
        this.graphtemp = this.graphrows.map(function (a) {
          return a.stageCount;
        });
      }
      if (this.graphtemp[0] < 10) {
        countlic = 1;
      }

      this.data = {
        labels: this.gcolumnNames,
        datasets: [
          {
            barThickness: 25,
            label: '',
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return value.toString();
              } else {
                return value;
              }
            },
            backgroundColor: '#22466a',
            borderColor: '#1E88E5',
            data: this.graphtemp
          }
        ]
      }
      this.options = {
        scales: {
          yAxes: [{
            label: '',
            showTooltips: true,
            responsive: false,
            maintainAspectRatio: false,
            multiTooltipTemplate: function (label) {
              return label.toString();
            },
            ticks: {
              beginAtZero: true,
              fixedStepSize: countlic,
              callback: function (value, index, values) {
                if (parseInt(value) >= 1000) {
                  return value.toString();
                } else {
                  return value;
                }
              },

            }
          }]
        },
        legend: {
          display: false
        }
      }
      this.loadChart = false;
      this.From = null;
      this.TO = null;

    });

  }

  GetTaskList() {
    this.dashboardservice.GetTaskList().subscribe((result: any) => {
      this.TaskList = result;
    });
  }

  GetUserTeam(type: any) {
    this.commonService.getUserTeam(type).subscribe((result: any) => {
      this.UserTeam = result.data;
    });
  }

  GetDashboardAppointmentList(fromDate, toDate) {
    this.dashboardservice.GetDashboardAppointmentList(fromDate, toDate).subscribe((result: any) => {
      this.AppointmentList = result;
      this.From = null;
      this.TO;
    })
  }
  GetDashboardWidgetcount() {
    this.dashboardservice.GetDashboardWidgetcount().subscribe((result: any) => {
      this.Widgetcount = result;
      //this.ClosingRate = result[0].closingRate;
      //this.Leadcount = result[0].leadcount;
      //this.Appointments = result[0].appointments;
      //this.SoldRevnue = result[0].soldRevnue;


      //this.Discovery = result[0].discovery;
      //this.ProposalRequest = result[0].proposalRequest;
      //this.ProposalInProgress = result[0].proposalInProgress;
      //this.ProposalComplete = result[0].proposalComplete;
      //this.ContractSent = result[0].contractSent;
      //this.AggrementSigned = result[0].aggrementSigned;
      //this.Auditing = result[0].auditing;
      //this.NTP = result[0].ntp;
      //this.SiteSurvey = result[0].siteSurvey;
      //this.Engineering = result[0].engineering;
      //this.ICP = result[0].icp;
      //this.Install = result[0].install;
      //this.Inspection = result[0].inspection;
      //this.Pto = result[0].pto;
      //this.TurnOn = result[0].turnOn;



      // this.NTP_Pending = result[0].ntP_Pending;
      // this.Permitting_Interconnection = result[0].permitting_Interconnection;
      // this.postInstall = result[0].postInstall;

      //result.forEach(childObj => {

      //  this.AggrementSigned = childObj.aggrementSigned;
      //  this.Appointments = childObj.appointments;
      //  this.ClosingRate = childObj.closingRate;
      //  this.Engineering = childObj.engineering;
      //  this.Inspection = childObj.inspection;
      //  this.Install = childObj.install;
      //  this.Leadcount = childObj.leadcount;
      //  this.Discovery = childObj.discovery;
      //  this.NTP_Pending = childObj.ntP_Pending;
      //  this.Permitting_Interconnection = childObj.permitting_Interconnection;
      //  this.postInstall = childObj.postInstall;
      //  this.Pto = childObj.pto;
      //  this.SiteSurvey = childObj.siteSurvey;
      //  this.SoldRevnue = childObj.soldRevnue;

      //});
    })
  }
  GetDashboardWidgetforuser(fromDate: any, toDate: any, recordFilter) {
    //debugger
    this.loadSave = true;
    let teamId: any = null;
    let teamMemberId: any = null;
    if (this.DashboardViewType == "company") {
      teamId = this.DashboardFilterTeam;
      teamMemberId = null;
    }
    else if (this.DashboardViewType == "team") {
      teamId = null;
      teamMemberId = this.DashboardFilterTeam;
    }
    else {
      teamId = null;
      teamMemberId = null;
    }
    this.commonService.getLoggedInName.subscribe(data => {
      this.companyId = data.companyId;
      this.companyType = data.companyType;
      this.dashboardservice.GetDashboardWidgetForAddeditforuser(fromDate, toDate, this.DashboardViewType, teamId, teamMemberId, this.ServiceTerritoryid, false, this.companyType).subscribe(result => {
        this.datatss2 = [];
        //debugger
        this.widgetdata = result;
        this.widgetRecords = result;


        this.tilewidget = this.widgetdata.filter(x => x.widgetGroupCode == "Tile_Widget" && x.isSelected == true);//1
        this.widgetGraphData = this.widgetdata.filter(x => x.widgetGroupCode == "Graph_Widget" && x.isSelected == true);//3
        this.widgetTableData = this.widgetdata.filter(x => x.widgetGroupCode == "List_Widget" && x.isSelected == true);//4

        this.widgetGraphData_ColumnChart = this.widgetGraphData.filter(x => x.graphType == 'bar')
        this.widgetGraphData_LineChart = this.widgetGraphData.filter(x => x.graphType == 'horizontalBar')
        this.widgetGraphData_DoughnutChart = this.widgetGraphData.filter(x => x.graphType == 'doughnut')

        //// console.log('widgetGraphData', this.widgetGraphData);
        //// console.log('widgetTableData', this.widgetTableData);

        this.widgetListCountDate = this.widgetdata.filter(x => x.widgetGroupCode == "List_Count_widget")

        //let backgroundcolor: String[] = [];
        for (i = 0; i < this.widgetListCountDate.length; i++) {
          this.datatss2.push(JSON.parse(this.widgetListCountDate[i].graphData));
        }

        for (var i = 0; i < this.tilewidget.length; i++) {
          for (var d = 0; d < this.widgetGraphData_ColumnChart.length; d++) {
            if (this.widgetGraphData_ColumnChart[d].widgetID == this.tilewidget[i].widgetID) {

              this.widgetGraphData_ColumnChart[d].widgetCount = this.commonService.formatAmount(this.tilewidget[i].widgetCount);
              break;
            }
          }
          for (var d = 0; d < this.widgetGraphData_LineChart.length; d++) {
            if (this.widgetGraphData_LineChart[d].widgetID == this.tilewidget[i].widgetID) {

              this.widgetGraphData_LineChart[d].widgetCount = this.commonService.formatAmount(this.tilewidget[i].widgetCount);
              break;
            }
          }
          for (var d = 0; d < this.widgetGraphData_DoughnutChart.length; d++) {
            if (this.widgetGraphData_DoughnutChart[d].widgetID == this.tilewidget[i].widgetID) {

              this.widgetGraphData_DoughnutChart[d].widgetCount = this.commonService.formatAmount(this.tilewidget[i].widgetCount);
              break;
            }
          }
          // this.widgetGraphData_ColumnChart.forEach(x=>{
          //     if(x.widgetID == this.tilewidget[i].widgetID)
          //     {
          //       x.widgetCount =  this.tilewidget[i].widgetCount;
          //       break;
          //     }
          // })
          if (parseInt(this.tilewidget[i].widgetCount) >= 0) {
            this.tilewidget[i].widgetCount = this.commonService.formatAmount(this.tilewidget[i].widgetCount);
          }
        }

        //this.ManageWidgetApperance();
        if (this.widgetdata.length > 0 && this.widgetdata[0].selectedwidgetsIds != '') {
          this.selectedid = this.widgetdata[0].selectedwidgetsIds;

          if (this.selected.length > 0) {
            this.selected = this.selectedid.split(',').map(function (item) {
              return parseInt(item, 10);
            });
          }
        }
        this.From = null;
        this.TO = null;
        this.loadSave = false;
        // setTimeout(() => {
        //   this.loadSave = false;
        // }, 500);
      })

    });
    //this.loadSave = false;
  }

  ManageWidgetApperance() {
    this.widgetGroup = this.widgetdata.filter(
      (thing, i, arr) => arr.findIndex(t => t.widgetGroupID === thing.widgetGroupID) === i
    );
    this.widgetdata.forEach(t => {
      if (t.widgetCode == "SW_Discovery" && t.isSelected) {
        this.SW_Discovery = true;
      }
      else if (t.widgetCode == "SW_ProposalRequests" && t.isSelected) {
        this.SW_ProposalRequests = true;
      }
      else if (t.widgetCode == "SW_ProposalInProgress" && t.isSelected) {
        this.SW_ProposalInProgress = true;
      }
      else if (t.widgetCode == "SW_ProposalComplete" && t.isSelected) {
        this.SW_ProposalComplete = true;
      }
      else if (t.widgetCode == "SW_ContractSent" && t.isSelected) {
        this.SW_ContractSent = true;
      }
      else if (t.widgetCode == "SW_Auditing" && t.isSelected) {
        this.SW_Auditing = true;
      }
      else if (t.widgetCode == "SW_ICP" && t.isSelected) {
        this.SW_ICP = true;
      }
      else if (t.widgetCode == "SW_TurnOn" && t.isSelected) {
        this.SW_TurnOn = true;
      }
    })



    let swLead: any;
    swLead = this.widgetdata.filter(x => x.widgetCode == 'SW_Lead' && x.isSelected === true);
    if (typeof swLead != 'undefined' && swLead != null && swLead.length > 0) { this.SWLead = true; }

    let sW_Appointments: any;
    sW_Appointments = this.widgetdata.filter(x => x.widgetCode == 'SW_Appointments' && x.isSelected === true);
    if (typeof sW_Appointments != 'undefined' && sW_Appointments != null && sW_Appointments.length > 0) { this.SW_Appointments = true; }

    let sW_Aggrements_Signed: any;
    sW_Aggrements_Signed = this.widgetdata.filter(x => x.widgetCode == 'SW_Aggrements_Signed' && x.isSelected === true);
    if (typeof sW_Aggrements_Signed != 'undefined' && sW_Aggrements_Signed != null && sW_Aggrements_Signed.length > 0) { this.SW_Aggrements_Signed = true; }

    let sW_Sold_Revenue: any;
    sW_Sold_Revenue = this.widgetdata.filter(x => x.widgetCode == 'SW_Sold_Revenue' && x.isSelected === true);
    if (typeof sW_Sold_Revenue != 'undefined' && sW_Sold_Revenue != null && sW_Sold_Revenue.length > 0) { this.SW_Sold_Revenue = true; }

    let sW_Closing_Rate: any;
    sW_Closing_Rate = this.widgetdata.filter(x => x.widgetCode == 'SW_Closing_Rate' && x.isSelected === true);
    if (typeof sW_Closing_Rate != 'undefined' && sW_Closing_Rate != null && sW_Closing_Rate.length > 0) { this.SW_Closing_Rate = true; }

    let sW_NTP_Pending: any;
    sW_NTP_Pending = this.widgetdata.filter(x => x.widgetCode == 'SW_NTP_Pending' && x.isSelected === true);
    if (typeof sW_NTP_Pending != 'undefined' && sW_NTP_Pending != null && sW_NTP_Pending.length > 0) { this.SW_NTP_Pending = true; }

    let sW_Site_Survey: any;
    sW_Site_Survey = this.widgetdata.filter(x => x.widgetCode == 'SW_Site_Survey' && x.isSelected === true);
    if (typeof sW_Site_Survey != 'undefined' && sW_Site_Survey != null && sW_Site_Survey.length > 0) { this.SW_Site_Survey = true; }

    let sW_Install: any;
    sW_Install = this.widgetdata.filter(x => x.widgetCode == 'SW_Install' && x.isSelected === true);
    if (typeof sW_Install != 'undefined' && sW_Install != null && sW_Install.length > 0) { this.SW_Install = true; }

    let sW_New_Cases_Report: any;
    sW_New_Cases_Report = this.widgetdata.filter(x => x.widgetCode == 'SW_New_Cases_Report' && x.isSelected === true);
    if (typeof sW_New_Cases_Report != 'undefined' && sW_New_Cases_Report != null && sW_New_Cases_Report.length > 0) { this.SW_New_Cases_Report = true; }

    let sW_Engineering: any;
    sW_Engineering = this.widgetdata.filter(x => x.widgetCode == 'SW_Engineering' && x.isSelected === true);
    if (typeof sW_Engineering != 'undefined' && sW_Engineering != null && sW_Engineering.length > 0) { this.SW_Engineering = true; }

    let sW_Inspection: any;
    sW_Inspection = this.widgetdata.filter(x => x.widgetCode == 'SW_Inspection' && x.isSelected === true);
    if (typeof sW_Inspection != 'undefined' && sW_Inspection != null && sW_Inspection.length > 0) { this.SW_Inspection = true; }

    let sW_PTO: any;
    sW_PTO = this.widgetdata.filter(x => x.widgetCode == 'SW_PTO' && x.isSelected === true);
    if (typeof sW_PTO != 'undefined' && sW_PTO != null && sW_PTO.length > 0) { this.SW_PTO = true; }

    let sW_Post_Install: any;
    sW_Post_Install = this.widgetdata.filter(x => x.widgetCode == 'SW_Post_Install' && x.isSelected === true);
    if (typeof sW_Post_Install != 'undefined' && sW_Post_Install != null && sW_Post_Install.length > 0) { this.SW_Post_Install = true; }

    let w_Permiting: any;
    w_Permiting = this.widgetdata.filter(x => x.widgetCode == 'W_Permiting/Inspection' && x.isSelected === true);
    if (typeof w_Permiting != 'undefined' && w_Permiting != null && w_Permiting.length > 0) { this.W_Permiting = true; }

    let w_Accounts_by_AM: any;
    w_Accounts_by_AM = this.widgetdata.filter(x => x.widgetCode == 'W_Accounts_by_AM' && x.isSelected === true);
    if (typeof w_Accounts_by_AM != 'undefined' && w_Accounts_by_AM != null && w_Accounts_by_AM.length > 0) { this.W_Accounts_by_AM = true; }

    let w_Accounts_Not_Assigned_to_AM: any;
    w_Accounts_Not_Assigned_to_AM = this.widgetdata.filter(x => x.widgetCode == 'W_Accounts_Not_Assigned_to_AM' && x.isSelected === true);
    if (typeof w_Accounts_Not_Assigned_to_AM != 'undefined' && w_Accounts_Not_Assigned_to_AM != null && w_Accounts_Not_Assigned_to_AM.length > 0) { this.W_Accounts_Not_Assigned_to_AM = true; }

    let w_Accounts_Not_Assigned_to_CSM: any;
    w_Accounts_Not_Assigned_to_CSM = this.widgetdata.filter(x => x.widgetCode == 'W_Accounts_Not_Assigned_to_CSM' && x.isSelected === true);
    if (typeof w_Accounts_Not_Assigned_to_CSM != 'undefined' && w_Accounts_Not_Assigned_to_CSM != null && w_Accounts_Not_Assigned_to_CSM.length > 0) { this.W_Accounts_Not_Assigned_to_CSM = true; }

    let w_Today_Task: any;
    w_Today_Task = this.widgetdata.filter(x => x.widgetCode == 'W_Today_Task' && x.isSelected === true);
    if (typeof w_Today_Task != 'undefined' && w_Today_Task != null && w_Today_Task.length > 0) { this.W_Today_Task = true; }

    let w_Today_Appointment: any;
    w_Today_Appointment = this.widgetdata.filter(x => x.widgetCode == 'W_Today_Appointment' && x.isSelected === true);
    if (typeof w_Today_Appointment != 'undefined' && w_Today_Appointment != null && w_Today_Appointment.length > 0) { this.W_Today_Appointment = true; }

    //sales
    let sW_Total_Leads: any;
    sW_Total_Leads = this.widgetdata.filter(x => x.widgetCode == 'SW_Total_Leads' && x.isSelected === true);
    if (typeof sW_Total_Leads != 'undefined' && sW_Total_Leads != null && sW_Total_Leads.length > 0) { this.SW_Total_Leads = true; }

    let sW_Leads_InProgress: any;
    sW_Leads_InProgress = this.widgetdata.filter(x => x.widgetCode == 'SW_Leads-InProgress' && x.isSelected === true);
    if (typeof sW_Leads_InProgress != 'undefined' && sW_Leads_InProgress != null && sW_Leads_InProgress.length > 0) { this.SW_Leads_InProgress = true; }

    let sW_Leads_Closed: any;
    sW_Leads_Closed = this.widgetdata.filter(x => x.widgetCode == 'SW_Leads_Closed' && x.isSelected === true);
    if (typeof sW_Leads_Closed != 'undefined' && sW_Leads_Closed != null && sW_Leads_Closed.length > 0) { this.SW_Leads_Closed = true; }

    let w_Sales_Pipeline_by_Stages: any;
    w_Sales_Pipeline_by_Stages = this.widgetdata.filter(x => x.widgetCode == 'W_Sales_Pipeline_by_Stages' && x.isSelected === true);
    if (typeof w_Sales_Pipeline_by_Stages != 'undefined' && w_Sales_Pipeline_by_Stages != null && w_Sales_Pipeline_by_Stages.length > 0) { this.W_Sales_Pipeline_by_Stages = true; }

    let w_Sales_Pipeline_by_Sales_Rep: any;
    w_Sales_Pipeline_by_Sales_Rep = this.widgetdata.filter(x => x.widgetCode == 'W_Sales_Pipeline_by_Sales_Rep' && x.isSelected === true);
    if (typeof w_Sales_Pipeline_by_Sales_Rep != 'undefined' && w_Sales_Pipeline_by_Sales_Rep != null && w_Sales_Pipeline_by_Sales_Rep.length > 0) { this.W_Sales_Pipeline_by_Sales_Rep = true; }

    let w_Sales_Activity_by_Sales_Rep: any;
    w_Sales_Activity_by_Sales_Rep = this.widgetdata.filter(x => x.widgetCode == 'W_Sales_Activity_by_Sales_Rep' && x.isSelected === true);
    if (typeof w_Sales_Activity_by_Sales_Rep != 'undefined' && w_Sales_Activity_by_Sales_Rep != null && w_Sales_Activity_by_Sales_Rep.length > 0) { this.W_Sales_Activity_by_Sales_Rep = true; }

    let w_Most_Active_Salespeople: any;
    w_Most_Active_Salespeople = this.widgetdata.filter(x => x.widgetCode == 'W_Most_Active_Salespeople' && x.isSelected === true);
    if (typeof w_Most_Active_Salespeople != 'undefined' && w_Most_Active_Salespeople != null && w_Most_Active_Salespeople.length > 0) { this.W_Most_Active_Salespeople = true; }

    let w_Most_Least_Active: any;
    w_Most_Least_Active = this.widgetdata.filter(x => x.widgetCode == 'W_Most_Least_Active' && x.isSelected === true);
    if (typeof w_Most_Least_Active != 'undefined' && w_Most_Least_Active != null && w_Most_Least_Active.length > 0) { this.W_Most_Least_Active = true; }

    let w_Open_Opportunities: any;
    w_Open_Opportunities = this.widgetdata.filter(x => x.widgetCode == 'W_Open_Opportunities' && x.isSelected === true);
    if (typeof w_Open_Opportunities != 'undefined' && w_Open_Opportunities != null && w_Open_Opportunities.length > 0) { this.W_Open_Opportunities = true; }

    // Site Surveyor

    let sW_Total_Site_Survey: any;
    sW_Total_Site_Survey = this.widgetdata.filter(x => x.widgetCode == 'SW_Total_Site_Survey' && x.isSelected === true);
    if (typeof sW_Total_Site_Survey != 'undefined' && sW_Total_Site_Survey != null && sW_Total_Site_Survey.length > 0) { this.SW_Total_Site_Survey = true; }

    let sW_Site_Survey_In_Progress: any;
    sW_Site_Survey_In_Progress = this.widgetdata.filter(x => x.widgetCode == 'SW_Site_Survey_In_Progress' && x.isSelected === true);
    if (typeof sW_Site_Survey_In_Progress != 'undefined' && sW_Site_Survey_In_Progress != null && sW_Site_Survey_In_Progress.length > 0) { this.SW_Site_Survey_In_Progress = true; }


    let sW_Site_Survey_Completed: any;
    sW_Site_Survey_Completed = this.widgetdata.filter(x => x.widgetCode == 'SW_Site_Survey_Completed' && x.isSelected === true);
    if (typeof sW_Site_Survey_Completed != 'undefined' && sW_Site_Survey_Completed != null && sW_Site_Survey_Completed.length > 0) { this.SW_Site_Survey_Completed = true; }

    let w_Productivity: any;
    w_Productivity = this.widgetdata.filter(x => x.widgetCode == 'W_Productivity' && x.isSelected === true);
    if (typeof w_Productivity != 'undefined' && w_Productivity != null && w_Productivity.length > 0) { this.W_Productivity = true; }

    let w_Site_Survey: any;
    w_Site_Survey = this.widgetdata.filter(x => x.widgetCode == 'W_Site_Survey' && x.isSelected === true);
    if (typeof w_Site_Survey != 'undefined' && w_Site_Survey != null && w_Site_Survey.length > 0) { this.W_Site_Survey = true; }

    let w_Top5_Rank: any;
    w_Top5_Rank = this.widgetdata.filter(x => x.widgetCode == 'W_Top5_Rank' && x.isSelected === true);
    if (typeof w_Top5_Rank != 'undefined' && w_Top5_Rank != null && w_Top5_Rank.length > 0) { this.W_Top5_Rank = true; }

    let w_Today_Visits: any;
    w_Today_Visits = this.widgetdata.filter(x => x.widgetCode == 'W_Today_Visits' && x.isSelected === true);
    if (typeof w_Today_Visits != 'undefined' && w_Today_Visits != null && w_Today_Visits.length > 0) { this.W_Today_Visits = true; }

    //Sales
    let w_Design_Request_This_Week: any;
    w_Design_Request_This_Week = this.widgetdata.filter(x => x.widgetCode == 'W_Design_Request_This_Week' && x.isSelected === true);
    if (typeof w_Design_Request_This_Week != 'undefined' && w_Design_Request_This_Week != null && w_Design_Request_This_Week.length > 0) { this.W_Design_Request_This_Week = true; }

    let sW_Design_Completed: any;
    sW_Design_Completed = this.widgetdata.filter(x => x.widgetCode == 'SW_Design_Completed' && x.isSelected === true);
    if (typeof sW_Design_Completed != 'undefined' && sW_Design_Completed != null && sW_Design_Completed.length > 0) { this.SW_Design_Completed = true; }

    let sW_Design_InProgress: any;
    sW_Design_InProgress = this.widgetdata.filter(x => x.widgetCode == 'SW_Design_InProgress' && x.isSelected === true);
    if (typeof sW_Design_InProgress != 'undefined' && sW_Design_InProgress != null && sW_Design_InProgress.length > 0) { this.SW_Design_InProgress = true; }

    let sW_Total_Design_Request: any;
    sW_Total_Design_Request = this.widgetdata.filter(x => x.widgetCode == 'SW_Total_Design_Request' && x.isSelected === true);
    if (typeof sW_Total_Design_Request != 'undefined' && sW_Total_Design_Request != null && sW_Total_Design_Request.length > 0) { this.SW_Total_Design_Request = true; }

    //Finance
    let w_NTP_Pending_Lender_Wise: any;
    w_NTP_Pending_Lender_Wise = this.widgetdata.filter(x => x.widgetCode == 'W_NTP_Pending_Lender_Wise' && x.isSelected === true);
    if (typeof w_NTP_Pending_Lender_Wise != 'undefined' && w_NTP_Pending_Lender_Wise != null && w_NTP_Pending_Lender_Wise.length > 0) { this.W_NTP_Pending_Lender_Wise = true; }

    let w_Pending_Fund: any;
    w_Pending_Fund = this.widgetdata.filter(x => x.widgetCode == 'W_Pending_Fund' && x.isSelected === true);
    if (typeof w_Pending_Fund != 'undefined' && w_Pending_Fund != null && w_Pending_Fund.length > 0) { this.W_Pending_Fund = true; }

    let w_NTP_Pending: any;
    w_NTP_Pending = this.widgetdata.filter(x => x.widgetCode == 'W_NTP_Pending' && x.isSelected === true);
    if (typeof w_NTP_Pending != 'undefined' && w_NTP_Pending != null && w_NTP_Pending.length > 0) { this.W_NTP_Pending = true; }

    let sW_Pending_Funds: any;
    sW_Pending_Funds = this.widgetdata.filter(x => x.widgetCode == 'SW_Pending_Funds' && x.isSelected === true);
    if (typeof sW_Pending_Funds != 'undefined' && sW_Pending_Funds != null && sW_Pending_Funds.length > 0) { this.SW_Pending_Funds = true; }

    let sW_Total_Agreements: any;
    sW_Total_Agreements = this.widgetdata.filter(x => x.widgetCode == 'SW_Total_Agreements' && x.isSelected === true);
    if (typeof sW_Total_Agreements != 'undefined' && sW_Total_Agreements != null && sW_Total_Agreements.length > 0) { this.SW_Total_Agreements = true; }

    let sW_NTP_Pending_finance: any;
    sW_NTP_Pending_finance = this.widgetdata.filter(x => x.widgetCode == 'SW_NTP_Pending_finance' && x.isSelected === true);
    if (typeof sW_NTP_Pending_finance != 'undefined' && sW_NTP_Pending_finance != null && sW_NTP_Pending_finance.length > 0) { this.SW_NTP_Pending_finance = true; }

    //Installer

    let w_Average_Day: any;
    w_Average_Day = this.widgetdata.filter(x => x.widgetCode == 'W_Average_Day' && x.isSelected === true);
    if (typeof w_Average_Day != 'undefined' && w_Average_Day != null && w_Average_Day.length > 0) { this.W_Average_Day = true; }

    let w_Install_Record_Count: any;
    w_Install_Record_Count = this.widgetdata.filter(x => x.widgetCode == 'W_Install_Record_Count' && x.isSelected === true);
    if (typeof w_Install_Record_Count != 'undefined' && w_Install_Record_Count != null && w_Install_Record_Count.length > 0) { this.W_Install_Record_Count = true; }

    let w_Install_Inprogress: any;
    w_Install_Inprogress = this.widgetdata.filter(x => x.widgetCode == 'W_Install_Inprogress' && x.isSelected === true);
    if (typeof w_Install_Inprogress != 'undefined' && w_Install_Inprogress != null && w_Install_Inprogress.length > 0) { this.W_Install_Inprogress = true; }

    let sW_Request_Completed: any;
    sW_Request_Completed = this.widgetdata.filter(x => x.widgetCode == 'SW_Request_Completed' && x.isSelected === true);
    if (typeof sW_Request_Completed != 'undefined' && sW_Request_Completed != null && sW_Request_Completed.length > 0) { this.SW_Request_Completed = true; }

    let sW_Request_InProgress: any;
    sW_Request_InProgress = this.widgetdata.filter(x => x.widgetCode == 'SW_Request_InProgress' && x.isSelected === true);
    if (typeof sW_Request_InProgress != 'undefined' && sW_Request_InProgress != null && sW_Request_InProgress.length > 0) { this.SW_Request_InProgress = true; }

    let sW_Total_Install_Request: any;
    sW_Total_Install_Request = this.widgetdata.filter(x => x.widgetCode == 'SW_Total_Install_Request' && x.isSelected === true);
    if (typeof sW_Total_Install_Request != 'undefined' && sW_Total_Install_Request != null && sW_Total_Install_Request.length > 0) { this.SW_Total_Install_Request = true; }

    //ICP
    let w_Average_Day_Icp: any;
    w_Average_Day_Icp = this.widgetdata.filter(x => x.widgetCode == 'W_Average_Day_Icp' && x.isSelected === true);
    if (typeof w_Average_Day_Icp != 'undefined' && w_Average_Day_Icp != null && w_Average_Day_Icp.length > 0) { this.W_Average_Day_Icp = true; }

    let w_ICP_Record_Count: any;
    w_ICP_Record_Count = this.widgetdata.filter(x => x.widgetCode == 'W_ICP_Record_Count' && x.isSelected === true);
    if (typeof w_ICP_Record_Count != 'undefined' && w_ICP_Record_Count != null && w_ICP_Record_Count.length > 0) { this.W_ICP_Record_Count = true; }

    let w_ICP_InProgress: any;
    w_ICP_InProgress = this.widgetdata.filter(x => x.widgetCode == 'W_ICP_InProgress' && x.isSelected === true);
    if (typeof w_ICP_InProgress != 'undefined' && w_ICP_InProgress != null && w_ICP_InProgress.length > 0) { this.W_ICP_InProgress = true; }

    let sW_Total_ICP_Request: any;
    sW_Total_ICP_Request = this.widgetdata.filter(x => x.widgetCode == 'SW_Total_ICP_Request' && x.isSelected === true);
    if (typeof sW_Total_ICP_Request != 'undefined' && sW_Total_ICP_Request != null && sW_Total_ICP_Request.length > 0) { this.SW_Total_ICP_Request = true; }
    //Engineering
    //W_Engineering_Record_Count: boolean = false;
    //W_Average_Day_Engineering: boolean = false;
    //W_Engineering_InProgress: boolean = false;
    //SW_Total_Engineering_Requests: boolean = false;

    let w_Engineering_Record_Count: any;
    w_Engineering_Record_Count = this.widgetdata.filter(x => x.widgetCode == 'W_Engineering_Record_Count' && x.isSelected === true);
    if (typeof w_Engineering_Record_Count != 'undefined' && w_Engineering_Record_Count != null && w_Engineering_Record_Count.length > 0) { this.W_Engineering_Record_Count = true; }

    let w_Average_Day_Engineering: any;
    w_Average_Day_Engineering = this.widgetdata.filter(x => x.widgetCode == 'W_Average_Day_Engineering' && x.isSelected === true);
    if (typeof w_Average_Day_Engineering != 'undefined' && w_Average_Day_Engineering != null && w_Average_Day_Engineering.length > 0) { this.W_Average_Day_Engineering = true; }

    let w_Engineering_InProgress: any;
    w_Engineering_InProgress = this.widgetdata.filter(x => x.widgetCode == 'W_Engineering_InProgress' && x.isSelected === true);
    if (typeof w_Engineering_InProgress != 'undefined' && w_Engineering_InProgress != null && w_Engineering_InProgress.length > 0) { this.W_Engineering_InProgress = true; }

    let sW_Total_Engineering_Requests: any;
    sW_Total_Engineering_Requests = this.widgetdata.filter(x => x.widgetCode == 'SW_Total_Engineering_Requests' && x.isSelected === true);
    if (typeof sW_Total_Engineering_Requests != 'undefined' && sW_Total_Engineering_Requests != null && sW_Total_Engineering_Requests.length > 0) { this.SW_Total_Engineering_Requests = true; }
  }
  onChange(Id: any, event) {
    const checked = event.target.checked;

    if (checked) {
      this.selected.push(Id);
      // this.widgetId += Id.toString() + ",";
    }
    else {

      const index = this.selected.indexOf(Id);
      this.selected.splice(index, 1);

    }


    this.values = this.selected.toString();
    const count = this.selected.length;
    this.count = count;
    this.widgetId = this.selected.toString();
  }
  save() {
    const count = this.selected.length;

    this.dashboardservice.SaveWidget(this.widgetId).subscribe((result: any) => {
      if (result.StatusCode == 200) {




        this.widgetId = "";
        this.selected = [];
        window.location.reload();
        this.toaster.success(result.responseMessage);

      }
      else {
        this.widgetId = "";
        this.selected = [];
        this.toaster.success(result.responseMessage);
        window.location.reload();
      }
    })
    this.widgetId = "";
    this.selected = [];

  }

  addedit() {
    this.router.navigateByUrl("dashboard/add");
  };

  gotopage(item: any) {
    //var sss = [item.widgetRoute] + item.widgetID;
    //this.stage = item.masterIdAuto;
    //var obj = this.FilterUrl;
    //obj.stage = item.masterIdAuto;
    //this.router.navigate([item.widgetRoute], { queryParams: obj });
    //debugger
    this.router.navigate([item.widgetRoute + item.widgetID]);
  };

  ////FILTER Section from on top
  OnChangedToDate(event) {

    this.TO = event.toLocaleDateString();
    //this.GetDashboardAppointmentList(this.From, this.TO);
    this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewData);
  }
  OnChangedFromDate(event) {
    this.From = event.toLocaleDateString();
   // this.GetDashboardAppointmentList(this.From, this.TO);
    this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewData);
  }
  onWeek() {
    this.show = false;
    this.selectedFilter = "Last 7 Days";
    var date = new Date();
    date.setDate(date.getDate() - 7);

    // var finalDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    var finalDate = this.datePipe.transform(date, 'MM/dd/yyyy');

    this.GetDashboardWidgetforuser(finalDate, '', this.DashboardViewData);
    //this.GetDashboardAppointmentList(finalDate, '');
    //this.ShowLeadGraph(finalDate, '');
    //this.ShowOpportunityOwnerGraph(finalDate, '');
   // this.ShowOpportunityGraph(finalDate, '');
  }

  onMonth() {
    this.show = false;
    this.selectedFilter = "This Month";
    var date = new Date();
    var CurrentDate = this.datePipe.transform(date, 'MM/dd/yyyy');
    var myVariable = this.datePipe.transform(date, 'dd MMM yyyy');
    var makeDate = new Date(myVariable.toString());
    makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
    var myVariable12 = this.datePipe.transform(makeDate, 'MM/dd/yyyy');
    this.selectedFilter = "Last One Month" + '' + '( ' + (myVariable12 + ' - ' + CurrentDate) + ' )';

    this.GetDashboardWidgetforuser(myVariable12, CurrentDate, this.DashboardViewData)
   // this.GetDashboardAppointmentList(myVariable12, '')
   // this.ShowLeadGraph(myVariable12, '');
    //this.ShowOpportunityOwnerGraph(myVariable12, '');
   // this.ShowOpportunityGraph(myVariable12, '');
  };

  onYear() {
    this.show = false;
    this.selectedFilter = "Last 30 Days";
    var d = new Date();
    var pastYear = d.getFullYear() - 1;
    d.setFullYear(pastYear);
    var myVariable = this.datePipe.transform(d, 'MM/dd/yyyy');

    this.GetDashboardWidgetforuser(myVariable, '', this.DashboardViewData)
    //this.GetDashboardAppointmentList(myVariable, '')
   // this.ShowLeadGraph(myVariable, '');
    //this.ShowOpportunityOwnerGraph(myVariable, '');
    //this.ShowOpportunityGraph(myVariable, '');
  }
  thisMopnth() {
    this.show = false;
    this.rangeDates = null;

    this.selectedFilter = "This Month";
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);


    var first = this.datePipe.transform(firstDay, 'MM/dd/yyyy');

    var last = this.datePipe.transform(lastDay, 'MM/dd/yyyy');

    this.selectedFilter = "This Month" + '' + '( ' + (first + ' - ' + last) + ' )';
    this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
    //this.GetDashboardAppointmentList(first, last);
    //this.ShowLeadGraph(first, last);
   // this.ShowOpportunityOwnerGraph(first, last);
   // this.ShowOpportunityGraph(first, last);
    this.showDateFilter = !this.showDateFilter;
  }
  today() {
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Today";
    var myDate = new Date();
    var todaydate = this.datePipe.transform(myDate, 'MM/dd/yyyy');
    //this.selectedFilter = "Today" + ;
    this.selectedFilter = "Today" + '' + '( ' + (todaydate + ' - ' + todaydate) + ' )';
    // alert(todaydate);
    this.GetDashboardWidgetforuser(todaydate, todaydate, this.DashboardViewData);
   // this.GetDashboardAppointmentList(todaydate, '');
   // this.ShowLeadGraph(todaydate, '');
  //  this.ShowOpportunityOwnerGraph(todaydate, '');
   // this.ShowOpportunityGraph(todaydate, '');
   // this.showDateFilter = !this.showDateFilter;

  }
  yesterday() {
    this.rangeDates = null;
    this.show = false;
    this.selectedFilter = "Yesterday";
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    dte.toString();

    var yesterdaydate = this.datePipe.transform(dte, 'MM/dd/yyyy');
    this.selectedFilter = "Yesterday" + '' + '( ' + (yesterdaydate + ' - ' + yesterdaydate) + ' )';
    this.GetDashboardWidgetforuser(yesterdaydate, yesterdaydate, this.DashboardViewData);
   // this.GetDashboardAppointmentList(yesterdaydate, '');
   // this.ShowLeadGraph(yesterdaydate, '');
   // this.ShowOpportunityOwnerGraph(yesterdaydate, '');
   // this.ShowOpportunityGraph(yesterdaydate, '');
    this.showDateFilter = !this.showDateFilter;
  }
  lastMonth() {
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Last Month";
    var date = new Date();
    date = new Date(date.setMonth(date.getMonth() - 1));
    var monthStartDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var monthEndDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);



    var first = this.datePipe.transform(monthStartDay, 'MM/dd/yyyy');

    var last = this.datePipe.transform(monthEndDay, 'MM/dd/yyyy');

    this.selectedFilter = "Last Month" + '' + '( ' + (first + ' - ' + last) + ' )';

    this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
    ////this.GetDashboardAppointmentList(first, last);
    //this.ShowLeadGraph(first, last);
   // this.ShowOpportunityOwnerGraph(first, last);
   // this.ShowOpportunityGraph(first, last);
    this.showDateFilter = !this.showDateFilter;
  }
  thisYear() {
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "This Year";
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, 0, 1);
    var lastDay = new Date(y, 11, 31);


    var first = this.datePipe.transform(firstDay, 'MM/dd/yyyy');

    var last = this.datePipe.transform(lastDay, 'MM/dd/yyyy');

    this.selectedFilter = "This Year" + '' + '( ' + (first + ' - ' + last) + ' )';

    this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
    //this.GetDashboardAppointmentList(first, last);
   // this.ShowLeadGraph(first, last);
    //this.ShowOpportunityOwnerGraph(first, last);
    //this.ShowOpportunityGraph(first, last);
    this.showDateFilter = !this.showDateFilter;
  }
  lastYear() {
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Last Year";
    var date = new Date(),
      y = (date.getFullYear() - 1);
    var firstDay = new Date(y, 0, 1);
    var lastDay = new Date(y, 11, 31);
    var first = this.datePipe.transform(firstDay, 'MM/dd/yyyy');
    var last = this.datePipe.transform(lastDay, 'MM/dd/yyyy');
    this.selectedFilter = "Last Year" + '' + '( ' + (first + ' - ' + last) + ' )';
    this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
   /// this.GetDashboardAppointmentList(first, last);
    //this.ShowLeadGraph(first, last);
    //this.ShowOpportunityOwnerGraph(first, last);
    //this.ShowOpportunityGraph(first, last);
    this.showDateFilter = !this.showDateFilter;
  }
  customRange() {
    this.selectedFilter = "Custom Range";
  }
  hideCalendar(event) {
    if (event.target.tagName == 'DIV' || event.target.tagName == 'UL')
    {
    this.showDateFilter = false;
    }
  }
  ShowCustomDateFilter() {
    this.showDateFilter = !this.showDateFilter;
  }
  OnChangedDateRange(event: any) {

    this.From = this.datePipe.transform(this.rangeDates[0], 'MM/dd/yyyy');
    if (this.rangeDates[1] != null) {
      this.TO = this.datePipe.transform(this.rangeDates[1], 'MM/dd/yyyy');
    }
    if (this.From != null && this.TO != null) {
     // this.GetDashboardAppointmentList(this.From, this.TO);
      this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewData);
     // this.ShowLeadGraph(this.From, this.TO);
     // this.ShowOpportunityOwnerGraph(this.From, this.TO);
     // this.ShowOpportunityGraph(this.From, this.TO);

      this.selectedFilter = "Custom Range" + '' + '( ' + (this.From + ' - ' + this.TO) + ' )';
      this.startCalendar.overlayVisible = false;
      this.showDateFilter = !this.showDateFilter;

    }
    else {
      this.selectedFilter = "Custom Range";
    }
  }
  ThisWeek() {
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "This Week";
    var current = new Date();

   // let today = new Date().toLocaleDateString();
    var weekstart = current.getDate() - current.getDay() + 1;

    var last = weekstart + 6;


         // end day is the first day + 6
    var monday = new Date(current.setDate(weekstart));
    var sunday = new Date(current.setDate(last)).toUTCString();

    var weekstartday : any = this.datePipe.transform(monday, 'MM/dd/yyyy')
    var weekendday: any = this.datePipe.transform(sunday, 'MM/dd/yyyy');

    this.selectedFilter = "This Week" + '' + '( ' + (weekstartday + ' - ' + weekendday) + ' )';

    this.GetDashboardWidgetforuser(weekstartday, weekendday, this.DashboardViewData);
    //this.GetDashboardAppointmentList(weekstartday, '');
   // this.ShowLeadGraph(weekstartday, '');
   // this.ShowOpportunityOwnerGraph(weekstartday, '');
    //this.ShowOpportunityGraph(weekstartday, '');
   // this.showDateFilter = !this.showDateFilter;
  }

  LastWeek() {
    this.show = false;

    this.rangeDates = null;
    this.selectedFilter = "Last Week";
    var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
      , day = beforeOneWeek.getDay()
      , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
      , lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
      , lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));
    var lastweekstartday = this.datePipe.transform(lastMonday, 'MM/dd/yyyy');
    var lastweekendday = this.datePipe.transform(lastSunday, 'MM/dd/yyyy');


    this.selectedFilter = "Last Week" + '' + '( ' + (lastweekstartday + ' - ' + lastweekendday) + ' )';

    this.GetDashboardWidgetforuser(lastweekstartday, lastweekendday, this.DashboardViewData);
    //this.GetDashboardAppointmentList(lastweekstartday, lastweekendday);
   // this.ShowLeadGraph(lastweekstartday, lastweekendday);
    //this.ShowOpportunityOwnerGraph(lastweekstartday, lastweekendday);
    //this.ShowOpportunityGraph(lastweekstartday, lastweekendday);
    this.showDateFilter = !this.showDateFilter;
  }

  ShowDashboardViewData() {
    this.DashboardViewData = !this.DashboardViewData;
    this.GetDashboardWidgetforuser('', '', this.DashboardViewData);
  }
  SetFormatedData(json: any) {
   return JSON.stringify(json, null, 4)
  }
  SetDashboardViewType(type: any) {
    this.DashboardViewType = type;
    if (type != "me") {
      this.GetUserTeam(type);
    }
    if (type == "team") {
      this.TeamDataText = "Select User";
    }  
    else {
      this.TeamDataText = "Select Team";
    }

    if (type == "me") {
      this.DashboardFilterTeam = null;
      this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewType);
    }
  }
  SetDashboardFilterTeam(item: any) {
    this.DashboardFilterTeam = item.value;
    this.TeamDataText = item.name;
    this.ShowTeamData = false;
    this.ShowServiceTerrData = false;
    this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewType);
  }

  ShowTeamDataS() {
    this.ShowTeamData = !this.ShowTeamData;
  }
  SetFilterUrl(fromDate: any, toDate: any) {
    let teamId: any = null;
    let teamMemberId: any = null;
    if (this.DashboardViewType == "company") {
      teamId = this.DashboardFilterTeam;
      teamMemberId = null;
    }
    else if (this.DashboardViewType == "team") {
      teamId = null;
      teamMemberId = this.DashboardFilterTeam;
    }
    else {
      teamId = null;
      teamMemberId = null;
    }
      this.FilterUrl = { stage: this.stage, fromDate: fromDate, toDate: toDate, widgetType: '', recordFilter: this.DashboardViewType, teamID: teamId, teamMemberID: teamMemberId };
  }

  ShowServiceTerr() {
    this.ShowServiceTerrData = !this.ShowServiceTerrData;
  }
  GetserviceTerr() {
    this.commonService.getMasterItemsList("ServiceTerritory").subscribe((result: any) => {
      this.ShowServiceTerrList = this.commonService.masters;
    })
  }
  SetDashboardFilterServiceTerritory(item: any) {
    this.ServiceTerritoryid = item.value;
    this.ServiceTerritoryName = item.text;
    this.ShowTeamData = false;
    this.ShowServiceTerrData = false;
    this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewType);
  }
}
