import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService, Login } from '../../shared/user.service';
import { CommonService } from '../../shared/common.service';
import { Validators, FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-loginuserlist',
  templateUrl: './loginuserlist.component.html',
  styleUrls: ['./loginuserlist.component.scss']
})
export class LoginuserlistComponent implements OnInit {
  @Output() passwordData: any;
  lstheadercompany: any;
  userId: any;
  loadSave = false;
  deviceInfo = null;
  Browser: any;
  BrowserVersion: any;
  IPAddress: any;
  isChecked = false;
  OS: string
  OSVersion: string;
  loginModel: Login = new Login();
  constructor(private routerService: Router, private fb: FormBuilder, private toaster: ToastrService, private userService: UserService,
    private commonService: CommonService, private router: Router, private activeRoute: ActivatedRoute, private deviceService: DeviceDetectorService) {
  }
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: ['']
  });
  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      let values = params['UserId'];
      this.GeHeaderCompanyList(values);
    });
    
  }

  LoginUserForCompany(company, userName, CompanyName) {
    //if (this.loginForm.valid) {
      this.loadSave = true;
      this.loginModel.userName = userName;
      this.loginModel.password = '';
      this.loginModel.browser = this.Browser + " " + this.BrowserVersion;
      this.loginModel.os = this.OS + " " + this.OSVersion;
      this.loginModel.iPAddress = this.IPAddress;
    this.loginModel.isMutipleUser = true;
    this.loginModel.isLoginForMutipleUserCredential = true;
    this.loginModel.CompanyId = company;
    this.loginModel.CompanyName = CompanyName;
      this.userService.login(this.loginModel).subscribe((res: any) => {

        if (res) {
          if (res.status == 200) {
            localStorage.setItem("access_token", res.token);
            localStorage.setItem("usertype", res.usertype);
            this.commonService.getCurrentUserDetail();
            this.commonService.getLoggedInName.subscribe((userdetail: any) => {
            });
            setTimeout(() => {
              this.commonService.getLoggedInName.subscribe((userdetail: any) => {
                
                this.commonService.getUserModulePermissions(false).subscribe((m: any) => {
                  localStorage.removeItem('moduleList');

                  localStorage.setItem('moduleList', m);
                  //  this.router.navigateByUrl('/dashboard');
                  window.location.href = "dashboard";
                });
              });
            }, 2000);

            setTimeout(() => { this.loadSave = false; }, 2000);
          }
          else if (res.status == 204) {
            window.location.href = "account/multipleuserlogin?UserId=" + res.userId;
          }
          else if (res.status == 201) {//deleted/inactive user
            this.loadSave = false;
            this.toaster.error(res.token);
          }

          else if (res.status == 501) {
            this.loadSave = false;
            this.toaster.error("Your Account is Blocked for 30 minutes because you have entered wrong username/password");
          }
          else {
            this.loadSave = false;
            this.toaster.error("Invalid username/password!");
          }
        }
      }, error => {
        this.loadSave = false;
      });

    //}
    //else {
    //  this.commonService.validateAllFormFields(this.loginForm);
    //}
  }
  GeHeaderCompanyList(values) {
    this.commonService.GeHeaderCompanyList(values).subscribe((data: any) => {
      this.lstheadercompany = data;
    })
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.Browser = this.deviceInfo.browser;
    this.BrowserVersion = this.deviceInfo.browser_version;
    this.OS = "";
    this.OSVersion = this.deviceInfo.os_version;
  }

  Back() {
    this.router.navigateByUrl("/account");
  }
}
