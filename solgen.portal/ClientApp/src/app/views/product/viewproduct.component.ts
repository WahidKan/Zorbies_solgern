import { Component, OnInit } from '@angular/core';
import { ProductListService, CheckboxData } from './productlist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../shared/common.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { DateTimeToLocalForAddEditPipe } from 'src/app/pipes/datetime.pipe';
@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.scss']
})
export class ViewproductComponent implements OnInit {
  pageSizeValue: number;
  productid: any;
  listFilter: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any;
  sortDir = 'desc';
  sortColumn = 'createdon';
  moduleName = 'Product';
  submoduleName = 'Products';
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  ProductName: any;
  displayType = 'VIEW';
  lstPriceBooks: any = {
    pager: {},
    data: []
  }
  lstCampaigns: any = {
    pager: {},
    data: []
  }

  checkboxdata1: Array<CheckboxData> = [];
  customCompnentValuesTop: any;
  pageSize: number = 4;

  priceBooksCount: number = 0;
  campaignCount: number = 0;

  priceBooksPageNo: number = 1;
  campaignPageNo: number = 1;
  lstSolgenIcons: any;
  icontoShow: string = '';
  contentHeader: object;
  timeFormat: string = '12';

  constructor(private dialogService: ConfirmationDialogService,
    private productlistService: ProductListService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.timeFormat = this.commonService.getTimeFormat();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.productid = id;
      })
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.loadSave = true;
    this.getSolgenIcons();
    this.GetCustomFieldsList();
    this.getRelatedProducts();

    this.initBreadCrumb();
  }

  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Products',
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
             name: 'Manage Products',
             isLink: true,
             link: '/product'
           },
           {
             name: 'Product Details',
             isLink: false
           }

         ]
     };
   }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  close() {
    this.router.navigateByUrl("/product");
  }
  GetCustomFieldsList() {
    this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.productid,this.displayType).subscribe(result => {
      if (result) {
        this.customCompnentValues = this.productlistService.customFieldsList.data;
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }

          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }
            this.formControlList.push(obj);
          }
        })
        const group: any = {};
        const _datetime = new DateTimeToLocalForAddEditPipe;
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'datetime') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          if (cnt.dt_code == 'select') {

            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }

          if (cnt.name == 'ProductIcon') {
            ;
            let data = this.lstSolgenIcons.filter(x => x.name == cnt.value);
            if (data.length > 0) {
              ;
              this.icontoShow = data[0].text;
              // console.log("this.icontoShow", this.icontoShow);
              ;
            }
          }


          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        this.GetCustomFieldsListTopRow();
        this.loadSave = false;
      }
    });
  }
  getSolgenIcons() {
    this.commonService.GetMasterItemsNotAuth("SolgenIcons").subscribe((result: any) => {
      this.lstSolgenIcons = this.commonService.masters;
      // console.log("this.lstSolgenIcons", this.lstSolgenIcons);
    })
  };

  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.productid, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValuesTop = this.productlistService.customFieldsList.data;
        this.customCompnentValuesTop.forEach(cnt => {

          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          if (cnt.ColumnName == 'ProductName') {
            this.ProductName = cnt.value;
          }
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }
        });
        this.customCompnentValuesTop = this.customCompnentValuesTop.filter(x => x.ColumnName != 'ProductName');
        this.loadSave = false;
      }
    });
  }


  getRelatedProducts() {
    this.pageSize = 4;
    this.refreshPriceBooksList();
    this.refreshCampaignList();
  }

  refreshPriceBooksList() {
    this.productlistService.GetProductPriceBooksList(this.productid, this.sortColumn, this.sortDir, this.priceBooksPageNo, this.pageSize).subscribe(resp => {
      this.lstPriceBooks = resp;
      this.priceBooksCount = resp.pager.totalItems;
    });
  }

  refreshCampaignList() {
    this.productlistService.GetProductCampaignsList(this.productid, this.sortColumn, this.sortDir, this.campaignPageNo, this.pageSize).subscribe(resp => {
      this.lstCampaigns = resp;
      this.campaignCount = resp.pager.totalItems;
    });
  }


  onPriceBooksSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshPriceBooksList();
  }

  onCampaignsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshCampaignList();
  }


  setPriceBooksPageNo($event) {
    this.priceBooksPageNo = $event.page;
    this.refreshPriceBooksList();
  }

  setCampaignPageNo($event) {
    this.campaignPageNo = $event.page;
    this.refreshCampaignList();
  }

  OnBackToListClick() {
    this.location.back();
  }
}
