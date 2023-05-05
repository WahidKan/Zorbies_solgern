import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomfieldService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  AddEditCustomField(customFieldModel: CustomFieldModel) {
    // // console.log("customFieldModel", customFieldModel);
    return this.http.post(this.baseUri + `Bank/AddEditCustomField`, customFieldModel);
  }
  GetCustomFieldDetail(id: any) {
    return this.http.get(this.baseUri + `Bank/GetCustomFieldDetail?id=${id}`)
  }
  GetCustomFieldList(moduleId: string, SubModuleId: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(this.baseUri + `Bank/GetCustomFieldList?moduleId=${moduleId}&SubModuleId=${SubModuleId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
}



export class CustomFieldModel {
  moduleName: string;
  subModuleName: string;
  fieldName: string;
  custText: string;
  custInteger: string;
  custDecimalLength: string;
  CustLogInterger: string;
  description: string;
  custUrl: string;
  custSelectList: string;
  id: string;
  isRequired: string;
  dataTypeCode: string;
  decimalPlaceValue: string;
  constructor() {
    this.moduleName = "";
    this.subModuleName = "";
    this.fieldName = "";
    this.custText = "";
    this.custInteger = "";
    this.custDecimalLength = "";
    this.CustLogInterger = "";
    this.description = "";
    this.custUrl = "";
    this.custSelectList = "";
    this.id = "";
    this.isRequired = "";
    this.dataTypeCode = "";
    this.decimalPlaceValue = "";
  }
}
