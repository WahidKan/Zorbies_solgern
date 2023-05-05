import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadlistService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  constructor(private http: HttpClient) { }

  GetLeadlist(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number, widgetType: any, recordFilter: any, teamID: any, teamMemberID: any, isCheckboxTick: any): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name));  }

    typeof widgetType == "undefined" || widgetType == null ?  widgetType = null : widgetType ; 
    typeof recordFilter == "undefined" || recordFilter == null ?  recordFilter = null : recordFilter ; 
    typeof teamID == "undefined" || teamID == null ?  teamID = null : teamID ; 
    typeof teamMemberID == "undefined" || teamMemberID == null ?  teamMemberID = null : teamMemberID ; 
     
    return this.http.get(`${this.baseUri}Bank/GetLeadlist?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&widgetType=${widgetType}&recordFilter=${recordFilter}&teamID=${teamID}&teamMemberID=${teamMemberID}&isAllRecords=${isCheckboxTick}`)
  } 
  SendBack(LeadId:any){
    return this.http.get(`${this.baseUri}lead/SendBack?LeadId=${LeadId}`)
  }
  GetLeadListing() {
    return this.http.get(`${this.baseUri}Common/GetLeadListing`)
     

  }
  GetLeadAccountdata(leadid: any, submoduleid: any, objectname:any) {
    return this.http.get(`${this.baseUri}lead/GetLeadAccountdata?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`)


  }
  GetLeadappointments(leadid: any, submoduleid: any, objectname: any) {

    return this.http.get(`${this.baseUri}lead/GetLeadappointments?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`)


  }
  deleteAssociateproduct(id: any, leadid: any, submoduleid: any, objectname: any) {

    return this.http.get(`${this.baseUri}lead/DeleteAssociateProductbyid?id=${id}&leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`);
  }
  
  GetProductList(leadid: any, submoduleid: any, objectname: any, name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    //;
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}lead/GetProductList?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}&nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  AssociteProduct(productids: any, leadid: any, submoduleid: any, objectname: any, isLoanapp: boolean) {

    return this.http.get(`${this.baseUri}lead/AssociteProduct?productids=${productids}&leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}&isLoanapp=${isLoanapp}`)
  }

  GetAssociateProductList( leadid:any, submoduleid:any,objectname:any,name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}lead/GetAssociateProductList?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}&nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
        
  saveNotes(notes: noteModel) {
    return this.http.post(this.baseUri + `lead/saveNotes`, notes);
  }
  getLeadConvertModuleWizard() {
    return this.http.get(`${this.baseUri}lead/getLeadConvertModuleWizard`);
  }
  getNoteslist(leadid: any, submoduleid: any, objectname: any, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.baseUri}lead/getNoteslist?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }


  DeleteRecords(deleteId: any, tableName: any, ) {
   
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }


  getLeadSMSlist(leadid: any, submoduleid: any, objectname: any, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.baseUri}lead/getLeadSMSlist?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getEmaillist(leadid: any, submoduleid: any, objectname: any, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {

    return this.http.get(`${this.baseUri}lead/getEmaillist?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  DeleteNote(id: any, leadid: any, submoduleid: any, objectname: any) {
 
    return this.http.get(`${this.baseUri}lead/DeleteNote?id=${id}&leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`);
  }
  Deleteimage(id: any) {
 
    return this.http.get(`${this.baseUri}lead/Deleteimage?id=${id}`);
  }
  DeleteContact(id: any, leadid: any, submoduleid: any, objectname: any) {
 
    return this.http.get(`${this.baseUri}lead/DeleteContact?id=${id}&leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`);
  }

  saveEmail(email: emailModel) {
    return this.http.post(this.baseUri + `lead/saveEmail`, email);
  }
  saveUploadimage(imagepath:any,leadid: any, submoduleid: any, objectname: any) {
    return this.http.get(`${this.baseUri}lead/DeleteNote?imagepath=${imagepath}&leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`);
  }
  updateLeadStatus(leadstatus:any,leadid: any) {
    return this.http.get(`${this.baseUri}lead/updateLeadStatus?leadstatus=${leadstatus}&leadid=${leadid}`);
  }
  updatecreatedBy(ownerid: any, leadid: any) {
    return this.http.get(`${this.baseUri}lead/updatecreatedBy?ownerid=${ownerid}&leadid=${leadid}`);
  }
  getContactList(leadid: any, submoduleid: any, objectname: any, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.baseUri}lead/getContactList?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  saveLeadConvert(leadmodel: leadConvertModel) {
    return this.http.post(this.baseUri + `lead/saveLeadConvert`, leadmodel);

  }
  saveLeadConvertopportunity(leadmodel: leadConvertModelOpportunity) {
    return this.http.post(this.baseUri + `lead/saveLeadConvertopportunity`, leadmodel);

  }
  saveLeadConvertproduct(leadmodel: leadConvertModel) {
    return this.http.post(this.baseUri + `lead/saveLeadConvertproduct`, leadmodel);

  }
  getLeadConvertData(leadid: any) {
    return this.http.get(`${this.baseUri}lead/getLeadConvertData?leadid=${leadid}`)
  }
  getImages(leadid: any, submoduleid: any) { 
    return this.http.get(`${this.baseUri}lead/getImages?leadid=${leadid}&submoduleid=${submoduleid}`)
  }
  isValueDuplicate(type: any, refString: any) { 
    return this.http.get(`${this.baseUri}Contact/IsValueDuplicate?type=${type}&refString=${refString}`);
  }
  GetContactDll(leadid: any, submoduleid: any, objectname: any) {
    return this.http.get(`${this.baseUri}lead/GetContactDll?leadid=${leadid}&submoduleid=${submoduleid}&objectname=${objectname}`)
  }
  GettemplatetDll(objectname: any) {
    return this.http.get(`${this.baseUri}EmailTemplate/GettemplatetDll?objectname=${objectname}`)    
  }
  checkRequiredDataOnLeadConvert(leadId: any): Observable<any> {
    
    return this.http.get(this.baseUri +`Lead/CheckRequiredDataOnLeadConvert?leadId=${leadId}`);  
  }
  getLeadById(leadId: any, ismobile: any): Observable<any> {
    return this.http.get(this.baseUri +`Lead/GetLeadById?leadId=${leadId}&ismobile=${ismobile}`);  
  }
  
  getMandatoryDocumentsByLoanId(loanId: any): Observable<any> {
    return this.http.get(`${this.baseUri}Lead/GetMandatoryDocumentsByLoanId/${loanId}`)
  }
  GetAppointmentViewFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
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

  getViewListCount(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, ModuleName: any, SubModuleName: any, companyId: number) {

    return this.http.get(this.baseUri + `Common/GetCustomViewNameWithCountForWidgets?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }


  GetLeadConvertAccountDll(id: any, length: any, serchText: string) {
    return this.http.get(`${this.baseUri}Lead/GetLeadConvertAccountDll?id=${id}&length=${length}&serchText=${serchText}`);
  }
  GetLeadConvertContactDll(id: any, length: any, serchText: string, isLead: boolean) {
    return this.http.get(`${this.baseUri}Lead/GetLeadConvertContactDll?id=${id}&length=${length}&serchText=${serchText}&isLead=${isLead}`);
  }
}
            

export class noteModel {
  note_id: number;
  note_name: string;
  note_description: string;
  object_name: string;
  object_id: number;
  object_ref_id: number;
  isPrivate: boolean;


 
  constructor() {
    this.note_id = 0;
    this.note_name = '';
    this.note_description = '';
    this.object_name = '';
    this.object_id = 0;
    this.object_ref_id = 0;
    this.isPrivate = false;

   
  }
}

export class emailModel {
  sent_to: string;
  description: string;
  contactid: number;
  templateid: number;

  object_name: string;
  object_id: number;
  object_ref_id: number;
  subject: string;
 


  constructor() {
    this.sent_to = '';
    this.description = '';
    this.subject = '';  
    this.object_name = '';
    this.object_id = 0;
    this.object_ref_id = 0;
    this.contactid = 0;
    this.templateid = 0;
  }

}

export class leadConvertModel {
  account_name: string;
  account_type_id: string;
  opportunity_name: string;
  productid: string;
  contactid: string;
  object_name: string;
  object_id: number;
  object_ref_id: number;
  loanid: string;



  constructor() {
    this.account_name = '';
    this.account_type_id = '';
    this.opportunity_name = '';
    this.object_name = '';
    this.object_id = 0;
    this.object_ref_id = 0;
    this.contactid = '';
    this.productid = '';
    this.loanid = '';

  }
}
export class leadConvertModelOpportunity {


  Account: string;
  accountName: string;
  accountid: string;
  accounttypeid: string;
  contact: string;
  contactidform: string;
  email: string;
  firstName: string;
  lastName: string;
  opportunityname: string;
  phone: string;
  object_name: string;
  object_id: string;
  product:any;
  productFamily:any;
  isApplicableForLoan:any;
  object_ref_id: number;
  state:number=0;
  
  constructor() {


    this.Account = '';
    this.accountName = '';
    this.accountid = '';
    this.accounttypeid = '';
    this.contact = '';
    this.contactidform = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.opportunityname = '';
    this.phone = '';
    this.object_name = '';
    this.object_id = '';
    this.object_ref_id = 0;
  }
}
