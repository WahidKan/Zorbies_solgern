import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, EmailValidator } from '@angular/forms';
import { UserService, ForgotPassword } from '../../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ForgotPswForm: FormGroup;
  loadSave = false;
  siteimage: string;
  url: string = "";
  urldata: any;
  sitetitle: string = '';
  siteURL: string = "";
  siteCompanyURL: string = "";
  siteCompanyID:number=0;
  forgotPswModel: ForgotPassword = new ForgotPassword();
  constructor(private fb: FormBuilder
    , private userService: UserService
    , private router: Router
    , private toaster: ToastrService
    , private commonService: CommonService, private titleService: Title) { }

  ngOnInit() {
    this.ForgotPswForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
    });

    this.url = window.location.href;


    this.url = this.url.slice(9, 19);
    //---setting Logo on basis of URL

    this.userService.GetSiteURl(this.url).subscribe((result: any) => {

      // console.log('dataa', result);
      this.urldata = JSON.parse(result);

      if (result != null) {
        this.siteimage = this.urldata[0].SiteLoginLogo;
        this.sitetitle = this.urldata[0].SiteTitle;
        this.siteCompanyURL = this.urldata[0].SiteUrl;
        this.siteCompanyID = this.urldata[0].CompanyId;
        
        this.setTitle(this.sitetitle);
      }
      else {
        this.sitetitle = 'SolgenOne'
        this.setTitle(this.sitetitle);
        this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
      }
    });

    if (this.router.url.indexOf('app.loanhomi') > 0) {
      this.siteURL = "loanhomi";
    }
    else if (this.router.url.indexOf('app.solgenone') > 0) {
      this.siteURL = "solgenone";
    }
    else if (this.router.url.indexOf('solgen.zorbis') > 0) {
      this.siteURL = "solgenone";
    }
  }


  setTitle(newTitle: string) {

    this.titleService.setTitle(newTitle);
  }

  SendForgotPasswordMail() {
    if (this.ForgotPswForm.valid) {
      this.loadSave = true;
      this.forgotPswModel.email = this.ForgotPswForm.value.email;
      this.forgotPswModel.siteTitle = this.sitetitle;
      this.forgotPswModel.siteImg = this.siteimage
      this.forgotPswModel.siteCompanyURL = this.siteCompanyURL
      this.forgotPswModel.siteCompanyID = this.siteCompanyID
      this.userService.ForgotPsw(this.forgotPswModel).subscribe((res: any) => {
        if (res) {
          if (res.statusCode == 200) {
            this.toaster.success(res.responseMessage);
            this.router.navigateByUrl('/account');
            setTimeout(() => { this.loadSave = false; }, 3000);
          }
          else {
            this.loadSave = false;
            this.toaster.error(res.responseMessage);
          }
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.ForgotPswForm);
    }
  }
  Back() {
    this.router.navigateByUrl("/account");
  }
  get email() {
    return this.ForgotPswForm.get('email');
  }
  get emailp() { return this.ForgotPswForm.get('emailp'); }
}
