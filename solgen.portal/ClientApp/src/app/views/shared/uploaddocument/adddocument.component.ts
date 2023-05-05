import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Documents, UploadService } from './upload.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../common.service';
import { Router } from '@angular/router';
import { UploadComponent } from './upload.component';
import { CreditcheckscoreComponent } from '../creditcheckscore/creditcheckscore.component';
import { ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html'
})
export class AdddocumentComponent implements OnInit {
  @Input("contactId") contactId: any;
  @Input("prefixNameOfDocument") prefixNameOfDocument: any;
  @Input("calledFrom") calledFrom: any;
  @ViewChild('leaseContactCreditScoreModal', { static: false }) modalContactCreditScore: CreditcheckscoreComponent;
    @ViewChild('fileInput', { static: false }) fileInput;;
  lstdocumentType: any;
  userId: any;
  isCustomerAllForms: any;
  id = "";
  sortDir = 'desc';
  isValid = true;
  sortColumn = 'NotesCreatedOn';
  uploadList: any = {
    pager: {},
    data: []
  };
  @Output() refresh = new EventEmitter();
  listFilter = '';
  searchTxt = '';
  pageSizeValue: number;
  documentForm: FormGroup;
  fileName = 'Select File';
  profilePic: any;
  loading = false;
  isContactPage = false;
  isBankUser: any
  config: any;
  loadSave: boolean = false;

  documents: Documents = new Documents();
  constructor(private fb: FormBuilder, private documentList: UploadComponent, private uploadService: UploadService,
    private toaster: ToastrService, private commonService: CommonService,
    private router: Router) {
    const configure: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true
    }
    this.config = configure;
   
    
  }

  ngOnInit() {
    if (this.calledFrom=='contact') {
      this.isContactPage = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = false; 
      }
      else {
        this.isBankUser = true;
      }
    });
  
    
    this.isCustomerAllForms = this.documentList.isCustomerAllForms;
    this.initForm();
    this.getdocumentTypes();
  }

  save() {
    this.loading = true;
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
          this.documentFileName.reset();
          this.fileName = "Select File";
          this.documentName.reset();
          this.documentFileName.reset();
          this.documentList.getDocuments();
          this.loading = false;
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loading = false;
        }
      },

        error => {
          this.loading = false;

        })
    }
    else {
      this.commonService.validateAllFormFields(this.documentForm);
      this.loading = false;
    }
  }
  checkCreditScore() {
    this.modalContactCreditScore.show(this.userId, this.contactId, this.config, this.prefixNameOfDocument);
  }
  private prepareFormDataForDocument() {

    const input = new FormData();
    input.append('documentName', this.documentName.value);
    input.append('documentFileName', this.fileName);
    input.append('documentComment', this.documentComment.value == null ? '' : this.documentComment.value);
    input.append('documentTitle', this.documentTitle.value == null ? '' : this.documentTitle.value);
    input.append('documentUploadedForUser', this.contactId);
    input.append('documentUploadedBy', this.userId); 
    input.append('prefixNameOfDocument', this.prefixNameOfDocument);
    input.append('isCustomerAllForms', this.isCustomerAllForms);
    input.append('DocumentAddFor', this.calledFrom);
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
      'documentTitle': [''],
    });
  }

  get documentComment() { return this.documentForm.get('documentComment'); }
  get documentTitle() { return this.documentForm.get('documentTitle'); }
  get documentName() { return this.documentForm.get('documentName'); }
  get documentFileName() { return this.documentForm.get('documentFileName'); }

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
        this.isValid = true;
      }
    }
  }
}
