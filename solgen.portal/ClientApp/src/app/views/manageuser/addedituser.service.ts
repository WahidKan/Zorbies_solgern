import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  public userUri = `${environment.WebApiBaseUrl}UserProfile`;
  pagedData: any;
  masters: any;
  constructor(private http: HttpClient) { }
  addeditUser(userModel: User) {
   
    if (userModel.Id == null) {//add
      return this.http.post(this.baseUri + `Account/Register`, userModel);
    }
    else {//update
      return this.http.post(this.baseUri + `UserProfile/UpdateUser`, userModel);
    }
  } 
  CheckUserDuplicateORAssociate(email: any, uid: any) {
    return this.http.get(this.baseUri + `Account/CheckUserDuplicateORAssociate?emailID=${email}&uid=${uid}`);
  }
  CheckUserAssociate(email: any, uid: any) {
    return this.http.get(this.baseUri + `Account/CheckUserAssociate?emailID=${email}&uid=${uid}`);
  }
  AssociateUserWithCompany(email: any, uid: any, RoleID: any, userTypeId: any, deptid: any, ishod: any) {
    return this.http.post(this.baseUri + `Account/AssociateUserWithCompany?emailID=${email}&uid=${uid}&RoleID=${RoleID}&userTypeId=${userTypeId}&deptid=${deptid}&ishod=${ishod}`,null);
  }
  getBankName() {
    return this.http.get(this.baseUri + `Bank/GetBankDropList`);
  }
  getReportToList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetReportToList`);
  }
  getRolesName(id: any) {
    return this.http.get(this.baseUri + `Bank/GetRolesDropListByUserType?id=${id}`)
  }
  getMasterItemsList(masterNames: any): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetMasterItems/${masterNames}`).pipe(
      map((response: any) => {
        this.masters = response;

      })
    );
  }
  getUserList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.userUri}/GetUsersList?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }


  GetUserlist(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number, isCheckboxTick: any): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.userUri}/GetUserlist?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}&isAllRecords=${isCheckboxTick}`)
  } 

  //function used to set active/inactive status of user
  changeStatus(id: string) {
    return this.http.post(`${this.userUri}/ChangeStatus/${id}`, null);
  }

  //function is used to get detail of  user
  getUserDetail(id: any) {
    return this.http.get(this.baseUri + `UserProfile/GetUserDetailById?userId=${id}`)
  }
  GetEmployeeDetailById(id: any, isEmployee: boolean) {
    return this.http.get(this.baseUri + `UserProfile/GetContactOrEmployeeById?userId=${id}&isEmployee=${isEmployee}`)
  }
  //function is used to delte the  user
  deleteUser(id: any) {    
      return this.http.get(this.baseUri + `UserProfile/DeleteUser?userid=${id}`)    
  }

  //function is used to get the StateList
  getStateList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetStateList`);
  }
  getStateListNotAuth() {
    return this.http.get(this.baseUri + `ManageInsurance/GetStateListNotAuth`);
  }
  getCountryList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetCountryList`);
  }
  GetCountryListIso() {
    return this.http.get(this.baseUri + `ManageInsurance/GetCountryListIso`);
  }

  getCountryListNotAuth() {
    return this.http.get(this.baseUri + `ManageInsurance/GetCountryListNotAuth`);
  }
  GetLocationDDL() { 
    return this.http.get(this.baseUri + `UserProfile/GetServiceTerritoryDDL`);
  }
  GetDepartmentDll() {

    return this.http.get(`${this.userUri}/GetDepartmentDll`);

  }
  GetCompanyDll() {

    return this.http.get(`${this.userUri}/GetCompanyDll`);

  }


  //popup
  gettoken(email: any) {
    return this.http.get(`${this.userUri}/gettoken?email=${email}`)
  }

  check_company_lisence_limit(){
    return this.http.get(`${this.baseUri}Account/check_company_lisence_limit`)
  }
}

export class User {
  firstName: string;
  lastName: string;
  userType: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  position: string;
  employeeType: string;
  isActive: boolean;
  notes: string;
  Id: string;
  assignedBankId: string;
  roleId: string;
  UManagerId: string;
  executiveCommisionFormula: string;
  locationID: string;
  departmentID: string;
  timeZoneId: string;
  companyid: string;
  isHOD: boolean;
  emailNotification: boolean;
  salesForceEmployeOrContact: number;
  refFrom: string;
  sendMail: boolean = false;
  oldemail: string;
  reportToId: string;
  timeFormat: string;
  sfid: string;
  sid: string;
  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.userType = "";
    this.email = "";
    this.phoneNumber = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zipCode = "";
    this.county = "";
    this.position = "";
    this.employeeType = "";
    this.isActive= false;
    this.notes = "";
    this.Id = "";
    this.assignedBankId = "";
    this.roleId = "";
    this.UManagerId = "";  
    this.executiveCommisionFormula = "";
    this.locationID = "";
    this.departmentID = "";
    this.timeZoneId = "";
    this.isHOD = false;
    this.emailNotification = false;
    this.companyid = "";
    this.salesForceEmployeOrContact = 0;
    this.refFrom = "";
    this.oldemail = "";
    this.reportToId = "";
    this.sendMail = false;
    this.timeFormat = '';
    this.sfid = '';
    this.sid = '';
  }
}

export class MasterItems {
  MasterItemName: string;
  Text: string;
  Value: string
  constructor() {
    this.MasterItemName = "";
    this.Text = "";
    this.Value = "";
  }
}


