(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-loanterm-loanterm-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanterm/loantermadd.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanterm/loantermadd.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Add Loan Term</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/loanTerm\">Add Loan Term</a></li>\r\n            <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <a routerLink=\"/loanTerm\" class=\"w-auto sw-100 btn btn-dark\"><i class=\"fa fa-arrow-left\"></i> Back</a>\r\n          <!--<button class=\"w-auto sw-100 btn btn-dark\" (click)=\"Cancel()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>-->\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white custom-shadow py-3\">\r\n            <div class=\"col-md-12\">\r\n              <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n                <div class=\"bank-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Lender Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <div class=\"form-group\">\r\n                          <ng-select [items]=\"listbank\" [loading]=\"loadSave\" placeholder=\"Select Lender\" formControlName=\"lenderId\"\r\n                                     bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n\r\n                        </div>\r\n                        <!--<input type=\"text\" class=\"form-control\" formControlName=\"lenderName\" maxlength=\"50\" placeholder=\"Enter Lender Name\"\r\n             [ngClass]=\"{'is-invalid': (lenderName.invalid && (lenderName.dirty || lenderName.touched) && (lenderName.errors?.required || lenderName.errors?.maxlength)) }\">\r\n      <small *ngIf=\"lenderName.invalid && (lenderName.dirty || lenderName.touched) && lenderName.errors?.required\"\r\n             class=\"text-danger\">Lender Name is required</small>\r\n      <input type=\"hidden\" formControlName=\"id\" />-->\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Code:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Code\" formControlName=\"code\"\r\n                               [ngClass]=\"{'is-invalid': (code.invalid && (code.dirty || code.touched) && (code.errors?.maxlength)) }\">\r\n                        <!--<small *ngIf=\"code.invalid && (code.dirty || code.touched) && code.errors?.required\"\r\n                               class=\"text-danger\">Code is required</small>-->\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Term:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Term\" formControlName=\"term\"\r\n                               [ngClass]=\"{'is-invalid': (term.invalid && (term.dirty || term.touched) && (term.errors?.required || term.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"term.invalid && (term.dirty || term.touched) && term.errors?.required\"\r\n                               class=\"text-danger\">Term is required</small>\r\n                        <small *ngIf=\"term.invalid && (term.dirty || term.touched) && term.errors?.maxlength\"\r\n                               class=\"text-danger\">Term can not be greater than 2 characters.</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Status:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"lstStatus\"\r\n                 placeholder=\"Select Status\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"statusId\"\r\n                 [ngClass]=\"{'is-invalid': (statusId.invalid && (statusId.dirty || statusId.touched) && statusId.errors?.required) }\">\r\n      </ng-select>\r\n      <small *ngIf=\"statusId.touched && statusId.errors?.required\" style=\"color:red;\">Please select Status</small>\r\n    </div>\r\n  </div>-->\r\n                    <!--<div class=\"col-12 col-md-12 col-lg-12\">\r\n    <label class=\"m-label-s\">Bank Address:</label>\r\n    <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n  </div>-->\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>APR:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter APR\" formControlName=\"apr\"\r\n                               [ngClass]=\"{'is-invalid': (apr.invalid && (apr.dirty || apr.touched) && (apr.errors?.required || apr.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"apr.invalid && (apr.dirty || apr.touched) && apr.errors?.required\"\r\n                               class=\"text-danger\">APR is required</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Dealer Fees:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Dealer Fees\"\r\n                               formControlName=\"dealerFee\"\r\n                               [ngClass]=\"{'is-invalid': (dealerFee.invalid && (dealerFee.dirty || dealerFee.touched) && (dealerFee.errors?.required || dealerFee.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"dealerFee.invalid && (dealerFee.dirty || dealerFee.touched) && dealerFee.errors?.required\"\r\n                               class=\"text-danger\">Dealer Fees is required</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Loan Description:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <textarea type=\"text\" class=\"form-control\" formControlName=\"loanDescription\" placeholder=\"Enter Loan Description\"\r\n                                  [ngClass]=\"{'is-invalid': (loanDescription.invalid && (loanDescription.dirty || loanDescription.touched) && (loanDescription.errors?.required || loanDescription.errors?.maxlength)) }\"></textarea>\r\n                        <small *ngIf=\"loanDescription.invalid && (loanDescription.dirty || loanDescription.touched) && loanDescription.errors?.required\"\r\n                               class=\"text-danger\">Loan Description is required</small>\r\n                        <small *ngIf=\"loanDescription.invalid && (loanDescription.dirty || loanDescription.touched) && loanDescription.errors?.maxlength\"\r\n                               class=\"text-danger\">Loan Description must be less than 500 characters.</small>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a  class=\"btn btn-success form-btns\" (click)=\"addeditLoanTerm()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"/loanTerm\" class=\"btn btn-danger form-btns\" ><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanterm/loantermlist.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanterm/loantermlist.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Loan Term</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Loan Term</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n\r\n\r\n\r\n          <div class=\"col-md-6\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-md-4 float-left\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n                \r\n              </div>\r\n              <div class=\"col-md-8 float-left\">\r\n\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"refresh()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"ResetSearch()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                <!--<a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"dt-buttons\">\r\n              <!--<a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\"><span><i class=\"fa fa-list-alt\"></i> Manage View</span></a>-->\r\n              <a (click)=\"add()\" class=\"btn btn-success form-btns\" href=\"javascript:void(0);\"><i class=\"fa fa-plus\"></i> Add Loanterm</a>\r\n              <!-- <input type=\"button\" class=\"btn btn-primary form-btns mr-1\" value=\"Manage View\"/> <a routerLink=\"/lead/Import\" class=\"btn btn-danger form-btns \"><i class=\"fa fa-trash\"></i> Delete</a>-->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\">\r\n          <ngx-datatable-column name=\"Code\" [sortable]=\"true\" prop=\"Code\">\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Description\" prop=\"Description\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Lender Name\" prop=\"bankname\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Term\" prop=\"Term\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              {{row.Term}} years\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Apr\" prop=\"Apr\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              {{row.Apr}} %\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <!--<ngx-datatable-column name=\"Dealer Fees\" prop=\"DealerFee\" [sortable]=\"true\">\r\n      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n        {{row.DealerFee}} %\r\n      </ng-template>\r\n    </ngx-datatable-column>-->\r\n          <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" headerClass=\"text-right\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"icon-text-left\">\r\n                <a (click)=\"edit(row.Id)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a (click)=\"delete(row.Id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>\r\n\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/loanterm/loanterm-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/loanterm/loanterm-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: LoanTermRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoanTermRoutingModule", function() { return LoanTermRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _loantermlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loantermlist.component */ "./src/app/views/loanterm/loantermlist.component.ts");
/* harmony import */ var _loantermadd_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loantermadd.component */ "./src/app/views/loanterm/loantermadd.component.ts");
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
    { path: '', component: _loantermlist_component__WEBPACK_IMPORTED_MODULE_2__["LoantermlistComponent"] },
    { path: 'editloanTerm/:id', component: _loantermadd_component__WEBPACK_IMPORTED_MODULE_3__["LoantermaddComponent"] },
    { path: 'loanTermAdd', component: _loantermadd_component__WEBPACK_IMPORTED_MODULE_3__["LoantermaddComponent"] }
];
var LoanTermRoutingModule = /** @class */ (function () {
    function LoanTermRoutingModule() {
    }
    LoanTermRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LoanTermRoutingModule);
    return LoanTermRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/loanterm/loanterm.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/loanterm/loanterm.module.ts ***!
  \***************************************************/
/*! exports provided: LoanTermModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoanTermModule", function() { return LoanTermModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _loanterm_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loanterm-routing.module */ "./src/app/views/loanterm/loanterm-routing.module.ts");
/* harmony import */ var _loantermlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loantermlist.component */ "./src/app/views/loanterm/loantermlist.component.ts");
/* harmony import */ var _loantermadd_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loantermadd.component */ "./src/app/views/loanterm/loantermadd.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






//import { BankRoutingModule } from './bank-routing.module';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';




var LoanTermModule = /** @class */ (function () {
    function LoanTermModule() {
    }
    LoanTermModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_loantermlist_component__WEBPACK_IMPORTED_MODULE_7__["LoantermlistComponent"], _loantermadd_component__WEBPACK_IMPORTED_MODULE_8__["LoantermaddComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _loanterm_routing_module__WEBPACK_IMPORTED_MODULE_6__["LoanTermRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
            ]
        })
    ], LoanTermModule);
    return LoanTermModule;
}());



/***/ }),

/***/ "./src/app/views/loanterm/loantermadd.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/views/loanterm/loantermadd.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvYW50ZXJtL2xvYW50ZXJtYWRkLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/loanterm/loantermadd.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/loanterm/loantermadd.component.ts ***!
  \*********************************************************/
/*! exports provided: LoantermaddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoantermaddComponent", function() { return LoantermaddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _loantermservice_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loantermservice.service */ "./src/app/views/loanterm/loantermservice.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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







var LoantermaddComponent = /** @class */ (function () {
    function LoantermaddComponent(loantermservice, fb, commonService, router, toaster, dialogService, route) {
        this.loantermservice = loantermservice;
        this.fb = fb;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.route = route;
        this.loadSave = false;
        this.loanmodel = new _loantermservice_service__WEBPACK_IMPORTED_MODULE_1__["LoanTermModel"]();
        this.addForm = this.fb.group({
            lenderId: [null],
            term: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            apr: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            dealerFee: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            loanDescription: [''],
            code: [''],
            id: [null],
        });
    }
    LoantermaddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.bankid = id;
            if (id) {
                _this.pageTitle = 'Edit LoanTerm';
                _this.loadSave = true;
                _this.fillform();
            }
            else {
                _this.pageTitle = 'Add LoanTerm';
            }
        });
        this.GetBankDll();
    };
    LoantermaddComponent.prototype.Cancel = function () {
        this.router.navigateByUrl("/loanTerm");
    };
    LoantermaddComponent.prototype.GetBankDll = function () {
        var _this = this;
        this.loantermservice.GetBankDll().subscribe(function (result) {
            _this.listbank = result;
        });
    };
    LoantermaddComponent.prototype.fillform = function () {
        var _this = this;
        this.loantermservice.GetLoanTermById(this.bankid).subscribe(function (result) {
            // console.log(result);
            _this.pageTitle = 'Edit loan Term: '; /*+ result.firstName + ' ' + result.lastName;*/
            _this.loadSave = false;
            _this.addForm.patchValue({
                id: result.id,
                apr: result.apr,
                code: result.code,
                dealerFee: result.dealerFee,
                loanDescription: result.description,
                lenderId: result.lenderID.toString(),
                term: result.term,
            });
        }, function (error) {
            _this.loadSave = false;
        });
    };
    LoantermaddComponent.prototype.addeditLoanTerm = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.loadSave = true;
            this.loanmodel.id = this.addForm.value.id;
            this.loanmodel.Apr = this.addForm.value.apr;
            this.loanmodel.Code = this.addForm.value.code;
            this.loanmodel.DealerFee = this.addForm.value.dealerFee;
            this.loanmodel.Description = this.addForm.value.loanDescription;
            this.loanmodel.LenderID = this.addForm.value.lenderId;
            this.loanmodel.Term = this.addForm.value.term;
            this.loantermservice.addeditLoanTerm(this.loanmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigate(["/loanTerm"]);
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    Object.defineProperty(LoantermaddComponent.prototype, "lenderId", {
        get: function () { return this.addForm.get('lenderId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoantermaddComponent.prototype, "term", {
        get: function () { return this.addForm.get('term'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoantermaddComponent.prototype, "apr", {
        get: function () { return this.addForm.get('apr'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoantermaddComponent.prototype, "dealerFee", {
        get: function () { return this.addForm.get('dealerFee'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoantermaddComponent.prototype, "code", {
        get: function () { return this.addForm.get('code'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoantermaddComponent.prototype, "loanDescription", {
        get: function () { return this.addForm.get('loanDescription'); },
        enumerable: true,
        configurable: true
    });
    LoantermaddComponent.ctorParameters = function () { return [
        { type: _loantermservice_service__WEBPACK_IMPORTED_MODULE_1__["LoantermserviceService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    LoantermaddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loantermadd',
            template: __importDefault(__webpack_require__(/*! raw-loader!./loantermadd.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanterm/loantermadd.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./loantermadd.component.scss */ "./src/app/views/loanterm/loantermadd.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_loantermservice_service__WEBPACK_IMPORTED_MODULE_1__["LoantermserviceService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], LoantermaddComponent);
    return LoantermaddComponent;
}());



/***/ }),

/***/ "./src/app/views/loanterm/loantermlist.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/loanterm/loantermlist.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvYW50ZXJtL2xvYW50ZXJtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/loanterm/loantermlist.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/loanterm/loantermlist.component.ts ***!
  \**********************************************************/
/*! exports provided: LoantermlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoantermlistComponent", function() { return LoantermlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _loantermservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loantermservice.service */ "./src/app/views/loanterm/loantermservice.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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






var LoantermlistComponent = /** @class */ (function () {
    function LoantermlistComponent(loantermserviceService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.loantermserviceService = loantermserviceService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.loadSave = false;
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    LoantermlistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
    };
    LoantermlistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.loantermserviceService.GetLoanTermList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.loantermserviceService.pagedData;
            // console.log(this.pagedData);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LoantermlistComponent.prototype.updateFilter = function (event) {
        this.listFilter = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.refresh();
        }
    };
    LoantermlistComponent.prototype.setPage = function ($event) {
        this.lstPageSize = $event.page - 1;
        this.refresh();
    };
    LoantermlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.lstPageSize = $event.page - 1;
        this.refresh();
        ;
    };
    LoantermlistComponent.prototype.ResetSearch = function () {
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.listFilter = '';
        this.searchTxt = '';
        this.refresh();
    };
    LoantermlistComponent.prototype.add = function () {
        this.router.navigateByUrl("/loanTerm/loanTermAdd");
    };
    LoantermlistComponent.prototype.edit = function (id) {
        this.router.navigate(['/loanTerm/editloanTerm', id]);
    };
    LoantermlistComponent.prototype.delete = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Loanterm?";
        this.dialogService.confirm('Delete Loanterm', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loantermserviceService.DeleteLoanterm(Id).subscribe(function (r) {
                    _this.toaster.success("Loanterm has been deleted successfully..");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    LoantermlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    LoantermlistComponent.ctorParameters = function () { return [
        { type: _loantermservice_service__WEBPACK_IMPORTED_MODULE_2__["LoantermserviceService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }
    ]; };
    LoantermlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loantermlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./loantermlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanterm/loantermlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./loantermlist.component.scss */ "./src/app/views/loanterm/loantermlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_loantermservice_service__WEBPACK_IMPORTED_MODULE_2__["LoantermserviceService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], LoantermlistComponent);
    return LoantermlistComponent;
}());



/***/ }),

/***/ "./src/app/views/loanterm/loantermservice.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/loanterm/loantermservice.service.ts ***!
  \***********************************************************/
/*! exports provided: LoantermserviceService, LoanTermModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoantermserviceService", function() { return LoantermserviceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoanTermModel", function() { return LoanTermModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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




var LoantermserviceService = /** @class */ (function () {
    function LoantermserviceService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    LoantermserviceService.prototype.GetLoanTermList = function (name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "Loanterm/GetLoanTermList?nameSearch=" + name + "&SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    LoantermserviceService.prototype.GetBankDll = function () {
        return this.http.get(this.baseUri + "Loanterm/GetBankDll");
    };
    LoantermserviceService.prototype.addeditLoanTerm = function (loan) {
        // console.log(loan);
        return this.http.post(this.baseUri + "Loanterm/SaveLoan", loan);
    };
    LoantermserviceService.prototype.GetLoanTermById = function (Id) {
        return this.http.get(this.baseUri + "Loanterm/GetLoanTermById?Id=" + Id);
    };
    LoantermserviceService.prototype.DeleteLoanterm = function (id) {
        return this.http.get(this.baseUri + "Loanterm/DeleteLoanTermById?id=" + id);
    };
    LoantermserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    LoantermserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], LoantermserviceService);
    return LoantermserviceService;
}());

var LoanTermModel = /** @class */ (function () {
    function LoanTermModel() {
        this.id = '',
            this.Code = '',
            this.Description = '',
            this.Term = '',
            this.Apr,
            this.DealerFee = '',
            this.LenderID = '';
    }
    return LoanTermModel;
}());



/***/ })

}]);
//# sourceMappingURL=views-loanterm-loanterm-module.js.map