import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';
import { map, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VendorleaserequestlistService {
  masters: VendorDrop[] = [];
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient, private commonService: CommonService) { }

  getVendorList() {

    return this.http.get(this.baseUri + `Vendor/GetVendorListForDropDown?vendor=${true}`).pipe(
      map((response: any) => {
        this.masters = response;

      })
    );
  }
  GetTitlWorkRequest(leaseId: any) {
    return this.http.get(this.baseUri + `Lease/GetTitleWorkRequestByLeaseId?leaseId=${leaseId}`);
  }
  SearchVendorLeaseRequestLease(searchText: any, leaseStatus: any, sortColumn: string, sortDir, pageIndex: number, pageSize: number, userId: string,  contactId: any) {
    return this.http.get(this.baseUri + `Vendor/GetVendorLeaseRequestList?searchText=${searchText}&leaseStatus=${leaseStatus}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}&contactId=${contactId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
}
export class VendorDrop {
  value: string;
  text: string;
  constructor() {
    this.value = "";
    this.text = "";
  }
}
