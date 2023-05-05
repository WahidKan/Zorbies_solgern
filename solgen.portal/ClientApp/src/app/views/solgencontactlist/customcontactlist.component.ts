import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { CustomContactListService } from './customcontactlist.service';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customcontactlist',
  templateUrl: './customcontactlist.component.html',
  styleUrls: ['./customcontactlist.component.scss']
})
export class CustomcontactlistComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  custom_view_id = '';
  searchFilter = '';
  moduleName = 'crm';
  submoduleName = 'contact';
  searchUserType = '';
  loginuserid: any;
  ViewModel: any = '';
  vewId: any;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  loadSave = true;
  sortDir = 'desc';
  sortColumn = 'id';
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  tableName = 'tblContacts';
  SelectionType = SelectionType;
  companyId: any;
  listFilter = '';
  placeholder: string = 'Search by name'
  searchlabelName: string = 'Name'
  listLabelName: string = 'Contacts'
  searchTxt = '';
  currentdisable: '1';
  currentPage: any;
  listFiltertext = '';
  lstPageSize: any
  pageSizeValue: number;
  load: boolean = false;
  
  actionarray: any[] = [];
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  deleteId: any;
  selected = [];
  is_filter: any;
  lstListingColorCode: any;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  myCheckbox: any = false;
  userinfodata: any;
  contentHeader: object;

  constructor(private customcontactlistService: CustomContactListService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
   
  }

  ngOnInit() {

    this.loadSave = true;
    var data = this.commonService.getLoggedInName.value;
    this.loginuserid = data.id;
    this.companyId = data.companyId;

    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;

    this.modulePermission = this.commonService.getPermissiondata(this.activeRoute.snapshot.data.moduleCode);
    
    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'CONTACTADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'CONTACTUPDATE');
    this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'CONTACTDELETE');

    this.getPageSizes();
    this.LoadViewData();
    this.refresh();
    this.actionarray = [{ "name": "View", "click": "goToPage(row)", "route": "/contactlist/view/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "1==1" },

      { "name": "Edit", "click": "goToPage(row)", "route": "/contactlist/editContact/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },

      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]
    this.userinfodata = localStorage.getItem('userinfo');
    this.initBreadCrumb();
    //this.loadSave = false;
  }
  
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Contact',
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
            name: 'Manage Contact',
            isLink: false
          }

        ]
    };
  }

  getListingColorCode(fieldValue: any) {
    // 
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }


    }
    // console.log('this.lstListingColorCode', this.lstListingColorCode)
    return this.lstListingColorCode;
    //// console.log('this.lstListingColorCode', this.lstListingColorCode)

  }

  SetManageViewValue(event, text) {
    
    this.ViewModel = event.text;
    this.custom_view_id = event.event;
    this.vewId = event.event;
    this.refresh();
    //this.LoadViewData();
  }

  GetcustomViewid(event) {
    //this.custom_view_id = event;
    //this.refresh();
    if (event == 'undefined' || typeof event == 'undefined') {
      //this.isAddViewFirstTime = true;
      this.LoadViewData();
    }
    this.pagedData.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
      }
    });
    this.vewId = event;
    this.custom_view_id = event;
    this.refresh();
  }

  LoadViewData() {
    //this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.customcontactlistService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedData = this.customcontactlistService.pagedData;
      this.pagedData.data.forEach(cnt => {
        if (cnt.is_default == true) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
        }
      });

      //this.loadSave = false;
    }, error => {
      //this.loadSave = false;
    })
  }

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
   
  }

  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
 
    this.customcontactlistService.GetSolgenContactList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.myCheckbox)
      .subscribe(response => {
        this.load = false;
        this.jsonData = response;
        this.jsonData = JSON.stringify(response);
        this.load = true;
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        if (response.data.length > 0) {
          if(this.columndata != undefined){
            this.totalRecords = this.columndata[0].total_records;
          }
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
    this.currentPage = 1;
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

  filterpopup() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
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
      this.listFiltertext = "FirstName like '%" + this.listFilter + "%' or LastName like '%" + this.listFilter + "%'";
     // this.listFiltertext = "Name like '%" + this.listFilter + "%'";
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

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      this.dialogService.confirm('Delete Contact(s)', 
      'Are you sure you want to delete the selected contact(s) ?').subscribe(confirmed => {
        if (confirmed) {
          this.customcontactlistService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    ;
    this.dialogService.confirm('Delete Contact', 
    'Are you sure you want to delete Contact  '+ row.FirstName + ' ?').subscribe(confirmed => {
      if (confirmed) {
       
        this.customcontactlistService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Contact "${row.FirstName}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }
  switchClicked(event) {
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "FirstName like '%" + this.listFilter + "%' or LastName like '%" + this.listFilter + "%'";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.refresh();
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }
  }

  MainMethod(e: any) {
    
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
  }
  curPageemit(e) {

    return this.offset;
  }
  selectdata(e) {
    this.deleteId = e;

    
  }
  
  goToPage(e: any) {
    
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      this.dialogService.confirm('Delete Contact', 'Are you sure you want to delete Contact  ' + e.row.FirstName + ' ?').subscribe(confirmed => {
        if (confirmed) {
          this.customcontactlistService.DeleteRecords(e.row.Id, this.tableName).subscribe(r => {
            this.toaster.success(`Contact "${e.row.FirstName}" has been deleted successfully`);
            this.refresh();
          }, error => {
          });
        }
      });
    }
  }
  add() {
    this.router.navigateByUrl('/contactlist/addContact')
  }
}
