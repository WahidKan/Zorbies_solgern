import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { BulkuploadService, BulkUpload, RootJsonObject, ContactGuarantorInformation, ContactInformation } from './bulkupload.service';
import { CommonService } from '../shared/common.service';
import {  FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { parse } from 'path';



@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.scss']
})
export class BulkuploadComponent implements OnInit {
  @ViewChild('fileInput', { static: false })
  myInputVariable: ElementRef;
  bulkUpload: BulkUpload[] = [];
  rootJsonObject: RootJsonObject[] = [];
  sheetone: ContactInformation[] = [];
  sheettwo: ContactGuarantorInformation[] = [];
  loginuserid: any;
  errorMsg: string = "";
 respMsg: string = "";
  isError = false;
  isresp = false;
  isValid = true;
  file: any;
  fileName = 'Select File';
  loading = false;
  loadSave: boolean = false;
  excelDocumentNameLink: string;
  constructor(private toaster: ToastrService, private fb: FormBuilder, private bulkuploadService: BulkuploadService,
    private commonService: CommonService ,private router: Router,) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }
  ngOnInit() {
    this.excelDocumentNameLink ="/assets/uploads/Document/CustomerBulkUploadFile.xlsx";
  }

  onFileChange($event) {
    this.loading = true;
    try {
      this.commonService.uploadBulkFileValidator($event);

      if (this.commonService.isUploadFileValid) {
        this.commonService.uploadBulkFileSize("xlsx", $event.target.files[0].size)
        if (this.commonService.isFileValid) {
          this.file = $event.target.files[0];
          this.fileName = $event.target.files[0].name;
          this.isValid = true;
        }
        else {
          this.myInputVariable.nativeElement.value = "";
          this.fileName = "Select File";
          this.isError = false;
        }
      }
      else {
        this.myInputVariable.nativeElement.value = "";
        this.fileName = "Select File";
        this.isError = false;
      }
    }
    catch (err) { }
    this.loading = false;
  }

  saveBulkUpload() {
    this.loading = true;
    if (this.fileName === null || this.fileName === ''
      || typeof this.fileName === 'undefined'
      || this.fileName == 'Select File') {
      this.isValid = false;
      this.loading = false;
      this.myInputVariable.nativeElement.value = "";
    }

    else {
      if (this.isValid) {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = this.file;
        reader.onload = (event) => {
          const data = reader.result;
          workBook = XLSX.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          var form = new FormData()
          form.append('Id', this.loginuserid);
          form.append('bulkUploadJSONObject', JSON.stringify(jsonData));
          this.bulkuploadService.saveBulkUpload(form).subscribe((result: any) => {
            if (result.statusCode == 200) {
              this.isError = false;
              this.fileName = "Select File"
              this.loading = false;
              this.isresp = true;
              this.respMsg = result.responseMessage;
              this.myInputVariable.nativeElement.value = "";
              this.toaster.success("Data is saved successfully.");
            }
            else {
              this.isresp = false;
              this.loading = false;
              this.isError = true;
              this.myInputVariable.nativeElement.value = "";
              this.errorMsg = result.responseMessage;
            }
          },
            error => {
              this.isresp = false;
              this.myInputVariable.nativeElement.value = "";
              this.toaster.error("oops. something went wrong please contact your administrator");
              this.loading = false;
            })
        }
       
        setTimeout(() => { reader.readAsBinaryString(file); }, 500);
      }
      else {
        this.loading = false;
      }
    }
  }

  cancel() {
  this.loading = false;
    this.router.navigateByUrl("/contact");
  }
  }
