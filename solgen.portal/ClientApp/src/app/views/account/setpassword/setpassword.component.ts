import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, SetPassword, SetCompanyMapping } from '../../shared/user.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService, UserDetails } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { EqualValidator } from '../../shared/custom-validation/equal-validator';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styles: []
})
export class SetpasswordComponent implements OnInit {
  LoginUser: UserDetails = new UserDetails();
  result = null;
  tmp = [];
  token: any;
  siteURL: string = "";
  url: string = "";
  urldata: any;
  checkCount:number=0;
  siteimage: string;
  sitetitle: string = '';
  setPasswordModel: SetPassword = new SetPassword();
  setCompanyMapingModel: SetCompanyMapping = new SetCompanyMapping();
  userId: any;
  loadSave = false;
  isTextFieldType:Boolean=false;
  isTextFieldType1:Boolean=false;
  constructor(private userService: UserService
    , private router: Router
    , private fb: FormBuilder, private titleService: Title 
    , private commonService: CommonService
    , private toaster: ToastrService) {  }
  
  setPasswordForm = this.fb.group({
    password: ['',[Validators.required,Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required,Validators.minLength(6)]]
  },
    {
      validator: EqualValidator.matchingPasswords('password', 'confirmPassword')
    });

  ngOnInit() {
   // alert("test");
    ;
    const userid = this.findGetParameter("userId");
    this.token = this.findGetParameter("token");
    
    if (userid) {
      this.getCompanyCount(userid);
      this.userService.confirmEmail(userid, this.token).subscribe((res: any) => {
        ;
        if (res.statusCode == 500) {
          this.router.navigateByUrl('/common/unauthorized');
        }
        else {
          this.userId = res.result;
         
        }
      });
    }
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

  togglemyPasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }
  togglemyPasswordFieldType1(){
    this.isTextFieldType1 = !this.isTextFieldType1;
  }
  setTitle(newTitle: string) {

    this.titleService.setTitle(newTitle);
  }
  get password() { return this.setPasswordForm.get('password'); }
  get confirmPassword() { return this.setPasswordForm.get('confirmPassword'); }

  setPassword() {
    this.loadSave = true;
    if (this.setPasswordForm.valid) {
      this.setPasswordModel.password = this.setPasswordForm.value.password;
      this.setPasswordModel.confirmPassword = this.setPasswordForm.value.confirmPassword;
      this.setPasswordModel.userId = this.userId;
      this.setPasswordModel.token = this.token;
      this.userService.setPassword(this.setPasswordModel).subscribe((res: any) => {
        if (res.statusCode === 200) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("usertype");
          localStorage.removeItem("moduleList");
          localStorage.removeItem("userinfo");
          this.LoginUser = new UserDetails();
          this.toaster.success("Your account password has been set successfully. Please login.");
          this.router.navigateByUrl('/account');
          this.loadSave = false;
        }
        else { 
          this.toaster.error(res.responseMessage);
          this.loadSave = false;
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.setPasswordForm);
      this.loadSave = false;
    }
  }
getCompanyCount(usrid)
{
  ;
  this.userService.checkAcceptance(usrid).subscribe((result: any) => {
     //alert(result);
    // console.log('dataa', result);
    this.checkCount=Number(result);
    //this.checkCount=5;
   // alert((result));

   

  });
}
SaveCompanyMaping(e)
{
// alert(e);

this.loadSave = true;
  this.setCompanyMapingModel.userId = this.userId;
  this.setCompanyMapingModel.CompanyMappingStatusId = e;
  this.userService.setCompanyMaping(this.setCompanyMapingModel).subscribe((res: any) => {
    if (res.statusCode === 200) {
      ;
      this.toaster.success("Your account Status has been set successfully. Please login.");
      this.router.navigateByUrl('/account');
      this.loadSave = false;
    }
    else { 
      this.toaster.error(res.responseMessage);
      this.loadSave = false;
    }
  });

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
}
