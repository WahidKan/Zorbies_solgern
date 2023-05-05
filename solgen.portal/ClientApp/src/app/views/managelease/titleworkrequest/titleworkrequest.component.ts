import { Component, OnInit, ViewChild, EventEmitter, Output, Pipe, PipeTransform } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-titleworkrequest',
  templateUrl: './titleworkrequest.component.html',
  styleUrls: ['./titleworkrequest.component.scss']
})
export class TitleworkrequestComponent implements OnInit {
  @ViewChild('leaseTitleWorkRequestModal', { static: false }) modalTitleWorkRequest: ModalDirective;
  @Output() leaveTitleRequestDocView = new EventEmitter();
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
  constructor(private leaseService: ManageleaseService, private toaster: ToastrService,
    private router: Router, private dialogService: ConfirmationDialogService) {
    if (this.titleWorkRequest == undefined) {
      this.titleWorkRequest = "null";
    }
  }


  ngOnInit() {
    this.modalTitleWorkRequest.hide();
  }
  close() {
    this.active = false;
    this.modalTitleWorkRequest.hide();
  }
  
  show(titleWorkRequest, isModelPopupOpen, leaseAssignedBankId,venderEmailId) {
    if (isModelPopupOpen == true) {
      this.titleWorkRequest = titleWorkRequest;
      this.htmlStr = titleWorkRequest.addionalLienInformation;
      this.modalTitleWorkRequest.hide();
    }
    else {
      this.titleWorkRequest = titleWorkRequest;
      this.leaseAssignedBankId = leaseAssignedBankId;
      this.venderEmailId = venderEmailId;
      this.leaseDescription = titleWorkRequest.leaseOtherDescription == null || titleWorkRequest.leaseOtherDescription=="" ? "N/A" : titleWorkRequest.leaseOtherDescription;
      this.modalTitleWorkRequest.show();
      this.active = true;
    }
  }
  sendTitleWorkRequest() {
    if (this.titleWorkRequest.leaseContactId !== null && typeof this.titleWorkRequest.leaseContactId !== 'undefined') {
      this.loadSave = true;
      this.leaseService.sendTitleWorkRequest(this.titleWorkRequest, this.titleWorkRequest.leaseContactId, this.leaseAssignedBankId, this.venderEmailId).subscribe((res: any) => {
            if (res.statusCode === 200) {
              this.toaster.success(res.responseMessage);
              setTimeout(() => { this.loadSave = false; }, 1000);
              this.leaveTitleRequestDocView.emit();
              this.close();
            }
            else {
               this.loadSave = false;
              this.toaster.error(res.responseMessage);
            }
          },
            error => {
              this.loadSave = false;
            });
    }
    else {
      this.loadSave = false;
      this.toaster.error("Please select contact first.");
      this.loadSave = false;
    }
   
  }
}
