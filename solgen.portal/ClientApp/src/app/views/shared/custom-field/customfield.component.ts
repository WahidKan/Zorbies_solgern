import { OnInit, Component,Input, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CustomFormBase } from "./customfield.service";
import { CommonService } from "../common.service";
import { TestdynamicformsComponent } from "../../test/testdynamicforms.component";

@Component({
  selector: 'app-custom-field',
  templateUrl: './customfield.component.html',
 // styleUrls: ['./leaseform.component.scss']
})
export class CustomFieldComponent implements OnInit {
  @Input() question: CustomFormBase<string>;
  @Input() form: FormGroup;
  @Input('customCompnentValues') customCompnentValues: any;
  @ViewChild('config', {static:false}) configs;
  componentaccess: any;
  //@Input("AppComponent") AppComponent: any;
  formInputs: any;

   group: FormGroup;
  lstDropdown: any;
  
  constructor(private commonService: CommonService, private fb: FormBuilder) {
    
  }
  ngOnInit() {
    this.formInputs = this.customCompnentValues;
    // // console.log("formgroup", this.formInputs);
    this.commonService.getMasterItemsList("BussinessContactPosition,CompanyType").subscribe((result: any) => {
      this.lstDropdown = this.commonService.masters.filter(x => x.masterName == "BussinessContactPosition");
    });
    if (typeof this.customCompnentValues !== 'undefined' && this.customCompnentValues.length != 0) {
      //for (let config of this.AppComponent) {
      //  this.group[config.controlNameComputed] = new FormControl(config.controlNameComputed || '')
      //}
      // // console.log("formgroup", this.group);
      this.generateForm();
    }
    else {
      //this.group = this.fb.group({
      //  txtFirstName_1: ['', Validators.required],
      //  LastName_2: ['', Validators.required],
      //  DateOfBirth_4: ['', Validators.required],
      //  UserType_6: ['', Validators.required],
      //  Adrress_3: ['', Validators.required],
      //  chkbox_10: [''],
      //});
    }
  }
  

  generateForm() {
    this.customCompnentValues.forEach(t => {
      let questions = <FormArray>this.group.controls[t.ControlName];
     // questions.push(
      this.group=  this.fb.group({
        value: [t.value, [t.required ? Validators.required : null]]
        })
      //)
    })
  }

  get isValid() { return this.group.controls[this.question.key].valid; }
  onSubmit() {
    //let data = this.group.value;
    // // console.log("thisSaveData", this.group);
  }
}
