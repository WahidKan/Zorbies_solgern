import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormmasterService } from '../formmaster/formmaster.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { RuleEngineTargetComponent } from './component/rule-engine-target.component';

@Injectable({
  providedIn: 'root'
})
export class RuleEngineService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public loanProductUri = `${environment.WebApiBaseUrl}LoanProduct`;
  public moduleUri = `${environment.WebApiBaseUrl}Modules`;

  customFieldsList: any;
  pagedData: any;
  ruleInfo: any;
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  getLoanProducts(bankIds: string) {
    return this.http.get(`${this.loanProductUri}/GetLoanProducts?bankIds=${bankIds}`);
  }

  getSubModuleEventList(subModuleId: any) {
    return this.http.get(`${this.baseUri}RuleEngine/GetSubModuleEventList?subModuleId=${subModuleId}`);
  }

  getSubModules(moduleId) {
    return this.http.get(`${this.baseUri}RuleEngine/GetSubModules?moduleId=${moduleId}`);
  }

  getRuleEngineVersionList(ruleId) {
    return this.http.get(`${this.baseUri}RuleEngine/GetRuleEngineVersionList?ruleId=${ruleId}`);
  }

  getSubModuleFields(subModuleName) {
    return this.http.get(`${this.moduleUri}/GetSubModuleFields?subModuleName=${subModuleName}`);
  }

  GetRuleTypeList() {
    return this.http.get(`${this.baseUri}RuleEngine/GetRuleTypeList`);
  }

  GetCustomFieldsListBySubModuleId(subModuleId: any) {
    return this.http.get(`${this.baseUri}RuleEngine/GetCustomFieldBySubModuleId?subModuleId=${subModuleId}`);
  }

  checkNameExist(model: CheckRuleName) {
    return this.http.post(`${this.baseUri}RuleEngine/CheckRuleNameExist`, model);
  }

  addUpdateRuleEngine(data: any) {
    return this.http.post(`${this.baseUri}RuleEngine/AddUpdateRuleEngine`, data);
  }

  deleteRule(id: any) {
    return this.http.get(this.baseUri + `RuleEngine/DeleteRule?ruleId=${id}`)
  }

  changeStatus(id: any) {
    return this.http.post(`${this.baseUri}RuleEngine/ChangeStatus/${id}`, null);
  }

  getDisplayOrder() {
    return this.http.get(`${this.baseUri}RuleEngine/GetDisplayOrder`);
  }

  deleteRules(ruleIds: string) {
    return this.http.get(this.baseUri + `RuleEngine/DeletedMultipleRules?ruleIds=${ruleIds}`)
  }

  getLoanApplicationRuleList(loanApplicationId: number, eventCode: string) {
    return this.http.get(this.baseUri + `RuleEngine/GetLoanApplicationRuleList?loanApplicationId=${loanApplicationId}&eventCode=${eventCode}`)
  }

  executeRuleEngineTarget(loanApplicationId: number, eventCode: string, connectionId) {
    let model = {
      loanApplicationId: loanApplicationId,
      eventCode: eventCode,
      connectionId: connectionId
    };
    // console.log(model);
    return this.http.post(this.baseUri + `RuleEngine/ExecuteRuleEngineTarget`, model);
  }



  buidCondition(condition = null) {
    let conditiongroup = this.fb.group({
      conditionId: [null],
      relationWithParent: [null],
      openingBrackets: "(",
      subModuleId: [null, Validators.required],
      subModuleAlias: [null, Validators.required],
      fieldId: [null, Validators.required],
      fields: [],
      operatorId: [null, Validators.required],
      operators: [],
      //    isCalculate: [{ value: false, disabled: true }],
      fieldSelectList: [],
      fieldValue: [null, Validators.required],
      fieldSecondValue: [null],
      closingBrackets: ")",
      isTime: [""],
      displayOrder: [0]
    });

    if (condition != null) {
      let fieldValue = null;
      let fieldSecondValue = null;
      if (typeof condition.fieldId !== 'undefined') {

        if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_expression != 'in') {
          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldValue)[0]
        } else if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_display_name.includes('multiple')) {

          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });

          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));

        } else if (condition.fieldId.dt_code == 'date') {

          fieldValue = new Date(condition.fieldValue);

        } else {

          fieldValue = condition.fieldValue

        }

        if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_expression == 'between') {
          fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldSecondValue)[0]
        } else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
          fieldSecondValue = new Date(condition.fieldSecondValue);
        } else if (condition.operatorId.operator_expression == 'between') {
          fieldSecondValue = condition.fieldSecondValue
        }

      }
      conditiongroup.patchValue({
        conditionId: condition.conditionId,
        relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
        openingBrackets: condition.openingBrackets,
        subModuleId: condition.subModuleId,
        subModuleAlias: ((typeof condition.subModuleAlias !== 'undefined' ? condition.subModuleAlias : '')),
        fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
        fields: condition.fields,
        fieldSelectList: (typeof condition.fieldId !== 'undefined' && condition.fieldId.dt_code == 'select' ? JSON.parse(condition.fieldId.select_options) : []),
        operatorId: condition.operatorId,
        operators: condition.operators,
        // isCalculate: condition.isCalculated == 1 ? true : false,
        fieldValue: fieldValue,
        fieldSecondValue: fieldSecondValue,
        closingBrackets: condition.closingBrackets,
        isTime: condition.isTime,
      });
    }
    return conditiongroup;
  }

  buidResult(result = null) {

    if (result == null) {
      return this.fb.group({
        resultId: [null],
        name: [null, Validators.required],
        action: [null, Validators.required],
        actionId: [null, Validators.required],
        subModuleId: [null],
        fieldList: [null],
        resultCondition: [null],
        tableFields: this.fb.array([this.buildResultTableField()]),
        isEdit: [false]
      });
    } else {
      let resultGroup = this.fb.group({
        resultId: [result.ruleTargetResultId],
        name: [result.name, Validators.required],
        action: [result.action, Validators.required],
        actionId: [result.actionId, Validators.required],
        subModuleId: [result.subModuleId],
        fieldList: [result.fields],
        resultCondition: [result.resultCondition],
        tableFields: this.fb.array([this.buildResultTableField()]),
        isEdit: [true],
        displayOrder: [0]
      });

      if (result.action.code != 'validation') {
        resultGroup.get('subModuleId').setValidators([Validators.required]);
      }

      //prepare condtion data
      while ((resultGroup.get('tableFields') as FormArray).length != 0) {
        (resultGroup.get('tableFields') as FormArray).removeAt(0);

      }
      if (result.tableFields) {
        result.tableFields.forEach((m: any) => {
          (resultGroup.get('tableFields') as FormArray).push(this.buildResultTableField(m));
        });
      }
      return resultGroup;
    }
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
      resultCalculation: this.fb.array([this.buildResultCalculation()])
    });

    if (tableField != null) {
      let fieldValue = null;

      if (tableField.fieldId) {
        if (tableField.fieldId.dt_code == 'select') {
          fieldValue = JSON.parse(tableField.fieldId.select_options).filter(m => m.value === tableField.fieldValue)[0]
        } else if (tableField.fieldId.dt_code == 'date') {
          fieldValue = new Date(tableField.fieldValue);
        } else {
          fieldValue = tableField.fieldValue
        }
      }
      else {
        if (typeof tableField.name !== 'undefined') {
          if (tableField.name == 'CompanyId') {
            fieldValue = 't34.CompanyId';
          } else if (tableField.name == 'StatusId') {
            fieldValue = 't34.StatusId'
          } else if (tableField.name == 'LoanApplicationId') {
            fieldValue = 't34.Id'
          } else {
            fieldValue = tableField.fieldValue
          }
        } else {
          fieldValue = tableField.fieldValue
        }
      }

      tableFieldGroup.patchValue({
        RuleTargetResultConditionId: (typeof tableField.ruleTargetResultConditionId !== 'undefined' ? tableField.ruleTargetResultConditionId : null),
        RuleTargetId: (typeof tableField.ruleTargetId !== 'undefined' ? tableField.ruleTargetId : null),
        fieldId: (typeof tableField.fieldId !== 'undefined' ? tableField.fieldId : tableField),
        name: (typeof tableField.name !== 'undefined' ? tableField.name : ''),
        fieldSelectList: ((typeof tableField.fieldId !== 'undefined' && tableField.fieldId.dt_code == 'select') ? JSON.parse(tableField.fieldId.select_options) : []),
        displayName: (typeof tableField.label !== 'undefined' ? tableField.label : ''),
        dataType: (typeof tableField.dataType !== 'undefined' ? tableField.dataType : typeof tableField.actual_data_type !== 'undefined' ? tableField.actual_data_type : ''),
        isCalculate: tableField.isCalculated == 1 ? true : false,
        fieldValue: fieldValue,
        fieldDisplayValue: (typeof tableField.fieldDisplayValue !== 'undefined' ? tableField.fieldDisplayValue : null)
      });

      if (tableField.isCalculated == 1) {
        tableFieldGroup.get('isCalculate').enable();
      }

    }


    //prepare condtion data
    while ((tableFieldGroup.get('resultCalculation') as FormArray).length != 0) {
      (tableFieldGroup.get('resultCalculation') as FormArray).removeAt(0);

    }

    if (tableField) {
      if (tableField.resultCalculation) {
        tableField.resultCalculation.forEach((m: any) => {
          (tableFieldGroup.get('resultCalculation') as FormArray).push(this.buildResultCalculation(m));
        });
      }
    }

    return tableFieldGroup;
  }

  buildResultCalculation(resultCalculate = null) {
    let resultCalculation = this.fb.group({
      ruleTargetResultConditionCalculationID: [''],
      ruleId: [null],
      ruleTargetId: [null],
      ruleTargetResultId: [null],
      ruleTargetResultConditionId: [null],
      formulaId: [],
      openingBrackets: ['('],
      firstFieldSectionId: [null],
      firstFields: [null],
      firstFieldId: [null],
      firstFieldValue: [null],
      secondFieldSectionId: [null],
      secondFields: [null],
      secondFieldId: [null],
      secondFieldValue: [null],
      datePart: [null],
      operatorId: [null],
      closingBrackets: [')']
    });

    if (resultCalculate != null) {
      resultCalculation.patchValue({
        ruleTargetResultConditionCalculationID: resultCalculate.ruleTargetResultConditionCalculationID,
        ruleId: resultCalculate.ruleId,
        ruleTargetId: resultCalculate.ruleTargetId,
        ruleTargetResultId: resultCalculate.ruleTargetResultId,
        formulaId: (typeof resultCalculate.formulaId !== 'undefined' ? resultCalculate.formulaId : null),
        ruleTargetResultConditionId: resultCalculate.ruleTargetResultConditionId,
        openingBrackets: resultCalculate.openingBrackets,
        firstFieldSectionId: (typeof resultCalculate.firstFieldSectionId === 'undefined' ? null : resultCalculate.firstFieldSectionId),
        firstFields: (typeof resultCalculate.firstFields === 'undefined' ? null : resultCalculate.firstFields),
        firstFieldId: (typeof resultCalculate.firstFieldId === 'undefined' ? null : resultCalculate.firstFieldId),
        firstFieldValue: (typeof resultCalculate.firstFieldValue === 'undefined' ? null : resultCalculate.firstFieldValue),
        secondFieldSectionId: (typeof resultCalculate.secondFieldSectionId === 'undefined' ? null : resultCalculate.secondFieldSectionId),
        secondFields: (typeof resultCalculate.secondFields === 'undefined' ? null : resultCalculate.secondFields),
        secondFieldId: (typeof resultCalculate.secondFieldId === 'undefined' ? null : resultCalculate.secondFieldId),
        secondFieldValue: (typeof resultCalculate.secondFieldValue === 'undefined' ? null : resultCalculate.secondFieldValue),
        datePart: (typeof resultCalculate.datePart === 'undefined' ? null : resultCalculate.datePart),
        operatorId: (typeof resultCalculate.operatorId === 'undefined' ? null : resultCalculate.operatorId),
        closingBrackets: resultCalculate.closingBrackets
      });

    }

    return resultCalculation;
  }

  buildTarget(target = null) {
    if (target == null) {
      return this.fb.group({
        targetId: [''],
        isConditionAdded: [false],
        conditions: this.fb.array([this.buidCondition()]),
        targetCondition: this.fb.group({
          targetId: [''],
          ruleId: [''],
          statusId: [''],
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        isResultAdded: [false],
        results: this.fb.array([], Validators.required),
        displayOrder: [0]
      });
    } else {
      let targetGroup = this.fb.group({
        targetId: [target.targetId],
        isConditionAdded: true,
        conditions: this.fb.array([this.buidCondition()]),
        targetCondition: this.fb.group({
          targetId: [target.targetId],
          ruleId: [target.ruleId],
          statusId: [target.statusId],
          displayCondition: [target.displayCondition],
          database_condition: [target.databaseCondition],
          rowId: [target.rowId]
        }),
        isResultAdded: true,
        results: this.fb.array([]),
        displayOrder: [0]
      });

      //prepare condtion data
      while ((targetGroup.get('conditions') as FormArray).length != 0) {
        (targetGroup.get('conditions') as FormArray).removeAt(0);
      }

      target.conditions.forEach((m: any) => {
        (targetGroup.get('conditions') as FormArray).push(this.buidCondition(m));

      });

      //prepare result data
      while ((targetGroup.get('results') as FormArray).length != 0) {
        (targetGroup.get('results') as FormArray).removeAt(0);

      }

      if (typeof target.results != 'undefined') {
        target.results.forEach((m: any) => {
          (targetGroup.get('results') as FormArray).push(this.buidResult(m));
        });
      }

      return targetGroup;
    }
  }


  getRuleList(name: any, loanproduct: any, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {

    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}RuleEngine/GetRuleList?name=${name}&loanproduct=${loanproduct}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getRuleSummaryList(name: any, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {

    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}RuleEngine/GetRuleSummaryList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getLoanApplicationListForApplyRule(name: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: number, batchId: number, ruleId: number, listFor: string): Observable<any> {

    //if (typeof name == "undefined" || name == null) { name = null; }
    //else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}RuleEngine/GetLoanApplicationListForApplyRule?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ruleId=${ruleId}&listFor=${listFor}`);
  }


  GetRuleEngineDetail(id: any) {
    return this.http.get(`${this.baseUri}RuleEngine/GetRuleDetailById?ruleId=${id}`);
  }

  ApplyRuleVersion(id: any, ApplicationIds: any) {
    let model = {
      RuleId: id,
      ApplicationIds: ApplicationIds
    };
    // console.log(model);
    return this.http.post(this.baseUri + `RuleEngine/ApplyRuleVersionToApplication`, model);
  }
}

export class CheckRuleName {
  RuleId: number;
  RuleName: string;

}
