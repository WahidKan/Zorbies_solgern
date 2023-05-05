import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WhatsnextService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public whatsNextUri = `${environment.WebApiBaseUrl}WhatsNext`;
  pagedData: any;
  currentUrl: string;
  previousUrl: string;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  //Get previous url
  public getPreviousUrl() {
    return this.previousUrl;
  }   
  getContactList(name: any, From: any, To: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, isDashBoard: boolean): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(`${this.whatsNextUri}/GetCustomersWithLease?name=${name}&From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}&isDashBoard=${isDashBoard}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getWhatsNextDetail(id: string): Observable<WhatsNext> {
    if (id === null) {
      return of(this.initializeWhatsNext());
    }
    return this.http.get<WhatsNext>(`${this.whatsNextUri}/${id}`);
  }


  private initializeWhatsNext(): WhatsNext {
    // Return an initialized object
    return {
      leaseNumber: null,
      leaseId: null,
      contactBussinessName: null,
      contactName: null,
      WhatNextStep: null,
      WhatNextDesc: null,
      WhatNextStatus: null,
      ContactCreatedOn: null,
      icon: null,
      whatNextRecentStatus:null,
    };
  }
}

export class WhatsNext {
  leaseNumber: string;
  leaseId: string;
  contactBussinessName: string;
  contactName: string;
  WhatNextStep: string;
  WhatNextDesc: string;
  WhatNextStatus: string;
  ContactCreatedOn: any;
  icon: any;
  whatNextRecentStatus:any;
}



