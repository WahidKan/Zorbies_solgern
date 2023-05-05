import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { id } from '@swimlane/ngx-datatable';
import { exec } from 'child_process';
import { settings } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class LenderlistService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any;
  customFinancialList: any;
  lenderEditPage: any;
  constructor(private http: HttpClient) { }

  GetLenderlist(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}Bank/GetLenderList?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}`)
  }

  //GetLeadListing() {
  //  return this.http.get(`${this.baseUri}Common/GetLeadListing`)
  //}

  //GetLeadAccountdata(leadid: any, submoduleid: any, objectname: any) {
  //  return this.http.get(`${this.baseUri}lead/GetLeadAccountdata?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`)


  //}
  //GetLeadappointments(leadid: any, submoduleid: any, objectname: any) {
  //  return this.http.get(`${this.baseUri}lead/GetLeadappointments?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`)
  //}

  getFormCustomFields1() {
    return this.http.get(this.baseUri + `UserProfile/GetCustomFieldsData`);
  }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any,Id: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetFinancialInstitute(companyId: any, Id: any) {
    return this.http.get(`${this.baseUri}vendor/GetFinancialInstitute?companyId=${companyId}&PrimaryId=${Id}`)
      .pipe(
        map((response: any) => {
          this.customFinancialList = response;
          return true;
        })
      );
  }

  GetLenderDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `common/GetLenderById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          this.lenderEditPage = response;
          return true;
        })
      );
  }
  addEditForm(LenderjsonData: LenderJsonData) {
    return this.http.post(this.baseUri + `Lease/AddEditLender`, LenderjsonData);
  }

  //callSalesForceApi(ref_code: any) {
  //  return this.http.get("http://45.35.44.173:8080/" + `Scheduledtask/Home/UpdateByID?Id=${ref_code}`)
  //}

  DeleteRecords(deleteId: any, tableName: any, ) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.lenderEditPage = response;
          return true;
        })
      );
  }

  getWebmergeDocuments(bankId: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetWebmergeDocuments/${bankId}`)
  }

  getWebmergeDocument(documentId: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetWebmergeDocument/${documentId}`);
  }

  getWebmergeDocumentFields(documentId: any): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUri}WebMerge/GetWebmergeDocumentFields/${documentId}`);
  }

  getFormFields(): Observable<FormField[]> {
    return this.http.get<FormField[]>(`${this.baseUri}WebMerge/GetFormFields`);
  }

  saveWebmergeMapping(data: WebmergeMapping, bankId: any): Observable<any> {
    return this.http.post(`${this.baseUri}WebMerge/SaveWebmergeMappings/${bankId}`, data);
  }

  updateWebmergeMapping(data: WebmergeMapping, bankId: any, mappingId: any): Observable<any> {
    return this.http.post(`${this.baseUri}WebMerge/UpdateWebmergeMappings/${bankId}/${mappingId}`, data);
  }

  getWebmergeMappings(bankId: any, documentId: any): Observable<WebmergeDocumentField[]> {
    return this.http.get<WebmergeDocumentField[]>(`${this.baseUri}WebMerge/GetWebmergeMappings/${bankId}/${documentId}`);
  }

  getWebmergeMappingDetails(bankId: any, mappingId: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetWebmergeMappingDetails/${bankId}/${mappingId}`)
  }

  getWebmergeMappingsList(bankId: any, sortColumn: any, sortDir: any, page: any, pageSize: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetWebmergeMappingsList/${bankId}?SortColumn=${sortColumn}&SortDir=${sortDir}&pageNo=${page}&PageSize=${pageSize}`);
  }

  getBankIdByLoanApplicationId(loanApplicationId: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetBankIdByLoanApplicationId/${loanApplicationId}`);
  }

  uploadWebmergeDocument(model: FormData): Observable<any> {
    return this.http.post(this.baseUri + `WebMerge/UploadWebmergeDocument`, model);
  }

  updateWebmergeDocument(documentId: any, model: FormData): Observable<any> {
    return this.http.post(this.baseUri + `WebMerge/UpdateWebmergeDocument/${documentId}`, model);
  }

  getWebmergeDataRoutes(bankId: any): Observable<WebmergeDataRoute[]> {
    var data= this.http.get<WebmergeDataRoute[]>(`${this.baseUri}WebMerge/GetWebmergeDataRoutes/${bankId}`);
    debugger;
    console.log(data);
    return data
  }

  createWebmergeDataRoute(data: WebmergeDataRoute, bankId: any): Observable<any> {
    return this.http.post(`${this.baseUri}WebMerge/CreateWebmergeDataRoute/${bankId}`, data);
  }

  updateWebmergeDataRoute(data: WebmergeDataRoute): Observable<any> {
    return this.http.post(`${this.baseUri}WebMerge/UpdateWebmergeDataRoute`, data);
  }

  getWebmergeDataRoute(dataRouteId: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetWebmergeDataRoute/${dataRouteId}`);
  }

  getWebmergeDataRouteRules(dataRouteId: any): Observable<Rule[]> {
    return this.http.get<Rule[]>(`${this.baseUri}WebMerge/GetWebmergeDataRouteRules/${dataRouteId}`)
  }

  setDefaultWebmergeMapping(mappingId: any, bankId: any): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/SetDefaultWebmergeMapping/${mappingId}/${bankId}`)
  }

  getWebmergeDelivery(webmergeObjectId: number, webmergeObjectType: string): Observable<WebmergeDelivery> {
    return this.http.get<WebmergeDelivery>(`${this.baseUri}WebMerge/GetDeliveries/${webmergeObjectId}/${webmergeObjectType}`)
  }

  saveWebmergeDelivery(webmergeObjectId: number, webmergeObjectType: string, data: WebmergeDelivery): Observable<WebmergeDelivery> {
    return this.http.post<WebmergeDelivery>(`${this.baseUri}WebMerge/SaveDeliveries/${webmergeObjectId}/${webmergeObjectType}`, data)
  }
}

export class LenderJsonData {
  ID: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.ID = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
  }
}
export class CheckboxData {
  controlname: string;
  controlvalues: string;
  constructor() {
    this.controlname = "";
    this.controlvalues = "";
  }
}

export class WebmergeMapping {
  name: string;
  webmergeObjectType: string;
  webmergeObjectId: number;
  webmergeMappings: WebmergeDocumentField[];

  constructor() {
    this.name = '';
    this.webmergeObjectType = '';
    this.webmergeObjectId = 0;
    this.webmergeMappings = [];
  }
}

export class WebmergeDocumentField {
  webmergeDocumentFieldName: string;
  webmergeDocumentName: string;
  mappings: FormField[];
  constructor() {
    this.webmergeDocumentFieldName = "";
    this.webmergeDocumentName = "";
    this.mappings = [];
  }
}

export class FormField {
  formFieldId: string;
  formFieldName: string;
  tableName: string;
  displayName: string;
  constructor() {
    this.formFieldId = "";
    this.formFieldName = "";
    this.tableName = "";
    this.displayName = "";
  }
}

export class WebmergeDataRoute {
  id: number;
  name: string;
  rules: Rule[];
  folder: string;
  BankId: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.rules = [];
    this.folder = '';
    this.BankId = 0;
  }
}

export class Rule {
  id: number;
  document_id: string;
  document_name: string;
  key: string;
  sort: number;
  combine: number;
  conditions: Condition[];
  deleted: boolean;

  constructor() {
    this.id = 0;
    this.document_id = '';
    this.document_name = '';
    this.key = '';
    this.sort = 0;
    this.combine = 0;
    this.conditions = [];
    this.deleted = false;
  }
}

export class Condition {
  field: string;
  exp: string;
  value: string;
  operator: string;
  deleted: boolean;

  constructor() {
    this.field = '';
    this.exp = '';
    this.value = '';
    this.operator = '';
    this.deleted = false;
  }
}

export class WebmergeDelivery {
  id: number;
  name: string;
  type: string;
  settings: WebmergeDeliveryInsureSignSettings;
  constructor(type) {
    this.type = type;
    this.settings = new WebmergeDeliveryInsureSignSettings();
  }
}

export class WebmergeDeliveryInsureSignSettings {
  message: string;
  recipients: WebmergeDeliveryInsureSignRecipient[];
  constructor() {
    this.message = '';
    this.recipients = [];
  }
}

export class WebmergeDeliveryInsureSignRecipient {
  type: string;
  name: string;
  name_other: string;
  email: string;
  email_other: string;
  constructor(type) {
    this.type = type;
  }
}
