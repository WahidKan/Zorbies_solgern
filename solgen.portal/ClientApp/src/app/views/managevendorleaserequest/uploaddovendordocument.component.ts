import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManageleaseService } from '../managelease/managelease.service';
import { Documents, UploadService } from '../shared/uploaddocument/upload.service';
import { UploadComponent } from '../shared/uploaddocument/upload.component';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-uploaddovendordocument',
  templateUrl: './uploaddovendordocument.component.html',
  styleUrls: ['./uploaddovendordocument.component.scss']
})
export class UploaddovendordocumentComponent implements OnInit {
  @ViewChild('vendordocumentUploadModal', { static: false }) modalVendorLeaseModal: ModalDirective;
  documentForm: FormGroup;
  fileName: any;
  profilePic: any;
  documentType: any;
  isValid = true;
  active = false;
  userId: any;
  loadSave = false;
  leaseID: any;
  documentName: any;
  calledFrom = "VendorDocuments";
  loading = false;
  lstdocumentType: any;
    @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Output() refresh = new EventEmitter();
  listFilter = '';
  leaseAssignedBankId: any;
  searchTxt = '';
  titleWorkRequest: any;
  leaseNumber: any;
  contactId: any;
  venderEmailId: any;
  isCustomerAllForms: any;
  pageSizeValue: number;
  isBankUser: any
  documents: Documents = new Documents();
  constructor(private fb: FormBuilder,  private uploadService: UploadService,
    private toaster: ToastrService, private commonService: CommonService) {
    
  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = false;
      }
      else {
        this.isBankUser = true;
      }
    });
    
    this.initForm();
    this.getdocumentTypes();
  }

  close() {
    this.active = false;
    this.documentComment.reset();
    this.documentTitle.reset();
    this.fileName = "Select File";
    this.fileInput.nativeElement.value = '';
    this.modalVendorLeaseModal.hide();
  }
  show( row) {
    this.contactId = row.ContactId;
    this.documentName = row.documentName;
    this.userId = row.userId;
    this.leaseID = row.LeaseId;
    this.leaseNumber = row.LeaseNumber;
    this.modalVendorLeaseModal.show();
        this.active = true;
  }
  save() {
    this.loadSave = true;
    if (this.fileName === null || this.fileName === ''
      || typeof this.fileName === 'undefined'
      || this.fileName == 'Select File') {
      this.isValid = false;
    }

    else {
      this.isValid = true;
    }

    if (this.isValid && !this.documentName.invalid) {
      this.commonService.getLoggedInName.subscribe((userdetail: any) => {
        if (userdetail.id != null) {
          this.userId = userdetail.id;
        }
      });
      const formDataDocumentModel = this.prepareFormDataForDocument();
      this.uploadService.saveDocument(formDataDocumentModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.documentComment.reset();
          this.documentTitle.reset();
          this.refresh.emit();
          this.modalVendorLeaseModal.hide();
          this.fileInput.nativeElement.value = '';
          this.fileName = "Select File";
          this.loadSave = false;
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      },

        error => {
          this.loadSave = false;

        })
    }
    else {
      this.commonService.validateAllFormFields(this.documentForm);
      this.loadSave = false;
    }
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('documentName', this.documentName);
    input.append('documentTitle', this.documentTitle.value);
    input.append('documentFileName', this.fileName);
    input.append('documentComment', this.documentComment.value == 'null' ? '' : this.documentComment.value);
    input.append('documentUploadedForUser', this.leaseID);
    input.append('documentType', this.documentType);
    input.append('documentUploadedBy', this.userId); 
    input.append('isCustomerAllForms', this.isCustomerAllForms);
    input.append('DocumentAddedFrom', "createtitlework");
    input.append('DocumentAddFor', "lease");
    input.append('PrefixNameOfDocument', this.leaseNumber);
    if (this.commonService.isUploadImageValid) {
      if (this.documentFileName.value !== null) { 
        input.append('filename', this.documentFileName.value);
      }
    }
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    return input;
  }

  private initForm() {
    this.documentForm = this.fb.group({
      'documentName': [null, Validators.required],
      'documentFileName': [null, Validators.required],
      'documentComment': [''],
      'documentTitle':[''],
    });
  }

  get documentComment() { return this.documentForm.get('documentComment'); }
  get documentFileName() { return this.documentForm.get('documentFileName'); }
  get documentTitle() { return this.documentForm.get('documentTitle'); }

  getdocumentTypes() {
    this.commonService.getMasterItemsList("PreferredDocumentType").subscribe((result: any) => {
      this.lstdocumentType = this.commonService.masters;
      this.fileName = "Select File";
    })
  }

  get file() {
    return this.documentForm.get('file');
  }

  setFile($event): void {
    this.fileName = "Select File";
    this.profilePic = 'Select File';
    this.commonService.uploadDocumentFileValidator($event);
    if (this.commonService.isUploadFileValid) {
      this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "30MB")
      if (this.commonService.isFileValid) {

        this.fileName = $event.target.files[0].name;
        this.documentType = $event.target.files[0].type;
        this.isValid = true;
      }
    }
  }

}
