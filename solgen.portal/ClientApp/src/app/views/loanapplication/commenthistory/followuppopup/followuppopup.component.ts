import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenualNotificationModel, LoanapplicationserviceService } from '../../loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';
import { EmailTemplateService } from '../../../emailtemplate/emailtemplate.service';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-followuppopup',
  templateUrl: './followuppopup.component.html',
  styleUrls: ['./followuppopup.component.scss']
})
export class FollowUpPopupComponent implements OnInit {
  @ViewChild('followuppopup', { static: false }) followuppopup: ModalDirective;
  appointments: any;
  addForm: FormGroup;
  objectname = 'loanApplication';
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  lstTemplate: any;
  lstTo: any;
  contactlist: any;
  loginUserName: any;
  tempid: any;
  lstCC: any
  loanId: any;
  commenthistoryId: any;
  comment: any;
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
    //this.getcontactdll();
    this.initForm();
    this.getCCUserdll();
    this.fromName.setValue(this.loginUserName);
    this.fromName.disable();
  }
  show(loanId: any, commentid: any) {
    setTimeout(() => {
      this.commenthistoryId = commentid;
      this.loanId = loanId;
      this.initForm();
      this.getcontactdll();
      this.GettemplatetDll();

      this.getCCUserdll();
      this.fromName.setValue(this.loginUserName);
      this.fromName.disable();
      this.followuppopup.show();
    }, 500);
    
  }
  close() {
    this.followuppopup.hide();
  }
  GettemplatetDll() {
    this.LoanapplicationserviceService.GettemplatetDll(this.objectname).subscribe((result: any) => {
      // console.log("lstTemplate", result);
      this.lstTemplate = result;
    })
  }
  getcontactdll() {
    this.LoanapplicationserviceService.GetFollowUpToList(this.loanId, this.commenthistoryId).subscribe((result: any) => {
      // console.log("contactlist", result);
      this.contactlist = result;
      this.comment = result[0].text;
      
      // console.log("comment", this.comment);
      this.addForm.patchValue({
        toUser: result[0].value,
      })

      
    })
  }
  getCCUserdll() {
    this.LoanapplicationserviceService.getCCUserdll(this.loanId, this.submoduleid, this.objectname).subscribe((result: any) => {
      this.lstCC = result;
      // console.log('',)
    })
  }

  private initForm() {
    this.addForm = this.fb.group({
      templateId: [null],
      fromName: [null],
      toUser: [null, Validators.required],
      ccUser: [null, Validators.nullValidator],
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
    this.tempid = event.value;
    this.emailTemplateService.getEmailTemplateById(this.tempid).subscribe((result: any) => {
       // console.log('tempaltedate', result)

      this.addForm.patchValue({
        subject: result.emailTemplateSubject,
        subjectBody: this.comment
      })
    })
  }

  Save() {
    if (this.addForm.valid) {
      this.loadSave = true;
      this.menualNotificationModel.templateId = this.addForm.value.templateId;
      this.menualNotificationModel.fromName = this.loginUserName;
      this.menualNotificationModel.toemail = this.comment;
      this.menualNotificationModel.toUser = this.addForm.value.toUser;
      this.menualNotificationModel.ccUser = this.addForm.value.ccUser;
      this.menualNotificationModel.subject = this.addForm.value.subject;
      this.menualNotificationModel.subjectBody = this.addForm.value.subjectBody;
      this.menualNotificationModel.objectId = this.loanId;
     
      this.LoanapplicationserviceService.SendManualNotification(this.menualNotificationModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addForm.reset();
          this.followuppopup.hide();
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
