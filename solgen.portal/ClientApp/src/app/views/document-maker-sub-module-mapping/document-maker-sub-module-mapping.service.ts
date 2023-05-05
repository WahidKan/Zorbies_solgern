import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentMakerSubModuleMappingService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public SolRuleEngine = `${environment.WebApiBaseUrl}DocumentMakerSubModuleMapping`;
  public moduleUri = `${environment.WebApiBaseUrl}Modules`;

  customFieldsList: any;
  pagedData: any;
  constructor(private http: HttpClient, private fb: FormBuilder) { }


  GetDoumentMakerSubModuleMappingList(sortColumn: string, sortDir: string, page: number, pageSize: number, filter : string): Observable<any> {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetList?SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&Filter=${filter}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  delete(id: any) {
    return this.http.get(this.baseUri + `DocumentMakerSubModuleMapping/Delete?id=${id}`)
  }
  deleteAll(ids: string) {
    return this.http.get(this.baseUri + `DocumentMakerSubModuleMapping/MultiDelete?ids=${ids}`)
  }
  getMapping(mappingId :any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetDocumentMappingById?id=${mappingId}`);
  }
  getSubModulesList() {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetSubModuleList`);
  }
  getDocumentList() {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetDocumentList`);
  }

  GetHtmlTemListForddl() {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetHtmlTemListForddl`);
  }
  GetRoutesList() {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetRoutesList`);
  }
  GetRouteDocumentAndFieldsList(routeId :any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetRouteDocumentList?routeId=${routeId}`);
  }
  GetDocumentAndFieldsByDocumentIdsList(data :any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetMappingFieldsList?data=${data}`);
  }

  GetHtmlTempAndFieldsByDocumentIdsList(data :any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetHtmlMappingFieldsList?data=${data}`);
  }
  GetHtmlTempAndFieldsByDocumentIdsForDoc(data :any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetHtmlMappingFieldsForDoc?data=${data}`);
  }

   AddEditDocumentMapping(data: any) {
    return this.http.post(`${this.baseUri}DocumentMakerSubModuleMapping/AddDocumentMapping`, data);
  }

  VerifyDuplicateName(routeName: string, id: number) : Observable<any>{
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/VerifyDuplicateName?routeName=${routeName}&id=${id}`);
  }
  getCustomFieldsList(moduleId :any,subModuleId:any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetCustomFieldsList?moduleId=${moduleId}&subModuleId=${subModuleId}`);
  }
  getDocumentBytes(path:any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetDocumentBytes?path=${path}`);
  }

  GetDocumentMappingFieldsbyid(id: any) : Observable<any>{
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetDocumentMappingFieldsbyid?id=${id}`);
  }



  createUpdateMappingDelivery(model: any) : Observable<any>{
    return this.http.post(`${this.baseUri}DocumentMakerSubModuleMapping/AddEditSubModuleMappingDelivery`, model);
  }

  GetSubModuleMappingDeliveryById(id: any,DocumentMakerMappingId: any) {
    return this.http.get(`${this.baseUri}DocumentMakerSubModuleMapping/GetSubModuleMappingDeliveryById?Id=${id}&DocumentMakerMappingId=${DocumentMakerMappingId}`);
  }

}
export class DocumentDeliveryOptions{
  id : number;
  documentMakerMappingId : number;
  deliveryOption : string;
  sendToOption : string;
  sendToEmail : string;
  fromToOption : string;
  fromToEmail : string;
  subject : string;
  body : string;
  statusId : string;
  sendingType : boolean;
  sendingTypeSignNow : boolean;
  signer1Option : string;
  signer1Email : string;
  signer2Option : string;
  signer2Email : string;
  ccEmail : string;
  ccEmailOption : string;
  constructor(){
    this.id = null;
    this.documentMakerMappingId = null;
    this.deliveryOption = null;
    this.sendToOption = null;
    this.sendToEmail = null;
    this.fromToOption = null;
    this.fromToEmail = null;
    this.subject = null;
    this.body = null;
    this.statusId = null;
    this.sendingType = null;
    this.sendingTypeSignNow = null;
    this.signer1Option = null;
    this.signer1Email = null;
    this.signer2Option = null;
    this.signer2Email = null;
    this.ccEmail = null;
    this.ccEmailOption = null;
  }
}



export class DocumentSubModuleMapping {
  objectId : any;
  name: string;
  type: string;
  Doctype: string;
  id: any;
  subModuleId : any;
  subModuleIdDb : any;
  moduleId : any;
  statusId : any;
  statusIdDb : number;
  documentList : Documents[];
  mappings: DocumentSubModuleMappingField[];

  constructor() {
    this.objectId = null;
    this.subModuleIdDb = null;
    this.name = null;
    this.type = "Route";
    this.Doctype = "pdf";
    this.id = 0;
    this.statusId = {text : "Active",value : 1001};
    this.statusIdDb = null;
    this.subModuleId = null;
    this.moduleId = null;
    this.documentList = [];
    this.mappings = [];
  }
}
export class Documents{
  id: number;
  name : string;
  path: string;
  fileUrl : string;
  type : string;
  constructor(){
    this.id =0 ;
    this.name = null;
    this.path = null;
    this.type = null;
    this.fileUrl = null;
  }
}
export class DocumentSubModuleMappingField {
  formFieldName: string;
  documentId : any;
  documentName: string;
  mappings: FormField[];
  constructor() {
    this.formFieldName = null;
    this.documentName = null;
    this.documentId = null;
    this.mappings = [];
  }
}

export class FormField {
  formFieldId: string;
  formFieldName: string;
  tableName: string;
  displayName: string;
  moduleId : number;
  subModuleId : number;
  IsImage: boolean;
  Width: number;
  Height: number;
  Left: number;
  Top: number;
  constructor() {
    this.moduleId = 0;
    this.subModuleId = 0;
    this.formFieldId = "";
    this.formFieldName = "";
    this.tableName = "";
    this.displayName = "";
  }
}
