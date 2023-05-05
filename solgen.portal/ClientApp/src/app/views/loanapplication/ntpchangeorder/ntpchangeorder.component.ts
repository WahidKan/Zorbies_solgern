import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges, PACKAGE_ROOT_URL } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { LoanapplicationserviceService, JsonData, CheckboxData, Progress, LoanProgressModel } from '../loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-ntpchangeorder',
  templateUrl: './ntpchangeorder.component.html',
  styleUrls: ['./ntpchangeorder.component.scss']
})
export class NtpchangeorderComponent implements OnInit {

  @Input('IsLACanceledFlag') IsLACanceledFlag: boolean = false;
  @Input('ntpStageApproved') ntpStageApproved: boolean = false;
  @Input('CallFrom') CallFrom: string = "STAGE";
  ngOnChanges() {
    if (this.leadconvert) {
      this.Id = this.loanid;
    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }

    if (this.ntpStageApproved) {
      this.showOnApproved = true;
    }
    else {
      this.showOnApproved = false;
    }
  }
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
  @Input('submoduleName') submoduleName: any
  companyId: any;
  userId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  checkboxdata1: Array<CheckboxData> = [];
  usertype: string;
  isformtype: string;
  isflag = false;
  isModel = false;
  Id: any = '';
  ReasonField: any = "";
  customCompnentValues: any;
  formControlList: any[] = [];
  hideReason = true;
  ntpChangeOrderForm: FormGroup;
  MaxLengthForReason: number = 1000;
  loadSave = false;
  JsonData: JsonData = new JsonData();
  showOnApproved: boolean = false;
  fromStage: boolean = false;
  changeOrderData: any[] = [];
  NTPISApprovedFormName: string = '';
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private commonService: CommonService,
    private router: Router, private loanApplicationService: LoanapplicationserviceService, private toaster: ToastrService, private dialogService: ConfirmationDialogService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    //// console.log('itemdata12', this.itemdata12);
    if (this.itemdata12.stageView == 'stageView') {
      this.fromStage = true;
    }
    else {
      this.fromStage = false;
    }
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
          this.GetChangeOrderInfoById(this.Id);
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        } else {
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );
    
    this.GetFormData();
  }


  GetChangeOrderInfoById(id) {
    this.loanApplicationService.GetChangeOrderInfoById(id).subscribe((result: any) => {
      this.changeOrderData = this.loanApplicationService.changeOrderInfo[0].data;
     // this.loanApplicationService.loanappliacntsubject.next(this.changeOrderData.applicant);
    });


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

        //// console.log('ntp co', this.customCompnentValues)

        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            var innerData = this.customCompnentValues.filter(x => x.group_id == t.group_id);
       
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
            if (cnt.name == "IsApproved") {
              this.NTPISApprovedFormName = cnt.form_controlName;

              if (cnt.name == "IsApproved" && cnt.value == "") {
                val = cnt.value == "" ? "1" : "0";
                this.hideReason = false;

              }
              else if (cnt.value == "1") {
                this.hideReason = false;
              }
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
              this.checkboxdata1.forEach((item) => { this.ntpChangeOrderForm.get(item.controlname).setValue(item.controlvalues.split(',')); });
            }
            catch (err) { }
          }

          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }
          if (cnt.name == "Reason") {
            this.ReasonField = cnt.form_controlName;
            this.MaxLengthForReason = cnt.length;
          }
          //// console.log(cnt.length)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") : cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) : Validators.nullValidator,
          ])
        });

        this.ntpChangeOrderForm = new FormGroup(group);
        if (!this.hideReason) {
          this.ntpChangeOrderForm.get(this.ReasonField).setValidators(Validators.nullValidator);
        }
        this.loadSave = false;
      }
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
  setradioValue(value, type, e = null) {


    if (e != null && this.isChanged == false) {
      this.hideReason = (e == '0');
    }

    if (String(value).split('^').length > 0) {
      if (type == "val") {
        if (value.search('^') == -1) {

          return String(value).split('^')[1];
        }
        else {

          if (String(value).includes("Approved")) {
            return "1";
          }
          else {
            return "0";
          }
        }

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
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
      let index = this.checkboxdata1.indexOf(updateItem);
      this.checkboxdata1[index].controlvalues = strs.toString();
    }
    
    var dd = this.formControlList;

  }
  isSubmitted = false;
  onSubmitData() {
    var radioBtnValue = this.ntpChangeOrderForm.get(this.NTPISApprovedFormName).value;

    if (this.hideReason === false) {
      this.ntpChangeOrderForm.controls[this.ReasonField].reset();
    }

  


    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.ntpChangeOrderForm.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.ntpChangeOrderForm.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    if (this.ntpChangeOrderForm.valid) {
        
      //let loanProgress = new LoanProgressModel();
      //loanProgress.appyingChanges = Progress.start;
      //this.loanApplicationService.loanProgress.next(loanProgress);

      if (this.leadconvert == true && (this.loanid != null || this.loanid == 'undefined' || this.loanid == '')) {

        this.Id = this.loanid;
        //   var leadidforconversion = this.leadconvertedid
      }

      this.isSubmitted = true;
      //this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;

      this.JsonData.leadconvert = this.leadconvert;
      this.JsonData.leadid = this.leadconvertedid;
      this.JsonData.FormJsonData = JSON.stringify(this.ntpChangeOrderForm.value);
      var message = '';
      if (radioBtnValue == 1) {
        message = `Are you sure you want Approved NTP(CO)?`;
      }
      else {
        message = `Are you sure you want to Deny NTP(CO)?`;
      }
      this.dialogService.confirm('NTP', message).subscribe(confirmed => {
        if (confirmed) {
          this.loadSave = true;
          this.loanApplicationService.addEditForm(this.JsonData).subscribe((result: any) => {
            if (result.statusCode == 200) {
              setTimeout(() => {
                this.isSubmitted = false;


                //loanProgress.appyingChanges = Progress.completed;
                //this.loanApplicationService.loanProgress.next(loanProgress);
                //loanProgress.applyingRules = Progress.start;
                //loanProgress.result = result;
                //this.loanApplicationService.loanProgress.next(loanProgress);


                this.ntpChangeOrderForm.controls[this.ReasonField].reset();
                this.toaster.success(result.responseMessage);
                this.loadSave = false;
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
          });
        } else {
          this.isSubmitted = false;
          this.loadSave = false;
        }


        //, error => {
        //this.loadSave = false;
        //this.isSubmitted = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.ntpChangeOrderForm);
      this.loadSave = false;
      this.isSubmitted = false;
    }
  }

  skipStep() {
    this.wizardOutput.emit((this.wizardIndex + 1));
  }
  backStep() {
    this.wizardOutput.emit((this.wizardIndex - 1));
  }

  isChanged: boolean = false;
  OnNTPRadioButtonChanged(e) {

    this.hideReason = e.toString() === 'Deny' ? true : false;

    var keys = Object.keys(this.ntpChangeOrderForm.value);
    if (this.hideReason === false) {
      this.ntpChangeOrderForm.controls[this.ReasonField].reset();
      keys.forEach(t => {
        if (String(t).includes("Reason")) {
          this.ntpChangeOrderForm.get(t).setValidators(Validators.nullValidator);
          //this.ntpChangeOrderForm.controls['182_Reason'].setValidators(Validators.nullValidator);
        }
      });
    }
    else {

      keys.forEach(t => {
        if (String(t).includes("Reason")) {
          const validators = [Validators.required, Validators.maxLength(this.MaxLengthForReason)]
          this.ntpChangeOrderForm.get(t).setValidators(validators);

        }
      });
      // this.ntpChangeOrderForm.controls['182_Reason'].setValidators(Validators.required);
    }

    keys.forEach(t => {
      if (String(t).includes("Reason")) {
        this.ntpChangeOrderForm.get(t).updateValueAndValidity();
        //this.ntpChangeOrderForm.controls['182_Reason'].updateValueAndValidity();
      }
    });

    this.isChanged = true;
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

}
