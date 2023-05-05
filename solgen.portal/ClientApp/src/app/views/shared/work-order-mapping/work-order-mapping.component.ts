import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimeToLocalForAddEditPipe } from 'dynamiccustom-list';
import { ToastrService } from 'ngx-toastr';
import { WorkorderService } from '../../workorder/workorderservice.service';
import { CheckboxData, CommonService, JsonData } from '../common.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-work-order-mapping',
  templateUrl: './work-order-mapping.component.html',
  styleUrls: ['./work-order-mapping.component.scss']
})
export class WorkOrderMappingComponent implements OnInit {

  @ViewChild('workordermappingModal', { static: false }) workordermappingModal: ModalDirective;  //#replyNotesmodel
  @Input('opprAccountId') opprAccountId: any;
  @Input('opprAccountName') opprAccountName: any;
  @Input('OpportunityName') OpportunityNameView: any;
  countChanged: EventEmitter<number> = new EventEmitter();
  @Input() offset: number;

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
  Id: any = '';
  innerHTML: any;
  OpportunityId: any = '';

  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  userName: any;
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  searchText: string;
  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  displayType = 'ADD';
  timeFormat: string;


  constructor(private fb: FormBuilder, private workorderService: WorkorderService,
    private route: ActivatedRoute,
    private toaster: ToastrService, private commonService: CommonService,
    private router: Router, private dialogService: ConfirmationDialogService
  ) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });

    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    // let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    // if (add == undefined) {
    //   this.addOrUpdatePermission = true;
    // } else {

    //   this.addOrUpdatePermission = true;
    // }
    this.addOrUpdatePermission = true;
    this.timeFormat = this.commonService.getTimeFormat();

  }


  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    debugger;
    this.route.paramMap.subscribe(
      params => {
        const opid = params.get('opid');
        let id = params.get('id');

        if (this.commonService.getQueryStringValue("workorder") != null)
          id = this.commonService.getQueryStringValue("workorder");
        if (opid != null)

          this.OpportunityId = opid;
        this.loadSave = true;

        if (id) {
          this.isLead = true;
          this.OpportunityId = id
        }
        if (this.Id) {
          this.pageTitle = 'Edit work order';
          this.displayType = 'Edit'
        }
        else {
          this.pageTitle = 'Add work order';
          this.displayType = 'ADD'
        }

      }

    );


    this.workorderService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.OpportunityId, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.workorderService.customFieldsList.data;

        // // console.log("this.customCompnentValues", this.customCompnentValues);
        debugger;
        let fieldArray = [];
        this.formControlList.splice(0);
        this.customCompnentValues.forEach(t => {
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
        data_type_name: Text
        const convertdatetime = new DateTimeToLocalForAddEditPipe();

        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (this.opprAccountId > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            if (this.opprAccountName && this.opprAccountName != '' && this.opprAccountName != null) {
              this.len = 0
              this.custom_field_id = cnt.custom_field_id;
              this.field_code = cnt.field_code;
              this.searchText = this.opprAccountName;
              this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {

                this.scrollDataList = this.commonService.customFieldsListData;

                (cnt.select_options as any[]) = (cnt.select_options as any[]).concat(this.scrollDataList);//this.scrollDataList;
              })
            }
          }
      

          // if (cnt.dt_code == 'select' && cnt.field_code == 'OPPORTUNITIES') {
          //   if (this.OpportunityNameView && this.OpportunityNameView != '' && this.OpportunityNameView != null) {
          //     this.len = 0
          //     this.custom_field_id = cnt.custom_field_id;
          //     this.field_code = cnt.field_code;
          //     this.searchText = this.OpportunityNameView;
          //     this.form
          //     // this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
          //     //   debugger;
          //     //   this.scrollDataList = this.commonService.customFieldsListData;
          //     //   (cnt.select_options as any[]) = (cnt.select_options as any[]).concat(this.scrollDataList);
          //     // })
          //   }
          // }


        
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
         
          //////else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
          //////  if (cnt.value == "") {
          //////    val = null;
          //////  } else {
          //////    let val1 = new Date(cnt.value);
          //////    val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
          //////  }
          //////}
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

          if (this.OpportunityId > 0 && cnt.name == 'OpportunityId') {

            cnt.is_readOnly = true;
            cnt.is_required = true;
            val = this.OpportunityId;
          }
          if (this.OpportunityId > 0 && cnt.name == 'AccountId') {
            cnt.is_readOnly = true;
            val = cnt.select_options[0].value;
            cnt.is_required = true;
          }
          if (this.displayType.toLowerCase() == 'ADD'.toLowerCase() && cnt.name.toLowerCase() == 'OwnerId'.toLowerCase() && cnt.dt_code.toLowerCase() == 'select'.toLowerCase() && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
                cnt.is_readOnly = true;
              }
            });
          }
          else if (this.displayType.toLowerCase() == 'EDIT'.toLowerCase() && cnt.name.toLowerCase() == 'OwnerId'.toLowerCase() && cnt.dt_code.toLowerCase() == 'select'.toLowerCase() && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
                cnt.is_readOnly = true;
              }
            });
          }

          if (this.opprAccountId > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            if (this.opprAccountId && this.opprAccountId != '' && this.opprAccountId != null) {
              val = this.opprAccountId.toString();
              cnt.value = val;
              cnt.is_required = null;
            }
          }
          if (this.OpportunityId > 0 && cnt.dt_code == 'select' && cnt.field_code == 'OPPORTUNITIES') {
            if (this.OpportunityId && this.OpportunityId != '' && this.OpportunityId != null) {
              debugger;
              val = this.OpportunityId.toString();
              cnt.value = val;
              cnt.is_required = null;
            }
          }


          //if ( cnt.name == 'OwnerId') {
          //  val = this.userName;
          //}
          if (cnt.dt_code == 'map') {

            let baseUrl = cnt.value;
            let body = cnt.value;
            body = body.replace(/href/g, "value");
            body = body.replace(new RegExp(baseUrl, 'g'), "");

          }
          if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {
            if (cnt.value != '') {
              debugger
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
          if (cnt.ColumnName == 'Opportunity__c' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
            cnt.is_readOnly = false;
          }
          if (cnt.ColumnName == 'ContactId' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
            cnt.is_readOnly = false;
          }
          if (cnt.ColumnName == 'Proposal__c' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
            cnt.is_readOnly = false;
          }
          if (cnt.ColumnName == 'Contract__c' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase()) {
            cnt.is_readOnly = false;
          }

          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
        // // console.log("validationFROM", this.form);
        this.loadSave = false;
      }
      this.onCustomChange(this.opprAccountId);
    });




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
  test(e) {
    // // console.log('sssss', e);
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
    // // console.log(this.form);
  }
  onSubmit() {
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
    // // console.log("EditVal", this.form.value);
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.Id = this.Id;

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

      this.workorderService.manageWorkOrder(this.JsonData).subscribe((result: any) => {
        ;
        if (result.statusCode == 200) {
          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
          //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
          //this.toaster.success(result.responseMessage);
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.commonService.setUpdatedOpportunity = true;
            this.workordermappingModal.hide();

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





  //      this.form = new FormGroup(formGroup);
  //      // // console.log("EdittttPageee", this.form);
  //      this.loadSave = false;

  //    }
  //  },
  //    (error: any) => {
  //      this.loadSave = false;
  //    })

  //}

  // fillLeadForm(id) {

  //   this.workorderService.GetContractDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
  //     // // // console.log("result1212", this.leadService.leadEditPage.data[0]);
  //     let edit: any
  //     edit = this.workorderService.editPage.data[0];
  //     //let empty = null;
  //     const formGroup = {};
  //     if (result) {
  //       Object.keys(edit).forEach(t => {
  //         let cntname = t;
  //         let cntValue = edit[t] == '' ? null : edit[t];

  //         // // console.log("cntname", cntname)
  //         if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {

  //           cntValue = JSON.parse(cntValue);
  //         }
  //         if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {

  //           cntValue = (cntValue == 'true');
  //           // // console.log("cntValuecntValue", cntValue);
  //         }

  //         this.checkboxdata1.forEach((item) => { if (cntname == item.controlname) { item.controlvalues = cntValue; } });//for checkboxes on form
  //         formGroup[cntname] = new FormControl(cntValue);
  //       })

  //       // this.form.value.reset();
  //       this.form = new FormGroup(formGroup);


  //       //for checkboxes on form
  //       try {
  //         this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
  //           this.form.get(item.controlname).setValue(item.controlvalues.split(','));
  //         });
  //         //this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

  //       }
  //       catch (err) { }
  //       // // console.log("formGroup", this.form.value);
  //       this.loadSave = false;

  //     }
  //   },
  //     (error: any) => {
  //       this.loadSave = false;
  //     })

  // }
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
    // // console.log('sss', e);
    var dd = this.formControlList;

  }

  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }

  private fetchMore(dataList: any, j: number) {

    // console.log("e", dataList);
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
  getInnervalue(data: string): string {
    let variable: string = data.substring(data.indexOf("\""));
    // console.log("variable", variable);
    return variable;
  }




  show(id?: any) {
    debugger;
    if (id) {
      this.Id = id;
      this.pageTitle = 'Edit Work Order';
      this.displayType = 'EDIT';
      this.ngOnInit()
      this.workordermappingModal.show();
    }
    else {

      this.Id = null;
      this.pageTitle = 'Add Work Order';
      this.displayType = 'Add';
      this.ngOnInit();
      this.workordermappingModal.show();
    }
  }
  onCustomChange(e: any) {
    debugger;
    if (e) {
      // if (e.value && inner.ColumnName == "AccountId") {
      //   e = e.value
      this.workorderService.GetWorkOrderAccountDetail(e).subscribe((result: any) => {
        if (result) {
          //  result = JSON.parse(result);
          debugger;
          this.customCompnentValues.forEach(cnt => {
            if (cnt.ColumnName == "Opportunity__c") {
              if (result.Opportunities) {
                cnt.select_options = null;
                (cnt.select_options as any[]) = result.Opportunities;
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "ContactId") {
              if (result.Contracts) {
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
                cnt.is_readOnly = null;
                (cnt.select_options as any[]) = result.ServiceTerritory
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
    // else if (e.value && inner.ColumnName == "WorkTypeId") {
    //   e = e.value;
    //   this.workorderService.GetDurationByType(e).subscribe(res => {
    //     if (res) {
    //       debugger;
    //       this.customCompnentValues.forEach(cnt => {
    //         console.log(cnt);
    //         if (cnt.ColumnName == "Duration") {
    //           cnt.value = res;
    //           this.form.get(cnt.form_controlName).setValue(res);
    //         }
    //       });
    //     }
    //   })

    // }
    // }
    // else {
    //   if (inner.ColumnName == "AccountId") {
    //     this.customCompnentValues.forEach(cnt => {
    //       if (cnt.ColumnName == "Opportunity__c" || cnt.ColumnName == "ContactId" ||
    //         cnt.ColumnName == "Proposal__c" || cnt.ColumnName == "Contract__c" || cnt.ColumnName == "ServiceTerritoryId"
    //         || cnt.ColumnName == "Street" || cnt.ColumnName == "Country" || cnt.ColumnName == "State" ||
    //         cnt.ColumnName == "City" || cnt.ColumnName == "PostalCode") {
    //         cnt.value = null;
    //         cnt.select_options = null;
    //         cnt.is_readOnly = "true";
    //         this.form.get(cnt.form_controlName).setValue(null);
    //       }
    //     });
    //   }
    //   else if (inner.ColumnName == "WorkTypeId") {
    //     this.customCompnentValues.forEach(cnt => {
    //       if (cnt.ColumnName == "Duration") {
    //         cnt.value = null;
    //         this.form.get(cnt.form_controlName).setValue(null);
    //       }
    //     });
    //   }
    // }
  }
  close() {
    this.workordermappingModal.hide();
    // this.addMappingLocationForm.reset();
  }


}


