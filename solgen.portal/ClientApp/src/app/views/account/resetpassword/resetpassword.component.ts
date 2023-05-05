import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, ResetPassword } from '../../shared/user.service';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { EqualValidator } from '../../shared/custom-validation/equal-validator';
import { Title } from '@angular/platform-browser';
//import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
})
export class ResetpasswordComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  resetPasswordForm: FormGroup;
  resetPasswordModel: ResetPassword = new ResetPassword();
  userId: any;
  resetToken: any;
  result = null;
  tmp = [];
  loadSave = false;
  siteURL: string = "";
  url: string = "";
  urldata: any;
  siteimage: string;
  sitetitle: string = '';
  constructor(private route: ActivatedRoute
    , private userService: UserService
    , private router: Router, private titleService: Title
    , private fb: FormBuilder
    , private commonService: CommonService
    , private toaster: ToastrService) {

  }
  pageTitle = 'SET PASSWORD';
  ngOnInit() {
    if (this.router.url.includes('resetpassword'))
      this.pageTitle = 'RESET PASSWORD';

    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: EqualValidator.ConfirmedValidator('password', 'confirmPassword'),
        //validator: EqualValidator.matchingPasswords('password', 'confirmPassword')
      });
    this.userId = this.findGetParameter("userId");
    this.resetToken = this.findGetParameter("token");
    this.url = window.location.href;

    // console.log('this.urlbefore', this.url)
    this.url = this.url.slice(9, 19);
    //---setting Logo on basis of URL
    // console.log('this.urlafter', this.url)
    this.userService.GetSiteURl(this.url).subscribe((result: any) => {

      // console.log('dataa', result);
      this.urldata = JSON.parse(result);

      if (result != null) {
        this.siteimage = this.urldata[0].SiteLoginLogo;

        this.sitetitle = this.urldata[0].SiteTitle;

        this.setTitle(this.sitetitle);
      }
      else {
        this.sitetitle = 'SolgenOne'
        this.setTitle(this.sitetitle);
        this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
      }

    })

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

  }
  setTitle(newTitle: string) {

    this.titleService.setTitle(newTitle);
  }

  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  resetPassword() {
    this.loadSave = true;
    if (this.resetPasswordForm.valid) {
      this.resetPasswordModel.password = this.resetPasswordForm.value.password;
      this.resetPasswordModel.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordModel.userId = this.userId;
      this.resetPasswordModel.resetToken = this.resetToken;
      this.userService.resetPassword(this.resetPasswordModel).subscribe((res: any) => {
        if (res) {
          if (res.statusCode == 200) {
            this.toaster.success("Your password has been reset successfully.");
            this.resetPasswordForm.reset();
            this.router.navigateByUrl('/account');
            this.loadSave = false;
          }
          else {
            this.toaster.error(res.responseMessage);
            this.loadSave = false;
          }
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.resetPasswordForm);
      this.loadSave = false;
    }
  }

  findGetParameter(parameterName) {
    this.result = null,
      this.tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
      this.tmp = items[index].split("=");
      if (this.tmp[0] === parameterName) this.result = decodeURIComponent(this.tmp[1]);
    }
    return this.result;
  }
  change() {
    if (this.resetPasswordForm.dirty && this.resetPasswordForm.valid) {
      this.onChange.emit(this.password.value);
    } else {
      this.onChange.emit(null);
    }
  }

}
