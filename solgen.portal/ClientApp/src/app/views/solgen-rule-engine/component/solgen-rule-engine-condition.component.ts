import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { SolgenRuleEngineService } from '../solgen-rule-engine.service';
import { SolgenRuleConditionCalculationComponent } from './solgen-rule-condition-calculation.component';

@Component({
  selector: 'app-solgen-rule-engine-condition',
  templateUrl: './solgen-rule-engine-condition.component.html',
})
export class SolgenRuleEngineConditionComponent implements OnInit, OnChanges {
  SelectedValue: any[] = [];
  @Input() ruleEngineForm: FormGroup;
  @Input() target: FormGroup;
  @Input() rowNo: number;
  @Input() subModuleId: any;
  targetForm: FormGroup;
  @Input() customFieldsList: any;
  @Input() vwRuleId: any;
  newAdd = "Add";
  subModuleList: any[] = [];
  @ViewChild('addNewCondition', { static: false }) addNewCondition: ElementRef;
  @ViewChild('addConditionModal', { static: false }) addConditionModel: ModalDirective;
  @ViewChild('resultCalculationModal', { static: false }) resultCalculationModal: SolgenRuleConditionCalculationComponent;
  sqlConditionOperators = ['Or', 'And'];
  hideFieldList = true;
  textFieldListButton = " Show Field List";
  moduleAlias: string = '';

  constructor(private ruleEngineService: SolgenRuleEngineService, private commonService: CommonService) { }


  ngOnChanges(): void {
    this.moduleAlias = this.customFieldsList && this.customFieldsList.length > 0 ? this.customFieldsList[0].subModuleAlias : '';
    this.initForm();

    this.onConditionChange();
    if (this.target.get('isConditionAdded').value) {
      this.prepareEditConditionForm();
    }
  }

  ngOnInit() { }
  //show and hide table field list
  showFieldList() {
    this.hideFieldList = !this.hideFieldList;
    this.textFieldListButton = this.hideFieldList ? " Show Field List" : "Hide Field List";
  }

  initForm() {
    this.targetForm = this.ruleEngineService.buildTarget();
  }

  //fetch section form field list on section change
  onSubModuleChange(event, control) {
    if (typeof event !== 'undefined') {
      this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.ruleEngineForm.get('moduleId').value.value, event.sub_module_id).subscribe((m: any) => {
        if (m) {
          let tableFields = m.data.map(f => {
            return {
              PrimaryTableColumn: f.PrimaryTableColumn,
              actual_data_type: f.actual_data_type,
              display_name: f.display_name,
              form_field_id: f.form_field_id,
              dt_code: f.dt_code,
              name: f.name,
              select_options: f.select_options,
              table_name: f.table_name,
              table_alias: f.table_alias,
              sub_module_id: f.sub_module_id
            }
          });
          control.get('fieldId').setValue(null);
          control.get('subModuleId').setValue(event.sub_module_id);
          control.get('operatorId').setValue(null);
          control.get('subModuleAlias').setValue(null);
          control.get('operators').setValue(null);
          control.get('fieldValue').setValue(null);
          control.get('fields').setValue(tableFields);
          control.get('subModuleAlias').setValue(tableFields[0].table_alias);
          this.customFieldsList = m.data;
        } else {
          control.get('fields').setValue(null);
          control.get('fieldId').setValue(null);
          control.get('operatorId').setValue(null);
          control.get('subModuleAlias').setValue(null);
          control.get('operators').setValue(null);
          control.get('fieldValue').setValue(null);
          this.customFieldsList = null;
        }

      });
    } else {
      control.get('fieldId').setValue(null);
      control.get('operatorId').setValue(null);
      control.get('subModuleAlias').setValue(null);
      control.get('operators').setValue(null);
      control.get('fieldValue').setValue(null);
      control.get('fields').setValue([]);
    }

  }

  //show target condition popup on "Add Target" click
  showConditionModal() {
    this.addConditionModel.show();
  }

  //hide target condition popup modal on cancel click
  hideConditionModal() {
    this.addConditionModel.hide();
  }

  //on condition FormArray change to fetch prepare condition
  onConditionChange() {
    this.conditions.valueChanges.subscribe((condition: any[]) => {
      this.ruleEngineService.buildTargetConditionDatabaseString(condition,this.targetForm);
    });
  }

  get conditions() {
    return this.targetForm.get('conditions') as FormArray;
  }

  //add new condition on add click
  addCondition(event) {
    let condition = this.ruleEngineService.buidCondition();
    condition.get('subModuleAlias').setValue(this.moduleAlias);
    this.conditions.push(condition);
    this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value);
    this.addNewCondition.nativeElement.value = "Add";

  }
  onOperatorChange(event, control, i) {
    // conditionsId
    if (event.operator_expression == "(IS NULL OR EMPTY)" || event.operator_expression == "(IS NOT NULL OR NOT EMPTY)") {
      control.get('conditionsId').clearValidators();
      control.get('conditionsId').updateValueAndValidity();

      control.get('fieldValue').clearValidators();
      control.get('fieldValue').updateValueAndValidity();
      control.get('disableDropdown').setValue(true);
    }
    else {
      control.get('disableDropdown').setValue(false);
      control.get('conditionsId').setValidators([Validators.required]);
      control.get('fieldValue').setValidators([Validators.required]);
    }
    if (typeof event !== 'undefined') {
      this.SelectedValue.push(event);
      control.get('conditionsId').setValue(null);

      if (typeof event !== 'undefined') {
        control.conditionOperatorsValue = null;
        this.sortConditionOperatoers(control, control.value.fieldId.dt_code);
      }
    } else {
      control.get('conditionsId').setValue(null);
      control.get('conditions').setValue([]);
    }
  }
  sortConditionOperatoers(control, dt_code) {
    if (dt_code == 'text' || dt_code == 'textbox' || dt_code == 'textarea' || dt_code == 'select'
      || dt_code == 'date' || dt_code == 'datetime' || dt_code == 'checkbox' || dt_code == 'radio' || dt_code == 'boolean' || dt_code == 'image') {
      control.get('conditions').setValue([]);
      control.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }]);
    } else if (dt_code == 'bigint' || dt_code == 'int' || dt_code == 'number' || dt_code == 'decimal') {
      control.get('conditions').setValue([]);
      control.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }, { name: 'Is Calculate', value: '3' }]);
    }
  }
  CalculationModal(tableField: FormGroup) {
    this.resultCalculationModal.show(tableField, this.ruleEngineForm.get('moduleId').value.value, this.ruleEngineForm.get('subModuleId').value.sub_module_id, this.customFieldsList);
  }
  //fetch operator list on field change.
  onFieldChange(event, control, i) {
    if (typeof event !== 'undefined') {
      this.SelectedValue.push(event);
      control.get('operatorId').setValue(null);
      control.get('conditionsId').setValue(null);

      this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(response => {
        let temp = response as any;
        control.get('operators').setValue(temp.filter(m => m.OperatorType != "Arithmetic"));
      });
      control.get('subModuleAlias').setValue(event.subModuleAlias);
      control.get('subModuleId').setValue(event.sub_module_id);

    } else {
      control.get('operatorId').setValue(null);
      control.get('operators').setValue([]);
      control.get('conditionsId').setValue(null);
      control.get('conditions').setValue([]);
    }
  }
  get operators() {
    return this.conditions.get('operators');
  }

  get fields() {
    return this.conditions.get('fields');
  }
  get tableFields() {
    return this.conditions.get('tableFields') as FormArray;
  }
  removeCondition(conditionIndex: number) {
    //this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(null);
    this.conditions.removeAt(conditionIndex);
  }
  get targets() {
    return this.ruleEngineForm.get('targets') as FormArray;
  }

  //prepare edit condition form
  prepareEditConditionForm() {
    let editTargetForm = this.targets.at(this.rowNo) as FormGroup;
    this.targetForm.patchValue({
      targetId: editTargetForm.value.targetId,
      isConditionAdded: editTargetForm.value.isConditionAdded,
      targetCondition: editTargetForm.value.targetCondition,
      isResultAdded: editTargetForm.value.isResultAdded,
      results: editTargetForm.value.results
    });
    if (this.conditions) {
      while (this.conditions.length != 0) {
        this.conditions.removeAt(0);
      }
      (editTargetForm.get('conditions') as FormArray).controls.forEach(m => {
        this.conditions.push(m);
      });
    }

  }
  //fill data in target form and show condition popup modal.
  editCondition() {
    this.prepareEditConditionForm();
    this.showConditionModal();

  }
  TargetConditions(index: number) {
    return (this.ruleEngineForm.get('targets') as FormArray).at(index).get('conditions') as FormArray;
  }

  saveCondition() {
    this.targetForm.get('isConditionAdded').setValue(true);
    (this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo).patchValue({
      targetId: this.targetForm.value.targetId,
      isConditionAdded: this.targetForm.value.isConditionAdded,
      targetCondition: this.targetForm.value.targetCondition,
      isResultAdded: this.targetForm.value.isResultAdded,
      results: this.targetForm.value.results
    });
    while (this.TargetConditions(this.rowNo).length != 0) {
      this.TargetConditions(this.rowNo).removeAt(0);
    }
    this.conditions.controls.forEach(m => {
      this.TargetConditions(this.rowNo).push(m);
    });
    this.hideConditionModal();
  }

}
