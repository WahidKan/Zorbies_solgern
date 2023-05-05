import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { requirementService } from './requirement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, validationModel, ModuleList } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';


@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})
export class requirementComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'id';
  moduleName = 'managerequirements'; submoduleName = 'Requirements';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  companyId: any;
  ViewModel: any = '';
  currentdisable: '1'
  SelectionType = SelectionType;
  vewId: any = '';
  lstPageSize: any
  pageSizeValue: number;
  currentPage: any;
  listFiltertext = '';
  jsonData: any;
  columndata: any;

  columnheading: any;
  totalRecords: any;
  custom_view_id = '';
  searchFilter = '';
  deleteId: any;
  selected = [];
  modulePermission: any[] = [];
  isAdd: boolean = true;
  isUpdate: boolean = true;
  isDelete: boolean = true;
  is_filter: any;
  pageModuleName: any;
  loadSave: boolean = false;
  myCheckbox: any = false;
  load: boolean = false;
  actionarray: any[] = [];
  tableName = 'tblRequirements';
  jsoncondition: any;

  placeholder: string = 'Search by Name'
  validationModel: validationModel = new validationModel();

  userinfodata: any;
  contentHeader: object;  
  constructor(private requirementSevice: requirementService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private route: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })


    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.validationModel.companyType = userdetail.companyType;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'REQUIREMENTSADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'REQUIREMENTSUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'REQUIREMENTSDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
  }
  onOpenEdit(id: string) {
    this.router.navigate(['/task/addtask'], { queryParams: { id: id } });
  }

  onDeleteTask(resId: any) {
    const message = `Are you sure you want to delete Task?`;
    this.dialogService.confirm('Delete Loanterm', message).subscribe(confirmed => {
      this.requirementSevice.onDeleteTask(resId, '').subscribe((res: any) => {
        this.toaster.success(`Task has been deleted successfully..`);
        this.refresh();
      });
    });
  }

  ngOnInit() {
    ;
    this.isAdd = true;
    this.isUpdate = true;
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.LoadViewData();
    this.actionarray =
      [
      {
        "name": "View", "click": "goToPage(row)", "route": "/requirement/viewrequirement/", "title": "View Requirement", "iclass": "feather-eye text-info pr-2", "condition": "1 == 1" },
      { "name": "Edit", "click": "goToPage(row)", "route": "/requirement/editrequirement/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Click to delete.", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]


    
    this.userinfodata = localStorage.getItem('userinfo');
    this.getPageSizes();
    this.refresh();
    this.initBreadCrumb();
      
  }
    
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Requirements',
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
            name: 'Requirements',
            isLink: false
          }
 
        ]
    };
  }


  goToPage(e: any) {
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "View") {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Edit") {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      this.Delete(e.row);
    }
    // console.log('rowdata', e)
  }

  add() {
    this.router.navigateByUrl('/requirement/addrequirement');
  }

  get curPage(): number {
    return this.offset;
  }

  selectdata(e) {
    this.deleteId = '';
    this.deleteId = e;
  }

  refresh() {
    ;
    this.loadSave = true;

    this.loading = true;
    this.requirementSevice.GetrequirementList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.myCheckbox)
      .subscribe(response => {
        this.loadSave = true;
        ;
        this.load = false;
        // console.log('columndata', this.jsonData)
        this.jsonData = response;
        this.load = true;
        this.jsonData = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);
        // console.log('columndata', this.jsonData)
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        //if (this.jsonData.data.length > 0) {
        //  this.totalRecords = this.columndata[0].total_records;
        //} else {
        //  this.totalRecords = 0;
        //}
        this.offset = this.currentPage;
        setTimeout(() => {
          this.loadSave = false;
        },3000)
        
      }, error => {
        this.loadSave = false;
      },
        () => {
          this.loadSave = false;
        }
    );

  }

  displayCheck(event) {
  }

  deleteAll() {
   if (this.deleteId != null && this.deleteId != "") {
     const message = `Are you sure you want to delete all the selected Requirement(s)?"`;
     this.dialogService.confirm('Delete requirement(s)', message).subscribe(confirmed => {
       if (confirmed) {
         this.requirementSevice.DeleteRecords(this.deleteId, 'tblRequirements').subscribe(r => {
           this.toaster.success(`Selected Requirement(s) has been deleted successfully`);
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
    const message = `Are you sure you want to delete this requirement  "${row.Name}"?`;
    this.dialogService.confirm('Delete requirement', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.requirementSevice.DeleteRecords(row.Id, 'tblRequirements').subscribe(r => {
          this.toaster.success(`Requirement  "${row.Name}" has been deleted successfully`);
          this.loadSave = false;
          this.refresh();
        }, error => {
        });
      }
    });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      // console.log('lstPageSize', this.lstPageSize);
    })
  }

  curPageemit(e) {
    return this.offset;
  }

  MainMethod(e: any) {
    //;
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
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

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.searchTxt = event;
    this.refresh();
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
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
  }
  LoadViewData() {
   ;
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
     
    }, () => {
    
    });
  }
  SetManageViewValue(e) {
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.vewId = e.event;
    this.refresh();
  }
  switchClicked(event) {
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.refresh();
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }
  }       

}
















