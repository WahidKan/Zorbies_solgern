import { Component, OnInit, ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { InsuarncerequestlistService } from './insuarncerequestlist.service';
import { CommonService, Master } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Insurance } from '../contact/contact.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadService } from '../shared/uploaddocument/upload.service';
import { InsurancerequestdetailComponent } from './insurancerequestdetail/insurancerequestdetail.component';


@Component({
  selector: 'app-insurancerequestlist',
  templateUrl: './insurancerequestlist.component.html',
  styleUrls: ['./insurancerequestlist.component.scss']
})
export class InsurancerequestlistComponent implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput;;
  @ViewChild('insurancerequestdetail', { static: false }) modalInsuranceRequest: InsurancerequestdetailComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  lstUserType: Master[];
  modulePermission: any;
  InsuranceComboList: any;
  loginuserid: any;
  files: any;
  loading = false;
  sortDir = 'asc';
  sortColumn = 'InsuranceDate';
  page = 0;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  SearhName = '';
  lstPageSize: any
  pageSizeValue: number;
  searchTxt = '';
  modalRef: BsModalRef;
  fileName = 'Select File';
  profilePic: any;
  LeaseNumber: any;
  isValid = true;
  insuranceRequest: any;
  documentForm: FormGroup;
  userId: any;
  documentType: any;
  LeaseId: any;
  DocumentName: any;
  config: any;
  loadSave: boolean = false;

  constructor(private insuranceService: InsuarncerequestlistService,
    private commonService: CommonService, private router: Router, private modalService: BsModalService, private fb: FormBuilder,
    private toaster: ToastrService, private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute, private uploadService: UploadService) {

    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
    const configure: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true
    }
    this.config = configure;
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.search();
    this.initForm();
    this.documentType = "documenttype12";
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }


  onChange($event) {
    this.loading = true;
    this.insuranceService.getInsuranceList(this.SearhName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.insuranceService.getInsuranceList(this.SearhName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      if (this.pagedData.data[0] != null) {
        this.DocumentName = this.pagedData.data[0].DocumentName;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  SetLeaseStatus(status: string) {
    this.listFilter = status;
  }

  reset() {
    this.table.sorts = [];
    this.loading = true;
    this.SearhName = '';
    this.sortDir = 'asc';
    this.sortColumn = 'InsuranceDate';
    this.pageSizeValue = 10;
    this.insuranceService.getInsuranceList(this.SearhName, this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.DocumentName = this.pagedData.data[0].DocumentName;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSelect($event) {
  }

  refresh() {
    this.loading = true;
    this.insuranceService.getInsuranceList(this.SearhName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.DocumentName = this.pagedData.data[0].DocumentName;
      this.loading = false;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.insuranceService.getInsuranceList(this.SearhName, this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.insuranceService.getInsuranceList(this.SearhName, this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  uploadDoc(template: TemplateRef<any>, leaseId: any, leaseNumber: any) {
    this.documentComment.reset();
    this.fileName = "Select File";
    this.documentTitle.reset();
    this.LeaseId = leaseId;
    this.LeaseNumber = leaseNumber;
    this.modalRef = this.modalService.show(template,this.config);
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
        this.files = $event.target.files[0];
      }
    }
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('documentName', this.DocumentName);
    input.append('documentFileName', this.fileName);
    input.append('documentComment', this.documentComment.value == null ? '' : this.documentComment.value);
    input.append('documentUploadedBy', this.userId);
    input.append('documentUploadedForUser', this.LeaseId);
    input.append('DocumentAddFor', "lease");
    input.append('PrefixNameOfDocument', this.LeaseNumber);
    input.append('documentTitle', this.documentTitle.value == null ? '' : this.documentTitle.value);
    input.append('documentAddedFrom', "createinsurancerequest")
    if (this.commonService.isUploadImageValid) {
      if (this.documentFileName.value !== null) {
        input.append('filename', this.documentFileName.value);
      }
    }
    
    input.append('file', this.files);
    return input;
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
      this.commonService.getLoggedInName.subscribe((userdetail: any) => {
        if (userdetail.id != null) {
          this.userId = userdetail.id;
        }
      });
      const formDataDocumentModel = this.prepareFormDataForDocument();
      this.uploadService.saveDocument(formDataDocumentModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.loading = false;
          this.refresh();
          this.modalRef.hide();
          this.documentComment.reset();
          this.documentFileName.reset();
          this.documentTitle.reset();
          this.fileName = "Select File";
          this.documentFileName.reset();
          
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
      this.loading = false;
    }
  }

  private initForm() {
    this.documentForm = this.fb.group({
      'documentFileName': [null, Validators.required],
      'documentComment': [''],
      'documentTitle': [null],
      
    });
  }

  get documentComment() { return this.documentForm.get('documentComment'); }
  get documentFileName() { return this.documentForm.get('documentFileName'); }
  get documentTitle() { return this.documentForm.get('documentTitle'); }
  get file() { return this.documentForm.get('file'); }
  

  DisplayInsuranceDetal(LeaseId: any) {
    this.insuranceService.getInsuranceDetail(LeaseId).subscribe((res: any) => {
      if (res) {
        this.insuranceRequest = res;
        this.modalInsuranceRequest.show(this.insuranceRequest);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    })
  }

}
