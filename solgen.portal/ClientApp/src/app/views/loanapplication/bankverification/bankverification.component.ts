import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CheckboxData, JsonData, LoanapplicationserviceService, appverificationmdoel, Progress, LoanProgressModel } from '../loanapplicationservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bankverification',
  templateUrl: './bankverification.component.html',
  styleUrls: ['./bankverification.component.scss']
})
export class BankverificationComponent implements OnInit {
  @Input('IsLACanceledFlag') IsLACanceledFlag: boolean = false;
  @Input('SourceType') SourceType: any;
  @Input('DealerName') DealerName: any;
  
  ngOnChanges() {
    // console.log('LoanId: ', this.loanid);
    if (this.leadconvert) {
      this.Id = this.loanid;

    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
  }
  _IsCoApplicantRequired= false;
  isdone = false;
  grossinc: any;
  cogrossinc: any;


  monthlygrossinc: any;
  monthlycogrossinc: any;


  @Input('itemdata12') itemdata12: any;
  @Input('formtype') formtype: any;
  @Input('leadconvert') leadconvert: any;
  @Input('leadid') leadconvertedid: any;
  @Input('loanid') loanid: any;
  @Output() ntpemit = new EventEmitter();
  @Input('wizardIndex') wizardIndex: number;
  @Input('totalWizard') totalWizardlength: number;
  @Output() wizardOutput = new EventEmitter<number>();
  @Output() finishWizard = new EventEmitter<number>();
  @Output() loanInfoEmit = new EventEmitter<any>();
  moduleName = 'finance';
  //submoduleName = 'LoanApplicationApplicant';
  @Input('submoduleName') submoduleName: any
  companyId: any;
  userId: any;
  docinfo: any;
  selectAllValue: boolean = false;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  checkboxdata1: Array<CheckboxData> = [];
  usertype: string;
  isformtype: string;
  isflag = false;
  isModel = false;
  lstpagearray: appverificationmdoel[] = [];
  Id: any = '';
  MaxLengthForReason: number = 1000;
  customCompnentValues: any;
  formControlList: any[] = [];
  hideReason = false;
  ntpForm: FormGroup;
  loadSave = false;
  JsonData: JsonData = new JsonData();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private commonService: CommonService, private router: Router, private loanApplicationService: LoanapplicationserviceService, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    //// console.log('formtype', this.formtype);
    this.isformtype = this.formtype;
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

    this.loanApplicationService.GetFormFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.loanApplicationService.formFieldsList.data;

        //// console.log('Bank Verification data:', this.customCompnentValues);

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
        //// console.log('this.customCompnentValues', this.customCompnentValues);
        this.customCompnentValues.forEach(cnt => {
          let val = null;

          if (cnt.actual_data_type == 'bit' || cnt.actual_data_type == 'boolean') {
            val = cnt.value == '1' ? '1' : '0';

            if (val == '0') {
              this.hideReason = true;
            }
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
              this.checkboxdata1.forEach((item) => { this.ntpForm.get(item.controlname).setValue(item.controlvalues.split(',')); });
            }
            catch (err) { }
          }

          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }
          if (cnt.name == "Reason") {
            if (this.hideReason) {
              cnt.is_required = true;
            }
            else {
              cnt.is_required = false;
            }
            this.MaxLengthForReason = cnt.length;
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") : cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) : Validators.nullValidator
          ])
        });

        this.ntpForm = new FormGroup(group);
        this.loanApplicationService.GetDataForBankVerificationList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.itemdata12.loan_app_stage_id).subscribe((result: any) => {
          if (result) {
            try {


              this.docinfo = this.loanApplicationService.formFieldsList;

              this.selectAllValue = (this.docinfo as any[]).filter(s => s.IsVerified == true && s.IsRequired == true).length == ((this.docinfo as any[]).filter(s => s.IsRequired == true).length)



              this.docinfo.forEach(x => {
                let objitem = new appverificationmdoel();
                objitem.id = x.Id;
                objitem.values = x.IsVerified == true ? '1' : '0';
                objitem.type = x.Type;
                objitem.isrequired = x.IsRequired;
                objitem.isVerified = x.IsVerified;
                this.lstpagearray.push(objitem);
              });
            }
            catch (err) { this.docinfo = null; }
            this.isdone = false;

            this.lstpagearray.forEach(x => {
            
              if (x.isrequired == true && x.values == '0') {
                this.isdone = true;
              }
            });
            //// console.log('this.formControlListthis.formControlList', this.lstpagearray);

            //this.verificationform = new FormGroup(this.customCompnentValues);
            this.loadSave = false;

          }
          else {
            this.docinfo = null;
          }
          this.SetValues();
          this.SetValuesAfterChange();
          this.ntpForm.get(this.monthlygrossinc).valueChanges.subscribe(m => {
            //// console.log('3343444', this.monthlygrossinc)
            this.SetValues();
            this.SetValuesAfterChange();

          });
          this.ntpForm.get(this.monthlycogrossinc).valueChanges.subscribe(m => {
            //// console.log('3343')
            this.SetValues();
            this.SetValuesAfterChange();

          });
          this.loadSave = false;
        });
        
        
      }
    });
  }

  SetValues() {
   
    let _lastmonthdata = 0;
    let _colastmonthdata=0
    var $this = this;

    var keys = Object.keys(this.ntpForm.value);
    //// console.log('keys::', keys)

    let _regincome = 0;
    let monthlygi = 0;
    let _coregincome = 0;
    let comonthlygi = 0;
    keys.forEach(t => {
      //// console.log('ererer', t);

      let fields;
      let fiieldId;
      try {
        fields = $this.customCompnentValues.filter(function (itm) { return itm.form_controlName == String(t) });
        fiieldId = fields[0].form_field_id;
      } catch (ex) { }
     

      if (String(t)===(String(fiieldId) + "_VerifiedMonthlyGrossIncome")) {

        //// console.log('inf', t + '--' + fiieldId);

        this.monthlygrossinc = t;
        if (this.ntpForm.get(t).value == null) {
          monthlygi = 0;
          this.ntpForm.get(t).setValue(monthlygi);
        }
        else {
          monthlygi = this.ntpForm.get(t).value;
        }

        this.setVerifiedMonthlyGrossIncome(monthlygi, _regincome, "_VerifiedGrossIncome");       
      }

      else if (String(t) === (String(fiieldId) + "_VerifiedGrossIncome")) {
        this.setVerifiedMonthlyGrossIncome(monthlygi, _regincome, "_VerifiedGrossIncome");
      }

      else if (String(t).endsWith("VerifiedDTI")) {
        if (monthlygi == 0) { this.ntpForm.get(t).setValue(0); }
        else {
          let dtival = (parseFloat(_lastmonthdata.toString()) / parseFloat(monthlygi.toString())) * 100;

          //// console.log('dtival', dtival)
          this.ntpForm.get(t).setValue(dtival.toFixed(2));
        }
      }

      else if (String(t).endsWith("CoVerifiedDTI")) {
        if (comonthlygi == 0) { this.ntpForm.get(t).setValue(0); }
        else {
          let dtival = (parseFloat(_colastmonthdata.toString()) / parseFloat(comonthlygi.toString())) * 100;
          this.ntpForm.get(t).setValue(dtival.toFixed(2));
        }
      }

      if (String(t).includes(String(fiieldId) + "_CoVerifiedMonthlyGrossIncome")) {
        this.monthlycogrossinc = t;
        if (this.ntpForm.get(t).value == null) {
          comonthlygi = 0;
          this.ntpForm.get(t).setValue(comonthlygi);
        }
        else {
          comonthlygi = this.ntpForm.get(t).value;
        }
        this.setVerifiedMonthlyGrossIncome(comonthlygi, _regincome, "_CoVerifiedGrossIncome");    
      }
      else if (String(t).includes(String(fiieldId) + "_CoVerifiedGrossIncome")) {
        this.setVerifiedMonthlyGrossIncome(comonthlygi, _regincome, "_CoVerifiedGrossIncome");
      }
    });
    
  }

  SetValuesAfterChange() {

    let _lastmonthdata = 0;
    let _colastmonthdata = 0
   
    this.loanApplicationService.GetbankApplicantInfo(this.Id).subscribe((result: any) => {
    
      let apppldata = this.loanApplicationService.applicantInfo[0].applicant;

      

      let coapppldata = this.loanApplicationService.applicantInfo[0].coapplicant;
     
      if (coapppldata != '')
      {
        _colastmonthdata = coapppldata[0].LastMonthDebt;
      }
      _lastmonthdata = apppldata[0].LastMonthDebt;
      //// console.log('_lastmonthdata', apppldata);
      this._IsCoApplicantRequired = apppldata[0].IsCoApplicantRequired;
   
    var keys = Object.keys(this.ntpForm.value);
    let _regincome = 0;
      let monthlygi = 0;
      let _coregincome = 0;
      let comonthlygi = 0;
      keys.forEach(t => {
        //// console.log('value of t', t);

        if (String(t).endsWith("_VerifiedMonthlyGrossIncome")) {
          //// console.log('_VerifiedMonthlyGrossIncome', t);
          this.monthlygrossinc = t;
          if (this.ntpForm.get(t).value == null) {
            monthlygi = 0;
            this.ntpForm.get(t).setValue(monthlygi);
          }
          else {
            monthlygi = this.ntpForm.get(t).value;
          }
          this.setVerifiedMonthlyGrossIncome(monthlygi, _regincome, '_VerifiedGrossIncome')


        }
        else if (String(t).endsWith("_VerifiedGrossIncome")) {
          this.setVerifiedMonthlyGrossIncome(monthlygi, _regincome,'_VerifiedGrossIncome')
        }


      else if (String(t).includes("VerifiedDTI") && !String(t).includes("CoVerifiedDTI")) {
        if (monthlygi == 0) { this.ntpForm.get(t).setValue(0); }
        else {
          let dtival = (parseFloat(_lastmonthdata.toString()) / parseFloat(monthlygi.toString())) * 100;
          this.ntpForm.get(t).setValue(dtival.toFixed(2));
        }
        }

        if (String(t).endsWith("_CoVerifiedMonthlyGrossIncome")) {
          //// console.log('_CoVerifiedMonthlyGrossIncome', t);
          this.monthlygrossinc = t;
          if (this.ntpForm.get(t).value == null) {
            comonthlygi = 0;
            this.ntpForm.get(t).setValue(monthlygi);
          }
          else {
            comonthlygi = this.ntpForm.get(t).value;
          }
          this.setVerifiedMonthlyGrossIncome(comonthlygi, _regincome, '_CoVerifiedGrossIncome')


        }
        else if (String(t).endsWith("_CoVerifiedGrossIncome")) {
         
          this.setVerifiedMonthlyGrossIncome(comonthlygi, _regincome, '_CoVerifiedGrossIncome')
        }

      else if (String(t).includes("CoVerifiedDTI") ) {


        if (comonthlygi == 0) { this.ntpForm.get(t).setValue(0); }
        else {
          let dtival = (parseFloat(_colastmonthdata.toString()) / parseFloat(comonthlygi.toString())) * 100;


          this.ntpForm.get(t).setValue(dtival.toFixed(2));
        }
      }
    });
    });

  }

  setVerifiedMonthlyGrossIncome(monthlygi, _regincome, name) {

    //// console.log('in 1: ', name);
    let keys = Object.keys(this.ntpForm.controls).filter(s => s.endsWith(name))[0];
    //// console.log('in kets: ', this.ntpForm.get(keys));
    if (monthlygi.toString() != '') {
      _regincome = parseFloat(monthlygi.toString()) * 12;
      this.ntpForm.get(keys).setValue(_regincome.toFixed(2));
    } else {
      this.ntpForm.get(keys).setValue(0.00);
    }
    //// console.log('in value', this.ntpForm.get(keys).value);
  }
 
  setvalues(e, id, type) {
   
    //if (e.target.checked) {
    //  let obj2 = new appverificationmdoel();
    //  obj2.id = id;
    //  obj2.values = '1';
    //  obj2.type = type;
    //  let ind = this.lstpagearray.findIndex(m => m.id == id);
    //  if (ind == -1) {
    //    this.lstpagearray.push(obj2);
    //  }
    //  else {
    //    this.lstpagearray[ind].values = '1'
    //  }
    //} else {
    //  let obj2 = new appverificationmdoel();
    //  obj2.id = id;
    //  obj2.values = '0';
    //  obj2.type = type;
    //  let ind = this.lstpagearray.findIndex(m => m.id == id);
    //  if (ind == -1) {
    //    this.lstpagearray.push(obj2);
    //  }
    //  else {
    //    this.lstpagearray[ind].values = '0'
    //  }
    //}

    var ifAllDocCheck = true;
    this.lstpagearray = [];
    this.docinfo.forEach(x => {
      if (x.IsRequired == true) {
        if (!x.IsVerified) {
          ifAllDocCheck = false;
        }
        let obj2 = new appverificationmdoel();
        obj2.id = x.Id;
        obj2.values = (x.IsVerified == true) ? '1' : '0';
        obj2.type = x.Type;
        obj2.isrequired = x.IsRequired;
        obj2.isVerified = x.IsVerified
        this.lstpagearray.push(obj2);
      }

      
    });
    //// console.log('this.lstpagearray', this.lstpagearray);
    if (ifAllDocCheck == true) {
      this.selectAllValue = true;
    } else {
      this.selectAllValue = false;
    }

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
        if (value.search('^') == -1) {
          return String(value).split('^')[1];
        }
        else {

          if (String(value).includes("Yes")) {

            return "1";
          }
          else {

            return "0";
          }
        }

      }
      else {
        return String(value);
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
   isSubmitted = false;
  onSubmitData() {
    
    if (this.hideReason === false) {

      var keys = Object.keys(this.ntpForm.value);
      if (this.hideReason === false) {

        keys.forEach(t => {
          if (String(t).includes("Reason")) {
            this.ntpForm.get(t).reset()
            //this.ntpForm.controls['182_Reason'].setValidators(Validators.nullValidator);
          }
        });
      }

    }

    //this.loadSave = true;
   

    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.ntpForm.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.ntpForm.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    let isverified = true;
    //if (this.hideReason === false) {
      //if (this.lstpagearray.length > 0) {
        let ind = this.lstpagearray.filter(m => m.isrequired == true && m.values == '0');
        if (ind.length > 0) {
          isverified = false;
        }
     // }
      //else {
       // isverified = false;
     // }
    //}
    if (!isverified) {
      this.toaster.error("Please select the required fields for completion of this stage");
    }
    else

      if (this.ntpForm.valid) {
        let loanProgress = new LoanProgressModel();
        loanProgress.appyingChanges = Progress.start;
        this.loanApplicationService.loanProgress.next(loanProgress);
        this.isSubmitted = true;
       // this.loadSave = true;
      if (this.leadconvert == true && (this.loanid != null || this.loanid == 'undefined' || this.loanid == '')) {

        this.Id = this.loanid;
        //   var leadidforconversion = this.leadconvertedid
      }
      

      //this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;

      this.JsonData.leadconvert = this.leadconvert;
      this.JsonData.leadid = this.leadconvertedid;
        this.JsonData.SourceType = this.SourceType;
        this.JsonData.DealerName = this.DealerName;
      this.JsonData.FormJsonData = JSON.stringify(this.ntpForm.value);

      this.loanApplicationService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {

          this.JsonData.FormJsonData = JSON.stringify(this.lstpagearray);

          this.loanApplicationService.addEditbankverificationdata(this.JsonData).subscribe((result: any) => {

            setTimeout(() => {

              this.toaster.success(result.responseMessage);


            }, 1000);
            this.JsonData.FormJsonData = JSON.stringify(this.lstpagearray);
            this.loanApplicationService.addEditbankverificationdata(this.JsonData).subscribe((result: any) => {
              this.isSubmitted = false;
              
              //this.loadSave = false;
              loanProgress.appyingChanges = Progress.completed;
              this.loanApplicationService.loanProgress.next(loanProgress);
              loanProgress.applyingRules = Progress.start;
              loanProgress.result = result;
              this.loanApplicationService.loanProgress.next(loanProgress);

              this.isModel = false;
              this.wizardOutput.emit((this.wizardIndex + 1));
              this.ntpemit.emit();

              // this.loadSave = false;
              this.isModel = false;
              this.wizardOutput.emit((this.wizardIndex + 1));
              this.ntpemit.emit();
              // this.loanInfoEmit.emit(result);


            });
          })
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
      this.commonService.validateAllFormFields(this.ntpForm);
      this.loadSave = false;

    }
  }
  skipStep() {
    this.wizardOutput.emit((this.wizardIndex + 1));
  }
  backStep() {
    this.wizardOutput.emit((this.wizardIndex - 1));
  }
  OnNTPRadioButtonChanged(e: string) {

    //// console.log('e.toString()', e);
    //if (e.toString().toLowerCase() === 'no') {
    //  alert(1);
    //}
    // alert(e)


    this.hideReason = (e == "Yes" ? false : true);
    //// console.log('this.hideReason()', this.hideReason);
    var keys = Object.keys(this.ntpForm.value);
    if (this.hideReason === false) {

      keys.forEach(t => {
        if (String(t).includes("Reason")) {
          this.ntpForm.get(t).setValidators(Validators.nullValidator);
          this.ntpForm.get(t).updateValueAndValidity();
          //this.ntpForm.controls['182_Reason'].setValidators(Validators.nullValidator);
        }
      });
    }
    else {

      keys.forEach(t => {
        if (String(t).includes("Reason")) {
          const validators = [Validators.required, Validators.maxLength(this.MaxLengthForReason)];
          this.ntpForm.get(t).setValidators(validators);
          this.ntpForm.get(t).updateValueAndValidity();
        }
      });
      // this.ntpForm.controls['182_Reason'].setValidators(Validators.required);
    }

    //keys.forEach(t => {
    //  if (String(t).includes("Reason")) {
    //    this.ntpForm.get(t).updateValueAndValidity();
    //    //this.ntpForm.controls['182_Reason'].updateValueAndValidity();
    //  }
    //});

  }
  getVisibilityStatus(name): boolean {

    if (name.toString() == 'Reason') {
      if (this.hideReason == true) {
        return true;
      }
      return false;
    }
    else {
      return true;
    }
  }

  //selectAllDocs(e: any) {
  //  this.lstpagearray = [];
  //  this.docinfo.forEach(x => {
  //    let obj2 = new appverificationmdoel();
  //    obj2.id = x.Id;
  //    obj2.values = (e.target.checked && x.IsRequired == true) ? '1' : '0';
  //    obj2.type = x.Type;
  //    x.IsVerified = (x.IsRequired) ? e.target.checked : false;
  //    obj2.isrequired = x.IsRequired;
  //    this.lstpagearray.push(obj2);
  //  });
  //}


  selectAllDocs(e: any) {
    this.lstpagearray = [];
    this.docinfo.forEach(x => {
      if (x.IsRequired == true) {
        x.IsVerified = this.selectAllValue;
        let obj2 = new appverificationmdoel();
        obj2.id = x.Id;
        obj2.values = (this.selectAllValue && x.IsRequired == true) ? '1' : '0';
        obj2.type = x.Type;
        obj2.isrequired = x.IsRequired;
        obj2.isVerified = (x.IsRequired) ? this.selectAllValue : false;
        this.lstpagearray.push(obj2);
      }
    });
    //// console.log('this.lstpagearray', this.lstpagearray);
  }



}


