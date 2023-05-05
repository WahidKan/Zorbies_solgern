import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoantermserviceService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient) { }

  GetLoanTermList(name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}Loanterm/GetLoanTermList?nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetBankDll() {

    return this.http.get(this.baseUri + `Loanterm/GetBankDll`);

  }
  addeditLoanTerm(loan: LoanTermModel) {
    // // console.log(loan);
    return this.http.post(this.baseUri + `Loanterm/SaveLoan`,loan);
  }
  GetLoanTermById(Id: string) {
    return this.http.get(`${this.baseUri}Loanterm/GetLoanTermById?Id=${Id}`);
      
  }
  DeleteLoanterm(id: any) {
    return this.http.get(`${this.baseUri}Loanterm/DeleteLoanTermById?id=${id}`);
  }
}
export class LoanTermModel {
  id: string;
  Code: string;
  Description: string;
  Term: string;
  Apr: string;
  DealerFee: string;
  LenderID: string;
  constructor() {
    this.id = '',
      this.Code = '',
      this.Description = '',
      this.Term = '',
      this.Apr,
      this.DealerFee = '',
      this.LenderID=''
  }
}
