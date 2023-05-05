import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-creditscoredetail',
  templateUrl: './creditscoredetail.component.html',
  styleUrls: ['./creditscoredetail.component.scss']
})
export class CreditscoredetailComponent implements OnInit {
  @ViewChild('leaseCreditScoreModal', { static: false }) modalCreditScore: ModalDirective;
  @Output() leavecreditscoreDocView = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Output() leaveCreditScore = new EventEmitter();
  @ViewChild('fileInput1', { static: false }) fileInput1: ElementRef;
  @ViewChild('fileInput2', { static: false }) fileInput2: ElementRef;
  @ViewChild('fileInput3', { static: false }) fileInput3: ElementRef;
  active = false;
  loadSave = false;
  dateTime = new Date();
  leaseId: any;
  loading = false;
  isValid = true;
  fileNameFirst: string;
  fileNameSecond: string;
  FileType1: string;
  FileType2: string;
  FileType3: string;
  fileNameThird: string;
  profilePicOne: string;
  leaseNumber: string;
  profilePicThree: string;
  profilePicTwo: string;
  addCreditScoreForm: FormGroup;
  constructor(private leaseService: ManageleaseService, private fb: FormBuilder, private toaster: ToastrService,
    private router: Router, private dialogService: ConfirmationDialogService, private commonService: CommonService, ) {
    if (typeof this.fileInput1 == 'undefined' || typeof this.fileInput2 == 'undefined' || typeof this.fileInput3 == 'undefined') {
      this.fileInput1 = null;
      this.fileInput2 = null;
      this.fileInput3 = null;
    }

  }

  ngOnInit() {
    this.fileNameFirst = "Select File";
    this.fileNameSecond = "Select File";
    this.fileNameThird = "Select File";
    this.initForm();
  }
  close() {
    this.active = false;
    this.fileNameFirst = "Select File";
    this.fileNameSecond = "Select File";
    this.fileNameThird = "Select File";
    this.scoreOneTitle.reset();
    this.scoreTwoTitle.reset();
    this.scoreThreeTitle.reset();
    this.modalCreditScore.hide();
    this.DatePulled.reset();
    this.modalCreditScore.hide();
  }

  show(id, LeaseNum) {
    this.modalCreditScore.show();
    this.leaseId = id;
    this.leaseNumber = LeaseNum;
    this.active = true;
    this.isValid = true;
  }

  private initForm() {
    this.addCreditScoreForm = this.fb.group({
      LeaseId: [''],
      scoreOneTitle: [''],
      scoreTwoTitle: [''],
      fileNameThree: [''],
      fileNameTwo:[''],
      scoreThreeTitle: [''],
      fileNameOne:[''],
      documentScoreThreeFileName: [''],
      documentScoreOneFileName: [''],
      DatePulled: ['', Validators.required],
      file1: [null],
      file2: [null],
      file3: [null],
    });
  }


  sendSkipTheStep() {
    const message = `Are you sure you want to Skip the step?`;
    this.dialogService.confirm('Credit Score Skip the step', message).subscribe(confirmed => {
      if (confirmed) {
        this.loading = true;
        const formDataDocumentModel = this.prepareFormDataForDocument();
        this.leaseService.saveDocument(formDataDocumentModel, "Skip the Step").subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.leavecreditscoreDocView.emit();
            this.modalCreditScore.hide();
            this.loading = false;
          }
        })
      }
    });
  }
  sendCreditScore() {
    this.loading = true;
    this.isValid = true;
    if (this.fileNameFirst == "Select File" && this.fileNameSecond == "Select File"
      && this.fileNameThird == "Select File") {
      this.isValid = false;
      this.toaster.error("Please select at least one file");
    }
    else if (this.scoreOneTitle.value == "" && (this.scoreTwoTitle.value == "" && this.scoreThreeTitle.value == "")) {
      this.isValid = false;
      this.toaster.error("Please enter at least one Title");
    }
    else {
      if (this.fileNameFirst != "Select File" && (this.scoreOneTitle.value === "" || this.scoreOneTitle.value === null)) {
        this.isValid = false;
        this.toaster.error("Please enter Score #1 Title if uploading #1 File");
      }
      else if (this.fileNameSecond != "Select File" && (this.scoreTwoTitle.value === "" || this.scoreTwoTitle.value === null)) {
        this.isValid = false;
        this.toaster.error("Please enter Score #2 Title if uploading #2 File");
      }
      else if (this.fileNameThird != "Select File" && (this.scoreThreeTitle.value === "" || this.scoreThreeTitle.value === null)) {
        this.isValid = false;
        this.toaster.error("Please enter Score #3 Title if uploading #3 File");
      }
      
    }

    if (this.isValid && !this.scoreOneTitle.invalid) {
      this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      });

      const formDataDocumentModel = this.prepareFormDataForDocument();
      this.leaseService.saveDocument(formDataDocumentModel, "Save").subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.fileNameFirst = "Select File";
          this.fileNameSecond = "Select File";
          this.fileNameThird = "Select File";
          this.scoreOneTitle.reset();
          this.scoreTwoTitle.reset();
          this.scoreThreeTitle.reset();
          this.leavecreditscoreDocView.emit();
          this.modalCreditScore.hide();
          this.DatePulled.reset();
          this.fileInput2.nativeElement.value = null;
          this.fileInput1.nativeElement.value = null;
          this.fileInput3.nativeElement.value = null;

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
    let documentDate = null;
    if (this.DatePulled.value != null)
      documentDate = new Date(this.DatePulled.value.toString()).toDateString();
    const input = new FormData();
    input.append('scoreOneTitle', this.scoreOneTitle.value);

    input.append('DatePulled', documentDate);
    input.append('scoreTwoTitle', this.scoreTwoTitle.value);
    input.append('scoreThreeTitle', this.scoreThreeTitle.value);
    input.append('LeaseId', this.leaseId);

    input.append('documentFile1', this.FileType1);
    input.append('documentFile2', this.FileType2);
    input.append('documentFile3', this.FileType3);
    input.append('LeaseNumber', this.leaseNumber);
    if (this.fileNameOne !== null) {
      input.append('fileNameOne', this.fileNameFirst);
    }

    if (this.fileNameTwo !== null) {
      input.append('fileNameTwo', this.fileNameSecond);
    }

    if (this.fileNameThree !== null) {
      input.append('fileNameThree', this.fileNameThird);
    }
    const fileBrowser1 = this.fileInput1.nativeElement;

    if (fileBrowser1.files && fileBrowser1.files[0]) {
      input.append('fileNameOne', fileBrowser1.files[0]);
    }
    const fileBrowser2 = this.fileInput2.nativeElement;
    if (fileBrowser2.files && fileBrowser2.files[0]) {
      input.append('fileNametwo', fileBrowser2.files[0]);
    }
    const fileBrowser3 = this.fileInput3.nativeElement;

    if (fileBrowser3.files && fileBrowser3.files[0]) {
      input.append('fileNameThree', fileBrowser3.files[0]);
    }
    return input;
  }

  clearFile() {
    this.addCreditScoreForm.get('file1').setValue(null);
    this.fileInput1.nativeElement.value = '';
    this.addCreditScoreForm.get('file2').setValue(null);
    this.fileInput2.nativeElement.value = '';

    this.addCreditScoreForm.get('file3').setValue(null);
    this.fileInput3.nativeElement.value = '';
  }
  get scoreOneTitle() { return this.addCreditScoreForm.get('scoreOneTitle'); }
  get scoreTwoTitle() { return this.addCreditScoreForm.get('scoreTwoTitle'); }
  get scoreThreeTitle() { return this.addCreditScoreForm.get('scoreThreeTitle'); }
  get fileNameOne() { return this.addCreditScoreForm.get('fileNameOne'); }
  get fileNameTwo() { return this.addCreditScoreForm.get('fileNameTwo'); }
  get fileNameThree() { return this.addCreditScoreForm.get('fileNameThree'); }
  get DatePulled() { return this.addCreditScoreForm.get('DatePulled'); }
  get file1() {
    return this.addCreditScoreForm.get('file1');
  }
  get file2() {
    return this.addCreditScoreForm.get('file2');
  }
  get file3() {
    return this.addCreditScoreForm.get('file3');
  }
  setFileOne($event): void {
    this.fileNameFirst = "Select File";
    this.profilePicOne = 'Select File';
    if (typeof this.fileInput1 != 'undefined') {
      this.commonService.uploadDocumentFileValidator($event);
      if (this.commonService.isUploadFileValid) {
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "30MB")
        if (this.commonService.isFileValid) {

          this.fileNameFirst = $event.target.files[0].name;
          this.FileType1 = $event.target.files[0].type;
          this.isValid = true;
        }
      }
    }
  }

  setFileTwo($event): void {
    this.fileNameSecond = "Select File";
    this.profilePicTwo = 'Select File';
    if (typeof this.fileInput2 != 'undefined') {
      this.commonService.uploadDocumentFileValidator($event);
      if (this.commonService.isUploadFileValid) {
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "30MB")
        if (this.commonService.isFileValid) {

          this.fileNameSecond = $event.target.files[0].name;
          this.FileType2 = $event.target.files[0].type;
          this.isValid = true;
        }
      }
    }
  }

  setFileThree($event): void {
    this.fileNameThird = "Select File";
    this.profilePicThree = 'Select File';
    if (typeof this.fileInput3 != 'undefined') {
      this.commonService.uploadDocumentFileValidator($event);
      if (this.commonService.isUploadFileValid) {
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "30MB")
        if (this.commonService.isFileValid) {

          this.fileNameThird = $event.target.files[0].name;
          this.FileType3 = $event.target.files[0].type;
          this.isValid = true;
        }
      }
    }
  }
}
