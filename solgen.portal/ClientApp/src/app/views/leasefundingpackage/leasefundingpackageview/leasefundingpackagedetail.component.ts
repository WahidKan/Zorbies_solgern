import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService } from '../../managelease/managelease.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { LeasefundingpackagelistService } from '../leasefundingpackagelist.service';

import { Router } from '@angular/router';
import { LeasefundingpackagelistComponent } from '../leasefundingpackagelist.component';

@Component({
  selector: 'app-leasefundingpackagedetail',
  templateUrl: './leasefundingpackagedetail.component.html',
  styleUrls: ['./leasefundingpackagedetail.component.scss']
})
export class LeasefundingpackagedetailComponent implements OnInit {
  @ViewChild('leasefundingpackageviewDocModal', { static: false }) modaldoc: ModalDirective;
  @Output() leavefundingpackageviewDocView = new EventEmitter();
  active = false;
  leaseId: any
  isNotBankUser = true;
  IsReviewLeaseDoc = false;
  sortDir = 'desc';
  IsApprovedForFund = false;
  sortColumn = 'DocumentCreatedOn';
  loading = false; pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageNumber = 0;
  pageSizeValue: number;
  row: any;
  loadSave: boolean = false;


  constructor(private leaseService: ManageleaseService, private dialogService: ConfirmationDialogService,
    private leasefundingPackageService: LeasefundingpackagelistService,
    private router: Router,
    private toaster: ToastrService, private commonService: CommonService) { }

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
  show(row, id, isApprovedForFund) {
    if (row.data.length < 1) {
      const message = `No documents are available for review.`;
      this.dialogService.confirm('Alert', message).subscribe(confirmed => {
      });
    }
    else {
      this.leaseId = id;
      this.pagedData = row;
      this.IsApprovedForFund = isApprovedForFund;
      this.modaldoc.show();
    }
    this.active = true;
  }

  approveLeaseForBankUser(leaseId: any) {
    const message = `Are you sure you want to Approved Proposal for Funding?`;
    this.dialogService.confirm('Alert', message).subscribe(confirmed => {
      if (confirmed) {
        this.leasefundingPackageService.approveLeaseForBankUser(this.leaseId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.modaldoc.hide();
            this.leavefundingpackageviewDocView.emit();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

}
