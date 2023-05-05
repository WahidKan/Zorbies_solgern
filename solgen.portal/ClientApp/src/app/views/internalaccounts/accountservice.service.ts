import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  GetAccountsList(isCustomerList: boolean,isSubDealerList: boolean,listFilter: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, isCheckboxTick: any): Observable<any> {
    ;
    if (typeof listFilter == "undefined" || listFilter == null) { listFilter = null; }
    else { listFilter = encodeURIComponent((listFilter)); }
    return this.http.get(`${this.baseUri}Bank/GetAccountsList?isCustomerList=${isCustomerList}&isSubDealerList=${isSubDealerList}&nameSearch=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&isAllRecords=${isCheckboxTick}`)
  }
  GetAccountsListByBank(listFilter: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string): Observable<any> {
    if (typeof listFilter == "undefined" || listFilter == null) { listFilter = null; }
    else { listFilter = encodeURIComponent((listFilter)); }
    return this.http.get(`${this.baseUri}Bank/GetBankListNew?nameSearch=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}`)
  }

  GetAccountDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `common/GetAccountById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  CheckUserDuplicateORAssociate(email: any, uid: any) {
    return this.http.get(this.baseUri + `Dashboard/CheckUserDuplicateORAssociate?emailID=${email}&uid=${uid}`);
  }
  AssociateUserWithCompany(email: any, uid: any, RoleID: any, userTypeId: any, PrimaryKey: any) {
    return this.http.post(this.baseUri + `Dashboard/AssociateUserWithCompany?emailID=${email}&uid=${uid}&RoleID=${RoleID}&userTypeId=${userTypeId}&PrimaryKey=${PrimaryKey}`, null);
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: string) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
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
  AppeoveAccount(deleteId: any, tableName: any) {
    return this.http.get(this.baseUri + `common/ApproveAccount?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
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

  DisabledAccount(deleteId: any, tableName: any) {
    return this.http.get(this.baseUri + `common/DisabledAccount?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  //addEditForm(JsonData: JsonData) {
  //  return this.http.post(this.baseUri + `Lease/AddEditAccount`, JsonData);
  //}
  addEditForm(JsonData: FormData) {
    return this.http.post(this.baseUri + `Lease/AddEditAccount`, JsonData);
  }
  GetFileUploadSource(file:any) {
    return this.http.get(this.baseUri + `Lease/GetFileUploadSource?file=${file}`);

  }
  GetFileSource(loanid: any = 0, type:string) {
    return this.http.get(this.baseUri + `loan/GetFileSource?loanid=${loanid}&type=${type}`);
  }
  CheckDealerCompanyName( accountid:any, delarcompanyName:any) {
    return this.http.get(this.baseUri + `Lease/CheckDealerCompanyName?accountid=${accountid}&dealerCompanyName=${delarcompanyName}`);
  }
  GetAccounDetails(id: any) {
    return this.http.get(this.baseUri + `Dashboard/GetAccounDetails?Id=${id}`)
  }
  getRoleListForEnableLogin(accountId) {
    return this.http.get(this.baseUri + `Dashboard/GetRoleListForEnableLogin?accountId=${accountId}`)
  }
  ContactList(listFilter: any, sortColumn: any, sortDir: any, page: any, pageSizeValue: any, loginuserid: any, accountId: any) {
    return this.http.get(this.baseUri + `Dashboard/GetContactList?listFilte=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSizeValue}&userId=${loginuserid}&accountId=${accountId}`);
  }

  RelatedContactList(listFilter: any, sortColumn: any, sortDir: any, page: any, pageSizeValue: any, loginuserid: any, accountId: any) {
    return this.http.get(this.baseUri + `Dashboard/GetRelatedContactList?listFilter=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSizeValue}&userId=${loginuserid}&accountId=${accountId}`)
     .pipe(
       map((response: any) => {
         this.pagedData = response;
         return true;
       })
     );
  }
  addOrUpdateManageStatusForAccountDetails(loanproductModel: FormData, accountId:any) {
    return this.http.post(this.baseUri + `Dashboard/AddUpdateEnableLogin`, loanproductModel, accountId);

  }
  ClickToDownload(recaodingPath:any,accountId:any) {
    return this.http.get(this.baseUri + `Account/DownloadRingCentralRecaoding?recaodingPath=${recaodingPath}&accountId=${accountId}`, { responseType: 'blob' });
  }
  getFile(uri: string) {
    //const options = { responseType: 'blob' }; there is no use of this
    //let uri = '/your/uri';
    return this.http.get(uri);
  }
  GetAccountsOppoutunityList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountOppoutunitiesList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetAccountsCommunicationList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountsCommunicationList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAccountsContractList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountContractsList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAccountsContactList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountContactsList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAccountsProposalsList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountProposalsList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAccountsWorkOrderList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountWorkOrdersList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAccountsServiceAppointmentsList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountServiceAppointmentsList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAccountsJurisdictionList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountsJurisdictionList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetAccountsProductsList(accountId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Account/GetAccountsProductsList?accountId=${accountId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetJurisdictionById(documentId: any): Observable<any> {
    return this.http.get(`${this.baseUri}Account/GetJurisdictionById?documentId=${documentId}`);
  }
  AddeditJurisdictionAccount(JurisdictionModel: JurisdictionModel) {
    ;
    return this.http.post(this.baseUri + `Account/AddeditJurisdictionAccount`, JurisdictionModel);//AddeditRequirement
  }

  GetFundingStageCityData(accountId: any) {
    return this.http.get(this.baseUri + `Account/GetFundingStageCityData?accountId=${accountId}`);
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
  AccountType:string;
  constructor() {
    this.Id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
    this.AccountType = "";
  }

}

export class JurisdictionModel {

  Id: string;
  JurisdictionId: string;
  Account: string;
  Type__c: string;
  Notes__c: string;
  Update__c: boolean;
  constructor() {
    this.Id = "";
    this.JurisdictionId = "";
    this.Account = "";
    this.Type__c = "";
    this.Notes__c = "";
    this.Update__c = false;

  }
}
