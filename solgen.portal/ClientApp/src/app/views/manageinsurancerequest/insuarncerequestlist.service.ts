import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectItemModel } from '../shared/common.service';

@Injectable({
  providedIn: 'root'
})
export class InsuarncerequestlistService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public insuranceUri = `${environment.WebApiBaseUrl}ManageInsurance`;
  pagedData: any;
  InsuranceComboList: SelectItemModel[] = [];
  constructor(private http: HttpClient) { }

  getInsuranceList(SearhName: any, listFilter:any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.insuranceUri}/GetInsuranceRequestList?nameSearch=${SearhName}&listFilter=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getInsuranceComboList(): Observable<any> {
       return this.http.get(this.baseUri + `ManageInsurance/GetInsuranceComboList`);
  }
  getInsuranceDetail(LeaseId: any) {
    return this.http.get(this.baseUri + `Lease/GetLeaseDetailForCreateInsuranceRequest?LeaseId=${LeaseId}`)
  }
}


