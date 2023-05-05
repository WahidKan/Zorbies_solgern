import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList, validationModel } from '../shared/common.service';
import { DepartmentService } from './department.service';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DynamicListComponent } from 'dynamiccustom-list';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.scss']
})
export class DepartmentlistComponent implements OnInit {
  @ViewChild('htsss', { static: false }) propertiesform: DynamicListComponent;
  actionarray: any[] = [];
  load: boolean = false;
  jsonDatapack: any;
  jsoncondition: any;
  validationModel: validationModel = new validationModel()
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  moduleName = 'users';
  submoduleName = 'department';
  custom_view_id = '';
  searchUserType = '';
  loginuserid: any;
  placeholder: string = 'Search by Name'
  searchlabelName: string = 'Name'
  listLabelName: string = 'Department'

  // modulePermission: ModuleList;
  loading = false;
  SelectionType = SelectionType;
  sortDir = 'desc';
  sortColumn = 'DepartmentIdAuto';
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  searchFilter = '';
  listFiltertext = '';
  lstPageSize: any
  pageSizeValue: number;
  tableName = 'tblDepartment';
  jsonData: any;
  isApproveAccount = false;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  currentPage: number;
  companyId: any;
  deleteId: any;
  selected = [];
  is_filter: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = false;
  myCheckbox: any = false;
  userinfodata: any;
  contentHeader: object;
  constructor(private departmentService: DepartmentService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {

    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'DEPARTMENTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'DEPARTMENTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'DEPARTMENTDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
      this.validationModel.companyType = userdetail.companyType;
    });

    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }

  ngOnInit() {
    this.loading = true;
    this.actionarray = [
      { "name": "Edit", "click": "goToPage(row)", "route": "/department/editdepartment/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]

    this.userinfodata = localStorage.getItem('userinfo');
    this.custom_view_id = '';
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
    this.initBreadCrumb();
  }
    
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Department',
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
             name: 'Manage Department',
             isLink: false
           }
  
         ]
     };
   }

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
  }

  GetcustomViewid(event) {
    this.custom_view_id = event;
    this.refresh();
  }

  refresh() {
    this.loading = true;
    
    this.departmentService.GetDepartmentList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter)
      .subscribe(response => {
        this.load = false;
        this.jsonData = this.departmentService.pagedData;
        this.jsonDatapack = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        this.load = true;
        if(response != undefined){
          if (response.data.length > 0) {
            this.totalRecords = this.columndata[0].total_records;
          } 
        }else {
            this.totalRecords = 0;
          }
        this.offset = this.currentPage;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
      // this.loading = false;
  }

  get curPage(): number {
    return this.offset;
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  onChange($event) {
    this.refresh();
  }
  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "DepartmentName like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }
  reset() {
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
  }

  filterpopup() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete Department(s)"`;
      this.dialogService.confirm('Delete Department(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.departmentService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Record(s) has been deleted successfully`);
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

  Delete(row: any) {
    const message = `Are you sure you want to delete Department "${row.DepartmentName}"?`;
    this.dialogService.confirm('Delete Department', message).subscribe(confirmed => {
      if (confirmed) {
        this.departmentService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Department "${row.DepartmentName}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  curPageemit(e) {
    return this.offset;
  }

  selectdata(e) {
    this.deleteId = '';
    this.deleteId = e;
  }

  MainMethod(e: any) {
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
  }

  goToPage(e: any) {
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Edit") {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      this.Delete(e.row)
    }
  };

  add() {
    this.router.navigateByUrl('/department/adddepartment')
  }
};
