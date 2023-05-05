import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root'
})
export class CalllogdetailService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  pagedataGraph: any;
  constructor(private http: HttpClient, private commonService: CommonService, private router: Router) { }

  GetCallLogDetilList(accountId: any, contactId: any, vendor: any, hasRecaoding: any, fromNumber: any, ToNumber: any, From: any, To: any, sortColumn: any, sortDir: any, pageSizeValue: any, pageSize: any, isExport: boolean) {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(this.baseUri + `Report/CallLogList?accountId=${accountId}&contactId=${contactId}&vendor=${vendor}&hasRecaoding=${hasRecaoding}
&fromNumber=${fromNumber}&ToNumber=${ToNumber}&
From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageSizeValue=${pageSizeValue}&pageSize=${pageSize}&isExport=${isExport}`)
    
  }
  ClickToDownload(recaodingPath: any, accountId: any) {
    return this.http.get(this.baseUri + `Account/DownloadRingCentralRecaoding?recaodingPath=${recaodingPath}&accountId=${accountId}`, { responseType: 'blob' });
  }
}
