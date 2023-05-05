import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public insuranceUri = `${environment.WebApiBaseUrl}ManageInsurance`;
    pagedData: any;

  constructor(private http: HttpClient) { }

  getInsuranceList(name: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.insuranceUri}/GetInsuranceList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
      map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  deleteInsurance(id: any) {
    return this.http.get(this.baseUri + `ManageInsurance/DeleteInsurance?insuranceId=${id}`)
  }

  changeStatus(id: string) {
    return this.http.post(`${this.insuranceUri}/ChangeStatus/${id}`, null);
  }
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

export class Insurance {
  InsuranceId: string;
  Name: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Phone: string;
  AgentName: string;
  AgentEmail: string;
  CreatedOn: string;
  IsActive: string;
  InsuranceContactId: string;
  County: string;
  constructor() {
    this.InsuranceId = "";
    this.Address = "";
    this.Address = "";
    this.City = "";
    this.State = "";
    this.ZipCode = "";
    this.Phone = "";
    this.AgentName = "";
    this.AgentEmail = "";
    this.CreatedOn = "";
    this.IsActive = "";
    this.InsuranceContactId = "";
    this.County = "";
  }
}




export class AddEditInsurance {
  insuranceId: string;
  Name: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Phone: string;
  AgentName: string;
  AgentEmail: string;
  County: string;
  Status: string;
  statusId: string;
  constructor() {
    this.insuranceId = "";
    this.Name = "";
    this.Address = "";
    this.City = "";
    this.State = "";
    this.ZipCode = "";
    this.Phone = "";
    this.AgentEmail = "";
    this.AgentName = "";
    this.County = "";
    this.Status = "";
    this.statusId = "";
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
