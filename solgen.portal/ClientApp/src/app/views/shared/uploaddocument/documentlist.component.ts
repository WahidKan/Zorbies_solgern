import { Component, OnInit, Input, TemplateRef, HostListener } from '@angular/core';
import { UploadService } from './upload.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { UploadComponent } from './upload.component';
import { CommonService, ModuleList } from '../common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html'
})
export class DocumentlistComponent implements OnInit {
  @Input("contactId") contactId: any;
  @Input("isCustomerAllForms") isCustomerAllForms: any;
  @Input("prefixNameOfDocument") prefixNameOfDocument: any;
  @Input('calledFrom') calledFrom: any;
  id = "";
  sortDir = 'desc';
  pageNumber: any;
  sortColumn = 'createdOn';
  @Input() pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  lstPageSize: any
  pageSizeValue: number;
  @Input() loading = false;
  moduleLeaseContactPermission: ModuleList;
  addDocPermission = true;
  DeleteDocPermission = true;
  isBankUser: any;
  viewerUrl: any;
  showAddedBy = false;
  isSalesUser: any;
  //urls: string;
  modalRef: BsModalRef;
  filename: any;
  docFilename: string;
  viewer: any;
  loadSave: boolean = false;

  constructor(private documentService: UploadService
    , private dialogService: ConfirmationDialogService
    , private toaster: ToastrService
    , private commonService: CommonService
    , private UploadComponent: UploadComponent
  ,private modalService: BsModalService) { }

  ngOnChanges(): void {
  }

  ngOnInit() {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (this.UploadComponent.calledFrom == "lease") {
        if (userdetail.userType == 'usertype04') {//bankuser
          this.moduleLeaseContactPermission = this.commonService.getPermission(4510);
        }
        else {
          this.moduleLeaseContactPermission = this.commonService.getPermission(1020);
        }
      }
      else if (this.UploadComponent.calledFrom == "contact") {
        this.moduleLeaseContactPermission = this.commonService.getPermission(1600);
      }
      if (this.moduleLeaseContactPermission != null) {
        this.addDocPermission = this.moduleLeaseContactPermission.roleModuleAddFlag;
        this.DeleteDocPermission = this.moduleLeaseContactPermission.roleModuleDeleteFlag;
      }
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
      }
      if (userdetail.userType == 'usertype03') {  //Sales User
        this.isSalesUser = true;
      }
      if (userdetail.userType == 'usertype05') {//customer
        this.addDocPermission = false;
        this.DeleteDocPermission = false;
        this.showAddedBy = true;
      }
    });
    this.pageSizeValue = 10;
    this.getPageSizes();
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  DeleteDocument(row: any) {
    const message = `Are you sure you want to delete this document  "${row.DocumentName}"?`;
    this.dialogService.confirm('Delete document', message).subscribe(confirmed => {
      if (confirmed) {
        this.documentService.DeleteDocument(row.DocumentId).subscribe(r => {
          this.toaster.success(`Document "${row.DocumentName}" deleted successfully.`);
          this.UploadComponent.getDocuments();
        }, error => {
        });
      }
    });
  }
  onChange($event) {
    
    this.pageSizeValue = $event.text;
    this.UploadComponent.getDocumentsOnChange(this.pageSizeValue);
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.UploadComponent.getDocumentsOnSort(this.sortDir, this.sortColumn, this.pageNumber, this.pageSizeValue);
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.UploadComponent.getDocumentsSetPage(this.pageNumber);
  }


  viewDocument(template: TemplateRef<any>, DocumentFileName: any) {
    // // console.log('FileName', DocumentFileName)
    //this.documentComment.reset();
    //this.fileName = "Select File";
    //this.documentTitle.reset();
    //this.LeaseId = leaseId;
    this.filename = DocumentFileName;
    this.modalRef = this.modalService.show(template);
  }
  viewDocDocument(template: TemplateRef<any>, DocumentFileName: any) {
    // // console.log('FileNameDoc', DocumentFileName)
    this.docFilename = DocumentFileName;
    //this.docFilename.toLowerCase();
      //this.viewerUrl = 'http://stage.solgen.com/\\src\\assets\\Uploads\\LeaseDocuments\Lease202081_637238950349694705.docx';
    this.modalRef = this.modalService.show(template);
  }

  onRightClick(event) {
    if (this.isSalesUser) {
      return false;
    }
  }
  onRightDocClick()
  {
    if (this.isSalesUser) {
      return false;
    }
  }
  disablecopypaste() {
    if (this.isSalesUser)
      return false;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67 && this.isSalesUser)
      return false;
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86 && this.isSalesUser)
      return false;
  }

}
