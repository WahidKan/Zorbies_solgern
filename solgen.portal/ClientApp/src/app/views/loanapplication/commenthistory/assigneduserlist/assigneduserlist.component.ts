import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoanapplicationserviceService } from '../../loanapplicationservice.service';
import { CommonService } from '../../../shared/common.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-assigneduserlist',
  templateUrl: './assigneduserlist.component.html',
  styleUrls: ['./assigneduserlist.component.scss']
})
export class AssigneduserlistComponent implements OnInit {
  @ViewChild('AssignedUserListModelPopup', { static: false }) AssignedUserListModelPopup: ModalDirective;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  loadSave: boolean = false;
  onSort: any;
  loanId: any;
  commentId: any;
  loading = false;
  sortColumn = 'CreatedOn';
  sortDir = 'desc';
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  constructor(private commonService: CommonService,
    private loanapplicationservice: LoanapplicationserviceService) { }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
  }

  show(loanId: any, historyObject: any) {
    this.loanId = loanId;
    this.commentId = historyObject.Id;
    this.getAssignedUserList();

    //this.historyObject = historyObject;
    this.AssignedUserListModelPopup.show();
  }
  close() {
    this.AssignedUserListModelPopup.hide();
  }
  getAssignedUserList(event = null) {
   
    this.loanapplicationservice.getAssignedUserList(this.sortColumn, this.sortDir, 0, 10, this.loanId, this.commentId).subscribe((result: any) => {
      this.pagedData =this.loanapplicationservice.AssignedUserData;
      //// console.log('Pageddatalist', this.pagedData);
      this.loading = false;
      setTimeout(() => {
      
        this.table.recalculate();
        this.table.recalculateColumns();
      }, 200);
    }, error => {
      this.loading = false;
    });
  }
  setPage(e) {
    this.loanapplicationservice.getAssignedUserList(this.sortColumn, this.sortDir, e.page-1, this.pageSizeValue, this.loanId, this.commentId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.AssignedUserData;
      this.loading = false;
      setTimeout(() => {

        this.table.recalculate();
        this.table.recalculateColumns();
      }, 200);
    }, error => {
      this.loading = false;
    });
  }

  onChange($event) {
    this.loading = true;
    this.loanapplicationservice.getAssignedUserList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loanId, this.commentId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.AssignedUserData;
      setTimeout(() => {

        this.table.recalculate();
        this.table.recalculateColumns();
      }, 200);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

}
