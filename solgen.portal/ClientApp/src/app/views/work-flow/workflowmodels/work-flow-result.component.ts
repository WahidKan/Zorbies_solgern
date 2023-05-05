import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RuleEngineService } from '../../rule-engine/rule-engine.service';
import { CommonService } from '../../shared/common.service';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-work-flow-result',
  templateUrl: './work-flow-result.component.html',
  styleUrls: ['./work-flow-result.component.scss']
})
export class WorkFlowResultComponent implements OnInit, OnChanges {

  @ViewChild('addNewCondition', { static: false }) addNewCondition: ElementRef;
  @Input() target: FormGroup;
  @Input() ruleEngineForm: FormGroup;
  resultForm: FormGroup;
  resultActionList: any[];
  editIndex: number = -1;
  formValue: any;
  @ViewChild('addResult', { static: false }) addResultModel: ModalDirective;
  @ViewChild('addConditionModal', { static: false }) addConditionModal: ModalDirective;
  tableList: any[];
  tempTableList: any[];
  moduleId: string = '';    
  @Output() showbutton = new EventEmitter<number>();
  showdata = false;
  SelectedValue: any[] = [];
  resultsubModule: number;
  showWhere: boolean = false;
  constructor(private fb: FormBuilder,
    private ruleEngineService: WorkflowService,
    private commonService: CommonService) { }

  ngOnChanges() {

    this.moduleId = this.ruleEngineForm.get('moduleId').value.value;
    this.getSubModules();
    //this.conditiondata();
  }  

  ngOnInit() {
    
 
    this.initForm();
    this.clearTableFields();
    this.getResultActions();
   

  }

  onActionChange(event) {
    ;
    this.clearTableFields();
    if (typeof event !== 'undefined') {
      this.resultForm.get('actionId').setValue(event.resultActionId);
      this.resultForm.get('subModuleId').setValue(null);
      this.prepareActionChangeContent(event.code, true);
    }

  }

  prepareActionChangeContent(code: string, onChange = false) {
    ;
    if (code == 'validation') {
      if (onChange) {
        this.resultForm.get('resultCondition').setValue(null);
        this.resultForm.get('subModuleId').setValue(null);
      }

      this.resultForm.get('resultCondition').setValidators([Validators.required]);
      this.resultForm.get('resultCondition').updateValueAndValidity();


      this.resultForm.get('subModuleId').disable();
      this.resultForm.get('subModuleId').clearValidators();
      this.resultForm.get('subModuleId').updateValueAndValidity();
    } else {

      if (onChange) {
        this.resultForm.get('resultCondition').setValue(null);
        this.resultForm.get('subModuleId').setValue(null);
      }

      this.resultForm.get('resultCondition').clearValidators();
      this.resultForm.get('resultCondition').updateValueAndValidity();

      this.resultForm.get('subModuleId').enable();
      this.resultForm.get('subModuleId').setValidators([Validators.required]);
      this.resultForm.get('subModuleId').updateValueAndValidity();

    }


    if (code === 'create') {
      this.tempTableList = this.tableList;
      this.tableList = this.tableList.filter(m => m.module_name_code == 'LoanApplicationRequiredDocument');
    } else {
      if (this.tempTableList) {
        this.tableList = this.tempTableList;
      }
    }

  }

  getResultActions() {
    ;
    this.commonService.getResultActions().subscribe((m: any[]) => {
      this.resultActionList = m;
    });
  }

  getSubModules() {
  
    this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value,null,false).subscribe((m: any[]) => {
      this.tableList = m.filter(a => a.module_name_code != 'loanproduct' && a.module_name_code != 'loanapplication');
      // console.log('tableList',this.tableList)
    });

  }

  showResultModal() {
    ;
    this.editIndex = -1;
    this.addResultModel.show();
    this.resetResultForm();
  }

  hideResultModal() {
   
    this.addResultModel.hide(); 
    this.resetResultForm();
  }

  //fetch section field list
  getSubModuleFields(subModule) {
   // this.conditions.controls[0].get('fieldValue').clearValidators();
    //this.conditions.controls[0].get('fieldValue').updateValueAndValidity();
    
 while (this.conditions.length !=0) {
      this.conditions.removeAt(0)

    }
    this.resultForm.get('databaseresultCondition').setValue(null);
    this.resultForm.get('displayresultcondition').setValue(null);
    //if (this.conditions.length == 1) {  
    //  const control = this.conditions.controls[0] as FormGroup;
    //  control.get('fields').setValue(null);
    //  control.get('fieldId').setValue(null);
    //  control.get('operatorId').setValue(null);
    //  control.get('subModuleAlias').setValue(null);
    //  control.get('subModuleId').setValue(null);
    //  control.get('operators').setValue(null);
    //  control.get('fieldValue').setValue(null);
    //  //this.resultForm.get['databaseresultCondition'].se = '';
    //  //this.resultForm.value.displayresultcondition = '';
      
    ////  this.hideConditionModal()
    //}


    let currentPage = this;
    this.clearTableFields();
    // console.log('subModulesubModulesubModule', subModule);
    
    this.resultsubModule = subModule.sub_module_id;
    if (subModule) {
      this.ruleEngineService.GetCustomFieldsListBySubModuleId(subModule.sub_module_id,0,false).subscribe((m: any) => {
        if (m) {
          let tableFiledList = m.data.map(f => {
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
              field_code: f.field_code
            }
          });
          if (this.resultForm.get('action').value) {

            if (this.resultForm.get('action').value.code == 'create') {

              tableFiledList.forEach(obj => {
                let tempObj = obj;

                this.tableFields.push(this.ruleEngineService.buildResultTableField(tempObj));

              });

            } else {
              this.resultForm.get('fieldList').setValue(tableFiledList);
              this.tableFields.push(this.ruleEngineService.buildResultTableField(null));
            }
          }
        }
      });
    }
  }

  get results() {
    return this.target.get('results') as FormArray;
  }

  get tableFields() {
    return this.resultForm.get('tableFields') as FormArray;
  }

  clearTableFields() {
    ; 
    while (this.tableFields.length !== 0) {
      this.tableFields.removeAt(0);
    }
  }

  initForm() {

    this.resultForm = this.fb.group({
      resultId: [null],
      name: [null, Validators.required],
      action: [null, Validators.required],
      actionId: [null, Validators.required],
      subModuleId: [null],
      fieldList: [null],
      resultCondition: [null],
      displayresultcondition: [''],
      databaseresultCondition: [''],

      tableFields: this.fb.array([this.buildResultTableField()]),
      whereClauseFields: this.fb.array([this.buildResultwhereclause()]) ,
      isEdit: [false] 
    });// this.ruleEngineService.buidResult();
  }

  buildResultTableField(tableField = null) {

    let tableFieldGroup = this.fb.group({
      RuleTargetResultConditionId: [null],
      RuleTargetId: [null],
      fieldId: [null],
      name: [null, Validators.required],
      fieldSelectList: [],
      displayName: [null],
      dataType: [null, Validators.required],
      isCalculate: [{ value: false, disabled: true }],
      fieldDisplayValue: [null],
      fieldValue: [null, Validators.required],
      showPopUpModal: [false],
      resultCalculation: this.fb.array([this.ruleEngineService.buildResultCalculation()])
    });

    return tableFieldGroup;
  }
 
  editResult(index) {
    ;
    this.editIndex = index;
    // console.log("target targetform test ", this.target);
    const control = this.results.at(this.editIndex).get('whereClauseFields') as FormArray;
    // console.log('controlcontrol', control)
    control.removeAt(0);
    // console.log('controlcontrolafter', control)
   // // console.log("deeeeeeeee", dee);
    //dee.removeAt(0);
    // console.log("target targetform test  aafter", this.target);
 
    let editResultForm = this.results.at(this.editIndex) as FormGroup;
    
    let formValue = editResultForm;


    this.resultForm = formValue;
    // console.log('this.resultForm', this.resultForm);
    this.resultForm.get('isEdit').setValue(true);
   // const control = this.results.at(this.editIndex).get('whereClauseFields') as FormArray;
   // // console.log('controlcontrol',control)
   // control.removeAt(0);
    this.prepareActionChangeContent(editResultForm.get('action').value.code);
    this.addResultModel.show();
  }

  saveResult() {
    // console.log('resultForm', this.resultForm);
    this.showdata = true;
    if ((this.resultForm.get('isEdit').value == null || this.resultForm.get('isEdit').value == false) && this.resultForm.valid) {
      this.prepareQuery(this.resultForm);
      this.results.push(this.resultForm);
      this.addResultModel.hide();
      this.showbutton.emit(123456);
      //let i = 0;
      //while (i < this.results.value.length) {
      //  if (this.results.value[i].name == null || this.results.value[i].name == "" || this.results.value[i].name == undefined) {
      //    this.results.removeAt(i);
      //  }
      //  i++;
      //}
      this.target.get('isResultAdded').setValue(true);
      this.target.get('isResultDecisionAdded').setValue(true);
      // console.log("this.resultForm", this.ruleEngineForm);
      // console.log(this.results, "this.results");

    } else if (this.resultForm.get('isEdit').value == true && this.resultForm.valid) {
      this.results.removeAt(this.editIndex);
      this.prepareQuery(this.resultForm);
      this.results.insert(this.editIndex, this.resultForm);
      this.addResultModel.hide();
      this.target.get('isResultAdded').setValue(true);
      this.addResultModel.hide();

    } else {

      alert('Invalid');

    }
  }

  deleteResultForm() {
    if (confirm("Are you sure you want to delete this result?")) {
      this.results.removeAt(this.editIndex);
      this.hideResultModal();
      //this.resetResultForm();
      //this.results.push(this.resultForm);
    }
  }

  resetResultForm() {
    this.initForm();

  }

  prepareQuery(result: FormGroup) {
    let query = '';
    let actionName = result.get('action').value.code;

    if (actionName == 'create') {
      this.createQuery();
    } else if (actionName == 'update') {
      this.updateQuery();
    }
  }

  createQuery() {


    let tableName = this.resultForm.value.tableFields[0].fieldId.table_name;
    let columns = '';
    let columnsValue = '';
    let query = `insert into ${tableName} (`;
    this.resultForm.value.tableFields.forEach((obj, index) => {

      let comma = '';
      if (this.resultForm.value.tableFields.length != (index + 1)) {
        comma = ', ';
      }

      if (obj.fieldId.dt_code == 'text') {

        columns += `${obj.name}${comma}`;
        columnsValue += `''${obj.fieldValue}''${comma}`;

      } else if (obj.fieldId.dt_code == 'decimal' || obj.fieldId.dt_code == 'int' || obj.fieldId.dt_code == 'bigint') {

        columns += `${obj.name}${comma}`;
        columnsValue += `${obj.fieldValue}${comma}`;

      } else if (obj.fieldId.dt_code == 'boolean') {

        columns += `${obj.name}${comma}`;
        columnsValue += `${(obj.fieldValue === true ? 1 : 0)}${comma}`;

      } else if (obj.fieldId.dt_code == 'date') {

        columns += `${obj.name}${comma}`;
        columnsValue += `'${obj.fieldValue}'${comma}`;

      } else if (obj.fieldId.dt_code == 'select') {

        columns += `${obj.name}${comma}`;
        columnsValue += `'${obj.fieldValue.value}'${comma}`;

      }

    });

    query += `${columns}) select ${columnsValue}`;

    this.resultForm.get('resultCondition').setValue(query);

  }

  updateQuery() {
 
    let tableName = this.resultForm.value.tableFields[0].fieldId.table_alias;

    let query = 'update ' + tableName + ' set ';

    this.resultForm.value.tableFields.forEach((obj, index) => {
      ;
      let comma = '';
      if (this.resultForm.value.tableFields.length != (index + 1)) {
        comma = ', ';
      }
      // console.log('obj: ', obj);
      if (obj.dataType.includes('date') && obj.isCalculate == false) {
        
        obj.fieldValue = 'GETUTCDATE()';

      }

      if (obj.fieldId.dt_code == 'select') {

        query += `${tableName}.${obj.fieldId.name}='${obj.fieldValue.value}'${comma}`;
      } else if (obj.dataType.includes('char')) {

        query += `${tableName}.${obj.fieldId.name}='${obj.fieldValue}'${comma}`;
      } else if (obj.dataType.includes('decimal') || obj.dataType.includes('int') || obj.dataType.includes('bigint')) {
        query += `${tableName}.${obj.fieldId.name}=${obj.fieldValue}${comma}`;
      } else if (obj.dataType.includes('bit')) {

        query += `${tableName}.${obj.fieldId.name}=${(obj.fieldValue === true ? 1 : 0)}${comma}`;
      } else if (obj.dataType.includes('date') && obj.isCalculate == false) {
        query += `${tableName}.${obj.fieldId.name}=${obj.fieldValue}`;
      } else if (obj.dataType.includes('date') && obj.isCalculate == true) {

        if (obj.fieldValue == null) {
          obj.fieldValue = obj.fieldDisplayValue
        }
        query += `${tableName}.${obj.fieldId.name}=${obj.fieldValue}${comma}`;
      }

    });
    this.resultForm.get('resultCondition').setValue(query);
    // console.log('this.resultForm', this.resultForm);
  }


  /////////// Condition part ///////////////

  hideConditionModal() {
    if (this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '') {


      this.conditions.controls.forEach(control => {

       
        control.get('subModuleId').clearValidators();
        control.get('subModuleId').updateValueAndValidity();
        
        control.get('subModuleAlias').clearValidators();
        control.get('subModuleAlias').updateValueAndValidity();
    
        control.get('fieldId').clearValidators();
        control.get('fieldId').updateValueAndValidity();
     
        control.get('operatorId').clearValidators();
        control.get('operatorId').updateValueAndValidity();
      ;
        control.get('fieldValue').clearValidators();
        control.get('fieldValue').updateValueAndValidity();
      });
    }
    this.addConditionModal.hide();
  }


  openconditionpopup() {
    if (this.conditions.length == 0) {
      this.conditions.push(this.buildResultwhereclause());
    }
    // console.log("resultFormresultForm", this.resultForm)
    // console.log("openconditionpopup", this.resultForm.value.databaseresultCondition);
    // console.log('this.conditions', this.conditions)
    if (this.resultForm.value.subModuleId != null || this.resultForm.value.subModuleId != '') {
      this.resultsubModule = this.resultForm.value.subModuleId;
    }
      
    
  
    const control = this.conditions.controls[0] as FormGroup;

    if ( this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '') {
     


     
      control.get('subModuleId').setValidators([Validators.required]);
      control.get('subModuleId').updateValueAndValidity();
     
      control.get('subModuleAlias').setValidators([Validators.required]);
      control.get('subModuleAlias').updateValueAndValidity();
     
      control.get('fieldId').setValidators([Validators.required]);
      control.get('fieldId').updateValueAndValidity();
     
      control.get('operatorId').setValidators([Validators.required]);
      control.get('operatorId').updateValueAndValidity();
      
      control.get('fieldValue').setValidators([Validators.required]);
      control.get('fieldValue').updateValueAndValidity();
    }
    //if ((!this.resultForm.get('isEdit').value) && (this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '')  ) { 
    if (this.conditions.length < 1 || (this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '')) { 
     

      this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.resultsubModule, 0, false).subscribe((m: any) => {
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
              field_code: f.field_code
            }
          });
         


            control.get('fieldId').setValue(null);
            control.get('subModuleId').setValue(this.resultsubModule);
            control.get('operatorId').setValue(null);
            control.get('subModuleAlias').setValue(null);
            control.get('operators').setValue(null);
            control.get('fieldValue').setValue(null);
            control.get('fields').setValue(tableFields);
            control.get('subModuleAlias').setValue(tableFields[0].table_alias);
          
          //this.customFieldsList = m.data;
        } else {
          control.get('fields').setValue(null);
          control.get('fieldId').setValue(null);
          control.get('operatorId').setValue(null);
          control.get('subModuleAlias').setValue(null);
          control.get('operators').setValue(null);
          control.get('fieldValue').setValue(null);
          // this.customFieldsList = null;
        }

      });
    }
    this.addConditionModal.show();
     
    }
  
  buildResultwhereclause(resultFields = null) {
    let whereFieldGroup = this.fb.group({
      conditionId: [null],
      relationWithParent: [null],
      openingBrackets: "(",
      subModuleId: [null ],
      subModuleAlias: [null ],
      fieldId: [null ],
      fields: [],
      operatorId: [null],
      operators: [],
      
      fieldSelectList: [],
      picklistOption: [],
      
      fieldSecondValue: [null],
      closingBrackets: ")",
      isTime: [""],
      displayOrder: [0],
     
      fieldValue: [null], 
    });

    
    // console.log('whereFieldGroup', whereFieldGroup);
    return whereFieldGroup;
  }


  get conditions() {
    return this.resultForm.get('whereClauseFields') as FormArray;
  }
  addCondition(event) {
    this.conditions.push(this.buildResultwhereclause());
    this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value); 
    this.conditions.at(this.conditions.length - 1).get('fields').setValue(this.conditions.value[0].fields);
    this.addNewCondition.nativeElement.value = "Add";
   // // console.log('this.conditions.at', this.conditions.at(this.conditions.length - 1).get('relationWithParent').value)
  }
  onFieldChange(event, control, i) {

    control.get('subModuleId').setValue(this.resultsubModule);
    control.get('subModuleAlias').setValue(event.table_alias);
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
  removeCondition(conditionIndex: number) {
    alert(conditionIndex);
    this.conditions.removeAt(conditionIndex);

  }
  saveCondition() {
   

    if (this.resultForm.get('whereClauseFields').valid) {
      this.onConditionChange();
      this.addConditionModal.hide();
    }

    
  
  }
  onConditionChange() {

  
      let displayCondition = '';
    let databaseCondition = '';
    this.conditions.value.forEach((obj) => {

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
            if (obj.operatorId != null && (obj.operatorId.operator_display_name.includes('Is Null') || obj.operatorId.operator_display_name.includes('Is Not Null'))) {

              databaseCondition += `${obj.subModuleAlias}.[${fieldObj.PrimaryTableColumn}]`;

            }
            else if (fieldObj.dt_code.includes('text')) {
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

          if (obj.fieldId != null && fieldObj.actual_data_type != 'table') {
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
            } catch (ex) {  console.log(ex.message) }
          }
        }

        if (obj['closingBrackets'] != null) {
          displayCondition += obj['closingBrackets'] + ' ';
          databaseCondition += obj['closingBrackets'] + ' ';
        }
      });

      this.resultForm.patchValue({
        displayresultcondition: displayCondition,
        databaseresultCondition: databaseCondition
       

     
    });
  }
}
