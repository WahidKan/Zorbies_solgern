import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorService, VendorModel } from './vendor.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleNames, ModuleList } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-listvendor',
  templateUrl: './listvendor.component.html',
  styleUrls: ['./listvendor.component.scss']
})
export class ListvendorComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  VendorList: VendorModel[];
  loadSave: boolean = false;

  loading = false;
  sortDir = 'asc';
  sortColumn = 'CreatedOn';
  pageNumber = 0;
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  SearhName: string;
  modulePermission: ModuleList;
  loginuserid: any;
  constructor(private vendorService: VendorService,private toaster: ToastrService, private router: Router,
    private commonService: CommonService, private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }

  ngOnInit() {
    this.SearhName = ""
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.SearchVendor();
  }

  SearchVendor() {
    this.loading = true;
    this.vendorService.getVendorList(this.SearhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((response) => {
      this.pagedData = this.vendorService.pagedData;
      
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  ResetSearch() {
    this.table.sorts = [];
    this.SearhName = "";
    this.sortDir = 'asc';
    this.sortColumn = 'CreatedOn';
    this.pageNumber =0;
    this.pageSizeValue = 10;
    this.SearchVendor();
  }

  //function is used to update the status(active,inactive) of vendor
  disable(row) {
    const message = `Are you sure you want to disable this Vendor "${row.Name}"?`;
    this.dialogService.confirm('disable Vendor', message).subscribe(confirmed => {
      if (confirmed) {
        this.vendorService.setVendorStatus(ModuleNames.Vendor, row.Id, row.StatusID, "Vendor", "disable").subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(`"${row.Name}" has been disabled  successfully`);
            this.SearchVendor();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

  enable(row) {
    const message = `Are you sure you want to enable this Vendor  "${row.Name}"?`;
    this.dialogService.confirm('Enable Vendor', message).subscribe(confirmed => {
      if (confirmed) {
        this.vendorService.setVendorStatus(ModuleNames.Vendor, row.Id, row.StatusID, "Vendor", "enable").subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(`"${row.Name}" has been enabled  successfully`);
            this.SearchVendor();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }
  //function is used to delete the user
  DeleteVendor(row: any) {
    const message = `Are you sure you want to delete Vendor "${row.Name}"?`;
    this.dialogService.confirm('delete Vendor', message).subscribe(confirmed => {
      if (confirmed) {
        this.vendorService.deleteVendor(ModuleNames.Vendor.toString(), row.Id, "Vendor").subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toaster.success(`Vendor "${row.Name}" has been deleted successfully`);
            this.SearchVendor();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {

        });
      }
    });
  }


  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.SearhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchVendor();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.SearchVendor();  
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchVendor();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page-1;
    this.SearchVendor();   
  }
}
