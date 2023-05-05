import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanysetupserviceService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public insuranceUri = `${environment.WebApiBaseUrl}ManageInsurance`;
  pagedData: any;
  editPage: any;
  constructor(private http: HttpClient) { }

  getStateList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetStateList`);

  }

  getcompanySetupDetail() {
    return this.http.get(this.baseUri + `ConfigurationSetting/getcompanySetupDetail`)
  }
  addOrUpdateCompanySetup(CompanySetUpModel: FormData) {
   
    return this.http.post(this.baseUri + `ConfigurationSetting/AddOrUpdateCompanySetup`, CompanySetUpModel);

  }
  SendEmail(model: any) {
    return this.http.post(this.baseUri + `Bank/SendEmail`, model);
     
  }
}




export class CompanySetUpModel {
  companyId: string;
  companyName: string;
  companyType: string;
  phone: string;
  companyLogo: string;
  emailTemplateLogo: string;
  referenceInterval: string;
  autoSaveInterval: number;
  city: string;
  country: string;
  zipCode: string;
  state: string;
  address: string;
  smtpHost: string;
  smtpUsername: string;
  smtpPort: string;
  fromEmail: string;
  smtpPassword: string;
  IsTLS: boolean;
  IsEnableSSL: boolean;
  constructor() {
    this.companyId = "";
    this.companyName = "";
    this.companyType = "";
    this.phone = "";
    this.companyLogo = "";
    this.emailTemplateLogo = "";
    this.referenceInterval = "";
    this.autoSaveInterval =2;
    this.city = "";
    this.country = "";
    this.zipCode = "";
    this.state = "";
    this.address = "";
    this.smtpHost = "";
    this.smtpUsername = "";

    this.smtpPort = "";
    this.fromEmail = "";
    this.smtpPassword = "";
    this.IsTLS = false;
    this.IsEnableSSL = false;
  }
}
