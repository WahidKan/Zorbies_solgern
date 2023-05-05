import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from './role.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { UserListingPopUpComponent } from './userlistingpopup/userlistingpopup.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild('ServiceUsersListPopUp', { static: false }) ServiceUsersListPopup: UserListingPopUpComponent;
  @ViewChild('clearDrp', { static: false }) clearDrop: NgSelectComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  loadSave: boolean = false;

  id = "";
  loading = false;
  //modulePermission: ModuleList;
  sortDir = 'desc';
  sortColumn = 'RoleCreatedDate';
  pagedData: any = {
    pager: {},
    data: []
  };
  roledata: any
  listFilter = '';
  deleteId: any = '';
  SelectionType = SelectionType;
  searchTxt = '';
  selected = [];
  lstPageSize: any
  pageNumber = 1;
  masterNameId: any;
  clearM
  pageSizeValue: number;
  loginuserid: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  currentPage: number;
  contentHeader: object;
  constructor(private roleService: RoleService,
    private commonService: CommonService, private router: Router,
    private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute,
    private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    // console.log('    this.modulePermission', this.modulePermission)


    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'ROLESADD');
    // console.log('    this.modulePermission',this.modulePermission)
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'ROLESUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'ROLESDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    // // console.log("moduleCode", moduleCode);
      this.commonService.getLoggedInName.subscribe((userdetail: any) => {
        this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.loadSave = true;
    this.pageNumber = 1;
    this.pageSizeValue = 15;
    this.getPageSizes();
    this.search();
    this.refresh();
    this.getRoleDropDown();
    this.initBreadCrumb();
  }


  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Roles',
       actionButton: true,
       iconCssClass: '',
       breadcrumb:
         [
           {
             name: 'Dashboard',
             isLink: true,
             link: '/dashboard'
           },
           {
             name: 'Manage Roles',
             isLink: false
           }

         ]
     };
   }

  updateFilter(event) {
    this.pageNumber = 1;
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.pageNumber = 1;
      this.search();
    }
  }

  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  getRoleDropDown() {
    this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe((response: any) => {
      this.roledata = this.commonService.masters;
    });
  }
  onSort($event) {
    this.selected = [];
    this.deleteId = null;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.pageNumber = 1;
    this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.roleService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onChange($event) {
    this.loading = true;
    this.pageNumber = 1;
    this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.roleService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  setPage($event) {
    this.pageNumber = $event.page;
    this.search();
  }

  search() {
    this.loadSave = true;
    this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.roleService.pagedData;
      this.offset = this.pageNumber;
      this.selected = [];
      this.deleteId = null;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  reset() {
    this.selected = [];
    this.deleteId = null;
    this.table.sorts = [];
    this.loadSave = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.masterNameId = "undefined";

    this.clearDrop.clearModel();
    this.sortColumn = 'RoleCreatedDate';
    this.pageSizeValue = 15;
    this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 1, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.roleService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 1, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.roleService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
  restUserTypeddl() {
    this.masterNameId = 'undefined';
  }
  SetUserTypeValue(masternameId: string) {
    this.masterNameId = masternameId;
  }

  DeleteRole(row: any) {
    const message = `Are you sure you want to delete Role  "${row.RoleName}"?`;
    this.dialogService.confirm('Delete Role', message).subscribe(confirmed => {
      if (confirmed) {
        this.roleService.DeleteRole(row.RoleId).subscribe(r => {
          this.toaster.success(`Role "${row.RoleName}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  disable(row: any) {

    const message = `Are you sure you want to disable role  "${row.RoleName}"?`;
    this.dialogService.confirm('Disable Role', message).subscribe(confirmed => {
      if (confirmed) {
        this.roleService.setRoleStatus(row.RoleId, row.RoleStatusId).subscribe(r => {
          this.toaster.success(`"${row.RoleName}" has been disabled  successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  enable(row: any) {
    const message = `Are you sure you want to enable role  "${row.RoleName}"?`;
    this.dialogService.confirm('Enable Role', message).subscribe(confirmed => {
      if (confirmed) {
        this.roleService.setRoleStatus(row.RoleId, row.RoleStatusId).subscribe(r => {
          this.toaster.success(`"${row.RoleName}" has been enabled  successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }
  ApplyAdvanceFilter(e) {

  }
  GetcustomViewid(e) {

  }
  ShowUsersListPopup($event) {
    this.ServiceUsersListPopup.show($event);
  }

  onSelect({ selected }) {
    
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].RoleIDAuto.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].RoleIDAuto.toString() + ",";
      }
    }
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      ;
      this.deleteId = this.pagedData.data.filter(x => x.RoleName == 'Default Company Admin Role' && this.deleteId.includes(x.RoleId) ).map(x => x.RoleId).join(',');
      const message = `Are you sure you want to delete selected role(s)?`;
      if(this.deleteId){
        this.dialogService.confirm('DELETE ROLES(S)', message).subscribe(confirmed => {
          if (confirmed) {
            this.roleService.DeleteAllRole(this.deleteId,"tblroles").subscribe(r => {
              this.toaster.success(`Selected record(s) has been deleted successfully`);
              this.deleteId = "";
              this.selected = [];
              this.refresh();
            }, error => {
            });
          }
        });
      }
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }



  getIsShowColName({ row, column, value }) {
    if (row.RoleName =='Default Company Admin Role') {
      return {
        'dispaly-none': true
      };
    }
  }
}
