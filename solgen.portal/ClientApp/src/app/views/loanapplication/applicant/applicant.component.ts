import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoanapplicationserviceService, JsonData, CheckboxData, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ManageUserService } from '../../manageuser/addedituser.service';
import { debounce } from '@fullcalendar/core';
import { parse } from 'url';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { UtcToPstDatePipe } from '../../../pipes/utctolocal.pipe';
import moment from 'moment';
import { DatePipe } from '@angular/common';
//import { setTimeout } from 'timers';
//import { moment } from 'moment';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit, OnChanges {
  maxDateValue: Date
  estFundDate: Date
  isOhio = false;
  productchange = false;
  docDate: Date;
  extStageAtive = false;
  formstagedata: any;
  @Input('itemdata12') itemdata12: any;
  @Input('leadconvert') leadconvert: boolean = false;
  @Input('leadid') leadconvertedid: any;
  @Input('loanid') loanid: any;
  @Input('wizardIndex') wizardIndex: number;
  @Output() ntpemit = new EventEmitter();
  @Output() CreditScoreMannualPullForCoApp = new EventEmitter();
  @Output() wizardOutput = new EventEmitter<number>();
  @Output() finishWizard = new EventEmitter<any>();
  @Output() loanInfoEmit = new EventEmitter<any>();
  enableproduc: boolean;
  @Input('totalWizard') totalWizardlength: number;
  moduleName = 'finance';
  //submoduleName = 'LoanApplicationApplicant';
  @Input('submoduleName') submoduleName: any;
  @Input('IsLACanceledFlag') IsLACanceledFlag: boolean = false;
  isMorgageAllow = false;
  companyId: any;
  userId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  checkboxdata1: Array<CheckboxData> = [];
  usertype: string;
  isflag = false;
  isModel = false;
  Id: any = '';
  customCompnentValues: any;
  formControlList: any[] = [];
  applicantForm: FormGroup;
  loadSave = false;
  JsonData: JsonData = new JsonData();
  LoanChartdata: any;
  //LoanDefaultValue: any = 225000;
  //HomeLoanDefaultValue: any = 250000;
  pi: any;
  pmi: any;
  pt: any;
  hoi: any;
  chartOptions: any;
  //MonthlyInstallment: any;

  signNowDocumentHistory: any = "";
  //MonthlyInstallment: any;
  showCalculator: any = false;
  AmountFinacedControl: any;
  LienFeePercControl: any;
  LienFeeRateControl: any;
  DealerFeePercControl: any;
  DealerFeeRateControl: any;
  LoanRateControl: any;
  BuyDownPercentControl: any;
  PermanentAmoutControl: any;
  BuyDownAmountControl: any;
  regincome: any;
  incomefreq: any;
  otherincome: any;
  otherincomefreq: any;
  grossincome: any;
  monthlydebt: any;
  dticol: any;
  leadid: any;
  isFinanceUser = false;
  isSalesUser = false;
  isBankUser = false;
  isAdminUser = false;
  isSubmitted = false;
  stageStatus = true;
  enablefields: boolean = false;
  showDObSSN: boolean = false;
  roleCode: string = "";
  isDealerUser = false;
  isAccountingUser = false;
  isRelationshipUser = false;
  isAudit = false;
  docuSignData: any;
  showSignNowHistoryData: boolean = false;
  showDocuSignHistoryData: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService, private commonService: CommonService,
    private router: Router, private loanApplicationService: LoanapplicationserviceService,
    private toaster: ToastrService, private utctopstdate: UtcToPstDatePipe,
    public datepipe: DatePipe) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.roleCode = userdetail.roleCode;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }
  ngOnChanges() {

    if (this.leadconvert) {
      this.Id = this.loanid;
      
    }
    //alert(this.IsLACanceledFlag);
    if (this.IsLACanceledFlag) {
      this.isflag = false;
      this.IsLACanceledFlag = this.IsLACanceledFlag;
    }
    this.checkdisablesubmit()

  }

  onSelectMethod(event, fieldName) {
    // console.log('event', event);
    let d = new Date(Date.parse(event));
    // console.log('D', d);
    const myDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}` + ' 00:00:00';
    // console.log('myDate', myDate);

    //const latest_date = this.datepipe.transform(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`, 'full');
    //// console.log('latest_date', latest_date);
    this.applicantForm.get(fieldName).setValue(myDate);
  }

  ngOnInit() {
    this.stageStatus = true;
    if (this.itemdata12.stageActive == 1 && this.itemdata12.stageapproved == 1) {
      this.stageStatus = false;
    }
    this.isOhio = false;
    this.maxDateValue = null;

    this.addOrUpdatePermission = false;
    this.usertype = localStorage.getItem("usertype");

    this.isAdminUser = false;
    this.isFinanceUser = false;
    this.isBankUser = false;
    this.isSalesUser = false;
    this.isDealerUser = false;
    this.isAccountingUser = false;
    this.isRelationshipUser = false;
    this.isAudit = false;

    if (this.leadconvert != true) {

      if (this.usertype.toLocaleLowerCase() === "usertypefinance") {
        this.isFinanceUser = true;
        this.isBankUser = false;
        this.isAdminUser = false;
        this.isSalesUser = false;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypebanker") {
        this.isBankUser = true;
        this.isFinanceUser = false;
        this.isAdminUser = false;
        this.isSalesUser = false;
      } else if (this.usertype.toLocaleLowerCase() === "usertypecompanyadmin") {
        this.isAdminUser = true;
        this.isFinanceUser = false;
        this.isBankUser = false;
        this.isSalesUser = false;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypesales") {
        this.isAdminUser = false;
        this.isFinanceUser = false;
        this.isBankUser = false;
        this.isSalesUser = true;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypedealer") {
        this.isDealerUser = true;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypecommonuser") {
        this.isAccountingUser = true;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertyperelationship") {
        this.isRelationshipUser = true;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypeaudit") {
        this.isAudit = true;
      }



      this.showDObSSN = false;//hide DOB and SSN for all users excel below
      if (this.usertype.toLocaleLowerCase() === "usertypecompanyadmin") {
        this.showDObSSN = true;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypedealer") {
        this.showDObSSN = false;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypecommonuser") {//Acounting User
        this.showDObSSN = false;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypeaudit") {
        this.showDObSSN = false;
      }
      //if (this.usertype.toLocaleLowerCase() === "usertypecommonuser") {
      if (this.roleCode == "relationship_manager" || this.roleCode == "relationship_director")// || this.roleCode == "dealer_companyadmin")
      {
        this.showDObSSN = true;
      }
      // }

      var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
      if (haspermission) {
        this.isflag = true;
      }
    }
    if (this.leadconvert == true) {

      this.isflag = true;
    }

    this.IsLACanceledFlag = this.IsLACanceledFlag;
    if (this.IsLACanceledFlag) { this.isflag = false; }

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.Id = id;
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
          this.showDocumentHistory();
        } else {
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );
    this.GetFormData();
    this.chartOptions = {
      legend: {
        position: 'right'
      }
    }


    this.loanApplicationService.loanProgress.subscribe((m: LoanProgressModel) => {

      if (m.applyingRules == Progress.completed) {

        this.GetFormData();
      }
    })
  }


  close() {
    this.isModel = false;
    this.GetFormData();
    this.ntpemit.emit();
  }

  ShowData(event) {
    var $this = this;
    if (this.submoduleName == "LoanApplicationApplicant" && event != null && typeof (event) != 'undefined') {
      var keys = Object.keys($this.applicantForm.value);
      let _regincome = 0;
      let _incomefreq = '';
      let _otherincome = 0;
      let _otherincomefreq = '';
      let _totalincome = 0;





      keys.forEach(t => {

        let fields;
        let fiieldId;
        try {
          fields = $this.customCompnentValues.filter(function (itm) { return itm.form_controlName == String(t) });
          fiieldId = fields[0].form_field_id;
        } catch (ex) { }

        if (String(t).includes("RegularIncome")) {
          $this.regincome = t;
          _regincome = $this.applicantForm.get(t).value;

        }
        else if (String(t).includes("IncomeFrequency")) {
          $this.incomefreq = t;
          _incomefreq = $this.applicantForm.get(t).value;

        }
        else if (String(t).includes("OtherMonthlyIncome")) {
          $this.otherincome = t;
          _otherincome = $this.applicantForm.get(t).value;

        }
        else if (String(t).includes("OtherIncomeFrequency")) {
          $this.otherincomefreq = t;
          if ($this.applicantForm.get(t).value == null) {
            $this.applicantForm.get(t).setValue("Monthly");
            _otherincomefreq = $this.applicantForm.get(t).value;
          }

        }

        else if (String(t).includes(String(fiieldId) + "_GrossIncome") && !String(t).includes("MonthlyGrossIncome")) {
          $this.grossincome = t;
          if (_incomefreq == 'Monthly') {
            _regincome = _regincome * 12;

          }
          if (_otherincome > 0) {
            if (_otherincomefreq != 'Annually') {
              _otherincome = parseFloat(_otherincome.toString()) * 12;
            }

          }

          _totalincome = parseFloat(_otherincome.toString()) + parseFloat(_regincome.toString());
          $this.applicantForm.get(t).setValue(_totalincome.toFixed(2));

        }
        else if (String(t).includes("MonthlyGrossIncome")) {


          let monthlygi = parseFloat(_totalincome.toString()) / 12;


          $this.applicantForm.get(t).setValue(monthlygi.toFixed(2));

        }
      });
    }
    if (this.submoduleName == "LoanApplicationProductInfo" && event != null && typeof (event) != 'undefined') {
      var selectedValue = event.value;
      var $this = this;
      const message = `Are you sure you want to change product?`;
      this.dialogService.confirm('Change Product', message).subscribe(confirmed => {
        if (confirmed) {
          $this.loanApplicationService.GetProductData(this.companyId, selectedValue, this.loanid).subscribe((result: any) => {
            if (result) {


              var data = JSON.parse($this.loanApplicationService.LoanProductData.result).data[0];

              var keys = Object.keys($this.applicantForm.value);

              let loanamt = 0;
              let loanrate = 0;
              let buydownamt = 0;
              let buydownperc = 0;
              keys.forEach(t => {


                if (String(t).includes("LoanTerm")) {
                  $this.applicantForm.get(t).setValue(data.LoanTerm);
                  $this.applicantForm.get("LoanTerm").setValue(data.LoanTerm);
                }
                else if (String(t).includes("AmountFinanced")) {
                  loanamt = $this.applicantForm.get(t).value;
                  $this.AmountFinacedControl = t;

                }
                else if (String(t).includes("LoanRate")) {
                  $this.applicantForm.get(t).setValue(data.LoanRate);
                  $this.applicantForm.get("InterestRate").setValue(data.LoanRate);
                  loanrate = $this.applicantForm.get(t).value;
                  $this.LoanRateControl = t;
                }
                else if (String(t).includes("LenderName")) {

                  $this.applicantForm.get(t).setValue(data.BankId.toString());
                  //$this.applicantForm.get("LenderName").setValue(data.BankId);
                }


                //else if (String(t).includes("BuyDownPercent")) {
                //  $this.BuyDownPercentControl = t;
                //  buydownperc = $this.applicantForm.get(t).value;
                //  $this.BuyDownPercentControl = t;
                //}

                //else if (String(t).includes("BuyDownAmount")) {
                //  $this.BuyDownAmountControl = t;
                //  let ttl = (loanamt * buydownperc) / (100);
                //  buydownamt = parseFloat(ttl.toFixed(3));
                //  $this.applicantForm.get(t).setValue(ttl.toFixed(2));
                //}
                //else if (String(t).includes("NetFundedAmount")) {
                //  // let loanamt = $this.applicantForm.get("AmountFinanced").value;
                //  // let loanrate = $this.applicantForm.get("LoanRate").value;
                //  let ttl = ((((loanamt * loanrate) / 100) / 365) * 31) * 4;
                //  let fundedamt = loanamt - buydownamt - parseFloat(ttl.toFixed(3));
                //  $this.applicantForm.get(t).setValue(fundedamt.toFixed(3));
                //}
              });
              this.productchange = true;
              this.onSubmitData();
              // $this.calculate();
            }
          });
        }
      });
    }
  }
  handleLoanChange(event: any, type: any) {
    if (type == "loan") {
      this.applicantForm.get("LoanDefaultValue").setValue(event.value);
      this.applicantForm.get(this.AmountFinacedControl).setValue(event.value);
    }
    else {
      this.applicantForm.get("HomeLoanDefaultValue").setValue(event.value);
    }
    this.calculate();
  }
  GetFormData() {
    this.extStageAtive = false;
    this.isModel = false;
    if (this.ntpemit.observers.length > 0) {
      this.isModel = true;
    }
    this.estFundDate = null;

    this.loanApplicationService.GetFormFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id).subscribe((result: any) => {
      if (result) {

        var dateFormControl = null;
        this.customCompnentValues = this.loanApplicationService.formFieldsList.data;

        //// console.log('Applicant:', this.customCompnentValues)

        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.name == 'EmployerType') {
            t.isEnabled = this.enablefields;
          }
          else {
            t.isEnabled = false;
          }
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;


            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              displayOrder: t.group_display_order,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }
            this.formControlList.push(obj);
          }
        })
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
            if (cnt.value == "" || cnt.value == null) {
              val = null;
            } else {
              if (cnt.ColumnName != 'DOB' && cnt.name != 'DOB') {
                val = this.utctopstdate.transform(cnt.value, null);
              } else {
                // console.log("DOB TO CHECK", cnt.value);
                val = new Date(cnt.value);
                //val = cnt.value;
                // console.log("DOB TO CHECK AFTER", val);
              }
            }
            if (cnt.ColumnName == "DOB" && cnt.name == "DOB") {
              dateFormControl = cnt.form_controlName;
            }
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }

          if ((cnt.ColumnName == "DisposableIncome" || cnt.ColumnName == "CombinedDisposableIncome") && cnt.dt_code =='decimal') {
            cnt.data_type_id = '1';
            cnt.actual_data_type = 'nvarchar(max)'
            cnt.dt_code ='text'
          }

          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { this.applicantForm.get(item.controlname).setValue(item.controlvalues.split(',')); });
            }
            catch (err) { }
          }
          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }
          ///this is for ohio state given field there are  decimal place issue becuase no definded decimal places and this is autocalulcated filed so we dont need required and decimal vaildation
          if (this.submoduleName == "LoanApplicationProductInfo" && (cnt.ColumnName == 'TotalTimesCompounded' || cnt.ColumnName == 'EighteenMonthNumberOfTimesCompounded' || cnt.ColumnName == 'TimesCompoundedPerYear' || cnt.ColumnName == 'InterestRatePerCompoundTime' || cnt.ColumnName == 'DailyPaymentCalculation' || cnt.ColumnName == 'TaxCreditPercentage ')) {
            cnt.is_required = false;
            group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
            Validators.nullValidator
            ])

          }
          else {
            group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
            ((cnt.actual_data_type == "int" && cnt.ColumnName != "ApplicantCreditScore" && cnt.ColumnName != "CoApplicantCreditScore" && cnt.ColumnName != "SSN")) ? Validators.pattern("[0-9]{1,9}") : (cnt.actual_data_type == "bigint" && cnt.ColumnName != "ApplicantCreditScore" && cnt.ColumnName != "CoApplicantCreditScore" && cnt.ColumnName != "SSN") ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) : Validators.nullValidator,
            (cnt.name == 'MonthsAtCurrentAddr' || cnt.name == 'MonthsatPreviousAddress' || cnt.name == 'MonthsAtEmp' || cnt.name == 'PreviousMonthsAtEmp') ? Validators.max(11) : Validators.nullValidator,
            (cnt.name == 'MonthsAtCurrentAddr' || cnt.name == 'MonthsatPreviousAddress' || cnt.name == 'MonthsAtEmp' || cnt.name == 'PreviousMonthsAtEmp') ? Validators.pattern("^[0-9]{1,45}$") : Validators.nullValidator,
            (cnt.ColumnName == "ApplicantCreditScore" || cnt.ColumnName == "CoApplicantCreditScore") ? Validators.pattern(`[-+]?[0-9]{0,9}?[0-9]{1,2}`) : Validators.nullValidator,
            (cnt.ColumnName == "SSN") ? Validators.pattern(`[0-9]{9}`) : Validators.nullValidator
            ])
          }
        });
        this.formControlList.sort((a, b) => (a.displayOrder > b.displayOrder) ? 1 : ((b.displayOrder > a.displayOrder) ? -1 : 0));
        if (this.submoduleName == "LoanApplicationApplicant" || this.submoduleName == "LoanApplicationCoapplicant") {
          var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
          if (haspermission) {
            this.extStageAtive = false;
          }
          else {
            this.extStageAtive = true;
          }
          this.loanApplicationService.GetStageDetails(this.Id).subscribe((result: any) => {
            //// console.log('this.loanApplicationService.stageInfo;', this.loanApplicationService.stageInfo)
            this.formstagedata = this.loanApplicationService.stageInfo;
            this.formstagedata.forEach((item1) => {

              if (item1.loan_app_stage_name == "External Verification" && item1.stageapproved == 1) {
                this.extStageAtive = true;
              }

              if (item1.loan_app_stage_name == "Internal Verification" && item1.stageActive == 1 && item1.stageapproved == 0 || item1.loan_app_stage_name == "Documents Signed" && item1.stageActive == 1 && item1.stageapproved == 0) {

                this.enablefields = true;

              }

            });


          });
          this.checkdisablesubmit();
        }
        else {
          this.extStageAtive = true;


        }
        if (this.submoduleName == "LoanApplicationProductInfo") {

          group['LoanDefaultValue'] = new FormControl(225000, [Validators.nullValidator]);
          group['HomeLoanDefaultValue'] = new FormControl(250000, [Validators.nullValidator]);
          group['MonthlyInstallment'] = new FormControl(250000, [Validators.nullValidator]);
          group['InterestRate'] = new FormControl(4, [Validators.nullValidator]);
          group['LoanTerm'] = new FormControl(30, [Validators.nullValidator]);
          group['PropertyTax'] = new FormControl(1, [Validators.nullValidator]);
          group['HomeOwnersInsurance'] = new FormControl(800, [Validators.nullValidator]);
          this.checkdisablesubmit();
          //this.loanApplicationService.isproductenable.subscribe(m => {
          //this.enableproduc = m;
          //  if (this.enableproduc == false) { this.isflag = false; } else {  this.isflag = true; }
          //});
        }
        this.applicantForm = new FormGroup(group);

        this.loadSave = false;
        this.SetValues();


        // if (this.submoduleName == "LoanApplicationReleaseFunds") {
        this.applicantForm.get(this.regincome).valueChanges.subscribe(m => {

          this.SetValues();

        });
        this.applicantForm.get(this.incomefreq).valueChanges.subscribe(m => {
          this.SetValues();

        });
        this.applicantForm.get(this.otherincome).valueChanges.subscribe(m => {
          this.SetValues();

        });
        this.applicantForm.get(this.otherincomefreq).valueChanges.subscribe(m => {
          this.SetValues();

        });


        this.applicantForm.get(dateFormControl).setValidators(this.custValidation);
        this.applicantForm.controls[dateFormControl].updateValueAndValidity();
      }
    });
    if (this.submoduleName == 'LoanApplicationSignedDoc') {
      this.isflag = false;
    }

  }

  checkdisablesubmit() {

    this.loanApplicationService.GetApplicationDetails(this.Id, this.companyId, this.userId).subscribe((result: any) => {

      let formdata = this.loanApplicationService.applicationInfo;
      if (formdata.ApplicantState == 'Ohio (OH)') {
        this.isOhio = true;
      }

      this.isflag = formdata.IsProductEnable;
      var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
      if (!haspermission) {
        this.isflag = false;
      }
      this.docDate = new Date(formdata.DocDate);
      if (formdata.EstimatedFundDate != null) {
        this.estFundDate = new Date(formdata.EstimatedFundDate);
      }
      if (this.docDate != null) {

        this.maxDateValue = this.docDate;

        //  this.maxDateValue.setDate(this.docDate.getDate() + 90);
        //var new_date = moment(this.docDate, "MM-dd-YYYY").add(5, 'days');
        this.maxDateValue.setDate(this.docDate.getDate() + 90);

      }
    });
  }
  SetValuesforSave() {
    var $this = this;
    let option = [];
    if (this.submoduleName == "LoanApplicationApplicant" || this.submoduleName == "LoanApplicationCoapplicant") {

      let incomeFrequency = this.customCompnentValues.filter(m => m.ColumnName == 'IncomeFreq');
      if (incomeFrequency) {
        if (incomeFrequency[0].select_options) {
          option = incomeFrequency[0].select_options;

        }
      }
    }

    var keys = Object.keys(this.applicantForm.value);
    let loanamt = 0;
    let loanrate = 0;
    let buydownperc = 0;
    let buydownamt = 0;
    let leinfeeperc = 0;
    let leinfeeamt = 0;
    let monthgi = 0;
    let _dti = 0;
    let _regincome = 0;
    let _lastmonthdebt = 0;

    let _incomefreq = '';
    let _otherincome = 0;
    let _otherincomefreq = '';
    let _totalincome = 0;
    keys.forEach(t => {
      let fields;
      let fiieldId;
      try {
        fields = $this.customCompnentValues.filter(function (itm) { return itm.form_controlName == String(t) });
        fiieldId = fields[0].form_field_id;
      } catch (ex) { }
      if (this.submoduleName == "LoanApplicationApplicant" || this.submoduleName == "LoanApplicationCoapplicant") {

        if (String(t).includes("RegularIncome")) {
          if ($this.applicantForm.get(t).value == null) {
            _regincome = 0;
            $this.applicantForm.get(t).setValue('0');
          }
          else {
            _regincome = $this.applicantForm.get(t).value;
          }

        }
        else if (String(t).includes("IncomeFrequency") && !String(t).includes("OtherIncomeFrequency")) {
          if ($this.applicantForm.get(t).value == null) {
            _incomefreq = "Annually";
            let incomefreqval = option.find(m => m.name == _incomefreq).value;
            $this.applicantForm.get(t).setValue(incomefreqval);
          }
          let incomefreval = option.find(m => m.value == $this.applicantForm.get(t).value).name;
          _incomefreq = incomefreval;
          // _incomefreq = $this.applicantForm.get(t).value;

        }
        else if (String(t).includes("OtherMonthlyIncome")) {
          if ($this.applicantForm.get(t).value == null) {
            _otherincome = 0;
            $this.applicantForm.get(t).setValue(_otherincome);
          }
          else {
            _otherincome = $this.applicantForm.get(t).value;
          }

        }
        else if (String(t).includes("IncomeFreq") && !String(t).includes("OtherIncomeFrequency") && !String(t).includes("IncomeFrequency")) {


          if ($this.applicantForm.get(t).value == null) {
            _incomefreq = "Annually";
            let incomefreqval = option.find(m => m.name == _incomefreq).value;
            $this.applicantForm.get(t).setValue(incomefreqval);
          }
          let incomefreval = option.find(m => m.value == $this.applicantForm.get(t).value).name;
          _incomefreq = incomefreval;

        }
        else if (String(t).includes("OtherIncomeFrequency")) {

          if ($this.applicantForm.get(t).value == null) {

            _otherincomefreq = "Annually";
            let otherincomefreqval = option.find(m => m.name == _otherincomefreq).value;
            $this.applicantForm.get(t).setValue(otherincomefreqval);
          }
          else {
            let otherincomefreq = option.find(m => m.value == $this.applicantForm.get(t).value).name;
            _otherincomefreq = otherincomefreq;
            //_otherincomefreq = $this.applicantForm.get(t).value;
          }

        }

        else if (String(t).includes(String(fiieldId) + "_GrossIncome") && !String(t).includes("MonthlyGrossIncome") && !String(t).includes("CombinedMonthlyGrossIncome")) {
          $this.grossincome = t;
          if (_incomefreq == 'Monthly') {
            _regincome = _regincome * 12;

          }
          if (_otherincome > 0) {
            if (_otherincomefreq != 'Annually') {
              _otherincome = parseFloat(_otherincome.toString()) * 12;
            }

          }

          _totalincome = parseFloat(_otherincome.toString()) + parseFloat(_regincome.toString());
          $this.applicantForm.get(t).setValue(_totalincome.toFixed(2));

        }
        else if (String(t).includes("MonthlyGrossIncome") && !String(t).includes("CombinedMonthlyGrossIncome")) {


          let monthlygi = parseFloat(_totalincome.toString()) / 12;


          $this.applicantForm.get(t).setValue(monthlygi.toFixed(2));
          monthgi = monthlygi;

        }
        else if (String(t).includes("LastMonthDebt")) {


          this.monthlydebt = t;
          if ($this.applicantForm.get(t).value == null) { _lastmonthdebt = 0; }
          else {
            _lastmonthdebt = $this.applicantForm.get(t).value;
          }


        }
        else if (String(t).includes(String(fiieldId) + "_DisposableIncome")) {


          let dispinc = parseFloat(monthgi.toString()) - parseFloat(_lastmonthdebt.toString())

          $this.applicantForm.get(t).setValue(dispinc.toFixed(2));


        }
        else if (String(t).includes(String(fiieldId) + "DTI")) {


          if (monthgi == 0) { $this.applicantForm.get(t).setValue(0); }
          else {
            let dtival = (parseFloat(_lastmonthdebt.toString()) / parseFloat(monthgi.toString())) * 100;


            $this.applicantForm.get(t).setValue(dtival.toFixed(2));
          }
        }
        //if (String(t).includes("AmountFinanced")) {
        //  loanamt = $this.applicantForm.get(t).value;

        //}

        //else if (String(t).includes("LoanRate")) {
        //  loanrate = $this.applicantForm.get(t).value;
        //}

        //else if (String(t).includes("BuyDownPercent")) {

        //  buydownperc = $this.applicantForm.get(t).value;
        //}

        //else if (String(t).includes("BuyDownAmount")) {
        //  let ttl = (loanamt * buydownperc) / (100);
        //  buydownamt = parseInt(ttl.toFixed(2));


        //}
        //else if (String(t).includes("LienFeePercentage")) {
        //  if ($this.applicantForm.get(t).value != '') {
        //    leinfeeperc = $this.applicantForm.get(t).value;
        //  }
        //}
        //else if (String(t).includes("LienFeeRate")) {
        //  if (leinfeeperc != 0 && leinfeeperc != null) {
        //    let ttl = (loanamt * leinfeeperc) / (100);
        //    leinfeeamt = parseFloat(ttl.toFixed(3));
        //  }

        //}
        //else if (String(t).includes("DealerFeePercentage")) {
        //  if ($this.applicantForm.get(t).value != '') {
        //    dealerfeeperc = $this.applicantForm.get(t).value;
        //  }
        //}
        //else if (String(t).includes("DealerFeeRate")) {
        //  if (dealerfeeperc != 0 && dealerfeeperc != null) {
        //    let ttl = ((loanamt * dealerfeeperc) / (100)) - buydownamt;
        //    dealerfeeamt = parseFloat(ttl.toFixed(3));
        //  }

        //}
        //else if (String(t).includes("NetFundedAmount")) {
        //  // let loanamt = $this.applicantForm.get("AmountFinanced").value;
        //  // let loanrate = $this.applicantForm.get("LoanRate").value;
        //  let ttl = (((loanamt * loanrate) / 100) / 365) * 31 * 4;
        //  let fundedamt = loanamt - buydownamt - parseFloat(ttl.toFixed(2)) - leinfeeamt;
        //  $this.applicantForm.get(t).setValue(fundedamt.toFixed(3));
        //}

      }
    });
  }

  SetValues() {
    let option = [];
    if (this.submoduleName == "LoanApplicationApplicant" || this.submoduleName == "LoanApplicationCoapplicant") {

      let incomeFrequency = this.customCompnentValues.filter(m => m.ColumnName == 'IncomeFreq');
      if (incomeFrequency) {
        if (incomeFrequency[0].select_options) {
          option = incomeFrequency[0].select_options;
        }
      }
    }

    var $this = this;

    var keys = Object.keys(this.applicantForm.value);
    let _regincome = 0;
    let _incomefreq = '';
    let _otherincome = 0;
    let _otherincomefreq = '';
    let _totalincome = 0;
    let _lastmonthdebt = 0;
    let monthgi = 0;

    keys.forEach(t => {
      let fields;
      let fiieldId;
      try {
        fields = $this.customCompnentValues.filter(function (itm) { return itm.form_controlName == String(t) });
        fiieldId = fields[0].form_field_id;
      } catch (ex) {  console.log(ex.message); }
      if (this.submoduleName == "LoanApplicationApplicant" || this.submoduleName == "LoanApplicationCoapplicant") {

        if (String(t).includes("RegularIncome")) {
          $this.regincome = t;
          if ($this.applicantForm.get(t).value == null) {
            _regincome = 0;
            $this.applicantForm.get(t).setValue(_regincome);
          }
          else {
            _regincome = $this.applicantForm.get(t).value;
          }
        }
        else if (String(t).includes("IncomeFrequency") && !String(t).includes("OtherIncomeFrequency")) {
          $this.incomefreq = t;
          if ($this.applicantForm.get(t).value == null) {
            _incomefreq = "Annually";
            let incomefreqval = option.find(m => m.name == _incomefreq).value;
            $this.applicantForm.get(t).setValue(incomefreqval);
          }
          let incomefreval = option.find(m => m.value == $this.applicantForm.get(t).value).name;
          _incomefreq = incomefreval;

        }
        else if (String(t).includes("IncomeFreq") && !String(t).includes("OtherIncomeFrequency") && !String(t).includes("IncomeFrequency")) {
          $this.incomefreq = t;
          if ($this.applicantForm.get(t).value == null) {
            _incomefreq = "Annually";
            let incomefreqval = option.find(m => m.name == _incomefreq).value;
            $this.applicantForm.get(t).setValue(incomefreqval);
          }
          let incomefreval = option.find(m => m.value == $this.applicantForm.get(t).value).name;
          _incomefreq = incomefreval;

        }
        else if (String(t).includes("OtherMonthlyIncome")) {
          $this.otherincome = t;
          if ($this.applicantForm.get(t).value == null) {
            _otherincome = 0;
            $this.applicantForm.get(t).setValue(_otherincome);
          }
          else {
            _otherincome = $this.applicantForm.get(t).value;
          }

        }
        else if (String(t).includes("OtherIncomeFrequency")) {
          $this.otherincomefreq = t;

          if ($this.applicantForm.get(t).value == null) {
            _otherincomefreq = "Annually";
            let otherincomefreqval = option.find(m => m.name == _otherincomefreq).value;
            $this.applicantForm.get(t).setValue(otherincomefreqval);
          }
          else {
            let otherincomefreval = option.find(m => m.value == $this.applicantForm.get(t).value).name;
            _otherincomefreq = otherincomefreval;
            // _otherincomefreq = $this.applicantForm.get(t).value;
          }

        }
        else if (String(t).includes(String(fiieldId) + "_GrossIncome") && !String(t).includes("MonthlyGrossIncome") && !String(t).includes("CombinedMonthlyGrossIncome")) {

          if (_incomefreq == 'Monthly') {
            _regincome = _regincome * 12;

          }
          if (_otherincome > 0) {
            if (_otherincomefreq != 'Annually') {
              _otherincome = parseFloat(_otherincome.toString()) * 12;
            }

          }

          _totalincome = parseFloat(_otherincome.toString()) + parseFloat(_regincome.toString());
          $this.applicantForm.get(t).setValue(_totalincome.toFixed(2));

        }
        else if (String(t).includes("MonthlyGrossIncome") && !String(t).includes("CombinedMonthlyGrossIncome")) {


          let monthlygi = parseFloat(_totalincome.toString()) / 12;

          $this.applicantForm.get(t).setValue(monthlygi.toFixed(2));
          monthgi = $this.applicantForm.get(t).value;

        }
        else if (String(t).includes("LastMonthDebt")) {


          this.monthlydebt = t;
          if ($this.applicantForm.get(t).value == null) { _lastmonthdebt = 0; }
          else {
            _lastmonthdebt = $this.applicantForm.get(t).value;
          }

        }
        else if (String(t).includes(String(fiieldId) + "_DisposableIncome")) {
          let dispinc = parseFloat(monthgi.toString()) - parseFloat(_lastmonthdebt.toString())
          $this.applicantForm.get(t).setValue(dispinc.toFixed(2));
        }
        else if (String(t).includes(String(fiieldId) + "DTI")) {

          if (monthgi == 0) { $this.applicantForm.get(t).setValue(0); }
          else {
            let dtival = (parseFloat(_lastmonthdebt.toString()) / parseFloat(monthgi.toString())) * 100;

            $this.applicantForm.get(t).setValue(dtival.toFixed(2));
          }
        }
        else if (String(t) == String(fiieldId) + "_YearAtEmp") {
          let $this = this;
          let fieldNameArray = ["PreviousEmployerName", "PreviousOccupation", "PreviousYearAtEmp", "PreviousMonthsAtEmp"]
          let Fields: any[] = [];
          Fields = $this.customCompnentValues.filter(function (itm) { return fieldNameArray.includes(itm.ColumnName); });
          Fields.forEach((item) => {
            if ($this.applicantForm.get(t).value >= 2) {
              $this.applicantForm.get(item.form_controlName).disable();
            } else {
              $this.applicantForm.get(item.form_controlName).enable();
              $this.applicantForm.get(item.form_controlName).setValidators(Validators.required);
            }
          });
        }
        else if (String(t) == String(fiieldId) + "_YearsAtCurrentAddr") {
          let $this = this;
          let fieldNameArray = [];
          if (this.isAdminUser) {
            fieldNameArray = ["PreviousStreetName", "PreviousStateId", "PreviousCity", "PreviousZip"]
          }
          else {
            fieldNameArray = ["YearsatPreviousAddress", "MonthsatPreviousAddress", "PreviousStreetName", "PreviousStateId", "PreviousCity", "PreviousZip"]
          }

          let addrFields: any[] = [];
          addrFields = this.customCompnentValues.filter(function (itm) { return fieldNameArray.includes(itm.ColumnName); });
          addrFields.forEach((item) => {
            if ($this.applicantForm.get(t).value >= 2) {
              $this.applicantForm.get(item.form_controlName).disable();
            }
            else {
              $this.applicantForm.get(item.form_controlName).enable();
            }
          });
        }
      }

      if (this.submoduleName == "LoanApplicationProductInfo") {

        if (String(t).includes("EstimatedFundDate")) {
          if (this.docDate != null) {
            this.maxDateValue.setDate(this.docDate.getDate() + 90);


          }
        }


      }

    });
    let loanamt = 0;
    let loanrate = 0;
    let buydownperc = 0;
    let buydownamt = 0;
    let leinfeeperc = 0;
    let leinfeeamt = 0;
    let dealerfeeperc = 0;
    let dealerfeeamt = 0;

    keys.forEach(t => {

      if (String(t).includes("AmountFinanced")) {

        loanamt = $this.applicantForm.get(t).value;
        $this.AmountFinacedControl = t;
        $this.applicantForm.get("LoanDefaultValue").setValue($this.applicantForm.get(t).value);
        $this.applicantForm.get("HomeLoanDefaultValue").setValue($this.applicantForm.get(t).value);
        //loanamt = $this.applicantForm.get(t).value;
      }
      else if (String(t).includes("LoanTerm")) {
        $this.applicantForm.get("LoanTerm").setValue($this.applicantForm.get(t).value);
      }
      // if (String(t).includes("AmountFinanced")) {

      //   loanamt = $this.applicantForm.get(t).value;
      //   $this.AmountFinacedControl = t;
      //   $this.applicantForm.get("LoanDefaultValue").setValue($this.applicantForm.get(t).value);
      //   $this.applicantForm.get("HomeLoanDefaultValue").setValue($this.applicantForm.get(t).value);
      //   //loanamt = $this.applicantForm.get(t).value;
      // }
      // else if (String(t).includes("LoanTerm")) {
      //   $this.applicantForm.get("LoanTerm").setValue($this.applicantForm.get(t).value);
      // }

      // else if (String(t).includes("LoanRate")) {
      //   $this.applicantForm.get("InterestRate").setValue($this.applicantForm.get(t).value);
      //   loanrate = $this.applicantForm.get(t).value;
      //   $this.LoanRateControl = t;
      // }
      // else if (String(t).includes("PermanentAmout")) {
      //   $this.PermanentAmoutControl = t;
      // }

      //// if (this.submoduleName == "LoanApplicationReleaseFunds") {

      //   if (String(t).includes("BuyDownPercent")) {
      //     $this.BuyDownPercentControl = t;
      //     buydownperc = $this.applicantForm.get(t).value;
      //   }

      //   else if (String(t).includes("BuyDownAmount")) {
      //     $this.BuyDownAmountControl = t;
      //     let ttl = (loanamt * buydownperc) / (100);
      //     buydownamt = parseFloat(ttl.toFixed(3));
      //     $this.applicantForm.get(t).setValue(ttl.toFixed(3));
      //   }
      //   else if (String(t).includes("LienFeePercentage")) {
      //     $this.LienFeePercControl = t;
      //     if ($this.applicantForm.get(t).value != '') {
      //       leinfeeperc = $this.applicantForm.get(t).value;
      //     }
      //   }
      //   else if (String(t).includes("LienFeeRate")) {
      //     if (leinfeeperc != 0 && leinfeeperc != null) {
      //       let ttl = (loanamt * leinfeeperc) / (100);
      //       leinfeeamt = parseFloat(ttl.toFixed(3));
      //       $this.applicantForm.get(t).setValue(leinfeeamt);
      //     }
      //   }
      //   else if (String(t).includes("DealerFeePercentage")) {
      //     $this.DealerFeePercControl = t;
      //     if ($this.applicantForm.get(t).value != '') {
      //       dealerfeeperc = $this.applicantForm.get(t).value;
      //     }
      //   }
      //   else if (String(t).includes("DealerFeeRate")) {
      //     if (dealerfeeperc != 0 && dealerfeeperc != null) {
      //       let ttl = ((loanamt * dealerfeeperc) / (100)) - buydownamt;
      //       dealerfeeamt = parseFloat(ttl.toFixed(3));
      //       $this.applicantForm.get(t).setValue(dealerfeeamt);
      //     }
      //   }
      //   else if (String(t).includes("NetFundedAmount")) {
      //     // let loanamt = $this.applicantForm.get("AmountFinanced").value;
      //     // let loanrate = $this.applicantForm.get("LoanRate").value;
      //     let ttl = ((((loanamt * loanrate) / 100) / 365) * 31) * 4;
      //     let fundedamt = loanamt - buydownamt - parseFloat(ttl.toFixed(3)) - leinfeeamt;
      //     $this.applicantForm.get(t).setValue(fundedamt.toFixed(3));
      //   }

      // }

    });
  }
  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      formvalues.split(',').find((item) => {
        if (item == selval) {
          returnValue = true;

        }
      });
    }
    return returnValue;
  }
  onCheckboxChange(e, groupdisp, controldisp) {

    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.ColumnName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
        let index = this.checkboxdata1.indexOf(updateItem);
        this.checkboxdata1[index].controlvalues = strvalues + "," + e.target.labels[0].innerHTML;
      }
    }
    else {

      let strs = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues.split(",");

      let updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
      //checkboxdatanew.controlvalues = updatedval.toString();
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
      let index = this.checkboxdata1.indexOf(updateItem);
      this.checkboxdata1[index].controlvalues = strs.toString();
      //this.checkboxdata1.push(checkboxdatanew);
      //    this.formControlList[index2].InnerData[index1].value = this.formControlList[index2].InnerData[index1].value + "," + e.target.labels[0].innerHTML;
    }
    //}
    //else {
    //  this.formControlList[index2].InnerData[index1].value=this.removeValue(this.formControlList[index2].InnerData[index1].value, e.target.labels[0].innerHTML, ',');
    //}
    var dd = this.formControlList;

  }
  backStep() {
    this.wizardOutput.emit((this.wizardIndex - 1));
  }
  skipStep() {
    this.wizardOutput.emit((this.wizardIndex + 1));
  }
  onSubmitData() {
    this.SetValuesforSave();
    //this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.applicantForm.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.applicantForm.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });

    if (this.applicantForm.valid) {
      if (this.leadconvert == true && (this.loanid != null || this.loanid == 'undefined' || this.loanid == '')) {
        this.Id = this.loanid;
      }
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);

      this.isSubmitted = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.leadconvert = this.leadconvert;
      this.JsonData.leadid = this.leadconvertedid;
      this.JsonData.docDate = this.estFundDate;
      this.JsonData.FormJsonData = JSON.stringify(this.applicantForm.value);

      // console.log('this.JsonData.FormJsonData', this.JsonData.FormJsonData);


      setTimeout(() => {
        this.loanApplicationService.addEditForm(this.JsonData).subscribe((result: any) => {

          if (result.statusCode == 200) {
            this.isSubmitted = false;

             if (this.itemdata12.stageActive == 1 && this.itemdata12.stageapproved == 0 && this.submoduleName == 'LoanApplicationCoapplicant') {
              this.CreditScoreMannualPullForCoApp.emit();
              setTimeout(() => {
                loanProgress.appyingChanges = Progress.completed;
                this.loanApplicationService.loanProgress.next(loanProgress);
                loanProgress.applyingRules = Progress.start;
                loanProgress.result = result;
                this.loanApplicationService.loanProgress.next(loanProgress);
              }, 1000);
            }
            else {
              if (result.optionalExtraParamersOne == 'true') {
                this.loanApplicationService.isapplicantCreditScore.next("Primary");// no ID

                setTimeout(() => {
                loanProgress.appyingChanges = Progress.completed;
                this.loanApplicationService.loanProgress.next(loanProgress);
                loanProgress.applyingRules = Progress.start;
                loanProgress.result = result;
                  this.loanApplicationService.loanProgress.next(loanProgress);
                }, 1000);
              }
              else {
              loanProgress.appyingChanges = Progress.completed;
              this.loanApplicationService.loanProgress.next(loanProgress);
              loanProgress.applyingRules = Progress.start;
              loanProgress.result = result;
              this.loanApplicationService.loanProgress.next(loanProgress);
              }
            }
            this.isModel = false;
            if (!this.productchange) {
              this.wizardOutput.emit((this.wizardIndex + 1));
              this.ntpemit.emit();
            }
            // this.loanInfoEmit.emit();
            this.GetFormData();
            //}, 1000);
          }
          else {
            //  this.toaster.error(result.responseMessage);
            this.loadSave = false;
            this.isSubmitted = false;

          }
        }, error => {
          this.loadSave = false;
          this.isSubmitted = false;
        })
      }, 2000);
    }
    else {
      this.commonService.validateAllFormFields(this.applicantForm);
      this.loadSave = false;
      this.isSubmitted = false;
    }
  }
  CalculateLoan(event, type: any = null) {
    if (type != null && String(type).includes("AmountFinanced")) {
      this.calculate();
    }
    if (this.submoduleName == "LoanApplicationApplicant" || this.submoduleName == "LoanApplicationCoapplicant") {

      let fields = this.customCompnentValues.filter(function (itm) { return itm.form_controlName == String(event) });
      let fieldId = fields[0].form_field_id;
      if (String(event) == fieldId + "_YearAtEmp") {
        let $this = this;
        let fieldNameArray = ["PreviousEmployerName", "PreviousOccupation", "PreviousYearAtEmp", "PreviousMonthsAtEmp"]
        let Fields: any[] = [];
        Fields = $this.customCompnentValues.filter(function (itm) { return fieldNameArray.includes(itm.ColumnName); });
        Fields.forEach((item) => {
          if ($this.applicantForm.get(event).value >= 2) {
            $this.applicantForm.get(item.form_controlName).disable();
          } else {
            $this.applicantForm.get(item.form_controlName).enable();
            $this.applicantForm.get(item.form_controlName).setValidators(Validators.required);
            $this.applicantForm.controls[item.form_controlName].updateValueAndValidity();
          }
        });
      }
      else if (String(event) == fieldId + "_YearsAtCurrentAddr") {
        let $this = this;
        //let fieldNameArray = ["YearsatPreviousAddress", "MonthsatPreviousAddress", "PreviousStreetName", "PreviousStateId", "PreviousCity", "PreviousZip"]
        let fieldNameArray = [];
        if (this.isAdminUser) {
          fieldNameArray = ["PreviousStreetName", "PreviousStateId", "PreviousCity", "PreviousZip"]
        }
        else {
          fieldNameArray = ["YearsatPreviousAddress", "MonthsatPreviousAddress", "PreviousStreetName", "PreviousStateId", "PreviousCity", "PreviousZip"]
        }
        let addrFields: any[] = [];
        addrFields = this.customCompnentValues.filter(function (itm) { return fieldNameArray.includes(itm.ColumnName); });
        addrFields.forEach((item) => {
          if ($this.applicantForm.get(event).value >= 2) {
            $this.applicantForm.get(item.form_controlName).disable();
            $this.applicantForm.get(item.form_controlName).setValidators(Validators.nullValidator);
            $this.applicantForm.controls[item.form_controlName].updateValueAndValidity();
          }
          else {
            $this.applicantForm.get(item.form_controlName).enable();
          }
        });
      }
    }
  }
  custValidation(control: AbstractControl): { [key: string]: any } | null {
    var value = control.value
    if (value != null && value != "") {
      let selectedDate = moment(value, 'MM/DD/YYYY');
      var today = moment();
      let years = today.diff(selectedDate, 'years');
      if (years < 18) {
        return { 'lessthan18': true };
      }
    } else {
      return { 'required': true };
    }
    return null
  }

  //return (control: AbstractControl): { [key: string]: any } | null =>
  //  control.value?.toLowerCase() === 'blue'
  //    ? null : { wrongColor: control.value };

  validatorRange(controlName, isRequired, dataType, range_from, range_to) {

    if (dataType == 'decimal' && range_from != null) {

      const validators = [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?"), Validators.min(range_from), Validators.max(range_to)];
      this.applicantForm.controls[controlName].setValidators(validators);
      this.applicantForm.controls[controlName].updateValueAndValidity();
    }
    else {
      this.applicantForm.controls[controlName].setValidators(Validators.nullValidator);
      this.applicantForm.controls[controlName].updateValueAndValidity();
    }
  }


  finish() {
    this.onSubmitData();
    this.finishWizard.emit(this.itemdata12);

  }
  calculate() {
    var principal = this.applicantForm.get('LoanDefaultValue').value;
    var term = this.LoanTerm.value;
    var interest = this.InterestRate.value;
    var propertyValue = this.applicantForm.get('HomeLoanDefaultValue').value;
    var tax = this.PropertyTax.value;
    var homeInsurance = this.HomeOwnersInsurance.value;

    this.pi = this.calculatePrincipalAndInterest(principal, interest, term);
    this.pmi = this.calculatePMI(principal);
    this.pt = this.calculatePropertyTax(propertyValue, tax);
    this.hoi = this.calculateHOI(homeInsurance);

    var totalPayment: any = 0;

    if (!isNaN(this.pi)) {
      totalPayment = parseFloat(totalPayment) + parseFloat(this.pi);
    }
    else {
      this.pi = 0;
    }

    if (!isNaN(this.pmi)) {
      totalPayment = parseFloat(totalPayment) + parseFloat(this.pmi);
    }
    else {
      this.pmi = 0;
    }

    if (!isNaN(this.pt)) {
      totalPayment = parseFloat(totalPayment) + parseFloat(this.pt);
    }
    else {
      this.pt = 0;
    }

    if (!isNaN(this.hoi)) {
      totalPayment = parseFloat(totalPayment) + parseFloat(this.hoi);
    }
    else {
      this.hoi = 0;
    }

    this.applicantForm.get("MonthlyInstallment").setValue("$" + this.commonService.formatAmount(totalPayment));
    this.LoadLoanChartData();

  }
  //-----calculate Principal & Interest----------------
  calculatePrincipalAndInterest(loanAmount, interest, terms) {
    interest = interest / 100;     // interest rate
    terms = parseInt(terms) * 12;  // convert Terms in months
    var interestRate = interest / 12; // interest rate per month
    var result = Math.round(loanAmount * interestRate / (1 - (Math.pow(1 / (1 + interestRate), terms))));
    return result;
  }

  //-----calculate PMI----------------
  calculatePMI(loanAmount) {
    var mortageInterest = 0.0043733;
    var result = Math.round(loanAmount * (mortageInterest / 12));
    return result;
  }


  //-----calculate property tax----------------
  calculatePropertyTax(propertyValue, tax) {
    tax = tax / 100;
    var result = Math.round(propertyValue * (tax / 12));
    return result;
  }

  //-----calculate property tax----------------
  calculateHOI(hoi) {
    var result = Math.round(hoi / 12);
    return result;
  }

  get PropertyTax() { return this.applicantForm.get('PropertyTax'); }
  get HomeOwnersInsurance() { return this.applicantForm.get('HomeOwnersInsurance'); }
  get LoanTerm() { return this.applicantForm.get('LoanTerm'); }
  get InterestRate() { return this.applicantForm.get('InterestRate'); }
  get HomeLoanDefaultValue() { return this.applicantForm.get('HomeLoanDefaultValue'); }
  get LoanDefaultValue() { return this.applicantForm.get('LoanDefaultValue'); }
  get MonthlyInstallment() { return this.applicantForm.get('MonthlyInstallment'); }

  LoadLoanChartData() {
    var dataArray: any = [];
    dataArray.push(this.pi);
    dataArray.push(this.pmi);
    dataArray.push(this.hoi);
    dataArray.push(this.pt);
    this.LoanChartdata = {
      labels: ['Principal & Interest', 'PMI', 'HOI', 'Property Taxes'],
      datasets: [
        {
          data: dataArray,
          backgroundColor: [
            "#23A4FF", "#FF6B6B", "#5FB49C", "#776274"
          ],
          hoverBackgroundColor: [
            "#916953", "#28587B", "#F4B701", "#272635"
          ]
        }]
    };
  }
  ShowLoanCalculator() {
    this.showCalculator = !this.showCalculator;
  }

  showDocumentHistory() {
    this.loanApplicationService.getLoanDocslist(this.Id, 'Id', 'desc', 1, 10).subscribe((resp: any) => {
            let document = resp.data.filter(d => d.DocumentStatus == 'FINALIZED' || d.DocumentStatus == 'READY_FOR_SIGNATURE');
              if (document != null) {
        //this.refreshLoanDocsEmit.emit({ pendingCount: resp.data.filter(d => d.DocumentStatus == 'READY_FOR_SIGNATURE').length, signedCount: resp.data.filter(d => d.DocumentStatus == 'FINALIZED').length });
        if (document[0].SourceType == 'SignNow') {
          this.showDocuSignHistoryData = false;
          this.showSignNowHistoryData = true;
          this.loanApplicationService.GetSignNowDocumentHistory(document[0].DocumentId).subscribe(resp1 => {
            this.signNowDocumentHistory = resp1;
          }, err => {

          });
        }

        else {
          this.showSignNowHistoryData = false;
          this.showDocuSignHistoryData = true;
          this.loanApplicationService.GetDocusignDocumentHistory(document[0].DocumentId).subscribe(resp1 => {
            if (resp1 != null && resp1 != undefined) {
              this.docuSignData = resp1;
            }
          }, err => {

          });
        }

      }
    });
  }
}
