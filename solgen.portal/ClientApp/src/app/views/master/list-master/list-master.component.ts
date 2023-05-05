import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ManageUserService } from '../../manageuser/addedituser.service';
import { Router } from '@angular/router';
import { CommonService, Master } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { MasterService, MasterNames } from '../master.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  templateUrl: './list-master.component.html',
 
})
export class ListMasterComponent implements OnInit {
  @ViewChild('clearDrop', { static: false }) clearDrop: NgSelectComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  id = "";
  loading = false;
  sortDir = 'desc';
  sortColumn = 'masterCreatedon';
  pagedData: any = {
    pager: {},
    data: []
  };
  masterdata: any
  listFilter = '';
  searchTxt = '';
  lstPageSize: any
  masterNameId: any;
  clearM
  pageSizeValue: number;
  master: Master[];
  loginuserid: any;
  loadSave: boolean = false;
  constructor(private masterService: MasterService,
    private commonService: CommonService, private router: Router,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }
   
  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.search();
    this.refresh();
    this.getMasterDropDown();
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loading = true;
    this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'asc';
    this.masterNameId = "undefined";

    this.clearDrop.clearModel();
    this.sortColumn = 'emailTemplateCreatedOn';
    this.pageSizeValue = 10;
    this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.masterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  getMasterDropDown() {
    this.masterService.getMasterDropDown().subscribe((response: any) => {
      this.masterdata = response;
    });
  }
  getMasterList() {
    this.masterService.getMasterList('', this.masterNameId, this.sortColumn, this.sortDir, 0, 10, this.id).subscribe((result: any) => {
      if (result) {
        this.master = result;
      }
    })
  }

  setPage($event) {
    this.loading = true;
    this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.masterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.masterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  ChangeStatus(row: any) {
    if (row.isActive == true) {
      row.isActive = false;
    }
    else {
      row.isActive = true;
    }
    this.masterService.setMasterStatus(row.MasterId, row.isActive).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.refresh();
      }
      else {
        this.toaster.error(result.responseMessage);
      }
    })
  }
  disable(row: any) {
    const message = `Are you sure you want to disable master  "${row.MasterNames}"?`;
    this.dialogService.confirm('Disable master', message).subscribe(confirmed => {
      if (confirmed) {
        this.masterService.setMasterStatus(row.MasterId,"False").subscribe(r => {
          this.toaster.success(`"${row.MasterNames}" has been disabled  successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  enable(row: any) {
    const message = `Are you sure you want to enable master  "${row.MasterNames}"?`;
    this.dialogService.confirm('Enable master', message).subscribe(confirmed => {
      if (confirmed) {
        this.masterService.setMasterStatus(row.MasterId, "True").subscribe(r => {
          this.toaster.success(`"${row.MasterNames}" has been enabled  successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  DeleteMasters(row: any) {
    const message = `Are you sure you want to delete master  "${row.MasterNames}"?`;
    this.dialogService.confirm('Delete master', message).subscribe(confirmed => {
      if (confirmed) {
        this.masterService.DeleteMaster(row.MasterId).subscribe(r => {
          this.toaster.success(`delete master "${row.MasterNames}"`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  DeleteMasters1(row: any) {
    this.masterService.DeleteMaster(row.masterId).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.refresh();
      }
      else {
        this.toaster.error(result.responseMessage);
      }
    })
  }

  restMasterddl() {
    this.masterNameId = 'undefined';
  }
  SetMasterValue(masternameId: string) {
    this.masterNameId = masternameId;
  }
}
