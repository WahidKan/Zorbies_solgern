import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueueserviceService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any;
  userList: any;
  editPage: any;
  constructor(private http: HttpClient) { }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetUsersList(companyId: any, Id: any) {
    return this.http.get(`${this.baseUri}Queue/GetUsersList?companyId=${companyId}&PrimaryId=${Id}`)
      .pipe(
        map((response: any) => {
          this.userList = response;
          return true;
        })
      );
  }



  addEditForm(jsonData: JsonData) {
    return this.http.post(this.baseUri + `Queue/AddEditQueue`, jsonData);
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

  GetQueueList(listFilter: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string): Observable<any> {
    if (typeof listFilter == "undefined" || listFilter == null) { listFilter = null; }
    else { listFilter = encodeURIComponent((listFilter)); }
    return this.http.get(`${this.baseUri}Queue/GetQueueList?listFilter=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}`)
  }

  GetQueueUserList(listuserFilter: string, sortColumnUserList: string, sortDirUserList: string, currentPageUserList: number, pageSizeValueUserList: number, id: string): Observable<any> {
    if (typeof listuserFilter == "undefined" || listuserFilter == null) { listuserFilter = null; }
    else { listuserFilter = encodeURIComponent((listuserFilter)); }
    return this.http.get(`${this.baseUri}Queue/GetQueueUserList?listFilter=${listuserFilter}&sortColumn=${sortColumnUserList}&sortDir=${sortDirUserList}&pageIndex=${currentPageUserList}&pageSize=${pageSizeValueUserList}&primaryKey=${id}`)
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
  selecteddata: any = []; 
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
