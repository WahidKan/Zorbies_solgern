import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  constructor(private http: HttpClient) { }

  GetLocationList(nameSearch: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, searchFilter: string): Observable<any> {
    if (typeof nameSearch == "undefined" || nameSearch == null) { nameSearch = null; }
    else { nameSearch = encodeURIComponent((nameSearch)); }
    return this.http.get(`${this.baseUri}location/GetLocationList?nameSearch=${nameSearch}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}`);
   }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any,  displayType: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
  GetLocationDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `location/GetLocationById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  addEditForm(JsonData: JsonData) {
    return this.http.post(this.baseUri + `location/AddEditLocation`, JsonData);
  }

  CheckLocationAssigned(locationId: any) {
    return this.http.get(this.baseUri + `location/CheckLocationAssigned?locationId=${locationId}`).toPromise();
  }
  CheckServiceTerritory(locationId: any) {
    return this.http.get(this.baseUri + `location/CheckServiceTerritory?id=${locationId}`);
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

  GetLocationNameAlreadyExist(model: CheckLocationName) {
    return this.http.post(`${this.baseUri}location/CheckLocationNameExist`,model);
  }

  //GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: any) {
  //  return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
  //    .pipe(
  //      map((response: any) => {
  //        this.customFieldsList = response;
  //        return true;
  //      })
  //    );
  //}
}

export class CheckLocationName {
  ID: number;
  LocationName: string;

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

export class CheckboxData {
  controlname: string;
  controlvalues: string;
  constructor() {
    this.controlname = "";
    this.controlvalues = "";
  }
}
export class CampaignTopViewModel {
  ColumnName: string;
  DisplayName: string;
  DisplayOrder: number;
  Value: string;
  constructor() {
    this.ColumnName = "";
    this.DisplayName = "";
    this.Value = "";
    this.DisplayOrder = 1;
  }
}
