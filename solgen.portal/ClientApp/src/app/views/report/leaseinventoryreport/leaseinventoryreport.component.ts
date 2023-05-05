import { Component, OnInit, ViewChild } from '@angular/core';
import { ModuleList, CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../report.service';
import * as XLSX from 'xlsx';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import html2canvas from 'html2canvas';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-leaseinventoryreport',
  templateUrl: './leaseinventoryreport.component.html',
  styleUrls: ['./leaseinventoryreport.component.scss']
})
export class LeaseinventoryreportComponent implements OnInit {
  @ViewChild('bankStatus', { static: false }) bakSelect: NgSelectComponent;
  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  title = 'Excel';
  Data: any;
  bankName: any = null;
  leaseStatus: any = null;
  tableabc: any;

  [x: string]: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  rowsForExport= [];
  loading = false;
  isCustomer = false;
  sortDir = 'asc';
  lstBanks: any;
  expFrom: any;
  expTo: any;
  lstUserType: any;
  pageSizeValue: any;
  sortColumn = 'BusinessName';
  docSortDir = 'desc';
  lstPageSize: any
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
    this.loadBankDropDown();
    this.commonService.getMasterItemsList("lease").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }
  getLeaseRequestList() {
    this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName,this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((res: any) => {
      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  SearchLease() {
    this.loading = true;
    this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((response) => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  loadBankDropDown() {
    this.commonService.getBankDropList().subscribe(res => {
      this.lstBanks = res;
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
  SetBankName(status: string) {
    this.bankName = status;
  }
  SetLeaseStatus(status: string) {
    this.leaseStatus = status;
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchLease();
  }
  ResetSearch() {
    this.searhName = "";
    this.expFrom = null;
    this.expTo = null;
    this.leaseStatus = null;
    this.bankName = null;
    this.userTypeSelect.clearModel();
    this.bakSelect.clearModel();
    this.sortDir = 'asc';
    this.sortColumn = 'BusinessName';
    this.pageNumber = 0;
    this.SearchLease();
  }
  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe((response) => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Lease#': itm.Lease,
            'Business Name': itm.BusinessName,
            'Customer': itm.Customer,
            'Date': itm.Date,
            'Gross': itm.GrossAmount,
            'Salesman': itm.Salesman,
            'Status': itm.Status,
            'Bank': itm.Bank,
            'VIN#': itm.VIN,
            'Total': itm.Total
          });
        }
      } else { }
      this.loading = false;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowsForExport);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'report');
      XLSX.writeFile(wb, 'leaseinventoryreport.xlsx');
    }, error => {
      this.loading = false;
    });
  }


  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe((response) => {
      this.pagedDataForImport = this.reportService.pagedData;
      
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data)
        {
          this.rowsForExport.push({
            'Lease#': itm.Lease,
            'Business Name': itm.BusinessName,
            'Customer': itm.Customer,
            'Date': itm.Date,
            'Gross': itm.GrossAmount,
            'Salesman': itm.Salesman,
            'Status': itm.Status,
            'Bank': itm.Bank,
            'VIN#': itm.VIN,
            'Total': itm.Total
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "leaseinventoryreport", null);
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}

