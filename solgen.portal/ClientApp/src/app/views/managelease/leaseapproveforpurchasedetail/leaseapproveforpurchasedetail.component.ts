import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ManageleaseService } from '../managelease.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-leaseapproveforpurchasedetail',
  templateUrl: './leaseapproveforpurchasedetail.component.html',
  styleUrls: ['./leaseapproveforpurchasedetail.component.scss']
})
export class LeaseapproveforpurchasedetailComponent implements OnInit {
  @ViewChild('leaseapproveforpurchasedetailModal', { static: false }) modalApproveForPurchase: ModalDirective;
  lendernotes: any;
  approveBy: any;
  active= true;
  approveOn: any;
  loadSave: boolean = false;

  constructor(private leaseService: ManageleaseService, private toaster: ToastrService,
    private router: Router, private dialogService: ConfirmationDialogService, private commonService: CommonService) { }

  ngOnInit() {
  }
  close() {
    this.active = false;
    this.modalApproveForPurchase.hide();
  }
  show(note, AapproveBy, ApproveOn) {
    this.lendernotes = note;
    this.approveBy = AapproveBy;
    this.approveOn = ApproveOn;
    this.modalApproveForPurchase.show();
  }
}
