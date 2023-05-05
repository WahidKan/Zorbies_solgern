import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BulkuploadService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public contactUri = `${environment.WebApiBaseUrl}Contact`;
  constructor(private http: HttpClient) { }

  saveBulkUpload(bulkUpload: FormData) {
    return this.http.post(`${this.contactUri}/SaveBulkUpload`, bulkUpload)
  }
}

export class BulkUpload {
  Id: string;
  bulkUploadJSONObject: string;

  constructor() {
    this.Id = '';
    this.bulkUploadJSONObject = '';
  }
}

export class ContactInformation {
  BusinessName: string;
  Tin: string;
  TypeofCompany: string;
  BusinessPhone: string;
  ContactPhone: string;
  ContactFirstName: string;
  ContactLastName: string;
  ContactPosition: string;
  ContactEmail: string;
  ContactPreferredDocumentSigned: string;
  MailingAddress: string;
  MailingAddressCity: string;
  MailingAddressState: string;
  MailingAddressZip: string;
  MailingAddressCounty: string;
  PhysicalAddress: string;
  PhysicalAddressCity: string;
  PhysicalAddressState: string;
  PhysicalAddressZip: string;
  PhysicalAddressCounty: string;
  InsuranceName: string;
  InsurancePhone: string;
  InsuranceAgentName: string;
  InsuranceAgentEmail: string;
  InsuranceAddress: string;
  InsuranceCity: string;
  InsuranceState: string;
  InsuranceZip: string;
  InsuranceAgentCounty: string;
}

export class ContactGuarantorInformation {
  ContactEmail: string;
  GuarantorFirstName: string;
  GuarantorLastName: string;
  GuarantorTitle: string;
  Ownership: string;
  GuarantorEmail: string;
  GuarantorPhone: string;
  BussinessAddress: string;
  BussinessCity: string;
  BussinessState: string;
  BussinessZip: string;
  BussinessCounty: string;
  HomeAddress: string;
  HomeCity: string;
  HomeState: string;
  HomeZip: string;
  HomeCounty: string;
}

export class RootJsonObject {
  ContactInformation: ContactInformation[];
  ContactGuarantorInformation: ContactGuarantorInformation[];
}
