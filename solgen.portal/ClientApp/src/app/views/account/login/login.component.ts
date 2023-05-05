import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UserService, Login } from '../../../views/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModulesService } from '../../managemodules/modules.service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  @ViewChild('companyModal', { static: false }) companyModal: ModalDirective;
  @Input() passwordData: any;
  deviceInfo = null;
  Browser: any;
  BrowserVersion: any;
  IPAddress: any;
  isChecked = false;
  baseUrl:string;
  CompaniesName:any;
  CompanyIdval:any;
  loadSave = true;
  OS: string
  OSVersion: string;
  loginModel: Login = new Login();
  siteURL: string = "";
  url: string = "";
  urldata: any;
  siteimage: string;
  sitetitle: string = '';
  leftAttempts: number = 3;
  isPasswordVisible:Boolean=false;
  constructor(private fb: FormBuilder
    , private userService: UserService
    , private router: Router
    , private toaster: ToastrService
    , private commonService: CommonService,
    private moduleService: ModulesService,
    private deviceService: DeviceDetectorService,
    private titleService: Title,
    private http:HttpClient,private app:AppComponent) { this.epicFunction();
    }
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: ['']
  });
  ngOnInit() {
   // this.getIPAddress();
    // if (localStorage.getItem("access_token") != null)
    //   this.router.navigateByUrl("/dashboard");
    // else {
    //   this.app.ShowDialer({ visible: false, defaultValue: false, phoneNo: '' });
    //   this.router.navigateByUrl("/account");
    // }
    this.url = window.location.href;

    this.loadSave = true;
    // console.log('this.urlbefore', this.url)
    this.url = this.url.slice(9,19);
    //---setting Logo on basis of URL
    // console.log('this.urlafter', this.url)
     this.userService.GetSiteURl(this.url).pipe(take(1)).subscribe((result: any) => {

      // console.log('dataa', result);
      this.urldata = JSON.parse(result);

      if (result != null) {
        this.siteimage = this.urldata[0].SiteLoginLogo;

        this.sitetitle = this.urldata[0].SiteTitle;

        this.setTitle(this.sitetitle);
      }
      else {
        this.sitetitle='SolgenOne'
        this.setTitle(this.sitetitle);
        this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
      }

    })
    //debugger
    if (localStorage.getItem('customer_email')  || this.router.url.includes('email'))
    {
      localStorage.removeItem('access_token');
      localStorage.removeItem('usertype');
      localStorage.removeItem('moduleList');
      this.loginModel.userName = localStorage.getItem('customer_email');
      this.loginModel.browser = this.Browser + " " + this.BrowserVersion;
      this.loginModel.os = this.OS + " " + this.OSVersion;
      this.loginModel.CompanyId = this.CompanyIdval;

      this.userService.loginWithEmail(this.loginModel).subscribe((res: any)=>{

       this.loadSave = true;
       if(res){
        if (res.status == 200) {
          
          this.loadSave = true;
          localStorage.setItem("access_token", res.token);
          localStorage.setItem("usertype", res.usertype);

          localStorage.setItem("authenticate", "YES");
          this.commonService.getCurrentUserDetail();

            this.commonService.getLoggedInName.pipe(take(1)).subscribe((userdetail: any) =>
            {
                this.moduleService.getRoleModuleList(false).pipe(take(1)).subscribe((m: any) => {
                localStorage.removeItem('moduleList');
                localStorage.setItem('moduleList', m);
               
                if ( res.usertype === 'usertypecontact') {
                  var customer_email =  localStorage.getItem('customer_email');
                  localStorage.removeItem('customer_email');
                  window.location.href = "dashboard?email=" + customer_email;
                }
                else {
                  window.location.href = "account";
                }
              });
            });

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
       }


      })
    }
    // console.log(this.router.url);
    if (this.router.url.indexOf('app.loanhomi') > 0) {
      this.siteURL = "loanhomi";
    }
    else if (this.router.url.indexOf('app.solgenone') > 0) {
      this.siteURL = "solgenone";
    }
    else if (this.router.url.indexOf('solgen.zorbis') > 0) {
      this.siteURL = "solgenone";
    }
    //------------------------------------

    this.getRememberMeCredentials();
    this.loadSave = false;
  }


  setTitle(newTitle: string) {

    this.titleService.setTitle(newTitle);
  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.Browser = this.deviceInfo.browser;
    this.BrowserVersion = this.deviceInfo.browser_version;
    this.OS = "";
    this.OSVersion = this.deviceInfo.os_version;
  }

  //getIPAddress() {
  //  this.http.get("https://jsonip.com").subscribe((res: any) => {
  //    this.IPAddress = res.ip;
  //    // console.log("IPAddress", this.IPAddress);
  //  });
  //}
  login() {

      if (this.loginForm.valid)
      {
        this.loadSave = true;
        this.loginModel.userName = this.loginForm.value.userName;
        this.loginModel.password = this.loginForm.value.password;
        this.passwordData = this.loginForm.value.password;
        this.loginModel.browser = this.Browser + " " + this.BrowserVersion;
        this.loginModel.os = this.OS + " " + this.OSVersion;
        this.loginModel.CompanyId = this.CompanyIdval;
        //  this.loginModel.iPAddress = this.IPAddress;


            this.userService.login(this.loginModel).pipe(take(1)).subscribe((res: any) => {
              if (res)
              {
                // let test = res.companyList.filter(m=>m.StatusId == 1001)
                // // console.log(test.length);
                // if (res.isMultiple == "true") {
                //  // console.log(res.companyList);
                //  this.CompaniesName=res.companyList;
                //  this.loadSave=false;
                //  this.companyModal.show();
                // }
                // else

                if (res.status == 200) {
                  localStorage.setItem("access_token", res.token);
                  localStorage.setItem("usertype", res.usertype);
                  localStorage.setItem('isFromSuperAdmin', '');

                  localStorage.setItem("authenticate", "YES");
                    this.commonService.getCurrentUserDetail();
                    this.commonService.getLoggedInName.pipe(take(1)).subscribe((userdetail: any) =>
                    {
                      //this.commonService.getUserModulePermissions().subscribe((m: any) => {
                      //  localStorage.removeItem('moduleList');
                      //  localStorage.setItem('moduleList', JSON.stringify(m));

                      //  window.location.href = "dashboard";
                      //});
                      //// console.log('userdetailuserdetail',userdetail);
                      // setTimeout(() =>
                      // {
                        this.moduleService.getRoleModuleList(false).pipe(take(1)).subscribe((m: any) => {
                        localStorage.removeItem('moduleList');
                        localStorage.setItem('moduleList', m);
                        //debugger
                        if ( res.usertype === 'usertypecontact') {
                          window.location.href = "dashboard?email=";
                        }else if ( res.usertype === 'usertypesuperadmin'){
                          //debugger
                          localStorage.removeItem('A_Email');
                          localStorage.setItem('A_Email',JSON.parse(localStorage.getItem('userinfo')).email);
                          window.location.href = "super-admin-dashboard";
                        }
                        else {
                          window.location.href = "dashboard";
                        }


                    //   });
                    // }, 1000);
                      });
                    });
                    //setTimeout(() => { this.loadSave = true; }, 2000);
                    // });
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
                  this.userService.IsAccountLocked(this.loginModel).pipe(take(1)).subscribe((res: any) =>
                  {
                    if (res)
                    {
                      this.leftAttempts = this.leftAttempts - 1;
                      this.loadSave = false;
                      this.toaster.error(res.token);
                      //this.toaster.error("Only " + this.leftAttempts + " attempts are remaining. After that your account will be locked.");
                    }
                  });
                  //this.toaster.error("Invalid username/password!");
                }
              //this.loadSave = false;
              }
            }, error => {
              //this.loadSave = false;
            });
      }
      else
      {
        this.commonService.validateAllFormFields(this.loginForm);
      }
  }

  showHidePassword(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  rememberMeChanged(e) {
    if (e.target.checked) {
      this.loginModel.rememberMe = true;
    }
    else {
      this.loginModel.rememberMe = false;
    }
  }

  closeComp()
  {
    this.companyModal.hide();
  }
  getRememberMeCredentials() {
    this.userService.GetCred().pipe(take(1)).subscribe((res: any) => {
      if (res) {
        if (res[0].rememberMe == true) {
          this.isChecked = true;
          this.loginModel.rememberMe = true;
          this.loginForm.patchValue({
            userName: res[0].userName,
            password: res[0].password
          });
        }
        else {
          this.isChecked = false;
          this.loginModel.rememberMe = false;
          this.loginForm.controls['userName'].setValue('');

        }
      }
    });


  }
  checkUserSession() {

    this.commonService.checkUserSession().subscribe(r => {

    })
  }

  forgotPassword() {
    this.router.navigateByUrl('/account/forgot-password');
  }
}
