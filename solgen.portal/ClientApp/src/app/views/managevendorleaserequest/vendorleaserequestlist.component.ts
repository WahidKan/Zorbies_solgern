import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorleaserequestlistService } from './vendorleaserequestlist.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UploaddovendordocumentComponent } from './uploaddovendordocument.component';
import { VendorrequestdetailComponent } from './vendorrequestdetail/vendorrequestdetail.component';

@Component({
  selector: 'app-vendorleaserequestlist',
  templateUrl: './vendorleaserequestlist.component.html',
  styleUrls: ['./vendorleaserequestlist.component.scss']
})
export class VendorleaserequestlistComponent implements OnInit {
  @ViewChild('vendorNameSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('vendordocumentUploadModal', { static: false }) modalVendorLeaseModal: UploaddovendordocumentComponent;
  @ViewChild('vendorTitleWorkRequestModal', { static: false }) modalVendorTitlWorkRequest: VendorrequestdetailComponent;
  modulePermission: ModuleList;
  loginuserid: any;
  sortDir = 'desc';
  sortColumn = 'CreateTitleWorkRequestDate';
  docSortDir = 'desc';
  docSortColumn = 'DocumentCreatedOn';
  pageNumber = 0;
  lstPageSize: any;
  lstVendor: any;
  loading = false;
  leaseStatus: any = null;
  searhName: any;
  saleMan: any;
  expFrom: any;
  expTo: any;
  titleWorkRequest: any;
  leaseID: any;
  leaseAssignedBankId: any; venderEmailId: any;
  loadSave = false;
  pageSizeValue: number;
  commFrom: any;
  id: any
  pagedData: any = {
    pager: {},
    data: []
  };
  contactId: any;
  constructor(private vendorleaserequestlistService: VendorleaserequestlistService, private toaster: ToastrService, private router: Router, private activatedRoute: ActivatedRoute,
    private commonService: CommonService, private dialogService: ConfirmationDialogService, private routeActivate: ActivatedRoute) {
    this.vendorleaserequestlistService.getVendorList().subscribe((result: any) => {
      this.lstVendor = this.vendorleaserequestlistService.masters;
    })
    
  }

  ngOnInit() {
    this.vendorleaserequestlistService.getVendorList().subscribe((result: any) => {
      this.lstVendor = this.vendorleaserequestlistService.masters;;
    })
    this.pageSizeValue = 10;
    this.SearchVendorLeaseRequestLease();

    this.getPageSizes();
  }
  SetLeaseStatus(status: string) {
    this.leaseStatus = status;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  restddl() {
  }

  updateFilter(event) {
    this.searhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchVendorLeaseRequestLease();
    }
  }

  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchVendorLeaseRequestLease();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchVendorLeaseRequestLease();
  }
  onChange($eventSearchLease) {
    this.SearchVendorLeaseRequestLease();
  }
  SearchVendorLeaseRequestLease() {
    this.loading = true;
    if (typeof this.leaseStatus == 'undefined') { this.leaseStatus = null; }
    this.vendorleaserequestlistService.SearchVendorLeaseRequestLease(this.searhName, this.leaseStatus, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid, this.contactId).subscribe((response) => {
      this.pagedData = this.vendorleaserequestlistService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  ResetSearch() {
    this.table.sorts = [];
    this.searhName = "";
    this.sortDir = 'desc';
    this.sortColumn = 'CreateTitleWorkRequestDate';
    this.pageNumber = 0;
    this.pageSizeValue = 10;
    this.SearchVendorLeaseRequestLease();
  }

  UploadDocumentforVender(row: any) {
    this.modalVendorLeaseModal.show(row);
     
  }

  createTitleWorkRequest(LeaseId: any) {
      this.vendorleaserequestlistService.GetTitlWorkRequest(LeaseId).subscribe((res: any) => {
        if (res) {
        this.titleWorkRequest = res;
        this.modalVendorTitlWorkRequest.show(this.titleWorkRequest, true, this.leaseAssignedBankId,this.venderEmailId);
        this.loadSave = false;
      }
    }, error => {
      this.loadSave = false;
    })
  }
}
