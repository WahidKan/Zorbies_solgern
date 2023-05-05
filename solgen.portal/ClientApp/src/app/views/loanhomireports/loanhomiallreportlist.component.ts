import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { LoanapplicationserviceService } from '../loanapplication/loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-loanhomiallreportlist',
  templateUrl: './loanhomiallreportlist.component.html',
  styleUrls: ['./loanhomiallreportlist.component.scss']
})
export class LoanhomiallreportlistComponent implements OnInit {
  @Input() offset: number;
  loading: boolean = false;
  listFilter = '';
  columndata: any;
  searchTxt: '';
  currentPage: number = 1;
  pageSizeValue: number = 15;
  totalRecords: any;
  lstPageSize: any;
  sortColumn = 'created_on';
  sortDir = 'desc';
  contentHeader: object;
  constructor(private commonService: CommonService,
    private loanapplicationsService: LoanapplicationserviceService,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService  ) { }

  ngOnInit() {
    this.getPageSizes();
    this.getAllReportList();
  
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'All Reports',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: 'All Reports',
            isLink: false
          }
 
        ]
    };
  }


  search() {
    this.loading = true;
    this.loanapplicationsService.getAllReportList(this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.listFilter).subscribe(response => {
      this.columndata = response.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'created_on';
    this.pageSizeValue = 15;
    this.loanapplicationsService.getAllReportList(this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.listFilter).subscribe(response => {
      this.columndata = response.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

 

  getAllReportList() {
    this.loading = true;
    this.loanapplicationsService.getAllReportList(this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.listFilter).subscribe(response => {

      this.loading = false;

      this.columndata = [];
      //// console.log('response', response.data);
      this.columndata = response.data;
      //// console.log('this.columndata', this.columndata);

      if (response.data.length > 0) {
        this.totalRecords = this.columndata[0].total_records;

      } else {
        this.totalRecords = 0;
      }
      this.offset = this.currentPage;

      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  get curPage(): number {
    return this.offset;
  }


  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page;
    this.getAllReportList();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.getAllReportList();
  }
  onChange($event) {
    this.currentPage = 1;
    this.getAllReportList();
  }


  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getAllReportList();
    }
  }


  deleteReport(data) {
    const message = `Are you sure you want to delete report "${data.report_name}"?`;
    this.dialogService.confirm('Delete Report', message).subscribe(confirmed => {
      if (confirmed) {
        this.loanapplicationsService.deleteReport(data.Id).subscribe((response: any) => {
          if (response.responseMessage == "Success") {
            this.toaster.success(`Report "${data.report_name}" has been deleted successfully`);
            this.getAllReportList();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {

        });
      }
    });
  }
 

}
