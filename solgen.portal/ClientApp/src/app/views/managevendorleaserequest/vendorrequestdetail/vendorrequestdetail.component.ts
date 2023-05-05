import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VendorleaserequestlistService } from '../vendorleaserequestlist.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-vendorrequestdetail',
  templateUrl: './vendorrequestdetail.component.html',
  styleUrls: ['./vendorrequestdetail.component.scss']
})
export class VendorrequestdetailComponent implements OnInit {

  @ViewChild('vendorTitleWorkRequestModal', { static: false }) modalvendorTitleWorkRequest: ModalDirective;

  active = false;
  loadSave = false;
  leaseId: any;
  contactId: any;
  venderEmailId: any;
  titleWorkRequest: any;
  leaseAssignedBankId: any;
  leaseDescription: any;
  isModelPopupOpen = false;
  htmlStr: string;
  constructor() {
    if (this.titleWorkRequest == undefined) {
      this.titleWorkRequest = "null";
    }
  }

  ngOnInit() {
    this.modalvendorTitleWorkRequest.hide();
  }

  close() {
    this.active = false;
    this.modalvendorTitleWorkRequest.hide();
  }

  show(titleWorkRequest, isModelPopupOpen, leaseAssignedBankId, venderEmailId) {
      this.titleWorkRequest = titleWorkRequest;
    this.leaseAssignedBankId = leaseAssignedBankId;
    this.htmlStr = titleWorkRequest.addionalLienInformation;
      this.venderEmailId = venderEmailId;
      this.leaseDescription = titleWorkRequest.leaseOtherDescription == null || titleWorkRequest.leaseOtherDescription == "" ? "N/A" : titleWorkRequest.leaseOtherDescription;
      this.modalvendorTitleWorkRequest.show();
      this.active = true;
  }
}
