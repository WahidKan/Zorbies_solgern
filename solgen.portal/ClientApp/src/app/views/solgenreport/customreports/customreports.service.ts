import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { FormGroup, Form } from '@angular/forms';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Source } from 'webpack-sources';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CustomreportsService {
  public baseUri = `${environment.WebApiBaseUrl}`;




  constructor(private http: HttpClient) { }

  getAllReportList(sortColumn: string, sortOrder: string, page: number, pageSize: number, searchText: string, companyType: string): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetAllReportList?sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageIndex=${page}&pageSize=${pageSize}&searchText=${searchText}&companyType=${companyType}`)
  };

  deleteReport(id: any) {
    return this.http.get(this.baseUri + `workorder/DeleteWorkType?Id=${id}`)
  }

}
