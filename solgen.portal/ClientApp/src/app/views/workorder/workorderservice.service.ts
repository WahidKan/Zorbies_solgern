import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
@Injectable({
  providedIn: 'root'
})
export class WorkorderService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  pagedDataNewCardView: any;
  customFieldsList:any;
  constructor(private http: HttpClient) { }

  GetWorkOrderList(listFilter: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: string, custom_view_id: string, isCheckboxTick): Observable<any> {

    if (typeof listFilter == "undefined" || listFilter == null || listFilter == "") {
      listFilter = "";
    }
    else {
      //listFilter = encodeURIComponent((listFilter));
      listFilter = listFilter;
    }
    if (typeof loginuserid == "undefined") {
      loginuserid = "";
    }
    if (typeof companyId == "undefined") {
      companyId = "";
    }
    return this.http.post(this.baseUri + `workorder/GetWorkOrderList`, null
      , {
        params: {
          nameSearch: listFilter,
          sortColumn: sortColumn,
          sortDir: sortDir,
          pageIndex: page.toString(),
          pageSize: pageSize.toString(),
          userId: loginuserid,
          moduleName: moduleName,
          submoduleName: submoduleName,
          companyId: companyId,
          custom_view_id: custom_view_id,
          isAllRecords: isCheckboxTick
        }
      })
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
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, OpportunityId: any=null, displayType: string =null) {
    
     return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&RefId=${OpportunityId}&displayCode=${displayType}`)
       .pipe(
         map((response: any) => {
           this.customFieldsList = response;
           return true;
         })
       );
   }

  getViewListCount(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, ModuleName: any, SubModuleName: any, companyId: number) {

    return this.http.get(this.baseUri + `Common/GetCustomViewNameWithCountForWidgets?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  manageWorkOrder(jsonData: JsonData) {
    return this.http.post(this.baseUri + `workorder/manageWorkOrder`, jsonData);
  }
  GetDurationByType(id:number){
    return this.http.get(this.baseUri+`workorder/GetDurationByType?id=${id}`);
  }
  GetWorkOrderAccountDetail(accountId:number){
    return this.http.get(this.baseUri+`workorder/GetWorkOrderAccountDetail?accountId=${accountId}`);
  }
  setNotesToRead(noteid: any) {
    //return this.http.get(`${this.baseUri}/SetNotesToRead?noteid=${noteid}`)
    return this.http.get(this.baseUri + `Notes/SetNotesToRead?noteid=${noteid}`);
  }
  addOrUpdateFiles(workOrderModel: FormData) {

    return this.http.post(this.baseUri + `workorder/addOrUpdateFiles`, workOrderModel);
  }
  GetServiceGetFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
  }

  GetServiceAppointmentList(WorkOrderId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetWorkOrderServiceAppointmentList?Id=${WorkOrderId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetProductRequiredList(WorkOrderId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetWorkOrderProductRequiredList?Id=${WorkOrderId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetEngineeringQuestionData(WorkOrderId): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetEngineeringQuestionData?workOrderId=${WorkOrderId}`);
  }
  GetWorkOrderProposal(WorkOrderId): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetWorkOrderProposal?workOrderId=${WorkOrderId}`);
  }

  GetWorkOrderSumaryData(WorkOrderId): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetWorkOrderSumaryData?workOrderId=${WorkOrderId}`);
  }
  GetOpportunityList(WorkOrderId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetOpportunityList?Id=${WorkOrderId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetWorkOrderLineItemList(WorkOrderId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetWorkOrderLineItemList?workorderid=${WorkOrderId}&sortColumn=${sortColumn}&sortDir=${sortDir}&PageNo=${pageIndex}&pageSize=${pageSize}`);
  }

  fixOrder(fixOrdermodel: fixOrderModel) {
    return this.http.post(this.baseUri + `workorder/AddEditfixOrder`, fixOrdermodel);
  }
  getFixOrderData(workOrderid: any) {
    return this.http.get(`${this.baseUri}workorder/GetFixOrderData?workOrderid=${workOrderid}`)
  }
  updateStatusOrCreateLog(model: StartWorkOrderModel): Observable<any> {
    return this.http.post(this.baseUri + `workorder/updateStatusOrCreateLog`, model);
  }
  GetWorkOrderHistoryList(WorkOrderId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetWorkOrderHistoryList?workorderid=${WorkOrderId}&sortColumn=${sortColumn}&sortDir=${sortDir}&PageNo=${pageIndex}&pageSize=${pageSize}`);
  }
  addeditProductRequired(model: addeditProductRequired) {
    return this.http.post(this.baseUri + `workorder/addeditProductRequired`, model);
  }
  addeditEngineeringQuestionData(model: addeditEngineeringQuestionModel) {
    return this.http.post(this.baseUri + `workorder/AddeditEngineeringQuestionData`, model);
  }
  getAuditReviewData(Id: number, accountId: number) {
    return this.http.get(`${this.baseUri}workorder/WorkOrderAuditReviewData?Id=${Id}&accountId=${accountId}`);
  }
  auditChecklistDetail(checkList_Id: number, Id: number) {
    return this.http.get(`${this.baseUri}serviceappointment/AuditChecklistDetail?checkList_Id=${checkList_Id}&Id=${Id}`);
  }
  getNoteslistCardView(leadid: any, submodulename: any, objectname: any, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.baseUri}Notes/getNoteslistForCardView?leadid=${leadid}&submodulename=${submodulename}&objectname=${objectname}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedDataNewCardView = response;
          return true;
        })
      );
  }

  GetRequirementListingData(AccountNumber: string,name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}workorder/GetProjectRequirementListingData?AccountNumber=${AccountNumber}&name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  }

  GetAutoGenerateLineItemNo(PworkOrderId: any): Observable<any> {
    
    return this.http.get(`${this.baseUri}workorder/GetAutoGenerateLineItemNo?PworkOrderId=${PworkOrderId}`);
  }
 
  getWorkOrderStatusList(): Observable<any> {
    return this.http.get(`${this.baseUri}workorder/getlineItemStatusList`);
  }
  addeditWorkOrderLineItem(model: workOrderLineItemModel) {
    return this.http.post(this.baseUri + `workorder/addeditWorkOrderLineItem`, model);
  }

  
  getLineItemById(id: any): Observable<any> {
  return this.http.get(this.baseUri + `workorder/getLineItemById?id=${id}`);
}

getWorkOrderList(PworkOrderId: any): Observable<any> {
  
  return this.http.get(`${this.baseUri}workorder/getWorkOrderList?PworkOrderId=${PworkOrderId}`);
}

}


export class StartWorkOrderModel {
  workOrderId: string;
  statusId: string;
  moduleName: string;
  submoduleName: string;
  displayType: string;
  constructor() {
    this.workOrderId = '';
    this.statusId = '';
    this.moduleName = '';
    this.submoduleName = '';
    this.displayType = '';
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


export class WorkOrderProposal {
  Id: string;
  SystemSize: string;
  Panels: string;
  Offset: string;
  EnergyPercentage: string;
  ProposalDesignLink: string;
  DesignNotes: string;
  constructor() {
    this.Id = "";
    this.SystemSize = "";
    this.Panels = "";
    this.Offset = "";
    this.EnergyPercentage = "";
    this.ProposalDesignLink = "";
    this.DesignNotes = "";
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

export class fixOrderModel {
  object_id: string;
  departmentId: number;
  departmentSubCategoryId: number;
  fixOrderDescription: string;
  object_name: string;
  object_ref_id: number;

  constructor() {
    this.object_id = '';
    this.departmentId = 0;
    this.departmentSubCategoryId = 0;
    this.fixOrderDescription = '';
    this.object_name = '';
    this.object_ref_id = 0;
  }
}


export class addeditProductRequired {
  ParentRecord: string;
  ProductRequired: string;
  QuantityRequired: string;
  DateDelivered: boolean;
  QuantityUnitOfMeasure: string;
  Id: string;
  WorkOrderId: any;

  constructor() {
    this.ParentRecord = '';
    this.ProductRequired = '';
    this.QuantityRequired = '';
    this.DateDelivered = false;
    this.QuantityUnitOfMeasure = '';
    this.Id = '';
    this.WorkOrderId = null;
  }
}

export class addeditEngineeringQuestionModel {
  workOrderId: string;
  mpuNeeded: string;
  TrenchingNeeded: string;
  RetrofitNeeded: string;
  InterconnectionType: string;
  NumberOfArrays: string;
  RoofMaterial: string;
  RoofTilt: string;
  MidClamps: string;
  EndClamps: string;
  GroundingLugs: string;
  TBolts: string;
  EndCovers: string;
  Splice: string;
  Flashings: string;
  Rail: string;
  RailWeight: string;
  ModuleWeight: string;
  PSF: string;
  TotalWeight: string;
  ENGFirstReviewBy: string;
  ENGFirstReviewDate: string;
  ENGSecondReviewBy: string;
  ENGSecondReviewDate: string;
  //QuantityRequired: string;
  //DateDelivered: boolean;
  //QuantityUnitOfMeasure: string;
  //Id: string;
  //WorkOrderId: any;

  constructor() {
    this.workOrderId = "";
    this.mpuNeeded = '';
    this.TrenchingNeeded = '';
    this.RetrofitNeeded = '';
    this.InterconnectionType = '';
    this.NumberOfArrays = '';
    this.RoofMaterial = '';
    this.RoofTilt = '';
    this.MidClamps = '';
    this.EndClamps = '';
    this.GroundingLugs = '';
    this.TBolts = '';
    this.EndCovers = '';
    this.Splice = '';
    this.Flashings = '';
    this.Rail = '';
    this.RailWeight = '';
    this.ModuleWeight = '';
    this.PSF = '';
    this.TotalWeight = '';
    this.ENGFirstReviewBy = '';
    this.ENGFirstReviewDate = '';
    this.ENGSecondReviewBy = '';
    this.ENGSecondReviewDate = '';
    //this.QuantityRequired = '';
    //this.DateDelivered = false;
    //this.QuantityUnitOfMeasure = '';
    //this.Id = '';
    //this.WorkOrderId = null;
  }
}

export class workOrderLineItemModel {
  lineItem_id: number;
  lineItemNo: string;
  workOrder: number;
  status: number;
  statusText: number;
  completedDate: any;
  subject: string;
  description: string;

  constructor() {
    this.lineItemNo = '';
    this.workOrder = 0;
    this.status = 0;
    this.completedDate = '';
    this.subject = '';
    this.description = '';
    this.lineItem_id = 0;
  }
}
