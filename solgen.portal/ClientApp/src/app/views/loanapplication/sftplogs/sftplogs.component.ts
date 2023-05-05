import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';

@Component({
  selector: 'app-sftplogs',
  templateUrl: './sftplogs.component.html',
  styleUrls: ['./sftplogs.component.scss']
})
export class SFTPLogsComponent implements OnInit {
  @ViewChild('sftppopup', { static: false }) sftppopupModel: ModalDirective;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  lstPageSize: any
  pageSizeValue: number;
  currentPage: number;
  errorLog = '';
  constructor(private commonService: CommonService, private loanapplicationserviceService: LoanapplicationserviceService,
    private dialogService: ConfirmationDialogService, private toaster: ToastrService,) { }

  ngOnInit() {
    this.currentPage = 0;
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  }

  updateFilter(event) {
    this.currentPage = 0;
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
    this.loanapplicationserviceService.getSFTPLogList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.loanapplicationserviceService.sftpLogData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.loanapplicationserviceService.getSFTPLogList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.loanapplicationserviceService.sftpLogData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.loanapplicationserviceService.getSFTPLogList(this.listFilter, this.sortColumn, this.sortDir, 0, 10).subscribe(response => {
      this.pagedData = this.loanapplicationserviceService.sftpLogData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    var ab = $event.page - 1;
    this.currentPage = ab;
    this.loanapplicationserviceService.getSFTPLogList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.loanapplicationserviceService.sftpLogData;
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
    this.loanapplicationserviceService.getSFTPLogList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.loanapplicationserviceService.sftpLogData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.loanapplicationserviceService.getSFTPLogList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {

      this.pagedData = this.loanapplicationserviceService.sftpLogData;
      // console.log('this.pagedData', this.pagedData);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  SendNowSFTPdoc(row) {
    //if (this.isInternalVerification) {
    // console.log('row', row);
      var message = `Are you sure you want to send the loan documents to the SFTP server?`;
      this.dialogService.confirm('Transfer Documents', message).subscribe(confirmed => {
        if (confirmed) {
          this.loading = true;
          this.loanapplicationserviceService.sftp(row.LoanApplicationId, row.LoanApplicationNumber).subscribe((result: any) => {
            if (result.statusCode == 200) {
              this.loading = false;
              this.toaster.success(result.responseMessage);
            }
            else {
              this.loading = false;
              this.toaster.error(result.responseMessage);
            }
          });
        }
      });
    //}
   // else {
    //  this.dialogService.confirm('Transfer Documents', "You cannot use this feature because the INTERNAL VERIFICATION stage is not yet completed?").subscribe(confirmed => {
       // if (confirmed) {
       // }
     // });
    //}

  }

  ViewLog(row) {
    this.errorLog = row.LogMessage;
    this.sftppopupModel.show();
  }
  closemodel() {
    this.sftppopupModel.hide();
  }

}
