import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-coapplicant',
  templateUrl: './coapplicant.component.html',
  styleUrls: ['./coapplicant.component.scss']
})
export class CoapplicantComponent implements OnInit {

  coApplicantForm: FormGroup
  loadSave = false;
  applicantdata: any;
  applicantId: any;
  constructor(private fb: FormBuilder) { }
  IsCancelled
  ngOnInit() {
    this.initForm();
  }
  close() {

  }

  private initForm() {
    this.coApplicantForm = this.fb.group({
      'loanApplicationId': ['', Validators.nullValidator],
      'firstName': ['', Validators.nullValidator],
      'lastName': ['', [Validators.nullValidator]],
      'dob': ['', [Validators.nullValidator]],
      'ssn': ['', Validators.nullValidator],
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
      'rentAmount': [0, [Validators.nullValidator]],
      'housingStatus': ['', [Validators.nullValidator]],
      'yearsAtCurrentAddr': ['', [Validators.nullValidator]],
      'monthsAtCurrentAddr': ['', Validators.nullValidator],
      'grossIncome': [0, Validators.nullValidator],
      'incomeFreq': [0, Validators.nullValidator],
      'otherMonthlyIncome': [0, [Validators.nullValidator]],
      'otherIncomeSource': ['', [Validators.nullValidator]],
      'employerName': ['', Validators.nullValidator],
      'employerType': ['', [Validators.nullValidator]],
      'occupation': ['', [Validators.nullValidator]],
      'monthsAtEmp': ['', [Validators.nullValidator]],
      'yearAtEmp': ['', [Validators.nullValidator]],

      'suffix': ['', [Validators.nullValidator]],

      //'relationshipStatus': ['', Validators.nullValidator],
      //'street': ['', Validators.nullValidator],
      //'active': ['', Validators.nullValidator],
    });
  }

  get loanApplicationId() { return this.coApplicantForm.get('loanApplicationId'); }
  get firstName() { return this.coApplicantForm.get('firstName'); }
  get lastName() { return this.coApplicantForm.get('lastName'); }
  get dob() { return this.coApplicantForm.get('dob'); }
  get ssn() { return this.coApplicantForm.get('ssn'); }
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
  get incomeFreq() { return this.coApplicantForm.get('IncomeFreq'); }
  get otherMonthlyIncome() { return this.coApplicantForm.get('otherMonthlyIncome'); }
  get otherIncomeSource() { return this.coApplicantForm.get('otherIncomeSource'); }
  get employerName() { return this.coApplicantForm.get('employerName'); }
  get employerType() { return this.coApplicantForm.get('employerType'); }
  get occupation() { return this.coApplicantForm.get('occupation'); }
  get monthsAtEmp() { return this.coApplicantForm.get('monthsAtEmp'); }
  get yearAtEmp() { return this.coApplicantForm.get('yearAtEmp'); }
  get suffix() { return this.coApplicantForm.get('suffix'); }
}








