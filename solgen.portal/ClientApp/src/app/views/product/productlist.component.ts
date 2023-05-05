import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService, validationModel } from '../shared/common.service';
import { ProductListService } from './productlist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  //@Input('moduleName') moduleName: any;
  //@Input('submoduleName') submoduleName: any;
  @Input() offset: number;
  moduleName = 'Product';
  submoduleName = 'Products'; //'ProductMAster';
  custom_view_id = '';
  searchUserType = '';
  searchFilter = '';
  listFiltertext = '';
  ViewModel: any;
  loginuserid: any;
 // modulePermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'id';
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  placeholder: string = 'Search by Name'
  searchlabelName: string = 'Name'
  listLabelName: string = 'Products'
 // listFilter = '';
  searchTxt = '';
  listFilter = '';
  lstPageSize: any
  vewId: any;
  pageSizeValue: number;
  SelectionType = SelectionType;
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  currentPage: number;
  load: boolean = false;
  companyId: any;
  tableName = 'tblProductMaster'; //tblProducts';
  deleteId: any;
  selected = [];
  actionarray: any[] = [];
  is_filter: any;
  SearhName: any;
  lstListingColorCode: any;
  companyType: any;
  jsoncondition: any;
  validationModel: validationModel = new validationModel();
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = true;
  contentHeader: object;

userinfodata: any;
  constructor(private prodlistService: ProductListService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {

  }

  ngOnInit() {
    this.SearhName = '';
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;

    this.loadSave = true;

    var data = this.commonService.getLoggedInName.value;
    this.loginuserid = data.id;
    this.companyId = data.companyId;
    this.validationModel.companyType = this.companyType = data.companyType;

    if (this.companyType != undefined) {
      this.jsoncondition = JSON.stringify(this.validationModel);
    }

    this.modulePermission = this.commonService.getPermissiondata(this.activeRoute.snapshot.data.moduleCode);

    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'PRODUCTSADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'PRODUCTSUPDATE');
    this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'PRODUCTSDELETE');

    this.getPageSizes();
    this.LoadViewData();
    this.refresh();
    this.actionarray = [{ "name": "View", "click": "goToPage(row)", "route": "/product/viewproducts/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "1==1" },

      { "name": "Edit", "click": "goToPage(row)", "route": "/product/editProduct/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },

      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]

    this.userinfodata = localStorage.getItem('userinfo');
    this.initBreadCrumb();
  }

  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Products',
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
             name: 'Manage Products',
             isLink: false
           }

         ]
     };
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
  };

  SetManageViewValue(event, text) {
    this.ViewModel = event.text;
    this.custom_view_id = event.event;
    this.vewId = event.event;
    this.refresh();
    //this.LoadViewData();
  }
  GetcustomViewid(event) {
    if (event == 'undefined' || typeof event == 'undefined') {
     // this.LoadViewData();
    }
    this.pagedData.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
      }
    });
    this.vewId = event;
    this.custom_view_id = event;
    this.vewId = event;

    this.refresh();
  }

  refresh() {
    this.deleteId = null;
    this.selected = []

    this.loading = true;
    this.loadSave = true;
    this.prodlistService.GetProductList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter)
      .subscribe(response => {
        debugger;
        this.load = false;
        this.jsonData = response;

        this.jsonData.data.forEach((x)=>{
          if(x.ProductPrice != null ){
            x.ProductPrice ='$' + x.ProductPrice+'.00';
          }
        });

        this.columndata = this.jsonData.data;
        this.jsonData = JSON.stringify(response);
        //this.loadSave = false;
        this.load = true;
        this.columnheading = this.jsonData.schema;
        //this.totalRecords = this.columndata[0].total_records;
        if (response.data.length > 0) {
          this.totalRecords = this.columndata[0].total_records;
          for (var i = 0; i < response.data.length; i++) {
            if (parseInt(response.data[i].Wattage) >= 0) {
              response.data[i].Wattage = this.commonService.formatAmount(response.data[i].Wattage);
            }
            if (parseInt(response.data[i].Efficiency) >= 0) {
              response.data[i].Efficiency = this.commonService.formatAmount(response.data[i].Efficiency);
            }
            if (parseInt(response.data[i].AmountNeededPerkW) >= 0) {
              response.data[i].AmountNeededPerkW = this.commonService.formatAmount(response.data[i].AmountNeededPerkW);
            }
          }
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        this.loadSave = false;
        this.loading = false;

      }, error => {
        this.loadSave = false;
        this.loading = false;
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
    this.loading = true;
    this.currentPage = 1;
    this.refresh();
  }
  MainMethod(e: any) {
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
    displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }
  LoadViewData() {
    this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedData = this.commonService.pagedData;
      this.pagedData.data.forEach(cnt => {
        if (cnt.is_default == true) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
        }
      });


    }, error => {
      this.loadSave = false;
    }, () => { this.loadSave = false; })
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }
  search() {
   /*this.listFiltertext = '';*/
   if (this.listFilter.trim().length > 0) {
     this.listFiltertext = "ProductName like '%" + this.listFilter + "%'";
   }
   this.refresh();
  };

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
  filterpopup() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }
  deleteAll() {
    debugger;
    if (this.deleteId != null && this.deleteId != "") {
      this.dialogService.confirm('Delete Product(s)',
      'Are you sure you want to delete the selected product(s) ?').subscribe(confirmed => {
        if (confirmed) {
          this.prodlistService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Selected Product(s) has been deleted successfully`);
            this.deleteId = "";
            this.selected = [];
            this.refresh();
          }, error => {
          }).unsubscribe();
        }
      }).unsubscribe();
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  Delete(row: any) {
    debugger;
    this.dialogService.confirm('Delete Product',
    'Are you sure you want to delete Product  ' + row.ProductName + ' ? ').subscribe(confirmed => {
      if (confirmed) {
        this.prodlistService.DeleteRecords(row.ID, this.tableName).subscribe(r => {
          this.toaster.success(`Product "${row.ProductName}" has been deleted successfully.`);
          this.refresh();
        }, error => {
        }).unsubscribe();
      }
    }).unsubscribe();
  }
  ApplyAdvanceFilter(event) {
   this.currentPage = 1;
   this.listFiltertext = '';
   this.listFiltertext = event;
    this.refresh();
  }

  curPageemit(e) {

    return this.offset;
  }
  selectdata(e) {
    this.deleteId = e;

    //if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
    //  this.selected.splice(0, this.selected.length);
    //  this.selected.push(e);
    //  this.deleteId = null;
    //  this.deleteId = "";
    //  for (let i = 0; i < e.length; i++) {
    //    this.deleteId += e + ",";
    //  }

    //}
    //else {
    //  this.deleteId = null;
    //  this.deleteId = "";
    //  for (let i = 0; i < e.length; i++) {
    //    this.deleteId += e + ",";
    //  }
    //}
  }

  goToPage(e: any) {
    debugger
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      this.dialogService.confirm('Delete Product',
      'Are you sure you want to delete Product  ' + e.row.ProductName + ' ?').subscribe(confirmed => {
        debugger
        if (confirmed) {
          debugger
          this.prodlistService.DeleteRecords(e.row.ID, this.tableName).subscribe(r => {
            this.toaster.success(`Product "${e.row.ProductName}" has been deleted successfully`);
            this.refresh();
          }, error => {
          });
        }
      });
    }
  };

  add() {
    this.router.navigateByUrl('/product/addProduct')
  }
}

