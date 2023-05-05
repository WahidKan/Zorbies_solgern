import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SearchfilteraddComponent } from '../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../shared/manageview/manageview.component';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ModuleList, CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { LoanproductService } from './loanproduct.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loanproductlist',
  templateUrl: './loanproductlist.component.html',
  styleUrls: ['./loanproductlist.component.scss']
})
export class LoanproductlistComponent implements OnInit {

  @ViewChild('templateFilterView', { static: false }) FilterViewModal: SearchfilteraddComponent;
  @ViewChild('templateManageView', { static: false }) ManageViewModal: ManageviewComponent;
  //@Input('moduleName') moduleName: any;
  //@Input('submoduleName') submoduleName: any;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  @Input() offset: number;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  custom_view_id = '';
  searchFilter = '';
  //modulePermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  moduleName = 'finance';
  submoduleName = 'loanproduct';
  tableName = 'tblLoanProduct';
  sortColumn = 'CreatedOn';
  SelectionType = SelectionType;
  companyId: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  currentdisable: '1'
  lstPageSize: any
  pageSizeValue: number;
  currentPage: any;
  listFiltertext = '';
  jsonData: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  deleteId: any;
  selected = [];
  is_filter : any;
  lstListingColorCode: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = false;
  contentHeader: object;
  constructor(private loanproductService: LoanproductService, private dialogService: ConfirmationDialogService, 
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);


 
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANPRODUCTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANPRODUCTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {   
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOANPRODUCTDELETE');
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
    this.custom_view_id = '';
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
  
this.initBreadCrumb();
}
initBreadCrumb() {
  this.contentHeader = {
    headerTitle: 'Manage Loan Product',
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
          name: 'Manage Loan Product',
          isLink: false
        }

      ]
  };
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
  getListingColorCode(fieldValue: any) {
   // 
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }


    }
//// console.log('this.lstListingColorCode', this.lstListingColorCode)
    return this.lstListingColorCode;
    //// console.log('this.lstListingColorCode', this.lstListingColorCode)

  }
  refresh() {
    //
    this.loading = true;
    this.loanproductService.GetLoanProductlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId)
      .subscribe(response => {
        //
        this.jsonData = response;
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        // console.log("this.columnheading", this.columnheading); 
        // // console.log("data", this.columndata );
        if (response.data.length > 0) {
          this.totalRecords = this.columndata[0].total_records;
          for (var i = 0; i < response.data.length; i++) {
            if (parseInt(response.data[i].LoanAmountMax) >= 0) {
              response.data[i].LoanAmountMax = this.commonService.formatAmount(response.data[i].LoanAmountMax);             
            }
            if (parseInt(response.data[i].LoanAmountMin) >= 0) {
              response.data[i].LoanAmountMin = this.commonService.formatAmount(response.data[i].LoanAmountMin);
            }
            if (parseInt(response.data[i].MiniumCreditScore) >= 0) {
              response.data[i].MiniumCreditScore = this.commonService.formatAmount(response.data[i].MiniumCreditScore);
            }
            if (parseInt(response.data[i].PrefereedScore) >= 0) {
              response.data[i].PrefereedScore = this.commonService.formatAmount(response.data[i].PrefereedScore);
            }
          } 
        } else {
          this.totalRecords = 0;
        }
        this.offset = this.currentPage;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  get curPage(): number {
    return this.offset ;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {
    this.loading = true;
    this.currentPage =1;
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
    this.refresh();
  }
  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  popUpOpen() {
    this.is_filter = '';
    this.is_filter=this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
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
      this.listFiltertext = "ProductName like '%" + this.listFilter + "%'";
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
      const message = `Are you sure you want to delete Products(s)"`;
      this.dialogService.confirm('Delete Products(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.loanproductService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
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
    const message = `Are you sure you want to delete Loan Product  "${row.ProductName }"?`;
    this.dialogService.confirm('Delete Loan Product', message).subscribe(confirmed => {
      if (confirmed) {
        this.loanproductService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Loan Product "${row.FirstName}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
    });
  }

}
