import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDetails, CommonService, ModuleList } from '../../shared/common.service';
import { DashboardCountsModel, DashboardService, DashboardTopNotificationModel, DashboardTopcontactModel } from '../dashboard.service';
import { NotificationdetailComponent } from '../../shared/notificationdetail/notificationdetail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operationdashboard',
  templateUrl: './operationdashboard.component.html',
  styleUrls: ['./operationdashboard.component.scss']
})
export class OperationdashboardComponent implements OnInit {
  @ViewChild('dashboarNotificationDetailModal', { static: false }) dashboardNotificationDetailModal: NotificationdetailComponent;
  @Input() user: UserDetails;
  loadtop = false;
  modulePermission: ModuleList;
  moduleContactPermission: ModuleList;
  loadingNotifications = false;
  dashboardCounts = DashboardCountsModel;
  listNotification: DashboardTopNotificationModel[];
  listContacts: DashboardTopcontactModel[];
  loginuserid: any;
  constructor(private dashboardService: DashboardService,
    private commonService: CommonService, private activeRoute: ActivatedRoute)
  {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(1020);
    this.moduleContactPermission = this.commonService.getPermission(1600);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.GetDashboardCounts();
    this.GetTopDashboardNotifications();
    //this.GetTopDashboardContacts();
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
  GetTopDashboardContacts() {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.dashboardService.GetDashboardTop5Contacts(userdetail.id).subscribe((result: any) => {
        if (result) {
          this.listContacts = result.data;
        }
      })
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
