
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDetails, CommonService, ModuleList } from '../../shared/common.service';
import { DashboardNotifications, DashboardService, DashboardCountsModel, DashboardTopNotificationModel } from '../dashboard.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationdetailComponent } from '../../shared/notificationdetail/notificationdetail.component';
import { error } from '@angular/compiler/src/util';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-salesdashboard',
  templateUrl: './salesdashboard.component.html',
  styleUrls: ['./salesdashboard.component.scss']
})
export class SalesdashboardComponent implements OnInit {
  @ViewChild('dashboarNotificationDetailModal', { static: false }) dashboardNotificationDetailModal: NotificationdetailComponent;
  @Input() user: UserDetails;
  listNotification: DashboardTopNotificationModel[];
  dashboardCounts = DashboardCountsModel;
  loadRevenueMonthChart = false;
  loginuserid: any;
  loadingNotifications = false;
  rows = []; graphtemp = [];
  columnNames: any;
  options: any;
  loadChart = false;
  option = ["0", "10k", "20k", "30k", "40k"];
  RowsHeader = [];
  graphrows = [];
  showgraph = false;
  modulePermission: ModuleList;
  moduleLeasePermission: ModuleList;
  modulePaymentQuotePermission: ModuleList;
  gcolumnNames: any;
  data: any;
  graphData: any;
  loadtop = false;

  constructor(private dashboardService: DashboardService,
    private commonService: CommonService, private router: Router, private toaster: ToastrService) {
    this.modulePermission = this.commonService.getPermission(1600);
    this.moduleLeasePermission = this.commonService.getPermission(1020);
    this.modulePaymentQuotePermission = this.commonService.getPermission(1312);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }
  ngOnInit() {
    this.GetDashboardCounts();
    this.ShowLicGraph();
    this.GetTopDashboardNotifications();

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
    this.dashboardService.GetDashboardTop5Notifications(this.loginuserid).subscribe((result: any) => {
      if (result) {
        this.listNotification = result.data;
        //for (let i = 0; i < result.data.length; i++) {
        //  if ( result.data[i].IsRead === false) {
        //    this.listNotification = result.data[i];
        //    // // console.log("SaleTest", this.listNotification);
        //  }
        //}

        //// // console.log("SaleNot", result.data);

        this.setnotifcount();
      }
    })
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

  ShowLicGraph() {
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
              }
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
      ///end graph
      this.loadChart = false;

    },
      error => {
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
          this.setnotifcount();
        }
      }, error => {
        this.loadingNotifications = false;
      })
    }, error => {
      this.loadingNotifications = false;
    })
    
  }
}



