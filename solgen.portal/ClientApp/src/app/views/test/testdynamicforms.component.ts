import { Component, OnInit, ViewChildren, QueryList, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { form_template, TestService, AppComponent } from './test.service';
import { CustomFieldComponent } from '../shared/custom-field/customfield.component';
import { DynamicFormComponent } from '../shared/custom-field/dynamicform.component';

@Component({
  selector: 'app-testdynamicforms',
  templateUrl: './testdynamicforms.component.html',
  styleUrls: ['./testdynamicforms.component.scss'],
  //template: `
  //  <div class="app">
  //    <app-custom-field [config]="config"></app-custom-field>
  //  </div>
  //`,
})
export class TestdynamicformsComponent implements OnInit {
  //myFormGroup: FormGroup;
  @ViewChild(DynamicFormComponent, { static: false }) child: DynamicFormComponent;
  moduleName: any;
  formTemplate: any = form_template;
  @Input()
  config: any[] = [];
  control: any;
  group_id: any;
  group_name: any;
  group_display_name: any;
  //appComponent: AppComponent[];
  AppComponent: AppComponent[] = [];
  customCompnentValues: any;
  //config: any[] = [];
  form: FormGroup;
  formGroup: FormGroup;
  grpId: any;
  sDtaa: any;
  showChild = false;
  formControlList:any[]=[];
  constructor(private fb: FormBuilder, private testService: TestService) {
    this.moduleName = "lead";
    // this.config = this.testService.blackListData;
    //this.testService.GetMapdataIntoStatic().subscribe((result: any) => {
    //  // // console.log("Results", this.testService.pagedData);
    //  this.AppComponent = this.testService.pagedData;
    //  // // console.log("NGOnIt", this.AppComponent);
    //  if (typeof this.AppComponent !== 'undefined' && this.AppComponent.length != 0) {
    //    this.showChild = true;
    //  }
    //});
   


  }
  ngOnInit() {
    this.testService.GetCustomFieldsList().subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.testService.customFieldsList.data;
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
          }
        })
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          group[cnt.form_controlName] = new FormControl('', cnt.is_required === true ? Validators.required : Validators.nullValidator)
        });
        this.form = new FormGroup(group);
        // // console.log("List", this.formControlList);
      }
    });
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
    if (this.form.valid) {
      alert(1);
    }
    // // console.log("thisSaveData", this.form);
  }
  close() {

  }
 // get FirstName_1_1() { return this.form.get('FirstName_1_1'); }
//  get FirstName_1_3() { return this.form.get('FirstName_1_3'); }

}





