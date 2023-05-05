import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { UCCFiling, ManageleaseService } from '../managelease.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-prepare-ucc-filling',
  templateUrl: './prepare-ucc-filling.component.html',
  styleUrls: ['./prepare-ucc-filling.component.scss']
})
export class PrepareUccFillingComponent implements OnInit {
  @ViewChild('prepareUCC', { static: false }) modalucc: ModalDirective;
    @ViewChild('fileInput', { static: false }) fileInput;;
  @Output() uccFilling = new EventEmitter();
  active = false;
  prepareUCCForm: FormGroup;
  uccFiling: UCCFiling = new UCCFiling();
  loadSave = false;
  Id: string;
  typeofdoc = "directupload";
  fileName = 'Select File';
  profilePic: any;
  isValid = true;
  isBankUser = false;
  LeaseNumber: string;
  dateTime = new Date();
  lstStates: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private commonService: CommonService,
    private leaseService: ManageleaseService,
    private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.modalucc.hide();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('leaseId');
        if (id) {
          this.Id = id;
          this.uccFiling.documentUploadedForUser = id;
          this.getLeaseDetails(id, this.isBankUser)
        }
      });
    this.loadStateDropdown();
    this.inituccFilingForm();
    this.prepareUCCFillingRequestActionOnChange();
  }

  loadStateDropdown() {
    this.commonService.getStatesList().subscribe(res => {
      this.lstStates = this.commonService.states;
    });
  }

  prepareUCCFillingRequestActionOnChange() {
    this.prepareUCCFillingRequestAction.valueChanges.subscribe(m => {
      if (m == "directupload") {
        this.typeofdoc = "directupload";
        this.documentTitle.setValidators(Validators.nullValidator);
        this.documentTitle.updateValueAndValidity();
        this.documentRefNumber.setValidators(Validators.required);
        this.documentRefNumber.updateValueAndValidity();
        this.uccFilingState.setValidators(Validators.nullValidator);
        this.uccFilingState.updateValueAndValidity();
        this.documentFileName.setValidators(Validators.required);
        this.documentFileName.updateValueAndValidity();
        this.tXUCCDraft.clearValidators();
        this.tXUCCDraft.updateValueAndValidity();
        this.tXUCCDraft.reset();
        this.receiptNumDraft.clearValidators();
        this.receiptNumDraft.updateValueAndValidity();
        this.receiptNumDraft.reset();
        this.prepareUCCFillingRequestReminder.clearValidators();
        this.prepareUCCFillingRequestReminder.updateValueAndValidity();
        this.prepareUCCFillingRequestReminder.reset();
      } else {
        this.typeofdoc = "";
        this.fileName = 'Select File';
        this.documentTitle.clearValidators();
        this.documentTitle.updateValueAndValidity();
        this.documentTitle.reset();
        this.documentRefNumber.setValidators(Validators.nullValidator);
        this.documentRefNumber.updateValueAndValidity();
        this.documentRefNumber.reset();
        this.uccFilingState.clearValidators();
        this.uccFilingState.updateValueAndValidity();
        this.uccFilingState.reset();
        this.documentFileName.clearValidators();
        this.documentFileName.updateValueAndValidity();
        this.tXUCCDraft.setValidators(Validators.required);
        this.tXUCCDraft.updateValueAndValidity();
        this.receiptNumDraft.setValidators(Validators.required);
        this.receiptNumDraft.updateValueAndValidity();
        this.prepareUCCFillingRequestReminder.setValidators(Validators.nullValidator);
        this.prepareUCCFillingRequestReminder.updateValueAndValidity();
      }
    });
  }

  close() {
    this.active = false;
    this.documentRefNumber.reset();
    this.uccFilingState.reset();
    this.tXUCCDraft.reset();
    this.receiptNumDraft.reset();
    this.documentTitle.reset();
    this.prepareUCCFillingRequestAction.setValue("directupload");
    this.fileName = 'Select File';
    this.modalucc.hide();
  }

  show() {
    this.modalucc.show();
    this.active = true;
  }

  get file() {
    return this.prepareUCCForm.get('file');
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

  private prepareFormDataForDocument(type) {
    const input = new FormData();
    if (this.typeofdoc === "" && type === 1 && this.prepareUCCFillingRequestReminder.value!==null) {
      let prepareUCCFillingRequestReminder = new Date(this.prepareUCCFillingRequestReminder.value.toString());
      input.append('prepareUCCFillingRequestReminder', prepareUCCFillingRequestReminder.toDateString());
    }
    
    input.append('documentTitle', this.documentTitle.value == null ? '' : this.documentTitle.value);
    input.append('documentUploadedForUser', this.documentUploadedForUser.value);
    input.append('documentRefNumber', this.documentRefNumber.value);
    input.append('uccFilingState', this.uccFilingState.value);
    input.append('prepareUCCFillingRequestAction', this.prepareUCCFillingRequestAction.value)
    input.append('prefixNameOfDocument', this.LeaseNumber)
    input.append('tXUCCDraft', this.tXUCCDraft.value)
    input.append('receiptNumDraft', this.receiptNumDraft.value)
   
    if (this.typeofdoc === "directupload") {
      if (this.commonService.isUploadImageValid) {
        if (this.documentFileName.value !== null) {
          input.append('filename', this.documentFileName.value);
        }
      }
      const fileBrowser = this.fileInput.nativeElement;
      if (fileBrowser.files && fileBrowser.files[0]) {
        input.append('file', fileBrowser.files[0]);
      }
    }
    return input;
  }

  save() {
    if ((this.typeofdoc === "directupload") && (this.fileName === null || this.fileName === ''
      || typeof this.fileName === 'undefined'
      || this.fileName == 'Select File')) {
      this.isValid = false;
    }
    else {
      this.isValid = true;
    }
    if (this.isValid && this.prepareUCCForm.valid) {
      this.loadSave = true;
      const formDataDocumentModel = this.prepareFormDataForDocument(1);
      this.leaseService.prepareUCCFilingRequest(formDataDocumentModel).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success(`UCC Filing Request has been saved successfully`);
          this.uccFilling.emit();
          this.documentTitle.reset();
          this.documentRefNumber.reset();
          this.uccFilingState.reset();
          this.tXUCCDraft.reset();
          this.receiptNumDraft.reset();
          this.prepareUCCFillingRequestReminder.reset();
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
      this.commonService.validateAllFormFields(this.prepareUCCForm);
    }
  }

  getLeaseDetails(id: any, isBankUser: boolean) {
    this.leaseService.getLeaseDetails(id, isBankUser).subscribe((res: any) => {
      if (res) {
        this.LeaseNumber = res.leaseNumber;
      }
    });
  }

  skip() {
    this.prepareUCCFillingRequestAction.setValue("skip");
    const message = `Are you sure you want to skip the step?`;
    this.dialogService.confirm('Skip UCC filing step', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        const formDataDocumentModel = this.prepareFormDataForDocument(0);
        this.leaseService.prepareUCCFilingRequest(formDataDocumentModel).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success(`UCC Filing Request has been skipped successfully`);
            this.uccFilling.emit();
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
      } else {
        this.prepareUCCFillingRequestAction.setValue("directupload");
      }
    });
  }

  private inituccFilingForm() {
    this.prepareUCCForm = this.fb.group({
      documentUploadedForUser: [this.uccFiling.documentUploadedForUser, Validators.nullValidator],
      documentTitle: [null],
      documentFileName: [null, Validators.required],
      documentRefNumber: [null, Validators.required],
      prepareUCCFillingRequestAction: ['directupload'],
      prefixNameOfDocument: [''],
      tXUCCDraft: [null, Validators.nullValidator],
      receiptNumDraft: [null, Validators.nullValidator],
      prepareUCCFillingRequestReminder: [''],
      uccFilingState:[null],
    });
  }

  get documentUploadedForUser() { return this.prepareUCCForm.get('documentUploadedForUser'); }
  get documentTitle() { return this.prepareUCCForm.get('documentTitle'); }
  get documentFileName() { return this.prepareUCCForm.get('documentFileName'); }
  get documentRefNumber() { return this.prepareUCCForm.get('documentRefNumber'); }
  get prepareUCCFillingRequestAction() { return this.prepareUCCForm.get('prepareUCCFillingRequestAction') }
  get prefixNameOfDocument() { return this.prepareUCCForm.get('prefixNameOfDocument') }
  get tXUCCDraft() { return this.prepareUCCForm.get('tXUCCDraft'); }
  get receiptNumDraft() { return this.prepareUCCForm.get('receiptNumDraft') }
  get prepareUCCFillingRequestReminder() { return this.prepareUCCForm.get('prepareUCCFillingRequestReminder'); }
  get uccFilingState() { return this.prepareUCCForm.get('uccFilingState'); }
  
  
}

