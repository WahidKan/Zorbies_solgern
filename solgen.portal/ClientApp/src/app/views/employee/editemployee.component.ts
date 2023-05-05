import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})
export class EditemployeeComponent implements OnInit {
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'users';
  submoduleName = 'employee';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  Id: any;
  leadId: any;
  moduleRefrenceName: any;
  sp_name: string;
  showChild = false;
  isLead = false;
  formControlList: any[] = [];
  errors: string[] = [];
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
    if (this.submoduleName == 'employee') {
      this.companyId = 1001
      this.moduleRefrenceName = this.submoduleName;
      
    }
    if (this.submoduleName == 'employee') {
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
    this.employeeService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
      if (result) {
        //this.form.setValue(null);
        this.customCompnentValues = this.employeeService.customFieldsList.data;

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
        if (this.Id != null) {
          this.fillForm(this.Id);
        }

        // // console.log("validationFROM", this.form);
      }
    });


    //EDIT case handle

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.Id = id;
          this.fillForm(this.Id);
          this.pageTitle = 'Edit Department';
        }
        else {
          this.pageTitle = 'Add Department';
        }
      }
    );

  }
  fillForm(id) {
    //this.form.reset();
    this.employeeService.GetEmployeeDetail(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
      // // console.log("result1212", this.employeeService.editPage.data[0]);
      let edit: any
      edit = this.employeeService.editPage.data[0];
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

  close() {
    this.router.navigateByUrl("/employee");
  }

}
