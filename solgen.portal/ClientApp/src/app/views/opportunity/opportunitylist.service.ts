import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { sendToLoanHomiModelJsonData } from '../sendtoloanhomi/sendtoloanhomi.service';

@Injectable({
  providedIn: 'root'
})
export class OpportunityListService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  cascadingFieldsList: any;
  constructor(private http: HttpClient) { }

  GetOpportunityList(listFilter: string, sortColumn: string, page: number, pageSize: number, sortDir: string, loginuserid: string, moduleName: string, submoduleName: string, companyId: number, custom_view_id: string, widgetType: any, recordFilter: any, teamID: any, teamMemberID: any, isOpportunityView: any, isGroupBy: any, isCheckboxTick: any): Observable<any> {
    if (typeof listFilter == "undefined" || listFilter == null) { listFilter = null; }
    else { listFilter = encodeURIComponent((listFilter)); }
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityList?listFilter=${listFilter}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&widgetType=${widgetType}&recordFilter=${recordFilter}&teamID=${teamID}&teamMemberID=${teamMemberID}&isAllRecords=${isCheckboxTick}&viewType=${isOpportunityView}&groupBy=${isGroupBy}`)
  }

  GetOpportunityDetails(id: any, moduleName: any, submoduleName: any) {
    return this.http.get(this.baseUri + `opportunity/GetOpportunityById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          //// // console.log("responseService12", response);
          this.editPage = response;
          return true;
        })
      );
  }
  GetOpportunityviewFileList(Id, isaccount, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetOpportunityviewFileList?Id=${Id}&isaccount=${isaccount}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: string) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  getType(SearchText: any,length: any,ID:any,Type:string): Observable<any> {  
    return this.http.get(this.baseUri + `opportunity/GetTypeOnBaseType?SerchText=${SearchText}&length=${length}&ID=${ID}&Type=${Type}`);
  }
  GetOppDataById(opportunityId: any): Observable<any> {
    return this.http.get(`${this.baseUri}opportunity/GetOppDataById/${opportunityId}`);
  }
  CheckLoanProductAssociate(id: any): Observable<any> {
    ;
    
    return this.http.get(`${this.baseUri}opportunity/CheckLoanAssociate?id=${id}`);
  }

  GetCascadingData(id: any, moduleName: any, submoduleName: any, companyId: any) {
    return this.http.get(this.baseUri + `common/GetCascadingData?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}`)
      .pipe(
        map((response: any) => {
          this.cascadingFieldsList = response;
          return true;
        })
      );
  }


  GetOpprtunityProductsList(opportunityId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetOpprtunityProductsList?opportunityId=${opportunityId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  GetOpprtunityWorkOrderList(opportunityId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetOpprtunityWorkOrderList?opportunityId=${opportunityId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetOpprtunityContractList(opportunityId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetOpprtunityContractList?opportunityId=${opportunityId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetOpprtunityAccountsList(opportunityId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetOpprtunityAccountsList?opportunityId=${opportunityId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  GetOpprtunityProposalsList(opportunityId, sortColumn, sortDir, pageIndex, pageSize): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetOpprtunityProposalsList?opportunityId=${opportunityId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }


  GetUtilityCompanyDll(id: any, length: any, serchText: string) {
    return this.http.get(`${this.baseUri}opportunity/GetUtilityCompanyDll?id=${id}&length=${length}&serchText=${serchText}`);
  }

  SaveUtility_Proposal_Design_Information(dataModel: Utility_Proposal_Design_Information_DataModel) {
    return this.http.post(this.baseUri + `opportunity/SaveUtility_Proposal_Design_Information`, dataModel);
  }

  GetOpportunityview(opid: any, stageid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityview?opid=${opid}&stageid=${stageid}`);

  }
  updateStage(opid: any, substageid: any) {
    return this.http.get(`${this.baseUri}opportunity/updateStage?opid=${opid}&substageid=${substageid}`);

  }
  getopportunitystage(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/getopportunitystage?opid=${opid}`);
  }
  GetOpportunityviewTabData(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityviewTabData?opid=${opid}`);
  }
  GetOpportunityViewProposal(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityViewProposal?opid=${opid}`);
  }
  GetOpportunityViewTask(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityViewTask?opid=${opid}`);
  }
  GetOpportunityViewWorkorder(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityViewWorkorder?opid=${opid}`);
  }
  GetOpportunityViewProduct(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityViewProduct?opid=${opid}`);
  }
  GetAppointmentbyopportunityId(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetAppointmentbyopportunityId?opid=${opid}`);
  }
  GetOpportunityViewAccData(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityViewAccData?opid=${opid}`);
  }
  GetOpportunityViewFileupload(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityViewFileupload?opid=${opid}`);
  }
  GetOpportunityViewcontractlist(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityViewcontractlist?opid=${opid}`);
  }
  addEditForm(opportunityJsonData: OpportunityJsonData) {
    return this.http.post(this.baseUri + `Lease/AddEditOpportunity`, opportunityJsonData);
  }
  GetAssignedUsers() {

    return this.http.get(`${this.baseUri}Task/TaskGetAssignedUsers`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;

          return response;
        })
      );
  }
  addeditannouncement(model: appointmentmodelopp) {
    // // console.log(model);
    return this.http.post(this.baseUri + `appointment/Save`, model);
  }
  SaveRequestDesignOpportunity(model: RequestDesign) {
    // // console.log(model);
    return this.http.post(this.baseUri + `opportunity/SaveRequestDesignOpportunity`, model);
  }
  GetRequestDesignOpportunity(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetRequestDesignOpportunity?opid=${opid}`);
  }
  SendAutomaticContract(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/SendAutomaticContract?opid=${opid}`);
  }
  DeleteRecords(deleteId: any, tableName: any,) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.editPage = response;
          return true;
        })
      );
  }
  GetOpportunityProposalList(id: any, submoduleid: any, objectname: any, name: string, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}Opportunity/GetOpportunityProposalList?id=${id}&submoduleid=${submoduleid}&objectname=${objectname}&nameSearch=${name}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getSendToLoanHomiDetail(opportunityId): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/GetSendToLoanHomiDetail?opportunityId=${opportunityId}`);
  }

  // saveData(FormJsonData: sendToLoanHomiModelJsonData) {
  //   // return this.http.post(`http://localhost:38063/Home/OpportunitySync`, JsonData);
  //   debugger;
  //   return this.http.post(this.baseUri + `opportunity/SendLoanHomiDetail`, FormJsonData);
  //   // return this.http.post(`http://45.35.44.173:8081/home/OpportunitySync`, jsonData.FormJsonData);
  // }
  saveData(data : sendToLoanHomiModelJsonData){
    return this.http.post(this.baseUri + `opportunity/GenerateLoanApplication`,data);
  }
  sendSMSToApplicant(AppPhoneNo) {
    return this.http.get(this.baseUri + `twilio/SendSMSToApplicant?phoneno=${AppPhoneNo}`);

  }

  checkExistingEmailAddress(emailAddress): Observable<any> {
    return this.http.get(this.baseUri + `opportunity/CheckExistingEmailAddress?email=${emailAddress}`);
  }
  GetWelcomecallNoteOpportunity(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetWelcomecallNoteOpportunity?opid=${opid}`);
  }
  SaveWelcomecallNoteOpportunity(model: welcomeNoteOpportunityModel) {
    // // console.log(model);
    return this.http.post(this.baseUri + `opportunity/SaveWelcomecallNoteOpportunity`, model);
  }
}
export class appointmentmodelopp {
  OpportunityId: number;
  AppointmentID: string;
  AppointmentTypeID: string;
  CustomerID: string;
  AppointmentDueDate: string;
  FromTime: string;
  ToTime: string;
  constructor() {
    this.OpportunityId = 0;
    this.AppointmentID = '';
    this.AppointmentTypeID = '';
    this.CustomerID = '',
      this.AppointmentDueDate = '';
    this.FromTime = '';
    this.ToTime = '';
  }
}

export class welcomeNoteOpportunityModel {
  WelcomeCallNote: string;
  opid: number;
  constructor() {
    this.WelcomeCallNote = '';
    this.opid = 0;
  }
}

export class RequestDesign {
  OpportunityId: number;
  designNotes: string;
  adderNotes: string;
  RequestDate: string;
  loanProduct: string;
  mountingLocation: string;
  mainPanelUpgrade: boolean;
  shopHasElectricalSubPanel: string;
  insulationUpgrade: boolean;
  smartThermostatInstallation: boolean;
  maxRUpgrade: boolean;
  ledLightbulbUpgrade: boolean;
  roofMaterial: string;
  reRoofNeeded: string;
  roofType: string;
  FromTime: string;
  redisgnReason: string;
  isredisgn: boolean;

  constructor() {
    this.OpportunityId = 0;
    this.adderNotes = '';
    this.designNotes = '';
    this.RequestDate = '';
    this.loanProduct = '';
    this.mountingLocation = '';
    this.mainPanelUpgrade = false;
    this.shopHasElectricalSubPanel = '';
    this.insulationUpgrade = false;
    this.smartThermostatInstallation = false;
    this.maxRUpgrade = false;
    this.ledLightbulbUpgrade = false;
    this.roofMaterial = '';
    this.reRoofNeeded = '';
    this.roofType = '';
    this.FromTime = '';
    this.redisgnReason = '';
    this.isredisgn = false;

  }

}

export class OpportunityJsonData {
  opportunityId: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  constructor() {
    this.opportunityId = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
  }
}
export class CheckboxData {
  controlname: string;
  controlvalues: string;
  constructor() {
    this.controlname = "";
    this.controlvalues = "";
  }
}

export class Utility_Proposal_Design_Information_DataModel {
  Utility_Proposal_Id: number;
  utility_Company: string;
  utility_Account_Number: string;
  utility_Meter_Number: string;
  Annual_kwh_Usage: string;
  Last_Utility_bill_URL: string;
  Home_Sqft: string;
  Sales_Tax_Rate: string;
  FTC_Not_Eligible: string;
  Billing_City: string;
  Billing_Street: string;
  Billing_State: string;
  Billing_Country: string;
  Billing_PostalCode: string;
  Full_Utility_Bill: string;
  No_Utility_Account_or_Meter_Number: string;

  constructor() {
    this.Utility_Proposal_Id = 0;
    this.utility_Company = "";
    this.utility_Account_Number = "";
    this.utility_Meter_Number = "";
    this.Annual_kwh_Usage = "";
    this.Last_Utility_bill_URL = "";
    this.Home_Sqft = "";
    this.Sales_Tax_Rate = "";
    this.FTC_Not_Eligible = "";
    this.Billing_City = "";
    this.Billing_Street = "";
    this.Billing_State = "";
    this.Billing_Country = "";
    this.Billing_PostalCode = "";
    this.Full_Utility_Bill = "";
    this.No_Utility_Account_or_Meter_Number = "";
  }
}

// export class sendToLoanHomiModel {
//   OpportunityId: number;
//   ProposalId: number;
//   ContactId: number;
//   AccountId: number;
//   ContractId: number;
//   LoanProductId: number;
//   OppOwnerId: number;
//   Financial_InstitutionId: number;
//   loanProduct: string;
//   Term: string;
//   country: number;
//   BillingState: number;//state
//   MailingState: string;;
//   BillingStreet: string;//street
//   BillingCity: string;//city
//   MailingCity: string;
//   BillingPostalCode: string;//postalCode
//   System_Size_kW: string;//systemSizeKW
//   Total_System_Cost: string;//totalSystemCost
//   Downpayment_Amount: string; //downpaymentAmount
//   Loan_Amount: string;//loanAmount
//   Owntheproperty: string;//ownthePropertyID: string;
//   NoofMortgages: string;//noOfMortgages: string;
//   FirstName: string;
//   LastName: string;
//   Phone: string;
//   MobilePhone: string;
//   Email: string;
//   SSN: string;//ssn: string;
//   DOB: string;
//   YearsACA: string;//yearsAtCurrentResidence: string;
//   MonthsACA: string;//monthsatCurrentResidence: string;
//   PYearACR: string;
//   PMonthACR: string;
//   PRcountry: string;
//   PRstate: string;
//   PRCity: string;
//   PRStreet: string;
//   PRPostalCode: string;
//   PHousingStatus: string;
//   EmployerType: string;//employementTypeID: string;
//   Employer: string;//employerName
//   YearsACE: string;// yearsAtCurrentEmployement: string;
//   MonthsACE: string;//monthsAtCurrentEmployement: string;
//   PEmployerName: string;//previousEmployerName: string;
//   coPEmployerName: string;
//   POccupation: string;//previousOccupation: string;
//   coPOccupation: string;
//   coPYearsACE: string;
//   coPMonthsACE: string;
//   PYearsACE: string;//yearsAtPreviousEmployement: string;
//   PMonthsACE: string;//monthsAtPreviousEmployement: string;
//   IncomeFreq: string;// lstIncomeFrequencyID: string;
//   Income: string;//income: string;
//   OIncomeFreq: string;//otherIncomeFrequencyID: string;
//   //otherIncome: string;

//   OIncomeMonthly: number;//otherIncome: string;
//   OIncomeSource: string;//otherIncomeSource: string;
//   GrossIncome: string;// grossIncome: string;
//   Occupation: string;//occupation
//   coFirstname: string;//coApp_firstName
//   coLastname: string;//coApp_lastName
//   coPhone: string;//coApp_phone
//   coMobilePhone: string;
//   coEmail: string;//coApp_email
//   coDINumber: number;
//   coSSN: string;//coApp_ssn
//   coDOB: string;//coApp_dateofBirth
//   //sameAsapplicant: string;
//   coApp_country: string;
//   coState: string;//coAppstate: string;
//   coMailingState: string;
//   coDLState: string;
//   coDLStateLabel: string;
//   coHousingStatus: string;
//   coCity: string;//coApp_city: string;
//   coMailingCity: string;

//   // coStreetName: string;//coApp_street: string; coStreetName
//   coMailingStreet: string;


//   coAptSt: string;
//   coStreetType: string;
//   coRuralRoute: string;
//   coPOBox: string;


//   coMailingPostalCode: string;//coApp_postalCode

//   coYearsACA: string;
//   coMonthsACA: string;
//   coPYearACR: string;
//   coPMonthACR: string;
//   coPRcountry: string;
//   coPRstate: string;
//   coPRCity: string;
//   coPRStreet: string;
//   coPRPostalCode: string;
//   CoPHousingStatus: string;
//   coRentMortage:string
//   coBusinessPhone: number;
//   coApp_prevHousingStatusID: string;


//   coOccupation: string;//coApp_occupation
//   coYearsACE: string;//
//   coMonthsACE: string;//

//   //coApp_yearsAtCurrentEmployement: string;
//   // coApp_monthsAtCurrentEmployement: string;
//   coEmployerType: string;//coApp_employementTypeID
//   coEmployer: string;//coApp_employerName
//   CoOIncomeFreq: string;//coApp_incomeFrequency: string;
//   coIncomeFreq: string;
//   CoIncome: string;//coApp_income: string;
//   //coApp_otherIncomeFrequency: string;
//   coOIncome: string;//coApp_otherIncome: string;
//   coOIncomeSource: string;//coApp_otherIncomeSource: string;
//   coGrossIncome: string;//coApp_grossIncome
//   Iscoapplicant: boolean;//IsCoApplicantRequired: boolean;
//   AutoPayment: boolean;//isAutoPaymentcheckBox: boolean;
//   IsDocsSigned: number;//isTermCheckBox: boolean;
//   CustomerSignedDate:string
//   isBorrowers: boolean;
//   IsOE: boolean;
//   coIsOE: boolean;
//   CreatedAt: string;
//   UpdatedAt: string;
//   ReqFrom: string;
//   CompanyId: number;
//   CreatedBy: string;
//   SIN: string;

//   constructor() {
//     this.OpportunityId = 0;
//     this.ProposalId = 0;
//     this.ContactId = 0;
//     this.AccountId = 0;
//     this.ContractId = 0;
//     this.LoanProductId = 0;
//     this.OppOwnerId = 0;
//     this.Financial_InstitutionId = 0;
//     this.loanProduct = "";
//     this.Term = "";
//     this.country = 0;
//     this.BillingState = 0;
//     this.MailingState = "";
//     this.BillingStreet = "";
//     this.BillingCity = "";
//     this.MailingCity = "";
//     this.BillingPostalCode = "";
//     this.System_Size_kW = "";
//     this.Total_System_Cost = "";
//     this.Downpayment_Amount = "";
//     this.Loan_Amount = "";
//     this.Owntheproperty = "";//this.ownthePropertyID = "";
//     this.NoofMortgages = "";//this.noOfMortgages = "";
//     this.FirstName = "";
//     this.LastName = "";
//     this.Phone = "";
//     this.MobilePhone="",
//       this.Email = "";
//     this.SSN = "";//this.ssn = "";
//     this.DOB = "";
//     this.YearsACA = "";//this.yearsAtCurrentResidence = "";
//     this.MonthsACA = "";//this.monthsatCurrentResidence = "";
//     this.PYearACR= "";
//     this.PMonthACR = "";
//     this.PRcountry="";
//     this.PRstate = "";
//     this.PRCity = "";
//     this.PRStreet = "";
//     this.PRPostalCode = "";
//     this.PHousingStatus = "";
//     this.EmployerType = "";
//     this.Employer = "";
//     this.YearsACE = "";//this.yearsAtCurrentEmployement = "";
//     this.MonthsACE = "";//this.monthsAtCurrentEmployement = "";
//     this.PEmployerName = "";
//     this.coPEmployerName = "";//this.previousEmployerName = "";
//     this.POccupation = "";//this.previousOccupation = "";
//     this.coPOccupation = "";
//     this.coPYearsACE = "";
//     this.coPMonthsACE = "";
//     this.PYearsACE = "";//this.yearsAtPreviousEmployement = "";
//     this.PMonthsACE = "";//this.monthsAtPreviousEmployement = "";
//     this.IncomeFreq = "";//this.lstIncomeFrequencyID = "";
//     this.Income = "";// this.income = "";
//     this.OIncomeFreq = "";//this.otherIncomeFrequencyID = "";
//     this.OIncomeMonthly = 0;//this.otherIncome = "";
//     this.OIncomeSource = "";//this.otherIncomeSource = "";
//     this.GrossIncome = "";//this.grossIncome = "";
//     this.Occupation = "";
//     this.coFirstname = "";
//     this.coLastname = "";
//     this.coPhone = "";
//     this.coMobilePhone = "";
//     this.coEmail = "";
//     this.coDINumber = 0;
//     this.coSSN = "";
//     this.coDOB = "";
//     // this.sameAsapplicant = "";
//     this.coApp_country = "";
//     //this.coState = "";//this.coState = "";
//     this.coMailingState = "";
//     this.coDLState = "";
//     this.coDLStateLabel = "";
//     this.coHousingStatus = "";
//     //this.coCity = "";//this.coCity = "";
//     this.coMailingCity = "";
//     //this.coStreetName = "";//this.coStreetName = "";
//     this.coMailingStreet = "";
//     this.coAptSt = "";
//     this.coStreetType = "";
//     this.coRuralRoute = "";
//     this.coPOBox = "";

//     this.coMailingPostalCode = "";
//     this.coApp_prevHousingStatusID = "";
//     this.coYearsACA = "";
//     this.coMonthsACA = "";
//     this.coPYearACR="";
//     this.coPMonthACR="";
//     this.coPRcountry="";
//     this.coPRstate="";
//     this.coPRCity="";
//     this.coPRStreet="";
//     this.coPRPostalCode="";
//     this.coRentMortage = "";
//     this.coBusinessPhone = 0;
//     this.CoPHousingStatus = "";

//     this.coOccupation = "";
//     this.coYearsACE = "";//
//     this.coMonthsACE = "";//

//     //this.coApp_yearsAtCurrentEmployement = "";
//     //this.coApp_monthsAtCurrentEmployement = "";
//     this.coEmployerType = "";
//     this.coEmployer = "";
//     this.CoOIncomeFreq = "";//this.coIncomeFreq = "";
//     this.coIncomeFreq = "";
//     this.CoIncome = "";//this.coApp_income = "";
//     // this.coApp_otherIncomeFrequency = "";
//     this.coOIncome = "";// this.coApp_otherIncome = "";
//     this.coOIncomeSource = "";//this.coApp_otherIncomeSource = "";
//     this.coGrossIncome = "";
//     this.Iscoapplicant = false;//this.IsCoApplicantRequired =false;
//     this.AutoPayment = true;//this.isAutoPaymentcheckBox = false;
//     this.IsDocsSigned = 0;//this.isTermCheckBox = false;
//     this.CustomerSignedDate = "";
//     this.isBorrowers = false;
//     this.IsOE = false;
//     this.coIsOE = false;
//     this.CreatedAt = "";
//     this.UpdatedAt = "";
//     this.ReqFrom = "SolgenWeb";
//     this.CompanyId = 0;
//     this.CreatedBy = "";
//     this.SIN = "";

//   }
// }



// export class sendToLoanHomiModelJsonData {
//   FormJsonData: string;
//   AuthToken: string;
//   constructor() {
//     this.FormJsonData = "";
//     this.AuthToken = null;
//   }
// }
