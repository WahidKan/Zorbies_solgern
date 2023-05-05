import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoanapplicationserviceService, MenualNotificationModel } from '../../loanapplicationservice.service';
import { CommonService } from '../../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { EmailTemplateService } from '../../../emailtemplate/emailtemplate.service';

@Component({
  selector: 'app-notificationpopup',
  templateUrl: './notificationpopup.component.html',
  styleUrls: ['./notificationpopup.component.scss']
})
export class NotificationpopupComponent implements OnInit {
  @ViewChild('notificationPopup', { static: false }) notificationPopup: ModalDirective;
  appointments: any;
  addForm: FormGroup;
  objectname = 'loanApplication';
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  lstTemplate: any;
  lstTo: any;
  contactlist: any;
  loginUserName: any;
  tempid: any;
  templateName: any;
comment: any;
  lstCC: any
  loanId: any;
  touserName: any;
  ccuserName: any;
  loadSave = false;
  ckeConfig: any;
  menualNotificationModel: MenualNotificationModel = new MenualNotificationModel();
  submoduleid: any;
  constructor(private fb: FormBuilder, private LoanapplicationserviceService: LoanapplicationserviceService, private toaster: ToastrService,
    private commonService: CommonService, private emailTemplateService: EmailTemplateService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      // // console.log("LoginUsers", userdetail);
      this.loginUserName = userdetail.firstName + ' ' + userdetail.lastName

    });
  }

  ngOnInit() {
    this.GettemplatetDll();
    this.getcontactdll(this.loanId);
    this.initForm();
    this.getCCUserdll();
    this.fromName.setValue(this.loginUserName);
    this.fromName.disable();
  }

  show(loanId: any) {
    this.loanId = loanId;
    this.initForm();
    this.GettemplatetDll();
    this.getcontactdll(this.loanId);
    this.getCCUserdll();
    this.fromName.setValue(this.loginUserName);
    this.fromName.disable();
    this.notificationPopup.show();
  }
  close() {
    this.notificationPopup.hide();
  }
  GettemplatetDll() {
    this.LoanapplicationserviceService.GettemplatetDll(this.objectname).subscribe((result: any) => {
      // // console.log("result", result);
      this.lstTemplate = result;
    })
  }
  getcontactdll(loanId) {
    this.LoanapplicationserviceService.GetContactDll(this.loanId, this.submoduleid, this.objectname, this.loanId).subscribe((result: any) => {
      this.contactlist = result;
      // // console.log('contactlist', this.contactlist);
    })
  }
  getCCUserdll() {
    this.LoanapplicationserviceService.getCCUserdll(this.loanId, this.submoduleid, this.objectname).subscribe((result: any) => {
      this.lstCC = result;
      // // console.log('lstCC', this.contactlist);
    })
  }
  private initForm() {
    this.addForm = this.fb.group({
      templateId: [null],
      fromName: [null],
      toUser: [null, Validators.required],
      ccUser: [null],
      subjectBody: [null, Validators.required],
      subject: [null, Validators.required]
    })
  }

  get templateId() { return this.addForm.get('templateId'); }
  get fromName() { return this.addForm.get('fromName'); }
  get toUser() { return this.addForm.get('toUser'); }
  get ccUser() { return this.addForm.get('ccUser'); }
  get subject() { return this.addForm.get('subject'); }
  get subjectBody() { return this.addForm.get('subjectBody'); }

  onChangetemp($event: any): void {
  }

  onPaste($event: any): void {
  }

  gettemplatelist(event: any) {
    // // console.log('event', event);
    this.templateName = event.text;
    this.tempid = event.value;
    this.emailTemplateService.getEmailTemplateById(this.tempid).subscribe((result: any) => {
      // // console.log('tempaltedate', result)

      this.addForm.patchValue({
        subject: result.emailTemplateSubject,
        subjectBody: result.template
      })
    })
  }

  toUserGetData(event) {
    // console.log("eventss",event)
    this.touserName = event.name;
    // console.log("this.touserName", this.touserName);
    //this.toUser.setValue(event.value);
  }
  toUserGetDataCC(event) {
    // console.log("eventsscc", event)
    this.ccuserName = Array.prototype.map.call(event, function (item) { return item.name; }).join(",");
   
    // console.log("this.ccuserName", this.ccuserName);
    //this.toUser.setValue(event.value);
  }
  Save() {
    // console.log(this.addForm.value);
   
    if (this.addForm.valid) {
      this.loadSave = true;
      //this.menualNotificationModel.templateId = this.templateName;
      this.menualNotificationModel.templateId = this.tempid;
      this.menualNotificationModel.fromName = this.touserName;
      this.menualNotificationModel.toUser = this.addForm.value.toUser;
      this.menualNotificationModel.ccUser = this.addForm.value.ccUser == null ? '' : this.addForm.value.ccUser;
      this.menualNotificationModel.ccEmail = this.ccuserName;
      this.menualNotificationModel.toemail = this.touserName;
      this.menualNotificationModel.subject = this.addForm.value.subject;
      this.menualNotificationModel.subjectBody = this.addForm.value.subjectBody;
      this.menualNotificationModel.objectId = this.loanId;
      this.menualNotificationModel.objectName = this.objectname;
      this.LoanapplicationserviceService.SendManualNotification(this.menualNotificationModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addForm.reset();
          this.notificationPopup.hide();
          this.LoanapplicationserviceService.sub.next("done");
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
      this.commonService.validateAllFormFields(this.addForm);
    }
  }
}
