import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactusleadsService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  
  constructor(private http: HttpClient) { }

  getContactUsLeadsList(listFilter, sortColumn, sortDir, pageNo, pageSize, isForDashboard?:boolean,fromDate :string = null,toDate :string = null): Observable<any> {
    
    return this.http.get(this.baseUri + `SFContactUs/GetContactUsLeadsList?listFilter=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageNo}&pageSize=${pageSize}&isForSuperAdminDashboard=${isForDashboard}&fromDate=${fromDate}&toDate=${toDate}`);
  }
}
