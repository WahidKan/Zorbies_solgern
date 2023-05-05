import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  leaseAmount: any[] = [];
  lead: any[] = [];
  opportunity: any[] = [];
  pagedData: any;
  applicationInfo: any;
  stageInfo: any;
  constructor(private http: HttpClient) { }

  GetDashboardCounts() {
    return this.http.get(this.baseUri + `Dashboard/GetDashboardCounts`)
  }
  GetDashboardTop5Notifications(userid) {
    return this.http.get(this.baseUri + `Notification/GetNotificationList?IsDashboard=true&userId=${userid}`)
  }
  GetDashboardTop5Leases(userid, leaseStatus) {
    return this.http.get(this.baseUri + `Lease/GetLeaseList?IsDashboard=true&userId=${userid}&leaseStatus=${leaseStatus}`)
  }
  getLeaseListByStatus(searchText: any, leaseStatus: any, saleMan: any, expFrom: any, expTo: any, commFrom: any, commTo: any, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, isDashboard=true, contactId: any) {
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

  GetDashboardTop5Contacts(userid) {
    return this.http.get(this.baseUri + `Contact/GetContactList?sortColumn=createdOn&sortDir=desc&page=1&pageSize=10&userId=${userid}&isDashBoard=true`)
  }
  GetSalesDashboradLeaseAmount(userid) {
    return this.http.get(this.baseUri + `Dashboard/GetDashboardTotalLeaseAmount?userId=${userid}`)
      .pipe(
        map((response: any) => {
        this.leaseAmount = response;
        return this.leaseAmount;
        })
      );
  }
  setNotificationToRead(userId: any, noificationId: any) {
    return this.http.get(this.baseUri + `Notification/SetNotificationToRead?userId=${userId}&noificationId=${noificationId}`)
  }


  GetDashboardWidgetforuser() {
    return this.http.get(`${this.baseUri}Dashboard/GetDashboardWidgetforuser`);

  }
     
  GetDashboardWidgetForAddeditforuser(fromDate: any, toDate: any, recordFilter: any, teamId: any, teamMemberId: any, serviceTerritory: any, isSuperAdmin?: boolean, companyType?: string) {
    return this.http.get(`${this.baseUri}Dashboard/GetDashboardWidgetForAddeditforuser?fromDate=${fromDate}&toDate=${toDate}&recordFilter=${recordFilter}&teamID=${teamId}&teamMemberID=${teamMemberId}&serviceTerritory=${serviceTerritory}&isSuperAdmin=${isSuperAdmin}&companyType=${companyType}`);

  }

  GetDashboardWidgetsForSuperAdmin(fromDate: any, toDate: any, recordFilter: any, teamId: any, teamMemberId: any, serviceTerritory: any, isSuperAdmin?: boolean) {
    return this.http.get(`${this.baseUri}Dashboard/GetDashboardWidgetsForSuperAdmin?fromDate=${fromDate}&toDate=${toDate}&recordFilter=${recordFilter}&teamID=${teamId}&teamMemberID=${teamMemberId}&serviceTerritory=${serviceTerritory}&isSuperAdmin=${isSuperAdmin}`);

  }
  
  //SaveWidget(widgetId: any, dashborddata:any) {

  //  //return this.http.post(this.baseUri + `Dashboard/SaveWidget?widgetId=${widgetId}`);
  //  return this.http.post(`${this.baseUri}Dashboard/SaveWidget?widgetId=${widgetId}&dashborddata=${dashborddata}`, null);

  //  // this.baseUri + `Machine/RemoveMachinesByIds?macIds=${selected}`
  //}
  SaveWidget(dashborddata: DashboardData ) {
    ;
    //return this.http.post(this.baseUri + `Dashboard/SaveWidget?widgetId=${widgetId}`);
    return this.http.post(`${this.baseUri}Dashboard/SaveWidget`,  dashborddata );

    // this.baseUri + `Machine/RemoveMachinesByIds?macIds=${selected}`
  }
  GetDashboardWidgetcount() {
    return this.http.get(`${this.baseUri}Dashboard/GetDashboardWidgetcount`);
  }

  GetTaskList() {
    return this.http.get(this.baseUri + `Dashboard/GetTaskList`);
  }
  GetDashboardAppointmentList(fromDate: any, toDate:any) {
    return this.http.get(this.baseUri + `Dashboard/GetDashboardAppointmentList?fromDate=${fromDate}&toDate=${toDate}`);
  }
  GetOpportunityGraph(userid,fromDate: any, toDate:any) {
    return this.http.get(this.baseUri + `Dashboard/GetOpportunityGraph?userId=${userid}&fromDate=${fromDate}&toDate=${toDate}`)
      .pipe(
        map((response: any) => {
          this.opportunity = response;
          return this.opportunity;
        })
      );
  }

  getImages(accid: any) {
    return this.http.get(`${this.baseUri}loan/getUploadedImages?accid=${accid}`);
  }
  GetReferenceIntervalTime() {
    return this.http.get(this.baseUri + `Dashboard/GetReferenceIntervalTime`);
  }
  checkUserStatus() {
    return this.http.get(this.baseUri + `Dashboard/checkUserStatus`);
  }

  GetLeadGraph(userid,fromDate: any, toDate: any) {
    return this.http.get(this.baseUri + `Dashboard/GetLeadGraph?userId=${userid}&fromDate=${fromDate}&toDate=${toDate}`)
      .pipe(
        map((response: any) => {
          this.lead = response;
          return this.lead;
        })
      );
  }
  GetOpportunityOwnerGraph(userid, fromDate: any, toDate: any) {
    return this.http.get(this.baseUri + `Dashboard/GetOpportunityOwnerGraph?userId=${userid}&fromDate=${fromDate}&toDate=${toDate}`)
      .pipe(
        map((response: any) => {
          this.lead = response;
          return this.lead;
        })
      );
  }
  GetOpprotunityData() {
    return this.http.get(this.baseUri + `Dashboard/GetCustommerOpportunity`)
  }
  GetCompanyAccountData(opportunityId) {
    return this.http.get(this.baseUri + `Dashboard/GetCompanyAccountData?oppId=${opportunityId}`)
  }

  GetServiceAppointmentData(oppId){
    return this.http.get(this.baseUri + `Dashboard/GetServiceAppointmentData?oppId=${oppId}`)
  }


  GetProposalAndContractStatus(proposalId,subModuleCode){
    return this.http.get(this.baseUri + `Dashboard/GetProposalAndContractStatus?proposalId=${proposalId}&subModuleCode=${subModuleCode}`)
  }

  GetUnsignedDocument(opportunityId){
    return this.http.get(this.baseUri + `Dashboard/GetUnsignedDocument?opportunityId=${opportunityId}`)
  }

  GetHtmlTemplates() {
    return this.http.get(this.baseUri + `Dashboard/GetHtmlTemplates`)
  }

  GetCustomerDocumentsCount(contactId, opportunityId) {
 
    return this.http.get(this.baseUri + `Dashboard/GetCustomerDocumentsCount?contactId=${contactId}&oppId=${opportunityId}`)
  }
  //GetContactopportunities() {

  //}
  LoanApplicationNotification(id) {
    return this.http.get(this.baseUri + `Dashboard/LoanApplicationNotificationForCustommer?Id=${id}`)
  }

  GetCustomerAnnouncement() {
    return this.http.get(this.baseUri + `Dashboard/GetCustomerAnnouncements`)
  }

  GetLoanApplicationData(id) {
    return this.http.get(this.baseUri + `Dashboard/GetCustommerLoanApplication?Id=${id}`)
  }
  GetAppointments(){
    return this.http.get(this.baseUri + `Dashboard/GetCustommerLoanApplicationAppointment`)
  }
  getopportunitystage(opid: any) {
    return this.http.get(`${this.baseUri}opportunity/getopportunitystage?opid=${opid}`);
  }

  GetContractData(OpportunityId:any){
    return this.http.get(`${this.baseUri}Dashboard/GetContractData?OpportunityId=${OpportunityId}`);
  }

  GetApplicationDetails(id: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `loan/applicationinfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.applicationInfo = response;
          return true;
        })
      );
  }

  GetStageDetails(id: any) {
    return this.http.get(this.baseUri + `loan/loanstages?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.stageInfo = response;
          return true;
        })
      );
  }
  GetOpportunityview(opid: any, stageid: any) {
    return this.http.get(`${this.baseUri}opportunity/GetOpportunityview?opid=${opid}&stageid=${stageid}`);

  }
  addOrUpdateUploadFileOnAzzure(CompanySetUpModel: FormData) {
   // console.log("Data",CompanySetUpModel)
    return this.http.post(this.baseUri + `Dashboard/AddOrUpdateUploadFileOnAzzure`, CompanySetUpModel);
  }

  addOrUpdateUploadFileOnAzzureNoAuth(CompanySetUpModel: FormData) {
    // console.log("Data", CompanySetUpModel)
    return this.http.post(this.baseUri + `Dashboard/addOrUpdateUploadFileOnAzzureNoAuth`, CompanySetUpModel);
  }

  addOrUpdateUploadFileOnAzzurePDF(CompanySetUpModel: FormData) {
    // console.log("Data", CompanySetUpModel)
    return this.http.post(this.baseUri + `Dashboard/AddOrUpdateUploadFileOnAzzurePDF`, CompanySetUpModel);
  }

  addOrUpdateUploadFileOnAzzureNoAuthPDF(CompanySetUpModel: FormData) {
    // console.log("Data", CompanySetUpModel)
    return this.http.post(this.baseUri + `Dashboard/addOrUpdateUploadFileOnAzzureNoAuthPDF`, CompanySetUpModel);
  }


  customeruploadfile(CompanySetUpModel: FormData) {
    // console.log("Data", CompanySetUpModel)
    return this.http.post(this.baseUri + `Dashboard/customeruploadfile`, CompanySetUpModel);

  }

  customeruploadfilePDF(CompanySetUpModel: FormData) {
    // console.log("Data", CompanySetUpModel)
    return this.http.post(this.baseUri + `Dashboard/customeruploadfilePDF`, CompanySetUpModel);

  }

  GetDashboardAnoucements(isFirstTime: boolean): Observable<any> {
    return this.http.get(`${this.baseUri}Annoucement/GetDashboardAnnoucements/${isFirstTime}`);
  }

}

export class DashboardNotifications {
  businessName: string;
  equipment: string;
  createdOn: string;
  message: string;
  constructor() {
    this.businessName = '';
    this.equipment = '';
    this.createdOn = '';
    this.message = '';
  }
}
export class DashboardData {
data: string;
 
  constructor() {
    this.data = '';
   
  }
}

export class DashboardNewContacts {
  contactBussinessName: string;
  contactFirstName: string;
  contactlastName: string;
  contactMailAddressCity: string;
  appliedName: string;
  contactCreatedOn: string;
  constructor() {
    this.contactBussinessName = '';
    this.contactFirstName = '';
    this.contactlastName = '';
    this.contactMailAddressCity = '';
    this.appliedName = '';
    this.contactCreatedOn = '';
  }
}
export class DashboardCountsModel {
  totalStaff: string;
  totalContact: string;
  activeContact: string;
  totalBank: string;
  totalLease: string;
  activeLease: string;
  approvedLease: string;
  fundedLease: string;
  sentLease: string;
  constructor() {
    this.totalStaff = "0";
    this.totalContact= "0";
    this.activeContact= "0";
    this.totalBank= "0";
    this.totalLease= "0";
    this.activeLease= "0";
    this.approvedLease= "0";
    this.fundedLease = "0";
    this.sentLease = "0";
  }
}
export class DashboardTopNotificationModel {
  id: string;
  subject: string;
  message: string;
  senderName: string;
  receiverName: string;
  createdOn: string;
  constructor() {
    this.id = "";
    this.subject = "";
    this.message = "";
    this.senderName = "";
    this.receiverName = "";
    this.createdOn = "";
  }
}

export class DashboardTopNewLease {
  leaseId: string;
  leaseNumber: string;
  businessName: string;
  leaseStatus: string;
  bussinessPhone: string;
  leaseCreatedOn: string;
  name: string;
  leaseExpiryDate: string;
  leaseCommencementDate: string;
  constructor() {
    this.leaseId="";
    this.leaseNumber = "";
    this.businessName = "";
    this.leaseCommencementDate = "";
    this.leaseStatus = "";
    this.bussinessPhone = "";
    this.leaseCreatedOn = "";
    this.name = "";
    this.leaseExpiryDate = "";
  }
}

export class DashboardTopLeaseModel {
  leaseId: string;
  businessName: string;
  leaseStatus: string;
  leaseCreatedOn: string;
  salesmanName: string;
  constructor() {
    this.leaseId = "";
    this.businessName = "";
    this.leaseStatus = "";
    this.salesmanName = "";
    this.leaseCreatedOn = "";
  }
}

export class DashboardTopcontactModel {
  contactBussinessName: string;
  name: string;
  contactMailAddressCity: string;
  contactCreatedOn: string;
  constructor() {
    this.contactBussinessName = "";
    this.name = "";
    this.contactMailAddressCity = "";
    this.contactCreatedOn = "";
  }
}
export class AnnoucementModel {
  annoucementId: number;
  title: string;
  startDate: string;
  endDate: string;
  message: string;
  filePath: string;
  fileType: string;
}
