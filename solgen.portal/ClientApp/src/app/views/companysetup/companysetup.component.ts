import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModuleList, CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanysetupserviceService, CompanySetUpModel } from './companysetupservice.service';
import { retry } from 'rxjs/operators';
import { emailModel } from '../lead/leadlist.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageUserService } from '../manageuser/addedituser.service';
@Component({
  selector: 'app-companysetup',
  templateUrl: './companysetup.component.html',
  styleUrls: ['./companysetup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanysetupComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput;;
  @ViewChild('fileInputemail', { static: false }) fileInputemail;
  @ViewChild('changePassModal', { static: false }) changePassModal: ModalDirective;
  companySetUpModel: CompanySetUpModel = new CompanySetUpModel();

  states: any;
  emailmodel: emailModel = new emailModel();
  loadSave = false;
  companysetupForm: FormGroup;
  addOrUpdatePermission: boolean;
  pageTitle: string;
  lstStatus: any;
  status: string;
  associateUser: string;
  lstCompantType: any;
  lstSignerType: any;
  fileName = "Select";
  fileNameemail = "Select";
  imageLink = '';
  imageLinkemail = '';
  editCompanyType: any;
  editSignerType: any;
  lstStates: any;
  emailSubject: any;
  //modulePermission: ModuleList;
  closeTestMailPopup: boolean = true;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  modulePermission: any[] = [];
  countryLists: any[] = [];
  fileTypesGroup: any;
  fileSize: number = 5;
  fileExtension: string = '';
  // private sub: Subscription;
  PrimarySigner: any;
  contentHeader: object;
  isSolar: any;
  constructor(private fb: FormBuilder, private fbsentEmail: FormBuilder,
    private companysetupserviceService: CompanysetupserviceService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private userService: ManageUserService
  ) {
    //this.commonService.getMasterItemsList("status").subscribe((result: any) => {
    //  this.lstStatus = this.commonService.masters;
    //})
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);





    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'COMPANYSETUPUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    this.commonService.getMasterItemsList("CompanyType").subscribe((result: any) => {
      this.lstCompantType = this.commonService.masters;
    })

  }

  ngOnInit() {
    this.addOrUpdatePermission = this.isUpdate;
    this.loadSave = true;
    this.getConfigurationTypeFileExtensions();
    this.initForm();
    this.pageTitle = 'Company Setup';
    this.getState();
    this.getSignterType();
    this.fillForm();
    this.initBreadCrumb();
    this.getCountryDropdownList();
  }

  getCountryDropdownList() {
    ;
    this.userService.GetCountryListIso().subscribe((result: any) => {
      this.countryLists = result;
      debugger;
      // this.countryCode = result.CountryCode;
      //console.log("countryList", this.countryLists);
      //this.loadStateDropdown(this.countryCode);
    })
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Company Setup',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  getSignterType() {
    this.commonService.getMasterItemsList("SignerType").subscribe((result: any) => {
      this.lstSignerType = this.commonService.masters;
      // console.log('test', this.lstSignerType);
    })
  }
  getConfigurationTypeFileExtensions() {
    this.commonService.getConfigurationTypeFileExtensions('Company Setup').subscribe((result: any) => {

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

  Cancel() {

  }
  getState() {
    this.companysetupserviceService.getStateList().subscribe((result: any) => {
      this.lstStates = result;
    })
  }
  getCompanyType() {
    this.commonService.getMasterItemsList("solgen_usertype").subscribe((result: any) => {

      this.lstCompantType = this.commonService.masters;
    })

  }



  AddEditCompanySetup() {
    debugger
    console.log(this.companysetupForm);
    if (this.companysetupForm.valid) {
      this.loadSave = true;
      const companySetupModel = this.prepareFormDataForDocument();
      this.companysetupserviceService.addOrUpdateCompanySetup(companySetupModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.fileInput.nativeElement.files;
          this.fileInput.nativeElement.value = "";
          this.fileInputemail.nativeElement.value = "";
          //this.router.navigateByUrl("/dashboard");
          window.location.href = "/companysetup";
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.companysetupForm);
    }

  }


  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('companyId', this.companyId.value);
    input.append('companyName', this.companyName.value);
    input.append('companyType', this.companyType.value == '' ? this.editCompanyType : this.companyType.value);
    input.append('signerType', this.signerType.value == null ? '' : this.signerType.value);
    input.append('phone', this.phone.value);
    input.append('industryType', this.industryType.value);
    input.append('companyLogo', this.companyLogo.value);
    input.append('emailTemplateLogo', this.emailTemplateLogo.value);
    input.append('referenceInterval', this.referenceInterval.value);
    input.append('autoSaveInterval', this.autoSaveInterval.value);
    input.append('city', this.city.value);
    input.append('country', this.country.value);
    input.append('zipCode', this.zipCode.value);
    input.append('state', this.state.value);
    input.append('addressLineOne', this.addressLineOne.value);
    input.append('addressLineTwo', this.addressLineTwo.value);
    input.append('smtpHost', this.smtpHost.value);
    input.append('smtpUsername', this.smtpUsername.value);
    input.append('smtpPort', this.smtpPort.value);
    input.append('fromEmail', this.fromEmail.value);
    input.append('smtpPassword', this.smtpPassword.value);
    input.append('documentType', this.documentType.value);
    input.append('IsTLS', this.IsTLS.value);
    input.append('IsEnableSSL', this.IsEnableSSL.value);

    if (this.commonService.isUploadImageValid) {
      if (this.companyLogo.value !== null) {
        input.append('filename', this.companyLogo.value);

      }
      if (this.emailTemplateLogo.value !== null) {
        input.append('filenameemail', this.emailTemplateLogo.value);
      }

    }


    const fileBrowser = this.fileInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    const fileBrowseremail = this.fileInputemail.nativeElement;

    if (fileBrowseremail.files && fileBrowseremail.files[0]) {
      input.append('fileemail', fileBrowseremail.files[0]);
    }
    return input;
  }
  fillForm() {
    debugger
    this.addOrUpdatePermission = this.isUpdate;
    this.companysetupserviceService.getcompanySetupDetail().subscribe((result: any) => {

      debugger
      if (result) {
        if (result.emailTemplateLogo) {
          let href = result.emailTemplateLogo.split('templateLogo/');
          if (href.length > 1) {
            href = href[1].split('_');
            this.fileNameemail = href[0];
          }
        }

        if (result.companyLogo) {
          let href = result.companyLogo.split('companyLogo/');
          href = href[1].split('_');
          this.fileName = href[0];
        }
        this.loadSave = false;
        this.pageTitle = 'Company SetUp ';
        if (result.companyType != null) {
          this.companyType.disable();

        }
        this.testEmailForm.patchValue({
          smtpHosttest: result.smtpHost,
          smtpPorttest: result.smtPport,
          smtpUN: result.smtPusername,
          fromEmailtest: result.fromEmail
        })
        this.companysetupForm.patchValue({
          companyId: result.companyId,
          companyName: result.companyName,
          companyType: result.companyType,
          industryType: result.industryType,
          signerType: result.signerType,
          phone: result.phone,
          companyLogo: result.companyLogo,
          emailTemplateLogo: result.emailTemplateLogo,
          referenceInterval: result.referenceInterval,
          autoSaveInterval: result.autoSaveInterval,
          city: result.city,
          country: result.country3,
          zipCode: result.zipCode,
          state: parseInt(result.state),
          addressLineOne: result.addressLineOne,
          addressLineTwo: result.addressLineTwo,
          smtpHost: result.smtpHost,
          smtpUsername: result.smtPusername,
          smtpPort: result.smtPport,
          fromEmail: result.fromEmail,
          smtpPassword: result.smtPpassword,
          documentType: result.documentType,
          IsTLS: result.isTLS,
          IsEnableSSL: result.isEnableSSL
        });

        this.imageLink = result.companyLogo;
        this.imageLinkemail = result.emailTemplateLogo;
        this.editCompanyType = result.companyType;
        this.editSignerType = result.signerType;
        this.PrimarySigner = result.signerBy;
        if (result.companyType = this.lstCompantType.filter(x => x.text == "CRM package")[0].value) {
          this.isSolar = true;
          this.companysetupForm.get('signerType').clearValidators();
          this.companysetupForm.get('signerType').updateValueAndValidity();
        }
        // this.industryType.disable();
      }


    },

      (error: any) => {
        this.loadSave = false;
      })




  }

  private initForm() {
    this.companysetupForm = this.fb.group({
      companyId: [''],
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      companyType: [null, [Validators.required, Validators.maxLength(100)]],
      signerType: [null, Validators.required],
      industryType: [null, [Validators.maxLength(100)]],
      phone: ['', Validators.required],
      companyLogo: ['', Validators.required],
      emailTemplateLogo: [''],
      /// referenceInterval: ['', [Validators.required, Validators.min(5),]],
      referenceInterval: [''],
      autoSaveInterval: [2, [Validators.required, Validators.min(2)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.maxLength(5)]],
      state: [null, [Validators.required, Validators.maxLength(100)]],
      addressLineOne: ['', [Validators.required, Validators.maxLength(500)]],
      addressLineTwo: [''],
      smtpHost: ['', Validators.required],
      smtpPassword: ['', Validators.required],
      smtpUsername: ['', Validators.required],
      smtpPort: ['', Validators.required],
      fromEmail: ['', [Validators.required, Validators.email]],
      documentType: [''],
      IsTLS: [true],
      IsEnableSSL: [true]
    });
  }

  setFile($event): void {
    this.commonService.validUploadDocumentType($event.target.files[0].name, $event.target.accept);
    this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
    //  this.commonService.uploadImageFileValidator($event);
    // this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      this.companyLogo.setValue($event.target.files[0].name);
    }
  }
  setFileemail($event): void {
    this.commonService.validUploadDocumentType($event.target.files[0].name, $event.target.accept);
    this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
    // this.commonService.uploadImageFileValidator($event);
    // this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
    if (this.commonService.isFileValid) {
      this.fileNameemail = $event.target.files[0].name;
      this.emailTemplateLogo.setValue($event.target.files[0].name);
    }
  }
  get companyId() { return this.companysetupForm.get('companyId'); }
  get companyName() { return this.companysetupForm.get('companyName'); }
  get companyType() { return this.companysetupForm.get('companyType'); }
  get industryType() { return this.companysetupForm.get('industryType'); }
  get signerType() { return this.companysetupForm.get('signerType'); }
  get phone() { return this.companysetupForm.get('phone'); }
  get companyLogo() { return this.companysetupForm.get('companyLogo'); }
  get emailTemplateLogo() { return this.companysetupForm.get('emailTemplateLogo'); }
  get referenceInterval() { return this.companysetupForm.get('referenceInterval'); }
  get autoSaveInterval() { return this.companysetupForm.get('autoSaveInterval'); }
  get city() { return this.companysetupForm.get('city'); }
  get country() { return this.companysetupForm.get('country'); }
  get state() { return this.companysetupForm.get('state'); }
  get zipCode() { return this.companysetupForm.get('zipCode'); }
  get addressLineOne() { return this.companysetupForm.get('addressLineOne'); }
  get addressLineTwo() { return this.companysetupForm.get('addressLineTwo'); }
  get smtpHost() { return this.companysetupForm.get('smtpHost'); }
  get smtpUsername() { return this.companysetupForm.get('smtpUsername'); }

  get smtpPassword() { return this.companysetupForm.get('smtpPassword'); }
  get smtpPort() { return this.companysetupForm.get('smtpPort'); }
  get fromEmail() { return this.companysetupForm.get('fromEmail'); }
  get documentType() { return this.companysetupForm.get('documentType'); }
  get IsTLS() { return this.companysetupForm.get('IsTLS'); }
  get IsEnableSSL() { return this.companysetupForm.get('IsEnableSSL'); }


  testEmailForm = this.fbsentEmail.group({
    emailTo: ['', [Validators.required, Validators.email]],
    messageText: ['', [Validators.required]],
    smtpHosttest: [''],
    smtpPorttest: [''],
    smtpUN: [''],
    fromEmailtest: ['']


  }
  );
  get emailTo() { return this.testEmailForm.get('emailTo'); }
  get messageText() { return this.testEmailForm.get('messageText'); }
  get smtpHosttest() { return this.testEmailForm.get('smtpHosttest'); }
  get smtpPorttest() { return this.testEmailForm.get('smtpPorttest'); }
  get smtpUN() { return this.testEmailForm.get('smtpUN'); }
  get fromEmailtest() { return this.testEmailForm.get('fromEmailtest'); }


  sendEmail() {
    this.emailSubject = 'Testing Email';
    this.loadSave = true;
    if (this.testEmailForm.valid) {
      let model = {
        ToEmail: this.emailTo.value,
        Subject: this.emailSubject,
        Message: this.messageText.value,
        FromEmail: this.fromEmail.value,
        SmtpHost: this.smtpHost.value,
        SmtpPort: this.smtpPort.value,
        Username: this.smtpUsername.value,
        Password: this.smtpPassword.value,
        IsEnableSSL: this.IsEnableSSL.value

      };
      this.companysetupserviceService.SendEmail(model).subscribe((result: any) => {
        if (result.statusCode == 200) {
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
          }, 1000);
          this.testEmailForm.reset();
          this.changePassModal.hide();
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
          this.testEmailForm.reset();
          this.changePassModal.hide();
        }
      }, error => {
        this.loadSave = false;
      });
    }

    else {
      this.commonService.validateAllFormFields(this.testEmailForm);
    }
  }
  closepopup() {
    this.changePassModal.hide();
    this.testEmailForm.reset();
  }
  checktestemail() {
    this.changePassModal.show();
  }

  dropdownChange(e) {
    this.PrimarySigner = e.text;
  }
}
