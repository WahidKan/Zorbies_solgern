import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DateTimeToLocalForAddEditPipe } from 'src/app/pipes/datetime.pipe';
import { ProposallistService, CheckboxData } from '../../proposal/proposallist.service';
import { CommonService, ModuleList } from '../common.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { JsonData, ProposalMappingService } from './proposal-mapping.service';


@Component({
  selector: 'app-proposal-mapping',
  templateUrl: './proposal-mapping.component.html',
  styleUrls: ['./proposal-mapping.component.scss']
})
export class ProposalMappingComponent implements OnInit {

  @ViewChild('proposalmappingModal', { static: false }) proposalmappingModal: ModalDirective;  //#replyNotesmodel
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
  submoduleName = 'proposal';
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


  constructor(private fb: FormBuilder, private proposalService: ProposallistService,
    private route: ActivatedRoute, private proposalMappingService: ProposalMappingService,
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
    this.route.paramMap.subscribe(
      params => {
        const opid = params.get('opid');
        let id = params.get('id');

        if (this.commonService.getQueryStringValue("proposal") != null)
          id = this.commonService.getQueryStringValue("proposal");
        if (opid != null)
          this.OpportunityId = opid;
        this.loadSave = true;

        if (id) {
          this.isLead = true;
          this.OpportunityId = id
        }
        if (this.Id) {
          this.pageTitle = 'Edit Proposal';
          this.displayType = 'Edit'
        }
        else {
          this.pageTitle = 'Add Proposal';
          this.displayType = 'ADD'
        }

      }

    );




    this.proposalService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.OpportunityId, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.proposalService.customFieldsList.data;

        // // console.log("this.customCompnentValues", this.customCompnentValues);

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

          if (cnt.dt_code == 'select' && cnt.field_code == 'OPPORTUNITIES') {
            if (this.OpportunityNameView && this.OpportunityNameView != '' && this.OpportunityNameView != null) {
              this.len = 0
              this.custom_field_id = cnt.custom_field_id;
              this.field_code = cnt.field_code;
              this.searchText = this.OpportunityNameView;
              // this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {

              //   this.scrollDataList = this.commonService.customFieldsListData;
              //   (cnt.select_options as any[]) = (cnt.select_options as any[]).concat(this.scrollDataList);
              // })
            }
            cnt.is_readOnly=true;
          }


          let val = null;
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
          else if (cnt.dt_code == 'datetime' && cnt.name != 'CreatedDate' && cnt.name != 'LastModifiedDate') {
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
            
            cnt.is_required = true;
            val = this.OpportunityId;

          }
          if (this.OpportunityId > 0 && cnt.name == 'AccountId') {
            val = cnt.select_options[0].value;
            cnt.is_required = true;
          }

          if (this.opprAccountId > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            if (this.opprAccountId && this.opprAccountId != '' && this.opprAccountId != null) {
              val = this.opprAccountId.toString();
              cnt.value = val;
              cnt.is_required = null;
            }
          }
          if (this.Id > 0 && cnt.dt_code == 'select' && cnt.field_code == 'OPPORTUNITIES') {
            if (this.Id && this.Id != '' && this.Id != null) {
              ;
              cnt.is_required = null;
            }
          }
          if (this.displayType.toLowerCase() == 'ADD'.toLowerCase() && cnt.name.toLowerCase() == 'OwnerID'.toLowerCase() && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
              }
            });
            cnt.value=val
            cnt.is_readOnly = true;

          }
          else if (this.displayType.toLowerCase() == 'EDIT'.toLowerCase() && cnt.name.toLowerCase() == 'OwnerID'.toLowerCase() && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
              }
            });
            cnt.value=val
            cnt.is_readOnly = true;
          }


          //if ( cnt.name == 'OwnerID') {
          //  val = this.userName;
          //}
          if (cnt.dt_code == 'map') {

            let baseUrl = cnt.value;
            let body = cnt.value;
            body = body.replace(/href/g, "value");
            body = body.replace(new RegExp(baseUrl, 'g'), "");

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
      this.GetopportunityDetailsByid(this.OpportunityId);
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
      ;
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

      this.proposalService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
          //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
          //this.toaster.success(result.responseMessage);
          if (this.displayType.toLowerCase() == "EDIT".toLowerCase()) {
            this.setPrimaryProposal();
          }
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.commonService.setUpdatedOpportunity = true;
            this.proposalmappingModal.hide();

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
  setPrimaryProposal() {
    debugger;
    this.OpportunityId = this.form.get(this.customCompnentValues.filter(x => x.ColumnName == 'OpportunityId')[0].form_controlName).value;
    var value = this.form.get(this.customCompnentValues.filter(x => x.ColumnName == 'IsPrimary')[0].form_controlName).value;
    this.proposalService.SetPrimaryProposal(this.Id, this.OpportunityId, value).subscribe((result: any) => {
      if (result) {
        this.toaster.success('Primary proposal updated')
      }
      else {
        this.toaster.success('Primary proposal not updated')
      }
    });
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

  fillLeadForm(id) {

    this.proposalService.GetDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      // // // console.log("result1212", this.leadService.leadEditPage.data[0]);
      let edit: any
      edit = this.proposalService.editPage.data[0];
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

  show(id: any = null) {
    ;
    if (id) {
      this.Id = id
      this.ngOnInit()
      this.pageTitle = 'Edit Proposal';
      this.displayType = 'EDIT';
      
      this.proposalmappingModal.show();
    }
    else {

      this.Id = null;
      this.ngOnInit();
      this.pageTitle = 'Add Proposal';
      this.displayType = 'Add';
      this.proposalmappingModal.show();
    }
  }
  close() {
    this.proposalmappingModal.hide();
    // this.addMappingLocationForm.reset();
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
  GetopportunityDetailsByid(e) {
    debugger;
    let productavai ='NO';
    this.formControlList.forEach( (t1) =>{
      let groupCheck = this.formControlList.filter(y => y.group_id == t1.group_id);
      groupCheck[0].InnerData.forEach((t)=> {                     
          if (t.ColumnName == 'Loan_ProductId') {          
            t.edit_form_field_visibility = 'NO';
            t.form_field_visibility = 'NO';
            this.form.get(t.form_controlName).setValue('');
            t.value = '';
          }                  
          if (t.ColumnName == 'Loan_APR__c') {         
            t.edit_form_field_visibility = 'NO';
            t.form_field_visibility = 'NO';
            this.form.get(t.form_controlName).setValue(null);
            t.value = null;
          }  
          if (t.ColumnName == 'Term__c') {            
            t.edit_form_field_visibility = 'NO';
            t.form_field_visibility = 'NO';
            this.form.get(t.form_controlName).setValue(null);
            t.value = null;
          }   
          if (t.ColumnName == 'AccountId') {
            t.value = '';
            this.form.get(t.form_controlName).setValue(null);  
            t.value = null;   
          }      
          if (t.ColumnName == 'Primary_Contact__c') {
            t.value = '';
            this.form.get(t.form_controlName).setValue(null);   
            t.value = null;  
          }   
      });
    });
    var opp;
    
    this.commonService.GetopportunityDetailsByid(e).subscribe((oppor: any) => {     
      if(oppor.length>0)
      {
        
        oppor.forEach((item) => {
          this.formControlList.forEach((t1)=> {
            let groupCheck = this.formControlList.filter(y => y.group_id == t1.group_id);
            groupCheck[0].InnerData.forEach((t) =>{           
                if (t.ColumnName == 'AccountId') {
                 if(item.value)
                 {
                  if(!t.select_options.find(x=> x.value==oppor[0].value))     
                  {
                    (t.select_options as any[]) = (t.select_options as any[]).concat([{name:oppor[0].name,value:oppor[0].value}]);
                  }                         
                  t.value = item.value;
                  this.form.get(t.form_controlName).setValue(item.value);
                 }  
                 else{
                  t.value = null;
                  this.form.get(t.form_controlName).setValue(null);
                 }                   
                }   
                if (t.ColumnName == 'Loan_ProductId') {
                  if(item.Productvalue)
                  {
                   if(!t.select_options.find(x=> x.value==oppor[0].Productvalue))     
                   {
                     (t.select_options as any[]) = (t.select_options as any[]).concat([{name:oppor[0].Productname,value:oppor[0].Productvalue}]);
                   }                         
                   t.value = item.Productvalue;
                   this.form.get(t.form_controlName).setValue(item.Productvalue);
                   t.edit_form_field_visibility = 'YES';
                   t.form_field_visibility = 'YES';
                   productavai ='YES';
                  }  
                  else{
                    this.form.get(t.form_controlName).setValue('');
                    t.value = '';                            
                    t.edit_form_field_visibility = 'NO';
                    t.form_field_visibility = 'NO';       
                    productavai ='NO';                                
                  }                   
                 }  
                
                  if ( t.name == 'Downpayment_Amount__c') {  
                    if(productavai=='YES')
                    {
                      t.is_readOnly = false; 
                    }  
                    else{
                      t.is_readOnly = true; 
                    }                  
                    }
                
                
                if (t.ColumnName == 'Primary_Contact__c') {
                  if(item.ContactId)
                  {                                       
                   t.value = item.ContactId;
                   this.form.get(t.form_controlName).setValue(item.ContactId);
                  } 
                  else{
                    t.value = null;
                    this.form.get(t.form_controlName).setValue(null);
                  }                    
                 }     
                 if (t.ColumnName == 'Loan_APR__c') {
                  if(item.Apr)
                  {                                       
                   t.value = item.Apr;
                   this.form.get(t.form_controlName).setValue(item.Apr);
                   t.edit_form_field_visibility = 'YES';
                   t.form_field_visibility = 'YES';
                  } 
                  else{
                    t.value = null;
                    this.form.get(t.form_controlName).setValue(null);
                    t.edit_form_field_visibility = 'NO';
                    t.form_field_visibility = 'NO';
                  }                    
                 }    
                 if (t.ColumnName == 'Term__c') {
                  if(item.LoanTerm)
                  {                                       
                   t.value = item.LoanTerm;
                   this.form.get(t.form_controlName).setValue(item.LoanTerm);
                   t.edit_form_field_visibility = 'YES';
                   t.form_field_visibility = 'YES';
                  } 
                  else{
                    t.value = null;
                    this.form.get(t.form_controlName).setValue(null);
                    t.edit_form_field_visibility = 'NO';
                    t.form_field_visibility = 'NO';
                  }                    
                 }              
            });
          }); 
          // this.customCompnentValues.forEach(element => {        
          //     if (element.name == "AccountId" && item.value) {
          //       this.form.get(element.form_controlName).setValue(item.value);
          //     }                 
          // });            
        });                
      }
      else{
       
        this.formControlList.forEach( (t1) =>{
          let groupCheck = this.formControlList.filter(y => y.group_id == t1.group_id);
          groupCheck[0].InnerData.forEach((t)=> {           
              if (t.ColumnName == 'AccountId') {
                t.value = '';
                this.form.get(t.form_controlName).setValue(null);
              }     
              if (t.ColumnName == 'Loan_ProductId') {
                t.value = '';
                this.form.get(t.form_controlName).setValue(null);
                t.edit_form_field_visibility = 'NO';
                t.form_field_visibility = 'NO';
              }     
              if (t.ColumnName == 'Primary_Contact__c') {              
                t.value = '';
                this.form.get(t.form_controlName).setValue(null);
              }     
              if (t.ColumnName == 'Loan_APR__c') {
                t.value = '';
                this.form.get(t.form_controlName).setValue(null);
                t.edit_form_field_visibility = 'NO';
                t.form_field_visibility = 'NO';
              }  
              if (t.ColumnName == 'Term__c') {
            t.value = '';
                this.form.get(t.form_controlName).setValue(null);
                t.edit_form_field_visibility = 'NO';
                t.form_field_visibility = 'NO';
              }         
          });
        });
      }
     
     
    });
  }
  getFileUrl(e?, formControlList?, ColumnName?) {
    ;
    if (e != undefined) {
      this.commonService.GetFileUrl(e.value).then(resp => {
        if (resp) {   
          this.customCompnentValues.forEach(element => {
            if (ColumnName == "Image1") {
              if (element.name == "Image1Url") {
                this.form.get(element.form_controlName).setValue(resp);
              }
            }
            if (ColumnName == "Image2") {
              if (element.name == 'Image2Url') {
                this.form.get(element.form_controlName).setValue(resp);
              }
            }
          });       
          formControlList.forEach((t1) =>{
            let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
            groupCheck[0].InnerData.forEach((t) =>{
              if (ColumnName == "Image1") {
                if (t.ColumnName == 'Image1Url') {
                  t.value = resp;
                }
              }
              if (ColumnName == "Image2") {
                if (t.ColumnName == 'Image2Url') {
                  t.value = resp;
                }
              }
            });
          });

        }


      }).catch(err => { console.log(err) });
    }
    else {
      this.customCompnentValues.forEach(element => {
        if (ColumnName == "Image1") {
          if (element.name == "Image1Url") {
            this.form.get(element.form_controlName).setValue("");
          }
        }
        if (ColumnName == "Image2") {
          if (element.name == 'Image2Url') {
            this.form.get(element.form_controlName).setValue("");
          }
        }
      });    
      formControlList.forEach(function (t1) {
        let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
        groupCheck[0].InnerData.forEach(function (t) {
          if (ColumnName == "Image1") {
            if (t.ColumnName == 'Image1Url') {
              t.value = '';
            }
          }
          if (ColumnName == "Image2") {
            if (t.ColumnName == 'Image2Url') {
              t.value = '';
            }
          }
        });
      });
    }

    




  }
}
