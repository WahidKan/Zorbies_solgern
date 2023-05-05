import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModuleList, CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { LeasefundingpackagelistService } from './leasefundingpackagelist.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LeasefundingpackagedetailComponent } from './leasefundingpackageview/leasefundingpackagedetail.component';
import { ManageleaseService } from '../managelease/managelease.service';
import { LeaseFundingStatusDetailComponent } from './lease-funding-status-detail/lease-funding-status-detail.component';

@Component({
  selector: 'app-leasefundingpackagelist',
  templateUrl: './leasefundingpackagelist.component.html',
  styleUrls: ['./leasefundingpackagelist.component.scss']
})
export class LeasefundingpackagelistComponent implements OnInit {
  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('leasefundingpackageviewDocModal', { static: false }) childReviewdoc: LeasefundingpackagedetailComponent;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  @ViewChild('leaseFundingStatusModal', { static: false }) fundingStatusModalview: LeaseFundingStatusDetailComponent;
  modulePermission: ModuleList;
  loginuserid: any;
  sortDir = 'desc';
  sortColumn = 'LeaseCreatedOn';
  docSortDir = 'desc';
  docSortColumn = 'DocumentCreatedOn';
  pageNumber = 0;
  lstPageSize: any;
  lstUserType: any;
  loading = false;
  leaseStatus: any = null;
  searhName: any;
  saleMan: any;
  isApprovedForFund: any;
  expFrom: any;
  expTo: any;
  leaseID: any;
  loadSave = false;
  pageSizeValue: number;
  commFrom: any;
  id: any
  pagedData: any = {
    pager: {},
    data: []
  };
  contactId: any;
  commTo: any;
  pagedDataLeaseFunding: any = {
    pager: {},
    data: []
  };
  isShowEditLease;
  isShowAddLease;
  isOperationUser;

  constructor(private leasefundingPackageService: LeasefundingpackagelistService, private toaster: ToastrService, private router: Router, private activatedRoute: ActivatedRoute, private leaseService: ManageleaseService,
    private commonService: CommonService, private dialogService: ConfirmationDialogService, private routeActivate: ActivatedRoute) {
    const moduleCode = this.routeActivate.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.leaseStatus = params['statusId'];
     
    });
    this.commonService.getMasterItemsList("lease").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    this.pageSizeValue = 10;
    this.SearchFundingLease();
   
    this.getPageSizes();
  }

  UpdateFilterFundingPackage() {
    this.SearchFundingLease();
  }
  SearchFundingLease() {
    this.loading = true;
    if (typeof this.leaseStatus == 'undefined') { this.leaseStatus = null; }
    this.leasefundingPackageService.getLeaseFundingPackageList(this.searhName, this.leaseStatus, this.saleMan, this.expFrom, this.expTo, this.commFrom, this.commTo, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid, false, this.contactId).subscribe((response) => {
      this.pagedDataLeaseFunding = this.leasefundingPackageService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  ResetSearch() {
    this.table.sorts = [];
    this.searhName = "";
    this.sortDir = 'desc';
    this.sortColumn = 'LeaseCreatedOn';
    this.pageNumber = 0;
    this.pageSizeValue = 10;

    this.expFrom = null;
    this.expTo = null;
    this.commFrom = null;
    this.commTo = null;
    this.userTypeSelect.clearModel();
    this.leaseStatus = null;
    this.SearchFundingLease();
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  restddl() {
  }
  SetLeaseStatus(status: string) {
    this.leaseStatus = status;
  }
  updateFilter(event) {
    this.searhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchFundingLease();
    }
  }
  
  onChange($eventSearchLease) {
    this.SearchFundingLease();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchFundingLease();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchFundingLease();
  }
  approveLeaseForBankUser(leaseId: any) {
    const message = `Are you sure you want to Approved Proposal for Funding?`;
    this.dialogService.confirm('Approved Proposal Funding', message).subscribe(confirmed => {
        if (confirmed) {
          this.leasefundingPackageService.approveLeaseForBankUser(leaseId).subscribe((result: any) => {
            if (result.statusCode == 200) {
              this.toaster.success(result.responseMessage);
              this.SearchFundingLease();
            }
            else {
              this.toaster.error(result.responseMessage);
            }
          })
        }
      });
    }

  displayDetail(row: any) {
    this.loadSave = false;
    this.loading = true;
    this.leaseID= row.LeaseId;
    this.isApprovedForFund = row.IsApprovedForFund;
    this.leaseService.getFundingPackageleaseReviewDoc(row.LeaseId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue).subscribe(response => {

      this.loading = false;
      this.pagedData = this.leaseService.pagedData;
      this.childReviewdoc.show(this.pagedData, this.leaseID, this.isApprovedForFund);
    }, error => {
      this.loading = false;
    })
  }

  DisplayApprovalOfBank(row: any) {
    let note = (row.LenderNotes == "") ? "N/A" : row.LenderNotes;
    let AapproveBy = row.IsApprovedForPurchaseByUser;
    let ApproveOn = row.IsApprovedForPurchaseDate;
    this.fundingStatusModalview.show(note, AapproveBy, ApproveOn);
  }
 }
