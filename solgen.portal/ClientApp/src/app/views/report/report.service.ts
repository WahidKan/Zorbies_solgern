import { Injectable } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  leaseAmount: any[] = [];
  pagedData: any;

  constructor(private http: HttpClient, private commonService: CommonService, private router: Router) { }

  //function used to fatch Lease Inventory List
  getLeaseInventoryList(expFrom: any, expTo: any, leaseStatus: any, bankName: any, searchText: any, sortColumn: string, sortDir, pageIndex: number, pageSize: number, userId: string) {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Lease/LeaseInventoryList?searchText=${searchText}&expFrom=${expFrom}&expTo=${expTo}&leaseStatus=${leaseStatus}
&bankName=${bankName}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getWelcomePackageTrackingReport(searchText: any, From: any, To: any, sortColumn: string, sortDir, pageIndex: number, pageSize: number, userId: string): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    if (typeof searchText == "undefined" || searchText == null) { searchText = null; }
    else { searchText = encodeURIComponent((searchText)); }
    return this.http.get(this.baseUri + `Contact/WelcomePackageTrackingReport?searchText=${searchText}&From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getTitleWorkReportList(name: any, From: any, To: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, leaseId: string): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(this.baseUri +`Lease/GetTitleWorkRequestReportList?name=${name}&From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}&leaseId=${leaseId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getCustomerLogReportList(name: string, expFrom: any, expTo: any, contactStatus: any, leaseStatus: any, bankName: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Lease/GetCustomerLogReportList?name=${name}&expFrom=${expFrom}&expTo=${expTo}&contactStatus=${contactStatus}&leaseStatus=${leaseStatus}&bankName=${bankName}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getMonthlyLeaseLogList(name: string, expFrom: any, expTo: any, leaseStatus: any, bankName: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Lease/GetMonthlyLeaseLog?name=${name}&expFrom=${expFrom}&expTo=${expTo}&leaseStatus=${leaseStatus}&bankName=${bankName}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getLeaseTrakingReportList(name: string,  expFrom: any, expTo: any, expFundFrom: any, expFundTo: any, leaseStatus: any, bankName: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Report/GetLeaseTrakingReport?name=${name}&expFrom=${expFrom}&expFundFrom=${expFundFrom}&expFundTo=${expFundTo}
&expTo=${expTo}&leaseStatus=${leaseStatus}&bankName=${bankName}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetLeaseTrackingAmount(userid) {
    return this.http.get(this.baseUri + `Report/GetLeaseTrackingAmount?userId=${userid}`)
      .pipe(
        map((response: any) => {
          this.leaseAmount = response;
          return this.leaseAmount;
        })
      );
  }

  getCreditScoreTrackingReportList(name: string, expFrom: any, expTo: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Report/GetCreditScoreTrackingReportList?name=${name}&expFrom=${expFrom}&expTo=${expTo}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getCommssionPaidReportList(name: string, expFrom: any, expTo: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Report/GetCommssionPaidReportList?name=${name}&expFrom=${expFrom}&expTo=${expTo}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getInsuranceTrackingReport(searchText: any, expFrom: any, expTo: any, sortColumn: string, sortDir, pageNo: number, pageSize: number, userId: string): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Report/InsuranceTrackingReport?searchText=${searchText}&expFrom=${expFrom}&expTo=${expTo}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageNo=${pageNo}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
        return true;
        })
      );
  }

  getLeaseVolumeReportList(name: string, expFrom: any, expTo: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string,reportFor:string=""): Observable<any> {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }
    return this.http.get(this.baseUri + `Report/GetLeaseVolumeReportList?expFrom=${expFrom}&expTo=${expTo}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}&reportFor=${reportFor}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
}


