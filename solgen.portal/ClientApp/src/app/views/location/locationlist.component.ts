import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LocationService } from './locationlist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList, validationModel } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { debuglog } from 'util';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
//   styleUrls: ['./locationlist.component.scss']
})
export class LocationlistComponent implements OnInit {
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  moduleName = 'location';
  submoduleName = 'locations';
  pagedData: any = {
    pager: {},
    data: []
  };
  searchFilter = '';
  listFiltertext = '';
  tableName = 'tbllocation';
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  selected = [];
  is_filter: any;
  ViewModel: any = '';
  validationModel: validationModel = new validationModel()
  modulePermission: any[] = [];
  loginuserid: any;
  custom_view_id = '';
  companyId: any;
  deleteId: any;
  loadSave = false;
  load: boolean = false;
  contentHeader: object;

  placeholder: string = 'Search by Name'
  searchlabelName: string = ''
  listLabelName: string = 'Locations'
  userinfodata: any;
  constructor(private locationService: LocationService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {

    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOCATIONSADD'); //MANAGELOCATIONADD
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOCATIONSUPDATE'); //MANAGELOCATIONUPDATE

    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOCATIONSDELETE'); //MANAGELOCATIONDELETE
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
      this.companyType = userdetail.companyType;
      this.validationModel.companyType = userdetail.companyType;

    });

  }

  ngOnInit() {
    this.initializeActionArray();
    this.custom_view_id = '';
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
    this.initBreadCrumb();
    
  }
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Locations',
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
             name: 'Manage Locations',
             isLink: false
           }
  
         ]
     };
   }

  initializeActionArray() {
    this.actionarray = [
      { "name": "View", "click": "goToPage(row)", "route": "/location/view/", "title": "View Location", "iclass": "feather-eye text-info pr-2", "condition": "1==1" }
      , { "name": "Edit", "click": "goToPage(row)", "route": "/location/editlocation/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate == true" }
      , { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete == true" }
    ]

    this.userinfodata = localStorage.getItem('userinfo');
  }

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = (event).replace('t54','tblLocation');
    this.refresh();
  }

 

  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
 
    this.locationService.GetLocationList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter)
      .subscribe(response => {
        this.load = false;
        this.jsonData = response;
    
        this.jsonDatapack = JSON.stringify(this.jsonData);
        this.jsoncondition = JSON.stringify(this.validationModel);
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;


        if (response.data.length > 0) {
          this.totalRecords = this.columndata[0].total_records;
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
        this.loadSave = false;
        this.load = true;

      }, error => {
          this.load = true;
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
  //displayDetailDetail(TemplateName: any) {
  //  this.ManageViewModal.show(TemplateName);
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
  //    this.listFiltertext = "LocationName like '%" + this.listFilter + "%'";
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

  popUpOpen() {
    this.is_filter = '';
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }

  Delete(row: any) {
    const message = `Are you sure you want to delete Location "${row.LocationName}"?`;
    this.dialogService.confirm('Delete Location', message).subscribe(confirmed => {
      if (confirmed) {
        this.locationService.CheckLocationAssigned(row.Id).then((item:any) => {
          if (item) {
            if (item.statusCode == 200) {
              var _response = JSON.parse(item.responseMessage);

              let _resp = _response["data"] as any[];
              const title = new TitleCasePipe();

              if (_resp.length > 0) {
                let length = _resp.length;
                let errorMessage = "";
                if (length == 1) {
                  errorMessage = "This location can't be deleted as it is assigned to " + title.transform(_resp[0].Name) + ".";
                }
                else {
                  errorMessage = "This location can't be deleted as it is assigned to " + _resp.map(x => { return title.transform(x.Name) }).join(', ') + ".";
                }
                this.toaster.error(errorMessage);
              }
              else {
                this.locationService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
                  this.toaster.success(`Location "${row.LocationName}" has been deleted successfully.`);
                  if (this.columndata.length == 1) {
                    if (this.currentPage > 1) {
                      this.currentPage = this.currentPage - 1;
                    }
                  }
                  this.refresh();
                }, error => {
                });
              }
            }
          }
        });
      }
    });
  }


  jsonDatapack: any;
  currentPage: any;
  pageSizeValue: number;
  lstPageSize: any;
  sortDir = 'desc';
  sortColumn = 'LocationName';
  companyType: any;
  jsoncondition: any;
  actionarray: any[] = [];
  listFilter = '';
  myCheckbox: any = false;
  vewId: any;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;

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
    this.deleteId = '';
    this.deleteId = e;
  }

  goToPage(e: any) {
    if (e.page.route != "null" && e.page.route != undefined) {
      this.router.navigateByUrl(e.page.route + e.row.Id);
    }
    if (e.page.name == "Delete") {
      this.Delete(e.row)
    }
    if (e.page == "view") {
      this.router.navigateByUrl('/location/view/' + e.row.Id);
    }
  }
  add() {
    this.router.navigateByUrl('/location/addlocation')
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
      this.listFiltertext = "LocationName like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }
  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }
  reset() {
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
    this.selected = [];
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected location(s)?`;
      this.dialogService.confirm('Delete Location(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.locationService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Selected location(s) has been deleted successfully.`);
            this.deleteId = "";
            this.selected = [];
            if (this.columndata.length == 1) {
              if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1;
              }
            }
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

  switchClicked(event) {
    this.listFiltertext = '';
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "LocationName like '%" + this.listFilter + "%'";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.refresh();
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }
  }

  filterpopup() {
    this.is_filter = '';
    //if (this.listFiltertext != null )
    // this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }
  SetManageViewValue(e) {

    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.refresh();
    //this.LoadViewData();
  }


}
