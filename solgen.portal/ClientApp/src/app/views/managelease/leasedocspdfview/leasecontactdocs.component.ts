import { Component, OnInit, ViewChild, Output, EventEmitter, wtfLeave, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { CommonService } from '../../shared/common.service';

@Component({
    selector: 'app-leasedocspdfview',
    templateUrl: './leasedocspdfview.component.html'
})
export class LeasedocspdfviewComponent implements OnInit {
  @ViewChild('leasedocspdfviewModal', { static: false }) modaldocpdf: ModalDirective;
  @Output() leasedocspdf = new EventEmitter();
  active = false;
  pdfSrc: string;
  loadSave = false;
  val: string;
  leaseIdValue: string;
  isCustomerUser = false;
  isGenerateLeaseDoc = false;
  leasePDFDocumentNameLink: string;
  isSalesUser = false;
  constructor(private dialogService: ConfirmationDialogService, private leaseService: ManageleaseService
    , private toaster: ToastrService, private router: Router, private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype03') {
        this.isSalesUser = true;
      }
    });
  }

  ngOnInit() {

    }

  close() {
    this.active = false;
    this.modaldocpdf.hide();
  }
  onRightClick() {
    if (this.isSalesUser)
      return false;
  }
  disablecopypaste() {
    if (this.isSalesUser)
      return false;
  }
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67 && this.isSalesUser)
      return false;
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86 && this.isSalesUser)
      return false;
  }
  show(linkValue, leaseId) {
    this.leasePDFDocumentNameLink = linkValue;
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype05' || userdetail.userType == 'usertype03') {
        this.isCustomerUser = true;
      }
      if (userdetail.userType == 'usertype03') {  //Sales User
        this.isSalesUser = true;
      }
    });
    this.val = linkValue;
    if (leaseId !== null && typeof leaseId !== 'undefined' && this.val !== null && this.val !== '' && typeof (this.val) !== 'undefined') {
      let value = this.val.indexOf('NoDocPdf');
      if (linkValue != null && value == -1) {
        this.pdfSrc = linkValue;
        this.isGenerateLeaseDoc = true;
        this.leaseIdValue = leaseId;
        this.modaldocpdf.show();
        this.active = true;
      }
      else {
        const message = `Proposal document not generate yet. `;
        this.dialogService.confirm('Proposal DocuSign for Client Signature', message).subscribe(confirmed => {
          if (confirmed) {
          }
        });
      }
    }
    else {
      const message = `Proposal document not generate yet.`;
      this.dialogService.confirm('Proposal DocuSign for Client Signature', message).subscribe(confirmed => {
        if (confirmed) {
        }
      });
    }
  }

  send() {
    const message = `Are you sure you want to send to DocuSign for client Signature?`;
    this.dialogService.confirm('Proposal DocuSign for Client Signature', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.leaseService.sendToDocusignToClient(this.leaseIdValue).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success(res.responseMessage);
            this.modaldocpdf.hide(); 
            this.leasedocspdf.emit();
            this.router.navigateByUrl("/lease/editlease/" + this.leaseIdValue);
            setTimeout(() => { this.loadSave = false; }, 3000);
          }
          else {
            this.loadSave = false
            this.toaster.error(res.responseMessage);
          }
        },
          error => {
            this.loadSave = false;
          })
      }
    });
  }

}
