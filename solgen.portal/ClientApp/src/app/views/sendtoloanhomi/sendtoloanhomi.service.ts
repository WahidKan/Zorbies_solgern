import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SendtoloanhomiService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  masters: Master[] = [];
  constructor(private http: HttpClient) { }

  //getInstallerRepNameList(salesRepName): Observable<any> {
  //  return this.http.get(this.baseUri + `opportunity/GetInstallerRepNameList?salesRepName=${salesRepName}`);
  //}

  //getInstallerRepNameList(salesRepName: any): Observable<any> {
  //  return this.http.get(this.baseUri + `opportunity/GetInstallerRepNameList?salesRepName=${salesRepName}`).pipe(
  //    map((response: any) => {
  //      this.masters = response;

  //    })
  //  );
  //}

  getInstallerRepNameList(salesRepName: any,accountId : any,companyId : any): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetInstallerRepNameList?salesRepName=${salesRepName}&accountId=${accountId}&companyId=${companyId}`).pipe(
      map((response: any) => {
        this.masters = response;

      })
    );
  }
  getSalesRepNameList(salesRepName: any,accountId : any,companyId : any): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetSalesRepNameList?salesRepName=${salesRepName}&accountId=${accountId}&companyId=${companyId}`).pipe(
      map((response: any) => {
        this.masters = response;

      })
    );
  }

  GetFileUploadSourceNoAuth(file: any) {
    return this.http.get(this.baseUri + `Lease/GetFileUploadSourceNoAuth?file=${file}`);

  }

  saveData(FormJsonData: sendToLoanHomiModelJsonData) {
    ;
    return this.http.post(this.baseUri + `opportunity/GenerateLoanApplication`, FormJsonData);
    //return this.http.post(this.baseUri + `opportunity/ApplicationSendLoanHomiDetail`, FormJsonData);
  }



}

export class sendToLoanHomiModel {
  OpportunityId: number;
  ProposalId: number;
  ContactId: number;
  AccountId: number;
  ContractId: number;
  LoanProductId: number;
  InstallerRepNameId: number;
  InstallerRepName: string;
  OppOwnerId: number;
  Financial_InstitutionId: number;
  loanProduct: string;
  DealerName: string;
  Term: string;
  country: number;
  BillingState: number;//state
  MailingState: string;;
  BillingStreet: string;//street
  BillingCity: string;//city
  MailingCity: string;
  BillingPostalCode: string;//postalCode
  System_Size_kW: string;//systemSizeKW
  Total_System_Cost: string;//totalSystemCost
  Downpayment_Amount: string; //downpaymentAmount
  Loan_Amount: string;//loanAmount
  Owntheproperty: string;//ownthePropertyID: string;
  NoofMortgages: string;//noOfMortgages: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  MobilePhone: string;
  Email: string;
  SSN: string;//ssn: string;
  DOB: string;
  YearsACA: string;//yearsAtCurrentResidence: string;
  MonthsACA: string;//monthsatCurrentResidence: string;
  PYearACR: string;
  PMonthACR: string;
  PRcountry: string;
  PRstate: string;
  PRCity: string;
  PRStreet: string;
  PRPostalCode: string;
  PHousingStatus: string;
  EmployerType: string;//employementTypeID: string;
  EmployerTypeName : string;
  Employer: string;//employerName
  YearsACE: string;// yearsAtCurrentEmployement: string;
  MonthsACE: string;//monthsAtCurrentEmployement: string;
  PEmployerName: string;//previousEmployerName: string;
  coPEmployerName: string;
  POccupation: string;//previousOccupation: string;
  coPOccupation: string;
  coPYearsACE: string;
  coPMonthsACE: string;
  PYearsACE: string;//yearsAtPreviousEmployement: string;
  PMonthsACE: string;//monthsAtPreviousEmployement: string;
  IncomeFreq: string;// lstIncomeFrequencyID: string;
  Income: string;//income: string;
  OIncomeFreq: string;//otherIncomeFrequencyID: string;
  //otherIncome: string;

  OIncomeMonthly: number;//otherIncome: string;
  OIncomeSource: string;//otherIncomeSource: string;
  GrossIncome: string;// grossIncome: string;
  Occupation: string;//occupation
  coFirstname: string;//coApp_firstName
  coLastname: string;//coApp_lastName
  coPhone: string;//coApp_phone
  coMobilePhone: string;
  coEmail: string;//coApp_email
  coDINumber: number;
  coSSN: string;//coApp_ssn
  coDOB: string;//coApp_dateofBirth
  //sameAsapplicant: string;
  coApp_country: string;
  coState: string;//coAppstate: string;
  coMailingState: string;
  coDLState: string;
  coDLStateLabel: string;
  coHousingStatus: string;
  coCity: string;//coApp_city: string;
  coMailingCity: string;

  // coStreetName: string;//coApp_street: string; coStreetName
  coMailingStreet: string;


  coAptSt: string;
  coStreetType: string;
  coRuralRoute: string;
  coPOBox: string;


  coMailingPostalCode: string;//coApp_postalCode

  coYearsACA: string;
  coMonthsACA: string;
  coPYearACR: string;
  coPMonthACR: string;
  coPRcountry: string;
  coPRstate: string;
  coPRCity: string;
  coPRStreet: string;
  coPRPostalCode: string;
  CoPHousingStatus: string;
  coRentMortage: string
  coBusinessPhone: number;


  coOccupation: string;//coApp_occupation
  coYearsACE: string;//
  coMonthsACE: string;//

  //coApp_yearsAtCurrentEmployement: string;
  // coApp_monthsAtCurrentEmployement: string;
  coEmployerType: string;//coApp_employementTypeID
  coEmployerTypeName: string;
  coEmployer: string;//coApp_employerName
  CoOIncomeFreq: string;//coApp_incomeFrequency: string;
  coIncomeFreq: string;
  CoIncome: string;//coApp_income: string;
  //coApp_otherIncomeFrequency: string;
  coOIncome: string;//coApp_otherIncome: string;
  coOIncomeSource: string;//coApp_otherIncomeSource: string;
  coGrossIncome: string;//coApp_grossIncome
  Iscoapplicant: boolean;//IsCoApplicantRequired: boolean;
  AutoPayment: boolean;//isAutoPaymentcheckBox: boolean;
  IsDocsSigned: number;//isTermCheckBox: boolean;
  CustomerSignedDate: string
  isBorrowers: boolean;
  IsOE: boolean;
  coIsOE: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  ReqFrom: string;
  CompanyId: number;
  CreatedBy: string;
  SIN: string;
  SalesRep : number;
  constructor() {
    this.OpportunityId = 0;
    this.ProposalId = 0;
    this.ContactId = 0;
    this.AccountId = 0;
    this.ContractId = 0;
    this.LoanProductId = 0;
    this.InstallerRepNameId = 0;
    this.OppOwnerId = 0;
    this.Financial_InstitutionId = 0;
    this.loanProduct = "";
    this.DealerName = "";
    this.Term = "";
    this.country = 0;
    this.BillingState = 0;
    this.MailingState = "";
    this.BillingStreet = "";
    this.BillingCity = "";
    this.MailingCity = "";
    this.BillingPostalCode = "";
    this.System_Size_kW = "";
    this.Total_System_Cost = "";
    this.Downpayment_Amount = "";
    this.Loan_Amount = "";
    this.Owntheproperty = "";//this.ownthePropertyID = "";
    this.NoofMortgages = "";//this.noOfMortgages = "";
    this.FirstName = "";
    this.LastName = "";
    this.Phone = "";
    this.MobilePhone = "",
    this.Email = "";
    this.SSN = "";//this.ssn = "";
    this.DOB = "";
    this.YearsACA = "";//this.yearsAtCurrentResidence = "";
    this.MonthsACA = "";//this.monthsatCurrentResidence = "";
    this.PYearACR = "";
    this.PMonthACR = "";
    this.PRcountry = "";
    this.PRstate = "";
    this.PRCity = "";
    this.PRStreet = "";
    this.PRPostalCode = "";
    this.PHousingStatus = "";
    this.EmployerType = "";
    this.EmployerTypeName = "";
    this.Employer = "";
    this.YearsACE = "";//this.yearsAtCurrentEmployement = "";
    this.MonthsACE = "";//this.monthsAtCurrentEmployement = "";
    this.PEmployerName = "";
    this.coPEmployerName = "";//this.previousEmployerName = "";
    this.POccupation = "";//this.previousOccupation = "";
    this.coPOccupation = "";
    this.coPYearsACE = "";
    this.coPMonthsACE = "";
    this.PYearsACE = "";//this.yearsAtPreviousEmployement = "";
    this.PMonthsACE = "";//this.monthsAtPreviousEmployement = "";
    this.IncomeFreq = "";//this.lstIncomeFrequencyID = "";
    this.Income = "";// this.income = "";
    this.OIncomeFreq = "";//this.otherIncomeFrequencyID = "";
    this.OIncomeMonthly = 0;//this.otherIncome = "";
    this.OIncomeSource = "";//this.otherIncomeSource = "";
    this.GrossIncome = "";//this.grossIncome = "";
    this.Occupation = "";
    this.coFirstname = "";
    this.coLastname = "";
    this.coPhone = "";
    this.coMobilePhone = "";
    this.coEmail = "";
    this.coDINumber = 0;
    this.coSSN = "";
    this.coDOB = "";
    // this.sameAsapplicant = "";
    this.coApp_country = "";
    //this.coState = "";//this.coState = "";
    this.coMailingState = "";
    this.coDLState = "";
    this.coDLStateLabel = "";
    this.coHousingStatus = "";
    //this.coCity = "";//this.coCity = "";
    this.coMailingCity = "";
    //this.coStreetName = "";//this.coStreetName = "";
    this.coMailingStreet = "";
    this.coAptSt = "";
    this.coStreetType = "";
    this.coRuralRoute = "";
    this.coPOBox = "";

    this.coMailingPostalCode = "";

    this.coYearsACA = "";
    this.coMonthsACA = "";
    this.coPYearACR = "";
    this.coPMonthACR = "";
    this.coPRcountry = "";
    this.coPRstate = "";
    this.coPRCity = "";
    this.coPRStreet = "";
    this.coPRPostalCode = "";
    this.CoPHousingStatus = "";
    this.coRentMortage = "";
    this.coBusinessPhone = 0;
    this.coOccupation = "";
    this.coYearsACE = "";//
    this.coMonthsACE = "";//
    this.coEmployerType = "";
    this.coEmployerTypeName = "";
    this.coEmployer = "";
    this.CoOIncomeFreq = "";//this.coIncomeFreq = "";
    this.coIncomeFreq = "";
    this.CoIncome = "";//this.coApp_income = "";
    this.coOIncome = "";// this.coApp_otherIncome = "";
    this.coOIncomeSource = "";//this.coApp_otherIncomeSource = "";
    this.coGrossIncome = "";
    this.Iscoapplicant = false;//this.IsCoApplicantRequired =false;
    this.AutoPayment = true;//this.isAutoPaymentcheckBox = false;
    this.IsDocsSigned = 0;//this.isTermCheckBox = false;
    this.CustomerSignedDate = "";
    this.isBorrowers = false;
    this.IsOE = false;
    this.coIsOE = false;
    this.CreatedAt = "";
    this.UpdatedAt = "";
    this.ReqFrom = "StandAlone";
    this.CompanyId = 0;
    this.CreatedBy = "";
    this.SIN = "";
    this.SalesRep = 0;
  }
}


export class sendToLoanHomiModelJsonData {
  FormJsonData: string;
  AuthToken: string;
  constructor() {
    this.FormJsonData = "";
    this.AuthToken = null;
  }
}

export class Master {
  masterId: string;
  masterNameId: string;
  masterName: string;
  masterNames: string;
  masterKey: string;
  masterValue: string;
  masterStatusId: string;
  masterStatusName: string;
  masterIsDeleted?: boolean;
  enabled?: boolean;
  userId?: any;
  text: string;
  value: string;
  isActive: string;
  masterDescription: string;
  constructor() {
    this.masterId = '';
    this.masterNameId = null;
    this.masterName = '';
    this.masterNames = '';
    this.masterKey = '';
    this.masterValue = '';
    this.masterStatusId = null;
    this.masterStatusName = '';
    this.enabled = true;
    this.isActive = '';
    this.masterIsDeleted = false;
    this.masterDescription = '';
  }
}
