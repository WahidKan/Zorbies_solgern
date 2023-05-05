import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OpportunityListService } from '../opportunitylist.service';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ManageUserService } from '../../manageuser/addedituser.service';
import { AssertNotNull } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { OpportunityViewNewComponent } from '../opportunityviewNew.component';
import { DecimalPipe } from '@angular/common';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { sendToLoanHomiModel, sendToLoanHomiModelJsonData } from '../../sendtoloanhomi/sendtoloanhomi.service';


@Component({
  selector: 'app-sendtoloanhomimodelpopup',
  templateUrl: './sendtoloanhomimodelpopup.component.html'
})
export class SendtoloanhomimodelpopupComponent implements OnInit {
  @ViewChild('openSendToLoanHomiPopup', { static: false }) openPopupSendToLoanHomi: ModalDirective;
  @ViewChild('ResponsePopup', { static: false }) responsePopUp: ModalDirective;
  @ViewChild('WaringPopup', { static: false }) waringPopup: ModalDirective;
  //@Output() refreshEvent : new EventEmitter<string>();
  @Output() refreshEvent = new EventEmitter<string>();

  //@ViewChild('refreshOpportunityPage') refreshOpportunityPage: OpportunityViewNewComponent;


  sendToLoanHomiDataModel: sendToLoanHomiModel = new sendToLoanHomiModel();
  jsonData: sendToLoanHomiModelJsonData = new sendToLoanHomiModelJsonData();
  opportunityId: number;
  loadSave = false;
  dpAmtValidation: boolean = false;
  lstCoApplicant : any;
  lstowntheProperty: any;
  lstprevHousingStatus: any;
  lstownthePropertyCode: string;
  lstemployementType: any;
  lstemployementTypeCode: string;
  lstIncomeFrequency: any;
  lstIncomeFrequencyCode: string;
  //ShowPreviousEmployerDetails = false;
  ShowCo_App_PreviousEmployerDetails = false;
  countryLists: any;
  states: any;
  totalLoanAmt: number;
  loanAmt: number;
  totalGrossAmt: number;
  incomeType: number;
  otherIncomeType: number;
  totalOtherFreqIncome: number = 0;
  totalCo_App_GrossAmt: number;
  coApp_incomeType: number;
  coApp_otherIncomeType: number;
  Co_App_totalOtherFreqIncome: number = 0;
  //ShowotherIncomeFrequency = false; 
 // ShowIncomeFrequency = false;
 // show_CoApp_IncomeFrequency = false;
  //show_CoApp_otherIncomeFrequency = false;
  addSendTLoanHomiForm: FormGroup;
  sendToLoanHomiPreviewDetail: any;
  showAddSendTLoanHomiForm = true;
  showPreviewSendTLoanHomiForm = false;
  resultData: any[] = [];
  selectedOwnTheProperty: any;
  defaultOwnTheProperty: any;
  iFreqYear: any;
  iFreqYearValue: any;
  iFreqMonth: any;
  iFreqMonthValue: any;
  rDataLoanAppId: number;
  creditScoreCategory: number;
  mandatoryDocuments: any;
  rUserName: any;
  IncomeVerificationValue: number;
  TotalloanAmount: number;
  focusvalidateFields: any;
  value: any;
  dotCount: any;
  checkNumberOnly: any;
  checkString: any;
  format = '2.0-2';
  result = null;
  showValidationIconOnPR: boolean = false;
  showValidationIconOnCo_PR: boolean = false;
  showValidationIconOn_coApp_income: boolean = false;
  showValidationIconOn_income: boolean = false;
  isInvalidEmail: boolean = false;


  constructor(private fb: FormBuilder,
    private toaster: ToastrService,
    private commonService: CommonService,
    private userService: ManageUserService,
    private opprtunityservice: OpportunityListService,
    private el: ElementRef,
    private decimalPipe: DecimalPipe,
    private dialogService: ConfirmationDialogService
  ) { }

  ngOnInit() {
    //this.fillForm(id);
    this.initiForm();
    // this.isAutoPaymentcheckBox = true; 

    //this.GetOwnThePropertyDll();

    this.GetEmployementTypeDll();
    this.GetIncomeFrequencyDll();
    this.getCountryDropdownList();
    this.getState();


    this.previousEmployerName.disable();
    this.previousOccupation.disable();
    this.yearsAtPreviousEmployement.disable();
    this.monthsAtPreviousEmployement.disable();

    this.yearsAtPreviousResidence.disable();
    this.monthsatPreviousResidence.disable();
    this.PRcountry.disable();
    this.PRstate.disable();
    this.PRCity.disable();
    this.PRStreet.disable();
    this.PRPostalCode.disable(); 
    this.PHousingStatus.disable(); 

    this.coApp_yearsAtPreviousResidence.disable();
    this.coApp_monthsatPreviousResidence.disable();
    this.coApp_PRcountry.disable();
    this.coApp_PRstate.disable(); 
    this.coApp_PRCity.disable();
    this.coApp_PRStreet.disable();
    this.coApp_PRPostalCode.disable();
    this.CoPHousingStatus.disable();
    this.coApp_previousEmployerName.disable();
    this.coApp_previousOccupation.disable();
    this.coApp_yearsAtPreviousEmployement.disable();
    this.coApp_monthsAtPreviousEmployement.disable();
    this.coApp_income.disable();
    this.coApp_otherIncome.disable();
    this.income.disable();
    this.otherIncome.disable();
    //====================================================================

    this.monthsatCurrentResidence.valueChanges.subscribe(m => {
      if (m > 11) {
        this.monthsatCurrentResidence.setValue(11);
      }
    });

    this.monthsAtCurrentEmployement.valueChanges.subscribe(m => {
      if (m > 11) {
        this.monthsAtCurrentEmployement.setValue(11);
      }
    });

    this.coApp_monthsAtCurrentResidence.valueChanges.subscribe(m => {
      if (m > 11) {
        this.coApp_monthsAtCurrentResidence.setValue(11);
      }
    });

    this.monthsAtPreviousEmployement.valueChanges.subscribe(m => {
      if (m > 11) {
        this.monthsAtPreviousEmployement.setValue(11);
      }
    });

    this.coApp_monthsAtCurrentEmployement.valueChanges.subscribe(m => {
      if (m > 11) {
        this.coApp_monthsAtCurrentEmployement.setValue(11);
      }
    });

    this.coApp_monthsAtPreviousEmployement.valueChanges.subscribe(m => {
      if (m > 11) {
        this.coApp_monthsAtPreviousEmployement.setValue(11);
      }
    });

    this.monthsatPreviousResidence.valueChanges.subscribe(m => {
      if (m > 11) {
        this.monthsatPreviousResidence.setValue(11);
      } 
    });
      
    //this.coApp_monthsatPreviousResidence.valueChanges.subscribe(m => {
    //  if (m > 11) {
    //    this.coApp_monthsatPreviousResidence.setValue(11);
    //  }
    //}); 

    this.noOfMortgages.valueChanges.subscribe(m => {
      if (m > 99) {
        this.noOfMortgages.setValue(99);
      }
    });


    //==========Validation On Years at Current Residence Fields ================
    this.yearsAtCurrentResidence.valueChanges.subscribe(m => {
      ;
      if (m=="") {
        return;     
      }
      if (m == 1 || m==0) {      
            this.showValidationIconOnPR = true;
            this.yearsAtPreviousResidence.enable();
            this.monthsatPreviousResidence.enable();
            this.PRcountry.enable();
            this.PRstate.enable();
            this.PRCity.enable();
            this.PRStreet.enable();
            this.PRPostalCode.enable();
            this.PHousingStatus.enable();


            this.yearsAtPreviousResidence.setValidators([Validators.required]);
            this.yearsAtPreviousResidence.updateValueAndValidity();

            this.monthsatPreviousResidence.setValidators([Validators.required]);
            this.monthsatPreviousResidence.updateValueAndValidity();

            this.PRcountry.setValidators([Validators.required]);
            this.PRcountry.updateValueAndValidity();

            this.PRstate.setValidators([Validators.required]);
            this.PRstate.updateValueAndValidity();

            this.PRCity.setValidators([Validators.required]);
            this.PRCity.updateValueAndValidity();

            this.PRStreet.setValidators([Validators.required]);
            this.PRStreet.updateValueAndValidity();

            this.PRPostalCode.setValidators([Validators.required]);
            this.PRPostalCode.updateValueAndValidity();

        this.PHousingStatus.setValidators([Validators.required]);
        this.PHousingStatus.updateValueAndValidity();
      }
      else {
            this.showValidationIconOnPR = false;
            this.yearsAtPreviousResidence.setValue(null);
            this.monthsatPreviousResidence.setValue(null);
            this.PRcountry.setValue(null);
            this.PRstate.setValue(null);
            this.PRCity.setValue(null);
            this.PRStreet.setValue(null);
            this.PRPostalCode.setValue(null);
             this.PHousingStatus.setValue(null);

            this.yearsAtPreviousResidence.disable();
            this.monthsatPreviousResidence.disable();  
            this.PRcountry.disable();
            this.PRstate.disable();
            this.PRCity.disable();  
            this.PRStreet.disable();
            this.PRPostalCode.disable();
            this.PHousingStatus.disable();

            this.yearsAtPreviousResidence.setValidators([Validators.nullValidator]);
            this.yearsAtPreviousResidence.updateValueAndValidity();

            this.monthsatPreviousResidence.setValidators([Validators.nullValidator]);
            this.monthsatPreviousResidence.updateValueAndValidity(); 

            this.PRcountry.setValidators([Validators.nullValidator]);
            this.PRcountry.updateValueAndValidity();

            this.PRstate.setValidators([Validators.nullValidator]);
            this.PRstate.updateValueAndValidity();

            this.PRCity.setValidators([Validators.nullValidator]);
            this.PRCity.updateValueAndValidity();

            this.PRStreet.setValidators([Validators.nullValidator]);
            this.PRStreet.updateValueAndValidity();

            this.PRPostalCode.setValidators([Validators.nullValidator]);
            this.PRPostalCode.updateValueAndValidity();

            this.PHousingStatus.setValidators([Validators.nullValidator]);
            this.PHousingStatus.updateValueAndValidity();
          }
      });
    //============================================================================


    //==========Validation On CoApp Years at Current Residence Fields ================

    this.coApp_yearsAtCurrentResidence.valueChanges.subscribe(m => {
      if (m == "") {
        return;
      }
      if (m == 1 || m == 0) {
        this.showValidationIconOnCo_PR = true;
        this.coApp_yearsAtPreviousResidence.enable();
        this.coApp_monthsatPreviousResidence.enable();
        this.coApp_PRcountry.enable();
        this.coApp_PRstate.enable();
        this.coApp_PRCity.enable();
        this.coApp_PRStreet.enable();
        this.coApp_PRPostalCode.enable();   
        this.CoPHousingStatus.enable();


        this.coApp_yearsAtPreviousResidence.setValidators([Validators.required]);
        this.coApp_yearsAtPreviousResidence.updateValueAndValidity();

        this.coApp_monthsatPreviousResidence.setValidators([Validators.required]);
        this.coApp_monthsatPreviousResidence.updateValueAndValidity();

        this.coApp_PRcountry.setValidators([Validators.required]);
        this.coApp_PRcountry.updateValueAndValidity();

        this.coApp_PRstate.setValidators([Validators.required]);
        this.coApp_PRstate.updateValueAndValidity();

        this.coApp_PRCity.setValidators([Validators.required]);
        this.coApp_PRCity.updateValueAndValidity();

        this.coApp_PRStreet.setValidators([Validators.required]);
        this.coApp_PRStreet.updateValueAndValidity();

        this.coApp_PRPostalCode.setValidators([Validators.required]);
        this.coApp_PRPostalCode.updateValueAndValidity();

        this.CoPHousingStatus.setValidators([Validators.required]);
        this.CoPHousingStatus.updateValueAndValidity();
      }
      else {
        this.showValidationIconOnCo_PR = false;
        this.coApp_yearsAtPreviousResidence.setValue(null);
        this.coApp_monthsatPreviousResidence.setValue(null);
        this.coApp_PRcountry.setValue(null); 
        this.coApp_PRstate.setValue(null);
        this.coApp_PRCity.setValue(null);
        this.coApp_PRStreet.setValue(null);
        this.coApp_PRPostalCode.setValue(null);
        this.CoPHousingStatus.setValue(null);


        this.coApp_yearsAtPreviousResidence.disable();
        this.coApp_monthsatPreviousResidence.disable();
        this.coApp_PRcountry.disable();
        this.coApp_PRstate.disable(); 
        this.coApp_PRCity.disable();
        this.coApp_PRStreet.disable();
        this.coApp_PRPostalCode.disable(); 
        this.CoPHousingStatus.disable(); 


        this.coApp_yearsAtPreviousResidence.setValidators([Validators.nullValidator]);
        this.coApp_yearsAtPreviousResidence.updateValueAndValidity();

        this.coApp_monthsatPreviousResidence.setValidators([Validators.nullValidator]);
        this.coApp_monthsatPreviousResidence.updateValueAndValidity();

        this.coApp_PRcountry.setValidators([Validators.nullValidator]);
        this.coApp_PRcountry.updateValueAndValidity();

        this.coApp_PRstate.setValidators([Validators.nullValidator]);
        this.coApp_PRstate.updateValueAndValidity();

        this.coApp_PRCity.setValidators([Validators.nullValidator]);
        this.coApp_PRCity.updateValueAndValidity();

        this.coApp_PRStreet.setValidators([Validators.nullValidator]);
        this.coApp_PRStreet.updateValueAndValidity();

        this.coApp_PRPostalCode.setValidators([Validators.nullValidator]);
        this.coApp_PRPostalCode.updateValueAndValidity();

        this.CoPHousingStatus.setValidators([Validators.nullValidator]);
        this.CoPHousingStatus.updateValueAndValidity();
      }
    })
    //============================================================================

    //==========Validation On Years at Current Employement Fields ================
    this.yearsAtCurrentEmployement.valueChanges.subscribe(m => {
      if (m =="") {
        return;
      }
      if (m == 1 || m ==0) {
        this.sendToLoanHomiDataModel.IsOE = true;
        // this.ShowPreviousEmployerDetails = true;

        this.previousEmployerName.enable();
        this.previousOccupation.enable();
        this.yearsAtPreviousEmployement.enable();
        this.monthsAtPreviousEmployement.enable();
        this.yearsAtPreviousResidence.enable();
        this.monthsatPreviousResidence.enable();
        this.PRcountry.enable();
        this.PRstate.enable();
        this.PRCity.enable();
        this.PRStreet.enable();
        this.PRPostalCode.enable();
        this.PHousingStatus.enable();



        this.previousEmployerName.setValidators([Validators.required]);
        this.previousEmployerName.updateValueAndValidity();

        this.previousOccupation.setValidators([Validators.required]);
        this.previousOccupation.updateValueAndValidity();

        this.yearsAtPreviousEmployement.setValidators([Validators.required]);
        this.yearsAtPreviousEmployement.updateValueAndValidity();

        this.monthsAtPreviousEmployement.setValidators([Validators.required]);
        this.monthsAtPreviousEmployement.updateValueAndValidity();
      }
      else {
        // this.ShowPreviousEmployerDetails = false;
        this.sendToLoanHomiDataModel.IsOE = false;


        this.previousEmployerName.disable();
        this.previousOccupation.disable();
        this.yearsAtPreviousEmployement.disable();
        this.monthsAtPreviousEmployement.disable();

        this.previousEmployerName.setValue(null);
        this.previousEmployerName.setValidators([Validators.nullValidator]);
        this.previousEmployerName.updateValueAndValidity();

        this.previousOccupation.setValue(null);
        this.previousOccupation.setValidators([Validators.nullValidator]);
        this.previousOccupation.updateValueAndValidity();

        this.yearsAtPreviousEmployement.setValue(null);
        this.yearsAtPreviousEmployement.setValidators([Validators.nullValidator]);
        this.yearsAtPreviousEmployement.updateValueAndValidity();

        this.monthsAtPreviousEmployement.setValue(null);
        this.monthsAtPreviousEmployement.setValidators([Validators.nullValidator]);
        this.monthsAtPreviousEmployement.updateValueAndValidity();
      }
    })
    //============================================================================


    //============ Validation on Is co-applicant required Fields =================
    this.IsCoApplicantRequired.valueChanges.subscribe(m => {
      if (this.IsCoApplicantRequired.value == true) {
        this.coApp_firstName.setValidators([Validators.required]);
        this.coApp_firstName.updateValueAndValidity();

        this.coApp_lastName.setValidators([Validators.required]);
        this.coApp_lastName.updateValueAndValidity();

        //this.coApp_phone.setValidators([Validators.required]); 
        //this.coApp_phone.updateValueAndValidity();

        this.coApp_email.setValidators([Validators.required]);
        this.coApp_email.updateValueAndValidity();

        this.coApp_ssn.setValidators([Validators.required]);
        this.coApp_ssn.updateValueAndValidity();

        this.coApp_dateofBirth.setValidators([Validators.required, this.checkAge]);
        this.coApp_dateofBirth.updateValueAndValidity();

        this.coApp_country.setValidators([Validators.required]);
        this.coApp_country.updateValueAndValidity();

        this.coAppstate.setValidators([Validators.required]);
        this.coAppstate.updateValueAndValidity();

        this.coApp_city.setValidators([Validators.required]);
        this.coApp_city.updateValueAndValidity();

        this.coApp_street.setValidators([Validators.required]);
        this.coApp_street.updateValueAndValidity();

        this.coApp_postalCode.setValidators([Validators.required]);
        this.coApp_postalCode.updateValueAndValidity();

        this.coApp_occupation.setValidators([Validators.required]);
        this.coApp_occupation.updateValueAndValidity();

        this.coApp_yearsAtCurrentEmployement.setValidators([Validators.required]);
        this.coApp_yearsAtCurrentEmployement.updateValueAndValidity();

        this.coApp_monthsAtCurrentEmployement.setValidators([Validators.required]);
        this.coApp_monthsAtCurrentEmployement.updateValueAndValidity();

        this.coApp_employerName.setValidators([Validators.required]);
        this.coApp_employerName.updateValueAndValidity();

        this.coApp_incomeFrequency.setValidators([Validators.required]);
        this.coApp_incomeFrequency.updateValueAndValidity();

        this.coApp_income.setValidators([Validators.required]);
        this.coApp_income.updateValueAndValidity();

        //this.coApp_otherIncomeFrequency.setValidators([Validators.required]);
        //this.coApp_otherIncomeFrequency.updateValueAndValidity();

        //this.coApp_otherIncome.setValidators([Validators.required]);
        //this.coApp_otherIncome.updateValueAndValidity();

        this.coApp_employementTypeID.setValidators([Validators.required]);
        this.coApp_employementTypeID.updateValueAndValidity();

        this.coApp_previousEmployerName.setValidators([Validators.required]);
        this.coApp_previousEmployerName.updateValueAndValidity();

        this.coApp_previousOccupation.setValidators([Validators.required]);
        this.coApp_previousOccupation.updateValueAndValidity();

        this.coApp_yearsAtCurrentResidence.setValidators([Validators.required]);
        this.coApp_yearsAtCurrentResidence.updateValueAndValidity();

        this.coApp_monthsAtCurrentResidence.setValidators([Validators.required]);
        this.coApp_monthsAtCurrentResidence.updateValueAndValidity();

        this.coApp_yearsAtPreviousEmployement.setValidators([Validators.required]);
        this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();

        this.coApp_monthsAtPreviousEmployement.setValidators([Validators.required]);
        this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();

        this.coApp_ssn.setValidators([Validators.required]);
        this.coApp_ssn.updateValueAndValidity();

        this.coApp_yearsAtPreviousResidence.setValidators([Validators.required]);
        this.coApp_yearsAtPreviousResidence.updateValueAndValidity();

        this.coApp_monthsatPreviousResidence.setValidators([Validators.required]);
        this.coApp_monthsatPreviousResidence.updateValueAndValidity();

        this.coApp_PRcountry.setValidators([Validators.required]);
        this.coApp_PRcountry.updateValueAndValidity();

        this.coApp_PRstate.setValidators([Validators.required]);
        this.coApp_PRstate.updateValueAndValidity();

        this.coApp_PRCity.setValidators([Validators.required]);
        this.coApp_PRCity.updateValueAndValidity();

        this.coApp_PRStreet.setValidators([Validators.required]);
        this.coApp_PRStreet.updateValueAndValidity();

        this.coApp_PRPostalCode.setValidators([Validators.required]);
        this.coApp_PRPostalCode.updateValueAndValidity();

        this.CoPHousingStatus.setValidators([Validators.required]);
        this.CoPHousingStatus.updateValueAndValidity();

      }
      else {
        this.sameAsapplicant.setValue(false);

        this.coApp_firstName.setValue(null);
        this.coApp_firstName.setValidators([Validators.nullValidator]);
        this.coApp_firstName.updateValueAndValidity();

        this.coApp_lastName.setValue(null);
        this.coApp_lastName.setValidators([Validators.nullValidator]);
        this.coApp_lastName.updateValueAndValidity();

        //this.coApp_phone.setValue(null);
        //this.coApp_phone.setValidators([Validators.nullValidator]);
        //this.coApp_phone.updateValueAndValidity();

        this.coApp_email.setValue(null);
        this.coApp_email.setValidators([Validators.nullValidator]);
        this.coApp_email.updateValueAndValidity();

        this.coApp_ssn.setValue(null);
        this.coApp_ssn.setValidators([Validators.nullValidator]);
        this.coApp_ssn.updateValueAndValidity();

        this.coApp_dateofBirth.setValue(null);
        this.coApp_dateofBirth.setValidators([Validators.nullValidator]);
        this.coApp_dateofBirth.updateValueAndValidity();

        this.coApp_country.setValue(null);
        this.coApp_country.setValidators([Validators.nullValidator]);
        this.coApp_country.updateValueAndValidity();

        this.coAppstate.setValue(null);
        this.coAppstate.setValidators([Validators.nullValidator]);
        this.coAppstate.updateValueAndValidity();

        this.coApp_city.setValue(null);
        this.coApp_city.setValidators([Validators.nullValidator]);
        this.coApp_city.updateValueAndValidity();

        this.coApp_street.setValue(null);
        this.coApp_street.setValidators([Validators.nullValidator]);
        this.coApp_street.updateValueAndValidity();

        this.coApp_occupation.setValue(null);
        this.coApp_occupation.setValidators([Validators.nullValidator]);
        this.coApp_occupation.updateValueAndValidity();


        this.coApp_yearsAtCurrentEmployement.setValue(null);
        this.coApp_yearsAtCurrentEmployement.setValidators([Validators.nullValidator]);
        this.coApp_yearsAtCurrentEmployement.updateValueAndValidity();

        this.coApp_monthsAtCurrentEmployement.setValue(null);
        this.coApp_monthsAtCurrentEmployement.setValidators([Validators.nullValidator]);
        this.coApp_monthsAtCurrentEmployement.updateValueAndValidity();

        this.coApp_employerName.setValue(null);
        this.coApp_employerName.setValidators([Validators.nullValidator]);
        this.coApp_employerName.updateValueAndValidity();

        this.coApp_incomeFrequency.setValue(null);
        this.coApp_incomeFrequency.setValidators([Validators.nullValidator]);
        this.coApp_incomeFrequency.updateValueAndValidity();

        this.coApp_income.setValue(null);
        this.coApp_income.setValidators([Validators.nullValidator]);
        this.coApp_income.updateValueAndValidity();

        //this.coApp_otherIncomeFrequency.setValue(null);
        //this.coApp_otherIncomeFrequency.setValidators([Validators.nullValidator]);
        //this.coApp_otherIncomeFrequency.updateValueAndValidity();

        //this.coApp_otherIncome.setValue(null);
        //this.coApp_otherIncome.setValidators([Validators.nullValidator]);
        //this.coApp_otherIncome.updateValueAndValidity();

        this.coApp_employementTypeID.setValue(null);
        this.coApp_employementTypeID.setValidators([Validators.nullValidator]);
        this.coApp_employementTypeID.updateValueAndValidity();

        this.coApp_previousEmployerName.setValue(null);
        this.coApp_previousEmployerName.setValidators([Validators.nullValidator]);
        this.coApp_previousEmployerName.updateValueAndValidity();

        this.coApp_previousOccupation.setValue(null);
        this.coApp_previousOccupation.setValidators([Validators.nullValidator]);
        this.coApp_previousOccupation.updateValueAndValidity();


        this.coApp_yearsAtCurrentResidence.setValue(null);
        this.coApp_yearsAtCurrentResidence.setValidators([Validators.nullValidator]);
        this.coApp_yearsAtCurrentResidence.updateValueAndValidity();

        this.coApp_monthsAtCurrentResidence.setValue(null);
        this.coApp_monthsAtCurrentResidence.setValidators([Validators.nullValidator]);
        this.coApp_monthsAtCurrentResidence.updateValueAndValidity();


        this.coApp_yearsAtPreviousEmployement.setValue(null);
        this.coApp_yearsAtPreviousEmployement.setValidators([Validators.nullValidator]);
        this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();


        this.coApp_monthsAtPreviousEmployement.setValue(null);
        this.coApp_monthsAtPreviousEmployement.setValidators([Validators.nullValidator]);
        this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();

        this.coApp_phone.setValue(null);
        this.coApp_mobile.setValue(null);

        this.coApp_postalCode.setValue(null);
        this.coApp_postalCode.setValidators([Validators.nullValidator]);
        this.coApp_postalCode.updateValueAndValidity();

        this.coApp_otherIncomeFrequency.setValue(null);
        this.coApp_otherIncome.setValue(null);
        this.coApp_otherIncomeSource.setValue(null);
        this.coApp_grossIncome.setValue(null);

        this.coApp_yearsAtPreviousResidence.setValue(null);
        this.coApp_yearsAtPreviousResidence.setValidators([Validators.nullValidator]);
        this.coApp_yearsAtPreviousResidence.updateValueAndValidity();

        this.coApp_monthsatPreviousResidence.setValue(null);
        this.coApp_monthsatPreviousResidence.setValidators([Validators.nullValidator]);
        this.coApp_monthsatPreviousResidence.updateValueAndValidity();

        this.coApp_PRcountry.setValue(null);
        this.coApp_PRcountry.setValidators([Validators.nullValidator]);
        this.coApp_PRcountry.updateValueAndValidity();

        this.coApp_PRstate.setValue(null);  
        this.coApp_PRstate.setValidators([Validators.nullValidator]);
        this.coApp_PRstate.updateValueAndValidity();

        this.coApp_PRCity.setValue(null);
        this.coApp_PRCity.setValidators([Validators.nullValidator]);
        this.coApp_PRCity.updateValueAndValidity(); 

        this.coApp_PRStreet.setValue(null);
        this.coApp_PRStreet.setValidators([Validators.nullValidator]);
        this.coApp_PRStreet.updateValueAndValidity();

        this.coApp_PRPostalCode.setValue(null);
        this.coApp_PRPostalCode.setValidators([Validators.nullValidator]);
        this.coApp_PRPostalCode.updateValueAndValidity();

        this.coApp_postalCode.setValue(null);
        this.coApp_postalCode.setValidators([Validators.nullValidator]);
        this.coApp_postalCode.updateValueAndValidity();

        this.CoPHousingStatus.setValue(null);
        this.CoPHousingStatus.setValidators([Validators.nullValidator]);
        this.CoPHousingStatus.updateValueAndValidity();
      }
    })

    //============================================================================

    //============== Validate On coApp_yearsAtCurrentEmployement Field ==========

    this.coApp_yearsAtCurrentEmployement.valueChanges.subscribe(m => {
      if (m == "") {
        return;    
      }
      if (m == 1 || m == 0) {
        //this.ShowCo_App_PreviousEmployerDetails = true;
        this.sendToLoanHomiDataModel.coIsOE = true;

        this.coApp_previousEmployerName.enable();
        this.coApp_previousOccupation.enable();
        this.coApp_yearsAtPreviousEmployement.enable();
        this.coApp_monthsAtPreviousEmployement.enable();

        this.coApp_previousEmployerName.setValidators([Validators.required]);
        this.coApp_previousEmployerName.updateValueAndValidity();

        this.coApp_previousOccupation.setValidators([Validators.required]);
        this.coApp_previousOccupation.updateValueAndValidity();

        this.coApp_yearsAtPreviousEmployement.setValidators([Validators.required]);
        this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();

        this.coApp_monthsAtPreviousEmployement.setValidators([Validators.required]);
        this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
      }
      else {
        // this.ShowCo_App_PreviousEmployerDetails = false;

        this.coApp_previousEmployerName.disable();
        this.coApp_previousOccupation.disable();
        this.coApp_yearsAtPreviousEmployement.disable();
        this.coApp_monthsAtPreviousEmployement.disable();

        this.sendToLoanHomiDataModel.coIsOE = false;
        this.coApp_previousEmployerName.setValue(null);
        this.coApp_previousEmployerName.setValidators([Validators.nullValidator]);
        this.coApp_previousEmployerName.updateValueAndValidity();

        this.coApp_previousOccupation.setValue(null);
        this.coApp_previousOccupation.setValidators([Validators.nullValidator]);
        this.coApp_previousOccupation.updateValueAndValidity();

        this.coApp_yearsAtPreviousEmployement.setValue(null);
        this.coApp_yearsAtPreviousEmployement.setValidators([Validators.nullValidator]);
        this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();

        this.coApp_monthsAtPreviousEmployement.setValue(null);
        this.coApp_monthsAtPreviousEmployement.setValidators([Validators.nullValidator]);
        this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
      }
    })

    //============================================================================

    this.sameAsapplicant.valueChanges.subscribe(m => {
      if (m == true) {
        this.coApp_country.setValue(this.country.value);
        this.coAppstate.setValue(this.state.value);
        this.coApp_city.setValue(this.city.value);
        this.coApp_street.setValue(this.street.value);
        this.coApp_postalCode.setValue(this.postalCode.value);
      }
      else {
        this.coApp_country.setValue(null);
        this.coAppstate.setValue(null);
        this.coApp_city.setValue(null);
        this.coApp_street.setValue(null);
        this.coApp_postalCode.setValue(null);
      }
    })

    this.downpaymentAmount.valueChanges.subscribe(m => {
      let value: number;
      this.dpAmtValidation = false;
      value = m;
      if (m > this.totalSystemCost.value) {
        this.downpaymentAmount.setValue(null);
        this.dpAmtValidation = true;
        return;
      } 
      if (value >= this.TotalloanAmount) {
        this.dpAmtValidation = true;
        this.loanAmount.setValue(this.totalSystemCost.value);
        this.downpaymentAmount.setValue(null);
      }
      else {

        this.totalLoanAmt = this.totalSystemCost.value - value
        this.result = this.decimalPipe.transform(this.totalLoanAmt, this.format);
        let re = /\,/gi;
        this.result = this.result.replace(re, "");
        this.loanAmount.setValue(this.result);
      }

    })

    //---------validation for not enter Negative Value into Income field----

    //----------------------------------------------------------------------


    //----Calculating Applicant Gross Amt------------- 

    this.lstIncomeFrequencyID.valueChanges.subscribe(m => {

      this.totalGrossAmt = 0;
      if (m == this.iFreqMonthValue) {
       // this.ShowIncomeFrequency = true;
        this.showValidationIconOn_income = true;
        this.income.enable();
        this.incomeType = m;
        this.totalGrossAmt = this.income.value * 12;
        this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
      }
      else
        if (m == this.iFreqYearValue) {
          //this.ShowIncomeFrequency = true;
          this.showValidationIconOn_income = true;
          this.income.enable();
          this.incomeType = m;
          this.totalGrossAmt = this.income.value;
          this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
        }
      if (m != this.iFreqMonthValue && m != this.iFreqYearValue) {
        this.incomeType = null;
        this.totalGrossAmt = 0;


        this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
        this.income.setValue(null);
        //this.ShowIncomeFrequency = false;
        this.income.disable();
        this.showValidationIconOn_income = false;
      }
    });

    this.income.valueChanges.subscribe(m => {



      if (m < 0) {
        event.preventDefault();
        this.income.setValue(0);
        return;
      }

      // 1146 --Monthly Id
      if (this.incomeType == this.iFreqMonthValue) {
        this.totalGrossAmt = m * 12;
        this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
      }
      else
        if (this.incomeType == this.iFreqYearValue) {
          this.totalGrossAmt = m;
          this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
        }
      if (m == null) {
        this.totalGrossAmt = 0;
      }
    });

    this.otherIncomeFrequencyID.valueChanges.subscribe(m => {

      this.totalOtherFreqIncome = 0;
      if (m == this.iFreqMonthValue) {
       // this.ShowotherIncomeFrequency = true;
        this.otherIncome.enable();
        this.otherIncomeType = m;
        this.totalOtherFreqIncome = this.otherIncome.value * 12;
        this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
      }
      else
        if (m == this.iFreqYearValue) {
          //this.ShowotherIncomeFrequency = true;
          this.otherIncome.enable();
          this.otherIncomeType = m;
          this.totalOtherFreqIncome = this.otherIncome.value;
          this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
        }
      if (m != this.iFreqMonthValue && m != this.iFreqYearValue) {

        //this.ShowotherIncomeFrequency = false;
        this.otherIncome.disable();
        this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
        this.otherIncome.setValue(null);
      }
    });

    this.otherIncome.valueChanges.subscribe(m => {
      if (m < 0) {
        event.preventDefault();
        this.otherIncome.setValue(0);
        return;
      }
      this.totalOtherFreqIncome = 0;
      // 1146 --Monthly Id
      if (this.otherIncomeType == this.iFreqMonthValue) {
        this.totalOtherFreqIncome = m * 12;
        this.grossIncome.setValue(this.totalGrossAmt + this.totalOtherFreqIncome);
      }
      else
        if (this.otherIncomeType == this.iFreqYearValue) {
          this.totalOtherFreqIncome = m
          this.grossIncome.setValue(this.totalGrossAmt + m);
        }
    })

    //----------------------------------------

    //----Calculating Co-Applicant Gross Amt-------------

    this.coApp_incomeFrequency.valueChanges.subscribe(m => {
      if (m == this.iFreqMonthValue) {
       // this.show_CoApp_IncomeFrequency = true;
        this.coApp_income.enable();
        this.showValidationIconOn_coApp_income = true;

        this.coApp_incomeType = m;
        this.totalCo_App_GrossAmt = this.coApp_income.value * 12;
        this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
      }
      else
        if (m == this.iFreqYearValue) {
          //this.show_CoApp_IncomeFrequency = true;
          this.coApp_income.enable();
          this.showValidationIconOn_coApp_income = true;

          this.coApp_incomeType = m;
          this.totalCo_App_GrossAmt = this.coApp_income.value;
          this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
        }
      if (m != this.iFreqMonthValue && m != this.iFreqYearValue) {
        this.coApp_otherIncomeType = null;
        this.totalCo_App_GrossAmt = 0;


        this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
        this.coApp_income.setValue(0);
       // this.show_CoApp_IncomeFrequency = false;
        this.coApp_income.disable();
        this.showValidationIconOn_coApp_income = false; 
      }
    });

    this.coApp_income.valueChanges.subscribe(m => {
      if (m < 0) {
        event.preventDefault();
        this.coApp_income.setValue(null);
        return;
      }
      // 1146 --Monthly Id
      if (this.coApp_incomeType == this.iFreqMonthValue) {
        this.totalCo_App_GrossAmt = m * 12;
        this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
      }
      else
        if (this.coApp_incomeType == this.iFreqYearValue) {
          this.totalCo_App_GrossAmt = m;
          var data = m + this.Co_App_totalOtherFreqIncome;
          this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);

          if (m == null) {
            this.totalCo_App_GrossAmt = 0;
          }
        }
    });

    this.coApp_otherIncomeFrequency.valueChanges.subscribe(m => {
      this.Co_App_totalOtherFreqIncome = 0;
      if (m == this.iFreqMonthValue) {
       // this.show_CoApp_otherIncomeFrequency = true;
        this.coApp_otherIncome.enable();
        this.coApp_otherIncomeType = m;
        this.Co_App_totalOtherFreqIncome = this.coApp_otherIncome.value * 12;
        this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
      }
      else if (m == this.iFreqYearValue) {
        //this.show_CoApp_otherIncomeFrequency = true;
        this.coApp_otherIncome.enable();
        this.coApp_otherIncomeType = m;
        this.Co_App_totalOtherFreqIncome = this.coApp_otherIncome.value;
        this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
      }
      if (m != this.iFreqMonthValue && m != this.iFreqYearValue) {

        //this.show_CoApp_otherIncomeFrequency = false;
        this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
        this.coApp_otherIncome.setValue(null);
        this.coApp_otherIncome.disable();
      }
    });


    this.coApp_otherIncome.valueChanges.subscribe(m => {
      if (m < 0) {
        event.preventDefault();
        this.coApp_otherIncome.setValue(0);
        return;
      }
      // 1440 --Monthly Id
      this.Co_App_totalOtherFreqIncome = 0;
      if (this.coApp_otherIncomeType == this.iFreqMonthValue) {
        this.Co_App_totalOtherFreqIncome = m * 12;
        this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
      }
      else {
        if (this.coApp_otherIncomeType == this.iFreqYearValue) {
          this.Co_App_totalOtherFreqIncome = m
          this.coApp_grossIncome.setValue(this.totalCo_App_GrossAmt + this.Co_App_totalOtherFreqIncome);
        }
      }
    })

    //----------------------------------------
    //=====================================================================
  }

  show12(OpptId: any) {

    this.fillForm(OpptId);
    // this.openPopupSendToLoanHomi.show();
    this.showAddSendTLoanHomiForm = true;
    this.showPreviewSendTLoanHomiForm = false;
  }



  closePopup() {

    //this.refreshEvent.emit('Yes');
    this.openPopupSendToLoanHomi.hide();
    //setTimeout(() => {   
    //      window.location.reload();
    //    }, 1000);

  }
  initiForm() {
    this.addSendTLoanHomiForm = this.fb.group({
      loanProduct: [null, Validators.nullValidator],
      term: [null, Validators.nullValidator],
      country: [null, Validators.nullValidator],
      state: [null, Validators.nullValidator],
      city: [null, Validators.nullValidator],
      street: [null, Validators.nullValidator],
      postalCode: [null, Validators.nullValidator],
      // systemSizeKW: [null, Validators.nullValidator],
      totalSystemCost: [null, Validators.nullValidator],
      downpaymentAmount: [null, Validators.nullValidator],
      loanAmount: [null, Validators.nullValidator],
      ownthePropertyID: [null, Validators.nullValidator],
      CoPHousingStatus: [null, Validators.nullValidator],
      noOfMortgages: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      //phone: ['', Validators.required],
      phone: ['', Validators.maxLength(14)],
      mobile: ['', Validators.maxLength(14)],
      // email: [null, [Validators.nullValidator, Validators.email]],    
     // email: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required,
      ])],
      //ssn: [null, Validators.required],
      ssn: ['', [Validators.required, Validators.maxLength(11)]],
      // dateofBirth: [Validators.required, Validators.required],
      dateofBirth: [null, [Validators.required, this.checkAge]],
      yearsAtCurrentResidence: [null, Validators.required],
      // yearsAtCurrentResidence: ['', [Validators.required, Validators.pattern("[0 - 9] + (\.[0 - 9][0 - 9] ?) ?")]],
      monthsatCurrentResidence: [null, Validators.required],
      yearsAtPreviousResidence: [null, Validators.nullValidator],
      monthsatPreviousResidence: [null, Validators.nullValidator],   
      PRcountry: [null, Validators.nullValidator],
      PRstate: [null, Validators.nullValidator],
      PRCity: [null, Validators.nullValidator], 
      PRStreet: [null, Validators.nullValidator],
      PRPostalCode: [null, Validators.nullValidator],
      PHousingStatus: [null, Validators.nullValidator], 
      employementTypeID: [null, Validators.required],
      employerName: [null, Validators.required],
      yearsAtCurrentEmployement: [null, Validators.required],
      monthsAtCurrentEmployement: [null, Validators.required],
      lstIncomeFrequencyID: [null, Validators.required],
      lstCoApplicantId: [null],
      income: [null, Validators.required],
      otherIncomeFrequencyID: [null, Validators.nullValidator],
      otherIncome: [null, Validators.nullValidator],
      otherIncomeSource: [null, Validators.nullValidator],
      grossIncome: [null, Validators.nullValidator],
      occupation: [null, Validators.required],
      coApp_firstName: [null, Validators.nullValidator],
      coApp_lastName: [null, Validators.nullValidator],
      coApp_phone: [null, Validators.nullValidator],
      coApp_mobile: [null, Validators.nullValidator],
      // coApp_phone: ['', [Validators.required, Validators.maxLength(14)]],
      coApp_email: [null, Validators.nullValidator],
      coApp_ssn: [null, Validators.nullValidator],
      // coApp_ssn: ['', [Validators.required, Validators.maxLength(15)]],
      coApp_dateofBirth: [null, Validators.nullValidator],
      coApp_country: [null, Validators.nullValidator],
      coAppstate: [null, Validators.nullValidator],
      coApp_city: [null, Validators.nullValidator],
      coApp_street: [null, Validators.nullValidator],
      coApp_postalCode: [null, Validators.nullValidator],
      coApp_occupation: [null, Validators.nullValidator],
      coApp_yearsAtCurrentEmployement: [null, Validators.nullValidator],
      coApp_monthsAtCurrentEmployement: [null, Validators.nullValidator],
      employementType: [null, Validators.nullValidator],
      coApp_employerName: [null, Validators.nullValidator],
      coApp_incomeFrequency: [null, Validators.nullValidator],
      coApp_income: [null, Validators.nullValidator],
      coApp_otherIncomeFrequency: [null, Validators.nullValidator],
      coApp_otherIncome: [null, Validators.nullValidator],
      coApp_otherIncomeSource: [null, Validators.nullValidator],
      coApp_grossIncome: [null, Validators.nullValidator],
      isAutoPaymentcheckBox: [null, Validators.nullValidator],
      isTermCheckBox: [null, Validators.required],
      isBorrowers: [null, Validators.required],
      coApp_employementTypeID: [null, Validators.nullValidator],
      previousEmployerName: [null, Validators.nullValidator],
      previousOccupation: [null, Validators.nullValidator],
      yearsAtPreviousEmployement: [null, Validators.nullValidator],
      monthsAtPreviousEmployement: [null, Validators.nullValidator],
      coApp_previousEmployerName: [null, Validators.nullValidator],
      coApp_previousOccupation: [null, Validators.nullValidator],
      coApp_yearsAtCurrentResidence: [null, Validators.nullValidator],
      coApp_monthsAtCurrentResidence: [null, Validators.nullValidator],
      coApp_yearsAtPreviousResidence: [null, Validators.nullValidator],
      coApp_monthsatPreviousResidence: [null, Validators.nullValidator],
      coApp_PRcountry: [null, Validators.nullValidator],
      coApp_PRstate: [null, Validators.nullValidator],
      coApp_PRCity: [null, Validators.nullValidator],
      coApp_PRStreet: [null, Validators.nullValidator],
      coApp_PRPostalCode: [null, Validators.nullValidator], 


      coApp_yearsAtPreviousEmployement: [null, Validators.nullValidator],
      coApp_monthsAtPreviousEmployement: [null, Validators.nullValidator],
      IsCoApplicantRequired: [false],
      //isAutoPaymentcheckBox: [true],
      sameAsapplicant: [false],
      //IsOE:[false]
    });
  }



  get IsCoApplicantRequired() { return this.addSendTLoanHomiForm.get('IsCoApplicantRequired'); }
  get monthsAtCurrentEmployement() { return this.addSendTLoanHomiForm.get('monthsAtCurrentEmployement'); }
  get coApp_monthsAtCurrentEmployement() { return this.addSendTLoanHomiForm.get('coApp_monthsAtCurrentEmployement'); }
  get yearsAtCurrentEmployement() { return this.addSendTLoanHomiForm.get('yearsAtCurrentEmployement'); }
  get sameAsapplicant() { return this.addSendTLoanHomiForm.get('sameAsapplicant'); }
  get coApp_country() { return this.addSendTLoanHomiForm.get('coApp_country'); }
  get state() { return this.addSendTLoanHomiForm.get('state'); }
  get country() { return this.addSendTLoanHomiForm.get('country'); }
  get coAppstate() { return this.addSendTLoanHomiForm.get('coAppstate'); }
  get city() { return this.addSendTLoanHomiForm.get('city'); }
  get coApp_city() { return this.addSendTLoanHomiForm.get('coApp_city'); }
  get street() { return this.addSendTLoanHomiForm.get('street'); }
  get coApp_street() { return this.addSendTLoanHomiForm.get('coApp_street'); }
  get postalCode() { return this.addSendTLoanHomiForm.get('postalCode'); }
  get coApp_postalCode() { return this.addSendTLoanHomiForm.get('coApp_postalCode'); }
  get downpaymentAmount() { return this.addSendTLoanHomiForm.get('downpaymentAmount'); }
  get loanAmount() { return this.addSendTLoanHomiForm.get('loanAmount'); }
  get totalSystemCost() { return this.addSendTLoanHomiForm.get('totalSystemCost'); }
  get lstIncomeFrequencyID() { return this.addSendTLoanHomiForm.get('lstIncomeFrequencyID'); }
  get lstCoApplicantId() { return this.addSendTLoanHomiForm.get('lstCoApplicantId'); }
  get income() { return this.addSendTLoanHomiForm.get('income'); }
  get grossIncome() { return this.addSendTLoanHomiForm.get('grossIncome'); }
  get otherIncomeFrequencyID() { return this.addSendTLoanHomiForm.get('otherIncomeFrequencyID'); }
  get otherIncome() { return this.addSendTLoanHomiForm.get('otherIncome'); }
  get coApp_incomeFrequency() { return this.addSendTLoanHomiForm.get('coApp_incomeFrequency'); }
  get coApp_income() { return this.addSendTLoanHomiForm.get('coApp_income'); }
  get coApp_otherIncome() { return this.addSendTLoanHomiForm.get('coApp_otherIncome'); }
  get coApp_grossIncome() { return this.addSendTLoanHomiForm.get('coApp_grossIncome'); }
  get coApp_otherIncomeFrequency() { return this.addSendTLoanHomiForm.get('coApp_otherIncomeFrequency'); }
  get coApp_employementTypeID() { return this.addSendTLoanHomiForm.get('coApp_employementTypeID'); }
  get noOfMortgages() { return this.addSendTLoanHomiForm.get('noOfMortgages'); }
  get firstName() { return this.addSendTLoanHomiForm.get('firstName'); }
  get lastName() { return this.addSendTLoanHomiForm.get('lastName'); }
  get coApp_firstName() { return this.addSendTLoanHomiForm.get('coApp_firstName'); }
  get coApp_lastName() { return this.addSendTLoanHomiForm.get('coApp_lastName'); }
  get phone() { return this.addSendTLoanHomiForm.get('phone'); }
  get mobile() { return this.addSendTLoanHomiForm.get('mobile'); }
  get coApp_phone() { return this.addSendTLoanHomiForm.get('coApp_phone'); }
  get coApp_mobile() { return this.addSendTLoanHomiForm.get('coApp_mobile'); }
  get isTermCheckBox() { return this.addSendTLoanHomiForm.get('isTermCheckBox'); }
  get isAutoPaymentcheckBox() { return this.addSendTLoanHomiForm.get('isAutoPaymentcheckBox'); }
  get isBorrowers() { return this.addSendTLoanHomiForm.get('isBorrowers'); }
  get previousEmployerName() { return this.addSendTLoanHomiForm.get('previousEmployerName'); }
  get previousOccupation() { return this.addSendTLoanHomiForm.get('previousOccupation'); }
  get yearsAtPreviousEmployement() { return this.addSendTLoanHomiForm.get('yearsAtPreviousEmployement'); }
  get monthsAtPreviousEmployement() { return this.addSendTLoanHomiForm.get('monthsAtPreviousEmployement'); }
  get email() { return this.addSendTLoanHomiForm.get('email'); }
  get ssn() { return this.addSendTLoanHomiForm.get('ssn'); }
  get dateofBirth() { return this.addSendTLoanHomiForm.get('dateofBirth'); }
  get yearsAtCurrentResidence() { return this.addSendTLoanHomiForm.get('yearsAtCurrentResidence'); }
  get monthsatCurrentResidence() { return this.addSendTLoanHomiForm.get('monthsatCurrentResidence'); }
  get yearsAtPreviousResidence() { return this.addSendTLoanHomiForm.get('yearsAtPreviousResidence'); }
  get monthsatPreviousResidence() { return this.addSendTLoanHomiForm.get('monthsatPreviousResidence'); }  
  get PRcountry() { return this.addSendTLoanHomiForm.get('PRcountry'); }
  get PRstate() { return this.addSendTLoanHomiForm.get('PRstate'); } 
  get PRCity() { return this.addSendTLoanHomiForm.get('PRCity'); }
  get PRStreet() { return this.addSendTLoanHomiForm.get('PRStreet'); }
  get PRPostalCode() { return this.addSendTLoanHomiForm.get('PRPostalCode'); }
  get PHousingStatus() { return this.addSendTLoanHomiForm.get('PHousingStatus'); } 
  get employementTypeID() { return this.addSendTLoanHomiForm.get('employementTypeID'); }
  get employerName() { return this.addSendTLoanHomiForm.get('employerName'); }
  get occupation() { return this.addSendTLoanHomiForm.get('occupation'); }
  get coApp_email() { return this.addSendTLoanHomiForm.get('coApp_email'); }
  get coApp_ssn() { return this.addSendTLoanHomiForm.get('coApp_ssn'); }
  get coApp_dateofBirth() { return this.addSendTLoanHomiForm.get('coApp_dateofBirth'); } 

  get coApp_yearsAtCurrentEmployement() { return this.addSendTLoanHomiForm.get('coApp_yearsAtCurrentEmployement'); }
  get coApp_previousEmployerName() { return this.addSendTLoanHomiForm.get('coApp_previousEmployerName'); }
  get coApp_previousOccupation() { return this.addSendTLoanHomiForm.get('coApp_previousOccupation'); }
  get coApp_yearsAtCurrentResidence() { return this.addSendTLoanHomiForm.get('coApp_yearsAtCurrentResidence'); }
  get coApp_monthsAtCurrentResidence() { return this.addSendTLoanHomiForm.get('coApp_monthsAtCurrentResidence'); }
  get coApp_yearsAtPreviousResidence() { return this.addSendTLoanHomiForm.get('coApp_yearsAtPreviousResidence'); }
  get coApp_monthsatPreviousResidence() { return this.addSendTLoanHomiForm.get('coApp_monthsatPreviousResidence'); }
  get coApp_PRcountry() { return this.addSendTLoanHomiForm.get('coApp_PRcountry'); }
  get coApp_PRstate() { return this.addSendTLoanHomiForm.get('coApp_PRstate'); }
  get coApp_PRCity() { return this.addSendTLoanHomiForm.get('coApp_PRCity'); }   
  get coApp_PRStreet() { return this.addSendTLoanHomiForm.get('coApp_PRStreet'); }
  get coApp_PRPostalCode() { return this.addSendTLoanHomiForm.get('coApp_PRPostalCode'); }

  get coApp_employerName() { return this.addSendTLoanHomiForm.get('coApp_employerName'); }
  get coApp_occupation() { return this.addSendTLoanHomiForm.get('coApp_occupation'); }
  get coApp_yearsAtPreviousEmployement() { return this.addSendTLoanHomiForm.get('coApp_yearsAtPreviousEmployement'); }
  get coApp_monthsAtPreviousEmployement() { return this.addSendTLoanHomiForm.get('coApp_monthsAtPreviousEmployement'); }
  get coApp_otherIncomeSource() { return this.addSendTLoanHomiForm.get('coApp_otherIncomeSource'); }
  get CoPHousingStatus() { return this.addSendTLoanHomiForm.get('CoPHousingStatus'); }
  //get IsOE() { return this.addSendTLoanHomiForm.get('IsOE'); } 



  fillForm(OpptId) {
    this.addSendTLoanHomiForm.reset();
    this.addSendTLoanHomiForm.patchValue(
      {
        isAutoPaymentcheckBox: true
      })
    this.GetOwnThePropertyDll();
    this.GetPrevHousingStatus();
    this.opportunityId = OpptId;
    /// this.addOrUpdatePermission = this.isUpdate;
    this.opprtunityservice.getSendToLoanHomiDetail(OpptId).subscribe((result: any) => {
      if (result) {
        debugger
        this.resultData = result.data;

        if (this.resultData[0].error == "-1") {
          this.loadSave = true;
          this.openPopupSendToLoanHomi.hide();
          this.loadSave = false;
          this.toaster.error("No Primary Proposal available for this opportunity");

          return false;
        }


        if (this.resultData[0].error == "-3") {
          this.loadSave = false;
          this.toaster.error("Loan Product is not associated with the Primary Proposal.");
          this.openPopupSendToLoanHomi.hide();
          return false;
        }

        if (this.resultData[0].error == "-9") {
          this.loadSave = false;
          this.toaster.error("Primary Contract is needed before submitting the loan application.");
          this.openPopupSendToLoanHomi.hide();
          return false;
        }

        if (this.resultData[0].error == "-2") {
          this.loadSave = false;
          this.toaster.error("The selected loan product is not a valid loanhomi loan..");
          this.openPopupSendToLoanHomi.hide();
          return false;
        }

        if (this.resultData[0].error == "-5") {
          this.loadSave = false;
          this.toaster.error("Loan application has already been added to the opportunity.");
          this.openPopupSendToLoanHomi.hide();
          return false;
        }

        if (this.resultData[0].error == "-6") {
          this.loadSave = false;
          this.toaster.error("Contract is not assoicated with this opportunity.");
          this.openPopupSendToLoanHomi.hide();
          return false;
        }

        if (this.resultData[0].error == "-7") {
          this.loadSave = false;
          this.toaster.error("Loan Product is not mapped.");
          this.openPopupSendToLoanHomi.hide();
          return false;
        }

        this.loadSave = false;
        // this.responsePopUp.show();
        this.openPopupSendToLoanHomi.show();
        const d = new Date(result.data[0].Birthdate);
        const CoappBirthdate = new Date(result.data[0].CoappBirthdate);



        if (result.data[0].Loan_Amount__c != null) {
          this.loanAmt = result.data[0].Total_System_Cost__c - result.data[0].Downpayment_Amount__c;
          this.TotalloanAmount = result.data[0].Total_System_Cost__c;
        }
        else {
          this.loanAmt = result.data[0].Loan_Amount__c;
          this.TotalloanAmount = result.data[0].Total_System_Cost__c;
        }
        this.addSendTLoanHomiForm.patchValue({
          loanProduct: result.data[0].Loan_Product,
          term: result.data[0].Term,
          // term: result.term,
          country: result.data[0].BillingCountry == null ? null : parseInt(result.data[0].BillingCountry),
          state: result.data[0].BillingState == null ? null : parseInt(result.data[0].BillingState),
          city: result.data[0].BillingCity,
          street: result.data[0].BillingStreet,
          postalCode: result.data[0].BillingPostalCode,
          // systemSizeKW: result.data[0].System_Size_kW__c,
          totalSystemCost: result.data[0].Total_System_Cost__c,
          downpaymentAmount: result.data[0].Downpayment_Amount__c,
          loanAmount: this.loanAmt,

          firstName: result.data[0].FirstName,
          lastName: result.data[0].LastName,
          phone: result.data[0].Phone,
          mobile: result.data[0].MobilePhone,
          email: result.data[0].Email,
          coApp_firstName: result.data[0].Coappfirstname,
          coApp_lastName: result.data[0].Coapplastname,
          coApp_phone: result.data[0].CoappPhone,
          coApp_mobile: result.data[0].CoappMobilePhone,
          coApp_email: result.data[0].CoappEmail,
          //coApp_dateofBirth: CoappBirthdate
          //coApp_dateofBirth: CoappBirthdate,
          // dateofBirth: d
        });
        // this.email.disable();
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }


  //=================

  //=========
  //================================ Getting Dropdown Data =================================================



  GetOwnThePropertyDll() {
    this.lstownthePropertyCode = 'OwntheProperty'
    this.commonService.getMasterItemsList("OwntheProperty").subscribe((result: any) => {
      this.lstowntheProperty = this.commonService.masters;

      this.selectedOwnTheProperty = this.lstowntheProperty.filter(x => x.text == "YES");

      this.defaultOwnTheProperty = this.selectedOwnTheProperty[0].value;
      //this.defaultOwnTheProperty = JSON.parse(this.selectedOwnTheProperty); 
    })
  }

  GetPrevHousingStatus() {
    ;
    this.commonService.getMasterItemsList("PrevHousingStatus").subscribe((result: any) => {
      this.lstprevHousingStatus = this.commonService.masters;
      // console.log("this.lstprevHousingStatus", this.lstprevHousingStatus);
      //   this.selectedOwnTheProperty = this.lstprevHousingStatus.filter(x => x.text == "YES"); 
      //  this.defaultOwnTheProperty = this.selectedOwnTheProperty[0].value;
    })
  }
  GetEmployementTypeDll() {
    this.lstemployementTypeCode = 'EmploymentType'
    this.commonService.getMasterItemsList("EmploymentType").subscribe((result: any) => {
      this.lstemployementType = this.commonService.masters;
    })
  }

  GetIncomeFrequencyDll() {
    this.lstIncomeFrequencyCode = 'IncomeFrequency'
    this.commonService.getMasterItemsList("IncomeFrequency").subscribe((result: any) => {
      this.lstIncomeFrequency = this.commonService.masters;

      this.iFreqYear = this.lstIncomeFrequency.filter(x => x.text == "Annually");
      this.iFreqYearValue = this.iFreqYear[0].value;
      this.iFreqMonth = this.lstIncomeFrequency.filter(x => x.text == "Monthly");
      this.iFreqMonthValue = this.iFreqMonth[0].value;
    })
  }
  getCountryDropdownList() {
    this.userService.getCountryList().subscribe((result: any) => {
      this.countryLists = result;
    })
  }
  getState() {
    this.userService.getStateList().subscribe((result: any) => {
      var data = result;
      this.states = data;
    })
  }


  onSubmit() {
    if (this.addSendTLoanHomiForm.valid) {
      this.loadSave = true;
      this.sendToLoanHomiDataModel.ReqFrom = "SolgenWeb";
      this.sendToLoanHomiDataModel.OpportunityId = this.opportunityId;
      this.sendToLoanHomiDataModel.ProposalId = this.resultData[0].ProposalId;
      this.sendToLoanHomiDataModel.ContactId = this.resultData[0].ContactId;
      this.sendToLoanHomiDataModel.AccountId = this.resultData[0].AccountId;
      this.sendToLoanHomiDataModel.ContractId = this.resultData[0].ContractId;
      this.sendToLoanHomiDataModel.LoanProductId = this.resultData[0].LoanProductId;
      this.sendToLoanHomiDataModel.loanProduct = this.addSendTLoanHomiForm.value.loanProduct;
      this.sendToLoanHomiDataModel.Term = this.addSendTLoanHomiForm.value.term;
      this.sendToLoanHomiDataModel.country = this.addSendTLoanHomiForm.value.country;
      this.sendToLoanHomiDataModel.BillingState = this.addSendTLoanHomiForm.value.state;
      this.sendToLoanHomiDataModel.BillingCity = this.addSendTLoanHomiForm.value.city;
      this.sendToLoanHomiDataModel.MailingState = this.addSendTLoanHomiForm.value.state;
      this.sendToLoanHomiDataModel.MailingCity = this.addSendTLoanHomiForm.value.city;
      this.sendToLoanHomiDataModel.BillingStreet = this.addSendTLoanHomiForm.value.street;
      this.sendToLoanHomiDataModel.BillingPostalCode = this.addSendTLoanHomiForm.value.postalCode;
      // this.sendToLoanHomiDataModel.System_Size_kW = this.addSendTLoanHomiForm.value.systemSizeKW;
      this.sendToLoanHomiDataModel.Total_System_Cost = this.addSendTLoanHomiForm.value.totalSystemCost;
      this.sendToLoanHomiDataModel.Downpayment_Amount = this.addSendTLoanHomiForm.value.downpaymentAmount;
      this.sendToLoanHomiDataModel.Loan_Amount = this.addSendTLoanHomiForm.value.loanAmount;
      this.sendToLoanHomiDataModel.Owntheproperty = this.addSendTLoanHomiForm.value.ownthePropertyID;
      this.sendToLoanHomiDataModel.NoofMortgages = this.addSendTLoanHomiForm.value.noOfMortgages;
      this.sendToLoanHomiDataModel.FirstName = this.addSendTLoanHomiForm.value.firstName;
      this.sendToLoanHomiDataModel.LastName = this.addSendTLoanHomiForm.value.lastName;
      this.sendToLoanHomiDataModel.Phone = this.addSendTLoanHomiForm.value.phone;
      this.sendToLoanHomiDataModel.MobilePhone = this.addSendTLoanHomiForm.value.mobile;
      this.sendToLoanHomiDataModel.Email = this.addSendTLoanHomiForm.value.email;
      this.sendToLoanHomiDataModel.SSN = this.addSendTLoanHomiForm.value.ssn;
      this.sendToLoanHomiDataModel.DOB = this.addSendTLoanHomiForm.value.dateofBirth == null ? this.addSendTLoanHomiForm.value.dateofBirth : moment(this.dateofBirth.value).format('MM-DD-YYYY');//this.addSendTLoanHomiForm.value.dateofBirth
      this.sendToLoanHomiDataModel.YearsACA = this.addSendTLoanHomiForm.value.yearsAtCurrentResidence;
      this.sendToLoanHomiDataModel.MonthsACA = this.addSendTLoanHomiForm.value.monthsatCurrentResidence;
      this.sendToLoanHomiDataModel.PYearACR = this.addSendTLoanHomiForm.value.yearsAtPreviousResidence;
      this.sendToLoanHomiDataModel.PMonthACR = this.addSendTLoanHomiForm.value.monthsatPreviousResidence;
      this.sendToLoanHomiDataModel.PRcountry = this.addSendTLoanHomiForm.value.PRcountry;
      this.sendToLoanHomiDataModel.PRstate = this.addSendTLoanHomiForm.value.PRstate;       
      this.sendToLoanHomiDataModel.PRCity = this.addSendTLoanHomiForm.value.PRCity;
      this.sendToLoanHomiDataModel.PRStreet = this.addSendTLoanHomiForm.value.PRStreet;   
      this.sendToLoanHomiDataModel.PRPostalCode = this.addSendTLoanHomiForm.value.PRPostalCode;
      this.sendToLoanHomiDataModel.PHousingStatus = this.addSendTLoanHomiForm.value.PHousingStatus;  
      this.sendToLoanHomiDataModel.EmployerType = this.addSendTLoanHomiForm.value.employementTypeID;
      this.sendToLoanHomiDataModel.Employer = this.addSendTLoanHomiForm.value.employerName;
      this.sendToLoanHomiDataModel.YearsACE = this.addSendTLoanHomiForm.value.yearsAtCurrentEmployement;
      this.sendToLoanHomiDataModel.MonthsACE = this.addSendTLoanHomiForm.value.monthsAtCurrentEmployement;
      this.sendToLoanHomiDataModel.PEmployerName = this.addSendTLoanHomiForm.value.previousEmployerName;
      this.sendToLoanHomiDataModel.POccupation = this.addSendTLoanHomiForm.value.previousOccupation;
      this.sendToLoanHomiDataModel.PYearsACE = this.addSendTLoanHomiForm.value.yearsAtPreviousEmployement;
      this.sendToLoanHomiDataModel.PMonthsACE = this.addSendTLoanHomiForm.value.monthsAtPreviousEmployement;
      this.sendToLoanHomiDataModel.IncomeFreq = this.addSendTLoanHomiForm.value.lstIncomeFrequencyID;
      this.sendToLoanHomiDataModel.Income = this.addSendTLoanHomiForm.value.income;
      this.sendToLoanHomiDataModel.OIncomeFreq = this.addSendTLoanHomiForm.value.otherIncomeFrequencyID;
      this.sendToLoanHomiDataModel.OIncomeMonthly = this.addSendTLoanHomiForm.value.otherIncome;
      this.sendToLoanHomiDataModel.OIncomeSource = this.addSendTLoanHomiForm.value.otherIncomeSource;
      this.sendToLoanHomiDataModel.GrossIncome = this.addSendTLoanHomiForm.value.grossIncome;
      this.sendToLoanHomiDataModel.Occupation = this.addSendTLoanHomiForm.value.occupation;
      this.sendToLoanHomiDataModel.coFirstname = this.addSendTLoanHomiForm.value.coApp_firstName;
      this.sendToLoanHomiDataModel.coLastname = this.addSendTLoanHomiForm.value.coApp_lastName;
      this.sendToLoanHomiDataModel.coPhone = this.addSendTLoanHomiForm.value.coApp_phone;
      this.sendToLoanHomiDataModel.coMobilePhone = this.addSendTLoanHomiForm.value.coApp_mobile;
      this.sendToLoanHomiDataModel.coEmail = this.addSendTLoanHomiForm.value.coApp_email;
      this.sendToLoanHomiDataModel.coSSN = this.addSendTLoanHomiForm.value.coApp_ssn;
      this.sendToLoanHomiDataModel.coDOB = this.addSendTLoanHomiForm.value.coApp_dateofBirth == null ? this.addSendTLoanHomiForm.value.coApp_dateofBirth : moment(this.coApp_dateofBirth.value).format('MM-DD-YYYY')

      this.sendToLoanHomiDataModel.coApp_country = this.addSendTLoanHomiForm.value.coApp_country;
      //this.sendToLoanHomiDataModel.coState = this.addSendTLoanHomiForm.value.coState;
      this.sendToLoanHomiDataModel.coMailingState = this.addSendTLoanHomiForm.value.coAppstate;
      // this.sendToLoanHomiDataModel.coCity = this.addSendTLoanHomiForm.value.coApp_city; 
      this.sendToLoanHomiDataModel.coMailingCity = this.addSendTLoanHomiForm.value.coApp_city;
      //this.sendToLoanHomiDataModel.coStreetName = this.addSendTLoanHomiForm.value.coApp_street;
      this.sendToLoanHomiDataModel.coMailingStreet = this.addSendTLoanHomiForm.value.coApp_street;
      this.sendToLoanHomiDataModel.coMailingPostalCode = this.addSendTLoanHomiForm.value.coApp_postalCode;
      this.sendToLoanHomiDataModel.coOccupation = this.addSendTLoanHomiForm.value.coApp_occupation;
      this.sendToLoanHomiDataModel.coYearsACE = this.addSendTLoanHomiForm.value.coApp_yearsAtCurrentEmployement;
      this.sendToLoanHomiDataModel.coMonthsACE = this.addSendTLoanHomiForm.value.coApp_monthsAtCurrentEmployement;
      this.sendToLoanHomiDataModel.coEmployerType = this.addSendTLoanHomiForm.value.coApp_employementTypeID;
      this.sendToLoanHomiDataModel.coEmployer = this.addSendTLoanHomiForm.value.coApp_employerName;
      this.sendToLoanHomiDataModel.coIncomeFreq = this.addSendTLoanHomiForm.value.coApp_incomeFrequency;
      this.sendToLoanHomiDataModel.CoIncome = this.addSendTLoanHomiForm.value.coApp_income;
      this.sendToLoanHomiDataModel.CoOIncomeFreq = this.addSendTLoanHomiForm.value.coApp_otherIncomeFrequency;
      this.sendToLoanHomiDataModel.coOIncome = this.addSendTLoanHomiForm.value.coApp_otherIncome;
      this.sendToLoanHomiDataModel.coOIncomeSource = this.addSendTLoanHomiForm.value.coApp_otherIncomeSource;
      this.sendToLoanHomiDataModel.coGrossIncome = this.addSendTLoanHomiForm.value.coApp_grossIncome;
      this.sendToLoanHomiDataModel.CustomerSignedDate = this.resultData[0].CustomerSignedDate;

      if (this.addSendTLoanHomiForm.value.IsCoApplicantRequired == null) {
        this.sendToLoanHomiDataModel.Iscoapplicant = false;
      }
      else {
        this.sendToLoanHomiDataModel.Iscoapplicant = this.addSendTLoanHomiForm.value.IsCoApplicantRequired;
      }
      this.sendToLoanHomiDataModel.AutoPayment = this.addSendTLoanHomiForm.value.isAutoPaymentcheckBox;

      if (this.sendToLoanHomiDataModel.CustomerSignedDate == null || this.sendToLoanHomiDataModel.CustomerSignedDate == "") {
        this.sendToLoanHomiDataModel.IsDocsSigned = 0;
      }
      else {
        this.sendToLoanHomiDataModel.IsDocsSigned = 1;
      }
      this.sendToLoanHomiDataModel.isBorrowers = this.addSendTLoanHomiForm.value.isBorrowers == "" ? false : true;
      this.sendToLoanHomiDataModel.CreatedBy = this.resultData[0].CreatedById;
      this.sendToLoanHomiDataModel.coPEmployerName = this.addSendTLoanHomiForm.value.coApp_previousEmployerName;
      this.sendToLoanHomiDataModel.coPOccupation = this.addSendTLoanHomiForm.value.coApp_previousOccupation;
      this.sendToLoanHomiDataModel.coPYearsACE = this.addSendTLoanHomiForm.value.coApp_yearsAtPreviousEmployement;
      this.sendToLoanHomiDataModel.coPMonthsACE = this.addSendTLoanHomiForm.value.coApp_monthsAtPreviousEmployement;
      this.sendToLoanHomiDataModel.coYearsACA = this.addSendTLoanHomiForm.value.coApp_yearsAtCurrentResidence;
      this.sendToLoanHomiDataModel.coMonthsACA = this.addSendTLoanHomiForm.value.coApp_monthsAtCurrentResidence;
      this.sendToLoanHomiDataModel.coPYearACR = this.addSendTLoanHomiForm.value.coApp_yearsAtPreviousResidence;
      this.sendToLoanHomiDataModel.coPMonthACR = this.addSendTLoanHomiForm.value.coApp_monthsatPreviousResidence;
      this.sendToLoanHomiDataModel.coPRcountry = this.addSendTLoanHomiForm.value.coApp_PRcountry;
      this.sendToLoanHomiDataModel.coPRstate = this.addSendTLoanHomiForm.value.coApp_PRstate;
      this.sendToLoanHomiDataModel.coPRCity = this.addSendTLoanHomiForm.value.coApp_PRCity;
      this.sendToLoanHomiDataModel.coPRStreet= this.addSendTLoanHomiForm.value.coApp_PRStreet;     
      this.sendToLoanHomiDataModel.coPRPostalCode = this.addSendTLoanHomiForm.value.coApp_PRPostalCode;
      this.sendToLoanHomiDataModel.CoPHousingStatus = this.addSendTLoanHomiForm.value.CoPHousingStatus;

      this.sendToLoanHomiDataModel.OppOwnerId = this.resultData[0].OppOwnerId;
      this.sendToLoanHomiPreviewDetail = this.sendToLoanHomiDataModel;


      if (this.sendToLoanHomiPreviewDetail.country != null && this.sendToLoanHomiPreviewDetail.country != 0) {
        let valcountry;
        valcountry = this.countryLists.filter(x => x.value == this.sendToLoanHomiPreviewDetail.country);
        this.sendToLoanHomiPreviewDetail.country = valcountry[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.coApp_country != null && this.sendToLoanHomiPreviewDetail.coApp_country != 0) {
        let valcoApp_country;
        valcoApp_country = this.countryLists.filter(x => x.value == this.sendToLoanHomiPreviewDetail.coApp_country);
        this.sendToLoanHomiPreviewDetail.coApp_country = valcoApp_country[0].text;
      }


      if (this.sendToLoanHomiPreviewDetail.BillingState != null && this.sendToLoanHomiPreviewDetail.BillingState != 0) {
        let valstate;
        valstate = this.states.filter(x => x.value == this.sendToLoanHomiPreviewDetail.BillingState);
        this.sendToLoanHomiPreviewDetail.BillingState = valstate[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.coMailingState != null && this.sendToLoanHomiPreviewDetail.coMailingState != 0) {
        let valcostate;
        valcostate = this.states.filter(x => x.value == this.sendToLoanHomiPreviewDetail.coMailingState);
        this.sendToLoanHomiPreviewDetail.coMailingState = valcostate[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.Owntheproperty != null && this.sendToLoanHomiPreviewDetail.Owntheproperty != 0) {
        let valOwntheProperty;
        valOwntheProperty = this.lstowntheProperty.filter(x => x.value == this.sendToLoanHomiPreviewDetail.Owntheproperty);
        this.sendToLoanHomiPreviewDetail.Owntheproperty = valOwntheProperty[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.EmployerType != null && this.sendToLoanHomiPreviewDetail.EmployerType != 0) {
        let valEmployerType;
        valEmployerType = this.lstemployementType.filter(x => x.value == this.sendToLoanHomiPreviewDetail.EmployerType);
        this.sendToLoanHomiPreviewDetail.EmployerType = valEmployerType[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.IncomeFreq != null && this.sendToLoanHomiPreviewDetail.IncomeFreq != 0) {
        let valIncomeFreq;
        valIncomeFreq = this.lstIncomeFrequency.filter(x => x.value == this.sendToLoanHomiPreviewDetail.IncomeFreq);
        this.sendToLoanHomiPreviewDetail.IncomeFreq = valIncomeFreq[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.OIncomeFreq != null && this.sendToLoanHomiPreviewDetail.OIncomeFreq != 0) {
        let valOIncomeFreq;
        valOIncomeFreq = this.lstIncomeFrequency.filter(x => x.value == this.sendToLoanHomiPreviewDetail.OIncomeFreq);
        this.sendToLoanHomiPreviewDetail.OIncomeFreq = valOIncomeFreq[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.coIncomeFreq != null && this.sendToLoanHomiPreviewDetail.coIncomeFreq != 0) {
        let valcoIncomeFreq;
        valcoIncomeFreq = this.lstIncomeFrequency.filter(x => x.value == this.sendToLoanHomiPreviewDetail.coIncomeFreq);
        this.sendToLoanHomiPreviewDetail.coIncomeFreq = valcoIncomeFreq[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.CoOIncomeFreq != null && this.sendToLoanHomiPreviewDetail.CoOIncomeFreq != 0) {
        let valCoOIncomeFreq;
        valCoOIncomeFreq = this.lstIncomeFrequency.filter(x => x.value == this.sendToLoanHomiPreviewDetail.CoOIncomeFreq);
        this.sendToLoanHomiPreviewDetail.CoOIncomeFreq = valCoOIncomeFreq[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.coEmployerType != null && this.sendToLoanHomiPreviewDetail.coEmployerType != 0) {
        let valCoEmployerType;
        valCoEmployerType = this.lstemployementType.filter(x => x.value == this.sendToLoanHomiPreviewDetail.coEmployerType);
        this.sendToLoanHomiPreviewDetail.coEmployerType = valCoEmployerType[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.PRcountry != null && this.sendToLoanHomiPreviewDetail.PRcountry != 0) {
        let valPRcountry;
        valPRcountry = this.countryLists.filter(x => x.value == this.sendToLoanHomiPreviewDetail.PRcountry);
        this.sendToLoanHomiPreviewDetail.PRcountry = valPRcountry[0].text; 
      } 

      if (this.sendToLoanHomiPreviewDetail.PRstate != null && this.sendToLoanHomiPreviewDetail.PRstate != 0) {
        let valPRstate;
        valPRstate = this.states.filter(x => x.value == this.sendToLoanHomiPreviewDetail.PRstate);
        this.sendToLoanHomiPreviewDetail.PRstate = valPRstate[0].text;
      }

      if (this.sendToLoanHomiPreviewDetail.PHousingStatus != null && this.sendToLoanHomiPreviewDetail.PHousingStatus != 0) {
        ;
        let valPHousingStatus;
        valPHousingStatus = this.lstprevHousingStatus.filter(x => x.value == this.sendToLoanHomiPreviewDetail.PHousingStatus);
        this.sendToLoanHomiPreviewDetail.PHousingStatus = valPHousingStatus[0].text; 
      }      

      if (this.sendToLoanHomiPreviewDetail.coPRcountry != null && this.sendToLoanHomiPreviewDetail.coPRcountry != 0) {
        let valcoPRcountry;
        valcoPRcountry = this.countryLists.filter(x => x.value == this.sendToLoanHomiPreviewDetail.coPRcountry);
        this.sendToLoanHomiPreviewDetail.coPRcountry = valcoPRcountry[0].text;
      } 

      if (this.sendToLoanHomiPreviewDetail.coPRstate != null && this.sendToLoanHomiPreviewDetail.coPRstate != 0) {
        let valcoPRstate;
        valcoPRstate = this.states.filter(x => x.value == this.sendToLoanHomiPreviewDetail.coPRstate);
        this.sendToLoanHomiPreviewDetail.coPRstate = valcoPRstate[0].text;
      } 

      if (this.sendToLoanHomiPreviewDetail.CoPHousingStatus != null && this.sendToLoanHomiPreviewDetail.CoPHousingStatus != 0) {
        let valCoPHousingStatus;
        valCoPHousingStatus = this.lstprevHousingStatus.filter(x => x.value == this.sendToLoanHomiPreviewDetail.CoPHousingStatus);
        this.sendToLoanHomiPreviewDetail.CoPHousingStatus = valCoPHousingStatus[0].text;
      }   

      this.showAddSendTLoanHomiForm = false;
      this.showPreviewSendTLoanHomiForm = true; 

      this.loadSave = false;

      // console.log("asdasdasdasd", this.sendToLoanHomiPreviewDetail);
    }

    else {
      for (const key of Object.keys(this.addSendTLoanHomiForm.controls)) {
        if (this.addSendTLoanHomiForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // console.log("sddasd", invalidControl);
          invalidControl.focus();
          break;
        }
      }

      this.commonService.validateAllFormFields(this.addSendTLoanHomiForm);
    }
    //=========================================================================================================
  }

  onBack() {
    this.showPreviewSendTLoanHomiForm = false;
    this.showAddSendTLoanHomiForm = true;
    this.loadSave = false;
  }
  onPrevSubmit() {
    ;
    this.loadSave = true;
    this.sendToLoanHomiPreviewDetail.country = this.addSendTLoanHomiForm.value.country;
    this.sendToLoanHomiDataModel.coApp_country = this.addSendTLoanHomiForm.value.coApp_country;
    this.sendToLoanHomiDataModel.PRcountry = this.addSendTLoanHomiForm.value.PRcountry;
    this.sendToLoanHomiDataModel.coPRcountry = this.addSendTLoanHomiForm.value.coApp_PRcountry;
    this.sendToLoanHomiDataModel.BillingState = this.addSendTLoanHomiForm.value.state;
    this.sendToLoanHomiPreviewDetail.coMailingState = this.addSendTLoanHomiForm.value.coAppstate;
    this.sendToLoanHomiPreviewDetail.PRstate = this.addSendTLoanHomiForm.value.PRstate;
    this.sendToLoanHomiPreviewDetail.coPRstate = this.addSendTLoanHomiForm.value.coApp_PRstate;
    this.sendToLoanHomiPreviewDetail.PHousingStatus = this.addSendTLoanHomiForm.value.PHousingStatus;
    this.sendToLoanHomiPreviewDetail.CoPHousingStatus = this.addSendTLoanHomiForm.value.CoPHousingStatus;
    this.jsonData.AuthToken = localStorage.getItem("access_token");
    this.jsonData.FormJsonData = JSON.stringify(this.sendToLoanHomiPreviewDetail);      
    // console.log("this.jsonData.FormJsonData", this.jsonData.FormJsonData);
    this.opprtunityservice.saveData(this.jsonData).subscribe((result: any) => {
      var resultdata = result;
      this.rUserName = resultdata.userName;
      this.rDataLoanAppId = resultdata.loanAppId;
      this.creditScoreCategory = resultdata.creditScoreCategory;
      this.IncomeVerificationValue = resultdata.incomeVerificationValue;
      this.mandatoryDocuments = resultdata.mandatoryDocuments;
      ;
      // console.log("resultdata", resultdata);

      if (resultdata.code == null || resultdata.code == "") {
        this.toaster.error("Something went wrong please contact administrator.");
        this.loadSave = false;
        return false;
      }


      if (resultdata.code != "Failure") {

        if (resultdata.applicationStatus == "Failed") {
          this.openPopupSendToLoanHomi.hide();
          this.waringPopup.show();
          this.loadSave = false;


        }
        else {
          this.openPopupSendToLoanHomi.hide();
          this.responsePopUp.show();
          this.loadSave = false;

        }
      }
      else {
        this.toaster.error(resultdata.StatusCode);
        this.loadSave = false;
        return false;
      }
    }, error => {
      this.loadSave = false;
    });
  }


  keyPressNo(event: any) {

    const pattern = /[0-9\+\ ]/;
    //const pattern = /[0-9.\+\ ]/; --For decimal
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar) && event.charCode != '0') {
      event.preventDefault();
    }
  }


  termCheck(event: any) {
    if (event == 'B') {
      this.isTermCheckBox.setValue(null);
      this.isTermCheckBox.setValidators([Validators.required]);
      this.isTermCheckBox.updateValueAndValidity();
    }
    else {
      this.isTermCheckBox.setValue(true);
      this.isTermCheckBox.clearValidators();
      this.isTermCheckBox.updateValueAndValidity();
    }
  }

  borrowersCheck(event: any) {
    if (event == 'B') {
      this.isBorrowers.setValue(null);
      this.isBorrowers.setValidators([Validators.required]);
      this.isBorrowers.updateValueAndValidity();
    }
    else {
      this.isBorrowers.setValue(true);
      this.isBorrowers.setValidators([Validators.nullValidator]);
      this.isBorrowers.updateValueAndValidity();
    }
  }
  closeResponsePopup() {
    this.responsePopUp.hide();
    this.loadSave = true;
    this.refreshEvent.emit('Yes');
    this.loadSave = false;
    // window.location.reload();
  }

  closeWaringPopup() {
    this.waringPopup.hide();
    this.loadSave = true;
    this.refreshEvent.emit('Yes');
    this.loadSave = false;
    // window.location.reload();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      this.dotCount += 1;
      this.checkNumberOnly = (event.target.value);
      var numericCheck = (event.target.value).toString();
      if (numericCheck.includes('.')) {
        this.dotCount += 1;
      }
      if (this.dotCount > 1) {
        this.dotCount = 0;
        return false;
      }
    }
    if (charCode > 31 && (charCode <= 45 || charCode > 57 || charCode == 47)) {
      return false;
    }
    this.checkNumberOnly = (event.target.value);
    if (this.checkNumberOnly != null) {
      var numeric = (event.target.value).toString();
      if (numeric.includes('.')) {
        var checkNumeric = numeric.split('.');
        if (checkNumeric.length > 2) {
          return false;
        }
        this.checkString = checkNumeric[1].split('');
        if (this.checkString.length > 1) {
          // this.toastrService.warning("Invalid value", "Warning");
          return false;
        }
      }

    }
    this.dotCount = 0;
    return true;
  }

  //onFocusOutEvent(event: any) {
  //  // console.log(event);
  //  let emailAdd = event.target.value;
  //  // console.log(event.target.value);
  //  this.CheckExistingEmail(emailAdd);
  //}


  onFocusOutEmail(event: any) {
    ;
    const pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    let emailAdd = event.target.value;

    if (emailAdd.match(pattern) != null) {
      this.coApp_email.setValidators([Validators.nullValidator]);
      this.coApp_email.updateValueAndValidity();
    }
    else {
      this.coApp_email.setValidators([Validators.compose([
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required,
      ])
      ]);
      this.coApp_email.updateValueAndValidity();
    }
    if (emailAdd == '') {
      this.email.setValidators([Validators.required]);
      this.coApp_email.updateValueAndValidity();
    }
    //this.CheckExistingEmail(emailAdd);
  };

  CheckExistingEmail(emailAdd: any) {
    let appEmail = this.resultData[0].Email;
    // console.log("hngfjgfhjghgfh", appEmail);
    this.opprtunityservice.checkExistingEmailAddress(emailAdd).subscribe((result: any) => {
      let resultData = JSON.parse(result.result); //convert strint to json// 
      // console.log("resultData", resultData);
      if (resultData) {
        // console.log("resultData1[0].FirstName", resultData.FirstName);
      }

      if (result.statusCode == 202) {
        this.dialogService.existingEmail('Alert', 'Contact is already exists with this Email ID. If you click OK then existing contact details will be updated when you submit this form.').subscribe(confirmed => {

          if (emailAdd == this.resultData[0].Email) {
            if (confirmed) { }
            else {
              this.addSendTLoanHomiForm.patchValue({
                email: ''
              });
            }
          }
          else {
            if (confirmed) {
              //// console.log("bbbbbbbbbbb", confirmed); 
              //// console.log("mmmmmmmmmmmm", this.resultData[0].CoappEmail);
              //if (this.resultData[0].CoappEmail != null)
              //{
              //  this.addSendTLoanHomiForm.patchValue({

              //    coApp_firstName: this.resultData[0].Coappfirstname,
              //    coApp_lastName: this.resultData[0].Coapplastname,
              //    coApp_phone: this.resultData[0].CoappPhone,
              //    coApp_mobile: this.resultData[0].CoappMobilePhone,
              //    coApp_email: this.resultData[0].CoappEmail
              //  });
              //}
              //else
              //{
              //  this.addSendTLoanHomiForm.patchValue({

              //    coApp_firstName: resultData.FirstName,    
              //    coApp_lastName: resultData.LastName,
              //    coApp_phone: resultData.Phone,
              //    coApp_mobile: resultData.MobilePhone,
              //    coApp_email: resultData.Email
              //  });
              //}
            }
            else {
              // console.log("bbbbbbbbbbb", confirmed);
              // console.log("nnnnnnnnnnnnnn", this.resultData[0].CoappEmail);

              if (this.resultData[0].CoappEmail != null) {
                this.addSendTLoanHomiForm.patchValue({

                  //coApp_firstName: this.resultData[0].Coappfirstname,
                  //coApp_lastName: this.resultData[0].Coapplastname,
                  //coApp_phone: this.resultData[0].CoappPhone, 
                  //coApp_mobile: this.resultData[0].CoappMobilePhone,
                  coApp_email: ''
                });
              }
              else {
                this.addSendTLoanHomiForm.patchValue({

                  //coApp_firstName:'',
                  //coApp_lastName: '',
                  //coApp_phone: '',
                  //coApp_mobile: '',

                  coApp_email: ''
                });
              }

            }
          }
          //else {
          //  this.userProfileForm.patchValue({ email: this.userProfileForm.value.hdnEmail });
          //}
        });
      }


    });
  }

  checkAge(control: AbstractControl): { [key: string]: any } | null {
    var value = control.value
    // console.log("value", value);
    if (value != null && value != "") {
      let selectedDate = moment(value, 'MM/DD/YYYY');
      // console.log("selectedDate", selectedDate);
      var today = moment();
      // console.log("today", today);
      let years = today.diff(selectedDate, 'years');
      // console.log("years", years);
      if (years < 18) {
        return { 'lessthan18': true };

      }
    }
    else {
      return { 'required': true };
    }
    return null
  }
}
