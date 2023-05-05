
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { CommonService, validationModel } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProposallistService } from './proposallist.service';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { CopyLinkModalComponent } from '../shared/copy-link-modal/copy-link-modal.component';



@Component({
  selector: 'app-proposallist',
  templateUrl: './proposallist.component.html',
  styleUrls: ['./proposallist.component.scss']
})
export class ProposallistComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('CopyLinkModal', { static: false }) CopyLinkModal: CopyLinkModalComponent;
  @Input() offset: number;
  proposalId = "";
  moduleName = 'crm';
  submoduleName = 'proposal';
  custom_view_id = '';
  searchUserType = '';
  loginuserid: any;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  loadSave = true;
  SelectionType = SelectionType;
  sortDir = 'desc';
  load: boolean = false;
  sortColumn = 'Id';
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: []
  };

  placeholder: string = ' Search by name'
  searchlabelName: string = 'Name'
  listLabelName: string = 'Proposal'
  listFilter = '';
  ViewModel: any = '';
  searchTxt = '';
  listFiltertext = '';
  lstPageSize: any
  pageSizeValue: number;
  tableName = 'tblproposal';
  jsonData: any;
  isApproveAccount = false;
  columndata: any;
  actionarray: any[] = [];
  columnheading: any;
  totalRecords: any;
  isAddViewFirstTime = false;
  currentPage: number;
  companyId: any;
  vewId: any;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  myCheckbox: any = false;
  deleteId: any;
  selected = [];
  is_filter: any;
  companyType: any;
  jsoncondition: any;
  validationModel: validationModel = new validationModel();
  lstListingColorCode: any;
  userinfodata: any;
  jsonDatapack: any;

  contentHeader: object;
  constructor(private proposalService: ProposallistService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {

   
  }

  ngOnInit() {
    this.loadSave = true;
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    var data = this.commonService.getLoggedInName.value;
    this.loginuserid = data.id;
    this.companyId = data.companyId;
    this.validationModel.companyType = this.companyType = data.companyType;

    if (this.companyType != undefined) {
      this.jsoncondition = JSON.stringify(this.validationModel);
    }

    // this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
    //   this.lstUserType = this.commonService.masters;
    // })

    this.modulePermission = this.commonService.getPermissiondata(this.activeRoute.snapshot.data.moduleCode);

    this.isAdd = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'PROPOSALADD');
    this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'PROPOSALUPDATE');
    this.isDelete = this.commonService.listingsActionManager_ForUpperCase(this.modulePermission, 'PROPOSALDELETE');

    this.getPageSizes();
    this.LoadViewData();
    this.refresh();

    this.actionarray = [{ "name": "View", "click": "goToPage(row)", "route": "/proposal-list/viewproposal/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "1==1" },

      { "name": "Edit", "click": "goToPage(row)", "route": "/proposal-list/editproposal/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },

      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" },

      { "name": "CopyLink", "click": "goToPage(row)", "title": "CopyLink", "iclass": "feather-copy", "condition": "1==1" }

    ]

    this.userinfodata = localStorage.getItem('userinfo');
 
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Proposal',
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
             name: 'Manage Proposal',
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
    if (event == 'undefined' || typeof event == 'undefined') {
      this.LoadViewData();
    }
    this.pagedData.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
      }
    });
    this.custom_view_id = event;
    this.vewId = event;

    this.refresh();
  }


  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;

    this.proposalService.GetproposalList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.myCheckbox)
      .subscribe(response => {
        this.load = false;
        this.jsonData = response;
        debugger
        this.jsonDatapack = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);

        this.load = true;

        if (response.data.length > 0) {
          this.totalRecords = this.jsonData.data[0].total_records;
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        //setTimeout(() => { 
          this.loadSave = false; 
        //}, 3000);
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
  getListingColorCode(fieldValue: any) {
    //this.lstListingColorCode = '';
    //if (fieldValue != null) {
    //  this.lstListingColorCode = fieldValue.split('::');
    //  if (this.lstListingColorCode.length > 0) {
    //    this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
    //  }
    //}
    //return this.lstListingColorCode;
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
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  };

  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
    }
    this.refresh();
  };

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
      const message = `Are you sure you want to delete Proposal(s)"`;
      this.dialogService.confirm('Delete Proposal(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.proposalService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    const message = `Are you sure you want to delete Proposal "${row.Name}"?`;
    this.dialogService.confirm('Delete Proposal', message).subscribe(confirmed => {
      if (confirmed) {
        this.proposalService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Proposal "${row.Name}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }
  LoadViewData() {
    //this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.proposalService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedData = this.proposalService.pagedData;
      this.pagedData.data.forEach(cnt => {
        if (cnt.is_default == true) {
          this.vewId = cnt.custom_view_id;
          this.ViewModel = cnt.view_name;
        }
      });
      //setTimeout(() => {
        //this.loadSave = false;
      //}, 2000);
       
    }, error => {
      //this.loadSave = false;
    })
  }

  SetManageViewValue(e) {
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.vewId = e.event;
    this.refresh();
  }
  switchClicked(event) {
    let view_id = this.custom_view_id;
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "name like '%" + this.listFilter + "%'";
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

  MainMethod(e: any) {
    this.loadSave = true;
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
    //this.loadSave = false;
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
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    ;
    if (e.page.name == "Delete") {
      const message = `Are you sure you want to delete Proposal  "${e.row.Name}"?`;
      this.dialogService.confirm('Delete Contract', message).subscribe(confirmed => {
        if (confirmed) {
          this.proposalService.DeleteRecords(e.row.Id, this.tableName).subscribe(r => {
            this.toaster.success(`Proposal "${e.row.Name}" has been deleted successfully`);
            this.refresh();
          }, error => {
          });
        }
      });
    }
    if (e.page.name == "CopyLink") {
      ;
      this.proposalId = e.row.ProposalId;
      this.CopyLinkModal.show(this.proposalId);
    }
  };


  add() {
    this.router.navigateByUrl('/proposal-list/addproposal')
  }
}
