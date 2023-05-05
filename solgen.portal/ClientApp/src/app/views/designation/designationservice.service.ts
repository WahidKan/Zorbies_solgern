import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  GetDesignationList(nameSearch: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, searchFilter: string): Observable<any> {

    if (typeof nameSearch == "undefined" || nameSearch == null) { nameSearch = null; }
    else { nameSearch = encodeURIComponent((nameSearch)); }
    return this.http.get(`${this.baseUri}designation/GetDesignationList?nameSearch=${nameSearch}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
/*          return true;*/
        })
      );
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  GetDesignationDetails(id: any, moduleName: any, submoduleName: any,companyId: any, userId: any) {
    return this.http.get(this.baseUri + `designation/GetDesignationById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  addEditForm(JsonData: JsonData) {
    return this.http.post(this.baseUri + `designation/AddEditDesignation`, JsonData);
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
