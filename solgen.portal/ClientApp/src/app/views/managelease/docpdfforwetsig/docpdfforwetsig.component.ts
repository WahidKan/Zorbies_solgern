import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageleaseService } from '../managelease.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-docpdfforwetsig',
  templateUrl: './docpdfforwetsig.component.html',
  styleUrls: ['./docpdfforwetsig.component.scss']
})
export class docpdfforwetsigComponent implements OnInit {
  @ViewChild('docpdfforwetsigModal', { static: false }) modaldocpdfforwetsig: ModalDirective;
  @Output() leaveWeightSignaturetDocView = new EventEmitter();
    @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  active = false;
  leasePDFDocumentNameLinkValue: string;
  leasePDFDocumentName: string;
  loadSave = false;
  leaseId: any;
  contactId: any;
  leaseAssignedBankId: any;
  dateTime = new Date();
  loading = false;
  isValid = true;
  fileNameOne: string;
  fileNameTwo: string;
  FileType1: string;
  FileType2: string;
  FileType3: string;
  fileName: string;
  profilePicOne: string;
  leaseNumber: string;
  profilePicThree: string;
  profilePicTwo: string;
  addCreditScoreForm: FormGroup;

  constructor(private leaseService: ManageleaseService, private toaster: ToastrService, private fb: FormBuilder,
    private router: Router, private dialogService: ConfirmationDialogService, private commonService: CommonService, ) { }

  ngOnInit() {
    this.fileName = "Select Document File";
    this.initForm();
  }

  show(id, leasePDFDocumentNameLink, contactId, leaseAssignedBankId) {
    this.modaldocpdfforwetsig.show();
    this.leaseId = id;
    this.contactId = contactId;
    this.leaseAssignedBankId = leaseAssignedBankId;
    this.leasePDFDocumentNameLinkValue = leasePDFDocumentNameLink;
    this.leasePDFDocumentName = leasePDFDocumentNameLink;
    const val = this.leasePDFDocumentName.lastIndexOf("\\");
    this.leasePDFDocumentName = this.leasePDFDocumentName.substring(val + 1);
    this.active = true;
  }

  SendStatisForWeightSignature() {
    this.loadSave = true;
    this.leaseService.SendStatusForWeightSignature(this.leaseId, this.contactId, this.leaseAssignedBankId).subscribe((res: any) => {
      this.loadSave = false;
      this.leaveWeightSignaturetDocView.emit();
    });
  }
  close() {
    this.active = false;
    this.modaldocpdfforwetsig.hide();
  }


  private initForm() {
    this.addCreditScoreForm = this.fb.group({
      LeaseId: [''],
      DocumentTitle: [''],
      fileNameThree:[''],
      documentScoreThreeFileName: [''],
      documentScoreOneFileName: [''],
      file1: [null],

    });
  }
  sendWetSignature() {
    this.loading = true;
    this.isValid = true;
    if (this.fileName == "Select Document File") {
      this.isValid = false;
    }
    if (this.isValid && !this.DocumentTitle.invalid) {
      this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      });

      const formDataDocumentModel = this.prepareFormDataForDocument();
      this.leaseService.saveUploadDocument(formDataDocumentModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.fileName = "Select Document File";
          this.DocumentTitle.reset();
          this.modaldocpdfforwetsig.hide();
          this.leaveWeightSignaturetDocView.emit();
          this.fileInput.nativeElement.value = '';
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
      this.commonService.validateAllFormFields(this.addCreditScoreForm);
      this.loading = false;
    }
  }

  private prepareFormDataForDocument() {

    const input = new FormData();
    input.append('DocumentTitle', this.DocumentTitle.value);
    input.append('DocumentUploadedForUser', this.leaseId);
    input.append('documentFile1', this.FileType1);
    input.append('DocumentType', this.FileType1);

    if (this.fileName !== null) {
      input.append('DocumentFileName', this.fileName);
    }
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }

    return input;
  }

  clearFile() {
    this.addCreditScoreForm.get('file').setValue('');
    this.fileInput.nativeElement.value = '';
  }
  get DocumentTitle() { return this.addCreditScoreForm.get('DocumentTitle'); }
  get DocumentFileName() { return this.addCreditScoreForm.get('DocumentFileName'); }
  get file1() {
    return this.addCreditScoreForm.get('file');
  }
 

  setFile($event): void {
    this.fileNameOne = "Select Document File";
    this.profilePicOne = 'Select Document File';
    if (typeof this.fileInput != 'undefined') {
      this.commonService.uploadDocumentFileValidator($event);
      if (this.commonService.isUploadFileValid) {
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "30MB")
        if (this.commonService.isFileValid) {
          this.fileName = $event.target.files[0].name;
          this.FileType1 = $event.target.files[0].type;
          this.isValid = true;
        }
      }
    }
  }


}
