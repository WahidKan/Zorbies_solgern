import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-fundingpackagetobank',
  templateUrl: './fundingpackagetobank.component.html',
  styleUrls: ['./fundingpackagetobank.component.scss']
})
export class FundingpackagetobankComponent implements OnInit {
  @ViewChild('leasefundingPackageTobankModal', { static: false }) modalFundingPackagelease: ModalDirective;
  @Output() leavefundingPackageApprovalDocView = new EventEmitter();
  active = false;
  loadSave = false;
  IsApprovedForPurchase = false;
  leaseId: any;
  val: string;
  leaseAssignedBankId: any;
  contactId: any;
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
  constructor(private leaseService: ManageleaseService, private toaster: ToastrService,
    private router: Router, private dialogService: ConfirmationDialogService, private commonService: CommonService) { }


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
    this.modalFundingPackagelease.hide();
  }
  show(leaseId, contactId, leaseAssignedBankId, IsApprovedForPurchase, row) {
    if (leaseId !== null && typeof leaseId !== 'undefined' && IsApprovedForPurchase != false && IsApprovedForPurchase !=undefined ) {
      if (IsApprovedForPurchase!= false) {
        this.leaseId = leaseId;
        this.contactId = contactId;
        this.leaseAssignedBankId = leaseAssignedBankId;
        this.IsApprovedForPurchase = IsApprovedForPurchase;
        this.pagedData = row;
        this.modalFundingPackagelease.show();
        this.active = true;
      }
      else {
        const message = `You are not able to send Lease for Funding Package to Bank as It is not approved for Purchase yet`;
        this.dialogService.confirm('Lease Funding Package to Bank ', message).subscribe(confirmed => {
          if (confirmed) {
          }
        });
      }
    }
    else {
      const message = `You are not able to send Lease for Funding Package to Bank as It is not approved for Purchase yet`;
      this.dialogService.confirm('Lease Funding Package to Bank ', message).subscribe(confirmed => {
        if (confirmed) {
        }
      });
    }
  }

  sendFundingPackageToBank(row: any) {
    this.dialogService.confirm('Lease Funding Package to Bank', "Are you sure you want to send Lease for Funding Package to Bank?").subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.leaseService.sendFundingPackageToBank(this.leaseId, this.contactId, this.leaseAssignedBankId).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.leavefundingPackageApprovalDocView.emit();
            this.toaster.success(res.responseMessage);
            this.close();
            this.loadSave = false;

          }
          else {
            this.toaster.success(res.responseMessage);
            this.loadSave = false;
          }
        }, error => {

        });
      }
    });
  }

}
