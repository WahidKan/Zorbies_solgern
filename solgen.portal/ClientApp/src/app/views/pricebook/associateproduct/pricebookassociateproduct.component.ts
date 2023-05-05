import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectionType } from '@swimlane/ngx-datatable';
import { PricebookService } from '../pricebook.service';

@Component({
  selector: 'app-pricebookassociateproduct',
  templateUrl: './pricebookassociateproduct.component.html',
  styleUrls: ['./pricebookassociateproduct.component.scss']
})
export class PricebookassociateproductComponent implements OnInit {

  @ViewChild('pricebookAssociateproduct', { static: false }) pricebookAssociateproduct: ModalDirective;
  @Output() priceBookEvent = new EventEmitter();
  AssociatedproductpagedData: any = {
    pager: {},
    data: []
  };
  proposalId: any;
  SelectionType = SelectionType;
  opportunityId: any;
  objectname: any;
  selected = [];
  submoduleid: any;
  listNameFilter: any;
  PriceBookId: any;
  lineItemDiv = false;
  assignedData: any[] = [];
  listFilter: any;
  // sortColumn: any;
  sortDir = 'desc';
  sortColumn = 'createdOn';
  configurationSetings: FormGroup;
  editLineItem: FormGroup;
  lstPageSize: any;
  lstPageSizeBankerList: any;
  isEditLineItem = false;
  editLineItemData: any;
  productName: any;
  loginuserid: any;
  loading = false;
  LineItemId: any;
  loadSave = false;
  lineItemProductCal = false;
  conId: any;
  pageSizeValue = 10;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private pricebookService: PricebookService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    //this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.listNameFilter = '';
    this.getPageSizes();
    this.initForm();
    this.initEditLineItemForm('');
  }

  show(priceBookId, opportunityId, row, productName) {
    
    if (row != null && row != '') {
      this.productName = productName;
      this.isEditLineItem = true;
      this.PriceBookId = priceBookId;
      this.LineItemId = row.lineItemId;
      this.opportunityId = opportunityId;
      this.loadSave = false;
      this.lineItemDiv = false;
      this.listNameFilter = '';
      this.lineItemProductCal = false;
      this.editLineItemData = row;
      this.initEditLineItemForm(row);
      this.pricebookAssociateproduct.show();
    }
    else {
      this.listNameFilter = '';
      this.PriceBookId = priceBookId;
      this.productName = productName;
      this.lineItemDiv = true;
      this.isEditLineItem = false;
      this.lineItemProductCal = false;
      this.opportunityId = opportunityId;
      this.pricebookService.GetAssociateProductList(this.PriceBookId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
        
        this.AssociatedproductpagedData = this.pricebookService.pagedData;
        this.getPageSizes();
        // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        this.pricebookAssociateproduct.show();
      })
    }
  }
  close() {
    this.selected = [];
    this.lineItemDiv = false;
    this.lineItemProductCal = false;
    const control2 = <FormArray>this.configurationSetings.controls.lineItemDisCount;
    control2.controls = [];
    this.pricebookAssociateproduct.hide();

  }

  searchProduct() {
    this.pricebookService.GetAssociateProductList(this.PriceBookId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.pricebookService.pagedData;
      this.getPageSizes();
      // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
      //this.proposalpopup.show();
    })
  }
  resetProduct() {
    this.listNameFilter = '';
    this.pricebookService.GetAssociateProductList(this.PriceBookId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.pricebookService.pagedData;
      this.getPageSizes();
      // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
      //this.proposalpopup.show();
    })
  }

  updateNameFilter(event) {
    this.listNameFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.searchProduct();
    }
  }

  setPageSalesList($event) {
    this.loading = true;
    this.assignedData = [];
    let currentPageSalesUserList = $event.page - 1;
    //this.opportunityId = opportunityId;
    this.pricebookService.GetAssociateProductList(this.PriceBookId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, currentPageSalesUserList, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.pricebookService.pagedData;
      // this.selected;
      for (var i = 0; i < this.AssociatedproductpagedData.data.length; i++) {
        this.selected.forEach(s => {
          if (this.AssociatedproductpagedData.data[i].id === s.id) {
            this.AssociatedproductpagedData.data[i] = s;
          }
        })
      }

      //this.AssociatedproductpagedData = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  onChange($event) {
    this.loading = true;
    this.pricebookService.GetAssociateProductList(this.PriceBookId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.pricebookService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeBankerList = this.commonService.masters;
    })
  }
  onActivate(event) {
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.pricebookService.GetAssociateProductList(this.PriceBookId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.pricebookService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSelect({ selected }) {
    
    if (this.conId == "" || this.conId == null || this.conId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.conId += selected[i].id.toString() + ",";
        }
      }

    }
    else {
      this.conId = null;
      this.conId = "";
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      for (let i = 0; i < selected.length; i++) {

        if (selected[i].asociatedUser !== 1) {
          this.conId += selected[i].id.toString() + ",";
        }
      }
    }
  }
  Next() {
    if (this.selected.length != 0) {
      this.lineItemDiv = false;
      this.GetMasterPrerequisiteLoanProductDocumentType();
      this.lineItemProductCal = true;
    }
    else {
      this.toaster.error("Please select at least one product!");
    }
  }
  previous() {
    const control2 = <FormArray>this.configurationSetings.controls.lineItemDisCount;
    control2.controls = [];
    this.lineItemDiv = true;
    this.lineItemProductCal = false;
  }
  get lineItemDisCount(): FormArray {
    return this.configurationSetings.get('lineItemDisCount') as FormArray;
  }

  private initForm() {
    this.configurationSetings = this.fb.group({
      lineItemDisCount: this.fb.array([]),
    });

  }

  GetMasterPrerequisiteLoanProductDocumentType() {
    let current = this;
    current.lineItemDisCount.reset();
    //this.loanproductService.getPrerequisiteLoanProductDocumentTypeNames('PrerequisiteLoanProductDocumentType').subscribe((result: any[]) => {
    this.selected.forEach(function (value) {
      let group = new FormGroup({
        id: new FormControl(value.id),
        ProductName: new FormControl(value.ProductName),
        PurchasePrice: new FormControl(value.PurchasePrice),
        SalePrice: new FormControl(value.SalePrice),
        Quantity: new FormControl('', Validators.nullValidator),
        Discount: new FormControl(''),
        listPrice: new FormControl('', [Validators.required ,Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]),
        LineItemDiscount: new FormControl('')
      });
      current.lineItemDisCount.push(group);
    })
    //});
  }
  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('PriceBookId', this.PriceBookId);
    input.append('opportunityId', this.opportunityId == 'undefined' ? '1002' : this.opportunityId);
    input.append('Fields', JSON.stringify(this.lineItemDisCount.value));
    return input;
  }
  SaveLineItem() {
    if (this.configurationSetings.valid) {
      this.loading = true;
      const lineItemModel = this.prepareFormDataForDocument();
      this.pricebookService.AddUpdateLineItem(lineItemModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.pricebookAssociateproduct.hide();
          this.router.navigateByUrl("/pricebook");
          //this.SetStatusData(this.field);
          this.selected = [];
          const control2 = <FormArray>this.configurationSetings.controls.lineItemDisCount;
          control2.controls = [];
          this.priceBookEvent.emit();
          setTimeout(() => { this.loading = false; }, 3000);
        }
        else {
          this.loading = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loading = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.configurationSetings);
    }
  }

  private initEditLineItemForm(row) {

    this.editLineItem = this.fb.group({
      lineItemId: [this.LineItemId, Validators.nullValidator],
      ProductFamily: [row.ProductFamily, [Validators.nullValidator, Validators.maxLength(255)]],
      LineItemDescription: [row.LineItemDiscription, [Validators.nullValidator, Validators.maxLength(500)]],
      AutomationId: [row.AutomationId, Validators.nullValidator],
      listPrice: [row.listPrice, [Validators.required,Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      SystemSize: [row.SystemSize, [Validators.nullValidator, Validators.pattern("^[0-9]*$")]],
      CommissionablePercentage: [row.CommissionablePercentage, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      SalePrice: [row.SalePrice, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      Quantity: [row.Quantity, [Validators.nullValidator, Validators.pattern("^[0-9]*$"), Validators.maxLength(5)]],
      Discount: [row.Discount, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
    });
  }
  get lineItemId() { return this.editLineItem.get('lineItemId'); }
  get ProductFamily() { return this.editLineItem.get('ProductFamily'); }
  get listPrice() { return this.editLineItem.get('listPrice'); }
  get LineItemDescription() { return this.editLineItem.get('LineItemDescription'); }
  get AutomationId() { return this.editLineItem.get('AutomationId'); }
  get SystemSize() { return this.editLineItem.get('SystemSize'); }
  get CommissionablePercentage() { return this.editLineItem.get('CommissionablePercentage'); }
  get SalePrice() { return this.editLineItem.get('SalePrice'); }
  get Quantity() { return this.editLineItem.get('Quantity'); }
  get Discount() { return this.editLineItem.get('Discount'); }
  private prepareFormDataForEditLineItem() {
    
    const input = new FormData();
    input.append('PriceBookId', this.PriceBookId);
    input.append('lineItemId', this.LineItemId);
    input.append('opportunityId', this.opportunityId == 'undefined' ? '1002' : this.opportunityId);
    input.append('Fields', JSON.stringify(this.editLineItem.value));
    return input;
  }
  SaveEdit() {
    
    if (this.editLineItem.valid) {
      this.loading = true;
      const lineItemModel = this.prepareFormDataForEditLineItem();
      //alert(this.PriceBookId);
      this.pricebookService.AddUpdateLineItem(lineItemModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.pricebookAssociateproduct.hide();
          this.editLineItem.reset();
          this.priceBookEvent.emit();
          this.router.navigateByUrl("/proposal-list/view/" + this.proposalId);
          setTimeout(() => { this.loading = false; }, 3000);
        }
        else {
          this.loading = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loading = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.editLineItem);
    }
  }

}
