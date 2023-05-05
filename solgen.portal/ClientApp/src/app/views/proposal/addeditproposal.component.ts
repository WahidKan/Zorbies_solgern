import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { ProposallistService, JsonData, CheckboxData, CheckProposal } from './proposallist.service';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { ThrowStmt } from '@angular/compiler';
import { Location } from '@angular/common';


@Component({
  selector: 'app-addeditproposal',
  templateUrl: './addeditproposal.component.html',
  styleUrls: ['./addeditproposal.component.scss']
})

export class AddeditproposalComponent implements OnInit {
  appmodel: CheckProposal = new CheckProposal();
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
  loanAvail= 'NO';
  timeFormat: string;
  oppControlName: string;
  StageControlName: string;
  contentHeader: object;  
  executionFlow: any[] = [];
  constructor(private fb: FormBuilder, private proposalService: ProposallistService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private location: Location) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = true;
    } else {

      this.addOrUpdatePermission = true;
    }
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
          this.Id = id;
          this.isLead = true;
          this.pageTitle = 'Edit Proposal';
          this.displayType = 'EDIT';
        } else {
          this.pageTitle = 'Add Proposal';
          this.displayType = 'ADD'
        }

      }
    );
    this.proposalService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.OpportunityId, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.proposalService.customFieldsList.data;
        this.executionFlow = this.proposalService.customFieldsList.executionFlow;
        // // console.log("this.customCompnentValues", this.customCompnentValues);

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
        
        var opportunity = null;
        this.customCompnentValues.forEach(cnt => {
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
          else if (cnt.dt_code == 'datetime' && cnt.name != 'LastModifiedDate') {
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
          
          if (cnt.name == 'OpportunityId') {
            this.oppControlName = cnt.form_controlName;
            this.OpportunityId = cnt.value;
          }

          if (this.OpportunityId > 0 && cnt.name == 'OpportunityId') {
            cnt.is_required = true;
            val = this.OpportunityId;
            opportunity =  cnt.select_options[0].name;
          }

          if (cnt.ColumnName == 'CreatedDate') 
          {
            cnt.display_name = "Created On"
          }

          else if (cnt.ColumnName == 'LastModifiedById') 
          {
            cnt.display_name = "Modified By"
          }

          else if (cnt.ColumnName == 'LastModifiedDate') 
          {
            cnt.display_name = "Modified On"
          }

          if (cnt.name.toLowerCase() == 'stageid') {
            this.StageControlName = cnt.form_controlName;
          }

          if (this.OpportunityId > 0 && cnt.name == 'AccountId') {
            val = cnt.select_options[0].value;
            cnt.is_required = true;
          }
         
          if(cnt.ColumnName ==  "Primary_Contact__c")
          {
            val = opportunity;
            cnt.is_readOnly = true; 
          }
          if ( cnt.name == 'Loan_ProductId') { 
            let val =  cnt.value;                   
            if(val && val>0)
            {
              this.loanAvail ='YES';
              cnt.edit_form_field_visibility = 'YES';
              cnt.form_field_visibility = 'YES';
              
            }
            else{
              this.loanAvail ='NO';
               cnt.edit_form_field_visibility = 'NO';
               cnt.form_field_visibility = 'NO';
              
            }
          }        
          if ( cnt.name == 'Loan_APR__c' && this.loanAvail=='NO') {  
            cnt.edit_form_field_visibility = 'NO';
            cnt.form_field_visibility = 'NO';    
            
           }
          if ( cnt.name == 'Term__c' && this.loanAvail=='NO') {           
            cnt.edit_form_field_visibility = 'NO';
            cnt.form_field_visibility = 'NO';  
           
          }
          if ( cnt.name == 'Downpayment_Amount__c') {  
           if(this.loanAvail=='YES')
           {
            cnt.is_readOnly = false; 
           }  
           else{
            cnt.is_readOnly = true; 
           }                  
           }
          

          if ( cnt.name == 'OwnerID' || cnt.name ==  'CreatedById' || cnt.ColumnName == 'LastModifiedById') {
           val = this.userName;
           cnt.select_options = cnt.select_options.filter(x => x.name == this.userName);
           
          if ( cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {

              if (itemList.name == this.userName) {
                val = itemList.value;
                cnt.is_readOnly = true;
              }

            });
          }
          }
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
        setTimeout(() => {
          this.loadSave = false;
        }, 1000);

      }
    });





    this.initBreadCrumb();
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

  setPrimaryProposal()
  {
    ;
   
    this.OpportunityId=this.form.get(this.customCompnentValues.filter(x=>x.ColumnName == 'OpportunityId')[0].form_controlName).value;
    var value=this.form.get(this.customCompnentValues.filter(x=>x.ColumnName=='IsPrimary')[0].form_controlName).value;
    this.proposalService.SetPrimaryProposal(this.Id,this.OpportunityId,value).subscribe((result: any) => {
      if(result)
      {
        this.toaster.success('Primary proposal updated')
      }
      else 
      {
        this.toaster.success('Primary proposal not updated')
      }
    });
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Proposal',
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
            name: 'Manage Proposal',
            isLink: true,
            link: '/proposal-list'
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
  // onSubmit() {
  //   
  //   this.loadSave = true;
  //   this.checkboxdata1.forEach((item) => {
  //     // // console.log(item.controlname);
  //     if (item.controlvalues != "" && item.controlvalues != undefined) {
  //       var selvalues = "";// this.form.get(item.controlname).value;
  //       if (selvalues == "" || selvalues == null) {
  //         this.form.get(item.controlname).setValue(item.controlvalues);
  //       } else {
  //         this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
  //       }
  //     }
  //   });
  //   // // console.log("EditVal", this.form.value);
  //   if (this.form.valid) {
  //     this.loadSave = true;
  //     this.JsonData.Id = this.Id;
  //     this.JsonData.moduleCode = this.moduleName;
  //     this.JsonData.subModuleCode = this.submoduleName;
  //     this.JsonData.companyId = this.companyId;
  //     this.JsonData.userId = this.userId;
  //     const _formData = this.form.value;
  //     for (let index in _formData) {
  //       let data = _formData[index];
  //       if (data) {
  //         if (Date.prototype.isPrototypeOf(data)) {
  //           _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
  //         }
  //       }
  //     }
  //     this.JsonData.FormJsonData = JSON.stringify(this.form.value);

  //     this.proposalService.addEditForm(this.JsonData).subscribe((result: any) => {
  //       if (result.statusCode == 200) {
  //         //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
  //         //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
  //         //this.toaster.success(result.responseMessage);
  //         setTimeout(() => {
  //           this.toaster.success(result.responseMessage);
  //           this.loadSave = false;
  //           if (this.OpportunityId > 0) {
  //             this.router.navigateByUrl("/opportunity/view/" + this.OpportunityId);
  //           } else {
  //             this.router.navigateByUrl("/proposal-list");
  //           }
  //         }, 1000);
  //       }
  //       else {
  //         this.toaster.error(result.responseMessage);
  //         this.loadSave = false;
  //       }
  //     }, error => {
  //       this.loadSave = false;
  //     });
  //   }
  //   else {
  //     this.commonService.validateAllFormFields(this.form);
  //     this.loadSave = false;

  //   }

  // }

  onSubmit() {
    let Stageid = 0;
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
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      const _formData = this.form.value;
      for (let index in _formData) {
        if (index == this.oppControlName) {
          this.appmodel.Ids = _formData[index];
        }

        if (index == this.StageControlName) {
          Stageid = _formData[index];
        }
        let data = _formData[index];
        if (data) {
          if (Date.prototype.isPrototypeOf(data)) {
            _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
          }
        }
      }
      ;
      if (Stageid > 0) {
        this.JsonData.FormJsonData = JSON.stringify(this.form.value);
        this.proposalService.ValidateUtilityAccount(this.appmodel).subscribe((result: any) => {
          if (result.statusCode == 201) {
            this.toaster.error(result.responseMessage);
            this.loadSave = false;
          }
          else {
            this.proposalService.addEditForm(this.JsonData).subscribe((result: any) => {
              if (result.statusCode == 200) {
                ;
                let primaryId = Number(result.optionalExtraParamers);
                let flowsList = this.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
                if (flowsList.length > 0) {
                  flowsList.forEach((item) => {
                    window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
                  });
                }
                if (this.displayType.toLowerCase()=="EDIT".toLowerCase())
                {
                  this.setPrimaryProposal();
                }
                //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                //this.toaster.success(result.responseMessage);
                setTimeout(() => {
                  this.toaster.success(result.responseMessage);
                  this.loadSave = false;
                  //if (this.OpportunityId > 0) {
                    this.location.back();
                    //this.router.navigateByUrl("/proposal-list");
                  // } else {
                  //   this.router.navigateByUrl("/proposal-list");
                  // }
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

        });
      }
      else {
        this.toaster.error('Please select Adders from stage');
        this.loadSave = false;
      }
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
    this.location.back();
  }
  fillLeadForm(id) {

    this.proposalService.GetDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      let edit: any
      edit = this.proposalService.editPage.data[0];
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
  
  GetopportunityDetailsByid(e?, formControlList?) {
    let productavai ='NO';
    formControlList.forEach( (t1) =>{
      let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
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
    
    this.commonService.GetopportunityDetailsByid(e.value).subscribe((oppor: any) => {     
      if(oppor.length>0)
      {
        
        oppor.forEach((item) => {
          formControlList.forEach((t1)=> {
            let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
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
        formControlList.forEach( (t1) =>{
          let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
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
}

