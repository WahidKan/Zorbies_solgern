import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ModulesService } from '../views/managemodules/modules.service';
import { CommonService, UserDetails } from '../views/shared/common.service';
import { Login, UserService } from '../views/shared/user.service';

@Component({
  selector: 'app-mobile-app-login',
  templateUrl: './mobile-app-login.component.html',
  styleUrls: ['./mobile-app-login.component.scss']
})
export class MobileAppLoginComponent implements OnInit {
  Browser: string;
  OS: string;
  BrowserVersion: string;
  OSVersion: string;
  CompanyIdval: string;

  constructor(private commonService: CommonService, 
    private userService: UserService,  private router: Router,  private activeRoute: ActivatedRoute,
    private moduleService: ModulesService,
    @Inject(DOCUMENT) private document: any,
    private toaster: ToastrService,) { }

    loginModel: Login = new Login();
    loadSave: boolean = true;
    
  ngOnInit() {
    //debugger
   
    this.activeRoute.queryParamMap.subscribe((params: any) => {
      this.loadSave = true;
      this.commonService.LoginUser = new UserDetails();
      this.loginModel.userName = params.params.email;
      this.loginModel.browser = this.Browser + " " + this.BrowserVersion;
      this.loginModel.os = this.OS + " " + this.OSVersion;
      this.loginModel.CompanyId = this.CompanyIdval;
      this.customerLogin();
    });
  }

  customerLogin(){
    this.userService.loginWithEmail(this.loginModel).subscribe((res: any)=>{
      if(res){
        localStorage.removeItem("access_token");
        localStorage.removeItem("usertype");
        localStorage.removeItem("moduleList");
        localStorage.removeItem("userinfo");
       if (res.status == 200) {
         localStorage.setItem("access_token", res.token);
         localStorage.setItem("usertype", res.usertype);
         localStorage.setItem("authenticate", "YES");
         this.commonService.getCurrentUserDetail();
           this.commonService.getLoggedInName.pipe(take(1)).subscribe((userdetail: any) =>
           {
            this.moduleService.getRoleModuleList(false).pipe(take(1)).subscribe((m: any) => {
              localStorage.setItem('moduleList', m);
            window.location.href = 'dashboard' ;
            });
           });

       }
       else if (res.status == 204) {
         window.location.href = "account/multipleuserlogin?UserId=" + res.userId;
       }
       else if (res.status == 404) {
         this.loadSave = false;
         this.toaster.error(res.token);

         this.commonService.GetServiceGetFileList("logout").subscribe(m => { });
        localStorage.removeItem("access_token");
        localStorage.removeItem("usertype");
        localStorage.removeItem("moduleList");
        localStorage.removeItem("userinfo");

        this.commonService.LoginUser = new UserDetails();
        this.router.navigateByUrl("/account");
        this.commonService.removeUserConnections().subscribe(m => { });
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

}
