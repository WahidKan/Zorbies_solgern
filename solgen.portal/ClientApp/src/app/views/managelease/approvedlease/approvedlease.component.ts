import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../../shared/common.service';


@Component({
  selector: 'app-approvedlease',
  templateUrl: './approvedlease.component.html',
  styleUrls: ['./approvedlease.component.scss']
})
export class ApprovedleaseComponent implements OnInit {
  loadSave: boolean = false;

  loading = false;
  sortDir = 'asc';
  sortColumn = 'LeaseCreatedOn';
  pageNumber = 0;
  contactId: any;
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  searhName: any;
  leaseStatus: any;
  saleMan: any;
  expFrom: any;
  expTo: any;
  commFrom: any;
  commTo: any;
  isShowAddLease = true;
  loginuserid: any;
  constructor(private leaseService: ManageleaseService, private toaster: ToastrService, private router: Router,
    private commonService: CommonService, private dialogService: ConfirmationDialogService, private routeActivate: ActivatedRoute) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
    if ((userdetail.userType !== 'usertype04'
      && userdetail.userType !== 'usertype05')) {
      this.isShowAddLease = true;
    }
    else {
      this.isShowAddLease = false;
    }
    });
    this.searhName = ""
    this.pageSizeValue = 10;
    this.getPageSizes();

    this.routeActivate.queryParams
      .filter(params => params.contactid)
      .subscribe(params => {
        this.contactId = params.contactid;
      });
    this.getLeageStatus();
  }
  getLeageStatus() {
    this.commonService.getMasterItemsList("lease").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
      let userType = this.lstUserType.find(m => m.text == 'Approved');
      this.leaseStatus = userType.value;
      this.SearchLease();
     })
  }

  SearchLease() {
    this.loading = true;
    this.leaseService.getLeaseListByStatus(this.searhName, this.leaseStatus, this.saleMan, this.expFrom, this.expTo, this.commFrom, this.commTo, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid, false, this.contactId).subscribe((response) => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  ResetSearch() {
    this.searhName = "";
    this.sortDir = 'asc';
    this.sortColumn = 'LeaseCreatedOn';
    this.pageNumber = 0;
    this.pageSizeValue = 10;
    this.expFrom = null;
    this.expTo = null;
    this.commFrom = null;
    this.commTo = null;

    this.getLeageStatus();
  }


  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.searhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getLeageStatus();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($eventSearchLease) {
    this.getLeageStatus();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.getLeageStatus();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.getLeageStatus();
  }

}
