import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ManageUserService } from '../../manageuser/addedituser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { LoanapplicationserviceService, LoanProgressModel, Progress } from '../loanapplicationservice.service';

@Component({
  selector: 'app-paymentinfo',
  templateUrl: './paymentinfo.component.html',
  styleUrls: ['./paymentinfo.component.scss']
})
export class PaymentinfoComponent implements OnInit {

  @Input('itemdata12') itemdata12: any;
  isflag = false;
  usertype: string;
  paymentPropForm: FormGroup
  loadSave = false;
  paymentdata: any;
  applicantId: any; loanappid: any;
  isDateChanged: any = true;
  accounttypeitems: any;
  @Output() ntpemit = new EventEmitter();
  @Output() loanInfoEmit = new EventEmitter<any>();
  constructor(private router: Router, private userService: ManageUserService, private route: ActivatedRoute, private fb: FormBuilder, private commonService: CommonService, private loanApplicationService: LoanapplicationserviceService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.usertype = localStorage.getItem("usertype");
    var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
    if (haspermission) {
      this.isflag = true;
    }
    this.initForm();

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');
      if (id) {

        this.loanappid = id;
        this.getAccountType();
        this.fillPaymentPropForm(id);
      } else {

      }

    });

  }

  getAccountType() {
    this.commonService.getLAAccountList().subscribe((result: any) => {

      this.accounttypeitems = result
      // // console.log('this.accounttype', this.accounttypeitems);
    });

  }
  fillPaymentPropForm(id) {
    this.loanApplicationService.GetPaymentInfo(id).subscribe((result: any) => {

      this.paymentdata = this.loanApplicationService.paymentInfo;

      const appid = id;
      // // console.log('this.paymentdata', this.paymentdata);
      this.paymentPropForm.patchValue({
        loanApplicationId: appid,// this.paymentdata[0].LoanApplicationId,


        accountType: this.paymentdata[0].AccountType,
        accountNumber: this.paymentdata[0].AccountNumber,
        nameOfAccount: this.paymentdata[0].NameOfAccount,
        instituteRoutingNumber: this.paymentdata[0].InstituteRoutingNumber,
        instituteName: this.paymentdata[0].InstituteName,
        autoPaymentViaACH: this.paymentdata[0].AutoPaymentViaACH,

      })
      // // console.log("this.paymentdata", this.paymentdata);
    });
  }
  OnChanged(e) {
    this.isDateChanged = true;

  }
  close() {
    this.ntpemit.emit();
  }
  isSubmitted = false;
  addUpdatePaymentInfo() {
    if (this.paymentPropForm.valid) {
      // this.loadSave = true;
      this.isSubmitted = true;
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);

      this.loanApplicationId.setValue(this.loanappid);

      this.loanApplicationService.addUpdatePaymentInfo(this.paymentPropForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.isSubmitted = false;
          loanProgress.appyingChanges = Progress.completed;
          this.loanApplicationService.loanProgress.next(loanProgress);
          loanProgress.applyingRules = Progress.start;
          loanProgress.result = result;
          this.loanApplicationService.loanProgress.next(loanProgress);

          //this.toaster.success(result.responseMessage);
          //setTimeout(() => { this.loadSave = false; }, 3000);
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
      this.commonService.validateAllFormFields(this.paymentPropForm);
    }
  }


  private initForm() {
    this.paymentPropForm = this.fb.group({
      'loanApplicationId': ['', Validators.nullValidator],
      'accountType': ['', Validators.nullValidator],
      'accountNumber': ['', [Validators.nullValidator]],
      'nameOfAccount': ['', [Validators.nullValidator]],
      'instituteRoutingNumber': ['', Validators.nullValidator],

      'instituteName': ['', [Validators.nullValidator]],
      'autoPaymentViaACH': [''],
    });
  }

  get loanApplicationId() { return this.paymentPropForm.get('loanApplicationId'); }
  get accountType() { return this.paymentPropForm.get('accountType'); }
  get accountNumber() { return this.paymentPropForm.get('accountNumber'); }
  get nameOfAccount() { return this.paymentPropForm.get('nameOfAccount'); }
  get instituteRoutingNumber() { return this.paymentPropForm.get('instituteRoutingNumber'); }

  get instituteName() { return this.paymentPropForm.get('instituteName'); }
  get autoPaymentViaACH() { return this.paymentPropForm.get('autoPaymentViaACH'); }

}
