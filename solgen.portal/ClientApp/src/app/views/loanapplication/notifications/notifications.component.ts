import { Component, OnInit, Input } from '@angular/core';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';
import { LoanapplicationdetailComponent } from '../loanapplicationdetail.component';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input('loanApplicationId') loanApplicationId: any;
  notificationList: any;
  applicationid: any;
  sortColumn = 'SentDate';
  sortDir='desc';
  pageSizeValue: any;
  lstPageSize: any;
  pageNumber: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  loadSave: any;
  constructor(private loanapplicationserviceService: LoanapplicationserviceService, private commonService: CommonService,
    private loanapplicationdetailComponent: LoanapplicationdetailComponent) { }

  ngOnInit() {
    this.applicationid = this.loanapplicationdetailComponent.loanId;
    this.pageSizeValue = 10;
    this.getNoticationList();
    this.getPageSizes();
    this.loanapplicationserviceService.sub.subscribe((s: String) =>
    {
      this.getNoticationList();
    });
  }


  getNoticationList(event = null) {
    this.loanapplicationserviceService.getNoticationList(this.applicationid, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue).subscribe((result: any) => {
      this.pagedData = this.loanapplicationserviceService.pagedData;
      //// console.log('this.pagedData', this.pagedData);
    });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  
  onChange($event) {
    this.getNoticationList();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.getNoticationList();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;

    this.getNoticationList();
  }
}
