import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManageleaseService, UploadDocuSign } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-upload-docu-sign',
  templateUrl: './upload-docu-sign.component.html',
  styleUrls: ['./upload-docu-sign.component.scss']
})
export class UploadDocuSignComponent implements OnInit {
  @ViewChild('uploadSign', { static: false }) modalDocuSign: ModalDirective;
    @ViewChild('fileInput', { static: false }) fileInput;;
  @Output() uploadDocu = new EventEmitter();
  active = false;
  Id: any;
  loadSave = false;
  uploadForm: FormGroup;
  upload: UploadDocuSign = new UploadDocuSign();
  dateTime = new Date();
  fileName = 'Select File';
  profilePic: any;
  isValid = true;
  isBankUser = false;
  IsSendToDocuSign = false;
  LeaseNumber: string;
  ContactId: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private leaseService: ManageleaseService, private toaster: ToastrService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.modalDocuSign.hide();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('leaseId');
        if (id) {
          this.Id = id;
          this.upload.documentUploadedForUser = id;
          this.getLeaseDetails(id, this.isBankUser)
        }
      });
    this.initUploadFormForm();
  }

  close() {
    this.active = false;
    this.modalDocuSign.hide();
  }
  show() {
    this.modalDocuSign.show();
    this.active = true;
  }

  get file() {
    return this.uploadForm.get('file');
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


  private prepareFormDataForDocument() {
    let documentDate = new Date(this.documentDate.value.toString());
    const input = new FormData();
    input.append('documentTitle', this.documentTitle.value == 'null' ? '' : this.documentTitle.value);
    input.append('documentUploadedForUser', this.documentUploadedForUser.value);
    input.append('documentRefNumber', this.documentRefNumber.value);
    input.append('documentDate', documentDate.toDateString());
    input.append('documentAddFor', this.documentAddFor.value);
    input.append('documentAddedFrom', this.documentAddedFrom.value);
    input.append('prefixNameOfDocument', this.LeaseNumber)
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

  getLeaseDetails(id: any, isBankUser: boolean) {
    this.leaseService.getLeaseDetails(id, isBankUser).subscribe((res: any) => {
      if (res) {
        this.LeaseNumber = res.leaseNumber;
        this.ContactId = res.leaseContactId;
      }
    });
  }

  save() {

    if (this.fileName === null || this.fileName === ''
      || typeof this.fileName === 'undefined'
      || this.fileName == 'Select File') {
      this.isValid = false;
    }

    else {
      this.isValid = true;
    }
    if (this.isValid && this.uploadForm.valid) {
      this.loadSave = true;
      const formDataDocumentModel = this.prepareFormDataForDocument();
      this.leaseService.uploadDocuSign(formDataDocumentModel).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success(`DocuSign has been uploaded successfully`);
          this.uploadDocu.emit();
          this.documentTitle.reset();
          this.documentRefNumber.reset();
          this.documentDate.reset();
          this.fileName = "Select File";
          this.loadSave = false;
          this.close();
        }
        else {
          this.loadSave = false;
          this.toaster.error(res.responseMessage);
        }
      },
        error => {
          this.loadSave = false;
        });
    }
    else {
      this.commonService.validateAllFormFields(this.uploadForm);
    }
  }

  private initUploadFormForm() {
    this.uploadForm = this.fb.group({
      documentUploadedForUser: [this.upload.documentUploadedForUser, Validators.nullValidator],
      documentTitle: [''],
      documentDate: ['', Validators.required],
      documentRefNumber: [''],
      documentAddFor: ["docusign"],
      documentAddedFrom: ["docusign"],
      documentFileName: [null, Validators.required],
      prefixNameOfDocument: [''],
    });
  }

  get documentUploadedForUser() { return this.uploadForm.get('documentUploadedForUser'); }
  get documentTitle() { return this.uploadForm.get('documentTitle'); }
  get documentRefNumber() { return this.uploadForm.get('documentRefNumber'); }
  get documentDate() { return this.uploadForm.get('documentDate'); }
  get documentAddFor() { return this.uploadForm.get('documentAddFor'); }
  get documentAddedFrom() { return this.uploadForm.get('documentAddedFrom'); }
  get documentFileName() { return this.uploadForm.get('documentFileName'); }
  get prefixNameOfDocument() { return this.uploadForm.get('prefixNameOfDocument'); }

}


