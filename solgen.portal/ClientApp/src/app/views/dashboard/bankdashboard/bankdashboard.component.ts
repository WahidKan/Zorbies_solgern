import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDetails, CommonService, ModuleList } from '../../shared/common.service';
import { DashboardService, DashboardTopNotificationModel, DashboardCountsModel, DashboardTopLeaseModel, DashboardTopNewLease } from '../dashboard.service';
import { NotificationdetailComponent } from '../../shared/notificationdetail/notificationdetail.component';

@Component({
  selector: 'app-bankdashboard',
  templateUrl: './bankdashboard.component.html',
  styleUrls: ['./bankdashboard.component.scss']
})
export class BankdashboardComponent implements OnInit {
  @ViewChild('dashboarNotificationDetailModal', { static: false }) dashboardNotificationDetailModal: NotificationdetailComponent;
  @Input() user: UserDetails;
  listNotification: DashboardTopNotificationModel[];
  dashboardCounts = DashboardCountsModel;
  listLeases: DashboardTopLeaseModel[]
  listNewLease: DashboardTopNewLease[];
  pagedData: any = {
    pager: {},
    data: []
  };
  modulePermission: ModuleList;
  loginuserid: any;
  loadingNotifications = false;
  searhName: any;
  pageNumber = 0;
  leaseStatus: any;
  saleMan: any;
  contactId: any;
  pageSizeValue: number;
  sortDir = 'desc';
  sortColumn = 'LeaseCreatedOn';
  expFrom: any;
  expTo: any;
  commFrom: any;
  isAdminUserAndSuperAdmin = false;
  commTo: any;
  loadtop = false;
  showLease: boolean;
  constructor(private dashboardService: DashboardService, private commonService: CommonService) {
    this.modulePermission = this.commonService.getPermission(4510);
    this.showLease = this.modulePermission.roleModuleReadFlag;
    // // console.log('Module Permission:', this.modulePermission)
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.GetTopDashboardNotifications();
    this.GetTopDashboardLeases();
    this.GetDashboardCounts();
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
}
