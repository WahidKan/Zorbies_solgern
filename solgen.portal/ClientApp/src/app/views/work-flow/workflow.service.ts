import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'       
})
export class WorkflowService {

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
    return this.http.get(`${this.baseUri}Workflow/GetSubModuleEventList?subModuleId=${subModuleId}`);
  }

  getSubModules(moduleId,screenids,isDecision) {
    return this.http.get(`${this.baseUri}Workflow/GetSubModules?moduleId=${moduleId}&screenids=${screenids}&isDecision=${isDecision}`);
  }

  getRuleEngineVersionList(ruleId) {
    return this.http.get(`${this.baseUri}Workflow/GetRuleEngineVersionList?ruleId=${ruleId}`);
  }

  getSubModuleFields(subModuleName) {
    return this.http.get(`${this.moduleUri}/GetSubModuleFields?subModuleName=${subModuleName}`);
  }

  GetRuleTypeList() {
    return this.http.get(`${this.baseUri}Workflow/GetRuleTypeList`);
  }

  GetCustomFieldsListBySubModuleId(subModuleId: any, screenid: any, isdecision: boolean) {
    return this.http.get(`${this.baseUri}Workflow/GetCustomFieldBySubModuleId?subModuleId=${subModuleId}&screenid=${screenid}&isdecision=${isdecision}`);
  }

  checkNameExist(model: CheckFlowName) {
    return this.http.post(`${this.baseUri}Workflow/CheckRuleNameExist`, model);
  }

  addUpdateRuleEngine(data: any) {
    return this.http.post(`${this.baseUri}Workflow/AddUpdateRuleEngine`, data);
  }

  deleteFlow(id: any) {
    return this.http.get(this.baseUri + `Workflow/DeleteRule?ruleId=${id}`)
  }

  changeStatus(id: any) {
    return this.http.post(`${this.baseUri}Workflow/ChangeStatus/${id}`, null);
  }

  getDisplayOrder() {
    return this.http.get(`${this.baseUri}Workflow/GetDisplayOrder`);
  }

  deleteRules(ruleIds: string) {
    return this.http.get(this.baseUri + `Workflow/DeletedMultipleRules?ruleIds=${ruleIds}`)
  }

  GetCustomButtonDDLList(id: any, length: any, serchText: string): Observable<any> {
    return this.http.get(`${this.baseUri}Workflow/GetCustomButtonDDL?id=${id}&length=${length}&serchText=${serchText}`);
  }

  getCustomButtonDetailByFlowId(id: any) {
    return this.http.get(this.baseUri + `Workflow/GetCustomButtonDetailByFlowId?id=${id}`)
  }

  saveCustomButton(customButtonId: any, FlowId: any,) {
    let model = {
      Id: customButtonId,
      FlowId: FlowId,
    };
    // console.log('CustomButton',JSON.stringify(model));
    return this.http.post(this.baseUri + `Workflow/saveCustomButton`, model);
  }

  getLoanApplicationRuleList(loanApplicationId: number, eventCode: string) {
    return this.http.get(this.baseUri + `Workflow/GetLoanApplicationRuleList?loanApplicationId=${loanApplicationId}&eventCode=${eventCode}`)
  }

  executeRuleEngineTarget(loanApplicationId: number, eventCode: string, connectionId) {
    let model = {
      loanApplicationId: loanApplicationId,
      eventCode: eventCode,
      connectionId: connectionId
    };
    // console.log(model);
    return this.http.post(this.baseUri + `Workflow/ExecuteRuleEngineTarget`, model);
  }

  getScreenFormField(moduleId: any, subModuleId: any, formid: any) {
    return this.http.get(`${this.baseUri}Workflow/getScreenFormField?moduleId=${moduleId}&subModuleId=${subModuleId}&formid=${formid}`);
  }
  GetScreenFormsList(name: any, sortColumn: string, sortDir, page: number, pageSize: number, submoduleid: any, usedSreenid:any): Observable<any> {
    return this.http.get(`${this.baseUri}Workflow/GetScreenFormsList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&submoduleid=${submoduleid}&usedSreenid=${usedSreenid}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  buildType() {
    return this.fb.group({
      type: ['']
    })
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
      picklistOption:[],
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

        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression != 'in') {
          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldValue)[0]
        } else if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_display_name.includes('multiple')) {

          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });

          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));

        } else if (condition.fieldId.dt_code == 'date') {

          fieldValue = new Date(condition.fieldValue);

        } else {

          fieldValue = condition.fieldValue

        }

        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression == 'between') {
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
        fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
        picklistOption: [],
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

  buidConditiondecision(condition = null) {
    let conditiongroup = this.fb.group({
      conditionId: [null],
      relationWithParent: ['', null],
      openingBrackets: "(",
      subModuleId: ['', null],
      subModuleAlias: ['', null],
      fieldId: ['', null],
      fields: [''],
      operatorId: ['', null],
      operators: [''],
      //    isCalculate: [{ value: false, disabled: true }],
      fieldSelectList: [''],
      picklistOption: [],
      fieldValue: ['', null],
      fieldSecondValue: ['', null],
      closingBrackets: ")",
      isTime: [""],
      displayOrder: [0]
    });

    if (condition != null) {
      let fieldValue = null;
      let fieldSecondValue = null;
      if (typeof condition.fieldId !== 'undefined') {

        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression != 'in') {
          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldValue)[0]
        } else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_display_name.includes('multiple')) {

          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });

          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));

        } else if (condition.fieldId.dt_code == 'date') {

          fieldValue = new Date(condition.fieldValue);

        } else {

          fieldValue = condition.fieldValue

        }

        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression == 'between') {
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
        fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
        picklistOption: [],
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
  buidDecision(condition = null) {
    
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
      picklistOption: [],
      fieldValue: [null, Validators.required],
      fieldSecondValue: [null],
      closingBrackets: ")",
      isTime: [""],
      displayOrder: [0]
    });
   
    if (condition != null) {
      ;
      // console.log('conditionconditioncondition', condition)
      let fieldValue = null;
      let fieldSecondValue = null;  
      if (typeof condition.fieldId !== 'undefined') {         
        if ((condition.operatorId.operator_display_name == "Is Null" || condition.operatorId.operator_display_name == "Is Not Null") && condition.fieldId.dt_code != 'date' ) {
         // fieldValue = '';
          conditiongroup.controls['fieldValue'].clearValidators();
          conditiongroup.get('fieldValue').updateValueAndValidity();

        }  
        else if (((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression != 'in') {
          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldValue)[0]
        } else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_display_name.includes('multiple')) {

          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });

          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));

        } else if (condition.fieldId.dt_code == 'date') {

          fieldValue = new Date(condition.fieldValue);

        } else {

          fieldValue = condition.fieldValue 

        }
        //if (condition.operatorId.operator_display_name != "Is Null" || condition.operatorId.operator_display_name != "Is Not Null") {
        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression == 'between') {
            fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldSecondValue)[0]
          } else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
            fieldSecondValue = new Date(condition.fieldSecondValue);
          } else if (condition.operatorId.operator_expression == 'between') {
            fieldSecondValue = condition.fieldSecondValue
          }
       // }

      }
      
      conditiongroup.patchValue({
        conditionId: condition.conditionId,
        relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
        openingBrackets: condition.openingBrackets,
        subModuleId: condition.subModuleId,
        subModuleAlias: ((typeof condition.fieldId.table_alias !== 'undefined' ? condition.fieldId.table_alias: '')),
       // subModuleAlias: ((typeof condition.fieldId.table_alias !== 'undefined' ? condition.fieldId.table_alias: '')),
        fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
        fields: condition.fields,
        //fieldSelectList: (((typeof condition.fieldId !== 'undefined') || (condition.operatorId.operator_display_name != "Is Null" || condition.operatorId.operator_display_name != "Is Not Null")) && //(condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
        fieldSelectList: (((typeof condition.fieldId !== 'undefined') && (condition.operatorId.operator_display_name == "Is Null" && condition.operatorId.operator_display_name == "Is Not Null")) && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') ? JSON.parse(condition.fieldId.select_options) : []),
        operatorId: condition.operatorId,
        operators: condition.operators,
        // isCalculate: condition.isCalculated == 1 ? true : false,
        fieldValue: fieldValue,
        fieldSecondValue: fieldSecondValue,
        closingBrackets: condition.closingBrackets,
        isTime: condition.isTime,
      });
    }
    // console.log('conditiongroup', conditiongroup);
    return conditiongroup;
  }       
  buidDecisionCondition(condition = null) {
    let conditiongroup = this.fb.group({
      conditionId: [null],
      relationWithParent: ['', null],
      openingBrackets: "(",
      subModuleId: ['', null],
      subModuleAlias: ['', null],
      fieldId: ['', null],
      fields: [''],
      operatorId: ['', null],
      operators: [],
      //    isCalculate: [{ value: false, disabled: true }],
      fieldSelectList: [],
      fieldValue: ['', null],
      fieldSecondValue: ['', null],
      closingBrackets: ")",
      isTime: [""],
      displayOrder: [0]
    });

    if (condition != null) {
      let fieldValue = null;
      let fieldSecondValue = null;
      if (typeof condition.fieldId !== 'undefined') {

        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression != 'in') {
          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldValue)[0]
        } else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_display_name.includes('multiple')) {

          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });

          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));

        } else if (condition.fieldId.dt_code == 'date') {

          fieldValue = new Date(condition.fieldValue);

        } else {

          fieldValue = condition.fieldValue

        }

        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression == 'between') {
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
        fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') ? JSON.parse(condition.fieldId.select_options) : []),
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
        displayresultcondition: [''],
        databaseresultCondition: [''],
        tableFields: this.fb.array([this.buildResultTableField()]),
        whereClauseFields: this.fb.array([this.buidConditionResult()]),
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
        displayresultcondition: [result.displayresultcondition],
        databaseresultCondition: [result.databaseresultCondition],
        tableFields: this.fb.array([this.buildResultTableField()]),
        whereClauseFields: this.fb.array([this.buidConditionResult()]),
        isEdit: [true],
        displayOrder: [0]
      });

      ;

      if (result.action.code != 'validation') {
        resultGroup.get('subModuleId').setValidators([Validators.required]);
      }
      //while ((resultGroup.get('whereClauseFields') as FormArray).length != 0) {
      //  (resultGroup.get('whereClauseFields') as FormArray).removeAt(0);
      //}
      ;


      if (result.whereClauseFields) {
        result.whereClauseFields.forEach((m: any) => {
          // console.log('mwhereClauseFields', m);
          (resultGroup.get('whereClauseFields') as FormArray).push(this.buidConditionResult(m));

        });
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
      // console.log('resultGroupresultGroup', resultGroup);
      return resultGroup;
    }
  }
  buidConditionResult(condition = null) {

    let conditiongroup = this.fb.group({
      conditionId: [null],
      relationWithParent: [null],
      openingBrackets: "(",
      subModuleId: [null],
      subModuleAlias: [null],
      fieldId: [null],
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

    if (condition != null) {
      let fieldValue = null;
      let fieldSecondValue = null;
      if (typeof condition.fieldId !== 'undefined') {
        if ((condition.operatorId.operator_display_name == "Is Null" || condition.operatorId.operator_display_name == "Is Not Null") && condition.fieldId.dt_code != 'date') {
          // fieldValue = '';
          conditiongroup.controls['fieldValue'].clearValidators();
          conditiongroup.get('fieldValue').updateValueAndValidity();

        }  
        else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression != 'in') {
          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => m.value === condition.fieldValue)[0]
        } else if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_display_name.includes('multiple')) {

          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });

          fieldValue = JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));

        } else if (condition.fieldId.dt_code == 'date') {

          fieldValue = new Date(condition.fieldValue);

        } else {

          fieldValue = condition.fieldValue

        }

        if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression == 'between') {
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

        fieldSelectList: (((typeof condition.fieldId !== 'undefined') && (condition.operatorId.operator_display_name == "Is Null" && condition.operatorId.operator_display_name == "Is Not Null")) && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
      //  fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
        picklistOption: [],
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
      flowId: [null],
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
        flowId: resultCalculate.flowId,
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

  buildTarget(target = null, type = null) {
    
    if (target == null && type == null) {
      return this.fb.group({
        targetId: [''],
        addButton: false,
        isConditionAdded: false,
        isResultDecisionAdded: false,
        isDecisionScreenAdded: false,
        isDecisionAdded: [false],
        ScreenId: [''],
        ScreenName: [''],
        isScreenAdded: [false],
        type: [''],
        conditions: this.fb.array([this.buidCondition()]),
        decisions: this.fb.array([this.buidDecisionCondition()]),
        targetCondition: this.fb.group({
          targetId: [''],
          flowId: [''],
          statusId:1001,
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        targetDecision: this.fb.group({
          targetId: [''],
          flowId: [''],
          statusId: 1001,
          screenDecisionId: [''],
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        isResultAdded: [false],
        results: this.fb.array([]),
        displayOrder: [0]
      });
    }
    else if (target == null && type == 'decision') {
     
      return this.fb.group({
        targetId: [''],
        addButton: false,
        isConditionAdded: false,
        isResultDecisionAdded: false,
        isDecisionScreenAdded: false,
        isDecisionAdded: [false],
        ScreenId: [''],
        ScreenName: [''],
        isScreenAdded: [false],
        type: [''],
       // ddlStepDropdown:[null],
        conditions: this.fb.array([this.buidConditiondecision()]),
        decisions: this.fb.array([this.buidDecision()]),
        targetCondition: this.fb.group({
          targetId: [''],
          flowId: [''],
          statusId: 1001,
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        targetDecision: this.fb.group({
          targetId: [''],
          flowId: [''],
          screenDecisionId: [''],
          statusId: 1001,
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        //decisiontargets: this.fb.array([this.buildTarget()]),
        isResultAdded: [false],
        results: this.fb.array([]),
        displayOrder: [0]
      });
    }
    else if (target == null && type == 'screen') {
    
      return this.fb.group({
        targetId: [''],
        addButton: false,
        isConditionAdded: false,
        isResultDecisionAdded: false,
        isDecisionScreenAdded: false,
        isDecisionAdded: [false],
        ScreenId: [''],
        ScreenName: [''],
        isScreenAdded: [false],
        type: [''],
        conditions: this.fb.array([this.buidConditiondecision()]),
        decisions: this.fb.array([this.buidDecisionCondition()]),
        targetCondition: this.fb.group({
          targetId: [''],
          flowId: [''],
          statusId: 1001,
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        targetDecision: this.fb.group({
          targetId: [''],
          flowId: [''],
          statusId: 1001,
          screenDecisionId: [''],
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        isResultAdded: [false],
        results: this.fb.array([null]),       
        displayOrder: [0]
      });
    }
    else if (target != null && type == 'Screen') {
      let targetGroup = this.fb.group({
        addButton: true,
        targetId: [target.targetId],
        isConditionAdded: false,
        isResultDecisionAdded: false,
        isDecisionScreenAdded: false,
        isDecisionAdded: [false],       
        type: [target.type],
        ScreenId: [target.ScreenId],
        ScreenName: [target.ScreenName],
        isScreenAdded: [true],

        conditions: this.fb.array([this.buidConditiondecision()]),
        decisions: this.fb.array([this.buidDecisionCondition()]),
        targetCondition: this.fb.group({
          targetId: [''],
          flowId: [''],
          statusId: 1001,
          displayCondition: [''],
          database_condition: [''],
          rowId: ['']
        }),
        isResultAdded: true,
        results: this.fb.array([]),
        displayOrder: [0]
      });
      return targetGroup;
    }
    else if (target != null && type == 'decision') {
      let targetGroup = this.fb.group({
        targetId: target.targetId,       
        addButton: true,
        isConditionAdded: false,
        isResultDecisionAdded: false,
        isDecisionScreenAdded: false,
        isDecisionAdded: [true],
        type: [target.type],
        ScreenId: [target.ScreenId],
        ScreenName: [target.ScreenName],
        isScreenAdded: [false],
        //ddlStepDropdown: [null],
        conditions: this.fb.array([this.buidConditiondecision()]),
        decisions: this.fb.array([this.buidDecision()]),
        targetCondition: this.fb.group({
          targetId: [target.targetId],
          flowId: [target.flowId],
          statusId: 1001,
          displayCondition: [target.displayCondition],
          database_condition: [target.databaseCondition],
          rowId: [target.rowId]
        }),
        targetDecision: this.fb.group({
          targetId: [target.targetId],
          flowId: [target.flowId],
          screenDecisionId: [target.screenDecisionId],
          statusId: 1001,
          displayCondition: [target.displayDecision],
          database_condition: [target.databaseDecision],
          rowId: [target.rowId]
        }),
        //decisiontargets: this.fb.array([this.buildTarget()]),
        isResultAdded: [true],
        results: this.fb.array([]),
        displayOrder: [0]
      });

      //prepare condtion data
      const control = targetGroup.get('targetCondition') as FormArray;
      // console.log('cond control', control)
     
      var sb = control.get('displayCondition').value;
      if (sb != null && sb != null && sb != undefined) {
        
        while ((targetGroup.get('conditions') as FormArray).length != 0) {
          (targetGroup.get('conditions') as FormArray).removeAt(0);
        }

        target.conditions.forEach((m: any) => {
          (targetGroup.get('conditions') as FormArray).push(this.buidCondition(m));

        });        
      }
   
      while ((targetGroup.get('decisions') as FormArray).length != 0) {
        (targetGroup.get('decisions') as FormArray).removeAt(0);
      }

      target.Decisions.forEach((m: any) => {
        (targetGroup.get('decisions') as FormArray).push(this.buidDecision(m));
            
      });  
      while ((targetGroup.get('results') as FormArray).length != 0) {
        (targetGroup.get('results') as FormArray).removeAt(0);

      }

      if (typeof target.results != 'undefined') {
        target.results.forEach((m: any) => {
          (targetGroup.get('results') as FormArray).push(this.buidResult(m));
        });
      }
      // console.log(type, 'targetGroup', targetGroup)
      return targetGroup;
    }

    else {   
      let targetGroup = this.fb.group({   
        addButton: true,
        targetId: [target.targetId],
        isConditionAdded: true,
        isDecisionAdded: [false],
        isResultDecisionAdded: false,
        isDecisionScreenAdded: false,
        type: [target.type],
        ScreenId: [target.ScreenId],
        ScreenName: [target.ScreenName],
        isScreenAdded: [false],

        conditions: this.fb.array([this.buidCondition()]),
        decisions: this.fb.array([this.buidDecisionCondition()]),
        targetCondition: this.fb.group({
          targetId: [target.targetId],
          flowId: [target.flowId],
          statusId: 1001,
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
      //while ((targetGroup.get('decisions') as FormArray).length != 0) {
      //  (targetGroup.get('decisions') as FormArray).removeAt(0);
      //}

      //target.conditions.forEach((m: any) => {
      //  (targetGroup.get('conditions') as FormArray).push(this.buidCondition(m));

      //});

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

    return this.http.get(`${this.baseUri}Workflow/GetRuleList?name=${name}&loanproduct=${loanproduct}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
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

    return this.http.get(`${this.baseUri}Workflow/GetRuleSummaryList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
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

    return this.http.get(`${this.baseUri}Workflow/GetLoanApplicationListForApplyRule?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ruleId=${ruleId}&listFor=${listFor}`);
  }


  GetRuleEngineDetail(id: any) {
    return this.http.get(`${this.baseUri}Workflow/GetRuleDetailById?ruleId=${id}`);
  }

  ApplyRuleVersion(id: any, ApplicationIds: any) {
    let model = {
      RuleId: id,
      ApplicationIds: ApplicationIds
    };
    // console.log(model);
    return this.http.post(this.baseUri + `Workflow/ApplyRuleVersionToApplication`, model);
  }
}

export class CheckFlowName {
  FlowId: number;
  FlowName: string;

}

export class WorkFlow {
  ButtonName: string;
  ButtonCode: string;
  FlowId: number
}
