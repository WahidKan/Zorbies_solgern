
import { id } from '@swimlane/ngx-datatable';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { CustomFieldService } from '../shared/custom-field/customfield.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { OpportunityListService, OpportunityJsonData } from './opportunitylist.service';
import { CheckboxData } from '../internalaccounts/accountservice.service';
import { Location } from '@angular/common';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { Alert } from 'selenium-webdriver';
import { debug } from 'console';
import { WorkorderService } from '../workorder/workorderservice.service';
@Component({
  selector: 'app-addeditopportunity',
  templateUrl: './addeditopportunity.component.html',
  styleUrls: ['./addeditopportunity.component.scss']
})
export class AddeditopportunityComponent implements OnInit {
  config: any[] = [];
  control: any;
  pageTitle: any;
  Type: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'opportunity';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  isLoanProduct: any;
  purchaseType: any;
  sDtaa: any;
  loadSave = false;
  id: any = '';
  campaign_id: any;
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: OpportunityJsonData = new OpportunityJsonData();
  userId: any;
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  userName: any;
  displayType = 'ADD';
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  scrollDataList: any;
  custom_field_id: any;
  len: any;
  field_code: any;
  searchText: string;
  cascadingCompnentValues: any;
  cleanValues: any[] = [];
  timeFormat: string;
  contentHeader: object;
  productId: any;

  constructor(private fb: FormBuilder, private opportunityService: OpportunityListService, private workOrderService: WorkorderService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private location: Location) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
    //const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(this.route.snapshot.data.moduleCode)

    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'OPPORTUNITYADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'OPPORTUNITYUPDATE');

    this.timeFormat = this.commonService.getTimeFormat();
  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.loadSave = true;
        const id = params.get('id');
        if (id) {
          this.id = id;
          this.isLead = true;
          this.pageTitle = 'Edit Opportunity';
          this.displayType = 'EDIT';
          this.addOrUpdatePermission = this.isUpdate;
        } else {
          this.displayType = 'ADD'
          this.pageTitle = 'Add Opportunity';
          this.addOrUpdatePermission = this.isAdd;
          // this.campaign_id=campaign_id;
        }
      }
    );

    this.route.queryParams.subscribe(
      params => {
        this.campaign_id = params['campaign_id'];
        //  this.campaign_id.setValue(this.campaign_id);
      }
    )

    this.opportunityService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.opportunityService.customFieldsList.data;
        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
          if (t.ColumnName == "Mounting_Location" && t.value != null && t.value != '') {
            this.onCustomChange(t.value, t);
          }
          if (t.ColumnName == "Roof_Material" && t.value != null && t.value != '') {
            this.onCustomChange(t.value, t);
          }
          if ((t.form_controlName == "70_Re_Roof_Needed" || t.form_controlName == "1161_ShopHasElectricalSubPanel" || t.form_controlName == "74_Roof_Type" || t.form_controlName == "76_Roof_Material") && t.value) {
            t.value = parseInt(t.value);
          }
          if (t.ColumnName == "PurchaseType") {
            this.purchaseType = t.select_options;
          }
          if (t.ColumnName == "Product") {
            this.productId = t.ref_value
          }

          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'radio') {
            t.listoptions = JSON.parse(t.listoptions);
          }
          if (t.dt_code == 'checkbox') {
            t.listoptions = JSON.parse(t.listoptions);

            let checkdata = new CheckboxData();

            checkdata.controlname = t.form_controlName;
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
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        // console.log('this.customCompnentValues', this.customCompnentValues);
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          //else if (cnt.dt_code == 'datetime') {
          //  val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value,null)); // to convert to local time
          //}
          //else if (cnt.dt_code == 'date') {
          //  val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          //}
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

          if (this.displayType == 'ADD' && cnt.name == 'OwnerId' && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {

              if (itemList.name == this.userName) {
                val = itemList.value;
                cnt.is_readOnly = true;
              }

            });
          }

          if (this.displayType == 'ADD' && cnt.name == 'CampaignId') {
            if (this.campaign_id)
              val = this.campaign_id;

          }

          if (this.displayType == 'ADD' && cnt.name == 'CampaignName') {
            if (this.campaign_id) {
              val = this.campaign_id;

              setTimeout(() => {
                this.GetTypeOntheBaseofRecordType({ value: val }, cnt.select_options, 'page', cnt.form_controlName);

              }, 1000);
            }

          }
          if (this.displayType == 'EDIT' && (cnt.name == 'OwnerId' || cnt.name == 'Setter') && cnt.dt_code == 'select' && cnt.select_options != null && val != null) {
            val = val.toLowerCase();// due to user is in upper case
          }

          if (this.displayType == 'ADD' && cnt.dropdown_type == 'custom' && cnt.parent_id > 1) {
            cnt.select_options = null;
          }
          if (this.displayType == 'EDIT' && cnt.dropdown_type == 'custom' && cnt.parent_id > 1 && (val != '' || val != null)) {// added by aakash goyal , before comment need to discuss used case
            cnt.select_options = null;
          }

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
          if (cnt.name == "AdSetName") {
            var campaignid = this.customCompnentValues.find(x => x.name == "CampaignName").value
            this.opportunityService.getType('', 0, campaignid, 'campaign').subscribe((result: any) => {
              if (result) {

                cnt.select_options = result.data;
              }

            });
          }
          if (cnt.name == "AdName") {
            var campaignid = this.customCompnentValues.find(x => x.name == "AdSetName").value
            this.opportunityService.getType('', 0, campaignid, 'adset').subscribe((result: any) => {
              if (result) {

                cnt.select_options = result.data;
              }

            });
          }

        });

        this.form = new FormGroup(group);
        setTimeout(() => {
          this.loadSave = false;
        }, 1000);
        this.productInfo();
      }
    });

    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Opportunity',
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
            name: 'Manage Opportunity',
            isLink: true,
            link: '/opportunity'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  showgroup(data: any) {
    var _flag = false;
    //  let newjson = JSON.parse(data);
    data.forEach(function (t) {
      if (t.form_field_visibility === 'YES' || t.edit_form_field_visibility === 'YES') {
        _flag = true;
      }
    });
    return _flag;
  }
  GetTypeOntheBaseofRecordType(e: any, dataList: any, type: any, form_controlName: any, formControlList?: any) {
    if (e) {
      if (form_controlName.includes("CampaignName")) {


        if (type == "page") {

          for (var i = 0; i < this.customCompnentValues.length; i++) {
            if (this.customCompnentValues[i].name.includes("CampaignId")) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.value);
            }
            if (this.customCompnentValues[i].name.includes("CampaignName")) {
              this.opportunityService.getType('', 0, e.value, 'campaign').subscribe((result: any) => {

                if (result) {
                  // this.customCompnentValues[i].select_options = result[0].value; //
                  //this.form.get(this.RecordTypeControlName).setValue(result.data);  

                  this.customCompnentValues.forEach(ct => {

                    if (ct.name == "AdSetName" || ct.name == "AdSetId") {

                      this.form.get(ct.form_controlName).setValue(null)
                      ct.select_options = null;
                      ct.select_options = result.data;
                    }
                    // if (ct.select_options == null) {
                    this.customCompnentValues.forEach(cnt => {
                      if (cnt.name == "AdName" || cnt.name == "AdId") {
                        this.form.get(cnt.form_controlName).setValue(null)
                        cnt.select_options = null;
                        // cnt.select_options = result.data;
                      }
                    });
                    // }
                  });
                }
              });

            }
          }
        }

        if (type == "edit") {

          this.opportunityService.getType('', 0, e, 'campaign').subscribe((result: any) => {
            if (result) {
              dataList.forEach(cnt => {
                if (cnt.name == "AdSetName" || cnt.name == "AdSetId") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                  cnt.select_options = result.data;
                }
                if (cnt.select_options == null) {
                  this.customCompnentValues.forEach(cnt => {
                    if (cnt.name == "AdName" || cnt.name == "AdId") {
                      this.form.get(cnt.form_controlName).setValue(null)
                      cnt.select_options = null;
                      cnt.select_options = result.data;
                    }
                  });
                }
              });
            }
          });
        }
      }
      else if (form_controlName.includes("AdSetName")) {
        if (type == "page") {
          for (var i = 0; i < this.customCompnentValues.length; i++) {
            if (this.customCompnentValues[i].name.includes("AdSetId")) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.value);
            }
            if (this.customCompnentValues[i].name.includes("AdSetName")) {
              this.opportunityService.getType('', 0, e.value, 'adset').subscribe((result: any) => {
                if (result) {
                  // this.customCompnentValues[i].select_options = result[0].value; //
                  //this.form.get(this.RecordTypeControlName).setValue(result.data);  

                  this.customCompnentValues.forEach(cnt => {

                    if (cnt.name == "AdName" || cnt.name == "AdId") {
                      this.form.get(cnt.form_controlName).setValue(null)
                      cnt.select_options = null;
                      cnt.select_options = result.data;
                    }
                  });
                }
              });

            }
          }
        }

        if (type == "edit") {
          this.opportunityService.getType('', 0, e, 'adset').subscribe((result: any) => {
            if (result) {
              dataList.forEach(cnt => {
                if (cnt.name == "AdSetName" || cnt.name == "AdSetId") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                  cnt.select_options = result.data;
                }
              });
            }
          });
        }
      }
      else if (form_controlName.includes("AdName")) {
        if (type == "page") {
          for (var i = 0; i < this.customCompnentValues.length; i++) {
            if (this.customCompnentValues[i].name.includes("AdId")) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.value);
            }
          }
        }

      }
      else if (form_controlName.includes('Loan_Product')) {
        this.loanProductInfo(e.value);
      }
      else if (form_controlName.includes('Product')) {
        this.productInfo(e.value);
      }

      else if (form_controlName.includes('PurchaseType')) {
        if (typeof formControlList !== 'undefined') {
          if (e.name != 'Loan') {
            let groupCheck = formControlList.filter(y => y.group_name.includes('Loan Product'));
            groupCheck[0].InnerData.forEach(function (t) {
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
              // t.is_required=false;
            });
            for (var i = 0; i < this.customCompnentValues.length; i++) {

              if (this.customCompnentValues[i].name.includes("Loan_Product")) {
                this.form.get(this.customCompnentValues[i].form_controlName).setValidators(null);
                this.form.get(this.customCompnentValues[i].form_controlName).updateValueAndValidity();
              }
            }
          }
          else {
            let groupCheck = formControlList.filter(y => y.group_name.includes('Loan Product'));
            groupCheck[0].InnerData.forEach(function (t) {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';
              // t.is_required=false;
            });
            for (var i = 0; i < this.customCompnentValues.length; i++) {
              if (this.customCompnentValues[i].name.includes("Loan_Product")) {
                this.form.get(this.customCompnentValues[i].form_controlName).setValidators([Validators.required]);
                this.form.get(this.customCompnentValues[i].form_controlName).updateValueAndValidity();
              }
            }
          }
        }
      }
    }
    else {
      if (form_controlName.includes('Loan_Product')) {
        for (var i = 0; i < this.customCompnentValues.length; i++) {

          if (this.customCompnentValues[i].name.includes("Apr")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue("");
          }
          else if (this.customCompnentValues[i].name.includes("LoanTerm")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue('');
          }
          else if (this.customCompnentValues[i].name.includes("LenderName")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue('');
          }

        }
      }
      else if (form_controlName.includes('Product')) {
        for (var i = 0; i < this.customCompnentValues.length; i++) {

          if (this.customCompnentValues[i].name.includes("ProductFamily")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue("");
          }
          else if (this.customCompnentValues[i].name.includes("IsApplicableForLoan")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue(0);
          }
          else if (this.customCompnentValues[i].name.includes("PurchaseType")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue(null)
            this.customCompnentValues[i].is_readOnly = "true"
          } else if (this.customCompnentValues[i].name.includes("Loan_Product")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
          }
          else if (this.customCompnentValues[i].name.includes("Apr")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue("");
          }
          else if (this.customCompnentValues[i].name.includes("LoanTerm")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue('');
          }
          else if (this.customCompnentValues[i].name.includes("LenderName")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue('');
          }
          let groupCheck = formControlList.filter(y => y.group_name.includes('Loan Product'));
          groupCheck[0].InnerData.forEach(function (t) {
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';
            // t.is_required=false;
          });
        }
      }
      else if (form_controlName.includes('PurchaseType')) {
        for (var i = 0; i < this.customCompnentValues.length; i++) {

          if (this.customCompnentValues[i].name.includes("Apr")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue("");
          }
          else if (this.customCompnentValues[i].name.includes("LoanTerm")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue('');
          }
          else if (this.customCompnentValues[i].name.includes("LenderName")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue('');
          }
          else if (this.customCompnentValues[i].name.includes("Loan_Product")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
            this.form.get(this.customCompnentValues[i].form_controlName).setValidators(null);
            this.form.get(this.customCompnentValues[i].form_controlName).updateValueAndValidity();
          }
        }
        let groupCheck = formControlList.filter(y => y.group_name.includes('Loan Product'));
        groupCheck[0].InnerData.forEach(function (t) {
          t.form_field_visibility = 'NO';
          t.edit_form_field_visibility = 'NO';

          t.is_required = false;
        })
      }

    }
  }

  productInfo(selected?: any) {

    var value;
    var selectedValue;
    // this.customCompnentValues[i].is_readOnly="true";

    if (!selected) {
      console.log('test')
    }
    for (var i = 0; i < this.customCompnentValues.length; i++) {
      if (this.customCompnentValues[i].name == "Product") {
        value = this.customCompnentValues[i].select_options;
        if (selected && selected != 1) {
          selectedValue = selected;
        }
        else {
          selectedValue = this.customCompnentValues[i].value;
        }
      }
      else if (this.customCompnentValues[i].name == "ProductFamily") {
        if (value != null) {
          value.forEach(element => {
            if (selectedValue == element.value) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(element.first_value);
            }
          });
        } else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
        }
      }
      else if (this.customCompnentValues[i].name == "IsApplicableForLoan") {
        debugger
        if (value != null) {
          value.forEach(element => {
            if (selectedValue == element.value) {
              this.isLoanProduct = element.second_value;
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(Number(element.second_value));
            }
          })

        } else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
        }
      }
      else if (this.customCompnentValues[i].name == "PurchaseType") {
        this.customCompnentValues[i].is_readOnly = null;
        debugger;
        if (selected > 1) {
          this.productId = selected
        }
        if (this.purchaseType.filter(x => x.name != 'Cash').length > 0 && this.purchaseType && (this.isLoanProduct == 1 && this.isLoanProduct)) {
          this.customCompnentValues[i].select_options = this.purchaseType

          if (this.purchaseType.filter(x => x.name == 'Loan')[0].value == this.customCompnentValues[i].value) {
            if (selected == null) {
              let groupCheck = this.formControlList.filter(y => y.group_name.includes('Loan Product'));
              console.log(groupCheck[0].InnerData[0].group_id, groupCheck[0].InnerData[0].group_display_name, '1');
              groupCheck[0].InnerData.forEach(function (t) {
                console.log(t.group_id, t.group_display_name, '1');
                t.form_field_visibility = 'YES';
                t.edit_form_field_visibility = 'YES'
              });
            }
          }
          else 
          {
            let groupCheck = this.formControlList.filter(y => y.group_name.includes('Loan Product'));
            console.log(groupCheck[0].InnerData[0].group_id, groupCheck[0].InnerData[0].group_display_name, '2');
            groupCheck[0].InnerData.forEach(function (t) {
              console.log(t.group_id, t.group_display_name, '2');
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
            });
          }
        }
        else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
          this.customCompnentValues[i].select_options = this.purchaseType.filter(x => x.name == 'Cash');
          let groupCheck = this.formControlList.filter(y => y.group_name.includes('Loan Product'));
          console.log(groupCheck[0].InnerData[0].group_id, groupCheck[0].InnerData[0].group_display_name, '1');
          groupCheck[0].InnerData.forEach(function (t) {
            console.log(t.group_id, t.group_display_name, '1');
            t.form_field_visibility = 'NO';
            t.edit_form_field_visibility = 'NO';

            // t.is_required=false;
          });
        }

        if (selected == 0) {

          if (this.purchaseType.filter(x => x.name == 'Loan').length > 0 && (this.customCompnentValues[i].ref_value == this.purchaseType.filter(x => x.name == 'Loan')[0].value)) {
            let groupCheck = this.formControlList.filter(y => y.group_name.includes('Loan Product'));
            groupCheck[0].InnerData.forEach(function (t) {
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';
              // t.is_required=false;
            });
          }
          else {
            let groupCheck = this.formControlList.filter(y => y.group_name.includes('Loan Product'));
            console.log(groupCheck[0].InnerData[0].group_id, groupCheck[0].InnerData[0].group_display_name, '2');

            groupCheck[0].InnerData.forEach(function (t) {
              console.log(t.group_id, t.group_display_name, '2');
              t.form_field_visibility = 'NO';
              t.edit_form_field_visibility = 'NO';
            });
          }

        }
        if (!this.productId) {
          this.customCompnentValues[i].is_readOnly = "true";
        }
      }

    }
  }
  loanProductInfo(selected: any) {
    var value;
    var selectedValue;
    if (!selected) {
      console.log('test')
    }
    for (var i = 0; i < this.customCompnentValues.length; i++) {
      if (this.customCompnentValues[i].name == "Loan_Product") {
        value = this.customCompnentValues[i].select_options;
        if (selected && selected != 1) {
          selectedValue = selected;
        }
        else {
          selectedValue = this.customCompnentValues[i].value;
        }
      }
      else if (this.customCompnentValues[i].name == "Apr") {
        if (value != null) {
          value.forEach(element => {
            if (selectedValue == element.value) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(element.first_value);
            }
          });
        } else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
        }
      }
      else if (this.customCompnentValues[i].name == "LoanTerm") {
        if (value != null) {

          value.forEach(element => {
            if (selectedValue == element.value) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(element.second_value);
            }
          });
        } else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
        }
      }
      else if (this.customCompnentValues[i].name == "LenderName") {
        if (value != null) {
          value.forEach(element => {
            if (selectedValue == element.value) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(element.third_value);
            }
          });
        } else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
        }
      }

    }
  }
  onAccountChange(e: any, inner: any) {
    if (e) {
      if (e.value && inner.ColumnName == "AccountId") {
        e = e.value
        this.workOrderService.GetWorkOrderAccountDetail(e).subscribe((result: any) => {
          if (result) {
            //  result = JSON.parse(result);
            debugger;

            this.customCompnentValues.forEach(cnt => {
              if (cnt.ColumnName == "ContactId") {
                if (result.Contacts) {
                  cnt.select_options = null;
                  (cnt.select_options as any[]) = result.Contacts;
                  cnt.is_readOnly = null;
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                  cnt.is_readOnly = null;
                }
              }

              // this.form.get(cnt.form_controlName)?.setValue(result.)
            });
          }
        });
        // this.clearCustomChange(inner);
      }

    }

  }
  onClearLang(dataList: any, j: number): void {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    const cntrlName = dataList[j].name;
    this.searchText = '';
    if (cntrlName != "AdSetName" && cntrlName != "AdName") {
      this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        this.scrollDataList = this.commonService.customFieldsListData;
        // console.log('scrollDataList:', this.scrollDataList);
        (dataList[j].select_options as any[]) = this.scrollDataList;
      })
    }
    dataList.forEach(cnt => {
      if (cntrlName == "CampaignName") {
        if (cnt.name == "CampaignName" || cnt.name == "CampaignId") {
          this.form.get(cnt.form_controlName).setValue(null)
          // cnt.select_options = null;
        }
        if (cnt.name == "AdSetName" || cnt.name == "AdSetId") {
          this.form.get(cnt.form_controlName).setValue(null)
          cnt.select_options = null;
        }
        if (cnt.name == "AdName" || cnt.name == "AdId") {
          this.form.get(cnt.form_controlName).setValue(null)
          cnt.select_options = null;
        }
      }
      if (cntrlName == "AdSetName") {
        var data = dataList.find(x => x.ColumnName == "CampaignName");
        var campaignId = this.form.get(data.form_controlName).value
        this.opportunityService.getType('', 0, campaignId, 'campaign').subscribe((result: any) => {
          if (result) {
            dataList.forEach(cnt => {
              if (cnt.name == "AdSetName" || cnt.name == "AdSetId") {
                this.form.get(cnt.form_controlName).setValue(null)
                cnt.select_options = null;
                cnt.select_options = result.data;
              }
              this.customCompnentValues.forEach(cnt => {
                if (cnt.name == "AdName" || cnt.name == "AdId") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                }
              });

            });
          }
        });
      }
      if (cntrlName == "AdName") {
        var data = dataList.find(x => x.ColumnName == "AdSetName");
        var adsetId = this.form.get(data.form_controlName).value
        this.opportunityService.getType('', 0, adsetId, 'adset').subscribe((result: any) => {
          if (result) {
            dataList.forEach(cnt => {
              this.customCompnentValues.forEach(cnt => {
                if (cnt.name == "AdName" || cnt.name == "AdId") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                  cnt.select_options = result.data;
                }
              });

            });
          }
        });
      }
    })

  }
  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
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
  test(e) {
    // // console.log('sssss', e);
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
    // // console.log(this.form);
  }
  onSubmit() {
    debugger
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      // // console.log(item.controlname);
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    // console.log("EditVal", this.form.value);
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.opportunityId = this.id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      // this.JsonData.companyId = this.companyId;
      // this.JsonData.userId = this.userId;
      const _formData = this.form.value;
      for (let index in _formData) {
        let data = _formData[index];
        if (data) {
          if (Date.prototype.isPrototypeOf(data)) {
            _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
          }
        }
      }

      // console.log("EditVal After", this.form.value);

      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.opportunityService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          let primaryId = Number(result.optionalExtraParamers);
          let flowsList = this.opportunityService.customFieldsList.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
          if (flowsList.length > 0) {
            flowsList.forEach((item) => {
              window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
            });
          }
          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
          //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
          //this.toaster.success(result.responseMessage);
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            //this.router.navigateByUrl("/opportunity");
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
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

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
    //this.router.navigateByUrl("/opportunity");
    this.location.back();
  }

  clearCustomChange(inner: any) {
    this.cleanValues.length = 0;
    this.customCompnentValues.forEach(item => {// clear all dependent child 
      if (inner.custom_field_id == item.parent_id) {
        item.select_options = null;
        this.form.get(item.form_controlName).setValue(null);
        this.cleanValues.push(item);
      }
    });



    if (this.cleanValues.length > 0) {

      this.cleanValues.forEach(clear => { // ? what about  child  and sub child and so on
        this.customCompnentValues.forEach(item => {// clear all dependent child 
          if (clear.custom_field_id == item.parent_id) {
            item.select_options = null;
            this.form.get(item.form_controlName).setValue(null);
          }
        });
      });
    }


  }


  onCustomChange(e: any, inner: any) {
    if (e) {
      if (e.value) {
        e = e.value
        this.clearCustomChange(inner);
      }

      this.opportunityService.GetCascadingData(e, this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
        if (result) {
          this.cascadingCompnentValues = this.opportunityService.cascadingFieldsList.data;
          this.cascadingCompnentValues.forEach(cascading => {
            this.customCompnentValues.forEach(cnt => {
              if (cnt.form_controlName == cascading.form_controlName) {
                cnt.select_options = cascading.m;
              }
            });
          });

        }
      });
    }
    else {
      this.clearCustomChange(inner);
    }
  }



  fillLeadForm(id) {
    this.addOrUpdatePermission = this.isUpdate;
    this.opportunityService.GetOpportunityDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
      // // // console.log("result1212", this.leadService.leadEditPage.data[0]);
      let edit: any
      edit = this.opportunityService.editPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];

          // // console.log("cntname", cntname)
          if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {

            cntValue = JSON.parse(cntValue);
          }
          if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {

            cntValue = (cntValue == 'true');
            // // console.log("cntValuecntValue", cntValue);
          }

          this.checkboxdata1.forEach((item) => { if (cntname == item.controlname) { item.controlvalues = cntValue; } });//for checkboxes on form
          formGroup[cntname] = new FormControl(cntValue);
        })

        // this.form.value.reset();
        this.form = new FormGroup(formGroup);


        //for checkboxes on form
        try {
          this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
          });
          //this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

        }
        catch (err) { }

        // // console.log("formGroup", this.form.value);
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
    // // console.log('new', e);
    //const index2: number = this.formControlList.indexOf(groupdisp);
    //const index1: number = controldisp.display_order;

    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.form_controlName;
    if (e.target.checked) {
      .0
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
    // // console.log('sss', e);
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
      // console.log('scrollDataList:', this.scrollDataList);
      (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);

    })
  }

  onKey(e: any, dataList: any, j: number) {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.scrollDataList);
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }


}
