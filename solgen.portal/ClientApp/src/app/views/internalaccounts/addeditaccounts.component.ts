/// <reference path="../loanapplication/loanapplication.module.ts" />
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList, SelectItemModel } from '../shared/common.service';
import { AccountserviceService, JsonData, CheckboxData } from './accountservice.service';
import { Location } from '@angular/common';
import { ScriptService } from '../shared/scriptservice.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { DatePipe } from '@angular/common'
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { debug } from 'console';
declare var google: any;
@Component({
  selector: 'app-addeditaccounts',
  templateUrl: './addeditaccounts.component.html',
  styleUrls: ['./addeditaccounts.component.scss'],
  providers: [AccountserviceService, DatePipe]
})
export class AddeditaccountsComponent implements OnInit {
  @ViewChild('mapLocation', { static: false }) mapLocation: ModalDirective;
  @ViewChild('fileInput', { static: false }) fileInput;
  dealerTypeData: any = null;
  fundform: FormGroup;
  stateDDL: any;
  geocoder: any;
  config: any[] = [];
  isBank = false;
  banktype = false;
  control: any;
  pageTitle: any;
  fileName: any;
  companyLogo: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'account';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  imageLink: any = '';
  loadSave = false;
  id: any = '0';
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  displayType = 'ADD';
  isFirst: boolean = false;
  options: any;
  isdelare = false;
  overlays: any[];
  // checkboxdata1: CheckboxData[];
  //modulePermission: ModuleList;
  addOrUpdatePermission: boolean = false;

  modulePermission: any[] = [];
  isUpdate: boolean = false;
  isAdd: boolean = false;
  scrollDataList: any;
  custom_field_id: any;
  len: any;
  field_code: any;
  searchText: string;
  accountCompName: string = "";
  showSplitPercentage: boolean = false;
  hideSplitPercentage: boolean = false;
  showUtilityInfo: boolean = false;
  showdisabletoggel: boolean = false;
  contentHeader: object;
  executionFlow: any[] = [];
  states: any;
  roleName: any;
  rolueRoute: any;
  userName: any = '';
  timeFormat: any;
  constructor(public datepipe: DatePipe, private fb: FormBuilder, private dynamicScripts: ScriptService, private accountService: AccountserviceService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private location: Location, private dialogService: ConfirmationDialogService) {
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    this.accountCompName = "";
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {

      this.addOrUpdatePermission = true;
    }


    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });

    this.commonService.getMasterItemsList("State").subscribe((result: any) => {
      this.stateDDL = this.commonService.masters;
      console.log('this.stateDDL', this.stateDDL);
    });
    this.dynamicScripts.load('map');
  }
  showgroup(data: any) {
    var _flag = false;
    //  let newjson = JSON.parse(data);
    data.forEach(function (t) {
      if (t.form_field_visibility === 'YES') {
        _flag = true;
      }
    });
    return _flag;
  }
  setCompanyName(e, formControlList) {

    let accname = e.target.value;
    accname = accname.replace(/ /g, "");
    this.accountCompName = accname;
    let companyFieldName;
    formControlList.forEach(function (t1) {
      let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
      groupCheck[0].InnerData.forEach(function (t) {
        if (t.ColumnName == 'dealer_company_name') {
          companyFieldName = t.form_controlName;
          // this.form.get(t.form_controlName).patchValue(accname);
          // this.formControlList.get(t).setValue(accname);
          // formControlList.get(t.form_controlName).setValue(accname);
          // this.form.get(t.form_controlName).setValue(accname);

        }
      });
    });
    if (this.form.get(companyFieldName) != null) {
      this.form.get(companyFieldName).setValue(accname);
    }
    //if (this.form.get('1658_dealercompanyname') != null) {
    //  this.form.get('1658_dealercompanyname').setValue(accname);
    //}
  }
  removeSpaceCompanyName(e, formControlList) {

    let accname = e.target.value;
    accname = accname.replace(/ /g, "");
    this.accountCompName = accname;
    let companyFieldName;
    formControlList.forEach(function (t1) {
      let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
      groupCheck[0].InnerData.forEach(function (t) {
        if (t.ColumnName == 'dealer_company_name') {
          companyFieldName = t.form_controlName;
          // this.form.get(t.form_controlName).patchValue(accname);
          // this.formControlList.get(t).setValue(accname);
          // formControlList.get(t.form_controlName).setValue(accname);
          // this.form.get(t.form_controlName).setValue(accname);

        }
      });
    });
    if (this.form.get(companyFieldName) != null) {
      this.form.get(companyFieldName).setValue(accname);
    }
    //if (this.form.get('1658_dealercompanyname') != null) {
    //  this.form.get('1658_dealercompanyname').setValue(accname);
    //}
  }
  updateValidator(formControlName) {

  }

  checkbank(e?, formControlList?) {

    if (e) {
      ;
      var keys = Object.keys(this.form.value);
      //------------Update Validations in Form Control------------------------------------
      if (e.target.textContent != "") {
        if (e.target.textContent == 'Dealer' || e.target.textContent == 'Sub Dealer') {
          //this.isdelare = true;
          keys.forEach(t => {
            if (String(t).includes("dealer_fee_percentage")) {
              this.form.get(t).setValidators([Validators.required]);
              this.form.get(t).updateValueAndValidity();
            }
            else if (String(t).includes("dealer_num_of_months")) {
              this.form.get(t).setValidators([Validators.required]);
              this.form.get(t).updateValueAndValidity();
            }
            else if (String(t).includes("dealer_company_name")) {
              this.form.get(t).setValidators([Validators.required]);
              this.form.get(t).updateValueAndValidity();
            }
            else if (String(t).includes("Funding_date")) {
              this.form.get(t).setValidators([Validators.required]);
              this.form.get(t).updateValueAndValidity();
            }
          });
        } else if (e.target.textContent != "Standard") {
          keys.forEach(t => {
            if (String(t).includes("Hours_from_Warehouse")) {
              this.form.get(t).setValidators(null);
              this.form.get(t).updateValueAndValidity();
            }
            if (String(t).includes("OwnerId")) {
              this.form.get(t).setValidators(null);
              this.form.get(t).updateValueAndValidity();
            }
          });
        }
        else {

          this.isdelare = false;
          keys.forEach(t => {
            if (String(t).includes("dealer_fee_percentage")) {
              this.form.get(t).setValidators([Validators.nullValidator]);
              this.form.get(t).updateValueAndValidity();
            }
            else if (String(t).includes("dealer_num_of_months")) {
              this.form.get(t).setValidators([Validators.nullValidator]);
              this.form.get(t).updateValueAndValidity();
            }
            else if (String(t).includes("dealer_company_name")) {
              this.form.get(t).setValidators([Validators.nullValidator]);
              this.form.get(t).updateValueAndValidity();
            }
            else if (String(t).includes("Funding_date")) {
              this.form.get(t).setValidators([Validators.nullValidator]);
              this.form.get(t).updateValueAndValidity();
            }
          });
        }
        //------------------------------------------------------------------------



        let companyFieldName: any;
        formControlList.forEach(function (t1) {
          let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
          groupCheck[0].InnerData.forEach(function (t) {
            if (t.ColumnName == 'RecordTypeId') {
              return;
            }
            t.form_field_visibility = 'YES';
            t.edit_form_field_visibility = 'YES';

            if (t.ColumnName == 'Utility_Variable_Base_Price' || t.ColumnName == 'Email_Address' || t.ColumnName == 'Utility_Fixed_Base_Price' || t.ColumnName == 'Utility_Information_Active'
              || t.ColumnName == 'Electric_Rate' || t.ColumnName == 'Utility_Information_States' || t.ColumnName == 'Inflation_Rate' || t.ColumnName == 'Production_Meter_Required') {

              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
            }

            if (t.ColumnName == 'SecurityType' || t.ColumnName == 'UCCFilingFee') {
              if (e.target.textContent == "Banker") {
                t.form_field_visibility = 'YES';
                t.edit_form_field_visibility = 'YES';
                //this.isdelare = false;
              }
              else if (e.target.textContent == "Standard") {
                t.form_field_visibility = 'NO';
                t.edit_form_field_visibility = 'NO';
                //this.isdelare = false;
              }
              //-------19 April ------------
              else if (e.target.textContent == "Dealer" || e.target.textContent == 'Sub Dealer') {
                t.form_field_visibility = 'NO';
                t.edit_form_field_visibility = 'NO';
                //this.isdelare = true;
              }
              else if (e.target.textContent == "Jurisdiction") {
                t.form_field_visibility = 'NO';
                t.edit_form_field_visibility = 'NO';
                //this.isdelare = true;
              }
            }
            //----------19 April ---------------
            else if (t.ColumnName == 'Phone' || t.ColumnName == 'dealerfeepercentage' || t.ColumnName == 'Funding_date' || t.ColumnName == 'dealer_fee_percentage' || t.ColumnName == 'four_month_payment' || t.ColumnName == 'dealer_num_of_months' || t.ColumnName == 'dealer_code' || t.ColumnName == 'dealer_logo' || t.ColumnName == 'dealer_company_name' || t.ColumnName == 'relationship_manager' || t.ColumnName == 'funding_options' || t.ColumnName == 'send_Text_Email_ToCustomer' || t.ColumnName == 'IsSendText' || t.ColumnName == 'split_percentage' || t.ColumnName == 'Accounting_manager' || t.ColumnName == 'dealer_email_notification' || t.ColumnName == 'auditor_manager') {
              companyFieldName = t.form_controlName;

              if (e.target.textContent == "Banker") {
                t.form_field_visibility = 'NO';
                t.edit_form_field_visibility = 'NO';
                t.is_required = false;
              }
              else if (e.target.textContent == "Standard") {
                t.form_field_visibility = 'NO';
                t.edit_form_field_visibility = 'NO';
                t.is_required = false;
              }
              else if (e.target.textContent == "Dealer" || e.target.textContent == 'Sub Dealer') {
                t.form_field_visibility = 'YES';
                t.edit_form_field_visibility = 'YES';
                t.is_required = false;
                if (t.ColumnName == 'Funding_date' || t.ColumnName == 'dealer_fee_percentage' || t.ColumnName == 'dealer_num_of_months' || t.ColumnName == 'dealer_company_name') {
                  t.is_required = true;
                }
                if (t.ColumnName == 'split_percentage') {
                  t.form_field_visibility = 'NO';
                  t.edit_form_field_visibility = 'NO';
                }
              }
            }
            //-------------------------------------------
            else if (e.target.textContent == "Banker" && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
              t.is_required = false;
            }
            else if (e.target.textContent == "Standard" && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';
            }


            else if (e.target.textContent == "Utility" && (t.ColumnName == 'Utility_Variable_Base_Price' || t.ColumnName == 'Utility_Fixed_Base_Price'
              || t.ColumnName == 'Utility_Information_Active'
              || t.ColumnName == 'Email_Address' || t.ColumnName == 'Electric_Rate'
              || t.ColumnName == 'Utility_Information_States' || t.ColumnName == 'Inflation_Rate' || t.ColumnName == 'Production_Meter_Required')
            ) {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';
            }
            //-------------------- 29 Nov 2021 -------------------//
            //                  Jurisdiction View                 //
            //----------------------------------------------------//
            else if (e.target.textContent == "Jurisdiction" &&
              !(
                t.ColumnName == 'Name' || t.ColumnName == 'RecordTypeId' || t.ColumnName == 'Service_Territory'
                || t.ColumnName == 'Install_W_O_Permitting' || t.ColumnName == 'BillingCity'
                || t.ColumnName == 'BillingStreet' || t.ColumnName == 'BillingCountry' || t.ColumnName == 'BillingState'
                || t.ColumnName == 'BillingPostalCode' || t.ColumnName == 'BillingPostalCode'
                || t.ColumnName == 'Support_Email' || t.ColumnName == 'Support_Line' || t.ColumnName == 'Jurisdiction_Type'
                || t.ColumnName == 'Bond_Expiration'
                || t.ColumnName == 'Bond_Number' || t.ColumnName == 'Takeover_User' || t.ColumnName == 'County'
              )
            ) {
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
              t.is_required = false;
            }

            else if (e.target.textContent != "Jurisdiction" &&
              (
                t.ColumnName == 'RecordTypeId'
                || t.ColumnName == 'Support_Email' || t.ColumnName == 'Support_Line' || t.ColumnName == 'Jurisdiction_Type'
                || t.ColumnName == 'Bond_Expiration'
                || t.ColumnName == 'Bond_Number' || t.ColumnName == 'Takeover_User'
              )
            ) {
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
              t.is_required = false;
            }
            else if (e.target.textContent == "Su") {

            }
            ////----19 April ------------
            //else if (e.target.textContent == "Dealer" && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
            //  t.form_field_visibility = 'NO';
            //  t.edit_form_field_visibility = 'NO';
            //}
            //-------------------------------------------

          });
          if (e.target.textContent == "Dealer" || e.target.textContent == 'Sub Dealer') {
            // this.isdelare = false;
            groupCheck[0].InnerData.forEach(function (t) {
              if (t.ColumnName == 'Website' || t.ColumnName == 'Industry' || t.ColumnName == 'NumberofEmployees'
                || t.ColumnName == 'AnnualRevenue' || t.ColumnName == 'Service_Territory' || t.ColumnName == 'Service_Territory'
                || t.ColumnName == 'ShippingAddress' || t.ColumnName == 'ShippingCountry' || t.ColumnName == 'ShippingStreet'
                || t.ColumnName == 'ShippingState' || t.ColumnName == 'ShippingCity' || t.ColumnName == 'ShippingZipCode'
                || t.ColumnName == 'Description'
              ) {
                t.form_field_visibility = 'NO';
                t.edit_form_field_visibility = 'NO';
                t.is_required = false;
              }
            });
          }
        });

      }
    }
    else {
      formControlList.forEach(function (t1) {
        let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
        groupCheck[0].InnerData.forEach(function (t) {
          if (t.ColumnName == 'Utility_Variable_Base_Price' || t.ColumnName == 'Email_Address' || t.ColumnName == 'Utility_Fixed_Base_Price' || t.ColumnName == 'Utility_Information_Active'
            || t.ColumnName == 'Electric_Rate' || t.ColumnName == 'Utility_Information_States' || t.ColumnName == 'Inflation_Rate' || t.ColumnName == 'Production_Meter_Required') {

            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
          }
        })
      })
    }
    //formForValidation.forEach(function (t1) {

    //  if (t1.is_required) {
    //    const validators = [Validators.required];
    //    keys.forEach(t => {
    //      if (String(t).includes(t1.form_controlName)) {
    //        const validators = [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]
    //        this.form.get(t).setValidators(validators);
    //        this.form.get(t).updateValueAndValidity();
    //      }
    //    });
    //  }
    //  else {
    //    keys.forEach(t => {
    //      if (String(t).includes(t1.form_controlName)) {
    //        this.form.get(t).setValidators(Validators.nullValidator);
    //        this.form.get(t).updateValueAndValidity();
    //      }
    //    });
    //  }
    //});

    //keys.forEach(t => {
    //  formForValidation.forEach(function (t1) {
    //    if (t1.is_required) {
    //      if (String(t).includes(t1.form_controlName)) {
    //        this.form.get(t).setValidators(Validators.nullValidator);
    //        this.form.get(t).updateValueAndValidity();
    //      }
    //    }
    //    else {
    //      if (String(t).includes(t1.form_controlName)) {
    //        this.form.get(t).setValidators(Validators.nullValidator);
    //        this.form.get(t).updateValueAndValidity();
    //      }
    //    }
    //  });
    //});



  }
  checkboxdata1: Array<CheckboxData> = [];




  ngOnInit() {
    this.timeFormat = this.commonService.getTimeFormat();
    this.loadSave = true;
    this.banktype = false;
    this.route.snapshot.paramMap.get('accountType');
    this.route.queryParams.subscribe(function (params) {
      if (params['type'] == 'bank') {
        this.banktype = true;
      }

    });

    ////debugger
    if (this.isSubDealer()) {
      if(localStorage.getItem("isSubDealer") == "Dealer")
      this.roleName = " Dealer";
      else
      this.roleName = " Sub Dealer";

      this.rolueRoute = "/accountslist/sub-dealer";
      let priviledgeCodede = this.route.snapshot.data.privilegeCode;
      if (priviledgeCodede.includes('Add'))
        priviledgeCodede = "subdealeradd";
      else
        priviledgeCodede = "subdealerupdate";

      this.modulePermission = this.commonService.getPermissiondata(6003);
      let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCodede.toUpperCase());
      this.accountCompName = "";
      if (add == undefined) {
        this.addOrUpdatePermission = false;
      } else {

        this.addOrUpdatePermission = true;
      }
    }

    if (this.route.snapshot.paramMap.get('accountType') == 'customer') {
      ;
      this.roleName = " Customer";
      this.rolueRoute = "/accountslist/customer";

      let priviledgeCodecust = this.route.snapshot.data.privilegeCode;
      if (priviledgeCodecust.includes('Add'))
        priviledgeCodecust = "customeradd";
      else
        priviledgeCodecust = "customerupdate";
      this.modulePermission = this.commonService.getPermissiondata(6004);
      let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCodecust.toUpperCase());
      this.accountCompName = "";
      if (add == undefined) {
        this.addOrUpdatePermission = false;
      } else {

        this.addOrUpdatePermission = true;
      }
    }

    if (this.route.snapshot.paramMap.get('accountType') == 'account') {
      ;
      this.roleName = " Account";
      this.rolueRoute = "/accountslist";
    }

    if (this.route.snapshot.paramMap.get('accountType') == 'bank') {

      this.roleName = " Bank";
      this.rolueRoute = "/lender";

      let priviledgeCodebank = this.route.snapshot.data.privilegeCode;
      if (priviledgeCodebank.includes('Add'))
        priviledgeCodebank = "lenderadd";
      else
        priviledgeCodebank = "lenderupdate";
      this.modulePermission = this.commonService.getPermissiondata(3021);
      let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCodebank.toUpperCase());
      this.accountCompName = "";
      if (add == undefined) {
        this.addOrUpdatePermission = false;
      } else {

        this.addOrUpdatePermission = true;
      }
    }

    if (this.route.snapshot.queryParams["type"] == 'bank') {

      this.roleName = " Bank";
      this.rolueRoute = "/lender";

      let priviledgeCodebank = this.route.snapshot.data.privilegeCode;
      if (priviledgeCodebank.includes('Add'))
        priviledgeCodebank = "lenderadd";
      else
        priviledgeCodebank = "lenderupdate";
      this.modulePermission = this.commonService.getPermissiondata(3021);
      let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCodebank.toUpperCase());
      this.accountCompName = "";
      if (add == undefined) {
        this.addOrUpdatePermission = false;
      } else {

        this.addOrUpdatePermission = true;
      }
    }

    this.route.paramMap.subscribe(

      params => {

        const id = params.get('id');
        if (id) {
          this.id = id;
          this.pageTitle = 'Edit' + this.roleName;
          this.displayType = 'EDIT';
          this.getFundingData();
         

        }
        else {
          this.pageTitle = 'Add' + this.roleName;
          this.displayType = 'ADD'
          // this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );

      if(this.id > 0)
      {
        this.commonService.getMasterItemsList("accountTypeWithDealer").subscribe((res: any) => {
          this.dealerTypeData = this.commonService.masters;
          ////debugger
          this.dealerTypeData = this.dealerTypeData.map(item => ({
            name: item.text,
            value: item.value
        }));
        });
      }
    this.initForm();
    this.accountService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe((result: any) => {
      if (result) {
        ////debugger
        this.customCompnentValues = this.accountService.customFieldsList.data;
        this.executionFlow = this.accountService.customFieldsList.executionFlow;
        let accTypeUtlty = ''
        let curr = this;
        let isdealerAccountType = "";
        let fundingOptions = "";
        let fieldArray = [];
        let AccountType: any = { name: "" };
        let recordt = this.customCompnentValues.find(x => x.name == "RecordTypeId")
        //debugger
        if (recordt) {
          let typeId = recordt.value;
          if (typeId != '') {
            var accountType = null;
            if(this.id > 0 && localStorage.getItem("isSubDealer") == "Dealer" && this.displayType == 'EDIT')
            {
              //debugger
                let recordOwner = this.customCompnentValues.filter(x => x.name == 'OwnerId' || (x.ColumnName == 'CreatedById' || x.ColumnName == 'LastModifiedById') && x.dt_code == 'select' && x.select_options != null)
    
                recordOwner.forEach(record => {
                  record.select_options.forEach(item => {
                    //debugger
                    if (item.name == this.userName) {
                      record.value = item.value;
                      record.is_readOnly = true;
                    }
      
                  });
                })
              this.roleName = " Dealer";
              recordt.select_options = this.dealerTypeData.filter(x => x.name == "Dealer");
              accountType = this.dealerTypeData.find(x => x.name == "Dealer");
             
            }else
            {
              this.roleName = " Sub Dealer";
              accountType = recordt.select_options.find(x => x.value == typeId);
            }
            if (accountType) {
              AccountType = accountType.name;
            }
          }
          if (this.displayType == 'ADD') {
            let recordOwner = this.customCompnentValues.find(x => x.name == 'OwnerId' && x.dt_code == 'select' && x.select_options != null)

            recordOwner.select_options.forEach(item => {
              //debugger
              if (item.name == this.userName) {
                recordOwner.value = item.value;
                recordOwner.is_readOnly = true;
              }

            });
          }
          if (this.isSubDealer()) {

            recordt.select_options.forEach(itemList => {

              if (itemList.name == 'Sub Dealer') {
                isdealerAccountType = "Dealer";
                recordt.value = itemList.value;

              }
            });

            recordt.is_readOnly = true;
          }

          if (this.route.snapshot.paramMap.get('accountType') == 'customer') {

            recordt.select_options.forEach(itemList => {

              if (itemList.name == 'Standard') {
                recordt.value = itemList.value;
              }
            });

            recordt.is_readOnly = true;
          }



          this.route.queryParams.subscribe(function (params) {
            if (params['type'] == 'bank') {
              this.banktype = true;
              recordt.select_options.forEach(itemList => {

                if (itemList.name == 'Banker') {
                  recordt.value = itemList.value;

                }
              });
              recordt.is_readOnly = true;
            }
          });

        }


        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.ColumnName == 'RecordTypeId') {
            //debugger
            if(this.dealerTypeData != null && localStorage.getItem("isSubDealer") != "Dealer")
            {
              var data = t.select_options = t.select_options.filter(x => x.name != "Utility");
              for (var i = 0; i < data.length; i++) {
                if (data[i].name == 'Dealer') {
  
                  t.select_options.splice(i, 1);
                }
              }
            }
          }
          let fourMonthPaymentddlValue = '';
          let monthPayment = this.customCompnentValues.filter(y => y.ColumnName == "four_month_payment");
          if (monthPayment != null && typeof monthPayment != 'undefined') {
            if (typeof monthPayment[0] != 'undefined') {
              fourMonthPaymentddlValue = monthPayment[0].value;
            }
          }
          if (t.dt_code == 'select' && t.select_options != null && (t.name == 'CreatedById' || t.name == 'LastModifiedById')) {
            if (t.value != '') {
              t.value = t.value.toLowerCase();
              t.select_options.forEach(itemList => {
                if (itemList.value == t.value) {
                  t.value = this.userName;
                  t.dt_code = 'text';
                  t.is_readOnly = true;
                }
              });
            } else {
              t.value = t.value.toLowerCase();
              t.dt_code = 'text';
              t.is_readOnly = true;
            }
          }
          if (t.dt_code == 'select' && t.picklist_options == 'true' && t.value !== "") {
            t.value = JSON.parse(t.value);
          }
          
          if (t.ColumnName == 'RecordTypeId') {
            var _options = this.customCompnentValues.filter(function (m) { return m.ColumnName == 'RecordTypeId'; });
            /////debugger
            if (_options) {
              if (_options[0].select_options) 
              {
                let option_1 = _options[0].select_options;
                option_1.forEach(function (m) {
                  if (m.value == t.value && (m.name == 'Banker' || curr.banktype == true)) {
                    curr.banktype = true;
                    // this.formControlList.get(t).setValue(m.value);
                  }
                  if (m.value == t.value && m.name == 'Dealer') {
                    isdealerAccountType = "Dealer";

                  } 
                  if (m.value == t.value && m.name == 'Sub Dealer') {
                    isdealerAccountType = "Dealer";
                  }
                });
              }
            }
  
          }
          if (t.ColumnName == 'Name') {

            if(this.banktype)
            {
              t.display_name = 'Bank Name'
            }
          }

          if (t.ColumnName == 'funding_options') {
            var _options = this.customCompnentValues.filter(function (m) { return m.ColumnName == 'funding_options'; });
            if (_options) {
              if (_options[0].select_options) {
                let option_1 = _options[0].select_options;
                option_1.forEach(function (m) {
                  if (m.value == t.value) {
                    fundingOptions = m.name;
                  }
                });
              }
            }
          }

          if (t.ColumnName == "RecordTypeId") {
            //debugger
            var _options = this.customCompnentValues.filter(function (m) { return m.ColumnName == 'RecordTypeId'; });
            if (_options) {
              if (_options[0].select_options) {
                let option_1 = _options[0].select_options;
                option_1.forEach(function (m) {
                  if (m.value == t.value) {
                    accTypeUtlty = m.name;
                  }
                });
              }
            }
          }

          t.form_field_visibility = 'YES';
          t.edit_form_field_visibility = 'YES';






          //--------------19 April------------------
          if (t.ColumnName == 'Phone' || t.ColumnName == 'dealerfeepercentage' || t.ColumnName == 'Funding_date' || t.ColumnName == 'dealer_fee_percentage' || t.ColumnName == 'four_month_payment' || t.ColumnName == 'dealer_num_of_months' || t.ColumnName == 'dealer_code' || t.ColumnName == 'dealer_logo' || t.ColumnName == 'dealer_company_name' || t.ColumnName == 'relationship_manager' || t.ColumnName == 'funding_options' || t.ColumnName == 'send_Text_Email_ToCustomer' || t.ColumnName == 'IsSendText' || t.ColumnName == 'split_percentage' || t.ColumnName == 'Accounting_manager' || t.ColumnName == 'dealer_email_notification' || t.ColumnName == 'auditor_manager') {

            t.is_required = false;
            if (isdealerAccountType == "Dealer") {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';


              //------------------Status
              if (t.ColumnName == "dealer_fee_percentage" || t.ColumnName == "dealer_num_of_months" || t.ColumnName == "dealer_company_name" || t.ColumnName == "Funding_date") {
                t.is_required = true;
              }
              //---------------------------

              if (t.ColumnName == 'split_percentage') {
                t.form_field_visibility = 'NO';
                t.edit_form_field_visibility = 'NO'; t.is_required = false;
                if (fundingOptions.toLowerCase() == "split") {
                  t.form_field_visibility = 'YES';
                  t.edit_form_field_visibility = 'YES'; t.is_required = true;
                }
              }
              if (t.ColumnName == 'dealer_company_name') {
                t.is_required = true;
              }
              this.isdelare = true;
              if (fourMonthPaymentddlValue == "1" && t.ColumnName == 'dealer_num_of_months') {
                t.is_readOnly = true;
              }
            }
            else {
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
              if (t.ColumnName == 'dealer_company_name') {
                t.is_required = false;
              }
            }
          }
          //--------------------------------


          if (t.ColumnName == 'SecurityType' || t.ColumnName == 'UCCFilingFee') {
            if (this.banktype) {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';
            }
            else {
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
            }
          }

          if (t.ColumnName == 'Utility_Variable_Base_Price' || t.ColumnName == 'Email_Address' || t.ColumnName == 'Utility_Fixed_Base_Price' || t.ColumnName == 'Utility_Information_Active'
            || t.ColumnName == 'Electric_Rate' || t.ColumnName == 'Utility_Information_States' || t.ColumnName == 'Inflation_Rate' || t.ColumnName == 'Production_Meter_Required') {
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
          }

          else if (this.banktype == true && t.ColumnName != 'SecurityType' && t.ColumnName != 'UCCFilingFee' && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
          }
          if (t.dt_code == 'radio') {
            t.listoptions = JSON.parse(t.listoptions);
          }
          if (t.dt_code == 'checkbox') {
            t.listoptions = JSON.parse(t.listoptions);

            let checkdata = new CheckboxData();

            checkdata.controlname = t.form_controlName;
            this.checkboxdata1.push(checkdata);
          }

          if (t.ColumnName == 'dealer_logo') {


            //this.fileName = t.value;


            if (t.value != null) {
              let href = t.value.split('AccountdealerDocument/');
              if (href[1]) {
                href = href[1].split('_');
              }
              this.fileName = href[0];
            };


            this.GetFileUploadSource(t.value);
          }
          if (t.ColumnName == 'dealer_company_name') {
            this.accountCompName = t.value;
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);
            //for (let config of this.formControlList) {

            //}
          }

          if (AccountType == "Jurisdiction" &&
            !(
              t.ColumnName == 'Name' || t.ColumnName == 'RecordTypeId' || t.ColumnName == 'Service_Territory'
              || t.ColumnName == 'Install_W_O_Permitting' || t.ColumnName == 'BillingCity'
              || t.ColumnName == 'BillingStreet' || t.ColumnName == 'BillingCountry' || t.ColumnName == 'BillingState'
              || t.ColumnName == 'BillingPostalCode' || t.ColumnName == 'BillingPostalCode'
              || t.ColumnName == 'Support_Email' || t.ColumnName == 'Support_Line' || t.ColumnName == 'Jurisdiction_Type'
              || t.ColumnName == 'Bond_Expiration'
              || t.ColumnName == 'Bond_Number' || t.ColumnName == 'Takeover_User' || t.ColumnName == 'County'
            )
          ) {
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
            t.is_required = false;
          }
          else if (AccountType != "Jurisdiction" &&
            (
              // t.ColumnName == 'RecordTypeId' ||  By Iftikhar(AccountType was not showing on Add)
              t.ColumnName == 'Support_Email' || t.ColumnName == 'Support_Line' || t.ColumnName == 'Jurisdiction_Type'
              || t.ColumnName == 'Bond_Expiration'
              || t.ColumnName == 'Bond_Number' || t.ColumnName == 'Takeover_User'
            )
          ) {
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
            t.is_required = false;
          }



        })
        if (this.isSubDealer()) {
          this.isdelare = false;
          this.customCompnentValues.forEach(function (t) {
            if (t.ColumnName == 'Website' || t.ColumnName == 'Industry' || t.ColumnName == 'NumberofEmployees'
              || t.ColumnName == 'AnnualRevenue' || t.ColumnName == 'Service_Territory' || t.ColumnName == 'Service_Territory'
              || t.ColumnName == 'ShippingAddress' || t.ColumnName == 'ShippingCountry' || t.ColumnName == 'ShippingStreet'
              || t.ColumnName == 'ShippingState' || t.ColumnName == 'ShippingCity' || t.ColumnName == 'ShippingZipCode'
              || t.ColumnName == 'Description'
            ) {
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
              t.is_required = false;
            }
          });
        }
        const group: any = {};
        data_type_name: Text
        const convertdatetime = new DateTimeToLocalForAddEditPipe();

        this.customCompnentValues.forEach(cnt => {
          ////debugger
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'datetime') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }         
          
          if (accTypeUtlty == "Utility" && (cnt.ColumnName == 'Utility_Variable_Base_Price' || cnt.ColumnName == 'Email_Address' || cnt.ColumnName == 'Utility_Fixed_Base_Price' || cnt.ColumnName == 'Utility_Information_Active'
            || cnt.ColumnName == 'Electric_Rate' || cnt.ColumnName == 'Utility_Information_States' || cnt.ColumnName == 'Inflation_Rate' || cnt.ColumnName == 'Production_Meter_Required')) {
            cnt.form_field_visibility = 'YES';
            cnt.edit_form_field_visibility = 'YES';
          }


          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required === true ? Validators.required : Validators.nullValidator,
          cnt.dt_code === "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.dt_code === "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.dt_code === "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") : Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
        setTimeout(() => {
          this.loadSave = false;
        }, 1000);

      }
    }, err => {
      this.loadSave = false;
    });
    setTimeout(() => {
      this.options = {
        center: { lat: 47.751076, lng: -120.740135 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };


      this.overlays = [];
      this.autotext();
    }, 1000);

    //EDIT case handle
    this.initBreadCrumb();

    //  if(this.route.snapshot.paramMap.get('accountType')=='subDealer')
    //   {
    //
    //     this.form.get('106_RecordTypeId').setValue(796);
    //   }

  }

  isSubDealer()
  { 
    ////debugger
    if(this.route.snapshot.paramMap.get('accountType') == 'subDealer')
    {
      return true;
    }
    return false;
  }
  initBreadCrumb() {

    this.contentHeader = {
      headerTitle: 'Manage' + this.roleName,
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: 'Manage' + this.roleName,
            isLink: true,
            link: this.rolueRoute
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
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

  GetFileUploadSource(file) {

    this.accountService.GetFileSource(this.id, 'account').subscribe((result: any) => {
      let val = null;
      var getdata = JSON.parse(result);
      this.imageLink = getdata.data[0].dealer_logo;
      console.log('Account Soure', this.imageLink);
      //this.imageLink = result;

    })
  }
  test(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    //this.JsonData.Id = this.id;
    //this.JsonData.moduleCode = this.moduleName;
    //this.JsonData.subModuleCode = this.submoduleName;
    //this.JsonData.companyId = this.companyId;
    //this.JsonData.userId = this.userId;

    input.append('userId', this.userId);
    input.append('companyId', this.companyId);
    input.append('ModuleCode', this.moduleName);
    input.append('SubModuleCode', this.submoduleName);
    input.append('id', this.id);
    let data = JSON.stringify(this.form.value);
    input.append('FormJsonData', data);
    input.append('AccountType', this.banktype ? 'Bank':'Other');




    let fundingData: any[] = [];
    for (var i = 0; i < this.fields.controls.length; i++) {
      //console.log('stageform:', this.fields.controls[i].value)
      fundingData.push(this.fields.controls[i].value);
      this.fields.controls[i].value.display_order = i;
    }

    let fundingStateCitydata = JSON.stringify(fundingData);
    input.append('selecteddata', fundingStateCitydata);


    ///input.append('companyLogo', this.companyLogo.value);



    //if (this.commonService.isUploadImageValid) {
    //  if (this.companyLogo.value !== null) {
    //    input.append('filename', this.companyLogo.value);

    //  }

    //}
    if (this.isdelare == true) {

      if (this.fileInput != undefined) {
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
          input.append('file', fileBrowser.files[0]);
        }
      }
    }
    return input;
  }

  onSubmit() {

    var statecount = [];
    if (this.fundform.controls.fields.value.length > 1) {
      statecount = this.fundform.controls.fields.value.filter(y => y.state == null || y.stateMinimumFunding == null || y.stateMinimumFunding == "");
    }
    else {
      statecount = this.fundform.controls.fields.value.filter(y => (y.state != null && (y.stateMinimumFunding == null || y.stateMinimumFunding == "")) || (y.state == null && y.stateMinimumFunding != null && y.stateMinimumFunding != ""))
      console.log('statecount', statecount);
    }
    //console.log('statecount', statecount);

    var citycount = this.fundform.controls.fields.value.filter(y => (y.city != "" && (y.cityMinimumFunding == null || y.cityMinimumFunding == "")) || (y.city == "" && y.cityMinimumFunding != null && y.cityMinimumFunding != ""))

    //console.log('citycount', citycount);

    var innerCount = this.fundform.controls.fields.value.filter(y => y.subCity.length > 0)

    //console.log('innerCount', innerCount);

    let checkSubCity = true;

    innerCount.forEach(t => {

      if (t.city == "" || t.cityMinimumFunding == null || t.cityMinimumFunding == "") {
        checkSubCity = false;
      }

      else {
        t.subCity.forEach(ct => {
          console.log("subcity", ct);
          if (ct.subCityName == "" || ct.subCityMinimumFunding == "" || ct.subCityMinimumFunding == null) {
            checkSubCity = false;
          }
        })
      }
    })

    if (statecount.length > 0 && this.isdelare == true) {
      this.toaster.error('Please enter State and Minimum Funding.');
    }
    else if (citycount.length > 0 && this.isdelare == true) {
      this.toaster.error('Please enter City and Minimum Funding.');
    }
    else if (!checkSubCity && this.isdelare == true) {
      this.toaster.error('Please enter City and Minimum Funding.');
    }
    else {

      this.loadSave = true;
      this.checkboxdata1.forEach((item) => {
        if (item.controlvalues != "" && item.controlvalues != undefined) {
          var selvalues = "";// this.form.get(item.controlname).value;
          if (selvalues == "" || selvalues == null) {
            this.form.get(item.controlname).setValue(item.controlvalues);
          } else {
            this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
          }
        }
      });

      if (this.form.valid) {
        this.loadSave = true;
        this.JsonData.Id = this.id;
        this.JsonData.moduleCode = this.moduleName;
        this.JsonData.subModuleCode = this.submoduleName;
        this.JsonData.companyId = this.companyId;
        this.JsonData.userId = this.userId;
        this.JsonData.AccountType=this.banktype ? 'Bank':'Other';        
        const _formData = this.form.value;
        for (let index in _formData) {
          let data = _formData[index];
          if (data) {
            if (Date.prototype.isPrototypeOf(data)) {
              _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
            }
          }
        }
        this.JsonData.FormJsonData = JSON.stringify(this.form.value);
        //this.accountCompName
        const formPrepared = this.prepareFormDataForDocument();
        this.accountService.CheckDealerCompanyName(this.id, this.isdelare == true ? this.accountCompName : '').subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.accountService.addEditForm(formPrepared).subscribe((result: any) => {
              if (result.statusCode == 200) {
                ;
                let primaryId = Number(result.optionalExtraParamers);
                let flowsList = this.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
                if (flowsList.length > 0) {
                  flowsList.forEach((item) => {
                    window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
                  });
                }
                //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                //this.toaster.success(result.responseMessage);
                setTimeout(() => {
                  this.toaster.success(result.responseMessage);
                  this.loadSave = false;
                  this.location.back();
                }, 1000);
              }
              else {
                this.toaster.error(result.responseMessage);
                this.loadSave = false;
              }
            }, error => {
              this.loadSave = false;
            });
          }
          else {
            this.loadSave = false;
            this.toaster.error('Company name is already exist! please try another company name.');
          }
        });
        //this.accountService.addEditForm(this.JsonData).subscribe((result: any) => {

      }
      else {
        this.commonService.validateAllFormFields(this.form);
        this.loadSave = false;
      }
    }
  }

  displayInsuranceDetail(reposnse): void {
    const formGroup = {};
    for (let prop of Object.keys(this.customCompnentValues)) {
      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
    }
    this.form = new FormGroup(formGroup);
  }

  close() {
    this.location.back();
  }



  fillForm(id) {
    //this.form.reset();
    this.accountService.GetAccountDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      let edit: any
      this.loadSave = true;
      edit = this.accountService.editPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];
          if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {

            cntValue = JSON.parse(cntValue);
          }
          if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {
            cntValue = (cntValue == 'true');
          }

          this.checkboxdata1.forEach((item) => { if (cntname == item.controlname) { item.controlvalues = cntValue; } });//for checkboxes on form
          formGroup[cntname] = new FormControl(cntValue);
        })

        // this.form.value.reset();
        this.form = new FormGroup(formGroup);


        //for checkboxes on form
        try {
          this.checkboxdata1.forEach((item) => {
            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
          });
          //this.checkboxdata1.forEach((item) => {  if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

        }
        catch (err) { }
        this.loadSave = false;

      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }
  MakeArray(value, type) {
    var array = [];
    var arr = String(value).split(',');
    if (type == "radio" || type == "checkbox") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].split("|").length > 1) {
            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
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
  MakeNormalArray(value) {
    if (value) {
      try {
        return JSON.parse(value);
      }
      catch (ex) {
        return value;
      }
    }
    else {
      value = [];
    }
  }
  MakeSelectArray(objItem) {
    var array = [];
    var arr = String(objItem.select_options).split(',');
    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

      var person = { name: arr[0], value: arr[1] };
      array.push(person);
      //objItem.select_options = array;
    }
    return array
  }
  removeValue = function (list, value, separator) {
    separator = separator || ",";
    var values = list.split(separator);
    for (var i = 0; i < values.length; i++) {
      if (values[i] == value) {
        values.splice(i, 1);
        return values.join(separator);
      }
    }
    return list;
  }


  onCheckboxChange(e, groupdisp, controldisp) {
    //const index2: number = this.formControlList.indexOf(groupdisp);
    //const index1: number = controldisp.display_order;
    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.form_controlName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName);
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
    var dd = this.formControlList;

  }

  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }

  private fetchMore(dataList: any, j: number) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList[j].select_options.length;
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;

    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);

    })
  }

  onKey(e: any, dataList: any, j: number) {

    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode == 37 || charCode == 38 || charCode == 39 || charCode == 40) {
      return false;
    }

    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }

  onClearLang(dataList: any, j: number): void {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = '';
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }

  selectedAddressType = '';
  resetvalue = "";
  mapPopUP(colmap: string) {
    this.resetvalue = "";
    this.selectedAddressType = colmap;
    this.mapLocation.show();
  }
  closemapsearch() {
    this.mapLocation.hide();
    //this.selectedAddressType = '';
  }
  autotext() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {

        center: { lat: 50.064192, lng: -130.605469 },
        zoom: 3,
      }
    );
    const card = document.getElementById("pac-card") as HTMLElement;
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const countries = document.getElementById("country-selector") as HTMLElement;

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(input);

    // Set initial restrict to the greater list of countries.
    autocomplete.setComponentRestrictions({
      country: ["us"],
    });

    // Specify only the data fields that are needed.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      input.value = '';
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!this.geocoder) this.geocoder = new google.maps.Geocoder();


      if (place.address_components) {
        this.customCompnentValues.forEach(t => {
          try {
            if (this.selectedAddressType == "BillingAddress") {
              if ((t.dt_code == 'select' && t.select_options != null && t.name == 'BillingCountry') || (t.dt_code == 'select' && t.select_options != null && t.name == 'BillingState')) {
                this.form.get(t.form_controlName).setValue(null);
              }
              if (t.name == 'BillingPostalCode' || t.name == 'BillingCity' || t.name == 'BillingStreet') {

                this.form.get(t.form_controlName).setValue('');
              }
              let route: string = '';
              let street: string = '';
              place.address_components.forEach(p => {

                p.types.forEach(s => {
                  if (s == 'country') {
                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'BillingCountry') {
                      try {
                        t.select_options.forEach(itemList => {
                          let cntryname = p.long_name;
                          if (itemList.name == cntryname) {
                            this.form.get(t.form_controlName).setValue(itemList.value);
                          }
                        });
                      } catch { }
                    }
                  }
                  if (s == 'administrative_area_level_1') {

                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'BillingState') {
                      try {

                        t.select_options.forEach(itemList => {
                          let statename = p.long_name;
                          if (itemList.name == statename) {
                            this.form.get(t.form_controlName).setValue(itemList.value);
                          }
                        });
                      } catch { }
                    }
                  }
                  if (s == 'postal_code') {
                    if (t.name == 'BillingPostalCode') {

                      this.form.get(t.form_controlName).setValue(p.long_name);
                    }


                  }
                  if (s == 'locality') {
                    if (t.name == 'BillingCity') {

                      this.form.get(t.form_controlName).setValue(p.long_name);
                    }
                  }
                  if (s == 'street_number') {
                    street = p.long_name
                  }
                  if (s == 'route') {
                    route = p.long_name
                  }
                })


              })

              if (t.name == 'BillingStreet') {
                var street_value = street + ' ' + route;
                this.form.get(t.form_controlName).setValue(street_value);
              }
            }
            else if (this.selectedAddressType == "ShippingAddress") {
              if ((t.dt_code == 'select' && t.select_options != null && t.name == 'ShippingCountry') || (t.dt_code == 'select' && t.select_options != null && t.name == 'ShippingState')) {
                this.form.get(t.form_controlName).setValue(null);
              }
              if (t.name == 'ShippingZipCode' || t.name == 'ShippingCity' || t.name == 'ShippingStreet') {

                this.form.get(t.form_controlName).setValue('');
              }
              let route: string = '';
              let street: string = '';
              place.address_components.forEach(p => {

                p.types.forEach(s => {
                  if (s == 'country') {
                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'ShippingCountry') {
                      try {
                        t.select_options.forEach(itemList => {
                          let cntryname = p.long_name;
                          if (itemList.name == cntryname) {
                            this.form.get(t.form_controlName).setValue(itemList.value);
                          }
                        });
                      } catch { }
                    }
                  }
                  if (s == 'administrative_area_level_1') {

                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'ShippingState') {
                      try {

                        t.select_options.forEach(itemList => {
                          let statename = p.long_name;
                          if (itemList.name == statename) {
                            this.form.get(t.form_controlName).setValue(itemList.value);
                          }
                        });
                      } catch { }
                    }
                  }
                  if (s == 'postal_code') {
                    if (t.name == 'ShippingZipCode') {

                      this.form.get(t.form_controlName).setValue(p.long_name);
                    }


                  }
                  if (s == 'locality') {
                    if (t.name == 'ShippingCity') {

                      this.form.get(t.form_controlName).setValue(p.long_name);
                    }
                  }
                  if (s == 'street_number') {
                    street = p.long_name
                  }
                  if (s == 'route') {
                    route = p.long_name
                  }
                })


              })

              if (t.name == 'ShippingStreet') {
                var street_value = street + ' ' + route;
                this.form.get(t.form_controlName).setValue(street_value);
              }
            }


          } catch { }


          this.closemapsearch();
        });

      }






      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      let address = "";

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
          "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
          "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
          "",
        ].join(" ");
      }

      //infowindowContent.children["place-icon"].src = place.icon;
      //infowindowContent.children["place-name"].textContent = place.name;
      //infowindowContent.children["place-address"].textContent = address;
      //infowindow.open(map, marker);
    });

    // Sets a listener on a given radio button. The radio buttons specify
    // the countries used to restrict the autocomplete search.
    //function setupClickListener(id, countries) {
    //  const radioButton = document.getElementById(id) as HTMLElement;
    //  radioButton.addEventListener("click", () => {
    //    autocomplete.setComponentRestrictions({ country: countries });
    //  });
    //}

    //setupClickListener("changecountry-usa", "us");
    //setupClickListener("changecountry-usa-and-uot", [
    //  "us",
    //  "pr",
    //  "vi",
    //  "gu",
    //  "mp",
    //]);
  }

  setFile($event): void {
    this.commonService.uploadImageFileValidator($event);
    this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "10MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      ///this.companyLogo.setValue($event.target.files[0].name);
    }
  }
  checkFundingOptions(e, formControlList) {
    this.hideSplitPercentage = false;

    let companyFieldName;
    let hideSplitPer;
    if (e.target.textContent != "") {
      formControlList.forEach(function (t1) {
        let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
        groupCheck[0].InnerData.forEach(function (t) {
          if (t.ColumnName == 'split_percentage') {
            companyFieldName = t.form_controlName;
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
            t.is_required = false;
            hideSplitPer = false;
            if (e.target.textContent == "Split") {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';
              t.is_required = true;
              hideSplitPer = true;
            }
          }
        });
      });


      var keys = Object.keys(this.form.value);

      if (hideSplitPer == false) {
        this.form.controls[companyFieldName].reset();
        keys.forEach(t => {
          if (String(t).includes(companyFieldName)) {
            this.form.get(t).setValidators(Validators.nullValidator);
          }
        });
      }
      else {
        keys.forEach(t => {
          if (String(t).includes(companyFieldName)) {
            const validators = [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]
            this.form.get(t).setValidators(validators);
          }
        });
      }

      keys.forEach(t => {
        if (String(t).includes(companyFieldName)) {
          this.form.get(t).updateValueAndValidity();
        }
      });

    }
  }

  checkFundingOptions11(e, formControlList) {

    if (e.target.textContent != "") {
      formControlList.forEach(function (t1) {
        let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
        let companyFieldName;
        groupCheck[0].InnerData.forEach(function (t) {
          if (t.ColumnName == 'split_percentage') {
            companyFieldName = t.form_controlName;
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
            t.is_required = false;
            if (e.target.textContent == "Split") {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';
              t.is_required = true;
            }
          }
        });
      });
    }
  }


  checkToggle(e, formControlList, controlname) {
    console.log('1st', controlname)
    if (controlname == "four_month_payment") {
      let companyFieldName;
      formControlList.forEach(function (t1) {
        let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
        groupCheck[0].InnerData.forEach(function (t) {
          if (t.ColumnName == 'dealer_num_of_months') {
            companyFieldName = t.form_controlName;
            if (e.target.checked) {
              t.is_readOnly = true;
            }
            else {
              t.is_readOnly = false;
            }
          }
        });
      });
      if (e.target.checked) {
        if (this.form.get(companyFieldName) != null) {
          this.form.get(companyFieldName).setValue("4");
        }
      }
      else {
        if (this.form.get(companyFieldName) != null) {
          this.form.get(companyFieldName).setValue("0");
        }
      }
    }

    if (controlname == "four_month_payment") {
      let companyFieldName;
      formControlList.forEach(function (t1) {
        let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
        groupCheck[0].InnerData.forEach(function (t) {
          if (t.ColumnName == 'dealer_num_of_months') {
            companyFieldName = t.form_controlName;
            if (e.target.checked) {
              t.is_readOnly = true;
            }
            else {
              t.is_readOnly = false;
            }
          }
        });
      });
      if (e.target.checked) {
        if (this.form.get(companyFieldName) != null) {
          this.form.get(companyFieldName).setValue("4");
        }
      }
      else {
        if (this.form.get(companyFieldName) != null) {
          this.form.get(companyFieldName).setValue("0");
        }
      }
    }

    if (controlname == "IsSendText") {
      let companyFieldName;
      formControlList.forEach(function (t1) {
        let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
        groupCheck[0].InnerData.forEach(function (t) {
          if (t.ColumnName == 'send_Text_Email_ToCustomer') {
            companyFieldName = t.form_controlName;
            if (e.target.checked) {
              t.is_readOnly = true;
            }
            else {
              t.is_readOnly = false;
            }
          }
        });
      });




      if (e.target.checked) {
        this.showdisabletoggel = true;
      }
      else {
        this.showdisabletoggel = false;
        this.form.get(companyFieldName).setValue(false);
      }


    }
    console.log('last', this.formControlList);

  }


  private initForm() {
    this.fundform = this.fb.group({
      fields: this.fb.array([this.buildFields()]),
    });
  }

  get fields(): FormArray {
    return this.fundform.get('fields') as FormArray;
  }

  addFields() {
    if (this.fundform.controls.fields.value.length > 0) {
      this.fundform.controls.fields.value.forEach((item, index) => {
        var temp = this.stateDDL.filter(x => x.value == item.state)
        if (temp.length > 0) {
          this.stateDDL = this.stateDDL.filter(s => s.value != temp[0].value.toString());
        }
      });
    }
    console.log('this.stateDDL', this.stateDDL);
    this.fields.push(this.buildFields());
  }

  buildFields(): FormGroup {
    return this.fb.group({
      id: [''],
      state: [null, Validators.nullValidator],
      stateMinimumFunding: [null, Validators.nullValidator],
      city: ['', Validators.nullValidator],
      cityMinimumFunding: [null, Validators.nullValidator],
      display_order: [''],
      subCity: new FormArray([])
    });
  }

  get substagefields(): FormArray {
    const control = <FormArray>this.fundform.get('fields');
    return control.controls[0].get('subCity') as FormArray;
  }

  addSubStageFields(i) {
    const control = <FormArray>this.fundform.get('fields');
    const VB = (<FormArray>(control.controls[i].get('subCity')));
    VB.push(this.buildFieldsstages());
  }

  buildFieldsstages(val: string = null): FormGroup {
    return this.fb.group({
      subid: [''],
      subCityName: ['', Validators.nullValidator],
      subCityMinimumFunding: ['', Validators.nullValidator],
    });
  }

  removeFields(index: any) {
    const message = `Are you sure you want to delete row?`;
    this.dialogService.confirm('Delete Row', message).subscribe(confirmed => {
      if (confirmed) {
        this.fields.removeAt(index);
        this.toaster.success(`Row has been deleted successfully..`);
      }
    });


  }

  removeSubstageFields(f: FormGroup, i: any) {
    const message = `Are you sure you want to delete city ?`;
    this.dialogService.confirm('Delete Substage', message).subscribe(confirmed => {
      if (confirmed) {
        const ab = ((<FormArray>f.get('subCity')));
        ab.removeAt(i);
        this.toaster.success(`City has been deleted successfully..`);
      }
    });
  }


  buildFieldsstagesnew(x: any): FormGroup {

    let control = this.fb.group({
      subid: [x.Id],
      subCityName: [x.City],
      subCityMinimumFunding: [x.CityMinimumFunding],
    });
    return control;
  }

  getFundingData() {
    this.loadSave = true;
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
    }
    setTimeout(() => {
      this.fields.reset();

      //let currentContext = this;

      this.accountService.GetFundingStageCityData(this.id).subscribe((result: any) => {

        let arr = [];
        arr = result;

        //if (result.length > 0) {
        //  currentContext.fields.removeAt(0);
        //}

        arr.forEach((x, i) => {
          if (x.ParentId === null) {

            this.fields.push(this.fb.group({
              id: [x.Id],
              state: [x.StateId.toString()],
              stateMinimumFunding: [x.StateMinimumFunding.toString()],
              city: [x.City.toString()],
              cityMinimumFunding: [x.CityMinimumFunding == null ? '' : x.CityMinimumFunding.toString()],
              subCity: new FormArray([]),
            })
            );
          }
          else {
            console.log('first', <FormArray>this.fundform.get('fields'))
            const control = <FormArray>this.fundform.get('fields');
            console.log('control', control)
            const VB = (<FormArray>(control.controls[control.controls.findIndex((item) => item.value.id == x.ParentId)].get('subCity')));
            VB.push(this.buildFieldsstagesnew(x));
          }
        });
      });
      this.loadSave = false;
    }, 2000);

  }

  selectStateDDV(event) {

    this.commonService.getMasterItemsList("State").subscribe((result: any) => {
      this.stateDDL = this.commonService.masters;
      if (this.fundform.controls.fields.value.length > 0) {
        this.fundform.controls.fields.value.forEach((item, index) => {
          var tempdata = this.stateDDL.filter(x => x.value == item.state)
          if (tempdata.length > 0) {
            this.stateDDL = this.stateDDL.filter(s => s.value != tempdata[0].value.toString());
          }
        });
      }
    });
    console.log('Select', this.stateDDL);
  }
  onClearDD(value, i) {
    this.commonService.getMasterItemsList("State").subscribe((result: any) => {
      this.stateDDL = this.commonService.masters;
      if (this.fundform.controls.fields.value.length > 0) {
        this.fundform.controls.fields.value.forEach((item, index) => {
          var tempdata = this.stateDDL.filter(x => x.value == item.state)
          if (tempdata.length > 0) {
            this.stateDDL = this.stateDDL.filter(s => s.value != tempdata[0].value.toString());
          }
        });
      }
    });

    //console.log('Val', value);
    console.log('Clear', this.stateDDL);
  }


  get state() { return this.fundform.get('state'); }
  get stateMinimumFunding() { return this.fundform.get('stateMinimumFunding'); }
  get city() { return this.fundform.get('city'); }
  get cityMinimumFunding() { return this.fundform.get('cityMinimumFunding'); }
  get display_order() { return this.fundform.get('display_order'); }
  get subCityName() { return this.fundform.get('subCityName'); }
  get subCityMinimumFunding() { return this.fundform.get('subCityMinimumFunding'); }
  get subCity() { return this.fundform.get('subCity'); }
}
