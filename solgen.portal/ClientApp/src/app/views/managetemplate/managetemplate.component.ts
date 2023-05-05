import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService, ModuleList } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { document } from 'ngx-bootstrap/utils';
import { NotificationDetailComponent } from '../notifications/notification-detail.component';
import { ManagetemplateService } from './managetemplate.service';
import { ManagetemplatedetailComponent } from './managetemplatedetail.component';

@Component({
  selector: 'app-managetemplate',
  templateUrl: './managetemplate.component.html',
  styleUrls: ['./managetemplate.component.scss']
})
export class ManagetemplateComponent implements OnInit {
  @ViewChild('temlateDetailModal', { static: false }) notificationDetailModal: ManagetemplatedetailComponent;
  pagedData: any = {
  pager: {},
  data: []
  };
  loading = false;
  isCustomer = false;
  sortDir = 'desc';
  pageSizeValue: any;
  sortColumn = 'TemplateCreatedOn';
  docSortDir = 'desc';
  docSortColumn = 'DocumentCreatedOn';
  lstPageSize: any
  modulePermission: ModuleList;
  searhName: any;
  pageNumber = 0;
  contactId: any;
  loginuserid
  loadSave: boolean = false;

  constructor(private leaseService: ManagetemplateService, private commonService: CommonService, private dialogService: ConfirmationDialogService, private toaster: ToastrService) {
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
    this.searhName = '';
    this.pageSizeValue = 10;
    this.getPageSizes();    
    this.SearchLease();
  }
  getManageLeaseTemplateList() {
    this.leaseService.getManageLeaseTemplateList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((res: any) => {
      this.pagedData = this.leaseService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  SearchLease() {
    this.loading = true;
    this.leaseService.getManageLeaseTemplateList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((response) => {
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
    this.searhName = '';
    this.sortDir = 'desc';
    this.sortColumn = 'LeaseCreatedOn';
    this.pageNumber = 0;
    this.SearchLease();
  }
  //function is used to disable the Lease Template
  disable(row) {
    const message = `Are you sure you want to disable this Proposal Template "${row.TemplateName}"?`;
    this.dialogService.confirm('Proposal Template', message).subscribe(confirmed => {
      if (confirmed) {
          this.leaseService.changeStatus(row.TemplateId).subscribe(r => {
          this.refresh();
          this.toaster.success(`"${row.TemplateName}" has been disabled   successfully `);
        }, error => {
        });
      }
    });
  }
  //function is used to enable the Lease Template
  enable(row) {
    const message = `Are you sure you want to enable this Proposal Template "${row.TemplateName}"?`;
    this.dialogService.confirm('Proposal Template', message).subscribe(confirmed =>  {
      if (confirmed) {
          this.leaseService.changeStatus(row.TemplateId).subscribe(response => {
          this.refresh();
          this.toaster.success(`"${row.TemplateName}" has been enabled  successfully`);
          }, error => {
        });
      }
    });
  }
  displayDetailDetail(TemplateName: any) {
    this.notificationDetailModal.show(TemplateName);
  }
  refresh() {
    this.loading = true;
    this.leaseService.getManageLeaseTemplateList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
    this.pagedData = this.leaseService.pagedData;
    this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  //function is used to delete the Lease Template
  deleteLeaseTemplatebyId(row) {
    const message = `Are you sure you want to delete Proposal Template"${row.TemplateName}"?`;
    this.dialogService.confirm('Delete Proposal Template ', message).subscribe(confirmed => {
      if (confirmed) {
        this.leaseService.deleteLeaseTemplatebyId(row.TemplateId).subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toaster.success(`Proposal Template"${row.TemplateName}" has been deleted successfully`);
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
  popUpOpen() {

  }
}
