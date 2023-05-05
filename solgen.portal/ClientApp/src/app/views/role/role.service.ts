import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private dataUrl = 'assets';
  roles: Role[] = [];
  roleModules: RoleModule[] = [];
  pagedData: any;
  public baseUri = `${environment.WebApiBaseUrl}`;
  public roleModuleUri = `${environment.WebApiBaseUrl}Role`;
  constructor(private http: HttpClient) { }

  getRoleList(RoleName: string, masternameId: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(this.baseUri + `Role/GetRoleList?rolename=${RoleName}&masternameId=${masternameId}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  setRoleStatus(roleId: any, status: any) {
    return this.http.get(this.baseUri + `Role/ChangedRoleStatusById?roleId=${roleId}&roleStatus=${status}`)
  }
  DeleteAllRole(deleteId: any, tableName: any,) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      
  }
  DeleteRole(roleId: any) {
    return this.http.get(this.baseUri + `Role/DeletedRoleById?roleId=${roleId}`)
  }

  checkRoleNameIsExist(pid: string, pname: string) {
    return this.http.get(`${this.roleModuleUri}/CheckRoleNameIsExist?id=${pid}&name=${pname}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getRoleModules(id) {//
    // // console.log(`${this.roleModuleUri}/GetRoleModule?userTypeId=${id}`);
    return this.http.get(`${this.roleModuleUri}/GetRoleModule?userTypeId=${id}`)
      .pipe(
        map((response: any) => {
        this.roleModules = response;
          return true;
        })
      );
  }
  get(filename: string) {
    return this.http.get(`${this.dataUrl}/${filename}`);
  }

  getRoleById(id: string) {
    return this.http.get<Role>(`${this.roleModuleUri}/GetRoleById?id=${id}`)
      .pipe(
      tap(data =>   console.log('Role DAta by Id',data)),
      );
  }
  GetRoleNameForTree(id: string) {
    return this.http.get(`${this.roleModuleUri}/GetRoleNameForTree?id=${id}`);
      
  }
  GetRoleDataByid(id: string) {
    return this.http.get(`${this.roleModuleUri}/GetRoleDataByid?id=${id}`);
      
  } SaveRoledata(json: string) {
    return this.http.post
      (`${this.roleModuleUri}/SaveRole?json=${json}`,null);
      
  }
  getRoletabdata(id: any,roleid:any) {
    return this.http.get(`${this.roleModuleUri}/getRoletabdata?ROLEID=${roleid}&usertypeid=${id}`);
      
  }
  GetServiceUsers(searchtxt, sortColumn, sortDir, pageIndex, pageSize, roleId): Observable<any> {
    return this.http.get(`${this.baseUri}Role/GetUserList?searchtxt=${searchtxt}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&roleId=${roleId}`)
  }
  saveRole(role: Role) {
     // console.log("RolePOST",role);
    return this.http.post(this.roleModuleUri, role)
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
export class RoleModule {
  roleModuleId: string;
  roleModuleRoleID: string;
  roleModuleModuleID: string;
  roleModuleModuleName: string;
  moduleDisplayOrder: number;
  roleModuleName: string;
  roleModuleAddFlag: boolean;
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
    this.isManageable =false;
    this.moduleParentModuleId = '';
    this.roleModuleIsViewShared=false;
    this.roleModuleIsViewOwn = false;
    this.roleModuleIsView= '';
   this. roleModuleIsViewAll=false;
  }
}

export class Role {
  roleId: string;
  roleName: string;
  reportto: string;
  reporttoid: string;
  roleDescription: string;
  roleStatusId: string;
  isRoleAssined: boolean;
  userType: string;
  isDisabled: boolean;
  roleModuleModel: RoleModule[];

  constructor() {
    this.roleId = '';
    this.roleName = '';
    this.reportto = '';
    this.reporttoid = '';
    this.roleDescription = '';
    this.isRoleAssined = false;
    this.isDisabled= false;
    this.roleModuleModel = [];

  }
  
}
export class saveRoleModel {
  roleId: number;
  userTypeId: string;
  roleStatusId: string;
  roleName: string;
  reporttoid : string;
  roleDescription: string;
  privilegesIds: string;
  constructor() {
    this.roleId = 0,
      this.userTypeId = '',
      this.roleStatusId = '',
      this.roleName = '',
      this.reporttoid = '';
      this.roleDescription = '',
      this.privilegesIds=''
  }
}
