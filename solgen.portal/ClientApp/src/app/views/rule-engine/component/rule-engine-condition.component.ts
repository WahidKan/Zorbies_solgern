import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RuleEngineService } from '../rule-engine.service';
import { CommonService } from '../../shared/common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Condition } from 'selenium-webdriver';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { parse } from 'cfb/types';

@Component({
  selector: 'rule-engine-condition',
  templateUrl: './rule-engine-condition.component.html'
})
export class RuleEngineConditionComponent implements OnInit, OnChanges {
   
  SelectedValue: any[]=[];
  @Input() ruleEngineForm: FormGroup;
  @Input() target: FormGroup;
  @Input() rowNo: number;
  @Input() productId: string;
  targetForm: FormGroup;
  customFieldsList: any;
  newAdd = "Add";
  subModuleList: any[] = [];
  @ViewChild('addNewCondition', { static: false }) addNewCondition: ElementRef;
  @ViewChild('addConditionModal', { static: false }) addConditionModel: ModalDirective;
  sqlConditionOperators = ['Or', 'And'];
  hideFieldList = true;
  textFieldListButton = " Show Field List";

  constructor(private ruleEngineService: RuleEngineService, private commonService: CommonService) { }

  ngOnChanges(): void {
    this.getSubModuleList();  
    this.initForm();
    this.onConditionChange();    
    if (this.target.get('isConditionAdded').value) {      
      this.prepareEditConditionForm();
    }    
  }

  ngOnInit() {    
   
    //this.onConditionChange();    
  }

  //show and hide table field list
  showFieldList() {
    this.hideFieldList = !this.hideFieldList;
    this.textFieldListButton = this.hideFieldList? " Show Field List":"Hide Field List";
  }

  initForm() {
    this.targetForm = this.ruleEngineService.buildTarget();
  }

  //fetch section list
  getSubModuleList() {
    return this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value).subscribe((m: any[]) => {
      this.subModuleList = m.filter(a => a.module_name_code != 'loanapplication');
    });
  }

  //fetch section form field list on section change
  onSubModuleChange(event, control) {  
    if (typeof event !== 'undefined') {
      this.ruleEngineService.GetCustomFieldsListBySubModuleId(event.sub_module_id).subscribe((m: any) => {        
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
              table_alias: f.table_alias
            }
          });          
          control.get('fieldId').setValue(null);
          control.get('operatorId').setValue(null);
          control.get('subModuleAlias').setValue(null);
          control.get('operators').setValue(null);
          control.get('fieldValue').setValue(null); 
          control.get('fields').setValue(tableFields);       
          control.get('subModuleAlias').setValue(tableFields[0].table_alias);
          this.customFieldsList=m.data;
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
      let displayCondition = '';
      let databaseCondition = '';
      condition.forEach((obj) => {
       
        if (obj.relationWithParent != null) {          
          displayCondition += ` ${obj.relationWithParent.toLowerCase()} `;
          databaseCondition += ` ${obj.relationWithParent.toLowerCase()} `;
        }

        if (obj.openingBrackets != null) {          
          displayCondition += obj.openingBrackets;
          databaseCondition += obj.openingBrackets;
        }
        
        if (obj.fieldId != null) {          
          let fieldObj = obj.fieldId;
          displayCondition += fieldObj.PrimaryTableColumn;
          
          if (fieldObj.actual_data_type != 'table') {
            if (fieldObj.dt_code.includes('text')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn},'0')`;
            }
            else if (fieldObj.dt_code.includes('select')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn},'0')`;
            }
            else if (fieldObj.dt_code.includes('boolean')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn},0)`;
            }
            else if (fieldObj.dt_code.includes('bigint') || fieldObj.dt_code.includes('int') || fieldObj.dt_code.includes('decimal')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn},0)`;
            }
            else {
              databaseCondition += `${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn}`;
            }
          }
        }

        var operatorExpression = '';

        if (obj.operatorId != null) {          
          let operator = obj.operatorId;
          displayCondition += ` ${operator.operator_display_name}`;
          databaseCondition += ` ${operator.operator_expression}`;
          operatorExpression = operator.operator_expression;
        }

        if (obj.fieldValue != null) {

          let fieldObj = obj.fieldId;
          
          if (obj.fieldId !=null && fieldObj.actual_data_type != 'table') {
            if (fieldObj != null) {
              if (fieldObj.dt_code.includes('text')) {

                if (operatorExpression == 'Like') {

                  displayCondition += ` '${obj.fieldValue}'`;
                  databaseCondition += " '%" + obj.fieldValue + "%'";

                }
                else if (operatorExpression == 'IN') {

                  displayCondition += ` (${obj.fieldValue})`;
                  databaseCondition += " (" + obj.fieldValue + ")";

                }
                else {

                  displayCondition += ` '${obj.fieldValue}'`;
                  databaseCondition += " '" + obj.fieldValue + "'";

                }

              }
              else if (fieldObj.dt_code.includes('date')) {

                if (operatorExpression == 'between') {
                  let secondValue = '';
                  if (typeof obj.fieldSecondValue != 'undefined') {
                    secondValue = new Date(obj.fieldSecondValue).toLocaleDateString();
                  }

                  displayCondition += ` '${new Date(obj.fieldValue).toLocaleDateString()}' and '${secondValue}'`;
                  databaseCondition += ` '${new Date(obj.fieldValue).toLocaleDateString()}' and '${secondValue}'`;
                } else {
                  displayCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "'";
                  databaseCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "'";
                }

              }
              else if (fieldObj['dt_code'].includes('select')) {

                if (Array.isArray(obj['fieldValue'])) {
                  displayCondition += " (" + obj['fieldValue'].map(m => { return `'${m.name}'`; }).join() + ")";
                  databaseCondition += " (" + obj['fieldValue'].map(m => { return (fieldObj['actual_data_type'].includes('varchar') ? `'${m.value}'` : `${m.value}`); }).join() + ")";
                }
                else {
                  displayCondition += " '" + obj['fieldValue'].name + "'";
                  databaseCondition += " '" + obj['fieldValue'].value + "'";
                }
              }
              else if (fieldObj['dt_code'].includes('boolean')) {

                displayCondition += ' ' + obj['fieldValue'];
                databaseCondition += ' ' + (obj['fieldValue'] === true ? 1 : 0);

              }
              else {
                if (operatorExpression == 'between') {

                  displayCondition += ` ${obj['fieldValue']} and ${obj['fieldSecondValue']}`;
                  databaseCondition += ` ${obj['fieldValue']} and ${obj['fieldSecondValue']}`;

                } else if (operatorExpression == 'IN') {

                  displayCondition += ` (${obj['fieldValue']})`;
                  databaseCondition += ` (${obj['fieldValue']})`;

                } else {

                  displayCondition += ` ${obj['fieldValue']}`;
                  databaseCondition += ` ${obj['fieldValue']}`;

                }
              }
            }
          }
          else {
            try {
              if (Array.isArray(obj.fieldValue)) {
                displayCondition += ` '${fieldObj.PrimaryTableColumn}` + " (" + obj['fieldValue'].map(m => { return `'${m.name}'`; }).join() + ")";
                databaseCondition += ` ${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn}` + ", (" + obj['fieldValue'].map(m => { return (fieldObj['actual_data_type'].includes('varchar') ? `'${m.value}'` : `${m.value}`); }).join() + "))";
              }
              else {
                displayCondition += " '" + obj['fieldValue'].name + "'";
                databaseCondition += ` ${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn}` + ", '" + obj['fieldValue'].value + "')";
              }
            } catch (ex) { console.log(ex.message) }
          }
        }
       
        if (obj['closingBrackets'] != null) {          
          displayCondition += obj['closingBrackets'] + ' ';
          databaseCondition += obj['closingBrackets'] + ' ';
        }            
      });
      
        this.targetForm.get('targetCondition').patchValue({
          displayCondition: displayCondition,
          database_condition: databaseCondition
        });
    });
  }

  get conditions() {
    return this.targetForm.get('conditions') as FormArray;
  }

  //add new condition on add click
  addCondition(event) {    
    this.conditions.push(this.ruleEngineService.buidCondition());  
    this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value);    
    this.addNewCondition.nativeElement.value = "Add";
   
  }

  //fetch operator list on field change.
  onFieldChange(event, control, i) {
    if (typeof event !== 'undefined') {
      this.SelectedValue.push(event);
      control.get('operatorId').setValue(null);

      this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(m => {             
        control.get('operators').setValue(m);       
      });     

    } else {
      control.get('operatorId').setValue(null);
      control.get('operators').setValue([]);
    }
  }

  get operators() {
    return this.conditions.get('operators');
  }

  get fields() {
    return this.conditions.get('fields');
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
    // console.log('editTargetForm: ', editTargetForm);

    this.targetForm.patchValue({
      targetId: editTargetForm.value.targetId,
      isConditionAdded: editTargetForm.value.isConditionAdded,
      targetCondition: editTargetForm.value.targetCondition,
      isResultAdded: editTargetForm.value.isResultAdded,
      results: editTargetForm.value.results
    });

    while (this.conditions.length != 0) {
      this.conditions.removeAt(0);
    }

    (editTargetForm.get('conditions') as FormArray).controls.forEach(m => {      
      this.conditions.push(m);
    });    
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

    // console.log(this.targetForm.value.targetCondition);
    
    while (this.TargetConditions(this.rowNo).length != 0) {
      this.TargetConditions(this.rowNo).removeAt(0);
    }

    this.conditions.controls.forEach(m => {

      this.TargetConditions(this.rowNo).push(m);
    });

    // console.log((this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo));
    //return;
    this.hideConditionModal();
  }

}
