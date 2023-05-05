import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ServiceTerritoryService } from './serviceterritorylist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { debuglog } from 'util';
import { UserslistpopupComponent } from './userslistpopup/userslistpopup.component';

@Component({
  selector: 'app-serviceterritorylist',
  templateUrl: './serviceterritorylist.component.html',
//   styleUrls: ['./locationlist.component.scss']
})
export class ServiceTerritorylistComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild('usersListByServiceTerritory', { static: false }) UserListModal: UserslistpopupComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  moduleName = 'settings';
  submoduleName = 'serviceterritory';
  custom_view_id = '';
  searchUserType = '';
  loginuserid: any;
  //modulePermission: ModuleList;
  SelectionType = SelectionType;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
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
  tableName = 'tblServiceTerritory';
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
  contentHeader: object;

  constructor(private serviceterritoryService: ServiceTerritoryService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {


    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGESERVICETERRITORYADD'); // serviceterritoryadd
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGESERVICETERRITORYUPDATE');  //serviceterritoryupdate
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGESERVICETERRITORYDELETE');  //serviceterritorydelete
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }


    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
    });

    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }

  ngOnInit() {
    this.loadSave = true;
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Service Territory',
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
             name: 'Manage Service Territory',
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
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    this.serviceterritoryService.GetServiceTerritoryList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter)
      .subscribe(response => {
        this.jsonData = this.serviceterritoryService.pagedData;
        // // console.log("this.jsonData", this.jsonData);
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        if (this.jsonData.data.length > 0) {
          this.totalRecords = this.columndata[0].total_records;
          // // console.log("Data", this.jsonData.schema);
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      });
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
    this.loadSave = true;
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
    this.currentPage = 1;
    this.refresh();
  }
  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "TerritoryName like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }
  reset() {
    this.custom_view_id = '';
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.refresh();
  }
  onSelect({ selected }) {
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].ID.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].ID.toString() + ",";
      }
    }
  }

  popUpOpen() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete Service Territory(s)"`;
      this.dialogService.confirm('Delete Service Territory(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.serviceterritoryService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    const message = `Are you sure you want to delete Service Territory "${row.TerritoryName}"?`;
    this.dialogService.confirm('Delete Service Territory', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceterritoryService.DeleteRecords(row.ID, this.tableName).subscribe(r => {
          this.toaster.success(`Service Territory "${row.TerritoryName}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  DisplayUsersListPoppup(serviceTerritoryId: any) {
    this.UserListModal.show(serviceTerritoryId);
  }

}
