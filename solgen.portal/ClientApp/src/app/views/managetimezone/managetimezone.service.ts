import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';


@Injectable({
  providedIn: 'root'
})
export class ManagetimezoneService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }

  GetTimezoneListingData(name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}workorder/GetTimezoneListingData?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  }
  addeditTimezone(timezoneModel: timezoneModel) {
    return this.http.post(this.baseUri + `workorder/AddEditTimezone`, timezoneModel);
  }

}
export class timezoneModel {
  Id: string;
  timeZone: string;
  status: string;
  constructor() {
    this.Id = "";
    this.timeZone = "";
    this.status = '';
 
  }
}
