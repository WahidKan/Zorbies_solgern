import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-monthlyleaselog',
  templateUrl: './monthlyleaselog.component.html',
  styleUrls: ['./monthlyleaselog.component.scss']
})
export class MonthlyleaselogComponent implements OnInit {
  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('bankStatus', { static: false }) bakSelect: NgSelectComponent;
  loadSave: boolean = false;

  id = "";
  loading = false;
  sortDir = 'asc';
  sortColumn = 'ContactBussinessName';
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
  listFilter = '';
  searchTxt = '';
  expFrom: any;
  expTo: any;
  leaseStatus: any = null;
  lstPageSize: any
  pageSizeValue: number;
  loginuserid: any
  lstBanks: any;
  bankName: any = null;
  totalPageSize: number = 10;
  constructor(private router: Router,
    private reportService: ReportService,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService,
    private commonService: CommonService,
    private activeRoute: ActivatedRoute) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
    this.loadBankDropDown();
    this.commonService.getMasterItemsList("lease").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
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
  loadBankDropDown() {
    this.commonService.getBankDropList().subscribe(res => {
      this.lstBanks = res;
    });
  }
  onChange($event) {
    this.loading = true;
    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  
  search() {
    this.loading = true;
    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
    this.pagedData = this.reportService.pagedData;
    this.loading = false;
    }, error => {
      this.loading = false;
      });
    
  }
  refresh() {
    this.loading = true;
    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.loading = false;
    }, error => {
      this.loading = false;
      })
   
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
    this.sortColumn = 'ContactBussinessName';
    this.pageSizeValue = 10;

    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
      });
    
  }
  setPage($event) {
    this.loading = true;
    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
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
    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
      });
    
  }
  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Business Name': itm.ContactBussinessName,
            'Contact Name': itm.CustomerName,
            'Lease#': itm.LeaseNumber,
            'Lease Description': itm.LeaseDescription,
            'Term': itm.LeaseTerm,
            'Sales Person': itm.SalesPersonName,
            'Status': itm.Status ,
            'Bank': itm.BankName,
            'Lease Rate': itm.LeaseRate + '%',
            'Total Lease ':'$' + itm.TotalLease,
            'Placement Fee': '$' + itm.PlacementFee,
            '1st Payment ': '$' + itm.FirstPayment,
            'License Fee':'$' + itm.LicenseFee,
            'Total Income':'$' + itm.TotalIncome,
            'Exec Commision':'$' + itm.ExecCommision,
            'Solgen Income':'$' + itm.SolgenIncome,
            'Margin': itm.Margin + '%'
          });
        }
        this.commonService.ExportData(this.rowsForExport, "Excel", "LeaseLogReport", null);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            // Note Show only few columns because in pdf format page width is limited.
            'Business Name': itm.ContactBussinessName,
            'Contact Name': itm.CustomerName,
            'Lease#': itm.LeaseNumber,
            'Lease Description': itm.LeaseDescription,
            'Term': itm.LeaseTerm,
            'Sales Person': itm.SalesPersonName,
            'Status': itm.Status,
            'Bank': itm.BankName,
            'Lease Rate': itm.LeaseRate + '%',
            'Total Lease ': '$' + itm.TotalLease,
            'Placement Fee': '$' + itm.PlacementFee,
            '1st Payment ': '$' + itm.FirstPayment,
            'License Fee': '$' + itm.LicenseFee,
            'Total Income': '$' + itm.TotalIncome,
            'Exec Commision': '$' + itm.ExecCommision,
            'Solgen Income': '$' + itm.SolgenIncome,
            'Margin': itm.Margin + '%'
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "LeaseLogReport","Large");
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}
