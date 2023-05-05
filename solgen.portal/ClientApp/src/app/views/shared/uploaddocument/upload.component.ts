import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UploadService } from './upload.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../common.service';
import { DocumentlistComponent } from './documentlist.component';
import { concat } from 'rxjs';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit, OnChanges {
    
  @Input("contactId") contactId: any;
  @Input("prefixNameOfDocument") prefixNameOfDocument: any;
  @Input("DocumentAddFor") DocumentAddFor: any
  @Input("isCustomerAllForms") isCustomerAllForms: any;
  @Input() reloadPage = false;
  @Input("calledFrom") calledFrom: any;
 uploadList: any = {
    pager: {},
    data: []
 };
  loadSave: boolean = false;

  id = "";
  sortDir = 'desc';
  pageNumber = 0;
  pageSizeValue = 10;
  sortColumn = 'UploadedOn';
  loading = false;
  lstPageSize: any
  moduleLeaseContactPermission: ModuleList;
  addDocPermission: boolean = true;
  DeleteDocPermission: boolean = true;

  ngOnChanges(): void {
    if (this.reloadPage) {
      this.getDocuments();
    }
    }
  constructor(private uploadService: UploadService
    ,private commonService: CommonService)
  {
    
  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (this.calledFrom == "lease") {//called from Lease page
        if (userdetail.userType == 'usertype04') {//bankuser
          this.moduleLeaseContactPermission = this.commonService.getPermission(4510);
        }
        else {
          this.moduleLeaseContactPermission = this.commonService.getPermission(1020);
        }
      }
      else if (this.calledFrom == "contact") {//called from contact page
        this.moduleLeaseContactPermission = this.commonService.getPermission(1600);
      }
      if (this.moduleLeaseContactPermission != null) {
        this.addDocPermission = this.moduleLeaseContactPermission.roleModuleAddFlag;
        this.DeleteDocPermission = this.moduleLeaseContactPermission.roleModuleDeleteFlag;
      }
      if (userdetail.userType == 'usertype05') {//customer
        this.addDocPermission = true; this.DeleteDocPermission = true;
      }
      if (userdetail.userType == 'usertype04') {//bank
        this.addDocPermission = this.moduleLeaseContactPermission.roleModuleReadFlag;
        this.DeleteDocPermission = this.moduleLeaseContactPermission.roleModuleReadFlag;
      }
    });
    this.pageSizeValue = 10;
    this.getDocuments();
  
    this.getPageSizes();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.uploadService.getDocumentList(this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.contactId, this.isCustomerAllForms).subscribe(response => {
      this.uploadList = this.uploadService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  getDocuments() {
    this.loading = true;
    this.uploadService.getDocumentList(this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.contactId, this.isCustomerAllForms ).subscribe(response => {
      this.uploadList = this.uploadService.pagedData;
      // // console.log("DocumentLists", this.uploadList);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  getDocumentsOnSort(sortDir: any, sortColumn: any, pageNumber: any, pageSizeValue: any) {
    this.loading = true;
    this.uploadService.getDocumentList(sortColumn, sortDir, pageNumber, this.pageSizeValue, this.contactId, this.isCustomerAllForms).subscribe(response => {
      this.uploadList = this.uploadService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  getDocumentsSetPage( pageNumber: any) {
    this.loading = true;
    this.uploadService.getDocumentList(this.sortColumn, this.sortDir, pageNumber, this.pageSizeValue, this.contactId, this.isCustomerAllForms).subscribe(response => {
      this.uploadList = this.uploadService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  getDocumentsOnChange( pageSizeValue: any) {
    this.loading = true;
    this.uploadService.getDocumentList(this.sortColumn, this.sortDir, this.pageNumber, pageSizeValue, this.contactId, this.isCustomerAllForms).subscribe(response => {
      this.uploadList = this.uploadService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
}
