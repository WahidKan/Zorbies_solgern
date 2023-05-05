import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CampaignService } from './campaign.service';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService, ModuleList, validationModel } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DynamicListComponent } from 'dynamiccustom-list';

@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.scss']
})
export class CampaignlistComponent implements OnInit {
  @ViewChild('htsss', { static: false }) propertiesform: DynamicListComponent;
  actionarray: any[] = [];
  load: boolean = false;
  jsonDatapack: any;
  jsoncondition: any;
  validationModel: validationModel = new validationModel()
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  //modulePermission: ModuleList;
  SelectionType = SelectionType;

  placeholder: string = 'Search by Name'
  @Input() offset: number; 
  searchUserType:string= '';
  loadSave = false;
  sortDir = 'desc';
  moduleName = 'CRM';
  submoduleName = 'Campaign';
  tableName = 'tblCampaign';
  sortColumn = 'id';
  companyId: any;
  vewId: any = '';
  ViewModel: any = '';
  pagedData: any = {
    pager: {},
    data: []
  };
  selected = [];
  searchFilter = '';
  loginuserid: any;
  listFilter = '';
  searchTxt = '';
  currentdisable: '1'
  lstPageSize: any
  pageSizeValue: number;
  currentPage: any;
  listFiltertext = '';
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  custom_view_id: any;
  is_filter: any;
  deleteId: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  myCheckbox: any = false;
  userinfodata: any;
  contentHeader: object;
  constructor(private campaignService: CampaignService, private dialogService: ConfirmationDialogService, private commonService: CommonService,
    private router: Router, private activeRoute: ActivatedRoute, private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
      this.validationModel.companyType = userdetail.companyType;
    });
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CAMPAIGNADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CAMPAIGNUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CAMPAIGNDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

  }

  ngOnInit() {
    // this.campaignService.GetFacebookList().subscribe((result :any)=>{
    //   // console.log("facebook campaign data ===>",result);
    // });
    // ;
    // this.campaignService.GetFacebookAddSetsList().subscribe((result :any)=>{
    //   // console.log("facebook AddSets data ===>",result);
    // });
    this.actionarray = [
      { "name": "View", "click": "goToPage(row)", "route": "/campaign/view/", "title": "View Campaign", "iclass": "fa text-info fa-eye pr-2", "condition": "1 == 1" },
      { "name": "Edit", "click": "goToPage(row)", "route": "/campaign/editcampaign/", "title": "Edit", "iclass": "fa fa-pencil text-success", "condition": "1 == 1" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "1==1" }
    ]
    this.userinfodata = localStorage.getItem('userinfo');
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.LoadViewData();
    this.getPageSizes();
    this.refresh();
 
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Campaign',
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
             name: 'Manage Campaign',
             isLink: false
           }
  
         ]
     };
   }
  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
 
    this.campaignService.GetCampaignlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId)
      .subscribe(response => {
        this.load = false;
        this.jsonData = response;
        // console.log("this.jsonData", this.jsonData);
        this.jsonDatapack = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);
        this.columndata = this.jsonData.data;
        // console.log("this.jsonData", this.columndata);
        this.columnheading = this.jsonData.schema;
        this.load = true;
        if (response.data.length > 0) {
          this.totalRecords = this.columndata[0].total_records;
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        this.loadSave = false;
      }, error => {
          this.loadSave = false;
      })
  }
  onChange($event) {
    this.refresh();
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
  GetcustomViewid(event) {
    if (event == 'undefined' || typeof event == 'undefined') {
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

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
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

  reset() {
    this.custom_view_id = '';
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
  }

  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "CampaignName like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete Campaign(s)"`;
      this.dialogService.confirm('Delete Campaign(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.campaignService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    const message = `Are you sure you want to delete Campaign"${row.CampaignName}"?`;
    this.dialogService.confirm('Delete Campaign', message).subscribe(confirmed => {
      if (confirmed) {
        this.campaignService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Campaign "${row.CampaignName}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  LoadViewData() {
    this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.campaignService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedData = this.campaignService.pagedData;
      this.pagedData.data.forEach(cnt => {
        if (cnt.is_default == true) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
        }
      });

      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  SetManageViewValue(e) {
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.vewId = e.event;
    this.refresh();
    //this.LoadViewData();
  }

  curPageemit(e) {
    return this.offset;
  }

  selectdata(e) {
    this.deleteId = '';
    this.deleteId = e;
  }

  MainMethod(e: any) {
    ;
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
    // console.log('rowdata', e)
  }

  add() {
    this.router.navigateByUrl('/campaign/addcampaign')
  }
}
