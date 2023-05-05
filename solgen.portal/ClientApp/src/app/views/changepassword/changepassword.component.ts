import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService, ChangePasswordModel } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { EqualValidator } from '../shared/custom-validation/equal-validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  @ViewChild('closeButton', { static: false }) button: ElementRef;
  result = null;
  tmp = [];
  token: any;
  passwordModel: ChangePasswordModel = new ChangePasswordModel();
  userId: any;
  loadSave = false;
  customerProfile: boolean = false
  constructor(private userService: UserService
    , private router: Router
    , private fbPassword: FormBuilder
    , private commonService: CommonService
    , private toaster: ToastrService) { }



  ngOnInit() {
    const userid = this.findGetParameter("userId");
    this.token = this.findGetParameter("token");
    if (userid) {
      this.userService.confirmEmail(userid, this.token).subscribe((res: any) => {
        if (res.statusCode == 500) {
          this.router.navigateByUrl('/common/unauthorized');
        }
        else {
          this.userId = res.result;
        }
      });
    }

    this.userService.getUserProfile().subscribe((result: any) => {  
        if (result.userTypeName == 'usertypecontact') {
          this.customerProfile = true;       
        }  
    })
  }

  //------------------------------- Change Password
  changePasswordForm = this.fbPassword.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
    {
      validator: PasswordMatch('newPassword', 'confirmPassword')
    }
  );
  get currentPassword() { return this.changePasswordForm.get('currentPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }
  changePassword() {
    if (this.changePasswordForm.valid) {
      this.passwordModel.currentPassword = this.changePasswordForm.value.currentPassword;
      this.passwordModel.password = this.changePasswordForm.value.newPassword;
      this.passwordModel.confirmPassword = this.changePasswordForm.value.confirmPassword;

      this.commonService.ChangePassword(this.passwordModel).subscribe((response: any) => {
        if (response.statusCode == 200) {
          this.toaster.success(response.responseMessage);
          this.changePasswordForm.reset();
          let btn = this.button.nativeElement;

          btn.click();
          this.commonService.logout();
        }
        else {
          this.toaster.error(response.responseMessage);
        }

      });
    }
    else {
      this.commonService.validateAllFormFields(this.changePasswordForm);
    }
  }

  //---------------------------------------------------------
  //---------------------------------------------------------
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
}
function PasswordMatch(pwd: string, cpwd: string) {
  return (frm: FormGroup) => {
    let pword = frm.controls[pwd];
    let cpword = frm.controls[cpwd];

    if (pword.value !== cpword.value) {
      cpword.setErrors({ notmatch: true });
    }
    else {
      cpword.setErrors(null);
    }
  }
}
