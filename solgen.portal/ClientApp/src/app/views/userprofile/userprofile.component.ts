import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserprofileService, UserProfileModal } from './userProfile.service';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService, Master, ChangePasswordModel, UserDetails, ModuleList } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { Location } from '@angular/common';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput;;
  @ViewChild('changePassModal', { static: false }) public modal: ModalDirective;
  @ViewChild('closeButton', { static: false }) button: ElementRef;
  defTimeZone = 0;
  timFormat = 0;
  userModel: UserProfileModal = new UserProfileModal();
  fileName = 'Select File'; imageLink = ''; fileUrl = ''; userID = null;
  isUploadImageValid = true;
  selectedFiles: File[];
  passwordModel: ChangePasswordModel = new ChangePasswordModel();
  loadSave = false;
  _isDisabled: any;
  modulePermission: ModuleList;
  pageTitle: string;
  statesList: any;
  countryLists: any;
  lstTimeZone: any;
  lstTimeFormat: any;
  dealerCompanyUrl: any;
  IsDealer: boolean = false;
  fileTypesGroup: any;
  fileSize: number = 10;
  fileExtension: string = '';
  isSuperAdmin: any = ''
  customerProfile: boolean = false
  userTypeLogin: string;

  constructor(private fb: FormBuilder,
    private fbPassword: FormBuilder,
    private userService: UserprofileService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private http: HttpClient, private dialogService: ConfirmationDialogService, private location: Location) { 

      let user = this.commonService.TryJsonParse(localStorage.getItem('userinfo'));
      if (user) {
        this.userTypeLogin = user["userType"];
  
      }

    }

  userProfileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userType: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    //phone: ['', Validators.pattern("^[0-9]*$")],
    phone: [''],
    address: [''],
    city: ['', [Validators.required]],
    county: [null, [Validators.required]],
    state: [null, Validators.required],
    zipCode: [null, Validators.required],
    timeZoneId: [null, Validators.required],
    timeFormat: ['12', Validators.required],
    position: [null],
    empType: [null],
    isActive: [''],
    notes: [''],
    Id: [null],
    profilePic: [''],
    'file': '',
    'filename': null,
    hdnEmail: [''],
    //  emailNotification: [false, Validators.nullValidator],
  });
  get firstName() { return this.userProfileForm.get('firstName'); }
  get lastName() { return this.userProfileForm.get('lastName'); }
  get userType() { return this.userProfileForm.get('userType'); }
  get email() { return this.userProfileForm.get('email'); }
  get phone() { return this.userProfileForm.get('phone'); }
  get address() { return this.userProfileForm.get('address'); }
  get city() { return this.userProfileForm.get('city'); }
  get county() { return this.userProfileForm.get('county'); }
  get state() { return this.userProfileForm.get('state'); }
  get zipCode() { return this.userProfileForm.get('zipCode'); }

  get position() { return this.userProfileForm.get('position'); }
  get empType() { return this.userProfileForm.get('empType'); }
  get isActive() { return this.userProfileForm.get('isActive'); }
  get notes() { return this.userProfileForm.get('notes'); }
  get Id() { return this.userProfileForm.get('Id'); }
  get profilePic() { return this.userProfileForm.get('profilePic'); }
  get filename() { return this.userProfileForm.get('filename'); }
  get hdnEmail() { return this.userProfileForm.get('hdnEmail'); }
  get timeZoneId() { return this.userProfileForm.get('timeZoneId'); }
  get timeFormat() { return this.userProfileForm.get('timeFormat'); }
  //get emailNotification() { return this.userProfileForm.get('emailNotification'); }

  getConfigurationTypeFileExtensions() {
    this.commonService.getConfigurationTypeFileExtensions('My Profile').subscribe((result: any) => {
      ;
      if (result && result.FileTypesGroup != '') {
        this.fileSize = result.FileSize;
        this.fileTypesGroup = JSON.parse(result.FileTypesGroup);
        this.fileTypesGroup = this.fileTypesGroup.filter(x => x.Name == 'Image');
        this.fileTypesGroup.forEach((obj, index) => {
          if (obj.FileTypes) {
            let extension = obj.FileTypes.map(x => x.Name);
            this.fileExtension += (index > 0 && this.fileExtension != "") ? ", " : "";
            this.fileExtension += extension.join(", ");
          }
        });
      }
    });
  }

  private prepareFormDataForupdateUserProfile() {
    const input = new FormData();
    input.append('firstName', this.firstName.value);
    input.append('firstName', this.firstName.value);
    input.append('lastName', this.lastName.value);
    input.append('userType', this.userType.value);
    input.append('email', this.email.value);
    input.append('phoneNumber', this.phone.value);
    input.append('profilePic', this.profilePic.value);
    input.append('address', this.address.value);
    input.append('city', this.city.value);
    input.append('county', this.county.value);
    input.append('state', this.state.value);
    input.append('zipCode', this.zipCode.value);

    input.append('position', this.position.value);
    input.append('isActive', this.isActive.value);
    input.append('notes', this.notes.value);
    input.append('timeZoneId', this.timeZoneId.value);
    //input.append('emailNotification', this.emailNotification.value);
    input.append('timeFormat', this.timeFormat.value);
    input.append('Id', this.Id.value);

    if (this.commonService.isUploadImageValid) {
      if (this.filename.value !== null) {
        input.append('filename', this.filename.value);
      }
    }

    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {

      input.append('file', fileBrowser.files[0]);
    }

    return input;
  }

  fillForm() {
    this.userService.getUserProfile().subscribe((result: any) => {

      ;
      if (result) {
        if (result.profilePic) {
          let href = result.profilePic.split('ProfilePick/');
          if (href[1]) {
            href = href[1].split('.');
          }
          this.fileName = href[0];
        };
        if (result.userTypeName == 'usertypesuperadmin') {
          this.isSuperAdmin = true;
        }
        else {
          this.isSuperAdmin = false;
        }

        console.log('UserType',result.userTypeName)
        if (result.userTypeName == 'usertypecontact') {
          this.customerProfile = true;
          this.isDisabled(this.customerProfile)
        }
        //  console.log('myProfile:', result);

        this.loadSave = false;
        this.userProfileForm.patchValue({
          Id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          userType: result.userType,
          email: result.email,
          phone: result.phoneNumber,
          address: result.address,
          city: result.city,
          county:result.county == null ? null : parseInt(result.county),
          state: result.state,
          zipCode: result.zipCode,
          isActive: result.isActive,
          notes: result.notes,
          profilePic: result.profilePic,
          hdnEmail: result.email,
          timeZoneId: result.timezone == null ? this.defTimeZone : result.timezone,
          //  emailNotification: result.emailNotification,
          timeFormat: result.timeformat == null ? this.timFormat : result.timeformat
        });
        this.imageLink = result.profilePicLink;
        this.fileUrl = result.profilePic;
      }
    })
    // this.email.disable();
  }

   isDisabled(value: boolean) {
    if(value == true) {
      this.userProfileForm.controls['firstName'].disable();
      this.userProfileForm.controls['lastName'].disable();
      this.userProfileForm.controls['email'].disable();
      this.userProfileForm.controls['phone'].disable();
      this.userProfileForm.controls['address'].disable();
      this.userProfileForm.controls['city'].disable();
      this.userProfileForm.controls['county'].disable();
      this.userProfileForm.controls['state'].disable();
      this.userProfileForm.controls['zipCode'].disable();
      this.userProfileForm.controls['timeZoneId'].disable();
      this.userProfileForm.controls['timeFormat'].disable();
      this.userProfileForm.controls['profilePic'].disable();
      
      
     
    } else {
      this.userProfileForm.controls['firstName'].enable();
      this.userProfileForm.controls['lastName'].enable();
      this.userProfileForm.controls['email'].enable();
      this.userProfileForm.controls['phone'].enable();
      this.userProfileForm.controls['address'].enable();
      this.userProfileForm.controls['city'].enable();
      this.userProfileForm.controls['county'].enable();
      this.userProfileForm.controls['state'].enable();
      this.userProfileForm.controls['zipCode'].enable();
      this.userProfileForm.controls['timeZoneId'].enable();
      this.userProfileForm.controls['timeFormat'].enable();
      this.userProfileForm.controls['profilePic'].enable();
      
     }
   }

  ngOnInit() {
    this.getTimeFormatList();
    this.getConfigurationTypeFileExtensions();
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (typeof userdetail.id !== 'undefined' && userdetail.id != null)
        this.userID = userdetail.id;

      if (userdetail.userType == "usertypedealer") {
        this.IsDealer = true;
      }
      else { this.IsDealer = false; }

    });
    this.pageTitle = 'My Profile';
    this.fillForm();
    this.getState();
    this.getCountryDropdownList();
    this.getTimeZoneList();
    this.GetDealerDetail();

  }


  getTimeFormatList() {
    this.lstTimeFormat = this.commonService.getTimeFormatList();
    debugger;
    let format = this.lstTimeFormat.find(x => x.text == '12 Hours');
    this.timFormat = format != null ? format.value : 0;
  }
  getTimeZoneList() {
    this.commonService.getTimeZoneList().subscribe(resp => {
      debugger;
      console.log(resp);
      this.lstTimeZone = JSON.parse(resp);
      let zone = this.lstTimeZone.find(x => x.text == '(GMT-08:00) Pacific Time (US & Canada); Tijuana');
      this.defTimeZone = zone != null ? zone.value : 0;
      if(this.userProfileForm.get('timeZoneId').value=='' || this.userProfileForm.get('timeZoneId').value==null )
       this.userProfileForm.get('timeZoneId').setValue(zone.value);

    })
  }

  getCountryDropdownList() {
    this.userService.getCountryList().subscribe((result: any) => {

      this.countryLists = result;
      
    })
  }

  getState() {
    this.userService.getStateList().subscribe((result: any) => {
      var data = result;
      this.statesList = data;
    })
  }

  updateUserProfile() {
    let isUpdate = true;
    if (this.userProfileForm.valid) {
      if (this.userProfileForm.controls['email'].value != this.userProfileForm.value.hdnEmail) {
        this.dialogService.confirm('User profile', 'If you update your Email then you will be logged out automatically, Are you sure you want to update Email?').subscribe(confirmed => {
          if (confirmed) {
            this.update(2);
          }
          else {
            this.userProfileForm.patchValue({ email: this.userProfileForm.value.hdnEmail });
          }
        });
      }
      else {//same email
        this.update(1)
      }
    }
    else {
      this.commonService.validateAllFormFields(this.userProfileForm);
    }
  }

  Back() {
    this.router.navigateByUrl("/dashboard");
  }
  update(reload: any) {
    this.loadSave = true;
    this.userModel.Id = this.userProfileForm.value.Id;
    this.userModel.FirstName = this.userProfileForm.value.firstName;
    this.userModel.LastName = this.userProfileForm.value.lastName;
    this.userModel.PhoneNumber = this.userProfileForm.value.phone;
    this.userModel.Address = this.userProfileForm.value.address;
    this.userModel.isActive = this.userProfileForm.value.isActive == "" ? false : true;
    this.userModel.notes = this.userProfileForm.value.notes;
    this.userModel.profilePic = this.userProfileForm.value.profilePic;
    this.userModel.Email = this.userProfileForm.value.email;
    this.userModel.City = this.userProfileForm.value.city;
    this.userModel.County = this.userProfileForm.value.county;
    this.userModel.State = this.userProfileForm.value.state;
    this.userModel.ZipCode = this.userProfileForm.value.zipCode;
    this.userModel.timeZoneId = this.timeZoneId.value;
    this.userModel.timeFormat = this.timeFormat.value;
    if (this.fileUrl != null) {
      this.userModel.profilePic = this.fileUrl;
    }
    const formDataUserModel = this.prepareFormDataForupdateUserProfile();
    this.userService.updateUserProfile(formDataUserModel).subscribe((result: any) => {
      ;
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        if (reload == 1) {
          window.location.reload();
        }
        else if (reload == 2) {
          this.commonService.logoutFromMyPrifle();
        }
      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }
    }, err => {
      this.loadSave = false;
    }, () => {
      this.loadSave = false;
    });
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

  delImage(id: any, imgname: any) {
    const message = `Are you sure you want to delete Profile Image.?`;

    this.dialogService.confirm('Delete Image', message).subscribe(confirmed => {
      if (confirmed) {
        this.userService.delImage(id, imgname).subscribe(r => {
          if (r) {
            this.imageLink = "";
            this.fileName = 'Select File';
            this.fillForm();
            window.location.reload();
            this.toaster.success(`Image deleted successfully.`);
          }
          else {
            this.toaster.error(`Something went wrong please contact site administrator.`);
          }
        });
      }
    });
  }

  get file() {
    return this.userProfileForm.get('file');
  }


  setFile($event): void {
    ;
    if (this.isSuperAdmin == true) {
      this.commonService.validUploadDocumentType($event.target.files[0].name, '.png, .jpg, .jpeg,.gif');
      this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
      if (this.commonService.isFileValid && this.commonService.isFileExtensionValid) {
        this.fileName = $event.target.files[0].name;
      }
    }
    else {
      this.commonService.validUploadDocumentType($event.target.files[0].name, $event.target.accept);
      this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
      if (this.commonService.isFileValid && this.commonService.isFileExtensionValid) {
        this.fileName = $event.target.files[0].name;
      }
    }
  }

  GetDealerDetail() {
    this.userService.getDealerAccountDetail().subscribe((result: any) => {
      // console.log("return", result);
      if (result) {
        this.dealerCompanyUrl = result.companyUrl;
      }
    })
    // this.email.disable();
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




