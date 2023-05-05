import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResetPassword, UserService } from '../../../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EqualValidator } from '../../../shared/custom-validation/equal-validator';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent implements OnInit {
  @ViewChild('ResetPassword', { static: false }) modalResetPassword: ModalDirective;
  loadSave: boolean = false;
  isTextFieldType:Boolean=false;
  isTextFieldType1:Boolean=false;
  resetPasswordModel: ResetPassword = new ResetPassword();
  resetPasswordForm: FormGroup;
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private commonService: CommonService,) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required,Validators,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6)]]
    },
      {
        validator: EqualValidator.ConfirmedValidator('password', 'confirmPassword')
      });
  }

  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }
  close() {
    this.modalResetPassword.hide();
    this.resetPasswordForm.reset();
    this.isTextFieldType=false;
    this.isTextFieldType1=false;
  }
 show(resetModel:any){
   this.modalResetPassword.show();
   this.resetPasswordModel=resetModel;
 } 
 togglemyPasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }
  togglemyPasswordFieldType1(){
    this.isTextFieldType1 = !this.isTextFieldType1;
  }
  submit() {
    ;
    if(this.resetPasswordForm.valid)
    {
      this.loadSave = true;
    this.resetPasswordModel.password=this.password.value;
    this.resetPasswordModel.confirmPassword=this.confirmPassword.value;
    this.userService.resetPassword(this.resetPasswordModel).subscribe((res: any) => {
      if (res) {
        if (res.statusCode == 200) {
          ;
          this.toaster.success(res.responseMessage);
          this.loadSave = false;
          this.close();
        }
        else {
          this.toaster.error(res.responseMessage);
          this.loadSave = false;
        }
      }
    });
  }
  else 
  {
    this.commonService.validateAllFormFields(this.resetPasswordForm);
  }
  }
}
