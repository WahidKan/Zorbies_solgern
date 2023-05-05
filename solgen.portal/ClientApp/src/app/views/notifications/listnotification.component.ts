
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationModel, NotificationService } from './notification.service';
import { CommonService } from '../shared/common.service';
import { NotificationDetailComponent } from './notification-detail.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { document } from 'ngx-bootstrap/utils';
import { Router } from '@angular/router';
import { DateTimeToLocalPipeForAppointment } from '../../pipes/datetime.pipe';
import moment from 'moment';
@Component({
  selector: 'ListNotification',
  templateUrl: './listnotification.component.html',
  styleUrls: ['./listnotification.component.scss']
})

export class ListNotificationComponent implements OnInit {
  @ViewChild('notificationDetailModal', { static: false }) notificationDetailModal: NotificationDetailComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent

  NotificationList: NotificationModel[];
  SearhName: string
  SearchFromDate: Date
  SearchToDate: Date
  subscription: Subscription;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  currentPageNo = 0;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';

  lstPageSize: any
  pageSizeValue: number;
  From: any;
  To: any;
  name: any;
  isDashBoard = false;
  loginuserid: any;
  userTypeName: any;
  loadSave: boolean = false;
  customerProfile: boolean = false
  constructor(private notificationService: NotificationService,
    private routerService: Router,
    private commonService: CommonService,
    private dateTimeToLocal: DateTimeToLocalPipeForAppointment,
  ) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      console.log(userdetail);
      this.loginuserid = userdetail.id;
      this.userTypeName = userdetail.userTypeName;
      if (this.userTypeName == 'Customer') {
        this.customerProfile = true;
      }
    });
  }
  ngOnInit() {
    this.loadSave = true;
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loadSave = true;
    this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.notificationService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }


  search() {
    this.loadSave = true;
    this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.notificationService.pagedData;
      this.loadSave = false;
      this.setnotifcount();
    }, error => {
      this.loadSave = false;
    });
  }
  setnotifcount() {
    var unreadcount = 0;
    var hasmore = "";


    this.commonService.getHeaderData(this.commonService.LoginUser.id).subscribe((res: any) => {
      unreadcount = res.total;
      hasmore = res.hasMore;
      if (unreadcount <= 5 && hasmore != "+") {
        document.getElementById("spnnotif").innerHTML = unreadcount;
        document.getElementById("spnnotifhide").style.visibility = "hidden";

      }
      else {
        document.getElementById("spnnotif").innerHTML = unreadcount;
        document.getElementById("spnnotifhide").style.visibility = "visible";
      }
    },
      (error: any) => {
      });
  }
  reset() {
    this.table.sorts = [];
    this.From = null;
    this.To = null;
    this.loadSave = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.notificationService.pagedData;

      this.loadSave = false;
      this.setnotifcount();
    }, error => {
      this.loadSave = false;
    });
  }

  setPage($event) {
    
    this.loadSave = true;
    this.currentPageNo = $event.page - 1;
    this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.notificationService.pagedData;
      this.SubjectConversion(this.pagedData.data)
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loadSave = true;
    this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.notificationService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  refresh() {
    
    this.loadSave = true;
    this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {

      this.pagedData = this.notificationService.pagedData;
      this.SubjectConversion(this.pagedData.data)
      setTimeout(() => {
       this.loadSave = false;
      }, 1000);
     
      this.setnotifcount();
    }, error => {
     setTimeout(() => {
        this.loadSave = false;
     }, 1000);
    })
  }

  displayDetail(row: any) {
    this.loadSave = true;
    if (!row.IsRead) {
      this.notificationService.setNotificationToRead(row.UserNotificationId).subscribe(response => {
        row.IsRead = true;
        let dtdate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTC(this.dateTimeToLocal.transform(new Date(), '')));

        row.ReadOn = dtdate.toString();
        this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, this.currentPageNo, this.pageSizeValue, this.commonService.LoginUser.id, this.isDashBoard).subscribe(response => {
          this.pagedData = this.notificationService.pagedData;
          this.loadSave = false;
          this.setnotifcount();

        }, error => {
          this.loadSave = false;
        })
      }, error => {
        this.loadSave = false;
      });

    }
    this.notificationDetailModal.show(row);
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  }

  redirectToSource(row: any) {
    // console.log(row);
    this.notificationService.setNotificationToRead(row.UserNotificationId).subscribe(m => {

      this.routerService.navigateByUrl(row.RouteUrl)

    });
  }
  SubjectConversion(list)
{

  list.forEach(item => {
    if (item.Subject) {     
      let indxsubjdt = 5 + ((item.Subject.length) - 21);
      let subjdtString = item.Subject.substr(indxsubjdt, 21);
      let subjdateString = this.dateTimeToLocal.transform(subjdtString, '');
      if (subjdateString != "Invalid date") {
        let subjdueDate = moment(subjdateString).format('MM/DD/yyyy');
        item.SubjectForList = item.Subject.replace(subjdtString, subjdueDate);
      }
    }
  });
  return list;
}
}
