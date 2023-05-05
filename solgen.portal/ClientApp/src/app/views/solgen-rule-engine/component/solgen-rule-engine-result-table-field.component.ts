import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SolgenRuleEngineCustomFormulaComponent } from '../solgen-rule-engine-custom-formula/solgen-rule-engine-custom-formula.component';
import { SolgenRuleEngineService } from '../solgen-rule-engine.service';
import { SolgenRuleConditionCalculationComponent } from './solgen-rule-condition-calculation.component';
import { SolgenRuleEngineResultCalculationComponent } from './solgen-rule-engine-result-calculation.component';

@Component({
  selector: 'app-solgen-rule-engine-result-table-field',
  templateUrl: './solgen-rule-engine-result-table-field.component.html',
})
export class SolgenRuleEngineResultTableFieldComponent implements OnInit, OnChanges {

  @Input() resultForm: FormArray;
  @Input() subModuleId: string = '';
  @Input() moduleId: string = '';
  tableFieldList = [];
  code: any;
  @Input() customFieldsList: any;
  operators: any = [];

  @ViewChild("resultCalculationModal", { static: false }) resultCalculation: SolgenRuleConditionCalculationComponent;
  @ViewChild("formulaModal", { static: false }) formulaModal: SolgenRuleEngineCustomFormulaComponent;

  constructor(private ruleEngineService: SolgenRuleEngineService) { }

  ngOnChanges() {
    // this.getSubModuleList();
    if (this.resultForm.value.tableFields.length != 0) {
      this.tableFieldList = this.resultForm.value.tableFields[0].fieldList;
    }

  }

  ngOnInit() {
  }

  get tableFields() {
    return this.resultForm.get('tableFields') as FormArray;
  }
  onFieldCalculateChange(event, tableField) {
    if (typeof event !== 'undefined') {
      tableField.get('conditionsId').setValue(null);
      if (typeof event !== 'undefined') {
        tableField.conditionOperatorsValue = null;
        this.sortConditionOperatoers(tableField,tableField.value.fieldId.dt_code);
        tableField.get('subModuleId').setValue(event.sub_module_id);
      }
    } else {
      tableField.get('conditionsId').setValue(null);
      tableField.get('conditions').setValue([]);
    }
    tableField.get('dataType').setValue(event.actual_data_type);
    tableField.get('name').setValue(event);
    tableField.get('fieldValue').setValue(null);
      tableField.get('fieldDisplayValue').setValue(null);
      if ((tableField.get('resultCalculation') as FormArray).length != 0) {
        (tableField.get('resultCalculation') as FormArray).removeAt(0);
      }
  }
  sortConditionOperatoers(tableField,dt_code) {
    if (dt_code == 'text' || dt_code == 'textbox' || dt_code == 'textarea' || dt_code == 'select'
      || dt_code == 'date' || dt_code == 'datetime' || dt_code == 'checkbox' || dt_code == 'radio' || dt_code == 'boolean' || dt_code == 'image') {
        tableField.get('conditions').setValue([]);
        tableField.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Value From', value: '2' }, { name: 'Formula', value: '4' }
        , { name: 'Related Formula', value: '5' }]);
    } else if (dt_code == 'bigint' || dt_code == 'int' || dt_code == 'number' || dt_code == 'decimal') {
      tableField.get('conditions').setValue([]);
      tableField.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Value From', value: '2' }, { name: 'Is Calculate', value: '3' }
      , { name: 'Formula', value: '4' }, { name: 'Related Formula', value: '5' }]);
    }
  }
  CalculationModal(tableField: FormGroup){
    this.resultCalculation.show(tableField, '', this.subModuleId, this.customFieldsList);
  }
  addTableField() {
    this.tableFields.push(this.ruleEngineService.buildResultTableField(null));
  }

  removeTableField(tableFieldindex: number) {
    this.tableFields.removeAt(tableFieldindex);
  }
  RelatedModal(tableFields){
    this.formulaModal.show(tableFields,this.subModuleId, this.customFieldsList);
  }
}
