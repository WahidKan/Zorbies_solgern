import { Component, OnInit } from '@angular/core';
import { ProductrequiredserviceService } from './productrequiredservice.service';
import { CommonService } from '../shared/common.service';
import { ActivatedRoute } from '@angular/router';
import { DateTimeToLocalPipe } from '../../pipes/datetime.pipe';

@Component({
  selector: 'app-productrequiredlist',
  templateUrl: './productrequiredlist.component.html',
  styleUrls: ['./productrequiredlist.component.scss']
})
export class ProductrequiredlistComponent implements OnInit {

  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  rowsForExport = [];
  data = [];
  totalPageSize: any;
  serviceAppointmentSearch: any = '';
  sortDir = 'desc';
  SearhName: any;
  sortColumn: any = 'Id';
  pNameAndNumber: any='';
  pageSizeValue: number;
  workTypeId: any = null;
  searchText: any;
  pageNumber = 0;
  lstWorkType: any;
  currentPage: number;
  loading = false;
  To: any;
  From: any;
  lstPageSize: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  constructor(private ProductrequiredserviceService: ProductrequiredserviceService,
    private commonService: CommonService, private routeActivate: ActivatedRoute, private dateTimeToLocal: DateTimeToLocalPipe) { }
  ngOnInit() {
    this.SearhName = ""
    this.currentPage = 1;
    //this.offset = 1;
    this.pageSizeValue = 15;
    this.getStageList();
    this.getPageSizes();
    this.SearchProductRequiredList();
    this.data = [];
  }

  searchServiceAppointmentName(event) {
    this.pNameAndNumber = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchProductRequiredList();
    }
  }


  //auditChecklistDetailPopup(checkList_Id: number, serviceAppointmentId: number) {
  //  //;
  //  this.auditCheckListModel.auditChecklistDetail(checkList_Id, serviceAppointmentId);
  //}

  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  getStageList() {
    this.commonService.getMasterItemsList('WorkType').subscribe((result: any) => {
      //this.lstWorkType = this.commonService.masters;      
      this.lstWorkType = this.commonService.masters.sort(this.GetSortOrder("text"));
    })
  }
  SearchProductRequiredList() {
    this.loading = true;
    this.ProductrequiredserviceService.SearchProductRequiredList(this.pNameAndNumber,this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.From, this.To, this.workTypeId).toPromise().then((response) => {
      this.pagedData = response;
      this.totalPageSize = this.pagedData.pager.totalItems;
      //this.offset = this.pageNumber + 1;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  reset() {
    this.SearhName = '';
    this.serviceAppointmentSearch = '';
    this.sortDir = 'asc';
    this.sortColumn = 'Id';
    this.currentPage = 1
    //this.worktype.clearModel();
    this.From = null;
    this.pNameAndNumber = null;
    this.To = null;
    this.pageNumber = 0;
    this.pageSizeValue = 15;
    this.SearchProductRequiredList();
  }
  restWorkTypeddl() {
    this.workTypeId = null;
  }
  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.serviceAppointmentSearch = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchProductRequiredList();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.SearchProductRequiredList();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    var ab = $event.page - 1;
    this.currentPage = ab;
    //this.offset = $event.page;
    this.SearchProductRequiredList();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchProductRequiredList();
  }
  //get curPage(): number {
  //  return this.offset;
  //}

}
