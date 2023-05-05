import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from '../../manageuser/addedituser.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { LoanapplicationserviceService, JsonData, CheckboxData, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-releasefunds',
  templateUrl: './releasefunds.component.html',
  styleUrls: ['./releasefunds.component.scss']
})
export class ReleasefundsComponent implements OnInit, OnChanges {
  ngOnChanges() {

    if (this.leadconvert) {
      this.Id = this.loanid;

    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
  }

  isBanker: boolean = false;
  isFinancer: boolean = false;
  @Input('loanProductdata') loanProductdata: any;
  @Input('itemdata12') itemdata12: any;
  @Input('leadconvert') leadconvert: any;
  @Input('leadid') leadconvertedid: any;
  @Input('loanid') loanid: any;
  @Input('wizardIndex') wizardIndex: number;
  @Input('totalWizard') totalWizardlength: number;
  @Output() ntpemit = new EventEmitter();
  @Output() wizardOutput = new EventEmitter<number>();
  @Output() finishWizard = new EventEmitter<number>();
  @Output() loanInfoEmit = new EventEmitter<any>();
  moduleName = 'finance';
  //submoduleName = 'LoanApplicationApplicant';
  @Input('submoduleName') submoduleName: any
  companyId: any;
  userId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  checkboxdata1: Array<CheckboxData> = [];
  usertype: string;
  isflag = false;
  isModel = false;
  Id: any = '';
  @Input('IsLACanceledFlag') IsLACanceledFlag: boolean = false;
  customCompnentValues: any;
  formControlList: any[] = [];
  fundreleaseform: FormGroup;
  loadSave = false;
  JsonData: JsonData = new JsonData();
  AmountFinaced = 0;
  LoanRate = 0;
  LienFeePercControl: any;
  LienFeeRateControl: any;
  DealerFeePercControl: any;
  DealerFeeRateControl: any;
  LoanRateControl: any;
  BuyDownPercentControl: any;
  PermanentAmoutControl: any;
  BuyDownAmountControl: any;
  AmountFinacedControl: any;
  //@Input('itemdata12') itemdata12: any;
  //isflag = false;
  //usertype: string;
  //releasefundsForm: FormGroup
  //loadSave = false;
  //releasefundsdata: any;
  //loanappid: any;
  //isDateChanged: any = true;
  //states: any;
  //@Output() ntpemit = new EventEmitter();
  roleCode: string = "";
  SuperAccMangerDirector: boolean = false;
  isDealerUser: boolean = false;
  isRelationshipUser: boolean = false;

  constructor(private router: Router, private userService: ManageUserService, private route: ActivatedRoute, private fb: FormBuilder, private commonService: CommonService, private loanApplicationService: LoanapplicationserviceService,
    private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.roleCode = userdetail.roleCode;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  currentDate = new Date();

  getCurrentDate() {
    return this.currentDate;
  }
  ngOnInit() {

    this.loanApplicationService.loanProductsubject.subscribe(m => {
      //// console.log('this.AmountFinaced', m.length);

      if (m.length > 0) {
        this.AmountFinaced = m[0].AmountFinanced;
        this.LoanRate = m[0].LoanRate;
      }
    });
    this.isBanker = false;
    this.isFinancer = false;
    this.usertype = localStorage.getItem("usertype");
    if (this.usertype.toLocaleLowerCase() == 'usertypebanker') {
      this.isBanker = true;
    }
    if (this.usertype.toLocaleLowerCase() == 'usertypefinance') {
      this.isFinancer = true;
    }
    if (this.usertype.toLocaleLowerCase() == 'usertypecompanyadmin') {
      this.SuperAccMangerDirector = true;
    }
    if (this.usertype.toLocaleLowerCase() === "usertypecommonuser") {
      if (this.roleCode == "Accounting_User" || this.roleCode == "Accounting_Director") {
        this.SuperAccMangerDirector = true;
      }
    }
    //--21 May-------------------------------
    if (this.usertype.toLocaleLowerCase() === "usertypedealer") {
      this.isDealerUser = true;
    }
    else {
      this.isDealerUser = false;
    }

    if (this.usertype.toLocaleLowerCase() === "usertyperelationship") {
      this.isRelationshipUser = true;
    }
    else {
      this.isRelationshipUser = false;
    }

    
      //---------------------------------

    //// console.log('LoanId: ', this.loanApplicationService.loanProductsubject);
    //this.usertype = localStorage.getItem("usertype");
    //var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
    //if (haspermission) {
    //  this.isflag = true;
    //}


    //this.route.paramMap.subscribe(params => {

    //  const id = params.get('id');
    //  if (id) {

    //    this.loanappid = id;

    //    this.fillreleasefundsForm(id);
    //  } else {

    //  }

    //});
    this.addOrUpdatePermission = false;
    this.usertype = localStorage.getItem("usertype");
    if (this.leadconvert != true) {
      var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
      if (haspermission) {
        this.isflag = true;
      }
    }
    if (this.leadconvert == true) {

      this.isflag = true;
    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.Id = id;
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        } else {
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );
    this.GetFormData();
  }

  close() {
    this.isModel = false;
    this.GetFormData();
    this.ntpemit.emit();
  }

  finish() {
    this.onSubmitData();
    this.finishWizard.emit(1);
  }
  GetFormData() {
 
    this.isModel = false;
    if (this.ntpemit.observers.length > 0) {
      this.isModel = true;
    }
    //;
    this.loanApplicationService.GetFormFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.loanApplicationService.formFieldsList.data;

        //// console.log('Fund release', this.customCompnentValues);

        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            var innerData = this.customCompnentValues.filter(x => x.group_id == t.group_id);
            /*innerData.forEach(t => {
             
              if (t.listoptions != null) {
                t.listoptions = this.MakeArray(t.listoptions, t.dt_code);
              }
            });*/
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: innerData
            }
            this.formControlList.push(obj);
          }
        })
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit' || cnt.actual_data_type == 'boolean') {
            val = cnt.value == 1 ? '1' : '0';
          }
          else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
            if (cnt.value == "") {
              val = null;
            } else {
              let val1 = new Date(cnt.value);
              val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
            }
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { this.fundreleaseform.get(item.controlname).setValue(item.controlvalues.split(',')); });
            }
            catch (err) { }
          }

          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") : cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) : Validators.nullValidator
          ])
        });

        this.fundreleaseform = new FormGroup(group);
        this.loadSave = false;
        // this.SetValues();

        //this.fundreleaseform.get(this.BuyDownPercentControl).valueChanges.subscribe(m => {
        //  // console.log('change value333: ', m);

        //  this.SetValues();
        //});

        //this.fundreleaseform.get(this.LienFeePercControl).valueChanges.subscribe(m => {
        //  // console.log('change value444: ', m);
        //  this.SetValues();
        //});

        //this.fundreleaseform.get(this.DealerFeePercControl).valueChanges.subscribe(m => {
        //  // console.log('change wewrrr: ', m);
        //  this.SetValues();
        //});
      }
    });
  }

  SetValues() {

    var $this = this;
    //// console.log('this.fundreleaseform', this.fundreleaseform);
    var keys = Object.keys(this.fundreleaseform.value);
    let loanamt = this.AmountFinaced;
    let loanrate = this.LoanRate;
    let buydownperc = 0;
    let buydownamt = 0;
    let leinfeeperc = 0;
    let leinfeeamt = 0;
    let dealerfeeperc = 0;
    let dealerfeeamt = 0;

    keys.forEach(t => {

      //if (String(t).includes("AmountFinanced")) {

      //  loanamt = $this.fundreleaseform.get(t).value;
      //  $this.AmountFinacedControl = t;
      //  $this.fundreleaseform.get("LoanDefaultValue").setValue($this.fundreleaseform.get(t).value);
      //  $this.fundreleaseform.get("HomeLoanDefaultValue").setValue($this.fundreleaseform.get(t).value);
      //  //loanamt = $this.applicantForm.get(t).value;
      //}
      //else if (String(t).includes("LoanTerm")) {
      //  $this.fundreleaseform.get("LoanTerm").setValue($this.fundreleaseform.get(t).value);
      //}
      //else
      //  if (String(t).includes("LoanRate")) {
      //  $this.fundreleaseform.get("InterestRate").setValue($this.fundreleaseform.get(t).value);
      //  loanrate = $this.fundreleaseform.get(t).value;
      //  $this.LoanRateControl = t;
      //}
      //  else
      //    if (String(t).includes("PermanentAmout")) {
      //  $this.PermanentAmoutControl = t;
      //}

      // if (this.submoduleName == "LoanApplicationReleaseFunds") {

      if (String(t).includes("BuyDownPercent")) {
        $this.BuyDownPercentControl = t;

        buydownperc = $this.fundreleaseform.get(t).value;
      }

      else if (String(t).includes("BuyDownAmount")) {
        $this.BuyDownAmountControl = t;
        let ttl = (loanamt * buydownperc) / (100);
        buydownamt = parseFloat(ttl.toFixed(3));
        $this.fundreleaseform.get(t).setValue(ttl.toFixed(2));
      }
      else if (String(t).includes("LienFeePercentage")) {
        $this.LienFeePercControl = t;
        if ($this.fundreleaseform.get(t).value != '') {
          leinfeeperc = $this.fundreleaseform.get(t).value;
        }
      }
      else if (String(t).includes("LienFeeRate")) {
        if (leinfeeperc != 0 && leinfeeperc != null) {
          let ttl = (loanamt * leinfeeperc) / (100);
          leinfeeamt = parseFloat(ttl.toFixed(3));
          $this.fundreleaseform.get(t).setValue(leinfeeamt);
        }
      }
      else if (String(t).includes("DealerFeePercentage")) {
        $this.DealerFeePercControl = t;
        if ($this.fundreleaseform.get(t).value != '') {
          dealerfeeperc = $this.fundreleaseform.get(t).value;
        }
      }
      else if (String(t).includes("DealerFeeRate")) {
        if (dealerfeeperc != 0 && dealerfeeperc != null) {
          let ttl = ((loanamt * dealerfeeperc) / (100)) - buydownamt;
          dealerfeeamt = parseFloat(ttl.toFixed(3));
          $this.fundreleaseform.get(t).setValue(dealerfeeamt);
        }

      }
      else if (String(t).includes("NetFundedAmount")) {
        // let loanamt = $this.applicantForm.get("AmountFinanced").value;
        // let loanrate = $this.applicantForm.get("LoanRate").value;
        let ttl = ((((loanamt * loanrate) / 100) / 365) * 31) * 4;
        let fundedamt = loanamt - buydownamt - parseFloat(ttl.toFixed(3)) - leinfeeamt;
        $this.fundreleaseform.get(t).setValue(fundedamt.toFixed(2));
      }

      // }

    });
  }

  SetValuesforSave() {
    var $this = this;
    //// console.log('this.fundreleaseform', this.fundreleaseform);
    var keys = Object.keys(this.fundreleaseform.value);
    let loanamt = this.AmountFinaced;
    let loanrate = this.LoanRate;
    let buydownperc = 0;
    let buydownamt = 0;
    let leinfeeperc = 0;
    let leinfeeamt = 0;
    let dealerfeeperc = 0;
    let dealerfeeamt = 0;
    keys.forEach(t => {

      // if (this.submoduleName == "LoanApplicationReleaseFunds") {
      //if (String(t).includes("AmountFinanced")) {
      //  loanamt = $this.fundreleaseform.get(t).value;

      //}

      //else if (String(t).includes("LoanRate")) {
      //  loanrate = $this.fundreleaseform.get(t).value;
      //}

      //else
      if (String(t).includes("BuyDownPercent")) {

        buydownperc = $this.fundreleaseform.get(t).value;
      }

      else if (String(t).includes("BuyDownAmount")) {
        let ttl = (loanamt * buydownperc) / (100);
        buydownamt = parseFloat(ttl.toFixed(3));


      }
      else if (String(t).includes("LienFeePercentage")) {
        if ($this.fundreleaseform.get(t).value != '') {
          leinfeeperc = $this.fundreleaseform.get(t).value;
        }
      }
      else if (String(t).includes("LienFeeRate")) {
        if (leinfeeperc != 0 && leinfeeperc != null) {
          let ttl = (loanamt * leinfeeperc) / (100);
          leinfeeamt = parseFloat(ttl.toFixed(3));
        }

      }
      else if (String(t).includes("DealerFeePercentage")) {
        if ($this.fundreleaseform.get(t).value != '') {
          dealerfeeperc = $this.fundreleaseform.get(t).value;
        }
      }
      else if (String(t).includes("DealerFeeRate")) {
        if (dealerfeeperc != 0 && dealerfeeperc != null) {
          let ttl = ((loanamt * dealerfeeperc) / (100)) - buydownamt;
          dealerfeeamt = parseFloat(ttl.toFixed(3));
        }

      }
      else if (String(t).includes("NetFundedAmount")) {
        // let loanamt = $this.applicantForm.get("AmountFinanced").value;
        // let loanrate = $this.applicantForm.get("LoanRate").value;
        let ttl = (((loanamt * loanrate) / 100) / 365) * 31 * 4;
        let fundedamt = loanamt - buydownamt - parseFloat(ttl.toFixed(3)) - leinfeeamt;
        $this.fundreleaseform.get(t).setValue(fundedamt.toFixed(2));
      }

      //}
    });
  }

  MakeArray(value, type) {
    if (Array.isArray(value)) {
      value = value[0].listoptions;
    }
    var array = [];
    var arr = String(value).split(',');
    if (type == "radio" || type == "checkbox") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          //;
          if (arr[i].split("^").length > 1) {
            var person = { name: arr[i].split("^")[0], value: arr[i].split("^")[1] };
            array.push(person);
          }
          else {
            var person = { name: arr[i], value: arr[i] };
            array.push(person);
          }
        }
      }
    }
    else {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          var person = { name: arr[i], value: arr[i] };
          array.push(person);
        }
      }
    }
    return array;
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
  setradioValue(value, type) {
    if (String(value).split('^').length > 0) {
      if (type == "val") {
        return String(value).split('^')[1];
      }
      else {
        return String(value).split('^')[0];
      }
    }
    else {
      return value;
    }
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
  isSubmitted = false;
  onSubmitData() {

    //this.SetValuesforSave();
    // this.loadSave = true;



    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.fundreleaseform.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.fundreleaseform.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    if (this.fundreleaseform.valid) {

      if (this.leadconvert == true && (this.loanid != null || this.loanid == 'undefined' || this.loanid == '')) {
        this.Id = this.loanid;
        //   var leadidforconversion = this.leadconvertedid
      }

      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);

      //this.loadSave = true;
      this.isSubmitted = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.leadconvert = this.leadconvert;
      this.JsonData.leadid = this.leadconvertedid;
      this.JsonData.FormJsonData = JSON.stringify(this.fundreleaseform.value);

      this.loanApplicationService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          setTimeout(() => {

            // this.toaster.success(result.responseMessage);
            //this.loadSave = false;
            this.isSubmitted = false;
            loanProgress.appyingChanges = Progress.completed;
            this.loanApplicationService.loanProgress.next(loanProgress);
            loanProgress.applyingRules = Progress.start;
            loanProgress.result = result;
            this.loanApplicationService.loanProgress.next(loanProgress);

            this.isModel = false;
            this.wizardOutput.emit((this.wizardIndex + 1));
            this.ntpemit.emit();

            //this.loanInfoEmit.emit(result);
          }, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
          this.isSubmitted = false;
        }
      }, error => {
        this.loadSave = false;
        this.isSubmitted = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.fundreleaseform);
      this.loadSave = false;
      this.isSubmitted = false;

    }
  }
  //fillreleasefundsForm(id) {
  //this.loanApplicationService.GetReleaseFundsInfo(id).subscribe((result: any) => {

  //  this.releasefundsdata = this.loanApplicationService.releaseFundsInfo;

  //  const appid = id;

  //  this.releasefundsForm.patchValue({
  //    loanApplicationId: appid,// this.releasefundsdata[0].LoanApplicationId,
  //    releasedAmount: this.releasefundsdata[0].ReleasedAmount,




  //  })
  //  // console.log("this.releasefundsdata", this.releasefundsdata);
  //});
  //}
  //OnChanged(e) {
  //  this.isDateChanged = true;

  //}
  //close() {
  //  this.ntpemit.emit();
  //}
  //addUpdateReleaseFunds() {
  //  if (this.releasefundsForm.valid) {
  //    this.loadSave = true;
  //    // console.log('FormValue:', this, this.releasefundsForm.value);
  //    this.loanApplicationId.setValue(this.loanappid);
  //    // console.log('FormValuesdsdsdsd:', this.releasefundsForm.value);
  //    this.loanApplicationService.addUpdateReleaseFunds(this.releasefundsForm.value).subscribe((result: any) => {
  //      if (result.statusCode == 200) {
  //        this.toaster.success(result.responseMessage);
  //        setTimeout(() => { this.loadSave = false; }, 3000);
  //        this.ntpemit.emit();
  //      }
  //      else {
  //        this.toaster.error(result.responseMessage);
  //      }
  //    }, error => {
  //      this.loadSave = false;
  //    })
  //  }
  //  else {
  //    this.commonService.validateAllFormFields(this.releasefundsForm);
  //  }
  //}


  //private initForm() {
  //  this.releasefundsForm = this.fb.group({
  //    'loanApplicationId': ['', Validators.nullValidator],

  //    'releasedAmount': ['', [Validators.required, Validators.pattern("[0-9]{1,9}")]],


  //  });
  //}

  //get loanApplicationId() { return this.releasefundsForm.get('loanApplicationId'); }

  //get releasedAmount() { return this.releasefundsForm.get('releasedAmount'); }





}
