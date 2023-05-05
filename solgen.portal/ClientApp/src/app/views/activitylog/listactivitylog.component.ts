import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivityLog, ActivitylogService} from './activitylog.service';
import { CommonService, Master } from '../shared/common.service';
import { FormGroup, NgForm, NgSelectOption } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-listactivitylog',
  templateUrl: './listactivitylog.component.html',
})
export class ListactivitylogComponent implements OnInit {
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  activityLogList: ActivityLog[];
  lstUserType: Master[];
  searchUserType = '';
  loginuserid: any;
  expFrom: any;
  expTo: any;
  loading = false; 
  sortDir = 'desc';
  sortColumn = 'LogDate';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  loadSave: boolean = false;
  lstPageSize: any;
  pageSizeValue: number;
  constructor(private activityLogService: ActivitylogService,
              private commonService: CommonService, private router: Router, private toaster: ToastrService) {
              this.commonService.getMasterItemsList("activitylog").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
              })
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.getActivityList();
    this.refresh();    
  }

  SetUserType(utype: string) {
    this.searchUserType = utype;
  }

  restddl() {
    this.searchUserType = '';
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
    this.loading = true;
    this.activityLogService.getActivityLogList(this.listFilter,  this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.expFrom, this.expTo).subscribe(response => {
      this.pagedData = this.activityLogService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.activityLogService.getActivityLogList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.expFrom, this.expTo).subscribe(response => {
      this.pagedData = this.activityLogService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.userTypeSelect.clearModel();
    this.loading = true;
    this.listFilter = '';
    this.expFrom = null;
    this.expTo = null;
    this.searchUserType = '';
    this.sortDir = 'desc';
    this.sortColumn = 'LogDate';
    this.pageSizeValue = 10;
    this.activityLogService.getActivityLogList(this.listFilter, '',  this.sortColumn, this.sortDir, 0, 10, this.loginuserid, this.expFrom, this.expTo).subscribe(response => {
      this.pagedData = this.activityLogService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  getActivityList() {
    this.loading = true;
    this.activityLogService.getActivityLogList('', '', this.sortColumn,  this.sortDir, 0, 10, this.loginuserid, this.expFrom, this.expTo).subscribe((result: any) => {
      this.loading = false;
      if (result) {
        this.activityLogList = result;
      }
    })
  }

  setPage($event) {
    this.loading = true;
    this.activityLogService.getActivityLogList(this.listFilter,  this.searchUserType, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.expFrom, this.expTo).subscribe(response => {
      this.pagedData = this.activityLogService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.activityLogService.getActivityLogList(this.listFilter, this.searchUserType,  this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.expFrom, this.expTo).subscribe(response => {
      this.pagedData = this.activityLogService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.activityLogService.getActivityLogList('', '', this.sortColumn,  this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.expFrom, this.expTo).subscribe(response => {

      this.pagedData = this.activityLogService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
}
