import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService, ModuleNames } from '../shared/common.service';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  //function used to fetch list of Vendors
  getVendorList(name: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string) {
    return this.http.get(this.baseUri + `Vendor/GetVendorList?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
    );
  }

  //function used to set active/inactive status of vendor
  setVendorStatus(tableName: any, primaryKey: any, status: any, moduleName: any, statusName: any) {
    return this.commonService.ActiveInactive(tableName, primaryKey, status, moduleName, statusName);
  }

  //function is used to get detail of  user
  getVendorDetail(id: any) {
    return this.http.get(this.baseUri + `Vendor/GetVendorDetailById?vendorid=${id}`)
  }

  //function is used to delte the  user
  deleteVendor(tableName: any,primaryid:any,moduleName:any) {
    return this.commonService.Delete(tableName, primaryid, moduleName);
  }

  //function is used to add edit vendor
  addEditVendor(vendorModel: VendorModel) {
    // // console.log("SetrviceTest", vendorModel);
    return this.http.post(this.baseUri + `Vendor/AddEditVendor`, vendorModel);
  }

  getVendorDropList() {
    return this.http.get(`${this.baseUri}Vendor/GetVendorDropList`);
  }

  //function is used to get the StateList
  getStateList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetStateList`);

  }
}
export class VendorModel {
  id: string;
  BusinessName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  statusId: string;
  wiringBankName: string;
  wiringRoutingNumber: string;
  wiringAccountNumber: string;
  wiringBankAddress: string;
  wiringBankZipcode: string;
  wiringBankCity: string;
  wiringBankState: string;
  wiringBankCounty: string;
  constructor() {
    this.id = "";
    this.BusinessName = "";
    this.firstName = "";
    this.lastName = "";
    this.phone = "";
    this.email = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zipCode = "";
    this.county = "";
    this.statusId = "";
    this.wiringBankName = "";
    this.wiringAccountNumber = "";
    this.wiringRoutingNumber = "";
    this.wiringBankAddress = "";
    this.wiringBankZipcode = "";
    this.wiringBankCity = "";
    this.wiringBankState = "";
    this.wiringBankCounty = "";
  }
}
