import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { WorkFlowResultCalculationComponent } from './work-flow-result-calculation.component';
import { RuleEngineService } from '../../rule-engine/rule-engine.service';

@Component({
  selector: 'app-work-flow-result-table-field',
  templateUrl: './work-flow-result-table-field.component.html',
  styleUrls: ['./work-flow-result-table-field.component.scss']
})
export class WorkFlowResultTableFieldComponent implements OnInit, OnChanges{


  @Input() resultForm: FormArray;
  @Input() moduleId: string = '';
  tableFieldList = [];
  code: any;

  @ViewChild("resultCalculation", { static: false }) resultCalculation: WorkFlowResultCalculationComponent;
  constructor(private ruleEngineService: RuleEngineService) { }

  ngOnChanges() {
    if (this.resultForm.value.tableFields.length != 0) {
      this.tableFieldList = this.resultForm.value.tableFields[0].fieldList;
      // console.log('tableFieldList', this.tableFieldList);
    }

  }

  ngOnInit() {

  }





  get tableFields() {
    return this.resultForm.get('tableFields') as FormArray;
  }

  onTableFieldChange(event, tableField: FormGroup) {

    if (event) {
      tableField.get('dataType').setValue(event.actual_data_type);
      tableField.get('name').setValue(event);
      this.code = event.dt_code;
      let types = ['text', 'select', 'boolean'];
      if (types.filter(m => m == event.dt_code).length > 0) {
        tableField.get('isCalculate').disable();

      } else {
        tableField.get('isCalculate').enable();
      }
      tableField.get('isCalculate').setValue(false);
      tableField.get('fieldValue').setValue(null);
      tableField.get('fieldDisplayValue').setValue(null);

      while ((tableField.get('resultCalculation') as FormArray).length != 0) {
        (tableField.get('resultCalculation') as FormArray).removeAt(0);
      }
    }
  }

  showResultCalculation(tableField: FormGroup) {
    // console.log(tableField);
    this.resultCalculation.show(tableField);
  }

  onFieldCalculateChange(isCalculate: any, tableField: FormGroup) {

    if (isCalculate.value) {

      this.resultCalculation.show(tableField);
    } else {

      this.resultCalculation.hide();
    }
    tableField.get('fieldValue').setValue(null);
    tableField.get('fieldDisplayValue').setValue(null);
    if ((tableField.get('resultCalculation') as FormArray).length != 0) {
      (tableField.get('resultCalculation') as FormArray).removeAt(0);
    }
  }

  addTableField() {

    this.tableFields.push(this.ruleEngineService.buildResultTableField(null));
  }

  removeTableField(tableFieldindex: number) {

    this.tableFields.removeAt(tableFieldindex);
  }
}
