import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SaleforcesyncstatusService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient) { }
  getSaleforceSyncStatusList(objectName: string, name: string, createdByName: string, startDate: string, endDate: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}SalesforceSyncObject/GetSalesforceSyncObjectList?objectName=${objectName}&name=${name}&createdByName=${createdByName}&startDate=${startDate}&endDate=${endDate}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
}
