import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  Browser: any;
  BrowserVersion: any;
  OS: string
  OSVersion: string;
  deviceInfo = null;
  constructor(private http: HttpClient, private deviceService: DeviceDetectorService) {}

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.Browser = this.deviceInfo.browser;
    this.BrowserVersion = this.deviceInfo.browser_version;
    this.OS = "";
    this.OSVersion = this.deviceInfo.os_version;

  }

  login(loginModel: Login) {
    return this.http.post(this.baseUri + `Account/Login`, loginModel);
  }

  IsAccountLocked(loginModel: Login) {
    return this.http.post(this.baseUri + `Account/IsAccountLocked`, loginModel);
  }

  Lock_Unlock_Account(user) {

    return this.http.post(this.baseUri + `Account/Lock_Unlock_Account`, user );
  }
  ForgotPsw(forgotPswModel: ForgotPassword) {
    return this.http.post(this.baseUri + `Account/ForgotPassword`, forgotPswModel);
  }

  SetPasswordByEmail(forgotPswModel: ForgotPassword) {
    // console.log('forgotPswModel', forgotPswModel)
    return this.http.post(this.baseUri + `Account/SetPasswordByEmail`, forgotPswModel);
  }
  GetCred() {
    return this.http.get(this.baseUri + `Account/GetRememberMeCredentials`);
  }
  getCurrentUserDetail() {
    return this.http.get(this.baseUri + `UserProfile/GetUserDetail`);
  }

  confirmEmail(userid: any, token: string) {
    return this.http.get(this.baseUri + `Account/Confirm?userId=${userid}&token=${token}`);
  }
  refreshtoken(username: string) {
    this.epicFunction();
    return this.http.get(this.baseUri + `Account/RefreshToken?username=${username}&browser=${this.Browser}&browserVersion=${this.BrowserVersion}&os=${this.OS}&OSVersion=${this.OSVersion}`);
  }
  updatetoken(username: string, companyId:any) {
    this.epicFunction();
    return this.http.get(this.baseUri + `Account/UpdateToken?username=${username}&browser=${this.Browser}&browserVersion=${this.BrowserVersion}&os=${this.OS}&OSVersion=${this.OSVersion}&companyId=${companyId}`);
  }
  getRoleModuleList(isApplyRole: boolean) {
    return this.http.get(this.baseUri + `Modules/getRoleModuleList?isApplyRole=${isApplyRole}`);
  }
  setPassword(setPassword: SetPassword) {

    // console.log('setPassword', setPassword)

    return this.http.post(this.baseUri + `Account/SetPassword`, setPassword);
  }
  setCompanyMaping(SetCmapping: SetCompanyMapping) {

    // console.log('Set Company Mapping', SetCmapping)

    return this.http.post(this.baseUri + `Account/SetCompanyMapping`, SetCmapping);
  }
  ResetPassword(setPassword: SetPassword) {
    return this.http.post(this.baseUri + `Account/ResetPassword`, setPassword);
  }
  GetFileLink(fileName: string, type: string, uploadFolderName:string) {
    return this.http.get(this.baseUri + `Helper/GetFileLink/GetFileLink?fileName=${fileName}&type=${type}&uploadFolderName=${uploadFolderName}`);
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.http.post(this.baseUri + `Account/ResetPassword`, resetPassword);
  }

  getUserProfile() {
    return this.http.get(this.baseUri + `UserProfile/GetUserDetail`);
  }

  updateUserProfile(userProfileModel: UserProfile) {
    return this.http.post(this.baseUri + `UserProfile/updateUserProfile`, userProfileModel);
  }
  GetSiteURl(url: any) {

    return this.http.get(this.baseUri + `Account/GetSiteUrl?url=${url}`);
  }
  checkAcceptance(userid: any) {

    return this.http.get(this.baseUri + `Account/GetCompanyCount?userid=${userid}`);
  }

  loginWithEmail(loginModel){
    debugger
    return this.http.post(this.baseUri+ `Account/GetUserByEmail`, loginModel)
  }

  ValidateUserByEmail(loginModel){   
    return this.http.post(this.baseUri+ `Account/ValidateUserByEmail`, loginModel)
  }

}
export class Login {
  userName: string;
  password: string;
  rememberMe: boolean;
  browser: string;
  os: string;
  iPAddress: string;
  isMutipleUser: boolean;
  CompanyId: string;
  CompanyName: string;
  isLoginForMutipleUserCredential: boolean;
  constructor() {
    this.userName = '';
    this.password = '';
    this.rememberMe = false;
    this.browser = '';
    this.os = '';
    this.iPAddress = '';
    this.isMutipleUser = false;
    this.CompanyId = '';
    this.CompanyName = "";
    this.isLoginForMutipleUserCredential = false;
  }
}

export class SetPassword {
  password: string;
  confirmPassword: string;
  userId: any;
  token: any;
  ResetToken: any;
  constructor() {
    this.password = "";
    this.confirmPassword = "";
    this.userId = null;
    this.token = "";
    this.ResetToken = "";
  }
}
export class SetCompanyMapping {
  userId: string;
  CompanyMappingStatusId: number;

  constructor() {
    this.userId = "";
    this.CompanyMappingStatusId =1002;

  }
}
export class ResetPassword {
  password: string;
  confirmPassword: string;
  userId: any;
  resetToken: any;
  constructor() {
    this.password = "";
    this.confirmPassword = "";
    this.userId = null;
  }
}
export class ForgotPassword {
  email: string;
  siteTitle: string;
  siteImg: string;
  siteCompanyURL: string;
  siteCompanyID: number;
  constructor() {
    this.email = '';
    this.siteTitle = '';
    this.siteImg = '';
    this.siteCompanyURL = '';
    this.siteCompanyID = 0;
  }
}

export class UserProfile {
  FirstName: string;
  LastName: string;
  UserType: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  Position: string;
  employeeType: string;
  isActive: boolean;
  notes: string;
  profilePic: string;
  Id: string;
  constructor() {
    this.FirstName = "";
    this.LastName = "";
    this.UserType = "";
    this.Email = "";
    this.PhoneNumber = "";
    this.Address = "";
    this.Position = "";
    this.employeeType = "";
    this.isActive = false;
    this.notes = "";
    this.Id = "";
  }
}



