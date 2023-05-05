(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-whatsnext-whatsnext-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/whatsnext/whats-next-detail.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/whatsnext/whats-next-detail.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-9 mt-3\">\r\n          <span class=\"dash\">Check Progress</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\" *ngIf=\"isleasePage\"><a routerLink=\"/lease\">Manage Perposal</a></li>\r\n            <li class=\"breadcrumb-item\" *ngIf=\"!isleasePage\"><a routerLink=\"/whatsnext\">Perposal in Process</a></li>\r\n            <li class=\"breadcrumb-item active\">Check progress</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\" *ngIf=\"isleasePage\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"leaseBack()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\" *ngIf=\"!isleasePage\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"whatsnextBack()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Header Section-->\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n              <div class=\"col-md-12 mt-4\">\r\n\r\n                <div class=\"table-responsive\">\r\n                  <table class=\"table table-striped\">\r\n                    <tbody>\r\n                      <tr>\r\n                        <td><b>Business Name:</b> {{whatsNextvaule[0].contactBussinessName}}</td>\r\n                        <td><b>Contact Name:</b> {{whatsNextvaule[0].contactName}}</td>\r\n                        <td><b>Created On:</b> {{whatsNextvaule[0].contactCreatedOn  | date: 'MM-dd-yyyy'}}</td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12\">\r\n                <h3 class=\"heading bg-info p-2 text-white border-0\">Status: {{whatsNextvaule[0].whatNextRecentStatus}}</h3>\r\n              </div>\r\n\r\n\r\n              <div class=\"col-12 mt-3\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-lg-3 mb-3\" *ngFor=\"let value of whatsNextvaule\">\r\n                    <div class=\"progress-bars bg-success\" *ngIf=\"value.whatNextStatus=='Done'\">\r\n                      <i [class]=\"value.icon\"  style=\"font-size:50px;margin-bottom: 20px;\"></i>\r\n                      <h2>{{value.whatNextStep}}</h2>\r\n                      <p>{{value.whatNextDesc}}</p>\r\n                      <hr>\r\n                      <p><i class=\"fas fa-check\"></i>&nbsp;{{value.whatNextStatus}}</p>\r\n                    </div>\r\n                    <div class=\"progress-bars bg-secondary\" *ngIf=\"value.whatNextStatus=='Pending'\">\r\n                      <i [class]=\"value.icon\" style=\"font-size:50px;margin-bottom:20px;\"></i>\r\n                      <h2>{{value.whatNextStep}}</h2>\r\n                      <p>{{value.whatNextDesc}}</p>\r\n                      <hr>\r\n                      <p><i class=\"fas fa-history\"></i>&nbsp;{{value.whatNextStatus}}</p>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/whatsnext/whatsnextlist.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/whatsnext/whatsnextlist.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Perposal in Process</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Perposals in Process</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>       <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-3\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-3\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search by Business Name/Contact Name/City/Perposal Number\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-2\">\r\n                      <div class=\"form-group\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"SearchContact()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"ResetSearch()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable class=\"bootstrap\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column [width]=\"80\" name=\"Perposal#\" prop=\"LeaseNumber\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <a [routerLink]=\"['/lease/editlease',row.LeaseId]\">{{row.LeaseNumber }}</a>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"ContactBussinessName\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Name\" prop=\"Name\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"City\" prop=\"ContactMailAddressCity\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Status Detail\" prop=\"WhatNextStatusDetail\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span [innerHtml]=\"row.WhatNextStatusDetail\"></span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Perposal Request\" prop=\"AppliedFor\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Date\" prop=\"LeaseCreatedOn\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.LeaseCreatedOn | date: 'MM-dd-yyyy'}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Action\" [sortable]=\"false\" prop=\"LeaseCount\" headerClass=\"thead-dark\" *ngIf=\"moduleWhatNextPermission.roleModuleReadFlag\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <a [routerLink]=\"['/whatsnext/checkprogress',row.LeaseId]\" title=\" Click here to see the list of steps done for the Perposal\">Check Progress</a>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/whatsnext/whats-next-detail.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/whatsnext/whats-next-detail.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3doYXRzbmV4dC93aGF0cy1uZXh0LWRldGFpbC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/whatsnext/whats-next-detail.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/whatsnext/whats-next-detail.component.ts ***!
  \****************************************************************/
/*! exports provided: WhatsNextDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsNextDetailComponent", function() { return WhatsNextDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _whatsnext_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./whatsnext.service */ "./src/app/views/whatsnext/whatsnext.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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





var WhatsNextDetailComponent = /** @class */ (function () {
    function WhatsNextDetailComponent(route, whatsnewService, fb, commonservice, router) {
        this.route = route;
        this.whatsnewService = whatsnewService;
        this.fb = fb;
        this.commonservice = commonservice;
        this.router = router;
        this.whatsNext = new _whatsnext_service__WEBPACK_IMPORTED_MODULE_2__["WhatsNext"]();
        this.isleasePage = false;
        this.moduletitle = this.route.snapshot.data.title;
    }
    WhatsNextDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var index = this.commonservice.getPreviousUrl().indexOf("lease");
        if (index !== -1) {
            this.isleasePage = true;
            var ul = document.getElementById("side-main-menu");
            var items = ul.getElementsByTagName("a");
            for (var i = 0; i < items.length; ++i) {
                if (items[i].innerText == 'Manage Perposals') {
                    items[i].setAttribute("class", "nav-link my-click selected"); //" selected";   //nav-link selected
                }
                if (items[i].innerText == "What's Next") {
                    items[i].setAttribute("class", "nav-link my-click");
                }
            }
            // do something with items[i], which is a <li> element
        }
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.getWhatsNextDetail(id);
            }
        });
    };
    WhatsNextDetailComponent.prototype.getWhatsNextDetail = function (id) {
        var _this = this;
        this.whatsnewService.getWhatsNextDetail(id)
            .subscribe(function (whatsNext) {
            _this.whatsNextvaule = whatsNext;
        });
    };
    WhatsNextDetailComponent.prototype.whatsnextBack = function () {
        this.router.navigate(['/whatsnext']);
    };
    WhatsNextDetailComponent.prototype.leaseBack = function () {
        this.router.navigate(['/lease']);
    };
    WhatsNextDetailComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _whatsnext_service__WEBPACK_IMPORTED_MODULE_2__["WhatsnextService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    WhatsNextDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-whats-next-detail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./whats-next-detail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/whatsnext/whats-next-detail.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./whats-next-detail.component.scss */ "./src/app/views/whatsnext/whats-next-detail.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _whatsnext_service__WEBPACK_IMPORTED_MODULE_2__["WhatsnextService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], WhatsNextDetailComponent);
    return WhatsNextDetailComponent;
}());



/***/ }),

/***/ "./src/app/views/whatsnext/whatsnext-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/whatsnext/whatsnext-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: WhatsnextRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsnextRoutingModule", function() { return WhatsnextRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _whatsnextlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./whatsnextlist.component */ "./src/app/views/whatsnext/whatsnextlist.component.ts");
/* harmony import */ var _whats_next_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./whats-next-detail.component */ "./src/app/views/whatsnext/whats-next-detail.component.ts");
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
    { path: '', component: _whatsnextlist_component__WEBPACK_IMPORTED_MODULE_2__["WhatsnextlistComponent"] },
    { path: 'checkprogress/:id', component: _whats_next_detail_component__WEBPACK_IMPORTED_MODULE_3__["WhatsNextDetailComponent"], data: { title: 'next' } }
];
var WhatsnextRoutingModule = /** @class */ (function () {
    function WhatsnextRoutingModule() {
    }
    WhatsnextRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], WhatsnextRoutingModule);
    return WhatsnextRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/whatsnext/whatsnext.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/whatsnext/whatsnext.module.ts ***!
  \*****************************************************/
/*! exports provided: WhatsnextModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsnextModule", function() { return WhatsnextModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _whatsnext_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./whatsnext-routing.module */ "./src/app/views/whatsnext/whatsnext-routing.module.ts");
/* harmony import */ var _whatsnextlist_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./whatsnextlist.component */ "./src/app/views/whatsnext/whatsnextlist.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _whats_next_detail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./whats-next-detail.component */ "./src/app/views/whatsnext/whats-next-detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var WhatsnextModule = /** @class */ (function () {
    function WhatsnextModule() {
    }
    WhatsnextModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_whatsnextlist_component__WEBPACK_IMPORTED_MODULE_4__["WhatsnextlistComponent"], _whats_next_detail_component__WEBPACK_IMPORTED_MODULE_6__["WhatsNextDetailComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _whatsnext_routing_module__WEBPACK_IMPORTED_MODULE_3__["WhatsnextRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]
            ]
        })
    ], WhatsnextModule);
    return WhatsnextModule;
}());



/***/ }),

/***/ "./src/app/views/whatsnext/whatsnext.service.ts":
/*!******************************************************!*\
  !*** ./src/app/views/whatsnext/whatsnext.service.ts ***!
  \******************************************************/
/*! exports provided: WhatsnextService, WhatsNext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsnextService", function() { return WhatsnextService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsNext", function() { return WhatsNext; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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






var WhatsnextService = /** @class */ (function () {
    function WhatsnextService(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
        this.whatsNextUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl + "WhatsNext";
        this.currentUrl = this.router.url;
        router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_5__["NavigationEnd"]) {
                _this.previousUrl = _this.currentUrl;
                _this.currentUrl = event.url;
            }
            ;
        });
    }
    //Get previous url
    WhatsnextService.prototype.getPreviousUrl = function () {
        return this.previousUrl;
    };
    WhatsnextService.prototype.getContactList = function (name, From, To, sortColumn, sortDir, page, pageSize, userId, isDashBoard) {
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
        return this.http.get(this.whatsNextUri + "/GetCustomersWithLease?name=" + name + "&From=" + From + "&To=" + To + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId + "&isDashBoard=" + isDashBoard)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    WhatsnextService.prototype.getWhatsNextDetail = function (id) {
        if (id === null) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(this.initializeWhatsNext());
        }
        return this.http.get(this.whatsNextUri + "/" + id);
    };
    WhatsnextService.prototype.initializeWhatsNext = function () {
        // Return an initialized object
        return {
            leaseNumber: null,
            leaseId: null,
            contactBussinessName: null,
            contactName: null,
            WhatNextStep: null,
            WhatNextDesc: null,
            WhatNextStatus: null,
            ContactCreatedOn: null,
            icon: null,
            whatNextRecentStatus: null,
        };
    };
    WhatsnextService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
    ]; };
    WhatsnextService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], WhatsnextService);
    return WhatsnextService;
}());

var WhatsNext = /** @class */ (function () {
    function WhatsNext() {
    }
    return WhatsNext;
}());



/***/ }),

/***/ "./src/app/views/whatsnext/whatsnextlist.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/views/whatsnext/whatsnextlist.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3doYXRzbmV4dC93aGF0c25leHRsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/whatsnext/whatsnextlist.component.ts":
/*!************************************************************!*\
  !*** ./src/app/views/whatsnext/whatsnextlist.component.ts ***!
  \************************************************************/
/*! exports provided: WhatsnextlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsnextlistComponent", function() { return WhatsnextlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _whatsnext_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./whatsnext.service */ "./src/app/views/whatsnext/whatsnext.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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




var WhatsnextlistComponent = /** @class */ (function () {
    function WhatsnextlistComponent(whatsnewService, commonService, routeActivate) {
        var _this = this;
        this.whatsnewService = whatsnewService;
        this.commonService = commonService;
        this.routeActivate = routeActivate;
        this.loadSave = false;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'LeaseCreatedOn';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.isDashBoard = false;
        this.pageNumber = 0;
        var moduleCode = this.routeActivate.snapshot.data.moduleCode;
        this.moduleWhatNextPermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    WhatsnextlistComponent.prototype.ngOnInit = function () {
        this.SearhName = "";
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.SearchContact();
    };
    WhatsnextlistComponent.prototype.SearchContact = function () {
        var _this = this;
        this.loading = true;
        this.whatsnewService.getContactList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid, false).subscribe(function (response) {
            _this.pagedData = _this.whatsnewService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WhatsnextlistComponent.prototype.ResetSearch = function () {
        this.SearhName = '';
        this.listFilter = '';
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.To = null;
        this.From = null;
        this.pageNumber = 0;
        this.pageSizeValue = 10;
        this.SearchContact();
    };
    //function is used to manage enter key press on search text box
    WhatsnextlistComponent.prototype.updateFilter = function (event) {
        this.SearhName = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchContact();
        }
    };
    WhatsnextlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    WhatsnextlistComponent.prototype.onChange = function ($event) {
        this.SearchContact();
    };
    WhatsnextlistComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        this.SearchContact();
    };
    WhatsnextlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchContact();
    };
    WhatsnextlistComponent.ctorParameters = function () { return [
        { type: _whatsnext_service__WEBPACK_IMPORTED_MODULE_2__["WhatsnextService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    WhatsnextlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-whatsnextlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./whatsnextlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/whatsnext/whatsnextlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./whatsnextlist.component.scss */ "./src/app/views/whatsnext/whatsnextlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_whatsnext_service__WEBPACK_IMPORTED_MODULE_2__["WhatsnextService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], WhatsnextlistComponent);
    return WhatsnextlistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-whatsnext-whatsnext-module.js.map