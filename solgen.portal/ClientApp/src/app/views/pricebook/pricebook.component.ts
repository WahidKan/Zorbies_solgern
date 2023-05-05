import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PricebookService } from './pricebook.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { PricebookassociateproductComponent } from './associateproduct/pricebookassociateproduct.component';
import { AssociateproductviewComponent } from './associateproductviewdetail/associateproductview.component';

@Component({
  selector: 'app-pricebook',
  templateUrl: './pricebook.component.html',
  styleUrls: ['./pricebook.component.scss']
})
export class PricebookComponent implements OnInit {

  @ViewChild('pricebookAssociateproduct', { static: false }) pricebookAssociateproduct: PricebookassociateproductComponent;
  @ViewChild('totalDocAssociateProduct', { static: false }) totalDocAssociateProduct: AssociateproductviewComponent;
  @Input() offset: number;
  displayCheck: any;
  UserType: Observable<any>;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  //modulePermission: ModuleList;
  SelectionType = SelectionType;
  conId: any;
  currentPage: any;
  selected = [];
  innerHTML: any;
  @ViewChild('table', { static: false }) table: DatatableComponent;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'PriceBookID';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  PriceBookID: any;
  lstPageSize: any
  pageSizeValue: number;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = false;

  constructor(private pricebookService: PricebookService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);


    // console.log("modulePermission", this.modulePermission);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'PRICEBOOKADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'PRICEBOOKUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'PRICEBOOKDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }
  ngOnInit() {
    this.currentPage = 1;
    this.pageSizeValue = 15;
    this.getPageSizes();
    this.search();
  }
  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  search() {
    this.loading = true;
    this.pricebookService.GetPriceBookList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.pricebookService.pagedData;
      // console.log("PagedAta",this.pagedData);
      this.loading = false;
      this.offset = this.currentPage;

    }, error => {
      this.loading = false;
    });
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }


  onChange($event) {
    this.loading = true;
    this.pricebookService.GetPriceBookList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.pricebookService.pagedData;
      // console.log("PagedAta", this.pagedData);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.searchUserType = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.pricebookService.GetPriceBookList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.pricebookService.pagedData;
      this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page - 1;
    this.pricebookService.GetPriceBookList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue,'').subscribe(response => {
      this.pagedData = this.pricebookService.pagedData;
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
    this.currentPage = 0;
    this.pricebookService.GetPriceBookList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue,'').subscribe(response => {
      this.pagedData = this.pricebookService.pagedData;
      this.loading = false;
    }, error => {
        this.loading = false;
    });
  }
  onSelect({ selected }) {
    if (this.PriceBookID == "" || this.PriceBookID == null || this.PriceBookID == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        this.PriceBookID += selected[i].PriceBookID.toString() + ",";
      }
    }
    else {
      this.PriceBookID = null;
      this.PriceBookID = "";
      for (let i = 0; i < selected.length; i++) {
        this.PriceBookID += selected[i].PriceBookID.toString() + ",";
      }
    }
  }
  onActivate(event) {
  }
  remove() {
    if (this.PriceBookID != null && this.PriceBookID != "") {
      const message = `Are you sure you want to delete Price Book(s)?`;
      this.dialogService.confirm('Delete Price Book(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.pricebookService.deleteMultiplePriceBook(this.PriceBookID).subscribe(r => {
            this.toaster.success(`Price Book(s) has been deleted successfully.`);
            this.PriceBookID = "";
            this.selected = [];
            this.search();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }
  DeletePriceBook(row: any) {
    // console.log("deleete",row);
    const message = `Are you sure you want to delete Price Book "${row.PriceBookName}"?`;
    this.dialogService.confirm('Delete Price Book ', message).subscribe(confirmed => {
      if (confirmed) {
        this.pricebookService.delete(row.PriceBookID).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.search();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }
  priceBookEvent() {
    this.search();
  }
  totalDocAssociateProducts() {
    this.search();
  }
  DisplayDocumentPopupWindow(id) {
    this.pricebookService.GetAssociateDocumentList(id).subscribe((result: any) => {
      if (result != null) {
        this.totalDocAssociateProduct.show(id, result);
      }
     // this.DocumentName = result;
    });

  }
  AddAssociateProduct(row) {
    
    let priceBookId = row.PriceBookID;
    let opportunityId = '';
    let productName = row.PriceBookName;
    this.pricebookAssociateproduct.show(priceBookId, opportunityId, '', productName);
  }
}
