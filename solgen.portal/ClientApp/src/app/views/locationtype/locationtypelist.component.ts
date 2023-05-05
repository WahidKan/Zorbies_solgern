import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModuleList, CommonService } from '../shared/common.service';
import { LocationtypeserviceService } from './locationtypeservice.service';
@Component({
  selector: 'app-locationtypelist',
  templateUrl: './locationtypelist.component.html',
  styleUrls: ['./locationtypelist.component.scss']
})
export class LocationtypelistComponent implements OnInit {

  //constructor() { }

  //ngOnInit() {
  //}
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  modulePermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';

  lstPageSize: any
  pageSizeValue: number;
  loadSave: boolean = false;
  pageTitle;
  searhName;

  constructor(private locationtypeserviceService: LocationtypeserviceService, private dialogService: ConfirmationDialogService,
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

  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.locationtypeserviceService.GetLocationTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.locationtypeserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onSort(e) {

  }
  setPage(e) {

  }
  displayDetailDetail(e) {

  }
  popUpOpen() {
    
  }
  reset() {

  }
  search() {

  }
  updateFilter(e) {

  }
  
}
