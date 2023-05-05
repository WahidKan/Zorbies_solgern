(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-payment-quote-payment-quote-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/add-edit-payment-quote.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/add-edit-payment-quote.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Payment Quote</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/paymentquote\">Payment Quote</a></li>\r\n            <li class=\"breadcrumb-item active\">Add/Edit Payment Quote</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"cancel()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>   \r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\">\r\n              <form [formGroup]=\"paymentQuoteForm\" autocomplete=\"off\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 col-md-6 col-lg-6\">\r\n                    <label>Business Name:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" maxlength=\"200\" formControlName=\"paymentQuoteName\"\r\n                             [ngClass]=\"{'is-invalid': (paymentQuoteName.invalid && (paymentQuoteName.dirty || paymentQuoteName.touched) && (paymentQuoteName.errors?.required || paymentQuoteName.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"paymentQuoteName.invalid && (paymentQuoteName.dirty || paymentQuoteName.touched) && paymentQuoteName.errors?.required\"\r\n                             class=\"text-danger\">Business Name is required</small>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-6 col-lg-6\">\r\n                    <label>Contact Email:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" maxlength=\"200\" formControlName=\"paymentQuoteEmail\"\r\n                             [ngClass]=\"{'is-invalid': (paymentQuoteEmail.invalid && (paymentQuoteEmail.dirty || paymentQuoteEmail.touched) && (paymentQuoteEmail.errors?.required || paymentQuoteEmail.errors?.email)) }\">\r\n                      <small *ngIf=\"paymentQuoteEmail.invalid && (paymentQuoteEmail.dirty || paymentQuoteEmail.touched) && paymentQuoteEmail.errors?.required\"\r\n                             class=\"text-danger\">Email is required</small>\r\n                      <small *ngIf=\"paymentQuoteEmail.invalid && (paymentQuoteEmail.dirty || paymentQuoteEmail.touched) && paymentQuoteEmail.errors?.email\"\r\n                             class=\"text-danger\">Please enter valid email address</small>\r\n\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div formArrayName=\"leases\" class=\"col-12\">\r\n                    <div *ngFor=\"let lease of leases.controls; let i=index\">\r\n                      <div [formGroupName]=\"i\">\r\n                        <leaseform [group]=\"paymentQuoteForm.controls.leases.controls[i]\" [showHideTag]=\"showHideTag\"></leaseform>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-primary form-btns\" (click)=\"showQuotePreview()\" *ngIf=\"addOrUpdatePermission\"><i class=\"fas fa-eye\"></i> Preview & Send Quote</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n\r\n<app-quote-preview #quotePreview  [leases]=\"paymentQuoteForm.controls.leases.value\"> </app-quote-preview>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/payment-quote-list.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/payment-quote-list.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Payment Quote</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Payment Quote</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-2\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-2\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search by Business Name/Email\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-4 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-8 col-lg-6 col-xl-3 text-md-right text-lg-left text-xl-right float-right\"\r\n                         *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag'>\r\n                      <a routerLink=\"/paymentquote/add\" class=\"btn btn-orange form-btns\"><i class=\"fa fa-plus\"></i> Add Payment Quote</a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n               \r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"PaymentQuoteName\" [sortable]=\"true\" headerClass=\"thead-dark\"\r\n                                          *ngIf='modulePermission!==null && modulePermission.roleModuleUpdateFlag'>\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div *ngIf=\"loginuserid!==row.PaymentQuoteId\">\r\n                          {{row.PaymentQuoteName}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"PaymentQuoteName\" [sortable]=\"true\" *ngIf='modulePermission!==null && !modulePermission.roleModuleUpdateFlag'></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Email\" prop=\"PaymentQuoteEmail\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.PaymentQuoteEmail}}\">\r\n                          {{row.PaymentQuoteEmail | truncate}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Collateral\" prop=\"PaymentQuoteDescription2\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Terms(month)\" prop=\"LeaseTerm\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Monthly Rental ($)\" prop=\"PaymentQuoteMonthlyRentalPayment\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Date\" prop=\"PaymentQuoteCreatedOn\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.PaymentQuoteCreatedOn | date: 'MM-dd-yyyy'}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n\r\n                    <ngx-datatable-column name=\"Lease\" [sortable]=\"false\" headerClass=\"thead-dark\"\r\n                                          *ngIf=\"moduleLeasePermission!==null && moduleLeasePermission.roleModuleAddFlag\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <a (click)=\"addLease(row.PaymentQuoteEmail)\" href=\"javascript:void(0);\">Add Lease</a>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/quote-preview.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/quote-preview.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #quotePreview=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Preview - Payment Quote</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px;\">\r\n        <div class=\"px-3 cus-dis\" style=\"border:1px solid #f1f1f1;\">\r\n          <div class=\"row\" style=\"background:#f2f2f2;\">\r\n\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Business Name:</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group form-group mb-0\"> <input type=\"text\" [(ngModel)]=\"businessName\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Contact Email:</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group form-group mb-0 \"><input type=\"text\" [(ngModel)]=\"contactEmail\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"background:#f2f2f2;\">\r\n\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Use Type:</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group form-group mb-0\"><input type=\"text\" [(ngModel)]=\"userType\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row \">\r\n\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Lease Type:</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group form-group mb-0\"><input type=\"text\" [(ngModel)]=\"leaseType\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\" style=\"background:#f2f2f2;\">\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Collateral Information:</label>\r\n            </div>\r\n            <div class=\"col-md-6\" *ngIf=\"leaseOtherDescription != ''\">\r\n              <div class=\"form-group form-group mb-0 ml-3\">\r\n                <span>{{leaseOtherDescription}}</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\" *ngIf=\"leaseOtherDescription == ''\">\r\n              <div class=\"form-group form-group mb-0\"><input style=\"background:#f2f2f2 !important; border:0px;\" type=\"text\" class=\"form-control\" value=\"-\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\" >\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Collateral Description:</label>\r\n            </div>\r\n            <div class=\"col-md-6\" *ngIf=\"leaseDescription != ''\">\r\n              <div class=\"form-group form-group mb-0 ml-3\">\r\n                <span>{{leaseDescription}}</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\" *ngIf=\"leaseDescription == ''\">\r\n              <div class=\"form-group form-group mb-0\"><input style=\"background:#ffffff !important; border:0px;\" type=\"text\" class=\"form-control\" value=\"-\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"background:#f2f2f2;\">\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Lease Rate(%):</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group form-group mb-0\"><input type=\"text\" [(ngModel)]=\"leaseRate\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Lease Term:</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group form-group mb-0\"><input type=\"text\" [(ngModel)]=\"leaseTerm\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"background:#f2f2f2;\">\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Total Equipment MSRP($):</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group mb-0\"><input type=\"text\" [value]=\"calculteTotalEquipMSRP()\" [(ngModel)]=\"leaseTotalEquipmentMSRP\" class=\"form-control \" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Residual Amount($):</label>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group form-group mb-0\"><input type=\"text\" [(ngModel)]=\"leaseResidualAmount\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"background:#f2f2f2;\">\r\n            <div class=\"col-md-6 border-right\">\r\n              <label class=\"font-weight-bold pt-2\">Monthly Rental Payment($):</label>\r\n            </div>\r\n            <div class=\"col-md-6 \">\r\n              <div class=\"form-group form-group mb-0\"><input type=\"text\" [(ngModel)]=\"leaseMonthlyRentalPayment\" class=\"form-control\" disabled=\"disabled\" /></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6 border-right \">\r\n              <label class=\"font-weight-bold pt-2\">Placement Fee($):</label>\r\n            </div>\r\n            <div class=\"col-md-6 \">\r\n              <div class=\"form-group form-group mb-0 \">\r\n                <input type=\"text\" [(ngModel)]=\"leasePlacementFee\" class=\"form-control\" disabled=\"disabled\" />\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"background:#f2f2f2;\">\r\n            <div class=\"col-md-6 border-right \">\r\n              <label class=\"font-weight-bold pt-2\">Amount Due at Signing($):</label>\r\n            </div>\r\n            <div class=\"col-md-6 \">\r\n              <div class=\"form-group form-group mb-0\">\r\n                <input type=\"text\" [(ngModel)]=\"leaseAmountDueAtSigining\" class=\"form-control\" disabled=\"disabled\" />\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6 border-right \">\r\n              <label class=\"font-weight-bold pt-2\">Total Lease Amount($):</label>\r\n            </div>\r\n            <div class=\"col-md-6 \">\r\n              <div class=\"form-group form-group mb-0\">\r\n                <input type=\"text\" [(ngModel)]=\"leaseTotalAmount\" class=\"form-control\" disabled=\"disabled\" />\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-primary form-btns\" (click)=\"saveQuote()\"><i class=\"fas fa-paper-plane\"></i> Send Quote</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div> \r\n  </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/payment-quote/add-edit-payment-quote.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/views/payment-quote/add-edit-payment-quote.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3BheW1lbnQtcXVvdGUvYWRkLWVkaXQtcGF5bWVudC1xdW90ZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/payment-quote/add-edit-payment-quote.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/payment-quote/add-edit-payment-quote.component.ts ***!
  \*************************************************************************/
/*! exports provided: AddEditPaymentQuoteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditPaymentQuoteComponent", function() { return AddEditPaymentQuoteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _payment_quote_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./payment-quote.service */ "./src/app/views/payment-quote/payment-quote.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _quote_preview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./quote-preview.component */ "./src/app/views/payment-quote/quote-preview.component.ts");
/* harmony import */ var _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/custom-validation/equal-validator */ "./src/app/views/shared/custom-validation/equal-validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var AddEditPaymentQuoteComponent = /** @class */ (function () {
    function AddEditPaymentQuoteComponent(router, toaster, paymentService, commonService, route, fb) {
        this.router = router;
        this.toaster = toaster;
        this.paymentService = paymentService;
        this.commonService = commonService;
        this.route = route;
        this.fb = fb;
        this.paymentQuote = new _payment_quote_service__WEBPACK_IMPORTED_MODULE_4__["PaymentQuote"]();
        this.showHideTag = true;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
    }
    AddEditPaymentQuoteComponent.prototype.ngOnInit = function () {
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
            }
        });
        this.initForm();
    };
    AddEditPaymentQuoteComponent.prototype.save = function () {
        var _this = this;
        if (this.paymentQuoteForm.valid) {
            this.paymentService.savePaymentQuote(this.paymentQuoteForm.value).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/paymentquote");
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.paymentQuoteForm);
        }
    };
    AddEditPaymentQuoteComponent.prototype.cancel = function () {
        this.router.navigateByUrl("/paymentquote");
    };
    AddEditPaymentQuoteComponent.prototype.showQuotePreview = function () {
        // console.log(this.paymentQuoteForm.valid);
        if (this.paymentQuoteForm.valid) {
            this.quotePreview.show(this.paymentQuoteForm.value);
        }
        else {
            this.commonService.validateAllFormFields(this.paymentQuoteForm);
        }
    };
    AddEditPaymentQuoteComponent.prototype.initForm = function () {
        this.paymentQuoteForm = this.fb.group({
            'paymentQuoteId': [this.paymentQuote.paymentQuoteId, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            'paymentQuoteName': [this.paymentQuote.paymentQuoteName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'paymentQuoteEmail': [this.paymentQuote.paymentQuoteEmail, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            'leases': this.fb.array([
                this.initLeaseForm(),
            ]),
        });
    };
    Object.defineProperty(AddEditPaymentQuoteComponent.prototype, "paymentQuoteId", {
        get: function () { return this.paymentQuoteForm.get('paymentQuoteId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditPaymentQuoteComponent.prototype, "paymentQuoteName", {
        get: function () { return this.paymentQuoteForm.get('paymentQuoteName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditPaymentQuoteComponent.prototype, "paymentQuoteEmail", {
        get: function () { return this.paymentQuoteForm.get('paymentQuoteEmail'); },
        enumerable: true,
        configurable: true
    });
    AddEditPaymentQuoteComponent.prototype.initLeaseForm = function () {
        // initialize our guarantor
        return this.fb.group({
            leaseUseType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            leaseType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            leaseOtherDescription: [''],
            leaseDescription: [''],
            leaseRate: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            leaseFeePercentage: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            leaseResidualPercentage: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            leaseTerm: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            //leaseEquipmentMSRP: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            //leaseEquipmentCost: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            //leaseAdditions1: ['0.00', [ Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            //leaseAdditions2: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            leaseEquipmentMSRP: ['$0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseEquipmentCost: ['$0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseAdditions1: ['$0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseAdditions2: ['$0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseTotalEquipmentMSRP: [0],
            // leaseSalesTax: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            leaseSalesTax: ['$0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseResidualAmount: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            //leaseWarranty: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            //leaseOther: ['0.00', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            leaseWarranty: ['$0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseOther: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseMonthlyRentalPayment: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            leasePlacementFee: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            //leaseAmountDueAtSigining:  ['0.00', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            leaseAmountDueAtSigining: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseTotalAmount: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            leaseTermText: [''],
            lenderDate: [null],
            lenderName: [''],
            lenderNotes: [''],
            lenderAgree: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            LeaseInsurance: [null],
            leaseLicenceFee: ['0.00', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$")]],
            leaseTemplateId: [null],
            leasePreferredDocumentSignedBy: [''],
        }, {
            validator: _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_7__["EqualValidator"].percentage('leaseFeePercentage')
        });
    };
    Object.defineProperty(AddEditPaymentQuoteComponent.prototype, "leases", {
        get: function () {
            return this.paymentQuoteForm.get('leases');
        },
        enumerable: true,
        configurable: true
    });
    AddEditPaymentQuoteComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _payment_quote_service__WEBPACK_IMPORTED_MODULE_4__["PaymentQuoteService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('quotePreview', { static: false }),
        __metadata("design:type", _quote_preview_component__WEBPACK_IMPORTED_MODULE_6__["QuotePreviewComponent"])
    ], AddEditPaymentQuoteComponent.prototype, "quotePreview", void 0);
    AddEditPaymentQuoteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-edit-payment-quote',
            template: __importDefault(__webpack_require__(/*! raw-loader!./add-edit-payment-quote.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/add-edit-payment-quote.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./add-edit-payment-quote.component.scss */ "./src/app/views/payment-quote/add-edit-payment-quote.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _payment_quote_service__WEBPACK_IMPORTED_MODULE_4__["PaymentQuoteService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], AddEditPaymentQuoteComponent);
    return AddEditPaymentQuoteComponent;
}());



/***/ }),

/***/ "./src/app/views/payment-quote/payment-quote-list.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/views/payment-quote/payment-quote-list.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3BheW1lbnQtcXVvdGUvcGF5bWVudC1xdW90ZS1saXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/payment-quote/payment-quote-list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/payment-quote/payment-quote-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: PaymentQuoteListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentQuoteListComponent", function() { return PaymentQuoteListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _payment_quote_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payment-quote.service */ "./src/app/views/payment-quote/payment-quote.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var PaymentQuoteListComponent = /** @class */ (function () {
    function PaymentQuoteListComponent(router, paymentQuoteService, commonService, activeRoute, toaster) {
        var _this = this;
        this.router = router;
        this.paymentQuoteService = paymentQuoteService;
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.id = "";
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'PaymentQuoteCreatedOn';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.loadSave = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.moduleLeasePermission = this.commonService.getPermission(1020);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    PaymentQuoteListComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
    };
    PaymentQuoteListComponent.prototype.addLease = function (email) {
        var _this = this;
        this.paymentQuoteService.getContactId(email).subscribe(function (res) {
            if (res) {
                _this.router.navigateByUrl("/lease/addlease?contactid=" + res);
            }
            else {
                _this.toaster.warning("No Contact exists for " + email + ". So please add contact before adding a Lease.");
                _this.router.navigateByUrl("/contact/addcontact");
            }
        });
    };
    PaymentQuoteListComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    PaymentQuoteListComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    PaymentQuoteListComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.paymentQuoteService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    PaymentQuoteListComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.paymentQuoteService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    PaymentQuoteListComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.From = null;
        this.To = null;
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.sortColumn = 'PaymentQuoteCreatedOn';
        this.pageSizeValue = 10;
        this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.paymentQuoteService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    PaymentQuoteListComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.paymentQuoteService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    PaymentQuoteListComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.paymentQuoteService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    PaymentQuoteListComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.paymentQuoteService.getPaymentQuoteList('', this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.paymentQuoteService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    PaymentQuoteListComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _payment_quote_service__WEBPACK_IMPORTED_MODULE_2__["PaymentQuoteService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["DatatableComponent"])
    ], PaymentQuoteListComponent.prototype, "table", void 0);
    PaymentQuoteListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-payment-quote-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./payment-quote-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/payment-quote-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./payment-quote-list.component.scss */ "./src/app/views/payment-quote/payment-quote-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _payment_quote_service__WEBPACK_IMPORTED_MODULE_2__["PaymentQuoteService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], PaymentQuoteListComponent);
    return PaymentQuoteListComponent;
}());



/***/ }),

/***/ "./src/app/views/payment-quote/payment-quote-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/payment-quote/payment-quote-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: PaymentQuoteRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentQuoteRoutingModule", function() { return PaymentQuoteRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _payment_quote_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payment-quote-list.component */ "./src/app/views/payment-quote/payment-quote-list.component.ts");
/* harmony import */ var _add_edit_payment_quote_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-edit-payment-quote.component */ "./src/app/views/payment-quote/add-edit-payment-quote.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var routes = [
    {
        path: '', component: _payment_quote_list_component__WEBPACK_IMPORTED_MODULE_2__["PaymentQuoteListComponent"], data: { title: 'Payment Quote' }
    },
    {
        path: 'edit/:id', component: _add_edit_payment_quote_component__WEBPACK_IMPORTED_MODULE_3__["AddEditPaymentQuoteComponent"], data: { title: 'Edit Payment Quote' }
    },
    {
        path: 'add', component: _add_edit_payment_quote_component__WEBPACK_IMPORTED_MODULE_3__["AddEditPaymentQuoteComponent"], data: { title: 'Add Payment Quote' }
    }
];
var PaymentQuoteRoutingModule = /** @class */ (function () {
    function PaymentQuoteRoutingModule() {
    }
    PaymentQuoteRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], PaymentQuoteRoutingModule);
    return PaymentQuoteRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/payment-quote/payment-quote.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/payment-quote/payment-quote.module.ts ***!
  \*************************************************************/
/*! exports provided: PaymentQuoteModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentQuoteModule", function() { return PaymentQuoteModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _add_edit_payment_quote_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-edit-payment-quote.component */ "./src/app/views/payment-quote/add-edit-payment-quote.component.ts");
/* harmony import */ var _payment_quote_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment-quote-list.component */ "./src/app/views/payment-quote/payment-quote-list.component.ts");
/* harmony import */ var _payment_quote_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./payment-quote-routing.module */ "./src/app/views/payment-quote/payment-quote-routing.module.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _quote_preview_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./quote-preview.component */ "./src/app/views/payment-quote/quote-preview.component.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var PaymentQuoteModule = /** @class */ (function () {
    function PaymentQuoteModule() {
    }
    PaymentQuoteModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_add_edit_payment_quote_component__WEBPACK_IMPORTED_MODULE_2__["AddEditPaymentQuoteComponent"], _payment_quote_list_component__WEBPACK_IMPORTED_MODULE_3__["PaymentQuoteListComponent"], _quote_preview_component__WEBPACK_IMPORTED_MODULE_8__["QuotePreviewComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _payment_quote_routing_module__WEBPACK_IMPORTED_MODULE_4__["PaymentQuoteRoutingModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__["ModalModule"],
            ]
        })
    ], PaymentQuoteModule);
    return PaymentQuoteModule;
}());



/***/ }),

/***/ "./src/app/views/payment-quote/payment-quote.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/payment-quote/payment-quote.service.ts ***!
  \**************************************************************/
/*! exports provided: PaymentQuoteService, PaymentQuote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentQuoteService", function() { return PaymentQuoteService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentQuote", function() { return PaymentQuote; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var PaymentQuoteService = /** @class */ (function () {
    function PaymentQuoteService(http) {
        this.http = http;
        this.paymentQuoteUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl + "PaymentQuote";
    }
    PaymentQuoteService.prototype.savePaymentQuote = function (paymentQuote) {
        paymentQuote.leases[0].leaseOtherDescription = paymentQuote.leases[0].leaseOtherDescription == "" ? "-" : paymentQuote.leases[0].leaseOtherDescription;
        return this.http.post(this.paymentQuoteUri, paymentQuote);
    };
    PaymentQuoteService.prototype.getContactId = function (email) {
        return this.http.get(this.paymentQuoteUri + "/GetContactId?email=" + email).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    PaymentQuoteService.prototype.getPaymentQuoteList = function (name, From, To, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof From == "undefined" || From == null) {
            From = null;
        }
        else {
            From = From.toDateString();
        }
        if (typeof To == "undefined" || To == null) {
            To = null;
        }
        else {
            To = To.toDateString();
        }
        return this.http.get(this.paymentQuoteUri + "/GetPaymentQuoteList?name=" + name + "&From=" + From + "&To=" + To + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    PaymentQuoteService.prototype.initializePaymentQuote = function () {
        // Return an initialized object
        return {
            paymentQuoteId: null,
            paymentQuoteName: null,
            paymentQuoteEmail: null,
            paymentQuoteText: null,
            leases: []
        };
    };
    PaymentQuoteService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    PaymentQuoteService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], PaymentQuoteService);
    return PaymentQuoteService;
}());

var PaymentQuote = /** @class */ (function () {
    function PaymentQuote() {
        this.paymentQuoteId = '';
        this.paymentQuoteName = '';
        this.paymentQuoteEmail = '';
        this.paymentQuoteText = '';
    }
    return PaymentQuote;
}());



/***/ }),

/***/ "./src/app/views/payment-quote/quote-preview.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/payment-quote/quote-preview.component.ts ***!
  \****************************************************************/
/*! exports provided: QuotePreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuotePreviewComponent", function() { return QuotePreviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _payment_quote_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payment-quote.service */ "./src/app/views/payment-quote/payment-quote.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var QuotePreviewComponent = /** @class */ (function () {
    function QuotePreviewComponent(router, toaster, paymentService) {
        this.router = router;
        this.toaster = toaster;
        this.paymentService = paymentService;
        this.active = false;
        this.paymentQuote = new _payment_quote_service__WEBPACK_IMPORTED_MODULE_2__["PaymentQuote"]();
        this.loadSave = false;
    }
    QuotePreviewComponent.prototype.ngOnInit = function () {
    };
    QuotePreviewComponent.prototype.calculteTotalEquipMSRP = function () {
        var val1 = this.leases[0].leaseEquipmentMSRP.value;
        var val2 = this.leases[0].leaseAdditions1.value;
        var result = parseInt(val1 === '' ? 0 : val1) + parseInt(val2 === '' ? 0 : val2);
        if (result < 0)
            result = 0;
        return result;
    };
    QuotePreviewComponent.prototype.close = function () {
        this.active = false;
        this.modalPreview.hide();
    };
    QuotePreviewComponent.prototype.show = function (quoteData) {
        this.paymentQuote = quoteData;
        this.businessName = this.paymentQuote.paymentQuoteName;
        this.contactEmail = this.paymentQuote.paymentQuoteEmail;
        this.userType = this.leases[0].leaseUseType;
        this.leaseRate = this.leases[0].leaseRate;
        this.leaseType = this.leases[0].leaseType;
        this.leaseTerm = this.leases[0].leaseTermText;
        this.paymentQuote.paymentQuoteText = this.leases[0].leaseTermText;
        this.leaseTotalEquipmentMSRP = this.leases[0].leaseTotalEquipmentMSRP;
        this.leaseResidualAmount = this.leases[0].leaseResidualAmount;
        this.leaseMonthlyRentalPayment = this.leases[0].leaseMonthlyRentalPayment;
        this.leasePlacementFee = this.leases[0].leasePlacementFee;
        this.leaseAmountDueAtSigining = this.leases[0].leaseAmountDueAtSigining;
        this.leaseTotalAmount = this.leases[0].leaseTotalAmount;
        this.leaseDescription = this.leases[0].leaseDescription;
        this.leaseOtherDescription = this.leases[0].leaseOtherDescription;
        this.modalPreview.show();
        this.active = true;
    };
    QuotePreviewComponent.prototype.saveQuote = function () {
        var _this = this;
        this.loadSave = true;
        this.paymentService.savePaymentQuote(this.paymentQuote).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.toaster.success(result.responseMessage);
                _this.router.navigateByUrl("/paymentquote");
                setTimeout(function () { _this.loadSave = false; }, 3000);
            }
            else {
                _this.toaster.error(result.responseMessage);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    QuotePreviewComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _payment_quote_service__WEBPACK_IMPORTED_MODULE_2__["PaymentQuoteService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('quotePreview', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], QuotePreviewComponent.prototype, "modalPreview", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], QuotePreviewComponent.prototype, "leases", void 0);
    QuotePreviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-quote-preview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./quote-preview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/payment-quote/quote-preview.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _payment_quote_service__WEBPACK_IMPORTED_MODULE_2__["PaymentQuoteService"]])
    ], QuotePreviewComponent);
    return QuotePreviewComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-payment-quote-payment-quote-module.js.map