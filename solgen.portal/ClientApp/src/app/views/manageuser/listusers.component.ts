import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User, ManageUserService } from './addedituser.service';
import { CommonService, validationModel} from '../shared/common.service';
import { SelectionType, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormGroup, NgForm, NgSelectOption, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SetPassword, UserService } from '../shared/user.service';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { EqualValidator } from '../shared/custom-validation/equal-validator';
import { DynamicListComponent } from 'dynamiccustom-list';

@Component({
  selector: 'ListUser',
  templateUrl: './listusers.component.html'
})

export class ListUsersComponent implements OnInit {
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('setPassword', { static: false }) setPasswordModal: ModalDirective;
  UserType: Observable<any>;
  userList: User[];
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  loadSave: boolean = false;
  //modulePermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'Createdon';
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
  userid: any;
  token: any;
  Name: any;
  currentPage: any;
  isEmailConfirmed: boolean = false;
  @Input() offset: number;
  deleteId: any;
  selected = [];
  tableName = 'AspNetUsers';
  SelectionType = SelectionType;
  listFiltertext = '';
  is_filter: any
  companyid: number;
  contentHeader: object;
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;

  companyId: any;
  custom_view_id = '';
  searchFilter = '';
  moduleName = 'users';
  submoduleName = 'user';
  myCheckbox: any = false;
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;


  placeholder: string = 'Search by Name'
  searchlabelName: string = 'Name'
  listLabelName: string = 'Users'

  jsoncondition: any;
  actionarray: any[] = [];
  load: boolean = false;
  validationModel: validationModel = new validationModel()
  vewId: any = '';
  
userinfodata: any;
  setPasswordModel: SetPassword = new SetPassword();
  constructor(private userService: ManageUserService, private userServicepassword: UserService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService
    , private fb: FormBuilder) {
    this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }


    // // console.log("modulePermission",  this.modulePermission);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyid = userdetail.companyId;
    });

  }
  ngOnInit() {
    this.loadSave = true;
    this.getPageSizes();
    this.currentPage = 1;
    this.pageSizeValue = 15;
    this.actionarray = [ 
      { "name": "SetPassword", "click": "goToPage(row)", "title": "Set Password", "iclass": "fa fa-key text-info pr-2", "condition": "1==1" },
      { "name": "Update", "click": "goToPage(row)", "route": "/user/edituser/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]
    this.userinfodata = localStorage.getItem('userinfo');
    this.refresh();
    this.initBreadCrumb();
  }
    
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Users',
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
             name: 'Manage Users',
             isLink: false
           }
  
         ]
     };
   }

  SetUserType(utype: any) {
    if (typeof utype === 'undefined') {
      this.searchUserType = '';
    } else {
      this.searchUserType = utype.value;
      this.listFiltertext = "UserTypeID = '" + this.searchUserType + "'";
      this.refresh();
    }   
  }

  getuserList() {
    this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }
  restddl() {
    this.searchUserType = '';
    this.reset();
  }

 
  updateFilter(event) {
    this.listFilter = event.target.value;
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

  ApplyAdvanceFilter(event) {    
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
  }

  onChange($event) {
    this.currentPage = 1;
    this.loading = true;
    this.refresh()
    //this.userService.getUserList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
    //  this.pagedData = this.userService.pagedData;
    //  this.loading = false;
    //}, error => {
    //  this.loading = false;
    //});
  }


  //search() {
  //  this.loading = true;
  //  this.userService.getUserList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
  //    this.pagedData = this.userService.pagedData;
  //    this.loading = false;
  //  }, error => {
  //    this.loading = false;
  //  });
  //}

  reset() {
    ;
    this.loading = true;
    this.listFilter = '';
    this.listFiltertext = '';
    this.searchUserType = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
  };



  setPage($event) {
    this.loadSave = true;
    this.currentPage = $event.page;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.refresh();
  }

  //refresh() {
  //  this.loading = true;
  //  this.userService.getUserList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid).subscribe(response => {

  //    this.pagedData = this.userService.pagedData;
  //    this.offset = 1;
  //    this.loading = false;
  //  }, error => {
  //    this.loading = false;
  //  })
  //}

  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    this.userService.GetUserlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId,this.myCheckbox)
      .subscribe(response => {
        this.jsonData = response;
        this.load = true;
        // console.log('jsonData', this.jsonData);;
        this.jsonData = JSON.stringify(this.jsonData);
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      })
  }
  get curPage(): number {
    return this.offset;
  }








  curPageemit(e) {
    return this.offset;
  }
  MainMethod(e: any) {
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
  }
  add() {
    this.router.navigateByUrl('/user/adduser')
  }
  selectdata(e) {
    this.deleteId = '';
    this.deleteId = e;
  }
  goToPage(e: any) {
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      this.DeleteUser(e.row)
    }
    else if (e.page.name == "SetPassword") {
      this.showModel(e.row);
    }
    //if (e.page == "view") {
    //  this.router.navigateByUrl('/lead/view/' + e.row.Id);
    //}
    // console.log('rowdata', e)
  }

  filterpopup() {

    this.is_filter = '';
    //if (this.listFiltertext != null )
    // this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }
  SetManageViewValue(event, text) {
    //this.ViewModel = text;
    this.custom_view_id = event;
    this.refresh();
    //this.LoadViewData();
  }
  switchClicked(event) {
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
     // this.listFiltertext = "((workorder.WorkOrderNumber like '%" + this.listFilter + "%') or (acc.Name like '%" + this.listFilter + "%'))";
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";

    }
    if (this.listFiltertext.trim().length > 0) {
      this.refresh();
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }
  }



















  disable(user) {
    const message = `Are you sure you want to disable User "${user.Name}"?`;
    this.dialogService.confirm('Disable User user', message).subscribe(confirmed => {
      if (confirmed) {
        this.userService.changeStatus(user.Id).subscribe(r => {
          this.refresh();
          this.toaster.success(`"${user.Name}" has been disabled   successfully`);
        }, error => {
        });
      }
    });
  }

  enable(user) {
    const message = `Are you sure you want to enable User user  "${user.Name}"?`;
    this.dialogService.confirm('Enable this.myGroup user', message).subscribe(confirmed => {
      if (confirmed) {
        this.userService.changeStatus(user.Id).subscribe(response => {
          this.refresh();
          this.toaster.success(`"${user.Name}" has been enabled  successfully`);
        }, error => {
        });
      }
    });
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete selected user(s)?`;
      this.dialogService.confirm('DELETE USER(S)', message).subscribe(confirmed => {
        if (confirmed) {
          this.userService.deleteUser(this.deleteId).subscribe(r => {
            this.toaster.success(`Selected record(s) has been deleted successfully`);
            this.deleteId = "";
            this.selected = [];
            this.refresh();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  //function is used to delete the user
  DeleteUser(row: any) {
    const message = `Are you sure you want to delete User "${row.Name}"?`;
    this.dialogService.confirm('Delete User ', message).subscribe(confirmed => {
      if (confirmed) {
        this.userService.deleteUser(row.Id).subscribe((result: any) => {
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


  //Password model popup

  setPasswordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
    {
      validator: EqualValidator.matchingPasswords('password', 'confirmPassword')
    });
  get password() { return this.setPasswordForm.get('password'); }
  get confirmPassword() { return this.setPasswordForm.get('confirmPassword'); }
  getToken(email: any) {
    this.userService.gettoken(email).subscribe((result: any) => {
      // console.log('result', result);
      this.token = result;
    })
  }

  showModel(data: any) {
    this.setPasswordForm.reset();
    this.setPasswordModal.show();
    // console.log('data', data);
    this.getToken(data.email)
    this.userid = data.Id;
    this.Name = data.Name;
    this.isEmailConfirmed = data.EmailConfirmed;
  }
  Closemodel() {
    this.setPasswordModal.hide();
  }
  PasswordSet() {
    this.loadSave = true;
    if (this.setPasswordForm.valid) {
      this.setPasswordModel.password = this.setPasswordForm.value.password;
      this.setPasswordModel.confirmPassword = this.setPasswordForm.value.confirmPassword;
      this.setPasswordModel.userId = this.userid;
      this.setPasswordModel.token = this.token;
      this.setPasswordModel.ResetToken = this.token;
      if (this.isEmailConfirmed != true) {
        this.userServicepassword.setPassword(this.setPasswordModel).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success("Password has been set successfully. Please login.");
            this.setPasswordModal.hide();
            this.loadSave = false;
            this.listFilter = null;
            if (this.searchUserType != null && this.searchUserType != '') {
              this.userTypeSelect.clearModel();
              this.restddl();
            }
            this.refresh();
          }
          else {
            this.toaster.error(res.responseMessage);
            this.loadSave = false;
          }
        });
      }
      else {
        this.userServicepassword.ResetPassword(this.setPasswordModel).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success("Password has been reset successfully. Please login.");
            this.setPasswordModal.hide();
            this.loadSave = false;
            if (this.searchUserType != null && this.searchUserType != '') {
              this.getuserList();
              this.userTypeSelect.clearModel();
              this.restddl();
            }

            this.listFilter = '';
            this.searchUserType = '';
            this.refresh();
          }
          else {
            this.toaster.error(res.responseMessage);
            this.loadSave = false;
          }
        });
      }

    }
    else {
      this.commonService.validateAllFormFields(this.setPasswordForm);
      this.loadSave = false;
    }
  }

  onSelect({ selected }) {
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    }
  }
  popUpOpen() {
    this.is_filter = '';
    //if (this.listFiltertext != null)
    //  this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyid, this.is_filter);
  }

  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
    }
    this.refresh();
  };

}




