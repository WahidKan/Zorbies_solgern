import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {  CommonService, validationModel } from '../shared/common.service';
import { OpportunityListService } from './opportunitylist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import * as $ from "jquery";
import { KanbanviewpopupComponent } from './kanbanviewpopup/kanbanviewpopup.component';
import { ManageviewnewComponent } from '../shared/manageviewnew/manageviewnew.component';
import { DynamicListComponent } from 'dynamiccustom-list';
@Component({
  selector: 'app-opportunitylist',
  templateUrl: './opportunitylist.component.html',
  styleUrls: ['./opportunitylist.component.scss']
})
export class OpportunityListComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewnewComponent;
  @ViewChild('KanbanViewModal', { static: false }) KanbanViewModal: KanbanviewpopupComponent

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('htsss', { static: false }) propertiesform: DynamicListComponent;  
  actionarray: any[] = [];
  load: boolean = false;
  jsonDatapack: any;
  jsoncondition: any;
  validationModel: validationModel = new validationModel()
  @Input() offset: number;
  moduleName = 'crm';
  submoduleName = 'Opportunity';
  tableName = 'tblOpportunity';
  custom_view_id = '';
  searchUserType = '';
  vewId: any = '';
  loginuserid: any;
  //modulePermission: ModuleList;
  loadSave = true;
  sortDir = 'desc';
  sortColumn = 'id';
  ViewModel: any = '';
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };

  placeholder: string = 'Search by opportunity name' 
  searchlabelName: string = 'Name'
  listLabelName: string = 'Opportunity'
  listFilter = '';
  searchTxt = '';
  listFiltertext = '';
  lstPageSize: any
  pageSizeValue: number;
  statusid: any;
  jsonData: any;
  columndata: any;
  columnheading: any;
  columnStages: any;
  totalRecords: any;
  companyId: any;
  searchFilter = '';
  SelectionType = SelectionType;
  currentdisable: '1'
  currentPage: any;
  deleteId: any;
  selected = [];
  GroupBy: [];
  is_filter: any;
  substageid: any;
  lstListingColorCode: any;
  widgetType: any;
  recordFilter: any;
  teamID: any;
  formOpportunityList: [];
  formOpportunityControlList: any[] = [];
  datefrom: any
  dateto: any
  teamMemberID: any;
  isOpportunityView = 'List';
  isOpportunityOldView = 'Kanban View';
  isGroupBy = 'Stage';
  InnerData: any;
  noRecord: true;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  companyType: any;
  myCheckbox: any = false;
  userinfodata: any;
  contentHeader: object;
  constructor(private opportunitylistService: OpportunityListService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    
  }

  onScroll() {
    this.pageSizeValue = this.pageSizeValue + 15;
    if (this.totalRecords != this.jsonData.data.length) {
      this.refresh();
    }
  }

  ngOnInit() {
      
    this.loadSave = true;
    this.modulePermission = this.commonService.getPermissiondata(this.activeRoute.snapshot.data.moduleCode);
    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'OPPORTUNITYADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'OPPORTUNITYUPDATE');
    this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'OPPORTUNITYDELETE');

    var data = this.commonService.getLoggedInName.value;
    this.loginuserid = data.id;
    this.companyId = data.companyId;
    this.validationModel.companyType = this.companyType = data.companyType;

    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.getPageSizes();
    this.LoadViewData();
    this.refresh();

    this.actionarray =
      [
      { "name": "View", "click": "goToPage(row)", "route": "/opportunity/viewOpportunity/", "title": "View Opportunity", "iclass": "feather-eye text-info pr-2", "condition": "1 == 1" },
      { "name": "Edit", "click": "goToPage(row)", "route": "/opportunity/editOpportunity/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Click to delete.", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
      ]

    this.userinfodata = localStorage.getItem('userinfo');
    var fromDate1 = this.commonService.getQueryStringValue("fromDate");
    var toDate1 = this.commonService.getQueryStringValue("toDate");

    if (fromDate1 != null && fromDate1 != undefined && fromDate1 != "") {
      let a = parseInt(fromDate1)
      this.datefrom = this.commonService.formatUnixToDate(a)

    }
    if (toDate1 != null && toDate1 != undefined && toDate1 != "") {
      let b = parseInt(toDate1)
      this.dateto = this.commonService.formatUnixToDate(b)
    }


    this.widgetType = this.commonService.getQueryStringValue("widgetType");
    this.recordFilter = this.commonService.getQueryStringValue("recordFilter");
    this.teamID = this.commonService.getQueryStringValue("teamID");
    this.teamMemberID = this.commonService.getQueryStringValue("teamMemberID");
    this.statusid = this.commonService.getQueryStringValue("stage");


    this.listFiltertext = null;
    if (this.statusid != null) {
      this.listFiltertext = "SubStageName = '" + this.statusid + "'";
    }
    if (this.datefrom != null && this.datefrom != undefined && this.datefrom != "") {
      if (this.datefrom.length > 0) {
        if (this.listFiltertext != null) {
          this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
        }
        else {
          this.listFiltertext = " CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
        }
      }
    }
    if (this.dateto != null && this.dateto != undefined && this.dateto != "") {
      if (this.dateto.length > 0) {
        if (this.listFiltertext != null) {
          this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
        }
        else {
          this.listFiltertext = " CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
        }
      }
    }

    if (this.teamID == "null")
      this.teamID = null;

    if (this.teamMemberID == "null")
      this.teamMemberID = null;

    if (this.listFiltertext == "null")
      this.listFiltertext = null;


    //this.activeRoute.paramMap.subscribe(
    //  params => {
    //    const id = params.get('id');
    //    this.substageid = id.toString();
    //    if (id != null) {
    //      // // console.log('asds', id);
    //      this.custom_view_id = '';
    //      this.pageSizeValue = 10;
    //      this.currentPage = 1;
    //      this.listFiltertext = "SubStageName = '" + this.substageid + "'";
    //      this.getPageSizes();
    //      this.refresh();
    //    }
    //  }
    //);


  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Opportunity',
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
             name: 'Manage Opportunity',
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

  //onDropSuccess(stageId, opportunityId) {
  //  this.opportunitylistService.UpdateOpportunityStage(stageId, opportunityId).subscribe((result: any) => {
  //    this.refresh();
  //  }, error => {
  //  });
  //}

  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;

    this.opportunitylistService.GetOpportunityList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.widgetType, this.recordFilter, this.teamID, this.teamMemberID, this.isOpportunityView, this.isGroupBy, this.myCheckbox)
      .subscribe(response => {
        //;
        this.load = false;
        this.jsonData = response;
        // console.log("this.jsonData", this.jsonData);
        this.load = true;
        this.jsonDatapack = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        this.formOpportunityList = this.jsonData.stages;
        if (response.data.length > 0) {
          if (this.isOpportunityView == 'Stage') {
            this.formOpportunityControlList = [];
            if (response.stages.length > 0) {
              var stageId = this.jsonData.stages[0].stage_id;
              var stageName = this.jsonData.stages[0].stage_name;
              $.each(this.formOpportunityList, $.proxy(function (index, item) {
                stageId = item.stage_id;
                stageName = item.stage_name;
                var returnedData = $.grep(this.jsonData.data, function (element, index) {
                  return element.StageNameID == stageId;
                });
                let obj = {
                  stage_id: stageId == null ? 0 : stageId,
                  stage_name: stageName == null ? "No Stage" : stageName,
                  InnerData: returnedData.length == 0 ? [] : returnedData,
                  rowcount: returnedData.length == 0 ? 0 : returnedData.length,
                  Id: returnedData.length == 0 ? null : typeof returnedData[0].Id == "undefined" ? 0 : returnedData[0].Id
                };
                this.formOpportunityControlList.push(obj);
              }, this));              
              if (this.formOpportunityControlList.length > 0) {
                this.noRecord != true;
              }
              else {
                this.noRecord = true;
              }
            }
          }
          this.totalRecords = this.columndata[0].total_records;
          //this.listFilter = '';
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      })
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

  get curPage(): number {
    return this.offset;
  }

  filterpopup() {
    //this.is_filter = '';
    //this.is_filter = this.listFiltertext.length;
    //this.FilterViewModal.show(this.companyId, this.is_filter);
    this.is_filter = '';
    // if (this.listFiltertext != null)
    //  this.is_filter = this.listFiltertext.length;
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
      this.listFiltertext = "OpportunityName like '%" + this.listFilter + "%'";
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
  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      this.dialogService.confirm('Delete Opportunity(s)'
      , 'Are you sure you want to delete the selected opportunity(s) ?').subscribe(confirmed => {
        if (confirmed) {
          this.opportunitylistService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    this.dialogService.confirm('Delete Opportunity', 
    'Are you sure you want to delete Opportunity '+ row.OpportunityName +' ?').subscribe(confirmed => {
      if (confirmed) {
        this.opportunitylistService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Opportunity "${row.OpportunityName}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

  DisplayKanbanView() {
    this.KanbanViewModal.show(this.isOpportunityView);
  }
  ShowListView(typeOpportunityView: any) {
    this.isOpportunityView = typeOpportunityView;
  }
  DisplayOldKanbanView() {
    var result = this.isOpportunityView;
    if (result == 'Stage') {
      this.isOpportunityView = 'List';
      this.isOpportunityOldView = 'Kanban View';
      this.pageSizeValue = 15;
      this.currentPage = 1;
    }
    else {
      this.isOpportunityView = 'Stage';
      this.isOpportunityOldView = 'List View';
      this.pageSizeValue = 15;
      this.currentPage = 1;
    }
    this.refresh();
  }

  LoadViewData() {
    //this.loadSave = true;
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


      //this.loadSave = false;
    }, error => {
     // this.loadSave = false;
    })
    //, () => { this.loadSave = false; })
  }

  SetManageViewValue(e) {
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.vewId = e.event;
    this.refresh();
    //this.LoadViewData();
  }
  switchClicked(event) {
    let view_id = this.custom_view_id;
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "OpportunityName like '%" + this.listFilter + "%'";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.custom_view_id = '';
      this.refresh();
      this.custom_view_id = view_id;
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }
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
    // console.log('rowdata', e)
  }

  add() {
    this.router.navigateByUrl('/opportunity/addOpportunity')
  }
}

