import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs-compat/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolgenQueueService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public solgenQueueUri = `${environment.WebApiBaseUrl}SolgenQueue`;
  public moduleUri = `${environment.WebApiBaseUrl}Modules`;
  customFieldsList: any;
  pagedData: any;
  queueInfo: any;
  ConditionsOperatorsList: any = [{ name: 'Is Value', value: '1' }, { name: 'Is Value From', value: '2' }, { name: 'Is Calculate', value: '3' }, { name: 'Formula', value: '4' }];
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  GetQueuesList(filter : string,sortColumn: string, sortDir: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.solgenQueueUri}/GetSolgenQueuesList?filter=${filter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageNo=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  DeleteSingleQueue(id: any) {
    return this.http.get(this.solgenQueueUri + `/DeleteSolgenQueue?queueId=${id}`)
  }
  DeleteMultipleQueues(queueIds: string) {
    return this.http.get(this.solgenQueueUri + `/DeletedMultipleSolgenQueues?queueIds=${queueIds}`)
  }
  GetSolgenQueueDetail(id: any) {
    return this.http.get(`${this.solgenQueueUri}/GetSolgenQueueDetailById?queueId=${id}`);
  }
  GetQueueFormulaList(params): Observable<any> {
    return this.http.get(`${this.solgenQueueUri}/GetSolgenQueueList`, {
      params: {
        filter: params.filter,
        sortColumn: params.sortColumn,
        sortDir: params.sortDir,
        page: params.page,
        pageSize: params.pageSize,
      },
    });
  }
  getSubModuleEventList(subModuleId: any) {
    return this.http.get(`${this.solgenQueueUri}/GetSolgenSubModuleEventList?subModuleId=${subModuleId}`);
  }

  getSubModules() {
    return this.http.get(`${this.solgenQueueUri}/GetSolgenSubModules`);
  }

  getSubModuleFields(subModuleName) {
    return this.http.get(`${this.moduleUri}/GetSolgenQueueSubModuleFields?subModuleName=${subModuleName}`);
  }

  GetCustomFieldsListBySubModuleId(moduleId: any, subModuleId: any) {
    return this.http.get(`${this.solgenQueueUri}/GetSolgenCustomFieldBySubModuleId?moduleId=${moduleId}&subModuleId=${subModuleId}`);
  }

  checkNameExist(model: CheckQueueName) {
    return this.http.post(`${this.solgenQueueUri}/CheckSolgenQueueNameExist`, model);
  }
  addUpdateSolgenQueue(data: any) {
    return this.http.post(`${this.solgenQueueUri}/AddUpdateSolgenQueue`, data);
  }
  changeStatus(id: any) {
    return this.http.post(`${this.solgenQueueUri}/ChangeSolgenQueueStatus/${id}`, null);
  }
  getDisplayOrder() {
    return this.http.get(`${this.solgenQueueUri}/GetSolgenQueueDisplayOrder`);
  }
  executeSolgenQueueTarget(loanApplicationId: number, eventCode: string, connectionId) {
    let model = {
      loanApplicationId: loanApplicationId,
      eventCode: eventCode,
      connectionId: connectionId
    };
    // console.log(model);
    return this.http.post(this.solgenQueueUri + `/ExecuteQueueTarget`, model);
  }

  sortConditionOperatoers(dt_code) {
    if (dt_code == 'text' || dt_code == 'textbox' || dt_code == 'textarea' || dt_code == 'select' || dt_code == 'map_search'
      || dt_code == 'date' || dt_code == 'datetime' || dt_code == 'checkbox' || dt_code == 'radio' || dt_code == 'boolean' || dt_code == 'image') {
      return [{ name: 'Is Value', value: '1' }, { name: 'Is Value From', value: '2' }, { name: 'Formula', value: '4' }];
    } else if (dt_code == 'bigint' || dt_code == 'int' || dt_code == 'number' || dt_code == 'decimal') {
      return [{ name: 'Is Value', value: '1' }, { name: 'Is Value From', value: '2' }, { name: 'Is Calculate', value: '3' }, { name: 'Formula', value: '4' }];
    }
  }
  sortFormulaConditionOperatoers(dt_code) {
    if (dt_code == 'text' || dt_code == 'textbox' || dt_code == 'textarea' || dt_code == 'select' || dt_code == 'map_search'
      || dt_code == 'date' || dt_code == 'datetime' || dt_code == 'checkbox' || dt_code == 'radio' || dt_code == 'boolean' || dt_code == 'image') {
      return [{ name: 'Is Value', value: '1' }, { name: 'Is Value From', value: '2' }];
    } else if (dt_code == 'bigint' || dt_code == 'int' || dt_code == 'number' || dt_code == 'decimal') {
      return [{ name: 'Is Value', value: '1' }, { name: 'Is Value From', value: '2' }];
    }
  }
  buildTargetResultConditionRelatedFormulaDatabaseString(condition,resultform){
    let databaseCondition = 'CASE WHEN ';
    let tempDBCondition = "";
    let column = "";
      const fieldObj = condition.fieldId;
      const dtOperator = condition.operatorId;
      const comparisionOperator = condition.conditionsId;
      let fieldValue = condition.fieldValue;
      let operatorExpression = '';
      if (condition.openingBrackets != null) {
        databaseCondition += condition.openingBrackets;
      }
      if (fieldObj) {
        if (fieldObj.actual_data_type != 'table') {
          column = `t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn}`;
          if (fieldObj.dt_code.includes('text') || fieldObj.dt_code.includes('select')) {
            tempDBCondition = `isnull(t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn},'0')`;
          }
          else if (fieldObj.dt_code.includes('bigint') || fieldObj.dt_code.includes('int') || fieldObj.dt_code.includes('decimal') || fieldObj.dt_code.includes('boolean')) {
            tempDBCondition = `isnull(t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn},0)`;
          }
          else {
            tempDBCondition = `t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn}`;
          }
        }
      }
      if (dtOperator) {
        operatorExpression = dtOperator.operator_expression.toUpperCase();
        if (operatorExpression.toUpperCase() == "(IS NULL OR EMPTY)") {
          databaseCondition += `${column} IS NULL OR RTRIM(LTRIM(${column})) = ''`;
        } else if (operatorExpression.toUpperCase() == "(IS NOT NULL OR NOT EMPTY)") {
          databaseCondition += `${column} IS NOT NULL OR RTRIM(LTRIM(${column})) <> ''`;
        }
        else {
          databaseCondition += tempDBCondition;
          databaseCondition += ` ${dtOperator.operator_expression}`;
        }
      }
      if (comparisionOperator && comparisionOperator.value == '1' && fieldValue) { // is value==1
        if (fieldObj && fieldObj.dt_code == 'select') {
          if (operatorExpression == 'LIKE') {
            databaseCondition += " '%" + fieldValue.value + "%'";
          }else if(operatorExpression == 'IN'){
            databaseCondition += " (" + fieldValue.map(m => { return `'${m.value}'`; }).join() + ")";
          }else {
            databaseCondition += ` '${fieldValue.value}'`;
          }
        } else if (fieldObj && fieldObj.dt_code == 'text') {
          var re = /'/gi;
          let fieldValueNew = fieldValue.replace(re, "''");
          fieldValue = fieldValueNew;
          if (operatorExpression == 'LIKE') {
            databaseCondition += " '%" + fieldValue + "%'";
          }else if(operatorExpression == 'IN'){
            let value = fieldValue.split(',');
            databaseCondition += " (" + value.map(m => { return `'${m}'`; }).join() + ")";
          }else{
            databaseCondition += ` '${fieldValue}'`;
          }
        } else if (fieldObj && (fieldObj.dt_code == 'bigint' || fieldObj.dt_code == 'decimal')) {
          if (operatorExpression == 'LIKE') {
            databaseCondition += " %" + fieldValue + "%";
          }else if(operatorExpression == 'IN'){
            let value = fieldValue.split(',');
            databaseCondition += " (" + value.map(m => { return `${m}`; }).join() + ")";
          }else{
            databaseCondition += ` ${fieldValue}`;
          }
        } else if (fieldObj && fieldObj.dt_code == 'date') {
          databaseCondition += " '" + new Date(fieldValue).toLocaleDateString() + "'";
        } else if (fieldObj && fieldObj.dt_code == 'boolean') {
          databaseCondition += ' ' + (fieldValue == true ? 1 : 0);
        }else{
          databaseCondition += ` '${fieldValue}'`;
        }
      } else if (comparisionOperator && comparisionOperator.value == '2' && fieldValue) {
          if (operatorExpression == 'LIKE') {
            databaseCondition += " '%'+" + `t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}` + "+'%'";
          }else if(operatorExpression == 'IN'){
            databaseCondition += " (" + fieldValue.map(m => { return `t${m.sub_module_id}.${m.PrimaryTableColumn}`; }).join() + ")";
          }else {
            databaseCondition += ` t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}`;
          }
      } else if (comparisionOperator && comparisionOperator.value == '3' && fieldValue){
        databaseCondition += ` ${fieldValue}`;
      }
      else {
        databaseCondition += ` '${fieldValue}'`;
      }
      if (condition.closingBrackets!= null) {
        databaseCondition += condition.closingBrackets + ' ';
      }
      databaseCondition +=  ' THEN ';
        if(condition.ifBodyConditionOperator !=null && condition.ifBodyConditionOperator.value == '2' && condition.ifBodyFieldValue){
          databaseCondition += `t${condition.ifBodyFieldValue.sub_module_id}.${condition.ifBodyFieldValue.PrimaryTableColumn}`;
        }else{
          databaseCondition += `'${condition.ifBodyFieldValue}'`;
        }
        databaseCondition +=  ' ELSE ';
        if(condition.elseBodyConditionOperator !=null && condition.elseBodyConditionOperator.value == '2' && condition.elseBodyFieldValue){
          databaseCondition += `t${condition.elseBodyFieldValue.sub_module_id}.${condition.elseBodyFieldValue.PrimaryTableColumn}`;
        }else{
          databaseCondition += `'${condition.elseBodyFieldValue}'`;
      }
      databaseCondition +=  ' END ';
      resultform.get('fieldValue').setValue(databaseCondition);

  }
  buildTargetConditionDatabaseString(conditions: any[],targetForm) {
    let displayCondition = '';
    let databaseCondition = '';
    let tempDBCondition = "";
    let column = "";
    conditions.forEach((condition, index) => {
      const fieldObj = condition.fieldId;
      const dtOperator = condition.operatorId;
      const comparisionOperator = condition.conditionsId;
      let fieldValue = condition.fieldValue;
      let operatorExpression = '';
      if (condition.relationWithParent != null) {
        displayCondition += ` ${condition.relationWithParent.toLowerCase()} `;
        databaseCondition += ` ${condition.relationWithParent.toLowerCase()} `;
      }
      if (condition.openingBrackets != null) {
        displayCondition += condition.openingBrackets;
        databaseCondition += condition.openingBrackets;
      }
      if (fieldObj) {
        displayCondition += fieldObj.name;
        if (fieldObj.actual_data_type != 'table') {
          column = `t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn}`;
          if (fieldObj.dt_code.includes('text') || fieldObj.dt_code.includes('select')) {
            tempDBCondition = `isnull(t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn},'0')`;
          }
          else if (fieldObj.dt_code.includes('bigint') || fieldObj.dt_code.includes('int') || fieldObj.dt_code.includes('decimal') || fieldObj.dt_code.includes('boolean')) {
            tempDBCondition = `isnull(t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn},0)`;
          }
          else {
            tempDBCondition = `t${fieldObj.sub_module_id}.${fieldObj.PrimaryTableColumn}`;
          }
        }
      }
      if (dtOperator) {
        operatorExpression = dtOperator.operator_expression.toUpperCase();
        if (operatorExpression.toUpperCase() == "(IS NULL OR EMPTY)") {
          databaseCondition += `${column} IS NULL OR RTRIM(LTRIM(${column})) = ''`;
          displayCondition += `  ${dtOperator.operator_display_name}`;
        } else if (operatorExpression.toUpperCase() == "(IS NOT NULL OR NOT EMPTY)") {
          databaseCondition += `${column} IS NOT NULL OR RTRIM(LTRIM(${column})) <> ''`;
          displayCondition += `  ${dtOperator.operator_display_name}`;
        }
        else {
          databaseCondition += tempDBCondition;
          databaseCondition += ` ${dtOperator.operator_expression}`;
          displayCondition += `  ${dtOperator.operator_display_name}`;
        }
      }
      if (comparisionOperator && comparisionOperator.value == '1' && fieldValue) { // is value==1
        if (fieldObj && fieldObj.dt_code == 'select') {
          if (operatorExpression == 'LIKE') {
            displayCondition += ` '${fieldValue.name}'`;
            databaseCondition += " '%" + fieldValue.value + "%'";
          }else if(operatorExpression == 'IN'){
            displayCondition += " (" + fieldValue.map(m => { return `'${m.name}'`; }).join() + ")";
            databaseCondition += " (" + fieldValue.map(m => { return `'${m.value}'`; }).join() + ")";
          }else {
            displayCondition += ` '${fieldValue.name}'`;
            databaseCondition += ` '${fieldValue.value}'`;
          }
        } else if (fieldObj && fieldObj.dt_code == 'text') {
          var re = /'/gi;
          let fieldValueNew = fieldValue.replace(re, "''");
          fieldValue = fieldValueNew;
          if (operatorExpression == 'LIKE') {
            displayCondition += ` '${fieldValue}'`;
            databaseCondition += " '%" + fieldValue + "%'";
          }else if(operatorExpression == 'IN'){
            let value = fieldValue.split(',');
            displayCondition += " (" + value.map(m => { return `'${m}'`; }).join() + ")";
            databaseCondition += " (" + value.map(m => { return `'${m}'`; }).join() + ")";
          }else{
            displayCondition += ` '${fieldValue}'`;
            databaseCondition += ` '${fieldValue}'`;
          }
        } else if (fieldObj && (fieldObj.dt_code == 'bigint' || fieldObj.dt_code == 'decimal')) {
          if (operatorExpression == 'LIKE') {
            displayCondition += ` ${fieldValue}`;
            databaseCondition += " %" + fieldValue + "%";
          }else if(operatorExpression == 'IN'){
            let value = fieldValue.split(',');
            displayCondition += " (" + value.map(m => { return `${m}`; }).join() + ")";
            databaseCondition += " (" + value.map(m => { return `${m}`; }).join() + ")";
          }else{
            displayCondition += ` ${fieldValue}`;
            databaseCondition += ` ${fieldValue}`;
          }
        } else if (fieldObj && fieldObj.dt_code == 'date') {
          displayCondition += " '" + new Date(fieldValue).toLocaleDateString() + "'";
          databaseCondition += " '" + new Date(fieldValue).toLocaleDateString() + "'";
        } else if (fieldObj && fieldObj.dt_code == 'boolean') {
          databaseCondition += ' ' + (fieldValue == true ? 1 : 0);
        }else{
          displayCondition += ` '${fieldValue}'`;
          databaseCondition += ` '${fieldValue}'`;
        }

      } else if (comparisionOperator && comparisionOperator.value == '2' && fieldValue) {
          if (operatorExpression == 'LIKE') {
            displayCondition += ` '${fieldValue.name}'`;
            databaseCondition += " '%'+" + `t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}` + "+'%'";
          }else if(operatorExpression == 'IN'){
            displayCondition += " (" + fieldValue.map(m => { return `'${m.name}'`; }).join() + ")";
            databaseCondition += " (" + fieldValue.map(m => { return `t${m.sub_module_id}.${m.PrimaryTableColumn}`; }).join() + ")";
          }else {
            displayCondition += ` '${fieldValue.name}'`;
            databaseCondition += ` t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}`;
          }
      } else if (comparisionOperator && comparisionOperator.value == '3' && fieldValue){
        displayCondition += ` ${fieldValue}`;
        databaseCondition += ` ${fieldValue}`;
      }
      else if(comparisionOperator && typeof comparisionOperator.value != "undefined"){
        displayCondition += ` '${fieldValue}'`;
        databaseCondition += ` '${fieldValue}'`;
      }
      if (condition.closingBrackets!= null) {
        displayCondition += condition.closingBrackets + ' ';
        databaseCondition += condition.closingBrackets + ' ';
      }
      targetForm.get('targetCondition').patchValue({
        displayCondition: displayCondition,
        database_condition: databaseCondition
      });
    });
  }
  buildConditionResultCreateQuery(resultForm){
    let tableName = `t${resultForm.value.tableFields[0].fieldId.sub_module_id}`;
    let columns = '';
    let columnsValue = '';
    let query = `INSERT INTO ${tableName} (`;
    resultForm.value.tableFields.forEach((result, index) => {
      let comma = '';
      if (resultForm.value.tableFields.length != (index + 1)) {
        comma = ', ';
      }
      const fieldObj = result.fieldId;
      const dtOperator = result.dataType;
      const comparisionOperator = result.conditionsId;
      const fieldValue = result.fieldValue;
      if(fieldObj && dtOperator && comparisionOperator && fieldValue){
        if(comparisionOperator.value == '1'){ //Is value
          if (fieldObj.dt_code == 'text') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `''${fieldValue}''${comma}`;
          } else if (fieldObj.dt_code == 'decimal' || fieldObj.dt_code == 'int' || fieldObj.dt_code == 'bigint') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `${fieldValue}${comma}`;
          } else if (fieldObj.dt_code == 'boolean') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `${(fieldValue === true ? 1 : 0)}${comma}`;
          } else if (fieldObj.dt_code == 'date') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `'${fieldValue}'${comma}`;
          } else if (fieldObj.dt_code == 'select') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `'${fieldValue.value}'${comma}`
          }
        }else if(comparisionOperator.value == '2'){ //Is value from
          if (fieldObj.dt_code == 'text') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `''t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}''${comma}`;
          } else if (fieldObj.dt_code == 'decimal' || fieldObj.dt_code == 'int' || fieldObj.dt_code == 'bigint') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}${comma}`;
          } else if (fieldObj.dt_code == 'boolean') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}${comma}`;
          } else if (fieldObj.dt_code == 'date') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `'t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}'${comma}`;
          } else if (fieldObj.dt_code == 'select') {
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `'t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}'${comma}`;
          }else{
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}${comma}`;
          }
        }else if(comparisionOperator.value == '3'){ //Is calculate
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `${fieldValue}${comma}`;
        }else if(comparisionOperator.value == '4'){  //Formula
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `${fieldValue.query}${comma}`;

        }else if(comparisionOperator.value == '5'){  //Related formula
            columns += `${fieldObj.PrimaryTableColumn}${comma}`;
            columnsValue += `t${fieldValue}${comma}`;
        }
      }
    });
    query += `${columns}) select ${columnsValue}`;
    resultForm.get('resultCondition').setValue(query);
  }
  buildConditionResultUpdateQuery(resultForm){

    let tableName = `t${resultForm.value.tableFields[0].fieldId.sub_module_id}`;
    let query = 'UPDATE ' + tableName + ' SET ';
    resultForm.value.tableFields.forEach((result, index) =>{
      let comma = '';
      if (resultForm.value.tableFields.length != (index + 1)) {
        comma = ', ';
      }
      const fieldObj = result.fieldId;
      const dtOperator = result.dataType;
      const comparisionOperator = result.conditionsId;
      const fieldValue = result.fieldValue;
      if(fieldObj && dtOperator && comparisionOperator && fieldValue){
        if(comparisionOperator.value == '1'){ //Is value
          if (fieldObj.dt_code == 'select') {
            query += `${tableName}.${fieldObj.PrimaryTableColumn}='${fieldValue.value}'${comma}`;
          } else if (dtOperator.includes('char')) {
            query += `${tableName}.${fieldObj.PrimaryTableColumn}='${fieldValue}'${comma}`;
          } else if (dtOperator.includes('decimal') || dtOperator.includes('int') || dtOperator.includes('bigint')) {
            query += `${tableName}.${fieldObj.PrimaryTableColumn}=${fieldValue}${comma}`;
          } else if (dtOperator.includes('bit')) {
            query += `${tableName}.${fieldObj.PrimaryTableColumn}=${(fieldValue === true ? 1 : 0)}${comma}`;
          } else if (dtOperator.includes('date')) {
            query += `${tableName}.${fieldObj.PrimaryTableColumn}='${fieldValue}'${comma}`;
          } else {
            query += `${tableName}.${fieldObj.PrimaryTableColumn}='${fieldValue}'${comma}`;
          }
        }else if(comparisionOperator.value == '2'){  //Is value from
          query += `${tableName}.${fieldObj.PrimaryTableColumn}=t${fieldValue.sub_module_id}.${fieldValue.PrimaryTableColumn}${comma}`;
        }else if(comparisionOperator.value == '3'){ //Is calculate
          query += `${tableName}.${fieldObj.PrimaryTableColumn}=${fieldValue}${comma}`;
        }else if(comparisionOperator.value == '4'){ //Formula
          query += `${tableName}.${fieldObj.PrimaryTableColumn}=${fieldValue.query}${comma}`;
        }else if(comparisionOperator.value == '5'){ //related formula
          query += `${tableName}.${fieldObj.PrimaryTableColumn}=${fieldValue}${comma}`;
        }else{

        }
      }
    });
    resultForm.get('resultCondition').setValue(query);
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
      fieldSelectList: [],
      fieldValue: [null],
      fieldSecondValue: [null],
      closingBrackets: ")",
      isTime: [""],
      displayOrder: [0],
      conditions: [],
      conditionsId: [null],
      resultCalculation: this.fb.array([this.buildResultCalculation()]),
      disableDropdown: [null]
    });
    if (condition != null) {
      let fieldValue = null;
      let operatorContionsId = (typeof condition.conditionsId !== 'undefined' ? JSON.parse(condition.conditionsId) : {});
      let fieldSecondValue = null;
      if (typeof condition.fieldId !== 'undefined' && operatorContionsId.value) {
        if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_expression != 'in') {
          fieldValue = operatorContionsId.value == "2" ? condition.fieldValue : JSON.parse(condition.fieldValue);
        } else if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_display_name.includes('multiple')) {
          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });
          fieldValue = (operatorContionsId.value == "2" || operatorContionsId.value == "1") ? condition.fieldValue : JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));
        }
        else if (condition.fieldId.dt_code == 'text' && condition.operatorId.operator_display_name.includes('multiple')) {
          fieldValue = (operatorContionsId.value == "2" && condition.fieldValue) ? JSON.parse(condition.fieldValue) : '';
        }
        else if (condition.fieldId.dt_code == 'date') {
          if (operatorContionsId.value == "1") {
            fieldValue = new Date(condition.fieldValue);
          }
          else {
            fieldValue = condition.fieldValue
          }
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
      const operatorExpression = condition.operatorId.operator_expression;
      conditiongroup.patchValue({
        conditionId: condition.conditionId,
        relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
        openingBrackets: condition.openingBrackets,
        subModuleId: condition.subModuleId,
        subModuleAlias: ((typeof condition.subModuleAlias !== 'undefined' ? condition.subModuleAlias : '')),
        fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
        fields: condition.fields,
        fieldSelectList: (typeof condition.fieldId !== 'undefined' && condition.fieldId.dt_code == 'select' && condition.fieldId.select_options ? JSON.parse(condition.fieldId.select_options) : []),
        operatorId: condition.operatorId,
        operators: condition.operators,
        fieldValue: (operatorContionsId && operatorContionsId.value == '2' && condition.operatorId.operator_expression != 'in' && fieldValue) ? JSON.parse(fieldValue) : fieldValue,
        fieldSecondValue: fieldSecondValue,
        closingBrackets: condition.closingBrackets,
        isTime: condition.isTime,
        conditions: this.sortConditionOperatoers(typeof condition.fieldId !== 'undefined' ? condition.fieldId.dt_code : ''),
        conditionsId: operatorContionsId,
        disableDropdown: operatorExpression == "(IS NULL OR EMPTY)" || operatorExpression == "(IS NOT NULL OR NOT EMPTY)" ? true : false
      });
    }
    //prepare condtion data
    while ((conditiongroup.get('resultCalculation') as FormArray).length != 0) {
      (conditiongroup.get('resultCalculation') as FormArray).removeAt(0);

    }

    if (condition) {
      if (condition.resultCalculation) {
        condition.resultCalculation.forEach((m: any) => {
          (conditiongroup.get('resultCalculation') as FormArray).push(this.buildResultCalculation(m));
        });
      }
    }
    return conditiongroup;
  }

  buidResult(result = null) {
    // console.log("Result in service",result);
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
        isEdit: [false],
      });
    } else {
      let resultGroup = this.fb.group({
        resultId: [result.queueTargetResultId],
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
    // console.log("Table fields in service",tableField);
    let tableFieldGroup = this.fb.group({
      queueTargetResultConditionId: [null],
      queueTargetId: [null],
      fieldId: [null],
      subModuleId: [null, Validators.required],
      name: [null, Validators.required],
      fieldSelectList: [],
      displayName: [null],
      dataType: [null, Validators.required],
      fieldDisplayValue: [null],
      fieldValue: [null, Validators.required],
      showPopUpModal: [false],
      resultCalculation: this.fb.array([this.buildResultCalculation()]),
      customFormula: this.buildFormulaCondition(),
      conditionsId: [null, Validators.required],
      conditions: [],
    });
    if (tableField != null) {
      let fieldValue = null;
      if (tableField.fieldId) {
        if (tableField.fieldId.dt_code == 'select') {
          fieldValue = tableField.fieldId.select_options ? JSON.parse(tableField.fieldId.select_options).find(m => m.value === tableField.fieldValue) : undefined;
          if (!fieldValue) {
            fieldValue = tableField.fieldValue;
          }
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
      let operatorsCondition = (typeof tableField.conditionsId !== 'undefined' ? JSON.parse(tableField.conditionsId) : {});
      tableFieldGroup.patchValue({
        queueTargetResultConditionId: (typeof tableField.queueTargetResultConditionId !== 'undefined' ? tableField.queueTargetResultConditionId : null),
        subModuleId: tableField.subModuleId,
        queueTargetId: (typeof tableField.queueTargetId !== 'undefined' ? tableField.queueTargetId : null),
        fieldId: (typeof tableField.fieldId !== 'undefined' ? tableField.fieldId : tableField),
        name: (typeof tableField.name !== 'undefined' ? tableField.name : ''),
        fieldSelectList: ((typeof tableField.fieldId !== 'undefined' && tableField.fieldId.dt_code == 'select' && tableField.fieldId.select_options) ? JSON.parse(tableField.fieldId.select_options) : []),
        displayName: (typeof tableField.label !== 'undefined' ? tableField.label : ''),
        dataType: (typeof tableField.dataType !== 'undefined' ? tableField.dataType : typeof tableField.actual_data_type !== 'undefined' ? tableField.actual_data_type : ''),
        fieldValue: (operatorsCondition && (operatorsCondition.value == '2' || operatorsCondition.value == '4') && fieldValue) ? JSON.parse(tableField.fieldValue) : fieldValue,
        fieldDisplayValue: (typeof tableField.fieldDisplayValue !== 'undefined' ? tableField.fieldDisplayValue : null),
        conditions: this.sortConditionOperatoers(typeof tableField.fieldId !== 'undefined' ? tableField.fieldId.dt_code : ''),
        conditionsId: operatorsCondition,
        customFormula: this.buildFormulaCondition(tableField.customFormula)
      });

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
  buildFormulaCondition(condition = null) {
    // console.log("formula condition in service",condition);
    if(condition){
      condition =  JSON.parse(condition);
    }
    let formulaCondition = this.fb.group({
      id: [null],
      queueId : [null],
      queueTargetResultConditionId: [null],
      queueTargetResultId: [null],
      formulaType: [null],
      openingBrackets: "(",
      subModuleId: [null],
      fieldId: [null],
      fields: [],
      operatorId: [null],
      operators: [],
      fieldSelectList: [],
      fieldValue: [null],
      closingBrackets: ")",
      conditions: [],
      conditionsId: [null],
      ifBodyConditionOperator : [null],
      ifBodyFieldValue : [null],
      elseBodyConditionOperator : [null],
      elseBodyFieldValue : [null],
    });
    if (condition != null) {
      let fieldValue = null;
      let operatorContionsId = (typeof condition.conditionsId !== 'undefined' ? JSON.parse(condition.conditionsId) : {});
      if (typeof condition.fieldId !== 'undefined' && operatorContionsId.value) {
        if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_expression != 'in') {
          fieldValue = operatorContionsId.value == "2" ? condition.fieldValue : JSON.parse(condition.fieldValue);
        } else if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_display_name.includes('multiple')) {
          let values = condition.fieldValue.split(',').map(m => { return m.replace(/'/g, '') });
          fieldValue = (operatorContionsId.value == "2" || operatorContionsId.value == "1") ? condition.fieldValue : JSON.parse(condition.fieldId.select_options).filter(m => values.includes(m.value));
        }
        else if (condition.fieldId.dt_code == 'text' && condition.operatorId.operator_display_name.includes('multiple')) {
          fieldValue = (operatorContionsId.value == "2" && condition.fieldValue) ? JSON.parse(condition.fieldValue) : '';
        }
        else if (condition.fieldId.dt_code == 'date') {
          if (operatorContionsId.value == "1") {
            fieldValue = new Date(condition.fieldValue);
          }
          else {
            fieldValue = condition.fieldValue
          }
        } else {
          fieldValue = condition.fieldValue
        }
      }
      let ifBodyConditionOperator = condition.ifBodyConditionOperator != null ? JSON.parse(condition.ifBodyConditionOperator) : null;
      let elseBodyConditionOperator = condition.elseBodyConditionOperator != null ? JSON.parse(condition.elseBodyConditionOperator) : null;
      formulaCondition.patchValue({
        id : condition.id,
        queueId : condition.queueId,
        queueTargetResultConditionId: condition.queueTargetResultConditionId,
        queueTargetResultId: condition.queueTargetResultId,
        formulaType: JSON.parse(condition.formulaType),
        openingBrackets: condition.openingBrackets,
        subModuleId: condition.subModuleId,
        fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
        fields: condition.fields,
        fieldSelectList: (typeof condition.fieldId !== 'undefined' && condition.fieldId.dt_code == 'select' && condition.fieldId.select_options ? JSON.parse(condition.fieldId.select_options) : []),
        operatorId: condition.operatorId,
        operators: condition.operators,
        fieldValue: (operatorContionsId && operatorContionsId.value == '2' && condition.operatorId.operator_expression != 'in' && fieldValue) ? JSON.parse(fieldValue) : fieldValue,
        closingBrackets: condition.closingBrackets,
        conditions: this.sortFormulaConditionOperatoers(typeof condition.fieldId !== 'undefined' ? condition.fieldId.dt_code : ''),
        conditionsId: operatorContionsId,
        ifBodyConditionOperator : ifBodyConditionOperator,
        ifBodyFieldValue : (condition.ifBodyFieldValue && ifBodyConditionOperator.value == '2') ? JSON.parse(condition.ifBodyFieldValue): condition.ifBodyFieldValue,
        elseBodyConditionOperator : elseBodyConditionOperator,
        elseBodyFieldValue : (condition.elseBodyFieldValue && elseBodyConditionOperator.value == '2') ? JSON.parse(condition.elseBodyFieldValue) : condition.elseBodyFieldValue,
      });
    }
    return formulaCondition;
  }
  buildResultCalculation(resultCalculate = null) {

    let resultCalculation = this.fb.group({
      queueTargetResultConditionCalculationID: [''],
      queueId: [null],
      queueTargetId: [null],
      queueTargetResultId: [null],
      queueTargetResultConditionId: [null],
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
      statusId: ['1001'],
      closingBrackets: [')']
    });

    if (resultCalculate != null) {
      resultCalculation.patchValue({
        queueTargetResultConditionCalculationID: resultCalculate.queueTargetResultConditionCalculationID,
        queueId: resultCalculate.queueId,
        queueTargetId: resultCalculate.queueTargetId,
        queueTargetResultId: resultCalculate.queueTargetResultId,
        formulaId: (typeof resultCalculate.formulaId !== 'undefined' ? resultCalculate.formulaId : null),
        queueTargetResultConditionId: resultCalculate.queueTargetResultConditionId,
        openingBrackets: resultCalculate.openingBrackets,
        firstFieldSectionId: resultCalculate.firstFieldSectionId,
        firstFields: (typeof resultCalculate.firstFields === 'undefined' ? null : resultCalculate.firstFields),
        firstFieldId: (typeof resultCalculate.firstFieldId === 'undefined' ? null : resultCalculate.firstFieldId),
        firstFieldValue: (typeof resultCalculate.firstFieldValue === 'undefined' ? null : resultCalculate.firstFieldValue),
        secondFieldSectionId: (typeof resultCalculate.secondFieldSectionId === 'undefined' ? null : resultCalculate.secondFieldSectionId),
        secondFields: (typeof resultCalculate.secondFields === 'undefined' ? null : resultCalculate.secondFields),
        secondFieldId: (typeof resultCalculate.secondFieldId === 'undefined' ? null : resultCalculate.secondFieldId),
        secondFieldValue: (typeof resultCalculate.secondFieldValue === 'undefined' ? null : resultCalculate.secondFieldValue),
        datePart: (typeof resultCalculate.datePart === 'undefined' ? null : resultCalculate.datePart),
        operatorId: (typeof resultCalculate.operatorId === 'undefined' ? null : resultCalculate.operatorId),
        statusId: (typeof resultCalculate.statusId === 'undefined' ? null : resultCalculate.statusId),
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
          queueId: [''],
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
          queueId: [target.queueId],
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

  getqueueList(name: any, loanproduct: any, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {

    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}queueEngine/GetqueueList?name=${name}&loanproduct=${loanproduct}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getqueueSummaryList(name: any, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {

    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}queueEngine/GetqueueSummaryList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getLoanApplicationListForApplyqueue(name: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: number, batchId: number, queueId: number, listFor: string): Observable<any> {
    return this.http.get(`${this.baseUri}queueEngine/GetLoanApplicationListForApplyqueue?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&queueId=${queueId}&listFor=${listFor}`);
  }


  
  ApplyqueueVersion(id: any, ApplicationIds: any) {
    let model = {
      queueId: id,
      ApplicationIds: ApplicationIds
    };
    // console.log(model);
    return this.http.post(this.baseUri + `queueEngine/ApplyqueueVersionToApplication`, model);
  }
}

export class CheckQueueName {
  QueueId: number;
  QueueName: string;

}
