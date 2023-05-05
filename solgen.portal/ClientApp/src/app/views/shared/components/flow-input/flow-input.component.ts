import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-flow-input',
  templateUrl: './flow-input.component.html',
  styleUrls: ['./flow-input.component.scss']
})
export class FlowInputComponent implements OnInit, OnChanges {


  @Input() formGroup: FormGroup;
  @Output() emitShowResultCalculation = new EventEmitter<any>();
  InputType: any;
  @Input() controlName: any;
  @Input('id') ID: number;
  @Input() from: string = "";
  isMultiSelect: boolean = false;
  SelectList: any;
  isCalculated: boolean;//= false;
  isNull: boolean = false;
  @Input() operator: any;
  searchText: string;
  len: any = 10;
  DdlValues: any[] = [];
  radiodata: any[] = [];
  scrollDataList: any;
  custom_field_ids: any;
  field_code: any;
  datedll: any[] = [];
  constructor(private service: CommonService, ) { }

  ngOnChanges() {
    // console.log('formGroup', this.formGroup)
    // console.log('formGroupfieldId', this.formGroup.get('fieldId').value);
    // console.log('operator', this.operator)
    ;
    if (this.operator) {
      if (typeof this.operator.operator_expression != 'undefined' && (this.operator.operator_expression.includes('is null') || this.operator.operator_expression.includes('is not null'))) {
        // console.log('operator: ', this.operator);
        this.isNull = true;
        this.formGroup.get(this.controlName).setValue(null);
        this.formGroup.get(this.controlName).clearValidators();
        this.formGroup.get(this.controlName).updateValueAndValidity();
        this.formGroup.get(this.controlName).disable();
      } else {
        this.isNull = false;
        this.formGroup.get(this.controlName).setValidators([Validators.required]);
        this.formGroup.get(this.controlName).updateValueAndValidity();
        this.formGroup.get(this.controlName).enable();
      }
    } else {
      this.isNull = false;
      this.formGroup.get(this.controlName).setValidators([Validators.required]);
      this.formGroup.get(this.controlName).updateValueAndValidity();
      this.formGroup.get(this.controlName).enable();
    }

    if (this.formGroup.get('operatorId')) {
      this.formGroup.get('operatorId').valueChanges.subscribe(m => {
        if (m) {
          // console.log(m);
          if (m.operator_expression == 'IN' || m.operator_display_name.includes('multiple possible values')) {
            // console.log(true);
            this.isMultiSelect = true;
          } else {
            // console.log(false);
            this.isMultiSelect = false;
          }
        }

      });
    }

    if (this.controlName) {

      if (this.formGroup.get('fieldId')) {
        let objValue = this.formGroup.get('fieldId').value;
        if (objValue) {

          this.InputType = objValue.dt_code;
          if (objValue.dt_code == 'boolean') {
            this.formGroup.get(this.controlName).setValue((this.formGroup.get(this.controlName).value == 'true' ? true : false));
          }
          if (objValue.select_options && (objValue.dt_code == 'radio' || objValue.dt_code == 'checkbox')) {
            this.radiodata.length = 0;
            this.radiodata = JSON.parse(objValue.select_options)
          }
          if (objValue.select_options && objValue.dt_code == 'select') {
            this.DdlValues.length = 0;
            this.DdlValues = JSON.parse(objValue.select_options)
            //  .forEach(t => {
            //  this.DdlValues.push(t);

            //})

            //this.DdlValues.push(JSON.parse(objValue.select_options))
            // this.formGroup.get('fieldSelectList').setValue(JSON.parse(objValue.select_options));
          }
          //if (objValue.select_options && (objValue.dt_code == 'date' || objValue.dt_code == 'datetime')) {
          //  this.datedll.length = 0;
          //  this.datedll = JSON.parse(objValue.select_options)
          
          //}
          let types = ['text', 'select', 'boolean', 'date'];
          if (this.formGroup.get('isCalculate')) {

            if (types.filter(m => m == objValue.dt_code).length > 0) //(objValue.dt_code == 'text' && objValue.dt_code == 'select' && objValue.dt_code == 'boolean')
            {
              this.formGroup.get('isCalculate').disable();

            } else {
              this.formGroup.get('isCalculate').enable();
            }

            this.formGroup.get('isCalculate').setValue(false);
            //this.formGroup.get('fieldValue').setValue(null);
            //this.formGroup.get('fieldDisplayValue').setValue(null);

            while ((this.formGroup.get('resultCalculation') as FormArray).length != 0) {
              (this.formGroup.get('resultCalculation') as FormArray).removeAt(0);
            }
          }
        }
      }

      if (this.formGroup.get('operatorId')) {
        var operator = this.formGroup.get('operatorId').value;
        if (operator) {
          if (operator.operator_expression == 'IN' || operator.operator_display_name.includes('multiple possible values')) {
            this.isMultiSelect = true;
          } else {
            this.isMultiSelect = false;
          }
        }

      }
    }
    this.onFieldChange();
  }

  ngOnInit() {

  }



  onFieldChange() {
    this.formGroup.get('fieldId').valueChanges.subscribe((m: any) => {
      this.prepareInput(m);
    })
  }

  prepareInput(obj) {
    // console.log('dropdownsdata', obj);
    if (this.controlName) {
      if (obj) {
        this.custom_field_ids = obj.form_field_id;
        this.field_code = obj.field_code;

        if (obj.dt_code == 'boolean') {
          this.formGroup.get(this.controlName).setValue(false);
        } else {
          this.formGroup.get(this.controlName).setValue(null);
        }

        if (obj.select_options && (obj.dt_code == 'radio' || obj.dt_code == 'checkbox')) {
          this.radiodata.length = 0;
          this.radiodata = JSON.parse(obj.select_options)
        }
        this.InputType = obj.dt_code;
        //if (obj.select_options && (obj.dt_code == 'date' || obj.dt_code == 'datetime')) {
        //  this.datedll.length = 0;
        //  this.datedll = JSON.parse(obj.select_options)
          
        //  // console.log('DdlValues', this.datedll);
         
        //}
        if (obj.select_options && obj.dt_code == 'select') {
          this.DdlValues.length = 0;
          this.DdlValues = JSON.parse(obj.select_options)
          //  .forEach(t => {
          //  this.DdlValues.push(t);

          //})
          // console.log('DdlValues', this.DdlValues);
          //this.DdlValues.push(this.formGroup.get('fieldSelectList').setValue(JSON.parse(obj.select_options)));
          // this.formGroup.get('fieldSelectList').setValue(JSON.parse(obj.select_options))
        }

      }
    }
  }

  onClearLang(dataList: any, i: number): void {
    this.len = 0
    this.searchText = '';
    if (this.custom_field_ids == 0 || this.custom_field_ids == undefined || this.field_code == '' || this.field_code == undefined) {
     // alert(1);
      let objValue = this.formGroup.get('fieldId').value;
      // console.log('objValueobjValue', objValue);
      this.field_code = objValue.field_code;
      this.custom_field_ids = objValue.form_field_id;
      //this.formGroup.get('fieldId').valueChanges.subscribe((m: any) => {
      //  this.prepareInput(m);
      //})
    }
    this.service.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
      this.DdlValues = this.service.customFieldsListData;
      //(dataList[i] as any[]) = this.scrollDataList;
    })
  }
  onScrollToEnd(dataList: any, i: number) {
    this.fetchMore(dataList, i);
  }
  onKeySelect(e: any, dataList: any, i: number) {
   
    this.len = 0

    // console.log('e.target.value ', e.target.value)
    // console.log('e.target.value ', e)
    //if (e.target.value != '' && e.target.value != undefined) {
      
      this.searchText = e.target.value;

      this.service.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
        this.DdlValues = this.service.customFieldsListData;
        // (dataList[i] as any[]) = this.scrollDataList;
      })
   // }  
  }
  private fetchMore(dataList: any, i: number) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    let data = (dataList[i] as any[]);
    this.service.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.service.customFieldsListData;
      //(dataList[i] as any[]) = (dataList[i] as any[]).concat(this.scrollDataList);
      this.DdlValues = this.DdlValues.concat(this.scrollDataList);
      // console.log('afterscrolDdlValues', this.DdlValues);
    })
  }
}
