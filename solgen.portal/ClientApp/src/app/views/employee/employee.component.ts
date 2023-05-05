import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('templateFilterView', { static: false}) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false}) ManageViewModal: ManageviewComponent;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  custom_view_id = '';
  modulePermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  listFiltertext: any;
  sortColumn = 'CreatedOn';
  moduleName = 'users';
  submoduleName = 'employee';
  companyId: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';

  lstPageSize: any
  pageSizeValue: number;
  currentPage: number;

  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  popUpOpen: any;

  loadSave: boolean = false;

  constructor(private employeeService: EmployeeService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
    this.currentPage = 1;
  }

  ngOnInit() {
    this.custom_view_id = '';
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
  }

  refresh() {
    this.loading = true;
    //this.currentPage = 1;
    this.employeeService.GetEmployeeList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id)
      .subscribe(response => {
        // // console.log(response)
        this.jsonData = response;
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        // // console.log("columnheading", this.jsonData.data)
        // // console.log("LoopData", this.columndata[0].total_records)
        this.totalRecords = this.columndata[0].total_records;
       
        //this.pagedData = this.leadlistService.pagedData;
        //// // console.log("PagedData", this, this.pagedData);
        this.loading = false;
      }, error => {
        this.loading = false;
      })
  }

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFiltertext = this.listFilter;
    this.listFilter = event;
    this.refresh();
    this.listFilter = this.listFiltertext;
  }

  //Custom sorting functions   -------

  //sortingFunction() {
  //  this.rows.sort((propA, propB) => {

  //    let indexA = this.order.indexOf(propA.country);
  //    let indexB = this.order.indexOf(propB.country);
  //    if (indexA > indexB) {

  //      return 1;
  //    } else if (indexA < indexB) {

  //      return -1;
  //    }

  //    return 0;
  //  });
  //}


  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {
    this.currentPage = $event.page;
    this.refresh();
  }

  reset() {
    this.listFilter = '';
    this.currentPage = 1;
    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.currentPage = 1;
    this.refresh();
  }
  onChange($event) {
    this.refresh();
  }
  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  GetcustomViewid(event) {
    this.custom_view_id = event;
    this.refresh();
  }

  //popUpOpen() {
  //  this.FilterViewModal.show( this.companyId);
  //}
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
    this.listFiltertext = this.listFilter;
    this.listFilter = "name like '%" + this.listFilter + "%'";
    this.refresh();
    this.listFilter = this.listFiltertext;
  }
}
