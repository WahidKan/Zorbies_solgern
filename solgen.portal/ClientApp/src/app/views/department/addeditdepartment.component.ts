import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { DepartmentService, JsonData, CheckboxData } from './department.service';



@Component({
  selector: 'app-addeditdepartment',
  templateUrl: './addeditdepartment.component.html',
  providers: [DepartmentService]
})

export class AddeditdepartmentComponent implements OnInit {
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'users';
  submoduleName = 'department';
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
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  addOrUpdatePermission: boolean=false;
  displayType: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  contentHeader: object;
  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const priviledgeCode = this.route.snapshot.data.privilegeCode;

    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'DEPARTMENTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.addOrUpdatePermission = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'DEPARTMENTUPDATE');
    if (update == undefined) {
      update = "null";
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
          this.pageTitle = 'Edit Department';
          //this.fillLeadForm(this.Id);
        } else {
          this.loadSave = true;
          this.displayType = 'ADD';
          this.pageTitle = 'Add Department';
        }
      }
    );
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
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
        const group: any = {};
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                //// console.log(item.controlname, item.controlvalues);
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
        //// console.log("validationFROM", this.form);
        this.loadSave = false;
      }
    });
    this.initBreadCrumb();
  }
    
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Department',
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
             name : 'Manage Department',
             isLink : true,
             link : '/department'
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
      //"formvaluesformvaluesformvalues", formvalues);
      formvalues.split(',').find((item) => {
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
    //// console.log(this.form);
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
    //// console.log("EditVal", this.form.value);
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.Id;
      
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.departmentService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
          //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
          //this.toaster.success(result.responseMessage);
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.router.navigateByUrl("/department");
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
    this.router.navigateByUrl("/department");
  }



  fillLeadForm(id) {
    this.departmentService.GetDepartmentDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      let edit: any
      edit = this.departmentService.editPage.data[0];
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
          //this.checkboxdata1.forEach((item) => {  // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

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
//export class AddeditdepartmentComponent implements OnInit {
//  //@Input('moduleName') moduleName: any;
//  //@Input('submoduleName') submoduleName: any;
//  //@Output('pageTitle') pageTitle;
//  config: any[] = [];
//  control: any;
//  pageTitle: any;
//  group_id: any;
//  moduleName = 'user';
//  submoduleName = 'department';
//  group_name: any;
//  group_display_name: any;
//  customCompnentValues: any;
//  form: FormGroup;
//  formGroup: FormGroup;
//  companyId: any;
//  grpId: any;
//  sDtaa: any;
//  loadSave = false;
//  departmentId: any;
//  Id: any;
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLead = false;
//  formControlList: any[] = [];
//  errors: string[] = [];
//  JsonData: JsonData = new JsonData();
//  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
//    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
//      this.companyId = userdetail.companyId;
//      this.sp_name = 'sp_solgen_AddEditDepartment_custom';
//    });
//  }
//  ngOnInit() {
//    this.departmentService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {
//      
//        //this.form.setValue(null);
//        this.customCompnentValues = this.departmentService.customFieldsList.data;

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
        
//          this.form = new FormGroup(group);
//        if (this.departmentId != null) {
//          this.fillForm(this.departmentId);
//        }

//        // console.log("validationFROM", this.form);
//      }
//    });


//    //EDIT case handle

//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('id');
//        if (id) {
//          this.loadSave = true;
//         
//          this.Id = id;
//          this.fillForm(this.Id);
//          this.pageTitle = 'Edit Department';
//        }
//        else {
//          this.pageTitle = 'Add Department';
//        }
//      }
//    );

//  }

//  //Edit case handle 
//  displayInsuranceDetail(reposnse): void {
//    //this.form.patchValue({

//    //});
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }

//    this.form = new FormGroup(formGroup);
//  }
//  onSubmit() {
//    
//    this.loadSave = true;
//    // console.log("EditVal", this.form);
//    if (this.form.valid) {
//      this.JsonData.Id = this.Id;
//      this.JsonData.FormJsonData = JSON.stringify(this.form.value);
//      this.JsonData.moduleCode = this.moduleName;
//      this.JsonData.subModuleCode = this.submoduleName;
//      this.departmentService.addEditForm(this.JsonData).subscribe((result: any) => {
//        if (result.statusCode == 200) {
//          this.toaster.success(result.responseMessage);
//          setTimeout(() => {
//            this.loadSave = false;
//            this.router.navigateByUrl("/department");
//          }, 1000);
//        }
//        else {
//          this.toaster.error(result.responseMessage);
//          this.loadSave = false;
//        }
//      }, error => {
//        this.loadSave = false;
//      });
//    }
//    else {
//      this.commonService.validateAllFormFields(this.form);
//      this.loadSave = false;

//    }

//  }
//  CheckSetValue(event, formControl) {
//    
//    //this.form.get(formControl).setValue(JSON.stringify(event.target.checked));
//    this.form.get(formControl).setValue(event.target.checked);
//    // console.log("Form", this.form);
//  }

//  close() {
//    if (!this.isLead) {
//      this.router.navigateByUrl("/department");
//    }
//    else {
//      this.router.navigateByUrl("/department");
//    }
//  }

//  fillForm(id) {
//    
//    //this.form.reset();
//    this.departmentService.GetDepartmentDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
//      //// console.log("result1212", this.departmentService.editPage.data[0]);
//      let edit: any
//      if (this.departmentService.editPage.responseCode != 200) {
//        edit = this.departmentService.editPage.data[0];
//        // console.log("editTB", edit);
//        const formGroup = {};
//        if (result) {
//          Object.keys(edit).forEach(t => {
//            let cntname = t;
//            let cntValue = edit[t] == '' ? null : edit[t];
//            //// console.log("cntname", cntname)
//            //// console.log("cntname", cntValue)
//            if (cntname == '7_IsActive') {
//              
//              cntValue == 'false' ? cntValue = 0 : cntValue = 1;
//            }
//            formGroup[cntname] = new FormControl(cntValue);
//          })
//          // console.log("formGroup", formGroup);
//          // this.form.value.reset();


//          this.form = new FormGroup(formGroup);
//          // console.log("EdittttPageee", this.form);

//          
//          this.loadSave = false;

//        }
//      }
//    },
//      (error: any) => {
//        this.loadSave = false;
//      })

//  }

//  validator(controlName,isRequired) {
//    if (isRequired == true) {
//      this.form.controls[controlName].setValidators(Validators.required);
//      this.form.controls[controlName].updateValueAndValidity();
//    }
//    else {
//      this.form.controls[controlName].setValidators(Validators.nullValidator);
//      this.form.controls[controlName].updateValueAndValidity();
//    }
    
//  }
//  //fillLeadForm(id) {
//  //  this.departmentService.GetLeadsDetails(id).subscribe((result: any) => {
//  //    // console.log("result1212", this.departmentService.leadEditPage.data[0]);
//  //    let edit: any
//  //    edit = this.departmentService.leadEditPage.data[0];
//  //    //let empty = null;
//  //    const formGroup = {};
//  //    if (result) {
//  //      Object.keys(edit).forEach(t => {
//  //        let cntname = t;
//  //        let cntValue = edit[t] == '' ? null : edit[t];
//  //        // console.log("cntname", cntname)
//  //        // console.log("cntname", cntValue)
//  //        formGroup[cntname] = new FormControl(cntValue);
//  //      })
//  //      // console.log("formGroup", formGroup);
//  //      // this.form.value.reset();


//  //      this.form = new FormGroup(formGroup);
//  //      // console.log("EdittttPageee", this.form);
//  //      this.loadSave = false;

//  //    }
//  //  },
//  //    (error: any) => {
//  //      this.loadSave = false;
//  //    })
//  //}

//  MakeArray(value, type) {
//    var array = [];
//    var arr = String(value).split(',');
//    if (type == "radio" || type == "checkbox") {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
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
