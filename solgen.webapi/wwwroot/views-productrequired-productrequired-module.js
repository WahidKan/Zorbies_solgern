(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-productrequired-productrequired-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/productrequired/productrequireddetail.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/productrequired/productrequireddetail.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Product Required Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/manageproductrequired\">Manage Required Product</a></li>\r\n      <li class=\"active\">Product Required Details</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mb-4 border\">\r\n\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-list bg-info text-white float-left p-1 mr-2\"></i>\r\n    <span class=\"float-left\"><span>Product Required</span> {{productName}}</span>\r\n    <span class=\"cntnt-right-btn mr15\">\r\n      <a    class=\"btn btn-secondary text-white mr-2 disable\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n  <div class=\"card-body p-0\">\r\n    <!--<ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link active show\" data-toggle=\"tab\" href=\"#details\" role=\"tab\" aria-controls=\"details\" aria-selected=\"false\">Details</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#related\" role=\"tab\" aria-controls=\"related\" aria-selected=\"true\">Related</a>\r\n      </li>\r\n    </ul>-->\r\n    <div class=\"tab-content scroll-in-content\" id=\"myTabContent\">\r\n      <div class=\"tab-pane fade active show p-0 border-top-0\" id=\"details\" role=\"tabpanel\" aria-labelledby=\"profile-tab\">\r\n        <div id=\"accordion\">\r\n          <form>\r\n            <ng-container>\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#item.group_display_name\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span> Product Required Details</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"item.group_display_name\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body row px-0 mt-0\">\r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>Product Required Number:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\" *ngIf=\"ProductRequiredNumber!=null && ProductRequiredNumber!='' \">\r\n                          <span class=\"py-2 d-block\">{{ProductRequiredNumber}}</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>Product Name:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\" *ngIf=\"productName!=null && productName!=''\">\r\n                          <a [routerLink]=\"['/product/viewproducts',ProductId]\"> <span class=\"py-2 d-block\">{{productName}}</span></a>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>Parent Record Type:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\" *ngIf=\"parentRecordType!=null && parentRecordType!='' \">\r\n                          <span class=\"py-2 d-block\">{{parentRecordType}}</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>Update Required Products:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\" *ngIf=\"Update_Required_Products_for__c!=null && Update_Required_Products_for__c!='' \">\r\n                          <span class=\"py-2 d-block\">{{Update_Required_Products_for__c}}</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>Quantity Unit Of Measure:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\" *ngIf=\"QuantityUnitOfMeasure!=null && QuantityUnitOfMeasure!='' \">\r\n                          <span class=\"py-2 d-block\">{{QuantityUnitOfMeasure}}</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    \r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>Quantity Required:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\" *ngIf=\"QuantityRequired!=null && QuantityRequired!='' \">\r\n                          <span class=\"py-2 d-block\">{{QuantityRequired}}</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>Description:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\" *ngIf=\"Description__c!=null && Description__c!='' \">\r\n                          <span class=\"py-2 d-block\">{{Description__c}}</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-container>\r\n          </form>\r\n        </div>\r\n      </div>\r\n      <div class=\"tab-pane fade p-0 border-0\" id=\"related\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n        <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"clearfix\"></div>\r\n\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/productrequired/productrequiredlist.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/productrequired/productrequiredlist.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\"><strong>Manage Product Required</strong></h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a routerLink=\"/dashboard\">Dashboard</a>\n      </li>\n      <li class=\"active\">Manage Product Required</li>\n    </ol>\n  </div>\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n  <div class=\"col-lg-12 portlets\">\n    <div class=\"panel\" [ngClass]=\"{'disabled':loadSave}\">\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\n        <div class=\"row mt-2\">\n          <div class=\"col-md-12 col-xl-12\">\n            <div class=\"row searchfield\">\n              <div class=\"col-lg-11\">\n                <div class=\"row\">\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2\">\n                    <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='pNameAndNumber' placeholder=\"Product Name /Product Required Number\" (keyup)='searchServiceAppointmentName($event)'>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-lg-1  mb-lg-0 mb-2 pl-1 pl-lg-0\">\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"SearchProductRequiredList()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\n                <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"clearfix\"></div>\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\n        <ngx-datatable class=\"bootstrap custom-medium-table-width\"\n                       [rows]=\"pagedData.data\"\n                       [columnMode]=\"'force'\"\n                       [headerHeight]=\"40\"\n                       [footerHeight]=\"40\"\n                       [rowHeight]=\"'auto'\"\n                       [externalPaging]=\"true\"\n                       [externalSorting]=\"true\"\n                       [loadingIndicator]=\"loadSave\"\n                       [count]=\"pagedData.pager.totalItems\"\n                       [offset]=\"pagedData.pager.currentPage\"\n                       [limit]=\"pagedData.pager.pageSize\"\n                       (page)='setPage($event)'\n                       (sort)=\"onSort($event)\">\n           \n          <ngx-datatable-column name=\"Product Required Number\" prop=\"ProductRequiredNumber\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div title=\"{{row.ProductRequiredNumber}}\">\n                <a [routerLink]=\"['/manageproductrequired/viewProductRequired',row.Id]\">{{row.ProductRequiredNumber| truncate}}</a>&nbsp;\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Product Name\" prop=\"productName\" [sortable]=\"true\" headerClass=\"thead-dark\">\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Quantity Unit Of Measure\" prop=\"QuantityUnitOfMeasure\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\n          <ngx-datatable-column name=\"Quantity Required\" prop=\"QuantityRequired\" [sortable]=\"true\" headerClass=\"thead-dark\">\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Parent Record Type\" prop=\"parentRecordType\" [sortable]=\"true\" headerClass=\"thead-dark\">\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Update Required Products\" prop=\"Update_Required_Products_for__c\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\n          <ngx-datatable-footer>\n            <ng-template ngx-datatable-footer-template\n                         let-rowCount=\"rowCount\"\n                         let-pageSize=\"pageSize\"\n                         let-selectedCount=\"selectedCount\"\n                         let-currentPage=\"curPage\"\n                         let-offset=\"offset\"\n                         let-isVisible=\"isVisible\">\n              <div>\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                  </span>\n                </div>\n\n              </div>\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\n                {{commonService.PageString(pagedData.pager.currentPage+1,pageSizeValue,rowCount)}}\n              </div>\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\n                               [page]=\"pagedData.pager.currentPage+1\"\n                               [size]=\"pageSizeValue\"\n                               [count]=\"pagedData.pager.totalItems\"\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\n                               (change)=\"setPage($event)\">\n              </datatable-pager>\n            </ng-template>\n          </ngx-datatable-footer>\n        </ngx-datatable>\n      </div>\n    </div>\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loading\" class=\"loader\"></app-loader>\n  </div>\n</div>\n\n\n\n");

/***/ }),

/***/ "./src/app/views/productrequired/productrequired-routing.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/productrequired/productrequired-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: ProductrequiredRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductrequiredRoutingModule", function() { return ProductrequiredRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _productrequiredlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productrequiredlist.component */ "./src/app/views/productrequired/productrequiredlist.component.ts");
/* harmony import */ var _productrequireddetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./productrequireddetail.component */ "./src/app/views/productrequired/productrequireddetail.component.ts");
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
    { path: '', component: _productrequiredlist_component__WEBPACK_IMPORTED_MODULE_2__["ProductrequiredlistComponent"] },
    //{ path: 'addProduct', component: AddeditproductComponent },
    { path: 'viewProductRequired/:id', component: _productrequireddetail_component__WEBPACK_IMPORTED_MODULE_3__["ProductrequireddetailComponent"] },
];
var ProductrequiredRoutingModule = /** @class */ (function () {
    function ProductrequiredRoutingModule() {
    }
    ProductrequiredRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ProductrequiredRoutingModule);
    return ProductrequiredRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/productrequired/productrequired.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/productrequired/productrequired.module.ts ***!
  \*****************************************************************/
/*! exports provided: ProductrequiredModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductrequiredModule", function() { return ProductrequiredModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _productrequiredlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./productrequiredlist.component */ "./src/app/views/productrequired/productrequiredlist.component.ts");
/* harmony import */ var _productrequired_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./productrequired-routing.module */ "./src/app/views/productrequired/productrequired-routing.module.ts");
/* harmony import */ var _productrequireddetail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./productrequireddetail.component */ "./src/app/views/productrequired/productrequireddetail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var ProductrequiredModule = /** @class */ (function () {
    function ProductrequiredModule() {
    }
    ProductrequiredModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_productrequiredlist_component__WEBPACK_IMPORTED_MODULE_7__["ProductrequiredlistComponent"], _productrequireddetail_component__WEBPACK_IMPORTED_MODULE_9__["ProductrequireddetailComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _productrequired_routing_module__WEBPACK_IMPORTED_MODULE_8__["ProductrequiredRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ]
        })
    ], ProductrequiredModule);
    return ProductrequiredModule;
}());



/***/ }),

/***/ "./src/app/views/productrequired/productrequireddetail.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/views/productrequired/productrequireddetail.component.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb2R1Y3RyZXF1aXJlZC9wcm9kdWN0cmVxdWlyZWRkZXRhaWwuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/productrequired/productrequireddetail.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/views/productrequired/productrequireddetail.component.ts ***!
  \**************************************************************************/
/*! exports provided: ProductrequireddetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductrequireddetailComponent", function() { return ProductrequireddetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _productrequiredservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productrequiredservice.service */ "./src/app/views/productrequired/productrequiredservice.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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







var ProductrequireddetailComponent = /** @class */ (function () {
    function ProductrequireddetailComponent(fb, productrequiredserviceService, commonService, router, location, toaster, route) {
        this.fb = fb;
        this.productrequiredserviceService = productrequiredserviceService;
        this.commonService = commonService;
        this.router = router;
        this.location = location;
        this.toaster = toaster;
        this.route = route;
        this.loadSave = false;
        this.addOrUpdatePermission = false;
        this.productName = '';
        this.productRequiredDetail = null;
        this.QuantityUnitOfMeasure = '';
        this.modulePermission = [];
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        console.log("priviledgeCode", priviledgeCode);
        console.log("moduleCode", moduleCode);
        console.log("modulePermission", this.modulePermission);
        //let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
        //console.log("CHKPersmission", add);
        //if (add == undefined) {
        //  this.addOrUpdatePermission = false;
        //} else {
        //  this.addOrUpdatePermission = true;
        //}
    }
    ProductrequireddetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.pageTitle = 'Edit Price Book';
                _this.ProductRequiredId = id;
                _this.GetProductRequiredById(id);
            }
            else {
                _this.pageTitle = 'Add Price Book';
            }
        });
    };
    ProductrequireddetailComponent.prototype.GetProductRequiredById = function (id) {
        var _this = this;
        this.productrequiredserviceService.GetProductRequiredById(id).subscribe(function (result) {
            console.log("resultPriceBook", result);
            if (result) {
                _this.loadSave = false;
                _this.pageTitle = 'Edit Price Book';
                _this.productRequiredDetail = result[0];
                _this.productName = _this.productRequiredDetail.productName;
                _this.ProductId = _this.productRequiredDetail.ProductId;
                _this.ProductRequiredNumber = _this.productRequiredDetail.ProductRequiredNumber;
                _this.parentRecordType = _this.productRequiredDetail.parentRecordType;
                _this.Update_Required_Products_for__c = _this.productRequiredDetail.Update_Required_Products_for__c;
                _this.QuantityUnitOfMeasure = _this.productRequiredDetail.QuantityUnitOfMeasure;
                _this.QuantityRequired = _this.productRequiredDetail.QuantityRequired;
                _this.Description__c = _this.productRequiredDetail.Description__c;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ProductrequireddetailComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ProductrequireddetailComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _productrequiredservice_service__WEBPACK_IMPORTED_MODULE_2__["ProductrequiredserviceService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    ProductrequireddetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-productrequireddetail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./productrequireddetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/productrequired/productrequireddetail.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./productrequireddetail.component.scss */ "./src/app/views/productrequired/productrequireddetail.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _productrequiredservice_service__WEBPACK_IMPORTED_MODULE_2__["ProductrequiredserviceService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], ProductrequireddetailComponent);
    return ProductrequireddetailComponent;
}());



/***/ }),

/***/ "./src/app/views/productrequired/productrequiredlist.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/productrequired/productrequiredlist.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb2R1Y3RyZXF1aXJlZC9wcm9kdWN0cmVxdWlyZWRsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/productrequired/productrequiredlist.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/productrequired/productrequiredlist.component.ts ***!
  \************************************************************************/
/*! exports provided: ProductrequiredlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductrequiredlistComponent", function() { return ProductrequiredlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _productrequiredservice_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productrequiredservice.service */ "./src/app/views/productrequired/productrequiredservice.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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





var ProductrequiredlistComponent = /** @class */ (function () {
    function ProductrequiredlistComponent(ProductrequiredserviceService, commonService, routeActivate, dateTimeToLocal) {
        this.ProductrequiredserviceService = ProductrequiredserviceService;
        this.commonService = commonService;
        this.routeActivate = routeActivate;
        this.dateTimeToLocal = dateTimeToLocal;
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.data = [];
        this.serviceAppointmentSearch = '';
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.pNameAndNumber = '';
        this.workTypeId = null;
        this.pageNumber = 0;
        this.loading = false;
        this.pagedData = {
            pager: {},
            data: []
        };
    }
    ProductrequiredlistComponent.prototype.ngOnInit = function () {
        this.SearhName = "";
        this.currentPage = 1;
        //this.offset = 1;
        this.pageSizeValue = 15;
        this.getStageList();
        this.getPageSizes();
        this.SearchProductRequiredList();
        this.data = [];
    };
    ProductrequiredlistComponent.prototype.searchServiceAppointmentName = function (event) {
        this.pNameAndNumber = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchProductRequiredList();
        }
    };
    //auditChecklistDetailPopup(checkList_Id: number, serviceAppointmentId: number) {
    //  //debugger;
    //  this.auditCheckListModel.auditChecklistDetail(checkList_Id, serviceAppointmentId);
    //}
    ProductrequiredlistComponent.prototype.GetSortOrder = function (prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            }
            else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        };
    };
    ProductrequiredlistComponent.prototype.getStageList = function () {
        var _this = this;
        this.commonService.getMasterItemsList('WorkType').subscribe(function (result) {
            //this.lstWorkType = this.commonService.masters;      
            _this.lstWorkType = _this.commonService.masters.sort(_this.GetSortOrder("text"));
        });
    };
    ProductrequiredlistComponent.prototype.SearchProductRequiredList = function () {
        var _this = this;
        this.loading = true;
        this.ProductrequiredserviceService.SearchProductRequiredList(this.pNameAndNumber, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.From, this.To, this.workTypeId).toPromise().then(function (response) {
            _this.pagedData = response;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            //this.offset = this.pageNumber + 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ProductrequiredlistComponent.prototype.reset = function () {
        this.SearhName = '';
        this.serviceAppointmentSearch = '';
        this.sortDir = 'asc';
        this.sortColumn = 'Id';
        this.currentPage = 1;
        //this.worktype.clearModel();
        this.From = null;
        this.pNameAndNumber = null;
        this.To = null;
        this.pageNumber = 0;
        this.pageSizeValue = 15;
        this.SearchProductRequiredList();
    };
    ProductrequiredlistComponent.prototype.restWorkTypeddl = function () {
        this.workTypeId = null;
    };
    //function is used to manage enter key press on search text box
    ProductrequiredlistComponent.prototype.updateFilter = function (event) {
        this.serviceAppointmentSearch = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchProductRequiredList();
        }
    };
    ProductrequiredlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ProductrequiredlistComponent.prototype.onChange = function ($event) {
        this.SearchProductRequiredList();
    };
    ProductrequiredlistComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        var ab = $event.page - 1;
        this.currentPage = ab;
        //this.offset = $event.page;
        this.SearchProductRequiredList();
    };
    ProductrequiredlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchProductRequiredList();
    };
    ProductrequiredlistComponent.ctorParameters = function () { return [
        { type: _productrequiredservice_service__WEBPACK_IMPORTED_MODULE_1__["ProductrequiredserviceService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_4__["DateTimeToLocalPipe"] }
    ]; };
    ProductrequiredlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-productrequiredlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./productrequiredlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/productrequired/productrequiredlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./productrequiredlist.component.scss */ "./src/app/views/productrequired/productrequiredlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_productrequiredservice_service__WEBPACK_IMPORTED_MODULE_1__["ProductrequiredserviceService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_4__["DateTimeToLocalPipe"]])
    ], ProductrequiredlistComponent);
    return ProductrequiredlistComponent;
}());



/***/ }),

/***/ "./src/app/views/productrequired/productrequiredservice.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/productrequired/productrequiredservice.service.ts ***!
  \*************************************************************************/
/*! exports provided: ProductrequiredserviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductrequiredserviceService", function() { return ProductrequiredserviceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
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





var ProductrequiredserviceService = /** @class */ (function () {
    function ProductrequiredserviceService(http, commonService, router) {
        this.http = http;
        this.commonService = commonService;
        this.router = router;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].WebApiBaseUrl;
    }
    ProductrequiredserviceService.prototype.SearchProductRequiredList = function (pNameAndNumber, sortColumn, sortDir, page, pageSize, From, To, workTypeId) {
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
        return this.http.get(this.baseUri + ("product/GetProductRequiredList?pNameAndNumber=" + pNameAndNumber + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&workTypeId=" + workTypeId + "&From=" + From + "&To=" + To));
        //.pipe(
        //  map((response: any) => {          
        //      this.pagedData = response;
        //      return true;          
        //  })
        //);
    };
    ProductrequiredserviceService.prototype.GetProductRequiredById = function (id) {
        return this.http.get(this.baseUri + ("product/GetProductRequiredDetailById?id=" + id));
    };
    ProductrequiredserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    ProductrequiredserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ProductrequiredserviceService);
    return ProductrequiredserviceService;
}());



/***/ })

}]);
//# sourceMappingURL=views-productrequired-productrequired-module.js.map