import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatemanagementService {
  public baseUri = `${environment.WebApiBaseUrl}`; 
  pagedData: any;
  constructor(private http: HttpClient) { }
  GetStateManagementList(name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> { 
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}loan/GetStateManagementList?nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
}
