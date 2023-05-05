import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { CustomFormBase, CustomFieldService } from './customfield.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  providers: [CustomFieldService]
})
export class DynamicFormComponent implements OnInit {

  @Input('moduleName') moduleName: any;
  @Input('submoduleName') submoduleName: any;
  @Output('pageTitle') pageTitle;
  config: any[] = [];
  control: any;
  group_id: any;
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  departmentId: any;
  leadId: any;
  moduleRefrenceName: any;
  sp_name: string;
  showChild = false;
  isLead = false;
  formControlList: any[] = [];
  errors: string[] = [];
  constructor(private fb: FormBuilder, private customService: CustomFieldService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
    if (this.submoduleName == 'department') {
      this.companyId = 1001
      this.moduleRefrenceName = this.submoduleName;
      this.sp_name = 'sp_solgen_AddEditDepartment_custom';
    }
    if (this.submoduleName == 'lead') {
      this.companyId = 1001
      this.moduleRefrenceName = this.submoduleName;
    }
  }
  ngOnInit() {
    
    if (this.submoduleName == 'department') {
      this.companyId = 1001
    }
    if (this.submoduleName == 'designation') {
      this.companyId = 1001
    }
    this.customService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
      if (result) {
        //this.form.setValue(null);
        this.customCompnentValues = this.customService.customFieldsList.data;

        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);
            for (let config of this.formControlList) {

            }
          }
        })
        const group: any = {};
        let val = null;
        this.customCompnentValues.forEach(cnt => {
          group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)

        });
        this.form = new FormGroup(group);
      
          this.fillForm(this.departmentId);
        
        
        // // console.log("validationFROM", this.form);
      }
    });

    
    //EDIT case handle
   
      this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          if (id) {
            this.loadSave = true;
            this.departmentId = id;
            this.fillForm(this.departmentId);
            this.pageTitle = 'Edit Department';
          }
          else {
            this.pageTitle = 'Add Department';
          }
        }
      );
    
  }

  //Edit case handle 
  displayInsuranceDetail(reposnse): void {
    //this.form.patchValue({

    //});
    const formGroup = {};
    for (let prop of Object.keys(this.customCompnentValues)) {
      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
    }

    this.form = new FormGroup(formGroup);
  }
  onSubmit() {
    this.loadSave = true;
    // // console.log("EditVal", this.form);
    if (this.form.valid) {
      this.customService.addEditForm(this.form.value, this.departmentId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          setTimeout(() => {
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


  close() {
    if (!this.isLead) {
      this.router.navigateByUrl("/department");
    }
    else {
      this.router.navigateByUrl("/lead");
    }
  }

  fillForm(id) {
    //this.form.reset();
    this.customService.GetDepartmentDetails(id).subscribe((result: any) => {
      // // console.log("result1212", this.customService.editPage.data[0]);
      let edit: any
      edit = this.customService.editPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];
          // // console.log("cntname", cntname)
          // // console.log("cntname", cntValue)
          formGroup[cntname] = new FormControl(cntValue);
        })
        // // console.log("formGroup", formGroup);
        // this.form.value.reset();


        this.form = new FormGroup(formGroup);
        // // console.log("EdittttPageee", this.form);

        this.loadSave = false;

      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }

  fillLeadForm(id) {
    this.customService.GetLeadsDetails(id).subscribe((result: any) => {
      // // console.log("result1212", this.customService.leadEditPage.data[0]);
      let edit: any
      edit = this.customService.leadEditPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];
          // // console.log("cntname", cntname)
          // // console.log("cntname", cntValue)
          formGroup[cntname] = new FormControl(cntValue);
        })
        // // console.log("formGroup", formGroup);
        // this.form.value.reset();


        this.form = new FormGroup(formGroup);
        // // console.log("EdittttPageee", this.form);
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


}
