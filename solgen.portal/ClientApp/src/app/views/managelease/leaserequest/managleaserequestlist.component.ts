import { Component, OnInit } from '@angular/core';
import { ManageleaseService } from '../managelease.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-managleaserequestlist',
  templateUrl: './managleaserequestlist.component.html',
  styleUrls: ['./managleaserequestlist.component.scss']
})
export class ManagleaserequestlistComponent implements OnInit {
  pagedData: any = {
    pager: {},
    data: []
  };
  loading = false;
  isCustomer = false;
  sortDir = 'desc';
  pageSizeValue: any;
  sortColumn = 'CreatedOn';
  docSortDir = 'desc';
  docSortColumn = 'DocumentCreatedOn';
  lstPageSize: any
  modulePermission: ModuleList;
  searhName: any;
  pageNumber = 0;
  contactId: any;
  loadSave: boolean = false;

  loginuserid
  constructor(private leaseService: ManageleaseService, private commonService: CommonService, private dialogService: ConfirmationDialogService, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
    this.modulePermission = this.commonService.getPermission(4311);
  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {

      if (userdetail.userType === 'usertype05') {
        this.isCustomer = true;
      }
    });
    this.searhName = "";
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.SearchLease();
  }

  getLeaseRequestList() {
    this.leaseService.getLeaseRequestList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((res: any) => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  SearchLease() {
    this.loading = true;
    this.leaseService.getLeaseRequestList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue,this.loginuserid).subscribe((response) => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

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

  ResetSearch() {
    this.searhName = "";
    this.sortDir = 'desc';
    this.sortColumn = 'requestCreatedOn';
    this.pageNumber = 0;
    this.SearchLease();
  }

  //function is used to delete the Lease
  DeleteLease(row: any) {
    const message = `Are you sure you want to delete Proposal "${row.BusinessName}"?`;
    this.dialogService.confirm('Delete Proposal Request ', message).subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.deleteLeaseRequest(row.LeaseRequestId).subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toaster.success(`Proposal "${row.BusinessName}" has been deleted successfully`);
            this.ResetSearch();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {

        });
      }
    });
  }

}
