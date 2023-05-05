import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TextboxQuestion, CustomFormBase, DropdownQuestion } from '../shared/custom-field/customfield.service';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any;
  editPage: any;
  leadEditPage: any;
  constructor(private http: HttpClient) { }


  GetEmployeeList(name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}Bank/GetEmployeeList?listFilter=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}`)

    //return this.http.get(`${this.baseUri}Bank/GetLeadlist?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
    //  .pipe(
    //    map((response: any) => {
    //      this.pagedData = response;
    //      return true;
    //    })
    //  );
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
  GetEmployeeDetail(id: any, modulename: any, submoduleName: any) {
    return this.http.get(this.baseUri + `Bank/GetEmployeeDetailById?id=${id}&moduleName=${modulename}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          //// // console.log("responseService12", response);
          this.editPage = response;
          return true;
        })
      );
  }
}
