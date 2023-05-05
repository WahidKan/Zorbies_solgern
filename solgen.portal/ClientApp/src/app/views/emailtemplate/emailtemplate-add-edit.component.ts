import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailTemplateService, EmailTemplate } from './emailtemplate.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Masters, MasterService } from '../master/master.service';
import { LayoutService } from '../managelayout/layout.service';
import { NgSelectComponent } from '@ng-select/ng-select';


@Component({
  selector: 'app-emailtemplate-add-edit',
  templateUrl: './emailtemplate-add-edit.component.html',
  styleUrls: ['./emailtemplate-add-edit.component.scss']
})
export class EmailtemplateAddEditComponent implements OnInit {
  modulelist: any;
  submodulelist: any;
  //selectedValue: any;
  loadSaveDrp = false;
  lstUserType: any;
  @ViewChild('module', { static: false}) module: NgSelectComponent;
  @ViewChild('subModule', { static: false}) subModule: NgSelectComponent;
  searchUserType = '';
  loginuserid: any;
  loading = false;
  id: any;
  sortDir = 'desc';
  sortColumn = 'Id';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  pageSizeValue: number;
  ckeConfig: any;
  SelectedText: any;
  modulecode: number = 0;
  modulenamecode: any;
  submoduleCode: any;
  loadSave = false;
  customCompnentValues: any = [];
  mycontent: string;
  addOrUpdatePermission: boolean=false;
  groupName: any[] = [];
  formControlList: any[] = [];
  groupNamedata: any[] = [];
  groupTables: any = [];
 // modulePermission: ModuleList;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;   
  isDisabled: any;
  emailTemplateForm: FormGroup;
  statuses: any;
  pageTitle: string;
  loanApplicationFormFields: any[] = [];
  companyId: any;
  emailTemplate: EmailTemplate = new EmailTemplate();
  modulePermission: any[] = [];
  contentHeader: object;
  constructor(private fb: FormBuilder,
    private layoutservice: LayoutService,
    private emailTemplateService: EmailTemplateService,
    private commonService: CommonService,
    private masterService: MasterService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {

      this.addOrUpdatePermission = true;
    }
    this.mycontent = `<p>Enter content</p>`;
  }


  ngOnInit() {
   
    this.isDisabled = null;
    this.getModuleddl();
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSave = true;
        this.pageTitle = 'Edit Email Templates';
        this.getEmailTemplate(id);
      }
      else {
        this.pageTitle = 'Add Email Templates';
        this.loadSave = true;
      }
    }
    );
    this.getStatuses();
    this.initForm();
  
 this.initBreadCrumb();
}

initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Email Templates',
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
            name : 'Email Templates',
            isLink : true,
            link : '/emailtemplates'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }

  onChange($event: any): void {
  }

  onPaste($event: any): void {
  }

  getStatuses() {
    this.commonService.getMasterItemsList("Status").subscribe((response: any) => {
      this.statuses = this.commonService.masters;
    });
  }

  save() {
    if (this.emailTemplateForm.valid) {
      this.loadSave = true;
      // // console.log(this.emailTemplateForm.value)
      this.emailTemplateService.saveEmailTemplate(this.emailTemplateForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/emailtemplates");
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      })
    }
    else {
      this.commonService.validateAllFormFields(this.emailTemplateForm);
    }
  }

  getEmailTemplate(id: string) {
    this.emailTemplateService.getEmailTemplateById(id)
      .subscribe(
        (emailTemplate: EmailTemplate) => {
          this.displayEmailTemplate(emailTemplate);
          this.loadSave = false;
        },
        (error: any) => {
          this.loadSave = false;
        });
  }

  displayEmailTemplate(emailTemplate: EmailTemplate): void {
    this.emailTemplate = emailTemplate;
    // console.log('emailTemplate ', this.emailTemplate)
    this.isDisabled = true;
    this.getSubModuleList(this.emailTemplate.selectedValue);
    this.pageTitle = `Edit Email Template: ${this.emailTemplate.emailTemplateName}`;
    this.emailTemplateForm.patchValue({
      emailTemplateId: this.emailTemplate.emailTemplateId,
      emailTemplateName: this.emailTemplate.emailTemplateName,
      emailTemplateSubject: this.emailTemplate.emailTemplateSubject,
      selectedValue: this.emailTemplate.selectedValue,
      selectedSubModuleValue: this.emailTemplate.selectedSubModuleValue,
      template: this.emailTemplate.template,
      emailTemplateStatusId: this.emailTemplate.emailTemplateStatusId,
    });
   // this.modulenamecode = this.emailTemplate.moduleName.trim().toLowerCase().replace(' ', '');
    //this.submoduleCode = this.emailTemplate.subModuleName.trim().toLowerCase().replace(' ', '');
    if (this.emailTemplate.moduleName == null) {
      this.modulenamecode = null;
    }
    else {
      this.modulenamecode = this.emailTemplate.moduleName.trim().toLowerCase().replace(' ', '');
    }

    if (this.emailTemplate.subModuleName == null) {
      this.submoduleCode = null;
    }
    else {
      this.submoduleCode = this.emailTemplate.subModuleName.trim().toLowerCase().replace(' ', '');
    }

    if (this.submoduleCode != 'loanapplication') {
      this.getCustomeFields();
    }
    if (this.submoduleCode =='loanapplication') {
      this.getcustomFieldForLoanApplication();
    }
  }

  FillEditorData(displayName, name) {
    this.ckeditor.instance.insertText('@' + name);
    // console.log("displayName", displayName);
    // console.log("name", name);
  }
  FillEditorDataForLoanApplication(displayName, tablename) {
    this.ckeditor.instance.insertText('@' + displayName+'_'+tablename);
  }
  getModuleddl() {
    this.commonService.getMasterItemsList('custom_modules').subscribe((result: any) => {
      this.modulelist = this.commonService.masters;
      if (this.id != null) {
        for (var i = 0; i < this.modulelist.length; i++) {
          let s = this.modulelist[i];
          if (s.text == this.id) {
            let value: any = s.value;
            let text: any = s.text;
            //this.selectedValue = value.toString();
            this.SelectedText = text.toString();
            this.selectmoduleValue(this.selectedValue, this.SelectedText);
            // // console.log('value ', this.selectedValue)          
          }
        }

      }
    })
  }

  selectmodule(event) {
    if (typeof event === 'undefined') {
      this.modulecode = 0;
    }
    else {
      this.submodulelist = '';
      this.modulecode = (event.value);
      this.modulenamecode = (event.text);
      this.getSubModuleList(this.modulecode);
    }
  }
  getSubModuleList(id: any) {
    this.commonService.getMasterSubModuleList(id, 'custom_sub_modules').subscribe((response: any) => {
      this.submodulelist = this.commonService.masters;
      // // console.log('submodulelist',this.submodulelist);
    });
  }
  groupBy1 = (array, key) => {

    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key.trim()]] = result[currentValue[key]] || []).push(
        currentValue
      );

      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, []); // empty object is the initial value for result object
  };
  selectedModuleValue(event) {
    //this.loadSave = true;
    this.submoduleCode = (event.text.trim().toLowerCase().replace(' ', ''));
    if (this.submoduleCode == 'loanapplication') {
      this.loadSave = true;
      this.emailTemplateService.GetCustomFormFieldList(this.modulenamecode.trim().toLowerCase().replace(' ', ''), this.submoduleCode.trim().toLowerCase().replace(' ', ''), '', '').subscribe((result: any) => {
        if (result) {
          this.formControlList = [];
          this.customCompnentValues = [];
          this.customCompnentValues = this.emailTemplateService.customFieldsList;
          this.groupName = [];
          // console.log(this.customCompnentValues);
          this.groupName = this.groupBy1(this.customCompnentValues, 'tableName');
          // // console.log("customCompnentValues", this.customCompnentValues);
          this.formControlList = [];

          //// console.log("form02502", this.formControlList);

          this.customCompnentValues.forEach(m => {
            let groupCheck = this.formControlList.filter(y => y.groupName == m.tableName);
            if (groupCheck == null || groupCheck.length == 0) {
              let obj = {
                groupName: m.tableName,
                groupNameKey: 'collapseOne_' + String(m.tableName).split(' ').join('_'),
                tableFields: this.customCompnentValues.filter(y => y.tableName == m.tableName)
              };
              this.formControlList.push(obj);             
            }
          })

          //let data: any[] = [];

         /* for (var i = 0; i < this.formControlList.length; i++) {
            let isGroupFound = false;
            for (var j = 0; j < this.groupNamedata.length; j++) {
              if (this.groupNamedata[j].groupName === this.formControlList[i].groupName) {
                isGroupFound = true;
                break;
              }
            }
            if (isGroupFound == false) {
              // console.log("checkData", this.formControlList[i].groupName);
              
              this.groupNamedata.push(this.formControlList[i]);

            }
          }
          */
          this.groupNamedata = this.formControlList;
          // console.log("checkData", this.formControlList);

          //this.formControlList.filter(w => w.groupName = "")
          //// console.log("formControlList", this.formControlList);
          //// console.log("form02502", this.formControlList);
        }
      });
      //this.emailTemplateService.GetCustomFormFieldList(this.modulenamecode.trim().toLowerCase().replace(' ', '').subscribe((result: any) => {
      //  if (result) {
      //    this.customCompnentValues = this.emailTemplateService.customFieldsList;
      //    // console.log("CustomFormFields", this.emailTemplateService.customFieldsList);
      //  }
      //})
    }
    else {
      this.loadSave = true;
      this.emailTemplateService.GetCustomFieldsList(this.modulenamecode.trim().toLowerCase().replace(' ', ''), this.submoduleCode.trim().toLowerCase().replace(' ', ''), '', '').subscribe((result: any) => {
        if (result) {
          this.customCompnentValues = this.emailTemplateService.customFieldsList.data;
          //// console.log("customCompnentValues", this.customCompnentValues);
        }
      });
    }
    this.loadSave = false;
  }

  formstagedatasubForEmailTemplateFor(item) {

    var itemsdata = this.groupName.filter(x => x.ParentId == item);

    return itemsdata;
  }
  getCustomeFields() {
    let moduleCodefor; let subModuleCode;
    if (this.modulenamecode != null) {
      moduleCodefor = this.modulenamecode.trim().toLowerCase().replace(' ', '')
    } if (this.submoduleCode != null) {
      subModuleCode = this.submoduleCode.trim().toLowerCase().replace(' ', '')
    }
    this.emailTemplateService.GetCustomFieldsList(moduleCodefor, subModuleCode, '', '').subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.emailTemplateService.customFieldsList.data;
        // console.log("customCompnentValues", this.customCompnentValues);
      }
    });
  }

  getcustomFieldForLoanApplication() {
    this.emailTemplateService.GetCustomFormFieldList(this.modulenamecode.trim().toLowerCase().replace(' ', ''), this.submoduleCode.trim().toLowerCase().replace(' ', ''), '', '').subscribe((result: any) => {
      if (result) {
        this.formControlList = [];
        this.customCompnentValues = [];
        this.customCompnentValues = this.emailTemplateService.customFieldsList;
        this.groupName = [];
        // console.log(this.customCompnentValues);
        this.groupName = this.groupBy1(this.customCompnentValues, 'tableName');
        // // console.log("customCompnentValues", this.customCompnentValues);
        this.formControlList = [];

        //// console.log("form02502", this.formControlList);

        this.customCompnentValues.forEach(m => {
          let groupCheck = this.formControlList.filter(y => y.groupName == m.tableName);
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              groupName: m.tableName,
              groupNameKey: 'collapseOne_' + String(m.tableName).split(' ').join('_'),
              tableFields: this.customCompnentValues.filter(y => y.tableName == m.tableName)
            };
            this.formControlList.push(obj);
          }
        })

        //let data: any[] = [];

        /* for (var i = 0; i < this.formControlList.length; i++) {
           let isGroupFound = false;
           for (var j = 0; j < this.groupNamedata.length; j++) {
             if (this.groupNamedata[j].groupName === this.formControlList[i].groupName) {
               isGroupFound = true;
               break;
             }
           }
           if (isGroupFound == false) {
             // console.log("checkData", this.formControlList[i].groupName);
             
             this.groupNamedata.push(this.formControlList[i]);

           }
         }
         */
        this.groupNamedata = this.formControlList;
        // console.log("checkData", this.formControlList);

        //this.formControlList.filter(w => w.groupName = "")
        //// console.log("formControlList", this.formControlList);
        //// console.log("form02502", this.formControlList);
      }
    });
  }
  selectmoduleValue(value: any, text: any) {
    if (value != null) {
      this.modulecode = value;
      this.modulenamecode = text;
    }
    else {
      this.modulecode = 0;
    }
  }

  close() {
    this.router.navigate(['/emailtemplates']);
  }

  private initForm() {
    this.emailTemplateForm = this.fb.group({
      'emailTemplateId': [this.emailTemplate.emailTemplateId, Validators.nullValidator],
      'emailTemplateName': [this.emailTemplate.emailTemplateName, [Validators.required, Validators.maxLength(50)]],
      'emailTemplateSubject': [this.emailTemplate.emailTemplateSubject, [Validators.nullValidator]],
      'template': [this.emailTemplate.template, [Validators.required]],
      'emailTemplateStatusId': [this.emailTemplate.emailTemplateStatusId, [Validators.required]],
      'selectedValue': [this.emailTemplate.selectedValue == '' ? null : this.emailTemplate.selectedValue],
      'selectedSubModuleValue': [this.emailTemplate.selectedSubModuleValue == '' ? null : this.emailTemplate.selectedSubModuleValue],
    });
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  }

  get emailTemplateId() { return this.emailTemplateForm.get('emailTemplateId'); }
  get emailTemplateName() { return this.emailTemplateForm.get('emailTemplateName'); }
  get emailTemplateSubject() { return this.emailTemplateForm.get('emailTemplateSubject'); }
  get emailTemplateStatusId() { return this.emailTemplateForm.get('emailTemplateStatusId'); }
  get template() { return this.emailTemplateForm.get('template'); }
  get selectedValue() { return this.emailTemplateForm.get('selectedValue'); }
  get selectedSubModuleValue() { return this.emailTemplateForm.get('selectedSubModuleValue'); }

}
