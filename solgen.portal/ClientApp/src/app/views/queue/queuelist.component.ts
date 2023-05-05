import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModuleList, CommonService } from '../shared/common.service';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { QueueserviceService } from './queueservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-queuelist',
  templateUrl: './queuelist.component.html',
  styleUrls: ['./queuelist.component.scss']
})
export class QueuelistComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('assignpopup', { static: false }) assignpopupModel: ModalDirective;
  @Input() offsetUserList: number;
  @Input() offset: number;
  moduleName = 'Queue';
  submoduleName = 'queue';
  tableName = 'tblQueue';
  custom_view_id = '';
  searchUserType = '';
  loginuserid: any;
  modulePermission: ModuleList;
  loading = false;
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
  statusid: any;
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  companyId: any;
  searchFilter = '';
  SelectionType = SelectionType;
  currentdisable: '1'
  currentPage: any;
  deleteId: any;
  selected = [];
  is_filter: any;
  substageid: any;
  lstListingColorCode: any;
  assigneduserList: any[] = [];
  currentPageUserList: number;
  listuserFilter = ''
  lstPageSizeUserList: any
  pageSizeValueUserList = 10;
  sortDirUserList = 'desc';
  sortColumnUserList = 'CreatedOn';
  pagedDataUserList: any = {
    pager: {},
    data: []
  };
  queueid: any;
  loadSave: boolean = false;
  contentHeader: object;
  
  constructor(private queueserviceService: QueueserviceService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
    });

    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })

  }


  ngOnInit() {
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Queue',
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
             name: 'Manage Queue',
             isLink: false
           }
  
         ]
     };
   }

  showpopUserCount(id: any) {
    this.assigneduserList = [];
    this.currentPageUserList = 1;
    this.queueid = id
    this.queueserviceService.GetQueueUserList(this.listuserFilter, this.sortColumnUserList, this.sortDirUserList, this.currentPageUserList, this.pageSizeValueUserList, this.queueid).subscribe(response => {
      this.pagedDataUserList = response;
      this.offsetUserList = this.currentPageUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
    this.assignpopupModel.show(); 
  }
  closemodel() {
    this.assignpopupModel.hide();
  }

  get curPageUserList(): number {
    return this.offsetUserList;
  }
  onChangeUserList($event) {
    this.currentPageUserList = 1;
    this.loading = true;
    this.queueserviceService.GetQueueUserList(this.listuserFilter, this.sortColumnUserList, this.sortDirUserList, this.currentPageUserList, this.pageSizeValueUserList, this.queueid).subscribe(response => {
      this.pagedDataUserList = response;

      //for (var i = 0; i < this.pagedDataBankerList.data.length; i++) {
      //  this.assignedBankerData.forEach(s => {
      //    if (this.pagedDataBankerList.data[i].Email === s.Email) {
      //      this.pagedDataBankerList.data[i].Status = s.Status;
      //    }
      //  })
      //}

      this.offsetUserList = this.currentPageUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPageUserList($event) {
    this.loading = true;
    this.currentPageUserList = $event.page ;
    this.queueserviceService.GetQueueUserList(this.listuserFilter, this.sortColumnUserList, this.sortDirUserList, this.currentPageUserList, this.pageSizeValueUserList, this.queueid).subscribe(response => {
      this.pagedDataUserList = response;

      //for (var i = 0; i < this.pagedDataUserList.data.length; i++) {
      //  this.assignedBankerData.forEach(s => {
      //    if (this.pagedDataUserList.data[i].Email === s.Email) {
      //      this.pagedDataUserList.data[i].Status = s.Status;
      //    }
      //  })
      //}

      this.offsetUserList = this.currentPageUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

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

  GetcustomViewid(event) {
    this.custom_view_id = event;
    this.refresh();
  }

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.queueserviceService.GetQueueList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id)
      .subscribe(response => {
        this.jsonData = response;
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        if (response.data.length > 0) {
          this.totalRecords = this.columndata[0].total_records;
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeUserList = this.commonService.masters;
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
    this.currentPage = 1;
    this.refresh();
  }


  get curPage(): number {
    return this.offset;
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
  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete Queue(s)"`;
      this.dialogService.confirm('Delete Queue(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.queueserviceService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    const message = `Are you sure you want to delete Queue  "${row.Name}"?`;
    this.dialogService.confirm('Delete Queue', message).subscribe(confirmed => {
      if (confirmed) {
        this.queueserviceService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Queue "${row.Name}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }
}
