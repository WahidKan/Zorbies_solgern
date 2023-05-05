import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitylogService {
  public activityLogUri = `${environment.WebApiBaseUrl}ActivityLog`;
  pagedData: any;
  constructor(private http: HttpClient) { }
  //function used to fetch list of users
  getActivityLogList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, expFrom: any, expTo: any): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(`${this.activityLogUri}/GetActivityLogList?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}&expFrom=${expFrom}&expTo=${expTo}`)
      .pipe(
      map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

}
export class ActivityLog{
  UserName: string;
  Email: string;
  IPAddress: string;
  OSBrowser: string;
  ActionType: string;
  Detail: string;
  Id: string;
  constructor() {
    this.UserName = "";
    this.Email = "";
    this.IPAddress = "";
    this.OSBrowser = "";
    this.ActionType = "";
    this.Detail = "";
    this.Id = "";
  }
}

