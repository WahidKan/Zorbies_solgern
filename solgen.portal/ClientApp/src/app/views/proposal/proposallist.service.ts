import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProposallistService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  getListPrice: Subject<any>;
  getPriceBookID: Subject<any>;
  constructor(private http: HttpClient) {
    this.getListPrice = new Subject<any>();
    this.getPriceBookID = new Subject<any>();
  }



  GetproposalList(listFilter: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, isCheckboxTick: any): Observable<any> {
    if (typeof listFilter == "undefined" || listFilter == null) { listFilter = null; }
    else { listFilter = encodeURIComponent((listFilter)); }
    return this.http.get(`${this.baseUri}proposal/GetproposalList?listFilter=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&isAllRecords=${isCheckboxTick}`)
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, OpportunityId: any, displayType: string) {
    ;
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&RefId=${OpportunityId}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  DeleteRecords(deleteId: any, tableName: any,) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }

  GetDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `proposal/GetProposalDetailsbyid?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          //// // console.log("responseService12", response);
          this.editPage = response;
          return true;
        })
      );
  }
  addEditForm(JsonData: JsonData) {
    return this.http.post(this.baseUri + `proposal/AddEditproposal`, JsonData);
  }


  SetPrimaryProposal(proposalId:any,OpportunityId:any,value:any) {
    ;
    return this.http.get(this.baseUri + `proposal/SetPrimaryProposal?proposalId=${proposalId}&opportunityId=${OpportunityId}&value=${value} `);
  }

  GetServiceGetFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `proposal/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
  }
  GetAssociateProductList(proposalId: any, opportunityId:any, submoduleid: any, objectname: any, name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}proposal/GetAssociateProductList?proposalId=${proposalId}&opportunityId=${opportunityId}&submoduleid=${submoduleid}&objectname=${objectname}&nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetPriceBookListDetail(obj: any, sortColumn: string, sortDir: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUri}proposal/GetPriceBookListDetail?Productid=${obj}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetAssociateProductWithProposalLineItemList(proposalId: any, opportunityId: any, submoduleid: any, objectname: any, name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}proposal/GetAssociateProductWithProposalLineItemList?proposalId=${proposalId}&opportunityId=${opportunityId}&submoduleid=${submoduleid}&objectname=${objectname}&nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );

  }
  DeleteProduct(selected: string) {
    return this.http.get(this.baseUri + `proposal/DeleteProduct?productId=${selected}`)
  }
  AddUpdateLineItem(lineItemModel: FormData) {
    return this.http.post(this.baseUri + `proposal/AddUpdateLineItem`, lineItemModel);

  }

  addOrUpdateFiles(CompanySetUpModel: FormData) {
    return this.http.post(this.baseUri + `proposal/addOrUpdateFiles`, CompanySetUpModel);
  }
  VoidDocument(DocumentMakerId: any,ProposalId : any, submodule: any) {
    return this.http.get(this.baseUri + `proposal/VoidGenerateDocument?DocumentMappingId=${DocumentMakerId}&ProposalId=${ProposalId}&submodule=${submodule}`)
  }

  //GetServiceGetFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
  //  return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
  //}
  GetProposalLineItemList(proposalId: any, opportunityId: any, submoduleid: any, objectname: any, name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}proposal/GetProposalLineItemList?proposalId=${proposalId}&opportunityId=${opportunityId}&submoduleid=${submoduleid}&objectname=${objectname}&nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getViewList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, ModuleName: any, SubModuleName: any, companyId: number) {

    return this.http.get(this.baseUri + `Common/GetCustomViewName?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetOpportunityList(ProposalId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `proposal/GetOpportunityList?Id=${ProposalId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  ValidateUtilityAccount(model: CheckProposal) {
    
    return this.http.post(`${this.baseUri}proposal/ValidateUtilityAccount`, model);
  }

  getDocumentBytes(proposalId: any, mappingId: any, submodule: any) : Observable<any>{
    return this.http.get(`${this.baseUri}proposal/GetDocument?proposalId=${proposalId}&mappingId=${mappingId}&submodule=${submodule}`);
  }
  SendDocumentSignNow(proposalId: any, mappingId: any,type:string,deliveryId:any, subject: any, body: any , onlyhtml : any, submodule : any)  : Observable<any>{
    let model = {
      proposalId: proposalId,
      mappingIds: mappingId,
      sendingSource:type,
      deliveryId:deliveryId,
      subject:subject,
      body:body,
      onlyhtml:onlyhtml,
      submodule:submodule
    };
    var modelstr  = JSON.stringify(model);
    //return this.http.post(this.baseUri + `proposal/SendDocumentSignNow`,NULL, model);
    
    return this.http.post(`${this.baseUri}proposal/SendDocumentSignNow`,  model  
    );





    //return this.http.post(`${this.baseUri}proposal/SendDocumentSignNow?proposalId=${proposalId}&mappingIds=${mappingId}&sendingSource=${type}&deliveryId=${deliveryId}&subject=${subject}&body=${JSON.stringify(body)}`);
  }
  getDocumentMappingList(proposalId:any) : Observable<any>{
    return this.http.get(`${this.baseUri}proposal/GetDocumentMappingList?proposalId=${proposalId}`);
  }
  getDocumentMappingListV1(proposalId:any,subModule:any) : Observable<any>{
    return this.http.get(`${this.baseUri}proposal/GetDocumentMappingListV1?proposalId=${proposalId}&subModule=${subModule}`);
  }

  getDocumentMappingsList(proposalId:any, subModuleName?:string) : Observable<any>{
    return this.http.get(`${this.baseUri}proposal/GetDocumentMappingsList?proposalId=${proposalId}&SubModuleName=${subModuleName}`);
  }
  getGenerateMappingList(proposalId: any) : Observable<any>{
    return this.http.get(`${this.baseUri}proposal/GetGenerateMappingList?proposalId=${proposalId}`);
  }

  DownloadSignedDocument(documentId: string): Observable<any> {
    return this.http.get(`${this.baseUri}proposal/DownloadSignedDocument?documentId=${documentId}`, { responseType: 'blob' })
  }

  GetURLlinkForSignDocument(documentId: string) : Observable<any>{
    
    return this.http.get(`${this.baseUri}proposal/GetURLlinkForSignDocument?documentId=${documentId}`);
  }

  getGeneratedMappingList(proposalId: any, subModuleName?:string) : Observable<any>{
    return this.http.get(`${this.baseUri}proposal/GetGenerateMappingList?proposalId=${proposalId}&SubModuleName=${subModuleName}`);
  }
  GenerateDocument(proposalId: any, mappingIds: string, subModuleName?:string) : Observable<any>{
    
    return this.http.get(`${this.baseUri}proposal/GenerateDocument?proposalId=${proposalId}&mappingIds=${mappingIds}&SubModuleName=${subModuleName}`);
  }

  private stagechange = new Subject<any>();
  setStageChangeEvent() {
    this.stagechange.next();
  }
  getStageChangeEvent() {
    return this.stagechange.asObservable();
  }
  GetTempalteList(proposalId:any) {
    return this.http.get(`${this.baseUri}proposal/GetTempalteList?proposalId=${proposalId}`);
  }
  GetProposalDocument(ProposalId): Observable<any> {
    return this.http.get(this.baseUri + `proposal/GetProposalDocumentList?Id=${ProposalId}`);
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
export class JsonData {
  Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;

  constructor() {
    this.Id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
  }
}
export class CheckProposal {
  Ids: number;
}

export class MappingTempalte {
  MappingTempalteId: any;
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
    this.MappingTempalteId = null;
    this.documentMakerMappingId = null;
    this.deliveryOption = null;
    this.sendToOption = null;
    this.sendToEmail = 'm.azam@exdnow.com';
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
    this.ccEmail = 'm.azam@exdnow.com';
    this.ccEmailOption = null;
  }
}






