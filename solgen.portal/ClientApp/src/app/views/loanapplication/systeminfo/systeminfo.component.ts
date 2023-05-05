import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CommonService, ModuleList } from '../../shared/common.service';
import { LoanapplicationserviceService, JsonData, CheckboxData, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { empty } from 'rxjs';


@Component({
  selector: 'app-systeminfo',
  templateUrl: './systeminfo.component.html',
  styleUrls: ['./systeminfo.component.scss']
})

export class SystemInfoComponent implements OnInit, OnChanges {
  @Input('itemdata12') itemdata12: any;
  sfid: any;
  @Output() ntpemit = new EventEmitter();
  @Output() loanInfoEmit = new EventEmitter<any>();
  kwcap: any;
  saleprice: any;
  downPaymentFormName: string = '';
  costperwat: any;
  salesFormName: string = '';
  isdownpaymentreadonly: boolean = true;
  moduleName = 'finance';
  submoduleName = 'LoanApplicationInfo';
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
  formLoanApplication: FormGroup;
  loadSave = false;
  JsonData: JsonData = new JsonData();
  isSubmitted: boolean = false;
  @Input('IsLACanceledFlag') IsLACanceledFlag: any;
  canEditSalesPrice: boolean = true;
  roleCode: string = "";
  isCompanyAdmin: boolean = false;
  DownPaymentValue: any;
  SalesValue: any;
  TotalSystemCostFormName: string = '';
  TotalSystemCostValue: any;
  dotCount: any;
  checkNumberOnly: any;
  checkString: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private commonService: CommonService, private router: Router, private loanApplicationService: LoanapplicationserviceService, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.roleCode = userdetail.roleCode;
      if (userdetail.userType == "usertypecompanyadmin") {
        this.isCompanyAdmin = true;
      }
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }
  ngOnChanges() {
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

    this.canEditSalesPrice = true;//all can edit the sales price
    this.loanApplicationService.GetApplicationDetails(this.Id, this.companyId, this.userId).subscribe((result: any) => {
      let formdata = this.loanApplicationService.applicationInfo;
      //// console.log("loan detail formdata", formdata)

      //--------Sales Price textbox-----------------------------------
      if (formdata.LoanDocSigned > 0) {
        this.canEditSalesPrice = false;
        //Document is signed...now only these users can edit Superadmin, relationship manager, relationship director, admin
        if (this.isCompanyAdmin) { this.canEditSalesPrice = true; }
        if (this.roleCode == "relationship_manager" || this.roleCode == "relationship_director") {
          this.canEditSalesPrice = true;
        }
      }
      //-------------------------------------------

      if (formdata.IsProductEnable) {

        this.isdownpaymentreadonly = false;
      }
      else {
        this.isdownpaymentreadonly = true;
      }
    });
  }

  ngOnInit() {
    //// console.log('this.itemdata1244', this.itemdata12);
    this.addOrUpdatePermission = false;
    this.usertype = localStorage.getItem("usertype");
    var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
    if (haspermission) {
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

  GetFormData() {
    this.sfid = null;
    this.isModel = false;
    if (this.ntpemit.observers.length > 0) {
      this.isModel = true;
    }
  
    this.loanApplicationService.GetFormFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.loanApplicationService.formFieldsList.data;
        //// console.log('this.customCompnentValuesthis.customCompnentValues', this.customCompnentValues);
        this.customCompnentValues.forEach(t => {

          if (t.ColumnName == 'SFOpportunityId') {
            t.form_field_visibility = 'NO';
            this.sfid = t.value;
          }

          if (t.ColumnName == 'DownPayment') {
            var downPaymentValue = t.value;
            this.DownPaymentValue = downPaymentValue;

            this.downPaymentFormName = t.form_controlName;
          }
          if (t.ColumnName == 'SalesPrice') {
            this.salesFormName = t.form_controlName;
            var salesValue = t.value;
            this.SalesValue = salesValue;
          }
          if (t.ColumnName == 'TotalSystemCost') {
            
            this.TotalSystemCostFormName = t.form_controlName;
          }

          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
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
            if (cnt.value == "") {
              val = null;
            } else {
              let val1 = new Date(cnt.value);
              // // console.log('month', val1.getMonth() + 1);
              val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
            }
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.formLoanApplication.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          (cnt.actual_data_type == "int" && cnt.ColumnName != "HighestCreditScore") ? Validators.pattern("[0-9]{1,9}") : (cnt.actual_data_type == "bigint" && cnt.ColumnName != "HighestCreditScore") ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) : Validators.nullValidator,
          cnt.ColumnName == "HighestCreditScore" ? Validators.pattern(`[-+]?[0-9]{0,9}?[0-9]{1,2}`) : Validators.nullValidator
          ])
        });

        this.formLoanApplication = new FormGroup(group);
        this.loadSave = false;
        this.SetValues('ALL');
        this.formLoanApplication.get(this.kwcap).valueChanges.subscribe(m => {
          //// console.log('kwcap');
          this.SetValues('kwcap');
        });
        this.formLoanApplication.get(this.saleprice).valueChanges.subscribe(m => {
          // console.log('SalesPrice');
          this.SetValues('SalesPrice');

        });
        this.formLoanApplication.get(this.downPaymentFormName).valueChanges.subscribe(m => {
          //// console.log('Downpayment');
          this.SetValues('Downpayment');

        });
      }

      this.canEditSalesPrice = true;//all can edit the sales price
      this.loanApplicationService.GetApplicationDetails(this.Id, this.companyId, this.userId).subscribe((result: any) => {
        let formdata = this.loanApplicationService.applicationInfo;
        //// console.log("loan detail formdata", formdata)

        //--------Sales Price textbox-----------------------------------
        if (formdata.LoanDocSigned > 0) {
          this.canEditSalesPrice = false;
          //Document is signed...now only these users can edit Superadmin, relationship manager, relationship director, admin
          if (this.isCompanyAdmin) { this.canEditSalesPrice = true; }
          if (this.roleCode == "relationship_manager" || this.roleCode == "relationship_director") {
            this.canEditSalesPrice = true;
          }
        }
        //-------------------------------------------

        if (formdata.IsProductEnable) {

          this.isdownpaymentreadonly = false;
        }
        else {
            this.isdownpaymentreadonly = true;
        }
      });
    });
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

  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      // // console.log("formvaluesformvaluesformvalues", formvalues);
      formvalues.split(',').find((item) => {
        if (item == selval) {
          // // console.log('abc');
          returnValue = true;

        }
      });
    }
    return returnValue;
  }


  SetValues(val:string='null') {
    var keys = Object.keys(this.formLoanApplication.value);
    let _kwcap = 0;
    let _costperwat = 0;
    let _systemcost = 0;
    let _saleprice = 0;
    keys.forEach(t => {


      if (String(t).includes("KWCapacity")) {
        this.kwcap = t;
        if (this.formLoanApplication.get(t).value == null) {
          _kwcap = 0;
          this.formLoanApplication.get(t).setValue(_kwcap);
        }
        else {
          _kwcap = this.formLoanApplication.get(t).value;
        }
      }

      else if (String(t).includes("SalesPrice")) {
        this.saleprice = t;
        if (this.formLoanApplication.get(t).value == null) {
          _saleprice = 0;

          this.formLoanApplication.get(t).setValue(_saleprice);
        }
        else {
          _saleprice = this.formLoanApplication.get(t).value;
        }

      }

      if (val == 'SalesPrice' || val == 'kwcap' || val =='ALL') {

        if (String(t).includes("CostPerWatt")) {
          this.costperwat = t;
          if (_kwcap == 0) { this.formLoanApplication.get(t).setValue(0); }
          else {
            _costperwat = parseFloat(_saleprice.toString()) / (parseFloat(_kwcap.toString()) * 1000);
            this.formLoanApplication.get(t).setValue(this.roundDown(_costperwat,2));
          }
        }

      }

      if (val == 'Downpayment') {
         //if (String(t).includes("DownPayment")) {
        var downPaymentValue = Number(this.formLoanApplication.get(this.downPaymentFormName).value);
        var totalSystemCostValue = Number(this.formLoanApplication.get(this.TotalSystemCostFormName).value);

        if (downPaymentValue == undefined || Number.isNaN(downPaymentValue)) {
          downPaymentValue = 0;
        }
        if (totalSystemCostValue == undefined || Number.isNaN(totalSystemCostValue)) {
          totalSystemCostValue = 0;
        }


        //// console.log('downPaymentValue', downPaymentValue);
        //// console.log('totalSystemCostValue', totalSystemCostValue);


        var value = Number(totalSystemCostValue - downPaymentValue);

        //// console.log('value', value);

        if (value > 0) {
          this.formLoanApplication.get(this.salesFormName).setValue(value.toFixed(2));
        }
        else {
          this.formLoanApplication.get(this.salesFormName).invalid;
          this.formLoanApplication.get(this.salesFormName).setValue(value.toFixed(2));
        }


         ////if (val == 'Downpayment') {
         //   if (currentValue != null && currentValue != '' && currentValue != 0) {

         //     //if (Number(this.DownPaymentValue) >= Number(currentValue)) {
         //     // console.log('currentValue', currentValue);
         //     // console.log('TotalSystemCostValue', val1);

         //     var salesvalue1 = val1 - currentValue;
         //     // console.log('salesvalue1', salesvalue1);

         //     this.formLoanApplication.get(this.salesFormName).setValue(salesvalue1.toFixed(2));

         //     //var getsalesvalue = this.formLoanApplication.get(this.salesFormName).value

         //     //var totalvalue = parseFloat(currentValue) + (parseFloat(getsalesvalue));

         //     //this.formLoanApplication.get(this.TotalSystemCostFormName).setValue(totalvalue.toFixed(2));
         //     //}
         //     //else if (Number(this.DownPaymentValue) < Number(currentValue)) {

         //     //var value = parseFloat(this.DownPaymentValue) + (parseFloat(currentValue));
         //     //// console.log('else if', value);

         //     //var totalsales = (parseFloat(this.SalesValue)) - value;

         //     //this.formLoanApplication.get(this.salesFormName).setValue(totalsales.toFixed(2));

         //     //}
         //   }
            //else {
            //  _systemcost = parseFloat(this.SalesValue) + (parseFloat(this.DownPaymentValue));
            //  this.formLoanApplication.get(this.TotalSystemCostFormName).setValue(_systemcost.toFixed(2));

            //  //this.formLoanApplication.get(this.salesFormName).setValue(0.00);
            //  //this.formLoanApplication.get(this.TotalSystemCostFormName).setValue(0.00);

            //}
          //}
        //}
      }

      if (val == 'SalesPrice' || val == 'ALL') {
       if (String(t).includes("TotalSystemCost")) {
        
        var salepriceValue = Number(this.formLoanApplication.get(this.salesFormName).value);
         var downvalue = Number(this.formLoanApplication.get(this.downPaymentFormName).value);


         if (salepriceValue == undefined || Number.isNaN(salepriceValue)) {
           salepriceValue = 0;
         }
         if (downvalue == undefined || Number.isNaN(downvalue)) {
           downvalue = 0;
         }

         //// console.log('downvalue', downvalue);
         //// console.log('salepriceValue', salepriceValue);

      
         if (salepriceValue == 0) {
          //_systemcost = parseFloat(this.DownPaymentValue);

           this.formLoanApplication.get(t).setValue(downvalue.toFixed(2));
        }
        else {

          //if (val == 'Downpayment') {
          //  // console.log('downpaymentzsfsf');
          //  if (downval == '') {
          //    var systemcost1 = parseFloat(this.SalesValue) + (parseFloat(this.DownPaymentValue));
          //    this.formLoanApplication.get(this.salesFormName).setValue(systemcost1.toFixed(2));
          //  }
          //  _systemcost = parseFloat(this.SalesValue) + (parseFloat(this.DownPaymentValue));
          //  this.formLoanApplication.get(t).setValue(_systemcost.toFixed(2));

            

            
          //  //this.formLoanApplication.get(this.salesFormName).setValue(_systemcost.toFixed(2));
          //}
          //else {
           _systemcost = Number(salepriceValue + downvalue);
            this.formLoanApplication.get(t).setValue(_systemcost.toFixed(2));
          //}

        }
        }
      }
      

     

    });

  }
  onCheckboxChange(e, groupdisp, controldisp) {
    // // console.log('new', controldisp);
    //const index2: number = this.formControlList.indexOf(groupdisp);
    //const index1: number = controldisp.display_order;
    this.SetValues();
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


      //  if (this.formControlList[index2].InnerData[index1].value == "") {
      //    this.formControlList[index2].InnerData[index1].value = e.target.labels[0].innerHTML;

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
    // // console.log('this.checkboxdata1this.checkboxdata1', this.checkboxdata1);
    var dd = this.formControlList;

  }
  onSubmitLoanApplication() {


    this.checkboxdata1.forEach((item) => {
      // // console.log(item.controlname);
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.formLoanApplication.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.formLoanApplication.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });

    if (this.formLoanApplication.valid) {

      this.isSubmitted = true;
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);


      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.formLoanApplication.value);

      this.loanApplicationService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //setTimeout(() => {
          // this.toaster.success(result.responseMessage);
          //  this.loadSave = false;
          loanProgress.appyingChanges = Progress.completed;
          this.loanApplicationService.loanProgress.next(loanProgress);
          loanProgress.applyingRules = Progress.start;
          loanProgress.result = result;
          this.loanApplicationService.loanProgress.next(loanProgress);

          this.isSubmitted = false;
          this.isModel = false;
          this.ntpemit.emit();

          //}, 1000);        
        }
        else {
          //// console.log('error', result.responseMessage);
          this.toaster.error(result.responseMessage);
          //this.loadSave = false;
          this.isSubmitted = false;
        }
      }, error => {
        //this.loadSave = false;
        this.isSubmitted = false;
      });
    }
    else {
      this.isSubmitted = false;
      this.commonService.validateAllFormFields(this.formLoanApplication);
      this.loadSave = false;

    }
  }

  removeSpecialCharacters(event: any,type:string) {
    var t = event.target.value.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
    if (type == 'SalesPrice') {
      //this.totalSystemCost.setValue(t);
      this.formLoanApplication.get(this.salesFormName).setValue(t);
    }
    if (type == 'DownPayment') {
      this.formLoanApplication.get(this.downPaymentFormName).setValue(t);
    }
  }
  roundDown(number, decimals) { decimals = decimals || 0; return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals)); }
}
