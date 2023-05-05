import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddInsuranceService {
  public manageInsuranceUri = `${environment.WebApiBaseUrl}ManageInsurance`;
  constructor(private http: HttpClient) { }

  getInsuranceDetail(userId: string) {
    return this.http.get(`${this.manageInsuranceUri}/GetInsuranceDetail?insuranceContactId=${userId}`)
  }
  saveInsuranceDetail(insuranceDetail: AddInsuranceDetail) {
   
    return this.http.post(`${this.manageInsuranceUri}/SaveInsuranceDetail`, insuranceDetail);
  }
}

export class AddInsuranceDetail {
  insuranceId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  agentName: string;
  agentEmail: string;
  county: string;
  constructor() {
    this.insuranceId = "";
    this.name = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zipCode = "";
    this.phone = "";
    this.agentEmail = "";
    this.agentName = "";
    this.county = "";
  }
}
