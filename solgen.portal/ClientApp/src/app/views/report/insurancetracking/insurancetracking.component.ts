import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-insurancetracking',
  templateUrl: './insurancetracking.component.html',
  styleUrls: ['./insurancetracking.component.scss']
})
export class InsurancetrackingComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  title = 'Excel';
  Data: any;
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
  expFrom: any;
  expTo: any;
  lstUserType: any;
  pageSizeValue: number;
  sortDir = 'asc';
  sortColumn = 'BusinessName';
  listFilter = '';
  lstPageSize: any
  modulePermission: ModuleList;
  pageNo = 0;
  contactId: any;
  userId: any;
  totalPageSize: number;
  constructor(private reportService: ReportService, private commonService: CommonService, private dialogService: ConfirmationDialogService, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userId: any) => {
      this.userId = userId.id;
    });
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.Search();
  }
 
  Search() {
    this.loading = true;
    this.reportService.getInsuranceTrackingReport(this.listFilter,this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.userId).subscribe((response) => {
      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.Search();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("pageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.loading = true;
    this.reportService.getInsuranceTrackingReport(this.listFilter,this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.userId).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  setPage($event) {
    this.loading = true;
    this.reportService.getInsuranceTrackingReport(this.listFilter,this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.userId).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  onSort1($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.reportService.getInsuranceTrackingReport(this.listFilter,this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.userId).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
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
    this.reportService.getInsuranceTrackingReport(this.listFilter,this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.userId).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }

  ResetSearch() {
    this.listFilter = "";
    this.sortDir = 'asc';
    this.sortColumn = 'BusinessName';
    this.pageNo = 0;
    this.Search();
    this.expFrom = null;
    this.expTo = null;
    this.loading = true;
    this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.userId).subscribe((response) => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.totalPageSize, this.userId).subscribe((response) => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Lease#': itm.Lease,
            'Business Name': itm.BusinessName,
            'Customer': itm.ContactName,
            'Insurance Expiration Date': itm.InsuranceExpirationDate
            
          });
        }
        this.commonService.ExportData(this.rowsForExport, "Excel", "InsuranceTrackingReport", null);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.totalPageSize, this.userId).subscribe((response) => {
      this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Lease#': itm.Lease,
            'Business Name': itm.BusinessName,
            'Customer': itm.ContactName,
            'Insurance Expiration Date': itm.InsuranceExpirationDate
            
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "InsuranceTrackingReport", null);
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
