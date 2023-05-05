import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService, LeaseTemplate } from '../../managelease/managelease.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-leasetemplatedetail',
  templateUrl: './leasetemplatedetail.component.html',
  styleUrls: ['./leasetemplatedetail.component.scss']
})
export class LeasetemplatedetailComponent implements OnInit {
  @ViewChild('leasetemplatedetail', { static: false }) modaleditLeaseTemplate: ModalDirective;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  leaseTemplateName: any;
  ckeConfig: any;
  leaseTemplateForm: FormGroup;
  leaseId: any;
  loadSave = false;
  leaseTemplate: LeaseTemplate = new LeaseTemplate();
  constructor(private leaseService: ManageleaseService, private toaster: ToastrService, private fb: FormBuilder, private commonService: CommonService, ) {
   
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    this.initForm();
  }
  show(result,leaseId) {
    this.templateId.setValue(result.templateId);
    this.leaseTemplateName = result.templateName;
    this.leaseId = leaseId;
    this.getTemplateDetail(result);
    this.modaleditLeaseTemplate.show();
  }
  close() {
    this.templateName.setValue('');
    this.templateId.setValue('');
    this.modaleditLeaseTemplate.hide();
  }
  getTemplateDetail(result) {
    this.leaseTemplateForm.patchValue({
      templateId: result.templateId,
      templateName: result.templateName,
    });
  }
  onChange($event: any): void {
  }

  onPaste($event: any): void {
  }

  private initForm() {
    this.leaseTemplateForm = this.fb.group({
      'templateId': [this.leaseTemplate.TemplateId, [Validators.nullValidator]],
      'templateName': [this.leaseTemplate.TemplateName, [Validators.required]],
    });
  }

  get templateId() { return this.leaseTemplateForm.get('templateId'); }
  get templateName() { return this.leaseTemplateForm.get('templateName'); }

  sendLeaseTemplate() {
    if (this.leaseTemplateForm.valid) {
      this.loadSave = true;
      this.leaseTemplate.TemplateId = this.leaseTemplateForm.value.templateId;
      this.leaseTemplate.TemplateName = this.leaseTemplateForm.value.templateName;
      this.leaseTemplate.LeaseId = this.leaseId;
      this.leaseService.saveEmailTemplate(this.leaseTemplate, this.leaseId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.templateName.setValue('');
          this.templateId.setValue('');
          this.modaleditLeaseTemplate.hide();
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.toaster.error(result.responseMessage);
         
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      })
    }
    else {
      this.commonService.validateAllFormFields(this.leaseTemplateForm);
    }

  }

}
