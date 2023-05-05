import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from './announcement.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-edit-announcement',
  templateUrl: './add-edit-announcement.component.html',
  styleUrls: ['./add-edit-announcement.component.scss']
})
export class AddEditAnnouncementComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput;
  setFileName = 'Choose file';
  loadSave: boolean = false;
  lstUserType: any;
  lstRecuringType: any;
  pageTitle: any;
  minimumDate = new Date();
  fileUrl: string;
  announcementId: any;
  modulePermission: any[] = [];
  addOrUpdatePermission: boolean = false;
  endDateValidator: boolean = true;
  fileTypesGroup: any;
  fileSize: number = 5;
  fileExtension: string = '';
  contentHeader: object;
  constructor(private Announcementservice: AnnouncementService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private route: ActivatedRoute) {
    this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;//.filter(x => x.masterName == "UserType");
      //// console.log('lstUserType', this.lstUserType)
      const priviledgeCode = this.route.snapshot.data.privilegeCode;
      const moduleCode = this.route.snapshot.data.moduleCode;
      this.modulePermission = this.commonService.getPermissiondata(moduleCode);
      let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
      if (add == undefined) {
        this.addOrUpdatePermission = false;
      } else {

        this.addOrUpdatePermission = true;
      }

    })
    this.commonService.getMasterItemsList("RecuringType").subscribe((result: any) => {
      this.lstRecuringType = this.commonService.masters;//.filter(x => x.masterName == "UserType");
      // console.log('lstRecuringType', this.lstRecuringType)
    })
    this.fileUrl = '';
  }

  ngOnInit() {
    this.fileUrl = '';
    this.getConfigurationTypeFileExtensions();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.announcementId = id;
        if (id) {
          this.loadSave = true;
          this.pageTitle = 'Edit Announcement';
          this.fillForm(id);
        }
        else {
          this.pageTitle = 'Add Announcement';
          this.loadSave = true;
          
        }
      }
    );

    this.startDate.valueChanges.subscribe(m => {

      if (this.recuringType.value) {
        if (this.recuringType.value.name == 'Single') {
          this.endDate.setValue(m);

        } else {
          this.endDate.setValue(null);
        }
      }
    })
  
this.initBreadCrumb();
}

initBreadCrumb() {
   this.contentHeader = {
     headerTitle: 'Manage Announcement',
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
           name : 'Manage Announcement',
           isLink : true,
           link : '/announcement'
         },
         {
           name: this.pageTitle,
           isLink: false
         }

       ]
   };
   setTimeout(() => {
     this.loadSave = false;
   }, 1000);
 }

  fillForm(id) {

    this.Announcementservice.getAnnouncementDetail(id).subscribe((result: any) => {
      ;
      // console.log('result000:', result)
      if (result) {
        this.loadSave = false;
        this.pageTitle = 'Edit Announcement: ' + result.title;
        let status = (result.status_id == 1001 ? true : false);
        let sDate = new Date(result.sDate);
        let eDate: any;
        if (result.eDate) {
          eDate = new Date(result.eDate);
        }
        else {
          eDate = null;
          this.endDateValidator = false;
          this.endDate.clearValidators();
          this.endDate.updateValueAndValidity();
        }
        let ddl = '';
        if (result.usertype != null) {
          ddl = result.usertype.split(',');
        }
        let recurring = result.recuringType;
        if (this.lstRecuringType != null) {
          this.recuringType.setValue(this.lstRecuringType.find(m => m.value === recurring));
        }
        this.setFileName = result.fileName == '' ? 'Choose file' : result.fileName;
        this.fileUrl = result.file;

        this.addAnnouncementForm.patchValue({
          id: result.id,
          title: result.title,
          message: result.message,
          startDate: sDate,
          endDate: eDate,
          Status: status,
          usertype: ddl,
          recuringType: result.recuringType
        });
        if (this.recuringType.value) {
          if (this.recuringType.value.name == 'Single') {
            this.endDate.disable();
          }
        }
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }

  onChange(e: any) {
    if (e) {
      if (e.name == 'Single') {
        this.startDate.setValue(null);
        this.endDate.setValue(null);

        this.endDate.disable();

        this.endDateValidator = false;
        this.endDate.clearValidators();
        this.endDate.updateValueAndValidity();
      }
      else {
        this.endDate.enable();
        this.endDateValidator = true;
        this.endDate.setValidators([Validators.required]);
        this.endDate.updateValueAndValidity();

        this.startDate.setValue(null);
        this.endDate.setValue(null);
      }
    }
  }

  private prepareFormDataForDocument() {
    ;
    const input = new FormData();
    input.append('id', this.id.value);
    input.append('title', this.title.value);
    if (this.recuringType.value) {
      input.append('recuringType', this.recuringType.value);
    }
    input.append('startDate', this.startDate.value.toDateString());
    if (this.endDate.value) {
      input.append('endDate', this.endDate.value.toDateString());
    }
    input.append('Status', this.Status.value);
    input.append('acknowledgmentRequired', this.acknowledgmentRequired.value);
    input.append('usertype', this.usertype.value);
    input.append('message', this.message.value);

    if (this.commonService.isUploadImageValid) {
      if (this.setFileName !== null) {
        input.append('filename', this.setFileName = 'Choose file' ? '' : this.setFileName);
      }
    }
    // console.log('this.fileInput.nativeElement', this.fileInput.nativeElement)
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    
    if (this.announcementId) {
      input.append('file', this.fileUrl == '' ? '' : this.fileUrl);
    }

    return input;
  }

  Save() {
    // console.log('addAnnouncementForm', this.addAnnouncementForm.value);
    if (this.addAnnouncementForm.valid) {
      this.loadSave = true;
      const companySetupModel = this.prepareFormDataForDocument();
      // console.log('addAnnouncementForm111', companySetupModel);
      this.Announcementservice.saveAnnouncement(companySetupModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.fileInput.nativeElement.value = "";
          this.router.navigateByUrl("/announcement");
          setTimeout(() => { this.loadSave = false; }, 2000);
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.addAnnouncementForm);
    }
  }
  getConfigurationTypeFileExtensions() {
    this.commonService.getConfigurationTypeFileExtensions('Announcement').subscribe((result: any) => {
      ;
      if (result && result.FileTypesGroup != '') {
        this.fileSize = result.FileSize;
        this.fileTypesGroup = JSON.parse(result.FileTypesGroup);
        this.fileTypesGroup.forEach((obj,index) => {
          if (obj.FileTypes) {
            let extension = obj.FileTypes.map(x => x.Name);
            this.fileExtension += (index > 0 && this.fileExtension!="") ? ", " : "";
            this.fileExtension += extension.join(", ");
          }
        });
      }
    });
  }
  // this.commonService.validUploadDocumentType($event.target.files[0].name, $event.target.accept);
  // this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
  // if (this.commonService.isFileValid && this.commonService.isFileExtensionValid) {
  setFile($event): void {
    this.commonService.validUploadDocumentType($event.target.files[0].name, $event.target.accept);
    this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
    if (this.commonService.isFileValid && this.commonService.isFileExtensionValid) {
      this.setFileName = $event.target.files[0].name;
    }
  }

  Cancel() {
    this.router.navigateByUrl("/announcement");
  }

  addAnnouncementForm = this.fb.group({
    id: [0],
    title: ['', Validators.required],
    recuringType: [null, Validators.required],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    Status: [false],
    acknowledgmentRequired: [false],
    usertype: [null],
    message: ['', Validators.required],
    'file': '',
    'filename': null,

  })

  reset() {
    this.setFileName = 'Choose file';
    this.fileUrl = null;
    this.fileInput.nativeElement.value = "";
  }

  get id() { return this.addAnnouncementForm.get('id'); }
  get title() { return this.addAnnouncementForm.get('title'); }
  get recuringType() { return this.addAnnouncementForm.get('recuringType'); }
  get startDate() { return this.addAnnouncementForm.get('startDate'); }
  get endDate() { return this.addAnnouncementForm.get('endDate'); }
  get Status() { return this.addAnnouncementForm.get('Status'); }
  get acknowledgmentRequired() { return this.addAnnouncementForm.get('acknowledgmentRequired'); }
  get usertype() { return this.addAnnouncementForm.get('usertype'); }
  get message() { return this.addAnnouncementForm.get('message'); }
  get filename() { return this.addAnnouncementForm.get('filename'); }



}
