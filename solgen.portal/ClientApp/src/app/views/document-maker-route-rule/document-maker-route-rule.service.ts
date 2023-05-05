import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentMakerRouteRuleService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public SolRuleEngine = `${environment.WebApiBaseUrl}DocumentMakerRouteRule`;
  public moduleUri = `${environment.WebApiBaseUrl}Modules`;

  customFieldsList: any;
  pagedData: any;
  constructor(private http: HttpClient, private fb: FormBuilder) { }


  GetDoumentMakerRouteRuleList(sortColumn: string, sortDir: string, page: number, pageSize: number, filter: string): Observable<any> {
    return this.http.get(`${this.baseUri}DocumentMakerRouteRule/GetList?SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&Filter=${filter}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  delete(id: any) {
    return this.http.get(this.baseUri + `DocumentMakerRouteRule/Delete?id=${id}`)
  }
  deleteAll(ids: string) {
    return this.http.get(this.baseUri + `DocumentMakerRouteRule/MultiDelete?ids=${ids}`)
  }
  getDocumentList() {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetDocumentList`);
  }
  getLogicalOperatorsList(type: string) {
    return this.http.get(`${this.baseUri}DocumentMakerRouteRule/GetLogicalOperatorsList?type=${type}`);
  }
  getComparisionOperatorsList(type: string) {
    return this.http.get(`${this.baseUri}DocumentMakerRouteRule/GetComparisionOperatorsList?type=${type}`);
  }
  getPlaceHolderFieldsList(documentId: number) {
    return this.http.get(`${this.baseUri}DocumentMakerRouteRule/GetPlaceHolderFieldsList?documentId=${documentId}`);
  }
  getSubModuleFields(subModuleName) {
    return this.http.get(`${this.moduleUri}/GetSubModuleFields?subModuleName=${subModuleName}`);
  }

  GetCustomFieldsListBySubModuleId(moduleId: any, subModuleId: any) {
    return this.http.get(`${this.baseUri}SolgenRuleEngine/GetSolgenCustomFieldBySubModuleId?moduleId=${moduleId}&subModuleId=${subModuleId}`);
  }

  // checkNameExist(model: CheckRuleName) {
  //   return this.http.post(`${this.baseUri}SolgenRuleEngine/CheckSolgenRuleNameExist`, model);
  // }

  AddUpdateRouteRule(data: any) {
    return this.http.post(`${this.baseUri}DocumentMakerRouteRule/AddUpdateRouteRule`, data);
  }
  getRoutesData(dataRouteId: any): Observable<any> {
    return this.http.get(`${this.baseUri}DocumentMakerRouteRule/GetDocumentMakerRoutes/${dataRouteId}`);
  }
  getRouteRulesData(dataRouteId: any): Observable<Rule[]> {
    return this.http.get<Rule[]>(`${this.baseUri}DocumentMakerRouteRule/GetDocumentMakerRouteRules/${dataRouteId}`)
  }
  AddRouteData(data: RouteData): Observable<any> {
    return this.http.post(`${this.baseUri}DocumentMakerRouteRule/AddRouteRuleData`, data);
  }

  VerifyDuplicateName(routeName: string, id: number) : Observable<any>{
    return this.http.get(`${this.baseUri}DocumentMakerRouteRule/VerifyDuplicateName?routeName=${routeName}&id=${id}`);
  }
  AddNewFieldRouteData(data: AddNewFieldRouteData): Observable<any> {
    return this.http.post(`${this.baseUri}DocumentMakerRouteRule/AddNewFieldRuleData`, data);
  }
  updateRouteData(data: RouteData): Observable<any> {
    return this.http.post(`${this.baseUri}DocumentMakerRouteRule/UpdateRouteRuleData`, data);
  }
  getWebmergeDocument(documentId: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetWebmergeDocument/${documentId}`);
  }

  getDocumentFields(documentId: any): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUri}WebMerge/GetWebmergeDocumentFields/${documentId}`);
  }

  getFormFields(): Observable<FormField[]> {
    return this.http.get<FormField[]>(`${this.baseUri}WebMerge/GetFormFields`);
  }


  changeStatus(id: any) {
    return this.http.post(`${this.baseUri}SolgenRuleEngine/ChangeSolgenRuleStatus/${id}`, null);
  }

  getDisplayOrder() {
    return this.http.get(`${this.baseUri}SolgenRuleEngine/GetSolgenRuleDisplayOrder`);
  }
  buildRootRouteRule(routeRule: RouteRule[] = null) {
    let rootRouteRuleGroup = this.fb.group({
      routeRuleArray : this.fb.array([])
    });
    if (routeRule && routeRule.length>0) {
        while ((rootRouteRuleGroup.get('routeRuleArray') as FormArray).length != 0) {
          (rootRouteRuleGroup.get('routeRuleArray') as FormArray).removeAt(0);
        }
        routeRule.forEach((m: any) => {
          (rootRouteRuleGroup.get('routeRuleArray') as FormArray).push(this.buildRouteRule(m));
        });
    }else{
      (rootRouteRuleGroup.get('routeRuleArray') as FormArray).push(this.buildRouteRule(null));
    }
    return rootRouteRuleGroup;
  }
  buildRouteRule(routeRule: RouteRule = null) {
    let routeRuleGroup = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      moduleId: [null],
      subModuleId: [null],
      documentMakerId: [null, Validators.required],
      documentMakerPlaceHolderFieldIdsList : [null],

      routeRuleConditions: this.fb.array([this.buildRouteRuleConditions()]),
    });
    if (routeRule) {
      routeRuleGroup.patchValue({
        id: routeRule.id,
        name: routeRule.name,
        moduleId: routeRule.moduleId,
        subModuleId: routeRule.subModuleId,
        documentMakerId: routeRule.documentMakerId,
      });
      if (routeRule.routeRuleConditions) {
        while ((routeRuleGroup.get('routeRuleConditions') as FormArray).length != 0) {
          (routeRuleGroup.get('routeRuleConditions') as FormArray).removeAt(0);
        }
        routeRule.routeRuleConditions.forEach((m: any) => {
          (routeRuleGroup.get('routeRuleConditions') as FormArray).push(this.buildRouteRuleConditions(m));
        });
      }
    }
    return routeRuleGroup;
  }
  buildRouteRuleConditions(routeRuleConditions: RouteRuleConditions = null) {
    let routeRuleConditionsGroup = this.fb.group({
      id: [null],
      documentMakerRouteRuleId: [null],
      logicalOperator: [null],
      documentMakerPlaceHolderFieldId: [null, Validators.required],
      ComparisonOperator: [null, Validators.required],
      value: [null, Validators.required],
      statusId: [null]
    });
    if (routeRuleConditions) {
      routeRuleConditionsGroup.patchValue({
        id: routeRuleConditions.id,
        documentMakerRouteRuleId: routeRuleConditions.documentMakerRouteRuleId,
        logicalOperator: routeRuleConditions.logicalOperator,
        documentMakerPlaceHolderFieldId: routeRuleConditions.documentMakerPlaceHolderFieldId,
        ComparisonOperator: routeRuleConditions.ComparisonOperator,
        value: routeRuleConditions.value,
        statusId: routeRuleConditions.statusId,
      });
    }
    return routeRuleConditionsGroup;
  }
}
export class RouteData {
  id: number;
  name: string;
  rules: Rule[];
  statusid:any;
  statusiddb:number;
  constructor() {
    this.id = 0;
    this.name = null;
    this.rules = [];
    this.statusid={ value: 1001, text: 'Active' };
    this.statusiddb=0;
  }
}
export class AddNewFieldRouteData {
  document_id: number;
  name: string;
  statusid:number;
  constructor() {
    this.document_id = 0;
    this.name = null;
    this.statusid= 1001;

  }
}

export class Rule {
  id: number;
  document_id: any;
  document_name: string;
  moduleId : number;
  subModuleId : number;
  key: string;
  sort: number;
  combine: number;
  conditions: Condition[];
  deleted: boolean;
  fieldList : [];
  constructor() {
    this.id = 0;
    this.document_id = null;
    this.document_name = null;
    this.key = null;
    this.sort = 0;
    this.combine = 1;
    this.conditions =  [new Condition()];
    this.deleted = false;
    this.moduleId = 0;
    this.subModuleId = 0;
    this.fieldList = [];
  }
}

export class Condition {
  field: any;
  exp: string;
  value: string;
  operator: string;
  deleted: boolean;
  constructor() {
    this.field = null;
    this.exp = null;
    this.value = null;
    this.operator = null;
    this.deleted = false;
  }
}
export class FormField {
  formFieldId: string;
  formFieldName: string;
  tableName: string;
  displayName: string;
  constructor() {
    this.formFieldId = null;
    this.formFieldName = null;
    this.tableName = null;
    this.displayName = null;
  }
}
export class RouteRule {
 public constructor(){

  }
  id: number;
  name: string;
  moduleId: number;
  subModuleId: number;
  documentMakerId: number;
  routeRuleConditions: RouteRuleConditions[];
}
export class RouteRuleConditions {
 public constructor(){

}
  id: number;
  documentMakerRouteRuleId: number;
  logicalOperator: string;
  documentMakerPlaceHolderFieldId: string;
  ComparisonOperator: string;
  value: string;
  statusId: number
}
