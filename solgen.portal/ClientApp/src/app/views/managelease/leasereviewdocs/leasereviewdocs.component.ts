import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { AddeditleaseComponent } from '../addeditlease.component';


@Component({
  selector: 'app-leasereviewdocs',
  templateUrl: './leasereviewdocs.component.html',
  styleUrls: ['./leasereviewdocs.component.scss']
})
export class LeasereviewdocsComponent implements OnInit {

  @ViewChild('leasereviewDocModal', { static: false }) modaldoc: ModalDirective;
  @Output() leaveReviewDocView = new EventEmitter();
  active = false;
  leaseId: any
  isNotBankUser = true;
  IsReviewLeaseDoc = false;
  sortDir = 'desc';
  sortColumn = 'UploadedOn';
  loading = false; pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageNumber = 0;
  pageSizeValue: number;
  row: any
  loadSave: boolean = false;
  constructor(private leaseService: ManageleaseService, private dialogService: ConfirmationDialogService,
    private toaster: ToastrService,  private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        // HIDE THE BUTTON IN CASE FOR BANK USER 
        this.isNotBankUser = false;
      }
    });
    this.pageSizeValue = 10;
    this.getPageSizes();
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }


  onSortDoc($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.leaseService.getleaseReviewDoc(this.leaseId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onChange($event) {
    this.loading = true;
    this.leaseService.getleaseReviewDoc(this.leaseId, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.pageNumber = $event.page - 1;
    this.leaseService.getleaseReviewDoc(this.leaseId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  close() {
    this.active = false;
    this.modaldoc.hide();
  }
  show(row, id) {
    if (row.data.length < 1) {
      const message = `No documents are available for review.`;
      this.dialogService.confirm('Reviewed Lease Document(s)', message).subscribe(confirmed => {
      });
    }
    else {
      this.leaseId = id;
      this.pagedData = row;

      this.modaldoc.show();
    }
    this.active = true;
  }

  save(row: any) {
    this.dialogService.confirm('Reviewed Lease Document(s)', "Are you sure you have reviewed all Lease Documents and want to update Status?").subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.saveLeaseReviewDocStatus(this.leaseId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.leaveReviewDocView.emit();
              this.toaster.success(`Status of Lease Document(s) has been updated successfully.`);
            this.close();
            
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        }, error => {

        });
      }
    });
  }
}
