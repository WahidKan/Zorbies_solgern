import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MasternameService } from './mastername.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MasterService, MasterNames } from '../master/master.service';

@Component({
  selector: 'app-mastername-list',
  templateUrl: './mastername-list.component.html',
  styleUrls: ['./mastername-list.component.scss']
})
export class MasternameListComponent implements OnInit {
  masternames: MasterNames[] = [];
  id = "";
  loading = false;
  sortDir = 'asc';
  sortColumn = 'MasterNameValue';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';

  lstPageSize: any
  pageSizeValue: number;
  loginuserid: any;
  loadSave: boolean = false;

  constructor(private masternameService: MasternameService, private masterService: MasterService,
    private commonService: CommonService, private router: Router, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }
  
  ngOnInit() {
    this.pageSizeValue = 10;
    this.getMasterNameList();
    this.getPageSizes(); 
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
    this.masternameService.getMasterNameList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masternameService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  search() {
    this.loading = true;
    this.masternameService.getMasterNameList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masternameService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'asc';
    this.sortColumn = 'MasterNameValue';
    this.pageSizeValue = 10;
    this.masternameService.getMasterNameList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.masternameService.pagedData;
    }, error => {
      this.loading = false;
    });
  }

  getMasterNameList() {
    this.masternameService.getMasterNameList('', this.sortColumn, this.sortDir, 0, 10, this.id).subscribe(response => {
      this.pagedData = this.masternameService.pagedData;

    }, error => {

    });
  }

  setPage($event) {
    this.loading = true;
    this.masternameService.getMasterNameList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masternameService.pagedData;
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
    this.masternameService.getMasterNameList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masternameService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.masternameService.getMasterNameList('', this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.masternameService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
}
