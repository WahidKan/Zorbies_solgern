import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { RuleEngineService } from '../rule-engine.service';
import { CommonService } from '../../shared/common.service';
import { ModalDirective } from 'ngx-bootstrap/modal'; 


@Component({
  selector: 'rule-engine-result',
  templateUrl: './rule-engine-result.component.html'
})
export class RuleEngineResultComponent implements OnInit, OnChanges {
   

  @Input() target: FormGroup;
  @Input() ruleEngineForm: FormGroup;
  resultForm: FormGroup; 
  resultActionList: any[];
  editIndex: number = -1;
  @ViewChild('addResult', { static: false }) addResultModel: ModalDirective;
  tableList: any[];
  tempTableList: any[];
  moduleId: string = '';
  constructor(private fb: FormBuilder,
    private ruleEngineService: RuleEngineService,
    private commonService: CommonService) { }

  ngOnChanges() {
    this.moduleId = this.ruleEngineForm.get('moduleId').value.value;    
    this.getSubModules();
   
  }

  ngOnInit() {
    this.initForm();    
    this.clearTableFields();
    this.getResultActions();
    
  }

  onActionChange(event) {
   
    this.clearTableFields();
    if (typeof event !== 'undefined') {
      this.resultForm.get('actionId').setValue(event.resultActionId);
      this.resultForm.get('subModuleId').setValue(null);
      this.prepareActionChangeContent(event.code,true);
    }
   
  }

  prepareActionChangeContent(code: string, onChange = false) {
   
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

    this.commonService.getResultActions().subscribe((m: any[]) => {      
      this.resultActionList = m;
    });
  }

  getSubModules() {
   
    this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value).subscribe((m: any[]) => {      
      this.tableList = m.filter(a => a.module_name_code != 'loanproduct' && a.module_name_code != 'loanapplication');      
    });
    
  }

  showResultModal() {
  
    this.editIndex = -1;
    this.addResultModel.show();
    this.resetResultForm();
  }

  hideResultModal() {
 
    this.addResultModel.hide();
  }

  //fetch section field list
  getSubModuleFields(subModule) {
 
    let currentPage = this;
    this.clearTableFields();
    if (subModule) {
      this.ruleEngineService.GetCustomFieldsListBySubModuleId(subModule.sub_module_id).subscribe((m:any) => {        
        if (m) {
          let tableFiledList = m.data.map(f => {
            return {
              PrimaryTableColumn: f.PrimaryTableColumn,
              actual_data_type: f.actual_data_type,
              display_name: f.display_name,
              form_field_id: f.form_field_id,
              dt_code: f.dt_code,
              name:f.name,
              select_options: f.select_options,
              table_name: f.table_name,
              table_alias:f.table_alias
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
      tableFields: this.fb.array([this.buildResultTableField()]),
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
   
    this.editIndex = index;
    let editResultForm = this.results.at(this.editIndex) as FormGroup;
    let formValue = editResultForm;
    this.resultForm = formValue;
    
    this.resultForm.get('isEdit').setValue(true);
    this.prepareActionChangeContent(editResultForm.get('action').value.code);
    
    this.addResultModel.show();
  }

  saveResult() {
  
    if ((this.resultForm.get('isEdit').value == null || this.resultForm.get('isEdit').value == false) && this.resultForm.valid) {
      this.prepareQuery(this.resultForm);
      this.results.push(this.resultForm);
      this.addResultModel.hide();
      this.target.get('isResultAdded').setValue(true);
      
    } else if (this.resultForm.get('isEdit').value == true && this.resultForm.valid) {     
      this.results.removeAt(this.editIndex);
      this.prepareQuery(this.resultForm);
      this.results.insert(this.editIndex,this.resultForm);
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

        columns +=`${obj.name}${comma}`;
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
   
    let query = 'update ' + tableName +' set ';
   
    this.resultForm.value.tableFields.forEach((obj, index) => {

      let comma = '';
      if (this.resultForm.value.tableFields.length != (index + 1)) {
        comma = ', ';
      }
      // console.log('obj: ',obj);

      if (obj.fieldId.dt_code == 'select') {

        query += `${tableName}.${obj.fieldId.name}='${obj.fieldValue.value}'${comma}`;
      } else if (obj.dataType.includes('char')) {

        query += `${tableName}.${obj.fieldId.name}='${obj.fieldValue}'${comma}`;
      } else if (obj.dataType.includes('decimal') || obj.dataType.includes('int') || obj.dataType.includes('bigint')) {
        query += `${tableName}.${obj.fieldId.name}=${obj.fieldValue}${comma}`;
      } else if (obj.dataType.includes('bit')) {

        query += `${tableName}.${obj.fieldId.name}=${(obj.fieldValue === true ? 1 : 0)}${comma}`;
      } else if (obj.dataType.includes('date') && obj.isCalculate == false) {
        query += `${tableName}.${obj.fieldId.name}='${obj.fieldValue}'${comma}`;
      } else if (obj.dataType.includes('date') && obj.isCalculate == true) {
      
        if (obj.fieldValue == null) {
          obj.fieldValue = obj.fieldDisplayValue
        }
        query += `${tableName}.${obj.fieldId.name}=${obj.fieldValue}${comma}`;
      }

    });
    this.resultForm.get('resultCondition').setValue(query);
 
  }
}
