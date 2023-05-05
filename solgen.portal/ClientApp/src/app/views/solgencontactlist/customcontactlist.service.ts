import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomContactListService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  GetSolgenContactList(listFiltertext: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number, isCheckboxTick: any): Observable<any> {
    if (typeof listFiltertext == "undefined" || listFiltertext == null) { listFiltertext = null; }
    else { listFiltertext = encodeURIComponent((listFiltertext)); }
    return this.http.get(`${this.baseUri}Bank/GetSolgenContactList?listFilter=${listFiltertext}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&isAllRecords=${isCheckboxTick}`)
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
  GetSolgenContactDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `common/GetCustomContactById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          //// // console.log("responseService12", response);
          this.editPage = response;
          return true;
        })
      );
  }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType:any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          ;
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetOpportunityview(opid: any, stageid:any) {
    return this.http.get(`${this.baseUri}bank/GetOpportunityview?opid=${opid}&stageid=${stageid}`);
      
  }
  getopportunitystage() {
    return this.http.get(`${this.baseUri}bank/getopportunitystage`);
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
  addEditForm(JsonData: JsonData, leadid: any, accountid: any, opportunityid:any) {
    return this.http.post(this.baseUri + `Contact/AddEditContact?leadid=${leadid}&accountid=${accountid}&opportunityid=${opportunityid}`, JsonData);
  }


  CheckUserDuplicateORAssociate(email: any) {
    return this.http.get(this.baseUri + `Contact/CheckUserDuplicateORAssociateContact?emailID=${email}`);
  }

  GetCampaignMembersList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `contact/GetOpportuniryByContact?contId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetRelatedAccountForContactList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `contact/GetRelatedAccountForContactList?contId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetCampaignProposalsList(campaignId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Campaign/GetCampaignProposalsList?campaignId=${campaignId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  refreshLeadsList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `contact/GetLeadByContactId?contId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetProposalsListByContactId(contId, sortColumn, sortDir, pageIndex, pageSize) {
    return this.http.get(this.baseUri + `contact/GetProposalsListByContactId?contId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  addOrUpdateFiles(AppointmentSetUpModel: FormData) {
    return this.http.post(this.baseUri + `workorder/addOrUpdateFiles`, AppointmentSetUpModel);
  }

  GetcontractViewFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
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
export class CheckboxData {
  controlname: string;
  controlvalues: string;
  constructor() {
    this.controlname = "";
    this.controlvalues = "";
  }
}


export class lstRelatedModel {
  title: string;
  data: any[];
  constructor() {
    this.title = "";
    this.data = [];
  }
}

export class ContactTopViewModel {
  ColumnName: string;
  DisplayName: string;
  DisplayOrder: number;
  Value: string;
  constructor() {
    this.ColumnName = "";
    this.DisplayName = "";
    this.Value = "";
    this.DisplayOrder = 1;
  }
}
