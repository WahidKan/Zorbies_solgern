import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  //function used to fetch list of Bank
  getBankList(name: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string) {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(this.baseUri + `Bank/GetBankList?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  //function used to set active/inactive status of Bank
  setBankStatus(tableName: any, primaryKey: any, status: any, moduleName: any, statusName: any) {
    return this.commonService.ActiveInactive(tableName, primaryKey, status, moduleName, statusName);
  }

  //function is used to get detail of  user
  getBankDetail(id: any) {
    return this.http.get(this.baseUri + `Bank/GetBankDetailById?Bankid=${id}`)
  }

  //function is used to delte the  user
  deleteBank(tableName: any,primaryid : any, moduleName: any) {
    return this.commonService.Delete(tableName, primaryid, moduleName);
  }

  //function is used to add edit vendor
  addEditBank(bankModel: BankModel) {
    return this.http.post(this.baseUri + `Bank/AddEditBank`, bankModel);
  }

  getusersBankList(page: number, pageSize: number,bankId: string) {

    return this.http.get(this.baseUri + `Bank/GetUsersBankList?pageIndex=${page}&pageSize=${pageSize}&bankId=${bankId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getBankDropdownList() {
    return this.http.get(`${this.baseUri}Bank/GetBankDropList`);
  }

}

export class BankModel {
  id: string;
  bankName: string;
  city: string;
  county: string;
  stateId: string;
  statusId: string;
  phone: string;
  address: string;
  zipCode: string;
  constructor() {
    this.id = "";
    this.bankName = "";
    this.city = "";
    this.county = "";
    this.stateId = "";
    this.statusId = "";
    this.address = "";
    this.phone = "";
    this.zipCode = "";
  }
}
