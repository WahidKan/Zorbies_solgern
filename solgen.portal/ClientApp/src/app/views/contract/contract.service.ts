import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  GetContractOpportunityDetail(opportunityId:string){
    return this.http.get(this.baseUri+`Contract/GetContractDetail?opportunityId=${opportunityId}`)
  }
  GetContractList(listFilter: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, widgetType: any, recordFilter: any, teamID: any, teamMemberID: any, isCheckboxTick: any): Observable<any> {
    return this.http.get(`${this.baseUri}Contract/GetContractList?listFilter=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&moduleName=${moduleName}&submoduleName=${submoduleName}&custom_view_id=${custom_view_id}&widgetType=${widgetType}&recordFilter=${recordFilter}&teamID=${teamID}&teamMemberID=${teamMemberID}&isAllRecords=${isCheckboxTick}`)
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
  GetContractDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `Contract/GetContractDetails?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }

  addEditForm(JsonData: JsonData) {
    return this.http.post(this.baseUri + `Contract/AddEditContract`, JsonData);
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

  GetOpportunityList(ContractId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `contract/GetOpportunityList?Id=${ContractId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
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
