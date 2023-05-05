import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { FormGroup, Form } from '@angular/forms';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Source } from 'webpack-sources';

@Injectable({
  providedIn: 'root'
})
export class LoanapplicationserviceService {

  loanProductsubject: Subject<any> = new Subject<any>();
  loanChangeOrderrefreshComponent: Subject<any> = new Subject<any>();
  loanappliacntsubject: Subject<any> = new Subject<any>();
  isproductenable: Subject<any> = new Subject<any>();
  isapplicantCreditScore: Subject<any> = new Subject<any>();

  loanProgress: Subject<LoanProgressModel> = new Subject<LoanProgressModel>();
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  loanId: any;
  notificationArray = [];
  opid: any;
  sftpLogData: any;
  applicationInfo: any;
  stageInfo: any;
  sysInfo: any;
  mobileSubmoduleId: any;
  submoduleId: any;
  applicantInfo: any
  changeOrderInfo: any
  coApplicantInfo: any;
  installerpropertyInfo: any
  releaseFundsInfo: any
  paymentInfo: any
  loanProductInfo: any;
  ntpInfo: any;
  auditHistoryInfo: any;
  formFieldsList: any;
  historyDetailData: any;
  commentHistoryData: any;
  AssignedUserData: any;
  debtDetail: any;
  incomeDetail: any;
  ratioDetail: any;
  LoanProductData: any;
  AssignedpagedData: any;
  transferApplicationData: any;
  transferpagedData: any;
  constructor(private http: HttpClient) {
    this.sub = new Subject<String>()
    this.loanChangeOrderrefreshComponent = new Subject<String>();

    this.isapplicantCreditScore = new Subject<String>();
  }

  public sub: Subject<String>;
  GetCanceledLoanApplicationList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, batchid: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}loan/GetCanceledLoanApplicationList?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${userId},&batchid=${batchid}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  ShareDocLink(id, type: string = '', borrowerPhoneNumber: string = '', applicantName: string = '') {
    return this.http.get(`${this.baseUri}loan/ShareLink?id=${id}&type=${type}&borrowerPhoneNumber=${borrowerPhoneNumber}&applicantName=${applicantName}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetLoanApplicationList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, batchid: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}Bank/GetLoanApplicationList?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${userId},&batchid=${batchid}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetCompletedLoanApplicationList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string, batchid: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}loan/GetCompletedLoanApplicationList?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&batchid=${batchid}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  SendToBankUser(id: number, applicationNumber: string, reason: string, reqdate: string) {
    return this.http.get(`${this.baseUri}loan/SendToBankUser?id=${id}&applicationNumber=${applicationNumber}&reason=${reason}&reqdate=${reqdate}`).pipe(
      map((response: any) => {

        return true;
      })
    );

  }



  getAddCommentAssignToList(loanId: any, isPrivate: any) {
    return this.http.get(`${this.baseUri}loan/GetToUserDrpList?loanId=${loanId}&isPrivate=${isPrivate}`)
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

  GetcibilScoreList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}Bank/GetcibilScoreList?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );

  }

  savesubstageconfig(data: any, sequencemandatory: boolean) {
    // // console.log('ab', data);

    return this.http.get(this.baseUri + `loan/savestages?data=${data}&sequencemandatory=${sequencemandatory}`,);
  }
  getloansubstage() {


    return this.http.get(this.baseUri + `loan/getloansubstage`);
  }
  GetSubStageDll(): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetSubStageDll`)
  }

  addUpdateSystemInfo(sysInfo: SystemInfo) {
    return this.http.post(`${this.baseUri}loan/AddUpdateSystemInfo`, sysInfo);
  }
  GetSystemInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetSystemInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.sysInfo = response;
          return true;
        })
      );
  }

  addUpdateApplicant(applicant: ApplicantInfo) {
    // // console.log('applicantInfoService:', applicant)
    return this.http.post(`${this.baseUri}loan/AddUpdateApplicant`, applicant);
  }
  GetApplicantInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetApplicantInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {
          //// console.log('responseresponse', response);
          this.applicantInfo = response;
          return true;
        })
      );
  }
  GetbankApplicantInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetbankApplicantInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {
          //// console.log('responseresponse', response);
          this.applicantInfo = response;
          return true;
        })
      );
  }

  addUpdateCoApplicant(applicant: CoApplicantInfo) {
    // // console.log('applicantInfoService:', applicant)
    return this.http.post(`${this.baseUri}loan/AddUpdateCoApplicant`, applicant);
  }
  GetCoApplicantInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetCoApplicantInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.coApplicantInfo = response;
          return true;
        })
      );
  }


  addUpdateInstallerProperty(applicant: any) {
    // // console.log('applicantInfoService:', applicant)
    return this.http.post(`${this.baseUri}loan/AddUpdateInstallerProperty`, applicant);
  }
  GetInstallerPropertyInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetInstallerPropertyInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.installerpropertyInfo = response;
          return true;
        })
      );
  }


  addUpdatePaymentInfo(payment: any) {
    // // console.log('paymentInfopaymentInfo:', payment)
    return this.http.post(`${this.baseUri}loan/AddUpdatePaymentInfo`, payment);
  }
  GetPaymentInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetPaymentInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.paymentInfo = response;
          return true;
        })
      );
  }


  addUpdateLoanProduct(loanProduct: any) {
    return this.http.post(`${this.baseUri}loan/AddUpdateLoanProduct`, loanProduct);
  }
  GetLoanProductInfo(id: any, submoduleName: string = null) {
    return this.http.get(this.baseUri + `loan/GetLoanProductInfo?applicationid=${id}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {

          this.loanProductInfo = response;
          return true;
        })
      );
  }


  addUpdateReleaseFunds(applicant: any) {
    // // console.log('releaseFundsInfo:', applicant)
    return this.http.post(`${this.baseUri}loan/addUpdateReleaseFunds`, applicant);
  }
  GetReleaseFundsInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetReleaseFundsInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.releaseFundsInfo = response;
          return true;
        })
      );
  }

  GetInstallStepFileUploadSource(file: any) {

    return this.http.get(this.baseUri + `lease/GetInstallStepFileUploadSource?file=${file}`);
  }

  addUpdateNtp(ntp: any) {
    // // console.log('applicantInfoService:', ntp)
    return this.http.post(`${this.baseUri}loan/AddUpdateNtp`, ntp);
  }
  getImages(accid: any) {
    return this.http.get(`${this.baseUri}loan/getUploadedImages?accid=${accid}`);
  }
  synctosalesforce(loanid: any) {
    return this.http.get(`${this.baseUri}loan/SyncToSF?loanid=${loanid}`);
  }
  GetNtpInfo(id: any) {
    return this.http.get(this.baseUri + `loan/GetNtpInfo?applicationid=${id}`)
      .pipe(
        map((response: any) => {

          this.ntpInfo = response;
          return true;
        })
      );
  }

  GetFormFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, isFor: any = null) {
    debugger;
    return this.http.get(`${this.baseUri}Common/GetFormFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&isFor=${isFor}`)
      .pipe(
        map((response: any) => {
          this.formFieldsList = response;
          return true;
        })
      );
  }
  GetDataForVerificationList(modulename: any, submoduleName: any, companyId: any, Id: any, stageid: any) {
    return this.http.get(`${this.baseUri}Common/GetDataForVerificationList?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&stageid=${stageid}&PrimaryId=${Id}`)
      .pipe(
        map((response: any) => {
          this.formFieldsList = response;
          return true;
        })
      );
  }
  GetDataForBankVerificationList(modulename: any, submoduleName: any, companyId: any, Id: any, stageid: any) {
    return this.http.get(`${this.baseUri}Common/GetDataForBankVerificationList?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&stageid=${stageid}&PrimaryId=${Id}`)
      .pipe(
        map((response: any) => {
          this.formFieldsList = response;
          return true;
        })
      );
  }
  GetProductData(companyId: any, Id: any, loanid: any) {
    return this.http.get(`${this.baseUri}LoanProduct/GetLoanProductDetailById?id=${Id}&loanid=${loanid}`)
      .pipe(
        map((response: any) => {
          this.LoanProductData = response;
          return true;
        })
      );
  }
  addEditForm(JsonData: JsonData) {
    return this.http.post(`${this.baseUri}loan/AddUpdateSystemInfo`, JsonData);
  }
  addEditverificationdata(JsonData: JsonData) {
    return this.http.post(`${this.baseUri}loan/AddUpdateVerificationdata`, JsonData);
  }
  addEditbankverificationdata(JsonData: JsonData) {
    return this.http.post(`${this.baseUri}loan/AddUpdateBankdata`, JsonData);
  }

  addEditFormDynamic(JsonData: JsonData) {
    return this.http.post(`${this.baseUri}loan/AddUpdateDynamicForm`, JsonData);
  }

  addEditInstallStep(JsonData: FormData) {
    // // console.log("JsonData", JsonData);

    return this.http.post(`${this.baseUri}loan/AddUpdateInstallStepForm`, JsonData);
  }

  getNoticationList(applicationid: any, sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any) {
    return this.http.get(this.baseUri + `loan/GetLoanapplicationNotificationList?applicationid=${applicationid}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageNumber=${pageNumber}&pageSizeValue=${pageSizeValue}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GettemplatetDll(objectname: any,) {
    return this.http.get(`${this.baseUri}EmailTemplate/GettemplatetDll?objectname=${objectname}`)
  }

  GetContactDll(applicationId: any, submoduleid: any, objectname: any, loanId: any) {
    return this.http.get(`${this.baseUri}loan/GetToUserDrpList?loanId=${loanId}`)
  }

  GetFollowUpToList(loanId: any, commenthistoryId: any) {
    return this.http.get(`${this.baseUri}loan/GetFollowUpToList?loanId=${loanId}&commenthistoryId=${commenthistoryId}`)
  }


  getCCUserdll(applicationId: any, submoduleid: any, objectname: any) {
    return this.http.get(`${this.baseUri}loan/GetCCUserDrpList`)
  }
  GetLoanApplicationSales_Rep(applicationid: any) {
    return this.http.get(`${this.baseUri}loan/GetLoanApplicationSales_Rep?applicationid=${applicationid}`)
  }


  GetAuditHistoryList(sectionId: any, tableName: any, appid: any): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetAuditHistoryList?sectionId=${sectionId}&tableName=${tableName}&appid=${appid}`)
      .pipe(
        map((response: any) => {
          // // console.log('auditHistoryInfo', response)
          this.auditHistoryInfo = response;
          return true;
        })
      );
  }

  GetAuditHistoryDetail(id1: any, id2: any, tblName1: string, tblName2: string, appid: any): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetAuditHistoryDetail?id1=${id1}&id2=${id2}&tblName1=${tblName1}&tblName2=${tblName2}&appid=${appid}`)
      .pipe(
        map((response: any) => {
          this.historyDetailData = response;
          return true;
        })
      );
  }

  SendManualNotification(model: MenualNotificationModel) {
    //// console.log('MenualNotificationModel:', model);
    return this.http.post(this.baseUri + `loan/SendManualNotification`, model);
  }
  pullCreditScoreData(loanApplicationId: any, applicants: any, bureauId: any): Observable<any> {
    return this.http.get(`${this.baseUri}CreditScore/PullCreditScoreData/${loanApplicationId}/applicants/${applicants}/bureau/${bureauId}`);
  }

  getCreditScoreData(loanApplicationId: any): Observable<any> {
    return this.http.get(`${this.baseUri}CreditScore/GetCreditScoreData/${loanApplicationId}`);
  }

  getCreditBureauHistory(loanApplicationId: any, sortColumn: any, sortDir: any, page: any, pageSize: any): Observable<any> {
    return this.http.get(`${this.baseUri}CreditScore/GetCreditBureauHistory/${loanApplicationId}?SortColumn=${sortColumn}&SortDir=${sortDir}&pageIndex=${page}&PageSize=${pageSize}`);
  }

  getCreditBureauList(): Observable<any> {
    return this.http.get(`${this.baseUri}CreditBureau/GetCreditBuearuList`);
  }
  GetLoanapplicationDocumentType(id) {
    //return this.http.get(`${this.baseUri}loan/GetLoanapplicationDocumentType?id=${id}`);
    return this.http.get(this.baseUri + `loan/GetLoanapplicationDocumentType?id=${id}`);
  }
  GetLoanapplicationDocumentTypeforcust(id) {
    //return this.http.get(`${this.baseUri}loan/GetLoanapplicationDocumentType?id=${id}`);
    return this.http.get(this.baseUri + `loan/GetLoanapplicationDocumentTypeforcust?id=${id}`);
  }
  GetDecryptid(encryptid: string = "") {
    //// console.log('encryptid service', encryptid);
    return this.http.get(this.baseUri + `loan/GetDecryptid?encryptid=${encryptid}`);
  }
  addcomment(data: commentmodel) {
    return this.http.post(this.baseUri + `loan/AddComment`, data);
  }
  replyCustcomment(data: replyCommentmodel) {
    //// console.log('data:', data)
    return this.http.post(this.baseUri + `loan/ReplyComment`, data);
  }
  getCommentHistoryList(sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any, loanId: any) {
    return this.http.get(this.baseUri + `loan/GetCommentHistoryList?sortColumn=${sortColumn}&sortDir=${sortDir}&pageNumber=${pageNumber}&pageSizeValue=${pageSizeValue}&loanId=${loanId}`)
      .pipe(
        map((response: any) => {
          this.commentHistoryData = response;
          return true;
        })
      );
  }

  getAssignedUserList(sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any, loanId: any, commentId: any): Observable<any> {
    return this.http.get(this.baseUri + `loan/GetAssignedUserList?sortColumn=${sortColumn}&sortDir=${sortDir}&pageNumber=${pageNumber}
                                                                  &pageSizeValue=${pageSizeValue}&loanId=${loanId}&commentId=${commentId}`)
      .pipe(
        map((response: any) => {
          this.AssignedUserData = response;

          return true;
        })
      );
  }

  getRuleEngineHistoryList(sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any, loanId: any) {
    return this.http.get(this.baseUri + `loan/GetRuleEngineHistoryList?sortColumn=${sortColumn}&sortDir=${sortDir}&pageNumber=${pageNumber}&pageSizeValue=${pageSizeValue}&loanId=${loanId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetExpensesIncomeDetail(loanId: any) {
    return this.http.get(this.baseUri + `loan/GetExpensesIncomeDetail?loanId=${loanId}`)
      .pipe(
        map((response: any) => {

          this.incomeDetail = response;
          return true;
        })
      );
  }
  GetExpensesRatiosDetail(loanId: any) {
    return this.http.get(this.baseUri + `loan/GetExpensesRatiosDetail?loanId=${loanId}`)
      .pipe(
        map((response: any) => {

          this.ratioDetail = response;
          return true;
        })
      );
  }

  GetExpensesDebtDetail(loanId: any) {
    return this.http.get(this.baseUri + `loan/GetExpensesDebtDetail?loanId=${loanId}`)
      .pipe(
        map((response: any) => {

          this.debtDetail = response;
          return true;
        })
      );
  }

  addUpdateExpenseIncome(expenseIncomeModel: ExpenseIncomeModel) {
    return this.http.post(this.baseUri + `loan/AddUpdateExpenseIncome`, expenseIncomeModel);

  }
  saveReason(reason: reasonModel) {
    return this.http.post(this.baseUri + `loan/saveReason`, reason);
  }
  saveUncacnelReason(reason: reasonModel) {
    return this.http.post(this.baseUri + `loan/UncancelLoanApplication`, reason);
  }
  saveOverrideReason(reason: reasonModel) {
    return this.http.post(this.baseUri + `loan/saveOverrideReason`, reason);
  }

  addUpdateExpenseDebt(expenseDebtModel: ExpenseDebtModel) {
    return this.http.post(this.baseUri + `loan/AddUpdateExpenseDebt`, expenseDebtModel);

  }

  MergeAndDownloadWebmergeDocument(documentId, documentKey, LoanApplicationId, bankId): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/MergeAndDownloadWebmergeDocument/${documentId}/${documentKey}/${LoanApplicationId}/${bankId}`, { responseType: 'blob' });
  }

  getLoanDocslist(loanId, sortColumn, sortDir, pageNumber, pageSize): Observable<any> {

    return this.http.get(`${this.baseUri}LoanDocumentHistory/GetDocumentHistoryList?loanApplicationId=${loanId}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${pageNumber}&PageSize=${pageSize}`);
  }

  voidDocuments(loanApplicationId: any, resend): Observable<any> {
    return this.http.get(`${this.baseUri}LoanDocumentHistory/VoidDocuments/${loanApplicationId}/${resend}`);
  }

  voidChangeOrder(loanApplicationId: any): Observable<any> {
    return this.http.get(`${this.baseUri}LoanDocumentHistory/VoidChangeOrder/${loanApplicationId}`);
  }

  MergeAndDownloadWebmergeDocuments(LoanApplicationId, bankId): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/MergeAndDownloadWebmergeDocuments/${LoanApplicationId}/${bankId}`);
  }

  MergeWebmergeDataRoute(LoanApplicationId, bankId): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/MergeWebmergeDataRoute/${LoanApplicationId}/${bankId}`);
  }

  mergeWebmergeMapping(LoanApplicationId, bankId, IsChangeOrder: boolean = false, SignerBy: string = null): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/MergeWebmergeMapping/${LoanApplicationId}/${bankId}/${IsChangeOrder}/${SignerBy}`);
  }

  SendWebmergeDocumentEmail(loanApplicationId: any, documentHistoryId: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUri}LoanDocumentHistory/SendWebmergeDocumentEmail/${loanApplicationId}/${documentHistoryId}`, data);
  }

  DownloadFile(loanApplicationId: any, historyId: any): Observable<any> {
    return this.http.get(`${this.baseUri}LoanDocumentHistory/DownloadFile/${loanApplicationId}/${historyId}`, { responseType: 'blob' })
  }

  DownloadBankDocument(documentId: string, SourceType: string, SolgenFileUrl: string, LoanAppId: string): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/DownloadBankDocument?documentId=${documentId}&SourceType=${SourceType}&SolgenFileUrl=${SolgenFileUrl}&LoanAppId=${LoanAppId}`, { responseType: 'blob' })
  }

  UpdateLoanHistoryManual(bankId: any, historyId: any, IsChangeOrder: any, loanApplicationId: any, data: FormData): Observable<any> {
    return this.http.post(`${this.baseUri}LoanDocumentHistory/UpdateLoanHistoryManual/${bankId}/${historyId}/${IsChangeOrder}/${loanApplicationId}`, data)
  }
  //getDocumentForReceiveAndPending() {
  //  //getDocumentForReceiveAndPending(id) {
  //  //  return this.http.get(this.baseUri + `loanproduct/GetLoanProductDiscountCategoryEdit?productId=${id}`);
  //  //}

  //  this.loanapplicationservice.getDocumentForReceiveAndPending(this.loanId).subscribe((result: any) => {
  //    //this.creditBureauModel = result;


  //  });
  //}

  getDocumentForReceiveAndPending(id) {
    return this.http.get(this.baseUri + `loan/getDocumentForReceiveAndPending?productId=${id}`);
  }
  getDocumentForReceiveAndPendingforcustomer(id, companyid, reqFrom) {
    return this.http.get(this.baseUri + `loan/getDocumentForReceiveAndPendingForCust?productId=${id}&companyid=${companyid}&reqFrom=${reqFrom}`);
  }

  GetPendingDocumentName(id) {
    return this.http.get(this.baseUri + `loan/GetPendingDocumentName?loanId=${id}`);
  }
  GetLoanApplicationBankerList(name: string, sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any, loanapplicationId: any) {
    return this.http.get(this.baseUri + `loan/GetLoanApplicationBankerList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageNumber=${pageNumber}&pageSizeValue=${pageSizeValue}&loanapplicationId=${loanapplicationId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  GetLoanApplicationSalesList(name: string, userType: string, sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any, loanapplicationId: any, listType: string = '') {
    return this.http.get(this.baseUri + `loan/GetLoanApplicationSalesList?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageNumber=${pageNumber}&pageSizeValue=${pageSizeValue}&loanapplicationId=${loanapplicationId}&listType=${listType}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  saveAssociateBanker(bankermodel: BankerModel) {
    return this.http.post(this.baseUri + `loan/saveAssociateBanker`, bankermodel);
  }

  saveAssignedSalesUserDetail(bankermodel: BankerModel) {
    return this.http.post(this.baseUri + `loan/saveAssignedSalesUserDetail`, bankermodel);
  }
  saveAssignedApplicationToDealer(transferLoanAppModel: TransferLoanAppModel) {
    return this.http.post(this.baseUri + `loan/saveAssignedApplicationToDealer`, transferLoanAppModel);
  }

  getCreditReport(loanApplicationId, applicant, BureauId, rawData: boolean): Observable<any> {
    return this.http.get(`${this.baseUri}CreditScore/GetCreditScoreReport/${loanApplicationId}/applicants/${applicant}/bureau/${BureauId}?rawData=${rawData}`);
  }

  getFileStatus(loanApplicationId, applicant, BureauId): Observable<any> {
    return this.http.get(`${this.baseUri}CreditScore/GetFileStatus/${loanApplicationId}/applicants/${applicant}/bureau/${BureauId}`);
  }

  testPullCreditScore(loanApplicationId, applicant, BureauId, Score): Observable<any> {
    return this.http.get(`${this.baseUri}CreditScore/TestPullCreditScoreData/${loanApplicationId}/applicants/${applicant}/bureau/${BureauId}/Score/${Score}`);
  }

  updateOverRide(loanId: any) {
    return this.http.get(`${this.baseUri}loan/UpdateOverRide?loanId=${loanId}`)
  }

  UpdateDenyReson(loanId: number, type: string, denyReason: any) {
    return this.http.get(this.baseUri + `loan/UpdateDenyReson?loanId=${loanId}&type=${type}&denyReason=${denyReason}`);
  }

  GetNewLoanApplicationList(name: string, sortColumn: string, sortOrder: string, page: number, pageSize: number, type: string, custom_view_id: number, batchid: number, listType: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else {
      name = encodeURIComponent((name));
    }
    return this.http.get(`${this.baseUri}loan/GetNewLoanApplicationList?name=${name}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageIndex=${page}&pageSize=${pageSize}&type=${type}&custom_view_id=${custom_view_id}&batchid=${batchid}&listType=${listType}`)
  }
  addEditChangeOrderForm(JsonData: FormData) {
    return this.http.post(this.baseUri + `loan/AddUpdateChangeOrder`, JsonData);
  }
  GetFileUploadSource(file: any, loanid: any = 0) {
    return this.http.get(this.baseUri + `loan/GetFileUploadSource?file=${file}`);
  }

  GetFileSource(loanid: any = 0, type: string = '') {
    return this.http.get(this.baseUri + `loan/GetFileSource?loanid=${loanid}&type=${type}`);
  }

  GetSignNowDocumentHistory(document_id: string): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetSignNowDocumentHistory/${document_id}`)
  }

  GetDocusignDocumentHistory(document_id: string): Observable<any> {
    return this.http.get(`${this.baseUri}WebMerge/GetDocusignDocumentHistory/${document_id}`)
  }

  GetChangeOrderInfoById(id: any) {
    return this.http.get(this.baseUri + `loan/GetChangeOrderInfoById?applicationid=${id}`)
      .pipe(
        map((response: any) => {
          this.changeOrderInfo = response;
          return true;
        })
      );
  }

  getTwilioSMSDetail(applicationid: number, borrowerNumber: string) {
    return this.http.get(this.baseUri + `loan/GetTwilioSMSDetail?applicationid=${applicationid}&borrowerNumber=${borrowerNumber}`);
  }

  SwapApplicants(loanId: any) {
    return this.http.get(`${this.baseUri}Loan/SwapApplicants/${loanId}`)
  }

  savePropertySearch(firstName: string, middelName: string, lastName: string, streetname: string, city: string, stateCode: string) {
    return this.http.get(`${this.baseUri}Loan/SavePropertySearch?firstName=${firstName}&middelName=${middelName}&lastName=${lastName}&streetname=${streetname}&city=${city}&stateCode=${stateCode}`)
    //.pipe(
    //  map((response: any) => {
    //    this.formFieldsList = response;
    //    return true;
    //  })
    //);
  }

  savePropertySearchbyFM(Name: string, fulladdress: string) {
    return this.http.get(`${this.baseUri}Loan/PropertySearchFM?Name=${Name}&fulladdress=${fulladdress}`)

  }


  GetLoanApplicationReportList(runLoanApplicationReportModel: RunLoanApplicationReportModel): Observable<any> {
    // customWhereCondition = encodeURIComponent(customWhereCondition);
    // return this.http.get(`${this.baseUri}loan/GetLoanApplicationReportList?sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageIndex=${page}&pageSize=${pageSize}&selectedFields=${selectedFields}&fromDate=${fromDate}&toDate=${toDate}&customWhereCondition=${customWhereCondition}&filterData=${filterData}`)
    return this.http.post(this.baseUri + `loan/GetLoanApplicationReportList`, runLoanApplicationReportModel);
  }

  getAllReportList(sortColumn: string, sortOrder: string, page: number, pageSize: number, searchText: string): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetAllReportList?sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageIndex=${page}&pageSize=${pageSize}&searchText=${searchText}`)
  }

  getReportDataById(id: any, companyType: string) {
    return this.http.get(this.baseUri + `loan/GetReportDataById?id=${id}&companyType=${companyType}`);
  }

  deleteReport(id: any) {
    return this.http.get(this.baseUri + `loan/deleteReport?id=${id}`);
  }

  getAssignedApplication(value: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetAssignedApplication?value=${value}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.AssignedpagedData = response;
          // console.log('this.AssignedpagedData', this.AssignedpagedData);
          return true;
        })
      );
  }

  TransferApplicatioto_ToUser(transferLoanAppId: any, fromUserId: any, toUserId: any): Observable<any> {
    return this.http.get(`${this.baseUri}loan/TransferApplicatioto_ToUser?transferLoanAppId=${transferLoanAppId}&fromUserId=${fromUserId}&toUserId=${toUserId}`).pipe(
      map((response: any) => {
        this.transferApplicationData = response;
        return true;
      })
    );
  }
  getTransferLoanApplicationList(applicationid: any, sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any) {
    return this.http.get(this.baseUri + `loan/GetTransferLoanApplicationList?applicationid=${applicationid}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageNumber=${pageNumber}&pageSizeValue=${pageSizeValue}`)
      .pipe(
        map((response: any) => {
          this.transferpagedData = response;
          return true;
        })
      );
  }

  sftp(appId: any, ApplicationNumber: any) {
    return this.http.get(`${this.baseUri}loan/sftp?appId=${appId}&ApplicationNumber=${ApplicationNumber}`);
    //.pipe(
    //  map((response: any) => {
    //    this.LoanProductData = response;
    //    return true;
    //  })
    //);
  }

  GetValueDll(id: any, length: any, serchText: string, filterFieldName: string) {
    return this.http.get(`${this.baseUri}loan/GetFilterValueDll?id=${id}&length=${length}&serchText=${serchText}&filterFieldName=${filterFieldName}`);
  }

  GetGraphVisualizationReportData(runLoanApplicationReportModel: RunLoanApplicationReportModel): Observable<any> {
    return this.http.post(this.baseUri + `loan/GetGraphVisualizationReportData`, runLoanApplicationReportModel);
  }
  getSFTPLogList(applicationNumber: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUri}loan/GetSFTPLogList?applicationNumber=${applicationNumber}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          // console.log('service sftp', response);
          this.sftpLogData = response;
          return true;
        })
      );
  }
}


export class SubstageModel {
  fields: substage[];
}
export class BankerModel {
  loanappid: number;
  contactids: string;
  objectName: string;
  applicantName: string;
  applicationNumber: number;
  type: string;
  constructor() {
    this.type = '';
  }
}

export class TransferLoanAppModel {
  loanappid: number;
  dealerAccountId: number;
}



export class substage {
  id: number;
  stagename: string;
  substageid: number;
  mandatory: boolean;
  duedays: number;
  pages: number;
  usertype: string;
}

export class SystemInfo {
  sysInfoId: string;
  kWCapacity: number;
  installedInvoice: number;
  optionalDown: number;
  requestedAmount: number;
  costPerWatt: number;
  salesPrice: number;
  cashDown: number;
  netTrade: number;
  rebate: number;
  unpaidBalance: number;
  serviceContracts: number;
  gap: number;
  amountFinanced: number;
  term: number;
  aPR: number;
  payment: number;
  lTV: number;
  pTI: number;
  dTI: number;
  saleRepFirstName: string;
  saleRepLastName: string;
  saleRepEmail: string;
  saleRepPhone: string;
}

export class ApplicantInfo {
  loanApplicationId: number;
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  streetName: string;
  aptSt: string;
  streetType: string;
  ruralRoute: string;
  poBox: string;
  city: string;
  stateId: string;
  homePhone: string;
  zip: string;
  email: string;
  businessPhone: string;
  dINumber: string;
  dlState: string;
  rentAmount: number;
  housingStatus: string;
  yearsAtCurrentAddr: string;
  monthsAtCurrentAddr: string;
  grossIncome: number;
  incomeFreq: number;
  otherMonthlyIncome: number;
  otherIncomeSource: string;
  employerType: string;
  employerName: string;
  occupation: string;
  yearAtEmp: string;
  monthsAtEmp: string;

}

export class CoApplicantInfo {
  loanApplicationId: number;
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  suffix: string
  streetName: string;
  aptSt: string;
  streetType: string;
  ruralRoute: string;
  poBox: string;
  city: string;
  stateId: string;
  homePhone: string;
  zip: string;
  email: string;
  businessPhone: string;
  dINumber: string;
  dlState: string;
  rentAmount: number;
  housingStatus: string;
  yearsAtCurrentAddr: string;
  monthsAtCurrentAddr: string;
  grossIncome: number;
  incomeFreq: number;
  otherMonthlyIncome: number;
  otherIncomeSource: string;
  employerType: string;
  employerName: string;
  occupation: string;
  yearAtEmp: string;
  monthsAtEmp: string;
  relationshipStatus: number;
}
export class loansectionarray {
  userTypes: string;
  stageName: string;
  formmasterid: string;
  stageclass: string;
  stageapproved: number;
  LoanInformationSubmitted: number;
  InstallationPropertySubmitted: number;
  ProductInfoSubmitted: number;
  ApplicantSubmitted: number;
  CoApplicantSubmitted: number;
  PaymentInfoSubmitted: number;
  ExpansesSubmitted: number;
  ReleaseFundsSubmitted: number;
  NTPSubmitted: number;
  stageActive: string;
  linkFormMaster: string;
  module_name_code: string;
  constructor() {
    this.stageName = "";
    this.formmasterid = "";
    this.stageclass = "";
    this.LoanInformationSubmitted = 0;
    this.InstallationPropertySubmitted = 0;
    this.ApplicantSubmitted = 0;
    this.CoApplicantSubmitted = 0;
    this.PaymentInfoSubmitted = 0;
    this.ProductInfoSubmitted = 0;
    this.ExpansesSubmitted = 0;
    this.ReleaseFundsSubmitted = 0;
    this.NTPSubmitted = 0;
    this.stageActive = "0";
    this.linkFormMaster = "";
    this.stageapproved = 0;
    this.module_name_code = "";
  }

}
export class dynamicsectionarray {

  stageName: string;
  formmasterid: string;
  stageclass: string;
  userTypes: string;
  stageapproved: number;
  stageActive: number;
  module_name_code:string;
  constructor() {
    this.stageName = "";
    this.formmasterid = "";
    this.stageclass = "";
    this.userTypes = "";
    this.stageActive = 0;
    this.stageapproved = 0;
  }

}
export class JsonData {
  Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  leadconvert: any;
  leadid: any;
  docDate: any;
  isForChangeOrder: string;
  StageName: string;
  SFOpportunityId: string;
  ApplicationNumber: string;
  SourceType: string;
  DealerName: string;
  constructor() {
    this.Id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
    this.leadconvert = "";
    this.leadid = "";
    this.docDate = "";
    this.isForChangeOrder = "";
    this.StageName = "";
    this.SFOpportunityId = '';
    this.ApplicationNumber = '';
    this.SourceType = "";
    this.DealerName = "";
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

export class MenualNotificationModel {

  templateId: any;
  fromName: string;
  toUser: number;
  toemail: string
  //CustomerID: string;
  ccUser: string;
  ccEmail: string;
  subjectBody: string;
  subject: string;
  objectId: string;
  objectName: string;
  constructor() {
    this.templateId = '';
    this.fromName = '';
    this.toUser = 0;
    //this.CustomerID = '',
    this.ccUser = '';
    this.ccEmail = '';
    this.subjectBody = '';
    this.subject = '';
    this.objectId = '';
    this.objectName = '';

  }
}

export class commentmodel {
  commentId: string;
  commentType: number;
  comment: string;
  element: string;
  followUpDate: string;
  assignTo: string;
  isActive: boolean;
  loanApplicationId: string
  isPrivate: boolean;
  constructor() {
    this.commentId = '';
    this.commentType = 0;
    this.comment = '';
    this.element = '';
    this.followUpDate = '';
    this.assignTo = '';
    this.isActive = false;
    this.loanApplicationId = '';
    this.isPrivate = false;
  }
}
export class replyCommentmodel {
  replycommentId: string;
  replycomment: string;
  replyloanApplicationId: string

  constructor() {
    this.replycommentId = '';
    this.replycomment = '';
    this.replyloanApplicationId = '';
  }
}


export class ExpenseIncomeModel {
  fieldsData: string;
  constructor() {
    this.fieldsData = "";
  }
}
export class ExpenseDebtModel {
  fieldsData: string;
  constructor() {
    this.fieldsData = "";
  }
}

export class reasonModel {
  reason_description: string;
  email: string;
  requestdate: string;
  closedate: string;
  id: number;
  isverified: boolean;
  type: string;



  constructor() {

    this.reason_description = '';
    this.requestdate = '';
    this.email = '';
    this.closedate = '';
    this.id = 0;
    this.isverified = false;
    this.type = '';


  }
}

export class appverificationmdoel {
  id: number;
  values: string;
  type: string;
  mastervalue: string;
  isrequired: boolean;
  isVerified: boolean;
  constructor() {
    this.id = 0;
    this.values = "";
    this.type = "";
    this.mastervalue = "";
    this.isrequired = false;
    this.isVerified = false;
  }

}

export class LoanProgressModel {
  appyingChanges: number;
  applyingRules: number;
  finalizing: number;
  result: any;
  callBackFunction: Function = function () { };

  constructor() {
    this.appyingChanges = Progress.stop;
    this.applyingRules = Progress.stop;
    this.finalizing = Progress.stop;
    this.callBackFunction = function () { };
  }
}

export enum Progress {
  stop = 0,
  start = 1,
  completed = 2,
  failed = 3,
}

export class RunLoanApplicationReportModel {
  selecteddata: string;
  filterData: string;
  sortColumn: string
  sortDir: string;
  currentPage: number;
  pageSizeValue: number;
  From: string;
  TO: string;
  customWhereCondition: string;
  groupByFieldId: number;

  constructor() {
    this.selecteddata = "";
    this.filterData = "";
    this.sortColumn = "id";
    this.sortDir = "desc";
    this.currentPage = 1;
    this.pageSizeValue = 15;
    this.From = "";
    this.TO = "";
    this.customWhereCondition = "";
    this.groupByFieldId = 0;
  }
}

