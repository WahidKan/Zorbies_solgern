import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../master/master.service';
import { CommonService } from '../shared/common.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormmasterService } from './formmaster.service';

@Component({
  selector: 'app-formmasterlist',
  templateUrl: './formmasterlist.component.html',
  styleUrls: ['./formmasterlist.component.scss']
})
export class FormmasterlistComponent implements OnInit {
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  id = "";
  loading = false;
  sortDir = 'desc';
  sortColumn = 'masterCreatedon';
  pagedData: any = {
    pager: {},
    data: []
  };
  productdata: any
  listFilter = '';
  searchTxt = '';
  lstPageSize: any
  productid: any;
  clearM
  pageSizeValue: number;

  loginuserid: any;
  loadSave: boolean = false;


  constructor(private formmasterService: FormmasterService,
    private commonService: CommonService, private router: Router,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }
  getproductDropDown() {
    this.formmasterService.getproductDropDown().subscribe((response: any) => {
      this.productdata = response;
    });
  }

  SetProductValue(masternameId: string) {
    this.productid = masternameId;
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.search();
    this.refresh();
   
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  restMasterddl() {

  }
 

  refresh() {
    this.loading = true;
    this.formmasterService.getformmasterList(this.listFilter,  this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.formmasterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  search() {
    this.loading = true;
    this.formmasterService.getformmasterList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.formmasterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'asc';
    this.productid = "undefined";

    this.sortColumn = 'name';
    this.pageSizeValue = 10;
    this.formmasterService.getformmasterList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.formmasterService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort(e) {

  }
  setPage(e) {

  }

}
