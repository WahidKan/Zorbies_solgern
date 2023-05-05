import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentQuoteService, PaymentQuote } from './payment-quote.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { QuotePreviewComponent } from './quote-preview.component';
import { LeaseForm } from '../managelease/managelease.service';
import { EqualValidator } from '../shared/custom-validation/equal-validator';

@Component({
  selector: 'app-add-edit-payment-quote',
  templateUrl: './add-edit-payment-quote.component.html',
  styleUrls: ['./add-edit-payment-quote.component.scss']
})
export class AddEditPaymentQuoteComponent implements OnInit {
  paymentQuoteForm: FormGroup;
  paymentQuote: PaymentQuote = new PaymentQuote();
  showHideTag = true;
  modulePermission: ModuleList;
  addOrUpdatePermission: boolean;
  @ViewChild('quotePreview', { static: false }) quotePreview: QuotePreviewComponent;
  leaseLicenceFee: any
  fee: any
  constructor(private router: Router, private toaster: ToastrService,
    private paymentService: PaymentQuoteService, private commonService: CommonService,
    private route: ActivatedRoute, private fb: FormBuilder) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
      }
    });
    this.initForm();
  }

  save() {
    if (this.paymentQuoteForm.valid) {
      this.paymentService.savePaymentQuote(this.paymentQuoteForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/paymentquote");
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      })
    }
    else {
      this.commonService.validateAllFormFields(this.paymentQuoteForm);
    }
  }

  cancel() {
    this.router.navigateByUrl("/paymentquote");
  }

  showQuotePreview() {
    // // console.log(this.paymentQuoteForm.valid);
    if (this.paymentQuoteForm.valid) {
      this.quotePreview.show(this.paymentQuoteForm.value);
    }
    else {
      this.commonService.validateAllFormFields(this.paymentQuoteForm);
    }
  }

  private initForm() {
    this.paymentQuoteForm = this.fb.group({
      'paymentQuoteId': [this.paymentQuote.paymentQuoteId, Validators.nullValidator],
      'paymentQuoteName': [this.paymentQuote.paymentQuoteName, Validators.required],
      'paymentQuoteEmail': [this.paymentQuote.paymentQuoteEmail, [Validators.required, Validators.email]],
      'leases': this.fb.array([
        this.initLeaseForm(),
      ]),
    });
  }

  get paymentQuoteId() { return this.paymentQuoteForm.get('paymentQuoteId'); }
  get paymentQuoteName() { return this.paymentQuoteForm.get('paymentQuoteName'); }
  get paymentQuoteEmail() { return this.paymentQuoteForm.get('paymentQuoteEmail'); }

  initLeaseForm() {
    // initialize our guarantor
    return this.fb.group({
      leaseUseType: ['', Validators.required],
      leaseType: ['', Validators.required],
      leaseOtherDescription: [''],
      leaseDescription: [''],
      leaseRate: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseFeePercentage: [0, Validators.required],
      leaseResidualPercentage: [null, Validators.required],
      leaseTerm: [null, Validators.required],
      //leaseEquipmentMSRP: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      //leaseEquipmentCost: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      //leaseAdditions1: ['0.00', [ Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      //leaseAdditions2: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseEquipmentMSRP: ['$0.00', [Validators.required, Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseEquipmentCost: ['$0.00', [Validators.required, Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseAdditions1: ['$0.00', [Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseAdditions2: ['$0.00', [Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],

      leaseTotalEquipmentMSRP: [0],
     // leaseSalesTax: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseSalesTax: ['$0.00', [Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseResidualAmount: ['0.00', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      //leaseWarranty: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      //leaseOther: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseWarranty: ['$0.00', [Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseOther: ['0.00', [Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],


      leaseMonthlyRentalPayment: ['0.00', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leasePlacementFee: ['0.00', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      //leaseAmountDueAtSigining:  ['0.00', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseAmountDueAtSigining: ['0.00', [Validators.nullValidator, Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseTotalAmount: ['0.00', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      leaseTermText: [''],
      lenderDate: [null],
      lenderName: [''],
      lenderNotes: [''],
      lenderAgree: [false, Validators.required],
      LeaseInsurance: [null],
      leaseLicenceFee: ['0.00', [Validators.required, Validators.pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
      leaseTemplateId: [null],
      leasePreferredDocumentSignedBy: [''],
    },
      {
        validator: EqualValidator.percentage('leaseFeePercentage')
      });

  }
  get leases(): FormArray {
    return <FormArray>this.paymentQuoteForm.get('leases');
  }
}
