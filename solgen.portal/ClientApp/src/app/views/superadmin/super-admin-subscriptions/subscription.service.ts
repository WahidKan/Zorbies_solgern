import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor( private HttpClient:HttpClient) { }
  // GetPackageList(){
  //   return this.HttpClient.get(`${this.baseUri}subscription/GetPackageList`);
  // }
  // GetAdOnsList(){
  //   return this.HttpClient.get(`${this.baseUri}subscription/GetAdOnsList`);
  // }
  GetPackage(){
    return this.HttpClient.get(this.baseUri+"subscription/GetPackage")
  }
  GetAddOn(){
    return this.HttpClient.get(this.baseUri+"subscription/GetAddOn")
  }
  GetDiscount(){
    return this.HttpClient.get(this.baseUri+"subscription/GetDiscount")
  }
  CheckEmailDuplicate(Email: any) {
    return this.HttpClient.get(this.baseUri + `subscription/CheckEmailDuplicate?Email=${Email}`);
  }
  AddSubscription(json:string){
    ;
    return this.HttpClient.post(`${this.baseUri}subscription/AddCompanySubscription`,json);
  }
  GetSubscriptionList(sortCol:string,sortOrder:string,totalPage:number,pageNum:number,searchBy:string,searchIndustry:string, isForDashboard?:boolean,fromDate :string = null,toDate :string = null):Observable<any>{
    return this.HttpClient.get(`${this.baseUri}subscription/GetSubscriptionList?sortCol=${sortCol}&sortOrder=${sortOrder}&totalPage=${totalPage}&pageNum=${pageNum}&searchBy=${searchBy}&searchIndustry=${searchIndustry}&isForSuperAdminDashboard=${isForDashboard}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  DeleteSubscription(Id:number){
    return this.HttpClient.get(this.baseUri + `subscription/DeleteSubscription?Id=${Id}`);
  }
  deleteselectedSubs(ids: string):Observable<any> {
    return this.HttpClient.post(`${this.baseUri}subscription/deleteselectedSubs`, null, {
      params: { ids },
    });
  }
  GetResetPassword(email:string):Observable<any>
  {
   return this.HttpClient.get(this.baseUri+`subscription/GetResetPassword?email=${email}`);
  }

}
