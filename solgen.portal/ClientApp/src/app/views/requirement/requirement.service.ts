import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Master } from '../shared/common.service';
@Injectable({
  providedIn: 'root'
})
export class requirementService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  masters: Master[] = [];
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  onDeleteTask(taskId: string, sectionName: string): Observable<any> {

    return this.http.get(`${this.baseUri}Task/DeleteTask?taskID=${taskId}&sectionName=${sectionName}`)
      .pipe(
        map((response: any) => {


          return true;
        })
      );
  }

  GetrequirementList(listFiltertext: any, searchUserType: any, sortColumn: any, sortDir: any, currentPage: any, pageSizeValue: any, loginuserid: any, custom_view_id: any, searchFilter: any, moduleName: any, submoduleName: any, companyId: any, isCheckboxTick: any): Observable<any> {
    ;
    return this.http.get(`${this.baseUri}Requirements/GetrequirementList?nameSearch=${listFiltertext}&moduleName=${moduleName}&submoduleName=${submoduleName}&searchUserType=${searchUserType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${currentPage}&pageSize=${pageSizeValue}&custom_view_id=${custom_view_id}&isAllRecords=${isCheckboxTick}`)

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
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  addEditForm(projectJsonData: projectJsonData) {
    return this.http.post(this.baseUri + `Requirements/AddEditRequirement`, projectJsonData);
  }

  getType(MasterIdAuto: any, SerchText: any,length: any,ID:any,): Observable<any> {  
    return this.http.get(this.baseUri + `Requirements/GetTypeOnBaseRecordType?MasterIdAuto=${MasterIdAuto}&SerchText=${SerchText}&length=${length}&ID=${ID}`);
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
export class projectJsonData {
Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  constructor() {
    this.Id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
  }
}
