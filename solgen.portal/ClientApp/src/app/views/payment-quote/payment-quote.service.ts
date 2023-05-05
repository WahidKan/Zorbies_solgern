import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LeaseForm } from '../managelease/managelease.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentQuoteService {
  public paymentQuoteUri = `${environment.WebApiBaseUrl}PaymentQuote`;
  pagedData: any;

  constructor(private http: HttpClient) { }

  savePaymentQuote(paymentQuote: PaymentQuote) {
    paymentQuote.leases[0].leaseOtherDescription = paymentQuote.leases[0].leaseOtherDescription == "" ? "-" : paymentQuote.leases[0].leaseOtherDescription;
    return this.http.post(this.paymentQuoteUri, paymentQuote);
  }

  getContactId(email: any): Observable<any> {
    return this.http.get(`${this.paymentQuoteUri}/GetContactId?email=${email}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getPaymentQuoteList(name: any, From: any, To: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof From == "undefined" || From == null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To == null) { To = null; }
    else { To = To.toDateString(); }

    return this.http.get(`${this.paymentQuoteUri}/GetPaymentQuoteList?name=${name}&From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  private initializePaymentQuote(): PaymentQuote {
    // Return an initialized object
    return {
      paymentQuoteId: null,
      paymentQuoteName: null,
      paymentQuoteEmail: null,
      paymentQuoteText:null,
      leases:[]
    };
  }
}


export class PaymentQuote {
  paymentQuoteId: string;
  paymentQuoteName: string;
  paymentQuoteEmail: string;
  paymentQuoteText: string;
  leases: LeaseForm[];
  constructor() {
    this.paymentQuoteId = '';
    this.paymentQuoteName = '';
    this.paymentQuoteEmail = '';
    this.paymentQuoteText = '';
  }
}
