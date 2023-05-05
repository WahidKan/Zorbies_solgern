import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanapplicationserviceService } from '../../loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sendmailpopup',
  templateUrl: './sendmailpopup.component.html',
  styleUrls: ['./sendmailpopup.component.scss']
})
export class SendmailpopupComponent implements OnInit {

  addForm: FormGroup;
  loanId: any;
  historyObject: any;
  loadSave: boolean = false;
  ckeConfig: any;

  @ViewChild('SendMailModelPoppup', { static: false }) SendMailModelPoppup: ModalDirective;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;

  @Output() sendEmailEmit = new EventEmitter();

  constructor(private fb: FormBuilder, private loanApplicationService: LoanapplicationserviceService, private toaster: ToastrService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      toEmailAddress: [null],
      emailSubject: [null],
      content: [null, Validators.required]
    });
  }

  show(loanId: any, historyObject: any) {
    this.loanId = loanId;
    this.historyObject = historyObject;
    this.SendMailModelPoppup.show();
  }

  submit() {
    this.loadSave = true;
    this.loanApplicationService.SendWebmergeDocumentEmail(this.loanId, this.historyObject.Id, this.addForm.value ).subscribe(resp => {
      this.loadSave = false;
      if (resp.statusCode == 200) {
        this.toaster.success(resp.responseMessage);
        this.close();
      } else {
        this.toaster.error(resp.responseMessage);
      }
      
    }, err => {
        this.loadSave = false;
    })
  }

  close() {
    this.SendMailModelPoppup.hide();
    this.sendEmailEmit.emit();
  }
  onChangetemp(e) {

  }
  onPaste(e) {

  }

  get toEmailAddress() { return this.addForm.get('toEmailAddress'); }
  get emailSubject() { return this.addForm.get('emailSubject'); }
  get content() { return this.addForm.get('content'); }

}
