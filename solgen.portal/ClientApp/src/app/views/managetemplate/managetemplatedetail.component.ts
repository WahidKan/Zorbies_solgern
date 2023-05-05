import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-managetemplatedetail',
  templateUrl: './managetemplatedetail.component.html',
  styleUrls: ['./managetemplatedetail.component.scss']
})
export class ManagetemplatedetailComponent implements OnInit {
  @ViewChild('temlateDetailModal', { static: false }) modalBanklease: ModalDirective;
  temaplateContent: String;
  TemplateId: any;
  htmlStr: any;
  loadSave: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  show(templateContent) {
    this.temaplateContent = templateContent
      .replace(/@leaseNumber/g, "__________")
      .replace(/@solgenAddressValue/g, "__________")
      .replace(/@LesseeContact/g, "__________")
      .replace(/@vendorAddress/g, "__________")
      .replace(/@leaseDate/g, "__________")
      .replace(/@leaseDay/g, "__________")
      .replace(/@leaseMonth/g, "__________")
      .replace(/@leaseYear/g, "__________")
      .replace(/@leaseSerialNumber/g, "__________")
      .replace(/@leaseOtherDescription/g, "__________")
      .replace(/@lesseeName/g, "__________")
      .replace(/@lesseeAddress/g, "__________")
      .replace(/@leasePayment/g, "__________")
      .replace(/@leaseSales/g, "__________")
      .replace(/@licenseFee/g, "__________")
      .replace(/@lsttermstext/g, "__________")
      .replace(/@leaseResidualAmount/g, "__________")
      .replace(/@solgenPrintNameValue/g, "__________")
      .replace(/@lesseeCounty/g, "__________")
      .replace(/@leaseInsurance/g, "__________")
      .replace(/@lesseeCity/g, "__________")
      .replace(/@bankNamevalue/g, "__________")
      .replace(/@guarantorName/g, "__________")
      .replace(/@lesseestateValue/g, "__________")
      .replace(/@leaseAmountDueAtSigining/g, "__________")
      .replace(/@nextPaymentDueDate/g, "__________")
      .replace(/@leaseAdditions2/g, "__________")
      .replace(/@LeaseType/g, "__________")
      .replace(/@lesseeContactName/g, "__________")


      .replace(/@contactBankName/g, "__________")
      .replace(/@contactBankAddress/g, "__________")
      .replace(/@contactBankRoutingNumber/g, "__________")
      .replace(/@contactBankAccountNumber/g, "__________")
      .replace(/@leaseTerm1/g, "__________")
      .replace(/@leaseTerm2/g, "__________")
      .replace(/@documentationFee/g, "__________")
      .replace(/@debitAuthLeaseDateFrom/g, "__________")
      .replace(/@debitAuthMaturityDateBefore/g, "__________")
      .replace(/@leaseDescription/g, "__________")
      .replace(/@debitContactDetail/g, "__________");
    this.htmlStr = this.temaplateContent;
    this.modalBanklease.show();
  }

  close() {
    this.modalBanklease.hide();
  }
}
