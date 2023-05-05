import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleforcesyncstatusService } from './saleforcesyncstatus.service';
import { CommonService } from '../shared/common.service';
import { Router } from '@angular/router';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import moment from 'moment';
import { Location } from '@angular/common';
import { DateTimeToLocalPipe } from '../../pipes/datetime.pipe';

@Component({
  selector: 'app-saleforcesyncstatuslist',
  templateUrl: './saleforcesyncstatuslist.component.html',
  styleUrls: ['./saleforcesyncstatuslist.component.scss']
})
export class SaleforcesyncstatuslistComponent implements OnInit {
  @ViewChild('table', { static: false }) table: DatatableComponent;
  loadSave = false;
  sortDir = 'desc';
  sortColumn = 'CREATED_AT';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  CreatedByFilter = '';
  objectNameFilter = '';
  startDate: Date = null;
  endDate: Date = null;
  searchTxt = '';
  companyId: any;
  lstPageSize: any
  pageSizeValue: number;
  SelectionType = SelectionType;
  selected = [];
  currentPage: number;
  totalRecords: any;
  pageSize = 15;
  companyType: any;
  loginuserid: any;
  contentHeader: object;
  constructor(private saleforcesyncstatusService: SaleforcesyncstatusService,
    private commonService: CommonService, private router: Router, private location: Location, private dateTimeToLocal: DateTimeToLocalPipe) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
      this.companyType = userdetail.companyType;
    });
  }

  ngOnInit() {
    this.pageSizeValue = 15;
    this.currentPage = 0;
    this.pageSizeValue = 15;
    this.getPageSizes();
    this.search();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Salesforce Sync Status',
       actionButton: true,
       iconCssClass: '',
       breadcrumb:
         [
           {
             name: 'Dashboard',
             isLink: true,
             link: '/dashboard'
           },
           {
             name: 'Salesforce Sync Status',
             isLink: false
           }
  
         ]
     };
   }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  search() {
    this.loadSave = true;
    this.refresh();
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  updateCreatedByFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  updateObjectNameFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  onChange($event) {
    this.currentPage = 0;
    this.refresh();
  }

  reset() {
    this.table.sorts = [];
    this.loadSave = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CREATED_AT';
    this.currentPage = 0;
    this.pageSizeValue = 15;
    this.CreatedByFilter = '';
    this.objectNameFilter = '';
    this.startDate = null;
    this.endDate = null;
    this.refresh();
  }

  setPage($event) {
    this.loadSave = true;
    this.currentPage = $event.page - 1;
    this.refresh();

  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loadSave = true;
    this.currentPage = 0;
    this.refresh();
  }

  refresh() {
    this.loadSave = true;

    let startDate='' , endDate='';
    if (this.startDate) {
      startDate = moment(this.startDate.toString()).format('YYYY-MM-DD');
    }
    if (this.endDate) {
      endDate = moment(this.endDate.toString()).format('YYYY-MM-DD');
    }
    this.saleforcesyncstatusService.getSaleforceSyncStatusList(this.objectNameFilter.trim(), this.listFilter.trim(), this.CreatedByFilter.trim(), startDate, endDate, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.saleforcesyncstatusService.pagedData;
      for (let item in this.pagedData.data) {
        //;
        let child = this.pagedData.data[item];
        for (let innerChild in child) {
          if (innerChild == 'CREATED_AT') {
            child[innerChild] = moment(child[innerChild] as Date).format('MM/DD/YYYY hh:mm:ss A');
          }
        }
      }
      // // console.log(" this.saleforcesyncstatusService.pagedData", this.saleforcesyncstatusService.pagedData);
      this.loadSave = false;
      //this.location.back();
    }, error => {
      setTimeout(() => { this.loadSave = false }, 3000);
    }, () => {
      setTimeout(() => { this.loadSave = false }, 3000);
    });
  }
}
