import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddeditinsuranceService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }

  getInsuranceDetail(id: any) {
    return this.http.get(this.baseUri + `ManageInsurance/GetInsuranceByInsuranceId?insuranceId=${id}`)
  }
  addeditInsurance(InsurenceModel: AddEditInsurance) {
    return this.http.post(this.baseUri + `ManageInsurance/AddOrEditInsurance`, InsurenceModel);
 
  }
  getStateList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetStateList`);

  }
}

export class AddEditInsurance {
  InsuranceId: string;
   Name: string;
   Address: string;
   City: string;
   State: string;
  ZipCode: string;
   Phone: string;
  AgentName: string;
  AgentEmail: string;
  COUNTY: string;
  constructor() {
    this.InsuranceId = "";
    this.Name = "";
    this.Address = "";
    this.City = "";
    this.State = "";
    this.ZipCode = "";
    this.Phone = "";
    this.AgentEmail = "";
    this.AgentName = "";
    this.COUNTY = "";
  }
}

export class state {
  Value: string;
  Text: string;
  constructor() {
    this.Value = "";
    this.Text = "";
  }
}
