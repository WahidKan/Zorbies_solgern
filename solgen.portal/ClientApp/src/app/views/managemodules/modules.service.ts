import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }

  getModuleList(userID: string) {
    return this.http.get(this.baseUri + `Modules?userid=${userID}`);
  }
  getRoleModuleList(isApplyRole: boolean) {
    return this.http.get(this.baseUri + `Modules/getRoleModuleList?isApplyRole=${isApplyRole}`);
  }

}

export class ModuleModel {
  moduleId: any;
  moduleCode: number;
  moduleLinkCode: number;
  moduleName: string;
  moduleRoute: string;
  moduleCssClass: string;
  moduleParentModuleId: any;
  moduleCreatedBy: any;
  moduleCreatedOn: any;
  moduleDisplayOrder: string;
  constructor() {
    this.moduleId = null;
    this.moduleCode = 0;
    this.moduleLinkCode = 0;
    this.moduleName = "";
    this.moduleRoute = "";
    this.moduleCssClass = "";
    this.moduleParentModuleId = null;
    this.moduleCreatedBy = null;
    this.moduleCreatedOn = new Date();
    this.moduleDisplayOrder = "";
  }
}
