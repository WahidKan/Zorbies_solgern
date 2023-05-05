import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ReportService } from '../report.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-customer-log-report',
  templateUrl: './customer-log-report.component.html',
  styleUrls: ['./customer-log-report.component.scss']
})
export class CustomerLogReportComponent implements OnInit {
  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('bankStatus', { static: false }) bakSelect: NgSelectComponent;
  id = "";
  loading = false;
  sortDir = 'asc';
  sortColumn = 'BusinessName';
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  rowsForExport = [];
  lstUserType: any;
  lstBusinessContact: any;
  listFilter = '';
  searchTxt = '';
  expFrom: any;
  expTo: any;
  leaseStatus: any = null;
  contactStatus: any = null;
  lstPageSize: any
  pageSizeValue: number;
  loginuserid: any
  lstBanks: any;
  bankName: any = null;
  totalPageSize: number = 10;
  loadSave: boolean = false;

  constructor(private reportService: ReportService,
    private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }


  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.loadBankDropDown();
    this.refresh();
    this.commonService.getMasterItemsList("lease").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })

    this.commonService.getBusinessContactList("").subscribe((result: any) => {
      this.lstBusinessContact = this.commonService.businessName;
    })
  }

  loadBankDropDown() {
    this.commonService.getBankDropList().subscribe(res => {
      this.lstBanks = res;
    });
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
    this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    if (typeof this.leaseStatus == 'undefined') {
      this.leaseStatus = null;
    }
    if (typeof this.contactStatus == 'undefined') {
      this.contactStatus = null;
    }
    if (typeof this.bankName == 'undefined') {
      this.bankName = null;
    }
    this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus,this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  SetLeaseStatus(status: string) {
    this.leaseStatus = status;
  }
  SetContactStatus(status: string) {
    this.contactStatus = status;
  }
  SetBankName(status: string) {
    this.bankName = status;
  }


  reset() {
    this.loading = true;
    this.listFilter = '';
    this.expFrom = null;
    this.expTo = null;
    this.leaseStatus = null;
    this.bankName = null;
    this.userTypeSelect.clearModel();
    this.bakSelect.clearModel();
    this.sortDir = 'asc';
    this.sortColumn = 'BusinessName';
    this.pageSizeValue = 10;
   
    this.reportService.getCustomerLogReportList(this.listFilter,this.expFrom, this.expTo,this.contactStatus,this.leaseStatus,this.bankName, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.reportService.getCustomerLogReportList(this.listFilter,this.expFrom, this.expTo,this.contactStatus,this.leaseStatus,this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
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
    this.reportService.getCustomerLogReportList(this.listFilter,this.expFrom, this.expTo,this.contactStatus,this.leaseStatus,this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.reportService.getCustomerLogReportList(this.listFilter,this.expFrom, this.expTo,this.contactStatus,this.leaseStatus,this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo,this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Lease#': itm.LeaseNumber,
            'Business Name': itm.BusinessName,
            'Contact Name': itm.ContactName,
            'Collateral Information': itm.CollateralInfo,
            'Collateral Description': itm.LeaseDescription,
            'Insurance Expiration Date': itm.InsuranceExpirationDate,
            'Term': itm.LeaseTerm,
            'Lease Rate': itm.LeaseRate + '%',
            'Salesman': itm.LeaseCreatedBy,
            'Bank': itm.BankName,
            'Total Lease Amount': '$' + itm.LeaseTotalAmount,
            'Placement Fee': '$' + itm.LeasePlacementFee,
            'Ist Payment': '$' + itm.FirstPayment,
            'License Fee': '$' + itm.LicenseFee,
            'Total Income': '$' + itm.TotalIncome,
            'Exec Commission': '$' + itm.BankName,
            'Net Revenue Solgen': '$' + itm.NetRevenueSolgen,
            'Margin': itm.Margin
          });
        }
        this.commonService.ExportData(this.rowsForExport, "Excel", "CustomerLogReport",null);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo,this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(response => {
    this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            // Note Show only few columns because in pdf format page width is limited.
            'Lease#': itm.LeaseNumber,
            'Business Name': itm.BusinessName,
            'Contact Name': itm.ContactName,
            'Collateral Information': itm.CollateralInfo,
            'Collateral Description': itm.LeaseDescription,
            'Insurance Expiration Date': itm.InsuranceExpirationDate,
            'Term': itm.LeaseTerm,
            'Lease Rate': itm.LeaseRate + '%',
            'Salesman': itm.LeaseCreatedBy,
            'Bank': itm.BankName, 
            'Total Lease Amount': '$' + itm.LeaseTotalAmount,
            'Placement Fee': '$' + itm.LeasePlacementFee,
            'Ist Payment': '$' + itm.FirstPayment,
            'License Fee': '$' + itm.LicenseFee,
            'Total Income': '$' + itm.TotalIncome,
            'Exec Commission': '$' + itm.BankName,
            'Net Revenue Solgen': '$' + itm.NetRevenueSolgen,
            'Margin': itm.Margin
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "CustomerLogReport","Large");
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
