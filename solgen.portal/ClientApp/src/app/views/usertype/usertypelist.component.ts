import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModuleList, CommonService } from '../shared/common.service';
import { UsertypeserviceService } from './usertypeservice.service';

@Component({
  selector: 'app-usertypelist',
  templateUrl: './usertypelist.component.html',
  styleUrls: ['./usertypelist.component.scss']
})
export class UsertypelistComponent implements OnInit {

  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';

  lstPageSize: any
  pageSizeValue: number;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = false;

  constructor(private usertypeserviceService: UsertypeserviceService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERTYPEADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERTYPEUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERTYPEDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.usertypeserviceService.pagedData;
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

  onChange($event) {
    this.loading = true;
    this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.usertypeserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.usertypeserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  search() {
    this.loading = true;
    this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.usertypeserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.loading = true;
    this.listFilter = '';
    this.searchUserType = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.usertypeserviceService.GetUserTypeList(this.listFilter, '', this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.usertypeserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  DeleteUser(row: any) {
    const message = `Are you sure you want to delete user type "${row.MasterValue}"?`;
    this.dialogService.confirm('Delete user type ', message).subscribe(confirmed => {
      if (confirmed) {
        this.usertypeserviceService.deleteUserType(row.MasterId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.refresh();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.usertypeserviceService.GetUserTypeList(this.listFilter,'', this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.usertypeserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
