import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ProposallistService } from '../proposallist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { PricebooklistpopupComponent } from '../pricebooklistpopup/pricebooklistpopup.component';

declare const $: any;
@Component({
  selector: 'app-proposallineitempopup',
  templateUrl: './proposallineitempopup.component.html',
  styleUrls: ['./proposallineitempopup.component.scss']
})
export class ProposallineitempopupComponent implements OnInit {
  @ViewChild('proposalpopup', { static: false }) proposalpopup: ModalDirective;
  @ViewChild('PriceBookListModelPopup', { static: false }) PriceBookListModelPopup: PricebooklistpopupComponent;
  @Output() lineItem = new EventEmitter();
  AssociatedproductpagedData: any = {
    pager: {},
    data: []
  };
  ListPriceIndex: number;
  PriceBookID: any;
  proposalId: any;
  SelectionType = SelectionType;
  opportunityId: any;
  objectname: any = '';
  selected = [];
  submoduleid: any;
  listNameFilter: any;
  lineItemDiv = false;
  assignedData: any[] = [];
  listFilter: any = '';
  // sortColumn: any;
  sortDir = 'desc';
  sortColumn = 'createdOn';
  configurationSetings: FormGroup;
  editLineItem: FormGroup;
  lstPageSize: any;
  lstPageSizeBankerList: any;
  isEditLineItem = false;
  editLineItemData: any;
  loginuserid: any;
  loading = false;
  LineItemId: any;
  IsMutiEdit: any;
  loadSave = false;
  lineItemProductCal = false;
  conId: any;
  pageSizeValue = 10;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private proposallistService: ProposallistService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    //this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.getPageSizes();
    this.initForm();
    this.initEditLineItemForm('');


    this.proposallistService.getListPrice.subscribe(s => {

      // console.log('lineItemDisCount', s);
      ((this.configurationSetings.get('lineItemDisCount') as FormArray).controls[this.ListPriceIndex] as FormGroup).patchValue({
        'PurchasePrice': s.ListPrice,
        'SalePrice': s.ListPrice
        ,
        'PriceBookID': s.PriceBookID
      });
      $("datatable-scroller").removeAttr("style")
    });

  }

  show(proposalId, opportunityId, row, ismultiedit) {
    ;
    if (row != null && row != '' && ismultiedit == true) {
      this.isEditLineItem = false;
      this.proposalId = proposalId;
      this.LineItemId = 1;
      this.opportunityId = opportunityId;
      this.loadSave = false;
      this.lineItemDiv = false;
      this.IsMutiEdit = true;
      this.PrepareMultiLineEditForm(row);
      this.lineItemProductCal = true;
      this.proposalpopup.show();

    } else if (row != null && row != '' && ismultiedit == false) {

      this.isEditLineItem = true;
      this.proposalId = proposalId;
      this.LineItemId = row.Id;
      this.opportunityId = opportunityId;
      this.loadSave = false;
      this.lineItemDiv = false;
      this.lineItemProductCal = false;
      this.editLineItemData = row;
      this.IsMutiEdit = false;
      this.initEditLineItemForm(row);
      this.proposalpopup.show();
    }
    else {
      this.listNameFilter = '';
      this.proposalId = proposalId;
      this.lineItemDiv = true;
      this.LineItemId = "0";
      this.isEditLineItem = false;
      this.IsMutiEdit = false;
      this.lineItemProductCal = false;
      this.opportunityId = opportunityId;
      this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

        this.AssociatedproductpagedData = this.proposallistService.pagedData;
        this.getPageSizes();
        // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        this.proposalpopup.show();
      })
    }
  }
  close() {
    this.selected = [];
    this.lineItemDiv = false;
    this.lineItemProductCal = false;
    const control2 = <FormArray>this.configurationSetings.controls.lineItemDisCount;
    control2.controls = [];
    this.proposalpopup.hide();

  }

  searchProduct() {
    this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      this.getPageSizes();
      // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
      //this.proposalpopup.show();
    })
  }
  resetProduct() {
    this.listNameFilter = '';
    this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.proposallistService.pagedData;
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
    this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, currentPageSalesUserList, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      // this.selected;
      for (var i = 0; i < this.AssociatedproductpagedData.data.length; i++) {
        this.selected.forEach(s => {
          debugger;

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
    this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      debugger
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
    this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSelect({ selected }) {
    ;
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
    //this.loanproductService.getPrerequisiteLoanProductDocumentTypeNames('PrerequisiteLoanProductDocumentType').subscribe((result: any[]) => {
    var count=current.lineItemDisCount.value.length;
    for (var i = 0; i < current.selected.length; i++) {
      for (var j = 0; j < count; j++) {
        if (current.selected[i].id != current.lineItemDisCount.value[j].id) {
          current.selected.forEach((value) => {
            if (current.lineItemDisCount.value[j].id != value.id) {
              let group = new FormGroup({
                id: new FormControl(value.id),
                ProductName: new FormControl(value.ProductName),
                PurchasePrice: new FormControl(value.PurchasePrice),
                SalePrice: new FormControl(value.SalePrice, Validators.required),
                Quantity: new FormControl('', Validators.required),
                Discount: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
                Tax: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
                lineItemId: new FormControl('0'),
                TotalPrice: new FormControl('0'),
                LineItemDescription: new FormControl(value.LineItemDescription),
                PriceBookID: new FormControl('')
              });
              current.lineItemDisCount.push(group);
              count=current.lineItemDisCount,value.length;
            }
          })
        }
        else {
          current.lineItemDisCount.value.forEach((value) => {
            debugger;
            if (current.selected[i].id == value.id) {
              let group = new FormGroup({
                id: new FormControl(value.id),
                ProductName: new FormControl(value.ProductName),
                PurchasePrice: new FormControl(value.PurchasePrice),
                SalePrice: new FormControl(value.SalePrice, Validators.required),
                Quantity: new FormControl(value.Quantity, Validators.required),
                Discount: new FormControl(value.Discount, [Validators.required, Validators.max(100), Validators.min(0)]),
                Tax: new FormControl(value.Tax, [Validators.required, Validators.max(100), Validators.min(0)]),
                lineItemId: new FormControl('0'),
                TotalPrice: new FormControl('0'),
                LineItemDescription: new FormControl(value.LineItemDescription),
                PriceBookID: new FormControl('')
              });
              current.lineItemDisCount.push(group);
            }
            else {
              current.selected.forEach((value) => {
                let group = new FormGroup({
                  id: new FormControl(value.id),
                  ProductName: new FormControl(value.ProductName),
                  PurchasePrice: new FormControl(value.PurchasePrice),
                  SalePrice: new FormControl(value.SalePrice, Validators.required),
                  Quantity: new FormControl('', Validators.required),
                  Discount: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
                  Tax: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
                  lineItemId: new FormControl('0'),
                  TotalPrice: new FormControl('0'),
                  LineItemDescription: new FormControl(''),
                  PriceBookID: new FormControl('')
                });
                current.lineItemDisCount.push(group);
              });
            }

          })
        }
      }
    }
    debugger;
    if (current.lineItemDisCount.value.length == 0) {
      current.selected.forEach((value) => {
        let group = new FormGroup({
          id: new FormControl(value.id),
          ProductName: new FormControl(value.ProductName),
          PurchasePrice: new FormControl(value.PurchasePrice),
          SalePrice: new FormControl(value.SalePrice, Validators.required),
          Quantity: new FormControl('', Validators.required),
          Discount: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
          Tax: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
          lineItemId: new FormControl('0'),
          TotalPrice: new FormControl('0'),
          LineItemDescription: new FormControl(''),
          PriceBookID: new FormControl('')
        });
        current.lineItemDisCount.push(group);
      });
    }
    //});
  }
  PrepareMultiLineEditForm(list) {
    ;
    let current = this;
    current.lineItemDisCount.reset();
    //this.loanproductService.getPrerequisiteLoanProductDocumentTypeNames('PrerequisiteLoanProductDocumentType').subscribe((result: any[]) => {
    list.forEach(function (value) {
      let group = new FormGroup({
        lineItemId: new FormControl(value.Id),
        id: new FormControl(value.Id),
        ProductName: new FormControl(value.Product),
        PurchasePrice: new FormControl(value.PurchasePrice),
        SalePrice: new FormControl(value.SalePrice),
        Quantity: new FormControl(value.Quantity, Validators.required),
        Discount: new FormControl(value.Discount, [Validators.required, Validators.max(100), Validators.min(0)]),
        Tax: new FormControl(value.Tax, [Validators.required, Validators.max(100), Validators.min(0)]),
        TotalPrice: new FormControl(value.TotalPrice),
        LineItemDescription: new FormControl(value.LineItemDiscription),
        PriceBookID: new FormControl('')
      });
      current.lineItemDisCount.push(group);
    })
    //});
  }
  private prepareFormDataForDocument() {
    const input = new FormData();
    //input.append('PriceBookID', this.priceBookID);
    input.append('ProposalId', this.proposalId);
    input.append('lineItemId', this.LineItemId === 'undefined' ? 0 : this.LineItemId);
    input.append('opportunityId', this.opportunityId === 'undefined' ? '1002' : this.opportunityId);
    input.append('Fields', JSON.stringify(this.lineItemDisCount.value));
    // console.log('Fields', this.lineItemDisCount.value);
    return input;
  }
  updateTotalPrice() {
    debugger;
    if (this.editLineItem.controls.Quantity.value == "" || !this.editLineItem.controls.Quantity.value) {
      this.editLineItem.controls.Quantity.setValue(0)
    }

    var total = Number(this.editLineItem.controls.SalePrice.value) * Number(this.editLineItem.controls.Quantity.value)
    this.editLineItem.controls.TotalPrice.setValue(total);
  }

  SaveLineItem() {
    ;
    if (this.configurationSetings.valid) {
      this.loading = true;
      const lineItemModel = this.prepareFormDataForDocument();
      // console.log("lineItemModel", lineItemModel);
      this.proposallistService.AddUpdateLineItem(lineItemModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.proposalpopup.hide();
          this.router.navigateByUrl("/proposal-list/viewproposal/" + this.proposalId);
          //this.SetStatusData(this.field);
          this.selected = [];
          const control2 = <FormArray>this.configurationSetings.controls.lineItemDisCount;
          control2.controls = [];
          this.lineItem.emit();
          setTimeout(() => { this.loading = false; }, 3000);
          this.proposallistService.setStageChangeEvent();
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
      proposalName: [row.proposalName, [Validators.nullValidator, Validators.maxLength(255)]],
      Subtotal: [row.Subtotal, [Validators.nullValidator, Validators.maxLength(255)]],
      LineItemDescription: [row.LineItemDiscription, [Validators.nullValidator, Validators.maxLength(500)]],
      AutomationId: [row.AutomationId, Validators.nullValidator],

      SystemSize: [row.SystemSize, [Validators.nullValidator, Validators.pattern("^[0-9]*$")]],
      CommissionablePercentage: [row.CommissionablePercentage, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      SalePrice: [row.SalePrice, [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      Quantity: [row.Quantity, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(5)]],
      Discount: [row.Discount, [Validators.required, Validators.max(100), Validators.min(0)]],
      Tax: [row.Tax, [Validators.nullValidator, Validators.max(100), Validators.min(0)]],
      TotalPrice: [row.TotalPrice],
    });
  }
  get lineItemId() { return this.editLineItem.get('lineItemId'); }
  get ProductFamily() { return this.editLineItem.get('ProductFamily'); }
  get proposalName() { return this.editLineItem.get('proposalName'); }
  get Subtotal() { return this.editLineItem.get('Subtotal'); }
  get LineItemDescription() { return this.editLineItem.get('LineItemDescription'); }
  get AutomationId() { return this.editLineItem.get('AutomationId'); }
  get SystemSize() { return this.editLineItem.get('SystemSize'); }
  get CommissionablePercentage() { return this.editLineItem.get('CommissionablePercentage'); }
  get SalePrice() { return this.editLineItem.get('SalePrice'); }
  get Quantity() { return this.editLineItem.get('Quantity'); }
  get Discount() { return this.editLineItem.get('Discount'); }
  get Tax() { return this.editLineItem.get('Tax'); }
  get TotalPrice() { return this.editLineItem.get('TotalPrice') }
  private prepareFormDataForEditLineItem() {
    const input = new FormData();
    input.append('ProposalId', this.proposalId);
    input.append('lineItemId', this.LineItemId);
    input.append('opportunityId', this.opportunityId == 'undefined' ? '1002' : this.opportunityId);
    input.append('Fields', JSON.stringify(this.editLineItem.value));
    return input;
  }
  SaveEdit() {
    ;
    if (this.editLineItem.valid) {
      this.loading = true;
      const lineItemModel = this.prepareFormDataForEditLineItem();
      this.proposallistService.AddUpdateLineItem(lineItemModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.proposalpopup.hide();
          this.editLineItem.reset();
          this.lineItem.emit();
          this.router.navigateByUrl("/proposal-list/viewproposal/" + this.proposalId);
          setTimeout(() => { this.loading = false; }, 3000);
          this.proposallistService.setStageChangeEvent();
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

  openPriceBookListPopup(obj: any, i: number) {
    this.ListPriceIndex = i;
    this.PriceBookListModelPopup.show(obj);
  }
}
