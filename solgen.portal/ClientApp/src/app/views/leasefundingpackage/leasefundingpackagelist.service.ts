import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';
import { map, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeasefundingpackagelistService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient, private commonService: CommonService) { }

  getLeaseFundingPackageList(searchText: any, leaseStatus: any, saleMan: any, expFrom: any, expTo: any, commFrom: any, commTo: any, sortColumn: string, sortDir, pageIndex: number, pageSize: number, userId: string, isDashboard: boolean, contactId: any) {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }

    if (typeof commFrom == "undefined" || commFrom == null) { commFrom = null; }
    else { commFrom = commFrom.toDateString(); }

    if (typeof commTo == "undefined" || commTo == null) { commTo = null; }
    else { commTo = commTo.toDateString(); }

    return this.http.get(this.baseUri + `LeaseFunding/GetFundingPackageList?searchText=${searchText}&leaseStatus=${leaseStatus}&saleMan=${saleMan}&expFrom=${expFrom}&expTo=${expTo}&commFrom=${commFrom}&commTo=${commTo}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}&contactId=${contactId}`)
      .pipe(
        map((response: any) => {
        this.pagedData = response;
          return true;
        })
      );
  }
  approveLeaseForBankUser(leaseId: any) {
    return this.http.post(`${this.baseUri}LeaseFunding/ChangeLeaseStatusForApprove?leaseId=${leaseId}`, leaseId);
  }
}
