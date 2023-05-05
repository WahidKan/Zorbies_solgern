import { Component, OnInit } from '@angular/core';
import { EmailsettingsService, EmailSettings } from './emailsettings.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-emailsettings',
  templateUrl: './emailsettings.component.html',
  styles: []
})
export class EmailsettingsComponent implements OnInit {
  loadSave = false;
  modulePermission: ModuleList;
  addOrUpdatePermission: boolean;
  contentHeader: object;

  constructor(private emailSettingService: EmailsettingsService
    , private fb: FormBuilder
    , private toaster: ToastrService
    , private commonService: CommonService, private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.loadSave = true;
    this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
    this.getEmailSettings();
    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Email Settings',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/super-admin-dashboard'
          },
          {
            name: 'Email Settings',
            isLink: false
          }

        ]
    };
  }
  emailSettingForm = this.fb.group({
    emailSettingId: [null],
    smtpServer: ['', Validators.required],
    smtpUserName: ['', Validators.required],
    smtpPassword: ['', Validators.required],
    smtpPort: [''],
    fromEmailId: ['', [Validators.required, Validators.email]],
    isEnableSSL: [false]
  });

  getEmailSettings() {
    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.emailSettingService.getEmailSettings().subscribe((res: any) => {
      debugger;
      if (res) {
        this.loadSave = false;
        this.displayForm(res);
      }
      else {
        this.toaster.error("Something went wrong. Please contact site administrator.");
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }

  displayForm(emailSettingModel: EmailSettings) {
    debugger
    if (emailSettingModel) {
      this.emailSettingForm.patchValue({
        emailSettingId: emailSettingModel.emailSettingId,
        smtpServer: emailSettingModel.smtpServer,
        smtpUserName: emailSettingModel.smtpUserName,
        smtpPassword: emailSettingModel.smtpPassword,
        smtpPort: emailSettingModel.smtpPort,
        fromEmailId: emailSettingModel.fromEmailId,
        isEnableSSL:emailSettingModel.isEnableSSL,
      });
    }
  }

  saveEmailSetting() {
    if (this.emailSettingForm.valid) {
      this.loadSave = true;
      this.emailSettingService.saveEmailSettings(this.emailSettingForm.value).subscribe(
        res => {
          if (res) {
            this.toaster.success("Email Setting has been updated successfully.");
            this.getEmailSettings();
           this.loadSave = false;
          }
          else
            this.toaster.error("Something went wrong. Please contact site administrator.");
        },
        err => {
          this.toaster.error("Something went wrong. Please contact site administrator.");
          this.loadSave = false;
        }
      );
    }
    else {
      this.commonService.validateAllFormFields(this.emailSettingForm);
    }
  }
  get emailSettingId() { return this.emailSettingForm.get('emailSettingId'); }
  get smtpServer() { return this.emailSettingForm.get('smtpServer'); }
  get smtpUserName() { return this.emailSettingForm.get('smtpUserName'); }
  get smtpPassword() { return this.emailSettingForm.get('smtpPassword'); }
  get smtpPort() { return this.emailSettingForm.get('smtpPort'); }
  get fromEmailId() { return this.emailSettingForm.get('fromEmailId'); }
  get isEnableSSL() {return this.emailSettingForm.get('isEnableSSL');}
}
