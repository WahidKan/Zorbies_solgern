import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomfieldService } from './customfield.service';
import { CommonService } from '../shared/common.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customfieldlist',
  templateUrl: './customfieldlist.component.html'

})
export class CustomfieldlistComponent implements OnInit {
  @ViewChild('clearDrop', { static: false}) clearDrop: NgSelectComponent;
  @ViewChild('clearDropSub', { static: false}) clearDropSub: NgSelectComponent;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  loadSave = false;
  lstModuleList: any;
  lstSubModuleList: any;
  pageTitle: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  searchTxt: any;
  loginuserid: any;
  loading = false;
  moduleId: any;
  SubModuleId: any;
  sortDir = 'desc';
  sortColumn = 'name';
  pageSizeValue: number;
  lstPageSize: any;
  constructor(private customfieldService: CustomfieldService,
    private commonService: CommonService, private router: Router,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.LoadCustomFieldsLength();
    this.search();
    this.getPageSizes();
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
    // // console.log("PageSizeLst", this.lstPageSize);
  }

  search() {
    this.loading = true;
    this.pageSizeValue = 10;
    this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.customfieldService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.loading = true;
    this.moduleId ='';
    this.sortDir = 'asc';
    this.SubModuleId ='';

    this.clearDrop.clearModel();
    this.clearDropSub.clearModel();
    //this.sortColumn = 'emailTemplateCreatedOn';
    this.pageSizeValue = 10;
    this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.customfieldService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onChange($event) {
    this.loading = true;
    this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.customfieldService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.customfieldService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  setPage($event) {
    this.loading = true;
    // // console.log("Events", $event.page - 1);
    this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.customfieldService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  LoadCustomFieldsLength() {
    this.commonService.getMasterItemsList("custom_modules").subscribe(res => {
      this.lstModuleList = this.commonService.masters;
    });
  }
  onChangeModuleName($event) {
    this.moduleId = $event.value;
    // // console.log("$Event", $event);
    this.commonService.getMasterSubModuleList("custom_sub_modules", $event.value).subscribe(res => {
      this.lstSubModuleList = this.commonService.masters;
      // // console.log("sdddd", this.lstSubModuleList);
    });

  }

  SetSubModule($event) {
    this.SubModuleId = $event.value;
  }
  restSubModuleddl() {
    this.SubModuleId = null;
  }
  restModuleNameddl() {
    this.moduleId = null;
  }
}
