import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { CommonService, validationModel} from '../shared/common.service';
import { WorkorderService } from './workorderservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap';
import { DynamicListComponent } from 'dynamiccustom-list';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
//import { ManageviewComponent } from 'manageview';

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.scss']
})
export class WorkorderComponent implements OnInit {
  @ViewChild('htsss', { static: false }) propertiesform: DynamicListComponent;
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;         
  IsAuditCheckListDisplay: boolean = false;
  @ViewChild('audit', { static: false }) auditModel: ModalDirective;
  //@Input('moduleName') moduleName: any;
  //@Input('submoduleName') submoduleName: any;
  @Input() offset: number;
  moduleName = 'crm';
  submoduleName = 'workorder'; 
  custom_view_id = '';
  searchUserType = '';
  searchFilter = '';
  ViewModel: any = '';
  listFiltertext = '';
  loginuserid: any;
  vewId: any='';
  //modulePermission: ModuleList;
  loadSave = false;
  sortDir = 'desc';
  sortColumn = 'Id';   
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  // listFilter = '';
  searchTxt = '';
  listFilter = '';
  lstPageSize: any
  pageSizeValue: number;
  SelectionType = SelectionType;

  placeholder: string = 'Search by work order name'
  searchlabelName: string = 'WO Number or Name'
  listLabelName: string = 'Work Order'
  columndata: any;
  columnheading: any;
  totalRecords: any;
  currentPage: number;
  companyId: any;
  tableName = 'tblWorkorderNew'; //tblProducts';
  deleteId: any;
  selected = [];
  is_filter: any;
  SearhName: any;
  lstListingColorCode: any;

  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  myCheckbox: any = false;
  isDisabled: any;
  auditData: any;

  //jsonData: any = {
  //  data: [],
  //  schema: []
  //};
  jsonData: any;
  jsoncondition: any;
  actionarray: any[] = [];
  load: boolean = false;
  validationModel: validationModel = new validationModel()

  userinfodata: any;
  tilewidget: any[];
  tilewidgetSlider: any[];
  widgetGraphDataFullScreen: any;
  tilewidgetSliderInner: any[] = [...Array(4)].map(x => 0);
  tilewidgetSliderInnerDi: any[] = [];
  contentHeader: object;

  constructor(private workorderService: WorkorderService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
      
  }

  ngOnInit() 
  {
    this.loadSave = true;
    var data = this.commonService.getLoggedInName.value;
    this.loginuserid = data.id;
    this.companyId = data.companyId;
    
    this.modulePermission = this.commonService.getPermissiondata(this.activeRoute.snapshot.data.moduleCode);
    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'WORKORDERADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'WORKORDERUPDATE');
    this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'WORKORDERDELETE');
    
    this.LoadViewData();
    this.currentPage = 1;
    this.pageSizeValue = 15;
    this.actionarray = [
      { "name": "View", "click": "goToPage(row)", "route": "/workorder/view/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "1==1" },
      { "name": "Update", "click": "goToPage(row)", "route": "/workorder/edit/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]
    this.userinfodata = localStorage.getItem('userinfo');
    this.LoadViewDataCount();
    this.getPageSizes();
    this.refresh(); 
   
 
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage WorkOrder',
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
             name: 'Manage WorkOrder',
             isLink: false
           }
  
         ]
     };
   }


  
  SetManageViewValueWidgets(e) {
    //;
    this.loadSave = true;
    this.ViewModel = e.view_name;
    this.custom_view_id = e.custom_view_id;
    this.vewId = e.custom_view_id;
    this.refresh();
    //this.LoadViewData();
  }
  GetPageData(i, j) {
    let curr = (i * 4) + j;
    return this.tilewidget[curr];
  }

  LoadViewDataCount() {

    this.pageSizeValue = 15;
    this.currentPage = 1;
    //;
    this.workorderService.getViewListCount(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.tilewidget = this.workorderService.pagedData.data;
      // this.tilewidget.push(this.leadlistService.pagedData.data[0])
      // this.tilewidget.push(this.leadlistService.pagedData.data[0])
      // this.tilewidget.push(this.leadlistService.pagedData.data[0])
      if (this.tilewidget.length % 4 == 0) {
        this.tilewidgetSlider = [...Array(this.tilewidget.length / 4)].map(x => 0);
      }
      else {
        this.tilewidgetSlider = [...Array(Math.ceil(this.tilewidget.length / 4))].map(x => 0);
        this.tilewidgetSliderInnerDi = [...Array(this.tilewidget.length % 4)].map(x => 0)
      }

      if(this.ViewModel)
      {
          setTimeout(() => {
          this.SortingWidget(this.ViewModel);

       }, 1000); 
      }
    }, error => {
      // console.log(error)
    })



  }

  GetcustomViewid(event) {
    if (event == 'undefined' || typeof event == 'undefined') {
      this.LoadViewData();
      this.LoadViewDataCount();
    }
    this.pagedData.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
        this.SortingWidget(cnt.view_name);
      }
    });
    this.vewId = event;
    this.custom_view_id = event;
    this.refresh();
  }

  refresh() {
    //;
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    
    this.workorderService.GetWorkOrderList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.myCheckbox)
      .subscribe(response => {
        this.load = false;
        this.jsonData = response;   
        this.jsonData = JSON.stringify(this.jsonData);
        this.offset = this.currentPage;
        this.load = true;
       // this.loadSave = false;
        //setTimeout(() => { 
          this.loadSave = false; 
        //}, 1000);
      }, error => {
        this.loadSave = false;
      });
  };

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
    this.router.navigateByUrl('/workorder/add')
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
      this.dialogService.confirm('Delete Work Order', 
      'Are you sure you want to delete Work Order '+ e.row.Subject+' ?').subscribe(confirmed => {
        if (confirmed) {
          this.workorderService.DeleteRecords(e.row.id, this.tableName).subscribe(r => {
            this.toaster.success(`Work Order "${e.row.Subject}" has been deleted successfully`);
            this.refresh();
          }, error => {
          });
        }
      });
    }
  };


  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    //;
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  setPage($event) {
    this.loadSave = true;
    this.currentPage =1;
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
   // this.ManageViewModal.ModalManageView.show(TemplateName);
  }

  filterpopup() {
    this.is_filter = '';
    //if (this.listFiltertext != null )
    // this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }
  updateFilter(event) {
    this.currentPage = 1;
    this.listFilter = event.target.value;
   // this.listFiltertext = "((workorder.WorkOrderNumber like '%" + this.listFilter + "%') or (acc.Name like '%" + this.listFilter +"%'))";
   this.listFiltertext = "((workorder.WorkOrderNumber like '%" + this.listFilter + "%') or workorder.AccountId in (select id from tblaccounts where name like '%" + this.listFilter +"%'))";
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }
  };

  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }
  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    //this.listFiltertext = "((workorder.WorkOrderNumber like '%" + this.listFilter + "%') or (acc.Name like '%" + this.listFilter +"%'))";
    this.listFiltertext = "((workorder.WorkOrderNumber like '%" + this.listFilter + "%') or workorder.AccountId in (select id from tblaccounts where name like '%" + this.listFilter +"%'))";

    
    this.refresh();
  }

  reset() {

    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.sortDir = 'desc';
    this.sortColumn = 'Id';
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
        this.deleteId += selected[i].id.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id.toString() + ",";
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
      this.dialogService.confirm('Delete Work Order(s)', 
      'Are you sure you want to delete Work Order(s) ?').subscribe(confirmed => {
        if (confirmed) {
          this.workorderService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    this.dialogService.confirm('Delete Work Order', 
    'Are you sure you want to delete Work Order '+ row.Subject +' ?').subscribe(confirmed => {
      if (confirmed) {
        this.workorderService.DeleteRecords(row.id, this.tableName).subscribe(r => {
          this.toaster.success(`Work Order "${row.Subject}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }
  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
  }
  getListingColorCode(fieldValue: string) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }
    }
    return this.lstListingColorCode;

  }

  LoadViewData() {
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedData = this.commonService.pagedData;
      this.pagedData.data.forEach(cnt => {
        if (cnt.is_default == true) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
          this.SortingWidget(cnt.view_name);
        }
      });

    }, error => {
    })
  };

  SetManageViewValue(e) {
    //;
    this.ViewModel = e.text;
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.SortingWidget(e.text);
    this.vewId = e.event;
    this.refresh();

  };
  SortingWidget(_dropdownitem: any) {
    //;
    let _selWidgetNum : number  = 0;
    if (this.tilewidget) {
      for (let i = 0; i < this.tilewidget.length; i++) {
        if (this.tilewidget[i].view_name == _dropdownitem) {
          _selWidgetNum  = Math.ceil((i + 1) / 4);         
        }
      }
      let _TotalWidget: NodeListOf<HTMLElement> = document.querySelectorAll('.carousel-item');
      for (let i: number = 0; i < _TotalWidget.length; i++) {
        if (i == _selWidgetNum-1) {
          _TotalWidget[i].classList.add("active");
        }
        else {
          _TotalWidget[i].classList.remove('active');
        }
      }
    }
  }

  switchClicked(event) {
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      //this.listFiltertext = "((workorder.WorkOrderNumber like '%" + this.listFilter + "%') or (acc.Name like '%" + this.listFilter +"%'))";
      this.listFiltertext = "((workorder.WorkOrderNumber like '%" + this.listFilter + "%') or workorder.AccountId in (select id from tblaccounts where name like '%" + this.listFilter +"%'))";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.refresh();
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }
  }


}
