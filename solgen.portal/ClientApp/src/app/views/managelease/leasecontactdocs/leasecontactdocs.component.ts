import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-leasecontactdocs',
  templateUrl: './leasecontactdocs.component.html',
  styleUrls: ['./leasecontactdocs.component.scss']
})
export class LeasecontactdocsComponent implements OnInit {

  @ViewChild('leasecontactDocModal', { static: false }) modaldoc: ModalDirective;
  @Output() leaveReviewSupportingDocView = new EventEmitter();
  active = false;
  leaseId: any
  isNotBankUser = true;
  sortDir = 'desc';
  sortColumn = 'UploadedOn';
  pageNumber = 0;
  pageSizeValue: number;
  row: any
  id: any
  lstPageSize: any
  loadSave: boolean = false;
  loading = false; pagedData: any = {
    pager: {},
    data: []
  };
  constructor(private leaseService: ManageleaseService,
    private toaster: ToastrService, private commonService: CommonService, private dialogService: ConfirmationDialogService) { }

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

  close() {
    this.active = false;
    this.modaldoc.hide();
  }

  save() {
    this.dialogService.confirm('Lease reviewed Supporting Documents', "Are you sure you have reviewed all Supporting Documents and want to update Status?").subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.saveDetail(this.leaseId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(`Status of Supporting Document(s) has been updated successfully.`);
            this.leaveReviewSupportingDocView.emit();
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

  onSortDoc($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
     this.leaseService.getContactDocbyLeaseID(this.leaseId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue).subscribe(response => {
       this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onChange($event) {
    this.loading = true;
    this.leaseService.getContactDocbyLeaseID(this.leaseId, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.leaseService.getContactDocbyLeaseID(this.leaseId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
 

  show(row,id) {
    if (row) {
      if (row.data.length<1) {
        const message = `No documents are available for review.`;
        this.dialogService.confirm('Lease reviewed Supporting Documents', message).subscribe(confirmed => {

        });
      }
      else {
        this.pagedData = row;
        this.leaseId = id;
        this.modaldoc.show();
      }
    }
    this.active = true;
  }
 }
