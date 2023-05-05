import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserDetails, CommonService, ModuleList } from '../shared/common.service';
import { DashboardService, DashboardNotifications, DashboardNewContacts, DashboardCountsModel, DashboardTopNotificationModel, DashboardTopcontactModel, DashboardTopLeaseModel } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotificationdetailComponent } from '../shared/notificationdetail/notificationdetail.component';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  loadtop = false;
  loadingContacts = false;
  loadingActiveLeases = false;
  loadingLeaseStatus = false;
  loadingNotifications = false;
  @ViewChild('dashboarNotificationDetailModal', { static: false }) dashboardNotificationDetailModal: NotificationdetailComponent;
  @Input() user: UserDetails;
  listNotification: DashboardTopNotificationModel[];
  listLeases: DashboardTopLeaseModel[]
  listContacts: DashboardTopcontactModel[];
  dashboardCounts = DashboardCountsModel;
  loadRevenueMonthChart = false;
  rows = []; graphtemp = [];
  columnNames: any;
  options: any;
  loadChart = false;
  RowsHeader = [];
  graphrows = [];
  showgraph = false;
  gcolumnNames: any;
  leaseStatus: any;
  moduleStaffPermission: ModuleList;
  moduleLeasePermission: ModuleList;
  moduleContactPermission: ModuleList;
  moduleBankPermission: ModuleList;
  data: any;
  graphData: any;
  loginuserid: any;

  constructor(private dashboardService: DashboardService, 
    private commonService: CommonService, private router: Router, private toaster: ToastrService) {
    this.moduleStaffPermission = this.commonService.getPermission(2002);
    this.moduleLeasePermission = this.commonService.getPermission(1020);
    this.moduleContactPermission = this.commonService.getPermission(1600);
    this.moduleBankPermission = this.commonService.getPermission(3021);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      if (userdetail.userType == 'usertype07') {//insurance user
        this.router.navigateByUrl('/insurancerequest');
      }
      else if (userdetail.userType == 'usertype08') {//vendor user
        this.router.navigateByUrl('/vendorleaserequest');
      }
    });
  }
  ngOnInit() {
    this.GetDashboardCounts();
    this.GetTopDashboardNotifications();
    this.GetTopDashboardLeases();
    this.GetTopDashboardContacts();
    this.ShowSupperAdminGraph();
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
  //function is used to get top 5 notifications
  GetTopDashboardLeases() {
    this.loadingActiveLeases = true;
    this.dashboardService.GetDashboardTop5Leases(this.loginuserid, this.leaseStatus).subscribe((result: any) => {

      if (result) {
        this.listLeases = result.data;
        this.loadingActiveLeases = false;
      }
    }, error => {
      this.loadingActiveLeases = false;
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
  GetTopDashboardNotifications() {
    this.loadingNotifications = true;
    this.dashboardService.GetDashboardTop5Notifications(this.loginuserid).subscribe((result: any) => {
      if (result) {
        this.listNotification = result.data;
       
        this.setnotifcount();
        this.loadingNotifications = false;
      }
    }, error => {
      this.loadingNotifications = false;
    });
  }

  GetTopDashboardContacts() {
    this.loadingContacts = true;
    this.dashboardService.GetDashboardTop5Contacts(this.loginuserid).subscribe((result: any) => {
      if (result) {
        this.listContacts = result.data;
        this.loadingContacts = false;
      }
    }, error => {
      this.loadingContacts = false;
    });
  }

  ShowSupperAdminGraph() {
    this.loadChart = true;
    this.dashboardService.GetSalesDashboradLeaseAmount(this.loginuserid).subscribe(response => {
      this.graphrows = response;
      this.graphtemp = this.graphrows;
      this.gcolumnNames = this.graphrows.map(function (a) {
        return a.monthName;

      });
      let countlic = null;

      if (this.graphrows.length == 0) {
        this.gcolumnNames = [];
        this.graphtemp = [];
        this.showgraph = false;
        countlic = 1;
      }
      else {
        this.graphtemp = this.graphrows.map(function (a) {
          return a.leaseTotalAmount;
        });
        this.showgraph = true;
      }


      if (this.graphtemp[0] < 10) {
        countlic = 1;
      }
      this.data = {
        labels: this.gcolumnNames,
        
        
        datasets: [
          {
            label: 'Lease Amount($)',
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return '$' + value;
              }
            },
          
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: this.graphtemp
          }
        ]
      }
      this.options = {
        scales: {
          yAxes: [{
            label: 'Lease Amount',
            showTooltips: true,
            responsive: false,
            maintainAspectRatio: false,
            multiTooltipTemplate: function (label) {
              return '$' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            ticks: {
              beginAtZero: true,
              fixedStepSize: countlic,
              callback: function (value, index, values) {
                if (parseInt(value) >= 1000) {
                  return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                  return '$' + value;
                }
              },

            }
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.labels[tooltipItem.index];
              let datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              let currencyPipe = new CurrencyPipe('en');
              let formattedNumber = currencyPipe.transform(datasetLabel, 'USD', 'symbol');
              return "Lease Amount" + ': ' + formattedNumber;
            }
          }
        },
      }
      this.loadChart = false;
    });
  }

  displayDetail(row: any) {
    this.dashboardService.setNotificationToRead(row.senderid, row.id).subscribe((response: any) => {
      this.dashboardNotificationDetailModal.show(row);
      this.dashboardService.GetDashboardTop5Notifications(this.loginuserid).subscribe((result: any) => {
        if (result) {
          this.listNotification = result.data;
          this.loadingNotifications = false;
        }
      }, error => {
        this.loadingNotifications = false;
      })
    }, error => {
      this.loadingNotifications = false;
    })
   
  }
}
