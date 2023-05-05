import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoanapplicationserviceService, Progress, LoanProgressModel } from '../loanapplicationservice.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-product',
  templateUrl: './loan-product.component.html',
  styleUrls: ['./loan-product.component.scss']
})
export class LoanProductComponent implements OnInit {
  @Input('itemdata12') itemdata12: any;
  isflag = false;
  usertype: string;
  loanProductForm: FormGroup;
  loanProductdata: any;
  applicationId: any;
  loadSave = false; loanappid: any;
  @Output() ntpemit = new EventEmitter();
  @Output() loanInfoEmit = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private commonService: CommonService,
    private loanApplicationService: LoanapplicationserviceService, private toaster: ToastrService) { }

  ngOnInit() {
    this.usertype = localStorage.getItem("usertype");
    var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase())!= -1;
    if (haspermission) {
      this.isflag = true;
    }
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loanappid = id;
        this.fillLoanProductForm(id);
      } else {

      }

    });
  }

  fillLoanProductForm(id) {
    this.loanApplicationService.GetLoanProductInfo(id).subscribe((result: any) => {

      this.loanProductdata = this.loanApplicationService.loanProductInfo;
      // // console.log('loanProductdata', this.loanProductdata);
     
      this.applicationId = this.loanProductdata[0].Id,

        this.loanProductForm.patchValue({
          loanApplicationId: this.loanProductdata[0].LoanApplicationId,
          loanTerm: this.loanProductdata[0].LoanTerm,
          amountFinanced: this.loanProductdata[0].AmountFinanced,
          loanRate: this.loanProductdata[0].LoanRate,
          permanentAmout: this.loanProductdata[0].PermanentAmout,
          lenderName: this.loanProductdata[0].LenderName,
          rateType: this.loanProductdata[0].RateType,
          securityType: this.loanProductdata[0].SecurityType,
          totalFeesCollectByLender: this.loanProductdata[0].TotalFeesCollectByLender,
          estTaxCredit: this.loanProductdata[0].EstTaxCredit,
          buyDownPercent: this.loanProductdata[0].BuyDownPercent,
          buyDownAmount: this.loanProductdata[0].BuyDownAmount,
          payment: this.loanProductdata[0].Payment,
          afterTaxCredit: this.loanProductdata[0].AfterTaxCredit,
        })
    });
  }
  close() {
    this.ntpemit.emit();
  }
  isSubmitted = false;
  addUpdateLoanProduct() {
    if (this.loanProductForm.valid) {
      //this.loadSave = true;
      this.isSubmitted = true;
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);

      // // console.log('FormValue:', this.loanProductForm.value);
      this.loanApplicationId.setValue(this.loanappid);
      this.loanApplicationService.addUpdateLoanProduct(this.loanProductForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.toaster.success(result.responseMessage);
          //setTimeout(() => { this.loadSave = false; }, 1000);
          this.isSubmitted = false;
          loanProgress.appyingChanges = Progress.completed;
          this.loanApplicationService.loanProgress.next(loanProgress);
          loanProgress.applyingRules = Progress.start;
          loanProgress.result = result;
          this.loanApplicationService.loanProgress.next(loanProgress);

          this.ntpemit.emit();
          //this.loanInfoEmit.emit(result);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.isSubmitted = false;
        }
      }, error => {
          this.loadSave = false;
          this.isSubmitted = false;
      })
    }
    else {
      this.isSubmitted = false;
      this.commonService.validateAllFormFields(this.loanProductForm);
    }
  }

  private initForm() {
    this.loanProductForm = this.fb.group({
      'loanApplicationId': ['', Validators.nullValidator],
      'loanTerm': ['', [Validators.nullValidator, Validators.pattern("[0-9]{1,9}")]],
      'amountFinanced': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'loanRate': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'permanentAmout': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'lenderName': ['', [Validators.nullValidator]],
      'rateType': ['', [Validators.nullValidator]],
      'securityType': ['', [Validators.nullValidator]],
      'totalFeesCollectByLender': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'estTaxCredit': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'buyDownPercent': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'buyDownAmount': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'payment': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'afterTaxCredit': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    });
  }


  get loanApplicationId() { return this.loanProductForm.get('loanApplicationId'); }
  get loanTerm() { return this.loanProductForm.get('loanTerm'); } 
  get amountFinanced() { return this.loanProductForm.get('amountFinanced'); }
  get loanRate() { return this.loanProductForm.get('loanRate'); }
  get permanentAmout() { return this.loanProductForm.get('permanentAmout'); }
  get lenderName() { return this.loanProductForm.get('lenderName'); }
  get rateType() { return this.loanProductForm.get('rateType'); }
  get securityType() { return this.loanProductForm.get('securityType'); }
  get totalFeesCollectByLender() { return this.loanProductForm.get('totalFeesCollectByLender'); }
  get estTaxCredit() { return this.loanProductForm.get('estTaxCredit'); }
  get buyDownPercent() { return this.loanProductForm.get('buyDownPercent'); }
  get buyDownAmount() { return this.loanProductForm.get('buyDownAmount'); }
  get payment() { return this.loanProductForm.get('payment'); }
  get afterTaxCredit() { return this.loanProductForm.get('afterTaxCredit'); }
}
