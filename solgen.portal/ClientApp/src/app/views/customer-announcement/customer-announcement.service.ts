import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerAnnouncementService {
  api= '/api'
  constructor(private httpClient: HttpClient) { }

  AddEditCusAnnouncement(Id: number, model: CustomerA): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Id", Id.toString());
    queryParams = queryParams.append("model", JSON.stringify(model));
    return this.httpClient.post(this.api + `/CustomerAnnouncement/AddEditCustomerAnnouncement`, null, { params: queryParams});
  }
  DeleteCustomerAnnouncement(id: number) {
    return this.httpClient.get(this.api + `/CustomerAnnouncement/DeleteCustomerAnnouncement?id=${id}`);
  }
  GetCustomerAnnouncementById(id: number) {
    return this.httpClient.get(this.api+`/CustomerAnnouncement/GetCustomerAnnouncementById?id=${id}`);
  }
  GetCustomerAnnouncementList(pageNo:number,totalPage:number,sortCol:string,sortDir:string,seacrh:string)
  {
    return this.httpClient.get(this.api+`/CustomerAnnouncement/GetCustomerAnnouncementList?pageNo=${pageNo}&totalPage=${totalPage}&sortCol=${sortCol}&sortDir=${sortDir}&seacrh=${seacrh}`);
  }
}
class CustomerA {
  id: number;
  title: string;
  text: string;
  url: string;
  description: string;
  recuringType: string;
  startDate: string;
  endDate: string;
  userType: string;
  statusId: number;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
}
