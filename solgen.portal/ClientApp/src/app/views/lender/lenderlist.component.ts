import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModuleList, CommonService } from '../shared/common.service';

import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { AccountserviceService } from '../internalaccounts/accountservice.service';


@Component({
  selector: 'app-lenderlist',
  templateUrl: './lenderlist.component.html',
  styleUrls: ['./lenderlist.component.scss']
})
export class LenderlistComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  @Input() offset: number;
  moduleName = 'crm';
  submoduleName = 'account';
  custom_view_id = '';
  searchUserType = '';
  loginuserid: any;
 // modulePermission: ModuleList;
  loadSave = false;
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
  listFiltertext = '';
  lstPageSize: any
  pageSizeValue: number;
  tableName = 'tblaccounts';
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
  lstListingColorCode: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  companyType: any;
  contentHeader: object;
  constructor(private internalAccountService: AccountserviceService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);



    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LENDERADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LENDERUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LENDERDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
      this.companyType = userdetail.companyType;
    });

    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }

  ngOnInit() {
    this.custom_view_id = '';
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();

    this.initBreadCrumb();
    }
    initBreadCrumb() {
      this.contentHeader = {
        headerTitle: 'Manage Banks',
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
            name: 'Manage Banks',
            isLink: false,
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
  getListingColorCode(fieldValue: any) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }
    }
    return this.lstListingColorCode;
  }
  refresh() {
    this.loadSave = true;
    this.internalAccountService.GetAccountsListByBank(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id)
      .subscribe(response => {
        this.jsonData = response;
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        // console.log("this.columnheading", this.columnheading);
        this.columnheading.forEach(function (element) {
          if(element.COLUMN_NAME ==  'Name'){element.DISPLAY_NAME = 'Bank Name'}
          element["colwidth"] = (String(element.DISPLAY_NAME).length * 12) + 12;
        });

        if (response.data.length > 0) {
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
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
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
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete bank(s)"`;
      this.dialogService.confirm('Delete bank(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.internalAccountService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    const message = `Are you sure you want to delete bank "${row.Name}"?`;
    this.dialogService.confirm('Delete bank', message).subscribe(confirmed => {
      if (confirmed) {
        this.internalAccountService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`bank "${row.Name}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }
  ApproveAccount(row: any) {
    const message = `Are you sure you want to Approve Account "${row.Name}"?`;
    this.dialogService.confirm('Approve Account', message).subscribe(confirmed => {
      if (confirmed) {
        this.internalAccountService.AppeoveAccount(row.Id, this.tableName).subscribe(r => {
          // // console.log("approve account", this.internalAccountService.editPage);
          if (this.internalAccountService.editPage.statusCode == 200) {
            this.toaster.success(`Account "${row.Name}" has been approved successfully`);
            this.refresh();
            this.isApproveAccount = true;
          }
          else {
            this.toaster.error(this.internalAccountService.editPage.responseMessage);
            this.refresh();
          }
        }, error => {
        });
      }
    });
  }
}


  //@ViewChild('templateFilterView') FilterViewModal: SearchfilteraddComponent;
  //@ViewChild('templateManageView') ManageViewModal: ManageviewComponent;
  //  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  //@Input() offset: number;
  //lstUserType: any;
  //searchUserType = '';
  //loginuserid: any;
  //custom_view_id = '';
  //searchFilter = '';
  //modulePermission: ModuleList;
  //loading = false;
  //sortDir = 'desc';
  //moduleName = 'finance';
  //submoduleName = 'lender';
  //tableName = 'tblBank';
  //sortColumn = 'CreatedOn';
  //SelectionType = SelectionType;
  //columnMode = ColumnMode;
  //companyId: any;
  //pagedData: any = {
  //  pager: {},
  //  data: []
  //};
  //listFilter = '';
  //searchTxt = '';
  //currentdisable: '1'
  //lstPageSize: any
  //pageSizeValue: number;
  //currentPage: any;
  //listFiltertext = '';
  //jsonData: any;
  //columndata: any;
  //columnheading: any;
  //totalRecords: any;
  //deleteId: any;
  //selected = [];
  //is_filter: any;
  //pageModuleName: any;

  //constructor(private lenderlistService: LenderlistService, private dialogService: ConfirmationDialogService,
  //  private commonService: CommonService, private router: Router,
  //  private activeRoute: ActivatedRoute
  //  , private toaster: ToastrService) {

  //  this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
  //    this.lstUserType = this.commonService.masters;
  //  })
  //  const moduleCode = this.activeRoute.snapshot.data.moduleCode;
  //  this.modulePermission = this.commonService.getPermission(moduleCode);

  //  this.pageModuleName = "Bank";
  //  this.commonService.getLoggedInName.subscribe((userdetail: any) => {
  //    this.loginuserid = userdetail.id;
  //    this.companyId = userdetail.companyId;
  //    if (userdetail.companyType == 'companytypeSolarInstall') {
  //      this.pageModuleName = "Lender";
  //    }
  //  });
  //}

  //ngOnInit() {
  //  this.custom_view_id = '';
  //  this.pageSizeValue = 10;
  //  this.currentPage = 1;
  //  this.getPageSizes();
  //  this.refresh();
  //}

  //displayCheck(row) {
  //  return row.isAssociated == "0";
  //}

  //GetcustomViewid(event) {
  //  this.custom_view_id = event;
  //  this.refresh();
  //}

  //ApplyAdvanceFilter(event) {
  //  this.currentPage = 1;
  //  this.listFiltertext = '';
  //  this.listFiltertext = event;
  //  this.refresh();
  //}

  //refresh() {
  //  this.loading = true;
  //  this.lenderlistService.GetLenderlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId)
  //    .subscribe(response => {

  //      this.jsonData = response;
  //      this.columndata = this.jsonData.data;
  //      // // console.log('data',this.columndata);
  //      this.columnheading = this.jsonData.schema;
  //      if (response.data.length > 0) {
  //        this.totalRecords = this.columndata[0].total_records;
  //      } else {
  //        this.totalRecords = 0;
  //      }
  //      this.offset = this.currentPage;
  //      this.loading = false;
  //    }, error => {
  //      this.loading = false;
  //    })
  //}
  //get curPage(): number {
  //  return this.offset;
  //}
  //getPageSizes() {
  //  this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
  //    this.lstPageSize = this.commonService.masters;
  //  })
  //}

  //setPage($event) {
  //  this.loading = true;
  //  this.currentPage = $event.page;
  //  this.refresh();
  //}

  //onSort($event) {
  //  const sort = $event.sorts[0]
  //  this.sortDir = sort.dir;
  //  this.sortColumn = sort.prop;
  //  this.currentPage = 1;
  //  this.refresh();
  //}
  //onChange($event) {
  //  this.currentPage = 1;
  //  this.refresh();
  //}
  //displayDetailDetail(TemplateName: any) {
  //  this.ManageViewModal.show(TemplateName);
  //}

  //popUpOpen() {
  //  this.is_filter = '';
  //  this.is_filter = this.listFiltertext.length;
  //  this.FilterViewModal.show(this.companyId, this.is_filter);
  //}


  //updateFilter(event) {
  //  this.searchTxt = event.target.value;
  //  let keycode = (event.keyCode ? event.keyCode : event.which);
  //  if (keycode === 13 || keycode === '13') {
  //    this.search();
  //  }
  //}

  //search() {
  //  this.currentPage = 1;
  //  this.listFiltertext = '';
  //  if (this.listFilter.trim().length > 0) {
  //    this.listFiltertext = "BankName like '%" + this.listFilter + "%'";
  //  }
  //  this.refresh();
  //}
  //reset() {
  //  this.custom_view_id = '';
  //  this.listFilter = '';
  //  this.listFiltertext = '';
  //  this.currentPage = 1;
  //  this.refresh();
  //}

  //onSelect({ selected }) {
  //  if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
  //    this.selected.splice(0, this.selected.length);
  //    this.selected.push(...selected);
  //    this.deleteId = null;
  //    this.deleteId = "";
  //    for (let i = 0; i < selected.length; i++) {
  //      this.deleteId += selected[i].ID.toString() + ",";
  //    }

  //  }
  //  else {
  //    this.deleteId = null;
  //    this.deleteId = "";
  //    for (let i = 0; i < selected.length; i++) {
  //      this.deleteId += selected[i].ID.toString() + ",";
  //    }
  //  }
  //}

  //deleteAll() {
  //  if (this.deleteId != null && this.deleteId != "") {
  //    const message = `Are you sure you want to delete Lender(s)"`;
  //    this.dialogService.confirm('Delete Lender(s)', message).subscribe(confirmed => {
  //      if (confirmed) {
  //        this.lenderlistService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
  //          this.toaster.success(`Record(s) has been deleted successfully`);
  //          this.deleteId = "";
  //          this.selected = [];
  //          this.refresh();
  //        }, error => {
  //        });
  //      }
  //    });
  //  }
  //  else {
  //    this.toaster.error("Please select at least one row.");
  //  }
  //}

  //Delete(row: any) {
  //    const message = `Are you sure you want to delete Lender  "${row.BankName}"?`;
  //  this.dialogService.confirm('Delete Lender', message).subscribe(confirmed => {
  //      if (confirmed) {
  //        this.lenderlistService.DeleteRecords(row.ID, this.tableName).subscribe(r => {
  //          this.toaster.success(`Lender "${row.BankName}" has been deleted successfully`);
  //          this.refresh();
  //        }, error => {
  //        });
  //      }
  //    });
  //  }

  //}

