import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ReportService } from '../report.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import * as XLSX from 'xlsx';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-leasevolumereport',
  templateUrl: './leasevolumereport.component.html',
  styleUrls: ['./leasevolumereport.component.scss']
})
export class LeasevolumereportComponent implements OnInit {
  loadSave: boolean = false;

  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('bankStatus', { static: false }) bakSelect: NgSelectComponent;
  @ViewChild('chart', { static: false }) public primeChart: UIChart;
  public gData: any;
  id = "";
  loading = false;
  sortDir = 'desc';
  sortColumn = 'reportMonthYear';
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
  maxDateTo: Date = new Date();
  maxDateFrom: Date = new Date();
  leaseStatus: any = null;
  contactStatus: any = null;
  lstPageSize: any
  pageSizeValue: number;
  loginuserid: any
  lstBanks: any;
  options: any;
  options1: any;
  loadChart = false;
  RowsHeader = [];
  graphrows = [];
  graphrows1 = [];
  rows = []; graphtemp = [];
  graphtemp1 = [];
  reportdata: any;
  showgraph = false;
  gcolumnNames: any;
  gcolumnNames1: any;
  data: any;
  pageSize: any;
  bankName: any = null;
  totalPageSize: number = 10;
  startDate: any;
  endDate: any;
  constructor(private reportService: ReportService, public datepipe: DatePipe,
    private toaster: ToastrService,
    private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      
    });
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();   
    this.expFrom = new Date(y, m - 11, 1);
    this.expTo = new Date(y, m, 1);
  }


  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
    this.ShowLeaseTrackingGraph();
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


  print(): void {
    const windowPort = window.open('', '', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');

    const printDom = `
      <html>
        <head>
          <title>Lease Volume Graph</title>
        </head>
        <body>
            <h2>Lease Volume Graph</h2>

               <div class="row">
                    <div class="col-12 col-md-6 col-lg-6">
                      <label>Start Date:${this.startDate}</label>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6">
                      <label>End Date:${this.endDate}</label>
                    </div>
               </div>

            <div class="content">
                <img src="${this.primeChart.getBase64Image()}" />
            </div>

        </body>
      </html>`;

    windowPort.document.write(printDom);
    windowPort.document.close();
    windowPort.focus();
    windowPort.print();
  }

  onChange($event) {
    this.loading = true;
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    if (this.expFrom != null && this.expTo != null) {
      this.startDate = this.datepipe.transform(this.expFrom, 'MM-dd-yyyy');
      this.endDate = this.datepipe.transform(this.expTo, 'MM-dd-yyyy');
      this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
        this.pagedData = this.reportService.pagedData;
        this.pageSize = this.pagedData.pager.totalItems;        
        this.loading = false;
      }, error => {
        this.loading = false;
        });
      this.ShowLeaseTrackingGraph();
    }
    else {
      this.toaster.error("Please select start month and end month");
      this.loading = false;
    }
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
  Reset() {
    this.loading = true;
    this.sortDir = 'asc';
    this.sortColumn = 'reportMonthYear';
    this.pageSizeValue = 10;
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    this.expFrom = new Date(y, m - 11, 1);
    this.expTo = new Date(y, m, 1);
    this.startDate = this.datepipe.transform(this.expFrom, 'MM-dd-yyyy');
    this.endDate = this.datepipe.transform(this.expTo, 'MM-dd-yyyy');
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
      });
    this.ShowLeaseTrackingGraph();
  }

  setPage($event) {
    this.loading = true;
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
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
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.reportService.pagedData;      
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.startDate = this.datepipe.transform(this.expFrom, 'MM-dd-yyyy');
    this.endDate = this.datepipe.transform(this.expTo, 'MM-dd-yyyy');
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      

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
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSize, this.loginuserid,"e").subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;
      if (this.pagedDataForImport.data.length > 0) {
        this.commonService.ExportData(this.pagedDataForImport.data, "Excel", "LeaseVolumeReport", null);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSize, this.loginuserid, "e").subscribe(response => {
      this.pagedDataForImport = this.reportService.pagedData;

      if (this.pagedDataForImport.data.length > 0) {
        this.commonService.ExportData(this.pagedDataForImport.data, 'PDF', "LeaseVolumeReport", null);
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  ShowLeaseTrackingGraph() {
    this.loadChart = true;
    this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid,"g").subscribe(response => {
      this.reportdata = this.reportService.pagedData;
      this.graphrows = this.reportdata.data;

      this.gcolumnNames = this.reportdata.data.map(function (a) {
        return a.reportMonthYear;

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
          return a.TotalIncome;
        });
        this.showgraph = true;
      }
      //try
      if (this.graphrows.length == 0) {
        this.gcolumnNames1 = [];
        this.graphtemp1 = [];
        this.showgraph = false;
        countlic = 1;
      }
      else {
        this.graphtemp1 = this.graphrows.map(function (a) {
          return a.SolgenIncome;
        });
        this.showgraph = true;
      }
      //end

      if (this.graphtemp[0] < 10) {
        countlic = 1;
      }
      this.data = {
        labels: this.gcolumnNames,
        datasets: [
          {
            label: 'Solgen Lease Volume',
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
          },
        //strt
          {
            label: 'Solgen Lease Income',
            callback: function (value1, index, values) {
              if (parseInt(value1) >= 1000) {
                return '$' + value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return '$' + value1;
              }
            },

            backgroundColor: '#00FFFF',
            borderColor: '#1E88E5',
            data: this.graphtemp1
          }
          //end
        ]
      }

      this.options = {
        scales: {
          yAxes: [{
            label: 'Solgen Lease Volume',
            showTooltips: true,
            responsive: false,
            maintainAspectRatio: false,
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
              let tooltiptext = "Solgen Lease Volume";
              if (tooltipItem.datasetIndex == "1") {
                tooltiptext = "Solgen Lease Income";
              }
              let label = data.labels[tooltipItem.index];
              let datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              let currencyPipe = new CurrencyPipe('en');
              let formattedNumber = currencyPipe.transform(datasetLabel, 'USD', 'symbol');
              return tooltiptext+ ': ' + formattedNumber;
            }
          }
        },
      }

      this.options1 = {
        scales: {
          yAxes: [{
            label: 'Solgen Lease Income',
            showTooltips: true,
            responsive: false,
            maintainAspectRatio: false,
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
              return "Solgen Lease Volume" + ': ' + formattedNumber;
            }
          }
        },
      }
      ///end graph
      this.loadChart = false;


    });
  }
}
