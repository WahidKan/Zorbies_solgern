import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import * as XLSX from 'xlsx';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-leasetrackingreportlist',
  templateUrl: './leasetrackingreportlist.component.html',
  styleUrls: ['./leasetrackingreportlist.component.scss']
})
export class LeasetrackingreportlistComponent implements OnInit {
  @ViewChild('bankStatus', { static: false }) bakSelect: NgSelectComponent;
  id = "";
  loading = false;
  sortDir = 'desc';
  loadRevenueMonthChart = false;
  rows = []; graphtemp = [];
  sortColumn = 'LeaseDate';
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  options: any;
  loadChart = false;
  RowsHeader = [];
  graphrows = [];
  reportdata: any;
  showgraph = false;
  gcolumnNames: any;
  data: any;
  rowsForExport = [];
  lstUserType: any;
  listFilter = '';
  searchTxt = '';
  expFrom: any;
  expTo: any;
  expFundFrom: any;
  expFundTo: any;
  leaseStatus: any = null;
  lstPageSize: any
  pageNumber: number;
  pageSizeValue: number;
  loginuserid: any
  lstBanks: any;
  bankName: any = null;
  totalPageSize: number = 10;
  loadSave: boolean = false;
  From: any;
  To: any;

  constructor(private reportService: ReportService,
    private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.ShowLeaseTrackingGraph();
    this.SearchLeaseTrackingReport();
    this.loadBankDropDown();
  }
  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchLeaseTrackingReport();
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
    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  SearchLeaseTrackingReport() {
    this.loading = true;
    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  refresh() {
    this.loading = true;
    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.reportService.pagedData;
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.loading = false;
    }, error => {
      this.loading = false;
    })

  }
  ResetSearch() {
    this.loading = true;
    this.listFilter = '';
    this.expFrom = null;
    this.expTo = null;
    this.leaseStatus = null;
    this.bankName = null;
    this.bakSelect.clearModel();
    this.sortDir = 'desc';
    this.sortColumn = 'LeaseDate';
    this.pageSizeValue = 10;
    this.pageNumber = 0;

    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.loading = true;
    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  SetBankName(bankname:string) {
    this.bankName = bankname;
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Lease Date': itm.LeaseCreatedOn,
            'To Funder': itm.SendFundingPackToBankDate,
            'Colleral Description': itm.LeaseDescription,
            'Lease#': itm.LeaseNumber,
            'Gross': itm.Gross,
            'LeaseTerm': itm.LeaseTerm,
            'Bank': itm.BankName,
            'VIN#': itm.VIN,
            'Total Amount': itm.LeaseTotalAmount,
            'Placement Fee': itm.LeasePlacementFee,
          });
        }
      } else { }
      this.loading = false;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowsForExport);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'customerlogreport');
      XLSX.writeFile(wb, 'customerlogreport.xlsx');
    }, error => {
      this.loading = false;
    });
  }

  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            // Note Show only few columns because in pdf format page width is limited.
            'Lease Date': itm.LeaseCreatedOn,
            'To Funder': itm.SendFundingPackToBankDate,
            'Colleral Description': itm.LeaseDescription,
            'Lease#': itm.LeaseNumber,
            'Gross': itm.Gross,
            'LeaseTerm': itm.LeaseTerm,
            'Bank': itm.BankName,
            'VIN#': itm.VIN,
            'Total Amount': itm.LeaseTotalAmount,
            'Placement Fee': itm.LeasePlacementFee,
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "customerlogreport", null);
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  ShowLeaseTrackingGraph() {
    this.loadChart = true;
    this.reportService.GetLeaseTrackingAmount(this.loginuserid).subscribe(response => {
      this.reportdata = response;
      this.graphrows = this.reportdata.monthlyLeaseTrackingTotalLeaseAmountModel;
      let ReportEndDateStartDate = this.reportdata.leaseTrackGraphEndDateAndStartDate;

      this.graphtemp = this.reportdata.monthlyLeaseTrackingTotalLeaseAmountModel;
      this.gcolumnNames = this.reportdata.monthlyLeaseTrackingTotalLeaseAmountModel.map(function (a) {
        return a.monthName;

      });
      let countlic = null;

      if (this.graphrows.length == 0) {
        this.gcolumnNames = [];
        this.graphtemp = [];
        this.showgraph = false;
        countlic = 1;
      }
      else {
        this.graphtemp = this.graphrows.map(function (a) {
          return a.leaseTotalAmount;
        });
        this.showgraph = true;
      }


      if (this.graphtemp[0] < 10) {
        countlic = 1;
      }
      this.data = {
        labels: this.gcolumnNames,


        datasets: [
          {
            label: 'Sale By Month'+' '+ReportEndDateStartDate.lastDate +' '+ 'through' +' '+ ReportEndDateStartDate.currentDate,
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return '$' + value;
              }
            },

            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: this.graphtemp
          }
        ]
      }
      this.options = {
        scales: {
          yAxes: [{
            label: 'Lease Amount',
            showTooltips: true,

            multiTooltipTemplate: function (label) {
              return '$' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            ticks: {
              beginAtZero: true,
              fixedStepSize: countlic,
              callback: function (value, index, values) {
                if (parseInt(value) >= 1000) {
                  return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                  return '$' + value;
                }
              },

            }
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.labels[tooltipItem.index];
              let datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              let currencyPipe = new CurrencyPipe('en');
              let formattedNumber = currencyPipe.transform(datasetLabel, 'USD', 'symbol');
              return "Lease Amount" + ': ' + formattedNumber;
            }
          }
        },
      }
      this.loadChart = false;
    });
  }
}
