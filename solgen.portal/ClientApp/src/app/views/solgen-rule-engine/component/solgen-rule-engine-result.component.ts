import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SolgenRuleEngine, SolgenRuleEngineService, SolgenRuleResult, SolgenRuleTarget } from '../solgen-rule-engine.service';

@Component({
  selector: 'app-solgen-rule-engine-result',
  templateUrl: './solgen-rule-engine-result.component.html',
})
export class SolgenRuleEngineResultComponent implements OnInit, OnChanges {

  @Input() target: FormGroup;
  @Input() ruleEngineForm: FormGroup;
  @Input() customFieldsList: any;
  @Input() vwRuleId: any;
  resultForm: FormGroup;
  resultActionList: any[];
  editIndex: number = -1;
  @ViewChild('addResult', { static: false }) addResultModel: ModalDirective;
  tableList: any[];
  tempTableList: any[];
  moduleId: string = '';
  objectName = 'queue';
  constructor(private fb: FormBuilder,
    private ruleEngineService: SolgenRuleEngineService,
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
      this.prepareActionChangeContent(event.code, true);
    }
  }
  prepareActionChangeContent(code: string, onChange = false) {
    if (code == 'validation') {
      if (onChange) {
        this.resultForm.get('resultCondition').setValue(null);
      }

      this.resultForm.get('resultCondition').setValidators([Validators.required]);
      this.resultForm.get('resultCondition').updateValueAndValidity();
    } else {

      if (onChange) {
        this.resultForm.get('resultCondition').setValue(null);
      }

      this.resultForm.get('resultCondition').clearValidators();
      this.resultForm.get('resultCondition').updateValueAndValidity();
    }
    if (code === 'create') {
      this.tempTableList = this.tableList;
      this.tableList = this.tableList.filter(m => m.module_name_code == 'LoanApplicationRequiredDocument');
    } else {
      if (this.tempTableList) {
        this.tableList = this.tempTableList;
      }
    }
    this.resultForm.get('subModuleId').setValue(this.ruleEngineForm.get('subModuleId').value.sub_module_id);
  }

  getResultActions() {
    this.commonService.getLeadResultActions(this.objectName).subscribe((m: any[]) => {
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
    // console.log('called from result componnet');
    this.resultForm = this.ruleEngineService.buidResult();
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
      fieldDisplayValue: [null],
      fieldValue: [null, Validators.required],
      showPopUpModal: [false],
      conditions: [],
      conditionsId: [null, Validators.required],
      customFormula:this.ruleEngineService.buildFormulaCondition(),
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
      this.target.get('isResultAdded').setValue(true);
      this.hideResultModal();
    } else if (this.resultForm.get('isEdit').value == true && this.resultForm.valid) {
      this.results.removeAt(this.editIndex);
      this.prepareQuery(this.resultForm);
      this.results.insert(this.editIndex, this.resultForm);
      this.target.get('isResultAdded').setValue(true);
      this.hideResultModal();
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
    let actionName = result.get('action').value.code;
    if (actionName == 'create') {
      this.ruleEngineService.buildConditionResultCreateQuery(this.resultForm);
    } else if (actionName == 'update') {
      this.ruleEngineService.buildConditionResultUpdateQuery(this.resultForm);
    }
  }
}
