import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-titleworkrequestreport',
  templateUrl: './titleworkrequestreport.component.html',
  styleUrls: ['./titleworkrequestreport.component.scss']
})
export class TitleworkrequestreportComponent implements OnInit {
  SearhName: string
  SearchFromDate: Date
  SearchToDate: Date
  moduleWhatNextPermission: ModuleList;
  loading = false;
  sortDir = 'asc';
  leaseId: any;
  sortColumn = 'ContactBussinessName';
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  rowsForExport = [];
  searchTxt = '';
  From: any;
  userid: any;
  To: any;
  totalPageSize: any;
  name: any;
  lstPageSize: any
  pageSizeValue: number;
  isDashBoard = false;
  pageNumber = 0;
  loadSave: boolean = false;
  constructor(private reportService: ReportService, private commonService: CommonService, private routeActivate: ActivatedRoute) {
  }

  ngOnInit() {
    this.SearhName = ""
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.SearchTitleWorkReport();
  }

  SearchTitleWorkReport() {
    this.loading = true;
    this.reportService.getTitleWorkReportList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.leaseId, this.userid).subscribe((response) => {
      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
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
    this.SearchTitleWorkReport();
  }
  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.SearhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchTitleWorkReport();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.SearchTitleWorkReport();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchTitleWorkReport();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchTitleWorkReport();
  }

  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];

    this.reportService.getTitleWorkReportList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.leaseId, this.userid).subscribe((response) => {
    
      this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Lease#': itm.LeaseNumber,
            'Business Name': itm.ContactBussinessName,
            'Contact Name': itm.ContactName,
            'VIN#': itm.VIN,
            'Bank': itm.BankName,
            'Dealership': itm.Dealership,
            'Contact @ Dealership': itm.contactDealership,
            'Status': itm.LeaseStatus,
            'Title Work Received Date': itm.TitleWorkReceivedDate,
            'Title Work Send Date': itm.TitleWorkSendDate
          });
        } 
        this.commonService.ExportData(this.rowsForExport, "Excel", "TitleWorkTrackingReport", null);
      } 
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getTitleWorkReportList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.leaseId, this.userid).subscribe((response) => {
      this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Lease#': itm.LeaseNumber,
            'Business Name': itm.ContactBussinessName,
            'Contact Name': itm.ContactName,
            'VIN#': itm.VIN,
            'Bank': itm.BankName,
            'Dealership': itm.Dealership,
            'Contact @ Dealership': itm.contactDealership,
            'Status': itm.LeaseStatus,
            'Title Work Received Date': itm.TitleWorkReceivedDate,
            'Title Work Send Date': itm.TitleWorkSendDate
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "TitleWorkTrackingReport","Large");
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
