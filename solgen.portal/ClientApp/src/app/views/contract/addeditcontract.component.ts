import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { ContractService, JsonData, CheckboxData } from './contract.service';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addeditcontract',
  templateUrl: './addeditcontract.component.html',
  styleUrls: ['./addeditcontract.component.scss'],
  providers: [ContractService]
})

export class AddeditcontractComponent implements OnInit {
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'contract';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  id: any = '';
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  displayType: any;
  isFirst: boolean = false;
  // checkboxdata1: CheckboxData[];
  userName: any = '';
  addOrUpdatePermission: boolean;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  timeFormat: string = '12';

  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;
  contentHeader: object;
  executionFlow: any[] = [];
  constructor(private fb: FormBuilder, private contractService: ContractService, private router: Router,
    private toaster: ToastrService, private commonService: CommonService, private route: ActivatedRoute, private location: Location) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      // console.log("companyId", userdetail.companyId);
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CONTRACTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CONTRACTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.timeFormat = this.commonService.getTimeFormat();
    this.addOrUpdatePermission = false;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.loadSave = true;
        if (id) {
          this.id = id;
          this.pageTitle = 'Edit Contract';
          this.displayType = 'EDIT';
          this.addOrUpdatePermission = this.isUpdate;
          //  this.fillLeadForm(this.leadId);
        } else {
          this.loadSave = true;
          this.displayType = 'ADD'
          this.pageTitle = 'Add Contract';
          this.addOrUpdatePermission = this.isAdd;
        }
      }
    );

    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValues = resp.data;
        this.executionFlow = resp.executionFlow;
        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);

          if (t.dt_code == 'radio') {
            t.listoptions = JSON.parse(t.listoptions);
          }
          if (t.dt_code == 'checkbox') {
            ;
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
          if (this.displayType == 'ADD') {
            let recordOwner = this.customCompnentValues.find(x => x.name == 'OwnerId' && x.dt_code == 'select' && x.select_options != null)

            if(recordOwner != undefined){
                          recordOwner.select_options.forEach(item => {

              if (item.name == this.userName) {
                recordOwner.value = item.value;
                recordOwner.is_readOnly = true;
              }

            });
            }

          }
        })
        // console.log("formControlList", this.formControlList)
        const group: any = {};
        data_type_name: Text
        const _datetime = new DateTimeToLocalForAddEditPipe;
        const convertdatetime = new DateTimeToLocalForAddEditPipe();

        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          // else if (cnt.dt_code == 'date' || cnt.dt_code == 'datetime') {
          //   debugger
          //   val = _datetime.transform(cnt.value, null);
          // }
          // else {
          //   debugger
          //   val = (cnt.value == '' ? null : cnt.value);
          // }

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
          ;
          if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'CreatedBy' || cnt.name == 'ModifiedBy')) {
           
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

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Contract',
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
            name: 'Manage Contract',
            isLink: true,
            link: '/contract'
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
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
  }
  onSubmit() {
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      //// console.log(item.controlname);
      this.form.get(item.controlname).setValue(item.controlvalues);
    });
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;

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

      this.contractService.addEditForm(this.JsonData).subscribe((result: any) => {
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
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

    }

  }
  onCustomChange(e: any, inner: any) {

    if (e) {
      if (e.value && inner.ColumnName == "OpportunityId") {
        e = e.value
        this.contractService.GetContractOpportunityDetail(e).subscribe(
          (result: any) => {
            result = JSON.parse(result);
            this.customCompnentValues.forEach(cnt => {
              console.log(cnt);
              if (cnt.ColumnName == "Primary_Proposal__c") {
                if (result.ProposalId) {
                  if (cnt.select_options && !cnt.select_options.find(x => x.value == result.ProposalId)) {
                    (cnt.select_options as any[]) = (cnt.select_options as any[])
                      .concat([{ name: result.ProposalName, value: result.ProposalId.toString() }]);
                  }
                  cnt.value = result.ProposalId;
                  this.form.get(cnt.form_controlName).setValue(result.ProposalId.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "AccountId") {
                if (result.AccountId) {
                  if (cnt.select_options && !cnt.select_options.find(x => x.value == result.AccountId)) {
                    (cnt.select_options as any[]) = (cnt.select_options as any[])
                      .concat([{ name: result.AccountName, value: result.AccountId }])
                  }
                  cnt.value = result.AccountId;
                  this.form.get(cnt.form_controlName).setValue(result.AccountId.toString());

                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "ContactId") {
                if (result.ContactId) {
                  if (cnt.select_options && !cnt.select_options.find(x => x.value == result.ContactId)) {
                    (cnt.select_options as any[]) = (cnt.select_options as any[])
                      .concat([{ name: result.ContactName, value: result.ContactId }])
                  }
                  cnt.value = result.ContactId;
                  this.form.get(cnt.form_controlName).setValue(result.ContactId.toString());

                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "ServiceTerritoryId") {
                if (result.TerritoryId) {
                  if (cnt.select_options && !cnt.select_options.find(x => x.value == result.TerritoryId)) {
                    (cnt.select_options as any[]) = (cnt.select_options as any[])
                      .concat([{ name: result.TerritoryName, value: result.TerritoryId }])
                  }
                  cnt.value = result.TerritoryId;
                  this.form.get(cnt.form_controlName).setValue(result.TerritoryId.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "BillingStreet") {
                if (result.BillingStreet) {

                  cnt.value = result.BillingStreet;
                  this.form.get(cnt.form_controlName).setValue(result.BillingStreet.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "BillingCountry") {
                if (result.BillingCountry) {

                  cnt.value = result.BillingCountry;
                  this.form.get(cnt.form_controlName).setValue(result.BillingCountry.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "BillingState") {
                if (result.BillingState) {

                  cnt.value = result.BillingState;
                  this.form.get(cnt.form_controlName).setValue(result.BillingState.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "BillingCity") {
                if (result.BillingCity) {

                  cnt.value = result.BillingCity;
                  this.form.get(cnt.form_controlName).setValue(result.BillingCity.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }
              else if (cnt.ColumnName == "BillingPostalCode") {
                if (result.BillingPostalCode) {

                  cnt.value = result.BillingPostalCode;
                  this.form.get(cnt.form_controlName).setValue(result.BillingPostalCode.toString());
                }
                else {
                  cnt.value = null;
                  this.form.get(cnt.form_controlName).setValue(null);
                }
              }


            }
            )
          }
        )
        //        else if(cnt.ColumnName=="ContactId")
        //        {
        //         if(result.ContactId)
        //         {
        //               if(cnt.select_options && !cnt.select_options.find(x=>x.value==result.ContactId))
        //               {
        //                 (cnt.select_options as any[])=(cnt.select_options as any[])
        //                 .concat([{name:result.ContactName,value:result.ContactId}])
        //               }
        //               cnt.value=result.ContactId;
        //               this.form.get(cnt.form_controlName).setValue(result.ContactId.toString());

        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="Proposal__c")
        //        {
        //         if(result.ProposalId)
        //         {
        //           if(cnt.select_options && !cnt.select_options.find(x=>x.value==result.ProposalId))
        //           {
        //             (cnt.select_options as any[])=(cnt.select_options as any[])
        //             .concat([{name:result.ProposalName,value:result.ProposalId}])
        //           }
        //           cnt.value=result.ProposalId;
        //           this.form.get(cnt.form_controlName).setValue(result.ProposalId.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="Contract__c")
        //        {;
        //         if(result.ContractId)
        //         {
        //           if(cnt.select_options && !cnt.select_options.find(x=>x.value==result.ContractId))
        //           {
        //             (cnt.select_options as any[])=(cnt.select_options as any[])
        //             .concat([{name:result.ContractNumber,value:result.ContractId.toString()}])
        //           }
        //           cnt.value=result.ContractId;
        //           this.form.get(cnt.form_controlName).setValue(result.ContractId.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="ServiceTerritoryId")
        //        {
        //         if(result.TerritoryId)
        //         {
        //           if(cnt.select_options && !cnt.select_options.find(x=>x.value==result.TerritoryId))
        //           {
        //             (cnt.select_options as any[])=(cnt.select_options as any[])
        //             .concat([{name:result.TerritoryName,value:result.TerritoryId}])
        //           }
        //           cnt.value=result.TerritoryId;
        //           this.form.get(cnt.form_controlName).setValue(result.TerritoryId.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="Street")
        //        {
        //         if(result.BillingStreet)
        //         {

        //           cnt.value=result.BillingStreet;
        //           this.form.get(cnt.form_controlName).setValue(result.BillingStreet.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="Country")
        //        {
        //         if(result.BillingCountry)
        //         {

        //           cnt.value=result.BillingCountry;
        //           this.form.get(cnt.form_controlName).setValue(result.BillingCountry.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="State")
        //        {
        //         if(result.BillingState)
        //         {

        //           cnt.value=result.BillingState;
        //           this.form.get(cnt.form_controlName).setValue(result.BillingState.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="City")
        //        {
        //         if(result.BillingCity)
        //         {

        //           cnt.value=result.BillingCity;
        //           this.form.get(cnt.form_controlName).setValue(result.BillingCity.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //        else if(cnt.ColumnName=="PostalCode")
        //        {
        //         if(result.BillingPostalCode)
        //         {

        //           cnt.value=result.BillingPostalCode;
        //           this.form.get(cnt.form_controlName).setValue(result.BillingPostalCode.toString());
        //         }
        //         else{
        //           cnt.value = null;
        //           this.form.get(cnt.form_controlName).setValue(null);
        //         }
        //        }
        //         // this.form.get(cnt.form_controlName)?.setValue(result.)
        //     });  
        //   }
        // });
        // this.clearCustomChange(inner);
      }


      // else if(e.value && inner.ColumnName=="WorkTypeId"){
      //   e=e.value;
      //   this.workOrderService.GetDurationByType(e).subscribe(res=>{
      //     if (res) {
      //       ;
      //       this.customCompnentValues.forEach(cnt => {
      //         console.log(cnt);
      //         if(cnt.ColumnName=="Duration")
      //         {
      //           cnt.value = res;
      //           this.form.get(cnt.form_controlName).setValue(res);
      //         }
      //       });
      //     }



      //   })

      //   }
    }
    else {
      if (inner.ColumnName == "AccountId") {
        this.customCompnentValues.forEach(cnt => {
          if (cnt.ColumnName == "Opportunity__c" || cnt.ColumnName == "ContactId" ||
            cnt.ColumnName == "Proposal__c" || cnt.ColumnName == "Contract__c" || cnt.ColumnName == "ServiceTerritoryId"
            || cnt.ColumnName == "Street" || cnt.ColumnName == "Country" || cnt.ColumnName == "State" ||
            cnt.ColumnName == "City" || cnt.ColumnName == "PostalCode") {
            cnt.value = null;
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



  fillForm(id) {
    this.addOrUpdatePermission = this.isUpdate;
    //this.form.reset();
    this.contractService.GetContractDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      let edit: any
      edit = this.contractService.editPage.data[0];
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
            //// console.log(item.controlname, item.controlvalues);
            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
          });
          //this.checkboxdata1.forEach((item) => {  // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

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

      let strs = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName).controlvalues.split(",");

      let updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
      //checkboxdatanew.controlvalues = updatedval.toString();
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName);
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
    });
    if (dataList[j].ColumnName == "OpportunityId") {
      this.customCompnentValues.forEach(cnt => {
        console.log(cnt);
        if (cnt.ColumnName == "Primary_Proposal__c") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "AccountId") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "ContactId") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "ServiceTerritoryId") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "BillingStreet") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "BillingCountry") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "BillingState") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "BillingCity") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }
        else if (cnt.ColumnName == "BillingPostalCode") {
          cnt.value = null;
          this.form.get(cnt.form_controlName).setValue(null);
        }

      })
    }
  }
}
//export class AddeditcontractComponent1 implements OnInit {

//  config: any[] = [];
//  control: any;
//  pageTitle: any;
//  group_id: any;
//  moduleName = 'finance';
//  submoduleName = 'contract';
//  group_name: any;
//  group_display_name: any;
//  customCompnentValues: any;
//  form: FormGroup;
//  formGroup: FormGroup;
//  companyId: any;
//  grpId: any;
//  sDtaa: any;
//  loadSave = false;
//  id: any;
//  leadId: any;
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLead = false;
//  formControlList: any[] = [];
//  errors: string[] = [];

//  constructor(private fb: FormBuilder, private contractService: ContractService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

//    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
//      this.companyId = userdetail.companyId;
//      this.sp_name = 'sp_solgen_AddEditOpportunity_custom';
//    });
//  }



//  ngOnInit() {
//    this.contractService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {
//        this.customCompnentValues = this.contractService.customFieldsList.data;

//        let fieldArray = [];
//        this.customCompnentValues.forEach(t => {
//          
//          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
//          if (groupCheck == null || groupCheck.length == 0) {
//            let obj = {
//              group_id: t.group_id,
//              group_name: t.group_name,
//              group_display_name: t.group_display_name,
//              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
//            }

//            this.formControlList.push(obj);
//            for (let config of this.formControlList) {

//            }
//          }
//        })
//        const group: any = {};
//        let val = null;
//        this.customCompnentValues.forEach(cnt => {
//          group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)

//        });

//        this.form = new FormGroup(group);
//        if (this.id != null) {
//          this.fillForm(this.id);
//        }
//      }
//    });


//    //EDIT case handle
//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('id');
//        if (id) {
//          this.loadSave = true;
//          
//          this.id = id;
//          this.fillForm(this.id);
//          this.pageTitle = 'Edit Contract';
//        }
//        else {
//          this.pageTitle = 'Add Contract';
//        }
//      }
//    );

//  }
//  onSubmit() { }
//  displayInsuranceDetail(reposnse): void {
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }
//    this.form = new FormGroup(formGroup);
//  }

//  close() {
//    this.router.navigateByUrl("/contract");
//  }


//  fillForm(id) {
//    
//    //this.form.reset();
//    this.contractService.GetContractDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
//      let edit: any
//      edit = this.contractService.editPage.data[0];
//      
//      //let empty = null;
//      const formGroup = {};
//      if (result) {
//        Object.keys(edit).forEach(t => {
//          let cntname = t;
//          let cntValue = edit[t] == '' ? null : edit[t];
//          formGroup[cntname] = new FormControl(cntValue);
//        })
//        // this.form.value.reset();
//        this.form = new FormGroup(formGroup);
//        this.loadSave = false;

//      }
//    },
//      (error: any) => {
//        this.loadSave = false;
//      })

//  }
//  MakeArray(value, type) {
//    
//    var array = [];
//    var arr = String(value).split(',');
//    if (type == "radio" || type == "checkbox") {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          
//          if (arr[i].split("|").length > 1) {
//            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
//            array.push(person);
//          }
//          else {
//            var person = { name: arr[i], value: arr[i] };
//            array.push(person);
//          }
//        }
//      }
//    }
//    else {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          var person = { name: arr[i], value: arr[i] };
//          array.push(person);
//        }
//      }
//    }

//    return array;
//  }
//  MakeNormalArray(value) {
//    if (value) {
//      try {
//        return JSON.parse(value);
//      }
//      catch (ex) {
//        return value;
//      }
//    }
//    else {
//      value = [];
//    }
//  }
//  MakeSelectArray(objItem) {
//    var array = [];
//    var arr = String(objItem.select_options).split(',');
//    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

//      var person = { name: arr[0], value: arr[1] };
//      array.push(person);
//      //objItem.select_options = array;
//    }
//    return array
//  }
//}
