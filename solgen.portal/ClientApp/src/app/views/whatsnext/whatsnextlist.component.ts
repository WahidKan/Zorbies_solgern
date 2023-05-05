import { Component, OnInit } from '@angular/core';
import { CommonService, ModuleList } from '../shared/common.service';
import { WhatsnextService } from './whatsnext.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-whatsnextlist',
  templateUrl: './whatsnextlist.component.html',
  styleUrls: ['./whatsnextlist.component.scss']
})
export class WhatsnextlistComponent implements OnInit {

  loadSave = false;

  SearhName: string
  SearchFromDate: Date
  SearchToDate: Date
  moduleWhatNextPermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'LeaseCreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  From: any;
  To: any;
  name: any;
  lstPageSize: any
  pageSizeValue: number;
  isDashBoard = false;
  pageNumber = 0;
  loginuserid: any;
  constructor(private whatsnewService: WhatsnextService, private commonService: CommonService, private routeActivate: ActivatedRoute) {
    const moduleCode = this.routeActivate.snapshot.data.moduleCode;
    this.moduleWhatNextPermission = this.commonService.getPermission(moduleCode);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.SearhName = ""
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.SearchContact();
  }

  SearchContact() {
    this.loading = true;
    this.whatsnewService.getContactList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid,false).subscribe((response) => {
      this.pagedData = this.whatsnewService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  ResetSearch() {
    this.SearhName = '';
    this.listFilter = '';
    this.sortDir = 'asc';
    this.sortColumn = 'ContactBussinessName';
    this.To = null;
    this.From = null;
    this.pageNumber = 0;
    this.pageSizeValue = 10;
    this.SearchContact();
  }
  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.SearhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchContact();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.SearchContact();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchContact();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchContact();
  }
}
