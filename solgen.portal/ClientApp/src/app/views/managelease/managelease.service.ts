import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService, ModuleNames } from '../shared/common.service';
import { map, retry } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManageleaseService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  LeaseForm: LeaseForm[] = [];
  LeaseReuestForm: LeaseRequestdata[] = [];
  currentUrl: string;
  previousUrl: string;
  constructor(private http: HttpClient, private commonService: CommonService, private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  //Get previous url
  public getPreviousUrl() {
    return this.previousUrl;
  }

  //function used to fatch Lease Request List
  getLeaseRequestList(searchText: any, sortColumn: string, sortDir, pageIndex: number, pageSize: number, userId: string) {
    return this.http.get(this.baseUri + `Lease/GetLeaseRequestList?searchText=${searchText}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  //function used to fetch list of Lease
  getLeaseList(searchText: any, leaseStatus: any, saleMan: any, expFrom: any, expTo: any, commFrom: any, commTo: any, sortColumn: string, sortDir, pageIndex: number, pageSize: number, userId: string, isDashboard: boolean, contactId: any) {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }

    if (typeof commFrom == "undefined" || commFrom == null) { commFrom = null; }
    else { commFrom = commFrom.toDateString(); }

    if (typeof commTo == "undefined" || commTo == null) { commTo = null; }
    else { commTo = commTo.toDateString(); }

    return this.http.get(this.baseUri + `Lease/GetLeaseList?searchText=${searchText}&leaseStatus=${leaseStatus}&saleMan=${saleMan}&expFrom=${expFrom}&expTo=${expTo}&commFrom=${commFrom}&commTo=${commTo}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}&isDashboard=${isDashboard}&contactId=${contactId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  saveDetail(leaseId: any) {
    return this.http.post(this.baseUri + `Lease/ReviewSupportingDoc?leaseId=${leaseId}`, null);
  }
  saveLeaseReviewDocStatus(leaseId: any) {
    return this.http.post(this.baseUri + `Lease/ReviewLeaseDoc?leaseId=${leaseId}`, null);
  }

  //function used to fetch list of Lease By Status
  getLeaseListByStatus(searchText: any, leaseStatus: any, saleMan: any, expFrom: any, expTo: any, commFrom: any, commTo: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, isDashboard: boolean, contactId: any) {
    if (typeof expFrom == "undefined" || expFrom == null) { expFrom = null; }
    else { expFrom = expFrom.toDateString(); }

    if (typeof expTo == "undefined" || expTo == null) { expTo = null; }
    else { expTo = expTo.toDateString(); }

    if (typeof commFrom == "undefined" || commFrom == null) { commFrom = null; }
    else { commFrom = commFrom.toDateString(); }

    if (typeof commTo == "undefined" || commTo == null) { commTo = null; }
    else { commTo = commTo.toDateString(); }

    return this.http.get(this.baseUri + `Lease/GetLeaseListByStatus?searchText=${searchText}&leaseStatus=${leaseStatus}&saleMan=${saleMan}&expFrom=${expFrom}&expTo=${expTo}&commFrom=${commFrom}&commTo=${commTo}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${userId}&isDashboard=${isDashboard}&contactId=${contactId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  addOrUpdateLease(leaseForm: any, oldleasebank: any, contactid: any, vendorid: any, isBankUser: boolean) {
    leaseForm.leaseContactId = contactid;
    leaseForm.leaseVendorId = vendorid;
    // // console.log("service",leaseForm);
    return this.http.post(`${this.baseUri}Lease?isApprovedForPurchase=${isBankUser}&oldleasebank=${oldleasebank}`, leaseForm);
  }

  addOrUpdateLeaseBankApproval(leaseForm: any, contactid: any, vendorid: any, isBankUser: boolean, leaseTerm: any, leaseState: any, leaseResidualPercentage: any, leaseInsurance: any, leaseAssignedBankId: any,
    nameOfBusiness: any, bankName: any) {
    leaseForm.leaseContactId = contactid;
    leaseForm.leaseVendorId = vendorid;
    leaseForm.leaseTerm = leaseTerm;
    leaseForm.leaseState = leaseState;
    leaseForm.leaseResidualPercentage = leaseResidualPercentage;
    leaseForm.leaseInsurance = leaseInsurance;
    leaseForm.leaseAssignedBankId = leaseAssignedBankId;
    return this.http.post(`${this.baseUri}Lease?isApprovedForPurchase=${isBankUser}&nameOfBusiness=${nameOfBusiness}&bankName=${bankName}`, leaseForm);
  }

  addOrUpdateLeaseRequest(LeaseReuestForm: any, contactid: any, LeaseRequestId: any) {
    LeaseReuestForm.leaseContactId = contactid;
    LeaseReuestForm.leaseRequestId = LeaseRequestId;
    return this.http.post(`${this.baseUri}Lease/AddEditLeaseRequest`, LeaseReuestForm);
  }
 
  sendLeaseToBank(leaseId: any, contactid: any) {
    return this.http.post(`${this.baseUri}Lease/SendLeaseToBank?leaseId=${leaseId}&contactId=${contactid}`, leaseId, contactid);
  }

  sendFundingPackageToBank(leaseId: any, contactid: any, leaseAssignedBankId: any) {
    return this.http.post(`${this.baseUri}Lease/sendFundingPackageToBank?leaseId=${leaseId}&contactId=${contactid}&leaseAssignedBankId=${leaseAssignedBankId}`, leaseId, contactid);
  }

  sendTitleWorkRequest(titleWorkRequest: any, contactid: any, leaseAssignedBankId: any, venderEmailId: any) {
    return this.http.post(`${this.baseUri}Lease/sendTitleWorkRequest?titleWorkRequest=${titleWorkRequest}&contactId=${contactid}&leaseAssignedBankId=${leaseAssignedBankId}&venderEmailId=${venderEmailId}`
      , titleWorkRequest, contactid);
  }

  GetTitlWorkRequest(leaseId: any) {
    return this.http.get(`${this.baseUri}Lease/GetTitleWorkRequestByLeaseId?leaseId=${leaseId}`);
  }

  getContactDocbyLeaseID(leaseId: any, sortColumn: string, sortDir, page: number, pageSize: number) {
    return this.http.get(`${this.baseUri}Lease/GetContactDocbyLease?leaseId=${leaseId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getleaseReviewDoc(leaseId: any, sortColumn: string, sortDir, page: number, pageSize: number) {
    return this.http.get(`${this.baseUri}Lease/GetleaseReviewDoc?leaseId=${leaseId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getFundingPackageleaseReviewDoc(leaseId: any, sortColumn: string, sortDir, page: number, pageSize: number) {
    return this.http.get(`${this.baseUri}Lease/GetFundingPackageleaseReviewDoc?leaseId=${leaseId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  sendToDocusignToClient(leaseId: any) {
    return this.http.get(`${this.baseUri}Lease/SendDocumentforDocuSign?leaseId=${leaseId}`);
  }

  getLeaseDetails(leaseId: any, isBankUser: any) {
    return this.http.get(`${this.baseUri}Lease?leaseId=${leaseId}&isBankUser=${isBankUser}`);
  }

  SendStatusForWeightSignature(leaseId: any, contactId: any, leaseAssignedBankId: any) {
    return this.http.get(`${this.baseUri}Lease/SendStatusForWeightSignature?leaseId=${leaseId}&contactId=${contactId}&leaseAssignedBankId=${leaseAssignedBankId}`);
  }

  getLeaseDetailsForWetSignature(leaseId: any) {
    return this.http.get(`${this.baseUri}Lease/GetLeaseDetailForWetSignature?leaseId=${leaseId}`);
  }

  getLeaseRequestDetails(leaseRequestId: any) {
    return this.http.get(`${this.baseUri}Lease/LeaseRequestByRequestId?leaseRequestId=${leaseRequestId}`);
  }

  getMaturityDate(month: number) {
    return this.http.get(`${this.baseUri}Lease/SetMaturityDate?month=${month}`);
  }

  getCurrentDate() {
    return this.http.get(`${this.baseUri}Lease/GetCurrentDate`);
  }

  deleteLease(id: any) {
    const url = `${this.baseUri}Lease/${id}`;
    return this.http.delete(url);
  }

  saveUploadDocument(documentModel: FormData) {
    return this.http.post(this.baseUri + `Lease/UploadLeaseDocument`, documentModel);
  }

  deleteLeaseRequest(id) {
    return this.http.get(`${this.baseUri}Lease/deleteLeaseRequest?id=${id}`);
  }

  updateLeaseDocument(form: FormData) {
    return this.http.post(this.baseUri + `Lease/UpdateLeaseDocument`, form);
  }

  GetTemplateDetail(templateId: any) {
    return this.http.get(this.baseUri + `Lease/GetLeaseTemplateByTemplateId?templateId=${templateId}`)
  }
  saveEmailTemplate(leaseTemplate: LeaseTemplate, leaseId: any) {
    return this.http.post(this.baseUri + `Lease/LeaseTemplateEditUpdate`, leaseTemplate);
  }
  uploadLeaseDocumentPDF(form: FormData) {
    return this.http.post(`${this.baseUri}Lease/uploadLeaseDocumentPDF`, form);
  }

  download(fileName: any) {
    return this.http.get(`${this.baseUri}Lease/Download?fileName=${fileName}`);
  }

  changeLeaseStatus(leaseId: any) {
    return this.http.post(`${this.baseUri}Lease/ChangeLeaseStatus?leaseId=${leaseId}`, leaseId);
  }

  getLeaseInsuranceDropList() {
    return this.http.get(`${this.baseUri}Lease/GetLeaseInsuranceDropList`);
  }

  getLeaseDetailForCreateInsuranceRequest(leaseId: any) {
    return this.http.get(this.baseUri + `Lease/GetLeaseDetailForCreateInsuranceRequest?leaseId=${leaseId}`)
  }

  saveInsuranceRequestPreview(form: FormData) {
    return this.http.post(`${this.baseUri}Lease/SaveInsuranceRequestPreview`, form);
  }

  uploadDocuSign(uploadModel: FormData) {
    return this.http.post(`${this.baseUri}Document`, uploadModel);
  }

  saveDocument(documentModel: FormData, action: any) {
    return this.http.post(this.baseUri + `Lease/AddCreditScore?CheckCreditAction=${action}`, documentModel);
  }

  prepareUCCFilingRequest(uccModel: FormData) {
    return this.http.post(`${this.baseUri}Lease/PrepareUCCFilingRequest`, uccModel);
  }

  GetLeaseTemplateDetail(leaseId: any) {
    return this.http.get(`${this.baseUri}Lease/GetLeaseTemplateDetail?leaseId=${leaseId}`);
  }

  updateLeaseStatus(leaseStatus: any, leaseId: any, calledFrom: any="") {
    return this.http.post(`${this.baseUri}Lease/UpdateLeaseStatus?leaseStatus=${leaseStatus}&leaseId=${leaseId}&calledFrom=${calledFrom}`, leaseStatus, leaseId);
  }

  //uploadMultiDocuments(form: FormData) {
  //  return this.http.post(`${this.baseUri}Lease/UploadMultiDocuments`, form);
  //}

}

export class LeaseForm {
  leaseId: any;
  leaseUseType: string;
  leaseType: string;
  leasePreferredDocumentSignedBy: string;
  leaseOtherDescription: string;
  leaseDescription: string;
  isLeaseUCCFilling: boolean;
  leaseState: any;
  insuranceExpirationDate: any;
  leaseTemplateId: any;
  leaseTemplateContent: string;
  leaseInsurance: any;
  leaseUCCFillingDocument: string;
  leaseUCCFillingNumber: string;
  leaseSerialNumber: string;
  leaseRate: number;
  leaseFeePercentage: number;
  leaseResidualPercentage: any;
  leaseTerm: any;
  leaseEquipmentMSRP: number;
  leaseEquipmentCost: number;
  leaseAdditions1: number;
  leaseAdditions2: number;
  leaseTotalEquipmentMSRP: number;
  leaseSalesTax: number;
  leaseResidualAmount: number;
  leaseWarranty: number;
  leaseAccountType: any;
  leaseOther: number;
  leaseMonthlyRentalPayment: number;
  leasePlacementFee: number;
  leaseAmountDueAtSigining: number;
  leaseTotalAmount: number;
  leaseInsuranceRequirement: any;
  leaseAssignedBankId: any;
  leaseDate: any;
  leaseFormattedDate: string;
  leaseMaturityDate: any;
  leaseFormattedMaturityDate: string;
  leaseVendorId: any;
  leaseContactId: any;
  leaseUCCFillingDocumentLink: string;
  leaseTermText: string;
  leaseNumber: string;
  lenderDate: any;
  lenderName: string;
  lenderNotes: string;
  lenderAgree: boolean;
  leaseLicenceFee: any;
  leaseFormattedInsuranceExpirationDate: string;

  constructor() {
    this.leaseId = null;
    this.leaseUseType = "Business Use";
    this.leaseType = "";
    this.insuranceExpirationDate = new Date();;
    this.leasePreferredDocumentSignedBy = "";
    this.leaseOtherDescription = "";
    this.leaseDescription = "";
    this.isLeaseUCCFilling = false;
    this.leaseState = null;
    this.leaseTemplateId = null;
    this.leaseTemplateContent = "";
    this.leaseInsurance = null;
    this.leaseUCCFillingDocument = "";
    this.leaseUCCFillingNumber = "";
    this.leaseSerialNumber = "";
    this.leaseRate = 0;
    this.leaseFeePercentage = 0;
    this.leaseResidualPercentage = null;
    this.leaseTerm = null;
    this.leaseEquipmentMSRP = 0;
    this.leaseEquipmentCost = 0;
    this.leaseAdditions1 = 0;
    this.leaseNumber = "";
    this.leaseAdditions2 = 0;
    this.leaseTotalEquipmentMSRP = 0;
    this.leaseSalesTax = 0;
    this.leaseResidualAmount = 0;
    this.leaseWarranty = 0;
    this.leaseAccountType = null;
    this.leaseOther = 0;
    this.leaseMonthlyRentalPayment = 0;
    this.leasePlacementFee = 0;
    this.leaseAmountDueAtSigining = 0;
    this.leaseTotalAmount = 0;
    this.leaseInsuranceRequirement = null;
    this.leaseAssignedBankId = null;
    this.leaseDate = new Date();
    this.leaseMaturityDate = new Date();
    this.leaseVendorId = null;
    this.leaseContactId = null;
    this.leaseFormattedDate = null;
    this.leaseUCCFillingDocumentLink = "";
    this.leaseFormattedMaturityDate = null;
    this.leaseTermText = "";
    this.lenderDate = new Date();
    this.lenderName = "";
    this.lenderNotes = "";
    this.lenderAgree = false;
    this.leaseLicenceFee = null;
    this.leaseFormattedInsuranceExpirationDate = null;
  }
}



export class Leasedata {
  leaseNumber: string;
  leaseType: string;
  leaseOtherDescription: string;
  leaseDescription: string;
  leaseTerm: any;
  leaseVendorId: any;
  leaseAdditions2: number;
  leaseSerialNumber: string;
  leasePDFDocumentNameLink: string;
  leaseMonthlyRentalPayment: number;
  leaseAmountDueAtSigining: number;
  leaseContactId: any;
  leaseDate: any;
  leaseSalesTax: number;
  leaseInsurance: any;
  constructor() {
    this.leaseType = "";
    this.leaseTerm = null;
    this.leaseOtherDescription = "";
    this.leaseDescription = "";
    this.leaseSerialNumber = "";
    this.leasePDFDocumentNameLink = "";
    this.leaseContactId = null;
    this.leaseNumber = "";
    this.leaseMonthlyRentalPayment = 0;
    this.leaseVendorId = null;
    this.leaseSalesTax = 0;
    this.leaseDate = new Date();
    this.leaseInsurance = null;
  }


}
export class LeaseRequestdata {
  leaseRequest: string;
  leaseRequestRateToBank: string;
  leaseRequestTerm: string;
  leaseRequestPayment: string;
  leaseRequestResidual: string;
  leaseRequestCollateral: string;
  leaseRequestPurpose: string;
  leaseRequestSOROne: string;
  leaseRequestSORTwo: string;
  leaseRequestSORThree: string;
  leaseRequestDescription: string;
  leaseRequestAccountType: string;
  leaseRequestBankName: string;
  leaseRequestBalance: any;
  leaseRequestNameOnBank: string;
  leaseRequestCompanyoverview: string;
  constructor() {
    this.leaseRequest = "";
    this.leaseRequestRateToBank = "";
    this.leaseRequestTerm = "";
    this.leaseRequestPayment = "";
    this.leaseRequestResidual = "";
    this.leaseRequestCollateral = "";
    this.leaseRequestPurpose = "";
    this.leaseRequestSOROne = "";
    this.leaseRequestSORTwo = "";
    this.leaseRequestDescription = "";
    this.leaseRequestBalance = null;
    this.leaseRequestSORThree = "";
    this.leaseRequestAccountType = "";
    this.leaseRequestBankName = "";
    this.leaseRequestNameOnBank = "";
    this.leaseRequestCompanyoverview = "";
  }
}

export class Insurance {
  insuranceId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  agentName: string;
  agentEmail: string;
  createdOn: string;
  isActive: string;
  insuranceContactId: string;
  county: string;
  stateName: string;
  constructor() {
    this.insuranceId = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zipCode = "";
    this.phone = "";
    this.agentName = "";
    this.agentEmail = "";
    this.createdOn = "";
    this.isActive = "";
    this.insuranceContactId = "";
    this.county = "";
    this.stateName = "";
  }
}

export class InsuranceRequestPreview {
  leaseId: string;
  leaseNumber: string;
  bankName: string;
  leaseUseType: string;
  leaseType: string;
  collateralInformation: string;
  leaseDescription: string;
  leaseVINSerialNumber: string;
  leaseDate: any;
  leaseMaturityDate: any;
  leaseFormattedDate: string;
  leaseFormattedMaturityDate: string;
  contactBussinessName: string;
  contactBussinessMailAddress: string;
  contactMailAddressCity: string;
  contactMailAddressState: string;
  contactMailAddressZip: string;
  contactMailAddressCounty: string;
  contactBussinessPhysicalAddress: string;
  contactPhysicalAddressCity: string;
  contactPhysicalAddressState: string;
  contactPhysicalAddressZip: string;
  contactPhysicalAddressCounty: string;
  contactBussinessPhone: string;
  bussinessPhone: string;
  contactBussinessTIN: string;
  contactLastName: string;
  contactPosition: string;
  leaseEquipmentCost: string;
  bankCity: string;
  bankStateName: string;
  bankCounty: string;
  bankZipCode: string;
  bankAddress: string;
  solgenAddress: string;
}

export class UploadDocuSign {
  documentUploadedForUser: string;
  documentTitle: string;
  documentDate: any;
  documentRefNumber: string;
  isLeaseDocument: boolean;
  documentFileName: string;
  documentAddFor: string;
  documentAddedFrom: string;
  prefixNameOfDocument: string
  constructor() {
    this.documentUploadedForUser = '';
    this.documentTitle = '';
    this.documentFileName = '';
    this.documentDate = '';
    this.documentRefNumber = '';
    this.documentAddFor = "lease";
    this.documentAddedFrom = "docusign";
    this.prefixNameOfDocument = '';
  }
}

export class UCCFiling {
  documentTitle: string;
  documentFileName: string;
  documentUploadedForUser: string;
  prepareUCCFillingRequestAction: string;
  prefixNameOfDocument: string
  documentRefNumber: string;
  tXUCCDraft: string;
  receiptNumDraft: string;
  prepareUCCFillingRequestReminder: any;
  uccFilingState: string;

  constructor() {
    this.documentUploadedForUser = '';
    this.documentTitle = '';
    this.documentFileName = '';
    this.prepareUCCFillingRequestAction = '';
    this.prefixNameOfDocument = '';
    this.documentRefNumber = '';
    this.tXUCCDraft = '';
    this.receiptNumDraft = '';
    this.prepareUCCFillingRequestReminder = '';
    this.uccFilingState = '';
  }
}
export class LeaseTemplate {
  TemplateId: string;
  LeaseId: string;
  TemplateName: string;
  constructor() {
    this.TemplateId = '';
    this.TemplateName = '';
    this.LeaseId = '';
  }
}
