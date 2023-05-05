import { Component, OnInit, Input, ViewChild, Inject, ElementRef, HostListener  } from '@angular/core';
import { UserDetails, CommonService, ModuleList  } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Calendar } from 'primeng/calendar';
import { UserprofileService } from '../../userprofile/userProfile.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { SubscriptionService } from '../super-admin-subscriptions/subscription.service';
import { ContactusleadsService } from '../../contactusleads/contactusleads.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {
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
  selected: any[];
  count: any;
  values: any;
  widgetId: any;
  From: any = null;
  TO: any = null ;
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
  tilewidget: any[];
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

  currentPage = 0;
  searchBy: string = '';
  searchIndustry: string = null;
  loading: boolean;
  sortDir: any = 'desc';
  sortColumn: any = 'CreatedOn';
  pageNo = 0;
  pageSize = 15;
  pagedData: any = {
    pager: {},
    data: [],
  };
  lstPageSize: any;
  listFilter:any = '';

  
  lstPageSize_Leads: any;
  sortDir_Leads: any = 'desc';
  sortColumn_Leads: any = 'FullName';
  pageNo_Leads = 0;
  pageSize_Leads = 15;
  pagedData_Leads: any = {
    pager: {},
    data: [],
  };
  deleteId: string;
  subscriptionListWidget: any = 0;
  leadsListWidget: any = 0;
  leadsCountWidget: any = 0;
  subscriptionCountWidget: any = 0;
  totalItems: any;
  
  constructor(private dashboardservice: DashboardService, private dialogService: ConfirmationDialogService,private userprofileService: UserprofileService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe
    , private toaster: ToastrService,
    private subService: SubscriptionService,
    private el: ElementRef,private contactusleadsService: ContactusleadsService,
    @Inject(DOCUMENT) private document: any

  ) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.usertype = userdetail.userType;
      this.loginuserid = userdetail.id;
      this.isHOD = userdetail.isHOD;
    });
  }
  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.closeFullscreen();
    }
  }

  ngOnInit() {
    this.userprofileService.getUserProfile().subscribe((result: any) => {
      if (result && result.userTypeName=="usertypesuperadmin") {
        this.isSuperAdmin = true;
      }
    })
    this.loadSave = true;
    this.sizeNo = 28;
    this.currPageNo = 0;
    this.selected = [];
    this.show = false;
    this.DashboardViewType = 'me';
    this.isFullScreen = false;
    this.checkUserStatus();
    //this.onMonth();
    this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewData)
    this.getSubscriptionList(this.From, this.TO);
    this.getAllContactUsLeads(this.From, this.TO);
    this.getPageSizes();
  };

  
  getAllContactUsLeads(startDate, endDate){
    this.contactusleadsService.getContactUsLeadsList(this.listFilter, this.sortColumn_Leads, this.sortDir_Leads, this.pageNo_Leads, this.pageSize_Leads, true, startDate, endDate).subscribe(
      response => {
        
        this.pagedData_Leads = response;
      }
    )
  }

  setPageNo($event) 
  {
    this.pageNo = $event.page - 1;
    this.getSubscriptionList(this.From, this.TO);
  }

  setPageNo_Leads($event) 
  {
    this.pageNo_Leads = $event.page - 1;
    this.getAllContactUsLeads(this.From, this.TO)
  }

  setPage_Leads($event) 
  {
    this.loading = true;
    this.pageNo_Leads = $event.page - 1;
    this.getAllContactUsLeads(this.From, this.TO)
  }

  setPage($event) 
  {
    debugger
    this.loading = true;
    this.pageNo = $event.page - 1;
    this.getSubscriptionList(this.From, this.TO)
  }

  onSelect({ selected }) {
    ;
    if (this.deleteId == '' || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ',';
      }
    } else {
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ',';
      }
    }
  }
  

  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      debugger
      this.lstPageSize_Leads = this.lstPageSize = this.commonService.masters;
    });
  }
 
  getSubscriptionList(startDate, endDate) {
    this.loadSave = true;
    debugger
    return this.subService.
      GetSubscriptionList(this.sortColumn, this.sortDir, this.pageSize, this.pageNo, this.searchBy, this.searchIndustry || '', true, startDate, endDate).
      subscribe(res => {
        debugger
        this.pagedData = {
          pager: res.pager,
          data: res.data
        }
        this.pagedData.pager.currentPage += 1;
       this.totalItems =   this.pagedData.pager.totalItems
       this.loadSave = false;
      });
  }
  checkUserStatus()
  {
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

  GetDashboardWidgetforuser(fromDate: any, toDate: any, recordFilter) {
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
    this.dashboardservice.GetDashboardWidgetsForSuperAdmin(fromDate, toDate, this.DashboardViewType, teamId, teamMemberId, this.ServiceTerritoryid, true).subscribe(result => {
      debugger
      this.leadsListWidget = result[0].LeadsListWidget;
      this.subscriptionListWidget = result[0].SubscriptionListWidget;
      this.leadsCountWidget = result[0].CountWidget;
      this.subscriptionCountWidget = result[0].Subscription_CountWidget;
      this.tilewidget = result as Array<any>;
      this.From = null;
      this.TO = null;
      this.loadSave = false;
    })
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
  
  onChange_Subscription($event) {
    ;
    this.pageSize = Number($event.text);
    this.pageNo = 0;
    // this.refresh();
    this.getSubscriptionList(this.From, this.TO)
  }
  onChange_Leads($event) {
    ;
    this.pageSize_Leads = Number($event.text);
    this.pageNo_Leads = 0;
    // this.refresh();
    this.getAllContactUsLeads(this.From, this.TO)  
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
    this.router.navigateByUrl("super-admin-dashboard/add-edit-super-admin-dashboard");
  };

  onWeek() {
    this.show = false;
    this.selectedFilter = "Last 7 Days";
    var date = new Date();
    date.setDate(date.getDate() - 7);
    var finalDate = this.datePipe.transform(date, 'MM/dd/yyyy');

    this.getSubscriptionList(finalDate, '');
    //this.GetDashboardWidgetforuser(finalDate, '', this.DashboardViewData);
  }

  onMonth() {
    this.show = false;
    this.selectedFilter = "This Month";
    var date = new Date();
    var CurrentDate = this.datePipe.transform(date, 'MM/dd/yyyy');
    var myVariable = this.datePipe.transform(date, 'dd MMM yyyy');
    var makeDate = new Date(myVariable.toString());
    makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
    var fromDate = this.datePipe.transform(makeDate, 'MM/dd/yyyy');
    this.selectedFilter = "Last One Month" + '' + '( ' + (fromDate + ' - ' + CurrentDate) + ' )';

    this.getAllContactUsLeads(fromDate, CurrentDate);
    this.getSubscriptionList(fromDate, CurrentDate);
    this.GetDashboardWidgetforuser(fromDate, CurrentDate, this.DashboardViewData)
  };

  onYear() {
    this.show = false;
    this.selectedFilter = "Last 30 Days";
    var d = new Date();
    var pastYear = d.getFullYear() - 1;
    d.setFullYear(pastYear);
    var year = this.datePipe.transform(d, 'MM/dd/yyyy');

    this.getSubscriptionList(year, '');
    //this.GetDashboardWidgetforuser(myVariable, '', this.DashboardViewData)
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
    //this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
    this.getSubscriptionList(first, last);
    this.getAllContactUsLeads(first, last);
    this.showDateFilter = !this.showDateFilter;
  }
  today() {
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Today";
    var myDate = new Date();
    var todaydate = this.datePipe.transform(myDate, 'MM/dd/yyyy');
    this.From = this.TO = todaydate;
    this.selectedFilter = "Today" + '' + '( ' + (todaydate + ' - ' + todaydate) + ' )';
    this.pagedData.pager.currentPage = 0;
    this.pageNo = 0;
    //this.GetDashboardWidgetforuser(todaydate, todaydate, this.DashboardViewData);
    this.getAllContactUsLeads(todaydate, todaydate);
    this.getSubscriptionList(todaydate, todaydate);  

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
    this.From = yesterdaydate;
    this.TO = yesterdaydate;
    this.pagedData.pager.currentPage = 0;
    this.pageNo = 0;
    //this.GetDashboardWidgetforuser(yesterdaydate, yesterdaydate, this.DashboardViewData);
    this.getAllContactUsLeads(yesterdaydate, yesterdaydate);
    this.getSubscriptionList(yesterdaydate, yesterdaydate);
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
    this.From = first;
    this.TO = last;
    this.pagedData.pager.currentPage = 0;
    this.pageNo = 0;
    //this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
    this.getAllContactUsLeads(first, last);
    this.getSubscriptionList(first, last);
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

    this.From = first;
    this.TO = last;
    this.pagedData.pager.currentPage = 0;
    this.pageNo = 0;
    //this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
    this.getAllContactUsLeads(first, last);
    this.getSubscriptionList(first, last);
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
    //this.GetDashboardWidgetforuser(first, last, this.DashboardViewData);
    this.From = first;
    this.TO = last;
    this.pagedData.pager.currentPage = 0;
    this.pageNo = 0;
    this.getAllContactUsLeads(first, last);
    this.getSubscriptionList(first, last);
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
      this.getAllContactUsLeads(this.From, this.TO);
      this.getSubscriptionList(this.From, this.TO);

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

    debugger
         // end day is the first day + 6
    var monday = new Date(current.setDate(weekstart));
    var sunday = new Date(current.setDate(last));

    var weekendday : any = this.datePipe.transform(monday, 'MM/dd/yyyy')
    var weekstartday : any = this.datePipe.transform(sunday, 'MM/dd/yyyy');

    this.selectedFilter = "This Week" + '' + '( ' + (weekstartday + ' - ' + weekendday) + ' )';

    this.From = weekstartday;
    this.TO = weekendday;
    this.pagedData.pager.currentPage = 0;
    this.pageNo = 0;
    //this.pagedData.pager.currentPage = 0;
    this.getSubscriptionList(this.From, this.TO);
    this.getAllContactUsLeads(this.From, this.TO);
    //this.GetDashboardWidgetforuser(weekstartday, weekendday, this.DashboardViewData);
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

    this.From = lastweekstartday;
    this.TO = lastweekendday;
    this.pagedData.pager.currentPage = 0;
    this.pageNo = 0;
    this.getSubscriptionList( this.From, this.TO);
    this.getAllContactUsLeads( this.From, this.TO);
    //this.GetDashboardWidgetforuser(lastweekstartday, lastweekendday, this.DashboardViewData);
    //this.GetDashboardAppointmentList(lastweekstartday, lastweekendday);
   // this.ShowLeadGraph(lastweekstartday, lastweekendday);
    //this.ShowOpportunityOwnerGraph(lastweekstartday, lastweekendday);
    //this.ShowOpportunityGraph(lastweekstartday, lastweekendday);
    this.showDateFilter = !this.showDateFilter;
  }
  // @ViewChild('htmlbody', { static: false }) body: ElementRef;

  // openFullscreen() {
  //   this.isFullScreenSection = !this.isFullScreenSection;
  //   this.sizeNo = 28;
  //   this.currPageNo = 0;
    
  //   if (this.isFullScreenSection) {
  //     let myTag = document.getElementById('htmlbody');
  //     if (!myTag.classList.contains('fixed-topbar fixed-sidebar theme-sdtl color-default dashboard')) {
  //       myTag.classList.remove('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard');
  //       myTag.classList.add('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard', 'sidebar-collapsed');
  //     }
  //   }
  //     else {
  //       let myTag1 = document.getElementById('htmlbody');
  //       myTag1.classList.remove('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard', 'sidebar-collapsed');
  //       myTag1.classList.add('fixed-topbar', 'fixed-sidebar', 'theme-sdtl', 'color-default', 'dashboard');
  //     }

      

  //   this.isFullScreen = !this.isFullScreen;//true;
  //   if (this.isFullScreen == false) {
  //     this.closeFullscreen();
  //   }
  //   if (this.elem.requestFullscreen) {
  //     this.elem.requestFullscreen();
  //   } else if (this.elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     this.elem.mozRequestFullScreen();
  //   } else if (this.elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     this.elem.webkitRequestFullscreen();
  //   } else if (this.elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     this.elem.msRequestFullscreen();
  //   }
    
  // };

  // GetWidgetRecordsRowWise() {
  //   this.widgetRecords.forEach(t => {
  //     if (t.graphType == null) {
  //       let obj =
  //       {
  //         displayOrder:t.displayOrder,
  //         graphData: t.graphData,
  //         graphType: t.graphType,
  //         isSelected: t.isSelected,
  //         masterIdAuto: t.masterIdAuto,
  //         onlyForHOD: t.onlyForHOD,
  //         selectedwidgetsIds: t.selectedwidgetsIds,
  //         widgetBoxClass: t.widgetBoxClass,
  //         widgetCode: t.widgetCode,
  //         widgetCount: t.widgetCount,
  //         widgetDescription: t.widgetDescription,
  //         widgetGroupCode: t.widgetGroupCode,
  //         widgetGroupID: t.widgetGroupID,
  //         widgetGroupName: t.widgetGroupName,
  //         widgetID: t.widgetID,
  //         widgetIconClass: t.widgetIconClass,
  //         widgetName: t.widgetName,
  //         widgetRoute: t.widgetRoute,
  //         widgetTextClass: t.widgetTextClass,
  //         widgetimage: t.widgetimage
  //       }
  //       this.itemarray.push(obj);
  //     }
  //   });

  //   this.widgetRecords.forEach(t => {
  //     if (t.graphType != null) {
  //       let obj =
  //       {
  //         displayOrder: t.displayOrder,
  //         graphData: t.graphData,
  //         graphType: t.graphType,
  //         isSelected: t.isSelected,
  //         masterIdAuto: t.masterIdAuto,
  //         onlyForHOD: t.onlyForHOD,
  //         selectedwidgetsIds: t.selectedwidgetsIds,
  //         widgetBoxClass: t.widgetBoxClass,
  //         widgetCode: t.widgetCode,
  //         widgetCount: t.widgetCount,
  //         widgetDescription: t.widgetDescription,
  //         widgetGroupCode: t.widgetGroupCode,
  //         widgetGroupID: t.widgetGroupID,
  //         widgetGroupName: t.widgetGroupName,
  //         widgetID: t.widgetID,
  //         widgetIconClass: t.widgetIconClass,
  //         widgetName: t.widgetName,
  //         widgetRoute: t.widgetRoute,
  //         widgetTextClass: t.widgetTextClass,
  //         widgetimage: t.widgetimage
  //       }
  //       this.itemGraphArray.push(obj);
  //     }
  //   });

  //   this.widgetdata = this.itemarray.concat(this.itemGraphArray);
  //   this.widgetdata = this.widgetdata.slice(this.currPageNo, this.sizeNo);
  //   this.widgetGraphDataFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "Graph_Widget");
  //   if (this.currPageNo == this.sizeNo)
  //   {
  //     this.sizeNo = 0;
  //   }
  //   else {
  //     this.currPageNo = this.sizeNo;
  //     this.sizeNo = this.sizeNo + this.noOfRecordOnPageFullScreen;
  //   //this.currPageNo = this.currPageNo + this.noOfRecordOnPageFullScreen;
  //   this.tilewidgetFullscreen = this.widgetdata.filter(x => x.widgetGroupCode == "Tile_Widget");//1
  //   this.widgetGraphDataFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "Graph_Widget");//3

  //   this.widgetTableDataFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "List_Widget");//4
  //   this.widgetListCountDateFullScreen = this.widgetdata.filter(x => x.widgetGroupCode == "List_Count_widget")

  //   let backgroundcolor: String[] = [];
  //   for (i = 0; i < this.widgetListCountDateFullScreen.length; i++) {
  //     this.datatss2FullScreen.push(JSON.parse(this.widgetListCountDateFullScreen[i].graphData));
  //   }
  //   for (var i = 0; i < this.tilewidgetFullscreen.length; i++) {
  //     if (parseInt(this.tilewidgetFullscreen[i].widgetCount) >= 0) {
  //       this.tilewidgetFullscreen[i].widgetCount = this.commonService.formatAmount(this.tilewidgetFullscreen[i].widgetCount);
  //     }
  //   }
  //   }
  //   if (this.widgetRecords.length < this.sizeNo) {
  //     let diff = this.sizeNo - this.widgetRecords.length;
  //     if (diff > 0) {
  //       this.sizeNo = this.sizeNo - (diff);
  //     }
  //     else {
  //       this.sizeNo = 28;
  //       this.currPageNo = 0;
  //     }
  //   }
  //   if (this.sizeNo==0) {
  //     this.sizeNo = 28;
  //     this.currPageNo = 0;
  //   }
  // };

  

  // loadDashboard() {
  //   var current = new Date();
  //   // let today = new Date().toLocaleDateString();
  //   var weekstart = current.getDate() - current.getDay() + 1
  //   var last = weekstart + 6;
  //   // end day is the first day + 6
  //   var monday = new Date(current.setDate(weekstart));
  //   var sunday = new Date(current.setDate(last)).toUTCString();
  //   var weekstartday: any = this.datePipe.transform(monday, 'MM/dd/yyyy')
  //   var weekendday: any = this.datePipe.transform(sunday, 'MM/dd/yyyy');
  //   this.GetDashboardWidgetforuser(weekstartday, weekendday, this.DashboardViewData);
  // };

  // ShowLeadGraph(fromDate, toDate) {
  //   this.leadloadChart = true;
  //   this.dashboardservice.GetLeadGraph(this.loginuserid, fromDate, toDate).pipe(debounceTime(5000)).subscribe(response => {
  //     this.leadgraphrows = response;
  //     this.leadgraphtemp = this.leadgraphrows;

  //     this.leadgcolumnNames = this.leadgraphrows.map(function (a) {
  //       return a.leadStatus;
  //     });
  //     let countlic = null;
  //     if (this.leadgraphrows.length == 0) {
  //       this.leadgcolumnNames = [];
  //       this.leadgraphtemp = [];
  //       countlic = 1;
  //     }
  //     else {
  //       this.leadgraphtemp = this.leadgraphrows.map(function (a) {
  //         return a.leadStatusCount;
  //       });
  //     }
  //     if (this.leadgraphtemp[0] < 10) {
  //       countlic = 1;
  //     }
  //     let backgroundcolor: String[] = [];
  //     let index = 0;
  //     for (let color of this.leadgcolumnNames) {
  //       backgroundcolor[index] = '#' + Math.floor(Math.random() * 16777215).toString(16);
  //       index = index + 1;
  //     }

  //     this.leadData = {
  //       labels: this.leadgcolumnNames,
  //       datasets: [
  //         {
  //           backgroundColor: backgroundcolor,
  //           data: this.leadgraphtemp
  //         }
  //       ]
  //     }
  //     this.leadoptions = {
  //       legend: {
  //         position: 'bottom'
  //       }
  //     }
  //     this.leadloadChart = false;
  //     this.From = null;
  //     this.TO = null;
  //   });

  // }

  // ShowOpportunityOwnerGraph(fromDate, toDate) {
  //   this.ownerloadChart = true;
  //   this.dashboardservice.GetOpportunityOwnerGraph(this.loginuserid, fromDate, toDate).subscribe(response => {
  //     this.ownergraphrows = response;
  //     this.ownergraphtemp = this.ownergraphrows;

  //     this.ownergcolumnNames = this.ownergraphrows.map(function (a) {
  //       return a.ownerName;
  //     });
  //     let countlic = null;
  //     if (this.ownergraphrows.length == 0) {
  //       this.ownergcolumnNames = [];
  //       this.ownergraphtemp = [];
  //       countlic = 1;
  //     }
  //     else {
  //       this.ownergraphtemp = this.ownergraphrows.map(function (a) {
  //         return a.ownerCount;
  //       });
  //     }
  //     if (this.ownergraphtemp[0] < 10) {
  //       countlic = 1;
  //     }

  //     this.ownerdata = {
  //       labels: this.ownergcolumnNames,
  //       datasets: [
  //         {
  //           barThickness: 25,
  //           label: '',
  //           backgroundColor: '#22466a',
  //           borderColor: '#1E88E5',
  //           data: this.ownergraphtemp
  //         }
  //       ]
  //     }
  //     this.owneroptions = {
  //       scales: {
  //         xAxes: [
  //           {
  //             showTooltips: true,
  //             responsive: false,
  //             maintainAspectRatio: false,
  //             multiTooltipTemplate: function (label) {
  //               return label.toString();
  //             },

  //             ticks: {
  //               beginAtZero: true,
  //               fixedStepSize: countlic,
  //             }
  //           }
  //         ],
  //       },
  //       legend: { display: false }
  //     }
  //     this.loadChart = false;
  //     this.From = null;
  //     this.TO = null;
  //   });

  // }

  // ShowOpportunityGraph(fromDate, toDate) {
  //   this.loadChart = true;
  //   this.dashboardservice.GetOpportunityGraph(this.loginuserid, fromDate, toDate).subscribe(response => {
  //     this.graphrows = response;
  //     this.graphtemp = this.graphrows;
  //     this.gcolumnNames = this.graphrows.map(function (a) {
  //       return a.stageName;
  //     });
  //     let countlic = null;
  //     if (this.graphrows.length == 0) {
  //       this.gcolumnNames = [];
  //       this.graphtemp = [];
  //       countlic = 1;
  //     }
  //     else {
  //       this.graphtemp = this.graphrows.map(function (a) {
  //         return a.stageCount;
  //       });
  //     }
  //     if (this.graphtemp[0] < 10) {
  //       countlic = 1;
  //     }

  //     this.data = {
  //       labels: this.gcolumnNames,
  //       datasets: [
  //         {
  //           barThickness: 25,
  //           label: '',
  //           callback: function (value, index, values) {
  //             if (parseInt(value) >= 1000) {
  //               return value.toString();
  //             } else {
  //               return value;
  //             }
  //           },
  //           backgroundColor: '#22466a',
  //           borderColor: '#1E88E5',
  //           data: this.graphtemp
  //         }
  //       ]
  //     }
  //     this.options = {
  //       scales: {
  //         yAxes: [{
  //           label: '',
  //           showTooltips: true,
  //           responsive: false,
  //           maintainAspectRatio: false,
  //           multiTooltipTemplate: function (label) {
  //             return label.toString();
  //           },
  //           ticks: {
  //             beginAtZero: true,
  //             fixedStepSize: countlic,
  //             callback: function (value, index, values) {
  //               if (parseInt(value) >= 1000) {
  //                 return value.toString();
  //               } else {
  //                 return value;
  //               }
  //             },

  //           }
  //         }]
  //       },
  //       legend: {
  //         display: false
  //       }
  //     }
  //     this.loadChart = false;
  //     this.From = null;
  //     this.TO = null;

  //   });

  // }

  // GetTaskList() {
  //   this.dashboardservice.GetTaskList().subscribe((result: any) => {
  //     this.TaskList = result;
  //   });
  // }

  // GetUserTeam(type: any) {
  //   this.commonService.getUserTeam(type).subscribe((result: any) => {
  //     this.UserTeam = result.data;
  //   });
  // }

  // GetDashboardAppointmentList(fromDate, toDate) {
  //   this.dashboardservice.GetDashboardAppointmentList(fromDate, toDate).subscribe((result: any) => {
  //     this.AppointmentList = result;
  //     this.From = null;
  //     this.TO;
  //   })
  // }
  // GetDashboardWidgetcount() {
  //   this.dashboardservice.GetDashboardWidgetcount().subscribe((result: any) => {
  //     this.Widgetcount = result;
  //   })
  // }

  // ShowDashboardViewData() {
  //   this.DashboardViewData = !this.DashboardViewData;
  //   this.GetDashboardWidgetforuser('', '', this.DashboardViewData);
  // }
  // SetFormatedData(json: any) {
  //  return JSON.stringify(json, null, 4)
  // }
  // SetDashboardViewType(type: any) {
  //   this.DashboardViewType = type;
  //   if (type != "me") {
  //     this.GetUserTeam(type);
  //   }
  //   if (type == "team") {
  //     this.TeamDataText = "Select User";
  //   }
  //   else {
  //     this.TeamDataText = "Select Team";
  //   }

  //   if (type == "me") {
  //     this.DashboardFilterTeam = null;
  //     this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewType);
  //   }
  // }
  // SetDashboardFilterTeam(item: any) {
  //   this.DashboardFilterTeam = item.value;
  //   this.TeamDataText = item.name;
  //   this.ShowTeamData = false;
  //   this.ShowServiceTerrData = false;
  //   this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewType);
  // }

  // ShowTeamDataS() {
  //   this.ShowTeamData = !this.ShowTeamData;
  // }
  // SetFilterUrl(fromDate: any, toDate: any) {
  //   let teamId: any = null;
  //   let teamMemberId: any = null;
  //   if (this.DashboardViewType == "company") {
  //     teamId = this.DashboardFilterTeam;
  //     teamMemberId = null;
  //   }
  //   else if (this.DashboardViewType == "team") {
  //     teamId = null;
  //     teamMemberId = this.DashboardFilterTeam;
  //   }
  //   else {
  //     teamId = null;
  //     teamMemberId = null;
  //   }
  //     this.FilterUrl = { stage: this.stage, fromDate: fromDate, toDate: toDate, widgetType: '', recordFilter: this.DashboardViewType, teamID: teamId, teamMemberID: teamMemberId };
  // }

  // ShowServiceTerr() {
  //   this.ShowServiceTerrData = !this.ShowServiceTerrData;
  // }
  // GetserviceTerr() {
  //   this.commonService.getMasterItemsList("ServiceTerritory").subscribe((result: any) => {
  //     this.ShowServiceTerrList = this.commonService.masters;
  //   })
  // }
  // SetDashboardFilterServiceTerritory(item: any) {
  //   this.ServiceTerritoryid = item.value;
  //   this.ServiceTerritoryName = item.text;
  //   this.ShowTeamData = false;
  //   this.ShowServiceTerrData = false;
  //   this.GetDashboardWidgetforuser(this.From, this.TO, this.DashboardViewType);
  // }
}