import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { JsonData, DesignationService } from './designationservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';
import { CheckboxData } from '../internalaccounts/accountservice.service';

@Component({
  selector: 'app-designationadd',
  templateUrl: './designationadd.component.html',
  styleUrls: ['./designationadd.component.scss']
})
export class DesignationaddComponent implements OnInit {

  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;  
  moduleName = 'users';
  submoduleName = 'designation';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  Id: any='';
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  addOrUpdatePermission: boolean=false;
  modulePermission: any[] = [];
  displayType: any;
  contentHeader: object;
  constructor(private fb: FormBuilder, private designationService: DesignationService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {

      this.addOrUpdatePermission = true;
    }
  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.Id = id;
          this.isLead = true;
          this.displayType = 'EDIT';
          this.pageTitle = 'Edit Designation';
          //this.fillLeadForm(this.Id);
        } else {
          this.displayType = 'ADD';
          this.pageTitle = 'Add Designation';
        }
      }
    );

    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id,this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = result.data;


        let fieldArray = [];
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
            //for (let config of this.formControlList) {

            //}
          }
        })
        // console.log("formControlList", this.formControlList)
        const group: any = {};
        data_type_name: Text
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
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
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
    }, err => {
      this.loadSave = false;
    });
    this.initBreadCrumb();
  }
    
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Designation',
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
             name : 'Manage Designation',
             isLink : true,
             link : '/designationlist'
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
      //// console.log("formvaluesformvaluesformvalues", formvalues);
      formvalues.find((item) => {
        if (item == selval) {
          //// console.log('abc');
          returnValue = true;

        }
      });
    }
    return returnValue;

  }
  test(e) {
    //// console.log('sssss', e);
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
    // console.log(this.form);
  }
  onSubmit() {
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
     // // console.log(item.controlname);
      this.form.get(item.controlname).setValue(item.controlvalues);
    });
    //// console.log("EditVal", this.form.value);
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.Id;

      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.designationService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
          //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
          //this.toaster.success(result.responseMessage);
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.router.navigateByUrl("/designationlist");
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
    this.router.navigateByUrl("/designationlist");
  }



  fillLeadForm(id) {

    this.designationService.GetDesignationDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      let edit: any
      edit = this.designationService.editPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];

          //// console.log("cntname", cntname)
          if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {

            cntValue = JSON.parse(cntValue);
          }
          if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {

            cntValue = (cntValue == 'true');
            //// console.log("cntValuecntValue", cntValue);
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
          //this.checkboxdata1.forEach((item) => { // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

        }
        catch (err) { }
        /////
        //// console.log("formGroup", this.form.value);
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
    //// console.log('new', e);
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
    //// console.log('sss', e);
    var dd = this.formControlList;

  }
}
