import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ReportService } from '../report.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-commissionpaidreport',
  templateUrl: './commissionpaidreport.component.html',
  styleUrls: ['./commissionpaidreport.component.scss']
})
export class CommissionpaidreportComponent implements OnInit {

  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('bankStatus', { static: false }) bakSelect: NgSelectComponent;
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
  startDate: any;
  endDate: any;
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
    this.search();
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
    this.startDate = this.expFrom;
    this.endDate = this.expTo;
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.startDate = this.expFrom;
    this.endDate = this.expTo;
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
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
    this.sortDir = 'asc';
    this.sortColumn = 'ContactBussinessName';
    this.pageSizeValue = 10;
    this.startDate = this.expFrom;
    this.endDate = this.expTo;
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.startDate = this.expFrom;
    this.endDate = this.expTo;
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
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
    this.startDate = this.expFrom;
    this.endDate = this.expTo;
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.startDate = this.expFrom;
    this.endDate = this.expTo;
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

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
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Business Name': itm.ContactBussinessName,
            'Contact Name': itm.CustomerName,
            'Lease#': itm.LeaseNumber,
            'Lease Description': itm.LeaseDescription,
            'Placement Fee':'$'+itm.PlacementFee,
            '1st Payment': '$'+itm.FirstPayment,
            'License Fee': '$'+itm.LicenseFee,
            'Total Income': '$'+itm.TotalIncome,
            'Exec Commission': '$' + itm.ExecCommision,
            'ContractorNameExport': itm.ContractorNameExport,
            'CommissionFormulaExport': itm.CommissionFormulaExport,
            'ContractorStDateExport':  itm.ContractorStDateExport,
            'ContractorEndDateExport': itm.ContractorEndDateExport,
          });
        }
        this.commonService.ExportData(this.rowsForExport, "Excel", "CommissionPaidReport",null);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            // Note Show only few columns because in pdf format page width is limited.
            'Business Name': itm.ContactBussinessName,
            'Contact Name': itm.CustomerName,
            'Lease#': itm.LeaseNumber,
            'Lease Description': itm.LeaseDescription,
            'Placement Fee': '$' + itm.PlacementFee,
            '1st Payment': '$' + itm.FirstPayment,
            'License Fee': '$' + itm.LicenseFee,
            'Total Income': '$' + itm.TotalIncome,
            'Exec Commission': '$' + itm.ExecCommision,

            'ContractorNameExport': itm.ContractorNameExport,
            'CommissionFormulaExport': itm.CommissionFormulaExport,
            'ContractorStDateExport': itm.ContractorStDateExport,
            'ContractorEndDateExport': itm.ContractorEndDateExport,
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "CommissionPaidReport","Large");
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


}
