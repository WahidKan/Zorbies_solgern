import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaymentQuoteService, PaymentQuote } from './payment-quote.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote-preview',
  templateUrl: './quote-preview.component.html'
})
export class QuotePreviewComponent implements OnInit {
  @ViewChild('quotePreview', { static: false }) modalPreview: ModalDirective;
  businessName: String;
  contactEmail: String;
  userType: String;
  leaseType: String;
  leaseRate: any;
  leaseTerm: String;
  leaseTotalEquipmentMSRP: any;
  leaseResidualAmount: any;
  leaseMonthlyRentalPayment: any;
  leasePlacementFee: any;
  leaseAmountDueAtSigining: any;
  leaseTotalAmount: any;
  leaseDescription: any;
  leaseOtherDescription: any;
  @Input() leases: any[]
  dataNoti: any;
  lstterms: any;
  active = false;
  paymentQuote: PaymentQuote = new PaymentQuote();
  loadSave = false;
  constructor(private router: Router, private toaster: ToastrService, private paymentService: PaymentQuoteService) { }


  ngOnInit() {
  }

  calculteTotalEquipMSRP() {
    const val1 = this.leases[0].leaseEquipmentMSRP.value;
    const val2 = this.leases[0].leaseAdditions1.value;
    let result = parseInt(val1 === '' ? 0 : val1) + parseInt(val2 === '' ? 0 : val2);
    if (result < 0)
      result = 0;
    return result;
  }

  close() {
    this.active = false;
    this.modalPreview.hide();
  }

  show(quoteData: PaymentQuote) {
    this.paymentQuote = quoteData
    this.businessName = this.paymentQuote.paymentQuoteName;
    this.contactEmail = this.paymentQuote.paymentQuoteEmail;
    this.userType = this.leases[0].leaseUseType;
    this.leaseRate = this.leases[0].leaseRate;
    this.leaseType = this.leases[0].leaseType;
    this.leaseTerm = this.leases[0].leaseTermText;
    this.paymentQuote.paymentQuoteText = this.leases[0].leaseTermText;
    this.leaseTotalEquipmentMSRP = this.leases[0].leaseTotalEquipmentMSRP;
    this.leaseResidualAmount = this.leases[0].leaseResidualAmount;
    this.leaseMonthlyRentalPayment = this.leases[0].leaseMonthlyRentalPayment;
    this.leasePlacementFee = this.leases[0].leasePlacementFee;
    this.leaseAmountDueAtSigining = this.leases[0].leaseAmountDueAtSigining;
    this.leaseTotalAmount = this.leases[0].leaseTotalAmount;
    this.leaseDescription = this.leases[0].leaseDescription;
    this.leaseOtherDescription = this.leases[0].leaseOtherDescription;
    this.modalPreview.show();
    this.active = true;
  }

  saveQuote() {
    this.loadSave = true;
    this.paymentService.savePaymentQuote(this.paymentQuote).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.router.navigateByUrl("/paymentquote");
        setTimeout(() => { this.loadSave = false; }, 3000);
      }
      else {
        this.toaster.error(result.responseMessage);
        this.loadSave = false;
      }
    },
      error => {
        this.loadSave = false;
      })
  }
}
