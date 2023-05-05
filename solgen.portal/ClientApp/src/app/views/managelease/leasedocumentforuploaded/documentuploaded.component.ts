import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documentuploaded',
  templateUrl: './documentuploaded.component.html',
  styleUrls: ['./documentuploaded.component.scss']
})
export class DocumentuploadedComponent implements OnInit {
  documentForm: FormGroup;
  fileName: any;
  profilePic: any;
  isValid = true;
  userId: any;
  leaseID: any;
  loading = false;
  loadSave: boolean = false;
    @ViewChild('fileInput', { static: false }) fileInput;;
  @Output() refresh = new EventEmitter();
  constructor(private fb: FormBuilder, private commonService: CommonService,
    private router: Router, private toaster: ToastrService, private route: ActivatedRoute,
    private _location: Location, private leaseService: ManageleaseService, ) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('leaseId');
        
        if (id) {
          this.leaseID = id;
          this.loading = true;
        }
        this.loading = false;
        }
    );
    this.initForm();
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('LeaseId', this.leaseID);
    input.append('documentFileName', this.fileName);
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
      
      'documentFileName': [null, Validators.required],
      
    });
  }
  get LeaseId() { return this.documentForm.get('LeaseId'); }
  get documentFileName() { return this.documentForm.get('documentFileName'); }
  get file() {
    return this.documentForm.get('file');
  }
  cancelForm() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype04') {
        this.router.navigateByUrl("/lease/inprogresslease");
      }
      else {
        this.router.navigateByUrl("/lease");
      }
    });
  }
  setFile($event): void {
    this.fileName = "Select File";
    this.profilePic = 'Select File';
    this.commonService.uploadPDFFileValidator($event);
    if (this.commonService.isUploadFileValid) {
      this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "30MB")
      if (this.commonService.isFileValid) {

        this.fileName = $event.target.files[0].name;
        this.isValid = true;
      }
    }
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

    if (this.isValid) {
      const formDataDocumentModel = this.prepareFormDataForDocument();
      this.leaseService.saveUploadDocument(formDataDocumentModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          
          this.refresh.emit();
          this.documentFileName.reset();
          this.fileName = "Select File";
          this.documentFileName.reset();
          
          setTimeout(() => { this.loading = false; }, 1000);
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
}
