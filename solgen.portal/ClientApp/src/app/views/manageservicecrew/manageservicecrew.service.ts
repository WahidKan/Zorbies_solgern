import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageservicecrewService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  customFieldsList: any;
  leadEditPage: any;

  constructor(private http: HttpClient) { }

  GetServiceCrewList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number, isCheckboxTick: any): Observable<any> {
    return this.http.get(`${this.baseUri}ServiceCrew/GetServiceCrewList?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&custom_view_id=${custom_view_id}&moduleName=${moduleName}&submoduleName=${submoduleName}&isAllRecords=${isCheckboxTick}`)
  }

  addOrUpdateServiceCrew(crewJsonData: serviceCrewJsonData) {
    return this.http.post(this.baseUri + `ServiceCrew/ManageServiceCrew`, crewJsonData);
  }
  DeleteRecords(deleteId: any, tableName: any, ) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.leadEditPage = response;
          return true;
        })
      );
  }
  GetServiceResourcesByServiceCrewId(ServiceCrewId): Observable<any> {
    return this.http.get(`${this.baseUri}ServiceCrewMember/GetServiceResourcesByServiceCrewId/${ServiceCrewId}`)
  }
  GetServiceGetFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
  }
  GetServiceCrewMembersList( sortColumn, sortDir, pageIndex, pageSize, crewId): Observable<any> {
    return this.http.get(`${this.baseUri}ServiceCrewMember/GetServiceCrewMemberListByServiceCrewId?sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&crewId=${crewId}`)
  }
  GetServiceAppointmentList( sortColumn, sortDir, pageIndex, pageSize, crewId): Observable<any> {
    debugger;
    return this.http.get(`${this.baseUri}ServiceCrewMember/GetServiceAppointmentListByServiceCrewId?sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&crewId=${crewId}`)
  }
  
  GetServiceCrewMembersWithResourceType(searchtxt,sortColumn, sortDir, pageIndex, pageSize, crewId): Observable<any> {
    return this.http.get(`${this.baseUri}ServiceCrewMember/GetServiceCrewMembersWithResourceType?searchtxt=${searchtxt}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&crewId=${crewId}`)
  }

  refreshSkillsList(contId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `workorder/GetServiceCrewSkillList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  addOrUpdateServiceCrewMember(crewJsonData: serviceCrewMemberJsonData) {
    return this.http.post(this.baseUri + `ServiceCrewMember/ManageServiceCrewMember`, crewJsonData);
  }
  addOrUpdateFiles(CompanySetUpModel: FormData) {
    return this.http.post(this.baseUri + `workorder/addOrUpdateFiles`, CompanySetUpModel);
  }
}

export class serviceCrewJsonData {
  crewId: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.crewId = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
  }
}

export class serviceCrewMemberJsonData {
  crewMemberId: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.crewMemberId = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
  }
}

export class UsersList {
  name: string;
  value: string;
  constructor() {
    this.name = "";
    this.value = "";
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
