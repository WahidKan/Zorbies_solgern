import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lease-funding-status-detail',
  templateUrl: './lease-funding-status-detail.component.html',
  styleUrls: ['./lease-funding-status-detail.component.scss']
})
export class LeaseFundingStatusDetailComponent implements OnInit {

  @ViewChild('leaseFundingStatusModal', { static: false }) modalApproveForPurchase: ModalDirective;
  lendernotes: any;
  approveBy: any;
  active= true;
  approveOn: any;
  loadSave: boolean = false;

  constructor() { }

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
