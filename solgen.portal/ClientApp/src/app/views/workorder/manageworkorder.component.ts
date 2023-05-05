import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { JsonData, WorkorderService, CheckboxData, StartWorkOrderModel } from './workorderservice.service';
import { Location } from '@angular/common';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
@Component({
  selector: 'app-manageworkorder',
  templateUrl: './manageworkorder.component.html',
  styleUrls: ['./manageworkorder.component.scss']
})
export class ManageworkorderComponent implements OnInit {
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'workorder';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  WorkOrderId: any = '';
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  displayType = 'ADD';
  isUpdate: boolean = true;
  isDelete: boolean = false;
  isAdd: boolean = true;
  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;
  timeFormat: string = '12';
  prevStatusCodeId: number;
  StatusControlname: string;
  contentHeader: object;
  companyType: any = '';
  userName: any = '';
  executionFlow: any[] = [];
  cleanValues: any[] = [];
  constructor(private fb: FormBuilder, private workOrderService: WorkorderService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private location: Location) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.companyType = userdetail.companyType;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });

  }


  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.loadSave = true;
    this.addOrUpdatePermission = false;

    var data = this.commonService.getLoggedInName.value;
    this.userId = data.id;
    this.companyId = data.companyId;
    this.modulePermission = this.commonService.getPermissiondata(this.route.snapshot.data.moduleCode);

    // this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'WORKORDERADD');
    // this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'WORKORDERUPDATE');
    // this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'WORKORDERDELETE');

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.WorkOrderId = id;
          this.isLead = true;
          this.pageTitle = 'Edit Work Order';
          this.displayType = 'EDIT';
          this.addOrUpdatePermission = this.isUpdate;
        } else {
          this.WorkOrderId = '';
          this.displayType = 'ADD'
          this.pageTitle = 'Add Work Order';
          this.addOrUpdatePermission = this.isAdd;
        }
      }
    );

    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.WorkOrderId, this.displayType).subscribe(resp => {
      if (resp) {
        ;
        this.customCompnentValues = resp.data;
        this.executionFlow = resp.executionFlow;
        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
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
        data_type_name: Text
        const convertdatetime = new DateTimeToLocalForAddEditPipe();

        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {
           
            if (cnt.value != '') {
              cnt.value = cnt.value.toLowerCase();
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  val = itemList.name;
                  cnt.dt_code = 'text';
                  cnt.is_readOnly = true;
                }
              });
            } else {
              cnt.dt_code = 'text';
              cnt.is_readOnly = true;
            }
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
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          if (cnt.ColumnName == 'Status') {
            this.prevStatusCodeId = cnt.ref_value;
            this.StatusControlname = cnt.form_controlName
          }
          if (cnt.ColumnName == 'Opportunity__c' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
           cnt.is_readOnly=false;
          }
          if (cnt.ColumnName == 'ContactId' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
            cnt.is_readOnly=false;
           }
           if (cnt.ColumnName == 'Proposal__c' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
            cnt.is_readOnly=false;
           }
           if (cnt.ColumnName == 'Contract__c' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
            cnt.is_readOnly=false;
           }
          if (this.displayType == 'ADD' && cnt.name == 'OwnerId' && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
                //cnt.is_readOnly = true;
              }
            });
          }
          else if (this.displayType == 'EDIT' && cnt.name == 'OwnerId' && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
                //cnt.is_readOnly = true;
              }
            });
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        this.loadSave = false;
      }
    });
    this.timeFormat = this.commonService.getTimeFormat();

    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage WorkOrder',
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
            name: 'Manage WorkOrder',
            isLink: true,
            link: '/workorder'
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
  test(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
  }


  onSubmit() {
    debugger
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.WorkOrderId;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      // console.log("this.form.value", this.form.value);
      const NewStatusId = this.form.get(this.StatusControlname).value;
      const _formData = this.form.value;
      // console.log("_formData", _formData);
      for (let index in _formData) {
        let data = _formData[index];
        if (data) {
          if (Date.prototype.isPrototypeOf(data)) {
            _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
          }
        }
      }

      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.workOrderService.manageWorkOrder(this.JsonData).subscribe((result: any) => {

        if (result.statusCode == 200) {
          debugger;
          let primaryId = Number(result.optionalExtraParamers);
          let flowsList = this.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
          if (flowsList.length > 0) {
            flowsList.forEach((item) => {
              window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
            });
          }
          this.toaster.success(result.responseMessage);
          this.loadSave = false;
          this.location.back();

          if (this.prevStatusCodeId != NewStatusId) {
            let model: StartWorkOrderModel = new StartWorkOrderModel;
            model.workOrderId = this.WorkOrderId;
            model.statusId = NewStatusId;
            model.moduleName = this.moduleName;
            model.submoduleName = this.submoduleName;
            this.workOrderService.updateStatusOrCreateLog(model).subscribe(result => {
            }, error => {
            }, () => {
            });
          }
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
  // clearCustomChange(inner: any) {
  //   this.cleanValues.length = 0;
  //   this.customCompnentValues.forEach(item => {// clear all dependent child 
  //     if (inner.custom_field_id == item.parent_id) {
  //       item.select_options = null;
  //       this.form.get(item.form_controlName).setValue(null);
  //       this.cleanValues.push(item);
  //     }
  //   });
  // }

  onCustomChange(e: any, inner: any) {
    if (e) {
      if (e.value && inner.ColumnName == "AccountId") {
        e = e.value
        this.workOrderService.GetWorkOrderAccountDetail(e).subscribe((result: any) => {
          if (result) {
          //  result = JSON.parse(result);
          debugger;

            this.customCompnentValues.forEach(cnt => {
              if (cnt.ColumnName == "Opportunity__c") {
                if (result.Opportunities) {
                  cnt.select_options = null;
                  (cnt.select_options as any[]) = result.Opportunities;
                  cnt.is_readOnly = null;
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                  cnt.is_readOnly = null;
                }
              }

              else if (cnt.ColumnName == "ContactId") {
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
              
              else if (cnt.ColumnName == "Proposal__c") {
                if (result.Proposals) {
                  cnt.select_options = null;
                  (cnt.select_options as any[]) = result.Proposals;
                  cnt.is_readOnly = null;
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                  cnt.is_readOnly = null;
                }
              }
              else if (cnt.ColumnName == "Contract__c") {
                debugger;
                if (result.Contracts) {
                  cnt.select_options = null;
                  (cnt.select_options as any[]) = result.Contracts;
                  cnt.is_readOnly = null;
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                  cnt.is_readOnly = null;
                }
              }
              else if (cnt.ColumnName == "ServiceTerritoryId") {
                if (result.ServiceTerritory) {
                  cnt.select_options = null;
                 
                  (cnt.select_options as any[]) = result.ServiceTerritory;
                  this.form.get(cnt.form_controlName).setValue(result.ServiceTerritory[0].value);

                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "Street") {
                if (result.ShippingStreet) {

                  cnt.value = result.ShippingStreet;
                  this.form.get(cnt.form_controlName).setValue(result.ShippingStreet.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "Country") {
                if (result.ShippingCountry) {
                  cnt.select_options = [];
                  if (cnt.select_options && !cnt.select_options.find(x => x.value == result.ShippingCountry)) {
                    (cnt.select_options as any[]) = (cnt.select_options as any[])
                      .concat([{ name: result.CountryName, value: result.ShippingCountry.toString() }])
                  }
                  cnt.value = result.ShippingCountry.toString();
                  this.form.get(cnt.form_controlName).setValue(result.ShippingCountry.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "State") {
                if (result.ShippingState) {
                  cnt.select_options = [];
                  if (cnt.select_options && !cnt.select_options.find(x => x.value == result.ShippingState)) {
                    (cnt.select_options as any[]) = (cnt.select_options as any[])
                      .concat([{ name: result.StateName, value: result.ShippingState.toString() }])
                  }
                  cnt.value = result.ShippingState.toString();
                  this.form.get(cnt.form_controlName).setValue(result.ShippingState.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "City") {
                if (result.ShippingCity) {

                  cnt.value = result.ShippingCity;
                  this.form.get(cnt.form_controlName).setValue(result.ShippingCity.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "PostalCode") {
                if (result.ShippingZipCode) {

                  cnt.value = result.ShippingZipCode;
                  this.form.get(cnt.form_controlName).setValue(result.ShippingZipCode.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              // this.form.get(cnt.form_controlName)?.setValue(result.)
            });
          }
        });
        // this.clearCustomChange(inner);
      }
      else if (e.value && inner.ColumnName == "WorkTypeId") {
        e = e.value;
        this.workOrderService.GetDurationByType(e).subscribe(res => {
          if (res) {
            debugger;
            this.customCompnentValues.forEach(cnt => {
              console.log(cnt);
              if (cnt.ColumnName == "Duration") {
                cnt.value = res;
                this.form.get(cnt.form_controlName).setValue(res);
              }
            });
          }



        })

      }
    }
    else {
      if (inner.ColumnName == "AccountId") {
        this.customCompnentValues.forEach(cnt => {
          if (cnt.ColumnName == "Opportunity__c" || cnt.ColumnName == "ContactId" ||
            cnt.ColumnName == "Proposal__c" || cnt.ColumnName == "Contract__c" || cnt.ColumnName == "ServiceTerritoryId"
            || cnt.ColumnName == "Street" || cnt.ColumnName == "Country" || cnt.ColumnName == "State" ||
            cnt.ColumnName == "City" || cnt.ColumnName == "PostalCode") {
            cnt.value = null;
            cnt.select_options = null;
            cnt.is_readOnly = "true";
            this.form.get(cnt.form_controlName).setValue(null);
          }
        });
      }
      else if (inner.ColumnName == "WorkTypeId") {
        this.customCompnentValues.forEach(cnt => {
          if (cnt.ColumnName == "Duration") {
            cnt.value = null;
            this.form.get(cnt.form_controlName).setValue(null);
          }
        });
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
    let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
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

  onClearLang(dataList: any, j: number): void {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = '';
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.scrollDataList);
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }
  getreturnNumber(x, y) {
    return x + y;
  }
}
