import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModuleList, CommonService } from '../../shared/common.service';
import { ReportService } from '../report.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-welcomepackagetrackingreport',
  templateUrl: './welcomepackagetrackingreport.component.html',
  styleUrls: ['./welcomepackagetrackingreport.component.scss']
})
export class WelcomepackagetrackingreportComponent {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  title = 'Excel';
  Data: any;
  tableabc: any;

  From: any;
  To: any;
  [x: string]: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  rowsForExport = [];
  loading = false;
  isCustomer = false;
  sortDir = 'asc';
  pageSizeValue: any;
  sortColumn = 'BusinessName';
  docSortDir = 'desc';
  lstPageSize: any;
  modulePermission: ModuleList;
  searhName: any;
  pageNumber = 0;
  contactId: any;
  loginuserid: any;
  totalPageSize: number = 10;
  constructor(private reportService: ReportService, private commonService: CommonService, private dialogService: ConfirmationDialogService, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.searhName = "";
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.getLeaseRequestList();
  }
  getLeaseRequestList() {
    this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From,this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((res: any) => {
      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  SearchLease() {
    this.loading = true;
    this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From,this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((response) => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  updateFilter(event) {
    this.searhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchLease();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($eventSearchLease) {
    this.SearchLease();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchLease();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchLease();
  }
  ResetSearch() {
    this.From = null;
    this.To = null;
    this.searhName = "";
    this.sortDir = 'asc';
    this.sortColumn = 'BusinessName';
    this.pageNumber = 0;
    this.SearchLease();
  }
  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From,this.To, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe((response) => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'SentBy': itm.SentBy,
            'Business Name': itm.BusinessName,
            'Contact Name': itm.ContactName,
            'Email': itm.Email,
            'Business Phone': itm.BusinessPhone,
            'Contact Phone': itm.ContactPhone,
            'Package Sent Date': itm.PackageSentDate
          });
        } 
        this.commonService.ExportData(this.rowsForExport, "Excel", "WelcomeReport", null);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From,this.To, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe((response) => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'SentBy': itm.SentBy,
            'Business Name': itm.BusinessName,
            'Contact Name': itm.ContactName,
            'Email': itm.Email,
            'Business Phone': itm.BusinessPhone,
            'Contact Phone': itm.ContactPhone,
            'Package Sent Date': itm.PackageSentDate
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "WelcomeReport", null);
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
