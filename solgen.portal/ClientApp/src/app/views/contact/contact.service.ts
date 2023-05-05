import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public contactUri = `${environment.WebApiBaseUrl}Contact`;

  contactFormDetails: ContactForm = new ContactForm();
  contactDetails: Contact = new Contact();
  contactBankInfo: BankInformation = new BankInformation();
  pagedData: any;

  constructor(private http: HttpClient) { }

  getContactList(name: any, From: any, To: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, isDashBoard: boolean): Observable<any> {
    if (typeof From == "undefined" || From==null) { From = null; }
    else { From = From.toDateString(); }

    if (typeof To == "undefined" || To==null) { To = null; }
    else { To = To.toDateString(); }

    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.contactUri}/GetContactList?name=${name}&From=${From}&To=${To}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}&isDashBoard=${isDashBoard}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getContactDetails(contactId: any) {
    return this.http.get(this.baseUri + `Contact?contactId=${contactId}`);
  }

  // get Contact Id by User Id
  getContactIdByUserId(UserId: any) {
    return this.http.get(`${this.baseUri}Contact/GetContactIdByUserId?id=${UserId}`);
  }

  getContactIdByRequestLeaseId(UserId: any) {
    return this.http.get(`${this.baseUri}Lease/GetContactIdByLeaseRequestId?id=${UserId}`);
  }

  deleteGuarantor(guarantorID: any) {
    return this.http.delete(this.baseUri + `Contact?guarantorID=${guarantorID}`);
  }

  getWelcomePackageEmail(contactId: any) {
    return this.http.get(`${this.baseUri}Contact/GetEmailPackage?contactId=${contactId}`);
  }

  sendWelcomePackageEmail(contactId: any) {
    return this.http.get(`${this.baseUri}Contact/SendEmailPackage?contactId=${contactId}`);
  }


  saveContactForm(contactForm: any) {
    this.contactFormDetails = new ContactForm();
    this.contactDetails = new Contact();
    this.contactBankInfo = new BankInformation();
    this.contactDetails.contactId = contactForm.contactId;
    this.contactDetails.contactSocialSecurityNumber = contactForm.contactSocialSecurityNumber;
    this.contactDetails.contactBussinessName = contactForm.contactBussinessName;
    this.contactDetails.contactBussinessMailAddress = contactForm.contactBussinessMailAddress;
    this.contactDetails.contactMailAddressCity = contactForm.contactMailAddressCity;
    this.contactDetails.contactMailAddressState = contactForm.contactMailAddressState;
    this.contactDetails.contactMailAddressZip = contactForm.contactMailAddressZip;
    this.contactDetails.contactMailAddressCounty = contactForm.contactMailAddressCounty;
    this.contactDetails.contactBussinessPhysicalAddress = contactForm.contactBussinessPhysicalAddress;
    this.contactDetails.contactPhysicalAddressCity = contactForm.contactPhysicalAddressCity;
    this.contactDetails.contactPhysicalAddressState = contactForm.contactPhysicalAddressState;
    this.contactDetails.contactPhysicalAddressZip = contactForm.contactPhysicalAddressZip;
    this.contactDetails.contactBussinessPhone = contactForm.contactBussinessPhone;
    this.contactDetails.bussinessPhone = contactForm.bussinessPhone;
    this.contactDetails.contactBussinessTIN = contactForm.contactBussinessTIN;
    this.contactDetails.contactTypeOfCompany = contactForm.contactTypeOfCompany;
    this.contactDetails.contactFirstName = contactForm.contactFirstName;
    this.contactDetails.contactLastName = contactForm.contactLastName;
    this.contactDetails.contactEmail = contactForm.contactEmail;
    this.contactDetails.contactPosition = contactForm.contactPosition;
    this.contactDetails.contactPreferredDocumentSignedBy = contactForm.contactPreferredDocumentSignedBy;
    this.contactDetails.contactPhysicalAddressCounty = contactForm.contactPhysicalAddressCounty;
    this.contactDetails.isLeaseCreated = contactForm.isLeaseCreated;

    // Bank Information
    this.contactBankInfo.contactBankId = contactForm.contactBankId;
    this.contactBankInfo.contactBankName = contactForm.contactBankName;
    this.contactBankInfo.contactBankAddress = contactForm.contactBankAddress;
    this.contactBankInfo.contactBankRoutingNumber = contactForm.contactBankRoutingNumber;
    this.contactBankInfo.contactBankAccountNum = contactForm.contactBankAccountNum;
    this.contactBankInfo.contactBankCity = contactForm.contactBankCity;
    this.contactBankInfo.contactBankState = contactForm.contactBankState;
    this.contactBankInfo.contactBankCounty = contactForm.contactBankCounty;
    this.contactBankInfo.contactBankZipcode = contactForm.contactBankZipcode;

    contactForm.guarantors.forEach(data => {
      this.contactFormDetails.guarantors.push(data);
    });
    this.contactFormDetails.contactDetails.push(this.contactDetails);
    this.contactFormDetails.contactBankInfo.push(this.contactBankInfo);

    this.contactFormDetails.insuranceDetails.push(contactForm.insurances[0]);
    this.contactFormDetails.contactId = contactForm.contactId;
    return this.http.post(this.baseUri + `Contact`, this.contactFormDetails);
  }
}

export class ContactForm {
  guarantors: Guarantor[];
  contactDetails: Contact[];
  contactBankInfo: BankInformation[];
  insuranceDetails: Insurance[];
  contactId: any;
  userID: any;
  contactAdminId: string;
  constructor() {
    this.contactDetails = [];
    this.contactBankInfo = [];
    this.guarantors = [];
    this.insuranceDetails = [];
    this.contactId = null;
    this.userID = null;
    this.contactAdminId = null;
  }
}

//Contact detail class
export class Contact {
  contactId: any;
  contactBussinessName: string;
  contactSocialSecurityNumber: string;
  contactBussinessMailAddress: string;
  contactMailAddressCity: string;
  contactMailAddressState: any;
  contactMailAddressZip: string;
  contactMailAddressCounty: string;
  contactBussinessPhysicalAddress: string;
  contactPhysicalAddressCity: string;
  contactPhysicalAddressState: any;
  contactPhysicalAddressZip: string;
  contactBussinessPhone: string;
  bussinessPhone: string;
  contactBussinessTIN: string;
  contactTypeOfCompany: any;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPosition: any;
  contactPreferredDocumentSignedBy: any;
  contactCreatedOn: any;
  contactPhysicalAddressCounty: string;
  isLeaseCreated : boolean;
  
  constructor() {
    this.contactId = null;
    this.contactBussinessName = "";
    this.contactSocialSecurityNumber = "";
    this.contactBussinessMailAddress = "";
    this.contactMailAddressCity = "";
    this.contactMailAddressState = null;
    this.contactMailAddressZip = "";
    this.contactMailAddressCounty = "";
    this.contactBussinessPhysicalAddress = "";
    this.contactPhysicalAddressCity = "";
    this.contactPhysicalAddressState = null;
    this.contactPhysicalAddressZip = "";
    this.contactBussinessPhone = "";
    this.bussinessPhone = "";
    this.contactBussinessTIN = "";
    this.contactTypeOfCompany = null;
    this.contactFirstName = "";
    this.contactLastName = "";
    this.contactEmail = "";
    this.contactPosition = null;
    this.contactPreferredDocumentSignedBy = null;
    this.contactCreatedOn = null;
    this.contactMailAddressCounty = "";
    this.contactPhysicalAddressCounty = "";
    this.isLeaseCreated = false;
  }
}

// Contact Bank Information

export class BankInformation {
  contactBankId: string;
  contactBankName: string;
  contactBankAddress: string;
  contactBankRoutingNumber: string;
  contactBankAccountNum: string;
  contactBankCity: string;
  contactBankState: any;
  contactBankCounty: string;
  contactBankZipcode: string;
  constructor() {
    this.contactBankId = "";
    this.contactBankName = "";
    this.contactBankAddress = "";
    this.contactBankRoutingNumber = "";
    this.contactBankAccountNum = "";
    this.contactBankCity = "";
    this.contactBankState = null;
    this.contactBankCounty = "";
    this.contactBankZipcode = "";
  }

}

//guarantor class
export class Guarantor {
  guarantorID: any;
  guarantorFirstName: string;
  guarantorLastName: string;
  guarantorTitle: string;
  guarantorOwnership: string;
  guarantorBussinessAddress: string;
  guarantorBussinessCity: string;
  guarantorBussinessState: any;
  guarantorBussinessZip: string;
  guarantorBussinessCounty: string;
  guarantorHomeAddress: string;
  guarantorHomeCity: string;
  guarantorHomeState: any;
  guarantorHomeZip: string;
  guarantorHomeCounty: string;
  guarantorPhone: string;
  guarantorEmail: string;
  guarantorSocialNumber: string;
  guarantorDateOfBirth: Date;
  guarantorFormattedDateOfBirth: string;
  constructor() {
    this.guarantorID = null;
    this.guarantorFirstName = "";
    this.guarantorLastName = "";
    this.guarantorTitle = "";
    this.guarantorOwnership = "";
    this.guarantorBussinessAddress = "";
    this.guarantorBussinessCity = "";
    this.guarantorBussinessState = null;
    this.guarantorBussinessZip = "";
    this.guarantorBussinessCounty = "";
    this.guarantorHomeAddress = "";
    this.guarantorHomeCity = "";
    this.guarantorHomeState = null;
    this.guarantorHomeZip = "";
    this.guarantorHomeCounty = "";
    this.guarantorPhone = "";
    this.guarantorEmail = "";
    this.guarantorSocialNumber = "";
    this.guarantorDateOfBirth = null;
    this.guarantorFormattedDateOfBirth = "";
  }
}

export class Insurance {
  insuranceId: any;
  name: string;
  address: string;
  city: string;
  state: any;
  zipCode: string;
  phone: string;
  agentName: string;
  agentEmail: string;
  county: string;
  constructor() {
    this.insuranceId = null;
    this.name = "";
    this.address = "";
    this.city = "";
    this.state = null;
    this.zipCode = "";
    this.phone = "";
    this.agentName = "";
    this.agentEmail = "";
    this.county = "";
  }
}


