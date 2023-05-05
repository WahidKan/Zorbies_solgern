import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  customFieldsList: any;
  leadEditPage: any;
  pagedData: any;
  constructor(private http: HttpClient) { }


  GetFacebookList(){
    return this.http.get(`${this.baseUri}Campaign/GetFacebookCampaigns`);
  }
  GetFacebookAddSetsList(){
    return this.http.get(`${this.baseUri}Campaign/GetFacebookadsets`);
  }
  GetCampaignlist(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}Campaign/GetCampaignList?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&custom_view_id=${custom_view_id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
  }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType:any) {
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
          this.leadEditPage = response;
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
  addOrUpdateCampaign(campaignJsonData: campaignJsonData) {
    return this.http.post(this.baseUri + `Campaign/AddOrUpdateCampaign`, campaignJsonData);
  }

  GetCampaignMembersList(campaignId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Campaign/GetCampaignMembersList?campaignId=${campaignId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetCampaignProposalsList(campaignId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Campaign/GetCampaignProposalsList?campaignId=${campaignId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetCampaignLeadsList(campaignId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `Campaign/GetCampaignLeadsList?campaignId=${campaignId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }


}

export class campaignJsonData {
  campaignId: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.campaignId = "";
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

export class CampaignTopViewModel {
  ColumnName: string;
  DisplayName: string;
  DisplayOrder: number;
  Value: string;
  ref_value: string;
  field_route: string;
  constructor() {
    this.ColumnName = "";
    this.DisplayName = "";
    this.Value = "";
    this.DisplayOrder = 1;
    this.ref_value= "";
    this.field_route = "";

  }
}
