import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailtrackingService {

  public emailTrackUri = `${environment.WebApiBaseUrl}EmailTrack`;
  pagedData: any;
  constructor(private http: HttpClient) { }


  getEmailTrackingList(From: any, To: any, sortColumn: string, sortDir, page: number, pageSize: number,type:number): Observable < any > {
      if(typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(`${this.emailTrackUri}/EmailTrackingList?From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&type=${type}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
}

export class EmailTrackModel {
  emailTrackId: string;
  emailSubject: string;
  emailFrom: string;
  emailTo: string;
  createdOn: string;
  
  constructor() {
    this.emailTrackId = "";
    this.emailSubject = "";
    this.emailFrom = "";
    this.emailTo = "";
    this.createdOn = "";
  }
}
