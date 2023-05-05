import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-generateleasedocs',
  templateUrl: './generateleasedocs.component.html',
  styleUrls: ['./generateleasedocs.component.scss']
})
export class GenerateleasedocsComponent implements OnInit {
  @ViewChild('quotePreview', { static: false }) modalLeaseDoc: ModalDirective;
  active = false;
  leaseTerm: any;
  leaseRate: any;
  leaseType: any;
  loadSave: boolean = false;

  businessName: any;
  contactEmail: any;
  userType: any;
  leaseTotalEquipmentMSRP: any;
  calculteTotalEquipMSRP: any;
  leaseResidualAmount: any;
  leaseMonthlyRentalPayment: any;
  leasePlacementFee: any;
  leaseAmountDueAtSigining: any;
  leaseTotalAmount: any;

  constructor(public  commonService: CommonService) { }

  ngOnInit() {
  }

  show() {
    this.modalLeaseDoc.show();
    this.active = true;
  }

  close() {
    this.active = false;
    this.modalLeaseDoc.hide();
  }
  saveQuote() {

  }

}
