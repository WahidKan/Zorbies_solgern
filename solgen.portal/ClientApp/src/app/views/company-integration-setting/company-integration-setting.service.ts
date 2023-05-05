import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyIntegrationSettingService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  GetCompanyIntegrationSettingList(modulename: any, submoduleName: any,  displayType: any) {
    return this.http.get(`${this.baseUri}CompanyIntegrationSetting/GetCompanyIntegrationSetting?moduleName=${modulename}&strType=${submoduleName}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  addEditForm(SettingJsonData: SettingJsonData){
    ;
      return this.http.post(this.baseUri + `CompanyIntegrationSetting/AddEditCompanyIntegrationSetting`, SettingJsonData);
    }
}
export class SettingJsonData {
  CompanyId: string;
  FormJsonData: string;
  ModuleCode: string;
  SubModuleCode: string;
  constructor() {
    this.CompanyId = "";
    this.FormJsonData = "";
    this.ModuleCode = "";
    this.SubModuleCode = "";
  }
}

