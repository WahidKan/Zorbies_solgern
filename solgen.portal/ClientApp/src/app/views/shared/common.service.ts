import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../manageuser/addedituser.service';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import * as signalR from '@aspnet/signalr';
import moment from 'moment-timezone';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { Login, UserService } from './user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModulesService } from '../managemodules/modules.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  modulePermission: any[] = [];
  public commonUri = `${environment.WebApiBaseUrl}Common`;
  public getLoggedInName = new BehaviorSubject<UserDetails>(new UserDetails());
  public updateOpportunity = new Subject<any>();
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  masters: Master[] = [];
  states: SelectItemModel[] = [];
  Templates: SelectTemplateItemModel[] = [];
  downLoadModel: DownloadModel = new DownloadModel();
  businessName: SelectBusinessContactModel[] = [];
  isUploadImageValid = true;
  isUploadFileValid = true;
  LoginUser: UserDetails = new UserDetails();
  operator: any;
  pagedData: any;
  phoneNumber: any;
  loanHomiPagedData: any;
  stageDetail: any;
  customFieldsListData: any;
  customFieldsList: any;
  welcomeCallDetailsList: any;
  solCustomFieldsList: any;
  hubConnection: signalR.HubConnection;
  ConnectionID: string = null;
  editPage: any;
  successMessage: string = null;
  responseMessage: string = null;
  loanHomicustomFieldsList: any;
  loanHomicustomFieldsLeadList: any;
  dialerObservable = new Subject<DailerParam>();
  refreshDailerCaller = new Subject<boolean>();
  refreshSmsHistory = new Subject<boolean>();
  refreshAppointsHistory = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private routerService: Router,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private deviceService: DeviceDetectorService,
    private moduleService: ModulesService,
    private userService: UserService,
  ) {
    this.epicFunction();
    this.currentUrl = this.routerService.url;
    routerService.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
    //// console.log('connected signal');
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/hub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }
  set setRefreshDailerCaller(value: boolean) {
    this.refreshDailerCaller.next(value);
  }
  get getRefreshDailerCaller() {
    return this.refreshDailerCaller;
  }

  set setUpdatedOpportunity(value: any) {
    this.updateOpportunity.next(value);
  }
  get getUpdatedOpportunity() {
    return this.updateOpportunity;
  }



  set setRefreshAppointsHistory(value: boolean) {
    this.refreshAppointsHistory.next(value);
  }
  get getRefreshAppointsHistory() {
    return this.refreshAppointsHistory;
  }
  set setRefreshSmsHistory(value: boolean) {
    this.refreshSmsHistory.next(value);
  }
  get getRefreshSmsHistory() {
    return this.refreshSmsHistory;
  }
  set SetdialerNumber(number: DailerParam) {
    this.dialerObservable.next(number);
  }

  get dialerNumber() {
    return this.dialerObservable;
  }

  public transformPSTToUTC(date: any, toUTC: boolean): any {
    if (date == null) {
      return 'N/A';
    }
    date = new Date(date);
    var localOffset = 0.0;
    var localTime = date.getTime();
    if (toUTC) {
      localOffset = 3600000 * 8.0;
      date = date.getTime() + localOffset;
      date = new Date(date);
    } else {
      localOffset = 3600000 * -8.0;
      date = date.getTime() + localOffset;
    }

    //// console.log('localset', localOffset + "-->" + date.getTimezoneOffset() + "--" +time);

    date = new Date(localOffset);
    alert(date);
    return date;
  }

  downloadFile(e: any, url: string) {
    e.preventDefault();
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
      a.download = filename; // Set the file name.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      //delete a;
    };
    xhr.open('GET', url);
    xhr.send();
  };

  getStatesList_V1(code:string): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetStatesList_V1?code=${code}`).pipe(
      map((response: any) => {
        this.states = response;
      })
    );
  }
  uploadPDFANDIMGAEFileValidator($file) {
    const fileName = $file.target.files[0].name;
    const extensions = [".pdf", ".png", ".jpeg", ".jpg", ".heic"];
    let blnValid = false;
    this.isUploadFileValid = false;
    for (var j = 0; j < extensions.length; j++) {
      var sCurExtension = extensions[j];
      if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      $file.target.value = '';
      this.toastr.error(`Valid file format is ${extensions.join(', ')}`);
    } else {
      this.isUploadFileValid = true;
    }
  }

  public getUpToDecimalPoint(decimalPlace: any) {
    let regEx = '';
    if (decimalPlace == '4') {
      regEx = '[0-9]{1,4}';
    } else if (decimalPlace == '3') {
      regEx = '[0-9]{1,3}';
    } else {
      regEx = '[0-9]{1,2}';
    }
    return regEx;
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
  isFileValid = true;
  isFileExtensionValid = true;

  validateAllFormFields(formGroup: FormGroup, iscroll = true) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
        return;
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrControl) => {
          if (arrControl instanceof FormGroup) {
            this.validateAllFormFields(arrControl);
            return;
          }
        });
        if (iscroll) {
          this.scroll(formGroup);
        }
      }
    });
  }


  removeConnectionbyUserID(id: string) {
    return this.http.get(this.baseUri + `Account/removeConnection?userId=${id}`);
  }
  sendSms(toNumber: string, leadId: any) {
    return this.http.get(this.baseUri + `twilio/SendSms?toNumber=${encodeURIComponent(toNumber)}&refId=${leadId}`);
  }
  getAppointmentNotification() {
    return this.http.get(this.baseUri + `Appointment/GetAppointmentNotification`);
  }



  removeUserConnections() {
    return this.http.get(this.baseUri + `Account/RemoveConnections`);
  }
  GetServiceGetFileList(callFrom: string): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetLasttimeLoginForCompany?callFrom=${callFrom}`);
  }
  getHeaderData(id: string) {
    return this.http.get(this.baseUri + `Common/GetHeaderData?id=${id}`);
  }

  getOperatorsByDataTypeCode(dataTypeCode: string) {
    // // console.log(dataTypeCode);
    return this.http.get(this.baseUri + `Common/GetOperatorsByDataTypeCode?dataTypeCode=${dataTypeCode}`);
  }

  getUserTeam(type: string) {
    // // console.log(dataTypeCode);
    return this.http.get(this.baseUri + `Common/GetUserTeam?type=${type}`);
  }

  getResultActions() {
    return this.http.get(this.baseUri + `Common/GetResultActions`);
  }

  getLeadResultActions(objectName: string) {
    return this.http.get(this.baseUri + `Common/GetResultActions?objectName=${objectName}`);
  }

  getMasterItemsList(masterNames: any): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItems/${masterNames}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }
  getSolgenModulesItemsList(masterNames: any): Observable<any> {
    return this.http.get(this.baseUri + `SolgenRuleEngine/GetSolgenModules/${masterNames}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }

  GetMasterItemsNotAuth(masterNames: any): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItemsNotAuth/${masterNames}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }
  GetMasterItemsNotAuthLoanProduct(masterNames: any, masterKeyText : any,companyId : any): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItemsNotAuthLoanProduct?masterNames=${masterNames}&masterKeyText=${masterKeyText}&companyId=${companyId}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }


  GetMasterItems(masterNames: any): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItems/${masterNames}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }

  getMasterItemsByCustomFieldId(customFieldId: any): Observable<any> {
    return this.http.get(this.baseUri + `Common/getMasterItemsByCustomFieldId/${customFieldId}`);
  }

  getMasterSubModuleList(ModuleName: any, SubModuleCode): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItemsForMultipleId/${ModuleName}/${SubModuleCode}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }

  getBusinessContactList(query: any): Observable<any> {
    return this.http.get(this.baseUri + `Contact/GetSearchResult?searchType=${query}`).pipe(
      map((response: any) => {
        this.businessName = response;
      })
    );
  }

  getMasterItemsInProgress(masterNames: any, masterKeyText: string): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItems/masterNames=${masterNames}&masterKeyText=${masterKeyText}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }

  getMasterItemsInMultiple(masterNames: any, masterKeyText: string): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItemsMultiple?masterNames=${masterNames}&masterKeyText=${masterKeyText}`).pipe(
      map((response: any) => {
        this.masters = response;
      })
    );
  }

  GetWelcomeCallDetails(accountId: any, modulename: any, submoduleName: any, flowid: any, stepno: any, type: any, buttoncode: any) {
    return this.http
      .get(
        `${this.baseUri}Common/GetWelcomeCallDetails?accountId=${accountId}&moduleName=${modulename}&subModuleName=${submoduleName}&flowid=${flowid}&stepno=${stepno}&type=${type}&buttoncode=${buttoncode}`
      )
      .pipe(
        map((response: any) => {
          this.welcomeCallDetailsList = response;
          return true;
        })
      );
  }

  SaveActivityLogsAuthGuard(interceptReq: any, routerURL: any, activeRoute: any) {
    var fullurl = activeRoute.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');

    //// console.log("intercept AuthGuard interceptReq", interceptReq);
    //// console.log("intercept AuthGuard",);
    //// console.log("interceptAuthGuard 1 ", activeRoute.data.moduleCode);
    //// console.log("interceptAuthGuard 2 ", activeRoute.data);
    //// console.log("interceptAuthGuard routURL ", routerURL);
    //// console.log("interceptAuthGuard fullurl ", fullurl);

    if (interceptReq != null && typeof interceptReq != 'undefined') {
      let model: userActivityLog = new userActivityLog();
      model.pageUrl = fullurl;
      model.redirectedFrom = routerURL;
      return this.http.post(`${this.baseUri}common/saveUserActivityLog`, model).subscribe(s => {
      }
      );
    }
  }
  getStatesList(): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetStatesList`).pipe(
      map((response: any) => {
        this.states = response;
      })
    );
  }

  getTemplateList(): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetTemplateList`).pipe(
      map((response: any) => {
        this.Templates = response;
      })
    );
  }
  GeHeaderCompanyList(userId) {
    return this.http.get(this.baseUri + `Common/GeHeaderCompanyList?userId=${userId}`);
  }
  GetCompanyList(name: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == 'undefined' || name == null) {
      name = null;
    } else {
      name = encodeURIComponent(name);
    }
    return this.http
      .get(
        `${this.baseUri}/Common/GetCompanyList?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`
      )
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  getBankDropList() {
    return this.http.get(this.baseUri + `Bank/GetBankDropList`);
  }
  getLAAccountList() {
    return this.http.get(this.baseUri + `Common/LAAccountList`);
  }
  getCurrentUserDetail(reload=false) {
    return this.http.get(this.baseUri + `UserProfile/GetUserInfo`).subscribe((response: any) => {
      
      this.LoginUser = response;
      localStorage.removeItem('userinfo');
      localStorage.setItem('userinfo', JSON.stringify(response));
      // console.log('JSON.stringify(response)', JSON.stringify(response));
      this.getLoggedInName.next(this.LoginUser);
      if(reload){
       (<any> window).location.href = "/";
      }

    });
  }

  // getUserData(){
  //   return this.http.get(this.baseUri + `UserProfile/GetUserInfo`);
  // }

  getUserModulePermissions(ispermission: any) {
    return this.http.get(this.baseUri + `Modules/getRoleModuleList?isApplyRole=${ispermission}`);
  }

  getPermission(moduleCode: number) {
    const moduledata = JSON.parse(localStorage.getItem('moduleList'));
    if (moduledata !== null && typeof moduledata !== 'undefined') {
      let module1 = moduledata.find((m) => m.module_code == moduleCode);
      if (module1 == undefined) module1 = 'null';

      return module1;
    } else {
      return null;
    }
  }

  checkPermission(privilege: string) {
    const moduledata = JSON.parse(localStorage.getItem('moduleList'));
    let checkrole = moduledata.find((m) => m.privilegecode.toUpperCase() == privilege.toUpperCase());

    if (checkrole == undefined) {
      return false;
    } else {
      return true;
    }
  }

  GetMapList(ModuleName: any, SubModuleName: any, companyId: number, listFilter: any) {
    return this.http.get(
      this.baseUri + `Common/GetMapView?ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&companyId=${companyId}&listFilter=${listFilter}`
    );
  }

  GetServiceResourceDll() {
    return this.http.get(`${this.baseUri}serviceappointment/GetServiceResourceDll`);
  }

  GetServiceCrewDll() {
    return this.http.get(`${this.baseUri}serviceappointment/GetServiceCrewDll`);
  }
  GetEstimatedTravelTimeFromAndToSourceDll() {
    return this.http.get(`${this.baseUri}serviceappointment/GetEstimatedTravelTimeFromAndToSourceDll`);
  }

  getPermissiondata(moduleCode: number) {
    const moduledata = JSON.parse(localStorage.getItem('moduleList'));
    if (moduledata !== null && typeof moduledata !== 'undefined') {
      let module1: any[] = [];
      //// console.log('moduledata', moduledata);
      module1 = moduledata.filter((x) => x.module_code.toString() === moduleCode.toString());
      if (module1 == undefined) module1 = null;

      return module1;
    } else {
      return null;
    }
  }
  getUserType() {
    const userType = JSON.parse(localStorage.getItem('userinfo'));
    if (userType !== null && typeof userType !== 'undefined') {
      return userType.userTypeName;
    } else {
      return null;
    }
  }
  saveAssignedResource(assignedResources: addAssignedResourcesModel) {
    return this.http.post(this.baseUri + `serviceappointment/SaveShuduleAppointAndResources`, assignedResources);
  }

  getRequiredCustomerFileList(accountId: any, companyId: any) {
    return this.http.get(this.baseUri + `Account/GetRequiredCustomerFileList?accountId=${accountId}&companyId=${companyId}`);
  }

  getHtmlFile(proposalId: any) {
    return this.http.get(this.baseUri + `proposal/GetHtmlForProposal/${proposalId}`);
  }

  getHtmlFileForDocument(documentMakerId: any) {
    return this.http.get(this.baseUri + `proposal/GetHtmlForDocument/${documentMakerId}`);
  }

  GetEcryptedId(id: any) {
    return this.http.get(this.baseUri + `Common/GetEcryptedId/${id}`);
  }

  uploadDocumentSize(type: string, filesize: number, filelength: string) {
    if ((filelength = '20MB')) {
      if (type.toLowerCase() !== '') {
        if (filesize > 26214400) {
          //100 MB file   // 25MB Size in Bytes file size 26214400.
          this.toastr.error('Please upload a file of max. size 20MB.');
          this.isFileValid = false;
        } else {
          this.isFileValid = true;
        }
      }
    } else if ((filelength = '10MB')) {
      if (type.toLowerCase() !== '') {
        if (filesize > 10485760) {
          //10MB Size in Bytes.
          this.toastr.error('Please upload a file of max. size 10MB.');
          this.isFileValid = false;
        } else {
          this.isFileValid = true;
        }
      }
    } else {
      if (type.toLowerCase() !== '') {
        if (filesize > 5242880) {
          //5MB Size in Bytes.
          this.toastr.error('Please upload a file of max. size 5MB.');
          this.isFileValid = false;
        } else {
          this.isFileValid = true;
        }
      }
    }
  }
  validUploadDocumentType(name: string, validType: string) {
    let splitstr = name.toLowerCase().split('.').reverse();
    let ext = splitstr.length > 0 ? splitstr[0] : '';
    if (splitstr.length > 0 && validType.includes(ext))
      this.isFileExtensionValid = true;
    else {
      this.isFileExtensionValid = false;

      this.toastr.error(`Selected file format '.${ext}' is not allowed.`);

    }

  }

  validUploadDocumentSize(filesize: number, maxSize: number) {
    let maxSizebt = maxSize * 1048576;
    if (filesize <= maxSizebt) {
      this.isFileValid = true;
    } else {
      this.isFileValid = false;
      this.toastr.error(`Please upload a file of max. size ${maxSize}MB.`);

    }
  }
  uploadDocumentSizeLeaseManagement(type: string, filesize: number) {
    if (type.toLowerCase() !== '') {
      if (filesize > 31457280) {
        //30MB Size in Bytes.
        this.toastr.error('Please upload a file of max. size 30MB.');
        this.isFileValid = false;
      } else {
        this.isFileValid = true;
      }
    }
  }
  uploadProfileImageFileValidator($file) {
    const fileName = $file.target.files[0].name;
    const extensions = ['.png', '.jpeg', '.jpg', '.gif'];
    let blnValid = false;
    this.isUploadImageValid = false;
    for (var j = 0; j < extensions.length; j++) {
      var sCurExtension = extensions[j];
      if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      $file.target.value = '';
      this.toastr.error(`Valid file format is ${extensions.join(', ')}`);
    } else {
      this.isUploadImageValid = true;
    }
  }
  uploadImageFileValidator($file) {
    const fileName = $file.target.files[0].name;
    const extensions = ['.png', '.jpeg', '.jpg', '.gif', '.zip', '.rar', '.pdf', '.txt', '.xlsx', '.xls', '.doc', '.docx', '.csv'];
    let blnValid = false;
    this.isUploadImageValid = false;
    for (var j = 0; j < extensions.length; j++) {
      var sCurExtension = extensions[j];
      if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      $file.target.value = '';
      this.toastr.error(`Valid file format is ${extensions.join(', ')}`);
    } else {
      this.isUploadImageValid = true;
    }
  }

  uploadImageAudioVideoFileValidator($file) {
    const fileName = $file.target.files[0].name;
    const extensions = ['.png', '.jpeg', '.jpg', '.gif', '.zip', '.rar', '.pdf', '.docx', '.mp3', '.mp4', '.avi', '.mov', '.3gp', '.mpeg'];
    let blnValid = false;
    this.isUploadImageValid = false;
    for (var j = 0; j < extensions.length; j++) {
      var sCurExtension = extensions[j];
      if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      $file.target.value = '';
      this.toastr.error(`Valid file format is ${extensions.join(', ')}`);
    } else {
      this.isUploadImageValid = true;
    }
  }

  uploadDocumentFileValidator($file) {
    const fileName = $file.target.files[0].name;
    const extensions = ['.doc', '.docx', '.pdf', '.xlsx', '.xls', '.png', '.jpeg', '.jpg', '.gif', '.zip', '.rar', '.pdf'];
    let blnValid = false;
    this.isUploadFileValid = false;
    for (var j = 0; j < extensions.length; j++) {
      var sCurExtension = extensions[j];
      if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      $file.target.value = '';
      this.toastr.error(`Valid file format is ${extensions.join(', ')}`);
    } else {
      this.isUploadFileValid = true;
    }
  }

  uploadPDFFileValidator($file) {
    const fileName = $file.target.files[0].name;
    const extensions = ['.pdf'];
    let blnValid = false;
    this.isUploadFileValid = false;
    for (var j = 0; j < extensions.length; j++) {
      var sCurExtension = extensions[j];
      if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      $file.target.value = '';
      this.toastr.error(`Valid file format is ${extensions.join(', ')}`);
    } else {
      this.isUploadFileValid = true;
    }
  }

  uploadBulkFileValidator($file) {
    const fileName = $file.target.files[0].name;
    const extensions = ['.xlsx', '.xls'];
    let blnValid = false;
    this.isUploadFileValid = false;
    for (var j = 0; j < extensions.length; j++) {
      var sCurExtension = extensions[j];
      if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      $file.target.value = '';
      this.toastr.error(`Valid file format is ${extensions.join(', ')}`);
    } else {
      this.isUploadFileValid = true;
    }
  }

  uploadBulkFileSize(type: string, filesize: number) {
    if (type.toLowerCase() !== '') {
      if (filesize > 26214400) {
        //25MB              5242880) {//5MB Size in Bytes.
        this.toastr.error('Please upload a file of max. size 25MB.');
        this.isFileValid = false;
      } else {
        this.isFileValid = true;
      }
    }
  }

  scrollTo(el: Element) {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid');
    this.scrollTo(firstElementWithError);
  }

  scroll(form: FormGroup) {
    this.scrollIfFormHasErrors(form).then(() => { });
  }

  async scrollIfFormHasErrors(form: FormGroup): Promise<any> {
    await form.invalid;
    this.scrollToError();
  }
  Delete(tableName: any, primaryid: any, moduleName: any) {
    return this.http.get(this.baseUri + `Common/DeleteRecord?tableName=${tableName}&primaryKey=${primaryid}&moduleName=${moduleName}`);
  }
  ActiveInactive(tableName: any, primaryid: any, status: any, moduleName: any, statusName: any) {
    return this.http.get(
      this.baseUri +
      `Common/UpdateActiveInactiveStatus?tableName=${tableName}&primaryKey=${primaryid}&status=${status}&moduleName=${moduleName}&statusName=${statusName}`
    );
  }
  savePracticeFormData(modelData: any): Observable<any> {
    return this.http.post(
      this.baseUri + `Practice/AddPracticeFormData` , modelData
    );
  }
  ChangePassword(changePassword: ChangePasswordModel) {
    return this.http.post(this.baseUri + `Account/ChangePassword`, changePassword);
  }
  //GetServiceGetFileList(): Observable<any> {
  //  return this.http.get(this.baseUri + `Common/GetLasttimeLoginForCompany`);logout
  //}
  logout() {
    const message = `Are you sure you want to "sign out"?`;
    this.dialogService.confirm('Sign out', message).subscribe((confirmed) => {
      if (confirmed) {
        
        var UserLoginInfoFromSession =JSON.parse(localStorage.getItem('UserLoginInfo'));
        if (UserLoginInfoFromSession != null && UserLoginInfoFromSession.access_token != null) {

          window.close();

        }
        else{
          this.GetServiceGetFileList('logout').subscribe((m) => { });

          localStorage.removeItem('access_token');
          localStorage.removeItem('usertype');
          localStorage.removeItem('moduleList');
          localStorage.removeItem('userinfo');
          localStorage.removeItem('customer_email');
          this.LoginUser = new UserDetails();
          window.location.replace('/account');

          // this.routerService.navigateByUrl('/account');
          this.toaster.success(`You are signed out successfully`);
          this.removeUserConnections().subscribe((m) => { });
        }

      } else {
      }
    });
  }
  logoutFromMyPrifle() {
    this.GetServiceGetFileList('logout').subscribe((m) => { });
    localStorage.removeItem('access_token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('moduleList');
    localStorage.removeItem('userinfo');

    this.LoginUser = new UserDetails();
    this.routerService.navigateByUrl('/account');
    this.toaster.success(`You are signed out successfully`);
    this.removeUserConnections().subscribe((m) => { });
  }

  //To Export data into .pdf, .xlsx and csv
  ExportData(records: any, type: any, filename: any, pageLength: any = '') {
    if (type == 'Excel') {
      var blob = new Blob([records], { type: 'text/plain;charset=windows-1252' });
      this.http
        .post(this.commonUri + `/ExportExcelInvoice/${type}/${filename}/${pageLength}`, records, { responseType: 'blob' })
        .subscribe((blob) => {
          saveAs(blob, filename + '.xlsx');
        });
    } else if (type == 'CSV') {
      var blob = new Blob([records], { type: 'text/csv' });
      this.http
        .post(this.commonUri + `/ExportExcelInvoice/${type}/${filename}/${pageLength}`, records, { responseType: 'blob' })
        .subscribe((blob) => {
          saveAs(blob, filename + '.csv');
        });
    } else {
      var blob = new Blob([new Uint8Array(records)], { type: 'application/pdf' });
      this.http
        .post(this.commonUri + `/ExportExcelInvoice/${type}/${filename}/${pageLength}`, records, { responseType: 'blob' })
        .subscribe((blob) => {
          saveAs(blob, filename + '.pdf');
        });
    }
  }


  //To Export data into .pdf, .xlsx and csv
  LoanApplicationExportData(records: any, type: any, filename: any, pageLength: any = '', reportName: string = '', dateFrom: string = '', dateTo: string = '') {
    if (type == 'Excel') {
      var blob = new Blob([records], { type: 'text/plain;charset=windows-1252' });
      this.http
        .post(this.commonUri + `/LoanApplicationExportExcelInvoice/${type}/${filename}/${reportName}/${dateFrom}/${dateTo}`, records, { responseType: 'blob' })
        .subscribe((blob) => {
          saveAs(blob, filename + '.xlsx');
        });
    }
  }


  DownloadDocument(filename: any, folderName: any) {
    let fileType = this.DownLoadFiles(filename);
    this.downLoadModel.documentName = filename;
    this.downLoadModel.folderName = folderName;
    var blob = new Blob([], { type: fileType });
    this.http.post(`${this.commonUri}/DownLoadDocument`, this.downLoadModel, { responseType: 'blob' }).subscribe((blob) => {
      saveAs(blob, filename);
    });
  }
  DownLoadFiles(filename) {
    let fileName = filename;
    let checkFileType = fileName.split('.').pop();
    var fileType;
    if (checkFileType == '.txt') {
      fileType = 'text/plain';
    } else if (checkFileType == '.pdf') {
      fileType = 'application/pdf';
    } else if (checkFileType == '.doc') {
      fileType = 'application/vnd.ms-word';
    } else if (checkFileType == '.docx') {
      fileType = 'application/vnd.ms-word';
    } else if (checkFileType == '.xls') {
      fileType = 'application/vnd.ms-excel';
    } else if (checkFileType == '.png') {
      fileType = 'image/png';
    } else if (checkFileType == '.jpg') {
      fileType = 'image/jpeg';
    } else if (checkFileType == '.jpeg') {
      fileType = 'image/jpeg';
    } else if (checkFileType == '.gif') {
      fileType = 'image/gif';
    } else if (checkFileType == '.csv') {
      fileType = 'text/csv';
    }

    return fileType;
  }

  GetCurrency() {
    return '$';
  }

  getLicenseFee() {
    return 30;
  }

  getOperatorsList(filedNameId: any): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetOperatorsItems/${filedNameId}`).pipe(
      map((response: any) => {
        this.operator = response;
      })
    );
  }

  getLoanHomiOperatorsList(filedNameId: any, modulename = ''): Observable<any> {
    return this.http.get(this.baseUri + `Common/getLoanHomiOperatorsList?filedNameId=${filedNameId}&modulename=${modulename}`).pipe(
      map((response: any) => {
        this.operator = response;
      })
    );
  }

  saveForms(obj: View) {
    // // console.log("ishg:",obj)
    return this.http.post(this.baseUri + `common/GetLeadsById`, obj);
  }

  formatAmount(value: any) {
    //var value = this.tilewidget[i].widgetCount;
    var amount = Number(value);
    return amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  formatDateToUnix(value: any) {
    return new Date(value).getTime(); // / 1000
  }
  formatUnixToDate(value: any) {
    return new Date(value).toLocaleDateString('en-us'); // / 1000
    // new Date(timestamp).toLocaleDateString("en-us")
  }
  getQueryStringValue(param: any) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  sendNotification(userId) {
    return this.http.get(`${environment.WebApiBaseUrl}Account/SendNotification?userId=${userId}`);
  }

  GetSqlFunctionList(functionType: string) {
    return this.http.get(`${this.baseUri}Common/GetSqlNumericFunctionList?sqlFunctionTypeCode=${functionType}`);
  }

  getConnectionID() {
    return this.http.get(`${environment.WebApiBaseUrl}Account/GetConnectionID`);
  }

  getHeaderNotification() {
    return this.http.get(`${environment.WebApiBaseUrl}Account/GetHeaderNotification`);
  }

  getStageDetailsById(id: any, moduleName: any) {
    return this.http.get(this.baseUri + `Common/GetStageDetailsById?id=${id}&moduleName=${moduleName}`).pipe(
      map((response: any) => {
        this.stageDetail = response;
        return true;
      })
    );
  }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: any): Observable<any> {
    return this.http.get(
      `${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}`
    );
  }
  GetCustomFieldsListAsync(Id: any, custom_view_id: any, modulename: any, submoduleName: any, displayType: any): Observable<any> {
    return this.http.get(
      `${this.baseUri}common/GetCustomFieldsAsync?PrimaryId=${Id}&customViewId=${custom_view_id}&moduleName=${modulename}&subModuleName=${submoduleName}&displayCode=${displayType}`
    );
  }


  GetCustomFieldsListDisplay(modulename: any, submoduleName: any, companyId: any, displayCode: any, isRef: any) {
    return this.http.get(
      `${this.baseUri}vendor/GetCustomFieldsManage?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&displayCode=${displayCode}&isRef=${isRef}`
    );
  }

  GetCustomFieldsManageForm(modulename: any, submoduleName: any, companyId: any, displayCode: any, isRef: any) {
    return this.http.get(
      `${this.baseUri}vendor/GetCustomFieldsManageForm?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&displayCode=${displayCode}&isRef=${isRef}`
    );
  }
  getScrollableData(id: any, length: any, serchText: string, fieldCode: string) {
    return this.http.get(`${this.baseUri}common/GetScrollableData?id=${id}&length=${length}&serchText=${serchText}&fieldCode=${fieldCode}`);
  }
  GetCustomFormFieldList(modulename: any, formmasterid: any, companyId: any, Id: any) {
    ;
    return this.http.get(`${this.baseUri}WebMerge/GetFormFields?moduleName=${modulename}&formmasterid=${formmasterid}`).pipe(
      map((response: any) => {
        this.customFieldsList = response;
        return true;
      })
    );
  }

  GetCustomFieldsDropDownList(length: any, custom_field_id: any, field_code: any, serchText: string) {
    return this.http
      .get(
        `${this.baseUri}Common/GetCustomFieldsDropDownList?length=${length}&custom_field_id=${custom_field_id}&field_code=${field_code}&serchText=${serchText}`
      )
      .pipe(
        map((response: any) => {
          this.customFieldsListData = response;
          return true;
        })
      );
  }
  GetFixedPageScrollDropDownList(length: any, custom_field_id: any, field_code: any, serchText: string) {
    return this.http
      .get(
        `${this.baseUri}Common/GetFixedPageScrollDropDownList?length=${length}&custom_field_id=${custom_field_id}&field_code=${field_code}&serchText=${serchText}`
      )
      .pipe(
        map((response: any) => {
          this.customFieldsListData = response;
          return true;
        })
      );
  }

  GetCustomFieldsListContact(modulename: any, submoduleName: any, companyId: any, Id: any, displayType: any, callFrom: any, callFromId: number) {
    return this.http
      .get(
        `${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${Id}&displayCode=${displayType}&isFor=${callFrom}&RefId=${callFromId}`
      )
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetSolCustomFieldsList(loanAppStageId: any, Id: any) {
    return this.http.get(`${this.baseUri}Common/GetSolCustomFieldsList?loanAppStageId=${loanAppStageId}&PrimaryId=${Id}`).pipe(
      map((response: any) => {
        this.solCustomFieldsList = response;
        return true;
      })
    );
  }
  addEditSolgenStageForm(stageData: StageData) {
    return this.http.post(this.baseUri + `Common/AddEditSolgenStageForm`, stageData);
  }

  markAsCompleteStatus(markData: MarkAsCompleteData) {
    return this.http.post(this.baseUri + `Common/MarkAsCompleteStatus`, markData);
  }
  isValueDuplicate(type: any, refString: any) {
    ;
    return this.http.get(`${this.baseUri}Contact/IsValueDuplicate?type=${type}&refString=${refString}`);
  }
  getGlobalSeacrchData(listFilter: string, length: number, recordFilter: string, teamID: string, teamMemberID: string) {
    return this.http.get(
      this.baseUri +
      `Common/GetGlobalSearchDataAsync?listFilter=${listFilter}&length=${length}&recordFilter=${recordFilter}&teamID=${teamID}&teamMemberID=${teamMemberID}`
    );
  }



  GetServiceAppointmentList(
    nameSearch: string,
    sortColumn: string,
    page: number,
    pageSize: number,
    sortDir: string,
    loginuserid: string,
    moduleName: string,
    submoduleName: string,
    companyId: number,
    custom_view_id: string,
    searchFilter: string,
    form_type: string
  ): Observable<any> {
    if (typeof nameSearch == 'undefined' || nameSearch == null) {
      nameSearch = null;
    } else {
      nameSearch = encodeURIComponent(nameSearch);
    }
    return this.http.get(
      `${this.baseUri}serviceappointment/GetServiceAppointmentList?nameSearch=${nameSearch}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&form_type=${form_type}`
    );
  }

  GetManageViewDropDownList(ModuleName: any, SubModuleName: any) {
    return this.http.get(this.baseUri + `Common/GetManageViewDropDownList?ModuleName=${ModuleName}&SubModuleName=${SubModuleName}`);
  }
  getViewList(
    name: string,
    userType: string,
    sortColumn: string,
    sortDir,
    page: number,
    pageSize: number,
    ModuleName: any,
    SubModuleName: any,
    companyId: number
  ) {
    return this.http
      .get(
        this.baseUri +
        `Common/GetCustomViewName?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&companyId=${companyId}`
      )
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  CheckUserDuplicateORAssociate(email: any) {
    return this.http.get(this.baseUri + `Contact/CheckUserDuplicateORAssociateContact?emailID=${email}`);
  }
  contactAccountMapping(accountId:any,email: any, opportunityId : any =0) {
    ;
    return this.http.get(this.baseUri + `Contact/contactAccountMapping?accountId=${accountId}&email=${email}&opportunityId=${opportunityId}`);
  }

  addEditFormContact(JsonData: JsonData, leadid: any, accountid: any, opportunityid: any) {
    return this.http.post(this.baseUri + `Contact/AddEditContact?leadid=${leadid}&accountid=${accountid}&opportunityid=${opportunityid}`, JsonData);
  }
  GetSolgenContactDetails(id: any, moduleName: any, submoduleName: any, companyId: number, userId: string) {
    return this.http.get(this.baseUri + `common/GetCustomContactById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`).pipe(
      map((response: any) => {
        this.editPage = response;
        return true;
      })
    );
  }

  //===========================================Start LoanHomi Manage View Function======================
  GetLoanHomiViewList(
    name: string,
    userType: string,
    sortColumn: string,
    sortDir,
    page: number,
    pageSize: number,
    ModuleName: any,
    SubModuleName: any,
    companyId: number,
    listType: string
  ) {
    return this.http
      .get(
        this.baseUri +
        `Common/GetLoanHomiCustomViewName?nameSearch=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&companyId=${companyId}&listType=${listType}`
      )
      .pipe(
        map((response: any) => {
          this.loanHomiPagedData = response;
          return true;
        })
      );
  }

  DeleteLoanHomiRecords(deleteId: any, tableName: any) {
    return this.http.get(this.baseUri + `common/DeleteLoanHomiRecords?primaryKey=${deleteId}&tableName=${tableName}`).pipe(
      map((response: any) => {
        this.loanHomiPagedData = response;
        return true;
      })
    );
  }

  GetLoanHomiCustomDefaultView(view_Id: any, moduleName: any, submoduleName: any, listType: string) {
    return this.http.get(
      this.baseUri +
      `Common/GetLoanHomiCustomDefaultView?view_Id=${view_Id}&moduleName=${moduleName}&submoduleName=${submoduleName}&listType=${listType}`
    );
  }
  GetLoanHomiCustomViewbyId(id: any) {
    return this.http.get(this.baseUri + `Common/GetLoanHomiCustomViewbyId?id=${id}`);
  }

  SaveLoanHomiManageViewField(loanHomiManageViewModel: LoanHomiManageViewModel) {
    return this.http.post(this.baseUri + `Common/SaveLoanHomiCustomManagePopup`, loanHomiManageViewModel);
  }

  SaveLoanApplicationReportData(loanApplicationReportModel: LoanApplicationReportModel) {
    return this.http.post(this.baseUri + `Common/AddUpdateLoanApplicationReportData`, loanApplicationReportModel);
  }

  GetLoanHomiCustomFieldsListDisplay(modulename: any, submoduleName: any, companyId: any, displayCode: any) {
    return this.http
      .get(`${this.baseUri}Common/GetFormFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&displayCode=${displayCode}`)
      .pipe(
        map((response: any) => {
          this.loanHomicustomFieldsList = response;
          return true;
        })
      );
  }

  GetLoanHomiManageViewCustomFieldsLeadList(
    fieldlistFilter: any,
    modulename: any,
    submoduleName: any,
    companyId: any,
    controlname: any,
    sortable: any,
    type: string = ''
  ) {
    return this.http
      .get(
        `${this.baseUri}Common/GetLoanHomiManageViewFormFieldsList?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&controlName=${controlname}&sortable=${sortable}&fieldlistFilter=${fieldlistFilter}&type=${type}`
      )
      .pipe(
        map((response: any) => {
          this.loanHomicustomFieldsLeadList = response;
          return true;
        })
      );
  }

  //==================Advance search filter=========================

  GetFormFieldsList(modulename: any, submoduleName: any, companyId: any) {
    return this.http.get(`${this.baseUri}Common/GetFormFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}`).pipe(
      map((response: any) => {
        this.customFieldsList = response;
        return true;
      })
    );
  }

  SendDocumentForSignNow(proposalId: any, mappingId: any,type:string,deliveryId:any, subject: any, body: any , onlyhtml : any, submoduleName: any)  : Observable<any>{
    let model = {
      proposalId: proposalId,
      mappingIds: mappingId,
      sendingSource:type,
      deliveryId:deliveryId,
      subject:subject,
      body:body,
      onlyhtml:onlyhtml,
      submoduleName : submoduleName
    };
    return this.http.post(`${this.baseUri}Common/SendDocumentForSignNow`,  model
    );





    //return this.http.post(`${this.baseUri}proposal/SendDocumentSignNow?proposalId=${proposalId}&mappingIds=${mappingId}&sendingSource=${type}&deliveryId=${deliveryId}&subject=${subject}&body=${JSON.stringify(body)}`);
  }
  //================================================================

  //===========================================End LoanHomi Manage View Function======================

  getTimeZoneList(): Observable<any> {
    return this.http.get(this.baseUri + `common/GetTimeZoneList`);
  }

  getTimeFormatList() {
    let timeFormatList = [
      { text: '12 Hours', value: 12 },
      { text: '24 Hours', value: 24 },
    ];
    return timeFormatList;
  }

  getUserSelectedZone() {
    let info: any[] = JSON.parse(localStorage.getItem('userinfo'));
    let zone = info['timeZone'] as string;
    return zone;
  }

  getUserUTCToSelectedZoneTime(date) {
    let _timezone = this.getUserSelectedZone() as string;
    let time = moment.utc(date).tz(_timezone).format('hh:mm A');
    return time;
  }
  getUTCToSelectedZoneTime(date) {
    let time = moment.utc(date).format('hh:mm A');
    return time;
  }


  getUserSelectedZoneToUTC(date) {
    let timezone = this.getUserSelectedZone() as string;
    let _date = moment(date as Date).format('YYYY-MM-DDTHH:mm:ss');
    let utcdate = moment.tz(_date, timezone).utc().format('YYYY-MM-DD hh:mm:ss a');
    return utcdate;
  }
  getUserSelectedZoneToUTCghantView(date, timezone) {
    //let timezone = this.getUserSelectedZone() as string;
    let _date = moment(date as Date).format('YYYY-MM-DDTHH:mm:ss');
    let utcdate = moment.tz(_date, timezone).utc().format('YYYY-MM-DD hh:mm:ss a');
    return utcdate;
  }
  getUserSelectedZoneToUTCDate(date) {
    let timezone = this.getUserSelectedZone() as string;
    let _date = moment(date as Date).format('YYYY-MM-DDTHH:mm:ss');
    let utcdate = moment.tz(_date, timezone).utc().format('YYYY-MM-DD ');
    //_result = moment.utc(_date).tz(_timezone).format('MM-DD-YYYY');
    return utcdate;
  }

  ConvertUserSelectedTimeZoneToUTC(date) {
    let timezone = this.getUserSelectedZone() as string;
    let _date = moment(date as Date).format('YYYY-MM-DDTHH:mm:ss');
    let utcdate = moment.tz(_date, timezone).utc().format('YYYY-MM-DD HH:mm:ss');
    return utcdate;
  }
  ConvertUserSelectedTimeZoneToUTCForAppointment(date) {
    let timezone = this.getUserSelectedZone() as string;
    let _date = moment(date as Date).format('YYYY-MM-DDTHH:mm:ss');
    let utcdate = moment.tz(_date, timezone).utc().format('YYYY/MM/DD HH:mm:ss');
    return utcdate;
  }
  ConvertUserSelectedDateZoneToUTC(date) {
    let timezone = this.getUserSelectedZone() as string;
    let _date = moment(date as Date).format('YYYY-MM-DDTHH:mm:ss');
    let utcdate = moment.tz(_date, timezone).utc().format('YYYY-MM-DD');
    return utcdate;
  }
  ConvertUserSelectedDate(date) {
    let timezone = this.getUserSelectedZone() as string;
    let _date = moment(date as Date).format('YYYY-MM-DDTHH:mm:ss');
    return _date;
  }

  reduceOneDayOneSec(date) {
    let enddate = moment(date).add(1, "days").subtract(1, "seconds").format('YYYY-MM-DDTHH:mm:ss');
    return enddate;
  };

  getTimeFormat() {
    let info: any[] = JSON.parse(localStorage.getItem('userinfo'));
    return info['timeFormat'] as string;
  }

  getScheduledEmails(filterDate, sortColumn, sortDir, currentPage, pageSizeValue) {
    return this.http.get(
      `${this.baseUri}loan/GetScheduledEmails?filterDate=${filterDate}&sortColumn=${sortColumn}&sortDir=${sortDir}&currentPage=${currentPage}&pageSizeValue=${pageSizeValue}`
    );
  }

  //--------------------- for files section in related tab start here-----------------------
  GetDocumentCategory(): Observable<any> {
    return this.http.get(`${this.baseUri}Common/GetDocumentCategory`);
  }

  GetDocumentTypeByCategoryId(categoryId): Observable<any> {
    return this.http.get(`${this.baseUri}Common/GetDocumentTypeByCategoryId/${categoryId}`);
  }

  GetFileListForRelatedTab(contId, categoryId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    return this.http.get(
      this.baseUri +
      `Common/GetFileListForRelatedTab?ServiceId=${contId}&categoryId=${categoryId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`
    );
  }

  DeleteRecords(deleteId: any, tableName: any): Observable<any> {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`);
  }

  addOrUpdateFiles(model: FormData) {
    return this.http.post(this.baseUri + `common/addOrUpdateFiles`, model);
  }

  getNodeFiles(previewImage: string): Observable<any> {
    return this.http.get(this.baseUri + `common/getNodeServerFiles?fileurl=${previewImage}`);
  }

  GetDDLListByFieldCode(fieldCode: any, moduleCode: any, subModuleCode: any) {
    return this.http
      .get(this.baseUri + `common/GetDDLItemsByFieldCode?fieldCode=${fieldCode}&moduleCode=${moduleCode}&subModuleCode=${subModuleCode}`)
      .toPromise();
  }

  GetDDLItemsForRole(fieldCode: any, accountId: number=0) {
    return this.http
      .get(this.baseUri + `common/GetDDLItemsForRole?fieldCode=${fieldCode}&accountId=${accountId}`)
      .toPromise();
  }

  CheckAccountTypeIsDealer(accountId: number = 0) {
    return this.http
      .get(this.baseUri + `common/CheckAccountTypeIsDealer?accountId=${accountId}`)
      .toPromise();
  }

  GetFileUrl(accountId: number = 0) {
    return this.http
      .get(this.baseUri + `common/GetFileUrl?accountId=${accountId}`)
      .toPromise();
  }

  GetopportunityDetailsByid(OppId: number = 0) {
    return this.http.get(this.baseUri + `common/GetopportunityDetailsByid?OppId=${OppId}`);
  }

  //--------------------- for files section in related tab end here-----------------------
  //----------- Activity section start-----------------------------------------

  addUpdateActivity(activityDataModel: ActivityDataModel) {
    // console.log('activityDataModel', activityDataModel);
    return this.http.post(this.baseUri + `common/addUpdateActivity`, activityDataModel);
  }
  GetActivityData(sortColumn: string, sortDir, page: number, pageSize: number, ModuleName: any, SubModuleName: any, refid: any) {
    return this.http
      .get(
        this.baseUri +
        `Common/GetActivityData?sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&ModuleName=${ModuleName}&SubModuleName=${SubModuleName}&refid=${refid}`
      )
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  DeleteActivity(Id: any) {
    return this.http.get(this.baseUri + `common/DeleteActivity?Id=${Id}`);
  }
  PageString(curPage, pageSize, totalRecords) {
    return (
      'Showing ' +
      ((curPage - 1) * pageSize + 1) +
      ' to ' +
      (totalRecords < curPage * pageSize ? totalRecords : curPage * pageSize) +
      ' out of ' +
      totalRecords +
      '  enteries'
    );
  }

  GetWorkTypesDDLList(id: any, length: any, serchText: string): Observable<any> {
    return this.http.get(`${this.baseUri}common/GetWorkTypeDDL?id=${id}&length=${length}&serchText=${serchText}`);
  }
  SaveCLoneVie(ViewId: any, ViewName: any, listType: string): Observable<any> {
    var obj = new CloneView();
    obj.id = ViewId;
    obj.name = ViewName;
    obj.listType = listType;

    return this.http.post(`${this.baseUri}common/CloneSelectedViewList`, obj);
  }
  GenerateTwilioAccessToken(): Observable<any> {
    return this.http.get(`${this.baseUri}Twilio/AccessToken`);
  }

  //----------------------end activity section---------------------------------
  saveWelcomeCall(model: WelcomeCallSaveModel) {
    return this.http.post(this.baseUri + `common/saveWelcomeCall`, model);
  }
  GenerateNumber(val) {
    let _data = val.toString();
    let length = _data.length;
    let reqlength = 8 - length;
    let result: string = '';
    for (let i = 0; i < reqlength; i++) {
      result += '0';
    }
    return result + val;
  }
  GetCustomFieldsOptionsList(fieldId: any, sub_module_id: any) {
    return this.http.get(`${this.baseUri}SolgenRuleEngine/GetCustomFieldOptionsList?fieldId=${fieldId}&subModuleId=${sub_module_id}`).pipe(
      map((response: any) => {
        if (response == null) return null;
        return JSON.stringify(response);
      })
    );
  }

  GetSolgenRuleEngineFormulaList(length: number, searchText?: string) {
    let url = `SolgenRuleEngine/GetSolgenRuleEngineFormulasList?length=${length}`;
    if (searchText) {
      url += `&searchText=${searchText}`
    }
    return this.http.get(`${this.baseUri}${url}`).pipe(
      map((response: any) => {
        if (response == null) return null;
        return JSON.stringify(response);
      })
    );
  }

  GetOperatorExpression(operatorId, operatorList: any[]) {

    let expression = operatorList.filter(item => parseInt(item.value) == operatorId)[0].expression;

    switch (expression) {
      case "=":
        return "==";
      case "<>":
        return "!=";
      default:
        return expression;
    }

  }
  base64ToArrayBuffer(base64: any): ArrayBuffer {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  checkUserSession() {
    return this.http.get(`${this.baseUri}Dashboard/checkUserSession`);
  }


  GetRelatedObjects(moduleName: any, subModuleName: any, primaryId: any, deviceType: any, layoutType: any): Observable<any> {
    return this.http.get(`${this.baseUri}vendor/GetRelatedObjects?moduleName=${moduleName}&subModuleName=${subModuleName}&primaryId=${primaryId}&deviceType=${deviceType}&layoutType=${layoutType}`);
  }

  GetRelatedObjectsCompactView(compact_view_id, sub_module_code, record_id, sortColumn, sortDirection, pageNo, pageSize): Observable<any> {
    return this.http.get(`${this.baseUri}vendor/GetRelatedObjectsCompactView?compact_view_id=${compact_view_id}&sub_module_code=${sub_module_code}&record_id=${record_id}&sortColumn=${sortColumn}&sortDirection=${sortDirection}&pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  ShowError() {
    this.toaster.error("Something went wrong. Please contact administrator.");
  }

  TryJsonParse(json: any) {
    try {
      let _json = JSON.parse(json);
      return _json;
    }
    catch {
      return json;
    }
  }
  SetPrimaryContact(contactId: string, accountId: string): Observable<any> {
    return this.http.get(this.baseUri + `Contact/SetPrimaryContact?contactId=${contactId}&accountId=${accountId}`);
  }
  addOrUpdateFormView(data: JsonData) {
    return this.http.post(this.baseUri + `Common/AddOrUpdateFormView`, data);
  }
  getConfigurationTypeFileExtensions(configurationType: any) {
    return this.http.get(this.baseUri + `Common/GetConfigurationTypeFileExtensions/${configurationType}`);
  }
  roomStatusCallBack(data: any) {
    return this.http.post(this.baseUri + `Common/setRoomParticipantInfo`, data);
  }

  getThemeType() {
    return this.http.get(this.baseUri + `Common/GetThemeType`);
  }

  listingsActionManager_ForUpperCase(modulePermission: any[], conditionName: string): boolean
  {
    let result = modulePermission.find(m => m.privilegecode.toUpperCase() == conditionName);
    var actionStatus: boolean = false;
    if (result == undefined)
    {
      result = "null";
    }
    else
    {
      actionStatus = true;
    }
    return actionStatus;
  }

  listingsActionManager_ForLowerCase(modulePermission: any[], conditionName: string): boolean
  {
    let result = modulePermission.find(m => m.privilegecode.toLowerCase() == conditionName);
    var actionStatus: boolean = false;
    if (result == undefined)
    {
      result = "null";
    }
    else
    {
      actionStatus = true;
    }
    return actionStatus;
  }


  listingsActionManager(modulePermission: any[], conditionName: string): boolean
  {
    let result = modulePermission.find(m => m.privilegecode == conditionName);
    var actionStatus: boolean = false;
    if (result == undefined)
    {
      result = "null";
    }
    else
    {
      actionStatus = true;
    }
    return actionStatus;
  }


  loginModel: Login = new Login();
  Browser: any;
  BrowserVersion: any;
  CompanyIdval:any;
  deviceInfo: any;
  OS: any;
  OSVersion: any;

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.Browser = this.deviceInfo.browser;
    this.BrowserVersion = this.deviceInfo.browser_version;
    this.OS = "";
    this.OSVersion = this.deviceInfo.os_version;
  }


  switchToSuperAdmin(row:any){


    const message = `Are you sure you want to switch to the Super Admin?`;
    this.dialogService.confirm('Switch To Super Admin', message).subscribe(confirmed => {
      if (confirmed) {
        (typeof row) == "string" ? this.loginModel.userName = row :  this.loginModel.userName = row.Email;

        this.loginModel.browser = this.Browser + " " + this.BrowserVersion;
        this.loginModel.os = this.OS + " " + this.OSVersion;
        this.loginModel.CompanyId = this.CompanyIdval;

        this.userService.loginWithEmail(this.loginModel).subscribe((res: any)=>{
         // console.log(res);

         if(res){

          
          if (res.status == 200) {
            localStorage.setItem("access_token", res.token);
            localStorage.setItem("usertype", res.usertype);

            localStorage.setItem("authenticate", "YES");
            this.getCurrentUserDetail();

              this.getLoggedInName.pipe(take(1)).subscribe((userdetail: any) =>
              {
                ;

                  this.moduleService.getRoleModuleList(false).pipe(take(1)).subscribe((m: any) => {
                  localStorage.removeItem('moduleList');
                  localStorage.setItem('moduleList', m);

                  if ( res.usertype === 'usertypecontact') {
                    window.location.href = "dashboard";
                  }else if ( res.usertype === 'usertypesuperadmin'){
                    
                    localStorage.removeItem('A_Email');
                    localStorage.setItem('A_Email',JSON.parse(localStorage.getItem('userinfo')).email);
                    window.location.href = "super-admin-dashboard";
                  }
                  else {
                    window.location.href = "dashboard";
                  }

                  localStorage.removeItem('isFromSuperAdmin');
                   localStorage.setItem('isFromSuperAdmin','false');

                  //history.go(0);
                });
              });
          }
          else if (res.status == 204) {
            window.location.href = "account/multipleuserlogin?UserId=" + res.userId;
          }
          else if (res.status == 201) {//deleted/inactive user
            //this.loadSave = false;
            this.toaster.error(res.token);
          }

          else if (res.status == 501) {
         //   this.loadSave = false;
            this.toaster.error("Your Account is Blocked for 30 minutes because you have entered wrong username/password");
          }
         }


        })
      }
    });
  }





}


export class fieldsJson {
  dt_code: string;
  column_name: string;
  column_display_name: string;
  operator: string;
  operatorId: string;
  display_value: string;
  value: string;
  second_value: string;
  extended_operator: string;
  constructor() {
    this.dt_code = "";
    this.column_name = "";
    this.column_display_name = "";
    this.operator = "";
    this.operatorId = "";
    this.display_value = "";
    this.value = "";
    this.second_value = "";
    this.extended_operator = "";
  }
}



export class CheckboxData {
  controlname: string;
  controlvalues: string;
  constructor() {
    this.controlname = '';
    this.controlvalues = '';
  }
}

export class View {
  id: string;
  name: string;
}
export class CloneView {
  id: string;
  name: string;
  listType: string;
}

export class UserDetails {
  id: string;
  email: string;
  firstName: string = "";
  lastName: string = "";
  userType: string;
  fullName = this.firstName + ' ' + this.lastName;
  isHOD: boolean;
  companyId: number;
  roleCode: string;
  companyType: string;
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

export class SelectItemModel {
  value: string;
  text: string;
  constructor() {
    this.value = '';
    this.text = '';
  }
}
export class SelectBusinessContactModel {
  value: string;
  text: string;
  constructor() {
    this.value = '';
    this.text = '';
  }
}

export class SelectTemplateItemModel {
  value: string;
  text: string;
  constructor() {
    this.value = '';
    this.text = '';
  }
}

export enum ModuleNames {
  Vendor = 0,
  Bank = 1,
}
export class ChangePasswordModel {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  constructor() {
    this.currentPassword = '';
    this.password = '';
    this.confirmPassword = '';
  }
}

export class DownloadModel {
  documentID: any;
  documentName: string;
  folderName: string;
  constructor() {
    this.documentID = null;
    this.documentName = '';
    this.folderName = '';
  }
}

export class ModuleList {
  moduleId: string;
  moduleCode: number;
  moduleName: string;
  moduleRoute: string;
  moduleUserType: string;
  roleName: string;
  roleID: string;
  roleDescription: string;
  roleModuleAddFlag: boolean;
  roleModuleUpdateFlag: boolean;
  roleModuleReadFlag: boolean;
  roleModuleDeleteFlag: boolean;
  roleModuleEmailFlag: boolean;
  roleModuleSMSFlag: boolean;
  roleModuleNotificationFlag: boolean;
}

export class OperatorModel {
  expression: string;
  text: string;
  value: string;
  constructor() {
    this.expression = '';
    this.text = '';
    this.value = '';
  }
}

export class dynamicsectionarray {
  stageName: string;
  formmasterid: string;
  stageclass: string;
  linkFormMaster: string;

  stageActive: string;
  constructor() {
    this.stageName = '';
    this.formmasterid = '';
    this.stageclass = '';
    this.linkFormMaster = '';
    this.stageActive = '0';
  }
}

export class StageData {
  Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  constructor() {
    this.Id = '';
    this.FormJsonData = '';
    this.moduleCode = '';
    this.subModuleCode = '';
  }
}

export class MarkAsCompleteData {
  Id: string;
  moduleCode: string;
  subModuleCode: string;
  stageId: string;
  constructor() {
    this.Id = '';
    this.moduleCode = '';
    this.subModuleCode = '';
    this.stageId = '';
  }
}
export class addAssignedResourcesModel {
  Id: number;
  serviceAppointment: string;
  serviceResourceId: number;
  estimatedTravelTime: string;
  actualTravelTime: string;
  serviceCrewId: number;
  estimatedTravelTimeFromSourceId: string;
  approximateTravelDistanceForm: string;
  estimatedTravelTimeToSourceId: string;
  approximateTravelDistanceTo: string;
  lastUpdatedEpoch: string;
  approximateTravelTimeForm: string;
  isUpdatedByOptimization: string;
  calculatedDurationMinutes: string;
  isServiceResource: boolean;

  description: string;
  accountId: string;
  statusId: string;
  subject: string;
  workType: string;
  WorkOrder: string;
  arrivalWindowStartTime: string;
  arrivalWindowEndTime: string;
  scheduledStartTime: string;
  scheduledEndTime: string;

  constructor() {
    this.serviceAppointment = '';
    this.serviceResourceId = 0;
    this.estimatedTravelTime = '';
    this.actualTravelTime = '';
    this.serviceCrewId = 0;
    this.estimatedTravelTimeFromSourceId = '';
    this.approximateTravelDistanceForm = '';
    this.estimatedTravelTimeToSourceId = '';
    this.approximateTravelDistanceTo = '';
    this.lastUpdatedEpoch = '';
    this.approximateTravelTimeForm = '';
    this.isUpdatedByOptimization = '';
    this.calculatedDurationMinutes = '';
    this.Id = 0;
    this.isServiceResource = false;
    this.description = '';
    this.accountId = '';
    this.statusId = '';
    this.subject = '';
    this.workType = '';
    this.WorkOrder = '';
    this.arrivalWindowStartTime = '';
    this.arrivalWindowEndTime = '';
    this.scheduledStartTime = '';
    this.scheduledEndTime = '';
  }
}

export class JsonData {
  Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.Id = '';
    this.FormJsonData = '';
    this.moduleCode = '';
    this.subModuleCode = '';
    this.companyId = '';
    this.userId = '';
  }
}

export class ActivityDataModel {
  Id: string;
  ModuleCode: string;
  SubModuleCode: string;
  ref_id: string;
  message: string;
  subject: string;
  starttime: string;
  endtime: string;
  displayType: string;
  callfrom: string;
  call_to: string;
  priority: string;
  contactid: string;
  call_purpose: string;
  activity_type: string;
  scheduleDate: string;
  activityStatus: string;
  constructor() {
    this.Id = '';
    this.ModuleCode = '';
    this.SubModuleCode = '';
    this.ref_id = '';
    this.message = '';
    this.subject = '';
    this.starttime = '';
    this.endtime = '';
    this.displayType = '';
    this.callfrom = '';
    this.call_to = '';
    this.priority = '';
    this.contactid = '';
    this.call_purpose = '';
    this.activity_type = '';
    this.scheduleDate = '';
    this.activityStatus = '';
  }
}

export class LoanHomiManageViewModel {
  moduleName: string;
  Id: string;
  subModuleName: string;
  //first form
  radiogroup: string;
  select: string;
  Roles: any;
  //second options
  selectedFields: any = [];
  //third options
  customWhereCondition: any;
  view_searchFilterJson: any;
  manage_view_for: string;
  constructor() {
    this.moduleName = '';
    this.Id = '';
    this.subModuleName = '';
    this.radiogroup = '';
    this.select = '';
    this.Roles = null;
    this.customWhereCondition = '';
    this.view_searchFilterJson = '';
    this.manage_view_for = '';
  }
}


export class LoanApplicationReportModel {
  Id: string;
  reportName: string;
  moduleId: string;
  subModuleId: string;
  description: string;
  dateFrom: any;
  dateTo: any;
  selectedFields: any = [];
  customWhereCondition: any;
  report_searchFilterJson: any;
  filterType: string;
  isCountWidget: boolean;
  isChartView: boolean;
  isListView: boolean;
  radiogroup: string;
  Roles: any;
  radioChartBtn: string;
  listViewRadioBtn: string;
  chartSelectedRole: any;
  listViewselectedRole: any;
  listViewFields: any;
  chartViewYAxis: string;
  chartType: string;
  groupByFieldId: number;
  reportIconClass: string;
  reportIconSpanColorClass: string;
  companyType: string;
  constructor() {
    this.Id = '';
    this.reportName = '';
    this.description = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.customWhereCondition = '';
    this.report_searchFilterJson = '';
    this.filterType = ''
    this.isCountWidget = false;
    this.isChartView = false;
    this.isListView = false;
    this.radiogroup = "";
    this.Roles = '';
    this.radioChartBtn = '';
    this.listViewRadioBtn=''
    this.chartSelectedRole = '';
    this.listViewselectedRole = '';
    this.chartViewYAxis = '';
    this.listViewFields = '';
    this.chartType = '';
    this.groupByFieldId = 0;
    this.reportIconClass = '';
    this.reportIconSpanColorClass = '';
    this.companyType = '';
  }
}

export class WelcomeCallSaveModel {
  moduleName: string;

  subModuleName: string;
  AccountId: string;
  FlowId: string;
  Screenid: string;
  data: string;

  constructor() {
    this.moduleName = '';
    this.AccountId = '';
    this.subModuleName = '';
    this.FlowId = '';
    this.Screenid = '';
    this.data = '';
  }
}
export class DailerParam {
  phoneNo: string;
  companyId: string;
  userId: string;
  objectName: string;
  refId: string;
  constructor(phoneNo: string, companyId: string, userId: string, objectName: string, refId: string) {
    this.phoneNo = phoneNo;
    this.companyId = companyId;
    this.userId = userId;
    this.objectName = objectName;
    this.refId = refId;
  }
}
export class validationModel {
  companyType: string;
  isAudit: boolean;
  isUpdate: boolean;
  isAdd: boolean;
  isDelete: boolean;


  constructor() {
    this.companyType = '';
    this.isAudit = false;
    this.isUpdate = false;
    this.isAdd = false;
    this.isDelete = false;

  }
}

export class userActivityLog {
  userID: string;
  companyID: string;
  pageUrl: string;
  redirectedFrom: string;
}

export interface ImageItem {
  src: string,
  caption: string,
  thumb: string
}


export class KeyValue {
  Key: string;
  Value: string;
  constructor() {
    this.Key = '';
    this.Value = '';
  }
}
