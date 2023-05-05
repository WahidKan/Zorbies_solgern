import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService, ModuleList, validationModel } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageservicecrewService } from './manageservicecrew.service';
import { SelectionType } from '@swimlane/ngx-datatable';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { AddeditservicecrewpopupComponent } from './addeditservicecrewpopup/addeditservicecrewpopup.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { ServiceCrewMembersPopupComponent } from './service-crew-members-popup/service-crew-members-popup.component';

@Component({
  selector: 'app-servicecrewlist',
  templateUrl: './servicecrewlist.component.html',
  styleUrls: ['./servicecrewlist.component.scss']
})
export class ServicecrewlistComponent implements OnInit {
  @ViewChild('ServiceCrewMembersList', { static: false }) ServiceCrewMembersPopup: ServiceCrewMembersPopupComponent;
  validationModel: validationModel = new validationModel();
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('AddEditServiceCrew', { static: false }) AddEditModal: AddeditservicecrewpopupComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;

  @Input() offset: number;

  moduleName = 'ServiceAppointment';
  submoduleName = 'ServiceCrew';
  tableName = 'tblServiceCrew';

  //modulePermission: ModuleList;
  SelectionType = SelectionType;
  selected = [];

  companyId: any;
  loginuserid: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  pagedDataView: any = {
    pager: {},
    data: []
  };
  placeholder: string = 'Search by Name'
  searchlabelName: string = 'Name'
  listLabelName: string = 'Service Crews'
  jsonData: any;
  columndata: any;
  columnheading: any;
  ViewModel: any;
  totalRecords: any;
  custom_view_id: any;
  is_filter: any;
  deleteId: any;
  loadSave: boolean = false;
  pageSizeValue: any;
  currentPage: any=1;
  lstPageSize: any;
  listFiltertext = '';
  vewId: any = '';
  searchUserType: string = '';
  sortDir = 'desc';
  listFilter = '';
  searchTxt = '';
  sortColumn = 'id';
  searchFilter = '';
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  actionarray: any[] = [];
  load: boolean = false;
  jsoncondition: any;
  myCheckbox: any = false;
  jsonDatapack: any;
  userinfodata: any;
  isSuperAdmin:any;

  constructor(private servicecrewService: ManageservicecrewService, private dialogService: ConfirmationDialogService, private commonService: CommonService,
    private router: Router, private activeRoute: ActivatedRoute, private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);



    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
    });
  }
  ngOnInit() {
    this.isSuperAdmin=localStorage.getItem('isSuperAdmin');
    this.loadSave = true;
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.getPageSizes();
    this.currentPage = 1;
    this.actionarray = [
      { "name": "View", "click": "goToPage(row)", "route": "/servicecrew/view/", "title": "View Detail", "iclass": "feather-eye text-info pr-2", "condition": "1==1" },
      { "name": "Edit", "click": "goToPage(row)", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]

    this.userinfodata = localStorage.getItem('userinfo');
    this.LoadViewData();
    this.refresh();
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

    ;
    this.servicecrewService.GetServiceCrewList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.myCheckbox)
      .subscribe(response => {
        this.load = false;

        this.jsonDatapack = JSON.stringify(response);
        this.jsoncondition = JSON.stringify(this.validationModel);
        this.load = true;
        ;
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

  filterpopup() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }

  reset() {
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
  }
  search() {
    ;
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
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
  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = event;
    this.refresh();
  }

  ShowAddEditModal(crewId: any) {
    let _crewId = crewId;
    this.AddEditModal.show(_crewId);
  }

  refreshList() {
    this.custom_view_id = '';
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.refresh();
  }
  deleteAll() {

    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete Service Crew(s)"`;
      this.dialogService.confirm('Delete Service Crew(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.loadSave = true;
          this.servicecrewService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Record(s) has been deleted successfully`);
            this.deleteId = "";
            this.selected = [];
            this.refresh();
            this.loadSave = false;
          }, error => {
              this.loadSave = false;
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  Delete(row: any) {
    const message = `Are you sure you want to delete Service Crew "${row.Name}"?`;
    this.dialogService.confirm('Delete Service Crew', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.servicecrewService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Service Crew "${row.Name}" has been deleted successfully`);
          this.refresh();
          this.loadSave = false;
        }, error => {
            this.loadSave = false;
        });
      }
    });
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

  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  GetcustomViewid(event) {
    ;
    if (event == 'undefined' || typeof event == 'undefined') {
      this.LoadViewData();
    }
    this.pagedDataView.data.forEach(cnt => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
      }
    });
    this.vewId = event;
    this.custom_view_id = event;
    this.refresh();
  }

  ShowMembersListPopup($event){
    this.ServiceCrewMembersPopup.show($event);

  }


  LoadViewData() {
    this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedDataView = this.commonService.pagedData;
      // console.log("DataOf", this.pagedDataView);
      this.pagedDataView.data.forEach(cnt => {
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
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.vewId = e.event;
    this.refresh();
    //this.LoadViewData();
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
    ;
    this.deleteId = '';
    this.deleteId = e;
  }

  goToPage(e: any) {
    ;
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      ;
      this.Delete(e.row);
    }

    if (e.page.name == "Edit") {
      this.ShowAddEditModal(e.row.Id);
    }
  }
  add() {
    this.ShowAddEditModal('');
  }
}
