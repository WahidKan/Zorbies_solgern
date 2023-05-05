import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService, validationModel } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { ContractService } from './contract.service';


@Component({
  selector: 'app-contractlist',
  templateUrl: './contractlist.component.html',
  styleUrls: ['./contractlist.component.scss']
})

export class ContractlistComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  placeholder: string = 'Search by contract number'
  searchlabelName: string = 'Contract Number'
  listLabelName: string = 'Contract'
  @Input() offset: number;
  moduleName = 'crm';
  submoduleName = 'contract';
  custom_view_id = '';
  searchUserType = '';
  loginuserid: any;
  vewId: any;
  companyType: any;
  loading = false;
  SelectionType = SelectionType;
  sortDir = 'desc';
  sortColumn = 'Id';
  ViewModel: any;
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = "";
  searchTxt = "";
  listFiltertext:string = "";
  lstPageSize: any
  pageSizeValue: number;
  tableName = 'tblContract';
  jsonData: any;
  jsonDataForLib: any;
  isApproveAccount = false;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  currentPage: number;
  companyId: any;
  load: boolean = false;
  deleteId: any;
  actionarray: any[] = [];
  selected = [];
  validationModel: validationModel = new validationModel();
  is_filter: any;
  contractstatusid: any;
  lstListingColorCode: any;
  widgetType: any;
  recordFilter: any;
  teamID: any;
  datefrom: any
  dateto: any
  jsoncondition: any;
  teamMemberID: any;
  statusid: any;
  loadSave: boolean = false;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  myCheckbox: any = false;
  userinfodata: any;
  contentHeader: object;
  constructor(private contractService: ContractService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    

   
  }

  ngOnInit() {
    this.loadSave = true;
    this.modulePermission = this.commonService.getPermissiondata( this.activeRoute.snapshot.data.moduleCode);

    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'CONTRACTADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'CONTRACTUPDATE');
    this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'CONTRACTDELETE');

    var data = this.commonService.getLoggedInName.value;
    this.loginuserid = data.id;
    this.companyId = data.companyId;
    this.validationModel.companyType = this.companyType = data.companyType;

    if (this.companyType != undefined) 
    {
      this.jsoncondition = JSON.stringify(this.validationModel);
    }

    var fromDate1 = this.commonService.getQueryStringValue("fromDate");
    var toDate1 = this.commonService.getQueryStringValue("toDate");
    // const datefrom=this.comm
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
    
    this.actionarray = [{ "name": "View", "click": "goToPage(row)", "route": "/contract/view/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "1==1" },
     
      { "name": "Edit", "click": "goToPage(row)", "route": "/contract/edit/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate"},

      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]

    this.userinfodata = localStorage.getItem('userinfo');
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.getPageSizes();
    this.LoadViewData();
    this.refresh();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Contract',
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
             name: 'Manage Contract',
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
    // console.log('this.lstListingColorCode', this.lstListingColorCode)
    return this.lstListingColorCode;
  }
  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
  }

  //GetcustomViewid(event) {
  //  this.custom_view_id = event;
  //  this.refresh();
  //}
  GetcustomViewid(event) {
    ;
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
      

    }, error => {
      //this.loadSave = false;
    }, () => { 
      //this.loadSave = false; 
    })
  }

  SetManageViewValue(event, text) {
    ;
    //this.ViewModel = text;
    //this.custom_view_id = event;
    this.ViewModel = event.text;
    this.custom_view_id = event.event;
    this.vewId = event.event;
    this.refresh();
    //this.LoadViewData();
  }
  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
   
    this.contractService.GetContractList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.widgetType, this.recordFilter, this.teamID, this.teamMemberID, this.myCheckbox)
      .subscribe(response => {
        this.load = false;
        this.jsonData = response;
        this.jsonData = JSON.stringify(response);
        this.load = true;
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
      
        if(this.columnheading != undefined){
            this.columnheading.forEach(function (element) {
          element["colwidth"] = (String(element.DISPLAY_NAME).length * 12) + 12;
        });
        }
        if (this.columnheading != undefined) {
          if (response.data.length > 0) {
            this.totalRecords = this.columndata[0].total_records;
          }
        }
        else {
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
    this.loading = true;
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
    if (this.listFilter.length > 0) {
      this.listFiltertext = encodeURIComponent("ContractNumber like '%" + this.listFilter + "%'");
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

  filterpopup() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      this.dialogService.confirm('Delete Contract(s)', 
      'Are you sure you want to delete Contract(s) ?').subscribe(confirmed => {
        if (confirmed) {
          this.contractService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Record(s) has been deleted successfully`);
            this.deleteId = "";
            this.selected = [];
            this.refresh();
          }, error => {
          })
        }
      })
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  
  switchClicked(event) {
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = encodeURIComponent("ContractNumber like '%" + this.listFilter + "%'");
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
  Delete(row: any) {
    debugger;
    // let contractNumber = this.commonService.GenerateNumber(row.Id);
    this.dialogService.confirm('Delete Contract', 
    'Are you sure you want to delete Contract '+ row.ContractNumber  +' ?').subscribe(confirmed => {
      if (confirmed) {
        this.contractService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Contract "${row.ContractNumber }" has been deleted successfully`);
          this.refresh();
        }, error => {
        })
      }
    })
  }
  goToPage(e: any) {
    
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      debugger;
      console.log(e.row.ContractNumber);
      this.dialogService.confirm('Delete Contract', 'Are you sure you want to delete Contract '+ e.row.ContractNumber + ' ?').subscribe(confirmed => {
        if (confirmed) {
          this.contractService.DeleteRecords(e.row.Id, this.tableName).subscribe(r => {
            this.toaster.success(`Contract "${e.row.ContractNumber}" has been deleted successfully`);
            this.refresh();
          }, error => {
          })
        }
      })
    }
  }

  add() {
    this.router.navigateByUrl('/contract/add')
  }
}
