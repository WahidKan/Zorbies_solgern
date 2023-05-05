import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BankInformationService {

  public bankUri = `${environment.WebApiBaseUrl}Contact`;
  constructor(private http: HttpClient) { }

  getBankInformation(userId: string) {
    return this.http.get(`${this.bankUri}/GetBankInformationByContactBankId?contactBankId=${userId}`)
  }
  saveBankInformation(bankInfo: BankInformation) {
    return this.http.post(`${this.bankUri}/SaveContactBankInformation`, bankInfo);
  }
}

export class BankInformation {
  contactBankId: string;
  contactBankName: string;
  contactBankAddress: string;
  contactBankAccountNum: string;
  contactBankRoutingNumber: string;
 
  constructor() {
    this.contactBankId = "";
    this.contactBankName = "";
    this.contactBankAddress = "";
    this.contactBankAccountNum = "";
    this.contactBankRoutingNumber = "";
  }
}
