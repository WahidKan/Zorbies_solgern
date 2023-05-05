import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LenderlistService } from '../lenderlist.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {

  loadSave = false;
  bankId: any;
  documentId: any;
  document: any;
  fileName: any;
  dragForm: FormGroup;
  data: FormData;
  action: string = "Upload";

  @ViewChild('uploadDocument', { static: false }) uploadDocument: ModalDirective;
    @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  @Output() uploadDocuments = new EventEmitter();
  active = false;

  constructor(private fb: FormBuilder,
    private router: Router, private toaster: ToastrService,
    private lenderService: LenderlistService,
    private route: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    this.dragForm = this.fb.group({
      documentName: [''],
      olddocumentName:['']
    })
  }

  show(bankId: any, documentId: any) {
    this.fileName = null;
    this.data = null;
    this.bankId = bankId;
    if (documentId == null) {
      this.action = "Upload";
      this.dragForm = this.fb.group({
        documentName: [''],
        olddocumentName: ['']
      });
      this.fileInput.nativeElement.value = "";
    } else {
      this.action = "Update";
      this.documentId = documentId;
      this.getDocument(documentId);
    }
    this.uploadDocument.show();
  }

  getDocument(documentId: any) {
    this.loadSave = true;
    this.lenderService.getWebmergeDocument(documentId).subscribe(document => {
      this.loadSave = false;
      this.document = document;
      this.dragForm = this.fb.group({
        documentName: [document.name],
        olddocumentName: [document.name]
      });
    }, err => {
        this.loadSave = false;
    });
  }

  close() {
    this.active = false;
    this.fileName = null;
    this.uploadDocument.hide();
    this.uploadDocuments.emit();
  }

  submit() {
    this.loadSave = true;
    if (this.action == "Upload") {
      this.lenderService.uploadWebmergeDocument(this.data).subscribe(resp => {
        this.loadSave = false;
        if (resp.statusCode == 200) {
          this.toaster.success(resp.responseMessage);
          this.close();
        } else {
          this.toaster.success(resp.responseMessage);
        }
      }, err => {
        this.loadSave = false;
      });
    } else if (this.action == "Update") {
      if (this.data == null || this.data == undefined) {
        this.prepareFormDataForDocument();
      }
      this.lenderService.updateWebmergeDocument(this.documentId, this.data).subscribe(resp => {
        this.loadSave = false;
        if (resp.statusCode == 200) {
          this.toaster.success(resp.responseMessage);
          this.close();
        } else {
          this.toaster.success(resp.responseMessage);
        }
      }, err => {
        this.loadSave = false;
      });
    }

    
  }

  setFile($event): void {
    this.commonService.uploadDocumentFileValidator($event);
    this.commonService.uploadDocumentSize("pdf", $event.target.files[0].size, "30MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      this.prepareFormDataForDocument();
    }
  }  

  private prepareFormDataForDocument() {
    // console.log('In Prepare Form ' + this.dragForm.value.olddocumentName);
    const input = new FormData();
    input.append('documentName', this.dragForm.value.documentName);
    input.append('olddocumentName', this.dragForm.value.olddocumentName);
    input.append('bankId', this.bankId);
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    this.data = input;
  }

  get documentName() { return this.dragForm.get('documentName'); }
}
