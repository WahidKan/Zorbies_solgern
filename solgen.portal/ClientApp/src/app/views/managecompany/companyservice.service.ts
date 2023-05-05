import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public userUri = `${environment.WebApiBaseUrl}Company`;
  pagedData: any;
  masters: any;
  roles: Company[] = [];
  roleModules: CompanyModel[] = [];
  constructor(private http: HttpClient) { }

  GetCompanyList(name: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.userUri}/GetCompanyList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }


  DeleteCompanys(selected: string) {
    return this.http.get(this.baseUri + `Company/DeleteCompanys?companyIds=${selected}`)
  }
  getRoleModules(id = "700") {//
    // // console.log(`${this.roleModuleUri}/GetRoleModule?userTypeId=${id}`);
    return this.http.get(this.baseUri +`Company/GetCompanyModule?userTypeId=${id}`)
      .pipe(
        map((response: any) => {
          this.roleModules = response;
          return true;
        })
      );
  }
  //SaveCompany(company: Company) {
  //  return this.http.post(this.userUri, company)
  //}
  SaveCompany(CompanyUpModel: FormData) {

    return this.http.post(this.baseUri + `Company/AddOrUpdateCompanySetup`, CompanyUpModel);

  }
}


export class ParentModules {
  roleModuleId: string;
  roleModuleModuleName: string;
  constructor(mid: any, mname: any) {
    this.roleModuleId = '';
    this.roleModuleModuleName = '';
    this.roleModuleId = mid; this.roleModuleModuleName = mname;
  }
}
export class CompanyModel {
  roleModuleId: string;
  roleModuleRoleID: string;
  roleModuleModuleID: string;
  roleModuleModuleName: string;
  moduleDisplayOrder: number;
  roleModuleName: string;
  roleModuleAddFlag: boolean;
  moduleRoleModuleAddFlag: boolean;
  roleModuleUpdateFlag: boolean;
  roleModuleReadFlag: boolean;
  roleModuleDeleteFlag: boolean;
  roleModuleNotificationFlag: boolean;
  roleModuleEmailFlag: boolean;
  roleModuleSMSFlag: boolean;
  isEnableAddPermission: boolean;
  isEnableReadPermission: boolean;
  isEnableEditPermission: boolean;
  isEnableDeletePermission: boolean;
  isManageable: boolean;
  moduleParentModuleId: string;
  roleModuleIsViewShared: boolean;
  roleModuleIsViewOwn: boolean;
  roleModuleIsView: string;
  roleModuleIsViewAll: boolean;
  constructor() {
    this.roleModuleId = '';
    this.roleModuleModuleID = '';
    this.roleModuleRoleID = '';
    this.moduleDisplayOrder = 0;
    this.roleModuleName = '';
    this.roleModuleModuleName = '';
    this.roleModuleAddFlag = false;
    this.moduleRoleModuleAddFlag = false;
    this.roleModuleDeleteFlag = false;
    this.roleModuleEmailFlag = false;
    this.roleModuleNotificationFlag = false;
    this.roleModuleReadFlag = false;
    this.roleModuleSMSFlag = false;
    this.roleModuleUpdateFlag = false;
    this.isEnableAddPermission = false;
    this.isEnableReadPermission = false;
    this.isEnableEditPermission = false;
    this.isEnableDeletePermission = false;
    this.isManageable = false;
    this.moduleParentModuleId = '';
    this.roleModuleIsViewShared = false;
    this.roleModuleIsViewOwn = false;
    this.roleModuleIsView = '';
    this.roleModuleIsViewAll = false;
  }
}

export class Company {
  companyId: string;
  companyName: string;
  companyLogo: string;
  firstName: string;
  companyType: any;
  lastName: string;
  email: string;
  companyModuleModel: CompanyModel[];

  constructor() {
    this.companyId = '';
    this.companyName = '';
    this.companyLogo = '';
    this.firstName = '';
    this.companyType = null;
    this.lastName = '';
    this.email = '';
    this.companyModuleModel = [];

  }
}
