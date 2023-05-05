import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsertypeserviceService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public userUri = `${environment.WebApiBaseUrl}UserProfile`;
  pagedData: any;
  constructor(private http: HttpClient) { }

  addeditUserType(userTypeModel: UserType) {
    return this.http.post(this.baseUri + `UserProfile/AddUpdateUserType`, userTypeModel);
  }

  GetUserTypeList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}UserProfile/GetUserTypeList?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  //function is used to delete the  user
  deleteUserType(id: any) {
    return this.http.get(this.baseUri + `UserProfile/DeleteUserType?id=${id}`)
  }

  //function is used to get detail of  user
  getUserTypeDetail(id: any) {
    return this.http.get(this.baseUri + `UserProfile/GetUserTypeDetailById?Id=${id}`)
  }
  GetModuleSubmoduleList(id:any) {
    return this.http.get(this.baseUri + `UserProfile/GetModuleSubmoduleList?id=${id}`)
  }
}

export class UserType {
  MasterValue: string;
  MasterStatusId: any;
  MasterId: string;
  MasterDescription: string;
  subModuleid: string;
  constructor() {
    this.MasterValue = "";
    this.MasterStatusId = "";
    this.MasterDescription = "";
    this.MasterId = "";
    this.subModuleid = "";
  }
}
