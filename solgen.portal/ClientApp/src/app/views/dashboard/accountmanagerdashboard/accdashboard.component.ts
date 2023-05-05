import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { UserDetails, CommonService, ModuleList } from '../../shared/common.service';
import { DashboardService, DashboardTopNotificationModel, DashboardCountsModel, DashboardTopLeaseModel, DashboardTopNewLease } from '../dashboard.service';
import { NotificationdetailComponent } from '../../shared/notificationdetail/notificationdetail.component';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';
import { NestreportserviceService } from '../../solgenreport/nestreport/nestreportservice.service';

@Component({
  selector: 'app-accdashboard',
  templateUrl: './accdashboard.component.html',
  styleUrls: ['./accdashboard.component.scss']
})
export class accdashboard implements OnInit {
  @ViewChild('dashboarNotificationDetailModal', { static: false }) dashboardNotificationDetailModal: NotificationdetailComponent;
  @ViewChild('ddlSearch', { static: false }) public ngSelectComponent: NgSelectComponent;
  @ViewChild('myStartCalendar', { static: false }) startCalendar: Calendar;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() user: UserDetails;
  listNotification: DashboardTopNotificationModel[];
  dashboardCounts = DashboardCountsModel;
  listLeases: DashboardTopLeaseModel[]
  listNewLease: DashboardTopNewLease[];
  pagedData: any = {
    pager: {},
    data: []
  };
  tilewidget: any;
  widgetdata: any;
  DashboardViewData = true;
  modulePermission: ModuleList;
  loginuserid: any;
  loadingNotifications = false;
  searhName: any;
  pageNumber = 0;
  rangeDates: Date[];
  leaseStatus: any;
  saleMan: any;
  contactId: any;
  pageSizeValue: number;
  sortDir = 'desc';
  selectedFilter = "This Week";
  showDateFilter = false;
  show: boolean = false;
  sortColumn = 'LeaseCreatedOn';
  expFrom: any;
  expTo: any;
  From: any;
  TO: any;
  commFrom: any;
  isAdminUserAndSuperAdmin = false;
  commTo: any;
  loadtop = false;
  showLease: boolean;
  iscompletescroll = true;
  isScroll = false;
  selectedData: any;
  length: any = 10;
  graphWidgetData: any;
  recordFilter: any;
  teamID: any;
  teamMemberID: any;
  public users$;
  loadSave: boolean = false;
  loading = false;
  filteredData: any[];
  graphColumnNames: any;
  graphOption: any;
  data = [];
  graphData: any;
  public typeahead = new EventEmitter<string>();
  constructor(private nestreportserviceService: NestreportserviceService,private dashboardService: DashboardService, private datePipe: DatePipe, private route: Router ,private commonService: CommonService) {
    this.modulePermission = this.commonService.getPermission(4510);
    this.showLease = this.modulePermission.roleModuleReadFlag;
    // // console.log('Module Permission:', this.modulePermission)
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.tilewidget = [
      { id: null, widgetName: 'AM On Hold Work Order', widgetCount: 56, endTime: null, type: 'Normal' },
      { id: null, widgetName: 'Account W/O Open Orders', widgetCount: 11, endTime: null, type: 'Normal' },
      { id: null, widgetName: 'My Financing Queue', widgetCount: 20, endTime: null, type: 'Normal' },
      { id: null, widgetName: 'My On Hold/Cancelled', widgetCount: 10, endTime: null, type: 'Normal' },
      { id: null, widgetName: 'My On Hold AM', widgetCount: 10, endTime: null, type: 'Normal' }
    ];
    this.GetTopDashboardNotifications();
    this.GetTopDashboardLeases();
    this.GetDashboardCounts();
    this.ShowHorizontalBarGraph();
  }

  ShowHorizontalBarGraph() {
    this.loading = true;
    this.data = [];

    this.nestreportserviceService.getNestReport('', null, null, null, null, null, null, null, null, null, 'AccountName', 'desc',
      1, 2493, true).toPromise().then((response) => {
        this.pagedData = response;
        this.pagedData.data.forEach(t => {
          if (t.StateName != '' && typeof t.StateName != 'undefined') {
            let obj = {
              StateName: t.StateName,
              TotalRecord: t.TotalRecord
            }
            this.data.push(obj);
          }
        });
        // }
        if (this.data != null) {
          this.graphColumnNames = this.data.map(function (a) {
            return a.StateName;
          });
          var arrayValues: any = [];
          arrayValues = this.data.map(function (a) {
            return parseInt(a.TotalRecord);
          });
          var array: any = [];
          var obj = {
            label: '',
            backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            data: arrayValues
          };
          array.push(obj);
          this.graphWidgetData = {
            labels: this.graphColumnNames,
            datasets: array
          }


          this.graphOption = {
            legend: {
              position: 'bottom'
            }
          }
        }
        this.loading = false;
      });
  }

  onScrollToEnd() {
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
      setTimeout(function () { this.bindGlobalSearch(); }, 5000);
    }



  }

  btnSearch(term: any): Observable<any> {
    this.selectedData = term;
    return this.commonService.getGlobalSeacrchData(this.selectedData, this.length, this.recordFilter, this.teamID, this.teamMemberID);
  }

  bindGlobalSearch() {
    if (this.isScroll == true) {
      this.iscompletescroll = false;
      this.users$ = this.typeahead.pipe(

        //filter((term) => term.length >= 3), // HERE I FILTERED THE TYPEAHEAD
        //distinctUntilChanged(),
        //debounceTime(200),
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
    else {
      this.iscompletescroll = true;
      this.users$ = this.typeahead.pipe(

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
      );
    }
  }

  Clearddl() {
    this.users$ = [];
    //this.selectedData = null;
    this.bindGlobalSearch();
  }

  closedropdown() {

    this.users$ = [];
    this.selectedData = null;
    this.bindGlobalSearch();

  }
 
  redirectToPage(link: any) {

    this.loadSave = true;

    this.filteredData = null;
    this.Clearddl();
    this.route.navigateByUrl(link);
    this.ngSelectComponent.close();
  
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
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  GetDashboardCounts() {
    this.loadtop = true;
    this.dashboardService.GetDashboardCounts().subscribe((result: any) => {
      if (result) {
        this.dashboardCounts = result;
        this.loadtop = false;
      }
    },
      error => {
        this.loadtop = false;
      })
  }
  GetTopDashboardNotifications() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.dashboardService.GetDashboardTop5Notifications(userdetail.id).subscribe((result: any) => {
        if (result) {
          this.listNotification = result.data;
          this.setnotifcount();
        }
      })
    });
  }

  setnotifcount() {
    var unreadcount = 0;
    var hasmore = "";

    this.commonService.getHeaderData(this.commonService.LoginUser.id).subscribe((res: any) => {
      unreadcount = res.total;
      hasmore = res.hasMore;
      if (unreadcount <= 5 && hasmore != "+") {
        document.getElementById("spnnotif").innerHTML = unreadcount.toString();
        document.getElementById("spnnotifhide").style.visibility = "hidden";

      }
      else {
        document.getElementById("spnnotif").innerHTML = unreadcount.toString();
        document.getElementById("spnnotifhide").style.visibility = "visible";
        document.getElementById("spnnotifhide").innerHTML = hasmore;
      }
    },
      (error: any) => {
      });
  }

  displayDetail(row: any) {
    this.dashboardService.setNotificationToRead(row.senderid, row.id).subscribe((response: any) => {
      this.dashboardNotificationDetailModal.show(row);
      this.dashboardService.GetDashboardTop5Notifications(this.loginuserid).subscribe((result: any) => {
        if (result) {
          this.listNotification = result.data;

          this.loadingNotifications = false;
          this.setnotifcount();
        }
      }, error => {
        this.loadingNotifications = false;
      })
    }, error => {
      this.loadingNotifications = false;
    })
    
  }
  GetTopDashboardLeases() {
    this.loadingNotifications = true;
    let leaseStatus = 'b5fd424e-3c11-437f-aaf0-cbe5f93987f7';
    this.dashboardService.getLeaseListByStatus(this.searhName, (this.leaseStatus == "Approved for Purchase" ? "A" : this.leaseStatus == "InProgress Lease" ? "P" : this.leaseStatus = null), this.saleMan, this.expFrom, this.expTo, this.commFrom, this.commTo, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid, true, this.contactId).subscribe((result: any) => {

      if (result) {
        this.pagedData = this.dashboardService.pagedData;
        this.loadingNotifications = false;
      }
    }, error => {
      this.loadingNotifications = false;
    });
  }


    ////FILTER Section from on top
    OnChangedToDate(event) {

      this.TO = event.toLocaleDateString();
    }
    OnChangedFromDate(event) {
      this.From = event.toLocaleDateString();
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
      this.selectedFilter = "Last 30 Days";
      var date = new Date();
      var myVariable = this.datePipe.transform(date, 'dd MMM yyyy');
      var makeDate = new Date(myVariable.toString());
      makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
      var myVariable12 = this.datePipe.transform(makeDate, 'MM/dd/yyyy');
  
      this.GetDashboardWidgetforuser(myVariable12, '', this.DashboardViewData)
     // this.GetDashboardAppointmentList(myVariable12, '')
     // this.ShowLeadGraph(myVariable12, '');
      //this.ShowOpportunityOwnerGraph(myVariable12, '');
     // this.ShowOpportunityGraph(myVariable12, '');
    }
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
      this.GetDashboardWidgetforuser(todaydate, '', this.DashboardViewData);
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
      ;
  
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
     
  
      //// // console.log('weekendday', weekendday);
  
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
  
    GetDashboardWidgetforuser(fromDate:any, toDate:any, recordFilter) {
      this.loadSave = true;
      let teamId: any = null;
      let teamMemberId: any = null;
      teamId = null;
      teamMemberId = null;
      if (fromDate != null && fromDate != "" && fromDate != 'null' && typeof (fromDate) != 'undefined') {
        fromDate = this.commonService.formatDateToUnix(fromDate);     
      }
      if (toDate != null && toDate != "" && toDate != 'null' && typeof (toDate) != 'undefined') {    
        toDate = this.commonService.formatDateToUnix(toDate);
      }
  
      if (isNaN(fromDate))
        fromDate = null;
      if (isNaN(toDate))
        toDate = null;
      this.dashboardService.GetDashboardWidgetForAddeditforuser(fromDate, toDate, 'Company', teamId, teamMemberId, null).subscribe(result => {
        this.widgetdata = result;
        this.tilewidget = this.widgetdata.filter(x => x.widgetGroupCode == "Tile_Widget");//1
        let backgroundcolor: String[] = [];
      
  
        for (var i = 0; i < this.tilewidget.length; i++) {
          if (parseInt(this.tilewidget[i].widgetCount) >= 0) {
            //this.tilewidget[i].widgetCount = this.tilewidget[i].widgetCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");          
            this.tilewidget[i].widgetCount = this.commonService.formatAmount(this.tilewidget[i].widgetCount);
          //  // // console.log(" this.tilewidgetcount", this.tilewidget[i].widgetCount);    
          } 
        } 
        this.From = null;
        this.TO = null;
        this.loadSave = false;
      })
    }

  
}


