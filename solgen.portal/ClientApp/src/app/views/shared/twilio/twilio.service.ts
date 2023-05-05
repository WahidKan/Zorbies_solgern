import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  public baseUri = `${environment.WebApiBaseUrl}`;

  constructor(private http: HttpClient) { }

  GenerateTwilioCapabilityAccessToken(): Observable<any> {
    return this.http.get(`${this.baseUri}Twilio/CapabilityAccessToken`);
  }

  GetPhoneNumber(primaryId,refId, primaryColumn, refTable, refColumn): Observable<any> {
    return this.http.get(`${this.baseUri}Twilio/GetPhoneNumberForCall?primaryId=${primaryId}&refId=${refId}&columnName=${primaryColumn}&refTable=${refTable}&refColumn=${refColumn}`);
  }

  getCounter(tick) {
    return timer(0, tick)
  }


  startCall(number) {
    const body = { To: number }
    return this.http.post(`${this.baseUri}Twilio/StartCall`, body).toPromise();
  }
}

