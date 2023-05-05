import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService, LeaseForm } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-bankapproval',
  templateUrl: './bankapproval.component.html',
  styleUrls: ['./bankapproval.component.scss']
})
export class BankapprovalComponent implements OnInit {
  @ViewChild('leasebankApprovalModal', { static: false }) modalBanklease: ModalDirective;
  @Output() leaveSendTobankApprovalDocView = new EventEmitter();
  active = false;
  loadSave = false;
  leaseId: any;
  contactId: any;
  constructor(private leaseService: ManageleaseService, private toaster: ToastrService,
    private router: Router, private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
  }

  close() {
    this.active = false;
    this.modalBanklease.hide();
  }

  show(leaseId, contactId) {
    this.leaseId = leaseId;
    this.contactId = contactId;
    this.modalBanklease.show();
    this.active = true;

  }

  sendLeaseToBank() {   
    this.loadSave = true;
    if (this.contactId !== null && typeof this.contactId !== 'undefined') {
      this.dialogService.confirm('Send to Bank Approval', "Are you sure you want to send Lease for Bank Approval?").subscribe(confirmed => {
        if (confirmed) {
          this.leaseService.sendLeaseToBank(this.leaseId, this.contactId).subscribe((res: any) => {
            if (res.statusCode === 200) {
              this.toaster.success(res.responseMessage);
              this.leaveSendTobankApprovalDocView.emit();
              setTimeout(() => { this.loadSave = false; }, 3000);
            }
            else {
              this.toaster.error(res.responseMessage);
            }
          },
            error => {
              this.loadSave = false;
            });
        }
      });
      this.loadSave = false;
    }
    else {
      this.loadSave = false;
      this.toaster.error("Please select contact first.");
      this.loadSave = false;
    }
    this.close();
  }

}
