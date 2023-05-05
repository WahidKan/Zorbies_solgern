import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoanapplicationserviceService, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { CommonService } from '../../shared/common.service';
import { ManageUserService } from '../../manageuser/addedituser.service';

@Component({
  selector: 'app-coapplicantdetail',
  templateUrl: './coapplicantdetail.component.html',
  styleUrls: ['./coapplicantdetail.component.scss']
})
export class CoapplicantdetailComponent implements OnInit {
  coApplicantForm: FormGroup
  loadSave = false;
  coApplicantdata: any;
  coApplicantId: any; loanappid: any;
  @Output() ntpemit = new EventEmitter();
  @Output() loanInfoEmit = new EventEmitter<any>();
  states: any;
  @Input('itemdata12') itemdata12: any;
  @Input('IsLACanceledFlag') IsLACanceledFlag: any;
  isflag = false;
  usertype: string;
  constructor(private toaster: ToastrService, private userService: ManageUserService, private fb: FormBuilder, private commonService: CommonService,
    private loanApplicationService: LoanapplicationserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.usertype = localStorage.getItem("usertype");
    var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
    if (haspermission) {
      this.isflag = true;
    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loanappid = id;
        this.getState();
        this.fillCoApplicantForm(id);
      } else {

      }

    });

   // this.fillCoApplicantForm(2);
  }
  getState() {
    this.userService.getStateList().subscribe((result: any) => {

      this.states = result
      // // console.log('State:', this.states);
    });

  }

  close() {
    this.ntpemit.emit();
  }
  fillCoApplicantForm(id) {
    this.loanApplicationService.GetCoApplicantInfo(id).subscribe((result: any) => {

      this.coApplicantdata = this.loanApplicationService.coApplicantInfo;
      // // console.log('this.coApplicantdata', this.coApplicantdata)

      let d = null
      if (this.coApplicantdata[0].DOB != null && this.coApplicantdata[0].DOB != "") {
        d = new Date(this.coApplicantdata[0].DOB);
      }
      this.coApplicantId = this.coApplicantdata[0].Id,

        this.coApplicantForm.patchValue({
          loanApplicationId: this.coApplicantdata[0].LoanApplicationId,
          firstName: this.coApplicantdata[0].FirstName,
          lastName: this.coApplicantdata[0].LastName,
          dob: d,
          suffix: this.coApplicantdata[0].Suffix,
          ssn: this.coApplicantdata[0].SSN,
          relationshipStatus: this.coApplicantdata[0].RelationshipStatus,
          streetName: this.coApplicantdata[0].StreetName,
          aptSt: this.coApplicantdata[0].AptSt,
          streetType: this.coApplicantdata[0].StreetType,
          ruralRoute: this.coApplicantdata[0].RuralRoute,
          poBox: this.coApplicantdata[0].POBox,
          city: this.coApplicantdata[0].City,
          stateId: this.coApplicantdata[0].StateId,
          homePhone: this.coApplicantdata[0].HomePhone,
          zip: this.coApplicantdata[0].Zip,
          email: this.coApplicantdata[0].Email,
          businessPhone: this.coApplicantdata[0].BusinessPhone,
          dINumber: this.coApplicantdata[0].DINumber,
          dlState: this.coApplicantdata[0].DLState,
          rentAmount: this.coApplicantdata[0].RentAmount,
          housingStatus: this.coApplicantdata[0].HousingStatus,
          yearsAtCurrentAddr: this.coApplicantdata[0].YearsAtCurrentAddr,
          monthsAtCurrentAddr: this.coApplicantdata[0].MonthsAtCurrentAddr,
          grossIncome: this.coApplicantdata[0].GrossIncome,
          incomeFreq: this.coApplicantdata[0].IncomeFreq,
          otherMonthlyIncome: this.coApplicantdata[0].OtherMonthlyIncome,
          otherIncomeSource: this.coApplicantdata[0].OtherIncomeSource,
          employerName: this.coApplicantdata[0].EmployerName,
          employerType: this.coApplicantdata[0].EmployerType,
          occupation: this.coApplicantdata[0].Occupation,
          monthsAtEmp: this.coApplicantdata[0].MonthsAtEmp,
          yearAtEmp: this.coApplicantdata[0].YearAtEmp,
        })
      // // console.log("this.coApplicantdata", this.coApplicantdata);
    });
  }
  isSubmitted = false;
  addUpdateApplicant() {
    if (this.coApplicantForm.valid) {
      //this.loadSave = true;
      this.isSubmitted = true;
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);

      // // console.log('FormValue:', this, this.coApplicantForm.value);
      this.loanApplicationId.setValue(this.loanappid);
      let dtdate = new Date(this.coApplicantForm.value.dob);
      this.dob.setValue(dtdate);
      this.loanApplicationService.addUpdateCoApplicant(this.coApplicantForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.toaster.success(result.responseMessage);
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
          this.isSubmitted = false;
      })
    }
    else {
      this.commonService.validateAllFormFields(this.coApplicantForm);
      this.isSubmitted = false;
    }
  }



  private initForm() {
    this.coApplicantForm = this.fb.group({
      'loanApplicationId': ['', Validators.nullValidator],
      'firstName': ['', Validators.nullValidator],
      'lastName': ['', [Validators.nullValidator]],
      'dob': ['', [Validators.nullValidator]],
      'suffix': ['', [Validators.nullValidator]],
      'ssn': ['', Validators.nullValidator],
      'relationshipStatus': [0, Validators.nullValidator],
      'streetName': ['', [Validators.nullValidator]],
      'aptSt': ['', [Validators.nullValidator]],
      'streetType': ['', [Validators.nullValidator]],
      'ruralRoute': ['', Validators.nullValidator],
      'poBox': ['', Validators.nullValidator],
      'city': ['', Validators.nullValidator],
      'stateId': ['', [Validators.nullValidator]],
      'homePhone': ['', [Validators.nullValidator]],
      'zip': ['', [Validators.nullValidator]],
      'email': ['', Validators.nullValidator],
      'businessPhone': ['', Validators.nullValidator],
      'dINumber': ['', Validators.nullValidator],
      'dlState': ['', Validators.nullValidator],
      'rentAmount': [0, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'housingStatus': ['', [Validators.nullValidator]],
      'yearsAtCurrentAddr': ['', [Validators.nullValidator]],
      'monthsAtCurrentAddr': ['', Validators.nullValidator],
      'grossIncome': [0, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'incomeFreq': [0, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'otherMonthlyIncome': [0, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'otherIncomeSource': ['', [Validators.nullValidator]],
      'employerName': ['', Validators.nullValidator],
      'employerType': ['', [Validators.nullValidator]],
      'occupation': ['', [Validators.nullValidator]],
      'monthsAtEmp': ['', [Validators.nullValidator]],
      'yearAtEmp': ['', [Validators.nullValidator]],
    });
  }

  get loanApplicationId() { return this.coApplicantForm.get('loanApplicationId'); }
  get firstName() { return this.coApplicantForm.get('firstName'); }
  get lastName() { return this.coApplicantForm.get('lastName'); }
  get dob() { return this.coApplicantForm.get('dob'); }
  get suffix() { return this.coApplicantForm.get('suffix'); }
  get ssn() { return this.coApplicantForm.get('ssn'); }
  get relationshipStatus() { return this.coApplicantForm.get('relationshipStatus'); }
  get streetName() { return this.coApplicantForm.get('streetName'); }
  get aptSt() { return this.coApplicantForm.get('aptSt'); }
  get streetType() { return this.coApplicantForm.get('streetType'); }
  get ruralRoute() { return this.coApplicantForm.get('ruralRoute'); }
  get poBox() { return this.coApplicantForm.get('poBox'); }
  get city() { return this.coApplicantForm.get('city'); }
  get stateId() { return this.coApplicantForm.get('stateId'); }
  get homePhone() { return this.coApplicantForm.get('homePhone'); }
  get zip() { return this.coApplicantForm.get('zip'); }
  get email() { return this.coApplicantForm.get('email'); }
  get businessPhone() { return this.coApplicantForm.get('businessPhone'); }
  get dINumber() { return this.coApplicantForm.get('dINumber'); }
  get dlState() { return this.coApplicantForm.get('dlState'); }
  get rentAmount() { return this.coApplicantForm.get('rentAmount'); }
  get housingStatus() { return this.coApplicantForm.get('housingStatus'); }
  get yearsAtCurrentAddr() { return this.coApplicantForm.get('yearsAtCurrentAddr'); }
  get monthsAtCurrentAddr() { return this.coApplicantForm.get('monthsAtCurrentAddr'); }
  get grossIncome() { return this.coApplicantForm.get('grossIncome'); }
  get incomeFreq() { return this.coApplicantForm.get('incomeFreq'); }
  get otherMonthlyIncome() { return this.coApplicantForm.get('otherMonthlyIncome'); }
  get otherIncomeSource() { return this.coApplicantForm.get('otherIncomeSource'); }
  get employerName() { return this.coApplicantForm.get('employerName'); }
  get employerType() { return this.coApplicantForm.get('employerType'); }
  get occupation() { return this.coApplicantForm.get('occupation'); }
  get monthsAtEmp() { return this.coApplicantForm.get('monthsAtEmp'); }
  get yearAtEmp() { return this.coApplicantForm.get('yearAtEmp'); }
}
