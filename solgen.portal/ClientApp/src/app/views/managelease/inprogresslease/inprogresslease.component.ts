import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LeaseapproveforpurchasedetailComponent } from '../leaseapproveforpurchasedetail/leaseapproveforpurchasedetail.component';

@Component({
  selector: 'app-inprogresslease',
  templateUrl: './inprogresslease.component.html',
  styleUrls: ['./inprogresslease.component.scss']
})
export class InprogressleaseComponent implements OnInit {
  loadSave: boolean = false;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('typeSelect', { static: false }) typeSelect: NgSelectComponent;
  @ViewChild('leaseapproveforpurchasedetailModal', { static: false }) appriveforpurchaseview: LeaseapproveforpurchasedetailComponent;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'LeaseCreatedOn';
  pageNumber = 0;
  modulePermission: ModuleList;
  contactId: any;
  lstLeaseType = ['InProgress Lease','Approved for Purchase'];
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  searhName: any;
  leaseStatus: any;
  saleMan: any;
  expFrom: any;
  expTo: any;
  commFrom: any;
  isAdminUserAndSuperAdmin = false;
  commTo: any;
  isShowAddLease = true;
  isBankUser = false;
  isCustomerUser = false;
  isShowUpdateLease = true;
  isShowDeleteLease = true;
  loginuserid: any;
  isShowEditLease = true;
  isOperationUser = false;
  constructor(private leaseService: ManageleaseService, private toaster: ToastrService, private router: Router, private activatedRoute: ActivatedRoute,
    private commonService: CommonService, private dialogService: ConfirmationDialogService, private routeActivate: ActivatedRoute) {
    const moduleCode = this.routeActivate.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let leasestatus = params['statusId'];
      if (leasestatus == "1dd74585-e8ea-4afc-bd36-9a17517b7fd4") {
        this.leaseStatus = "Approved for Purchase";
      }
      else if (leasestatus == "1dd74585-e8ea-4afc-bd36-9a17517b7fd5") {
        this.leaseStatus = "InProgress Lease";
      }
      else {
        this.leaseStatus = null;
      }
    });
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype02') {
        this.isOperationUser = true;
      }
      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
      }
      if (userdetail.userType == 'usertype01' || userdetail.userType == 'usertype06') {
        //delete button should display only to superadmin and admin
        this.isAdminUserAndSuperAdmin = true;
      }

      if (userdetail.userType === 'usertype05') {
        //If user Type is Customer User the show add button update and Delete
        this.isShowAddLease = true;
        this.isShowUpdateLease = true;
        this.isShowDeleteLease = true;
        this.isCustomerUser = true;
      }
      else {
        if (this.modulePermission != null) {
          this.isShowAddLease = (this.modulePermission.roleModuleAddFlag ? true : false);
          this.isShowUpdateLease = (this.modulePermission.roleModuleReadFlag ? true : false);
          this.isShowDeleteLease = (this.modulePermission.roleModuleDeleteFlag ? true : false);
          this.isShowEditLease = (this.modulePermission.roleModuleUpdateFlag ? true : false);
        }
        else {
          this.isShowAddLease = false;
          this.isShowUpdateLease = false;
          this.isShowDeleteLease = false;
        }
      }

      if (userdetail.userType == 'usertype04') {
        this.isBankUser = true;
      }

    });
    this.searhName = ""
    this.pageSizeValue = 10;
    this.getPageSizes();

    this.routeActivate.queryParams
      .filter(params => params.contactid)
      .subscribe(params => {
        this.contactId = params.contactid;
      });

    this.SearchLease();
  }

  DisplayApprovalOfBank(row: any) {
    let note = (row.LenderNotes == "") ? "N/A" : row.LenderNotes;
    let AapproveBy = row.IsApprovedForPurchaseByUser;
    let ApproveOn = row.IsApprovedForPurchaseDate;
    this.appriveforpurchaseview.show(note, AapproveBy, ApproveOn);
  }
  SearchLease() {
    this.loading = true;
    this.leaseService.getLeaseListByStatus(this.searhName, (this.leaseStatus == "Approved for Purchase" ? "A" : this.leaseStatus == "InProgress Lease" ? "P" : this.leaseStatus = null), this.saleMan, this.expFrom, this.expTo, this.commFrom, this.commTo, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid, false, this.contactId).subscribe((response) => {
      this.pagedData = this.leaseService.pagedData;

      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  ResetSearch() {
    this.table.sorts = [];
    this.searhName = "";
    this.leaseStatus = "";
    this.typeSelect.clearModel();
    this.sortDir = 'desc';
    this.sortColumn = 'LeaseCreatedOn';
    this.pageNumber = 0;
    this.pageSizeValue = 10;
    this.expFrom = null;
    this.expTo = null;
    this.commFrom = null;
    this.commTo = null;
    this.SearchLease();
  }

  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.searhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchLease();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($eventSearchLease) {
    this.pageNumber = 0;
    this.SearchLease();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchLease();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;
    this.SearchLease();
  }

  ApproveLease(row: any) {
    const message = `Are you sure you want to Approve Lease for "${row.BusinessName}"?`;
    this.dialogService.confirm('Lease Approve', message).subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.changeLeaseStatus(row.LeaseId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.SearchLease();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

}
