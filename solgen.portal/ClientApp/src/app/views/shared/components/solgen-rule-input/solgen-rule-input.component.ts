import { Component, OnInit, Input, OnChanges, DoCheck, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CommonService } from '../../common.service';
import { SolgenValidator } from '../../custom-validation/solgen-validator';

@Component({
  selector: 'solgen-rule-input',
  templateUrl: './solgen-rule-input.component.html',
  styleUrls: ['./solgen-rule-input.component.scss']
})
export class SolgenRuleInputComponent implements OnInit, OnChanges {

  @Input() formGroup: FormGroup;
  @Output() emitShowResultCalculation = new EventEmitter<any>();
  InputType: any;
  @Input() controlName: any;
  @Input('id') ID: number;
  @Input() from: string = "";
  @Input() operatorType: any;
  @Input() updateOnOperatorType: boolean = false;
  @Input() customFiledList: any;
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
  disableInput: boolean = false;
  @Input() disabled: boolean = false;
  constructor(private service: CommonService,) { }

  ngOnInit() {
    if (this.formGroup.get('fieldId').value) {
      this.custom_field_ids = this.formGroup.get('fieldId').value.form_field_id;
    }
  }

  ngOnChanges() {

    if (this.updateOnOperatorType && this.operatorType === null) {
      this.formGroup.get('fieldValue').setValue(null);
    }
    else {
      if (this.operator) {
        this.formGroup.get("conditionsId").valueChanges.subscribe(arg => {
          this.formGroup.get('fieldValue').setValue(null);

        });

        if (typeof this.operator.operator_expression != 'undefined' && (this.operator.operator_expression.includes('is null') || this.operator.operator_expression.includes('is not null') || this.operator.operator_expression == "(IS NULL OR EMPTY)" || this.operator.operator_expression == "(IS NOT NULL OR NOT EMPTY)" )) {
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
            if (m.operator_expression == 'IN' || m.operator_display_name.includes('multiple possible values')) {
              this.isMultiSelect = true;
            } else {
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
            if (objValue.dt_code == 'boolean' && this.operatorType.value === '1') {
              const value = this.formGroup.get(this.controlName).value == 'true' || this.formGroup.get(this.controlName).value ? true : false;
              this.formGroup.get(this.controlName).setValue(value);

            }

            if (objValue.select_options && objValue.dt_code == 'radio') {
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
      if (this.operatorType && this.operatorType.value === '2' && this.updateOnOperatorType) { //Is comapre
        this.InputType = 'select'
        this.DdlValues.length = 0;
        let field = this.formGroup.get('fieldId').value;
        if (this.formGroup.get('operatorId')) {
          var operator = this.formGroup.get('operatorId').value;
          if (this.formGroup.get("fieldValue").value
            && this.formGroup.get("fieldValue").value != ''
            && !Array.isArray(this.formGroup.get("fieldValue").value)
            && operator.operator_expression == 'IN'
            || operator.operator_display_name.includes('multiple possible values')) {
            if (!this.customFiledList) {
              this.formGroup.get("fieldValue").setValue(JSON.parse(this.formGroup.get("fieldValue").value));
            }
          }
        }
        if (field.dt_code == 'boolean') {
          this.formGroup.get("fieldValue").setValue(JSON.parse(this.formGroup.get("fieldValue").value));
        }
        this.DdlValues = this.customFiledList ? JSON.parse(JSON.stringify(this.customFiledList)) : [];
        if (this.DdlValues.length == 0 && this.formGroup.get("fieldValue").value) {
          this.DdlValues = Array.isArray(this.formGroup.get("fieldValue").value) ? this.formGroup.get("fieldValue").value : [this.formGroup.get("fieldValue").value];
        }
        this.disableInput = false;
        this.DdlValues = this.DdlValues ? this.DdlValues.filter(x => x.actual_data_type == this.formGroup.get("fieldId").value.actual_data_type) : [];

      }
      else if (this.operatorType && this.operatorType.value === '1' && this.updateOnOperatorType) {
        let field = this.formGroup.get('fieldId').value;
        if (this.formGroup.get('operatorId')) {
          var operator = this.formGroup.get('operatorId').value;
          if (this.formGroup.get("fieldValue").value
            && this.formGroup.get("fieldValue").value != ''
            && !Array.isArray(this.formGroup.get("fieldValue").value)
            && operator.operator_expression == 'IN'
            || operator.operator_display_name.includes('multiple possible values')) {
            if (!this.customFiledList) {
              this.formGroup.get("fieldValue").setValue(JSON.parse(this.formGroup.get("fieldValue").value));
            }
          }
        }
        if (field && field.dt_code == "select" && (field.select_options == null || field.select_options == '')) {
          let sub_module_id = field.sub_module_id;
          this.service.GetCustomFieldsOptionsList(field.form_field_id,sub_module_id).subscribe(res => {
            field.select_options = res;
            this.formGroup.get('fieldId').setValue(field);
          })
        }

      }
      if (this.operatorType && this.operatorType.value === '3' && this.updateOnOperatorType) { //Is calculate
        this.InputType = 'text';
        this.disableInput = true;
      }
      if (this.operatorType && this.operatorType.value === '5' && this.updateOnOperatorType) { //related formula
        this.InputType = 'text';
        this.disableInput = true;
      }
      if(this.operatorType && this.operatorType.value === '4') { //Formula
        this.InputType = 'select'
        this.DdlValues = [];
        this.DdlValues.length = 0;
        this.len = this.DdlValues.length;
        this.service.GetSolgenRuleEngineFormulaList(0).subscribe(result=>{
          let a = JSON.parse(result);
          this.DdlValues = a;
        });
      }
      this.onFieldChange();
    }
  }

  onFieldChange() {
    this.formGroup.get('fieldId').valueChanges.subscribe((m: any) => {
      this.prepareInput(m);
    })
  }

  prepareInput(obj) {
    if (this.controlName) {
      if (obj) {
        this.custom_field_ids = obj.form_field_id;
        this.field_code = obj.field_code;

        if (obj.dt_code == 'boolean') {
          this.formGroup.get(this.controlName).setValue(false);
        } else {
          this.formGroup.get(this.controlName).setValue(null);
        }
        if (obj.select_options && obj.dt_code == 'radio') {
          this.radiodata.length = 0;
          this.radiodata = JSON.parse(obj.select_options)
        }
        this.InputType = obj.dt_code;

        if (obj.select_options && obj.dt_code == 'select') {
          this.DdlValues.length = 0;
          this.DdlValues = JSON.parse(obj.select_options)
          //  .forEach(t => {
          //  this.DdlValues.push(t);

          //})
          //this.DdlValues.push(this.formGroup.get('fieldSelectList').setValue(JSON.parse(obj.select_options)));
          // this.formGroup.get('fieldSelectList').setValue(JSON.parse(obj.select_options))
        } else {
          this.DdlValues.length = 0;
          this.DdlValues = [];

        }

      }
    }
  }

  onClearLang(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.service.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
      this.DdlValues = this.service.customFieldsListData;
      //(dataList[i] as any[]) = this.scrollDataList;
    })
  }
  onScrollToEnd(dataList: any, i: number) {
    this.len = this.DdlValues.length;
    if(this.operatorType && this.operatorType.value == '4'){
      this.service.GetSolgenRuleEngineFormulaList(this.len).subscribe(result=>{
        this.DdlValues = this.DdlValues.concat(JSON.parse(result));
      });
    }
    else if(this.operatorType && this.operatorType.value !== '2'){
      this.fetchMore(dataList, i);
    }

  }
  onKeySelect(e: any, dataList: any) {
    this.searchText = e.target.value;
    this.len = 0;
    if(this.operatorType && this.operatorType.value == '4'){
      this.len = this.DdlValues.length;
      this.service.GetSolgenRuleEngineFormulaList(this.len, this.searchText).subscribe(result=>{
        this.DdlValues = this.DdlValues.concat(JSON.parse(result));
      });
    }
    else if(this.operatorType && this.operatorType.value !== '2'){
      this.service.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
        this.DdlValues = this.service.customFieldsListData;
        // (dataList[i] as any[]) = this.scrollDataList;
      });
    }

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
    })
  }
}

