import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModuleList, CommonService } from '../shared/common.service';
import { ManageTemplate, ManagetemplateService } from './managetemplate.service';

@Component({
  selector: 'app-managetemplateaddedit',
  templateUrl: './managetemplateaddedit.component.html',
  styleUrls: ['./managetemplateaddedit.component.scss']
})
export class ManagetemplateaddeditComponent implements OnInit {
  ckeConfig: any;
  loadSave = false;
  lstStatus: any;
  mycontent: string;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  isDisabled: any;
  manageTemplateForm: FormGroup;
  statuses: any;
  pageTitle: string;
  manageTemplate: ManageTemplate = new ManageTemplate();
    constructor(private fb: FormBuilder,
      private manageTemplateService: ManagetemplateService,
      private commonService: CommonService,
      private router: Router,
      private toaster: ToastrService,
      private route: ActivatedRoute) {
      this.commonService.getMasterItemsList("status").subscribe((result: any) => {
        this.lstStatus = this.commonService.masters;
      })
      const moduleCode = this.route.snapshot.data.moduleCode;
      this.modulePermission = this.commonService.getPermission(moduleCode);
      this.mycontent = `<p>Enter content</p>`;
    }

  ngOnInit() {
    this.addOrUpdatePermission = false;
    this.isDisabled = null;
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSave = true;
        this.getEmailTemplate(id);
      }
      else {
        this.pageTitle = 'Add Email Template';
        this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
      }
    }
    );
    this.initForm();
  }

  onChange($event: any): void {
  }

  onPaste($event: any): void {
  }

  save() {
    if (this.manageTemplateForm.valid) {
      this.loadSave = true;
      this.manageTemplate.templateId = this.manageTemplateForm.value.templateId;
      this.manageTemplate.statusId = this.manageTemplateForm.value.statusId;
      this.manageTemplate.templateName = this.manageTemplateForm.value.templateName;
      this.manageTemplate.templateContent = this.manageTemplateForm.value.templateContent;
      this.manageTemplateService.UpdateManageTemplate(this.manageTemplate).subscribe((result: any) => {
        
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/template");
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
      this.commonService.validateAllFormFields(this.manageTemplateForm);
    }
  }

  getEmailTemplate(id: string) {
    this.manageTemplateService.getManageTemplateById(id)
      .subscribe(
      (manageTemplate: ManageTemplate) => {
        this.displayEmailTemplate(manageTemplate);
        this.loadSave = false;
        },
        (error: any) => {
          this.loadSave = false;
        });
  }

  displayEmailTemplate(emailTemplate: ManageTemplate): void {
    this.manageTemplate = emailTemplate;
    this.isDisabled = true;
    this.pageTitle = `Edit Proposal Template: ${this.manageTemplate.templateName}`;
    this.manageTemplateForm.patchValue({
      templateId: this.manageTemplate.templateId,
      templateName: this.manageTemplate.templateName,
      templateContent: this.manageTemplate.templateContent,
      statusId: this.manageTemplate.statusId,
    });
  }

  close() {
    this.router.navigate(['/template']);
  }

  private initForm() {
    this.manageTemplateForm = this.fb.group({
      'templateId': ['', Validators.nullValidator],
      'templateName': ['', [Validators.required, Validators.maxLength(50)]],
      'templateContent': ['', [Validators.required]],
      'statusId': [null, Validators.required],
    }); 
  }

  get templateId() { return this.manageTemplateForm.get('templateId'); }
  get statusId() { return this.manageTemplateForm.get('statusId'); }
  get templateName() { return this.manageTemplateForm.get('templateName'); }
  get templateContent() {return this.manageTemplateForm.get('templateContent');}
}

